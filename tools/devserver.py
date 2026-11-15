"""Servidor local para desarrollo: sirve la carpeta del proyecto y acepta POST /save/<nombre>.

El POST lo usa tools/decode.html para guardar los modelos ya descomprimidos en assets/models_plain/.
Solo acepta nombres simples terminados en .glb, para no escribir fuera de esa carpeta.

Uso: python -I tools/devserver.py [puerto]
"""
import http.server
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SAVE = ROOT / "assets" / "models_plain"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def do_POST(self):
        # cuadros para el video de la demo: POST /frame/<toma>/<0001>.jpg -> capture/<toma>/0001.jpg
        f = re.fullmatch(r"/frame/([a-z0-9_]+)/(\d{4}\.(?:jpg|png))", self.path)
        if f:
            n = int(self.headers.get("Content-Length", "0"))
            out = ROOT / "capture" / f[1]
            out.mkdir(parents=True, exist_ok=True)
            (out / f[2]).write_bytes(self.rfile.read(n))
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")
            return
        m = re.fullmatch(r"/save/([a-z0-9_]+\.glb)", self.path)
        if not m:
            self.send_error(400, "nombre no permitido")
            return
        n = int(self.headers.get("Content-Length", "0"))
        SAVE.mkdir(parents=True, exist_ok=True)
        (SAVE / m[1]).write_bytes(self.rfile.read(n))
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")


port = int(sys.argv[1]) if len(sys.argv) > 1 else 5188
http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
