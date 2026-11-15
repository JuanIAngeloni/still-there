/* ---------- aprender: elegir una máquina, adivinar antes de mirar y conocer sus piezas ---------- */
var LS_STR={
  es:{pick:'Elegí una máquina',since:'En silencio desde {y}',off:'Apagado en {y}',guess:'Antes de mirar, adiviná',seeIt:'Ver qué quedó →',
      right:'¡Sí!',wrong:'No era eso.',learned:'Qué aprendimos',parts:'Tocá una pieza',more:'Más datos',nextTo:'Siguiente: {c} ›',
      credits:'Créditos',close:'Cerrar',
      where:{moon:'Luna',mars:'Marte',eros:'Asteroide Eros',ceres:'Ceres',sun:'Alrededor del Sol',deep:'Espacio profundo'},
      cr:['<h2>Créditos</h2>',
          '<p><b>Datos de las misiones:</b> NASA (NSSDCA, NASA Science, JPL). Cada dato tiene su enlace en el archivo FUENTES.md del proyecto.</p>',
          '<p><b>Trayectorias:</b> JPL Horizons (NASA). La de Surveyor 1 no está en Horizons y es una reconstrucción nuestra. La entrada en Marte y los descensos son animaciones aproximadas.</p>',
          '<p><b>Mapas:</b> Tierra de día, Blue Marble (NASA Earth Observatory); luces nocturnas, Black Marble (NASA) vía three-globe; Luna, LRO (NASA Scientific Visualization Studio); Marte, Júpiter y estrellas, NASA 3D Resources.</p>',
          '<p><b>Modelos 3D de NASA</b> (NASA 3D Resources y science.nasa.gov): los rovers Spirit y Opportunity, InSight, Pioneer 10 y 11, NEAR Shoemaker, Dawn, Kepler, el módulo lunar de Apollo, Viking 1 e Ingenuity, y los cohetes Delta II y Atlas V (NASA VTAD). Del módulo lunar se muestra solo la etapa de descenso. Al Delta II le sumamos propulsores hasta llegar a los nueve del modelo 7925 y una tercera etapa hecha a mano; el Atlas V 541 es el modelo del 551 con un propulsor menos. En los tres cohetes tapamos los emblemas que venían pintados (insignia de NASA, bandera, logos de empresas y el parche de otra misión).</p>',
          '<p><b>Lanzamientos:</b> los tiempos de cada separación y el destino de cada etapa salen de los informes de prensa y de vuelo de NASA y de los fabricantes; cada dato tiene su enlace («Fuente») al lado. La subida es una animación ilustrativa.</p>',
          '<p><b>Videos:</b> NASA (NASA Image and Video Library y NASA Scientific Visualization Studio).</p>',
          '<p><b>Fotos:</b> NASA Image and Video Library (images.nasa.gov), con el crédito y el número de cada una. <b>Audio:</b> NASA (Apollo 11) y NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro (sonido de Marte grabado por Perseverance).</p>',
          '<p><b>Uso de inteligencia artificial:</b> el código del sitio se escribió con ayuda de Claude (Anthropic), un asistente de IA. También se programaron con IA los modelos simplificados de Surveyor 1, Phoenix, Mars Pathfinder y Sojourner, la cápsula de crucero y los experimentos de Apollo 11, los cohetes Saturn V, Titan IIIE y Atlas-Centaur, y los textos, incluidas las frases en primera persona de la portada, que no son citas reales. La búsqueda de los datos de cada etapa también se hizo con IA y se verificó contra las fuentes. Las fotos con sus epígrafes, los audios y los modelos de Viking 1 e Ingenuity los sumó Juan Ignacio Angeloni, del equipo, que trabajó con ayuda de Devin (Cognition), otro asistente de IA. Los datos se verificaron contra las fuentes de NASA citadas. La idea y el diseño son del equipo.</p>',
          '<p><b>Biblioteca:</b> three.js (licencia MIT).</p>',
          '<p><b>Aclaración:</b> este es un proyecto de estudiantes. NASA no lo patrocina ni lo avala.</p>',
          '<p class="cr-f">Hecho en NASA Space Apps Challenge 2026, Salta.</p>'].join('')},
  en:{pick:'Pick a machine',since:'Silent since {y}',off:'Switched off in {y}',guess:'Before you look, guess',seeIt:'See what was left →',
      right:'Yes!',wrong:'Not quite.',learned:'What we learned',parts:'Tap a part',more:'More facts',nextTo:'Next: {c} ›',
      credits:'Credits',close:'Close',
      where:{moon:'Moon',mars:'Mars',eros:'Asteroid Eros',ceres:'Ceres',sun:'Around the Sun',deep:'Deep space'},
      cr:['<h2>Credits</h2>',
          '<p><b>Mission data:</b> NASA (NSSDCA, NASA Science, JPL). Every fact is linked in the project\'s FUENTES.md file.</p>',
          '<p><b>Trajectories:</b> JPL Horizons (NASA). Surveyor 1 is not in Horizons, so its path is our own reconstruction. Mars entry and the descents are approximate animations.</p>',
          '<p><b>Maps:</b> Earth by day, Blue Marble (NASA Earth Observatory); night lights, Black Marble (NASA) via three-globe; Moon, LRO (NASA Scientific Visualization Studio); Mars, Jupiter and stars, NASA 3D Resources.</p>',
          '<p><b>NASA 3D models</b> (NASA 3D Resources and science.nasa.gov): the Spirit and Opportunity rovers, InSight, Pioneer 10 and 11, NEAR Shoemaker, Dawn, Kepler, the Apollo lunar module, Viking 1 and Ingenuity, and the Delta II and Atlas V rockets (NASA VTAD). Only the lunar module descent stage is shown. We added boosters to the Delta II to reach the nine of the 7925 model, plus a hand-made third stage; the Atlas V 541 is the 551 model with one booster removed. On the three rockets we covered the emblems that came painted on them (NASA insignia, flag, company logos and the patch of another mission).</p>',
          '<p><b>Launches:</b> the time of each separation and the fate of each stage come from NASA and manufacturer press kits and flight reports; every fact has its link (Source) next to it. The climb is an illustrative animation.</p>',
          '<p><b>Videos:</b> NASA (NASA Image and Video Library and NASA Scientific Visualization Studio).</p>',
          '<p><b>Photos:</b> NASA Image and Video Library (images.nasa.gov), each with its credit and number. <b>Audio:</b> NASA (Apollo 11) and NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro (Mars sound recorded by Perseverance).</p>',
          '<p><b>Use of artificial intelligence:</b> the site\'s code was written with help from Claude (Anthropic), an AI assistant. The simplified models of Surveyor 1, Phoenix, Mars Pathfinder and Sojourner, the cruise capsule and the Apollo 11 experiments, the Saturn V, Titan IIIE and Atlas-Centaur rockets, and the texts were also made with AI, including the first-person lines on the start page, which are not real quotes. The search for the data on each stage was also done with AI and checked against the sources. The photos with their captions, the audio clips and the Viking 1 and Ingenuity models were added by Juan Ignacio Angeloni, from the team, who worked with Devin (Cognition), another AI assistant. The facts were checked against the NASA sources cited. The idea and the design are the team\'s.</p>',
          '<p><b>Library:</b> three.js (MIT license).</p>',
          '<p><b>Note:</b> this is a student project. NASA does not sponsor or endorse it.</p>',
          '<p class="cr-f">Made at NASA Space Apps Challenge 2026, Salta.</p>'].join('')}
};
function lt(k){return LS_STR[lang][k];}

