/* ---------- juego: la escena 3D ----------
   La nave de la misión inventada, dibujada con formas simples, en cinco lugares: la plataforma, el viaje, la llegada,
   el suelo y la órbita del asteroide. Todo es ilustrativo: ni los tamaños ni las distancias son reales.
   Cada alerta, cada arreglo y cada respuesta equivocada tiene su animación escrita a mano (MGS_ALERT, MGS_FIX, MGS_FAULT):
   son funciones que, cuadro a cuadro, parten de la pose normal de la etapa y la cambian según el tiempo.
   Tiene su propio lienzo y su propio renderer, dentro de la pantalla del juego; el cuadro lo marca tick() (ver tools/build.py).
   API: mgsOpen(host), mgsClose(), mgsSetup(id), mgsGo(phase), mgsAlert(key,sys), mgsFix(key,cb), mgsFault(key,k,cb), mgsCalm(). */
var MGS={on:false,ready:false,cv:null,gl:null,scene:null,cam:null,id:null,phase:'',kind:'',t:0,mode:'calm',mt:0,key:'',k:0,cb:null,dur:0,fired:{},sys:null,
  parts:{},mats:[],lamps:[],cam0:{az:0.6,el:0.16,dist:14,x:0,y:0,z:0},camT:{az:0.6,el:0.16,dist:14,x:0,y:0,z:0},mark:{x:0,y:0,vis:false},hooks:{},P:null,w:0,h:0};
function mgsR(t,a,b){return clamp((t-a)/(b-a),0,1);}
function mgsE(x){return x*x*(3-2*x);}
/* three r128 no convierte los colores: se pasan a lineal a mano, porque la salida es sRGB */
function mgsCol(c){return new THREE.Color(c).convertSRGBToLinear();}
function mgsRod(p,m,r,x0,y0,z0,x1,y1,z1){var a=new THREE.Vector3(x0,y0,z0),b=new THREE.Vector3(x1,y1,z1),o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,a.distanceTo(b),8),m);
  o.position.copy(a).add(b).multiplyScalar(0.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.sub(a).normalize());p.add(o);return o;}
function mgsMat(c,rough,metal,flat){var m=new THREE.MeshStandardMaterial({color:mgsCol(c),roughness:rough==null?0.7:rough,metalness:metal||0,flatShading:!!flat});m.userData.base=mgsCol(c);MGS.mats.push(m);return m;}
function mgsMesh(g,m,p,x,y,z){var o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);p.add(o);return o;}
function mgsLamp(p,x,y,z,c){var m=new THREE.MeshBasicMaterial({color:mgsCol(c||0xffd08a),fog:false});m.userData.base=mgsCol(c||0xffd08a);MGS.lamps.push(m);return mgsMesh(new THREE.SphereGeometry(0.07,10,8),m,p,x,y,z);}
function mgsFlame(p,len,rad){var g=new THREE.Group(),c=new THREE.ConeGeometry(rad,len,18,1,true);c.translate(0,-len/2,0);
  g.add(new THREE.Mesh(c,new THREE.MeshBasicMaterial({color:0xff7a1c,toneMapped:false,fog:false,transparent:true,opacity:0.55,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})));
  var c2=new THREE.ConeGeometry(rad*0.5,len*0.6,14,1,true);c2.translate(0,-len*0.3,0);
  g.add(new THREE.Mesh(c2,new THREE.MeshBasicMaterial({color:0xffe9a8,toneMapped:false,fog:false,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})));
  g.visible=false;p.add(g);return g;}
function mgsDish(p,x,y,z,r){var piv=new THREE.Group();piv.position.set(x,y,z);p.add(piv);
  var d=new THREE.Mesh(new THREE.SphereGeometry(r,20,10,0,Math.PI*2,0,0.95),mgsMat(0xe8ecf2,0.5,0.1));d.material.side=THREE.DoubleSide;d.rotation.x=Math.PI;d.position.y=r*0.95;piv.add(d);
  mgsMesh(new THREE.CylinderGeometry(0.03,0.03,r*0.8,6),mgsMat(0x9aa3ad),piv,0,r*0.5,0);return piv;}
function mgsPanel(p,w,d,x,y,z){var m=mgsMat(0x1f3f8f,0.35,0.5);m.emissive=mgsCol(0x16307a);var o=mgsMesh(new THREE.BoxGeometry(w,0.06,d),m,p,x,y,z);
  for(var i=1;i<4;i++)mgsMesh(new THREE.BoxGeometry(0.03,0.07,d),mgsMat(0xc9d2e0,0.4,0.6),o,-w/2+w*i/4,0,0);return o;}
