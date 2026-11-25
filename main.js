import {
  PROFILE,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATES,
  AWARDS,
  GALLERY_ITEMS,
} from './src/data.js';

// =========================================================
// INITIALIZE PROFILE CONTENT
// =========================================================
function initProfile() {
  const nameEl = document.getElementById('aboutName');
  const bioEl = document.getElementById('aboutBioText');
  const cvBtn = document.getElementById('viewCvBtn');
  const cvBtnMobile = document.getElementById('viewCvBtnMobile');
  const portraitEl = document.getElementById('aboutPortrait');
  const heroSubjectEl = document.getElementById('heroSubjectImg');
  const eventImgEl = document.getElementById('contactEventImg');

  if (nameEl) nameEl.innerHTML = 'Irgi Muhammad<br>Fadll';
  if (bioEl) bioEl.textContent = PROFILE.bio;
  if (cvBtn) cvBtn.href = PROFILE.cvUrl;
  if (cvBtnMobile) cvBtnMobile.href = PROFILE.cvUrl;
  if (portraitEl) portraitEl.src = PROFILE.portraitUrl;
  if (heroSubjectEl) heroSubjectEl.src = PROFILE.heroSubjectUrl;
  if (eventImgEl) eventImgEl.src = PROFILE.eventPhotoUrl;

  const findMeList = document.getElementById('findMeList');
  if (findMeList) {
    findMeList.innerHTML = PROFILE.socials
      .map(
        (s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="find-me-item">
        <span class="find-me-left">
          <i class='bx bxl-${s.icon}' style="color:${s.color}"></i>
          <span>${s.name}</span>
        </span>
        <i class='bx bx-link-external find-me-arrow'></i>
      </a>`
      )
      .join('');
  }
}

// =========================================================
// 5-LAYER SCROLL PARALLAX HERO
// =========================================================
function initParallaxHero() {
  const section = document.getElementById('Home');
  const layerSky = document.getElementById('layerSky');
  const layerMountain = document.getElementById('layerMountain');
  const layerTitle = document.getElementById('layerTitle');
  const layerSubject = document.getElementById('layerSubject');
  const layerForest = document.getElementById('layerForest');
  const scrollCue = document.getElementById('heroScrollCue');

  if (!section) return;

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
    const progress = scrolled / maxScroll; // 0 -> 1

    if (layerSky) {
      layerSky.style.transform = `translate3d(0, ${progress * 45}px, 0) scale(${1 + progress * 0.04})`;
      layerSky.style.opacity = `${Math.max(0.15, 1 - Math.max(0, progress - 0.68) * 2.6)}`;
    }
    if (layerMountain) {
      layerMountain.style.transform = `translate3d(0, ${progress * 85}px, 0) scale(${1 + progress * 0.07})`;
      layerMountain.style.opacity = `${Math.max(0.08, 1 - Math.max(0, progress - 0.68) * 2.8)}`;
    }
    if (layerTitle) {
      // Title rises up behind the foreground subject and in front of the skyline
      layerTitle.style.transform = `translate3d(0, ${40 - progress * 195}px, 0)`;
      layerTitle.style.opacity = `${Math.max(0, 1 - Math.max(0, progress - 0.62) * 2.8)}`;
    }
    if (layerSubject) {
      layerSubject.style.transform = `translate3d(0, ${progress * 32}px, 0) scale(${1 + progress * 0.12})`;
      layerSubject.style.opacity = `${Math.max(0, 1 - Math.max(0, progress - 0.72) * 3.4)}`;
    }
    if (layerForest) {
      layerForest.style.transform = `scale(${1 + progress * 0.42})`;
      layerForest.style.opacity = `${Math.max(0, 1 - progress * 1.15)}`;
    }
    if (scrollCue) {
      scrollCue.style.opacity = progress > 0.08 ? '0' : '1';
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}

// =========================================================
// FLOATING ADAPTIVE PILL NAVBAR + SLIDING MASCOT
// =========================================================
function initFloatingNav() {
  const nav = document.getElementById('floatingNav');
  const activePill = document.getElementById('navActivePill');
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const lightZone = document.querySelector('.light-zone');

  if (!nav || !activePill || !links.length) return;

  function movePillTo(linkEl) {
    const navRect = nav.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const offsetLeft = linkRect.left - navRect.left - 6;
    activePill.style.width = `${linkRect.width}px`;
    activePill.style.transform = `translateX(${offsetLeft}px)`;
  }

  function setActiveSection(sectionId) {
    links.forEach((link) => {
      const isMatch = link.dataset.section === sectionId;
      link.classList.toggle('active', isMatch);
      if (isMatch) movePillTo(link);
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.section;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    });
  });

  const sectionIds = ['Home', 'About', 'Portofolio', 'Contact'];

  function onScrollNav() {
    let current = 'Home';
    const threshold = window.innerHeight * 0.38;

    if (window.scrollY > 40) {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      // If scrolled to very bottom, ensure Contact is active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
        current = 'Contact';
      }
    }
    setActiveSection(current);

    // Switch navbar theme automatically when entering the Light Zone
    if (lightZone) {
      const lightTop = lightZone.getBoundingClientRect().top;
      const isOverLight = lightTop <= 72;
      nav.classList.toggle('nav-light', isOverLight);
      nav.classList.toggle('nav-dark', !isOverLight);
    }
  }

  window.addEventListener('scroll', onScrollNav, { passive: true });
  window.addEventListener('resize', () => {
    const active = nav.querySelector('.nav-link.active') || links[0];
    movePillTo(active);
  });

  requestAnimationFrame(() => {
    movePillTo(links[0]);
    onScrollNav();
  });
}

// =========================================================
// DUAL TIMELINES (EDUCATION & EXPERIENCE)
// =========================================================
function initTimelines() {
  const eduContainer = document.getElementById('educationTimeline');
  const expContainer = document.getElementById('experienceTimeline');

  if (eduContainer) {
    eduContainer.innerHTML = EDUCATION.map(
      (item, idx) => `
      <div class="timeline-row ${idx === 0 ? 'active' : ''}" data-edu-idx="${idx}">
        <div class="timeline-node">${idx + 1}</div>
        <div class="timeline-row-top">
          <div class="org-logo"><img src="${item.logo}" alt="${item.institution}" decoding="async" /></div>
          <span class="org-name">${item.institution}</span>
          <span class="year-badge">${item.period}</span>
        </div>
        <h5 class="timeline-role">${item.title}</h5>
        <div class="timeline-meta">
          <span>${item.subtitle}</span>
          <span>•</span>
          <span class="category-pill">${item.badge}</span>
        </div>
      </div>`
    ).join('');

    eduContainer.querySelectorAll('.timeline-row').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        eduContainer.querySelectorAll('.timeline-row').forEach((r) => r.classList.remove('active'));
        row.classList.add('active');
      });
    });
  }

  if (expContainer) {
    expContainer.innerHTML = EXPERIENCE.map(
      (item, idx) => `
      <div class="timeline-row clickable ${idx === 0 ? 'active expanded' : ''}" data-exp-idx="${idx}">
        <div class="timeline-node">${idx + 1}</div>
        <div class="timeline-row-top">
          <div class="org-logo"><img src="${item.logo}" alt="${item.organization}" decoding="async" /></div>
          <span class="org-name">${item.organization}</span>
          <span class="year-badge">${item.period}</span>
        </div>
        <h5 class="timeline-role">${item.title}</h5>
        <div class="timeline-meta">
          <span>${item.subtitle}</span>
          <span>•</span>
          <span class="category-pill">${item.badge}</span>
        </div>
        <ul class="timeline-bullets">
          ${item.bullets.map((b) => `<li>${b}</li>`).join('')}
        </ul>
      </div>`
    ).join('');

    expContainer.querySelectorAll('.timeline-row').forEach((row) => {
      row.addEventListener('click', () => {
        const wasExpanded = row.classList.contains('expanded');
        expContainer.querySelectorAll('.timeline-row').forEach((r) => {
          r.classList.remove('active');
        });
        row.classList.add('active');
        row.classList.toggle('expanded', !wasExpanded);
      });
    });
  }
}

// =========================================================
// INTERACTIVE 3D GLASSMORPHIC FOLDER CARDS
// =========================================================
function initFolders(onJumpToTab) {
  const grid = document.getElementById('foldersGrid');
  if (!grid) return;

  const folders = [
    {
      tab: 'projects',
      count: PROJECTS.length,
      label: 'Projects',
      previews: PROJECTS.slice(0, 4).map((p) => p.image),
    },
    {
      tab: 'certificates',
      count: CERTIFICATES.length,
      label: 'Certificates',
      previews: CERTIFICATES.slice(0, 4).map((c) => c.image),
    },
    {
      tab: 'awards',
      count: AWARDS.length,
      label: AWARDS.length > 1 ? 'Awards' : 'Award',
      previews: AWARDS.slice(0, 4).map((a) => a.image),
    },
  ];

  grid.innerHTML = folders
    .map(
      (f) => `
    <div class="folder-card reveal-item" data-folder-tab="${f.tab}" role="button" tabindex="0" aria-expanded="false">
      <div class="folder-back"></div>
      <div class="folder-papers">
        ${f.previews
          .map(
            (src, i) => `
          <div class="folder-paper">
            <img src="${src}" alt="${f.label} preview ${i + 1}" loading="lazy" />
          </div>`
          )
          .join('')}
      </div>
      <div class="folder-front">
        <div class="folder-stat">
          <span class="folder-count">${f.count}</span>
          <span class="folder-label">${f.label}</span>
        </div>
        <button class="folder-more-btn" type="button" data-jump-tab="${f.tab}" title="Lihat semua ${f.label}">
          <i class='bx bx-dots-horizontal-rounded'></i>
        </button>
      </div>
    </div>`
    )
    .join('');

  grid.querySelectorAll('.folder-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const moreBtn = e.target.closest('.folder-more-btn');
      if (moreBtn) {
        e.stopPropagation();
        onJumpToTab(moreBtn.dataset.jumpTab);
        return;
      }
      const isOpen = card.classList.toggle('is-open');
      card.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

// =========================================================
// KINETIC "PORTOFOLIO" SCROLL ZOOM INTO "R" -> WHITEOUT TRANSITION
// =========================================================
function initKineticBanner() {
  const section = document.getElementById('kineticBannerSection');
  const container = document.getElementById('kineticWord');
  const whiteout = document.getElementById('kineticWhiteout');
  const nav = document.getElementById('floatingNav');
  if (!section || !container) return;

  const word = 'PORTOFOLIO';
  container.innerHTML = word
    .split('')
    .map((ch) => `<span class="kinetic-letter">${ch}</span>`)
    .join('');

  const letters = container.querySelectorAll('.kinetic-letter');
  const letterR = letters[2]; // 'R' in P-O-R-T-O-F-O-L-I-O

  function updateOriginToR() {
    if (!letterR) return;
    const originX = letterR.offsetLeft + letterR.offsetWidth * 0.42;
    const originY = letterR.offsetTop + letterR.offsetHeight * 0.48;
    container.style.transformOrigin = `${originX}px ${originY}px`;
  }

  let ticking = false;

  function updateKineticScroll() {
    const rect = section.getBoundingClientRect();
    const totalScrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

    // Zoom and tilt toward letter R from progress 0.12 -> 0.90 (reverses automatically on scroll up)
    const zoomT = Math.min(Math.max((progress - 0.12) / 0.78, 0), 1);
    const scale = 1 + Math.pow(zoomT, 2.35) * 42;
    const tilt = -(zoomT * 14);
    container.style.transform = `scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;

    // Smooth whiteout into the light Portfolio section (progress 0.60 -> 0.92)
    const whiteOpacity = Math.min(Math.max((progress - 0.6) / 0.32, 0), 1);
    if (whiteout) {
      whiteout.style.opacity = whiteOpacity.toFixed(3);
    }

    // Keep navbar legible when whiteout turns bright
    if (nav && rect.top <= 0 && rect.bottom >= 72) {
      const useLightNav = whiteOpacity > 0.45;
      nav.classList.toggle('nav-light', useLightNav);
      nav.classList.toggle('nav-dark', !useLightNav);
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateKineticScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    updateOriginToR();
    updateKineticScroll();
  });

  requestAnimationFrame(() => {
    updateOriginToR();
    updateKineticScroll();
  });
}

// =========================================================
// PORTFOLIO SHOWCASE TABS & CAROUSEL
// =========================================================
let currentTab = 'projects';

function renderShowcase(tab) {
  currentTab = tab;
  const track = document.getElementById('showcaseTrack');
  const viewport = document.getElementById('showcaseViewport');
  const tabs = document.querySelectorAll('.seg-tab');

  tabs.forEach((btn) => {
    const active = btn.dataset.tab === tab;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  if (!track) return;

  if (tab === 'projects') {
    track.innerHTML = PROJECTS.map(
      (p) => `
      <article class="showcase-project-card">
        <div class="project-thumb-box">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <h3 class="showcase-card-title">${p.title}</h3>
        <p class="showcase-card-desc">${p.shortDesc}</p>
        <button class="card-details-btn" type="button" data-project-slug="${p.slug}">
          <span>Details</span>
          <i class='bx bx-right-arrow-alt'></i>
        </button>
      </article>`
    ).join('');

    track.querySelectorAll('[data-project-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openProjectDetail(btn.dataset.projectSlug));
    });
  } else if (tab === 'certificates') {
    track.innerHTML = CERTIFICATES.map(
      (c, i) => `
      <article class="showcase-cert-card" data-cert-idx="${i}" title="${c.title}">
        <div class="cert-thumb-box">
          <img src="${c.image}" alt="${c.title}" loading="lazy" />
          <div class="cert-hover-overlay">
            <i class='bx bx-expand-alt'></i>
            <span>View Certificate</span>
          </div>
        </div>
      </article>`
    ).join('');

    track.querySelectorAll('[data-cert-idx]').forEach((card) => {
      card.addEventListener('click', () => {
        const item = CERTIFICATES[Number(card.dataset.certIdx)];
        openLightbox(item.image, item.title, item.issuer, '');
      });
    });
  } else {
    track.innerHTML = AWARDS.map(
      (a, i) => `
      <article class="showcase-cert-card" data-award-idx="${i}" title="${a.title}">
        <div class="cert-thumb-box">
          <img src="${a.image}" alt="${a.title}" loading="lazy" />
          <div class="cert-hover-overlay">
            <i class='bx bx-trophy'></i>
            <span>View Award</span>
          </div>
        </div>
      </article>`
    ).join('');

    track.querySelectorAll('[data-award-idx]').forEach((card) => {
      card.addEventListener('click', () => {
        const item = AWARDS[Number(card.dataset.awardIdx)];
        openLightbox(item.image, item.title, item.issuer, item.description);
      });
    });
  }

  if (viewport) {
    viewport.scrollTo({ left: 0, behavior: 'smooth' });
  }
  updateCarouselDots();
}

function updateCarouselDots() {
  const dotsWrap = document.getElementById('carouselDots');
  const viewport = document.getElementById('showcaseViewport');
  if (!dotsWrap || !viewport) return;

  const count =
    currentTab === 'projects'
      ? PROJECTS.length
      : currentTab === 'certificates'
        ? CERTIFICATES.length
        : AWARDS.length;

  const perPage = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const pages = Math.max(1, Math.ceil(count / perPage));
  const activePage = Math.min(
    pages - 1,
    Math.round(viewport.scrollLeft / Math.max(1, viewport.clientWidth))
  );

  dotsWrap.innerHTML = Array.from({ length: pages })
    .map(
      (_, idx) =>
        `<button class="carousel-dot ${idx === activePage ? 'active' : ''}" type="button" data-page="${idx}" aria-label="Slide ${idx + 1}"></button>`
    )
    .join('');

  dotsWrap.querySelectorAll('.carousel-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const page = Number(dot.dataset.page);
      viewport.scrollTo({ left: page * viewport.clientWidth, behavior: 'smooth' });
    });
  });
}

