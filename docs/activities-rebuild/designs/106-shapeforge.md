# Row 106 — Mim's Glow Workshop → THE LIGHT-LEAK LANTERN (1.G.A.2)

## 0. Identity
- id `shapeforge.compose.1-g-a-2` (KEPT; slugs, titles and intros frozen for en, de, fr, es, pt, it, nl, sv; da/no/fi slug, title and intro authored new at build) · grade 1 · CCSS 1.G.A.2 (compose two-dimensional shapes to create a composite shape, and compose new shapes from the composite) — also K.G.B.6 (named in the frozen intro) · Geometry · own files `light-leak-core.js`, `light-leak-activity.js`, `light-leak-activity.html`, `light-leak-activities.json` (`shapeforge-activities.json` emptied to `[]`).
- worksheets it covers: K-353 Tangram Puzzles: Cut Out the Pieces and Build Two Figures (L3 build rounds) · K-358 Easy Tangram Puzzles: Draw the Lines for 2 and 3 Pieces (L3 T1–T6 + the seams the finished lantern etches, §7) · G1-354 Tangram Puzzles: Four Shadows to Build (L3 build rounds) · G1-355 Tangram Puzzles: Which Piece Is Missing? (L2) · G2-347 Tangram Puzzles: Which Solution Matches the Shadow? (L3 shadow rounds — turned or flipped ones do not match).
- old activity: fuse glowing glass shards (triangles and rhombi on a triangle grid) to fill a blank lantern; "forge the SAME shape a new way"; "re-forge it into something new"; substitute ("cover this space with TRIANGLES"); extend ("grow this into a hexagon"); per-locale prompts in de/fr/es/pt/it/nl/sv. **Kept**: Mim the glow-smith (a name in the prose only — no drawn character), glass shards and lanterns, the triangle-grid geometry, the eleven round targets (rhombus, trapezoid/roof, big triangle, parallelogram "lantern", hexagon, the same-hexagon-a-new-way, the parallelogram-another-way, the long bar, the triangles-only cover, the grow-into-a-hexagon) and their palettes as the L1 table, the named-target cog. **Added**: the trapezoid and hexagon pattern blocks (the full pattern-block family), the light-leak physics that makes "filled exactly" visible, the seam memory that makes "a NEW way" checkable, the missing-shard level (G1-355), and a tangram level with shadow matching (K-353, K-358, G1-354, G2-347).

## 1. The pitch
"A lantern only glows when it is sealed: every gap between your glass pieces leaks a beam of light, and every piece that sticks out throws a shadow on the wall."

## 2. Why a child will want it again
- **Light you can see through the cracks.** Behind each empty lantern frame a warm lamp is burning. At first the whole frame is a bright, glaring gold window. Every piece of coloured glass dropped in turns its patch into soft stained-glass colour — and the gaps that are still open shine as sharp gold slivers, exactly the shape still missing. Children chase the last sliver of light.
- **The shadow on the wall.** A piece that sticks out over the frame's edge throws a dark shadow onto the workshop wall behind — you can see precisely how much sticks out.
- **The lantern that floats.** When the frame is sealed the lamp brightens, the whole lantern glows like a stained-glass window, a little ring of light pulses out, and the lantern rises up on its string to join the **garland** across the top of the workshop. Over a pass the garland fills with the child's own lanterns, each one a different pattern of colours.
- **The etched seams.** A finished lantern keeps its seams etched in the glass as fine silver lines — the "lines where the pieces meet" of the worksheets, drawn by the child's own hands. In "a new way" rounds, the old seams wait faintly in the frame, daring the child to find a different pattern.
- **Free play**: after a round, the shards can be taken out and the lantern rebuilt any way; a "clear glass" toggle makes all shards colourless so the patterns of seams stand out.

