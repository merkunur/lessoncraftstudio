# 005 — Mend the Harbour Wall

## Identity
- Slug: `shape-sorter`
- Subject / topic: Mathematics / 2D shapes — circle, square, triangle, rectangle — recognised in any orientation and size
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap where it goes)
- Frame: THE ROUNDS
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Frame contract: `design/MISSIONS.md` FRAME 5. Law: `design/GAME-DESIGN-LAW.md`.

**Why this frame and not another, checked rather than looked up.** THE OPENING is quantitative (*the amount you supply is the size of the aperture*) and there is no quantity here. THE SPAN is composition-to-an-extent; this wall is not about extent, it is about which stone belongs where. THE FERRY moves a stream past a compatibility rule and would work, but its signature progress — two counts moving in opposite directions — is not what this content is about, and a boat does not sit low because a triangle is skinny. THE CROSSING would put the shapes on the ground the hero steps on, which collapses this game into 002. THE ROUNDS is P8's declared native home (25 games) and it is right here for a reason, not by table lookup.

## Learning
- Objective: Sorts circles, squares, triangles and rectangles into the right bin regardless of the shape's rotation, size or fill.
- Prerequisites: None beyond tapping. The bins carry a prototype-pose icon; the child does not need to read.
- Curriculum links: F-1 (2D/3D shapes in 11 of 15 sources), F-4, F-21, F-31 row "2D shapes named (4 basic)" — conservative age 6-7, earliest 4 → 5-6 (US K.G.A.2 "correctly name shapes regardless of their orientations or overall size"; England Reception ELG / Y1 "recognise and name common 2-D shapes"; Germany Klasse 1 "ebene Figuren"; France GS "reconnaître … carré, triangle, rond, rectangle"; Spain Infantil; Brazil EF01MA14 (4 shapes); Sweden förskoleklass "geometriska objekt"; Norway 1. trinn).
- Common misconceptions (F-115), each with this game's response:
  1. **Prototype orientation — a rotated square is "a diamond, not a square"; a triangle standing on a point is "not a triangle".** Response: stones arrive at every rotation, and **a rotated square seats in the square gap** — the crab turns it in its claws as it beds, so the child watches a "diamond" become a square by turning and go into the wall. `ANIM.turnToFit` is no longer an explanatory animation, it is the act of fitting. When a rotated stone is pushed at the wrong gap the world freezes and the crab holds it beside the **correct** gap, turning it slowly (400 ms) until its outline lies on the gap's outline, holding 600 ms, then turning it back (400 ms) — **1400 ms**, and the misconception is refuted by the wall rather than explained by a cue.
  2. **Skinny / obtuse triangles are "not triangles".** Response: L2 introduces long and obtuse triangles; on a refusal the world freezes and the three sides of the stone in the claws glow one at a time (`ART.sideGlow`, `tone("tap", k)`, 300 ms apart) with `ART.countBadge` "3" at its top-right, **then the triangular gap's own three sides glow in the same order** — three sides here, three sides there. ~2200 ms. The correction now names the property the stone and the gap SHARE instead of pointing at a bin icon. Note the geometric honesty this forces: a skinny triangle does not tessellate a prototype triangular hole, so **the fit in this game is silhouette nesting, not exact plugging** — every gap is cut to the largest stone of its kind, a correct stone always beds with visible surround, and the wall's rubble closes around it, which is what masonry does.
  3. **Square vs rectangle — a square goes in the rectangle bin (or the reverse).** Response: at L1 and L2 the square gap and the rectangle gap are never both live (the wall carries three gaps, never four), so the distinction is not tested before it is taught; at L3 both are live and **a square pushed into the rectangular gap BEDS** — it settles with a surround all round, `tone("correct")`, and the closing course shows `ART.squareInRect` for 1200 ms. Mathematically a square is a rectangle and the wall never says otherwise. A rectangle pushed into the square gap stops with **its two long ends standing proud, by exactly how much it is too long**, and those two long sides then glow (~1600 ms) — the child sees the overhang instead of being told about it.
  4. **Sorting by colour or size instead of shape.** Response: the fill token is drawn per item from three cream/teal tints and the stone's size varies within its kind, so colour and size are never a valid cue — and the defence is now structural in two further ways. **A gap has no fill at all** (it is an absence cut in the wall), so colour cannot be matched. And **every gap is cut to the largest stone of its kind, so a small triangle and a large triangle bed in the same gap**, which makes size unable to predict a destination. On a colour-based or size-based error the standard refusal plus the kind cue plays. This response is structural rather than enacted — it was structural in the original too, and no animation has been invented to make the count look better.

