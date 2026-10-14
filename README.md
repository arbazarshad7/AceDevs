# 🚀 AceDevs // Collective Developer Portfolio & Tactical Digital Twin

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Web Audio](https://img.shields.io/badge/Web%20Audio-API-FF5722?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Status](https://img.shields.io/badge/Status-Operational%20//%20Online-00FF66?style=for-the-badge)]()

**AceDevs** is the collective engineering portfolio and digital twin cockpit for developers **Arbaz Arshad** and **Devesh Das**. Designed with a high-tech **Tactical Sci-Fi HUD (Heads-Up Display)** visual language inspired by [Hubtown](https://hubtown.co.in), the platform serves as a unified digital showcase for their shared ventures, individual game/systems projects, collective code repositories, and technical writing.

---

## 🛰️ Founders & Core Engineers

| Developer | Role & Sector | Portfolio & Coordinates | Links |
| :--- | :--- | :--- | :--- |
| **Arbaz Arshad** `[DEV-01]` | Co-Founder // Game Developer & Creative Technologist | **Bhubaneswar, IN**<br>`20.2961° N, 85.8245° E` | 🌐 [arbazarshad.vercel.app](https://arbazarshad.vercel.app/)<br>🐙 [GitHub: @arbazarshad7](https://github.com/arbazarshad7)<br>💼 [LinkedIn](https://www.linkedin.com/in/arbaz-arshad-x7) |
| **Devesh Das** `[DEV-02]` | Co-Founder // Game Physics & CS Engineering | **Bhubaneswar, IN**<br>`20.2961° N, 85.8245° E` | 🌐 [mrdeveshdas.vercel.app](https://mrdeveshdas.vercel.app/)<br>🐙 [GitHub: @ninja27dev](https://github.com/ninja27dev)<br>💼 [LinkedIn](https://www.linkedin.com/in/devesh-das-9100ab266) |

---

## ⚡ Core Technical Capabilities

- **🌌 3D WebGL Constellation Canvas**: Custom Three.js cybernetic node network with interactive vector splines, custom GLSL pulsating line shaders, mouse-driven parallax, raycasted node inspection, and real-time bidirectional compass rosette tracking (`000°` to `359°`).
- **🎛️ Tactical Sci-Fi HUD Framing**: Glassmorphic digital twin cockpit (`backdrop-filter: blur(20px)`), 45° chamfered cut-corner geometry, coordinate telemetry brackets (`[00]`, `LOC: 20.2961° N, 85.8245° E`), and dual technical typography (`Space Grotesk` + `Space Mono`).
- **⚡ In-Memory Trie & Inverted Index Search**: Algorithmic client-side search engine combining a custom `PrefixTrie` ($O(k)$ prefix autocomplete) and an `InvertedIndex` for sub-millisecond, zero-dependency multi-tag querying across team profiles, repositories, articles, and architectural systems. Invoked globally via `Cmd + K` or `Ctrl + K`.
- **🔄 Automated GitHub Pipeline**: Multi-account GitHub REST API aggregation service with 30-minute persistent `localStorage` caching, original-author filtering, live stars/forks/languages, and resilient fallback to curated datasets.
- **🛡️ Supabase Postgres & Auth Gateway**: Production-ready GoTrue authentication (Google OAuth 2.0 & Email/Password), Row-Level Security (RLS) policies for published vs. draft articles, with an offline mock authentication client for seamless local development.
- **📝 Technical Engineering Blog & Cockpit**: Markdown publication engine with code syntax highlighting, author attribution, reading time computation, and an authenticated developer admin cockpit (`/admin`) for publishing, drafting, and triggering on-demand GitHub syncs.
- **🔊 Procedural Web Audio Soundscape**: Native HTML5 Web Audio API synthesizer generating an ambient sci-fi background drone and procedural UI micro-sounds (clicks, hovers, search keystrokes, modal transitions) without loading external audio assets.

---

## 🏗️ Architecture & Component Topology

```
AceDevs Application Root
├── 🌌 Three.js Canvas Layer (CyberCanvas + CyberNodeNetwork)
│   ├── Procedural Shaders (Pulse Line & Particle Points)
│   ├── Raycaster Node Picker (Arbaz, Devesh, Core, AI, Supabase, Repos, Blog)
│   └── Camera Controller & Damped Telemetry Emitter (120ms throttle)
├── 🎛️ Viewport HUD Perimeter (ViewportHud)
│   ├── Top Header: Brand Matrix, Search Launcher [⌘K], Audio Drone Toggle
│   ├── Compass Rosette: 360° Azimuth Dial + Drag-to-Rotate Control
│   ├── Bottom Bar: Coordinates (Bhubaneswar, IN), System Status, Developer Auth Gateway
│   └── Corner Brackets: Tactical Crop Framing with Monospace Indices
├── 🖥️ Main Interactive Sectors (Dynamic Viewport Sections)
│   ├── [HERO]       — 3D Network, Mission Brief, Quick Action Sector Navigation
│   ├── [TEAM]       — Founder Spec Sheets, Metrics, Specializations, Cross-Links
│   ├── [REPOS]      — Automated GitHub Pipeline, Star Counters, Multi-Filter Tags
│   ├── [BLOG]       — Markdown Technical Publications, Read Time, Tag Filters
│   └── [ADMIN]      — Authenticated Cockpit, Article CRUD, Manual GitHub Re-Sync
└── 🛰️ Global Overlays & Modals
    ├── 🔍 Search Modal (Algorithmic Prefix Trie Autocomplete + Inverted Index)
    └── 🔐 Auth Modal (Google OAuth 2.0 + Developer Email/Password Gateway)
```

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Build** | Node.js (v18+) & Vite 5 | Ultra-fast HMR, ES module bundling, tree-shaking |
| **UI Framework** | React 18 | Declarative component hierarchy, hooks, state lifecycle |
| **3D WebGL** | Three.js (v0.186+) | Scene graphs, perspective cameras, raycasters, custom GLSL |
| **Styling** | Vanilla CSS + Design Tokens | CSS Custom Properties, SVG clip-path chamfers, glassmorphism |
| **Data Structures** | Custom Trie & Inverted Index | Zero-dependency client-side search with sub-millisecond lookups |
| **Backend & DB** | Supabase (PostgreSQL) | Managed Postgres database, Row-Level Security, GoTrue Auth |
| **Icons** | Lucide React | High-tech tactical vector iconography |
| **Audio** | HTML5 Web Audio API | Procedural sound synthesis and ambient drone generation |

---

## 🚀 Quick Start & Installation

### Prerequisites

- **Node.js**: `v18.0.0` or higher recommended
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### 1. Clone the Repository

```bash
git clone https://github.com/arbazarshad7/AceDevs.git
cd AceDevs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment template:

```bash
cp .env.example .env
```

Open `.env` in your editor and configure your variables:

```env
# Supabase Project API URL
VITE_SUPABASE_URL=https://your-project.supabase.co

# Supabase Public Anonymous API Key (Safe for browser bundle with RLS)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Authorized Developer Whitelist for Admin Cockpit
VITE_DEV_EMAILS=arbazarshad7@gmail.com,deveshkumardas08@gmail.com

# GitHub Usernames for Automated Repo Aggregation
VITE_GITHUB_USER_ARBAZ=arbazarshad7
VITE_GITHUB_USER_DEVESH=ninja27dev
```

> **Note:** If Supabase credentials are not provided or are left as placeholders, AceDevs automatically runs with its built-in `FallbackMockAuthClient` and localStorage store, ensuring zero runtime crashes during local development.

### 4. Start Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### 5. Production Build & Preview

```bash
# Compile and optimize production bundle into /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Repository Directory Structure

```
d:/Work/AceDevs/
├── .env.example                  # Environment configuration template
├── GEMINI.md                     # Antigravity / AI Pair Programming Guidelines
├── index.html                    # Root HTML document with Google Fonts & HUD meta
├── package.json                  # Dependencies, scripts, and package metadata
├── vite.config.js                # Vite configuration with React plugin & port 3000
│
├── docs/                         # Detailed Architectural & Engineering Documentation
│   ├── ARCHITECTURE.md           # System architecture, data flow & WebGL lifecycle
│   ├── DESIGN_SYSTEM.md          # Tactical HUD tokens, chamfers, palette & audio
│   ├── SEARCH_ENGINE.md          # Custom PrefixTrie & InvertedIndex algorithmic spec
│   ├── SERVICES.md               # GitHub, Supabase, Blog & Audio service specifications
│   ├── SUPABASE_SETUP.md         # Database DDL schema, RLS policies & OAuth guide
│   └── GETTING_STARTED.md        # Developer setup, workflows & deployment guide
│
└── src/
    ├── App.jsx                   # Central state orchestrator & section manager
    ├── index.css                 # Global resets and CSS baseline
    ├── main.jsx                  # React 18 DOM mount entrypoint
    │
    ├── components/
    │   ├── admin/                # Admin Dashboard, Article Editor, Repo Sync Trigger
    │   ├── auth/                 # GoTrue Google OAuth & Password Login Modal
    │   ├── blog/                 # Markdown Article Reader, Tag Filters, Read Times
    │   ├── canvas/               # Three.js CyberCanvas, Shaders & CyberNodeNetwork
    │   ├── hud/                  # Viewport HUD, Chamfer Buttons, Compass Rosette
    │   ├── repos/                # Automated GitHub Collective Repository Cards
    │   ├── search/               # HUD Search Modal with Trie Autocomplete
    │   └── team/                 # Co-Founder Spec Sheets, Metrics & Cross-Links
    │
    ├── context/
    │   ├── AuthContext.jsx       # Supabase session provider & developer authorization
    │   └── SoundContext.jsx      # Web Audio procedural soundscape state & dispatch
    │
    ├── data/
    │   ├── blogPosts.js          # Initial seed articles on game systems & architecture
    │   ├── mockRepos.js          # Resilient offline repository fallback dataset
    │   └── teamData.js           # Authoritative Co-Founder profiles, bios, links & coords
    │
    ├── services/
    │   ├── blogService.js        # Observable pub-sub blog store (Supabase + localStorage)
    │   ├── githubService.js      # REST API client with 30m TTL cache & attribution
    │   ├── soundService.js       # HTML5 Web Audio API procedural synthesis engine
    │   ├── supabaseClient.js     # Supabase client initializer with fallback mock client
    │   └── search/
    │       ├── InvertedIndex.js  # Posting list index with multi-tag set intersections
    │       ├── PrefixTrie.js     # Algorithmic tree for O(k) prefix autocomplete
    │       └── searchEngine.js   # Portfolio-wide unified search orchestrator
    │
    ├── styles/
    │   └── theme.css             # Tactical HUD design tokens, colors & typography
    │
    └── utils/
        └── readingTime.js        # Markdown word count & reading time calculator
```

---

## 📚 Complete Documentation Suite

For comprehensive deep dives into each subsystem, refer to the dedicated guides in the [`docs/`](file:///d:/Work/AceDevs/docs) directory:

| Document | Description |
| :--- | :--- |
| 📖 [**docs/ARCHITECTURE.md**](file:///d:/Work/AceDevs/docs/ARCHITECTURE.md) | In-depth system architecture, state flow, 3D WebGL render loop, and component hierarchy. |
| 🎨 [**docs/DESIGN_SYSTEM.md**](file:///d:/Work/AceDevs/docs/DESIGN_SYSTEM.md) | Tactical Sci-Fi HUD design tokens, 45° chamfered geometry formulas, palette, and typography. |
| 🔍 [**docs/SEARCH_ENGINE.md**](file:///d:/Work/AceDevs/docs/SEARCH_ENGINE.md) | Algorithmic analysis and implementation details for `PrefixTrie.js` and `InvertedIndex.js`. |
| ⚙️ [**docs/SERVICES.md**](file:///d:/Work/AceDevs/docs/SERVICES.md) | Specifications for GitHub pipeline, Supabase client, Blog pub-sub store, and Web Audio. |
| 🔐 [**docs/SUPABASE_SETUP.md**](file:///d:/Work/AceDevs/docs/SUPABASE_SETUP.md) | Complete SQL DDL schema, Row-Level Security (RLS) setup, and Google OAuth credentials guide. |
| 🚀 [**docs/GETTING_STARTED.md**](file:///d:/Work/AceDevs/docs/GETTING_STARTED.md) | Developer onboarding guide, local environment configuration, and production deployment. |

---

## ⌨️ Tactical Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Toggle HUD Algorithmic Search Modal | Global |
| <kbd>Esc</kbd> | Dismiss Active Search Modal / Auth Modal / Return to Top | Global |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Trie Autocomplete Search Suggestions | Search Modal |
| <kbd>Enter</kbd> | Execute Search Selection & Navigate to Target Node | Search Modal |

---

## 📄 License & Attribution

Copyright © 2026 **AceDevs** (Arbaz Arshad & Devesh Das). All rights reserved.  
Built with passion for high-performance software engineering, immersive 3D graphics, and clean architecture.
