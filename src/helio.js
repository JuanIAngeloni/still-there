// To-scale map of the inner solar system for the real trajectories stored in trajectories.json (JPL Horizons).
import * as THREE from 'three';
import { glowSprite } from './world.js';

export const HELIO = new THREE.Vector3(0, 4000, 4000);
export const BODY_COL = { earth: '#5aa0ff', mars: '#ff7a4c', jupiter: '#e0b080', eros: '#b9b4c8', vesta: '#b9b4c8', ceres: '#d8d2e6' };
const AU = 10;
// ecliptic x,y,z (AU) -> scene: ecliptic plane is horizontal
const put = (a, i, v) => v.set(a[i] * AU, a[i + 2] * AU, -a[i + 1] * AU);
function line(arr, color, opacity, loop) {
  const n = arr.length / 3, p = new Float32Array(n * 3), v = new THREE.Vector3();
  for (let i = 0; i < n; i++) { put(arr, i * 3, v); p.set([v.x, v.y, v.z], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  return new (loop ? THREE.LineLoop : THREE.Line)(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, fog: false }));
}
const dot = (color, s) => { const g = glowSprite(color, s); g.material.fog = false; g.material.depthTest = false; return g; };

export function makeHelio(scene, data) {
  const H = { group: new THREE.Group(), cur: null, maxR: 2 }; H.group.position.copy(HELIO); H.group.visible = false; scene.add(H.group);
  const fixed = new THREE.Group(), dyn = new THREE.Group(); H.group.add(fixed, dyn);
  fixed.add(dot(0xfff1d6, 7), dot(0xffffff, 2.2));
  const rings = {}; for (const b in data.rings) { rings[b] = line(data.rings[b], BODY_COL[b], .22, true); fixed.add(rings[b]); }
  H.show = (id, color) => {
    dyn.clear(); const m = data.missions[id]; if (!m) return null;
    for (const b in rings) rings[b].visible = b in m.bodies;
    const n = m.craft.length / 3, tracks = { craft: { arr: m.craft, line: line(m.craft, color, 1), dot: dot(color, 1) } };
    for (const b in m.bodies) tracks[b] = { arr: m.bodies[b], line: line(m.bodies[b], BODY_COL[b], .8), dot: dot(BODY_COL[b], 1) };
    let maxR = 1.2; for (const k in tracks) { const a = tracks[k].arr; for (let i = 0; i < a.length; i += 3) maxR = Math.max(maxR, Math.hypot(a[i], a[i + 1])); dyn.add(tracks[k].line, tracks[k].dot); }
    H.cur = { tracks, n, id }; H.maxR = maxR * AU; H.update(0, 1); return m;
  };
  const a = new THREE.Vector3(), b = new THREE.Vector3();
  H.update = (u, dotSize) => {
    if (!H.cur) return; const { tracks, n } = H.cur, f = Math.min(Math.max(u, 0), 1) * (n - 1), i = Math.min(Math.floor(f), n - 2), k = f - i;
    for (const key in tracks) { const t = tracks[key]; put(t.arr, i * 3, a); put(t.arr, i * 3 + 3, b); t.dot.position.copy(a).lerp(b, k); t.dot.scale.setScalar(dotSize * (key === 'craft' ? 1.25 : 1)); t.line.geometry.setDrawRange(0, i + 2); }
  };
  H.pos = (key, v) => (H.cur && H.cur.tracks[key] ? v.copy(H.cur.tracks[key].dot.position).add(HELIO) : v.copy(HELIO));
  return H;
}
