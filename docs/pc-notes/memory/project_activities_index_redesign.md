---
name: project-activities-index-redesign
description: "The /[locale]/activities index is a faceted catalog with real rendered preview thumbnails; how previews are generated, served, and kept fresh."
metadata: 
  node_type: memory
  type: project
  originSessionId: c449e1ef-7c7c-48e7-af05-927e055606b1
---

# Activities index — faceted catalog + real-preview thumbnails (2026-06-18, commit `37d02b1a`)

`/[locale]/activities` was redesigned from a bare grade-band text grid into a **professional faceted catalog** in the Direction A identity (cream/teal/coral, Baloo 2 + Nunito, paper-grain dual-shadow cards). Three operator review rounds drove it: (1) "piece of shit, not professional" → faceted layout + Direction A cards; (2) "thumbnails don't convey content" → real rendered previews instead of per-engine glyphs; (3) "some have no image, only text" → eager-load fix + seed weak engines.

**Structure** (all server-rendered, URL-state, SSR/crawlable):
- Left **Subject / Grade / Skill-area** filter rail (mobile `<details>` drawer) + **sort** (Newest/A-Z/Z-A) + active-filter chips + responsive card grid (`xl:grid-cols-4`), pagination-ready (PAGE_SIZE 48).
- Files: `frontend/lib/activities-catalog.ts` (deriveSubject/shortTitle/parseActivityFilters/buildFacets), `frontend/components/activities/{ActivityCatalogCard,ActivityCatalogFilters,ActivityGlyph}.tsx`, `frontend/app/[locale]/activities/{page.tsx,activities-catalog.css}`. Grade label from `seo.educational_level.*`, strand via `localizeStrand`, 0 Common-Core leak on the 10 non-EN.

**Card thumbnails = REAL rendered previews of each activity's play area** (NOT abstract glyphs — glyphs are per-ENGINE so can't distinguish activities sharing an engine). Each card shows a screenshot of the activity's `.lcs-stage` (themed ten-frames show animals/fruits, number bond shows 10=8+?, clock shows a face, etc.). `ActivityGlyph` remains only as the missing-preview fallback.

## DURABLE — preview generation + serving
- **Generator: `scripts/generate-activity-previews.js`** (local-only; Chrome is NOT on Hetzner). Static-serves `mini tools/` + `image-library-webp/`, loads `/mini-tools/<tool>.html?activity=<id>&lang=en&embed=compact`, waits `.lcs-stage`, **seeds** the empty-on-load engines (ten-frame `setCount`, array fill all cells via `filled`+`_key`+`paint`, place-value `addHundred/addTen×2/addOne×3+paint`), `element.screenshot()` → Sharp → `frontend/public/mini-tools/previews/<id>.webp` (480×360). One canonical **en** render per activity, reused across all 11 locales (the stage is ~language-neutral: numerals/shapes/theme-images).
- **WebPs are gitignored** (`frontend/public/mini-tools/` ignored; never `git add` images per §A.3). Only the SCRIPT is committed.
- **Served at `/mini-tools/previews/<id>.webp`** from `/var/www/lcs-media/mini-tools/previews/`. `frontend/public/mini-tools` is a **symlink → /var/www/lcs-media/mini-tools**, so that one location serves the `<img>` AND satisfies the page's build-time `fs.readdirSync(public/mini-tools/previews)` existence check (which decides `previewUrl` vs glyph fallback).
- Card uses a plain **eager `<img loading="eager">`** (NOT next/image) — next/image lazy-loaded below-the-fold previews → blank panels in screenshots + pop-in. LESSON: for a grid of small pre-sized static webps, eager `<img>` is more robust than next/image lazy.

## DEPLOY recipe (when previews change OR a new activity ships)
1. `node scripts/generate-activity-previews.js` locally (regenerates all 37 webps).
2. `pscp frontend/public/mini-tools/previews/*.webp root@65.108.5.250:/var/www/lcs-media/mini-tools/previews/` → `chown lcs-media:lcs-media` + `chmod 644`. Do this BEFORE the build (the build's fs-check resolves via the symlink).
3. push code → `deploy.sh`.
4. Verify: `curl /mini-tools/previews/<id>.webp` (200 image/webp) + `curl /<loc>/activities` and count `/mini-tools/previews/…webp` refs (en 37 / de,fi 35).

**When an activity ENGINE's visuals change, regenerate + re-upload previews** or the thumbnail goes stale. **When a NEW activity ships**, add a seed branch if its engine renders empty-on-load, then regenerate + upload.

**Tech-debt:** `scripts/local-test-activities-index.js` (committed in `a7233783`) asserts the OLD grade-band grouping — stale now; update or delete on next touch. Detail pages + engines/cores untouched by this work.
