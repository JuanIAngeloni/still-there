/* ---------- viaje: seguir a una nave desde la Tierra hasta donde quedó ---------- */
var MU_MARS=42828.37,MIN=6e4;
/* Datos de cada viaje. Coordenadas, horas y distancias: ver FUENTES.md (verificadas el 14-nov-2026). */
var JX={
  surveyor1:{type:'moon',moonT:'surveyor1_moon',earthT:'surveyor1_earth',inj:Date.UTC(1966,4,30,14,53),land:Date.UTC(1966,5,2,6,17,36),site:[-2.4745,-43.3398],
    craft:'surveyor',craftM:3.3,hw:'surveyor',edl:'thrust',recon:true,
    place:{es:'Océano de las Tormentas, junto al cráter Flamsteed',en:'Ocean of Storms, next to Flamsteed crater'},
    today:{es:['Fue la primera nave de Estados Unidos en posarse suave en la Luna.','Mandó 11.240 fotos por televisión.','En 2009 la sonda LRO la fotografió desde órbita: se ve hasta su sombra.'],
           en:['The first US spacecraft to land softly on the Moon.','It sent back 11,240 television pictures.','In 2009 the LRO orbiter photographed it from above, shadow and all.']}},
  pathfinder:{type:'mars',key:'pathfinder',land:Date.UTC(1997,6,4,16,56,55),site:[19.17,-33.21],craft:'cruise',craftM:2.65,hw:'pathfinder',edl:'airbag',
    place:{es:'Ares Vallis: la Estación Memorial Carl Sagan',en:'Ares Vallis: the Carl Sagan Memorial Station'},
    today:{es:['Llevó a Sojourner, el primer vehículo con ruedas en Marte.','Sojourner anduvo unos 100 metros y nunca se alejó más de 12 del módulo.','En 2006 la cámara HiRISE fotografió el módulo, los airbags y el paracaídas.'],
           en:['It carried Sojourner, the first wheeled rover on Mars.','Sojourner drove about 100 metres and never went more than 12 from the lander.','In 2006 the HiRISE camera photographed the lander, its airbags and the parachute.']}},
  spirit:{type:'mars',key:'spirit',land:Date.UTC(2004,0,4,4,26),site:[-14.5692,175.4729],craft:'cruise',craftM:2.65,hw:'mer',edl:'airbag',
    place:{es:'Cráter Gusev; quedó en «Troy», junto a Home Plate',en:'Gusev crater; it stayed at "Troy", next to Home Plate'},
    today:{es:['Recorrió 7,73 km.','En mayo de 2009 se encajó en arena blanda y no pudo salir.','Su última transmisión fue el 22 de marzo de 2010.'],
           en:['It drove 7.73 km.','In May 2009 it got stuck in soft sand and could not get out.','Its last transmission was on 22 March 2010.']}},
  opportunity:{type:'mars',key:'opportunity',land:Date.UTC(2004,0,25,4,54),site:[-1.9483,-5.52583],craft:'cruise',craftM:2.65,hw:'mer',edl:'airbag',
    place:{es:'Meridiani Planum; terminó en el Valle Perseverancia, en el borde del cráter Endeavour',en:'Meridiani Planum; it ended in Perseverance Valley, on the rim of Endeavour crater'},
    today:{es:['Iba a durar 90 días marcianos y trabajó más de 14 años.','Recorrió 45,16 km, más que una maratón.','Una tormenta de polvo en 2018 tapó el Sol de sus paneles. Su última señal llegó el 10 de junio de 2018.'],
           en:['It was meant to last 90 Martian days and worked for more than 14 years.','It drove 45.16 km, more than a marathon.','A dust storm in 2018 blocked the Sun from its panels. Its last signal arrived on 10 June 2018.']}},
  phoenix:{type:'mars',key:'phoenix',land:Date.UTC(2008,4,25,23,38,38),site:[68.22,-125.75],craft:'cruise',craftM:2.65,hw:'phoenix',edl:'thrust',
    place:{es:'Vastitas Borealis, cerca del polo norte de Marte',en:'Vastitas Borealis, near the north pole of Mars'},
    today:{es:['Encontró hielo de agua debajo del suelo.','Su última señal fue el 2 de noviembre de 2008, al llegar el invierno.','En 2010 una foto desde órbita mostró que un panel solar se había caído, probablemente por el hielo de dióxido de carbono.'],
           en:['It found water ice just below the soil.','Its last signal came on 2 November 2008, as winter arrived.','In 2010 a picture from orbit showed one solar panel had collapsed, probably under carbon dioxide frost.']}},
  pioneer10:{type:'outer',key:'pioneer10',dest:'jupiter',event:Date.UTC(1973,11,4,2,26),end:Date.UTC(2026,10,14),craft:'pioneer10',craftM:7.5,
    place:{es:'Rumbo a la estrella Aldebarán, en Tauro',en:'Heading for the star Aldebaran, in Taurus'},
    today:{es:['Fue la primera nave en cruzar el cinturón de asteroides y en visitar Júpiter.','Hoy está a unas 142 unidades astronómicas del Sol: 21.000 millones de km.','Lleva una placa que muestra a dos personas y dónde está el Sol. Su última señal fue en enero de 2003.'],
           en:['It was the first spacecraft to cross the asteroid belt and visit Jupiter.','Today it is about 142 astronomical units from the Sun: 21 billion km.','It carries a plaque showing two people and where the Sun is. Its last signal came in January 2003.']}},
  pioneer11:{type:'outer',key:'pioneer11',dest:'jupiter',event:Date.UTC(1974,11,3,5,22),end:Date.UTC(2026,10,14),craft:'pioneer10',craftM:7.5,
    place:{es:'Rumbo a la constelación del Águila',en:'Heading toward the constellation Aquila'},
    today:{es:['Pasó por Júpiter en 1974 y fue la primera nave en visitar Saturno, en 1979.','Hoy está a unas 118 unidades astronómicas del Sol.','Lleva la misma placa que Pioneer 10. Su último contacto fue en 1995.'],
           en:['It flew past Jupiter in 1974 and was the first spacecraft to visit Saturn, in 1979.','Today it is about 118 astronomical units from the Sun.','It carries the same plaque as Pioneer 10. Its last contact was in 1995.']}},
  near:{type:'outer',key:'near',dest:'eros',event:Date.UTC(2000,1,14,15,33),end:Date.UTC(2001,1,12,20,1,52),craft:'near',craftM:4.3,hw:'near',
    place:{es:'Sobre el asteroide Eros, en la zona de la «montura»',en:'On asteroid Eros, in the "saddle" region'},
    today:{es:['Pasó un año en órbita del asteroide Eros, de 34 km de largo.','Fue la primera nave en posarse sobre un asteroide, el 12 de febrero de 2001.','No estaba hecha para aterrizar y aun así siguió transmitiendo dos semanas desde el suelo.'],
           en:['It spent a year orbiting asteroid Eros, 34 km long.','It was the first spacecraft to land on an asteroid, on 12 February 2001.','It was not built to land, yet it kept transmitting from the ground for two weeks.']}},
  dawn:{type:'outer',key:'dawn',dest:'ceres',event:Date.UTC(2015,2,6,12,29),end:Date.UTC(2015,2,6,12,29),craft:'dawn',craftM:19.7,
    place:{es:'En órbita de Ceres, en el cinturón de asteroides',en:'Orbiting Ceres, in the asteroid belt'},
    today:{es:['Visitó Vesta (2011 y 2012) y después Ceres: la única nave que orbitó dos mundos fuera del sistema Tierra-Luna.','Se quedó sin combustible para orientarse el 31 de octubre de 2018.','Sigue dando vueltas a Ceres, en silencio, y lo hará por lo menos 20 años.'],
           en:['It visited Vesta (2011 and 2012) and then Ceres: the only spacecraft to orbit two worlds beyond the Earth and Moon.','It ran out of fuel for pointing on 31 October 2018.','It keeps circling Ceres, silent, and will for at least 20 years.']}},
  kepler:{type:'outer',key:'kepler',dest:null,event:null,end:Date.UTC(2018,10,15),craft:'kepler',craftM:4.7,
    place:{es:'En órbita alrededor del Sol, detrás de la Tierra',en:'Orbiting the Sun, trailing behind Earth'},
    today:{es:['Buscó planetas alrededor de otras estrellas y encontró miles.','Recibió sus últimas órdenes el 15 de noviembre de 2018.','En ese momento estaba a 151 millones de km de la Tierra, y se sigue alejando despacio.'],
           en:['It searched for planets around other stars and found thousands.','It received its final commands on 15 November 2018.','At that time it was 151 million km from Earth, and it keeps drifting slowly away.']}}
};
var JS_STR={
  es:{chap:{lanzamiento:'Lanzamiento',salida:'Salida',viaje:'Viaje',llegada:'Llegada',entrada:'Entrada',descenso:'Descenso',hoy:'Hoy'},journey:'Viaje',goOn:'Seguir el viaje →',since:'Ahí desde el {d}',back:'Volver a la Tierra',next:'Siguiente',pause:'Pausar',play:'Seguir',
      map:'Ver mapa',ship:'Ver nave',day:'Día {d} de viaje',fromEarth:'De la Tierra',speed:'Velocidad',toDest:'A {d}',km:'km',kms:'km/s',sunRel:'respecto del Sol',
      srcH:'Trayectoria: JPL Horizons (NASA)',srcR:'Trayectoria reconstruida: esta nave no está en JPL Horizons',stillThere:'Sigue ahí',today:'Hoy, {d}',
      loading:'Cargando trayectorias…',rel:{earth:'desde la Tierra',sun:'alrededor del Sol',mars:'hacia Marte',jupiter:'junto a Júpiter'},drag:'Arrastrá para mirar alrededor',
      cap:{salida:'{n} deja la Tierra. Mirá cómo se achica atrás.',viaje:'Así se ve el viaje desde arriba: la línea es el camino real que hizo {n}.',
           llegada:'{D} se agranda adelante.',entrada:'Entra en el aire de Marte a unos {v} km/h. El escudo térmico se pone al rojo.',descenso:'Ahora hay que bajar sin romperse.',flyby:'{n} pasa junto a {d}.',orbit:'{n} se queda dando vueltas a {d}.'}},
  en:{chap:{lanzamiento:'Launch',salida:'Departure',viaje:'Cruise',llegada:'Arrival',entrada:'Entry',descenso:'Descent',hoy:'Today'},journey:'Journey',goOn:'Continue the journey →',since:'There since {d}',back:'Back to Earth',next:'Next',pause:'Pause',play:'Play',
      map:'Show map',ship:'Show spacecraft',day:'Day {d} of the trip',fromEarth:'From Earth',speed:'Speed',toDest:'To {d}',km:'km',kms:'km/s',sunRel:'relative to the Sun',
      srcH:'Trajectory: JPL Horizons (NASA)',srcR:'Reconstructed trajectory: this spacecraft is not in JPL Horizons',stillThere:'Still there',today:'Today, {d}',
      loading:'Loading trajectories…',rel:{earth:'from Earth',sun:'around the Sun',mars:'toward Mars',jupiter:'near Jupiter'},drag:'Drag to look around',
      cap:{salida:'{n} leaves Earth. Watch it shrink behind.',viaje:'The trip seen from above: the line is the real path {n} flew.',
           llegada:'{D} grows ahead.',entrada:'It hits the Martian air at about {v} km/h. The heat shield glows red.',descenso:'Now it has to get down in one piece.',flyby:'{n} swings past {d}.',orbit:'{n} stays, circling {d}.'}}
};
function jt(k){return JS_STR[lang][k];}
function bodyCap(k){return ({es:{moon:'La Luna'},en:{moon:'The Moon'}})[lang][k]||bodyName(k);}

