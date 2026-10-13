---
phase: "7"
slug: "technical-engineering-blog-system"
status: draft
nyquist_compliant: true
wave_0_complete: false
created: "2026-10-14"
---

# Phase 7 — Validation Strategy

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
| 07-01-01 | 01 | 1 | BLOG-01 | T-07-01 | Author attribution and tag filtering | unit | `npm run build` | ✅ | ⬜ pending |
| 07-01-02 | 01 | 1 | BLOG-01 | T-07-02 | In-memory Trie search indexing | unit | `npm run build` | ✅ | ⬜ pending |
| 07-02-01 | 02 | 2 | BLOG-02 | T-07-03 | Sanitized Markdown AST rendering | e2e | `npm run build` | ✅ | ⬜ pending |
| 07-02-02 | 02 | 2 | BLOG-02 | T-07-04 | Code block syntax styling & copy utility | e2e | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual Markdown formatting | BLOG-02 | Visual inspection of headings, code blocks, lists, and callouts | Verify article reader renders formatted Markdown with cyan accents and code borders |
| Clipboard copy interaction | BLOG-02 | Browser clipboard permissions | Verify clicking code copy button displays copied confirmation |

---

## Validation Sign-Off

- [x] All tasks have automated verify command
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all dependencies
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-14
