/* ---------- explorar: el sistema solar de hoy en un solo espacio, a escala real, con zoom continuo ----------
   Todo está donde está hoy (JPL Horizons, 15 nov 2026). La rueda acerca hacia el punto que señala el puntero,
   como en un mapa: desde la Tierra se puede salir hasta ver las órbitas y volver a entrar en Marte, bajar
   sobre el lugar de una máquina y aterrizar a su lado. */
var EX={active:false,jd:jdOf(Date.UTC(2026,10,15,12)),tgt:new THREE.Vector3(),dir:new THREE.Vector3(0.6,-0.7,0.4).normalize(),dist:150,
  up:new THREE.Vector3(0,0,1),fly:null,keys:{},machines:[],built:false,drag:null,lastPick:null,cool:0};
var EX_BODIES=['earth','moon','mars','jupiter','eros','vesta','ceres'];
var EX_STR={
  es:{badge:'Hoy',title:'Siguen ahí',hint:'Rueda: acercarse hacia donde apunta el mouse · Arrastrar: girar · Clic derecho o WASD: moverse · Clic en una máquina: ir hasta ella',
      go:'Ir a',back:'Volver al inicio',lede:'Cada luz es una máquina que dejamos allá afuera. Así está todo hoy.',
      scale:'Las distancias son reales. De lejos, los planetas se dibujan más grandes para que se vean; al acercarte recuperan su tamaño real.',ua:'UA',explore:'Explorar el espacio',landing:'Bajando a {n}…',here:'Acá no quedó ninguna máquina: probá en otro lugar'},
  en:{badge:'Today',title:'Still There',hint:'Wheel: zoom toward the pointer · Drag: turn · Right-click or WASD: move · Click a machine: go to it',
      go:'Go to',back:'Back to start',lede:'Every light is a machine we left out there. This is where everything is today.',
      scale:'Distances are real. From far away the planets are drawn bigger so you can see them; as you get closer they shrink to their real size.',ua:'AU',explore:'Explore space',landing:'Going down to {n}…',here:'No machine was left here: try somewhere else'}};
function xt(k){return EX_STR[lang][k];}

(function(){var st=document.createElement('style');st.textContent=
'.stage.is-explore .ui,.stage.is-explore .callouts,.stage.is-explore #leaders,.stage.is-explore .lens{display:none}.stage.is-explore .sp-labels{display:block!important}'+
'.ex{position:absolute;inset:0;z-index:7;pointer-events:none;color:var(--fg);font-family:var(--font-ui)}.ex[hidden]{display:none}'+
'.ex-top{position:absolute;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));top:12px;display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap;pointer-events:none}'+
'.ex-top>*{pointer-events:auto}.ex-id{display:grid;gap:2px}.ex-badge{justify-self:start;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--space);background:var(--accent);border-radius:4px;padding:2px 7px;font-weight:600}'+
'.ex-title{font-weight:600;font-size:clamp(20px,2.6vw,28px);letter-spacing:-.01em}.ex-date{font-size:12.5px;color:var(--fg-dim)}'+
'.ex-go{display:flex;gap:4px;flex-wrap:wrap;align-items:center;margin:4px auto 0}.ex-go span{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-dim);margin-right:4px}'+
'.ex-go button{font:inherit;font-size:12px;color:var(--fg);background:var(--veil);border:1px solid var(--line);border-radius:999px;padding:5px 11px;cursor:pointer}.ex-go button:hover{border-color:var(--line-strong)}'+
'.ex-back{font:inherit;font-size:13px;font-weight:500;color:var(--space);background:var(--fg);border:0;border-radius:999px;padding:8px 14px;cursor:pointer}'+
'.ex-hint{position:absolute;left:50%;bottom:88px;transform:translateX(-50%);width:min(92%,640px);margin:0;text-align:center;font-size:12.5px;color:var(--fg-dim);text-shadow:0 1px 6px #000;pointer-events:none}'+
'.ex .pick{position:absolute;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));bottom:14px;margin:0;pointer-events:auto}'+
'.ex-labels{position:absolute;inset:0;pointer-events:none}'+
'.ex-mk{position:absolute;left:0;top:0;display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);background:none;border:0;padding:3px 4px;cursor:pointer;pointer-events:auto;white-space:nowrap;text-shadow:0 1px 6px #000;transform-origin:0 50%}'+
'.ex-mk i{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px 2px rgba(255,208,138,.55);flex:none}'+
'.ex-mk:hover span,.ex-mk:focus-visible span{text-decoration:underline;text-underline-offset:3px}'+
'.ex-toast{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);margin:0;font-size:15px;background:var(--veil);border:1px solid var(--line);border-radius:10px;padding:8px 14px;pointer-events:none;opacity:0;transition:opacity .4s}'+
'.ex-toast.is-on{opacity:1}'+
'.stage.is-explore #gl{cursor:grab}.stage.is-explore.is-grabbing #gl{cursor:grabbing}'+
'.ex-fade{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .9s ease}'+
'.ex-hero{position:absolute;left:50%;top:clamp(70px,13vh,120px);transform:translateX(-50%);width:min(92%,640px);text-align:center;pointer-events:none;transition:opacity .8s ease}'+
'.ex-hero h1{margin:0;font-weight:500;font-size:clamp(36px,6vw,60px);letter-spacing:-.035em;line-height:1;text-shadow:0 2px 18px #000}'+
'.ex-hero p{margin:10px 0 0;color:var(--fg-dim);font-size:clamp(15px,1.6vw,17px);text-wrap:balance;text-shadow:0 1px 10px #000}.ex-hero .ex-scale{font-size:12.5px;color:var(--fg-faint)}'+
'.ex.is-intro .ex-title{visibility:hidden}.ex:not(.is-intro) .ex-hero{opacity:0}'+
'.ex-corner{display:flex;gap:10px;align-items:center}.ex-corner .cr-open{margin:0}'+
'.ex-grp{position:absolute;left:0;top:0;display:grid;gap:1px;justify-items:center;pointer-events:none}'+
'.ex-gm{font:inherit;font-size:11px;letter-spacing:.06em;color:var(--accent);background:rgba(5,7,11,.55);border:0;border-radius:4px;padding:1px 6px;cursor:pointer;pointer-events:auto;white-space:nowrap;text-shadow:0 1px 4px #000}'+
'.ex-gm:hover{color:var(--fg)}.ex-gm small{color:var(--fg-dim);font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-right:4px}'+
'.ex-mk.is-edge{color:var(--fg);background:rgba(5,7,11,.7);border:1px solid var(--line);border-radius:999px;padding:3px 9px 3px 7px}'+
'.ex-open{margin-top:8px;font:inherit;font-weight:500;font-size:14px;color:var(--fg);background:var(--veil);border:1px solid var(--line-strong);border-radius:999px;padding:9px 16px;cursor:pointer}'+
'@media (max-width:640px){.ex-hint{display:none}.ex-go{display:none}.ex-hero{top:150px}.ex-hero h1{font-size:34px}.ex-hero p{font-size:13.5px}.ex-hero .ex-scale{font-size:11.5px}.ex .pick{bottom:8px}}'+
'.stage.is-explore #gl{touch-action:none}';
document.head.appendChild(st);})();

