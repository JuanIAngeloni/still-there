/* ---------- escena del espacio: Sol, planetas y naves a escala real ---------- */
/* Origen flotante: la cámara queda siempre en (0,0,0) y el mundo se corre en sentido contrario, así una nave de
   3 m junto a Marte se dibuja sin temblores. Se dibuja en tres pasadas, cada una con su plano cercano y lejano:
   fondo (estrellas, Sol, órbitas, puntos), cuerpos (planetas y lunas) y nave. */
var HZ={},HZ_READY=false;
(function(){try{fetch('assets/horizons.json').then(function(r){return r.json();}).then(function(d){HZ=d;HZ_READY=true;}).catch(function(){});}catch(e){}})();
var TEXC={};
function texOf(path){if(!TEXC[path]){var t=new THREE.TextureLoader().load(path);t.anisotropy=4;TEXC[path]=t;}return TEXC[path];}
var GLBC={};
function modelOf(name,cb){
  if(GLBC[name]){if(GLBC[name].scene)cb(GLBC[name].scene.clone(true));else GLBC[name].wait.push(cb);return;}
  GLBC[name]={wait:[cb]};
  if(!THREE.GLTFLoader){return;}
  new THREE.GLTFLoader().load('assets/models/'+name+'.gltf.json',function(g){GLBC[name].scene=g.scene;GLBC[name].wait.forEach(function(f){f(g.scene.clone(true));});GLBC[name].wait=[];},undefined,function(){});
}
/* lleva un modelo a su tamaño real: maxM es su medida mayor en metros */
function fitModel(obj,maxM){
  var b=new THREE.Box3().setFromObject(obj),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3()),k=maxM/Math.max(s.x,s.y,s.z);
  var g=new THREE.Group();obj.position.copy(c).multiplyScalar(-k);obj.scale.setScalar(k);g.add(obj);
  obj.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material&&o.material.metalness>0.6)o.material.metalness=0.6;}});
  return g;
}

var SP=null;
function glowTex(r,g,b){
  var cv=document.createElement('canvas');cv.width=cv.height=128;var x=cv.getContext('2d'),gr=x.createRadialGradient(64,64,0,64,64,64);
  gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(0.1,'rgba('+r+','+g+','+b+',.9)');gr.addColorStop(0.35,'rgba('+r+','+g+','+b+',.28)');gr.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
  x.fillStyle=gr;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(cv);
}
var ATMO_VS='varying vec3 vN;varying vec3 vD;void main(){vN=normalize(normalMatrix*normal);vD=normalize(mat3(modelMatrix)*position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
var ATMO_FS='uniform vec3 uSun;uniform vec3 uColor;uniform float uK;varying vec3 vN;varying vec3 vD;void main(){float i=pow(clamp(-dot(normalize(vN),vec3(0.0,0.0,1.0))*2.1,0.0,1.0),2.2);float s=0.18+0.82*smoothstep(-0.35,0.6,dot(vD,uSun));gl_FragColor=vec4(uColor*i*s*uK,1.0);}';

function initSpace(){
  if(SP)return SP;
  SP={bg:new THREE.Scene(),bodies:new THREE.Scene(),craft:new THREE.Scene(),cam:new THREE.PerspectiveCamera(40,W/H,1,1e9),
      camAbs:new THREE.Vector3(),lookAbs:new THREE.Vector3(),B:{},lines:[],labels:[],jd:2451545};
  SP.cam.up.set(0,0,1);
  SP.bgRoot=new THREE.Group();SP.bg.add(SP.bgRoot);
  SP.bodyRoot=new THREE.Group();SP.bodies.add(SP.bodyRoot);
  SP.craftRoot=new THREE.Group();SP.craft.add(SP.craftRoot);
  /* cielo: mapa de estrellas Hipparcos de NASA, en coordenadas ecuatoriales */
  var sky=new THREE.Mesh(new THREE.SphereGeometry(4e8,64,32),new THREE.MeshBasicMaterial({map:texOf('assets/textures/stars_hipparcos.jpg'),side:THREE.BackSide,depthWrite:false,color:0x7d838d}));
  setBodyAxes(sky.quaternion,new THREE.Vector3(1,0,0),new THREE.Vector3(0,Math.sin(EPS_J2000),Math.cos(EPS_J2000)));sky.scale.z=-1;
  SP.bg.add(sky);SP.sky=sky;
  /* Sol */
  SP.sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(255,226,170),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,sizeAttenuation:false}));
  SP.sunGlow.scale.set(0.16,0.16,1);SP.bgRoot.add(SP.sunGlow);
  SP.sunHalo=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(255,200,140),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0.35,sizeAttenuation:false}));
  SP.sunHalo.scale.set(0.7,0.7,1);SP.bgRoot.add(SP.sunHalo);
  [SP.bodyRoot,SP.craftRoot].forEach(function(r){r.add(new THREE.PointLight(0xfff4e8,1.75,0));});
  SP.bodies.add(new THREE.AmbientLight(0x3a4250,0.18));SP.craft.add(new THREE.AmbientLight(0x3a4250,0.3));
  SP.dotTex=glowTex(255,214,160);SP.dotTexB=glowTex(170,200,255);
  SP.labelBox=add(stage,'div','sp-labels');
  return SP;
}

