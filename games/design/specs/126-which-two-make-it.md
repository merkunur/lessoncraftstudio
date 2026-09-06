# 126 — Stone by Stone

## Identity
- Slug: `which-two-make-it`
- Subject / topic: Mathematics / composing a shape from two parts (two pieces that together fill a square, a rectangle or a triangle exactly)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three bays of loose stones; tap the bay whose two stones pave the hole)
- Frame: THE SPAN
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Frame contract: `design/MISSIONS.md` FRAME 6, under `design/GAME-DESIGN-LAW.md`. Content is language-neutral (a floor, holes in it, and stones; no numerals, no words); no `LOCALE_DATA` beyond the shared UI strings. Nothing is dragged: the child taps a bay and the stones travel by themselves (F-49), so the game is about SEEING which two make it, not about steering them.

## Learning
- Objective: Chooses, from three pairs of pieces, the pair that together fills a target outline exactly — with no gap and nothing sticking out — including when the pieces are shown turned the wrong way.
- Prerequisites: Has met the four basic shapes (game 005). No reading, no counting; the first item is discoverable by tapping any pair (the pieces travel and show whether they fit).
- Curriculum links: F-115 (prototype orientation — a rotated square "is a diamond", flipped/skinny triangles fail for ~half of 4-6-year-olds — responses: rotate the shape live, vary orientation from level 1), F-21 ("2D shapes" and "halves as equal parts (informal)" in the common core; composing shapes from parts precedes both), F-31 row "2D shapes named (4 basic)" — conservative 6-7, earliest 4 → 5-6 (US K.G.B.6 "compose simple shapes to form larger shapes — join two triangles to make a rectangle" and 1.G.A.2 "compose two-dimensional shapes … to create a composite shape"; England Reception ELG "compose and decompose shapes so that children recognise a shape can have other shapes within it"; Germany Klasse 1 "Figuren legen und zerlegen"; France GS "reproduire un assemblage à partir d'un modèle"; Netherlands groep 1-2 "figuren samenstellen"; Spain Infantil "composición de formas"; Brazil EI03ET05; Sweden förskoleklass "konstruera med geometriska former"; Finland esiopetus "rakentelu"). Feedback is enacted (F-43): the pieces go where they would go and the gap or the overhang is seen, never described; an invalid choice is refused by the outline, not punished (F-61).
- Common misconceptions (F-115; the responses rest on F-43 and F-61), each with this game's response:
  1. **"Two of the right kind of shape make it" — two small squares chosen for the big square, two thin rectangles for the wide rectangle.** Response: the two stones rise out of the barrow and settle into the socket where they best fit, and **the part of the socket they do not cover is still open earth** — `ART.gapMark` (accent, 35 % alpha) is drawn beneath them, pulses once and holds for 1000 ms, then the stones lift out and glide back to their bay. The size of the hole is the feedback, and the hole is real: it is the same bare earth the child has been looking at since the first frame.
  2. **A round piece can fill a cornered space.** Response: L1 already offers a triangle-and-round-stone bay for a cornered socket; the round stone rolls to the middle of the socket and coral earth shows all round it — the corners stay open, which is precisely where corners are.
  3. **Pieces shown turned the "wrong" way cannot fit (two rectangles lying flat "don't make a standing square"; a triangle with its point down "isn't the half").** Response: stones lie in the barrow at the angle they were tipped out at, so from L2 the fitting pair is tipped out turned away from its socket pose and no explanation is needed for why. On a correct lay each stone **turns as it travels** (`ANIM.turnToFit`) and seats exactly; on a second wrong lay the fitting pair's stones **rock around in their bay** (`ANIM.hintTurn`), because stones on a barrow move — the child sees a stone turn as a physical event, not as a hint animation.
  4. **Bigger is better — two big rectangles for the square "because they cover it".** Response: L3 offers a pair that is too big; the second stone **cannot lie flat**. It rides up onto whatever is on the far side of the socket — a stone the child laid earlier, or the yard's curb — and stands visibly proud of the floor, with `ART.overhangMark` (accent outline, 4 px) around the part beyond the socket. Covering is not fitting, and on a floor "proud" is something a child has felt underfoot.
  5. **Choosing by count — "it's two pieces, so it works".** Response: every bay in the barrow holds exactly two stones, always, in the same fill, so counting never separates them; only shape and size do.

## Mission

**The want, in one still frame and zero words.** A tortoise stands on the bare earth at the left edge of a paved yard. In the paving are eight stone-shaped hollows of open earth. Across the yard, on a sunlit doorstep, three young tortoises sit looking back. It cannot get over to them: the way across is holes. This is the band-5-6 policy's own exemplar lack — *a gap in a bridge* — eight times over, and it restates itself at every item because the hollows are still there.

**The goal.** The yard whole, and the tortoise across it and up onto the step.

**THE SINGLE STATE VARIABLE.** `S` = **the covered region of the yard floor.**

- **Mathematical reading.** The set of socket outlines that have been exactly composed out of two parts — and, inside the socket being worked, the region the two laid pieces cover against the region the socket asks for.
- **Physical reading.** How much of the yard is paved, and therefore how far the tortoise can walk. The tortoise stands on the frontier of `S`.

The transition function: laying a pair adds `union(pieceA, pieceB)` to `S`. The move is legal **iff `union(A, B) == socket` exactly** — nothing uncovered, nothing outside.

