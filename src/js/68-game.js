/* ---------- juego: analista de una misión ficticia ----------
   El lector elige una misión inventada y decide qué hacer cuando algo falla. Cada evento trae una alerta, tres opciones
   y una sola correcta; las equivocadas explican qué sale mal y dejan probar de nuevo. Al final se muestran las máquinas
   reales que pasaron por algo parecido, con una frase que ya está en el sitio (no se agregan datos nuevos sobre ellas).
   Es una pantalla aparte: no toca el viaje en 3D ni los datos de las misiones reales.
   Va antes de la portada (70-home.js) en el orden de archivos, porque la portada llama a mgNavEntry y mgHomeEntry al armarse.
   Datos: MG_DATA (src/js/67-game-data.js, generado por tools/make_game_data.py desde docs/juego/eventos.json).
   API: mgHomeEntry(wrap), mgTexts(), mgOpen(), mgClose(). */
var MG={el:null,body:null,state:'pick',m:null,evs:[],i:0,first:0,health:100,wrong:{},last:-1,fixed:{},timer:0,entry:null};
var MG_PHASES=['launch','cruise','arrival','ops','extended'];
var MG_STR={
  es:{tag:'Misión ficticia',homeK:'Juego',homeT:'Sé analista de una misión',homeB:'Jugar',
    homeP:'Elegí una misión inventada y decidí qué hacer cuando algo falla. Los problemas se parecen a los que tuvieron las máquinas de verdad.',
    pickH:'Vos sos analista de misión',
    pickP:'Tu trabajo es mirar los datos que llegan de la nave y decidir qué hacer cuando algo sale mal. Elegí tu misión. Es inventada, pero cada problema se parece a uno que vivió una máquina de verdad.',
    start:'Empezar',phase:{launch:'Despegue',cruise:'Viaje',arrival:'Llegada',ops:'Trabajo',extended:'Misión extendida'},
    sys:{power:'Energía',comms:'Comunicaciones',attitude:'Orientación',nav:'Rumbo',engine:'Motor',wheels:'Ruedas',thermal:'Temperatura',software:'Programa',weather:'Clima'},
    ok:'Bien',fault:'Falla',fixed:'Resuelto',systems:'Sistemas',health:'Estado de la misión',
    calm:'Llegan datos de la nave. Todos los sistemas funcionan bien.',stepOf:'Decisión {i} de {t}',
    tryAgain:'Probá otra opción.',rightK:'Bien decidido.',wrongK:'No funcionó.',whyK:'Por qué',realK:'Pasó de verdad',
    next:'Seguir',finish:'Ver el resultado',doneH:'Misión cumplida',doneP:'{name} llegó hasta el final gracias a tus decisiones.',
    score:'Acertaste {n} de {t} decisiones al primer intento.',realH:'Máquinas de verdad que pasaron por algo parecido',
    open:'Ver su misión',again:'Jugar otra misión',back:'Volver al inicio',close:'Cerrar el juego',earth:'Tierra',
    dest:{moon:'Luna',mars:'Marte',asteroid:'Asteroide'}},
  en:{tag:'Fictional mission',homeK:'Game',homeT:'Be the mission analyst',homeB:'Play',
    homeP:'Pick a made-up mission and decide what to do when something fails. The problems are like the ones the real machines faced.',
    pickH:'You are the mission analyst',
    pickP:'Your job is to watch the data coming from the spacecraft and decide what to do when something goes wrong. Pick your mission. It is made up, but each problem is like one a real machine lived through.',
    start:'Start',phase:{launch:'Launch',cruise:'Cruise',arrival:'Arrival',ops:'Operations',extended:'Extended mission'},
    sys:{power:'Power',comms:'Comms',attitude:'Pointing',nav:'Course',engine:'Engine',wheels:'Wheels',thermal:'Temperature',software:'Software',weather:'Weather'},
    ok:'OK',fault:'Fault',fixed:'Fixed',systems:'Systems',health:'Mission health',
    calm:'Data coming in from the spacecraft. All systems are working.',stepOf:'Decision {i} of {t}',
    tryAgain:'Try another option.',rightK:'Good call.',wrongK:'That did not work.',whyK:'Why',realK:'It happened for real',
    next:'Continue',finish:'See the result',doneH:'Mission complete',doneP:'{name} made it to the end thanks to your decisions.',
    score:'You got {n} of {t} decisions right on the first try.',realH:'Real machines that went through something similar',
    open:'See its mission',again:'Play another mission',back:'Back to start',close:'Close the game',earth:'Earth',
    dest:{moon:'Moon',mars:'Mars',asteroid:'Asteroid'}}
};
function mgt(k){return MG_STR[lang][k];}
function mgTx(o,name){var s=o?(o[lang]||o.en||''):'';return name?s.split('{name}').join(name):s;}
function mgData(){return (typeof MG_DATA!=='undefined'&&MG_DATA)||{missions:[],events:[]};}

