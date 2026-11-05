/*!
 * urinary.js - Urinary System : interactive layer for <model-viewer> (Anatomy & Physiology page)
 * Works with URINARY.glb . No setup needed: it finds the model-viewer by itself
 * when the system is opened, and adds: tap-to-select details card, part dropdown,
 * auto-rotate, reset, processes, 12 steps and an 8-second animation.
 * Material names inside the GLB = keys of CFG.parts below.
 */
(function () {
  'use strict';
  var CFG = {"id":"urinary","file":"urinary.js","glb":"URINARY.glb","title":"Urinary System / মূত্রতন্ত্র","hint":"যেকোনো অংশে ট্যাপ করো বা ড্রপডাউন থেকে বেছে নাও","stepsTitle":"Urine journey - 12 steps / প্রস্রাব তৈরির ১২ ধাপ","animHint":"হলুদ বলটি রেনাল আর্টারি থেকে শুরু করে ইউরেথ্রা দিয়ে বেরিয়ে যাচ্ছে (বাম কিডনি)","parts":{"KIDNEY_CORTEX":{"en":"Renal Cortex","bn":"বৃক্কের কর্টেক্স (বাইরের স্তর)","cat":"Kidney / বৃক্ক","bnText":"কিডনির বাইরের স্তর। এখানে গ্লোমেরুলাস ও বাউম্যান ক্যাপসুল থাকে, রক্ত ছাঁকার (filtration) কাজ শুরু হয় এখানেই।","enText":"The outer layer of the kidney. It contains the renal corpuscles (glomerulus + Bowman's capsule), the proximal and distal convoluted tubules, and the renal columns that dip between the pyramids. Blood filtration starts here.","c":[0.0,0.475,-0.12],"s":[2.447,1.292,0.479]},"RENAL_MEDULLA":{"en":"Renal Medulla (Pyramids)","bn":"বৃক্কের মেডুলা (পিরামিড)","cat":"Kidney / বৃক্ক","bnText":"ভেতরের কোণাকার পিরামিডগুলো। লুপ অব হেনলে ও কালেক্টিং ডাক্ট এখানে থাকে; প্রস্রাব ঘন করে ক্যালিক্সে পাঠায়।","enText":"The inner region made of 8-18 cone-shaped renal pyramids. They hold the loops of Henle, collecting ducts and vasa recta. The tip of each pyramid (renal papilla) drains urine into a minor calyx.","c":[0.0,0.483,-0.12],"s":[2.169,0.8,0.371]},"RENAL_PELVIS":{"en":"Calyces & Renal Pelvis","bn":"ক্যালিক্স ও রেনাল পেলভিস","cat":"Urinary tract / মূত্রপথ","bnText":"প্যাপিলা থেকে প্রস্রাব মাইনর-মেজর ক্যালিক্স হয়ে ফানেল আকৃতির রেনাল পেলভিসে জমে, তারপর ইউরেটারে যায়।","enText":"Minor calyces collect urine from the papillae and join to form 2-3 major calyces, which unite into the funnel-shaped renal pelvis. The pelvis continues as the ureter at the pelvi-ureteric junction (PUJ).","c":[0.0,0.436,-0.135],"s":[1.795,0.486,0.2]},"URETER":{"en":"Ureter","bn":"ইউরেটার (মূত্রনালি)","cat":"Urinary tract / মূত্রপথ","bnText":"কিডনি থেকে ব্লাডারে প্রস্রাব নেওয়া পেশিবহুল নল (প্রায় ২৫–৩০ সেমি); পেরিস্টালসিস তরঙ্গে প্রস্রাব ঠেলে দেয়।","enText":"A muscular tube that carries urine from the renal pelvis to the bladder using peristaltic waves, not gravity alone. It enters the bladder wall obliquely, which acts like a valve and prevents backflow (vesico-ureteric reflux).","c":[-0.0,-1.429,-0.09],"s":[1.32,3.574,0.24]},"BLADDER_WALL":{"en":"Urinary Bladder (Wall)","bn":"মূত্রথলি (ইউরিনারি ব্লাডার)","cat":"Urinary tract / মূত্রপথ","bnText":"প্রস্রাব জমা রাখার পেশিবহুল থলি। দেয়ালে ডিট্রুসার পেশি আছে; ধারণক্ষমতা প্রায় ৪০০–৬০০ মিলি।","enText":"A hollow, distensible muscular organ in the pelvis that stores urine. Its wall is made of the detrusor muscle (smooth muscle) lined by transitional epithelium, which stretches as the bladder fills.","c":[0.0,-2.9,0.15],"s":[0.999,0.84,0.839]},"BLADDER_URINE":{"en":"Urine (stored)","bn":"জমে থাকা প্রস্রাব","cat":"Urinary tract / মূত্রপথ","bnText":"প্রস্রাবের প্রায় ৯৫% পানি, বাকি ইউরিয়া, ক্রিয়েটিনিন ও লবণ। দিনে প্রায় ১–২ লিটার তৈরি হয়।","enText":"Urine is about 95% water with urea, creatinine, uric acid and salts. Its yellow colour comes from urochrome. The model volume rises and falls in the animation to show filling and emptying.","c":[0.0,-2.93,0.15],"s":[0.878,0.739,0.737]},"TRIGONE":{"en":"Trigone","bn":"ট্রাইগোন","cat":"Urinary tract / মূত্রপথ","bnText":"ব্লাডারের তলায় ত্রিভুজাকার মসৃণ অংশ; দুই ইউরেটারের মুখ আর ইউরেথ্রার মুখ এর তিন কোণ।","enText":"A smooth triangular area on the floor of the bladder, bounded by the two ureteric openings and the internal urethral opening. It has no rugae (folds), so it does not stretch like the rest of the bladder.","c":[0.0,-3.255,0.05],"s":[0.473,0.108,0.242]},"URETHRA":{"en":"Urethra","bn":"ইউরেথ্রা (মূত্রনালি)","cat":"Urinary tract / মূত্রপথ","bnText":"ব্লাডার থেকে প্রস্রাব বাইরে নেওয়ার নল। মহিলাদের প্রায় ৪ সেমি, পুরুষদের প্রায় ১৮–২০ সেমি।","enText":"The tube that carries urine from the bladder to the outside of the body. In males it also carries semen and is much longer than in females.","c":[0.0,-3.861,0.297],"s":[0.09,1.125,0.381]},"INTERNAL_SPHINCTER":{"en":"Internal Urethral Sphincter","bn":"অভ্যন্তরীণ স্ফিংটার","cat":"Sphincter / স্ফিংটার","bnText":"ব্লাডারের গলায় অনৈচ্ছিক মসৃণ পেশির বলয়; প্রস্রাব জমানোর সময় বন্ধ থাকে।","enText":"A ring of smooth muscle at the bladder neck. It is involuntary (autonomic control) and stays closed during storage. In males it also helps prevent retrograde ejaculation.","c":[0.0,-3.36,0.152],"s":[0.21,0.058,0.21]},"EXTERNAL_SPHINCTER":{"en":"External Urethral Sphincter","bn":"বহিঃস্থ স্ফিংটার","cat":"Sphincter / স্ফিংটার","bnText":"ইউরেথ্রা ঘিরে থাকা ঐচ্ছিক কঙ্কালপেশি; ইচ্ছামতো প্রস্রাব আটকে রাখা বা ছাড়া যায় (পুডেন্ডাল নার্ভ)।","enText":"A ring of skeletal muscle around the urethra in the urogenital diaphragm. It is under voluntary control, so a person can delay urination until a suitable time.","c":[0.0,-3.8,0.19],"s":[0.196,0.055,0.196]},"ADRENAL_GLAND":{"en":"Adrenal (Suprarenal) Gland","bn":"অ্যাড্রিনাল গ্রন্থি","cat":"Endocrine / অন্তঃক্ষরা","bnText":"কিডনির মাথায় বসা গ্রন্থি; অ্যাডরেনালিন ও কর্টিসল তৈরি করে। এটি আসলে অন্তঃক্ষরা তন্ত্রের অংশ।","enText":"Sits on top of each kidney but belongs to the endocrine system, not the urinary system. The cortex makes aldosterone, cortisol and androgens; the medulla makes adrenaline and noradrenaline.","c":[0.0,1.075,-0.16],"s":[1.798,0.24,0.179]},"AORTA":{"en":"Abdominal Aorta","bn":"অ্যাবডোমিনাল অ্যাওর্টা","cat":"Blood vessel / রক্তনালি","bnText":"পেটের প্রধান ধমনি; এর শাখা রেনাল আর্টারি L1–L2 স্তরে কিডনিতে রক্ত পৌঁছায়।","enText":"The main artery of the abdomen. The renal arteries branch from it at about the L1-L2 level. At the lower end it divides into the two common iliac arteries.","c":[0.062,-0.29,-0.12],"s":[1.229,4.379,0.187]},"IVC":{"en":"Inferior Vena Cava (IVC)","bn":"ইনফেরিয়র ভেনা ক্যাভা","cat":"Blood vessel / রক্তনালি","bnText":"নিচের শরীরের রক্ত হৃৎপিণ্ডে ফেরত আনা বড় শিরা; রেনাল ভেইন এতে এসে মেশে।","enText":"The large vein that returns blood from the lower body to the heart. The renal veins drain the filtered blood from the kidneys into it.","c":[-0.08,-0.315,-0.12],"s":[1.328,4.429,0.227]},"RENAL_ARTERY":{"en":"Renal Artery","bn":"রেনাল আর্টারি (বৃক্কীয় ধমনি)","cat":"Blood vessel / রক্তনালি","bnText":"অ্যাওর্টা থেকে কিডনিতে রক্ত আনে; হৃৎপিণ্ডের রক্তের প্রায় ২০–২৫% কিডনিতে যায়।","enText":"Brings blood from the aorta to the kidney. Inside the kidney it divides: segmental -> interlobar -> arcuate -> interlobular arteries -> afferent arteriole -> glomerulus.","c":[-0.001,0.59,-0.231],"s":[1.155,0.502,0.291]},"RENAL_VEIN":{"en":"Renal Vein","bn":"রেনাল ভেইন (বৃক্কীয় শিরা)","cat":"Blood vessel / রক্তনালি","bnText":"ছাঁকা রক্ত কিডনি থেকে IVC-তে নিয়ে যায়। বাম রেনাল ভেইন লম্বা এবং অ্যাওর্টার সামনে দিয়ে যায়।","enText":"Carries filtered blood from the kidney to the inferior vena cava. The left renal vein is longer and crosses in front of the aorta.","c":[-0.007,0.415,-0.032],"s":[1.179,0.296,0.257]}},"order":["KIDNEY_CORTEX","RENAL_MEDULLA","RENAL_PELVIS","URETER","BLADDER_WALL","BLADDER_URINE","TRIGONE","URETHRA","INTERNAL_SPHINCTER","EXTERNAL_SPHINCTER","ADRENAL_GLAND","AORTA","IVC","RENAL_ARTERY","RENAL_VEIN"],"steps":[{"title":"Step 1 - Renal artery","parts":["RENAL_ARTERY","AORTA"],"enText":"About 20-25% of cardiac output flows through the renal arteries. Blood carrying urea and other wastes enters the kidney.","bnText":"রেনাল আর্টারি দিয়ে ইউরিয়া-সহ রক্ত কিডনিতে ঢোকে (হৃৎপিণ্ডের রক্তের প্রায় ২০–২৫%)।"},{"title":"Step 2 - Afferent arteriole to glomerulus","parts":["KIDNEY_CORTEX"],"enText":"Branches of the renal artery end in afferent arterioles that feed a tuft of capillaries called the glomerulus inside the cortex.","bnText":"রেনাল আর্টারির শাখা অ্যাফারেন্ট আর্টারিওল হয়ে কর্টেক্সের গ্লোমেরুলাসে পৌঁছায়।"},{"title":"Step 3 - Glomerular filtration","parts":["KIDNEY_CORTEX"],"enText":"High pressure forces plasma (without cells and big proteins) into Bowman's capsule. This fluid is the glomerular filtrate.","bnText":"চাপের কারণে পানি, গ্লুকোজ, লবণ ও ইউরিয়া গ্লোমেরুলাস থেকে বাউম্যান ক্যাপসুলে ছেঁকে আসে; একে ফিল্ট্রেট বলে।"},{"title":"Step 4 - Proximal convoluted tubule","parts":["KIDNEY_CORTEX"],"enText":"About 65% of water and sodium and all glucose and amino acids are reabsorbed back into the blood here.","bnText":"প্রক্সিমাল টিউবিউলে প্রায় ৬৫% পানি-সোডিয়াম এবং সব গ্লুকোজ ও অ্যামিনো অ্যাসিড রক্তে ফেরত যায়।"},{"title":"Step 5 - Loop of Henle","parts":["RENAL_MEDULLA"],"enText":"The descending limb loses water; the ascending limb pumps out salt. This countercurrent system builds the medullary concentration gradient.","bnText":"লুপ অব হেনলে মেডুলায় ঘনত্বের ঢাল তৈরি করে (কাউন্টারকারেন্ট ব্যবস্থা)।"},{"title":"Step 6 - Distal tubule & renal vein","parts":["KIDNEY_CORTEX","RENAL_VEIN"],"enText":"Fine-tuning by secretion and reabsorption (aldosterone). The cleaned blood leaves the kidney through the renal vein to the IVC.","bnText":"ডিস্টাল টিউবিউলে সূক্ষ্ম সমন্বয় হয়; পরিষ্কার রক্ত রেনাল ভেইন দিয়ে IVC-তে ফেরে।"},{"title":"Step 7 - Collecting duct","parts":["RENAL_MEDULLA"],"enText":"ADH makes the collecting duct permeable to water, so more water returns to the blood and urine becomes concentrated.","bnText":"ADH-এর প্রভাবে কালেক্টিং ডাক্টে আরও পানি ফেরত যায়, ফলে প্রস্রাব ঘন হয়।"},{"title":"Step 8 - Papilla to calyces","parts":["RENAL_PELVIS","RENAL_MEDULLA"],"enText":"Urine leaves the papilla of each pyramid and drains into minor calyces, then major calyces.","bnText":"প্যাপিলা থেকে প্রস্রাব মাইনর ক্যালিক্স, তারপর মেজর ক্যালিক্সে পড়ে।"},{"title":"Step 9 - Renal pelvis","parts":["RENAL_PELVIS"],"enText":"The major calyces unite in the renal pelvis, which narrows into the ureter at the pelvi-ureteric junction.","bnText":"মেজর ক্যালিক্সগুলো মিলে রেনাল পেলভিস হয়, যা ইউরেটারে গিয়ে মেশে।"},{"title":"Step 10 - Ureter","parts":["URETER"],"enText":"Waves of peristalsis (about 1-5 per minute) push small amounts of urine down each ureter to the bladder.","bnText":"পেরিস্টালসিস তরঙ্গে প্রস্রাব ইউরেটার বেয়ে নামে।"},{"title":"Step 11 - Bladder storage","parts":["BLADDER_WALL","BLADDER_URINE","TRIGONE"],"enText":"The detrusor relaxes and the bladder fills. Stretch receptors signal fullness at about 200-300 mL.","bnText":"ব্লাডার ভরতে থাকে; ২০০–৩০০ মিলিতে প্রস্রাবের বেগ আসে।"},{"title":"Step 12 - Micturition","parts":["INTERNAL_SPHINCTER","EXTERNAL_SPHINCTER","URETHRA","BLADDER_WALL"],"enText":"The detrusor contracts, the internal sphincter opens, and the voluntary external sphincter relaxes. Urine flows out through the urethra.","bnText":"ডিট্রুসার সংকুচিত হয়, স্ফিংটার শিথিল হয় এবং প্রস্রাব ইউরেথ্রা দিয়ে বেরিয়ে যায়।"}],"processes":[{"name":"1. Filtration","parts":["KIDNEY_CORTEX","RENAL_ARTERY"],"enText":"In the glomerulus, blood pressure pushes water, glucose, amino acids, salts and urea through the filtration membrane into Bowman's capsule. Blood cells and large proteins stay in the blood. GFR is about 125 mL/min.","bn":"","bnText":"গ্লোমেরুলাসে রক্তচাপে পানি ও ছোট অণু বাউম্যান ক্যাপসুলে ছেঁকে যায়; GFR প্রায় ১২৫ মিলি/মিনিট।"},{"name":"2. Tubular reabsorption","parts":["KIDNEY_CORTEX","RENAL_MEDULLA"],"enText":"About 65% of water and Na+ plus all glucose and amino acids are reabsorbed in the proximal convoluted tubule. The loop of Henle and collecting duct then reabsorb more water, so urine becomes concentrated.","bn":"","bnText":"প্রয়োজনীয় পানি, গ্লুকোজ, অ্যামিনো অ্যাসিড ও লবণ টিউবিউল থেকে রক্তে ফেরত যায়।"},{"name":"3. Tubular secretion","parts":["KIDNEY_CORTEX","RENAL_VEIN"],"enText":"Substances such as H+, K+, creatinine, ammonia and many drugs move from the blood into the tubule, mainly in the distal convoluted tubule. This fine-tunes blood pH and potassium level.","bn":"","bnText":"H⁺, K⁺, ক্রিয়েটিনিন ও ওষুধ রক্ত থেকে টিউবিউলে যোগ হয়; এতে রক্তের pH ঠিক থাকে।"},{"name":"4. Excretion (micturition)","parts":["RENAL_PELVIS","URETER","BLADDER_WALL","URETHRA","INTERNAL_SPHINCTER","EXTERNAL_SPHINCTER"],"enText":"Urine passes collecting duct -> calyces -> renal pelvis -> ureter -> bladder -> urethra. Stretch receptors trigger the micturition reflex; the sphincters relax and the detrusor contracts to empty the bladder.","bn":"","bnText":"প্রস্রাব নালি বেয়ে ব্লাডারে জমে এবং মাইকচুরিশন রিফ্লেক্সে বেরিয়ে যায়।"}],"anim":{"name":"FLOW","duration":8,"segs":[{"end":0.9,"keys":["RENAL_ARTERY","AORTA"],"en":"Blood enters the kidney through the renal artery.","bn":"রেনাল আর্টারি দিয়ে রক্ত কিডনিতে ঢোকে।"},{"end":2.1,"keys":["KIDNEY_CORTEX"],"en":"Filtration: water and small solutes leave the glomerulus and enter the nephron.","bn":"ফিল্ট্রেশন: গ্লোমেরুলাস থেকে পানি ও ছোট অণু নেফ্রনে ছেঁকে যায়।"},{"end":3.0,"keys":["RENAL_MEDULLA"],"en":"Loop of Henle and collecting duct: water is reabsorbed and urine is concentrated.","bn":"লুপ অব হেনলে ও কালেক্টিং ডাক্টে পানি ফেরে, প্রস্রাব ঘন হয়।"},{"end":3.8,"keys":["RENAL_PELVIS"],"en":"Urine drains through the calyces into the renal pelvis.","bn":"ক্যালিক্স হয়ে প্রস্রাব রেনাল পেলভিসে জমে।"},{"end":5.6,"keys":["URETER"],"en":"Peristaltic waves push urine down the ureter to the bladder.","bn":"পেরিস্টালসিসে প্রস্রাব ইউরেটার বেয়ে ব্লাডারে নামে।"},{"end":7.0,"keys":["BLADDER_WALL","BLADDER_URINE","TRIGONE"],"en":"Urine is stored in the bladder (capacity about 400-600 mL).","bn":"ব্লাডারে প্রস্রাব জমে (ধারণক্ষমতা ৪০০–৬০০ মিলি)।"},{"end":8.0,"keys":["URETHRA","INTERNAL_SPHINCTER","EXTERNAL_SPHINCTER"],"en":"Micturition: the sphincters relax and urine leaves through the urethra.","bn":"মাইকচুরিশন: স্ফিংটার শিথিল হয়ে প্রস্রাব ইউরেথ্রা দিয়ে বেরোয়।"}]}};

  /* ------------------------------------------------------------- CSS */
  function addCss() {
    if (document.getElementById('gx-css')) return;
    var s = document.createElement('style'); s.id = 'gx-css';
    s.textContent = [
      '.gx{border-top:1px solid var(--line,rgba(212,175,55,.25));background:rgba(5,7,13,.7);padding:14px 16px 14px;color:var(--tx,#eef1f8)}',
      '.gx-t{color:var(--gold,#e6c65c);font-size:22px;font-weight:700;line-height:1.3}',
      '.gx-b{font-size:17px;font-weight:600;margin-top:2px}',
      '.gx-pill{display:inline-block;margin:8px 0;padding:3px 14px;border-radius:99px;border:1px solid var(--gold,#e6c65c);color:var(--gold,#e6c65c);font-size:13px;font-weight:600}',
      '.gx-d{font-size:15px;line-height:1.65}',
      '.gx-e{font-size:13px;color:var(--mu,#9aa6c2);margin-top:6px;line-height:1.55}',
      '.gx-row{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap}',
      '.gx-sel{flex:1;min-width:150px;padding:11px 10px;border-radius:12px;border:1px solid var(--gold,#e6c65c);background:#10245a;color:#fff;font-size:15px;font-weight:600;font-family:inherit}',
      '.gx-btn{padding:11px 14px;border-radius:12px;border:1px solid var(--gold,#e6c65c);background:#10245a;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit}',
      '.gx-btn.on{background:var(--gold,#e6c65c);color:#1a1300}',
      '.gx-sec{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mu,#9aa6c2);margin:16px 0 6px}',
      '.gx-chips{display:flex;flex-wrap:wrap;gap:6px}',
      '.gx-chip{padding:7px 12px;border-radius:99px;border:1px solid var(--line,rgba(212,175,55,.35));background:var(--card,#111a30);color:var(--tx,#eef1f8);font-size:13px;cursor:pointer;font-family:inherit}',
      '.gx-chip.on{background:var(--gold,#e6c65c);color:#1a1300}',
      '.gx-step{display:flex;align-items:center;gap:8px}',
      '.gx-step span{flex:1;text-align:center;font-weight:600;font-size:14px}',
      '.gx-cap{margin-top:10px;min-height:22px;color:var(--gold,#e6c65c);font-size:14px;line-height:1.5}',
      '.gx-msg{margin-top:8px;font-size:13px;color:#ffb4a8}'
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------- helpers */
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function keyOf(name) {
    if (!name) return null;
    var cands = [name, name.replace(/\.\d+$/, ''), name.replace(/_\d+$/, ''), name.replace(/_(L|R)$/, '')];
    for (var i = 0; i < cands.length; i++) { var k = cands[i].toUpperCase(); if (CFG.parts[k]) return k; }
    return null;
  }

  /* ---------------------------------------------------------- enhance */
  function enhance(mv) {
    var box = mv.parentElement;
    var root = document.createElement('div'); root.className = 'gx';
    root.innerHTML =
      '<div class="gx-card"><div class="gx-t"></div><div class="gx-b"></div><div class="gx-pill" style="display:none"></div><div class="gx-d"></div><div class="gx-e"></div></div>' +
      '<div class="gx-row"><select class="gx-sel"></select><button class="gx-btn gx-rot">&#9654; ঘুরুক</button><button class="gx-btn gx-rst">&#8635; রিসেট</button></div>' +
      '<div class="gx-sec">Processes / প্রক্রিয়া</div><div class="gx-chips gx-procs"></div>' +
      '<div class="gx-sec">' + esc(CFG.stepsTitle) + '</div>' +
      '<div class="gx-step"><button class="gx-btn gx-prev">&#9664;</button><span class="gx-sno">-</span><button class="gx-btn gx-next">&#9654;</button></div>' +
      '<div class="gx-sec">Animation / অ্যানিমেশন (' + CFG.anim.duration + ' s)</div>' +
      '<div class="gx-row" style="margin-top:0"><button class="gx-btn gx-play">&#9654; অ্যানিমেশন চালু</button></div>' +
      '<div class="gx-cap"></div><div class="gx-msg"></div>';
    var help = box.querySelector('.model-help');
    if (help && help.insertAdjacentElement) help.insertAdjacentElement('afterend', root); else box.appendChild(root);
    var q = function (s) { return root.querySelector(s); };
    var T = q('.gx-t'), B = q('.gx-b'), P = q('.gx-pill'), D = q('.gx-d'), E = q('.gx-e');
    var sel = q('.gx-sel'), rotB = q('.gx-rot'), playB = q('.gx-play'), sno = q('.gx-sno'), cap = q('.gx-cap'), msgEl = q('.gx-msg');

    function msg(t) { msgEl.textContent = t || ''; if (t) setTimeout(function () { if (msgEl.textContent === t) msgEl.textContent = ''; }, 4000); }
    function card(t, b, pill, d, e) {
      T.textContent = t || ''; B.textContent = b || ''; D.textContent = d || ''; E.textContent = e || '';
      P.style.display = pill ? '' : 'none'; P.textContent = pill || '';
    }
    function home() { card(CFG.title, CFG.hint, '', '', ''); }
    home();

    sel.innerHTML = '<option value="">- অংশ বেছে নিন / Choose a part -</option>' +
      CFG.order.map(function (k) { return '<option value="' + k + '">' + esc(CFG.parts[k].en) + '</option>'; }).join('');

    /* ---- highlight via material colours ---- */
    var mats = null, orig = [];
    function ensure() {
      if (mats) return true;
      if (!mv.model || !mv.model.materials) { msg('মডেল লোড হচ্ছে, একটু অপেক্ষা করো…'); return false; }
      mats = mv.model.materials;
      mats.forEach(function (m, i) {
        try { orig[i] = { c: m.pbrMetallicRoughness.baseColorFactor.slice(), e: (m.emissiveFactor || [0, 0, 0]).slice() }; } catch (e) { orig[i] = null; }
      });
      return true;
    }
    function highlight(keys) {
      if (!ensure()) return;
      mats.forEach(function (m, i) {
        var o = orig[i]; if (!o) return;
        var on = keys && keys.indexOf(keyOf(m.name)) >= 0;
        try {
          if (on) {
            m.pbrMetallicRoughness.setBaseColorFactor([1, 0.82, 0.2, Math.max(o.c[3], 0.9)]);
            if (m.setEmissiveFactor) m.setEmissiveFactor([0.45, 0.32, 0.0]);
          } else {
            m.pbrMetallicRoughness.setBaseColorFactor(o.c);
            if (m.setEmissiveFactor) m.setEmissiveFactor(o.e);
          }
        } catch (e) { /* ignore */ }
      });
    }

    /* ---- camera ---- */
    function focusOn(keys) {
      var mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
      keys.forEach(function (k) {
        var p = CFG.parts[k]; if (!p) return;
        for (var a = 0; a < 3; a++) { mn[a] = Math.min(mn[a], p.c[a] - p.s[a] / 2); mx[a] = Math.max(mx[a], p.c[a] + p.s[a] / 2); }
      });
      if (mn[0] > mx[0]) return;
      var c = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2];
      var r = Math.max(1.3, Math.max(mx[0] - mn[0], mx[1] - mn[1]) * 1.8 + 0.7);
      mv.cameraTarget = c[0].toFixed(3) + 'm ' + c[1].toFixed(3) + 'm ' + c[2].toFixed(3) + 'm';
      mv.cameraOrbit = '0deg 75deg ' + r.toFixed(3) + 'm';
    }

    /* ---- selection ---- */
    function showPart(k, focus) {
      var p = CFG.parts[k]; if (!p) return;
      stopSteps(); highlight([k]);
      card(p.en, p.bn, p.cat, p.bnText, p.enText);
      sel.value = k; setChip(-1);
      if (focus) focusOn([k]);
    }
    sel.onchange = function () { if (sel.value) showPart(sel.value, true); };

    var down = null;
    mv.addEventListener('pointerdown', function (e) { down = { x: e.clientX, y: e.clientY }; });
    mv.addEventListener('pointerup', function (e) {
      if (!down) return; var moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      if (typeof mv.materialFromPoint !== 'function') { msg('এই ব্রাউজারে ট্যাপ চলে না — ড্রপডাউন ব্যবহার করো।'); return; }
      if (!ensure()) return;
      var r = mv.getBoundingClientRect(), m = null;
      try { m = mv.materialFromPoint(e.clientX - r.left, e.clientY - r.top); } catch (err) { m = null; }
      if (!m) return;
      var k = keyOf(m.name);
      if (k) showPart(k, false); else msg('অংশের নাম পাওয়া যায়নি: ' + (m.name || '?'));
    });

    /* ---- auto-rotate / reset ---- */
    function rotLabel() { var on = mv.autoRotate; rotB.classList.toggle('on', !!on); rotB.innerHTML = on ? '&#10073;&#10073; থামুক' : '&#9654; ঘুরুক'; }
    rotB.onclick = function () { mv.autoRotate = !mv.autoRotate; rotLabel(); };
    rotLabel();
    q('.gx-rst').onclick = function () {
      stopAnim(); stopSteps(); setChip(-1); highlight(null); sel.value = '';
      mv.cameraTarget = 'auto auto auto'; mv.cameraOrbit = 'auto auto auto'; mv.fieldOfView = 'auto';
      cap.textContent = ''; home();
    };

    /* ---- processes ---- */
    var chips = [];
    function setChip(i) { chips.forEach(function (c, j) { c.classList.toggle('on', j === i); }); }
    var procBox = q('.gx-procs');
    CFG.processes.forEach(function (p, i) {
      var b = document.createElement('button'); b.className = 'gx-chip'; b.textContent = p.name;
      b.onclick = function () {
        stopSteps(); stopAnim(); highlight(p.parts); setChip(i); sel.value = '';
        card(p.name, p.bn, 'Process / প্রক্রিয়া', p.bnText, p.enText); focusOn(p.parts);
      };
      procBox.appendChild(b); chips.push(b);
    });

    /* ---- 12 steps ---- */
    var stepIdx = -1;
    function stopSteps() { stepIdx = -1; sno.textContent = '-'; }
    function goStep(i) {
      stopAnim(); var n = CFG.steps.length; stepIdx = (i + n) % n; var s = CFG.steps[stepIdx];
      sno.textContent = (stepIdx + 1) + ' / ' + n; highlight(s.parts); setChip(-1); sel.value = '';
      card(s.title, 'ধাপ ' + (stepIdx + 1) + ' / ' + n, 'Step ' + (stepIdx + 1) + ' / ' + n, s.bnText, s.enText); focusOn(s.parts);
    }
    q('.gx-prev').onclick = function () { goStep(stepIdx < 0 ? CFG.steps.length - 1 : stepIdx - 1); };
    q('.gx-next').onclick = function () { goStep(stepIdx + 1); };

    /* ---- animation (GLB animation + captions) ---- */
    var playing = false, raf = 0, lastSeg = -1;
    function playLabel() { playB.classList.toggle('on', playing); playB.innerHTML = playing ? '&#10073;&#10073; অ্যানিমেশন থামাও' : '&#9654; অ্যানিমেশন চালু'; }
    function loop() {
      if (!playing) return;
      var t = (mv.currentTime || 0) % CFG.anim.duration, idx = CFG.anim.segs.length - 1;
      for (var i = 0; i < CFG.anim.segs.length; i++) { if (t < CFG.anim.segs[i].end) { idx = i; break; } }
      if (idx !== lastSeg) {
        lastSeg = idx; var sg = CFG.anim.segs[idx];
        highlight(sg.keys); cap.textContent = sg.bn + '  (' + sg.en + ')';
      }
      raf = requestAnimationFrame(loop);
    }
    function stopAnim() {
      if (!playing) return;
      playing = false; cancelAnimationFrame(raf); try { mv.pause(); } catch (e) { /* ignore */ } playLabel();
    }
    playB.onclick = function () {
      if (playing) { stopAnim(); return; }
      if (!ensure()) return;
      if (!mv.availableAnimations || !mv.availableAnimations.length) { msg('এই মডেলে অ্যানিমেশন পাওয়া যায়নি।'); return; }
      stopSteps(); setChip(-1); sel.value = ''; lastSeg = -1;
      mv.cameraTarget = 'auto auto auto'; mv.cameraOrbit = 'auto auto auto';
      card(CFG.title, CFG.animHint, '', '', '');
      try { mv.animationName = CFG.anim.name; } catch (e) { /* ignore */ }
      mv.play({ repetitions: Infinity }); playing = true; playLabel(); loop();
    };
  }

  /* ------------------------------------------------------------ boot */
  function scan() {
    var list = document.querySelectorAll('model-viewer');
    for (var i = 0; i < list.length; i++) {
      var mv = list[i], src = (mv.getAttribute('src') || '').toUpperCase();
      if (src.indexOf(CFG.glb.toUpperCase()) >= 0 && !mv.dataset['gx' + CFG.id]) {
        mv.dataset['gx' + CFG.id] = '1';
        try { addCss(); enhance(mv); } catch (err) { console.error('[' + CFG.id + '] enhance failed', err); }
      }
    }
  }
  function start() {
    scan();
    new MutationObserver(scan).observe(document.body || document.documentElement, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();