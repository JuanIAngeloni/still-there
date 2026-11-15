/* ---------- astronomía: tiempo, marcos de referencia, tablas de JPL Horizons y cónicas ---------- */
/* Escena del espacio: eclíptica y equinoccio J2000, origen en el Sol, 1 unidad = 1000 km.
   Las tablas de Horizons vienen en km y km/s; se interpolan con Hermite cúbico usando las velocidades. */
var UNIT_KM=1000,MU_EARTH=398600.4418,DEG=Math.PI/180,EPS_J2000=23.4392911*DEG;
var R_KM={earth:6371.0,moon:1737.4,mars:3389.5,jupiter:69911,vesta:262.7,ceres:469.7,eros:8.4,sun:695700};
function jdOf(ms){return ms/864e5+2440587.5;}          /* UTC; la diferencia con TDB (un minuto) no se ve */
function msOfJd(jd){return (jd-2440587.5)*864e5;}

function Track(rows){this.r=rows;this.n=rows.length;this.j0=rows[0][0];this.j1=rows[rows.length-1][0];}
/* posición (unidades de escena) y, si se pide, velocidad (km/s) en la fecha juliana jd */
Track.prototype.at=function(jd,out,vel){
  var r=this.r,n=this.n,a,b;
  if(jd<=r[0][0]||jd>=r[n-1][0]){
    a=jd<=r[0][0]?r[0]:r[n-1];var dt=(jd-a[0])*86400;
    out.set((a[1]+a[4]*dt)/UNIT_KM,(a[2]+a[5]*dt)/UNIT_KM,(a[3]+a[6]*dt)/UNIT_KM);
    if(vel)vel.set(a[4],a[5],a[6]);return out;
  }
  var lo=0,hi=n-1;while(hi-lo>1){var mid=(lo+hi)>>1;if(r[mid][0]<=jd)lo=mid;else hi=mid;}
  a=r[lo];b=r[hi];
  var h=(b[0]-a[0])*86400,s=(jd-a[0])/(b[0]-a[0]),s2=s*s,s3=s2*s,
      h00=2*s3-3*s2+1,h10=s3-2*s2+s,h01=-2*s3+3*s2,h11=s3-s2;
  out.set((h00*a[1]+h10*h*a[4]+h01*b[1]+h11*h*b[4])/UNIT_KM,
          (h00*a[2]+h10*h*a[5]+h01*b[2]+h11*h*b[5])/UNIT_KM,
          (h00*a[3]+h10*h*a[6]+h01*b[3]+h11*h*b[6])/UNIT_KM);
  if(vel){var d00=6*s2-6*s,d10=3*s2-4*s+1,d01=-6*s2+6*s,d11=3*s2-2*s;
    vel.set((d00*a[1]+d10*h*a[4]+d01*b[1]+d11*h*b[4])/h,(d00*a[2]+d10*h*a[5]+d01*b[2]+d11*h*b[5])/h,(d00*a[3]+d10*h*a[6]+d01*b[3]+d11*h*b[6])/h);}
  return out;
};
/* puntos de la tabla entre dos fechas, para dibujar la línea */
Track.prototype.points=function(j0,j1,maxN){
  var out=[],r=this.r,step=Math.max(1,Math.ceil(this.n/(maxN||2000)));
  for(var i=0;i<this.n;i+=step){if(r[i][0]>=j0&&r[i][0]<=j1)out.push([r[i][1]/UNIT_KM,r[i][2]/UNIT_KM,r[i][3]/UNIT_KM,r[i][0]]);}
  return out;
};
var TRACKS={};
function hzTrack(key){if(!TRACKS[key]&&HZ[key])TRACKS[key]=new Track(HZ[key]);return TRACKS[key]||null;}

/* de ecuatorial (ICRF) a eclíptica J2000 */
function eqToEcl(x,y,z,out){var c=Math.cos(EPS_J2000),s=Math.sin(EPS_J2000);return out.set(x,c*y+s*z,-s*y+c*z);}
function gmst(jd){return ((280.46061837+360.98564736629*(jd-2451545.0))%360)*DEG;}
/* Orientación de un cuerpo para su malla: la textura pone longitud 0 en +x local, el polo norte en +y local
   y 90° oeste en +z local. Se arma con los ejes fijos al cuerpo expresados en la eclíptica. */
