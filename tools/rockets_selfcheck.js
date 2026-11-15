/* Self-check for 62-rockets.js without a browser:  node tools/rockets_selfcheck.js
   A minimal fake THREE records what the module builds; the checks then walk the tree. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const FILE = path.join(__dirname, '..', 'src', 'js', '62-rockets.js');
const code = fs.readFileSync(FILE, 'utf8');

/* canonical part ids (wip/SPEC.md) and documented overall heights in metres (see the table in 62-rockets.js) */
const DELTA = ['srbGround', 'srbAir', 'stage1', 'interstage', 'stage2', 'stage3', 'fairingA', 'fairingB', 'payloadMount'];
const PARTS = {
  atlasCentaur: ['boosterSection', 'stage1', 'interstage', 'fairingA', 'fairingB', 'stage2', 'payloadMount'],
  atlasCentaurTE: ['boosterSection', 'stage1', 'interstage', 'fairingA', 'fairingB', 'stage2', 'stage3', 'payloadMount'],
  saturnV: ['les', 'stage1', 'interstage', 'stage2', 'stage3', 'payloadMount'],
  titan3e: ['srbGround', 'stage1', 'stage2', 'stage3', 'fairingA', 'fairingB', 'payloadMount'],
  delta7925: DELTA, delta7925H: DELTA, delta7925_10L: DELTA,
  atlasV401: ['stage1', 'interstage', 'stage2', 'fairingA', 'fairingB', 'payloadMount'],
  atlasV541: ['srbGround', 'stage1', 'stage2', 'fairingA', 'fairingB', 'payloadMount']
};
const HEIGHT = { delta7925: 39.6, delta7925H: 39.6, delta7925_10L: 40.4, atlasCentaur: 34.44, atlasCentaurTE: 39.62, saturnV: 110.6,
  titan3e: 48.8, atlasV401: 57.3, atlasV541: 60.0 };
const ROCKET_OF_REQ = { surveyor1: 'atlasCentaur', pioneer10: 'atlasCentaurTE', pioneer11: 'atlasCentaurTE', apollo11: 'saturnV', viking1: 'titan3e',
  near: 'delta7925', pathfinder: 'delta7925', spirit: 'delta7925', opportunity: 'delta7925H', phoenix: 'delta7925', dawn: 'delta7925H',
  kepler: 'delta7925_10L', insight: 'atlasV401', ingenuity: 'atlasV541' };
const BOOSTERS = { delta7925: { srbGround: 6, srbAir: 3 }, delta7925H: { srbGround: 6, srbAir: 3 }, delta7925_10L: { srbGround: 6, srbAir: 3 },
  titan3e: { srbGround: 2 }, atlasV541: { srbGround: 4 } };
const ENGINES = { delta7925: { stage1: 1, stage2: 1, stage3: 1, srbGround: 6, srbAir: 3 }, atlasCentaur: { boosterSection: 2, stage1: 1, stage2: 2 },
  atlasCentaurTE: { boosterSection: 2, stage1: 1, stage2: 2, stage3: 1 }, saturnV: { stage1: 5, stage2: 5, stage3: 1 },
  titan3e: { srbGround: 2, stage1: 2, stage2: 1, stage3: 2 }, atlasV401: { stage1: 2, stage2: 1 }, atlasV541: { stage1: 2, stage2: 1, srbGround: 4 } };
ENGINES.delta7925H = ENGINES.delta7925_10L = ENGINES.delta7925;

