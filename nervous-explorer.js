/*!
 * nervous.js - Nervous System : interactive layer for <model-viewer> (Anatomy & Physiology page)
 * Works with NERVOUS.glb . No setup needed: it finds the model-viewer by itself
 * when the system is opened, and adds: tap-to-select details card, part dropdown,
 * auto-rotate, reset, processes, 12 steps and an 8-second animation.
 * Material names inside the GLB = keys of CFG.parts below.
 */
(function () {
  'use strict';
  var CFG = {"id":"nervous","file":"nervous.js","glb":"NERVOUS.glb","title":"Nervous System / স্নায়ুতন্ত্র","hint":"যেকোনো অংশে ট্যাপ করো বা ড্রপডাউন থেকে বেছে নাও","stepsTitle":"Nerve impulse - 12 steps / স্নায়ু সংকেতের ১২ ধাপ","animHint":"নীল-সবুজ বল হাত থেকে মস্তিষ্কে সংবেদী সংকেত নিয়ে যায়, তারপর আদেশ হয়ে হাতে ফেরে (বাম হাত)","parts":{"FRONTAL_LOBE":{"en":"Frontal Lobe","bn":"ফ্রন্টাল লোব","cat":"Brain / মস্তিষ্ক","bnText":"মস্তিষ্কের সামনের সবচেয়ে বড় অংশ; ইচ্ছাকৃত নড়াচড়া, পরিকল্পনা, সিদ্ধান্ত ও কথা বলা (ব্রোকা এলাকা) নিয়ন্ত্রণ করে।","enText":"The largest lobe, at the front of each cerebral hemisphere. It controls voluntary movement (primary motor cortex in the precentral gyrus), planning, decision making, personality and speech production (Broca's area, usually on the left).","c":[-0.002,7.916,0.466],"s":[1.104,0.659,0.551]},"PARIETAL_LOBE":{"en":"Parietal Lobe","bn":"প্যারাইটাল লোব","cat":"Brain / মস্তিষ্ক","bnText":"ছোঁয়া, ব্যথা, তাপমাত্রা ও শরীরের অবস্থান বোঝার কেন্দ্র (সোমাটোসেন্সরি কর্টেক্স)।","enText":"Lies behind the frontal lobe. The somatosensory cortex (postcentral gyrus) receives touch, pain, temperature and body-position (proprioception) signals. It also helps with spatial awareness.","c":[0.004,7.981,0.009],"s":[1.115,0.57,0.488]},"TEMPORAL_LOBE":{"en":"Temporal Lobe","bn":"টেম্পোরাল লোব","cat":"Brain / মস্তিষ্ক","bnText":"শোনা, ভাষা বোঝা (ওয়ার্নিকি এলাকা) ও স্মৃতির কাজ করে; ভেতরে হিপোক্যাম্পাস আছে।","enText":"Lies on the side of the brain below the lateral fissure. It handles hearing (auditory cortex), understanding language (Wernicke's area) and memory (hippocampus), and is linked to smell and emotion (amygdala).","c":[-0.0,7.61,0.151],"s":[1.108,0.239,0.761]},"OCCIPITAL_LOBE":{"en":"Occipital Lobe","bn":"অক্সিপিটাল লোব","cat":"Brain / মস্তিষ্ক","bnText":"মস্তিষ্কের পেছনে থাকা দেখার (visual) কেন্দ্র। মডেল ঘুরিয়ে পেছন থেকে দেখো।","enText":"The smallest lobe, at the back of the brain. It contains the primary visual cortex, which receives signals from the eyes through the optic pathway. (Rotate the model to see it from behind.)","c":[-0.002,7.885,-0.354],"s":[1.044,0.651,0.387]},"CEREBELLUM":{"en":"Cerebellum","bn":"সেরিবেলাম","cat":"Brain / মস্তিষ্ক","bnText":"ভারসাম্য, দেহভঙ্গি ও নড়াচড়ার সমন্বয় ঠিক রাখে।","enText":"The \"little brain\" under the occipital lobes. It coordinates voluntary movement, balance and posture, and fine-tunes movements made by the motor cortex.","c":[0.0,7.513,-0.4],"s":[0.823,0.34,0.535]},"BRAINSTEM":{"en":"Brainstem (Midbrain, Pons, Medulla)","bn":"ব্রেনস্টেম","cat":"Brain / মস্তিষ্ক","bnText":"মিডব্রেইন, পনস ও মেডুলা; শ্বাস, হৃদস্পন্দন ও রক্তচাপ নিয়ন্ত্রণ করে। ১২টির মধ্যে ১০টি ক্র্যানিয়াল নার্ভ এখান থেকে বের হয়।","enText":"Connects the brain to the spinal cord. The medulla controls heart rate, blood pressure and breathing; the pons and midbrain relay signals and help control consciousness, eye movement and reflexes.","c":[0.0,7.474,-0.108],"s":[0.26,0.67,0.509]},"SPINAL_CORD":{"en":"Spinal Cord","bn":"সুষুম্নাকাণ্ড","cat":"Spinal cord / সুষুম্নাকাণ্ড","bnText":"ব্রেনস্টেম থেকে প্রায় L1–L2 পর্যন্ত নামা স্নায়ুর দণ্ড (~৪৫ সেমি); মস্তিষ্ক ও শরীরের মাঝে সংকেত বয়ে নেয়, রিফ্লেক্সও এখানে হয়।","enText":"A cylinder of nervous tissue running from the brainstem to about the L1-L2 level. Grey matter (cell bodies) lies inside and white matter (ascending and descending tracts) outside. It carries signals to and from the brain and controls simple reflexes.","c":[0.0,6.144,-0.4],"s":[0.13,2.092,0.288]},"CAUDA_EQUINA":{"en":"Cauda Equina & Filum Terminale","bn":"কডা ইকুইনা","cat":"Spinal cord / সুষুম্নাকাণ্ড","bnText":"কর্ডের নিচে ঝুলে থাকা লাম্বার-স্যাক্রাল নার্ভ মূলের গুচ্ছ, দেখতে ঘোড়ার লেজের মতো; সরু ফাইলাম টার্মিনাল কর্ডকে আটকে রাখে।","enText":"Below the conus medullaris (the tapered end of the cord) the lumbar, sacral and coccygeal nerve roots hang like a \"horse's tail\". The thin filum terminale anchors the cord to the coccyx.","c":[-0.0,4.326,-0.363],"s":[0.176,1.554,0.129]},"VERTEBRAL_COLUMN":{"en":"Vertebral Column","bn":"কশেরুকা দণ্ড (মেরুদণ্ড)","cat":"Skeletal / কঙ্কাল","bnText":"৩৩টি কশেরুকা (৭+১২+৫+৫+৪) সুষুম্নাকাণ্ডকে ঘিরে রক্ষা করে; এখানে স্বচ্ছ করে দেখানো হয়েছে।","enText":"The bony spine that protects the spinal cord. It is shown translucent so you can see the cord inside. Each vertebra has a body in front and a vertebral arch behind that forms the spinal canal.","c":[0.0,5.35,-0.343],"s":[0.398,3.66,0.664]},"SPINAL_NERVES":{"en":"Spinal Nerves","bn":"স্পাইনাল নার্ভ","cat":"PNS / প্রান্তীয় স্নায়ু","bnText":"৩১ জোড়া মিশ্র নার্ভ (৮ সার্ভাইক্যাল, ১২ থোরাসিক, ৫ লাম্বার, ৫ স্যাক্রাল, ১ কক্সিজিয়াল); বুকে এগুলো পাঁজরের ফাঁকে ইন্টারকোস্টাল নার্ভ হিসেবে যায়।","enText":"31 pairs of mixed nerves (both sensory and motor) attach to the cord. Each has a dorsal root (sensory) and a ventral root (motor). Here you see the cervical, thoracic (intercostal), lumbar and sacral nerves leaving the spine.","c":[0.0,5.35,-0.004],"s":[1.382,3.521,1.014]},"BRACHIAL_PLEXUS":{"en":"Brachial Plexus & Arm Nerves","bn":"ব্র্যাকিয়াল প্লেক্সাস ও হাতের নার্ভ","cat":"PNS / প্রান্তীয় স্নায়ু","bnText":"C5–T1 নার্ভ মিলে তৈরি জালিকা; এ থেকে মিডিয়ান, আলনার ও রেডিয়াল নার্ভ হাতে যায়।","enText":"A network formed by spinal nerves C5-T1 that supplies the shoulder, arm and hand. It gives the median, ulnar and radial nerves (shown in the arm) plus the musculocutaneous and axillary nerves.","c":[0.0,5.032,-0.104],"s":[3.047,3.57,0.686]},"LUMBOSACRAL_PLEXUS":{"en":"Lumbosacral Plexus & Leg Nerves","bn":"লাম্বোস্যাক্রাল প্লেক্সাস ও পায়ের নার্ভ","cat":"PNS / প্রান্তীয় স্নায়ু","bnText":"ফিমোরাল নার্ভ উরুর সামনে যায়; শরীরের সবচেয়ে মোটা ও লম্বা সায়াটিক নার্ভ পায়ের পেছনে গিয়ে হাঁটুর কাছে টিবিয়াল ও কমন পেরোনিয়াল নার্ভে ভাগ হয়।","enText":"The lumbar plexus (L1-L4) gives the femoral nerve to the front of the thigh. The sacral plexus (L4-S4) gives the sciatic nerve, which splits into the tibial and common peroneal nerves above the knee.","c":[0.0,2.516,0.065],"s":[1.204,4.92,0.88]},"VAGUS_NERVE":{"en":"Vagus Nerve (Cranial Nerve X)","bn":"ভেগাস নার্ভ (১০ম ক্র্যানিয়াল)","cat":"Cranial nerve / ক্র্যানিয়াল নার্ভ","bnText":"সবচেয়ে লম্বা ক্র্যানিয়াল নার্ভ; হৃৎপিণ্ডের গতি কমায় ও পরিপাক বাড়ায় (প্যারাসিমপ্যাথেটিক)।","enText":"The longest cranial nerve and the main parasympathetic nerve. It wanders from the brainstem through the neck and chest to the abdomen, slowing the heart and increasing digestive activity.","c":[0.0,5.905,-0.019],"s":[0.562,2.817,0.437]},"OPTIC_NERVE":{"en":"Optic Nerve & Chiasm (Cranial Nerve II)","bn":"অপটিক নার্ভ ও কায়াজম (২য় ক্র্যানিয়াল)","cat":"Cranial nerve / ক্র্যানিয়াল নার্ভ","bnText":"রেটিনার দৃষ্টি-সংকেত মস্তিষ্কে বয়ে নেয়; অপটিক কায়াজমে ভেতরের অর্ধেক তন্তু উল্টো পাশে পার হয়।","enText":"Carries visual signals from the retina to the brain. At the optic chiasm, fibres from the inner (nasal) half of each retina cross to the other side, then continue as optic tracts to the occipital lobe.","c":[0.0,7.429,0.347],"s":[0.7,0.188,0.714]},"EYEBALL":{"en":"Eyeball","bn":"অক্ষিগোলক (চোখ)","cat":"Sense organ / ইন্দ্রিয়","bnText":"রেটিনায় আলো স্নায়ু-সংকেতে রূপান্তরিত হয়; এখানে অপটিক নার্ভের পথ বোঝাতে দেখানো হয়েছে।","enText":"Contains the retina, where light is converted into nerve signals. Shown only to make the optic nerve pathway easy to follow.","c":[0.0,7.4,0.8],"s":[0.899,0.24,0.239]},"SYMPATHETIC_CHAIN":{"en":"Sympathetic Trunk (Autonomic NS)","bn":"সিমপ্যাথেটিক ট্রাঙ্ক","cat":"ANS / স্বয়ংক্রিয় স্নায়ুতন্ত্র","bnText":"মেরুদণ্ডের দুপাশে গ্যাংলিয়নের শৃঙ্খল; \"ফাইট অর ফ্লাইট\" অবস্থায় হৃৎস্পন্দন বাড়ায়, চোখের মণি বড় করে, হজম কমায়।","enText":"Two chains of ganglia beside the vertebral column from neck to pelvis. They are part of the sympathetic (\"fight or flight\") division of the autonomic nervous system, which speeds up the heart, widens the pupils and slows digestion.","c":[0.0,5.45,-0.238],"s":[0.695,3.406,0.243]}},"order":["FRONTAL_LOBE","PARIETAL_LOBE","TEMPORAL_LOBE","OCCIPITAL_LOBE","CEREBELLUM","BRAINSTEM","SPINAL_CORD","CAUDA_EQUINA","VERTEBRAL_COLUMN","SPINAL_NERVES","BRACHIAL_PLEXUS","LUMBOSACRAL_PLEXUS","VAGUS_NERVE","OPTIC_NERVE","EYEBALL","SYMPATHETIC_CHAIN"],"steps":[{"title":"Step 1 - Stimulus detected","parts":["BRACHIAL_PLEXUS"],"enText":"A sensory receptor in the skin of the hand (for example a pain receptor) is activated and generates an action potential.","bnText":"হাতের ত্বকের রিসেপ্টর (যেমন ব্যথার) উদ্দীপ্ত হয়ে অ্যাকশন পটেনশিয়াল তৈরি করে।"},{"title":"Step 2 - Sensory (afferent) nerve","parts":["BRACHIAL_PLEXUS"],"enText":"The impulse travels up the median nerve at up to about 70-120 m/s in myelinated fibres.","bnText":"সংকেত মিডিয়ান নার্ভ বেয়ে (সেকেন্ডে ৭০–১২০ মিটার পর্যন্ত গতিতে) ওপরে ওঠে।"},{"title":"Step 3 - Brachial plexus","parts":["BRACHIAL_PLEXUS","SPINAL_NERVES"],"enText":"Arm nerves merge in the brachial plexus and join the spinal nerves at levels C5-T1.","bnText":"হাতের নার্ভ ব্র্যাকিয়াল প্লেক্সাসে মিলে C5–T1 স্পাইনাল নার্ভে যুক্ত হয়।"},{"title":"Step 4 - Dorsal root to spinal cord","parts":["SPINAL_CORD","VERTEBRAL_COLUMN"],"enText":"The signal enters the cord through the dorsal root. Here an interneuron can trigger a reflex arc (for example pulling the hand away) before the brain even knows.","bnText":"ডরসাল রুট দিয়ে সংকেত কর্ডে ঢোকে; এখানেই রিফ্লেক্স আর্ক কাজ করে হাত টেনে নিতে পারে।"},{"title":"Step 5 - Ascending tracts","parts":["SPINAL_CORD"],"enText":"Pain and temperature signals cross to the opposite side of the cord and ascend in the spinothalamic tract.","bnText":"ব্যথা-তাপমাত্রার সংকেত উল্টো পাশে পার হয়ে স্পাইনোথ্যালামিক ট্র্যাক্ট বেয়ে ওঠে।"},{"title":"Step 6 - Brainstem","parts":["BRAINSTEM"],"enText":"The signal passes through the medulla, pons and midbrain, which also influence alertness, heart rate and breathing.","bnText":"সংকেত মেডুলা, পনস ও মিডব্রেইন পার হয়।"},{"title":"Step 7 - Thalamus relay","parts":["BRAINSTEM","PARIETAL_LOBE"],"enText":"The thalamus (deep in the brain) acts as a relay station and sends the signal to the cerebral cortex.","bnText":"থ্যালামাস রিলে স্টেশনের মতো সংকেত কর্টেক্সে পাঠায়।"},{"title":"Step 8 - Parietal lobe","parts":["PARIETAL_LOBE"],"enText":"The somatosensory cortex receives the signal, so you consciously feel where and how strong the pain is.","bnText":"প্যারাইটাল লোব সংকেত গ্রহণ করে, তাই ব্যথা কোথায় ও কতটা তা বোঝা যায়।"},{"title":"Step 9 - Frontal lobe decision","parts":["FRONTAL_LOBE"],"enText":"The frontal lobe decides what to do. The motor cortex plans the movement and sends a command.","bnText":"ফ্রন্টাল লোব সিদ্ধান্ত নেয়; মোটর কর্টেক্স নড়াচড়ার আদেশ পাঠায়।"},{"title":"Step 10 - Cerebellum coordination","parts":["CEREBELLUM","FRONTAL_LOBE"],"enText":"The cerebellum smooths and coordinates the movement, adjusting timing and balance.","bnText":"সেরিবেলাম নড়াচড়াকে মসৃণ ও সমন্বিত করে।"},{"title":"Step 11 - Descending tracts","parts":["BRAINSTEM","SPINAL_CORD"],"enText":"The command descends in the corticospinal tract. Most fibres cross to the opposite side in the lower medulla.","bnText":"আদেশ কর্টিকোস্পাইনাল ট্র্যাক্ট বেয়ে নামে; বেশিরভাগ তন্তু মেডুলার নিচে উল্টো পাশে পার হয়।"},{"title":"Step 12 - Motor (efferent) nerve","parts":["BRACHIAL_PLEXUS","SPINAL_NERVES"],"enText":"Motor neurons leave through the ventral root, travel through the brachial plexus and radial/ulnar nerves, and the arm muscles contract.","bnText":"ভেন্ট্রাল রুট ও ব্র্যাকিয়াল প্লেক্সাস হয়ে মোটর নার্ভ পেশিতে পৌঁছায়, পেশি সংকুচিত হয়।"}],"processes":[{"name":"1. Sensory input","parts":["BRACHIAL_PLEXUS","LUMBOSACRAL_PLEXUS","SPINAL_NERVES","OPTIC_NERVE","EYEBALL"],"enText":"Sensory (afferent) neurons detect stimuli such as touch, pain, temperature and light. Their signals travel along peripheral nerves, enter the spinal cord through the dorsal roots (or enter the brain directly through cranial nerves).","bn":"","bnText":"সংবেদী (afferent) নিউরন স্পর্শ, ব্যথা, আলো ইত্যাদি শনাক্ত করে মস্তিষ্ক বা কর্ডে সংকেত পাঠায়।"},{"name":"2. Integration","parts":["FRONTAL_LOBE","PARIETAL_LOBE","TEMPORAL_LOBE","OCCIPITAL_LOBE","CEREBELLUM","BRAINSTEM","SPINAL_CORD"],"enText":"The central nervous system (brain and spinal cord) processes information, compares it with memory and decides on a response. Simple reflexes are integrated in the spinal cord without waiting for the brain.","bn":"","bnText":"মস্তিষ্ক ও সুষুম্নাকাণ্ড তথ্য বিশ্লেষণ করে সিদ্ধান্ত নেয়; সাধারণ রিফ্লেক্স কর্ডেই সম্পন্ন হয়।"},{"name":"3. Motor output","parts":["FRONTAL_LOBE","BRAINSTEM","SPINAL_CORD","BRACHIAL_PLEXUS","LUMBOSACRAL_PLEXUS"],"enText":"Motor (efferent) commands leave the motor cortex, descend through the brainstem and spinal cord, and travel along the ventral roots and peripheral nerves to skeletal muscles, which contract.","bn":"","bnText":"মোটর (efferent) নিউরন আদেশ নিয়ে কঙ্কালপেশিতে যায়, পেশি সংকুচিত হয়।"},{"name":"4. Autonomic control","parts":["SYMPATHETIC_CHAIN","VAGUS_NERVE","BRAINSTEM"],"enText":"The autonomic nervous system controls heart, glands and smooth muscle without conscious effort. The sympathetic chain prepares the body for action; the vagus nerve (parasympathetic) calms it and aids digestion.","bn":"","bnText":"স্বয়ংক্রিয় স্নায়ুতন্ত্র হৃৎপিণ্ড, গ্রন্থি ও মসৃণ পেশি নিয়ন্ত্রণ করে; সিমপ্যাথেটিক উত্তেজিত করে, ভেগাস (প্যারাসিমপ্যাথেটিক) শান্ত করে।"}],"anim":{"name":"FLOW","duration":8,"segs":[{"end":1.4,"keys":["BRACHIAL_PLEXUS"],"en":"Sensory (afferent) signal travels up the median nerve from the hand.","bn":"হাত থেকে সংবেদী সংকেত মিডিয়ান নার্ভ বেয়ে ওঠে।"},{"end":2.8,"keys":["SPINAL_CORD"],"en":"It enters the cord through the dorsal root and climbs the spinal cord.","bn":"ডরসাল রুট দিয়ে কর্ডে ঢুকে সুষুম্নাকাণ্ড বেয়ে ওপরে ওঠে।"},{"end":3.6,"keys":["BRAINSTEM"],"en":"Relay in the brainstem and thalamus.","bn":"ব্রেনস্টেম ও থ্যালামাসে রিলে হয়।"},{"end":4.5,"keys":["PARIETAL_LOBE"],"en":"Parietal lobe (somatosensory cortex) perceives touch or pain.","bn":"প্যারাইটাল লোবে ছোঁয়া বা ব্যথার অনুভূতি তৈরি হয়।"},{"end":5.4,"keys":["FRONTAL_LOBE"],"en":"Frontal lobe decides and the motor cortex sends a command.","bn":"ফ্রন্টাল লোব সিদ্ধান্ত নিয়ে মোটর আদেশ পাঠায়।"},{"end":6.6,"keys":["BRAINSTEM","SPINAL_CORD"],"en":"The command descends through the brainstem and spinal cord (corticospinal tract).","bn":"আদেশ ব্রেনস্টেম ও সুষুম্নাকাণ্ড বেয়ে নামে।"},{"end":8.0,"keys":["BRACHIAL_PLEXUS"],"en":"Motor (efferent) nerve carries the command to the arm muscles.","bn":"মোটর নার্ভ বেয়ে আদেশ হাতের পেশিতে পৌঁছায়।"}]}};

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