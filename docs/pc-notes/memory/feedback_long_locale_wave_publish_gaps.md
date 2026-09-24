---
name: long-locale-wave-publish-gaps
description: publish-wave.js misses two steps for non-English (wordy) deck waves — description banding + alt-text retrofit; how to publish them cleanly
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ad8b4c15-5463-4aec-bce5-76f302e4a675
---

Publishing a non-English deck wave (fr/it/pt/de/nl/sv/da/no/fi) via the standard `publish-wave.js` path hits TWO gaps the orchestrator does NOT handle. Discovered publishing the 2,986-deck French wave 2026-05-30. **Both must be run manually around the wave until `publish-wave.js` is amended.**

**Gap 1 — description-length HALT for wordy locales.** The app-gen path bakes the LEGACY unbanded meta description with the `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder *by design* (`catalog-export.js` `levelProvided=false` branch); the 120-170 banding is the retrofit's job (`republish-seo` via `build-seo-head.bandedDescription`). The forward path (`substitute.js`) only fills the placeholder, so French/etc. descriptions overflow the 170-char HALT (`seo-reconciliation.js` Predicate 8 / Commission 16b). `republish-seo` is post-publish, but the gate blocks the publish. **Fix: `scripts/publish-cli/preband-staged-descriptions.js <folder>`** (committed `58e4aaca`) — pre-publish, re-emits the SEO `<head>` via `republish-seo.buildSeoOpts` + `build-seo-head` (banded desc + catalog title) PRESERVING `__CANONICAL_URL__`. It also runs a **title-disambiguation pass**: the catalog title engine drops the per-deck `variant_id`, so same-(type,theme,level) siblings collide (themeless cryptograms → one title; etc.) — title-uniqueness is a HALT predicate. Any title colliding within-batch OR vs an already-published same-language title gets `variant_id` fed to `buildSeoOpts.disambiguator`. The within-batch collisions DON'T show in `publish-bulk --dry-run` (findExistingByTitleHash only sees already-INSERTed rows); verify with the script's own dup-title report instead. Result on fr: desc errors 1553→0, titles 2986/2986 unique.

**Gap 2 — empty body alt-text / aria-label.** The 29 worksheet apps emit `<img id="lcs-worksheet-img" alt="">` + `<main id="lcs-app">` with no role/aria-label + empty deckend-thumb alts. en/es/pt/it decks have rich alts only because the "alt-text SEO commission 2026-05-27" retrofit was applied; the apps were never updated. So a fresh wave audits with MAIN_WORKSHEET_ALT_EMPTY / APP_ARIA_LABEL_NO_ROLE / DECKEND_THUMB_EMPTY_ALT (fr: 1236/1141/1141). **Fix: `scripts/publish-cli/rewrite-deck-html-alt-text.js --confirm --locales=<loc>`** — populates all four (R1-R4), idempotent, re-runs substitute.apply; preserves the hreflang block. fr re-audit after: 3013/3015 clean.

**Canonical clean publish sequence for a non-EN wave (run on Hetzner, env loaded):**
1. Stage ZIPs flat into `publish-inbound/<wave>/` (publish-bulk reads non-recursively — flatten any per-app subfolders).
2. Pre-flight `rewrite-manifest-theme.js <folder> --dry-run`; salvage real theme-emit defects (apply mode). NOTE: legitimately-themeless apps (cryptogram = text decode, no images) HALT as "unparseable" — split them out and publish with `--skip-preflight` (publish-bulk's §15.16 legitimate-null path passes them).
3. **`preband-staged-descriptions.js <folder>`** (Gap 1) — dry-run then apply. Verify dup-titles=0, desc all 120-170.
4. `publish-bulk <folder> --confirm`.
5. `regenerate-og-images.js --locales=<loc>` (two-column composite + XMP = Google thumbnail).
6. **`rewrite-deck-html-alt-text.js --confirm --locales=<loc>`** (Gap 2).
7. `populate-and-inject-hreflang.js --confirm --locales=en,de,es,pt,it,nl,sv,da,no,fi,<loc>` (FULL locale list — passing only `<loc>` is a no-op for cross-locale siblings; only themeless+variantless decks get cross-locale hreflang in v1).
8. `audit-deck-html.js --locales=<loc>` → expect ~100% clean (a handful of TITLE_LENGTH_TOO_LONG WARNs from very long theme names like "desserts et sucreries" is acceptable/cosmetic).

**STATUS — FOLDED INTO publish-wave.js (commit `b5da0965`, 2026-05-30).** `publish-wave.js` is now a 7-step one-command path: STEP 0 pre-flight runs `--themeless-ok --fail-on-rewrite` (cryptogram no longer false-halts → new `skip-themeless` class; recoverable theme defects HALT so the operator salvages before preband); STEP 1 PREBAND + STEP 4 ALT-TEXT folded in; STEP 5 HREFLANG always uses the full 11-locale set. New flags: `--skip-preband` / `--skip-alt-text` / `--no-db-check`. The manual sequence below is now just the orchestrator's internals (kept for reference / when running steps individually). `rewrite-manifest-theme.js` gained `--themeless-ok` + `--fail-on-rewrite`. CLAUDE.md §21.2 updated to the 7-step flow. **So: for it/de/nl/sv/da/no/fi waves, just `publish-wave.js <folder> --locales=<loc> --confirm` (flatten subfolders first; if a real theme-emit defect halts pre-flight, run `rewrite-manifest-theme.js <folder> --themeless-ok` to salvage, then re-run).** Relevant CLAUDE.md: §21.2, §A.14.8, §17.8.5, §17.8.17, §15.16, §15.17.