var exEl=add(stage,'div','ex');exEl.hidden=true;
exEl.innerHTML='<canvas class="ex-fade"></canvas><div class="ex-labels"></div><header class="ex-top"><div class="ex-id"><span class="ex-badge"></span><strong class="ex-title"></strong><span class="ex-date"></span></div>'+
  '<nav class="ex-go"><span></span></nav><button class="ex-back" type="button"></button><div class="ex-corner"></div></header>'+
  '<div class="ex-hero"><h1></h1><p class="ex-lede"></p><p class="ex-scale"></p></div><p class="ex-hint"></p><p class="ex-toast"></p>';
var EXE={fade:exEl.querySelector('.ex-fade'),labels:exEl.querySelector('.ex-labels'),badge:exEl.querySelector('.ex-badge'),title:exEl.querySelector('.ex-title'),date:exEl.querySelector('.ex-date'),
  go:exEl.querySelector('.ex-go'),back:exEl.querySelector('.ex-back'),hint:exEl.querySelector('.ex-hint'),toast:exEl.querySelector('.ex-toast'),
  corner:exEl.querySelector('.ex-corner'),hero:exEl.querySelector('.ex-hero')};
var EX_GO=['earth','moon','mars','ceres','jupiter','sun'];
EX_GO.forEach(function(k){var b=add(EXE.go,'button','');b.type='button';b.dataset.k=k;b.addEventListener('click',function(){exFlyBody(k);});});
/* botón en la portada para entrar a explorar */
var exOpen=document.createElement('button');exOpen.type='button';exOpen.className='ex-open';
(function(){var h=document.getElementById('hero');h.appendChild(exOpen);})();
exOpen.addEventListener('click',function(){exFromGlobe();});
function exTexts(){EXE.badge.textContent=xt('badge');EXE.title.textContent=xt('title');var d=new Date(msOfJd(EX.jd));
  var ld=new Date(msOfJd(EX.jd));EXE.date.textContent=(lang==='es'?'Ahora: ':'Now: ')+ld.getDate()+' '+STR[lang].months[ld.getMonth()]+' '+ld.getFullYear()+', '+two(ld.getHours())+':'+two(ld.getMinutes())+' · JPL Horizons';
  EXE.go.querySelector('span').textContent=xt('go');EXE.go.querySelectorAll('button').forEach(function(b){b.textContent=bodyName(b.dataset.k);});
  EXE.back.textContent=xt('back');EXE.hint.textContent=xt('hint');exOpen.textContent=xt('explore')+' →';
  EXE.hero.querySelector('h1').textContent=xt('title');EXE.hero.querySelector('.ex-lede').textContent=xt('lede');EXE.hero.querySelector('.ex-scale').textContent=xt('scale');
  Object.keys(EX.groups||{}).forEach(function(g){EX.groups[g].items.forEach(function(it){it.b.textContent='';if(it.pre)add(it.b,'small','').textContent=bodyName(it.pre);it.b.appendChild(document.createTextNode(it.e.m.name));});});
  EX.machines.forEach(function(e){e.el.querySelector('span').textContent=e.m.name;});}
