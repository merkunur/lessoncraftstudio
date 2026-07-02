# SEP rollout recipe — wiring a worksheet app to feed the storybooks

The per-app checklist for Phase-2 (every interactive app generates storybook exercises). Follow it per
app; verify with `node scripts/storybook/prove-app-sep.js --app=<name>` (must PASS) then add the app to
the standing suite (`run-all-sep.js` reads the coverage matrix). The reference implementation is
`REFERENCE APPS/word-guess.html` (letter) + the Phase-0 fixes in `find-and-count.html` (image/density)
and `matching.html` (headless-isolation + font-determinism).

**Golden rule — ADDITIVE only.** Never change the app's existing (printable / interactive / catalog)
output. The SEP hooks are headless-only `window.*` globals + one hidden admin button; the floor
bypass is a spec-only flag. The `baseline-sep.js` golden + the "no existing code path touched" rule
enforce byte-identical day-job output.

## The 3 edits per app

### Edit 1 — the SEP adapter (defines `window.__sepExport` / `window.__sepGenerate`)
- A hidden `<button id="sepExportBtn" class="lcs-admin-only">` (operator manual export) wired to
  `exportStorybookExercise(sepOpts(null,false))`.
- `sepOpts(cropRect, returnPackage)` returns `{ canvas:<app canvas var>, extractBundle:<app's
  extractDeckBundle>, exerciseObjects:<predicate>, family:'<A|C|E|F|B|D>', cropRect, returnPackage,
  noDownload:returnPackage }` (+ `numeric:true` for number-fill, `tapOnly:true` for dense-C).
- `window.__sepGenerate(spec)` — the headless generator (below).
- Bump `catalog-export.js?v=N`.

**WHERE to place it — this is load-bearing.** The hook must be DEFINED even if the app's init hangs
headless. Two cases:
- If the app's canvas + `extractDeckBundle` + the generate fn are at **top-level script scope**, place
  the adapter IIFE at top-level (end of the main `<script>`).
- If they're inside the DOMContentLoaded/`init` closure (common — e.g. matching), place the adapter
  **early inside that closure, right after the canvas is created, BEFORE any `await loadThemes()` /
  `BulletproofLoader` / `generateInitialWorksheet` that can hang headless.** (matching:~4806.)

### Edit 2 — `extractDeckBundle` field emission
Zero where the family's fields already exist (most apps). Where a field the mapper reads is missing,
add an **emit-only** branch that derives it from already-computed generation state and appends to the
returned bundle (nothing downstream reads it but the mapper → output unchanged).

### Edit 3 — floor-lowering (only if the app's floor > 1 or its exercise is too dense)
A spec-only bypass, NEVER a changed UI default:
```js
var _sbFloor = window.__sbAllowSmall ? <min> : <NORMAL_FLOOR>;   // guard the existing validation
```
`__sepGenerate` sets `window.__sbAllowSmall = true` + writes the small value. The operator UI never
sets the flag → the day-job floor is unchanged. (find-and-count: `rows < _sbFloor`.)

## `window.__sepGenerate(spec)` — the headless generator (the hard-won pattern)

`spec = {app, family, params:{theme,…}, vocabKeys?, seed, locale, exId}`. Requirements: **no human,
seed-reproducible, locale-parameterized.** The robust shape (learned Phase 0):

1. **Locale:** `window.currentLocale = spec.locale; try { currentLocale = spec.locale; } catch(e){}`.
2. **DIRECT-SEED, do NOT call the UI-init `generateInitialWorksheet`** — it waits on a theme dropdown
   (`checkThemes`) that never populates headless. Instead: `fetch('/api/images?theme=…&locale=…')`
   into the app's pool var, seed the selection + set the generation inputs directly, then call the
   **core** `generateWorksheet`.
3. **Headless isolation (apps whose init runs a concurrent `generateInitialWorksheet`):** detect
   `var __sbHeadless = /[?&]__sbHeadless/.test(location.search)` in the early adapter and, after
   defining the hooks, `if (__sbHeadless) return;` from init — so the init's own generate never runs
   concurrently and consumes the shared seeded `Math.random` (→ perturbed sequence → non-repro).
   `sep-generate.js` loads the app with `?__sbHeadless=1`.
4. **Force-load fonts BEFORE generating (apps that lay out live-measured TEXT):** worksheet fonts load
   from Google Fonts with variable timing; measuring text before vs after a lazy load gives
   fallback-vs-webfont metrics (±10px width jitter → non-repro). `await Promise.all(['Baloo 2',
   'Fredoka','Nunito','Lexend Deca','Quicksand'].flatMap(f => [document.fonts.load('400 24px "'+f+'"'),
   document.fonts.load('700 24px "'+f+'"')]).map(p=>p.catch(()=>{}))); await document.fonts.ready;`
5. **Seed:** `var _r = Math.random; Math.random = window.LCSCatalogExport._sepRng(spec.seed||1);` and
   restore in `finally`.
6. **Fire + reliably poll (retry):** call `generateWorksheet()` and poll the canvas for the family's
   marker objects **+ `canvas.problemsData`**; if not ready in ~15s, **re-seed a fresh `_sepRng` and
   retry (≤3×)** — re-seeding keeps the result deterministic regardless of which attempt succeeds.
7. `return window.LCSCatalogExport.exportStorybookExercise(sepOpts(null, true));`

## Family notes

- **A (letter-fill):** existing mapper. **number-fill** → `family:'A', numeric:true` (digit palette;
  0 player/validator change). **choice-tap** → `family:'C'` choice branch (`options→targets`, tap-only).
- **C (grid-tap/count):** if the legend count-blanks are too small to clear the 16px density gate at
  zone scale (crop-height bound — find-and-count), set `tapOnly:true` → targets only, crop = grid,
  empty countBlanks (a clean tap-to-find exercise; SEP-C supports it).
- **E (connect):** the mapper derives the connection anchor from the STABLE rect (inner edge), never
  the jittery fabric `anchorX` (±1px → non-repro). Force-load fonts (item widths are text-measured).
- **F (drag-drop):** existing mapper; verify the bundle shape.
- **B (puzzle-drag) / D (bar-chart):** NEW families — see the plan (Phase 5): new mapper in
  `catalog-export.js` + `_sepDefaultCrop` arm + `_sepLocales` prompt + player `familyB/D` branch +
  validator whitelist. No app-HTML data change (grid/path/chart fields already emitted).

## Density (the SEP gate)

`realPx ≈ zoneScale × sourcePx`, `zoneScale = min(zone.w×0.35/crop.w, zone.h×0.35/crop.h)`. Hard floor
16px, warn 44px. Levers, in order: (1) miniaturize (smaller grid via the floor bypass → smaller crop);
(2) drop tiny non-essential elements (`tapOnly` for C count-blanks); (3) a wider authored zone (the
proof story uses 920×860). A structurally-locked-small grid (treasure-hunt 5×5, sudoku 4×4) is a
FEATURE — it guarantees the density budget.

## Verify (definition of per-app done)

```
node scripts/storybook/prove-app-sep.js --app=<name>        # generate→place→validate→qa→seed-repro→2-locale
node scripts/storybook/baseline-sep.js --capture --app=<name>   # once green, capture the golden
```
Then set the app's matrix row `status: "passing"`. `run-all-sep.js` (npm `test:storybook`) aggregates.