(function(){
  var st=document.createElement('style');st.textContent=
  '.mg{position:absolute;inset:0;z-index:60;overflow:auto;-webkit-overflow-scrolling:touch;background:#05070b;color:var(--fg);font-size:16px;line-height:1.45}'+
  '.mg[hidden]{display:none}'+
  '.mg-wrap{max-width:1180px;margin:0 auto;min-height:100%;display:flex;flex-direction:column;gap:22px;padding:14px max(clamp(16px,4vw,48px),env(safe-area-inset-right,0px)) 34px max(clamp(16px,4vw,48px),env(safe-area-inset-left,0px))}'+
  '.mg button{font:inherit;color:var(--fg);margin:0;cursor:pointer;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent}'+
  '.mg-top{display:flex;align-items:center;gap:12px;min-height:48px}'+
  '.mg-tag{font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#1a1305;background:var(--accent);border-radius:4px;padding:3px 8px;white-space:nowrap}'+
  '.mg-name{font-size:17px;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mg-kind{color:#a7b0bd;font-size:14px;white-space:nowrap}'+
  '.mg-sp{flex:1 1 auto}'+
  '.mg-lg{background:none;border:0;padding:8px 6px;font-size:13px;color:#a7b0bd}.mg-lg[aria-pressed="true"]{color:var(--fg);border-bottom:2px solid var(--accent)}'+
  '.mg-x{width:40px;height:40px;border-radius:50%;background:none;border:1px solid rgba(232,238,248,.34);font-size:18px;line-height:1}.mg-x:hover{border-color:var(--fg)}'+
  '.mg-h1{margin:8px 0 0;font-size:clamp(28px,5vw,46px);line-height:1.08;letter-spacing:-.02em;font-weight:600}'+
  '.mg-lead{margin:0;color:#cfd6e0;font-size:18px;max-width:44rem}'+
  '.mg-pick{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:14px}'+
  '.mg-card{display:flex;flex-direction:column;gap:10px;text-align:left;padding:18px;background:#0b0f16;border:1px solid rgba(232,238,248,.16);border-radius:12px;transition:border-color .15s ease}'+
  '.mg-card:hover{border-color:rgba(232,238,248,.62)}'+
  '.mg-card svg{width:100%;height:auto;display:block;border-radius:8px;background:#070a10}'+
  '.mg-cn{font-size:21px;font-weight:600}.mg-ck{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a7b0bd}.mg-cg{color:#cfd6e0}'+
  '.mg-go{align-self:flex-start;margin-top:4px;padding:8px 16px;border-radius:999px;background:var(--fg);color:#05070b;font-weight:500;font-size:14px}'+
  '.mg-play{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:20px;align-items:start}'+
  '.mg-box{background:#0b0f16;border:1px solid rgba(232,238,248,.16);border-radius:12px;padding:16px}'+
  '.mg-side{display:flex;flex-direction:column;gap:14px}'+
  '.mg-k{margin:0 0 8px;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#a7b0bd}'+
  '.mg-track{width:100%;max-width:620px;height:auto;display:block;margin:0 auto}'+
  '.mg-rail{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}'+
  '.mg-ph{font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:999px;border:1px solid rgba(232,238,248,.2);color:#a7b0bd}'+
  '.mg-ph.is-done{color:#cfd6e0;border-color:rgba(127,212,154,.5)}.mg-ph.is-on{color:#05070b;background:var(--fg);border-color:var(--fg)}'+
  '.mg-sys{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:8px}'+
  '.mg-chip{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid rgba(232,238,248,.16);font-size:14px}'+
  '.mg-chip b{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:#7fd49a}'+
  '.mg-chip.is-fault{border-color:#ff6b5a;background:rgba(255,107,90,.1)}.mg-chip.is-fault b{color:#ff9d90}'+
  '.mg-chip.is-fixed b{color:var(--accent)}'+
  '.mg-bar{height:10px;border-radius:999px;background:rgba(232,238,248,.12);overflow:hidden}.mg-bar i{display:block;height:100%;border-radius:999px;background:#7fd49a;transition:width .4s ease,background-color .4s ease}'+
  '.mg-hv{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}.mg-hv b{font-size:22px;font-weight:600}'+
  '.mg-main{display:flex;flex-direction:column;gap:14px;min-height:320px}'+
  '.mg-day{margin:0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#a7b0bd}'+
  '.mg-calm{margin:0;color:#cfd6e0;font-size:18px}'+
  '.mg-alert{margin:0;padding:12px 14px;border-radius:8px;border:1px solid #ff6b5a;background:rgba(255,107,90,.12);color:#ffd2cb;font-weight:600;letter-spacing:.05em;font-size:16px;display:flex;gap:10px;align-items:flex-start}'+
  '.mg-alert i{flex:none;width:10px;height:10px;margin-top:6px;border-radius:50%;background:#ff6b5a}'+
  '.mg-alert.is-ok{border-color:rgba(127,212,154,.6);background:rgba(127,212,154,.08);color:#cfe9d8}.mg-alert.is-ok i{background:#7fd49a}'+
  '.mg-story{margin:0;font-size:18px}.mg-ask{margin:4px 0 0;font-size:21px;font-weight:600;line-height:1.25}'+
  '.mg-opts{display:flex;flex-direction:column;gap:10px}'+
  '.mg-opt{text-align:left;padding:13px 15px;border-radius:10px;background:#0f1520;border:1px solid rgba(232,238,248,.24);font-size:16px;min-height:48px}'+
  '.mg-opt:hover:not(:disabled){border-color:var(--fg)}.mg-opt:disabled{cursor:default}'+
  '.mg-opt.is-wrong{border-color:rgba(255,107,90,.55);color:#a7b0bd}.mg-opt.is-right{border-color:#7fd49a;background:rgba(127,212,154,.1)}'+
  '.mg-res{margin:0;padding:12px 14px;border-radius:8px;background:#0f1520;border-left:3px solid #ff6b5a}.mg-res.is-right{border-left-color:#7fd49a}'+
  '.mg-res b{display:block;margin-bottom:2px}'+
  '.mg-why{margin:0;color:#cfd6e0}.mg-why b{color:var(--fg)}'+
  '.mg-real{margin:0;padding:12px 14px;border-radius:8px;border:1px solid rgba(255,208,138,.4)}.mg-real b{display:block;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}'+
  '.mg-btn{align-self:flex-start;padding:11px 20px;border-radius:999px;background:var(--fg);color:#05070b;font-weight:500;border:1px solid var(--fg);min-height:44px}'+
  '.mg-btn.is-line{background:none;color:var(--fg);border-color:rgba(232,238,248,.34)}.mg-btn.is-line:hover{border-color:var(--fg)}'+
  '.mg-row{display:flex;flex-wrap:wrap;gap:10px}'+
  '.mg-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:10px}'+
  '.mg-list li{display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:10px;background:#0b0f16;border:1px solid rgba(232,238,248,.16)}.mg-list li b{font-size:18px}'+
  '.mg-list li span{color:#cfd6e0}'+
  '.mg-score{margin:0;font-size:21px}'+
  '.hm-game{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;padding:16px 18px;border-radius:12px;background:#0b0f16;border:1px solid rgba(255,208,138,.4)}'+
  '.hm-game div{flex:1 1 340px;min-width:0}.hm-game p{margin:0;color:#cfd6e0}.hm-game .mg-k{margin-bottom:4px;color:var(--accent)}.hm-game b{display:block;font-size:22px;font-weight:600;line-height:1.2;margin-bottom:4px}'+
  '.hm-game button{font:inherit;cursor:pointer;padding:11px 22px;border-radius:999px;background:var(--fg);color:#05070b;font-weight:500;border:0;min-height:44px}'+
  '@media (max-width:820px){.mg-play{grid-template-columns:minmax(0,1fr)}.mg-main{min-height:0;order:-1}.mg-kind{display:none}.mg-top{flex-wrap:wrap;row-gap:6px}.mg-name{order:9;flex:1 1 100%;font-size:19px}.mg-lead,.mg-story,.mg-calm{font-size:16px}.mg-ask{font-size:19px}}'+
  '@media (prefers-reduced-motion:no-preference){.mg-alert:not(.is-ok) i{animation:mgPulse 1.1s ease-in-out infinite}}'+
  '@keyframes mgPulse{0%,100%{opacity:1}50%{opacity:.25}}';
  document.head.appendChild(st);
})();

