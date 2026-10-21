# b9 Picture Tracing — SCENE DESIGNER A ("storybook places") — the 20 faces

Body box: **W = 675, H = 716** (all numbers in page px; if the shell body is taller, every y scales by H/716 and the
foreground band stretches — never the sky). Margin 4 px: every box stays inside x 4-671, y 4-712.
Placement convention = the engine's: library item `x` = ink-box centre, `y` = ink-box BOTTOM, `h` (or `w`) = ink size;
the other side = h × aspect from `data/pt/index.json` (aspect = w/h, quoted per item). Motif signatures are those in
`lib/pt-motifs.js` (`shapes.*` take a centre; `M.line(pts, closed)` draws an exact polyline/polygon — used for the
isosceles tree, the rotated square and the upside-down triangles, so no new motif is needed).
Render codes: **G** guide (dashed/dotted per the page style) · **M** model (original drawing, solid) · **S** traced lines
solid · **H/part** solid except a named region dashed · **D** decor = a motif drawn solid (chrome / scenery, not traced).
Every key below was checked against `_SUBSTRATE-POOL.md` (theme/noun and grade) and against the index (aspect, raw path
count). Each library drawing appears in at most two faces and is never the hero twice (checked, §Z).

---

## 0. Art direction (applies to all 20)

1. **One place, one moment, one hero.** Every S page answers "where are we, and what is happening right now?" in one
   look (the cat waits on the path; the storm is coming over the mountains; the snail visits the sweet stall). One hero
   picture carries the page (the biggest, most-detailed drawing), sitting on a third: x ≈ 225 or 450, never dead centre
   unless the page is symmetric by meaning (#12 fold line, #15 robot, #2 single picture).
2. **Three depth bands.** Sky / background (y 0 → horizon), middle ground (the horizon line and what stands on it),
   foreground (y ≈ 560-712: the nearest and therefore biggest small things). Horizon height by mood: **low-middle
   (y 425-475, ≈ 0.6 H)** for land scenes so things stand on the ground and the sky stays a frame, not a hole; **high
   (y ≈ 300)** for the sea (#18) and the farm (#19) so the water / fields get the weight. Sky is filled by things that
   BELONG there (sun, clouds, a star, a moon, lightning) — never by spare clip-art.
3. **Feet on the ground.** Every library drawing in an S page stands on a line (ground, floor, shelf, counter, kerb,
   wave crest, blanket). Ground lines pass BEHIND objects (the engine's occlusion cuts them); nothing floats unless it
   flies (butterfly, airplane, balloon, bubbles) or hangs (cards on a line).
4. **Sizes that make sense, bent by depth, not by accident.** Near = big: the butterfly in #1 is big because it is in
   the foreground, not because the pedagogy floor says ≥ 130. Where a floor forces a size, I move the object to the
   foreground band so the scale reads as perspective.
5. **Breathing space is designed.** Clear paper ≥ band minimum around every traced picture (PreK 30 / K 16 / G1 10) and
   guide-to-guide ≥ band gap (PreK 28 / K 18 / G1 10) — I quote the tightest gap per face. One calm pocket of white per
   page (the eye rests there); no band of empty paper at the bottom (the foreground always carries weight: the largest
   drawings, grass tufts, a rug, a counter).
6. **Rhythm differs page to page** (operator: "original scenes, not similar"). Thumbnail signatures, all different:
   landscape-with-cottage · single giant picture · three model→copy rows · blanket rectangle · lane icons · rising
   diagonal · zigzag skyline · stall with bunting · cards on two lines · street of buildings · workshop shelves 2×3 ·
   one vertical fold line · flashcards 2×2 · big oval pond · central robot · sky/road/sea stripes · window + tall tree ·
   horizon + waves · fenced empty field · dense solid forest.
7. **Print reality.** Grey/black only; decor (D) prints solid mid-grey at 2 px so it reads as "already drawn" and never
   as a guide; guides keep the ladder of the contract (P1/P2/P3/P4).

---

## Face table at a glance

| # | face | band | style | setting (one line) |
|---|---|---|---|---|
| 1 | BASE trace the garden | K | P2 | A cottage garden in the morning: the cat waits on the path while a butterfly visits the tulips |
| 2 | my first tracing | PreK | P1 | One giant apple on the kitchen table |
| 3 | look, then trace | K | P2 | The art-class pin board: a little photo, an arrow, and the child's copy, three times |
| 4 | trace and colour | K | P2 | A picnic blanket under a big tree: watermelon, a teacup, a pear and an apple |
| 5 | straight lines | K (PreK-able) | P2 | The builder's lanes: down things, across things, slanted things |
| 6 | round and round | K (PreK-able) | P2 | Round things rising like soap bubbles from a beach ball |
| 7 | zigzags | K | P2 | A tent camp under the mountains as a storm comes in |
| 8 | curls and spirals | K | P2 | The fair's sweet stall — and a snail who came to visit |
| 9 | where do I start? | K | P2 + dots/arrows | Five picture postcards pegged on two washing lines |
| 10 | trace the dots | G1 | P4 | Morning in a little town square: museum, hotel, a bus, a dog |
| 11 | finish the picture | K | P2 on parts | The toy-repair workshop: six toys each missing a part |
| 12 | the other half | G1 | P3 | One fold line down the page: butterfly, owl, bell |
| 13 | trace the picture, trace its name | G1 | P3 + dotted letters | Four picture flashcards with their words |
| 14 | trace and count | K | P2 | Ducks on the village pond (frog and turtle watch from the bank) |
| 15 | shape picture | K | P2 vector | A friendly robot built only from true shapes |
| 16 | big, middle, small | K (PreK-able) | P1→P2→P3 | Sky, road and sea: three planes, three cars, three boats |
| 17 | Christmas small closed shapes | K | P2 | The living room on Christmas Eve: the tree, the window, the gifts |
| 18 | summer sea, lines across | K | P2 | A sailing day: horizon, two waves, a boat, the beach |
| 19 | trace it, then add to it | G1 | P3 | The farm with one empty paddock — who lives there? |
| 20 | find the hidden animals | G1 | M scene + P3 | A busy autumn forest where five animals hide |

---

## #1 BASE — Trace the garden · K · S · P2

**Setting / story.** A cottage garden on a sunny morning. A path winds from the cottage door down to us; the cat sits on
the path waiting for someone to come home; a butterfly has come close to look at the tulips. The child traces the
garden into being, picture by picture, and the finished page is a place you could walk into.

**Cast (pool key · grade · aspect · render · why)**
| item | key | gr | asp | render | why |
|---|---|---|---|---|---|
| cottage (hero) | `home and nature bw/house` | 1 | 1.061 | G | the universal child's house: square, pitched roof, door, two windows |
| tree | `home and nature bw/tree_3` | 2 | 0.771 | G | round crown + trunk, reads as "tree" everywhere (deciduous, not a palm/fir) |
| tulip ×2 | `Easter bw/tulip` (2nd flipped) | 1 | 0.52 | G | the simplest flower outline; tulips grow in all 11 markets |
| tall flower | `home bw 2/flower` | 1 | 0.415 | G | a different flower so the bed is not a copy-paste |
| cat | `animals bw 4/cat` | 1 | 0.908 | G | sitting cat, front-ish, big closed shapes |
| butterfly | `nature bw/butterfly` | 2 | 1.486 | G | foreground visitor, the "bird or butterfly" of the contract |

**Placement (back → front)**
| element | x | y(bottom) | h / w | box (x0-x1, y0-y1) | note |
|---|---|---|---|---|---|
| sun `sun(95,75,34,8,false)` G | — | — | r 34 | 39-151, 19-131 | upper-left third; no face (K) |
| cloud `cloud(315,105,150)` G | — | — | w 150 | 240-390, 42-105 | gap to sun 89 |
| cloud `cloud(560,100,140)` G | — | — | w 140 | 490-630, 41-100 | gap to tree top 40 |
| ground `ground(6,669,472,4,3)` G | — | — | — | y 468-476 | horizon ≈ 0.66 H; passes behind house + tree |
| path `pathBand([[218,470],[262,540],[232,615],[285,712]],64)` G | — | — | — | — | widens toward us (perspective built into the motif) |
| cottage | 200 | 470 | h 290 | 46-354, 180-470 | hero on the left third |
| tree | 535 | 470 | h 330 | 408-662, 140-470 | gap to cottage 54 |
| tulip | 70 | 640 | h 150 | 31-109, 490-640 | |
| tulip (flip) | 165 | 650 | h 130 | 131-199, 520-650 | gap 22 |
| tall flower | 620 | 640 | h 150 | 589-651, 490-640 | under the tree, gap 20 to tree base |
| cat | 285 | 700 | h 150 | 217-353, 550-700 | sits ON the path (path hidden behind it); gap to tulip 18 |
| butterfly | 480 | 600 | w 150 | 405-555, 499-600 | foreground flyer; gap to tree base 29, to flower 34 |
| grass `grass(40,705,24,3)`, `grass(560,705,26,3)`, `grass(640,695,22,3)` D | | | | | blades < 25 px → solid decor |

Intended overlaps: the ground line behind cottage, tree; the path behind the cat. No other overlap. Tightest guide gap 18.
Traced objects 7 (+ sun + 2 clouds + ground + path).
**Style:** P2, no start dots. Instruction: "Trace all the dashed lines to finish the garden."
**Premium because** it is one coherent place with a path that leads the eye from the door to the child, a story pause
(the cat), and depth — not seven clip-arts on a white sheet.

---

## #2 My first tracing — one big picture · PreK · P · P1 + one start dot

**Setting / story.** One giant shiny apple on the kitchen table, so big it nearly fills the page. The child traces the
whole apple in long, slow lines; the table is already there.

| item | key | gr | asp | render | why |
|---|---|---|---|---|---|
| apple (hero) | `fruits bw/apple` | 1 | 0.834 | G (P1) | 4 raw paths, one big round outline + stem + leaf; the most universal first picture (no religion, no season) |

| element | x | y | h/w | box | note |
|---|---|---|---|---|---|
| apple | 337 | 640 | h 560 | 104-571, 80-640 | longest side 560 (≥ 420) |
| table top `roundRect(30,642,615,18,9)` D | | | | 30-645, 642-660 | the apple stands on it |
| table legs `shapes.rect(70,686,16,52)`, `shapes.rect(605,686,16,52)` D | | | | y 660-712 | grounds the page, fills the foot |
| start dot | on the apple's outer outline at "1-2 o'clock" (≈ x 470, y 200 after placement) + anticlockwise arrow | | | | contract direction rule |

Clear paper round the apple ≥ 33 px (left 100, top 80). Leaf/stem inner runs: if any inner run < 50 px it prints S (solid).
Alternate hero for locale/season variants (same rules, all grade 1, ≤ 5 raw paths): `Christmas bw/star` (asp 0.904),
`Christmas bw/stocking` (asp 0.498, h 600), `valentine bw/heart` (asp 1.062). The base ships the apple.
Instruction: "Start at the dot. Trace the big picture."
**Premium because** the single picture is staged (it sits on a table, there is a world) and sized like a real poster
for a 3-year-old's whole arm, not a 200-px clip-art in the middle of a white page.

---

## #3 Look, then trace · K · P · P2

**Setting / story.** The art-class pin board. On the left of each row a small photo is pinned (the model, solid, in a
rounded card); an arrow points to the open paper on the right, where the child traces the same picture big.

| row | key | gr | asp | model (M) | traced (G) |
|---|---|---|---|---|---|
| 1 | `Easter bw 2/chick` | 1 | 0.746 | x 119, y 198, h 140 (67-171, 58-198) | x 470, y 222, h 200 (395-545, 22-222) |
| 2 | `home bw/teapot` | 1 | 1.194 | x 119, y 420, w 147 (46-193, 297-420) | x 470, y 460, w 210 (365-575, 284-460) |
| 3 | `beach bw/umbrella` | 1 | 1.035 | x 119, y 660, h 140 (47-191, 520-660) | x 470, y 700, h 200 (366-574, 500-700) |

Chrome (all D): model cards `roundRect(24,34,190,180,18)`, `roundRect(24,272,190,180,18)`, `roundRect(24,512,190,180,18)`
with a small solid "pin" `shapes.circle(119,44,7)` (+y offsets 238/478) at each card top; arrows `M.line([[232,y],[300,y]])`
+ chevron `M.line([[288,y-10],[300,y],[288,y+10]])` at y 125 / 365 / 605; row rules `M.line([[24,238],[651,238]])` and
`…478`. The model is 70 % of the trace, solid and framed, so it cannot be mistaken for a guide.
Why these three: chick (round + little points), teapot (a handle and a spout — two parts to notice), umbrella (a big
arc + a hook; "trace the picture of umbrella" is a harvested query). All nameable at a glance in every locale.
Instruction: "Look at the picture. Then trace it."
**Premium because** the board metaphor (pinned photo → arrow → paper) teaches the look-copy loop visually, without a word.

---

## #4 Trace and colour · K · S (small scene) · P2

**Setting / story.** A picnic under a big shady tree on a summer afternoon: a striped-free blanket laid on the grass
with watermelon, a cup of tea, a pear and an apple. Trace everything, then colour the picnic any colours you like.

| item | key | gr | asp | render | box |
|---|---|---|---|---|---|
| tree (hero) | `home and nature bw/tree` | 2 | 0.805 | G | x 140, y 425, h 330 → 7-273, 95-425 |
| watermelon | `fruits bw/watermelon` | 1 | 0.923 | G | x 135, y 645, h 150 → 66-204, 495-645 |
| teacup | `home and nature bw/teacup` | 1 | 1.514 | G | x 298, y 625, w 150 → 223-373, 526-625 |
| pear | `fruits bw/pear` | 2 | 0.644 | G | x 440, y 645, h 150 → 392-488, 495-645 |
| apple | `fruits bw/apple_2` | 1 | 0.842 | G | x 560, y 645, h 130 → 506-615, 515-645 |
| sun `sun(560,90,38,8,false)` | | | | G | 498-622, 28-152 |
| cloud `cloud(380,115,160)` | | | | G | 300-460, 48-115 |
| ground `ground(4,671,425,5,3)` | | | | G | horizon at the tree's foot, behind the tree |
| blanket `roundRect(40,455,595,235,28)` | | | | G | 40-635, 455-690 — the picnic sits ON it (in front of it) |
| grass `grass(…)` ×3 at y 708 | | | | D | foot of the page |

Gaps: blanket top 455 ↔ horizon 430 = 25; item ↔ item ≥ 16 (watermelon-teacup 19, pear-apple 18); items ↔ blanket edge
≥ 20. Every traced outline is CLOSED (the gate checks closure); areas ≥ 40 px across (tree crown, melon rind, cup).
Colour-free: no codes, no numbers, no colour words.
Instruction: "Trace the pictures. Then colour them."
**Premium because** it is a picnic you want to colour (a scene with a reason for every object), with big calm areas,
unlike the competitor's floating food icons.

---

## #5 Straight-line pictures · K (PreK variant = rows 1-2 at P1, 4 pictures) · P · P2

**Setting / story.** "The builder's lanes": three lanes down the page, each led by a round sign showing the stroke —
↓ down, → across, ↘ slanted — with two things built from that stroke standing on the lane's line.

| lane | key | gr | asp | x | y | h/w | box |
|---|---|---|---|---|---|---|---|
| 1 ↓ | `objects bw/ladder` | 1 | 0.45 | 220 | 222 | h 210 | 173-267, 12-222 |
| 1 ↓ | `furniture bw/wardrobe` | 1 | 0.60 | 480 | 222 | h 210 | 417-543, 12-222 |
| 2 → | `furniture bw/table` | 1 | 1.903 | 225 | 455 | w 300 | 75-375, 297-455 |
| 2 → | `furniture bw/cabinet` | 1 | 0.85 | 525 | 455 | h 190 | 444-606, 265-455 |
| 3 ↘ | `Christmas bw/envelope` | 1 | 1.006 | 230 | 690 | h 190 | 134-326, 500-690 |
| 3 ↘ | `tools bw/traffic_cone` | 1 | 0.72 | 490 | 690 | h 200 | 418-562, 490-690 |

Chrome (D): lane lines `M.line([[60,226],[660,226]])`, `…460`, `…694` (each picture stands on its lane line); lane signs
`shapes.circle(34,120,22)`, `(34,360,22)`, `(34,600,22)` each with a solid arrow inside (↓ / → / ↘). Gaps ≥ 69 between
pictures in a lane; lane-to-lane ≥ 43.
Order vertical → horizontal → slanted is the contract's order. **Verify ≥ 80 % straight guide length per picture** (the
gate measures curvature): the envelope's star is the risk — if it pulls the envelope below 80 % swap for
`sports bw 2/flag` (asp 0.903, 13 paths) in lane 3. No cross anywhere (cross excluded).
Instruction: "Trace the straight lines: down, across, and slanted."
**Premium because** the lanes turn a stroke drill into an ordered little lesson the teacher can read at a glance.

---

## #6 Round and round · K (PreK variant: 3 pictures at P1) · P · P2 + start dots on circles

**Setting / story.** A beach ball rests on the floor and round things rise from it like soap bubbles, climbing to the top
right of the page: an orange, a moon, a balloon, and three real bubbles.

| item | key / motif | gr | asp | render | x | y | h/w | box |
|---|---|---|---|---|---|---|---|---|
| beach ball (hero, start) | `sports bw/beach_ball` | 1 | 0.961 | G | 130 | 700 | h 200 | 34-226, 500-700 |
| orange | `fruits bw/orange` | 1 | 0.834 | G | 330 | 600 | h 180 | 255-405, 420-600 |
| balloon | `valentine bw/balloon` | 1 | 0.677 | G | 520 | 470 | h 220 | 446-594, 250-470 |
| moon | `nature bw/moon` | 1 | 0.872 | G | 160 | 330 | h 170 | 86-234, 160-330 |
| bubble | `shapes.circle(400,150,50)` | — | — | G | | | | 350-450, 100-200 |
| bubble | `shapes.circle(600,130,40)` | — | — | G | | | | 560-640, 90-170 |
| bubble | `shapes.circle(250,70,36)` | — | — | G | | | | 214-286, 34-106 |
| bubble | `shapes.circle(560,640,45)` | — | — | G | | | | 515-605, 595-685 |
| floor | `M.line([[20,702],[300,702]])` | | | D | | | | under the ball only |

Bubbles are `shapes.circle`, NOT `bubble()` (its highlight arc sits r×0.38 inside the ring → 15 px < the 18 K gap).
Start dot on every circle and round picture at "1-2 o'clock" + anticlockwise arrow (the c/o start); the moon starts at
its top tip and runs down its outer curve. Tightest gap: balloon-bubble(600) 80; orange-ball 29.
Instruction: "Trace round and round, like the letter o."
**Premium because** the rising diagonal gives a joyful movement through the page — the eye travels the way the pencil goes round.

---

## #7 Zigzag and point pictures · K · S · P2

**Setting / story.** A tent pitched in a meadow below jagged mountains in the evening. The first star is out on the left,
the moon is rising on the right, and a storm cloud with a lightning bolt is rolling over the middle peaks. Fir trees
guard the tent.

| item | key / motif | gr | asp | render | box |
|---|---|---|---|---|---|
| mountains `mountains(4,671,470,170,4)` | | | | G | peaks at x 87/254/421/588 (y 300/348/300/348), valleys y 419 — every point ≥ 160 apart, angles ≥ 60° |
| star `star(110,110,34)` | | | | G | 76-144, 76-144 |
| moon `moon(590,110,34)` | | | | G | 556-624, 76-144 |
| storm cloud `cloud(337,140,200)` | | | | G | 237-437, 56-140 |
| lightning | `travel and holiday bw/lightning` | 1 | 0.919 | G | x 337, y 300, h 140 → 273-401, 160-300; over the 254-421 valley, 28 px above the slopes |
| fir A (hero) | `M.line([[100,450],[175,580],[25,580],[100,450]],true)` + trunk `shapes.rect(100,608,26,56)` | | | G | 25-175, 450-636 |
| fir B | `M.line([[255,480],[315,584],[195,584],[255,480]],true)` + trunk `shapes.rect(255,610,22,52)` | | | G | 195-315, 480-636 |
| tent | `travel and holiday bw/tent` | 2 | 1.541 | G | x 445, y 636, h 140 → 337-553, 496-636 |
| fir C | `M.line([[618,520],[663,598],[573,598],[618,520]],true)` + trunk `shapes.rect(618,617,18,38)` | | | G | 573-663, 520-636 |
| ground `ground(4,671,636,4,3)` | | | | G | everything stands on it |
| grass ×4 at y 704 | | | | D | foreground weight |

Intended overlaps: the mountains' foot (y 470) passes behind firs A/B and the tent. Gaps: A-B 20, B-tent 22, tent-C 20,
cloud-lightning 20. Firs are triangles + trunks (exact geometry, the contract's "fir trees"; the library has no plain fir —
`Christmas bw/christmas_tree` is decorated). Crown: the pool has none; the star carries the "crown or star".
Instruction: "Trace the zigzags. Stop at every point."
**Premium because** every zigzag is a real place (a skyline, a bolt, a tree, a tent) and the storm gives the page a story.

---

## #8 Curls and spirals · K · P (stall layout) · P2

**Setting / story.** The sweet stall at the fair: bunting along the top, a shelf with a big curly bow and a pretzel, and
on the counter a giant swirl lollipop, a pinwheel — and a snail who has crawled up to see.

| item | key | gr | asp | render | x | y | h/w | box |
|---|---|---|---|---|---|---|---|---|
| bow | `Christmas bw/bow` | 1 | 1.224 | G | 160 | 330 | w 280 | 20-300, 101-330 |
| pretzel | `food bw/pretzel` | 1 | 1.134 | G | 490 | 330 | w 270 | 355-625, 92-330 |
| swirl lollipop (hero) | `Christmas bw/lollipop` | 1 | 0.557 | G | 115 | 700 | h 330 | 23-207, 370-700 |
| snail | `animals bw/snail` | 1 | 1.213 | G | 345 | 700 | w 220 | 235-455, 519-700 |
| pinwheel | `toys bw 2/pinwheel` | 1 | 0.617 | G | 570 | 700 | h 280 | 484-656, 420-700 |
| bunting `bunting(4,671,20,24,9)` | | | | D | | | | y 20-44 + flags |
| shelf `roundRect(10,336,655,10,5)` / counter `roundRect(10,702,655,8,4)` | | | | D | | | | |

**Gate:** the lollipop's spiral turns must be ≥ 18 px apart at h 330 (the Christmas lollipop has the widest turns of the
three lollipops; dessert bw/lollipop is ≈ 10 px on the contact sheet — rejected). If measured < 18, raise to h 380 and
drop the pinwheel to h 250. Gaps: bow-pretzel 55, shelf-lollipop 34, lollipop-snail 28, snail-pinwheel 29.
Instruction: "Trace the curls round and round."
**Premium because** the stall makes curls a delight (sweets, a ribbon, a pinwheel) and the snail is the joke a child finds.

---

## #9 Where do I start? · K · P · P2 + a start dot (solid black dot ringed white) + arrow on EVERY line

**Setting / story.** Five picture postcards pegged on two washing lines. Each card holds one simple picture with ≤ 4
strokes; on every stroke a fat dot says "start here" and a small arrow says "go this way".

| card | key | gr | asp | raw paths | picture box | card (D) |
|---|---|---|---|---|---|---|
| A | `valentine bw/heart` | 1 | 1.062 | 2 | x 120, y 300, w 160 → 40-200, 149-300 | roundRect(25,54,190,290,16) |
| B | `Easter bw/bell` | 1 | 0.802 | 2 | x 337, y 310, h 200 → 257-417, 110-310 | roundRect(242,54,190,290,16) |
| C | `Christmas bw/stocking` | 1 | 0.498 | 3 | x 555, y 320, h 240 → 495-615, 80-320 | roundRect(460,54,190,290,16) |
| D | `Christmas bw/star` | 1 | 0.904 | 5 | x 200, y 660, h 240 → 92-308, 420-660 | roundRect(75,392,250,300,16) |
| E | `nature bw/moon` | 1 | 0.872 | 2 | x 475, y 660, h 240 → 370-579, 420-660 | roundRect(350,392,250,300,16) |

Lines (D): `string(4,36,671,36)`, `string(4,376,671,376)`; pegs `roundRect(cx-7,cardTop-14,14,24,4)` solid on each card.
Start points (convention §1): heart = top centre dip, go down-left (anticlockwise); bell = top of the handle, then the
body from its top-left down; stocking = cuff top-left, down the leg; star = the top point, down to the left; moon = the
top tip, down the outer curve. Any stroke where the convention is impossible gets NO arrow (gate). No numbers anywhere.
The dot is a shape (≈ 11 px solid black, 2 px white ring) — reads in grey.
Instruction: "Start at the dot. Follow the arrow."
**Premium because** the postcards make five tiny lessons feel like a collection, and every card has room to breathe.

---

## #10 Trace the dots · G1 · S · P4 (one dot spacing on the whole page)

**Setting / story.** Early morning in a little town square: the museum with its columns and the old hotel stand side by
side; a pigeon pecks, a dog trots by the signpost, a bicycle leans by the kerb, and a bus and a car drive past.

| item | key | gr | asp | render | x | y | h/w | box |
|---|---|---|---|---|---|---|---|---|
| cloud `cloud(320,82,120)` | | | | G | | | | 260-380, 32-82 |
| museum | `travel and holiday bw/museum` | 2 | 0.885 | G | 140 | 420 | h 270 | 21-259, 150-420 |
| hotel (hero) | `travel and holiday bw/hotel` | 3 | 1.018 | G | 523 | 420 | h 290 | 376-670, 130-420 |
| pavement line `ground(4,671,422,0,1)` | | | | G | | | | buildings stand on it |
| kerb line `ground(4,671,562,0,1)` | | | | G | | | | pavement things stand on it |
| pigeon | `birds bw/pigeon` | 2 | 0.819 | G | 110 | 562 | h 85 | 75-145, 477-562 |
| signpost | `travel and holiday bw/signpost` | 2 | 0.762 | G | 318 | 562 | h 125 | 270-366, 437-562 |
| dog | `animals bw/dog` | 2 | 0.977 | G | 430 | 562 | h 110 | 377-484, 452-562 |
| bicycle | `sports bw/bicycle` | 2 | 1.635 | G | 585 | 562 | h 100 | 503-667, 462-562 |
| bus | `vehicles bw/bus_2` | 2 | 2.056 | G | 170 | 700 | h 130 | 37-304, 570-700 |
| car | `vehicles bw/car` | 2 | 3.37 | G | 500 | 692 | w 240 | 380-620, 621-692 |

Gaps (G1 ≥ 10): museum-hotel 117, signpost top 437 ↔ pavement line 422 = 15, dog-bike 19, signpost-dog 11, bus-car 76.
Intended: pavement and kerb lines pass behind feet/wheels. Dot spacing fixed (≈ 7 px) for the whole page — the engine
must resample every polyline by arc length at the page scale, not per drawing (contract trap). The hotel (grade 3) is the
"top of the ladder" detail; every inner run < 12 px prints S.
Instruction: "Trace the dotted lines carefully."
**Premium because** it is a real street with layers (buildings / pavement / road) — a G1 child gets a detailed, calm,
architectural page instead of a crowd of clip-art.

---

## #11 Finish the picture · K · P · P2 on the missing parts only (render `part`)

**Setting / story.** The toy-repair workshop. Six toys wait on two shelves, each missing a part; the child "repairs"
them by tracing the missing wheels, handle, spout or feet. Bunting hangs over the workbench.

| item | key | gr | asp | x | y | h/w | box | dashed part (region of its own ink box) |
|---|---|---|---|---|---|---|---|---|
| toy car | `vehicles bw/car_2` | 1 | 2.361 | 115 | 340 | w 195 | 18-212, 257-340 | the wheels: y > 0.68 of the ink height |
| teapot | `home bw/teapot` | 1 | 1.194 | 337 | 340 | w 195 | 240-435, 177-340 | the spout: the outer 28 % on the spout side |
| umbrella | `education bw/umbrella_2` | 1 | 1.004 | 560 | 340 | w 195 | 462-657, 146-340 | the handle: y > 0.55 |
| cup | `household bw/cup` | 1 | 1.275 | 115 | 695 | w 190 | 20-210, 546-695 | the handle: outer 25 % on the handle side |
| spinning top | `toys bw/spinning_top` | 1 | 0.774 | 337 | 695 | h 220 | 252-422, 475-695 | the point: y > 0.72 |
| chick | `animals bw 4/chick` | 1 | 0.676 | 560 | 695 | h 230 | 482-638, 465-695 | the feet + belly curve: y > 0.75 |

Chrome (D): shelves `roundRect(10,345,655,10,5)`, `roundRect(10,700,655,10,5)`; bunting `bunting(4,671,30,30,8)`.
**Engine ask (small):** render `part` = like `half`, but the dashed set is "polylines whose midpoint lies in a region
given as fractions of the drawing's ink box" (half is the special case x > 0.5). The gate checks the dashed part is
≥ 20 % of the outline and no dashed fragment < 25 px; the side of the spout/handle is read from the drawing (flip if needed
so every handle faces right — the eye then knows where to look).
Instruction: "Trace the missing parts to finish each picture."
**Premium because** the workshop gives the move a reason ("mend the toys") and every gap is a nameable part, not a random cut.

---

## #12 The other half · G1 · P · P3 (left half M-solid / right half G)

**Setting / story.** One fold line runs straight down the middle of the page, like a sheet of paper folded in half and
opened again. Three front-facing pictures sit exactly on it: a butterfly at the top, an owl in the middle, a bell at the
bottom. The left halves are drawn; the child traces the right halves so both sides match.

| item | key | gr | asp | x(axis) | y | h/w | box |
|---|---|---|---|---|---|---|---|
| butterfly | `Easter bw/butterfly` | 1 | 1.489 | 337 | 209 | w 300 | 187-487, 8-209 |
| owl (hero) | `animals bw/owl` | 1 | 0.739 | 337 | 470 | h 240 | 248-426, 230-470 |
| bell | `Christmas bw/bell` | 1 | 0.895 | 337 | 708 | h 220 | 239-435, 488-708 |
| fold line `M.line([[337,4],[337,712]])` | | | | | | | D, dotted grey (P4 dots, lighter than guides) |

Each drawing is placed by its MEASURED symmetry axis (not its ink centre) on x 337. Gate: mirror the left half onto the
right; if the halves differ by > 10 px anywhere, reject (alternates, all front-facing grade 1: `Christmas bw/ornament`
0.708, `faces bw/panda_2` 1.323, `faces bw/lion` 1.058). Gaps: 21 and 18. Side panels left/right (x 4-180, 494-671) stay
white on purpose — the column is the composition.
Instruction: "Trace the other half so both sides look the same."
**Premium because** a single page-long fold line is a striking, honest picture of symmetry no clip-art page has.

---

## #13 Trace the picture, trace its name · G1 · P · P3 picture + dotted letters (start dot per letter)

**Setting / story.** Four flashcards from a picture dictionary: sun, fish, cat, apple — each picture with its word on a
writing line underneath.

| card | key | gr | asp | picture | writing line (seated by `lib/key-on-row.js`) |
|---|---|---|---|---|---|
| A (x 10-330, y 8-353) | `nature bw/sun` | 1 | 0.996 | x 170, y 205, h 170 → 85-255, 35-205 | baseline y 318, x 30-310 |
| B (x 345-665, y 8-353) | `nature bw/fish` | 1 | 1.317 | x 505, y 205, w 220 → 395-615, 38-205 | baseline y 318, x 365-645 |
| C (x 10-330, y 363-708) | `animals bw 4/cat` | 1 | 0.908 | x 170, y 560, h 175 → 91-249, 385-560 | baseline y 673 |
| D (x 345-665, y 363-708) | `fruits bw/apple` | 1 | 0.834 | x 505, y 560, h 175 → 432-578, 385-560 | baseline y 673 |

Cards = `roundRect(...,18)` D. Words per locale (3-7 letters, no article; checked): en sun fish cat apple · de Sonne Fisch
Katze Apfel · fr SOLEIL POISSON CHAT POMME · es sol pez gato manzana · pt sol peixe gato maçã · it sole pesce gatto mela ·
nl zon vis kat appel · sv sol fisk katt äpple · da sol fisk kat æble · no sol fisk katt eple · fi aurinko kala kissa omena.
Longest = 7 (POISSON, manzana, aurinko) at x-height ≈ 32 px fits 280 px. Diacritics (ç ã ä æ) print as solid marks.
Rejected: frog (grenouille 10, sammakko 8), butterfly, duck (fine everywhere — kept as alternate for "cat").
Instruction: "Trace the picture. Say its name. Trace the word."
**Premium because** it looks like a real picture dictionary, natively worded in 11 languages, not an English list.

---

## #14 Trace and count · K · S · P2 (ducks) + M (decoys)

**Setting / story.** The village pond on a calm morning. Ducks paddle about on the water; a frog sits on the bank on the
left, a turtle suns itself on the right, an old tree stands behind. Trace the ducks, count them, write how many.

| item | key / motif | gr | asp | render | box |
|---|---|---|---|---|---|
| answer box `roundRect(16,16,120,120,16)` + seated line at y 112 | | | | D | 16-136, 16-136 |
| tree | `nature bw/tree` | 3 | 0.869 | M | x 337, y 285, h 250 → 229-446, 35-285 |
| cloud `cloud(570,110,130)` | | | | D | 505-635, 55-110 |
| frog | `animals bw 5/frog` | 1 | 1.03 | M | x 90, y 280, h 100 → 39-141, 180-280 |
| turtle | `animals bw/turtle` | 2 | 1.329 | M | x 590, y 280, w 140 → 520-660, 175-280 |
| pond `ellipse(337,500,325,205)` | | | | D | 12-662, 295-705 |
| reeds `grass(40,400,40,4)`, `grass(640,410,36,4)` | | | | D | on the bank |
| ripples `waves(150,520,560,40,4)` | | | | D | low on the water, clear of ducks |
| duck 1 | `birds bw 2/duck` | 1 | 0.886 | G | x 200, y 485, h 135 → 140-260, 350-485 |
| duck 2 (flip) | same | | | G | x 360, y 455 → 300-420, 320-455 |
| duck 3 | same | | | G | x 530, y 520 → 470-590, 385-520 |
| duck 4 (flip) | same | | | G | x 185, y 640 → 125-245, 505-640 |
| duck 5 | same | | | G | x 380, y 640 → 320-440, 505-640 |

N = 5 in the base (all the same drawing, mixed facing, scattered — never a row). Every duck box is ≥ 18 px inside the
ellipse rim (checked at each box corner). Decoys are different categories (frog, turtle) and solid; the tree is scenery.
The answer box sits in the empty sky, away from any duck. For locale/seed variants N ∈ 3-8 from these slots + 3 spares
(x 520 y 640 if moved into the oval; x 260 y 590) — the gate counts dashed ducks on the render.
Instruction: "Trace the ducks. Count them. Write how many." (plural authored natively)
**Premium because** the pond is a real, framed place where counting is natural, with decoys that teach "count only ducks".

---

## #15 Shape picture · K · P (one big vector picture) · P2 · vector only

**Setting / story.** A friendly robot rolling on one big wheel, built only from true shapes. Trace every shape, then
colour every circle (the key in the corner shows a circle).

| # | shape | geometry (exact) | box |
|---|---|---|---|
| 1 | triangle (antenna, upright) | `shapes.triangle(337,55,56)` | 309-365, 23-71 |
| 2 | square (head) | `shapes.square(337,175,170)` | 252-422, 90-260 |
| 3-4 | circles (eyes) | `shapes.circle(295,160,24)`, `(379,160,24)` | |
| 5 | rectangle (mouth) | `shapes.rect(337,226,80,22)` | 297-377, 215-237 |
| 6 | rectangle (body) | `shapes.rect(337,395,210,230)` | 232-442, 280-510 |
| 7 | TILTED square (badge) | `M.line` square side 70 rotated 45° at (337,360) | 287-387, 310-410 |
| 8-9 | circles (buttons) | `shapes.circle(300,460,22)`, `(374,460,22)` | |
| 10-11 | rectangles (arms) | `shapes.rect(192,380,44,160)`, `(482,380,44,160)` | 170-214 / 460-504, 300-460 |
| 12-13 | UPSIDE-DOWN triangles (hands) | `M.line` triangle side 60, apex down, centroid (192,500) / (482,500) | base y 483, apex y 535 |
| 14 | circle (wheel) | `shapes.circle(337,600,60)` | 277-397, 540-660 |
| — | floor | `M.line([[120,662],[555,662]])` D | |
| — | key | `roundRect(540,600,120,100,16)` D + a hatched (pattern-filled) circle r 30 | 540-660, 600-700 |

14 shapes: 5 circles (two sizes), 2 squares (one tilted), 4 rectangles (one tall, one wide), 3 triangles (one up, two
down) — size AND orientation vary (K.G.A.2). Gaps (all ≥ 18): antenna-head 19, eye-head edge 19, mouth-head 23,
head-body 20, arm-body 18, hand-arm 23, wheel-body 30. No library drawing, no oval, no rounded box, no printed names.
Teacher note (landing): the tilted badge is a square.
Instruction: "Trace the shapes. Then colour every circle."
**Premium because** the robot is a character a child loves AND a precise geometry lesson, with orientation built in.

---

## #16 Big, middle, small · K (PreK variant = 2 rows, P1/P2 only) · P · P1 → P2 → P3

**Setting / story.** Three families on the move: three airplanes fly in the sky, three cars drive on the road, three boats
float on the sea — each family biggest first, left to right.

| row | key | gr | asp | big (P1) | middle (P2) | small (P3) |
|---|---|---|---|---|---|---|
| sky | `vehicles bw 2/airplane` | 1 | 2.543 | x 155, y 180, w 290 → 10-300, 66-180 | x 425, y 170, w 197 → 327-523, 93-170 | x 605, y 160, w 130 → 540-670, 109-160 |
| road | `vehicles bw 2/car` | 1 | 2.303 | x 155, y 400, w 290 → 10-300, 274-400 | x 425, y 400, w 197 → 327-523, 314-400 | x 605, y 400, w 130 → 540-670, 344-400 |
| sea | `vehicles bw/boat_2` | 1 | 1.949 | x 155, y 655, w 290 → 10-300, 506-655 | x 425, y 655, w 197 → 327-523, 554-655 | x 605, y 655, w 130 → 540-670, 588-655 |

Scale 100 / 68 / 45 % (the smallest still 130 px longest side = the K floor; 40 % cannot fit three in 667 px with the gaps).
Chrome (D): a small cloud `cloud(560,60,110)` above the small plane (top 109 ↔ cloud 60 = 49); road line
`M.line([[4,402],[671,402]])`; sea `waves(4,671,660,48,6)` — each family on its own ground. Gaps in a row 27 and 17;
row bands do not touch (180 ↔ 274; 400 ↔ 506).
Instruction: "Trace the big one, then the middle one, then the small one."
**Premium because** sky / road / sea makes the size ladder a little world of transport, read top to bottom like a story.

---

## #17 Christmas — close every bauble · K · S (indoors, no snow) · P2

**Setting / story.** The living room on Christmas Eve. A tall tree in a pot is hung with baubles and stars; a star sits on
top; through the window the moon and two stars shine; gifts wait on either side of the pot and an armchair waits for
Grandpa. Works for a summer Christmas (Brazil) — no snow anywhere.

| item | key / motif | gr | asp | render | box |
|---|---|---|---|---|---|
| tree (hero) `M.line([[230,102],[380,470],[80,470],[230,102]],true)` | | | | G | 80-380, 102-470 (isosceles, slope 0.408) |
| trunk `shapes.rect(230,495,40,50)` · pot `shapes.rect(230,580,120,120)` | | | | G | 210-250, 470-520 · 170-290, 520-640 |
| top star `star(230,60,28)` | | | | G | 202-258, 32-83 (19 above the apex) |
| baubles row y 230: `shapes.circle(230,230,22)` | | | | G | clearance to tree edge 26 |
| row y 320: `shapes.circle(190,320,22)`, `(270,320,22)` | | | | G | clearance 23, between 36 |
| row y 410: `star(152,410,24)`, `shapes.circle(230,410,22)`, `star(308,410,24)` | | | | G | clearance 20, between ≥ 32 |
| window `roundRect(430,60,210,230,18)` + bars `M.line([[535,60],[535,290]])`, `M.line([[430,175],[640,175]])` | | | | G | 430-640, 60-290 |
| moon `moon(482,117,28)` · `star(588,118,22)` · `star(588,232,24)` (in three panes) | | | | G | ≥ 24 from frame and bars |
| gift A | `Christmas bw/gift_box` | 2 | 0.814 | G | x 92, y 640, h 140 → 35-149, 500-640 |
| gift B | `Christmas bw 2/gift_box` | 2 | 1.027 | G | x 375, y 640, h 130 → 308-442, 510-640 |
| armchair | `furniture bw/armchair_2` | 1 | 0.798 | G | x 585, y 640, h 170 → 517-653, 470-640 |
| floor `ground(4,671,642,0,1)` | | | | G | everything stands on it |
| rug `roundRect(150,660,380,40,20)` | | | | D | foreground weight |

Small closed shapes: top star + 6 baubles + moon + 2 window stars = 10 vector, + 2 gift boxes = 12 (8-12 ✓), each 44-60 px
across, each ≥ 18 px from any other line. Gaps: gift A-pot 21, pot-gift B 18, tree base-gifts ≥ 30, window-tree 50,
armchair-window 180. No religious figure, no angel, no snow.
Instruction: "Trace the Christmas tree and close every bauble."
**Premium because** it is a warm room with a window to the night, not a tree surrounded by floating icons.

---

## #18 Summer at the sea — lines across the page · K · S · P2

**Setting / story.** A sailing day. A sailboat rides the first wave; the sun shines over the sea; on the beach a sandcastle,
a crab scuttling past, and a beach umbrella. Three long lines run from the left edge to the right: the horizon and two waves.

| item | key / motif | gr | asp | render | box |
|---|---|---|---|---|---|
| cloud `cloud(150,100,150)` | | | | G | 75-225, 37-100 |
| sun | `beach bw/sun` | 1 | 1.024 | G | x 540, y 230, h 140 → 468-611, 90-230 |
| horizon `ground(4,671,300,0,1)` (straight) | | | | G | full width |
| wave 1 `waves(4,671,360,60,8)` | | | | G | full width |
| wave 2 `waves(4,671,430,60,8)` | | | | G | full width; 54 px from wave 1 |
| sailboat (hero) | `beach bw/sailboat` | 1 | 1.008 | G | x 230, y 362, h 230 → 114-346, 132-362 — sits ON wave 1; horizon passes behind the sail |
| sand line `ground(4,671,520,6,3)` | | | | G | ≥ 80 below wave 2 |
| beach umbrella | `beach bw/parasol` | 1 | 1.033 | G | x 500, y 700, h 220 → 386-614, 480-700 (sand line passes behind) |
| sandcastle | `beach bw/sandcastle` | 2 | 0.748 | G | x 130, y 700, h 150 → 74-186, 550-700 |
| crab | `animals bw 5/crab` | 1 | 1.127 | G | x 290, y 705, h 100 → 234-346, 605-705 |

Gaps: cloud-boat 32, umbrella top ↔ wave 2 42, castle top ↔ sand line 24, castle-crab 48, crab-umbrella 40.
Waves never cross the boat: the boat's hull bottom is the wave's crest (the boat hides the wave behind it).
Instruction: "Trace the waves from left to right. Then trace the beach."
**Premium because** the full-width lines ARE the sea — the writing-line skill becomes the most beautiful part of the picture.

---

## #19 Trace it, then add to it · G1 · S · P3

**Setting / story.** The farm on a bright day. The tractor is back from the field; the cow, the pig and the chicken are
in the yard; a sheep looks over the hill — and the fenced paddock in front is EMPTY. Who lives there? The child draws one
more thing in it and tells the class.

| item | key / motif | gr | asp | render | box |
|---|---|---|---|---|---|
| sun `sun(90,80,32,8,false)` | | | | G | 39-141, 29-131 |
| cloud `cloud(380,90,150)` | | | | G | 305-455, 27-90 |
| skyline `ground(4,671,300,20,2)` (rolling hills) | | | | G | y 280-306 |
| sheep | `farm bw/sheep` | 2 | 1.123 | G | x 600, y 360, h 90 → 550-651, 270-360 (the skyline passes behind it) |
| tractor | `farm bw/tractor` | 2 | 1.361 | G | x 135, y 470, h 150 → 33-237, 320-470 |
| chicken | `farm animals bw/chicken` | 2 | 0.737 | G | x 290, y 470, h 110 → 250-331, 360-470 |
| back fence `fence(360,660,420,50,6)` | | | | G | 360-660, 370-420 |
| front fence `fence(360,660,700,60,6)` | | | | G | 360-660, 640-700 |
| **empty paddock** | — | | | — | 360-660 × 420-640 = 300 × 220 (≥ 160 × 160) — nothing inside, no model |
| cow | `farm bw/cow` | 2 | 0.774 | G | x 90, y 690, h 160 → 28-152, 530-690 |
| pig | `farm bw/pig` | 2 | 0.78 | G | x 230, y 690, h 120 → 183-277, 570-690 |
| yard ground `ground(4,350,692,3,2)` | | | | G | under cow + pig |

Gaps (G1 ≥ 10): tractor-chicken 13, chicken-back fence 29, cow-pig 31, pig-front fence 83. The paddock is a natural space
(fences top and bottom), so no dashed frame is needed — it already says "an animal goes here" without showing one.
Pig flagged as mildly culture-sensitive; alternate `farm bw/goat` (2) if a locale panel asks.
Instruction: "Trace the picture. Then draw one more thing in the empty space."
**Premium because** the empty paddock is a story question built into the composition — the only open-ended page, by design.

---

## #20 Find and trace the hidden animals · G1 · S · whole scene M (solid) + P3 for the N animals

**Setting / story.** A busy autumn forest: two big trees, falling leaves, mushrooms, a winding path. Five animals are
hiding — a squirrel on a branch, an owl in the second tree, a fox by the path, a hedgehog under the leaves, a mouse among
the mushrooms. Only they are dashed. (pt-BR may say "floresta" without autumn.)

| item | key | gr | asp | render | x | y | h/w | box |
|---|---|---|---|---|---|---|---|---|
| tree L | `nature bw/tree` | 3 | 0.869 | M | 170 | 520 | h 380 | 5-335, 140-520 |
| tree R (in front) | `nature bw/tree_2` | 3 | 0.842 | M | 500 | 500 | h 400 | 332-668, 100-500 |
| ground `ground(4,671,560,5,3)` | | | | D | | | | |
| path `pathBand([[380,560],[330,620],[400,712]],70)` | | | | D | | | | |
| leaves ×6 | `nature bw/leaf` (flips) | 1 | 0.667 | M | (60,120),(300,90),(640,90),(40,600),(250,600),(640,560) bottoms | | h 50 | scattered falling + on the ground |
| mushroom | `vegetables bw 2/mushroom` | 1 | 0.853 | M | 230 | 690 | h 70 | 200-260, 620-690 |
| mushroom | `nature bw/mushroom` | 2 | 0.882 | M | 420 | 700 | h 90 | 380-460, 610-700 |
| **squirrel** | `animals bw/squirrel` | 2 | 0.951 | G | 250 | 330 | h 100 | 202-298, 230-330 (on tree L's branch) |
| **owl** | `birds bw 2/owl` | 2 | 0.722 | G | 470 | 300 | h 110 | 430-510, 190-300 (in tree R's crown) |
| **fox** | `animals bw 5/fox` | 2 | 0.744 | G | 560 | 690 | h 140 | 508-612, 550-690 (beside the path) |
| **hedgehog** | `animals bw 5/hedgehog` | 2 | 1.11 | G | 120 | 690 | h 80 | 76-164, 610-690 (by the leaf pile) |
| **mouse** | `animals bw 3/mouse` | 2 | 0.678 | G | 330 | 700 | h 90 | 300-361, 610-700 (between the mushrooms) |

**Engine ask (small):** a **knock-out halo** — every solid (M) line within 12 px of a dashed animal's body mask is cut, so
an animal sits on the scene without touching any solid line (contract: "a dashed animal touching solid lines" is banned,
yet "a squirrel on a branch" is required; the halo satisfies both). Animals are fully visible (in front of everything).
N = 5, and the gate counts dashed drawings on the render = the number in the instruction. Solid items may overlap each
other (it is a busy scene); dashed animals overlap nothing dashed.
Instruction: "Find the 5 hidden animals. Trace them."
**Premium because** it is a real Where's-Wally forest for six-year-olds, where tracing is the reward for finding.

---

## Z. Cross-checks and open items for the build / critic

**Reuse (≤ 2 faces, never hero twice):** `animals bw 4/cat` #1 (not hero), #13 · `fruits bw/apple` #2 (hero), #13 ·
`nature bw/moon` #6, #9 · `home bw/teapot` #3, #11 · every other key appears once. Two different umbrellas
(`beach bw/umbrella` #3, `education bw/umbrella_2` #11) and two chicks (`Easter bw 2/chick` #3, `animals bw 4/chick` #11)
are different drawings.
**Grades per band:** checked against the pool for every G item (PreK (1); K (1)-(2); G1 (2)-(3), #12/#13 (1)-(2) per the
contract). Solid scenery (M/D) in #14 and #20 may be grade 3 — it is never traced.
**No excluded imagery:** no cross, church, angel, bible; no blades, weapons, tank; no erlenmeyer/durian/biberon/passport.
**Open items:**
1. **Stroke budgets.** The index's raw `paths` per drawing (house 24, tree_3 35, butterfly 40, cat 26, …) summed per page
   exceed the contract's K ≤ 30 / G1 ≤ 50 "connected runs" — I assume the gate counts runs AFTER short details are made
   solid and joined runs are merged. If the measured count still exceeds, drop in this order: #1 tall flower → second
   tulip; #10 pigeon → bicycle; #19 sheep. Never shrink the remaining pictures to compensate.
2. `#8` lollipop spiral spacing (≥ 18 px) — measure; fallback stated.
3. `#12` symmetry measurement per drawing — reject > 10 px; alternates stated.
4. Engine asks (both small, both reuse existing code): render `part` with a fractional region (#11); knock-out halo (#20).
   Everything else uses existing motifs; the isosceles tree, the tilted square and the upside-down triangles use
   `M.line(pts, true)`.
5. `#10` one dot spacing across differently-scaled drawings — the engine must resample at page scale.
6. If the shell body is taller than 716, scale y; the foreground band (y > 560) absorbs the extra, never the sky.
