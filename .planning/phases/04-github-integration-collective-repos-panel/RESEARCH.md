# Phase 04: GitHub Integration & Collective Repos Panel — Technical Research

## Objective
Implement an automated GitHub repository aggregator querying public projects for **Arbaz Arshad** and **Devesh Das**, featuring persistent client-side caching, rate-limit resilience, developer attribution tags, and a tactical HUD "Collective Repos" panel with multi-criteria filtering.

---

## 1. GitHub REST API Specification & Rate Limits
- Endpoint: `https://api.github.com/users/{username}/repos?sort=updated&per_page=100&type=owner`
- Public unauthenticated requests: 60 requests/hour/IP.
- Headers:
  - `Accept: application/vnd.github.v3+json`
  - Optional `Authorization: Bearer <VITE_GITHUB_TOKEN>` if provided in `.env`.
- Response fields extracted:
  - `id`, `name`, `full_name`, `html_url`, `description`, `homepage`
  - `stargazers_count`, `forks_count`, `language`, `topics`, `updated_at`, `pushed_at`, `archived`, `fork`

---

## 2. Caching Strategy & Offline Resilience
- Storage: `window.localStorage`
- Key: `acedevs_github_repos_v1`
- Schema:
  ```json
  {
    "timestamp": 1728860000000,
    "ttlMs": 1800000,
    "data": [ ...repositories ],
    "source": "api" | "cache" | "fallback"
  }
  ```
- Strategy:
  1. Check localStorage: if valid (< 30 minutes old), return cached repos.
  2. If expired or force refresh: fetch from GitHub API for both developers in parallel using `Promise.allSettled`.
  3. If rate-limited (HTTP 403) or offline, automatically fall back to cached data or high-fidelity curated mock dataset (`mockRepos.js`).
  4. Always flag data source in telemetry (`[SOURCE: LIVE GITHUB]`, `[SOURCE: LOCAL CACHE]`, `[SOURCE: TELEMETRY FALLBACK]`).

---

## 3. Developer Attribution Pipeline
Each repository is tagged with:
- `owner`: `{ id: 'arbaz', code: 'DEV-01', name: 'Arbaz Arshad' }` or `{ id: 'devesh', code: 'DEV-02', name: 'Devesh Das' }`.
- Or shared collective repo (if repo belongs to an organization or has collaborative commits).
- Tech language color mapping matching tactical HUD cyan/sapphire palette.

---

## 4. UI Architecture & Tactical HUD Styling
- `src/components/repos/`:
  - `CollectiveRepos.jsx`: Main section stage with telemetry bar, developer filter pills, language filter dropdown, search query input, and sorting controls.
  - `RepoCard.jsx`: Tactical 45° beveled container with owner tag, star/fork counts, topic pills, and `VISIT REPO [->]` ChamferButton.
  - `repos.css`: Scoped stylesheet adhering to design tokens.
- Integration:
  - Accessible via `REPOSITORIES [04]` in top nav, left rail, bottom bar center trigger (`OPEN PROJECT LIST`), and Hero CTA `COLLECTIVE REPOS [00]`.
