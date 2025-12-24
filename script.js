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