/* ---------- estilos y panel ---------- */
(function(){var st=document.createElement('style');st.textContent=
'.stage.is-journey .ui,.stage.is-journey .callouts,.stage.is-journey #leaders,.stage.is-journey .lens{display:none}'+
'.stage.is-journey::after{background:radial-gradient(120% 40% at 50% 0%,rgba(5,7,11,.55),rgba(5,7,11,0) 70%),linear-gradient(to top,rgba(5,7,11,.6),rgba(5,7,11,0) 26%)}'+
'.lens{width:0!important;height:0!important;margin:0!important}.lens-glass{display:none}.lens-label{transform:translate(-50%,-14px)!important;top:auto!important;bottom:0!important}'+
'.stage.is-picking #gl{cursor:pointer}.callout.is-far .c-actions .c-follow{display:inline-block}'+
'.live{padding:0!important;background:#000}.live-frame{width:100%!important;height:100%!important;max-height:none!important;aspect-ratio:auto!important;border:0!important;border-radius:0!important}'+
'.jr{position:absolute;inset:0;z-index:7;pointer-events:none;color:var(--fg);font-family:var(--font-ui)}.jr[hidden]{display:none}.jr>*{pointer-events:auto}'+
'.jr-fade{position:absolute;inset:0;width:100%;height:100%;pointer-events:none!important;opacity:0;transition:opacity .9s ease}'+
'.jr-top{position:absolute;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));top:12px;display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;pointer-events:none}'+
'.jr-top>*{pointer-events:auto}.jr-id{display:grid;gap:2px;min-width:0}.jr-badge{justify-self:start;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--space);background:var(--accent);border-radius:4px;padding:2px 7px;font-weight:600}'+
'.jr-name{font-weight:600;font-size:clamp(20px,2.6vw,28px);letter-spacing:-.01em}.jr-sub{font-size:12.5px;color:var(--fg-dim);max-width:30rem}'+
'.jr-chaps{display:flex;gap:4px;flex-wrap:wrap;margin:4px auto 0}.jr-chaps button{font:inherit;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--fg-dim);background:var(--veil);border:1px solid var(--line);border-radius:999px;padding:5px 11px;cursor:pointer}'+
'.jr-chaps button[aria-current="step"]{color:var(--space);background:var(--fg);border-color:var(--fg)}.jr-chaps button.is-done{color:var(--fg)}'+
'.jr-top{padding-right:46px}.jr.has-card .jr-sub{display:none}'+
'.jr-x{position:absolute;right:0;top:0;width:34px;height:34px;border-radius:50%;border:1px solid var(--line-strong);background:var(--veil);color:var(--fg);font-size:18px;line-height:1;cursor:pointer;padding:0}'+
'.jr-read{position:absolute;right:max(16px,env(safe-area-inset-right,0px));top:var(--jr-top,96px);display:grid;gap:10px;justify-items:end;text-align:right;text-shadow:0 1px 8px rgba(0,0,0,.9);pointer-events:none}'+
'.jr-date{font-family:var(--font-dot);font-weight:700;font-size:clamp(22px,2.8vw,30px);letter-spacing:.04em;font-variant-numeric:tabular-nums}.jr-day{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}'+
'.jr-tele{margin:0;display:grid;gap:7px;justify-items:end}.jr-tele div{display:grid;justify-items:end}.jr-tele dt{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-dim)}.jr-tele dd{margin:0;font-weight:500;font-size:18px;font-variant-numeric:tabular-nums}.jr-tele em{font-style:normal;font-size:11px;color:var(--fg-dim);margin-left:4px}'+
'.jr-cap{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);width:min(92%,620px);margin:0;text-align:center;font-size:clamp(14px,1.7vw,16.5px);background:var(--veil);border-radius:10px;padding:8px 14px;text-wrap:balance;pointer-events:none}.jr-cap:empty{display:none}'+
'.jr-bar{position:absolute;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));bottom:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;pointer-events:none}.jr-bar>*{pointer-events:auto}'+
'.jr-btn{font:inherit;font-size:13px;font-weight:500;color:var(--fg);background:var(--veil);border:1px solid var(--line-strong);border-radius:999px;padding:8px 14px;cursor:pointer}.jr-btn.is-main{color:var(--space);background:var(--fg);border-color:var(--fg)}'+
'.jr-note{margin-left:auto;font-size:11.5px;color:var(--fg-faint);text-align:right;max-width:24rem;pointer-events:none}'+
'.jr-card{position:absolute;left:max(16px,env(safe-area-inset-left,0px));bottom:76px;width:min(420px,calc(100% - 32px));background:rgba(5,7,11,.82);border:1px solid var(--line);border-radius:12px;padding:16px 18px;display:grid;gap:8px;backdrop-filter:blur(6px)}'+
'.jr-card[hidden]{display:none}.jr-card .k{margin:0;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}.jr-card h2{margin:0;font-weight:500;font-size:clamp(22px,2.6vw,28px);letter-spacing:-.02em;line-height:1.1}'+
'.jr-card .pl{margin:0;color:var(--fg-dim);font-size:13.5px}.jr-card ul{margin:2px 0 0;padding-left:18px;display:grid;gap:6px;font-size:14px;line-height:1.4}'+
'.sp-labels{position:absolute;inset:0;z-index:6;pointer-events:none}.sp-label{position:absolute;left:0;top:0;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--fg-dim);white-space:nowrap;text-shadow:0 1px 6px #000}'+
'.stage:not(.is-journey) .sp-labels{display:none}'+
'.sp-label.is-ship{color:var(--accent)}#lvBack.is-quiet{color:var(--fg);background:none;border:1px solid var(--line-strong)}'+
'@media (max-width:640px){.jr-read{top:auto;bottom:150px}.jr-tele{display:none}.jr-cap{bottom:96px;font-size:13.5px}.jr-note{display:none}.jr-card{bottom:70px}.jr-chaps{margin:2px 0 0}}';
document.head.appendChild(st);})();

