# New #284 — The Crossing Lights → THE BEAM LAMPS: only where two beams cross is the light hot enough to paint (READINESS · grid coordinates)

## 0. Identity
- id `crossing-lights.play.grid-coordinates` · grade 2 · READINESS (framework entry in `frontend/lib/frameworks.ts`: spatial reasoning / grid coordinates — the de/fr/nl/Nordic grade-2 "Koordinaten / repérage sur quadrillage / coördinaten" strand) · strand Logic & Visual Thinking · own files `crossing-lights-core.js`, `crossing-lights-activity.js`, `crossing-lights-activity.html`, `crossing-lights-activities.json`.
- worksheets covered: **G2-279** Grid Coordinates (find, colour by group, a picture emerges) · **G2-302** on a 6×6 grid · **G2-303** on a 10×10 grid · **G2-308** Write the Codes (picture coloured in; name each square's code).
- new instrument. Picture data: the 6×6 figures reuse the reviewed pixel figures `LS_PIXEL_FIGURES` in **`scripts/worksheet-gen/data/b2/figures-levelset.js`** (keys `note, icecream, pine, pencil, balloon, flower` — the June `figures.js PIXEL_FIGURES` has none of these keys; critic-verified) plus two authored here; the 5×5 and 10×10 sets are authored here (§6), every count, colour group, placement and row-10 claim re-measured by the critic (`work-c29/grid284.js`, `pins284.js`).

## 1. The pitch
"Each letter along the top is a lamp that shines down its column, each number down the side is a lamp that shines across its row — and only the one square where the two beams cross gets hot enough to take the paint."

## 2. Why a child will want it again
- **Lamps are irresistible.** A tap on the letter lamp *D* swings its little hood open and a soft yellow beam pours down column D (*fwomp*, 180 ms). A tap on lamp *4* sends a beam across row 4. Where they cross, one square glows white-hot and sparkles — and the paint from the code card flows into it with a *blip*. Children switch lamps on and off just to watch beams sweep the board.
- **A hidden picture develops square by square.** Every painted square is a pixel of a picture nobody has named; with each code the child guesses more ("a kite?"). When the last code lands, the picture *comes alive*: its pixels shimmer, the kite's tail sways one cell left and right, the snake wiggles along its row, the tulip's petals pulse — a pure pixel-art animation, ~1.5 s.
- **Every other lamp is cooling (the default).** Codes alternate: on one the beams do the finding, on the next the two lamps' hoods are grey — the child must find that square with their own eyes (letter on top, number on the side) and tap it; Check fires the lamps of every cooled code to prove it. Each lit code is a worked example for the cooled one after it, and the beams the child leaned on become the proof, not the crutch.
- **The reverse game (Write the codes)** is a detective toy: a square is marked with a pin; the child aims two beams to make them cross *on* the pin — like aiming searchlights — and the code writes itself from the two lamps they used.
- No timer, no score. A wrong square can be wiped (tap it with the sponge) and repainted.

## 3. The skill and the misconception
- Skill (the four worksheets): find a square from its letter–number code (B2 = column B, row 2) and name the code of a given square; on 5×5, 6×6 and 10×10 grids, including the two-digit row 10 (A10…J10).
- Misconceptions and the push-back:
  1. **Reading the code number-first** (2B for B2) or **mixing the axes** (looking for "2" along the top). Letters are lamps that exist ONLY on the top rail and shine DOWN; numbers exist ONLY on the side rail and shine ACROSS. A letter cannot light a row. And in code mode the code is assembled by the lamps in their fixed order — a teal letter plate (the top-lamp colour) then a coral number plate (the side-lamp colour) — so the written code always says column-then-row.
  2. **Counting the label as square 1 / counting from the wrong edge.** There is nothing to count: each lamp sits at the head of its own column/row and its beam starts there. In *Lamps: only to check my square* mode the child must find the square without beams; on Check the two lamps of the code fire and their crossing lands on the RIGHT square — if the child's paint sits one square off, the beam visibly misses it by one.
  3. **Row 10 confusion** (10×10: reading "A10" as A1 + 0). Lamp *10* is one lamp with two digits on it; four of the eight 10×10 pictures use row 10.
- One right square per code; codes never repeat inside a round.

## 4. The stage
**At 704 (split ≥ 700: grid left, code list right):**
- **The grid** — square cells with 2 px ink lines on cream: 5×5 cells **80 px**, 6×6 **68 px**, 10×10 **46 px** (grid 400–460 px).
- **Top rail lamps** — one lamp per column above it: a drawn lamp head **44 × 44** (teal hood, letter in white Nunito 800 22 px), hood closed at rest. **Side rail lamps** — one per row at the left, same size, coral hood, the number in white. Beams are translucent yellow bands the width of one cell (40 % opacity), drawn over the grid; the crossing cell gets a white-hot glow (radial, 90 %).
- **The code list** (right, 220 px) — one card per colour group: a colour swatch 36 px + its codes as chips (Nunito 800 22 px, e.g. "D4"), **shuffled within the colour** (sorted codes would draw the picture — the worksheet rule). The **active code chip** is enlarged (64 × 44) with a ring; painted chips get a tick.
- **The sponge** — a small drawn sponge tile 48 × 48 under the list (wipe a square).
- Task line (EN, 22 px): find mode — "Switch on the two lamps of the code. Paint where the beams cross." · code mode — "Make the beams cross on the pin. The lamps write its code."

**At 360 (stacked):** grid first: 5×5 cells 56 px, 6×6 46 px, 10×10 28 px (+ rails). Rails at 5×5/6×6 keep 44-px lamp switches; at 10×10 the rails become **slider rails**: one lamp head 44 × 44 rides each rail, snapping cell to cell (drag, or tap on the rail to jump it there; the head shows the letter/number it sits on). Code list under the grid as a horizontal row of colour cards, active chip 56 × 44. Stage ≈ 30 + 44 + 10 × 28 + 12 + 60 = 426 (10×10) / 44 + 6 × 46 + 72 = 392 (6×6) → Check above the 360 × 740 and 320 × 640 folds (at 320: 10×10 cells 26 px, slider rails as above).
- Cells are NOT tap targets in lamp mode (the lamps are), so the 28-px phone cells do not break the 44-px rule; in *check-only* mode on phones a tap places a 44-px crosshair that the child can drag cell to cell before painting.

No words anywhere: letters, numbers and colours are the content. No library pictures — the picture IS the painted grid (apparatus pixels).

## 5. The hand
- **Find mode:** the active code chip shows, e.g., **D4**. Tap lamp **D** → its hood opens, the beam pours down (180 ms, a soft *fwomp* 330 Hz). Tap lamp **4** → the row beam (*fwomp* 440 Hz). The crossing glows; after 250 ms the active chip's colour flows into it (*blip* 660 Hz) and the chip gets its tick; both hoods close (200 ms) and the next chip becomes active. If the beams cross on a square the code did NOT name, the paint still flows (the child's decision is honoured) — it is judged on Check.
- Tapping a lit lamp again switches it off. Only one letter lamp and one number lamp can be on (a new tap moves the beam, 120 ms sweep).
- **Sponge:** tap the sponge, tap a painted square → it wipes (*squeak*) and its chip un-ticks.
- **Code mode:** pins (drawn coral map pins, 30 px) stand on 6 squares of an already painted picture; the active pin pulses. Aim lamps until the crossing sits on it → the code plates assemble in a slot under the grid: teal plate (letter) + coral plate (number). Tap the plates' **Write** check-mark (or Check) to file the code to that pin's tag.
- **Check-only mode** (setting 2): lamps are dark; the child taps a square for the active chip (5×5/6×6 directly; phones: crosshair). On Check the code's two lamps fire.
- **Keyboard:** letters A–J and digits 1–10 type the lamps (1 then 0 within 600 ms = 10); Enter = Check; Tab moves through chips.
- **Free play:** after the picture comes alive, every lamp is a toy: sweep beams anywhere; tapping any crossing makes a little sparkle; nothing is graded.
- Optional TTS: tapping a chip reads it ("D four") in the 5 TTS locales.

