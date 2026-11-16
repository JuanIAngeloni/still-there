/* ---------- juego: analista de una misión ficticia ----------
   El lector elige un personaje y una misión inventada, y decide qué hacer cuando algo falla. La pantalla es como la de
   las misiones: la nave en 3D sigue su rumbo (68-game-scene.js) y abajo aparece una conversación con la directora de vuelo.
   Cada evento trae una alerta (amarilla, sin apuro; roja, con cuenta regresiva), tres respuestas y una sola correcta.
   Una respuesta equivocada muestra en la nave una simulación de lo que saldría mal, explica por qué y deja probar de nuevo.
   Al final se muestran las máquinas reales que pasaron por algo parecido, con una frase que ya está en el sitio.
   Los eventos y sus textos salen de MG_DATA (src/js/67-game-data.js, generado por tools/make_game_data.py desde docs/juego/eventos.json).
   Va antes de la portada (70-home.js) en el orden de archivos, porque la portada llama a mgNavEntry y mgHomeEntry al armarse.
   API: mgNavEntry(nav), mgHomeEntry(wrap), mgTexts(), mgOpen(), mgClose(), mgTick(dt,now). */
var MG={el:null,body:null,state:'char',m:null,evs:[],i:0,first:0,health:100,wrong:{},last:-1,fixed:{},entry:null,me:0,run:0,sub:'',type:null,cd:null,ui:null};
var MG_PHASES=['launch','cruise','arrival','ops','extended'];
/* alertas rojas: hay que decidir antes de que se acabe el tiempo */
var MG_RED={storm:1,attitude:1,boulders:1,burn:1},MG_SECS=30;
var MG_STR={
  es:{tag:'Misión ficticia',
    charH:'Elegí quién sos',charP:'Este personaje te representa en la sala de control. Después elegís la misión.',charK:'Analista',change:'Cambiar personaje',
    npc:'Nora · Directora de vuelo',who:['Lince','Cóndor','Yaguareté','Zorro'],warn:'Aviso',crit:'Crítica',sim:'Simulación: qué pasaría',noSignal:'Sin señal',
    timeUp:'Se acabó el tiempo. Necesito una respuesta ya.',hello:'{who}, te toca la consola de {name}. Yo te paso lo que llega de la nave.',more:'Seguir (Enter)',secs:'Segundos para decidir',
    homeK:'Juego',homeT:'Sé analista de una misión',homeB:'Jugar',
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
  en:{tag:'Fictional mission',
    charH:'Choose who you are',charP:'This character stands for you in the control room. Next you pick the mission.',charK:'Analyst',change:'Change character',
    npc:'Nora · Flight director',who:['Lynx','Condor','Jaguar','Fox'],warn:'Warning',crit:'Critical',sim:'Simulation: what would happen',noSignal:'No signal',
    timeUp:'Time is up. I need an answer now.',hello:'{who}, you have the {name} console. I will pass you whatever comes in from the spacecraft.',more:'Continue (Enter)',secs:'Seconds left to decide',
    homeK:'Game',homeT:'Be the mission analyst',homeB:'Play',
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
try{MG.me=clamp(parseInt(localStorage.getItem('mgFace')||'0',10)||0,0,3);}catch(e){}

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
  '.mg .mg-btn{align-self:flex-start;padding:11px 20px;border-radius:999px;background:var(--fg);color:#05070b;font-weight:500;border:1px solid var(--fg);min-height:44px}'+
  '.mg .mg-btn.is-line{background:none;color:var(--fg);border-color:rgba(232,238,248,.34)}.mg .mg-btn.is-line:hover{border-color:var(--fg)}'+
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

(function(){
  var st=document.createElement('style');st.textContent=
  '.mg{overflow:hidden}.mgs-cv{position:absolute;inset:0;width:100%;height:100%;display:block}.mgs-cv[hidden]{display:none}'+
  '.mg-scr{position:absolute;inset:0;overflow:auto;-webkit-overflow-scrolling:touch;z-index:7}.mg-scr[hidden],.mg-ui[hidden]{display:none}.mg-scr.is-over{background:rgba(5,7,11,.84)}'+
  '.mg-ui{position:absolute;inset:0;z-index:3}'+
  '.mg-hud{position:absolute;top:0;left:0;right:0;z-index:5;padding:8px max(clamp(14px,3vw,36px),env(safe-area-inset-right,0px)) 22px max(clamp(14px,3vw,36px),env(safe-area-inset-left,0px));background:linear-gradient(rgba(5,7,11,.85),rgba(5,7,11,0))}'+
  '.mg-step{color:#a7b0bd;font-size:13px;white-space:nowrap}'+
  '.mg-hp{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#a7b0bd;white-space:nowrap}.mg-hp b{color:var(--fg);font-variant-numeric:tabular-nums}'+
  '.mg-hpb{width:110px;height:6px;border-radius:3px;background:rgba(232,238,248,.16);overflow:hidden}.mg-hpb i{display:block;height:100%;transition:width .6s ease,background-color .6s ease}'+
  '.mg-hp.is-hit{animation:mgHit .5s ease}'+
  '.mg-al{position:absolute;top:64px;left:50%;transform:translateX(-50%);width:max-content;max-width:min(780px,calc(100% - 28px));display:flex;gap:10px;align-items:center;padding:9px 14px 11px;border-radius:10px;font-weight:600;letter-spacing:.03em;font-size:14.5px;line-height:1.3;background:rgba(40,28,6,.9);border:1px solid #ffd08a;color:#ffe2b0;z-index:4;overflow:hidden;animation:mgDrop .5s cubic-bezier(.2,1.4,.4,1)}'+
  '.mg-al[hidden]{display:none}.mg-al.is-red{background:rgba(52,12,8,.92);border-color:#ff6b5a;color:#ffc9c0}.mg-al.is-ok{background:rgba(10,36,20,.92);border-color:#7fd49a;color:#c9f2d6}'+
  '.mg-al .dot{flex:0 0 10px;height:10px;border-radius:50%;background:currentColor;animation:mgPulse 1.1s ease-in-out infinite}.mg-al.is-hot .dot{animation-duration:.4s}.mg-al.is-ok .dot{animation:none}'+
  '.mg-al .lv{flex:0 0 auto;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:2px 7px;border-radius:4px;background:#ffd08a;color:#1a1305}.mg-al.is-red .lv{background:#ff6b5a;color:#1f0703}.mg-al.is-ok .lv{background:#7fd49a;color:#04170b}'+
  '.mg-al .cd{flex:0 0 auto;font-size:22px;font-variant-numeric:tabular-nums;min-width:1.6em;text-align:right;color:#fff}.mg-al .cd[hidden]{display:none}'+
  '.mg-al .bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:currentColor;transform-origin:left center}.mg-al .bar[hidden]{display:none}'+
  '.mg-mk{position:absolute;left:0;top:0;z-index:2;pointer-events:none;color:#ffd08a}.mg-mk[hidden]{display:none}.mg-mk.is-red{color:#ff6b5a}.mg-mk.is-ok{color:#7fd49a}'+
  '.mg-mk i{position:absolute;left:-24px;top:-24px;width:48px;height:48px;border-radius:50%;border:2px solid currentColor;animation:mgRing 1.3s ease-out infinite}.mg-mk i+i{animation-delay:.65s}'+
  '.mg-mk span{position:absolute;left:34px;top:-12px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;white-space:nowrap;background:rgba(8,11,17,.82);padding:3px 8px;border-radius:4px;border:1px solid currentColor}'+
  '.mg-sim{position:absolute;top:118px;left:50%;transform:translateX(-50%);z-index:4;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;white-space:nowrap;color:#ffc9c0;border:1px dashed #ff6b5a;border-radius:4px;padding:3px 9px;background:rgba(8,11,17,.8);animation:mgPulse 1s ease-in-out infinite}.mg-sim[hidden]{display:none}'+
  '.mg-ns{position:absolute;inset:0;z-index:1;display:grid;place-items:center;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 2px,rgba(0,0,0,.3) 2px 5px),rgba(5,7,11,.8);background-size:100% 7px,auto;animation:mgNoise .18s steps(3) infinite}.mg-ns[hidden]{display:none}'+
  '.mg-ns span{font-size:clamp(22px,4vw,40px);letter-spacing:.3em;text-transform:uppercase;font-weight:600;color:#ff6b5a;margin-top:-18vh;animation:mgPulse .9s steps(2) infinite}'+
  '.mg-fl{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0}.mg-fade{position:absolute;inset:0;z-index:6;background:#05070b;opacity:0;pointer-events:none;transition:opacity .34s ease}.mg-fade.is-on{opacity:1}'+
  '.mgs-cv.is-glitch{animation:mgGlitch .2s steps(2) infinite}'+
  /* caja de diálogo */
  '.mgd{position:absolute;left:50%;bottom:max(18px,env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(900px,calc(100% - 28px));display:grid;grid-template-columns:84px minmax(0,1fr);gap:16px;align-items:start;padding:22px 20px 18px;border-radius:14px;background:rgba(8,11,17,.93);border:1px solid rgba(232,238,248,.34);box-shadow:0 0 0 4px rgba(8,11,17,.55),0 18px 50px rgba(0,0,0,.55);z-index:5;cursor:pointer;animation:mgUp .4s cubic-bezier(.2,1.2,.4,1)}'+
  '.mgd.is-me{grid-template-columns:minmax(0,1fr) 84px;border-color:rgba(255,208,138,.6)}.mgd.is-me .mgd-face{order:2}'+
  '.mgd-face{width:84px;height:84px;border-radius:12px;overflow:hidden;border:1px solid rgba(232,238,248,.34);background:#101722}.mgd-face svg{display:block;width:100%;height:100%}.mgd-face.is-pop{animation:mgPop .35s cubic-bezier(.2,1.6,.4,1)}'+
  '.mgd-who{position:absolute;top:-12px;left:18px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;background:var(--accent);color:#1a1305;border-radius:4px;padding:3px 9px;white-space:nowrap}.mgd.is-me .mgd-who{left:auto;right:18px;background:#eef2f8;color:#05070b}'+
  '.mgd-text{margin:0;font-size:19px;line-height:1.45;min-height:4.35em;white-space:pre-wrap}.mgd.is-me .mgd-text{min-height:2.9em}'+
  '.mgd-more{position:absolute;right:16px;bottom:7px;color:var(--accent);font-size:13px;animation:mgBob .8s ease-in-out infinite}.mgd-more[hidden]{display:none}'+
  '.mgd.is-ask .mgd-text{min-height:0}.mgd-opts{display:grid;gap:4px;margin-top:10px}.mgd-opts[hidden]{display:none}'+
  '.mg .mgd-opt{text-align:left;padding:9px 12px 9px 32px;border-radius:8px;background:none;border:1px solid rgba(232,238,248,.16);position:relative;font-size:17px;line-height:1.35;animation:mgUp2 .3s ease backwards}'+
  '.mgd-opt:nth-child(2){animation-delay:.07s}.mgd-opt:nth-child(3){animation-delay:.14s}'+
  '.mgd-opt:before{content:"\\25B6";position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--accent);opacity:0;transition:opacity .12s,left .12s}'+
  '.mgd-opt:not(:disabled):hover,.mgd-opt:focus-visible{border-color:rgba(255,208,138,.7);background:rgba(255,208,138,.08)}.mgd-opt:not(:disabled):hover:before,.mgd-opt:focus-visible:before{opacity:1;left:13px}'+
  '.mg .mgd-opt:disabled{color:#7f8896;text-decoration:line-through;cursor:default;border-color:transparent}'+
  '.mg-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}'+
  /* elegir personaje */
  '.mg-chars{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(170px,45%),1fr));gap:12px}'+
  '.mg .mg-char{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 12px;border-radius:12px;background:#0b0f16;border:1px solid rgba(232,238,248,.16);transition:transform .18s ease,border-color .18s ease}'+
  '.mg .mg-char:hover,.mg .mg-char:focus-visible{border-color:var(--accent);transform:translateY(-4px)}.mg .mg-char[aria-pressed="true"]{border-color:rgba(255,208,138,.7)}'+
  '.mg-char svg{width:112px;height:112px;border-radius:14px;background:#101722}.mg-char b{font-size:19px;font-weight:600}.mg-char span{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:#a7b0bd}'+
  '.mg .mg-link{align-self:flex-start;background:none;border:0;padding:6px 0;color:#a7b0bd;text-decoration:underline;text-underline-offset:3px}.mg .mg-link:hover{color:var(--fg)}'+
  '@media (max-width:820px){.mg-hud .mg-tag{display:none}.mg-hud .mg-name{order:0;flex:0 1 auto;font-size:16px}.mg-hud .mg-top{row-gap:0}.mg-step{order:10;flex:1 1 100%}}'+
  '@media (max-width:700px){.mg-al{top:86px;font-size:13px}.mg-sim{top:150px}.mgd{grid-template-columns:54px minmax(0,1fr);gap:11px;padding:20px 12px 16px}.mgd.is-me{grid-template-columns:minmax(0,1fr) 54px}.mgd-face{width:54px;height:54px;border-radius:9px}.mgd-text{font-size:16.5px;min-height:5.8em}.mg .mgd-opt{font-size:15.5px;padding:8px 10px 8px 28px}.mg-hpb{width:64px}.mg-hp span{display:none}}'+
  '@media (prefers-reduced-motion:reduce){.mg-al,.mgd,.mgd-opt,.mg-mk i,.mg-sim,.mg-ns,.mgs-cv.is-glitch,.mgd-face.is-pop{animation:none!important}}'+
  '@keyframes mgDrop{0%{transform:translate(-50%,-40px);opacity:0}100%{transform:translate(-50%,0);opacity:1}}'+
  '@keyframes mgUp{0%{transform:translate(-50%,26px);opacity:0}100%{transform:translate(-50%,0);opacity:1}}@keyframes mgUp2{0%{transform:translateY(10px);opacity:0}100%{transform:none;opacity:1}}'+
  '@keyframes mgRing{0%{transform:scale(.45);opacity:1}100%{transform:scale(1.5);opacity:0}}@keyframes mgBob{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}'+
  '@keyframes mgPop{0%{transform:scale(.7)}100%{transform:scale(1)}}@keyframes mgHit{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'+
  '@keyframes mgNoise{0%{background-position:0 0,0 0}100%{background-position:0 7px,0 0}}'+
  '@keyframes mgGlitch{0%{filter:hue-rotate(90deg) saturate(3);transform:translate(7px,0)}50%{filter:hue-rotate(-70deg) contrast(1.6);transform:translate(-6px,3px)}100%{filter:none;transform:none}}';
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
  if(MG.el&&!MG.el.hidden){if(MG.state==='play')mgEvent(true);else mgRender();}
}

/* ---- retratos: cuatro analistas para elegir y la directora de vuelo (el quinto) ---- */
var MG_FACES=[{skin:'#e9b990',hair:'#2a1a12',st:0,shirt:'#3b6fd1'},{skin:'#8a5a3c',hair:'#15110f',st:3,shirt:'#d1663b'},{skin:'#f1c9a5',hair:'#b4552a',st:1,shirt:'#3ba36f'},{skin:'#c68e62',hair:'#3a2a55',st:2,shirt:'#8a5bd1'},
  {skin:'#d9a37c',hair:'#c9ccd2',st:2,shirt:'#ffd08a'}];
function mgFace(i,parent){
  var f=MG_FACES[i]||MG_FACES[0],s=mgSvg('svg',{viewBox:'0 0 96 96','aria-hidden':'true'},parent),k;
  mgSvg('rect',{x:0,y:0,width:96,height:96,fill:i===4?'#1a1608':'#101722'},s);
  if(f.st===1)mgSvg('path',{d:'M24 70V38c0-16 11-24 24-24s24 8 24 24v32z',fill:f.hair},s);
  mgSvg('path',{d:'M10 98c2-24 20-32 38-32s36 8 38 32z',fill:f.shirt},s);mgSvg('rect',{x:42,y:54,width:12,height:14,rx:5,fill:f.skin},s);
  mgSvg('circle',{cx:48,cy:40,r:19,fill:f.skin},s);
  if(f.st===3){for(k=0;k<9;k++)mgSvg('circle',{cx:48+Math.cos(Math.PI+k*Math.PI/8)*20,cy:36+Math.sin(Math.PI+k*Math.PI/8)*17,r:8.5,fill:f.hair},s);}
  else mgSvg('path',{d:'M28 40c-1-17 9-25 20-25s21 8 20 25c-4-9-10-13-20-13s-16 4-20 13z',fill:f.hair},s);
  if(f.st===2)mgSvg('circle',{cx:48,cy:13,r:7.5,fill:f.hair},s);
  mgSvg('circle',{cx:40.5,cy:42,r:2.2,fill:'#1a1305'},s);mgSvg('circle',{cx:55.5,cy:42,r:2.2,fill:'#1a1305'},s);
  mgSvg('path',{d:'M41 50q7 6 14 0',fill:'none',stroke:'#1a1305','stroke-width':2,'stroke-linecap':'round'},s);
  /* auriculares con micrófono */
  mgSvg('path',{d:'M27 42a21 21 0 0 1 42 0',fill:'none',stroke:'#cfd6e0','stroke-width':3},s);mgSvg('rect',{x:23,y:37,width:7,height:13,rx:3.5,fill:'#cfd6e0'},s);mgSvg('rect',{x:66,y:37,width:7,height:13,rx:3.5,fill:'#cfd6e0'},s);
  mgSvg('path',{d:'M27 49q2 11 13 9',fill:'none',stroke:'#cfd6e0','stroke-width':2,'stroke-linecap':'round'},s);mgSvg('circle',{cx:41,cy:57.5,r:2.4,fill:i===4?'#ff6b5a':'#ffd08a'},s);
  return s;
}

/* ---- abrir y cerrar ---- */
function mgOpen(){
  if(!MG.el){
    MG.el=add(stage,'div','mg');MG.el.hidden=true;MG.el.addEventListener('pointerdown',function(e){e.stopPropagation();});
    MG.el.addEventListener('wheel',function(e){e.stopPropagation();},{passive:true});
    document.addEventListener('keydown',function(e){if(!MG.el||MG.el.hidden)return;
      if(e.key==='Escape'){e.stopImmediatePropagation();mgClose();return;}
      if(MG.state!=='play')return;var tag=e.target&&e.target.tagName;
      if((e.key==='Enter'||e.key===' ')&&tag!=='BUTTON'){e.preventDefault();e.stopImmediatePropagation();mgAdvance();}
      else if(MG.sub==='ask'&&/^[123]$/.test(e.key)){e.stopImmediatePropagation();mgChoose(+e.key-1);}},true);
    try{mgsOpen(MG.el);MGS.hooks={flash:mgFlash,signal:function(on){if(MG.ui)MG.ui.ns.hidden=!on;},glitch:function(on){MGS.cv.classList.toggle('is-glitch',!!on);}};}catch(err){}
    mgBuild();
  }
  if(typeof homeHide==='function')homeHide();
  MG.state='char';MG.m=null;MG.el.hidden=false;mgRender();MG.scr.scrollTop=0;
}
function mgClose(openId){
  MG.run++;MG.type=null;MG.cd=null;MG.clock=0;if(typeof MGS!=='undefined')mgsClose();if(MG.el)MG.el.hidden=true;
  if(typeof homeShow==='function')homeShow();
  if(openId&&typeof openMission==='function'){var m=allMissions().filter(function(x){return x.id===openId;})[0];if(m)openMission(m);}
}
/* lo que no se vuelve a armar: la pantalla de juego (barra de arriba, alerta, marca, diálogo) y la capa de las demás pantallas */
function mgBuild(){
  var u=MG.ui={},el=u.el=add(MG.el,'div','mg-ui');el.hidden=true;
  u.fl=add(el,'div','mg-fl');u.ns=add(el,'div','mg-ns');u.ns.hidden=true;u.nsT=add(u.ns,'span','');
  u.mk=add(el,'div','mg-mk');u.mk.hidden=true;add(u.mk,'i','');add(u.mk,'i','');u.mkT=add(u.mk,'span','');
  u.hud=add(el,'div','mg-hud');
  u.al=add(el,'p','mg-al');u.al.hidden=true;add(u.al,'i','dot').setAttribute('aria-hidden','true');u.alL=add(u.al,'span','lv');u.alT=add(u.al,'span','');u.alC=add(u.al,'b','cd');u.alB=add(u.al,'i','bar');
  u.sim=add(el,'p','mg-sim');u.sim.hidden=true;
  var d=u.d=add(el,'div','mgd');u.face=add(d,'div','mgd-face');var mn=add(d,'div','');u.who=add(d,'span','mgd-who');u.text=add(mn,'p','mgd-text');u.text.setAttribute('aria-hidden','true');
  u.live=add(mn,'p','mg-live');u.live.setAttribute('aria-live','polite');u.opts=add(mn,'div','mgd-opts');u.opts.hidden=true;u.more=add(d,'span','mgd-more');u.more.textContent='▼';u.more.hidden=true;
  d.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('.mgd-opt'))return;mgAdvance();});
  u.fade=add(MG.el,'div','mg-fade');MG.scr=add(MG.el,'div','mg-scr');
}
function mgFlash(col,k){var f=MG.ui&&MG.ui.fl;if(!f||reduce)return;f.style.transition='none';f.style.backgroundColor=col;f.style.opacity=String(k);void f.offsetWidth;f.style.transition='opacity .7s ease-out';f.style.opacity='0';}
function mgFade(fn){var f=MG.ui.fade,run=MG.run;f.classList.add('is-on');setTimeout(function(){if(run!==MG.run)return;fn();setTimeout(function(){f.classList.remove('is-on');},60);},reduce?0:360);}

/* ---- la partida ---- */
function mgStart(id){
  var D=mgData();MG.m=D.missions.filter(function(q){return q.id===id;})[0];if(!MG.m)return;
  MG.evs=D.events.filter(function(e){return e.for.indexOf(id)>=0;}).sort(function(a,b){return MG_PHASES.indexOf(a.phase)-MG_PHASES.indexOf(b.phase);});
  MG.i=0;MG.first=0;MG.health=100;MG.fixed={};MG.state='play';MG.run++;
  try{mgsSetup(id);mgsGo(MG.evs[0].phase);MGS.on=true;}catch(e){}
  mgRender();MG.ui.fade.classList.add('is-on');MG.wrong={};mgEvent(false,true);
}
function mgName(){return mgTx(MG.m.name);}
function mgHud(){
  var u=MG.ui,ev=MG.evs[MG.i],top=u.hud;top.innerHTML='';var bar=add(top,'header','mg-top');add(bar,'span','mg-tag').textContent=mgt('tag');
  add(bar,'span','mg-name').textContent=mgName();add(bar,'span','mg-kind').textContent=mgTx(MG.m.kind);
  add(bar,'span','mg-step').textContent=mgt('phase')[ev.phase]+' · '+mgt('stepOf').replace('{i}',MG.i+1).replace('{t}',MG.evs.length);add(bar,'span','mg-sp');
  var hp=u.hp=add(bar,'div','mg-hp');add(hp,'span','').textContent=mgt('health');var hb=add(hp,'div','mg-hpb');u.hpI=add(hb,'i','');u.hpV=add(hp,'b','');
  hb.setAttribute('role','progressbar');hb.setAttribute('aria-valuemin','0');hb.setAttribute('aria-valuemax','100');hb.setAttribute('aria-label',mgt('health'));
  mgLangX(bar);mgHealth();u.sim.textContent=mgt('sim');u.nsT.textContent=mgt('noSignal');
}
function mgHealth(hit){var u=MG.ui;if(!u.hpI)return;u.hpI.style.width=MG.health+'%';u.hpI.style.backgroundColor=MG.health>=80?'#7fd49a':(MG.health>=60?'#ffd08a':'#ff9d6e');u.hpV.textContent=MG.health+' %';
  u.hpI.parentNode.setAttribute('aria-valuenow',String(MG.health));if(hit){u.hp.classList.remove('is-hit');void u.hp.offsetWidth;u.hp.classList.add('is-hit');}}
function mgLangX(top){
  ['es','en'].forEach(function(c){var b=add(top,'button','mg-lg');b.type='button';b.textContent=c.toUpperCase();b.setAttribute('aria-pressed',String(lang===c));b.setAttribute('lang',c);
    b.addEventListener('click',function(){var q=$(c==='en'?'#langEn':'#langEs');if(q)q.click();});});
  var x=add(top,'button','mg-x');x.type='button';x.textContent='×';x.setAttribute('aria-label',mgt('close'));x.addEventListener('click',function(){mgClose();});
}
/* la alerta de arriba y la marca sobre la pieza: amarilla, roja o, ya resuelta, verde */
function mgAlertUI(ev,ok){
  var u=MG.ui;if(!ev){u.al.hidden=true;u.mk.hidden=true;return;}
  var red=!!MG_RED[ev.key],cls=ok?' is-ok':(red?' is-red':'');u.al.className='mg-al'+cls;u.al.setAttribute('role',ok?'status':'alert');
  u.alL.textContent=ok?mgt('fixed'):(red?mgt('crit'):mgt('warn'));u.alT.textContent=mgTx(ev.alert,mgName()).replace(/^[^:]{3,12}:\s*/,'');u.alC.hidden=true;u.alB.hidden=true;
  if(u.al.hidden){u.al.hidden=false;u.al.style.animation='none';void u.al.offsetWidth;u.al.style.animation='';}
  u.mk.className='mg-mk'+cls;u.mkT.textContent=mgt('sys')[ev.sys]||'';
}
/* una línea de la conversación. mode: wait (espera un clic o Enter), auto (sigue sola), hold (queda escrita y sigue sin esperar) */
function mgSay(who,text,mode,next,pause){
  var u=MG.ui,me=who==='me',cls='mgd'+(me?' is-me':'');if(u.d.className.replace(' is-ask','')!==cls||me!==u.wasMe){u.wasMe=me;u.d.className=cls;u.face.innerHTML='';mgFace(me?MG.me:4,u.face);u.face.classList.remove('is-pop');void u.face.offsetWidth;u.face.classList.add('is-pop');}
  if(!u.face.firstChild)mgFace(me?MG.me:4,u.face);
  u.d.classList.remove('is-ask');u.who.textContent=me?mgt('who')[MG.me]+' · '+mgt('charK'):mgt('npc');u.opts.hidden=true;u.opts.innerHTML='';u.more.hidden=true;u.text.textContent='';u.live.textContent=text;
  MG.type={s:text,n:0,done:false,mode:mode,next:next,wait:0,pause:pause==null?1.3:pause};
}
function mgAdvance(){var T=MG.type;if(!T||MG.state!=='play')return;if(!T.done){T.n=1e9;return;}if(T.mode!=='hold'){MG.type=null;T.next();}}
function mgTick(dt,now){
  /* reloj propio: el de la página frena el tiempo cuando hay pocos cuadros por segundo, y acá corre una cuenta regresiva */
  var rt=performance.now();dt=MG.clock?Math.min(0.25,(rt-MG.clock)/1000):dt;MG.clock=rt;
  if(typeof MGS!=='undefined'&&MGS.on)try{mgsTick(dt,now);}catch(e){if(!MG.err){MG.err=e;if(window.console)console.error(e);}}
  if(MG.state!=='play'||!MG.ui)return;var u=MG.ui,T=MG.type,mk=MGS.mark;
  if(T){
    if(!T.done){T.n+=dt*(reduce?1e9:52);if(T.n>=T.s.length){T.done=true;u.text.textContent=T.s;if(T.mode==='wait')u.more.hidden=false;if(T.mode==='hold'){MG.type=null;T.next();}}
      else u.text.textContent=T.s.slice(0,Math.floor(T.n));}
    else if(T.mode==='auto'){T.wait+=dt;if(T.wait>=T.pause){MG.type=null;T.next();}}
  }
  var on=mk.vis&&!u.al.hidden;u.mk.hidden=!on;if(on)u.mk.style.transform='translate('+mk.x.toFixed(1)+'px,'+mk.y.toFixed(1)+'px)';
  /* cuenta regresiva de las alertas rojas */
  var C=MG.cd;if(C){C.t-=dt;var s=Math.max(0,Math.ceil(C.t));if(s!==C.s){C.s=s;u.alC.textContent=String(s);u.al.classList.toggle('is-hot',s<=10);}
    u.alB.style.transform='scaleX('+clamp(C.t/MG_SECS,0,1).toFixed(3)+')';if(C.t<=0)mgTimeUp();}
}
function mgTimer(on){var u=MG.ui;if(!on){MG.cd=null;u.alC.hidden=true;u.alB.hidden=true;u.al.classList.remove('is-hot');return;}
  MG.cd={t:MG_SECS,s:-1};u.alC.hidden=false;u.alB.hidden=false;u.alC.setAttribute('aria-label',mgt('secs'));}
function mgTimeUp(){
  var run=MG.run;mgTimer(false);MG.sub='busy';MG.wrong.t=true;MG.health=Math.max(40,MG.health-8);mgHealth(true);mgFlash('#ff6b5a',0.35);
  mgSay('npc',mgt('timeUp'),'auto',function(){if(run===MG.run)mgAsk(run);},0.9);
}
function mgEvent(keep,first){
  var ev=MG.evs[MG.i],name=mgName(),run=++MG.run,u=MG.ui;if(!keep)MG.wrong={};MG.last=-1;MG.sub='calm';mgTimer(false);mgAlertUI(null);u.sim.hidden=true;u.ns.hidden=true;
  var go=function(){
    try{mgsGo(ev.phase);}catch(e){}mgHud();
    var hi=first?mgt('hello').replace('{who}',mgt('who')[MG.me]).replace('{name}',name)+'\n':'';
    mgSay('npc',hi+mgTx(ev.day)+'. '+mgt('calm'),first?'wait':'auto',function(){if(run!==MG.run)return;
      MG.sub='alert';try{mgsAlert(ev.key,ev.sys);}catch(e){}mgAlertUI(ev);mgFlash(MG_RED[ev.key]?'#ff6b5a':'#ffd08a',0.28);
      mgSay('npc',mgTx(ev.story,name),'wait',function(){if(run===MG.run)mgAsk(run);});},1.2);
  };
  mgFade(go);
}
function mgAsk(run){
  var ev=MG.evs[MG.i],name=mgName(),u=MG.ui,tail=MG.last>=0&&!ev.options[MG.last].ok?mgt('tryAgain')+' ':'';
  mgSay('npc',tail+mgTx(ev.ask,name),'hold',function(){if(run!==MG.run)return;MG.sub='ask';u.opts.innerHTML='';u.opts.hidden=false;u.d.classList.add('is-ask');var first=null;
    ev.options.forEach(function(o,k){var b=add(u.opts,'button','mgd-opt');b.type='button';b.textContent=mgTx(o.t,name);b.disabled=!!MG.wrong[k];if(!b.disabled&&!first)first=b;b.addEventListener('click',function(){mgChoose(k);});});
    if(MG_RED[ev.key])mgTimer(true);});
}
function mgChoose(k){
  var ev=MG.evs[MG.i],o=ev&&ev.options[k],name=mgName(),run=MG.run,u=MG.ui;if(!o||MG.sub!=='ask'||MG.wrong[k])return;MG.sub='busy';MG.last=k;mgTimer(false);
  mgSay('me',mgTx(o.t,name),'auto',function(){if(run!==MG.run)return;
    if(o.ok){
      if(!Object.keys(MG.wrong).length)MG.first++;MG.fixed[ev.sys]=Object.keys(MG.wrong).length?'fixed':'ok';
      mgAlertUI(ev,true);mgFlash('#7fd49a',0.22);try{mgsFix(ev.key,null);}catch(e){}
      mgSay('npc',mgt('rightK')+' '+mgTx(o.result,name),'wait',function(){if(run!==MG.run)return;
        mgSay('npc',mgt('whyK')+': '+mgTx(ev.why,name),'wait',function(){if(run!==MG.run)return;var rm=mgReal(ev);
          if(rm)mgSay('npc',mgt('realK')+' · '+rm.m.name+': «'+rm.text+'»','wait',function(){if(run===MG.run)mgNext();});else mgNext();});});
    }else{
      MG.wrong[k]=true;MG.health=Math.max(40,MG.health-8);mgHealth(true);u.sim.hidden=false;try{mgsFault(ev.key,k,null);}catch(e){}
      mgSay('npc',mgt('wrongK')+' '+mgTx(o.result,name),'wait',function(){if(run!==MG.run)return;
        /* se rebobina la simulación y la alerta sigue esperando una respuesta */
        mgFade(function(){u.sim.hidden=true;try{mgsAlert(ev.key,ev.sys);MGS.mt=5;}catch(e){}mgAsk(run);});});
    }},0.7);
}
function mgNext(){if(MG.i<MG.evs.length-1){MG.i++;mgEvent();}else{MG.run++;MG.type=null;MG.state='done';mgRender();MG.scr.scrollTop=0;}}

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
  if(MG.m&&MG.state==='done'){add(top,'span','mg-name').textContent=mgName();add(top,'span','mg-kind').textContent=mgTx(MG.m.kind);}
  add(top,'span','mg-sp');mgLangX(top);
}
function mgRender(){
  if(!MG.el)return;var play=MG.state==='play',done=MG.state==='done',on3d=play||done;MG.el.setAttribute('lang',lang);
  MG.ui.el.hidden=!play;MG.scr.hidden=play;MG.scr.className='mg-scr'+(done?' is-over':'');if(typeof MGS!=='undefined'&&MGS.cv){MGS.cv.hidden=!on3d;MGS.on=on3d;}
  if(play){mgHud();return;}
  var keep=MG.scr.scrollTop;MG.scr.innerHTML='';MG.body=add(MG.scr,'div','mg-wrap');mgTop();
  if(MG.state==='char')mgChar();else if(done)mgDone();else mgPick();
  MG.scr.scrollTop=keep;
}
function mgChar(){
  var b=MG.body;add(b,'h1','mg-h1').textContent=mgt('charH');add(b,'p','mg-lead').textContent=mgt('charP');var g=add(b,'div','mg-chars');
  [0,1,2,3].forEach(function(i){var c=add(g,'button','mg-char');c.type='button';c.setAttribute('aria-pressed',String(MG.me===i));mgFace(i,c);add(c,'b','').textContent=mgt('who')[i];add(c,'span','').textContent=mgt('charK');
    c.addEventListener('click',function(){MG.me=i;try{localStorage.setItem('mgFace',String(i));}catch(e){}MG.state='pick';mgRender();MG.scr.scrollTop=0;});});
}
function mgPick(){
  var b=MG.body;add(b,'h1','mg-h1').textContent=mgt('pickH');add(b,'p','mg-lead').textContent=mgt('pickP');
  var g=add(b,'div','mg-pick');
  mgData().missions.forEach(function(m){var c=add(g,'button','mg-card');c.type='button';
    var svg=mgSvg('svg',{viewBox:'0 0 300 120','aria-hidden':'true'},c);mgWorld(svg,'earth',52,74,20);mgWorld(svg,m.id,236,58,m.id==='moon'?26:(m.id==='mars'?32:28));
    mgSvg('path',{d:'M76 66Q150 6 204 46',fill:'none',stroke:'rgba(232,238,248,.4)','stroke-width':1.5,'stroke-dasharray':'3 6'},svg);mgSvg('circle',{cx:150,cy:33,r:4,fill:'#ffd08a'},svg);
    add(c,'span','mg-ck').textContent=mgTx(m.kind);add(c,'span','mg-cn').textContent=mgTx(m.name);add(c,'span','mg-cg').textContent=mgTx(m.goal);
    add(c,'span','mg-go').textContent=mgt('start');c.addEventListener('click',function(){mgStart(m.id);});});
  var ch=add(b,'button','mg-link');ch.type='button';ch.textContent=mgt('change');ch.addEventListener('click',function(){MG.state='char';mgRender();});
}
/* la máquina real con la que se relaciona un evento, y su frase (una que ya está en el sitio) */
function mgReal(ev){
  if(!ev.real||!ev.real.id)return null;var m=allMissions().filter(function(x){return x.id===ev.real.id;})[0];if(!m)return null;
  return {m:m,text:ev.real[lang]||ev.real.en};
}
function mgDone(){
  var b=MG.body,name=mgName();add(b,'h1','mg-h1').textContent=mgt('doneH');
  var bx=add(b,'div','mg-box');bx.appendChild(mgTrack(MG.m.id,MG.evs.length,MG.evs.length,false,true));
  add(b,'p','mg-lead').textContent=mgt('doneP').replace('{name}',name);
  add(b,'p','mg-score').textContent=mgt('score').replace('{n}',MG.first).replace('{t}',MG.evs.length)+' '+mgt('health')+': '+MG.health+' %.';
  var seen={},list=[];MG.evs.forEach(function(e){var r=mgReal(e);if(r&&!seen[r.m.id]){seen[r.m.id]=1;list.push(r);}});
  if(list.length){add(b,'h2','mg-k').textContent=mgt('realH');var ul=add(b,'ul','mg-list');
    list.forEach(function(r){var li=add(ul,'li','');add(li,'b','').textContent=r.m.name;add(li,'span','').textContent=r.text;
      var go=add(li,'button','mg-btn is-line');go.type='button';go.textContent=mgt('open');go.addEventListener('click',function(){mgClose(r.m.id);});});}
  var row=add(b,'div','mg-row'),a=add(row,'button','mg-btn');a.type='button';a.textContent=mgt('again');a.addEventListener('click',function(){MG.state='pick';MG.m=null;mgRender();MG.scr.scrollTop=0;});
  var h=add(row,'button','mg-btn is-line');h.type='button';h.textContent=mgt('back');h.addEventListener('click',function(){mgClose();});
}
/* el cambio de idioma lo hace la página; acá solo se vuelven a escribir los textos */
try{['#langEs','#langEn'].forEach(function(s){var q=$(s);if(q)q.addEventListener('click',function(){mgTexts();});});}catch(e){}