var jr=add(stage,'div','jr');jr.hidden=true;
jr.innerHTML='<canvas class="jr-fade"></canvas><header class="jr-top"><div class="jr-id"><span class="jr-badge"></span><strong class="jr-name"></strong><span class="jr-sub"></span></div>'+
  '<nav class="jr-chaps"></nav><button class="jr-x" type="button">×</button></header>'+
  '<div class="jr-read"><div class="jr-date"></div><div class="jr-day"></div><dl class="jr-tele"><div><dt class="t1"></dt><dd class="v1"></dd></div><div><dt class="t2"></dt><dd class="v2"></dd></div><div><dt class="t3"></dt><dd class="v3"></dd></div></dl></div>'+
  '<p class="jr-cap" aria-live="polite"></p>'+
  '<section class="jr-card" hidden><p class="k"></p><h2></h2><p class="pl"></p><ul></ul></section>'+
  '<footer class="jr-bar"><button class="jr-btn jr-play" type="button"></button><button class="jr-btn jr-next" type="button"></button><button class="jr-btn jr-view" type="button"></button><button class="jr-btn is-main jr-home" type="button"></button><span class="jr-note"></span></footer>';
var JE={};['fade','name','sub','badge','chaps','x','date','day','cap','card','play','next','view','home','note'].forEach(function(n){JE[n]=jr.querySelector('.jr-'+n);});
['t1','v1','t2','v2','t3','v3'].forEach(function(n){JE[n]=jr.querySelector('.'+n);});

/* ---------- estado ---------- */
var JR={active:false,m:null,x:null,segs:[],si:0,u:0,paused:false,jd:0,view:'auto',uAz:0,uEl:0,uZ:1,blend:1,prevShot:null,scene:'space'};
var P3={earth:new THREE.Vector3(),moonG:new THREE.Vector3(),dest:new THREE.Vector3(),craft:new THREE.Vector3(),vel:new THREE.Vector3(),tmp:new THREE.Vector3()};

/* posición absoluta de la nave en la fecha jd (unidades de escena) */
function craftAt(jd,out,vel){
  var X=JR.x,m=JR.m;
  if(X.only){if(vel)vel.set(0,0,0);return out.set(0,0,0);}
  if(X.type==='moon'){
    JR.vref='earth';var tsec=(msOfJd(jd)-X.inj)/1000;X.conic.at(Math.max(0,Math.min(X.conic.tof,tsec)),out,vel);out.add(P3.earth);
    return out;
  }
  var dep=hzTrack(X.key+'_dep'),arr=hzTrack(X.key+'_arr'),sc=hzTrack(X.key+'_sc'),fly=hzTrack(X.key+'_fly');
  if(dep&&jd<dep.j1&&jd>=dep.j0){JR.vref='earth';dep.at(jd,out,vel);return out.add(P3.earth);}
  if(fly&&jd>=fly.j0&&jd<=fly.j1){JR.vref='jupiter';fly.at(jd,out,vel);return out.add(P3.dest);}
  if(arr&&jd>=arr.j0){JR.vref='mars';
    if(X.entry&&jd>=X.entry.jdA){return edlAt(jd,out,vel);}
    arr.at(jd,out,vel);return out.add(P3.dest);
  }
  if(sc){JR.vref='sun';sc.at(jd,out,vel);return out;}
  return out.copy(P3.earth);
}
/* Entrada a Marte: desde la última fila útil de Horizons se integra la caída libre hasta 125 km de altura y
   desde ahí se baja hasta el lugar del aterrizaje, a la hora del aterrizaje. */
function prepEntry(X){
  var arr=hzTrack(X.key+'_arr');if(!arr)return;
  var r=arr.r,row=r[r.length-2],p=new THREE.Vector3(row[1],row[2],row[3]),v=new THREE.Vector3(row[4],row[5],row[6]),R=R_KM.mars,jd=row[0],dt=2,a=new THREE.Vector3(),pts=[];
  for(var i=0;i<4000&&p.length()>R+125;i++){
    a.copy(p).multiplyScalar(-MU_MARS/Math.pow(p.length(),3));v.addScaledVector(a,dt);p.addScaledVector(v,dt);jd+=dt/86400;
    if(i%10===0)pts.push([p.x,p.y,p.z,jd]);}
  var jdL=jdOf(X.land);
  X.entry={jdA:row[0],jdE:jd,jdL:Math.max(jdL,jd+120/86400),pts:pts,pE:p.clone(),vE:v.clone()};
}
function siteWorld(bodyKey,q,out){var X=JR.x;siteLocal(X.site[0],X.site[1],out).applyQuaternion(q);return out;}
var _q=new THREE.Quaternion(),_sw=new THREE.Vector3();
function edlAt(jd,out,vel){
  var X=JR.x,E=X.entry,R=R_KM.mars/UNIT_KM;
  if(jd<E.jdE){ /* caída libre */
    var pts=E.pts,i=0;while(i<pts.length-1&&pts[i+1][3]<jd)i++;var a=pts[i],b=pts[Math.min(pts.length-1,i+1)],s=b[3]>a[3]?(jd-a[3])/(b[3]-a[3]):0;
    out.set(a[0]+(b[0]-a[0])*s,a[1]+(b[1]-a[1])*s,a[2]+(b[2]-a[2])*s).multiplyScalar(1/UNIT_KM);
    if(vel)vel.copy(E.vE);return out.add(P3.dest);
  }
  /* de la interfaz de entrada al suelo: frena fuerte arriba y baja despacio al final */
  marsAxes(jd,_q);siteWorld('mars',_q,_sw);
  var s2=Math.min(1,(jd-E.jdE)/(E.jdL-E.jdE)),f=1-Math.pow(1-s2,0.35),h=(125/UNIT_KM)*(1-f);
  var dirE=E.pE.clone().normalize(),dir=dirE.lerp(_sw,Math.min(1,f*1.15)).normalize();
  out.copy(dir).multiplyScalar(R+h).add(P3.dest);if(vel)vel.copy(E.vE).multiplyScalar(1-f);return out;
}

