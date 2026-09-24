---
name: project-worksheet-makers-press-hall
description: "The Press Hall redesign of /worksheet-makers (2026-08-22/23) — concept, architecture, gates, and the traps it bought"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8e1b6d99-9eca-4ae7-930b-5a10dc87f865
  modified: 2026-08-22T22:14:00.934Z
---

# The Press Hall — /[locale]/worksheet-makers redesign (LIVE 2026-08-23)

**Concept (operator-picked "Synthesis" of two agent-designed candidates):** the works behind the homepage gallery's Studio door — the gallery hangs finished work; this page MAKES it. Hero = the Master Machine, a pure-CSS press composing a worksheet on a 13s clock (4 theme pictures stamped, title/answer line ruled by a type wheel, coral seal, delivery to a wood ledge holding two REAL deck thumbnails); mode-dial 9s + flywheel 19s ({13,9,19} coprime, drawer 11s in its own viewport); reduced-motion = composed just-delivered pose. 6 numbered bays (in-family inks: math teal / literacy coral-ink / visual ochre #9A6B2E / matching plum #7C4E66 / puzzle slate #3F5B6E / search bottle-green), 33 machine cards (brass STABLE canonical No. from ALL_APPS order — same number every locale; real specimen thumbnails theme-spread; maker-content mode chips ×11 locales zero new authoring), picture-block drawer (24 real theme tiles), typesetting cases (11 engraved language plates = functional locale switcher), dispatch band. Commits `8aabecc5` (lib+i18n) · `8f1a1db7` (redesign) · `b8767f0a` (gates).

**Key architecture:**
- Shared body `frontend/components/worksheet-makers/PressHallPage.tsx` + scoped `worksheet-makers.css` (.wmk tokens); live page keeps `generateMetadata` BYTE-IDENTICAL (§21.5a — verified head-diff vs prod ×11 locales); preview route `/preview/worksheet-makers-v2` (noindex) is the rollback net.
- Thumbnails: `fetchLeadDeckCandidatesByExerciseType` in `lib/topic-decks.ts` — ONE query, ≤6 theme-distinct candidates per type; page spreads themes across the floor (else every card wears the newest publish-wave's theme, measured: 10/13 zoo-animals). `picture-path` ↔ `picture-trail` alias. URLs via deckAssets()+wwwImg() only. DB-down → 200 + 33 drawn cards.
- i18n: `worksheetMakersPage` ns ×11 (15 keys), TWO native panels audited (22 corrections; they also fixed the EN source twice). **The 4 PDF-only apps have NO taxonomy axis entry** → card titles leaked English on non-EN for months (old page too); fix = maker-content `name` fallback.

**Traps bought (each cost a debug loop):**
- ⭐⭐ `.actcat-card > * { position:relative; z-index:1 }` in catalog-cards.css loads AFTER Tailwind's utility layer and silently demotes `absolute`/`z-[2]` utilities on card children — a relatively-positioned `right-3` then shifts the node LEFT half-out of the card. Restore in your own later-loading CSS (`.wmk-card > .wmk-no { position:absolute; z-index:2 }`).
- ⭐⭐ **A lazy `<img>` with no intrinsic size (`max-w-full` only) renders a 0×0 box that never intersects → NEVER loads.** Give it `w-full h-full` from a sized parent.
- ⭐⭐ **A fast programmatic sweep (700px/90ms) outruns Chromium's lazy-load trigger entirely** — 51 images never even STARTED loading; a viewport-step sweep with 600ms dwell → 0. Screenshot harnesses that sweep fast certify blank cards as evidence. Both fixed in `scripts/audit-worksheet-makers-responsive.js`.
- ⭐ A poison run with the same output filenames OVERWRITES the genuine evidence screenshots (my homepage-poison clobbered the en sweep; I then "personally read" a homepage shot believing it was the hub at 2560). Poison to a different --out dir, or re-shoot after.
- ⭐ Element screenshots taken after `scrollIntoView` can include the sticky nav overlapping the element's top — I chased a phantom "dark teal band" for three probes; `elementsFromPoint` + pixel sampling settled it.
- MSYS Git Bash mangles `--path=/{locale}/...` args into Windows paths (invalid URL); use MSYS_NO_PATHCONV=1 or rely on script defaults. And `node gate | tail` hides the exit code (again).
- Delayed infinite keyframes phase-shift the whole cycle: per-cell `animation-delay` on the press's picture cells would leave a leftover picture on the NEXT blank sheet — bake per-cell percentages into separate keyframes instead.

**Gates (run before touching this page):** `node scripts/audit-worksheet-makers-responsive.js --base=... --locales=en,de,fi` (14 widths + reduced-motion + census + every-image-loaded) and `node scripts/audit-worksheet-makers-links.js --base=...` (11 locales × 33 hrefs + plates). Both poison-tested (responsive fails on the homepage; links fails on a bogus locale).

Cross-refs: [[feedback_verify_the_measurement_before_the_defect]], [[feedback_native_panels_audit_the_source]], [[project_homepage_v10_gallery]] (design laws inherited), [[project_topics_page_redesign]] (sibling hub).
