/* ==========================================================
   DITO MO BAGUHIN ANG MGA SULAT AT PICTURES
   ========================================================== */
const CONFIG = {
  welcome: 'Today is not just another day. It is the day a wonderful person came into this world.',
  giftMessage: 'Inside this gift is my love, my best wishes, and a big smile just for you. 💙',
  finalMessages: [
    'On your special day, I just want to say that you are one of the most beautiful blessings in my life. You have such a lovely heart and a beautiful soul that shines through in everything you do.',
    'May this year bring you endless happiness, good health, success, and every dream your heart silently wishes for. Thank you for being such an amazing person. Sana hindi ka mapikon sa mga kabaliwan ko HAHAHAHA. Happy Birthday, Skye! Amping pirmi. Loveu:) 💙',
  ],
  // Ilagay ang pictures sa "photos" folder at ayusin ang pangalan dito (ayon sa pagkakasunod)
  photos: [
    'photos/photo1.jpg',
    'photos/photo2.jpg',
    'photos/photo3.jpg',
    'photos/photo4.jpg',
    'photos/photo5.jpg',
    'photos/photo6.jpg',
    'photos/photo7.jpg',
  ],
};

const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);

/* ---------- Background ---------- */
const bg = $('bg');
for (let i = 0; i < 60; i++) {
  const d = document.createElement('span'), s = rand(2, 7);
  d.className = 'dot';
  d.style.cssText = `left:${rand(0,100)}%;top:${rand(0,100)}%;width:${s}px;height:${s}px;animation-delay:${rand(0,3)}s`;
  bg.appendChild(d);
}
[['#fff3a8','8%','72%',170], ['#ffffff','76%','76%',190], ['#bfe6ff','42%','6%',220]].forEach(([c, l, t, s]) => {
  const b = document.createElement('div');
  b.className = 'blob';
  b.style.cssText = `background:${c};left:${l};top:${t};width:${s}px;height:${s}px`;
  bg.appendChild(b);
});
[['#3f9fd8','3%','9%'], ['#f4d58d','auto','14%','3%'], ['#9fd8f5','auto','62%','8%']].forEach(([c, l, t, r]) => {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.cssText = `background:${c};left:${l};top:${t};${r ? 'right:' + r : ''}`;
  bg.appendChild(b);
});
setInterval(() => {
  const f = document.createElement('span');
  f.className = 'fl';
  f.textContent = ['💙', '🤍', '✨', '💫'][Math.floor(rand(0, 4))];
  f.style.cssText = `left:${rand(0,100)}%;font-size:${rand(14,34)}px;animation-duration:${rand(7,11)}s`;
  bg.appendChild(f);
  setTimeout(() => f.remove(), 11500);
}, 900);

