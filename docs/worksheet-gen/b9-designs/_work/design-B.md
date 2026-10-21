# b9 Picture Tracing — DESIGN B: "playful inventive page templates"

Scene designer B, 2026-10-22. Binding inputs: `_STUDIO-BRIEF.md`, `_work/pedagogy.md` (the contract wins every
conflict), `_SUBSTRATE-POOL.md` (every key below was checked against it, with its grade). Read beside design A; the
critic merges.

**The bet of this direction.** The competitor pages fail because the page has no architecture: clip-art floats on white.
Design B gives every one of the 20 pages a **graphic device**: a porthole, a bookcase of directions, a marble run, a
staircase, a pinboard, an open book with a spine as mirror, a conveyor belt, an aquarium with a label plate, a rocket of
true shapes, a postcard with a stamp, a tractor with an empty trailer. The device is what makes the page recognisable at
thumbnail size and what makes the move obvious **before anyone reads the instruction**. The device is always SOLID
black structure and never part of the guide, so the child's job (grey dashes) and the page's architecture (black) can
never be confused.

---

## 0. The graphic system

### 0.1 Canvas and grid
- Design canvas = the body: **675 × 716 px**, origin top-left, `y` grows down. Every table below is in these px. If the
  shell gives 700-730 px, structure scales in y by `H/716` and drawings keep their size and their `y`-bottom relative
  to the nearest ground/shelf line (stack stays 620-740, house rule).
- **Outer margin 14 px** on all four sides: nothing (guide or structure) is drawn closer than 14 px to the body edge.
- **Module = 12 columns of 53.9 px**, gutter 16. Panel layouts snap to 1/2, 1/3, 2/5 + 3/5 splits of the 647 px live
  width (x 14..661). Rows snap to 1/2, 1/3 of the 702 px live height (y 8..710 — 8 px top because the shell's
  instruction line already gives air above).

### 0.2 The two inks (B&W-safe, never colour)
| layer | look | used for |
|---|---|---|
| **Guide** (what the child traces) | grey, ladder P1-P4 exactly as pedagogy §1 (P1 4 px 14/8 mid-grey · P2 3 px 10/6 · P3 2 px 6/5 darker grey · P4 2.5 px dots every 7 px) | the pictures, vector motifs the child traces |
| **Structure** (page architecture) | solid **black, 2.5 px**, round caps and joins, corner radius 18 (panels) / 10 (small chips) | frames, panels, shelves, belts, book, tank, stamp, rails, badges |
| **Model** (a picture to look at) | the library drawing in its own solid black ink | #3 models, #11 solid parts, #12 left halves, #20 the busy forest, a few room props |
| **Hairline** | solid grey 1 px | only the #12 symmetry axis (dash-dot 8/3/2/3) and the #13 writing-line midline |

