/**
 * SUJAL KUMAR — PERSONAL PORTFOLIO
 * Main Interactive Script & Mobile Optimized Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectFilters();
  initProjectModal();
  initProjectSpecimens();
  initCopyEmail();
  initVisitorCounter();
  initContactForm();
  initLiveCodingStats();
});

/* ==========================================================================
   NAVIGATION & SCROLLSPY (Mobile Optimized)
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        mobileToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ==========================================================================
   PROJECT CATEGORY FILTER
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectTiles = document.querySelectorAll('.project-tile');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectTiles.forEach(tile => {
        const categories = tile.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          tile.style.display = 'flex';
          setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
          }, 10);
        } else {
          tile.style.opacity = '0';
          tile.style.transform = 'translateY(10px)';
          setTimeout(() => {
            tile.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT DEEP DIVE MODAL (Exact Resume Records)
   ========================================================================== */
const projectDatabase = {
  investintel: {
    title: "Financial Intelligence & RAG Engine",
    category: "AI / Backend Engineering",
    status: "Resume Project • 2026",
    image: "assets/images/project-investintel.svg",
    github: "https://github.com/Sujal01go/AI-Invester-intelligence-platform",
    overview: "An AI-powered financial filing intelligence platform that converts SEC 10-K/10-Q corporate disclosures into structured Markdown, generates hybrid search indexes with Azure AI Search, and extracts financial KPIs into PostgreSQL using FastAPI and GPT-4o.",
    technologies: ["Python", "FastAPI", "Azure OpenAI", "Azure AI Search", "PostgreSQL", "Docker", "PyMuPDF4LLM", "GPT-4o"],
    keyFeatures: [
      "PyMuPDF4LLM PDF-to-Markdown ingestion preserving complex financial tables and disclosure context.",
      "Hybrid BM25 keyword and vector retrieval via Azure AI Search for grounded evidence retrieval.",
      "Automated extraction of quantitative KPIs and qualitative risk factors into PostgreSQL via GPT-4o.",
      "FastAPI REST endpoints and analytics interface for conversational Q&A and cross-company analysis."
    ],
    architecture: "10-K/10-Q PDFs -> PyMuPDF4LLM -> Azure AI Search (Hybrid) -> GPT-4o Extraction -> PostgreSQL -> FastAPI Analytics."
  },
  matching_engine: {
    title: "Exchange Matching Engine",
    category: "C++ / Systems Programming",
    status: "Resume Project • In Progress",
    image: "assets/images/project-matching-engine.svg",
    github: "https://github.com/Sujal01go",
    overview: "A C++ systems-programming simulation of core financial exchange operations: order intake, order-book management, price-time priority matching, and trade execution.",
    technologies: ["C++", "STL", "Order Book", "Price-Time Priority", "Algorithms", "CMake"],
    keyFeatures: [
      "L3 order book simulation supporting buy and sell limit/market order management.",
      "Price-time priority (FIFO) order matching and trade generation.",
      "Efficient data structures and memory layouts optimized for high-throughput order processing.",
      "Engineered in modern C++ utilizing the Standard Template Library (STL) and CMake build automation."
    ],
    architecture: "Order Intake Stream -> Price-Time Priority FIFO Matching Core -> Cache-Conscious Order Book Storage -> Execution Dispatcher."
  },
  sanjeevani: {
    title: "Sanjeevani — Herbal Wellness Application",
    category: "Mobile Application / Healthcare",
    status: "Resume Project • Jan–Feb 2026",
    image: "assets/images/project-sanjeevani.svg",
    github: "https://github.com/Sujal01go/sanjeevani",
    overview: "Built a cross-platform wellness application with symptom-based recommendations, Firebase Authentication, user profiles, and cart-management workflows. Implemented a Material Design 3 interface for Android, iOS, and Web, using Firebase services for authentication and application data workflows.",
    technologies: ["Flutter", "Dart", "Firebase", "Material Design 3", "Cross-Platform (Android, iOS, Web)"],
    keyFeatures: [
      "Cross-platform wellness application engineered with Flutter & Dart for Android, iOS, and Web.",
      "Symptom-based herbal recommendation engine matching wellness needs to medicinal plants.",
      "Secure user authentication and profile management powered by Firebase Authentication.",
      "Cart-management and application data workflows backed by Firebase Cloud Firestore."
    ],
    architecture: "Flutter Material 3 UI -> Symptom Matching Engine -> Firebase Auth & Cloud Firestore -> Cart Management Flow."
  },
  astrotrack: {
    title: "AstroTrack — Mathematical Astronomy & Star Tracker",
    category: "Applied Math / Mobile Systems",
    status: "Complete & Offline First",
    image: "assets/images/project-astrotrack.svg",
    github: "https://github.com/Sujal01go/star-tracker",
    overview: "An offline-first mobile astronomy application built with Flutter and Dart that transforms raw astronomical catalogue coordinates (Hipparcos & Yale Bright Star) into local horizontal coordinates via spherical trigonometry and AR sensor attitude tracking.",
    technologies: ["Flutter", "Dart", "Hipparcos Catalogue", "Spherical Trigonometry", "AR Sensors"],
    keyFeatures: [
      "Calculates local Altitude and Azimuth from J2000.0 epoch in real-time.",
      "Local Sidereal Time (LST) and GMST orbital mechanics calculations.",
      "Device orientation sensor fusion for augmented reality night sky alignment."
    ],
    architecture: "Hipparcos Catalog -> Spherical Coordinate Transformer -> Sensor Fusion -> Canvas Renderer."
  },
  multiagent: {
    title: "Autonomous Multi-Agent Software Engineering Team",
    category: "AI Multi-Agent Systems",
    status: "Flip the Switch Hackathon",
    image: "assets/images/project-multiagent.svg",
    github: "https://github.com/Sujal01go/switch-hackathon",
    overview: "A collaborative multi-agent developer collective where autonomous AI agents (Planner, Senior Coder, Reviewer, and QA) communicate and coordinate in real-time over Telegram using Switch protocol, orchestrated with LangGraph and SQLite.",
    technologies: ["Python", "LangGraph", "Switch Protocol", "Telegram Bot API", "SQLite Checkpointing"],
    keyFeatures: [
      "Role-specialized agents: Product Planner, Senior Coder, Reviewer, and QA.",
      "LangGraph StateGraph orchestration managing deterministic turn-taking and rollback.",
      "Persistent state checkpointing via SQLite."
    ],
    architecture: "Telegram -> Switch Gateway -> LangGraph State Machine -> Worker Agents -> Output Diff."
  },
  aditya: {
    title: "Aditya-L1 Solar Flare Forecasting System",
    category: "Machine Learning / Space Science",
    status: "Research Interest",
    image: "assets/images/project-aditya.svg",
    github: "https://github.com/Sujal01go",
    overview: "Machine learning research exploring solar flare nowcasting and prediction using multi-spectral X-ray time-series data captured by instruments (SoLEXS soft X-ray & HEL1OS hard X-ray) aboard ISRO's Aditya-L1 solar observatory.",
    technologies: ["Python", "Time-Series Analysis", "Transformer Models", "ISRO Datasets"],
    keyFeatures: [
      "Multi-instrument waveform temporal alignment.",
      "Self-attention Transformer architecture modeling temporal correlations prior to solar flare eruptions."
    ],
    architecture: "ISRO Telemetry -> Waveform Alignment -> Temporal Transformer -> Flare Probability Predictor."
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('[data-project-trigger]');

  if (!modalOverlay || !modalBody) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      const project = projectDatabase[projectId];

      if (project) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;">
              <span class="badge badge-blue">${project.category}</span>
              <span class="badge badge-green">${project.status}</span>
            </div>
            <h2 style="font-size: clamp(1.3rem, 3vw, 1.6rem); font-weight: 800; letter-spacing: -0.5px; margin: 0 0 0.5rem 0;">${project.title}</h2>
          </div>

          <div class="modal-canvas-specimen tech-bracketed">
            <canvas id="modalSpecimenCanvas" aria-label="${project.title} High-Resolution Simulation"></canvas>
            <div class="specimen-hud-bar specimen-hud-top">
              <span class="specimen-hud-pill highlight"><span class="specimen-hud-pulse"></span> HIGH-RES SIMULATION</span>
              <span class="specimen-hud-pill">60 FPS ACTIVE</span>
            </div>
            <div class="specimen-hud-bar specimen-hud-bottom">
              <span class="specimen-hud-pill">Mathematical Specimen</span>
              <span class="specimen-hud-pill highlight">Live Interactive</span>
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 0.92rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Project Overview</h3>
            <p style="font-size: 0.94rem; line-height: 1.65; color: var(--text); margin: 0;">${project.overview}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 0.92rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Key Engineering Highlights</h3>
            <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
              ${project.keyFeatures.map(f => `<li style="font-size: 0.9rem; color: var(--text); line-height: 1.5;">${f}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 0.92rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Architecture &amp; Flow</h3>
            <div style="background: var(--bg-soft); border: 1px solid var(--rule); padding: 0.75rem 1rem; border-radius: 8px; font-family: var(--mono); font-size: 0.82rem; color: var(--text); overflow-x: auto; -webkit-overflow-scrolling: touch;">
              ${project.architecture}
            </div>
          </div>

          <div style="margin-bottom: 1.75rem;">
            <h3 style="font-size: 0.92rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${project.technologies.map(t => `<span class="tech-tag" style="font-size: 0.78rem; padding: 0.25rem 0.55rem;">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; padding-top: 1rem; border-top: 1px solid var(--rule);">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="button button-primary" style="flex-grow: 1;">
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" class="arrow-out" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path>
              </svg>
            </a>
          </div>
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => startModalSimulation(projectId), 40);
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    stopModalSimulation();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   COPY EMAIL INTERACTION WITH TOAST
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'sg127952@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard: sg127952@gmail.com');
        const origText = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
        }, 2200);
      }).catch(err => {
        console.error('Copy failed', err);
        showToast('Direct email: sg127952@gmail.com');
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   VISITOR COUNTER (Real-Time Live Counter via VisitorBadge API)
   ========================================================================== */
function initVisitorCounter() {
  const badgeImg = document.querySelector('.visitor-badge-img');
  if (badgeImg) {
    // Bust browser cache to fetch actual incremented hit on each session
    const baseUrl = 'https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fsujal01go.github.io&label=visitors&labelColor=%230f172a&countColor=%231e40af&style=flat';
    badgeImg.src = `${baseUrl}&_t=${Date.now()}`;
  }
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Sujal,\n\n${message}\n\nFrom: ${name} (${email})`);
    
    showToast('Opening your default email client...');
    setTimeout(() => {
      window.location.href = `mailto:sg127952@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  });
}

