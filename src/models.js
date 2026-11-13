import * as THREE from 'three';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .6, metalness: .3, ...o });

function noiseTex(size, base, amp, seed = 3, repeat = 1) {
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
  const img = g.createImageData(size, size); let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < size * size; i++) { const v = base + (rnd() - .5) * amp; img.data.set([v, v, v, 255], i * 4); }
  g.putImageData(img, 0, 0);
  // soften into blotches
  g.globalAlpha = .5; g.drawImage(c, 0, 0, size / 4, size / 4, 0, 0, size, size); g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); return t;
}
const FOIL = () => noiseTex(256, 128, 200, 9, 3);

function strut(a, b, r, m) {
  const d = b.clone().sub(a), mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 8), m);
  mesh.position.copy(a).addScaledVector(d, .5); mesh.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize()); return mesh;
}
function part(root, parts, id) { const g = new THREE.Group(); g.userData.part = id; root.add(g); parts[id] = g; return g; }
function finish(root, parts, anchors, info) {
  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  for (const id in parts) parts[id].traverse(o => { if (o.isMesh) { o.userData.part = id; o.userData.em0 = o.material.emissive ? o.material.emissive.clone() : null; } });
  return { group: root, parts, anchors, ...info };
}

function solarTex() {
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#18224f'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    g.fillStyle = `hsl(${226 + (x * 7 + y * 3) % 12},60%,${30 + ((x + y) % 3) * 5}%)`; g.fillRect(x * 32 + 2, y * 32 + 2, 28, 28);
  }
  g.strokeStyle = 'rgba(200,210,255,.25)'; for (let i = 0; i < 256; i += 8) { g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

// ---------- Opportunity (Mars Exploration Rover), built from primitives; proportions approximate
export function makeOpportunity() {
  const root = new THREE.Group(), parts = {};
  const alu = () => mat(0xb9bcc4, { metalness: .8, roughness: .35 }), dark = () => mat(0x22242b, { metalness: .5, roughness: .5 });
  const body = part(root, parts, 'body');
  const web = new THREE.Mesh(new THREE.BoxGeometry(1.0, .3, .72), mat(0xc79a3a, { metalness: .9, roughness: .45, bumpMap: FOIL(), bumpScale: .6 }));
  web.position.set(0, .55, 0); body.add(web);

  const panels = part(root, parts, 'panels'), sm = () => mat(0xffffff, { map: solarTex(), metalness: .6, roughness: .28 });
  const shape = pts => { const s = new THREE.Shape(); pts.forEach(([x, z], i) => i ? s.lineTo(x, z) : s.moveTo(x, z)); return s; };
  const slab = (pts, y) => {
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(shape(pts), { depth: .025, bevelEnabled: false }), sm());
    m.rotation.x = Math.PI / 2; m.position.y = y; m.material.map.repeat.set(2.2, 2.2); panels.add(m); return m;
  };
  slab([[-.55, -.42], [.6, -.42], [.6, .42], [-.55, .42]], .745);
  slab([[-.5, .43], [.55, .43], [.25, 1.02], [-.35, 1.02]], .745);
  slab([[-.5, -.43], [.55, -.43], [.25, -1.02], [-.35, -1.02]], .745);
  slab([[-.56, -.4], [-.56, .4], [-1.12, .22], [-1.12, -.22]], .745);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(1.16, .03, .86), alu()); rim.position.set(.02, .715, 0); panels.add(rim);

  const pancam = part(root, parts, 'pancam');
  pancam.add(strut(V(.5, .74, .18), V(.5, 1.5, .18), .028, alu()));
  const head = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, .46), mat(0xe9e9ec, { roughness: .5, metalness: .2 })); head.position.set(.5, 1.54, .18); pancam.add(head);
  [[-.19, .05], [.19, .05], [-.07, .03], [.07, .03]].forEach(([z, r]) => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(r, r, .09, 20), dark()); l.rotation.z = Math.PI / 2; l.position.set(.56, 1.54, .18 + z); pancam.add(l);
    const gl = new THREE.Mesh(new THREE.CircleGeometry(r * .8, 20), mat(0x101a3a, { metalness: 1, roughness: .1 })); gl.rotation.y = Math.PI / 2; gl.position.set(.606, 1.54, .18 + z); pancam.add(gl);
  });

  const ant = part(root, parts, 'antenna');
  ant.add(strut(V(-.2, .76, -.22), V(-.2, .98, -.22), .015, alu()));
  const dish = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .02, 32), mat(0xd8d8dc, { metalness: .7, roughness: .3 }));
  dish.position.set(-.2, 1.02, -.22); dish.rotation.set(.9, 0, .4); ant.add(dish);
  ant.add(strut(V(-.38, .76, .2), V(-.38, 1.28, .2), .012, alu()));

  const arm = part(root, parts, 'arm');
  const a0 = V(.5, .47, .1), a1 = V(.82, .62, .12), a2 = V(1.16, .3, .12);
  arm.add(strut(a0, a1, .022, alu()), strut(a1, a2, .02, alu()));
  [a0, a1].forEach(p => { const j = new THREE.Mesh(new THREE.SphereGeometry(.035, 16, 12), dark()); j.position.copy(p); arm.add(j); });
  const tur = new THREE.Mesh(new THREE.CylinderGeometry(.055, .055, .1, 16), dark()); tur.position.copy(a2); arm.add(tur);
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, .09, 12), mat([0xd9d9d9, 0xc79a3a, 0x8fa3c9, 0x555a66][i], { metalness: .7 }));
    const an = i * Math.PI / 2; t.position.set(a2.x + Math.cos(an) * .075, a2.y, a2.z + Math.sin(an) * .075); t.rotation.set(Math.sin(an) * 1.57, 0, -Math.cos(an) * 1.57); arm.add(t);
  }

  const wheels = part(root, parts, 'wheels');
  for (const z of [-.62, .62]) {
    const piv = V(.12, .5, z * .78), bog = V(-.32, .3, z), wf = V(.66, .125, z), wm = V(-.02, .125, z), wr = V(-.64, .125, z);
    wheels.add(strut(V(.12, .5, 0), piv, .022, alu()), strut(piv, V(.6, .34, z), .022, alu()), strut(V(.6, .34, z), wf, .02, alu()),
      strut(piv, bog, .022, alu()), strut(bog, V(-.02, .22, z), .018, alu()), strut(V(-.02, .22, z), wm, .018, alu()), strut(bog, V(-.64, .25, z), .018, alu()), strut(V(-.64, .25, z), wr, .018, alu()));
    for (const w of [wf, wm, wr]) {
      const g = new THREE.Group(); g.position.copy(w);
      const tyre = new THREE.Mesh(new THREE.CylinderGeometry(.125, .125, .16, 28, 1), mat(0x8e9199, { metalness: .85, roughness: .4 })); tyre.rotation.x = Math.PI / 2; g.add(tyre);
      for (let i = 0; i < 14; i++) { const c = new THREE.Mesh(new THREE.BoxGeometry(.012, .012, .165), dark()); const an = i / 14 * Math.PI * 2; c.position.set(Math.cos(an) * .128, Math.sin(an) * .128, 0); c.rotation.z = an; g.add(c); }
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .17, 16), dark()); hub.rotation.x = Math.PI / 2; g.add(hub);
      wheels.add(g);
    }
  }
  return finish(root, parts, { pancam: V(.5, 1.54, .18), panels: V(-.1, .78, -.7), arm: V(1.16, .3, .12), wheels: V(.66, .13, .7), antenna: V(-.2, 1.02, -.22) },
    { center: V(0, .7, 0), radius: 4.2, minR: 1.6, maxR: 14, ground: true });
}

