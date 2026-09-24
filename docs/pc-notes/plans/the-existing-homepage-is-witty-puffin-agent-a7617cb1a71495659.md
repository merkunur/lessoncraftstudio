# THE DRAWING BIBLE — the v12 room in paper-cut CSS
(folds in the jury rulings 2–7, 10, 15 of the plan file §"Rulings from the jury critique")

Scope: the wide room (08:00 · 08:20 · 09:40 · 15:00) and the desk acts (11:00 · 13:00 · 14:00 · 14:40).
Units: **poster units** (100×50 poster, `1u = 1cqw` ≈ 11.5px at 1366), VP (50,30), front-wall foot y = 39,
left-wall corner x = 14, right wall from x = 86. Part specs are LOCAL boxes (w×h in u at depth scale 1) with
`clip-path: polygon()` in %. Palette tokens = `--g10-*` (`homepage-v10.css:62-105`). Reused BY CLASS, never
redrawn: cornice · dado · floor (conic re-centred on the VP) · `.hv10-frame` · `.hv10-plinth` · plaque · `.hv11-screen`
· `.hv11-shelf-plank` · the hv6 clock/rekenrek/`OpenNumberLine`/`WeighBench`.

---

## 1. The drawing law — ten rules

| # | Rule | Operational form |
|---|---|---|
| 1 | **Five cuts only.** Box · box with unequal corner radii · trapezoid · convex polygon ≤ 12 vertices · disc/capsule. | A 13th vertex means two parts. |
| 2 | **One shadow, one node, one offset.** A flat `rgba(40,22,6,.22)` shape (`.hv12-cut-shadow`, sibling or pseudo) anchored at the part's FOOT (`transform-origin: 0 100%`), sheared by the stage: `transform: skewX(calc((.5 - var(--sun))*44deg)) scaleX(calc(1.7 - var(--sun)*.9))`. Soft edge = a STATIC mask (`mask-image: linear-gradient(90deg,#000 55%,transparent)`), never blur/filter. | Desks: one `.hv12-rail-shadow` pattern per depth band. Sheets in flight cast NOTHING. Under the blind (13:00/14:00) the node fades to .06: dark rooms have no cast. |
| 3 | **Imperfect edges by table, not by wobble.** Deviation cycle `[+.12, −.20, +.27, −.08]u` indexed by node order; ONE or TWO vertices/corners per shape. A: unequal `border-radius` pairs (`.5u .4u .35u .55u / .45u .5u .4u .35u`). B: a polygon vertex moved .1–.3u. | Never on architecture (floor line, board lip, door, reveals, cornice). Never rotate for imperfection. <.1u invisible, >.3u broken. |
| 4 | **Gradients only on light.** Sky in the bays, window/door casts, the projector throw, lamp glow + pool, lit screens, the plinth/trolley lit top face. | Hard-stop `linear-gradient(a 0 40%, b 40%)` is a two-fill device (cornice precedent), allowed on objects. A soft ramp on a desk, chair, coat, tablet, tray or door is a defect. |
| 5 | **No line weight.** No borders, strokes, outlines. Edges are colour contact. The one exception is the paper's cut face: coloured parts (coral/teal/walnut/ink) may carry `inset 0 .08u 0 rgba(255,250,235,.45)` on the TOP edge only. Cream parts carry none. | Same-colour contact (oak desk on oak floor) is solved by VALUE (`--g10-floor-lit` on `--g10-floor`) or by the shadow, never a line. |
| 6 | **Depth in three steps, never perspective on objects.** (a) per-band `scale` 1.0→.62 near→far; (b) aerial value step: a flat ink veil per band `rgba(20,50,45, 0/.06/.11/.16/.20)`; (c) overlap = DOM order. Upright things are FRONT ELEVATIONS. | The floor conic is the only converging system. Objects may borrow one cue: a TOP FACE is a trapezoid whose sides point at the VP. Lying paper shares ONE lie: `--lie: perspective(40cqw) rotateX(var(--lie-deg))`, `--lie-deg` 52° for scenery sheets, **28° for claim sheets** (rule 10). |
| 7 | **Tilt budget: at most TWO in-plane-rotated objects per frame**, and every rotation means something. Allowed: 08:00 the pair (−6°/+3°) · 09:40 the flying sheet (−25°) + the stack's top card (−6°) · 14:00 one sheet per spread row (−4°/+3°) · 14:40 the two pinned sheets (−.9°/+1.2°) · 15:00 the propped sheet (8°). | Desks, coats, frames, the hour numeral, the trolley: 0°. Rows are made alive by the seating plan (§2.21), not by tilt. |
| 8 | **Colour by object, not by mood.** Oak = desk tops, trays, shelf · walnut = legs, frames, door, arm, castors, blind casing · teal = chairs, handle, pencil cap · coral = pencil shaft, dial pointer, one coat, one theme-card band · cream = paper, plinths, chalk, mullions, blind · ink = tablet bezel, eraser felt, pin dots, the veil · steel `#B8B4AC` = pins. | Mood is `--sun` cross-fading LIGHT layers only. A coral desk, a teal door, a coral pin: defects. |
| 9 | **Never drawn, never self-moved.** No person, hand, cuff, face, silhouette in a doorway, coffee cup, plant, pet, sun disc, cloud, bunting, mascot, fake text, shadow of an off-frame thing, isometric cube. Nothing travels under its own power: the trolley is parked before 08:00, castors never turn, the lamp never switches itself (the blind explains the dark). | Presence is consequence only (§4). The visitor's scroll and pointer are the only hands. |
| 10 | **Real product is the only picture, and proof must be READABLE.** Sheets, screens, tiles, the tablet's activity, the QR are real thumbnails / live instruments. Claim-carrying sheets (08:00 pair · 11:00 sheet · 14:00 forward sheet · 15:00 propped sheet) show ONE native word at ≥ 11px x-height at 1366×768: live text in the sheet's own running-header band, `font-size: max(26px, 2.3u)` (Nunito x-height ≈ .48em; 26px × .48 × cos 28° ≈ 11px), one word, no wrap, clipped to the sheet. | A 96px thumbnail at 52° is a rhombus and proves nothing: scenery sheets may be that; claim sheets may not. |

