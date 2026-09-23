# G2-359 `word-parts`: editor-critic record (2026-09-23)

Inputs: `G2-359-pedagogy.md` (Boundary with the measured Romance head collision, six moves, refusals fi F3 / es F4 / fr F4, bank shape, validator 1-14, poison P1-P13), `G2-359-design-A.md` ("Word Bricks": silhouette carries the role, walls on root stones, one primitive for six faces), `G2-359-design-B.md` ("The Word Tree": root plate in the soil, crown of writing boards, seed pots, grafting tags). Output: `../G2-359-word-parts.md`. Measurements by read-only node in the session scratchpad: `G2-359-crit-measure.js` (Nunito 800 20 / 18 and Baloo 2 700 30 / 24 widths, shell woff2 from `assets/fonts/fonts.css` over `file://`, fonts force-loaded with `document.fonts.load`, `document.fonts.check` true) and `G2-359-crit-fb.js` (the same word under `'Nunito', monospace` and `'Nunito', serif`: 155.8 / 155.8, so the web font rendered). Files read: `frontend/config/topics-taxonomy.json` (every `axes.*` name and slug x11), `lib/b3-common.js bank()` over `compound-words` and `opposites` x11, `i18n/strings.{en,de,es,fr,it,pt}.json` (G2-316, G2-329..333, G2-320, G2-338, G1-306), `frontend/content/seo-landing/<loc>.json` (live titles), `data/b4/pronouns.js`, `frontend/lib/seo/strand-names.ts:205-255`, `lib/b5-common.js`, `tools/register-b5-taxonomy.js:32`, `tools/_clone-b5-spine.js:28`, `tools/apply-b5-locale.js`, `scripts/seo-landing/gen-b3-landings.js:98-110`, `page/page.css:115-150`, `primitives/trace-path.js:597, 681`, `templates/components-b2.js:76, 228, 244, 261`, `templates/components-b4/cloze.js:110-256`, `templates/components-b4/odd-and-even.js:167`, `templates/components-b3/spelling-rules.js:202, 220`, `templates/layouts/card-grid.js`, `primitives/_tokens.js`, `qa/lints.js`, `../G1-376-plants.md`, `../K-370-family.md`, the harvest `_records/wordparts/*.json`. Pictures: the editor's contact sheet `G2-359-crit-pics.png` (24 pictures: weather sun cloud raindrop snowflake, body parts tooth hand, music drum, classroom book, ocean life fish, vehicles boat, spring flower garden, supermarket bread, occupations baker teacher singer gardener farmer photographer athlete ballerina cashier tailor musician). No em-dashes.

## Concept ruling (per face)

