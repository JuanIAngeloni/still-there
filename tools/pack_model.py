"""Empaqueta un modelo .glb de NASA para el sitio: achica y recomprime las texturas y lo deja en assets/models_plain/.

Uso:  python -I tools/pack_model.py <origen.glb> <nombre> [lado_maximo_px=2048] [--info]

- Las texturas sin transparencia pasan a JPEG (calidad 88); las que tienen transparencia quedan en PNG.
- La geometría no se toca.
- Con --info solo muestra los nodos, las medidas y dónde están las toberas (los vértices más bajos de cada pieza).
Después, tools/build.py lo convierte en dist/assets/models/<nombre>.gltf.json.
"""
import io
import json
import pathlib
import site
import struct
import sys

sys.path.append(site.getusersitepackages())
from PIL import Image  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
COMP = {5120: "b", 5121: "B", 5122: "h", 5123: "H", 5125: "I", 5126: "f"}
NUM = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}


def read_glb(path):
    data = path.read_bytes()
    off, js, binary = 12, None, b""
    total = struct.unpack_from("<I", data, 8)[0]
    while off < total:
        clen, ctype = struct.unpack_from("<II", data, off)
        chunk = data[off + 8: off + 8 + clen]
        if ctype == 0x4E4F534A:
            js = json.loads(chunk)
        elif ctype == 0x004E4942:
            binary = chunk
        off += 8 + clen
    return js, binary


def view_bytes(js, binary, i):
    v = js["bufferViews"][i]
    o = v.get("byteOffset", 0)
    return binary[o: o + v["byteLength"]]


def positions(js, binary, acc_i):
    a = js["accessors"][acc_i]
    v = js["bufferViews"][a["bufferView"]]
    o = v.get("byteOffset", 0) + a.get("byteOffset", 0)
    stride = v.get("byteStride") or 12
    return [struct.unpack_from("<3f", binary, o + k * stride) for k in range(a["count"])]


def info(js, binary):
    for i, n in enumerate(js["nodes"]):
        if "mesh" not in n:
            print(i, n.get("name"), "hijos", n.get("children"))
            continue
        pts = []
        for p in js["meshes"][n["mesh"]]["primitives"]:
            pts += positions(js, binary, p["attributes"]["POSITION"])
        ys = [p[1] for p in pts]
        y0 = min(ys)
        low = [p for p in pts if p[1] < y0 + 0.02 * (max(ys) - y0) + 1e-4]
        cx = sum(p[0] for p in low) / len(low)
        cz = sum(p[2] for p in low) / len(low)
        r = max(((p[0] - cx) ** 2 + (p[2] - cz) ** 2) ** 0.5 for p in low)
        xs = sorted(set(round(p[0], 2) for p in low))
        zs = sorted(set(round(p[2], 2) for p in low))
        print(i, (n.get("name") or "")[:24].ljust(24), "y %.2f..%.2f" % (y0, max(ys)), "T", [round(t, 3) for t in n.get("translation", [0, 0, 0])],
              "| abajo: n=%d centro=(%.2f, %.2f) r=%.2f x[%.2f..%.2f] z[%.2f..%.2f]" % (len(low), cx, cz, r, xs[0], xs[-1], zs[0], zs[-1]))
    for m in js.get("materials", []):
        pb = m.get("pbrMetallicRoughness", {})
        print("  material", m.get("name"), "alpha", m.get("alphaMode"), "doble" if m.get("doubleSided") else "", "M", pb.get("metallicFactor"), "R", pb.get("roughnessFactor"))


def pack(js, binary, max_side):
    img_views = {im["bufferView"]: k for k, im in enumerate(js.get("images", [])) if "bufferView" in im}
    out = bytearray()
    for i, v in enumerate(js["bufferViews"]):
        raw = view_bytes(js, binary, i)
        if i in img_views:
            im = Image.open(io.BytesIO(raw))
            im.load()
            alpha = im.mode in ("RGBA", "LA", "P") and im.convert("RGBA").getextrema()[3][0] < 250
            w, h = im.size
            k = min(1.0, max_side / max(w, h))
            if k < 1:
                im = im.resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)
            buf = io.BytesIO()
            if alpha:
                im.convert("RGBA").save(buf, "PNG", optimize=True)
                mime = "image/png"
            else:
                im.convert("RGB").save(buf, "JPEG", quality=88, optimize=True)
                mime = "image/jpeg"
            new = buf.getvalue()
            image = js["images"][img_views[i]]
            image["mimeType"] = mime
            print("  textura %-22s %dx%d -> %dx%d  %d KB -> %d KB  %s" % (image.get("name"), w, h, im.size[0], im.size[1], len(raw) // 1024, len(new) // 1024, mime))
            raw = new
        while len(out) % 4:
            out.append(0)
        v["byteOffset"] = len(out)
        v["byteLength"] = len(raw)
        out += raw
    while len(out) % 4:
        out.append(0)
    js["buffers"] = [{"byteLength": len(out)}]
    return bytes(out)


def write_glb(path, js, binary):
    j = json.dumps(js, separators=(",", ":")).encode("utf-8")
    j += b" " * (-len(j) % 4)
    total = 12 + 8 + len(j) + 8 + len(binary)
    with open(path, "wb") as f:
        f.write(struct.pack("<4sII", b"glTF", 2, total))
        f.write(struct.pack("<II", len(j), 0x4E4F534A))
        f.write(j)
        f.write(struct.pack("<II", len(binary), 0x004E4942))
        f.write(binary)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    src = pathlib.Path(args[0])
    js, binary = read_glb(src)
    if "--info" in sys.argv:
        info(js, binary)
        return
    name = args[1]
    max_side = int(args[2]) if len(args) > 2 else 2048
    new = pack(js, binary, max_side)
    dst = ROOT / "assets" / "models_plain" / (name + ".glb")
    write_glb(dst, js, new)
    print(name, ":", src.stat().st_size // 1024, "KB ->", dst.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
