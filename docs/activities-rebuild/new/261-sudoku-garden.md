# New 261 — The Sudoku Garden: the roots that check (READINESS picture sudoku)

## 0. Identity
- id `sudoku-garden.play.picture-sudoku` · grade 1 (big garden reaches grade 3) · READINESS picture sudoku (framework from `frontend/lib/frameworks.ts`, readiness strand) · strand Logic & Visual Thinking · key `sudoku-garden` (files `sudoku-garden-core.js`, `sudoku-garden-activity.js`, `sudoku-garden-activity.html`, `sudoku-garden-activities.json`).
- worksheets covered: **G1-158 Picture Sudoku** (4 × 4: every row, column and box needs all four pictures) · **G3-348 Big Picture Sudoku** (6 × 6: all six pictures).
- merged instrument: grade 3 "The Latin Garden" (6 × 6, vine to the twin, ghost possibilities) — it is the "Big garden" level here.
- new instrument. The catalogue's `sudoku` app makes printable/deck sudokus where a wrong picture is only marked red at Check; here **the garden itself refuses** a wrong seed, and it shows WHY, in all three directions at once. Kept from the sketches: garden beds, seed packets, wilt-back, the "why" view, bloom when full.

## 1. The pitch
"Plant a seed and its roots run out along its row, down its column and around its box — if a root touches the same flower anywhere, the seed won't take, and you can see exactly which flower stopped it."

## 2. Why a child will want it again
- Planting is tactile: a seed packet is dragged to the soil, it shakes out a seed with a little "pff", and three roots race out at once — left-right, up-down, and round the box — like lightning made of green string.
- When a root bumps into its twin it turns coral, gives a little "boing", and snaps back, and the seedling wilts back into its packet. Children find the boing funny and it never feels like failing: the garden just says "not here".
- When it takes, a sprout pops up with its flower's bud. When the last bed is planted, the whole garden **blooms in a wave** (row by row, 60 ms per bed), and a library bee flies a lap along each row, then a butterfly across the garden. The bloom is earned only by a full, true garden.
- Free play: tap any empty bed to light its **root cross** (its row, column and box) — the planted flowers in the cross shimmer. Children tap around just to watch the cross jump.
- No score, no timer, no lives.

## 3. The skill and the misconception
- Skill: in a Latin-square-with-boxes, every row, every column and every box holds each picture exactly once; use what is already planted to decide what an empty bed must hold — **look for the bed that has only one possibility**.
- Misconceptions and push-back:
  1. **Checking only the row** (or only the box) → the roots run in **all three** directions every time; a seed that fits the row but repeats in the column is stopped by the downward root, and the twin is lit — the forgotten direction is shown, not named.
  2. **Guessing** a picture that clashes with nothing yet but is wrong → it may take (no root touches a twin), but later a bed becomes **dry**: every packet is blocked there. The dry bed's roots show all its blockers; the child lifts a sprout and rethinks. Dead ends are visible, never mysterious.
  3. **Starting anywhere** instead of with the most constrained bed → at miss 2 the garden puts a sunbeam on a bed with exactly one possibility.

