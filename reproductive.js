/* reproductive.js — ট্যাপ করলে অংশের নাম ও বিবরণ, ভিউ বাটন ও ফোকাস মোড */
(function () {
"use strict";
const I = (k, en, bn, d, c, x) => ({ k: k.split("|"), en, bn, d, c, x });
const CFG = {
  file: "REPRODUCTIVE.glb", match: /reproductive/i, minR: "1.2m",
  cats: [["fo","স্ত্রী: ডিম্বাশয় ও নালী"],["fu","স্ত্রী: জরায়ু"],["fl","স্ত্রী: যোনি ও বাহ্যিক"],["mt","পুরুষ: অণ্ডকোষ ও নালী"],["mg","পুরুষ: গ্রন্থি ও মূত্রনালী"],["mp","পুরুষ: লিঙ্গ"]],
  views: [["দুটোই","0m -0.1m 0m","0deg 80deg 9m"],["স্ত্রী","-2.3m 0m 0m","0deg 80deg 5.5m"],["পুরুষ","2.3m -0.4m 0m","0deg 80deg 5m"]],
  info: [
    I("graafian","Graafian follicle","গ্রাফিয়ান ফলিকল","পরিপক্ব (tertiary) follicle। LH surge-এ ফেটে ডিম্বাণু ছাড়ে (ovulation)। বাড়ার সময় estrogen তৈরি করে।","fo"),
    I("ovarian follicles","Ovarian follicles","ডিম্বাশয়ের ফলিকল","oocyte-কে ঘিরে থাকা কোষের থলি। primordial থেকে primary, secondary হয়ে বড় হয়; প্রতি মাসে সাধারণত একটিই পরিপক্ব হয়।","fo"),
    I("corpus luteum","Corpus luteum","কর্পাস লিউটিয়াম","ovulation-এর পর ফলিকল থেকে তৈরি হলুদ গঠন। progesterone ও estrogen নিঃসরণ করে। গর্ভধারণ না হলে প্রায় ১৪ দিনে corpus albicans-এ রূপ নেয়।","fo"),
    I("fimbriae","Fimbriae","ফিমব্রি","uterine tube-এর প্রান্তে আঙুলের মতো অংশ। ovulation-এর সময় ডিম্বাণু ধরে নালীতে ঢুকিয়ে দেয়।","fo"),
    I("uterine tube","Uterine (fallopian) tube","ফ্যালোপিয়ান নালী","প্রায় ১০–১২ সেমি। অংশ: infundibulum, ampulla, isthmus ও intramural। সাধারণত ampulla-তে নিষেক হয়; cilia ও পেশির সংকোচনে ভ্রূণ জরায়ুর দিকে যায়।","fo","Ectopic pregnancy বেশি হয় এই নালীতেই।"),
    I("ovarian ligament","Ovarian ligament","ডিম্বাশয়-বন্ধনী","ডিম্বাশয়কে জরায়ুর পাশের সঙ্গে যুক্ত রাখে।","fo"),
    I("suspensory ligament","Suspensory ligament","সাসপেনসরি লিগামেন্ট","ডিম্বাশয়কে pelvic wall-এ ঝুলিয়ে রাখে এবং ovarian রক্তনালী বহন করে।","fo"),
    I("broad ligament","Broad ligament","ব্রড লিগামেন্ট","জরায়ু, নালী ও ডিম্বাশয়কে ঢেকে থাকা peritoneum-এর ভাঁজ; এদের pelvic wall-এর সঙ্গে ধরে রাখে।","fo"),
    I("ovary","Ovary","ডিম্বাশয়","বাদামের আকারের জোড়া অঙ্গ (প্রায় ৩ সেমি)। ডিম্বাণু (oocyte) তৈরি করে এবং estrogen ও progesterone নিঃসরণ করে। ডান ডিম্বাশয়ে একটি পরিপক্ব follicle ও corpus luteum দেখানো হয়েছে।","fo"),
    I("uterine fundus","Uterine fundus","জরায়ুর ফান্ডাস","জরায়ুর ওপরের গম্বুজাকার অংশ, নালী ঢোকার স্তরের ওপরে।","fu","গর্ভকালে fundal height মেপে গর্ভের বৃদ্ধি বোঝা যায়।"),
    I("uterine body","Uterine body","জরায়ুর বডি","জরায়ুর মূল অংশ যেখানে ভ্রূণ বেড়ে ওঠে। অ-গর্ভবতী অবস্থায় প্রায় ৭.৫ সেমি লম্বা।","fu"),
    I("uterine cervix","Cervix","জরায়ুমুখ (সার্ভিক্স)","জরায়ু ও যোনির সংযোগস্থল, প্রায় ৩–৪ সেমি। শ্লেষ্মা তৈরি করে এবং প্রসবের সময় প্রসারিত হয়।","fu","Pap smear এখান থেকেই নেওয়া হয়; HPV সংক্রমণ cervical cancer-এর প্রধান কারণ।"),
    I("myometrium","Myometrium","মায়োমেট্রিয়াম","জরায়ুর পুরু মসৃণ পেশির স্তর। প্রসবের সময় শক্তিশালী সংকোচন ঘটায় এবং oxytocin-এ সাড়া দেয়।","fu"),
    I("endometrium","Endometrium","এন্ডোমেট্রিয়াম","ভেতরের শ্লেষ্মা স্তর। menstrual cycle-এ পুরু হয়, নিষেক না হলে ঝরে (menstruation)। ভ্রূণ এখানেই implant হয়।","fu"),
    I("uterine cavity","Uterine cavity","জরায়ুগহ্বর","জরায়ুর ভেতরের উল্টো ত্রিকোণাকার ফাঁকা স্থান; ওপরের দুই কোণে নালী খোলে।","fu"),
    I("cervical canal","Cervical canal","সার্ভিক্যাল ক্যানাল","internal os থেকে external os পর্যন্ত সরু পথ। মাসিকের রক্ত বের হয় এবং শুক্রাণু ঢোকে।","fu"),
    I("vaginal lumen","Vaginal lumen","যোনিগহ্বর","যোনিনালীর ভেতরের ফাঁকা পথ।","fl"),
    I("vagina","Vagina","যোনি","প্রায় ৭–১০ সেমি পেশি-তন্তুময় নালী। জন্মপথ, মাসিকের রক্তের নির্গমনপথ এবং সঙ্গমের অঙ্গ। অম্লীয় পরিবেশ (pH প্রায় ৪) সংক্রমণ ঠেকায়।","fl"),
    I("labia majora","Labia majora","ল্যাবিয়া মেজোরা","বাইরের বড় ভাঁজ; যোনিমুখ ও ভেতরের অংশ রক্ষা করে।","fl"),
    I("labia minora","Labia minora","ল্যাবিয়া মাইনোরা","ভেতরের ছোট ভাঁজ; মূত্রনালী ও যোনিমুখ ঘিরে থাকে।","fl"),
    I("clitoris","Clitoris","ক্লিটোরিস","অত্যন্ত সংবেদনশীল erectile অঙ্গ; যৌন উত্তেজনায় ভূমিকা রাখে।","fl"),
    I("bartholin","Bartholin gland","বার্থোলিন গ্রন্থি","যোনিমুখের দুই পাশে; পিচ্ছিলকারী শ্লেষ্মা নিঃসরণ করে।","fl"),
    I("seminiferous","Seminiferous tubules","সেমিনিফেরাস নালিকা","testis-এর প্রতিটি lobule-এ কুণ্ডলী পাকানো নালিকা। এখানে spermatogenesis ঘটে (প্রায় ৭০ দিন) এবং Sertoli cell শুক্রাণুকে পুষ্টি দেয়।","mt"),
    I("rete testis","Rete testis","রিটি টেস্টিস","সেমিনিফেরাস নালিকার শুক্রাণু জমা করে efferent ductule হয়ে epididymis-এ পাঠায়।","mt"),
    I("tunica albuginea","Tunica albuginea","টিউনিকা অ্যালবুজিনিয়া","testis-এর শক্ত সাদা তন্তুময় আবরণ।","mt"),
    I("testis","Testis","টেস্টিস (অণ্ডকোষ)","শুক্রাণু ও testosterone (Leydig cell) তৈরি করে। শরীরের তাপমাত্রার চেয়ে ২–৪°C কম তাপমাত্রা দরকার, তাই scrotum-এ থাকে। ডান অণ্ডকোষ কেটে ভেতরের lobule দেখানো হয়েছে।","mt"),
    I("epididymis","Epididymis","এপিডিডাইমিস","প্রায় ৬ মিটার কুণ্ডলী পাকানো নালী। শুক্রাণু এখানে পরিপক্ব হয় ও সঞ্চিত থাকে।","mt"),
    I("vas deferens","Vas deferens","ভাস ডেফারেন্স","প্রায় ৪৫ সেমি পেশিবহুল নালী; বীর্যস্খলনে শুক্রাণু epididymis থেকে urethra-র দিকে বহন করে।","mt","Vasectomy-তে এই নালী কেটে বা বেঁধে দেওয়া হয়।"),
    I("scrotum","Scrotum","স্কোটাম","অণ্ডকোষের থলি। cremaster ও dartos পেশি সংকুচিত-প্রসারিত হয়ে তাপমাত্রা ঠিক রাখে।","mt"),
    I("seminal vesicle","Seminal vesicle","সেমিনাল ভেসিকল","বীর্যের প্রায় ৬০–৭০% তরল তৈরি করে; fructose-সমৃদ্ধ ও ক্ষারীয়, যা শুক্রাণুকে শক্তি দেয়।","mg"),
    I("ejaculatory","Ejaculatory duct","ইজাকুলেটরি ডাক্ট","vas deferens ও seminal vesicle-এর নালী মিলে তৈরি; prostatic urethra-য় খোলে।","mg"),
    I("prostate","Prostate","প্রস্টেট","আখরোটের আকারের গ্রন্থি, urethra-র প্রথম অংশ ঘিরে। বীর্যের প্রায় ৩০% তরল ও PSA তৈরি করে।","mg","বয়সে বড় হলে (BPH) প্রস্রাবে সমস্যা হয়; prostate cancer পুরুষদের সাধারণ ক্যান্সার।"),
    I("bulbourethral","Bulbourethral gland","বালবোইউরেথ্রাল (কাউপার) গ্রন্থি","পিচ্ছিল শ্লেষ্মা নিঃসরণ করে urethra পরিষ্কার ও ক্ষারীয় করে।","mg"),
    I("urethra","Urethra","ইউরেথ্রা","পুরুষে প্রায় ২০ সেমি; প্রস্রাব ও বীর্য দুটোরই পথ। তিন অংশ: prostatic, membranous ও spongy।","mg"),
    I("corpus cavernosum","Corpus cavernosum","কর্পাস ক্যাভার্নোসাম","দুটি erectile টিস্যুর স্তম্ভ। উত্তেজনায় রক্তে ভরে লিঙ্গ শক্ত করে।","mp"),
    I("corpus spongiosum","Corpus spongiosum","কর্পাস স্পঞ্জিওসাম","urethra ঘিরে থাকা erectile টিস্যু; উত্থানের সময় urethra খোলা রাখে। গোড়ায় bulb ও ডগায় glans হয়।","mp"),
    I("glans","Glans penis","গ্ল্যান্স পেনিস","লিঙ্গের সংবেদনশীল মাথা; urethra-র বাইরের মুখ এখানে।","mp")
  ]
};

/* ---------- সাধারণ ইঞ্জিন: ট্যাপ/বাটনে নাম ও বিবরণ, ভিউ বাটন, ফোকাস মোড ---------- */
const HILITE = [0.2, 1, 0.8, 1];
const norm = s => String(s || "").toLowerCase().replace(/[_\-.]+/g, " ").trim();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const lookup = name => { const n = norm(name); return CFG.info.find(it => it.k.some(k => n.includes(k))) || null; };
const sideOf = name => { const m = /_([LR])$/.exec(name || ""); return m ? (m[1] === "R" ? { en: "Right", bn: "ডান" } : { en: "Left", bn: "বাম" }) : null; };
const romanOf = name => { const m = /_(XII|XI|X|IX|VIII|VII|VI|V|IV|III|II|I)$/.exec(name || ""); return m ? m[1] : null; };
function label(name) {
  const it = lookup(name), sd = sideOf(name), rn = romanOf(name);
  if (!it) return name;
  return (rn ? "CN " + rn + " · " : "") + (sd ? sd.en + " " : "") + it.en;
}

function init(mv) {
  if (mv.dataset.anaInit) return;
  mv.dataset.anaInit = "1";
  const box = mv.closest(".model-box") || mv.parentElement;
  const head = box.querySelector(".model-head p");
  if (head) head.textContent = "যেকোনো অংশে ট্যাপ/ক্লিক করুন, অথবা নিচের বাটন থেকে বেছে নিন।";

  const css = {
    panel: "padding:16px 18px;border-top:1px solid var(--line,#2a3350);min-height:96px;background:rgba(255,255,255,.03)",
    row: "display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px;border-top:1px solid var(--line,#2a3350)",
    btn: "all:unset;cursor:pointer;font-size:12.5px;padding:5px 11px;border-radius:99px;border:1px solid var(--line,#2a3350);color:var(--tx,#e8ecf8);background:var(--card,#141a2e)"
  };
  const mk = (tag, style) => { const e = document.createElement(tag); if (style) e.style.cssText = style; return e; };
  const btn = (txt, fn, extra) => { const b = mk("button", css.btn + (extra || "")); b.type = "button"; b.textContent = txt; b.addEventListener("click", fn); return b; };

  const panel = mk("div", css.panel);
  panel.innerHTML = '<span style="color:var(--mu,#9aa6c4)">মডেলের কোনো অংশে ট্যাপ করুন…</span>';
  const viewRow = mk("div", css.row), tabRow = mk("div", css.row), chipRow = mk("div", css.row);
  [panel, viewRow, tabRow, chipRow].forEach(e => box.appendChild(e));

  /* ---- ভিউ বাটন ---- */
  function setView(v) { try { mv.cameraTarget = v[1]; mv.cameraOrbit = v[2]; } catch (e) {} }
  CFG.views.forEach(v => viewRow.appendChild(btn("🎥 " + v[0], () => setView(v))));
  let ghost = false, current = null;
  const ghostBtn = btn("👁 বাকি অংশ ঝাপসা: বন্ধ", () => {
    ghost = !ghost;
    ghostBtn.textContent = "👁 বাকি অংশ ঝাপসা: " + (ghost ? "চালু" : "বন্ধ");
    applyGhost();
  });
  viewRow.appendChild(ghostBtn);

  /* ---- হাইলাইট ও ফোকাস ---- */
  const original = new Map();
  function restore() {
    if (current && original.has(current)) { try { current.pbrMetallicRoughness.setBaseColorFactor(original.get(current)); } catch (e) {} }
  }
  function applyGhost() {
    const mats = (mv.model && mv.model.materials) || [];
    mats.forEach(m => {
      try {
        const f = m.pbrMetallicRoughness.baseColorFactor.slice();
        const dim = ghost && current && m !== current;
        f[3] = dim ? 0.12 : 1;
        m.setAlphaMode(dim ? "BLEND" : "OPAQUE");
        m.pbrMetallicRoughness.setBaseColorFactor(f);
      } catch (e) {}
    });
  }

  /* ---- বিবরণ প্যানেল ---- */
  let activeChip = null; const chipOf = new Map();
  function select(mat) {
    restore();
    if (!mat) return;
    try {
      if (!original.has(mat)) original.set(mat, mat.pbrMetallicRoughness.baseColorFactor.slice());
      mat.pbrMetallicRoughness.setBaseColorFactor(HILITE);
    } catch (e) {}
    current = mat; applyGhost();
    const it = lookup(mat.name), sd = sideOf(mat.name), rn = romanOf(mat.name);
    panel.innerHTML = it
      ? '<h3 style="color:var(--gold,#ffd25e);font-size:20px;margin-bottom:2px">' + (rn ? "CN " + esc(rn) + " · " : "") + (sd ? esc(sd.en) + " " : "") + esc(it.en) + "</h3>" +
        '<div style="font-weight:600;margin-bottom:6px">' + (sd ? esc(sd.bn) + " " : "") + esc(it.bn) + "</div>" +
        '<p style="color:var(--mu,#9aa6c4);font-size:15px;line-height:1.55">' + esc(it.d) + "</p>" +
        (it.x ? '<p style="margin-top:8px;font-size:14px;line-height:1.5">💡 ' + esc(it.x) + "</p>" : "")
      : '<h3 style="color:var(--gold,#ffd25e);font-size:18px">' + esc(mat.name || "(নামহীন)") + "</h3>";
    if (it && it.c) showTab(it.c);
    if (activeChip) activeChip.style.outline = "";
    const ch = chipOf.get(mat); if (ch) { ch.style.outline = "2px solid #33ffcc"; activeChip = ch; }
  }

  /* ---- ট্যাব ও বাটন ---- */
  const tabBtns = {}; let chipsBuilt = false; const byCat = {};
  function showTab(id) {
    CFG.cats.forEach(c => { if (tabBtns[c[0]]) tabBtns[c[0]].style.background = c[0] === id ? "#33ffcc" : "var(--card,#141a2e)"; if (tabBtns[c[0]]) tabBtns[c[0]].style.color = c[0] === id ? "#04121a" : "var(--tx,#e8ecf8)"; });
    chipRow.innerHTML = "";
    (byCat[id] || []).forEach(m => {
      const b = btn(label(m.name), () => select(m)); chipOf.set(m, b);
      if (current === m) { b.style.outline = "2px solid #33ffcc"; activeChip = b; }
      chipRow.appendChild(b);
    });
  }
  function buildChips() {
    if (chipsBuilt || !mv.model) return;
    const mats = mv.model.materials || []; if (!mats.length) return;
    chipsBuilt = true;
    mats.forEach(m => { const it = lookup(m.name); const c = it && it.c ? it.c : CFG.cats[CFG.cats.length - 1][0]; (byCat[c] = byCat[c] || []).push(m); });
    CFG.cats.forEach(c => { if ((byCat[c[0]] || []).length) { tabBtns[c[0]] = btn(c[1], () => showTab(c[0])); tabRow.appendChild(tabBtns[c[0]]); } });
    const first = CFG.cats.find(c => (byCat[c[0]] || []).length); if (first) showTab(first[0]);
  }
  mv.addEventListener("load", () => {
    buildChips();
    try { mv.minCameraOrbit = "auto auto " + (CFG.minR || "1.2m"); mv.maxCameraOrbit = "auto auto 40m"; } catch (e) {}
    if (!mv.dataset.anaV0) { mv.dataset.anaV0 = "1"; setView(CFG.views[0]); }
  });
  mv.addEventListener("error", e => { panel.innerHTML = '<span style="color:#ff8a8a">✗ মডেল লোড হয়নি — ' + esc(CFG.file) + ' ফাইলটি index.html-এর পাশে আছে কিনা দেখুন।</span>'; });
  buildChips();

  /* ---- ট্যাপ ---- */
  let sx = null, sy = null;
  mv.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
  mv.addEventListener("click", e => {
    if (sx !== null && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) return;
    buildChips();
    if (typeof mv.materialFromPoint !== "function") { panel.innerHTML = '<span style="color:#ff8a8a">এই ব্রাউজারে ট্যাপ সুবিধা নেই — নিচের বাটন ব্যবহার করুন।</span>'; return; }
    const r = mv.getBoundingClientRect();
    const mat = mv.materialFromPoint(e.clientX - r.left, e.clientY - r.top);
    if (mat) select(mat);
  });
}

function scan() { document.querySelectorAll("model-viewer").forEach(mv => { if (CFG.match.test(mv.getAttribute("src") || "")) init(mv); }); }
new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
scan();

})();