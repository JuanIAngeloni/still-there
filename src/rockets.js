import * as THREE from 'three';
import { GLOW, glowSprite } from './world.js';

// Simplified launch vehicles, one per family. Sizes in metres are approximate.
const SPEC = {
  saturn: { stages: [[42, 5.05, 0xf4f4f4], [25, 5.05, 0xf4f4f4], [18, 3.3, 0xf4f4f4]], top: [24, 1.95, 0xf4f4f4], bands: true, engines: 5, boosters: 0 },
  delta2: { stages: [[26, 1.22, 0x3fb5ad], [6, 1.22, 0xe9e9e9]], top: [9, 1.45, 0xf4f4f4], engines: 1, boosters: 9, bh: 13, br: .5 },
  atlasCentaur: { stages: [[22, 1.52, 0xc8ccd2], [9, 1.52, 0xf2f2f2]], top: [8, 1.52, 0xf4f4f4], engines: 3, boosters: 0, metal: true },
  titan: { stages: [[22, 1.52, 0xf2f2f2], [9, 1.52, 0xe6e6e6]], top: [17, 2.15, 0xf4f4f4], engines: 2, boosters: 2, bh: 26, br: 1.52 },
  atlasV: { stages: [[32, 1.9, 0xb8703c], [12, 1.52, 0xf2f2f2]], top: [13, 2.0, 0xf4f4f4], engines: 1, boosters: 0 },
  atlasV541: { stages: [[32, 1.9, 0xb8703c], [12, 1.52, 0xf2f2f2]], top: [19, 2.7, 0xf4f4f4], engines: 1, boosters: 4, bh: 17, br: .78 }
};
export function rocketFamily(m) {
  const r = m.rocket; if (r.startsWith('Saturn')) return 'saturn'; if (r.startsWith('Delta')) return 'delta2'; if (r.startsWith('Titan')) return 'titan';
  if (r.startsWith('Atlas V')) return m.id === 'ingenuity' ? 'atlasV541' : 'atlasV'; return 'atlasCentaur';
}
const S = .0011;
export function makeRocket(family) {
  const sp = SPEC[family], root = new THREE.Group(), body = new THREE.Group(), stage1 = new THREE.Group(), upper = new THREE.Group(); root.add(body); body.add(stage1, upper); body.scale.setScalar(S);
  const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: sp.metal ? .35 : .55, metalness: sp.metal ? .8 : .15, ...o });
  const cyl = (r1, r2, h, c, y, g) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 24), M(c)); m.position.y = y + h / 2; g.add(m); return m; };
  let y = 0;
  sp.stages.forEach(([h, r, c], i) => {
    const g = i === 0 ? stage1 : upper, prevR = i ? sp.stages[i - 1][1] : r;
    if (i && prevR !== r) { cyl(r, prevR, 3, c, y, g); y += 3; }
    cyl(r, r, h, c, y, g);
    if (sp.bands) for (let k = 0; k < 2; k++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.005, r * 1.005, h * .13, 24), M(0x15151a)); b.position.y = y + h * (.2 + k * .6); g.add(b); }
    y += h;
  });
  const lastR = sp.stages[sp.stages.length - 1][1], [th, tr, tc] = sp.top;
  if (tr !== lastR) { cyl(tr, lastR, 2.5, tc, y, upper); y += 2.5; }
  cyl(tr, tr, th * .55, tc, y, upper); y += th * .55;
  const nose = new THREE.Mesh(new THREE.ConeGeometry(tr, th * .45, 24), M(tc)); nose.position.y = y + th * .225; upper.add(nose); y += th * .45;
  if (family === 'saturn') { const les = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, 9, 8), M(0xdddddd)); les.position.y = y + 3; upper.add(les); y += 7; }
  const r0 = sp.stages[0][1];
  for (let i = 0; i < sp.engines; i++) { const a = i / Math.max(1, sp.engines - 1) * Math.PI * 2, d = sp.engines > 1 && i < sp.engines - (sp.engines === 5 ? 1 : 0) ? r0 * .55 : 0;
    const e = new THREE.Mesh(new THREE.CylinderGeometry(r0 * .16, r0 * .3, r0 * .9, 12, 1, true), M(0x3a3a40, { side: THREE.DoubleSide, metalness: .8 })); e.position.set(Math.cos(a) * d, -r0 * .45, Math.sin(a) * d); stage1.add(e); }
  for (let i = 0; i < sp.boosters; i++) { const a = i / sp.boosters * Math.PI * 2 + .3, d = r0 + sp.br, g = new THREE.Group(); g.position.set(Math.cos(a) * d, 0, Math.sin(a) * d);
    cyl(sp.br, sp.br, sp.bh, 0xf2f2f2, 0, g); const c = new THREE.Mesh(new THREE.ConeGeometry(sp.br, sp.br * 3, 16), M(0xf2f2f2)); c.position.y = sp.bh + sp.br * 1.5; g.add(c); stage1.add(g); }
  if (family === 'saturn') for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(.3, 7, 4), M(0xf4f4f4)); const a = i * Math.PI / 2 + Math.PI / 4; f.position.set(Math.cos(a) * (r0 + 1.8), 3.5, Math.sin(a) * (r0 + 1.8)); f.rotation.y = -a; stage1.add(f); }
  const flameM = () => new THREE.MeshBasicMaterial({ color: 0xffc070, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const w = r0 + (sp.boosters ? sp.br * 1.6 : 0);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(w * .9, 1, 20, 1, true), flameM()); flame.rotation.x = Math.PI; stage1.add(flame);
  const core = new THREE.Mesh(new THREE.ConeGeometry(w * .45, 1, 16, 1, true), flameM()); core.material.color.set(0xffffff); core.rotation.x = Math.PI; stage1.add(core);
  const y1 = sp.stages[0][0], uflame = new THREE.Mesh(new THREE.ConeGeometry(sp.stages[1][1] * .6, 14, 16, 1, true), flameM()); uflame.material.color.set(0xbfd8ff); uflame.rotation.x = Math.PI; uflame.position.y = y1 - 7; uflame.visible = false; upper.add(uflame);
  const glow = glowSprite(0xffa050, .12); glow.position.y = -.004; root.add(glow);
  const R = { group: root, height: y * S, glow, sepT: 0 };
  // k: engine power 0..1, sep: seconds since stage separation (or -1)
  R.set = (k, sep) => {
    const len = sp.stages[0][0] * (.5 + 1.9 * k) * (.9 + Math.random() * .2);
    flame.scale.y = len; flame.position.y = -len / 2; core.scale.y = len * .6; core.position.y = -len * .3;
    const on = sep < 0; flame.visible = core.visible = on && k > .02; glow.visible = k > .02; glow.scale.setScalar((on ? .05 + .13 * k : .04) * (.9 + Math.random() * .2));
    glow.position.y = on ? -.004 : y1 * S;
    uflame.visible = !on; if (!on) uflame.scale.y = .8 + Math.random() * .4;
    stage1.visible = sep < 6; stage1.position.y = on ? 0 : -sep * 9 - sep * sep * 5; stage1.rotation.x = on ? 0 : sep * .22; stage1.rotation.z = on ? 0 : sep * .09;
  };
  return R;
}

