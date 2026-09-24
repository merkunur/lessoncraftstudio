---
name: activity-og-images
description: "Per-(activity, locale) 1200×630 og:image composites at /mini-tools/og/ replace the generic og-homepage.png on activity pages — new activities must run generate-activity-og-images.js"
metadata: 
  node_type: memory
  type: project
  originSessionId: d9db0986-1dc6-4d3a-b832-83cea4c34e5d
---

**LIVE 2026-07-12 (commit `77aa8b4e`)** — every activity page `/[locale]/activities/[slug]` now emits a per-activity, per-locale og:image / twitter:image / JSON-LD `image` (was: the generic `og-homepage.png` at all three sites).

**Mechanism:** `scripts/generate-activity-og-images.js` (clone of the `generate-activity-previews.js` puppeteer harness) screenshots each activity's `.lcs-stage` once at 2×, letterboxes it to 488×630 on cream `#FEFAF3`, then composes one **1200×630 PNG per locale key in `row.page_title`** via the canonical deck og pipeline (`scripts/publish-cli/og-image.js derive()` — two-column, localized title right panel, wordmark — + `og-image-xmp.js` XMP). Includes locale-only activities (render lang follows the row's first slug locale; the previews script filters those out). First full run: **204/204 activities, 0 failures, 1,000 PNGs (77MB)**.

**Storage/serving:** `frontend/public/mini-tools/og/<id>.<locale>.png` (gitignored via the existing `frontend/public/mini-tools/*` rule) → scp'd to `/var/www/lcs-media/mini-tools/og/` (`lcs-media:lcs-media`), served by the nginx `/mini-tools/` block (asset-class 1h cache; NOT hit by the [[minitools-html-noindex]] header — that's .html-scoped).

**Route wiring** (`frontend/app/[locale]/activities/[slug]/page.tsx`): `loadOgIds()` file-existence gate (same cached-Set 3-candidate-path pattern as the index's `loadPreviewIds`) + `activityOgImage(rowId, locale)` → locale composite → en composite → null (callers fall back to `og-homepage.png`). Localized `og:image:alt` from `page_title`. Set is cached per server lifetime → **scp new PNGs BEFORE the deploy/pm2 restart**.

**Forward rule (fold into every new-activity DoD, alongside the [[feedback-activity-page-copy-and-thumbnails]] preview step):** run `node scripts/generate-activity-og-images.js --only=<id>` locally + scp the new PNGs into `/var/www/lcs-media/mini-tools/og/` before deploying — otherwise the new activity's pages fall back to the generic image until the next full run.

**Untouched (still generic og-homepage.png, deliberate):** activities INDEX page (brand hub, appropriate) and tools/MakerLanding pages (out of scope; candidate for [[seo-quality-program]] using this same pattern — tools could reuse maker sample decks' thumbnails).