/* ---- acceso desde la portada ---- */
function mgNavEntry(nav){var b=add(nav,'button','hm-link');b.type='button';b.addEventListener('click',function(){mgOpen();});MG.navB=b;return b;}
function mgHomeEntry(wrap){
  var s=add(wrap,'section','hm-game'),d=add(s,'div','');MG.entry={k:add(d,'p','mg-k'),t:add(d,'b',''),p:add(d,'p',''),b:add(s,'button','')};
  MG.entry.b.type='button';MG.entry.b.addEventListener('click',function(){mgOpen();});mgTexts();return s;
}
function mgTexts(){
  if(MG.navB)MG.navB.textContent=mgt('homeK');
  if(MG.entry){MG.entry.k.textContent=mgt('homeK')+' · '+mgt('tag');MG.entry.t.textContent=mgt('homeT');MG.entry.p.textContent=mgt('homeP');MG.entry.b.textContent=mgt('homeB');}
  if(MG.el&&!MG.el.hidden)mgRender();
}

/* ---- abrir y cerrar ---- */
function mgOpen(){
  if(!MG.el){MG.el=add(stage,'div','mg');MG.el.hidden=true;MG.el.addEventListener('pointerdown',function(e){e.stopPropagation();});
    MG.el.addEventListener('wheel',function(e){e.stopPropagation();},{passive:true});
    document.addEventListener('keydown',function(e){if(MG.el&&!MG.el.hidden&&e.key==='Escape'){e.stopImmediatePropagation();mgClose();}},true);}
  if(typeof homeHide==='function')homeHide();
  MG.state='pick';MG.m=null;MG.el.hidden=false;mgRender();MG.el.scrollTop=0;
}
function mgClose(openId){
  clearTimeout(MG.timer);if(MG.el)MG.el.hidden=true;
  if(typeof homeShow==='function')homeShow();
  if(openId&&typeof openMission==='function'){var m=allMissions().filter(function(x){return x.id===openId;})[0];if(m)openMission(m);}
}
function mgStart(id){
  var D=mgData();MG.m=D.missions.filter(function(q){return q.id===id;})[0];if(!MG.m)return;
  MG.evs=D.events.filter(function(e){return e.for.indexOf(id)>=0;}).sort(function(a,b){return MG_PHASES.indexOf(a.phase)-MG_PHASES.indexOf(b.phase);});
  MG.i=0;MG.first=0;MG.health=100;MG.fixed={};mgEvent();
}
function mgEvent(){
  MG.wrong={};MG.last=-1;MG.state='calm';mgRender();MG.el.scrollTop=0;
  clearTimeout(MG.timer);MG.timer=setTimeout(function(){if(MG.state==='calm'){MG.state='alert';mgRender();}},reduce?200:1100);
}
function mgChoose(k){
  var ev=MG.evs[MG.i],o=ev&&ev.options[k];if(!o||MG.state!=='alert')return;MG.last=k;
  if(o.ok){if(!Object.keys(MG.wrong).length)MG.first++;MG.fixed[ev.sys]=Object.keys(MG.wrong).length?'fixed':'ok';MG.state='solved';}
  else{MG.wrong[k]=true;MG.health=Math.max(40,MG.health-8);}
  mgRender();
}
function mgNext(){if(MG.i<MG.evs.length-1){MG.i++;mgEvent();}else{MG.state='done';mgRender();MG.el.scrollTop=0;}}