(function(){var st=document.createElement('style');st.textContent=
'.pick{margin-top:auto;margin-bottom:10px;display:flex;align-items:center;gap:12px;min-width:0}'+
'.toast:not([hidden]) + .pick{margin-top:0}.pick + .timeline{margin-top:0}'+
'.pick-h{flex:none;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fg-dim)}'+
'.pick-row{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;min-width:0;padding:2px;scroll-snap-type:x proximity}.pick-row::-webkit-scrollbar{display:none}'+
'.pick-c{flex:none;scroll-snap-align:start;display:grid;grid-template-columns:auto 1fr;column-gap:7px;row-gap:1px;align-items:center;text-align:left;font:inherit;color:var(--fg);background:var(--veil);border:1px solid var(--line);border-radius:10px;padding:7px 12px 8px;cursor:pointer}'+
'.pick-c:hover,.pick-c:focus-visible{border-color:var(--line-strong)}'+
'.pick-c::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--wc,#ccc)}'+
'.pick-c.is-visited{border-color:rgba(127,212,154,.55)}.pick-c.is-visited .pn::after{content:" ✓";color:#7fd49a}'+
'.pick-c .pk{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-dim)}'+
'.pick-c .pn{grid-column:1/-1;font-weight:500;font-size:14.5px}.pick-c .ps{grid-column:1/-1;font-size:11px;color:var(--fg-faint)}'+
'.pick-c[data-w=moon]{--wc:#d6d6d0}.pick-c[data-w=mars]{--wc:#e0895a}.pick-c[data-w=eros],.pick-c[data-w=ceres]{--wc:#bfa98a}.pick-c[data-w=sun]{--wc:#ffcf6a}.pick-c[data-w=deep]{--wc:#93b6ff}'+
'.cr-open{font:inherit;font-size:12px;letter-spacing:.06em;color:var(--fg-dim);background:none;border:0;padding:6px 4px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}'+
'.top .cr-open{margin-left:auto}'+
'.credits{position:absolute;inset:0;z-index:9;display:grid;place-items:center;background:rgba(5,7,11,.6);padding:16px}.credits[hidden]{display:none}'+
'.cr-box{position:relative;width:min(560px,100%);max-height:100%;overflow:auto;background:#0b0f16;border:1px solid var(--line);border-radius:12px;padding:20px 22px;font-size:14px;line-height:1.5;color:var(--fg)}'+
'.cr-box h2{margin:0 0 8px;font-weight:500;font-size:22px}.cr-box p{margin:0 0 10px}.cr-box b{font-weight:600}.cr-box .cr-f{color:var(--fg-faint);font-size:12.5px}'+
'.cr-x{position:absolute;right:12px;top:12px;width:32px;height:32px;border-radius:50%;border:1px solid var(--line-strong);background:none;color:var(--fg);font-size:17px;cursor:pointer;padding:0}'+
'.jr-card{max-height:calc(100% - 200px);overflow:auto}'+
'.jr-card h3{margin:6px 0 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fg-dim);font-weight:500}'+
'.jr-card .lrn{margin:0;font-size:15px;line-height:1.45}'+
'.jr-setup{margin:0;font-size:14.5px;line-height:1.45;color:var(--fg)}.jr-card h2.jr-qq{font-size:clamp(19px,2.2vw,23px);line-height:1.2;letter-spacing:-.01em}'+
'.jr-opts{display:grid;gap:6px;margin-top:4px}'+
'.jr-opt{font:inherit;font-size:14px;line-height:1.35;text-align:left;color:var(--fg);background:rgba(255,255,255,.04);border:1px solid var(--line-strong);border-radius:9px;padding:9px 12px;cursor:pointer}'+
'.jr-opt:hover:not(:disabled){border-color:var(--fg);background:rgba(255,255,255,.08)}.jr-opt:disabled{cursor:default;opacity:.7}'+
'.jr-opt.is-right{opacity:1;border-color:#7fd49a;background:rgba(127,212,154,.16)}.jr-opt.is-wrong{opacity:1;border-color:#e48a7a;background:rgba(228,138,122,.13)}'+
'.jr-ans{margin:2px 0 0;font-size:14.5px;line-height:1.45}.jr-ans b{font-weight:600}'+
'.jr-go{justify-self:start;margin-top:4px}'+
'.jr-parts{display:flex;flex-wrap:wrap;gap:6px}'+
'.jr-part{font:inherit;font-size:13px;color:var(--fg);background:none;border:1px solid var(--line-strong);border-radius:999px;padding:4px 11px 4px 5px;display:inline-flex;gap:7px;align-items:center;cursor:pointer}'+
'.jr-part b,.jr-mk{width:21px;height:21px;border-radius:50%;display:grid;place-items:center;font-size:11.5px;font-weight:700;background:var(--accent);color:var(--space);font-family:var(--font-ui)}'+
'.jr-part[aria-pressed=true]{background:var(--fg);color:var(--space);border-color:var(--fg)}'+
'.jr-pd{margin:0;font-size:14px;line-height:1.45}'+
'.jr-card details{font-size:13.5px;line-height:1.4}.jr-card summary{cursor:pointer;color:var(--fg-dim);font-size:12.5px}'+
'.jr-audio{display:flex;gap:10px;align-items:center}.jr-audio .jr-btn{white-space:nowrap;flex:none}.jr-acap{margin:0;font-size:12.5px;line-height:1.4;color:var(--fg-dim)}.jr-acap a{color:var(--fg-dim)}'+
'.jr-photos{display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin;padding-bottom:2px}'+
'.jr-ph{position:relative;flex:none;width:76px;height:58px;padding:0;border:1px solid var(--line);border-radius:7px;overflow:hidden;background:#111;cursor:zoom-in}.jr-ph:hover{border-color:var(--line-strong)}'+
'.jr-ph img{width:100%;height:100%;object-fit:cover;display:block}.jr-art{position:absolute;left:3px;bottom:3px;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;background:rgba(5,7,11,.8);color:var(--fg);border-radius:3px;padding:1px 4px}'+
'.ph-box{position:absolute;inset:0;z-index:10;display:grid;place-items:center;background:rgba(5,7,11,.9);padding:48px 56px}.ph-box[hidden]{display:none}'+
'.ph-box figure{margin:0;display:grid;gap:10px;justify-items:center;max-width:100%;max-height:100%}.ph-box img{max-width:min(1100px,100%);max-height:calc(100vh - 190px);object-fit:contain;border-radius:6px}'+
'.ph-box figcaption{display:grid;gap:4px;max-width:46rem;text-align:center;font-size:14.5px;line-height:1.45}.ph-cr{font-size:12px;color:var(--fg-dim)}.ph-cr a{color:var(--fg-dim)}'+
'.ph-x,.ph-prev,.ph-next{position:absolute;width:40px;height:40px;border-radius:50%;border:1px solid var(--line-strong);background:var(--veil);color:var(--fg);font-size:20px;line-height:1;cursor:pointer;padding:0}'+
'.ph-x{right:14px;top:14px}.ph-prev{left:10px;top:50%}.ph-next{right:10px;top:50%}.ph-prev[hidden],.ph-next[hidden]{display:none}'+
'@media (max-width:640px){.ph-box{padding:56px 12px}}'+
'.jr .jr-marks{position:absolute;inset:0;pointer-events:none}'+
'.jr-mk{position:absolute;left:0;top:0;margin:-12px 0 0 -12px;border:2px solid rgba(5,7,11,.75);cursor:pointer;pointer-events:auto;padding:0;box-shadow:0 0 0 5px rgba(255,208,138,.22);transition:opacity .25s}'+
'.jr-mk.is-on{background:var(--fg);box-shadow:0 0 0 7px rgba(238,242,248,.25)}.jr-mk.is-back{opacity:.4}.jr-mk[hidden]{display:none}'+
'.jr-btn.is-wait{animation:jrpulse 1.6s ease-in-out infinite}'+
'@keyframes jrpulse{0%,100%{box-shadow:0 0 0 0 rgba(238,242,248,.45)}50%{box-shadow:0 0 0 8px rgba(238,242,248,0)}}'+
'@media (prefers-reduced-motion:reduce){.jr-btn.is-wait{animation:none}}'+
'@media (max-width:640px){.pick{flex-direction:column;align-items:stretch;gap:5px;margin-bottom:6px}.pick-c .ps{display:none}.pick-c{padding:6px 10px}'+
'.jr-card{max-height:46%;bottom:64px}}';
document.head.appendChild(st);})();

