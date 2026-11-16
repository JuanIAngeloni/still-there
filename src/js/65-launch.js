/* ---------- lanzamiento en 3D: el cohete, sus etapas y qué pasó con cada una ----------
   Es el primer capítulo de la misión. Cada paso espera a que el lector toque «Siguiente»; se puede girar
   arrastrando y acercar con la rueda en cualquier momento.
   - Los modelos de los cohetes los arma buildRocket3D (62-rockets.js), en metros, con cada pieza separable.
   - Los pasos, los tiempos reales (T+) y el destino de cada pieza vienen de LAUNCH_SEQ (66-stages-data.js).
   - La subida es ilustrativa: la altura y la inclinación siguen una curva genérica, no la telemetría del vuelo.
   Unidades: metros. El cohete queda en el origen y el suelo y la Tierra se mueven debajo. */
var LX={m:null,R:null,seq:null,T:[],k:-1,tau:0,az:0.75,el:0.1,zoom:1,dist:120,tgt:new THREE.Vector3(),ctr:new THREE.Vector3(),rad:20,
  debris:[],flames:[],dropped:{},pend:null,ready:false};
var LX_R=6371000;
var LX_STR={
  es:{chap:'Lanzamiento',fates:'Qué pasó con cada parte',rocket:'El cohete',tall:'{h} m de alto',since:'Primer vuelo: {y}',
      illus:'Animación ilustrativa. Los tiempos T+ son los reales; la subida y los tamaños están ajustados para que se vea.',
      drag:'Arrastrá para girar. Rueda para acercar.',later:'Más tarde',tplus:'T+',alt:'Altura',spd:'Velocidad',km:'km',kmh:'km/h',onpad:'En la plataforma',
      where:{ocean:'cayó al mar',burned:'se quemó al volver a entrar en el aire',earthOrbit:'quedó en órbita de la Tierra',sunOrbit:'quedó en órbita del Sol',
        moonImpact:'chocó contra la Luna',onMoon:'quedó en la Luna',moonOrbit:'quedó en órbita de la Luna',marsImpact:'chocó contra Marte',onMars:'quedó en Marte',
        marsAtmosphere:'se quemó al entrar en Marte',unknown:'no se sabe dónde terminó'},
      left:'También quedaron por ahí',
      sky:'El Sol, la Luna y los planetas están donde estaban en ese minuto y a su tamaño real (JPL Horizons).',mkm:'millones de km',
      body:{earth:'Tierra',sun:'Sol',moon:'Luna',mercury:'Mercurio',venus:'Venus',mars:'Marte',jupiter:'Júpiter',saturn:'Saturno',uranus:'Urano',neptune:'Neptuno'}},
  en:{chap:'Launch',fates:'What happened to each part',rocket:'The rocket',tall:'{h} m tall',since:'First flight: {y}',
      illus:'Illustrative animation. The T+ times are real. The climb and the sizes are adjusted so you can see everything.',
      drag:'Drag to turn. Scroll to zoom.',later:'Later',tplus:'T+',alt:'Altitude',spd:'Speed',km:'km',kmh:'km/h',onpad:'On the pad',
      where:{ocean:'fell into the sea',burned:'burned up coming back into the air',earthOrbit:'stayed in orbit around Earth',sunOrbit:'stayed in orbit around the Sun',
        moonImpact:'crashed into the Moon',onMoon:'stayed on the Moon',moonOrbit:'stayed in orbit around the Moon',marsImpact:'crashed into Mars',onMars:'stayed on Mars',
        marsAtmosphere:'burned up entering Mars',unknown:'nobody knows where it ended up'},
      left:'Also left out there',
      sky:'The Sun, the Moon and the planets are where they were at that minute, at their real size (JPL Horizons).',mkm:'million km',
      body:{earth:'Earth',sun:'Sun',moon:'Moon',mercury:'Mercury',venus:'Venus',mars:'Mars',jupiter:'Jupiter',saturn:'Saturn',uranus:'Uranus',neptune:'Neptune'}}};
function lxt(k){return LX_STR[lang][k];}
var LX_WCOL={ocean:'#6ea8ff',burned:'#ff9d6e',earthOrbit:'#9fe0b2',sunOrbit:'#ffcf6a',moonImpact:'#d6d6d0',onMoon:'#d6d6d0',moonOrbit:'#d6d6d0',marsImpact:'#e0895a',onMars:'#e0895a',marsAtmosphere:'#e0895a',unknown:'#a7b0bd'};

(function(){var st=document.createElement('style');st.textContent=
'.lx-card{position:absolute;left:max(16px,env(safe-area-inset-left,0px));bottom:76px;width:min(380px,calc(100% - 32px));max-height:calc(100% - 250px);overflow:auto;'+
'background:rgba(5,7,11,.82);border:1px solid var(--line);border-radius:12px;padding:14px 16px;display:grid;gap:8px;backdrop-filter:blur(6px)}.lx-card[hidden]{display:none}'+
'.lx-card h3{margin:0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fg-dim);font-weight:500}'+
'.lx-card .lx-rk{margin:0;font-size:21px;font-weight:600;letter-spacing:-.01em;line-height:1.15}.lx-card p{margin:0;font-size:13.5px;line-height:1.45}.lx-card .lx-txt{font-size:15px}.lx-card .lx-rkn{font-weight:600;font-size:15px}.lx-card .lx-step{color:var(--accent)}'+
'.lx-card ul,.lx-left{list-style:none;margin:0;padding:0;display:grid;gap:8px}.lx-card li,.lx-left li{display:grid;gap:2px;font-size:13.5px;line-height:1.4;padding-left:14px;position:relative}'+
'.lx-card li::before,.lx-left li::before{content:"";position:absolute;left:0;top:7px;width:7px;height:7px;border-radius:50%;background:var(--wc,#a7b0bd)}'+
'.lx-card li b,.lx-left li b{font-weight:600}.lx-card li.is-new b{color:var(--accent)}.lx-card li em,.lx-left li em{font-style:normal;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-dim)}'+
'.lx-src{font-size:11.5px;color:var(--fg-dim);text-decoration:underline;text-underline-offset:2px;justify-self:start}.lx-src:hover{color:var(--fg)}'+
'.lx-sky{position:absolute;left:0;top:0;font-size:11px;color:var(--fg);white-space:nowrap;text-shadow:0 1px 5px #000;will-change:transform;line-height:1.25}'+
'.lx-sky i{position:absolute;left:-5px;top:-5px;width:8px;height:8px;border:1px solid var(--accent);border-radius:50%}.lx-sky span{position:absolute;left:9px;top:-8px}.lx-sky em{font-style:normal;opacity:.7;margin-left:5px}.lx-sky.edge i{display:none}.lx-sky.edge span{left:0;transform:translate(-50%,0);background:rgba(5,7,11,.6);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:2px 8px}.lx-sky u{text-decoration:none;display:none;margin-right:5px;color:var(--accent)}.lx-sky.edge u{display:inline-block}'+
'.lx-labels{position:absolute;inset:0;pointer-events:none!important}.lx-lab{position:absolute;left:0;top:0;font-size:12px;color:var(--fg);white-space:nowrap;text-shadow:0 1px 6px #000;'+
'background:rgba(5,7,11,.6);border-radius:4px;padding:1px 6px;will-change:transform}.lx-lab b{font-weight:600;color:var(--accent)}'+
'.jr-cap b{font-weight:600;color:var(--accent);margin-right:6px}'+
'@media (max-width:640px){.lx-card{max-height:34%;bottom:64px}}';
document.head.appendChild(st);})();
var lxCard=add(jr,'section','lx-card');lxCard.hidden=true;jr.insertBefore(lxCard,JE.card);
var lxLabs=add(jr,'div','lx-labels');jr.insertBefore(lxLabs,JE.card);

function lxKey(m){var q=typeof LAUNCH_SEQ!=='undefined'&&LAUNCH_SEQ&&LAUNCH_SEQ[m.id];var k=(q&&q.rocket)||(typeof ROCKET_OF!=='undefined'&&ROCKET_OF[m.id])||null;return k;}
function lxOk(m){return typeof buildRocket3D==='function'&&typeof LAUNCH_SEQ!=='undefined'&&!!LAUNCH_SEQ&&!!LAUNCH_SEQ[m.id]&&!!LAUNCH_SEQ[m.id].steps&&LAUNCH_SEQ[m.id].steps.length>1&&!!lxKey(m);}
function lxSegs(m){if(!lxOk(m))return [];var L=jdOf(m.launch);
  return LAUNCH_SEQ[m.id].steps.map(function(st,k){return {id:'lanzamiento',launch:true,k:k,j0:L,j1:L,dur:k===0?4:8,map:'lin',shot:{k:'launch'}};});}
function lxTitle(s){var st=LAUNCH_SEQ[JR.m.id].steps[s.k];return st&&st.title?st.title[lang]:lxt('chap');}
/* tiempos de cada paso: los reales cuando están; los que faltan se reparten entre los vecinos */
function lxTimes(steps){var T=steps.map(function(s){return typeof s.t==='number'?s.t:null;}),n=T.length,i,j;
  if(T[0]===null)T[0]=Math.min(-5,(T[1]!==null&&T[1]<0)?T[1]-5:-5);
  for(i=1;i<n;i++){if(T[i]!==null)continue;for(j=i+1;j<n&&T[j]===null;j++);
    if(j<n){var a=T[i-1],b=T[j];for(var q=i;q<j;q++)T[q]=a+(b-a)*(q-i+1)/(j-i+1);}else{for(q=i;q<n;q++)T[q]=T[q-1]+90;}}
  for(i=1;i<n;i++)if(T[i]<=T[i-1])T[i]=T[i-1]+1;
  return T;}
/* curva ilustrativa de la subida: altura (m), inclinación (rad) y giro de la Tierra bajo el cohete (rad) */
function lxSmooth(x){x=clamp(x,0,1);return x*x*(3-2*x);}
/* altura: sube a una órbita baja (~200 km) y se queda ahí hasta el encendido que saca a la nave de la Tierra (el paso anterior
   a la separación). Desde ahí se usa la distancia real de JPL Horizons si la nave está en sus tablas; si no, una parábola de escape. */
function lxEscD(t){var ti=LX.tInj;if(ti==null||t<=ti)return 0;
  /* ecuación de Barker: r = rp·(1+D²), D³/3 + D = √(μ/2rp³)·Δt, anomalía verdadera = 2·atan(D) */
  var rp=LX_R+2e5,M=Math.sqrt(3.986e14/(2*rp*rp*rp))*(t-ti),z=Math.pow(1.5*M+Math.sqrt(2.25*M*M+1),1/3);return z-1/z;}
