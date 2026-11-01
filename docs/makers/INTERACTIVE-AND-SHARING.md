# Interactive worksheets and sharing — the operator's rule of 2026-11-01, made buildable

> **The rule (operator, verbatim):** "Every worksheet except for the ones which include writing exercise and the ones which have more than one right answer should have the option to generate interactive worksheet. You should also make sure that these interactive worksheets should serve to the seo and domain authority of the website when they are shared with the students by the teachers."
>
> **Ruling on point A (operator, 2026-11-01, binding):** typing a number or a word into a box is NOT writing. "Writing exercise" = real writing practice only (handwriting, tracing, copying, cursive, writing sentences, drawing). Every template whose answers are numbers or words a child can type, or choices to tap / circle, is eligible. Excluded: real writing exercises, and tasks with more than one right answer.

Written 2026-11-01 from the code as it is. Every factual claim cites `file:line`. Measured by building all 811 in-scope templates once in Node (en, level 2, first eligible theme, plus the answer-key build) and reading the marks on the page — the script is reproducible from `scripts/makers/runtime.js makePage` + `lib/rng.js`; nothing was deployed, gated or built.

---

## 0. For the owner — one page

- **Today 443 of the 811 templates already have a screen version** (a child taps, types or drags on the same page). **196 more will get one** under your rule: 107 need only the generic engine described below (their answers are already marked on the page for the answer key), 89 need a small marking edit in the template first, 12 use a special engine that already exists (colour-by-number, the maze path). **136 are real writing practice** (tracing, cursive, drawing, copying, writing sentences) and stay paper-only. **5 have no single right answer** and stay paper-only. **18 are classroom material** (flash cards, cut-outs, charts) with nothing to check. One template ("make it true", 24 < □ < 30) prints a *set* of right answers; it needs your call (§A.5).
- **The cheapest correct way** is ONE generic engine that turns the marks every print-only page already carries for its answer key into tap targets and write boxes in the student's browser, with the existing Check / Try again strings in 11 languages. Per-template screens stay only where they exist today (443) and for the 12 special ones. Cost ≈ 25–28 sessions on top of the 450 (§D.3), most of it the 89 marking edits.
- **SEO and domain authority.** A student link is a page a child plays on; thousands of near-identical teacher-made pages must **not** be indexed (thin, duplicate, children's privacy, and they would compete with the 363 old landings and the new maker landings). They serve SEO in two honest ways: (1) every student page carries the site's visible header and footer links (brand, "Make your own", the maker's landing in that language) — a teacher, parent or blog that copies the link exposes the brand and the indexable pages; (2) the **embed snippet** puts a visible branded link *outside* the iframe, pointing at the **indexable** landing, so a school website or class blog that embeds a worksheet gives us a real backlink. Google Classroom, Teams and WhatsApp are closed systems: a link pasted there brings traffic and brand, not link equity — so the page is built to convert that traffic (title, picture card, "Made with LessonCraftStudio — make your own") rather than to rank. Recommended design in §C.9; cost ≈ 5 sessions, already half-budgeted as the student play page (ARCHITECTURE §14.1 P3/P4).
- **Decisions only you can make** are in §D.4 (five, each with a recommendation).

---

## A. The rule, made precise

### A.1 What "includes a writing exercise" means (decided)

The operator's ruling settles it: typing is not writing. The K-2 reasoning that supports the ruling, for the record: the thing a worksheet *teaches* is either the content answer (how many, which sound, 7 + 5) or the motor act of forming letters and shapes. When the answer is a number or a word, the pencil is only the medium; the screen replaces the medium and keeps the learning target — exactly what the shipped `type-number` and `type-word` runtimes do ("the screen IS the printed page; every empty box on it is a write box laid exactly over it", `scripts/worksheet-gen/emit/interactive-runtime.js:25-34`; 37 templates ship this today, §A.4). When the learning target *is* the motor act — tracing a letter, copying a word on a ruled row, drawing the other half, cutting — a tap cannot stand in for it, and a page that mixes such a row with a content task still "includes a writing exercise" and is excluded as a whole (a future face without the tracing row is eligible).

**Mechanical test — a template is W (writing) when any of these holds:**

| test | where it is read | note |
|---|---|---|
| the page carries the tracing primitive | `data-lcs-reps` / `data-lcs-rep-mode` / `data-lcs-strokes` emitted only by `scripts/worksheet-gen/primitives/trace-path.js` (grep: 8 `data-lcs-reps`, 6 `data-lcs-strokes`) | ⚠ `data-lcs-stroke` (singular) is a **tally** stroke (`types/_shared/frame-counting.js:135,166`, `graph-tasks.js:318`) and `data-lcs-glyph` is a pictogram/puzzle glyph (`primitives/habit-pictogram.js`, `components-b3/logic-puzzles.js`) — neither is writing; a naive "stroke/glyph" test wrongly excluded 5 templates (K-015, K-452, K-327, K-328, G2-370) before this was measured |
| the family is a writing family | `picture-tracing`, `pre-writing`, `letter-tracing`, `lowercase-letter-tracing`, `number-tracing`, `word-tracing`, `cursive-writing`, `how-to-draw`, `dot-to-dot`, `grid-copy`, `symmetry`, `picture-writing` (`docs/makers/inventory/types.json` `family`) | dot-to-dot, grid-copy and symmetry are *drawing* (a pencil line is the task); the one how-to-draw face that is not drawing (G1-418 "order the steps") is eligible |
| the task is a drawing or free-writing box | `data-lcs-drawbox` / `data-lcs-drawcard` (35 + 9 uses) without a checkable mark; `NO_KEY` reasons "tracing", "trace and write", "draw what the sentence says", "rainbow writing" (`scripts/makers/gates/answer-keys.js:29-39`) | K-443 "one more, one less" has write boxes AND a draw box → W |

### A.2 What "more than one right answer" means

Three different things hide under the phrase; only the first two are excluded.

| class | examples | verdict |
|---|---|---|
| **open task** — no key can mark it | K-012 one-to-one ("any pairing is right", `answer-keys.js:28`), K-345 tick what you can do, K-335 how do I feel, G1-354 build the tangram shadow | **M** excluded |
| **drawn answer set** — the key draws *one* correct example of many | `data-lcs-key-sample` (15 uses) on a page whose task is "colour any N" — K-454 colour the parts of 5 and 10 | **M** excluded by the rule as written; see §D.4-2 |
| **finite declared set** — the page states every accepted answer and the key prints them all | `data-lcs-alts` (`interactive-runtime.js:368-369`: the shipped `type-word` runtime already accepts "\|"-separated alternates — Ordinal Numbers K-320, Family K-370, `lib/family-screen.js`, `lib/ordinal-numbers-screen.js`); G1-454 "make it true" prints the whole set "25–29" (`types/_shared/compare-more.js:11-12`) | **F** — one template today; the screen can check it exactly; operator call §D.4-1 |

A page whose task is "colour / circle any N of M" (K-011 count and colour) is **one** right answer — the count — and the shipped runtime already grades it that way (`ctx.countGroups`: "a shape is right when the number of tapped parts is its want (any parts)", `interactive-runtime.js:449-460`, Fractions precedent). Those are eligible.

### A.3 The marks a page carries, and what the classifier reads

| mark on the page | meaning | read by |
|---|---|---|
| `.ws-answerbox[data-lcs-answer]` | a write box and its answer (`templates/components.js:105-108`) | key layer `scripts/makers/runtime.js:44`; 48 type files emit `data-lcs-answer=` |
| `[data-lcs-answer]` (not a box) | an answer cell (missing letter, glue square) | `runtime.js:48` |
| `[data-lcs-choice]` ×n + `[data-lcs-correct]` ×1 | a chip row: every option is marked, exactly one is right (`components.js:94-100`) | `runtime.js:45`; 55 files emit `data-lcs-correct` |
| `[data-lcs-key-ring]` | a thing to circle (the Nth one, every one like the model) | `runtime.js:50` |
| `[data-lcs-key-badge]` | which number an item matches (matching pages) | `runtime.js:52` |
| `[data-lcs-key-sample]` | the template drew one correct example (open / drawn task) | `runtime.js:37-38`, `answer-keys.js:76` |
| `[data-lcs-card]` | the question container (69 files) | the group of a chip row = its card |
| **legacy marks** `data-lcs-target` (compare-groups, comparing-sizes, position-words, letter-of-the-week, read-and-color), `data-lcs-right` (road-safety, maps), `data-lcs-solution`/`data-lcs-clue` (picture sudoku, `types/g1/G1-158-…:90-93`), `data-lcs-answer-cell`/`-count` (grid-coordinates, symmetry), `data-lcs-key` (103 uses, mostly the key build) | June-batch types mark their answers under their own names; the generic key layer does not see them | **21 print-only templates** carry only legacy marks (measured) |
| no mark at all | the page states the task but never records the answer (K-221 beginning sounds, K-064 position words, the 5 in-scope science sorts, …) | **65 print-only templates** (measured) |

⚠ **The brief's fact "every print-only template already carries its answers" is only two-thirds true.** Of the 368 print-only in-scope templates, 133 carry a generic mark on the page or its key build, 39 carry only a legacy mark, 168 carry none — and of the 196 eligible ones, **107 are generic-marked and 89 are not** (§A.4). Related defect found on the way: compare-numbers shipped K-008 / K-009 / K-010 with `hasKey:false` in `out/makers/compare-numbers/<v>/templates.json` and no `NO_KEY` entry (`answer-keys.js:27-44`) — the gate's own rule (`:90`) fails them on its next run; they mark the bigger group with `data-lcs-target` (`types/_shared/compare-groups.js:4,44`), which the key layer does not read. The S* normalisation of §B.4 fixes the key and the screen in one edit.

### A.4 Totals (811 in scope: `types.json` 887 rows minus 76 `science:true`; the 6 `science-sort`/`science-match` rows flagged `science:false` are in scope and live in the sorting maker, `scripts/makers/topic-map.js` families)

| verdict | count | meaning |
|---|---|---|
| **I** interactive already | **443** | the module declares `interactive:{kind…}`; kinds measured on the modules: tap-choice 312 · type-number 31 · tap-select 29 · tap-spell 21 · trace-path 20 · tap-order 6 · set-clock 6 · type-word 6 · mark-grid 5 · tap-edit 5 · tap-paint 2 (`interactive-runtime.js:60` lists the 11 kinds) |
| **S** will get a screen — generic engine, no template change | **107** | generic marks on the page / key build |
| **S\*** will get a screen — after a marking edit | **89** | 21 legacy-marked + 65 unmarked + 3 whose key draws the whole chart (G1-434/436, G2-394) |
| **S†** will get a screen — special engine that exists | **12** | 7 colour-by-code / read-and-colour → `tap-paint`; 4 grid mazes → `trace-path` (`lib/maze.js` unique path, ARCHITECTURE §17.3 class A); K-373 traffic lights → `tap-paint` |
| **F** finite answer set | **1** | G1-454 — operator call |
| **M** more than one right answer | **5** | K-012, K-335, K-345, K-454, G1-354 |
| **W** writing exercise | **136** | 92 by family · 15 by the tracing primitive · 29 by draw box / NO_KEY / read |
| **X** material, nothing to check | **18** | flash cards, cut-outs, desk strips, fact triangles, memory cards, charts |
| | **811** | |

**Eligible total = 443 + 107 + 89 + 12 = 651 (80 %); paper-only = 136 + 5 + 18 (+1 F) = 160.**

### A.5 Per family (maker in the second column; the per-template appendix is §E)

| family | maker | n | I already | S generic | S* marks to add | S† special | F finite set | M many | W writing | X material |
|---|---|---|---|---|---|---|---|---|---|---|
| number-lines | number-lines | 27 | 21 | 4 | 1 | 0 | 0 | 0 | 0 | 1 |
| number-charts | number-sequences | 26 | 21 | 1 | 4 | 0 | 0 | 0 | 0 | 0 |
| counting-pictures | counting | 20 | 0 | 12 | 5 | 0 | 0 | 1 | 2 | 0 |
| maze-puzzles | mazes | 20 | 20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| picture-tracing | picture-tracing | 20 | 0 | 0 | 0 | 0 | 0 | 0 | 20 | 0 |
| sight-words | sight-words | 20 | 0 | 3 | 1 | 0 | 0 | 0 | 13 | 3 |
| arrays-multiplication | multiplication-division | 17 | 17 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| fractions | fractions | 16 | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| geometry | shapes-geometry | 16 | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| doubles-halves | doubles-halves | 15 | 10 | 4 | 0 | 0 | 0 | 0 | 0 | 1 |
| number-bonds | number-bonds | 15 | 10 | 3 | 1 | 0 | 0 | 0 | 0 | 1 |
| telling-time | telling-time | 15 | 15 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| counting-frames | ten-frames | 14 | 0 | 10 | 1 | 0 | 0 | 1 | 1 | 1 |
| graphing-data | graphs-data | 14 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| money | money | 14 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| column-arithmetic | addition-subtraction | 13 | 12 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| base-ten | place-value | 12 | 0 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |
| measurement | measurement | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| mental-math | addition-subtraction | 12 | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| word-problems | word-problems | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| comparing-numbers | compare-numbers | 11 | 0 | 10 | 0 | 0 | 1 | 0 | 0 | 0 |
| find-the-differences | find-the-differences | 11 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| how-to-draw | how-to-draw | 11 | 0 | 0 | 1 | 0 | 0 | 0 | 10 | 0 |
| dot-to-dot | dot-to-dot | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 |
| multiplication-tables | multiplication-division | 10 | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| patterns | patterns | 9 | 0 | 8 | 1 | 0 | 0 | 0 | 0 | 0 |
| pre-writing | pre-writing | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 9 | 0 |
| color-by-number | color-by-number | 8 | 2 | 0 | 0 | 6 | 0 | 0 | 0 | 0 |
| comparing-sizes | measurement | 8 | 0 | 3 | 5 | 0 | 0 | 0 | 0 | 0 |
| picture-arithmetic | addition-subtraction | 8 | 0 | 8 | 0 | 0 | 0 | 0 | 0 | 0 |
| visual-discrimination | same-different | 8 | 0 | 1 | 7 | 0 | 0 | 0 | 0 | 0 |
| visual-logic | logic-puzzles | 8 | 0 | 5 | 3 | 0 | 0 | 0 | 0 | 0 |
| write-the-word | word-writing | 8 | 0 | 0 | 4 | 0 | 0 | 0 | 4 | 0 |
| word-tracing | word-writing | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 0 |
| 2d-shapes | shapes-geometry | 6 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| animal-fact-file | stories-writing | 6 | 0 | 0 | 2 | 0 | 0 | 0 | 4 | 0 |
| cloze | sentences | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| compound-words | word-meaning | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| cursive-writing | cursive | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| days-and-months | calendar | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| digraphs | phonics | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| division-with-remainder | multiplication-division | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| fact-families | number-bonds | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| family | me-family-feelings | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| feelings | me-family-feelings | 6 | 4 | 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| healthy-habits | health-safety | 6 | 0 | 0 | 4 | 0 | 0 | 0 | 1 | 1 |
| hundreds-chart-puzzles | number-sequences | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| letter-of-the-week | alphabet | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| letter-tracing | letter-tracing | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| logic-puzzles | logic-puzzles | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| lowercase-letter-tracing | letter-tracing | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| maps | maps-grids | 6 | 0 | 5 | 1 | 0 | 0 | 0 | 0 | 0 |
| number-tracing | number-tracing | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| number-walls | logic-puzzles | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| number-words | number-of-the-day | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| odd-and-even | odd-even | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| opposites | word-meaning | 6 | 5 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| ordinal-numbers | ordinal-numbers | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| picture-word-cards | picture-cards | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 |
| pronouns | grammar | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| question-words | sentences | 6 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| read-and-color | reading | 6 | 0 | 0 | 5 | 1 | 0 | 0 | 0 | 0 |
| read-and-do | reading | 6 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| reading-comprehension | reading | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| rhyming-words | rhyming | 6 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| road-safety | health-safety | 6 | 0 | 0 | 5 | 1 | 0 | 0 | 0 | 0 |
| rounding | place-value | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| singular-plural | nouns-articles | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| sound-boxes | phonics | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| spelling-rules | spelling | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| story-sequencing | stories-writing | 6 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| syllable-reading | syllables | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| syllable-split | syllables | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| symmetry | symmetry-grids | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| synonyms | word-meaning | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| tangram | tangram | 6 | 0 | 3 | 0 | 0 | 0 | 1 | 1 | 1 |
| verb-forms | grammar | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| word-classes | grammar | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| word-parts | word-meaning | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| all-about-me | me-family-feelings | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 4 | 0 |
| calendar | calendar | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| capitals-punctuation | sentences | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| phonological-awareness | phonics | 5 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |
| science-sort | sorting | 5 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |
| alphabetical-order | alphabet | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| articles | nouns-articles | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| comparing-groups | compare-numbers | 4 | 0 | 1 | 3 | 0 | 0 | 0 | 0 | 0 |
| grid-coordinates | maps-grids | 4 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 |
| grid-copy | symmetry-grids | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 0 |
| letter-knowledge | alphabet | 4 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 |
| mazes | mazes | 4 | 0 | 0 | 0 | 4 | 0 | 0 | 0 | 0 |
| number-of-the-day | number-of-the-day | 4 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| position-words | position-words | 4 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 |
| sentence-building | sentences | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| picture-writing | stories-writing | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 0 |
| tally-counting | ten-frames | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| visual-matching | same-different | 3 | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| beginning-sounds | phonics | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| cutting-practice | sorting | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| picture-vocabulary | picture-cards | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| sorting-categories | sorting | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| word-building | spelling | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| science-match | sorting | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| **total** | 60 | **811** | **443** | **107** | **89** | **12** | **1** | **5** | **136** | **18** |

(The 5 makers with no family yet — coloring-pages, word-search, crossword, secret-code, bingo — have no rows in `types.json`; their new templates are classified at design time with the same test, §D.1.)

---

## B. The cheapest correct screen for the 196

### B.1 What exists and what it assumes

- A screen today is a **per-type declaration** `interactive: { kind, item, answerAttr, labelAttr, slot|option|tile|slot, metaAttrs, picks, lanes, screenHeight }` on the module (`render/render-instance.js:68,80-83`); render-instance rebuilds the page with `{interactive:true}`, asserts the same `meta` as the printed page (`:70-73`), then **captures geometry in Puppeteer** by `page.evaluate` over `spec.item` (`:289-344`) and `spec.picks` (`:345-354`); `emit/interactive-runtime.js buildInteractive` validates per kind (`:420-568`) and bakes `window.DECK_BUNDLE` + one of 11 JS runtimes (`:590`).
- The makers already decided that the screen renders the **same HTML page** in the student's browser with the tap layer over it in % of `[data-lcs-page]`, the geometry measured by the same renderer — no backdrop JPEG (ARCHITECTURE §3, row "Interactive screen"; `interactive-runtime.js:91,178`). `scripts/makers/runtime.js makePage` already builds page + key from the same seed (`:61-87`) and the key layer is one CSS rule set over the marks (`:43-53`); `build-bundles.js` records `interactive` and `hasKey` per template (`:85,113-119`).
- **Not yet built:** the student play page, the shell's screen preview and the deck preset (BUILD-LOG line 6 "owed: … the student play page"; `:304`). `scripts/makers/shell/shell.js` has colleague sharing only (`shareLink` `:867-887`; strings `share`, `shareTitle`, `shareText` in `frontend/messages/makers/en.json`) and reads `t.interactive` only to decide whether a key exists (`:230`). No file under `scripts/makers/` references `buildInteractive` (grep).

### B.2 Decision: one generic "screen from the marks" engine (recommended) — not 196 per-template screens

**Mechanism.** A template that declares no `interactive` but whose page carries checkable marks gets `screen: 'marks'` in `templates.json`. The student page (and the shell's preview) mounts the same page HTML, waits for `document.fonts.ready`, and derives the tap model from the DOM — the same capture `render-instance.js:289-344` does, generalised over the mark vocabulary instead of a per-type selector:

| mark group on the page | screen kind (existing) | geometry | grading |
|---|---|---|---|
| `.ws-answerbox[data-lcs-answer]` with an integer answer | `type-number` (JS_TYPE `:328-360`) | the box rect; `ctx.maxDigits` = longest answer on the page (never per box — "no length limit tied to the answer", `:29-30`) | `parseInt === answer` (`:343`) |
| `.ws-answerbox[data-lcs-answer]` / `[data-lcs-answer]:empty` with a word | `type-word` (JS_WORD `:362-393`) | the box rect; `ctx.keys` = the locale's letter pad (`:530-536`), `ctx.maxChars` | NFC + `toLocaleLowerCase(locale)` fold, `data-lcs-alts` honoured (`:367-369,379`) |
| a `[data-lcs-card]` (or nearest common ancestor) holding `[data-lcs-choice]`×n with one `[data-lcs-correct]` | `tap-choice` (JS_CHOICE `:167-183`) | each chip rect; one item per card | index of the correct option (`:562-567`) |
| `[data-lcs-pick]`×n (every candidate) with `[data-lcs-key-ring]` on the right ones | `tap-select` (JS_SELECT `:185-202`) | each candidate rect | exact set; or `ctx.countGroups` when the page says "any N" (`:449-460`) |
| `[data-lcs-key-badge]` on items + a labelled target set | **`tap-pair`** — NEW kind (≈ 12 templates: count-and-match, frame match, shadows, twins, opposites, helper↔tool, word↔picture, rainbow pairs) | item rects + target rects | each item's badge = its target |
| bins/palette + items (sorts, picture sudoku, vowels/consonants, syllable sort) | **`tap-place`** — NEW kind, the `tap-paint` interaction (pick a palette entry, tap targets; `JS_PAINT :250-268`) with text/picture palette instead of crayons | palette rects + target rects | exact per target |

Everything else is shared: the Check / Try again / You did it / score / print strings (`runtimeStrings`, `interactive-runtime.js:74-85`, all 11 locales, throws on a missing key), the two-phase fill → reviewed model (`phase="fill"` in every kind), the celebration, the ≥ 48 px controls (`.lcs-btn min-height:48px` `:100`, `.lcs-key min-height:52px` `:154`), keyboard parity (`:354-355`, `:387-388`), the `:focus-visible` rings (`:92,111`), the `aria-pressed` / `aria-label` contract.

**Why generic beats per-template:** the 107 S templates need **zero** template code — their marks are already the answer key's input, and the key gate already proves every answer is on the page (`answer-keys.js:55-78`). A per-template screen costs ≈ 0.5 session each (ARCHITECTURE §11.2 prices the whole template at 0.4–0.6) → ≈ 50–100 sessions for the 196 versus ≈ 5 for the engine + 2 kinds. It also removes a whole class of drift: today a screen and a key can disagree because they are two declarations; under "screen from the marks" **the key and the screen are the same marks** (what the key rings is what the child taps), so the §15 gate 15 `write-screen` rule ("a page with `.ws-answerbox` declares a `type-*` screen", ARCHITECTURE line 598) becomes true by construction.

### B.3 The hard parts, each with its answer

| problem | answer |
|---|---|
| **Which chips are one question?** | the group = the nearest `[data-lcs-card]` ancestor (69 files) or, failing that, the nearest ancestor that contains ≥ 2 `[data-lcs-choice]`; the gate (§B.5) fails a page where a group has 0 or 2+ `data-lcs-correct`, or a `data-lcs-correct` with no siblings — exactly the invariant `buildInteractive` enforces for declared screens (`:563-564`) |
| **Answer-position tells** | the runtime never reveals size or position (no auto-advance, no per-box length cap, `:28-30`); the *page's* tells are the §15 gate 8 `settings-space` job (`qa/guessability.js`) and apply unchanged, because the screen shows the same page — a tell on paper is a tell on screen, nothing new is introduced. One new tell the engine must not add: the order of items in `DECK_BUNDLE.items` must follow DOM order, never "correct first" |
| **Key text that is not what a child types** | `data-lcs-answer` is a *display* string today ("25–29", "…, 28, 29", a unit "3 cm", a letter with a model word). Rule: a write box the screen accepts must carry a **typed** form. Contract: `data-lcs-answer` stays the key text; a template whose key text differs from the typed answer adds `data-lcs-typed="29"` (or `data-lcs-alts="25\|26\|27\|28\|29"` for a finite set, the shipped convention `:368`). The gate fails any `type-*` box whose answer, after fold, is not typeable on the pad (`:535` already throws for declared screens) |
| **Case / locale folding** | the shipped fold: NFC + `toLocaleLowerCase(locale)` + whitespace collapse (`:367`); never `\b`/`\w` (CLAUDE.md §23.6, "`\b` is ASCII-only"); numerals compare as integers (`:343`); Finnish/Swedish letters come from `ctx.keys` (the locale's alphabet + the characters its words use, `:33`) |
| **Tap targets on tablets** | page items scale with the page (ARCHITECTURE §15.1 D2: "the ≥ 44 px gate applies to controls, never to page items"); the gate measures every item's rendered rect at the four widths and **refuses the screen** (template keeps `screen:null`, sentence "the boxes are too small to tap on a phone") when any item < 34 px at 360 px wide — the CSS-cell floor of CLAUDE.md §23.4. Measured risk: chip rows on 4-column cards. The fallback for a too-dense page is `screenHeight` / the one-column cap `JS_TYPE cap()` (`:349-350`), not a smaller gate |
| **Accessibility** | native `<button>`s with `aria-label` from `data-lcs-label` / text (`:177,196,406`), `aria-pressed`, `aria-live` progress (`:580`), `role="dialog"` celebration (`:582`), keyboard digits/letters/arrows (`:354,387`) — all inherited; the engine must set `aria-label` on a chip from its visible text and on a write box from the card's label (the §17.8 `sr-only` rows are not on maker pages — the student page needs a one-line `aria-describedby` instruction = the screen instruction) |
| **Screen instruction ×11** | today each interactive type needs a native-authored instruction in `i18n/interactive-instructions.json` (56 exerciseType keys, 11 locales; `render-instance.js:80` throws without one). For the 196, author **one sentence per screen kind** ×11 (5 kinds × 11 = 55 strings, one native pass) used by default, with a per-template override only where the generic sentence misleads — no per-template fan-out |
| **The answer key** | unchanged: the key page is the same marks with `KEY_CSS` (`runtime.js:84`); for a `screen:'marks'` template the key is now also a *gate* for the screen (same marks) |
| **Pictures that are the answer** (`tap-select` over images) | the capture reads the `<img>` rect; `labels` come from the per-locale vocab slice (`image-cache/resolve.js:62 labels`), never a file name (ARCHITECTURE §15.1 A18) |

### B.4 What must change in templates so the marks are sufficient (the S* work, 89 templates)

| edit | templates | cost |
|---|---|---|
| rename a legacy mark to the generic one: `data-lcs-target` → `data-lcs-correct` on the right group/chip **and** `data-lcs-choice`/`data-lcs-pick` on every candidate | comparing-groups K-008/9/10 (`types/_shared/compare-groups.js:44` — one factory, 3 templates), comparing-sizes 5, position-words 4, read-and-color 5, road-safety 2, maps K-377 | ≈ 0.1 session each; the factories cover several at once; **also fixes the K-008/9/10 missing key** |
| `data-lcs-solution`/`data-lcs-clue` → `data-lcs-answer` on the empty cell + a palette (`tap-place`) | picture sudoku G1-158, G3-348 (`G1-158-…:90-93`) | 0.3 |
| `data-lcs-answer-cell` → `data-lcs-answer` | grid-coordinates 4 | 0.2 |
| stamp the answer the page already knows but never writes: `data-lcs-choice`+`data-lcs-correct` on letter/sound chips, `data-lcs-pick`+`data-lcs-key-ring` on find/circle items, `data-lcs-key-badge` on pairs, a bin id on sort items | the 65 unmarked (phonics 12, letter-knowledge 4, sorts 10, visual-discrimination/matching 10, counting 5, healthy habits 4, …) | ≈ 0.15 each; most share a factory (`sort-to-bins.js`, `card-grid.js`, `chipRow`) |
| the chart faces whose key draws the filled chart as one `data-lcs-key-sample`: mark each blank cell `data-lcs-answer` | G1-434, G1-436, G2-394 (+ G1-435 hidden picture → `data-lcs-pick`/ring) | 0.4 |
| tap-paint for the 6 colour-by-code faces + G1-411 + K-373: the `path[data-lcs-region]` art the two shipped faces already use (`render-instance.js:128-147`, ARCHITECTURE §17.1) | 8 | 1.5 (the pipeline exists for K-393/K-394) |
| trace-path for the 4 grid mazes: export `lib/maze.js`'s graph as `ctx.trace {nodes, edges, routes}` (`interactive-runtime.js:270-278,487-494`) | 4 | 1 |

Rule for new templates (ARCHITECTURE §11.2 scaffold): a template is written **marks-first** — `data-lcs-answer` / `data-lcs-choice`+`data-lcs-correct` / `data-lcs-pick`+`data-lcs-key-ring` / `data-lcs-key-badge` / bin ids — and gets its key and its screen for free; it declares `interactive:{…}` only for a kind the marks cannot express (spell, trace, clock, grid, edit, paint).

### B.5 The gate that proves every eligible template works — and fails a broken one

`scripts/makers/gates/screen-from-marks.js`, Puppeteer, per built maker, every `screen:'marks'` template × 3 levels × en + fi (the long-word locale, the `answer-keys.js:93` convention) × 2 seeds:

1. **derivation** — the DOM-derived model passes `buildInteractive` unchanged (the kind's validator: ≥ 2 items, exactly one correct per group, answers typeable, rects inside the page, `:424,:562-567,:495-503,:528-537`);
2. **parity with the key** — the set of (group, answer) the engine derives equals the set the key layer marks (`answer-keys.js audit()` `:56-78` re-used); a mark the key shows and the screen does not grade, or the reverse, fails;
3. **solvable** — a bot fills every right answer from the marks → Check → every item `data-state="right"` and the celebration opens; a bot that fills every WRONG candidate → every item `wrong`; a bot that fills all but one → Check stays disabled (`:172,:333`);
4. **no tell** — `DECK_BUNDLE.items` order = DOM order; no item carries its answer in a visible attribute the runtime did not need (`data-lcs-answer` must be stripped from the served DOM of the screen page — the answers travel only in `DECK_BUNDLE.answers`, "on the page by necessity", `:49-50`; the play shell removes the mark attributes before mount);
5. **tap floor** — at 360/768/1024 every item rect ≥ 34 px, every control ≥ 44 px, nothing outside the page (`inPage`, `:426`);
6. **strings** — the screen instruction resolves in all 11 locales a template ships in; `runtimeStrings` for all 11;
7. **poison, both directions, every run** — a card with two `data-lcs-correct` must fail (1); a key ring the engine ignores must fail (2); a runtime whose Check marks a wrong answer right must fail (3); an item with `data-lcs-answer` left on the screen DOM must fail (4); a chip shrunk to 20 px must fail (5); a correct template must pass all of it.

Wired into `scripts/makers/gate.js` next to `answer-keys.js`; HARD in `deploy.sh` with the rest of §15 when the makers go live.

### B.6 What stays exactly as it is

- The **443 declared screens** and their 11 runtimes, geometry capture and gates — untouched (0 lines; the generic engine is additive: `screen: kind | 'marks' | null`).
- The family screen libraries (`lib/doubles-halves-screen.js`, `family-screen.js`, `ordinal-numbers-screen.js`, …) and `type-cross` (ENGINES Part 3 §B).
- The key layer `KEY_RULES` (`runtime.js:43-53`) — it gains no rule; `tap-pair`/`tap-place` reuse `data-lcs-key-badge` and bin ids the key already understands or draws.
- `NO_KEY` keeps its 16 entries (`answer-keys.js:27-44`); K-389 ("fill-in sentences … OPEN") is S once the key-on-row seating lands — the screen does not wait for the key's typography.

---

## C. SEO and domain authority when teachers share with students

### C.1 Facts that bound the design

| fact | where |
|---|---|
| A student link is **link-is-the-capability**: no student auth, ever; teacher lapsed → kid-safe paused page | `frontend/app/play/w/[linkId]/route.ts:9-34` (hosted worksheets), ARCHITECTURE §8.2 |
| The two precedents both **noindex** user-made play pages: hosted worksheets `X-Robots-Tag: noindex, nofollow` + `Cache-Control: private` (`route.ts:36-41`); deck share links `302` to the deck's canonical page with `X-Robots-Tag: noindex` ("the canonical deck page is the indexable surface, not the alias", `frontend/app/play/[linkId]/route.ts:7-14,36`) | |
| The maker design already fixes `/s/<linkId>` = static shell, `noindex` meta + header, recipe JSON edge-cached 300 s (`ARCHITECTURE.md:377-387`); the maker screen itself is `noindex, follow` (`scripts/makers/shell/index.html:6`; ARCHITECTURE §13 "the landing is the indexable page") | |
| Plays are metered: 10 per UTC day for anonymous and free alike, by an `lcs_anon_id` cookie per browser (`frontend/lib/quota.ts:30-32,56-60`); subscribers and crawler UAs unlimited (`:173,206`; bot identity `:41-43,101-103`, `BOT_UA_PATTERN :40-41` — includes facebookexternalhit, whatsapp, telegrambot, slackbot, discordbot, twitterbot, linkedinbot) | |
| Level Set precedent: **noindex decks under one indexable hub per searched topic** — 146 hubs live 2026-10-28, GSC check due 2026-11-25 (memory `project_level_set_hub_pages`) | |
| Deck embed snippet = **bare iframe, attribution inside** (operator-locked 2026-05-05, `REFERENCE TRANSLATIONS/catalog-export.js:1375-1381`) — but CLAUDE.md §1 states "backlinks = the visible `<a href>` tags OUTSIDE the iframe (wrapper + caption with brand+keyword anchors), not the iframe itself" and that the backlink target and the iframe src must be two different variables (`catalog-export.js:1423-1430`) | the maker snippet follows §1 (wrapper + caption), the deck snippet is not touched (§21.5a) |
| Every deck page carries the site chrome: brand link (`scripts/lib/site-chrome.js:418`), nav worksheets/activities/tools/makers (`:446-449`), 11 locale links with `hreflang` (`:472-474`), footer (`:479-484`), hidden when framed (`body.lcs-embedded`, `:388`) | the student page reuses it |
| hreflang single SoT `frontend/lib/seo/hreflang.ts:22-34` (pt → pt-BR), `x-default` only when an English URL exists (`:47-58`) | |
| `robots.txt` disallows `/api/` (`frontend/public/robots.txt:10,72`) — the recipe JSON is never crawled; no rule touches `/s/` or `/play/` | |
| §21.7: every `text/html` surface declares canonical or robots before merge; nginx `X-Robots-Tag` satisfies it (`scripts/preflight-indexable-routes.js:24-29`, `NGINX_COVERED_PATHS :78`); the nginx idiom is `add_header X-Robots-Tag "noindex, indexifembedded" always;` (`scripts/publish-cli/patch-nginx-deck-noindex.py:34`) | |
| §21.5a churn freeze: no mutation of existing indexed pages' identity or metadata; additive surfaces are fine. §21.8-C: a product rename must re-check the teardown 410s — `/s/` is in neither `REMOVED_PREFIXES` (`frontend/middleware.ts:91`) nor `SHOPIFY_LEGACY_PREFIXES` (`:100`). ⚠ But the middleware **matcher** carves out `play/`, not `s/` (`:361-362`): without an `s/` carve-out (or nginx serving `/s/` before Next, as it does `/play/w/`), a student link would be rewritten by the intl middleware into `/<loc>/s/…` and 404. Build note for P5 | |
| Logging: `lcs_seo` format with `$http_cf_connecting_ip` (`scripts/publish-cli/patch-nginx-seo-logging.py:69`) — the only way to verify Googlebot and to count real 200s (CLAUDE.md §21.8-B) | |

### C.2 Index, canonical or noindex — the decision and the reasoning

Three options, two of them wrong:

1. **Index the student pages.** Thousands of pages per template that differ by seed and theme; the page is a worksheet body with a 1–2-line instruction (thin); it would cannibalise the 363 old landings (operator rule: they keep their SEO, ARCHITECTURE §13) and the new maker landings; it is user-generated content that can carry a teacher's typed title or words (privacy, §C.8); and it is metered — Google would see the play wall class on the 11th fetch only through the bot bypass, which is cloaking-adjacent. **Rejected.**
2. **`rel=canonical` to the matching indexable landing (`/<loc>/tools/<maker>`).** Google honours a cross-page canonical only between near-duplicates; a worksheet body and a prose landing are not, so the hint is ignored at best and the student page gets indexed anyway at worst (the 2026-05-26 → 07-10 lesson: signals Google distrusts are worse than none, CLAUDE.md §21.5a). And it **cannot** be combined with noindex — a noindex page's canonical is a contradiction Google resolves by ignoring one of them. **Rejected.**
3. **`noindex` (not `nofollow`) on every student page, with visible followable links to the indexable pages.** This is the shipped precedent for decks and Level Sets, the ARCHITECTURE §8.2 design, and the only option consistent with §21.5a. The honest caveat: Google has said that a page kept noindex long-term is eventually treated as `noindex, nofollow` — so **the student page itself is not where link equity is earned.** It is earned where the link *lives* (§C.3). **Recommended.**

Header AND meta: nginx `add_header X-Robots-Tag "noindex" always;` on `location /s/` (the patch idiom above; register the path in `NGINX_COVERED_PATHS` so §21.7 stays green) plus `<meta name="robots" content="noindex">` in the shell for the case the page is served by Next (§C.6). Never `indexifembedded` here (deck.html uses it because deck embeds *are* the indexable deck; a student page embedded on a blog must stay out of the index). No hreflang (noindex pages declare none; a cluster of noindex alternates is noise), no sitemap entry, no JSON-LD `LearningResource` with a `url` of its own — JSON-LD on a noindex page is ignored; the structured data lives on the landing.

### C.3 Where the domain authority actually comes from

| channel a teacher uses | what reaches us | what the page must do |
|---|---|---|
| Google Classroom, Teams, Seesaw, ClassDojo, WhatsApp, e-mail | **traffic + brand, no link equity** (closed, nofollow or not crawled). ~95 % of K-3 sharing | unfurl well (§C.5), load fast on a 2019 iPad, carry the brand and a "make your own" path for the parent who sees it over the child's shoulder |
| a public class blog, a school website, a teacher's Padlet/Wakelet, Pinterest, a forum | **a backlink**, IF the page offers one that points at an indexable URL | the **embed snippet** (§C.4) and the share sheet's "copy a link to this worksheet maker" both target the **landing**; the student link itself is what they paste when they want the child to play — so the student page's visible chrome links (brand, maker landing, worksheets hub) are what a crawler following from the blog finds |
| a child typing the QR / short link on a tablet | nothing for SEO | the URL must be short (§C.4) |

Hence the one design rule: **every outward-facing text that a human can copy points at an indexable page; the only thing that points at `/s/<id>` is the thing a child must open.**

### C.4 URL design

`https://www.lessoncraftstudio.com/s/<linkId>` — as ARCHITECTURE §8.2, kept:

- **www** form (CLAUDE.md §A.10: apex 301s and the apex/www mismatch broke the embed auto-resize listener once).
- **no locale prefix, no keyword slug.** The page is noindex, so a slug carries no ranking value; a short id survives a QR code, a Teams card and a child's typing; the locale is in the recipe (`lang`, ARCHITECTURE §5.1) and the shell sets `<html lang>` from it before paint (the SSR head of §C.6 knows it from the one DB read). A locale-prefixed `/de/s/…` would also collide with the `[locale]` route tree's 404 behaviour for unknown segments (the reason deck play links live at `/play/`, `play/[linkId]/route.ts:10-11`).
- `linkId` = the `generateHostedLinkId` alphabet, 12 chars, `MakerShareLink.linkId @unique` (ARCHITECTURE §8.1 schema; `core.ts:62-68`).
- The share sheet shows **three things**, in this order: the student link (+ QR, copy), the embed snippet (§C.5), and "Link to this worksheet maker" = the **landing** URL `/<loc>/tools/<maker-slug>` (the indexable page; from `frontend/lib/seo/maker-content.ts` `MakerEntry.slug`). The colleague link stays `/<loc>/tools/<slug>?m=<linkId>` (ARCHITECTURE §8.2) — it opens an indexable URL with a query, which Google treats as the landing (self-canonical, `tools/[tool]/page.tsx:85-91`).

### C.5 The embed snippet (backlinks outside the iframe, CLAUDE.md §1)

```html
<div class="lcs-embed" style="max-width:720px;margin:0 auto">
  <iframe src="https://www.lessoncraftstudio.com/s/k7x2m9q4pa3b?embed=1" title="Zähle und kreise ein – interaktives Arbeitsblatt"
          width="100%" height="900" loading="lazy" style="border:0;border-radius:12px"></iframe>
  <p style="font:14px/1.4 Nunito,sans-serif;margin:8px 0 0">
    <a href="https://www.lessoncraftstudio.com/de/tools/zaehlen-arbeitsblatt-generator/">Zählen-Arbeitsblatt</a>
    erstellt mit <a href="https://www.lessoncraftstudio.com/de/">LessonCraftStudio</a>
  </p>
</div>
```

- The iframe src is the student link (`?embed=1` → `body.lcs-embedded` hides the site chrome exactly as deck.html does, `site-chrome.js:384-388`; the auto-resize `postMessage` reuses the deck listener contract, `catalog-export.js:1427-1428`).
- The caption's two anchors are the backlinks: **keyword anchor → the maker landing in the page's language** (the `MakerEntry.name` of that locale, never English on a non-English page — the F5 rule, ARCHITECTURE §4.1a) and **brand anchor → the locale root**. Both indexable, both already carrying hreflang and canonical. Removing the caption must *look* broken (CLAUDE.md §1: "visible-load-bearing, NOT technically-enforced") — the caption is the iframe's visible title, there is no title bar inside the frame when embedded.
- The snippet is generated in the shell (strings ×11 in `frontend/messages/makers/<loc>.json`: `embedTitle`, `embedMadeWith`, `embedCopy`), never by the engine; a gate asserts the two hrefs resolve to 200 indexable pages for every locale the maker ships in (the `preflight-tool-registration` shape, CLAUDE.md §21.5).

### C.6 OG / Twitter cards for pasted links (the one departure from "static shell")

Classroom, Teams, WhatsApp and Slack unfurl a link by fetching the HTML **without running JS** — a static shell shows the same generic card for every link. For the card to say *Count and Circle · farm animals · Level 2* with the page's picture, the `<head>` must be filled per link at fetch time. Two ways; recommended: **(a) `/s/<linkId>` is a Next route handler** (the `play/w/[linkId]/route.ts` shape) that does ONE Postgres read (`MakerShareLink` → recipe title, maker, template, locale, theme), fills `<title>`, `og:title`, `og:description`, `og:image` (= the per-locale template thumbnail that already exists at `makers/<maker>/<v>/thumbs/<loc>/<type>.webp`, ARCHITECTURE §11.3 — no new image pipeline, no og-image Sharp work), `og:image:alt`, `twitter:card=summary_large_image` (the landing precedent `scripts/seo-landing/render-landing-html.js:1331-1333`), `<html lang>`, the robots meta — and returns the same static shell body with `Cache-Control: public, s-maxage=300` so Cloudflare serves the viral case (ARCHITECTURE §8.2 already departs from the hosted-worksheet `private` cache for the recipe JSON; the same reasoning holds for the head). Revocation propagates ≤ 5 min (CLAUDE.md §15.8). Alternative (b) nginx alias + generic card: zero origin work, but every shared link looks the same in every chat — it loses the one conversion surface closed systems give us. Cost of (a): ≈ 0.5 session more than (b); one statement per 5 min per link; `force-dynamic` + `limit_req` as ARCHITECTURE §10.1.

`og:image` is the template's **sample** page in the recipe's language (title visible, no teacher words — §C.8), 320 px WebP is too small for `summary_large_image` (min 300×157, recommended 1200×630): generate the thumb set at 640 px for the card, or compose the 1200×630 card from the thumb with the existing two-column OG composite (`scripts/publish-cli/og-image.js`, CLAUDE.md §15.14) at **build time per template × locale** — never per link.

### C.7 Crawlers, the play meter, caching

- Crawler UAs are `kind:'bot'` → unlimited (`quota.ts:41-43,101-103,173,206`): a social unfurler or Googlebot never sees the play wall; the page it sees is `noindex`, so nothing is indexed and nothing is cloaked (the crawler gets the same HTML a child gets; only the meter call differs, and the meter is a `fetch` after load).
- The meter call is `POST /api/quota/check-and-increment {kind:'play'}` once per load (ARCHITECTURE §9); `/api/` is `Disallow` in robots.txt (`:10`) and `no-store`.
- Cloudflare: the shell body + every bundle/data/picture is immutable (`/makers*/`, ARCHITECTURE §2.3); the SSR head is `public, s-maxage=300`; **never** `access_log off` on `/s/` (CLAUDE.md §21.8-B) — it is the measurement surface.
- ⚠ **Shared classroom devices.** The anonymous identity is a per-browser cookie (`quota.ts:56-60`), so 25 children on one classroom iPad are *one* identity and the 11th child hits the wall (`PLAYS_PER_DAY = 10`, `:31`). The deck pages already have this exposure (memory `project_deck_page_metering`: "wall at the 11th play"); a student link makes it the common case. Operator decision §D.4-4; recommendation there.

### C.8 Privacy (children)

- The student page shows **no teacher name, no e-mail, no class name**; the title is the recipe's title (the teacher may have typed it — the share sheet says so in one line and the §4.4 title gate already bans > 3 lines); no `own[]` photos ever leave the browser (ARCHITECTURE §7.2, OPEN-DECISIONS #4 → the share button is disabled with the reason).
- No student input is stored, no cookie is set by the page beyond the existing `lcs_anon_id` meter cookie, no third-party script, no analytics beacon (counts come from nginx logs, ARCHITECTURE §8.1 "no view counters in Postgres").
- The embed iframe is **not** sandboxed-opaque like hosted worksheets (`play/w route.ts:14-28` sandboxes *teacher-supplied HTML*); here the HTML is ours, built from a recipe — the recipe's only free text (title, instruction, words) is HTML-escaped by the page shell (`page/shell.js`) and gated.
- A revoked link (`MakerShareLink.revokedAt`) returns the kid-safe "taking a break" page (`play/w route.ts:43-55` strings ×11, reuse verbatim), `noindex`, 404-class status.

### C.9 The recommended design, in one table

| item | decision |
|---|---|
| URL | `https://www.lessoncraftstudio.com/s/<12-char id>`; `?embed=1` for iframes |
| served by | Next route handler (one DB read → head + static shell), `Cache-Control: public, s-maxage=300`; the shell body, bundle, data, pictures from `/makers*/` immutable |
| robots | `X-Robots-Tag: noindex` (nginx, `always`) + `<meta name="robots" content="noindex">`; no canonical, no hreflang, no sitemap, no JSON-LD on the page |
| visible links (all indexable targets) | header: brand → `/<loc>/` · "Make your own" → `/<loc>/tools/<maker-slug>` (with `?preset=` the §13 preset when the recipe came from a deck) · footer: worksheets hub, makers, 11 locale links with `hreflang` attributes (the `site-chrome.js` footer, `:446-484`) — hidden under `?embed=1` |
| embed snippet | §C.5 — iframe + caption with two anchors to indexable pages |
| cards | per-link OG/Twitter from the recipe (title, template, theme, level) + the template's per-locale sample image |
| metering | `play` once per load; crawler bypass as today; §D.4-4 for subscribers' links |
| privacy | §C.8 |
| measurement | nginx `lcs_seo` log: 200s on `/s/` by day, `$http_referer` host (classroom.google.com, teams.microsoft.com, wa.me, blogs), verified-Googlebot fetches (expect: fetched, not indexed); GSC: "Excluded by noindex tag" count for `/s/` grows = discovered; **Links → Top linking sites** shows embed captions (the only true SEO metric of this feature); `/<loc>/tools/<maker>` impressions/clicks vs the same-age Level Set hubs (check due 2026-11-25); the `make`/`play` quota rows per day; Cloudflare cache-hit ≥ 98 % on `/makers*/` |
| cost | ≈ 5 sessions (route + head + share sheet + embed + gates + nginx + privacy strings ×11 native-checked); ≈ 1 of these is already inside P3/P4 of ARCHITECTURE §14.1 |

---

## D. Amendments, build order, cost, decisions

### D.1 Precise amendments to `docs/makers/ARCHITECTURE.md` (listed, not applied)

1. **§3 row "Interactive screen"** — add: "A template gets a screen in one of two ways: a declared `interactive:{kind…}` (today's 443) or `screen:'marks'`, derived in the browser from the page's answer marks (§B.2 of INTERACTIVE-AND-SHARING). The derivation is the same % capture; the runtimes are the same; two new kinds `tap-pair` and `tap-place`."
2. **§5.1 recipe** — `"screen": true` becomes `"screen": "auto" | false` (auto = the template's `screen` field decides; false = the teacher switched it off). Add nothing else; the link kind stays `student | colleague`.
3. **§8.2 URLs** — replace the `/s/<linkId>` row: served by a Next route handler that fills the `<head>` from one read and returns the static shell; `public, s-maxage=300`; `X-Robots-Tag: noindex` + meta; the colleague link unchanged. Add the embed snippet contract (§C.5) and the rule "every copyable text targets an indexable page".
4. **§9 metering** — add the shared-device note and whichever answer the operator gives to §D.4-4.
5. **§11.1 `templates.json`** — `"screen": "tap-choice" | … | "marks" | null`, plus `"screenInstruction": "generic:<kind>" | "<key>"`; the sentence "otherwise the student link shows the printable" becomes "a template with `screen:null` (W / M / X) shares as the printable with a Print button".
6. **§11.2 scaffold** — a new template is written marks-first (§B.4 rule); `new-template.js --screen=` accepts `marks`.
7. **§12 i18n** — the 5 generic screen instructions ×11 as a new row (`i18n/interactive-instructions.json` `_generic.<kind>`), native-reviewed once.
8. **§13 old landings** — unchanged; add: the student page's "Make your own" and the embed caption point at the landing (old or new) that `maker-content` names for that maker and locale — never at `/makers/app/`.
9. **§15 gate table** — add gate 16 `screen-from-marks` (§B.5) and gate 17 `share-surface` (noindex header+meta on `/s/`, OG fields present, the two caption hrefs 200 and indexable ×11, no teacher identity string on the page, `?embed=1` hides chrome); gate 15's `write-screen` rule now reads "a page with `.ws-answerbox` has `screen` ∈ {type-number, type-word, marks}".
10. **§15.1 D6** — "a writing page gets a writing screen" is re-worded: "a page where the child writes a number or a word gets a type screen (operator ruling 2026-11-01); a page where the child *practises writing* gets no screen".
11. **§18 / OPEN-DECISIONS** — add the five decisions of §D.4.

### D.2 Impact on the build order

- **The 9 built makers** (3 pilot + B1 #1–#6, `out/makers/versions.json`) need: the generic engine (once), and the S* edits — counting 5 (K-007, K-011, K-030, K-059, K-070), ten-frames 1 (K-024), sight-words 1 (K-392), number-sequences 4 (G1-434/435/436, G2-394), number-lines 1 (G3-406), number-bonds 1 (K-458), compare-numbers 3 (K-008/9/10 — also closes their missing-key gap) = **16 templates ≈ 2.5 sessions**, plus a re-run of the slots/answer-keys/parity gates (catalogue output must stay byte-identical: the marks are attributes, invisible on paper; the slots gate's HEAD comparison proves it, `scripts/makers/gates/slots.js:4-9`).
- **The remaining 51 makers** adopt it per maker inside their existing plan-mode contract: the per-maker ENGINES note gains one line per template — I / S / S* / S† / W / M / X — from §E; S costs nothing, S* ≈ 0.15 session each, the 5 family-less makers classify their new templates at design.
- **Order:** engine + two kinds + gate **before B2** (it is platform work and the 9 built makers are its proving ground; it also unblocks the owed "student play page" of BUILD-LOG line 6) → the 16 retrofits → the student page + sharing (§C) → then B2 onward with the rule in force. Nothing here moves the 60-makers-then-one-release rule (BUILD-LOG line 8).

### D.3 Honest cost (sessions)

| work | sessions |
|---|---|
| generic marks engine (browser derivation, strip-answers-before-mount, generic instructions ×11 with one native pass) | 3 |
| `tap-pair` + `tap-place` kinds, validators, poison tests | 2 |
| gate `screen-from-marks` + gate `share-surface` | 1.5 |
| S* marking edits, 89 templates (16 in built makers; factories cover several at once) | 11–13 |
| S† tap-paint ×8 + grid-maze trace-path ×4 | 2.5 |
| student page route + head/OG + share sheet + embed snippet + nginx + privacy strings ×11 | 5 (≈ 1 already in P3/P4) |
| **total on top of the ≈ 450** | **≈ 25–28** |

Versus per-template screens for the 196: ≈ 50–100 sessions and a permanent screen-vs-key drift surface.

### D.4 Decisions only the operator can make (each with a recommendation)

1. **Finite declared answer sets (G1-454 "make it true" today; `data-lcs-alts` in general).** The rule says "more than one right answer" is excluded; the shipped runtime already checks a declared set exactly (`interactive-runtime.js:368-369`). *Recommendation:* treat a **declared finite set that the key prints in full** as one answer and keep G1-454 eligible — the screen accepts exactly what the key accepts. Cost: none. If declined: G1-454 moves to M (paper-only), no other template is affected today.
2. **"Colour / circle any N of M" pages (K-454; K-011 and any future "colour N" face).** The count is the answer; the shipped `countGroups` grading treats it so (`:449-460`, Fractions). *Recommendation:* eligible as one answer; K-454 moves from M to S* (cost 0.2). If declined: K-011 also becomes M.
3. **Dot-to-dot as a tap-order screen.** Excluded as drawing under the rule; the `tap-order` runtime (`:10-13`) would give the 10 faces a one-right-order screen at ≈ 1 session. *Recommendation:* keep excluded now (the pencil line is the point of dot-to-dot); revisit after the 60 are built.
4. **Play meter on student links from a subscribing teacher.** Today every child's device is metered at 10 plays/day (`quota.ts:31,56-60`); a shared classroom iPad walls the 11th child. *Recommendation:* a student link minted by a **subscriber** bypasses the per-device play meter (the teacher's subscription is the entitlement — the hosted-worksheet model, `play/w route.ts:32-34,98`); links from free accounts keep the meter. Cost: one field in the `/api/makers/links/<id>` response + one branch in the play shell; no change to `quota.ts`. Alternative: raise `PLAYS_PER_DAY` for `/s/` only (weaker: it also lifts the wall for scraped links).
5. **Per-link social cards (SSR head) vs a fully static shell.** *Recommendation:* SSR head (§C.6) — ≈ 0.5 session, one cached read per 5 min per link, and it is the only conversion surface a closed system gives us. If declined: static shell with one generic card per locale.

Not a decision, recorded: the deck embed snippet stays bare-iframe (operator lock 2026-05-05) — the maker snippet follows CLAUDE.md §1 instead; both coexist, no deck.html is rewritten (§21.5a).

---

## E. Appendix — every in-scope template by family and verdict

Legend: **I** screen already · **S** generic engine, no edit · **S\*** screen after a marking edit · **S†** special engine that exists · **F** finite set (operator) · **M** more than one right answer · **W** writing exercise · **X** material. Family → maker from `scripts/makers/topic-map.js`.

- **2d-shapes** → shapes-geometry: **I** K-368 K-371 G1-381 G1-382 G1-383 · **W** K-372
- **all-about-me** → me-family-feelings: **M** K-345 · **W** K-323 K-342 K-343 K-346
- **alphabetical-order** → alphabet: **I** G1-245 G1-262 G1-263 G1-264
- **animal-fact-file** → stories-writing: **S\*** G2-339 G2-340 · **W** G2-318 G2-341 G2-342 G2-343
- **arrays-multiplication** → multiplication-division: **I** K-027 G1-110 G1-111 G2-209 G2-210 G2-211 G2-212 G2-213 G2-216 G2-217 G3-301 G3-302 G3-309 G3-311 G3-312 G3-313 G3-314
- **articles** → nouns-articles: **I** K-288 K-306 K-307 G1-292
- **base-ten** → place-value: **S** G1-120 G1-121 G1-122 G1-133 G2-203 G2-205 G2-206 G2-222 G2-223 G2-224 G2-225 G2-227
- **beginning-sounds** → phonics: **S\*** K-221 K-228
- **calendar** → calendar: **I** G2-277 G2-296 G2-297 G2-298 G2-312
- **capitals-punctuation** → sentences: **I** G2-274 G2-281 G2-282 G2-307 G2-311
- **cloze** → sentences: **I** G1-350 G1-366 G1-367 G1-368 G2-349 G2-350
- **color-by-number** → color-by-number: **I** K-393 K-394 · **S†** K-241 K-265 K-266 K-267 K-268 K-269
- **column-arithmetic** → addition-subtraction: **I** G2-251 G2-255 G2-256 G2-257 G2-258 G2-259 G3-357 G3-359 G3-360 G3-361 G3-362 G3-363 · **S** G2-397
- **comparing-groups** → compare-numbers: **S** G1-114 · **S\*** K-008 K-009 K-010
- **comparing-numbers** → compare-numbers: **S** K-460 G1-135 G1-136 G1-137 G1-453 G2-219 G2-220 G2-398 G2-399 G3-325 · **F** G1-454
- **comparing-sizes** → measurement: **S** K-033 K-034 K-036 · **S\*** K-032 K-035 K-037 K-040 K-079
- **compound-words** → word-meaning: **I** G2-316 G2-329 G2-330 G2-331 G2-332 G2-333
- **counting-frames** → ten-frames: **S** K-004 K-017 K-018 K-448 K-449 K-450 K-451 K-452 G1-105 G1-106 · **S\*** K-024 · **M** K-454 · **W** K-005 · **X** K-453
- **counting-pictures** → counting: **S** K-002 K-006 K-013 K-016 K-028 K-029 K-031 K-060 K-442 K-444 K-445 K-447 · **S\*** K-007 K-011 K-030 K-059 K-070 · **M** K-012 · **W** K-443 K-446
- **cursive-writing** → cursive: **W** G2-377 G2-384 G2-385 G2-386 G2-387 G3-401
- **cutting-practice** → sorting: **X** K-240 K-264
- **days-and-months** → calendar: **I** K-321 K-337 G1-319 G1-320 G1-321 G1-322
- **digraphs** → phonics: **I** K-378 G1-380 G1-392 G1-393 G1-394 G2-372
- **division-with-remainder** → multiplication-division: **I** G3-377 G3-380 G3-381 G3-382 G3-383 G3-384
- **dot-to-dot** → dot-to-dot: **W** K-285 K-294 K-295 K-296 K-308 K-309 G1-285 G1-294 G2-304 G2-314
- **doubles-halves** → doubles-halves: **I** G1-247 G1-270 G1-271 G1-286 G1-287 G1-288 G1-296 G1-297 G1-298 G1-299 · **S** K-459 G1-449 G1-450 G1-451 · **X** G1-452
- **fact-families** → number-bonds: **I** G1-209 G1-219 G1-220 G1-221 G1-222 G3-369
- **family** → me-family-feelings: **I** K-370 G1-385 G1-386 G2-362 · **W** K-375 · **X** G1-387
- **feelings** → me-family-feelings: **I** K-319 K-331 K-333 K-334 · **M** K-335 · **W** K-332
- **find-the-differences** → find-the-differences: **I** K-395 K-397 K-398 K-399 K-400 G1-412 G1-413 G1-414 G1-415 G2-388 G2-389
- **fractions** → fractions: **I** G2-228 G2-229 G2-230 G2-231 G2-232 G2-233 G2-234 G3-315 G3-316 G3-317 G3-318 G3-319 G3-320 G3-321 G3-322 G3-343
- **geometry** → shapes-geometry: **I** K-075 K-076 G2-241 G2-242 G2-243 G2-244 G2-245 G2-246 G2-247 G2-248 G3-337 G3-338 G3-339 G3-340 G3-341 G3-342
- **graphing-data** → graphs-data: **I** G1-141 G1-142 G1-143 G1-144 G1-146 G1-147 G2-237 G2-238 G2-239 G2-240 G3-332 G3-333 G3-334 G3-335
- **grid-coordinates** → maps-grids: **S\*** G2-279 G2-302 G2-303 G2-308
- **grid-copy** → symmetry-grids: **W** K-286 K-298 K-299 K-300
- **healthy-habits** → health-safety: **S\*** K-382 G1-403 G1-404 G2-379 · **W** K-380 · **X** G1-405
- **how-to-draw** → how-to-draw: **S\*** G1-418 · **W** K-396 K-401 K-402 K-403 K-404 G1-416 G1-417 G1-419 G2-390 G2-391
- **hundreds-chart-puzzles** → number-sequences: **I** G1-310 G1-347 G1-348 G2-321 G2-322 G2-323
- **letter-knowledge** → alphabet: **S\*** K-222 K-223 K-229 K-230
- **letter-of-the-week** → alphabet: **W** K-317 K-325 K-326 K-327 K-328 G1-311
- **letter-tracing** → letter-tracing: **W** K-238 K-254 K-255 K-256 K-257 K-258
- **logic-puzzles** → logic-puzzles: **I** G1-349 G2-319 G2-344 G2-345 G3-378 G3-379
- **lowercase-letter-tracing** → letter-tracing: **W** K-278 K-279 K-280 K-281 K-282 K-283
- **maps** → maps-grids: **S** G1-379 G2-369 G2-370 G2-371 G3-396 · **S\*** K-377
- **maze-puzzles** → mazes: **I** K-405 K-406 K-407 K-408 K-409 K-410 K-411 K-412 K-413 G1-420 G1-421 G1-422 G1-423 G1-424 G1-425 G1-426 G1-427 G1-428 G2-392 G2-393
- **mazes** → mazes: **S†** K-242 K-270 K-271 K-272
- **measurement** → measurement: **I** K-038 G1-139 G1-140 G2-235 G2-236 G2-252 G2-260 G2-261 G2-262 G2-263 G3-345 G3-346
- **mental-math** → addition-subtraction: **I** G1-208 G1-214 G1-215 G1-216 G1-217 G1-218 · **S** G1-442 G1-443 G1-445 G1-446 G1-447 G1-448
- **money** → money: **I** G1-211 G1-228 G1-229 G1-230 G1-231 G1-232 G2-276 G2-289 G2-290 G2-291 G2-292 G2-293 G2-294 G2-295
- **multiplication-tables** → multiplication-division: **I** G3-358 G3-364 G3-365 G3-366 G3-367 G3-368 G3-402 G3-403 G3-404 G3-405
- **number-bonds** → number-bonds: **I** K-243 K-273 K-274 K-275 K-276 K-277 K-414 K-415 K-416 K-417 · **S** K-456 K-457 G1-440 · **S\*** K-458 · **X** G1-441
- **number-charts** → number-sequences: **I** K-019 K-020 K-021 K-022 K-023 G1-123 G1-124 G1-125 G1-126 G1-129 G1-130 G1-131 G1-132 G2-207 G2-208 G2-218 G2-226 G3-326 G3-327 G3-328 G3-329 · **S** G1-437 · **S\*** G1-434 G1-435 G1-436 G2-394
- **number-lines** → number-lines: **I** G1-116 G1-117 G1-118 G1-119 G1-138 G1-248 G1-274 G1-275 G1-276 G1-277 G1-278 G1-279 G1-280 G1-281 G1-295 G2-221 G2-305 G2-310 G3-308 G3-310 G3-323 · **S** G1-438 G1-439 G2-395 G2-396 · **S\*** G3-406 · **X** K-455
- **number-of-the-day** → number-of-the-day: **S** G1-243 G1-255 G1-256 G1-257
- **number-tracing** → number-tracing: **W** K-237 K-249 K-250 K-251 K-252 K-253
- **number-walls** → logic-puzzles: **I** G1-246 G1-266 G1-267 G1-268 G1-289 G2-313
- **number-words** → number-of-the-day: **I** G1-210 G1-223 G1-224 G1-225 G1-226 G1-227
- **odd-and-even** → odd-even: **I** G1-351 G1-369 G1-370 G2-351 G2-352 G3-386
- **opposites** → word-meaning: **I** K-351 G1-307 G1-335 G1-337 G2-320 · **S\*** G1-336
- **ordinal-numbers** → ordinal-numbers: **I** K-320 K-336 G1-315 G1-316 G1-317 G1-318
- **patterns** → patterns: **S** K-046 K-047 K-048 K-049 K-050 K-052 K-053 K-077 · **S\*** G1-155
- **phonological-awareness** → phonics: **S\*** K-226 K-227 K-232 K-233 K-234
- **picture-arithmetic** → addition-subtraction: **S** G1-101 G1-102 G1-103 G1-104 G1-112 G1-113 G1-115 G1-444
- **picture-tracing** → picture-tracing: **W** K-418 K-419 K-420 K-421 K-422 K-423 K-424 K-425 K-426 K-427 K-428 K-429 K-430 K-431 K-432 G1-429 G1-430 G1-431 G1-432 G1-433
- **picture-vocabulary** → picture-cards: **S\*** K-225 K-235
- **picture-word-cards** → picture-cards: **X** K-324 K-347 K-348 K-349 K-350 G1-324
- **picture-writing** → stories-writing: **W** G2-278 G2-299 G2-300
- **position-words** → position-words: **S\*** K-064 K-065 K-066 K-067
- **pre-writing** → pre-writing: **W** K-236 K-244 K-245 K-246 K-247 K-248 K-385 K-386 K-387
- **pronouns** → grammar: **I** G1-352 G1-371 G1-372 G2-353 G2-354 G2-355
- **question-words** → sentences: **I** G1-353 G1-373 G1-374 G1-375 G2-356 · **W** G2-357
- **read-and-color** → reading: **S\*** G1-242 G1-251 G1-252 G1-409 G1-410 · **S†** G1-411
- **read-and-do** → reading: **I** G1-308 G1-338 G1-339 G1-340 G1-341 · **W** G1-342
- **reading-comprehension** → reading: **I** G2-254 G2-269 G2-270 G2-271 G2-272 G2-273
- **rhyming-words** → rhyming: **I** K-352 G1-309 G1-343 G1-344 G1-345 · **W** G1-346
- **road-safety** → health-safety: **S\*** K-369 K-374 G1-384 G2-360 G2-361 · **S†** K-373
- **rounding** → place-value: **I** G2-346 G3-387 G3-388 G3-389 G3-390 G3-391
- **science-match** → sorting: **S\*** K-213
- **science-sort** → sorting: **S\*** K-203 K-206 K-210 K-212 G1-207
- **sentence-building** → sentences: **I** G1-249 G1-282 G1-283 G1-302
- **sight-words** → sight-words: **S** K-389 K-436 K-437 · **S\*** K-392 · **W** K-239 K-259 K-260 K-261 K-262 K-263 K-388 K-390 K-391 K-433 K-434 K-435 K-439 · **X** K-438 K-440 K-441
- **singular-plural** → nouns-articles: **I** K-287 K-302 K-303 K-313 K-314 K-316
- **sorting-categories** → sorting: **S\*** K-042 G1-160
- **sound-boxes** → phonics: **I** K-318 K-329 K-330 G1-312 G1-313 G1-314
- **spelling-rules** → spelling: **I** G2-315 G2-324 G2-325 G2-326 G2-327 G2-328
- **story-sequencing** → stories-writing: **I** K-379 K-381 G1-400 G1-401 G1-402 · **W** G2-378
- **syllable-reading** → syllables: **I** G1-306 G1-330 G1-331 G1-332 G1-333 G1-334
- **syllable-split** → syllables: **I** G1-305 G1-325 G1-326 G1-327 G1-328 G1-329
- **symmetry** → symmetry-grids: **W** G2-253 G2-264 G2-265 G2-266 G2-267 G2-268
- **synonyms** → word-meaning: **I** G1-395 G1-396 G2-358 G2-373 G2-374 G3-397
- **tally-counting** → ten-frames: **S** K-014 K-015 K-025
- **tangram** → tangram: **S** K-359 G1-355 G2-347 · **M** G1-354 · **W** K-358 · **X** K-353
- **telling-time** → telling-time: **I** G1-148 G1-149 G1-150 G1-212 G1-233 G1-234 G1-235 G1-236 G1-237 G2-249 G2-250 G3-344 G3-354 G3-355 G3-356
- **verb-forms** → grammar: **I** G2-317 G2-334 G2-335 G2-336 G2-337 G2-338
- **visual-discrimination** → same-different: **S** K-069 · **S\*** K-039 K-043 K-044 K-061 K-062 K-063 K-080
- **visual-logic** → logic-puzzles: **S** K-068 G1-157 G3-349 G3-350 G3-351 · **S\*** G1-158 G3-348 G3-353
- **visual-matching** → same-different: **S\*** K-057 K-058 K-078
- **word-building** → spelling: **S\*** K-224 K-231
- **word-classes** → grammar: **I** G1-293 G1-300 G2-275 G2-285 G2-286 G2-287
- **word-parts** → word-meaning: **I** G1-397 G2-359 G2-375 G2-376 G3-398 G3-399
- **word-problems** → word-problems: **I** G1-213 G1-238 G1-239 G1-240 G1-241 G3-370 G3-371 G3-372 G3-373 G3-374 G3-375 G3-376
- **word-tracing** → word-writing: **W** K-284 K-289 K-290 K-291 K-310 K-311 K-315
- **write-the-word** → word-writing: **S\*** G1-244 G1-259 G1-260 G1-301 · **W** G1-258 G1-291 G1-303 G1-304

Measurement notes: 5 templates refused to build in this probe for reasons unrelated to the verdict (animal-fact-file G2-318/339/340/341 refuse the first eligible theme "shapes" for the unit "hedgehog"; how-to-draw G1-418 and G2-390 need a drawing with 5 steps / 3 starters) — their verdicts come from the type source. K-057 and K-063 build no `bodyHtml` in the plain build path and were read from their titles and source.

---

## F. Operator rulings (2026-11-01) — binding

- **Writing:** typing a number or a word into a box is NOT writing (*"typing a number or word into a box doesn't count
  writing. I meant writing exercise."*). Excluded only: real writing exercises and tasks with more than one right answer.
- **D.4-1 / D.4-2 answer sets:** a declared finite set the key prints in full (G1-454), and "colour / circle any N of M",
  count as one right answer → interactive.
- **D.4-3 dot-to-dot:** stays printable only (revisit after the 60 makers are built).
- **D.4-4 play meter:** a student link minted by a subscribing teacher skips the per-device play meter; free accounts'
  links keep it.
- **D.4-5 social cards:** SSR head (the recommendation; decided by the builder, technical).
- **Timing:** the generic screen engine + the retrofit of all B1 makers are built after B1 #10 (multiplication-division),
  before B2.
