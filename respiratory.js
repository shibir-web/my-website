/* respiratory.js — Respiratory System: tap any part to see its name, plus the full nose-to-alveoli journey of a breath of air.
   Add to index.html, just before </body>, after the other scripts:  <script src="respiratory.js"></script>
   Every part of RESPIRATORY.glb has a material name that matches a key in INFO below. */
(function () {
  "use strict";

  var G_UP = "Upper respiratory tract", G_LO = "Lower respiratory tract (airways)", G_LU = "Lungs and breathing muscle", G_OT = "Other";
  // key: [name, category, function / process]
  var INFO = {
    nasal_cavity: ["Nose & nasal cavity", "Upper respiratory tract · Conducting zone · Air conditioning",
      "The normal entrance for air. The cavity is split by the nasal septum and lined with moist, blood-rich mucous membrane. Nose hairs and sticky mucus trap dust and microbes, and the curled turbinate bones (conchae) swirl the air so it is warmed and humidified before it reaches the lungs. Smell receptors (olfactory cells) sit in the roof. Breathing through the mouth skips this filtering."],
    frontal_sinus: ["Frontal sinuses", "Upper respiratory tract · Paranasal sinus",
      "Air-filled spaces in the frontal bone above the eyes, draining into the nose through small ducts. Like the other paranasal sinuses they make mucus, lighten the skull and add resonance to the voice. If the ducts swell shut, mucus builds up and causes sinusitis with a pressure headache."],
    maxillary_sinus_R: ["Right maxillary sinus", "Upper respiratory tract · Paranasal sinus",
      "The largest paranasal sinus, inside the cheekbone beside the nose. Its drainage opening is high on the wall, so it drains poorly when you are upright and is the sinus most often infected. The roots of the upper molar teeth lie very close to its floor."],
    maxillary_sinus_L: ["Left maxillary sinus", "Upper respiratory tract · Paranasal sinus",
      "The largest paranasal sinus, inside the cheekbone beside the nose. Its drainage opening is high on the wall, so it drains poorly when you are upright and is the sinus most often infected. The roots of the upper molar teeth lie very close to its floor."],
    pharynx: ["Pharynx (throat)", "Upper respiratory tract · Shared with the digestive system",
      "A muscular funnel about 13 cm long behind the nose and mouth. The nasopharynx carries air only (adenoids and the openings of the ear tubes are here), the oropharynx carries air and food (tonsils), and the laryngopharynx leads on to the larynx in front and the esophagus behind. It is shown here cut open at the front so you can see the larynx."],
    epiglottis: ["Epiglottis", "Upper respiratory tract · Airway protection",
      "A leaf-shaped flap of elastic cartilage at the top of the larynx. It stays upright during breathing. When you swallow, the larynx rises and the epiglottis folds over the airway like a lid, so food and drink go into the esophagus and not the windpipe."],
    larynx: ["Larynx (voice box)", "Upper respiratory tract · Phonation + airway protection",
      "A box of cartilages (thyroid cartilage, which forms the 'Adam's apple', cricoid and others) about 4–5 cm long. Inside are the vocal folds (vocal cords). Air from the lungs makes them vibrate to produce sound; tighter, shorter folds give a higher pitch. The gap between them is the glottis. The larynx also closes to build pressure for a cough."],
    trachea: ["Trachea (windpipe)", "Lower respiratory tract · Conducting zone",
      "A tube about 11–12 cm long and 2 cm wide that carries air from the larynx to the bronchi. Its lining has ciliated cells and mucus-making goblet cells: the cilia sweep trapped dust and microbes upward towards the throat (the mucociliary escalator). It divides at the level of the sternal angle (about the 4th–5th thoracic vertebra)."],
    tracheal_cartilage: ["Tracheal cartilage rings", "Lower respiratory tract · Support",
      "16–20 C-shaped rings of hyaline cartilage that keep the trachea open so it cannot collapse when air pressure falls during inhalation. The open back of each 'C' faces the esophagus, where the trachealis muscle lets the esophagus bulge when food passes."],
    main_bronchus_R: ["Right main bronchus", "Lower respiratory tract · Conducting zone · Primary bronchus",
      "Wider, shorter (about 2.5 cm) and more vertical (about 25° from the vertical) than the left. Swallowed or inhaled objects therefore enter the right side more often. It divides into three lobar bronchi, one for each lobe of the right lung. The ridge where the trachea splits is the carina, which has a very sensitive cough reflex."],
    main_bronchus_L: ["Left main bronchus", "Lower respiratory tract · Conducting zone · Primary bronchus",
      "Narrower, longer (about 5 cm) and more horizontal (about 45°) than the right. It passes under the aortic arch and in front of the esophagus, then divides into two lobar bronchi for the two lobes of the left lung."],
    bronchial_tree: ["Bronchi (lobar & segmental)", "Lower respiratory tract · Conducting zone",
      "The main bronchi divide into lobar (secondary) bronchi, 3 on the right and 2 on the left, then into segmental (tertiary) bronchi that supply the bronchopulmonary segments: usually 10 on the right and 8–10 on the left. Their walls have cartilage plates and smooth muscle. The lining warms, moistens and cleans the air with mucus and cilia."],
    bronchioles: ["Bronchioles", "Lower respiratory tract · Conducting zone → respiratory zone",
      "Airways narrower than 1 mm with no cartilage, only a wall of smooth muscle. The muscle widens them (bronchodilation, by adrenaline and reliever inhalers) or narrows them (bronchoconstriction, as in asthma) to control airflow. Terminal bronchioles end the conducting zone; the next respiratory bronchioles have a few alveoli in their walls and begin gas exchange."],
    alveoli: ["Alveoli (air sacs)", "Lower respiratory tract · Respiratory zone · Gas exchange",
      "Tiny grape-like sacs, roughly 300–500 million in both lungs, giving a total surface of about 70 m². Each wall is one cell thick and wrapped in capillaries, so the air–blood barrier is only about 0.5 µm. Oxygen diffuses into the blood and carbon dioxide diffuses out, driven by differences in partial pressure. Type II cells make surfactant, which lowers surface tension and stops the sacs collapsing; macrophages ('dust cells') clean up particles."],
    lung_R_upper: ["Right lung – upper lobe", "Lung · Right lung (3 lobes)",
      "The right lung has three lobes (upper, middle, lower) separated by the oblique and horizontal fissures. The upper lobe includes the apex, which reaches above the collarbone, and has 3 segments. Each lung sits in its own pleural cavity, wrapped by two thin membranes (pleura) with a film of fluid so the lungs slide smoothly as you breathe."],
    lung_R_middle: ["Right lung – middle lobe", "Lung · Right lung (3 lobes)",
      "A small wedge at the front of the right lung between the horizontal and oblique fissures, with 2 segments (lateral and medial). Only the right lung has a middle lobe. The left lung has a matching tongue-shaped part called the lingula."],
    lung_R_lower: ["Right lung – lower lobe", "Lung · Right lung (3 lobes)",
      "The largest lobe, lying at the back and bottom of the right lung against the diaphragm, with 5 segments. Because it is the most dependent part, inhaled food or fluid most often ends up here (aspiration pneumonia)."],
    lung_L_upper: ["Left lung – upper lobe", "Lung · Left lung (2 lobes)",
      "The left lung has only two lobes, separated by the oblique fissure, to leave room for the heart. The upper lobe includes the apex and the lingula, and its front edge has the cardiac notch where the heart touches the chest wall."],
    lung_L_lower: ["Left lung – lower lobe", "Lung · Left lung (2 lobes)",
      "Lies at the back and bottom of the left lung, resting on the diaphragm, with about 4–5 segments. Together the lungs hold about 6 litres when full (total lung capacity), but a normal quiet breath moves only about 0.5 litre."],
    diaphragm: ["Diaphragm", "Breathing muscle · Main muscle of inspiration",
      "A dome-shaped sheet of skeletal muscle separating the chest from the abdomen. When it contracts it flattens and moves down (about 1.5 cm in quiet breathing, much more in deep breaths) while the external intercostal muscles lift the ribs. The chest gets bigger, the pressure inside falls (Boyle's law) and air flows in. It is supplied by the phrenic nerve (C3–C5). Quiet exhalation is passive: the muscle relaxes and the elastic lungs recoil. Hiccups are spasms of the diaphragm."],
    heart: ["Heart (not part of the airways)", "Nearby organ · Circulation",
      "Shown for orientation. It sits between the lungs, tilted to the left, and makes the cardiac notch in the left lung. The right side pumps oxygen-poor blood to the lungs through the pulmonary arteries; oxygen-rich blood returns through the pulmonary veins to the left side, which sends it to the body."],
    air_marker: ["Air marker (glowing bead)", "Animation",
      "This bead follows one breath: in through the nose, down the throat, larynx, trachea and bronchi to an alveolus, a pause for gas exchange, then back out the same way. In real life a quiet breath takes about 4 seconds (12–20 breaths a minute) and moves about 0.5 litre of air, roughly 10,000 litres a day. About 150 mL of each breath stays in the airways and never reaches the alveoli (dead space). Here it is shown in slow motion; the lungs and diaphragm move with it."]
  };

  var LIST = [
    [G_UP, ["nasal_cavity", "frontal_sinus", "maxillary_sinus_R", "maxillary_sinus_L", "pharynx", "epiglottis", "larynx"]],
    [G_LO, ["trachea", "tracheal_cartilage", "main_bronchus_R", "main_bronchus_L", "bronchial_tree", "bronchioles", "alveoli"]],
    [G_LU, ["lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower", "diaphragm"]],
    [G_OT, ["heart"]]
  ];

  var LUNGS = ["lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower"];
  var AIRWAY_ALL = ["nasal_cavity", "pharynx", "larynx", "trachea", "main_bronchus_R", "main_bronchus_L", "bronchial_tree", "bronchioles"];

  // The 8 basic respiratory processes, each highlights the parts that do the job
  var PROCESSES = [
    ["Pulmonary ventilation (breathing)", ["diaphragm", "lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower", "trachea", "main_bronchus_R", "main_bronchus_L"],
      "Moving air in and out of the lungs. Inhalation: the diaphragm and external intercostal muscles contract, the chest expands, lung pressure drops below atmospheric pressure and air flows in. Exhalation at rest is passive: the muscles relax and the elastic lungs recoil. Forced exhalation also uses the abdominal and internal intercostal muscles."],
    ["Conditioning the air", ["nasal_cavity", "frontal_sinus", "maxillary_sinus_R", "maxillary_sinus_L", "pharynx", "trachea"],
      "The upper airway filters, warms and moistens incoming air. Nose hairs and mucus trap particles, the rich blood supply warms the air to near body temperature, and moisture brings it to almost 100% humidity so delicate alveoli are not damaged."],
    ["Conduction of air", ["nasal_cavity", "pharynx", "larynx", "trachea", "main_bronchus_R", "main_bronchus_L", "bronchial_tree", "bronchioles"],
      "The conducting zone is the set of tubes from the nose to the terminal bronchioles (about 16 branchings). It only carries air: no gas exchange happens here, so its volume of about 150 mL is called anatomical dead space."],
    ["Gas exchange (external respiration)", ["alveoli", "bronchioles", "lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower"],
      "In the alveoli, oxygen diffuses from the air into the blood and carbon dioxide diffuses from the blood into the air. The barrier is about 0.5 µm thick and the surface about 70 m², so the exchange is fast and efficient."],
    ["Gas transport", ["heart", "alveoli", "lung_R_lower", "lung_L_lower"],
      "Blood carries the gases. About 98% of oxygen is bound to haemoglobin in red blood cells. Carbon dioxide travels mostly as bicarbonate in plasma, some bound to haemoglobin and some dissolved. The right heart pumps blood to the lungs; the left heart sends oxygenated blood to the body."],
    ["Protection and clearance", ["nasal_cavity", "epiglottis", "larynx", "trachea", "tracheal_cartilage", "bronchial_tree"],
      "Defences keep the lungs clean: nose hairs, mucus and cilia (the mucociliary escalator) move trapped particles up to the throat to be swallowed, the epiglottis blocks food, and cough and sneeze reflexes blast out irritants. Alveolar macrophages eat what gets through."],
    ["Voice production (phonation)", ["larynx", "pharynx", "nasal_cavity", "frontal_sinus", "maxillary_sinus_R", "maxillary_sinus_L"],
      "Air pushed up from the lungs makes the vocal folds in the larynx vibrate, creating sound. The pharynx, nasal cavity and sinuses act as resonating chambers that give the voice its tone, and the tongue, lips and teeth shape the sound into speech."],
    ["Control of breathing", ["diaphragm", "lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower"],
      "Breathing is set automatically by the respiratory centres in the medulla and pons of the brainstem, which send signals to the diaphragm through the phrenic nerve. Chemoreceptors mainly sense rising carbon dioxide (falling pH) and speed up breathing; you can also override it voluntarily for a while."]
  ];

  // Step-by-step journey of a breath
  var TOUR = [
    [["nasal_cavity"], "Step 1 · Nose. Air enters through the nostrils. Hairs and mucus filter out dust, and the nasal cavity warms and humidifies the air."],
    [["frontal_sinus", "maxillary_sinus_R", "maxillary_sinus_L"], "Step 2 · Paranasal sinuses. Air-filled spaces that drain into the nose. They add mucus, lighten the skull and give the voice resonance."],
    [["pharynx"], "Step 3 · Pharynx. The throat is a shared passage for air and food. Air passes down the nasopharynx and oropharynx to the laryngopharynx."],
    [["epiglottis", "larynx"], "Step 4 · Larynx. The epiglottis stays open for breathing (and covers the airway when you swallow). The vocal folds open wide to let air pass."],
    [["trachea", "tracheal_cartilage"], "Step 5 · Trachea. C-shaped cartilage rings hold the windpipe open, and cilia sweep trapped particles upward."],
    [["main_bronchus_R", "main_bronchus_L"], "Step 6 · Main bronchi. The trachea splits at the carina. The right bronchus is wider and more vertical; the left is narrower and longer."],
    [["bronchial_tree"], "Step 7 · Lobar and segmental bronchi. The airways branch to each lobe (3 right, 2 left) and then to the bronchopulmonary segments."],
    [["bronchioles"], "Step 8 · Bronchioles. Narrow airways with no cartilage. Smooth muscle controls their width, and this is where asthma narrows the airflow."],
    [["alveoli"], "Step 9 · Alveoli. Oxygen crosses the thin wall into the capillary blood while carbon dioxide moves out into the air (gas exchange)."],
    [["heart", "lung_R_lower", "lung_L_lower"], "Step 10 · Blood circulation. Pulmonary veins carry oxygen-rich blood to the left heart, and pulmonary arteries bring oxygen-poor blood from the right heart to the lungs."],
    [["diaphragm", "lung_R_upper", "lung_R_middle", "lung_R_lower", "lung_L_upper", "lung_L_lower"], "Step 11 · Lungs and diaphragm. For inhalation the diaphragm flattens and the chest expands, so the lungs expand and draw air in. Watch them move in the animation."],
    [AIRWAY_ALL, "Step 12 · Exhalation. The diaphragm relaxes and the lungs recoil, pushing air (now richer in carbon dioxide) back out along the same airways and through the nose."]
  ];

  var HILITE = [1.0, 0.82, 0.15];
  var HINT_HTML = '<div class="dg-hint">👆 Tap any part to see its name and function.<br>Use <b>Follow the air</b> for the step-by-step journey, or <b>Processes</b> to see which parts do each job.<br>The glowing bead shows one breath going in and out. Use <b>Lungs</b> to make the lungs see-through, solid or hidden.</div>';

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
  function isLung(k) { return LUNGS.indexOf(k) >= 0; }

  function setup() {
    var mv = document.querySelector("#apContent model-viewer");
    if (!mv) return;
    var title = (document.querySelector("#apContent h2") || {}).textContent || "";
    if (!/RESPIRATORY\.glb$/i.test(mv.getAttribute("src") || "") && !/respiratory/i.test(title)) return;
    var box = mv.closest(".model-box");
    if (!box || box.dataset.rs) return;
    box.dataset.rs = "1";

    mv.setAttribute("autoplay", "");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("exposure", "1.15");
    mv.setAttribute("shadow-intensity", "0.5");
    mv.setAttribute("touch-action", "pan-y");
    mv.setAttribute("camera-orbit", "0deg 82deg auto");
    mv.setAttribute("interaction-prompt", "none");
    mv.style.height = Math.min(640, Math.round(window.innerHeight * 0.68)) + "px";

    var head = box.querySelector(".model-head p");
    if (head) head.textContent = "Tap any part to see its name. Drag to rotate, pinch to zoom.";

    var info = mk("div", "", "dg-info"); info.innerHTML = HINT_HTML;
    var tools = mk("div", "", "dg-tools");
    var bTour = mk("button", "▶ Follow the air", "dg-main");
    var bPrev = mk("button", "◀"), bNext = mk("button", "▶"); bPrev.disabled = true; bNext.disabled = true;
    var selProc = document.createElement("select");
    selProc.innerHTML = '<option value="">⚙ Processes…</option>' + PROCESSES.map(function (p, i) { return '<option value="' + i + '">' + esc(p[0]) + "</option>"; }).join("");
    var selPart = document.createElement("select");
    var oh = '<option value="">📋 Choose a part…</option>';
    LIST.forEach(function (g) {
      oh += '<optgroup label="' + esc(g[0]) + '">';
      g[1].forEach(function (k) { oh += '<option value="' + k + '">' + esc(INFO[k][0]) + "</option>"; });
      oh += "</optgroup>";
    });
    selPart.innerHTML = oh;
    var bLung = mk("button", "🫁 Lungs: see-through");
    var bAnim = mk("button", "⏸ Pause breathing");
    var selSpd = document.createElement("select");
    selSpd.innerHTML = '<option value="1">Speed: normal</option><option value="0.5">Slow</option><option value="2">Fast</option>';
    var bClr = mk("button", "↺ Reset");
    [bTour, bPrev, bNext, selProc, selPart, bLung, bAnim, selSpd, bClr].forEach(function (n) { tools.appendChild(n); });
    var helpEl = box.querySelector(".model-help");
    box.insertBefore(info, helpEl); box.insertBefore(tools, helpEl);

    // ---- lung display mode: 0 see-through, 1 solid, 2 hidden ----
    var LUNG_MODES = [
      { label: "🫁 Lungs: see-through", alpha: 0.40, dbl: true },
      { label: "🫁 Lungs: solid", alpha: 1.0, dbl: true },
      { label: "🫁 Lungs: hidden", alpha: 0.0, dbl: false }
    ];
    var lungMode = 0;
    function lungAlpha() { return LUNG_MODES[lungMode].alpha; }
    function litAlpha() { return lungMode === 0 ? 0.75 : lungMode === 1 ? 1.0 : 0.5; }

    // ---- highlighting ----
    var lit = [];
    function matByName(k) {
      var ms = (mv.model && mv.model.materials) || [];
      for (var i = 0; i < ms.length; i++) if (ms[i].name === k) return ms[i];
      return null;
    }
    function clearLit() {
      lit.forEach(function (o) {
        try {
          var c = o.c.slice();
          if (isLung(o.k)) c[3] = lungAlpha();
          o.m.pbrMetallicRoughness.setBaseColorFactor(c);
        } catch (e) {}
      });
      lit = [];
    }
    function highlight(keys) {
      clearLit();
      keys.forEach(function (k) {
        var m = matByName(k); if (!m) return;
        try {
          lit.push({ k: k, m: m, c: m.pbrMetallicRoughness.baseColorFactor.slice() });
          m.pbrMetallicRoughness.setBaseColorFactor([HILITE[0], HILITE[1], HILITE[2], isLung(k) ? litAlpha() : 1]);
        } catch (e) {}
      });
    }
    function applyLungMode() {
      var md = LUNG_MODES[lungMode];
      bLung.textContent = md.label;
      LUNGS.forEach(function (k) {
        var m = matByName(k); if (!m) return;
        try {
          var isLit = lit.some(function (o) { return o.k === k; });
          var c = isLit ? [HILITE[0], HILITE[1], HILITE[2], litAlpha()] : m.pbrMetallicRoughness.baseColorFactor.slice();
          if (!isLit) c[3] = md.alpha;
          m.pbrMetallicRoughness.setBaseColorFactor(c);
          if (typeof m.setAlphaMode === "function") m.setAlphaMode(md.alpha < 1 || isLit ? "BLEND" : "OPAQUE");
          // Hidden mode: single-sided so taps pass through the invisible lungs to the airways inside
          if (typeof m.setDoubleSided === "function") m.setDoubleSided(md.dbl);
        } catch (e) {}
      });
    }
    bLung.addEventListener("click", function () {
      lungMode = (lungMode + 1) % LUNG_MODES.length;
      // keep restored colours (for lit lungs) in step with the new alpha
      lit.forEach(function (o) { if (isLung(o.k)) o.c[3] = lungAlpha(); });
      applyLungMode();
    });

    var tour = -1;
    function resetTourUi() { tour = -1; bPrev.disabled = true; bNext.disabled = true; bTour.textContent = "▶ Follow the air"; }
    function showPart(k) {
      var d = INFO[k]; if (!d) return;
      resetTourUi(); selProc.value = ""; highlight([k]);
      info.innerHTML = '<div class="dg-name">' + esc(d[0]) + '</div><span class="dg-meta">' + esc(d[1]) + '</span><div class="dg-note">' + esc(d[2]) + "</div>";
      selPart.value = INFO[k] && selPart.querySelector('option[value="' + k + '"]') ? k : "";
    }
    function showProcess(i) {
      var p = PROCESSES[i]; resetTourUi(); selPart.value = ""; highlight(p[1]);
      info.innerHTML = '<div class="dg-name">' + esc(p[0]) + '</div><div class="dg-note">' + esc(p[2]) + '</div><div class="dg-sub">Highlighted parts: ' +
        esc(p[1].filter(function (k, j, a) { return a.indexOf(k) === j && !/_L$/.test(k) && !/_L_/.test(k); }).map(function (k) { return INFO[k][0].replace(/^Right /, ""); }).join(", ")) + "</div>";
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
      lungMode = 0; applyLungMode();
      mv.cameraOrbit = "0deg 82deg auto"; mv.fieldOfView = "auto";
    });

    // set the lungs to their default see-through look once the model is ready
    function initLungs() { try { applyLungMode(); } catch (e) {} }
    if (mv.model) initLungs(); else mv.addEventListener("load", initLungs, { once: true });

    // ---- breathing animation controls ----
    var playing = true;
    bAnim.addEventListener("click", function () {
      try {
        if (playing) { mv.pause(); bAnim.textContent = "▶ Play breathing"; } else { mv.play(); bAnim.textContent = "⏸ Pause breathing"; }
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

  function scan() { try { setup(); } catch (e) { console.error("respiratory.js:", e); } }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
  console.log("[respiratory.js] Loaded");
})();
