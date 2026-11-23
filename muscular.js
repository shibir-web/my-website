/* muscular.js — ট্যাপ করলে অংশের নাম ও বিবরণ, ভিউ বাটন ও ফোকাস মোড */
(function () {
"use strict";
const I = (k, en, bn, d, c, x) => ({ k: k.split("|"), en, bn, d, c, x });
const CFG = {
  file: "MUSCLE.glb", match: /muscle/i, minR: "1.2m",
  cats: [["head","মাথা ও ঘাড়"],["trunk","বুক ও পেট"],["back","পিঠ ও নিতম্ব"],["arm","হাত"],["thigh","উরু"],["leg","পায়ের নিচের অংশ"]],
  views: [["সামনে","0m -0.3m 0m","0deg 82deg 12m"],["পেছনে","0m -0.3m 0m","180deg 82deg 12m"],["মাথা","0m 3.3m 0m","20deg 80deg 3m"],["হাত","1.2m 0.6m 0m","0deg 82deg 4m"],["পা","0.5m -2.4m 0m","0deg 82deg 6m"]],
  info: [
    I("skull","Skull (reference)","খুলি (রেফারেন্স)","মুখ ও মাথার পেশির অবস্থান বোঝার জন্য রেফারেন্স হিসেবে দেখানো হয়েছে।","head"),
    I("frontalis","Frontalis","ফ্রন্টালিস","কপালের পেশি। ভুরু ওপরে তোলে ও কপালে ভাঁজ ফেলে। স্নায়ু: facial nerve (CN VII)।","head"),
    I("orbicularis oculi","Orbicularis oculi","অরবিকুলারিস অকুলি","চোখের চারপাশে বৃত্তাকার পেশি; চোখ বন্ধ করে ও পলক ফেলে। স্নায়ু: CN VII।","head"),
    I("masseter","Masseter","ম্যাসেটার","চোয়ালের পাশের শক্তিশালী পেশি; নিচের চোয়াল ওপরে তুলে চিবোতে সাহায্য করে। স্নায়ু: mandibular nerve (CN V3)।","head"),
    I("temporalis","Temporalis","টেম্পোরালিস","কপালের পাশে পাখার মতো পেশি; চোয়াল বন্ধ করে ও পেছনে টানে। স্নায়ু: CN V3।","head"),
    I("sternocleidomastoid","Sternocleidomastoid","স্টার্নোক্লাইডোমাস্টয়েড","ঘাড়ের পাশের তির্যক পেশি। এক পাশ সংকুচিত হলে মাথা উল্টো দিকে ঘোরে; দুই পাশ একসঙ্গে মাথা সামনে বাঁকায়। স্নায়ু: accessory nerve (CN XI)।","head","জন্মগত সংকোচনে torticollis (বাঁকা ঘাড়) হয়।"),
    I("trapezius","Trapezius","ট্র্যাপিজিয়াস","ঘাড় থেকে পিঠের মাঝ পর্যন্ত ত্রিকোণ পেশি; কাঁধ তোলে এবং scapula পেছনে টানে। স্নায়ু: CN XI।","back"),
    I("deltoid","Deltoid","ডেল্টয়েড","কাঁধের গোলাকার পেশি; হাত পাশে তোলে (abduction)। স্নায়ু: axillary nerve (C5–C6)।","arm","এটি ইনজেকশন দেওয়ার সাধারণ স্থান।"),
    I("pectoralis major","Pectoralis major","পেক্টোরালিস মেজর","বুকের বড় পাখা-আকৃতির পেশি; হাত ভেতরের দিকে টানে, সামনে তোলে ও ভেতরে ঘোরায়। স্নায়ু: pectoral nerves (C5–T1)।","trunk"),
    I("serratus anterior","Serratus anterior","সেরাটাস অ্যান্টেরিয়র","পাঁজরের পাশে করাতের মতো পেশি; scapula-কে বুকের সঙ্গে ধরে রাখে ও সামনে টানে। স্নায়ু: long thoracic nerve (C5–C7)।","trunk","স্নায়ু ক্ষতিতে winged scapula হয়।"),
    I("external oblique","External oblique","এক্সটারনাল অবলিক","পেটের পাশের বাইরের স্তরের পেশি; ধড় বাঁকায় ও ঘোরায় এবং পেটের চাপ বাড়ায়। স্নায়ু: T7–T12।","trunk"),
    I("rectus abdominis","Rectus abdominis","রেক্টাস অ্যাবডোমিনিস","পেটের সামনে লম্বা পেশি, tendinous intersection দিয়ে ভাগ করা (six-pack)। ধড় সামনে বাঁকায়। স্নায়ু: T7–T12।","trunk"),
    I("latissimus dorsi","Latissimus dorsi","ল্যাটিসিমাস ডরসাই","পিঠের সবচেয়ে বড় চওড়া পেশি; হাত নিচে নামায় ও পেছনে টানে (climbing muscle)। স্নায়ু: thoracodorsal nerve (C6–C8)।","back"),
    I("erector spinae","Erector spinae","ইরেক্টর স্পাইনি","মেরুদণ্ডের দুই পাশে লম্বা পেশিগুচ্ছ; মেরুদণ্ড সোজা রাখে ও পেছনে বাঁকায়। স্নায়ু: spinal nerve-এর dorsal rami।","back","এই পেশির টান বা spasm-এ কোমর ব্যথা হয়।"),
    I("infraspinatus","Infraspinatus","ইনফ্রাস্পাইনেটাস","rotator cuff-এর পেশি; হাত বাইরের দিকে ঘোরায় ও কাঁধের জয়েন্ট স্থির রাখে। স্নায়ু: suprascapular nerve।","back"),
    I("teres major","Teres major","টেরেস মেজর","scapula-র নিচের কিনারা থেকে হাতের হাড়ে; হাত ভেতরে ঘোরায় ও পেছনে টানে।","back"),
    I("gluteus maximus","Gluteus maximus","গ্লুটিয়াস ম্যাক্সিমাস","দেহের সবচেয়ে বড় পেশি। উরু পেছনে সোজা করে; সিঁড়ি ওঠা, দৌড়ানো ও বসা থেকে ওঠায় প্রধান ভূমিকা। স্নায়ু: inferior gluteal nerve (L5–S2)।","back"),
    I("gluteus medius","Gluteus medius","গ্লুটিয়াস মিডিয়াস","উরু পাশে তোলে এবং হাঁটার সময় পেলভিস স্থির রাখে। স্নায়ু: superior gluteal nerve।","back","ক্ষতিতে Trendelenburg sign (হাঁটতে পেলভিস ঝুলে পড়া) হয়।"),
    I("biceps brachii","Biceps brachii","বাইসেপ ব্র্যাকিয়াই","বাহুর সামনের দুই-মাথা পেশি; কনুই ভাঁজ করে এবং forearm উল্টে দেয় (supination)। স্নায়ু: musculocutaneous nerve (C5–C6)।","arm"),
    I("triceps brachii","Triceps brachii","ট্রাইসেপ ব্র্যাকিয়াই","বাহুর পেছনের তিন-মাথা পেশি; কনুই সোজা করে। স্নায়ু: radial nerve।","arm"),
    I("brachioradialis","Brachioradialis","ব্র্যাকিওরেডিয়ালিস","forearm-এর পাশের পেশি; কনুই ভাঁজ করে (বিশেষ করে হাতের তালু মাঝামাঝি অবস্থায়)। স্নায়ু: radial nerve।","arm"),
    I("forearm flexors","Forearm flexors","ফোরআর্ম ফ্লেক্সর","forearm-এর সামনের পেশিগুচ্ছ; কব্জি ও আঙুল ভাঁজ করে। স্নায়ু: median ও ulnar nerve।","arm"),
    I("forearm extensors","Forearm extensors","ফোরআর্ম এক্সটেনসর","forearm-এর পেছনের পেশিগুচ্ছ; কব্জি ও আঙুল সোজা করে। স্নায়ু: radial nerve।","arm"),
    I("rectus femoris","Rectus femoris","রেক্টাস ফিমোরিস","quadriceps-এর মাঝের অংশ; হাঁটু সোজা করে ও নিতম্ব ভাঁজ করে। এটিই একমাত্র quadriceps পেশি যা দুটি জয়েন্ট পার হয়। স্নায়ু: femoral nerve।","thigh"),
    I("vastus lateralis","Vastus lateralis","ভাস্টাস ল্যাটারালিস","উরুর বাইরের দিকের quadriceps পেশি; হাঁটু সোজা করে। স্নায়ু: femoral nerve।","thigh","শিশুদের ইনজেকশনের সাধারণ স্থান।"),
    I("vastus medialis","Vastus medialis","ভাস্টাস মিডিয়ালিস","উরুর ভেতরের দিকের quadriceps পেশি; হাঁটুর শেষ কয়েক ডিগ্রি সোজা করে ও patella ঠিক জায়গায় রাখে।","thigh"),
    I("sartorius","Sartorius","সার্টোরিয়াস","দেহের সবচেয়ে লম্বা পেশি, উরুর ওপর দিয়ে তির্যকভাবে যায়। নিতম্ব ও হাঁটু ভাঁজ করে এবং পা আড়াআড়ি রাখতে সাহায্য করে (tailor muscle)। স্নায়ু: femoral nerve।","thigh"),
    I("adductor longus","Adductor longus","অ্যাডাক্টর লঙ্গাস","উরুর ভেতরের পেশি; উরু ভেতরের দিকে টানে। স্নায়ু: obturator nerve।","thigh","খেলায় groin strain-এর সাধারণ স্থান।"),
    I("gracilis","Gracilis","গ্র্যাসিলিস","উরুর ভেতরের সরু লম্বা পেশি; উরু ভেতরে টানে ও হাঁটু ভাঁজ করে। স্নায়ু: obturator nerve।","thigh"),
    I("biceps femoris","Biceps femoris","বাইসেপ ফিমোরিস","hamstring-এর বাইরের অংশ; হাঁটু ভাঁজ করে ও নিতম্ব পেছনে সোজা করে। স্নায়ু: sciatic nerve।","thigh","দৌড়ে hamstring strain-এর সাধারণ স্থান।"),
    I("semi","Semimembranosus & Semitendinosus","সেমিমেমব্রানোসাস ও সেমিটেনডিনোসাস","hamstring-এর ভেতরের অংশ; হাঁটু ভাঁজ করে ও নিতম্ব সোজা করে। স্নায়ু: sciatic nerve-এর tibial অংশ।","thigh"),
    I("tibialis anterior","Tibialis anterior","টিবিয়ালিস অ্যান্টেরিয়র","শিনের সামনের পেশি; পায়ের পাতা ওপরে তোলে (dorsiflexion) ও ভেতরে ঘোরায়। স্নায়ু: deep fibular nerve।","leg","ক্ষতিতে foot drop হয়।"),
    I("peroneus longus","Peroneus (fibularis) longus","পেরোনিয়াস লঙ্গাস","পায়ের নিচের পাশের পেশি; পায়ের পাতা বাইরের দিকে ঘোরায় ও নিচে নামায়। স্নায়ু: superficial fibular nerve।","leg"),
    I("gastrocnemius","Gastrocnemius","গ্যাস্ট্রোকনিমিয়াস","calf-এর দুই-মাথা ওপরের পেশি; গোড়ালি তোলে (plantarflexion) ও হাঁটু ভাঁজ করে। দৌড়-লাফে গুরুত্বপূর্ণ। স্নায়ু: tibial nerve।","leg"),
    I("soleus","Soleus","সোলিয়াস","gastrocnemius-এর নিচে গভীর পেশি; দাঁড়িয়ে থাকার সময় গোড়ালি তোলে। শিরার রক্ত হৃৎপিণ্ডের দিকে ঠেলতে সাহায্য করে (peripheral heart)। স্নায়ু: tibial nerve।","leg"),
    I("achilles","Achilles tendon","অ্যাকিলিস টেন্ডন","দেহের সবচেয়ে শক্ত ও মোটা tendon; gastrocnemius ও soleus-কে গোড়ালির হাড়ে (calcaneus) যুক্ত করে।","leg","হঠাৎ লাফ-ঝাঁপে ছিঁড়ে (rupture) যেতে পারে।")
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