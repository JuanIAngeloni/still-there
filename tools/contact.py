"""Hoja de contactos de una toma capturada: python tools/contact.py <toma> [columnas] [ancho_celda]"""
import pathlib, sys, site
sys.path.append(site.getusersitepackages())
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent / "capture"
seq = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 6; cw = int(sys.argv[3]) if len(sys.argv) > 3 else 420
files = sorted((root / seq).glob("*.jpg"))
ims = [Image.open(f) for f in files]
w, h = ims[0].size; ch = round(cw * h / w); rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cw, rows * ch), (0, 0, 0))
for i, im in enumerate(ims):
    sheet.paste(im.resize((cw, ch), Image.LANCZOS), ((i % cols) * cw, (i // cols) * ch))
out = root / (seq + "_sheet.jpg"); sheet.save(out, quality=88); print(out, sheet.size)
