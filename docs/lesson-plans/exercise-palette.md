# Phase 1 audit — Exercise palette (29 apps)

**Audit scope:** the customization surface of all 29 §14.10 catalog-eligible worksheet apps, audited to inform teaching-package composition. Machine-readable companion: `frontend/lib/exercise-palette.json` (canonical; Phase 2 tooling consumes this directly).

This document is a narrative overview. The JSON has the complete per-app contract.

## 1. Runtime families (per CLAUDE.md §14.2 + MEMORY.md)

The 29 apps cluster into 6 runtime families based on the kid's mechanical interaction shape. Composition decisions in Phase 4+ should consider family-level affordances — a teaching package can compose across families, but each family has distinct cognitive demands.

| Family | Mechanic | Apps |
|---|---|---|
| **A** — Letter fill-in (slot-per-answer + 2D-grid + choice variants) | Type or select into discrete slots; batch Check Answers | addition, subtraction, code-addition, more-less, math-puzzle, math-worksheet, alphabet-train, pattern-train, prepositions, word-guess, word-scramble, cryptogram, big-small, pattern-worksheet, odd-one-out, crossword |
| **B** — Puzzle drag (spatial selection) | Drag pointer across grid cells; path snaps + validates | wordsearch, picture-path, treasure-hunt |
| **C** — Grid-tap / tap-to-mark | Tap-to-mark targets; counts accumulate | find-and-count, find-objects |
| **D** — Bar-chart cell tap | Tap cells in bar-graph to increment | chart-count |
| **E** — Tap-to-connect (line drawing) | Tap-pair to draw connecting line | matching, shadow-match |
| **F** — Drag-and-drop deferred Check | Drag tiles to slots; Check at end with green/red feedback | grid-match, bingo, picture-sort, missing-pieces, sudoku |

## 2. Universal customization layer

Every app exposes:

- **`languageSelect`** — 11-locale image-library language (en/de/fr/es/pt/it/nl/sv/da/no/fi)
- **`pageSizeSelect`** — letter / letter-landscape / a4 / a4-landscape / square / custom
- **`pageColor`** — fallback background color (overridden by background theme)
- **`backgroundThemeSelect` + `backgroundOpacity`** — decorative theme (image_themes.type=backgrounds)
- **`borderThemeSelect` + `borderOpacity`** — decorative border (image_themes.type=borders)
- **`includeNameDate`** — name/date fields in header
- **`includeExerciseNumbers`** — sequential numbering (most apps)

**Layer separation:** `exercise` controls (mode, problem count, difficulty, theme content), `page` controls (paper size, name/date, numbering), and `theme` controls (decoration). Phase 2 authoring tooling consumes these layer tags to validate per-package customization.

## 3. Per-family details

### Family A — Letter fill-in (16 apps)

The bulk of the catalog. Classic worksheet shape: discrete answer slots, batch Check Answers, pedagogical-feedback on submit. **Most composable family for teaching packages** because:
- Each app has 1-4 explicit `exercise_modes` (predictable composition surface)
- All consume the image library through theme + locale parameters
- Customization is mostly numeric (problem count, operand range, clue density) — easy to constrain at composition time

**By cognitive subtype:**
- **Arithmetic (addition / subtraction / code-addition / more-less / math-puzzle / math-worksheet)** — number reasoning + image counting; K-Grade 3 spread
- **Letter / phonics (alphabet-train / word-guess / word-scramble / crossword)** — letter recognition, spelling, phonemic awareness; K-Grade 3
- **Pattern (pattern-train / pattern-worksheet)** — sequential/visual patterns; K-Grade 2
- **Spatial / categorization (prepositions / big-small / odd-one-out)** — relational vocabulary; K-Grade 2
- **Code / cipher (cryptogram)** — substitution puzzle; Grade 2-3

### Family B — Puzzle drag (3 apps)

Spatial selection mechanic. Shared substrate: orthogonal-or-diagonal cell traversal with operator-controlled wall blocking, hidden endpoints, and per-mode validation logic. **Composes well as advanced/challenge content** in Grade 1+ packages.