/* las tres naves; cada una deja en `parts` las piezas que una alerta puede señalar */
function mgsCraft(id){
  var g=new THREE.Group(),P={},gold=mgsMat(0xc99a3a,0.45,0.75),grey=mgsMat(0xb9c0c9,0.6,0.3),dark=mgsMat(0x2a2f38,0.7,0.2),i,a;
  if(id==='asteroid'){
    P.body=mgsMesh(new THREE.BoxGeometry(1.5,1.5,2.0),gold,g);
    P.panels=[mgsPanel(g,4.4,1.5,-3.1,0,0),mgsPanel(g,4.4,1.5,3.1,0,0)];mgsMesh(new THREE.CylinderGeometry(0.05,0.05,6.3,6),grey,g).rotation.z=Math.PI/2;
    P.dish=mgsDish(g,0,0.75,0.2,0.85);P.engine=mgsMesh(new THREE.CylinderGeometry(0.22,0.42,0.6,16,1,true),dark,g,0,0,-1.3);P.engine.rotation.x=Math.PI/2;P.engine.material.side=THREE.DoubleSide;
    P.flame=mgsFlame(g,3.2,0.4);P.flame.position.set(0,0,-1.6);P.flame.rotation.x=Math.PI/2;
    mgsLamp(g,0.5,0.5,1.02);mgsLamp(g,-0.5,-0.5,1.02,0x9fe0ff);
  }else{
    /* módulo de aterrizaje: lo usan Farol 1 y, como plataforma, Huella 1 */
    P.body=mgsMesh(new THREE.CylinderGeometry(1.25,1.25,0.8,8),gold,g,0,1.25,0);
    for(i=0;i<4;i++){a=Math.PI/4+i*Math.PI/2;var cx=Math.cos(a),cz=Math.sin(a);mgsRod(g,grey,0.055,cx*1.15,1.45,cz*1.15,cx*2.15,0.08,cz*2.15);mgsRod(g,grey,0.04,cx*1.15,0.9,cz*1.15,cx*1.9,0.4,cz*1.9);
      mgsMesh(new THREE.CylinderGeometry(0.28,0.28,0.07,12),grey,g,cx*2.15,0.04,cz*2.15);}
    P.engine=mgsMesh(new THREE.CylinderGeometry(0.2,0.42,0.5,16,1,true),dark,g,0,0.62,0);P.engine.material.side=THREE.DoubleSide;
    P.flame=mgsFlame(g,3.0,0.42);P.flame.position.set(0,0.4,0);
    if(id==='moon'){P.panels=[mgsPanel(g,1.5,1.0,-1.5,1.75,0),mgsPanel(g,1.5,1.0,1.5,1.75,0)];P.panels[0].rotation.z=0.35;P.panels[1].rotation.z=-0.35;
      P.dish=mgsDish(g,0.2,1.65,-0.5,0.6);mgsMesh(new THREE.CylinderGeometry(0.05,0.05,1.5,6),grey,g,0.9,0.9,0.85);mgsLamp(g,0,1.5,1.27);mgsLamp(g,0.9,1.3,0.9,0x9fe0ff);}
    else{
      mgsMesh(new THREE.BoxGeometry(2.3,0.06,1.2),grey,g,0,1.68,0);
      var r=new THREE.Group();r.position.set(0,1.7,0);g.add(r);P.rover=r;P.body=mgsMesh(new THREE.BoxGeometry(1.5,0.36,0.95),mgsMat(0xdfe3e8,0.6,0.2),r,0,0.5,0);
      P.panels=[mgsPanel(r,1.7,1.15,0,0.72,0)];P.wheels=[];
      for(i=0;i<6;i++){var wz=(i%2?-1:1)*0.62,wx=(Math.floor(i/2)-1)*0.68,wh=mgsMesh(new THREE.CylinderGeometry(0.24,0.24,0.2,14),dark,r,wx,0.24,wz);wh.rotation.x=Math.PI/2;P.wheels.push(wh);
        mgsMesh(new THREE.BoxGeometry(0.05,0.3,0.05),grey,r,wx,0.4,wz*0.9);}
      mgsMesh(new THREE.CylinderGeometry(0.035,0.035,0.8,6),grey,r,0.55,1.1,0.25);mgsMesh(new THREE.BoxGeometry(0.3,0.13,0.14),mgsMat(0xf2f4f7),r,0.55,1.52,0.25);
      P.dish=mgsDish(r,-0.45,0.75,-0.2,0.32);mgsLamp(r,0.55,1.52,0.33,0x9fe0ff);mgsLamp(r,0.76,0.5,0);
    }
  }
  g.traverse(function(o){if(o.isMesh){o.castShadow=true;}});MGS.parts=P;return g;
}
function mgsInit(host){
  var S=MGS;S.cv=add(host,'canvas','mgs-cv');S.gl=new THREE.WebGLRenderer({canvas:S.cv,antialias:true,alpha:false});S.gl.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  S.gl.outputEncoding=THREE.sRGBEncoding;S.gl.toneMapping=THREE.ACESFilmicToneMapping;S.gl.toneMappingExposure=1.15;
  S.scene=new THREE.Scene();S.scene.background=new THREE.Color(0x02030a);S.scene.fog=new THREE.Fog(0x02030a,2e4,4e4);S.cam=new THREE.PerspectiveCamera(42,1,0.3,16000);
  S.sun=new THREE.DirectionalLight(0xfff4e2,2.4);S.sun.position.set(40,55,-30);S.scene.add(S.sun);S.amb=new THREE.HemisphereLight(0x9db4d8,0x1a1410,0.5);S.scene.add(S.amb);
  /* estrellas */
  var n=1800,sp=new Float32Array(n*3),i,v=new THREE.Vector3();for(i=0;i<n;i++){v.set(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1).normalize().multiplyScalar(9000);sp[i*3]=v.x;sp[i*3+1]=v.y;sp[i*3+2]=v.z;}
  var sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));S.stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xdfe8ff,size:1.6,sizeAttenuation:false,transparent:true,opacity:0.9,depthWrite:false,fog:false}));S.scene.add(S.stars);
  /* mundos */
  var TL=new THREE.TextureLoader(),tx=function(u){var t=TL.load(u);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t;};
  S.earth=mgsMesh(new THREE.SphereGeometry(1,64,32),new THREE.MeshStandardMaterial({map:tx('assets/textures/earth_day_2048.jpg'),roughness:0.9,fog:false}),S.scene);
  S.moon=mgsMesh(new THREE.SphereGeometry(1,64,32),new THREE.MeshStandardMaterial({map:tx('assets/textures/moon_lroc_color_2k.jpg'),roughness:1,fog:false}),S.scene);
  S.mars=mgsMesh(new THREE.SphereGeometry(1,64,32),new THREE.MeshStandardMaterial({map:tx('assets/textures/mars.jpg'),roughness:1,fog:false}),S.scene);
  var ag=new THREE.IcosahedronGeometry(1,4),ap=ag.attributes.position;for(i=0;i<ap.count;i++){v.fromBufferAttribute(ap,i);var q=1+0.16*Math.sin(v.x*3.1+1)*Math.cos(v.y*2.7)+0.1*Math.sin(v.z*5.3+v.x*2)+0.05*Math.sin(v.y*9+v.z*7);v.multiplyScalar(q);v.x*=1.35;ap.setXYZ(i,v.x,v.y,v.z);}
  ag.computeVertexNormals();S.asteroid=mgsMesh(ag,new THREE.MeshStandardMaterial({color:mgsCol(0x4d463e),roughness:1,flatShading:true,fog:false}),S.scene);
  /* suelo, rocas y plataforma */
  S.ground=mgsMesh(new THREE.CircleGeometry(6000,64),new THREE.MeshStandardMaterial({color:0x777777,roughness:1}),S.scene);S.ground.rotation.x=-Math.PI/2;
  S.shadow=mgsMesh(new THREE.CircleGeometry(1,28),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.35,depthWrite:false,fog:false}),S.scene,0,0.03,0);S.shadow.rotation.x=-Math.PI/2;
  S.rocks=[];S.rockMat=new THREE.MeshStandardMaterial({color:0x888888,roughness:1,flatShading:true,emissive:mgsCol(0xff3b2a),emissiveIntensity:0});
  for(i=0;i<16;i++){var rk=mgsMesh(new THREE.IcosahedronGeometry(1,0),S.rockMat,S.scene);rk.userData.s=0.35+((i*37)%10)/10*0.75;rk.userData.a=i*2.399;rk.rotation.set(i,i*1.7,i*0.4);S.rocks.push(rk);}
  S.pad=new THREE.Group();S.scene.add(S.pad);mgsMesh(new THREE.CylinderGeometry(9,10,0.5,40),new THREE.MeshStandardMaterial({color:mgsCol(0x3a3f47),roughness:0.9}),S.pad,0,0.25,0);
  var tw=new THREE.MeshStandardMaterial({color:mgsCol(0x4a505a),roughness:0.7,metalness:0.4}),ty;
  [[-3.9,-0.5],[-3.9,0.5],[-2.9,-0.5],[-2.9,0.5]].forEach(function(q){mgsRod(S.pad,tw,0.07,q[0],0.5,q[1],q[0],16.5,q[1]);});
  for(ty=1.5;ty<16.5;ty+=1.5){mgsRod(S.pad,tw,0.045,-3.9,ty,0.5,-2.9,ty+1.5,0.5);mgsRod(S.pad,tw,0.045,-2.9,ty,-0.5,-3.9,ty+1.5,-0.5);mgsRod(S.pad,tw,0.045,-3.9,ty,-0.5,-3.9,ty,0.5);mgsRod(S.pad,tw,0.045,-2.9,ty,-0.5,-2.9,ty,0.5);}
  S.arms=[mgsRod(S.pad,tw,0.09,-2.9,11.5,0,-0.75,11.5,0),mgsRod(S.pad,tw,0.09,-2.9,6,0,-0.75,6,0)];
  mgsMesh(new THREE.SphereGeometry(0.16,10,8),new THREE.MeshBasicMaterial({color:0xff3b2a,toneMapped:false,fog:false}),S.pad,-3.4,16.8,0);
  S.flood=new THREE.PointLight(0xffe2b0,1.6,70,1.4);S.flood.position.set(7,2.5,9);S.pad.add(S.flood);var f2=new THREE.PointLight(0xbfd4ff,0.9,70,1.4);f2.position.set(-8,3,-8);S.pad.add(f2);S.flood2=f2;
  try{var R=buildRocket3D('atlasV401');S.rocket=new THREE.Group();R.root.scale.setScalar(14/R.height);S.rocket.add(R.root);S.rocket.position.y=0.5;S.pad.add(S.rocket);
    S.rFlame=mgsFlame(S.rocket,9,0.9);S.rFlame.position.y=0.2;}catch(e){S.rocket=new THREE.Group();S.pad.add(S.rocket);S.rFlame=mgsFlame(S.rocket,9,0.9);}
  /* nubes de tormenta y rayo */
  var cc=document.createElement('canvas');cc.width=cc.height=128;var cx=cc.getContext('2d'),gr=cx.createRadialGradient(64,64,6,64,64,62);gr.addColorStop(0,'rgba(70,78,92,1)');gr.addColorStop(1,'rgba(40,46,58,0)');cx.fillStyle=gr;cx.fillRect(0,0,128,128);
  var ct=new THREE.CanvasTexture(cc);ct.encoding=THREE.sRGBEncoding;S.cloudMat=new THREE.SpriteMaterial({map:ct,transparent:true,opacity:0,depthWrite:false,fog:false});S.clouds=new THREE.Group();S.pad.add(S.clouds);
  for(i=0;i<14;i++){var cl=new THREE.Sprite(S.cloudMat);cl.position.set(Math.cos(i*2.4)*(75+(i%5)*12),17+(i%4)*7,Math.sin(i*2.4)*(75+(i%5)*12));cl.scale.set(90+(i%3)*30,30+(i%2)*10,1);S.clouds.add(cl);}
  S.bolt=new THREE.Line(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(30),3)),new THREE.LineBasicMaterial({color:0xeaf2ff,toneMapped:false,fog:false}));S.bolt.visible=false;S.bolt.frustumCulled=false;S.pad.add(S.bolt);S.boltT=0;
  /* camino previsto, camino real (rojo) y haz de radio */
  var pn=260,pp=new Float32Array(pn*3);for(i=0;i<pn;i++)pp[i*3+2]=(i-pn/2)*3.2;var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
  S.path=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffd08a,size:2.6,sizeAttenuation:false,toneMapped:false,fog:false,transparent:true,opacity:0.75,depthWrite:false}));S.path.frustumCulled=false;S.scene.add(S.path);
  S.veer=new THREE.Line(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(72),3)),new THREE.LineBasicMaterial({color:0xff6b5a,toneMapped:false,fog:false}));S.veer.frustumCulled=false;S.scene.add(S.veer);
  S.beam=new THREE.Line(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3)),new THREE.LineBasicMaterial({color:0x7fd49a,toneMapped:false,fog:false,transparent:true}));S.beam.frustumCulled=false;S.scene.add(S.beam);
  /* partículas: humo, polvo y chispas */
  S.pN=420;S.pP=new Float32Array(S.pN*3);S.pC=new Float32Array(S.pN*3);S.pV=new Float32Array(S.pN*3);S.pL=new Float32Array(S.pN);S.pB=new Float32Array(S.pN*4);S.pI=0;
  var g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.BufferAttribute(S.pP,3));g2.setAttribute('color',new THREE.BufferAttribute(S.pC,3));
  var pc=document.createElement('canvas');pc.width=pc.height=64;var px=pc.getContext('2d'),g3=px.createRadialGradient(32,32,2,32,32,30);g3.addColorStop(0,'rgba(255,255,255,1)');g3.addColorStop(1,'rgba(255,255,255,0)');px.fillStyle=g3;px.fillRect(0,0,64,64);
  S.pts=new THREE.Points(g2,new THREE.PointsMaterial({size:0.9,map:new THREE.CanvasTexture(pc),vertexColors:true,toneMapped:false,fog:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));S.pts.frustumCulled=false;S.scene.add(S.pts);
  S.ready=true;
}
function mgsPuff(x,y,z,n,col,sp,up,life){var S=MGS,c=mgsCol(col),i,j;for(i=0;i<n;i++){j=S.pI=(S.pI+1)%S.pN;S.pP[j*3]=x;S.pP[j*3+1]=y;S.pP[j*3+2]=z;
  S.pV[j*3]=(Math.random()-0.5)*sp;S.pV[j*3+1]=(Math.random()-0.5)*sp+(up||0);S.pV[j*3+2]=(Math.random()-0.5)*sp;S.pL[j]=S.pB[j*4+3]=(life||1.2)*(0.6+Math.random()*0.6);S.pB[j*4]=c.r;S.pB[j*4+1]=c.g;S.pB[j*4+2]=c.b;}}
