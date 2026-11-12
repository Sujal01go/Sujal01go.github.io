/**
 * SUJAL KUMAR — PERSONAL PORTFOLIO
 * Main Interactive Script & Mobile Optimized Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initVisitorCounter();
  initContactForm();
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

          <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--rule); background: var(--bg-soft);">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: contain;">
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
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
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
