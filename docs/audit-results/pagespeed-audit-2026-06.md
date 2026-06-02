# Page-Speed / Core Web Vitals Audit — 2026-06-02

**Scope:** every public page type, with emphasis on the ~19,500 deck pages.
**Method:** live Lighthouse (local headless Chrome, mobile **and** desktop) on one representative URL per page type + one deck per runtime family (A–F), plus code/asset static analysis. Harness: `scripts/lighthouse-audit.js` → `docs/audit-results/lighthouse-2026-06-02.json`.
**Why local Lighthouse, not the PSI API:** Google's keyless PageSpeed Insights endpoint shares a global anonymous quota that was exhausted (`HTTP 429 RESOURCE_EXHAUSTED`). Local Lighthouse reports the same lab metrics; a low-traffic site has no CrUX field data anyway. To run live PSI later, provision a Google API key and pass it to the harness.
**Targets:** PageSpeed ≥ 85, LCP < 2.5s, CLS < 0.1, TBT proxy for INP.

---

## 1. Headline — the premise is overturned

> **The decks are not the problem. The whole site is slow on mobile and fast on desktop.**

Every page scores **94–98 on desktop** and **54–82 on mobile**. The decks sit in the same mobile band as everything else (54–72); they are *not* uniquely bad. The real, universal issue is **mobile Largest Contentful Paint**, driven by **image/media weight** plus (on decks) a render-blocking font and a large inline backdrop.

### Baseline (canonical URLs; Lighthouse mobile has high run-to-run variance — treat ±8 as noise)

| Page type | URL | Mobile score | Mobile LCP | Mobile CLS | Mobile TBT | Desktop |
|---|---|---:|---:|---:|---:|---:|
| Homepage (en) | `/en` | **64** | 7.0s | 0 | 400ms | 98 |
| Homepage (de) | `/de` | 69 | 6.8s | 0 | 240ms | 94 |
| Topic page | `/en/topic/addition` | **82** | 4.2s | 0 | 210ms | 97 |
| Worksheets hub | `/en/worksheets` | 69 | **9.0s** | 0 | 260ms | 92 |
| Activity page | `/en/activities/count-to-10-with-animals` | 75 | 4.9s | 0.003 | 300ms | 96 |
| Tool page | `/en/tools/ten-frame` | 78 | 4.8s | 0 | 240ms | 97 |
| Deck A (addition) | `/en/decks/addition-find-addend-4th-of-july/` | **54** | 7.0s | **0.313** | 0 | 95 |
| Deck B (wordsearch) | `/en/decks/wordsearch/` | 71 | 6.7s | 0.012 | 0 | 96 |
| Deck C (find-and-count) | `/en/decks/find-and-count/` | 72 | 5.5s | 0.001 | 0 | 94 |
| Deck D (chart-count) | `/en/decks/chart-count/` | 72 | 6.0s | 0.001 | 0 | 96 |
| Deck E (matching) | `/en/decks/matching-letter/` | 72 | 6.1s | 0.001 | 0 | 96 |
| Deck F (sudoku) | `/en/decks/sudoku/` | 70 | 6.5s | 0.001 | 0 | 95 |

**Worst three (mobile):** deck-A (54 — CLS 0.313 + LCP 7.0), homepage (64), worksheets-hub (69 — LCP 9.0s).

### A measurement note that became a finding
The Next.js pages 308-redirect trailing-slash → no-slash (`trailingSlash:false`). Measuring `/en/` instead of `/en` added a ~0.5–0.8s mobile redirect penalty (and ~8 score points). **This is a test artifact, not a real-traffic issue** — the canonical tag and every internal link already use the no-slash form, so users/Googlebot don't redirect. All numbers above use the canonical (no-slash for Next, trailing-slash for nginx decks) forms.

---

## 2. Root causes (by page type)