/* ---------------- fake THREE ---------------- */
function makeThree() {
  function V2(x, y) { this.x = x || 0; this.y = y || 0; }
  function V3(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0; }
  V3.prototype.set = function (x, y, z) { this.x = x; this.y = y; this.z = z; return this; };
  V3.prototype.copy = function (v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; };
  V3.prototype.clone = function () { return new V3(this.x, this.y, this.z); };
  function Euler() { this.x = 0; this.y = 0; this.z = 0; }
  Euler.prototype.set = function (x, y, z) { this.x = x; this.y = y; this.z = z; return this; };
  function Quat() { this.to = null; }
  Quat.prototype.setFromUnitVectors = function (a, b) { this.from = a; this.to = b; return this; };
  function Color(h) { this.hex = h; this.linear = false; }
  Color.prototype.set = function (h) { this.hex = h; return this; };
  Color.prototype.convertSRGBToLinear = function () { this.linear = true; return this; };
  function M4() { this.rows = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
  M4.prototype.set = function () { this.rows = Array.prototype.slice.call(arguments); return this; };
  function Obj() {
    this.children = []; this.parent = null; this.name = ''; this.userData = {}; this.visible = true;
    this.position = new V3(); this.rotation = new Euler(); this.scale = new V3(1, 1, 1); this.quaternion = new Quat();
  }
  Obj.prototype.add = function (o) {
    if (o.parent) o.parent.children.splice(o.parent.children.indexOf(o), 1);
    o.parent = this; this.children.push(o); return this;
  };
  Obj.prototype.traverse = function (f) { f(this); this.children.forEach(function (c) { c.traverse(f); }); };
  function Group() { Obj.call(this); this.isGroup = true; this.type = 'Group'; }
  Group.prototype = Object.create(Obj.prototype);
  function Mesh(g, m) { Obj.call(this); this.isMesh = true; this.type = 'Mesh'; this.geometry = g; this.material = m; this.castShadow = false; this.receiveShadow = false; }
  Mesh.prototype = Object.create(Obj.prototype);
  function Geo(type) {
    return function () { this.type = type; this.args = Array.prototype.slice.call(arguments); this.attributes = {}; this.matrix = null; };
  }
  function proto(C) {
    C.prototype.applyMatrix4 = function (m) { this.matrix = m; return this; };
    C.prototype.computeVertexNormals = function () { this.normals = true; };
    C.prototype.setAttribute = function (n, a) { this.attributes[n] = a; return this; };
    return C;
  }
  function Mat(p) {
    p = p || {};
    this.color = new Color(p.color); this.roughness = p.roughness; this.metalness = p.metalness; this.side = 0; this.map = null; this.name = '';
    if (!(p.roughness >= 0 && p.roughness <= 1 && p.metalness >= 0 && p.metalness <= 1)) throw new Error('material with bad roughness / metalness');
  }
  function Attr(arr, n) { this.array = Float32Array.from(arr); this.itemSize = n; this.count = arr.length / n; }
  function Tex(c) { this.image = c; this.isTexture = true; }
  return {
    Vector2: V2, Vector3: V3, Euler: Euler, Quaternion: Quat, Color: Color, Matrix4: M4, Group: Group, Mesh: Mesh,
    CylinderGeometry: proto(Geo('Cylinder')), LatheGeometry: proto(Geo('Lathe')), BoxGeometry: proto(Geo('Box')),
    SphereGeometry: proto(Geo('Sphere')), BufferGeometry: proto(Geo('Buffer')), Float32BufferAttribute: Attr,
    MeshStandardMaterial: Mat, CanvasTexture: Tex,
    DoubleSide: 2, FrontSide: 0, BackSide: 1, sRGBEncoding: 3001, RepeatWrapping: 1000
  };
}
function fakeDocument(log) {
  return { createElement: function (tag) {
    if (tag !== 'canvas') throw new Error('unexpected element ' + tag);
    log.canvases++;
    return { width: 0, height: 0, getContext: function () { return { fillStyle: '', fillRect: function () { log.rects++; } }; } };
  } };
}
/* the site concatenates every module inside one strict function scope (src/page.html): load it the same way,
   so an undeclared variable or a leaked global fails here too */
function load(withDocument) {
  const log = { canvases: 0, rects: 0 };
  const sb = { THREE: makeThree(), console: console };
  if (withDocument) sb.document = fakeDocument(log);
  vm.createContext(sb);
  const before = Object.keys(sb);
  const api = vm.runInContext('(function(){\'use strict\';\n' + code + '\nreturn { ROCKET_OF: ROCKET_OF, buildRocket3D: buildRocket3D, RK: RK };\n})()', sb, { filename: '62-rockets.js' });
  api.leaks = function () { return Object.keys(sb).filter(function (k) { return before.indexOf(k) < 0; }); };
  api.log = log;
  return api;
}

/* ---------------- geometry sampling: the real vertices of each fake geometry ---------------- */
function geoPoints(g) {
  const a = g.args, P = [];
  let i, j;
  if (g.type === 'Cylinder') {
    const rt = a[0], rb = a[1], h = a[2], seg = a[3], ts = a[6] || 0, tl = a[7] === undefined ? Math.PI * 2 : a[7];
    for (i = 0; i <= seg; i++) { const th = ts + tl * i / seg; P.push([rt * Math.sin(th), h / 2, rt * Math.cos(th)], [rb * Math.sin(th), -h / 2, rb * Math.cos(th)]); }
  } else if (g.type === 'Lathe') {
    const pts = a[0], seg = a[1], ps = a[2] || 0, pl = a[3] === undefined ? Math.PI * 2 : a[3];
    for (i = 0; i <= seg; i++) { const ph = ps + pl * i / seg; for (j = 0; j < pts.length; j++) P.push([pts[j].x * Math.sin(ph), pts[j].y, pts[j].x * Math.cos(ph)]); }
  } else if (g.type === 'Box') {
    for (i = 0; i < 8; i++) P.push([(i & 1 ? 1 : -1) * a[0] / 2, (i & 2 ? 1 : -1) * a[1] / 2, (i & 4 ? 1 : -1) * a[2] / 2]);
  } else if (g.type === 'Sphere') {
    const r = a[0]; P.push([r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]);
  } else if (g.type === 'Buffer') {
    const arr = g.attributes.position.array; for (i = 0; i < arr.length; i += 3) P.push([arr[i], arr[i + 1], arr[i + 2]]);
  } else throw new Error('unknown geometry ' + g.type);
  if (g.matrix) { const m = g.matrix.rows; return P.map(function (p) { return [m[0] * p[0] + m[1] * p[1] + m[2] * p[2] + m[3], m[4] * p[0] + m[5] * p[1] + m[6] * p[2] + m[7], m[8] * p[0] + m[9] * p[1] + m[10] * p[2] + m[11]]; }); }
  return P;
}
function geoTris(g) {
  const a = g.args;
  if (g.type === 'Cylinder') return 2 * a[3] * (a[4] || 1) + (a[5] ? 0 : (a[0] > 0 ? a[3] : 0) + (a[1] > 0 ? a[3] : 0));
  if (g.type === 'Lathe') return 2 * a[1] * (a[0].length - 1);
  if (g.type === 'Box') return 12;
  if (g.type === 'Sphere') return 2 * a[1] * (a[2] - 1);
  return g.attributes.position.count / 3;
}
/* local -> parent, as three.js does it (Euler order XYZ, or the quaternion that turns +Y into a direction) */
function toParent(o, p) {
  let x = p[0] * o.scale.x, y = p[1] * o.scale.y, z = p[2] * o.scale.z, r;
  if (o.quaternion.to) {
    const d = o.quaternion.to, ref = Math.abs(d.y) < 0.99 ? [0, 1, 0] : [1, 0, 0];
    let u = [d.y * ref[2] - d.z * ref[1], d.z * ref[0] - d.x * ref[2], d.x * ref[1] - d.y * ref[0]];
    const ul = Math.hypot(u[0], u[1], u[2]); u = [u[0] / ul, u[1] / ul, u[2] / ul];
    const w = [u[1] * d.z - u[2] * d.y, u[2] * d.x - u[0] * d.z, u[0] * d.y - u[1] * d.x];
    r = [x * u[0] + y * d.x + z * w[0], x * u[1] + y * d.y + z * w[1], x * u[2] + y * d.z + z * w[2]];
  } else {
    const A = Math.cos(o.rotation.x), Bb = Math.sin(o.rotation.x), C = Math.cos(o.rotation.y), D = Math.sin(o.rotation.y), E = Math.cos(o.rotation.z), F = Math.sin(o.rotation.z);
    r = [C * E * x - C * F * y + D * z, (A * F + Bb * E * D) * x + (A * E - Bb * F * D) * y - Bb * C * z, (Bb * F - A * E * D) * x + (Bb * E + A * F * D) * y + A * C * z];
  }
  return [r[0] + o.position.x, r[1] + o.position.y, r[2] + o.position.z];
}
function toRoot(o, p, root) { while (o && o !== root) { p = toParent(o, p); o = o.parent; } return p; }
function emptyBox() { return { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity], n: 0 }; }
function grow(b, p) { for (let i = 0; i < 3; i++) { if (p[i] < b.min[i]) b.min[i] = p[i]; if (p[i] > b.max[i]) b.max[i] = p[i]; } b.n++; }