**There is no `answer` field in this game and none is needed.** A pair is the fitting pair iff its gap region and its overhang region are both empty (Content, "The predicate"). Both regions were already authored, per pair, in this spec's previous form — the worksheet was carrying the world's predicate all along and calling it feedback. The correctness check is `yard.accepts(socket, pair)`, a geometric predicate on the world, and the stored verdict disappears from the code entirely.

**THE ISOMORPHISM — composing two parts into one whole IS paving one stone of the floor. The covered region is the walkable region.** One `S`, two readings, and the child manipulates the physical one. The target outline is not a shape printed on a card that happens to sit above some tiles; it is **the missing stone** — a hole in the ground the tortoise is standing at the edge of. Filling it is not a report about the shape, it is the act of making ground where there was none.

The hero's position is load-bearing in both directions, and this is the crux:

- **`problem = f(hero.position)`.** The socket being mended is the one in front of the tortoise: `socket = yard.nextFrom(hero.position)`, the first unpaved cell after the hero's cell in the yard's way-order. The yard does not hold a "current item" anywhere else — remove the tortoise and there is no way to say which of the eight hollows is being worked. **The hero selects the problem.**
- **`hero.position = f(S)`.** The tortoise's coordinate is the frontier of the paved region: after k stones it stands on stone k. Its x is the built extent, not a reward tween — THE SPAN's own sanctioned reading (*the beaver's x is the built length*). It is out on the end of the unfinished floor, never a spectator waiting for a finished one.
- **And the honest half, stated rather than hidden: `answer` is not `f(hero.position)`.** The child's choice selects the MOVE, not a destination. That cannot be made a displacement without destroying this game's mathematics: the two pieces must be seen APART, and from L2 TURNED (misconception 3), and any candidate the tortoise could step onto would have to be a single object — at which point the child compares one outline to another and composes nothing. That task is game 005, which is this game's prerequisite. Letting the hero walk to a pair and then carry it is a two-move subgoal chain the 5-6 band forbids outright. The Displacement rule is therefore satisfied on the problem axis and on the extent axis, and **declared unsatisfied on the selection axis**, so a reviewer knows which of the three is open rather than discovering it at build time.

**The mark that stays.** Every laid stone keeps a hairline join line where its two pieces met — the record of what made it — and stays in the floor for the whole session. Nothing ever un-paves: a socket that was never paved cannot become less paved, so the RATCHET RULE holds by construction.

**Variant reading of the frame, declared.** THE SPAN's canonical extent is a length. Here the extent is two-dimensional — the paved area — and the composition is per-stone. The frame's own sentence, *composition and part-whole become physical reach*, holds verbatim; only the dimension changes.

## World

**ZONE T (0-56)** — chrome only: the language picker at (16, 16), hidden under `?embed=1`. Nothing else, and no progress meter of any kind.

**ZONE W (56-420) — THE YARD.**

The paved area is a `surface2` wash with `line` edges, **x 88 → 600, y 116 → 380** (512 × 264), with `ART.yardCurb` along its left edge at x = 88 and its outer rim all round.

Eight stone cells, 4 columns × 2 rows, pitch 128 × 132:

- column centres x = **152, 280, 408, 536**
- row centres y = **182, 314**

Cell footprint **112 × 116**, so every stone keeps a mortar gap of at least 16 px from its neighbours. Each target is scaled to that cell (Content, "Target geometry"): the **square** family fills 104 × 104, the **wide rectangle** 112 × 56, the **right triangle** legs 112.

A laid stone is `ART.stoneLaid` — `surface2` fill, `line` 2 px edge — with `ART.joinLine`, a hairline `inkSoft` seam where the two pieces met. An unlaid socket is bare earth: `ART.socketHollow` (a slightly darker `surface2` recess) under `ART.socketDash` when it is the socket being worked. **Exactly one dashed outline exists on screen at a time**, so the current problem is unmistakable; the other open cells are plain hollows.

**The way through the yard is serpentine, so every move is to an adjacent cell:**

`(152,314) → (152,182) → (280,182) → (280,314) → (408,314) → (408,182) → (536,182) → (536,314)`

that is up, right, down, right, up, right, down. Longest move 132 px, walked in ≤ 700 ms; the first step, from the earth onto stone 1, is 86 px.

**The tortoise** starts on the bare earth at the yard's left edge, **(66, 318)**, drawn at 80 px facing right, its front feet against the curb. After item k it stands on stone k, anchored at `(cellX, cellY − 10)` so its box sits inside the stone. In DECIDE it holds one static pose (`ART.tortoiseIdle`, or `ART.tortoiseThink` while a correction plays) at one coordinate, with zero tweens running. There is no idle bob anywhere in this game: the tortoise's stillness is a tortoise standing at the edge of a hole, which is what the arrangement means.

**BINDING ON THE DRAWING.** The tortoise is built from `surface2` and `inkSoft` tints with an `ink` 3 px outline — a bone-coloured domed shell of visible scutes, stumpy columnar legs, a small beaked head on a wrinkled neck, no ears (ART-BIBLE §12.1 identity markings). It is **never** an `accent` tint. ART-BIBLE §9.4's warm-body clause would otherwise cap this game's state coral at 600 px² and hold it 120 px from the character — and `ART.gapMark` can be the whole 104 × 104 socket, landing exactly where the tortoise is standing. A warm-bodied hero would make this game's central teaching cue illegal.

**The doorstep and the waiting party (MISSIONS Device 1).** `ART.doorstep` in `surface` (brighter than the cream yard, so it reads as the sunny side), **x 608 → 704, y 300 → 380**, its tread the line y = 300; `ART.doorway` above it, x 616 → 696, y 186 → 300. Three young tortoises (`ART.youngTortoise`, 40 px) sit on the tread at **(630, 278), (656, 278), (682, 278)**, feet on the line, the middle one facing the yard and the outer two turned slightly toward it. They are drawn from tap one; they are still and safe; **they never change until the finish.** They do not react to a correct lay — a waiting party that reacts per item is an approval meter, which is F-44's banned shape.

**ZONE H (420-560) — THE BARROW.** Not empty: THE SPAN holds a parts tray, and here it is the mason's barrow. `ART.barrowBed`, a low `surface2` bed with a `line` edge across **x 32 → 688, y 428 → 552**. Three bays, `makeTile` with `ART.bayTile` tokens at **200 × 112**, centred at **(140, 488) · (360, 488) · (580, 488)** — pitch 220, so 20 px between bays, and 16 px clear of the stage bottom. A tap target of 200 × 112 against the 5-6 floor of 80 × 80 is nearly six times the required area.

Each bay holds **exactly two loose stones**, drawn at 0.6 scale and centred at bay-relative (−46, 0) and (+46, 0), lying at the angle they were tipped out at. They are never pre-assembled and never touching: the child must close the join in their head, which is the entire cognitive act. Same `structureSoft` fill and `structure` 3 px stroke on every stone in every bay, so colour never marks the fitting pair.

**Element budget (F-69):** three bays plus the language picker — four. The tortoise, the eight cells, the barrow bed, the step and the young ones are scenery and count zero. Well inside ten.

**Tab order:** the three bays, left to right. Enter or Space lays. The yard, the tortoise and the step are not focusable.

## How it plays

1. **Start screen.** Title `S("title")`, the tortoise (`ART.tortoiseIdle`) at (360, 210), `makeButton` `t("start")`, picker at (16, 16) (hidden under `?embed=1`). It never auto-starts.

2. **The yard is laid once, at Play start.** The eight sockets take their shapes from the fixed way-order table in Content; each socket's fitting pair is drawn from that shape's FIT set subject to the no-repeat rule (Content, "Item plan"). Nothing about the yard changes again for the rest of the session — the sockets, the step and the young ones are fixed furniture. The tortoise is placed at (66, 318). The first socket, `(152, 314)`, takes `ART.socketDash`.

3. **The one-off demonstration (F-60, permitted once by F-42).** On item 1 only, before the bays are enabled, the dashed outline of socket 1 traces itself once (`ANIM.traceOnce`, 500 ms) and then holds static. Targets enable after it settles. This happens once per session and never again.

4. **Item 1 — socket `(152, 314)`, a square, L1.** The barrow tips out three bays: the fitting pair `S-a` (two right triangles) in socket pose, and two gap-type distractors, `S-c` (two small squares) and `S-e` (a triangle and a round stone), in a shuffled bay order. No caption, no words anywhere on the play surface. The stage is frozen: zero tweens, the tortoise in `ART.tortoiseIdle` at (66, 318), looking at the hole in front of it.

5. **Answering — the child taps a bay.**

   - **The pair fits (`yard.accepts(socket, pair)` is true).** `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`. Full-size copies of the two stones rise from the bay (`ANIM.glide` with `ANIM.grow` from 0.6, and where the barrow pose differs from the socket pose `ANIM.turnToFit` turns them on the way) and seat into the socket 120 ms apart with `tone("tap", 1)` and `tone("tap", 3)`; `ANIM.seat` settles each one; `ART.socketDash` is replaced by `ART.stoneLaid` and `ART.joinLine` fades in along the seam (`ANIM.appear`, 160 ms). At 600 ms the tortoise swaps to `ART.tortoiseWalk` and **steps onto the new stone** (`ANIM.step`, ≤ 560 ms for the 86 px first move), arriving at (152, 304) and swapping to `ART.tortoiseHappy`, then back to `ART.tortoiseIdle`. Total ACT ≤ 1180 ms. `GameCore.showPraise` with the next key in rotation. The next socket, `(152, 182)`, takes `ART.socketDash`; the barrow tips out the next three bays (`ANIM.appear`). First-try correct.

   - **The pair leaves a gap (attempt 1 wrong).** `ANIM.nudge`, `tone("nudge")`, the bay de-selects and stays enabled; then the **fit cue** runs with every bay `setEnabled(false)` and the world otherwise frozen (about 1.9 s): the two stones rise and settle into the socket where they best fit; `ART.gapMark` is drawn BENEATH them over the region they do not cover, at 35 % alpha, and `ANIM.pulse` runs once; the mark holds 1000 ms, `ANIM.fadeOut` clears it, and the stones lift out and glide back to their bay. The tortoise swaps to `ART.tortoiseThink` and looks at the gap for the length of the cue — enacted feedback first, the creature second — then back to `ART.tortoiseIdle`. **The socket is exactly as it was.** Attempt 2 opens.

   - **The pair is too big (L3).** Same cue, different physics: the first stone lies in, the second **cannot lie flat**. It rides up (`ANIM.rideUp`: 6 px, 4° tilt) onto whatever is on the far side of the socket — a stone the child laid earlier, or `ART.yardCurb` on item 1 — and stands proud of the floor with `ART.overhangMark` around the part beyond the socket. It never rides onto the tortoise; the tortoise is always on the near side. Where a pair both overhangs and leaves a gap (`T-d`), both marks show at once: they are two parts of one cue about one event.

   - **The round stone in a cornered socket.** It rolls to the middle and coral earth shows all round it, in the corners.

   - **Attempt 2 wrong.** The cue for the tapped pair plays again, then the **fitting** pair's two stones `ANIM.hintTurn` in their bay — a small rock around and back, which stones on a barrow do — and that bay gains `ART.showRing` (`ANIM.showMe`, 1 Hz). Tapping it lays the stone and the tortoise steps on: **solved-with-help**, item completed. There is no attempt 4 and no way for a session to end other than by arriving.

6. **Items 2-8.** Identical, one socket per item, along the way-order. Level governs the material the barrow tips out, never the yard (Content, "The material ladder"). Item 8 lays the last stone at `(536, 314)`.

7. **Finish.** The tortoise walks the last stone and up onto the doorstep, and **the three young tortoises come down off the step onto the new stones** — the single change to the waiting party in the whole session, and the payoff for the thing the child actually did. The finish screen is **the world at its play coordinates**, not a summary strip: eight laid stones, each still showing its join line, which is the session's eight compositions still in place and still readable as a floor. `t("all_done")` at (360, 96); the tortoise `ANIM.celebrate`; `makeButton` `t("play_again")` (250, 510) and `t("menu")` (470, 510); `tone("finish")` once; `GameCore.reportHeight()`. No count, no stars, no score.

Session ≈ 4-5 minutes. Total ACT across a clean session ≈ 8 × 1.0 s plus corrections — comfortably under the 60 s per-session ceiling.

## Art registry
```js
const ART = {
  /* the hero — surface2 / inkSoft body, ink outline, never an accent tint (see ## World) */
  tortoiseIdle:  { kind: "svg", value: LCSArt.get("tortoise.idle"),  size: 80, fallback: "🐢" },
  tortoiseThink: { kind: "svg", value: LCSArt.get("tortoise.think"), size: 80, fallback: "🐢" },
  tortoiseWalk:  { kind: "svg", value: LCSArt.get("tortoise.walk"),  size: 80, fallback: "🐢" },
  tortoiseHappy: { kind: "svg", value: LCSArt.get("tortoise.happy"), size: 80, fallback: "🐢" },
  youngTortoise: { kind: "svg", value: LCSArt.get("tortoise.young"), size: 40, fallback: "🐢" },

  /* the yard */
  yardFloor:     { kind: "shape", shape: "rect", w: 512, h: 264, fill: "surface2", stroke: "line", strokeWidth: 2 },
  yardCurb:      { kind: "shape", shape: "rect", w: 512, h: 12,  fill: "line",     stroke: "line", strokeWidth: 0 },
  socketHollow:  { kind: "shape", shape: "polygon", points: [], fill: "surface2", stroke: "line", strokeWidth: 1 },  // open earth; points per socket
  socketDash:    { kind: "shape", shape: "polygon", points: [], stroke: "line", strokeWidth: 3 },                    // the socket being worked; lineDash [8,6]
  stoneLaid:     { kind: "shape", shape: "polygon", points: [], fill: "surface2", stroke: "line", strokeWidth: 2 },  // a paved stone; points per socket
  joinLine:      { kind: "shape", shape: "line", points: [], stroke: "inkSoft", strokeWidth: 1 },                    // the seam of the two pieces that made it

  /* the stones */
  piecePoly:     { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  pieceCircle:   { kind: "shape", shape: "circle", r: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },

  /* the two state-coral marks — ONE cue, two parts; the only accent entries in the file */
  gapMark:       { kind: "shape", shape: "polygon", points: [], fill: "accent" },                    // 35 % alpha, beneath the stones
  overhangMark:  { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 4 },  // the part of a too-big stone outside the socket

  /* the barrow */
  barrowBed:     { kind: "shape", shape: "roundRect", w: 656, h: 124, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },
  bayTile:       { kind: "shape", shape: "roundRect", w: 200, h: 112, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 14 },
  showRing:      { kind: "shape", shape: "roundRect", w: 212, h: 124, stroke: "structure", strokeWidth: 4, radius: 18 },

  /* the destination */
  doorstep:      { kind: "shape", shape: "rect", w: 96, h: 80, fill: "surface", stroke: "line", strokeWidth: 2 },
  doorway:       { kind: "shape", shape: "roundRect", w: 80, h: 114, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 38 }
};
```
All stones share one fill token so colour never marks the fitting pair. Piece geometry (points relative to the piece's own centre, then placed at the socket centre with the socket rotation) is listed per pair in Content; a bay shows the same stones at scale 0.6.

**Named decision, recorded so a reviewer can settle it in one look.** `ART.showRing` is `structure`, **not** `accent`, against the first draft of this redesign. In this game coral means exactly one thing — *this ground is not made yet* — and a coral show-me ring would mean *this one is right*, inverting the single cue the whole game rests on. Teal already means chosen and correct (ART-BIBLE §10.1). The accent family in this file is therefore exactly two entries, `gapMark` and `overhangMark`, and they only ever appear together as two parts of one event. One grep, one number.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the bay tapped" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a bay whose pair the socket refuses" },
  glide:      { duration: 320, ease: "Sine.InOut", trigger: "each stone from its bay to its place in the socket, and back (x,y set at call)" },
  grow:       { scale: 1, duration: 320, ease: "Sine.InOut", trigger: "a stone leaving its bay (from scale 0.6); reversed on the way back" },
  turnToFit:  { angle: 0, duration: 320, ease: "Sine.InOut", trigger: "a stone turning from its barrow angle to its socket rotation while it travels (angle set per stone)" },
  seat:       { scale: 1.0, duration: 120, ease: "Sine.Out", trigger: "a stone settling into the socket" },
  hintTurn:   { angle: "+=25", duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "the fitting pair's stones rocking in their bay, 2nd wrong lay" },
  rideUp:     { y: "-=6", angle: 4, duration: 260, ease: "Sine.Out", trigger: "a too-big stone that cannot lie flat, riding onto the far side" },
  pulse:      { scale: 1.06, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "gapMark / overhangMark, once" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "the coral marks after the cue" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "joinLine on a laid stone; the next three bays (from alpha 0, scale 0.6)" },
  step:       { duration: 560, ease: "Sine.InOut", trigger: "the tortoise container to the stone it just made (x,y set at call; 86-132 px)" },
  traceOnce:  { alpha: 1, duration: 500, ease: "Sine.InOut", trigger: "socket 1's dashed outline, item 1 only, before the bays enable (from alpha 0.25)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the fitting bay (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise only" }
};
```
No flashing: `showMe` at 1 Hz, the coral marks pulse once. **`ANIM.step` is the only traversal tween in the file**, so the instant-cut test (GAME-DESIGN-LAW Test C) is a one-line patch: set its duration to 0.

Note per ART-BIBLE §10.3: the tortoise and every travelling stone are wrapped in a container and the container is tweened — a raw `scale` tween on a `kind: "svg"` entry renders at double size, silently.

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                                 |  zone T   0-56   chrome only
 56   +--------------------------------------------------------------+
      |                       THE YARD                               |
      |         +---------+---------+---------+---------+            |
      |   ~~~   |  stone  |  HOLLOW |  HOLLOW |  HOLLOW |    __      |  y=182 row
      |  (66,   |  (152,  |  (280,  |  (408,  |  (536,  |   |  |     |
      |   318)  |   182)  |   182)  |   182)  |   182)  |   |dr|     |  doorway 186-300
      |  TORT   +---------+---------+---------+---------+   |__|     |
      |   OISE  | [DASHED]|  HOLLOW |  HOLLOW |  HOLLOW |  [step]    |  y=314 row
      |   at    |  (152,  |  (280,  |  (408,  |  (536,  |  3 young   |  tread y=300
      |   the   |   314)  |   314)  |   314)  |   314)  |  (630/656/ |
      |   curb  +---------+---------+---------+---------+   682,278) |
      |          paved area x 88-600, y 116-380                      |  zone W  56-420
420   +--------------------------------------------------------------+
      |   THE BARROW   x 32-688, y 428-552                           |
      |  +-------------+   +-------------+   +-------------+         |
      |  |  /\    \/   |   | [] []       |   |  /\    ()   |         |  bays 200 x 112
      |  +-------------+   +-------------+   +-------------+         |  y=488
      |     x=140             x=360             x=580               |  zone H  420-560
560   +--------------------------------------------------------------+
```
Fixed 720 × 560 logical stage, `Scale.FIT`, static camera, no scrolling. Travelling stones are full-size copies; the bay keeps its 0.6-scale stones so the choice stays visible while a cue plays. **Progress is diegetic and there is no progress meter anywhere on the play surface**: the open earth shrinks, the paved way grows under the tortoise, and the tortoise's own position — the frontier of the paved region — gets nearer the step. Those are three readings of one quantity and a child reads all three from a still frame.

