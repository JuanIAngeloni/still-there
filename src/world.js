import * as THREE from 'three';

export const SUN = new THREE.Vector3(-0.85, 0.22, 0.48).normalize();
const D2R = Math.PI / 180;

// lat/lon (east positive) to a point on a three.js sphere with an equirectangular map centred on lon 0
export function latLon(lat, lon, r) {
  const th = (90 - lat) * D2R, ph = (lon + 180) * D2R;
  return new THREE.Vector3(-r * Math.cos(ph) * Math.sin(th), r * Math.cos(th), r * Math.sin(ph) * Math.sin(th));
}

const NOISE = `
float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float vnoise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vnoise(p);p=p*2.03+vec3(1.7,9.2,4.1);a*=.5;}return s;}
`;

function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.18, 'rgba(255,255,255,.85)');
  gr.addColorStop(.45, 'rgba(255,255,255,.22)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
export const GLOW = glowTexture();

export function glowSprite(color, size) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  s.scale.setScalar(size); return s;
}

function bandTexture(stops, seed) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
  stops.forEach(([p, col]) => gr.addColorStop(p, col)); g.fillStyle = gr; g.fillRect(0, 0, 512, 256);
  let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 260; i++) {
    g.fillStyle = `rgba(${rnd() > .5 ? '255,240,220' : '70,40,20'},${rnd() * .09})`;
    g.beginPath(); g.ellipse(rnd() * 512, rnd() * 256, 20 + rnd() * 90, 1 + rnd() * 5, 0, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function atmosphere(r, color, power, strength) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), new THREE.ShaderMaterial({
    uniforms: { sun: { value: SUN }, col: { value: new THREE.Color(color) }, pw: { value: power }, st: { value: strength } },
    vertexShader: `varying vec3 vN;varying vec3 vW;varying vec3 vV;void main(){vN=normalize(normalMatrix*normal);vW=normalize(mat3(modelMatrix)*normal);
      vec4 mv=modelViewMatrix*vec4(position,1.);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `uniform vec3 sun,col;uniform float pw,st;varying vec3 vN;varying vec3 vW;varying vec3 vV;
      void main(){float f=pow(clamp(1.-abs(dot(normalize(vN),normalize(vV))),0.,1.),pw);
      float lit=smoothstep(-.35,.45,dot(normalize(vW),sun));gl_FragColor=vec4(col*f*st*(.12+lit),f*st*(.12+lit));}`,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
  }));
}

export function makeWorld(scene, renderer, lite) {
  const L = new THREE.TextureLoader(), aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const tex = (u, srgb = true) => { const t = L.load(u); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso; return t; };
  const W = { bodies: {}, group: new THREE.Group() }; scene.add(W.group);

  // stars follow the camera so every scene shares the same sky
  const stars = new THREE.Group(); scene.add(stars); W.stars = stars;
  [[lite ? 2500 : 7000, 1.1, .75], [lite ? 500 : 1400, 2.1, 1]].forEach(([n, size, op], k) => {
    const p = new Float32Array(n * 3), c = new Float32Array(n * 3), v = new THREE.Vector3(), col = new THREE.Color();
    for (let i = 0; i < n; i++) {
      v.randomDirection().multiplyScalar(900); p.set([v.x, v.y, v.z], i * 3);
      const b = .35 + Math.random() * .65; col.setHSL(Math.random() < .5 ? .6 : .08, .35 * Math.random(), .55 + .4 * Math.random());
      c.set([col.r * b, col.g * b, col.b * b], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    stars.add(new THREE.Points(g, new THREE.PointsMaterial({ size, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: op, depthWrite: false, fog: false })));
  });
  const sun = glowSprite(0xfff1d6, 150); sun.position.copy(SUN).multiplyScalar(800); sun.material.fog = false; stars.add(sun);
  const sun2 = glowSprite(0xffffff, 40); sun2.position.copy(sun.position); sun2.material.fog = false; stars.add(sun2); W.farSun = [sun, sun2];

  W.sunLight = new THREE.DirectionalLight(0xfff4e6, 3.1); W.sunLight.position.copy(SUN).multiplyScalar(50); scene.add(W.sunLight);
  W.fill = new THREE.AmbientLight(0x8090c0, 0.035); scene.add(W.fill);

  // Earth
  const eU = { day: { value: tex('tex/earth_day.jpg') }, night: { value: tex('tex/earth_night.jpg') }, sun: { value: SUN }, t: { value: 0 }, clouds: { value: lite ? 0 : 1 } };
  const earthMat = new THREE.ShaderMaterial({
    uniforms: eU,
    vertexShader: `varying vec2 vUv;varying vec3 vN;varying vec3 vP;varying vec3 vO;void main(){vUv=uv;vO=position;vN=normalize(mat3(modelMatrix)*normal);
      vec4 w=modelMatrix*vec4(position,1.);vP=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader: `uniform sampler2D day,night;uniform vec3 sun;uniform float t,clouds;varying vec2 vUv;varying vec3 vN;varying vec3 vP;varying vec3 vO;${NOISE}
      void main(){vec3 n=normalize(vN);float ndl=dot(n,sun);vec3 v=normalize(cameraPosition-vP);
      vec3 d=texture2D(day,vUv).rgb;float lit=smoothstep(-.08,.35,ndl);
      float oc=smoothstep(.02,.12,d.b-d.r);vec3 h=normalize(v+sun);
      float c=0.;if(clouds>.5){vec3 q=vO*4.2+vec3(t*.01,0.,t*.005);float w=fbm(q+fbm(q*1.7+3.)*1.3)*.75+fbm(q*3.3)*.3;
        c=smoothstep(.5,.84,w)*.85;}
      vec3 col=d*(lit*1.35+.012);col+=vec3(1.,.93,.8)*pow(max(dot(n,h),0.),70.)*oc*.75*lit*(1.-c);
      col=mix(col,vec3(1.)*(lit*1.25+.015),c*.92);
      col+=texture2D(night,vUv).rgb*vec3(1.,.82,.55)*smoothstep(.12,-.22,ndl)*1.6*(1.-c*.8);
      float fr=pow(1.-max(dot(n,v),0.),3.2);col+=vec3(.25,.5,1.)*fr*(.08+lit)*.85;
      float tw=smoothstep(-.25,.02,ndl)*smoothstep(.3,.02,ndl);col+=vec3(1.,.35,.12)*tw*fr*.5;
      gl_FragColor=vec4(col,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`
  });
  const earthTilt = new THREE.Group(); earthTilt.rotation.z = -23.4 * D2R; W.group.add(earthTilt);
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), earthMat); earthTilt.add(earth);
  earthTilt.add(atmosphere(1.035, 0x5aa2ff, 2.6, 1.5));
  W.bodies.earth = { obj: earth, r: 1, uniforms: eU };

  // Moon
  const moon = new THREE.Mesh(new THREE.SphereGeometry(.27, 96, 64), new THREE.MeshStandardMaterial({
    map: tex('tex/moon.jpg'), bumpMap: tex('tex/moon_bump.jpg', false), bumpScale: lite ? 0 : 2.2, roughness: 1, metalness: 0
  }));
  W.group.add(moon); W.bodies.moon = { obj: moon, r: .27, a: 2.2, dist: 4.6 };

  // Mars
  const marsTilt = new THREE.Group(); marsTilt.position.set(16, .8, -7); marsTilt.rotation.z = -25.2 * D2R; W.group.add(marsTilt);
  const mars = new THREE.Mesh(new THREE.SphereGeometry(.53, 96, 64), new THREE.MeshStandardMaterial({ map: tex('tex/mars.jpg'), roughness: 1, metalness: 0 }));
  marsTilt.add(mars); marsTilt.add(atmosphere(.548, 0xffa070, 3.2, .7));
  W.bodies.mars = { obj: mars, r: .53 };

  // context planets (drawn, not photographed)
  const ctx = (name, r, pos, stops, seed) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), new THREE.MeshStandardMaterial({ map: bandTexture(stops, seed), roughness: 1 }));
    m.position.copy(pos); W.group.add(m); W.bodies[name] = { obj: m, r, drawn: true }; return m;
  };
  ctx('jupiter', 2.2, new THREE.Vector3(48, -3, -34), [[0, '#8a6f58'], [.18, '#d9c2a0'], [.3, '#b98a62'], [.42, '#ead9bd'], [.5, '#c79a6e'], [.6, '#efe2c8'], [.72, '#b5855c'], [.85, '#d8c3a3'], [1, '#86705c']], 7);
  const sat = ctx('saturn', 1.8, new THREE.Vector3(96, 6, -78), [[0, '#a8946c'], [.3, '#e3d3a6'], [.5, '#d2bd8a'], [.7, '#e8dab0'], [1, '#a8946c']], 11);
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.3, 3.9, 96), new THREE.MeshBasicMaterial({ color: 0xcdbb8e, side: THREE.DoubleSide, transparent: true, opacity: .45 }));
  ring.rotation.x = Math.PI / 2 - .45; sat.add(ring);
  ctx('venus', .95, new THREE.Vector3(-34, -6, 30), [[0, '#d9c7a0'], [.5, '#f1e4c2'], [1, '#d3bf95']], 5);

  // deep-space anchors (illustrative positions)
  const anchor = (name, pos, rock) => {
    const o = new THREE.Object3D(); o.position.copy(pos); W.group.add(o);
    if (rock) { const m = new THREE.Mesh(new THREE.DodecahedronGeometry(rock, 1), new THREE.MeshStandardMaterial({ color: 0x8d857c, roughness: 1, flatShading: true })); m.scale.set(1.5, .8, .9); o.add(m); }
    W.bodies[name] = { obj: o, r: rock || .01, anchor: true }; return o;
  };
  anchor('eros', new THREE.Vector3(7, 2.6, 6.5), .12);
  anchor('ceres', new THREE.Vector3(27, -2.5, -4), .16);
  anchor('kepler', new THREE.Vector3(-3.6, .6, 3.4), 0);
  anchor('beyond', new THREE.Vector3(74, 9, -56), 0);
  W.flyby = new THREE.Vector3(48, -.2, -30.6);

  W.spin = 1;
  W.update = (dt, time) => {
    eU.t.value = time;
    earth.rotation.y += dt * .03 * W.spin;
    mars.rotation.y += dt * .025 * W.spin;
    W.bodies.jupiter.obj.rotation.y += dt * .05;
    const b = W.bodies.moon; b.a += dt * .012 * W.spin;
    moon.position.set(Math.cos(b.a) * b.dist, .25 * Math.sin(b.a), Math.sin(b.a) * b.dist);
    moon.rotation.y = Math.PI - b.a;
  };
  W.update(0, 0);
  return W;
}
