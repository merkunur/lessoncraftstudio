# 125 — Shadow Show

## Identity
- Slug: `shape-hunt-real-world`
- Frame: THE TENDING
- Subject / topic: Mathematics / 2D shapes (circle, triangle, square, rectangle) recognised as the outline of everyday objects
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three lamp-marks on the floor; the badger walks to the mark under the thing whose shadow the picture needs next)
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Frame contract: `MISSIONS.md` FRAME 7 THE TENDING. Pattern contract: `catalogue/PATTERNS.md` P1 — the pattern now records only how the finger reaches the world (`GAME-DESIGN-LAW.md`: frame = the game, pattern = the finger). Content is language-neutral (a shape is a shape in every locale); no `LOCALE_DATA`; **no shape name is ever written or spoken** — the plan's coral outline is the whole question. Sorting drawn shapes into shaped holes is game 005; this game is the step after it: seeing the shape INSIDE a real thing, and it now does that by *casting the thing's shadow*.

## Learning
- Objective: Looks at a shape outline — including rotated and skinny versions — and taps the one everyday object among three whose outline is that shape.
- Prerequisites: Has met the four basic shapes (game 005 is the natural predecessor). No reading, no counting required; the side-count badges 1-4 are support, not a gate.
- Curriculum links: F-115 (prototype orientation — a rotated square is "a diamond", ~⅓ of 4-6-year-olds; about half fail on flipped/skinny triangles; loses place counting sides — responses: vary orientation and type from level 1, count sides as feedback, sides light one by one), F-21 ("2D shapes circle/square/rectangle/triangle" in all twelve systems), F-31 row "2D shapes named (4 basic)" — conservative 6-7, earliest 4 → 5-6 (US K.G.A.2 "correctly name shapes regardless of their orientations or overall size" and K.G.B.4 "analyze and compare … using informal language to describe their similarities"; England Reception ELG / Y1 "recognise and name common 2-D shapes"; Germany Klasse 1 "ebene Figuren in der Umwelt entdecken"; France GS "reconnaître des formes dans l'environnement"; Netherlands groep 1-2 "vormen herkennen in de omgeving"; Spain Infantil "formas planas en objetos"; Brazil EF01MA14; Sweden förskoleklass "geometriska objekt i vardagen"; Finland esiopetus). Feedback is enacted, never written (F-43; F-42 zero text on the play screen for 5-6).
- Common misconceptions (F-115), each with this game's response:
  1. **A rotated square is a different shape ("that's a diamond, the gift box is a square").** Response: the picture's `window` slot IS a square set at 45°, drawn in the plan from tap one, so a square that turns is now the *success* event — an upright die's shadow rises up the beam, turns once (`ANIM.seat`) and settles into the diamond-set outline, and the child watches a square become a diamond and still be taken. On a wrong cast against a rotated outline the world freezes and the asked outline turns live to upright and back (`ANIM.turnUpright`) while the cast shadow stands beside it at the same size and its four sides light one by one — the same shape, twice, in two poses, both on the screen.
  2. **Skinny or upside-down triangles are "not triangles".** Response: the `poplar` slot is a base-34 × height-84 skinny triangle and the `roof` slot is a base-104 × height-46 wide one, both in the plan from tap one; the L2/L3 shelves stand a wedge of cheese against a tall doorstop. A wrong cast lights the asked outline's three sides in order, 300 ms apart — `ART.sideGlow` along each side with `ART.countBadge` k at its midpoint and `tone("tap", k)`, the last badge `ANIM.lastBadge` — then the cast shadow's sides light the same way, and the child sees 3 against 4, or against a round outline with no corners at all. The beam itself carries the rest: the shadow seats at *the light's* proportions, so one wedge can honestly fill a skinny slot.
  3. **Square and rectangle confused (the door is "a square").** Response: L2 and L3 shelves always carry a square prop and a rectangle prop together, and the mismatch is now left standing as **leftover area** — a rectangle's shadow overhangs the square outline at two ends by a visible amount; a square's shadow leaves two strips of the rectangle outline empty. Then the side glows confirm what the gap already showed: four equal against two long and two short. Shown by the apparatus, not named.
  4. **Choosing by what the object IS ("a ball is round, so the clock is a ball") or by a detail (the ribbon on the gift).** Response: this is now structural rather than a hint — **the shadow discards identity.** No colour, no pips, no clock hands, no spine, no perforated stub reaches the screen, so the feature the child chose on is absent from the answer channel entirely. And the outline is seen ON the thing before it is seen alone: `ART.peelOutline` lights around the prop itself in the accent colour, then peels off up the beam (`ANIM.peel`) and lands in the picture — abstraction, animated, in one 500 ms move. No prop appears in a session's last three items.
  5. **Losing count of the sides.** Response: the sides light in order round the shape, each with its badge, 300 ms apart, and the last badge grows (`ANIM.lastBadge`) — the count is done for the child, the way game 001 counts berries; a round outline instead gets one `ART.roundGlow` pulse (`ANIM.pulse`) and no badges. Re-sited onto the screen, where both outlines already are, so the count happens in the place the child is already looking.

## Mission
**Mission, as the child would say it.** *The picture is not finished, so the show cannot start. Put the light behind the right thing.*

**The hero.** A badger — nocturnal, ground-walking, stocky enough to carry a lantern on a stick, and unused by 001 (fox) and 002 (hen). It works the light at a little shadow theatre. Its body takes the `inkSoft` tint pair with `surface` face stripes, so it spends **no coral and no teal**: the whole one-accent-per-screen budget stays free for the single state colour, the outline of the piece the picture is asking for. Poses: `badgerIdle` (holding the lantern, waiting), `badgerWalk` (crossing the floor), `badgerThink` (looking UP at the screen — used on a shadow that will not settle, so attention stays on the apparatus), `badgerHappy` (a piece settles), `badgerLift` (the act: raises the lantern, opening the beam).

**The want, legible in one still frame at 400 px.** A big pale screen carries a faint dashed PLAN of a whole night picture — moon, tree, house, roof, window, door, gate, bush — most of it still only lines. One piece of that plan is outlined in coral: the piece the show needs next. Three small animals sit on the floor looking up at it, waiting. A badger stands under three ordinary things with a lit lantern. Nothing has to be read: *the picture is not finished, and that lamp is how it gets finished.*

