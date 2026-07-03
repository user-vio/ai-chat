const chat = document.getElementById('chat');
const input = document.getElementById('msg');
const btn = document.getElementById('send');
const modelLabel = document.getElementById('model-label');

// Eğer config.js'den gelmiyorsa hata vermemesi için varsayılan değerler atayalım
const CURRENT_MODEL = typeof MODEL !== 'undefined' ? MODEL : 'gpt-4o-mini';
const CURRENT_ENDPOINT = typeof ENDPOINT !== 'undefined' ? ENDPOINT : 'https://api.openai.com/v1/chat/completions';
const CURRENT_KEY = typeof API_KEY !== 'undefined' ? API_KEY : 'BURAYA_API_KEYINIZI_YAZIN';

// Üst barda model adını göster
if (modelLabel) modelLabel.textContent = CURRENT_MODEL;

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
    const r = await fetch(CURRENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + CURRENT_KEY
      },
      body: JSON.stringify({
        model: CURRENT_MODEL,
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

// --- EKSİK OLAN BAĞLANTILAR ---

// 1. Butona tıklanınca gönderme fonksiyonunu tetikle
btn.addEventListener('click', send);

// 2. Enter tuşuna basınca gönderme tetikle
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send();
});
