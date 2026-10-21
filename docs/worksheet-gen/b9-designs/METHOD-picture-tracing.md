# METHOD — Picture Tracing (`picture-tracing`): the template for every future tracing expansion

The operator's /goal of 2026-10-21: a flagship "Picture Tracing" type, 20 top-quality pedagogically meaningful variations,
PDF only, original scenes that are not alike, built from the image library's **black-and-white** drawings (elements the
library lacks drawn in its style), perfectly native in 11 languages, every page read before publishing, strong SEO
(≥ 500 clicks/day from 220 pages), and **the method documented in detail as the template for future expansions**. This
file is that record. It is written as the work is done; sections marked (pending) are completed at close.

Companions: `_PANEL-FINDINGS.md` (the lock, harvested heads ×11, click model) · `_STUDIO-BRIEF.md` (the studio inputs) ·
`_work/pedagogy.md` (the pedagogy contract) · `_work/design-A.md`, `_work/design-B.md` (the two scene designs) ·
`K-418-picture-tracing.md` (the FINAL design contract, the critic's merge) · `_SUBSTRATE-POOL.md` (the traceable pool).

## 1 What a page is
A picture page in the site's worksheet shell (title, one instruction line, the body, the footer) whose body (675 ×
~716 px) is ONE composed scene or ONE graphic device holding pictures. The pictures are the image library's own B&W
drawings redrawn as **tracing guides that lie exactly on their own lines** (§3), plus scene elements drawn as vectors in
the library's style (§4). Things in front hide things behind them, as in a real drawing. PDF only: no screen, no answer
key, and no title, meta or landing text may promise either.

## 2 Where the art comes from
- **Library B&W drawings only** (`cache/themes/<theme> bw*/<noun>@3x.webp`; the B&W theme is the one whose cache name ends
  in `bw` with an optional number — the localized marker rule of §20.5 applies to the image library's display names, the
  cache uses EN names). 1,325 drawings; 1,288 traceable (`data/pt/index.json`).
- **The traceability index** (`tools/pt-trace-all.js`, 90 s for the whole library): per drawing the stroke width, the number
  of traced lines, the share of short lines (fur, hatching), the guide length per ink diagonal ("density"), and the two
  tracer laws. Grade (1) PreK-simple = density ≤ 9, short share ≤ 25 %, ≤ 30 lines; (2) K = density ≤ 15, ≤ 40 %, ≤ 70
  lines; (3) G1 = density ≤ 24; otherwise refused. Measured 2026-10-22 (first pass): 518 / 582 / 188 / 37 refused.
- **The human read:** `tools/pt-sheet.js --band=P1 [--orig]` renders contact sheets of the TRACED drawings (with the
  source beside them on `--orig`). A word list cannot see a picture: every drawing a page uses is read on a sheet first.
- **The symmetry index** (`tools/pt-symmetry.js` → `data/pt/symmetry.json`): for the best vertical axis, the p95 / max
  distance between each half's skeleton and the other half's mirror — the "other half" face may only use drawings that are
  truly symmetric (p95 ≤ 0.005 of the ink width and max ≤ the G1 gap at print size).

## 3 The tracer (`lib/pt-trace.js`) — a guide that IS the drawing
The rule bought on How to Draw (2026-10-13: "a fitted shape can never match a drawing that wasn't built from shapes"):
the guide is taken FROM the drawing's ink, so nothing is ever left to erase. Per drawing (≈ 0.2 s at 800 px work size):
1. **Ink mask** (`cbn-lineart.inkMask`, luminance < 150) at the work size; specks < 6 px removed.
2. **Solid parts** (pupils, nose dots, filled shapes) stay SOLID so a face still reads as a face. A solid part is a deep
   CORE (distance-transform depth > 1.75 × the half stroke) that is (a) compact (area / circle-of-its-max-dimension ≥ 0.3:
   a thick outline is deep along its whole length and is a ribbon, not a blob) and (b) at least 1.7 × deeper than the
   THICKER lines around it (the 80th percentile of the skeleton depth in an annulus): a junction of two thick lines is deep
   too, but only as deep as those lines. Grown back by its own depth to the solid region it belongs to.
