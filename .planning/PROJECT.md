# AceDevs — Collective Developer Portfolio

## What This Is

AceDevs is a team portfolio website for developers **Arbaz Arshad** and **Devesh Das**. It serves as a unified digital showcase for their shared ventures, individual projects, and technical writing, built with a high-tech "Tactical Sci-Fi HUD / Digital Twin" aesthetic inspired by Hubtown (`hubtown.co.in`).

## Core Value

Showcase collective synergy and individual engineering mastery through a futuristic HUD interface, automated GitHub repository aggregation, an authenticated technical blog engine, and an algorithmic Trie-based multi-tag search engine.

## Context

- **Team Members**:
  - **Arbaz Arshad** — Co-Founder / Developer (profile, designation, external portfolio link)
  - **Devesh Das** — Co-Founder / Developer (profile, designation, external portfolio link)
- **Design Inspiration**: Hubtown (`hubtown.co.in`) — Deep space navy canvas (`#020a19`), ice cyan luminescence (`#d5e0ff`), chamfered 45° clipped corners, viewport telemetry brackets (`[00]`, `N 000°`, `ZOOM 1.0X`), dual typography (technical sans + monospace telemetry).
- **3D Experience**: Interactive 3D Cybernetic Node Network and Particle Grid in the hero section visualizing interconnected software projects and systems in Three.js.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **HUD Design System Foundation**: Deep space canvas (`#020a19`), ice cyan glow (`#d5e0ff`), glassmorphism with `backdrop-filter: blur(20px)`, chamfered `clip-path` cards, monospace HUD frames.
- [ ] **Interactive 3D Three.js Hero Canvas**: Cybernetic node network with interactive particles, pulse line shaders, and mouse reactivity.
- [ ] **Team Profile Modules**: High-contrast profile cards for Arbaz Arshad and Devesh Das with designations, bio, skills, and links to personal portfolios.
- [ ] **Automated GitHub Collective Repos Panel**: Fetch and cache repositories for both developers via GitHub API, displaying stars, forks, tech stack tags, and developer attribution.
- [ ] **Trie-Based Multi-Tag Search & Inverted Index Engine**: Algorithmic in-memory search engine providing instant prefix autocomplete (Trie) and multi-tag/keyword indexing (Inverted Index) across projects, repos, and blogs.
- [ ] **Technical Blog Engine**: Markdown-powered article reader with syntax highlighting, author metadata, tags, and reading time estimation.
- [ ] **Supabase Authentication**: Secure login supporting Google OAuth and Email/Password credentials for developer access.
- [ ] **Developer Admin Dashboard**: Protected workspace for Arbaz and Devesh to publish/edit blog posts, manually trigger GitHub repo syncs, and manage showcase items.

### Out of Scope

- Public user registration/comments (blog comments are out of scope; only team members log in).
- Monetization / e-commerce billing.
- Third-party social feed embeds (beyond direct GitHub API).

## Constraints

- **Framework**: Vite + React SPA for responsive rendering and lightweight WebGL integration.
- **Styling**: Vanilla CSS / CSS Modules with design tokens for custom beveled HUD geometry and animations.
- **3D Graphics**: Three.js WebGL canvas with custom shaders for cybernetic nodes and particle flow.
- **Backend / DB / Auth**: Supabase (Postgres, GoTrue Auth, Row-Level Security).
- **Search**: In-memory custom Trie data structure + Inverted Index for zero-latency client-side querying.

## Key Decisions

| Decision | Rationale | Outcome |
| :--- | :--- | :--- |
| **Vite + React SPA** | Maximum flexibility for interactive Three.js canvas loops and client-side Trie execution | — Pending |
| **Hubtown Sci-Fi HUD Theme** | Radical brand differentiation over standard web dev portfolio templates | — Pending |
| **Custom Trie + Inverted Index** | Instantaneous multi-tag search without third-party search service dependencies | — Pending |
| **Supabase for Auth & Blog** | Production-ready auth (Google OAuth + Password) and headless PostgreSQL storage | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-13 after initialization*
