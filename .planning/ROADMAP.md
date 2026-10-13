# Roadmap: AceDevs Collective Portfolio

**Mode:** Vertical MVP  
**Granularity:** Fine (9 phases)  
**Execution:** Sequential  
**Status:** In Progress  

## Overview

AceDevs is delivered across 9 focused vertical slices, taking the project from foundational HUD design tokens and 3D WebGL hero graphics to automated GitHub integration, an algorithmic Trie search engine, Supabase authentication, and an engineering blog admin panel.

| # | Phase | Goal | Requirements | Mode |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Core Foundation & Tactical HUD Design System | Establish Vite + React foundation, palette tokens, chamfered HUD geometry, and viewport telemetry | DS-01, DS-02, DS-03 | mvp |
| 2 | Interactive 3D WebGL Hero Canvas | Build Three.js cybernetic node network with pulsating vector splines and mouse reactivity | 3D-01, 3D-02, 3D-03 | mvp |
| 3 | Team Showcase & Portfolio Cross-Linking | Deliver profile modules for Arbaz Arshad & Devesh Das with designations and external portfolio links | TEAM-01, TEAM-02 | mvp |
| 4 | GitHub Integration & Collective Repos Panel | Automated GitHub repository fetcher with caching, developer attribution, and tech tags | GH-01, GH-02, GH-03 | mvp |
| 5 | Algorithmic Trie & Inverted Index Search Engine | Custom Trie prefix matching and Inverted Index multi-tag query engine with HUD search modal | SRCH-01, SRCH-02, SRCH-03 | mvp |
| 6 | Supabase Authentication Architecture | Supabase client setup, Google OAuth, and Email/Password authentication for developers | AUTH-01, AUTH-02, AUTH-03 | mvp |
| 7 | Technical Engineering Blog System | Markdown-powered article reader with syntax highlighting, author attribution, and tag filtering | BLOG-01, BLOG-02 | mvp |
| 8 | Protected Developer Admin Dashboard | Authenticated admin panel for blog CRUD management and manual GitHub sync | ADM-01, ADM-02, ADM-03 | mvp |
| 9 | Audio Design, Micro-Interactions & Polish | Web Audio ambient soundscape, futuristic sound FX, responsive mobile HUD, and performance tuning | AUD-01 | mvp |

---

## Phase Details

### Phase 1: Core Foundation & Tactical HUD Design System
**Goal:** Establish Vite + React foundation, palette tokens, chamfered HUD geometry, and viewport telemetry.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: DS-01, DS-02, DS-03  
**Success Criteria**:
1. Vite + React application boots cleanly with dark canvas theme (`#020a19`) and ice cyan accents (`#d5e0ff`).
2. Reusable chamfered cut-corner card and button primitives render with glassmorphism blur and hover glows.
3. Viewport HUD frames the screen with corner telemetry brackets, monospace counters, and interactive heading compass rosette.

### Phase 2: Interactive 3D WebGL Hero Canvas [COMPLETED]
**Goal:** Build Three.js cybernetic node network with pulsating vector splines and mouse reactivity.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: 3D-01, 3D-02, 3D-03  
**Status**: Complete (Verified 2026-10-14)  
**Success Criteria**:
1. Three.js canvas initializes smoothly and scales responsively without layout shifts.
2. 3D nodes connect via glowing vector spline lines simulating software architecture.
3. Particle field responds dynamically to mouse movement with subtle bloom pass.

### Phase 3: Team Showcase & Portfolio Cross-Linking [COMPLETED]
**Goal:** Deliver profile modules for Arbaz Arshad & Devesh Das with designations and external portfolio links.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: TEAM-01, TEAM-02  
**Status**: Complete (Verified 2026-10-14)  
**Success Criteria**:
1. High-contrast profile modules render for both Arbaz Arshad and Devesh Das.
2. Designation, technical specialties, and avatar are displayed with HUD badges.
3. Bidirectional external links connect to individual portfolio websites and GitHub profiles.

### Phase 4: GitHub Integration & Collective Repos Panel
**Goal:** Automated GitHub repository fetcher with caching, developer attribution, and tech tags.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: GH-01, GH-02, GH-03  
**Success Criteria**:
1. Repositories for Arbaz and Devesh are automatically fetched via GitHub API.
2. Collective Repos panel displays project cards attributed to each developer.
3. Cards display stars, forks, primary language tags, and fallback gracefully if offline/rate-limited.

### Phase 5: Algorithmic Trie & Inverted Index Search Engine
**Goal:** Custom Trie prefix matching and Inverted Index multi-tag query engine with HUD search modal.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: SRCH-01, SRCH-02, SRCH-03  
**Success Criteria**:
1. Custom Trie data structure provides sub-millisecond prefix autocomplete.
2. Inverted Index indexes projects, blogs, and skill tags with multi-tag filtering.
3. `Cmd+K` / `Ctrl+K` launches HUD search modal with live keyboard navigation.

### Phase 6: Supabase Authentication Architecture
**Goal:** Supabase client setup, Google OAuth, and Email/Password authentication for developers.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: AUTH-01, AUTH-02, AUTH-03  
**Success Criteria**:
1. Supabase client is initialized with environment variables and connection health check.
2. Google OAuth login flow authenticates developers.
3. Email and password login flow authenticates direct developer accounts with persistent session state.

### Phase 7: Technical Engineering Blog System
**Goal:** Markdown-powered article reader with syntax highlighting, author attribution, and tag filtering.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: BLOG-01, BLOG-02  
**Success Criteria**:
1. Blog listing displays published articles with author badges, tags, and read times.
2. Article detail page renders Markdown with syntax-highlighted code blocks.

### Phase 8: Protected Developer Admin Dashboard
**Goal:** Authenticated admin panel for blog CRUD management and manual GitHub sync.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: ADM-01, ADM-02, ADM-03  
**Success Criteria**:
1. Route guards redirect unauthenticated users away from `/admin`.
2. Authenticated developers can create, edit, delete, and publish blog articles in Supabase.
3. Manual button triggers fresh GitHub repository sync and updates cached metadata.

### Phase 9: Audio Design, Micro-Interactions & Polish
**Goal:** Web Audio ambient soundscape, futuristic sound FX, responsive mobile HUD, and performance tuning.  
**Mode:** mvp  
**UI hint:** yes  
**Requirements**: AUD-01  
**Success Criteria**:
1. Ambient background drone plays when unmuted with toggleable state (`SOUND ON / SOUND OFF`).
2. Sci-Fi UI micro-sounds fire on button clicks, drawer open, and search keystrokes.
3. Entire UI and 3D canvas perform at 60 FPS across mobile and desktop viewports.
