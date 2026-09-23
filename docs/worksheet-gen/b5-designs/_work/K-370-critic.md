# K-370 `family`: editor-critic record (2026-09-23)

Inputs: `K-370-pedagogy.md` (kinship graph, six moves, validator 1-15, poison P1-P14), `K-370-design-A.md` ("the tree the word names": arch-framed busts in a tealSoft crown, measured hair-reach sex rule, derived placement with the ancestor-column rule), `K-370-design-B.md` ("The Portrait Wall": picture frames on a wall, placards, rail legend, frame tree for the template). Output: `../K-370-family.md`. Measurements by read-only node in the session scratchpad: `K-370-measure.js` (Nunito 800 22 / 18 widths, shell woff2 from `assets/fonts/fonts.css` over `file://`, `document.fonts.check` true), `K-370-trace.js` (tracing widths at glyphH 40 from `letter-strokes.js textGlyphs` x `trace-path.js LM`, scale 0.571), `K-370-oe.js` (`œ` rendered by the web font in both families: width identical with monospace and serif fallbacks, 36.7 / 35.7 px at 40 px). Files read: `data/b4/pronouns.js`, `data/b4/locales/pronouns.<loc>.json`, `REFERENCE TRANSLATIONS/image-vocabulary.js` (lines 67, 171, 427, 430, 514, 515, 742, 1032), `frontend/config/topics-taxonomy.json`, `gen-b3-landings.js LEVEL_KEYS`, `strand-names.ts`, `page/page.css`, `ordinal-numbers.js:151`, `pronouns.js:108`, `trace-path.js:417-431, 597-700`, `components-b2.js:76, 228`, `types/k/K-343-all-about-me-my-family.js`, `i18n/strings.<loc>.json` (K-323 / K-343 titles). Pictures: the pedagogy's contact sheets `K-370-a.png` (toys/activities people) and `K-370-b.png` (all 49 occupations) re-opened by the editor; the final names no library picture. No em-dashes.

## Concept ruling (per face)

