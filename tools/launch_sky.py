"""Baja de JPL Horizons dónde estaban el Sol, la Luna y los planetas en el minuto de cada despegue.

Marco: eclíptica J2000 (ICRF), centrado en la Tierra, en km. Escribe src/js/64-launch-sky-data.js.
Uso: python -I tools/launch_sky.py
"""
import datetime as dt
import json
import pathlib
import time
import urllib.parse
import urllib.request

API = "https://ssd.jpl.nasa.gov/api/horizons.api"
OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "js" / "64-launch-sky-data.js"
BODIES = [("sun", "10"), ("moon", "301"), ("mercury", "199"), ("venus", "299"), ("mars", "499"),
          ("jupiter", "599"), ("saturn", "699"), ("uranus", "799"), ("neptune", "899")]
LAUNCH = {"surveyor1": "1966-05-30 14:41", "apollo11": "1969-07-16 13:32", "pioneer10": "1972-03-03 01:49",
          "pioneer11": "1973-04-06 02:11", "viking1": "1975-08-20 21:22", "near": "1996-02-17 20:43",
          "pathfinder": "1996-12-04 06:58", "spirit": "2003-06-10 17:58", "opportunity": "2003-07-08 03:18",
          "phoenix": "2007-08-04 09:26", "dawn": "2007-09-27 11:34", "kepler": "2009-03-07 03:49",
          "insight": "2018-05-05 11:05", "ingenuity": "2020-07-30 11:50"}


def vec(cmd, start):
    stop = (dt.datetime.strptime(start, "%Y-%m-%d %H:%M") + dt.timedelta(minutes=1)).strftime("%Y-%m-%d %H:%M")
    p = {"format": "json", "COMMAND": f"'{cmd}'", "OBJ_DATA": "'NO'", "MAKE_EPHEM": "'YES'", "EPHEM_TYPE": "'VECTORS'",
         "CENTER": "'500@399'", "START_TIME": f"'{start}'", "STOP_TIME": f"'{stop}'", "STEP_SIZE": "'1 m'",
         "VEC_TABLE": "'1'", "REF_PLANE": "'ECLIPTIC'", "REF_SYSTEM": "'ICRF'", "OUT_UNITS": "'KM-S'",
         "CSV_FORMAT": "'YES'", "VEC_LABELS": "'NO'"}
    for _ in range(4):
        try:
            with urllib.request.urlopen(API + "?" + urllib.parse.urlencode(p), timeout=90) as r:
                res = json.load(r)["result"]
            f = [x.strip() for x in res.split("$$SOE")[1].split("$$EOE")[0].strip().splitlines()[0].split(",")]
            return [round(float(x)) for x in f[2:5]]
        except Exception as e:  # noqa: BLE001
            print("  reintento", cmd, start, e)
            time.sleep(3)
    raise SystemExit(f"FALLA {cmd} {start}")


sky = {}
for mid, when in LAUNCH.items():
    sky[mid] = {name: vec(code, when) for name, code in BODIES}
    print(mid, sky[mid]["moon"])
    time.sleep(0.3)
OUT.write_text("/* Dónde estaban el Sol, la Luna y los planetas en el minuto de cada despegue: vectores desde el centro de la Tierra,\n"
               "   en km, eclíptica J2000. Fuente: JPL Horizons (ssd.jpl.nasa.gov). Lo genera tools/launch_sky.py. */\n"
               "var LAUNCH_SKY=" + json.dumps(sky, separators=(",", ":")) + ";\n", encoding="utf-8")