**The goal.** The finished picture, at a fixed position on the screen from tap one, in a state only the child's casting changes. The distance to it is visible as the number of slots still drawn in dashes.

**The single state variable.** **`S` = the badger's x on the floor — which of the three lamp-marks it is standing on.**
- **Physical reading:** which of the three things is between the lantern and the screen — that is, *which shadow is on the screen right now*. `cast = silhouette(propAbove(badger.x))`.
- **Mathematical reading:** which everyday object the child is claiming has the asked shape as its outline.

One variable, two readings. The child manipulates the physical one; the mathematics is what that manipulation means.

**The isomorphism — the lamp is behind whatever stands above where the badger stands, so the shadow is COMPUTED from position and never looked up.** The child never says "the clock is the circle". The child walks the light behind the clock, and the light draws the clock's edge on the screen, by itself, at the size the geometry gives it. The commit handler reads a floor position; the shadow is a function of that position; the world then asks whether that shadow is the shape the picture is missing.

```
worksheet:  if (tapped === item.answer)
this game:  cast = silhouette(propAbove(badger.x));  if (plan.current.accepts(cast))
```

Both sides of that predicate are on the screen and visible: a coral dashed outline the picture needs, and a shadow the child just caused. The child watches the fit be attempted, not a verdict be handed down. Three things make this the abstraction rather than a shape-match: the shadow **discards identity** (misconception 4, refuted structurally); the outline is seen **on the thing before it is seen alone** (`ANIM.peel`: on-the-thing → in-the-air → in-the-picture); and the shadow is **bigger than the prop**, because the lamp is close, so the same shape arrives at a different size and K.G.A.2's *"regardless of orientation or overall size"* is carried by the apparatus for free.

**The mark that stays.** A settled shadow. The plan fills in, piece by piece, and never empties (see Rules, the ratchet).

**Deletion A — delete the maths** (every shadow settles into every outline): the badger walks three paces with a lamp and the picture fills whatever it does. No choice has a consequence, so there is no choice. Nothing playable survives. **Deletion B — delete the mission** (no screen, no plan, no coral outline, no badger, no lantern, no watchers): three things and three floor spots, with no light, nothing to cast, nothing to fill and no way to commit. This is the strong form: **the mission owns the output device.** The shape does not merely lose its reason to exist, it loses its *place* to exist, because it only ever existed as a shadow, and the shadow only ever existed because the hero carried the lamp. There is no worksheet underneath to fall back on. **Deletion C — patch every traversal tween to `duration: 0`**: the session plays identically, and that is the required result. This game's Displacement is **positional, not durational** — `answer = f(badger.x)` holds at 450 ms and at 0 ms alike, and what carries the mission is the arrangement (MISSIONS 2.4): a hero at a position, three things above three marks, a plan with one coral piece left, three watchers already sitting down. The load-bearing motion is the **cast**, which is not a traversal: it is the answer being computed in front of the child.

## World
**Zone T (0-56):** the language picker at (16, 16), hidden under `?embed=1`. Nothing else. No progress strip of any kind.

**Zone W (56-420) — the whole world; hero and destination are both inside it at every moment.**

- **THE SCREEN** — `ART.screen`, 528 × 176, centred at **(424, 150)**, so x 160..688 and y 62..238. Inner picture area x 172..676, y 74..226; the picture's ground line is y = 226.
- **THE PLAN — eight fixed slots**, drawn as faint dashed hairlines from tap one (the whole destination, visible, unchanging). A settled slot fills to `ART.shadowSettled`. The slot being asked right now is the screen's one coral element (`ART.askCircle` / `ART.askTri` / `ART.askSquare` / `ART.askRect`).

  | # | slot | outline | centre |
  |---|---|---|---|
  | 1 | moon | circle r 26 | (232, 112) |
  | 2 | roof | triangle base 104 × height 46, apex up | (400, 119) |
  | 3 | wall | square 84 | (400, 184) |
  | 4 | bush | circle r 30 | (600, 196) |
  | 5 | gate | rectangle 76 × 26, landscape | (520, 212) |
  | 6 | door | rectangle 34 × 56, tall | (420, 198) |
  | 7 | poplar | triangle base 34 × height 84, skinny, apex up | (300, 184) |
  | 8 | window | square 30, set at 45° | (380, 170) |

  Family balance is exactly 2 circle / 2 triangle / 2 square / 2 rectangle, so §13's fixed-world form ("never the same family twice running") is always satisfiable. The door and the window overlap the settled wall — a shadow on a shadow, which is physically right and makes the picture read as a scene. **Measured correction to the approved sketch:** the window moves from (372, 160) to (380, 170) and the door from (416, 198) to (420, 198), because at the sketch coordinates the window's left corner fell 7 px outside the wall it sits in and clipped the door by a 2 × 21 px sliver. Every slot now lies inside the picture area and inside its parent form.
- **THE WATCHERS** (MISSIONS §5 Device 1, the waiting party) — three roster animals at 52 px sitting on the floor facing up-right at the screen: `ART.watchMouse` (44, 298), `ART.watchChick` (96, 302), `ART.watchHedgehog` (148, 296), seated bases just in front of the floor line. Drawn from tap one. **They never react to an item**; they change only at the finish.
- **THE FLOOR** — `ART.floorLine` across x 16..704 at y = 318, with `ART.floorWash` from y 318 to 560.
- **THE SHELF** — three props standing on the floor line, at most 72 px, centred at **(280, 282) · (440, 282) · (600, 282)** so they occupy y 246..318, clear of the screen by 8 px.
- **THE THREE LAMP-MARKS** — `ART.lampMark`, dashed circles r 44 (88 px) at **(280, 372) · (440, 372) · (600, 372)**, y 328..416. Tap floor 88 ≥ 80 for band 5-6; pitch 160, gap 72 ≥ 12. A spent mark redraws as `ART.markSpent`.
- **HIT COLUMN** — each mark's `makeTile` hit area is **88 × 168 centred on (markX, 316)**, y 232..400, covering the prop *and* the spot beneath it, so a five-year-old who reaches for the clock makes the same move as one who reaches for the floor. (Declared trade: see Rules.)
- **THE BADGER** — a 76 px container standing on a mark at **(markX, 352)**, y 314..390, drawn above the mark. Its x is `S`. It starts the session on the left mark at (280, 352). During DECIDE its lantern casts `ART.lightPool`, a **static** pool on the floor — no beam, no tween, so no shadow is ever given away before commitment.
- **THE BEAM** — `ART.beam`, a wash wedge from the raised lantern at about (markX + 24, 330), up past the prop's silhouette onto the screen, drawn *behind* the props and above the screen, all game art below depth 1000 (BUILD-CONVENTIONS §3.2). It exists **only during ACT**.

