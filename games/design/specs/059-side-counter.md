# 059 — Tortoise's Garden

## Identity
- Slug: `side-counter`
- Subject / topic: Mathematics / counting the sides (and, at the stretch level, the corners) of a polygon shown in any orientation
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (the tap walks the tortoise: one tap paces one side of the bed, one tap lifts one board onto her shell)
- Frame: THE HAUL
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Frame contract: `design/MISSIONS.md` FRAME 4, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. Content is language-neutral (polygons and numerals); no `LOCALE_DATA`. The P1 numeral-tile tail of the pre-pivot spec is deleted — see Mission.

## Learning
- Objective: Counts the sides of a polygon (3-8 sides, any orientation) by tapping each side exactly once, then states the count by tapping the matching numeral.
- Prerequisites: Counts to 8 with one-to-one tapping (game 001); recognises the four basic shapes (game 005). No reading.
- Curriculum links: F-115 ("loses place counting sides/vertices"; prototype orientation; the response: vary orientation from level 1 and count sides as feedback — sides light one by one), F-101 (one-to-one and cardinality carried into a geometry context), F-21, F-31 row "2D shapes named (4 basic)" extended to attribute counting at 6-7 (US 1.G.A.1 "distinguish between defining attributes (e.g., triangles are closed and three-sided)"; 2.G.A.1 "recognize and draw shapes having specified attributes, such as a given number of angles"; England Y1-2 "properties of 2-D shapes, including the number of sides"; Germany Klasse 1-2 "Ecken und Seiten"; France CP-CE1 "nombre de côtés et de sommets"; Netherlands groep 3-4 "hoeken en zijden"; Spain 1º ciclo "lados y vértices"; Brazil EF02MA15; Sweden åk 1-3 "geometriska objekt … egenskaper"; Finland grade 1-2).
- Common misconceptions (F-115, F-101), each with this game's response:
  1. **Losing place — counting a side twice or skipping one when going round.** Response: RE-STAGED FROM CORRECTIVE TO PREVENTIVE. The tortoise can only step onto an edge that begins at the corner she is standing on and carries no string yet; a strung edge refuses a second line; a body cannot be in two places and cannot skip a leg of a circuit. Double-counting and skipping are not corrected, they are structurally impossible while the habit forms — strictly stronger than the pre-pivot response, which could only make a second tap inert. The 6 s inactivity cue survives: the next legal step's `ART.cornerPeg` pulses once (`ANIM.pulse`).
  2. **Counting corners when asked for sides (or the reverse).** Response: RE-STAGED — THE PROMPT BECOMES AN OBJECT. The bed's own visible state states the job with no icon and no words: a bed with BARE EDGES between its pegged corners is asking for boards, and the rack holds boards; a bed already boarded with GAPING EMPTY CORNER HOLES (`ART.cornerHole`) is asking for pegs, and the rack holds pegs. On a sides bed only the edges carry a `ART.stepTarget`; on a corners bed only the holes do. The pre-pivot speech bubble, `sideIcon`, `cornerIcon` and `question` are deleted, and so are the two captions. FLAGGED HONESTLY: for any simple polygon sides = corners, so this misconception can never produce a *different number* — in any design it can only be staged as "act on the right objects". That is equally true of the pre-pivot spec and is a property of the mathematics, not a weakness of the frame; boarding an edge versus pegging a hole is a stronger and more physical cue than a 36 × 6 icon in a bubble.
  3. **A rotated or irregular shape "has different sides" (prototype bias: the count changes with the pose).** Response: RE-STAGED, AND NOW MOTIVATED BY THE WORLD. Beds are scratched out at whatever angle the plot allows — random orientation stops being an arbitrary difficulty and becomes a fact about gardens — and from L2 their sides are unequal. She paces each edge in the SAME FIXED 180 ms whatever its length. On a wrong load the enacted correction walks the rim again re-stamping 1 … n. And the Finish stands all ten beds in the row **at their play rotations** with their numbers cut into them — ten poses, ten honest counts, in one picture.
  4. **Cardinality slip — tapping the numeral of the last badge seen elsewhere, or off by one.** Response: RE-STAGED, AND NOW QUANTITATIVE. There is no numeral to tap: the slip lives entirely in the count-out, where the rim carries the ordinals 1 … n and the shell carries the load. Five boards for a hexagon leaves ONE bare strung edge — the pre-pivot spec could only say "not that one, watch the replay"; this shows HOW MANY are missing and then asks for exactly that many. It also repairs a defect the 001 ensemble already convicted once: the pre-pivot spec showed `totalNumeral` at the shape's centre for 900 ms and THEN asked the child to pick that number off a tile, printing the answer before asking the question. Here the total appears nowhere during a first attempt — only inside the enacted correction (`ART.soilCut`), where it is teaching.
  5. **Long sides counted as "more" (a long side = two).** Response: RE-STAGED, AND PHYSICALLY UNDENIABLE. One edge, one step, one string, one ordinal, one board — and the same fixed 180 ms of walking whatever the edge's length, which is a pedagogical requirement and not a performance setting: if a long side cost more time the world itself would teach that a long side is worth more. A long board is one board. Better than the pre-pivot "the lit stroke runs the full length", because here the child's own body proves it.

## Mission
**Mission, as the child would say it.** *Finish the garden.*

**The hero.** A TORTOISE, in side profile, 44 px during play — a slow, deliberate gardener, and the one animal on the ART-BIBLE §3 roster whose own shell is tiled with polygons, which is why she is the right body for this game and not a decoration on it. Her `walk` pose is a plod: the tortoise makes the traversal budget an asset rather than a tax, because slow reads as care rather than delay at 6-8. She physically does three things and they are the whole game — she WALKS THE RIM of the bed she is making, corner to corner; she WALKS THE TIMBER PATH counting boards onto her shell; she WALKS BACK and the boards go down.

**The want (the visible lack), readable from one still frame with no motion and no words.** A plot of bare earth. In the middle, one garden bed scratched out as an outline in the soil — pegged corners, nothing standing between them. Below it a rack of nine boards no one has picked up. At the far fence a shut gate with three young tortoises standing behind it, looking in. Along the far edge, a short row of beds that ARE finished — boarded, planted, a sprig growing in each. A six-year-old reads *"she has to finish it so they can come in"* off a photograph. Nothing threatens the young, nothing can go wrong for them, they never leave and they never give up: they stand there from the first tap of the session to the last, waiting to be let in (Device 1, THE WAITING PARTY).

**The goal.** `ART.gateShut` at a constant (652, 96) for the entire session, with the three `ART.youngWait` behind it from tap one. Ten beds planted, the row reaching the gate post, and the gate open.

**S — the single state variable: HOW MUCH OF THIS BED IS BUILT, AND WHAT IS ON HER BACK.**

Formally: every edge of the bed is in exactly one of three states — `bare` → `strung(k)` (paced out, carrying a string line and its ordinal) → `boarded`; and every piece of timber is in exactly one place — `rack` → `shell` → a named edge. Each is a one-way chain.

- **Mathematical reading.** The highest k over the strung edges is the count she has enumerated, one-to-one, in order. `|shell|` is the cardinal the child has produced from that count. The bed's side-count n is `|boarded|` when the frame closes.
- **Physical reading.** How much of the bed stands, and what the tortoise is carrying toward it.