## 4. The stage
At 704 (stacked layout for both grids (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704); the stage is ≈ 648 px wide — at 4 × 4 the seed tray stays beside the garden inside it, 468 + 16 + 124 = 608 px):
- **The garden** (drawn apparatus): a raised wooden frame (#B98A57, 4 px ink #0F4A40), soil beds (#8C6A4A with a lighter tilled texture of two drawn furrows), the box boundaries as **thicker frame beams** (8 px) so the four 2 × 2 boxes (or six 2 × 3 boxes) read at a glance.
  - 4 × 4: beds 112 × 112, flower pictures 96 × 96; grid 4 × 112 + beams = 468 × 468.
  - 6 × 6: beds 88 × 88, pictures 76 (stacked, grid 552 wide) — inside PICTURE-RULINGS' puzzle-grid floor (grid cells ≥ 40 px at 704 / ≥ 30 at 360); the full-size picture of each kind is always on its packet; every bed is a ≥ 88 px tap.
- **Planted flowers (given)**: full colour, standing on a little drawn soil mound, a thin green stem collar under the picture.
- **Sprouts (child's)**: the same picture at 84 % size, 30 % desaturated, on a fresh-soil mound with a two-leaf shoot drawn under it — clearly "mine, still growing".
- **The seed tray** (beside the garden inside the stage at 704 for 4 × 4; under the garden for 6 × 6): one **packet** per picture, 124 × 140 (paper packet shape, cream, 3 px ink, flap at top), the picture 96 inside. Packets are unlimited (a packet never runs out).
- **Roots**: 6 px green (#4FA85A) animated strokes from the planted bed: horizontal through its row, vertical through its column, and a rounded rectangle tracing its box boundary inside the beams. A **clash** turns the touching root and the twin's mound coral (#F2784B).
- Task line above (≤ 24 px, ≤ 2 lines); feedback bubble under the stage.

At 360 (stage ≈ 336):
- 4 × 4: beds 76 (pictures 64), grid 4 × 76 + beams = 318; packets in one row of four under the garden, 76 × 84 (pictures 64).
- 6 × 6: beds 52 (pictures 46) — puzzle-grid floor (≥ 30 px at 360); sprouts at 84 % are 39 px, still above it; taps 52 ≥ 44; packets in one row of six, 52 × 60 (pictures 46). At 320: beds 48, pictures 42, packets 48.
- Height: 4 × 4 = 318 + 12 + 84 = 414 px stage; with header, task line and bubble it fits 360 × 740 and 320 × 640. There is no Check button (the garden checks each planting and blooms when complete).

Library pictures (checked in `mini tools/pictures/<theme>.json`, seen on contact sheets 2026-10-17):
- **Flowers** (4 × 4 default): flowers/sunflower (yellow ring, brown centre), flowers/tulip (red cup), flowers/lavender (purple spike), flowers/clover (green three-leaf). Chosen so that **shape AND colour** both differ — no two can be confused at 46 px. Refused: rose (red like the tulip), daffodil (yellow like the sunflower), violet and lilac (purple like lavender); bluebell and snowdrop exist as art but are not in the JSON.
- **Fruits** (4 × 4 option): fruits/apple (red), fruits/banana (yellow, long), fruits/watermelon (green-red slice), fruits/blueberry (dark blue). Refused: lemon/pear (yellow like the banana), cherry (drawn as an apple), plum/pomegranate (red like the apple).
- **Vegetables** (6 × 6 always): vegetables/carrot, tomato, broccoli, eggplant, corn, pumpkin — six colours (orange, red, green, purple, yellow, orange-ribbed); carrot vs pumpkin differ strongly in shape (long diagonal root vs round). Gate: no two of the six share both hue band and aspect class (§12).
- **Show**: insects-and-bugs/bee, insects-and-bugs/butterfly (fly over the garden on bloom).

Drawn apparatus: frame, beams, soil, mounds, shoots, roots, packets, sunbeam. No words, no letters, no numbers on the apparatus.

Task line (EN): 4 × 4 "Every row, column and box needs all four. Plant the seeds!" · 6 × 6 "Every row, column and box needs all six. Plant the seeds!"

## 5. The hand
- **Drag a packet** → it lifts and tilts (80 ms). Over the garden, the bed under the finger shows a dashed outline. Release on an **empty** bed:
  - the seed drops (puff, 120 ms), then **roots grow** (300 ms, all three at once).
  - **No twin touched** → a sprout pops up (scale 0 → 1, 180 ms, soft "plip" 660 Hz).
  - **A twin touched** → the root that reached it (row, column or box — or two or three of them) turns coral at the twin, the twin wobbles, "boing" (300 Hz, 150 ms), the roots snap back (200 ms) and the seed flies back into its packet (arc 260 ms). The coral line stays faint for 1.2 s so the child sees which direction stopped it. Counted as a *bump* (see §7).
  - release on a planted (given) bed → nothing happens; the packet floats back.
  - release on a sprout → the old sprout is lifted out (returns to its packet) and the new seed is tried there.
- **Tap path**: tap a packet (it lifts and glows), tap a bed → same as a drop. Tap the glowing packet again → it settles.
- **Tap an empty bed** (no packet lifted) → **root cross**: its row, column and box light pale green for 1.5 s and every flower inside them shimmers once. Free help, never counted.
- **Tap a sprout** → it is pulled out (a small soil puff) and returns to its packet. This is the undo.
- **Stuck flower** (the second kind of dead end, which a dry bed does not catch): whenever a row, column or box still lacks a flower but none of its empty beds can take it, that unit's beams turn coral and that flower's packet shows a small coral ✗ badge while the child's finger is over that unit — the same "pull out a sprout" bubble. The gate drives both dead ends.
- **Dry bed**: whenever an empty bed has **no** packet that could take (all pictures already in its row/column/box), its soil turns pale and cracked (drawn crack lines) and its root cross stays lit with every blocker in coral — the child must pull out a sprout (any sprout; the dry state updates live).
- **Free play** on a finished garden: drag any packet over the garden — the roots preview (dashed) wherever the finger is, without planting.

## 6. The rounds
Symbols in the tables: 4 × 4 `S` sunflower · `T` tulip · `L` lavender · `C` clover (fruits option: S → apple, T → banana, L → watermelon, C → blueberry); 6 × 6 `C` carrot · `T` tomato · `B` broccoli · `E` eggplant · `K` corn · `P` pumpkin. Rows read top to bottom, `.` = empty bed. Every puzzle below was produced and checked by an exhaustive solver (2026-10-17): **exactly one solution**, solvable by singles alone (8-planted: naked singles only — a bed with one possibility always exists at every step; 6-planted and 6 × 6: naked + hidden singles), every row and column holds at least one planted flower, and "first singles" = how many beds have exactly one possibility at the start (always ≥ 2).

**Level "Small garden, 8 planted" (G1-158) — 9 puzzles**
| # | puzzle | solution | first singles |
|---|---|---|---|
| G1 | .L.S / ...T / LT.C / S.T. | TLCS / CSLT / LTSC / SCTL | 5 |
| G2 | .T.L / L.TS / T... / .LS. | STCL / LCTS / TSLC / CLST | 4 |
| G3 | ..TS / ..L. / .T.L / CLS. | LCTS / TSLC / STCL / CLST | 6 |
| G4 | ..SL / SL.. / ...C / LC.S | CTSL / SLCT / TSLC / LCTS | 4 |
| G5 | L.C. / ..TL / .L.. / .CLT | LTCS / CSTL / TLSC / SCLT | 4 |
| G6 | STC. / .L.S / ..L. / .CS. | STCL / CLTS / TSLC / LCST | 6 |
| G7 | C... / LTSC / ..T. / TL.. | CSLT / LTSC / SCTL / TLCS | 5 |
| G8 | T.CS / SC.. / L.T. / ..S. | TLCS / SCLT / LSTC / CTSL | 6 |
| G9 | L.S. / S..C / .S.. / .LTS | LCST / STLC / TSCL / CLTS | 5 |

**Level "Small garden, 6 planted" (G1-158, harder) — 9 puzzles**
| # | puzzle | solution | first singles |
|---|---|---|---|
| H1 | C..L / ..T. / ..LS / .S.. | CTSL / SLTC / TCLS / LSCT | 6 |
| H2 | C... / ..L. / S... / .CST | CLTS / TSLC / STCL / LCST | 5 |
| H3 | S... / .C.. / LS.T / ..S. | SLTC / TCLS / LSCT / CTSL | 3 |
| H4 | ...S / SL.C / ..C. / L... | CTLS / SLTC / TSCL / LCST | 3 |
| H5 | .C.. / T.C. / C... / .S.C | SCLT / TLCS / CTSL / LSTC | 2 |
| H6 | T... / ..L. / L.CS / .S.. | TLSC / SCLT / LTCS / CSTL | 6 |
| H7 | ...S / .TL. / T... / .L.T | LCTS / STLC / TSCL / CLST | 2 |
| H8 | S.C. / .C.. / ..L. / .L.S | STCL / LCST / TSLC / CLTS | 2 |
| H9 | .L.. / ...T / S..L / ..CS | TLSC / CSLT / SCTL / LTCS | 5 |

**Level "Big garden" (G3-348, 6 × 6, boxes 2 rows × 3 columns, 18 planted) — 9 puzzles**
| # | puzzle | solution | first singles |
|---|---|---|---|
| B1 | B.TC.E / E..... / CT.E.. / PKE..B / K.CBT. / T..K.. | BPTCKE / ECKPBT / CTBEPK / PKETCB / KECBTP / TBPKEC | 5 |
| B2 | .C...P / K.P.B. / .BK..C / C...TK / ET.P.. / PKB.C. | BCTKEP / KEPCBT / TBKEPC / CPEBTK / ETCPKB / PKBTCE | 7 |
| B3 | .TPC.K / ...P.T / .BE.TC / ...B.E / E..TK. / .PT..B | BTPCEK / CEKPBT / PBEKTC / TKCBPE / ECBTKP / KPTECB | 6 |
| B4 | ..T.P. / ...K.. / CBKP.E / .EP..B / .CETBP / P.B... | EKTBPC / BPCKET / CBKPTE / TEPCKB / KCETBP / PTBECK | 8 |
| B5 | ..E..P / .C..T. / EP.TC. / KTC... / .ET.PC / .KP.B. | TBECKP / PCKBTE / EPBTCK / KTCPEB / BETKPC / CKPEBT | 8 |
| B6 | ..EP.. / PKC.ET / .P.ECK / ...TP. / K..CB. / .E.K.. | TBEPKC / PKCBET / BPTECK / ECKTPB / KTPCBE / CEBKTP | 6 |
| B7 | TB.K.. / .EK... / ..C.TK / KT..C. / PKE.BT / .C...E | TBPKEC / CEKTPB / EPCBTK / KTBECP / PKECBT / BCTPKE | 7 |
| B8 | B.T.PE / ..E.T. / ..PB.K / .K..C. / .BCEKT / ...PB. | BCTKPE / KPECTB / CTPBEK / EKBTCP / PBCEKT / TEKPBC | 8 |
| B9 | .P..BT / ..TEKP / .TEKC. / ...PTE / .E...K / B.P... | EPKCBT / CBTEKP / PTEKCB / KCBPTE / TECBPK / BKPTEC | 8 |

- **Variation at every showing** (so the same puzzle never looks the same and no position pattern can be learned): the core applies a random **sudoku symmetry** — one of the 8 rotations/reflections of the square for 4 × 4 (for 6 × 6, the 4 that keep 2 × 3 boxes: identity, 180° rotation, horizontal flip, vertical flip), plus swapping rows within a band, swapping the two bands (4 × 4) / any of the three bands (6 × 6), swapping columns within a stack — and a **random relabelling** of which picture plays S/T/L/C. Uniqueness and single-solvability are invariant under all of these (gated).
- **Answer position**: there is no option to guess; what is measured instead is that the beds with one possibility at the start are spread: gated over 300 showings per level, each of the 16 (36) beds is a first single in a share within ± 12 percentage points of the level's mean share (mean = average first singles ÷ beds: 8-planted 5.0/16, 6-planted 3.8/16, big 7.0/36 — measured, never re-tuned to pass), and no packet is the right first move more than 40 % of the time (packets are also shuffled in the tray at every showing).
- **Order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row.

## 7. Check, the misses, the success
There is no Check button. A **bump** = a seed refused by a root clash. Bumps are counted per round; a dead end is not a bump (it is shown, see §5).
- **Nothing planted for 20 s** → bubble "Pick a seed and plant it in an empty bed." (no miss)
- **Bump 1** → the apparatus already showed the clash (coral root to the twin); bubble "That flower is already in this {row|column|box} — see the line? Try a different seed here." ({row|column|box} names the direction(s) that clashed — the core knows which root hit; if several, "row and column", etc.)
- **Bump 3** → the next time the child lifts a packet, the beds where that packet **cannot** go dim (their roots would clash); the child still chooses the bed. Bubble "The dim beds can't take this seed. Where can it grow?"
- **Bump 5 (or a dry bed for 10 s)** → a **sunbeam** (soft yellow cone from the top of the card) lands on one bed that has exactly one possibility (the solver's next naked single, else hidden single); its root cross lights. Bubble "This bed has room for only one flower. Which one is missing from its row, column and box?"
- A successful planting takes the dimming/sunbeam away until the next bump.
- **Dry bed** bubble (whenever one appears): "Nothing can grow here — pull out a sprout and think again."
- **Success** (all beds filled, no clash): every sprout grows to full size and full colour in a wave from the top-left (60 ms per bed), the beams glint, the bee flies a lap along each row (800 ms per row), a butterfly crosses the garden diagonally. Bubble: "Your garden is full — every row, every column and every box has all {n}!" ({n} = four / six, written as a word).

## 8. Settings
1. **Garden**: "Small, 8 planted" / "Small, 6 planted" / "Big garden" — visible at rest (grid size, number of flowers already planted).
2. **Seeds** (small garden only; the big garden always grows vegetables): "Flowers" / "Fruits" — visible at rest (the planted pictures and the packets change).

## 9. Words (EN source)
- title: "The Sudoku Garden"
- instruction: "Every row, every column and every box needs each picture once. Plant a seed: its roots check its row, its column and its box. The garden blooms when it is full."
- task lines: "Every row, column and box needs all four. Plant the seeds!" · "Every row, column and box needs all six. Plant the seeds!"
- hints: "Pick a seed and plant it in an empty bed." · "That flower is already in this {where} — see the line? Try a different seed here." ({where} ∈ "row" · "column" · "box" · "row and column" · "row and box" · "column and box" · "row, column and box" — the fruit/vegetable rounds say "That one is already in this {where}…") · "The dim beds can't take this seed. Where can it grow?" · "This bed has room for only one flower. Which one is missing from its row, column and box?" (fruit/veg: "only one picture") · "Nothing can grow here — pull out a sprout and think again."
- celebration: "Your garden is full — every row, every column and every box has all {n}!"
- settings: "Garden" — "Small, 8 planted" / "Small, 6 planted" / "Big garden" · "Seeds" — "Flowers" / "Fruits"
- aria: bed "Row {r}, column {c}: {noun} | empty | dry"; packet "{noun} seeds"; root result "{noun} is already in this {where}".

Locale traps:
- **row / column / box**: the curriculum words for sudoku differ — de "Zeile / Spalte / Kasten" (Kasten or Block — the reviewer picks the one in German Grundschule sudoku sheets), fr "ligne / colonne / carré", es "fila / columna / cuadro", pt "linha / coluna / quadrado", it "riga / colonna / riquadro", nl "rij / kolom / blok", sv "rad / kolumn / ruta", da "række / kolonne / felt" (the reviewer checks "boks"), no "rad / kolonne / boks", fi "rivi / sarake / laatikko" (fi case in "tällä rivillä" — the {where} phrases are authored as whole fixed phrases per locale, including case, e.g. fi "tällä rivillä", "tässä sarakkeessa", "tässä laatikossa"; never a word slotted into a frame).
- **{n} as a word**: "four/six" — de vier/sechs, fi neljä/kuusi; fi "kaikki neljä" takes no partitive after "kaikki"; fr "les quatre"; authored per locale.
- **"Flower" in the fruit hints** — the hint string switches to a neutral "picture" form for fruits and vegetables (no gender agreement with a flower noun: fr "fleur" f, de "Blume" f vs "Bild" n — two authored variants per hint).
- Rows/columns are numbered only in aria (1-based, top-left), never on the apparatus.
- No reading direction issue: a sudoku has none; the bloom wave goes top-left → bottom-right in all locales (decorative).

## 10. Sound off, access, phones
- Legible with the sound off: roots, coral clash line, wilt-back, dry cracked soil, sunbeam, bloom wave.
- Keyboard: arrow keys move a focus box over the beds; number keys 1–4 (1–6) pick the packet in tray order, Enter plants; Delete pulls a sprout; Space shows the root cross. Focus ring 3 px #146B5E.
- aria-live polite announces each result ("tulip planted" / "tulip is already in this column").
- Taps ≥ 44 px everywhere (beds 76 / 52; packets 76 / 52). Pictures 96 at 704 (4 × 4), 64 at 360 (4 × 4); the 6 × 6 big garden's 76 / 46 px beds sit inside the puzzle-grid floor (≥ 40 / ≥ 30 px).
- prefers-reduced-motion: roots appear as static lines for 600 ms; wilt-back is a fade; the bloom is one step.

## 11. Distinct from
- **#260 The Clue Table** (same batch): clue statements + elimination between two sets; here no clues, the constraint is "each picture once per row/column/box".
- **The `sudoku` worksheet app / its decks** (Family F drag, Check-Answers grading): a wrong picture there is only coloured at Check; here each planting is checked by visible roots in three directions, and dead ends are shown as dry beds.
- **#225 The Sorting Cabinet**: a 3 × 3 attribute matrix with one open drawer; here a whole Latin square is built.
- **`pattern-bench`, `folding-sheet` tools**: no constraint grid.
- Registry: no built or designed activity uses root crosses or dry beds.

## 12. Build plan
- **Core state**: `{n:4|6, box:{r:2,c:2}|{r:2,c:3}, given[][], cells[][] (0 = empty, k = picture), labels[k] → noun, bumps, sun:null|{r,c}, dimFor:null|k}`.
- **Functions**: `peersOf(r,c)` (row, column, box) · `clashes(r,c,k)` → `[{r,c,dir:'row'|'col'|'box'}]` · `plant(r,c,k)` → `{ok}|{clash:[…]}` · `pull(r,c)` · `candidates(r,c)` · `dryBeds()` · `isComplete()` · `nextSingle()` (naked first, then hidden) · `transform(puzzle, sym, relabel)` · `nextTask`.
- **Gate's own ground truth** (`verify-sudoku-garden-core.js`): the 27 puzzles are typed literally into the gate; it (1) enumerates every completion by its own backtracking and asserts exactly one, equal to the listed solution; (2) runs its own singles solver (naked-only for the 8-planted level) to completion; (3) counts first singles and matches the table; (4) for 1,000 random symmetry+relabel transforms per puzzle re-checks uniqueness and that the core's `transform` agrees with the gate's own; (5) drives the core: every wrong planting in every bed of the first state returns the exact clash set (directions) the gate computes; `dryBeds()` matches the gate's; (6) first-single spread and packet balance over 300 showings; (7) picture checks: every noun in its JSON, none refused, and for the six vegetables and each four-set no two share both a hue band (from the webp's mean ink hue, measured with `sharp` from `cache/themes-512`) and an aspect class (ink box w/h within 15 %).
- **Mutations** (one per rule): clash ignores the box · clash ignores the column · clash ignores the row · plant accepts on a given bed · pull removes a given flower · dry bed not detected · stuck flower (a unit with no bed for a missing flower) not detected · a puzzle with two solutions · an 8-planted puzzle that needs a hidden single · symmetry that breaks 2 × 3 boxes (90° rotation of 6 × 6) · relabel that maps two symbols to one picture · sunbeam on a bed with two possibilities · success fires with an empty bed · dimming shows beds where the seed CAN grow.
- **Pictures to re-verify**: flowers/clover at 46 px (a clover leaf must read as a plant in the garden — if the reviewer finds it odd among flowers, swap to flowers/hydrangea, pink cluster, and re-run the hue/aspect gate), vegetables/corn vs vegetables/pumpkin hue gap.
- **Risks**: 6 × 6 on a 320 phone is tight (beds 48) — playable, but the level is labelled for older children and the small garden is the default.
- **BLOCKED**: nothing.

## 13. The four questions (answered, honestly)
1. **Would a 5–8-year-old choose it again?** Yes — racing roots, a funny boing, sprouts that pop, and a garden that blooms in a wave with a bee doing laps.
2. **Would a teacher put it on the board?** Yes — the three-direction rule is visible on every move (the single most common sudoku error, checking only one direction, is shown by the root that caught it), dead ends are visible, and every puzzle is solver-verified unique and solvable by logic alone.
3. **Would a parent trust it?** Yes — real flower, fruit and vegetable pictures, calm motion, no reading, nothing timed or sold.
4. **The invention in one sentence:** every seed sends roots along its row, down its column and around its box, and it only takes root if no root touches the same flower.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- All 27 puzzles re-solved by the critic's own backtracking + singles solver (`work-c18/check261.py`, not the designer's script): each has exactly one completion equal to the listed solution, the listed solutions are valid, the given counts are 8 / 6 / 18, every row and column has a planted flower, the first-singles counts match, and every puzzle (even the 6-planted and 6 × 6 ones) falls to naked singles alone.
- Added the second dead end a guess can cause — a "stuck flower" (a unit with no bed left for a missing picture) — which the dry-bed rule alone would leave invisible.
- Picture sizes restated under the new puzzle-grid ruling (no "exception" any more); the first-single spread gate given real, measured means instead of an invented 5–30 % band that a 6-single puzzle would have failed while correct.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