// exhaust and smoke particles in world space
export function makeExhaust(scene, n = 260) {
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), vel = new Float32Array(n * 3), life = new Float32Array(n), max = new Float32Array(n);
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ map: GLOW, size: .045, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false }));
  pts.frustumCulled = false; scene.add(pts); let next = 0; const v = new THREE.Vector3();
  const E = { pts };
  E.emit = (p, dir, speed, spread, count, ttl) => { for (let i = 0; i < count; i++) { const k = next = (next + 1) % n; v.randomDirection().multiplyScalar(spread).addScaledVector(dir, speed);
    pos.set([p.x, p.y, p.z], k * 3); vel.set([v.x, v.y, v.z], k * 3); life[k] = max[k] = ttl * (.6 + Math.random() * .8); } };
  E.update = dt => { for (let k = 0; k < n; k++) { if (life[k] <= 0) { col.set([0, 0, 0], k * 3); continue; } life[k] -= dt; const a = Math.max(0, life[k] / max[k]), i = k * 3;
    pos[i] += vel[i] * dt; pos[i + 1] += vel[i + 1] * dt; pos[i + 2] += vel[i + 2] * dt; vel[i] *= .985; vel[i + 1] *= .985; vel[i + 2] *= .985;
    const hot = Math.max(0, a - .65) * 2.8; col.set([(.42 + hot) * a, (.4 + hot * .7) * a, (.42 + hot * .3) * a], i); }
    g.attributes.position.needsUpdate = g.attributes.color.needsUpdate = true; };
  E.clear = () => { life.fill(0); };
  return E;
}

export function makePad() {
  const g = new THREE.Group(), m = c => new THREE.MeshStandardMaterial({ color: c, roughness: .9 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(22, 26, 3, 20), m(0x8a8a8a)); base.position.y = 1.5; g.add(base);
  const tower = new THREE.Mesh(new THREE.BoxGeometry(5, 90, 5), m(0x8f3a2e)); tower.position.set(13, 46, 0); g.add(tower);
  for (let i = 0; i < 4; i++) { const arm = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 1.6), m(0x777777)); arm.position.set(8, 18 + i * 20, 0); g.add(arm); }
  g.scale.setScalar(S); return g;
}