---

## 2. Parts catalogue

Columns: silhouette (local box, polygon %), fills, shadow, **N** = nodes (element + pseudos), CSS build, **floor** =
smallest rendered width at which it still reads (measured on the §5 contact sheet).

### 2.1 Desk, chair DOWN (base pose "in", plus three variants)
Box 9×5.0u at scale 1. `<i class="hv12-desk" data-pose="in|out|turned|none">` + `::before` legs + `::after` chair. **N = 3.**

| Piece | Geometry (local %) | Fill |
|---|---|---|
| top (element) | 100%×44%, `polygon(7% 0, 93% 0, 100% 100%, 0 100%)`; deviation on vertex 2 | `--g10-floor-lit` 0–70%, apron `--g10-floor` 70–100% |
| legs `::before` | lower 56%: `linear-gradient(90deg, #6B4A2F 0 5%, transparent 5% 95%, #6B4A2F 95%)` | walnut |
| chair `::after` "in" | 34%×90% centred; backrest = top 32%, `border-radius: 12% 14% 4% 4% / 30% 26% 6% 6%`; legs = `linear-gradient(90deg, teal 0 14%, transparent 14% 86%, teal 86%)` on the lower 68%; overlaps the desk top by .6u | teal `#146B5E` |
| "out" (pulled out) | `translate: 0 .9u` on `::after`; the gap between backrest and apron shows floor | |
| "turned" (6° seen from behind) | `::after` width 26%, `translate: .4u 0`; a .25u seat edge visible under the backrest (hard stop) — NO rotate | |
| "none" | `::after { display: none }` | |
| shadow | per band: `repeating-linear-gradient(90deg, rgba(40,22,6,.22) 0 5.2u, transparent 5.2u 8.2u)` 1.1u tall, sheared by rule 2 | |
**Floor: 24px** (top + backrest). Below 24px drop `::before`; "turned" and "in" become identical below 40px — accepted.

### 2.2 Desk, chair UP (`.is-up`, 08:00 and 15:00)
`::after` = the inverted chair on the desk top, one 12-vertex polygon, box 34%×110%, bottom .2u above the top edge:
`polygon(0 100%, 100% 100%, 100% 82%, 62% 82%, 66% 0, 58% 0, 53% 82%, 47% 82%, 42% 0, 34% 0, 38% 82%, 0 82%)`
(seat slab + two splayed legs 2.2u). Pose variety with chairs up (ruling 5 still applies): `data-up="front"` (above) ·
`"side"` = one leg + a thicker slab `polygon(0 100%,100% 100%,100% 72%,56% 72%,60% 0,48% 0,52% 72%,0 72%)` ·
`"none"` (the chair is elsewhere). Fill teal; leg tips take the deviation cycle. **N = 3. Floor: 32px**; below,
`.is-tiny` = slab + one 3px leg.