/* ---------- elegir una máquina ---------- */
var PICK_ORDER=['surveyor1','apollo11','viking1','pathfinder','spirit','opportunity','phoenix','insight','ingenuity','near','dawn','kepler','pioneer10','pioneer11'];
var PICK_WHERE={apollo11:'moon',viking1:'mars',insight:'mars',ingenuity:'mars',surveyor1:'moon',pathfinder:'mars',spirit:'mars',opportunity:'mars',phoenix:'mars',near:'eros',dawn:'ceres',kepler:'sun',pioneer10:'deep',pioneer11:'deep'};
/* pasaporte: qué máquinas ya visitó el lector (solo en este navegador) */
var VISITED=(function(){try{return JSON.parse(localStorage.getItem('siguenahi.visited'))||{};}catch(e){return {};}})();
function markVisited(id){if(VISITED[id])return;VISITED[id]=1;try{localStorage.setItem('siguenahi.visited',JSON.stringify(VISITED));}catch(e){}learnTexts();}
var pickEl=document.createElement('nav');pickEl.className='pick';
(function(){var tl=document.querySelector('.timeline');tl.parentNode.insertBefore(pickEl,tl);})();
pickEl.innerHTML='<span class="pick-h"></span><div class="pick-row"></div>';
var pickRow=pickEl.querySelector('.pick-row');
function missionById(id){var a=allMissions();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null;}
/* se entra por la llegada: lo que importa es dónde quedó; el despegue y el viaje quedan a un toque en los capítulos */
function pickChapter(id){var X=JX[id];return X.type==='outer'&&!X.event?'hoy':'llegada';}
PICK_ORDER.forEach(function(id){var m=missionById(id);if(!m||!JX[id])return;
  var b=add(pickRow,'button','pick-c');b.type='button';b.dataset.w=PICK_WHERE[id];
  add(b,'span','pk');add(b,'strong','pn').textContent=m.name;add(b,'span','ps');
  b.addEventListener('click',function(){exGoMachine(m);});
  m.pick=b;});