| face | taken from | why |
|---|---|---|
| base | **A's tree skin + A's word block + A's figure, B's picture frame + B's grand-pair centring** | Both fit (A 659, B 622). Ten of eleven genre heads are a TREE, so A's skin gives all given-family faces one look and answers the family-tree queries; B's rect frame with an inner line reads as a portrait, A's arch reads as a window (A's own risk note). B's centring (pair over its child / sibship) is more natural and, for the aunt case, 81 px narrower than A's "inner member above the child" (m: 442 vs 523 wide at node 130); A's rule 4 (push the in-law outward) is kept as the second step. |
| F1 | **B** (rail legend with f+m PAIRS, placards) | A's single busts in the legend attach a sex to each numeral; B's pairs do not. A's chip-over-box rows (94 each) do not fit under a top legend (796 > 677); B's side-by-side placards do (544). |
| F2 | **A** (tree key beside stacked lanes), frames resized | A's 300-wide key sits BESIDE the rows so the eye goes badge → person; B's 64 px frames sit under the figure floor. A's 72 x 84 frames held a 67 px bust, under A's own `MIN_PX 72` (a self-contradiction): raised to 80 x 96 (bust 72), bbox 284 ≤ 300 (m). |
| F3 | **B** (tree over clue list) | A's tree-left + clue card-right does not fit: with 130-wide nodes the d2 tree is 442 (B centring) to 523 (A placement) wide, + 16 + 214 > 675 (A estimated 430). B stacks 670 ≤ 677. |
| F4 | **merge** (inline slot from A, 18 px rows from B) | same concept in both; ego frame raised to 80 x 96 (A's 64 x 74 held a 59 px bust). |
| F5 | **B** (`frameTree`, outline tree, varied mat shapes, shelf) | A's version stacks 684 > 677 and drops its strip in fi; A's tealSoft crown on an empty template greys out on a copier. B fits 640 everywhere; hook coordinates verified to keep name lines 10 px apart and tiers clear (m, arithmetic in the final). |

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | seven family SHAPES incl. one-parent, grandparent-home, and two-mothers / two-fathers behind `allowShapes` | A, B: shapes seeded, a shape-mix report | **ONE conventional structure on every closed face**; `allowShapes`, the shape mix and poison P2 withdrawn | the lead's binding ruling; kin words are relational and need one fixed diagram for one right answer; inclusion lives in F5 (shape-free) and in the welcome sentence on every landing |
| 2 | F4 d2: 8 riddles with 8 pairwise-distinct answers + 2 distractors | A, B: same | answers MAY repeat; bank = distinct answers + 2 distractors; `repeatsNote` clause only where answers repeat | measured on the kin map: at depth 2 en / de / es / pt / fr / it / nl / fi have only 4-6 distinct words (MM = FM = grandma, MZ = FZ = aunt): the pedagogy's rule was unsatisfiable in 8 of 11 locales; the sameness is itself the lesson opposite the Nordic pair |
| 3 | F2 row words: de `Großmutter` too wide at K | A lane 321, B lane 290 | lane 321; every K word fits in all 11 | m: widest `Schwester` 259 + 18 pad = 277; and the lane SILENTLY SHRINKS a long word (`trace-path.js:620`), so the gate asserts the resolved glyphH ≥ 40 instead of trusting the width |
| 4 | fr `œ`: Baloo 2 / Nunito subset UNKNOWN | A: engineer measures | measured: `œ` IS in both subsets (latin range `U+0152-0153`, width independent of the fallback font); NOT traceable (no stroke data) | fr prints `sœur` everywhere except the F2 tracing lane |
| 5 | figure MIN (implicit) | A `MIN_PX 72`, but A's own F2 / F4 frames held 67 / 59 px busts; B mat ≥ 56 | `MIN_PX 72` everywhere; F2 frame 80 x 96, F4 ego frame 80 x 96 | the eye disc must stay ≥ 1.8 px; a design cannot violate its own primitive's throw |
| 6 | F3 tree-left + clues-right (A) | B tree-over-clues | B | m: width (row 1 of 130-wide nodes + grand pair ≥ 442) |
| 7 | F3: one sideline person so a clue "must be read" | none tested it | NEW rule: the 4 empty plates always include two people of the same (age, sex) cell | without it a boy's name with only one empty adult-male frame is placed by appearance, not by reading the relation |
| 8 | names: en from `pronouns.en.json` | A, B: same | en names live in `data/b4/pronouns.js PRONOUNS.en.names` (m: there is no `pronouns.en.json`); the family bank carries its OWN sex-tagged name list, initialised from those | a later pronouns-bank edit must not silently change family pages; plus rule 3 (a name that is a word: it "Mia" = my) |
| 9 | base instruction: two sentences ("Mia has a star. Find each …") | A, B copied | one sentence naming tree, numbers, boxes, words | brief: ONE sentence |
| 10 | F5 instruction: two sentences | A, B copied | "Draw the people who are important to you in the frames and write their names, using as many frames as you like" | one sentence; names only frames and lines |
| 11 | CCSS: en prose may cite L.K.5.c | none | dropped; "no Common Core standard" | a kin-word page does not instantiate L.K.5.c; never claim a code the page does not teach |
| 12 | it head "La famiglia" (with a grade word) | | "I membri della famiglia" | the Romance panel: "la famiglia …" is the CQU spelling genre in the it tail; keep the bare phrase out of every title |
| 13 | fi F5 "Oma sukulaiskaavio" | | "Sukulaiset: täytettävä pohja" (panel) | lead: fi never "sukupuu"; the base head is "Perhe ja suku", slug `perhe-ja-suku` (a bare `perhe` slug is a substring of `laskuperheet`) |
| 14 | crown fill (A) | B: no canopy fill on print | crown kept on given-family faces (behind white frames), removed on F5 | on F5 the tree IS the apparatus and must print as line; on the base the lines, not the crown, carry the answer (m luma teal 80 vs tealSoft 230) |
| 15 | B couple-bar "nail" dot | A none | none | a dot adds a mark with no meaning; the descent leaves from the bar midpoint anyway |
| 16 | first face to cut: A says F1, B says F2 | | neither; record only | both are buildable in 11 with measured pools; F2 is the only K production face, F1 the only generation face |

## 2 Claims removed or downgraded as unverified

- A: F3 tree bbox "*est.* 430 wide": FALSE (m: 442 with B's centring, 523 with A's placement); A's F3 layout void.
- A: F5 684 ≤ 722 "with the strip dropped at 677": replaced (B's 640 fits everywhere; a face that drops content in one locale is a locale fork).
- A: F2 frame 72 x 84 and F4 frame 64 x 74: below A's own `MIN_PX 72`; resized.
- A: `blankNumeralBox` "stamps the answer ONLY when passed": FALSE (m, `ordinal-numbers.js:152`: it always stamps `data-lcs-answer`, empty when none); harmless, recorded.
- Pedagogy: de `Großmutter` "too wide at K glyphH 40": moot (de K uses Oma; and even Schwester fits at 321).
- Pedagogy: shape mix target "no shape > 50 % of a locale's decks": withdrawn with the shapes (lead ruling).
- Pedagogy: F4 "answers pairwise distinct per page" with 8 rows: unsatisfiable in 8 locales (§1 #2).
- B: baby f / m told apart by a tuft vs a curl: withdrawn (a baby's sex is not honestly drawable; at most one baby per page, d3 only, A's rule).
- B: `familyPortrait` 3 hair x glasses = 6 looks: replaced by A's `LOOKS` (≥ 6 hair geometries per (age, sex), sex gated by measured hair reach).
- Every chip / clue / riddle width not listed in §3 stays *est.* for the engineer (fi / de riddles especially).
- The en English source, audited: both two-sentence instructions merged; "Mia has a star" dropped (the star is on the page; the sentence was not an instruction); the F4 "each word once" promise removed (false in en).

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | measured (editor) | won |
|---|---|---|---|---|---|
| base stack | ~ *est.* | 659 | 622 | 659 (A stage + A word block) | A |
| base tree bbox, frame 104 | | 422 | | 356 with B centring (+ 11 disc overhang) | merge |
| F1 stack | | 624 (legend left) | 534 | 544 (legend frames raised to 150 x 96 for two 72+ px busts) | B, adjusted |
| F2 stack / key bbox | | 520 / 256 *est.* | 654 | 520 / 284 at frame 80 | A, resized |
| F3 width / stack | | 660 / 530 | 442 / 670 | tree 442 (centring), stack 670 | B |
| F4 stack | | 616-650 | 622 | 602, worst 654 | merge |
| F5 stack | | 684 (strip dropped at 677) | 640 | 640 | B |
| widest d2 base chip, Nunito 800 22 | | 176 inner *est.* | 133 at 20 px | `Schwester` 109.0 · `grandma` 93.1 · `hermano` 92.1; d3 `kleine Schwester` 177.8 (> 176) | measured |
| widest F1 word, Nunito 800 18 | | 155 inner | 141 inner | `kleine Schwester` 145.5 (wraps at the space), `kleiner Bruder` 122.5, `baby brother` 110.7, `Großmutter` 101.1 | measured |
| tracing width at glyphH 40 | | | ≤ 290 | `Schwester` 259 · `hermano` 220 · `grandma` 219 · `mormor` 200 · `mamma` 190 · `isoäiti` 149 | measured (lane 321) |
| trio height for glyphH 40 | | 58 | 72 row | ≥ 53 (82 units x 0.571 + pad 6) | A's 58 |
| names per locale / longest | en 12, fi 16 | | | en 12 · de 12 · es 13 · pt 13 · fr 13 · it 12 · nl 12 · sv 12 · da 12 · no 12 · fi 16 (all ≥ 6 f + 6 m); longest 6 (it Matteo / Simone, da Victor / Alfred / Malthe) | measured |
| `œ` in the shell fonts | UNKNOWN | UNKNOWN | | present in Nunito and Baloo 2 | measured |

## 4 OPEN items

1. **The three-adult mono read-test** of every (age, sex, look) at its smallest shipping size (bust 72): only a human eye can pass it; no gate can. A cell under 3 surviving looks blocks the family.
2. **Register per locale** (panels): en mom vs mother; pt-BR vovó / vovô vs avó / avô at educação infantil; fi isoäiti vs mummo and isoisä vs vaari / ukki; da mor / far vs mamma / pappa; no generic tante / onkel vs lineage moster / faster (one convention).
3. **Subject bucket** (`_PANEL-FINDINGS` open item 1: `letters` by default; a social-studies bucket only by measurement) and the NEW `'Family'` strand literals x11 (open item 2).
4. The engineer measures in `render/one.js`: every riddle / clue at 18 px in de / fi / pt (F4 ≤ 2 wrapped rows), the F4 bank height for 10 words in sv / da, and every meta whole in the 120-170 window per locale with that locale's seeded ego name.
5. Whether the tealSoft crown competes with the lines on the operator's own mono printer (fallback `skin:'none'`, one flag).

## 5 Quality verdict

I would print the base for my kindergarten class. It is one tree with six faces in it, every face the same size so nobody is "the small one", a coral frame and a star for the child the page is about, and five words with a box each; a five-year-old knows what to do before I read the instruction aloud, and when a child writes grandpa's number next to "dad" I can see the mistake from across the table because grandpa's hair is grey. The clue tree for grade 1 is the page French and Italian teachers actually search for, and I like that two of the empty frames always look alike, so the child has to follow the lines instead of guessing from a beard. The riddle page is where a Swedish or Danish child finally meets why it is mormor on one side and farmor on the other, and the English page quietly teaches the opposite, that both are grandma. What would embarrass me is not the layout. It is a set of busts where a grandmother reads as a grandfather at 72 px, a single family template with "Mom" and "Dad" printed in the boxes that a child in foster care has to face, or a Finnish title that autocompletes to extinction; the first is why the read-test is not optional, and the other two are why the closed faces use one invented family while the template stays empty and every landing says every family is welcome.
