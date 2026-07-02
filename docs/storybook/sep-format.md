# Storybook Exercise Package (SEP) — format `sep-1`

The bridge between the 29 worksheet-generator apps and the storybook player.
A SEP is a **transparent-alpha visual + a machine-readable interaction
descriptor**; the player's `sb-mod-worksheet-exercise` module mounts it as a
first-class page interaction (check-mode, reduced-motion-aware, ≥44px
inflated hit areas). **The descriptor — not the deck runtime — is the
contract.**

Working fixtures (hand-authored reference implementations the ingestion is
proven against): `mini tools/stories/pips-picnic/exercises/{word-cat,fruit-board}`
+ generator `scripts/storybook/gen-sep-fixtures.js`.

## 1. Package layout

Transport = one ZIP per exercise (JSZip + `triggerDownload`, the
catalog-export precedent). The story pipeline UNZIPS it into
`stories/<storyId>/exercises/<exId>/`; the player fetches plain files:

```
descriptor.json
visual@2x.webp            alpha WebP (PNG fallback: see visual.format)
assets/reveal-NN.webp     Family F palette-tile art
```

## 2. descriptor.json

```jsonc
{
  "formatVersion": "sep-1",
  "appType": "word-guess",            // §14.10 canonical app name
  "family": "A",                      // v1: "A" | "F"  (E next, then C; B/D deferred)
  "sourceBundleVersion": "13.2.0",    // extractDeckBundle bundleVersion passthrough
  "createdAt": "…Z",
  "meta": { "exerciseTypeSlug", "exerciseMode", "theme", "ageBand", "contentLanguage" },
  "page": { "width", "height" },      // provenance (source page space)
  "crop": { "x", "y", "w", "h", "pad" },  // the exported region, page space
  "visual": { "file", "format": "webp"|"png", "scale": 2, "width", "height" },
                                      // width/height MUST equal crop.w*scale × crop.h*scale
  "input": {
    "policy": "tap-palette"|"drag",   // (E: "connect", C: "tap" — future)
    "tapPalette": { "case": "upper"|"lower", "letters": ["A","B",…], "distractorCount": 3 }
  },
  "elements": { … per family, below },
  "imageRefs": {},                    // RESERVED — the image-reference.js variants shape
  "loadingMode": "reference",
  "locales": { "<loc>": { "prompt", "success", "tryAgain", "hint"|null } },
                                      // coverage validated against the HOST STORY's locales
  "audio": { "speakPromptOnMount": bool, "perElement": "letter"|"word"|null }
}
```

**Rect normalization (load-bearing): EVERY rect is top-left convention,
rebased to CROP space, normalized AT EXPORT.** word-guess's bundle emits
center-based rects — its mapper converts; grid-match/matching are already
top-left. Ingestion is a dumb `%`-overlay renderer (`left = x/crop.w*100%`).
**Attribution is excluded from the crop** (a story page is not a worksheet).

### Family A — tap-letter fill-in
```jsonc
"elements": { "slots": [
  { "id", "problemIndex", "wordIndex", "letterIndex",
    "expected": "C",                  // single char
    "rect": { "x","y","w","h" } }     // crop space
] }
```
Check: case-insensitive vs `expected`; display in `tapPalette.case`. The
deck's `<input>` is replaced WHOLESALE by the tap palette (K-3 no-typing
rule). `tapPalette.letters` = unique expected + 3–5 distractors from the
content locale's alphabet — **distractors required** (a pure-answer palette
is solvable by elimination).

### Family F — drag-and-drop
```jsonc
"elements": {
  "gridDims": { "rows", "cols" },
  "gridCells":    [{ "index","row","col","isClue", "rect" }],
  "paletteTiles": [{ "paletteNumber","originalCellIndex","rect","revealFile" }],
  "solutionLabels": { "<cellIndex>": <paletteNumber> }   // every non-clue cell
}
```
Two-phase deck semantics preserved: free fill (no feedback) → Check enabled
when all non-clue cells filled → correct cells lock green, wrong unlock after
a beat. `paletteReveals` data URLs become `assets/*.webp` FILES (cacheable,
small descriptor).

## 3. Generator-side export — SHIPPED (`LCSCatalogExport.exportStorybookExercise`)

