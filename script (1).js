const chat = document.getElementById('chat');
const input = document.getElementById('msg');
const btn = document.getElementById('send');
const modelLabel = document.getElementById('model-label');

if (typeof MODEL !== 'undefined') modelLabel.textContent = MODEL;

function add(cls, text) {
  const d = document.createElement('div');
  d.className = 'm ' + cls;
  d.textContent = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
  return d;
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'typing';
  d.id = 'typing-indicator';
  d.innerHTML = '<i></i><i></i><i></i>';
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  add('u', text);
  input.value = '';
  btn.disabled = true;
  showTyping();

  try {
    const r = await fetch(typeof ENDPOINT !== 'undefined' ? ENDPOINT : 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: text }]
      })
    });

    const j = await r.json();
    hideTyping();

    if (!r.ok) {
      add('a err', j.error?.message || `İstek başarısız oldu (${r.status})`);
      return;
    }

    add('a', j.choices?.[0]?.message?.content || JSON.stringify(j));
  } catch (e) {
    hideTyping();
    add('a err', 'Bağlantı hatası: ' + e.message);
  } finally {
    btn.disabled = false;
    input.focus();
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send();
});
