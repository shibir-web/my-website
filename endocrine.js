/* endocrine.js — ট্যাপ করলে অংশের নাম ও বিবরণ, ভিউ বাটন ও ফোকাস মোড */
(function () {
"use strict";
const I = (k, en, bn, d, c, x) => ({ k: k.split("|"), en, bn, d, c, x });
const CFG = {
  file: "ENDOCRINE.glb", match: /endocrine/i, minR: "1.2m",
  cats: [["head","মস্তিষ্কের গ্রন্থি"],["neck","গলা ও বুক"],["abd","পেট"],["gon","গোনাড"],["ref","রেফারেন্স অঙ্গ"]],
  views: [["পুরো শরীর","0m 1.2m 0m","0deg 80deg 9m"],["মস্তিষ্ক","0m 3.2m 0m","0deg 80deg 3.2m"],["গলা ও বুক","0m 1.8m 0m","0deg 80deg 3m"],["পেট","0m 0.5m 0m","0deg 80deg 3.5m"],["গোনাড","0m -0.9m 0m","0deg 80deg 3.2m"]],
  info: [
    I("hypothalamus","Hypothalamus","হাইপোথ্যালামাস","মস্তিষ্কের গভীরে অবস্থিত নিয়ন্ত্রণ কেন্দ্র। ক্ষুধা, তৃষ্ণা, তাপমাত্রা ও ঘুম নিয়ন্ত্রণ করে। TRH, CRH, GnRH, GHRH, somatostatin ও dopamine পাঠিয়ে pituitary-কে চালায়; ADH ও oxytocin তৈরি করে posterior pituitary-তে জমা রাখে।","head","নার্ভাস ও এন্ডোক্রাইন তন্ত্রের মধ্যে প্রধান যোগসূত্র।"),
    I("pituitary anterior","Anterior pituitary","অ্যান্টেরিয়র পিটুইটারি","adenohypophysis। GH, TSH, ACTH, FSH, LH ও prolactin নিঃসরণ করে; তাই এটিকে master gland বলা হয়।","head","GH বেশি হলে শিশুতে gigantism, বড়দের acromegaly।"),
    I("pituitary posterior","Posterior pituitary","পোস্টেরিয়র পিটুইটারি","neurohypophysis। নিজে হরমোন তৈরি করে না; hypothalamus-এর তৈরি ADH (vasopressin) ও oxytocin সঞ্চয় ও নিঃসরণ করে।","head","ADH-এর অভাবে diabetes insipidus হয়: প্রচুর পাতলা প্রস্রাব।"),
    I("pineal","Pineal gland","পিনিয়াল গ্রন্থি","ছোট শঙ্কু আকৃতির গ্রন্থি। melatonin তৈরি করে, যা অন্ধকারে বাড়ে এবং ঘুম-জাগরণের circadian rhythm ঠিক রাখে।","head"),
    I("parathyroid","Parathyroid glands","প্যারাথাইরয়েড গ্রন্থি","থাইরয়েডের পেছনে ৪টি ছোট গ্রন্থি। PTH নিঃসরণ করে রক্তে ক্যালসিয়াম বাড়ায় (হাড় থেকে মুক্ত করে, কিডনিতে ধরে রাখে, vitamin D সক্রিয় করে)।","neck","থাইরয়েড অপারেশনে এগুলো বাদ গেলে hypocalcemia ও tetany হয়।"),
    I("thyroid","Thyroid gland","থাইরয়েড গ্রন্থি","গলার সামনে প্রজাপতি আকৃতির দুই lobe ও isthmus। iodine দিয়ে T3 ও T4 তৈরি করে (বিপাকের হার ঠিক রাখে) এবং C-cell থেকে calcitonin।","neck","Iodine-এর অভাবে goitre; হরমোন কমলে hypothyroidism, বাড়লে hyperthyroidism (Graves disease)।"),
    I("thymus","Thymus","থাইমাস","বুকের উপরের অংশে অবস্থিত। T-lymphocyte পরিণত করে ও thymosin তৈরি করে। শৈশবে সবচেয়ে সক্রিয়, বয়সের সঙ্গে ছোট হয়ে যায় (involution)।","neck"),
    I("adrenal cortex","Adrenal cortex","অ্যাড্রিনাল কর্টেক্স","বাইরের স্তর, তিন zone: glomerulosa (aldosterone), fasciculata (cortisol), reticularis (androgen)। মনে রাখার উপায়: Salt, Sugar, Sex।","abd","Cortisol বেশি হলে Cushing syndrome, কম হলে Addison disease।"),
    I("adrenal medulla","Adrenal medulla","অ্যাড্রিনাল মেডুলা","ভেতরের অংশ। chromaffin cell থেকে adrenaline ও noradrenaline নিঃসরণ করে, যা fight-or-flight প্রতিক্রিয়া চালায়।","abd","Pheochromocytoma টিউমারে প্রচণ্ড উচ্চ রক্তচাপ হয়।"),
    I("pancreatic islets","Islets of Langerhans","আইলেট অব ল্যাঙ্গারহ্যান্স","অগ্ন্যাশয়ের অন্তঃক্ষরা কোষগুচ্ছ। α-cell glucagon, β-cell insulin, δ-cell somatostatin ও PP-cell pancreatic polypeptide তৈরি করে। ছবিতে বোঝার সুবিধার জন্য বড় করে দেখানো হয়েছে।","abd","β-cell নষ্ট হলে Type 1 diabetes হয়।"),
    I("pancreas","Pancreas","অগ্ন্যাশয় (প্যানক্রিয়াস)","মিশ্র গ্রন্থি: exocrine অংশ হজমের এনজাইম তৈরি করে, endocrine অংশ (islet) রক্তের গ্লুকোজ নিয়ন্ত্রণকারী হরমোন তৈরি করে।","abd"),
    I("ovary","Ovary","ডিম্বাশয়","estrogen, progesterone, inhibin ও relaxin তৈরি করে। FSH ও LH দ্বারা নিয়ন্ত্রিত। (এখানে শুধু স্থান বোঝাতে দেখানো হয়েছে।)","gon"),
    I("testis","Testis","অণ্ডকোষ","Leydig cell-এ testosterone ও Sertoli cell-এ inhibin তৈরি করে। LH ও FSH দ্বারা নিয়ন্ত্রিত।","gon","শিক্ষার সুবিধার জন্য একই শরীরে ডিম্বাশয় ও অণ্ডকোষ দুটোই দেখানো হয়েছে।"),
    I("kidney reference","Kidney (reference)","কিডনি (রেফারেন্স)","কিডনিও এন্ডোক্রাইন ভূমিকা রাখে: erythropoietin (লোহিত কণিকা তৈরি), renin (রক্তচাপ) ও calcitriol (সক্রিয় vitamin D)।","ref"),
    I("trachea reference","Trachea (reference)","শ্বাসনালী (রেফারেন্স)","থাইরয়েডের অবস্থান বোঝানোর জন্য; থাইরয়েড শ্বাসনালীর সামনে-পাশে থাকে।","ref"),
    I("brain reference","Brain (reference)","মস্তিষ্ক (রেফারেন্স)","coronal ভাবে কাটা মস্তিষ্ক, ভেতরের অন্তঃক্ষরা গ্রন্থির অবস্থান বোঝানোর জন্য।","ref")
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