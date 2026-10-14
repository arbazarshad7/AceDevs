<!-- GSD:project-start source:PROJECT.md -->

## Project

**AceDevs — Collective Developer Portfolio**

AceDevs is a team portfolio website for developers **Arbaz Arshad** and **Devesh Das**. It serves as a unified digital showcase for their shared ventures, individual projects, and technical writing, built with a high-tech "Tactical Sci-Fi HUD / Digital Twin" aesthetic inspired by Hubtown (`hubtown.co.in`).

**Core Value:** Showcase collective synergy and individual engineering mastery through a futuristic HUD interface, automated GitHub repository aggregation, an authenticated technical blog engine, and an algorithmic Trie-based multi-tag search engine.

### Constraints

- **Framework**: Vite + React SPA for responsive rendering and lightweight WebGL integration.
- **Styling**: Vanilla CSS / CSS Modules with design tokens for custom beveled HUD geometry and animations.
- **3D Graphics**: Three.js WebGL canvas with custom shaders for cybernetic nodes and particle flow.
- **Backend / DB / Auth**: Supabase (Postgres, GoTrue Auth, Row-Level Security).
- **Search**: In-memory custom Trie data structure + Inverted Index for zero-latency client-side querying.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->

## Technology Stack

- **Core & Build**: Vite 5 (`^5.4.10`) + React 18 (`^18.3.1`) SPA.
- **3D Graphics & WebGL**: Three.js (`^0.186.1`) with custom GLSL pulse line shaders and procedural particle systems.
- **Styling**: Vanilla CSS with custom properties (`src/styles/theme.css`), 45° chamfered clip-path geometry, glassmorphism (`backdrop-filter: blur(20px)`), and dual Google Fonts (`Space Grotesk` & `Space Mono`).
- **Data Structures / Search**: Custom in-memory `PrefixTrie.js` ($O(k)$ prefix autocomplete) + `InvertedIndex.js` (multi-tag posting list set intersection) with sub-millisecond execution.
- **Backend / Database / Auth**: Supabase (`@supabase/supabase-js` `^2.117.3`), PostgreSQL `posts` table, GoTrue Auth (Google OAuth 2.0 & Email/Password), Row-Level Security (RLS) policies, with resilient `FallbackMockAuthClient` for local development.
- **Iconography**: Lucide React (`^0.453.0`).
- **Audio Design**: HTML5 Web Audio API procedural synthesizer for ambient background drone and UI micro-sound feedback.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

- **Visual Design**: Strict adherence to the Tactical Sci-Fi HUD aesthetic. Deep space navy canvas (`#020a19`), ice cyan luminescence (`#d5e0ff`), 45° chamfered polygon corners, perimeter viewport brackets (`[00]`), and monospace telemetry indices.
- **Founders & Attribution**:
  - Arbaz Arshad `[DEV-01]`: Game Developer · AI Systems · Tech Wizard (`arbazarshad.com`, `github.com/arbazarshad7`).
  - Devesh Das `[DEV-02]`: Game Developer & CS Engineer (`mrdeveshdas.vercel.app`, `github.com/ninja27dev`).
  - Headquarters: `BHUBANESWAR, IN // GLOBAL REMOTE` (`20.2961° N, 85.8245° E`, Centurion University).
- **Graceful Degradation**: Always provide local fallbacks (`mockRepos.js`, `blogPosts.js`, `FallbackMockAuthClient`). The frontend must NEVER crash or blank out due to missing API keys or offline network status.
- **Search Latency**: Keep search logic in-memory on the client; never add remote search dependencies for core portfolio entity lookup.
- **Clean Audio**: Sound must default to muted until the user clicks `SOUND [OFF]`. All audio must be procedurally generated via Web Audio API without bulky static media files.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

- **Viewport HUD Layering**: High Z-index perimeter frame (`ViewportHud.jsx`) overlaying a full-viewport Three.js WebGL canvas (`CyberCanvas.jsx`). Lower content sections dim and blur the 3D canvas for crisp readability.
- **State Flow**: Unidirectional state orchestration in `App.jsx`, augmented by global React Contexts (`AuthContext.jsx`, `SoundContext.jsx`) and observable pub-sub stores (`blogService.js`).
- **Algorithmic Search**: `searchEngine.js` integrates `PrefixTrie` and `InvertedIndex`, triggered globally via `Cmd+K` / `Ctrl+K`. Incremental re-indexing occurs upon article publish/update.
- **Security Boundaries**: Protected admin routes (`/admin` / Cockpit view) guarded by `AdminGuard.jsx` against email whitelist (`VITE_DEV_EMAILS`) and enforced server-side via Supabase Row-Level Security (RLS).
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agents/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-fast` for a trivial task inline, with no subagents and no PLAN.md
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