**Zone H (420-560): empty of controls — the world is the hand.** This is the mission-layout signature (MISSIONS 1.4: in several frames the hand is empty, because the world itself is what the child taps). It holds two inert rows only: the **set-aside line** at y = 424, where a prop the light has already stood behind is set down at 44 px on its own mark's x for the rest of that item; and the **used-things row** growing from item 1 at **y = 482, x = 132 + i × 66**, eight props at 48 px. **Measured correction:** the sketch put the used row at y = 462, which overlapped the set-aside line by 8 px; at 482 the two rows clear each other by 12 px and the row's lowest pixel is 506, comfortably above the buttons' band.

**Interactive elements = 3 marks + the badger = 4**, against the budget of 10 (F-69, read per `GAME-DESIGN-LAW` §5.1). **ACT budget:** walk ≤ 450 ms (320 px maximum) + lift and cast 500 ms + settle or refuse 250 ms ≈ 1150 ms, inside the 1200 ms cap; eight items ≈ 10 s of ACT against the 60 s session budget.

## How it plays
1. **Start screen**: title "Shadow Show" (`S("title")`), `ART.badgerIdle` at (360, 210) with a breathing idle (start screen only, ART-BIBLE §6), `makeButton` `t("start")`, the picker at (16, 16). Never auto-starts.
2. **The world builds, once.** `ART.screen`, the eight dashed plan slots, the three watchers, `ART.floorLine`, `ART.floorWash`, the three `ART.lampMark`s, and the badger `ART.badgerIdle` on the left mark at (280, 352). The shelf lays out item 1's three props at (280/440/600, 282). Nothing is written anywhere; there is no text on the play screen in any language.
3. **Item 1 demonstrates the apparatus once, answering nothing.** Before the three marks are enabled, the badger swaps to `ART.badgerLift` and `ART.beam` opens on an **empty** stretch of floor beside it (no prop above it), holds, and closes — about 600 ms, caused by the child's Start tap, finished before any target is live, so the F1 freeze rule holds. Then `ART.askCircle` lights on the `moon` slot, the marks enable, and the stage freezes. This is the one place the beam's direction is taught (see Rules, risk note).
4. **DECIDE.** Zero tweens run. The badger holds one static pose. The only coral on screen is the asked slot's outline. The child looks from the coral outline to the three things on the shelf.
5. **The child taps the mark under the plate (600, 372) — a correct cast.**
   - Targets disable. `ART.badgerWalk` swaps in and the container tweens 280 → 600 (`ANIM.walk`, 450 ms).
   - On arrival, pose `ART.badgerLift`; `ART.beam` opens (`ANIM.beamOpen`, 120 ms); `ART.peelOutline` lights **around the plate itself** (`ANIM.appear`), then leaves it and travels up the beam growing to 1.35×, landing on the screen over the moon slot as `ART.shadowCast` (`ANIM.peel`, 380 ms).
   - The families match, so the beam **seats** the shadow: it turns and takes the slot's own proportions (`ANIM.seat`, 250 ms) and settles as `ART.shadowSettled`. `tone("correct")`; badger to `ART.badgerHappy`; `GameCore.showPraise` with the next key in rotation; the plate is carried down into the used-things row (`ANIM.carryDown`, then `ANIM.pop` on landing); `ART.beam` closes (`ANIM.beamClose`).
   - After 900 ms the next item builds: the new shelf props arrive (`ANIM.appear`), the next slot's `ask*` outline lights, and the world freezes again. The badger does not go home — it stands where it finished (L2 persistence).
6. **Item 3, wrong on attempt 1.** The asked slot is `wall` (upright square 84). The shelf holds a gift box, a book and a ball. The child taps the mark under the book.
   - The badger walks, lifts, and the book's coral outline peels up the beam and arrives as a tall rectangle over the square outline.
   - **It is refused, not punished.** The shadow reaches the outline, turns once trying to seat (`ANIM.tryTurn`) and **stops, with the mismatch left standing where the child can read it** — the rectangle **overhangs the square outline at two ends** by a visible amount. `tone("nudge")`. The badger swaps to `ART.badgerThink` and looks **up at the screen**: the message is on the apparatus and the hero is reading it with the child. It does not step back, does not sag, does not pull a face.
   - **The enacted cue, world frozen, targets disabled, about 2.6 s.** The asked outline's four sides light in order, 300 ms apart — `ART.sideGlow` on each with `ART.countBadge` 1, 2, 3, 4 at the midpoints and `tone("tap", k)` climbing, the last badge `ANIM.lastBadge` — four *equal* glows. Then the cast shadow's own sides light the same way beside it: two long, two short. Then everything fades (`ANIM.fadeOut`).
   - **THE SET-ASIDE.** `ART.shadowCast` slides back down the beam into the book (`ANIM.peelBack`), the beam closes, and the book is lowered to the set-aside line at (600, 424) at 44 px (`ANIM.setAside`), still whole, still visible. Its mark redraws as `ART.markSpent` and disables. Two marks are live. Attempt 2 costs exactly one tap.
