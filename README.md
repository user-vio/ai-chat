# AI Chat

Basit, tek sayfalık bir sohbet arayüzü.

## Kurulum

1. `config.js` içindeki `API_KEY` ve `MODEL` değerlerini kendi bilgilerinle değiştir.
2. `ENDPOINT` değerini kullandığın sağlayıcıya göre ayarla (örn. OpenAI uyumlu bir proxy kullanıyorsan onun adresini yaz).
3. Dosyaları bir web sunucusuna veya GitHub Pages'e yükle.

## ⚠️ Güvenlik uyarısı

`config.js` içindeki API anahtarı düz metin olarak istemci tarafında duruyor. Bunu **herkese açık** bir GitHub Pages sitesine yüklersen, anahtarı sitenin kaynak kodunu görebilen herkes okuyabilir ve kullanabilir — botlar bu tür anahtarları otomatik tarayıp buluyor. Pratikte bu, faturanı başkasının ödemesi (senin adına) anlamına gelebilir.

Güvenli yollar:
- Anahtarı bir backend/proxy (örn. basit bir Cloudflare Worker veya küçük bir sunucu) arkasına koy, istemci sadece proxy'ye istek atsın.
- Ya da repoyu private tut ve sadece kendi kullanacağın bir yerde barındır (GitHub Pages private repo'larda Pro/Team planı gerektirir).
