/* digestive.js — Digestive System: tap any organ to see its name, plus the full mouth-to-anus journey of food.
   Add to index.html, just before </body>, after the other scripts:  <script src="digestive.js"></script>
   Every part of DIGESTIVE.glb has a material name that matches a key in INFO below. */
(function () {
  "use strict";

  var G_GI = "Alimentary canal (GI tract)", G_AC = "Accessory organs", G_OT = "Other";
  // key: [name, category, function / process]
  var INFO = {
    oral_cavity: ["Mouth (oral cavity) & lips", "GI tract · Upper · Ingestion",
      "Food enters the body here (ingestion). Chewing breaks food into small pieces (mechanical digestion) and saliva starts chemical digestion. The tongue and cheeks shape the chewed food into a soft ball called a bolus."],
    tongue: ["Tongue", "GI tract · Upper · Mechanical digestion",
      "A muscular organ that moves food around during chewing, mixes it with saliva, forms the bolus and pushes it back to start swallowing. Taste buds on its surface sense sweet, salty, sour, bitter and umami. Lingual lipase begins fat digestion."],
    teeth: ["Teeth", "GI tract · Upper · Mechanical digestion",
      "Incisors cut, canines tear, premolars and molars grind. An adult has 32 teeth. Chewing (mastication) greatly increases the surface area of food so that enzymes can work faster."],
    parotid_L: ["Left parotid gland", "Accessory organ · Salivary gland · Secretion",
      "The largest salivary gland, in front of the ear. Its watery, enzyme-rich saliva (salivary amylase) starts breaking starch into maltose. Mumps is an infection of this gland."],
    parotid_R: ["Right parotid gland", "Accessory organ · Salivary gland · Secretion",
      "The largest salivary gland, in front of the ear. Its watery, enzyme-rich saliva (salivary amylase) starts breaking starch into maltose. Mumps is an infection of this gland."],
    submandibular_L: ["Left submandibular gland", "Accessory organ · Salivary gland · Secretion",
      "Lies under the jaw. Produces about 70% of resting saliva: a mixed watery and mucous secretion that moistens and lubricates food."],
    submandibular_R: ["Right submandibular gland", "Accessory organ · Salivary gland · Secretion",
      "Lies under the jaw. Produces about 70% of resting saliva: a mixed watery and mucous secretion that moistens and lubricates food."],
    sublingual_L: ["Left sublingual gland", "Accessory organ · Salivary gland · Secretion",
      "The smallest major salivary gland, under the tongue. Mostly thick, mucous saliva that lubricates the bolus. Together the salivary glands make roughly 1–1.5 litres of saliva a day."],
    sublingual_R: ["Right sublingual gland", "Accessory organ · Salivary gland · Secretion",
      "The smallest major salivary gland, under the tongue. Mostly thick, mucous saliva that lubricates the bolus. Together the salivary glands make roughly 1–1.5 litres of saliva a day."],
    pharynx: ["Pharynx (throat)", "GI tract · Upper · Propulsion (swallowing)",
      "Shared pathway for food and air. During swallowing (deglutition) the soft palate rises and the epiglottis closes the airway so food goes into the esophagus and not the windpipe. The first part is voluntary, the rest is an automatic reflex."],
    esophagus: ["Esophagus", "GI tract · Upper · Propulsion (peristalsis)",
      "A muscular tube about 25 cm long. Waves of contraction called peristalsis push the bolus down to the stomach in about 5–8 seconds, even if you are upside down. Mucus lubricates it; no digestion or absorption happens here."],
    stomach: ["Stomach", "GI tract · Upper · Mechanical + chemical digestion",
      "A J-shaped muscular bag. It churns food (mechanical digestion) with gastric juice: hydrochloric acid (pH about 1.5–3.5) kills microbes and activates pepsin, which starts protein digestion. Gastric lipase digests some fat, intrinsic factor is made for vitamin B12 absorption and mucus protects the wall. Food becomes a thick liquid called chyme. Little absorption happens here (some water, alcohol, aspirin)."],
    pyloric_sphincter: ["Pyloric sphincter", "GI tract · Upper · Propulsion control",
      "A ring of muscle between the stomach and duodenum. It opens in small squirts to release chyme slowly, so the small intestine is not overwhelmed, and stops chyme flowing back."],
    liver: ["Liver", "Accessory organ · Secretion + metabolism",
      "The largest internal organ. It makes bile (about 500–1000 mL a day) that emulsifies fat into tiny droplets. It also processes absorbed nutrients, stores glycogen, vitamins and iron, makes plasma proteins and clotting factors, and detoxifies drugs, alcohol and ammonia."],
    gallbladder: ["Gallbladder", "Accessory organ · Storage",
      "A small pear-shaped sac under the liver. It stores and concentrates bile. When fatty food reaches the duodenum, the hormone cholecystokinin (CCK) makes the gallbladder contract and squirt bile out. Gallstones form here."],
    bile_duct: ["Common bile duct", "Accessory organ · Duct",
      "Carries bile from the liver and gallbladder to the duodenum. It joins the pancreatic duct at the hepatopancreatic ampulla (ampulla of Vater), controlled by the sphincter of Oddi."],
    spleen: ["Spleen (not part of digestion)", "Nearby organ · Lymphatic",
      "Shown for orientation. It lies behind the stomach, filters old red blood cells and helps immune defence. It is not part of the digestive tract."],
    pancreas: ["Pancreas", "Accessory organ · Secretion",
      "A gland behind the stomach with two jobs. Exocrine: pancreatic juice with amylase (carbohydrates), lipase (fats), trypsin and chymotrypsin (proteins) and nucleases, plus bicarbonate to neutralise stomach acid. Endocrine: insulin and glucagon from the islets of Langerhans control blood sugar."],
    duodenum: ["Duodenum (1st part of small intestine)", "GI tract · Small intestine · Chemical digestion",
      "The first, C-shaped, 25 cm of the small intestine. Chyme mixes with bile and pancreatic juice here, so most chemical digestion happens in this part. Bicarbonate from Brunner's glands neutralises acid. Hormones secretin and CCK are released. Iron and calcium are absorbed here."],
    jejunum: ["Jejunum (2nd part of small intestine)", "GI tract · Small intestine · Absorption",
      "The main site of absorption. The lining has circular folds, villi and microvilli that multiply the surface area enormously. Brush-border enzymes finish digestion, and sugars, amino acids, fatty acids, vitamins and most water are absorbed into blood and lymph."],
    ileum: ["Ileum (3rd part of small intestine)", "GI tract · Small intestine · Absorption",
      "The last and longest part. It absorbs vitamin B12 (with intrinsic factor) and bile salts (which return to the liver: enterohepatic circulation). Peyer's patches (lymphoid tissue) guard against bacteria. Leftovers pass through the ileocecal valve into the large intestine."],
    cecum: ["Cecum (and ileocecal valve)", "GI tract · Large intestine · Water absorption",
      "A pouch at the start of the large intestine, in the lower right abdomen. The ileocecal valve lets material in from the ileum and blocks backflow. Gut bacteria start fermenting undigested fibre here."],
    appendix: ["Appendix", "GI tract · Large intestine · Immune",
      "A narrow worm-like pouch attached to the cecum. It contains lymphoid tissue and may act as a reservoir for helpful gut bacteria. Inflammation (appendicitis) causes pain that begins near the navel and moves to the lower right abdomen."],
    ascending_colon: ["Ascending colon", "GI tract · Large intestine · Absorption of water",
      "Runs up the right side to the hepatic flexure under the liver. Absorbs water and electrolytes, and bacteria ferment fibre into short-chain fatty acids and make vitamin K and some B vitamins."],
    transverse_colon: ["Transverse colon", "GI tract · Large intestine · Absorption of water",
      "Crosses the abdomen from right to left, hanging below the stomach. It keeps absorbing water and slowly moves contents along using strong 'mass movements' a few times a day, often after meals (gastrocolic reflex)."],
    descending_colon: ["Descending colon", "GI tract · Large intestine · Storage",
      "Runs down the left side from the splenic flexure. Contents here are already semi-solid; it stores feces until they move on to the sigmoid colon."],
    sigmoid_colon: ["Sigmoid colon", "GI tract · Large intestine · Compaction",
      "An S-shaped loop that joins the descending colon to the rectum. The last of the water is absorbed and feces become firm. Strong contractions push feces into the rectum."],
    rectum: ["Rectum", "GI tract · Large intestine · Storage",
      "Stores feces for a short time. When it stretches, stretch receptors send signals that produce the urge to defecate (defecation reflex), and the internal anal sphincter relaxes automatically."],
    anal_canal: ["Anal canal and anus", "GI tract · Elimination (defecation)",
      "The last 3–4 cm of the GI tract, opening to the outside at the anus. Feces leave the body here during defecation, helped by the rise in abdominal pressure (straining)."],
    anal_sphincters: ["Internal and external anal sphincters", "GI tract · Elimination control",
      "The internal sphincter (smooth muscle) opens automatically when the rectum is full. The external sphincter (skeletal muscle) is under voluntary control, so we can choose when to defecate."],
    food_marker: ["Food marker (glowing bead)", "Animation",
      "This bead shows the path of food from the mouth to the anus. In real life the journey takes about 24–72 hours: seconds in the esophagus, 2–4 hours in the stomach, 3–6 hours in the small intestine and 10–59 hours in the large intestine. Here it is shown in fast forward."]
  };

  var LIST = [
    [G_GI, ["oral_cavity", "tongue", "teeth", "pharynx", "esophagus", "stomach", "pyloric_sphincter", "duodenum", "jejunum", "ileum", "cecum", "appendix",
      "ascending_colon", "transverse_colon", "descending_colon", "sigmoid_colon", "rectum", "anal_canal", "anal_sphincters"]],
    [G_AC, ["parotid_L", "parotid_R", "submandibular_L", "submandibular_R", "sublingual_L", "sublingual_R", "liver", "gallbladder", "bile_duct", "pancreas"]],
    [G_OT, ["spleen"]]
  ];

  // The 8 basic digestive processes, each highlights the organs that do the job
  var PROCESSES = [
    ["Ingestion", ["oral_cavity", "tongue", "teeth"],
      "Taking food into the mouth. The lips, teeth and tongue take in, bite and manipulate the food."],
    ["Mechanical digestion", ["teeth", "tongue", "stomach", "duodenum", "jejunum", "ileum"],
      "Physical breakdown that does not change the chemistry: chewing in the mouth, churning in the stomach, and 'segmentation' (mixing contractions) in the small intestine."],
    ["Secretion", ["parotid_L", "parotid_R", "submandibular_L", "submandibular_R", "sublingual_L", "sublingual_R", "stomach", "liver", "pancreas", "duodenum", "jejunum", "ileum"],
      "Release of water, acid, buffers, enzymes and bile into the tract: about 7 litres a day in total. Sources: salivary glands, stomach, liver (bile), pancreas and the intestinal wall."],
    ["Chemical digestion", ["parotid_L", "parotid_R", "submandibular_L", "submandibular_R", "sublingual_L", "sublingual_R", "stomach", "pancreas", "liver", "gallbladder", "bile_duct", "duodenum", "jejunum", "ileum"],
      "Enzymes break large molecules into small absorbable ones: carbohydrates → simple sugars (amylase in saliva and pancreas, brush-border enzymes), proteins → amino acids (pepsin, trypsin, peptidases), fats → fatty acids and glycerol (lipases, helped by bile)."],
    ["Propulsion", ["pharynx", "esophagus", "stomach", "pyloric_sphincter", "duodenum", "jejunum", "ileum", "ascending_colon", "transverse_colon", "descending_colon", "sigmoid_colon", "rectum"],
      "Moving food along the tract. Swallowing pushes food from the mouth to the esophagus; peristalsis (waves of contraction) moves it onward; mass movements push feces through the colon."],
    ["Absorption", ["duodenum", "jejunum", "ileum", "stomach", "ascending_colon", "transverse_colon", "cecum"],
      "Passage of nutrients, water, vitamins and minerals from the tract into blood and lymph. About 90% occurs in the small intestine (villi and microvilli); the colon absorbs most remaining water and electrolytes."],
    ["Compaction and fermentation", ["cecum", "appendix", "ascending_colon", "transverse_colon", "descending_colon", "sigmoid_colon"],
      "Water absorption turns liquid waste into semi-solid feces, while gut bacteria ferment fibre, make vitamin K and some B vitamins, and keep harmful microbes in check."],
    ["Defecation", ["sigmoid_colon", "rectum", "anal_canal", "anal_sphincters"],
      "Elimination of feces. Rectal stretch triggers the defecation reflex; the internal sphincter relaxes automatically and the external sphincter is relaxed voluntarily."]
  ];

  // Step-by-step journey of a meal
  var TOUR = [
    [["oral_cavity", "tongue", "teeth"], "Step 1 · Mouth. Ingestion and mechanical digestion: teeth chew, the tongue mixes food with saliva and forms a bolus."],
    [["parotid_L", "parotid_R", "submandibular_L", "submandibular_R", "sublingual_L", "sublingual_R"], "Step 2 · Salivary glands. About 1–1.5 L of saliva a day moistens food, and salivary amylase begins to digest starch."],
    [["pharynx"], "Step 3 · Pharynx. Swallowing (deglutition): the epiglottis closes the windpipe and the bolus is pushed into the esophagus."],
    [["esophagus"], "Step 4 · Esophagus. Peristalsis carries the bolus down in seconds; the lower esophageal sphincter then lets it into the stomach and stops acid reflux."],
    [["stomach", "pyloric_sphincter"], "Step 5 · Stomach. Churning plus hydrochloric acid and pepsin turn food into chyme; protein digestion starts. The pyloric sphincter releases chyme in small squirts."],
    [["liver", "gallbladder", "bile_duct", "pancreas"], "Step 6 · Liver, gallbladder and pancreas. Bile (liver, stored in the gallbladder) emulsifies fat; pancreatic juice supplies enzymes and bicarbonate. Both flow into the duodenum."],
    [["duodenum"], "Step 7 · Duodenum. Chyme mixes with bile and pancreatic juice and most chemical digestion happens. Acid is neutralised and iron is absorbed."],
    [["jejunum"], "Step 8 · Jejunum. Main absorption: sugars, amino acids, fatty acids, vitamins and water cross the villi into blood and lymph."],
    [["ileum"], "Step 9 · Ileum. Absorbs vitamin B12 and bile salts; Peyer's patches protect against germs. What remains passes the ileocecal valve."],
    [["cecum", "appendix", "ascending_colon", "transverse_colon", "descending_colon"], "Step 10 · Large intestine (cecum to descending colon). Water and electrolytes are absorbed, and gut bacteria ferment fibre and make vitamin K."],
    [["sigmoid_colon"], "Step 11 · Sigmoid colon. Waste is compacted into firm feces and pushed into the rectum."],
    [["rectum"], "Step 12 · Rectum. Feces are stored. Stretching triggers the urge to defecate (defecation reflex)."],
    [["anal_canal", "anal_sphincters"], "Step 13 · Anus. The internal sphincter relaxes automatically, the external sphincter is relaxed voluntarily, and feces are eliminated (defecation)."]
  ];

  var HILITE = [1.0, 0.82, 0.15, 1];
  var HINT_HTML = '<div class="dg-hint">👆 Tap any organ to see its name and function.<br>Use <b>Follow the food</b> for the step-by-step journey, or <b>Processes</b> to see which organs do each job.<br>The glowing bead shows the path of food from mouth to anus.</div>';

  var st = document.createElement("style");
  st.textContent =
    ".dg-info{margin:0;padding:14px 16px;border-top:1px solid var(--line);background:rgba(230,198,92,.07);min-height:110px}" +
    ".dg-info .dg-hint{color:var(--mu);font-size:14px;text-align:center;padding:12px 0;line-height:1.7}" +
    ".dg-info .dg-name{color:var(--gold);font-size:19px;font-weight:700;line-height:1.3}" +
    ".dg-info .dg-meta{display:inline-block;margin-top:8px;padding:3px 12px;border-radius:99px;border:1px solid var(--line);color:var(--gold);font-size:12.5px}" +
    ".dg-info .dg-note{color:var(--tx);font-size:14.5px;margin-top:8px;line-height:1.7}" +
    ".dg-info .dg-step{color:var(--tx);font-size:15.5px;line-height:1.75}" +
    ".dg-info .dg-sub{color:var(--mu);font-size:13px;padding-top:6px}" +
    ".dg-tools{display:flex;gap:8px;flex-wrap:wrap;padding:10px 14px;border-top:1px solid var(--line)}" +
    ".dg-tools select{flex:1 1 170px;min-width:0;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg2);color:var(--tx);font:inherit;font-size:14.5px}" +
    ".dg-tools button{padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--gold);font:inherit;font-size:14px;font-weight:600;cursor:pointer}" +
    ".dg-tools button:active{transform:scale(.96)}.dg-tools button[disabled]{opacity:.4}" +
    ".dg-tools .dg-main{background:var(--gold);color:#1a1205}" +
    ".bone-tip{position:absolute;display:none;z-index:5;pointer-events:none;background:rgba(8,11,20,.94);border:1px solid var(--gold);color:var(--tx);padding:7px 13px;border-radius:12px;font-size:14px;line-height:1.4;max-width:78%;box-shadow:0 8px 24px rgba(0,0,0,.6)}" +
    ".bone-tip b{display:block;color:var(--gold);font-size:15.5px}.bone-tip span{font-size:12.5px;color:var(--mu)}";
  document.head.appendChild(st);

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function mk(tag, txt, cls) { var e = document.createElement(tag); if (txt) e.textContent = txt; if (cls) e.className = cls; return e; }

  function setup() {
    var mv = document.querySelector("#apContent model-viewer");
    if (!mv) return;
    var title = (document.querySelector("#apContent h2") || {}).textContent || "";
    if (!/DIGESTIVE\.glb$/i.test(mv.getAttribute("src") || "") && !/digestive/i.test(title)) return;
    var box = mv.closest(".model-box");
    if (!box || box.dataset.dg) return;
    box.dataset.dg = "1";

    mv.setAttribute("autoplay", "");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("exposure", "1.15");
    mv.setAttribute("shadow-intensity", "0.5");
    mv.setAttribute("touch-action", "pan-y");
    mv.setAttribute("camera-orbit", "0deg 82deg auto");
    mv.setAttribute("interaction-prompt", "none");
    mv.style.height = Math.min(640, Math.round(window.innerHeight * 0.68)) + "px";

    var head = box.querySelector(".model-head p");
    if (head) head.textContent = "Tap any organ to see its name. Drag to rotate, pinch to zoom.";

    var info = mk("div", "", "dg-info"); info.innerHTML = HINT_HTML;
    var tools = mk("div", "", "dg-tools");
    var bTour = mk("button", "▶ Follow the food", "dg-main");
    var bPrev = mk("button", "◀"), bNext = mk("button", "▶"); bPrev.disabled = true; bNext.disabled = true;
    var selProc = document.createElement("select");
    selProc.innerHTML = '<option value="">⚙ Processes…</option>' + PROCESSES.map(function (p, i) { return '<option value="' + i + '">' + esc(p[0]) + "</option>"; }).join("");
    var selPart = document.createElement("select");
    var oh = '<option value="">📋 Choose an organ…</option>';
    LIST.forEach(function (g) {
      oh += '<optgroup label="' + esc(g[0]) + '">';
      g[1].forEach(function (k) { oh += '<option value="' + k + '">' + esc(INFO[k][0]) + "</option>"; });
      oh += "</optgroup>";
    });
    selPart.innerHTML = oh;
    var bAnim = mk("button", "⏸ Pause food");
    var selSpd = document.createElement("select");
    selSpd.innerHTML = '<option value="1">Speed: normal</option><option value="0.5">Slow</option><option value="2">Fast</option>';
    var bClr = mk("button", "↺ Reset");
    [bTour, bPrev, bNext, selProc, selPart, bAnim, selSpd, bClr].forEach(function (n) { tools.appendChild(n); });
    var helpEl = box.querySelector(".model-help");
    box.insertBefore(info, helpEl); box.insertBefore(tools, helpEl);

    // ---- highlighting ----
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
    function resetTourUi() { tour = -1; bPrev.disabled = true; bNext.disabled = true; bTour.textContent = "▶ Follow the food"; }
    function showPart(k) {
      var d = INFO[k]; if (!d) return;
      resetTourUi(); selProc.value = ""; highlight([k]);
      info.innerHTML = '<div class="dg-name">' + esc(d[0]) + '</div><span class="dg-meta">' + esc(d[1]) + '</span><div class="dg-note">' + esc(d[2]) + "</div>";
      selPart.value = k;
    }
    function showProcess(i) {
      var p = PROCESSES[i]; resetTourUi(); selPart.value = ""; highlight(p[1]);
      info.innerHTML = '<div class="dg-name">' + esc(p[0]) + '</div><div class="dg-note">' + esc(p[2]) + '</div><div class="dg-sub">Highlighted organs: ' +
        esc(p[1].filter(function (k, j, a) { return a.indexOf(k) === j && !/_R$/.test(k); }).map(function (k) { return INFO[k][0].replace(/^Left /, ""); }).join(", ")) + "</div>";
    }
    function showStep(i) {
      tour = Math.max(0, Math.min(TOUR.length - 1, i)); var s = TOUR[tour];
      highlight(s[0]); selProc.value = ""; selPart.value = "";
      info.innerHTML = '<div class="dg-step">' + esc(s[1]) + '</div><div class="dg-sub">Step ' + (tour + 1) + " of " + TOUR.length + "</div>";
      bPrev.disabled = tour === 0; bNext.disabled = tour === TOUR.length - 1;
      bTour.textContent = tour === TOUR.length - 1 ? "↺ Start again" : "▶ Next step";
    }
    bTour.addEventListener("click", function () { showStep(tour < 0 || tour === TOUR.length - 1 ? 0 : tour + 1); });
    bPrev.addEventListener("click", function () { showStep(tour - 1); });
    bNext.addEventListener("click", function () { showStep(tour + 1); });
    selProc.addEventListener("change", function () { if (selProc.value !== "") showProcess(+selProc.value); });
    selPart.addEventListener("change", function () { if (selPart.value) showPart(selPart.value); });
    bClr.addEventListener("click", function () {
      clearLit(); resetTourUi(); selProc.value = ""; selPart.value = ""; info.innerHTML = HINT_HTML;
      mv.cameraOrbit = "0deg 82deg auto"; mv.fieldOfView = "auto";
    });

    // ---- food animation controls ----
    var playing = true;
    bAnim.addEventListener("click", function () {
      try {
        if (playing) { mv.pause(); bAnim.textContent = "▶ Play food"; } else { mv.play(); bAnim.textContent = "⏸ Pause food"; }
        playing = !playing;
      } catch (e) {}
    });
    selSpd.addEventListener("change", function () { try { mv.timeScale = parseFloat(selSpd.value) || 1; } catch (e) {} });

    // ---- tap to identify (floating label on the model) ----
    box.style.position = "relative";
    var tip = mk("div", "", "bone-tip"); box.appendChild(tip);
    var tipT = null;
    function showTip(cx, cy, name, meta) {
      var r = box.getBoundingClientRect();
      tip.innerHTML = "<b>" + esc(name) + "</b>" + (meta ? "<span>" + esc(meta) + "</span>" : "");
      tip.style.display = "block";
      var w = tip.offsetWidth, h = tip.offsetHeight;
      tip.style.left = Math.max(8, Math.min(r.width - w - 8, cx - r.left - w / 2)) + "px";
      tip.style.top = Math.max(8, cy - r.top - h - 16) + "px";
      clearTimeout(tipT); tipT = setTimeout(function () { tip.style.display = "none"; }, 4000);
    }
    var down = null;
    mv.addEventListener("pointerdown", function (e) {
      down = [e.clientX, e.clientY, Date.now()];
      if (mv.hasAttribute("auto-rotate")) mv.removeAttribute("auto-rotate");
    });
    mv.addEventListener("pointerup", function (e) {
      if (!down) return;
      var moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]), dt = Date.now() - down[2];
      down = null;
      if (moved > 8 || dt > 700) return;
      tapAt(e.clientX, e.clientY);
    });
    function tapAt(x, y) {
      if (typeof mv.materialFromPoint !== "function") { showTip(x, y, "Please update the model-viewer library in index.html", ""); return; }
      if (!mv.model) { showTip(x, y, "Model is still loading…", ""); return; }
      var m = mv.materialFromPoint(x, y);
      if (!m) return;
      var d = INFO[m.name];
      if (d) { showPart(m.name); showTip(x, y, d[0], d[1]); }
      else showTip(x, y, "Part: " + m.name + " (no info)", "");
    }
  }

  function scan() { try { setup(); } catch (e) { console.error("digestive.js:", e); } }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
  console.log("[digestive.js] Loaded");
})();