7. **Attempt 2, wrong again.** Same shape of event on the ball: a round shadow buries no corners and leaves four crescents of empty outline. The cue plays with `ART.roundGlow` (`ANIM.pulse`, no badges) on the ball's shadow against four badged sides on the asked outline. The ball is set aside; its mark spends.
8. **Attempt 3 is the show-me, and it is the world's own doing.** One mark is still live — the one under the gift box. It gains `ART.showRing` at 1 Hz (`ANIM.showMe`). Tapping it walks the badger, casts the square, seats it, and completes the item as solved-with-help (the shadow settles and the box joins the used row; no praise pop). **Success is certain, and the picture never fails to gain its piece.**
9. **Items 2-8** run the same shape against the plan's other slots, with the shelf drawn from the level the child is currently at (Rules). The window slot is where misconception 1 becomes the success event: an upright die's shadow arrives square, **turns 45° as it seats**, and is taken.
10. **Finish.** The eighth shadow settles. `ART.beam` widens until it washes the whole screen and the completed night picture stands in flat shadow. The three watchers look up together — their first and only change all session — swapping to `ART.watchMouseUp`, `ART.watchChickUp`, `ART.watchHedgehogUp` with `ANIM.watchLook`. The badger sets its lantern down and sits with them at (196, 348), `ART.badgerHappy` with `ANIM.celebrate`. The world is redrawn at its play coordinates; the marks and the badger's spots are gone, freeing y 328..420. `t("all_done")` at (360, 372); the eight used things stay in their row, moved up to y = 440; `makeButton` `t("play_again")` (250, 508) and `t("menu")` (470, 508); `tone("finish")`; `GameCore.reportHeight()`. **No score, no first-try count on screen** — the summary is the picture, and the row of ordinary things that cast it.

Session about 4 minutes.

## Art registry
```js
const ART = {
  /* the hero — grey badger, inkSoft tint pair + surface face stripes; spends no accent and no structure */
  badgerIdle:   { kind: "svg", value: LCSArt.get("badger.idle"),   size: 76 },
  badgerWalk:   { kind: "svg", value: LCSArt.get("badger.walk"),   size: 76 },
  badgerThink:  { kind: "svg", value: LCSArt.get("badger.think"),  size: 76 },
  badgerHappy:  { kind: "svg", value: LCSArt.get("badger.happy"),  size: 76 },
  badgerLift:   { kind: "svg", value: LCSArt.get("badger.lift"),   size: 76 },   // the act pose: lantern raised
  /* the waiting party — drawn from tap one, changed only at the finish */
  watchMouse:      { kind: "svg", value: LCSArt.get("mouse.idle"),     size: 52 },
  watchChick:      { kind: "svg", value: LCSArt.get("chick.idle"),     size: 52 },
  watchHedgehog:   { kind: "svg", value: LCSArt.get("hedgehog.idle"),  size: 52 },
  watchMouseUp:    { kind: "svg", value: LCSArt.get("mouse.happy"),    size: 52 },
  watchChickUp:    { kind: "svg", value: LCSArt.get("chick.happy"),    size: 52 },
  watchHedgehogUp: { kind: "svg", value: LCSArt.get("hedgehog.happy"), size: 52 },
  /* the props — ordinary things, ≤ 72 px, each carrying identity detail the shadow discards */
  propClock:        { kind: "svg", value: LCSArt.get("clock.round"),   size: 66 },  // round: hands, rim, hour pips
  propPlate:        { kind: "svg", value: LCSArt.get("plate"),         size: 68 },  // round: painted ring
  propBall:         { kind: "svg", value: LCSArt.get("ball"),          size: 62 },  // round: panel seams
  propTin:          { kind: "svg", value: LCSArt.get("tin.round"),     size: 64 },  // round: printed lid band
  propDrum:         { kind: "svg", value: LCSArt.get("drum"),          size: 66 },  // round: lugs and skin
  propCheese:       { kind: "svg", value: LCSArt.get("cheese.wedge"),  size: 66 },  // triangle, wide: holes
  propTent:         { kind: "svg", value: LCSArt.get("tent"),          size: 70 },  // triangle, wide: door seam
  propSetSquare:    { kind: "svg", value: LCSArt.get("setsquare"),     size: 68 },  // triangle, right: printed scale
  propDoorstop:     { kind: "svg", value: LCSArt.get("doorstop"),      size: 60 },  // triangle, low wedge: grip lines
  propDie:          { kind: "svg", value: LCSArt.get("die"),           size: 60 },  // square: pips
  propGiftBox:      { kind: "svg", value: LCSArt.get("giftbox"),       size: 64 },  // square: flat ribbon cross, no bow
  propPictureFrame: { kind: "svg", value: LCSArt.get("pictureframe"),  size: 66 },  // square: framed scene
  propBiscuit:      { kind: "svg", value: LCSArt.get("biscuit"),       size: 58 },  // square: dimples
  propBook:         { kind: "svg", value: LCSArt.get("book"),          size: 66 },  // rectangle, tall: spine, title band
  propTicket:       { kind: "svg", value: LCSArt.get("ticket"),        size: 62 },  // rectangle, landscape: perforated stub
  propBrick:        { kind: "svg", value: LCSArt.get("brick"),         size: 62 },  // rectangle, landscape: indent
  propCard:         { kind: "svg", value: LCSArt.get("card.post"),     size: 62 },  // rectangle, landscape: printed stripe
  /* the apparatus */
  screen:        { kind: "shape", shape: "roundRect", w: 528, h: 176, fill: "surface2", stroke: "structure", strokeWidth: 4, radius: 8 },
  floorLine:     { kind: "shape", shape: "line", w: 688, stroke: "line", strokeWidth: 3 },
  floorWash:     { kind: "shape", shape: "rect", w: 720, h: 242, fill: "surface2" },
  lampMark:      { kind: "shape", shape: "circle", r: 44, stroke: "structure", strokeWidth: 3, dash: [6, 6] },
  markSpent:     { kind: "shape", shape: "circle", r: 44, stroke: "line", strokeWidth: 2, dash: [6, 6] },
  lightPool:     { kind: "shape", shape: "ellipse", w: 96, h: 26, fill: "structureSoft" },
  beam:          { kind: "shape", shape: "polygon", points: [[0,0],[0,0],[0,0],[0,0]], fill: "structureSoft", alpha: 0.30 },  // apex at the lantern, far edge on the asked slot's box; computed at call
  /* the plan — dashed hairlines, geometry per the World table */
  planCircle:    { kind: "shape", shape: "circle",  r: 26, stroke: "line", strokeWidth: 2, dash: [5, 5] },
  planTri:       { kind: "shape", shape: "polygon", points: [[0,-23],[52,23],[-52,23]], stroke: "line", strokeWidth: 2, dash: [5, 5] },
  planSquare:    { kind: "shape", shape: "rect",    w: 84, h: 84, stroke: "line", strokeWidth: 2, dash: [5, 5] },
  planRect:      { kind: "shape", shape: "rect",    w: 76, h: 26, stroke: "line", strokeWidth: 2, dash: [5, 5] },
  /* the asked slot — the ONE coral element on a DECIDE screen; identical geometry, solid, heavier */
  askCircle:     { kind: "shape", shape: "circle",  r: 26, stroke: "accent", strokeWidth: 5 },
  askTri:        { kind: "shape", shape: "polygon", points: [[0,-23],[52,23],[-52,23]], stroke: "accent", strokeWidth: 5 },
  askSquare:     { kind: "shape", shape: "rect",    w: 84, h: 84, stroke: "accent", strokeWidth: 5 },
  askRect:       { kind: "shape", shape: "rect",    w: 76, h: 26, stroke: "accent", strokeWidth: 5 },
  /* the shadows */
  peelOutline:   { kind: "shape", shape: "polygon", points: [[0,0],[0,0],[0,0]], stroke: "accent", strokeWidth: 4 },   // the prop's own schematic outline, ±6 px
  shadowCast:    { kind: "shape", shape: "polygon", points: [[0,0],[0,0],[0,0]], fill: "inkSoft", alpha: 0.50 },       // the silhouette in flight, at its own proportions
  shadowSettled: { kind: "shape", shape: "polygon", points: [[0,0],[0,0],[0,0]], fill: "inkSoft", alpha: 0.50 },       // seated: the slot's own geometry, filled flat
  /* the enacted cue */
  sideGlow:      { kind: "shape", shape: "line", w: 60, stroke: "accent", strokeWidth: 6 },   // one per side; length and angle set to the side at call
  roundGlow:     { kind: "shape", shape: "circle", r: 36, stroke: "accent", strokeWidth: 6 }, // a round outline lights once, no badges
  countBadge:    { kind: "shape", shape: "circle", r: 14, fill: "structure" },                // numeral 18 px display, bg-coloured, at the side's midpoint pushed 14 px outward
  showRing:      { kind: "shape", shape: "circle", r: 50, stroke: "structure", strokeWidth: 4 }
};
```
**Binding art rules for this game, because they are the pedagogy and they are the easiest thing to lose at build time.**
1. **Every prop must carry identity detail the shadow discards** — the clock has hands and hour pips, the book a spine, the die its pips, the ticket its perforated stub. If the props are drawn as tidy plain shapes, misconception 4 stops being addressed and the game collapses into trivial outline-matching. The visual critic grades this explicitly.
2. **No prop may have a protruding part or a see-through hole** — no handles, spouts, bows, guy-lines, spokes, or the cut-out a real set square has — because the shadow is a solid schematic outline (±6 px), not a true projection, and a handle or a gap is exactly where that simplification becomes visibly false.
3. **Colour budget.** No prop and no character carries `accent`. At every DECIDE moment exactly one coral element is on screen: the asked slot's outline. The other `accent` entries (`peelOutline`, `sideGlow`, `roundGlow`) exist only inside ACT and are drawn on the two outlines being compared. The badger's grey body uses the `inkSoft` tint pair — declared as an extension of ART-BIBLE §2, whose character list names `structure`, `accent`, `surface2` and `bg`: grey is unsaturated, so it does not breach that clause's actual rule ("never a saturated colour outside this set"), and it is the honest colour for a badger. Recorded here rather than left silent.
4. Every drawing listed above is a new `_lib/art.js` entry and goes through `_tools/art-sheet.js` at 48/96/192/384, read at size, **before** the visual critic sees a screenshot. The 001 fox is why that gate exists.