function initShowcase() {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const viewport = document.getElementById('showcaseViewport');

  document.querySelectorAll('.seg-tab').forEach((btn) => {
    btn.addEventListener('click', () => renderShowcase(btn.dataset.tab));
  });

  if (prevBtn && viewport) {
    prevBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -viewport.clientWidth * 0.85, behavior: 'smooth' });
    });
  }

  if (nextBtn && viewport) {
    nextBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: viewport.clientWidth * 0.85, behavior: 'smooth' });
    });
  }

  if (viewport) {
    viewport.addEventListener('scroll', updateCarouselDots, { passive: true });
  }

  window.addEventListener('resize', updateCarouselDots);
  renderShowcase('projects');
}

// =========================================================
// DARK-MODE PROJECT DETAIL VIEW (/project/:slug via hash)
// =========================================================
function openProjectDetail(slug, updateHash = true) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return;

  const overlay = document.getElementById('projectDetailOverlay');
  const titleEl = document.getElementById('detailTitle');
  const breadcrumbEl = document.getElementById('detailBreadcrumbTitle');
  const descEl = document.getElementById('detailDesc');
  const highlightsEl = document.getElementById('detailHighlights');
  const descWrap = document.getElementById('detailDescWrap');
  const expandBtn = document.getElementById('detailExpandBtn');
  const actionRow = document.getElementById('detailActionRow');
  const techBadges = document.getElementById('detailTechBadges');
  const imgEl = document.getElementById('detailImage');

  if (titleEl) titleEl.textContent = project.title;
  if (breadcrumbEl) breadcrumbEl.textContent = project.title;
  if (descEl) descEl.textContent = project.fullDesc;
  if (highlightsEl) {
    highlightsEl.innerHTML = project.highlights.map((h) => `<li>${h}</li>`).join('');
  }
  if (imgEl) {
    imgEl.src = project.image;
    imgEl.alt = project.title;
  }

  if (descWrap) descWrap.classList.remove('expanded');
  if (expandBtn) {
    expandBtn.classList.remove('expanded');
    expandBtn.querySelector('span').textContent = 'Lihat selengkapnya';
  }

  if (actionRow) {
    const buttons = [];
    if (project.demo) {
      buttons.push(`
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn-royal">
          <i class='bx bx-link-external'></i>
          <span>Live Demo</span>
        </a>`);
    }
    if (project.github) {
      buttons.push(`
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-outline-dark">
          <i class='bx bxl-github'></i>
          <span>Source Code</span>
        </a>`);
    }
    actionRow.innerHTML = buttons.join('');
  }

  if (techBadges) {
    techBadges.innerHTML = project.tech
      .map((t) =>
        t.icon
          ? `<span class="tech-pill-dark"><img src="${t.icon}" alt="${t.name}" /><span>${t.name}</span></span>`
          : `<span class="tech-pill-dark"><span class="tech-pill-badge">${t.badge}</span><span>${t.name}</span></span>`
      )
      .join('');
  }

  if (overlay) {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.scrollTop = 0;
  }
  document.body.classList.add('modal-open');

  if (updateHash) {
    history.pushState({ projectSlug: slug }, '', `#project/${slug}`);
  }
}