/* ---------------- checks ---------------- */
let failures = 0;
function check(ok, msg) { if (!ok) { failures++; console.log('  FAIL ' + msg); } }
function near(a, b, eps) { return Math.abs(a - b) <= eps; }

function checkRocket(api, key, quiet) {
  const R = api.buildRocket3D(key), want = PARTS[key];
  const tag = key + ': ';
  check(R && R.root && R.root.isGroup, tag + 'root is a Group');
  /* parts: exactly the canonical ids, direct children of root, named */
  const kids = R.root.children.map(function (c) { return c.name; }).sort();
  check(JSON.stringify(kids) === JSON.stringify(want.slice().sort()), tag + 'root children are exactly the canonical ids, got ' + kids.join(','));
  check(JSON.stringify(Object.keys(R.parts).sort()) === JSON.stringify(want.slice().sort()), tag + 'parts keys');
  want.forEach(function (id) {
    const g = R.parts[id];
    check(!!g && g.isGroup, tag + id + ' is a Group');
    if (!g) return;
    check(g.parent === R.root, tag + id + ' is a direct child of root');
    check(g.name === id, tag + id + ' has name = id');
    if (id !== 'payloadMount') check(g.position.x === 0 && g.position.y === 0 && g.position.z === 0 && g.rotation.x === 0 && g.rotation.y === 0 && g.rotation.z === 0, tag + id + ' sits at the origin');
  });
  /* bounding boxes, triangles, shadows */
  const all = emptyBox(), per = {}, nozzle = {};
  let tris = 0, meshes = 0;
  want.forEach(function (id) {
    const g = R.parts[id]; per[id] = emptyBox(); nozzle[id] = [];
    if (!g) return;
    g.traverse(function (o) {
      if (!o.isMesh) return;
      meshes++;
      check(o.castShadow === true && o.receiveShadow === true, tag + id + ' mesh casts and receives shadows');
      check(o.geometry && o.material, tag + id + ' mesh has geometry and material');
      /* a single-sided open shell is culled from inside: after a separation the viewer would look through the hull */
      check(o.material.side === 2 && o.material.shadowSide === 1, tag + id + ' material ' + o.material.name + ' is double-sided with back-face shadows');
      /* a nozzle bell is closed at the throat, by its own plug or by the capped chamber sitting on it */
      if (/nozzle/.test(o.material.name) && o.geometry.type === 'Lathe') {
        const prof = o.geometry.args[0], last = prof[prof.length - 1];
        const plugged = last.x < 1e-6 || o.parent.children.some(function (s) {
          return s.isMesh && s.geometry.type === 'Cylinder' && !s.geometry.args[5] && near(s.position.x, o.position.x, 1e-6) && near(s.position.z, o.position.z, 1e-6) &&
            near(s.position.y - s.geometry.args[2] / 2, o.position.y + last.y, 1e-3) && s.geometry.args[1] >= last.x;
        });
        check(plugged, tag + id + ' nozzle bell is closed at the throat');
      }
      tris += geoTris(o.geometry);
      geoPoints(o.geometry).forEach(function (p) { const q = toRoot(o, p, R.root); check(isFinite(q[0] + q[1] + q[2]), tag + id + ' finite vertex'); grow(all, q); grow(per[id], q); });
      if (/nozzle/.test(o.material.name)) nozzle[id].push(toRoot(o, [0, 0, 0], R.root));
    });
  });
  /* height */
  check(typeof R.height === 'number' && isFinite(R.height), tag + 'height is a number');
  check(Math.abs(R.height - HEIGHT[key]) / HEIGHT[key] <= 0.03, tag + 'height ' + R.height + ' within 3 % of ' + HEIGHT[key]);
  check(near(R.height, all.max[1], 0.02), tag + 'height equals the top of the geometry (' + all.max[1].toFixed(3) + ')');
  check(all.min[1] > -0.03 && all.min[1] < 0.06, tag + 'lowest point is at y = 0, got ' + all.min[1].toFixed(3));
  check(Math.abs(all.min[0] + all.max[0]) < 1.2 && Math.abs(all.min[2] + all.max[2]) < 1.2, tag + 'centred on the Y axis');
  /* engines */
  check(Array.isArray(R.engines) && R.engines.length > 0, tag + 'engines is a non-empty list');
  const count = {};
  let lowE = Infinity;
  R.engines.forEach(function (e, i) {
    check(isFinite(e.x) && isFinite(e.y) && isFinite(e.z) && isFinite(e.r) && e.r > 0, tag + 'engine ' + i + ' has finite numbers');
    check(!!R.parts[e.part], tag + 'engine ' + i + ' belongs to an existing part (' + e.part + ')');
    count[e.part] = (count[e.part] || 0) + 1; lowE = Math.min(lowE, e.y);
    const hit = (nozzle[e.part] || []).some(function (p) { return Math.hypot(p[0] - e.x, p[1] - e.y, p[2] - e.z) < 0.02; });
    check(hit, tag + 'engine ' + i + ' (' + e.part + ') sits on a nozzle of its own part');
  });
  check(lowE >= 0 && lowE <= 0.16, tag + 'lowest nozzle exit at y = 0, got ' + lowE);
  Object.keys(ENGINES[key]).forEach(function (p) { check(count[p] === ENGINES[key][p], tag + p + ' has ' + ENGINES[key][p] + ' engines, got ' + (count[p] || 0)); });
  /* payload mount */
  const pm = R.parts.payloadMount;
  check(R.payloadY > 0 && R.payloadY < R.height, tag + '0 < payloadY < height');
  check(pm && pm.position.y === R.payloadY && pm.position.x === 0 && pm.position.z === 0, tag + 'payloadMount is at payloadY on the axis');
  if (key !== 'saturnV') check(pm && pm.children.length === 0, tag + 'payloadMount is empty');
  else check(pm && pm.children.length >= 3, tag + 'payloadMount carries the Apollo spacecraft');
  check(R.fairingRadius > 0.5 && R.fairingRadius < 6, tag + 'fairingRadius');
  /* fairing halves: A on x > 0, B on x < 0, same size, payload mount inside */
  if (R.parts.fairingA) {
    const A = per.fairingA, Bx = per.fairingB;
    check(A.min[0] > -1e-6, tag + 'fairingA stays on x >= 0 (min x ' + A.min[0].toFixed(4) + ')');
    check(Bx.max[0] < 1e-6, tag + 'fairingB stays on x <= 0 (max x ' + Bx.max[0].toFixed(4) + ')');
    check(near(A.max[0], -Bx.min[0], 1e-6) && near(A.max[1], Bx.max[1], 1e-6) && near(A.min[1], Bx.min[1], 1e-6), tag + 'fairing halves mirror each other');
    check(near(A.max[1], R.height, 0.02), tag + 'the fairing tip is the top of the rocket');
    check(R.payloadY > A.min[1] && R.payloadY < A.max[1] - 2, tag + 'payloadY is inside the fairing with room above');
    check(near(A.max[0], R.fairingRadius, 0.06), tag + 'fairingRadius matches the fairing (' + A.max[0].toFixed(3) + ')');
    R.parts.fairingA.traverse(function (o) { if (o.isMesh) check(o.material.side === 2, tag + 'fairing material is double-sided'); });
    /* closed when untouched: each half is a half turn about the Y axis starting on the plane x = 0, and the nose ends on the axis */
    ['fairingA', 'fairingB'].forEach(function (id, k) {
      let tipY = -Infinity, tipR = Infinity;
      R.parts[id].traverse(function (o) {
        if (!o.isMesh) return;
        const a = o.geometry.args, lathe = o.geometry.type === 'Lathe', start = lathe ? (a[2] || 0) : (a[6] || 0), len = lathe ? a[3] : a[7];
        check(near(start, k * Math.PI, 1e-9) && near(len, Math.PI, 1e-9) && o.position.x === 0 && o.position.z === 0 && !o.rotation.x && !o.rotation.y && !o.rotation.z,
          tag + id + ' mesh is the half turn ' + (k ? 'x <= 0' : 'x >= 0') + ' about the rocket axis');
        if (lathe) { const p = a[0][a[0].length - 1], y = toRoot(o, [0, p.y, 0], R.root)[1]; if (y > tipY) { tipY = y; tipR = p.x; } }
      });
      check(tipR < 1e-9 && near(tipY, R.height, 0.02), tag + id + ' nose closes on the axis at the top');
    });
  }
  /* boosters: one sub-group each, away from the axis (the launch scene throws each one outwards from its position) */
  Object.keys(BOOSTERS[key] || {}).forEach(function (id) {
    const g = R.parts[id];
    check(g.children.length === BOOSTERS[key][id], tag + id + ' has ' + BOOSTERS[key][id] + ' boosters');
    g.children.forEach(function (b) {
      check(b.isGroup && Math.hypot(b.position.x, b.position.z) > 1 && b.position.y === 0, tag + id + ' booster is a group placed on its own axis');
    });
  });
  if (R.parts.boosterSection) check(!R.parts.boosterSection.children.every(function (c) { return c.isGroup; }), tag + 'boosterSection is one piece');
  check(tris < 30000, tag + 'under 30,000 triangles (' + tris + ')');
  check(R.root.parent === null, tag + 'root is detached');
  if (!quiet) {
    console.log(key.padEnd(15) + ' height ' + R.height.toFixed(2).padStart(7) + ' m (doc ' + HEIGHT[key] + ')  tris ' + String(Math.round(tris)).padStart(6) +
      '  meshes ' + String(meshes).padStart(4) + '  engines ' + String(R.engines.length).padStart(2) + '  payloadY ' + R.payloadY.toFixed(2).padStart(6) +
      '  fairingR ' + R.fairingRadius.toFixed(2) + '  width ' + (all.max[0] - all.min[0]).toFixed(1) + ' x ' + (all.max[2] - all.min[2]).toFixed(1));
  }
  return R;
}

