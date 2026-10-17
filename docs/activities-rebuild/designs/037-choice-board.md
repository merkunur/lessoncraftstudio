# Row 37 — Identify the Shape: the paint that only stays in its own shape (K.G.A.2)

## 0. Identity
- id `choice-board.shape-id.k-g-a-2` (KEPT; slugs and metadata frozen in all 11 locales) · grade K · CCSS K.G.A.2 · strand Geometry · own files at rebuild (the row leaves the shared choice board): `paint-pots-core.js`, `paint-pots-activity.js`, `paint-pots-activity.html`, `paint-pots-activities.json` (the row's entry moves there; `choice-board-activities.json` keeps its other rows).
- page title (frozen): "Identify the Shape — Kindergarten Geometry"; intro (frozen): "Tap the shape named in each prompt…" — kept: the child taps the shapes the paint tin names.
- worksheets it covers: **K-368** 2D Shapes · **K-241** Color by Code and **K-265** Color by Shape Code (shape pictures: each tin is a colour key) · **K-359** Tangram Puzzles: Count the Triangles and Squares (count pictures) · **G1-381** 2D Shapes: Real or Not? (real-or-not quilts) · **G1-382** 2D Shapes: Write the Names (tins show the NAME only) · **G1-383** 2D Shape Riddles (tins show the CLUE only).
- old activity: a 4-card choice board "Tap the {shape}" over 10 shapes (circle, square, triangle, rectangle, hexagon, oval, star, diamond, heart, pentagon). **Kept:** all ten shape names and the per-locale `SHAPE_LABELS` (corrected for the new frames, §9). **Dropped:** the four-card board.

## 1. The pitch
"Dip the brush in a tin and tap a piece: the brush runs round its edge leaving a bead on every corner — and when the paint sets on Check, it only stays if the piece really is the tin's shape, however it is turned or however small; a shape with a gap can't hold paint at all."

## 2. Why a child will want it again
- **A picture appears under your brush.** Every round is a picture built of shapes — a rocket, a train, a fish, a beehive, a robot — in plain cream. Two paint tins wait beside it. Tap a tin (it tips its lid open), then tap pieces: a little brush-tip dot races round the piece's edge (400 ms), *tick-tick-tick* a bead drops at each corner, and the colour floods in from the middle with a soft "shloop". The picture fills with colour exactly like a colour-by-code page — but alive.
- **The paint sets on Check — and refuses then.** While the child paints, every coat stays wet and glossy (the child decides; the paint does not judge yet). Check is the drying moment: the pieces set one after another with a little gloss-flash — and a piece that is not the tin's shape beads up, its paint rolling off the bottom into a puddle under the picture, its corner beads standing for a second beside the tin's own (4 against 3). Watching the dry run is the show of every round.
- **The leaky fake.** In real-or-not quilts some "triangles" have a gap: when the paint sets, it pours out through the gap in a little waterfall. Nobody needs to be told why that one is not a triangle.
- **Why the paint waits:** if the paint refused at the tap, a child could tap every piece and let the tin sort them — the tin would do the geometry. Holding the verdict to Check keeps the naming in the child's head, while the brush's beads and ticks on every tap give them the attributes to decide with.
- **Earned show per round:** when the picture is complete it comes alive for two seconds — the rocket lifts and its flame flickers, the train's wheels spin, the fish wiggles, the bee's wings flutter, the robot's head tilts, the boat bobs. No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (K.G.A.2 + the six worksheets):** name 2D shapes (circle, square, triangle, rectangle, hexagon, oval, star, diamond, heart, pentagon) whatever their orientation or size; follow a shape-coded colour key; count the triangles and squares in a figure; tell real shapes from not-real ones by their defining attributes (closed, straight sides, number of corners, equal sides); read shape names; solve shape riddles.
- **Misconceptions and the push-back:**
  - *A turned shape is a different shape* ("a square on its point is a diamond", "an upside-down triangle isn't a triangle"): every target appears in at least two orientations; a square turned 45° takes square paint and the trace drops four beads and four equal-side ticks — exactly as the upright square on the tin.
  - *A tiny or a stretched one doesn't count:* every target appears in at least two sizes; a long thin triangle takes triangle paint. Missing a small or turned one is the most common miss, and the miss ladder points at its region first (§7).
  - *Rectangle vs square:* the trace leaves the standard side marks — four equal ticks on a square, two pairs on a rectangle — so the difference is drawn on the piece. (A square IS a rectangle, so rounds that have a rectangle tin never contain a square piece; only the square tin turns rectangles away — the honest, one-directional rule the K-368 riddle bank already follows.)
  - *Open or curved figures count as shapes:* an open figure leaks (paint runs out through the gap); a curved side makes the brush wobble and draws a wavy tick; a rounded corner drops no bead.
  - *Counting by recognising "lots of triangles":* in count pictures the painted pieces are what the child counts, so nothing is counted twice and nothing is skipped silently.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 — stacked layout:**
- **Task line** (20 px).
- **The picture** (left, 440 × 400 px, cream board with a 3 px teal frame): 7–11 shape pieces, each cream (#FBF3E4) with a 3 px ink outline, no overlaps, smallest short side 64 px. Pictures are made ONLY of geometric pieces (as on K-241 / K-265) — apparatus geometry, no drawn objects.
- **Paint tins** (right column, 160 px wide): two tins stacked (count pictures: two; real-or-not: one), each a drawn tin 120 × 120 px (a cylinder outline with a lid, the paint colour visible at the rim) with a **label** on its front: in *shape* mode the canonical upright outline (56 px) with the name under it (16 px); in *name* mode the word alone (22 px); in *clue* mode the clue alone — corner beads (8 px dots) and side ticks, or for curved shapes a ring with a centre pin and string. The selected tin rises 8 px with its lid open.
- **The puddle** (a 440 × 24 px strip under the picture) collects rejected paint.
- **Count pictures:** under the tins, two number rows (one per tin, the tin's colour as a stripe) of numeral chips 1–9, 34 × 40 px.
- **Bubble** under the picture, Check at the right (shell).

**At 360 — stacked:** tins in a row on top (two tins 104 × 96, labels 44 px outlines / 18 px words), the picture under (328 × 300, scale 0.68 → smallest piece 44 px), the puddle strip, then the number rows (chips 32 × 44). 320: picture 296 × 270.

**Pictures:** none from the library — this is pure geometry (pieces, tins, brush tip, beads, ticks), all drawn apparatus. The shape-library pictures (`shapes/*`) are not used: the library `diamond` is a square turned 45°, which would teach the very misconception this activity removes.

## 5. The hand
- **Tap a tin** → it rises, lid flips open (150 ms, a "tink"); tapping the other tin swaps. The name is spoken (TTS) — in clue mode the riddle is spoken.
- **Tap a piece** (with a tin selected) → the brush tip appears at the piece's top-left corner within 50 ms and runs round its edge (total 400 ms; it pauses 60 ms at each corner and drops an 8 px bead; on straight sides of equal length it leaves matching ticks at the end of the run; on a circle it trails a string from a centre pin that stays the same length; on an oval the string visibly stretches and shrinks).
  - Whatever the piece is, colour floods from its centre (250 ms, "shloop") and stays WET (a glossy highlight stripe); the beads fade after 600 ms. Nothing is judged at the tap.
  - **On Check** each wet piece sets in turn (120 ms each, a soft gloss-flash): the tin's shape → the gloss settles into flat colour; **not** the tin's shape → the colour beads into droplets that roll off its lowest edge into the puddle (450 ms, "plip-plip"), its beads standing 1 s beside the tin label's beads; **open** → the colour pours out of the gap as a little stream to the puddle (the stream starts at the gap's midpoint).
- **Tap a painted piece** → the paint lifts back into the tin (undo).
- **Tap a piece with no tin selected** → the brush traces it anyway (beads and ticks, no paint) — free exploration of corners and sides.
- **Count pictures:** after painting, tap a numeral chip in each row (it lights; another swaps).
- **Keyboard:** Tab to tins (Enter selects), arrow keys move a focus ring piece to piece, Enter paints; Tab to chips.

## 6. The rounds
Every target kind appears in ≥ 2 orientations and ≥ 2 sizes in its picture; at least two non-target pieces per picture; targets spread so every quadrant of the picture holds at least one target piece where the picture allows. Positions are authored in the core per picture (no overlaps, gate-measured).

**Shape pictures (9) — tins and pieces (S/M/L size, angle):**
| # | picture | tin A (count) | tin B (count) | the other pieces (no tin) |
|---|---|---|---|---|
| 1 | house | triangle 2: roof L 0°, flag S 160° | square 4: chimney S 0°, windows S 0° / S 15°, path stone S 45° | door rectangle M 1:2, sun circle M |
| 2 | rocket | triangle 4: nose M 0°, fins S 80° / S 280°, flame S 180° | circle 2: windows M, S | body rectangle L 1:2.4, star S |
| 3 | fish | oval 3: body L 0°, bubbles S 30° / S 120° | triangle 3: tail M 90°, fins S 20° / S 200° | eye circle S |
| 4 | sailboat | triangle 3: sails L 0° / M 0° (right-angled), flag S 270° | rectangle 2: mast thin 1:6, cabin 2:1 S | hull trapezoid L, sun hexagon M |
| 5 | beehive | hexagon 5: cells M 0° / M 30° / S 0° / S 15° / L 30° | oval 3: bee body M 20°, wings S −30° / S 30° | pentagon M, sun circle M |
| 6 | train | square 3: cab M 0°, windows S 0° / S 45° | circle 4: wheels M, M, S, S | body rectangle L 2.2:1, chimney rectangle 1:2, smoke ovals S ×2 |
| 7 | robot | square 3: head M 0°, buttons S 45° / S 0° | heart 2: chest M 0°, badge S 200° | body rectangle L 1.4:1, arms rectangles 1:3 at 30° / 330°, eyes circles S ×2 |
| 8 | lighthouse at night | star 4: S 0° / S 20° / M 36° / S 180° | diamond 3 (non-square rhombi, 60°/120° corners): M 0° / S 90° / S 30° | tower trapezoid L, kite flag S, full moon circle M |
| 9 | garden | pentagon 3: flower heads M 0° / M 36° / S 18° | circle 4: flower centres S ×3, ladybird M | stems rectangles thin ×3, leaves ovals S ×2, hexagon stepping stone M |
All ten old shape names are used; squares never appear in a picture with a rectangle tin (rule above); the "diamond" tin only ever holds non-square rhombi and no square appears in that picture.

**Real or not quilts (8)** — one tin, a quilt of 8 patches (one piece per patch, 2 × 4; at 360 4 × 2), "real" ones 2–4:
| # | tin | real (paint stays) | not real |
|---|---|---|---|
| 1 | triangle | equilateral 0° · skinny 50° · right-angled 200° · tiny 0° | open (gap) · one curved side · rounded corners · kite (4 corners) |
| 2 | rectangle | 1:3 at 30° · 2:1 at 0° · 1.5:1 at 70° | parallelogram (no square corners) · trapezoid · open · rounded corners · curved side |
| 3 | square | 0° · 45° · small 20° | rhombus 60° · rectangle 1.3:1 · open · curved side · kite |
| 4 | circle | large · small | oval · open ring (C-shape) · rounded square · hexagon · egg shape · semicircle |
| 5 | hexagon | regular 0° · regular 30° · irregular convex (6 unequal sides) | pentagon · heptagon · open hexagon · star · octagon |
| 6 | triangle | upside-down 180° · obtuse 15° · large 70° · small 300° | open (two gaps) · curved base · rounded top · 4-sided (one corner cut off) |
| 7 | rectangle | long 1:4 at 90° · 3:2 at 15° · 1.8:1 at 55° | slanted parallelogram · open · rounded · curved side · trapezoid |
| 8 | square | large 30° · small 0° · medium 60° · tiny 45° | rhombus 70° · rectangle 1.2:1 · open · rounded corners |
(Irregular hexagons are honest hexagons; squares are never offered in a rectangle quilt.)

**Count pictures (7)** — two tins, triangle and square, then "How many?" for each (figures of triangles and squares, turned, plus one other piece):
| # | figure | triangles | squares | other |
|---|---|---|---|---|
| 1 | cat | 4 | 2 | parallelogram tail |
| 2 | tree | 6 | 1 | rectangle trunk |
| 3 | castle | 3 | 3 | rectangle door |
| 4 | bird | 5 | 2 | parallelogram wing |
| 5 | fir forest | 7 | 1 | rectangle ground strip |
| 6 | windmill | 2 | 4 | rectangle tower |
| 7 | boat | 6 | 3 | trapezoid hull |
Every triangle count 2–7 and square count 1–4 appears; no two rounds share both counts; never 0.

**Answer position:** the pieces' places in a picture are fixed by the picture, so the gate measures two things instead: targets are spread across the four quadrants (no picture has all targets in one half) and tins are listed in a shuffled order per round (tin A on top in 50 % ±1 of rounds). Count chips are a fixed 1–9 row; each count value is the answer at most twice per kind per pass.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing painted** → hint "Pick a tin, then tap every {shape} in the picture." (no miss). Count rounds with chips unset → "How many did you paint? Tap the numbers." (no miss).
- **Miss** (pictures/quilts) = at Check, a painted piece that is not its tin's shape (its paint runs off — that IS the showing) and/or a target still unpainted.
  - **Miss 1:** the run-off is the first showing (the wrong piece's beads beside the tin's beads, the puddle); the piece returns to cream. If a target is still unpainted, the tin whose shape is missing tips and drips one drop onto the *quadrant* holding it; that quadrant brightens for 1.5 s. Hint (wrong piece): "Count its corners. Does the tin have that many?" · (missing piece): "There is one more {shape} — look for a turned one or a small one." (In clue/name modes "{shape}" is replaced by "piece for this tin".)
  - **Miss 2:** every unpainted target outlines in the tin's colour and its beads appear; a piece the child painted wrong twice shows its beads and ticks permanently until the next paint. Hint: "Paint the glowing pieces."
- **Miss** (count) = a wrong number. Miss 1: that colour's painted pieces pulse one after another (300 ms each, no numbers). Hint: "Count the {colour} pieces one by one." Miss 2: each painted piece of that kind shows a small numeral as it pulses. Hint: "Count with the numbers."
- **A new paint / chip** clears the showing. Correctly set pieces stay set after a miss, so the child only re-thinks what was wrong.
- **Success:** the picture comes alive (two seconds, per picture: rocket lift + flame, train wheels, fish wiggle, bee wings, robot head tilt, boat bob, house chimney puffs of drawn circles, garden sway, lighthouse beam sweep). Quilts: the real patches' paint shines and each fake does a small shrug (tilts ±5°). Bubble: "Yes — {n} {shapePlural} and {m} {shapePlural2}!" (pictures) · "Yes — {n} real {shapePlural}!" (quilts) · "Yes — {n} triangles and {m} squares!" (count).

## 8. Settings (each visibly changes the board at rest)
1. **Tins show:** the shape / the name / the clue — the tin labels change (outline + word, word only, beads/ticks only).
2. **Board:** shape pictures / real or not / count — a picture with two tins, a quilt with one tin, or a triangles-and-squares figure with the number rows.

## 9. Words (EN source)
- title (in-tool): "Paint the Shapes"
- instruction: pictures "Pick a tin. Paint every piece that is its shape." · quilts "Paint only the real {shapePlural}." · count "Paint the triangles and squares. Then say how many."
- names (singular / plural): circle(s), square(s), triangle(s), rectangle(s), hexagon(s), oval(s), star(s), diamond(s), heart(s), pentagon(s).
- riddles (clue mode, spoken + aria): triangle "I have 3 straight sides and 3 corners." · square "I have 4 corners and 4 sides, all the same length." · rectangle "I have 4 square corners. My opposite sides match." · circle "I am round. Every part of my edge is the same distance from my middle." · oval "I am round, but longer one way." · hexagon "I have 6 straight sides and 6 corners." · pentagon "I have 5 straight sides and 5 corners." · star "I have 5 points." · diamond "I have 4 sides, all the same length, and I lean." · heart "I have two round bumps and one point."
- hints: hintStart "Pick a tin, then tap every {shape} in the picture." · hintCount "How many did you paint? Tap the numbers." · hintMore "There is one more {shape} — look for a turned one or a small one." · hintMoreTin "There is one more piece for this tin — look for a turned one or a small one." · hintWrong "Count its corners. Does the tin have that many?" · hintGlow "Paint the glowing pieces."
 · hintCountOne "Count the {colour} pieces one by one." · hintCountNum "Count with the numbers."
- celebrations: as §7.
- settings: "Tins show" · "the shape" · "the name" · "the clue" · "Board" · "shape pictures" · "real or not" · "count"
- **Locale traps:**
  - The old `SHAPE_LABELS` mixed forms (sv/da/no definite *cirkeln*, fi partitive *ympyrää*) to fit "Tap the {shape}". The new frames use the **bare singular and plural** (tin labels: sv *cirkel*, da *cirkel*, no *sirkel*, fi *ympyrä*; plurals sv *cirklar*, da *cirkler*, no *sirkler*, fi *ympyrät*), taken from `mini tools/pictures/shapes.json` labels where they exist and native-authored for the rest; sentences that need a case use a frame that keeps the noun in one form (fi "Maalaa kaikki ympyrät." nominative plural object of a total action — native-checked).
  - **diamond:** de *Raute*, fr *losange*, es/it *rombo*, pt *losango*, nl *ruit*, sv *romb*, da *rombe*, no *rombe*, fi *vinoneliö* — these are RHOMBUS words, so the pieces are rhombi (never a turned square), which is correct in every locale.
  - **square vs rectangle:** in several curricula (fi, sv, de) the square is taught early as a special rectangle — hence the one-directional rule; no round ever calls a square "not a rectangle".
  - **oval:** fr *ovale*, de *Oval*, fi *soikio*, sv/da/no *oval* — fine; **heart** and **star** are everyday words everywhere.
  - Plural agreement in "{n} triangles": numerals with plural nouns — fi requires partitive singular after a numeral ("5 kolmiota") → the celebration frame per locale carries a numeral form (fi `numPart`), es/pt/it/fr plain plural, de plural, sv/da/no plural, nl plural.
  - fr U+202F before ! and ?.
- **Sound off:** the tin label carries the shape (outline/word/beads); the paint either stays or runs off — no reading needed in shape mode.

## 10. Sound off, access, phones
- Keyboard path §5; every piece is a focusable SVG button; its aria never names its kind (that would answer): "piece {k} of {n}, painted / not painted", and the trace's bead count is announced after a tap ("3 corners").
- Taps: pieces ≥ 44 px short side at 360; tins ≥ 96 px; chips ≥ 44 px tall.
- Fold: 360 × 740 → task 24 + tins 96 + picture 300 + puddle 20 + bubble/Check 56 ≈ 500 px (count rounds + chips 96 ≈ 600). 320 × 640: picture 270 → ≈ 570 / 620. Check above the fold.
- Phone: tins move above the picture; the quilt reflows 4 × 2.

## 11. Distinct from
- Sibling **#38 Professor Pip's Museum** (same standard) routes treasures from a conveyor onto pedestals whose hinged frames clasp a shape — sorting by routing and clasping. Here nothing moves anywhere: the child paints a picture and the paint itself accepts or refuses — a colour-by-code page that checks itself, plus the leak test for open figures.
- Tool **shape-stretcher** (tags that hold while a shape turns) and planned **#212 geoboard-band** (make shapes with a band) build or deform one shape; none paints pictures or counts pieces. Planned **#274 shadow-table** is tangram fitting (flips/turns), not naming.
- **#39 Flat or Solid** sorts 2D vs 3D by a letterbox slot.

## 12. Build plan
- **Core state:** `{labelMode:'shape'|'name'|'clue', board:'picture'|'quilt'|'count', round, pieces:[{id, kind, verts|curve, open:bool, curvedSide:bool, rounded:bool, angle, scale}], tins:[{kind, colour}], tin:null|i, painted:{pieceId:tin}, chips:{0:null,1:null}, miss, help}`.
- **Core functions:** `traceOf(piece)` → `{corners: n, equalSides: groups, closed, curved}` (computed from the piece geometry, never from `kind`) · `accepts(tin, piece)` (closed AND kind-attributes match the tin's kind: triangle = 3 straight sides closed; square = 4 equal sides + 4 right corners; rectangle = 4 right corners (squares never present); rhombus = 4 equal sides, not right corners; hexagon = 6 straight sides closed; pentagon = 5; circle = constant radius; oval = closed curve, non-constant radius, no corners; star = 10-vertex star outline; heart = the heart outline) · `paint(piece)` · `unpaint(piece)` · `targetsLeft()` · `check()` · `quadrantOf(piece)` · `layout(width)`.
- **Gate ground truth:** accepts() from geometry for every piece in every round equals the round table; every target kind has ≥ 2 orientations and ≥ 2 sizes; ≥ 2 non-target pieces; no overlaps; smallest piece ≥ 64 px at 704; no square in any round with a rectangle tin or a diamond tin; diamond pieces are non-square rhombi; open pieces never accept; quilts have 2–4 real; count tables match painted counts; tin order 50 % ±1.
- **Mutations:** accepts() reads `kind` instead of geometry · a 45° square rejected by the square tin · open triangle accepted · rounded-corner triangle accepted · rectangle tin rejects a 1:3 rectangle turned 30° · a square placed in a rectangle-tin round · count answer off by one · targets all in one quadrant · help survives a new paint · paint judged at the tap (before Check) · a correctly set piece un-set by a later miss.

- **Risks:** the trace's ticks must be legible at 44 px pieces (draw ticks at 6 px, beads at 6 px on phones); the leak animation must read as "through the gap" (stream starts at the gap's midpoint).
- **BLOCKED:** nothing (no library art needed).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — painting a picture that comes alive, with paint that dribbles off the wrong pieces and spills out of leaky ones.
2. **Would a teacher put it on the board?** Yes — a colour-by-code page that teaches while it checks: corners and equal sides are drawn on every piece the child touches, turned and tiny shapes are the ones that matter.
3. **Would a parent trust it?** Yes — calm, wordless apparatus, no score, the same shapes as the worksheets.
4. **The invention, in one sentence:** the brush runs round each piece leaving a bead on every corner, and the paint only stays in a piece that truly is the tin's shape — an open one leaks.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- The invention could be beaten by brute force: the paint refused wrong pieces at the tap and "rejected paint is never a miss", so tapping every piece let the tin do the geometry. The verdict now waits for **Check, the drying moment**: every coat stays wet while the child decides (with the brush's corner beads and side ticks as evidence), then the pieces set one by one and wrong or open ones shed their paint — the run-off is miss 1 itself. Correctly set pieces stay set; a new hint (`hintWrong`) points at corner counting; mutations now kill a tap-time verdict.
- Distinctness from #38: #37 judges a whole picture by paint setting; #38's miss showing no longer uses beads (see #38's review), so the bead-and-tick trace is #37's alone.
- No library pictures are used (correctly — `shapes/diamond` is a turned square and the shapes theme colours give the answer away); nothing else changed in the excellent round tables, which were re-checked (quilts 8 patches each, count values 2–7 / 1–4, never 0).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