/* ---- dibujo ---- */
function mgSvg(tag,at,p){var e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(var k in at)e.setAttribute(k,String(at[k]));if(p)p.appendChild(e);return e;}
function mgWorld(svg,kind,x,y,r){
  if(kind==='earth'){mgSvg('circle',{cx:x,cy:y,r:r,fill:'#2f6fb8'},svg);mgSvg('path',{d:'M'+(x-r*0.5)+' '+(y-r*0.3)+'q'+r*0.4+' -'+r*0.5+' '+r*0.8+' -'+r*0.1+'q-'+r*0.1+' '+r*0.6+' -'+r*0.6+' '+r*0.5+'z',fill:'#4f9a5c'},svg);}
  else if(kind==='moon'){mgSvg('circle',{cx:x,cy:y,r:r,fill:'#c9c9c3'},svg);mgSvg('circle',{cx:x-r*0.3,cy:y-r*0.2,r:r*0.22,fill:'#aeaea8'},svg);mgSvg('circle',{cx:x+r*0.35,cy:y+r*0.3,r:r*0.15,fill:'#aeaea8'},svg);}
  else if(kind==='mars'){mgSvg('circle',{cx:x,cy:y,r:r,fill:'#cf7a4d'},svg);mgSvg('ellipse',{cx:x-r*0.1,cy:y+r*0.25,rx:r*0.55,ry:r*0.2,fill:'#b56338'},svg);mgSvg('ellipse',{cx:x,cy:y-r*0.82,rx:r*0.34,ry:r*0.1,fill:'#f1e6dc'},svg);}
  else{mgSvg('path',{d:'M'+(x-r)+' '+(y-r*0.2)+'l'+r*0.5+' -'+r*0.7+'l'+r*0.9+' '+r*0.1+'l'+r*0.6+' '+r*0.7+'l-'+r*0.4+' '+r*0.7+'l-'+r*1.0+' '+r*0.2+'z',fill:'#a6927a'},svg);mgSvg('circle',{cx:x+r*0.1,cy:y+r*0.1,r:r*0.2,fill:'#8c7a65'},svg);}
}
/* el camino de la misión: la Tierra, el destino y una marca por cada decisión */
function mgTrack(id,n,i,alert,done){
  var svg=mgSvg('svg',{viewBox:'0 0 600 150',role:'img','aria-label':mgt('earth')+' → '+mgt('dest')[id]});svg.setAttribute('class','mg-track');
  var x0=70,x1=530,y=86,arc=function(u){return [x0+(x1-x0)*u,y-58*Math.sin(Math.PI*u)];},k,p,d='';
  for(k=0;k<=40;k++){p=arc(k/40);d+=(k?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1);}
  mgSvg('path',{d:d,fill:'none',stroke:'rgba(232,238,248,.34)','stroke-width':1.5,'stroke-dasharray':'3 6'},svg);
  mgWorld(svg,'earth',x0,y,26);mgWorld(svg,id,x1,y,id==='asteroid'?20:(id==='moon'?17:22));
  var t1=mgSvg('text',{x:x0,y:138,'text-anchor':'middle',fill:'#a7b0bd','font-size':13},svg);t1.textContent=mgt('earth');
  var t2=mgSvg('text',{x:x1,y:138,'text-anchor':'middle',fill:'#a7b0bd','font-size':13},svg);t2.textContent=mgt('dest')[id];
  for(k=0;k<n;k++){p=arc((k+0.5)/n);mgSvg('circle',{cx:p[0],cy:p[1],r:4,fill:(done||k<i)?'#7fd49a':'#05070b',stroke:(done||k<i)?'#7fd49a':'rgba(232,238,248,.5)','stroke-width':1.5},svg);}
  p=arc(done?1:(i+0.5)/n);if(done)p=[x1-34,y-14];
  mgSvg('circle',{cx:p[0],cy:p[1],r:10,fill:'none',stroke:alert?'#ff6b5a':'#ffd08a','stroke-width':1.5},svg);mgSvg('circle',{cx:p[0],cy:p[1],r:5,fill:alert?'#ff6b5a':'#ffd08a'},svg);
  return svg;
}
function mgTop(){
  var top=add(MG.body,'header','mg-top');add(top,'span','mg-tag').textContent=mgt('tag');
  if(MG.m&&MG.state!=='pick'){add(top,'span','mg-name').textContent=mgTx(MG.m.name);add(top,'span','mg-kind').textContent=mgTx(MG.m.kind);}
  add(top,'span','mg-sp');
  ['es','en'].forEach(function(c){var b=add(top,'button','mg-lg');b.type='button';b.textContent=c.toUpperCase();b.setAttribute('aria-pressed',String(lang===c));b.setAttribute('lang',c);
    b.addEventListener('click',function(){var q=$(c==='en'?'#langEn':'#langEs');if(q)q.click();});});
  var x=add(top,'button','mg-x');x.type='button';x.textContent='×';x.setAttribute('aria-label',mgt('close'));x.addEventListener('click',function(){mgClose();});
}
function mgRender(){
  if(!MG.el)return;var keep=MG.el.scrollTop;MG.el.innerHTML='';MG.el.setAttribute('lang',lang);MG.body=add(MG.el,'div','mg-wrap');mgTop();
  if(MG.state==='pick')mgPick();else if(MG.state==='done')mgDone();else mgPlay();
  MG.el.scrollTop=keep;
}
function mgPick(){
  var b=MG.body;add(b,'h1','mg-h1').textContent=mgt('pickH');add(b,'p','mg-lead').textContent=mgt('pickP');
  var g=add(b,'div','mg-pick');
  mgData().missions.forEach(function(m){var c=add(g,'button','mg-card');c.type='button';
    var svg=mgSvg('svg',{viewBox:'0 0 300 120','aria-hidden':'true'},c);mgWorld(svg,'earth',52,74,20);mgWorld(svg,m.id,236,58,m.id==='moon'?26:(m.id==='mars'?32:28));
    mgSvg('path',{d:'M76 66Q150 6 204 46',fill:'none',stroke:'rgba(232,238,248,.4)','stroke-width':1.5,'stroke-dasharray':'3 6'},svg);mgSvg('circle',{cx:150,cy:33,r:4,fill:'#ffd08a'},svg);
    add(c,'span','mg-ck').textContent=mgTx(m.kind);add(c,'span','mg-cn').textContent=mgTx(m.name);add(c,'span','mg-cg').textContent=mgTx(m.goal);
    add(c,'span','mg-go').textContent=mgt('start');c.addEventListener('click',function(){mgStart(m.id);});});
}
function mgPlay(){
  var ev=MG.evs[MG.i],name=mgTx(MG.m.name),alert=MG.state==='alert',solved=MG.state==='solved',wrongN=Object.keys(MG.wrong).length;
  var play=add(MG.body,'div','mg-play'),side=add(play,'div','mg-side'),main=add(play,'section','mg-box mg-main');
  /* costado: camino, etapas, sistemas y estado */
  var b1=add(side,'div','mg-box');b1.appendChild(mgTrack(MG.m.id,MG.evs.length,MG.i+(solved?1:0),alert,false));
  var rail=add(b1,'div','mg-rail'),cur=MG_PHASES.indexOf(ev.phase);
  MG_PHASES.forEach(function(ph,k){if(!MG.evs.some(function(e){return e.phase===ph;}))return;var s=add(rail,'span','mg-ph'+(k<cur?' is-done':(k===cur?' is-on':'')));s.textContent=mgt('phase')[ph];});
  var b2=add(side,'div','mg-box');add(b2,'p','mg-k').textContent=mgt('systems');var sy=add(b2,'div','mg-sys'),seen={};
  MG.evs.forEach(function(e){if(seen[e.sys])return;seen[e.sys]=1;var fault=e===ev&&alert;
    var c=add(sy,'div','mg-chip'+(fault?' is-fault':(MG.fixed[e.sys]==='fixed'?' is-fixed':'')));add(c,'span','').textContent=mgt('sys')[e.sys];
    add(c,'b','').textContent=fault?mgt('fault'):(MG.fixed[e.sys]==='fixed'?mgt('fixed'):mgt('ok'));});
  var b3=add(side,'div','mg-box'),hv=add(b3,'div','mg-hv');add(hv,'span','mg-k').textContent=mgt('health');add(hv,'b','').textContent=MG.health+' %';
  var bar=add(b3,'div','mg-bar'),fill=add(bar,'i','');fill.style.width=MG.health+'%';fill.style.backgroundColor=MG.health>=80?'#7fd49a':(MG.health>=60?'#ffd08a':'#ff9d6e');
  bar.setAttribute('role','progressbar');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');bar.setAttribute('aria-valuenow',String(MG.health));bar.setAttribute('aria-label',mgt('health'));
  /* panel principal */
  add(main,'p','mg-day').textContent=mgTx(ev.day)+' · '+mgt('stepOf').replace('{i}',MG.i+1).replace('{t}',MG.evs.length);
  if(MG.state==='calm'){add(main,'p','mg-calm').textContent=mgt('calm');return;}
  var al=add(main,'p','mg-alert'+(solved?' is-ok':''));al.setAttribute('role',solved?'status':'alert');add(al,'i','').setAttribute('aria-hidden','true');add(al,'span','').textContent=mgTx(ev.alert,name);
  add(main,'p','mg-story').textContent=mgTx(ev.story,name);add(main,'h2','mg-ask').textContent=mgTx(ev.ask,name);
  var ops=add(main,'div','mg-opts'),first=null;
  ev.options.forEach(function(o,k){var b=add(ops,'button','mg-opt'+(MG.wrong[k]?' is-wrong':((solved&&o.ok)?' is-right':'')));b.type='button';b.textContent=mgTx(o.t,name);
    b.disabled=solved||!!MG.wrong[k];if(!b.disabled&&!first)first=b;b.addEventListener('click',function(){mgChoose(k);});});
  if(MG.last>=0){var o=ev.options[MG.last],r=add(main,'p','mg-res'+(o.ok?' is-right':''));r.setAttribute('aria-live','polite');
    add(r,'b','').textContent=o.ok?mgt('rightK'):mgt('wrongK');r.appendChild(document.createTextNode(mgTx(o.result,name)+(o.ok?'':' '+mgt('tryAgain'))));}
  if(solved){
    var w=add(main,'p','mg-why');add(w,'b','').textContent=mgt('whyK')+': ';w.appendChild(document.createTextNode(mgTx(ev.why,name)));
    var rm=mgReal(ev);if(rm){var rr=add(main,'p','mg-real');add(rr,'b','').textContent=mgt('realK')+' · '+rm.m.name;rr.appendChild(document.createTextNode(rm.text));}
    var nx=add(main,'button','mg-btn');nx.type='button';nx.textContent=MG.i<MG.evs.length-1?mgt('next'):mgt('finish');nx.addEventListener('click',mgNext);
    try{nx.focus({preventScroll:true});}catch(e){}
  }else if(first&&wrongN===0){try{first.focus({preventScroll:true});}catch(e2){}}
}
/* la máquina real con la que se relaciona un evento, y su frase (una que ya está en el sitio) */
function mgReal(ev){
  if(!ev.real||!ev.real.id)return null;var m=allMissions().filter(function(x){return x.id===ev.real.id;})[0];if(!m)return null;
  return {m:m,text:ev.real[lang]||ev.real.en};
}
function mgDone(){
  var b=MG.body,name=mgTx(MG.m.name);add(b,'h1','mg-h1').textContent=mgt('doneH');
  var bx=add(b,'div','mg-box');bx.appendChild(mgTrack(MG.m.id,MG.evs.length,MG.evs.length,false,true));
  add(b,'p','mg-lead').textContent=mgt('doneP').replace('{name}',name);
  add(b,'p','mg-score').textContent=mgt('score').replace('{n}',MG.first).replace('{t}',MG.evs.length)+' '+mgt('health')+': '+MG.health+' %.';
  var seen={},list=[];MG.evs.forEach(function(e){var r=mgReal(e);if(r&&!seen[r.m.id]){seen[r.m.id]=1;list.push(r);}});
  if(list.length){add(b,'h2','mg-k').textContent=mgt('realH');var ul=add(b,'ul','mg-list');
    list.forEach(function(r){var li=add(ul,'li','');add(li,'b','').textContent=r.m.name;add(li,'span','').textContent=r.text;
      var go=add(li,'button','mg-btn is-line');go.type='button';go.textContent=mgt('open');go.addEventListener('click',function(){mgClose(r.m.id);});});}
  var row=add(b,'div','mg-row'),a=add(row,'button','mg-btn');a.type='button';a.textContent=mgt('again');a.addEventListener('click',function(){MG.state='pick';MG.m=null;mgRender();MG.el.scrollTop=0;});
  var h=add(row,'button','mg-btn is-line');h.type='button';h.textContent=mgt('back');h.addEventListener('click',function(){mgClose();});
}
/* el cambio de idioma lo hace la página; acá solo se vuelven a escribir los textos */
try{['#langEs','#langEn'].forEach(function(s){var q=$(s);if(q)q.addEventListener('click',function(){mgTexts();});});}catch(e){}