## Visual specification
- Background `THEME.colour.bg`. Zone T carries the picker only; nothing is drawn at y = 28.
- `ART.yardFloor` centred at (344, 248) covering x 88 → 600, y 116 → 380; `ART.yardCurb` along its left edge at x = 88 and its outer rim.
- Eight cells, footprint 112 × 116, at the sixteen coordinates in Content. An unlaid cell draws `ART.socketHollow` with the socket's own outline points. The cell being worked adds `ART.socketDash` (`lineDash [8, 6]`) — **exactly one dashed outline on screen at any moment.** A completed cell draws `ART.stoneLaid` plus `ART.joinLine` along the seam of the two pieces that made it, and keeps both for the rest of the session.
- `ART.tortoiseIdle` at (66, 318) at the start; thereafter at `(cellX, cellY − 10)` of the last stone it laid. Pose swaps only: `ART.tortoiseThink` while a correction plays, `ART.tortoiseWalk` while `ANIM.step` runs, `ART.tortoiseHappy` for 200 ms on arrival, otherwise `ART.tortoiseIdle`. It never bobs, never falls, never shows an error pose.
- `ART.doorstep` x 608 → 704, y 300 → 380; `ART.doorway` x 616 → 696, y 186 → 300; three `ART.youngTortoise` at (630, 278), (656, 278), (682, 278), drawn from tap one and unchanged until the finish.
- `ART.barrowBed` centred at (360, 490); three `makeTile` bays with `ART.bayTile` tokens at (140, 488), (360, 488), (580, 488), each 200 × 112 with 20 px between them — far above the 5-6 floor of 80 × 80 and the ≥ 12 px gap rule. Stones (`ART.piecePoly` / `ART.pieceCircle`) at scale 0.6, centred at bay-relative (−46, 0) and (+46, 0), at the barrow angle the level gives.
- `ART.gapMark` and `ART.overhangMark` are drawn in socket coordinates and exist only during a correction. `ART.showRing` (teal) sits around the fitting bay on attempt 3 only.
- Tab order: the three bays, left to right. Under `?embed=1` the picker is not created. **No text of any kind on the play surface, in any language.**