var _lxP=new THREE.Vector3();
function lxReal(tr,t){return tr.at(jdOf(LX.m.launch)+t/86400,_lxP).length()*UNIT_KM*1000-LX_R;}
function lxAlt(t){if(t<=0)return 0;var h=200000*(1-Math.exp(-Math.pow(t/270,2))),ti=LX.tInj;
  if(ti!=null&&t>ti){
    var tr=LX.dep||(LX.dep=(typeof hzTrack==='function'&&LX.m&&hzTrack(LX.m.id+'_dep'))||null),D=lxEscD(t),hp=(LX_R+h)*(1+D*D)-LX_R;
    if(tr){var t0=(tr.j0-jdOf(LX.m.launch))*86400;
      if(t>=t0)h=Math.max(h,lxReal(tr,t));
      else{var h0=Math.max(h,lxReal(tr,t0));h=h*Math.pow(h0/h,lxSmooth((t-ti)/(t0-ti)));}
      LX.realH=true;
    }else{h=hp;LX.realH=false;}
  }
  return h;}
/* distancia recorrida sobre el suelo: casi nada al principio (el cohete sube derecho) y cada vez más rápido, hasta la velocidad de órbita */
function lxDown(t){if(t<=12)return 0;if(t<264)return 4.0e5*Math.pow((t-12)/252,3.2);
  var v0=4.0e5*3.2/252,x=Math.min(t-264,300);return 4.0e5+v0*x+(7500-v0)*x*x/600+7500*Math.max(0,t-564);}
/* inclinación: el cohete apunta hacia donde se mueve (giro por gravedad). Sale de la subida y del avance sobre el suelo,
   así la nariz, el recorrido y la estela de humo quedan sobre la misma línea. */
function lxPitch(t){if(t<=12)return 0;var e=0.5,up=lxAlt(t+e)-lxAlt(t-e),fw=(lxTurn(t+e)-lxTurn(t-e))*(LX_R+lxAlt(t));
  return Math.atan2(Math.max(fw,0),Math.max(up,0))||0;}
/* al alejarse, la nave deja de dar vueltas alrededor de la Tierra: el ángulo recorrido tiende a un valor fijo */
function lxTurn(t){var ti=LX.tInj;return ti!=null&&t>ti?lxDown(ti)/LX_R+2*Math.atan(lxEscD(t)):lxDown(t)/LX_R;}

/* ---------- cielo real: Sol, Luna y planetas a su distancia y tamaño verdaderos (JPL Horizons, minuto del despegue) ---------- */
var LX_BODIES=[['sun',6.957e8,0xfff4d6],['moon',1.7374e6,0xffffff],['mercury',2.4397e6,0x9a9086],['venus',6.0518e6,0xe8d9b0],['mars',3.3895e6,0xc8683c],
  ['jupiter',6.9911e7,0xd8b890],['saturn',5.8232e7,0xe0cc98],['uranus',2.5362e7,0xa8dce0],['neptune',2.4622e7,0x5878d8]];
function lxSkyInit(){
  LX.sky3=new THREE.Scene();LX.skyL=new THREE.DirectionalLight(0xffffff,1.6);LX.sky3.add(LX.skyL);LX.sky3.add(LX.skyL.target);LX.sky3.add(new THREE.AmbientLight(0xffffff,0.03));
  LX.skyB={};LX.skyV=null;
  LX_BODIES.forEach(function(b){
    var mat=b[0]==='sun'?new THREE.MeshBasicMaterial({color:b[2]}):new THREE.MeshLambertMaterial(b[0]==='moon'?{map:texOf('assets/textures/moon_lroc_color_2k.jpg')}:{color:b[2]});
    var o=new THREE.Mesh(new THREE.SphereGeometry(b[1],32,16),mat);o.visible=false;LX.sky3.add(o);LX.skyB[b[0]]={mesh:o,r:b[1]};});
  LX.skyB.earth={mesh:null,r:LX_R};
  for(var k in LX.skyB){var e=add(lxLabs,'div','lx-sky');add(e,'i','');var sp=add(e,'span','');LX.skyB[k].ar=add(sp,'u','');LX.skyB[k].ar.textContent='➜';LX.skyB[k].nm=add(sp,'b','');LX.skyB[k].ds=add(sp,'em','');e.style.display='none';LX.skyB[k].el=e;LX.skyB[k].txt='';}
}
/* de la eclíptica J2000 a los ejes de la escena: ecuatorial, giro de la Tierra en ese minuto (GMST), ejes de la malla y orientación del sitio */
function lxSkyOrient(m){
  var S=typeof LAUNCH_SKY!=='undefined'&&LAUNCH_SKY&&LAUNCH_SKY[m.id];LX.skyV=null;if(!S||!LX.skyB)return;
  var g=gmst(jdOf(m.launch)),cg=Math.cos(g),sg=Math.sin(g),ce=Math.cos(EPS_J2000),se=Math.sin(EPS_J2000);LX.skyV={};
  for(var k in S){var v=S[k],x=v[0],y=ce*v[1]-se*v[2],z=se*v[1]+ce*v[2];
    LX.skyV[k]=new THREE.Vector3(x*cg+y*sg,z,x*sg-y*cg).multiplyScalar(1000).applyQuaternion(LX.q);}
  LX.sunV.copy(LX.skyV.sun).normalize();
}
/* cuerpos que se señalan en el borde de la pantalla cuando quedan fuera de cuadro: la Tierra, la Luna y el destino de la misión */
var LX_DEST={surveyor1:'moon',apollo11:'moon',viking1:'mars',pathfinder:'mars',spirit:'mars',opportunity:'mars',phoenix:'mars',insight:'mars',ingenuity:'mars',pioneer10:'jupiter',pioneer11:'jupiter'};
function lxSkyHide(){if(LX.skyB)for(var k in LX.skyB)LX.skyB[k].el.style.display='none';}
var _lxE=new THREE.Vector3(),_lxC=new THREE.Vector3(),_lxQ=new THREE.Vector3();
function lxSkyDist(d){var km=d/1000;return km<2e6?fmt(km<1e4?km:Math.round(km/100)*100)+' km':(km/1e6).toLocaleString(lang==='es'?'es-AR':'en-US',{maximumFractionDigits:km<1e8?1:0})+' '+lxt('mkm');}
function lxSkyDraw(cam,dark){
  if(!LX.skyV||dark<0.6){if(LX.skyOn){LX.skyOn=false;lxSkyHide();}return;}
  LX.skyOn=true;
  var E=LX.earth.position,k,B,p,vis={},C=cam.position,Rk=LX_R*1.012;
  for(k in LX.skyB){B=LX.skyB[k];p=B.pos||(B.pos=new THREE.Vector3());
    if(k==='earth')p.copy(E);else p.copy(E).add(LX.skyV[k]);
    /* tapado por la Tierra: el segmento cámara-cuerpo pasa por dentro del planeta */
    var hid=false;if(k!=='earth'){_lxQ.subVectors(p,C);var u=clamp(_lxE.subVectors(E,C).dot(_lxQ)/_lxQ.lengthSq(),0,1);hid=_lxC.copy(C).addScaledVector(_lxQ,u).distanceTo(E)<Rk;}
    vis[k]=!hid;if(B.mesh){B.mesh.visible=!hid;B.mesh.position.copy(p);}}
  LX.skyL.position.copy(LX.skyV.sun).add(E);LX.skyL.target.position.copy(E);
  LX.skyB.moon.mesh.lookAt(E);LX.skyB.moon.mesh.rotateY(-Math.PI/2);
  cam.near=1e5;cam.far=2e13;cam.updateProjectionMatrix();renderer.render(LX.sky3,cam);renderer.clearDepth();
  var cr=lxCard.hidden?null:lxCard.getBoundingClientRect(),jb=cr?jr.getBoundingClientRect():null,now=performance.now(),upd=!LX.skyT||now-LX.skyT>400;if(upd)LX.skyT=now;
  for(k in LX.skyB){B=LX.skyB[k];p=B.pos;
    var d=p.length(),q=_lxQ.copy(p).applyMatrix4(cam.matrixWorldInverse),cx=q.x,cy=q.y,front=q.z<0,show=vis[k]&&front,edge=false;
    /* la Tierra solo lleva cartel cuando ya se ve entera */
    if(k==='earth'&&LX.h<1.2e6)show=false;
    var px=0,py=0;
    if(show){q.applyMatrix4(cam.projectionMatrix);px=(q.x*0.5+0.5)*W;py=(-q.y*0.5+0.5)*H;if(Math.abs(q.x)>1||Math.abs(q.y)>1)show=false;}
    if(!show&&LX.h>1.5e5&&(k==='moon'||k===LX_DEST[LX.m.id]||k==='earth')&&(vis[k]||!front||k==='earth')){
      /* fuera de cuadro: cartel con flecha en el borde, en la dirección hacia la que hay que girar */
      var L=Math.sqrt(cx*cx+cy*cy)||1,ux=cx/L,uy=-cy/L,hw=W/2-110,hh=H/2-150,sc=Math.min(hw/Math.abs(ux||1e-6),hh/Math.abs(uy||1e-6));
      px=W/2+ux*sc;py=H/2+10+uy*sc;show=edge=true;B.ar.style.transform='rotate('+Math.atan2(uy,ux).toFixed(2)+'rad)';}
    if(show&&cr&&px<cr.right-jb.left+(edge?90:10)&&px>cr.left-jb.left-130&&py>cr.top-jb.top-16&&py<cr.bottom-jb.top+8)show=false;
    if(show){
      /* el aro marca el cuerpo; si ya se ve como disco, el cartel se corre a su borde */
      var off=k==='earth'||edge?0:Math.min(60,B.r/d/Math.tan(cam.fov*DEG/2)*H/2);
      B.el.style.transform='translate('+(px+off*0.7).toFixed(1)+'px,'+(py-off*0.7).toFixed(1)+'px)';
      if(B.edge!==edge){B.edge=edge;B.el.classList.toggle('edge',edge);}}
    B.el.style.display=show?'':'none';
    if(show&&upd){var tx=lxt('body')[k]+'|'+lxSkyDist(k==='earth'?LX.h:d);if(tx!==B.txt){B.txt=tx;B.nm.textContent=lxt('body')[k];B.ds.textContent=(k==='earth'&&!LX.realH?'≈ ':'')+lxSkyDist(k==='earth'?LX.h:d);}}
  }
}