/* ---------- créditos ---------- */
var crEl=add(stage,'div','credits');crEl.hidden=true;crEl.setAttribute('role','dialog');crEl.setAttribute('aria-modal','true');
crEl.innerHTML='<div class="cr-box"><button class="cr-x" type="button">×</button><div class="cr-body"></div></div>';
var crOpenTop=document.createElement('button');crOpenTop.type='button';crOpenTop.className='cr-open';
(function(){var top=document.querySelector('.top'),lg=top.querySelector('.lang');top.insertBefore(crOpenTop,lg);})();
var crOpenJr=document.createElement('button');crOpenJr.type='button';crOpenJr.className='cr-open';JE.home.parentNode.insertBefore(crOpenJr,JE.note);
var crBack=null;
function openCredits(e){crBack=e&&e.currentTarget;crEl.querySelector('.cr-body').innerHTML=lt('cr');crEl.hidden=false;crEl.querySelector('.cr-x').focus();}
function closeCredits(){crEl.hidden=true;if(crBack)crBack.focus();}
crOpenTop.addEventListener('click',openCredits);crOpenJr.addEventListener('click',openCredits);
crEl.querySelector('.cr-x').addEventListener('click',closeCredits);
crEl.addEventListener('click',function(e){if(e.target===crEl)closeCredits();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!crEl.hidden){e.stopImmediatePropagation();closeCredits();}},true);