## Content

Language-neutral throughout. Coordinates below are relative to the socket centre.

### The yard (fixed at Play start, never changes during a session)

| # | cell | centre | socket shape |
|---|---|---|---|
| 1 | C1 R2 | (152, 314) | square |
| 2 | C1 R1 | (152, 182) | square |
| 3 | C2 R1 | (280, 182) | rectangle |
| 4 | C2 R2 | (280, 314) | square |
| 5 | C3 R2 | (408, 314) | rectangle |
| 6 | C3 R1 | (408, 182) | triangle |
| 7 | C4 R1 | (536, 182) | rectangle |
| 8 | C4 R2 | (536, 314) | triangle |

`yard.nextFrom(hero.position)` returns the first cell after the hero's cell in this order whose state is `open`. The hero starts off the yard at (66, 318), so on item 1 it returns cell 1.

**Socket shape is a property of the WORLD and never adapts.** Difficulty is carried entirely by the material the barrow tips out (below). A station that changes shape when you knock on it would destroy the world's constancy, which is the thing that makes it a place.

### Target geometry

All pair geometry below is authored at a **reference scale** and drawn into the 112 × 116 cell through one factor per family, so the fit predicate is scale-invariant and the numbers stay readable:

| shape | reference outline | reference size | cell size | `TARGET_SCALE` |
|---|---|---|---|---|
| square | [(−60,−60),(60,−60),(60,60),(−60,60)] | 120 × 120 | 104 × 104 | 104/120 |
| rectangle | [(−80,−40),(80,−40),(80,40),(−80,40)] | 160 × 80 | 112 × 56 | 112/160 |
| triangle | [(−80,−80),(80,80),(−80,80)] | legs 160 | legs 112 | 112/160 |

