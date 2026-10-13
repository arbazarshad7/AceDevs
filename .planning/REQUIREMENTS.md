# Requirements: AceDevs

**Defined:** 2026-10-13  
**Core Value:** Showcase collective synergy and individual engineering mastery through a futuristic HUD interface, automated GitHub repository aggregation, an authenticated technical blog engine, and an algorithmic Trie-based multi-tag search engine.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System & HUD Layout

- [ ] **DS-01**: Global CSS design tokens implemented (Abyss navy `#020a19`, ice cyan `#d5e0ff`, translucent glass backgrounds, and hairline borders).
- [ ] **DS-02**: Reusable chamfered/beveled box and button components featuring 45° cut corners and cyan hover states.
- [ ] **DS-03**: Viewport HUD frame layout incorporating corner telemetry brackets (`[00]`), monospace status indicators, and an interactive heading compass.

### 3D WebGL Hero Experience

- [ ] **3D-01**: Three.js canvas setup with responsive viewport resize, antialiasing, and camera controls.
- [ ] **3D-02**: Interactive 3D cybernetic node network with pulsating vector spline lines and node clustering.
- [ ] **3D-03**: Mouse-reactive particle field with bloom and lens distortion post-processing passes.

### Team Showcase

- [ ] **TEAM-01**: Team member profile cards for Arbaz Arshad and Devesh Das displaying photo, designation, tech specialties, and bio.
- [ ] **TEAM-02**: Direct external navigation links to each member's individual portfolio website and GitHub profile.

### GitHub Collective Repos

- [ ] **GH-01**: Automated GitHub REST API fetcher querying repositories for Arbaz Arshad and Devesh Das.
- [ ] **GH-02**: "Collective Repos" panel displaying repository cards with developer attribution, stars, forks, and language tags.
- [ ] **GH-03**: Client-side caching and fallback mock data when rate limits or offline states occur.

### Trie & Inverted Index Search Engine

- [ ] **SRCH-01**: Custom in-memory Trie data structure implementing $O(k)$ prefix autocomplete for tags, titles, and developers.
- [ ] **SRCH-02**: Inverted Index engine mapping search tokens to repositories, blog articles, and skill tags with boolean intersection.
- [ ] **SRCH-03**: HUD search modal triggered via `Cmd+K` / `Ctrl+K` with keyboard navigation, active tag pills, and instant live filtering.

### Authentication (Supabase)

- [ ] **AUTH-01**: Supabase client initialized with environment variables, auth session persistence, and state listener.
- [ ] **AUTH-02**: Google OAuth sign-in flow for seamless developer authentication.
- [ ] **AUTH-03**: Email and password sign-in flow with validation for direct developer access.

### Engineering Blog Engine

- [ ] **BLOG-01**: Blog listing page displaying published technical posts with author badges, tags, and publication timestamps.
- [ ] **BLOG-02**: Blog post detail view with Markdown rendering, syntax highlighted code blocks, and estimated reading time.

### Developer Admin Dashboard

- [ ] **ADM-01**: Protected route guard restricting admin access strictly to authenticated team developers.
- [ ] **ADM-02**: Post management dashboard with full CRUD operations (Create, Edit, Delete, Publish) connected to Supabase table.
- [ ] **ADM-03**: Manual GitHub repository sync button and team profile information manager.

### Audio & Sensory Polish

- [ ] **AUD-01**: Web Audio ambient soundscape with toggleable state (`SOUND ON / SOUND OFF`) and futuristic micro-interaction sound FX on hover/click.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

- **V2-01**: Interactive project demo embeds / WebGL sandboxes inside blog articles.
- **V2-02**: Webhook-based instant GitHub commit notifications.
- **V2-03**: Multi-language localization (i18n).

## Out of Scope

| Feature | Reason |
| :--- | :--- |
| Public user comments / registration | Only Arbaz & Devesh require login access; public visitors view read-only content. |
| E-commerce / Billing | Portfolio and technical blog; no monetization layer needed. |
| Traditional light mode | Design identity is anchored strictly in the deep obsidian / cyan tactical HUD aesthetic. |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
| :--- | :--- | :--- |
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| 3D-01 | Phase 2 | Pending |
| 3D-02 | Phase 2 | Pending |
| 3D-03 | Phase 2 | Pending |
| TEAM-01 | Phase 3 | Pending |
| TEAM-02 | Phase 3 | Pending |
| GH-01 | Phase 4 | Pending |
| GH-02 | Phase 4 | Pending |
| GH-03 | Phase 4 | Pending |
| SRCH-01 | Phase 5 | Pending |
| SRCH-02 | Phase 5 | Pending |
| SRCH-03 | Phase 5 | Pending |
| AUTH-01 | Phase 6 | Pending |
| AUTH-02 | Phase 6 | Pending |
| AUTH-03 | Phase 6 | Pending |
| BLOG-01 | Phase 7 | Pending |
| BLOG-02 | Phase 7 | Pending |
| ADM-01 | Phase 8 | Pending |
| ADM-02 | Phase 8 | Pending |
| ADM-03 | Phase 8 | Pending |
| AUD-01 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-13*
