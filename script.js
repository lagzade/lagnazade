// فعال کردن تم تلگرام (تاریک/روشن)
Telegram.WebApp.ready();
Telegram.WebApp.expand(); // فول اسکرین

let score = 0;
const scoreElement = document.getElementById('score');
const coinArea = document.getElementById('coinArea');
const particlesContainer = document.querySelector('.floating-particles');

const coins = ['🪙', '💰', '💎', '✨', '⭐'];

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.textContent = coins[Math.floor(Math.random() * coins.length)];
  
  // موقعیت تصادفی اطراف نقطه ضربه
  const offsetX = Math.random() * 100 - 50;
  const offsetY = Math.random() * 100 - 50;
  
  particle.style.left = `${x + offsetX}px`;
  particle.style.top = `${y + offsetY}px`;
  
  particlesContainer.appendChild(particle);
  
  // حذف بعد از انیمیشن
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

coinArea.addEventListener('click', (e) => {
  score += 10;
  scoreElement.textContent = score.toLocaleString();
  
  // انیمیشن سکه بزرگ
  const bigCoin = document.querySelector('.big-coin');
  bigCoin.style.transform = 'scale(1.2)';
  setTimeout(() => {
    bigCoin.style.transform = 'scale(1)';
  }, 100);
  
  // ایجاد چند ذره
  const rect = coinArea.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createParticle(x, y), i * 50);
  }
  
  // ویبریشن تلگرام (اگر گوشی باشه)
  if (Telegram.WebApp.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
});

// مخفی کردن نکته بعد از اولین ضربه
coinArea.addEventListener('click', function hideHint() {
  document.querySelector('.tap-hint').style.display = 'none';
  coinArea.removeEventListener('click', hideHint);
}, { once: true });
// فعال کردن تم تلگرام (تاریک/روشن)
Telegram.WebApp.ready();
Telegram.WebApp.expand(); // فول اسکرین

let score = 0;
const scoreElement = document.getElementById('score');
const coinArea = document.getElementById('coinArea');
const particlesContainer = document.querySelector('.floating-particles');

const coins = ['🪙', '💰', '💎', '✨', '⭐'];

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.textContent = coins[Math.floor(Math.random() * coins.length)];
  
  // موقعیت تصادفی اطراف نقطه ضربه
  const offsetX = Math.random() * 100 - 50;
  const offsetY = Math.random() * 100 - 50;
  
  particle.style.left = `${x + offsetX}px`;
  particle.style.top = `${y + offsetY}px`;
  
  particlesContainer.appendChild(particle);
  
  // حذف بعد از انیمیشن
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

coinArea.addEventListener('click', (e) => {
  score += 10;
  scoreElement.textContent = score.toLocaleString();
  
  // انیمیشن سکه بزرگ
  const bigCoin = document.querySelector('.big-coin');
  bigCoin.style.transform = 'scale(1.2)';
  setTimeout(() => {
    bigCoin.style.transform = 'scale(1)';
  }, 100);
  
  // ایجاد چند ذره
  const rect = coinArea.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createParticle(x, y), i * 50);
  }
  
  // ویبریشن تلگرام (اگر گوشی باشه)
  if (Telegram.WebApp.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
});

// مخفی کردن نکته بعد از اولین ضربه
coinArea.addEventListener('click', function hideHint() {
  document.querySelector('.tap-hint').style.display = 'none';
  coinArea.removeEventListener('click', hideHint);
}, { once: true });
Telegram.WebApp.ready();
Telegram.WebApp.expand();

// ذخیره امتیاز (حتی بعد از بستن اپ، باقی بمونه)
let score = parseInt(localStorage.getItem('coinScore')) || 0;
let multiplier = parseInt(localStorage.getItem('multiplier')) || 1;

const scoreElement = document.getElementById('score');
if (scoreElement) scoreElement.textContent = score.toLocaleString();

// نمایش صفحه
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  // ویبریشن
  Telegram.WebApp.HapticFeedback.impactOccurred('light');
}

// خرید بوستر
function buyBooster(mult) {
  const costs = {2: 1000, 5: 5000};
  if (score >= costs[mult]) {
    score -= costs[mult];
    multiplier = mult;
    updateScore();
    localStorage.setItem('multiplier', multiplier);
    alert(`بوستر ×${mult} خریداری شد! 🎉`);
  } else {
    alert("امتیاز کافی نداری 😢");
  }
}

// تپ کردن سکه
document.getElementById('coinArea')?.addEventListener('click', (e) => {
  score += 10 * multiplier;
  updateScore();
  localStorage.setItem('coinScore', score);
  
  // انیمیشن‌ها (همون قبلی)
  // ... (کد انیمیشن ذرات و ویبریشن رو از قبل کپی کن)
});

function updateScore() {
  if (scoreElement) scoreElement.textContent = score.toLocaleString();
}

// ارسال داده به بات (مثلاً وقتی کاربر دکمه بزنه)
function sendDataToBot() {
  Telegram.WebApp.sendData(JSON.stringify({score: score, action: "save_score"}));
  // بات تلگرام باید این داده رو دریافت کنه (اگر بک‌اند داری)
  alert("امتیازت ارسال شد!");
}

// اولین صفحه: منو
showPage('menu-page');
