---
name: project-page-speed-audit-2026-06
description: "Page-speed/Core Web Vitals audit + safe fixes (2026-06-02); the site is slow on MOBILE everywhere, not the decks"
metadata: 
  node_type: memory
  type: project
  originSessionId: 88348cc3-f339-4985-bd70-1536ce3a8520
---

Page-speed / Core Web Vitals audit + safe fixes commission, 2026-06-02. Full writeup: `docs/audit-results/pagespeed-audit-2026-06.md`.

**Headline finding (overturns the usual assumption):** the decks are NOT the slow pages. EVERY public page is great on desktop (Lighthouse 94–98) and slow on MOBILE (54–82). The universal driver is image/media weight, not the decks (which sit mid-pack, ~70 mobile). Lighthouse mobile has high run-to-run variance (±8) — trust asset-byte reductions over single-run scores.

**Measurement:** use `scripts/lighthouse-audit.js` (local headless Chrome; PSI keyless API is quota-exhausted → 429). Runs mobile+desktop over one URL per page type + one deck per family. `--only=home-en,topic` (comma list), `--form=mobile`. Writes `docs/audit-results/lighthouse-<date>.json`. **Gotcha:** Next.js pages are no-trailing-slash canonical (308 redirect from `/en/`→`/en`); nginx deck pages ARE trailing-slash. Measuring the wrong form adds a ~770ms mobile redirect artifact (NOT a real-traffic issue — canonical+links are no-slash).

**Fixes shipped + verified live (commits b0bb0778, 516d2561, 59c9b954):**
- Deck thumbnails were full-size 480×620 PNGs (130–156KB) via raw `<img>`. Converted to `next/image` (BreadthThumbV3, FeaturedDeckTileV3, DeckGridClient, worksheets hub) → optimizer serves ~7KB AVIF (~95% off; pre-flighted: prod `/_next/image` already optimizes REMOTE catalog URLs). `frontend/lib/img-host.ts wwwImg()` normalizes apex→www first.
- Hero video (877KB, no poster) → cream `poster` (`/videos/math-puzzle-poster.webp`, generated via sharp) + `aspect-[738/940]`.
- worksheets hub `revalidate=3600` (was on-demand).
- **`scripts/publish-cli/rewrite-deck-html-img-dimensions.js`** (rewrite-deck-html-* family): decodes inline JPEG SOF marker, injects worksheet-img width/height → fixes mobile CLS on non-square decks (deck-A addition 0.313→0.008). Applied to ALL 19,533 live decks (0 errors, idempotent). **Wired into `publish-wave.js` STEP 4b** (after alt-text — shares the img tag) so future waves auto-inject; `--skip-img-dims` to bypass.

**Results:** home mobile 64→74, worksheets-hub 69→77 (LCP 9.0→5.3s), deck-A 54→74.

**Top remaining follow-ups (documented, NOT done — see audit §7):** (1) don't autoload the 877KB hero video on mobile (residual homepage LCP ~4.4s; needs hero-design sign-off); (2) scope NextIntl messages per route — `messages/en.json` is 273KB (topicProse 112 + topicFaq 70 + topicMeta 20) serialized into EVERY page's flight data per §20.10 (medium-risk); (3) forward-gen deck encoding (JPEG q0.80 / per-locale STRINGS / minify) — 29-app fan-out, future decks only; (4) deck backdrop extraction is OUT OF SCOPE (breaks §14.1). Related: [[feedback_content_publishing_seo_standard]].

## DECKS ≥85 MOBILE follow-on (2026-06-02, audit §8) — DONE, all families 89-99
Operator required decks ≥85 mobile, quality-neutral. Decks were ~70 (LCP/CLS). FOUR zero-quality-loss fixes in `scripts/publish-cli/rewrite-deck-html-lazy-deckend.js` (wired into publish-wave STEP 4c; applied to all 22,612 live decks; forward R1/R3 in catalog-export.js + inject-deck-end-strip.js):
- **R1 lazy-load the 6 deck-end suggestion thumbnails** (were eager, ~900KB = ~83% of mobile bytes; below-fold) → LCP win.
- **R2 async Fredoka font** (media=print onload + noscript) → FCP ~3.2s→~1.6s.
- **R3 un-hide the suggestions `<section>`** (shipped `hidden`, revealed on celebration; hidden→shown load transition shifted layout).
- **R4 `.lcs-bar` flex-wrap:wrap→nowrap** = ROOT CAUSE of the intermittent ~0.37 CLS (trace-attributed: a bar text element widens at load → a 40×40 button wraps to line 2 → sticky bar grows ~52px → worksheet shoved down 52px). nowrap pins it (title has min-width:0+ellipsis). **R4 is also what makes R2's async font CLS-safe** — the "async font CLS" was this bar-wrap exposed by paint timing, NOT font-swap.
Result: addition 92/98, wordsearch 91/98, find-count 89/97, chart-count 90/98, matching 99, sudoku 97 (CLS ≤0.045). 
**Key debugging lesson:** mobile CLS is bimodal/intermittent — measure 3× before concluding; when Lighthouse `layout-shift-elements` is empty, use `lighthouse --save-assets` + parse `*-0.trace.json` `LayoutShift.impacted_nodes` (old_rect→new_rect) to attribute the shift. See CLAUDE.md none / audit §8.

## INTERNAL-REDIRECT SEO fix (2026-06-02, audit §9) — DONE
Internal links pointed at redirecting URLs. Root cause: Next.js `trailingSlash:false` → `/<locale>/topic/<slug>/` **308**-redirects to no-slash; deck pages are OPPOSITE (nginx needs the slash; no-slash 404s). Fixed sources: (1) **deck.html end-deck topic links + breadcrumb JSON-LD item URLs** (~3 links + 2 items/deck) — forward in `substitute.js` + `inject-deck-end-topic-links.js`, retrofit via new `rewrite-deck-html-topic-slash.js` (single-segment topic `<a>` + JSON-LD `item` only; never touches `/decks/<slug>/`), applied to **22,499 decks: 65k topic links + 45k breadcrumb URLs**, wired into publish-wave STEP 5b; (2) `SiblingAxisStrip.tsx` + `CrossAxisPivots.tsx` plain-`<a>` topic links. **Left as-is (don't redirect):** `<Link>`/next-link emitters (next-link normalizes the slash away — verified homepage 0 slash), canonical/hreflang/sitemap (already clean), deck `/decks/<slug>/` slash, site-level 301s (`/`→`/en`, apex→www, old-slug). Verified: all internal targets 200 direct; 0 trailing-slash topic links on any Next page.
**OPS GOTCHA:** deploy.sh line 183 `rm -rf .next/server .next/standalone` (under `set -e`) can transiently fail "Directory not empty" — the running pm2 writes ISR cache into standalone during the delete → deploy aborts BEFORE building (git pull + prisma still ran, so it looks partly done). Recover: `cd /opt/lessoncraftstudio/frontend && rm -rf .next/standalone .next/server` then re-run `deploy.sh`. Verify the Next build actually deployed by curling origin-direct (`--resolve www.lessoncraftstudio.com:443:65.108.5.250`) — topic pages are `cf-cache-status: DYNAMIC` so origin = edge.
