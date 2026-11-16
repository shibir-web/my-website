/* ===== Explore বাটনে জ্বলজ্বলে কাচের মতো আলোর ঝলক ===== */
(function(){
  const b=document.querySelector('#home a.btn[href="#about"]')||[...document.querySelectorAll('a.btn')].find(a=>/explore/i.test(a.textContent));
  if(!b)return;
  const st=document.createElement('style');
  st.textContent=`
  @property --ga{syntax:'<angle>';initial-value:0deg;inherits:false}
  a.btn.glow-btn{position:relative;isolation:isolate;display:inline-block;padding:16px 48px;border-radius:99px;
    background:transparent!important;box-shadow:none!important;color:#fff3c4;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
    transition:transform .3s;animation:gtxt 2.4s ease-in-out infinite alternate}
  a.btn.glow-btn::before{content:"";position:absolute;inset:-2px;border-radius:inherit;z-index:-2;
    background:conic-gradient(from var(--ga),transparent 0 58%,#b8912a 76%,#fff3c4 92%,transparent 100%);
    filter:drop-shadow(0 0 10px rgba(230,198,92,.7));animation:gspin 3s linear infinite}
  a.btn.glow-btn::after{content:"";position:absolute;inset:0;border-radius:inherit;z-index:-1;
    background:linear-gradient(180deg,#1d212c,#07080d);
    box-shadow:inset 0 1px 0 rgb(31, 222, 225),inset 0 -8px 18px rgba(241, 6, 6, 0.84)}
  a.btn.glow-btn:hover::before{animation-duration:1.4s}
  a.btn.glow-btn:active{transform:scale(.96)}
  @keyframes gspin{to{--ga:360deg}}
  @keyframes gtxt{from{text-shadow:0 0 6px rgba(255,226,140,.5),0 0 14px rgba(46, 212, 13, 0.85)}to{text-shadow:0 0 10px rgba(255,226,140,.95),0 0 24px rgba(230,198,92,.7)}}
  @media(prefers-reduced-motion:reduce){a.btn.glow-btn,a.btn.glow-btn::before{animation:none}}`;
  document.head.appendChild(st);
  b.classList.add('glow-btn');
})();