// Cinematic 3D Effects and Particle System

// Particle System Background
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.canvas.style.opacity = '0.4';
    document.body.insertBefore(this.canvas, document.body.firstChild);
    
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.resize();
    this.init();
    this.setupMouseTracking();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  setupMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        const force = (150 - dist) / 150;
        particle.vx -= (dx / dist) * force * 0.2;
        particle.vy -= (dy / dist) * force * 0.2;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundaries
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 174, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 174, 255, ${0.1 * (1 - dist / 120)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });
  }
}

// Cursor 3D Tilt Effect
class CursorTilt {
  constructor() {
    this.cards = document.querySelectorAll('.card, .team-card, .metric, .chart-card');
    this.init();
  }
  
  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.bar = document.createElement('div');
    this.bar.className = 'scroll-progress-bar';
    document.body.appendChild(this.bar);
    this.update();
    window.addEventListener('scroll', () => this.update());
  }
  
  update() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    this.bar.style.width = `${progress}%`;
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.createElement('button');
    this.button.className = 'back-to-top';
    this.button.innerHTML = '↑';
    this.button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(this.button);
    
    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });
  }
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.screen = document.createElement('div');
    this.screen.className = 'loading-screen';
    this.screen.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading CKD ECG Analysis</div>
      </div>
    `;
    document.body.appendChild(this.screen);
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.screen.classList.add('fade-out');
        setTimeout(() => {
          this.screen.remove();
        }, 500);
      }, 800);
    });
  }
}

// Parallax Scrolling Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.hero, .hero-visual, .canvas-wrap');
    this.init();
    window.addEventListener('scroll', () => this.update());
  }
  
  init() {
    this.elements.forEach(el => {
      el.style.transition = 'transform 0.1s ease-out';
    });
  }
  
  update() {
    const scrollY = window.pageYOffset;
    
    this.elements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1);
      const offset = scrollY * speed * 0.1;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
}

// Initialize all cinematic effects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCinematicEffects);
} else {
  initCinematicEffects();
}

function initCinematicEffects() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new LoadingScreen();
    new ParticleSystem();
    new ParallaxEffect();
  }
  
  new CursorTilt();
  new ScrollProgress();
  new BackToTop();
}