$('#langEs').addEventListener('click',exTexts);$('#langEn').addEventListener('click',exTexts);

/* ---------- armado ---------- */
var _xq=new THREE.Quaternion(),_xv=new THREE.Vector3(),_xw=new THREE.Vector3(),_xu=new THREE.Vector3(),EX_Z=new THREE.Vector3(0,0,1);
function exBodies(){
  var jd=EX.jd,B=SP.B;
  hzTrack('now_earth').at(jd,B.earth.pos);earthAxes(jd,B.earth.q);
  hzTrack('now_moon').at(jd,P3.moonG);B.moon.pos.copy(P3.moonG).add(B.earth.pos);moonAxes(P3.moonG,B.moon.q);
  hzTrack('now_mars').at(jd,B.mars.pos);marsAxes(jd,B.mars.q);
  hzTrack('now_jupiter').at(jd,B.jupiter.pos);jupiterAxes(jd,B.jupiter.q);
  ['eros','vesta','ceres'].forEach(function(k){hzTrack('now_'+k).at(jd,B[k].pos);B[k].q.setFromAxisAngle(EX_Z,0.7);});
}
function exBuild(){
  initSpace();clearSpace();SP.cam.up.set(0,0,1);EX.jd=liveJd();
  EX_BODIES.forEach(function(k){makeBody(k).on=true;});exBodies();
  makeOrbit('earth');makeOrbit('mars',0xd99a6a);makeOrbit('jupiter',0xd8b48a);makeOrbit('saturn',0xc9b98f);makeOrbit('eros',0xb9a58a);makeOrbit('ceres',0xa8a39b);makeOrbit('vesta',0xa8a39b);
  /* órbita de la Luna alrededor de la Tierra: círculo en el plano de su movimiento de hoy */
  var mv=new THREE.Vector3(),mg=new THREE.Vector3();hzTrack('now_moon').at(EX.jd,mg,mv);var n=new THREE.Vector3().crossVectors(mg,mv).normalize(),a=mg.clone().normalize(),b=new THREE.Vector3().crossVectors(n,a),r=mg.length();
  var arr=new Float32Array(256*3);for(var i=0;i<256;i++){var t=i/256*Math.PI*2;arr[i*3]=SP.B.earth.pos.x+(a.x*Math.cos(t)+b.x*Math.sin(t))*r;arr[i*3+1]=SP.B.earth.pos.y+(a.y*Math.cos(t)+b.y*Math.sin(t))*r;arr[i*3+2]=SP.B.earth.pos.z+(a.z*Math.cos(t)+b.z*Math.sin(t))*r;}
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(arr,3));var ml=new THREE.LineLoop(g,new THREE.LineBasicMaterial({color:0x9aa6b8,transparent:true,opacity:0.3,depthWrite:false}));ml.frustumCulled=false;SP.bgRoot.add(ml);SP.lines.push(ml);
  EX.moonLine=ml;EX.moonR=r;
  if(!SP.sunLabel)SP.sunLabel=makeLabel('');SP.showSunLabel=true;
  /* máquinas */
  if(!EX.built){
    allMissions().forEach(function(m){var X=JX[m.id];if(!X)return;
      var e={m:m,X:X,pos:new THREE.Vector3(),n:new THREE.Vector3(),body:null,site:false};
      if(X.type==='moon'||X.type==='mars'){e.body=X.type;e.site=true;}else if(X.hw==='near'){e.body='eros';e.site=true;}else{e.body=null;}
      e.el=add(EXE.labels,'button','ex-mk');e.el.type='button';add(e.el,'i','');add(e.el,'span','').textContent=m.name;
      e.el.addEventListener('click',function(ev){ev.stopPropagation();exFlyMachine(e);});
      e.el.addEventListener('wheel',function(){EX.lastPick=e;},{passive:true});
      EX.machines.push(e);});
    /* de lejos, cada cuerpo lleva debajo la lista de sus máquinas; la de la Luna se suma a la de la Tierra cuando la Luna no se distingue */
    EX.groups={};
    EX.machines.forEach(function(e){var g=e.site?e.body:(e.m.id==='dawn'?'ceres':null);e.group=g;if(!g)return;
      if(!EX.groups[g]){EX.groups[g]={el:add(EXE.labels,'div','ex-grp'),items:[]};}
      var b=add(EX.groups[g].el,'button','ex-gm');b.type='button';b.addEventListener('click',function(ev){ev.stopPropagation();exFlyMachine(e);});
      EX.groups[g].items.push({e:e,b:b,pre:null});});
    EX.built=true;
  }
  EX.machines.forEach(function(e){exMachinePos(e);});
  /* naves en el espacio: un grupo por nave; el más cercano a la cámara es el que se dibuja con detalle */
  EX.machines.forEach(function(e){if(e.site)return;
    if(!e.grp){e.grp=new THREE.Group();var hold=new THREE.Group();hold.scale.setScalar(1e-6);e.grp.add(hold);e.hold=hold;
      if(HW[e.X.craft])hold.add(HW[e.X.craft]());else modelOf(e.X.craft,function(o){hold.add(fitModel(o,e.X.craftM));});}
    e.grp.position.copy(e.pos);e.grp.visible=false;SP.craftRoot.add(e.grp);});
}
function exMachinePos(e){
  var X=e.X,B=SP.B;
  if(e.body==='moon'||e.body==='mars'){var b=B[e.body];siteLocal(X.site[0],X.site[1],e.n).applyQuaternion(b.q);e.pos.copy(b.pos).addScaledVector(e.n,b.R);}
  else if(e.body==='eros'){var be=B.eros;e.n.set(0,1,0).applyQuaternion(be.q);e.pos.copy(be.pos).addScaledVector(e.n,0.0048);}
  else if(e.m.id==='dawn'){var c=B.ceres;e.pos.copy(c.pos).addScaledVector(_xv.copy(c.pos).negate().normalize(),1.5);}
  else{var tr=hzTrack('now_'+e.m.id);if(tr)tr.at(EX.jd,e.pos);}
}

