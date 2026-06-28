/* ═══════════════════════════════════════
   16:11:25  —  main script
   ═══════════════════════════════════════ */

/* ── PAGE NAVIGATION ── */
function goTo(n) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  var target = document.getElementById('page-' + n);
  target.classList.add('active');

  if (n === 3 || n === 4) spawnPetals();
  if (n === 3) target.scrollTop = 0;
}

/* ── PASSWORD CHECK ── */
var SECRET = '16:11:25';

function checkPwd() {
  var input = document.getElementById('pwd-input');
  var err   = document.getElementById('error-msg');

  if (input.value === SECRET) {
    err.textContent = '';
    input.value = '';
    goTo(3);
  } else {
    err.textContent = '✦  That\'s not it, my love. Try again.';
    input.classList.remove('shake');
    void input.offsetWidth; /* force reflow to restart animation */
    input.classList.add('shake');
    setTimeout(function() {
      input.classList.remove('shake');
    }, 500);
  }
}

/* ── STAR CANVAS ── */
var canvas = document.getElementById('bg-canvas');
var ctx    = canvas.getContext('2d');
var W, H;
var stars  = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var palette = ['#c77dbf', '#d4af6e', '#e07090', '#9b6bc5', '#ffffff'];

function Star() {
  this.x  = Math.random() * W;
  this.y  = Math.random() * H;
  this.r  = Math.random() * 1.2 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.15;
  this.vy = (Math.random() - 0.5) * 0.15;
  this.a  = Math.random() * 0.5 + 0.1;
  this.c  = palette[Math.floor(Math.random() * palette.length)];
}

Star.prototype.tick = function() {
  this.x += this.vx;
  this.y += this.vy;

  /* wrap back into view */
  if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
  }

  ctx.save();
  ctx.globalAlpha = this.a;
  ctx.fillStyle   = this.c;
  ctx.shadowColor = this.c;
  ctx.shadowBlur  = 6;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

for (var i = 0; i < 160; i++) {
  stars.push(new Star());
}

(function loop() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(function(s) { s.tick(); });
  requestAnimationFrame(loop);
})();

/* ── FALLING PETALS ── */
function spawnPetals() {
  var container = document.getElementById('petals');
  container.innerHTML = '';

  var symbols = ['🌸', '🌹', '💜', '✦', '❤️'];

  for (var j = 0; j < 22; j++) {
    var el = document.createElement('div');
    el.className   = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    el.style.left              = (Math.random() * 100) + 'vw';
    el.style.top               = '-60px';
    el.style.fontSize          = (Math.random() * 0.8 + 0.7) + 'rem';
    el.style.animationDuration = (Math.random() * 7 + 6) + 's';
    el.style.animationDelay    = (Math.random() * 5) + 's';

    container.appendChild(el);
  }
}
