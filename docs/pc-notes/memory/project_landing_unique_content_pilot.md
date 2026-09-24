---
name: project-landing-unique-content-pilot
description: Why /worksheets/ landings get 0 impressions — the REAL page-level cause is thin/near-duplicate text (unique value locked in images); the ex.item augment fix that shipped the EN-prepositions pilot
metadata: 
  node_type: memory
  type: project
  originSessionId: 6209a8f6-f9da-4db5-845b-00c8ee72aa72
  modified: 2026-07-22T09:11:16.017Z
---

# /worksheets/ 0-impressions — real cause + the prepositions pilot (2026-07-22)

Operator rejected "crawl budget" as the answer and pointed at images. Fresh live investigation
(curl headers, robots, sitemaps, `site:`, nginx logs) established the honest, layered cause:

## Root cause (corrects the crawl-budget-only framing)
- Page tech is FLAWLESS: 200, self-canonical, `index,follow`, valid JSON-LD, og:image/twitter/
  JSON-LD `image` all present + resolve 200, in sitemap shard once, hreflang reciprocal. **No missing/
  broken tag.** `site:` shows NEITHER the landing NOR the identically-slugged `/decks/` page indexed —
  the WHOLE worksheet corpus is absent, so the cause is corpus/content-level, not per-page.
- **The unique value is locked in images/PDFs; the HTML is templated theme-swap boilerplate.** The
  worksheet is a rendered JPEG (deck.html) + PDF; the landing's only HTML text was a ~250-word
  description that repeats across thousands of pages with one noun swapped. Google indexes TEXT, can't
  read the image for uniqueness → "Crawled – currently not indexed". Metadata isn't missing; **unique
  indexable TEXT is.** Plus ~3–4 near-dup URLs/worksheet (deck+landing+2 PDFs) on a churn-collapsed
  low-trust domain. (Crawl-budget collapse is the mechanism; see [[project-crawl-budget-collapse-2026-07]].)

## The fix that shipped (one line, surgical)
`render-landing-html.js` ALREADY had an i18n "Pictures on this worksheet" section (wordsHtml) fed by
the server augment `augment-landings-real-content.js` (`/var/www/lcs-media/landings-augment/<loc>.json`,
NOT git). It was silently empty for prepositions because `extractNouns()` read `ex.image`/`ex.leftValue`
but prepositions decks store the pictured noun under **`ex.item` ({name,word,theme})**, and their
`vocabulary`/`images_used` are both `[]`. Added the `ex.item` branch (commit `203e98c6`).
- Blast radius = EXACTLY 50 en prepositions landings / 206 decks (no other en type uses `ex.item`).
- Additive; **NO title/meta/canonical/slug churn (§21.5a-safe)**; no en.json/schema change.
- Ship path (landing-only, NO Next build): `git pull` on server →
  `node scripts/seo-landing/augment-landings-real-content.js --locales=en` →
  `node scripts/seo-landing/render-landing-html.js --locales=en --out=/var/www/lcs-media/landings`.
  Landings are STATIC nginx-served from `/var/www/lcs-media/landings/<loc>/<slug>/index.html`.
- Committed fix AUTO-scales to all 11 locales' prepositions on the next full deploy.sh
  (`augment --locales=all`); kept EN-only for a clean measurement window.
- Verify live must cache-bust past Cloudflare (`?_cb=$(date +%s)`; landings `max-age=3600` edge HIT).

## COMMISSION 2 — CORPUS-WIDE, ALL 11 LOCALES, LIVE (2026-07-22)
Operator: "fix ALL worksheet pages" + "analyze EACH type — they're all different." Did a per-type
analysis of every worksheet type's real manifest + DECK_BUNDLE, then extended the extractor per shape:
- **extractNouns** now reads every RICH shape: `elementToImage`/`letterToImage`/`imageMap` dicts,
  chart-count `icons`, find-and-count `gridData`, picture-sort `name`, bingo list, + path-only
  (odd-one-out `rowsSnapshot`, more-less `L`/`R`, pattern-worksheet `uniqueImages`) via `vocabNoun`
  localization (drops on non-en miss → NEVER leaks English; verified de/es/fr/nl/it in-language live).
- **bundleFallback** extended: big-small (`imageRefs` keys), picture-trail (`legend[].vocabKey`).
- **math-puzzle** `operations[].text` + **math-worksheet** `values`×`equations[].expr` → real
  "6 − 4 = ?" problems (results/solutions NEVER emitted).
- Noun threshold 3→2 (covers pattern-train's 198 A-B patterns; a 2-object list is honest content).
- **Answer-hygiene (per-type, load-bearing):** crossword clue `name` IS the answer word → HIDDEN.
  **word-guess/word-scramble: the picture noun IS the target word (words[0]===image.name) → HIDDEN**
  (caught by the corpus sweep; do NOT list their pictures). cryptogram hidden. Verified 0 leaks.
- **THIN by design (no safe unique text — objects baked into pixels / all text is answers):**
  crossword (~5.5k), word-guess/scramble (~1k), shadow-match/missing-pieces/treasure-hunt (~1.5k) →
  differentiate by theme+counts only (the facts section). Do NOT fabricate content for these.

Result: **21,240 / 30,078 rendered landings (71%) now carry a unique-content section** (object/word
list or real problems) across ALL 11 locales; the rest are structurally thin. Commits `203e98c6`
(prepositions pilot) → `+3 fixes`. Diff-guard: 0 regressed non-content fields. Shipped via
`augment --locales=all` + `render-landing-html.js --locales=<all11>` (18s, NO Next build). Files:
`scripts/seo-landing/augment-landings-real-content.js` (extractNouns/bundleFallback/extractSampleProblems
+ NOUN_TYPES/HIDE_WORD_TYPES) + `render-landing-html.js` (noun threshold 2). Per-type spec in the plan file.

## Next
MEASURE 2–3 wk in GSC on the 50 en prepositions landings: "Crawled – not indexed" falling / impressions
appearing. If yes → extend the same `augment` extractor to other thin/`ex.item`-ish types + scale.
If no → domain-trust-dominant; hold for churn-freeze recovery (~2026-09-01). Plan file:
`C:\Users\rkgen\.claude\plans\analyze-thoroughly-and-find-rosy-walrus.md`.
Related: [[project-crawl-focus-landings-over-pdfs]], [[project-seo-forensic-audit-2026-07-10]],
[[feedback-verify-rendered-not-source]].