/* ---------- escena ---------- */
function lxInit(){
  if(LX.fg)return;
  LX.fg=new THREE.Scene();LX.bg=new THREE.Scene();LX.cam=new THREE.PerspectiveCamera(42,W/H,1,1e6);
  var et=earthMat.uniforms.uDay.value;
  LX.earth=new THREE.Mesh(new THREE.SphereGeometry(LX_R,128,64),new THREE.MeshLambertMaterial({map:et,emissive:0x12356e,emissiveIntensity:0}));LX.bg.add(LX.earth);
  /* velo azul del aire sobre el lado de día: sin esto, desde arriba el mar se ve casi negro */
  LX.earth.material.onBeforeCompile=function(sh){sh.fragmentShader=sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance*=clamp(vLightFront.g*0.6,0.0,1.0);');};
  var am=new THREE.ShaderMaterial({side:THREE.BackSide,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{uSun:{value:new THREE.Vector3(1,0,0)},uColor:{value:new THREE.Color(0x5fa8ff)},uK:{value:1}},vertexShader:ATMO_VS,fragmentShader:ATMO_FS});
  LX.atmo=new THREE.Mesh(new THREE.SphereGeometry(LX_R*1.016,96,48),am);LX.earth.add(LX.atmo);
  /* un segundo borde, más ancho y suave, para que desde arriba la atmósfera se vea como una banda azul y no como una línea */
  LX.atmo2=new THREE.Mesh(new THREE.SphereGeometry(LX_R*1.045,96,48),new THREE.ShaderMaterial({side:THREE.BackSide,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{uSun:{value:new THREE.Vector3(1,0,0)},uColor:{value:new THREE.Color(0x3f86ff)},uK:{value:0}},vertexShader:ATMO_VS,
    fragmentShader:'uniform vec3 uSun;uniform vec3 uColor;uniform float uK;varying vec3 vN;varying vec3 vD;void main(){float i=pow(clamp(-normalize(vN).z*2.3,0.0,1.0),2.6);float s=0.06+0.94*smoothstep(-0.25,0.5,dot(vD,uSun));gl_FragColor=vec4(uColor*i*s*uK,1.0);}'}));
  LX.earth.add(LX.atmo2);
  /* nubes: ruido en tres dimensiones sobre la esfera, así no tienen costuras ni se ven borrosas de cerca. Quedan fijas a la
     Tierra, el Sol las ilumina y alrededor de la plataforma el cielo está despejado (día de lanzamiento). */
  LX.clouds=new THREE.Mesh(new THREE.SphereGeometry(LX_R+7000,128,64),new THREE.ShaderMaterial({side:THREE.DoubleSide,transparent:true,depthWrite:false,
    uniforms:{uSun:{value:new THREE.Vector3(1,0,0)},uSite:{value:new THREE.Vector3(0,1,0)},uFogC:{value:new THREE.Color()},uFog:{value:new THREE.Vector2(1e9,2e9)},uOp:{value:1}},
    vertexShader:'varying vec3 vP;varying vec3 vN;varying vec3 vW;void main(){vP=normalize(position);vN=normalize(mat3(modelMatrix)*normal);vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:'precision highp float;uniform vec3 uSun;uniform vec3 uSite;uniform vec3 uFogC;uniform vec2 uFog;uniform float uOp;varying vec3 vP;varying vec3 vN;varying vec3 vW;'+
      'float h3(vec3 p){p=fract(p*0.3183099+0.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}'+
      'float n3(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*(3.0-2.0*f);return mix(mix(mix(h3(i),h3(i+vec3(1.0,0.0,0.0)),f.x),mix(h3(i+vec3(0.0,1.0,0.0)),h3(i+vec3(1.0,1.0,0.0)),f.x),f.y),'+
      'mix(mix(h3(i+vec3(0.0,0.0,1.0)),h3(i+vec3(1.0,0.0,1.0)),f.x),mix(h3(i+vec3(0.0,1.0,1.0)),h3(i+vec3(1.0,1.0,1.0)),f.x),f.y),f.z);}'+
      'float fbm(vec3 p){float a=0.5;float t=0.0;for(int i=0;i<5;i++){t+=a*n3(p);p=p*2.03+vec3(11.7,3.1,5.3);a*=0.5;}return t;}'+
      'void main(){vec3 p=normalize(vP);float sd=length(p-uSite);float n=fbm(p*13.0+3.0);float f=fbm(p*420.0+vec3(5.0,1.0,9.0));float w=max(n3(p*3.3+7.0),0.5*smoothstep(0.012,0.03,sd)*(1.0-smoothstep(0.12,0.2,sd)));'+
      'float d=smoothstep(0.41,0.55,n)*smoothstep(0.42,0.6,f)*smoothstep(0.24,0.5,w);d*=smoothstep(0.0025,0.012,sd);'+
      'd*=smoothstep(0.015,0.13,abs(dot(normalize(vW-cameraPosition),normalize(vN))));if(d<0.004)discard;'+
      'vec3 N=normalize(vN);float l=smoothstep(-0.06,0.32,dot(N,normalize(uSun)));vec3 c=vec3(1.0,0.99,0.97)*(0.035+0.965*l)*mix(1.0,0.78,d);if(!gl_FrontFacing)c*=0.8;'+
      'float fd=length(vW-cameraPosition);c=mix(c,uFogC,smoothstep(uFog.x,uFog.y,fd));gl_FragColor=vec4(c,d*0.93*uOp);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}'}));
  LX.clouds.renderOrder=2;LX.earth.add(LX.clouds);
  LX.stars=new THREE.Mesh(new THREE.SphereGeometry(4e7,32,16),new THREE.MeshBasicMaterial({map:texOf('assets/textures/stars_hipparcos.jpg'),side:THREE.BackSide,depthWrite:false,transparent:true,opacity:0}));LX.bg.add(LX.stars);
  LX.stars.material.fog=false;
  LX.dome=new THREE.Mesh(new THREE.SphereGeometry(3e7,48,24),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,transparent:true,
    uniforms:{uZen:{value:new THREE.Color()},uHor:{value:new THREE.Color()},uSun:{value:new THREE.Vector3(0,1,0)},uA:{value:1},uDay:{value:1}},
    vertexShader:'varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'uniform vec3 uZen;uniform vec3 uHor;uniform vec3 uSun;uniform float uA;uniform float uDay;varying vec3 vD;void main(){vec3 d=normalize(vD);float y=max(d.y,0.0);vec3 c=mix(uHor,uZen,pow(y,mix(0.4,0.16,uA)));'+
      'float s=max(dot(d,normalize(uSun)),0.0);c+=vec3(1.0,0.9,0.72)*(pow(s,600.0)*6.0+pow(s,14.0)*0.3)*uDay;gl_FragColor=vec4(c,(1.0-uA*smoothstep(0.0,0.4,d.y))*(1.0-smoothstep(0.72,1.0,uA)));\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}'}));
  LX.dome.renderOrder=1;LX.bg.add(LX.dome);LX.bg.fog=new THREE.Fog(0x000000,1e9,2e9);LX.fg.fog=new THREE.Fog(0x000000,900,9000);LX.hor=new THREE.Color();LX.zen=new THREE.Color();
  LX.sunB=new THREE.DirectionalLight(0xfff4e6,1);LX.bg.add(LX.sunB);LX.bg.add(new THREE.AmbientLight(0x4a5568,0.5));
  LX.sun=new THREE.DirectionalLight(0xfff1e0,2.4);LX.fg.add(LX.sun);LX.fg.add(LX.sun.target);
  LX.sun.castShadow=true;LX.sun.shadow.mapSize.set(2048,2048);LX.sun.shadow.bias=-0.0003;LX.sun.shadow.normalBias=0.06;
  LX.fill=new THREE.DirectionalLight(0xcfe0ff,0.45);LX.fg.add(LX.fill);LX.fg.add(LX.fill.target);
  LX.hemi=new THREE.HemisphereLight(0xbcd4ff,0x554a40,0.5);LX.fg.add(LX.hemi);
  LX.glow=new THREE.PointLight(0xffb070,0,400,1.6);LX.fg.add(LX.glow);
  /* plataforma: suelo, losa, torre y mar del lado hacia donde sale el cohete */
  var g=new THREE.Group();LX.ground=g;LX.fg.add(g);
  /* el suelo va en tres capas con el borde desvanecido, para que no se vea dónde termina cada una: el mar, la costa vista
     desde lejos (45 km) y el terreno junto a la plataforma (2,6 km, con caminos). Se dibujan primero y en ese orden. */
  var sea=new THREE.Mesh(new THREE.CircleGeometry(45000,96),lxRim(new THREE.MeshStandardMaterial({color:new THREE.Color(0.0045,0.026,0.066),roughness:0.92,metalness:0,envMapIntensity:0.06}),28000,45000,[0.32,0.2,0.05]));
  sea.rotation.x=-Math.PI/2;sea.position.y=-1.0;sea.renderOrder=-5;g.add(sea);
  var far=new THREE.Mesh(new THREE.CircleGeometry(45000,96),lxRim(new THREE.MeshStandardMaterial({color:0x666666,roughness:1,metalness:0,map:lxGroundTex(45000,2048,false)}),28000,45000));
  far.rotation.x=-Math.PI/2;far.position.y=-0.9;far.renderOrder=-4;g.add(far);LX.far=far;
  var land=new THREE.Mesh(new THREE.CircleGeometry(2600,72),lxRim(new THREE.MeshStandardMaterial({color:0x8a8a8a,roughness:1,metalness:0,map:lxGroundTex(2600,2048,true)}),1700,2600));
  land.rotation.x=-Math.PI/2;land.position.y=-0.8;land.renderOrder=-3;land.receiveShadow=true;g.add(land);
  /* caminos de servicio: piezas aparte, para que se vean nítidos de cerca */
  var rm=new THREE.MeshStandardMaterial({color:0x151515,roughness:0.95,metalness:0,transparent:true,depthWrite:false});LX.roadMat=rm;
  [[-48,0,-1650,-150,9],[-900,-1700,-900,1700,7],[-30,-40,-420,-1250,6],[-420,-1250,-900,-1400,6]].forEach(function(q){
    var dx=q[2]-q[0],dz=q[3]-q[1],len=Math.sqrt(dx*dx+dz*dz),r=new THREE.Mesh(new THREE.PlaneGeometry(len,q[4]),rm);
    r.rotation.set(-Math.PI/2,0,-Math.atan2(dz,dx));r.position.set((q[0]+q[2])/2,-0.6,(q[1]+q[3])/2);r.renderOrder=-2.5;r.receiveShadow=true;g.add(r);});
  var slab=new THREE.Mesh(new THREE.CylinderGeometry(46,50,2.4,48),new THREE.MeshStandardMaterial({color:0x585858,roughness:0.92,metalness:0,map:lxSlabTex()}));slab.position.y=-1.25;slab.receiveShadow=true;slab.renderOrder=-2;g.add(slab);
  var scorch=new THREE.Mesh(new THREE.CircleGeometry(15,40),new THREE.MeshStandardMaterial({color:0x3a3835,roughness:1,metalness:0,transparent:true,opacity:0.55,depthWrite:false}));scorch.rotation.x=-Math.PI/2;scorch.position.y=-0.03;scorch.visible=false;scorch.renderOrder=-1;g.add(scorch);LX.land=land;LX.sea=sea;LX.slab=slab;
  [land,sea,slab].forEach(function(o){o.material.transparent=true;});
  LX.tower=new THREE.Group();g.add(LX.tower);
  lxSmokeInit();
  lxSkyInit();
  LX.sky=new THREE.Color();LX.q=new THREE.Quaternion();LX.sunV=new THREE.Vector3(1,0.4,0.3).normalize();LX.dayF=1;
}
function lxTower(h){
  var t=LX.tower,m=new THREE.MeshStandardMaterial({color:0x8a8f96,roughness:0.7,metalness:0.5}),r=new THREE.MeshStandardMaterial({color:/^atlasV/.test(LX.key||'')?0xb9bdc2:0x9c3f35,roughness:0.75,metalness:0.3});
  while(t.children.length)t.remove(t.children[0]);
  var H2=h*0.92,w=Math.max(5,h*0.09),x0=-(w*0.5+Math.max(6,h*0.12));
  [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(function(c){var p=new THREE.Mesh(new THREE.BoxGeometry(0.5,H2,0.5),r);p.position.set(x0+c[0]*w/2,H2/2,c[1]*w/2);t.add(p);});
  for(var i=1;i<=7;i++){var y=H2*i/7,b=new THREE.Mesh(new THREE.BoxGeometry(w,0.35,w),m);b.position.set(x0,y,0);t.add(b);}
  var arm=new THREE.Mesh(new THREE.BoxGeometry(Math.abs(x0)-w*0.2,0.5,1.2),m);arm.position.set(x0/2,H2*0.72,0);t.add(arm);
  /* diagonales de la estructura */
  for(i=0;i<7;i++){var y0=H2*i/7,dy=H2/7,L=Math.sqrt(dy*dy+w*w);[-1,1].forEach(function(c,j){var d=new THREE.Mesh(new THREE.BoxGeometry(0.22,L,0.22),r);d.position.set(x0,y0+dy/2,c*w/2);d.rotation.z=((i+j)%2?1:-1)*Math.atan2(w,dy);t.add(d);});}
  t.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
}
/* orientación de la Tierra: el lugar del despegue queda arriba y el rumbo del cohete hacia +x */
var LX_SITE={cape:{lat:28.5,lon:-80.6,az:95},vandenberg:{lat:34.63,lon:-120.61,az:158}};
function lxOrient(m){
  var sq=LAUNCH_SEQ[m.id],S=LX_SITE[sq.site==='vandenberg'?'vandenberg':'cape'],Y=new THREE.Vector3(0,1,0);
  var site=siteLocal(S.lat,S.lon,new THREE.Vector3()),q1=new THREE.Quaternion().setFromUnitVectors(site,Y);
  var east=new THREE.Vector3().crossVectors(Y,site).normalize(),north=new THREE.Vector3().crossVectors(site,east).normalize();
  var dr=north.multiplyScalar(Math.cos(S.az*DEG)).addScaledVector(east,Math.sin(S.az*DEG)).applyQuaternion(q1);
  var q2=new THREE.Quaternion().setFromAxisAngle(Y,Math.atan2(dr.z,dr.x));LX.q.copy(q2).multiply(q1);
  if(LX.clouds)LX.clouds.material.uniforms.uSite.value.set(0,1,0).applyQuaternion(LX.q.clone().invert());
  var ll=sunLL(m.launch),u=unitLL(ll[0],ll[1]);LX.sunV.set(u[0],u[1],u[2]).applyQuaternion(LX.q).normalize();
  lxSkyOrient(m);
  var el=Math.asin(clamp(LX.sunV.y,-1,1))/DEG;LX.dayF=lxSmooth((el+6)/16);
  if(LX.sunV.y<0.12){LX.sunL=LX.sunV.clone();LX.sunL.y=0.12;LX.sunL.normalize();}else LX.sunL=LX.sunV.clone();
}
function lxBuild(m){
  lxInit();
  if(LX.R){LX.fg.remove(LX.R.root);LX.R=null;}
  lxClearDebris();
  var key=lxKey(m),glb=typeof ROCKET_GLB!=='undefined'&&ROCKET_GLB&&ROCKET_GLB[key],sync=true;
  LX.m=m;LX.seq=LAUNCH_SEQ[m.id];LX.T=lxTimes(LX.seq.steps);LX.tInj=LX.T.length>2?LX.T[LX.T.length-2]:null;LX.dep=null;LX.dropped={};LX.ready=false;LX.k=-1;LX.loading=m;
  function go(R){if(LX.loading!==m)return;LX.loading=null;lxBuilt(m,key,R);
    if(!sync&&JR.active&&JR.m===m){var s=JR.segs[JR.si];if(s&&s.launch)lxEnter(s);}}
  if(glb){
    /* modelo oficial de NASA; si no llega en unos segundos se usa el cohete armado a mano */
    modelOf(glb,function(sc){var R=null;try{R=nasaRocket(key,sc);}catch(e){R=null;}go(R||buildRocket3D(key));});
    setTimeout(function(){if(LX.loading===m)go(buildRocket3D(key));},9000);
  }else go(buildRocket3D(key));
  sync=false;
}
function lxBuilt(m,key,R){
  LX.R=R;LX.key=key;R.root.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  LX.user=false;LX.fg.add(R.root);lxTower(R.height);lxOrient(m);lxPayload(m,R);
  var et=earthMat.uniforms.uDay.value;if(et.encoding!==THREE.sRGBEncoding){et.encoding=THREE.sRGBEncoding;et.needsUpdate=true;LX.earth.material.needsUpdate=true;}
  var st=texOf('assets/textures/stars_hipparcos.jpg');if(st.encoding!==THREE.sRGBEncoding){st.encoding=THREE.sRGBEncoding;st.needsUpdate=true;}
  lxEnvBuild();lxSmokeReset();
  LX.az=0.75;LX.el=0.1;LX.zoom=1;lxFrameBox(true);LX.ready=true;
}
var LX_PAY={viking1:'viking',insight:'cruise',ingenuity:'cruise'},LX_PAYK={ingenuity:1.7};
/* la nave va dentro de la cofia, achicada para que entre; al final se la agranda para verla bien */
function lxPayload(m,R){
  var pm=R.parts.payloadMount,X=JX[m.id];LX.craft=null;if(!pm||m.id==='apollo11'||!X)return;
  var hold=new THREE.Group();pm.add(hold);LX.craft=hold;
  function fit(o){o.traverse(function(q){if(q.isMesh&&q.material){q.material=Array.isArray(q.material)?q.material.map(function(mm){var k=mm.clone();k.envMap=null;return k;}):q.material.clone();if(!Array.isArray(q.material))q.material.envMap=null;q.castShadow=true;q.receiveShadow=true;}});
    var g=new THREE.Group();g.add(o);var b=new THREE.Box3().setFromObject(g),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());
    var k=Math.min(1,(R.fairingRadius||1.4)*1.7/Math.max(s.x,s.z,0.01));o.position.set(-c.x,-b.min.y,-c.z);g.scale.setScalar(k);hold.add(g);LX.craftK=k;}
  var name=LX_PAY[m.id]||(X.hw==='surveyor'?'surveyor':X.craft);if(!name)return;
  if(HW[name]){var o=HW[name]();if(name==='cruise')o.rotation.x=Math.PI;if(LX_PAYK[m.id])o.scale.setScalar(LX_PAYK[m.id]);fit(o);}else modelOf(name,function(o){fit(fitModel(o,X.craftM));});
}
function lxClearDebris(){LX.debris.forEach(function(d){if(d.g.parent)d.g.parent.remove(d.g);if(d.lab)d.lab.remove();});LX.debris=[];
  LX.flames.forEach(function(f){if(f.parent)f.parent.remove(f);});LX.flames=[];}