Built into `REFERENCE TRANSLATIONS/catalog-export.js` (loaded by every app) +
a thin per-app adapter. Live on word-guess (A), grid-match (F), matching (E),
find-and-count (C). Operator flow: generate a worksheet → click **Export for
Storybook** (admin-only) → drag the crop box around ONE exercise (pre-filled
to the exercise's bounding box) → **Export this** → a `sep_<app>_<mode>_<lang>_<stamp>.zip`
downloads → unzip into a story's `exercises/<id>/` (the Studio then lists it).

**The helper** `exportStorybookExercise({canvas, extractBundle, exerciseObjects,
family, exerciseMode, cropRect?, returnPackage?, noDownload?})`:
1. `await extractBundle(canvas, {loadingMode:'inline'})` — consumes the app's
   existing bundle (no re-derivation).
2. Default crop = union of the bundle's **page-space element rects** + pad
   (NOT Fabric `getBoundingRect`, which is viewport/zoom-transformed — a
   different space; that mismatch = empty exports). `cropRect` given → skip
   the UI; `returnPackage` + no `cropRect` → use the auto crop headlessly.
3. Transparent render: invert `_captureWorksheetImage` — hide decoration tags
   (`isBorder/isBackground/isPageBorder/isHeader*/isAnswerKeyItem/isAttribution`),
   `backgroundColor=null`, `toDataURL({format:'png', left,top,width,height,
   multiplier:2})` (Fabric-5 crop), transcode → alpha WebP (PNG-sniff fallback).
4. `SEP_FAMILY_MAPPERS[family]` → rects normalized (word-guess center→top-left)
   + **rebased to crop space** + in-crop filtered → sep-1 `elements`; A derives
   `tapPalette.letters` (expected + distractors from a per-locale alphabet); F
   splits `paletteReveals` → `assets/reveal-NN.webp`; E rebases anchors +
   guards missing `acceptableRightIndices`; C derives per-cell rects from
   `gridRect`+`gridDims`, `countBlanks` from `inputSlots`+`targets[].totalCount`.
5. `locales` seeded from `window.translations`; ZIP via JSZip + `triggerDownload`.

**Per-app adapter (≈ 1 button + 1 predicate + 1 hook — estimate HELD):**
```html
<button id="sepExportBtn" class="lcs-admin-only">Export for Storybook</button>
```
```js
(function () {
  function sepOpts(cropRect, returnPackage) {
    return { canvas: <lexicalCanvas>, extractBundle: extractDeckBundle,
      exerciseObjects: c => c.getObjects().filter(<family predicate>),
      family: '<A|F|E|C>', exerciseMode: null,
      cropRect: cropRect, returnPackage: returnPackage, noDownload: returnPackage };
  }
  var b = document.getElementById('sepExportBtn');
  if (b) b.addEventListener('click', function () { LCSCatalogExport.exportStorybookExercise(sepOpts(null, false)); });
  window.__sepExport = function (r) { return LCSCatalogExport.exportStorybookExercise(sepOpts(r, true)); };
}());
```
Predicates: A `o.isGeneratedItem` · F `o.isGridMatchCell||o.isGridMatchPaletteTile`
· E `o.isGeneratedItem && (o.position==='left'||o.position==='right')`
· C `(o.isGeneratedItem && o.originalIndex==='grid')||o.isLegendBlank`.
Bump the catalog-export `?v=N` in the app HTML. **New app:** add the button +
these ~12 lines; the mapper is centralized (add a `SEP_FAMILY_MAPPERS` entry
only for a genuinely new family). Canvas globals are script-lexical — the
handler MUST live in the app (a `page.evaluate` can't reach them); the
`__sepExport` hook is the headless/proof entry.

**Proofs:** `scripts/storybook/prove-sep-export.js` (grid-match/F full LIVE
chain: generate→export→place→validate→qa-play) + `prove-sep-mappers.js` (all
four A/F/E/C mappers vs real bundle shapes → real validator 0 errors).

## 3b. Original generator-side target spec (historical — the above is the built version)

ONE shared helper in `REFERENCE TRANSLATIONS/catalog-export.js`:

```js
LCSCatalogExport.exportStorybookExercise({
  canvas: worksheetCanvas,
  extractBundle: extractDeckBundle,          // the app's existing fn — the key leverage
  exerciseObjects: c => c.getObjects().filter(o => o.isGeneratedItem === true),
  family: 'A',
  exerciseMode: getCurrentMode(),
  cropPad: 12
})
```

The helper (shared, written once):
1. `await extractBundle(canvas, {loadingMode:'reference'})` — rects, answers,
   runtimeStrings already exist per app.
2. Crop = union of world bboxes of `exerciseObjects(canvas)` + pad ∩ page.
3. Transparent render: save state → zoom 1 → `discardActiveObject()` →
   `backgroundColor = null` → set `visible=false` on every top-level object
   NOT in the exercise set (headers, borders, decorations, the
   `isAttribution` text) → `canvas.toDataURL({format:'png', left, top,
   width, height, multiplier: 2})` (Fabric 5 crop params — no offscreen
   renderer needed) → transcode to WebP via temp canvas
   `toDataURL('image/webp', .9)`; if the browser returns PNG (Safari), keep
   PNG and set `visual.format` — the descriptor is authoritative, ingestion
   never sniffs. Restore all state in `finally`.
4. `FAMILY_MAPPERS[family]`: normalize rect conventions (A: center→top-left),
   rebase to crop space, restructure answers, derive `tapPalette.letters`
   (unique expected + distractors per content-locale alphabet table), split
   Family-F reveals into `assets/` ZIP entries.
5. `locales` seeded from `window.translations` (all 11 already loaded in every
   app); JSZip → `sep_<appType>_<mode>_<lang>_<stamp>.zip` → triggerDownload.

**Per-app wiring ≈ 1 button + 1 call (~15–30 lines, 30–60 min/app).** Flags:
(a) apps whose exercise visuals include UNTAGGED page-level objects (some grid
lines) need a one-line tag addition (expect 2–4 apps); (b) mappers guard on
`sourceBundleVersion` against pre-fix bundle shapes (e.g. matching bundles
without `acceptableRightIndices`).

## 4. Validation

The story validator (`scripts/storybook/validate-story.js`) checks every SEP
a page references: format version · family supported · visual exists, has
alpha, dims = crop×scale · rects ⊂ crop (±2px) · Family A: single-char
expected ∧ palette ⊇ expected · Family F: solutionLabels total, reveals
exist · locale coverage per the host story's locales · density (smallest
element at the 560px stage: <16px real = error "enlarge zone or regenerate",
<44px = warn — inflated hit areas cover it).

## 5. Families E and C (SHIPPED 2026-07-02)

### Family E — tap-to-connect (matching / shadow-match)
```jsonc
"input": { "policy": "connect" },
"elements": {
  "mode": "imgname",                                  // provenance
  "leftItems":  [{ "index", "rect", "anchor": {"x","y"} }],   // crop-space
  "rightItems": [{ "index", "rect", "anchor": {"x","y"} }],
  "pairs": [{ "leftIndex", "correctRightIndex", "acceptableRightIndices"? }]
}
```
Ingestion preserves the deck semantics verbatim: tap-left-arm → tap-right
connect; 1-to-1 replacement (the previous left is freed); tap-line-to-undo;
Check enables when EVERY left is connected; grading uses the acceptable-set
(fallback `correctRightIndex`); wrong/missed get the green dashed hint line
to the correct right, then wrong connections clear for retry.
**shadow-match normalization (mapper concern):** its bundle differs
(`topItems/bottomItems`, `rect` only, center-to-center lines, single
`correctBottomIndex`) — the EXPORT mapper renames to leftItems/rightItems,
derives `anchor` = rect center, and wraps `correctBottomIndex` as
`correctRightIndex` (+ a singleton acceptable set). One descriptor shape.
Fixture: `stories/module-gym/exercises/shadow-pairs`.

### Family C — tap-to-mark + count blanks (find-and-count / find-objects)
```jsonc
"input": { "policy": "tap", "numberPalette": { "min": 0, "max": 9 } },
"elements": {
  "targets":     [{ "index", "rect", "isTarget": bool }],
  "countBlanks": [{ "key", "rect", "expected": int }]     // may be empty (tap-only)
}
```
Tap-to-mark toggles a ✓ (non-targets wrong-flash immediately, no-shame);
counts entered via the tap-NUMBER palette (min..max — the no-typing rule);
Check = all targets marked ∧ no non-targets marked ∧ every blank equals its
expected count. Export mapping: find-and-count `cells[]`→targets (grid) +
`inputSlots[]`+`targets[].totalCount`→countBlanks; find-objects `items[]`→
targets + `legend.items[].correctCount`→countBlanks.
Fixture: `stories/module-gym/exercises/count-apples`.

## 6. Roadmap

B (puzzle-drag letter grids) and D (bar-chart) stay deferred — they don't
miniaturize into a story zone well (500px+ letter grids; a single app).