/* ---------- capítulos ---------- */
function seg(id,j0,j1,dur,map,shot,extra){var s={id:id,j0:j0,j1:j1,dur:dur,map:map,shot:shot};for(var k2 in extra)s[k2]=extra[k2];return s;}
function buildSegs(m,X){
  var L=jdOf(m.launch),S=[];
  if(X.only){var jl=jdOf(X.land);return [seg('hoy',jl,jl,0,'hold',{k:'surface'},{surface:true})];}
  if(X.type==='moon'){
    var i0=jdOf(X.inj),lnd=jdOf(X.land);
    S.push(seg('salida',i0,i0+5/24,10,'exp',{k:'chase',from:'earth'}));
    S.push(seg('viaje',i0+5/24,lnd-4/24,12,'lin',{k:'map'}));
    S.push(seg('llegada',lnd-4/24,lnd-150/86400,9,'expIn',{k:'chase',from:'moon'}));
    S.push(seg('descenso',lnd-150/86400,lnd,9,'lin',{k:'descent'},{surface:true}));
    S.push(seg('hoy',lnd,lnd,0,'hold',{k:'surface'},{surface:true}));
  }else if(X.type==='mars'){
    var dep=hzTrack(X.key+'_dep'),sc=hzTrack(X.key+'_sc'),arr=hzTrack(X.key+'_arr'),j0=dep?dep.j0:sc.j0,lndM=jdOf(X.land);
    prepEntry(X);
    var jA=arr?arr.j0:lndM-2;
    if(dep)S.push(seg('salida',j0,j0+1.6,11,'exp',{k:'chase',from:'earth'}));
    S.push(seg('viaje',dep?j0+1.6:j0,jA,16,'lin',{k:'map'}));
    var jE=X.entry?X.entry.jdE:lndM-6/1440,jP=jE+(lndM-jE)*0.55;
    S.push(seg('llegada',jA,jE,11,'expIn',{k:'chase',from:'mars'}));
    S.push(seg('entrada',jE,jP,7,'lin',{k:'descent'}));
    S.push(seg('descenso',jP,lndM,13,'lin',{k:'descent'},{surface:true}));
    S.push(seg('hoy',lndM,lndM,0,'hold',{k:'surface'},{surface:true}));
  }else{
    var dp=hzTrack(X.key+'_dep'),sct=hzTrack(X.key+'_sc'),a0=dp?dp.j0:sct.j0,ev=X.event?jdOf(X.event):null,en=Math.min(jdOf(X.end),sct.j1);
    if(dp)S.push(seg('salida',a0,a0+1.6,11,'exp',{k:'chase',from:'earth'}));
    if(ev){
      var span=X.dest==='jupiter'?12:(X.dest==='eros'?6:8);
      S.push(seg('viaje',dp?a0+1.6:a0,ev-span,18,'lin',{k:'map'}));
      S.push(seg('llegada',ev-span,ev+(X.dest==='jupiter'?span:0.01),12,X.dest==='jupiter'?'lin':'expIn',{k:'chase',from:X.dest}));
      if(X.type==='outer'&&X.dest==='jupiter')S.push(seg('viaje',ev+span,en,16,'lin',{k:'mapOut'},{label:'lejos'}));
    }else{S.push(seg('viaje',dp?a0+1.6:a0,en,18,'lin',{k:'map'}));}
    if(X.hw==='near')S.push(seg('hoy',en,en,0,'hold',{k:'surface'},{surface:true}));
    else S.push(seg('hoy',en,en,0,'hold',{k:'final',from:X.dest==='ceres'?'ceres':(X.dest?'sun':'earth')}));
  }
  return S;
}
function segJd(s,u){
  var x=Math.max(0,Math.min(1,u/(s.dur||1))),K=6;
  if(s.map==='exp')return s.j0+(s.j1-s.j0)*(Math.exp(K*x)-1)/(Math.exp(K)-1);
  if(s.map==='expIn')return s.j1-(s.j1-s.j0)*(Math.exp(K*(1-x))-1)/(Math.exp(K)-1);
  if(s.map==='hold')return s.j0;
  return s.j0+(s.j1-s.j0)*(x*x*(3-2*x)*0.3+x*0.7);
}

/* ---------- inicio y salida ---------- */
function startJourney(m,chapter){
  var X=JX[m.id];if(!X)return;
  if(!HZ_READY){showToast(jt('loading'));var tries=0,iv=setInterval(function(){if(HZ_READY||++tries>40){clearInterval(iv);if(HZ_READY)startJourney(m,chapter);}},250);return;}
  if(EX.active)exLeave();
  var fromGlobe=!JR.active;if(live)closeLive();
  if(fromGlobe&&!JR.landFrom){try{var c=JE.fade;c.width=canvas.width;c.height=canvas.height;renderer.render(scene,camera);c.getContext('2d').drawImage(canvas,0,0);c.style.transition='none';c.style.opacity='1';}catch(e){}}
  JR.landFrom=false;initSpace();clearSpace();SP.cam.up.set(0,0,1);
  JR.active=false;JR.m=m;JR.x=X;JR.paused=false;JR.view='auto';JR.uAz=0;JR.uEl=0;JR.uZ=1;JR.surfaceBuilt=false;
  if(X.type==='moon'&&!X.only){
    var tr=hzTrack(X.moonT),lnd=jdOf(X.land);tr.at(lnd,P3.moonG);moonAxes(P3.moonG,_q);
    var site=siteLocal(X.site[0],X.site[1],new THREE.Vector3()).applyQuaternion(_q),arrive=P3.moonG.clone().addScaledVector(site,R_KM.moon/UNIT_KM*1.002);
    var n=new THREE.Vector3().crossVectors(tr.at(lnd-1,new THREE.Vector3()),P3.moonG).normalize();
    X.conic=lunarConic(arrive,(X.land-X.inj)/1000,n);X.siteDir=site;
  }
  JR.segs=lxSegs(m).concat(buildSegs(m,X));JR.si=0;JR.u=0;
  if(chapter){for(var i=0;i<JR.segs.length;i++)if(JR.segs[i].id===chapter){JR.si=i;break;}}
  /* cuerpos y líneas de este viaje */
  makeBody('earth').on=true;
  if(X.type==='moon'){makeBody('moon').on=true;}
  if(X.type==='mars'){makeBody('mars').on=true;makeOrbit('earth');makeOrbit('mars',0xd99a6a);}
  if(X.type==='outer'){makeOrbit('earth');makeOrbit('mars',0xd99a6a);if(X.dest){makeBody(X.dest).on=true;}
    if(X.dest==='jupiter'||X.key==='pioneer11'){makeOrbit('jupiter',0xd8b48a);makeOrbit('saturn',0xc9b98f);}
    if(X.dest==='eros')makeOrbit('eros',0xb9a58a);if(X.dest==='ceres'){makeOrbit('ceres',0xa8a39b);makeOrbit('vesta',0xa8a39b);}}
  ['moon','mars','jupiter','eros','vesta','ceres'].forEach(function(k2){if(SP.B[k2]&&!((X.type==='moon'&&k2==='moon')||(X.type==='mars'&&k2==='mars')||X.dest===k2))SP.B[k2].on=false;});
  if(X.only){}
  else if(X.type!=='moon'){var sc=hzTrack(X.key+'_sc');if(sc)JR.traj=makeTraj(sc.points(sc.j0,sc.j1,3000),null,0xffd08a);}
  else{var pts=[];for(var q=0;q<=240;q++){var tt=X.conic.tof*q/240;X.conic.at(tt,P3.tmp);pts.push([P3.tmp.x,P3.tmp.y,P3.tmp.z,jdOf(X.inj+tt*1000)]);}
    JR.trajGroup=new THREE.Group();SP.bodyRoot.add(JR.trajGroup);JR.traj=makeTraj(pts,JR.trajGroup,0xffd08a);}
  if(!SP.sunLabel)SP.sunLabel=makeLabel('');
  /* nave */
  SP.ship=new THREE.Group();SP.shipSize=X.craftM*1e-6;SP.craftRoot.add(SP.ship);
  var hold=new THREE.Group();hold.scale.setScalar(1e-6);SP.ship.add(hold);JR.shipHold=hold;
  if(HW[X.craft]){hold.add(HW[X.craft]());}else{modelOf(X.craft,function(o){hold.add(fitModel(o,X.craftM));});}
  SP.shipDot=new THREE.Sprite(new THREE.SpriteMaterial({map:SP.dotTex,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,sizeAttenuation:false}));
  SP.shipDot.scale.set(0.03,0.03,1);SP.bgRoot.add(SP.shipDot);
  SP.shipLabel=makeLabel('','is-ship');SP.shipLabel.dataset.name=m.name;
  SP.glow=SP.glow||new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(255,170,90),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));
  SP.craftRoot.add(SP.glow);
  renderer.outputEncoding=THREE.sRGBEncoding;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  ['moon_lroc_color_2k','mars','jupiter','stars_hipparcos'].forEach(function(n){var tx=texOf('assets/textures/'+n+'.jpg');if(tx.encoding!==THREE.sRGBEncoding){tx.encoding=THREE.sRGBEncoding;tx.needsUpdate=true;}});
  JR.active=true;stage.classList.add('is-journey');jr.hidden=false;setPlaying(false);
  buildChapters();jTexts();enterSeg(true);
  JE.home.focus();
  requestAnimationFrame(function(){requestAnimationFrame(function(){JE.fade.style.transition='opacity 1.1s ease';JE.fade.style.opacity='0';});});
}
function endJourney(quiet){
  if(!JR.active)return;if(LQ.snd)LQ.snd.pause();lxLeave();if(JR.fromExplore&&!quiet){exReturn();return;}var m=JR.m;JR.active=false;jr.hidden=true;stage.classList.remove('is-journey');
  clearSpace();cardOffset(null);if(JR.trajGroup){SP.bodyRoot.remove(JR.trajGroup);JR.trajGroup=null;}
  renderer.outputEncoding=THREE.LinearEncoding;renderer.setClearColor(0x05070b,1);renderer.autoClear=true;
  if(quiet!==true){JE.fade.style.transition='none';JE.fade.style.opacity='0';}
  if(quiet)return;
  if(typeof homeShow==='function'){homeShow();return;}
  sim=Math.min(T1,m.legEnd+DAY);rate=0;stage.classList.add('is-running');setPlaying(true);
  if(m.c&&m.c.go)m.c.go.focus();
}
function buildChapters(){
  JE.chaps.innerHTML='';var seen={};
  JR.segs.forEach(function(s,i){if(seen[s.id])return;seen[s.id]=1;var b=add(JE.chaps,'button','');b.type='button';b.dataset.i=i;b.dataset.id=s.id;
    b.addEventListener('click',function(){jumpTo(i);});});
}
function jTexts(){
  var m=JR.m,X=JR.x;if(!m)return;
  JE.badge.textContent=jt('journey');JE.name.textContent=m.name;JE.sub.textContent=X.place[lang];
  var bk=JR.fromExplore?(lang==='es'?'Volver al espacio':'Back to space'):(typeof homeShow==='function'?(lang==='es'?'Volver al inicio':'Back to start'):jt('back'));JE.x.setAttribute('aria-label',bk);JE.home.textContent=bk;JE.next.textContent=jt('next')+' ›';
  JE.note.textContent=X.only?'':(X.recon?jt('srcR'):jt('srcH'));
  var bs=JE.chaps.querySelectorAll('button');for(var i=0;i<bs.length;i++)bs[i].textContent=jt('chap')[bs[i].dataset.id]||bs[i].dataset.id;
  JE.t1.textContent=jt('fromEarth');
  playTexts();if(SP&&SP.shipLabel)SP.shipLabel.dataset.name=m.name;
  if(JR.segs[JR.si]&&JR.segs[JR.si].id==='hoy')showCard();
  if(JR.segs[JR.si]&&JR.segs[JR.si].launch)lxTexts();
}
function playTexts(){var hd=jr.querySelector('.jr-top');if(hd&&hd.offsetHeight)jr.style.setProperty('--jr-top',(hd.offsetHeight+24)+'px');JE.play.textContent=JR.paused?'▶ '+jt('play'):'❚❚ '+jt('pause');var s=JR.segs[JR.si];JE.play.hidden=!!(s&&s.id==='hoy');
  JE.view.hidden=!(s&&s.shot.k==='map');JE.view.textContent=JR.view==='ship'?jt('map'):jt('ship');JE.next.hidden=!s||s.id==='hoy';
  var nx=JR.segs[JR.si+1],w=!!(JR.wait&&nx);
  JE.next.textContent=w?lt('nextTo').replace('{c}',nx.launch?lxTitle(nx):(jt('chap')[nx.id]||nx.id)):jt('next')+' ›';
  JE.next.classList.toggle('is-main',w);JE.next.classList.toggle('is-wait',w);JE.home.classList.toggle('is-main',!w);}
