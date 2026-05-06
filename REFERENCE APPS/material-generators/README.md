# Material generators

Phase 3 deliverable for the teaching-package architecture. Each generator is a standalone HTML file that the operator opens in a browser, configures via the sidebar UI, and downloads a print-ready PDF from. Mirrors the existing 29-app pattern (Fabric.js + jsPDF client-side rendering) per CLAUDE.md §3.5 — no microservices, no server-side template rendering.

## Phase 3a generators (commit `c9ae2225`)

| File | Material slug | Purpose |
|---|---|---|
| `flashcards.html` | `flashcards` | Image + localized label per card, 4/6/9-up grid |
| `picture-cards.html` | `picture-cards` | Image-only cards (no label) for productive vocab work |
| `manipulative-cut-outs.html` | `manipulative-cut-outs` | Themed counters for K-3 hands-on math + sorting |
| `answer-key.html` | `answer-key` | Per-package teacher reference; consumes a package.yaml |

## Phase 3b generators (this commit)

| File | Material slug | Purpose |
|---|---|---|
| `sentence-strips.html` | `sentence-strips` | Pocket-chart strips with target-language frame + embedded image; 7 preset frames + custom; per-locale frame templates for en/de/es/fr/nl with article + plural auto-resolution from IMAGE_VOCABULARY gender |
| `parent-take-home-letter.html` | `parent-take-home-letter` | Letter to parents in HOME language (greet/body/close per tone) + picture cues labeled in TARGET language; full 11-locale × 3-tone template matrix baked in |
| `vocabulary-tracing-strips.html` | `vocabulary-tracing-strips` | Image + traceable word + optional blank line. NEW generator per CLAUDE.md §3.2 (does NOT extend writing.html). Pulled forward from Arc 2 deferred queue per operator authorization. Catalog entry added in this commit. |

## Out-of-scope (Arc 2)

| Material slug | Why deferred |
|---|---|
| `bingo-board` | Phase 4 farm-animals package (10 items) doesn't compose; bingo needs 24+ items minimum per §16.5.1 |
| `matching-mat` | Existing matching app PDF may suffice — Phase 3b will verify redundancy before building |
| Word-wall cards | Bucket-3 not selected at Phase 1 surface gate |
| Mini-book / fold-book | Bucket-3 not selected at Phase 1 surface gate |

## Architecture

All generators share infrastructure via `REFERENCE TRANSLATIONS/material-generator-shared.js` (synced into `frontend/public/worksheet-generators/js/` by `scripts\master-sync.bat`). The shared library exposes `window.LCSMaterialGenerators` with:

- `getThemeAssets(theme, locale, count?)` → fetches `/api/images?theme=&locale=`; no new endpoint per CLAUDE.md §10.3
- `lookupVocabulary(key, locale)` → direct `IMAGE_VOCABULARY[key][locale]` lookup; returns `{singular, plural, gender?}`
- `imageToVocabKey(image)` → wraps `LCSCatalogExport.vocabKeyFromImage` for vocab-key resolution from path / data URL / server-upload
- `localizedLabel(key, locale, opts)` → label with optional case + article (auto-resolved from gender)
- `localizedArticle(key, locale, opts)` → definite | indefinite per locale; Finnish returns ''
- `initCanvas(canvasEl, paperSize, opts?)` → Fabric.js canvas at A4 / Letter dimensions in PDF points
- `renderGrid(canvas, items, {cols, rows, renderItem})` → cell layout helper
- `renderCardBorder(canvas, x, y, w, h, opts)` → thin / thick / rounded / none
- `addCutGuides(canvas, cols, rows, x, y, w, h)` → dashed cut lines between cells
- `emitPdf(canvas, filename, opts?)` → jsPDF emit with multi-page support
- `loadFabricImage(url, opts)` → promise-wrapped `fabric.Image.fromURL`
- `LCS_LOCALES` → frozen 11-locale set
- `PAPER_SIZES` → frozen `{letter, a4}` in PDF points

## Image library access

Per `docs/lesson-plans/image-library-access-patterns.md` §9: client-side Fabric.js → jsPDF pattern reuses the existing `/api/images` contract verbatim. **No `/api/images` modification anywhere in Phase 3** per CLAUDE.md §10.3.

## Color mode

Every image-bearing generator exposes a `colorMode` parameter (color | bw). BW auto-routes to the corresponding `*_bw` theme variant per `topics-taxonomy.json axes.theme` registration (§16.5.1). Operator does NOT manually pick `animals_bw` over `animals` — the parameter handles it.

## Print-ready

PDFs emit at A4 (595 × 842 pt) or Letter (612 × 792 pt). Image fidelity at 2× multiplier per `canvas.toDataURL({multiplier: 2, format: 'jpeg', quality: 0.92})` — equivalent to ~300 DPI for typical card sizes. Phase 3 verification budget assumes operator-side browser visual inspection before Phase 4 first-package render.

## Development workflow

1. Edit `REFERENCE APPS/material-generators/<material>.html` (canonical source).
2. Run `scripts\master-sync.bat` to sync the served copy into `frontend/public/worksheet-generators/material-generators/` (gitignored; populated by sync).
3. Hard-refresh `http://localhost:3000/worksheet-generators/material-generators/<material>.html` in browser.
4. Configure sidebar → click "Generate &amp; download PDF" → verify file downloads + opens correctly.

## Deployment workflow

Per CLAUDE.md §A.5 / §14.6 TWO-STEP rule:

1. Push commit + run `deploy.sh` on Hetzner (refreshes `/opt/lessoncraftstudio/REFERENCE APPS/material-generators/<material>.html`).
2. Sync the served copy: `cp '/opt/lessoncraftstudio/REFERENCE APPS/material-generators/<material>.html' /tmp/ && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<material>.html material-generators/<material>.html`.

Phase 3 commits ship with documentation only; operator handles the deploy when ready to render Phase 4 materials.

## Tier-neutrality

Material generators are operator-only tooling (mirrors §1 + §3.3 — apps are private tooling, not public-facing). Generated PDFs do NOT carry the Made-with-LessonCraftStudio attribution from §14.3 because they are teaching-package outputs delivered to subscribed teachers, not student-facing content. Per Phase 1 plan §"Out of scope": tier-gating logic is deferred.
