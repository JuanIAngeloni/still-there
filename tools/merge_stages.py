"""Une la investigación de etapas (docs/etapas/*.json) en src/js/66-stages-data.js y revisa que sea coherente.

Uso: python -I tools/merge_stages.py

Cada archivo de docs/etapas/ trae {ROCKETS_INFO: {...}, LAUNCH_SEQ: {...}} de una familia de cohetes, con la
fuente de cada dato. Acá no se cambia ningún dato: solo se juntan y se avisa si algo no cierra con las piezas
que tienen los modelos 3D (wip/SPEC.md).
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ORDER = ["atlas_centaur", "heavy", "delta2_mars", "delta2_other", "atlas5"]
PARTS = {
    "atlasCentaur": ["boosterSection", "stage1", "interstage", "fairingA", "fairingB", "stage2", "payloadMount"],
    "atlasCentaurTE": ["boosterSection", "stage1", "interstage", "fairingA", "fairingB", "stage2", "stage3", "payloadMount"],
    "saturnV": ["les", "stage1", "interstage", "stage2", "stage3", "payloadMount"],
    "titan3e": ["srbGround", "stage1", "stage2", "stage3", "fairingA", "fairingB", "payloadMount"],
    "delta7925": ["srbGround", "srbAir", "stage1", "interstage", "stage2", "stage3", "fairingA", "fairingB", "payloadMount"],
    "atlasV401": ["stage1", "interstage", "stage2", "fairingA", "fairingB", "payloadMount"],
    "atlasV541": ["srbGround", "stage1", "stage2", "fairingA", "fairingB", "payloadMount"],
}
PARTS["delta7925H"] = PARTS["delta7925_10L"] = PARTS["delta7925"]
WHERE = {"ocean", "burned", "earthOrbit", "sunOrbit", "moonImpact", "onMoon", "moonOrbit", "marsImpact", "onMars", "marsAtmosphere", "unknown"}
MISSIONS = ["surveyor1", "apollo11", "pioneer10", "pioneer11", "viking1", "near", "pathfinder", "spirit", "opportunity", "phoenix", "dawn", "kepler", "insight", "ingenuity"]

info, seq, warn = {}, {}, []
for name in ORDER:
    j = json.loads((ROOT / "docs" / "etapas" / (name + ".json")).read_text(encoding="utf-8"))
    for k, v in j.get("ROCKETS_INFO", {}).items():
        info.setdefault(k, v)
    for k, v in j.get("LAUNCH_SEQ", {}).items():
        seq[k] = v

for m in MISSIONS:
    if m not in seq:
        warn.append("falta la secuencia de " + m)
        continue
    q = seq[m]
    key = q.get("rocket")
    if key not in PARTS:
        warn.append("%s: cohete desconocido %r" % (m, key))
        continue
    if key not in info:
        warn.append("%s: falta ROCKETS_INFO de %s" % (m, key))
    ok = set(PARTS[key]) | {"fairing"}
    gone = set()
    for i, s in enumerate(q.get("steps", [])):
        for f in ("title", "text"):
            if not (isinstance(s.get(f), dict) and s[f].get("es") and s[f].get("en")):
                warn.append("%s paso %d: falta %s en es o en" % (m, i, f))
        for f in ("drop", "ignite", "shutdown"):
            for part in s.get(f, []) or []:
                if part not in ok:
                    warn.append("%s paso %d: %s de una pieza que el modelo no tiene: %s" % (m, i, f, part))
                if f == "drop":
                    gone.add(part)
        if i > 0 and not isinstance(s.get("t"), (int, float)):
            warn.append("%s paso %d: sin tiempo" % (m, i))
    ts = [s["t"] for s in q.get("steps", []) if isinstance(s.get("t"), (int, float))]
    if ts != sorted(ts):
        warn.append("%s: los tiempos no van en orden %s" % (m, ts))
    fates = {f.get("part") for f in q.get("fates", [])}
    for f in q.get("fates", []):
        if f.get("where") not in WHERE:
            warn.append("%s: destino desconocido %r en %s" % (m, f.get("where"), f.get("part")))
        if f.get("part") not in ok:
            warn.append("%s: destino de una pieza que el modelo no tiene: %s" % (m, f.get("part")))
    for part in gone:
        if part not in fates and not (part == "fairingB" and "fairingA" in fates) and part != "fairing":
            warn.append("%s: se suelta %s pero no dice dónde terminó" % (m, part))
    for f in q.get("left", []) or []:
        if f.get("where") not in WHERE:
            warn.append("%s: destino desconocido %r en 'left'" % (m, f.get("where")))

head = ("/* ---------- lanzamientos: pasos, tiempos reales y qué pasó con cada parte del cohete ----------\n"
        "   Archivo generado por tools/merge_stages.py a partir de docs/etapas/*.json (no editar a mano).\n"
        "   La fuente de cada dato está en el campo src y el detalle de la verificación en docs/etapas/*.md. */\n")
out = head + "var ROCKETS_INFO=" + json.dumps(info, ensure_ascii=False, separators=(",", ":")) + ";\n" \
    + "var LAUNCH_SEQ=" + json.dumps(seq, ensure_ascii=False, separators=(",", ":")) + ";\n"
(ROOT / "src" / "js" / "66-stages-data.js").write_text(out, encoding="utf-8")
print("cohetes:", len(info), "| misiones:", len(seq), "|", len(out) // 1024, "KB")
for m in MISSIONS:
    if m in seq:
        q = seq[m]
        print("  %-12s %-15s %-11s pasos %2d  destinos %2d  quedaron %d" % (m, q.get("rocket"), q.get("site"), len(q.get("steps", [])), len(q.get("fates", [])), len(q.get("left", []) or [])))
print("avisos:", len(warn))
for w in warn:
    print("  -", w.encode("ascii", "replace").decode())
