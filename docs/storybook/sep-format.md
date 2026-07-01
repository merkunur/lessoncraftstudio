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

## 3. Generator-side target (the operator's build; this section IS the spec)

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

## 5. Roadmap

Family E (tap-to-connect: `leftItems/rightItems` + rebased `anchor` points +
`pairs.acceptableRightIndices`, SVG viewBox = crop) is the next cheapest —
the descriptor block is already designed; add `families/e-connect` handling
in `sb-mod-worksheet-exercise.js`. Family C (tap-count) needs a tap-NUMBER
palette (`input.numberPalette {min,max}`). B (puzzle-drag grids) and D
(bar-chart) deferred — they don't miniaturize into a story zone well.