/* ---------- entrar y salir ---------- */
function exShow(on){EX.active=on;exEl.hidden=!on;stage.classList.toggle('is-explore',on);
  var langEl=$('#langEs').parentNode,top=document.querySelector('.top');
  if(on){exEl.appendChild(pickEl);EXE.corner.appendChild(crOpenTop);EXE.corner.appendChild(langEl);}
  else{var tl=document.querySelector('.timeline');tl.parentNode.insertBefore(pickEl,tl);top.appendChild(crOpenTop);top.appendChild(langEl);}pickSize();}
function exSnapFade(cv,renderFn){try{cv.width=canvas.width;cv.height=canvas.height;renderFn();cv.getContext('2d').drawImage(canvas,0,0);cv.style.transition='none';cv.style.opacity='1';
  requestAnimationFrame(function(){requestAnimationFrame(function(){cv.style.transition='opacity .9s ease';cv.style.opacity='0';});});}catch(err){}}
function exEnter(){
  if(!HZ_READY){showToast(jt('loading'));var tries=0,iv=setInterval(function(){if(HZ_READY||++tries>40){clearInterval(iv);if(HZ_READY)exEnter();}},250);return false;}
  if(live)closeLive();
  exBuild();exShow(true);exTexts();
  SP.inflate={earth:10,moon:5,mars:9,jupiter:15,eros:4,vesta:4,ceres:6};
  /* un poco más de luz ambiente: muchos lugares están hoy del lado de la noche */
  SP.bodies.children.forEach(function(o){if(o.isAmbientLight)o.intensity=0.42;});
  renderer.outputEncoding=THREE.sRGBEncoding;
  ['moon_lroc_color_2k','mars','jupiter','stars_hipparcos'].forEach(function(n){var tx=texOf('assets/textures/'+n+'.jpg');if(tx.encoding!==THREE.sRGBEncoding){tx.encoding=THREE.sRGBEncoding;tx.needsUpdate=true;}});
  setPlaying(false);return true;
}
function exLeave(){
  EX.active=false;EX.fly=null;exShow(false);
  EX.machines.forEach(function(e){if(e.grp&&e.grp.parent)e.grp.parent.remove(e.grp);e.el.style.display='none';});
  if(SP){SP.inflate=null;SP.ship=null;SP.cam.up.set(0,0,1);clearSpace();SP.bodies.children.forEach(function(o){if(o.isAmbientLight)o.intensity=0.18;});}
  renderer.outputEncoding=THREE.LinearEncoding;renderer.setClearColor(0x05070b,1);renderer.autoClear=true;
}
/* de la Tierra del inicio al espacio: misma cara de la Tierra, mismo tamaño en pantalla */
function exFromGlobe(){
  var dl=earth.worldToLocal(camera.position.clone()).normalize(),r=orb.r;
  exSnapFade(EXE.fade,function(){renderer.render(scene,camera);});
  if(!exEnter())return;
  var B=SP.B;EX.tgt.copy(B.earth.pos);EX.dir.copy(dl).applyQuaternion(B.earth.q).normalize();
  EX.dist=r*B.earth.R*Math.tan(17.5*DEG)/Math.tan(20*DEG);EX.fly=null;EX.cool=1;
  /* si se entró con el botón, la cámara se aleja sola hasta que se ve la Luna dando vueltas */
  if(EX.dist<B.earth.R*20)exFlyTo(B.earth.pos,EX.dir.clone().lerp(_xv.set(0,0,1),0.35).normalize(),B.earth.R*150,null);
}
/* y de vuelta: al acercarse a la Tierra se vuelve a la Tierra del inicio, mirando la misma cara */
function exToGlobe(){
  var B=SP.B,d=_xv.copy(SP.camAbs).sub(B.earth.pos),r=d.length()/B.earth.R;
  var dl=d.normalize().applyQuaternion(_xq.copy(B.earth.q).invert());
  exSnapFade(EXE.fade,function(){exRender();});
  exLeave();
  var w=earth.localToWorld(dl.clone()).sub(earth.getWorldPosition(new THREE.Vector3())).normalize();
  orb.r=orb.rT=clamp(r*Math.tan(20*DEG)/Math.tan(17.5*DEG),2.6,24);orb.ph=orb.phT=Math.acos(clamp(w.y,-1,1));orb.th=orb.thT=Math.atan2(w.x,w.z);orb.vth=orb.vph=0;
  stage.classList.add('is-running');
  JE.fade.width=EXE.fade.width;JE.fade.height=EXE.fade.height;
}

