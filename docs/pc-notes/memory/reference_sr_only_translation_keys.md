---
name: sr-only translation key naming convention
description: Where the canonical naming convention for srExercise* / srPuzzle* / srWorksheetQuestions translation keys is documented, plus the corresponding shared helpers
type: reference
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
The translation-key naming convention for the deck.html sr-only surface is documented as JSDoc on the shared helpers in `REFERENCE TRANSLATIONS/catalog-export.js`:

- `buildSrRows({label, rows})` — multi-row apps (Group A). Convention: `srExercise<App>` per-row template (e.g., `srExerciseAddition`); `srExercise<App><Mode>` for non-default modes (e.g., `srExerciseAdditionFindAddend`); `srWorksheetQuestions` aria-label for the section wrapper.
- `buildSrPuzzleSummary({label, summary})` — single-puzzle apps (Group B/C). Convention: `srPuzzle<App>` deck-level summary template (e.g., `srPuzzleWordsearch`, `srPuzzleTreasureHunt`).
- `srOperator<Name>` — arithmetic operator words (plus / minus / equals etc.) substituted INSIDE per-row sr-only constructions when the per-row text is stitched from vocabulary lookups + operator words rather than baked into the template string. Used by math-worksheet's per-equation construction. Scoped per-app (lives only in `translations-math-worksheet-final.js`) until a second consumer arrives — promote to shared keyset at that point.

Per-app code builds the formatted localized strings inline (because exercise data shape varies per app) and passes them to the helper, which owns the structural HTML wrapping (`<section><ol><li>` for rows, `<p>` or wrapped section for puzzle summary).

When adding a new sr-only key for a new app, follow the convention above and update the helper's JSDoc if a new pattern emerges.