// ---------- Apollo 11 lunar module Eagle. Stage sizes from NSSDCA: octagonal descent stage 4.2 m across, 1.7 m thick, footpad span 9.4 m
export function makeEagle() {
  const root = new THREE.Group(), parts = {};
  const gold = () => mat(0xc9962e, { metalness: .95, roughness: .42, bumpMap: FOIL(), bumpScale: 1.4 });
  const grey = () => mat(0xb4b7bd, { metalness: .75, roughness: .45 }), dark = () => mat(0x1c1d22, { metalness: .4, roughness: .6 });
  const descent = part(root, parts, 'descent');
  const ds = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 1.7, 8), gold()); ds.position.y = 2.35; ds.rotation.y = Math.PI / 8; descent.add(ds);
  for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, .04), dark()); const an = i * Math.PI / 2; p.position.set(Math.cos(an) * 2.09, 2.35, Math.sin(an) * 2.09); p.rotation.y = -an + Math.PI / 2; descent.add(p); }
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(.35, .78, 1.0, 32, 1, true), mat(0x55565c, { metalness: .9, roughness: .35, side: THREE.DoubleSide })); bell.position.y = 1.05; descent.add(bell);

  const legs = part(root, parts, 'legs');
  for (let i = 0; i < 4; i++) {
    const an = Math.PI / 4 + i * Math.PI / 2, c = Math.cos(an), s = Math.sin(an), P = (r, y) => V(c * r, y, s * r);
    const foot = P(4.7, .12), knee = P(3.55, 1.75);
    legs.add(strut(P(2.2, 3.1), knee, .07, gold()), strut(knee, foot, .06, grey()));
    const t = V(-s, 0, c);
    for (const k of [-1, 1]) legs.add(strut(P(2.1, 1.6).addScaledVector(t, k * .8), knee, .04, gold()));
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(.46, .4, .16, 24), gold()); pad.position.copy(foot); legs.add(pad);
    if (i === 0) for (let k = 0; k < 8; k++) { const y = .5 + k * .3, r = 4.7 - (y - .12) / (1.75 - .12) * 1.15; if (y < 1.75) legs.add(strut(P(r, y).addScaledVector(t, -.25), P(r, y).addScaledVector(t, .25), .02, grey())); }
  }

  const ascent = part(root, parts, 'ascent');
  const cabin = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.9, 24), grey()); cabin.rotation.z = Math.PI / 2; cabin.position.set(.15, 4.45, 0); ascent.add(cabin);
  const mid = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 2.6), grey()); mid.position.set(-.7, 4.2, 0); ascent.add(mid);
  for (const z of [-1.55, 1.55]) { const tk = new THREE.Mesh(new THREE.SphereGeometry(.75, 24, 16), mat(0x8d9096, { metalness: .8, roughness: .5 })); tk.scale.set(1.1, .9, .8); tk.position.set(-.6, 4.2, z); ascent.add(tk); }
  const face = new THREE.Mesh(new THREE.BoxGeometry(.25, 1.9, 2.0), grey()); face.position.set(1.15, 4.4, 0); ascent.add(face);
  for (const z of [-.6, .6]) {
    const w = new THREE.Mesh(new THREE.CircleGeometry(.36, 3), mat(0x0a1024, { metalness: 1, roughness: .08 })); w.position.set(1.285, 4.85, z); w.rotation.set(0, Math.PI / 2, 0); w.rotateZ(z > 0 ? -.5 : .5 + Math.PI / 3); ascent.add(w);
  }
  const hatch = new THREE.Mesh(new THREE.PlaneGeometry(.8, .8), dark()); hatch.position.set(1.285, 3.95, 0); hatch.rotation.y = Math.PI / 2; ascent.add(hatch);
  const tun = new THREE.Mesh(new THREE.CylinderGeometry(.45, .45, .5, 20), grey()); tun.position.set(.1, 5.75, 0); ascent.add(tun);
  ascent.add(strut(V(.9, 5.3, .7), V(1.25, 6.0, .9), .03, grey()));
  const rr = new THREE.Mesh(new THREE.SphereGeometry(.33, 20, 10, 0, 7, 0, 1.2), mat(0xd6d6da, { side: THREE.DoubleSide, metalness: .7 })); rr.position.set(1.3, 6.05, .9); rr.rotation.z = -1.2; ascent.add(rr);
  ascent.add(strut(V(-.9, 4.9, -1.0), V(-1.1, 6.2, -1.3), .03, grey()));
  const sb = new THREE.Mesh(new THREE.SphereGeometry(.4, 20, 10, 0, 7, 0, 1.1), mat(0xd6d6da, { side: THREE.DoubleSide, metalness: .7 })); sb.position.set(-1.1, 6.3, -1.3); sb.rotation.x = -.6; ascent.add(sb);
  for (const [x, z] of [[1.0, 1.75], [1.0, -1.75], [-1.7, 1.75], [-1.7, -1.75]]) {
    ascent.add(strut(V(x * .7, 4.6, z * .65), V(x, 4.75, z), .03, grey()));
    const q = new THREE.Mesh(new THREE.BoxGeometry(.22, .22, .22), dark()); q.position.set(x, 4.75, z); ascent.add(q);
    for (const d of [V(0, 1, 0), V(0, -1, 0), V(1, 0, 0), V(0, 0, Math.sign(z))]) { const n = new THREE.Mesh(new THREE.ConeGeometry(.07, .16, 10, 1, true), mat(0x7a7c82, { side: THREE.DoubleSide, metalness: .9 })); n.position.set(x, 4.75, z).addScaledVector(d, .19); n.quaternion.setFromUnitVectors(V(0, -1, 0), d); ascent.add(n); }
  }
  const flame = new THREE.Mesh(new THREE.ConeGeometry(.5, 2.2, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xffc27a, transparent: true, opacity: .0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  flame.rotation.x = Math.PI; flame.position.set(-.2, 2.5, 0); flame.userData.noPick = true; ascent.add(flame);

  const lrrr = part(root, parts, 'lrrr');
  const lp = V(5.2, 0, 5.4);
  const arr = new THREE.Mesh(new THREE.BoxGeometry(.5, .05, .5), mat(0xe8eef8, { metalness: 1, roughness: .12 })); arr.position.copy(lp).add(V(0, .34, 0)); arr.rotation.set(.5, .3, 0); lrrr.add(arr);
  const fr = new THREE.Mesh(new THREE.BoxGeometry(.56, .03, .56), grey()); fr.position.copy(arr.position).add(V(0, -.03, 0)); fr.rotation.copy(arr.rotation); lrrr.add(fr);
  lrrr.add(strut(lp.clone().add(V(-.2, 0, .2)), lp.clone().add(V(-.1, .3, .1)), .015, grey()), strut(lp.clone().add(V(.2, 0, .2)), lp.clone().add(V(.1, .3, .1)), .015, grey()));

  const seismo = part(root, parts, 'seismo');
  const sp = V(2.2, 0, 7.2);
  const base = new THREE.Mesh(new THREE.BoxGeometry(.7, .3, .7), mat(0xe6e6e9, { roughness: .7, metalness: .1 })); base.position.copy(sp).add(V(0, .2, 0)); seismo.add(base);
  for (const k of [-1, 1]) { const pn = new THREE.Mesh(new THREE.BoxGeometry(.9, .02, .6), mat(0xffffff, { map: solarTex(), metalness: .6, roughness: .3 })); pn.position.copy(sp).add(V(k * .75, .45, 0)); pn.rotation.z = k * .55; seismo.add(pn); }
  seismo.add(strut(sp.clone().add(V(0, .35, 0)), sp.clone().add(V(0, 1.1, 0)), .02, grey()));
  const flameRef = flame;
  return finish(root, parts, { descent: V(0, 2.4, 2.3), ascent: V(1.3, 4.9, 0), legs: V(3.3, .2, 3.3), lrrr: arr.position.clone(), seismo: base.position.clone().add(V(0, .3, 0)) },
    { center: V(0, 3.2, 0), radius: 19, minR: 7, maxR: 50, ground: true, ascent, flame: flameRef });
}

// ---------- Pioneer 10. Sizes from NSSDCA: 2.74 m dish, hexagonal bus with 71 cm sides, RTGs about 3 m out, 6.6 m magnetometer boom
export function makePioneer() {
  const root = new THREE.Group(), parts = {}, spin = new THREE.Group(); root.add(spin);
  const alu = () => mat(0xc4c7ce, { metalness: .85, roughness: .32 }), gold = () => mat(0xc9962e, { metalness: .95, roughness: .42, bumpMap: FOIL(), bumpScale: 1 });
  const dish = part(spin, parts, 'dish');
  const pts = []; for (let i = 0; i <= 24; i++) { const r = 1.37 * i / 24; pts.push(new THREE.Vector2(r, .46 * (r / 1.37) ** 2)); }
  const d = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), mat(0xeceef2, { metalness: .55, roughness: .35, side: THREE.DoubleSide })); dish.add(d);
  for (let i = 0; i < 3; i++) { const an = i * 2.094 + .5; dish.add(strut(V(Math.cos(an) * 1.2, .36, Math.sin(an) * 1.2), V(0, 1.2, 0), .015, alu())); }
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(.08, .1, .22, 16), alu()); feed.position.y = 1.25; dish.add(feed);

  const bus = part(spin, parts, 'bus');
  const hx = new THREE.Mesh(new THREE.CylinderGeometry(.71, .71, .36, 6), gold()); hx.position.y = -.2; bus.add(hx);
  const ex = new THREE.Mesh(new THREE.BoxGeometry(.7, .34, .6), gold()); ex.position.set(-.85, -.2, 0); bus.add(ex);
  bus.add(strut(V(0, -.38, 0), V(0, -1.1, 0), .02, alu()));

  const rtg = part(spin, parts, 'rtg');
  for (const an of [Math.PI / 3, -Math.PI / 3]) {
    const dir = V(Math.cos(an), 0, Math.sin(an)), end = dir.clone().multiplyScalar(3.0).setY(-.2), t = V(-dir.z, 0, dir.x);
    for (const k of [-1, 0, 1]) rtg.add(strut(dir.clone().multiplyScalar(.65).setY(-.2 + (k === 0 ? .14 : -.1)).addScaledVector(t, k * .16), end, .012, alu()));
    for (const k of [0, 1]) {
      const c = end.clone().addScaledVector(dir, .1 + k * .34), g = new THREE.Group(); g.position.copy(c); g.quaternion.setFromUnitVectors(V(0, 1, 0), dir);
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .3, 16), mat(0x3a3c44, { metalness: .7, roughness: .5 })));
      for (let f = 0; f < 6; f++) { const fin = new THREE.Mesh(new THREE.BoxGeometry(.012, .28, .2), mat(0x2a2b31, { metalness: .6 })); fin.rotation.y = f * Math.PI / 3; fin.position.set(Math.sin(f * Math.PI / 3) * .16, 0, Math.cos(f * Math.PI / 3) * .16); g.add(fin); }
      rtg.add(g);
    }
  }
  const mag = part(spin, parts, 'mag');
  const mend = V(-6.6, -.2, 0);
  mag.add(strut(V(-1.2, -.2, 0), mend, .028, alu()));
  for (let i = 1; i < 9; i++) mag.add(strut(V(-1.2 - i * .6, -.26, -.03), V(-1.2 - i * .6, -.14, .03), .008, alu()));
  const sens = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .42, 16), mat(0xd9dbe0, { metalness: .8 })); sens.position.copy(mend); sens.rotation.z = Math.PI / 2; mag.add(sens);

  const plaque = part(spin, parts, 'plaque');
  const pc = document.createElement('canvas'); pc.width = 256; pc.height = 170; const g = pc.getContext('2d');
  g.fillStyle = '#d2a94a'; g.fillRect(0, 0, 256, 170); g.strokeStyle = '#5b4313'; g.lineWidth = 1.4;
  for (let i = 0; i < 14; i++) { const an = i * .45; g.beginPath(); g.moveTo(70, 70); g.lineTo(70 + Math.cos(an) * (25 + (i * 37) % 40), 70 + Math.sin(an) * (25 + (i * 37) % 40)); g.stroke(); }
  for (let i = 0; i < 10; i++) { g.beginPath(); g.arc(22 + i * 23, 150, i === 0 ? 7 : 2 + (i === 5 || i === 6 ? 3 : 0), 0, 7); g.stroke(); }
  g.strokeRect(150, 25, 70, 100);
  const pt = new THREE.CanvasTexture(pc); pt.colorSpace = THREE.SRGBColorSpace;
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(.23, .15), mat(0xffffff, { map: pt, metalness: .9, roughness: .3, side: THREE.DoubleSide }));
  pl.position.set(.36, .52, .5); pl.rotation.set(-.35, .6, 0); plaque.add(pl);
  plaque.add(strut(V(.3, .1, .42), V(.36, .5, .5), .012, alu()));
  root.rotation.set(.5, 0, -1.25);
  return finish(root, parts, { dish: V(.9, .25, .6), bus: V(.3, -.3, .6), rtg: V(1.6, -.2, 2.75), mag: V(-6.6, -.2, 0), plaque: V(.36, .52, .5) },
    { center: V(0, 0, 0), radius: 13, minR: 3.5, maxR: 40, ground: false, spin });
}

