/* ---------- videos reales de los lanzamientos (NASA Image and Video Library) ----------
   VIDEOS se llena en 46-videos-data.js: {id: {f, nasa_id, credit, cap:{es,en}}}. Los clips son recortes cortos,
   hechos con ffmpeg a partir de los archivos de NASA, alrededor del despegue. */
var VIDEOS=typeof VIDEOS_DATA!=='undefined'?VIDEOS_DATA:{};
var VD_STR={es:{btn:'▶ Video real del lanzamiento',credit:'Video: ',orig:'ver el original en NASA'},en:{btn:'▶ Real launch video',credit:'Video: ',orig:'see the original at NASA'}};
var vdEl=add(stage,'div','ph-box vd-box');vdEl.hidden=true;vdEl.setAttribute('role','dialog');vdEl.setAttribute('aria-modal','true');
vdEl.innerHTML='<figure><video controls playsinline preload="metadata"></video><figcaption><span class="ph-cap"></span><span class="ph-cr"></span></figcaption></figure><button class="ph-x" type="button">×</button>';
var VD={back:null};
function openVideo(id){var v=VIDEOS[id];if(!v)return;VD.back=document.activeElement;var S=VD_STR[lang],vid=vdEl.querySelector('video');
  vid.src=v.f;vdEl.querySelector('.ph-cap').textContent=v.cap[lang];var cr=vdEl.querySelector('.ph-cr');cr.innerHTML='';
  cr.appendChild(document.createTextNode(S.credit+v.credit+' · '));var a=add(cr,'a','');a.href='https://images.nasa.gov/details/'+encodeURIComponent(v.nasa_id);a.target='_blank';a.rel='noopener';a.textContent=S.orig;
  vdEl.hidden=false;try{vid.currentTime=0;vid.play().catch(function(){});}catch(e){}vdEl.querySelector('.ph-x').focus();}
function closeVideo(){var vid=vdEl.querySelector('video');try{vid.pause();}catch(e){}vdEl.hidden=true;if(VD.back&&VD.back.focus)VD.back.focus();}
vdEl.querySelector('.ph-x').addEventListener('click',closeVideo);
vdEl.addEventListener('click',function(e){if(e.target===vdEl)closeVideo();});
document.addEventListener('keydown',function(e){if(!vdEl.hidden&&e.key==='Escape'){e.stopImmediatePropagation();closeVideo();}},true);
/* botón en la tarjeta de Hoy */
function videoButton(c,m){if(!VIDEOS[m.id])return;var b=add(c,'button','jr-btn jr-vid');b.type='button';b.textContent=VD_STR[lang].btn;b.addEventListener('click',function(){openVideo(m.id);});}
/* y al final de la transmisión animada del lanzamiento */
var lvVid=document.createElement('button');lvVid.type='button';lvVid.className='start lv-vid';
(function(){var end=$('#lvEnd');if(end)end.insertBefore(lvVid,$('#lvBack'));})();
lvVid.addEventListener('click',function(){if(live)openVideo(live.id);});
function vdTexts(){lvVid.textContent=VD_STR[lang].btn;lvVid.hidden=!(live&&VIDEOS[live.id]);}
setInterval(function(){if(live)vdTexts();},500);
(function(){var st=document.createElement('style');st.textContent=
'.vd-box video{max-width:min(1000px,100%);max-height:calc(100vh - 200px);border-radius:6px;background:#000}'+
'.jr-vid{justify-self:start}.lv-vid[hidden]{display:none}';
document.head.appendChild(st);})();