var _ax=new THREE.Vector3(),_ay=new THREE.Vector3(),_az=new THREE.Vector3(),_m4=new THREE.Matrix4();
function setBodyAxes(q,X,Z){                       /* X: longitud 0 en el ecuador; Z: polo norte (ambos en la eclíptica) */
  _ay.copy(Z).normalize();_ax.copy(X).normalize();_az.crossVectors(_ax,_ay);
  _m4.makeBasis(_ax,_ay,_az);return q.setFromRotationMatrix(_m4);
}
function earthAxes(jd,q){
  var g=gmst(jd),X=eqToEcl(Math.cos(g),Math.sin(g),0,new THREE.Vector3()),Z=eqToEcl(0,0,1,new THREE.Vector3());
  return setBodyAxes(q,X,Z);
}
/* Polo y meridiano según la IAU (α0, δ0, W en grados); sirve para Marte y Júpiter. */
function iauAxes(jd,a0,d0,w,q){
  var A=a0*DEG,D=d0*DEG,Wr=w*DEG,
      Z=new THREE.Vector3(Math.cos(D)*Math.cos(A),Math.cos(D)*Math.sin(A),Math.sin(D)),
      N=new THREE.Vector3(-Math.sin(A),Math.cos(A),0),
      X=N.clone().multiplyScalar(Math.cos(Wr)).add(new THREE.Vector3().crossVectors(Z,N).multiplyScalar(Math.sin(Wr)));
  return setBodyAxes(q,eqToEcl(X.x,X.y,X.z,new THREE.Vector3()),eqToEcl(Z.x,Z.y,Z.z,new THREE.Vector3()));
}
function marsAxes(jd,q){var d=jd-2451545.0,T=d/36525;return iauAxes(jd,317.68143-0.1061*T,52.88650-0.0609*T,176.630+350.89198226*d,q);}
function jupiterAxes(jd,q){var d=jd-2451545.0,T=d/36525;return iauAxes(jd,268.056595-0.006499*T,64.495303+0.002413*T,284.95+870.5360000*d,q);}
/* La Luna muestra siempre la misma cara: longitud 0 hacia la Tierra y el norte hacia el norte de la eclíptica. */
function moonAxes(moonGeo,q){
  var X=moonGeo.clone().negate(),Z=new THREE.Vector3(0,0,1);Z.addScaledVector(X.clone().normalize(),-Z.dot(X.clone().normalize()));
  return setBodyAxes(q,X,Z);
}
/* dirección de un punto de la superficie (latitud, longitud este) en ejes locales de la malla */
function siteLocal(lat,lon,out){var la=lat*DEG,lo=lon*DEG;return out.set(Math.cos(la)*Math.cos(lo),Math.sin(la),-Math.cos(la)*Math.sin(lo));}

/* ---------- cónica reconstruida para las misiones a la Luna que no están en Horizons ---------- */
/* Elipse con perigeo a 185 km de altura que pasa por el punto de llegada (relativo a la Tierra) exactamente
   tof segundos después de la inyección. Se busca el ángulo de transferencia que cumple ese tiempo. */
function lunarConic(rArr,tof,planeN){
  var R2=rArr.length()*UNIT_KM,rp=6371+185,mu=MU_EARTH;
  /* cuanto más cerca de 180° el ángulo, más lenta la elipse; por debajo de unos 165° ya no es elipse */
  function orbit(nu){var e=(R2-rp)/(rp-R2*Math.cos(nu));if(e>=0.99999||e<=0)return null;
    var a=rp/(1-e),n=Math.sqrt(mu/(a*a*a)),E=2*Math.atan(Math.sqrt((1-e)/(1+e))*Math.tan(nu/2));return {e:e,a:a,n:n,t:(E-e*Math.sin(E))/n};}
  var lo=100*DEG,hi=179.5*DEG,o=null;
  for(var i=0;i<80;i++){var mid=(lo+hi)/2,m=orbit(mid);if(!m||m.t<tof)lo=mid;else hi=mid;}
  var nu=(lo+hi)/2;o=orbit(nu)||orbit(hi);
  /* plano: el que contiene la llegada y la normal pedida; perigeo a nu grados antes de la llegada */
  var u2=rArr.clone().normalize(),nn=planeN.clone().addScaledVector(u2,-planeN.dot(u2)).normalize(),w=new THREE.Vector3().crossVectors(nn,u2);
  var P=u2.clone().multiplyScalar(Math.cos(nu)).addScaledVector(w,-Math.sin(nu)),Q=new THREE.Vector3().crossVectors(nn,P);
  return {e:o.e,a:o.a,n:o.n,P:P,Q:Q,tof:o.t,nu:nu,
    /* posición relativa a la Tierra (unidades de escena) a t segundos de la inyección; vel en km/s */
    at:function(t,out,vel){var M=this.n*t,E=M;for(var k=0;k<30;k++)E-=(E-this.e*Math.sin(E)-M)/(1-this.e*Math.cos(E));
      var b=this.a*Math.sqrt(1-this.e*this.e),c=Math.cos(E),s=Math.sin(E);
      out.copy(this.P).multiplyScalar(this.a*(c-this.e)/UNIT_KM).addScaledVector(this.Q,b*s/UNIT_KM);
      if(vel){var Ed=this.n/(1-this.e*c);vel.copy(this.P).multiplyScalar(-this.a*s*Ed).addScaledVector(this.Q,b*c*Ed);}
      return out;}};
}