function learnTexts(){
  pickEl.setAttribute('aria-label',lt('pick'));var nv=0,nt=0;allMissions().forEach(function(m){if(m.pick){nt++;if(VISITED[m.id])nv++;}});
  pickEl.querySelector('.pick-h').textContent=lt('pick')+(nv?' · '+(lang==='es'?'visitaste '+nv+' de '+nt:'visited '+nv+' of '+nt):'');
  allMissions().forEach(function(m){if(!m.pick)return;var y=new Date(m.lastSignal).getUTCFullYear();
    m.pick.querySelector('.pk').textContent=lt('where')[m.pick.dataset.w];m.pick.classList.toggle('is-visited',!!VISITED[m.id]);
    m.pick.querySelector('.ps').textContent=m.status?m.status[lang]:(m.id==='kepler'?lt('off'):lt('since')).replace('{y}',y);});
  crOpenTop.textContent=lt('credits');crOpenJr.textContent=lt('credits');crEl.querySelector('.cr-x').setAttribute('aria-label',lt('close'));
  if(!crEl.hidden)crEl.querySelector('.cr-body').innerHTML=lt('cr');
}
var PICK_H=0;function pickSize(){PICK_H=pickEl.offsetHeight+10;}
learnTexts();pickSize();$('#langEs').addEventListener('click',function(){learnTexts();pickSize();});$('#langEn').addEventListener('click',function(){learnTexts();pickSize();});
window.addEventListener('resize',pickSize);if(window.ResizeObserver)new ResizeObserver(pickSize).observe(pickEl);

