/* ---------- portada: los cohetes de la tira se dibujan con sus modelos 3D reales, todos a la misma escala ----------
   La portada arranca con siluetas simples (no espera a nada). Cuando three.js ya está andando, cada silueta se
   reemplaza por una imagen del mismo modelo 3D que se usa en el lanzamiento: los de NASA (Delta II, Atlas V) o los
   armados en código (Saturn V, Titan IIIE, Atlas-Centaur). Si algo falla, queda la silueta. */
(function(){
  if(typeof buildRocket3D!=='function')return;
  var figs=[].slice.call(document.querySelectorAll('.hm-rkfig[data-rk]'));if(!figs.length)return;
  function shot(R,px){
    var root=R.root;root.updateMatrixWorld(true);
    var bb=new THREE.Box3().setFromObject(root),sz=bb.getSize(new THREE.Vector3()),c=bb.getCenter(new THREE.Vector3());
    var hM=sz.y*1.03,wM=Math.max(sz.x,sz.z)*1.12,Hp=Math.max(60,Math.round(px*3)),Wp=Math.max(24,Math.round(Hp*wM/hM));
    var sc=new THREE.Scene(),cam=new THREE.OrthographicCamera(-wM/2,wM/2,hM/2,-hM/2,1,2000),dir=new THREE.Vector3(Math.cos(0.9),0.06,Math.sin(0.9)).normalize();
    cam.position.copy(c).addScaledVector(dir,600);cam.lookAt(c);
    if(!LX.sunL)LX.sunL=new THREE.Vector3(0.55,0.62,0.56).normalize();
    var env=lxEnvMake(1,false);sc.environment=env.texture;
    var sun=new THREE.DirectionalLight(0xfff4e6,2.2);sun.position.set(0.9,0.8,0.5);sc.add(sun);sc.add(new THREE.HemisphereLight(0xcfe0ff,0x555049,0.35));sc.add(root);
    var rt=new THREE.WebGLRenderTarget(Wp,Hp);rt.texture.encoding=THREE.sRGBEncoding;
    var oc=renderer.getClearColor(new THREE.Color()),oa=renderer.getClearAlpha(),otm=renderer.toneMapping,oex=renderer.toneMappingExposure,oau=renderer.autoClear;
    renderer.setRenderTarget(rt);renderer.autoClear=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.setClearColor(0x000000,0);renderer.clear();renderer.render(sc,cam);
    var buf=new Uint8Array(Wp*Hp*4);renderer.readRenderTargetPixels(rt,0,0,Wp,Hp,buf);
    renderer.setRenderTarget(null);renderer.setClearColor(oc,oa);renderer.toneMapping=otm;renderer.toneMappingExposure=oex;renderer.autoClear=oau;rt.dispose();env.dispose();
    var cv=document.createElement('canvas');cv.width=Wp;cv.height=Hp;var x=cv.getContext('2d'),im=x.createImageData(Wp,Hp),row=Wp*4;
    for(var y=0;y<Hp;y++)im.data.set(buf.subarray((Hp-1-y)*row,(Hp-y)*row),y*row);
    x.putImageData(im,0,0);return {url:cv.toDataURL('image/png'),w:Math.round(px*wM/hM)};
  }
  function put(fig,R){
    try{var px=+fig.getAttribute('data-px')||Math.round((+fig.getAttribute('data-ppm')||1.5)*R.height),s=shot(R,px),img=new Image();img.alt='';img.decoding='async';img.style.height=px+'px';img.style.width=s.w+'px';img.style.display='block';img.style.flex='none';
      img.onload=function(){fig.innerHTML='';fig.appendChild(img);};img.src=s.url;}catch(e){}
  }
  function one(i){
    if(i>=figs.length)return;var fig=figs[i],key=fig.getAttribute('data-rk'),glb=typeof ROCKET_GLB!=='undefined'&&ROCKET_GLB[key],next=function(){setTimeout(function(){one(i+1);},120);};
    try{
      if(glb){modelOf(glb,function(sc){var R=null;try{R=nasaRocket(key,sc);}catch(e){}if(R)put(fig,R);next();});}
      else{put(fig,buildRocket3D(key));next();}
    }catch(e){next();}
  }
  var tries=0,iv=setInterval(function(){tries++;if(typeof renderer!=='undefined'&&renderer&&THREE.GLTFLoader){clearInterval(iv);setTimeout(function(){one(0);},900);}else if(tries>60)clearInterval(iv);},500);
})();
