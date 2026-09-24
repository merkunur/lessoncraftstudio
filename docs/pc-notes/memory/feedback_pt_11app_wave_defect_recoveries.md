---
name: pt-11app-wave-defect-recoveries
description: Three new defect-class recoveries surfaced by pt 11-app wave 2026-05-19 (shadow-match/bingo/picture-sort/missing-pieces/odd-one-out/sudoku/picture-path/find-and-count/find-objects/crossword/treasure-hunt). Reusable patterns for future waves.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 77af5535-82c3-434a-89d6-cddd8b7b1e76
---

## Three recovery patterns from the pt 11-app wave (commit 0db3090e3)

**Why:** Each defect surfaced as a HALT at `publish-bulk --dry-run` or `--confirm`. Re-diagnosing per-wave costs operator-attention. These patterns close the §A.14.8 doctrine for these specific classes.

**How to apply:** at start of any wave, after §A.14.8 step 1-5 audit, look for these signatures in dry-run output.

### 1. App's `canvas.lcsLocalizedTitle` baked English (LOCALE_RESIDUE_DETECTED, `isLocalized: true` claim is wrong)

Signature: `seo_trace.title.typeName.value` = English typeName despite `manifest.language != en`. Often paired with `seo_trace.description.instruction.isLocalized: false` (canvas.lcsLocalizedInstruction not assigned at gen time).

Root cause: app HTML's locale-init runs before the multilingual default-titles block executes, so `currentLocale` is `undefined` and `currentLocale || 'en'` falls back to 'en'. See `REFERENCE APPS/bingo.html` ~line 1796.

Salvage script template: [[rewrite-bingo-pt-typename]] at `scripts/publish-cli/rewrite-bingo-pt-typename.js`. Pattern:
- Look up correct localized typeName from REFERENCE APPS/<app>.html `defaultTitles.<locale>` (NOT topics-taxonomy — these are app-specific display titles).
- Substitute in `manifest.seo_trace.title.typeName.value` + `description.typeName.value`.
- Substitute deck.html `<title>` + `<meta description>` + JSON-LD `name` via 4 context-anchored regex patterns:
  - `"<Type> Worksheet"` → `"<TypePt> Atividade"` (or locale equivalent)
  - `"Free interactive <Type> Worksheet"` → locale-equivalent description prefix
  - `"Print or play online"` → locale-equivalent tail
  - bare `"<Type>"` for og:title / twitter:title
- Patch `seo_trace.description.instruction` to `{value: <pt-instruction>, isLocalized: true}` from the same `defaultDescriptions.<locale>` map.

### 2. App's variant_id generator emits constant value across entire wave (TITLE_NON_UNIQUE)

Signature: 39+ ZIPs of same (typeName, modeName, themeName, level) collide on titleHash. publish-cli auto-suffixes slug with `-2` but `@@unique([language, titleHash])` still rejects.

Root cause: app's variant_id seed isn't deck-unique (e.g., shadow-match emits `5d83` for every deck in a wave).

Recovery: re-stage the failed ZIPs only, then run salvage template `scripts/publish-cli/rewrite-shadow-match-make-whole-pt-variant.js`:
1. Move succeeded ZIPs out of `publish-inbound/` to archive (use `_failures/` dir as deck-id source-of-truth for what to keep).
2. For each failed ZIP: new variant_id = `sha1(deck_id).slice(0,4)` (deterministic + unique per deck-timestamp).
3. Substitute in manifest.variant_id + deck.html `Set OLD` → `Set NEW` + `-OLD/` → `-NEW/` (slug + JSON-LD + og:url) + `-OLD"` (defensive double-quote variant).
4. Re-run `publish-bulk --confirm` with a new --batch-id.

Authoring-side fix queued separately per §A.13.5 Shape A (operator's existing gen hours preserved).

### 3. Missing seoMeta.themeName despite valid manifest.theme — use republish-seo, NOT rewrite-deck-html-title.js

Signature: published deck.html has title shape `"... — <Level> — Set XXXX"` with NO theme em-dash segment. `seo_trace.title.themeName: null` despite `manifest.theme: "<axis-key>"` populated.

**Do NOT use rewrite-deck-html-title.js for this shape.** It targets the 3-segment title (worksheet — X — Set) by REPLACING segment X with theme, but with `__EDUCATIONAL_LEVEL_LOCALIZED__` already substituted to "1.º ano", X is the level. The script clobbers the level component.

Use `republish-seo.js` instead:
```
node scripts/publish-cli/index.js republish-seo --language pt --slug <slug> --confirm
```
republish-seo PREFERS taxonomy over trace for themeName (per `republish-seo.js:236-252`): reads `manifest.theme` → looks up `axes.theme.<key>.name.<locale>` → buildSeoHead emits correctly. Loop the 99 affected slugs via shell.

### Image-SEO retrofit at full-catalog scale

`regenerate-og-images.js --locales=pt` walked 3,245 pt decks in 313s wall-clock (~100ms/deck) on Hetzner. Idempotent over already-good decks — re-derives same Sharp composite + XMP packet from current thumbnail + manifest. Safe to run on full locale after any wave; symlink-farm subsetting fails (script uses `lstatSync` which skips symlinks at `walkDecks()` line 53-64).

Cross-references: §A.14.8 (publish-wave audit), §15.17 (salvage scripts), §17.8.16 (republish-seo retrofit), §17.8.19 (image-SEO signal stack), §A.14.10 (image-SEO retrofit infra).
