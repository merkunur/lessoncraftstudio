---
name: feedback-activity-mobile-qa-standard
description: Every new/changed activity MUST pass the mobile-layout audit harness across all phone widths before ship — the standing mobile-QA gate.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cf6b44fd-535c-4dd2-b9a0-3886b31b68c9
---

Operator was repeatedly frustrated that activities looked broken/cramped on some phones (esp. Galaxy / narrow Android). Standing directive (2026-06-02): **every activity must look good on every mobile device, and this must be a permanent standard** — not re-litigated per activity.

**The gate:** `node scripts/audit-activity-mobile.js` (root, puppeteer). Enumerates ALL activities from `frontend/public/mini-tools/*-activities.json`, loads each real activity page, and measures geometry INSIDE the iframe across widths **280, 320, 360, 375, 390, 412, 430, 768** (realistic per-width device heights) in **empty + best-effort-filled** states. Hard-fails on: horizontal overflow/clip, off-screen control, vertical clip, console errors (LIVE only — localhost console noise is ignored). Soft warns: tap target <36px, empty band >150px. Writes `docs/audit-results/mobile/mobile-activity-audit.{json,md}` + screenshots at 360/412/768.

**How to apply (MANDATORY before shipping any new/changed activity):**
1. Local verify during fixes: `node scripts/audit-activity-mobile.js --base=http://localhost:3000 --activities=<id-substr>` (start dev per §14.5 sitemap rename; harness sets `setCacheEnabled(false)`).
2. Must reach 0 hard fails at every width, both states. EYEBALL the screenshots too (tests pass ≠ visual approval, §A.13.43).
3. Bump cache-busters (§A.13.42): `lcs-shell.css?v=` (all 9 wrappers) if shell changed; the engine `*-core.js?v=` in its wrapper(s) if engine changed; `ACTIVITY_WRAPPER_VERSION` in `frontend/app/[locale]/activities/[slug]/page.tsx`.
4. Deploy: edit source under `mini tools/` (git-tracked, 34 files) — NOT `frontend/public/mini-tools/` (gitignored local-dev mirror; server symlink → `/var/www/lcs-media/mini-tools/`). On Hetzner after push: `git pull` → `cp "mini tools"/*.css "mini tools"/*.js "mini tools"/*.html /var/www/lcs-media/mini-tools/ && chown lcs-media:lcs-media /var/www/lcs-media/mini-tools/*` (files are NOT chattr+i — plain cp works) → `bash deploy.sh`. `deploy.sh` does NOT sync mini-tools (only verifies the symlink).
5. Re-run harness against LIVE → all-PASS. (Cloudflare 5-min TTL; the `?v` bumps + harness `?_=` page query bust the edge.)

**Why structural:** activities render in an iframe with `scrolling="no"` + the card is `overflow-x:hidden`, so any over-wide content is CLIPPED (cut off) — same failure class as the homepage embed. Pre-existing QA only tested 375px on a few activities, so Galaxy widths (360 and below) kept slipping through. The harness is the only thing that catches it across the full matrix.

**Empirical anchor (2026-06-02, commit 64f21f7e):** live audit of 33 activities = 27 hard fails + systemic empty-band; root causes were the iframe `min-height:85vh` (empty band), place-value fixed trays overflowing at ≤320, and ten-frame controls/single-frame at 280. After fixes: 376/376 pass. Doctrine = CLAUDE.md §A.13.55. Related: [[project-activities-architecture]] [[feedback-activities-approval-cadence]]; A.13.47 (CSS pitfalls), A.13.42 (cache-busters).
