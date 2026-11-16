"""Arma src/js/67-game-data.js a partir de docs/juego/eventos.json y revisa que los eventos del juego cumplan las reglas.

   Reglas que se comprueban:
   - cada evento tiene tres opciones y una sola correcta;
   - los largos de cada texto, en los dos idiomas;
   - las alertas van en mayúsculas y empiezan con «WARNING: » o «ALERTA: »;
   - sin rayas largas ni punto y coma;
   - la frase que relaciona un evento con una máquina real existe, letra por letra, en el archivo del sitio que se indica:
     el juego no agrega datos nuevos sobre las misiones reales.

   Uso: python -I tools/make_game_data.py            (con --borrador acepta misiones de menos de cuatro eventos)
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "juego" / "eventos.json"
OUT = ROOT / "src" / "js" / "67-game-data.js"
MISSIONS = {"moon", "mars", "asteroid"}
PHASES = ["launch", "cruise", "arrival", "ops", "extended"]
SYS = {"power", "comms", "attitude", "nav", "engine", "wheels", "thermal", "software", "weather"}
REAL = {"surveyor1", "apollo11", "viking1", "pathfinder", "spirit", "opportunity", "phoenix", "insight", "ingenuity",
        "near", "dawn", "kepler", "pioneer10", "pioneer11"}
LIMITS = {"alert": 64, "story": 230, "ask": 70, "why": 220}


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    errs = []

    def check_text(where, o, limit=None):
        for lg in ("es", "en"):
            v = o.get(lg, "") if isinstance(o, dict) else ""
            if not v.strip():
                errs.append("%s: falta el texto en %s" % (where, lg))
            if limit and len(v) > limit:
                errs.append("%s (%s): %d caracteres, el máximo es %d" % (where, lg, len(v), limit))
            for bad in ("—", "–", ";"):
                if bad in v:
                    errs.append("%s (%s): lleva %r" % (where, lg, bad))

    for m in data["missions"]:
        if m["id"] not in MISSIONS:
            errs.append("misión desconocida: %s" % m["id"])
        for f in ("name", "kind", "goal"):
            check_text("misión %s.%s" % (m["id"], f), m[f])
    keys = set()
    for e in data["events"]:
        k = e["key"]
        if k in keys:
            errs.append("clave repetida: %s" % k)
        keys.add(k)
        if e["phase"] not in PHASES:
            errs.append("%s: etapa %s" % (k, e["phase"]))
        if e["sys"] not in SYS:
            errs.append("%s: sistema %s" % (k, e["sys"]))
        if not e["for"] or not set(e["for"]) <= MISSIONS:
            errs.append("%s: lista de misiones %s" % (k, e["for"]))
        check_text(k + ".day", e["day"])
        for f, lim in LIMITS.items():
            check_text("%s.%s" % (k, f), e[f], lim)
        if not e["alert"]["en"].startswith("WARNING: ") or not e["alert"]["es"].startswith("ALERTA: "):
            errs.append("%s: la alerta no empieza con WARNING: / ALERTA: " % k)
        for lg in ("es", "en"):
            if e["alert"][lg] != e["alert"][lg].upper():
                errs.append("%s: la alerta (%s) no está en mayúsculas" % (k, lg))
        if len(e["options"]) != 3 or sum(1 for o in e["options"] if o["ok"]) != 1:
            errs.append("%s: tiene que haber tres opciones y una sola correcta" % k)
        for i, o in enumerate(e["options"]):
            check_text("%s.opción %d" % (k, i + 1), o["t"], 90)
            check_text("%s.resultado %d" % (k, i + 1), o["result"], 200)
        r = e.get("real") or {}
        if r.get("id"):
            if r["id"] not in REAL:
                errs.append("%s: máquina real desconocida %s" % (k, r["id"]))
            p = ROOT / r.get("file", "")
            txt = p.read_text(encoding="utf-8") if r.get("file") and p.is_file() else ""
            for lg in ("es", "en"):
                # en los archivos de datos el apóstrofo puede estar escapado dentro de una cadena entre comillas simples
                if not r.get(lg) or (r[lg] not in txt and r[lg].replace("'", "\\'") not in txt):
                    errs.append("%s: la frase real (%s) no está letra por letra en %s" % (k, lg, r.get("file")))
        else:
            e["real"] = None
    for m in data["missions"]:
        evs = [e for e in data["events"] if m["id"] in e["for"]]
        if len(evs) < 4 and "--borrador" not in sys.argv:
            errs.append("misión %s: solo %d eventos" % (m["id"], len(evs)))
        first = [next(i for i, o in enumerate(e["options"]) if o["ok"]) for e in evs if sum(1 for o in e["options"] if o["ok"]) == 1]
        if len(set(first)) < 2:
            errs.append("misión %s: la opción correcta cae siempre en el mismo lugar" % m["id"])
    if errs:
        print("\n".join("  - " + x for x in errs))
        print("%d problemas: no se escribió %s" % (len(errs), OUT.name))
        return 1
    head = ("/* ---------- juego: misiones ficticias y sus eventos ----------\n"
            "   Archivo generado por tools/make_game_data.py a partir de docs/juego/eventos.json (no editar a mano).\n"
            "   Las misiones son inventadas. La frase «real» de cada evento es una que ya está en el sitio. */\n")
    OUT.write_text(head + "var MG_DATA=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("%s: %d misiones, %d eventos" % (OUT.name, len(data["missions"]), len(data["events"])))
    for m in data["missions"]:
        print("  %s: %s" % (m["id"], ", ".join(e["key"] for p in PHASES for e in data["events"] if e["phase"] == p and m["id"] in e["for"])))
    return 0


if __name__ == "__main__":
    sys.exit(main())