### 2.3 Teacher's desk (front-left; enlarged to hold the readable pair)
| Piece | Poster coords | Fill |
|---|---|---|
| top (box x 8→41, y 39.6→42.4) | `polygon(23% 0, 100% 0, 91% 100%, 0 100%)`: near edge (8,42.4)→(38,42.4), far edge (15.6,39.6)→(41,39.6), sides on VP rays | `--g10-floor-lit` |
| modesty panel `::before` | x 8→38, y 42.4→47.4, `border-radius: 0 0 .3u .2u`; lit stile `#8A6440` left 6% | walnut |
| leg slot `::after` | x 36.4→38, y 42.4→47.4 | `--g10-floor-deep` |
| shadow | `.hv12-cut-shadow` 31×1.6u at the foot | |
| on it, 08:00 | **the pair**: hers 16u wide at (10,39.2) `--lie-deg 28` + `rotate(-6deg)`; the sibling 15u at (24,39.4) `rotate(3deg)`; both overhang the near edge by ≤1.2u (paper does). The two tilts are the frame's whole budget. | real `matching-letter` family + live header word |
| on it, 08:20 | the rekenrek, 12u, cqw override | product |
**N = 3 + shadow. Floor: 40px.** The H1 (x 5→62, `--b 11`) has its last baseline on y 39: it stands ON the desk's far edge, never over it.

### 2.4 Window bay with mullion and sill (left wall ×2)
Bay A `(1,1.4)(6,4.3)(6,26.3)(1,25.9)`; Bay B `(8,5.5)(12.5,8.1)(12.5,26.9)(8,26.5)`. Element = bounding box, `clip-path` = bay.

