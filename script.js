const textEl=document.getElementById("text");
const voiceEl=document.getElementById("voice");
const rateEl=document.getElementById("rate");
const pitchEl=document.getElementById("pitch");
const rateValue=document.getElementById("rateValue");
const pitchValue=document.getElementById("pitchValue");
const statusEl=document.getElementById("status");

function loadVoices(){
  const voices=speechSynthesis.getVoices();
  voiceEl.innerHTML="";
  voices.forEach((v,i)=>{
    const o=document.createElement("option");
    o.value=i;
    o.textContent=`${v.name} — ${v.lang}`;
    voiceEl.appendChild(o);
  });
}
loadVoices();
speechSynthesis.onvoiceschanged=loadVoices;

rateEl.oninput=()=>rateValue.textContent=rateEl.value;
pitchEl.oninput=()=>pitchValue.textContent=pitchEl.value;

function speakText(){
  const text=textEl.value.trim();
  if(!text){statusEl.textContent="पहले text लिखें।";return;}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  const voices=speechSynthesis.getVoices();
  if(voices[voiceEl.value]) u.voice=voices[voiceEl.value];
  u.rate=parseFloat(rateEl.value);
  u.pitch=parseFloat(pitchEl.value);
  u.onstart=()=>statusEl.textContent="🔊 Voice चल रही है...";
  u.onend=()=>statusEl.textContent="✅ Voice complete.";
  speechSynthesis.speak(u);
}
function stopVoice(){
  speechSynthesis.cancel();
  statusEl.textContent="⏹ Voice stopped.";
}
function downloadText(){
  const text=textEl.value.trim();
  if(!text){statusEl.textContent="Download करने से पहले text लिखें।";return;}
  const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="aarav-tech-voice-text.txt";
  a.click();
  URL.revokeObjectURL(a.href);
}
function toggleMenu(){
  const nav=document.getElementById("nav");
  nav.style.display=nav.style.display==="flex"?"none":"flex";
}