/* centro y tamaño de lo que queda del cohete, en sus propios ejes */
var _lxB=new THREE.Box3(),_lxV=new THREE.Vector3(),_lxW=new THREE.Vector3();
function lxFrameBox(snap){
  var root=LX.R.root,keep=root.rotation.z;root.rotation.z=0;root.updateMatrixWorld(true);
  _lxB.makeEmpty();root.children.forEach(function(c){if(c.userData.lxFlame)return;_lxB.expandByObject(c);});
  if(_lxB.isEmpty())_lxB.set(new THREE.Vector3(-2,0,-2),new THREE.Vector3(2,4,2));
  _lxB.getCenter(LX.ctr);LX.rad=Math.max(3,_lxB.getSize(_lxV).length()/2);root.rotation.z=keep;root.updateMatrixWorld(true);
  if(snap){LX.dist=LX.rad*3.3*LX.zoom;LX.tgt.copy(LX.ctr);}
}
/* suelta una pieza: se desprende, se aleja girando despacio y lleva un cartel con su nombre y su destino */
function lxFate(id){var f=LX.seq.fates||[];for(var i=0;i<f.length;i++)if(f[i].part===id)return f[i];return null;}
function lxDrop(id,animate){
  var R=LX.R,g=R.parts[id];LX.dropped[id]=1;
  if(id==='fairing'){lxDrop('fairingA',animate);lxDrop('fairingB',animate);return;}
  if(!g||g.parent!==R.root)return;
  LX.flames=LX.flames.filter(function(f){if(f.userData.part===id){if(f.parent)f.parent.remove(f);return false;}return true;});
  if(!animate){R.root.remove(g);return;}
  R.root.updateMatrixWorld(true);
  var axis=new THREE.Vector3(0,1,0).applyQuaternion(R.root.quaternion),side=new THREE.Vector3(1,0,0).applyQuaternion(R.root.quaternion),zz=new THREE.Vector3(0,0,1);
  var fate=lxFate(id),lab=null;
  function one(o,v,w,label){LX.fg.attach(o);var b=new THREE.Box3().setFromObject(o),c=b.getCenter(new THREE.Vector3());
    var d={g:o,v:v,w:w,t:0,c:o.worldToLocal(c.clone()),lab:null,fate:label?fate:null};
    if(label&&fate){d.lab=add(lxLabs,'div','lx-lab');add(d.lab,'b','').textContent=fate.name[lang];d.lab.appendChild(document.createTextNode(' '+(lxt('where')[fate.where]||'')));}
    LX.debris.push(d);}
  var isSrb=/^srb|^boosterSection/.test(id),kids=g.children.slice(),each=isSrb&&kids.length>1&&kids.every(function(k){return k.isGroup;});
  if(each){kids.forEach(function(k,i){var p=k.getWorldPosition(new THREE.Vector3()).sub(R.root.getWorldPosition(new THREE.Vector3()));p.addScaledVector(axis,-p.dot(axis));
      if(p.lengthSq()<1e-6)p.copy(side);p.normalize();one(k,p.multiplyScalar(7).addScaledVector(axis,-9),new THREE.Vector3(0.1*(i%2?1:-1),0,0.12*(i%3-1)),i===0);});R.root.remove(g);}
  else{var v=axis.clone().multiplyScalar(-11),w=new THREE.Vector3(0.04,0,0.07);
    if(id==='fairingA'){v=side.clone().multiplyScalar(9).addScaledVector(axis,-5);w.set(0,0,-0.5);}
    if(id==='fairingB'){v=side.clone().multiplyScalar(-9).addScaledVector(axis,-5);w.set(0,0,0.5);}
    if(id==='les'){v=axis.clone().multiplyScalar(16).addScaledVector(zz,9);w.set(0.3,0,0.2);}
    if(id==='interstage'){v=axis.clone().multiplyScalar(-8);}
    one(g,v,w,id!=='fairingB');}
}
/* qué piezas están encendidas en cada paso */
function lxBurning(k){
  var steps=LX.seq.steps,on={},any=false,i;
  for(i=0;i<=k;i++){var s=steps[i];if(s.ignite||s.shutdown)any=true;if(!s.ignite&&/^(parking|orbit|coast)$|Cutoff$/.test(s.id||'')){delete on.stage2;delete on.stage3;}
    (s.ignite||[]).forEach(function(p){on[p]=1;});(s.shutdown||[]).forEach(function(p){delete on[p];});(s.drop||[]).forEach(function(p){delete on[p];});}
  if(!any&&k>0){var order=['stage1','stage2','stage3'];on={};for(i=0;i<order.length;i++)if(LX.R.parts[order[i]]&&!LX.dropped[order[i]]){on[order[i]]=1;break;}
    ['srbGround','boosterSection'].forEach(function(p){if(LX.R.parts[p]&&!LX.dropped[p])on[p]=1;});}
  return on;
}
/* escape de los motores: dos capas con shader por tobera; el color, el largo y el humo dependen del propelente */
var LX_PL={kero:{hot:[1.0,0.92,0.70],cool:[1.0,0.40,0.08],len:13,gain:1.0,smoke:0.12},
  solid:{hot:[1.0,0.97,0.88],cool:[1.0,0.60,0.20],len:20,gain:1.4,smoke:1},
  hydro:{hot:[0.78,0.88,1.0],cool:[0.30,0.48,1.0],len:7,gain:0.30,smoke:0},
  hyper:{hot:[1.0,0.84,0.66],cool:[0.92,0.46,0.24],len:8,gain:0.30,smoke:0}};