/* ---------- tarjeta de Hoy: primero una pregunta, después la máquina y sus piezas ---------- */
var LQ={answered:{},step:'q',part:-1,pick:-1};
var jMarks=add(jr,'div','jr-marks');jr.insertBefore(jMarks,JE.card);
function learnCard(){
  var L=LEARN[JR.m.id];JE.cap.textContent='';
  if(L&&L.q&&!LQ.answered[JR.m.id]){LQ.step='q';renderQuestion(L);}else{LQ.step='card';renderMachine(L);}
}
function renderQuestion(L){
  var c=JE.card,Q=L.q[lang];c.innerHTML='';LQ.part=-1;
  add(c,'p','k').textContent=lt('guess');if(Q.s)add(c,'p','jr-setup').textContent=Q.s;add(c,'h2','jr-qq').textContent=Q.q;
  var ops=add(c,'div','jr-opts'),ans=add(c,'p','jr-ans'),go=add(c,'button','jr-btn is-main jr-go');ans.hidden=true;go.hidden=true;go.type='button';go.textContent=lt('seeIt');
  var bs=Q.o.map(function(o,i){var b=add(ops,'button','jr-opt');b.type='button';b.textContent=o;
    b.addEventListener('click',function(){LQ.pick=i;bs.forEach(function(x,j){x.disabled=true;if(j===Q.a)x.classList.add('is-right');else if(j===i)x.classList.add('is-wrong');});
      ans.innerHTML='';add(ans,'b','').textContent=(i===Q.a?lt('right'):lt('wrong'))+' ';ans.appendChild(document.createTextNode(Q.x));ans.hidden=false;go.hidden=false;go.focus();});
    return b;});
  go.addEventListener('click',function(){LQ.answered[JR.m.id]=1;LQ.step='card';renderMachine(L);});
  c.scrollTop=0;
}
function renderMachine(L){
  var c=JE.card,m=JR.m,X=JR.x;c.innerHTML='';markVisited(m.id);
  var sil=m.silent[lang],cut=sil.indexOf('. ');add(c,'p','k').textContent=cut>0?sil.slice(0,cut):sil;add(c,'h2','').textContent=m.name+' · '+jt('stillThere').toLowerCase();add(c,'p','pl').textContent=X.place[lang];
  if(cut>0)add(c,'p','pl').textContent=sil.slice(cut+2);
  liveSection(c,m);videoButton(c,m);
  if(L&&L.learned){add(c,'h3','').textContent=lt('learned');add(c,'p','lrn').textContent=L.learned[lang];}
  if(L&&L.parts&&L.parts.length){
    add(c,'h3','').textContent=lt('parts');var row=add(c,'div','jr-parts'),pd=add(c,'p','jr-pd');pd.hidden=true;
    L.parts.forEach(function(p,i){var b=add(row,'button','jr-part');b.type='button';add(b,'b','').textContent=String(i+1);b.appendChild(document.createTextNode(p[lang].t));
      b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){selectPart(i);});});
    LQ.partRow=row;LQ.partText=pd;
  }else{LQ.partRow=null;LQ.partText=null;}
  if(typeof lxLeftSection==='function')lxLeftSection(c,m);
  /* audio real de NASA */
  if(L&&L.audio){var au=add(c,'div','jr-audio'),ab=add(au,'button','jr-btn');ab.type='button';ab.textContent=(lang==='es'?'▶ Escuchar':'▶ Listen');
    var ac=add(au,'p','jr-acap');ac.textContent=L.audio.cap[lang]+' ';var aa=add(ac,'a','');aa.href=L.audio.src;aa.target='_blank';aa.rel='noopener';aa.textContent='('+L.audio.credit+')';
    ab.addEventListener('click',function(){if(!LQ.snd)LQ.snd=new Audio();var s=LQ.snd;if(!s.paused&&s.dataset.f===L.audio.f){s.pause();ab.textContent=(lang==='es'?'▶ Escuchar':'▶ Listen');return;}
      s.src=L.audio.f;s.dataset.f=L.audio.f;s.currentTime=0;s.play().catch(function(){});ab.textContent=(lang==='es'?'❚❚ Pausar':'❚❚ Pause');s.onended=function(){ab.textContent=(lang==='es'?'▶ Escuchar':'▶ Listen');};});}
  /* fotos reales de NASA: la prueba de que la máquina existe y de dónde quedó */
  var ph=PHOTOS[m.id];
  if(ph&&ph.length){add(c,'h3','').textContent=lang==='es'?'Fotos de NASA':'NASA photos';var row2=add(c,'div','jr-photos');
    ph.forEach(function(p,i){var b=add(row2,'button','jr-ph');b.type='button';b.setAttribute('aria-label',p.cap[lang]);var im=add(b,'img','');im.src=p.f;im.alt='';im.loading='lazy';
      if(p.art)add(b,'span','jr-art').textContent=lang==='es'?'Ilustración':'Artwork';
      b.addEventListener('click',function(){openPhoto(m.id,i);});});}
  var dt=add(c,'details','');add(dt,'summary','').textContent=lt('more');var ul=add(dt,'ul','');X.today[lang].forEach(function(l){add(ul,'li','').textContent=l;});
  buildMarks(L);if(LQ.part>=0)selectPart(LQ.part);c.scrollTop=0;
}
/* foto ampliada, con epígrafe, crédito y enlace a la ficha original */
var phEl=add(stage,'div','ph-box');phEl.hidden=true;phEl.setAttribute('role','dialog');phEl.setAttribute('aria-modal','true');
phEl.innerHTML='<figure><img alt=""><figcaption><span class="ph-cap"></span><span class="ph-cr"></span></figcaption></figure><button class="ph-x" type="button">×</button><button class="ph-prev" type="button">‹</button><button class="ph-next" type="button">›</button>';
var PH={id:null,i:0,back:null};
function openPhoto(id,i){PH.id=id;PH.i=i;PH.back=document.activeElement;showPhoto();phEl.hidden=false;phEl.querySelector('.ph-x').focus();}
function showPhoto(){var arr=PHOTOS[PH.id],p=arr[PH.i];phEl.querySelector('img').src=p.f;phEl.querySelector('img').alt=p.cap[lang];
  phEl.querySelector('.ph-cap').textContent=(p.art?(lang==='es'?'Ilustración. ':'Artwork. '):'')+p.cap[lang];
  var cr=phEl.querySelector('.ph-cr');cr.innerHTML='';cr.appendChild(document.createTextNode((lang==='es'?'Crédito: ':'Credit: ')+p.credit+' · '));
  var a=add(cr,'a','');a.href='https://images.nasa.gov/details/'+encodeURIComponent(p.id);a.target='_blank';a.rel='noopener';a.textContent=p.id;
  phEl.querySelector('.ph-prev').hidden=arr.length<2;phEl.querySelector('.ph-next').hidden=arr.length<2;}
