(function(){
/* ---- EmailJS সেটিং: emailjs.com থেকে নিয়ে এখানে বসান। খালি রাখলে ইমেইল যাবে না, বাকি সব চলবে ---- */
const EMAILJS={publicKey:"",serviceId:"",templateId:""};

const auth=firebase.auth(), db=firebase.firestore(), FV=firebase.firestore.FieldValue;
const el=id=>document.getElementById(id);
const baseTitle=document.title;
let me=null,isAdmin=false,uname='',openUid=null,myChat=null;
let unMsgs=null,unList=null,unMine=null,lastTotal=-1;

function beep(){try{const c=new(window.AudioContext||window.webkitAudioContext)();const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;g.gain.setValueAtTime(.15,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.4);o.start();o.stop(c.currentTime+.4)}catch(e){}}
function setBadge(n){document.querySelectorAll('.chat-badge').forEach(b=>{b.textContent=n>99?'99+':n;b.style.display=n?'inline-block':'none'});document.title=n?'('+n+') '+baseTitle:baseTitle}
function fmt(ts){if(!ts||!ts.toDate)return'';const d=ts.toDate(),n=new Date();const t=d.toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'});return d.toDateString()===n.toDateString()?t:d.toLocaleDateString('bn-BD',{day:'numeric',month:'short'})+' '+t}
function stop(){[unMsgs,unList,unMine].forEach(f=>f&&f());unMsgs=unList=unMine=null;openUid=null;myChat=null;lastTotal=-1;setBadge(0)}

/* ---- থ্রেড (মেসেজ তালিকা) ---- */
function startThread(uid,title){
  unMsgs&&unMsgs();openUid=uid;el('cTitle').textContent=title;el('cMsgs').innerHTML='';
  const mine=isAdmin?'admin':'user';
  clearUnread(uid);
  unMsgs=db.collection('chats').doc(uid).collection('messages').orderBy('time').limitToLast(200).onSnapshot(snap=>{
    const box=el('cMsgs');box.innerHTML='';
    if(snap.empty){box.innerHTML='<div class="cempty">'+(isAdmin?'NMo messages':'Send your question and the authority will reply')+'</div>'}
    snap.docs.forEach(d=>{
      const m=d.data({serverTimestamps:'estimate'});
      const div=document.createElement('div');div.className='cm '+(m.from===mine?'mine':'theirs');
      div.appendChild(document.createTextNode(m.text));
      const s=document.createElement('small');s.textContent=fmt(m.time);div.appendChild(s);
      if(isAdmin){const x=document.createElement('button');x.className='cx';x.textContent='×';x.title='Delete';x.onclick=()=>{if(confirm('মেসেজটি মুছবেন?'))d.ref.delete()};div.appendChild(x)}
      box.appendChild(div);
    });
    box.scrollTop=box.scrollHeight;
    if(snap.docChanges().some(c=>c.type==='added'&&c.doc.data().from!==mine&&!snap.metadata.fromCache))clearUnread(uid);
  },e=>console.warn('chat',e));
}
function clearUnread(uid){db.collection('chats').doc(uid).set({[isAdmin?'unreadAdmin':'unreadUser']:0},{merge:true}).catch(()=>{})}

/* ---- admin: ইনবক্স ---- */
function startList(){
  el('cAdminList').style.display='block';el('cThread').style.display='none';openUid=null;
  unList=db.collection('chats').orderBy('lastTime','desc').limit(100).onSnapshot(snap=>{
    const box=el('cList');box.innerHTML='';let total=0;
    if(snap.empty)box.innerHTML='<div class="cempty">No messages</div>';
    snap.docs.forEach(d=>{
      const c=d.data({serverTimestamps:'estimate'});const un=c.unreadAdmin||0;total+=un;
      const it=document.createElement('div');it.className='citem'+(un?' un':'');
      const m=document.createElement('div');m.className='cm2';
      const b=document.createElement('b');b.textContent=c.name||c.email||'User';
      const s=document.createElement('small');s.textContent=c.lastMsg||'';
      m.append(b,s);
      const t=document.createElement('time');t.textContent=fmt(c.lastTime);
      it.append(m,t);
      if(un){const bd=document.createElement('em');bd.className='chat-badge';bd.style.display='inline-block';bd.textContent=un;it.appendChild(bd)}
      it.onclick=()=>{el('cAdminList').style.display='none';el('cThread').style.display='block';el('cBack').style.display='inline-block';startThread(d.id,(c.name||c.email||'User')+(c.email?' • '+c.email:''))};
      box.appendChild(it);
    });
    if(lastTotal>=0&&total>lastTotal)beep();
    lastTotal=total;setBadge(total);
  },e=>console.warn('inbox',e));
}
el('cBack').onclick=()=>{unMsgs&&unMsgs();unMsgs=null;openUid=null;el('cBack').style.display='none';el('cThread').style.display='none';el('cAdminList').style.display='block'};

/* ---- ইউজার: নিজের চ্যাট ডক শুনে ব্যাজ ---- */
function startMine(){
  startThread(me.uid,'Admin');
  unMine=db.collection('chats').doc(me.uid).onSnapshot(s=>{
    myChat=s.exists?s.data():null;const n=myChat?(myChat.unreadUser||0):0;
    const onChat=location.hash==='#chat';
    if(lastTotal>=0&&n>lastTotal&&!onChat)beep();
    lastTotal=n;setBadge(onChat?0:n);
  });
}

/* ---- পাঠানো ---- */
async function send(){
  const inp=el('cIn');const text=inp.value.trim().slice(0,500);
  const uid=isAdmin?openUid:(me&&me.uid);
  if(!text||!me||!uid)return;
  inp.value='';
  const cref=db.collection('chats').doc(uid),mref=cref.collection('messages').doc();
  const batch=db.batch();
  batch.set(mref,{text,from:isAdmin?'admin':'user',uid:me.uid,time:FV.serverTimestamp()});
  const meta={lastMsg:text.slice(0,80),lastTime:FV.serverTimestamp()};
  if(isAdmin){meta.unreadUser=FV.increment(1);meta.unreadAdmin=0}
  else Object.assign(meta,{uid:me.uid,name:uname,email:me.email||'',unreadAdmin:FV.increment(1),unreadUser:0});
  batch.set(cref,meta,{merge:true});
  try{await batch.commit();if(!isAdmin)mail(text)}catch(e){alert('Sending failed , Try again later');inp.value=text;console.warn(e)}
}
el('cSend').onclick=send;
el('cIn').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});

/* ---- অ্যাডমিনকে ইমেইল (১০ মিনিটে সর্বোচ্চ ১টা, স্প্যাম ঠেকাতে) ---- */
async function mail(text){
  if(!EMAILJS.publicKey||!window.emailjs)return;
  if(Date.now()-((myChat&&myChat.lastMail)||0)<600000)return;
  try{
    emailjs.init({publicKey:EMAILJS.publicKey});
    await emailjs.send(EMAILJS.serviceId,EMAILJS.templateId,{from_name:uname,from_email:me.email||'',message:text,site_link:location.origin+location.pathname+'#chat'});
    db.collection('chats').doc(me.uid).set({lastMail:Date.now()},{merge:true});
  }catch(e){console.warn('mail',e)}
}

/* ---- লগইন অবস্থা ---- */
auth.onAuthStateChanged(async u=>{
  stop();me=u;
  if(!u)return;
  isAdmin=u.email===ADMIN_EMAIL;
  uname=u.displayName||u.email||'User';
  try{const p=await db.collection('users').doc(u.uid).get();if(p.exists&&p.data().name)uname=p.data().name}catch(e){}
  if(isAdmin)startList();
  else{el('cAdminList').style.display='none';el('cThread').style.display='block';el('cBack').style.display='none';startMine()}
});
addEventListener('hashchange',()=>{if(!isAdmin&&location.hash==='#chat'){clearUnread(me&&me.uid);setBadge(0)}});
})();