function lxPlumeType(part){var k=LX.key||'';if(/^srb/.test(part))return 'solid';
  if(part==='stage3'&&/^delta|^atlasCentaurTE/.test(k))return 'solid';
  if(part==='stage1'||part==='boosterSection')return k==='titan3e'?'hyper':'kero';
  if(part==='stage2')return /^delta|^titan/.test(k)?'hyper':'hydro';
  return 'hydro';}
var LX_PL_VS='uniform float uSpread;uniform float uLen;uniform float uR;varying float vV;varying vec3 vN;varying vec3 vE;varying vec2 vA;'+
  'void main(){float v=0.5-position.y;vV=v;float rr=uR*(1.0+uSpread*pow(v,0.8))*(1.0-0.5*smoothstep(0.7,1.0,v));vec3 p=vec3(position.x*rr,-v*uLen,position.z*rr);'+
  'vec4 mv=modelViewMatrix*vec4(p,1.0);vN=normalize(normalMatrix*vec3(position.x,0.0,position.z));vE=normalize(-mv.xyz);vA=position.xz;gl_Position=projectionMatrix*mv;}';
var LX_PL_FS='uniform vec3 uHot;uniform vec3 uCool;uniform float uGain;uniform float uT;uniform float uEdge;uniform float uSeed;varying float vV;varying vec3 vN;varying vec3 vE;varying vec2 vA;'+
  'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}'+
  'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}'+
  'void main(){float a=pow(abs(dot(normalize(vN),normalize(vE))),uEdge);float fall=pow(1.0-vV,1.7)*smoothstep(0.0,0.02,vV);'+
  'float ang=vA.x*2.3+vA.y*1.7+uSeed;float s=n(vec2(ang,vV*9.0-uT*7.0))*0.6+n(vec2(ang*2.7,vV*23.0-uT*13.0))*0.4;'+
  'float dia=1.0+0.4*sin(vV*46.0)*exp(-vV*5.0);vec3 c=mix(uHot,uCool,smoothstep(0.0,0.5,vV+0.3*(1.0-a)));'+
  'float I=a*fall*(0.5+0.8*s)*dia*uGain;gl_FragColor=vec4(c*I,1.0);}';
