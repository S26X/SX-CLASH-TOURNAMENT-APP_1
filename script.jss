// --- Auto update footer year ---
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// --- Download button functionality ---
const downloadBtn = document.getElementById('download-btn');
if(downloadBtn){
  downloadBtn.addEventListener('click', function(e){
    e.preventDefault();
    const link = downloadBtn.getAttribute('data-link') || downloadBtn.getAttribute('href');
    if(!link || link === '#'){
      alert('SET YOUR REAL APK DOWNLOAD LINK');
      return;
    }
    window.location.href = link;
  });
}

// --- Particle background ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles(count){
  particles = [];
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vy: Math.random() * 0.3 + 0.2, // slower velocity
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

createParticles(150);

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; // white particle color
  for(let p of particles){
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // Move particle down
    p.y += p.vy;
    if(p.y > canvas.height){ 
      p.y = -10; 
      p.x = Math.random() * canvas.width; 
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}

animateParticles();
