import * as THREE from 'three';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import './style.css';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { makeWorld, latLon, SUN, glowSprite } from './world.js';
import { makeOpportunity, makeEagle, makePioneer, makeStage, STAGE } from './models.js';
import { MISSIONS, STORIES, SITES, TYPES, SOURCES } from './data.js';

const $ = s => document.querySelector(s), V3 = THREE.Vector3;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = () => innerWidth <= 820;
const state = {
  lang: localStorage.getItem('lang') || 'es',
  lite: localStorage.getItem('lite') ? localStorage.getItem('lite') === '1' : ((navigator.hardwareConcurrency || 8) <= 4 || /Android|iPhone|iPad/i.test(navigator.userAgent)),
  route: { view: 'inicio' }, time: 1965, playing: false, sel: null, part: null
};
const L = o => (o == null ? '' : typeof o === 'string' ? o : o[state.lang]);
const UI = {
  historias: ['Historias', 'Stories'], explorar: ['Explorar', 'Explore'], destinos: ['Destinos', 'Places'], maquinas: ['Máquinas', 'Machines'], fuentes: ['Fuentes', 'Sources'],
  lite: ['Modo liviano', 'Light mode'], chip: ['Escena 3D · arrastrá para girar · rueda para acercar', '3D scene · drag to rotate · scroll to zoom'],
  h1: ['Todo lo que dejamos allá afuera', 'Everything we left out there'],
  lead: ['Hay máquinas de NASA en la Luna, en Marte y más lejos que ya nadie va a ir a buscar. Elegí una y dejá que te cuente su historia.', 'There are NASA machines on the Moon, on Mars and farther away that nobody will ever go back for. Pick one and let it tell you its story.'],
  age: ['Hecho para chicos y chicas de 12 a 17 años, y para cualquier curioso del espacio.', 'Made for ages 12 to 17, and for anyone curious about space.'],
  follow: ['Seguir su historia →', 'Follow its story →'], timeline: ['Explorar la línea de tiempo', 'Explore the timeline'],
  tells: ['te cuenta', 'tells you'], rec: ['Voz recreada a partir de datos de NASA. No es una cita real.', 'Voice re-created from NASA data. Not a real quote.'],
  scene: ['Escena', 'Scene'], of: ['de', 'of'], next: ['Siguiente ▶', 'Next ▶'], prev: ['◀ Anterior', '◀ Back'], end: ['Otra historia', 'Another story'],
  steps: [['Por qué me mandaron', 'Cómo llegué', 'Qué descubrí', 'Cómo terminé', 'Dónde estoy hoy'], ['Why I was sent', 'How I got there', 'What I found', 'How it ended', 'Where I am today']],
  inside: ['Verme por dentro', 'See my parts'], insideOf: ['Ver por dentro', 'See its parts'], story: ['Su historia', 'Its story'], source: ['Fuente NASA ↗', 'NASA source ↗'],
  replay: ['↺ Repetir el viaje', '↺ Replay the trip'], phases: [['Despegue', 'En viaje', 'Llegada'], ['Liftoff', 'In flight', 'Arrival']],
  launch: ['Despegue', 'Launch'], arrive: ['Llegada', 'Arrival'], last: ['Última señal', 'Last signal'], where: ['Dónde está', 'Where it is'], rocket: ['Cohete', 'Rocket'], from: ['Desde', 'From'],
  moon: ['Luna', 'Moon'], mars: ['Marte', 'Mars'], deep: ['Espacio profundo', 'Deep space'], earth: ['Tierra', 'Earth'], jupiter: ['Júpiter', 'Jupiter'], saturn: ['Saturno', 'Saturn'], venus: ['Venus', 'Venus'], eros: ['Eros', 'Eros'], ceres: ['Ceres', 'Ceres'],
  destLead: {
    moon: ['Módulos, autos eléctricos e instrumentos que dejaron las misiones. Tocá una luz.', 'Landers, electric cars and instruments left by the missions. Tap a light.'],
    mars: ['Rovers, módulos y un helicóptero que ya no responden. Tocá una luz.', 'Rovers, landers and a helicopter that no longer answer. Tap a light.'],
    deep: ['Sondas y un telescopio que siguen viajando o dando vueltas, en silencio. Tocá una luz.', 'Probes and a telescope still travelling or orbiting, in silence. Tap a light.']
  },
  all: ['Todas las máquinas', 'All machines'], parts: ['Piezas', 'Parts'], seeParts: ['Ver sus piezas', 'See its parts'], goThere: ['clic para ver qué quedó ahí', 'click to see what was left there'], tapPart: ['clic para ver qué hizo', 'click to see what it did'], tapPin: ['clic para ver su ficha', 'click to open its card'],
  inApp: ['máquinas en esta app', 'machines in this app'], first: ['la primera en llegar', 'first to arrive'],
  play: ['▶ Reproducir', '▶ Play'], pause: ['❚❚ Pausa', '❚❚ Pause'], lifts: ['despega de', 'lifts off from'],
  pickPart: ['Tocá una pieza o un número', 'Tap a part or a number'], whatIs: ['Qué es', 'What it is'], whatFor: ['Qué permitió', 'What it made possible'],
  allTitle: ['Las máquinas', 'The machines'], allLead: ['Tres tienen su historia completa. El resto, su ficha con la fuente de NASA.', 'Three have a full story. The rest have a fact card with its NASA source.'],
  full: ['Historia completa', 'Full story'], seeOn: ['Ver dónde está', 'See where it is'],
  noteScale: ['Tamaños y distancias comprimidos para que todo entre en pantalla. Las trayectorias son ilustrativas.', 'Sizes and distances are compressed to fit the screen. Trajectories are illustrative.'],
  noteModel: ['Modelo 3D simplificado, armado para esta app a partir de las medidas publicadas por NASA.', '3D model simplified, built for this app from sizes published by NASA.'],
  noteDrawn: ['Júpiter, Saturno y Venus están dibujados. La Tierra, la Luna y Marte usan imágenes de NASA.', 'Jupiter, Saturn and Venus are drawn. Earth, Moon and Mars use NASA imagery.']
};
const t = k => { const v = UI[k]; return v[state.lang === 'es' ? 0 : 1]; };
const MON = { es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
const fmt = d => { const [y, m, dd] = d.split('-').map(Number); return state.lang === 'es' ? `${dd} ${MON.es[m - 1]} ${y}` : `${MON.en[m - 1]} ${dd}, ${y}`; };
const yr = d => { const [y, m, dd] = d.split('-').map(Number); return y + ((m - 1) * 30.44 + dd) / 365.25; };
const DEST_COL = { moon: '#9d8cff', mars: '#ff8a4c', deep: '#3fe0c5' };
const NOW = 2026.87, T0 = 1965;
MISSIONS.forEach(m => { m.tL = yr(m.launch); m.dur = Math.max(.6, Math.min(yr(m.arrive) - m.tL, 1.5)); m.col = DEST_COL[m.dest]; });
const byId = id => MISSIONS.find(m => m.id === id);

// ---------- renderer
const canvas = $('#gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !state.lite, powerPreference: 'high-performance' });
let pr = Math.min(devicePixelRatio, state.lite ? 1 : 2);
renderer.setPixelRatio(pr); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = !state.lite; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x030208);
const camera = new THREE.PerspectiveCamera(42, 1, .05, 3000);
const W = makeWorld(scene, renderer, state.lite), stage = makeStage(scene, state.lite);
const fogMars = new THREE.FogExp2(0xb98660, .006);
const envTex = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
const models = {};
function model(id) {
  if (models[id]) return models[id];
  const m = models[id] = { opportunity: makeOpportunity, eagle: makeEagle, pioneer: makePioneer }[id]();
  m.group.traverse(o => { if (o.isMesh && o.material.isMeshStandardMaterial) { o.material.envMap = envTex; o.material.envMapIntensity = id === 'opportunity' ? .75 : id === 'pioneer' ? .9 : .45; } });
  return m;
}

// pins
const pins = {};
for (const m of MISSIONS) {
  const b = W.bodies[m.dest === 'deep' ? m.anchor : m.dest], g = new THREE.Group();
  const surf = m.lat != null; if (surf) g.position.copy(latLon(m.lat, m.lon, b.r * 1.01));
  const base = surf ? b.r * .13 : .3, s = glowSprite(m.col, base), core = glowSprite(0xffffff, base * .38); g.add(s, core); b.obj.add(g);
  if (surf) for (const x of [s, core]) { x.material.depthTest = false; x.renderOrder = 5; }
  pins[m.id] = { g, s, core, body: b, base, surf, on: true };
}
const sitePins = {};
for (const k in SITES) { const g = new THREE.Group(); g.position.copy(latLon(SITES[k].lat, SITES[k].lon, 1.008)); g.add(glowSprite(0xffb070, .16), glowSprite(0xffffff, .05)); g.visible = false; W.bodies.earth.obj.add(g); sitePins[k] = g; }
const wpos = (o, v = new V3()) => o.getWorldPosition(v);

// ---------- flights
function makeFlight(color) {
  const N = 90, mk = (op) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3)); return new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity: op, fog: false, blending: THREE.AdditiveBlending, depthWrite: false })); };
  const F = { group: new THREE.Group(), trail: mk(.95), ghost: mk(.3), craft: glowSprite(color, .22), core: glowSprite(0xffffff, .07), pos: new V3(), tan: new V3() };
  const rocket = new THREE.Group(), white = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: .5 });
  const bodyM = new THREE.Mesh(new THREE.CylinderGeometry(.008, .008, .075, 16), white), nose = new THREE.Mesh(new THREE.ConeGeometry(.008, .022, 16), white);
  nose.position.y = .0485; const fl = new THREE.Mesh(new THREE.ConeGeometry(.011, .09, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: .85, blending: THREE.AdditiveBlending, depthWrite: false }));
  fl.rotation.x = Math.PI; fl.position.y = -.082; const flg = glowSprite(0xffa050, .09); flg.position.y = -.05;
  for (let i = 0; i < 2; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(.0035, .0035, .04, 10), white); b.position.set(i ? .011 : -.011, -.018, 0); rocket.add(b); }
  rocket.add(bodyM, nose, fl, flg); F.rocket = rocket; F.flame = fl;
  F.group.add(F.ghost, F.trail, F.craft, F.core, rocket); F.group.visible = false; scene.add(F.group);
  const curve = new THREE.CatmullRomCurve3([new V3(), new V3(1, 0, 0)], false, 'centripetal');
  F.update = (pts, p, showRocket) => {
    curve.points = pts; const a = F.trail.geometry.attributes.position, g = F.ghost.geometry.attributes.position, v = new V3();
    for (let i = 0; i < N; i++) { curve.getPoint(p * i / (N - 1), v); a.setXYZ(i, v.x, v.y, v.z); curve.getPoint(i / (N - 1), v); g.setXYZ(i, v.x, v.y, v.z); }
    a.needsUpdate = g.needsUpdate = true; F.trail.geometry.computeBoundingSphere(); F.ghost.geometry.computeBoundingSphere();
    curve.getPoint(p, F.pos); curve.getTangent(Math.min(p, .999), F.tan);
    F.craft.position.copy(F.pos); F.core.position.copy(F.pos); rocket.position.copy(F.pos); rocket.quaternion.setFromUnitVectors(new V3(0, 1, 0), F.tan);
    rocket.visible = !!showRocket; F.craft.visible = F.core.visible = !showRocket; F.flame.scale.y = .8 + Math.random() * .5;
  };
  return F;
}
const tmpA = new V3(), tmpB = new V3();
function pathFor(m) {
  const earth = W.bodies.earth.obj, s = SITES[m.site], p0 = earth.localToWorld(latLon(s.lat, s.lon, 1.002)), c = wpos(earth, tmpA), n = p0.clone().sub(c).normalize();
  const east = new V3(0, 1, 0).cross(n).normalize(), end = wpos(pins[m.id].g, new V3());
  const p1 = p0.clone().addScaledVector(n, .22).addScaledVector(east, .1), p2 = p0.clone().addScaledVector(n, .7).addScaledVector(east, .55);
  const d = end.distanceTo(p0), mid = p0.clone().lerp(end, .55).add(new V3(0, d * .16, 0));
  if (m.id === 'pioneer10') return [p0, p1, p2, new V3(24, 3, -14), W.flyby.clone(), end];
  if (d < 2.5) return [p0, p1, end];
  return [p0, p1, p2, mid, end];
}
const flights = {}; const flight = m => flights[m.id] || (flights[m.id] = makeFlight(m.col));

