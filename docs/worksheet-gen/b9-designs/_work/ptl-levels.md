# Picture Tracing Level Set (`ptl`): the three levels per face (pedagogue, 2026-10-22)

Read with `METHOD-picture-tracing.md` §4/§6/§11, `K-418-picture-tracing.md` and the 20 published renders
(`out/b9/en/_sheet.png`, opened). L2 numbers are MEASURED from the published pages (`data-lcs-pt-metrics` in
`out/b9/en/<ID>.html`, `tracedLen` / `pictures` / `minPic`); L1 and L3 are the targets the builder implements and the
gates assert on the RENDER. Body 675 × 716; the stack is 620-740 at every level (fewer pictures at L1 means BIGGER
pictures, never empty space).

## 0 The one rule behind all twenty tables: a level moves ONE band, never the move

`classify()` already accepts a band OBJECT (`pt-render.js:90`), so a level is a band object, not a new face.
The face's id, grade stamp, title, rule and instruction do not change; only the band object, the cast and the sizes do.

| level band | dash style | minSeg | gap | clear | minPic | speck | budget (traced length) |
|---|---|---|---|---|---|---|---|
| **PreK-1** (L1 of a PreK face) | P1 4 px 14/8 | 60 | 32 | 34 | 340 | 20 | ≤ 3,000 |
| **PreK** (L2 of a PreK face = published) | P1 | 50 | 28 | 30 | 300 | 20 | ≤ 4,500 |
| **PreK-3** (L3 of a PreK face) | P2 3 px 10/6 | 40 | 22 | 22 | 200 | 16 | ≤ 6,500 |
| **K-1** (L1 of a K face) | P1 | 50 | 28 | 26 | 200 | 18 | ≤ 6,500 |
| **K** (L2 of a K face = published) | P2 | 25 | 18 | 16 | 130 | 14 | ≤ 11,000 |
| **K-3** (L3 of a K face) | P3 2.1 px 6/5 | 14 | 12 | 12 | 95 | 10 | ≤ 13,000 |
| **G1-1** (L1 of a G1 face) | P2 | 25 | 18 | 16 | 130 | 14 | ≤ 9,000 |
| **G1** (L2 of a G1 face = published) | P3 | 12 | 10 | 10 | 80 | 9 | ≤ 15,000 |
| **G1-3** (L3 of a G1 face) | P3 (F16: P4 at 6 px) | 12 | 10 | 10 | 70 | 9 | ≤ 15,000 (the cap does NOT rise; harder = more, smaller, more detailed lines inside it) |

Drawings by level: **L1 = library band 1 only**; **L2 = the face's published mix** (band 1-2 at PreK/K, 2-3 at G1);
**L3 = band 2 (K faces may take ONE band-3 hero), band 2-3 on G1 faces**. Every L1 page must also sit **≥ 25 % under its
band budget's L2 reference**, and every L3 page **≥ 15 % over** the published page's measured length (else the "level"
is a label): the gate compares `tracedLen` against the face's L2 measured value given in each table.

Grade fit: L1 of a PreK face = 3; L2 = 3-4; L3 = 4-5 · L1 of a K face = 4-5; L2 = 5-6; L3 = 6 · L1 of a G1 face = 5-6;
L2 = 6-7; L3 = 7. The printed grade stamp stays the face's; the landing/teacher note may say "easier / harder".