function lxPlumeMat(P,r,len,edge,gain,rk,white){
  return new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,vertexShader:LX_PL_VS,fragmentShader:LX_PL_FS,
    uniforms:{uSpread:{value:0.4},uLen:{value:len},uR:{value:r*rk},uHot:{value:white?new THREE.Vector3(1,1,0.96):new THREE.Vector3().fromArray(P.hot)},uCool:{value:new THREE.Vector3().fromArray(white?P.hot:P.cool)},
      uGain:{value:gain},uT:{value:Math.random()*10},uEdge:{value:edge},uSeed:{value:Math.random()*50}}});
}
function lxFlames(k){
  LX.flames.forEach(function(f){if(f.parent)f.parent.remove(f);});LX.flames=[];
  if(!LX.plGeo)LX.plGeo=new THREE.CylinderGeometry(1,1,1,28,24,true);
  if(!LX.glowT)LX.glowT=glowTex(255,196,128);
  var on=lxBurning(k),R=LX.R;R.root.updateMatrixWorld(true);
  (R.engines||[]).forEach(function(e){var g=R.parts[e.part];if(!on[e.part]||!g||g.parent!==R.root||LX.dropped[e.part])return;
    var type=lxPlumeType(e.part),P=LX_PL[type],r=Math.max(0.12,e.r||0.5),len=r*P.len,f=new THREE.Group();
    f.userData={lxFlame:1,part:e.part,type:type,r:r,len:len,P:P,mats:[]};
    var mo=lxPlumeMat(P,r,len,1.5,P.gain,1.02,false),mi=lxPlumeMat(P,r,len*0.55,2.6,P.gain*1.7,0.56,true);
    var a=new THREE.Mesh(LX.plGeo,mo),b=new THREE.Mesh(LX.plGeo,mi);a.frustumCulled=false;b.frustumCulled=false;a.castShadow=b.castShadow=false;f.add(a);f.add(b);f.userData.mats=[mo,mi];
    if(type==='kero'||type==='solid'){var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:LX.glowT,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0.5*P.gain}));sp.scale.setScalar(r*9);sp.position.y=-r*1.2;f.add(sp);f.userData.sp=sp;}
    var p=g.worldToLocal(R.root.localToWorld(new THREE.Vector3(e.x||0,e.y||0,e.z||0)));f.position.copy(p);g.add(f);LX.flames.push(f);});
}
/* humo: partículas que quedan quietas respecto del suelo mientras el cohete sube */
function lxSmokeInit(){
  var N=900,g=new THREE.BufferGeometry();LX.sN=N;LX.sI=0;LX.sP=new Float32Array(N*3);LX.sD=new Float32Array(N*3);LX.sV=new Float32Array(N*3);
  LX.sAge=new Float32Array(N);LX.sLife=new Float32Array(N);LX.sS=new Float32Array(N*3);
  g.setAttribute('position',new THREE.BufferAttribute(LX.sP,3));g.setAttribute('aD',new THREE.BufferAttribute(LX.sD,3));
  var m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uPx:{value:600},uCol:{value:new THREE.Color(0.8,0.8,0.82)},uHot:{value:new THREE.Color(1.0,0.56,0.2)}},
    vertexShader:'attribute vec3 aD;uniform float uPx;varying float vAl;varying float vH;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vAl=aD.y;vH=aD.z;gl_PointSize=min(1000.0,aD.x*uPx/max(0.5,-mv.z));gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform vec3 uCol;uniform vec3 uHot;varying float vAl;varying float vH;void main(){vec2 d=gl_PointCoord-0.5;float r=length(d)*2.0;float a=smoothstep(1.0,0.15,r)*vAl;if(a<0.004)discard;'+
      'vec3 c=mix(uCol*(0.78-0.5*d.y),uHot*1.3,vH);gl_FragColor=vec4(c,a);}'});
  LX.smoke=new THREE.Points(g,m);LX.smoke.frustumCulled=false;LX.smoke.renderOrder=2;LX.fg.add(LX.smoke);LX.sPrev=null;
}
function lxSmokeReset(){if(!LX.smoke)return;LX.sOrg=null;for(var i=0;i<LX.sN;i++){LX.sLife[i]=0;LX.sD[i*3+1]=0;}LX.smoke.geometry.attributes.aD.needsUpdate=true;LX.sPrev=null;}
var _lxS=new THREE.Vector3(),_lxG=new THREE.Vector3(),_lxAx=new THREE.Vector3();
function lxSmoke(dt){
  if(!LX.smoke)return;var N=LX.sN,P=LX.sP,D=LX.sD,V=LX.sV,i,j;
  /* fuente: el centro de las toberas que largan humo */
  var amt=0,cnt=0,rad=0;_lxS.set(0,0,0);
  LX.flames.forEach(function(f){var a=f.userData.P.smoke;if(LX.tau<7)a=Math.max(a,0.45);if(a<=0)return;f.getWorldPosition(_lxG);_lxS.add(_lxG);cnt++;amt=Math.max(amt,a);rad=Math.max(rad,f.userData.r);});
  var G=LX.ground.position,vac=lxSmooth(((LX.h||0)-25000)/60000),near=(LX.h||0)<600;amt*=1-vac;
  if(!LX.sOrg){LX.sOrg=G.clone();LX.sG=G.clone();}
  if(dt>0){_lxG.subVectors(G,LX.sG);var sp0=_lxG.length()/dt,cap=LX.R.height*1.5;if(sp0>cap)_lxG.multiplyScalar(cap/sp0);LX.sOrg.add(_lxG);LX.sG.copy(G);}
  if(near)LX.sOrg.copy(G);G=LX.sOrg;
  if(cnt&&amt>0.01&&dt>0){_lxS.multiplyScalar(1/cnt).sub(G);
    _lxAx.set(0,1,0).applyQuaternion(LX.R.root.quaternion);
    var spread=Math.max(rad*1.4,cnt>1?LX.rad*0.045:0),s0=Math.max(1.6,spread*3.0),step=s0*0.28;
    var prev=LX.sPrev||_lxS.clone(),dist=prev.distanceTo(_lxS),n=Math.max(1,Math.min(26,Math.ceil(dist/step)));
    if(dist>step*26){prev.sub(_lxS).multiplyScalar(step*26/dist).add(_lxS);}
    for(j=0;j<n;j++){i=LX.sI;LX.sI=(LX.sI+1)%N;var u=(j+Math.random())/n,x=prev.x+(_lxS.x-prev.x)*u,y=prev.y+(_lxS.y-prev.y)*u,z=prev.z+(_lxS.z-prev.z)*u;
      var jx=(Math.random()-0.5)*spread,jz=(Math.random()-0.5)*spread,low=near&&y<s0*4;
      P[i*3]=x+jx;P[i*3+1]=near?Math.max(0.6,y-s0*0.6):y;P[i*3+2]=z+jz;
      if(low){var ang=Math.random()*6.283,sp=14+Math.random()*26;V[i*3]=Math.cos(ang)*sp;V[i*3+1]=1+Math.random()*5;V[i*3+2]=Math.sin(ang)*sp;}
      else{V[i*3]=-_lxAx.x*26+(Math.random()-0.5)*7;V[i*3+1]=-_lxAx.y*26+(Math.random()-0.5)*7;V[i*3+2]=(Math.random()-0.5)*7;}
      LX.sAge[i]=0;LX.sLife[i]=low?3.5+Math.random()*3.5:1.6+Math.random()*1.6;LX.sS[i*3]=s0*(0.8+0.5*Math.random());LX.sS[i*3+1]=s0*(low?1.5:2.2);LX.sS[i*3+2]=(0.2+0.1*Math.random())*Math.min(1,amt*1.2);}
    if(!LX.sPrev)LX.sPrev=new THREE.Vector3();LX.sPrev.copy(_lxS);
  }else LX.sPrev=null;
  for(i=0;i<N;i++){var L=LX.sLife[i];if(L<=0)continue;var a=LX.sAge[i]+dt;LX.sAge[i]=a;
    if(a>=L){LX.sLife[i]=0;D[i*3+1]=0;continue;}
    var k=Math.max(0,1-1.6*dt);V[i*3]*=k;V[i*3+1]*=k;V[i*3+2]*=k;P[i*3]+=V[i*3]*dt;P[i*3+1]+=V[i*3+1]*dt;if(near&&P[i*3+1]<0.5)P[i*3+1]=0.5;P[i*3+2]+=V[i*3+2]*dt;
    var q=a/L;D[i*3]=LX.sS[i*3]+LX.sS[i*3+1]*a;D[i*3+1]=LX.sS[i*3+2]*Math.min(1,a*9)*Math.pow(1-q,1.4);D[i*3+2]=Math.max(0,1-a/0.4)*0.7;}
  LX.smoke.geometry.attributes.position.needsUpdate=true;LX.smoke.geometry.attributes.aD.needsUpdate=true;
  LX.smoke.position.copy(G);
  var day=LX.dayF,c=0.24+0.62*day;LX.smoke.material.uniforms.uCol.value.setRGB(c,c,c*1.03);
  LX.smoke.material.uniforms.uPx.value=H*(renderer.getPixelRatio?renderer.getPixelRatio():1)/(2*Math.tan(LX.cam.fov*DEG/2));
}
/* mapa de entorno: cielo, horizonte, suelo y Sol, para que el metal y la pintura reflejen algo */
function lxEnvMake(day,space){
  if(!LX.pmrem)LX.pmrem=new THREE.PMREMGenerator(renderer);
  var sc=new THREE.Scene(),geo=new THREE.SphereGeometry(50,48,24),p=geo.attributes.position,col=[],c=new THREE.Color(),top=new THREE.Color(),hor=new THREE.Color(),gnd=new THREE.Color();
  if(space){top.setRGB(0.002,0.003,0.006);hor.setRGB(0.55,0.75,1.25);gnd.setRGB(0.12,0.22,0.40);}
  else{top.setRGB(0.20*day+0.004,0.40*day+0.006,0.90*day+0.012);hor.setRGB(0.95*day+0.02,1.02*day+0.024,1.12*day+0.03);gnd.setRGB(0.34*day+0.012,0.32*day+0.011,0.27*day+0.010);}
  for(var i=0;i<p.count;i++){var y=p.getY(i)/50;
    if(space){if(y>-0.18)c.copy(top);else if(y>-0.3)c.copy(hor);else c.copy(hor).lerp(gnd,Math.min(1,(-y-0.3)*3));}
    else{if(y>=0)c.copy(hor).lerp(top,Math.pow(y,0.42));else c.copy(hor).lerp(gnd,Math.min(1,-y*7));}
    col.push(c.r,c.g,c.b);}
  geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
  sc.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  var k=space?1:day;
  if(k>0.03){var sm=new THREE.MeshBasicMaterial();sm.color.setRGB(70*k,66*k,58*k);var sun=new THREE.Mesh(new THREE.SphereGeometry(3.2,16,8),sm);sun.position.copy(LX.sunL).multiplyScalar(44);sc.add(sun);}
  var rt=LX.pmrem.fromScene(sc,0.035);geo.dispose();return rt;
}
function lxEnvBuild(){
  if(LX.envLo)LX.envLo.dispose();if(LX.envHi)LX.envHi.dispose();
  LX.envLo=lxEnvMake(LX.dayF,false);LX.envHi=lxEnvMake(1,true);LX.fg.environment=LX.envLo.texture;LX.envIs=0;
}
function lxSlabTex(){
  var cv=document.createElement('canvas');cv.width=cv.height=512;var x=cv.getContext('2d'),i;x.fillStyle='#a9a8a1';x.fillRect(0,0,512,512);
  for(i=0;i<5000;i++){var g=140+Math.random()*60|0;x.fillStyle='rgba('+g+','+g+','+(g-4)+',0.18)';x.fillRect(Math.random()*512,Math.random()*512,1+Math.random()*3,1+Math.random()*3);}
  x.strokeStyle='rgba(60,60,58,0.35)';x.lineWidth=1;for(i=0;i<=16;i++){x.beginPath();x.moveTo(i*32,0);x.lineTo(i*32,512);x.stroke();x.beginPath();x.moveTo(0,i*32);x.lineTo(512,i*32);x.stroke();}
  var gr=x.createRadialGradient(256,256,10,256,256,150);gr.addColorStop(0,'rgba(35,33,30,0.85)');gr.addColorStop(0.45,'rgba(60,56,50,0.45)');gr.addColorStop(1,'rgba(60,56,50,0)');x.fillStyle=gr;x.fillRect(0,0,512,512);
  x.fillStyle='rgba(28,27,25,0.9)';x.fillRect(256-22,256,44,256);x.strokeStyle='rgba(230,200,60,0.7)';x.lineWidth=3;x.strokeRect(256-30,256-30,60,286);
  var t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t;
}
/* borde desvanecido para un disco de suelo: la transparencia crece entre r0 y r1 (metros desde el centro) */
function lxRim(mat,r0,r1,det){
  mat.transparent=true;mat.depthWrite=false;mat.userData.uRim={value:new THREE.Vector2(r0,r1)};mat.userData.uDetK={value:new THREE.Vector3().fromArray(det||[0.5,0.4,0.3])};
  mat.onBeforeCompile=function(sh){sh.uniforms.uRim=mat.userData.uRim;sh.uniforms.uDetK=mat.userData.uDetK;sh.uniforms.uDet={value:lxDetailTex()};
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vLp;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLp=position.xy;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vLp;uniform vec2 uRim;uniform vec3 uDetK;uniform sampler2D uDet;')
      .replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb*=mix(1.0,texture2D(uDet,vLp/2100.0).r*2.0,uDetK.x)*mix(1.0,texture2D(uDet,vLp/230.0).g*2.0,uDetK.y)*mix(1.0,texture2D(uDet,vLp/19.0).b*2.0,uDetK.z);')
      .replace('#include <dithering_fragment>','#include <dithering_fragment>\ngl_FragColor.a*=1.0-smoothstep(uRim.x,uRim.y,length(vLp));');};
  return mat;
}
/* textura de detalle: manchas grises distintas en cada canal, que se repite sin costura */
function lxDetailTex(){
  if(LX.detTex)return LX.detTex;
  var N=256,cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d'),seed=91,i,k;
  function rnd(){seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296;}
  x.fillStyle='rgb(128,128,128)';x.fillRect(0,0,N,N);x.globalCompositeOperation='lighter';
  for(i=0;i<2600;i++){var ch=i%3,v=18+rnd()*40|0,px=rnd()*N,py=rnd()*N,r=1.5+rnd()*rnd()*20,e=0.3+rnd()*0.7,an=rnd()*3.14,dark=rnd()<0.5;
    x.globalCompositeOperation=dark?'difference':'lighter';x.fillStyle='rgb('+(ch===0?v:0)+','+(ch===1?v:0)+','+(ch===2?v:0)+')';
    for(k=0;k<9;k++){x.beginPath();x.ellipse(px+(k%3-1)*N,py+(Math.floor(k/3)-1)*N,r,r*e,an,0,6.283);x.fill();}}
  var t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;LX.detTex=t;return t;
}
/* la costa: el mar queda del lado hacia donde sale el cohete (x positivo). z en metros a lo largo de la costa. */
function lxCoast(z){return 760+170*Math.sin(z/2300)+80*Math.sin(z/640+1.3)+1500*Math.sin(z/21000+0.6)+2600*Math.sin(z/60000-0.4);}
/* lienzo del terreno visto desde arriba: R es el radio que cubre (metros) y N su tamaño en píxeles. Lo que es mar queda
   transparente y deja ver el disco de agua de abajo. El dibujo es siempre el mismo (números al azar con semilla fija). */
