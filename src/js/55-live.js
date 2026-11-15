/* ---------- ahora mismo: datos de cada máquina calculados para este segundo ----------
   Con las efemérides de JPL Horizons bajadas para el 13 de noviembre de 2026 al 1 de marzo de 2027
   (now_* en tools/horizons.py) y el reloj de la computadora: distancia a la Tierra y al Sol, cuánto tarda
   una señal de radio en llegar y, en la Luna y en Marte, si en ese lugar ahora es de día o de noche. */
var LIVE_STR={
  es:{now:'Ahora mismo',calc:'Calculado para este segundo con JPL Horizons',calcAt:'Calculado para el {d} con JPL Horizons (los datos llegan hasta esa fecha)',
      dEarth:'Distancia a la Tierra',dSun:'Distancia al Sol',away:'Se aleja del Sol',kms:'km por segundo',light:'Una señal de radio tarda',
      day:'En ese lugar ahora es de día: el Sol está a {e}° de altura',night:'En ese lugar ahora es de noche',
      h:'h',min:'min',s:'s',ua:'UA'},
  en:{now:'Right now',calc:'Worked out for this very second with JPL Horizons',calcAt:'Worked out for {d} with JPL Horizons (the data ends on that date)',
      dEarth:'Distance to Earth',dSun:'Distance to the Sun',away:'Moving away from the Sun',kms:'km every second',light:'A radio signal takes',
      day:'It is daytime there right now: the Sun is {e}° above the horizon',night:'It is night there right now',
      h:'h',min:'min',s:'s',ua:'AU'}};
function lvt(k){return LIVE_STR[lang][k];}
var LIVE_T0=null,LIVE_T1=null;
function liveRange(){if(LIVE_T0===null){var t=hzTrack('now_earth');if(t){LIVE_T0=t.j0;LIVE_T1=t.j1;}}return LIVE_T0!==null;}
/* fecha juliana de ahora, dentro del rango de las tablas */
function liveJd(){var j=jdOf(Date.now());if(!liveRange())return j;return Math.max(LIVE_T0,Math.min(LIVE_T1,j));}
function fmtLight(sec){var L=LIVE_STR[lang];if(sec<60)return (Math.round(sec*10)/10).toFixed(1).replace('.',lang==='es'?',':'.')+' '+L.s;
  var h=Math.floor(sec/3600),mi=Math.floor((sec%3600)/60),s=Math.floor(sec%60);return (h?h+' '+L.h+' ':'')+mi+' '+L.min+' '+(h?'':s+' '+L.s);}
