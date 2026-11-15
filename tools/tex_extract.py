"""Saca las texturas de un .glb a una carpeta: python -I tools/tex_extract.py <modelo.glb> <carpeta>"""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import pack_model as pm
src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
js, b = pm.read_glb(src)
for i, im in enumerate(js.get("images", [])):
    raw = pm.view_bytes(js, b, im["bufferView"]); ext = "png" if im.get("mimeType") == "image/png" else "jpg"
    (out / ("%s_%d.%s" % (src.stem, i, ext))).write_bytes(raw); print(i, im.get("name"), im.get("mimeType"), len(raw) // 1024, "KB")