function lxGroundTex(R,N,near){
  var cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d'),m=2*R/N,i,r,seed=near?7:23;
  function rnd(){seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296;}
  function px(wx){return (wx+R)/m;}
  x.fillStyle='#56603f';x.fillRect(0,0,N,N);
  var pal=[[58,78,48],[70,88,54],[96,104,70],[122,116,84],[86,80,58],[44,62,42],[140,134,100]];
  for(i=0;i<(near?9000:9000);i++){var c=pal[Math.floor(rnd()*pal.length)],rr=(near?2+rnd()*rnd()*40:2+rnd()*rnd()*46),a=0.03+rnd()*0.09;
    x.fillStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+a.toFixed(3)+')';x.beginPath();x.ellipse(rnd()*N,rnd()*N,rr,rr*(0.18+rnd()*0.6),rnd()*3.14,0,6.283);x.fill();}
  if(near){
    /* grano fino, para que de cerca no se vea liso */
    for(i=0;i<52000;i++){var g=60+rnd()*70|0;x.fillStyle='rgba('+(g-6)+','+g+','+(g-34)+','+(0.05+rnd()*0.12).toFixed(3)+')';x.fillRect(rnd()*N,rnd()*N,1+rnd()*2,1+rnd()*2);}
  }else{
    /* lagunas y ríos de la costa, de norte a sur */
    x.globalCompositeOperation='destination-out';x.lineCap='round';x.lineJoin='round';
    [[-6400,900,0.0],[-15500,1700,1.7]].forEach(function(L){x.lineWidth=L[1]/m;x.beginPath();
      for(var z=-R;z<=R;z+=1500){var wx=L[0]+1400*Math.sin(z/9000+L[2])+500*Math.sin(z/2600+L[2]*2);if(z===-R)x.moveTo(px(wx),px(z));else x.lineTo(px(wx),px(z));}x.stroke();});
    x.globalCompositeOperation='source-over';
  }
  /* playa, mar y agua baja: fila por fila siguiendo la costa */
  for(r=0;r<N;r++){var z0=(r+0.5)*m-R,cx=px(lxCoast(z0));
    x.fillStyle='rgba(203,193,158,0.95)';x.fillRect(cx-Math.max(1.5,70/m),r,Math.max(1.5,70/m),1);
    x.clearRect(cx,r,N-cx+1,1);
    var sw=Math.max(2,(near?420:1100)/m),gr=x.createLinearGradient(cx,0,cx+sw,0);gr.addColorStop(0,'rgba(30,96,110,0.5)');gr.addColorStop(1,'rgba(14,60,88,0)');x.fillStyle=gr;x.fillRect(cx,r,sw,1);}
  var t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t;
}

/* ---------- pasos ---------- */
function lxEnter(s){
  var m=JR.m;if(LX.loading===m)return;
  if(LX.m!==m||!LX.ready||!LX.R||s.k<LX.k){lxBuild(m);if(!LX.ready)return;}
  lxClearDebris();
  var steps=LX.seq.steps,i;
  for(i=0;i<s.k;i++)(steps[i].drop||[]).forEach(function(p){lxDrop(p,false);});
  LX.k=s.k;LX.tau=LX.T[s.k];LX.pend=(steps[s.k].drop||[]).slice();LX.pendAt=0.7;
  lxFlames(s.k);lxFrameBox(s.k===0);lxTexts();lxCardFill(null);
  lxCard.hidden=false;lxLabs.style.display='';jr.classList.add('has-lx');
  if(LX.craft){var last=s.k===steps.length-1;LX.craftGoal=last?Math.min(2.4,1/Math.max(LX.craftK||1,0.2)):1;}
}
function lxLeave(){LX.loading=null;if(JE.note.textContent.indexOf(LX_STR.es.illus)===0||JE.note.textContent.indexOf(LX_STR.en.illus)===0)JE.note.textContent='';lxCard.hidden=true;lxLabs.style.display='none';lxSkyHide();jr.classList.remove('has-lx');lxClearDebris();LX.k=-1;LX.ready=false;
  var t=jr.querySelector('.jr-tele');if(t)t.hidden=false;}
function lxTexts(){
  if(!LX.seq||LX.k<0)return;var st=LX.seq.steps[LX.k],m=LX.m;
  JE.cap.textContent='';
  JE.day.textContent=fmtDate(m.launch,lang)+(LX.seq.pad?' · '+LX.seq.pad:'');
  JE.note.textContent=lxt('illus')+(LX.skyV?' '+lxt('sky'):'');
  var tele=jr.querySelector('.jr-tele'),has=true;tele.hidden=false;
  /* además de la altura y la velocidad del paso (cuando NASA las publicó): distancia al Sol en el minuto del despegue y la etapa */
  var sk=typeof LAUNCH_SKY!=='undefined'&&LAUNCH_SKY&&LAUNCH_SKY[m.id],sd=sk&&sk.sun?Math.sqrt(sk.sun[0]*sk.sun[0]+sk.sun[1]*sk.sun[1]+sk.sun[2]*sk.sun[2]):0;
  JE.t4.textContent=jt('fromSun');JE.v4.innerHTML=sd?fmt(Math.round(sd))+'<em>'+lxt('km')+'</em>':'';JE.t4.parentNode.hidden=!sd;
  JE.t6.textContent=jt('phase');JE.v6.textContent=(jt('chap').lanzamiento||'')+' · '+(LX.k+1)+' / '+LX.seq.steps.length;JE.t6.parentNode.hidden=false;
  JE.t5.parentNode.hidden=true;JE.t7.parentNode.hidden=true;
  if(has){JE.t1.textContent=lxt('alt');JE.v1.innerHTML=typeof st.alt_km==='number'?fmt(st.alt_km)+'<em>'+lxt('km')+'</em>':'';JE.t1.parentNode.hidden=typeof st.alt_km!=='number';
    JE.t2.textContent=lxt('spd');JE.v2.innerHTML=typeof st.speed_kmh==='number'?fmt(st.speed_kmh)+'<em>'+lxt('kmh')+'</em>':'';JE.t2.parentNode.hidden=typeof st.speed_kmh!=='number';JE.t3.parentNode.hidden=true;}
  lxCardFill(LX.lastNew||null);
  LX.debris.forEach(function(d){if(d.lab&&d.fate){d.lab.innerHTML='';add(d.lab,'b','').textContent=d.fate.name[lang];d.lab.appendChild(document.createTextNode(' '+(lxt('where')[d.fate.where]||'')));}});
}
function lxCardFill(newIds){
  var c=lxCard,info=typeof ROCKETS_INFO!=='undefined'&&ROCKETS_INFO?ROCKETS_INFO[lxKey(LX.m)]:null;c.innerHTML='';LX.lastNew=newIds;
  var st=LX.seq.steps[Math.max(0,LX.k)];
  add(c,'h3','lx-step').textContent=lxt('chap')+' · '+(LX.k+1)+' / '+LX.seq.steps.length;
  add(c,'p','lx-rk').textContent=st.title[lang];var stp=add(c,'p','lx-txt');stp.textContent=st.text[lang]+' ';lxSrc(stp,st.src);
  add(c,'h3','').textContent=lxt('rocket');
  add(c,'p','lx-rkn').textContent=info&&info.name?info.name[lang]:(LX.m.rocketFull||LX.m.rocket||'');
  if(info){var bits=[];if(info.heightM)bits.push(lxt('tall').replace('{h}',String(info.heightM).replace('.',lang==='es'?',':'.')));if(info.firstYear)bits.push(lxt('since').replace('{y}',info.firstYear));
    if(bits.length)add(c,'p','').textContent=bits.join(' · ');if(info.blurb&&LX.k===0)add(c,'p','').textContent=info.blurb[lang];}
  var hasA=(LX.seq.fates||[]).some(function(f){return f.part==='fairingA';});
  var fates=(LX.seq.fates||[]).filter(function(f){if(f.part==='fairingB'&&hasA)return false;return LX.dropped[f.part]||(f.part==='fairing'&&LX.dropped.fairingA);});
  if(fates.length){add(c,'h3','').textContent=lxt('fates');var ul=add(c,'ul','');
    fates.slice().reverse().forEach(function(f){var li=add(ul,'li','');li.style.setProperty('--wc',LX_WCOL[f.where]||'#a7b0bd');if(newIds&&newIds.indexOf(f.part)>=0)li.classList.add('is-new');
      add(li,'b','').textContent=f.name[lang];add(li,'em','').textContent=lxt('where')[f.where]||'';add(li,'span','').textContent=f.fate[lang];lxSrc(li,f.src);});}
  c.scrollTop=0;
}
function lxSrc(el,url){if(!url)return;var a=add(el,'a','lx-src');a.href=url;a.target='_blank';a.rel='noopener';a.textContent=lang==='es'?'Fuente':'Source';}
function lxLeftSection(c,m){
  var q=typeof LAUNCH_SEQ!=='undefined'&&LAUNCH_SEQ&&LAUNCH_SEQ[m.id];if(!q||!q.left||!q.left.length)return;
  add(c,'h3','').textContent=lxt('left');var ul=add(c,'ul','lx-left');
  q.left.forEach(function(f){var li=add(ul,'li','');li.style.setProperty('--wc',LX_WCOL[f.where]||'#a7b0bd');add(li,'b','').textContent=f.name[lang];
    add(li,'em','').textContent=lxt('where')[f.where]||'';add(li,'span','').textContent=f.fate[lang];lxSrc(li,f.src);});
}
function lxWheel(e){e.preventDefault();LX.zoom=clamp(LX.zoom*Math.exp(e.deltaY*0.0012),0.1,7);}
function lxDrag(dx,dy){LX.az-=dx*0.006;LX.el=clamp(LX.el+dy*0.004,LX.h>1.5e5?-1.3:-0.35,1.35);LX.user=true;}