// ---------- camera rig
const rig = { focus: new V3(), r: 7, th: 1.9, ph: 1.25, sx: 0, sy: 0, t: { focus: () => ZERO, r: 4, th: 1.9, ph: 1.25, minR: 1.5, maxR: 60, maxPh: 2.9, follow: null, sx: 0, sy: 0 }, moved: false, speed: 2.4 };
const ZERO = new V3();
function cam(o, snap) {
  rig.t = { focus: () => ZERO, minR: 1.3, maxR: 80, maxPh: 2.9, follow: null, sx: 0, sy: 0, fk: 2.8, ...o }; rig.moved = false;
  if (rig.t.follow) aimFollow();
  if (snap) { rig.focus.copy(rig.t.focus()); rig.r = rig.t.r * 1.25; rig.th = rig.t.th - .25; rig.ph = rig.t.ph; }
}
function aimFollow() { const d = rig.t.follow(); rig.t.th = Math.atan2(d.z, d.x) + (rig.t.dth || 0); rig.t.ph = THREE.MathUtils.clamp(Math.acos(THREE.MathUtils.clamp(d.y, -1, 1)) + (rig.t.dph || 0), .15, rig.t.maxPh); }
const short = a => Math.atan2(Math.sin(a), Math.cos(a));
function rigUpdate(dt) {
  const T = rig.t, k = reduced ? 1 : 1 - Math.exp(-dt * rig.speed), kf = reduced ? 1 : 1 - Math.exp(-dt * T.fk);
  if (T.follow && !rig.moved) aimFollow();
  const f = T.focus(); if (rig.focus.distanceTo(f) > 800) rig.focus.copy(f); else rig.focus.lerp(f, kf);
  rig.r += (T.r - rig.r) * k; rig.th += short(T.th - rig.th) * k; rig.ph += (T.ph - rig.ph) * k;
  const sp = Math.sin(rig.ph), R = rig.r * (camera.aspect < 1 ? 1.5 : 1);
  camera.position.set(rig.focus.x + R * sp * Math.cos(rig.th), rig.focus.y + R * Math.cos(rig.ph), rig.focus.z + R * sp * Math.sin(rig.th));
  camera.lookAt(rig.focus);
  const m = mobile(), tx = m ? 0 : T.sx, ty = m ? (T.sy || (T.sx ? .2 : 0)) : 0;
  rig.sx += (tx - rig.sx) * k; rig.sy += (ty - rig.sy) * k;
  camera.setViewOffset(innerWidth, innerHeight, rig.sx * innerWidth, rig.sy * innerHeight, innerWidth, innerHeight);
}
// pointer control
const ptr = new Map(); let pinch = 0, downAt = null;
canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); downAt = [e.clientX, e.clientY, performance.now()]; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', e => {
  const p = ptr.get(e.pointerId); if (!p) return; const dx = e.clientX - p[0], dy = e.clientY - p[1]; ptr.set(e.pointerId, [e.clientX, e.clientY]);
  if (ptr.size === 1) { rig.moved = true; rig.t.th += dx * .0055; rig.t.ph = THREE.MathUtils.clamp(rig.t.ph - dy * .0055, .12, rig.t.maxPh); }
  else if (ptr.size === 2) { const [a, b] = [...ptr.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch) zoom(pinch / d); pinch = d; }
});
const up = e => { ptr.delete(e.pointerId); pinch = 0; canvas.classList.remove('drag'); if (downAt && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) < 6 && performance.now() - downAt[2] < 500) pick(e); downAt = null; };
canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
const zoom = f => { rig.t.r = THREE.MathUtils.clamp(rig.t.r * f, rig.t.minR, rig.t.maxR); };
canvas.addEventListener('wheel', e => { e.preventDefault(); zoom(Math.exp(e.deltaY * .0012)); }, { passive: false });
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2(), hv = new V3();
function targetAt(x, y) {
  const r = state.route; ndc.set(x / innerWidth * 2 - 1, -(y / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  if (cur.stage && cur.model) {
    const hit = ray.intersectObject(cur.model.group, true).find(h => h.object.userData.part && !h.object.userData.noPick && h.object.visible);
    if (!hit) return null; const id = hit.object.userData.part, p = STORIES[r.a].parts.find(q => q.id === id);
    return p && { part: id, text: L(p.name), hint: t('tapPart'), href: `#/maquina/${r.a}/${id}` };
  }
  if (!['inicio', 'explorar', 'destinos'].includes(r.view)) return null;
  let best = null, bd = 24;
  for (const m of MISSIONS) { const p = pins[m.id]; if (!p.g.visible) continue; wpos(p.g, hv).project(camera); if (hv.z > 1) continue;
    const d = Math.hypot((hv.x + 1) / 2 * innerWidth - x, (1 - hv.y) / 2 * innerHeight - y); if (d < bd) { bd = d; best = m; } }
  if (best) return { pin: best.id, text: `${best.short || best.name} · ${best.arrive.slice(0, 4)}`, hint: t('tapPin'), href: r.view === 'explorar' ? `#/explorar/${best.id}` : `#/destinos/${best.dest}/${best.id}` };
  for (const n of ['moon', 'mars']) { if (r.view === 'destinos' && r.a === n) continue; const o = W.bodies[n].obj, c = wpos(o, hv), rad = W.bodies[n].r * 1.25;
    if (ray.ray.distanceToPoint(c) < rad) return { text: t(n), hint: t('goThere'), href: `#/destinos/${n}` }; }
  return null;
}
function pick(e) { const tg = targetAt(e.clientX, e.clientY); if (tg) go(tg.href); }
let mouse = null, hoverPart = null, hoverPin = null; const tip = $('#tip');
canvas.addEventListener('pointermove', e => { mouse = e.pointerType === 'mouse' ? [e.clientX, e.clientY] : null; });
canvas.addEventListener('pointerleave', () => { mouse = null; });
function hoverUpdate() {
  const tg = mouse && !ptr.size ? targetAt(mouse[0], mouse[1]) : null;
  hoverPart = tg && tg.part || null;
  const hp = tg && tg.pin || null;
  if (hp !== hoverPin) { for (const id of [hoverPin, hp]) if (id) pins[id].core.scale.setScalar(pins[id].base * .38 * (id === hp ? 2.4 : 1)); hoverPin = hp; }
  tip.classList.toggle('on', !!tg); canvas.style.cursor = tg ? 'pointer' : '';
  if (tg) { const h = `${esc(tg.text)}<small>${tg.hint}</small>`; if (tip.dataset.h !== h) { tip.innerHTML = h; tip.dataset.h = h; }
    tip.style.transform = `translate(${Math.min(mouse[0] + 16, innerWidth - 240)}px,${mouse[1] + 18}px)`; }
}

function pinsUpdate() {
  for (const id in pins) { const p = pins[id]; let v = p.on;
    if (v && p.surf) { wpos(p.g, pv); wpos(p.body.obj, pc); v = pv.clone().sub(pc).normalize().dot(camera.position.clone().sub(pv).normalize()) > .1; }
    p.g.visible = v; }
}
// ---------- labels
let labels = [];
function addLabel(html, cls, pos, opt = {}) {
  const el = document.createElement(opt.href ? 'a' : 'div'); el.className = 'lbl ' + cls; el.innerHTML = html; if (opt.href) el.href = opt.href; if (opt.k) el.style.setProperty('--k', opt.k);
  $('#labels').appendChild(el); const l = { el, pos, ...opt }; labels.push(l); return l;
}
const pv = new V3(), pc = new V3();
function labelsUpdate() {
  for (const l of labels) {
    const p = l.pos(pv); let vis = l.show ? l.show() : true;
    if (vis && l.occ) { wpos(l.occ, pc); vis = p.clone().sub(pc).normalize().dot(camera.position.clone().sub(p).normalize()) > .08; }
    p.project(camera); if (p.z > 1) vis = false;
    l.el.classList.toggle('off', !vis);
    if (vis) l.el.style.transform = `translate(-50%,-50%) translate(${((p.x + 1) / 2 * innerWidth + (l.dx || 0)).toFixed(1)}px,${((1 - p.y) / 2 * innerHeight + (l.dy || 0)).toFixed(1)}px)`;
  }
}

// ---------- aiming bodies so the place of interest is lit
const aim = { earth: null, mars: null, moon: null }, AZ = Math.atan2(SUN.z, SUN.x);
function aimBody(name, lat, lon, off = .55) {
  if (name === 'moon') { aim.moon = AZ + Math.PI + off; return; }
  const v = latLon(lat, lon, 1); aim[name] = Math.atan2(v.z, v.x) - AZ - off;
}
function aimUpdate(dt) {
  const k = reduced ? 1 : 1 - Math.exp(-dt * 1.6);
  for (const n of ['earth', 'mars']) if (aim[n] != null) { const o = W.bodies[n].obj; o.rotation.y += short(aim[n] - o.rotation.y) * k; }
  if (aim.moon != null) { const b = W.bodies.moon; b.a += short(aim.moon - b.a) * k; }
}

// ---------- routing + scene setup
const cur = { model: null, flight: null, fx: null, fxT: 0, u: 0, stage: false };
function parse() { const [view = 'inicio', a, b] = (location.hash.replace(/^#\/?/, '') || 'inicio').split('/'); return { view, a, b }; }
function go(h) { if (location.hash === h) onRoute(); else location.hash = h; }
addEventListener('hashchange', () => onRoute());
let first = true;
function onRoute() {
  const r = parse(), wasStage = cur.stage, prevModel = cur.model;
  state.route = r;
  const st = STORIES[r.a], idx = +r.b - 1;
  const needStage = r.view === 'maquina' || (r.view === 'historia' && st && (idx === 2 || idx === 3));
  const hard = !first && (needStage !== wasStage || (needStage && prevModel !== model(st.model)));
  if (first || reduced || !hard) { setup(r, hard || first); render(); first = false; return; }
  // fly through a haze instead of cutting: dive in or pull away, swap the set while covered, then settle
  const id = ++trans, veil = $('#veil'), T = rig.t;
  veil.style.background = VEIL[needStage ? st.ground : cur.ground] || VEIL.space;
  rig.speed = 3.4;
  if (wasStage) { T.maxR = 1e4; T.r *= 3; T.ph = Math.max(.35, T.ph - .5); } else { T.minR = 0; T.r *= .42; }
  setTimeout(() => { if (id === trans) veil.classList.add('on'); }, 240);
  setTimeout(() => {
    if (id !== trans) return;
    setup(r, true); render();
    if (needStage) { rig.r = rig.t.r * 2.7; rig.ph = Math.max(.4, rig.t.ph - .55); rig.th = rig.t.th - .5; } else { rig.r = rig.t.r * .5; rig.th = rig.t.th - .15; }
    rig.speed = 1.9; veil.classList.remove('on');
    setTimeout(() => { if (id === trans) rig.speed = 2.4; }, 2200);
  }, 600);
}
let trans = 0;
const VEIL = { mars: '#a5673f', moon: '#77777c', space: '#05040c' };
function resetFx() {
  stage.dustTarget = 0; cur.fx = null; cur.fxT = 0;
  if (models.eagle) { models.eagle.ascent.position.y = 0; models.eagle.ascent.visible = true; models.eagle.flame.material.opacity = 0; }
}
function setup(r, snap) {
  labels.forEach(l => l.el.remove()); labels = [];
  for (const k in flights) flights[k].group.visible = false;
  for (const k in sitePins) sitePins[k].visible = false;
  aim.earth = aim.mars = aim.moon = null; W.spin = reduced ? 0 : 1; resetFx(); cur.flight = null; cur.u = 0; state.part = null;
  const st = STORIES[r.a], idx = +r.b - 1, m = st && byId(st.mission);
  const useStage = r.view === 'maquina' || (r.view === 'historia' && st && (idx === 2 || idx === 3));
  cur.stage = useStage; cur.ground = useStage ? st.ground : null; stage.group.visible = useStage; W.group.visible = !useStage; W.sunLight.visible = !useStage; W.fill.visible = !useStage;
  scene.fog = useStage && st.ground === 'mars' ? fogMars : null; cur.model = null;
  for (const mm of MISSIONS) { const p = pins[mm.id]; p.on = true; p.s.scale.setScalar(p.base); }
  document.body.classList.toggle('dim', r.view === 'maquinas' || r.view === 'fuentes');
  const bodyLabels = names => names.forEach(n => addLabel(t(n), 'body', v => wpos(W.bodies[n].obj, v), { dy: n === 'earth' || n === 'jupiter' ? -74 : -34 }));

  if (useStage) {
    const md = model(st.model); cur.model = md; stage.set(st.ground, md);
    const base = () => tmpB.copy(STAGE).add(md.center), maxPh = md.ground ? 1.5 : 2.9;
    let part = r.view === 'maquina' ? r.b : st.scenes[idx].part; state.part = part || null;
    const fx = r.view === 'historia' ? st.scenes[idx].fx : null; cur.fx = fx;
    const anchorW = id => md.group.localToWorld(md.anchors[id].clone());
    if (r.view === 'maquina') st.parts.forEach((p, i) => addLabel(String(i + 1), 'num' + (p.id === part ? ' on' : ''), v => v.copy(anchorW(p.id)), { href: `#/maquina/${r.a}/${p.id}` }));
    md.group.updateMatrixWorld(true);
    const o = { minR: md.minR, maxR: md.maxR, maxPh, sx: .17, th: .95, ph: 1.22 };
    if (fx === 'ascent') cam({ ...o, focus: () => tmpB.copy(STAGE).add(md.center).add(new V3(0, 3, 0)), r: 30, ph: 1.32 }, snap);
    else if (fx === 'fade') cam({ ...o, focus: base, r: md.radius * 1.1 }, snap);
    else if (part) {
      const an = md.group.localToWorld(md.anchors[part].clone()).sub(STAGE), far = Math.hypot(an.x, an.z) > md.radius * .2, near = Math.max(md.radius * .27, 2.3);
      const fa = new V3(); cam({ ...o, focus: () => fa.copy(anchorW(part)).lerp(base(), far ? .08 : .5), r: far ? near : md.radius * .8, minR: md.minR * .3, th: Math.atan2(an.z, an.x) + .4, ph: md.ground ? 1.2 : 1.0 }, snap);
    }
    else cam({ ...o, focus: base, r: md.radius }, snap);
    if (fx === 'dust') stage.dustTarget = 1;
    return;
  }
  if (r.view === 'inicio') { cam({ r: 5.4, th: AZ + .75, ph: 1.32, sx: .04, sy: .06, minR: 1.6, maxR: 40 }, snap); aim.moon = AZ + 1.9; bodyLabels(['moon']); }
  else if (r.view === 'historia' && st) {
    const pin = pins[m.id];
    if (idx === 0) {
      const s = SITES[m.site]; aimBody('earth', s.lat, s.lon); W.spin = 0; sitePins[m.site].visible = true;
      addLabel('<i></i>' + L(s), '', v => wpos(sitePins[m.site], v), { k: '#ffb070', occ: W.bodies.earth.obj, dy: -26 });
      cam({ r: 2.7, sx: .16, minR: 1.4, maxR: 12, follow: () => wpos(sitePins[m.site], new V3()).normalize(), dth: -.25, dph: .1 }, snap);
    } else if (idx === 1) {
      const s = SITES[m.site]; aimBody('earth', s.lat, s.lon); if (m.dest === 'moon') aimBody('moon', 0, 0, 1.15); if (m.dest === 'mars') aimBody('mars', m.lat, m.lon);
      W.spin = 0; cur.flight = flight(m); cur.flight.group.visible = true; cur.u = 0; cur.m = m;
      const d0 = wpos(sitePins[m.site], new V3()).normalize();
      cam({ focus: () => cur.flight.pos, fk: 6, r: .8, th: Math.atan2(d0.z, d0.x) - .9, ph: 1.2, sx: .16, minR: .25, maxR: 120 }, snap);
      bodyLabels(m.dest === 'moon' ? ['moon'] : m.dest === 'mars' ? ['mars'] : ['jupiter']);
    } else {
      if (m.dest !== 'deep') { aimBody(m.dest, m.lat, m.lon); W.spin = 0; }
      addLabel('<i></i>' + (m.short || m.name), 'on', v => wpos(pin.g, v), { k: m.col, occ: m.dest === 'deep' ? null : pin.body.obj, dy: -28 });
      if (m.dest === 'deep') {
        cur.flight = flight(m); cur.flight.group.visible = true; cur.static = true; bodyLabels(['earth', 'jupiter']);
        cam({ focus: () => tmpB.set(40, 2, -30), r: 82, th: 1.25, ph: 1.05, sx: .15, minR: 10, maxR: 160 }, snap);
      } else cam({ focus: () => wpos(pin.body.obj, tmpB), r: pin.body.r * 3.6, sx: .17, minR: pin.body.r * 1.5, maxR: 30, follow: () => wpos(pin.g, new V3()).sub(wpos(pin.body.obj, tmpA)).normalize(), dth: -.2 }, snap);
    }
  }
  else if (r.view === 'explorar') {
    state.sel = r.a && byId(r.a) ? r.a : null;
    if (state.sel) { const mm = byId(state.sel); state.playing = false; if (state.time < mm.tL + mm.dur) state.time = mm.tL + mm.dur + .01; }
    if (!state.sel && state.time <= T0 + .01 && !reduced) state.playing = true;
    const sm = state.sel && byId(state.sel);
    if (sm) { const pb = pins[sm.id].body; if (sm.dest !== 'deep') { aimBody(sm.dest, sm.lat, sm.lon); }
      cam({ focus: () => wpos(sm.dest === 'deep' ? pins[sm.id].g : pb.obj, tmpB), r: sm.dest === 'deep' ? 9 : pb.r * 5.5, th: 1.95, ph: 1.12, sx: .05, sy: .04, minR: 1, maxR: 140,
        follow: sm.dest === 'deep' ? null : () => wpos(pins[sm.id].g, new V3()).sub(wpos(pb.obj, tmpA)).normalize() }, snap); }
    else cam({ focus: () => tmpB.set(6.5, .2, -3), r: 21, th: 1.95, ph: 1.12, sx: -.1, sy: .06, minR: 4, maxR: 140 }, snap);
    bodyLabels(['earth', 'moon', 'mars', 'jupiter', 'eros', 'ceres'].filter(n => !(r.a && byId(r.a) && byId(r.a).dest === n)));
    
  }
  else if (r.view === 'destinos') {
    const d = ['moon', 'mars', 'deep'].includes(r.a) ? r.a : 'moon'; state.sel = r.b && byId(r.b) ? r.b : null; const sel = state.sel && byId(state.sel);
    const list = MISSIONS.filter(mm => mm.dest === d);
    list.forEach(mm => addLabel('<i></i>' + (mm.short || mm.name), mm.id === state.sel ? 'on' : '', v => wpos(pins[mm.id].g, v), { k: mm.col, occ: d === 'deep' ? null : pins[mm.id].body.obj, href: `#/destinos/${d}/${mm.id}`, dy: -24 }));
    if (d === 'deep') {
      bodyLabels(['earth', 'mars', 'jupiter']);
      cam(sel ? { focus: () => wpos(pins[sel.id].g, tmpB), r: sel.anchor === 'beyond' ? 60 : 9, th: 1.7, ph: 1.1, sx: .17, minR: 2, maxR: 160 } : { focus: () => tmpB.set(36, 2, -26), r: 105, th: 2.0, ph: .95, sx: .17, minR: 6, maxR: 180 }, snap);
    } else {
      const b = W.bodies[d];
      if (sel) aimBody(d, sel.lat, sel.lon); else if (d === 'moon') aimBody('moon'); else aimBody('mars', 5, -20);
      W.spin = 0;
      cam({ focus: () => wpos(b.obj, tmpB), r: b.r * (sel ? 3.3 : 4.1), sx: .17, minR: b.r * 1.45, maxR: 30,
        follow: sel ? () => wpos(pins[sel.id].g, new V3()).sub(wpos(b.obj, tmpA)).normalize() : () => (d === 'moon' ? wpos(W.bodies.earth.obj, new V3()).sub(wpos(b.obj, tmpA)).normalize() : tmpA.copy(SUN).applyAxisAngle(new V3(0, 1, 0), -.55).clone()), dth: sel ? -.15 : 0 }, snap);
    }
  }
  else cam({ r: 9, th: AZ + 1.1, ph: 1.2, minR: 2, maxR: 60 }, snap);
}

// ---------- UI
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const srcLink = u => u ? ` <a class="src" href="${u}" target="_blank" rel="noopener">${t('source')}</a>` : '';
function nav(on) {
  const tabs = [['historias', '#/inicio'], ['explorar', '#/explorar'], ['destinos', '#/destinos/moon'], ['maquinas', '#/maquina/opportunity'], ['fuentes', '#/fuentes']];
  return `<nav class="nav" aria-label="Principal"><a class="logo" href="#/inicio">Still There</a>${tabs.map(([k, h]) => `<a class="tab ${k === on ? 'on' : ''}" href="${h}" ${k === on ? 'aria-current="page"' : ''}>${t(k)}</a>`).join('')}
  <button class="tab sm" data-act="lite" aria-pressed="${state.lite}">${t('lite')}: ${state.lite ? 'on' : 'off'}</button><button class="tab sm keep" data-act="lang" aria-label="Idioma / Language">${state.lang === 'es' ? 'ES · en' : 'EN · es'}</button></nav>`;
}
function missionCard(m, extra = '') {
  const st = m.story;
  return `<span class="eyebrow">${L(TYPES[m.type])}</span><h2>${esc(m.name)}</h2><p class="lead">${L(m.line)}</p>
  <dl class="kv"><dt>${t('launch')}</dt><dd>${fmt(m.launch)} · ${m.rocket} · ${L(SITES[m.site])}</dd>
  <dt>${L(m.arriveLabel) || t('arrive')}</dt><dd>${fmt(m.arrive)}</dd>${m.end ? `<dt>${L(m.endLabel) || t('last')}</dt><dd>${fmt(m.end)}</dd>` : ''}
  <dt>${t('where')}</dt><dd>${L(m.place)}</dd></dl>
  <div class="row">${st ? `<a class="btn pri" href="#/historia/${st}/1">${t('story')}</a><a class="btn" href="#/maquina/${st}">${t('insideOf')}</a>` : ''}${extra}<a class="btn" href="${m.src}" target="_blank" rel="noopener">${t('source')}</a></div>`;
}
function render() {
  const r = state.route, ui = $('#ui'); let h = '';
  document.documentElement.lang = state.lang;
  const st = STORIES[r.a];
  if (r.view === 'inicio') {
    h = nav('historias') + `<section class="hero"><span class="eyebrow" style="--acc:var(--c)">NASA · ${t('moon')} · ${t('mars')} · ${t('deep')}</span><h1>${t('h1')}</h1><p class="lead">${t('lead')}</p><p style="margin-top:10px;font-size:14px">${t('age')}</p>
      <div class="row"><a class="btn" href="#/explorar">${t('timeline')}</a></div></section>
      <div class="panel picks">${Object.entries(STORIES).map(([id, s]) => `<div class="pick" style="--acc:${s.color}"><span class="eyebrow">${L(s.tag)}</span><h3>${esc(byId(s.mission).short || byId(s.mission).name)}</h3><div class="say">«${L(s.hook)}»</div><div class="links"><a href="#/historia/${id}/1">${t('follow')}</a><a href="#/maquina/${id}">${t('seeParts')}</a></div></div>`).join('')}</div>
      <div class="note">${t('noteScale')}</div>`;
  } else if (r.view === 'historia' && st) {
    const i = Math.min(Math.max(+r.b - 1 || 0, 0), 4), sc = st.scenes[i], m = byId(st.mission), name = m.short || m.name, steps = t('steps');
    h = nav('historias') + `<div class="chip">${t('chip')}</div><section class="panel" style="--acc:${st.color}" aria-live="polite">
      <span class="eyebrow">${esc(name)} · ${t('scene')} ${i + 1} ${t('of')} 5</span><h2>${L(sc.title)}</h2>
      <div class="who"><i></i>${esc(name)} ${t('tells')}</div><div class="say">${L(sc.say)}</div>
      ${sc.facts.map(f => `<div class="found"><b>${L(f.h)}</b><span>${L(f.p)}</span>${srcLink(f.src)}</div>`).join('')}
      ${i === 1 ? `<div class="bar"><i id="fbar"></i></div><div class="row" style="align-items:center"><button class="btn" data-act="replay">${t('replay')}</button><span id="fphase" style="color:var(--dim);font-size:14px"></span></div>` : ''}
      ${i >= 2 ? `<div class="row"><a class="btn" href="#/maquina/${r.a}${sc.part ? '/' + sc.part : ''}">${t('inside')}</a></div>` : ''}
      <div class="rec">${t('rec')}</div></section>
      <div class="steps" style="--acc:${st.color}">${steps.map((s, k) => `<a class="step ${k === i ? 'on' : k < i ? 'done' : ''}" href="#/historia/${r.a}/${k + 1}" aria-label="${s}">${k + 1} · ${s}</a>`).join('')}
      <a class="btn" href="${i ? `#/historia/${r.a}/${i}` : '#/inicio'}">${t('prev')}</a><a class="btn pri" href="${i < 4 ? `#/historia/${r.a}/${i + 2}` : '#/inicio'}">${i < 4 ? t('next') : t('end')}</a></div>`;
  } else if (r.view === 'maquina' && st) {
    const m = byId(st.mission), p = st.parts.find(x => x.id === r.b);
    h = nav('maquinas') + `<div class="chip">${t('chip')}</div><div class="seg">${Object.entries(STORIES).map(([id, s]) => `<a class="tab ${id === r.a ? 'on' : ''}" href="#/maquina/${id}">${esc(byId(s.mission).short || byId(s.mission).name)}</a>`).join('')}<a class="tab sm" href="#/maquinas">${t('all')} ▦</a></div>
      <section class="panel" style="--acc:${st.color}" aria-live="polite"><span class="eyebrow">${L(st.tag)}</span><h2>${p ? L(p.name) : esc(m.name)}</h2>
      ${p ? `<div class="found"><b>${t('whatIs')}</b><span>${L(p.what)}</span></div><div class="found"><b>${t('whatFor')}</b><span>${L(p.found)}</span>${srcLink(p.src)}</div>` : `<p class="lead">${L(m.line)}</p><p style="margin-top:10px">${t('pickPart')}</p>`}
      <div class="sub">${t('parts')}</div><div class="list">${st.parts.map((x, k) => `<a class="item ${x.id === r.b ? 'on' : ''}" href="#/maquina/${r.a}/${x.id}" style="--k:var(--c)"><i></i><b>${k + 1} · ${L(x.name)}</b></a>`).join('')}</div>
      <div class="row"><a class="btn pri" href="#/historia/${r.a}/1">${t('story')}</a>${p ? `<a class="btn" href="#/maquina/${r.a}">${esc(m.short || m.name)}</a>` : ''}</div></section>
      <div class="note">${t('noteModel')}</div>`;
  } else if (r.view === 'explorar') {
    const sel = state.sel && byId(state.sel);
    h = nav('explorar') + `<aside class="panel left"><span class="eyebrow" style="--acc:var(--c)">${t('explorar')}</span>
      <div class="list" id="mlist">${MISSIONS.map(m => `<a class="item" data-m="${m.id}" href="#/explorar/${m.id}" style="--k:${m.col}"><i></i><b>${esc(m.short || m.name)}</b><span>${m.launch.slice(0, 4)}</span></a>`).join('')}</div></aside>
      ${sel ? `<section class="panel over" aria-live="polite" style="--acc:${sel.col}">${missionCard(sel, `<a class="btn" href="#/destinos/${sel.dest}/${sel.id}">${t('seeOn')}</a>`)}</section>` : ''}
      <div class="time"><button class="btn pri" data-act="play" id="playb"></button><div class="year" id="year"></div>
      <div class="track">${MISSIONS.map(m => `<i class="tick" style="left:${((m.tL - T0) / (NOW - T0) * 100).toFixed(2)}%;--k:${m.col}"></i>`).join('')}<input id="slider" type="range" min="${T0}" max="${NOW}" step="0.01" aria-label="${state.lang === 'es' ? 'Año' : 'Year'}"></div></div>`;
  } else if (r.view === 'destinos') {
    const d = ['moon', 'mars', 'deep'].includes(r.a) ? r.a : 'moon', list = MISSIONS.filter(m => m.dest === d), sel = state.sel && byId(state.sel), firstM = list.reduce((a, b) => a.arrive < b.arrive ? a : b);
    h = nav('destinos') + `<div class="chip">${t('chip')}</div><div class="seg">${['moon', 'mars', 'deep'].map(k => `<a class="tab ${k === d ? 'on' : ''}" href="#/destinos/${k}">${t(k)}</a>`).join('')}</div>
      <section class="panel" style="--acc:${DEST_COL[d]}" aria-live="polite">${sel ? missionCard(sel) : `<span class="eyebrow">${t('destinos')}</span><h1>${t(d)}</h1><p class="lead">${UI.destLead[d][state.lang === 'es' ? 0 : 1]}</p>
      <dl class="kv"><dt>${list.length}</dt><dd>${t('inApp')}</dd><dt>${firstM.arrive.slice(0, 4)}</dt><dd>${t('first')}: ${esc(firstM.short || firstM.name)}</dd></dl>`}
      <div class="list">${list.map(m => `<a class="item ${m.id === state.sel ? 'on' : ''}" href="#/destinos/${d}/${m.id}" style="--k:${m.col}"><i></i><b>${esc(m.short || m.name)}</b><span>${m.arrive.slice(0, 4)}</span></a>`).join('')}</div></section>
      <div class="note">${d === 'deep' ? t('noteScale') + ' ' + t('noteDrawn') : t('noteScale')}</div>`;
  } else if (r.view === 'maquinas') {
    h = nav('maquinas') + `<div class="grid"><h1 style="margin-top:6px">${t('allTitle')}</h1><p class="lead">${t('allLead')}</p><div class="cards">${MISSIONS.map(m => `<article class="entry" style="--acc:${m.col}"><span class="eyebrow">${t(m.dest)} · ${L(TYPES[m.type])}</span><h3>${esc(m.name)}</h3><p>${L(m.line)}</p>
      <dl class="kv"><dt>${t('launch')}</dt><dd>${fmt(m.launch)}</dd><dt>${t('where')}</dt><dd>${L(m.place)}</dd></dl>
      <div class="row">${m.story ? `<a class="btn pri" href="#/historia/${m.story}/1">${t('full')}</a><a class="btn" href="#/maquina/${m.story}">${t('seeParts')}</a>` : ''}<a class="btn" href="#/destinos/${m.dest}/${m.id}">${t('seeOn')}</a><a class="btn" href="${m.src}" target="_blank" rel="noopener">${t('source')}</a></div></article>`).join('')}</div></div>`;
  } else {
    const es = state.lang === 'es';
    h = nav('fuentes') + `<div class="grid"><div class="doc"><h1 style="margin-top:6px">${t('fuentes')}</h1>
      <p class="lead">${es ? 'Cada fecha y cada número de la app sale de una página de NASA. Al lado de cada dato hay un enlace a su fuente.' : 'Every date and number in this app comes from a NASA page. Each fact has a link to its source next to it.'}</p>
      ${SOURCES.map(s => `<h3>${L(s.h)}</h3><ul>${s.items.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join('')}</ul>`).join('')}
      <h3>${es ? 'Qué es real y qué es recreado' : 'What is real and what is re-created'}</h3><ul>
      <li>${es ? 'Las frases en primera persona de las máquinas las escribimos para esta app a partir de datos de NASA. No son citas reales. La única cita real es la de Neil Armstrong al alunizar.' : 'The first-person lines spoken by the machines were written for this app from NASA data. They are not real quotes. The only real quote is Neil Armstrong’s on landing.'}</li>
      <li>${es ? 'Los puntos de aterrizaje en la Luna y Marte usan las coordenadas publicadas por NASA.' : 'Landing points on the Moon and Mars use the coordinates published by NASA.'}</li>
      <li>${t('noteScale')}</li><li>${t('noteDrawn')}</li><li>${t('noteModel')}</li>
      <li>${es ? 'Las fechas siguen la página de cada misión; pueden variar un día según el huso horario.' : 'Dates follow each mission page; they can differ by one day depending on the time zone.'}</li></ul>
      <h3>${es ? 'Uso de inteligencia artificial' : 'Use of artificial intelligence'}</h3><ul><li>${es ? 'El código, los textos y los modelos 3D de esta app se hicieron con ayuda de un asistente de IA (Devin, de Cognition) y fueron revisados por el equipo. Los datos se contrastaron con las páginas de NASA enlazadas.' : 'The code, texts and 3D models in this app were made with the help of an AI assistant (Devin, by Cognition) and reviewed by the team. Facts were checked against the linked NASA pages.'}</li></ul>
      <h3>${es ? 'Accesibilidad' : 'Accessibility'}</h3><ul><li>${es ? 'El «Modo liviano» baja la calidad gráfica para celulares y computadoras modestas. Toda la información está también en la sección Máquinas, sin necesidad del 3D.' : '“Light mode” lowers graphics quality for modest phones and computers. All information is also in the Machines section, with no need for 3D.'}</li></ul></div></div>`;
  }
  ui.innerHTML = h;
  if (r.view === 'explorar') { $('#slider').value = state.time; $('#slider').addEventListener('input', e => { state.time = +e.target.value; state.playing = false; }); exploreUI(true); }
}
$('#ui').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  if (a === 'lang') { state.lang = state.lang === 'es' ? 'en' : 'es'; localStorage.setItem('lang', state.lang); setup(state.route, false); render(); }
  if (a === 'lite') { localStorage.setItem('lite', state.lite ? '0' : '1'); location.reload(); }
  if (a === 'replay') cur.u = 0;
  if (a === 'play') { if (state.time >= NOW - .05) state.time = T0; state.playing = !state.playing; }
});
addEventListener('keydown', e => {
  const r = state.route; if (r.view !== 'historia' || e.target.matches('input')) return; const i = +r.b || 1;
  if (e.key === 'ArrowRight' && i < 5) go(`#/historia/${r.a}/${i + 1}`); if (e.key === 'ArrowLeft' && i > 1) go(`#/historia/${r.a}/${i - 1}`);
});
let toastT = 0; function toast(s) { const el = $('#toast'); el.textContent = s; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2600); }

// ---------- per-frame logic
let lastYear = '', lastPlay = null;
function exploreUI(force) {
  const y = String(Math.floor(state.time)); if (force || y !== lastYear) { const el = $('#year'); if (el) el.textContent = y; lastYear = y; }
  if (force || lastPlay !== state.playing) { const b = $('#playb'); if (b) b.textContent = state.playing ? t('pause') : t('play'); lastPlay = state.playing; }
  const s = $('#slider'); if (s && document.activeElement !== s) s.value = state.time;
  document.querySelectorAll('#mlist .item').forEach(el => { const m = byId(el.dataset.m), w = state.time < m.tL, f = !w && state.time < m.tL + m.dur; el.classList.toggle('wait', w); el.classList.toggle('fly', f); el.classList.toggle('on', m.id === state.sel); });
}
function explore(dt) {
  const prev = state.time;
  if (state.playing) {
    const busy = MISSIONS.some(m => state.time >= m.tL - .02 && state.time < m.tL + m.dur);
    state.time = Math.min(NOW, state.time + dt * (busy ? .42 : 3.2)); if (state.time >= NOW) state.playing = false;
    for (const m of MISSIONS) if (prev < m.tL && state.time >= m.tL) toast(`${m.launch.slice(0, 4)} · ${m.short || m.name} ${t('lifts')} ${L(SITES[m.site])}`);
  }
  for (const m of MISSIONS) {
    const p = (state.time - m.tL) / m.dur, pin = pins[m.id]; pin.on = p >= 1;
    if (p >= 0 && p < 1) { const f = flight(m); f.group.visible = true; const e = p * p * (3 - 2 * p); f.update(pathFor(m), e, false); }
    else if (flights[m.id]) flights[m.id].group.visible = false;
    if (p >= 1) { const pulse = m.id === state.sel ? 1.5 + .5 * Math.sin(clock.elapsedTime * 4) : Math.max(1, 2.2 - (p - 1) * 2); pin.s.scale.setScalar(pin.base * (pin.surf ? (state.sel ? 1.6 : 6) : 1.6) * pulse); }
  }
  exploreUI(false);
}
function storyFlight(dt) {
  const m = cur.m, F = cur.flight; if (!reduced) cur.u = Math.min(1, cur.u + dt / 17); else cur.u = 1;
  const u = cur.u, p = u < .22 ? .035 * (u / .22) ** 2 : .035 + .965 * ((x => x * x * (3 - 2 * x))((u - .22) / .78));
  const pts = pathFor(m); F.update(pts, p, p < .05);
  const dist = pts[0].distanceTo(pts[pts.length - 1]), ss = THREE.MathUtils.smoothstep, br = pins[m.id].body.r;
  if (!rig.moved) { const dir = tmpA.copy(pts[pts.length - 1]).sub(pts[0]), n = tmpB.copy(pts[0]).normalize(); let th = Math.atan2(dir.z, dir.x) + Math.PI / 2;
    if (Math.cos(th) * n.x + Math.sin(th) * n.z < 0) th += Math.PI; rig.t.th = th; rig.t.ph = 1.2; }
  if (!rig.zoomed) rig.t.r = THREE.MathUtils.lerp(THREE.MathUtils.lerp(.75, Math.max(2.2, Math.min(15, dist * .5)), ss(p, .02, .32)), Math.max(1.6, br * 6), ss(p, .72, 1));
  const b = $('#fbar'); if (b) b.style.width = (u * 100).toFixed(1) + '%';
  const ph = $('#fphase'); if (ph) ph.textContent = t('phases')[p < .05 ? 0 : p < .97 ? 1 : 2];
}
function highlight(time) {
  const md = cur.model; if (!md) return; const pulse = .28 + .18 * Math.sin(time * 4);
  md.group.traverse(o => { if (!o.isMesh || !o.material.emissive) return; const on = state.part && o.userData.part === state.part; if (on) o.material.emissive.setRGB(.25 * pulse, 1 * pulse, .85 * pulse); else if (hoverPart && o.userData.part === hoverPart) o.material.emissive.setRGB(.05, .2, .17); else if (o.userData.em0) o.material.emissive.copy(o.userData.em0); });
}
const dusty = new THREE.Color(0x9a6a48), white = new THREE.Color(0xffffff);
function fx(dt) {
  if (models.opportunity) models.opportunity.parts.panels.traverse(o => { if (o.isMesh && o.material.map) o.material.color.lerpColors(white, dusty, cur.fx === 'dust' ? stage.dust * .9 : 0); });
  if (cur.stage && scene.fog) scene.fog.density = .006 + stage.dust * .05;
  if (models.pioneer && cur.model === models.pioneer && !reduced) models.pioneer.spin.rotation.y += dt * .25;
  if (cur.fx === 'ascent') {
    const e = models.eagle; cur.fxT = (cur.fxT + dt) % 14; const tt = cur.fxT - 2.5;
    if (reduced) { e.ascent.visible = false; return; }
    e.ascent.visible = cur.fxT < 11; e.ascent.position.y = tt > 0 ? .5 * tt * tt : 0; e.flame.material.opacity = tt > 0 ? .55 + Math.random() * .35 : 0; e.flame.scale.y = 1 + Math.random() * .4;
  }
  if (cur.fx === 'fade') { cur.fxT += dt; stage.light.intensity = Math.max(.15, 2.6 - cur.fxT * .16); if (!rig.moved) rig.t.r = Math.min(46, 14 + cur.fxT * 1.6); }
}

// ---------- loop
const clock = new THREE.Clock(); let slow = 0;
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
function frame() {
  const dt = Math.min(clock.getDelta(), .05), time = clock.elapsedTime, v = state.route.view;
  W.update(dt, time); aimUpdate(dt);
  if (v === 'explorar') explore(dt);
  if (cur.flight && v === 'historia') { if (cur.static) cur.flight.update(pathFor(byId(STORIES[state.route.a].mission)), 1, false); else storyFlight(dt); }
  if (cur.stage) { stage.update(dt); fx(dt); highlight(time); }
  rigUpdate(dt); W.stars.position.copy(camera.position);
  if (cur.stage) { stage.light.target.position.copy(cur.model.center); }
  for (const k in sitePins) if (sitePins[k].visible) sitePins[k].children[0].scale.setScalar(.16 * (1 + .25 * Math.sin(time * 3)));
  pinsUpdate(); labelsUpdate(); hoverUpdate();
  renderer.render(scene, camera);
  // adaptive resolution
  slow = dt > 1 / 32 ? slow + 1 : Math.max(0, slow - 2);
  if (slow > 120 && pr > .75) { pr = Math.max(.75, pr - .25); renderer.setPixelRatio(pr); resize(); slow = 0; }
  requestAnimationFrame(frame);
}
canvas.addEventListener('wheel', () => { rig.zoomed = true; }); addEventListener('hashchange', () => { rig.zoomed = false; cur.static = false; });
THREE.DefaultLoadingManager.onLoad = () => $('#loading').classList.add('off');
setTimeout(() => $('#loading').classList.add('off'), 6000);
onRoute(); frame();
window.__app = { state, rig, W, stage, cur, renderer, scene, camera };
