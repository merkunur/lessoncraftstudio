---
name: dual-themeselect-anti-pattern
description: "8 of 29 worksheet-generator apps have dual theme pickers (worksheetThemeSelect = worksheet's \"Generate from Theme\" + themeSelect = image-dictionary filter). buildCatalogManifestSettings MUST read worksheetThemeSelect, not themeSelect — the bare themeSelect is a stagnant filter that defaults to the dictionary state."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 77af5535-82c3-434a-89d6-cddd8b7b1e76
---

## The dual-themeSelect anti-pattern (CLAUDE.md §A.13.5 Shape A)

**Why:** 8 apps have BOTH a `worksheetThemeSelect` (operator's "Generate from Theme" picker for the worksheet content) AND a separate `themeSelect` (image-library dictionary browser filter). The operator picks themes per-deck via `worksheetThemeSelect`; the `themeSelect` filter is independent and usually stagnant. When `buildCatalogManifestSettings` reads `themeSelect.value` for `manifest.theme`, it captures the stagnant dictionary state, not the operator's per-deck theme. Result: `manifest.theme: null` (or constant) across an entire wave even when operator selected distinct themes; slug derivation drops the theme component; URL SEO degrades.

**How to apply:**

- When adding a NEW dual-picker app, model after the canonical fixed pattern (e.g., `REFERENCE APPS/sudoku.html` line 3750 + post-fix 4595).
- When reviewing an EXISTING app, grep `var theme = (typeof themeSelect !==` — if the file ALSO has `<select id="worksheetThemeSelect">`, the read is wrong. The correct pattern is `document.getElementById('worksheetThemeSelect')` with skip values `['', 'all', 'none']`. Mirror what `LCSCatalogExport.deriveThemeName({selectEl: worksheetThemeSelect})` does for `seoMeta.themeName` — the two paths MUST agree.

**Canonical fix shape:**
```js
var _wtEl = document.getElementById('worksheetThemeSelect');
var theme = (_wtEl && _wtEl.value && _wtEl.value !== 'all' && _wtEl.value !== '')
    ? _wtEl.value : null;
```

**The 8 dual-picker apps + post-fix state (commit dbeb1058):**
- chart-count, code-addition, crossword, sudoku, treasure-hunt — fixed in `dbeb1058`
- pattern-train, pattern-worksheet, wordsearch — fixed previously (precedent)

Single-picker apps (the other 21) have only `themeSelect` and the `themeSelect` read IS correct for them.

**Related defects fixed in same commit:**

1. **treasure-hunt seoMeta.themeName** hardcoded `null` from stale 0e5f1560 rationale. Now calls `deriveThemeName({selectEl: worksheetThemeSelect})` like sudoku/crossword/shadow-match.

2. **bingo createHeaderGroup never invoked.** Defined at line 1792, side-effect bakes `canvas.lcsLocalizedTitle` + `canvas.lcsLocalizedInstruction` from `defaultTitles[currentLang]` / `defaultDescriptions[currentLang]`. Bingo's "header" is the card layout itself (not a separate header strip per shadow-match), so the function was orphaned. Fix: call `createHeaderGroup(worksheetCanvas)` at top of `handleExportToCatalog` — returned objects discarded, side-effect bakes localized properties. **Pattern for future apps:** if `canvas.lcsLocalizedTitle`/`Instruction` are populated only as a side-effect of a header-rendering function, the caller MUST invoke that function before `extractDeckBundle` runs.

3. **shadow-match constant variant_id.** `deriveVariantId.contentKeys` array (in `REFERENCE TRANSLATIONS/catalog-export.js`) didn't list shadow-match's per-deck content field `pairs`. Primary-path `contentObj` collapsed to `{mode:'makeItWhole'}` → constant hash across batch. Fix: add `'pairs'` to contentKeys. Same defect-class as `31662053` (picture-sort + picture-path).

**For future app reviews:** every app's `deriveVariantId` content path must be inspectable via the contentKeys array. When porting a new app or extending an existing one with a new content-bearing field, register that field name in `catalog-export.js: deriveVariantId.contentKeys` so the primary-path produces unique hashes per deck.

Empirical anchor: pt 11-app wave 2026-05-19 (commit `0db3090e3`) salvaged in-flight; authoring-side fix shipped as `dbeb1058`.

## seoMeta.themeName emit-site is a SECOND surface — must also be audited (CLAUDE.md §A.13.9 two-defect-pattern)

`dbeb1058` closed the dual-themeSelect anti-pattern at `buildCatalogManifestSettings` for 5 apps — but per the IT math-cluster wave 2026-05-19, the SAME dual-picker anti-pattern surfaces a SECOND time at the parallel `seoMeta.themeName` emit-site inside `extractDeckBundle()`. Two emit-sites must agree per the canonical pattern; fixing only one ships decks where `manifest.theme = X` but title says theme-Y. 196 of 1033 IT ZIPs (19%) had the defect — discovered at pre-publish audit, salvaged via `scripts/publish-cli/rewrite-italian-wave-themename.js` + closed at source via commit `41da4ce2`.

**code-addition.html** (line 4711-4713 before `41da4ce2`):
```js
themeName: ... deriveThemeName({ selectEl: document.getElementById('themeSelect') })  // wrong: dictionary filter
```
Fix:
```js
themeName: ... deriveThemeName({ selectEl: document.getElementById('worksheetThemeSelect') })
```

**more-less.html** (line 5245-5246 before `41da4ce2`): mode-blind `themeWorksheet || ccThemeWorksheet` — always picks `themeWorksheet` first. Fix is mode-aware IIFE mirroring `buildCatalogManifestSettings` line 6086-6107:
```js
themeName: (function () {
  if (!(window.LCSCatalogExport && window.LCSCatalogExport.deriveThemeName)) return null;
  var compMode = (typeof comparisonModeSelect !== 'undefined' && comparisonModeSelect)
    ? comparisonModeSelect.value : null;
  var selEl = (compMode === 'check-cross')
    ? document.getElementById('ccThemeWorksheet')
    : document.getElementById('themeWorksheet');
  return window.LCSCatalogExport.deriveThemeName({ selectEl: selEl });
})(),
```

**For future dual-picker app reviews:** grep BOTH `themeName.*deriveThemeName.*selectEl` AND `buildCatalogManifestSettings` — they must read the same element. The two paths agreeing is the discipline; checking only one path post-fix leaves a latent §A.13.9 two-defect-pattern surface that fires on a future operator wave.

**Possibly-latent apps that should be audited the same way** (other dual-picker apps mentioned in `dbeb1058`): chart-count, crossword, sudoku, treasure-hunt, pattern-train, pattern-worksheet, wordsearch. Treasure-hunt's seoMeta.themeName was explicitly addressed in `dbeb1058` per the commit body; the others should be grepped for `selectEl: document.getElementById('themeSelect')` to confirm.

Empirical anchor: IT math-cluster wave 2026-05-19 (commit `41da4ce2`). Salvage script `scripts/publish-cli/rewrite-italian-wave-themename.js` operates on pre-publish ZIPs (not deployed `/var/www/lcs-media/decks/`) — distinct from `rewrite-deck-html-theme-name-pt.js` which retrofits post-publish.

## window.translations export ReferenceError (translations-code-addition.js line 2234)

Companion defect surfaced during IT math-cluster wave 2026-05-19 audit: code-addition's translations file declared `const CODE_ADDITION_TRANSLATIONS = {...}` at line 11 but then tried `window.translations = translations` at line 2234 (an attempted §A.13.5 Shape A export pattern that referenced an undefined `translations` global — the file's actual top-level object is `CODE_ADDITION_TRANSLATIONS`).

