# New #285 — The Fold Press → THE INK-AND-STAMP PRESS: fold your wet squares onto the raised half and see where the ink lands (READINESS · symmetry)

## 0. Identity
- id `fold-press.play.symmetry-lines` · grade 2 (the mirror-line count face is grade 3) · READINESS framework (spatial reasoning / symmetry, `frontend/lib/frameworks.ts`) — **deliberately not tagged 4.G.A.3** (the repo's character-art spec bans line-symmetry as a graded CCSS tag below grade 4; this row claims readiness only and never prints a CCSS code) · strand Logic & Visual Thinking · own files `fold-press-core.js`, `fold-press-activity.js`, `fold-press-activity.html`, `fold-press-activities.json`.
- worksheets covered: **G2-247** Mirror Line? · **G2-248** Find the Mirror Picture · **G2-253** Complete the Symmetry Picture · **G2-264** Easy Symmetry Drawing · **G2-265** Hard Symmetry Drawing · **G2-266** Heart and Butterfly · **G2-267** House and Crown · **G2-268** Mirror Below the Line · **G3-342** How Many Mirror Lines?
- new instrument (no old activity).

## 1. The pitch
"One half of the sheet is a raised stamp; you paint the other half with wet ink — then fold it shut and press: every wet square lands on its mirror partner, so the ink shows you exactly where you were right and where you were not."

## 2. Why a child will want it again
- **The press is a machine with a big lever.** Pull it and the sheet swings shut along the crease in 3-D (700 ms), a heavy roller rolls across it (*kerr-chunk*), and it swings open again. Every press is a little reveal.
- **Ink that merges.** Where a wet square meets its raised partner, the two fuse into one glossy square with a *shine* sweep — and when every square has fused, the whole picture locks and glints (a butterfly's wings give one slow flap: the two halves rotate 15° toward each other and back).
- **Smudges are funny, not shaming.** A wet square with no partner leaves a smeary blot on the stamp side; a raised square nobody inked stays pale and dry. The child laughs at the smudge and goes to fix it.
- **The fold test on shapes is a toy:** drag a fold line through a heart and press — it folds perfectly; through its middle sideways — the bottom tip pokes out over nothing. Children try diagonals on a rectangle "to see", which is exactly the misconception the standard targets.
- No timer, score or streak.

## 3. The skill and the misconception
- Skill: complete a half-painted grid picture so both halves match about a vertical or a horizontal line (G2-253, 264–268); decide whether a dashed line is a mirror line (G2-247); find the picture that is the same on both sides (G2-248); count a shape's mirror lines (G3-342).
- Misconceptions and the push-back:
  1. **Translating instead of reflecting** (copying the half as it is, shifted across). Every half picture is authored so that its translated copy is WRONG in at least 4 squares (measured, §6). Pressed, a translated copy leaves smudges and dry squares in a mirror-pattern the child can see — the fold physically carries each square to its partner, so the ink cannot lie.
  2. **Counting from the wrong edge** (column 1 of the left half copied to column 1 of the right half). The partner of a square is the same distance from the CREASE; the press shows it because the fold pivots on the crease.
  3. **"Every shape has one mirror line" / "a rectangle has four"** (the diagonal). In count mode the rectangle folded on its diagonal visibly overhangs at two corners in a second shade; only the true lines keep their crease. A circle keeps every crease the child tries.
- One right answer per round: the completed picture is unique (the mirror of the given half); each line round has one truth; each count has one value.

## 4. The stage
**At 704 (split ≥ 700: press left, controls right):**
- **The sheet** — a cream grid on a drawn press bed (teal frame 6 px). 6×6 cells **64 px** (384 px sheet), 8×8 cells **52 px** (416 px). The **crease** — a dashed ink line 3 px down the middle (vertical) or across (horizontal), with two small drawn hinge tabs at its ends.
- **The stamp half** — its painted squares are RAISED: a darker fill (the round's colour, e.g. coral #F2784B) with a 4 px bevel shadow, so they read as relief. The child's half is flat paper.
- **Ink pot** — a drawn pot 64 × 64 (same colour) beside the sheet: while it is selected, taps paint wet squares (glossy highlight); a second tap on a square lifts its ink.
- **The lever** — a drawn press lever 60 × 140 at the right; pulling it (drag down, or tap) = Check. The shell's Check button sits under it.
- **Line mode:** a single figure 320 × 320 on the bed with a dashed line; two prediction tiles under it: ✓ and ✗ (72 × 72, drawn marks, no words).
- **Pick mode (G2-248):** three small grid pictures (6×6 at 30 px cells, 180 px each) side by side, each with its own mini-press.
- **Count mode:** one SVG shape 300 × 300 (single fill #9ED9CF, 3 px ink) on the bed; a fold-line handle (a drawn ruler-like bar 340 × 14 with round grips) that rotates about the shape's **area centroid** (every mirror line of a shape passes through its centroid — the bounding-box centre would miss the equilateral triangle's 30° and 150° lines); a count tray of number chips **1 2 3 4 5 6** and **∞** ("many", for the circle) — 56 × 56 each. No 0 chip (operator rule: a how-many never has 0; a shape with no mirror line is judged in the Mirror-line? face instead).
- Task line (EN, 22 px): complete — "Paint the other half so it matches. Then pull the lever." · line — "Is the dashed line a mirror line? Choose ✓ or ✗, then press." · pick — "Which picture is the same on both sides? Press them to find out." · count — "Fold the shape every way it matches. How many mirror lines?"

**At 360 (stacked):** 6×6 cells 50 px (300 px), 8×8 cells **38 px** (304 px) — above the 34-px canvas-cell floor and with taps checked against a 44-px circular hit area centred on each cell (neighbours resolve by nearest centre). Ink pot and lever sit in one row under the sheet (pot 56, lever as a 120 × 56 horizontal pull-bar). Line figure 260; count shape 240 and its chips in one row of 8 × 40… raised to two rows of 4 × 56. Stage at 8×8 ≈ 304 + 12 + 56 + 44 (task) = 416 → Check above 360 × 740 and 320 × 640 (at 320: 8×8 cells 35 px, sheet 280).

Everything is drawn apparatus: grid, ink, stamp, shapes. No library pictures (shapes must have exact geometry and one fill, per the shapes-theme ruling). No words on the apparatus.

## 5. The hand
- **Paint:** tap a cell on the child's half → a wet square (ink spreads from the centre 120 ms, *blop*); tap again → lifted. Drag across cells paints a run. Cells on the stamp half are inert (they don't take paint — they are the stamp).
- **Press (Check):** drag the lever down (or tap it): the child's half swings over the crease (CSS 3-D rotateY/rotateX 180°, 700 ms, ease-in-out), roller passes (300 ms, low *kerr-chunk*), the half swings back (600 ms). Results then show on the STAMP half (where the ink landed): fused squares glossy, smudges, dry squares (§7).
- **Line mode:** tap ✓ or ✗ (a prediction is required before the lever works — the lever is locked with a small drawn latch until a tile is chosen), then pull: the figure folds along the dashed line; overhangs show in a second shade (dark teal) on both sides.
- **Pick mode:** press each candidate's mini-press (any order) — each folds and shows lock or overhang — then tap the one that locked; Check confirms.
- **Count mode:** drag a grip to rotate the fold line; it snaps to **12 directions every 15°** through the centre (0°, 15° … 165°), with a soft tick per snap. Tap **Fold** on the bar (a drawn hinge icon) → the shape folds there: true line → it lands exactly and the line is KEPT as a solid teal crease (*click*); false → overhang flashes and it unfolds. Kept creases accumulate. Tap a count chip → Check.
- **Keyboard:** arrows move a cell cursor, Space paints/lifts, Enter = press; count mode ←/→ rotate by 15°, F folds, digits choose the count.
- **Free play:** after success the sheet stays wet: the child may paint any pattern on either side and press for fun (no grading) — a butterfly-blot toy.

## 6. The rounds
**Complete — vertical crease** (G2-253 / 264 / 265 / 266 / 267). Left half given (the stamp); the child paints the right half. Full picture = half + its mirror. Measured in `work-29/sym2.js`:

6×6 (half 3 wide × 6 tall) — 9 pictures, 8–13 squares:
| picture | given half (rows top→bottom) | squares | a translated copy gets wrong |
|---|---|---|---|
| heart | `.## ### ### .## ..# ...` | 11 | 6 |
| butterfly | `#.. ##. ### .## ##. #..` | 11 | 10 |
| house | `..# .## ### #.# #.# ###` | 13 | 4 |
| crown | `#.. #.# ### ##. ### ...` | 11 | 4 |
| tree | `..# .## ### ..# ..# ...` | 8 | 8 |
| rocket | `..# .## .#. .## ### #..` | 10 | 8 |
| cat | `#.. ##. ### #.# ### .##` | 13 | 6 |
| flower | `.#. ### .#. ..# .## ..#` | 9 | 6 |
| boat | `..# .## ..# ### .## ...` | 9 | 8 |

8×8 (half 4 wide × 8 tall) — 9 pictures, 13–17 squares (the "hard" level, G2-265):
| picture | given half | squares | translated copy wrong |
|---|---|---|---|
| heart | `.##. #### #### .### ..## ...# .... ....` | 16 | 8 |
| butterfly | `#... ##.. ###. .### ..## ###. ##.. #...` | 17 | 22 |
| house | `...# ..## .### #### #..# #..# #.## ....` | 17 | 10 |
| crown | `#... #..# #.## #### ##.# #### .... ....` | 17 | 6 |
| owl | `#... ##.. #.## ..## .### ..## ...# .#..` | 15 | 22 |
| robot | `...# .### .#.# ..## ##.# ..## ..#. .#..` | 15 | 22 |
| bug | `#... .#.. ..## .### ##.# .### #.#. ....` | 15 | 18 |
| tree | `...# ..## .### ..## .### ...# ...# ..##` | 15 | 22 |
| lamp | `...# ..## .### ...# ...# ..## .### ....` | 13 | 18 |
(The dossier asked for 6–14 squares; the 8×8 hard set measures 13–17 because a recognisable 8-wide picture needs it — the easy 6×6 set is 8–13.)

**Complete — horizontal crease** (G2-268 "Mirror Below the Line"): the TOP half is given, the reflection is painted below — like a picture reflected in a lake. Measured in `work-29/symh.js`:
- 6×6 (6 wide × 3 tall): house `..#... .###.. .#.#..` (6) · tree `.###.. #####. ..#...` (9) · boat `...#.. ..##.. ######` (9) · tent `..#... .###.. #.#.#.` (7) · sun `..#... #.#.#. .###..` (7) · flag `####.. ###... #.....` (8) · duck `.##... .####. ..##..` (8) · hill `....#. ..###. ######` (10) · cloud `...... .##... ####..` (6). Translated-copy errors 4–10.
- 8×8 (8 wide × 4 tall; the patterns are written HERE — the scratch file they came from is not part of the repo; critic re-measured squares and translated-copy errors): house `...#.... ..###... .#####.. .#.#.#..` (12, 8) · tree `..##.... .####... ######.. ..#.....` (13, 6) · boat `....#... ...##... ..###... ########` (14, 16) · castle `#...#... #####... ##.##... #####...` (16, 8) · rocket `...#.... ..###... ..#.#... .#####..` (11, 10) · mountain `.......# ......## .#...### ###.####` (14, 16) · lighthouse `..#..... .###.... ..#..... ..#.....` (6, 4) · swan `.#...... #....... .#####.. ..####..` (11, 22) · windmill `#...#... .#.#.... ..#..... .###....` (8, 16). Translated-copy errors 4–22.
Every given half touches the crease (so the reflection is attached to it, as in a real blot).

**Mirror line?** (G2-247) — 10 rounds, ✓ 5 / ✗ 5, SVG shapes and grid pictures with a dashed line:
| # | figure | line | truth |
|---|---|---|---|
| 1 | heart | vertical through the middle | ✓ |
| 2 | heart | horizontal through the middle | ✗ |
| 3 | rectangle (2:1) | diagonal | ✗ (the classic) |
| 4 | square | diagonal | ✓ |
| 5 | isosceles triangle (point up) | vertical | ✓ |
| 6 | parallelogram | vertical | ✗ |
| 7 | circle | any diameter (at 30°) | ✓ |
| 8 | 6×6 grid house (from the set) | vertical crease | ✓ |
| 9 | 6×6 grid house | vertical line one column off-centre | ✗ |
| 10 | 8×8 butterfly | horizontal | ✗ |

**Find the mirror picture** (G2-248) — 8 rounds; three 6×6 grid pictures, exactly one symmetric (a full picture from the 6×6 set); the two others are the same picture with 1 square moved (near-miss) and the translated-copy version (the misconception made visible). The symmetric one sits left / middle / right 3 / 3 / 2 times per pass (shuffled, gate-measured).

**How many mirror lines?** (G3-342; READINESS — the repo bans line symmetry as a graded CCSS tag below grade 4, orchestrator ruling) — 12 rounds, every true line at a multiple of 15° through the area centroid (so the 12-direction snap hits each one exactly):
| shape | true lines (angles) | count |
|---|---|---|
| circle | all | ∞ (many) |
| square | 0°, 45°, 90°, 135° | 4 |
| plus sign (equal-armed cross) | 0°, 45°, 90°, 135° | 4 |
| rectangle 2:1 | 0°, 90° | 2 |
| rhombus (not a square, diagonals horizontal/vertical) | 0°, 90° | 2 |
| oval (ellipse) | 0°, 90° | 2 |
| equilateral triangle (point up) | 90°, 30°, 150° | 3 |
| regular hexagon (flat top) | 0°, 30°, 60°, 90°, 120°, 150° | 6 |
| heart | 90° | 1 |
| isosceles trapezoid | 90° | 1 |
| kite (vertical axis) | 90° | 1 |
| right isosceles triangle (right angle bottom-left, legs on the axes) | 45° | 1 — the one round whose only line is a DIAGONAL |
Counts covered: 1 ×4, 2 ×3, 3, 4 ×2, 6, many — **no 0 round** (critic, operator rule "counting never includes 0": the designer's parallelogram and scalene-triangle "0" rounds are removed; "no mirror line at all" is still taught by the Mirror-line? face — parallelogram ✗ round 6, rectangle-diagonal ✗ round 3 — and by free folding). The rectangle (2, not 4) and the right triangle (1, on a diagonal) together break both halves of the "one line, and it is upright" belief. Regular pentagon and the 5-point star are left out on purpose: their lines (18° + k·36°) are not multiples of 15°, so a snapping fold could never test them honestly. Every listed angle is a multiple of 15° (critic-checked: equilateral altitudes 90° ± 60°; flat-top hexagon vertices at 0°/60°/120° and edge-midpoints at 30°/90°/150°).

Order: order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check / lever with nothing painted** → hint, no miss: "Paint the other half first — dip into the ink pot."
- **Complete — miss 1:** after the press, on the STAMP half: every raised square that received no ink stays **dry** (pale, dotted outline) and every wet square that landed on bare paper leaves a **smudge** (a soft ink blot) there. The child's own half is unchanged — to fix it they must find each problem's mirror partner on their side. Hint: "Smudges and dry squares show where the ink landed. Find their partners on your side of the crease."
- **Complete — miss 2:** the partner cell of the first problem (nearest the crease) glows on the child's half; a faint arc joins the two cells over the crease. Hint: "A square's partner is just as far from the crease."
- **Line mode miss** (prediction wrong): the fold result stays on screen (lock or overhang) and the correct tile pulses. Miss 2: the fold replays slowly. Hints: "It doesn't fit — see the bit sticking out?" / "Both sides landed exactly — it is a mirror line."
- **Pick mode miss:** the chosen picture's mini-press replays with its overhang shaded; miss 2 the symmetric one gives a small glint.
- **Count mode — too few:** "Is there another way to fold it so both sides match?" Miss 2: one not-yet-found true line appears dashed. **Too many:** the chips pulse back to the number of kept creases. Hint: "Count the creases that stayed." (Count is only accepted after ≥ 1 crease is kept — every shape here has at least one — so the chip tray stays dimmed until the first fold lands.)
- **A new move** clears smudges, glows and dashed hints until the next press.
- **Success:** complete — every square fuses, the picture locks, glints, and does its little move (butterfly flaps, rocket lifts 6 px, house's door square blinks); bubble "Every square found its partner — both halves match!" · line — "{yes/no}: a mirror line makes both sides land exactly." · count — "The {shape} has {n} mirror lines." (∞: "A circle matches every way you fold it.")

## 8. Settings (each visibly changes the board at rest)
1. **Task:** Complete the picture · Mirror line? · Same on both sides? · How many lines — different board (sheet / single figure + ✓✗ / three mini-presses / shape + fold bar + chips).
2. **Line & grid** (Complete only): Up-down crease 6×6 · Up-down crease 8×8 · Across crease 6×6 · Across crease 8×8 — the crease direction and the sheet size change.

## 9. Words (EN source; 10 locales hand-written; one native + pedagogy reviewer)
- title: "The Fold Press" · instruction: "Paint the other half with wet ink, fold it shut and press. Every square should land on its partner."
- prompts: "Paint the other half so it matches. Then pull the lever." · "Is the dashed line a mirror line? Choose ✓ or ✗, then press." · "Which picture is the same on both sides? Press them to find out." · "Fold the shape every way it matches. How many mirror lines?"
- hints: "Paint the other half first — dip into the ink pot." · "Smudges and dry squares show where the ink landed. Find their partners on your side of the crease." · "A square's partner is just as far from the crease." · "It doesn't fit — see the bit sticking out?" · "Both sides landed exactly — it is a mirror line." · "Is there another way to fold it so both sides match?" · "Count the creases that stayed."
- celebration: "Every square found its partner — both halves match!" · "The {shape} has {n} mirror lines." · "A circle matches every way you fold it."
- settings labels as in §8.
- **Locale traps:** the term for the line differs and must be the school term: de *Spiegelachse/Symmetrieachse*, fr *axe de symétrie*, es *eje de simetría*, it *asse di simmetria*, pt *eixo de simetria*, nl *spiegelas*, sv *symmetrilinje/spegellinje*, da *symmetriakse*, no *symmetrilinje*, fi *symmetria-akseli* — the EN "mirror line" is the en school term. Shape names in the count celebration need gender/number agreement (fr *le cercle / la croix*; de *der Kreis, das Quadrat, das Rechteck, das Dreieck, das Sechseck, das Herz, der Drachen*; fi case) — authored per shape per locale, never a fill-in token. The "kite" shape is *Drachenviereck* (de), *cerf-volant* (fr), *deltoide* (it/es), *pipa* (pt) — native check. The two added shapes are authored too: the plus sign (de *Plus-Zeichen/Kreuz*, fr *croix*, fi *plusmerkki*) and the right isosceles triangle (de *rechtwinkliges Dreieck* — the plain shape name, "isosceles" is not grade-2 language in any locale). The celebration is authored per count, never "{n} mirror lines" with a token: n = 1 takes the singular (en "1 mirror line", de "eine Spiegelachse", fr "un axe de symétrie", fi "yksi symmetria-akseli" + partitive plural for n ≥ 2 "kaksi symmetria-akselia"). ✓/✗ marks are universal; no words in the figures.

## 10. Sound off, access, phones
- Legible with sound off: fused gloss, smudges, dry squares, overhang shading, kept creases.
- Keyboard path in §5; aria: cells "row 3, column 5, wet / empty / raised"; after a press "4 squares match, 1 smudge, 2 dry".
- Taps: cells 64/52 at 704, 50/38 at 360 with nearest-centre 44-px hit circles; chips 56; lever 60 × 140 / 120 × 56; ✓✗ 72. Check above the folds (§4).

## 11. Distinct from
- **Premium tool #35 The Folding Sheet** (free play: the child paints BOTH halves freely, places the crease where they think the mirror is, folds to test; never counts axes, no letters). Here the crease and one half are GIVEN, the half is a raised stamp and the child's work is the reflection; the press reports by ink transfer (fused / smudge / dry) with a miss ladder; plus line-judging, pick and counting faces. The tool's thesis ("the crease is a claim") is not used.
- **New 228 The Fold Mirror** (a picture on the left page; close the book with a candidate on the right to find the true mirror image): choose-a-candidate recognition; here the child PAINTS the reflection square by square.
- **New 224 The Tile Twin**: copying (translation) is its skill — here translation is exactly the error the press exposes.

## 12. Build plan
- **Core state:** `{ size, crease:'v'|'h', stamp:Set<cell>, wet:Set<cell>, task, prediction, foldAngle, kept:Set<angle>, round }`. Functions: `partner(cell)` (reflection across the crease), `press()` → `{fused, smudges, dry}` (smudge = partner(wet) ∉ stamp; dry = stamp cell whose partner ∉ wet), `foldFits(shape, angle)` (exact polygon reflection test), `trueLines(shape)`, `evaluateCount(n)`.
- **Verify gate (own oracle):** for every half: squares in range (6×6 8–13, 8×8 13–17, horizontal sets as listed), touches the crease, the translated copy differs from the reflection in ≥ 4 cells, the reflection is unique; `press` returns fused = all only for the exact reflection (exhaustive over single-cell perturbations); line rounds ✓/✗ 5/5 and each truth recomputed geometrically; pick rounds — exactly one symmetric candidate, the decoys include the translated copy, position balance 3/3/2; count rounds — `trueLines` recomputed by polygon reflection about the area centroid equals the table, every true line is a multiple of 15°, every count ≥ 1 (no 0 round, no 0 chip — asserted both ways: a mutation that restores a 0 round must be killed), pentagon/star absent.
- **Mutations:** a 0-line round or a 0 chip restored · fold pivots on the bounding-box centre (misses the triangle's 30°/150°) · partner = translation · partner measured from the sheet edge · dry squares hidden on miss 1 · smudges shown on the child's half (giving the answer away) · lever works without a prediction in line mode · snap at 22.5° (misses the triangle's lines) · rectangle diagonal accepted · circle count accepts a number · rounds sorted · the lock fires with a smudge left.
- **Pictures:** none from the library (shapes drawn as SVG in one fill, per the shapes-theme ruling; grid pictures are apparatus).
- **Risks:** 8×8 at 320 px gives 35-px cells — just above the 34-px floor (nearest-centre hit areas). The count face is grade-3 content tagged readiness — operator to confirm (§0). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a lever, a fold, a roller, glossy ink that fuses, funny smudges, a butterfly that flaps.
2. **On the board?** Yes — "predict, then press" is a whole-class routine, and the translated-copy smudge pattern is the clearest picture of reflection vs. copying a teacher can show.
3. **Parent trust?** Calm, no words, no score, pure geometry.
4. **The invention:** one half is a raised stamp and you paint the other half in wet ink — fold and press, and the ink lands only on each square's mirror partner, so you can see exactly where you were right.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-measured every half-picture (squares, translated-copy errors, crease contact) for the 6×6/8×8 vertical and 6×6/8×8 horizontal sets — all designer numbers hold; the 8×8 horizontal patterns lived only in a scratch file, so they are now written into §6 for the builder.
- How-many face rebuilt without 0 (operator rule): parallelogram/scalene "0" rounds removed, plus-sign and a right isosceles triangle (its only line is a diagonal) added; chips are 1–6 and ∞; tagged READINESS per the orchestrator ruling.
- Fold pivot fixed to the area centroid — the bounding-box centre would have missed the equilateral triangle's 30°/150° lines (the snap angles alone were not enough).
- Every true-line angle verified as a multiple of 15°; the ✓/✗ 5/5 and pick-mode 3/3/2 balances re-checked.
- Distinct from #228 The Fold Mirror (choose a candidate) and premium #35 The Folding Sheet already argued; the pick face (G2-248) keeps the press as its test, not a book.