## Animation registry
```js
const ANIM = {
  walk:        { duration: 450, ease: "Sine.InOut", trigger: "the badger's container x to the tapped mark (x set at call); 320 px maximum" },
  beamOpen:    { alpha: 0.30, scaleY: 1, duration: 120, ease: "Sine.Out", trigger: "ART.beam from alpha 0, scaleY 0.2, on the lift" },
  beamClose:   { alpha: 0, duration: 180, ease: "Sine.In", trigger: "ART.beam at the end of an act" },
  peel:        { duration: 380, ease: "Sine.InOut", trigger: "ART.peelOutline leaving the prop and travelling up the beam to the screen (x, y and scale 1.35 set at call), arriving as ART.shadowCast" },
  peelBack:    { duration: 380, ease: "Sine.InOut", trigger: "a refused ART.shadowCast sliding back down the beam into its prop" },
  seat:        { duration: 250, ease: "Back.Out", trigger: "a matching shadow turning and taking the slot's proportions (angle, scaleX, scaleY set from the slot), becoming ART.shadowSettled" },
  tryTurn:     { angle: "+=8", duration: 250, ease: "Sine.InOut", yoyo: true, trigger: "a non-matching shadow turning once at the outline and stopping, mismatch left standing" },
  turnUpright: { angle: 0, duration: 400, ease: "Sine.InOut", yoyo: true, trigger: "the asked outline turning from its plan pose to upright and back, during the cue on a rotated slot" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new shelf, ART.peelOutline on the prop, the side glows (from alpha 0, scale 0.6)" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "side glows, badges and the compared outlines after the cue" },
  setAside:    { duration: 300, ease: "Sine.In", trigger: "a spent prop lowering from the shelf to (markX, 424) at 44 px" },
  carryDown:   { duration: 300, ease: "Sine.InOut", trigger: "a prop that cast its piece travelling into the used-things row (x, y set at call)" },
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a used thing landing in its row" },
  lastBadge:   { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last side's badge" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "ART.roundGlow on a round outline" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ART.showRing on the one live mark at attempt 3 (from alpha 0.2)" },
  watchLook:   { y: "-=6", duration: 260, ease: "Back.Out", trigger: "the three watchers looking up, finish only" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the badger, finish screen only" }
};
```
No flashing: `ANIM.showMe` runs at 1 Hz; sides light once each, 300 ms apart. **DECIDE runs zero tweens** (F-42, F1): every entry above is triggered by the child's own tap or by the finish.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T   0- 56
 56   ├──────────────────────────────────────────────────────────────┤
      │    ┌─────────── THE SCREEN (424,150) 528 x 176 ───────────┐   │
      │    │  (moon)      /roof\                                  │   │
      │    │      /\    [ wall  ]         [gate]        (bush)    │   │  zone W
      │    │   poplar   <win> |door|                              │   │  56-420
      │    └──────────────────────────────────────────────────────┘   │
      │  mouse  chick  hedgehog          shelf props y=282           │
      │   (44)   (96)   (148)      [280]     [440]     [600]         │
      │ ─────────────────────── floor line y=318 ──────────────────── │
      │              ( mark )    ( mark )    ( mark )   y=372 r44     │
      │              badger stands on one of them, y=352              │
