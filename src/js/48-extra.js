/* ---------- máquinas que se suman en su lugar de hoy, sin viaje desde la Tierra ----------
   Apollo 11, Viking 1, InSight e Ingenuity. Los datos verificados están en 47-extra-data.js (NEW_MACHINES);
   las fotos y los audios vienen del trabajo de Juan Ignacio Angeloni. No tienen despegue en la línea de tiempo
   (no hay dibujo de sus cohetes): se llega a ellas explorando el espacio o desde «Elegí una máquina». */

/* el módulo lunar entero es el modelo de NASA; en la Luna quedó solo la etapa de descenso */
function lmDescentOnly(f){
  var b=new THREE.Box3().setFromObject(f),cut=b.min.y+(b.max.y-b.min.y)*0.47,c=new THREE.Vector3(),bb=new THREE.Box3();
  f.traverse(function(o){if(o.isMesh){bb.setFromObject(o);bb.getCenter(c);if(c.y>cut)o.visible=false;}});
}
/* InSight: modelo simplificado (el de NASA pesa demasiado para el sitio). Tiene el mismo diseño de Phoenix,
   con dos paneles de 2,2 m, el sismómetro SEIS bajo su cúpula en el suelo y la sonda de calor al costado. */
HW.insight=function(){var g=new THREE.Group(),m=mats(),V=THREE.Vector3;
  part(new THREE.CylinderGeometry(0.78,0.78,0.32,10),m.white,0,1.0,0,g);part(new THREE.CylinderGeometry(0.72,0.64,0.2,10),m.gold,0,0.76,0,g);
  for(var i=0;i<3;i++){var a=i*2*Math.PI/3+0.5,f=new V(Math.cos(a)*1.05,0.08,Math.sin(a)*1.05);rod(new V(Math.cos(a)*0.55,0.8,Math.sin(a)*0.55),f,0.05,m.alu,g);
    part(new THREE.CylinderGeometry(0.14,0.17,0.08,12),m.alu,f.x,0.05,f.z,g);}
  [1,-1].forEach(function(s){part(new THREE.CylinderGeometry(1.08,1.08,0.03,10),m.cells,s*1.95,1.12,0,g);rod(new V(s*0.78,1.05,0),new V(s*0.95,1.1,0),0.03,m.alu,g);});
  /* brazo y cámara */
  rod(new V(0.3,1.15,0.45),new V(0.55,1.75,1.0),0.04,m.white,g);rod(new V(0.55,1.75,1.0),new V(0.3,0.9,1.55),0.035,m.white,g);part(new THREE.BoxGeometry(0.16,0.12,0.16),m.dark,0.3,0.85,1.55,g);
  /* cúpula del sismómetro, en el suelo frente al módulo */
  var dome=part(new THREE.SphereGeometry(0.36,24,12,0,Math.PI*2,0,Math.PI/2),m.white,-0.35,0,1.75,g);dome.scale.y=0.75;
  part(new THREE.CylinderGeometry(0.42,0.44,0.05,24),m.dark,-0.35,0.02,1.75,g);
  /* sonda de calor (HP3) */
  part(new THREE.BoxGeometry(0.3,0.42,0.3),m.white,0.75,0.21,1.35,g);
  return g;};

/* experimentos que Apollo 11 dejó en el suelo, cerca del módulo: el retrorreflector láser y el sismómetro (modelos simplificados) */
function apolloEasep(){var g=new THREE.Group(),m=mats();
  var lr=new THREE.Group();lr.position.set(7,0,-4);g.add(lr);
  part(new THREE.BoxGeometry(0.5,0.06,0.5),m.alu,0,0.42,0,lr).rotation.x=-0.45;
  part(new THREE.BoxGeometry(0.44,0.02,0.44),m.dark,0,0.45,0.01,lr).rotation.x=-0.45;
  rod(new THREE.Vector3(0,0,0.15),new THREE.Vector3(0,0.4,0.05),0.025,m.alu,lr);rod(new THREE.Vector3(-0.2,0,-0.15),new THREE.Vector3(-0.15,0.4,0),0.02,m.alu,lr);rod(new THREE.Vector3(0.2,0,-0.15),new THREE.Vector3(0.15,0.4,0),0.02,m.alu,lr);
  var ps=new THREE.Group();ps.position.set(2,0,-9);g.add(ps);
  part(new THREE.BoxGeometry(0.42,0.5,0.42),m.gold,0,0.25,0,ps);part(new THREE.CylinderGeometry(0.16,0.2,0.18,16),m.alu,0,0.59,0,ps);
  [1,-1].forEach(function(s){part(new THREE.BoxGeometry(0.62,0.03,0.5),m.cells,s*0.55,0.42,0,ps);});
  return g;}