Rule of contrast: a guide line and a structure line never run parallel closer than the band gap (28 / 18 / 10), and a
guide never touches structure except where an object stands on a shelf/belt/ground (a T-junction: the structure
passes behind the object, the engine's occlusion stops it at the outline). In #20 that contact is forbidden: there a
**10 px knockout halo** is cut out of every solid line around each dashed animal.

### 0.3 Signature details (the "premium" layer, all solid, all quiet)
- **Corner tabs**: panels carry no text; where a panel needs a cue it is an *icon badge* — a 44 px solid circle with a
  white glyph (arrow ↓ → ↘ for #5; an eye for #3 models; the start-dot sample for #9). Icons are vector, drawn by me,
  language-free, so 11 locales share them.
- **Start dot** (only where pedagogy allows: #2, #9, #6 circles): 13 px solid black disc in a 3 px white ring, plus a
  20 px solid arrowhead 10 px ahead of it along the line's direction. Reads in grey print; no colour needed.
- **Writing line** (#13, #14 box): baseline solid 1.5 px, midline hairline, seated and measured with
  `lib/key-on-row.js` (house rule).
- **No text inside the body** except #13's dotted words. No shadows, no tints, no decoration that could be mistaken for
  a guide (no grey dashes in structure, ever).

### 0.4 Rhythm across the 20 pages (so they differ at thumbnail size)
| family of layout | faces | thumbnail silhouette |
|---|---|---|
| one hero in a device | #2 porthole · #15 rocket | one big round / one tall shape |
| full-bleed scene, horizon | #1 garden path · #7 storm camp · #18 postcard sea · #19 tractor field | landscape bands |
| full-bleed scene, dense | #10 main street (dots) · #20 hidden-animal forest | busy, all-over |
| framed scene / room | #4 fruit stall · #14 aquarium · #17 Christmas window | a big frame, things inside |
| diagonal / zig rhythm | #6 marble run · #9 staircase | a Z or a stair |
| columns / rows | #3 polaroid rows · #5 three direction columns · #16 conveyor belts | stripes |
| bento / grid of cards | #8 tall panel + 4 cells · #11 pinboard 3×2 · #12 open book + 3 mirrors · #13 flash cards 2×2 | tiles |
No two consecutive faces share a layout family, and no layout family repeats its *device* (four grids, four different
devices: bento, pinboard with pins, book spine, flash cards).

### 0.5 Placement notation
Drawings: `x` = ink-box centre, `yb` = ink-box bottom, `h` (or `w` when marked) = ink-box size in body px; `flip` =
mirrored. Widths quoted in brackets are **estimates from the pool's aspect flag**; the builder measures the true ink box
and the stated clearances are the binding numbers (if a measured width breaks a clearance, the picture shrinks, never the
gap). Motifs use the `lib/pt-motifs.js` signatures. Order of every table = back to front.

---

## The 20 faces

### #1 BASE — "The path to the door" · K · scene · P2
**Big idea:** a garden path runs from the child's own edge of the page (bottom) up to the house door, so the eye walks
*into* the picture instead of scanning scattered items — the garden reads as one place with depth.

**Cast**
| key | grade | mode | why |
|---|---|---|---|
| home and nature bw/house(1) | 1 | guide | the destination of the path; long straight runs |
| home and nature bw/tree(2) | 2 | guide | the big round crown balances the house |
| nature bw/flower(2,tall) ×2 (second `flip`) | 2 | guide | frames the path like a gateway |
| nature bw/butterfly(2) | 2 | guide | one sky creature between house and tree |
| animals bw 5/rabbit(2) | 2 | guide | the living thing in the foreground, beside the path |
| vector sun, cloud, ground, pathBand, grass | — | guide | sky + ground, trace perfectly |

**Placement** (6 traced pictures + 4 vector groups)
| # | element | x / params | yb | h | note |
|---|---|---|---|---|---|
| 1 | `cloud` | cx 165, baseY 128, w 190 | — | — | ≥ 40 px from sun and house roof |
| 2 | `sun` | cx 590, cy 82, r 40, rays 10 | — | — | rays end at y 136; tree top 168 → gap 32 |
| 3 | `ground` (horizon, gentle) | x0 14, x1 661, y 470, amp 6, rolls 3 | — | — | passes behind house + tree |
| 4 | house(1) | 205 | 472 | 250 | [w ≈ 240 → 85..325] |
| 5 | tree(2) | 545 | 480 | 312 | [w ≈ 230 → 430..660]; trunk on the horizon |
| 6 | butterfly(2) | 400 | 300 | w 130 | between roof (325) and crown (430): 75 px air each side |
| 7 | `pathBand` | ctrl (338,716)→(300,640)→(250,560)→(215,474), width 120→36 (perspective) | — | — | two dashed edges, door width at the top |
| 8 | flower(2) | 95 | 702 | 170 | left of path mouth |
| 9 | flower(2) flip | 175 | 700 | 150 | step back, smaller = depth |
| 10 | rabbit(2) | 520 | 702 | 150 | right of path; [w ≈ 120] |
| 11 | `grass` ×3 | (420,700,26,3) (610,702,24,3) (40,560,22,3) | — | — | tufts ≥ 18 from any picture |

Guide P2 everywhere. Strokes target ≤ 30 (gate counts; if tree(2) exceeds its share, replace by home and nature
bw/tree_3(2)). No start dots.

**Premium:** the perspective path (wide at the child's edge, narrow at the door) is the single strongest composition
move available — it turns six items into a place. The flowers form a gateway; the sizes step back to front.

---

### #2 My first tracing — "The porthole whale" · PreK · one picture · P1 + one start dot
**Big idea:** one huge whale seen through a ship's round porthole: the frame says "look at this one thing", and the
whale's long smooth outline is the perfect first stroke.

**Cast:** sea life bw/whale(1,wide) — grade 1, guide P1 (inner details ≤ 3 runs; eye solid). Swap list for the same
template (same porthole, the sea becomes night sky or a shop window): Christmas bw/star(1), Easter bw/bell(1),
valentine bw/heart(1) — one per instance, never two.

**Placement**
| # | element | params | note |
|---|---|---|---|
| 1 | porthole ring (structure) | two solid circles, centre (338,360), r 322 and r 308 + 8 solid rivets r 6 at 45° steps on r 315 | fills the body: x 16..660, y 38..682 |
| 2 | sea (structure, solid hairline-weight 2 px, NOT guide) | 2 solid wave rows `waves(60,616,560,70,8)` and `waves(90,586,610,70,8)` clipped to the inner circle | gentle, black, clearly not dashes; ≥ 30 below the whale |
| 3 | 3 solid bubbles | `bubble` (520,170,16) (560,130,10) (590,200,12) | upper right, ≥ 30 from whale |
| 4 | whale(1) | x 330, yb 500, **w 470** [h ≈ 250 → y 250..500] | longest side 470 ≥ 420; corners stay ≥ 30 inside r 308 |
| 5 | start dot + arrow | at the whale's back, 2 o'clock of the body (≈ x 470, y 268), arrow pointing up-left (anticlockwise over the back) | one dot only |

**Premium:** the porthole is a *picture inside a shape*: the page has a hero and a frame, like a book illustration,
where the competitor's single strawberry floats on white.

---

### #3 Look, then trace — "Polaroid and paper" · PreK/K (built K = 3 rows; PreK = rows 1-2 at P1, h 300) · rows · P2
**Big idea:** each row pairs a small *photo* of the animal (a solid model in a polaroid frame — clearly a thing you look
at) with its dashed twin on open paper — the eye goes left to right, from picture to pencil.

**Cast**
| row | key | grade | model mode | twin mode |
|---|---|---|---|---|
| 1 | animals bw 4/chick(1) | 1 | solid model | guide P2 |
| 2 | animals bw 5/penguin(1) | 1 | solid model | guide P2 |
| 3 | animals bw 4/kangaroo(1) | 1 | solid model | guide P2 (the competitor's kangaroo, done properly) |

**Placement** (rows of 234 px)
| row | polaroid frame (structure) | model | eye badge | arrow | twin |
|---|---|---|---|---|---|
| 1 | roundRect(26,18,200,212,r 10), thick bottom bar 26 px | x 126, yb 182, h 136 | 44 px solid circle with eye glyph at (126, 18) overlapping frame top | solid arrow (shaft 46, head 18) from x 258 to 318 at y 120 | x 488, yb 220, h 196 |
| 2 | roundRect(26,252,200,212) | x 126, yb 416, h 136 | (126,252) | y 354 | x 488, yb 454, h 196 |
| 3 | roundRect(26,486,200,212) | x 126, yb 650, h 136 | (126,486) | y 588 | x 488, yb 690, h 196 |
| — | row dividers: solid 1.5 px lines x 26..649 at y 240 and y 474 | | | | |
Models are 70 % of the twin (136 / 196). Twin clearances: ≥ 16 from dividers, ≥ 60 from the arrow.

**Premium:** the polaroid makes "this is a model" a visual fact, not a sentence (pedagogy trap: the child tracing the
model). Same drawing, same orientation, no mirroring.

---

### #4 Trace and colour — "The fruit stall" · K · small scene · P2
**Big idea:** a market stall with a bunting awning and two counters; five fat fruits wait to be traced and then coloured
in any colours — every outline is closed and roomy.

**Cast:** fruits bw/watermelon(1) · fruits bw/apple(1) · fruits bw/pear(2) · fruits bw/lemon(1) · fruits bw/orange(1) —
all guide P2, closed, colour cells ≥ 40 px. Bunting = traced vector (closed triangles: more to colour).

**Placement**
| # | element | params | yb | h |
|---|---|---|---|---|
| 1 | stall posts (structure) | solid verticals x 26 and x 649, y 40..706 | | |
| 2 | awning rail (structure) | solid line x 26..649 at y 40 | | |
| 3 | `bunting` (guide) | x0 40, x1 635, y 46, sag 26, flags 7 | | flags ≈ 70 × 56 |
| 4 | upper counter (structure) | solid board roundRect(40,328,595,12,r 6) | | |
| 5 | lemon(1) | x 200 | 326 | 140 (wide ≈ 190) |
| 6 | orange(1) | x 470 | 326 | 150 |
| 7 | lower counter (structure) | roundRect(40,600,595,14) + front panel roundRect(40,614,595,92) with 3 solid vertical planks | | |
| 8 | watermelon(1) | x 150 | 598 | 140 (wide ≈ 230 → 35..265 → shrink to w 220) |
| 9 | apple(1) | x 352 | 598 | 180 |
| 10 | pear(2) | x 540 | 598 | 205 |
Vertical air: bunting bottom ≈ 126 → upper fruit tops ≥ 176 (gap 50); upper counter 340 → lower fruit tops ≥ 393 (gap 53).
Horizontal air ≥ 28 between fruits.

**Premium:** the stall is a cheerful, culture-neutral place (a market exists in all 11 locales) that gives fruits a
reason to be in a row; the bunting is a second, joyful colouring layer.

---

### #5 Straight-line pictures — "Down, across, slanted" · K (P2; PreK = one picture per column at h 320, P1) · columns · P2
**Big idea:** three columns, each headed by a black badge with ONE arrow — ↓, →, ↘ — and holding two pictures made
mostly of that stroke; the page reads left to right as the stroke ladder.

**Cast** (each must pass the gate's ≥ 80 % straight-length rule; alternates in brackets)
| column | badge | key 1 | key 2 |
|---|---|---|---|
| 1 down | ↓ | tools bw/ladder(1,tall) | furniture bw/wardrobe(1,tall) [furniture bw/cabinet(1)] |
| 2 across | → | furniture bw/table(1,wide) | furniture bw/dresser_2(1) [classroom bw 2/table(1)] |
| 3 slanted | ↘ | Christmas bw/envelope(1) | tools bw/traffic_cone(1) |

**Placement**
| # | element | params |
|---|---|---|
| 1 | column rules (structure) | solid 1.5 px verticals at x 225 and x 450, y 20..700 |
| 2 | badges (structure) | 44 px solid discs with white arrow glyph at (120, 36), (338, 36), (556, 36) |
| 3 | ladder(1) | x 120, yb 400, h 300 [w ≈ 110] |
| 4 | wardrobe(1) | x 120, yb 700, h 260 [w ≈ 130] |
| 5 | table(1) | x 338, yb 300, **w 180** [h ≈ 110] |
| 6 | dresser_2(1) | x 338, yb 690, h 230 [w ≈ 170] |
| 7 | envelope(1) | x 556, yb 260, **w 180** [h ≈ 130] |
| 8 | traffic_cone(1) | x 556, yb 690, h 280 [w ≈ 170] |
Gaps: badge bottom 58 → first picture tops ≥ 100; pictures ≥ 22 from column rules.

**Premium:** the arrows are the lesson; the page is a chart a teacher can point to. Pure page architecture, no clutter.

---

### #6 Round pictures — "The marble run" · K (P2; PreK = top two ramps only, h 300) · diagonal rhythm · P2 + start dot per circle
**Big idea:** three solid ramps zigzag down the page like a marble run, and round things rest on them — the plain ball
first, then balls, a doughnut and an apple; every circle starts at 2 o'clock and goes round anticlockwise like an "o".

**Cast**
| key | grade | mode | why |
|---|---|---|---|
| vector `circle` (the plain ball, r 80) | — | guide | the pure circle warm-up |
| sports bw/beach_ball(1) | 1 | guide | circle + soft curves |
| sports bw/basketball(1) | 1 | guide | circle + arcs |
| sports bw 2/tennis_ball(1) | 1 | guide | circle + one seam curve |
| food bw/donut(1) | 1 | guide | circle inside circle |
| fruits bw/apple_2(1) | 1 | guide | the "nearly circle" with a stalk |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | ramp 1 (structure) | solid 4 px line (24,214)→(651,246) + stopper post at x 651 | | |
| 2 | plain circle | centre (160, 139), r 80 | 219 | 160 |
| 3 | beach_ball(1) | 470 | 236 | 165 |
| 4 | ramp 2 | (651,466)→(24,498) + stopper at x 24 | | |
| 5 | basketball(1) | 500 | 472 | 160 |
| 6 | donut(1) | 190 | 488 | 150 |
| 7 | ramp 3 | (24,698)→(651,706) | | |
| 8 | tennis_ball(1) | 170 | 699 | 150 |
| 9 | apple_2(1) | 470 | 702 | 175 |
| 10 | start dots | one per picture, on the outer circle at 1-2 o'clock, arrow anticlockwise (up-left) | | |
Each object's `yb` equals the ramp height at its `x` (it *rests*); vertical air from the ramp above ≥ 40.

**Premium:** motion without animation: the zigzag ramps make round things look like they could roll, and the zigzag
reading order gives the page energy no grid has.

---

### #7 Zigzag and point pictures — "Storm over the mountain camp" · K · scene · P2
**Big idea:** a camp in the mountains as a storm passes: peaks, a lightning bolt, a tent and fir trees — the whole scene is
made of points, and every point is a place to stop.

**Cast**
| element | source | mode |
|---|---|---|
| mountains | vector `mountains` | guide |
| lightning | travel and holiday bw/lightning(1) | guide |
| tent | travel and holiday bw/tent(2) | guide |
| fir trees ×2 | vector: 3 stacked `triangle`s + `rect` trunk (library style, round joins) | guide |
| cloud | vector `cloud` | guide |

**Placement**
| # | element | params | note |
|---|---|---|---|
| 1 | `cloud` | cx 520, baseY 118, w 210 | right sky |
| 2 | lightning(1) | x 520, yb 300, h 160 | top 140 → gap 22 under cloud; peaks are left only, so nothing behind it |
| 3 | `mountains` | x0 14, x1 400, y 420, h 230, peaks 3 | peaks ≥ 110 apart, inner angles ≥ 50° (gate) |
| 4 | horizon `ground` | x0 14, x1 661, y 420, amp 0 (straight) | passes behind tent and firs |
| 5 | tent(2) | x 190, yb 650, h 190 | [w ≈ 250 → 65..315] |
| 6 | fir A | x 480, yb 670, h 250 (3 triangles 150/120/90 wide) | |
| 7 | fir B | x 605, yb 660, h 200 | gap ≥ 18 from fir A |
| 8 | `grass` ×2 | (360,690,24,3), (40,700,22,3) | |
Points ≥ 40 px apart everywhere; no point narrower than 40°.

**Premium:** a page with weather and a small story (a camp, a storm) instead of "mountains, crown, lightning" in a row;
the empty right sky makes the bolt dramatic.

---

### #8 Loop and spiral pictures — "The curl gallery" · K · bento · P2
**Big idea:** an asymmetric bento: a tall panel for the hero snail, four cells for other curls (lollipop, pretzel, shell,
skipping rope) — curls are small details, so each one gets its own room.

**Cast** (spiral turns must measure ≥ 18 px apart at the placed scale, gated)
| cell | key | grade | mode |
|---|---|---|---|
| hero | animals bw/snail(1) | 1 | guide |
| A | Easter bw/lollipop(1,tall) | 1 | guide (scaled tall so turns ≥ 18) |
| B | food bw/pretzel(1) | 1 | guide |
| C | beach bw/seashell(2) | 2 | guide (only if its whorl measures ≥ 18; else sea life bw 2/snail(2)) |
| D | sports bw 2/jump_rope(1) | 1 | guide |

**Placement**
| # | panel (structure) | content | yb | h |
|---|---|---|---|---|
| 1 | tall panel roundRect(14,8,290,700,r 18) + solid ground line x 34..284 at y 590 | snail(1) x 159 | 588 | w 240 [h ≈ 190] |
| 2 | cell A roundRect(320,8,165,346) | lollipop x 402 | 330 | 300 |
| 3 | cell B roundRect(496,8,165,346) | pretzel x 578 | 260 | w 140 |
| 4 | cell C roundRect(320,362,165,346) | seashell x 402 | 620 | w 140 |
| 5 | cell D roundRect(496,362,165,346) | jump_rope x 578 | 680 | 280 (tall: handles down) |
Under the snail, a solid trail mark (three solid bubbles r 6/8/10) behind it — decoration, not guide.

**Premium:** a gallery hang (one big + four) is the classic editorial layout; it gives the eye a hero and a tour.

---

### #9 Where do I start? — "The staircase" · K · diagonal · P2 + start dot + arrow on every line
**Big idea:** four pictures stand on four steps going down from top-left to bottom-right, so the page itself acts out
the rule: start at the top, go to the left first.

**Cast** (≤ 4 strokes each; every stroke can start top or left)
| step | key | grade | strokes |
|---|---|---|---|
| 1 | sports bw 2/flag(1) | 1 | pole (down) + flag |
| 2 | valentine bw/heart(1) | 1 | one closed outline, dot at the top dip |
| 3 | Christmas bw/stocking(1,tall) | 1 | outline + cuff line (left→right) |
| 4 | Easter bw/bell(1) | 1 | outline + clapper |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | step treads (structure) | solid 3 px lines, each x−82..x+82 at yb+8: y 183, 358, 533, 708 | | |
| 2 | risers (structure) | solid verticals at x 177 (183→358), 337 (358→533), 497 (533→708) | | |
| 3 | flag(1) | 95 | 175 | 150 [w ≤ 120] |
| 4 | heart(1) | 255 | 350 | 150 |
| 5 | stocking(1) | 415 | 525 | 155 |
| 6 | bell(1) | 575 | 700 | 150 |
| 7 | start dots + arrows | 1-2 per picture, on every stroke, per §1 convention | | |
| 8 | legend chip (structure) | top-right roundRect(520,20,128,60,r 30) holding one sample: dot + arrow, solid | | |
| 9 | decoration (structure) | bottom-left: solid `grass` ×3 and one solid `daisy(70,640,18,6,40)` | | |
Clearance: pictures ≥ 20 px from risers (widths ≤ 120 checked), legend chip ≥ 40 from the flag's column.

**Premium:** the stair IS the direction convention; no competitor shows "where to start" except with numbers, which
belong to dot-to-dot.

---

### #10 Trace the dots — "Main Street" · G1 · dense scene · P4 dots (one spacing, 7 px, across the page)
**Big idea:** a lively town street in three bands — buildings, road, pavement — drawn entirely in dots: the busiest,
most precise page of the family.

**Cast** (grade 2-3, all P4)
| key | grade | band |
|---|---|---|
| travel and holiday bw/museum(2) | 2 | buildings |
| home and nature bw/tree_3(2) | 2 | buildings |
| travel and holiday bw/hotel(3) | 3 | buildings |
| vehicles bw 3/fire_truck(2,wide) | 2 | road |
| vehicles bw/bus_2(2,wide) | 2 | road |
| sports bw/bicycle(2,wide) | 2 | pavement |
| animals bw 5/dog_2(2) | 2 | pavement |
| travel and holiday bw/signpost(2) | 2 | pavement |
| vector cloud ×2, kerb lines | — | sky / street |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | `cloud` ×2 | (150,78,150), (560,64,130) | | |
| 2 | museum(2) | 150 | 330 | 200 [w ≈ 230 → 35..265] |
| 3 | tree_3(2) | 345 | 332 | 210 [w ≈ 140 → 275..415] |
| 4 | hotel(3) | 540 | 330 | 250 [w ≈ 210 → 435..645] |
| 5 | back kerb | straight line x 14..661, y 342 | | |
| 6 | fire_truck(2) | 200 | 560 | w 250 [h ≈ 120] |
| 7 | bus_2(2) | 500 | 560 | w 260 [h ≈ 130] |
| 8 | front kerb | straight line x 14..661, y 600 | | |
| 9 | bicycle(2) | 150 | 702 | w 150 |
| 10 | dog_2(2) | 380 | 702 | 90 |
| 11 | signpost(2) | 590 | 706 | 110 |
Dot rhythm: the engine resamples every guide at **7 px in page space** after scaling, so a scaled-down hotel and a full
road line carry the same dot spacing (the pedagogy trap). Clouds ≥ 24 above building tops.

**Premium:** the town is drawn like a children's-book double spread: three deliberate depth bands, vehicles facing
each other, and the dot texture makes it look engraved.

---

### #11 Finish the picture — "The pinboard" · K · grid of cards · P2 on the missing parts only
**Big idea:** six picture cards pinned to a board; each picture is printed solid except the part it is missing — the
wheels, the ears, the handle, the legs — and the child pins the missing part back on with a pencil.

**Cast** (dashed part ≥ 20 % of the outline, ≥ 25 px per fragment)
| card | key | grade | dashed part (region mask) |
|---|---|---|---|
| 1 | vehicles bw/car_2(1,wide) | 1 | both wheels (bottom 30 % band) |
| 2 | animals bw 4/cat(1) | 1 | ears + tail |
| 3 | kitchen bw/teapot(1) | 1 | handle + spout (left + right 25 % bands) |
| 4 | furniture bw/chair(1,tall) | 1 | the legs (bottom 40 %) |
| 5 | Easter bw/bunny(1) | 1 | both long ears (top 45 %) |
| 6 | education bw/umbrella_2(1) | 1 | the handle (bottom 45 %) |

**Placement** (cards 205 × 338)
| # | element | params |
|---|---|---|
| 1 | cards (structure) | roundRect at x 14 / 235 / 456 (w 205), y 14 / 368 (h 334), r 14 |
| 2 | pins (model) | education bw/push_pin(1) solid, h 34, at card top-centre, yb = card top + 18 |
| 3 | pictures | centred in each card, yb = card top + 300, h 210 (wide car: w 180) |
Region masks are drawn per drawing in the face spec (`half` mode); the gate checks dashed length ≥ 20 % and that no
dashed fragment < 25 px.

**Premium:** the pinboard is a teacher's own wall; the cards are generous and calm, and the move ("what is missing?")
is readable from across the room.

---

### #12 The other half — "The open book" · G1 · book spread + mirrors · P3
**Big idea:** a butterfly lies open across the spine of a book: the left page shows its printed half, the right page is
for tracing — the book's spine *is* the line of symmetry. Below, three hand mirrors repeat the idea for smaller
pictures.

**Cast** (front-facing, measured symmetric within 10 px)
| place | key | grade | left half | right half |
|---|---|---|---|---|
| book | Easter bw/butterfly(1) | 1 | solid | guide P3 |
| mirror 1 | animals bw/owl(1) | 1 | solid | guide P3 |
| mirror 2 | Christmas bw/bell(1) | 1 | solid | guide P3 |
| mirror 3 | faces bw/koala(1) | 1 | solid | guide P3 |

**Placement**
| # | element | params |
|---|---|---|
| 1 | open book (structure) | two page outlines with curved tops: left (24,34)→(337,22)→(337,392)→(24,404); right mirrored; spine line x 337.5 from y 22 to 392 drawn as the **axis hairline** (dash-dot), small solid ribbon bookmark at (600,22) |
| 2 | butterfly(1) | x 337.5, yb 360, h 290 [w ≈ 380] — inner page margins ≥ 24 |
| 3 | mirrors (structure) | roundRect at x 18 / 237 / 456, y 420, w 200, h 286, r 100 at top (arched hand-mirror tops) |
| 4 | axes | dash-dot hairline at x 118 / 337 / 556, y 432..694, hidden behind pictures (white fill) |
| 5 | owl(1) | x 118, yb 676, h 210 |
| 6 | bell(1) | x 337, yb 676, h 210 |
| 7 | koala face(1) | x 556, yb 676, h 190 |

**Premium:** the book is the most beautiful metaphor for symmetry a child already knows (fold the page, both sides
match). Visible in grey print, no colour.

---

### #13 Trace the picture, trace its name — "Flash cards" · G1 (K-ready) · 2×2 cards · P3 + dotted letters
**Big idea:** four Montessori-style flash cards: big picture on top, its word on a measured writing line below — a tiny
picture dictionary the child makes.

**Cast** (default set; the native panel swaps per locale under §4: 3-7 letters, no article)
| card | default key | grade | alternates |
|---|---|---|---|
| 1 | nature bw/sun(1) | 1 | nature bw/moon(1) |
| 2 | nature bw/fish(1) | 1 | sports bw 2/soccer_ball(1) (ball) |
| 3 | animals bw 3/frog(1) | 1 | animals bw 3/cat(2) |
| 4 | birds bw/duck(1) | 1 | fruits bw/apple_2(1) if not used elsewhere on that locale's set |

**Placement** (cards 316 × 340)
| # | element | params |
|---|---|---|
| 1 | cards (structure) | roundRect at x 14 / 345 (w 316), y 14 / 370 (h 332), r 18 |
| 2 | picture | centred, yb = card top + 190, h 165 |
| 3 | writing line | baseline at card top + 296, x card+24..card+292 (268 px); midline hairline at baseline − 30; cap height 46 |
| 4 | dotted word | P4 dots, seated on the baseline (key-on-row), letter pitch ≤ 38 px so 7 letters fit 266; start dot per letter; å ä ö æ ø marks solid |
Case per locale: lowercase print (en es pt it nl sv da no fi), de capital initial, fr capitales d'imprimerie.

**Premium:** cards, not rows: each word owns its picture, and the four-up grid is the format teachers cut out and reuse.

---

### #14 Trace and count — "The aquarium" · K · framed scene · P2
**Big idea:** a big aquarium tank with N dashed fish swimming among solid decorations; the answer goes on the brass
label plate fixed to the tank's stand.

**Cast**
| key | grade | mode | role |
|---|---|---|---|
| animals bw 5/fish(1) | 1 | guide P2 | the counted kind (N = 3-10, mirroring allowed) |
| sea life bw/starfish(1) | 1 | solid model | decoy, a clearly different kind, on the sand |
| vector bubbles | — | solid | decoration |

**Placement**
| # | element | params |
|---|---|---|
| 1 | tank (structure) | roundRect(14,26,647,580,r 22); water line solid `waves(30,645,74,60,5)`; sand solid `ground(30,645,590,5,4)` |
| 2 | stand (structure) | solid trapezoid base (60,606)→(615,606)→(595,708)→(80,708) |
| 3 | label plate (structure) | roundRect(238,620,200,80,r 14) inside the stand, holding the answer box roundRect(288,630,100,62) with a seated writing line |
| 4 | starfish (solid) | x 600, yb 588, h 70 |
| 5 | bubbles (solid) | `bubble` (630,140,10) (615,190,7) (640,240,12) |
| 6 | fish slots (w 130 each; flip as marked) | s1 (110,190) · s2 (330,185,flip) · s3 (545,200) · s4 (220,320,flip) · s5 (450,330) · s6 (100,450) · s7 (330,470,flip) · s8 (560,455,flip) · s9 (200,572) · s10 (470,576) |
| 7 | fill order (never a row) | s2, s6, s10, s4, s8, s1, s9, s5, s3, s7 — the first N slots are used |
Every slot keeps ≥ 40 px from its neighbours and ≥ 18 from water line, sand and tank wall.

**Premium:** the label plate is the answer box with a reason to exist; the tank is a picture inside a shape, the fish
are scattered like real fish, and the decoy is a different animal class.

---

### #15 Shape pictures — "The shape rocket" · K · one vector hero · P2
**Big idea:** a rocket on its launch pad, built from 13 true shapes in different sizes and turns, under a sky of a
moon, a planet, a tilted square and a little square — then colour every circle.

**Shapes** (vector, all guide P2; 4 circles)
| # | shape | geometry |
|---|---|---|
| 1 | rectangle (body) | x 270..405, y 200..520 |
| 2 | triangle (nose) | (337,90) (262,200) (413,200) |
| 3 | circle (window) | (337,280) r 42 |
| 4 | circle (small window) | (337,400) r 28 |
| 5 | square (hatch) | x 307..367, y 450..510 |
| 6 | triangle (left fin, right-angled) | (270,420) (270,540) (190,540) |
| 7 | triangle (right fin) | (405,420) (405,540) (485,540) |
| 8 | triangle upside down (flame) | (295,540) (380,540) (337,630) |
| 9 | rectangle (pad) | x 150..525, y 650..690 |
| 10 | square tilted 45° | centre (110,150), side 70 |
| 11 | square upright | x 545..595, y 280..330 |
| 12 | circle (moon) | (560,120) r 55 |
| 13 | circle (planet) | (110,420) r 38 |
| 14 | key chip (structure) | roundRect(26,638,92,64,r 32) with a solid ring circle r 20 filled with diagonal hatch — "this kind" |
Every gap between shapes ≥ 18 px (body–flame 20, fin–flame 25, windows–hatch 22). No ovals, no rounded corners.

**Premium:** a rocket is more exciting than the usual shape house, and the sky shapes deliberately turn and shrink
(K.G.A.2 "regardless of orientation or size") without looking like a worksheet grid.

---

### #16 Big, middle, small — "The shrinking machine" · K (2 rows; see the conflict note) · rows on belts · P1 → P2 → P3
**Big idea:** two conveyor belts carry the same thing past at three sizes — a balloon, then an egg — the biggest first,
the line getting finer as the picture shrinks.

**Cast:** valentine bw 2/balloon(1,tall) (row 1) · Easter bw 2/egg(1) (row 2) — grade 1, ≤ 6 strokes, guides P1/P2/P3 by
size.

**Placement**
| # | element | params / x | yb | h | guide |
|---|---|---|---|---|---|
| 1 | belt 1 (structure) | roundRect(20,320,635,28,r 14) + 6 solid roller circles r 9 inside | | | |
| 2 | balloon big | 115 | 316 | 290 | P1 |
| 3 | balloon middle | 340 | 316 | 200 | P2 |
| 4 | balloon small | 540 | 316 | 130 | P3 |
| 5 | belt 2 | roundRect(20,678,635,28,r 14) + rollers | | | |
| 6 | egg big | 125 | 674 | 260 | P1 |
| 7 | egg middle | 360 | 674 | 180 | P2 |
| 8 | egg small | 545 | 674 | 130 | P3 |
**Conflict flagged to the critic:** pedagogy asks 3 rows at K with the small copy ≥ 130 px — at 100/65/40 % that needs a
325 px big copy, which cannot fit three rows in 716 px. This design keeps the size floor and ships 2 rows at K; PreK
(floor 300) is impossible on this face at three sizes and should be K-only.

**Premium:** a machine makes "the same thing, smaller" obvious and funny; the egg row carries a gentle real-world story
(big egg, middle egg, small egg).

---

### #17 Christmas: small closed shapes — "The Christmas window" · K · room scene, indoors, no snow · P2
**Big idea:** a cosy room on Christmas Eve: the tree with round baubles, gifts under it, two stockings on a shelf, and a
window full of moon and stars — a page full of small shapes that each end where they began.

**Cast**
| element | key / source | grade | mode |
|---|---|---|---|
| tree | Christmas bw/christmas_tree(2) | 2 | guide |
| baubles ×6 | vector circles r 22 + tiny cap rect | — | guide (closed, 44 px) |
| tree-top star | vector `star` r 28 | — | guide |
| gifts ×2 | Christmas bw 2/gift_box(2) (second `flip`) | 2 | guide |
| stockings ×2 | Christmas bw 2/christmas_stocking(2,tall) (second `flip`) | 2 | guide |
| moon + 3 stars in the window | vector `moon`, `star` | — | guide (closed) |
| armchair | furniture bw/armchair_2(1) | 1 | solid model (room prop, not traced) |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | window frame (structure) | roundRect(410,30,240,260,r 14) + solid cross bars x 530, y 160 | | |
| 2 | moon | (470,95) r 32 | | |
| 3 | stars | (590,95) r 26 · (470,225) r 24 · (590,225) r 26 | | |
| 4 | shelf (structure) | solid board roundRect(400,398,250,12,r 6) on two solid brackets | | |
| 5 | stocking ×2 | x 460 and 590 (flip), top hung 6 px under the shelf | 562 | 150 |
| 6 | floor line (structure) | solid x 14..661 at y 704 | | |
| 7 | tree(2) | 190 | 560 | 430 [w ≈ 310 → 35..345] |
| 8 | star (top) | (190,95) r 28 | | |
| 9 | baubles | 6 positions in clear tree interior, each ≥ 18 from the tree's own lines (gate picks from 10 candidates) | | |
| 10 | gift A | 115 | 700 | 110 |
| 11 | gift B flip | 265 | 700 | 85 |
| 12 | armchair_2 (solid) | 540 | 700 | 115 |
Closed small shapes: 6 baubles + 1 top star + moon + 3 window stars = 11 (pedagogy 8-12).

**Premium:** the window divides the page into inside/outside, so the night sky earns its stars without snow (works for
pt-BR's summer Christmas); the room is warm, not a clip-art list.

---

### #18 Summer at the sea — "The postcard" · K · scene in a postcard frame · P2
**Big idea:** a seaside postcard: three long lines cross the whole picture — the horizon and two waves — with a sailboat
riding the first wave and a beach of umbrella, castle, bucket and crab below.

**Cast**
| key | grade | mode |
|---|---|---|
| beach bw/sailboat(1) | 1 | guide, sitting ON wave 1 |
| beach bw/parasol(1) | 1 | guide |
| beach bw/sandcastle(2) | 2 | guide |
| beach bw/bucket(1) | 1 | guide |
| beach bw/crab(2) | 2 | guide |
| beach bw/anchor(1) | 1 | solid model inside the stamp |
| vector sun, horizon, waves, sand line | — | guide |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | postcard frame (structure) | roundRect(14,8,647,700,r 18), inner border 8 px inset (double line) | | |
| 2 | stamp (structure) | scalloped square (ring of solid dots r 3) at x 548..640, y 26..118; anchor inside, h 56 | | |
| 3 | `sun` | cx 110, cy 100, r 44, rays 10 | | |
| 4 | horizon | straight line x 30..645, y 222 (full width inside the card) | | |
| 5 | wave 1 | `waves(30,645,300,60,9)` | | |
| 6 | sailboat(1) | 450 | 298 | 170 |
| 7 | wave 2 | `waves(30,645,380,60,9)` | | |
| 8 | sand line | `ground(30,645,452,8,3)` | | |
| 9 | parasol(1) | 150 | 652 | 230 |
| 10 | sandcastle(2) | 395 | 640 | 165 |
| 11 | bucket(1) | 270 | 700 | 130 |
| 12 | crab(2) | 575 | 692 | w 140 |
Line spacing: horizon→wave 1 = 78, wave 1→wave 2 = 80, wave 2→sand = 72 (all ≥ 28). The boat hull occludes wave 1 (a
T-junction, the wave passes behind); wave 2 is ≥ 40 below the hull.

**Premium:** the postcard + stamp is a "Hello summer" idea done in structure instead of the competitor's bubble letters,
and the full-width lines are a true left-to-right writing-line rehearsal.

---

### #19 Trace it, then add to it — "The empty trailer" · G1 · scene · P3
**Big idea:** a tractor on a country road pulls an empty trailer — the child traces the farm, then draws what the
tractor is carrying today (hay? pumpkins? a friend?) in the trailer's load space.

**Cast**
| element | key / source | grade | mode |
|---|---|---|---|
| tractor | farm bw/tractor(2) | 2 | guide |
| trailer | vector: bed `rect` + 2 wheel circles r 28 + hitch line | — | guide |
| load space | vector dashed roundRect (open, "draw here") | — | guide |
| pig | farm animals bw/pig(2) | 2 | guide |
| goose | birds bw 2/goose(2) | 2 | guide |
| cow | farm bw/cow(2) | 2 | guide |
| sun, cloud, hills horizon, road | vector | — | guide |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | `sun` | cx 90, cy 78, r 38, rays 10 | | |
| 2 | `cloud` | cx 450, baseY 120, w 200 | | |
| 3 | horizon (hills) | `ground(14,661,272,14,2)` | | |
| 4 | tractor(2) | 168 | 560 | 175 [w ≈ 230 → 53..283] |
| 5 | hitch | line (283,505)→(305,505) | | |
| 6 | trailer bed | rect x 305..600, y 470..520; wheels (365,530) r 28, (540,530) r 28 | | |
| 7 | load space | dashed roundRect(318,292,270,162,r 12) — interior 250 × 150, ≥ 18 above the bed, ≥ 20 below the horizon | | |
| 8 | road | straight line x 14..661, y 566 (passes behind the animals) | | |
| 9 | pig(2) | 120 | 700 | 115 |
| 10 | goose(2) | 335 | 704 | 130 |
| 11 | cow(2) | 555 | 702 | 140 |
**Note for the critic:** the load space is 270 × 162 outer (the pedagogy floor is ≈ 160 × 160); if the gate wants a
strict 160 px inner height, the horizon moves up to y 252 and the space grows to 182.

**Premium:** the empty space has a *reason* (an empty trailer begs a load), so the open-ended task is a story prompt,
not an empty box.

---

### #20 Find and trace the hidden animals — "The busy forest" · G1 · solid busy scene + P3 animals · N = 5
**Big idea:** a dense, fully solid autumn forest (two big trees, a winding path, mushrooms, falling leaves) hides five
dashed animals in natural places — find them, then trace them.

**Cast**
| key | grade | mode |
|---|---|---|
| nature bw/tree(3) | 3 | solid |
| nature bw/tree_2(3) | 3 | solid |
| vector pathBand, ground | — | solid |
| Easter bw/mushroom(1) | 1 | solid |
| vegetables bw 2/mushroom(1) | 1 | solid |
| nature bw/leaf(1) ×5 (flips) | 1 | solid |
| animals bw 5/owl(1) | 1 | **guide P3** (hidden 1) |
| animals bw/squirrel(2) | 2 | **guide P3** (hidden 2) |
| animals bw 5/fox(2) | 2 | **guide P3** (hidden 3) |
| animals bw 2/rabbit(2,tall) | 2 | **guide P3** (hidden 4) |
| animals bw 3/mouse(2) | 2 | **guide P3** (hidden 5) |

**Placement**
| # | element | params / x | yb | h |
|---|---|---|---|---|
| 1 | tree(3) solid | 145 | 560 | 520 [w ≈ 250 → 20..270] |
| 2 | tree_2(3) solid | 540 | 540 | 490 [w ≈ 240 → 420..660] |
| 3 | ground solid | `ground(14,661,560,6,3)` | | |
| 4 | path solid | `pathBand` (338,716)→(330,640)→(360,600)→(338,560), width 110→40 | | |
| 5 | leaves solid | (300,120) h 40 · (370,210) h 36 flip · (60,610) h 40 · (470,650) h 38 flip · (620,600) h 34 | | |
| 6 | mushroom solid | Easter bw/mushroom x 250, yb 690, h 70 · vegetables bw 2/mushroom x 640, yb 702, h 60 | | |
| 7 | owl (dashed) | 545 | 270 | 100 — sits in tree_2's crown |
| 8 | squirrel (dashed) | 150 | 330 | 100 — in tree's crown, on a branch |
| 9 | fox (dashed) | 470 | 612 | 105 [w ≈ 130] — beside the path |
| 10 | rabbit (dashed) | 105 | 700 | 115 |
| 11 | mouse (dashed) | 560 | 702 | 65 [w ≈ 95, longest ≥ 80] |
| 12 | knockout halos | every solid line stops 10 px short of each dashed animal (white halo) | | |
The gate counts dashed drawings on the rendered page = 5 = N in the instruction; animals never touch solid lines (halo).

**Premium:** this is the only page where solid ink dominates — a dense woodcut-like forest — so it reads instantly as a
different game; the halos keep every animal fully readable while the forest stays busy.

---

## Summary — the 20 page ideas
1 the garden path to the door · 2 the porthole whale · 3 polaroid and paper · 4 the fruit stall · 5 three direction
columns (↓ → ↘) · 6 the marble run of round things · 7 storm over the mountain camp · 8 the curl gallery (bento) ·
9 the staircase of start dots · 10 Main Street in dots · 11 the pinboard of missing parts · 12 the open book (spine =
mirror) · 13 picture-dictionary flash cards · 14 the aquarium with a label plate · 15 the shape rocket · 16 the
shrinking machine (conveyor belts) · 17 the Christmas window room · 18 the seaside postcard · 19 the empty trailer ·
20 the busy forest with 5 hidden animals.

## Open points for the critic
- #16: three rows at K are impossible with a 130 px floor (shipped 2 rows; PreK not possible at 3 sizes).
- #19: load space height vs the 160 px floor (fix ready: horizon to y 252).
- #8 seashell(2) and #17 christmas_tree(2): keep only if the gate measures their inner details within the K gap; the
  alternates are named.
- Widths in brackets are estimates; clearances are binding, sizes yield.
- Drawing reuse: no key is the main picture twice; apple(1), apple_2(1), fish keys, owl keys, rabbit keys are all
  different drawings across faces.
