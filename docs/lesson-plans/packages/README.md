# Teaching package definitions

Storage convention for the new teaching-package architecture (per `docs/lesson-plans/existing-plan-substrate.md` §7-8 Option B lock).

## Directory layout

```
docs/lesson-plans/packages/<target-slug>/
├── package.yaml              # canonical en authoring (or whatever the package's primary locale is)
├── package.<locale>.yaml     # locale variants (one per non-canonical locale)
├── agent-review.md           # K-3 classroom-teacher agent review (Phase 4 only; per CLAUDE.md §3.4)
└── rendered/                 # Phase 4-rendered material PDFs; tracked at v1, untracked at scale
    └── <locale>/
        ├── flashcards.pdf
        ├── bingo-board.pdf
        ├── picture-cards.pdf
        ├── matching-mat.pdf
        ├── sentence-strips.pdf
        ├── manipulative-cut-outs.pdf
        ├── answer-key.pdf
        └── parent-take-home-letter.pdf
```

The `<target-slug>` is a slug from `frontend/config/learning-targets.json` — e.g., `identify-and-name-10-farm-animals`, `count-objects-1-to-5`, `add-within-10`.

## package.yaml schema

The authoring tool at `frontend/scripts/author-teaching-package.ts` validates definitions against:
- `frontend/config/learning-targets.json` (targetSlug must exist)
- `frontend/lib/exercise-palette.json` (composedExercises[].appName + exerciseMode + customizationParameters must validate)
- `frontend/config/materials-catalog.json` (materials[].materialSlug + customizationParameters must validate)
- ISO 639-1 locale set (language ∈ {en, de, fr, es, pt, it, nl, sv, da, no, fi})

Run validation:

```bash
cd frontend
npx tsx scripts/author-teaching-package.ts <path-to-package.yaml>
```

Exits 0 on pass; non-zero with descriptive errors on fail.

## Schema fields

| Field | Type | Required | Description |
|---|---|---|---|
| `targetSlug` | string | required | Pedagogical learning-target axis-key from `learning-targets.json` |
| `language` | string | required | ISO 639-1 (one of 11 platform locales) |
| `title` | object | required | Localized title `{<locale>: "..."}` |
| `description` | object | required | Localized description `{<locale>: "..."}` |
| `durationMinutes` | int | required | Total package duration |
| `structure` | object | required | 4-section CLIL: `{warmup, contentActivity, scaffold, closure}`; each section `{durationMinutes, body}` |
| `composedExercises` | array | required (may be empty) | Exercise compositions per §"composedExercises shape" below |
| `materials` | array | required (may be empty) | Material compositions per §"materials shape" below |
| `curriculumStandards` | string[] | optional | Framework citations |
| `assessmentCriteria` | object | required | Localized success criteria `{<locale>: "..."}` |
| `recommendedDeckIds` | string[] | optional | Deck IDs to use alongside the package |
| `recommendedPdfDeckIds` | string[] | optional | PDF-only Deck IDs |
| `lessonPlanId` | string \| null | optional | FK to existing `LessonPlan` row when wrapping a legacy plan |
| `generatedBy` | string | required | "manual" \| "ai:<model>" — provenance marker |

### composedExercises shape

```yaml
composedExercises:
  - appName: matching                         # one of the 29 §14.10 apps
    exerciseMode: imgname                     # validated against exercise-palette.json apps[].exercise_modes
    customizationParameters:                  # validated against exercise-palette.json apps[].customization_parameters
      count: 6
      themeName: animals
      labelCase: lowercase
    ordering: 1                               # presentation order in the package
    pedagogicalRole: practice                 # introduction | practice | consolidation | assessment
```

### materials shape

```yaml
materials:
  - materialSlug: flashcards                  # one of materials-catalog.json materials[].slug
    customizationParameters:                  # validated against materials-catalog.json materials[].customization_parameters
      imageSource: vocabKeyList
      vocabKeys: [cat, dog, cow, sheep, pig, chicken, horse, duck, goat, rabbit]
      cardCount: 10
      cardsPerPage: 6
    ordering: 1
    pedagogicalRole: vocabulary-anchor
```

## Locale variants

Locale-specific overrides live in sibling `package.<locale>.yaml` files. Only the locale-bound fields need to appear in the variant — typically `title`, `description`, `structure.*.body`, `assessmentCriteria`, and per-locale `customizationParameters` overrides where the operator wants different exercises or materials per locale.

Phase 2 ships canonical-only authoring; locale-variant validation is a Phase 5 / Arc 2 concern.

## Out of scope (Phase 2 + Phase 4)

- Validation against existing legacy `LessonPlan` rows (the keying space is orthogonal per existing-plan-substrate.md §7)
- Auto-rendering of materials (Phase 3 generators ship that capability)
- DB seeding (Phase 5 + Arc 2 commission spec covers seed-teaching-packages.ts)
- Subscriber UI for browsing packages (much later arc)
