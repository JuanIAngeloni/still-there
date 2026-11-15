"""Arma el sitio en dist/.

- dist/index.html: la página (sin esqueleto html/head/body, así se publica tal cual).
- dist/preview.html: la misma página envuelta, para mirarla en local.
- dist/assets/: mapas, modelos 3D como glTF .json (el sitio publicado no sirve .glb) y las tablas de Horizons.

Uso: python -I tools/build.py
"""
import base64
import json
import pathlib
import shutil
import struct

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, DIST = ROOT / "src", ROOT / "dist"
s = (SRC / "page.html").read_text(encoding="utf-8")


def rep(old, new, count=1):
    global s
    assert s.count(old) == count, (s.count(old), old[:60])
    s = s.replace(old, new)


# --- enganches con la página de la Tierra ---
rep('three.min.js"></script>',
    'three.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>')
rep("__DAY_URI__", "assets/textures/earth_day_2048.jpg")
rep("__NIGHT_URI__", "assets/textures/earth_night_2048.jpg")
rep("function tick(dt,now){\n  if(renderer)applyOrbit(dt);",
    "function tick(dt,now){\n  if(EX.active){exTick(dt,now);return;}\n  if(JR.active){tickJourney(dt,now);return;}\n  if(renderer)applyOrbit(dt);")
rep("lensed=(m===lensM)?(1-0.7*k):1;", "lensed=1;")
rep("var show=renderer&&m.state!=='pre'&&m.scr.vis&&!(m===lensM&&k>0.3)", "var show=renderer&&m.state!=='pre'&&m.scr.vis")
rep("  if(live)renderLive(dt,now);", "  stage.classList.toggle('is-picking',k>0.45&&!!lensM&&!live);\n  if(live)renderLive(dt,now);")
rep("lensHint:'Clic para ampliar'", "lensHint:'Clic para ver el lanzamiento'")
rep("lensHint:'Click to enlarge'", "lensHint:'Click to watch the launch'")
mods = "\n".join((p.read_text(encoding="utf-8")) for p in sorted((SRC / "js").glob("*.js")))
rep("function loop(now){step(now);", mods + "\nfunction loop(now){step(now);")
rep("state:function(){return {sunFor:sunFor,",
    "jset:function(o){for(var q in o)JR[q]=o[q];},jgo:function(i){JR.si=i;enterSeg();},journey:function(id,ch){startJourney(allMissions().filter(function(m){return m.id===id;})[0],ch);},jnext:nextSeg,jend:endJourney,\n"
    "  ex:function(){return EX;},exfly:function(id){var e=EX.machines.filter(function(x){return x.m.id===id;})[0];if(e)exFlyMachine(e);},exenter:function(){exFromGlobe();},\n"
    "  learn:function(){return {LEARN:LEARN,LQ:LQ,card:learnCard,SF:SF,SP:SP,JR:JR,LX:LX};},open:function(id){openMission(allMissions().filter(function(m){return m.id===id;})[0]);},\n"
    "  jskip:function(sec){for(var i=0,n=Math.round(sec*30);i<n;i++){last+=33.333;tick(1/30,last);}},\n"
    "  jstate:function(){var s=JR.segs[JR.si];return JR.active?{sunEl:JR.sunEl,sunNote:JR.sunNote,seg:s&&s.id,si:JR.si,u:+JR.u.toFixed(2),jd:JR.jd,date:new Date(msOfJd(JR.jd)).toISOString(),scene:JR.scene,"
    "craft:[P3.craft.x,P3.craft.y,P3.craft.z].map(function(v){return +v.toFixed(3);}),cam:SP?[SP.camAbs.x,SP.camAbs.y,SP.camAbs.z].map(function(v){return +v.toFixed(6);}):null,"
    "dToDest:P3.tmp.copy(P3.craft).sub(P3.dest).length()*UNIT_KM}:null;},\n"
    "  state:function(){return {sunFor:sunFor,")

DIST.mkdir(exist_ok=True)
(DIST / "index.html").write_text(s, encoding="utf-8")
wrap = ('<!doctype html><html lang="es"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        "<style>:root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}"
        "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>"
        "</head><body>" + s + "</body></html>")
(DIST / "preview.html").write_text(wrap, encoding="utf-8")

# --- recursos ---
A = DIST / "assets"
(A / "textures").mkdir(parents=True, exist_ok=True)
(A / "models").mkdir(parents=True, exist_ok=True)
for f in (ROOT / "assets" / "textures").glob("*.jpg"):
    shutil.copy2(f, A / "textures" / f.name)
(A / "photos").mkdir(parents=True, exist_ok=True)
for f in (ROOT / "assets" / "photos").glob("*.jpg"):
    shutil.copy2(f, A / "photos" / f.name)
(A / "video").mkdir(parents=True, exist_ok=True)
for f in (ROOT / "assets" / "video").glob("*.mp4"):
    shutil.copy2(f, A / "video" / f.name)
(A / "audio").mkdir(parents=True, exist_ok=True)
for f in (ROOT / "assets" / "audio").glob("*.mp3"):
    shutil.copy2(f, A / "audio" / f.name)


def glb_to_json(src, dst):
    data = src.read_bytes()
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
    if js.get("buffers"):
        js["buffers"][0]["uri"] = "data:application/octet-stream;base64," + base64.b64encode(binary).decode("ascii")
    dst.write_text(json.dumps(js, separators=(",", ":")), encoding="utf-8")


models = {p.stem: p for p in (ROOT / "assets" / "models_plain").glob("*.glb")}
models["saturn_v"] = ROOT / "assets" / "models" / "saturn_v.glb"
for name, p in models.items():
    out = A / "models" / (name + ".gltf.json")
    if not out.exists() or out.stat().st_mtime < p.stat().st_mtime:
        glb_to_json(p, out)

hz = {}
for f in sorted((ROOT / "data" / "horizons").glob("*.json")):
    d = json.loads(f.read_text())
    local = d["center"] != "500@10"
    hz[f.stem] = [[round(r[0], 6)] + [round(v, 1 if local else 0) for v in r[1:4]] + [round(v, 6) for v in r[4:7]] for r in d["rows"]]
(A / "horizons.json").write_text(json.dumps(hz, separators=(",", ":")), encoding="utf-8")

size = lambda p: round(p.stat().st_size / 1024)
print("index.html", size(DIST / "index.html"), "KB | horizons", size(A / "horizons.json"), "KB | modelos",
      sum(size(p) for p in (A / "models").glob("*")), "KB")