// ---------- Surface stage: a patch of ground far from the planets where a machine is shown at human scale
export const STAGE = new THREE.Vector3(0, -4000, 0);
function h2(x, z) { const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453; return s - Math.floor(s); }
function vn(x, z) { const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi, u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  return (h2(xi, zi) * (1 - u) + h2(xi + 1, zi) * u) * (1 - v) + (h2(xi, zi + 1) * (1 - u) + h2(xi + 1, zi + 1) * u) * v; }
function fb(x, z) { let a = .5, s = 0; for (let i = 0; i < 5; i++) { s += a * vn(x, z); x = x * 2.1 + 3.7; z = z * 2.1 + 1.3; a *= .5; } return s; }

export function makeStage(scene, lite) {
  const S = { group: new THREE.Group(), kind: null, model: null }; S.group.position.copy(STAGE); S.group.visible = false; scene.add(S.group);
  const seg = lite ? 110 : 220, size = 260;
  const build = (kind) => {
    const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI / 2); const p = g.attributes.position, col = new Float32Array(p.count * 3);
    const craters = kind === 'moon' ? [[14, -9, 5], [-22, 16, 9], [30, 28, 13], [-12, -30, 7], [48, -38, 20], [-55, -10, 16], [9, 40, 6], [-36, 44, 11]] : [[-34, -26, 14], [44, 20, 18]];
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), d = Math.hypot(x, z), flat = THREE.MathUtils.smoothstep(d, 3.5, 16), scale = kind === 'moon' ? 1 : 1;
      let y = (fb(x * .035 + 5, z * .035) - .5) * 9 * flat * scale + (fb(x * .22, z * .22) - .5) * .5 * (.25 + flat) + (fb(x * 1.3, z * 1.3) - .5) * .07;
      if (kind === 'mars') y += Math.sin(x * .55 + fb(x * .05, z * .05) * 6) * .09 * flat; // wind ripples
      for (const [cx, cz, r] of craters) { const q = Math.hypot(x - cx, z - cz) / r; if (q < 1.5) y += (q < 1 ? -(1 - q * q) * r * .16 : 0) + Math.exp(-((q - 1) ** 2) * 14) * r * .05; }
      y += THREE.MathUtils.smoothstep(d, 70, 130) * (fb(x * .012, z * .012 + 9) - .35) * 26;
      p.setY(i, y);
      const n = .78 + .3 * fb(x * .4 + 11, z * .4) + .12 * (fb(x * 2.2, z * 2.2) - .5);
      col.set(kind === 'moon' ? [.4 * n, .395 * n, .385 * n] : [.66 * n, .34 * n, .2 * n], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, bumpMap: noiseTex(256, 128, 160, 21, 90), bumpScale: .5 }));
    m.receiveShadow = true;
    const grp = new THREE.Group(); grp.add(m);
    const rockG = new THREE.DodecahedronGeometry(1, 0), rockM = new THREE.MeshStandardMaterial({ color: kind === 'moon' ? 0x7d7c7a : 0x7a3f28, roughness: 1, flatShading: true });
    const n = lite ? 140 : 420, inst = new THREE.InstancedMesh(rockG, rockM, n), o = new THREE.Object3D(); let s = 17; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const ray = new THREE.Raycaster();
    for (let i = 0; i < n; i++) {
      const a = rnd() * 6.283, d = 2.6 + rnd() * rnd() * 70, x = Math.cos(a) * d, z = Math.sin(a) * d, sc = (.04 + rnd() * rnd() * .5) * (kind === 'moon' ? .8 : 1);
      ray.set(new THREE.Vector3(x, 80, z), new THREE.Vector3(0, -1, 0)); const hit = ray.intersectObject(m)[0];
      o.position.set(x, (hit ? hit.point.y : 0) + sc * .25, z); o.scale.set(sc * (1 + rnd()), sc * (.5 + rnd() * .6), sc * (1 + rnd())); o.rotation.set(rnd() * 6, rnd() * 6, rnd() * 6); o.updateMatrix(); inst.setMatrixAt(i, o.matrix);
    }
    inst.castShadow = true; inst.receiveShadow = true; grp.add(inst);
    return grp;
  };
  const grounds = {};
  S.sky = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 24), new THREE.ShaderMaterial({
    uniforms: { dust: { value: 0 }, sun: { value: new THREE.Vector3() } },
    vertexShader: `varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float dust;uniform vec3 sun;varying vec3 vD;void main(){float h=clamp(vD.y,0.,1.);
      vec3 hor=mix(vec3(.80,.56,.38),vec3(.22,.13,.08),dust),zen=mix(vec3(.36,.27,.24),vec3(.12,.07,.045),dust);
      vec3 c=mix(hor,zen,pow(h,.55));float s=max(dot(vD,sun),0.);c+=mix(vec3(.55,.62,.8),vec3(.25,.12,.05),dust)*(pow(s,40.)*.9+pow(s,6.)*.18)*(1.-dust*.8);
      if(vD.y<0.)c=hor*.9;gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`, side: THREE.BackSide, depthWrite: false, fog: false
  }));
  S.sky.renderOrder = -1; S.group.add(S.sky);
  S.dir = new THREE.Vector3(-.55, .62, .45).normalize(); S.sky.material.uniforms.sun.value.copy(S.dir);
  S.light = new THREE.DirectionalLight(0xfff0e0, 3); S.light.position.copy(S.dir).multiplyScalar(60); S.light.castShadow = !lite;
  S.light.shadow.mapSize.set(2048, 2048); const sc = S.light.shadow.camera; sc.left = sc.bottom = -14; sc.right = sc.top = 14; sc.near = 1; sc.far = 140; S.light.shadow.bias = -.0006; S.light.shadow.normalBias = .03;
  S.group.add(S.light, S.light.target);
  S.hemi = new THREE.HemisphereLight(0xffd9b8, 0x5a3320, .5); S.group.add(S.hemi);
  const dn = lite ? 300 : 1200, dp = new Float32Array(dn * 3); for (let i = 0; i < dn; i++) dp.set([(Math.random() - .5) * 40, Math.random() * 9, (Math.random() - .5) * 40], i * 3);
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  S.dustPts = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xd9a070, size: .09, transparent: true, opacity: 0, depthWrite: false })); S.group.add(S.dustPts);
  S.dust = 0; S.dustTarget = 0;

  S.set = (kind, model) => {
    if (S.model) S.group.remove(S.model.group);
    S.model = model; S.group.add(model.group);
    for (const k in grounds) grounds[k].visible = false;
    if (kind !== 'space') { if (!grounds[kind]) { grounds[kind] = build(kind); S.group.add(grounds[kind]); } grounds[kind].visible = true; }
    S.kind = kind; S.sky.visible = kind === 'mars';
    S.light.intensity = kind === 'mars' ? 2.6 : kind === 'moon' ? 3.4 : 2.6;
    S.light.color.set(kind === 'mars' ? 0xffe2c4 : 0xffffff);
    S.hemi.intensity = kind === 'mars' ? .55 : kind === 'moon' ? .07 : .06;
    S.hemi.color.set(kind === 'mars' ? 0xffcfa6 : 0x9fb0ff); S.hemi.groundColor.set(kind === 'mars' ? 0x6b3a22 : 0x30303a);
    const r = model.radius; sc.left = sc.bottom = -r * .8; sc.right = sc.top = r * .8; sc.updateProjectionMatrix();
  };
  S.update = (dt, scene) => {
    S.dust += (S.dustTarget - S.dust) * (1 - Math.exp(-dt * .7));
    S.sky.material.uniforms.dust.value = S.dust; S.dustPts.material.opacity = S.dust * .55;
    if (S.dust > .01) { const a = dg.attributes.position; for (let i = 0; i < dn; i++) { let x = a.getX(i) + dt * (3 + (i % 5)); if (x > 20) x -= 40; a.setX(i, x); } a.needsUpdate = true; }
    if (S.kind === 'mars') S.light.intensity = 2.6 * (1 - S.dust * .9);
  };
  return S;
}