420   ├──────────────────────────────────────────────────────────────┤
      │  set-aside line y=424 (44 px, on its own mark's x)            │  zone H
      │  used things row y=482, x = 132 + i x 66, 48 px               │  420-560
560   └──────────────────────────────────────────────────────────────┘
```
Fixed 720 × 560, `Scale.FIT`, static camera, no scrolling. Progress is diegetic: the plan filling in on the screen and the row of used things beneath it. Nothing abstract counts the items anywhere.

## Visual specification
- Background `THEME.colour.bg`. All game art below depth 1000 so the language panel (depth 1500) is never covered (BUILD-CONVENTIONS §3.2).
- `ART.screen` at (424, 150); the eight plan slots drawn inside it at the World table's coordinates using `ART.planCircle`, `ART.planTri`, `ART.planSquare` and `ART.planRect`, each scaled to its own row's dimensions. The asked slot is redrawn on top in the matching `ART.askCircle` / `ART.askTri` / `ART.askSquare` / `ART.askRect`, in the slot's own pose (the window's ask outline is set at 45°).
- A settled slot carries `ART.shadowSettled` at the slot's geometry; settled slots stay for the whole session and are drawn under the door and window so a later piece sits on top of the wall.
- `ART.watchMouse` (44, 298), `ART.watchChick` (96, 302), `ART.watchHedgehog` (148, 296), all 52 px, seated, facing up-right, unchanged all session; at the finish they swap to `ART.watchMouseUp`, `ART.watchChickUp` and `ART.watchHedgehogUp`.
- `ART.floorLine` at y = 318 across x 16..704; `ART.floorWash` from y 318 downward.
- Shelf props at (280/440/600, 282), at most 72 px, standing on the floor line, drawn at their Art-registry sizes.
- `ART.lampMark` at (280/440/600, 372), r 44, dashed `structure`; a spent mark becomes `ART.markSpent` and its tile disables. `makeTile` hit area 88 × 168 centred on (markX, 316), mapped as a box, not sampled at its centre (BUILD-CONVENTIONS §3.1).
- The badger at (markX, 352), 76 px, above its mark, in one of `ART.badgerIdle` / `ART.badgerWalk` / `ART.badgerThink` / `ART.badgerHappy` / `ART.badgerLift`; `ART.lightPool` under the lantern during DECIDE only.
- `ART.beam` during ACT only, apex at (markX + 24, 330), far edge covering the asked slot's box, drawn behind the props and in front of the screen. `ART.peelOutline` then `ART.shadowCast` ride it.
- Cue: `ART.sideGlow` per side with `ART.countBadge` at each midpoint pushed 14 px outward, numeral 18 px `THEME.font.display` in `THEME.colour.bg` on the badge; `ART.roundGlow` for a round outline. `ART.showRing` behind the one live mark at attempt 3.
- All three targets 88 px, above the 80 px band floor, gaps 72 px. Tab order: the three marks, left to right; Enter or Space commits. The badger, the screen, the props and the watchers are not focusable. Under `?embed=1` the picker is not created. **No words on the play screen in any language.**

## Content
Language-neutral. There is no text, no numeral and no shape name on the play surface. An item = (a plan slot, which fixes the asked outline and its pose) + (a shelf of three props, drawn from the level the child is standing at when the slot comes up).

**Prop pool by outline family** — round: `ART.propClock`, `ART.propPlate`, `ART.propBall`, `ART.propTin`, `ART.propDrum` · triangle: `ART.propCheese`, `ART.propTent`, `ART.propSetSquare`, `ART.propDoorstop` · square: `ART.propDie`, `ART.propGiftBox`, `ART.propPictureFrame`, `ART.propBiscuit` · rectangle: `ART.propBook`, `ART.propTicket`, `ART.propBrick`, `ART.propCard`.

**Level buckets over the plan** (the slot's own difficulty, fixed by the picture): **L1** moon, roof, wall, bush (prototype poses) · **L2** gate, door (the two rectangles, met against squares) · **L3** poplar, window (the skinny triangle and the square set at 45°).

**Shelves.** Each slot carries three authored sets; the game takes the one matching the child's **current level**, not the slot's bucket, so a hard slot met early is met against far-apart candidates. The starred prop is the one whose outline is the asked family; **exactly one prop of the asked family is ever on the shelf.**

| slot | family | bucket | shelf at L1 | shelf at L2 | shelf at L3 |
|---|---|---|---|---|---|
| moon | circle | L1 | `ART.propBall`* · `ART.propCheese` · `ART.propDie` | `ART.propClock`* · `ART.propBrick` · `ART.propTent` | `ART.propPlate`* · `ART.propBiscuit` · `ART.propGiftBox` |
| roof | triangle | L1 | `ART.propCheese`* · `ART.propPlate` · `ART.propBook` | `ART.propTent`* · `ART.propCard` · `ART.propDie` | `ART.propSetSquare`* · `ART.propBrick` · `ART.propBiscuit` |
| wall | square | L1 | `ART.propDie`* · `ART.propDrum` · `ART.propTent` | `ART.propGiftBox`* · `ART.propBook` · `ART.propBall` | `ART.propBiscuit`* · `ART.propTicket` · `ART.propCard` |
| bush | circle | L1 | `ART.propDrum`* · `ART.propGiftBox` · `ART.propDoorstop` | `ART.propPlate`* · `ART.propTicket` · `ART.propSetSquare` | `ART.propTin`* · `ART.propDoorstop` · `ART.propSetSquare` |
| gate | rectangle | L2 | `ART.propTicket`* · `ART.propBall` · `ART.propCheese` | `ART.propBrick`* · `ART.propDie` · `ART.propTent` | `ART.propCard`* · `ART.propBiscuit` · `ART.propPictureFrame` |
| door | rectangle | L2 | `ART.propBook`* · `ART.propTin` · `ART.propDoorstop` | `ART.propCard`* · `ART.propGiftBox` · `ART.propPlate` | `ART.propBook`* · `ART.propDie` · `ART.propPictureFrame` |
| poplar | triangle | L3 | `ART.propTent`* · `ART.propTin` · `ART.propCard` | `ART.propDoorstop`* · `ART.propBrick` · `ART.propDie` | `ART.propCheese`* · `ART.propBiscuit` · `ART.propBook` |
| window | square | L3 | `ART.propGiftBox`* · `ART.propBall` · `ART.propCheese` | `ART.propPictureFrame`* · `ART.propTicket` · `ART.propDrum` | `ART.propDie`* · `ART.propCard` · `ART.propTin` |

**Distractor legality (BUILD-CONVENTIONS §8.1).** Each distractor is the output of the error the item diagnoses: against a square slot, a rectangle prop (misconception 3) and a round or three-sided prop (misconceptions 4 and 5); against a triangle slot, a four-sided prop and a round one; against a circle slot at L3, two four-sided props, so side-count has to be used. A distractor is never a second prop of the asked family, because two correct answers would make the fit meaningless.

**Placement.** The three props are laid on the three fixed positions in a shuffled order per item, subject to: the correct prop is **never above the same mark twice running** (§13, and it is what guarantees the badger moves on every item after the first); **at item 1 the correct prop is never on the left mark**, so the badger's first tap is always a real move; no prop appears in two consecutive items; and no prop appears twice within the last three items (misconception 4).

**Worked session.** Item 1 moon, plate on the right mark, first-try — the badger walks 280 → 600 and the moon settles. Item 2 roof, cheese, first-try, so the level moves to L2. Item 3 gate at L2 — the shelf is brick*, die, tent; the child taps the die: a square shadow lands on a landscape rectangle outline, leaving two long empty strips; the cue lights four equal sides against two long and two short; the die is set aside and its mark spends; the child then taps the brick and the gate settles as solved-with-help, so the next item drops to L1. Item 4 wall at L1 — die*, drum, tent, first-try. Item 5 bush at L1 — drum*, gift box, doorstop, first-try, back up to L2. Item 6 door at L2 — card*, gift box, plate, first-try, up to L3. Item 7 window at L3 — die*, card, tin: the die's upright square shadow turns 45° as it seats, and the child sees a square accepted as a diamond. Item 8 poplar at L3 — cheese*, biscuit, book: a wide wedge seats into a tall skinny outline, because the family is what must match and the proportions are the light's business. The picture is whole; eight ordinary things stand in a row beneath it.

## Rules
- **Item count**: 8 — one per plan slot, so the session and the picture end together.
- **Levels**: 3, over the plan's buckets (L1 moon/roof/wall/bush, L2 gate/door, L3 poplar/window). Play starts at L1.
- **Slot selection**: the next item is the next unasked slot from the current level's bucket, shuffled within the bucket; if that bucket is exhausted, take the nearest bucket below, then above. Two consecutive items never ask the same shape family — skip forward in the bucket, and if that is impossible take the next bucket (the 2/2/2/2 family balance makes this always satisfiable). Every slot is asked exactly once, so the picture always completes.
- **Difficulty progression**: 2 consecutive first-try correct casts → the next item comes from the next level up (cap L3). The level changes the **shelf**, never the plan.
- **Adaptation**: any wrong cast on an item, or a wrong first try on 2 consecutive items → the next item comes from one level down (floor L1). The current item is never abandoned.
- **What happens on a correct answer**: the badger walks to the mark (`ANIM.walk`), lifts (`ART.badgerLift`, `ANIM.beamOpen`), `ART.peelOutline` lights on the prop and peels up the beam (`ANIM.peel`) as `ART.shadowCast`; the families match, so the beam seats it (`ANIM.seat`) and the slot fills with `ART.shadowSettled`, permanently; `tone("correct")`, `ART.badgerHappy`, `GameCore.showPraise` rotating `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`, the prop carried into the used-things row (`ANIM.carryDown`, `ANIM.pop`), `ANIM.beamClose`, next item after 900 ms. **The fit predicate is the family, not the proportion** — a shadow's size and proportion are the geometry of the light, which is what makes "regardless of orientation or overall size" physical instead of stated.
- **What happens on a wrong answer** (per anticipated mistake), all of it on the apparatus and none of it on the badger:
  - Rectangle cast at a square outline, or the reverse: `ANIM.tryTurn`, then the mismatch is **left standing** as leftover area — an overhang at two ends, or two strips of outline left empty — then the cue lights four equal sides against two long and two short.
  - A rotated outline not recognised (the window slot): `ANIM.turnUpright` turns the asked outline upright and back while the cast shadow stands beside it at the same size, then both sets of sides light.
  - A round prop cast at a sided outline, or the reverse: the asked outline's sides light with badges while the round shadow shows one `ART.roundGlow` pulse and no badges — crescents of empty outline, or buried corners.
  - Any other miss: `ANIM.tryTurn`, `tone("nudge")`, then the side cue on the asked outline and on the cast shadow.
  In every case `tone("nudge")` plays, the badger swaps to `ART.badgerThink` and looks **up at the screen**, the world freezes for the whole cue (about 2.6 s, matching the pre-pivot spec's duration), and then `ANIM.peelBack` carries the shadow home. **The character is never the consequence**: no fall, no denial, no sad face, no step back.
- **Retry behaviour**: attempt 1 unaided → attempt 2 after the cue, with the spent prop set aside → attempt 3 with `ART.showRing` on the one mark still live, which is the show-me; tapping it completes the item as solved-with-help. No attempt 4. An item completed after any wrong cast never counts as first-try.
- **Anti-brute-force guard: THE SET-ASIDE.** P1's tile re-shuffle is unavailable here and must not be reintroduced — the lamp-marks are the world's furniture, and a mark that jumped when you stood on it would destroy the constancy that makes this a place (MISSIONS §6). The replacement has three parts. (1) **The candidate set varies; the positions never do** — three new props each item, marks fixed at (280/440/600, 372) all session. (2) **The one-way door** — a prop the light has already stood behind is carried down and set at the front of the floor for the rest of that item, whole and visible and nothing lost, but it cannot be cast again and its mark spends; attempt 2 chooses between two, attempt 3 between one, which *is* the show-me. Guessing visibly spends the shelf instead of cycling it. (3) **Only a first try moves the level**, so a guesser stays at L1 for ever and never meets the tight distractor sets. **Honest limit, stated rather than hidden:** with three candidates and certain success (F-46), exhaustion always completes an item eventually; no P1 game in this corpus prevents that and this one does not claim to. The guard makes exhaustion visible, non-repeating and pedagogically inert.
- **The ratchet.** Nothing in the world decays. A settled shadow is never removed; the used-things row never shrinks; a set-aside prop is set **down**, not taken away, and returns to the pool for later items; the watchers never leave and never get worse; the goal never moves. The only tension is *not yet arrived*.
- **The declared trade on the hit column.** Each mark's tap area includes the prop above it, because a five-year-old reaches for the clock. A reviewer may fairly call that a tile in disguise; the discriminator is that the commit reads the badger's position *after it arrives* and the shadow is computed from that position, so removing the badger makes the column do nothing whatever, there being no light. That is Deletion B biting on the tap target itself.
- **The declared risk on beam direction.** A low lamp in front throwing a shadow **up** onto a back screen is correct physics and the classic torch picture, but it is unusual. Mitigations: the beam edges are drawn *through* the prop's silhouette so the construction is visible, and item 1 demonstrates the lift once on an empty beam before any target is live. This must be checked on a real render at 400 and 704, never assumed.
- **Adjacency, recorded rather than discovered.** 005 pushes a stone through a shaped hole and 126 slides two pieces into an outline; here **the answer never touches the target — light carries it, and what arrives is not the thing but its edge**, and 005 sits in frame group D while this sits in group F. 058 already uses a cast shadow as a *cue* for solids at 6-8; here it is the *mechanic* at 5-6, which is a through-line rather than a collision. 092 is THE TENDING's published worked transformation and is a plant with service points; this is a picture with lamp-marks and its verb is projection, not fetch-and-give. `check-redundancy.js` is re-run against this transformed design, not the original row.
- **Finish condition**: 8 items. No losing state; nothing is timed; exactly zero ways a session ends other than finishing.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, and the praise rotation `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read through `S(key)`): `title` = "Shadow Show". Eleven locale keys are authored at build (BUILD-CONVENTIONS §17); the title is the only game-specific string, at most three words in every locale.
- **No words on the play screen at all** — band 5-6 zero text budget (F-42), and shape names are declared out of scope: the coral outline is the question in every language.

