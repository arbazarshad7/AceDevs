# Phase 08: Protected Developer Admin Dashboard — Technical Research

## Objective
Construct a secure administrative management dashboard restricted strictly to authenticated developers (**Arbaz Arshad** & **Devesh Das**). The dashboard includes a protected route guard, full blog post CRUD operations (Create, Read, Update, Delete, Publish toggle) with live Markdown preview, a manual GitHub repository sync trigger with real-time cache telemetry, and a developer team profile editor.

---

## 1. Protected Route Guard Architecture (`ADM-01`)

### Security Evaluation & Access Tiers
Access to `/admin` or `section === 'admin'` is strictly governed by the GoTrue session and developer role:
- **Tier 1 (Civilian / Anonymous)**: Unauthenticated visitor. Blocked immediately with a 403 tactical lockout screen.
- **Tier 2 (Guest Authenticated)**: User authenticated with arbitrary email outside authorized list. Blocked with `CLEARANCE INSUFFICIENT // GUEST USER` notification.
- **Tier 3 (Developer Admin)**: User authenticated as Arbaz Arshad (`DEV-01`) or Devesh Das (`DEV-02`) via email match or `VITE_DEV_EMAILS`. Granted full administrative clearance.

### Lockout Screen Aesthetics
Matching the Hubtown tactical Sci-Fi aesthetic:
- Beveled box with amber/red warning borders.
- Monospace header: `ACCESS RESTRICTED // CLEARANCE: LEVEL 5 REQUIRED`.
- Telemetry readout: `SECURITY PROTOCOL: RLS-GATEWAY // REASON: UNAUTHORIZED_OPERATOR`.
- Action triggers:
  - "AUTHENTICATE AS DEVELOPER [00]" (opens `AuthModal`).
  - "RETURN TO PUBLIC PORTFOLIO [01]" (routes back to hero).

---

## 2. Blog CRUD Engine Architecture (`ADM-02`)

### Dual-Layer Storage Pattern (`src/services/blogService.js`)
To guarantee that the AceDevs portfolio functions both with live Supabase PostgreSQL tables and seamlessly in offline/preview development mode:
1. **Supabase Table Integration**:
   - Schema: `posts` table with fields `id`, `slug`, `title`, `excerpt`, `content`, `author_id`, `author_code`, `published`, `tags`, `created_at`, `updated_at`.
   - Queries: `supabase.from('posts').select('*')`, `insert()`, `update()`, `delete()`.
2. **Resilient LocalStorage Layer**:
   - Initialized with the curated articles from `src/data/blogPosts.js`.
   - All CRUD modifications persist to `localStorage` key `acedevs_admin_posts` when offline or in preview mode.
3. **In-Memory Trie Sync**:
   - On every post creation, edit, or deletion, `blogService` invokes `searchEngine.indexBlogPosts()` so client-side `Cmd+K` search reflects changes in real time with zero latency.

### Live Markdown Post Editor
- Inputs: Title, Slug, Category tags, Excerpt, Content.
- Split-pane or tabbed view: `MARKDOWN INPUT` and `TACTICAL HUD PREVIEW` using `MarkdownRenderer`.
- Read-time auto-calculation via `calculateReadingTime`.
- Publish status switch: `DRAFT [OFFLINE]` vs `PUBLISHED [LIVE]`.

---

## 3. Manual GitHub Repository Sync (`ADM-03`)

### Real-Time Aggregator Pipeline
- Invokes `fetchCollectiveRepos({ forceRefresh: true })` from `src/services/githubService.js`.
- Bypasses the 30-minute `localStorage` cache.
- Displays synchronization metrics:
  - `SYNC DURATION: {ms}ms`
  - `CACHE STATUS: FRESH`
  - `REPOSITORIES INGESTED: {count}`
  - `RATE LIMIT REMAINING: {count}`
- Re-indexes repositories in `searchEngine` in real time.

---

## 4. Team Profile Information Manager (`ADM-03`)

### Profile Customizer
Allows founders to manage their live portfolio telemetry:
- Arbaz Arshad (`DEV-01`): Designation, specialties array, GitHub/LinkedIn links, bio.
- Devesh Das (`DEV-02`): Designation, specialties array, GitHub/LinkedIn links, bio.
- Persisted to local state / Supabase profiles table.

---

## 5. Security & Threat Modeling

| Threat ID | Threat Description | Severity | Mitigation |
| :--- | :--- | :--- | :--- |
| **T-08-01** | Unauthorized visitor accessing administrative actions | High | `AdminGuard` validates `isDeveloper === true` before rendering controls; Supabase RLS enforces server-side policy. |
| **T-08-02** | XSS injection via blog post Markdown content | High | `MarkdownRenderer` uses sanitized AST lexer without raw HTML execution (`dangerouslySetInnerHTML` forbidden). |
| **T-08-03** | Accidental post deletion | Medium | Tactical deletion modal with confirmation prompt before executing delete. |

---

## 6. Validation Strategy

- `npm run build`: Zero errors, bundle compiles cleanly.
- Browser subagent tests:
  1. Accessing Admin section when logged out: verify 403 Access Restricted lockout screen.
  2. Clicking "AUTHENTICATE AS DEVELOPER" to log in as Arbaz (`DEV-01`).
  3. Verifying Admin Dashboard loads with Level 5 Clearance banner.
  4. Creating a new technical blog post and verifying it appears in the post table.
  5. Editing an existing article and toggling publish status.
  6. Triggering manual GitHub repository sync and verifying success telemetry.
  7. Returning to civilian portfolio and verifying new article appears in the public blog listing.
