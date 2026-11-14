// Rendering and motion helpers built on postprocessing, three.quarks, gsap and lottie-web.
import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, VignetteEffect, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { BatchedRenderer, ParticleSystem, ConeEmitter, SphereEmitter, ConstantValue, IntervalValue, ColorOverLife, SizeOverLife, Gradient, PiecewiseBezier, Bezier, ConstantColor, RenderMode } from 'three.quarks';
import { GLOW } from './world.js';

export const TUNE = { bloom: .85, threshold: 1, radius: .72, vignette: .42, flame: 1, smoke: 1 };

// HDR pipeline: bloom on anything brighter than white (engines, Sun, city lights), then filmic tone mapping.
export function makePost(renderer, scene, camera) {
  renderer.toneMapping = THREE.NoToneMapping;
  const composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType, multisampling: Math.min(4, renderer.capabilities.maxSamples || 0) });
  const bloom = new BloomEffect({ mipmapBlur: true, luminanceThreshold: TUNE.threshold, luminanceSmoothing: .25, intensity: TUNE.bloom, radius: TUNE.radius });
  const vignette = new VignetteEffect({ offset: .32, darkness: TUNE.vignette });
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, bloom, vignette, new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC })));
  const sync = () => { bloom.intensity = TUNE.bloom; bloom.luminanceMaterial.threshold = TUNE.threshold; bloom.mipmapBlurPass.radius = TUNE.radius; vignette.darkness = TUNE.vignette; };
  return { composer, bloom, vignette, sync, render: dt => composer.render(dt), setSize: (w, h) => composer.setSize(w, h, false) };
}

function puffTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  for (let i = 0; i < 26; i++) { const a = Math.random() * 6.283, d = Math.random() * 30, r = 18 + Math.random() * 24, g = x.createRadialGradient(64 + Math.cos(a) * d, 64 + Math.sin(a) * d, 0, 64 + Math.cos(a) * d, 64 + Math.sin(a) * d, r);
    g.addColorStop(0, 'rgba(255,255,255,.2)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const V3 = THREE.Vector3, V4 = THREE.Vector4, line = (a, b) => new PiecewiseBezier([[new Bezier(a, a + (b - a) / 3, a + (b - a) * 2 / 3, b), 0]]);

// Rocket exhaust: one flame and one smoke emitter per rocket, particles left behind in world space.
export function makeExhaust(scene, lite) {
  const batch = new BatchedRenderer(); batch.frustumCulled = false; scene.add(batch);
  const flameMat = new THREE.MeshBasicMaterial({ map: GLOW, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const smokeMat = new THREE.MeshBasicMaterial({ map: puffTexture(), transparent: true, depthWrite: false });
  const jets = {}, zAxis = new V3(0, 0, 1);
  const sys = (flame, wide) => {
    const s = new ParticleSystem({
      duration: 1, looping: true, worldSpace: true, renderMode: RenderMode.BillBoard,
      shape: wide ? new SphereEmitter({ radius: .004, thickness: 1 }) : new ConeEmitter({ radius: flame ? .0012 : .003, angle: flame ? .1 : .3, thickness: 1 }),
      startLife: flame ? new IntervalValue(.22, .5) : wide ? new IntervalValue(.9, 1.8) : new IntervalValue(1.2, 2.6), startSpeed: flame ? new IntervalValue(.1, .2) : wide ? new IntervalValue(.012, .04) : new IntervalValue(.03, .1),
      startSize: flame ? new IntervalValue(.012, .022) : new IntervalValue(.012, .024), startRotation: new IntervalValue(0, 6.283),
      startColor: new ConstantColor(new V4(1, 1, 1, 1)), emissionOverTime: new ConstantValue(0), material: flame ? flameMat : smokeMat,
      behaviors: [
        new ColorOverLife(flame
          ? new Gradient([[new V3(3.2, 2.6, 1.9), 0], [new V3(2.4, 1.1, .3), .35], [new V3(.9, .25, .06), 1]], [[1, 0], [.8, .5], [0, 1]])
          : wide ? new Gradient([[new V3(.8, .78, .76), 0], [new V3(.55, .55, .57), 1]], [[0, 0], [.3, .15], [.18, .6], [0, 1]])
          : new Gradient([[new V3(1.1, .8, .55), 0], [new V3(.62, .6, .6), .1], [new V3(.4, .4, .43), 1]], [[0, 0], [.5, .1], [.3, .55], [0, 1]])),
        new SizeOverLife(flame ? line(1, .25) : wide ? line(.8, 2.6) : line(.7, 4.2))
      ]
    });
    scene.add(s.emitter); batch.addSystem(s); return s;
  };
  const jet = k => jets[k] || (jets[k] = { flame: sys(true), smoke: sys(false), pad: sys(false, true), used: false });
  const E = { batch, jets };
  // call every frame while the engine burns; `ground` adds the cloud that rolls out over the pad
  E.fire = (k, pos, dir, power, ground) => {
    const j = jet(k); j.used = true;
    for (const s of [j.flame, j.smoke, j.pad]) { s.emitter.position.copy(pos); s.emitter.quaternion.setFromUnitVectors(zAxis, dir); }
    j.flame.emissionOverTime.value = (lite ? 60 : 130) * power * TUNE.flame;
    j.smoke.emissionOverTime.value = (lite ? 22 : 55) * power * TUNE.smoke;
    j.pad.emissionOverTime.value = ground ? (lite ? 14 : 34) * power * TUNE.smoke : 0;
  };
  E.update = dt => { for (const k in jets) { const j = jets[k]; if (!j.used) j.flame.emissionOverTime.value = j.smoke.emissionOverTime.value = j.pad.emissionOverTime.value = 0; j.used = false; } batch.update(dt); };
  E.clear = () => { for (const k in jets) for (const s of [jets[k].flame, jets[k].smoke, jets[k].pad]) { s.restart(); s.emissionOverTime.value = 0; } };
  return E;
}

// Lottie document drawn in code: a stamp ring that inks itself in and a star that pops.
const st = v => ({ a: 0, k: v }), ease = { i: { x: [.2], y: [1] }, o: { x: [.5], y: [0] } };
const tr = { ty: 'tr', p: st([0, 0]), a: st([0, 0]), s: st([100, 100]), r: st(0), o: st(100), sk: st(0), sa: st(0) };
function stampDoc(hex) {
  const c = new THREE.Color(hex), rgb = [c.r, c.g, c.b, 1];
  const layer = (ind, shapes, ks = {}) => ({ ddd: 0, ind, ty: 4, nm: 'l' + ind, sr: 1, ao: 0, ip: 0, op: 60, st: 0, bm: 0, shapes,
    ks: { o: st(100), r: st(0), p: st([60, 60, 0]), a: st([0, 0, 0]), s: st([100, 100, 100]), ...ks } });
  const ring = (d, w, t0, t1, dash) => ({ ty: 'gr', it: [{ ty: 'el', d: 1, p: st([0, 0]), s: st([d, d]) },
    { ty: 'tm', m: 1, s: st(0), o: st(-90), e: { a: 1, k: [{ t: t0, s: [0], ...ease }, { t: t1, s: [100] }] } },
    { ty: 'st', c: st(rgb), o: st(100), w: st(w), lc: 2, lj: 2, ...(dash ? { d: [{ n: 'd', nm: 'd', v: st(3) }, { n: 'g', nm: 'g', v: st(5) }] } : {}) }, tr] });
  const star = { ty: 'gr', it: [{ ty: 'sr', sy: 1, d: 1, pt: st(5), p: st([0, 0]), r: st(0), ir: st(10), is: st(0), or: st(24), os: st(0) }, { ty: 'fl', c: st(rgb), o: st(100), r: 1 }, tr] };
  const pop = { a: 1, k: [{ t: 12, s: [0, 0, 100], i: { x: [.3, .3, .3], y: [1.7, 1.7, 1] }, o: { x: [.4, .4, .4], y: [0, 0, 0] } }, { t: 30, s: [100, 100, 100] }] };
  const turn = { a: 1, k: [{ t: 12, s: [-50], ...ease }, { t: 32, s: [0] }] };
  return { v: '5.7.4', fr: 30, ip: 0, op: 60, w: 120, h: 120, nm: 'stamp', ddd: 0, assets: [],
    layers: [layer(1, [star], { s: pop, r: turn }), layer(2, [ring(84, 2, 6, 24, true)]), layer(3, [ring(104, 5, 0, 20)])] };
}
let lottieP = null;
export function playStamp(el, color) {
  lottieP = lottieP || import('lottie-web/build/player/lottie_light');
  lottieP.then(m => { if (!el.isConnected) return; el.innerHTML = ''; const a = (m.default || m).loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: true, animationData: stampDoc(color) }); a.addEventListener('complete', () => { }); }).catch(() => { });
}