function mgsOnce(name,cond,fn){if(cond&&!MGS.fired[name]){MGS.fired[name]=1;fn();}}
function mgsHook(n,a,b){var f=MGS.hooks[n];if(f)f(a,b);}
function mgsStrike(tx,ty,tz){var S=MGS,a=S.bolt.geometry.attributes.position,i,x0=tx+(Math.random()-0.5)*14,z0=tz+(Math.random()-0.5)*8;
  for(i=0;i<10;i++){var u=i/9;a.setXYZ(i,x0+(tx-x0)*u+(i&&i<9?(Math.random()-0.5)*2.4:0),30+(ty-30)*u,z0+(tz-z0)*u+(i&&i<9?(Math.random()-0.5)*2.4:0));}
  a.needsUpdate=true;S.boltT=0.16;mgsHook('flash','#dfe8ff',0.5);}

function mgsOpen(host){if(!MGS.ready)mgsInit(host);MGS.on=true;}
function mgsClose(){MGS.on=false;}
function mgsSetup(id){var S=MGS;if(S.craft){S.scene.remove(S.craft);}S.mats=S.mats.filter(function(){return false;});S.lamps=[];S.id=id;S.craft=mgsCraft(id);S.scene.add(S.craft);
  if(S.plat){S.scene.remove(S.plat);S.plat=null;}S.phase='';for(var i=0;i<S.pN;i++)S.pL[i]=0;}