/* ---------- cámara ---------- */
function exNearest(p){var best=null,br=1e18;EX_BODIES.forEach(function(k){var b=SP.B[k],q=_xw.copy(p).sub(b.pos).length()/b.R;if(q<br){br=q;best=b;}});return {b:best,q:br};}
function exAlt(p){var nb=exNearest(p);return {b:nb.b,alt:_xw.copy(p).sub(nb.b.pos).length()-nb.b.R};}
var EX_MINALT=0.003; /* 3 km: más abajo solo se baja junto a una máquina */
function exUpdateUp(){
  var nb=exNearest(EX.tgt),k=clamp((4-nb.q)/2.7,0,1);k=k*k*(3-2*k);
  _xu.copy(EX.tgt).sub(nb.b.pos).normalize();EX.up.copy(EX_Z).lerp(_xu,k);if(EX.up.lengthSq()<1e-6)EX.up.copy(EX_Z);EX.up.normalize();
}
function exRender(){SP.lookAbs.copy(EX.tgt);SP.camAbs.copy(EX.tgt).addScaledVector(EX.dir,EX.dist);SP.cam.up.copy(EX.up);renderSpace();}
/* rayo desde la cámara por el punto (x, y) de la pantalla; devuelve el punto donde toca un cuerpo */
var _xr=new THREE.Vector3();
function exRayHit(x,y){
  _xr.set(x/W*2-1,-(y/H)*2+1,0.5).unproject(SP.cam).normalize();var o=SP.camAbs,best=null,bt=1e18;
  EX_BODIES.forEach(function(k){var b=SP.B[k];if(b.on===false)return;var rr=b.R*(b.k||1),oc=_xw.copy(o).sub(b.pos),bb=oc.dot(_xr),c=oc.lengthSq()-rr*rr,h=bb*bb-c;if(h<0)return;var t=-bb-Math.sqrt(h);if(t>0&&t<bt){bt=t;best=b;}});
  return best?{b:best,p:o.clone().addScaledVector(_xr,bt)}:null;
}
function exZoom(f,x,y){
  var P=null;
  if(EX.lastPick){P=EX.lastPick.pos.clone();EX.lastPick=null;}
  /* si el cuerpo está agrandado (de lejos), se va hacia su centro; de cerca, al punto exacto bajo el puntero */
  else{var h=exRayHit(x,y);if(h)P=(h.b.k||1)>1.02?h.b.pos.clone():h.p;}
  if(!P)P=EX.tgt.clone();
  var cam=_xv.copy(EX.tgt).addScaledVector(EX.dir,EX.dist),nd=EX.dist*f;
  /* no bajar del mínimo sobre la superficie, salvo cerca de una máquina, donde se aterriza */
  var near=exMachineNear(P);
  var minD=near&&!near.site?near.X.craftM*1.6e-6:1e-6;nd=Math.max(nd,minD);nd=Math.min(nd,9e6);f=nd/EX.dist;
  var nc=P.clone().add(cam.sub(P).multiplyScalar(f)),nt=P.clone().add(EX.tgt.clone().sub(P).multiplyScalar(f));
  var a=exAlt(nc);if(a.alt<EX_MINALT&&!(near&&near.site)&&f<1){return;}
  EX.tgt.copy(nt);EX.dist=nd;EX.fly=null;EX.moved=true;
  /* acercarse a la Tierra con la rueda vuelve a la Tierra del inicio, mirando la misma cara */
  if(f<1&&EX.cool<=0){var be=SP.B.earth,de=nc.sub(be.pos).length();if(de<be.R*15&&de>be.R*2.4&&_xu.copy(EX.tgt).sub(be.pos).length()<be.R*1.3)exToGlobe();}
}
function exMachineNear(P){var best=null,bd=1e18;EX.machines.forEach(function(e){var d=_xw.copy(P).sub(e.pos).length(),lim=e.site?0.06:Math.max(0.05,e.X.craftM*2e-5);if(d<lim&&d<bd){bd=d;best=e;}});return best;}
stage.addEventListener('wheel',function(e){if(!EX.active||overPanel(e))return;e.preventDefault();var r=stage.getBoundingClientRect();exZoom(Math.exp(e.deltaY*0.0016),e.clientX-r.left,e.clientY-r.top);},{passive:false});
/* dos dedos: pellizcar acerca o aleja hacia el punto medio, como la rueda */
var EXP={};
canvas.addEventListener('pointerdown',function(e){if(!EX.active)return;EXP[e.pointerId]={x:e.clientX,y:e.clientY};EX.moved=true;
  EX.drag={x:e.clientX,y:e.clientY,pan:e.button===2||e.shiftKey};EX.fly=null;stage.classList.add('is-grabbing');try{canvas.setPointerCapture(e.pointerId);}catch(err){}});