/* ==========================================================================
   LIVE CODING TELEMETRY (Scraping/Querying LeetCode & GitHub APIs)
   ========================================================================== */
async function initLiveCodingStats() {
  // 1. Fetch LeetCode Real-Time Telemetry
  try {
    let lcData = null;
    try {
      const res = await fetch('https://alfa-leetcode-api.onrender.com/sujal01go/solved');
      if (res.ok) lcData = await res.json();
    } catch (e) {
      // Fallback API if primary is cold
      const resFallback = await fetch('https://leetcode-api-faisalshohag.vercel.app/sujal01go');
      if (resFallback.ok) lcData = await resFallback.json();
    }

    if (lcData) {
      const total = lcData.solvedProblem || lcData.totalSolved || 239;
      const easy = lcData.easySolved || 102;
      const medium = lcData.mediumSolved || 125;
      const hard = lcData.hardSolved || 12;

      // Update counters
      const totalEl = document.getElementById('lcTotalSolved');
      const easyEl = document.getElementById('lcEasyCount');
      const medEl = document.getElementById('lcMediumCount');
      const hardEl = document.getElementById('lcHardCount');
      const heroLc = document.getElementById('heroLeetCodeCount');

      if (totalEl) totalEl.textContent = total;
      if (easyEl) easyEl.textContent = easy;
      if (medEl) medEl.textContent = medium;
      if (hardEl) hardEl.textContent = hard;
      if (heroLc) heroLc.textContent = `${total}+ LeetCode DSA`;

      // Update breakdown bar
      const barEasy = document.querySelector('.bar-segment.bar-easy');
      const barMed = document.querySelector('.bar-segment.bar-medium');
      const barHard = document.querySelector('.bar-segment.bar-hard');
      if (barEasy && barMed && barHard && total > 0) {
        barEasy.style.width = `${((easy / total) * 100).toFixed(1)}%`;
        barMed.style.width = `${((medium / total) * 100).toFixed(1)}%`;
        barHard.style.width = `${((hard / total) * 100).toFixed(1)}%`;
        barEasy.title = `Easy: ${easy}`;
        barMed.title = `Medium: ${medium}`;
        barHard.title = `Hard: ${hard}`;
      }

      // Acceptance Rate
      const accNum = lcData.acSubmissionNum || lcData.totalSubmissions;
      if (accNum && accNum[0]) {
        const totalSubmissions = lcData.totalSubmissionNum ? lcData.totalSubmissionNum[0]?.submissions : 377;
        const accepted = accNum[0]?.submissions || 274;
        const rate = totalSubmissions > 0 ? ((accepted / totalSubmissions) * 100).toFixed(1) : '72.7';
        const accEl = document.getElementById('lcAcceptance');
        if (accEl) accEl.textContent = `${rate}% (${accepted} / ${totalSubmissions})`;
      }
    }
  } catch (err) {
    console.log('Using verified fallback LeetCode metrics');
  }

  // 2. Fetch GitHub Real-Time User & Repository Telemetry
  try {
    const userRes = await fetch('https://api.github.com/users/Sujal01go');
    if (userRes.ok) {
      const u = await userRes.json();
      if (u.public_repos) {
        const repoEl = document.getElementById('ghRepoCount');
        if (repoEl) repoEl.textContent = u.public_repos;
      }
      if (u.followers !== undefined) {
        const followersEl = document.getElementById('ghFollowersCount');
        if (followersEl) followersEl.textContent = u.followers;
      }
    }

    const reposRes = await fetch('https://api.github.com/users/Sujal01go/repos?sort=pushed&per_page=8');
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        // Calculate stars
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const starEl = document.getElementById('ghStarCount');
        if (starEl && totalStars > 0) starEl.textContent = totalStars;

        // Render recent active repositories
        const reposContainer = document.getElementById('ghRecentRepos');
        if (reposContainer) {
          const topRepos = repos.filter(r => !r.fork && r.name !== 'Sujal01go').slice(0, 4);
          if (topRepos.length > 0) {
            reposContainer.innerHTML = topRepos.map(r => `
              <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo-chip" title="${r.description || r.name}">
                <span class="repo-name">${r.name}</span>
                ${r.language ? `<span class="repo-lang">${r.language}</span>` : ''}
                ${r.stargazers_count > 0 ? `<span class="repo-stars">★ ${r.stargazers_count}</span>` : ''}
              </a>
            `).join('');
          }
        }
      }
    }
  } catch (err) {
    console.log('Using verified fallback GitHub metrics');
  }
}

