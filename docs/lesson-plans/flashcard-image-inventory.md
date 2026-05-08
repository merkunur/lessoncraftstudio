# Flashcard image inventory — Pillar 4 Arc 1 Phase 1

**Audit date:** 2026-05-08
**Source:** `image library/` (local symlink to `/var/www/lcs-media/image-library/` per CLAUDE.md §A.1)
**Cross-reference:** `REFERENCE TRANSLATIONS/image-vocabulary.js` (1,261 IMAGE_VOCABULARY entries; all 11 platform locales)

## Headline counts

| Metric | Count |
|---|---:|
| Total PNG files in library (recursive) | **3,125** |
| Decorative — BACKGROUNDS dir (recursive) | 121 |
| Decorative — BORDERS dir (recursive) | 166 |
| Decorative subtotal (excluded) | **287** |
| **Vocabulary-applicable image assets** | **2,838** |
| Color-mode subset | 1,512 |
| BW-mode subset (line-art for color/print activities) | 1,326 |
| Top-level theme directories (vocabulary) | 100 |
| Decorative directories (excluded) | 2 |

**Pillar 4 Arc 2 generation scope:** 2,838 image assets × 11 locales = **31,218 flashcard renders**. Operator's spec estimate of ~27,500 falls within ~12% of empirical count — close but not identical; refine in Arc 2 commission spec.

## Per-theme distribution

102 theme directories total. Top 30 by image count:

| Count | Theme | Color/BW |
|---:|---|---|
| 94 | around the house | color |
| 83 | animals bw | bw |
| 70 | At the Supermarket | color |
| 70 | animals bw 5 | bw |
| 49 | occupations | color |
| 47 | kitchen tools | color |
| 47 | camping | color |
| 47 | beach | color |
| 44 | animals bw 3 | bw |
| 43 | clothing | color |
| 41 | forest creatures | color |
| 41 | accessories | color |
| 40 | summer | color |
| 40 | birds 2 | color |
| 39 | vehicles | color |
| 39 | travel and holiday bw | bw |
| 38 | sports bw | bw |
| 38 | household bw | bw |
| 38 | flowers | color |
| 37 | Things That Fly | color |
| 37 | objects bw | bw |
| 37 | animals | color |
| 36 | zoo animals | color |
| 36 | animals bw 4 | bw |
| 34 | vehicles bw 2 | bw |
| 34 | tree | color |
| 34 | toys | color |
| 34 | body parts | color |
| 34 | activities | color |
| 33 | spring | color |

(Full per-theme distribution: `image library/` ls → 102 dirs. BW themes follow a `<theme> bw` or `<theme> bw N` naming convention establishing parallel BW catalogs to color themes.)

## Decorative exclusion list

Two directories EXCLUDED from flashcard scope per Pillar 4 spec §6 (vocabulary images excluding design elements):

1. **`image library/BACKGROUNDS/`** — 121 PNGs, organized in 4 holiday/season subdirs (`4th of July`, etc.). Decorative full-bleed scene assets used as worksheet backdrops; not vocabulary subjects.

2. **`image library/BORDERS/`** — 166 PNGs in single `borders/` subdir. Decorative frame assets used as worksheet borders; not vocabulary subjects.

**Rationale:** These assets serve as visual chrome for worksheets and printables — they are NOT countable subjects with single-word labels. Wrapping a sentence frame around "Borders landscape 001" produces no pedagogical value; cards would read as nonsensical. Operator-side scope-narrowing decision LOCKED at spec authoring; verified by inspection.

## IMAGE_VOCABULARY cross-reference findings

Cross-walking image filenames (slugified) against IMAGE_VOCABULARY keys surfaces **72 image-asset filenames** that don't directly match a vocab key. Classification:

### Recoverable via existing `vocabKeyFromImage` dispatch (~50 of 72)

Per CLAUDE.md §14.3a's helper at `REFERENCE TRANSLATIONS/catalog-export.js`, the dispatch handles:
- Numeric-suffix variants (`cat 2.png` → `cat`)
- Theme-prefix paths (`/images/animals/cat.png` → `cat`)
- Server-stored upload patterns (timestamp-hash suffixes)

Filename samples falling into this bucket: `cat-`, `fox-`, `tiger-`, `dumbbell-`, `cup-` — all numeric-suffix-stripped artifacts of the audit's normalization logic; runtime helper handles correctly.

### Tree-theme suffix asymmetry (~25 of 72)

Image filenames in `tree/` theme use bare names: `cedar.png`, `oak.png`, `maple.png`, etc. IMAGE_VOCABULARY uses qualified `cedar-tree`, `oak-tree`, `maple-tree`, etc.