canvas.addEventListener('contextmenu',function(e){if(EX.active)e.preventDefault();});
window.addEventListener('pointermove',function(e){if(!EX.active||!EX.drag)return;
  if(EXP[e.pointerId]){var ids=Object.keys(EXP);if(ids.length>=2){var a=EXP[ids[0]],b=EXP[ids[1]],d0=Math.hypot(a.x-b.x,a.y-b.y);EXP[e.pointerId]={x:e.clientX,y:e.clientY};
    a=EXP[ids[0]];b=EXP[ids[1]];var d1=Math.hypot(a.x-b.x,a.y-b.y),r=stage.getBoundingClientRect();if(d0>4&&d1>4)exZoom(d0/d1,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top);return;}
    EXP[e.pointerId]={x:e.clientX,y:e.clientY};}
  var dx=e.clientX-EX.drag.x,dy=e.clientY-EX.drag.y;EX.drag.x=e.clientX;EX.drag.y=e.clientY;
  if(EX.drag.pan)exPan(-dx/H,dy/H);else exRotate(-dx*0.006,-dy*0.005);});
function exUp(e){delete EXP[e.pointerId];var ids=Object.keys(EXP);if(ids.length){EX.drag={x:EXP[ids[0]].x,y:EXP[ids[0]].y,pan:false};return;}if(EX.drag){EX.drag=null;stage.classList.remove('is-grabbing');}}
window.addEventListener('pointerup',exUp);window.addEventListener('pointercancel',exUp);
function exRotate(yaw,pitch){
  _xq.setFromAxisAngle(EX.up,yaw);EX.dir.applyQuaternion(_xq);
  var right=_xv.crossVectors(EX.up,EX.dir).normalize();if(right.lengthSq()<1e-6)return;
  var nd=EX.dir.clone().applyQuaternion(_xq.setFromAxisAngle(right,pitch)),ang=Math.acos(clamp(nd.dot(EX.up),-1,1)),nb=exNearest(EX.tgt),lim=nb.q<1.5?1.45:3.05;
  if(ang>0.06&&ang<lim)EX.dir.copy(nd).normalize();
}
function exPan(px,py){
  var right=_xv.crossVectors(EX.up,EX.dir).normalize(),upC=_xw.crossVectors(EX.dir,right).normalize(),s=EX.dist*1.1;
  var nb=exNearest(EX.tgt),rr=_xu.copy(EX.tgt).sub(nb.b.pos).length();
  EX.tgt.addScaledVector(right,-px*s).addScaledVector(upC,-py*s);
  if(nb.q<1.5){_xu.copy(EX.tgt).sub(nb.b.pos).setLength(rr);EX.tgt.copy(nb.b.pos).add(_xu);}
}
window.addEventListener('keydown',function(e){if(!EX.active)return;var k=e.key.toLowerCase();if('wasdqe'.indexOf(k)>=0&&k.length===1){EX.keys[k]=true;EX.fly=null;}if(e.key==='Escape')exBackToEarth();});
window.addEventListener('keyup',function(e){EX.keys[e.key.toLowerCase()]=false;});

/* ---------- vuelos: se aleja lo justo para ver de dónde sale y adónde va, viaja y se acerca ---------- */
function exFlyTo(tgt,dir,dist,onEnd){
  /* a mitad de camino la cámara está lo bastante lejos como para ver el origen y el destino juntos */
  var sep=_xv.copy(tgt).sub(EX.tgt).length(),hump=Math.max(0,Math.log(Math.max(sep*1.1,1e-9))-(Math.log(EX.dist)+Math.log(dist))/2);
  EX.fly={t:0,T:clamp(1.8+0.18*Math.abs(Math.log(dist/EX.dist))+0.35*hump,2.2,7),t0:EX.tgt.clone(),t1:tgt.clone(),d0:EX.dir.clone(),d1:dir.clone().normalize(),l0:Math.log(EX.dist),l1:Math.log(dist),hump:hump,onEnd:onEnd};
}
function exFlyBody(k){
  if(k==='sun'){exFlyTo(new THREE.Vector3(0,0,0),_xv.set(0.3,-0.8,0.5),9e5,null);return;}
  var b=SP.B[k];exFlyTo(b.pos,_xv.copy(b.pos).negate().normalize().add(_xw.set(0,0,0.35)).applyAxisAngle(EX_Z,0.5),b.R*(k==='earth'?3.2:4),null);
}
function exFlyMachine(e){
  if(e.site){var b=SP.B[e.body],t=_xw.crossVectors(e.n,EX_Z).normalize(),d=e.n.clone().multiplyScalar(0.85).addScaledVector(t,0.5).normalize();
    exFlyTo(e.pos,d,e.body==='eros'?0.02:0.012,function(){exArrive(e);});}
  else{exFlyTo(e.pos,_xv.copy(e.pos).negate().normalize().add(_xw.set(0,0,0.4)).applyAxisAngle(EX_Z,0.7),e.X.craftM*5e-6,function(){exArrive(e);});}
}
function exStep(dt){
  var F=EX.fly;if(!F)return;F.t+=dt;var u=Math.min(1,F.t/F.T),e=u*u*(3-2*u),m=Math.min(1,u*1.25),em=m*m*(3-2*m);
  EX.tgt.copy(F.t0).lerp(F.t1,em);EX.dir.copy(F.d0).lerp(F.d1,e).normalize();EX.dist=Math.exp(F.l0+(F.l1-F.l0)*e+F.hump*Math.sin(Math.PI*u));
  if(u>=1){EX.fly=null;if(F.onEnd)F.onEnd();}
}
/* desde la fila «Elegí una máquina»: si estamos en la Tierra se sale al espacio y se vuela hasta ella */
function exGoMachine(m){
  if(JR.active){if(JR.fromExplore){exReturn();}else{endJourney();}}
  if(!EX.active){exFromGlobe();if(!EX.active)return;}
  var e=EX.machines.filter(function(x){return x.m===m;})[0];if(e)exFlyMachine(e);
}
function exBackToEarth(){var b=SP.B.earth;exFlyTo(b.pos,EX.dir.clone().lerp(_xv.copy(b.pos).negate().normalize(),0.5),b.R*16,function(){exToGlobe();});}
EXE.back.addEventListener('click',function(){if(typeof homeShow==='function'){exLeave();homeShow();}else exGoLaunches();});