/* ---------- cuerpos ---------- */
function makeLabel(text,cls){var d=add(SP.labelBox,'div','sp-label'+(cls?' '+cls:''));d.textContent=text;return d;}
function makeBody(key){
  if(SP.B[key])return SP.B[key];
  var R=R_KM[key]/UNIT_KM,mesh,mat,b={key:key,R:R,pos:new THREE.Vector3(),q:new THREE.Quaternion()};
  if(key==='earth'){
    mat=new THREE.ShaderMaterial({uniforms:{uDay:{value:earthMat.uniforms.uDay.value},uNight:{value:earthMat.uniforms.uNight.value},uSun:{value:new THREE.Vector3(1,0,0)}},
      vertexShader:earthMat.vertexShader,fragmentShader:earthMat.fragmentShader});
    mesh=new THREE.Mesh(new THREE.SphereGeometry(R,128,64),mat);b.sunU=mat.uniforms.uSun;
    var am=new THREE.ShaderMaterial({side:THREE.BackSide,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uSun:b.sunU,uColor:{value:new THREE.Color(0x5fa8ff)},uK:{value:1}},vertexShader:ATMO_VS,fragmentShader:ATMO_FS});
    mesh.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.025,96,48),am));
  }else if(key==='moon'){
    mat=new THREE.MeshStandardMaterial({map:texOf('assets/textures/moon_lroc_color_2k.jpg'),bumpMap:texOf('assets/textures/moon_ldem_3_8bit.jpg'),bumpScale:0.006,roughness:0.97,metalness:0});
    mesh=new THREE.Mesh(new THREE.SphereGeometry(R,128,64),mat);
  }else if(key==='mars'){
    mat=new THREE.MeshStandardMaterial({map:texOf('assets/textures/mars.jpg'),roughness:1,metalness:0});
    mesh=new THREE.Mesh(new THREE.SphereGeometry(R,128,64),mat);b.sunU={value:new THREE.Vector3(1,0,0)};
    var mm=new THREE.ShaderMaterial({side:THREE.BackSide,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uSun:b.sunU,uColor:{value:new THREE.Color(0xe0a274)},uK:{value:0.55}},vertexShader:ATMO_VS,fragmentShader:ATMO_FS});
    mesh.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.012,96,48),mm));
  }else if(key==='jupiter'){
    mesh=new THREE.Mesh(new THREE.SphereGeometry(R,96,48),new THREE.MeshStandardMaterial({map:texOf('assets/textures/jupiter.jpg'),roughness:1,metalness:0}));
    mesh.scale.y=0.935;  /* achatamiento de Júpiter */
  }else{
    /* asteroides: forma irregular hecha con ruido; Eros alargado (34 x 11 x 11 km) */
    var geo=new THREE.IcosahedronGeometry(1,key==='eros'?5:6),p=geo.attributes.position,v=new THREE.Vector3();
    var ax=key==='eros'?[17.2,5.6,5.6]:(key==='vesta'?[286,279,223]:[483,481,446]);
    for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);
      var n=1+0.06*Math.sin(v.x*7.1+1.3)*Math.sin(v.y*6.3)+0.04*Math.sin(v.z*11.7+v.x*5.1)+(key==='eros'?0.08*Math.sin(v.x*3.1+2.0)*Math.cos(v.y*2.3):0.02*Math.sin(v.y*17.0));
      if(key==='eros'&&v.y>0.2)n-=0.12*(v.y-0.2);
      p.setXYZ(i,v.x*ax[0]/UNIT_KM*n,v.y*ax[2]/UNIT_KM*n,v.z*ax[1]/UNIT_KM*n);}
    geo.computeVertexNormals();
    mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:key==='ceres'?0x5c5a57:(key==='vesta'?0x8a857d:0x8c7c66),roughness:1,metalness:0}));
    b.R=ax[0]/UNIT_KM;
  }
  mesh.frustumCulled=false;b.mesh=mesh;SP.bodyRoot.add(mesh);
  b.dot=new THREE.Sprite(new THREE.SpriteMaterial({map:key==='earth'?SP.dotTexB:SP.dotTex,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,sizeAttenuation:false}));
  b.dot.scale.set(0.022,0.022,1);SP.bgRoot.add(b.dot);
  b.label=makeLabel('');b.labelKey=key;
  SP.B[key]=b;return b;
}
function bodyName(key){return {earth:{es:'Tierra',en:'Earth'},moon:{es:'Luna',en:'Moon'},mars:{es:'Marte',en:'Mars'},jupiter:{es:'Júpiter',en:'Jupiter'},
  eros:{es:'Eros',en:'Eros'},vesta:{es:'Vesta',en:'Vesta'},ceres:{es:'Ceres',en:'Ceres'},sun:{es:'Sol',en:'Sun'}}[key][lang];}

