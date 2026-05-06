# Phase 1 audit — Materials catalog

**Audit scope:** the printable material types a teaching package can include. Materials extend the existing 29 worksheet apps' worksheet-PDF output with classroom-grade materials a K-3 multilingual teacher actually uses (flashcards, bingo boards, picture cards, etc.). Machine-readable companion: `frontend/config/materials-catalog.json` (canonical; Phase 2 tooling consumes this directly).

**Operator-ratification status:** **LOCKED at Phase 1 surface gate (operator response in this session).** Operator delegated bucket-3 selection to CC adjudicator-forward per §3.4 (empty answer); CC locked CC's own recommendation: apply Option K (Manipulative cut-outs) only, defer H+I+J to Arc 2 per the classroom-teacher agent's "add to roadmap, not v1" recommendation. Final material count: **8 materials** (7 original + manipulative-cut-outs). All bucket-1 (required-before-lock) and bucket-2 (strongly recommended) revisions also applied.

## 1. Materials shipped in v1 catalog

Eight material types (post-gate ratification), organized by category:

| Slug | Name | Category | One-liner |
|---|---|---|---|
| `flashcards` | Flashcards | vocabulary-anchor | Image + label per card; the bedrock vocab material |
| `bingo-board` | Bingo board (with caller chips) | vocabulary-game | 5×5 themed grid + caller chip strip; whole-class listening game |
| `picture-cards` | Picture cards (image-only, no label) | vocabulary-anchor | Image-only cards for productive vocabulary work + sorting + memory game |
| `matching-mat` | Matching mat (image ↔ word pairs) | vocabulary-game | Single-page mat for paired matching; differentiated via right-column content |
| `sentence-strips` | Sentence strips (sentence frames with images) | language-frame | Pocket-chart strips with target-language sentence frames + embedded image |
| `answer-key` | Answer key (per-package) | teacher-reference | Auto-generated reference for the teacher; especially valuable for non-native target-language speakers |
| `parent-take-home-letter` | Parent take-home letter (with picture cues) | home-school-bridge | Letter to parents in their HOME language with picture cues showing target-language vocab |
| `manipulative-cut-outs` | Manipulative cut-outs | math-and-categorization-support | 2D printable themed counters; kids cut out for counting, sorting, sequencing, pattern building |

## 2. Doctrine locks (post-classroom-teacher-validation revision)

Per the materials catalog `doctrine_notes` array:

1. **Theme-agnostic at catalog layer.** Theme is selected once at material-render time per package; cascades to each composed material.
2. **Generation pipeline default = client-side Fabric.js → jsPDF**, paralleling the existing 29-app pipeline. New material generators are HTML files separate from the canonical 29 §14.10 worksheet generators; live at `REFERENCE APPS/material-generators/` or sibling directory adjudicated in Phase 3.
3. **No `/api/images` modification** per CLAUDE.md §10.3.
4. **Difficulty differentiation lives in customization parameters at composition time** — materials are not internally difficulty-graded.
5. **Print-ready 300 DPI equivalent** — Phase 3 must verify source-image DPI before claiming this.
6. **Color-vs-BW: `colorMode` parameter on every image-bearing material.** BW auto-routes to `*_bw` theme variants per §16.5.1. Default color but most school photocopiers are B&W; one-toggle BW route is load-bearing.
7. **Article/gender auto-resolution from `IMAGE_VOCABULARY` gender data.** Sentence frames + labeled materials MUST resolve articles automatically — never require operator-typed articles. A platform marketed on multilingual K-3 quality cannot ship "Ich sehe ein Katze" instead of "Ich sehe eine Katze." This is the highest QC-risk surface in the catalog and Phase 3 implementation MUST get this right at first ship.
8. **Parent letter body text constrained to ~Lexile 400 / CEFR A2-equivalent.** Recent-immigrant parents may have low literacy in their home language; short sentences + common words + no idioms.

## 3. Classroom-teacher-agent review — surface gate items

The K-3 classroom-teacher review (general-purpose agent prompted as a multilingual K-3 international-school teacher) returned a comprehensive review. CC has applied **all bucket-1 (required-before-lock) and bucket-2 (strongly recommended) revisions** and **flagged bucket-3 (next-arc) materials for operator ratification**.

### 3.1 Already applied (post-revision; folded into v1)

**Bucket 1 (required-before-lock):**
- ✅ Sentence strips: `framePreset` select with 7 K-3-realistic preset frames (`i-see-a`, `i-have-a`, `this-is-a`, `i-like-plural`, `there-are-count-plural`, `the-item-is-color`, `the-item-says`) + `custom` option. Frame complexity ladder noted in doctrine.
- ✅ Article/gender auto-resolution doctrine locked at the catalog level
- ✅ `colorMode` parameter added to every image-bearing material (flashcards, bingo, picture-cards, matching-mat, sentence-strips, parent-letter)
- ✅ Parent letter: `homeLanguage` separated from `language` — body in homeLanguage, picture cues labeled in target language
- ✅ Bingo: `boardCount` default raised from 6 to 24 (range 1-32) — real classrooms have 18-30 kids
- ✅ Bingo: dropped `freeSpaceShown` (FREE always shown, convention-locked) and `markerStyle` (kids use beans/dots/counters)

**Bucket 2 (strongly recommended):**
- ✅ Flashcards: added `backOfCard` (`blank` / `word-only` / `translation-to-locale`) + `homeLanguageForBack` for parent-takehome translation flow — the killer differentiator the agent identified
- ✅ Flashcards: `cardsPerPage` simplified from `[4,6,9,16]` to `[4,6,9]` (16-up cards too small for any classroom use)
- ✅ Flashcards: added `roundedCorners` boolean default true (sharp corners cut kids during lamination)
- ✅ Picture cards: `cardsPerPage` simplified from `[4,6,9,12,16]` to `[4,6,9,12]`
- ✅ Matching mat: default `pairCount` lowered from 8 to 6 (K-3 kids lose place tracking 8+ pairs)
- ✅ Answer key: `includePedagogicalNotes` default flipped from `false` to `true`
- ✅ Sentence strips: added `includeWritingLine` boolean

