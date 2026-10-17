# Row 108 — Make Equal Parts → THE ONE-PIECE STAMP (1.G.A.3)

## 0. Identity
- id `fractions.partition-equal-shares.1-g-a-3` (KEPT; slugs, titles and intros frozen in all 11 locales) · grade 1 · CCSS 1.G.A.3 (partition circles and rectangles into two and four equal shares; decomposing into more equal shares creates smaller shares) — reaching to 2.G.A.3 (thirds) and 3.NF.A.1 (a/b as a copies of 1/b) for the mapped worksheets · Geometry · own files `one-piece-stamp-core.js`, `one-piece-stamp-activity.js`, `one-piece-stamp-activity.html`, `one-piece-stamp-activities.json` (this row moves out of `fractions-activities.json`; the sibling rows `fractions.partition-thirds.2-g-a-3` and `fractions.make-and-count-squares.2-g-a-2` and `fractions-core.js` stay untouched).
- worksheets it covers: G2-228 Half and Half (L1) · G2-229 Thirds and Quarters (L2) · G2-230 Find the Fraction (L3 name) · G2-231 Fraction Friends (L3 name) · G2-232 Fair Shares? (the stamp test, every level) · G2-234 Cut It Right (L1/L2) · G3-315 Name That Fraction (L3 name) · G3-316 Shade the Fraction (L3 shade).
- old activity: tap to cut eight shapes (circle, square, rect, triangle, ellipse, diamond, hexagon, pentagon) into 2 or 4 equal parts along preset cuts; verified by point-sampling. **Kept**: the eight-shape variety (the operator's ruling that variety means genuinely different shapes, §A.13.60), the round list `{circle 2 v, square 4 grid, rect 2 v, triangle 2 v, ellipse 4 grid, diamond 4 grid, hexagon 2 v, pentagon 2 v}`, the measured-equal partitions (each is an exact equal-area construction), the `nextTask` per-pass reshuffle. **Changed**: the child now places the cuts freely (equal or not) instead of tapping a preset, and equality is checked by the child's own stamp. **Added**: thirds (L2) and shade/name a/b (L3).

## 1. The pitch
"Cut the shape, then peel a glass copy off one piece and stamp it on every other piece — if every piece is a copy of the first, you made equal parts, and the stamp counts them for you."

## 2. Why a child will want it again
- **Cutting.** A big cardboard shape lies on a green cutting mat. The child drags a cut line across it like a ruler-guided knife — the line follows the finger, snaps with a crisp *shk*, and the shape splits along it, the halves drifting a hair apart.
- **The glass stamp.** Press and hold any piece: a shiny glass copy of it peels off the mat with a little "sticker-peel" curl. Carry it over another piece and it turns itself to fit: if it is a copy, it clicks down perfectly and the piece floods with the stamp's colour; if not, the bit that hangs over glows coral and the bit it doesn't cover shows stripes. Children stamp again and again just for the click.
- **Counting copies.** Each successful stamp drops a little numbered token on the piece — 1, 2, 3, 4. "It takes 4 of the same piece to make the whole shape!"
- **The end of the round**: the stamped pieces lift and spin into place like a jigsaw closing up, the whole shape glows, and the fraction label under it fills in — "1/4 · 1/4 · 1/4 · 1/4". The finished shape slides onto a little display shelf of everything the child has cut.
- **Free play**: after success a **Halve again** button (a pair of scissors with a small ×2) cuts every piece in half along the round's own doubling (fourths → eighths, thirds → sixths); the stamp shrinks and the copy counter runs to 8 — "more pieces, smaller pieces". Every doubling is precomputed and proven congruent by the gate, so free play can never show a wrong verdict.

## 3. The skill and the misconception
- Skill (1.G.A.3 and the mapped worksheets): partition a shape into 2, 3 or 4 equal shares; recognise when shares are not equal; name a share as a unit fraction (1/2, 1/3, 1/4); a/b means a copies of the unit piece 1/b; more equal shares means smaller shares.
- Misconceptions made visible:
  1. **"Any cut into 2 pieces makes halves"**: an off-centre cut — the stamp from the smaller piece leaves a striped gap on the bigger piece; from the bigger piece it overhangs the smaller.
  2. **"Equal = the same number of cuts"** (thirds by two parallel cuts on a triangle): stamping shows three different sizes.
  3. **"Pieces must look identical to be equal"** — the stamp turns and flips itself to find the fit, so a diagonal half (a triangle) is shown to be a copy of the other diagonal half, and a 120° circle sector a copy of its neighbour. **The cut menu is built so that equal ALWAYS means copy** (§4 "cut menu", proven by enumeration in §12): free chords between edge points would let a child make equal-area pieces that are NOT copies (a rectangle's two diagonals; a triangle cut from 3/4 of one side to 2/3 of another; a square cut by spokes into thirds; two strips plus a slanted cut through the middle strip — 550 such configurations measured), and the stamp would then wrongly reject a fair cut. Those cuts are simply not on this mat. ("Equal shares need not be the same shape" — 2.G.A.3's second half — is taught by the sibling Row 107, where equality is weighed, not stamped.)
  4. **"3/4 means 3 pieces"** (L3): shade three pieces of an unequal 4-cut and the stamp refuses — 3/4 is three COPIES of the 1/4 piece.
  5. **"Bigger denominator, bigger piece"**: in free play, **Halve again** turns fourths into eighths and the stamp visibly shrinks.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked layout, stage ≈ 648 × 480):