/* etapa -> lugar. kind: pad (plataforma), space (viaje), land (llegada con motor), ground (en el suelo), near (junto al asteroide) */
function mgsGo(phase){
  var S=MGS,id=S.id,kind=phase==='launch'?'pad':(phase==='cruise'?'space':(id==='asteroid'?'near':(phase==='arrival'?'land':'ground')));
  S.phase=phase;S.kind=kind;S.mode='calm';S.mt=0;S.fired={};S.sys=null;
  var surf=kind==='land'||kind==='ground',C=S.camT;
  S.pad.visible=kind==='pad';S.craft.visible=kind!=='pad';S.ground.visible=surf||kind==='pad';S.path.visible=kind==='space';
  S.rocks.forEach(function(r,i){r.visible=surf;var d=kind==='land'?(0.8+(i%5)*0.95):(9+i*3.1),s=r.userData.s*(kind==='land'?1.15:1);r.position.set(Math.cos(r.userData.a)*d,s*0.35,Math.sin(r.userData.a)*d);r.scale.set(s,s*0.75,s);});
  S.rockMat.color.copy(mgsCol(id==='mars'?0x7a4630:0x7d7d78));S.ground.material.color.copy(mgsCol(kind==='pad'?0x23272e:(id==='mars'?0x8a4a30:0x505256)));
  S.fogD=kind==='pad'?[70,700]:(surf?[60,1400]:[2e4,4e4]);
  S.sky=new THREE.Color(kind==='pad'?0x101d33:((surf&&id==='mars')?0xa9805f:0x02030a));S.stars.visible=!(kind==='pad'||(surf&&id==='mars'));
  S.earth.visible=kind==='space'||(surf&&id==='moon');S.moon.visible=kind==='space'&&id==='moon';S.mars.visible=kind==='space'&&id==='mars';S.asteroid.visible=id==='asteroid'&&kind!=='pad';
  if(kind==='space'){S.earth.position.set(-420,-260,-1900);S.earth.scale.setScalar(210);var d=id==='moon'?S.moon:(id==='mars'?S.mars:S.asteroid);d.position.set(160,90,1900);d.scale.setScalar(id==='asteroid'?14:70);}
  if(surf&&id==='moon'){S.earth.position.set(-700,520,1900);S.earth.scale.setScalar(120);}
  if(kind==='near'){S.asteroid.scale.setScalar(24);}
  /* Huella 1: en el viaje y la llegada el rover va sobre la plataforma; en el suelo ya bajó y la plataforma queda atrás */
  if(id==='mars'&&S.parts.rover){var r=S.parts.rover;if(kind==='ground'){if(!S.plat){S.plat=new THREE.Group();S.scene.add(S.plat);}
      while(S.craft.children.length){var c=S.craft.children[0];if(c===r){S.craft.remove(r);continue;}S.plat.add(c);}S.craft.add(r);r.position.set(0,0,0);S.plat.position.set(-8,0,-7);S.plat.rotation.y=0.6;S.plat.visible=true;}
    else if(S.plat){while(S.plat.children.length)S.craft.add(S.plat.children[0]);r.position.set(0,1.7,0);S.plat.visible=false;}}
  var view={pad:[0.9,0.06,34,0,7,0],space:[0.7,0.2,15,0,0,0],land:[0.5,0.12,24,0,5.5,0],ground:[0.7,0.15,id==='mars'?9.5:14,0,1,0],near:[-2.0,0.16,17,0,0,0]}[kind];
  C.az=view[0];C.el=view[1];C.dist=view[2];C.x=view[3];C.y=view[4];C.z=view[5];for(var k in C)S.cam0[k]=C[k];S.cam0.dist*=1.25;
}
function mgsCalm(){MGS.mode='calm';MGS.mt=0;MGS.fired={};MGS.sys=null;mgsHook('signal',false);mgsHook('glitch',false);}
function mgsAlert(key,sys){MGS.mode='alert';MGS.key=key;MGS.sys=sys;MGS.mt=0;MGS.fired={};mgsHook('signal',false);mgsHook('glitch',false);}
function mgsFix(key,cb){var F=MGS_FIX[key];MGS.mode='fix';MGS.key=key;MGS.mt=0;MGS.fired={};MGS.dur=F?F.d:1.5;MGS.cb=cb;MGS.hold=MGS.P;}
function mgsFault(key,k,cb){var F=MGS_FAULT[key+k];MGS.mode='fault';MGS.key=key;MGS.k=k;MGS.mt=0;MGS.fired={};MGS.dur=F?F.d:3;MGS.cb=cb;MGS.hold=MGS.P;}
/* pose normal de cada lugar */
function mgsBase(t){
  var S=MGS,k=S.kind,P={x:0,y:0,z:0,rx:0,ry:0,rz:0,flame:0,power:1,tint:0,tk:0,veer:0,storm:0,rY:0,rFlame:0,rTilt:0,astZ:78,astX:0,spin:0,sink:0,dish:0,beam:0,beamBad:0,hot:0,shake:0,night:0,wind:0,sky:0,lapse:0};
  if(k==='space'){P.rx=S.id==='asteroid'?0:Math.PI/2;P.rz=Math.sin(t*0.3)*0.05;}
  if(k==='land'){P.y=6.5+Math.sin(t*1.3)*0.25;P.flame=0.75;}
  if(k==='near'){P.ry=S.phase==='arrival'?Math.PI:0.5;P.flame=S.phase==='arrival'?1:0;P.astX=6;if(S.phase!=='arrival'){P.astZ=58;P.astX=16;}}
  if(k==='ground'){P.dish=Math.sin(t*0.4)*0.2;}
  return P;
}
/* ---- la alerta mientras espera una decisión ---- */
var MGS_ALERT={
  storm:function(P,t){P.storm=mgsE(mgsR(t,0,1.2));if(t>1&&Math.random()<0.012)mgsStrike((Math.random()-0.5)*40,22,-16);},
  attitude:function(P,t){P.rz+=t*0.55;P.rx+=Math.sin(t*0.5)*0.35;P.power=0.55+0.25*Math.sin(t*7);},
  course:function(P,t){P.veer=0.16*mgsE(mgsR(t,0,1.5));},
  boulders:function(P,t){P.hot=0.55+0.45*Math.sin(t*5);},
  burn:function(P,t){P.flame=t<0.5?(Math.sin(t*40)>0?1:0):0;P.astZ=78-Math.min(30,t*2);},
  wheel:function(P,t){P.x=Math.sin(t*26)*0.02*(1-mgsR(t,0,1.5));},
  night:function(P,t){P.night=0.32*mgsE(mgsR(t,0,2));},
  fuel:function(P,t){P.dish=Math.sin(t*2.2)*0.3;if(Math.random()<0.03)mgsPuff(0.9,0.2,0.6,2,0xcfe8ff,0.5,0,0.5);},
  dust:function(P,t){P.tint=2;P.tk=0.75*mgsE(mgsR(t,0,1.5));P.power=1-0.4*mgsR(t,0,1.5);},
  upload:function(P,t){P.beam=0.35+0.3*Math.sin(t*4);}
};
/* ---- lo que pasa cuando la decisión es buena ---- */
var MGS_FIX={
  storm:{d:6,f:function(P,t){P.storm=1-mgsE(mgsR(t,0,1.6));var u=mgsR(t,1.9,6);P.rFlame=t>1.7?1:0;P.rY=240*u*u;P.shake=t>1.7?0.3*(1-u):0;P.sky=mgsR(t,3,6);
    if(t>1.7&&t<4&&Math.random()<0.6)mgsPuff((Math.random()-0.5)*3,1,(Math.random()-0.5)*3,3,0x8a8f98,7,1.5,2.2);}},
  attitude:{d:2.6,f:function(P,t,H){var e=1-mgsE(mgsR(t,0,1.8));P.rz=H.rz%(Math.PI*2)*e;P.rx=Math.PI/2*(MGS.id==='asteroid'?0:1)+(H.rx-(MGS.id==='asteroid'?0:Math.PI/2))*e;P.power=1-0.4*e;mgsOnce('ok',t>1.8,function(){mgsHook('flash','#7fd49a',0.25);});}},
  course:{d:2.4,f:function(P,t){P.flame=t>0.3&&t<0.9?1:0;P.veer=0.16*(1-mgsE(mgsR(t,0.5,1.9)));}},
  boulders:{d:3.8,f:function(P,t){P.x=14*mgsE(mgsR(t,0.2,2.1));P.y=6.5*(1-mgsE(mgsR(t,1.9,3.3)));P.flame=t<3.3?0.75:0;P.hot=0;mgsOnce('td',t>3.25,function(){mgsPuff(14,0.3,0,40,0xb7a48c,5,0.6,1.6);});}},
  burn:{d:3.6,f:function(P,t){P.flame=0;P.astZ=48-160*mgsE(mgsR(t,0.2,3.6));P.astX=6+34*mgsR(t,0.2,3.6);}},
  wheel:{d:3.6,f:function(P,t){var u=mgsR(t,0.3,3.6);P.x=-4.5*u;P.spin=-t*2.2;if(u>0&&u<1&&Math.random()<0.3)mgsPuff(P.x+0.7,0.1,0.6,1,0xb07a56,0.6,0.2,0.9);}},
  night:{d:4.6,f:function(P,t){P.night=mgsE(mgsR(t,0,1.5))-mgsE(mgsR(t,3.1,4.6));P.power=t>0.9&&t<3.6?0.12:1;}},
  fuel:{d:3.2,f:function(P,t){P.dish=0;P.beam=mgsR(t,0.4,1)*(0.6+0.4*Math.sin(t*14));}},
  dust:{d:3.8,f:function(P,t){P.tint=2;P.tk=0.75-0.5*mgsE(mgsR(t,1.6,3.6));P.power=0.6+0.4*mgsR(t,2.6,3.8);P.wind=t>1.2&&t<3.4?1:0;}},
  upload:{d:2.8,f:function(P,t){P.beam=t<1.9?(0.6+0.4*Math.sin(t*16)):0;mgsOnce('ok',t>1.7,function(){mgsHook('flash','#7fd49a',0.25);});}}
};
/* ---- los veinte errores posibles: evento + número de opción ---- */
var MGS_FAULT={
  /* despegar con la tormenta encima: un rayo alcanza el cohete */
  storm0:{d:4,f:function(P,t){P.storm=1;var u=mgsR(t,0.2,2.6);P.rY=46*u*u;P.rFlame=t>0.2&&t<1.75?1:(t<2.2&&Math.sin(t*50)>0?0.6:0);
    mgsOnce('b',t>1.6,function(){mgsStrike(0,P.rY+14,0);mgsHook('flash','#ffffff',0.9);});P.shake=t>1.6?0.7*(1-mgsR(t,1.6,3)):0.15;P.power=t>1.6?0:1;P.rTilt=0.55*mgsE(mgsR(t,1.8,3.8));
    if(t>1.7&&Math.random()<0.4)mgsPuff(0,P.rY+8,0,2,0xffb060,3,0,0.7);}},
  /* cancelar: la tormenta pasa y el cohete queda apagado en la plataforma */
  storm2:{d:3.6,f:function(P,t){P.storm=1-mgsE(mgsR(t,1.2,3));P.power=t>0.4?0:1;P.night=0.55*mgsE(mgsR(t,0.3,1.4));}},
  /* motor principal con la nave girando: sale disparada fuera del camino */
  attitude0:{d:3.6,f:function(P,t,H){var u=mgsR(t,0.3,3.4);P.flame=t>0.3?1:0;P.rz=H.rz+t*t*1.3;P.rx=H.rx+t*1.1;P.x=7*u*u;P.y=3.5*u*u;P.veer=1.2*u;P.shake=0.25;}},
  /* seguir midiendo: la batería se agota y se pierde el contacto */
  attitude1:{d:3.8,f:function(P,t,H){P.rz=H.rz+t*0.55;P.rx=H.rx;P.power=Math.max(0,0.6-mgsR(t,0.3,2.2));P.tint=3;P.tk=0.9*mgsR(t,0.8,2.8);mgsOnce('s',t>2.7,function(){mgsHook('signal',true);});}},
  /* esperar: el desvío crece hasta pasar lejos del destino */
  course0:{d:3.6,f:function(P,t){var u=mgsR(t,0.2,3.2);P.veer=0.16+1.9*u*u;P.x=9*u*u;mgsOnce('f',t>2.8,function(){mgsHook('flash','#ff6b5a',0.3);});}},
  /* encendido demasiado largo: se pasa para el otro lado y gasta el combustible */
  course2:{d:3.6,f:function(P,t){var u=mgsR(t,0.3,2.8);P.flame=t>0.2&&t<2.7?1:(t<3.1&&Math.sin(t*45)>0?0.5:0);P.veer=0.16-2.1*u;P.x=-8*u*u;P.shake=t<2.7?0.2:0;}},
  /* bajar entre las rocas: una pata queda sobre una piedra y la nave se vuelca */
  boulders0:{d:3.6,f:function(P,t){P.hot=1;P.y=6.5-5.6*mgsE(mgsR(t,0.2,1.8));P.flame=t<1.8?0.75:0;var u=mgsR(t,1.8,2.7);P.rz=1.3*u*u;P.x=1.2*u;P.y-=0.2*u;
    mgsOnce('d',t>1.75,function(){mgsPuff(0,0.4,0,30,0xb7a48c,5,0.5,1.4);});P.shake=t>1.8&&t<2.9?0.5:0;P.power=t>2.6?0.3:1;}},
  /* apagar el motor antes: cae y golpea el suelo */
  boulders1:{d:3.4,f:function(P,t){var u=mgsR(t,0.3,1.25);P.flame=t<0.3?0.75:0;P.y=6.5-6.1*u*u;if(t>1.25){P.y=0.4;P.sink=0.5;P.rz=0.4;P.rx=0.2;P.power=0;}
    mgsOnce('i',t>1.25,function(){mgsPuff(0,0.4,0,90,0xc9b79e,9,1.2,2);mgsHook('flash','#ffffff',0.7);});P.shake=t>1.25?1*(1-mgsR(t,1.25,2.6)):0;}},
  /* encender una y otra vez un motor que falló: termina roto */
  burn0:{d:3.6,f:function(P,t){P.astZ=48-t*2;P.flame=t<2.2?(Math.sin(t*9)>0.5?1:0):0;mgsOnce('x',t>2.2,function(){mgsPuff(0,0,1.6,70,0xff9a3c,9,0,1.3);mgsHook('flash','#ffb060',0.7);});
    P.shake=t>2.2?0.8*(1-mgsR(t,2.2,3.4)):0.1;if(t>2.2){P.rz=(t-2.2)*0.9;P.rx=(t-2.2)*0.5;P.power=Math.sin(t*30)>0?0.6:0;}}},
  /* abandonar: la nave sana pasa de largo y se apaga */
  burn2:{d:3.6,f:function(P,t){var u=mgsE(mgsR(t,0.2,3.6));P.flame=0;P.astZ=48-160*u;P.astX=6+34*u;P.power=1-mgsR(t,0.6,2.4);P.tint=3;P.tk=0.7*mgsR(t,1,3);P.ry=Math.PI+t*0.2;}},
  /* toda la potencia con una rueda trabada: se entierra y se quema un motor */
  wheel1:{d:3.6,f:function(P,t){P.spin=t*t*7;P.sink=0.42*mgsE(mgsR(t,0.3,2.6));P.rz=0.1*mgsR(t,0.5,2.6);P.shake=t<2.6?0.22:0;if(t<2.6&&Math.random()<0.7)mgsPuff((Math.random()-0.5)*1.6,0.15,(Math.random()<0.5?-1:1)*0.7,2,0xb07a56,2.4,0.9,1);
    mgsOnce('q',t>2.5,function(){mgsPuff(0.7,0.35,0.65,35,0xff8a3c,3,0.6,0.9);mgsHook('flash','#ff8a3c',0.35);});if(t>2.6){P.spin=2.6*2.6*7;P.power=0.4;}}},
  /* estacionarse para siempre: pasan los días, se junta polvo y no se descubre nada */
  wheel2:{d:3.8,f:function(P,t){P.lapse=t*5;P.night=0.45-0.45*Math.cos(t*5);P.tint=2;P.tk=0.85*mgsR(t,0.4,3.4);P.power=1-0.6*mgsR(t,1,3.4);P.dish=0;}},
  /* todo encendido en la noche lunar: batería vacía y electrónica congelada */
  night0:{d:3.8,f:function(P,t){P.night=mgsE(mgsR(t,0.2,1.6));P.power=t<2?1:(t<2.5&&Math.sin(t*40)>0?0.7:0);P.tint=1;P.tk=0.85*mgsE(mgsR(t,2,3.5));}},
  /* intentar mudarse: no queda combustible y la noche llega igual */
  night2:{d:3.8,f:function(P,t){P.flame=t>0.3&&t<1.7&&Math.sin(t*13)>0.6?0.3:0;P.y=P.flame?0.06:0;if(P.flame&&Math.random()<0.5)mgsPuff(0,0.3,0,2,0xa9a9a2,2.5,0.3,0.8);
    P.night=mgsE(mgsR(t,1.7,3.1));P.tint=1;P.tk=0.5*mgsR(t,2.6,3.7);P.power=1-0.85*mgsR(t,2.2,3.2);}},
  /* sacar más fotos: la antena deja de apuntar a la Tierra y las fotos no llegan */
  fuel0:{d:3.8,f:function(P,t){[0.4,0.9,1.4].forEach(function(q,i){mgsOnce('p'+i,t>q,function(){mgsHook('flash','#ffffff',0.22);mgsPuff(0,0,1.1,6,0xffffff,0.8,0,0.3);});});
    P.dish=1.5*mgsE(mgsR(t,1.3,3));P.beam=t>0.2&&t<2.6?0.8:0;P.beamBad=mgsR(t,1.4,2.4);mgsOnce('s',t>2.7,function(){mgsHook('signal',true);});}},
  /* acelerar: cambia la órbita y se va el combustible de la antena */
  fuel1:{d:3.8,f:function(P,t){var u=mgsR(t,0.3,3);P.flame=t>0.3&&t<2.3?1:0;P.astZ=58+60*u*u;P.astX=16+20*u;P.veer=1.1*u;P.dish=1.2*mgsR(t,2.2,3.4);mgsOnce('s',t>3,function(){mgsHook('signal',true);});}},
  /* dejar todo encendido: la batería se agota y el frío rompe la electrónica */
  dust0:{d:3.8,f:function(P,t){P.tint=t<2.6?2:1;P.tk=t<2.6?0.75+0.25*mgsR(t,0,2):0.8*mgsR(t,2.6,3.6);P.power=Math.max(0,0.6-0.6*mgsR(t,0.4,2.2));P.night=0.5*mgsE(mgsR(t,1.4,3));}},
  /* andar más rápido: gasta la batería antes */
  dust2:{d:3.6,f:function(P,t){var u=mgsR(t,0.2,2.1);P.tint=2;P.tk=0.75;P.x=11*(1-(1-u)*(1-u));P.spin=u*40;P.power=0.6*(1-u);if(u>0&&u<1&&Math.random()<0.6)mgsPuff(P.x-0.8,0.15,(Math.random()-0.5)*1.2,2,0xb07a56,1.2,0.4,1);
    if(t>2.1){P.power=0;P.tint=3;P.tk=0.5*mgsR(t,2.1,3.2);}}},
  /* enviar la actualización sin probar: la antena se apaga y se pierde el contacto */
  upload1:{d:3.8,f:function(P,t){P.beam=t<1.3?(0.6+0.4*Math.sin(t*18)):0;mgsOnce('g',t>1.1,function(){mgsHook('glitch',true);mgsHook('flash','#ff6b5a',0.3);});P.dish=3.2*mgsE(mgsR(t,1.2,3.2));
    P.power=t>1.1?(Math.sin(t*37)>0.3?0.8:0):1;mgsOnce('s',t>2.8,function(){mgsHook('glitch',false);mgsHook('signal',true);});}},
  /* no actualizar nunca: pasan los meses y los errores se acumulan */
  upload2:{d:3.8,f:function(P,t){P.lapse=t*5;P.night=0.35-0.35*Math.cos(t*5);P.power=Math.sin(t*10)>0?1:0.15;P.tint=2;P.tk=0.4*mgsR(t,0.5,3.2);mgsOnce('g',t>2.2,function(){mgsHook('glitch',true);});mgsOnce('h',t>3.3,function(){mgsHook('glitch',false);});}}
};
var MGS_TINT=[null,mgsCol(0xa9d2ff),mgsCol(0xa87a55),mgsCol(0x0c0f14)];
var _mgA=new THREE.Vector3(),_mgB=new THREE.Vector3(),_mgSky=new THREE.Color(),_mgBlack=new THREE.Color(0x000000),_mgStorm=new THREE.Color(0x0a0f18);
function mgsTick(dt,now){
  var S=MGS;if(!S.ready||!S.craft)return;
  var host=S.cv.parentNode,w=host.clientWidth||W,h=host.clientHeight||H;if(w!==S.w||h!==S.h){S.w=w;S.h=h;S.gl.setSize(w,h,false);S.cam.aspect=w/h;}
  S.t+=dt;S.mt+=dt;var t=S.t,P=mgsBase(t),mt=S.mode==='calm'?0:S.mt,F;
  if(S.mode==='alert'){F=MGS_ALERT[S.key];if(F)F(P,mt);}
  else if(S.mode==='fix'||S.mode==='fault'){
    /* se parte de la pose de la alerta, congelada en el instante de la decisión */
    var H=S.hold||P;if(S.mode==='fault'){var A=MGS_ALERT[S.key];if(A&&S.key!=='storm'&&S.key!=='fuel')A(P,999);else if(S.key==='storm')P.storm=1;}
    F=(S.mode==='fix'?MGS_FIX:MGS_FAULT)[S.key+(S.mode==='fault'?S.k:'')];if(F)F.f(P,Math.min(mt,F.d),H);
    if(mt>=S.dur&&S.cb){var cb=S.cb;S.cb=null;cb();}
  }
  S.P=P;if(reduce)P.shake=0;
  /* nave */
  var c=S.craft;c.position.set(P.x,P.y-P.sink,P.z);c.rotation.set(P.rx,P.ry,P.rz);
  var pa=S.parts,fl=pa.flame;fl.visible=P.flame>0.02;if(fl.visible){fl.scale.set(0.8+0.3*Math.random(),P.flame*(0.8+0.35*Math.random()),0.8+0.3*Math.random());}
  if(pa.wheels)pa.wheels.forEach(function(wh){wh.rotation.y=P.spin;});if(pa.dish)pa.dish.rotation.y=P.dish;
  var tc=MGS_TINT[P.tint];S.mats.forEach(function(m){m.color.copy(m.userData.base);if(tc)m.color.lerp(tc,P.tk);});
  S.lamps.forEach(function(m,i){m.color.copy(m.userData.base).multiplyScalar(clamp(P.power,0,1)*(0.75+0.25*Math.sin(t*3+i)));});
  if(pa.panels)pa.panels.forEach(function(p){p.material.emissiveIntensity=P.power;});
  /* plataforma */
  if(S.kind==='pad'){S.rocket.position.y=0.5+P.rY;S.rocket.rotation.z=P.rTilt;S.rFlame.visible=P.rFlame>0.02;if(S.rFlame.visible)S.rFlame.scale.set(0.85+0.3*Math.random(),P.rFlame*(0.8+0.4*Math.random()),0.85+0.3*Math.random());
    S.arms.forEach(function(a){a.visible=P.rY<0.4;});S.flood.intensity=1.6*clamp(P.power+0.25,0,1);S.flood2.intensity=0.9*clamp(P.power+0.25,0,1);
    S.cloudMat.opacity=0.92*P.storm;S.clouds.rotation.y=t*0.02;S.boltT-=dt;S.bolt.visible=S.boltT>0;}
  /* asteroide, rocas */
  if(S.kind==='near'){S.asteroid.position.set(P.astX,-9,P.astZ);S.asteroid.rotation.y=t*0.05;S.asteroid.rotation.x=0.3;}else if(S.kind==='space')S.asteroid.rotation.y=t*0.05;
  S.rockMat.emissiveIntensity=P.hot*0.9;
  var sh=S.shadow,surf=S.kind==='land'||S.kind==='ground';sh.visible=surf;if(surf){var ss=(S.id==='mars'&&S.kind==='ground'?1.25:2.5)*(1+P.y*0.06);sh.position.set(P.x,0.03,P.z);sh.scale.set(ss,ss,1);sh.material.opacity=0.42/(1+P.y*0.35)*(1-0.8*P.night);}
  if(S.kind==='space'){S.stars.rotation.x=t*0.004;S.earth.rotation.y=t*0.03;}
  /* luz, cielo */
  var dayK=1-0.94*P.night,la=0.7+P.lapse;S.sun.position.set(Math.cos(la)*50,Math.max(6,55*Math.abs(Math.sin(la*0.5+1.1))),-Math.sin(la)*50);
  S.sun.intensity=(S.kind==='pad'?0.5:(surf?1.7:2.6))*dayK*(S.boltT>0?2.2:1);S.amb.intensity=(S.kind==='pad'?0.55:0.6)*(0.25+0.75*dayK)+(S.boltT>0?1.2:0);
  _mgSky.copy(S.sky).lerp(_mgBlack,Math.max(P.night*0.9,P.sky));if(S.kind==='pad')_mgSky.lerp(_mgStorm,P.storm*0.55);S.scene.background=_mgSky;S.scene.fog.color.copy(_mgSky);S.scene.fog.near=S.fogD[0];S.scene.fog.far=S.fogD[1];
  if(S.kind==='pad')S.stars.visible=P.sky>0.5;
  /* camino real, en rojo, cuando la nave se desvía */
  S.veer.visible=Math.abs(P.veer)>0.01&&(S.kind==='space'||S.kind==='near');
  if(S.veer.visible){var va=S.veer.geometry.attributes.position,i,sg=S.kind==='near'?-1:1;for(i=0;i<24;i++){var s=i*3.2;va.setXYZ(i,P.x+P.veer*s*s*0.03,P.y+P.veer*s*s*0.008,sg*s+P.z);}va.needsUpdate=true;}
  /* haz de radio entre la antena y la Tierra */
  S.beam.visible=P.beam>0.02&&!!pa.dish;
  if(S.beam.visible){pa.dish.getWorldPosition(_mgA);_mgB.set(-0.25,0.55,-0.8).normalize();if(P.beamBad>0)_mgB.applyAxisAngle(new THREE.Vector3(0,1,0),P.beamBad*1.6);
    var ba=S.beam.geometry.attributes.position;ba.setXYZ(0,_mgA.x,_mgA.y,_mgA.z);ba.setXYZ(1,_mgA.x+_mgB.x*900,_mgA.y+_mgB.y*900,_mgA.z+_mgB.z*900);ba.needsUpdate=true;
    S.beam.material.opacity=P.beam;S.beam.material.color.set(P.beamBad>0.5?0xff6b5a:0x7fd49a);}
  /* viento que limpia los paneles */
  if(P.wind>0&&Math.random()<0.9)mgsPuff(-9,0.3+Math.random()*2.4,(Math.random()-0.5)*6,2,0xc79a74,0.6,0,1.4);
  var wx=P.wind>0?14:0;
  for(var j=0;j<S.pN;j++){if(S.pL[j]<=0){S.pC[j*3]=S.pC[j*3+1]=S.pC[j*3+2]=0;continue;}S.pL[j]-=dt;var kf=clamp(S.pL[j]/S.pB[j*4+3],0,1);
    S.pP[j*3]+=(S.pV[j*3]+wx)*dt;S.pP[j*3+1]+=S.pV[j*3+1]*dt;S.pP[j*3+2]+=S.pV[j*3+2]*dt;S.pV[j*3]*=0.985;S.pV[j*3+1]*=0.985;S.pV[j*3+2]*=0.985;
    S.pC[j*3]=S.pB[j*4]*kf;S.pC[j*3+1]=S.pB[j*4+1]*kf;S.pC[j*3+2]=S.pB[j*4+2]*kf;}
  S.pts.geometry.attributes.position.needsUpdate=true;S.pts.geometry.attributes.color.needsUpdate=true;S.pts.material.size=S.kind==='pad'?2.6:0.9;
  /* cámara: sigue a la nave, gira despacio y se acomoda con suavidad */
  var C=S.cam0,T=S.camT,e=dt?1-Math.exp(-dt*2.2):1,fx=S.kind==='pad'?0:P.x,fy=S.kind==='pad'?P.rY:(S.kind==='land'?0:P.y-(S.kind==='land'?9:0));
  var tx=T.x+fx,ty=T.y+fy,tz=T.z+P.z*0.6,td=T.dist*(S.kind==='pad'?1+P.rY/90:1),tel=T.el+(S.kind==='pad'?Math.min(0.5,P.rY/260):0);
  C.x+=(tx-C.x)*e;C.y+=(ty-C.y)*e;C.z+=(tz-C.z)*e;C.dist+=(td-C.dist)*e;C.el+=(tel-C.el)*e;C.az=T.az+Math.sin(t*0.11)*0.45+(S.kind==='space'?t*0.03:0);
  var ce=Math.cos(C.el),cam=S.cam;cam.position.set(C.x+Math.cos(C.az)*ce*C.dist,C.y+Math.sin(C.el)*C.dist,C.z+Math.sin(C.az)*ce*C.dist);
  if(S.ground.visible&&cam.position.y<0.6)cam.position.y=0.6;
  if(P.shake>0){cam.position.x+=(Math.random()-0.5)*P.shake*0.5;cam.position.y+=(Math.random()-0.5)*P.shake*0.5;}
  cam.lookAt(C.x,C.y,C.z);
  /* el cuadro de diálogo ocupa la parte de abajo: la nave se dibuja un poco más arriba */
  cam.setViewOffset(w,h,0,Math.round(h*(w<700?0.2:0.13)),w,h);cam.updateProjectionMatrix();S.gl.render(S.scene,cam);
  /* marca sobre la pieza con la alerta */
  var mk=S.mark,o=null;
  if(S.sys&&S.mode!=='calm'){o={power:pa.panels&&pa.panels[0],comms:pa.dish,engine:pa.engine,wheels:pa.wheels&&pa.wheels[4],attitude:pa.body,nav:pa.body,thermal:pa.body,software:pa.body}[S.sys]||pa.body;
    if(S.kind==='pad'){_mgA.set(0,S.rocket.position.y+12,0);}else if(S.key==='boulders'&&S.mode==='alert'){_mgA.set(0,0.5,0);}else o.getWorldPosition(_mgA);
    _mgA.project(cam);mk.vis=_mgA.z<1;mk.x=(_mgA.x*0.5+0.5)*w;mk.y=(-_mgA.y*0.5+0.5)*h;}
  else mk.vis=false;
}