| Piece | Build | Fill |
|---|---|---|
| glass (element) | the bay | the ONLY gradient: `linear-gradient(170deg, var(--sky-a), var(--sky-b))`, cool/warm layers per the light table (dawn `#D9E9EE→#F1F6F4` · noon `#CFE6F2→#FFF` · shade `#C3D3D9→#D9E3E6`) |
| reveal + vertical mullion `::before` | `inset:0`, same clip; reveal = `box-shadow: inset 0 0 0 .35u #F3EAD8` (flat ring); mullion = `linear-gradient(90deg, transparent 0 47%, #F3EAD8 47% 53%, transparent 53%)` | cream |
| horizontal mullion `::after` | `polygon(0 44%, 100% 46%, 100% 49%, 0 47%)` (follows the bay's slope) | cream |
| sill `<i>` | .7u tall under the foot, `polygon(0 0, 100% 8%, 100% 100%, 0 92%)`; top `#F3EAD8` 0–55%, face `#DCCFB6` | |
**N = 4 per bay. Floor: 36px tall**; below, drop the horizontal bar.

### 2.5 Door — closed (08:00–14:00) / open with corridor light (15:00)
Leaf `(88,7.8)(97,2.6)(97,41.75)(88,39.5)`; architrave = the polygon +.5u, `#F3EAD8`, `::before` beneath.

| State | Build | Fill |
|---|---|---|
| closed | walnut leaf; lit stile `#8A6440` left 7%; vision panel = flat box x 30–70% / y 12–34% `#C3D3D9` (unlit glass, no gradient); handle `::after` .7×.25u ink at (15%, 55%) | |
| open | leaf swung away = a 1.2u slab x 96→97.2 (`::after`, walnut); opening = the polygon in `linear-gradient(200deg, #FFE2B8, #F3EAD8)` — no corridor perspective, no silhouette, no floor beyond | light |
| door casts (15:00) | two lozenges from the door foot leftward, mirrors of the window casts: `(90,41)(54,39.8)(30,44.5)(76,48.5)` · `(83,44)(48,40.2)(26,47)(67,50)`, `rgba(255,168,88,.40)` | light |
**N = 3 (+2). Floor: 30px tall.** Handle dropped below 60px. For the INSIDE face (14:40) see §2.16.

### 2.6 Board with tray, chalk, eraser (x 44→84, y 4.5→25) + the work of the week
| Piece | Build | Fill |
|---|---|---|
| lip (element) | 40×20.5u, `border-radius: .25u`, `padding: .5u`, bevel `inset 0 0 0 .1u #8A6440` | walnut |
| field | flat; chalk residue = the field noise SVG at `.035`, `mix-blend-mode: screen` | `#16483A` |
| half-erased swipe `::after` (08:20+) | 12×6u at (52,10), `polygon(0 8%, 100% 0, 96% 100%, 4% 92%)`, masked 70%→0 | `rgba(253,251,246,.07)` |
| tray `<i>` | x 44→84, y 25→26.1; top `#A88A63` 0–45%, face `#8A6440` | |
| chalk | capsule 1.4×.35u at (48,25.15) | `#FDFBF6` |
| eraser | 2.2×.7u at (77.5,24.9): felt ink 0–60%, wood `#C2A884` 60–100% | |
| **the work of the week** | ONE `.hv10-frame` verbatim, `--w 7`, at (36,8) (x 36→43, y 8→17.3), `--tilt 0`, a real thumbnail. Ruling 15: byte-identical frame CSS; the most recognisable v10/v11 image, kept. | walnut/cream mat |
| chalk number line (08:20) | `OpenNumberLine` recoloured: line `#FDFBF6` .18u, jumps coral, 28u at (50,13) | product |
**N = 6 + frame. Floor: 60px** for chalk + eraser; the board reads at 20px.

### 2.7 Trolley on castors — PARKED all day (x 62→86, foot y 39.6)
| Piece | Build | Fill |
|---|---|---|
| body | ONE `.hv10-plinth` at `--w 24; --h 5.6` verbatim (face + the sanctioned lit top slab) | stone cream |
| castors `<i>` | 24×1.1u under the body: two flat discs `radial-gradient(circle at 4% 50%, #6B4A2F 48%, transparent 50%)` + the mirror at 96%; a .12u `#8A6440` dot each, STATIC (ruling 4: castors never turn) | walnut |
| handle `<i>` | inverted U at the right end, `border: .4u solid #146B5E; border-bottom: 0; border-radius: .8u .8u 0 0`, 6u tall; at 15:00 the propped sheet leans on it | teal |
| shadow | `.hv10-plinth-shadow` verbatim, sheared by rule 2 | |
| on it | 08:20: balance + lids at 12u each (~140px), waking when the light band reaches them; 15:00: the same, asleep (`animation: none`) | product |
**N = 5. Floor: 48px.** It is not drawn "rolling": the wake at 08:20 is the light band alone.

### 2.8 Coat on a peg (rail x 96→150 on the wide wall; six coats)
Box 3×5.5u: `polygon(50% 0, 62% 8%, 100% 15%, 92% 100%, 8% 100%, 0 15%, 38% 8%)`; peg `::before` .5u walnut disc at (50%,−.2u).
Colours coral · teal · cream · ink · teal · coral, no two alike adjacent; spacing 7.6 / 8.4 / 7.9 / 8.6 / 7.7u; deviation on vertices 3 and 5; 0° tilt (the hang is in the polygon). Shared shadow 2.8×.6u at the hem. **N = 2. Floor: 20px**; drop below 16px.

### 2.9 The lamp (14:00, straight-down view) — arm · shade · glow · pool
| Piece | Build | Fill |
|---|---|---|
| arm | two `<i>` bars .5u: from the top-right corner at −38°, 22u; then −12°, 9u; joint = .9u walnut disc | walnut |
| shade | ellipse 9×5u, `border-radius: 50% 48% 52% 50% / 50% 52% 48% 50%` | ink |
| glow `::after` | the ellipse +.6u, `radial-gradient(50% 50%, rgba(255,240,205,.55), transparent 70%)` | light |
| pool | the veil's hole, not an object: `.hv12-dusk { background: radial-gradient(ellipse 34% 26% at var(--px) var(--py), transparent 46%, #14322D 100%); opacity: calc(1 - var(--sun-act)) }`; widens `scale 1→1.55` | light |
The lamp is already ON when the plate arrives (the blind is down since 13:00; nothing switches itself). **N = 5. Floor: 64px** for the arm; the pool carries the lamp in the phone crop.

### 2.10 The tablet (11:00)
Bezel 16×11u, `border-radius: .9u .9u .8u 1.0u`, ink; cut face `#2A4A44` top 4% (hard stop); screen = child inset .55u holding the REAL activity (click-to-load iframe / real frame at real px — ruling 9); no glare, no gradient. Under it: the 11:00 sheet, 18u wide, `--lie-deg 28`, 0°, its running header = `frameworkName(locale)` + grade as live text per rule 10. **N = 2 + shadow. Floor: 40px.**

### 2.11 Tray of tiles (14:00, left of the pool)
Tray 11×8u `#FBF3E4`, lip `box-shadow: inset 0 0 0 .4u #DCCFB6`, `border-radius: .5u .4u .5u .45u`; 12 tiles 2.2u in 4×3, gap .3u, `#FDFBF6`, seat `inset 0 -.08u 0 #D8CDB8`, art = 12 real `image-library-webp` nouns. One tile lifts (`translate -.3u -.4u`, no rotation — budget) and gains its own shadow. **N = 13. Floor: 72px**; at 48px a dotted card (fine at 40% dim).

### 2.12 Number-range dial (14:00)
`.hv6-clock` clone: 6u disc `#FDFBF6`, ring `inset 0 0 0 .3u #14322D`, three ticks .25×.7u at −60°/0°/60°, pointer coral .35×2.4u `transform-origin: 50% 90%`, `rotate 0→48deg` (a meaning rotation, not a tilt). Range labels only ≥120px. **N = 5. Floor: 40px.**

### 2.13 Theme cards (14:00, right)
Three 5×7u cards, top bands coral / teal / oak, offsets (0,0)(.6,.5)(1.2,1.0), all 0° (the tilt budget belongs to the spread); front card = one real theme thumbnail; one shadow under the stack. **N = 3 + shadow. Floor: 32px.**

### 2.14 The pencil (4 nodes)
Shaft .55×9u coral; ferrule .55×.7u oak; tip `polygon(0 0, 100% 0, 50% 100%)` .55×1u, `linear-gradient(180deg, #FBF3E4 0 70%, #14322D 70%)`; cap .55×.5u teal. Shared shadow. **Floor: 36px long.**

### 2.15 The worksheet — flat / propped / in flight / claim
| State | Transform | Shadow |
|---|---|---|
| scenery, flat on a desk | 3:4 card, real thumbnail, `--lie-deg 52`, 0° | shared, (.4,.5)u |
| claim, flat | `--lie-deg 28`, ≥16u wide, live header word (rule 10) | shared |
| propped (15:00, on the trolley handle) | `rotate(8deg)`, foot on y 39.6, `transform-origin: 50% 100%`, 14u wide (161px → header word 26px), the pen slip "made today, two o'clock" beside it | wedge `polygon(0 0,100% 40%,100% 100%,0 100%)` .7u |
| in flight (09:40) | enters from off-frame already airborne: `translate -26cqw 9cqw; rotate -25deg; scale 1.25` → lands at `--lie-deg 52` | **none** until landed |
Card `#FDFBF6`, seat `inset 0 -.08u 0 #D8CDB8` (flat), `border-radius: .1u .14u .1u .12u`; never the frame's mat ring. **N = 1 (+1 header) + shadow. Floor: 22px** for scenery; claim sheets have no floor below their 11px rule.

### 2.16 The inside of the classroom door (14:40) — the plans on the site's own paper
The felt noticeboard is DEAD (ruling 6/10). Same door as §2.5, seen from inside, in flow at real px:
| Piece | Build | Fill |
|---|---|---|
| leaf | box `min(100%, 720px)` × 4:5, `border-radius: 4px 5px 4px 4px`; lit stile `#8A6440` 6%; vision panel top 22% `#C3D3D9` flat; handle 34×9px ink | walnut |
| jamb + wall | cream wall `#FBF3E4` with the window slant (light only) either side | |
| pins ×4 | `<i>` disc 7px `#B8B4AC` steel; `::after` 2.2px ink dot at (62%,62%) | steel/ink |
| Sheet A (plans, landscape) · Sheet B (promises, portrait) | **printed on the site's own worksheet paper**: `#FDFBF6`, the worksheet margins (7% inset), the worksheet title font + Nunito body, the real `LCSAttribution` footer line at the foot; `rotate(-.9deg)` / `rotate(1.2deg)` = the frame's whole tilt budget | shared shadow |
| hour numeral | ink, on the paper, no card | |
**N = 2 + 4 + 2. Floor: n/a** (never below 320px).

### 2.17 Shelf plank
`.hv11-shelf-plank` verbatim; brackets `::before/::after` right triangles `polygon(0 0,100% 0,0 100%)` 1.4u walnut; top `#C2A884` 0–35%, face `#A88A63`. **Floor: 12px tall.**

### 2.18 The projector blind + throw + projected QR (13:00 down · 14:00 down · 15:00 up)
| Piece | Build | Fill |
|---|---|---|
| casing `<i>` | x 43.5→84.5, y 3.4→4.6, `border-radius: .3u .3u .1u .1u` | walnut, cut face per rule 5 |
| blind `<i>` | x 44.6→83.4, from y 4.6; DOWN: height 21u (covers the board to y 25.6); UP: .5u lip only; the drop = `clip-path: inset(0 0 100% 0)` → `inset(0)` over the snap, `steps(6, jump-end)` (a blind drops in stutters, not a glide); bottom rail .4u walnut | `#F6F1E6` flat |
| throw `<i>` | from the ceiling projector (off-frame, x 62, y −2) to the blind: `polygon(60% 0, 64% 0, 100% 100%, 0 100%)` over x 46→82, y 0→4.6 above the casing, then the lit rectangle ON the blind: `linear-gradient(180deg, rgba(255,250,235,0), rgba(255,250,235,.22))` (light; the only gradient in the act) | light |
| projected QR | the real `/homepage/qr.png` 8u at (**68**, 10.5) — right of centre (board centre 64), never centred; flat, no keystone | product |
| the dark | `.hv12-dusk` opacity → .58 on the snap; the board/blind is the brightest object; window casts fade to .06 (rule 2) | |
**N = 4. Floor: 40px** (blind + a dark rectangle read as "screen down"). At 15:00 the casing + lip only: the blind is up, west light in.

### 2.19 The sleeve cuff — NOT DRAWN (ruling 4; §4).
The 09:40 hand is the shrinking four-sheet stack: 4 cards offset (.15,.2)u, top card `rotate(-6deg)`, losing one at .25/.50/.75/.93. **N = 4.**

### 2.20 The chalk number line — `OpenNumberLine` recoloured (see 2.6). **Floor: 90px.**

### 2.21 THE SEATING PLAN — 25 hand-authored desks (ruling 5; no formula, no grid)
Five depth bands set the scale; x/y are the desk top's near-left corner. Shape: two pairs and a lone desk far right at the
back; a three-desk horseshoe back with two wings at bands B/C, open toward the board, its centre EMPTY; pairs at D; **one
desk alone by the window (D-13)** behind the teacher's desk along the left wall; the near band cropped by the frame edge.
Not symmetric about x = 50 (the teacher's desk owns the front-left). Poses per band: one out, one turned, one none.

| # | band | scale | x | y | pose (down) | pose (up) | notes |
|---|---|---|---|---|---|---|---|
| 1 | A | .62 | 38.0 | 40.9 | in | front | pair with 2 |
| 2 | A | .62 | 43.7 | 40.7 | in | side | |
| 3 | A | .62 | 57.5 | 41.0 | **out** | front | single |
| 4 | A | .62 | 66.0 | 40.6 | in | front | pair with 5 |
| 5 | A | .62 | 71.7 | 40.8 | **turned** | side | |
| 6 | A | .62 | 82.5 | 41.1 | **none** | none | alone, door side |
| 7 | B | .70 | 36.5 | 42.4 | **turned** | side | |
| 8 | B | .70 | 48.0 | 42.1 | in | front | horseshoe back L |
| 9 | B | .70 | 54.4 | 42.0 | **none** | none | horseshoe back M |
| 10 | B | .70 | 60.8 | 42.2 | in | side | horseshoe back R |
| 11 | B | .70 | 76.0 | 42.5 | **out** | front | pair with 12 |
| 12 | B | .70 | 82.4 | 42.3 | in | front | |
| 14 | C | .80 | 44.5 | 44.2 | **out** | front | horseshoe wing L |
| 15 | C | .80 | 65.0 | 44.0 | **turned** | side | horseshoe wing R |
| 16 | C | .80 | 78.5 | 44.4 | **none** | none | single |
| 13 | D | .90 | 5.0 | 47.6 | **turned** | side | **alone by the window** (clear of the teacher's desk, y > 47.4) |
| 17 | D | .90 | 37.0 | 46.2 | in | front | pair with 18 |
| 18 | D | .90 | 45.2 | 46.5 | **none** | none | |
| 19 | D | .90 | 60.5 | 46.0 | **out** | side | horseshoe's open end, off-axis |
| 20 | D | .90 | 74.0 | 46.7 | in | front | pair with 21 |
| 21 | D | .90 | 82.2 | 46.4 | in | front | |
| 22 | E | 1.0 | 22.0 | 49.2 | **none** | none | alone, in front of the teacher's desk |
| 23 | E | 1.0 | 40.0 | 49.6 | in | front | pair with 24; cropped by the frame foot |
| 24 | E | 1.0 | 49.1 | 49.3 | **out** | side | |
| 25 | E | 1.0 | 88.0 | 49.0 | **turned** | front | bleeds past the right edge |
Desk widths by band: 5.6 / 6.3 / 7.2 / 8.1 / 9.0u. Draw order = band A → E (near over far). 09:40 sheets, 13:00 screens
and 15:00 emptiness all use THIS table; the 09:40 river is this table sliding left as one card. The five "none" desks are
the same five all day (their chairs are in the reading corner, never drawn).

### 2.22 THE SPREAD — eleven sheets at 14:00 (ruling 7; no poker fan)
Overhead desk 100×50. Sheets 3:4. Two overlapping rows, the way paper lies; the visitor's sheet forward at **28u
(321px at 1366)**, her THREE LEVELS already on the desk before the spread. Tilt budget: one sheet per row.

| slot | row | w (u) | x | y | rot | z | note |
|---|---|---|---|---|---|---|---|
| L1–L3 (three levels, hers) | pre | 18 | 6 / 6.8 / 7.6 | 3 / 3.6 / 4.2 | 0 | 1–3 | stack, top = "bis 20" level word readable (18u → 26px header) |
| S1 | back | 20 | 30 | 2 | 0 | 4 | |
| S2 | back | 20 | 43 | 1.2 | 0 | 5 | |
| S3 | back | 20 | 56 | 2.4 | **−4°** | 6 | the back row's one tilt |
| S4 | back | 20 | 69 | 1.6 | 0 | 7 | |
| S5 | back | 20 | 82 | 2.2 | 0 | 8 | bleeds right |
| S6 | front | 22 | 24 | 18 | 0 | 9 | |
| S7 | front | 22 | 38 | 19 | 0 | 10 | |
| S8 | front | 22 | 66 | 18.5 | **+3°** | 11 | the front row's one tilt |
| S9 | front | 22 | 80 | 19.4 | 0 | 12 | |
| **V (visitor's)** | front-centre | **28** | 47 | 14 | 0 | 13 | lands nearest the lamp (§6.3); header word 26px+, label endonym · framework beneath in real text |
Overlap ≈ 35% within a row; row 2 covers row 1's lower third. The deal is order S1…S9 then V; L1–L3 are on the desk from
the plate's first frame. One shadow node per row (a long flat strip), not per sheet.

---

## 3. Do not draw it like this

| Anti-pattern | Failure |
|---|---|
| A soft gradient on a desk, chair, coat, bezel, door | Vector clip-art; the room stops being drawn. |
| Isometric cubes / extruded sides | Two perspective systems on one floor; the conic floor reads wrong. |
| `box-shadow` blur on every part, each its own offset | Stickers; the shadows stop sharing a sun and the `--sun` swing becomes 300 disagreements. |
| Dark outlines or strokes | Cartoon; doubles the node count. |
| A grid, equal spacing, a sine meander, a centred QR | A diagram / a formula. Only the hand-authored §2.21 and a right-of-centre throw read as a room. |
| Identical desks, identical chairs, a repeated sheet | Tiling. 25 real thumbnails; poses per §2.21; coats alternate. |
| A third tilted thing in a frame; a rotated hour card; coral pins; a felt board | The cork-board costume. The plans are on the site's paper, on the door, with steel pins. |
| A person, hand, cuff, silhouette, mascot | The valley opens at the first body part. |
| A rolling trolley, a lamp switching itself on, tubes snapping | Self-propelled furniture. The blind is the only light event and a hand off-frame pulled it. |
| A sun disc / cloud / bunting | Children's-book cliché; sky is a gradient because it is LIGHT. |
| Wobble filters, displacement, hand-drawn strokes | "Slightly imperfect" becomes shaky, and non-composited. |
| Wood grain on desks, fabric on coats | Noise is the wall's at ≤4.5%; grain on a 40px desk is mud. |
| A drawn fake worksheet; a claim sheet at 52° / 96px | Contradicts rule 10 and proves nothing. |
| A drop shadow on a flying sheet | "Paper stuck to glass". |

---

## 4. Presence without people — the protocol

**A person is shown by what a person has just done.** Every device is a part above:

| Device | Reads as | Act |
|---|---|---|
| chairs UP, three up-poses, five desks with no chair | "she has not arrived; she set the trolley up last night" | 08:00 |
| the light band waking parked instruments | "the sun, not a hand" | 08:20 |
| chairs DOWN with the §2.21 poses (out / turned / none per band); coats, no two alike; sheets entering already airborne; the stack shrinking | "they are here; a hand off-frame is handing out" | 09:40 |
| the empty pulled-out chair crossing the corner, the pencil still, the tablet checking itself | "she is walking the room" | 11:00 |
| the blind down, the QR thrown, 25 screens on one beat | "the class" | 13:00 |
| the blind still down, one lamp, three sheets already made | "after the last child left" | 14:00 |
| the plans pinned inside the door where the fire drill hangs | "the staff, the school" | 14:40 |
| the propped sheet with its pen slip, the door open, the blind up | "tomorrow is ready; she has gone" | 15:00 |

**09:40 "unseen hand" — ruling: no cuff, ever.** (1) Ruling 4 and the AD rule both say no hands; a cuff is the first 5 cm of one, and the brain completes the arm wrongly at 40–60px (a tissue, an artefact). (2) There is no correct drawing of it in this language: a skin gap breaks rule 9, no gap is an amputation. (3) The information is already carried: every sheet's `from` offset is relative to its desk, so the origin is one corner, and the four-sheet stack shrinks in step — the stack IS the hand. (4) Consistency: at 11:00 the chair is the person, at 15:00 the propped sheet is. (5) Two nodes and one review argument saved ×11. What is lost ("from your hand") the caption may say; the drawing may not.

---

## 5. Contact-sheet plan (nobody ever looked at the art)

Every part in §2 is rendered ALONE on its true ground (oak / wall green / the veil-dimmed oak) at **48 / 96 / 192 /
384 px**, both light states where it has two, BEFORE placement. The reviewer reads the sheet, not the page. Highest-risk parts:

| Part | 48px — reject if | 96px — reject if | 192px — reject if | 384px — reject if |
|---|---|---|---|---|
| desk (each pose) | not "table + chair" in 1s; legs and chair one block | "out" and "turned" indistinguishable from "in" (accepted only <40px) | top looks tilted, not receding | deviation reads as a mistake (>.3u) |
| desk, chair up (3 poses) | legs vanish → `.is-tiny` | "side" reads as a crown | slab floats | splay reads cartoon |
| window bay | no cross | reveal same value as sky | horizontal bar is level | banding |
| door open / inside face | opening not brighter than wall | leaf slab missing / pins invisible | corridor reads as a room | pinned sheet tilt >1.2°; the attribution footer missing |
| board + frame | frame lost (OK) | frame's mat ring covers the walnut (the 0.42/0.55 trap) | swipe reads as a smear | noise visible as grain |
| trolley | reads as a plinth (castors lost) | handle lost | lit top reads as an object gradient (must stay a thin face) | castor dot missing |
| blind + throw + QR | dark rectangle only (OK) | QR centred (must sit at x 68) | throw wedge reads as a beam of paint (must be ≤.22 alpha) | blind glides (must step) |
| coat | a chip | a leaf/shield | adjacent colours equal | torn vertex |
| lamp | arm gone (OK) | shade+glow read as a hole | joint kinks wrong way | glow bleeds inside the rim |
| tablet + 11:00 sheet | bezel lost | bezel >18% | header word <11px x-height (FAIL, gated) | any sheen |
| trays / dial / cards | smudge (OK at 40% dim) | tiles merge | pointer origin off | labels present <120px |
| pencil | a dash (OK) | tip not a triangle | graphite not distinct | eraser reads as a second pencil |
| sheet: scenery / claim / propped / flight | not white-on-oak | claim word unreadable (FAIL) | propped shadow a blob, not a wedge | flying sheet has a shadow; lie angle differs from its desk |
| the pair (08:00) | — | — | either word <11px x-height or the pair not the largest foreground objects on the desk | a third tilt in frame |
| the spread (14:00) | — | rows read as a fan (angles) | V <320px or its word unreadable | more than two tilts |

Four questions at every size: *what is it?* (one word, one second) · *where is its foot?* · *which way is the light?*
(every shadow agrees) · *is any gradient not light?* Any "no" = redraw; never "place it and see".

---

## 6. Three ideas a jury would stop for (within the law)

**1. The light is the most drawn thing in the room: the casts carry the mullion's cross.** The window casts are POSITIVE
paper shapes on the floor (the two lozenges, `rgba(225,240,245,.32)`), each with the window's mullion cut through it as a
dark cross of floor colour (a second clip-path on the cast, the cross converging with the lozenge). The cast is a
transform consumer of `--sun` (skew + scaleX), so the cross stretches with the hour: two long crossed lozenges under the
chairs at 08:00; short, blue-grey and crossed at 11:00; gone under the blind; at 15:00 the door's orange lozenges reach
in from the other side with NO cross (a door has no mullion). Every competitor draws light as a glow; nobody draws it as
a cut shape. Two nodes, one property.

**2. The class is drawn by the light of its own screens.** When the blind drops, rule 2's shadow group fades to .06 and
the room goes dark except the throw; then the 25 screens light on one beat, and each screen's own light lands on its
desk top as a small cream rectangle — the shadow node's twin, `rgba(255,250,235,.28)`, same anchor, same node type,
inverted (`.hv12-screen-light`). Twenty-five small lit desks on the §2.21 seating plan, no faces, no grid: the room is
suddenly visible again BY the product, and the visitor reads the plan's asymmetry (the horseshoe, the lone desk by the
window) in the dark for the first time.

**3. The lamp's pool deals the languages.** At 14:00 the spread lands under the veil; only sheets INSIDE the pool are in
colour, the rest are dim cream shapes, and as the pool widens (`scale 1→1.55`) it reads them into colour one by one — the
visitor's sheet first, because V (§2.22) lands nearest `--px/--py`. The light selects the language. No new node: the pool
is the veil's hole, the deal already exists; only the landing order changes.

(Reserve: the wall clock's own shadow on the plaster at 08:00, long at dawn and gone by 11:00 — the same rule-2 node.)