## 6. The rounds
**One round = one picture.** Codes are listed per colour group, shuffled within each colour; the child does them in list order (the active chip advances), so the list order — not the picture — sets the path.

**5×5 (letters A–E, rows 1–5)** — authored, measured:
| # | picture | codes | colour groups |
|---|---|---|---|
| 1 | heart | 11 | red 11 |
| 2 | sailboat | 9 | red 3 · brown 1 · blue 5 |
| 3 | tree | 12 | green 11 · brown 1 |
| 4 | mushroom | 10 | red 8 · yellow 2 |
| 5 | cherries | 10 | green 4 · red 6 |
| 6 | tulip | 9 | red 5 · green 4 |
| 7 | ladybug | 12 | brown 4 · red 8 |
| 8 | fish | 11 | blue 8 · orange 3 |
Grids (row 1 at top): heart `.r.r. / rrrrr / .rrr. / ..r.. / .....` · sailboat `..r.. / ..rr. / ..n.. / bbbbb / .....` · tree `.ggg. / ggggg / .ggg. / ..n.. / .....` · mushroom `.rrr. / rrrrr / ..y.. / ..y.. / .....` · cherries `...gg / ..g.g / .r..r / rr.rr / .....` · tulip `.r.r. / .rrr. / ..g.. / .gg.. / ..g..` · ladybug `..n.. / .rnr. / rnrnr / .rrr. / .....` · fish `..... / .bb.o / bbbbo / .bb.o / .....`.