| face | taken from | why |
|---|---|---|
| base | **A** (walls on stones, bank of bricks) + B's `rootPic` both-or-neither | Both fit (A 624 re-measured, B 602). B's tree is the stronger picture and the stronger word (root / Stamm / raíz / radice / kanta), but in this batch it is the THIRD tree-in-soil: K-370 hangs its family in a tealSoft crown over a creamDeep trunk (final, line 5) and G1-376 draws roots in a creamDeep soil box and a creamDeep potted seedling (final, lines 5, 77, 108). B's own risk note names the plants collision and offers to drop trunk and roots, which leaves a green box of lines, i.e. the houses B rejected. A's brick carries the ROLE of a part (tab / notch / flat) in shape, survives greyscale, needs no printed label in 11 languages, and gives a prefix a side to attach to, which the tree cannot (F3). |
| F1 | **A's card** (picture stone + 3 word bricks) + **B's picture rulings** | B's seed pot is plants' `potted` stage in miniature. A allowed raindrop and snowflake as picture-only roots "rain" / "snow"; B is right that a child names the compound: refused. |
| F2 | **A's 3 x 3 grid with a worked card, re-fitted** | Pedagogy's full-width row (3 words + a line) does not fit de / nl (A, measured). A's grid stacked 688 > 677 (A excused it by the fi title length, which is data, not a guarantee). Re-fit: members at 18 px in 36 px bricks, stone socket 44, card 214, stack 670. B's twig rows fit (568) but needed a hard 10-char member cap and a creamDeep soil block (the plants silhouette again). |
| F3 | **A** (key of prefix bricks, notched socket snapped onto the base) + **B's socket-width rule** | Same move in both; both designers independently changed the pedagogy's whole-word line into a prefix socket and both flagged it. Adopted with the concatenation rule (critic §1 row 3). |
| F4 | **A** (portrait + base brick + flat word socket) | B's portrait disc + curved arrow is equivalent; A's flat socket is the honest shape where the join changes spelling (backen → Bäcker, leipoa → leipuri). |
| F5 | **A** (one course of four bricks on a narrow stone) | B's mini tree carries the same collision as the base. A's stone raised 32 → 36 (G2 element floor). |

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base = two family HOUSES (`ruleBins` + roof tile) | A: walls on stones; B: two trees | **A's walls** | houses are spelling-rules' bins and odd-and-even's `houseBin` (both designers); trees collide with K-370 and G1-376 in this very batch (measured in their finals) |
| 2 | F2 = 8 full-width rows (3 words + one writing line) | A: 3 x 3 cards, 688; B: twig rows with soil plate, 568, member ≤ 10 chars | **A's grid re-fitted to 670** | the brief budgets every stack at 677 when a fi title can run 4 lines; A's 688 fails that case; the re-fit keeps the G2 36 px brick floor and the 24 glyph floor |
| 3 | F3: child writes the WHOLE new word on a line | A, B: child writes the PREFIX into a socket snapped onto the base | **prefix socket at d2, whole word at d3 (unshipped)**; validator `prefix + base === word`; rows that change spelling at the joint are not drafted | the teaching move of L.2.4.b is choosing by MEANING; the snapped socket makes the new word visible on the page; the concatenation rule keeps the drawing honest |
| 4 | strand = `'Language'` row | (not addressed) | **`'Vocabulary Acquisition and Use'`** + a new `no` cell | m: L.2.4 / L.3.4 sit in that CCSS strand; the row exists with de fr es pt it nl sv da fi literals written for the affix activities; `'Language'` is the grammar row |
| 5 | en head "Prefixes, Suffixes and Root Words" | (taxonomy, Phase C commit) "Word Families and Word Parts" | **withdraw the registered en name/slug; register the pedagogy's** | m: en `syllable-reading` is named "Word Families"; the pedagogy's own Boundary bans the phrase in en; `register-b5-taxonomy.js:32` and `_clone-b5-spine.js:28` must change before any landing ships |
| 6 | members may be `compound` | B's exemplars: sun family sunny, sunshine, sunlight, sunset, sunrise; hand family incl. handbag, handshake | **≤ 1 compound per family on a page; no member equals a `compound-words` bank word in ANY locale** (B's own extension, adopted) | m: `handbag`, `sunflower`, `toothbrush`, `raincoat` are en G2-316 answers; a family page of compounds is compound-words' page with a new title |
| 7 | negating prefixes banned in F3 only | A's bank example: `unhelpful` | **no member begins with a G2-320 token (whole-token compare)** | keeps the fence against the Antonyms page on every face; whole-token so it `sotto` survives the ban on `s` |
| 8 | first to cut: n/a | A: F4 (two refusals); B: F1 (fragile foils) | **cut neither** | F4 is buildable in 9 locales, F1 in 11; each has a distinct move, config and query face; the brief allows refusals when netted |
| 9 | F1 roots incl. raindrop / snowflake (A) | B: excluded | **excluded**; F1 root word must equal the picture's own vocab singular | a child says "raindrop", so "rain" is not the root the picture names |
| 10 | wall panel border `#F0E4CB` (A) | n/a | **token `creamDeep` or the `.ws-card` class** | brief: tokens only; the lint only scans SVG hexes, which is why the rule is written, not linted |
| 11 | F5 stone h 32 (A) | n/a | **36** | G2 min element 36 |

## 2 Claims removed or downgraded as unverified

