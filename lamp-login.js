/* ===== ল্যাম্প লগইন: সুতা টানলে আলো জ্বলবে, তারপর লগইন ফর্ম আসবে ===== */
(function(){
  const A=document.getElementById('auth');if(!A)return;
  const ac=A.querySelector('.ac'),box=A.querySelector('.abox');if(!ac||!box)return;

  /* ---------- CSS ---------- */
  const st=document.createElement('style');
  st.textContent=`
  #auth .ac{z-index:1}
  #auth:after{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity .9s;
    background:radial-gradient(520px 440px at 50% 24%,var(--lg),transparent 70%)}
  #auth.lamp-on:after{opacity:1}
  .lamp{position:relative;margin:2px auto 0;max-width:300px;user-select:none;-webkit-user-select:none}
  .lamp svg{display:block;width:100%;height:auto;overflow:visible;touch-action:none}
  .lamp .cone{opacity:0;transition:opacity .7s}
  .lamp.on .cone{opacity:1}
  .lamp .bulb{fill:#4a4430;transition:fill .4s,filter .4s}
  .lamp.on .bulb{fill:var(--lb);filter:drop-shadow(0 0 10px var(--lc))}
  .lamp .rimi{fill:#0e0e13;transition:fill .5s}
  .lamp.on .rimi{fill:var(--lb)}
  .lamp .hit{cursor:grab;outline:none}
  .lamp .hit:active{cursor:grabbing}
  .lhint{color:var(--mu);font-size:14px;margin:-6px 0 14px;transition:opacity .5s}
  .lamp.on+.lhint{opacity:0;height:0;margin:0;overflow:hidden}
  .lamp .dust{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 1s}
  .lamp.on .dust{opacity:1}
  .lamp .dust i{position:absolute;border-radius:50%;background:var(--lc);box-shadow:0 0 6px var(--lc);animation:ldust 5s ease-in-out infinite alternate}
  @keyframes ldust{from{transform:translate(0,0);opacity:.15}to{transform:translate(10px,-16px);opacity:.9}}
  #auth .abox,#auth .pv{transition:opacity .7s .25s,transform .7s .25s,visibility 0s}
  #auth.lamp-off .abox,#auth.lamp-off .pv{opacity:0;transform:translateY(24px);pointer-events:none;visibility:hidden;transition:opacity .35s,transform .35s,visibility 0s .35s}
  /* ---- রঙের থিম ---- */
  #auth{--lc:#ffd778;--lb:#fff1b8;--lg:rgba(255,200,90,.24)}
  #auth[data-theme=up]{--lc:#6ee7b7;--lb:#d1fae5;--lg:rgba(52,211,153,.22);--gold:#6ee7b7;--gold2:#10b981;--line:rgba(52,211,153,.3)}
  #auth[data-theme=g]{--lc:#8ab4ff;--lb:#dbe8ff;--lg:rgba(96,150,255,.24);--gold:#8ab4ff;--gold2:#4285f4;--line:rgba(96,150,255,.32)}
  .lamp svg [stroke="#e6c65c"]{stroke:var(--gold)}
  .lamp svg [fill="#e6c65c"]{fill:var(--gold)}
  .lamp stop[stop-color="#ffd778"]{stop-color:var(--lc)}
  #auth .ac.tfl{animation:lptf .6s ease}
  @keyframes lptf{from{filter:brightness(1.8) saturate(1.4)}to{filter:none}}
  /* ---- রহস্যময় পোর্টাল ---- */
  .portal{position:fixed;inset:0;z-index:9999;background:#04060c;overflow:hidden;animation:lpfade 2.4s ease forwards}
  .portal .pf{position:absolute;width:140%;height:50%;left:-20%;border-radius:50%;filter:blur(40px);opacity:.35;background:radial-gradient(closest-side,var(--c2),transparent);animation:lpfog 4s ease-in-out infinite alternate}
  .portal .pf1{top:10%}.portal .pf2{top:48%;animation-delay:-2s}
  .portal .pw{position:absolute;left:50%;top:44%;width:170px;height:170px;margin:-85px 0 0 -85px;animation:lpgrow 2.2s cubic-bezier(.5,0,.3,1) forwards}
  .portal .pr{position:absolute;inset:0;border-radius:50%}
  .portal .r1{border:2px dashed var(--c1);box-shadow:0 0 28px var(--c1);animation:lpspin 3s linear infinite}
  .portal .r2{inset:16px;border:3px solid transparent;border-top-color:var(--c1);border-bottom-color:var(--c2);animation:lpspin 1.6s linear infinite reverse}
  .portal .po{position:absolute;left:50%;top:44%;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:radial-gradient(circle,#fff,var(--c1) 45%,transparent 70%);animation:lporb 2.2s ease-in forwards}
  .portal i{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--c1);box-shadow:0 0 6px var(--c1);opacity:0;animation:lpup 1.6s ease-out infinite}
  .portal .pt{position:absolute;left:0;right:0;top:66%;text-align:center;color:var(--c1);font-size:15px;animation:lptxt 2.2s ease forwards}
  @keyframes lpfade{0%{opacity:0}12%{opacity:1}78%{opacity:1}100%{opacity:0}}
  @keyframes lpspin{to{transform:rotate(360deg)}}
  @keyframes lpfog{from{transform:translateX(-8%)}to{transform:translateX(8%)}}
  @keyframes lpgrow{0%{transform:scale(.2);opacity:0}25%{opacity:1;transform:scale(1)}70%{transform:scale(1)}100%{transform:scale(8);opacity:0}}
  @keyframes lporb{0%{transform:scale(0)}40%{transform:scale(1)}70%{transform:scale(1.3)}100%{transform:scale(30);opacity:0}}
  @keyframes lpup{0%{transform:translateY(0);opacity:0}30%{opacity:.9}100%{transform:translateY(-120px);opacity:0}}
  @keyframes lptxt{0%,100%{opacity:0;letter-spacing:.6em}30%,75%{opacity:1;letter-spacing:.15em}}
  @media(prefers-reduced-motion:reduce){.lamp .dust i{animation:none}}`;
  document.head.appendChild(st);

  /* ---------- ল্যাম্প ---------- */
  const lamp=document.createElement('div');lamp.className='lamp';
  lamp.innerHTML=`
  <svg viewBox="0 0 300 250" aria-hidden="false">
    <defs>
      <linearGradient id="lgc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd778" stop-opacity=".6"/><stop offset="1" stop-color="#ffd778" stop-opacity="0"/></linearGradient>
      <linearGradient id="lgs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2a33"/><stop offset="1" stop-color="#0d0d12"/></linearGradient>
    </defs>
    <polygon class="cone" points="108,112 192,112 300,250 0,250" fill="url(#lgc)"/>
    <ellipse cx="110" cy="238" rx="46" ry="8" fill="#17171d" stroke="#e6c65c" stroke-opacity=".5"/>
    <polyline points="110,232 78,160 124,92" fill="none" stroke="#2a2a33" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="110" cy="232" r="5" fill="#17171d" stroke="#e6c65c"/><circle cx="78" cy="160" r="5" fill="#17171d" stroke="#e6c65c"/>
    <path d="M108,108 C108,62 126,46 150,46 C174,46 192,62 192,108 Z" fill="url(#lgs)" stroke="#e6c65c" stroke-opacity=".35"/>
    <ellipse class="rimi" cx="150" cy="108" rx="42" ry="6" stroke="#e6c65c" stroke-width="2"/>
    <circle class="bulb" cx="150" cy="111" r="8"/>
    <line id="lstr" x1="176" y1="108" x2="176" y2="168" stroke="#e6c65c" stroke-width="1.6" style="transform-origin:176px 108px"/>
    <g id="lhd"><circle cx="176" cy="176" r="6" fill="#e6c65c"/><circle class="hit" id="lhit" cx="176" cy="176" r="22" fill="transparent" tabindex="0" role="button" aria-label="সুতা টানুন"/></g>
  </svg><div class="dust"></div>`;
  const hint=document.createElement('div');hint.className='lhint';hint.textContent='সুতাটি টেনে আলো জ্বালান ✨';
  ac.insertBefore(lamp,box);ac.insertBefore(hint,box);

  const dust=lamp.querySelector('.dust');
  for(let i=0;i<14;i++){const p=document.createElement('i'),s=2+Math.random()*2;
    p.style.cssText=`left:${20+Math.random()*60}%;top:${50+Math.random()*45}%;width:${s}px;height:${s}px;animation-delay:${(Math.random()*4).toFixed(1)}s;animation-duration:${(4+Math.random()*3).toFixed(1)}s`;
    dust.appendChild(p)}

  /* ---------- অবস্থা ---------- */
  let on=false,ctx=null;
  const click=()=>{try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();
    o.frequency.value=on?1300:900;g.gain.value=.06;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.05);o.stop(ctx.currentTime+.06)}catch(e){}};
  function setOn(v){on=v;lamp.classList.toggle('on',v);A.classList.toggle('lamp-on',v);A.classList.toggle('lamp-off',!v)}
  setOn(false);

  /* ---------- সুতা টানা ---------- */
  const hit=lamp.querySelector('#lhit'),hd=lamp.querySelector('#lhd'),str=lamp.querySelector('#lstr'),svg=lamp.querySelector('svg');
  let drag=false,y0=0,dy=0;
  const setDy=(v,anim)=>{const t=anim?'transform .35s cubic-bezier(.3,1.8,.5,1)':'none';hd.style.transition=str.style.transition=t;
    hd.style.transform=`translateY(${v}px)`;str.style.transform=`scaleY(${(60+v)/60})`};
  hit.addEventListener('pointerdown',e=>{drag=true;y0=e.clientY;dy=0;hit.setPointerCapture(e.pointerId);e.preventDefault()});
  hit.addEventListener('pointermove',e=>{if(!drag)return;const k=300/svg.getBoundingClientRect().width;dy=Math.max(0,Math.min(42,(e.clientY-y0)*k));setDy(dy,false)});
  const release=()=>{if(!drag)return;drag=false;
    if(dy>14){click();setOn(!on);setDy(0,true)}
    else if(dy<3){setDy(24,true);setTimeout(()=>{click();setOn(!on);setDy(0,true)},140)}
    else setDy(0,true)};
  hit.addEventListener('pointerup',release);hit.addEventListener('pointercancel',release);
  hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();click();setOn(!on)}});

  /* ---------- রঙের থিম: Sign in / Create account / Google ---------- */
  const THEMES={in:['#e6c65c','#b8912a'],up:['#6ee7b7','#10b981'],g:['#8ab4ff','#4285f4']};
  let theme='in';
  function setTheme(t){theme=t;A.dataset.theme=t;ac.classList.remove('tfl');void ac.offsetWidth;ac.classList.add('tfl')}
  A.dataset.theme='in';
  document.querySelectorAll('#auth .tg button').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.m)));
  const gg=document.getElementById('gg');if(gg)gg.addEventListener('click',()=>setTheme('g'));

  /* ---------- লগইনের পর যাচাইয়ের পথে পোর্টাল অ্যানিমেশন ---------- */
  function portal(){
    if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const c=THEMES[theme]||THEMES.in,o=document.createElement('div');o.className='portal';
    o.style.setProperty('--c1',c[0]);o.style.setProperty('--c2',c[1]);
    let ps='';for(let i=0;i<18;i++)ps+=`<i style="left:${10+Math.random()*80}%;top:${55+Math.random()*35}%;animation-delay:${(Math.random()*1.2).toFixed(2)}s"></i>`;
    o.innerHTML=`<div class="pf pf1"></div><div class="pf pf2"></div>${ps}<div class="pw"><div class="pr r1"></div><div class="pr r2"></div></div><div class="po"></div><div class="pt">পরিচয় যাচাইয়ের দরজা খুলছে…</div>`;
    document.body.appendChild(o);setTimeout(()=>o.remove(),2500);
  }

  /* ---------- লগআউট করলে আবার বন্ধ ল্যাম্প ---------- */
  let last=A.style.display;
  new MutationObserver(()=>{const d=A.style.display;if(d!==last){if(d==='none'&&on)portal();if(d!=='none'){setOn(false);setTheme('in')}last=d}}).observe(A,{attributes:true,attributeFilter:['style']});

  /* ---------- লোকালে দেখতে: index.html?lamp ---------- */
  if(/[?&]lamp/.test(location.search)){A.classList.remove('ld');A.style.display='flex';last=A.style.display}
})();