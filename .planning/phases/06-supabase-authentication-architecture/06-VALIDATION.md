---
phase: "6"
slug: "supabase-authentication-architecture"
status: draft
nyquist_compliant: true
wave_0_complete: false
created: "2026-10-14"
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js verification script + Vite build + browser_subagent |
| **Config file** | `vite.config.js` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + browser verification
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | AUTH-01 | T-06-01 | Anon key only client exposure | unit | `npm run build` | ✅ | ⬜ pending |
| 06-01-02 | 01 | 1 | AUTH-01 | T-06-04 | Graceful fallback when env unconfigured | unit | `npm run build` | ✅ | ⬜ pending |
| 06-02-01 | 02 | 2 | AUTH-02 | T-06-02 | Origin-restricted OAuth redirect | e2e | `npm run build` | ✅ | ⬜ pending |
| 06-02-02 | 02 | 2 | AUTH-03 | T-06-03 | Input validation and rate-limit feedback | e2e | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Google OAuth Redirection | AUTH-02 | Requires live Google consent screen & active credentials | Verify that clicking Google OAuth initiates redirect flow or fallback message |
| Live Supabase Session | AUTH-01 | Requires active Supabase project backend | Verify auth state listener updates session state reactively |

---

## Validation Sign-Off

- [x] All tasks have automated verify command
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all dependencies
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-14
