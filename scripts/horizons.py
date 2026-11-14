#!/usr/bin/env python3
"""Fetch real trajectories once from JPL Horizons and store them in src/trajectories.json.
The site only reads the JSON; it never calls the API. Run: python3 scripts/horizons.py
Positions: heliocentric, ecliptic J2000, in AU. API: https://ssd-api.jpl.nasa.gov/doc/horizons.html"""
import json, re, sys, time, datetime as dt, urllib.parse, urllib.request

N = 160
BODY = {'earth': '399', 'mars': '499', 'jupiter': '599', 'eros': '433;', 'vesta': '4;', 'ceres': '1;'}
PERIOD = {'earth': 366, 'mars': 687, 'jupiter': 4333, 'eros': 643, 'vesta': 1326, 'ceres': 1682}  # days, for orbit rings
# mission id in the app -> Horizons spacecraft id, span, bodies drawn with it
MISSIONS = {
    'pioneer10':   ('-23',  '1972-03-04', '1974-12-31', ['earth', 'jupiter']),
    'near':        ('-93',  '1996-02-20', '2001-02-12', ['earth', 'eros']),
    'pathfinder':  ('-530', '1996-12-05', '1997-07-04', ['earth', 'mars']),
    'spirit':      ('-254', '2003-06-11', '2004-01-04', ['earth', 'mars']),
    'opportunity': ('-253', '2003-07-09', '2004-01-25', ['earth', 'mars']),
    'phoenix':     ('-84',  '2007-08-05', '2008-05-25', ['earth', 'mars']),
    'dawn':        ('-203', '2007-09-28', '2018-10-31', ['earth', 'mars', 'vesta', 'ceres']),
    'kepler':      ('-227', '2009-03-08', '2018-10-30', ['earth']),
    'insight':     ('-189', '2018-05-06', '2018-11-26', ['earth', 'mars']),
    'ingenuity':   ('-168', '2020-07-31', '2021-02-18', ['earth', 'mars']),
}

def query(cmd, start, stop, step):
    p = {'format': 'json', 'COMMAND': f"'{cmd}'", 'OBJ_DATA': 'NO', 'MAKE_EPHEM': 'YES', 'EPHEM_TYPE': 'VECTORS', 'CENTER': "'500@10'",
         'START_TIME': f"'{start}'", 'STOP_TIME': f"'{stop}'", 'STEP_SIZE': f"'{step}'", 'VEC_TABLE': '1', 'REF_PLANE': 'ECLIPTIC',
         'OUT_UNITS': 'AU-D', 'CSV_FORMAT': 'YES'}
    for _ in range(3):
        try:
            return json.load(urllib.request.urlopen('https://ssd.jpl.nasa.gov/api/horizons.api?' + urllib.parse.urlencode(p), timeout=90))['result']
        except Exception as e:
            err = e; time.sleep(3)
    raise err

MON = {m: i + 1 for i, m in enumerate('JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split())}
def vectors(cmd, start, stop, step=N):
    """Returns (start, stop, [x,y,z,...]); clamps the span to the ephemeris Horizons actually has."""
    for _ in range(4):
        r = query(cmd, start, stop, step)
        rows = re.findall(r'^\d{7}\.\d+,[^,]+,\s*([-+.\dE]+),\s*([-+.\dE]+),\s*([-+.\dE]+),', r, re.M)
        if rows:
            name = re.search(r'Target body name: (.+?)(?:\s{2,}|\s*\{|$)', r, re.M).group(1)
            return start, stop, [round(float(v), 4) for row in rows for v in row], name
        m = re.search(r'(prior to|after) A\.D\. (\d{4})-([A-Z]{3})-(\d\d) (\d\d):(\d\d)', r)
        if not m: raise RuntimeError(f'{cmd}: {r[-600:]}')
        t = dt.datetime(int(m[2]), MON[m[3]], int(m[4]), int(m[5]), int(m[6])) + dt.timedelta(hours=2 if m[1] == 'prior to' else -2)
        if m[1] == 'prior to': start = t.strftime('%Y-%m-%d %H:%M')
        else: stop = t.strftime('%Y-%m-%d %H:%M')
    raise RuntimeError(cmd)

out = {'source': 'NASA/JPL Horizons System, https://ssd.jpl.nasa.gov/horizons/', 'frame': 'Heliocentric, ecliptic J2000, AU',
       'generated': dt.date.today().isoformat(), 'rings': {}, 'missions': {}}
for b, cmd in BODY.items():
    s = dt.date(2010, 1, 1); _, _, v, _ = vectors(cmd, s.isoformat(), (s + dt.timedelta(days=PERIOD[b])).isoformat(), 120)
    out['rings'][b] = v; print('ring', b, len(v) // 3, file=sys.stderr)
for mid, (cmd, a, z, bodies) in MISSIONS.items():
    n = max(N, (dt.date.fromisoformat(z) - dt.date.fromisoformat(a)).days // 6)  # long missions need more points to stay smooth
    a, z, v, name = vectors(cmd, a, z, n)
    e = {'horizons': name, 'start': a, 'stop': z, 'craft': v, 'bodies': {}}
    for b in bodies: e['bodies'][b] = vectors(BODY[b], a, z, n)[2]; assert len(e['bodies'][b]) == len(v)
    out['missions'][mid] = e; print(mid, name, a, z, len(v) // 3, file=sys.stderr)
json.dump(out, open('src/trajectories.json', 'w'), separators=(',', ':'))
