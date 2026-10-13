---
phase: "8"
slug: "protected-developer-admin-dashboard"
status: draft
nyquist_compliant: true
wave_0_complete: false
created: "2026-10-14"
---

# Phase 8 — Validation Strategy

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
| 08-01-01 | 01 | 1 | ADM-01 | T-08-01 | Lockout screen on unauthenticated / non-dev access | unit | `npm run build` | ✅ | ⬜ pending |
| 08-01-02 | 01 | 1 | ADM-02 | T-08-02 | Sanitized blog post CRUD service & Trie sync | unit | `npm run build` | ✅ | ⬜ pending |
| 08-02-01 | 02 | 2 | ADM-02 | T-08-03 | Tactical post editor with live Markdown preview | e2e | `npm run build` | ✅ | ⬜ pending |
| 08-02-02 | 02 | 2 | ADM-03 | T-08-01 | Manual GitHub repository sync & cache telemetry | e2e | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Route guard lockout screen | ADM-01 | Visual lockout verification when unauthenticated | Navigate to admin section while logged out and verify 403 screen |
| Manual GitHub API sync | ADM-03 | External GitHub API call & rate-limit check | Click sync button and verify fresh telemetry output |

---

## Validation Sign-Off

- [x] All tasks have automated verify command
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all dependencies
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-14