### 2.1 Homepage (mobile 64 / LCP 7.0s) — image & media weight + hydration
Total mobile payload **2,144 KiB**. Largest resources:
- **`/videos/math-puzzle.mp4` = 877 KB** hero video, `autoPlay muted loop`, **no `poster`**. autoPlay forces the full download on mobile, monopolizing the throttled connection (~4–5s of bandwidth) and delaying whatever the LCP element is. No poster ⇒ the hero card is blank until the video buffers.
- **Deck thumbnails served as full-size 480×620 PNGs, 133–156 KB each**, via raw `<img>` (BreadthThumbV3, PillarInteractive, FeaturedDeckTileV3). For contrast, the hero **mascot already uses `next/image` and is 10 KB** (`/_next/image?...greeting.png&w=1080&q=75`). Same image through `next/image` would be ~10–20 KB instead of 150 KB — a ~90% saving per thumbnail.
- Theme clipart `cat@2x.webp` 76 KB / `horse@2x.webp` 60 KB — WebP but full @2x size for small display.
- **TBT 400ms + main-thread 2.5s**: the NextIntl client message bundle (see §2.6) hydrates on every page.

### 2.2 Worksheets hub (mobile LCP 9.0s) — worst LCP
**3,440 KiB** mobile. The hub renders a grid of deck thumbnails as **raw `<img>` PNGs** — `app/[locale]/worksheets/page.tsx:227` even carries a now-stale comment *"Use plain `<img>` so we don't have to register the [next/image] domain"*. The domain **is** registered in `next.config.js` now, so that rationale no longer holds. This is the single biggest LCP on the site.

### 2.3 Topic pages (mobile 82 / LCP 4.2s) — same thumbnail issue, smaller grid
`DeckGridClient.tsx` renders 24 thumbnails/page as raw `<img width=480 height=620 loading=lazy>`. Width/height are present (CLS 0), but they are full-size PNGs. Best-performing Next page because most of the grid is below the fold (lazy), but still image-bound.

