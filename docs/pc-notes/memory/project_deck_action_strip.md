---
name: project_deck_action_strip
description: "Deck action strip [Download PDF][Answer key][Make your own] baked into every interactive deck.html + the 'Make your own' hero button on every deck landing (2026-09-20) — architecture, gates, traps"
metadata: 
  node_type: memory
  type: project
  originSessionId: d3dc176e-14f0-43b6-98a2-dd7b5eb45eb3
  modified: 2026-09-20T21:45:11.076Z
---

# Deck action strip + landing "Make your own" (2026-09-20, commit `93a416b9`)

**Operator:** decks without a landing had no PDF / answer-key buttons on the page ("not enough to have them only on the cards"); every generator deck AND landing needs a "Make your own" button opening the generator's landing in the page's language.

**Shape:** `<nav id="lcs-deck-actions">` directly under `.lcs-bar` (anchor `<div class="lcs-worksheet-wrap">`, uniform across all 29 apps), three Direction-A outline pills (teal ×2, coral for the maker). Landing hero gets a 4th `btn btn-make`. Strings = `deckActions.{downloadPdf,answerKey,makeYourOwn,ariaLabel}` ×11 in `frontend/messages` ([NSR-FLAG] sv/da/no/fi on makeYourOwn/ariaLabel).

**SoT = `scripts/lib/deck-actions.js`** (site-chrome rule: markup + CSS + strings + maker-slug + dlHref in ONE module; no emitter in catalog-export.js; 0 app edits). Consumers: `scripts/publish-cli/inject-deck-actions.js` (retrofit + publish-wave **STEP 6d** forward path) and `scripts/seo-landing/render-landing-html.js` (+ the Next fallback route via `getTranslations('deckActions')`).

**Load-bearing decisions:**
- PDF/answer-key hrefs = the METERED proxy `/api/quota/dl?loc&slug&kind` (same as landings) — a raw file link bypasses the free tier's download allowance ([[feedback_tier_truth_before_marketing_copy]]).
- Slug for the proxy = the `<slug>-printable.pdf` stem ON DISK, never the symlink (~8.5k alias symlinks share one dir); the injector dedupes on `realpathSync`.
- Answer-key button only if `<slug>-answer-key.pdf` exists (proxy 404s otherwise); maker button only if `maker-content/<loc>.json[app].slug` exists (`picture-trail`→`picture-path` alias); printable-only decks skipped (and a stray strip removed).
- ONE sentinel pair with the `<style>` INSIDE the block → `--remove` is a single non-greedy replace; `--rewrite` proven 5× byte-idempotent on a REAL production deck (`scripts/publish-cli/fixtures/deck-actions/`, `.gitattributes -text` so Windows checkouts keep the bytes). No `.bak` files (server-disk rule).
- Three hide states MEASURED in a browser: `@media print`, `body.lcs-embedded` (landing iframe + third-party embeds; keeps the embed chrome=200 height math), landscape-compact (`elementFromPoint(400,8)` = `.lcs-worksheet`).

**Measured 2026-09-20 (LIVE):** 58,321 symlinks walked → **39,113 physical interactive decks injected**, 7,979 aliases (shared files), 11,228 printable-only skipped, 1 failure = the known dangling `pt/chart-count` symlink; `verify-deck-actions.js --sample=4` 11,330/11,330 clean ×11 locales; all 319 (=29×11) maker URLs 200; deploy regenerated the 30k landings with the 4th button; deck-in-landing-iframe strip hidden (verified live, fi).

**Gates:** `deck-actions.test.js` (deploy.sh; 238 asserts) · `verify-deck-actions.js --poison` (22 mutations caught + control ×11×3) · corpus walk `verify-deck-actions.js --locale=xx [--sample=N]` reads the filesystem as truth (never the strip's own text).

**Traps:** the CSS block names `.lcs-da-btn--make` too — scope "no maker anchor" checks to the `<nav>` markup, not the block; `resize_page` in chrome-devtools does NOT set the viewport (innerWidth stayed 501) — use `emulate` `360x740x2,mobile,touch`; Git Bash mangles `/c/Users/...` paths passed to `node -e` — write a script file; Python is not installed on the PC.