/* syntax, as SPEC.md asks */
new Function(code);

const api = load(true);
check(JSON.stringify(api.ROCKET_OF) === JSON.stringify(ROCKET_OF_REQ), 'ROCKET_OF is the required table');
check(typeof api.buildRocket3D === 'function', 'buildRocket3D is a function');
const keys = Object.keys(PARTS);
check(JSON.stringify(api.RK.keys.slice().sort()) === JSON.stringify(keys.slice().sort()), 'the nine keys');
Object.keys(api.ROCKET_OF).forEach(function (id) { check(!!PARTS[api.ROCKET_OF[id]], 'ROCKET_OF.' + id + ' is a known key'); });
keys.forEach(function (k) { checkRocket(api, k, false); });
check(api.log.canvases >= 4 && api.log.rects > 20, 'canvas textures were drawn (' + api.log.canvases + ' canvases)');
/* building twice gives independent trees */
const r1 = api.buildRocket3D('delta7925'), r2 = api.buildRocket3D('delta7925');
check(r1.root !== r2.root && r1.parts.stage1 !== r2.parts.stage1 && r2.parts.stage1.parent === r2.root && r1.parts.stage1.parent === r1.root, 'two builds do not share groups');
let threw = false; try { api.buildRocket3D('nope'); } catch (e) { threw = true; }
check(threw, 'unknown key throws');
check(api.buildRocket3D('saturnV').height > 100, 'building still works after a failed call');
check(api.leaks().length === 0, 'no globals leaked: ' + api.leaks().join(','));
/* top-level names: only the API and the RK prefix */
const tops = (function () {
  const names = [], re = /^(?:var|let|const|function)\s+([A-Za-z_$][\w$]*)/gm;
  let m; while ((m = re.exec(code))) names.push(m[1]);
  return names;
})();
check(JSON.stringify(tops) === JSON.stringify(['ROCKET_OF', 'RK', 'buildRocket3D']), 'top-level names are ROCKET_OF, RK, buildRocket3D, got ' + tops.join(','));
/* no document (node, workers): the guard must hold */
const bare = load(false);
keys.forEach(function (k) { checkRocket(bare, k, true); });

console.log(failures ? failures + ' check(s) FAILED' : 'all checks passed (' + keys.length + ' rockets, with and without a document)');
process.exit(failures ? 1 : 0);