## 3. The skill and the misconception
- Skill (1.G.A.2 and the mapped worksheets): put shapes together to make a bigger shape that is filled exactly — no gaps, no overlaps, nothing sticking out; make the same shape in more than one way; see a composite shape as smaller shapes (where the pieces meet); pick the piece that fits a hole exactly (shape AND size); match a tangram solution to a shadow exactly, rejecting turned or flipped solutions.
- Misconceptions made visible:
  1. **"Close enough is filled"**: a tiny gap is ignored. Push-back: the gap is a bright beam of light — the brightest thing on the screen.
  2. **"It's filled if nothing is empty"** while a piece overhangs: push-back: the overhang casts a hard shadow on the wall, and the lantern won't glow.
  3. **"There's only one way"**: push-back: "a new way" rounds keep the old seams etched; a different set of seams is visibly a different way of building the SAME outline.
  4. **"A triangle is a triangle"** (size ignored): in the missing-shard and tangram rounds a small triangle leaves a light leak in a medium-triangle hole, and a large one throws a shadow.
  5. **"Turned or flipped is the same picture"** (G2-347): push-back: the shadow is turned into a lantern frame of its own, and a finished solution is a RIGID glass pane that slides into it on a rail without turning or flipping — a flipped solution leaves a beam of light on one side and casts an overhang shadow on the other, by the same light-leak law as every other round (no separate projection test).

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The garland** (top, 660 × 56): a drawn string across the top with lantern hooks; finished lanterns hang here as miniatures (48 px tall), in the order they were made.
- **The workbench** (centre left, 420 × 300): the **lantern frame** — a dark iron outline (5 px #2A3B47 with brass rivets at the outline's corners, 8 px circles) around the target region, drawn on the triangle grid with a **unit side of 44–60 px** per round (the round's `unit` value is chosen so the lantern spans ≤ 380 × 260 px; a hexagon piece is then 88–120 px across). Inside the frame, empty cells are filled with **lamp glow** (#FFE58A with a radial white core and a soft 12 px outer bloom); covered cells show the glass colour. The **workshop wall** behind the bench (#E8DCCB with faint brick lines) is where shadows fall.
- **The lamp** (behind the frame, implied by the glow; a small drawn lamp flame icon at the frame's bottom centre, 24 px).
- **The shard tray** (right, 220 × 300): the round's pieces as a stack per kind with a count badge (numeral, content): **triangle** (green #4CAF50), **rhombus** (blue #3F7FD9), **trapezoid** (red #E0503C), **hexagon** (yellow #F2C230) — the standard pattern-block colours — each tray item a full-size piece in glass style (70 % fill, 2 px ink outline, a white sheen stroke). Tangram rounds: the 7 tangram pieces in their own colours (two large: teal, plum; medium: sun; two small: coral, leaf; square: sky; parallelogram: rose), at the round's unit.
- **Turn and flip**: tapping a piece already placed (or the selected tray piece) turns it 60° (tangram 45°); a **flip** button (48 px, a mirror-arrows icon) appears beside a selected parallelogram or trapezoid (tangram: the parallelogram — the only tan whose flip is a different shape).
- **The shadow frame** (L3 shadow rounds): the target **shadow** (a dark silhouette #2A3B47 at 85 %, the worksheet's picture) sits on the workbench; when the round starts an iron outline grows round it and its inside starts to glow — the shadow has become a lantern frame. Three finished **glass panes** (the three solutions, each pre-assembled from tangram glass with its seams etched, 150 × 150 boxes) stand in a **pane rack** on the right. The panes are rigid: they cannot be turned or flipped (no turn on tap, no flip button) — that is the point.
- Task line above (≤ 24 px). Check button and bubble under the bench.

At 360 (stacked, stage ≈ 336 × 640): garland 336 × 40, workbench 336 × 250 (unit side 34–40 px — every pattern-block triangle is ≥ 34 px a side; a hexagon piece is 68–80 px across), shard tray as a horizontal strip 336 × 96 under the bench (piece previews at 64 px, count badges 20 px), flip button 48 px floating at the selected piece. Shadow rounds: the shadow on top (200 × 160), the three solutions in a row below (104 × 104 each). Check at y ≈ 560 at 360 × 740; at 320 × 640 the unit side is 30–36 px, the tray 320 × 88, Check y ≈ 530.

**No library pictures** — glass pieces, frames, lamp, wall and garland are all drawn apparatus geometry (the pieces and outlines ARE the mathematics). No words on the apparatus; the only numerals are the tray count badges.

## 5. The hand
1. **Drag a piece** from the tray (pointer down lifts a copy, 1.08×, within 50 ms; the tray count drops by one) over the frame → while hovering, the piece's **snap preview** shows where it would land on the grid (a dashed outline at the nearest grid position for its current turn). Release → it snaps (100 ms) with a glassy *tink*; the light under it is replaced by its colour within 100 ms. A piece released over another piece cannot overlap: it slides to the nearest free snap within one unit, or floats back to the tray (250 ms). A piece released half outside the frame stays where it snapped (overhang allowed — that is what the shadow shows).
2. **Turn**: tap a placed piece → it turns 60° (45° tangram) about its centre (180 ms) and re-snaps; if the turned piece would overlap, it turns on to the next free angle. **Flip**: the flip button mirrors the selected piece (200 ms flip-card animation).
3. **Take out**: drag a placed piece off the frame back to the tray (or drop it anywhere outside) → the tray count rises; the light floods back into its cells.
4. **The light and the shadow are live**: after every move, uncovered target cells glow; covered non-target area (overhang) casts a shadow on the wall offset 10 px down-right with a soft edge, and the overhanging piece's outline turns coral where it crosses the frame.
5. **L2 missing shard**: the lantern arrives filled except a hole (glowing); three spare pieces lie in the tray; drag one in, turn/flip it, Check.
6. **L3 shadow rounds**: drag a pane from the rack over the shadow frame → it slides in along the frame's rail and snaps to the frame's anchor corner (300 ms), exactly as it stands in the rack — never turned or flipped. The live light law answers at once: an exact match seals (no light, no wall shadow); a flipped or turned pane leaves bright leaks where the frame is uncovered and throws an overhang shadow on the wall where it sticks out. Trying is free — drag the pane back to the rack and try another; Check judges the pane in the frame.
- **Free play**: after success all pieces can be taken out and rebuilt; the "clear glass" toggle (in free play, a small prism icon) renders all shards clear so the seams show as the pattern.
- Sound: *tink* on snap, a low hum that rises in pitch as the lit area shrinks (pure tone 220 → 440 Hz over the fill fraction, very soft), a bell chord when sealed.

## 6. The rounds
Pattern-block grid: triangle cells `(row, col)`; a cell is an up-triangle when `(row + col)` is even, a down-triangle when odd (row 0 at the top). **Exact geometry** (unit side s, row height h = s·√3/2): cell (r, c) spans x from c·s/2 to c·s/2 + s; an up-cell has its base on y = (r+1)h and apex at (c·s/2 + s/2, r·h); a down-cell has its top edge on y = r·h and apex at (c·s/2 + s/2, (r+1)h). With this, (0,0)(0,1)(0,2)(1,0)(1,1)(1,2) is the regular hexagon with vertices (½,0)(1½,0)(2,1)(1½,2)(½,2)(0,1) in (s, h) units, and (0,2)(1,1)(1,2)(1,3) is the big triangle with apex (1½,0) and base y = 2h from x = ½ to 2½ (both checked by the critic). Piece areas in cells: triangle 1, rhombus 2, trapezoid 3, hexagon 6. A round is right when the target cells are covered exactly, with no piece outside the frame and (in "new way" rounds) a seam set different from the remembered one. Compose rounds have many right fillings — the instrument never prefers one; there is one right OUTCOME (sealed), not one right arrangement. Missing-shard and shadow rounds have exactly one right piece / solution.

**Level 1 — Glass shards** (pattern blocks)
| # | cog | target cells | palette (count) | notes |
|---|---|---|---|---|
| 1 | build (on-ramp) | rhombus: (0,0)(0,1) | triangle 2, rhombus 2 | 1 rhombus or 2 triangles |
| 2 | build (on-ramp) | trapezoid: (0,0)(0,1)(0,2) | triangle 3, rhombus 2 | |
| 3 | exactly these | rhombus: (0,0)(0,1) | triangle 2 only | K-358: "use these 2 pieces" — the etched seam is the line where they meet |
| 4 | exactly these | trapezoid: (0,0)(0,1)(0,2) | triangle 1, rhombus 1 only | K-358: 2 pieces |
| 5 | build | big triangle: (0,2)(1,1)(1,2)(1,3) | triangle 3, rhombus 2 | |
| 6 | build | parallelogram: (0,0)(0,1)(0,2)(0,3) | triangle 2, rhombus 3 | |
| 7 | build | hexagon: (0,0)(0,1)(0,2)(1,0)(1,1)(1,2) | triangle 4, rhombus 3 | the regular hexagon (geometry above) |
| 8 | new way | the hexagon of #7, the round-7 seams etched | triangle 6, rhombus 3, trapezoid 2 | the new filling must differ in at least one seam |
| 9 | new way | the parallelogram of #6, its seams etched | triangle 4, rhombus 2 | |
| 10 | only triangles | parallelogram (0,0)…(0,3) | triangle 4 only | the old "substitute" round |
| 11 | grow | hexagon, 2 cells pre-filled by a fixed rhombus (locked, pinned with brass rivets) | triangle 4, rhombus 3 | the old "extend" round |
| 12 | re-forge | the long bar: (0,0)…(0,5) | triangle 4, rhombus 3, trapezoid 2 | the old "recompose" round |

Rounds 8 and 9 appear in a pass only after their source rounds (7, 6) — the reshuffle keeps each pair ordered.

**Level 2 — The missing shard** (G1-355; the frame arrives filled except a hole; three spares, exactly one fits)
| # | lantern | the hole | spares (the right one first; tray order dealt) |
|---|---|---|---|
| 1 | hexagon | one rhombus | rhombus · triangle · trapezoid |
| 2 | hexagon | one trapezoid | trapezoid · rhombus · hexagon |
| 3 | big triangle (4 cells) | one up-triangle at the apex | triangle · rhombus · trapezoid |
| 4 | parallelogram (4 cells) | one rhombus, tilted the other way from the tray's rhombus (needs a turn) | rhombus · trapezoid · triangle |
| 5 | tangram big square (side 2) | the medium triangle | medium triangle · small triangle · large triangle |
| 6 | tangram rectangle (square + 2 small) | one small triangle | small triangle · medium triangle · square |
| 7 | tangram full square (all 7) | the parallelogram, mirrored from the tray's (needs the flip) | parallelogram · square · medium triangle |
| 8 | tangram large triangle (medium + 2 small) | the medium triangle | medium triangle · square · small triangle |

Rounds 5–8 make SIZE the point: the small triangle leaks light in the medium hole, the large one throws a shadow.

**Level 3 — Tangram** (unit u: the full tangram square is 4u × 4u; areas: small triangle 1, medium triangle 2, square 2, parallelogram 2, large triangle 4 — in u² units of the half-square)
| # | kind | target shadow | pieces in the tray | one known solution (the gate proves at least one exists; any exact cover is right) |
|---|---|---|---|---|
| T1 | build, 2 pieces | square (side √2·u) | 2 small triangles | joined on their long sides |
| T2 | build, 2 pieces | medium-size triangle (legs 2u) | 2 small triangles | joined on a short side |
| T3 | build, 2 pieces | parallelogram | 2 small triangles | joined on a short side, right angles at opposite ends |
| T4 | build, 3 pieces | big square (side 2u) | medium triangle, 2 small triangles | the medium triangle is half; the two smalls make the other half |
| T5 | build, 3 pieces | rectangle (√2·u × 2√2·u) | square, 2 small triangles | the smalls make a second square beside the first |
| T6 | build, 3 pieces | large triangle (legs 2√2·u) | medium triangle, 2 small triangles | the medium and the two smalls each make half |
| T7 | build, 7 pieces | the full tangram square (4u) | all 7 | the classic layout |
| S1 | shadow match | parallelogram leaning right (2 small) | solutions: leaning right ✓ · leaning left (flipped) · standing upright (turned 90°) | |
| S2 | shadow match | square + small triangle on its right (a right trapezoid) | solutions: as shown ✓ · triangle on the left (flipped) · turned 90° | |
| S3 | shadow match | large triangle pointing up (medium + 2 small) | solutions: pointing up ✓ · pointing right (turned 90°) · pointing down (turned 180°) | |
| S4 | shadow match | "boot": medium triangle with the square on its short leg | solutions: as shown ✓ · flipped · turned 90° | |

L3 passes take T1–T7 and S1–S4 interleaved (T1, T2, S1, T3, T4, S2, T5, S3, T6, S4, T7 as the base sequence, then the order-only reshuffle keeps T7 last).

- **Answer position**: compose rounds have no position to guess. Missing-shard: the right spare's tray slot is dealt balanced (each of 3 slots ⌈8/3⌉ or ⌊8/3⌋ times per pass), and the right spare is never the only one already at the needed turn (in #4 and #7 it arrives turned/flipped so a "just drop it" strategy leaks light). Shadow rounds: the correct solution's shelf slot balanced 4/3 over slots; the flipped and turned decoys are dealt into the other slots. **Gate**: over 2,000 passes P(right in slot s) = 1/3 ± 0.04; a "drop the first spare without turning" bot succeeds in ≤ 3 of the 8 L2 rounds.
- **Order**: order-only reshuffle per pass with the pair constraints (L1 #8 after #7, #9 after #6; L1 #1–#2 always open; L3 T7 last).

## 7. Check, the misses, the success
- **Check with nothing placed** → no miss; the frame's glow pulses once; bubble: "Drag a glass piece into the lantern."
- **Miss 1** → the light speaks: the lamp brightens to full for 1.5 s so every leak blazes (each open cell gets a thin white outline), and every overhang's shadow darkens and its piece's crossing edge flashes coral. For a "new way" round with identical seams: the etched old seams light up exactly under the child's seams (both silver lines glow together). Shadow rounds: the lamp blazes the leaks and overhang of the pane in the frame. Bubble by cause:
  - leak: "Light is still shining through. Fill every gap."
  - overhang: "A piece is sticking out — see its shadow on the wall?"
  - both: "Light is shining through AND a piece sticks out."
  - same way: "That's the same way as before — the old lines match. Try different pieces."
  - L2 wrong spare: "That piece doesn't fit the hole exactly. Look at its shape and its size."
  - shadow: "Light gets through and a corner sticks out — this one is turned or flipped. Try another pane."
- **Miss 2** → the stronger showing: one placement that fits a leak is shown as a **ghost piece** (dashed outline in the needed piece's colour at the right spot and turn), the largest leak first; for overhang the overhanging piece is outlined and its nearest legal spot ghosted; for "same way", one old seam that could be removed blinks; L2: the right spare in the tray glows and a dashed outline of the hole's shape appears beside it at the same size; shadow: the pane in the frame stays, and a dashed copy of it turns (or flips) by itself on the bench until it would seal — showing which move the pane needed — while the matching pane in the rack lifts 6 px. Bubble: "Try a piece like the dotted one."
- A new move clears the ghost and the highlights (help taken away until the next Check).
- **Success** → the lamp brightens, the glass glows (300 ms), the seams etch in silver (a quick draw-on along every edge where two pieces meet, 500 ms — the worksheet's "lines where the pieces meet"), a ring of light pulses out, and the lantern rises onto the garland (600 ms). Bubble: L1 "Sealed! {pieceList} make a {target}." (e.g. "Sealed! 1 rhombus and 2 triangles make a trapezoid."; unnamed targets: "Sealed! {pieceList} fill the lantern.") · new-way rounds "A new way to make the same {target}!" · L2 "That {piece} fits exactly!" · T rounds "Sealed! {pieceList} make the {figure}." · S rounds "That one matches the shadow exactly — not turned, not flipped."

## 8. Settings (each visibly changes the board at rest)
1. **Glass**: coloured (default; the pattern-block colours) · clear (every shard is clear glass with only its outline and sheen — shape, not colour, tells the pieces apart; the tray shows clear pieces at rest).
2. **Turning**: by tap (default) · turns itself to fit (an assist: a piece dropped near a snap turns to the first angle that fits without overlap — the tray pieces show a small circular-arrow badge at rest).
Level picker (shell): Glass shards · The missing shard · Tangram.

## 9. Words (EN source)
- title (frozen): Mim's Glow Workshop — Compose Shapes from Pattern Blocks
- instruction: "Fill the lantern with glass so no light leaks through and nothing sticks out."
- task lines (per round, from the old prompts where they existed): "Fill the lantern." · "Use just these pieces." · "Make the SAME lantern a NEW way." · "Use only triangles." · "Grow it into a hexagon." · "Make a long bar." · L2 "Which piece fills the hole exactly?" · L3 build "Build the shape — fill it exactly." · L3 shadow "Which one matches the shadow exactly?"
- piece names (for the success list, with numbers): triangle, rhombus, trapezoid, hexagon; tangram: small triangle, medium triangle, large triangle, square, parallelogram. Target names: rhombus, trapezoid, triangle, parallelogram, hexagon, square, rectangle; unnamed targets ("this lantern", "the long bar").
- hints and celebrations: §7.
- settings labels: "Glass" — "coloured" / "clear"; "Turning" — "by tap" / "turns itself to fit"; levels as above.

**Locale traps**:
- **Pattern-block names at grade 1** differ by country and the old prompts already show it: the old de/fr/es/pt/it prompts call the trapezoid a "roof" (*Dach*, *toit*, *techo*, *telhado*, *tetto*) and the parallelogram a "slanted brick" (*brique penchée*, *tijolo torto*, *mattone storto*) — child words for shapes whose formal names are not grade-1 vocabulary everywhere. Keep that ruling: each locale uses its national grade-1 word, formal where the curriculum uses it (e.g. fi *suunnikas* is school-level at grade 1, while de grade-1 materials prefer a child word over *Parallelogramm*) — the reviewer decides per locale, and the success line uses the same word as the task line.
- **Rhombus**: de *Raute*, fr *losange*, es *rombo*, pt *losango*, it *rombo*, nl *ruit*, sv *romb*, da *rombe*, no *rombe*, fi *vinoneliö*.
- **Number + noun agreement** in the piece list ("1 rhombus and 2 triangles"): plurals per locale (fi partitive after numbers: *2 kolmiota*; de *2 Dreiecke*; fr *2 triangles*); "and" joining (Intl.ListFormat per locale, hardcoded-EN fallback).
- **Tangram piece names**: *kleines/mittleres/großes Dreieck*, fr *petit/moyen/grand triangle*, fi *pieni/keskikokoinen/iso kolmio* — size adjectives agree with gender.
- "Mim" stays Mim in every locale (a name); the glow-smith job title appears only in the frozen titles/intros already authored (and in the new da/no/fi intros, where the reviewer picks the child-friendly word).
- No language on the apparatus; TTS not needed.

## 10. Sound off, access, phones
- Sound off: leaks are bright light, overhangs are shadows, the seal is the glow and the rise to the garland.
- Keyboard: Tab to a tray kind, Enter picks a piece, arrow keys move the snap preview cell by cell, R turns, F flips, Enter drops; Tab to a placed piece, Delete returns it. Shadow rounds: Tab to a pane in the rack, Enter slides it into the frame, Enter on another pane swaps it.
- aria: tray `aria-label="{n} {piecePlural} left"`; frame live region "{k} gaps of light, {m} pieces sticking out"; on seal "lantern sealed".
- Taps: tray pieces ≥ 64 px, flip button 48 px, placed pieces ≥ 34 px a side on phones (unit floor 34 px at 360, 30 px at 320 — the smallest piece, a 30 px triangle, has a 44 px invisible hit area).
- Check above the fold: y ≈ 560 at 360 × 740, y ≈ 530 at 320 × 640.

## 11. Distinct from
- **New 229 The Blink Viewer** (lay one picture over another: twins melt, differences glow): pictures compared for difference. Here light leaks through UNFILLED area of a frame and shadows fall from OVERHANG — light measures coverage, not likeness.
- **New 224 The Tile Twin** (tracing paper over a grid copy): grid copying. **New 212 Geoboard Band**: building outlines with a band. **shape-stretcher**, **folding-sheet**, **build-plan** tools: none composes pieces into a region.
- Generic tangram apps snap pieces into a silhouette with a "correct!" — here sealing is a physical state (no light, no shadow), "a new way" is checked by remembered seams, size matters in the missing-shard rounds, and a flipped solution is rejected by the same light-leak law as everything else. **New 227 The Shadow Lamp** (aim a lamp so a picture's real shadow slides onto a wall shadow and mismatches light up) is a projection comparison of pictures; here nothing is projected — a rigid pane is slid into a frame and judged by coverage.
- No built invention reused.

## 12. Build plan
- **Core** `LightLeakCore`: two geometries — `TriGrid` (pattern blocks; pieces as cell sets per rotation, 6 rotations; trapezoid has a mirror) and `TanGrid` (tangram; pieces as polygons in u-units, positions snapped to u/2, rotations in 45° steps, the parallelogram flippable). State `{round, placed:[{kind, pos, rot, flip}], tray:{kind:count}, rememberedSeams?:Set}`. Functions: `cellsOf(piece)` / `polygonOf(piece)`; `coverage(state)` → `{uncovered, overhang, overlap}` (TriGrid exact by cell sets; TanGrid by polygon clipping on a 1/8-u raster — exact because all vertices lie on the u/2 lattice); `isSealed`; `seams(state)` = set of internal edges between different pieces (canonicalised); `isNewWay(seams, remembered)`; `snap(kind, rot, flip, pointer)`; `fitsHole(spare, hole)` (exact congruence including size, under the allowed turns/flips); `shadowMatch(solution, target)` (exact polygon equality WITHOUT turning or flipping); `ghostHint(state)` (a piece that fits the largest leak, from a precomputed solution).
- **Gate's own ground truth** (`verify-light-leak-core.js`): an independent exact-cover solver over the round table (its own cell/polygon model, written from the table) proves for every compose round that at least one exact cover exists with the palette, and for "exactly these" rounds that the cover uses exactly the listed pieces; for "new way" rounds that a filling with different seams exists; for L2 that exactly one spare fits the hole (enumerating all turns/flips of all spares), including that the small and the large triangle do NOT fit a medium hole; for S rounds that exactly one solution equals the target polygon without transformation and the decoys differ by a flip or a turn (and the turned decoy is not accidentally equal — e.g., S3 uses an isosceles triangle, so "turned 90°" must differ from the target as placed); seams of every success are drawn; the bots (§6).
- **Mutations**: overhang ignored (sealed while sticking out) · a 1-cell gap ignored · overlap allowed · new-way accepts identical seams · new-way rejects a mirror-image filling (it is a new way) · L2 accepts the small triangle in a medium hole · L2 rejects the right spare when it needs a flip · shadow match accepts the flipped solution · shadow match accepts the turned one · a pane can be turned in the frame (rigidity removed) · the locked rivet piece of #11 can be removed · ghost hint suggests an overlapping piece · Check with nothing placed counts a miss.
- **No pictures.** Risks: (1) TanGrid snapping on phones — pieces near u/2 = 15 px apart at 320; mitigated by snap-to-nearest-valid (no overlap) and the keyboard path; (2) the full 7-piece square (T7) is hard for grade 1 — it is last, and the ghost hint at miss 2 places one piece at a time; (3) the trapezoid flip: a pattern-block trapezoid's mirror equals a rotation (it is symmetric) — the flip button is shown only for the asymmetric tangram parallelogram, not for the trapezoid (gate asserts).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — chasing the last beam of light out of a lantern, watching a stained-glass pattern glow, and filling a garland with your own lanterns.
2. **Would a teacher put it on the board?** Yes — "no gaps, no overlaps, nothing sticking out" is the composition rule made physical; the etched seams are the "lines where the pieces meet"; "the same shape a new way" is checkable; the missing-shard and shadow rounds are the exact tangram worksheets, with size and flips mattering.
3. **Would a parent trust it?** Calm, beautiful, no score, no words to get wrong.
4. **The invention in one sentence:** a lantern only glows when it is sealed — every gap between the glass pieces leaks a beam of light and every piece that sticks out casts a shadow on the wall.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 3→5 · reality 5→5
What changed:
- **Collision removed:** the L3 shadow rounds projected a solution's shadow onto the target shadow with mismatch slivers lighting up — that is the designed New 227 Shadow Lamp mechanic. Now the shadow becomes a lantern frame and the solutions are rigid glass panes that slide in without turning or flipping, judged by this instrument's own light-leak law (leaks + overhang). One law for every round.
- **Grid geometry made exact.** The hexagon round said "the core maps the cells"; the design now defines the triangle-cell coordinates exactly, and I checked that the hexagon, big triangle, rhombus, trapezoid, parallelogram and long-bar cell lists produce the intended shapes.
- Tangram tables re-checked: areas 4+4+2+1+1+2+2 = 16 = the 4u square; T1-T6 compositions and L2 #5-#8 holes are each fillable by exactly one spare (small leaks, large overhangs).
- Not a copy of any premium tool: no tangram or pattern-block tool exists in the tool list; shape-stretcher / folding-sheet / build-plan do not compose pieces into a region.