function jumpTo(i){fadeCut(function(){JR.si=i;JR.u=0;enterSeg();});}
function nextSeg(){if(JR.si>=JR.segs.length-1)return;var s=JR.segs[JR.si],nx=JR.segs[JR.si+1];
  if(s.launch&&nx.launch){JR.si++;enterSeg();}
  else if(JR.wait&&!(nx.surface&&!s.surface)&&!s.launch){JR.prevShot=true;JR.si++;enterSeg();}else jumpTo(JR.si+1);}
function enterSeg(first){
  var s=JR.segs[JR.si];JR.wait=false;JR.u=0;JR.uAz=0;JR.uEl=0;JR.uZ=segZoom(s);JR.view='auto';
  if(!first&&JR.prevShot)JR.blend=0;else JR.blend=1;
  JR.scene=s.launch?'launch':(s.surface?'surface':'space');
  var bs=JE.chaps.querySelectorAll('button'),cur=JR.segs[JR.si].id;
  for(var i=0;i<bs.length;i++){var idx=+bs[i].dataset.i;bs[i].toggleAttribute('aria-current',false);if(bs[i].dataset.id===cur)bs[i].setAttribute('aria-current','step');bs[i].classList.toggle('is-done',idx<JR.si&&bs[i].dataset.id!==cur);}
  JE.card.hidden=s.id!=='hoy';jr.classList.toggle('has-card',s.id==='hoy');if(s.id==='hoy')showCard();
  if(s.surface)setupSurface(s);
  var X=JR.x,dn=X.dest?bodyName(X.dest):(X.type==='moon'?bodyName('moon'):bodyName('mars'));
  var ck=s.id==='llegada'&&X.dest==='jupiter'?'flyby':(s.id==='hoy'&&X.dest==='ceres'?'orbit':s.id);
  var cap=jt('cap')[ck],dk=X.dest||(X.type==='moon'?'moon':'mars');JE.cap.textContent=cap&&s.id!=='hoy'?cap.replace('{n}',JR.m.name).replace('{d}',dn).replace('{D}',bodyCap(dk)).replace('{v}',X.entry?fmt(Math.round(X.entry.vE.length()*3.6)*1000):''):'';
  playTexts();
  if(s.launch)lxEnter(s);else lxLeave();
}
function showCard(){learnCard();}
/* corte con fundido: se congela el cuadro actual encima y se desvanece mientras corre lo nuevo */
function fadeCut(fn){
  var c=JE.fade;c.width=canvas.width;c.height=canvas.height;
  try{jRender(0,performance.now());c.getContext('2d').drawImage(canvas,0,0);}catch(e){}
  c.style.transition='none';c.style.opacity='1';fn();
  requestAnimationFrame(function(){requestAnimationFrame(function(){c.style.transition='opacity .9s ease';c.style.opacity='0';});});
}
/* sin argumentos: si se pasa el evento del clic, endJourney lo toma como «terminar en silencio» y no vuelve a la portada */
JE.x.addEventListener('click',function(){endJourney();});JE.home.addEventListener('click',function(){endJourney();});
JE.play.addEventListener('click',function(){JR.paused=!JR.paused;playTexts();});
JE.next.addEventListener('click',nextSeg);
JE.view.addEventListener('click',function(){JR.view=JR.view==='ship'?'map':'ship';JR.blend=0;playTexts();});
document.addEventListener('keydown',function(e){if(!JR.active)return;if(e.key==='Escape')endJourney();else if(e.key===' '&&e.target===document.body){e.preventDefault();JR.paused=!JR.paused;playTexts();}});

/* ---------- arrastrar para mirar ---------- */
var jdrag=null;
canvas.addEventListener('pointerdown',function(e){if(!JR.active)return;jdrag={x:e.clientX,y:e.clientY};if(SF)SF.dragging=true;});
window.addEventListener('pointermove',function(e){if(!jdrag)return;var dx=e.clientX-jdrag.x,dy=e.clientY-jdrag.y;jdrag.x=e.clientX;jdrag.y=e.clientY;
  if(JR.scene==='launch'){lxDrag(dx,dy);return;}
  if(JR.scene==='surface'&&SF){SF.orb.azT-=dx*0.006;SF.orb.elT=clamp(SF.orb.elT+dy*0.004,0.02,1.3);}else{JR.uAz-=dx*0.006;JR.uEl=clamp(JR.uEl+dy*0.005,-1.3,1.3);}});
