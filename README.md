# Sujal Gupta — Personal Engineering Portfolio

> **Inspired by [rishia.in](https://rishia.in/)**  
> An editorial, minimalist, and high-performance portfolio crafted for **Sujal Gupta**, an undergraduate in **Mathematics & Computing (M&C)** at **NIT Jalandhar**, specializing in **C++ & Systems Programming**, **Low-Latency Architecture**, **AI/ML (RAG)**, and **Backend Development**.

---

## 🌟 Key Features & Design System

- **Rishi Ahuja Editorial Aesthetic**:
  - Signature pastel card covers (`lavender`, `blue`, `sand`, `rose`, `sky`, `mint`, `peach`, `slate`) with custom SVG technical architecture diagrams.
  - Typographic refinement with Plus Jakarta Sans & JetBrains Mono.
  - Active navigation dot tracking with dynamic Scrollspy.
  - Editorial updates and milestones timeline feed with chronological date badges.
  - 3-column academic footer with "Made with ❤️ in Jalandhar" and simulated live visitor counter.
- **Top Featured Projects**:
  1. **InvestIntel AI** — Financial Intelligence & RAG Platform (Python, FastAPI, Azure OpenAI GPT-4o, Azure AI Search, PostgreSQL).
  2. **Low-Latency Exchange Matching Engine** — L3 Order Book, Price-Time Priority FIFO, Sub-microsecond latency benchmarks in modern C++20.
  3. **AstroTrack** — Offline-First Mobile Astronomy Engine converting J2000 coordinates to topocentric horizontal coordinates (Flutter, Dart, Hipparcos Catalog).
  4. **Autonomous Multi-Agent Software Engineering Team** — LangGraph, Python, Switch, Telegram, SQLite (Flip the Switch Hackathon).
  5. **Sanjeevani** — Ayurvedic Herb Intelligence & Direct Farmer Marketplace (Flutter, Dart, Supabase).
  6. **Aditya-L1 Solar Flare Forecasting** — Time-series sequence modeling with Transformer architectures and ISRO SoLEXS/HEL1OS data.
  7. **Autonomous Pipe Inspection Rover** — Embedded systems, robotics, and ultrasonic/optical pipeline defect detection.
  8. **TravelDiary** — Location-based journal with GPS tagging and Supabase backend.
- **Interactive Deep-Dive Modal**:
  - Click any project to open an in-depth breakdown covering problem statement, system architecture, key engineering highlights, and technologies.
- **Category Filter Tabs**:
  - Filter projects smoothly across `Systems & C++`, `AI / ML & RAG`, `Mobile & Full Stack`, and `Research & Robotics`.
- **Verified Achievements & Metrics**:
  - JEE Main Common Rank List (CRL): **21,338** (Top ~1.3% among ~1.6 million candidates).
  - **200+ LeetCode problems solved** with categorized DSA topic breakdown.
  - Experience in **GirlScript Summer of Code (GSSoC)**, **HackTU**, **BIS Innovation Hackathon**, and **Google Prompt Wars**.
- **Interactive Utilities**:
  - Dark / Light mode toggle with local storage persistence.
  - One-click "Copy Email" with instant tooltip feedback (`sg127952@gmail.com`).
  - Printable / Downloadable single-page software engineer résumé (`assets/resume/resume.html`).

---

## 🚀 Quick Start / Local Preview

Because this portfolio is built with modern, zero-dependency, standard web technologies, you can open and run it instantly:

### Option 1: Direct Browser Launch
Simply double-click `index.html` or run in terminal:
```powershell
start index.html
```

### Option 2: Local HTTP Server
Using Python:
```bash
python -m http.server 3000
# Open http://localhost:3000
```
Or using Node:
```bash
npx serve .
```

---

## 🌐 Deployment to GitHub Pages

1. Initialize Git in the directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: complete personal portfolio inspired by rishia.in"
   ```
2. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/Sujal01go/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub Repository Settings -> **Pages**:
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Your site will be live at: `https://sujal01go.github.io/portfolio/`

---

## 📂 Project Architecture

```
portfolio/
├── index.html                   # Main semantic portfolio page
├── README.md                    # Documentation & setup guide
├── css/
│   └── style.css                # Editorial styling, themes, pastel cards, animations
├── js/
│   └── main.js                  # Modals, filter tabs, dark mode, copy email, scrollspy
└── assets/
    ├── images/
    │   ├── avatar.svg           # Monogram & systems geometry hero visual
    │   ├── project-investintel.svg
    │   ├── project-matching-engine.svg
    │   ├── project-astrotrack.svg
    │   ├── project-multiagent.svg
    │   ├── project-sanjeevani.svg
    │   ├── project-aditya.svg
    │   ├── project-rover.svg
    │   └── project-traveldiary.svg
    └── resume/
        └── resume.html          # Clean printable 1-page software engineer resume
```

---

© 2026 Sujal Gupta. Designed with inspiration from Rishi Ahuja (rishia.in).
