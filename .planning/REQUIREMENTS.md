# Requirements: AceDevs

**Defined:** 2026-10-13  
**Core Value:** Showcase collective synergy and individual engineering mastery through a futuristic HUD interface, automated GitHub repository aggregation, an authenticated technical blog engine, and an algorithmic Trie-based multi-tag search engine.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System & HUD Layout

- [x] **DS-01**: Global CSS design tokens implemented (Abyss navy `#020a19`, ice cyan `#d5e0ff`, translucent glass backgrounds, and hairline borders).
- [x] **DS-02**: Reusable chamfered/beveled box and button components featuring 45° cut corners and cyan hover states.
- [x] **DS-03**: Viewport HUD frame layout incorporating corner telemetry brackets (`[00]`), monospace status indicators, and an interactive heading compass.

### 3D WebGL Hero Experience

- [x] **3D-01**: Three.js canvas setup with responsive viewport resize, antialiasing, and camera controls.
- [x] **3D-02**: Interactive 3D cybernetic node network with pulsating vector spline lines and node clustering.
- [x] **3D-03**: Mouse-reactive particle field with bloom and lens distortion post-processing passes.

### Team Showcase

- [x] **TEAM-01**: Team member profile cards for Arbaz Arshad and Devesh Das displaying photo, designation, tech specialties, and bio.
- [x] **TEAM-02**: Direct external navigation links to each member's individual portfolio website and GitHub profile.

### GitHub Collective Repos

- [x] **GH-01**: Automated GitHub REST API fetcher querying repositories for Arbaz Arshad and Devesh Das.
- [x] **GH-02**: "Collective Repos" panel displaying repository cards with developer attribution, stars, forks, and language tags.
- [x] **GH-03**: Client-side caching and fallback mock data when rate limits or offline states occur.

### Trie & Inverted Index Search Engine

- [x] **SRCH-01**: Custom in-memory Trie data structure implementing $O(k)$ prefix autocomplete for tags, titles, and developers.
- [x] **SRCH-02**: Inverted Index engine mapping search tokens to repositories, blog articles, and skill tags with boolean intersection.
- [x] **SRCH-03**: HUD search modal triggered via `Cmd+K` / `Ctrl+K` with keyboard navigation, active tag pills, and instant live filtering.

### Authentication (Supabase)

- [x] **AUTH-01**: Supabase client initialized with environment variables, auth session persistence, and state listener.
- [x] **AUTH-02**: Google OAuth sign-in flow for seamless developer authentication.
- [x] **AUTH-03**: Email and password sign-in flow with validation for direct developer access.

### Engineering Blog Engine

- [x] **BLOG-01**: Blog listing page displaying published technical posts with author badges, tags, and publication timestamps.
- [x] **BLOG-02**: Blog post detail view with Markdown rendering, syntax highlighted code blocks, and estimated reading time.

### Developer Admin Dashboard

- [x] **ADM-01**: Protected route guard restricting admin access strictly to authenticated team developers.
- [x] **ADM-02**: Post management dashboard with full CRUD operations (Create, Edit, Delete, Publish) connected to Supabase table.
- [x] **ADM-03**: Manual GitHub repository sync button and team profile information manager.

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
| DS-01 | Phase 1 | Complete |
| DS-02 | Phase 1 | Complete |
| DS-03 | Phase 1 | Complete |
| 3D-01 | Phase 2 | Complete |
| 3D-02 | Phase 2 | Complete |
| 3D-03 | Phase 2 | Complete |
| TEAM-01 | Phase 3 | Complete |
| TEAM-02 | Phase 3 | Complete |
| GH-01 | Phase 4 | Complete |
| GH-02 | Phase 4 | Complete |
| GH-03 | Phase 4 | Complete |
| SRCH-01 | Phase 5 | Complete |
| SRCH-02 | Phase 5 | Complete |
| SRCH-03 | Phase 5 | Complete |
| AUTH-01 | Phase 6 | Complete |
| AUTH-02 | Phase 6 | Complete |
| AUTH-03 | Phase 6 | Complete |
| BLOG-01 | Phase 7 | Complete |
| BLOG-02 | Phase 7 | Complete |
| ADM-01 | Phase 8 | Complete |
| ADM-02 | Phase 8 | Complete |
| ADM-03 | Phase 8 | Complete |
| AUD-01 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-13*