Every polygon, slot centre, gap region and overhang region scales by its family's factor.

### The pair library

A pair gives two pieces (polygon points about each piece's own centre, or a circle radius), each piece's resting centre in socket coordinates, and its rotation. **FIT pairs carry an empty gap region and an empty overhang region.** NO pairs carry the region their stones fail to cover, and the region that lands outside the socket.

**Square sockets** (reference outline [(−60,−60),(60,−60),(60,60),(−60,60)])
- `S-a` FIT · two right triangles, legs 120: A [(−40,−40),(80,−40),(−40,80)] at (−20,−20); B [(40,40),(−80,40),(40,−80)] at (20,20); rotation 0. gap [] · overhang []
- `S-b` FIT · two rectangles 60 × 120, points [(−30,−60),(30,−60),(30,60),(−30,60)]: at (−30,0) and (30,0); rotation 0. gap [] · overhang []
- `S-c` NO · two squares 60, points [(−30,−30),(30,−30),(30,30),(−30,30)]: rest at (−30,−30) and (30,−30); gap [(−60,0),(60,0),(60,60),(−60,60)]
- `S-d` NO · rectangle 60 × 120 + square 60: rest at (−30,0) and (30,−30); gap [(0,0),(60,0),(60,60),(0,60)]
- `S-e` NO · right triangle (as `S-a` A) + `ART.pieceCircle` r 30: triangle rests at (−20,−20), round stone at (30,30); gap [(60,−60),(60,60),(−60,60)] drawn beneath the round stone, so coral shows all round it
- `S-f` NO, TOO BIG · two rectangles 80 × 120, points [(−40,−60),(40,−60),(40,60),(−40,60)]: rest at (−20,0) and (60,0); overhang [(60,−60),(100,−60),(100,60),(60,60)]; gap []
- `S-g` NO · two `ART.pieceCircle`s r 30: rest at (−30,0) and (30,0); gap = the whole outline

**Rectangle sockets** (reference outline [(−80,−40),(80,−40),(80,40),(−80,40)])
- `R-a` FIT · two squares 80, points [(−40,−40),(40,−40),(40,40),(−40,40)]: at (−40,0) and (40,0). gap [] · overhang []
- `R-b` FIT · two right triangles, legs 160 and 80: A [(−80,−40),(80,−40),(−80,40)], B [(80,−40),(80,40),(−80,40)], each about its own centroid; rotation 0. gap [] · overhang []
- `R-c` NO · two rectangles 40 × 80, points [(−20,−40),(20,−40),(20,40),(−20,40)]: rest at (−60,0) and (−20,0); gap [(0,−40),(80,−40),(80,40),(0,40)]
- `R-d` NO · square 80 + right triangle legs 80: square rests at (−40,0), triangle so its polygon sits at [(0,−40),(80,−40),(0,40)]; gap [(80,−40),(80,40),(0,40)]
- `R-e` NO · two squares 60: rest at (−50,0) and (10,0); gap = the whole outline
- `R-f` NO, TOO BIG · square 80 + rectangle 120 × 80: rest at (−40,0) and (60,0); overhang [(80,−40),(120,−40),(120,40),(80,40)]; gap []

**Triangle sockets** (reference outline [(−80,−80),(80,80),(−80,80)], right angle at bottom-left)
- `T-a` FIT · two right isosceles triangles: A [(−80,80),(−80,−80),(0,0)], B [(−80,80),(80,80),(0,0)], each about its own centroid; rotation 0. gap [] · overhang []
- `T-c` NO · square 80 + right triangle legs 80: square rests at (−40,40); triangle so its polygon sits at [(−80,−80),(0,0),(−80,0)]; gap [(0,0),(80,80),(0,80)]
- `T-d` NO, TOO BIG · two squares 80: rest at (−40,40) and (40,40); overhang [(0,0),(80,0),(80,80)]; gap [(−80,−80),(0,0),(−80,0)]
- `T-e` NO · right triangle legs 80 at [(−80,−80),(0,0),(−80,0)] + `ART.pieceCircle` r 30 at (−40,40); gap [(−80,0),(0,0),(80,80),(−80,80)] drawn beneath the round stone

The previous form's `T-b` — the same two pieces shown turned — is folded into `T-a` with the turned flag, because turned-ness is now a property of the level, not of a separate pair.

### The predicate

```
yard.accepts(socket, pair)  ==  pair.gap.isEmpty && pair.overhang.isEmpty
```

which is the drawable form of *the two stones, at their resting placement, leave no part of the socket uncovered and no part of themselves outside it*. **At Play start the build asserts the two forms agree**, per pair, per socket shape: for every pair whose gap and overhang regions are empty, `union(A, B)` must equal the socket outline to within 1 reference unit, and for every other pair the authored regions must equal the computed residue. A pair that fails the assertion halts the build with its id — the same discipline `check-pools.js` applies to a counting pool, so a comment claiming "this one fits" can never quietly rot. **There is no `answer` field anywhere in `CONTENT`.**

### The material ladder

The level selects what the barrow tips out for the socket the tortoise has reached. It never selects the socket.

| level | fitting pair, barrow pose | the two other bays | misconceptions exercised |
|---|---|---|---|
| **L1** | socket pose | two GAP-type pairs | 1, 2, 5 |
| **L2** | turned away from the socket pose (90° or 180°, family-dependent) | two GAP-type pairs, one of them short by exactly one piece-width | 3, 1, 5 |
| **L3** | turned | one TOO-BIG pair and one GAP-type pair | 4, 3, 5 |

Material available per socket shape: **square** FIT `{S-a, S-b}`, GAP `{S-c, S-d, S-e, S-g}`, TOO BIG `{S-f}` · **rectangle** FIT `{R-a, R-b}`, GAP `{R-c, R-d, R-e}`, TOO BIG `{R-f}` · **triangle** FIT `{T-a}`, GAP `{T-c, T-e}`, TOO BIG `{T-d}`.

Every bay at every level holds exactly two stones in the same fill (misconception 5, structurally guaranteed by the barrow), and every distractor is the output of a named misconception (F-115; BUILD-CONVENTIONS §8.1 distractor legality applied to shape), so elimination-by-absurdity is unavailable and the only thing that separates the bays is mentally closing the join.

### Item plan

Eight items, one per socket, in the yard's way-order. At Play start each socket's fitting pair is drawn from its shape's FIT set so that **no fitting-pair identity repeats on two consecutive sockets** — the fixed-world form of §13, moved from the layout onto the content list because in a persistent world the stations cannot move. A representative lay-out: `S-a · S-b · R-a · S-a · R-b · T-a · R-a · T-a`. Bay order is shuffled per item and the fitting bay index never repeats twice running.

**Worked example of one session.** Item 1 (socket 1, square, L1): the child taps the two small squares; they settle in and the bottom half of the socket stays open earth, coral, for a second; then the two triangles, helped — solved-with-help, the tortoise steps onto stone 1 · item 2 (socket 2, square, L1) first try, two rectangles · item 3 (socket 3, rectangle, L1) first try, two squares, and two first-tries in a row raise the level → L2 · item 4 (socket 4, square, L2): the fitting rectangles lie flat in the barrow; the child taps them and they **stand up as they travel** and seat · item 5 (socket 5, rectangle, L2) first try → L3 · item 6 (socket 6, triangle, L3): the child taps the two big squares; the second rides up onto stone 5 and stands proud with a coral outline round the part beyond the socket, and coral earth shows in the corner it left open; then the two half-triangles, helped → back to L2 · item 7 (socket 7, rectangle, L2) first try · item 8 (socket 8, triangle, L2) first try. The tortoise walks up onto the step and the three young ones come down onto the eight stones it made.

## Rules
- **Item count:** 8 — one per socket in the yard. The item count is a property of the world and cannot be tuned independently of it (see Adaptation).
- **Difficulty progression:** 2 consecutive first-try correct lays raise the material one level (cap L3). The yard is untouched.
- **Adaptation:** any wrong lay on an item, or a wrong first try on 2 consecutive items, drops the material one level for the next socket (floor L1). The current item is never abandoned. **Re-queue (F-41) takes the fixed-world form:** a missed skill cannot come back as a ninth place, so it returns as **the same misconception's distractor family at the next socket** — the same kind of obstacle in a new place, which is what F-41 asks for.
- **What happens on a correct answer:** `ANIM.pop`, `tone("correct")`, the two stones rise, grow, turn to fit where the barrow pose differs, and seat 120 ms apart with `tone("tap", 1)` and `tone("tap", 3)`; the socket becomes `ART.stoneLaid` with `ART.joinLine`; the tortoise walks onto it (`ANIM.step`); `GameCore.showPraise` rotates ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]; the next socket takes the dashed outline and the barrow tips out three fresh bays. Total ACT ≤ 1180 ms.
- **What happens on a wrong answer (per anticipated mistake):**
  - Two pieces of the right kind but too small (`S-c`, `S-d`, `R-c`, `R-e`): `ANIM.nudge`, `tone("nudge")`, the stones settle in, the uncovered earth shows coral beneath them for 1000 ms, they lift out and go back.
  - A round stone for a cornered socket (`S-e`, `S-g`, `T-e`): the round stone rolls to the middle and coral shows all round it — the corners stay open.
  - Too big (`S-f`, `R-f`, `T-d`): the second stone rides up (`ANIM.rideUp`) onto the laid stone or the curb on the far side and stands proud, with `ART.overhangMark` on the part beyond the socket and `ART.gapMark` on anything it left open.
  - A turned fitting pair not recognised: the standard cue for the pair the child tapped, and on the 2nd wrong lay the fitting pair's stones `ANIM.hintTurn` in their bay.
  - In every case **the world is frozen while the correction plays** (about 1.9 s), the socket is left exactly as it was, and the tortoise is never the consequence: it changes pose to look at the gap and nothing else. No mark, no red, no sad face, nothing shut.
