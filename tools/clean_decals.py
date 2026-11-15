"""Quita los emblemas pintados en las texturas de los cohetes de NASA y empaqueta el modelo.

Uso: python -I tools/clean_decals.py <carpeta con los .glb originales de NASA>

Los modelos de NASA VTAD traen pintados la insignia de NASA, la bandera, logos de empresas y el parche de una
misión concreta (OCO-2 en el Delta II, MAVEN en el Atlas V 401, Juno en el 551). El sitio usa esos cohetes para
otras misiones y las reglas de Space Apps piden no usar la insignia de NASA ni logos de misiones, así que acá se
tapan con el color del propio cohete. La forma del modelo no cambia.

Cada zona es (x0, y0, x1, y1) en píxeles de la textura original:
  'h'            cada fila se rellena con el degradé entre los colores que tiene a los costados;
  ('copy', dx)   se copia la franja que está dx píxeles a la derecha (para zonas con relieve dibujado).
"""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import pack_model as pm  # noqa: E402

ZONES = {
    "delta2c": ("Delta_II.glb", {"Delta_II.jpg": [((126, 566, 214, 914), "h")]}),
    "atlas401c": ("Atlas_V_401.glb", {"Atlas_401.jpg": [
        ((346, 234, 400, 306), "h"), ((336, 372, 416, 498), ("copy", 86)), ((368, 668, 430, 694), ("copy", 70)), ((368, 694, 430, 752), "h"),
        ((358, 922, 438, 1138), "h")]}),
    "atlas551c": ("Atlas_V_551.glb", {"Atlas_551.jpg": [
        ((122, 80, 194, 152), "h"), ((124, 188, 192, 218), "h"),
        ((306, 200, 378, 364), "h"), ((442, 200, 508, 364), "h"), ((442, 390, 498, 436), "h"),
        ((318, 436, 372, 506), "h"), ((446, 436, 502, 506), "h")]}),
}


def fill_h(im, box, gap=6, n=4):
    x0, y0, x1, y1 = box
    px = im.load()
    for y in range(y0, y1):
        a = [sum(px[x, y][c] for x in range(x0 - gap - n, x0 - gap)) / n for c in range(3)]
        b = [sum(px[x, y][c] for x in range(x1 + gap, x1 + gap + n)) / n for c in range(3)]
        for x in range(x0, x1):
            u = (x - x0) / max(1, x1 - x0 - 1)
            px[x, y] = tuple(int(round(a[c] * (1 - u) + b[c] * u)) for c in range(3))


def make_edit(zones):
    def edit(name, im):
        ops = zones.get(name)
        if not ops:
            return im
        im = im.convert("RGB")
        for box, how in ops:
            if how == "h":
                fill_h(im, box)
            else:
                dx = how[1]
                x0, y0, x1, y1 = box
                im.paste(im.crop((x0 + dx, y0, x1 + dx, y1)), (x0, y0))
        print("  emblemas tapados en", name, ":", len(ops), "zonas")
        return im
    return edit


def main():
    src_dir = pathlib.Path(sys.argv[1])
    for name, (fname, zones) in ZONES.items():
        hits = list(src_dir.rglob(fname))
        if not hits:
            print("no encontré", fname)
            continue
        js, binary = pm.read_glb(hits[0])
        pm.EDIT = make_edit(zones)
        new = pm.pack(js, binary, 2048)
        pm.EDIT = None
        dst = pm.ROOT / "assets" / "models_plain" / (name + ".glb")
        pm.write_glb(dst, js, new)
        print(name, "->", dst.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