/* ---------- cuadro ---------- */
function lxFrame(s,dt){
  if(!LX.ready||LX.k!==s.k){lxEnter(s);}
  if(!LX.ready){JR.u=0;renderer.setClearColor(0x05070b,1);renderer.clear();return;}
  var steps=LX.seq.steps,T0=LX.T[s.k],T1=s.k<steps.length-1?LX.T[s.k+1]:T0+50,x=clamp(JR.u/(s.dur||1),0,1);
  if(T1-T0>900)T1=T0+900; /* los tramos muy largos (horas en órbita) se muestran comprimidos */
  LX.tau=T0+(T1-T0)*(x*x*(3-2*x)*0.5+x*0.5);
  if(LX.pend&&LX.pend.length&&JR.u>=LX.pendAt){var ids=LX.pend;LX.pend=null;ids.forEach(function(p){lxDrop(p,true);});lxFlames(s.k);lxFrameBox(false);lxCardFill(ids);}
  var t=LX.tau,h=lxAlt(t),R=LX.R;LX.h=h;CARD_DX=(W>760&&!lxCard.hidden)?Math.round((Math.min(380,W-32)+16)/2):0;
  R.root.rotation.z=-lxPitch(t);
  /* piezas sueltas */
  var axis=_lxW.set(0,1,0).applyQuaternion(R.root.quaternion);
  LX.debris.forEach(function(d){d.t+=dt;d.v.addScaledVector(axis,-dt*(2+d.t*1.2));d.g.position.addScaledVector(d.v,dt);d.g.rotation.x+=d.w.x*dt;d.g.rotation.z+=d.w.z*dt;});
  var vac=lxSmooth((h-18000)/80000);
  LX.flames.forEach(function(f){var u=f.userData,P=u.P,sol=u.type==='solid'||u.type==='kero',g=P.gain*(sol?1-0.55*vac:1),fl=0.92+0.16*Math.random();
    u.mats.forEach(function(m,i){m.uniforms.uT.value+=dt;m.uniforms.uSpread.value=(i?0.15:0.45)+vac*(i?1.6:5.5);m.uniforms.uLen.value=u.len*(i?0.55:1)*(1+0.7*vac);m.uniforms.uGain.value=g*(i?1.7:1)*fl;});
    if(u.sp)u.sp.material.opacity=0.5*g*fl;});
  lxSmoke(dt);
  /* si la máquina no da abasto durante varios segundos seguidos, se apagan las nubes, que son lo más costoso de la escena */
  if(LX.clouds.visible&&dt>0){LX.dtAvg=(LX.dtAvg||dt)*0.96+dt*0.04;if(LX.dtAvg>0.042){LX.slowN=(LX.slowN||0)+1;if(LX.slowN>100)LX.clouds.visible=false;}else LX.slowN=0;}
  if(LX.craft&&LX.craftGoal){var cs=LX.craft.scale.x;cs+=(LX.craftGoal-cs)*Math.min(1,dt*1.5);LX.craft.scale.setScalar(cs);if(Math.abs(cs-LX.craftGoal)>0.01)lxFrameBox(false);}
  /* reloj */
  var realT=typeof steps[s.k].t==='number';
  var txt=(t<0||s.k===0)?lxt('onpad'):!realT?lxt('later'):lxt('tplus')+' '+(t>=3600?Math.floor(t/3600)+':'+two(Math.floor(t%3600/60))+':'+two(Math.floor(t%60)):two(Math.floor(t/60))+':'+two(Math.floor(t%60)));
  if(JE.date.textContent!==txt)JE.date.textContent=txt;
  /* cámara: sigue al centro de lo que queda del cohete */
  if(!LX.user&&!reduce&&!jdrag)LX.az+=dt*0.035;
  /* lejos de la Tierra la cámara mira desde arriba, para que el planeta quede a la vista detrás de la nave */
  if(!LX.user&&!jdrag){var elW=0.1+0.35*lxSmooth((h-2.5e5)/1e6)+0.8*lxSmooth((h-1.5e6)/1.2e7);LX.el+=(elW-LX.el)*(Math.min(1,dt*2.5)||1);}
  R.root.updateMatrixWorld(true);var c=_lxV.copy(LX.ctr).applyMatrix4(R.root.matrixWorld);
  LX.tgt.lerp(c,Math.min(1,dt*3)||1);var want=LX.rad*3.3*LX.zoom;LX.dist+=(want-LX.dist)*(Math.min(1,dt*3.5)||1);
  lxRender();
  /* carteles de las piezas sueltas */
  var cr=lxCard.hidden?null:lxCard.getBoundingClientRect(),jb=cr?jr.getBoundingClientRect():null;
  LX.debris.forEach(function(d){if(!d.lab)return;var p=d.g.localToWorld(_lxV.copy(d.c)).project(LX.cam),px=(p.x*0.5+0.5)*W,py=(-p.y*0.5+0.5)*H;
    if(p.z>1||p.z<-1||Math.abs(p.x)>1.1||Math.abs(p.y)>1.1||d.t>14||(cr&&px<cr.right-jb.left+10&&px>cr.left-jb.left-190&&py>cr.top-jb.top-24&&py<cr.bottom-jb.top+8)){d.lab.style.display='none';return;}
    d.lab.style.display='';d.lab.style.transform='translate('+((p.x*0.5+0.5)*W+12).toFixed(1)+'px,'+((-p.y*0.5+0.5)*H-10).toFixed(1)+'px)';});
}
function lxRender(){
  if(!LX.fg||!LX.R)return;
  var cam=LX.cam,h=LX.h||0,t=LX.tau||0,turn=lxTurn(t),dark=lxSmooth((h-9000)/60000),day=LX.dayF;
  cam.aspect=W/H;if(typeof viewFor==='function')viewFor(cam);
  var ce=Math.cos(LX.el),dir=_lxW.set(ce*Math.cos(LX.az),Math.sin(LX.el),ce*Math.sin(LX.az));
  cam.position.copy(LX.tgt).addScaledVector(dir,LX.dist);
  /* la cámara no baja del suelo mientras el cohete está cerca de la plataforma */
  if(h<3000&&cam.position.y<-h+1.5)cam.position.y=-h+1.5;
  cam.up.set(0,1,0);cam.lookAt(LX.tgt);
  /* Tierra y suelo debajo del cohete */
  var qz=new THREE.Quaternion().setFromAxisAngle(_lxV.set(0,0,1),turn);
  LX.earth.position.set(0,-LX_R-h,0);LX.earth.quaternion.copy(qz).multiply(LX.q);
  LX.ground.visible=h<64000;LX.ground.position.set(-LX_R*Math.sin(turn),-h-LX_R*(1-Math.cos(turn)),0);LX.ground.quaternion.copy(qz);
  /* cielo: celeste de día o azul muy oscuro de noche, y negro al subir */
  LX.sky.setRGB(0,0,0);
  LX.zen.setRGB(0.045*day+0.0006,0.16*day+0.001,0.60*day+0.004);LX.hor.setRGB(0.42*day+0.002,0.62*day+0.004,0.90*day+0.012);
  var du=LX.dome.material.uniforms;du.uZen.value.copy(LX.zen);du.uHor.value.copy(LX.hor);du.uSun.value.copy(LX.sunV);du.uA.value=dark;du.uDay.value=day;LX.dome.position.copy(cam.position);
  LX.bg.fog.color.copy(LX.hor).multiplyScalar(1-0.5*dark);var hd=Math.sqrt(2*LX_R*h+h*h);LX.bg.fog.near=3000+hd*0.06;LX.bg.fog.far=5e4+hd*(1.15+6*dark*dark*dark);
  /* la bruma del suelo cercano es densa a nivel de la plataforma y, al subir, pasa a ser la misma que la de la Tierra de fondo */
  var fk=lxSmooth((h-1200)/7000);LX.fg.fog.color.copy(LX.hor).multiplyScalar(1-dark*(1-0.5*fk));LX.fg.fog.near=(900+h*0.2)*(1-fk)+LX.bg.fog.near*fk;LX.fg.fog.far=(9000+h*1.2)*(1-fk)+LX.bg.fog.far*fk;
  var gop=1-lxSmooth((h-5000)/9000),gfar=1-lxSmooth((h-20000)/42000);LX.land.material.opacity=gop;LX.slab.material.opacity=gop;LX.tower.visible=h<14000;LX.roadMat.opacity=gop;LX.sea.material.opacity=gfar;LX.far.material.opacity=gfar;
  LX.stars.material.opacity=Math.max(dark,(1-day)*0.8);LX.stars.position.copy(cam.position);
  LX.atmo.material.uniforms.uSun.value.copy(LX.sunV);LX.atmo.material.uniforms.uK.value=0.25+0.75*dark;
  LX.atmo2.material.uniforms.uSun.value.copy(LX.sunV);LX.atmo2.material.uniforms.uK.value=0.9*dark;LX.earth.material.emissiveIntensity=0.1+0.4*dark;
  var cu=LX.clouds.material.uniforms;cu.uSun.value.copy(LX.sunV);cu.uFogC.value.copy(LX.bg.fog.color);cu.uFog.value.set(LX.bg.fog.near,LX.bg.fog.far);
  LX.sunB.position.copy(LX.sunV);LX.sunB.intensity=0.2+2.3*day;
  var lit=Math.max(day,dark);
  LX.sun.position.copy(LX.tgt).addScaledVector(LX.sunL,500);LX.sun.target.position.copy(LX.tgt);LX.sun.intensity=0.12+2.5*lit;
  var sr=Math.max(12,LX.rad*1.5),sc=LX.sun.shadow.camera;if(Math.abs(sc.right-sr)>0.5){sc.left=-sr;sc.right=sr;sc.top=sr;sc.bottom=-sr;sc.near=10;sc.far=1100;sc.updateProjectionMatrix();}
  LX.fill.position.copy(cam.position);LX.fill.target.position.copy(LX.tgt);LX.fill.intensity=0.16+0.75*(1-lit);
  LX.hemi.intensity=0.10+0.12*day;
  var wantEnv=dark>0.5?1:0;if(LX.envLo&&wantEnv!==LX.envIs){LX.envIs=wantEnv;LX.fg.environment=(wantEnv?LX.envHi:LX.envLo).texture;}
  var gl=0;LX.flames.forEach(function(f){gl=Math.max(gl,f.userData.P.gain);});LX.glow.intensity=gl*2.6;LX.glow.distance=Math.max(120,LX.rad*9);
  LX.glow.position.copy(LX.R.root.position).addScaledVector(_lxV.set(0,1,0).applyQuaternion(LX.R.root.quaternion),-Math.max(4,LX.rad*0.25));
  var oe=renderer.outputEncoding,tm=renderer.toneMapping,ex=renderer.toneMappingExposure;
  renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.autoClear=false;renderer.setClearColor(LX.sky,1);renderer.clear(true,true,true);
  cam.near=Math.max(50,h*0.2);cam.far=9e7;cam.updateProjectionMatrix();cam.updateMatrixWorld(true);renderer.render(LX.bg,cam);
  renderer.clearDepth();
  lxSkyDraw(cam,dark);
  cam.near=Math.max(0.3,LX.dist*0.02);cam.far=Math.max(30000,LX.dist*600,LX.ground.visible?h*1.7+60000:0);cam.updateProjectionMatrix();renderer.render(LX.fg,cam);
  renderer.autoClear=true;renderer.outputEncoding=oe;renderer.toneMapping=tm;renderer.toneMappingExposure=ex;
}
/* ---------- abrir una misión desde la portada ---------- */
function openMission(m,n){
  /* si los datos de las trayectorias todavía están llegando, la portada se queda a la vista hasta que estén */
  if(typeof HZ_READY!=='undefined'&&!HZ_READY&&(n||0)<80){document.documentElement.style.cursor='progress';setTimeout(function(){openMission(m,(n||0)+1);},250);return;}
  document.documentElement.style.cursor='';
  if(typeof homeHide==='function')homeHide();
  var pre=typeof ROCKET_GLB!=='undefined'&&lxOk(m)&&ROCKET_GLB[lxKey(m)];if(pre)modelOf(pre,function(){});
  var X=JX[m.id];if(!X){exGoMachine(m);return;}
  JR.fromExplore=false;JR.landFrom=true;
  startJourney(m,lxOk(m)?'lanzamiento':(X.only?'hoy':'salida'));
}
