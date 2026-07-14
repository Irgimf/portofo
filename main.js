document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Target all elements with .scroll-reveal
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => observer.observe(el));

  // 2. Navbar Background Change on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 5, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(5, 5, 5, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 3. Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Parallax Effect for Background Orbs (Optional Enhancement)
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.glow-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20;
      const xOffset = (x * speed);
      const yOffset = (y * speed);
      
      // Update position softly
      orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });

  // 5. Projects Carousel Slider
  const track = document.querySelector('.projects-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    const getCardsVisible = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };

    const updateCarousel = () => {
      const card = track.children[0];
      if (!card) return;
      const cardWidth = card.offsetWidth;
      // Get gap from computed style or fallback to 30
      const gapMatch = window.getComputedStyle(track).gap.match(/(\d+)px/);
      const gap = gapMatch ? parseInt(gapMatch[1]) : 30;
      
      track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    };

    nextBtn.addEventListener('click', () => {
      const maxIndex = track.children.length - getCardsVisible();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const maxIndex = track.children.length - getCardsVisible();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex; // Loop back to end
      }
      updateCarousel();
    });

    // Handle resize to update carousel position
    window.addEventListener('resize', () => {
      // Ensure current index doesn't exceed new max index
      const maxIndex = Math.max(0, track.children.length - getCardsVisible());
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      // On mobile (<=768px), we use native CSS scroll snap, so reset transform
      if (window.innerWidth <= 768) {
        track.style.transform = 'none';
      } else {
        updateCarousel();
      }
    });
  }

  // 6. Portfolio Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active to clicked button and target pane
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
  // 7. Interactive Particle Network Background
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    
    const properties = {
      particleColor: 'rgba(29, 205, 159, 0.7)',
      particleRadius: 2,
      particleCount: window.innerWidth < 768 ? 40 : 80,
      particleMaxVelocity: 0.8,
      lineLength: 150
    };
    
    let mouse = { x: null, y: null };
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      properties.particleCount = window.innerWidth < 768 ? 40 : 80;
      particles = [];
      init();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = (Math.random() - 0.5) * properties.particleMaxVelocity;
        this.velocityY = (Math.random() - 0.5) * properties.particleMaxVelocity;
      }
      
      update() {
        if (this.x + this.velocityX > width || this.x + this.velocityX < 0) this.velocityX *= -1;
        if (this.y + this.velocityY > height || this.y + this.velocityY < 0) this.velocityY *= -1;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < properties.lineLength) {
            const opacity = 1 - (distance / properties.lineLength);
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(29, 205, 159, ${opacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Mouse connection and repel
        if (mouse.x && mouse.y) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < properties.lineLength * 1.5) {
            const opacity = 1 - (distance / (properties.lineLength * 1.5));
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(29, 205, 159, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            
            // Mouse push effect
            const pushRadius = 100;
            if (distance < pushRadius) {
              const force = (pushRadius - distance) / pushRadius;
              particles[i].x -= (dx / distance) * force * 2;
              particles[i].y -= (dy / distance) * force * 2;
            }
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawLines();
      requestAnimationFrame(animate);
    }

    function init() {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
    }

    init();
    animate();
  }
});