### 2.4 Decks (mobile 54–72) — the real picture
- **Backdrop = base64 JPEG inlined into the HTML, 83–90% of page weight** (249–569 KB of base64; total HTML 304–634 KB). Verified across all six families. Per operator decision the single-file `§14.1` contract is preserved, so this stays inline — optimize via *encoding*, not extraction.
- **Mobile FCP ~3.0–3.3s**: render-blocking Google Fonts (Fredoka) stylesheet + parsing 300–600 KB of inline HTML before first paint. `display=swap` is set (text isn't blocked) but the stylesheet `<link>` is still render-blocking and there is **no `preload`** (0 preload hints in every deck).
- **CLS is deck-shape-dependent.** Square decks ≈ 0 (sudoku 0.001); **non-square decks shift badly — deck-A addition = 0.313** — because the worksheet `<img class="lcs-worksheet__img">` has **no `width`/`height`/`aspect-ratio`** (verified: 0 of 6 sampled decks have dimensions). The browser can't reserve the image box until the data-URI decodes.
- **TBT ≈ 0** on decks — the inline runtime is light at runtime. All-11-locale `STRINGS_ALL` (~45 KB) is baked into every deck regardless of its single language (bytes, not blocking time).

### 2.5 Activity / Tool pages (mobile 75 / 78) — moderate
Lightest pages (~640 KiB). Activity iframe (`ActivityIframe.tsx`) reserves 420px initial / 320px min and auto-resizes via postMessage — CLS is low (0.003). Tool page mobile FCP 3.1s is the notable item (iframe + chrome). No urgent issue.

### 2.6 Cross-cutting — NextIntl message bundle (~273 KB) shipped to every page
`messages/en.json` is **273 KB**, dominated by **`topicProse` 112 KB + `topicFaq` 70 KB + `topicMeta` 20 KB ≈ 200 KB of topic-only content**. Per `§20.10`, `NextIntlClientProvider` serializes the *entire* locale message set into every page's RSC flight data — so the homepage ships ~200 KB of topic-page strings it never uses. This inflates transfer + hydration (TBT) on every page. High-value but medium-risk to fix (per-route message scoping).

---

## 3. Remediation backlog — mapped to the siteguru PageSpeed framework

The requested reference (siteguru.co "Using PageSpeed Insights suggestions") prioritizes: text compression → browser caching → properly-size images → encode images → preload → defer offscreen images → next-gen formats → prioritize visible content → reduce TTFB → eliminate render-blocking → minify. *(Its one stale claim, "avoid WebP," is ignored — WebP is universally supported and the platform already uses WebP/AVIF correctly; the mascot proves it.)*

| # | Fix | siteguru bucket | Page(s) helped | Effort | Impact | Status |
|---|---|---|---|---|---|---|
| **1** | Deck thumbnails → `next/image` (resized WebP/AVIF) | size + next-gen + offscreen | homepage, topic, **worksheets-hub**, activity card | M | **High** | **DO NOW (safe)** |
| **2** | Hero video `poster` + don't autoload 877 KB on mobile | prioritize visible content | homepage | S–M | **High** | DO NOW (needs poster asset) |
| **3** | Deck worksheet `<img>` `width`/`height` (retrofit + forward) | (CLS) | all non-square decks | M | **High** (deck-A 0.313→~0) | DO NOW (safe, retrofittable) |
| 4 | Worksheets-hub raw `<img>` → `next/image` (subset of #1) | size + next-gen | worksheets-hub | S | High | DO NOW (part of #1) |
| 5 | Scope NextIntl messages per route (drop ~200 KB topic strings from non-topic pages) | reduce payload/TTI | every page | M | Med–High | Recommend (medium-risk) |
| 6 | Deck backdrop JPEG quality 0.85→0.80 (forward-gen) | encode images | future decks | S (×29 apps) | Med | Forward-only |
| 7 | Deck Fredoka `<link rel=preload>` + keep `display=swap` | render-blocking / preload | decks | S (×29) | Low–Med | Forward-only |
| 8 | Per-locale `STRINGS_ALL` (emit deck's locale only, ~45 KB) | reduce payload | future decks | M (×29) | Low–Med | Forward-only |
| 9 | Minify deck inline JS/CSS (forward-gen) | minify | future decks | S (×29) | Low | Forward-only |
| 10 | Immutable long-cache on deck **sub-assets** (thumbnail/og/PDF in versioned dirs) | browser caching | repeat visits, CDN | S | Med | Gated (server-side nginx) |
| 11 | Deck backdrop **extraction** to external cached file | size + caching | all decks | XL | High | **OUT OF SCOPE** (breaks §14.1; 19.5k retrofit) |
| 12 | AVIF in publish pipeline; Cloudflare cache-purge-on-publish; RUM dashboard | next-gen / infra | — | L | Med | Future |

**Already healthy (no action):** `next/font` self-hosted + `display:swap` + `preload`; ISR `revalidate=3600`; server components dominate; CLS ≈ 0 on all Next pages; WebP/AVIF configured; mascot via `next/image`; text compression (gzip via Cloudflare); fast TTFB (109–316ms). The worksheets-hub is missing an explicit `revalidate` (defaults to on-demand) — add `export const revalidate = 3600`.

---

## 4. Expected wins (this commission — fixes #1–#4)

- **Homepage mobile** 64 → ~85+ (thumbnail WebP saves ~400 KB; video poster fixes LCP paint).
- **Worksheets-hub mobile** 69 / LCP 9.0s → ~85+ / <3s (the thumbnail grid is the whole problem).
- **Topic mobile** 82 → ~90.
- **Deck-A (non-square)** 54 → ~75+ (CLS 0.313 → ~0 via width/height).
- Other decks: CLS already fine; FCP improves only with the forward-gen font/encoding items (#6–#9), which help future decks.

## 5. Verification
Re-run `node scripts/lighthouse-audit.js` after each deploy; compare against this baseline (`lighthouse-2026-06-02.json`). Remember Cloudflare's 5-min TTL (`§15.8`) before the edge reflects new bytes. Deck retrofit: `--dry-run` → sample-verify → `--confirm` → idempotency re-run (second pass = 0 changes).