/* ---------- aterrizar: se abre el Hoy de esa máquina con un fundido ---------- */
function exArrive(e){
  if(EX.cool>0)return;EX.cool=1.5;EX.fly=null;
  var m=e.m;exSnapFade(JE.fade,function(){exRender();});
  exLeave();JR.fromExplore=true;JR.landFrom=true;startJourney(m,'hoy');
  /* en la superficie la cámara arranca alta, mirando hacia abajo, y baja sola hasta la máquina */
  if(e.site&&SF&&JR.scene==='surface'){SF.orb.r=140;SF.orb.el=1.25;}
}
/* al alejarse desde el Hoy de una máquina que se abrió desde explorar, se vuelve al espacio sobre ella */
function exReturn(){
  var m=JR.m;exSnapFade(EXE.fade,function(){jRender(0,performance.now());});
  JR.fromExplore=false;endJourney(true);
  if(!exEnter())return;
  var e=EX.machines.filter(function(x){return x.m===m;})[0];if(!e)return;
  if(e.site){var t=_xw.crossVectors(e.n,EX_Z).normalize();EX.tgt.copy(e.pos);EX.dir.copy(e.n).multiplyScalar(0.8).addScaledVector(t,0.6).normalize();EX.dist=e.body==='eros'?0.03:0.02;}
  else{EX.tgt.copy(e.pos);EX.dir.copy(e.pos).negate().normalize().add(_xw.set(0,0,0.4)).normalize();EX.dist=e.X.craftM*40e-6;}
  EX.cool=1.5;
}