/* ---------- Effects ---------- */
function confetti(n = 50) {
  const cols = ['#4aa8dc', '#ffffff', '#f4d58d', '#9fd8f5', '#1b5f8f', '#bfe6ff'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    c.style.cssText = `left:${rand(0,100)}vw;background:${cols[i % cols.length]};animation-duration:${rand(2,4)}s;animation-delay:${rand(0,.6)}s`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
function burst(x, y) {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('span');
    p.className = 'pop';
    p.textContent = ['💙', '✨', '🤍'][i % 3];
    p.style.cssText = `left:${x}px;top:${y}px;--dx:${rand(-70,70)}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }
}

/* ---------- Steps ---------- */
const steps = [...document.querySelectorAll('.step')];
const go = n => steps.forEach((s, i) => s.classList.toggle('active', i === n));

$('welcomeText').textContent = CONFIG.welcome;
$('finalMsg').innerHTML = CONFIG.finalMessages.map(t => `<p>${t}</p>`).join('');

$('cover').onclick = () => {
  if ($('cover').classList.contains('opening')) return;
  $('cover').classList.add('opening');
  confetti(30);
  setTimeout(() => $('s0').classList.add('open'), 1500);
};
$('start').onclick = () => go(1);

let caught = 0;
const cheers = ['Great catch! 💙', 'Keep going, you got this!', 'Halfway there ✨', 'Almost! One more...', 'You did it! 🎉'];
$('slots').innerHTML = '<i>💙</i>'.repeat(5);
function moveHeart() {
  $('heart').style.left = rand(4, 84) + '%';
  $('heart').style.top = rand(16, 72) + '%';
}
setInterval(() => { if ($('s1').classList.contains('active') && caught < 5) moveHeart(); }, 1800);
$('heart').onclick = e => {
  if (caught >= 5) return;
  caught++;
  $('count').textContent = `Caught: ${caught}/5`;
  $('slots').children[caught - 1].classList.add('on');
  $('cheer').textContent = cheers[caught - 1];
  burst(e.clientX, e.clientY);
  if (caught >= 5) { confetti(40); setTimeout(() => go(2), 900); return; }
  moveHeart();
};

$('gift').onclick = () => {
  if ($('gift').classList.contains('open')) return;
  $('gift').classList.add('open');
  $('giftHint').textContent = 'Surprise! 🎉';
  $('giftHint').classList.add('word');
  confetti(60);
  setTimeout(() => { $('giftMsg').textContent = CONFIG.giftMessage; $('toCake').classList.remove('hidden'); }, 600);
};
$('toCake').onclick = () => go(3);

function blow() {
  if ($('cake').classList.contains('out')) return;
  $('cake').classList.add('out');
  $('cakeHint').textContent = 'Make a wish... ✨';
  confetti(50);
  setTimeout(() => { go(4); confetti(70); }, 1600);
}
$('flame').onclick = blow;
$('blow').onclick = blow;

$('replay').onclick = () => {
  caught = 0;
  $('count').textContent = 'Caught: 0/5';
  $('gift').classList.remove('open');
  $('giftHint').textContent = 'Tap the gift box gently.';
  $('giftHint').classList.remove('word');
  [...$('slots').children].forEach(i => i.classList.remove('on'));
  $('cheer').textContent = 'Catch it if you can! 💨';
  $('heart').style.left = '70%';
  $('heart').style.top = '22%';
  $('giftMsg').textContent = '';
  $('toCake').classList.add('hidden');
  $('cake').classList.remove('out');
  $('cakeHint').textContent = 'Click the candle flame to blow it out.';
  $('cover').classList.remove('opening');
  $('s0').classList.remove('open');
  go(0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
$('more').onclick = () => {
  $('stage').classList.add('hidden');
  $('extras').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
$('back').onclick = () => {
  $('extras').classList.add('hidden');
  $('stage').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ---------- Gallery ---------- */
const P = CONFIG.photos;
const picHTML = (src, n) => `<span>📷</span><img src="${src}" alt="Photo ${n + 1}" onerror="this.remove()">`;
$('grid').innerHTML = P.map((p, n) => `<figure class="tile">${picHTML(p, n)}</figure>`).join('');

let si = 0;
function showSlide(i) {
  si = (i + P.length) % P.length;
  $('slide').innerHTML = picHTML(P[si], si);
  $('dots').innerHTML = P.map((_, k) => `<i data-k="${k}" class="${k === si ? 'on' : ''}"></i>`).join('');
}
showSlide(0);
$('sPrev').onclick = () => showSlide(si - 1);
$('sNext').onclick = () => showSlide(si + 1);
$('dots').onclick = e => { if (e.target.dataset.k) showSlide(+e.target.dataset.k); };
$('gridBtn').onclick = () => { $('grid').classList.remove('hidden'); $('slides').classList.add('hidden'); $('gridBtn').classList.add('on'); $('slideBtn').classList.remove('on'); };
$('slideBtn').onclick = () => { $('grid').classList.add('hidden'); $('slides').classList.remove('hidden'); $('slideBtn').classList.add('on'); $('gridBtn').classList.remove('on'); };