window.addEventListener('pointerup',function(){jdrag=null;if(SF)SF.dragging=false;});
stage.addEventListener('wheel',function(e){if(!JR.active||overPanel(e))return;if(JR.scene==='launch'){lxWheel(e);return;}var f=Math.exp(e.deltaY*0.0012),s=JR.segs[JR.si],back=JR.fromExplore&&s&&s.id==='hoy';
  if(JR.scene==='surface'&&SF){if(back&&f>1&&SF.orb.rT>=139){exReturn();return;}SF.orb.rT=clamp(SF.orb.rT*f,3,back?140:60);}
  else{if(back&&f>1&&JR.uZ>=29){exReturn();return;}JR.uZ=clamp(JR.uZ*f,0.05,back?30:4e6);}},{passive:true});

/* ---------- tomas de cámara ---------- */
var UPZ=new THREE.Vector3(0,0,1);
/* La cámara mira a la nave con el cuerpo de fondo corrido hacia abajo: cuanto más grande se ve el cuerpo,
   más se lo baja, así queda el horizonte curvo cruzando el cuadro en vez de llenarlo todo. */
function chaseShot(from,Rb,size,az,el,out){
  var f=_v1.copy(P3.craft).sub(from),db=f.length();f.normalize();
  var up=_v2.copy(UPZ).addScaledVector(f,-UPZ.dot(f));if(up.lengthSq()<1e-6)up.set(1,0,0);up.normalize();
  var r=new THREE.Vector3().crossVectors(f,up),ang=Math.asin(Math.min(1,Rb/Math.max(db,1e-9))),a=Math.min(1.31,ang*0.86+0.17)+el;
  out.look.copy(P3.craft);
  out.dir.copy(f).multiplyScalar(Math.cos(a)*Math.cos(az)).addScaledVector(r,Math.cos(a)*Math.sin(az)).addScaledVector(up,Math.sin(a)).normalize();
  out.dist=size;return out;
}
function mapShot(center,radius,az,el,out){out.look.copy(center);out.dir.set(Math.cos(el)*Math.cos(az),Math.cos(el)*Math.sin(az),Math.sin(el));out.dist=radius;return out;}
function newShot(){return {look:new THREE.Vector3(),dir:new THREE.Vector3(),dist:1};}
var SHA=newShot(),SHB=newShot();
function shotFor(s,jd,out){
  var X=JR.x,sz=X.craftM*1e-6,k2=s.shot.k,az=0.42+JR.uAz,el=0.2+JR.uEl;
  if(k2==='map'&&JR.view==='ship')k2='chase';
  if(k2==='chase'||k2==='final'){
    var fr=s.id==='viaje'?(X.type==='moon'||X.type==='mars'||X.dest?'dest':'earth'):s.shot.from;
    var from=fr==='earth'?P3.earth:(fr==='sun'||!fr?_v3.set(0,0,0):P3.dest),Rb=fr==='earth'?R_KM.earth/UNIT_KM:(fr==='sun'||!fr?R_KM.sun/UNIT_KM:destR());
    return chaseShot(from,Rb,sz*4.2*JR.uZ,JR.uAz+0.35,JR.uEl,out);
  }
  if(k2==='descent'){return chaseShot(P3.dest,destR(),sz*5*JR.uZ,0.9+JR.uAz,JR.uEl-0.05,out);}
  if(k2==='map'||k2==='mapOut'){
    if(X.type==='moon'){var mid=P3.tmp.copy(P3.moonG).multiplyScalar(0.5).add(P3.earth);return mapShot(mid,P3.moonG.length()*1.9*JR.uZ,-1.1+JR.uAz,0.95+JR.uEl,out);}
    var rr=Math.max(P3.earth.length(),P3.dest.length()||0,P3.craft.length());
    if(k2==='mapOut')rr=Math.max(rr,P3.craft.length()*1.25);
    var ang=Math.atan2(P3.craft.y,P3.craft.x);
    return mapShot(_v3.set(0,0,0),rr*2.35*JR.uZ,ang-1.9+JR.uAz,0.9+JR.uEl,out);
  }
  return chaseShot(P3.earth,R_KM.earth/UNIT_KM,sz*4,az,0,out);
}
/* distancia inicial de los planos de seguimiento: lejos, con el planeta entero a la vista; la rueda acerca hasta la nave */
function segZoom(s){if(!s||s.shot.k!=='chase')return 1;var sz=JR.x.craftM*1e-6*4.2,Rb=s.shot.from==='earth'?R_KM.earth/UNIT_KM:destR();return Math.max(1,Rb*3.2/sz);}
function destR(){var X=JR.x,k=X.type==='moon'?'moon':(X.type==='mars'?'mars':X.dest);return k?R_KM[k]/UNIT_KM:R_KM.sun/UNIT_KM;}