## Sound
`tone("correct")` when a shadow seats; `tone("nudge")` when one will not; `tone("tap", k)` on the k-th side as it lights, the pitch climbing with the side count (F-213); `tone("tap")` when a used thing lands in its row; `tone("finish")` once at the end. Silent under `?sound=off`; no audio files; nothing is spoken. Sound never carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and the praise strings change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: the screen, all eight plan slots, the three props, the three marks and the badger fully visible; the marks remain three separate targets).
- [ ] Keyboard operable (Tab cycles the three marks left to right; Enter and Space commit; the badger, props, watchers and screen are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (8 wrong casts in a row still reach All done through the set-aside ladder and the show-me ring).
- [ ] **Mission (Deletion B):** removing the badger and the plan makes the game unable to complete an item — there is no light, so nothing can be cast and nothing can be committed.
- [ ] **Mission (Deletion A):** making every outline accept every shadow leaves no choice with a consequence.
- [ ] **Instant-cut (Deletion C):** with `ANIM.walk` patched to `duration: 0` the session log is item-for-item identical; the walk is positional, not durational.
- [ ] **Ratchet:** driven with a wrong cast on every item, the number of settled slots and the length of the used-things row never decrease; no settled shadow is ever removed; a set-aside prop is visibly set down, not taken away.
- [ ] **Freeze (F-42):** at every moment a mark is enabled, zero tweens are running, the beam is closed and the badger holds one static pose.
- [ ] **Displacement:** the commit handler reads the badger's arrived position and computes the silhouette from it; it never reads a mark id and then animates a walk.
- [ ] **The character is never the consequence:** on the wrong-cast screenshot the badger's only change is `ART.badgerThink`, looking up at the screen; it does not move, shrink or sag.
- [ ] Tapping the mark under the right thing draws a coral outline on the thing, carries it up the beam and settles it into the coral slot, which stays filled for the rest of the session.
- [ ] Tapping the mark under a wrong thing leaves the mismatch standing (overhang, empty strips, crescents), then lights the asked outline's sides one by one with badges and rising notes, then the cast shadow's sides too.
- [ ] The window slot accepts an upright die: the square shadow turns 45° as it seats.
- [ ] The poplar slot accepts a wide cheese wedge: the shadow takes the slot's proportions as it seats.
- [ ] A round thing cast at a sided outline shows one round glow and no badges.
- [ ] At L2 and L3 the shelf shows a square thing and a rectangle thing together, and only one of them seats.
- [ ] A spent mark disables and redraws as `ART.markSpent`; the third attempt leaves exactly one live mark carrying `ART.showRing`.
- [ ] Every prop is drawn with identity detail the shadow discards, and no prop has a protruding part or a see-through hole (read the art sheet at 48/96/192/384 before the critic).
- [ ] At every DECIDE moment exactly one coral element is on screen.
- [ ] The finish screen shows the completed picture, the three watchers looking up, the badger sitting with them, and the eight things in play order — no score and no first-try count.
- [ ] With `?sound=off` nothing is audible.
