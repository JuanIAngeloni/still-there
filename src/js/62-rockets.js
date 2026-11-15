/* ---------- 62-rockets.js: procedural 3D launch vehicles (three.js r128, global THREE) ----------
   API
     ROCKET_OF            machine id -> rocket key
     buildRocket3D(key)   -> { key, name, root, parts, height, engines, payloadY, fairingRadius }
   Conventions
   - Metres at real size, +Y up, rocket on the Y axis, the lowest nozzle exit at y = 0.
   - Every canonical part id (wip/SPEC.md) is a THREE.Group, DIRECT child of root, group.name = id.
     Part groups sit at the origin with no rotation: what is inside them is in root coordinates, so an
     engine position from `engines` is also valid inside its own part group.
     Exceptions: payloadMount is an empty group placed at the bottom centre of the payload space
     (position.y = payloadY); each solid booster is its own sub-group inside srbGround / srbAir, placed on
     the booster axis (position x, 0, z; rotation.y = its clock angle, local +Z points away from the core),
     so boosters can peel off one by one.
   - fairingA is the x > 0 half of the nose fairing, fairingB the x < 0 half, cut by the plane x = 0 and closed
     when untouched. All materials are double-sided, so the inside of every shell shows when a piece comes off.
   - engines: [{ part, x, y, z, r }] = centre and radius of every nozzle exit, in root coordinates, upper
     stages and boosters included. The Apollo service-module engine is modelled but not listed.
   - Colours are authored in sRGB and converted to linear: render with renderer.outputEncoding = sRGBEncoding.
     The metal skins (steel, aluminium, bronze, nozzles) need scene.environment to look right; without it they are dull.
   - Geometries and materials are cached and shared by every rocket built: clone a material before changing it
     (opacity, colour) on one piece, or the change shows on all of them.
   - Pieces that have no id of their own (and what they ride on):
       Saturn V   S-II/S-IVB cone -> stage2 (it stayed on the S-II); instrument unit and adapter panels -> stage3;
                  payloadMount = adapter base (top of the instrument unit), where the lunar module sits; its
                  children are the service module and the command module; the escape tower and the white
                  boost cover are `les`.
       Titan IIIE Centaur interstage adapter -> stage2; the shroud halves include the boattail.
       Atlas V 541 interstage cylinder and boattail -> stage1 (they stayed on the booster).
       Delta II   the spin table rides with stage3 (on the real rocket it stayed on the second stage).
       Atlas-Centaur  the Centaur insulation panels stay on stage2 (the real ones were dropped in flight).
   - No logos, flags or lettering anywhere.

   DIMENSIONS (m). A source letter means the figure was read in that document; "approx." = not sourced
   (from memory or fitted by eye), kept only to place joints inside a sourced overall size.
     [P1] NASA Phoenix launch press kit    https://www.jpl.nasa.gov/news/press_kits/phoenix-launch-presskit.pdf
     [P2] NASA Mars Exploration Rover launches press kit  https://www.jpl.nasa.gov/news/press_kits/merlaunch.pdf
     [P3] ULA Delta II Payload Planners Guide, Dec 2006   https://www.ulalaunch.com/docs/default-source/rockets/deltaiipayloadplannersguide2007.pdf
     [A1] NASA TN D-4580, Atlas-Centaur AC-10 flight (Surveyor 1)  https://ntrs.nasa.gov/api/citations/19680014866/downloads/19680014866.pdf
     [A2] NASA "Pioneer F and G: Mission to Jupiter"      https://ntrs.nasa.gov/api/citations/19730012132/downloads/19730012132.pdf
     [S1] NASA "What Was the Saturn V?"                   https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/
     [S2] NASA Technical Information Summary, Apollo 11 (AS-506)  https://ntrs.nasa.gov/api/citations/19700011707/downloads/19700011707.pdf
     [T1] NASA Viking press kit (1975)                    https://ntrs.nasa.gov/api/citations/19750018961/downloads/19750018961.pdf
     [V1] NASA InSight launch press kit                   https://www.jpl.nasa.gov/news/press_kits/insight/launch/mission/
     [V2] NASA Mars 2020 Perseverance launch press kit    https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/

   key             figure                                   value            source
   delta7925       overall height                           39.6 (130 ft)    P1, P2   (model 39.07)
                   tip to boattail (Sta 219.22 to 1722)     38.17            P3       (nozzle below the boattail 0.9, approx.)
                   core diameter                            2.44 (8 ft)      P3
                   GEM-40 booster: diameter, height         1.016, about 13  P2, P1
                   fairing 9.5 ft: diameter, length         2.896, 8.488     P3 (profile from its figure 3-1)
                   fairing base / payload separation plane  Sta 553.39 / 413.95  P3
                   Star 48B: diameter, length               1.245, 2.032     P3
                   first-stage sections, interstage 4.7     approx.
   delta7925H      overall height                           39.6             P2       (model 39.07)
                   GEM-46 booster diameter                  1.168            P2
                   GEM-46 booster height                    14.7             approx.
   delta7925_10L   10L fairing: diameter, length            3.0, 9.25        P3 (10 ft fairing 8.89 long, 10L is 0.36 longer)
                   overall height                           about 40.4       derived: 39.6 + (9.25 - 8.49); model 39.83
   atlasCentaur    overall height, diameter                 34.4 (113 ft), 3.05 (10 ft)   A1
                   Atlas / Centaur with nose fairing        19.8 (65 ft) / 14.6 (48 ft)   A1
                   fairing base, interstage cut             Centaur Sta 219, 413          A1 (joints placed from these, approx.)
   atlasCentaurTE  overall height, diameter                 about 39.6 (130 ft), 3.05     A2  (model 39.62)
                   Centaur length                           9.1 (30 ft)      A2
                   Atlas SLV-3C tank stretch 1.3, third-stage motor 0.93 diameter   approx.
   saturnV         overall height                           111 (363 ft)     S1       (model 110.65)
                   S-IC length, diameter                    42.1 (138 ft), 10.06 (33 ft)  S2
                   S-II length, diameter                    about 24.7 (81 ft), 10.06     S2  (model 24.85 with its aft ring)
                   command module length, diameter          about 3.4 (11 ft), 3.7 (12 ft)  S2 (model 3.5, 3.91)
                   S-IVB 6.6 diameter and 17.9 long, instrument unit 0.9, adapter 8.5, escape tower 10.1, tank joints   approx.
   titan3e         overall height                           48.8 (160 ft)    T1
                   solid motors: diameter, length           3.05, 25.9       T1
                   core diameter, stage 1, stage 2          3.05, 22.2, 7.1  T1
                   Centaur D-1T: length, diameter           9.1 (9.6 with adapter), 3.05   T1
                   Centaur Standard Shroud: length, diameter  17.6, 4.2 (14 ft)   T1  (model 4.27 = 14 ft)
   atlasV401       overall height                           57.3 (188 ft)    V1
                   Common Core Booster: length, diameter    32.5, 3.81       V1
                   Centaur: length, diameter                12.7, 3.05       V1
                   fairing: length, diameter                12.2, 4.2        V1
   atlasV541       overall height                           60 (197 ft)      V2
                   fairing diameter                         5 m class (5.4 outside, approx.)   V2
                   fairing length 20.7, boosters 1.58 x 19.5   approx.

   NASA's Saturn V model, assets/models/saturn_v.glb (inspected with tools/glbinfo.py and its JSON chunk; NOT loaded
   here): 22 meshes, 34,814 triangles, 2.0 x 13.0 x 2.0 units, not centred on the origin (axis near x -0.01, z 0.74).
   By its body diameter it is about 8.1 m per unit, which makes it 105 m tall: shorter in proportion than the real
   rocket. The whole body from the S-IC to the escape tower is ONE mesh ("pCylinder1", y 0.28 to 12.85) cut only
   by material: white, black roll pattern, a tan band, corrugated bands and decal textures (USA, UNITED STATES,
   flags). So it is NOT separable by stage as it comes: the body would have to be cut and capped at y planes,
   about 4.85 (S-IC / interstage ring), 5.45 (ring / S-II), 7.75 (S-II / cone) and 8.43 units (cone / S-IVB),
   where its own joint rings are. Separate nodes exist only for the five F-1 engines ("polySurfa*"), the four
   engine fairings, the four fins, four tunnels and four small thrusters on the service module.
   Its decals carry lettering and flags. Its black areas were used here only as a guide for the roll pattern. */