**6×6 (A–F, 1–6):** `figures-levelset.js` figures `note` 12 · `icecream` 13 · `pine` 14 · `pencil` 14 · `balloon` 14 · `flower` 15 (all 6×6, reviewed; counts critic-measured) + authored `umbrella` 14 (`.bbbb. / bbbbbb / ..n... / ..n... / .nn... / ......`, blue 10 · brown 4) and `cherries6` 11 (`....g. / ...gg. / ..g..g / .r...r / rr..rr / ......`, green 5 · red 6). Range 11–15 codes. (Colour letter `k` = pink, used by flower, pencil, icecream.)

**10×10 (A–J, 1–10):** authored, placed at offsets so different pictures use different parts of the grid; four reach row 10:
| # | picture | codes | colours | columns used | uses row 10 |
|---|---|---|---|---|---|
| 1 | kite | 16 | red 13 · blue 3 | F–J | no |
| 2 | sailboat | 13 | red 6 · brown 1 · blue 6 | D–I | no |
| 3 | snake | 11 | green 10 · red 1 | A–J | **yes** |
| 4 | music note | 12 | purple 12 | E–I | **yes** |
| 5 | key | 14 | yellow 14 | A–J | no |
| 6 | cherries | 15 | green 7 · red 8 | D–J | no |
| 7 | arrow | 11 | orange 11 | D–J | **yes** |
| 8 | tulip | 16 | red 11 · green 5 | C–G | **yes** |
Patterns (each listed row is 10 characters; place the first listed row on grid row R and shift every row right by C columns — no painted cell falls past J or below 10; verified by `work-29/grid10.js`): kite R2 C+3 `....r..... / ...rrr.... / ..rrrrr... / ...rrr.... / ....r..... / .....b.... / ....b..... / .....b....` · sailboat R4 C+1 `.....r.... / .....rr... / .....rrr.. / .....n.... / ..bbbbbb..` · snake R7 C+0 `.gg....... / g..g...gg. / ....g.g..g / .....g...r` · note R5 C+0 `......pp.. / ......p.p. / ......p... / ......p... / ....ppp... / ....ppp...` · key R4 C+0 `.yyy...... / y...y..... / .yyy.yyyy. / .......y.y` · cherries R4 C+1 `......g... / .....gg... / ....g..g.. / ...g....g. / ..rr...rr. / ..rr...rr.` · arrow R6 C+2 `.....o.... / ......o... / .ooooooo.. / ......o... / .....o....` · tulip R4 C+0 `..r.r.r... / ..rrrrr... / ...rrr.... / ....g..... / ...gg..... / ....g..... / ....g.....` (r red · b blue · y yellow · g green · o orange · p purple · n brown).
(Range 11–16 codes — the dossier's "6–12" was written before the 10×10 needed enough squares to be a readable picture; 11 is the measured floor for a recognisable 10×10 icon, 16 the ceiling.)

**Code mode (G2-308):** the same 24 pictures shown fully painted; per round 6 pins (8 on 10×10) on painted squares. Critic correction: "all-different rows AND columns" is impossible — the largest such set inside these pictures is only **3–6 squares** (measured: 5×5 heart 4, sailboat 3, tulip 3, fish 3; 6×6 note 5, pencil 6, the rest 4; 10×10 arrow 3 … cherries 6). The honest rule: **(a)** the pins include a maximum distinct-row-and-column set (3–6 pins); **(b)** the remaining pins are added so that **no two consecutive pins share a letter or a number** (every pin needs BOTH lamps re-aimed) and no letter or number is used by more than 2 pins; **(c)** on the four 10×10 pictures that reach row 10 (snake, note, arrow, tulip) at least one pin is in row 10, and on the pictures that reach column J (kite, snake, key, cherries, arrow) at least one pin is in column J. All three are gate-asserted per picture.

**Answer position / guessability:** in find mode the child cannot paint by guessing the shape — paint only ever lands where two beams cross, so every square costs a real letter + number. In check-only mode (and on the cooled codes of the default) guessing a shape is the shortcut to watch: once part of a picture is painted, a child may tap "where the picture should go" instead of reading the code. Measured over the 24 pictures × 2,000 shuffled passes (`work-c29/guess284*.js`): a child who taps a random empty square next to the painted ones is right on **5–6 %** of cooled codes; even an impossible "oracle" who already knows the exact finished picture and the chip's colour is right on 38 % with alternating cooled codes (50 % if the cooled codes were the second half — which is why the default alternates). The defences: the chip order is shuffled inside each colour, cooled codes alternate with lit ones, and Check fires each code's own lamps, so a lucky shape-guess is graded on the code, never on the outline. Chip order inside a colour is shuffled per pass (the gate asserts no colour's chip list is in reading order and that the first chip of a round is never the picture's top-left cell more than once per pass). Pictures reshuffle order-only per pass.

## 7. Check, the misses, the success
- Find mode checks **per picture** (Check when all chips are ticked, or any time):
- **Check with nothing painted** → hint, no miss: "Tap the letter lamp first, then the number lamp."
- **Miss 1** — for every wrong square: the lamps of the code that square was painted for fire, and their crossing glows on the RIGHT square; the wrong square shows a dotted coral outline and the beam visibly passes it. Hint: "Follow the letter beam down and the number beam across. Where do they meet?"
- **Miss 2** — the wrong square wipes itself and its chip un-ticks; the chip shows its two lamps' hoods half-open (a preview of which lamps to use). Hint: "Letters are on top, numbers on the side: the letter first."
- **Code mode miss:** the filed code's two lamps fire from the plates — their crossing lands on a different square than the pin (shown), the pin wobbles. Miss 2: the pin's own column beam alone glows.
- **A new move** clears outlines and previews until the next Check.
- **Success** — the picture comes alive (pixel animation ~1.5 s, a rising three-note chime); bubble: "{n} squares, each where a letter beam met a number beam — it's a picture!" (code mode: "Every pin has its code: letter first, then number.")

## 8. Settings (each visibly changes the board at rest)
1. **Grid:** 5 × 5 · 6 × 6 · 10 × 10 — a different board size and rails.
2. **Lamps:** Beams for every square · **Every other lamp is cooling** (default) · Only to check my square — at rest the hoods are all bright / bright with a small grey "cooling" dot on each / all dark grey (no beams until Check). In the default, codes 2, 4, 6 … of each picture are cooled: their hoods go grey and the child taps the square (5×5 and 6×6 directly; 10×10 on phones through the 44-px crosshair); Check fires the two lamps of every cooled code. Mode (find / write the codes) is a third choice inside the round chooser: **Task:** Find the squares · Write the codes.
(Three choosers total — the shell's settings drawer holds them; each changes the board at rest.)

## 9. Words (EN source; 10 locales hand-written; one native + pedagogy reviewer)
- title: "The Crossing Lights" · instruction: "Letters shine down, numbers shine across. Paint the square where the two beams cross."
- prompts: "Switch on the two lamps of the code. Paint where the beams cross." · "Make the beams cross on the pin. The lamps write its code." · "Find the square of the code, then press Check."
- hints: "Tap the letter lamp first, then the number lamp." · "Follow the letter beam down and the number beam across. Where do they meet?" · "Letters are on top, numbers on the side: the letter first."
- celebration: "{n} squares, each where a letter beam met a number beam — it's a picture!" · "Every pin has its code: letter first, then number."
- settings: "Grid", "Lamps" — "Beams for every square" / "Every other lamp is cooling" / "Only to check my square", "Task" — "Find the squares" / "Write the codes".
- extra prompt (cooled lamps): "The lamps are cooling. Find the square yourself, then press Check."
- **Locale traps:** letters A–J exist in every one of the 11 alphabets in the same order (no å/ä/ø/ñ/ç needed; I and J are both present — do not skip J as some printed maps do). Colour names are never shown (swatches only). Codes are written letter-first in all 11 school traditions (Schiffe versenken / bataille navale "B2"); fi and sv number words are not used. TTS reads "D four" per locale, else silent. Digits are Western Arabic in all 11.

## 10. Sound off, access, phones
- Fully legible with sound off: beams, glows, ticks and the coming-alive picture carry everything.
- Keyboard path in §5; aria: lamps "column D lamp, off/on", "row 4 lamp"; cells "D4, painted red / empty"; chips "code D4, red, to do / done".
- Taps: lamps 44 × 44; 10×10 phone rails use 44-px slider heads; chips 44 tall; the sponge 48. Check above the folds (§4).

## 11. Distinct from
- **New 260 The Clue Table (latch rods)**: row/column logic elimination — rods SHUT windows in a logic grid; here two beams locate one cell from a written code. No elimination.
- **New 224 The Tile Twin**: copying a grid picture row by row; no coordinates.
- **New 261 The Sudoku Garden**: roots along rows/columns check for repeats; no codes.
- The Color-by-Number level sets colour by a number in the cell; here the cell is FOUND by its letter-number address.
- No premium tool does grid coordinates.

## 12. Build plan
- **Core state:** `{ size, picture:{cells:Map<code,colour>}, chips:[{code, colour, done}], active, lampCol:null|i, lampRow:null|j, painted:Map<code,colour>, task, lamps }`. Functions: `crossing()` → code or null, `paint()`, `wipe(code)`, `evaluate(state)` → wrong squares with their intended codes, `codeFromLamps()`, `pins(picture)` (distinct rows & cols).
- **Verify gate (own oracle from the grids):** every picture's code set equals its non-empty cells; codes unique; chip lists shuffled (never reading order); 5×5 9–12, 6×6 11–15, 10×10 11–16 codes; exactly 4 of the 8 10×10 pictures use row 10 and no painted cell falls past J or below 10; pins follow §6 (a) a maximum distinct-row-and-column subset is included, (b) consecutive pins never share a letter or number and no label is used by > 2 pins, (c) row-10 / column-J pins wherever the picture reaches them; in the default exactly the even-numbered codes of each picture are cooled; paint only lands at a lamp crossing (no other code path writes `painted`); check-only mode paints nothing before Check reveals; letters A–J only.
- **Mutations:** a letter lamp lights a row · paint lands without both lamps · chips sorted · row 10 parsed as row 1 · code plates written number-first · pins sharing a row · check-only mode shows beams before Check · wipe leaves the chip ticked · picture comes alive with a wrong square left.
- **Pictures:** none from the library (all apparatus pixels). Colours from the shell palette + the b2 `COLOR_LETTERS` swatches (r b y g o p n k).
- **Risks:** 10×10 on 320-px phones uses slider rails (documented); nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — lamps, beams, the white-hot crossing and a secret picture that wiggles to life.
2. **On the board?** Yes — "letter lamp, number lamp, where do they cross?" is the coordinate lesson in one sentence, and the check-only mode is a real assessment.
3. **Parent trust?** Calm, no text, no score, the same pictures as the printed worksheets.
4. **The invention:** each letter is a lamp shining down and each number a lamp shining across — only the square where the two beams cross gets hot enough to take the paint.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- The 6×6 figures cited from `figures.js` do not exist there (its keys are duck…umbrella); the real source is `figures-levelset.js LS_PIXEL_FIGURES` — fixed; all 24 grids re-measured (counts, colour groups, 10×10 placement inside A–J × 1–10, row 10 used by exactly snake/note/arrow/tulip) — the designer's numbers hold.
- The code-mode pin rule ("all-different rows AND columns", 6–8 pins, a row-10 AND a column-J pin on every 10×10) was impossible: the largest distinct set is 3–6 and three 10×10 pictures never reach J. Replaced with a satisfiable, gated rule.
- Invention strengthened: with beams on every code the apparatus did the finding for the child; the new default "every other lamp is cooling" makes every second code the child's own coordinate reading, right after a lit worked example, with the beams turned into the proof on Check.
- Guessability now names the real shortcut (shape-guessing once part of the picture shows) and measures it: 5–6 % for a realistic guesser; 38 % for an all-knowing oracle with alternating cooled codes vs 50 % with a cooled second half — so the default alternates.
