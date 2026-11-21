// 1. LOGIKA SPOTLIGHT / TOUCH REVEAL HIGURUMA
const spotlightBox = document.getElementById('spotlight-box');
const higurumaLayer = document.getElementById('higuruma-layer');
const auraRing = document.getElementById('aura-ring');
const modeStatus = document.getElementById('mode-status');
const verdictLabel = document.getElementById('verdict-label');
const spotlightRadius = 85;

function moveSpotlight(clientX, clientY) {
  if (spotlightBox.classList.contains('full-reveal')) return;
  const rect = spotlightBox.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  spotlightBox.classList.add('active');
  higurumaLayer.style.clipPath = `circle(${spotlightRadius}px at ${x}px ${y}px)`;
  auraRing.style.left = `${x}px`;
  auraRing.style.top = `${y}px`;

  modeStatus.textContent = 'DOMAIN ACTIVE';
  modeStatus.style.color = '#fca5a5';
  verdictLabel.innerHTML = '<i class="fas fa-gavel"></i> HIROMI HIGURUMA';
  verdictLabel.style.color = '#fca5a5';
}

function hideSpotlight() {
  if (spotlightBox.classList.contains('full-reveal')) return;
  spotlightBox.classList.remove('active');
  higurumaLayer.style.clipPath = `circle(0px at 50% 50%)`;
  modeStatus.textContent = 'STANDBY';
  modeStatus.style.color = '#9ca3af';
  verdictLabel.innerHTML = '<i class="fas fa-gavel"></i> RIZKI.DEV';
  verdictLabel.style.color = '#fde047';
}

spotlightBox.addEventListener('mousemove', (e) => moveSpotlight(e.clientX, e.clientY));
spotlightBox.addEventListener('mouseleave', hideSpotlight);
spotlightBox.addEventListener('touchstart', (e) => moveSpotlight(e.touches[0].clientX, e.touches[0].clientY));
spotlightBox.addEventListener('touchmove', (e) => moveSpotlight(e.touches[0].clientX, e.touches[0].clientY));
spotlightBox.addEventListener('touchend', hideSpotlight);

spotlightBox.addEventListener('dblclick', () => {
  const isFull = spotlightBox.classList.toggle('full-reveal');
  if (isFull) {
    auraRing.style.opacity = '0';
    modeStatus.textContent = '100% DOMAIN';
    modeStatus.style.color = '#fca5a5';
    verdictLabel.innerHTML = '<i class="fas fa-gavel"></i> DEADLY SENTENCING';
  } else {
    hideSpotlight();
  }
});

// 2. PARTIKEL EMAS CURSED ENERGY
const canvas = document.getElementById('gavel-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const colors = ['rgba(234, 179, 8, 0.5)', 'rgba(253, 224, 71, 0.45)', 'rgba(220, 38, 38, 0.35)'];
for (let i = 0; i < 38; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 1,
    vy: -(Math.random() * 0.6 + 0.2),
    vx: (Math.random() - 0.5) * 0.35,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('cursor-glow');
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

function animateAura() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y += p.vy;
    p.x += p.vx;
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = p.color;
    ctx.fill();
  });
  requestAnimationFrame(animateAura);
}
animateAura();

// 3. Live Clock WIB
function updateClock() {
  const now = new Date();
  document.getElementById('live-clock').textContent = now.toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
}
setInterval(updateClock, 1000);
updateClock();