- **The cutting mat** (left, 420 × 420): a drawn green mat (#3E8E6A with a faint 1 cm grid in lighter green — decorative, not counting units) with the round's **shape** in the middle as a cream cardboard cut-out (#FBE7C6, 3 px ink outline), sized to fill a 320 × 320 box (circle d = 320; rect 320 × 200; etc.). Cut lines are 3 px dark ink with a little scissor-dash on the first 100 ms. Every cut runs **edge to edge** (a cut can never stop in the middle of the shape — that rules out the classic "T-cut" whose equal pieces are not copies). **The cut menu per shape (exact; nothing else can be cut)**:
  - **square / rectangle / oval (ellipse)**: two brass **rails** (6 px) along the top and the left edge, each with a **cut handle** (a 40 px round grip with a blade icon); the handle slides along its rail in 1/24 steps and drops a cut straight across, parallel to the other pair of sides. The **square only** also has two **corner pins** (24 px brass pins at two adjacent corners) that drop a diagonal. The rectangle has no diagonals (its two diagonals make four equal triangles that are not copies).
  - **diamond (rhombus)**: rails along its two diagonals (cuts parallel to a diagonal, 1/24 steps — the diagonals themselves at the 12/24 step) and two **mid-pins** on adjacent sides that drop the two lines through the centre parallel to the sides.
  - **circle** (L1 #1, #10; L2 #8): 24 **rim pegs** every 15°; a cut is dragged from one peg to another (a chord; a diameter joins opposite pegs).
  - **hexagon (L1 #7), triangle (L1 #4), pentagon (L1 #8)** — halves rounds, ONE cut: hexagon from any edge point (1/24 steps, vertices, midpoints) to any other; triangle and pentagon from a **corner** (the corner pins glow) to any edge point.
  - **spoke rounds — circle thirds (L2 #1), triangle thirds (L2 #4), hexagon thirds (L2 #5)**: a **centre pin** (a 24 px brass pin at the centroid); spokes are dragged from the pin to a rim peg (circle, every 15°) or an edge point (polygons, 1/24 steps + vertices + midpoints). No rails in these rounds.
  - **at most n − 1 straight cuts** in a straight-cut round (a further cut handle greys out); up to 6 spokes in a spoke round.
- **The stamp dock** (right column, 200 × 420): a small drawn ink pad where a lifted stamp rests between uses; under it the **copy counter** — a row of numbered tokens (numerals, content) that fill as pieces are stamped; under that the **fraction label** (a cream card 180 × 90 showing the fraction being made, stacked notation, 32 px) — blank until success (L1/L2) or the child's working (L3).
- **The display shelf** (top band, 660 × 40): miniature finished shapes from earlier rounds (36 px).
- L3 shade rounds: a target fraction card at the top of the dock ("3/4"); L3 name rounds: the shape arrives cut and partly shaded; the dock shows two **number wheels** (numerator, denominator — 64 × 80 each with ▲▼ buttons 48 px) to build the fraction.
- Task line above (≤ 24 px). Check button and bubble under the dock (desktop) / under the mat (phone).

At 360 (stacked, stage ≈ 336 × 640): display shelf 336 × 32, mat 336 × 336 (shape box 270 × 270; cut handles 44 px, centre pin 28 px with a 48 px hit area), dock as a horizontal strip 336 × 120 under the mat (ink pad 64 px, copy tokens 28 px, fraction label 120 × 64, number wheels 56 × 72 with 44 px buttons). Check at y ≈ 600 at 360 × 740; at 320 × 640 the mat is 320 × 300 (shape box 250), Check y ≈ 575.

**No library pictures** — the shapes, mat, rails, pin, stamp, tokens and label are drawn geometry; the shapes ARE the mathematics. Words: none on the apparatus; numerals on tokens and the fraction label are content.

## 5. The hand
1. **Straight cut**: drag a cut handle along its rail (the cut line previews across the shape within 16 ms, snapping in 1/24 steps), or drag from a pin/peg/corner to an allowed end point (§4 cut menu — only the allowed end points light while dragging); release → the line commits with a *shk* and the shape splits (pieces drift 4 px apart, 150 ms). A cut always runs edge to edge and may cross earlier cuts (each crossing splits pieces).
2. **Spoke cut** (spoke rounds only): drag from the centre pin to the rim (pegs every 15° on the circle; vertices, edge midpoints and 1/24 edge steps on the triangle and hexagon) → a radius line; two spokes make a wedge. A spoke alone does not split anything until a second spoke closes a wedge (until then it is drawn dashed).
3. **Undo a cut**: tap a cut line → it lifts away (200 ms) and the pieces re-join. Long-press the mat → clear all cuts.
4. **Lift a stamp**: press and hold any piece 300 ms → a glass copy peels off (a curl animation 250 ms, shiny 60 % white fill with the piece's outline) and follows the finger; the original piece shows a dashed outline (the stamp's source). **Stamp**: release over another piece → the stamp rotates and/or flips to the best fit (animated 250 ms, so the child sees it turn) and lands:
   - **exact copy** (the pieces are congruent) → a crisp *click*, the piece fills with the stamp colour (teal), a numbered token drops onto it (the next number; the source piece gets token 1 the first time);
   - **not a copy** → the stamp lies on the piece at its best fit: the part hanging over the piece glows coral, the part of the piece it does not cover is striped; after 1.2 s the stamp floats back to the ink pad (no colour, no token).
   Release over the ink pad → the stamp rests there; tap it to pick it up again.
5. **L3 shade**: shading is stamping — each stamped piece is coloured; tap a coloured piece to un-colour it (undo).
6. **L3 name**: the number wheels' ▲▼ change numerator/denominator (1–8), each tap 120 ms flip.
7. **Check** → §7. With the setting "the stamp tests at Check" the stamp walks automatically: it lifts off the first piece and visits every other piece in reading order, 400 ms per stamp.
- **Free play** (after success): **Halve again** (48 px button) doubles the pieces along the round's precomputed doubling (square cross → cross + both diagonals = 8 triangles; circle fourths → 8 sectors; rectangle strips → 8 strips; thirds → sixths), and the stamp can be lifted and clicked onto every eighth; a second press restores the round's pieces.

## 6. The rounds
One round = one shape and a number of equal parts to make (L1/L2), or a fraction to shade / name (L3). Right (L1/L2) when the cuts make exactly n pieces that are all copies (congruent) of each other — equivalently, equal in area within 0.5 %. Many cut sets are right (for a square in fourths: a cross, three parallel cuts, both diagonals); the instrument accepts any.

**Level 1 — Halves and fourths** (the old eight rounds, plus two)
| # | shape | n | one right cut set (others accepted) | a tempting wrong cut |
|---|---|---|---|---|
| 1 | circle | 2 | one diameter (any angle) | a chord off the centre |
| 2 | square | 4 | a centred cross | a cross off the centre |
| 3 | rectangle (320 × 200) | 2 | the vertical (or horizontal) midline | a vertical cut at the 10/24 step (≈ 42 %) |
| 4 | triangle (equilateral) | 2 | the altitude from any vertex | a cut from a vertex to a non-midpoint |
| 5 | ellipse | 4 | both axes | the major axis + a cut off the minor axis |
| 6 | diamond (rhombus) | 4 | both diagonals | one diagonal + a parallel cut |
| 7 | hexagon (regular) | 2 | a line through two opposite vertices or two opposite edge midpoints | a line through a vertex and a non-opposite point |
| 8 | pentagon (regular) | 2 | the symmetry line from a vertex to the opposite edge midpoint | a line between two vertices |
| 9 | rectangle | 4 | a centred cross, or three parallel cuts at 25/50/75 % | cuts at the 5/24, 12/24 and 19/24 steps (≈ 21/50/79 %) |
| 10 | circle | 4 | two perpendicular diameters | two diameters at 60° |

**Level 2 — Thirds (and a mix)**
| # | shape | n | one right cut set | a tempting wrong cut |
|---|---|---|---|---|
| 1 | circle | 3 | three spokes at 120° | three spokes at 90/135/135° |
| 2 | rectangle | 3 | two vertical cuts at ⅓, ⅔ | cuts at the 6/24 and 14/24 steps (25 % / 58 %) |
| 3 | square | 3 | two parallel cuts at ⅓, ⅔ | cuts at ⅓ and ½ (three strips, the middle one thin) |
| 4 | triangle (equilateral) | 3 (spokes) | three spokes from the centre to the corners (or to the three edge midpoints — three kites; any three spokes a third of the way round from each other are right) | spokes to two corners and the middle of the third side (pieces 33 % / 50 % / 17 %) — the "thirds of the height" trap lives in Row 107 L2 #4 |
| 5 | hexagon (regular) | 3 (spokes) | three spokes from the centre to alternate corners (three rhombi) | spokes to corners 1, 2 and 4 (pieces ⅙, ⅓, ½) |
| 6 | square | 4 | both diagonals (a cross or three strips are equally right) | one diagonal + the vertical midline (4 pieces in two sizes) |
| 7 | rectangle | 3 | two horizontal cuts at ⅓, ⅔ | two cuts at the 7/24 and 17/24 steps (≈ 29 % / 71 %) |
| 8 | circle | 2 → 4 | first halves, then the round asks "now make fourths from your halves" (the halves' cut stays; add one perpendicular diameter) | adding a chord |

Round 8 is two steps in one round: Check after halves lights the halves (token 1, 2) and the task line changes to the fourths step; the success line names both ("2 halves… 4 fourths: more parts, smaller parts").

**Level 3 — Shade and name** (shapes arrive with cuts drawn; the stamp works as always)
| # | kind | shape and cuts | target | right |
|---|---|---|---|---|
| 1 | shade | square, centred cross (4 equal) | 3/4 | stamp 3 pieces |
| 2 | shade | circle, three 120° spokes | 2/3 | stamp 2 pieces |
| 3 | shade | rectangle, three parallel cuts (4 equal strips) | 1/4 | stamp 1 piece |
| 4 | shade | hexagon, three rhombi | 1/3 | stamp 1 piece |
| 5 | name | rectangle cut in 2 equal halves, 1 shaded | — | 1/2 |
| 6 | name | circle cut in 4 equal, 3 shaded | — | 3/4 |
| 7 | name | triangle, three equal spoke pieces, 2 shaded | — | 2/3 |
| 8 | name | square, both diagonals, 2 shaded (two triangles, opposite) | — | 2/4 (the instrument also accepts 1/2, and the success line says "2/4 — that's the same as 1/2") |
| 9 | shade (trap) | square cut by a diagonal + the vertical midline (4 pieces, NOT equal) | "3/4" | the round asks first: "Are these fourths?" — the child stamps and finds they are not; the right move is the **"Not equal!"** button (a 48 px button with a crossed-out equals sign), which then reveals the fair cut (a cross) to shade 3/4 on |

Shading targets never use a numerator of 0 and never equal the whole except as noted (no "4/4" rounds — a whole is not a share).

- **Answer position**: cuts are free, so there is no position to guess in L1/L2. L3 shade: the pieces the child stamps are free (any 3 of 4). L3 name: shaded pieces are dealt to varied positions; the number wheels start at 1/1 every round (never near the answer). **Gate**: an "always cut through the centre" bot (one central straight cut) succeeds only in the halves rounds of shapes with central symmetry, never in thirds; a "cut every 1/n of the bounding box" bot fails the triangle, pentagon and hexagon rounds (the bounding box lies about area there).
- **Order**: order-only reshuffle per pass; L1 #1 always opens; L2 #8 always last.

## 7. Check, the misses, the success
- **Check with no cut** → no miss; the cut handles pulse; bubble: "Drag a cut across the shape first."
- **Miss 1** → the stamp test runs automatically (whatever the setting): the stamp lifts off the BIGGEST piece and visits every other piece; each not-a-copy piece shows its coral overhang and striped gap and keeps them visible until the next move; the copy counter shows how many pieces are copies of the biggest. Wrong piece count: the count tokens show "{k}" against the asked "{n}" on the fraction label (two numerals side by side, the asked one in teal). Bubble by cause:
  - unequal: "The stamp doesn't fit every piece — they are not all the same size."
  - wrong count: "You made {k} pieces. Make {n} equal pieces."
  - L3 shade, wrong number shaded: "Count your colored pieces: {k}. The card says {a}."
  - L3 name, wrong fraction: "How many equal pieces in all? How many are colored?"
  - L3 trap, shading on unequal pieces: "Stamp them first — are they equal?"
- **Miss 2** → the stronger showing: **ghost cuts** appear — the snap points of one right cut set light up as gold dots on the edges (for straight cuts) or as gold ticks on the rim (spokes), and for an off-centre cut a ghost of the centred cut is drawn dashed beside the child's cut. L3 name: the shaded pieces get numbered tokens (1, 2, 3) and the unshaded ones too, in another colour, so "a out of b" can be read off. Bubble: "Try the gold dots — they cut the shape fairly."
- A new move clears the ghosts and the overhang marks (help taken away until the next Check).
- **Success** → every piece stamped (tokens 1…n), the pieces lift and click together (300 ms), the whole shape glows, the fraction label fills: L1/L2 "1/n" written on each piece and "{n} equal parts — each part is one {unitWord}" on the label; L3 shade: the coloured pieces pulse together and the label reads "a/n"; L3 name: the wheels lock with a click. The shape slides to the display shelf (400 ms). Bubble: L1/L2 "{n} equal parts! Each one is one {unitWord} — {n} {unitPlural} make the whole {shape}." · L2 #8 "2 halves, then 4 fourths — more parts, smaller parts!" · L3 shade "{a}/{n}: {a} copies of the 1/{n} piece." · L3 name "Yes: {a} of {n} equal parts is {a}/{n}."

## 8. Settings (each visibly changes the board at rest)
1. **Ruler marks**: off (default) · on — the cut rails and the rim show small tick marks at the 1/2, 1/3 and 1/4 points (no numbers; visible at rest), a scaffold for children who need it.
2. **The stamp**: I test (default; the stamp is lifted by hand, the ink pad shows "ready") · it tests at Check (the ink pad shows a small play icon at rest, and the stamp walks by itself when Check is pressed).
Level picker (shell): Halves and fourths · Thirds · Shade and name.

## 9. Words (EN source)
- title (frozen): Make Equal Parts — Partition into Halves & Fourths (Grade 1)
- instruction: "Cut the shape into equal parts. Stamp a copy of one piece on the others to check!"
- task lines: L1/L2 "Cut the {shape} into {n} equal parts." · L2 #8 step 2 "Now make fourths from your halves." · L3 shade "Color {a}/{n} of the {shape}: stamp {a} equal pieces." · L3 name "What fraction is colored?" · L3 trap "Are these fourths? Stamp to find out."
- "Not equal!" button label (L3 trap): "Not equal!"
- unit words: half / halves, third / thirds, fourth / fourths; shapes: circle, square, rectangle, triangle, oval (ellipse), diamond, hexagon, pentagon.
- hints and celebrations: §7.
- settings labels: "Ruler marks" — "off" / "on"; "The stamp" — "I test" / "it tests at Check"; levels as above.

**Locale traps**:
- **Unit words and their plurals** (see Row 107 for the full list): de *Halbe / Hälften*, *Drittel*, *Viertel*; fr *moitiés*, *tiers*, *quarts*; es *mitades*, *tercios*, *cuartos*; fi *puolikkaat*, *kolmasosat*, *neljäsosat* — "each part is one fourth" must use the noun form per locale (de *jedes Teil ist ein Viertel*, fr *chaque part est un quart*, fi *jokainen osa on neljäsosa*).
- **"Oval" vs "ellipse"**: the grade-1 word (de *Oval*, fr *ovale*, fi *soikio*); "diamond" is the child word for a rhombus in en/de (*Raute*) — use the same word as Row 106 in each locale.
- **Spelling**: the platform's EN is US English (the G3-316 worksheet says "Color"), so the source strings use "color".
- **Fraction "a/n" read aloud** in the bubble: written as stacked numerals, read per locale (de *drei Viertel*, fr *trois quarts*, fi *kolme neljäsosaa* — partitive after a number).
- **2/4 = 1/2**: the equivalence line must be idiomatic (de *2/4 — das ist dasselbe wie 1/2*).
- No language on the apparatus; TTS optional.

## 10. Sound off, access, phones
- Sound off: the split, the stamp's click or coral overhang, the tokens and the glow carry everything.
- Keyboard: Tab to a cut handle, arrow keys move its far end between snap points, Enter commits; Tab to a piece, S lifts a stamp, arrow keys choose the target piece, Enter stamps; Delete on a focused cut removes it; L3 wheels by ▲▼ keys.
- aria: the shape `aria-label="a {shape} in {k} pieces"`; each stamp result announced ("piece 3 is a copy" / "piece 3 is bigger" / "smaller"); the fraction label read in words.
- Taps: cut handles 40 px (44 on phones), centre pin hit area 48 px, wheels' buttons 48 px (44), pieces ≥ 60 px for lifting a stamp (the smallest piece in any round — a sixth of a hexagon in free play — gets a 48 px hit area).
- Check above the fold: y ≈ 600 at 360 × 740, y ≈ 575 at 320 × 640.

## 11. Distinct from
- **Row 107 THE FAIR MOBILE** (sibling): choose among cut cards; equality by weight on a mobile whose hook count is the denominator. Here: make the cuts; equality by stamping a congruent copy; a/b as a copies.
- **fraction-kitchen tool** (drag a knife along faint guide lines through a pizza/bar/cake, unequal pieces seesaw and heal, share slices onto friends' plates, prove two fourths fill a half): its knife follows offered guide lines on food and its judgement is a seesaw wobble. Here there are no guide lines and no food — the child places cuts on bare geometric shapes from a rail/pin menu, and the judgement is the child's own stamp test (lift a copy, click it onto each piece, count the copies into a/b). No seesaw, no plates, no tray-filling.
- **folding-sheet tool** (fold to test symmetry): folding about a crease; here no folding — the copy test works for rotations too (thirds of a circle are not mirror images across one fold).
- **New 229 Blink Viewer** (overlay two pictures for differences) and **New 224 Tile Twin** (tracing paper over a grid): picture comparison. The stamp here is one piece of the SAME shape tested against the others, and it counts copies into a fraction.
- No built invention reused.

## 12. Build plan
- **Core** `OnePieceStampCore`: shapes as exact polygons (circle/ellipse as 360-gon for clipping; exact areas by formula for verification); `cut(shape, cuts)` → pieces (polygon splitting by lines and spokes; exact rational snap coordinates); `area(piece)`; `congruent(a, b)` → the best rigid transform (rotation, optionally with a reflection), found by matching the sorted edge-length/angle sequence (exact polygons) with a 0.5 % tolerance; `stampResult(a, b)` → `{copy:boolean, overhang:poly, gap:poly, transform}`; `isRight(round, pieces)` = count = n ∧ all pairwise congruent; L3 `shaded` set, `checkShade`, `checkName`; `ghostCuts(round)`.
- **The guarantee** (gate; measured at design time by the critic — `scratchpad/des/work-c15/stamp-enum.js`): for every round, enumerate all reachable cut sets under §4's cut menu (≤ n − 1 straight cuts; spoke sets) and assert: equal area (±0.5 %) ⇒ pairwise congruent (exact transform found). Design-time result: the menu as first drafted (free chords/spokes between any 1/24 snap points) had **550 equal-area non-congruent configurations** (rectangle 457 — its diagonals and slanted chords; triangle halves 6; square spoke thirds 32; pentagon spoke halves 55; plus 42 for square rails + arbitrary centre lines); the shipped menu has **0** (square rails + 2 diagonals 12 equal configs, rectangle rails 9, circle chords 22, oval rails 3, diamond 6, hexagon 72, triangle 3, pentagon 5, circle spokes 26, triangle spokes 24, hexagon spokes 48 — all congruent). The gate re-runs this with its own exact geometry and FAILS the build on any non-zero count; a new shape or pin cannot ship without it. Also assert at least one right cut set exists per round, the tempting cut is reachable and wrong, and every Halve-again doubling is congruent.
- **Gate's own ground truth** (`verify-one-piece-stamp-core.js`): independent exact areas (shoelace on rational coordinates; circle sectors/segments by formula); for every round the listed right cut set is right and the listed tempting cut is wrong; the bots (§6); L3 shade accepts any a pieces of an equal partition and rejects shading on an unequal one; L3 name accepts exactly a/n (and 1/2 for #8); the trap round's "Not equal!" is the only right first move.
- **Mutations**: the rectangle gets corner pins (diagonals) — the guarantee must fail · straight cuts allowed to stop mid-shape (T-cut) — must fail · spokes enabled in a square round — must fail · congruence test ignores reflection (rejects a fair diagonal half) · congruence by area only (accepts a non-congruent equal-area pair — would hide a counterexample) · tolerance raised to 5 % (accepts a 48/52 cut) · piece count unchecked · spoke without a closing spoke splits the shape · L3 accepts shading on unequal pieces · L3 name accepts the number of cuts as the denominator · L2 #8 forgets the halves step · ghost cuts show a wrong cut · help persists after a new move · Check with no cut counts a miss.
- **No pictures.** Risks: (1) precise snapping on phones — the snap grid is coarse (1/24 edge), the far end snaps, the keyboard path exists; (2) polygon clipping robustness — rational coordinates and exact predicates, verified by the area-sum invariant (pieces always sum to the whole, gate); (3) L3 #8's equivalence may be ahead of grade 1 — it is in L3, labelled as the G3 worksheets' level.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — cutting cardboard, peeling off a shiny stamp, and the click when it fits are irresistible; the tokens count up and the shape glows.
2. **Would a teacher put it on the board?** Yes — the child makes the parts (no preset cuts), and the check is the definition itself: equal parts are copies of one piece; "3/4 is three copies of 1/4" is enacted by stamping; the thirds-of-the-height and off-centre traps are shown with the exact overhang and gap.
3. **Would a parent trust it?** Calm, honest geometry, no score.
4. **The invention in one sentence:** cut the shape, then peel a glass copy off one piece and stamp it on the others — if every piece is a copy, the parts are equal, and the stamp counts the copies into the fraction.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 2→5 · distinctness 4→5 · reality 5→5
What changed:
- **The stamp claim was false and is now true by construction.** I enumerated every reachable cut set (scratchpad `des/work-c15/stamp-enum.js`, results in `RESULTS-108.md`): with free chords/spokes between 1/24 snap points there were 550 configurations whose pieces are equal in area but NOT copies (a rectangle's two diagonals, a triangle cut from 3/4 to 2/3, a square cut by spokes into thirds, a pentagon split by two spokes, two strips + a slanted cut through the middle). The stamp would have rejected a fair cut. §4 now has an exact per-shape **cut menu** (rails parallel to the sides; square-only diagonals; circle rim pegs; corner-only cuts on triangle/pentagon; spokes only for circle/triangle/hexagon thirds; edge-to-edge only; ≤ n − 1 cuts) and the same enumeration gives **0**. The gate re-runs it; three mutations re-introduce the forbidden cuts.
- L2 #3/#4/#5 tempting cuts that were unreachable under the menu were replaced by reachable wrong cuts (⅓ + ½ strips; spokes to two corners and a midpoint; spokes 1-2-4); the "thirds of the height" trap is explicitly left to Row 107.
- Free play no longer lets the child add arbitrary cuts (which could have produced an unfair verdict); **Halve again** gives proven-congruent eighths/sixths.
- Distinct from fraction-kitchen spelled out: no guide lines, no food, no seesaw, no plates — the test is the child's stamp.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
