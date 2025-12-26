// app.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// نقشه بزرگ: 900x900 برای 3x3 خانه (هر خانه 300x300)
const mapWidth = 900;
const mapHeight = 900;
const viewWidth = 300; // اندازه viewport
const viewHeight = 300;

// کاراکتر: موقعیت اولیه در وسط (خانه وسط)
let player = { x: 450, y: 450, size: 20, speed: 5 };
let camera = { x: player.x - viewWidth / 2, y: player.y - viewHeight / 2 }; // دوربین follow

// موجودی
let wood = 0;
let coins = 0;

// مناطق نقشه (مثال: بالا چپ جنگل (0-300,0-300)، پایین چپ بازار (0-300,600-900))
const forestTopLeft = { x: 0, y: 0, w: 300, h: 300 }; // جنگل بالا چپ
const marketBottomLeft = { x: 0, y: 600, w: 300, h: 300 }; // بازار پایین چپ

// درخت‌ها در جنگل (مثال: موقعیت‌های تصادفی)
const trees = [
  { x: 100, y: 100, collected: false },
  { x: 200, y: 150, collected: false }
  // بیشتر اضافه کنید
];

// حرکت با کلیک
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const targetX = e.clientX - rect.left + camera.x; // تبدیل به مختصات نقشه
  const targetY = e.clientY - rect.top + camera.y;
  
  // حرکت کاراکتر به سمت هدف (ساده: مستقیم حرکت کن)
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 0) {
    player.x += (dx / distance) * player.speed;
    player.y += (dy / distance) * player.speed;
  }

  // چک تعامل: اگر در جنگل و نزدیک درخت
  if (player.x < 300 && player.y < 300) { // در جنگل بالا چپ
    trees.forEach(tree => {
      if (!tree.collected && Math.abs(player.x - tree.x) < 20 && Math.abs(player.y - tree.y) < 20) {
        wood += 1;
        tree.collected = true;
        alert(`چوب جمع شد! موجودی: ${wood}`);
      }
    });
  }

  // اگر در بازار
  if (player.x < 300 && player.y > 600) {
    if (wood > 0) {
      coins += wood * 2;
      wood = 0;
      alert(`چوب فروخته شد! سکه: ${coins}`);
    }
  }
});

// loop بازی برای رندر
function gameLoop() {
  // به‌روزرسانی دوربین
  camera.x = player.x - viewWidth / 2;
  camera.y = player.y - viewHeight / 2;
  // محدود کردن دوربین به نقشه
  camera.x = Math.max(0, Math.min(camera.x, mapWidth - viewWidth));
  camera.y = Math.max(0, Math.min(camera.y, mapHeight - viewHeight));

  // پاک کردن canvas
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  // رندر نقشه (مثال ساده: مربع‌های رنگی برای خانه‌ها)
  ctx.fillStyle = '#228B22'; // سبز جنگل
  ctx.fillRect(-camera.x, -camera.y, mapWidth, mapHeight); // نقشه کامل اما offset با دوربین

  // رندر مرز خانه‌ها
  ctx.strokeStyle = '#000';
  for (let i = 0; i <= 900; i += 300) {
    ctx.beginPath();
    ctx.moveTo(i - camera.x, 0 - camera.y);
    ctx.lineTo(i - camera.x, mapHeight - camera.y);
    ctx.moveTo(0 - camera.x, i - camera.y);
    ctx.lineTo(mapWidth - camera.x, i - camera.y);
    ctx.stroke();
  }

  // رندر درخت‌ها (فقط اگر در viewport)
  ctx.fillStyle = '#8B4513'; // قهوه‌ای درخت
  trees.forEach(tree => {
    if (!tree.collected) {
      ctx.fillRect(tree.x - camera.x - 10, tree.y - camera.y - 10, 20, 20);
    }
  });

  // رندر کاراکتر
  ctx.fillStyle = '#FF0000'; // قرمز
  ctx.fillRect(player.x - camera.x - player.size / 2, player.y - camera.y - player.size / 2, player.size, player.size);

  // نمایش موجودی
  ctx.fillStyle = '#FFF';
  ctx.font = '16px Arial';
  ctx.fillText(`چوب: ${wood} | سکه: ${coins}`, 10, 20);

  requestAnimationFrame(gameLoop);
}

gameLoop(); // شروع loop