- **wordsearch** — letter grid, 8-direction selection, words pre-placed
- **picture-path** — maze with pathway / classic-maze / choose-path variants; perfect-maze generation
- **treasure-hunt** — locked-start drag-trace; direction-word clues

### Family C — Grid-tap / tap-to-mark (2 apps)

Tap-to-mark, with optional count accumulator. **Strong for early-numeracy + visual-discrimination targets.**

- **find-and-count** — themed grid; tap targets, count accumulates
- **find-objects** — busy-scene tap-to-mark; dual-mode (I-Spy + Odd-One-Out)

### Family D — Bar-chart cell tap (1 app)

- **chart-count** — count by category, fill bar-graph cell-by-cell. Strong for **K-3 data-graphing target** (CCSS.K.MD.B.3-style content).

### Family E — Tap-to-connect (2 apps)

Tap-pair line-drawing. **Strong for matching-pair targets** (image-letter, image-word, image-image).

- **matching** — column-pair (left/right); 4 modes
- **shadow-match** — shadowMatch / makeItWhole; vertical or horizontal cuts

### Family F — Drag-and-drop deferred Check (5 apps)

Drag tiles to slots; deferred Check Answers with green/red. **Highest cognitive engagement** because the kid commits placements before getting feedback. Strong for **logic + categorization + spatial-reasoning targets**.

- **grid-match** — drag pieces into slots completing a target picture
- **bingo** — 5×5 picture/word bingo with optional caller bar (literacy variant)
- **picture-sort** — binary categorization with strict scoring; Custom Words text-tile mode
- **missing-pieces** — shape-masked piece-into-hole (5 piece shapes)
- **sudoku** — 4×4 / 6×6 picture-sudoku with image-index matching

## 4. Composition signals for teaching-package authoring

These signals help Phase 4 authoring (and Phase 2 validation tooling) decide which exercises pair well with a given pedagogical target.

### Vocabulary-acquisition targets (the MVP slice)

**Best palette picks for a target like `identify-and-name-10-farm-animals`:**

- **Family E matching** (mode=letter or imgname) — direct image↔word pairing surfaces vocabulary explicitly
- **Family F bingo** (cardFill=image, optional caller) — caller bar names each target during play (literacy reinforcement)
- **Family A word-guess / word-scramble** — letter-by-letter spelling reinforces grapheme-to-image mapping
- **Family F picture-sort** (theme mode) — categorization reinforces semantic relationships
- **Family C find-and-count** — locating a target by name reinforces image-name binding
- **Family A odd-one-out** — semantic-category exclusion reinforces in-group vs. out-group attribution

**Avoid for vocab targets:**

- Family A arithmetic apps (addition/subtraction) — number reasoning, not vocabulary
- Family A code-addition (cipher reasoning, not vocabulary)
- Family B picture-path classic-maze (spatial navigation, no vocabulary surface)
- Family D chart-count (counting + graphing, not vocabulary)

### Early-numeracy targets

**Best palette picks for a target like `count-quantities-to-10-with-objects`:**

- **Family A addition / subtraction (mode=image-image)** — operand groups force counting
- **Family A more-less (mode=image-image)** — comparison forces counting both groups
- **Family C find-and-count** — count-and-mark mechanic
- **Family D chart-count** — count + graph each category
- **Family A code-addition** — number-word recognition (if Grade 1+)

### Letter/phonics targets

**Best palette picks for a target like `match-image-to-beginning-letter`:**

- **Family A alphabet-train** — exact match for this target
- **Family E matching (mode=letter)** — image↔letter pairs
- **Family A word-guess (difficulty=4 or 6)** — pre-revealed letters scaffold beginning-letter recognition

## 5. Common patterns across all apps

These observations inform the Phase 2 data model:

1. **All 29 apps are "DERIVED" in `EXERCISE_MODE_APP_CLASSIFICATION`.** Each app emits an `exerciseMode` value at deck-export time; null is legitimate per the §17.8.5 default-mode-emits-null contract for some apps (e.g., addition default `image-image`, sudoku default `easy/4` emits null).