var ROCKET_OF = { surveyor1: 'atlasCentaur', pioneer10: 'atlasCentaurTE', pioneer11: 'atlasCentaurTE', apollo11: 'saturnV', viking1: 'titan3e',
  near: 'delta7925', pathfinder: 'delta7925', spirit: 'delta7925', opportunity: 'delta7925H', phoenix: 'delta7925', dawn: 'delta7925H',
  kepler: 'delta7925_10L', insight: 'atlasV401', ingenuity: 'atlasV541' };

var RK = (function () {
  var PI = Math.PI, TAU = PI * 2, D2R = PI / 180;
  var sin = Math.sin, cos = Math.cos;
  var matC = {}, geoC = {}, texC = {};
  var B = null;                      /* build in progress */

  /* palette: sRGB colour, roughness, metalness */
  var PAL = {
    white: [0xf2f2ee, 0.58, 0.05], whiteWarm: [0xeeebe0, 0.66, 0.03], whiteDim: [0xd9d9d3, 0.62, 0.05],
    black: [0x17181b, 0.62, 0.08], dark: [0x33363b, 0.50, 0.55], nozzle: [0x50535a, 0.40, 0.65], grey: [0x8b9096, 0.55, 0.35],
    alu: [0xb4b9be, 0.42, 0.55], steel: [0xd3d8dc, 0.24, 0.62], steelDull: [0xb7bcc1, 0.36, 0.55], silver: [0xdfe3e6, 0.20, 0.62],
    teal: [0x1b8288, 0.50, 0.22], tealDark: [0x156a70, 0.52, 0.22],
    bronze: [0xb4703d, 0.42, 0.50], bronzeDark: [0x8e5932, 0.46, 0.48],
    foil: [0xc9913f, 0.38, 0.55], green: [0x5f8f5c, 0.50, 0.30], tan: [0xd8ccb2, 0.70, 0.02], titan: [0xe5e7e5, 0.50, 0.12]
  };
  function hex(n) { return '#' + ('000000' + n.toString(16)).slice(-6); }

  /* small canvas textures: roll pattern, corrugated skins, weld seams. Without a document they are skipped. */
  function canvasTex(key) {
    if (texC[key] !== undefined) return texC[key];
    var t = null;
    if (typeof document !== 'undefined' && document && document.createElement) {
      try {
        var c = document.createElement('canvas'), g, i, n, k = key.split(':');
        if (k[0] === 'roll8') {                 /* eight 45-degree sectors, black on 45-90, 135-180, 225-270, 315-360 */
          c.width = 512; c.height = 4; g = c.getContext('2d');
          g.fillStyle = hex(PAL.white[0]); g.fillRect(0, 0, 512, 4);
          g.fillStyle = hex(PAL.black[0]); for (i = 1; i < 8; i += 2) g.fillRect(i * 64, 0, 64, 4);
        } else if (k[0] === 'corrW' || k[0] === 'corrAl') {   /* vertical corrugations, 128 around */
          var al = k[0] === 'corrAl';
          c.width = 512; c.height = 4; g = c.getContext('2d');
          g.fillStyle = al ? '#b4b9be' : hex(PAL.white[0]); g.fillRect(0, 0, 512, 4);
          for (i = 0; i < 128; i++) {
            g.fillStyle = al ? '#8a8f95' : '#c2c3bd'; g.fillRect(i * 4, 0, 1, 4);
            g.fillStyle = al ? '#cfd3d7' : '#ffffff'; g.fillRect(i * 4 + 2, 0, 1, 4);
          }
        } else {                                /* 'steel:n': n welded bands of polished steel */
          n = +k[1] || 16; c.width = 4; c.height = 512; g = c.getContext('2d');
          for (i = 0; i < n; i++) {
            g.fillStyle = i % 2 ? '#c9ced3' : '#d6dbdf'; g.fillRect(0, i * 512 / n, 4, 512 / n + 1);
            g.fillStyle = '#9ba1a7'; g.fillRect(0, i * 512 / n, 4, 2);
          }
        }
        t = new THREE.CanvasTexture(c);
        t.encoding = THREE.sRGBEncoding; t.wrapS = THREE.RepeatWrapping; t.anisotropy = 4;
      } catch (e) { t = null; }
    }
    texC[key] = t; return t;
  }
  /* Every skin is double-sided (o.ds is kept only so the call sites say which shells are meant to be seen from
     inside). Once a piece separates, its open ends show the inside of skirts, adapters, tank walls and booster
     cases; a single-sided wall is culled there and the viewer looks straight through the hull. Shadows are
     cast by back faces, which is also what three.js does for single-sided skins: no self-shadow speckle. */
  function mat(name, o) {
    o = o || {};
    var key = name + (o.map ? '|' + o.map : '');
    if (matC[key]) return matC[key];
    var p = PAL[name], tex = o.map ? canvasTex(o.map) : null;
    var m = new THREE.MeshStandardMaterial({ color: tex ? 0xffffff : p[0], roughness: p[1], metalness: p[2] });
    if (tex) m.map = tex; else if (m.color && m.color.convertSRGBToLinear) m.color.convertSRGBToLinear();
    m.side = THREE.DoubleSide; m.shadowSide = THREE.BackSide;
    m.name = 'rk:' + key;
    matC[key] = m; return m;
  }

  /* geometries are cached: building the same rocket twice shares them */
  function r4(v) { return Math.round(v * 1e4) / 1e4; }
  function gCyl(rt, rb, h, seg, open, ts, tl) {
    ts = ts || 0; if (tl === undefined) tl = TAU;
    var k = 'c' + [r4(rt), r4(rb), r4(h), seg, open ? 1 : 0, r4(ts), r4(tl)].join('_');
    return geoC[k] || (geoC[k] = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open, ts, tl));
  }
  /* pts: [[radius, y, crease]] with ascending y (that order makes the faces look outwards); crease = hard edge */
  function gLathe(pts, seg, ps, pl, sh) {
    ps = ps || 0; if (pl === undefined) pl = TAU; sh = sh || 0;
    var flat = [], v = [], i, r;
    for (i = 0; i < pts.length; i++) flat.push(r4(pts[i][0]), r4(pts[i][1]), pts[i][2] ? 1 : 0);
    var k = 'l' + flat.join('_') + '|' + [seg, r4(ps), r4(pl), r4(sh)].join('_');
    if (geoC[k]) return geoC[k];
    for (i = 0; i < pts.length; i++) {
      r = Math.max(0, pts[i][0]);
      v.push(new THREE.Vector2(r, pts[i][1]));
      if (pts[i][2] && i > 0 && i < pts.length - 1) v.push(new THREE.Vector2(r, pts[i][1]));
    }
    var g = new THREE.LatheGeometry(v, seg, ps, pl);
    if (sh) g.applyMatrix4(new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, sh, 1, 0, 0, 0, 0, 1));   /* z += sh * y: leaning nose */
    geoC[k] = g; return g;
  }
  function gBox(sx, sy, sz) {
    var k = 'b' + [r4(sx), r4(sy), r4(sz)].join('_');
    return geoC[k] || (geoC[k] = new THREE.BoxGeometry(sx, sy, sz));
  }
  function gBall(r) { var k = 's' + r4(r); return geoC[k] || (geoC[k] = new THREE.SphereGeometry(r, 12, 8)); }

  /* ---- placing things. y values are always root coordinates ---- */
  function ext(y0, y1) { if (y0 < B.lo) B.lo = y0; if (y1 > B.hi) B.hi = y1; }
  function put(g, geo, m, x, y, z) {
    var me = new THREE.Mesh(geo, m);
    me.position.set(x || 0, (y || 0) - (g.userData.rkY || 0), z || 0);
    me.castShadow = true; me.receiveShadow = true;
    g.add(me); return me;
  }
  function part(id, y) {
    var g = new THREE.Group(); g.name = id;
    if (y) { g.position.y = y; g.userData.rkY = y; }
    B.root.add(g); B.parts[id] = g; return g;
  }
  /* straight or tapered wall from y0 (radius rb) to y1 (radius rt); o: x, z, seg, cap, ts, tl */
  function tube(g, m, rb, rt, y0, y1, o) {
    o = o || {}; ext(y0, y1);
    return put(g, gCyl(rt, rb, y1 - y0, o.seg || B.seg, !o.cap, o.ts, o.tl), m, o.x, (y0 + y1) / 2, o.z);
  }
  function lathe(g, m, pts, o) {
    o = o || {};
    var y0 = pts[0][1], rel = [], i;
    for (i = 0; i < pts.length; i++) { rel.push([pts[i][0], pts[i][1] - y0, pts[i][2]]); ext(pts[i][1], pts[i][1]); }
    return put(g, gLathe(rel, o.seg || B.seg, o.ps, o.pl, o.sh), m, o.x, y0, o.z);
  }
  /* tank dome: h > 0 bulges up from y, h < 0 hangs down from y */
  function dome(g, m, r, y, h, o) {
    var n = 5, pts = [], i, a;
    for (i = 0; i <= n; i++) { a = (h > 0 ? i : n - i) / n * PI / 2; pts.push([r * cos(a), y + h * sin(a)]); }
    return lathe(g, m, pts, o);
  }
  function band(g, m, r, y, hgt, o) {
    o = o || {};
    var t = o.t === undefined ? 0.03 : o.t;
    return tube(g, m, r + t, r + t, y - hgt / 2, y + hgt / 2, o);
  }
  function disc(g, name, r0, r1, y, o) { return lathe(g, mat(name, { ds: true }), [[r1, y], [r0, y]], o); }
  function box(g, m, sx, sy, sz, x, y, z, ry) {
    ext(y - sy / 2, y + sy / 2);
    var me = put(g, gBox(sx, sy, sz), m, x, y, z);
    if (ry) me.rotation.y = ry;
    return me;
  }
  /* raceway, pod or seam lying on the hull at clock angle th */
  function strip(g, m, r, th, y0, y1, w, d) { return box(g, m, w, y1 - y0, d, r * sin(th), (y0 + y1) / 2, r * cos(th), th); }
  function ball(g, m, r, x, y, z) { ext(y - r, y + r); return put(g, gBall(r), m, x, y, z); }
  function capsule(g, m, r, y0, y1, x, z, seg) {
    var o = { x: x, z: z, seg: seg || 12 };
    tube(g, m, r, r, y0 + r, y1 - r, o); dome(g, m, r, y1 - r, r, o); dome(g, m, r, y0 + r, -r, o);
  }
  function rod(g, m, a, b, r) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    ext(Math.min(a[1], b[1]), Math.max(a[1], b[1]));
    var me = put(g, gCyl(r, r, len, 6, true), m, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    me.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / len, dy / len, dz / len));
    return me;
  }
  /* flat plate: polygon [[z, y]] extruded along x from x0 to x1 (fins) */
  function prism(g, m, poly, x0, x1) {
    var pos = [], n = poly.length, i, a, b, lo = Infinity, hi = -Infinity;
    function v(p, x) { pos.push(x, p[1], p[0]); }
    for (i = 1; i < n - 1; i++) { v(poly[0], x1); v(poly[i], x1); v(poly[i + 1], x1); v(poly[0], x0); v(poly[i + 1], x0); v(poly[i], x0); }
    for (i = 0; i < n; i++) { a = poly[i]; b = poly[(i + 1) % n]; v(a, x0); v(b, x0); v(b, x1); v(a, x0); v(b, x1); v(a, x1); lo = Math.min(lo, a[1]); hi = Math.max(hi, a[1]); }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();
    ext(lo, hi);
    return put(g, geo, m, 0, 0, 0);
  }
  /* nozzle bell with its exit at yExit; lists the engine unless o.quiet. o: rT throat radius, ch chamber height, rx tilt */
  function bell(g, pid, x, yExit, z, len, rExit, o) {
    o = o || {};
    var rT = o.rT || rExit * 0.22, n = 7, pts = [], i, t;
    for (i = 0; i <= n; i++) { t = i / n; pts.push([rT + (rExit - rT) * Math.pow(1 - t, 0.6), yExit + len * t]); }
    if (o.noChamber) { pts[n][2] = 1; pts.push([0, yExit + len]); }       /* no chamber on top: plug the throat, or one sees through the engine */
    var me = lathe(g, mat('nozzle', { ds: true }), pts, { x: x, z: z, seg: o.seg || 16 });
    if (o.rx) me.rotation.x = o.rx;
    if (!o.noChamber) tube(g, mat('dark'), rT * 1.5, rT * 1.9, yExit + len, yExit + len + (o.ch || len * 0.22), { x: x, z: z, seg: 10, cap: true });
    if (!o.quiet) B.engines.push({ part: pid, x: r4(x), y: r4(yExit), z: r4(z), r: rExit });
    return me;
  }
  /* one strap-on booster: its own group on the booster axis, local +Z away from the core */
  function boosterGroup(pid, idx, th, rad) {
    var g = new THREE.Group(); g.name = pid + '_' + idx;
    g.position.set(rad * sin(th), 0, rad * cos(th)); g.rotation.y = th;
    g.userData.theta = th;
    B.parts[pid].add(g); return g;
  }
  function boosterEngine(pid, th, rad, yExit, r) { B.engines.push({ part: pid, x: r4(rad * sin(th)), y: r4(yExit), z: r4(rad * cos(th)), r: r }); }

  /* ---- profiles ---- */
  /* cone of half-angle aDeg ending in a round cap of radius Rc with its tip at yTip; starts at radius rBase */
  function conePts(rBase, yTip, aDeg, Rc) {
    var a = aDeg * D2R, rT = Rc * cos(a), yc = yTip - Rc, yT = yc + Rc * sin(a), yB = yT - (rBase - rT) / Math.tan(a);
    var pts = [[rBase, yB, 1], [rT, yT]], i, b, n = 4;
    for (i = 1; i <= n; i++) { b = a + (PI / 2 - a) * i / n; pts.push([i === n ? 0 : Rc * cos(b), yc + Rc * sin(b)]); }
    return { yBase: yB, pts: pts };
  }
  /* ogive from (R, y0) to a tip at y0 + L; p near 1.3 gives a pointed nose, q above 1 rounds the tip */
  function ogive(R, y0, L, n, p, q) {
    var pts = [], i, s;
    for (i = 0; i <= n; i++) { s = 1 - Math.pow(1 - i / n, 1.4); pts.push([i === n ? 0 : R * Math.pow(1 - Math.pow(s, p), 1 / q), y0 + L * s]); }
    return pts;
  }
  function spheroid(r, y0, y1) {
    var pts = [], i, a, c = (y0 + y1) / 2, h = (y1 - y0) / 2;
    for (i = 0; i <= 10; i++) { a = (-0.5 + i / 10) * PI; pts.push([i === 0 || i === 10 ? 0 : r * cos(a), c + h * sin(a)]); }
    return pts;
  }
  /* nose fairing in two halves: sections [{ m, pts }], frame rings [[r, y, height]] */
  function fairing(sections, rings, radius) {
    var ids = ['fairingA', 'fairingB'], k, i, g, h = B.seg / 2;
    for (k = 0; k < 2; k++) {
      g = part(ids[k]);
      for (i = 0; i < sections.length; i++) lathe(g, mat(sections[i].m, { ds: true }), sections[i].pts, { seg: h, ps: k * PI, pl: PI });
      for (i = 0; i < rings.length; i++) tube(g, mat('whiteDim', { ds: true }), rings[i][0] + 0.025, rings[i][0] + 0.025, rings[i][1] - rings[i][2] / 2, rings[i][1] + rings[i][2] / 2, { seg: h, ts: k * PI, tl: PI });
    }
    B.fairR = radius;
  }

  /* ================= Delta II 7925 / 7925H / 7925-10L ================= */
  function gem(g, pid, th, rad, r, len, air) {
    var W = mat('white'), cant = 10 * D2R, BS = 16;
    var nl = air ? 1.25 : 1.0, yE = air ? 0.15 : 0.40, tip = 0.40 + len, yAft = yE + nl * cos(cant);
    var noseL = r * 3.9, yN = tip - noseL;
    bell(g, pid, 0, yE, nl * sin(cant), nl, r * 0.82, { rx: -cant, quiet: true, seg: 12, rT: r * 0.2, noChamber: true });
    boosterEngine(pid, th, rad + nl * sin(cant), yE, r * 0.82);
    tube(g, mat('grey'), r * 0.5, r, yAft - 0.1, yAft + 0.45, { seg: BS });           /* aft closure */
    tube(g, W, r, r, yAft + 0.45, yN, { seg: BS });
    band(g, mat('dark'), r, yAft + 0.58, 0.26, { t: 0.012, seg: BS });
    lathe(g, W, ogive(r, yN, noseL, 7, 1.3, 1), { seg: BS });
    band(g, mat('whiteDim'), r, yN, 0.12, { t: 0.015, seg: BS });
    box(g, mat('dark'), 0.34, 0.3, 0.2, 0, 2.7, -(r + 0.04));                          /* attach fittings */
    box(g, mat('dark'), 0.3, 0.26, 0.2, 0, yN - 1.3, -(r + 0.04));
  }
  function buildDelta(v) {
    var R = 1.219, NZ = 0.9;                       /* core radius; main nozzle below the boattail (approx.) */
    var yIS = NZ + 24.98, yFB = NZ + 29.683;       /* interstage base (approx.); fairing base, Sta 553.39 */
    var yEng = NZ + 2.2, yLox = yEng + 12.4, yCb = yLox + 1.6;
    var s1 = part('stage1'), is = part('interstage'), s2 = part('stage2'), s3 = part('stage3');
    var teal = mat('teal'), tealD = mat('tealDark'), dark = mat('dark'), alu = mat('alu'), foil = mat('foil');
    var i, th, g, air, pid, ng = 0, na = 0;
    /* first stage: engine section, oxygen tank, centerbody, fuel tank. Teal all the way up, like the flight vehicles */
    bell(s1, 'stage1', 0, 0, 0, 2.3, 0.71);
    bell(s1, 'stage1', 1.0, 0.5, 0, 0.5, 0.11, { quiet: true, seg: 8, noChamber: true });      /* vernier engines */
    bell(s1, 'stage1', -1.0, 0.5, 0, 0.5, 0.11, { quiet: true, seg: 8, noChamber: true });
    disc(s1, 'dark', 0, R * 0.98, NZ + 0.03);
    tube(s1, tealD, R, R, NZ, yEng); tube(s1, teal, R, R, yEng, yLox); tube(s1, tealD, R, R, yLox, yCb); tube(s1, teal, R, R, yCb, yIS);
    band(s1, dark, R, NZ + 0.12, 0.24, { t: 0.02 });
    band(s1, tealD, R, yEng, 0.14); band(s1, tealD, R, yLox, 0.14); band(s1, tealD, R, yCb, 0.14); band(s1, tealD, R, yIS - 0.07, 0.14);
    strip(s1, tealD, R + 0.03, 0, yEng + 0.3, yIS - 0.4, 0.24, 0.12);                    /* wiring tunnel */
    dome(s1, alu, R * 0.96, yIS - 0.25, 0.7);
    /* interstage */
    tube(is, mat('teal', { ds: true }), R, R, yIS, yFB);
    band(is, tealD, R, yIS + 0.09, 0.16); band(is, tealD, R, yFB - 0.09, 0.16);
    /* second stage: engine, helium and nitrogen spheres, tank, miniskirt with its truss, guidance section */
    var y2 = yIS + 0.45, yT0 = y2 + 2.65, yT1 = yFB + 0.55;
    bell(s2, 'stage2', 0, y2, 0, 2.0, 0.75, { rT: 0.13 });
    tube(s2, dark, 0.3, 0.62, y2 + 2.0, y2 + 2.55, { seg: 16 });
    for (i = 0; i < 4; i++) { th = (45 + 90 * i) * D2R; ball(s2, mat(i === 3 ? 'green' : 'foil'), 0.3, 0.74 * sin(th), y2 + 2.25, 0.74 * cos(th)); }
    dome(s2, foil, 0.87, yT0, -0.45, { seg: 24 });
    tube(s2, foil, 0.87, 0.87, yT0, yT1, { seg: 24 });
    tube(s2, mat('alu', { ds: true }), R - 0.04, R - 0.04, yFB - 0.3, yFB + 0.05);
    disc(s2, 'alu', 0.87, R - 0.04, yFB + 0.05);
    for (i = 0; i < 6; i++) { th = i * 60 * D2R; rod(s2, alu, [(R - 0.07) * sin(th), yFB - 0.25, (R - 0.07) * cos(th)], [0.87 * sin(th), yT0 + 0.3, 0.87 * cos(th)], 0.035); }
    tube(s2, dark, 1.0, 1.0, yT1, yT1 + 0.62, { cap: true, seg: 24 });
    for (i = 0; i < 4; i++) strip(s2, mat('grey'), 1.03, (20 + 90 * i) * D2R, yT1 + 0.1, yT1 + 0.52, 0.5, 0.16);
    tube(s2, alu, 0.8, 0.8, yT1 + 0.62, yT1 + 0.8, { cap: true, seg: 24 });
    /* third stage: spin table, Star 48B motor, payload attach fitting */
    var y3 = yT1 + 0.8;
    tube(s3, alu, 0.8, 0.8, y3, y3 + 0.17, { seg: 24 });
    disc(s3, 'alu', 0.45, 0.8, y3 + 0.17, { seg: 24 }); disc(s3, 'alu', 0.45, 0.8, y3, { seg: 24 });
    tube(s3, mat('alu', { ds: true }), 0.8, 0.64, y3 + 0.17, y3 + 0.92, { seg: 24 });
    bell(s3, 'stage3', 0, y3 + 0.02, 0, 0.85, 0.38, { rT: 0.08, seg: 12, noChamber: true });
    lathe(s3, mat('titan'), spheroid(0.622, y3 + 0.85, y3 + 2.09), { seg: 20 });
    tube(s3, alu, 0.62, 0.47, y3 + 1.92, y3 + 2.19, { seg: 20 });
    part('payloadMount', y3 + 2.19);                 /* spacecraft separation plane, Sta 413.95 */
    /* fairing */
    var pts, c;
    if (v.fair === '10L') {
      pts = [[R, yFB], [R, yFB + 1.196, 1], [1.524, yFB + 2.111, 1], [1.524, yFB + 6.783]].concat(ogive(1.524, yFB + 6.783, 2.467, 8, 1.75, 1.35).slice(1));
      fairing([{ m: 'white', pts: pts }], [[R, yFB + 0.07, 0.14], [1.524, yFB + 6.783, 0.1]], 1.524);
    } else {
      c = conePts(1.220, yFB + 8.488, 20, 0.676);
      pts = [[R, yFB], [R, yFB + 3.157, 1], [1.448, yFB + 3.553, 1], [1.448, yFB + 5.585, 1]].concat(c.pts);
      fairing([{ m: 'white', pts: pts }], [[R, yFB + 0.07, 0.14], [R, yFB + 3.1, 0.1], [1.448, yFB + 3.6, 0.1], [1.448, yFB + 5.53, 0.1]], 1.448);
    }
    /* nine solid boosters: six lit on the pad, three in the air (those have longer nozzles) */
    var r = v.h ? 0.584 : 0.508, len = v.h ? 14.7 : 13.0, rad = R + r + 0.07;
    part('srbGround'); part('srbAir');
    for (i = 0; i < 9; i++) {
      th = (20 + 40 * i) * D2R; air = i % 3 === 1; pid = air ? 'srbAir' : 'srbGround';
      g = boosterGroup(pid, air ? na++ : ng++, th, rad);
      gem(g, pid, th, rad, r, len, air);
    }
  }

  /* ================= Atlas-Centaur (LV-3C + Centaur D) and Atlas-Centaur + TE-M-364-4 ================= */
  function buildAtlasCentaur(te) {
    var R = 1.524, add = te ? 1.295 : 0, H = te ? 39.62 : 34.44;
    var yStg = 3.78, yJ = 18.08 + add, yIT = yJ + 3.99, yP0 = yIT + 0.08, yFB = yP0 + 4.85;
    var bs = part('boosterSection'), s1 = part('stage1'), is = part('interstage'), s2 = part('stage2');
    var steel = mat('steel'), dull = mat('steelDull'), dullDs = mat('steelDull', { ds: true }), alu = mat('alu'), dark = mat('dark');
    var i, s, o;
    /* booster section: the skirt and the two engines that drop away */
    tube(bs, dullDs, R + 0.035, R + 0.035, 0.95, yStg);
    disc(bs, 'dark', 0.72, R + 0.03, 1.0);
    band(bs, alu, R + 0.035, yStg - 0.1, 0.2, { t: 0.02 });
    for (s = -1; s <= 1; s += 2) {
      o = { x: s * 1.38, seg: 20, ts: (s > 0 ? -12 : 168) * D2R, tl: 204 * D2R };
      tube(bs, dullDs, 0.92, 0.92, 0.75, yStg - 0.4, o);                                  /* engine nacelle */
      lathe(bs, dullDs, [[0.92, yStg - 0.4], [0.86, yStg + 0.4], [0.68, yStg + 1.15], [0.38, yStg + 1.75], [0, yStg + 2.0]], { x: s * 1.38, seg: 20, ps: o.ts, pl: o.tl });
      bell(bs, 'boosterSection', s * 1.52, 0, 0, 1.6, 0.62);
    }
    /* sustainer core: thin polished steel tank */
    bell(s1, 'stage1', 0, 0.15, 0, 1.55, 0.6);
    tube(s1, dull, 0.5, R * 0.985, 1.75, yStg, { cap: true });                           /* closed thrust cone: it is in full view once the booster section drops */
    tube(s1, mat('steel', { map: 'steel:16' }), R, R, yStg, yJ);
    band(s1, alu, R, yStg + 0.1, 0.2, { t: 0.02 }); band(s1, alu, R, yJ - 0.1, 0.2, { t: 0.02 });
    dome(s1, dull, R * 0.97, yJ - 0.1, 0.7);
    for (s = -1; s <= 1; s += 2) {
      box(s1, dull, 0.34, 0.6, 0.3, 0, yStg + 0.75, s * (R + 0.1));                       /* vernier engine */
      bell(s1, 'stage1', 0, yStg + 0.2, s * (R + 0.2), 0.32, 0.09, { quiet: true, seg: 8, noChamber: true });
      strip(s1, dull, R + 0.1, (s > 0 ? 90 : 270) * D2R, yStg + 2.2, yStg + (s > 0 ? 9.0 : 6.6), 0.5, 0.3);   /* equipment pod */
    }
    strip(s1, dull, R + 0.03, 0, yStg + 1.4, yJ - 0.4, 0.12, 0.1);
    /* interstage adapter */
    tube(is, mat('alu', { ds: true, map: 'corrAl' }), R, R, yJ, yIT);
    band(is, alu, R, yJ + 0.1, 0.2, { t: 0.025 }); band(is, alu, R, yIT - 0.1, 0.2, { t: 0.025 });
    /* Centaur: two engines, steel tank under white insulation panels */
    var yE2 = yJ + 0.78;
    for (s = -1; s <= 1; s += 2) bell(s2, 'stage2', 0, yE2, s * 0.62, 1.25, 0.5, { rT: 0.09 });
    tube(s2, dark, 0.85, 0.5, yJ + 2.2, yJ + 3.0, { seg: 16 });
    dome(s2, steel, R * 0.98, yIT + 0.1, -1.25);
    tube(s2, mat('whiteWarm'), R + 0.03, R + 0.03, yP0, yFB);
    for (i = 0; i < 4; i++) strip(s2, mat('grey'), R + 0.03, (45 + 90 * i) * D2R, yP0 + 0.05, yFB - 0.05, 0.07, 0.03);
    band(s2, mat('whiteDim'), R + 0.03, yP0 + 0.1, 0.12, { t: 0.012 }); band(s2, mat('whiteDim'), R + 0.03, (yP0 + yFB) / 2, 0.12, { t: 0.012 }); band(s2, mat('whiteDim'), R + 0.03, yFB - 0.1, 0.12, { t: 0.012 });
    dome(s2, steel, R * 0.97, yFB, 0.85);
    tube(s2, alu, 0.95, 0.78, yFB + 0.7, yFB + 1.4, { seg: 24 });
    var yPay = yFB + 1.4;
    if (te) {                                        /* spin table and solid third-stage motor */
      var s3 = part('stage3'), y3 = yPay;
      tube(s3, alu, 0.72, 0.72, y3, y3 + 0.15, { seg: 24 });
      disc(s3, 'alu', 0.4, 0.72, y3 + 0.15, { seg: 24 }); disc(s3, 'alu', 0.4, 0.72, y3, { seg: 24 });
      tube(s3, mat('alu', { ds: true }), 0.72, 0.5, y3 + 0.15, y3 + 0.8, { seg: 24 });
      bell(s3, 'stage3', 0, y3 + 0.02, 0, 0.7, 0.3, { rT: 0.07, seg: 12, noChamber: true });
      lathe(s3, mat('titan'), spheroid(0.465, y3 + 0.7, y3 + 1.63), { seg: 20 });
      tube(s3, alu, 0.46, 0.4, y3 + 1.5, y3 + 1.75, { seg: 20 });
      yPay = y3 + 1.75;
    }
    part('payloadMount', yPay);
    /* nose fairing: cylinder, 15-degree cone, round cap */
    var rf = R + 0.03, c = conePts(rf, H, 15, 0.36);
    fairing([{ m: 'whiteWarm', pts: [[rf, yFB]].concat(c.pts) }], [[rf, yFB + 0.08, 0.16], [rf, c.yBase - 0.05, 0.1]], R);
  }

  /* ================= Saturn V (SA-506) ================= */
  function buildSaturnV() {
    B.seg = 48;
    var R = 5.03, R3 = 3.30, RSM = 1.955;
    var Y = { base: 5.78, fuelTop: 18.22, itTop: 22.54, loxTop: 38.52, s1Top: 42.07, isTop: 47.64, s2Aft: 49.5, s2Fwd: 63.9, s2Top: 66.92,
      s3Base: 72.71, s3Aft: 75.0, s3Fwd: 82.5, iu: 84.79, sla: 85.70, sm: 94.24, cm: 98.10, apex: 101.60, tip: 110.65 };
    var s1 = part('stage1'), is = part('interstage'), s2 = part('stage2'), s3 = part('stage3');
    var W = mat('white'), Wds = mat('white', { ds: true }), K = mat('black'), Kds = mat('black', { ds: true }), dim = mat('whiteDim');
    var roll = mat('white', { map: 'roll8' }), rollDs = mat('white', { map: 'roll8', ds: true }), alu = mat('alu'), dark = mat('dark');
    var FIN = [[6.3, 4.4], [9.6, 4.4], [9.6, 6.0], [5.55, 9.2]];
    var i, s, th, fg, ya, yb, ra, rb;
    /* S-IC: black and white roll pattern on the bottom third and on the forward skirt */
    tube(s1, dark, R * 0.99, R * 0.99, Y.base - 0.3, Y.base, { cap: true });
    tube(s1, roll, R, R, Y.base, Y.fuelTop);
    tube(s1, mat('white', { map: 'corrW' }), R + 0.05, R + 0.05, Y.fuelTop, Y.itTop);
    tube(s1, W, R, R, Y.itTop, Y.loxTop);
    tube(s1, roll, R, R, Y.loxTop, Y.s1Top);
    band(s1, dim, R, Y.fuelTop, 0.3, { t: 0.08 }); band(s1, dim, R, Y.itTop, 0.3, { t: 0.08 }); band(s1, dim, R, Y.loxTop, 0.3, { t: 0.06 });
    strip(s1, W, R + 0.1, 0, 6.6, 41.6, 0.7, 0.35); strip(s1, W, R + 0.1, PI, 6.6, 41.6, 0.7, 0.35);      /* cable tunnels */
    dome(s1, alu, R * 0.975, Y.s1Top - 2.2, 1.9, { seg: 32 });
    bell(s1, 'stage1', 0, 0, 0, 3.7, 1.82, { rT: 0.46, ch: 1.8 });
    for (i = 0; i < 4; i++) {
      th = (45 + 90 * i) * D2R;
      bell(s1, 'stage1', 4.62 * sin(th), 0, 4.62 * cos(th), 3.7, 1.82, { rT: 0.46, ch: 1.8 });
      fg = new THREE.Group(); fg.name = 'fin_' + i; fg.rotation.y = th; s1.add(fg);          /* local +Z = outwards */
      tube(fg, Kds, 2.25, 0.3, 4.2, 12.2, { z: 4.75, ts: 0, tl: PI, seg: 12 });               /* engine fairing, half black */
      tube(fg, Wds, 2.25, 0.3, 4.2, 12.2, { z: 4.75, ts: PI, tl: PI, seg: 12 });
      prism(fg, Kds, FIN, 0, 0.16); prism(fg, Wds, FIN, -0.16, 0);                           /* fin: one face black, one white */
    }
    /* S-IC / S-II interstage ring with four ullage motors */
    tube(is, rollDs, R, R, Y.s1Top, Y.isTop);
    band(is, dim, R, Y.s1Top + 0.15, 0.3, { t: 0.06 }); band(is, dim, R, Y.isTop - 0.15, 0.3, { t: 0.06 });
    for (i = 0; i < 4; i++) { th = (22.5 + 90 * i) * D2R; capsule(is, W, 0.28, Y.s1Top + 2.2, Y.s1Top + 4.3, (R + 0.2) * sin(th), (R + 0.2) * cos(th), 10); }
    /* S-II: five J-2 engines, black aft band, tan forward skirt, and the cone that carried the S-IVB */
    bell(s2, 'stage2', 0, 43.3, 0, 2.4, 1.0, { rT: 0.24, ch: 1.0 });
    for (i = 0; i < 4; i++) { th = (45 + 90 * i) * D2R; bell(s2, 'stage2', 2.67 * sin(th), 43.3, 2.67 * cos(th), 2.4, 1.0, { rT: 0.24, ch: 1.0 }); }
    disc(s2, 'dark', 0, 3.4, 46.75, { seg: 32 });
    tube(s2, mat('alu', { ds: true }), 3.4, R * 0.985, 46.75, 48.9, { seg: 32 });
    tube(s2, K, R, R, Y.isTop, Y.s2Aft);
    tube(s2, W, R, R, Y.s2Aft, Y.s2Fwd);
    tube(s2, mat('tan'), R, R, Y.s2Fwd, Y.s2Top);
    band(s2, dim, R, Y.s2Fwd, 0.25, { t: 0.06 }); band(s2, dim, R, Y.s2Top - 0.13, 0.25, { t: 0.06 });
    strip(s2, W, R + 0.1, 0, Y.s2Aft + 0.3, Y.s2Fwd - 0.2, 0.7, 0.35);
    dome(s2, alu, R * 0.975, Y.s2Top - 0.6, 2.6, { seg: 32 });
    tube(s2, rollDs, R, R3, Y.s2Top, Y.s3Base);
    /* S-IVB with the instrument unit and the adapter that hid the lunar module */
    bell(s3, 'stage3', 0, 70.0, 0, 2.4, 1.0, { rT: 0.24, ch: 0.9 });
    dome(s3, alu, 3.2, Y.s3Aft, -1.8, { seg: 32 });
    tube(s3, W, R3, R3, Y.s3Base, Y.s3Aft);
    band(s3, K, R3, Y.s3Base + 0.2, 0.3, { t: 0.02 }); band(s3, K, R3, Y.s3Aft - 0.2, 0.3, { t: 0.02 });
    for (s = -1; s <= 1; s += 2) box(s3, W, 0.7, 1.9, 0.95, s * (R3 + 0.3), 73.9, 0);          /* auxiliary propulsion modules */
    tube(s3, W, R3, R3, Y.s3Aft, Y.s3Fwd);
    tube(s3, K, R3, R3, Y.s3Fwd, Y.iu);
    tube(s3, dim, R3, R3, Y.iu, Y.sla);
    band(s3, dark, R3, (Y.iu + Y.sla) / 2, 0.1, { t: 0.015 });
    strip(s3, W, R3 + 0.08, 0, Y.s3Aft + 0.2, Y.s3Fwd - 0.2, 0.5, 0.26);
    dome(s3, alu, 3.2, Y.s3Fwd + 0.7, 1.5, { seg: 32 });
    tube(s3, Wds, R3, RSM, Y.sla, Y.sm);
    ya = Y.sla + 2.03; yb = ya + 0.2; ra = R3 + (RSM - R3) * (ya - Y.sla) / (Y.sm - Y.sla); rb = R3 + (RSM - R3) * (yb - Y.sla) / (Y.sm - Y.sla);
    tube(s3, dim, ra + 0.025, rb + 0.025, ya, yb);                                            /* panel hinge line */
    /* Apollo spacecraft on the payload mount: service module (engine bell hidden in the adapter) and command module */
    var pm = part('payloadMount', Y.sla);
    bell(pm, 'payloadMount', 0, 91.5, 0, 2.6, 1.25, { rT: 0.2, quiet: true, ch: 0.14 });
    tube(pm, mat('silver'), RSM, RSM, Y.sm, Y.cm, { cap: true, seg: 32 });
    for (i = 0; i < 4; i++) {
      tube(pm, W, RSM + 0.012, RSM + 0.012, 95.2, 97.3, { seg: 6, ts: (i * 90 - 20) * D2R, tl: 40 * D2R });   /* radiators */
      strip(pm, dark, RSM + 0.1, (45 + 90 * i) * D2R, 96.6, 97.1, 0.4, 0.3);                                  /* thruster quads */
    }
    lathe(pm, mat('silver'), [[RSM, Y.cm], [RSM, Y.cm + 0.16, 1], [0.44, 101.22, 1], [0.34, 101.55], [0, Y.apex]], { seg: 32 });
    /* launch escape system: boost cover over the command module, truss tower, escape motor */
    var les = part('les'), legs = [], grey = mat('grey');
    lathe(les, Wds, [[RSM + 0.05, Y.cm + 0.03], [RSM + 0.05, Y.cm + 0.2, 1], [0.5, 101.25], [0.36, 101.6], [0, 101.68]], { seg: 32 });
    function leg(k, y) { var a = (45 + 90 * k) * D2R, r = 0.72 + (0.36 - 0.72) * (y - 100.9) / 3.0; return [r * sin(a), y, r * cos(a)]; }
    for (i = 0; i < 4; i++) {
      rod(les, grey, leg(i, 100.9), leg(i, 103.9), 0.045);
      rod(les, grey, leg(i, 101.9), leg(i + 1, 101.9), 0.03); rod(les, grey, leg(i, 102.9), leg(i + 1, 102.9), 0.03);
      rod(les, grey, leg(i, 101.9), leg(i + 1, 102.9), 0.025);
      th = (45 + 90 * i) * D2R;
      bell(les, 'les', 0.42 * sin(th), 103.75, 0.42 * cos(th), 0.45, 0.17, { quiet: true, seg: 8, noChamber: true });   /* escape motor nozzles */
    }
    tube(les, W, 0.52, 0.33, 103.9, 104.5, { seg: 16, cap: true });
    tube(les, W, 0.33, 0.33, 104.5, 108.7, { seg: 16 });
    band(les, dark, 0.33, 108.7, 0.1, { t: 0.01, seg: 16 });
    tube(les, W, 0.33, 0.33, 108.7, 109.35, { seg: 16 });
    for (s = -1; s <= 1; s += 2) bell(les, 'les', s * 0.36, 108.72, 0, 0.3, 0.1, { seg: 8, noChamber: true });   /* tower jettison motor */
    lathe(les, W, [[0.33, 109.35], [0.31, 109.8], [0.24, 110.2], [0.14, 110.48], [0.05, 110.62], [0, Y.tip]], { seg: 16 });
    B.fairR = R3;
  }

  /* ================= Titan IIIE-Centaur ================= */
  function srm(g, th, rad) {
    var R = 1.524, W = mat('white'), grey = mat('grey'), dark = mat('dark'), cant = 6 * D2R, nl = 2.3, rE = 1.35, yE = rE * sin(cant), k;
    bell(g, 'srbGround', 0, yE, nl * sin(cant), nl, rE, { rx: -cant, quiet: true, rT: 0.5, noChamber: true });
    boosterEngine('srbGround', th, rad + nl * sin(cant), yE, rE);
    ext(yE - rE * sin(cant), yE);                                    /* the tilted rim is the lowest point of the rocket */
    tube(g, grey, 0.8, 1.6, 1.3, 1.9, { seg: 24 });
    tube(g, W, 1.68, R, 1.5, 3.2, { seg: 24 });                      /* flared aft skirt */
    tube(g, W, R, R, 3.2, 22.95, { seg: 24 });
    for (k = 0; k <= 5; k++) band(g, grey, R, 3.2 + k * 3.84, 0.24, { t: 0.03, seg: 24 });     /* five segments */
    lathe(g, W, [[R, 22.95], [0.3, 25.8], [0, 26.05]], { seg: 24, sh: -0.2 });                 /* nose leans towards the core */
    capsule(g, W, 0.42, 2.2, 9.2, 1.71, 0.99, 12);                   /* steering-fluid tank */
    box(g, dark, 0.5, 0.45, 0.3, 0, 2.7, -(R + 0.12)); box(g, dark, 0.5, 0.45, 0.3, 0, 21.2, -(R + 0.12));
  }
  function buildTitan() {
    var R = 1.524, X = 3.30, yF = 31.2, H = 48.8;
    var s1 = part('stage1'), s2 = part('stage2'), s3 = part('stage3');
    var T = mat('titan'), corr = mat('alu', { map: 'corrAl' }), corrDs = mat('alu', { map: 'corrAl', ds: true }), alu = mat('alu'), dark = mat('dark'), steel = mat('steel');
    var i, s, th, g;
    part('srbGround');
    for (i = 0; i < 2; i++) { th = (90 + 180 * i) * D2R; g = boosterGroup('srbGround', i, th, X); srm(g, th, X); }
    /* core stage 1: two-chamber engine, tanks with bare aluminium skirts */
    for (s = -1; s <= 1; s += 2) bell(s1, 'stage1', 0, 0.6, s * 0.82, 2.0, 0.78, { rT: 0.2, ch: 0.7 });
    disc(s1, 'dark', 0, R * 0.98, 3.15);
    tube(s1, corr, R, R, 3.1, 4.6); tube(s1, T, R, R, 4.6, 11.2); tube(s1, corr, R, R, 11.2, 13.2); tube(s1, T, R, R, 13.2, 20.5);
    tube(s1, corrDs, R, R, 20.5, 22.8);
    band(s1, alu, R, 4.6, 0.14); band(s1, alu, R, 11.2, 0.14); band(s1, alu, R, 13.2, 0.14); band(s1, alu, R, 20.5, 0.14);
    strip(s1, T, R + 0.05, 0, 4.8, 20.3, 0.3, 0.16); strip(s1, T, R + 0.05, PI, 4.8, 20.3, 0.3, 0.16);
    dome(s1, alu, R * 0.97, 20.4, 0.75);
    /* core stage 2, with the adapter that held the Centaur */
    bell(s2, 'stage2', 0, 21.25, 0, 1.6, 0.8, { rT: 0.15, ch: 0.5 });
    disc(s2, 'dark', 0.25, R * 0.98, 23.3);
    tube(s2, corr, R, R, 22.8, 23.9); tube(s2, T, R, R, 23.9, 29.0); tube(s2, corr, R, R, 29.0, 29.9);
    tube(s2, mat('alu', { ds: true }), R, R, 29.9, yF);
    band(s2, alu, R, 23.9, 0.14); band(s2, alu, R, 26.4, 0.1); band(s2, alu, R, 29.0, 0.14); band(s2, alu, R, 29.9, 0.16);
    strip(s2, T, R + 0.05, 0, 24.0, 28.9, 0.3, 0.16);
    dome(s2, alu, R * 0.97, 29.0, 0.75);
    /* Centaur D-1T, inside the shroud */
    for (s = -1; s <= 1; s += 2) bell(s3, 'stage3', s * 0.62, 30.3, 0, 1.3, 0.5, { rT: 0.09 });
    tube(s3, dark, 0.85, 0.45, 31.5, 32.0, { seg: 16 });
    dome(s3, steel, R * 0.98, 32.6, -1.0);
    tube(s3, mat('steel', { map: 'steel:6' }), R, R, 32.6, 38.2);
    band(s3, alu, R, 32.6, 0.14, { t: 0.02 }); band(s3, alu, R, 38.2, 0.14, { t: 0.02 });
    tube(s3, alu, R, 1.3, 38.2, 38.9);
    dome(s3, steel, 1.28, 38.3, 0.7);
    tube(s3, mat('alu', { ds: true }), 1.3, 0.9, 38.9, 39.9, { seg: 24 });
    part('payloadMount', 39.9);
    /* Centaur Standard Shroud: boattail, long cylinder, two cones, steel cap */
    var c2 = conePts(1.42, H, 25, 0.419), yC = c2.yBase - (2.134 - 1.42) / Math.tan(15 * D2R), rings = [[1.56, yF + 0.08, 0.16], [1.42, c2.yBase, 0.1]], y;
    for (y = yF + 1.4; y < yC + 0.01; y += (yC - yF - 1.4) / 4) rings.push([2.134, y, 0.14]);
    fairing([{ m: 'white', pts: [[1.56, yF], [2.134, yF + 1.4, 1], [2.134, yC, 1], c2.pts[0], c2.pts[1]] }, { m: 'steelDull', pts: c2.pts.slice(1) }], rings, 2.134);
  }

  /* ================= Atlas V 401 and 541 ================= */
  function aj60(g, th, rad) {
    var r = 0.79, W = mat('white'), dark = mat('dark'), cant = 3 * D2R, nl = 1.9, rE = 0.72, yE = 0.25, BS = 20;
    bell(g, 'srbGround', 0, yE, nl * sin(cant), nl, rE, { rx: -cant, quiet: true, rT: 0.24, noChamber: true, seg: 14 });
    boosterEngine('srbGround', th, rad + nl * sin(cant), yE, rE);
    tube(g, mat('grey'), 0.45, r, 1.9, 2.5, { seg: BS });
    tube(g, W, 0.86, r, 1.6, 2.9, { seg: BS });
    tube(g, W, r, r, 2.9, 16.3, { seg: BS });
    band(g, dark, r, 3.2, 0.35, { t: 0.012, seg: BS }); band(g, mat('whiteDim'), r, 9.6, 0.14, { t: 0.015, seg: BS }); band(g, mat('whiteDim'), r, 16.3, 0.14, { t: 0.015, seg: BS });
    lathe(g, W, ogive(r, 16.3, 3.45, 7, 1.5, 1.1), { seg: BS, sh: -0.2 });                  /* slanted nose */
    box(g, dark, 0.4, 0.36, 0.24, 0, 3.0, -(r + 0.06)); box(g, dark, 0.36, 0.3, 0.24, 0, 14.6, -(r + 0.06));
  }
  function buildAtlasV(srb) {
    var R = 1.905, RC = 1.524, dy = srb ? 0.3 : 0;
    var s1 = part('stage1'), is = srb ? null : part('interstage'), s2 = part('stage2');
    var bz = mat('bronze'), bzD = mat('bronzeDark'), W = mat('white'), Wds = mat('white', { ds: true }), dim = mat('whiteDim'), alu = mat('alu'), dark = mat('dark'), steel = mat('steel');
    var i, s, th, g, y;
    /* Common Core Booster: copper-bronze tanks, twin-nozzle engine, outside oxygen line */
    for (s = -1; s <= 1; s += 2) bell(s1, 'stage1', 0, 0, s * 0.98, 2.4, 0.72, { rT: 0.18, ch: 0.6 });
    disc(s1, 'dark', 0, R * 0.97, 1.45);
    tube(s1, dark, R * 0.97, R, 1.3, 1.9);
    tube(s1, bzD, R, R, 1.9, 3.3); tube(s1, bz, R, R, 3.3, 15.6); tube(s1, bzD, R, R, 15.6, 17.1); tube(s1, bz, R, R, 17.1, 31.7); tube(s1, bzD, R, R, 31.7, 32.5);
    band(s1, bzD, R, 3.3, 0.14); band(s1, bzD, R, 15.6, 0.14); band(s1, bzD, R, 17.1, 0.14); band(s1, bzD, R, 31.7, 0.14);
    capsule(s1, alu, 0.2, 2.9, 16.4, 0, -(R + 0.24), 10);
    for (y = 5; y < 14; y += 4) box(s1, bzD, 0.2, 0.15, 0.2, 0, y, -(R + 0.06));
    strip(s1, bzD, R + 0.05, 0, 2.2, 32.2, 0.42, 0.2);
    strip(s1, W, R + 0.16, 25 * D2R, 16.0, 17.7, 0.9, 0.4); strip(s1, W, R + 0.16, 335 * D2R, 16.0, 17.7, 0.9, 0.4);
    dome(s1, alu, R * 0.97, 31.9, 0.9);
    if (srb) {
      tube(s1, Wds, R, R, 32.5, 36.9);                       /* interstage and boattail stay on the booster */
      tube(s1, Wds, R, 2.7, 36.9, 39.3);
      disc(s1, 'dark', RC + 0.05, 2.04, 37.3);
      band(s1, dim, R, 32.6, 0.2); band(s1, dim, R, 36.85, 0.14);
      part('srbGround');
      var angs = [63, 117, 243, 297];
      for (i = 0; i < 4; i++) { th = angs[i] * D2R; g = boosterGroup('srbGround', i, th, R + 0.79 + 0.12); aj60(g, th, R + 0.79 + 0.12); }
    } else {
      tube(is, Wds, R, RC, 32.5, 34.2); tube(is, Wds, RC, RC, 34.2, 36.4);
      band(is, dim, RC, 34.25, 0.14); band(is, dim, RC, 36.3, 0.14);
    }
    /* Centaur: one engine, white foam-covered tank */
    bell(s2, 'stage2', 0, 33.3 + dy, 0, 2.2, 0.72, { rT: 0.1, ch: 0.35 });
    tube(s2, dark, 0.9, 0.4, 35.6 + dy, 36.0 + dy, { seg: 16 });
    dome(s2, steel, RC * 0.98, 36.6 + dy, -0.95);
    tube(s2, mat('whiteWarm'), RC + 0.012, RC + 0.012, 36.4 + dy, 44.3 + dy);
    band(s2, dim, RC, 36.52 + dy, 0.14); band(s2, dim, RC, 40.3 + dy, 0.1); band(s2, dim, RC, 44.2 + dy, 0.14);
    strip(s2, dim, RC + 0.04, PI / 2, 36.8 + dy, 44.0 + dy, 0.3, 0.12);
    tube(s2, W, RC, RC, 44.3 + dy, 45.1 + dy);
    dome(s2, steel, 1.42, 44.3 + dy, 0.7);
    tube(s2, alu, 1.0, 0.8, 45.0 + dy, 45.6 + dy, { seg: 24 });
    part('payloadMount', 45.6 + dy);
    if (srb) {                                               /* 5 m short fairing, encloses the Centaur */
      fairing([{ m: 'white', pts: [[2.7, 39.3], [2.7, 52.4]].concat(ogive(2.7, 52.4, 7.6, 9, 1.9, 1.35).slice(1)) }], [[2.7, 39.4, 0.2], [2.7, 45.8, 0.12], [2.7, 52.4, 0.12]], 2.7);
    } else {                                                 /* 4 m fairing: boattail, cylinder, cone */
      var c = conePts(2.1, 57.3, 16, 0.52);
      fairing([{ m: 'white', pts: [[RC + 0.02, 45.1], [2.1, 46.2, 1], [2.1, c.yBase, 1]].concat(c.pts.slice(1)) }], [[2.1, 46.25, 0.12], [2.1, c.yBase, 0.12]], 2.1);
    }
  }

  var SPEC = {
    delta7925: { name: 'Delta II 7925', fn: function () { buildDelta({}); } },
    delta7925H: { name: 'Delta II 7925H', fn: function () { buildDelta({ h: 1 }); } },
    delta7925_10L: { name: 'Delta II 7925-10L', fn: function () { buildDelta({ fair: '10L' }); } },
    atlasCentaur: { name: 'Atlas-Centaur', fn: function () { buildAtlasCentaur(false); } },
    atlasCentaurTE: { name: 'Atlas-Centaur TE-M-364-4', fn: function () { buildAtlasCentaur(true); } },
    saturnV: { name: 'Saturn V', fn: buildSaturnV },
    titan3e: { name: 'Titan IIIE-Centaur', fn: buildTitan },
    atlasV401: { name: 'Atlas V 401', fn: function () { buildAtlasV(false); } },
    atlasV541: { name: 'Atlas V 541', fn: function () { buildAtlasV(true); } }
  };
  function build(key) {
    var sp = SPEC[key];
    if (!sp) throw new Error('buildRocket3D: unknown rocket "' + key + '"');
    B = { root: new THREE.Group(), parts: {}, engines: [], lo: Infinity, hi: 0, seg: 32, fairR: 0 };
    B.root.name = 'rocket:' + key;
    var out;
    try {
      sp.fn();
      out = { key: key, name: sp.name, root: B.root, parts: B.parts, height: r4(B.hi), engines: B.engines,
        payloadY: B.parts.payloadMount.position.y, fairingRadius: B.fairR };
    } finally { B = null; }
    return out;
  }
  var keys = []; for (var kk in SPEC) keys.push(kk);
  return { build: build, keys: keys, names: SPEC };
})();

function buildRocket3D(key) { return RK.build(key); }
