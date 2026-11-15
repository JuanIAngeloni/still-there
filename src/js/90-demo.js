/* ---------- recorrido automático para grabar la demo ----------
   Se activa con ?demo=1 (y, si se quiere, &m=spirit para elegir la misión). El sitio se recorre solo, con los mismos
   controles que usa una persona: portada, línea de tiempo, una misión completa (lanzamiento por etapas, viaje y la
   máquina hoy). Sin ?demo=1 este archivo no hace nada. */
(function(){
  if(!/[?&]demo=1/.test(location.search))return;
  var id=(location.search.match(/[?&]m=([a-z0-9]+)/)||[])[1]||'spirit',T0=+((location.search.match(/[?&]t0=(\d+)/)||[])[1]||5000);
  var st=document.createElement('style');st.textContent='html.is-demo,html.is-demo *{cursor:none!important}html.is-demo *::-webkit-scrollbar{width:0;height:0}'+
    '.demo-end{position:fixed;inset:0;z-index:99;background:#05070b;color:#f2f4f7;display:grid;place-content:center;gap:14px;text-align:center;opacity:0;transition:opacity .7s}.demo-end.on{opacity:1}'+
    '.demo-end b{font-size:58px;font-weight:600;letter-spacing:-.02em}.demo-end span{font-size:21px;color:#a7b0bd}';
  document.head.appendChild(st);document.documentElement.classList.add('is-demo');
  function at(ms,f){setTimeout(function(){try{f();}catch(e){}},Math.max(0,T0+ms));}
  function later(ms,f){setTimeout(function(){try{f();}catch(e){}},ms);}
  function mis(){return allMissions().filter(function(x){return x.id===id;})[0];}
  function home(){return document.querySelector('.home');}
  function glide(y,ms){var el=home();if(!el)return;var y0=el.scrollTop,t0=performance.now();(function f(now){var u=Math.min(1,(now-t0)/ms),e=u*u*(3-2*u);el.scrollTop=y0+(y-y0)*e;if(u<1)requestAnimationFrame(f);})(t0);}
  function seg(name){for(var i=0;i<JR.segs.length;i++)if(JR.segs[i].id===name)return i;return -1;}
  /* el cohete y la nave se cargan antes de empezar, para que no haya esperas en cámara */
  later(800,function(){var m=mis(),g=typeof ROCKET_GLB!=='undefined'&&ROCKET_GLB[lxKey(m)];if(g)modelOf(g,function(){});if(JX[id]&&JX[id].hw==='mer')modelOf('mer_hd',function(){});});
  at(1400,function(){var el=home();if(!el)return;var h=null;[].forEach.call(el.querySelectorAll('h2'),function(q){if(/Timeline|tiempo/i.test(q.textContent))h=q;});
    glide(h?Math.max(0,h.getBoundingClientRect().top-el.getBoundingClientRect().top+el.scrollTop-36):el.scrollHeight*0.6,1500);});
  at(4300,function(){glide(0,900);});
  at(5500,function(){openMission(mis());});
  /* lanzamiento: cada paso dura poco y avanza solo */
  var iv=setInterval(function(){if(!JR.active)return;var s=JR.segs[JR.si];if(!s)return;
    if(s.launch){JR.segs.forEach(function(q){if(q.launch)q.dur=q.k===0?1.3:1.75;});if(JR.wait)nextSeg();}
    else{clearInterval(iv);after();}},80);
  function after(){
    later(150,function(){var i=seg('viaje');if(i>=0)jumpTo(i);});
    later(3400,function(){var i=seg('hoy');if(i>=0)jumpTo(i);});
    later(5400,function(){var go=document.querySelector('.jr-card .jr-go');if(go)go.click();});
    later(6600,function(){selectPart(1);});
    later(8200,function(){selectPart(0);});
    later(10000,function(){var e=document.createElement('div');e.className='demo-end';var b=document.createElement('b');b.textContent='Still There';var s2=document.createElement('span');
      s2.textContent=lang==='es'?'Las misiones de NASA a través del tiempo':'NASA’s missions across time';e.appendChild(b);e.appendChild(s2);document.body.appendChild(e);requestAnimationFrame(function(){e.classList.add('on');});});
  }
})();