function closePhoto(){phEl.hidden=true;if(PH.back&&PH.back.focus)PH.back.focus();}
phEl.querySelector('.ph-x').addEventListener('click',closePhoto);
phEl.addEventListener('click',function(e){if(e.target===phEl)closePhoto();});
phEl.querySelector('.ph-prev').addEventListener('click',function(){var n=PHOTOS[PH.id].length;PH.i=(PH.i+n-1)%n;showPhoto();});
phEl.querySelector('.ph-next').addEventListener('click',function(){var n=PHOTOS[PH.id].length;PH.i=(PH.i+1)%n;showPhoto();});
document.addEventListener('keydown',function(e){if(phEl.hidden)return;if(e.key==='Escape'){e.stopImmediatePropagation();closePhoto();}else if(e.key==='ArrowRight')phEl.querySelector('.ph-next').click();else if(e.key==='ArrowLeft')phEl.querySelector('.ph-prev').click();},true);
function selectPart(i){
  var L=LEARN[JR.m.id];if(!L||!L.parts||!L.parts[i])return;LQ.part=i;
  if(LQ.partRow){var bs=LQ.partRow.querySelectorAll('.jr-part');for(var k=0;k<bs.length;k++)bs[k].setAttribute('aria-pressed',String(k===i));}
  if(LQ.partText){LQ.partText.hidden=false;LQ.partText.textContent=L.parts[i][lang].d;}
  var mk=jMarks.querySelectorAll('.jr-mk');for(var j=0;j<mk.length;j++)mk[j].classList.toggle('is-on',j===i);
  if(JR.scene==='surface'&&SF)SF.autoSpin=false;
}
function buildMarks(L){
  jMarks.innerHTML='';if(!L||!L.parts)return;
  L.parts.forEach(function(p,i){var b=add(jMarks,'button','jr-mk');b.type='button';b.textContent=String(i+1);b.hidden=true;
    b.setAttribute('aria-label',p[lang].t);b.addEventListener('click',function(){selectPart(i);});});
}
/* con la tarjeta abierta en pantalla ancha, el centro de la imagen se corre a la derecha para que la tarjeta no tape la nave */
var CARD_DX=0;
function cardOffset(s){CARD_DX=(s&&s.id==='hoy'&&!JE.card.hidden&&W>760)?Math.round((Math.min(420,W-32)+16)/2):0;}
function viewFor(c){if(CARD_DX)c.setViewOffset(W,H,-CARD_DX,0,W,H);else c.clearViewOffset();}
/* caja de la nave en sus propios ejes, para ubicar las piezas con fracciones de esa caja */
var _lbInv=new THREE.Matrix4(),_lbM=new THREE.Matrix4(),_lbT=new THREE.Box3();
function localBox(T){
  T.updateMatrixWorld(true);_lbInv.copy(T.matrixWorld).invert();var b=new THREE.Box3(),n=0;
  T.traverse(function(o){if(o.isMesh&&o.geometry){if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();_lbM.multiplyMatrices(_lbInv,o.matrixWorld);_lbT.copy(o.geometry.boundingBox).applyMatrix4(_lbM);b.union(_lbT);n++;}});
  return {b:b,n:n};
}
/* tip: el punto del modelo más lejano desde el centro de la pieza nombrada (la punta de un brazo largo) */
function tipOf(T,from){
  T.updateMatrixWorld(true);var inv=new THREE.Matrix4().copy(T.matrixWorld).invert(),m=new THREE.Matrix4(),v=new THREE.Vector3(),c=new THREE.Vector3(),best=null,bd=-1;
  var o0=from&&T.getObjectByName(from);if(o0){var lb=localBox(o0);lb.b.getCenter(c).applyMatrix4(o0.matrixWorld).applyMatrix4(inv);}
  T.traverse(function(o){if(!o.isMesh||!o.geometry)return;m.multiplyMatrices(inv,o.matrixWorld);var pa=o.geometry.attributes.position;
    for(var i=0;i<pa.count;i++){v.fromBufferAttribute(pa,i).applyMatrix4(m);var d=v.distanceToSquared(c);if(d>bd){bd=d;best=[v.x,v.y,v.z];}}});
  return best;
}
var _mkV=new THREE.Vector3(),_mkC=new THREE.Vector3();
function updateMarks(){
  var mk=jMarks.children,s=JR.segs[JR.si],L=LEARN[JR.m&&JR.m.id];
  var on=!!(L&&L.parts&&s&&s.id==='hoy'&&LQ.step==='card');
  /* se mide en los ejes del modelo mismo (el primer hijo), que puede estar girado dentro de su grupo */
  var T=JR.scene==='surface'?(SF&&SF.hw):JR.shipHold,cam=JR.scene==='surface'?(SF&&SF.cam):(SP&&SP.cam);if(T&&T.children[0])T=T.children[0];
  if(!on||!T||!cam){for(var i=0;i<mk.length;i++)mk[i].hidden=true;return;}
  if(!T.userData.lb||T.userData.lbAt<performance.now()-1500){var lb=localBox(T);if(lb.n){T.userData.lb=lb;T.userData.lbAt=performance.now();}}
  var B=T.userData.lb;if(!B){for(var j=0;j<mk.length;j++)mk[j].hidden=true;return;}
  var b=B.b,sz=b.getSize(_mkC),rad=sz.length()/2;
  b.getCenter(_mkC).applyMatrix4(T.matrixWorld);var dC=_mkC.distanceTo(cam.position);
  var scale=T.matrixWorld.getMaxScaleOnAxis();
  for(var k=0;k<mk.length&&k<L.parts.length;k++){
    /* p: posición en metros en los ejes del modelo (modelos propios); f: fracción de la caja (modelos de NASA) */
    /* n: nombre de una pieza del modelo de NASA; f se toma entonces dentro de la caja de esa pieza */
    if(L.parts[k].none){mk[k].hidden=true;continue;} /* pieza sin punto en el modelo: solo el texto */
    var pp=L.parts[k].p,f=L.parts[k].f||[0.5,0.5,0.5],O=T,bb=b;
    if(L.parts[k].n){var o2=T.getObjectByName(L.parts[k].n);if(o2){if(!o2.userData.lb)o2.userData.lb=localBox(o2);O=o2;bb=o2.userData.lb.b;}}
    if(L.parts[k].tip){if(!T.userData.tip){var tp=tipOf(T,L.parts[k].tip);if(tp)T.userData.tip=tp;}pp=T.userData.tip||null;}
    if(pp)_mkV.set(pp[0],pp[1],pp[2]);else _mkV.set(bb.min.x+(bb.max.x-bb.min.x)*f[0],bb.min.y+(bb.max.y-bb.min.y)*f[1],bb.min.z+(bb.max.z-bb.min.z)*f[2]);
    /* w: posición en metros sobre el suelo del lugar (piezas sueltas, como los experimentos de Apollo 11) */
    if(L.parts[k].ex!=null&&SF&&SF.extra&&SF.extra.children[L.parts[k].ex])_mkV.copy(SF.extra.children[L.parts[k].ex].position).y+=0.75;else _mkV.applyMatrix4(O.matrixWorld);
    var d=_mkV.distanceTo(cam.position);_mkV.project(cam);
    var vis=_mkV.z<1&&_mkV.z>-1&&Math.abs(_mkV.x)<1.05&&Math.abs(_mkV.y)<1.05;mk[k].hidden=!vis;if(!vis)continue;
    mk[k].style.transform='translate('+Math.round((_mkV.x*0.5+0.5)*W)+'px,'+Math.round((-_mkV.y*0.5+0.5)*H)+'px)';
    mk[k].classList.toggle('is-back',d>dC+rad*scale*0.22);
  }
}