Silent failure mode: the ReferenceError at line 2234 stops the rest of the script but doesn't surface visibly because previous `console.log` calls succeeded. window.translations remains undefined → translations-shared.js merge sees `typeof window.translations !== 'object'` → warns + skips merge → window.translations.it.<seoKey> never gets populated from shared → `_ct(key, enFallback)` falls through to enFallback for it/fr/pt/es/nl/sv/da/no/fi → every code-addition deck.html in non-en locales bakes English SEO words (`Worksheet`, `Free interactive`, `for`, `Print or play online`) into seoMeta + manifest.seo_trace.

Downstream: publish-cli §17.8.17 invariant 6 LOCALE_RESIDUE_DETECTED predicate halts 198/198 code-addition IT decks at dry-run. Salvage script extension required to fix the already-generated wave; authoring fix at line 2234 prevents future regenerations.

**Fix**: `window.translations = CODE_ADDITION_TRANSLATIONS` (use the file's actual top-level identifier).

**For future per-app translations file reviews**: grep `window.translations = ` — the right-hand side must match the file's top-level `const <NAME> = {...}` declaration. Several per-app translation files use `translations` as the top-level (canonical pattern, e.g., `translations-addition-complete.js` line 14: `const translations = {...}`) — others use uppercase per-app names (`CODE_ADDITION_TRANSLATIONS`, etc.). The export line must reference the same identifier the file declares.

Empirical anchor: commit `b666aa17` (IT math-cluster wave salvage + fix).
