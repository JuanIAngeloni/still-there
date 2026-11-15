"""Convierte un .glb en un glTF .json con el buffer embebido (base64).

El sitio publicado solo sirve tipos web comunes y .glb no está entre ellos; .json sí.
Uso: python -I tools/glb2json.py entrada.glb salida.gltf.json
"""
import base64
import json
import struct
import sys

src, dst = sys.argv[1], sys.argv[2]
with open(src, "rb") as f:
    data = f.read()
magic, version, total = struct.unpack_from("<4sII", data, 0)
assert magic == b"glTF" and version == 2, (magic, version)
off, js, binary = 12, None, b""
while off < total:
    clen, ctype = struct.unpack_from("<II", data, off)
    chunk = data[off + 8: off + 8 + clen]
    if ctype == 0x4E4F534A:
        js = json.loads(chunk)
    elif ctype == 0x004E4942:
        binary = chunk
    off += 8 + clen
if js.get("buffers"):
    js["buffers"][0]["uri"] = "data:application/octet-stream;base64," + base64.b64encode(binary).decode("ascii")
with open(dst, "w", encoding="utf-8") as f:
    json.dump(js, f, separators=(",", ":"))
print(dst.split("/")[-1], round(len(data) / 1024), "KB ->", round(len(json.dumps(js)) / 1024), "KB")
