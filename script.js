
const chat=document.getElementById('chat');
function add(c,t){let d=document.createElement('div');d.className='m '+c;d.textContent=t;chat.appendChild(d);}
async function send(){
 const i=document.getElementById('msg'); const text=i.value.trim(); if(!text)return;
 add('u',text); i.value='';
 const r=await fetch('https://api.openai.com/v1/chat/completions',{
 method:'POST',
 headers:{'Content-Type':'application/json','Authorization':'Bearer '+API_KEY},
 body:JSON.stringify({model:MODEL,messages:[{role:'user',content:text}]})
 });
 const j=await r.json();
 add('a',j.choices?.[0]?.message?.content||JSON.stringify(j));
}