/* órbita completa de un cuerpo (tabla de Horizons) como línea tenue en el fondo */
function makeOrbit(key,color){
  var tr=hzTrack('orbit_'+key);if(!tr)return null;
  var pts=tr.points(-1e9,1e9),arr=new Float32Array(pts.length*3);
  for(var i=0;i<pts.length;i++){arr[i*3]=pts[i][0];arr[i*3+1]=pts[i][1];arr[i*3+2]=pts[i][2];}
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(arr,3));
  var l=new THREE.LineLoop(g,new THREE.LineBasicMaterial({color:color||0x8a96aa,transparent:true,opacity:0.32,depthWrite:false}));
  l.frustumCulled=false;SP.bgRoot.add(l);SP.lines.push(l);return l;
}
/* trayectoria de la nave: se va revelando hasta la fecha actual */
var TRAJ_VS='attribute float aJ;varying float vJ;void main(){vJ=aJ;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
var TRAJ_FS='uniform float uJ;uniform float uJ0;uniform vec3 uColor;uniform float uA;varying float vJ;void main(){if(vJ>uJ)discard;float a=mix(0.25,1.0,smoothstep(uJ0,uJ,vJ));gl_FragColor=vec4(uColor,a*uA);}';
function makeTraj(pts,parent,color){
  var arr=new Float32Array(pts.length*3),aj=new Float32Array(pts.length);
  for(var i=0;i<pts.length;i++){arr[i*3]=pts[i][0];arr[i*3+1]=pts[i][1];arr[i*3+2]=pts[i][2];aj[i]=pts[i][3]-2440000;}
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(arr,3));g.setAttribute('aJ',new THREE.BufferAttribute(aj,1));
  var m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uJ:{value:0},uJ0:{value:pts.length?pts[0][3]-2440000:0},uColor:{value:new THREE.Color(color||0xffd08a)},uA:{value:0.85}},vertexShader:TRAJ_VS,fragmentShader:TRAJ_FS});
  var l=new THREE.Line(g,m);l.frustumCulled=false;(parent||SP.bgRoot).add(l);SP.lines.push(l);return l;
}
function clearSpace(){
  if(!SP)return;
  SP.lines.forEach(function(l){l.parent&&l.parent.remove(l);l.geometry.dispose();});SP.lines=[];
  Object.keys(SP.B).forEach(function(k){var b=SP.B[k];b.mesh.visible=false;b.dot.visible=false;b.label.style.display='none';});
  if(SP.ship){SP.craftRoot.remove(SP.ship);SP.ship=null;}
  if(SP.shipDot){SP.bgRoot.remove(SP.shipDot);SP.shipDot=null;}
  if(SP.shipLabel){SP.shipLabel.remove();SP.shipLabel=null;}
  if(SP.sunLabel){SP.sunLabel.style.display='none';}
}