- **Retry behaviour:** attempt 1 unaided → attempt 2 after the fit cue → attempt 3 with `ART.showRing` on the fitting bay; tapping the ringed bay lays the stone and completes the item as solved-with-help. There is no attempt 4. An item completed after any wrong lay never counts as first-try.
- **Anti-brute-force guard: THE FRESH TIP** — the named replacement for P1's tile re-shuffle, which is impossible here because a station that jumps when you knock on it destroys the world's constancy. The eight sockets, the step and the doorway are fixed for the session and the child gets a stable map; what moves is the **material**, because the barrow tips out three new pairs for every socket. A bay is a delivery point, not a station, so which pair lies in which bay is re-drawn every item and P1's guard survives intact and legally. Two supporting rules make trying them all cost something: every distractor is the output of a named misconception in the same fill, so elimination-by-absurdity is unavailable; and the lay is remembered — an item laid after any wrong lay is not first-try — while from L2 the fitting pair is tipped out turned, so "the pair that looks like the one that worked last time" transfers nothing. **Honest limit:** with three candidates and a certain-success ladder no guard can prevent exhaustive trial, and none in this catalogue does. What THE FRESH TIP guarantees is that trying them all is visible, costs the first-try record, and teaches on every attempt, because each wrong lay is an enacted correction rather than a rejected guess.
- **THE RATCHET RULE, structurally:** the yard only ever gains stones. A refused pair leaves the socket exactly as it was, because a socket that was never paved cannot become less paved. Nothing is dropped, taken back, or collapsed; the young tortoises never leave; the step never moves. Zero ways a session ends other than by arriving.
- **Finish condition:** 8 sockets paved. The tortoise crosses to the step and the young ones come down onto the stones. No losing state; no clock; no score.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read through `S(key)`): `title` = "Stone by Stone". A built game ships all 11 locale keys per BUILD-CONVENTIONS §17; the title is the only game-specific string and it appears on the Start screen only.
- **No words on the play screen in any language.** The premise is carried entirely by the picture — a tortoise, a floor full of holes, and three young ones waiting on a step — which is what the 5-6 zero-word budget requires (F-42, F-6).

