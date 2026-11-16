/* ---------- recorrido automático para grabar la demo ----------
   Se activa con ?demo=1 (y, si se quiere, &m=spirit para elegir la misión). El sitio se recorre solo, con los mismos
   controles que usa una persona: portada, línea de tiempo, una misión completa (lanzamiento por etapas, viaje y la
   máquina hoy). Sin ?demo=1 este archivo no hace nada.
   Antes de empezar, detrás de una cortina negra, abre y cierra la misión una vez: así los modelos, las texturas y los
   sombreadores ya están cargados cuando se graba, y el recorrido no se queda quieto esperando. */
(function(){
  if(!/[?&]demo=1/.test(location.search))return;
  var id=(location.search.match(/[?&]m=([a-z0-9]+)/)||[])[1]||'spirit',T0=+((location.search.match(/[?&]t0=(\d+)/)||[])[1]||3000);
  var st=document.createElement('style');st.textContent='html.is-demo,html.is-demo *{cursor:none!important}html.is-demo *::-webkit-scrollbar{width:0;height:0}'+
    '.demo-end{position:fixed;inset:0;z-index:99;background:#05070b;color:#f2f4f7;display:grid;place-content:center;gap:14px;text-align:center;opacity:0;transition:opacity .6s}.demo-end.on{opacity:1}'+
    '.demo-end b{font-size:58px;font-weight:600;letter-spacing:-.02em}.demo-end span{font-size:21px;color:#a7b0bd}'+
    '.home .hm-card{transition:border-color .15s ease,transform .2s ease,box-shadow .2s ease}.home .hm-card.demo-pick{border-color:#ffd08a;box-shadow:0 0 0 3px #ffd08a;transform:scale(1.035);z-index:2;position:relative}';
  document.head.appendChild(st);document.documentElement.classList.add('is-demo');
  /* cortina negra hasta que empieza el recorrido: así la grabación tiene un comienzo exacto */
  var cur=document.createElement('div');cur.style.cssText='position:fixed;inset:0;z-index:100;background:#000';document.body.appendChild(cur);
  var D={log:[],done:false};window.__demo=D;
  function mark(n){D.log.push([n,Math.round(performance.now())]);}
  function wait(cond,cb,max){var t0=performance.now();(function f(){var ok=false;try{ok=!!cond();}catch(e){}
    if(ok||performance.now()-t0>(max||15000)){if(!ok)mark('timeout');cb();}else setTimeout(f,40);})();}
  /* una lista de pasos, cada uno con su espera respecto del anterior */
  function chain(steps){var i=0;(function run(){if(i>=steps.length)return;var s=steps[i++];setTimeout(function(){try{s[1]();}catch(e){mark('error '+e.message);}run();},s[0]);})();}
  function mis(){return allMissions().filter(function(x){return x.id===id;})[0];}
  function home(){return document.querySelector('.home');}
  function glideEl(el,y,ms){if(!el)return;var y0=el.scrollTop,t0=performance.now();(function f(now){var u=Math.min(1,(now-t0)/ms),e=u*u*(3-2*u);el.scrollTop=y0+(y-y0)*e;if(u<1)requestAnimationFrame(f);})(t0);}
  function seg(name){for(var i=0;i<JR.segs.length;i++)if(JR.segs[i].id===name)return i;return -1;}
  function topIn(el,box){return el.getBoundingClientRect().top-box.getBoundingClientRect().top+box.scrollTop;}
  function card(){var el=home(),hit=null;if(!el)return null;[].forEach.call(el.querySelectorAll('.hm-card'),function(c){var n=c.querySelector('.hm-n');if(n&&n.textContent.trim()===mis().name)hit=c;});return hit;}

  /* ---- 1. precarga detrás de la cortina ---- */
  function warm(cb){
    var m=mis(),g=typeof ROCKET_GLB!=='undefined'&&ROCKET_GLB[lxKey(m)],need=0,got=0;
    function one(){got++;}
    if(g){need++;modelOf(g,one);}
    if(JX[id]&&JX[id].hw==='mer'){need++;modelOf('mer_hd',one);}
    wait(function(){return got>=need;},function(){
      mark('models');openMission(m);
      wait(function(){return JR.active&&LX.ready;},function(){
        chain([[500,function(){var i=seg('hoy');if(i>=0)jumpTo(i);}],
          [900,function(){endJourney();}],
          [300,function(){var el=home();if(el)el.scrollTop=0;mark('warm');cb();}]]);
      });
    });
  }
  /* ---- 2. el recorrido ---- */
  function tour(){
    if(cur.parentNode)cur.parentNode.removeChild(cur);mark('start');
    var el=home(),tl=null;if(el)[].forEach.call(el.querySelectorAll('h2'),function(q){if(/Timeline|tiempo/i.test(q.textContent))tl=q;});
    chain([
      [1200,function(){glideEl(el,tl?Math.max(0,topIn(tl,el)-36):el.scrollHeight*0.6,1100);}],
      [2000,function(){var c=card();glideEl(el,c?Math.max(0,topIn(c,el)-(el.clientHeight-c.offsetHeight)/2):0,650);}],
      [700,function(){var c=card();if(c)c.classList.add('demo-pick');}],
      [600,function(){var c=card();if(c)c.classList.remove('demo-pick');mark('open');openMission(mis());launch();}]
    ]);
  }
  /* lanzamiento: cada paso dura poco y avanza solo; al terminar el último, sigue el viaje */
  function launch(){
    var seen=false,iv=setInterval(function(){
      if(!JR.active)return;var s=JR.segs[JR.si];if(!s)return;
      if(!s.launch){clearInterval(iv);after();return;}
      if(!seen){seen=true;mark('launch');}
      JR.segs.forEach(function(q){if(q.launch)q.dur=q.k===0?0.9:1.2;});
      if(JR.wait){var nx=JR.segs[JR.si+1];if(nx&&nx.launch)nextSeg();else{clearInterval(iv);after();}}
    },40);
  }
  function after(){
    mark('cruise');var i=seg('viaje');if(i>=0)jumpTo(i);
    chain([[2000,function(){mark('today');var j=seg('hoy');if(j>=0)jumpTo(j);today();}]]);
  }
  /* la máquina hoy: dos piezas y lo que quedó tirado */
  function today(){
    var box=document.querySelector('.jr-card'),steps=[[900,function(){mark('card');}]];
    steps.push([1100,function(){selectPart(0);}]);
    steps.push([1400,function(){selectPart(1);}]);
    steps.push([1400,function(){var ul=box.querySelector('.lx-left');if(ul&&ul.previousElementSibling)glideEl(box,Math.max(0,topIn(ul.previousElementSibling,box)-14),700);}]);
    steps.push([2100,function(){mark('endcard');var e=document.createElement('div');e.className='demo-end';var b=document.createElement('b');b.textContent='Still There';var s2=document.createElement('span');
      s2.textContent=lang==='es'?'Las misiones de NASA a través del tiempo':'NASA’s missions across time';e.appendChild(b);e.appendChild(s2);document.body.appendChild(e);requestAnimationFrame(function(){e.classList.add('on');});}]);
    steps.push([2400,function(){mark('end');D.done=true;
      /* en local, los tiempos de cada tramo quedan guardados para recortar la grabación con exactitud */
      if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){try{fetch('/frame/demolog/0001.jpg',{method:'POST',body:JSON.stringify(D.log)});}catch(e){}}}]);
    chain(steps);
  }
  var born=performance.now();
  wait(function(){return typeof HZ_READY!=='undefined'&&HZ_READY&&home()&&typeof JX!=='undefined'&&mis();},function(){
    setTimeout(function(){warm(function(){setTimeout(tour,Math.max(400,T0-(performance.now()-born)));});},600);
  },20000);
})();