/* ---------- dibujo ---------- */
var _v1=new THREE.Vector3(),_v2=new THREE.Vector3(),_v3=new THREE.Vector3();
function pxRadius(R,dist){return R/Math.max(dist,1e-9)*(H/2)/Math.tan(SP.cam.fov*Math.PI/360);}
function projectRel(rel,out){_v3.copy(rel).project(SP.cam);out.x=(_v3.x*0.5+0.5)*W;out.y=(-_v3.y*0.5+0.5)*H;out.vis=_v3.z<1&&_v3.z>-1;return out;}
function placeLabel(el,rel,txt,dy){
  var p=projectRel(rel,{});if(!p.vis||p.x<-40||p.x>W+40||p.y<-20||p.y>H+20){el.style.display='none';return;}
  if(el.textContent!==txt)el.textContent=txt;el.style.display='';el.style.transform='translate('+Math.round(p.x)+'px,'+Math.round(p.y-(dy||0))+'px) translate(-50%,-100%)';
}
function renderSpace(){
  var cam=SP.cam,camAbs=SP.camAbs;
  cam.aspect=W/H;viewFor(cam);cam.position.set(0,0,0);
  _v1.copy(SP.lookAbs).sub(camAbs);cam.lookAt(_v1);cam.updateMatrixWorld(true);
  SP.bgRoot.position.copy(camAbs).negate();SP.bodyRoot.position.copy(camAbs).negate();SP.craftRoot.position.copy(camAbs).negate();
  /* cuerpos: posición, orientación, luz y tamaño mínimo en pantalla */
  var nearB=1e12,labels=[];
  Object.keys(SP.B).forEach(function(k){
    var b=SP.B[k];if(!b.on){b.mesh.visible=false;b.dot.visible=false;b.label.style.display='none';return;}
    b.mesh.position.copy(b.pos);b.mesh.quaternion.copy(b.q);b.mesh.visible=true;
    if(b.sunU)b.sunU.value.copy(b.pos).negate().normalize();
    var d=_v1.copy(b.pos).sub(camAbs).length(),px=pxRadius(b.R,d);nearB=Math.min(nearB,Math.max(d-b.R*1.05,(d-b.R)*0.8,b.R*1e-6));
    /* en explorar, de lejos cada cuerpo se agranda hasta un tamaño mínimo en pantalla; al acercarse vuelve a su tamaño real */
    if(b.sy==null)b.sy=b.mesh.scale.y;var mp=SP.inflate&&SP.inflate[k]||0;b.k=px<mp?mp/Math.max(px,1e-12):1;
    b.mesh.scale.set(b.k,b.k*b.sy,b.k);px*=b.k;
    b.dot.position.copy(b.pos);b.dot.visible=px<3;b.dot.material.opacity=1;
    if(px<26&&b.showLabel!==false)placeLabel(b.label,_v2.copy(b.pos).sub(camAbs),bodyName(k),px+14);else b.label.style.display='none';
  });
  if(SP.sunLabel){if(SP.showSunLabel)placeLabel(SP.sunLabel,_v2.set(0,0,0).sub(camAbs),bodyName('sun'),16);else SP.sunLabel.style.display='none';}
  /* nave */
  var dc=1e12;
  if(SP.ship){SP.ship.position.copy(SP.shipPos);dc=_v1.copy(SP.shipPos).sub(camAbs).length();
    var spx=pxRadius(SP.shipSize*0.5,dc);SP.ship.visible=spx>0.6;
    if(SP.shipDot){SP.shipDot.position.copy(SP.shipPos);SP.shipDot.visible=spx<3;}
    if(SP.shipLabel){if(spx<14)placeLabel(SP.shipLabel,_v2.copy(SP.shipPos).sub(camAbs),SP.shipLabel.dataset.name,16);else SP.shipLabel.style.display='none';}
  }
  /* el Sol se achica con la distancia: desde Júpiter ya es chico y desde las Pioneer es una estrella muy brillante */
  var au=Math.max(1,camAbs.length()/149598),ks=1/Math.sqrt(au);SP.sunGlow.scale.set(0.16*ks,0.16*ks,1);SP.sunHalo.scale.set(0.7*ks,0.7*ks,1);SP.sunHalo.material.opacity=0.35*Math.min(1,ks*1.6);
  renderer.autoClear=false;renderer.setClearColor(0x000000,1);renderer.clear(true,true,true);
  cam.near=1;cam.far=2e9;cam.updateProjectionMatrix();renderer.render(SP.bg,cam);
  renderer.clearDepth();
  cam.near=Math.max(1e-6,nearB*0.5);cam.far=cam.near*2e5;cam.updateProjectionMatrix();renderer.render(SP.bodies,cam);
  if(SP.ship&&SP.ship.visible){renderer.clearDepth();cam.near=Math.max(1e-9,dc*0.02);cam.far=dc*60+1e-6;cam.updateProjectionMatrix();renderer.render(SP.craft,cam);}
  renderer.autoClear=true;
}
