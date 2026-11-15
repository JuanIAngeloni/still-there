/* ---------- cohetes con modelos 3D oficiales de NASA ----------
   Delta II y Atlas V: modelos de NASA VTAD (science.nasa.gov), que vienen separados por etapa, con la cofia en dos
   mitades y los propulsores sueltos. Acá se reordenan en las piezas que usa la escena de lanzamiento.
   Lo que el modelo no trae se arma a mano y está dicho en FUENTES.md:
   - Delta II: el modelo trae 3 propulsores y el 7925 llevaba 9 (se repite el mismo propulsor del modelo de NASA);
     la tercera etapa Star 48B está hecha a mano; la cofia del modelo es la de 10 pies.
   - Atlas V 541: el modelo publicado es el 551 (5 propulsores); se le quita uno.
   Devuelve lo mismo que buildRocket3D: {root, parts, height, engines, payloadY, fairingRadius}. */
var ROCKET_GLB={delta7925:'delta2',delta7925H:'delta2',delta7925_10L:'delta2',atlasV401:'atlas401',atlasV541:'atlas551'};
function nrStar48(g,y0){
  var al=new THREE.MeshStandardMaterial({color:0xb9bcc2,metalness:0.9,roughness:0.36,side:THREE.DoubleSide}),
    ti=new THREE.MeshStandardMaterial({color:0x55575c,metalness:0.85,roughness:0.42}),
    bk=new THREE.MeshStandardMaterial({color:0x161616,metalness:0.1,roughness:0.7,side:THREE.DoubleSide}),V2=THREE.Vector2,pts=[],i;
  function lathe(p,m){var o=new THREE.Mesh(new THREE.LatheGeometry(p,48),m);o.position.y=y0;g.add(o);return o;}
  lathe([new V2(0.001,0),new V2(0.66,0),new V2(0.66,0.10),new V2(0.62,0.30),new V2(0.62,0.36)],al);  /* mesa giratoria */
  lathe([new V2(0.36,0.10),new V2(0.31,0.32),new V2(0.17,0.76),new V2(0.12,0.90)],bk);          /* tobera */
  for(i=0;i<=24;i++){var t=-Math.PI/2+Math.PI*i/24;pts.push(new V2(Math.max(0.001,0.62*Math.cos(t)),1.42+0.60*Math.sin(t)));}
  lathe(pts,ti);                                                                                 /* motor de combustible sólido */
  lathe([new V2(0.645,1.36),new V2(0.645,1.48)],al);                                             /* aro */
  lathe([new V2(0.63,1.47),new V2(0.60,1.92),new V2(0.48,2.30),new V2(0.48,2.32)],al);           /* soporte de la nave */
}
function nasaRocket(key,sc){
  var root=new THREE.Group(),hold=new THREE.Group(),parts={},engines=[],V=THREE.Vector3,Y=new V(0,1,0);
  function find(name){var r=null;root.traverse(function(o){if(!r&&o.name===name)r=o;});return r;}
  function P(id){var g=new THREE.Group();g.name=id;root.add(g);parts[id]=g;return g;}
  function take(g,name){var o=find(name);if(o)g.attach(o);return o;}
  function boxOf(o){return new THREE.Box3().setFromObject(o);}
  function both(o){if(o)o.traverse(function(q){if(q.isMesh){q.material=q.material.clone();q.material.side=THREE.DoubleSide;}});}
  function finish(py,fr){root.remove(hold);root.updateMatrixWorld(true);var h=boxOf(root).max.y;
    root.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
    return {root:root,parts:parts,height:h,engines:engines,payloadY:py,fairingRadius:fr,nasa:true};}
  root.add(hold);hold.add(sc);if(key==='atlasV401')hold.rotation.y=Math.PI/2;
  var cube=find('_root');if(cube&&cube.isMesh)cube.material=new THREE.MeshBasicMaterial({visible:false});
  root.updateMatrixWorld(true);hold.position.y=-boxOf(hold).min.y;root.updateMatrixWorld(true);
  var b1,b2,py,st1,st2;
  if(/^delta/.test(key)){
    var heavy=key==='delta7925H',sg=P('srbGround'),sa=P('srbAir'),s1=find('solid_01'),p0=new V(),q0=new THREE.Quaternion(),k0=new V(),big=new V(1.14,1.13,1.14);
    s1.matrixWorld.decompose(p0,q0,k0);
    for(var i=0;i<9;i++){var air=i%3===2,c=s1.clone(true),g=new THREE.Group(),qy=new THREE.Quaternion().setFromAxisAngle(Y,i*Math.PI*2/9),p=p0.clone();
      if(i>0)c.children.slice().forEach(function(k){c.remove(k);});
      if(heavy){p.x*=1.035;p.z*=1.035;p.y+=0.885;}
      p.applyQuaternion(qy);g.position.copy(p);c.position.set(0,0,0);c.quaternion.copy(qy).multiply(q0);c.scale.copy(k0);if(heavy)c.scale.multiply(big);
      g.add(c);(air?sa:sg).add(g);
      var e=new V(0,-6.81,0.20);if(heavy)e.multiply(big);e.applyQuaternion(c.quaternion).add(p);
      engines.push({part:air?'srbAir':'srbGround',x:e.x,y:e.y,z:e.z,r:heavy?0.46:0.40});}
    ['solid_01','solid_02','solid_03'].forEach(function(n){var o=find(n);if(o&&o.parent&&o.parent.parent!==sg&&o.parent.parent!==sa)o.parent.remove(o);});
    both(take(P('fairingA'),'fairing_r'));both(take(P('fairingB'),'fairing_l'));
    st2=P('stage2');take(st2,'stage_02');st1=P('stage1');take(st1,'stage_01');P('interstage');
    b1=boxOf(st1);b2=boxOf(st2);
    engines.push({part:'stage1',x:0,y:b1.min.y,z:0,r:0.62});engines.push({part:'stage2',x:0,y:b2.min.y,z:0,r:0.6});
    nrStar48(P('stage3'),b2.max.y);engines.push({part:'stage3',x:0,y:b2.max.y+0.12,z:0,r:0.3});
    py=b2.max.y+2.32;P('payloadMount').position.y=py;
    return finish(py,1.3);
  }
  var a401=key==='atlasV401',fa=P('fairingA'),fb=P('fairingB');
  if(a401){both(take(fa,'fairing_front'));both(take(fb,'fairing_back'));}
  else{both(take(fa,'fairing_right'));both(take(fb,'fairing_left'));take(fa,'forward_load_reactor_R');take(fb,'forward_load_reactor_L');
    var kill=find('solid_04');if(kill&&kill.parent)kill.parent.remove(kill);
    var sg2=P('srbGround');['solid_01','solid_02','solid_03','solid_05'].forEach(function(n){var o=find(n);if(!o)return;
      var g=new THREE.Group();o.getWorldPosition(g.position);var e=o.localToWorld(new V(0,-9.78,-0.18));sg2.add(g);g.attach(o);
      engines.push({part:'srbGround',x:e.x,y:e.y,z:e.z,r:0.66});});}
  st2=P('stage2');take(st2,'2nd_stage_centaur');st1=P('stage1');take(st1,'1st_stage');if(a401)P('interstage');
  b1=boxOf(st1);b2=boxOf(st2);var ad=find('adapter');py=ad?boxOf(ad).max.y:b2.max.y;
  [-0.77,0.77].forEach(function(x){var e=new V(x,0,0).applyQuaternion(hold.quaternion);engines.push({part:'stage1',x:e.x,y:b1.min.y,z:e.z,r:0.66});});
  engines.push({part:'stage2',x:0,y:b2.min.y,z:0,r:0.52});
  P('payloadMount').position.y=py;
  return finish(py,a401?1.85:2.2);
}
