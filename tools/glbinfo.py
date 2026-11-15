"""Resume un .glb: extensiones, mallas, materiales, texturas y tamaño de la caja.

Uso: python -I tools/glbinfo.py assets/models/*.glb
"""
import json
import struct
import sys

for path in sys.argv[1:]:
    with open(path, "rb") as f:
        magic, ver, total = struct.unpack("<4sII", f.read(12))
        clen, ctype = struct.unpack("<II", f.read(8))
        js = json.loads(f.read(clen))
    acc = js.get("accessors", [])
    lo, hi = [1e9] * 3, [-1e9] * 3
    tris = 0
    for m in js.get("meshes", []):
        for p in m["primitives"]:
            a = acc[p["attributes"]["POSITION"]]
            if "min" in a:
                lo = [min(x, y) for x, y in zip(lo, a["min"])]
                hi = [max(x, y) for x, y in zip(hi, a["max"])]
            if "indices" in p:
                tris += acc[p["indices"]]["count"] // 3
            else:
                tris += a["count"] // 3
    print(path.split("/")[-1], "| req:", js.get("extensionsRequired"), "| used:", js.get("extensionsUsed"),
          "| meshes", len(js.get("meshes", [])), "| nodes", len(js.get("nodes", [])), "| mats", len(js.get("materials", [])),
          "| tex", len(js.get("textures", [])), "| imgs", [i.get("mimeType") for i in js.get("images", [])][:3],
          "| tris", tris, "| size", [round(h - l, 2) for l, h in zip(lo, hi)])