function closeProjectDetail(updateHash = true) {
  const overlay = document.getElementById('projectDetailOverlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (updateHash && window.location.hash.startsWith('#project/')) {
    history.pushState({}, '', '#Portofolio');
  }
}

function initProjectDetailControls() {
  const backBtn = document.getElementById('detailBackBtn');
  const expandBtn = document.getElementById('detailExpandBtn');
  const descWrap = document.getElementById('detailDescWrap');

  if (backBtn) {
    backBtn.addEventListener('click', () => closeProjectDetail(true));
  }

  if (expandBtn && descWrap) {
    expandBtn.addEventListener('click', () => {
      const expanded = descWrap.classList.toggle('expanded');
      expandBtn.classList.toggle('expanded', expanded);
      expandBtn.querySelector('span').textContent = expanded ? 'Sembunyikan' : 'Lihat selengkapnya';
    });
  }

  window.addEventListener('popstate', () => {
    if (window.location.hash.startsWith('#project/')) {
      const slug = window.location.hash.replace('#project/', '');
      openProjectDetail(slug, false);
    } else {
      closeProjectDetail(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectDetail(true);
      closeLightbox();
    }
  });

  if (window.location.hash.startsWith('#project/')) {
    const slug = window.location.hash.replace('#project/', '');
    openProjectDetail(slug, false);
  }
}

// =========================================================
// LIGHTBOX MODAL (CERTIFICATES & AWARDS & GALLERY)
// =========================================================
function openLightbox(src, title, issuer, desc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const issuerEl = document.getElementById('lightboxIssuer');
  const descEl = document.getElementById('lightboxDesc');

  if (img) {
    img.src = src;
    img.alt = title;
  }
  if (titleEl) titleEl.textContent = title;
  if (issuerEl) issuerEl.textContent = issuer;
  if (descEl) {
    descEl.textContent = desc || '';
    descEl.style.display = desc ? 'block' : 'none';
  }
  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.getElementById('projectDetailOverlay')?.classList.contains('is-open')) {
    document.body.classList.remove('modal-open');
  }
}