## Sound
`tone("correct")` when a pair is accepted; `tone("tap", 1)` and `tone("tap", 3)` as the two stones seat, so the pair is heard as two; `tone("nudge")` when the socket refuses a pair; `tone("finish")` once. Silent under `?sound=off`; no audio files, nothing spoken. Sound never carries meaning the screen does not also show: the coral earth and the proud stone carry it.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: the yard, the tortoise, the step with the three young ones and all three bays fully visible; bays remain separate targets).
- [ ] Keyboard operable (Tab cycles the three bays; Enter or Space lays; the yard, the tortoise and the step are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (8 wrong lays in a row still reach All done via the show-me ring; the tortoise never falls, never shows an error pose, and never moves backwards).
- [ ] **Mission — Deletion test B:** `mutate-mission.js` removes `mission.goal` and `mission.hero`; the game must **fail to complete an item**, at the line that asks the yard which socket is live. Requires that the build derives `socket = yard.nextFrom(hero.position)` and does **not** store a socket on the item record — the one implementation decision the whole redesign rests on.
- [ ] **Mission — Deletion test A:** make every socket accept every pair; the yard must pave itself in eight taps whatever the child does, with no decision and no world response that differs between bays.
- [ ] **Mission — Deletion test C (instant cut):** patch `ANIM.step` to `duration: 0`. Every decision, every item, every correction and every world state is identical and the session plays the same, about 3 seconds shorter.
- [ ] **THE RATCHET RULE:** after any number of wrong lays, no laid stone is removed, no join line disappears, no young tortoise leaves the step, and the socket under test is byte-identical to its state before the cue.
- [ ] **F-42 freeze:** at every point where a bay is enabled, `scene.tweens.getTweens().length === 0` (focus ring excepted). No idle bob on the tortoise, ever.
- [ ] Laying the two triangles into the square socket makes them travel, meet along the diagonal and seat, and the dashed outline becomes a stone with a join line down its diagonal.
- [ ] Laying the two small squares leaves the bottom half of the socket showing coral earth beneath them, then they go back and the socket is unchanged.
- [ ] The triangle-and-round-stone bay leaves coral showing all round the round stone, in the corners.
- [ ] At level 2 a fitting pair lying flat in the barrow stands up while it travels and seats exactly.
- [ ] At level 3 a too-big stone rides onto the far-side stone or the curb, stands proud, and carries a coral outline on the part beyond the socket — and never rides onto the tortoise.
- [ ] Every bay always shows exactly two stones, all in the same fill; no bay is ever marked by colour.
- [ ] The tortoise's position after item k is stone k, and exactly one socket carries the dashed outline at any moment.
- [ ] `check-pools`-style Boot assertion: every pair declaring empty gap and overhang regions really does tile its socket, and every other pair's authored regions equal the computed residue.
- [ ] Total ACT time across a clean 8-item session is under 60 s.
- [ ] The finish screen is the yard at its play coordinates with eight stones and their join lines, the tortoise on the step and the three young ones down on the stones — and no score, no stars and no count.
- [ ] With `?sound=off` nothing is audible.
