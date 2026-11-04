/* heart.js — Cardiovascular System: স্পন্দনশীল 3D হৃৎপিণ্ড
   ব্যবহার: index.html এ bones.js এর নিচের লাইনের পরে যোগ করুন:  <script src="heart.js"></script>
   HEART.glb এর প্রতিটা অংশের material নাম নিচের INFO এর key এর সাথে মেলে। */
(function () {
  "use strict";

  var INFO = {
    right_atrium: ["Right atrium", "ডান অলিন্দ", "চেম্বার · অক্সিজেনবিহীন (নীল) দিক",
      "শরীর থেকে ফেরা অক্সিজেনবিহীন রক্ত SVC ও IVC দিয়ে এখানে জমা হয়। সংকুচিত হয়ে tricuspid valve দিয়ে রক্ত ডান নিলয়ে পাঠায়। এখানেই SA node (হৃৎস্পন্দনের প্রাকৃতিক পেসমেকার) থাকে।"],
    right_ventricle: ["Right ventricle", "ডান নিলয়", "চেম্বার · অক্সিজেনবিহীন (নীল) দিক",
      "Tricuspid valve দিয়ে রক্ত নিয়ে pulmonary valve ও pulmonary trunk দিয়ে ফুসফুসে পাঠায়। ফুসফুস কাছে ও কম চাপের, তাই এর দেয়াল বাম নিলয়ের চেয়ে পাতলা।"],
    left_atrium: ["Left atrium", "বাম অলিন্দ", "চেম্বার · অক্সিজেনযুক্ত (লাল) দিক",
      "ফুসফুস থেকে ৪টি pulmonary vein দিয়ে অক্সিজেনযুক্ত রক্ত এখানে আসে। Mitral (bicuspid) valve দিয়ে রক্ত বাম নিলয়ে পাঠায়।"],
    left_ventricle: ["Left ventricle", "বাম নিলয়", "চেম্বার · অক্সিজেনযুক্ত (লাল) দিক",
      "হৃৎপিণ্ডের সবচেয়ে শক্তিশালী পাম্প, দেয়াল সবচেয়ে মোটা। Aortic valve ও aorta দিয়ে সারা শরীরে উচ্চ চাপে রক্ত পাঠায়। হৃৎপিণ্ডের apex এই নিলয়ের অংশ।"],
    aorta: ["Aorta (ascending, arch, descending)", "অ্যাওর্টা (মহাধমনী)", "বড় রক্তনালী · ধমনী · অক্সিজেনযুক্ত",
      "বাম নিলয় থেকে বের হয়ে ওপরে ওঠে (ascending), বাঁক নেয় (arch), তারপর নিচে নামে (descending)। দেহের সবচেয়ে বড় ধমনী। গোড়ায় aortic valve আছে।"],
    arch_branches: ["Branches of the aortic arch", "অ্যাওর্টিক আর্চের শাখা", "বড় রক্তনালী · ধমনী · অক্সিজেনযুক্ত",
      "Brachiocephalic trunk, left common carotid ও left subclavian artery। মাথা, ঘাড় ও দুই হাতে রক্ত পৌঁছায়।"],
    pulmonary_trunk: ["Pulmonary trunk", "পালমোনারি ট্রাঙ্ক", "বড় রক্তনালী · ধমনী · অক্সিজেনবিহীন",
      "ডান নিলয় থেকে বের হয়ে দুই ভাগ হয়ে ফুসফুসে যায়। এটি একটি ধমনী হলেও অক্সিজেনবিহীন রক্ত বহন করে। গোড়ায় pulmonary valve আছে।"],
    pulm_artery_R: ["Right pulmonary artery", "ডান পালমোনারি ধমনী", "বড় রক্তনালী · ধমনী · অক্সিজেনবিহীন",
      "ডান ফুসফুসে অক্সিজেনবিহীন রক্ত নিয়ে যায়। Ascending aorta র পেছন দিয়ে যায়।"],
    pulm_artery_L: ["Left pulmonary artery", "বাম পালমোনারি ধমনী", "বড় রক্তনালী · ধমনী · অক্সিজেনবিহীন",
      "বাম ফুসফুসে অক্সিজেনবিহীন রক্ত নিয়ে যায়।"],
    pv_R: ["Right pulmonary veins", "ডান পালমোনারি শিরা (২টি)", "বড় রক্তনালী · শিরা · অক্সিজেনযুক্ত",
      "ডান ফুসফুস থেকে অক্সিজেনযুক্ত রক্ত বাম অলিন্দে আনে। এটি শিরা হলেও অক্সিজেনযুক্ত রক্ত বহন করে।"],
    pv_L: ["Left pulmonary veins", "বাম পালমোনারি শিরা (২টি)", "বড় রক্তনালী · শিরা · অক্সিজেনযুক্ত",
      "বাম ফুসফুস থেকে অক্সিজেনযুক্ত রক্ত বাম অলিন্দে আনে।"],
    svc: ["Superior vena cava (SVC)", "ঊর্ধ্ব মহাশিরা", "বড় রক্তনালী · শিরা · অক্সিজেনবিহীন",
      "মাথা, ঘাড় ও হাত থেকে অক্সিজেনবিহীন রক্ত ডান অলিন্দে আনে।"],
    ivc: ["Inferior vena cava (IVC)", "নিম্ন মহাশিরা", "বড় রক্তনালী · শিরা · অক্সিজেনবিহীন",
      "দেহের নিচের অংশ (পেট ও পা) থেকে অক্সিজেনবিহীন রক্ত ডান অলিন্দে আনে।"],
    coronary_LAD: ["Left anterior descending (LAD) artery", "বাম অগ্র অবরোহী করোনারি ধমনী", "করোনারি ধমনী (হৃৎপিণ্ডের নিজস্ব রক্তনালী)",
      "বাম করোনারি ধমনীর বড় শাখা। বাম নিলয়ের সামনের অংশ ও ventricular septum এ রক্ত দেয়। এটি বন্ধ হলে heart attack (MI) এর সবচেয়ে সাধারণ কারণ হয়।"],
    coronary_RCA: ["Right coronary artery (RCA)", "ডান করোনারি ধমনী", "করোনারি ধমনী (হৃৎপিণ্ডের নিজস্ব রক্তনালী)",
      "ডান অলিন্দ, ডান নিলয় এবং SA node এ রক্ত সরবরাহ করে। Aorta র গোড়া থেকে বের হয়।"]
  };
  var ORDER = ["right_atrium", "right_ventricle", "left_atrium", "left_ventricle", "aorta", "arch_branches", "pulmonary_trunk",
    "pulm_artery_R", "pulm_artery_L", "pv_R", "pv_L", "svc", "ivc", "coronary_LAD", "coronary_RCA"];

  // রক্তপ্রবাহের ধাপ
  var TOUR = [
    { k: ["svc", "ivc"], t: "ধাপ ১ · শরীর থেকে ফেরা: দেহের ব্যবহৃত অক্সিজেনবিহীন রক্ত Superior ও Inferior vena cava দিয়ে হৃৎপিণ্ডে ফিরে আসে।" },
    { k: ["right_atrium"], t: "ধাপ ২ · ডান অলিন্দ: রক্ত এখানে জমা হয়। অলিন্দ সংকুচিত হয়ে tricuspid valve দিয়ে রক্ত ডান নিলয়ে ঠেলে দেয়।" },
    { k: ["right_ventricle"], t: "ধাপ ৩ · ডান নিলয়: নিলয় সংকুচিত হলে tricuspid valve বন্ধ হয় (এটাই ‘লাব’ শব্দ), আর pulmonary valve খুলে রক্ত বেরিয়ে যায়।" },
    { k: ["pulmonary_trunk", "pulm_artery_R", "pulm_artery_L"], t: "ধাপ ৪ · ফুসফুসে যাত্রা: Pulmonary trunk ও দুই pulmonary artery দিয়ে রক্ত ফুসফুসে যায়। সেখানে CO₂ ছেড়ে O₂ নেয়।" },
    { k: ["pv_R", "pv_L"], t: "ধাপ ৫ · ফুসফুস থেকে ফেরা: ৪টি pulmonary vein অক্সিজেনযুক্ত রক্ত বাম অলিন্দে নিয়ে আসে।" },
    { k: ["left_atrium"], t: "ধাপ ৬ · বাম অলিন্দ: সংকুচিত হয়ে mitral valve দিয়ে রক্ত বাম নিলয়ে পাঠায়।" },
    { k: ["left_ventricle"], t: "ধাপ ৭ · বাম নিলয়: সবচেয়ে শক্তিশালী সংকোচন! Mitral valve বন্ধ হয় (‘লাব’), aortic valve খুলে রক্ত aorta য় ঢোকে।" },
    { k: ["aorta", "arch_branches"], t: "ধাপ ৮ · সারা শরীরে: Aorta ও তার শাখা দিয়ে অক্সিজেনযুক্ত রক্ত মস্তিষ্ক, হাত ও পুরো দেহে যায়। Aortic ও pulmonary valve বন্ধ হলে ‘ডাব’ শব্দ হয়।" },
    { k: ["coronary_LAD", "coronary_RCA"], t: "ধাপ ৯ · হৃৎপিণ্ডের নিজের খাবার: Aorta র গোড়া থেকে বের হওয়া ডান ও বাম করোনারি ধমনী হৃৎপিণ্ডের পেশিতে রক্ত দেয়।" }
  ];

  var HILITE = [1.0, 0.82, 0.15, 1];

  var st = document.createElement("style");
  st.textContent =
    ".heart-info{margin:0;padding:14px 16px;border-top:1px solid var(--line);background:rgba(230,198,92,.07);min-height:110px}" +
    ".heart-info .hi-hint{color:var(--mu);font-size:14px;text-align:center;padding:12px 0;line-height:1.7}" +
    ".heart-info .hi-en{color:var(--gold);font-size:19px;font-weight:700;line-height:1.3}" +
    ".heart-info .hi-bn{color:var(--tx);font-size:16px;margin-top:2px}" +
    ".heart-info .hi-meta{display:inline-block;margin-top:8px;padding:3px 12px;border-radius:99px;border:1px solid var(--line);color:var(--gold);font-size:12.5px}" +
    ".heart-info .hi-note{color:var(--mu);font-size:14.5px;margin-top:8px;line-height:1.7}" +
    ".heart-info .hi-step{color:var(--tx);font-size:15.5px;line-height:1.75}" +
    ".heart-info .hi-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:middle}" +
    ".heart-tools{display:flex;gap:8px;flex-wrap:wrap;padding:10px 14px;border-top:1px solid var(--line)}" +
    ".heart-tools select{flex:1 1 180px;min-width:0;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg2);color:var(--tx);font:inherit;font-size:14.5px}" +
    ".heart-tools button{padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--gold);font:inherit;font-size:14px;font-weight:600;cursor:pointer}" +
    ".heart-tools button:active{transform:scale(.96)}" +
    ".heart-tools button[disabled]{opacity:.4}" +
    ".heart-tools .ht-main{background:var(--gold);color:#1a1205}";
  document.head.appendChild(st);
  var st2 = document.createElement("style");
  st2.textContent =
    ".bone-tip{position:absolute;display:none;z-index:5;pointer-events:none;background:rgba(8,11,20,.94);border:1px solid var(--gold);color:var(--tx);padding:7px 13px;border-radius:12px;font-size:14px;line-height:1.4;max-width:78%;box-shadow:0 8px 24px rgba(0,0,0,.6)}" +
    ".bone-tip b{display:block;color:var(--gold);font-size:15.5px}.bone-tip span{font-size:12.5px;color:var(--mu)}";
  document.head.appendChild(st2);

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var LEGEND = '<span class="hi-dot" style="background:#4d73d1"></span>নীল = অক্সিজেনবিহীন রক্ত &nbsp; <span class="hi-dot" style="background:#d12a2e"></span>লাল = অক্সিজেনযুক্ত রক্ত &nbsp; <span class="hi-dot" style="background:#f7a82e"></span>করোনারি ধমনী';
  var HINT = '<div class="hi-hint">👆 হৃৎপিণ্ডের যেকোনো অংশে ট্যাপ করুন, অথবা <b>“রক্তপ্রবাহ দেখুন”</b> চাপুন<br>' + LEGEND + "</div>";

  function setup() {
    var mv = document.querySelector("#apContent model-viewer");
    if (!mv) return;
    if (!/HEART\.glb$/i.test(mv.getAttribute("src") || "")) return;
    var box = mv.closest(".model-box");
    if (!box || box.dataset.heart) return;
    box.dataset.heart = "1";

    mv.setAttribute("autoplay", "");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("exposure", "1.15");
    mv.setAttribute("shadow-intensity", "0.6");
    mv.setAttribute("touch-action", "pan-y");
    mv.setAttribute("camera-orbit", "-15deg 78deg auto");
    mv.setAttribute("interaction-prompt", "none");
    mv.style.height = Math.min(560, Math.round(window.innerHeight * 0.6)) + "px";

    var head = box.querySelector(".model-head p");
    if (head) head.textContent = "হৃৎপিণ্ড নিজে স্পন্দন করছে। যেকোনো অংশে ট্যাপ করুন, অথবা রক্তপ্রবাহের ধাপগুলো দেখুন।";

    var info = document.createElement("div"); info.className = "heart-info"; info.innerHTML = HINT;
    var tools = document.createElement("div"); tools.className = "heart-tools";
    var bTour = el("button", "▶ রক্তপ্রবাহ দেখুন", "ht-main");
    var bPrev = el("button", "◀"); var bNext = el("button", "▶");
    bPrev.disabled = true; bNext.disabled = true;
    var bBeat = el("button", "⏸ স্পন্দন বন্ধ");
    var sel = document.createElement("select");
    sel.innerHTML = '<option value="1">স্পন্দন: স্বাভাবিক (≈70/মিনিট)</option><option value="0.4">ধীরে (≈28/মিনিট)</option><option value="1.6">দ্রুত (≈110/মিনিট)</option>';
    var bPick = document.createElement("select");
    var oh = '<option value="">📋 অংশ বাছাই করুন…</option>';
    ORDER.forEach(function (k) { oh += '<option value="' + k + '">' + esc(INFO[k][1] + " — " + INFO[k][0]) + "</option>"; });
    bPick.innerHTML = oh;
    var bClr = el("button", "↺ রিসেট");
    [bTour, bPrev, bNext, bBeat, sel, bPick, bClr].forEach(function (n) { tools.appendChild(n); });
    var helpEl = box.querySelector(".model-help");
    box.insertBefore(info, helpEl); box.insertBefore(tools, helpEl);

    function el(tag, txt, cls) { var e = document.createElement(tag); e.textContent = txt; if (cls) e.className = cls; return e; }

    // --- হাইলাইট ---
    var lit = [];
    function matByName(k) {
      var ms = (mv.model && mv.model.materials) || [];
      for (var i = 0; i < ms.length; i++) if (ms[i].name === k) return ms[i];
      return null;
    }
    function clearLit() {
      lit.forEach(function (o) { try { o.m.pbrMetallicRoughness.setBaseColorFactor(o.c); } catch (e) {} });
      lit = [];
    }
    function highlight(keys) {
      clearLit();
      keys.forEach(function (k) {
        var m = matByName(k); if (!m) return;
        try { lit.push({ m: m, c: m.pbrMetallicRoughness.baseColorFactor.slice() }); m.pbrMetallicRoughness.setBaseColorFactor(HILITE); } catch (e) {}
      });
    }

    var tour = -1;
    function showPart(k) {
      var d = INFO[k]; if (!d) return;
      tour = -1; bPrev.disabled = true; bNext.disabled = true; bTour.textContent = "▶ রক্তপ্রবাহ দেখুন";
      highlight([k]);
      info.innerHTML = '<div class="hi-en">' + esc(d[0]) + '</div><div class="hi-bn">' + esc(d[1]) + '</div><span class="hi-meta">' + esc(d[2]) + '</span><div class="hi-note">' + esc(d[3]) + "</div>";
      bPick.value = k;
    }
    function showStep(i) {
      tour = Math.max(0, Math.min(TOUR.length - 1, i));
      var s = TOUR[tour];
      highlight(s.k);
      info.innerHTML = '<div class="hi-step">' + esc(s.t) + '</div><div class="hi-hint" style="padding:6px 0 0">ধাপ ' + (tour + 1) + " / " + TOUR.length + "</div>";
      bPrev.disabled = tour === 0; bNext.disabled = tour === TOUR.length - 1;
      bTour.textContent = tour === TOUR.length - 1 ? "↺ আবার শুরু" : "▶ পরের ধাপ";
      bPick.value = "";
    }
    bTour.addEventListener("click", function () { showStep(tour < 0 || tour === TOUR.length - 1 ? 0 : tour + 1); });
    bPrev.addEventListener("click", function () { showStep(tour - 1); });
    bNext.addEventListener("click", function () { showStep(tour + 1); });
    bPick.addEventListener("change", function () { if (bPick.value) showPart(bPick.value); });
    bClr.addEventListener("click", function () {
      clearLit(); tour = -1; bPrev.disabled = true; bNext.disabled = true; bTour.textContent = "▶ রক্তপ্রবাহ দেখুন";
      bPick.value = ""; info.innerHTML = HINT;
      mv.cameraOrbit = "-15deg 78deg auto"; mv.fieldOfView = "auto";
    });
    // --- স্পন্দন নিয়ন্ত্রণ ---
    var beating = true;
    bBeat.addEventListener("click", function () {
      try {
        if (beating) { mv.pause(); bBeat.textContent = "▶ স্পন্দন চালু"; }
        else { mv.play(); bBeat.textContent = "⏸ স্পন্দন বন্ধ"; }
        beating = !beating;
      } catch (e) {}
    });
    sel.addEventListener("change", function () { try { mv.timeScale = parseFloat(sel.value) || 1; } catch (e) {} });

    // --- ট্যাপ করে অংশ চেনা ---
    box.style.position = "relative";
    var tip = document.createElement("div"); tip.className = "bone-tip"; box.appendChild(tip);
    var tipT = null;
    function showTip(cx, cy, en, bn) {
      var r = box.getBoundingClientRect();
      tip.innerHTML = "<b>" + esc(bn) + "</b>" + (en ? "<span>" + esc(en) + "</span>" : "");
      tip.style.display = "block";
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var x = Math.max(8, Math.min(r.width - w - 8, cx - r.left - w / 2));
      var y = Math.max(8, cy - r.top - h - 16);
      tip.style.left = x + "px"; tip.style.top = y + "px";
      clearTimeout(tipT); tipT = setTimeout(function () { tip.style.display = "none"; }, 4000);
    }
    var down = null;
    mv.addEventListener("pointerdown", function (e) {
      down = [e.clientX, e.clientY, Date.now()];
      if (mv.hasAttribute("auto-rotate")) mv.removeAttribute("auto-rotate");   // ঘোরা থামাই, যাতে সঠিক জায়গা ধরা যায়
    });
    mv.addEventListener("pointerup", function (e) {
      if (!down) return;
      var moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]), dt = Date.now() - down[2];
      down = null;
      if (moved > 8 || dt > 700) return;      // টেনে ঘোরানো হলে ট্যাপ ধরি না
      tapAt(e.clientX, e.clientY);
    });
    function tapAt(x, y) {
      if (typeof mv.materialFromPoint !== "function") { showTip(x, y, "", "⚠ model-viewer পুরনো সংস্করণ — index.html এ লাইব্রেরির লাইন আপডেট করুন"); return; }
      if (!mv.model) { showTip(x, y, "", "মডেল লোড হচ্ছে…"); return; }
      var m = mv.materialFromPoint(x, y);
      if (!m) return;
      var d = INFO[m.name];
      if (d) { showPart(m.name); showTip(x, y, d[0], d[1]); }
      else showTip(x, y, "", "অংশ: " + m.name + " (তথ্য নেই)");
    }
  }

  function scan() { try { setup(); } catch (e) { console.error("heart.js:", e); } }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
  console.log("[heart.js] লোড হয়েছে");
})();