Answer-free rules that hold on all 300 pages: no letter- or digit-shaped picture or decor; nothing touches another
picture or a frame (gap ≥ the level's `clear`); start markers only on pictures of ≤ 4 strokes; repeated parts get one
treatment (§4); a picture must be named the same way by a 5-year-old in all 11 locales (open it).

## 1 Face by face

Columns: **N** pictures (traced items) · **size** = longest side of each traced picture's ink box in body px ·
**draw** = library band · **dash** · **budget** · **scaffold**.

### K-418 base "The path to the door" (K) · L2 measured 10,411 px, 6 pictures
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 3-4 + ground line + 1 sky motif | 200-330 | 1 | P1 (K-1) | 4,500-6,500 | none; every picture stands on the ground |
| L2 | 5-7 + sky + ground | 130-320 | 1-2 | P2 | 8,000-11,000 | none |
| L3 | 8-10 + sky + ground + one path/fence/river motif | 95-260 | 2 (1 hero may be 3) | P3 (K-3) | 12,000-13,000 | none |
Must not change: ONE place in ONE moment, every picture standing on something, a horizon, no structure frame. Instruction
("trace every dashed line to finish the <place>") stays true: every line dashed except sub-floor details.

### K-419 first-tracing "porthole" (PreK) · L2 1,789 px, 1 picture
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 1 | 480-560 | 1, outline ≤ 3 traced lines, no traced inner detail | P1 (PreK-1) | 900-1,500 | 1 start dot + arrow |
| L2 | 1 | 470-560 | 1, ≤ 3 inner runs traced | P1 | 1,500-2,600 | 1 start dot |
| L3 | 1 | 420-520 | 1-2, 4-8 traced lines (inner shapes: a shell's ridges, a wing) | P2 (PreK-3) | 2,600-3,800 | 1 start dot on the outline only |
Must not change: ONE picture, inside the porthole ring, solid decor only around it. ⚠ Honest but NARROW: the three levels
differ by outline length and inner detail, not by number. That is the true ladder for a first-tracing page; do not add
a second picture at L3 (that becomes K-420/K-421).

### K-420 look-then-trace (PreK) · L2 3,722 px, 2 rows
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 2 rows (model + twin) | twin 300-320, model 70 % | 1, simple silhouette | P1 (PreK-1) | 1,800-2,800 | start dot on each twin |
| L2 | 2 rows | twin 290-300 | 1 | P1 | 2,800-4,500 | start dot on each twin |
| L3 | 3 rows | twin 200-220, model 150 | 1-2 | P2 (PreK-3) | 4,500-6,500 | start dot on each twin |
Must not change: frame + eye badge on the model, arrow, twin = the SAME drawing, same orientation, never mirrored.

### K-421 round-and-round (PreK) · L2 2,492 px, 3 pictures
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 2 on 2 ramps | 330-360 | 1, outline = one closed round line | P1 (PreK-1) | 1,500-2,400 | 2 o'clock dot, anticlockwise arrow |
| L2 | 3 on 3 ramps | 300 | 1 | P1 | 2,400-4,500 | same |
| L3 | 4-5 on 3 ramps (2 per ramp allowed) | 200-240 | 1-2, may carry ONE inner closed round part (a button, a wheel hub) | P2 (PreK-3) | 4,500-6,500 | dot on every closed round line |
Must not change: every traced picture ROUND (outline circularity ≥ 0.8), started at 2 o'clock anticlockwise; nothing
straight is dashed (stems, leaves solid via `solidAbove`); no spirals (K-424).

### K-422 straight-lines ↓ → ↘ (K) · L2 7,660 px
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 3 (1 per column) | 260-330 | 1 | P1 (K-1) | 3,000-5,000 | arrow badge per column |
| L2 | 6 (2 per column) | 180-300 | 1 | P2 | 6,000-11,000 | badges |
| L3 | 9 (3 per column) | 110-190 | 1-2 | P3 (K-3) | 11,000-13,000 | badges |
Must not change: three columns in the order down / across / slanted; each picture's `directionMix` ≥ 60 % in its OWN
column's direction at L1-L2, ≥ 55 % at L3 (measured, `tools/pt-straight.js`); no round-dominant pictures. ⚠ Library
supply of measured slanted pictures is thin: designers may use DRAWN ones (roof, kite, tent, ramp, sail).

### K-423 zigzags (K) · L2 5,793 px
| | tips | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 6-10 tips total (3 peaks ≥ 200 apart, angle ≥ 70°) + 2-3 pictures | peaks 150-220 tall | drawn + 1 | P1 (K-1) | 3,000-4,300 | none |
| L2 | 15-25 tips, angles ≥ 40°, tips ≥ 25 apart | as published | drawn + 1-2 | P2 | 4,500-11,000 | none |
| L3 | 30-45 tips, angles ≥ 35°, tips ≥ 15 apart (tiered firs with 4 tiers, a crown, a jagged leaf, a dragon/dinosaur back) | 95-200 | drawn + 2 | P3 (K-3) | 7,000-13,000 | none |
Must not change: every page is PICTURES whose edges are zigzags (no abstract zigzag row); "stop at every tip" true (no
rounded tip).

### K-424 curls and spirals (K) · L2 8,019 px, 5 frames
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 3 frames | 260-340 | 1, spirals ≤ 2 turns, turns ≥ 30 apart | P1 (K-1) | 3,500-6,000 | start dot at each spiral's OUTER end |
| L2 | 5 frames | 170-350 | 1-2, turns ≥ 18 apart | P2 | 6,000-11,000 | none |
| L3 | 6-7 frames | 110-220 | 2, ≥ 3 turns, turns ≥ 12 apart, loops (ℓ chain, curly tail, rope) | P3 (K-3) | 10,000-13,000 | none |
Must not change: the gallery of frames; every picture's dominant line is a spiral or loop. ⚠ Supply risk: few library
drawings carry clean spirals (snail, shell, lollipop, pinwheel, bow). 15 original casts will need DRAWN spirals
(lollipops, a coiled rope, a curly vine, a cinnamon roll, a fern head, a snail shell); say so rather than accept a
"curl" picture whose curl is a 10 px tick.

### K-425 trace-and-color (K) · L2 8,565 px, 6 pictures
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 3-4 | 220-330 | 1, every colour cell ≥ 60 px across | P1 (K-1) | 4,000-6,400 | none |
| L2 | 5-7 | 140-330 | 1-2, cells ≥ 40 | P2 | 7,000-11,000 | none |
| L3 | 8-10 | 100-220 | 2, cells ≥ 25 | P3 (K-3) | 11,000-13,000 | none |
Must not change: every traced outline CLOSED (colourable); no colour words, numbers or code; one scene.

### K-426 where-to-start (staircase) (K) · L2 1,969 px, 4 steps
| | N | size | draw | dash | budget | scaffold |
|---|---|---|---|---|---|---|
| L1 | 3 steps | 190-230 | 1-2 strokes each | P1 (K-1) | 1,000-1,500 | dot + arrow on EVERY stroke, legend chip |
| L2 | 4 steps | 150 | ≤ 4 strokes each | P2 | 1,500-3,000 | dot + arrow on every stroke |
| L3 | 5 steps | 110-130 | 3-4 strokes each, ≥ 1 picture whose second stroke starts mid-picture (a stocking's cuff, a kite's tail) | P3 (K-3) | 2,300-3,500 | dot + arrow on every stroke |
Must not change: staircase going down left to right; every stroke starts top or left; no numbers. ⚠ L3 is harder by
stroke count and size only; the budget stays light because the task is the ORDER.

### K-427 trace-and-count (K, K.CC.B.5) · L2 3,458 px, N = 5
| | N counted | size | draw | dash | budget | distractors |
|---|---|---|---|---|---|---|
| L1 | 3, 4 or 5 | 150-200 | 1 | P1 (K-1) | 1,500-3,000 | 1 kind, 1-2 pictures, solid |
| L2 | 5, 6 or 7 | 120-140 | 1 | P2 | 3,000-6,000 | 2 kinds, solid |
| L3 | 8, 9 or 10 | 95-115 | 1-2 | P3 (K-3) | 5,000-9,000 | 2-3 kinds, solid, one of them the same SIZE as the counted kind |
Must not change: ONE counted kind (one drawing key, `flip` allowed), scattered, never in a row, never partly hidden; one
answer box; N never 0; within a level no two copies with the same N side by side in the ladder (use all three values,
e.g. L1 3,5,4,3,5); N ≠ the number of distractor pictures; no distractor of the same category (no swan with ducks).

### K-428 finish-the-picture (K) · L2 2,296 px, 6 pictures
| | N | size | draw | missing part | budget |
|---|---|---|---|---|---|
| L1 | 4 (2 shelves × 2) | 230-280 | 1 | ONE big part, ≥ 35 % of the outline (wheels, roof, ears) | 1,200-1,700 |
| L2 | 6 (2 × 3) | 190-230 | 1 | ONE part, ≥ 20 % | 1,700-3,500 |
| L3 | 8 (2 × 4) | 130-160 | 1-2 | ONE part, 12-20 % (a handle, a beak, a tail), no fragment < 14 px | 2,600-4,000 |
Dash P1 / P2 / P3 (K-1 / K / K-3). Must not change: exactly one NAMEABLE missing part per picture, named in the
instruction's list by kind ("wheels, a spout, ears"), never a left/right half (G1-432); solid rest drawn.
⚠ The instruction lists the parts: it must be re-authored per copy (it is a per-copy string, not a face string).

### K-429 Christmas room (K, winter/Christmas only) · L2 9,722 px
| | small closed shapes | size | draw | dash | budget |
|---|---|---|---|---|---|
| L1 | 5-6 baubles/stars, r ≥ 32 | tree 280-360 | drawn + 1 | P1 (K-1) | 4,500-6,500 |
| L2 | 10-12, r 22-28 | as published | drawn + 1-2 | P2 | 8,000-11,000 |
| L3 | 14-18, r 15-20, ≥ 12 apart | 95-300 | drawn + 2 | P3 (K-3) | 11,000-13,000 |
Must not change: indoors or neutral winter, a tree with round closed baubles each traced all the way round, no religious
figures, no Santa as hero, no snow-only page without Christmas cue.

### K-430 shape picture (K, K.G.A.2) · L2 4,790 px, 13 shapes
| | shapes | sizes | turns | dash | budget |
|---|---|---|---|---|---|
| L1 | 6-8: circle, square, triangle only (≥ 2 circles) | 90-260 | upright only | P1 (K-1) | 2,500-3,600 |
| L2 | 11-14, adds rectangles; ≥ 3 sizes of circle | 45-320 | 1 tilted square, 1 upside-down triangle | P2 | 3,600-7,000 |
| L3 | 16-20, ≥ 3 sizes of each kind, ≥ 3 shapes nested | 30-300 | ≥ 3 turned shapes (tilted square, rotated rectangle, two turned triangles) | P3 (K-3) | 5,500-9,000 |
Must not change: vector shapes only, true geometry (no ovals, no rounded corners), ≥ 12 px between shapes (no shared
edges), the "colour every circle" key, ≥ 2 circles on every page. Pictures vary (rocket, robot, house, train, castle,
owl, boat, bus, truck, giraffe-of-shapes…).

### K-431 summer seaside postcard (K, summer only) · L2 8,512 px
| | long lines | pictures | size | dash | budget |
|---|---|---|---|---|---|
| L1 | horizon + 1 wave, amplitude ≥ 14, wavelength ≥ 90 | 3 | 180-260 | P1 (K-1) | 3,500-6,000 |
| L2 | horizon + 2-3 waves, amp 9, wavelength 60 | 5 | 120-220 | P2 | 7,000-11,000 |
| L3 | horizon + 3 waves, amp 6, wavelength 40, rows ≥ 28 apart | 6-7 | 95-170 | P3 (K-3) | 11,000-13,000 |
Must not change: postcard frame + stamp, lines run edge to edge LEFT TO RIGHT (marker at the left end of each long line),
summer seaside, no text.

### K-432 big-middle-small (K) · L2 9,709 px, 3 rows × 3
| | rows | sizes (wide side) | draw | dash big/mid/small | budget |
|---|---|---|---|---|---|
| L1 | 2 rows | 320 / 220 / 150 | 1 | P1 / P1 / P2 | 4,000-7,000 |
| L2 | 3 rows | 290 / 197 / 130 | 1 | P1 / P2 / P3 | 7,000-11,000 |
| L3 | 4 rows (wide drawings, aspect ≥ 2:1) | 300 / 190 / 110 | 1-2 | P2 / P3 / P3 | 10,000-13,000 |
Must not change: SAME drawing three times per row, biggest on the LEFT, three sizes, each row on its own ground; small
copy ≥ 110 at L3 (K-3 floors), ≥ 130 at L1-L2. ⚠ L3 can only use wide drawings (4 rows × 175 px); designers check aspect.

### G1-429 dotted street (G1, P4) · L2 10,589 px
| | N | size | draw | dot pitch | budget |
|---|---|---|---|---|---|
| L1 | 4-5 + 1-2 ground lines | 130-300 | 1-2, no parallel lines closer than 14 px | P4 8 px | 5,500-9,000 |
| L2 | 6-8 + bands | 85-300 | 2 (1 may be 3) | P4 7 px | 9,000-15,000 |
| L3 | 9-11 + bands | 70-280 | 2-3, small details traced | P4 6 px | 12,500-15,000 |
Must not change: dots only, ONE pitch per page, a dense built/peopled place (street, market, harbour, station…);
no two dotted lines closer than 2 × pitch (they fuse, §11); no dashes on the page.

### G1-430 picture-and-word (G1, L.K.1.a) · L2 4,254 px, 4 cards
| | cards | picture size | draw | word length (EVERY locale) | dash | budget |
|---|---|---|---|---|---|---|
| L1 | 4 | 190-210 | 1 | 2-5 letters | P2 (G1-1) | 2,500-3,500 |
| L2 | 4 | 165 | 1 | 2-7 | P3 | 3,500-5,500 |
| L3 | 4 | 150-165 | 1-2 | 4-7, ≥ 2 words with a digraph/double letter in en | P3 | 5,000-7,500 |
Must not change: four pictures, one word each on the school lane, no articles, no spaces/hyphens, a name a 5-year-old
gives in ALL 11 locales (cup/mug, bear/teddy, ship/boat refused). ⚠ Not fully honest: word length is set by the
weakest locale (fi, de), so L1 vs L3 differs per locale; the level is defined by the picture and the LONGEST word across
locales. Designers must check every set against `image-vocabulary.js` ×11 before placing it.

### G1-431 trace-and-draw (G1) · L2 8,452 px
| | traced pictures | size | draw | empty space | dash | budget |
|---|---|---|---|---|---|---|
| L1 | 3-4 + ground | 130-280 | 1-2 | ≥ 260 × 200 | P2 (G1-1) | 4,500-6,800 |
| L2 | 4-6 + ground + sky | 110-280 | 2 | ≥ 160 (as published 295 × 170) | P3 | 7,000-12,000 |
| L3 | 7-9 + ground + sky | 70-240 | 2-3 | ≥ 160 × 140 | P3 | 10,000-15,000 |
Must not change: ONE empty space WITH A REASON (a cart, a basket, a shelf, a nest, an aquarium, a sledge…), nothing in
it, no model, no right answer; the instruction names what goes in ("what the X is carrying/holding").

### G1-432 other-half (G1) · L2 3,362 px, 4 pictures
| | pictures | size | draw | symmetry max | dash (right half) | budget |
|---|---|---|---|---|---|---|
| L1 | book + 2 arches = 3 | 220-330 | 1, outline-led, ≤ 6 lines per half | ≤ 5 px | P2 (G1-1) | 1,800-2,500 |
| L2 | book + 3 arches = 4 | 160-300 | 1 | ≤ 10 px | P3 | 2,500-4,500 |
| L3 | book + 3 arches = 4 | 150-290 | 2, inner details on the dashed half (eyes, stripes, petals) | ≤ 8 px | P3 | 4,000-7,000 |
Must not change: front-view, measured-symmetric drawings (`symmetry.json`), split at the MEASURED axis, the dashed half
is the drawing's own lines; open book + arched mirrors.

### G1-433 hidden animals (G1) · L2 4,053 px, N = 5 always
| | hidden | animal size | scene | halo | dash | budget |
|---|---|---|---|---|---|---|
| L1 | 5 | 120-160 | sparse solid scene, 3-5 solid objects, animals mostly in open ground | 16 px | P2 (G1-1) | 3,000-4,500 |
| L2 | 5 | 85-115 | as published (2 trees + small items) | 10 px | P3 | 3,500-6,000 |
| L3 | 5 | 70-90 | dense solid scene (≥ 10 objects, band 3 trees/rocks/reeds), ≥ 2 animals inside a busy object | 10 px | P3 | 3,500-6,500 |
Must not change: EXACTLY 5 dashed animals = the N printed in the instruction, every dashed thing an animal, each fully
visible, no solid line within the halo, solid scene does not count. The level is figure-ground difficulty, not N.

## 2 Where three levels are not fully honest (say so on the page set, fix nothing by pretending)
- **K-419 first-tracing:** honest but narrow (one picture at every level); differences are outline length and inner
  detail. Acceptable; do not add pictures.
- **K-426 where-to-start:** the budget barely moves (the move is order, not length); harder = more strokes, smaller.
- **G1-430 picture-and-word:** word length cannot be pinned identically in 11 languages; level = picture complexity +
  the longest word across locales. Possible only if designers find 15 four-picture sets whose words fit in all 11.
- **K-424 curls** and **K-422 slanted column:** honest, but the library cannot supply 15 casts of measured spirals /
  slants; expect DRAWN elements and do not accept weak substitutes.
- **G1 L3:** there is no band above G1 in this family (no G2 faces); G1-3 is harder inside the same 15,000 cap.

## 3 Gates the builder adds (per copy, on the render)
`tracedLen` inside the level range and ≥ 25 % under / ≥ 15 % over the face's measured L2 reference for L1 / L3;
`minPic` ≥ the level's minPic; `pictures` = the table's N; level band object used by `classify`; stack 620-740;
face-specific invariant (round, direction mix, symmetry max, counted N, hidden N = 5, one missing part, one empty space,
four cards) asserted exactly as on the published face.