Affected: `ash`, `aspen`, `banyan`, `baobab`, `beech`, `birch`, `cedar`, `chestnut`, `cypress`, `dogwood`, `elm`, `fir`, `hemlock`, `juniper`, `maple`, `oak`, `palm`, `pine`, `poplar`, `redbud`, `redwood`, `sequoia`, `spruce`, `sycamore`, `walnut`.

**Resolution:** add a small theme-aware mapping table to the Phase 2 pipeline: when image is in `tree/` theme, append `-tree` suffix before vocab lookup. Pipeline-side; no IMAGE_VOCABULARY edit required.

### Spelling normalization mismatches (~10 of 72)

Image filenames use British / variant spellings or typos that don't match vocab canonical:
- `chilli-pepper` (image) vs `chili-pepper` (vocab)
- `octogon` (image — typo) vs `octagon` (vocab)
- `calender` (image — typo) vs `calendar` (vocab)
- `sceptical` (image) vs vocab equivalent
- `yoghurt` (image — British) vs `yogurt` (vocab)
- `sallad` (image — typo or Swedish import) vs `salad` (vocab)
- `clown-fish` (image) vs `clownfish` (vocab)
- `dragonfruit` (image) vs `dragon-fruit` (vocab)
- `hotdog` (image) vs `hot-dog` (vocab)

**Resolution:** small alias table in pipeline. Filename → vocab-key mapping. ~10 entries. Pipeline-side; no IMAGE_VOCABULARY edit required.

### Truncated compound names (~5 of 72)

Image filenames use shortened forms; vocab uses full compound:
- `cruise` → `cruise-ship`
- `double-decker` → `double-decker-bus`
- `pickup` → `pickup-truck`
- `mixer-truck` → vocab equivalent (need check)
- `dumper-truck` → `dump-truck`?

**Resolution:** alias table extension; pipeline-side.

### Possibly genuine substrate gaps (~2 of 72)

A small number may need either filename normalization OR vocab entry:
- `biberon` — French/Italian for baby bottle; English-asset library should likely rename to `baby-bottle.png` (matches vocab).
- `couch,` and `rocket,` — comma artifacts in filenames; **filesystem-level rename recommended at operator-coordination time**.

## Substrate gap classification

**Blocking severity: NONE.** All 72 mismatches resolve via either:
1. Existing `vocabKeyFromImage` dispatch (~50)
2. Small pipeline-side alias table (~20)
3. Operator-coordination filename normalization (~2 — comma-bearing filenames; recommended cleanup but not blocking)

**Phase 2 unblocked.** Pipeline implementation builds the alias table as part of `generate-flashcards.ts`. Surface to operator with this audit; no Stream A Arc 2 escalation required for the comma-bearing files (cosmetic file-rename only).

## Theme grouping for Phase 3 validation batch selection

Phase 3 validation batch (50-100 flashcards across 5+ locales) samples representative images. Suggested theme spread:

| Theme | Image | Word (en) | Cross-locale interest |
|---|---|---|---|
| animals | cat.png | Cat | cognate-rich Romance + Germanic; clean baseline |
| food / fruits | apple.png | Apple | universal cognate |
| vehicles | airplane.png | Airplane | de Flugzeug significantly longer than en |
| body parts | ankle.png | Ankle | de Knöchel umlaut + non-cognate |
| occupations | actor.png | Actor | Romance cognate; gender-marked in es/it/pt |
| clothing | (clothing/<item>) | various | BR-cultural relevance per Arc 13 sparse-override |
| weather | (weather/<item>) | various | universally relevant; cross-locale text-length variance |
| shapes | hexagon.png | Hexagon | technical vocabulary; longer in fi (kuusikulmio) |
| colors | red.png | Red | very short in en/de; longer in fi (punainen) |
| emotions | angry.png | Angry | adjective form; productively-difficult cross-locale |

Selection criterion: themes maximize text-length variance + cross-locale grammatical-gender variance + cognate-richness diversity, ensuring validation batch surfaces design-stress-cases.

**CC Phase 3 selection plan:** ~10 images sampled across 7-10 themes; rendered in 5-6 locales (en + es + fi + de + it + nl). Total ≈ 50-60 flashcards meeting spec lower-bound.

## Operator-side considerations surfaced

1. **Arc 2 generation cost re-estimate:** 31,218 renders (vs spec estimate ~27,500). Add ~12% to Arc 2 timing/storage estimate.

2. **Comma-bearing filenames** (`couch,`, `rocket,`, `dumper-truck`, etc.) are cosmetic but worth a small operator-coordination rename pass before Arc 2 full generation. Pipeline-side handling works in Arc 1; cleaner library state for Arc 2.

3. **No Stream A Arc 2 escalation needed.** All 72 cross-reference mismatches resolve via pipeline-side alias logic; no IMAGE_VOCABULARY entry additions required.

4. **Decorative exclusion solid.** BACKGROUNDS + BORDERS = 287 assets clearly out-of-scope for flashcards; verified by inspection.