## Mission
- **Mission, as the child would say it.** *Mend the wall so the little ones can come out.*
- **Hero.** The crab (`ART.crab`), the wall's mason. It is the only thing on the stage that can carry a stone, and it works the quay in front of the wall. It never comments and never approves; it is the transport and the hands. Deliberately **unnamed** — `check-redundancy` flags name-collisions with the 204 free activities, whose characters are already named, and a named mascot alone does not differentiate (MISSIONS.md §7). It is "the crab", the way a five-year-old would say it.
- **The want (the visible lack).** A storm has knocked gaps in the harbour wall. Behind it, on the last intact stretch at the right, three crablings (`ART.crabling`) sit still, unable to come out onto the rocks. A dashed line across the whole stage at y = 104 (`ART.copingLine`) shows how high the wall has to be. One stone lies on the beach below. That is the entire premise and it is carried by the picture alone — **zero English words on the play screen** (F-42's text budget; a mission buys no exemption). A still frame at 400 px shows a hole, someone waiting on the far side of it, a line the wall does not reach, and a stone.
- **The goal (L3 — visible destination).** Every column's top reaches the coping line. Its (x, y) never changes for the whole session.
- **The single state variable `S` — the built state of the wall:** which stones are seated in which of the three columns, and therefore how high each column stands.
  - **Mathematical reading.** The running record of classifications. Each seated stone is one shape correctly identified, and *which column it sits in IS the classification*. The record is not a tally of how many were right — it is the sorted set itself, laid out where the child can see every decision they made.
  - **Physical reading.** How much wall stands, and where the gaps still are.
  - **Transition function.** A stone may be added at column *c* **iff `kind(stone) ∈ acceptedBy(socket(c))`**. **Goal predicate:** every column's top has reached y = 104.
- **The isomorphism — classification IS fitting.** A category is not a label on a box; it is a shape of absence in the wall. To classify a stone the child lays two silhouettes against each other — the stone's outline and the gap's outline — which at five *is* what naming a shape consists of. Nothing is compared to a stored value; the wall either takes the stone or it does not.
- **Displacement (GAME-DESIGN-LAW §2.3), stated exactly.** `answer = f(crab.x)`. Tapping a column head is a **movement command**: the crab scuttles to that station. The push is caused by **arrival**, and the commit reads the crab's own x:
  ```js
  onHeadTap(c)   { moveCrabTo(COL_X[c]); }               // names a PLACE, returns no verdict
  onCrabArrive() { if (crab.holding) push(); }
  push()         { var sock = wall.socketAt(crab.x);      // the world is asked
                   var bed  = fits(crab.stone.kind, sock.kind); }
  ```
  **There is no `answer` field on an item anywhere in the file, and no `===` against one.** An item stores a stone — `{kind, variant, angle, scale, fill}` — and the wall stores its live socket kinds. The generator draws the stone's kind FROM the three live gaps, so the correct destination is **emergent from the world's state, never stored**. That is the Single-State Law satisfied, and it is checkable by grep.
- **The mark that stays.** Every seated stone raises its column by one course and stays there for the rest of the session — the object in its new state, never a token awarded for it (F-66). Nothing empties, nothing decays, nothing can be taken back.

## World
Fixed 720 × 560, `Scale.FIT`, static camera, zero camera tweens.

```
y   0 +----------------------------------------------------------------+
      | [lang 16,16]                                          zone T    |   0- 56  chrome only
 56   +----------------------------------------------------------------+
      |                                             o  o  o  crablings  |  (645,86)(668,84)(691,88)
104   |- - - - - - - -  THE COPING LINE  y=104  - - - - - - - -+-------+|  dashed, x 30->690, NEVER moves
      |    +-------+       +-------+       +-------+           |#######||
133   |    |  /\   |       |       |       |       |  gap A4   |#######||  intact stretch x 630-700
142   |    +-------+       |   O   |       |   []  |  gaps B3/C3|#######||
      |    |#######|       +-------+       +-------+           |#######||
218   |    |#######|       |#######|       |#######|           |#######||
      |    |#######|       |#######|       |#######|           |#######||
294   |    |#######|       |#######|       |#######|           |#######||
332   +====+=======+=======+=======+=======+=======+===========+=======++  WALL FOOT y=332
      |         [crab]  <stone>        surviving footing y 332-400       |  zone W ends 420
400   +----------------------------------------------------------------+  QUAY top y=400
420   +----------------------------------------------------------------+
      |                    < the stone >  (360,486) 120x120   zone H    |
560   +----------------------------------------------------------------+
```

**Zone W (56-420) — the world.** Board, hero, destination and history are all in here, and the hero never leaves it.

- **The coping line (the goal, MISSIONS.md L3).** `ART.copingLine`, dashed `line`-token stroke 4 px, (30, 104) → (690, 104). On screen from tap one, unchanged for the whole session.
- **The waiting party (Device 1).** Three `ART.crabling`, 34 px, on top of the intact stretch at (645, 86), (668, 84), (691, 88), facing left toward the gaps. **Still — no idle bob, no reaction to a correct stone, no movement of any kind until the Finish.** MISSIONS.md §6.3 has a crabling shuffling one step closer on every correct fit; §5 Device 1 forbids exactly that (*a waiting party that reacts to each correct answer becomes an approval meter*, F-44's banned shape). This spec follows §5. §6.3 needs correcting.
- **The intact stretch.** `ART.wallIntact`, x 630-700, y 104-400. The undamaged wall; it is why the coping line is credible.
- **The surviving footing.** `ART.footing`, y 332-400 across all three columns. The storm took the upper courses; the footings held. This is the band the crab works in front of, which is why **no gap is ever behind the hero**.
- **The quay.** `ART.quay`, (20, 400) → (700, 420), top edge line at y = 400 — the crab's standing line, drawn in front of the wall.
- **Three columns**, fixed all session, each **160 wide**: **A x = 150** (spans 70-230) · **B x = 340** (260-420) · **C x = 530** (450-610). Gaps of 30 px between, 20 px to the intact stretch.
- **Course arithmetic — load-bearing, do not retune one number without re-deriving the rest.** The open wall spans y 332 → 104 = **228 px**. Column A was smashed one course deeper and is dressed in shorter stones: **4 courses of 57** (tops 332 → 275 → 218 → 161 → 104). Columns B and C are dressed in taller stones: **3 courses of 76** (tops 332 → 256 → 180 → 104). **4 + 3 + 3 = exactly 10 items**, and all three reach a level coping.
- **A gap** is a course-tall notch (`ART.socketNotch`, 160 × the column's course height) with a prototype silhouette cut into it (`ART.socketCircle` / `ART.socketSquare` / `ART.socketRect` / `ART.socketTriangle`) drawn as a `bg` absence with a `line` edge. **The notch is identical in every column and for every kind — only the silhouette differs. The bounding box carries no information; the outline carries all of it.**
  Gap centres — **A:** (150, 304) (150, 247) (150, 190) (150, 133). **B:** (340, 294) (340, 218) (340, 142). **C:** (530, 294) (530, 218) (530, 142).
- **Tap target** = the whole **column head, 160 × 84**, centred on that column's live gap. ≥ 80 px on both axes at band 5-6, gaps of 30 px between heads.
- **The crab.** `ART.crab` 64 px, drawn at (crab.x − 44, 368), feet on the quay at y = 400, top at y = 332 — **exactly the height of the wall foot, so it never covers a gap**. `crab.x` is the model value and takes the column centres {150, 340, 530}; it starts at 340 and **persists between items** (MISSIONS.md L2). The held stone is drawn beside it at (crab.x + 40, 362), inside the same column footprint. The crab never leaves the quay and never leaves zone W.

**Zone H (420-560) — the hand. One control.** `ART.beachWash` is a low-contrast `surface2` band across it (the one scene element on the screen, ART-BIBLE §4). The stone washes up at **(360, 486)** as a 120 × 120 tap tile carrying the item's shape at its own rotation, size and fill token, with `ART.stoneShadow` under it. Nothing else is here: no tray, no bin row, no keypad, no Check button, no caption. Zone H is one control of a permitted five.

## How it plays

**Boot.** `ART.crab` at (360, 210) in `idle`, the game title beneath it, `makeButton` `t("start")` at (360, 400), language picker at (16, 16). Never auto-starts.

**The world is drawn once and does not reset.** Tap Start: the three columns stand at their storm heights, the coping line is dashed across the top, three crablings sit on the intact stretch, the crab stands at column B (crab.x = 340) with empty claws, and the first stone slides up onto the beach (`ANIM.slideIn`, 320 ms, from below the stage to (360, 486)). Then the stage **freezes** — zero tweens running, every target enabled. This is DECIDE (F-42).

**Item 1 — a correct round, in full.** The three live gaps are triangle at A, circle at B, square at C. The stone on the beach is a triangle at 0°, 88 × 46, `structureSoft`.

1. **Tap the stone.** It rises into the crab's claws (`ANIM.lift`, 380 ms, to (crab.x + 40, 362) at its own rotation), `tone("tap")`, the crab swaps to `ART.crabAct`. ACT ends; the stage freezes again. The first tap is not a decision — there is one stone, which is correct for P8 at this band. **The decision is the second tap, and there is exactly one decision per item.**
2. **Tap a column head.** Say column A. The crab scuttles left along the quay from 340 to 150 with the stone in its claws (`ANIM.scuttle`, ≤ 480 ms over ≤ 380 px). It arrives. **Arrival causes the push**, and the push asks the wall: `fits(triangle, socketAt(150).kind)`.
3. **The wall takes it.** The stone travels up the column face into the gap (`ANIM.raise`, 320 ms) and beds (`ANIM.seat`, 200 ms — the seat tween always turns the stone to the gap's prototype angle, so a rotated stone is turned as it beds). The course closes: the column face grows by 57 px with a new `ART.courseMark` across it (`ANIM.courseClose`, 260 ms), and the gap is re-cut one course higher at (150, 247) in a **different shape**. `tone("correct")`. A praise pop plays on every third correct item and on the tenth, never on every one.
4. **Feedback is inside 300 ms of the commit** (F-40): the bedding begins the frame after arrival; the scuttle sits between the *tap* and the commit, never between the commit and the feedback.
5. The next stone slides up onto the beach after 400 ms. The crab stays at column A. **Item 2 begins where item 1 ended.**

**Item 4 — a wrong push, attempt 1.** Live gaps: rectangle at A, circle at B, triangle at C. The stone is a thin rectangle at 30°, 112 × 30. The child sends the crab to column C.

- The crab arrives at 530, raises the stone, and it **stops at the mouth of the triangular gap**. For 500 ms the mismatch is shown, not described: `ART.gapOutline` (the gap's silhouette, dashed `accent`) is drawn over the stone so the two outlines are visibly different, and **the part that does not fit stands proud** (`ANIM.proudHold`). `tone("nudge")`. Then the stone lowers back into the claws (`ANIM.lower`, 260 ms) — **still held**.
- Then the world **freezes** and the enacted correction for that error type plays on the stone in the claws (Rules). Nothing happens to the crab: its pose in the wrong-answer frame is identical to the correct-answer frame except that it is still holding the stone.
- **Attempt 2 costs one tap**, because the crab never put the stone down. Tap column A; the crab scuttles; the rectangle beds.

**Item 9 — a second wrong push.** The cue plays again, then `ART.showRing` appears around the correct gap's edge (`ANIM.showMe`) and stays. Sending the crab there completes the item as **solved-with-help**. There is no attempt 4 and no item ever ends unsolved.

**Tapping a column head with empty claws.** That gap's silhouette ghosts once (`ANIM.ghost`, 400 ms) — the harmless preview, carried over from the original. The crab does not move and nothing else happens.

**What never happens.** The crab does not fall, wobble, look sad, get splashed, drop anything or change pose. Nothing seated ever comes out. The wall never falls. The crablings never react. The coping line never moves. There is no red anywhere: the proud edge, the side glows and the show-me ring all use the single `accent` coral, one accent per screen.

**Finish.** The wall is mended and level to the coping, and **the ten stones are all still visible in place at their play coordinates** — the session's ten classifications, drawn as a wall, sorted by column. Only now do the crablings move: the three of them file along the coping from the intact stretch and spread out across the whole top (`ANIM.crablingsFile`, 900 ms), and `ART.crabHappy` climbs up among them. `t("all_done")` at (360, 448); `makeButton` `t("play_again")` at (250, 512) and `t("menu")` at (470, 512); `tone("finish")` once; `ANIM.celebrate` on the crab.
**No score, no counts, no stars, no first-try record shown.** The finish is a destination, not a report. Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  crab:          { kind: "svg", value: LCSArt.get("crab.idle"),  size: 64, fallback: "🦀" },
  crabAct:       { kind: "svg", value: LCSArt.get("crab.act"),   size: 64 },   // claws out, holding
  crabHappy:     { kind: "svg", value: LCSArt.get("crab.happy"), size: 64 },   // finish only
  crabling:      { kind: "svg", value: LCSArt.get("crab.young"), size: 34 },

  copingLine:    { kind: "shape", shape: "line", w: 660, stroke: "line", strokeWidth: 4 },      // dashed 12/10
  wallIntact:    { kind: "shape", shape: "rect", w: 70,  h: 296, fill: "surface2", stroke: "line", strokeWidth: 2 },
  columnFace:    { kind: "shape", shape: "rect", w: 160, h: 57,  fill: "surface2", stroke: "line", strokeWidth: 2 },
  footing:       { kind: "shape", shape: "rect", w: 160, h: 68,  fill: "surface2", stroke: "line", strokeWidth: 2 },
  courseMark:    { kind: "shape", shape: "line", w: 160, stroke: "line", strokeWidth: 2 },
  quay:          { kind: "shape", shape: "rect", w: 680, h: 20,  fill: "surface2", stroke: "line", strokeWidth: 2 },
  beachWash:     { kind: "shape", shape: "roundRect", w: 680, h: 120, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 18 },

  socketNotch:   { kind: "shape", shape: "rect", w: 160, h: 57, fill: "bg", stroke: "line", strokeWidth: 2 },  // h set per column course
  socketCircle:  { kind: "shape", shape: "circle",  r: 28, fill: "bg", stroke: "line", strokeWidth: 3 },
  socketSquare:  { kind: "shape", shape: "rect", w: 56, h: 56, fill: "bg", stroke: "line", strokeWidth: 3 },
  socketRect:    { kind: "shape", shape: "rect", w: 118, h: 46, fill: "bg", stroke: "line", strokeWidth: 3 },
  socketTriangle:{ kind: "shape", shape: "polygon", points: [[0,-28],[59,28],[-59,28]], fill: "bg", stroke: "line", strokeWidth: 3 },

  stoneCircle:   { kind: "shape", shape: "circle", r: 25, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneSquare:   { kind: "shape", shape: "rect", w: 50, h: 50, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneRect:     { kind: "shape", shape: "rect", w: 96, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneRectThin: { kind: "shape", shape: "rect", w: 112, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneTriangle: { kind: "shape", shape: "polygon", points: [[0,-23],[44,23],[-44,23]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneTriSkinny:{ kind: "shape", shape: "polygon", points: [[0,-25],[18,25],[-18,25]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneTriObtuse:{ kind: "shape", shape: "polygon", points: [[-56,17],[56,17],[30,-17]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stoneShadow:   { kind: "shape", shape: "ellipse", w: 84, h: 14, fill: "ink" },                 // alpha 0.08 at draw

  gapOutline:    { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 3 },        // dashed 8/6, traced round the gap silhouette
  sideGlow:      { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 6 },        // one side; length set at runtime
  countBadge:    { kind: "shape", shape: "circle", r: 16, fill: "structure" },                    // numeral on it, 20 px display, colour bg
  squareInRect:  { kind: "shape", shape: "rect", w: 30, h: 30, stroke: "structure", strokeWidth: 2 },
  showRing:      { kind: "shape", shape: "roundRect", w: 168, h: 92, stroke: "structure", strokeWidth: 4, radius: 18 }
};
```
**Fill variation.** Per item the stone's `fill` token is drawn from `structureSoft`, `surface2`, `bg` — three cream/teal tints, never a strong hue, never the cue. A gap has **no fill token at all** (`bg`, the paper showing through), so a stone can never be matched to a gap by colour.
**Colour-blind safety.** Stone identity is carried by outline geometry, gap identity by silhouette geometry, the chosen state by the stone being in the claws, and the refusal by an outline that visibly does not coincide. No entry declares a dot-progress token: progress is the wall.
**Style.** Stones are **cut stone — true circles and true polygons, flat fill, `structure` outline — never lumpy naturalistic boulders**: in a geometry game the abstract notation IS the figure, so the child is looking straight at the mathematical object at the moment of the answer (GAME-DESIGN-LAW §2.5). The only numeral in the game is the "3" on `ART.countBadge`, and it appears in frame, on the stone, at the moment of correction.

## Animation registry
```js
const ANIM = {
  slideIn:       { y: 486, duration: 320, ease: "Sine.Out", trigger: "a stone washes up from below the stage to (360,486)" },
  lift:          { duration: 380, ease: "Sine.Out", trigger: "beach stone -> the crab's claws at (crab.x+40, 362); x,y set at call" },
  scuttle:       { duration: 480, ease: "Sine.InOut", trigger: "crab (and its held stone) travel in x to the tapped station; x set at call" },
  raise:         { duration: 320, ease: "Sine.Out", trigger: "held stone travels up the column face to the gap centre; x,y set at call" },
  seat:          { scale: 1.0, angle: 0, duration: 200, ease: "Back.Out", trigger: "the stone beds; angle always resolves to the gap's prototype angle" },
  courseClose:   { duration: 260, ease: "Sine.Out", trigger: "the column face grows one course and the next gap is cut higher; h set at call" },
  proudHold:     { duration: 500, ease: "Sine.InOut", trigger: "a refused stone stops at the mouth with the misfitting part outside the silhouette" },
  lower:         { duration: 260, ease: "Sine.InOut", trigger: "the refused stone returns to the claws; x,y set at call" },
  turnToFit:     { angle: 0, duration: 400, ease: "Sine.InOut", yoyo: true, hold: 600, trigger: "misconception 1 — the stone turns until its outline lies on the correct gap's, then turns back" },
  rollLoose:     { angle: 14, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a round stone rolls in a gap that is not round — it has no bearing faces" },
  glow:          { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each sideGlow in turn from alpha 0, 300 ms apart" },
  ghost:         { alpha: 1, duration: 200, ease: "Sine.InOut", yoyo: true, hold: 200, trigger: "a column head tapped with empty claws — its silhouette ghosts once" },
  showMe:        { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct gap after the second miss (from alpha 0.2)" },
  crablingsFile: { duration: 900, ease: "Sine.InOut", trigger: "finish only — the crablings spread along the mended coping; x set at call" },
  celebrate:     { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish crab" }
};
```
**The two-beat cycle (F-42).** Play runs DECIDE (frozen — zero tweens, every target enabled, the crab in one static pose) → ACT (≤ 1200 ms, always caused by a tap, then frozen again). Worst case per item: lift 380 + scuttle 480 + raise 320 = **1180 ms**, so total ACT across a 10-item session is ~12 s — an order of magnitude inside the 60 s session budget, precisely because moves are one station and the stations are adjacent.

## Screen layout
```
y   0 +----------------------------------------------------------------+
      | [lang 16,16]                                                    |  zone T  0-56
 56   +----------------------------------------------------------------+
      |                                          o o o  (645,86)(668,84)|          crablings, 34 px
104   |= = = = = = =  coping line y=104, x 30->690  = = = = = =+--------+|          NEVER moves
      |   +------+        +------+        +------+             |########||
      |   | gap  |        |      |        |      |   A: 4 courses of 57 ||          intact stretch
      |   +------+        | gap  |        |      |   B,C: 3 of 76        ||          x 630-700
      |   |######|        +------+        | gap  |                       ||
      |   |######|        |######|        +------+                       ||
      |   |######|        |######|        |######|                       ||
332   +===+======+========+======+========+======+=======================++  wall foot y=332
      |  A x=150         B x=340         C x=530     footing y 332-400    |
      |     [crab 64 px, (crab.x-44, 368)]  <held stone (crab.x+40, 362)> |
400   +----------------------------------------------------------------+  quay top y=400, strip to 420
420   +----------------------------------------------------------------+
      |                                                                |  zone H 420-560
      |                  < the stone >  120x120 at (360,486)            |
560   +----------------------------------------------------------------+
```
Column heads (the tap targets) are 160 × 84 centred on each column's live gap; column A's gap centres run (150, 304 / 247 / 190 / 133) and columns B and C's run (340 or 530, 294 / 218 / 142). Fixed layout, FIT scaling, no scrolling, static camera. **Progress is diegetic — the wall rising toward the coping line — and there is no abstract progress display of any kind on the play surface.**

## Visual specification
- Background `THEME.colour.bg`. One scene element: `ART.beachWash` centred (360, 490) in zone H.
- `ART.copingLine` (30, 104) → (690, 104), dashed 12/10, `line` token, 4 px. Drawn behind the columns so a mended column's top meets it.
- `ART.wallIntact` at (665, 252), 70 × 296, with `ART.courseMark` every 74 px across it. `ART.crabling` × 3 at (645, 86), (668, 84), (691, 88), all facing left, all static.
- `ART.footing` × 3 at (150, 366), (340, 366), (530, 366), 160 × 68, each with `ART.courseMark` at its mid-height. `ART.quay` centred (360, 410), 680 × 20, its top edge a 2 px `line` at y = 400.
- **A built column** is a stack of `ART.columnFace` blocks (160 × 57 in A, 160 × 76 in B and C) from the footing up to the current course top, each separated by `ART.courseMark`, with the seated stone drawn inside its own course at the size and fill it arrived with — **the record stays visible, at its play coordinates, to the end of the session and onto the Finish screen.**
- **A gap** is `ART.socketNotch` (160 wide, the column's course height) with one of `ART.socketCircle` / `ART.socketSquare` / `ART.socketRect` / `ART.socketTriangle` cut into its centre at the prototype angle, `bg` fill, `line` 3 px edge. The notch is identical in every column and for every kind; **only the silhouette differs.**
- The crab: `ART.crab` at (crab.x − 44, 368) during DECIDE, `ART.crabAct` while it holds a stone, `ART.crabHappy` on the Finish screen; `ART.stoneShadow` under it at 8% alpha.
- The held stone: the item's shape entry drawn at (crab.x + 40, 362) at its own angle and scale, capped at 112 px wide so it stays inside the column footprint and clear of the intact stretch. The beach stone: the same entry inside a 120 × 120 `makeTile` at (360, 486) with `ART.stoneShadow` beneath.
- Cue art: `ART.gapOutline` traced round the live gap's silhouette and over the refused stone; `ART.sideGlow` along one side of the stone or of the gap in turn; `ART.countBadge` at the stone's top-right with "3" at 20 px `THEME.font.display` in `THEME.colour.bg`; `ART.squareInRect` inside `ART.socketRect`'s closing course when a square beds there; `ART.showRing` around the correct column head.
- Tap floors: the beach stone 120 × 120; each column head 160 × 84 (both ≥ 80 at band 5-6). Gaps between heads 30 px (≥ 12). Every interactive element ≥ 16 px from the stage edge.
- Interactive elements: **crab (1, drawn not tapped) + 3 column heads + 1 beach stone = 5**, well inside the ≤ 10 budget under either reading of F-69, so this game does not depend on the instrument ruling.

## Content
Language-neutral; there is no text on the play screen. Kinds are written **O** circle, **S** square, **R** rectangle, **T** triangle.

**1 · The wall (fixed).** Column A takes 4 stones, columns B and C take 3 each — 10 items, one level coping.

**2 · The cut schedule — how the three live kinds are produced.** At Play start the destination sequence is generated by rejection sampling: a random order of destinations with quotas A = 4, B = 3, C = 3 and **no two consecutive destinations the same** (BUILD-CONVENTIONS §13 in its fixed-world form — *never the same category twice running*, which here is the same thing, because kind and column are one-to-one at any moment). Then, at each step:
1. `dest` = the next destination in that sequence;
2. **`kind` = the kind of the gap standing in `dest`** — the stone's shape is read off the wall, never stored on the item;
3. `pose` = drawn from the current level's pool for that kind (below), never repeating a pose within a session;
4. after the stone beds, **the three live kinds are re-dealt across the three columns** subject to: (i) the column that just took a stone is cut to a kind **different from the one it just took**; (ii) the three live kinds stay distinct; (iii) **before L3 the live set never contains both S and R**; (iv) a full column is not cut. Where a level change makes the current live set illegal, the next re-deal brings it into line.

**Level pools.** L1 and L2 live from `{O, T, X}` with `X` either S or R — with four kinds and the square/rectangle exclusion these are the only two legal triples, so O and T are always live below L3. `X` may change only at a re-deal, and only in the column that has just taken a stone. L3 lives from all four kinds, three at a time, and square and rectangle may be co-present — which is the level's whole point.

**3 · The canonical reference schedule** (the run the build is tested against; a real session re-samples the destination order and the re-deals, and the level column assumes the standard ladder).

| # | dest | live A | live B | live C | seats | level | pose |
|---|---|---|---|---|---|---|---|
| 1 | A | **T** | O | S | T | L1 | `stoneTriangle` 0°, s 1.00, `structureSoft` |
| 2 | B | S | **O** | T | O | L1 | `stoneCircle` 0°, s 1.00, `surface2` |
| 3 | C | O | T | **S** | S | L1 | `stoneSquare` 90°, s 1.00, `bg` |
| 4 | A | **R** | O | T | R | L2 | `stoneRectThin` 30°, s 1.00, `structureSoft` |
| 5 | B | T | **O** | R | O | L2 | `stoneCircle` 0°, s 0.86, `bg` |
| 6 | A | **T** | R | O | T | L2 | `stoneTriSkinny` 200°, s 1.00, `surface2` |
| 7 | C | S | R | **O** | O | L3 | `stoneCircle` 0°, s 0.72, `structureSoft` |
| 8 | B | S | **R** | T | R | L3 | `stoneRect` 90°, s 0.86, `surface2` |
| 9 | C | S | full | **T** | T | L3 | `stoneTriObtuse` 120°, s 1.00, `bg` |
| 10 | A | **S** | full | full | S | L3 | `stoneSquare` 45°, s 0.86, `structureSoft` |

Seated kinds across the run: T×3, O×3, S×2, R×2, no two the same in a row. The last stone is a square at 45° going into the square gap — misconception 1 as the closing move of the mission, refuted by the wall.

**4 · Pose pools.** L1: angles {0°, 90°}, prototype variants only (`stoneCircle`, `stoneSquare`, `stoneRect`, `stoneTriangle`), scale 1.00. L2: angles {20, 30, 45, 70, 110, 120, 200, 250, 300, 340}, adding `stoneTriSkinny`, `stoneTriObtuse`, `stoneRectThin`, scales {0.86, 1.00}. L3: any angle, every variant, scales {0.72, 0.86, 1.00}.
**Sizes are drawn from ONE global range for every column** (heights 30-50, widths ≤ 112), so a stone sized for column A's 57-px course beds equally in column B's 76-px course. **Size can never predict a destination**, which is misconception 4's structural defence, and the two column course heights make the same point in the finished wall: a small triangle and a large triangle are both triangles.

## Rules
- **Item count**: 10 (column A 4, columns B and C 3 each).
- **Difficulty progression**: 3 consecutive first-try correct → next level (cap L3). Three, not two: items are quick, ~15 s each.
- **Adaptation**: a wrong push, or a wrong first try on 2 consecutive items → the next item's pose comes from one level down (floor L1). The wall's schedule does not change; the level governs the pose pool and the S/R exclusion only.
- **What happens on a correct answer** (the shared template's label; in the code the wall accepts the move and there is no stored answer to compare against): the stone travels up the column face (`ANIM.raise`), beds (`ANIM.seat`, always resolving its angle to the gap's prototype angle, so a rotated stone is turned as it fits), the course closes (`ANIM.courseClose`), the next gap in that column is cut in a different shape, `tone("correct")`; praise on every third correct item and on the tenth, rotation `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`; the next stone washes up after 400 ms. **The crab stays where it is.**
- **What happens on a wrong answer**, by the pairing of the stone in the claws and the gap it was pushed at — a lookup computed from the world, never from an item field:
  - **A rotated stone at the wrong gap (orientation)**: `ANIM.proudHold` with `ART.gapOutline`, `tone("nudge")`, `ANIM.lower`; then the world freezes and the crab holds it beside the **correct** gap, `ANIM.turnToFit` (400 turn / 600 hold / 400 back = 1400 ms).
  - **A skinny or obtuse triangle refused as a triangle**: refusal, then frozen — the stone's three sides glow in turn (`ART.sideGlow`, `tone("tap", k)`, 300 ms apart) with `ART.countBadge` "3", **then the triangular gap's own three sides glow in the same order** (~2200 ms).
  - **A rectangle pushed at the square gap**: it stops with its two long ends standing proud by exactly how much it is too long; those two long sides then glow (~1600 ms).
  - **A square pushed at the rectangular gap (L3)**: **ACCEPTED** — it beds with a surround all round, `tone("correct")`, and the closing course shows `ART.squareInRect` for 1200 ms. A square is a rectangle and the wall never says otherwise.
  - **A round stone at any gap that is not round**: `ANIM.rollLoose` — it will not bed, because a round stone has no bearing faces; then `ART.gapOutline` traces the **circular** gap once. (A circle would geometrically pass through a square hole, so `fits()` is a kind match and the refusal is masonry, not containment. This is stated rather than hidden.)
  - In every case: the stone stays in the claws, nothing seated moves, no mark appears on the gap the child chose, and **the crab's pose is identical to the correct-answer frame except that it is still holding the stone.**
- **Retry behaviour**: attempt 1 → the cue, then attempt 2 costs **one tap** (the crab never put the stone down) → attempt 2 → the cue again, then `ART.showRing` on the correct column head (`ANIM.showMe`); sending the crab there completes the item as solved-with-help. No attempt 4; an item never ends unsolved (F-46).
- **Anti-brute-force guard — THE RECUT SOCKET.** P1's tile re-shuffle is unavailable in a persistent world: the wall's three columns are the world's furniture, and **a wall whose gaps jump when you push a stone at them is not a place.** The named replacement has three parts. (1) **No gap's shape survives its own stone** — when a stone beds, that gap closes forever and the next course is cut in a different shape, so the three live kinds are re-dealt while the three column *positions* never move. A child who learns "the pointy one is on the left" is not rewarded, because **the left column is a place, not an answer**; this is also physically true, since a wall being rebuilt does not have the same gap twice. (2) **The live triple is always three distinct kinds**, and before L3 never square and rectangle together, so the destination is always fixed by the stone's geometry and never by elimination or by position memory. (3) **A guess buys instruction, never speed** — a wrong push costs the full frozen enacted correction (1400-2200 ms) and forfeits first-try, so the ladder cannot be advanced by guessing and a guesser is fed exactly the teaching they were trying to skip (F-65).
  *Declared limit, not hidden:* items 9 and 10 have two live gaps and then one, because the wall is running out of gaps — 20% of the session non-discriminating. It is kept, because a real wall ends that way and the last stone should feel like closing the wall; eight fully discriminating items is more than the 3-first-try ladder needs. The alternative, if the operator wants ten discriminating items, is a 12-gap wall whose last two courses the crab lays itself at the Finish. That is flagged, not chosen silently.
- **The ratchet**: nothing seated ever comes out, the wall never falls, no column ever drops a course, the coping line never moves, the crablings never leave. The tension is *three gaps left*, never *falling behind*.
- **Finish condition**: 10 items, i.e. all three columns level with the coping. No losing state, no clock, no score. The only way a session ends is by finishing.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific `STRINGS`: `title` = "The Harbour Wall" (three words, Boot screen only, paired with `ART.crab`). All 11 locale keys ship in the built game (BUILD-CONVENTIONS §17); the title is rebuilt natively per locale, never machine-translated, and a locale may name the structure whatever a five-year-old there would call it.
- **No text on the play screen at all** — band 5-6 is a zero-word budget and the mission does not buy an exemption (F-42, F-6: a concealed premise turns the game into a word problem, which is reliably harder at this age). The premise sentences in this document are for the spec and never appear on the stage.

## Sound
`tone("tap")` when the stone rises into the claws; `tone("correct")` when the wall takes a stone; `tone("nudge")` when it refuses one; `tone("tap", k)` on the k-th glowing side during a cue, so the three sides of a triangle are also three rising notes (F-213); `tone("finish")` once. Sound never carries meaning the screen does not also show. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and the praise strings change with the picker; the play screen has no words in any of them).
- [ ] Works at narrow width (400-px iframe: all three column heads, the coping line, the crablings, the crab and the beach stone visible and separate; the gap silhouettes distinguishable).
- [ ] Keyboard operable (Tab: the beach stone, then the three column heads left to right; Enter lifts the stone, then sends the crab to the focused column).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong push never ends the session; the show-me ring always leads to completion; the only end is the mended wall).
- [ ] **Mission — the destination.** The coping line and the three crablings are drawn from tap one, in zone W, and their (x, y) are byte-identical at item 1 and at item 10. The crab's x changes on at least 9 of the 10 items and is in zone W in every frame of the session.
- [ ] **Mission — persistence.** The crab's x at the start of item k+1 equals its x at the end of item k, for every k; the wall at item 10 differs from the wall at item 1 outside the current item's own column.
- [ ] **Mission — displacement.** `grep` the built file: no item carries an `answer` field and nothing compares a tapped id against one; the commit reads `crab.x` and resolves the gap from it.
- [ ] **Deletion 2.** Remove the crab and the wall: the game must fail to complete an item, because the stone has no transport and nowhere to go.
- [ ] **Deletion 1.** Make every gap accept every stone: nothing playable survives — ten identical taps, nothing ever refused, no correction ever played.
- [ ] **Instant-cut (Test C).** Patch `ANIM.scuttle`, `ANIM.lift` and `ANIM.raise` to `duration: 0`: the item log of a full session is identical — same one decision per item, same verdicts, same corrections at full duration, same wall, same finish. The walk delivers the stone; it does not fill time.
- [ ] **Ratchet.** Drive a full session answering wrongly on every item first: no column ever loses a course, no seated stone ever moves, the coping line never moves, the crablings never move before the Finish, and the wall's height is monotone non-decreasing at every step.
- [ ] **The character is never the consequence.** Put the correct-push and wrong-push screenshots side by side: the crab differs in nothing but the contents of its claws.
- [ ] **Freeze (F-42).** At every decision point of a full session, if any target is enabled then the running tween count is zero.
- [ ] Stones arrive rotated; a square turned 45° beds in the square gap and the crab turns it upright as it beds.
- [ ] Pushing a rotated stone at the wrong gap makes the crab hold it beside the correct gap and turn it until the two outlines coincide, then turn it back.
- [ ] A long thin triangle refused elsewhere lights its three sides one by one with a "3" badge, then lights the triangular gap's three sides in the same order.
- [ ] Square and rectangle gaps are never both live before L3; at L3 a square pushed at the rectangular gap beds and a small square appears inside the closing course.
- [ ] A rectangle pushed at the square gap stops with its two long ends standing proud, and those two sides glow.
- [ ] A round stone pushed at a gap that is not round rolls loose and does not bed.
- [ ] **THE RECUT SOCKET.** Across a full session, no column is ever cut twice running to the same kind, the three live kinds are always distinct, and square and rectangle are never both live before L3.
- [ ] Stone fill tokens vary and never predict a column; a small stone and a large stone of the same kind both bed in the same gap.
- [ ] No abstract progress display is drawn during Play; the finish screen shows the mended wall with all ten stones at their play coordinates and reports no count of any kind.
- [ ] With `?sound=off` nothing is audible.