/* InSight: el modelo oficial de NASA trae el sismómetro, su cúpula y la sonda de calor todavía sobre la cubierta.
   Acá se los apoya en el suelo, delante del módulo, que es como quedaron trabajando. */
function insightDeploy(f){
  f.updateMatrixWorld(true);var y0=new THREE.Box3().setFromObject(f).min.y;
  function put(n,x,z){var o=f.getObjectByName(n);if(!o)return;var b=new THREE.Box3().setFromObject(o),c=b.getCenter(new THREE.Vector3()),w=o.getWorldPosition(new THREE.Vector3());
    w.x+=x-c.x;w.z+=z-c.z;w.y+=y0-b.min.y;o.parent.worldToLocal(w);o.position.copy(w);o.updateMatrixWorld(true);}
  put('WTS',0.35,2.0);put('SEIS',0.35,2.0);put('HP3_v3d_baked',-0.95,1.75);
  ['cable_01','cable_02'].forEach(function(n){var o=f.getObjectByName(n);if(o)o.visible=false;});
}
var EXTRA_DEF={
  apollo11:{name:'Apollo 11 · Eagle',type:'moon',launch:Date.UTC(1969,6,16,13,32),dest:{es:'la Luna',en:'the Moon'},
    model:'apollo_lm',modelM:9.4,prep:lmDescentOnly,addHW:apolloEasep,sun:{el:15,az:90},earthSky:{el:66,az:270},view:[2.5,1,-4,20,0.34],
    audio:{f:'assets/audio/apollo11_eagle_has_landed.mp3',credit:'NASA',src:'https://www.nasa.gov/audio-and-ringtones/'},
    status:{es:'Su espejo se sigue usando',en:'Its mirror is still in use'},anchors:[{f:[0.5,0.35,0.5]},{ex:0},{ex:1}]},
  viking1:{name:'Viking 1',type:'mars',launch:Date.UTC(1975,7,20,21,22),dest:{es:'Marte',en:'Mars'},
    model:'viking1',modelM:3.0,sun:{el:35,az:110},view:[0,0.9,0,7,0.24],
    anchors:[{f:[0.97,0.3,0.5]},{none:true},{f:[0.08,0.78,0.5]}]},
  insight:{name:'InSight',type:'mars',launch:Date.UTC(2018,4,5,11,5),dest:{es:'Marte',en:'Mars'},
    model:'insight',modelM:6.0,prep:insightDeploy,sun:{el:40,az:120},view:[0,0.8,0.5,9,0.3],
    anchors:[{n:'WTS'},{n:'arm_02'},{f:[0.88,0.62,0.5]}]},
  ingenuity:{name:'Ingenuity',type:'mars',launch:Date.UTC(2020,6,30,11,50),dest:{es:'Marte',en:'Mars'},
    model:'ingenuity',modelM:1.2,sun:{el:38,az:120},view:[0,0.3,0,3.2,0.26],
    audio:{f:'assets/audio/mars_perseverance_sol1.mp3',credit:'NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro',src:'https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/',
      cap:{es:'Así suena Marte: un poco de viento, grabado en 2021 por el micrófono del rover Perseverance, el que llevó a Ingenuity.',en:'What Mars sounds like: a little wind, recorded in 2021 by the microphone of the Perseverance rover, which carried Ingenuity.'}},
    status:{es:'Último vuelo: 2024',en:'Last flight: 2024'},anchors:[{f:[0.5,0.7,0.5]},{f:[0.5,0.98,0.5]},{f:[0.5,0.3,0.5]}]}
};
var EXTRA=[];
(function(){
  if(typeof NEW_MACHINES==='undefined')return;
  Object.keys(EXTRA_DEF).forEach(function(id){
    var D=EXTRA_DEF[id],N=NEW_MACHINES[id];if(!N)return;var land=Date.parse(N.land);
    var m={id:id,name:D.name,launch:D.launch,legEnd:land,lastSignal:Date.UTC(N.lastYear,0,1),dest:D.dest,silent:N.silent,status:D.status,extra:true};
    EXTRA.push(m);
    JX[id]={type:D.type,only:true,site:N.site,land:land,craft:'cruise',craftM:2.65,model:D.model,modelM:D.modelM,prep:D.prep,hw:D.hw,addHW:D.addHW,
      sun:D.sun,earthSky:D.earthSky,view:D.view,place:N.place,today:N.today};
    var parts=(N.parts||[]).map(function(p,i){var a=D.anchors[i]||{f:[0.5,0.5,0.5]},o={es:p.es,en:p.en};for(var k in a)o[k]=a[k];return o;});
    LEARN[id]={q:N.q,learned:N.learned,parts:parts};
    if(D.audio){LEARN[id].audio={f:D.audio.f,credit:D.audio.credit,src:D.audio.src,cap:D.audio.cap||N.audio};}
  });
})();
function allMissions(){return MISSIONS.concat(EXTRA);}
