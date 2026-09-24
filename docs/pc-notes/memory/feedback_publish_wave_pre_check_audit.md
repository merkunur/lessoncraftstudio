---
name: Pre-publish-wave audit (recurring defect prevention)
description: When operator hands off a new deck wave for publish, ALWAYS run the 5-step audit (4 source-side + Step 2b operator-ZIP audit) BEFORE publish-bulk --confirm. Three defect classes have recurred multiple times; CLAUDE.md §A.14.8 captures the canonical doctrine with cross-references to recovery scripts.
type: feedback
originSessionId: 3b1fe82c-dd2e-46a2-a31d-ce9e0a634f52
---
ALWAYS run the pre-publish-wave audit BEFORE `publish-bulk --confirm` on any new operator-staged deck wave. Three defect classes recur and have wasted operator-attention re-diagnosing each time; all have canonical solutions documented.

**Why:** operator-attention is the load-bearing variable across the project's runway. Re-diagnosing these from scratch costs ~1-2 hours of CC + operator round-trips per wave. Pre-checking takes ~5 minutes. Operator surfaced this frustration directly: "these are repeating issues. Whenever I want you to publish a new created worksheet set they appear again and again and every time you try to invent the wheel again and again."

**How to apply:** at the START of any commission involving `publish-bulk`, before any other work, run the 4-step checklist from CLAUDE.md §A.14.8:

1. **theme-emit audit** — `unzip -p <zip> manifest.json | jq .theme` per app sample; non-null expected when operator selected a theme. If null → Shape A fix per §A.13.5 OR salvage via `scripts/publish-cli/rewrite-manifest-theme.js` per §15.17.

2. **seoMeta audit (source app HTML)** — each app's `extractDeckBundle()` should populate `bundle.seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName()` helper. Missing → deck.html `<title>` lacks theme keyword. Add helper call per `0e5f1560` canonical pattern.

2b. **bundle-vs-current-app reconciliation (operator ZIP audit)** — Step 2 audits the SOURCE app HTML; Step 2b audits the OPERATOR-GENERATED ZIP bundle for the same surface. `unzip -p <zip> deck.html | grep -oE 'seoMeta":\{[^}]*'`. Absent OR `themeName: null` for a manifest-themed deck → halt; operator's bundle predates the seoMeta-population fix even though source app is current (browser-cache + service-worker staleness on operator's PC). Operator must hard-refresh production worksheet generator (Ctrl+Shift+R) and regenerate before publishing. If unblocking is operationally urgent, post-publish recovery via `scripts/publish-cli/rewrite-deck-html-title.js` (commission `ca5d4aa0` — catalog-wide precedent: ~1,500 logical decks rewritten across 3,274 walker visits).

3. **canonical-host check** — `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE` MUST be `https://www.lessoncraftstudio.com` (www form). Apex form breaks embed iframe auto-resize via apex→www 301 redirect → postMessage URL mismatch → iframe stays at default aspect-ratio:800/1400 with whitespace gap. If defective → fix constant + retrofit existing decks via `scripts/publish-cli/rewrite-canonical-host.js`.

4. **post-publish spot-check** — curl 1 sample deck per affected app: title contains theme word; `var url=` lines are www form; iframe auto-resize works in actual browser embed.

Recovery scripts (canonical, do NOT reinvent):
- `scripts/publish-cli/rewrite-manifest-theme.js` — strip+rewrite manifest.theme from in-bundle image content (§15.17)
- `scripts/publish-cli/rewrite-canonical-host.js` — apex→www URL replacement in deck.html (§A.10 amendment)
- `scripts/publish-cli/rewrite-deck-html-title.js` — in-place patch of `<title>`/`<meta description>`/Schema.org JSON-LD when bundles lack `seoMeta.themeName` (commission `ca5d4aa0`). Reads sibling `manifest.json` as canonical theme signal (stable across all 29 apps regardless of per-app bundle shape variation: imagePlacements vs top-level vs schema-v3). Locale-aware `forWord` lookup with English fallback. Idempotent.
- `LCSCatalogExport.deriveThemeName(opts)` — shared helper for `extractDeckBundle()` seoMeta population

Past fix commits (cite in any related work):
- `5110d6e0` math-worksheet + prepositions defect-A (theme=null hardcoded at LCSCatalogExport.export)
- `0e5f1560` 28-app sweep adding seoMeta.themeName + 3 more defect-A apps
- `515d9092` word-scramble Shape A (theme:null hardcoded; same defect class as 5110d6e0)
- `6fb6ee3d` CANONICAL_URL_BASE → www + rewrite-canonical-host.js retrofit
- `ca5d4aa0` rewrite-deck-html-title.js — catalog-wide post-publish title recovery (~1,500 logical decks)
- `e6c28b4b` doctrine: §A.14.8 Step 2b for operator-ZIP bundle audit
- `353c1f56` (clamp+attribution; later reverted at `6bbf6a4c`) — DON'T pursue clamp-style fixes for embed gap; the apex/www fix at `6fb6ee3d` is the correct solution

CLAUDE.md cross-references for the canonical doctrine: §A.10 (canonical-host + embed auto-resize), §A.13.5 (Shape A discipline), §A.13.7 (first-publish-verification cadence), §A.14.8 (this checklist), §15.17 (salvage scripts), §17.8.5 (slug derivation).

---

**Native-speaker review queue (§17.5.1 NSR-flag pattern):**

- Wordsearch language-mix instruction matrix (commit `d0cf97a3` + audit follow-up): the `GRID_LANG_NAMES_IN` 11×11 demonym matrix + 11 `mixDescription` instruction templates in `REFERENCE APPS/wordsearch.html: createHeaderGroup`. Best-effort web-verified (web-search dictionaries + Wikipedia). Residual uncertainty: sv/da/no/fi rows + the sv/da/no/fi columns of other locales' rows (Claude confidence weaker per §17.5.1). Specific items flagged:
  - Finnish translative case naturalness for K-3 audience
  - Norwegian "nederlandsk" vs "hollandsk" register choice for K-3
  - Danish "hollandsk" register choice for K-3
  - All Nordic demonyms in non-Nordic clue locales' rows (e.g., sv→fi=ruotsiksi, no→da=norsk, etc)
  - Verb imperative forms ("Hitta" sv, "Find" da, "Finn" no, "Etsi" fi) for K-3 child-addressed register