/* ---------- cuadro ---------- */
function exTick(dt,now){
  EX.cool=Math.max(0,EX.cool-dt);
  var K=EX.keys,sp=EX.dist*1.1*dt;
  if(K.w||K.s||K.a||K.d){var fw=_xv.copy(EX.dir).negate(),right=_xw.crossVectors(EX.up,EX.dir).normalize();fw.addScaledVector(EX.up,-fw.dot(EX.up)).normalize();
    var nb=exNearest(EX.tgt),rr=_xu.copy(EX.tgt).sub(nb.b.pos).length();
    EX.tgt.addScaledVector(fw,((K.w?1:0)-(K.s?1:0))*sp).addScaledVector(right,((K.d?1:0)-(K.a?1:0))*sp);
    if(nb.q<1.5){_xu.copy(EX.tgt).sub(nb.b.pos).setLength(rr);EX.tgt.copy(nb.b.pos).add(_xu);}}
  if(K.q||K.e)exZoom(Math.exp((K.q?1:-1)*dt*1.6),W/2,H/2);
  exStep(dt);if(!EX.active)return; /* el vuelo pudo terminar aterrizando */
  if(EX.intro&&(EX.fly||EX.drag||K.w||K.s||K.a||K.d||K.q||K.e||EX.moved)){EX.intro=false;exEl.classList.remove('is-intro');}
  var be=SP.B.earth,camE=_xv.copy(EX.tgt).addScaledVector(EX.dir,EX.dist).sub(be.pos).length(),pxE=pxRadius(be.R,camE),kE=pxE<10?10/pxE:1;
  EX.moonOn=be.R*kE<0.3*(EX.moonR||384);SP.B.moon.on=EX.moonOn;if(EX.moonLine)EX.moonLine.visible=EX.moonOn;
  exUpdateUp();
  /* la nave del espacio más cercana a la cámara es la que se dibuja con detalle */
  var cam=_xv.copy(EX.tgt).addScaledVector(EX.dir,EX.dist),best=null,bd=1e18;
  EX.machines.forEach(function(e){if(!e.grp)return;e.grp.visible=false;var d=_xw.copy(e.pos).sub(cam).length();if(d<bd){bd=d;best=e;}});
  if(best&&bd<2){SP.ship=best.grp;SP.shipPos=best.pos;SP.shipSize=best.X.craftM*1e-6;best.grp.visible=true;}else SP.ship=null;
  exRender();exLabels(cam);
  /* bajar junto a una máquina: si el centro de la vista está sobre ella y la cámara llegó bien cerca */
  if(!EX.fly&&EX.cool<=0){var e=exMachineNear(EX.tgt);
    if(e){var dd=_xw.copy(cam).sub(e.pos).length();if((e.site&&dd<(e.body==='eros'?0.012:0.007))||(!e.site&&dd<e.X.craftM*7e-6))exArrive(e);}}
}
var _xc=new THREE.Vector3();
function exLabels(cam){
  var B=SP.B,G=EX.groups||{},grouped={};EX.edges=[];
  Object.keys(G).forEach(function(g){var gr=G[g],b=B[g],merge=g==='moon'&&!EX.moonOn,bb=merge?B.earth:b;
    var d=_xw.copy(bb.pos).sub(cam).length(),pxk=pxRadius(bb.R,d)*(bb.k||1);grouped[g]=merge||pxk<40;
    gr.items.forEach(function(it){var want=merge?'moon':null;if(it.pre!==want){it.pre=want;it.b.textContent='';if(want)add(it.b,'small','').textContent=bodyName('moon');it.b.appendChild(document.createTextNode(it.e.m.name));}});
    /* muy de lejos las listas se amontonan: quedan solo los nombres de los cuerpos */
    if(!grouped[g]||EX.dist>149598*9){gr.el.style.display='none';return;}
    var p=projectRel(_xw.copy(bb.pos).sub(cam),{});if(!p.vis||p.x<-80||p.x>W+80||p.y<-40||p.y>H+40){gr.el.style.display='none';return;}
    var off=pxk+8+(merge&&G.earth?G.earth.items.length*17:0);
    gr.el.style.display='';gr.el.style.transform='translate('+Math.round(p.x)+'px,'+Math.round(p.y+off)+'px) translate(-50%,0)';});
  EX.machines.forEach(function(e){var el=e.el,show=true;el.classList.remove('is-edge');
    if(e.group&&grouped[e.group]){el.style.display='none';return;}
    if(e.site){var b=B[e.body],px=pxRadius(b.R,_xw.copy(b.pos).sub(cam).length());
      _xu.copy(cam).sub(e.pos);if(_xu.dot(e.n)<=0||px<(e.body==='eros'?8:22))show=false;}
    if(show){var p=projectRel(_xw.copy(e.pos).sub(cam),{});
      if(!p.vis||p.x<-60||p.x>W+60||p.y<-20||p.y>H+20){
        /* las naves lejanas (las Pioneer) quedan en el borde de la pantalla, en su dirección, con su distancia al Sol */
        if(!e.site){_xc.copy(e.pos).sub(cam).transformDirection(SP.cam.matrixWorldInverse);var ang=Math.atan2(_xc.y,_xc.x),mx=W/2-110,my=(H-270)/2,
          cx=Math.abs(Math.cos(ang))>1e-6?mx/Math.abs(Math.cos(ang)):1e9,cy=Math.abs(Math.sin(ang))>1e-6?my/Math.abs(Math.sin(ang)):1e9,t=Math.min(cx,cy);
          el.classList.add('is-edge');el.querySelector('span').textContent=e.m.name+' · '+fmt(Math.round(e.pos.length()/149598))+' '+xt('ua');
          var ex=Math.round(W/2+Math.cos(ang)*t),ey=Math.round(110+(H-270)/2-Math.sin(ang)*t);
          /* si dos carteles del borde caen juntos, el segundo se corre para abajo */
          (EX.edges||[]).forEach(function(q){if(Math.abs(q[0]-ex)<170&&Math.abs(q[1]-ey)<26)ey=q[1]+28;});(EX.edges=EX.edges||[]).push([ex,ey]);
          el.style.transform='translate('+ex+'px,'+ey+'px) translate(-50%,-50%)';el.style.display='';return;}
        show=false;}
      else{if(el.querySelector('span').textContent!==e.m.name)el.querySelector('span').textContent=e.m.name;el.style.transform='translate('+Math.round(p.x-4)+'px,'+Math.round(p.y)+'px) translate(-4px,-50%)';}}
    el.style.display=show?'':'none';});
}
exTexts();

/* ---------- portada: al cargar, se ve el sistema solar de hoy desde arriba, con la Tierra adelante ---------- */
function exOverview(){var e=SP.B.earth.pos,az=Math.atan2(e.y,e.x),el=0.95;EX.tgt.set(Math.cos(az),Math.sin(az),0).multiplyScalar(149598*0.55);EX.dir.set(Math.cos(el)*Math.cos(az),Math.cos(el)*Math.sin(az),Math.sin(el));EX.dist=149598*6.8*(W<H?1.9:1);EX.fly=null;}
function exBoot(){if(!exEnter())return;exOverview();EX.cool=1;EX.intro=true;EX.moved=false;exEl.classList.add('is-intro');}
(function(){if(typeof homeShow==='function')return;var n=0,iv=setInterval(function(){if(HZ_READY&&renderer){clearInterval(iv);if(!EX.active&&!JR.active&&!live&&!stage.classList.contains('is-running'))exBoot();}else if(++n>150)clearInterval(iv);},200);})();
/* «Ver los lanzamientos»: vuelve a la Tierra del inicio y arranca la línea de tiempo desde 1958 */
function exGoLaunches(){var b=SP.B.earth;exFlyTo(b.pos,EX.dir.clone().lerp(_xv.copy(b.pos).negate().normalize(),0.5),b.R*16,function(){exToGlobe();$('#start').click();});}
