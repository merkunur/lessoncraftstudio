---
name: feedback-programmatic-textcontent-assertions
description: "When verifying chrome localization (in-card title, teacher chip, etc.) across locales, run programmatic .textContent assertions via Puppeteer's $eval with setCacheEnabled(false), NOT just eyeball PNGs. Eyeball PNGs can show correct rendering on fresh state while user-side cache shows broken state."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2eb716ab-7052-48c6-a06d-c346c748d2b3
---

Rule: For shared-chrome i18n changes (anything that renders the same component across multiple locales — header nav, activity chip, in-iframe title, breadcrumb, footer crawl-bait), the verification artifact MUST include **programmatic textContent assertions** via Puppeteer's `$eval` with `setCacheEnabled(false)`, not just a visual eyeball of the screenshot.

**Why:** Puppeteer's fresh-state Chromium always fetches the latest deployed bytes — so the screenshot shows the correct rendering. But a user's browser may hold stale cache OR a CDN edge may serve an older version. The eyeball check confirms "the code is right" but doesn't confirm "every user sees the right thing." The textContent assertion catches genuine code defects loudly; the eyeball alone doesn't.

**How to apply:** Add a `setCacheEnabled(false)` line + a `$eval` on the selector + an `expectedValue === actualValue` check in the Puppeteer script. Fail loudly if mismatch. Reference pattern in `.proof-screenshots/verify-title-locale.js` from commit `f59a7ad2` and `screenshot-e8-pt.js` from commit `693b3e86` — both include programmatic assertions on `.lcs-title.textContent` across PT/FI/ES.

**Empirical anchor:** the FI E8 commission's report said "I eyeballed the PNG; title is 'Sanan rakentaja'". The PNG WAS correct. But the operator's browser cache served pre-fan-out JS that rendered Spanish. The cache-buster commission added textContent assertions + cache-disabled fetch, which would have caught the bug on the first run.

The PT E8 fan-out commission then USED the new pattern: 3 textContent assertions across PT/FI/ES caught no issue, screenshots confirmed, operator approval clean.

Cross-reference: [[feedback-cache-buster-discipline]] (the underlying cause); CLAUDE.md §A.13.43.