/* ==========================================================================
   LIVE PROCEDURAL PROJECT SPECIMEN ENGINE (Light-Mode 60 FPS Simulations)
   Inspired by precision engineering and mathematical telemetry
   ========================================================================== */
let modalSpecimenRaf = null;
const activeSpecimenRafs = new Map();

function setupDpiCanvas(canvas, logicalW, logicalH) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(logicalW * dpr);
  canvas.height = Math.floor(logicalH * dpr);
  const ctx = canvas.getContext('2d');
  if (ctx.resetTransform) {
    ctx.resetTransform();
  } else {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  ctx.scale(dpr, dpr);
  return { ctx, dpr, w: logicalW, h: logicalH };
}

// 6 Interactive Procedural Simulators
const specimenRenderers = {
  // 1. RAG Vector Embedding Space & Cosine Projection
  investintel: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);

    // Subtle blueprint grid
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
    ctx.lineWidth = 0.8;
    const step = 28;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    const clusters = [
      { name: '10-K Filings', x: w * 0.28, y: h * 0.38, color: '#2563eb' },
      { name: 'Risk Factors', x: w * 0.76, y: h * 0.32, color: '#7c3aed' },
      { name: 'Financial KPIs', x: w * 0.60, y: h * 0.72, color: '#059669' }
    ];

    clusters.forEach((c, idx) => {
      ctx.fillStyle = c.color;
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 + (idx * 1.3);
        const radius = 13 + (i % 3) * 6;
        const px = c.x + Math.cos(angle) * radius;
        const py = c.y + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
      ctx.beginPath();
      ctx.arc(c.x, c.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();

      ctx.font = '600 8.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(c.name, c.x - 22, c.y - 8);
    });

    const cycle = 3200;
    const phase = (t % cycle) / cycle;
    const target = clusters[Math.floor((t / cycle) % clusters.length)];
    const qx = w * 0.15 + (target.x - w * 0.15) * Math.min(phase * 1.4, 1);
    const qy = h * 0.85 + (target.y - h * 0.85) * Math.min(phase * 1.4, 1);

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.85);
    ctx.lineTo(qx, qy);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(qx, qy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    if (phase > 0.6) {
      const pulseR = (phase - 0.6) * 45;
      ctx.beginPath();
      ctx.arc(target.x, target.y, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37, 99, 235, ${Math.max(0, 1 - (phase - 0.6) * 2.5)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  },

  // 2. L3 Order Book Ladder & FIFO Execution Match
  matching_engine: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const midX = w * 0.5;

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(midX, 10); ctx.lineTo(midX, h - 10); ctx.stroke();

    const levels = 5;
    const barHeight = 12;
    const gap = 6;
    const startY = (h - (levels * (barHeight + gap))) / 2;

    for (let i = 0; i < levels; i++) {
      const y = startY + i * (barHeight + gap);
      const bidVol = 30 + 35 * Math.sin(t * 0.003 + i * 1.1) + 20 * (levels - i);
      const askVol = 30 + 35 * Math.cos(t * 0.003 + i * 0.9) + 20 * (levels - i);
      const maxVolW = midX * 0.72;

      const bidW = Math.min((bidVol / 120) * maxVolW, maxVolW);
      const askW = Math.min((askVol / 120) * maxVolW, maxVolW);

      ctx.fillStyle = 'rgba(5, 150, 105, 0.18)';
      ctx.fillRect(midX - bidW - 8, y, bidW, barHeight);
      ctx.fillStyle = '#059669';
      ctx.font = '600 8.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText((104.25 - i * 0.05).toFixed(2), midX - bidW - 12, y + 9);

      ctx.fillStyle = 'rgba(225, 29, 72, 0.18)';
      ctx.fillRect(midX + 8, y, askW, barHeight);
      ctx.fillStyle = '#e11d48';
      ctx.textAlign = 'left';
      ctx.fillText((104.28 + i * 0.05).toFixed(2), midX + askW + 12, y + 9);
    }

    const tradeCycle = 1800;
    const tradePhase = (t % tradeCycle) / tradeCycle;
    if (tradePhase < 0.28) {
      const alpha = 1 - tradePhase * 3.5;
      ctx.fillStyle = `rgba(37, 99, 235, ${alpha * 0.16})`;
      ctx.fillRect(midX - 55, startY - 2, 110, barHeight + 4);
      ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
      ctx.strokeRect(midX - 55, startY - 2, 110, barHeight + 4);
      ctx.font = '700 8.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
      ctx.textAlign = 'center';
      ctx.fillText('TRADE: 200 @ 104.28', midX, startY + 8);
    }
  },

  // 3. Symptom Knowledge Graph & Botanical Recommendations
  sanjeevani: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const symptoms = ['Fatigue', 'Stress', 'Immunity', 'Digestion'];
    const herbs = ['Ashwagandha', 'Brahmi', 'Giloy', 'Tulsi'];

    const leftX = w * 0.22;
    const rightX = w * 0.78;
    const count = 4;
    const gap = h / (count + 1);
    const activeIdx = Math.floor((t / 2200) % count);

    for (let i = 0; i < count; i++) {
      const sy = gap * (i + 1);
      const hy = gap * (i + 1);

      for (let j = 0; j < count; j++) {
        const targetY = gap * (j + 1);
        const isActive = (i === activeIdx && j === activeIdx);
        ctx.beginPath();
        ctx.moveTo(leftX, sy);
        ctx.bezierCurveTo(w * 0.45, sy, w * 0.55, targetY, rightX, targetY);
        ctx.strokeStyle = isActive ? '#059669' : 'rgba(203, 213, 225, 0.45)';
        ctx.lineWidth = isActive ? 2 : 0.8;
        ctx.stroke();

        if (isActive) {
          const packetF = (t % 2200) / 2200;
          const p1x = leftX, p1y = sy;
          const p2x = w * 0.45, p2y = sy;
          const p3x = w * 0.55, p3y = targetY;
          const p4x = rightX, p4y = targetY;
          const bx = Math.pow(1 - packetF, 3) * p1x + 3 * Math.pow(1 - packetF, 2) * packetF * p2x + 3 * (1 - packetF) * Math.pow(packetF, 2) * p3x + Math.pow(packetF, 3) * p4x;
          const by = Math.pow(1 - packetF, 3) * p1y + 3 * Math.pow(1 - packetF, 2) * packetF * p2y + 3 * (1 - packetF) * Math.pow(packetF, 2) * p3y + Math.pow(packetF, 3) * p4y;
          ctx.beginPath();
          ctx.arc(bx, by, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#059669';
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(leftX, sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = i === activeIdx ? '#059669' : '#64748b';
      ctx.fill();
      ctx.font = '600 8.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(symptoms[i], leftX - 8, sy + 3);

      ctx.beginPath();
      ctx.arc(rightX, hy, 4, 0, Math.PI * 2);
      ctx.fillStyle = i === activeIdx ? '#059669' : '#64748b';
      ctx.fill();
      ctx.textAlign = 'left';
      ctx.fillText(herbs[i], rightX + 8, hy + 3);
    }
  },

  // 4. AstroTrack: 3D Rotating Celestial Sphere & Spherical Trigonometry
  astrotrack: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const rx = Math.min(w, h) * 0.42;
    const ry = rx * 0.45;

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    const cardinals = [
      { text: 'N', x: cx, y: cy - ry },
      { text: 'S', x: cx, y: cy + ry },
      { text: 'E', x: cx + rx, y: cy },
      { text: 'W', x: cx - rx, y: cy }
    ];
    ctx.font = '700 8.5px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    cardinals.forEach(c => ctx.fillText(c.text, c.x, c.y));

    ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.75, rx * 0.75, 0, Math.PI, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    const numStars = 14;
    const speed = t * 0.0006;
    let targetStar = null;

    for (let i = 0; i < numStars; i++) {
      const baseAngle = (i / numStars) * Math.PI * 2;
      const angle = baseAngle + speed;
      const dec = ((i % 5) - 2) * 0.28;
      const sx = cx + Math.cos(angle) * (rx * (0.55 + 0.35 * Math.cos(dec)));
      const sy = cy - Math.sin(dec) * (rx * 0.65) + Math.sin(angle) * ry * 0.65;

      ctx.beginPath();
      const r = i === 3 ? 3.5 : 2;
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = i === 3 ? '#2563eb' : '#64748b';
      ctx.fill();

      if (i === 3) targetStar = { x: sx, y: sy };
    }

    if (targetStar) {
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(targetStar.x, targetStar.y, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(targetStar.x - 12, targetStar.y); ctx.lineTo(targetStar.x + 12, targetStar.y);
      ctx.moveTo(targetStar.x, targetStar.y - 12); ctx.lineTo(targetStar.x, targetStar.y + 12);
      ctx.stroke();

      ctx.font = '600 8.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#2563eb';
      ctx.textAlign = 'left';
      ctx.fillText('HIP 11767 (Polaris)', targetStar.x + 12, targetStar.y - 4);
    }
  },

  // 5. LangGraph Autonomous Multi-Agent State Machine
  multiagent: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const r = Math.min(w, h) * 0.36;

    const agents = [
      { name: 'PLANNER', color: '#2563eb' },
      { name: 'CODER', color: '#7c3aed' },
      { name: 'REVIEW', color: '#d97706' },
      { name: 'QA', color: '#059669' }
    ];

    const agentCoords = agents.map((a, i) => {
      const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * (r * 0.8),
        ...a
      };
    });

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < agentCoords.length; i++) {
      const next = agentCoords[(i + 1) % agentCoords.length];
      ctx.beginPath();
      ctx.moveTo(agentCoords[i].x, agentCoords[i].y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = '700 7.5px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SQLITE', cx, cy);

    const cycleDur = 2800;
    const progress = (t % cycleDur) / cycleDur;
    const currentEdge = Math.floor(progress * 4);
    const edgeFrac = (progress * 4) % 1;
    const from = agentCoords[currentEdge];
    const to = agentCoords[(currentEdge + 1) % 4];

    const packetX = from.x + (to.x - from.x) * edgeFrac;
    const packetY = from.y + (to.y - from.y) * edgeFrac;

    ctx.beginPath();
    ctx.arc(packetX, packetY, 5, 0, Math.PI * 2);
    ctx.fillStyle = from.color;
    ctx.fill();

    agentCoords.forEach((a, i) => {
      const isCurrent = (i === currentEdge);
      ctx.beginPath();
      ctx.arc(a.x, a.y, isCurrent ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = a.color;
      ctx.fill();

      ctx.font = '700 8.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(a.name, a.x, a.y + (a.y > cy ? 16 : -12));
    });
  },

  // 6. Aditya-L1 Solar X-Ray Flux Waveform & Transformer Attention
  aditya: function(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const midY = h * 0.58;

    const thresholds = [
      { label: 'X-CLASS (10⁻⁴)', y: h * 0.22, color: '#e11d48' },
      { label: 'M-CLASS (10⁻⁵)', y: h * 0.42, color: '#d97706' },
      { label: 'C-CLASS (10⁻⁶)', y: h * 0.70, color: '#2563eb' }
    ];

    thresholds.forEach(th => {
      ctx.strokeStyle = th.color;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(10, th.y); ctx.lineTo(w - 10, th.y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;
      ctx.font = '600 7.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = th.color;
      ctx.textAlign = 'right';
      ctx.fillText(th.label, w - 12, th.y - 3);
    });

    // SoLEXS Soft X-Ray Real-Time Flux Wave
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1.6;
    for (let x = 10; x < w - 10; x += 2) {
      const timeOffset = (x + t * 0.08) * 0.035;
      const burstPhase = ((x + t * 0.04) % (w * 0.75)) / (w * 0.75);
      const flareSpike = Math.exp(-Math.pow((burstPhase - 0.5) * 8, 2)) * (h * 0.38);
      const noise = Math.sin(timeOffset * 2.5) * 4 + Math.cos(timeOffset * 5.1) * 2;
      const y = midY - flareSpike + noise;

      if (x === 10) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // HEL1OS Hard X-Ray Wave
    ctx.beginPath();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.1;
    for (let x = 10; x < w - 10; x += 3) {
      const timeOffset = (x + t * 0.08) * 0.035 + 1.2;
      const burstPhase = ((x + t * 0.04) % (w * 0.75)) / (w * 0.75);
      const flareSpike = Math.exp(-Math.pow((burstPhase - 0.52) * 9, 2)) * (h * 0.32);
      const y = midY - flareSpike + Math.sin(timeOffset * 4) * 3;

      if (x === 10) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Transformer Self-Attention Window Scan
    const scanW = 54;
    const scanCycle = 3000;
    const scanX = 15 + ((t % scanCycle) / scanCycle) * (w - 30 - scanW);
    ctx.fillStyle = 'rgba(124, 58, 237, 0.12)';
    ctx.fillRect(scanX, 15, scanW, h - 30);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(scanX, 15, scanW, h - 30);
    ctx.font = '600 7px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#7c3aed';
    ctx.textAlign = 'center';
    ctx.fillText('ATTN WINDOW', scanX + scanW / 2, 26);
  }
};

function startSpecimen(canvas) {
  const animKey = canvas.getAttribute('data-anim');
  const renderer = specimenRenderers[animKey];
  if (!renderer) return;

  const wrap = canvas.parentElement;
  const logicalW = wrap.clientWidth || 320;
  const logicalH = wrap.clientHeight || 200;
  const dpi = setupDpiCanvas(canvas, logicalW, logicalH);

  let start = null;
  function frame(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    renderer(dpi.ctx, dpi.w, dpi.h, elapsed);
    activeSpecimenRafs.set(canvas, requestAnimationFrame(frame));
  }
  activeSpecimenRafs.set(canvas, requestAnimationFrame(frame));
}

function stopSpecimen(canvas) {
  if (activeSpecimenRafs.has(canvas)) {
    cancelAnimationFrame(activeSpecimenRafs.get(canvas));
    activeSpecimenRafs.delete(canvas);
  }
}

function initProjectSpecimens() {
  const canvases = document.querySelectorAll('.project-specimen-canvas');
  if (!canvases.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvases.forEach(canvas => {
      const animKey = canvas.getAttribute('data-anim');
      const renderer = specimenRenderers[animKey];
      if (renderer) {
        const wrap = canvas.parentElement;
        const dpi = setupDpiCanvas(canvas, wrap.clientWidth || 320, wrap.clientHeight || 200);
        renderer(dpi.ctx, dpi.w, dpi.h, 1200);
      }
    });
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const canvas = entry.target.querySelector('.project-specimen-canvas');
        if (!canvas) return;
        if (entry.isIntersecting) {
          startSpecimen(canvas);
        } else {
          stopSpecimen(canvas);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-specimen-wrap').forEach(wrap => {
      observer.observe(wrap);
    });
  } else {
    canvases.forEach(startSpecimen);
  }
}

function startModalSimulation(projectId) {
  stopModalSimulation();
  const canvas = document.getElementById('modalSpecimenCanvas');
  if (!canvas) return;
  const renderer = specimenRenderers[projectId];
  if (!renderer) return;

  const wrap = canvas.parentElement;
  const logicalW = wrap.clientWidth || 640;
  const logicalH = wrap.clientHeight || 220;
  const dpi = setupDpiCanvas(canvas, logicalW, logicalH);

  let start = null;
  function frame(ts) {
    if (!start) start = ts;
    renderer(dpi.ctx, dpi.w, dpi.h, ts - start);
    modalSpecimenRaf = requestAnimationFrame(frame);
  }
  modalSpecimenRaf = requestAnimationFrame(frame);
}

function stopModalSimulation() {
  if (modalSpecimenRaf) {
    cancelAnimationFrame(modalSpecimenRaf);
    modalSpecimenRaf = null;
  }
}