/* ---------- cuadro ---------- */
function jUpdateBodies(jd){
  var X=JR.x,B=SP.B;
  if(X.only)return;
  if(X.type==='moon'){hzTrack(X.earthT).at(jd,P3.earth);hzTrack(X.moonT).at(jd,P3.moonG);P3.dest.copy(P3.moonG).add(P3.earth);
    if(JR.trajGroup)JR.trajGroup.position.copy(P3.earth);
    B.moon.pos.copy(P3.dest);moonAxes(P3.moonG,B.moon.q);}
  else{hzTrack(X.key+'_earth').at(jd,P3.earth);var dt=hzTrack(X.key+'_dest');
    if(dt){dt.at(jd,P3.dest);var b=B[X.type==='mars'?'mars':X.dest];if(b){b.pos.copy(P3.dest);
      if(b.key==='mars')marsAxes(jd,b.q);else if(b.key==='jupiter')jupiterAxes(jd,b.q);else b.q.setFromAxisAngle(UPZ,(jd%1)*Math.PI*2*(b.key==='eros'?4.6:1.3));}}
    else P3.dest.set(0,0,0);}
  B.earth.pos.copy(P3.earth);earthAxes(jd,B.earth.q);
}
/* reflejos: cada nave refleja el cielo, el suelo y el Sol del lugar donde quedó (los materiales se copian para no tocar los de otras escenas) */
function sfEnvBuild(kind){
  if(!SF.pmrem)SF.pmrem=new THREE.PMREMGenerator(renderer);if(SF.env){SF.env.dispose();SF.env=null;}
  var sc=new THREE.Scene(),geo=new THREE.SphereGeometry(50,48,24),p=geo.attributes.position,col=[],c=new THREE.Color(),hor=new THREE.Color(),zen=new THREE.Color(),gnd=new THREE.Color(),el=Math.max(0.15,SF.sunDir?SF.sunDir.y:0.5);
  if(kind==='mars'){hor.copy(SF.skyU.uHor.value).convertSRGBToLinear();zen.copy(SF.skyU.uZen.value).convertSRGBToLinear();gnd.setRGB(0.50,0.26,0.14).multiplyScalar(0.35+0.9*el);}
  else{hor.setRGB(0.004,0.004,0.005);zen.setRGB(0,0,0);gnd.setRGB(0.34,0.33,0.31).multiplyScalar(0.3+0.9*el);}
  for(var i=0;i<p.count;i++){var y=p.getY(i)/50;if(y>=0)c.copy(hor).lerp(zen,Math.pow(y,0.5));else c.copy(hor).lerp(gnd,Math.min(1,-y*9));col.push(c.r,c.g,c.b);}
  geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));sc.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  if(SF.sunDir&&SF.sunDir.y>0){var sm=new THREE.MeshBasicMaterial();sm.color.setRGB(60,56,50);var sun=new THREE.Mesh(new THREE.SphereGeometry(3,16,8),sm);sun.position.copy(SF.sunDir).multiplyScalar(44);sc.add(sun);}
  SF.env=SF.pmrem.fromScene(sc,0.03);geo.dispose();SF.envK=kind==='mars'?0.9:0.8;
}
function sfEnvApply(o){
  if(!SF.env)return;
  o.traverse(function(q){if(!q.isMesh||!q.material)return;var one=function(mm){if(!mm||!mm.isMeshStandardMaterial)return mm;var k=mm.clone();k.envMap=SF.env.texture;k.envMapIntensity=SF.envK;return k;};
    q.material=Array.isArray(q.material)?q.material.map(one):one(q.material);});
}
function jRender(dt,now){
  if(JR.scene==='launch'){lxRender();return;}
  if(JR.scene==='surface'&&SF&&JR.surfaceBuilt){renderSurface(dt);return;}
  renderSpace();
}
function tickJourney(dt,now){
  var s=JR.segs[JR.si];if(!s){endJourney();return;}
  /* al terminar un capítulo la escena se queda quieta y espera a que el lector toque "Siguiente" */
  if(!JR.paused&&s.map!=='hold'){JR.u+=dt;if(JR.u>=s.dur){JR.u=s.dur;if(!JR.wait&&JR.si<JR.segs.length-1){JR.wait=true;playTexts();}}}
  if(s.launch){lxFrame(s,dt);return;}
  var jd=segJd(s,JR.u);JR.jd=jd;
  jUpdateBodies(jd);craftAt(jd,P3.craft,P3.vel);
  if(JR.traj)JR.traj.material.uniforms.uJ.value=jd-2440000;
  SP.shipPos=SP.shipPos||new THREE.Vector3();SP.shipPos.copy(P3.craft);
  /* la nave mira con su "arriba" hacia el Sol, como haría con sus paneles */
  var shell=s.id==='entrada'&&JR.x.craft==='cruise';
  if(JR.shipHold&&JR.shipVar!==(shell?'shell':'cruise')&&HW[JR.x.craft]){JR.shipVar=shell?'shell':'cruise';while(JR.shipHold.children.length)JR.shipHold.remove(JR.shipHold.children[0]);JR.shipHold.add(shell?HW.aeroshell():HW[JR.x.craft]());}
  if(SP.ship&&shell&&P3.vel.lengthSq()>1e-9){SP.ship.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),_v1.copy(P3.vel).normalize());}
  else if(SP.ship){var sunDir=_v1.copy(P3.craft).negate().normalize();SP.ship.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),sunDir);
    if(JR.x.craft==='pioneer10'&&!reduce)JR.shipHold.rotation.y+=dt*0.8;}
  /* resplandor de la entrada en la atmósfera de Marte */
  if(SP.glow){var gl=0;if(JR.x.entry&&jd>JR.x.entry.jdE){var ss=(jd-JR.x.entry.jdE)/(JR.x.entry.jdL-JR.x.entry.jdE);gl=Math.sin(Math.min(1,Math.max(0,ss/0.75))*Math.PI)*0.95;}
    SP.glow.material.opacity=gl;SP.glow.position.copy(P3.craft);if(P3.vel.lengthSq()>1e-9)SP.glow.position.addScaledVector(_v2.copy(P3.vel).normalize(),JR.x.craftM*0.6e-6);SP.glow.scale.setScalar(JR.x.craftM*1e-6*(3+3*gl));}
  SP.showSunLabel=s.shot.k==='map'||s.shot.k==='mapOut';
  /* cámara */
  if(JR.scene==='space'){
    shotFor(s,jd,SHB);
    if(JR.blend<1){JR.blend=Math.min(1,JR.blend+dt/2.6);var e=JR.blend*JR.blend*(3-2*JR.blend);
      SHA.look.lerp(SHB.look,e);SHA.dir.lerp(SHB.dir,e).normalize();SHA.dist=Math.exp(Math.log(SHA.dist)+(Math.log(SHB.dist)-Math.log(SHA.dist))*Math.min(1,e*1.2));}
    else{SHA.look.copy(SHB.look);SHA.dir.copy(SHB.dir);SHA.dist=SHB.dist;}
    SP.lookAbs.copy(SHA.look);SP.camAbs.copy(SHA.look).addScaledVector(SHA.dir,SHA.dist);
  }else{surfaceTick(s,dt);}
  SP.labelBox.style.display=JR.scene==='surface'?'none':'';
  hudTick(s,jd);
  cardOffset(s);
  jRender(dt,now);
  updateMarks();
}
function hudTick(s,jd){
  var X=JR.x,ms=msOfJd(jd),d=new Date(ms);jr.querySelector('.jr-tele').hidden=!!s.surface||s.id==='hoy';
  var nd=new Date(),ds=s.id==='hoy'?jt('today').replace('{d}',nd.getDate()+' '+STR[lang].months[nd.getMonth()]+' '+nd.getFullYear()):(d.getUTCDate()+' '+STR[lang].months[d.getUTCMonth()]+' '+d.getUTCFullYear()+' · '+two(d.getUTCHours())+':'+two(d.getUTCMinutes())+' UTC');
  if(JE.date.textContent!==ds)JE.date.textContent=ds;
  var day=Math.max(1,Math.ceil((ms-JR.m.launch)/DAY)),dy=s.id==='hoy'?'':jt('day').replace('{d}',fmt(day));if(JE.day.textContent!==dy)JE.day.textContent=dy;
  var de=P3.tmp.copy(P3.craft).sub(P3.earth).length()*UNIT_KM-R_KM.earth;
  JE.v1.innerHTML=fmt(Math.max(0,de))+'<em>'+jt('km')+'</em>';
  var vr=P3.vel.length(),vt=jt('speed')+' · '+jt('rel')[JR.vref||'sun'];if(JE.t2.textContent!==vt)JE.t2.textContent=vt;JE.v2.innerHTML=(vr<10?vr.toFixed(2):vr.toFixed(1)).replace('.',lang==='es'?',':'.')+'<em>'+jt('kms')+'</em>';
  var dn=X.type==='moon'?'moon':(X.type==='mars'?'mars':X.dest);
  if(dn&&s.id!=='hoy'){var dd=P3.tmp.copy(P3.craft).sub(P3.dest).length()*UNIT_KM-R_KM[dn];JE.t3.textContent=jt('toDest').replace('{d}',bodyName(dn));JE.v3.innerHTML=fmt(Math.max(0,dd))+'<em>'+jt('km')+'</em>';JE.t3.parentNode.hidden=false;}
  else JE.t3.parentNode.hidden=true;
}

