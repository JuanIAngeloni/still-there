/* ---------- superficie: donde quedó cada máquina ---------- */
/* Escena en metros: x al este, y arriba, -z al norte. El terreno es inventado (ruido), los colores y la luz no:
   el Sol se pone donde estaba en ese lugar a la hora del aterrizaje. */
var SF=null;
function hash2(x,y){var h=Math.sin(x*127.1+y*311.7)*43758.5453;return h-Math.floor(h);}
function vnoise(x,y){var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  var a=hash2(xi,yi),b=hash2(xi+1,yi),c=hash2(xi,yi+1),d=hash2(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
function fbm(x,y,o){var s=0,a=0.5,f=1;for(var i=0;i<(o||5);i++){s+=a*vnoise(x*f,y*f);f*=2.03;a*=0.5;}return s;}
function grainTex(base,amp){
  var cv=document.createElement('canvas');cv.width=cv.height=256;var x=cv.getContext('2d'),im=x.createImageData(256,256);
  for(var i=0;i<256*256;i++){var px=i%256,py=(i/256)|0,n=fbm(px/9,py/9,4)*0.6+hash2(px,py)*0.4,k=1-amp+amp*2*n;
    im.data[i*4]=Math.min(255,base*k);im.data[i*4+1]=Math.min(255,base*k);im.data[i*4+2]=Math.min(255,base*k);im.data[i*4+3]=255;}
  x.putImageData(im,0,0);var t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(220,220);t.anisotropy=8;return t;
}
function cellTex(){ /* paneles solares: celdas azul oscuro con grilla */
  var cv=document.createElement('canvas');cv.width=cv.height=128;var x=cv.getContext('2d');
  x.fillStyle='#0d1b3a';x.fillRect(0,0,128,128);
  for(var i=0;i<8;i++)for(var j=0;j<8;j++){x.fillStyle='hsl(222,'+(48+hash2(i,j)*14)+'%,'+(15+hash2(j,i)*9)+'%)';x.fillRect(i*16+1,j*16+1,14,14);}
  var t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function M(o){return new THREE.MeshStandardMaterial(o);}
var MAT=null;
function mats(){if(MAT)return MAT;var ct=cellTex();MAT={
  alu:M({color:0xb9bec5,metalness:0.7,roughness:0.38}),white:M({color:0xe8e8e4,metalness:0.05,roughness:0.6}),
  gold:M({color:0xc89b3c,metalness:0.85,roughness:0.32}),dark:M({color:0x23262b,metalness:0.4,roughness:0.55}),
  cells:M({map:ct,color:0xffffff,metalness:0.35,roughness:0.35}),brown:M({color:0x5b3a24,metalness:0.1,roughness:0.85}),
  orange:M({color:0xd9822b,roughness:0.8}),bag:M({color:0xd8cbb0,roughness:0.9,transparent:true,opacity:0.92})};return MAT;}
function part(geo,mat,x,y,z,parent){var m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;if(parent)parent.add(m);return m;}
function rod(a,b,r,mat,parent){var d=new THREE.Vector3().subVectors(b,a),m=part(new THREE.CylinderGeometry(r,r,d.length(),8),mat,0,0,0,parent);
  m.position.copy(a).addScaledVector(d,0.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m;}

/* ---------- modelos propios (medidas reales aproximadas, en metros) ---------- */
var HW={
  surveyor:function(){var g=new THREE.Group(),m=mats(),V=THREE.Vector3;
    var top=new V(0,2.2,0);
    for(var i=0;i<3;i++){var a=i*2*Math.PI/3+Math.PI/6,foot=new V(Math.cos(a)*2.05,0.12,Math.sin(a)*2.05),hip=new V(Math.cos(a)*0.62,0.95,Math.sin(a)*0.62);
      rod(hip,foot,0.045,m.alu,g);rod(new V(Math.cos(a)*0.62,1.95,Math.sin(a)*0.62),hip,0.035,m.alu,g);
      rod(new V(Math.cos(a+2.094)*0.62,0.95,Math.sin(a+2.094)*0.62),hip,0.03,m.alu,g);
      var fp=part(new THREE.CylinderGeometry(0.15,0.2,0.1,14),m.alu,foot.x,0.06,foot.z,g);
      var vern=part(new THREE.ConeGeometry(0.09,0.22,12,1,true),m.dark,Math.cos(a+1.05)*0.5,0.8,Math.sin(a+1.05)*0.5,g);}
    part(new THREE.BoxGeometry(0.62,0.42,0.52),m.white,0.32,1.5,-0.25,g);part(new THREE.BoxGeometry(0.5,0.38,0.45),m.white,-0.36,1.45,0.2,g);
    part(new THREE.SphereGeometry(0.14,16,12),m.gold,0,1.2,0,g);
    rod(new V(0,0.95,0),top,0.04,m.alu,g);
    var arr=part(new THREE.BoxGeometry(0.86,0.03,0.98),m.cells,0.2,2.6,0,g);arr.rotation.z=-0.35;
    var ant=part(new THREE.BoxGeometry(0.95,0.04,0.95),m.white,-0.45,2.55,0,g);ant.rotation.z=0.45;
    var cam=part(new THREE.CylinderGeometry(0.1,0.12,0.45,12),m.white,0.55,1.85,0.45,g);cam.rotation.z=-0.4;
    part(new THREE.BoxGeometry(0.18,0.06,0.16),m.dark,0.66,2.06,0.45,g);
    return g;},
  phoenix:function(){var g=new THREE.Group(),m=mats(),V=THREE.Vector3;
    var deck=part(new THREE.CylinderGeometry(0.75,0.75,0.32,10),m.white,0,1.0,0,g);
    part(new THREE.CylinderGeometry(0.7,0.62,0.2,10),m.gold,0,0.76,0,g);
    for(var i=0;i<3;i++){var a=i*2*Math.PI/3,f=new V(Math.cos(a)*1.0,0.08,Math.sin(a)*1.0);rod(new V(Math.cos(a)*0.55,0.8,Math.sin(a)*0.55),f,0.05,m.alu,g);
      part(new THREE.CylinderGeometry(0.14,0.17,0.08,12),m.alu,f.x,0.05,f.z,g);}
    /* dos paneles decagonales; el del oeste quedó caído bajo el hielo del invierno de 2010 */
    [1,-1].forEach(function(s){var p=part(new THREE.CylinderGeometry(0.92,0.92,0.03,10),m.cells,s*1.72,1.12,0,g);
      if(s<0){p.rotation.z=0.75;p.position.y=0.62;p.position.x=-1.45;}rod(new V(s*0.75,1.05,0),new V(s*0.95,1.1,0),0.03,m.alu,g);});
    rod(new V(0.2,1.15,0.3),new V(0.25,2.0,0.3),0.035,m.alu,g);part(new THREE.BoxGeometry(0.22,0.14,0.16),m.white,0.25,2.08,0.3,g);
    rod(new V(-0.3,1.15,-0.35),new V(-0.3,2.15,-0.35),0.015,m.alu,g);
    rod(new V(0.4,1.1,-0.4),new V(1.3,1.5,-1.3),0.04,m.white,g);rod(new V(1.3,1.5,-1.3),new V(1.7,0.25,-1.6),0.035,m.white,g);
    part(new THREE.BoxGeometry(0.16,0.12,0.2),m.alu,1.72,0.2,-1.62,g);
    return g;},
  pathfinder:function(){var g=new THREE.Group(),m=mats(),V=THREE.Vector3;
    part(new THREE.CylinderGeometry(0.55,0.62,0.45,3),m.white,0,0.32,0,g);
    for(var i=0;i<3;i++){var a=i*2*Math.PI/3+Math.PI/3,sh=new THREE.Shape();sh.moveTo(-0.55,0);sh.lineTo(0.55,0);sh.lineTo(0,1.1);sh.lineTo(-0.55,0);
      var pet=part(new THREE.ShapeGeometry(sh),m.cells,0,0,0,g);pet.rotation.x=-Math.PI/2;pet.rotation.z=-a+Math.PI/2;
      pet.position.set(Math.cos(a)*0.32,0.1,Math.sin(a)*0.32);pet.material=m.cells;pet.material.side=THREE.DoubleSide;
      for(var k=0;k<4;k++){var bl=part(new THREE.SphereGeometry(0.3+hash2(i,k)*0.12,10,8),m.bag,Math.cos(a)*(1.5+k*0.08)+Math.cos(a+1.57)*(k-1.5)*0.45,0.16,Math.sin(a)*(1.5+k*0.08)+Math.sin(a+1.57)*(k-1.5)*0.45,g);bl.scale.y=0.35;}}
    rod(new V(0,0.5,0),new V(0,1.15,0),0.03,m.alu,g);part(new THREE.BoxGeometry(0.26,0.12,0.12),m.white,0,1.22,0,g);
    /* Sojourner, a un par de metros: nunca se alejó más de 12 m del módulo */
    var s=new THREE.Group();part(new THREE.BoxGeometry(0.48,0.16,0.62),m.gold,0,0.3,0,s);part(new THREE.BoxGeometry(0.5,0.02,0.6),m.cells,0,0.39,0,s);
    [-0.28,0.28].forEach(function(x){[-0.26,0,0.26].forEach(function(z){var w=part(new THREE.CylinderGeometry(0.065,0.065,0.08,12),m.alu,x,0.065,z,s);w.rotation.z=Math.PI/2;});});
    s.position.set(2.4,0,1.6);s.rotation.y=-0.7;g.add(s);
    return g;},
  /* cápsula de entrada (escudo térmico y cubierta trasera), 2,65 m de diámetro */
  aeroshell:function(){var g=new THREE.Group(),m=mats(),V2=THREE.Vector2;
    if(!MAT.sla){MAT.sla=M({color:0xa8876a,metalness:0,roughness:0.92});MAT.shell=M({color:0xd8d2c4,metalness:0.05,roughness:0.78});MAT.mli=M({color:0x2c2c30,metalness:0.55,roughness:0.42});MAT.foil=M({color:0xc9a04a,metalness:0.9,roughness:0.3});}
    /* escudo térmico: cono romo de 70 grados */
    part(new THREE.LatheGeometry([new V2(0.001,-0.50),new V2(0.22,-0.475),new V2(0.45,-0.40),new V2(0.9,-0.21),new V2(1.27,-0.05),new V2(1.325,0.0),new V2(1.325,0.05)],56),m.sla,0,0,0,g);
    /* cubierta trasera, con la tapa del paracaídas y las tres tapas de los cohetes de frenado */
    part(new THREE.LatheGeometry([new V2(1.325,0.05),new V2(1.30,0.10),new V2(0.74,0.92),new V2(0.70,0.98)],56),m.shell,0,0,0,g);
    part(new THREE.LatheGeometry([new V2(0.70,0.98),new V2(0.46,1.10),new V2(0.44,1.18),new V2(0.001,1.20)],40),m.shell,0,0,0,g);
    part(new THREE.TorusGeometry(1.318,0.022,8,56),m.alu,0,0.05,0,g).rotation.x=Math.PI/2;
    for(var i=0;i<3;i++){var a=i*2*Math.PI/3+0.5,b=part(new THREE.CylinderGeometry(0.11,0.11,0.05,16),m.mli,Math.cos(a)*0.98,0.55,Math.sin(a)*0.98,g);b.rotation.z=-Math.cos(a)*0.95;b.rotation.x=Math.sin(a)*0.95;}
    return g;},
  /* configuración de crucero: la etapa de crucero, con los paneles solares en anillo, va atornillada sobre la cápsula */
  cruise:function(){var g=HW.aeroshell(),m=mats(),i,a;
    part(new THREE.CylinderGeometry(1.30,1.30,0.24,56,1,true),MAT.mli,0,1.30,0,g).material.side=THREE.DoubleSide;
    part(new THREE.CylinderGeometry(1.30,0.72,0.14,56,1,true),MAT.foil,0,1.13,0,g).material.side=THREE.DoubleSide;
    var ring=part(new THREE.RingGeometry(0.66,1.30,56,1),m.cells,0,1.421,0,g);ring.rotation.x=-Math.PI/2;
    part(new THREE.CylinderGeometry(0.66,0.66,0.30,40,1,true),m.alu,0,1.50,0,g).material.side=THREE.DoubleSide;
    part(new THREE.CylinderGeometry(0.66,0.66,0.02,40),MAT.mli,0,1.43,0,g);
    part(new THREE.TorusGeometry(0.66,0.025,8,40),m.alu,0,1.65,0,g).rotation.x=Math.PI/2;
    part(new THREE.TorusGeometry(1.30,0.02,8,56),m.alu,0,1.42,0,g).rotation.x=Math.PI/2;
    /* radiadores blancos, tanques de combustible, propulsores y antena */
    for(i=0;i<10;i++){a=i*Math.PI/5;var r=part(new THREE.BoxGeometry(0.42,0.17,0.012),m.white,Math.cos(a)*1.308,1.30,Math.sin(a)*1.308,g);r.rotation.y=Math.PI/2-a;}
    for(i=0;i<2;i++){a=i*Math.PI+0.6;part(new THREE.SphereGeometry(0.21,20,14),MAT.foil,Math.cos(a)*0.36,1.42,Math.sin(a)*0.36,g);
      var t=part(new THREE.BoxGeometry(0.16,0.12,0.16),m.alu,Math.cos(a+Math.PI/2)*1.34,1.33,Math.sin(a+Math.PI/2)*1.34,g);t.rotation.y=-a;}
    part(new THREE.CylinderGeometry(0.05,0.07,0.34,16),m.alu,0,1.62,0,g);part(new THREE.CylinderGeometry(0.11,0.11,0.03,20),m.white,0,1.80,0,g);
    return g;},
  chute:function(d){var g=new THREE.Group(),m=mats();
    var c=part(new THREE.SphereGeometry(d/2,24,10,0,Math.PI*2,0,Math.PI/2.6),m.orange,0,0,0,g);c.material=M({color:0xe8e4da,roughness:0.85,side:THREE.DoubleSide});
    var band=part(new THREE.SphereGeometry(d/2*1.002,24,4,0,Math.PI*2,Math.PI/3.4,Math.PI/2.6-Math.PI/3.4),M({color:0xd5732a,roughness:0.85,side:THREE.DoubleSide}),0,0,0,g);
    for(var i=0;i<12;i++){var a=i/12*Math.PI*2;rod(new THREE.Vector3(Math.cos(a)*d*0.39,d*0.18,Math.sin(a)*d*0.39),new THREE.Vector3(0,-d*1.6,0),0.012,m.white,g);}
    return g;},
  airbags:function(){var g=new THREE.Group(),m=mats();
    for(var i=0;i<4;i++){var a=i/4*Math.PI*2;part(new THREE.SphereGeometry(1.6,16,12),m.bag,Math.cos(a)*1.1,0,Math.sin(a)*1.1,g);}
    part(new THREE.SphereGeometry(1.5,16,12),m.bag,0,1.15,0,g);part(new THREE.SphereGeometry(1.5,16,12),m.bag,0,-1.15,0,g);return g;}
};

function initSurface(){
  if(SF)return SF;
  SF={scene:new THREE.Scene(),cam:new THREE.PerspectiveCamera(50,W/H,0.05,8000),orb:{az:0.6,el:0.18,r:8.5,azT:0.6,elT:0.18,rT:8.5}};
  var s=SF.scene;
  SF.sun=new THREE.DirectionalLight(0xffffff,2);SF.sun.castShadow=true;SF.sun.shadow.mapSize.set(2048,2048);
  var sc=SF.sun.shadow.camera;sc.left=-14;sc.right=14;sc.top=14;sc.bottom=-14;sc.near=1;sc.far=120;SF.sun.shadow.bias=-0.0006;
  s.add(SF.sun);s.add(SF.sun.target);
  SF.hemi=new THREE.HemisphereLight(0xffffff,0x332211,0.4);s.add(SF.hemi);
  SF.skyU={uSun:{value:new THREE.Vector3(0,1,0)},uHor:{value:new THREE.Color()},uZen:{value:new THREE.Color()},uGlow:{value:new THREE.Color()},uSize:{value:0.9995}};
  SF.sky=new THREE.Mesh(new THREE.SphereGeometry(6000,48,24),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:SF.skyU,
    vertexShader:'varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'uniform vec3 uSun;uniform vec3 uHor;uniform vec3 uZen;uniform vec3 uGlow;uniform float uSize;varying vec3 vD;'+
      'void main(){float h=clamp(vD.y,0.0,1.0);vec3 c=mix(uHor,uZen,pow(h,0.55));float cs=dot(vD,normalize(uSun));'+
      'c+=uGlow*pow(max(cs,0.0),14.0)*0.9+uGlow*pow(max(cs,0.0),220.0)*1.5;c+=vec3(1.0,0.97,0.9)*smoothstep(uSize,uSize+0.00025,cs)*3.0;gl_FragColor=vec4(c,1.0);}'}));
  SF.sky.renderOrder=-1;s.add(SF.sky);
  SF.root=new THREE.Group();s.add(SF.root);
  return SF;
}
/* arma el lugar: kind 'mars' | 'moon' | 'eros'; sun = {el, az} en grados (az desde el norte hacia el este) */
function buildSurface(kind,sun,opts){
  initSurface();opts=opts||{};
  while(SF.root.children.length){var c=SF.root.children.pop();c.traverse&&c.traverse(function(o){if(o.geometry)o.geometry.dispose();});}
  var seed=opts.seed||1,N=220,S=2400,g=new THREE.PlaneGeometry(S,S,N,N);g.rotateX(-Math.PI/2);
  var p=g.attributes.position,col=new Float32Array(p.count*3),base,dark;
  if(kind==='mars'){base=[0.66,0.40,0.25];dark=[0.40,0.24,0.16];}else if(kind==='moon'){base=[0.47,0.46,0.45];dark=[0.30,0.30,0.30];}else{base=[0.50,0.45,0.38];dark=[0.33,0.29,0.24];}
  var craters=[];for(var i=0;i<(kind==='mars'?14:46);i++){var cr=Math.pow(hash2(i,seed),2.5)*(kind==='mars'?40:60)+2;craters.push([ (hash2(seed,i)-0.5)*S*0.8,(hash2(i*3,seed+1)-0.5)*S*0.8,cr]);}
  for(i=0;i<p.count;i++){
    var x=p.getX(i),z=p.getZ(i),r=Math.sqrt(x*x+z*z),h=(fbm(x/180+seed,z/180,5)-0.5)*(kind==='mars'?22:14)+(fbm(x/14,z/14+seed,4)-0.5)*1.6+(fbm(x/2.2,z/2.2,3)-0.5)*0.22;
    if(opts.slope)h+=x*opts.slope;
    for(var k=0;k<craters.length;k++){var c2=craters[k],dx=x-c2[0],dz=z-c2[1],q=Math.sqrt(dx*dx+dz*dz)/c2[2];
      if(q<1.6)h+=q<1?c2[2]*0.22*(q*q-1)+c2[2]*0.06:c2[2]*0.06*Math.pow(Math.max(0,1.6-q)/0.6,2);}
    var flat=Math.min(1,Math.max(0,(r-5)/18));h*=0.15+0.85*flat;
    if(kind==='eros')h-=r*r/(2*5200);
    p.setY(i,h);
    var n=fbm(x/60+3,z/60,4),t2=Math.min(1,Math.max(0,(n-0.35)*1.6));
    col[i*3]=base[0]+(dark[0]-base[0])*t2;col[i*3+1]=base[1]+(dark[1]-base[1])*t2;col[i*3+2]=base[2]+(dark[2]-base[2])*t2;
  }
  /* el suelo bajo la nave queda a la altura 0: los modelos se apoyan en y = 0 y si no, quedaban enterrados o flotando */
  var c0=Math.round(N/2)*(N+1)+Math.round(N/2),h0=p.getY(c0);for(i=0;i<p.count;i++)p.setY(i,p.getY(i)-h0);
  g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();
  var ground=new THREE.Mesh(g,M({vertexColors:true,map:grainTex(235,kind==='moon'?0.22:0.3),roughness:1,metalness:0}));
  ground.receiveShadow=true;SF.root.add(ground);SF.ground=ground;SF.heightAt=function(x,z){return 0;};
  /* rocas */
  var rg=new THREE.IcosahedronGeometry(1,2),rp=rg.attributes.position,v=new THREE.Vector3();
  for(i=0;i<rp.count;i++){v.fromBufferAttribute(rp,i);var nn=0.8+0.22*vnoise(v.x*2.3+4,v.y*2.3+v.z*1.7)+0.12*vnoise(v.x*6,v.z*6);rp.setXYZ(i,v.x*nn,v.y*nn*0.55,v.z*nn);}
  rg.computeVertexNormals();
  var cnt=kind==='eros'?500:1800,rocks=new THREE.InstancedMesh(rg,M({color:kind==='mars'?0x5e3e2b:(kind==='moon'?0x504f4c:0x5a5145),roughness:1}),cnt),mm=new THREE.Matrix4(),qq=new THREE.Quaternion(),ss=new THREE.Vector3();
  for(i=0;i<cnt;i++){var rr=3.5+Math.pow(hash2(i,7+seed),1.3)*300,aa=hash2(seed+3,i)*Math.PI*2,sz=(0.03+Math.pow(hash2(i,11),7)*(kind==='eros'?3.5:0.55))*(rr<14?0.45:1);
    var px=Math.cos(aa)*rr,pz=Math.sin(aa)*rr;qq.setFromEuler(new THREE.Euler(hash2(i,1)*3,hash2(i,2)*6,hash2(i,3)*3));ss.set(sz,sz,sz);
    var py=heightOf(g,px,pz,S,N)+sz*0.04;mm.compose(new THREE.Vector3(px,py,pz),qq,ss);rocks.setMatrixAt(i,mm);}
  rocks.castShadow=true;rocks.receiveShadow=true;SF.root.add(rocks);
  /* cielo y luz */
  var e=sun.el*DEG,a=sun.az*DEG,dir=new THREE.Vector3(Math.cos(e)*Math.sin(a),Math.sin(e),-Math.cos(e)*Math.cos(a));
  SF.sunDir=dir;SF.sun.position.copy(dir).multiplyScalar(60);SF.sun.target.position.set(0,0,0);SF.skyU.uSun.value.copy(dir);
  var low=1-Math.min(1,Math.max(0,sun.el/25));
  if(kind==='mars'){
    SF.skyU.uHor.value.setRGB(0.80,0.58,0.42).multiplyScalar(0.55+0.45*Math.min(1,Math.max(0,(sun.el+4)/20)));
    SF.skyU.uZen.value.setRGB(0.42,0.30,0.23).multiplyScalar(0.5+0.5*Math.min(1,Math.max(0,sun.el/30)));
    SF.skyU.uGlow.value.setRGB(0.55+0.2*(1-low),0.62,0.78+0.2*low);SF.skyU.uSize.value=0.99998;
    SF.scene.fog=new THREE.FogExp2(SF.skyU.uHor.value.getHex(),0.0019);SF.sun.color.setRGB(1,0.9,0.78);SF.sun.intensity=1.75;
    SF.hemi.color.setRGB(0.85,0.62,0.45);SF.hemi.groundColor.setRGB(0.42,0.26,0.17);SF.hemi.intensity=0.55;
  }else{
    SF.skyU.uHor.value.setRGB(0,0,0);SF.skyU.uZen.value.setRGB(0,0,0);SF.skyU.uGlow.value.setRGB(0.25,0.24,0.22);SF.skyU.uSize.value=0.99996;
    SF.scene.fog=null;SF.sun.color.setRGB(1,0.98,0.95);SF.sun.intensity=2.05;SF.hemi.color.setRGB(0.3,0.32,0.36);SF.hemi.groundColor.setRGB(0.2,0.2,0.2);SF.hemi.intensity=0.12;
  }
  if(sun.el<0){SF.sun.intensity*=0.05;}
  /* la Tierra en el cielo de la Luna */
  if(SF.earthSky){SF.scene.remove(SF.earthSky);SF.earthSky=null;}
  if(kind==='moon'&&opts.earth){
    var ed=opts.earth,em=new THREE.ShaderMaterial({uniforms:{uDay:{value:earthMat.uniforms.uDay.value},uNight:{value:earthMat.uniforms.uNight.value},uSun:{value:dir.clone()}},
      vertexShader:earthMat.vertexShader,fragmentShader:earthMat.fragmentShader,fog:false});
    SF.earthSky=new THREE.Mesh(new THREE.SphereGeometry(66,48,32),em);
    SF.earthDir=new THREE.Vector3(Math.cos(ed.el*DEG)*Math.sin(ed.az*DEG),Math.sin(ed.el*DEG),-Math.cos(ed.el*DEG)*Math.cos(ed.az*DEG));
    SF.earthSky.position.copy(SF.earthDir).multiplyScalar(4000);
    SF.scene.add(SF.earthSky);
  }
  SF.kind=kind;return SF;
}
/* altura del terreno en un punto, interpolada entre los cuatro vértices de la celda (así las piedras no quedan flotando ni enterradas) */
function heightOf(g,x,z,S,N){var p=g.attributes.position,fx=(x/S+0.5)*N,fz=(z/S+0.5)*N,i=Math.max(0,Math.min(N-1,Math.floor(fx))),j=Math.max(0,Math.min(N-1,Math.floor(fz))),
  u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j)),k=j*(N+1)+i,a=p.getY(k),b=p.getY(k+1),c=p.getY(k+N+1),d=p.getY(k+N+2);
  return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v;}
function renderSurface(dt){
  var o=SF.orb;
  if(!SF.dragging&&!reduce&&SF.autoSpin)o.azT+=dt*0.035;
  var f=dt?Math.min(1,dt*3.2):1;o.az+=(o.azT-o.az)*f;o.el+=(o.elT-o.el)*f;o.r+=(o.rT-o.r)*f;
  var cam=SF.cam,tg=SF.target||new THREE.Vector3(0,0.9,0);
  if(!SF.camOverride){cam.position.set(tg.x+o.r*Math.cos(o.el)*Math.sin(o.az),tg.y+o.r*Math.sin(o.el),tg.z+o.r*Math.cos(o.el)*Math.cos(o.az));cam.lookAt(tg);}
  cam.aspect=W/H;viewFor(cam);cam.updateProjectionMatrix();
  SF.sky.position.copy(cam.position);if(SF.earthSky)SF.earthSky.position.copy(cam.position).addScaledVector(SF.earthDir,4000);
  renderer.shadowMap.enabled=true;renderer.render(SF.scene,cam);
}
