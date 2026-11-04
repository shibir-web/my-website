/* urinary.js v2 — Urinary System: ট্যাপ/বাটনে অংশের নাম ও বিবরণ দেখায় */
(function () {
  "use strict";
  console.log("urinary.js v2 loaded");

  const INFO = [
    { k: ["adrenal"], en: "Adrenal gland", bn: "অ্যাড্রিনাল গ্রন্থি",
      d: "প্রতিটি বৃক্কের ওপরে বসে থাকে। কর্টিসল, অ্যাড্রিনালিন ও অ্যালডোস্টেরন হরমোন নিঃসরণ করে। এটি মূলত অন্তঃক্ষরা (endocrine) গ্রন্থি।" },
    { k: ["ureter"], en: "Ureter", bn: "ইউরেটার (মূত্রনালী)",
      d: "বৃক্ক থেকে মূত্রথলিতে মূত্র বহন করা পেশিবহুল নল। প্রতি পাশে একটি করে থাকে এবং peristalsis তরঙ্গে মূত্র নিচে ঠেলে দেয়।" },
    { k: ["urethra"], en: "Urethra", bn: "ইউরেথ্রা",
      d: "মূত্রথলি থেকে মূত্র দেহের বাইরে নিয়ে আসে। পুরুষে এটি অনেক লম্বা, নারীতে প্রায় ৪ সেমি।" },
    { k: ["bladder"], en: "Urinary bladder", bn: "মূত্রথলি",
      d: "পেলভিসে অবস্থিত স্থিতিস্থাপক পেশিবহুল থলি। মূত্র জমা রাখে; ধারণক্ষমতা প্রায় ৪০০–৬০০ মি.লি.।" },
    { k: ["renal artery"], en: "Renal artery", bn: "রেনাল ধমনী",
      d: "অ্যাওর্টা থেকে বৃক্কে অক্সিজেনযুক্ত রক্ত নিয়ে আসে। হৃৎপিণ্ডের আউটপুটের প্রায় এক-পঞ্চমাংশ বৃক্কে যায়।" },
    { k: ["renal vein"], en: "Renal vein", bn: "রেনাল শিরা",
      d: "পরিশোধিত রক্ত বৃক্ক থেকে বের করে নিম্ন মহাশিরায় (IVC) পৌঁছে দেয়।" },
    { k: ["aorta"], en: "Abdominal aorta", bn: "অ্যাওর্টা (মহাধমনী)",
      d: "দেহের সবচেয়ে বড় ধমনী। এর শাখা রেনাল ধমনী বৃক্কে রক্ত সরবরাহ করে।" },
    { k: ["vena cava", "ivc"], en: "Inferior vena cava (IVC)", bn: "নিম্ন মহাশিরা",
      d: "দেহের নিচের অংশের রক্ত হৃৎপিণ্ডে ফিরিয়ে আনে। রেনাল শিরা এতে এসে মেশে।" },
    { k: ["iliac artery"], en: "Common iliac artery", bn: "কমন ইলিয়াক ধমনী",
      d: "অ্যাওর্টা দুই ভাগ হয়ে এই ধমনী তৈরি হয়। শ্রোণি ও দুই পায়ে রক্ত সরবরাহ করে।" },
    { k: ["iliac vein"], en: "Common iliac vein", bn: "কমন ইলিয়াক শিরা",
      d: "শ্রোণি ও দুই পা থেকে রক্ত এনে নিম্ন মহাশিরা (IVC) তৈরি করে।" },
    { k: ["cortex"], en: "Renal cortex", bn: "রেনাল কর্টেক্স",
      d: "বৃক্কের বাইরের স্তর। নেফ্রনের গ্লোমেরুলাস ও কনভোলুটেড নালিকা এখানে থাকে; রক্ত পরিস্রাবণ শুরু হয় এখানেই।" },
    { k: ["medulla"], en: "Renal medulla (pyramids)", bn: "রেনাল মেডুলা / পিরামিড",
      d: "ভেতরের স্তর। পিরামিড আকৃতির অংশে হেনলের লুপ ও সংগ্রাহক নালিকা থাকে; মূত্র ঘন করে।" },
    { k: ["calyx"], en: "Renal calyx", bn: "রেনাল ক্যালিক্স",
      d: "পিরামিডের ডগা থেকে মূত্র সংগ্রহ করে রেনাল পেলভিসে পাঠায়।" },
    { k: ["pelvis"], en: "Renal pelvis", bn: "রেনাল পেলভিস",
      d: "বৃক্কের ভেতরের ফানেল আকৃতির অংশ। ক্যালিক্সের মূত্র জমা হয়ে ইউরেটারে যায়।" },
    { k: ["kidney"], en: "Kidney", bn: "বৃক্ক (কিডনি)",
      d: "সিমের বীজ আকৃতির এক জোড়া অঙ্গ, মেরুদণ্ডের দুই পাশে পেটের পেছনের দিকে। রক্ত পরিশোধন করে মূত্র তৈরি করে এবং পানি-লবণের ভারসাম্য রাখে। (ডান বৃক্কটি কাটা অবস্থায় দেখানো — ভেতরের স্তরগুলোও ট্যাপ করুন।)" }
  ];

  const HILITE = [0.2, 1, 0.8, 1];
  const norm = s => String(s || "").toLowerCase().replace(/[_\-.]+/g, " ").trim();
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lookup = name => { const n = norm(name); return INFO.find(it => it.k.some(k => n.includes(k))) || null; };
  const side = name => { const m = /_([LR])$/.exec(name || ""); return m ? (m[1] === "R" ? { en: "Right", bn: "ডান" } : { en: "Left", bn: "বাম" }) : null; };
  const label = name => { const it = lookup(name), sd = side(name); return it ? (sd ? sd.en + " " : "") + it.en : name; };

  function init(mv) {
    if (mv.dataset.uriInit) return;
    mv.dataset.uriInit = "1";
    const box = mv.closest(".model-box") || mv.parentElement;

    const head = box.querySelector(".model-head p");
    if (head) head.textContent = "যেকোনো অংশে ট্যাপ/ক্লিক করুন, অথবা নিচের বাটন চাপুন।";

    const panel = document.createElement("div");
    panel.style.cssText = "padding:16px 18px;border-top:1px solid var(--line);min-height:90px;background:rgba(255,255,255,.03)";
    panel.innerHTML = '<span style="color:var(--mu)">মডেলের কোনো অংশে ট্যাপ করুন…</span>';
    const chips = document.createElement("div");
    chips.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:12px 14px;border-top:1px solid var(--line)";
    const status = document.createElement("div");
    status.style.cssText = "padding:8px 14px;font-size:12px;color:#9fd;background:rgba(0,0,0,.35);border-top:1px solid var(--line);word-break:break-word";
    const say = t => { status.textContent = t; console.log("urinary.js:", t); };
    say("✓ urinary.js চালু • model-viewer পাওয়া গেছে • মডেল লোড হচ্ছে…");
    box.appendChild(panel);
    box.appendChild(chips);
    box.appendChild(status);
    mv.addEventListener("error", e => say("✗ মডেল লোড হয়নি: " + ((e.detail && e.detail.sourceError && e.detail.sourceError.message) || "URINARY.glb পাওয়া যায়নি/নষ্ট")));

    const original = new Map();
    let current = null;

    function restore() {
      if (current && original.has(current)) {
        try { current.pbrMetallicRoughness.setBaseColorFactor(original.get(current)); } catch (e) {}
      }
      current = null;
    }

    function select(mat) {
      restore();
      if (!mat) return;
      try {
        if (!original.has(mat)) original.set(mat, mat.pbrMetallicRoughness.baseColorFactor.slice());
        mat.pbrMetallicRoughness.setBaseColorFactor(HILITE);
        current = mat;
      } catch (e) { console.warn("urinary.js highlight:", e); }
      const it = lookup(mat.name), sd = side(mat.name);
      panel.innerHTML = it
        ? '<h3 style="color:var(--gold);font-size:20px;margin-bottom:2px">' + (sd ? esc(sd.en) + " " : "") + esc(it.en) + "</h3>" +
          '<div style="font-weight:600;margin-bottom:6px">' + (sd ? esc(sd.bn) + " " : "") + esc(it.bn) + "</div>" +
          '<p style="color:var(--mu);font-size:15px">' + esc(it.d) + "</p>"
        : '<h3 style="color:var(--gold);font-size:18px">' + esc(mat.name || "(নামহীন)") + "</h3>";
    }

    function buildChips() {
      if (chips.dataset.done || !mv.model) return;
      const mats = mv.model.materials || [];
      if (!mats.length) return;
      chips.dataset.done = "1";
      say("✓ মডেল লোড হয়েছে • " + mats.length + " টি part (নতুন GLB হলে ২০) • tap সুবিধা: " + (typeof mv.materialFromPoint === "function" ? "আছে" : "নেই"));
      mats.forEach(m => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label(m.name);
        b.style.cssText = "all:unset;cursor:pointer;font-size:12.5px;padding:5px 11px;border-radius:99px;border:1px solid var(--line);color:var(--tx);background:var(--card)";
        b.addEventListener("click", () => select(m));
        chips.appendChild(b);
      });
    }
    mv.addEventListener("load", buildChips);
    buildChips();

    /* ট্যাপ: drag হলে ignore */
    let sx = null, sy = null;
    mv.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
    mv.addEventListener("click", e => {
      if (sx !== null && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) return;
      buildChips();
      if (typeof mv.materialFromPoint !== "function") {
        panel.innerHTML = '<span style="color:#ff8a8a">এই ব্রাউজারে ট্যাপ সুবিধা নেই — নিচের বাটন ব্যবহার করুন।</span>';
        return;
      }
      const r = mv.getBoundingClientRect();
      const mat = mv.materialFromPoint(e.clientX - r.left, e.clientY - r.top);
      say("ট্যাপ (" + Math.round(e.clientX - r.left) + "," + Math.round(e.clientY - r.top) + ") → " + (mat ? mat.name : "কোনো অংশ পাওয়া যায়নি"));
      if (mat) select(mat);
    });
  }

  /* model-viewer (URINARY) যখনই DOM-এ আসবে, নিজে থেকে সেটআপ করবে */
  function scan() {
    document.querySelectorAll("model-viewer").forEach(mv => {
      if (/urinary/i.test(mv.getAttribute("src") || "")) init(mv);
    });
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();