// 4. Typing Effect
const roles = [
  "Information Systems Student",
  "Grade 1 Sorcerer • Front-End Dev",
  "Deadly Sentencing Architect",
  "Visual & Media Operations"
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = roles[roleIdx];
  typedEl.textContent = current.substring(0, charIdx);
  if (!isDeleting && charIdx < current.length) {
    charIdx++; setTimeout(typeLoop, 75);
  } else if (isDeleting && charIdx > 0) {
    charIdx--; setTimeout(typeLoop, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(typeLoop, 1100);
  }
}
typeLoop();

// 5. Interactive Courtroom Terminal
const cmdInput = document.getElementById('cmd-input');
const termOut = document.getElementById('terminal-output');

cmdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = cmdInput.value.trim().toLowerCase();
    cmdInput.value = '';
    if (!val) return;

    let response = '';
    if (val === 'help') response = 'Perintah: domain, normal, stack, clear';
    else if (val === 'domain') {
      spotlightBox.classList.add('full-reveal');
      auraRing.style.opacity = '0';
      modeStatus.textContent = '100% DOMAIN';
      modeStatus.style.color = '#fca5a5';
      verdictLabel.innerHTML = '<i class="fas fa-gavel"></i> DEADLY SENTENCING';
      response = '⚖️ Deadly Sentencing AKTIF penuh! Ketik "normal" untuk kembali.';
    }
    else if (val === 'normal') {
      spotlightBox.classList.remove('full-reveal');
      hideSpotlight();
      response = '🔄 Mode normal dipulihkan.';
    }
    else if (val === 'stack') response = 'HTML, CSS, JS, Python, Canva, MS Office';
    else if (val === 'clear') { termOut.innerHTML = ''; return; }
    else response = `Perintah '${val}' ditolak pengadilan. Ketik 'help'.`;

    termOut.innerHTML += `<div><span style="color:var(--gold)">§ ${val}</span><br>${response}</div>`;
    termOut.scrollTop = termOut.scrollHeight;
  }
});

// 6. Filter Bento Tabs
function filterSection(category, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.filter-item').forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      if (card.classList.contains('project-item') || card.classList.contains('higuruma-card') || card.classList.contains('section-divider')) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'block';
      }
    } else {
      card.style.display = 'none';
    }
  });
}

// 7. Modal Detail Proyek + Link Menuju Project
function openModal(title, desc, tags, projectUrl) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-tags').innerHTML = tags.map(t => `<span class="stack-pill">${t}</span>`).join('');
  document.getElementById('modal-link').href = projectUrl || '#';
  document.getElementById('project-modal').classList.add('open');
}

function closeModal(e) {
  if (e.target.id === 'project-modal') document.getElementById('project-modal').classList.remove('open');
}

// 8. Floating Pop-up Music Widget (Playlist)
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4; // Volume 40% agar nyaman sebagai backsound

const playlist = [
  { title: 'NIGHT DANCER — imase', src: 'night-dancer.mp3' },
  { title: 'Shinunoga E-Wa — Fujii Kaze', src: 'shinunoga-ewa.mp3' }
];
let currentTrack = 0;

function loadTrack(index, autoPlay = false) {
  currentTrack = (index + playlist.length) % playlist.length;
  bgMusic.src = playlist[currentTrack].src;
  document.getElementById('track-title').textContent = playlist[currentTrack].title;
  document.getElementById('track-index').textContent = `${currentTrack + 1}/${playlist.length}`;

  if (autoPlay) {
    bgMusic.play();
    document.getElementById('music-fab').classList.add('playing');
    document.getElementById('play-icon').className = 'fas fa-pause';
    document.getElementById('track-status').textContent = 'Sedang memutar...';
  }
}

function toggleMusicPopup() {
  document.getElementById('music-popup').classList.toggle('show');
}

function toggleMusic() {
  const fab = document.getElementById('music-fab');
  const icon = document.getElementById('play-icon');
  const status = document.getElementById('track-status');

  if (bgMusic.paused) {
    bgMusic.play();
    fab.classList.add('playing');
    icon.className = 'fas fa-pause';
    status.textContent = 'Sedang memutar...';
  } else {
    bgMusic.pause();
    fab.classList.remove('playing');
    icon.className = 'fas fa-play';
    status.textContent = 'Dijeda';
  }
}

function nextTrack() {
  loadTrack(currentTrack + 1, !bgMusic.paused);
}

function prevTrack() {
  loadTrack(currentTrack - 1, !bgMusic.paused);
}

// Otomatis lanjut ke lagu berikutnya saat lagu selesai
bgMusic.addEventListener('ended', () => {
  loadTrack(currentTrack + 1, true);
});

// 9. Copy Kontak
function copyEmail() {
  navigator.clipboard.writeText('rizkipebrian@example.com');
  const lbl = document.getElementById('copy-label');
  lbl.textContent = 'Tersalin!';
  setTimeout(() => lbl.textContent = 'Salin Kontak', 2000);
}