var _lv1=new THREE.Vector3(),_lv2=new THREE.Vector3(),_lv3=new THREE.Vector3(),_lvq=new THREE.Quaternion();
function liveRows(m){
  if(!HZ_READY||!liveRange())return null;
  var X=JX[m.id];if(!X)return null;
  var jd=liveJd(),E=hzTrack('now_earth').at(jd,new THREE.Vector3()),pos=_lv1,vel=_lv2.set(0,0,0),rows=[],sky=null;
  if(X.type==='moon'){hzTrack('now_moon').at(jd,_lv3);pos.copy(_lv3).add(E);moonAxes(_lv3,_lvq);sky=localSky(_lvq,pos,X.site[0],X.site[1],new THREE.Vector3(0,0,0));}
  else if(X.type==='mars'){hzTrack('now_mars').at(jd,pos,vel);marsAxes(jd,_lvq);sky=localSky(_lvq,pos,X.site[0],X.site[1],new THREE.Vector3(0,0,0));}
  else{var key=m.id==='near'?'eros':(m.id==='dawn'?'ceres':m.id),tr=hzTrack('now_'+key);if(!tr)return null;tr.at(jd,pos,vel);}
  var dE=pos.distanceTo(E)*UNIT_KM,dS=pos.length()*UNIT_KM,lt=dE/299792.458;
  rows.push([lvt('dEarth'),fmt(Math.round(dE))+' km']);
  if(X.type==='outer'){rows.push([lvt('dSun'),fmt(Math.round(dS))+' km ('+(Math.round(dS/149597870.7*10)/10).toFixed(1).replace('.',lang==='es'?',':'.')+' '+lvt('ua')+')']);
    var vr=pos.dot(vel)/Math.max(pos.length(),1e-9);if(vr>0.05)rows.push([lvt('away'),(Math.round(vr*10)/10).toFixed(1).replace('.',lang==='es'?',':'.')+' '+lvt('kms')]);}
  rows.push([lvt('light'),fmtLight(lt)]);
  var note=null;if(sky)note=sky.el>0?lvt('day').replace('{e}',Math.round(sky.el)):lvt('night');
  var j=jdOf(Date.now()),stamp=(j>=LIVE_T0&&j<=LIVE_T1)?lvt('calc'):lvt('calcAt').replace('{d}',(function(){var d=new Date(msOfJd(jd));return d.getUTCDate()+' '+STR[lang].months[d.getUTCMonth()]+' '+d.getUTCFullYear();})());
  return {rows:rows,note:note,stamp:stamp};
}
/* en la tarjeta de Hoy: un bloque que se actualiza cada segundo */
var LIVE={el:null,m:null,iv:0};
function liveSection(c,m){
  var box=add(c,'div','jr-live');LIVE.el=box;LIVE.m=m;liveFill();
  clearInterval(LIVE.iv);LIVE.iv=setInterval(function(){if(!LIVE.el||!document.body.contains(LIVE.el)||!JR.active){clearInterval(LIVE.iv);LIVE.el=null;return;}liveFill();},1000);
}
function liveFill(){
  var r=liveRows(LIVE.m),box=LIVE.el;if(!box)return;if(!r){box.hidden=true;return;}box.hidden=false;
  if(!box.firstChild){var h=add(box,'h3','');h.innerHTML='<i></i>';h.appendChild(document.createTextNode(''));add(box,'dl','');add(box,'p','jr-lnote');add(box,'p','jr-lstamp');}
  box.querySelector('h3').lastChild.textContent=lvt('now');
  var dl=box.querySelector('dl');while(dl.children.length<r.rows.length*2){add(dl,'dt','');add(dl,'dd','');}
  while(dl.children.length>r.rows.length*2)dl.removeChild(dl.lastChild);
  r.rows.forEach(function(row,i){if(dl.children[i*2].textContent!==row[0])dl.children[i*2].textContent=row[0];if(dl.children[i*2+1].textContent!==row[1])dl.children[i*2+1].textContent=row[1];});
  var n=box.querySelector('.jr-lnote');n.hidden=!r.note;if(r.note&&n.textContent!==r.note)n.textContent=r.note;
  var st=box.querySelector('.jr-lstamp');if(st.textContent!==r.stamp)st.textContent=r.stamp;
}
(function(){var st=document.createElement('style');st.textContent=
'.jr-live{border:1px solid rgba(127,212,154,.35);border-radius:9px;padding:8px 11px;background:rgba(127,212,154,.06);display:grid;gap:4px}.jr-live[hidden]{display:none}'+
'.jr-live h3{margin:0!important;display:flex;align-items:center;gap:7px;color:#9fe0b2!important}.jr-live h3 i{width:7px;height:7px;border-radius:50%;background:#7fd49a;box-shadow:0 0 8px 2px rgba(127,212,154,.6);animation:tw 1.6s ease-in-out infinite}'+
'.jr-live dl{margin:0;display:grid;grid-template-columns:auto 1fr;column-gap:12px;row-gap:2px;font-size:13px}.jr-live dt{color:var(--fg-dim)}.jr-live dd{margin:0;text-align:right;font-variant-numeric:tabular-nums;font-weight:500}'+
'.jr-lnote{margin:0;font-size:13px}.jr-lstamp{margin:0;font-size:11px;color:var(--fg-faint)}';
document.head.appendChild(st);})();