3. **Zhang-Suen thinning** of the remaining line ink → a 1-px skeleton.
4. **Redundant pixels removed** (`cleanCorners`): a pixel that is not a line end and whose neighbours form ONE 8-connected
   group goes, repeated until stable. ⚠ Zhang-Suen leaves staircase corners and 2-px-thick spots whose pixels have three
   neighbours without being junctions; counting neighbours chopped every line into 7-px edges, which pruning then deleted
   (the giraffe's smile vanished). After the clean-up: end = 1 neighbour, line = 2 groups, junction = ≥ 3 groups.
5. **The skeleton as a graph**: nodes = ends and junction clusters; edges walked pixel by pixel; a walk that runs out on a
   used pixel gets its OWN free end (⚠ a shared pseudo-node id chained every such walk into one path: straight jumps across
   the picture); pure loops (an eye ring) found separately.
6. **Spurs pruned** (a free-ended edge shorter than 1.6 stroke widths), repeated until stable.
7. **Chaining** through junctions where the tangent continues (≤ 40°), always orienting the appended edge by GEOMETRY (the
   end nearest the tail) and refusing a join with a gap over 3 px (⚠ orienting by node id appended the far end of a
   self-loop: a straight line through the chick's body).
8. **Gap repair**: skeleton pixels no chain passes within 2 px of are traced on their own and spliced onto the chain whose
   end they touch (⚠ a walk corner case left 30 px of the whale's head outline untraced).
9. **Simplify + smooth**: Ramer-Douglas-Peucker (ε 0.7 px) then two Chaikin rounds. ⚠ RDP on a CLOSED ring measures
   every distance against a zero-length chord and collapses the ring to a point (it happened twice: the giraffe's spots and
   the vector cloud) — `rdpRing` simplifies the two halves split at the farthest vertex.
10. **The body** (`cbn-lineart.silhouette`): everything not reachable from the border through paper — what the drawing
    hides of things behind it.

**The two tracer laws** (`lib/pt-verify.js`, measured on rasters, independent of how the guide was made):
- **law a — nothing to erase**: ≤ 2 % of the guide's centre line lies off the source ink grown by 0.6 stroke widths.
- **law b — nothing left out**: ≤ 2 % of the source skeleton farther than one stroke width from any guide or solid part,
  AND every connected stroke longer than 3 stroke widths ≥ 85 % covered. ⚠ The share alone is blind to a lost smile
  (60 of 8,281 skeleton pixels): the per-stroke law is what catches an isolated mark.
- Gate: `qa/verify-b9-tracer.js` — 12 drawings + poisons P0 control (must pass) · P1 drop the longest stroke · P2 drop the
  most isolated short stroke (caught ONLY by the per-stroke law) · P3 shift the guide 6 px · P4 a spur off the ink.
  ⚠ A poison that drops a stroke lying within reach of a neighbour is not a defect at all — the law rightly sees it
  covered; pick the isolated one.
- Debug views: `tools/pt-coverage.js "<theme>/<noun>"` (grey ink, blue covered, red untraced, green off-ink guide) and
  `tools/pt-paths.js` (every path in its own colour, a dot at its start).

## 4 The renderer (`lib/pt-render.js`) and the band rules
- **Placement by INK box** (`placeTrace`): x = centre, y = bottom (or centre), h or w = the ink box size in page px, flip;
  the polylines are transformed into page px BEFORE dashing, so every picture on a page has the same dash rhythm whatever
  its scale (an SVG transform would scale the dashes too).
- **The guide ladder** (pedagogy §1): P1 4 px · 14 on / 8 off · #7a7a7a (PreK) — P2 3 px · 10 / 6 (K) — P3 2.1 px · 6 / 5
  · darker (G1) — P4 dots 2.6 px every 7 px. Every line's dash rhythm is ALIGNED to its own length (an open line starts and
  ends on a dash; a closed line is a whole number of periods): no stub, no gap at a line end.
- **The band rules** (`classify`, pedagogy §1): a line shorter than the band's shortest traced segment (PreK 50 · K 25 ·
  G1 12 px), or a short detail (< 2.5 × that) running closer than the band's gap (28 / 18 / 10 px) to a longer line for
  most of its length, prints SOLID in ink — eyelashes, whiskers, fur ticks, a window's inner frame. Repeated parts get ONE
  treatment: (a) length siblings (sorted by length, consecutive ratio ≤ 1.3, span ≤ 1.7, or 2.2 for short details), a
  group of ≥ 3 takes its majority, a pair goes to TRACE on a tie; (b) parallel families (≤ 20° apart, lengths within 3×,
  midpoints within 4 gaps); (c) mirror pairs (a line whose mirror image about the picture's centre lands on one of similar
  length). ⚠ Each rule was bought by a render: half the sun's rays solid, three window panes solid and one dashed, one
  inner ear solid, three belly stripes solid and five dashed.
- **Render modes**: `guide` · `model` (the ORIGINAL library drawing, from `cache/themes-512`, placed by the same ink box) ·
  `solid` (the traced lines in ink) · `half` (left of a split x solid, right dashed — the other-half face) · `part` (WHOLE
  lines with ≥ 60 % of their points inside a region of the ink box are dashed, the rest solid — the finish-the-picture face;
  ⚠ cutting at the region edge made half a door frame dashed).
- **Start markers** (`orient` + `startMarker`): a solid dot at the line's start and a small arrow BESIDE the line (never on
  it); open line → the top end (the left end when nearly flat); closed line → near 2 o'clock, anticlockwise (the start of
  c / o in every school script of the 11 locales). ⚠ On a complex drawing "every line" clutters into a knot of dots:
  markers are only for few-stroke pictures (≤ 4 strokes, pedagogy #9).

## 5 Motifs and the composer (`lib/pt-motifs.js`, `lib/pt-scene.js`)
- **Motifs** (page px polylines, so they trace exactly by construction): ground, hill, sun, cloud, grass, daisy, waves,
  drop, snowflake, star, moon, rainbow, mountains, fence, roundRect, bubble, pathBand, string, bunting, exact shapes.
  ⚠ A cloud drawn as overlapping arcs showed every arc inside the cloud: puffy shapes are a **union of circles**
  (`blobUnion`: rasterised at 2×, one outline by marching squares, smoothed).
- **Occlusion**: elements back to front (motifs, then items; `z` reorders); front to back, every element's lines are cut
  where they run under the union of the bodies of everything in front of it; a closed motif with `hides` hides too; an item
  with `halo: N` hides everything behind it N px beyond its body (the hidden-animals face: no solid line touches a dashed
  animal). Structure lines (`decor`: a motif drawn solid or raw path data, fill / dash / width) pass BEHIND what stands on
  them unless `front`.
- **Measurements** stamped on the scene SVG (`data-lcs-pt-metrics`) and asserted by the type's `verify()`: traced strokes,
  **traced length** (the effort budget: PreK ≤ 4,500 · K ≤ 11,000 · G1 ≤ 15,000 px — ⚠ the pedagogy table's stroke caps of
  12 / 30 / 50 were unreachable: a grade-1 drawing alone has a median of 15 traced lines), the solid share, the smallest
  traced picture (PreK 300 · K 130 · G1 80 px), the closest two separate pictures, the vertical extent (the page fills its
  body), no text in the body except the word face.

## 6 The twenty faces (mode → id, band, the move, the scene)
Scenes live in `scripts/worksheet-gen/data/b9/face-scenes.js` (keyed by mode; every placement, size and render mode, with
the reason for every fix as a comment). Each face is ONE fixed composition — no seed, no theme pin: the same picture in
all eleven locales, only the text changes. Band → style + limits from `BANDS` (§4).

| id | mode | band | the move it teaches | the scene |
|---|---|---|---|---|
| K-418 | base | K | trace every line of a whole scene | a cottage, a garden path, a tree, a butterfly, two tulips, a rabbit, sun + cloud |
| K-419 | first-tracing | PreK | one big continuous outline, P1 | one big whale in a porthole, bubbles, waves |
| K-420 | look-then-trace | PreK | solid model → dashed copy | two framed models (penguin, kangaroo), arrow, the dashed copy beside each |
| K-421 | round-and-round | PreK | closed curves started at 2 o'clock, anticlockwise (o) | beach ball, doughnut, apple on three ramps, outline-only |
| K-422 | straight-lines | K | down / across / slanted in separate columns | wardrobe + cabinet ↓ · whiteboard + dresser → · envelope + star ↘ (direction measured) |
| K-423 | zigzags | K | stop at every tip | zigzag mountains, firs, a tent, storm cloud with lightning, moon + star |
| K-424 | curls | K | spirals and loops | a gallery of five frames: snail, lollipop, bow, pretzel, pinwheel |
| K-425 | trace-and-color | K | trace, then colour inside the lines | a picnic: tree, bird, sun, cloud, blanket with banana, cup, pear, lemon |
| K-426 | where-to-start | K | start dot + arrow on every picture | a staircase of few-stroke pictures (flag, heart, stocking, bell) — designed strokes |
| K-427 | trace-and-count | K | trace, count, write the number (K.CC.B.5) | five ducks on a pond, a box for the number; solid frog/turtle/tree as distractors |
| K-428 | finish-the-picture | K | closure: only the missing part is dashed | a mending shelf: car wheels, teapot spout, umbrella + cup handles, top's point, bunny's ears |
| K-429 | christmas | K | a seasonal room; close every small ring | tree in a pot, baubles + stars, gifts, armchair, window, round rug |
| K-430 | shape-picture | K | circles / squares / triangles in a picture (K.G.A.2) | a rocket of shapes + loose shapes in the sky, colour-every-circle cue |
| K-431 | summer-sea | K | long waves left to right | a postcard: three wave rows, sailboat, parasol, sandcastle, crab, bucket, stamp |
| K-432 | big-middle-small | K | the same picture at three sizes | planes, cars, ships in three rows, big → small |
| G1-429 | dotted-street | G1 | precision with dots (P4), small details | a morning in town: two buildings, signpost, dog, bus, car, sun, cloud |
| G1-430 | picture-and-word | G1 | picture → its name → trace the word | sun, fish, cat, apple; the word on a writing lane in school-print case |
| G1-431 | trace-and-draw | G1 | trace, then draw (creative completion) | a farm road, tractor + EMPTY trailer, animals on their meadow |
| G1-432 | other-half | G1 | symmetry: trace the dashed half | a butterfly in an open book + owl, trophy, koala in three mirrors (axis measured) |
| G1-433 | hidden-animals | G1 | figure-ground: find 5, trace them | a forest drawn solid; five dashed animals with a halo so no solid line touches them |

Pins that were MEASURED, not chosen: K-422's six pictures by `tools/pt-straight.js directionMix` (each ≥ 59 % in its own
column's direction); G1-432's three halves by `data/pt/symmetry.json` (max 1.3 px between halves); every picture's size by
its band floor and the page budget.

## 7 Native text
Per face three strings (title ≤ 70, printTitle ≤ 40, instruction ≤ 130 — `data/b9/picture-tracing.js validateBank`) plus
the F17 `words` (four 2-7-letter picture names in school-print case: de capital initial, fr CAPITALS, the rest lowercase).
- **One native panel per locale** (`_work/panel-brief.md`) writes the strings AND the 20 landings in one run, from the
  renders, and audits the English source first. ≤ 2 panels in flight. Pipeline per locale, one at a time:
  `b9-draft-from-panel.js <loc> <panel.json>` → `validate-b9-draft.js <loc>` (builds all 20 in a fresh process) →
  `apply-b9-locale.js <loc>` → `check-b9-string-parity.js <loc>` (0) → `gen-b9-waves.js --locales=<loc>` →
  `i18n/lint-locale.js <loc>` → `b9-render-all.js <loc>` and READ the sheet.
- ⭐⭐ **The English source is the locale nobody reads.** The de + fr panels found 14 claims in the EN strings and landings
  that the renders did not support (a named picture that was not there, "a handle" where two are dashed, a title only
  half the band). Every one was fixed at the source (scenes and EN strings), the specs regenerated with
  `gen-b9var-specs.js --overwrite`, and both panels re-ran on the corrected pages. Run the first two panels, fix the
  source, THEN fan out — never the other way round.
- ⚠ `resolveStrings` reads `i18n/strings.<loc>.json` before the spec, so a field the type wants (here `printTitle`) must be
  carried by `i18n/build-en.js` too, or EN silently falls back to the spec's old text.

## 8 Gates (all run before publish)
- `qa/verify-b9-tracer.js` — the tracer laws on 17 hand-picked drawings + poisons (§3).
- `qa/verify-b9-picture-tracing.js` — the family gate, 37 assertions: per face G1-G12 (budget, band floors, solid share,
  start markers only where asked, the word face's lanes, the hidden-animals halo, the other-half axis, F11's dashed part
  ≥ 75 px AND ≥ 5 % of the outline — the contract's invented "20 %" failed a correct page) and poisons P0-P14, each must fail.
- `types/*/K-4xx…verify()` — the metrics stamped on each scene (§5), so a regenerated page cannot drift silently.
- `tools/b9-render-all.js <loc>` — every page through the real shell, "all clean" = no overflow, no lint finding
  (`qa/lints.js` exempts `svg[data-lcs-prim="pt-scene"]` from the palette lint: the guide grey is the design).
- `tools/check-b9-zips.js <loc>` — the pooled ZIPs: 20 per locale, title ≤ 70, description 120-170, the deck slug =
  `picture-tracing-<id>` (wave flag `unitInSlug:false`), PDF only (no answer key, no deck screen), distinct thumbnails.
- `tools/check-b9-string-parity.js --all` (0) and `tools/check-b9-landing-draft.js <loc> <file>` + `seo-landing/gate.js`.

## 9 The human read and the review rounds
- I read every EN page full size after each engine change, and the contact sheet of EVERY locale after apply. The
  renders found what no gate could: a table drawn as an oval, a duplicate cloud, ripples crossing ducks, a teapot flipped
  for its spout, words printed too pale, solid black blobs in the forest.
- The two first native panels read the pages as a teacher would and found the picture-recognition defects a word review
  cannot see: an orange that reads as a tomato, a watermelon as a pumpkin, a heart balloon that is not round, a ladder
  that leans (so it is not "down"), a classroom table in perspective (so it is not "across"), a bell in three-quarter view
  (so it has no mirror half), a box that reads as a crate under a tree. ⚠ **The fix for a misread picture is a different
  picture, chosen by measurement** (direction mix, symmetry index), never a longer instruction.
- Then ONE native + pedagogy reviewer over a compact 11-locale text dump and ONE visual reviewer over the EN sheets.

## 10 SEO (pending)
## 11 Traps paid for (pending — collected from §2-§5 and the build)
## 12 Publish, as run (pending)
## 13 How to expand (pending)
