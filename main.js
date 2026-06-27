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
});
