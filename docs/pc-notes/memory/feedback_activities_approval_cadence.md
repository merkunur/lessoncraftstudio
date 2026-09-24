---
name: ""
metadata: 
  node_type: memory
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**The bar for activity approval.** Not "tests pass + HTTP 200." The bar is:
1. **Live render** at the deployed URL (operator opens it himself)
2. **3-viewport screenshots** (phone / tablet / desktop) confirming layout holds
3. **Operator eyeball** — he approves visually, not by reading test output

**Why:** Empirical bugs that passed tests but were visually/functionally broken:
- Blank pages (200 OK + empty body)
- MIME 307→404 redirect chains (Next.js middleware mis-routing /mini-tools/ to /[locale]/mini-tools/)
- Layout breaks at narrow viewports
- COUNT readout visibly showing the answer the kid is supposed to compute
- Feedback badge overlapping the playing board
- Oversized blank card area beneath short activities (postMessage iframe-resize wasn't firing)

**Why:** The operator is non-technical. He cannot inspect the test suite. The only signal he trusts is what he SEES on the live URL. CC must deliver to that bar.

**One-at-a-time cadence.** One prompt → one activity → one engine. Each must be 100% complete + deployed + operator-approved before starting the next. Nothing accumulates. Nothing batches.

**The five standing ACTIVITY-BUILD WORKFLOW rules (all default-on, assumed by every commission whether or not it restates them):** (1) **DEPLOY ONCE** — build all 11 locales + verify locally, then a single deploy; (2) **LOCAL TEST BEFORE DEPLOY** — local play-through verify REPLACES production-time verification; (3) **ONE NATIVE-LINGUIST AGENT PER LANGUAGE** — never one shared multilingual pass, never cross-applied; (4) **ONE PLAN-MODE STOP per activity**; (5) **VARIETY + SHUFFLE** — ≥7 ORIGINAL distinct exercises + a post-pass ORDER-ONLY reshuffle (the child never gets the same sequence twice); OUT OF SPEC without it. Rule 5 detail + the canonical `nextTask` pattern + the `scripts/audit-activity-variety.js` gate → [[feedback-activity-variety-shuffle-rule]] / CLAUDE.md §A.13.60.

**No timer / no score / no SmartScore / no streak / no countdown — anywhere.** Direction A explicitly excludes all gamification scoring. Warm K-3 tone, no-shame. Celebrate "Great!" on correct; gentle "try again" on wrong. The card UI carries TASKS DONE: N as a quiet progress pill — that's all.

**Why no scoring:** the audience is K-3 multilingual learners in international/bilingual classrooms. The product positions against IXL-quality polish but rejects IXL-style SmartScore stress. This is operator-locked.

**Mini-tools cp/deploy race hazard.** Standalone Next.js build indexes the static `/mini-tools/` manifest at build time. New manifest changes MUST be cp'd to `/var/www/lcs-media/mini-tools/` BEFORE deploy.sh runs `npm run build`, OR the build sees a stale manifest. Safe pattern: single chain `git pull → cp → bash deploy.sh`. See [[feedback-mini-tools-cp-deploy-race]] if separate memory exists; otherwise this entry IS the doctrine.

**How to apply:** When delivering an activity to operator:
1. Confirm live URL responds with content (curl + visible body, not 200-on-empty)
2. Capture 3-viewport screenshots, embed in chat response
3. Run interaction probe in puppeteer if interactive (correct path + wrong path)
4. **Run the variety+shuffle gate** `node scripts/audit-activity-variety.js --activities=<id>` — ≥7 originals + post-pass reshuffle (Rule 5; OUT OF SPEC without it)
5. Run the mobile gate `audit-activity-mobile.js` (§A.13.55) + sample-inspect approved/quarantined word lists where the gate applies
6. ONLY THEN tell the operator "ready for review"

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22; empirical accretion across E1, E2, E7 builds.
