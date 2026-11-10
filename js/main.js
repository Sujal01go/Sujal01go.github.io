/**
 * SUJAL GUPTA — PERSONAL PORTFOLIO
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initVisitorCounter();
  initContactForm();
});

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('sg_theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  updateThemeIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const target = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('sg_theme', target);
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggleBtn.innerHTML = isDark
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>`;
  toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/* ==========================================================================
   NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
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
   PROJECT DEEP DIVE MODAL
   ========================================================================== */
const projectDatabase = {
  investintel: {
    title: "InvestIntel AI — Financial Intelligence & RAG Platform",
    category: "AI & Machine Learning / Backend",
    status: "Active & Production Ready",
    image: "assets/images/project-investintel.svg",
    github: "https://github.com/Sujal01go/AI-Invester-intelligence-platform",
    overview: "An enterprise-grade financial document intelligence engine designed to ingest 10-K filings, earnings call transcripts, and balance sheet reports, process them into hybrid semantic embeddings, and answer quantitative investor queries with zero hallucinations.",
    technologies: ["Python 3.12+", "FastAPI", "Azure OpenAI (GPT-4o)", "Azure AI Search", "Hugging Face Embeddings", "PostgreSQL", "Docker", "Hybrid Retrieval"],
    keyFeatures: [
      "Modular document ingestion, chunking with sliding-window semantic boundaries, and tabular data preservation.",
      "Hybrid search fusing Azure AI Search dense vector representations and BM25 sparse keyword ranking.",
      "Strict grounding and provenance citations showing exact document pages, paragraphs, and timestamps.",
      "Automated financial KPI extraction (EBITDA, Net Margin, Debt-to-Equity, FCF) directly into structured JSON schemas.",
      "Asynchronous REST API backend built on FastAPI with high concurrent throughput."
    ],
    architecture: "Ingestion Pipeline -> Text & Table Chunker -> Vectorizer (Hugging Face / Azure) -> Hybrid Index -> Context Grounder -> Azure OpenAI GPT-4o -> FastAPI REST Interface."
  },
  matching_engine: {
    title: "Low-Latency Exchange Matching Engine",
    category: "C++ / Systems Programming / Quantitative Tech",
    status: "In Progress & Actively Benchmarked",
    image: "assets/images/project-matching-engine.svg",
    github: "https://github.com/Sujal01go",
    overview: "A high-performance exchange matching engine written in modern C++20, simulating the core order matching mechanism of modern electronic financial markets with strict Price-Time Priority (FIFO).",
    technologies: ["C++20", "Standard Template Library (STL)", "CMake", "Google Benchmark", "Lock-free Queues", "Low-Latency Systems", "Memory Profiling"],
    keyFeatures: [
      "Level 3 Limit Order Book (LOB) with sub-microsecond bid and ask queue operations.",
      "Deterministic Price-Time Priority matching algorithm supporting Limit, Market, and Cancel orders.",
      "Contiguous memory layouts and memory pooling to minimize dynamic heap allocations on the critical hot path.",
      "Comprehensive performance benchmarking demonstrating sub-microsecond p99 latency across synthetic 100k+ order bursts.",
      "Strict trade execution generation and audit logging for simulated electronic trading venues."
    ],
    architecture: "TCP/Socket Input -> Order Validator -> Level 3 Order Book (Map + Doubly-linked Queue) -> Matching Core (FIFO) -> Fill / Trade Dispatcher -> Latency Telemetry."
  },
  astrotrack: {
    title: "AstroTrack — Mathematical Astronomy & Star Tracker",
    category: "Mobile Systems / Applied Mathematics",
    status: "Complete & Offline First",
    image: "assets/images/project-astrotrack.svg",
    github: "https://github.com/Sujal01go/star-tracker",
    overview: "An offline-first mobile astronomy application built with Flutter and Dart that transforms raw astronomical catalogue coordinates into real-time horizontal coordinates using spherical trigonometry and hardware device sensors.",
    technologies: ["Flutter", "Dart", "Hipparcos Catalogue", "Yale Bright Star Catalog", "Coordinate Geometry", "AR Sensors", "Android / iOS"],
    keyFeatures: [
      "Accurate mathematical astronomy engine calculating local Altitude and Azimuth from J2000.0 Right Ascension and Declination.",
      "Local Sidereal Time (LST) and Greenwich Mean Sidereal Time (GMST) calculations accounting for geographical observer position.",
      "Sensor fusion (accelerometer, gyroscope, and magnetometer) enabling augmented reality (AR) sky pointer mode.",
      "100% offline-first execution with pre-indexed star catalogs and constellation boundary mappings."
    ],
    architecture: "Astronomical Database -> Spherical Coordinate Transformer (RA/Dec to Alt/Az) -> Sensor Fusion Pipeline -> Custom Canvas 2D Celestial Renderer."
  },
  multiagent: {
    title: "Autonomous Multi-Agent Software Engineering Team",
    category: "Autonomous Systems / AI Agents",
    status: "Flip the Switch Hackathon Project",
    image: "assets/images/project-multiagent.svg",
    github: "https://github.com/Sujal01go/switch-hackathon",
    overview: "A collaborative multi-agent developer system where specialized autonomous AI agents (Planner, Coder, Reviewer, and QA) communicate and coordinate in real-time over Telegram using the Switch messaging protocol.",
    technologies: ["Python", "LangGraph", "Switch Protocol", "Telegram Bot API", "SQLite State Checkpointing", "Multi-Agent Systems"],
    keyFeatures: [
      "Decomposed monolithic LLM workflows into an autonomous team: Product Manager, Architect, Senior Developer, and QA.",
      "LangGraph StateGraph orchestration managing deterministic turn-taking, human-in-the-loop approvals, and rollback capabilities.",
      "Persistent session states and conversation history using SQLite checkpointers.",
      "Telegram interface allowing developers to trigger code reviews, branch refactoring, and test suites directly from chat."
    ],
    architecture: "Telegram User Prompt -> Switch Protocol Gateway -> LangGraph State Machine -> Specialized Worker Agents -> Sandboxed Execution -> Output Diff."
  },
  sanjeevani: {
    title: "Sanjeevani — Ayurvedic Herb Intelligence Platform",
    category: "Mobile Development / Healthcare Technology",
    status: "Active Concept & Mobile App",
    image: "assets/images/project-sanjeevani.svg",
    github: "https://github.com/Sujal01go/sanjeevani",
    overview: "A cross-platform mobile application bridging ancient Ayurvedic botanical wisdom with modern healthcare, featuring symptom-based herb discovery and a direct farmer-to-consumer marketplace.",
    technologies: ["Flutter", "Dart", "Supabase", "PostgreSQL", "REST APIs", "Mobile UX"],
    keyFeatures: [
      "Curated medicinal plant directory featuring botanical classifications, active compounds, and verified uses.",
      "Intelligent symptom-to-herb recommendation engine connecting user health concerns with appropriate herbal remedies.",
      "Farmer-to-consumer commerce module empowering local cultivators to list and sell authenticated organic medicinal herbs.",
      "Secure user authentication and cloud synchronization powered by Supabase."
    ],
    architecture: "Flutter Mobile Frontend -> Supabase Auth & Realtime Database -> Semantic Herb Mapping Index -> Order Processing Flow."
  },
  aditya: {
    title: "Aditya-L1 Solar Flare Forecasting System",
    category: "Scientific Computing / Machine Learning",
    status: "Research Exploration",
    image: "assets/images/project-aditya.svg",
    github: "https://github.com/Sujal01go",
    overview: "Machine learning research exploring solar flare nowcasting and prediction using multi-spectral X-ray time-series data captured by instruments aboard ISRO's Aditya-L1 solar observatory.",
    technologies: ["Python", "Time-Series Analysis", "Transformer Models", "ISRO SoLEXS", "ISRO HEL1OS", "PyTorch / TensorFlow"],
    keyFeatures: [
      "Preprocessing and temporal alignment of soft X-ray data from Solar Low Energy X-ray Spectrometer (SoLEXS).",
      "Analysis of high-energy solar emissions from High Energy L1 Orbiting X-ray Spectrometer (HEL1OS).",
      "Self-attention Transformer architecture modeling temporal correlations prior to M-class and X-class flare eruptions.",
      "Evaluation against traditional baseline time-series models for solar space weather forecasting."
    ],
    architecture: "ISRO Raw Telemetry -> Multi-instrument Waveform Alignment -> Normalization & Windowing -> Temporal Transformer -> Flare Probability Forecaster."
  },
  rover: {
    title: "Autonomous Pipe Inspection Rover",
    category: "Robotics / Embedded Systems",
    status: "Technical Project",
    image: "assets/images/project-rover.svg",
    github: "https://github.com/Sujal01go",
    overview: "An autonomous robotic rover designed for inspecting industrial pipelines, detecting structural anomalies, cracks, and blockages in inaccessible environments.",
    technologies: ["Robotics", "Embedded C++", "Microcontrollers", "Ultrasonic & LiDAR", "Autonomous Navigation"],
    keyFeatures: [
      "Adaptive four-wheel chassis designed for navigating varied cylindrical pipe diameters and inclines.",
      "Real-time sensor integration utilizing ultrasonic distance arrays and visual camera inspection.",
      "Autonomous obstacle detection and dead-reckoning navigation algorithms.",
      "Telemetry feedback transmitting pipe integrity maps and defect coordinates to remote monitoring operators."
    ],
    architecture: "Microcontroller Core -> Motor Drivers & Encoders -> Ultrasonic & Optical Sensor Array -> Anomaly Detection Heuristics -> RF Telemetry Link."
  },
  traveldiary: {
    title: "TravelDiary — Location-Based Journal",
    category: "Mobile Application Development",
    status: "Implemented",
    image: "assets/images/project-traveldiary.svg",
    github: "https://github.com/Sujal01go",
    overview: "A Flutter mobile application designed to document journeys, memorable expeditions, and location-based travel stories with interactive map coordinates and offline caching.",
    technologies: ["Flutter", "Dart", "Supabase", "Google Sign-In", "Geolocation APIs"],
    keyFeatures: [
      "Secure Google OAuth sign-in and cross-device sync via Supabase backend.",
      "Automatic geolocation capture and interactive trip map rendering.",
      "Rich media timeline view documenting photos, route notes, and travel memories.",
      "Offline caching allowing explorers to log entries even in remote regions with zero cell connectivity."
    ],
    architecture: "Flutter UI -> GPS Location Services -> Supabase Storage & Database -> Offline SQLite Cache."
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
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;">
              <span class="badge badge-blue">${project.category}</span>
              <span class="badge badge-green">${project.status}</span>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 0.5rem 0;">${project.title}</h2>
          </div>

          <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--rule); background: var(--bg-soft);">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: contain;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Project Overview</h3>
            <p style="font-size: 0.96rem; line-height: 1.65; color: var(--text); margin: 0;">${project.overview}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Key Engineering Highlights</h3>
            <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
              ${project.keyFeatures.map(f => `<li style="font-size: 0.92rem; color: var(--text); line-height: 1.5;">${f}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Architecture &amp; Flow</h3>
            <div style="background: var(--bg-soft); border: 1px solid var(--rule); padding: 0.85rem 1rem; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem; color: var(--text);">
              ${project.architecture}
            </div>
          </div>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 0.5rem 0;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${project.technologies.map(t => `<span class="tech-tag" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--rule);">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="button button-primary">
              View Repository on GitHub
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
   VISITOR COUNTER SIMULATION
   ========================================================================== */
function initVisitorCounter() {
  const counterEl = document.getElementById('visitorCount');
  if (!counterEl) return;

  let count = localStorage.getItem('sg_visitor_count');
  if (!count) {
    count = 1438;
  } else {
    count = parseInt(count, 10) + 1;
  }
  localStorage.setItem('sg_visitor_count', count);
  counterEl.textContent = count.toLocaleString();
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