- A's width table (Nunito 800 20) was measured on a fallback font: `Kinderspielplatz` 142.2 (A) vs **155.8** real; `schoonmaakster` 138.9 vs **154.8**; `Maanviljelijä` 114.4 vs **119.4**. A's `brickEstimate` coefficient 0.52 ("above every measured value") is therefore BELOW the real `Sonnenuntergang` (0.565). Replaced by 0.60 and a poison (PR1) that fails the old coefficient.
- The es head "Palabras primitivas y derivadas" has **no measured demand**: the harvest seeded only "familias de palabras" (owned) and "prefijos y sufijos". Kept on curriculum grounds, marked UNMEASURED.
- B's "a word family tree is a familiar wall poster in every locale" (B marked it a design argument): not used.
- The pedagogy's "sv F3 at risk" and "da F4 at risk" stay CONTINGENT: no measurement can settle them before the panels author the pools.
- The pedagogy's claim that the base "has no refusals" holds only with rule 11 extended: several en / de / nl / sv exemplar families the designers drafted relied on compounds; the panels must redraft them.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | editor (m) | won |
|---|---|---|---|---|---|
| Nunito 800 20 `Kinderspielplatz` / `schoonmaakster` / `Sonnenuntergang` | n/a | 142.2 / 138.9 / n/a | n/a | **155.8 / 154.8 / 169.6** | editor (A measured a fallback) |
| Nunito 800 18 `Fahrradfahrer` / `Kinderspielplatz` | n/a | n/a | n/a | **118.5 / 140.2** | editor (F2 fits 187 at 18) |
| Baloo 2 700 30 `Bäckerei` / `fahr` | n/a | est. 149 max for 9 glyphs | n/a | **116.9 / 57.5** | editor |
| base stack | 490 est. | 578 / 626 | 602 | **576 (2-row bank) / 624 (3-row)** | A, corrected: wall 450 not 452, bank 160 |
| F1 stack | 570 | 590 | 614 | **590** | A |
| F2 stack | 592 | 688 (> 677) | 568 | **670** | editor re-fit of A |
| F3 stack | 620 | 630 | 614 | **630** (row width 639 with base brick ≤ 140) | A |
| F4 stack | 528 | 610 | 500 | **610** | A |
| F5 stack | 512 | 650 (stone 32) | 492 | **658** (stone 36) | A, corrected |
| `.ws-card` inner width, 3 cols / 2 cols | n/a | 187 / 302 | 195 est. | **187 / 302** (`page.css:126`, grid gap 14) | A |
| strand row | 'Language' | n/a | n/a | **'Vocabulary Acquisition and Use'** (no `no` cell) | editor |
| taxonomy state | proposed names | n/a | n/a | **`apps['word-parts']` present; `axes` en only, name "Word Families and Word Parts"** | editor |

## 4 OPEN items

1. **Re-register the en taxonomy entry** from "Word Families and Word Parts" / `word-parts` to "Prefixes, Suffixes and Root Words" / `prefixes-suffixes-root-words` (in `tools/register-b5-taxonomy.js:32`, `tools/_clone-b5-spine.js:28` and `topics-taxonomy.json`) before any landing is generated; add validator 13's en check so it cannot return.
2. **sv F3** (keySize 3 x ≥ 2 transparent åk-2 rows) and **da F4** (≥ 8 opened agents): panel rulings; each lowers the hub matrix by one if it fires (63 → 61 worst).
3. **es head demand** is unmeasured ("palabras primitivas y derivadas" never seeded); a 14-seed es re-probe before the es panel is cheap and would settle it.
4. **Romance re-homing** (operator): whether the `compound-words` es / fr / it / pt derivation heads should one day move to this family is a taxonomy decision outside this design; this file assumes they stay.
5. **Print check** of the dovetail at 100 % on a mono laser (the joint is 2.1 mm); the render gate proves geometry, only paper proves legibility.

## 5 Quality verdict

I would print the base and F2 for my second graders without hesitation: two walls with a root on each stone is exactly the chart I draw on the board, the ten words are real words my class meets, and the empty courses are big enough for a seven-year-old's pencil. F3 is the page I like best, because choosing re- or pre- from what the word should MEAN is the lesson and the prefix snapping onto the word shows it. What would embarrass me: a family of compounds sold as "prefixes and suffixes" (my compound-words sheet from last week, retitled), an "unhappy" sneaking onto a family wall the day after the antonyms sheet, a pink cloud the Finnish panel cannot name, or an English title that says "word families" and sends a parent to a rhyming page. The rules above exist for those four, and the one thing I would still check by hand is whether a six-year-old reads F1's bricks as three separate words and not as one wall.