/* ---------- superficie: descenso y hoy ---------- */
function localSky(bodyQ,bodyPos,siteLat,siteLon,targetPos){
  var up=siteLocal(siteLat,siteLon,new THREE.Vector3()).applyQuaternion(bodyQ),pole=new THREE.Vector3(0,1,0).applyQuaternion(bodyQ);
  var north=pole.addScaledVector(up,-pole.dot(up)).normalize(),east=new THREE.Vector3().crossVectors(north,up);
  var d=targetPos.clone().sub(bodyPos).normalize();
  return {el:Math.asin(clamp(d.dot(up),-1,1))/DEG,az:Math.atan2(d.dot(east),d.dot(north))/DEG};
}
function setupSurface(s){
  var X=JR.x,m=JR.m,kind=X.type==='moon'?'moon':(X.hw==='near'?'eros':'mars'),jdL=X.land?jdOf(X.land):jdOf(X.end);
  if(!X.only)jUpdateBodies(jdL);
  var sun,earthSky=null;
  if(X.sun){sun=X.sun;earthSky=X.earthSky||null;}
  else if(kind==='moon'){var q=SP.B.moon.q;sun=localSky(q,P3.dest,X.site[0],X.site[1],new THREE.Vector3(0,0,0));earthSky=localSky(q,P3.dest,X.site[0],X.site[1],P3.earth);}
  else if(kind==='mars'){sun=localSky(SP.B.mars.q,P3.dest,X.site[0],X.site[1],new THREE.Vector3(0,0,0));}
  else sun={el:28,az:130};
  /* si aterrizó de noche o con el Sol muy bajo, se usa la luz real de unas horas después en el mismo lugar */
  JR.sunNote=null;if(!X.sun&&kind!=='eros'&&sun.el<10){var body=kind==='moon'?'moon':'mars',j2=jdL;
    for(var hh=0;hh<60&&sun.el<14;hh++){j2+=1/24;jUpdateBodies(j2);var bq=SP.B[body].q;sun=localSky(bq,P3.dest,X.site[0],X.site[1],new THREE.Vector3(0,0,0));}JR.sunNote=hh;}
  JR.sunEl=sun.el;
  if(!JR.surfaceBuilt||JR.surfKind!==kind+m.id){
    buildSurface(kind,sun,{earth:earthSky,seed:m.id.length*7+1,slope:X.key==='opportunity'?0.045:0});
    JR.surfKind=kind+m.id;JR.surfaceBuilt=true;
    var g=new THREE.Group();SF.root.add(g);SF.hw=g;
    sfEnvBuild(kind);
    if(X.model){modelOf(X.model,function(o){var f=fitModel(o,X.modelM);if(X.prep)X.prep(f);var bb=new THREE.Box3().setFromObject(f);f.position.y=-bb.min.y;sfEnvApply(f);g.add(f);});}
    else if(X.hw==='mer'||X.hw==='near'){modelOf(X.hw==='mer'?'mer_hd':'near',function(o){var f=fitModel(o,X.hw==='mer'?2.3:4.3);sfEnvApply(f);
      if(X.hw==='mer'){f.traverse(function(o2){if(o2.isMesh&&o2.material&&X.key==='opportunity'){o2.material=o2.material.clone();o2.material.color.lerp(new THREE.Color(0xb07a52),0.35);}});}
      var bb=new THREE.Box3().setFromObject(f);f.position.y=-bb.min.y;if(X.hw==='near'){f.rotation.z=0.9;f.position.y=0.8;}g.add(f);});}
    else{var hwo=HW[X.hw]();sfEnvApply(hwo);g.add(hwo);}
    if(X.addHW){var ex=X.addHW();sfEnvApply(ex);ex.name='extraHW';SF.root.add(ex);SF.extra=ex;
      ex.children.forEach(function(c){c.position.y=heightOf(SF.ground.geometry,c.position.x,c.position.z,2400,220);});}else SF.extra=null;
    SF.stack=new THREE.Group();SF.root.add(SF.stack);
    if(X.edl==='airbag'){SF.chute=HW.chute(X.hw==='mer'?14:11);SF.shell=HW.aeroshell();SF.bags=HW.airbags();SF.bags.scale.setScalar(X.hw==='mer'?1:0.85);
      SF.stack.add(SF.chute);SF.stack.add(SF.shell);SF.stack.add(SF.bags);}
    else{SF.chute=X.type==='mars'?HW.chute(11.5):null;SF.shell=X.type==='mars'?HW.aeroshell():null;if(SF.chute){SF.stack.add(SF.chute);SF.stack.add(SF.shell);}SF.bags=null;}
    SF.flames=new THREE.Group();var fm=new THREE.MeshBasicMaterial({color:0xffd9a0,transparent:true,opacity:0.85,blending:THREE.AdditiveBlending,depthWrite:false});
    for(var i=0;i<3;i++){var a=i*2.094,c=new THREE.Mesh(new THREE.ConeGeometry(0.14,1.3,10,1,true),fm);c.rotation.x=Math.PI;c.position.set(Math.cos(a)*0.55,-0.45,Math.sin(a)*0.55);SF.flames.add(c);}
    SF.root.add(SF.flames);SF.dust=null;
  }
  SF.autoSpin=s.id==='hoy';SF.camOverride=s.id==='descenso';
  if(s.id==='hoy'){SF.stack.visible=false;SF.flames.visible=false;SF.hw.visible=true;SF.hw.position.set(0,0,0);SF.hw.scale.setScalar(1);
    if(X.view){SF.target=new THREE.Vector3(X.view[0],X.view[1],X.view[2]);SF.orb.rT=X.view[3];SF.orb.elT=X.view[4];SF.orb.r=SF.orb.rT;SF.orb.el=SF.orb.elT;}
    else{var pf=X.hw==='pathfinder';SF.target=new THREE.Vector3(pf?0.9:0,X.hw==='surveyor'?1.3:(pf?0.3:0.8),pf?0.6:0);SF.orb.rT=X.hw==='surveyor'?9:(pf?5.2:7.5);SF.orb.elT=pf?0.42:0.2;
    SF.orb.r=SF.orb.rT;SF.orb.el=SF.orb.elT;}}
}
function surfaceTick(s,dt){
  if(!SF||!JR.surfaceBuilt)return;
  if(s.id!=='descenso')return;
  var X=JR.x,u=Math.min(1,JR.u/s.dur),cam=SF.cam,V=THREE.Vector3;
  SF.hw.visible=false;SF.stack.visible=true;SF.flames.visible=false;
  if(X.edl==='airbag'){
    /* 0-0,45 paracaídas; 0,45-0,55 retrocohetes y corte; 0,55-0,85 rebotes; 0,85-1 se desinflan y aparece la nave */
    var h=u<0.5?260-230*(u/0.5):30*(1-(u-0.5)/0.05);
    SF.chute.position.set(0,Math.max(h,0)+19,0);SF.shell.position.set(0,Math.max(h,0)+5.5,0);SF.chute.visible=u<0.56;SF.shell.visible=u<0.56;
    var bp=new V(0,Math.max(h,0)-5,0);
    if(u>=0.55){var b2=(u-0.55)/0.3,bounces=[[0,1],[0.42,0.45],[0.72,0.2],[0.9,0.06]],y=0;
      for(var k3=0;k3<bounces.length;k3++){var a3=bounces[k3][0],nb=k3<bounces.length-1?bounces[k3+1][0]:1;if(b2>=a3&&b2<nb){var w=(b2-a3)/(nb-a3);y=4*w*(1-w)*bounces[k3][1]*14;}}
      bp.set(-22*(1-Math.min(1,b2)),Math.max(0,y)+1.6,8*(1-Math.min(1,b2)));if(b2>1)bp.set(0,1.6,0);}
    SF.bags.position.copy(bp);SF.bags.rotation.x+=dt*(u>0.55&&u<0.85?3:0.2);
    var sq=u>0.85?1-0.55*(u-0.85)/0.15:1;SF.bags.scale.setScalar((X.hw==='mer'?1:0.85)*sq);SF.bags.visible=u<0.99;
    if(u>0.88){SF.hw.visible=true;SF.hw.scale.setScalar(Math.min(1,(u-0.88)/0.12));}
    SF.flames.visible=u>0.45&&u<0.55;SF.flames.position.copy(SF.shell.position);
    var look=u<0.55?bp.clone().add(new V(0,9,0)):SF.bags.position.clone();
    var cp=u<0.5?look.clone().add(new V(34,-10+u*14,32)):new V(14,4.5,18);
    cam.position.lerp(cp,Math.min(1,dt*3.5)||1);cam.lookAt(look);
  }else{
    /* paracaídas (Marte) o motores (Luna) hasta apoyarse */
    var y2=X.type==='mars'?(u<0.4?300-200*(u/0.4):100*(1-(u-0.4)/0.6)):120*(1-u);
    y2=Math.max(0,y2*(1-Math.pow(u,6)));
    if(SF.chute){SF.chute.visible=u<0.4;SF.shell.visible=u<0.42;SF.chute.position.set(0,(u<0.4?y2:300)+30,0);SF.shell.position.set(0,(u<0.4?y2:300)+9,0);}
    SF.hw.visible=true;SF.hw.position.set(0,y2,0);SF.hw.scale.setScalar(1);
    SF.flames.visible=(X.type==='moon'||u>0.4)&&y2>0.05;SF.flames.position.set(0,y2+0.85,0);
    SF.flames.children.forEach(function(c){c.scale.y=0.8+0.4*Math.random();});
    var tg=new V(0,Math.max(0.8,y2-3),0),cp2=new V(10,Math.max(2.4,y2+5),13);
    cam.position.lerp(cp2,Math.min(1,dt*3)||1);cam.lookAt(tg);
  }
}

/* ---------- conexión con la Tierra ---------- */
MISSIONS.forEach(function(m){
  if(!JX[m.id]||!m.c||!m.c.go)return;
  var go=m.c.go.cloneNode(true);m.c.go.parentNode.replaceChild(go,m.c.go);m.c.go=go;
  go.addEventListener('click',function(){startJourney(m,'salida');});
  go.addEventListener('focus',function(){focusM=m;});go.addEventListener('blur',function(){if(focusM===m)focusM=null;});
});
/* al terminar la transmisión del lanzamiento, el botón sigue el viaje */
var lvGo=add($('#lvEnd'),'button','start');lvGo.type='button';lvGo.id='lvGo';$('#lvEnd').insertBefore(lvGo,$('#lvBack'));$('#lvBack').classList.add('is-quiet');
lvGo.addEventListener('click',function(){var m=live;if(m)startJourney(m,'salida');});
function jLang(){lvGo.textContent=jt('goOn');if(JR.active)jTexts();}
jLang();$('#langEs').addEventListener('click',jLang);$('#langEn').addEventListener('click',jLang);
