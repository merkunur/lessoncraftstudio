---
name: project-topics-page-redesign
description: "/topic index \"Catalog Gallery\" redesign — Direction A hub with real worksheet thumbnails + theme art; shipped 2026-08-22"
metadata: 
  node_type: memory
  type: project
  originSessionId: 009c4275-2544-465d-9660-327776bdab3d
  modified: 2026-08-22T19:36:02.485Z
---

# Topics index redesign ("Catalog Gallery") — LIVE 2026-08-22

Route `frontend/app/[locale]/topic/page.tsx` (singular `/topic`, NOT `/topics`). Was pre-Direction-A chip clouds; now the hub treatment: level band (teal ladder) → 5 subject groups (localized `taxonomy.subjects` buckets) with each exercise-type's LEAD DECK worksheet thumbnail (`fetchLeadDeckForAxes` + slug-derived `deckAssets`) → theme tiles with archetypal library art → PageUsageBlock. Commits `2a44f2ff` → `96d4d236` → hyphens fix → lg-breakpoint fix; QA sweep en/de/fi × 360-1366 ALL PASS; metadata byte-identical (churn-freeze §21.5a compliant); tile hrefs now slashless (0 redirects).

**New assets/helpers:**
- `frontend/lib/topic-theme-art.json` — 100/100 theme axis-key → `/image-library-webp/themes/<Dir>/<noun>@2x.webp` archetypal picks. Regenerate: `scripts/generate-topic-theme-art.js`; gate: `scripts/verify-topic-theme-art.js` (poison-tested 3-for-3). Mirror dir = key with `_`→space + 8 casing exceptions (4th of July / At the Supermarket / reptiles and Amphibians / Things That Fly / Christmas bw (2) / Easter bw (2)).
- `listNonEmptyAxisKeysWithCounts(axis, locale)` in `frontend/lib/topic-decks.ts` (additive).
- Count pills reuse `topicPage.decksCount` ICU (native, 11 locales) — no new i18n was needed.

**Why (lessons bought here):**
- The webp mirror is FULLY populated for all 100 theme dirs (CLAUDE.md §A.7.2 "1 of 100 mirrored" is stale).
- The visual critic caught 4 real layout defects after all structural gates passed (edge band amputating sheet titles; fi/de long-word hard clips; one-line theme-label truncation; legacy serif in shared PageUsageBlock) — the render-reading step is load-bearing, again.
- `break-words` alone leaves lone-letter emergency breaks on de/fi compounds → pair with `hyphens-auto` (html lang is per-locale). ⚠ Browsers have NO Finnish hyphenation dictionary — fi long words need WIDTH (breakpoint change), not hyphens.
- PageUsageBlock ships legacy `font-display`/ink classes; re-skin per-page via `[&_h2]:font-lcsDisplay …` wrapper, don't edit the shared component (legacy pages still use it).
- Cloudflare can serve an HTML edge entry stale well past max-age=300 (Age 470+ observed) before EXPIRED/revalidate — verify with a cache-busted query param, then let the bare URL converge.

**Open (optional, operator's call):** [[project-deferred-items-queue]] — (a) sparse lead-deck thumbnails on graphing-data / counting-pictures / sorting-categories read as washed-out at card size (per-type curated lead-deck override map would fix); (b) `/topic/[slug]` DETAIL pages still legacy palette (FilterSidebar.tsx etc.) — the index now outdresses them; (c) site-chrome nav "Arbeitsblatt-Generatoren" wraps at 1024.
