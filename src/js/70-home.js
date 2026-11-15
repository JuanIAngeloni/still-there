/* ---------- portada: las 14 máquinas en tarjetas con foto, la línea de tiempo de sus vidas y los cohetes ----------
   Es DOM y CSS, sin WebGL: no espera a three.js, a las fuentes ni a ningún fetch, así que es lo primero que se pinta.
   Datos: HOME_DATA y HOME_WORLDS (69-home-data.js). La tira de cohetes solo aparece si existe ROCKETS_INFO.
   API: HOME.active, homeShow(), homeHide(), homeTexts(), homeOpen(m). */

/* HOME ya existe en page.html: es la posición de reposo de la cámara del globo (th, ph, r) y la usan orbitHome
   y homeCamera. Acá no se lo reemplaza: se le suma .active. Suelto (home_test.html) nace como objeto vacío. */
var HOME=HOME||{};HOME.active=false;

var hmApi=(function(){
  var SVG_NS='http://www.w3.org/2000/svg';
  var STR={
    es:{brand:'Siguen ahí',navAria:'Portada',visited:'Visitaste {n} de {t}',map:'Ver el mapa 3D',credits:'Créditos',
        eye:'NASA Space Apps 2026 · Salta',h1a:'Siguen ahí:',h1b:'las misiones de NASA a través del tiempo',
        lead:'Catorce máquinas que quedaron en la Luna, en Marte y más lejos. Elegí una para seguir su misión, desde el despegue hasta donde está hoy.',
        sort:'Ordenar',byPlace:'Por lugar',byYear:'Por año',machines:'Máquinas',visitedWord:'visitada',art:'Ilustración',
        tlH:'Línea de tiempo',tlP:'Cada fila es una vida: el viaje, los años de trabajo y el silencio. Todas siguen ahí.',today:'hoy',
        leg:{trip:'Viaje',work:'Años de trabajo',silent:'En silencio',inUse:'Sigue en uso',now:'Hoy: sigue ahí'},
        tlNote:'En las sondas que no aterrizaron, la barra empieza en el despegue.',swipe:'Deslizá hacia el costado para ver todos los años.',
        rkH:'Los cohetes que las llevaron',rkP:'En orden, del primer despegue al último. Todos están a la misma escala y son los mismos modelos 3D que se ven en cada lanzamiento.',
        tall:'{n} m de alto',carried:'Llevó a',
        foot:'Las frases en primera persona están escritas para este sitio a partir de datos de NASA: no son citas reales. Fotos: NASA Image and Video Library. Fechas: NSSDCA y páginas de misión de NASA.'},
    en:{brand:'Still There',navAria:'Start page',visited:'Visited {n} of {t}',map:'Open the 3D map',credits:'Credits',
        eye:'NASA Space Apps 2026 · Salta',h1a:'Still There:',h1b:'NASA\'s missions across time',
        lead:'Fourteen machines left on the Moon, on Mars and beyond. Pick one to follow its mission, from the launch to where it is today.',
        sort:'Sort',byPlace:'By place',byYear:'By year',machines:'Machines',visitedWord:'visited',art:'Artwork',
        tlH:'Timeline',tlP:'Each row is a life: the trip, the working years and the silence. They are all still there.',today:'today',
        leg:{trip:'Trip',work:'Working years',silent:'Silent',inUse:'Still in use',now:'Today: still there'},
        tlNote:'For the probes that did not land, the bar starts at launch.',swipe:'Swipe sideways to see all the years.',
        rkH:'The rockets that carried them',rkP:'In order, from the first launch to the last. All are at the same scale, and they are the same 3D models you see in each launch.',
        tall:'{n} m tall',carried:'It carried',
        foot:'The first-person lines were written for this site from NASA data: they are not real quotes. Photos: NASA Image and Video Library. Dates: NSSDCA and NASA mission pages.'}
  };
  /* cohete de cada misión (tabla de SPEC.md), por si LAUNCH_SEQ todavía no está; y un nombre de reserva por familia */
  var RK_OF={surveyor1:'atlasCentaur',apollo11:'saturnV',pioneer10:'atlasCentaurTE',pioneer11:'atlasCentaurTE',viking1:'titan3e',
             near:'delta7925',pathfinder:'delta7925',spirit:'delta7925',opportunity:'delta7925H',phoenix:'delta7925',dawn:'delta7925H',
             kepler:'delta7925_10L',insight:'atlasV401',ingenuity:'atlasV541'};
  var RK_NAME={atlasCentaur:'Atlas-Centaur',atlasCentaurTE:'Atlas-Centaur',saturnV:'Saturn V',titan3e:'Titan IIIE-Centaur',
               delta7925:'Delta II',delta7925H:'Delta II',delta7925_10L:'Delta II',atlasV401:'Atlas V',atlasV541:'Atlas V'};
  var Y0=1965,SPAN=62,NOW_PC=99.8,DECADES=[1970,1980,1990,2000,2010,2020],RK_MAX_PX=250;
  var LEG_KEYS=['trip','work','silent','inUse','now'];

  var E={},CARDS={},ROWS=[],RK=null,ST={sort:'place'};

  /* ---------- estilos ---------- */
  (function(){var st=document.createElement('style');st.textContent=
'.home{position:absolute;inset:0;z-index:8;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;background:var(--space);color:var(--fg);font-family:var(--font-ui);font-size:15px;line-height:1.4;-webkit-overflow-scrolling:touch}'+
/* border-radius:0 porque la regla general :focus-visible de la página redondea 4px lo que tenga el foco, y acá recortaría las esquinas de la portada */
'.home[hidden]{display:none}.home:focus,.home:focus-visible{outline:none;border-radius:0}.home *{box-sizing:border-box}'+
/* lo que queda tapado por la portada (barra, recorrido, fila de máquinas, carteles del globo) sale del orden de tabulación y de los lectores de pantalla.
   Los botones #langEs / #langEn siguen respondiendo a .click() aunque no se vean. */
'.stage.is-home>.ui,.stage.is-home>.callouts{visibility:hidden}'+
'.hm-wrap{min-height:100%;max-width:1760px;margin:0 auto;display:flex;flex-direction:column;gap:30px;padding:14px max(clamp(16px,4vw,56px),env(safe-area-inset-right,0px)) 34px max(clamp(16px,4vw,56px),env(safe-area-inset-left,0px))}'+
/* base de todos los botones de la portada */
'.hm-map,.hm-link,.hm-lg,.hm-sb,.hm-card,.hm-rn,.hm-chip{font:inherit;color:var(--fg);margin:0;cursor:pointer;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent}'+
'.home button:focus-visible,.home .hm-tlbox:focus-visible{outline:2px solid var(--accent);outline-offset:3px}'+
/* barra de arriba */
'.hm-top{display:flex;align-items:center;justify-content:space-between;gap:4px 16px;flex-wrap:wrap}'+
'.hm-brand{display:flex;align-items:center;gap:10px;min-height:44px;font-weight:600;font-size:15px;white-space:nowrap}'+
'.hm-bd{width:8px;height:8px;border-radius:50%;flex:none;background:var(--accent)}'+
'.hm-nav{display:flex;align-items:center;gap:4px 18px;flex-wrap:wrap;font-size:13px;color:#a7b0bd}'+
'.hm-count{white-space:nowrap;font-variant-numeric:tabular-nums}'+
'.hm-map{min-height:44px;padding:0 16px;font-size:13px;font-weight:500;white-space:nowrap;background:none;border:1px solid rgba(232,238,248,.34);border-radius:999px}'+
'.hm-map:hover{border-color:var(--accent);color:var(--accent)}.home .hm-map:focus-visible{border-radius:999px}'+
'.hm-link{min-height:44px;padding:0 2px;font-size:13px;white-space:nowrap;background:none;border:0;text-decoration:underline;text-underline-offset:3px}'+
'.hm-link:hover{color:var(--accent)}'+
'.hm-lang{display:flex;align-items:center}'+
'.hm-lg{min-width:44px;min-height:44px;padding:0 8px;font-size:13px;font-weight:500;letter-spacing:.06em;color:#a7b0bd;background:none;border:0}'+
'.hm-lg:hover{color:var(--fg)}'+
'.hm-lg[aria-pressed=true]{color:var(--fg);font-weight:600;text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:2px;text-underline-offset:5px}'+
'.hm-lgs{width:1px;height:14px;flex:none;background:rgba(232,238,248,.34)}'+
/* título y orden */
'.hm-hero{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end;justify-content:space-between}'+
'.hm-heroT{display:flex;flex-direction:column;gap:14px;flex:1 1 520px;min-width:0}'+
'.hm-eye{margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#a7b0bd}'+
'.hm-h1{margin:0;font-weight:600;font-size:clamp(30px,4.2vw,58px);line-height:1.04;letter-spacing:-.03em;max-width:22ch;text-wrap:balance}'+
'.hm-h1 span{display:block}'+
'.hm-lead{margin:0;font-size:18px;line-height:1.45;color:#cfd6e0;max-width:38rem}'+
'.hm-sort{display:flex;gap:4px;flex:none;border:1px solid rgba(232,238,248,.22);border-radius:999px;padding:4px}'+
'.hm-sb{min-height:44px;padding:0 18px;font-size:14px;font-weight:500;white-space:nowrap;background:transparent;border:0;border-radius:999px}'+
'.hm-sb:hover{background:rgba(232,238,248,.08)}.hm-sb[aria-pressed=true]{color:var(--space);background:var(--fg)}.home .hm-sb:focus-visible{border-radius:999px}'+
/* tarjetas */
'.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(232px,100%),1fr));gap:14px}'+
'.hm-card{display:flex;flex-direction:column;align-items:stretch;width:100%;min-width:0;padding:0;text-align:left;background:#0b0f16;border:1px solid rgba(232,238,248,.16);border-radius:12px;overflow:hidden;transition:border-color .15s ease}'+
'.hm-card.hm-visited{border-color:rgba(127,212,154,.5)}'+
'.hm-card:hover{border-color:rgba(232,238,248,.62)}'+
'.home .hm-card:focus-visible{border-color:var(--accent);border-radius:12px}'+
'.hm-ph{position:relative;display:block;width:100%;aspect-ratio:4/3;flex:none;overflow:hidden;background:#11161f}'+
'.hm-img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;color:#a7b0bd;font-size:12px}'+
'.hm-note{position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);font-size:11px;line-height:1.35;color:#eef2f8;background:rgba(5,7,11,.82);border-radius:4px;padding:2px 6px}.hm-note[hidden]{display:none}'+
'.hm-vis{position:absolute;right:8px;top:8px;display:none;align-items:center;gap:5px;font-size:12px;font-weight:600;line-height:1.35;color:#8fe0aa;background:rgba(5,7,11,.86);border-radius:999px;padding:3px 10px 3px 8px}'+
'.hm-card.hm-visited .hm-vis{display:inline-flex}.hm-vis svg{display:block;flex:none}'+
'.hm-cb{display:flex;flex-direction:column;gap:8px;flex:1 1 auto;width:100%;padding:14px 16px 16px}'+
'.hm-w{display:flex;align-items:center;gap:7px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#a7b0bd}'+
'.hm-dot{width:7px;height:7px;border-radius:50%;flex:none;background:var(--hm-c,#cccccc)}'+
'.hm-n{font-size:20px;font-weight:600;line-height:1.2;letter-spacing:-.01em}'+
'.hm-q{font-size:15px;line-height:1.4}'+
'.hm-f{margin-top:auto;padding-top:6px;font-size:12.5px;line-height:1.4;color:#a7b0bd}'+
/* secciones de abajo */
'.hm-sec{display:flex;flex-direction:column;gap:14px;min-width:0;margin-top:10px;padding-top:28px;border-top:1px solid rgba(232,238,248,.1)}'+
'.hm-h2{margin:0;font-weight:600;font-size:clamp(24px,2.6vw,34px);line-height:1.1;letter-spacing:-.02em}'+
'.hm-p{margin:0;font-size:16px;line-height:1.45;color:#cfd6e0;max-width:40rem}'+
'.hm-fine{margin:0;font-size:12px;line-height:1.5;color:#a7b0bd;max-width:60rem}'+
/* línea de tiempo */
'.hm-tlbox{min-width:0;max-width:100%;overflow-x:auto;overflow-y:hidden;margin-top:6px;scrollbar-width:thin;scrollbar-color:rgba(232,238,248,.3) transparent}'+
'.home .hm-tlbox:focus-visible{outline-offset:-2px}'+
'.hm-tl{min-width:920px;padding-right:10px;--hm-nc:200px}'+
'.hm-tlhead,.hm-row{display:grid;grid-template-columns:var(--hm-nc) minmax(0,1fr)}'+
'.hm-tlhead{height:30px}.hm-tlpad{position:sticky;left:0;z-index:2;background:var(--space)}'+
'.hm-ticks{position:relative;height:30px}'+
'.hm-tick{position:absolute;bottom:8px;transform:translateX(-50%);font-size:12.5px;line-height:1;font-variant-numeric:tabular-nums;white-space:nowrap;color:#a7b0bd}'+
'.hm-tick.hm-tick-now{transform:translateX(-100%);color:var(--accent)}'+
'.hm-rows{border-bottom:1px solid rgba(232,238,248,.1)}'+
'.hm-row{align-items:center;height:45px;border-top:1px solid rgba(232,238,248,.1)}'+
'.hm-rn{position:sticky;left:0;z-index:2;display:flex;align-items:center;gap:9px;width:100%;height:44px;min-width:0;padding:0 10px 0 0;font-size:15px;font-weight:600;text-align:left;background:var(--space);border:0}'+
'.hm-rn:hover{color:var(--accent)}.home .hm-rn:focus-visible{outline-offset:-2px}'+
'.hm-rnt{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.hm-rd{width:8px;height:8px;border-radius:50%;flex:none;background:var(--hm-c,#cccccc)}'+
'.hm-plot{position:relative;height:44px;min-width:0}'+
'.hm-g{position:absolute;top:0;bottom:0;width:1px;background:rgba(232,238,248,.07)}'+
'.hm-tail{position:absolute;top:21px;right:.2%;height:0;border-top:2px dotted rgba(232,238,248,.32)}.hm-tail.hm-tail-on{border-top:2px solid var(--accent)}'+
'.hm-trip{position:absolute;top:21px;height:2px;background:rgba(232,238,248,.6)}'+
'.hm-bar{position:absolute;top:15px;height:14px;min-width:4px;border-radius:3px;background:var(--hm-c,#cccccc)}'+
'.hm-now{position:absolute;top:16px;left:99.8%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px var(--space)}'+
'.hm-life{position:absolute;top:12px;font-size:12.5px;line-height:20px;white-space:nowrap;color:#cfd6e0;background:var(--space);padding:0 7px}.hm-life[hidden]{display:none}'+
'.hm-legend{display:flex;flex-wrap:wrap;gap:10px 26px;align-items:center;font-size:13px;color:#cfd6e0}'+
'.hm-le{display:inline-flex;align-items:center;gap:9px}.hm-sw{display:block;flex:none}'+
'.hm-sw.hm-sw-trip{width:26px;height:2px;background:rgba(232,238,248,.6)}.hm-sw.hm-sw-work{width:26px;height:12px;border-radius:3px;background:#e0895a}'+
'.hm-sw.hm-sw-silent{width:26px;height:0;border-top:2px dotted rgba(232,238,248,.45)}.hm-sw.hm-sw-inUse{width:26px;height:0;border-top:2px solid var(--accent)}'+
'.hm-sw.hm-sw-now{width:12px;height:12px;border-radius:50%;background:var(--accent)}'+
'.hm-worlds{display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-left:auto;color:#a7b0bd}'+
'.hm-wo{display:inline-flex;align-items:center;gap:6px}.hm-wd{width:8px;height:8px;border-radius:50%;flex:none}'+
'.hm-swipe{display:none}'+
/* cohetes */
'.hm-rks{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr));gap:14px;margin-top:6px}'+
'.hm-rk{display:flex;flex-direction:column;gap:8px;min-width:0;background:#0b0f16;border:1px solid rgba(232,238,248,.16);border-radius:12px;padding:14px 16px 12px}'+
'.hm-rkfig{display:flex;align-items:flex-end;justify-content:center;height:264px;margin-bottom:4px;border-bottom:1px solid rgba(232,238,248,.3)}.hm-rkfig svg{display:block;flex:none}'+
'.hm-rkn{margin:0;font-size:17px;font-weight:600;line-height:1.2;letter-spacing:-.01em}'+
'.hm-rkh{font-size:12.5px;color:#a7b0bd;font-variant-numeric:tabular-nums}.hm-rkh[hidden],.hm-rkb[hidden]{display:none}'+
'.hm-rkb{margin:0;font-size:14px;line-height:1.4;color:#cfd6e0}'+
'.hm-rkm{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:auto;padding-top:6px}'+
'.hm-rkl{width:100%;font-size:12.5px;color:#a7b0bd}'+
'.hm-chip{display:inline-flex;align-items:center;gap:7px;min-height:44px;max-width:100%;padding:0 14px;font-size:13.5px;font-weight:500;text-align:left;background:none;border:1px solid rgba(232,238,248,.24);border-radius:999px}'+
'.hm-chip:hover{border-color:rgba(232,238,248,.62)}.home .hm-chip:focus-visible{border-radius:999px}'+
/* pantallas angostas y movimiento reducido */
'@media (max-width:999px){.hm-swipe{display:block}}'+
'@media (max-width:640px){.hm-wrap{gap:24px;padding-top:8px}.hm-nav{gap:2px 14px}.hm-lead{font-size:16px}.hm-p{font-size:15px}'+
'.hm-sort{flex:1 1 100%}.hm-sb{flex:1 1 0;padding:0 10px}.hm-tl{--hm-nc:148px}.hm-rn{font-size:14px}.hm-worlds{margin-left:0}}'+
'@media (prefers-reduced-motion:no-preference){.hm-img{transition:transform .35s ease}.hm-card:hover .hm-img{transform:scale(1.04)}}'+
'@media (prefers-reduced-motion:reduce){.home,.home *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}';
  document.head.appendChild(st);})();

  /* ---------- utilidades ---------- */
  function L(){return (typeof lang==='string'&&lang==='en')?'en':'es';}
  function t(k){return STR[L()][k];}
  /* texto de un objeto {es,en}; si falta un idioma usa el otro, y nunca tira */
  function tx(o){if(o==null)return '';if(typeof o!=='object')return String(o);var v=o[L()];if(v==null)v=(o.es!=null?o.es:o.en);return v==null?'':String(v);}
  function data(){return (typeof HOME_DATA!=='undefined'&&HOME_DATA&&HOME_DATA.length)?HOME_DATA:[];}
  function world(k){var all=(typeof HOME_WORLDS!=='undefined'&&HOME_WORLDS)||{};return all[k]||{};}
  function mission(id){var a=[];try{a=allMissions()||[];}catch(err){}for(var i=0;i<a.length;i++)if(a[i]&&a[i].id===id)return a[i];return null;}
  function nameOf(id){var m=mission(id);return (m&&m.name)?String(m.name):String(id);}
  function go(id){var m=mission(id);if(m)homeOpen(m);}
  function yr(v){return (typeof v==='number'&&isFinite(v))?v:null;}
  function pc(y){return Math.max(0,Math.min(100,(y-Y0)/SPAN*100));}
  function pct(v){return v.toFixed(2)+'%';}
  function num(v){var s=String(Math.round(v*10)/10);return L()==='es'?s.replace('.',','):s;}
  function btn(p,cls){var b=add(p,'button',cls);b.type='button';return b;}
  function deco(p,tag,cls){var e=add(p,tag,cls);e.setAttribute('aria-hidden','true');return e;}
  function sv(p,tag,at){var e=document.createElementNS(SVG_NS,tag);for(var k in at)e.setAttribute(k,String(at[k]));p.appendChild(e);return e;}
  /* la foto de la tarjeta dentro de PHOTOS: primero en la propia máquina, después en las demás (Pioneer 11 usa una de su gemela) */
  function photoOf(d){
    var all=(typeof PHOTOS!=='undefined'&&PHOTOS)||{},file=d.photo+'.jpg',keys=[d.id].concat(Object.keys(all));
    for(var i=0;i<keys.length;i++){var arr=all[keys[i]];if(!arr||!arr.length)continue;
      for(var j=0;j<arr.length;j++){var p=arr[j];if(p&&typeof p.f==='string'&&p.f.split('/').pop()===file)return p;}}
    return null;
  }
  function setLang(code){var b=null;try{b=$(code==='en'?'#langEn':'#langEs');}catch(err){}if(b)b.click();texts();}

  /* ---------- armado (una sola vez) ---------- */
  function build(){
    var N={},cards={},rows=[],ds=data();
    var root=document.createElement('div');root.className='home';root.hidden=true;root.tabIndex=-1;N.root=root;
    /* el toque no baja al escenario: ahí abajo sigue el globo, con su propio manejo de punteros */
    root.addEventListener('pointerdown',function(e){e.stopPropagation();});
    var wrap=add(root,'div','hm-wrap');N.wrap=wrap;

    /* barra de arriba */
    var top=add(wrap,'header','hm-top'),brand=add(top,'div','hm-brand');deco(brand,'span','hm-bd');N.brand=add(brand,'span','');
    N.nav=add(top,'nav','hm-nav');N.count=add(N.nav,'span','hm-count');
    N.map=btn(N.nav,'hm-map');N.map.addEventListener('click',function(){homeHide();if(typeof exBoot==='function')exBoot();});
    N.cred=btn(N.nav,'hm-link');N.cred.addEventListener('click',function(e){if(typeof openCredits==='function')openCredits(e);});
    var lg=add(N.nav,'div','hm-lang');lg.setAttribute('role','group');lg.setAttribute('aria-label','Idioma / Language');
    N.es=btn(lg,'hm-lg');N.es.textContent='ES';N.es.setAttribute('lang','es');N.es.setAttribute('aria-label','Español');
    deco(lg,'span','hm-lgs');
    N.en=btn(lg,'hm-lg');N.en.textContent='EN';N.en.setAttribute('lang','en');N.en.setAttribute('aria-label','English');
    N.es.addEventListener('click',function(){setLang('es');});N.en.addEventListener('click',function(){setLang('en');});

    /* título y orden de las tarjetas */
    var hero=add(wrap,'section','hm-hero'),ht=add(hero,'div','hm-heroT');
    N.eye=add(ht,'p','hm-eye');N.h1=add(ht,'h1','hm-h1');N.h1a=add(N.h1,'span','');N.h1.appendChild(document.createTextNode(' '));N.h1b=add(N.h1,'span','');
    N.lead=add(ht,'p','hm-lead');
    N.sort=add(hero,'div','hm-sort');N.sort.setAttribute('role','group');
    N.sPlace=btn(N.sort,'hm-sb');N.sYear=btn(N.sort,'hm-sb');
    N.sPlace.addEventListener('click',function(){ST.sort='place';order();});N.sYear.addEventListener('click',function(){ST.sort='year';order();});

    /* tarjetas: cada una es un botón */
    N.grid=add(wrap,'div','hm-grid');N.grid.setAttribute('role','group');
    ds.forEach(function(d){
      if(!d||!d.id||cards[d.id])return;
      var b=btn(N.grid,'hm-card');b.style.setProperty('--hm-c',world(d.w).c||'#cccccc');
      var ph=add(b,'span','hm-ph'),im=add(ph,'img','hm-img');im.setAttribute('loading','lazy');im.setAttribute('decoding','async');im.alt='';
      if(d.photo)im.src='assets/photos/'+d.photo+'.jpg';
      var note=add(ph,'span','hm-note');note.hidden=true;
      var vis=add(ph,'span','hm-vis'),ck=sv(vis,'svg',{viewBox:'0 0 12 12',width:12,height:12,'aria-hidden':'true',focusable:'false'});
      sv(ck,'path',{d:'M2 6.5L5 9.5L10 3',fill:'none',stroke:'currentColor','stroke-width':2,'stroke-linecap':'round','stroke-linejoin':'round'});
      var vt=add(vis,'span','');
      var cb=add(b,'span','hm-cb'),wl=add(cb,'span','hm-w');deco(wl,'span','hm-dot');var wt=add(wl,'span','');
      var nm=add(cb,'span','hm-n'),q=add(cb,'span','hm-q'),f=add(cb,'span','hm-f');
      b.addEventListener('click',function(){go(d.id);});
      cards[d.id]={d:d,el:b,im:im,note:note,vt:vt,wt:wt,nm:nm,q:q,f:f};
    });

    /* línea de tiempo: una fila por vida, ordenadas por la llegada */
    var sec=add(wrap,'section','hm-sec');N.tlH=add(sec,'h2','hm-h2');N.tlP=add(sec,'p','hm-p');
    N.tlBox=add(sec,'div','hm-tlbox');N.tlBox.setAttribute('role','group');N.tlBox.tabIndex=0;
    var tl=add(N.tlBox,'div','hm-tl'),head=add(tl,'div','hm-tlhead');add(head,'span','hm-tlpad');
    var ticks=deco(head,'div','hm-ticks');
    DECADES.forEach(function(y){var s=add(ticks,'span','hm-tick');s.textContent=String(y);s.style.left=pct(pc(y));});
    N.today=add(ticks,'span','hm-tick hm-tick-now');N.today.style.left=pct(NOW_PC);
    var rowsEl=add(tl,'div','hm-rows');rowsEl.setAttribute('role','list');
    ds.slice().sort(function(a,b){return (yr(a&&a.A)||0)-(yr(b&&b.A)||0);}).forEach(function(d){
      if(!d||!d.id)return;
      var row=add(rowsEl,'div','hm-row');row.setAttribute('role','listitem');row.style.setProperty('--hm-c',world(d.w).c||'#cccccc');
      var nb=btn(row,'hm-rn');deco(nb,'span','hm-rd');var nt=add(nb,'span','hm-rnt');nb.addEventListener('click',function(){go(d.id);});
      var plot=add(row,'div','hm-plot');
      DECADES.forEach(function(y){deco(plot,'i','hm-g').style.left=pct(pc(y));});
      var life=null,lv=yr(d.L),av=yr(d.A),ev=yr(d.E);
      if(lv!==null&&av!==null&&ev!==null){
        var Lp=pc(lv),Ap=pc(av),Ep=pc(ev);
        var tail=deco(plot,'i','hm-tail'+(d.mirror?' hm-tail-on':''));tail.style.left=pct(Ep);
        var trip=deco(plot,'i','hm-trip');trip.style.left=pct(Lp);trip.style.width=pct(Math.max(Ap-Lp,0));
        var bar=deco(plot,'i','hm-bar');bar.style.left=pct(Ap);bar.style.width=pct(Math.max(Ep-Ap,0.3));
        deco(plot,'i','hm-now');
        life=add(plot,'span','hm-life');
        /* el texto va a la derecha de la barra; si la barra termina cerca de hoy, a la izquierda del despegue */
        if(Ep>78)life.style.right=pct(100-Lp+0.7);else life.style.left=pct(Ep+0.9);
      }
      rows.push({d:d,nt:nt,life:life});
    });
    var leg=add(sec,'div','hm-legend');N.leg={};
    LEG_KEYS.forEach(function(k){var it=add(leg,'span','hm-le');deco(it,'span','hm-sw hm-sw-'+k);N.leg[k]=add(it,'span','');});
    var wsEl=add(leg,'span','hm-worlds'),wsAll=(typeof HOME_WORLDS!=='undefined'&&HOME_WORLDS)||{};N.worlds={};
    Object.keys(wsAll).forEach(function(k){var it=add(wsEl,'span','hm-wo');deco(it,'span','hm-wd').style.background=(wsAll[k]&&wsAll[k].c)||'#cccccc';N.worlds[k]=add(it,'span','');});
    N.tlNote=add(sec,'p','hm-fine');N.swipe=add(sec,'p','hm-fine hm-swipe');

    N.foot=add(wrap,'p','hm-fine');

    stage.appendChild(root);
    E=N;CARDS=cards;ROWS=rows;
  }

  /* ---------- cohetes: solo si la investigación de etapas (ROCKETS_INFO) ya está cargada ---------- */
  function rocketsInfo(){return (typeof ROCKETS_INFO!=='undefined'&&ROCKETS_INFO&&typeof ROCKETS_INFO==='object')?ROCKETS_INFO:null;}
  function rocketOf(id){
    var k=null;try{k=(typeof LAUNCH_SEQ!=='undefined'&&LAUNCH_SEQ&&LAUNCH_SEQ[id]&&LAUNCH_SEQ[id].rocket)||null;}catch(err){}
    return (typeof k==='string'&&k)?k:(RK_OF[id]||null);
  }
  function heightOf(info){var h=info?Number(info.heightM):0;return (h>0&&isFinite(h))?h:0;}
  /* silueta simple: cuerpo redondeado abajo y punta afilada; con cohetes laterales en Delta, Titan y Atlas V 541 */
  function rocketSvg(p,key,h){
    var titan=/^titan/.test(key),side=titan||/^delta/.test(key)||key==='atlasV541';
    var bw=Math.max(6,Math.round(h*0.09)),sw=side?Math.max(3,Math.round(bw*(titan?0.85:0.5))):0,gap=side?1:0;
    var w=bw+2*(sw+gap),x0=sw+gap,x1=x0+bw,cx=w/2,nose=Math.min(h*0.3,bw*1.9),r=Math.min(2,bw/4);
    var s=sv(p,'svg',{viewBox:'0 0 '+w+' '+h,width:w,height:h,'aria-hidden':'true',focusable:'false'});
    sv(s,'path',{fill:'#dfe5ee',d:'M'+x0+' '+(h-r)+'Q'+x0+' '+h+' '+(x0+r)+' '+h+'L'+(x1-r)+' '+h+'Q'+x1+' '+h+' '+x1+' '+(h-r)+
      'L'+x1+' '+nose+'Q'+x1+' '+(nose*0.4)+' '+cx+' 0Q'+x0+' '+(nose*0.4)+' '+x0+' '+nose+'Z'});
    if(side){var bh=Math.round(h*(titan?0.55:0.36)),ty=h-bh,bn=Math.min(bh*0.3,sw*1.6);
      [0,x1+gap].forEach(function(bx){sv(s,'path',{fill:'#a7b0bd',d:'M'+bx+' '+h+'L'+(bx+sw)+' '+h+'L'+(bx+sw)+' '+(ty+bn)+
        'Q'+(bx+sw)+' '+(ty+bn*0.4)+' '+(bx+sw/2)+' '+ty+'Q'+bx+' '+(ty+bn*0.4)+' '+bx+' '+(ty+bn)+'Z'});});}
  }
  function buildRockets(){
    var info=rocketsInfo();if(!info||RK||!E.root)return;
    var groups=[],by={};
    data().slice().sort(function(a,b){return (yr(a&&a.L)||0)-(yr(b&&b.L)||0);}).forEach(function(d){
      if(!d||!d.id)return;var k=rocketOf(d.id);if(!k)return;
      if(!by[k]){by[k]={key:k,ids:[]};groups.push(by[k]);}
      by[k].ids.push(d.id);});
    if(!groups.length)return;
    var max=0;groups.forEach(function(g){var h=heightOf(info[g.key]);if(h>max)max=h;});
    var sec=document.createElement('section');sec.className='hm-sec';
    var R={sec:sec,h:add(sec,'h2','hm-h2'),p:add(sec,'p','hm-p'),items:[]},list=add(sec,'div','hm-rks');list.setAttribute('role','list');
    groups.forEach(function(g){
      var card=add(list,'div','hm-rk');
      try{
        card.setAttribute('role','listitem');
        var it={key:g.key,info:info[g.key]||{},chips:[]},fig=deco(card,'div','hm-rkfig'),hm=heightOf(it.info);
        fig.setAttribute('data-rk',g.key);if(max)fig.setAttribute('data-ppm',RK_MAX_PX/max);
        if(hm&&max){var rpx=Math.max(12,Math.round(hm/max*RK_MAX_PX));rocketSvg(fig,g.key,rpx);fig.setAttribute('data-px',rpx);}
        it.hM=hm;it.n=add(card,'h3','hm-rkn');it.hEl=add(card,'span','hm-rkh');it.b=add(card,'p','hm-rkb');
        var ms=add(card,'div','hm-rkm');it.l=add(ms,'span','hm-rkl');
        g.ids.forEach(function(id){var d=null;data().forEach(function(x){if(x&&x.id===id)d=x;});
          var c=btn(ms,'hm-chip');deco(c,'span','hm-dot').style.background=world(d&&d.w).c||'#cccccc';
          var ct=add(c,'span','');c.addEventListener('click',function(){go(id);});it.chips.push({id:id,t:ct});});
        R.items.push(it);
      }catch(err){if(card.parentNode)card.parentNode.removeChild(card);}
    });
    if(!R.items.length)return;
    E.wrap.insertBefore(sec,E.foot);RK=R;
  }
  function rocketTexts(){
    if(!RK)return;RK.h.textContent=t('rkH');RK.p.textContent=t('rkP');
    RK.items.forEach(function(it){
      it.n.textContent=tx(it.info.name)||RK_NAME[it.key]||it.key;
      it.hEl.textContent=it.hM?t('tall').replace('{n}',num(it.hM)):'';it.hEl.hidden=!it.hM;
      var bl=tx(it.info.blurb);it.b.textContent=bl;it.b.hidden=!bl;
      it.l.textContent=t('carried')+':';
      it.chips.forEach(function(c){c.t.textContent=nameOf(c.id);});});
  }

  /* ---------- orden, visitadas y textos ---------- */
  function order(){
    if(!E.root)return;var list=data().slice();
    if(ST.sort==='year')list.sort(function(a,b){return (yr(a&&a.y)||0)-(yr(b&&b.y)||0);});
    list.forEach(function(d){var c=d&&CARDS[d.id];if(c)E.grid.appendChild(c.el);});
    E.sPlace.setAttribute('aria-pressed',String(ST.sort==='place'));E.sYear.setAttribute('aria-pressed',String(ST.sort==='year'));
  }
  function visited(){
    if(!E.root)return;var V=(typeof VISITED!=='undefined'&&VISITED)||{},n=0,tot=0;
    for(var id in CARDS){tot++;var on=!!V[id];if(on)n++;CARDS[id].el.classList.toggle('hm-visited',on);}
    E.count.textContent=t('visited').replace('{n}',String(n)).replace('{t}',String(tot));
  }
  function texts(){
    if(!E.root)return;
    var l=L();E.root.setAttribute('lang',l);
    E.brand.textContent=t('brand');E.nav.setAttribute('aria-label',t('navAria'));E.map.textContent=t('map');E.cred.textContent=t('credits');
    E.es.setAttribute('aria-pressed',String(l==='es'));E.en.setAttribute('aria-pressed',String(l==='en'));
    E.eye.textContent=t('eye');E.h1a.textContent=t('h1a');E.h1b.textContent=t('h1b');E.lead.textContent=t('lead');
    E.sort.setAttribute('aria-label',t('sort'));E.sPlace.textContent=t('byPlace');E.sYear.textContent=t('byYear');
    E.grid.setAttribute('aria-label',t('machines'));
    for(var id in CARDS){var c=CARDS[id],d=c.d,p=photoOf(d),nm=nameOf(id),qt=tx(d.q);
      c.wt.textContent=tx(world(d.w));c.nm.textContent=nm;
      c.q.textContent=qt?((l==='es'?'«':'“')+qt+(l==='es'?'»':'”')):'';
      c.f.textContent=[tx(d.when),tx(d.st)].filter(Boolean).join(' · ');
      /* etiqueta sobre la foto: la nota de la tarjeta o, si la imagen es una ilustración, el aviso de siempre */
      var note=d.note?tx(d.note):((p&&p.art)?t('art'):'');c.note.textContent=note;c.note.hidden=!note;
      c.im.alt=(p&&p.cap&&tx(p.cap))||nm;c.vt.textContent=t('visitedWord');}
    E.tlH.textContent=t('tlH');E.tlP.textContent=t('tlP');E.tlBox.setAttribute('aria-label',t('tlH'));E.today.textContent=t('today');
    ROWS.forEach(function(r){r.nt.textContent=nameOf(r.d.id);if(r.life){var s=tx(r.d.life);r.life.textContent=s;r.life.hidden=!s;}});
    LEG_KEYS.forEach(function(k){E.leg[k].textContent=t('leg')[k];});
    for(var k in E.worlds)E.worlds[k].textContent=tx(world(k));
    E.tlNote.textContent=t('tlNote');E.swipe.textContent=t('swipe');
    try{buildRockets();rocketTexts();}catch(err){}
    E.foot.textContent=t('foot');
    order();visited();
  }

  /* ---------- mostrar y ocultar ---------- */
  function hide(){if(E.root)E.root.hidden=true;HOME.active=false;stage.classList.remove('is-home');}
  function show(){
    try{
      if(!E.root)build();
      E.root.hidden=false;HOME.active=true;stage.classList.add('is-home');
      texts();E.root.scrollTop=0;
      try{E.root.focus({preventScroll:true});}catch(err){}
    }catch(err){
      /* si la portada falla, se corre del medio y queda el sitio de siempre */
      try{hide();}catch(e2){}
      if(typeof console!=='undefined'&&console.error)console.error('home',err);
    }
  }
  /* el cambio de idioma lo hace la página (applyLang); acá solo se vuelven a escribir los textos */
  try{['#langEs','#langEn'].forEach(function(s){var b=$(s);if(b)b.addEventListener('click',function(){texts();});});}catch(err){}

  return {show:show,hide:hide,texts:texts};
})();

/* son declaraciones: existen desde el principio del script, antes de que este módulo arme hmApi. Si otro módulo las llama temprano no hacen nada. */
function homeShow(){if(hmApi)hmApi.show();}
function homeHide(){if(hmApi)hmApi.hide();}
function homeTexts(){if(hmApi)hmApi.texts();}
function homeOpen(m){if(typeof openMission==='function')openMission(m);else{homeHide();exGoMachine(m);}}

homeShow();