**The goal is a predicate on S:** every edge boarded and the shell empty — the frame closes exactly as she runs out.

**The correctness check is a FIT, not a verdict. There is no `answer` field anywhere in the game:**

```
if (shell.length === 0 && rim.every(e => e.boarded))   // the bed closes
```

The child never states a number. They move timber, one place along the chain, one tap at a time. The transition function on S is `walk`, and the child's tap selects a transition of S; it never reports an answer about S.

**The isomorphism — moving IS solving.** *A polygon is a circuit, and counting its sides is walking it.* That is not a metaphor dressed over an activity — the perimeter literally is a closed path and the count literally is the number of legs of the journey.

- **ACT 1 — THE MARKING-OUT LAP (the enumeration).** She stands on a corner. The two edges leading away from that corner are live; every other edge is inert earth. Tapping one paces her along it, lays `ART.edgeString` down that edge behind her, and stamps `ART.ordinalBrand` with the numeral k on it. She may go either way round from the first step; after that the rim carries her. She cannot skip an edge, because a body cannot be in two places; she cannot count one twice, because a strung edge refuses a second line. The lap closes when every edge carries a string — *"closed and n-sided"*, 1.G.A.1's own words, enacted. **No total is displayed.** The rim carries the ordinals 1 … n round it and the largest is beside where she is standing; reading the last brand as "how many" is the cardinality principle, and it is the child's job.
- **ACT 2 — THE COUNT-OUT (the cardinality).** She steps along the timber path in front of the rack. Each step lifts ONE piece onto her shell (`ART.shellBoard` / `ART.shellPeg`) and `ART.loadNumeral` beside the stack re-reads the running total, so the abstract notation is on the object, in the same frame as the fiction, at the moment of the answer (GAME-DESIGN-LAW 2.5, INTEGRATED NEVER CONCEALED). Only the next slot is ever live, so she cannot grab an armful; she counts them out. **The commit handler reads her x on the path, not a tile id:** `n_supplied = (tortoise.x − 96) / 62 + 1`. Tapping the bed turns her for home, and that turn is the one-way door.
- **ACT 3 — THE FITTING (the world's verdict).** She walks the rim and one piece goes down into each strung edge (or each hole), in order. The bed is right exactly when the last piece meets the last bare edge.

**The Displacement rule, literally.** `answer = f(character.position)` in both acts: in the lap the commit is `hero.paceTo(vertex)` and its test is *"does an unstrung edge run from where her feet are to there"*; in the count-out the load IS her x on the path. No tile id, no keypad buffer and no selection index is read anywhere in this game.

**A consequence worth naming: this design deletes the distractor problem.** The pre-pivot spec offered three numeral tiles (n−1, n, n+1), which is an elimination surface and drags BUILD-CONVENTIONS §8.1's whole rank-balance apparatus behind it. **The rack is nine deep for every bed.** The answer is produced, never selected; there is no set to eliminate from; `check-pools.js` has no distractor legality to check on this game at all.

**One honest tension in the invariants, declared rather than hidden.** The Objective above is carried across byte for byte (GAME-DESIGN-LAW §3 — the objective is invariant) and its closing clause reads *"states the count by tapping the matching numeral"*. There is no numeral to tap here. The cognitive act it names is preserved exactly and made physical: **the child states the count by counting out that many boards**, which is a stronger production task than choosing one of three tiles, and the numeral is still on screen at the moment of the answer as `ART.loadNumeral`. The clause names the pre-pivot apparatus, not the objective; it is left unedited so the diff is honest, and this paragraph is the reconciliation.

**The mark that stays.** A board that is down is down; a bed that is planted is planted; both are still on screen at the Finish. The mark is always the object in its new state, never a token for it (Device 2). **The RATCHET RULE is not a promise here, it is the TYPE of S:** every transition is one-way by construction — an edge cannot return to `bare`, a piece cannot come off an edge, a planted bed cannot be unplanted, the seed tray never refills. The one movement that runs backwards, surplus timber going shell → rack, is explicitly NOT a mark: the rack is a source, and putting timber back un-makes nothing the child made.

**Diegetic progress — four readings, no progress furniture of any kind on the play surface.** (1) *The garden row growing toward the gate*: each finished bed takes its place along the far edge at its play rotation, with its sprig and its number — F-44's *"tower built"* verbatim. Beds that do not exist yet are NOT DRAWN; ten hollow sockets at a fixed pitch would be the banned progress display wearing a hat. (2) *The plain earth between the last planted bed and the gate post at x = 622*, which shrinks by 52 px a bed, so a child glancing at the screen knows how far along they are without a glyph (L3, VISIBLE DESTINATION). (3) *`ART.seedTray` emptying*, ten sprigs down to none — two counts moving in opposite directions, entirely wordless. (4) *Within the bed*: the rim going bare → strung → boarded; the frame closing IS the item completing. `mission.progress` for the M4 gate = (planted beds × 8) + (boarded edges of the current bed); monotone by construction.

**Persistence (L2).** The tortoise does not teleport between beds. She stays exactly where she finished, and the next bed is pegged out around her so that ONE OF ITS CORNERS IS WHERE SHE ALREADY STANDS — which is how anyone actually starts marking out a bed. M3 passes by construction, and the zone-W pixel diff outside the current bed grows all session because the row and the tray both change.

## World
Fixed **720 × 560**, `Scale.FIT`, static camera, no scrolling. Zones are MISSIONS.md 1.4 (zone T chrome, zone W the world, zone H the hand), not BUILD-CONVENTIONS §7. The hero and the goal are both inside zone W at every moment of the session, and the goal's (x, y) never changes.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** Three things that stood in the pre-pivot spec's top strip are gone: the ten progress circles at y = 28, and — from zone A — the beetle's speech bubble and its caption, both deleted with the numeral tiles.

**Zone W, y 56-420 — THE WORLD (the plot).** `ART.plotGround`, a roundRect 688 × 348 wash centred (360, 234), never animated (ART-BIBLE §4), drawn behind everything.

- **The three young tortoises** — `ART.youngWait`, 24 px, at **(610, 70), (652, 68), (694, 70)**, beyond the fence. Drawn from tap one, drawn BEFORE the gate in the display list so the gate crosses in front of them and they read as looking over a shut gate. Static. They change ONCE, at the Finish. They are never at risk of anything, and they never react to a correct answer — a waiting party that reacts per item is an approval meter, which F-44 bans.
- **The far fence** — `ART.fenceBar`, a 6 px teal bar at **y = 96**, x 40 → 720, with a gap x 622 → 682.
- **The gate (the goal)** — `ART.gateShut`, 52 × 44, centre **(652, 96)**, shut, between `ART.gatePost` at x = 622 and x = 682. **Its (x, y) never changes all session.**
- **The garden row** — the beds already finished, growing left → right along the far edge: bed *i* at **x = 76 + i × 52** (76, 128, 180 … 544), **y = 132**, `ART.bedPlanted` at scale 0.22 (≈ 40 px across) AT ITS PLAY ROTATION, `ART.sprig` 16 px at its (−6, −4) and `ART.bedBrand` at its (+9, +7). Beds that do not exist yet are not drawn. The plain earth from the last planted bed to the gate post at x = 622 is the distance that shrinks.
- **The seed tray** — `ART.seedTray`, 108 × 128 at **(120, 250)**, holding the sprigs not yet planted: `ART.sprig` 20 px in two columns x = 96 / 144 at y = 206, 230, 254, 278, 302. Ten down to none.
- **The bed being made** — polygon, centre **(348, 280)**, circumradius **92** (triangle 100). `ART.bedOutline` for the scratched rim, `ART.cornerPeg` at each vertex, `ART.edgeString` on a paced edge, `ART.edgeBoard` on a boarded edge; on a corners item `ART.cornerHole` at each vertex instead of a peg, taking `ART.cornerPegSet`. `ART.ordinalBrand` sits 18 px outside the edge midpoint (sides items) or 18 px outside the vertex (corners items) along the outward normal, so the worst vertical reach is 92 + 18 + 16 = **126** → the bed occupies y 154-406, x 222-474: clear of the row's lower edge at y = 152 and of the path below.
- **The tortoise** — 44 px, `ART.tortoiseIdle` / `ART.tortoiseThink` / `ART.tortoiseWalk` / `ART.tortoiseHappy`. During the lap she stands INSIDE the bed on the inner offset polygon at (r − 30) from the centre toward the corner she occupies, so she never covers a peg, a hole or a brand. During the count-out she walks `ART.timberPath` at **y = 398**, x 60 → 592, drawn above the bed's lower corners. Her body reaches y 376-420 and never leaves zone W. Her load stacks upward from (heroX, heroY − 22) at a 13 px pitch, so eight pieces top out at y = 272, and `ART.loadNumeral` sits at (heroX + 32, heroY − 30).

**Zone H, y 420-560 — THE TIMBER, the only control in the game.**

- **The rack** — nine upright slots, `ART.rackSlot` 56 × 84, pitch 62, centres **x = 96 + i × 62** (96, 158, 220, 282, 344, 406, 468, 530, 592), **y = 490**. Each holds `ART.rackBoard` on a sides item or `ART.rackPeg` on a corners item. **Nine for every bed**, so the rack's length never encodes n and its positions carry no information. **Exactly one slot is ever enabled**: the next piece to be taken.

Two properties of the rack are load-bearing rather than decorative. First, it is nine deep whatever the shape, and nine is above the largest n (8), so its length is uninformative for every item. Second, **the tortoise, not the finger, takes the timber**: she walks the path above the rack and her x is over the slot she is taking, and the commit reads her position. That is what keeps the game on the right side of the Displacement rule while leaving the rack in the hand zone where the layout wants it. There is nothing else in zone H — no keypad, no numeral tiles, no Check button, no progress furniture.

**F-69 element count (§5.1 reading: an instrument counts as ONE, candidates count individually).** Hero 1 + the bed rim 1 instrument + the rack 1 instrument + the gate 1 = **4**, against a budget of 10. In practice **at most three targets are enabled at any moment** — during the lap the ≤ 2 legal steps plus nothing else; during the count-out the next slot plus the bed. The seed tray, the garden row, the fence and the plot wash are inert scenery and count as zero. This game does not depend on the F-69 reading the way 041 does; it clears the budget on the strictest reading too.

**Tap floors (6-8: 56, ≥ 44 real).** `ART.stepTarget` is a 56-px-deep capsule laid ALONG its edge, centred on the edge midpoint, of length `min(80, sideLength − 14)`, floored at 56 — so the along-rim gap between two adjacent targets is ≥ 14 by construction. At circumradius 92 that is 80 on a hexagon, 66 on a heptagon and 56 on an octagon; on a triangle, square, rectangle and pentagon it is 80. On a corners item the hole target is 56 × 56 at the vertex, and adjacent vertices are ≥ 70 px apart at n = 8, so the gap is ≥ 14 there too. **The pre-pivot spec's octagon exception is deleted** — it existed because all eight targets were live at once; here at most two are. **Its triangle rotation restriction (15°-75°) is deleted too**, because the brands now ride on edge midpoints at r · cos(π/n) rather than outside the vertices, so a triangle's worst reach is 84 px and nothing can climb into zone T.

**Text budget: five English words for the whole game, against the 6-8 band's eight (F6).** Play surface: **ZERO**. Start screen: the title (two words) and the premise (three). Finish: `t("all_done")` and the two chrome buttons. The only glyphs on the play surface are numerals.

**Keyboard.** Tab cycles the live targets only — two during the lap, two during the count-out; Enter acts. `makeTile` registers them, so the focus ring and the arrow keys come from the library (§3).

**Declared risks, stated rather than designed around.**

1. **Two counting acts per bed, so 2n + 2 taps — up to 18 on an octagon.** This is the design's real cost. The defence is that both acts ARE the objective ("counts the sides … then states the count"), that P3 is a tapping pattern by contract, and that the two acts are different cognitive moves rather than the same one twice. It is still the thing most likely to read as long, and the honest mitigation is content: L1 and L2 are 3-6 sides, so only four of ten beds are ever above six taps a lap. If it plays long with children the fix is fewer L3 items, not a faster tween.
2. **The lap is forced after the first step.** From a corner there are exactly two edges and one is already strung, so from step 2 onward there is exactly one legal move. That is a crank, not a choice, and F-42's DECIDE beat is thin there. It was chosen deliberately over the pre-pivot free tap order, because free order requires her to slide to a tapped side — a commit handler reading a tile id and then animating a walk, which is the Displacement rule's named failure. What is preserved is better than order-freedom anyway: she may go EITHER WAY ROUND, and both directions give the same count, which is the demonstration of order-irrelevance a teacher actually uses.
3. **The count-out is a copy.** Because the lap comes first, the rim already carries the ordinals when the child goes for timber, so the cardinal is readable rather than recalled. The trade is taken knowingly: loading first would remove the one-to-one scaffold from attempt 1, which is misconception 1's entire response, and the Objective's own order is count-then-state. The mitigation is that no TOTAL is ever displayed — the child must read the last ordinal as "how many". If the loading still plays as mechanical, the lever is to stamp only every other ordinal, not to delete the lap.
4. **Two materials (string, then boards).** One more noun than THE HAUL strictly needs. It earns its place by being the real construction sequence — peg and string, then board — and by keeping the enumeration and the cardinal as physically distinct acts. If a reviewer calls it one apparatus too many, the thing to cut is the string, with the lap stamping the bare corners directly.
5. **Misconception 2 cannot be staged as a wrong number, ever, in any design**, because sides = corners for every simple polygon. Flagged in Learning; the pre-pivot spec shares it; it is neither quietly dropped nor given a fake response.
6. **The stage is tight.** Four bands in 364 px — young and gate, garden row, the bed, the timber path — put the bed at circumradius 92 and the row at scale 0.22, with 2 px between the row's lower edge and the bed's upper reach. At a 400 px render a heptagon is about 90 px across with ~40 px edges. That is legible but not generous, and it is the first thing to measure on the render rather than to argue about here. If it fails, the seed tray goes and the bed grows.
7. **Redundancy.** Checked against the corpus before locking: 129 (rabbit, numeral stepping stones) and 171 (frog, syllable stones) already own water-crossing-on-stones, and 005's redesign owns the shape-into-hole harbour wall, so this design deliberately avoids both. It shares a walking hero with 129; the discriminator is clean — 129's answer is WHICH stone (THE CROSSING, choice among places), this game's answer is HOW MANY BOARDS (THE HAUL, a load fitted to a capacity) — but `check-redundancy.js` must be re-run against the transformed designs, not the originals (MISSIONS.md 8.3).
8. **Unbuilt, like everything else here.** Every claim above about how a seven-year-old reads a rack of nine identical boards is a design judgement. The fox passed every gate three times and was rejected on sight. The 384 px art sheet for the tortoise, the boards and the young comes before the critic, and the 704 and 1024 renders come before anyone says this works.

## How it plays

1. **Start screen.** Title `S("title")` at (360, 200), 52 px `THEME.font.display` `THEME.colour.structure`; premise `S("premise")` at (360, 258), 24 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.tortoiseIdle` 96 px at (360, 360) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 480); the picker at (16, 16). Never auto-starts.

2. **The plot is built once, and it is a place.** On entering Play, `ART.plotGround`, `ART.fenceBar`, `ART.gatePost` ×2, `ART.gateShut`, the three `ART.youngWait` and `ART.seedTray` with its ten `ART.sprig` are drawn, and they are not rebuilt between items. The fence, the gate and the young never move for the whole session — that is what makes the plot a location rather than a board, and it is why the P1 tile re-shuffle is unavailable and a different guard is declared (Rules, THE ONE-WAY SHELL).

3. **Item 1 (L1: a triangle, rotated 25°, sides mode).** `ART.bedOutline` appears at (348, 280) with `ANIM.appear`, three `ART.cornerPeg` at its vertices, all three edges bare. The rack fills with nine `ART.rackBoard` in nine `ART.rackSlot`. The tortoise is drawn at the inner offset of one vertex in `ART.tortoiseThink`. The `ART.stepTarget` capsules on the two edges leading away from her corner are enabled; the third is not. Zero words are on the screen.

4. **The DECIDE state.** Zero tweens are running (F1 freeze, the M2 assertion); the hero holds one static pose at one coordinate; nothing breathes, drifts or loops.

5. **A step the world accepts (the child taps a live edge).** `ART.tortoiseWalk` swaps in; `ANIM.pace` carries her container along the inner offset to the far corner in a **fixed 180 ms whatever the edge's length**; `ART.edgeString` is drawn down the edge behind her with `ANIM.stringIn`; `ART.ordinalBrand` with the numeral k stamps at the edge midpoint's outward normal with `ANIM.brandIn`; `tone("tap", k)` so the pitch climbs round the rim. She returns to `ART.tortoiseThink`, and the one unstrung edge leading away from her new corner becomes the only live target. Feedback lands within 300 ms of the commit (F-40): the walk IS the feedback.

6. **The lap closes.** The nth step brings her back to the corner she started from and the rim carries strings and ordinals 1 … n all the way round. No total is shown. She turns and plods out of the bed to the head of the timber path at (60, 398) — one `ANIM.traverse`, 260 ms — and the rack's slot 0 at x = 96 becomes the only live slot in zone H.

7. **The count-out.** Each tap on the live slot plays `ANIM.pace` (110 ms) to that slot's x, lifts its `ART.rackBoard` onto her shell as `ART.shellBoard` with `ANIM.loadOn`, re-reads `ART.loadNumeral` to the new running total, sounds `tone("tap", k)`, and enables the NEXT slot and only the next slot. The bed is also live throughout: tapping it turns her for home. **The commit is her x**: `n_supplied = (tortoise.x − 96) / 62 + 1`, and the turn is the one-way door — walking back does not un-take a board.

8. **The fitting (one ACT, no choice open).** `ANIM.traverse` carries her back to the bed's first strung edge; then, 90 ms apart, one `ART.shellBoard` leaves the stack and becomes `ART.edgeBoard` laid into each strung edge in ordinal order, with `ANIM.boardDown`. Three outcomes:
   - **The frame closes exactly** (`shell.length === 0 && rim.every(e => e.boarded)`): `tone("correct")`; `ART.tortoiseHappy` for 400 ms; `GameCore.showPraise` with the rotation, first-try beds only; one `ART.sprig` leaves `ART.seedTray` and `ANIM.plant` settles it into the bed; the whole bed becomes `ART.bedPlanted`, and `ANIM.glide` carries it to its slot in the garden row at (76 + i × 52, 132) at scale 0.22, keeping its play rotation, where `ART.bedBrand` is cut into its soil. The plain earth to the gate post shrinks by 52 px. **She does not travel with it and she does not teleport:** she stays where she finished, and the next bed is pegged out around her so one of its corners is under her feet.
   - **A short load**: the boards run out with m edges still bare. She stops. Nothing falls, nothing collapses, the boards already down STAY DOWN, and the bare edges keep their strings and their brands — so the shortfall is not a judgement, it is a countable picture. The enacted correction plays (Rules), then she plods back to the head of the path and the child counts out exactly m more. **She resumes from where she stopped; she does not start the bed again.** The error is converted into the next step of the correct method.
   - **A long load**: the frame closes with s pieces still on her shell, visibly, countable. The enacted correction plays; then she carries them back to the rack and the child taps the rack to put each one back, ONE TAP AT A TIME, each returning `ART.shellBoard` to its `ART.rackSlot` as `ART.rackBoard` and re-reading `ART.loadNumeral` downward. Nothing is dropped and nothing is lost — the rack is a source, so putting timber back un-makes nothing the child made. When the shell empties the bed is complete and is planted as solved-with-help.

9. **Tapping the bed with an empty shell.** She looks at it and the next bare edge's `ART.edgeString` pulses once (`ANIM.pulse`). The pre-pivot spec's harmless preview, unchanged in spirit.

10. **A corners item (L3).** The bed arrives already boarded — somebody else laid the timber — with `ART.cornerHole` gaping at every vertex and no pegs in them. The lap is identical: she paces the rim and each ARRIVAL stamps its `ART.ordinalBrand` outside the hole she reaches. The rack holds `ART.rackPeg`; her shell carries `ART.shellPeg`; the fitting seats one `ART.cornerPegSet` into each hole. Only the holes carry a target; the edges carry none.

11. **The support ladder, which always ends in success.** Attempt 1 is the count-out unaided. Attempt 2: the world FREEZES, the enacted correction plays in full, and she is back at the rack for the remainder — a smaller, easier question than the one she got wrong. Attempt 3: the show-me — exactly the needed number of pieces LIFT SIX PIXELS PROUD IN THE RACK and hold there (`ANIM.showMe`), the register of THE CROSSING's proud stone; taking them completes the bed as solved-with-help. There is no attempt 4 and no way for a bed to end unmade.

12. **Items 2-10.** Per Content and Rules. Each begins with a new `ART.bedOutline` pegged out around her at (348, 280) with one corner under her feet. The shape changes; the rack does not; the plot does not.

13. **Finish.** The tenth bed is planted and the row reaches the gate post. `ART.gateShut` is replaced by `ART.gateOpen` with `ANIM.swing` and the three young walk in with `ANIM.traverse` — the first thing about them that has changed all session — becoming `ART.youngHappy` 40 px and settling at (240, 224), (360, 244), (480, 224) among the ten beds. The old tortoise steps to the gate at (620, 150) in `ART.tortoiseIdle`, plays `ANIM.celebrate` once and then holds a 2 % `ANIM.breathe`. **The summary IS the world**: ten planted beds standing in the row at their play coordinates and their play rotations, each with its `ART.bedBrand` — three, four, six, five, seven, eight — ten different shapes in ten different poses, all counted by the child, all still where she built them. That is the pre-pivot spec's "shelf of ten counted polygons" standing in a garden instead of on a shelf, and it doubles as the learning summary: the count is what it is in any pose. `ART.finishPlaque` at (360, 40) carries `t("all_done")` at 40 px `THEME.colour.structure`; `makeButton` `t("play_again")` at (250, 522) and `t("menu")` at (470, 522); `tone("finish")` once; `GameCore.reportHeight()`. **No first-try record is drawn.** MISSIONS.md 1.4 permits two progress tokens on the Finish screen only; this spec declines them, because ten beds with their numbers is a better record of what the child did than a row of filled circles, and adding the circles would put back the thing the shared contract was amended to remove. Nothing is scored and nothing is ranked.

**Session ≈ 5 minutes. Total ACT time ≈ 30 s against the 60 s ceiling (R1)**: per bed, lap n × 180 + traverse 260 + count-out n × 110 + traverse 260 + fitting n × 90 + plant and glide 600 → worst item (n = 8) ≈ 4.2 s, an L1 item (n = 4) ≈ 2.6 s, weighted over the ten-bed ladder ≈ 30 s. `qa-game` must measure it rather than trust this estimate.

## Art registry
```js
const ART = {
  /* the hero and the waiting party — one drawing family, the young are the same animal at 55% */
  tortoiseIdle:  { kind: "svg", value: LCSArt.get("tortoise.idle"),        size: 96, fallback: "🐢" },
  tortoiseThink: { kind: "svg", value: LCSArt.get("tortoise.think"),       size: 96, fallback: "🐢" },
  tortoiseWalk:  { kind: "svg", value: LCSArt.get("tortoise.walk"),        size: 96, fallback: "🐢" },
  tortoiseHappy: { kind: "svg", value: LCSArt.get("tortoise.happy"),       size: 96, fallback: "🐢" },
  youngWait:     { kind: "svg", value: LCSArt.get("tortoise.young.wait"),  size: 96, fallback: "🐢" },
  youngHappy:    { kind: "svg", value: LCSArt.get("tortoise.young.happy"), size: 96, fallback: "🐢" },

  /* the plot */
  plotGround:    { kind: "shape", shape: "roundRect", w: 688, h: 348, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 16 },
  fenceBar:      { kind: "shape", shape: "rect", w: 680, h: 6, fill: "structure" },
  gatePost:      { kind: "shape", shape: "rect", w: 6, h: 34, fill: "structure" },
  gateShut:      { kind: "shape", shape: "roundRect", w: 52, h: 44, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 6 },
  gateOpen:      { kind: "shape", shape: "roundRect", w: 44, h: 52, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 6 },
  seedTray:      { kind: "shape", shape: "roundRect", w: 108, h: 128, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },
  sprig:         { kind: "svg", value: LCSArt.get("sprig"), size: 64, fallback: "🌱" },

  /* the bed being made, and the beds already made */
  bedOutline:    { kind: "shape", shape: "polygon", points: [], stroke: "line", strokeWidth: 3 },
  bedPlanted:    { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 4 },
  bedBrand:      { kind: "text",  value: "", size: 16, font: "display", color: "structure" },
  cornerPeg:     { kind: "shape", shape: "circle", r: 6, fill: "inkSoft" },
  cornerHole:    { kind: "shape", shape: "circle", r: 13, fill: "surface2", stroke: "line", strokeWidth: 3 },
  cornerPegSet:  { kind: "shape", shape: "circle", r: 13, fill: "structure", stroke: "ink", strokeWidth: 2 },
  edgeString:    { kind: "shape", shape: "line", points: [0, 0, 1, 0], stroke: "structure", strokeWidth: 3 },
  edgeBoard:     { kind: "shape", shape: "rect", w: 8, h: 9, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  stepTarget:    { kind: "shape", shape: "roundRect", w: 80, h: 56, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },
  ordinalBrand:  { kind: "shape", shape: "circle", r: 16, fill: "accent" },
  soilCut:       { kind: "text",  value: "", size: 44, font: "display", color: "structure" },

  /* the timber */
  timberPath:    { kind: "shape", shape: "rect", w: 532, h: 3, fill: "line" },
  rackSlot:      { kind: "shape", shape: "roundRect", w: 56, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  rackBoard:     { kind: "shape", shape: "rect", w: 20, h: 72, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  rackPeg:       { kind: "shape", shape: "roundRect", w: 22, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  shellBoard:    { kind: "shape", shape: "rect", w: 30, h: 11, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  shellPeg:      { kind: "shape", shape: "circle", r: 7, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  loadNumeral:   { kind: "text",  value: "", size: 28, font: "display", color: "structure" },

  /* Finish screen only */
  finishPlaque:  { kind: "shape", shape: "roundRect", w: 380, h: 56, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 18 }
};
```

The pose set deliberately omits `oops`. The approved ART-BIBLE pose vocabulary offers one; it is not drawn, because GAME-DESIGN-LAW 3.0 is stricter — *the character is never the consequence*, and the reviewer check is literally *look at the wrong-answer screenshot; if the character's state changed, reject*. On a short load and on a long load alike the tortoise holds `ART.tortoiseThink` and the apparatus does the reacting.

**Exactly ONE `accent` entry is declared — `ordinalBrand` — one grep, one number.** The tortoise's body is drawn from the `structure` and `surface2` tint pairs plus `bg`, so ART-BIBLE §10.1's warm-body clause does not apply to her; the state coral is free and it is spent on the enumeration marks, which are the notation the objective is about. `ART.soilCut` and `ART.loadNumeral` are `structure`, so the correction and the running total never compete with the rim for the one warm region. The row's `ART.bedBrand` is `structure` at 16 px — a completed record rather than a live prompt, which is the 041 `strideTagPast` precedent for reading below BUILD-CONVENTIONS §12's 24 px live-text floor; every numeral the child must read while deciding (`ordinalBrand` at 24 px, `loadNumeral` at 28 px, `soilCut` at 44 px) is at or above it.

`edgeString`, `edgeBoard` and `stepTarget` are stretched and rotated to their edge at call: the string and the board take the edge's full length, the target takes `min(80, sideLength − 14)` floored at 56.

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the four tweens Test C (instant-cut) patches to duration 0, and no others */
  pace:       { duration: 180, ease: "Sine.InOut", trigger: "the tortoise along one edge of the rim (x,y set at call) — FIXED whatever the edge's length; also 110 ms per step along the timber path" },
  traverse:   { duration: 260, ease: "Sine.InOut", trigger: "the tortoise between the bed and the head of the timber path, either way (x,y set at call); the three young through the open gate at the Finish" },
  glide:      { scale: 0.22, duration: 400, ease: "Sine.InOut", trigger: "a planted bed to its slot in the garden row (x,y set at call), keeping its play rotation" },
  plant:      { alpha: 1, scale: 1, duration: 300, ease: "Back.Out", trigger: "a sprig from the seed tray settling into the finished bed (from alpha 0, scale 0.6)" },

  /* the world's answer to a move */
  stringIn:   { alpha: 1, duration: 160, ease: "Sine.Out", trigger: "edgeString down a paced edge (from alpha 0)" },
  brandIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "ordinalBrand at an edge midpoint or outside a hole (from alpha 0, scale 0.5)" },
  loadOn:     { duration: 140, ease: "Back.Out", trigger: "a rackBoard/rackPeg becoming a shellBoard/shellPeg on the stack, and the reverse when surplus is returned (x,y set at call)" },
  boardDown:  { alpha: 1, scale: 1, duration: 180, ease: "Back.Out", trigger: "edgeBoard into a strung edge / cornerPegSet into a hole, 90 ms apart in ordinal order (from alpha 0, scale 0.7)" },
  swing:      { angle: 74, duration: 500, ease: "Back.Out", trigger: "gateOpen replacing gateShut at the Finish, once" },

  /* the enacted correction — NOT traversal; never patched by the instant-cut harness */
  relight:    { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each edgeString in turn round the rim, 300 ms apart, with its brand re-stamping (from alpha 0.3)" },
  lastBrand:  { scale: 1.4, duration: 260, ease: "Back.Out", yoyo: true, trigger: "the nth ordinalBrand of a correction, then held 400 ms" },
  pulse:      { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "each bare edge in turn during a correction; the next legal step's cornerPeg after 6 s of inactivity; the next bare edge when the bed is tapped with an empty shell" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new bedOutline; soilCut at the bed's centre (from alpha 0, scale 0.6)" },
  showMe:     { y: "-=6", duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the correct number of rackBoards/rackPegs lifting proud in the rack on attempt 3" },

  /* Boot and Finish only */
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the tortoise at the gate at the Finish" },
  breathe:    { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the tortoise on the Boot and Finish screens only (ART-BIBLE §6)" }
};
```

No flashing: nothing toggles faster than 3 Hz; `ANIM.showMe` runs at 1 Hz; the inactivity `ANIM.pulse` runs once per 6 s.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]              chrome only, nothing else           │  zone T   0- 56
 56   ├──────────────────────────────────────────────────────────────┤
      │                       young (610,70)(652,68)(694,70)  ▭gate   │
      │  ═══════ fence y=96 ══════════════════ post 622 ▭ post 682 ═  │
      │  ▲ ■ ⬟ …  garden row  y=132, x=76+i×52, scale 0.22            │  zone W
      │  ┌tray┐                    ╱‾‾‾‾╲                             │  THE WORLD
      │  │seed│                   ╱  bed ╲   (348,280) r 92           │  56-420
      │  │120 │                  ╱  1 2 3 ╲  brands 18 outside        │
      │  └250─┘                  ╲________╱  pegs at the corners      │
      │        tortoise on the timber path y=398, x 60→592            │
420   ├──────────────────────────────────────────────────────────────┤
      │  ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯   nine slots 56×84, x=96+i×62, y=490       │  zone H
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling, static camera, no scrolling. Zone T carries the language picker and nothing else — no progress furniture of any kind anywhere on the play surface (MISSIONS.md 1.4). The hero is in zone W at every moment; the goal, the gate at (652, 96), never moves. The bed being made occupies y 154-406 and x 222-474 at its worst reach; the garden row's lower edge is y 152; the tortoise on the timber path occupies y 376-420 and is drawn above the bed's lower corners, and her load stacks upward to y 272 at eight pieces.

## Visual specification
- Background `THEME.colour.bg`. `ART.plotGround` centred (360, 234) as a low-contrast wash, never animated, drawn behind everything else.
- `ART.fenceBar` at y = 96 with a gap x 622-682; `ART.gatePost` at (622, 96) and (682, 96); `ART.gateShut` at (652, 96), shut for the whole session and replaced by `ART.gateOpen` only at the Finish. `ART.youngWait` 24 px at (610, 70), (652, 68), (694, 70), drawn BEFORE the gate so the gate crosses in front of them; `ART.youngHappy` 40 px on the Finish screen only.
- The garden row: `ART.bedPlanted` at scale 0.22 at (76 + i × 52, 132) at its play rotation, with `ART.sprig` 16 px at its (−6, −4) and `ART.bedBrand` at its (+9, +7). Beds not yet made are not drawn — there are no empty sockets.
- `ART.seedTray` at (120, 250) with `ART.sprig` 20 px at x = 96 / 144, y = 206 / 230 / 254 / 278 / 302; one leaves per completed bed and none ever returns.
- The bed being made: `ART.bedOutline` at (348, 280), circumradius 92 (triangle 100), at the item's rotation; `ART.cornerPeg` at each vertex on a sides item, `ART.cornerHole` at each vertex on a corners item. A paced edge takes `ART.edgeString` along its full length; a fitted edge takes `ART.edgeBoard` stretched to that length; a seated hole takes `ART.cornerPegSet`. `ART.ordinalBrand` sits 18 px outside the edge midpoint (sides) or the vertex (corners) along the outward normal, with its numeral 24 px `THEME.font.display` `THEME.colour.inkOnAccent` — never white on coral (BUILD-CONVENTIONS contrast rule).
- `ART.stepTarget` is an invisible `makeTile` capsule (fill and stroke `THEME.colour.bg`, no label) laid along its edge, 56 px deep, `min(80, sideLength − 14)` long, floored at 56, centred on the edge midpoint; on a corners item the target is 56 × 56 on the hole instead. The keyboard focus ring is drawn by the library in `THEME.colour.focus`.
- The tortoise at 44 px in `ART.tortoiseIdle` / `ART.tortoiseThink` / `ART.tortoiseWalk` / `ART.tortoiseHappy`, in side profile facing the direction she is going. During the lap she stands on the inner offset polygon at (r − 30) from the bed's centre; during the count-out she stands on `ART.timberPath` (y = 398, x 60-592) with her x over the slot she is taking. Her load stacks from (heroX, heroY − 22) at a 13 px pitch as `ART.shellBoard` or `ART.shellPeg`, and `ART.loadNumeral` reads the running total at (heroX + 32, heroY − 30).
- The rack: nine `ART.rackSlot` 56 × 84 at (96 + i × 62, 490), each holding `ART.rackBoard` (sides items) or `ART.rackPeg` (corners items). Exactly one slot is enabled at a time; the rest are drawn at full contrast but are not targets, because they are stock rather than choices.
- **The coral rule (ART-BIBLE §2, one warm region per screen).** The only coral on the play surface is the current bed's `ART.ordinalBrand` marks. They belong to one object and read as one region. They travel with the bed into the garden row? No — the moment a bed is planted its brands are replaced by the single `ART.bedBrand` in `THEME.colour.structure`, so exactly one coral region exists on any frame, and it is always the bed being made. During an enacted correction the same brands ARE the correction, joined by `ART.soilCut` in `THEME.colour.structure`, so nothing new competes.
- Meaning is never carried by colour alone (§12): bare, strung and boarded differ in SHAPE — nothing, a 3 px line, a 9 px board — before they differ in tint; an empty `ART.cornerHole` and a seated `ART.cornerPegSet` differ in fill AND outline weight; `ART.bedOutline` is a hairline while `ART.bedPlanted` is a filled polygon with a 4 px stroke.
- `ART.finishPlaque` at (360, 40) on the Finish screen only. Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral (numerals only; two Start-screen strings). Each item is (shape; n; rotation; mode). The rack is nine deep on every item, so it is not a per-item field, and there are no distractor triples to author — the pre-pivot spec's `tiles = n−1, n, n+1` column is deleted with the tiles. Irregular shapes give their vertices explicitly, relative to the centre.

- **L1** (regular, 3-4 sides; sides mode): (triangle; 3; 25°; sides) · (square; 4; 40°; sides) · (rectangle 180 × 100; 4; 15°; sides) · (triangle; 3; 60°; sides) · (square; 4; 20°; sides)
- **L2** (5-6 sides, some irregular; sides mode): (pentagon; 5; 30°; sides) · (hexagon; 6; 10°; sides) · (irregular pentagon (−90,−20) (−10,−95) (95,−40) (70,70) (−60,80); 5; 0°; sides) · (irregular hexagon (−100,0) (−50,−85) (40,−90) (100,−10) (60,80) (−40,70); 6; 0°; sides) · (pentagon; 5; 55°; sides) · (irregular quadrilateral (−100,−30) (20,−90) (95,20) (−40,85); 4; 0°; sides)
- **L3** (7-8 sides; corners mode on alternate items): (heptagon; 7; 20°; sides) · (hexagon; 6; 35°; corners) · (octagon; 8; 12°; sides) · (pentagon; 5; 45°; corners) · (irregular heptagon (−100,10) (−70,−70) (0,−100) (75,−65) (100,20) (50,85) (−45,90); 7; 0°; sides) · (heptagon; 7; 30°; corners)

Regular n-gons have vertices at 360 × i / n on a circle of circumradius 92 (triangle 100, so its edges are long enough to walk); the item's rotation is added to every vertex. Irregular vertex lists are used as authored and reach at most 100 from the centre, which is inside the 126 px worst-case brand reach the World section budgets for.

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted. **§13's "never the same slot twice running" takes its fixed-world form** (MISSIONS.md 9.1 item 5): the rack's slots never move, so what may not repeat is the CATEGORY — two consecutive beds never share the same side-count, and a corners item never immediately follows a corners item.

Worked example: bed 1 (triangle) — she paces three edges, brands 1-2-3, walks out, counts three boards onto her shell, taps the bed, three boards go down, the frame closes, a sprig goes in and the bed glides to the row · bed 2 (square) first-try → L2 · bed 3 (hexagon) — she paces six edges but the child counts out five; the sixth edge is left bare and strung; the correction relights the rim 1 … 6, holds the 6, pulses the bare edge and cuts "6" into the soil; she plods back and the child counts out the one remaining board; solved-with-help · bed 4 (irregular pentagon) first-try · bed 5 (pentagon) first-try → L3 · bed 6 (hexagon; corners) — six holes, six pegs, first-try · beds 7-10 with one over-load returned board by board → Finish: ten planted beds, the gate open, the three young inside.

## Rules
- **Item count**: 10 (one item = one bed: one marking-out lap, one count-out, one fitting).
- **Difficulty progression**: 2 consecutive first-try beds → the next bed comes from the next level up (cap L3). "First-try" = the frame closed on the first count-out, with no short load and no surplus.
- **Adaptation**: a bed that needed a second count-out or a return of surplus, or a non-first-try bed on 2 consecutive items → the next bed comes from one level down (floor L1).
- **Stuck rule** (an inactivity cue only, never a clock): after 6 s with no tap, the next legal step's `ART.cornerPeg` — or, during the count-out, the live `ART.rackSlot` — plays `ANIM.pulse` once; repeated every 6 s of inactivity. Nothing is displayed about elapsed time and nothing ends. This is the one declared touch on the F1 freeze; it is the support ladder's stuck rule rather than ambient life, and the pre-pivot spec carries the same cue.
- **What happens on a correct answer** (the world accepts the fit — `shell.length === 0 && rim.every(e => e.boarded)`): `tone("correct")`, `ART.tortoiseHappy` 400 ms, `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-try beds only (helped beds get `tone("correct")` and no praise pop), one `ART.sprig` leaves `ART.seedTray` with `ANIM.plant`, the bed becomes `ART.bedPlanted` and `ANIM.glide`s to the garden row keeping its rotation, `ART.bedBrand` is cut into it, the plain earth to the gate post shrinks by 52 px, and the next bed is pegged out around the tortoise where she stands.
- **What happens on a wrong answer** (the fit fails). Nothing is ever refused ON the tortoise: her pose is identical in the before and after screenshots, and every consequence changes the apparatus. Two shapes, by anticipated mistake:
  - **A short load** (cardinality slip low; a skipped side carried into the count-out): the boards run out with m edges bare. She stops. The boards already down stay down; the bare edges keep their strings and their brands, so the shortfall is a countable picture, not a judgement.
  - **A long load** (cardinality slip high; a long side counted as two): the frame closes with s pieces still on the shell, visibly, countable. She carries them back and the child returns them one tap at a time.
  In both cases `tone("nudge")` sounds once and then **the enacted correction plays with the whole world `setEnabled(false)` for its duration**, so nothing can be tapped mid-teaching: the `ART.edgeString`s relight one at a time round the rim, 300 ms apart, with rising `tone("tap", k)` and each `ART.ordinalBrand` re-stamping 1 … n; the nth brand plays `ANIM.lastBrand` and HOLDS 400 ms; then each bare edge plays `ANIM.pulse` once in turn; then, and only then, the count is cut into the soil at the bed's centre as `ART.soilCut` at 44 px and holds 900 ms. **That number appears nowhere else in the game** — it is teaching, never answering. Duration is n × 300 + 260 + 400 + (bare edges × 300) + 900, which is never shorter than the pre-pivot spec's n × 300 + ~800 (GAME-DESIGN-LAW §6: correction duration may not fall, and the world freezes while a correction plays).
  - **Tapping an edge that does not begin where she stands, or one that is already strung**: nothing happens — there is no target there. Skipping and double-counting are structurally impossible rather than corrected.
  - **Tapping the bed with an empty shell**: she looks at it and the next bare edge's string plays `ANIM.pulse` once. A harmless preview, not an error.
- **Retry behaviour**: per bed — attempt 1 is the count-out unaided; attempt 2 follows the enacted correction and asks only for the remainder, a smaller question than the one that failed; attempt 3 is the show-me, where exactly the needed number of pieces lift six pixels proud in the rack and hold (`ANIM.showMe`), and taking them completes the bed as solved-with-help. No attempt 4. A long load resolves in a single pass — once the surplus is back in the rack the frame is already closed — so an over-loading child always finishes. Success is certain.
- **Anti-brute-force guard: THE ONE-WAY SHELL.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the rack a place (GAME-DESIGN-LAW §6). The named replacement has five parts, and the first four are structural. (1) *One-way door:* the load is fixed the instant she turns for the bed; walking back does not un-take a board, and the only way out of a wrong load is through it, in view. (2) *The positions carry no information:* the rack is nine deep for every bed, so its length never encodes n, the slots are identical, and the CANDIDATE SET varies per item because the SHAPE varies (n ∈ 3…8) — vary the candidates, never the positions. (3) *The correct load is always the cheapest path through the world:* every surplus piece costs two taps, one to take it and one to put it back, and every shortfall costs a plod and a second count-out, so taking nine every time is strictly more work than counting, wordlessly, every bed, forever. No rule says so; the world is just shaped that way. (4) *No elimination surface exists:* there are no three tiles to guess between, the answer is produced rather than selected, and a guess is not cheap here in the way a guess at one of three tiles is cheap — the child must count out SOMETHING, and counting out something is the task. (5) *A bed finished after any wrong load never counts as first-try*, so the ladder cannot advance on brute force, the easing pulls the next bed down a level, and the enacted count plays in full every time. **The honest limit, stated rather than hidden:** a child who deliberately over-loads every bed still finishes the garden — and must, because success is certain (F-46) and nothing here may punish (F-61). What they lose is the clean run; what they get is the enacted count, ten times, with the world frozen around it. F-65's bar is that a random tapper reaches the show-me ladder on most items, and this design clears it; a bar a determined child could not cross at all would require a way to fail, and there isn't one to be had.
- **Finish condition**: 10 beds planted, the row reaching the gate post, the gate open and the three young inside. No losing state; the only exits are Finish or Menu. Exactly zero ways a session ends other than by finishing. Nothing in the world ever decays: no board comes off an edge, no bed is unplanted, the seed tray never refills, the young never leave, the gate never moves further away, and a wrong load costs taps and nothing else (the RATCHET RULE).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is deliberately NOT used — there is no item counter on the play surface.
- Game-specific `STRINGS` (all 11 locales at build time, §17): `title` = "Tortoise's Garden"; `premise` = "Finish the garden." **Five English words for the whole game**, against the 6-8 band's eight (F6), and both appear on the Start screen only. The pre-pivot spec's `howManySides` and `howManyCorners` are DELETED: the job is stated by the apparatus — a bed with bare edges asks for boards, a boarded bed with gaping holes asks for pegs — so the play surface carries zero words and the game is fully language-neutral except its title.

## Sound
`tone("tap", k)` on the k-th edge paced round the rim and again on the k-th piece taken onto the shell, so the pitch climbs with the count twice per bed (F-213); `tone("tap", k)` per relit edge during an enacted correction; `tone("nudge")` once when a load does not fit; `tone("correct")` when a frame closes; `tone("finish")` once. Sound never carries meaning the screen does not also show. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (the title, the premise, All done, Play again, Menu and the praise rotation change with the picker; the play surface is numerals only, so it is identical in every locale).
- [ ] Works at narrow width (400-px iframe: the bed with its step targets, the nine rack slots, the garden row, the seed tray, the gate and the three young all visible in one frame; the ordinal brands and the load numeral legible).
- [ ] Keyboard operable (Tab cycles only the live targets — the ≤ 2 legal steps during a lap, the next slot and the bed during a count-out; Enter acts; a real pointer drives at least one assertion per §3.1, and the hit rectangle is mapped, not sampled at the centre).
- [ ] Never auto-starts.
- [ ] No losing state (a short load, a long load and any number of wrong loads still end in a planted bed via the show-me; nothing can be lost; the session cannot end except by finishing).
- [ ] MISSION — the tortoise, the current bed, the seed tray and the gate with its three young are all on screen in the very first frame of bed 1, and the gate's (x, y) is identical in the first and last frames of the session (M1).
- [ ] MISSION — driving a full session, the hero's position changes on at least 9 of the 10 items, and every position change is a tween the child caused (M1, M3); at the start of bed k+1 she is exactly where she was at the end of bed k, with one of the new bed's corners under her feet.
- [ ] RATCHET — a session driven with a wrong load on every bed never decreases `mission.progress` (planted beds × 8 + boarded edges); no board leaves an edge, no bed is unplanted, no sprig returns to the tray, no young ever leaves (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.pace`, `ANIM.traverse`, `ANIM.glide` and `ANIM.plant` to duration 0 produces a byte-identical item log: the same edges paced in the same order, the same load taken, the same fit, the same outcome. The harness must NOT patch `ANIM.relight`, `ANIM.lastBrand`, `ANIM.pulse` or `ANIM.appear` — those are the teaching, not the travel, and at duration 0 elaborated feedback collapses to knowledge-of-result.
- [ ] DELETION 1 — patch out the requirement that the shell hold exactly n and that each edge take exactly one board, and let the frame close on any load: no move can be right or wrong, the rack has no reason to exist and the count-out has no stopping condition. Nothing playable survives, and no arcade is left over, because there was never one bolted on.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: stringing an edge IS the tortoise arriving at its far corner and taking a board IS her stepping along the path, so with no hero no edge can ever be strung and the rack is inert; with no gate and no garden row there is nothing for a finished bed to become. The lap never starts and an item is mechanically impossible to complete.
- [ ] FREEZE (M2) — at every decision point of a full session, if any target is enabled the running tween count is zero; the tortoise holds one static pose, the three young are static drawings, and nothing breathes, drifts or loops during play. The only declared exception is the 6 s inactivity pulse, which fires only after 6 s with zero taps.
- [ ] NO PROGRESS FURNITURE — zone T carries the language picker and nothing else, in every frame of a full session; there are no hollow sockets in the garden row for beds not yet made.
- [ ] The lap: tapping a live edge paces the tortoise along it in the same 180 ms whether the edge is 173 px (triangle) or 70 px (octagon), lays a string down its full length and stamps one ordinal.
- [ ] Tapping a strung edge, or an edge that does not begin at the corner she is standing on, does nothing at all — there is no target there.
- [ ] After the nth step she is back at the corner she started from, every edge carries a string and an ordinal 1 … n, and NO total is displayed anywhere on the screen.
- [ ] She may go either way round from the first step, and both directions give the same set of ordinals.
- [ ] The count-out: only one rack slot is ever enabled, each tap lifts exactly one piece onto her shell, and the running total beside the stack matches the number of pieces on it at every step.
- [ ] The commit reads her position — `n_supplied = (tortoise.x − 96) / 62 + 1` — and no tile id, keypad buffer or selection index is read anywhere in the game.
- [ ] A short load leaves the boards already down in place, leaves the bare edges strung and branded, and resumes from where she stopped rather than restarting the bed.
- [ ] A long load closes the frame, leaves the surplus visible and countable on her shell, and returns it to the rack one tap at a time with nothing dropped and nothing lost.
- [ ] The enacted correction freezes the world, relights the rim 1 … n with rising notes, holds the last brand 400 ms, pulses each bare edge and only then cuts the count into the soil — and that numeral appears nowhere else in the game.
- [ ] The tortoise's pose is identical in the before and after screenshots of every wrong load; nothing happens to her at any point in the session.
- [ ] Corners items (L3) arrive already boarded with gaping holes, the rack holds pegs, only the holes carry a target, and no edge is tappable.
- [ ] Beds appear rotated and, from the second level, with unequal sides; a long side still takes exactly one board and one ordinal.
- [ ] Two first-try beds in a row bring a shape with more sides; a bed that needed a second count-out brings a simpler shape next; two consecutive beds never share a side-count.
- [ ] Only ONE coral region is on screen in any frame: the current bed's ordinal brands. A planted bed's brands are replaced by a single teal number as it joins the row.
- [ ] The garden row grows left to right at a 52 px pitch, the plain earth to the gate post shrinks by 52 px a bed, and the seed tray empties from ten to none.
- [ ] At the Finish the gate opens, the three young walk in and settle among the beds, and the summary is the ten planted beds at their play coordinates and play rotations with their numbers — no score, no star, no first-try record, no progress circles.
- [ ] ACT budget: total ACT time across a full session is measured and is under 60 s (R1).
- [ ] With `?sound=off` nothing is audible; with sound on, each edge paced and each board taken is a higher note than the last.