**Bingo cardinality doctrine:**
- ✅ Added doctrine note that bingo needs 24 unique items minimum; if a package's vocab list has fewer (e.g., farm-animals at 10 items), bingo is not the right material — use flashcards + matching mat instead.

**Matching mat differentiation note:**
- ✅ Added doctrine note that Phase 3 implementation must verify visual/layout differentiation from the existing matching app PDF; if redundant, surface the existing app PDF as the package's matching artifact and cut this material.

### 3.2 Bucket-3 ratification — applied vs deferred (post-gate)

Operator delegated this surface to CC adjudicator-forward (per §3.4). CC's lock per the classroom-teacher agent's "add to roadmap, not v1" recommendation:

**Option K — Manipulative cut-outs — APPLIED.** 2D printable "counters" themed to the package (e.g., 20 small farm animals on a sheet, kids cut out for counting/sorting). Phase 4 farm-animals package will compose this material in variety mode. Now part of the v1 catalog.

**Option H — Word wall cards — DEFERRED to Arc 2.** Word-only or word+small-image-cue cards for wall-pinning, large readable text from across a classroom. Distinct from flashcards. Used 2x weekly in real K-3 classrooms. Adding in Arc 2 unblocks Grade 1+ packages where word-wall scaffolding is standard.

**Option I — Vocabulary tracing strips — DEFERRED to Arc 2.** Image + dotted-line word for tracing + blank line for independent writing. K + Grade 1 use. Verify against existing `writing.html` (PDF-only app) before Arc 2 build to avoid redundancy.

**Option J — Mini-book / fold-book — DEFERRED to Arc 2.** 8-page foldable booklet from one printed sheet. High-engagement take-home format. Realistic build (well-known origami fold pattern); add when Arc 2 vocabulary packages need stronger home-school bridge.

### 3.3 Classroom-teacher agent's final-lock recommendation

> "Lock with the listed revisions. The 7-material catalog is structurally sound and the right v1 surface. The revisions cluster into three buckets: (1) required-before-lock — these break real classroom use (article/gender resolution, colorMode, homeLanguage, bingo boardCount default, sentence-strip presets); (2) strongly recommended — high-value, low-cost (backOfCard, simplified cardsPerPage, etc.); (3) add to roadmap not v1 — word wall cards, mini-book, vocabulary tracing strips, manipulative cut-outs.
>
> Do not ship v1 without the bucket-1 fixes — particularly the article/gender resolution. A platform that markets itself on multilingual K-3 quality cannot ship sentence strips that produce 'Ich sehe ein Katze' instead of 'Ich sehe eine Katze.' That single defect would be more visible to professional reviewers in the target audience than any other issue in the catalog."

CC has applied buckets 1 and 2 in full. Bucket 3 is the operator-ratification surface.

**CC's adjudication recommendation to the operator:** apply Option K (Manipulative cut-outs) at Phase 1 lock if Phase 4 farm-animals package would compose it; defer H, I, J to Arc 2 unless operator strongly prefers wider v1 surface. Rationale: 7 materials is a sufficient catalog for the MVP package + next 9 vocab packages; the bucket-3 items genuinely matter but their absence doesn't gate Arc 1 deliverables.

### 3.4 Print-realism flags surfaced (informational; carry to Phase 3)

The agent flagged print-realism concerns Phase 3 implementation must address:

- **Color-required materials** are a real problem for B&W school photocopiers. The `colorMode` parameter is the answer; Phase 3 must implement BW theme auto-routing per §16.5.1 (do NOT make teachers manually pick `animals_bw` over `animals`).
- **Single-sided assumption.** Flashcards' `backOfCard: translation-to-locale` requires duplex printing; PDF emit must include "PRINT PAGES 1, 3, 5... THEN FLIP AND PRINT 2, 4, 6..." instructions for non-duplex teachers.
- **A4-vs-Letter parity.** Both sizes listed for every material; Phase 3 must recompute grid spacing per paper size (A4 297mm vs Letter 279mm), not scale a single layout.
- **300 DPI claim.** Phase 3 must verify source-image DPI in the image library before claiming this. If sources are 72 DPI, prints will be visibly fuzzy at flashcard size.

### 3.5 MVP-package material composition (for `identify-and-name-10-farm-animals`)

The agent walked through a 1-2 week unit using the catalog:

> "I would use **flashcards + picture cards + sentence strips + parent letter + answer key**. I would NOT use bingo board (10 items is too few for a 5×5 grid — bingo wants ~24 items). I would NOT use matching mat (the existing matching app's PDF covers this; redundant for a 10-item set)."

Phase 4 first-package authoring should compose flashcards + picture-cards + sentence-strips + parent-letter + answer-key — five of the seven materials. Bingo and matching-mat are genuinely not load-bearing for the farm-animals package shape; they will be load-bearing for other vocab packages (e.g., a 24-item compound noun + adjective package would compose bingo).

## 4. Out-of-scope for v1 (per commission scope + agent recommendations)

- Story dice / word dice — niche; teachers buy commercial ones
- Songs/chants printable cards — value is in audio not printable
- Sticker charts / certificates — diluent; teachers have these from elsewhere
- Right-to-Left script support / non-Latin scripts — out of scope today; flag for v2
- Server-side template rendering (Puppeteer / PDFKit) — Phase 3 default lean is client-side Fabric.js → jsPDF per §3.5 lock
