"""Baja de JPL Horizons los vectores de posición y velocidad que usa el viaje de cada misión.

Marco: eclíptica y equinoccio J2000 (ICRF). Unidades: km y km/s.
Cada trabajo se guarda en data/horizons/<clave>.json como lista de filas [JD_TDB, x, y, z, vx, vy, vz].
Si una nave no tiene efemérides para toda la ventana pedida, se recorta a lo que Horizons tiene.

Uso: python -I tools/horizons.py [clave ...]     (sin claves baja todo lo que falte)
"""
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://ssd.jpl.nasa.gov/api/horizons.api"
OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "horizons"
SUN, EARTH, MOON_C, MARS_C = "500@10", "500@399", "500@301", "500@499"

# (clave, objetivo, centro, inicio, fin, paso)
JOBS = [
    # órbitas completas, para dibujar
    ("orbit_earth", "399", SUN, "2000-01-01", "2001-01-01", "3 d"),
    ("orbit_mars", "499", SUN, "2000-01-01", "2001-11-20", "4 d"),
    ("orbit_jupiter", "599", SUN, "2000-01-01", "2011-11-20", "20 d"),
    ("orbit_saturn", "699", SUN, "2000-01-01", "2029-06-01", "45 d"),
    ("orbit_eros", "433;", SUN, "2000-01-01", "2001-10-10", "4 d"),
    ("orbit_vesta", "4;", SUN, "2000-01-01", "2003-08-20", "8 d"),
    ("orbit_ceres", "1;", SUN, "2000-01-01", "2004-08-15", "8 d"),
    # Surveyor 1 y Apollo 11: la Luna vista desde la Tierra, y la Tierra vista desde el Sol (para la luz)
    ("surveyor1_moon", "301", EARTH, "1966-05-30 12:00", "1966-06-02 08:00", "30 m"),
    ("surveyor1_earth", "399", SUN, "1966-05-29", "1966-06-03", "6 h"),
    ("apollo11_moon", "301", EARTH, "1969-07-16 12:00", "1969-07-21 00:00", "30 m"),
    ("apollo11_earth", "399", SUN, "1969-07-15", "1969-07-22", "6 h"),
    # paso por Júpiter de las Pioneer, vistas desde Júpiter, cada media hora
    ("pioneer10_fly", "-23", "500@599", "1973-11-21", "1973-12-17", "30 m"),
    ("pioneer11_fly", "-24", "500@599", "1974-11-20", "1974-12-16", "30 m"),
    # hoy: dónde está todo, para explorar con zoom continuo (Luna desde la Tierra; el resto desde el Sol)
    ("now_earth", "399", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_moon", "301", EARTH, "2026-11-13", "2027-03-01", "6 h"),
    ("now_mars", "499", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_jupiter", "599", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_saturn", "699", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_eros", "433;", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_ceres", "1;", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_vesta", "4;", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_pioneer10", "-23", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_pioneer11", "-24", SUN, "2026-11-13", "2027-03-01", "1 d"),
    ("now_kepler", "-227", SUN, "2026-11-13", "2027-03-01", "1 d"),
]
# Misiones interplanetarias: (id, código Horizons, inicio, llegada, destino, centro del destino, paso de crucero)
SC = [
    ("pathfinder", "-530", "1996-12-04 07:00", "1997-07-04 16:50", "499", MARS_C, "1 d"),
    ("spirit", "-254", "2003-06-10 18:00", "2004-01-04 04:30", "499", MARS_C, "1 d"),
    ("opportunity", "-253", "2003-07-08 03:30", "2004-01-25 05:00", "499", MARS_C, "1 d"),
    ("phoenix", "-84", "2007-08-04 09:40", "2008-05-25 23:30", "499", MARS_C, "1 d"),
    ("near", "-93", "1996-02-17 21:00", "2001-02-12 19:00", "433;", None, "2 d"),
    ("dawn", "-203", "2007-09-27 12:00", "2015-03-06 12:00", "1;", None, "3 d"),
    ("pioneer10", "-23", "1972-03-03 02:00", "2026-11-14", "599", None, "10 d"),
    ("pioneer11", "-24", "1973-04-06 02:30", "2026-11-14", "599", None, "10 d"),
    ("kepler", "-227", "2009-03-07 04:00", "2018-11-15", None, None, "5 d"),
]
for mid, code, t0, t1, dest, dcenter, step in SC:
    JOBS.append((mid + "_sc", code, SUN, t0, t1, step))          # crucero, desde el Sol
    JOBS.append((mid + "_dep", code, EARTH, t0, "+2d", "20 m"))    # salida, desde la Tierra
    JOBS.append((mid + "_earth", "399", SUN, t0, t1, step))
    if dest:
        JOBS.append((mid + "_dest", dest, SUN, t0, t1, step))
    if dcenter:
        JOBS.append((mid + "_arr", code, dcenter, "-2d", t1, "20 m"))  # llegada, desde Marte

MON = {m: i for i, m in enumerate("JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(), 1)}


def parse_ad(s):
    """'2003-JUL-08 04:38:54.2000' -> '2003-07-08 04:39' (redondeado hacia adentro un minuto)."""
    m = re.match(r"(\d{4})-([A-Z]{3})-(\d{2}) (\d{2}):(\d{2})", s)
    y, mo, d, hh, mm = int(m[1]), MON[m[2]], int(m[3]), int(m[4]), int(m[5])
    return f"{y:04d}-{mo:02d}-{d:02d} {hh:02d}:{mm:02d}"


def shift(t, days):
    import datetime as dt
    base = dt.datetime.strptime(t if " " in t else t + " 00:00", "%Y-%m-%d %H:%M")
    return (base + dt.timedelta(days=days)).strftime("%Y-%m-%d %H:%M")


def query(cmd, center, start, stop, step):
    p = {"format": "json", "COMMAND": f"'{cmd}'", "OBJ_DATA": "'NO'", "MAKE_EPHEM": "'YES'", "EPHEM_TYPE": "'VECTORS'",
         "CENTER": f"'{center}'", "START_TIME": f"'{start}'", "STOP_TIME": f"'{stop}'", "STEP_SIZE": f"'{step}'",
         "VEC_TABLE": "'2'", "REF_PLANE": "'ECLIPTIC'", "REF_SYSTEM": "'ICRF'", "OUT_UNITS": "'KM-S'",
         "CSV_FORMAT": "'YES'", "VEC_LABELS": "'NO'"}
    with urllib.request.urlopen(API + "?" + urllib.parse.urlencode(p), timeout=90) as r:
        res = json.load(r)["result"]
    if "$$SOE" not in res:
        return None, res
    rows = []
    for line in res.split("$$SOE")[1].split("$$EOE")[0].strip().splitlines():
        f = [x.strip() for x in line.split(",")]
        rows.append([round(float(f[0]), 6)] + [float(x) for x in f[2:8]])
    return rows, res


def run(key, cmd, center, start, stop, step):
    if stop.startswith("+"):
        stop = shift(start, float(stop[1:-1]))
    if start.startswith("-"):
        start = shift(stop, -float(start[1:-1]))
    for _ in range(3):
        rows, res = query(cmd, center, start, stop, step)
        if rows:
            break
        before = re.search(r"prior to A\.D\. (\S+ \S+)", res)
        after = re.search(r"after A\.D\. (\S+ \S+)", res)
        if before:
            start = shift(parse_ad(before[1]), 1 / 1440)
        elif after:
            stop = shift(parse_ad(after[1]), -1 / 1440)
        else:
            print("  FALLA", key, res.strip().splitlines()[-1][:160])
            return
        time.sleep(1)
    if not rows:
        print("  FALLA", key)
        return
    (OUT / f"{key}.json").write_text(json.dumps({"target": cmd, "center": center, "start": start, "stop": stop,
                                                 "step": step, "rows": rows}, separators=(",", ":")))
    print(f"  {key}: {len(rows)} filas, {start} -> {stop}")


OUT.mkdir(parents=True, exist_ok=True)
want = set(sys.argv[1:])
for job in JOBS:
    if (want and job[0] not in want) or (not want and (OUT / f"{job[0]}.json").exists()):
        continue
    run(*job)
    time.sleep(1)