2. **All 29 apps consume `/api/images?theme=&locale=`.** Image-library coupling is uniform; Phase 3 material generators inherit this exact contract.

3. **All 29 apps use `IMAGE_VOCABULARY` for labels.** No app generates labels client-side from filenames; the canonical translations table is always the source.

4. **Customization-parameter ranges are narrow at the lower bound.** `problemCount` minimum is 1 across all apps; some apps have explicit non-zero minimums (more-less ccExerciseCount=1, math-puzzle 2×2 grid). This means a teaching package's per-exercise customization rarely wants `count=0`; the validation tool can default `count` to a sensible mid-range value.

5. **Customization shape is highly per-app.** No two apps share the same parameter set (even within a family). Phase 2 tooling must consume per-app contracts from `frontend/lib/exercise-palette.json` rather than assume any shared schema beyond the universal layer (§2).

6. **Theme parameter is consistently named `themeSelect` (or `worksheetThemeSelect` for some).** Phase 2 validation can reliably resolve "which theme is this exercise using" by looking for either key.

7. **Mode parameter naming varies.** addition uses `exerciseMode`, math-worksheet uses `difficulty`, picture-path uses `gameModeSelect`, sudoku uses `difficulty` + `gridSize`. Phase 2 validation must consume the `exercise_modes` list from the JSON catalog, not infer from a single key name.

## 6. Out-of-scope: app modifications

Per CLAUDE.md §3.2: the apps' generation algorithms, customization UIs, and image selection logic are **not** to be modified by this commission. Phase 2 authoring tooling reads the palette as-is. If a teaching package would benefit from a customization parameter that doesn't exist (e.g., "addition app should support find-addend mode with theme=animals at exactly 5 items"), Phase 4 authoring constrains itself to the existing surface; future app extensions are operator-strategic and out of this Arc's scope.

## 7. Known limitations + filed concerns

These are observations from the audit that may matter at Phase 4 or Arc 2:

1. **math-worksheet equation-string concatenation breaks in Finnish (case marking).** Per `project_brief_a_translation_debt.md` — needs per-language renderer when it ships in non-en/de locales. Not a blocker for Arc 1 (en-only); flag at Phase 5 Arc 2 commission spec if Arc 2 includes localization to fi.

2. **alphabet-train uses a fixed 11-letter structure**, not 26. Limits its applicability for whole-alphabet mastery targets; works for "name the 11 letters in [theme]" or scaffolded subsets.

3. **Family D chart-count has minimal explicit configuration.** Composition cost is high (you accept whatever the app produces); useful as a downstream-learning-target add-on rather than a primary exercise.

4. **Several apps have null/sparse customization (big-small, find-objects mode-pair, treasure-hunt).** These work as "drop-in" exercises but the per-package customization surface is thin. Document this in Phase 2 tooling so package authors don't expect rich knobs where none exist.

5. **Custom-words mode in word-guess, word-scramble, picture-sort, crossword bypasses the image library.** Useful for languages or vocab the operator wants to teach beyond the existing `IMAGE_VOCABULARY` keyspace, but loses image-asset reuse. Phase 4 authoring should prefer image-library content for the MVP package; reserve custom-words for vocab not in the library.

## 8. Recommended Phase 2 + Phase 3 consumption pattern

- **Phase 2 authoring tooling** loads `frontend/lib/exercise-palette.json` once at startup. For each `composedExercises[]` entry in a package definition, looks up the app by name, validates `exerciseMode` is in the app's `exercise_modes` list, validates each `customization_parameters[].key` matches a key in the app's parameter list, and validates the value is in range.
- **Phase 3 material generators** are NEW HTML files (not modifications to the 29 apps) — see image-library-access-patterns.md §9.
- **Phase 4 first authored package** composes across 4-6 of the palette apps from §4 above ("Best palette picks for vocabulary-acquisition targets") for the `identify-and-name-10-farm-animals` package.