function initLightbox() {
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxBackdrop')?.addEventListener('click', closeLightbox);
}

// =========================================================
// SCATTERED PHOTO COLLAGE GALLERY (SCROLL FADE IN -> ZOOM -> FADE OUT)
// =========================================================
function initScatteredGallery() {
  const section = document.getElementById('gallerySection');
  const container = document.getElementById('scatteredGallery');
  if (!section || !container) return;

  container.innerHTML = GALLERY_ITEMS.map(
    (item) => `
    <div class="gallery-photo-card"
      style="top:${item.top}; left:${item.left}; width:${item.width}px; z-index:${item.z};"
      data-gal-id="${item.id}">
      <div class="gallery-photo-inner">
        <img src="${item.src}" alt="" decoding="async" />
      </div>
    </div>`
  ).join('');

  const cards = Array.from(container.querySelectorAll('.gallery-photo-card'));

  cards.forEach((card) => {
    const inner = card.querySelector('.gallery-photo-inner');

    // Interactive 3D tilt + lift when mouse moves over photo (hover only, not clickable)
    card.addEventListener('mousemove', (e) => {
      if (!inner) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = (-y * 12).toFixed(2);
      const tiltY = (x * 12).toFixed(2);
      inner.style.transform = `perspective(700px) translateY(-10px) scale(1.1) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      if (inner) inner.style.transform = '';
    });
  });

  let ticking = false;

  function updateGalleryScroll() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = Math.max(1, section.offsetHeight - vh);

    // Progress from when section top enters viewport bottom (-0.35) to section end (1.0)
    const entered = (vh - rect.top) / (vh * 0.85); // 0 -> 1 as it enters viewport
    const stickyProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1); // 0 -> 1 during sticky phase

    // Fade in as section enters, stay solid through mid-zoom, fade out near end
    let opacity = 0;
    if (rect.top > 0) {
      opacity = Math.min(Math.max(entered, 0), 1);
    } else if (stickyProgress < 0.7) {
      opacity = 1;
    } else {
      opacity = Math.max(0, 1 - (stickyProgress - 0.7) / 0.3);
    }

    // Smooth zoom: starts slightly smaller (0.82) on entry, grows continuously to 1.68 as user scrolls
    const entryScale = rect.top > 0 ? 0.82 + 0.18 * Math.min(Math.max(entered, 0), 1) : 1;
    const zoomScale = entryScale + stickyProgress * 0.68;

    container.style.opacity = opacity.toFixed(3);
    container.style.transform = `scale(${zoomScale.toFixed(3)})`;

    // Individual radial parallax spread so photos drift outward smoothly while zooming
    cards.forEach((card, idx) => {
      const item = GALLERY_ITEMS[idx];
      const spreadX = item.dx * stickyProgress * 1.15;
      const spreadY = item.dy * stickyProgress * 1.15;
      const rot = item.rotate * (1 - stickyProgress * 0.35);
      card.style.transform = `translate3d(${spreadX.toFixed(1)}px, ${spreadY.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateGalleryScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateGalleryScroll();
}

// =========================================================
// CONTACT FORM & GUESTBOOK COMMENTS (SUPABASE READY)
// =========================================================
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '')
  .trim()
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/+$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const HAS_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const STORAGE_KEY = 'irgi_portfolio_comments_v2';

function loadLocalComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore storage errors
  }
  return [];
}

function saveLocalComments(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore quota errors
  }
}

function formatCommentDate(isoOrString) {
  if (!isoOrString) return '';
  const d = new Date(isoOrString);
  if (Number.isNaN(d.getTime())) return String(isoOrString);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getSupabaseHeaders(extra = {}) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    ...extra,
  };
  // Legacy anon keys are JWTs (eyJ...); new sb_publishable_* keys only use the apikey header
  if (SUPABASE_ANON_KEY.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
  }
  return headers;
}

async function fetchComments() {
  if (!HAS_SUPABASE) {
    return loadLocalComments();
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/comments?select=id,author,text,avatar_url,created_at&order=created_at.desc&limit=100`,
      {
        headers: getSupabaseHeaders(),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    return rows.map((r) => ({
      id: r.id,
      author: r.author,
      text: r.text,
      avatar: r.avatar_url || '',
      date: formatCommentDate(r.created_at),
    }));
  } catch (err) {
    console.error('Gagal memuat komentar dari Supabase:', err);
    return loadLocalComments();
  }
}

async function createComment({ author, text, avatar }) {
  if (!HAS_SUPABASE) {
    const list = loadLocalComments();
    list.unshift({
      id: `c-${Date.now()}`,
      author,
      text,
      avatar: avatar || '',
      date: formatCommentDate(new Date().toISOString()),
    });
    saveLocalComments(list);
    return list;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
    method: 'POST',
    headers: getSupabaseHeaders({
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    }),
    body: JSON.stringify({
      author,
      text,
      avatar_url: avatar || '',
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `HTTP ${res.status}`);
  }
  return fetchComments();
}

function compressAvatarToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const maxSide = 160;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCommentsList(list) {
  const feed = document.getElementById('commentsFeed');
  const countEl = document.getElementById('commentCount');

  if (countEl) countEl.textContent = String(list.length);
  if (!feed) return;

  if (!list.length) {
    feed.innerHTML = `
      <div class="comments-empty-state">
        <i class='bx bx-message-square-dots'></i>
        <p>Belum ada komentar. Jadilah yang pertama menulis komentar!</p>
      </div>`;
    return;
  }

  feed.innerHTML = list
    .map(
      (c) => `
    <div class="comment-item">
      <div class="comment-avatar">
        ${c.avatar ? `<img src="${c.avatar}" alt="${escapeHtml(c.author)}" />` : `<i class='bx bx-user'></i>`}
      </div>
      <div class="comment-body-wrap">
        <div class="comment-top-row">
          <span class="comment-author">${escapeHtml(c.author)}</span>
          <span class="comment-date">${escapeHtml(c.date)}</span>
        </div>
        <p class="comment-text">${escapeHtml(c.text)}</p>
      </div>
    </div>`
    )
    .join('');
}

function showToast(message) {
  const toast = document.getElementById('toastBanner');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function initContactAndGuestbook() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const waText = encodeURIComponent(
        `Halo Irgi, saya ${name} (${email}).\n\n${message}`
      );
      window.open(`https://wa.me/6282317179877?text=${waText}`, '_blank', 'noopener,noreferrer');
      showToast('Mengarahkan pesan Anda ke WhatsApp...');
      contactForm.reset();
    });
  }

  let selectedAvatarDataUrl = '';
  const avatarInput = document.getElementById('commentAvatarInput');
  const avatarLabel = document.getElementById('avatarFileName');

  if (avatarInput) {
    avatarInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran foto maksimal 5MB.');
        avatarInput.value = '';
        return;
      }
      if (avatarLabel) avatarLabel.textContent = file.name;
      try {
        selectedAvatarDataUrl = await compressAvatarToDataUrl(file);
      } catch {
        selectedAvatarDataUrl = '';
        showToast('Gagal memproses foto profil.');
      }
    });
  }

  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const author = document.getElementById('commentAuthor').value.trim();
      const text = document.getElementById('commentBody').value.trim();
      if (!author || !text) return;

      const submitBtn = commentForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i><span>Mengirim...</span>`;
      }

      try {
        const updatedList = await createComment({
          author,
          text,
          avatar: selectedAvatarDataUrl,
        });
        renderCommentsList(updatedList);
        commentForm.reset();
        selectedAvatarDataUrl = '';
        if (avatarLabel) avatarLabel.textContent = 'Choose Profile Photo';
        showToast('Komentar berhasil dikirim!');
      } catch (err) {
        console.error('Gagal mengirim komentar:', err);
        showToast('Gagal mengirim komentar. Coba lagi ya.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  fetchComments().then(renderCommentsList);
}

// =========================================================
// SCROLL REVEAL OBSERVER
// =========================================================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));
}

// =========================================================
// BOOTSTRAP
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initProfile();
  initParallaxHero();
  initFloatingNav();
  initTimelines();
  initFolders((tab) => {
    renderShowcase(tab);
    document.getElementById('Portofolio')?.scrollIntoView({ behavior: 'smooth' });
  });
  initKineticBanner();
  initShowcase();
  initProjectDetailControls();
  initLightbox();
  initScatteredGallery();
  initContactAndGuestbook();
  initScrollReveal();
});
