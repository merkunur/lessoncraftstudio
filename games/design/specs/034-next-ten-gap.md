# 034 — Beacon Road

## Identity
- Slug: `next-ten-gap`
- Subject / topic: Mathematics / the complement to the next ten from a two-digit number (47 + 3 = 50)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 tap commits the bound; the road then executes it and the road is what judges the landing)
- Frame: THE LEAP
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Frame contract: `design/MISSIONS.md` FRAME 2 — THE LEAP, and `design/GAME-DESIGN-LAW.md`. Sibling games: 004 (bonds to 10), 008 (counting on along a line), 030 (counting back), 003 (the ten-frame).

## Learning
- Objective: Given a two-digit number on a number line, predicts how many more are needed to reach the next ten by tapping the numeral among three, then watches the counters hop there and the ten-frame of ones fill.
- Prerequisites: Bonds to 10; reads two-digit numerals; counts on within a decade.
- Curriculum links: F-21 (place value tens/ones; +/− within 100 by mental strategies), F-31 rows "Place value tens/ones" and "+/− within 100, mental" — conservative 7-8 → 6-8 (US 1.NBT.C.4 / 2.NBT.B.5 "make a ten"; England Y2 "add … using … bridging to 10"; Germany Klasse 2 "Ergänzen zum nächsten Zehner"; France CE1 "compléments à la dizaine supérieure"; Netherlands groep 4 "aanvullen tot het tiental"; Spain 1º ciclo; Brazil EF02MA05; Sweden åk 1-3 "tiotalsövergång"; Finland grade 2).
- Common misconceptions (F-105, F-108, F-104), each with this game's response:
  1. **Digits as independent numbers — answering with the ones digit itself ("47 … 7").** Response: the 7-bound is laid on the road as seven `ART.laidDash` arcs from the rabbit's own stone — they fall across stones 48 and 49, across the target beacon, and four more into the heather beyond it. The rabbit runs the length it laid; as it passes, the beacon's lamp swings (`ANIM.lampSwing`) and it comes to rest in the heather with the four surplus dashes lying behind it on the ground, countable. The plinth stays at seven set cells: nothing was set, because the rabbit did not land there. It then lopes back to its take-off stone (`ANIM.lopeBack`) and the beacon's light sweeps the true three stones (`ART.lightSweep`, one `ART.stoneBadge` per stone, rising tones, three `ART.plinthGhost` preview rings in the open cells). The excess is seen, not named.
  2. **Off-by-one from counting on starting AT the number ("47, 48, 49, 50 — four").** Response: the 4-bound lands one stone past the beacon; same lamp swing, same lope-back. In the light sweep that follows, the FIRST badge "1" pulses (`ANIM.badgePulse`) over stone 48 while the rabbit's own stone carries no badge at all — step 1 lands on 48, not on 47.
  3. **Not seeing the ones as "7 of a ten" (no bond link).** Response: the plinth the target beacon stands on IS the ten-frame — `ART.plinthCell` 2 × 5 at the beacon's foot, seven cells carrying `ART.plinthDisc` and three open. It is not a diagram beside the road; it is the mechanism, because **the beacon catches when the tenth cell sets**. Each stone the rabbit lands on sets one more cell (`ANIM.cellSet`). At L1 the plinth is visible while the child is deciding (a cue); from L2 it appears only during the run (cue fading, F-46), so the retrieval is unaided while the structure is always the explanation.
  4. **Language interference — de/nl/da say the ones first ("siebenundvierzig"), and 47 is confused with 74.** Response: number words are never shown, in any locale. The visual order is identical in all eleven: TENS to the LEFT (the lit beacons receding on the horizon), ONES to the RIGHT (the plinth at the beacon ahead). Numerals sit on plates in the world; the play surface carries numerals, "+", "=" and "?" and nothing else (F-108).
  5. **Naming the wrong ten as "next" (going back to 40).** Response: every bound runs forward and there is no backward control on the screen, so "back to 40" has no representation and cannot be chosen. The beacon behind is already lit and cannot be lit again — it is a finished mark, not an option. At L3 the beacon ahead reads "?" on its `ART.plateNum` until it catches, so the child must know which ten comes next.

## Mission
**Mission, as the child would say it.** *Light the road home.*

**The want, in one still frame, with no words (F-11, F-212).** A rabbit stands on a road of stones at dusk with a small flame in its paws. The lamp-post ahead of it is dark. The lamp-post behind it is lit. On the horizon a line of dark posts runs away to a small house with one lit window and the family waiting in the open doorway. The lack is legible in a photograph: the road ahead is unlit and home is a long way off. Nothing threatens. The dusk never deepens, nothing burns down, nobody leaves, and the house never moves. The lack is simply that the beacons are not lit yet.

**`S` — the single state variable, and its two readings (MISSIONS.md 1.1).**

> `S` = **the road-stone the rabbit is standing on.**
>
> **Mathematical reading.** `S` is the two-digit number. Its ONES digit is how many stones the rabbit has walked since the last beacon — which is exactly the number of set cells in the plinth at the beacon ahead. Its TENS digit is how many beacons are lit behind it. `S`'s decimal notation is not a label printed on the world; it is a census of the world.
>
> **Physical reading.** `S` is where the rabbit is standing on Beacon Road.

There is no second state. **There is no `item.answer` field anywhere in this design.** The goal predicate is `S % 10 === 0` — *the rabbit is standing at a beacon* — and the transition function is one bound: `S' = S + bound`. The child selects a transition of `S`; the road decides whether it lands on a beacon.

**The isomorphism — THE ANSWER IS THE LENGTH OF THE BOUND, AND THE BOUND IS THE RABBIT'S DISPLACEMENT.** A beacon can only be lit by standing on it, and a beacon only stands on a full plinth of ten. So *"how many more to the next ten"* is not a question asked about the road; it is the only thing the rabbit can do on the road. The correctness check is

```
world.accepts(rabbit, S + bound)      <=>   (S + bound) % 10 === 0
```

and never `tapped === 3`. The proof that this is a fit and not a stored verdict: **the same bound is right or wrong depending on where the rabbit is standing.** The 3-bound carries the rabbit home from stone 47 and strands it one past the beacon from stone 49. After a short bound the world has moved and the correct number has CHANGED — which is why the anti-brute-force guard works and why no elimination strategy survives. The bound is laid on the road first, its dashes falling across the stones from the rabbit's own stone forward, and the rabbit then runs the length it laid: landing is not a reward for having chosen, it is the choice being executed.

**The one contestable point, declared rather than hidden (F2 of the F-42 gate).** The three bounds live in zone H, so the finger lands on a control, not on a place. The alternative — three candidates sitting on the road at their own landing positions — was designed and rejected on a measured ground, not an aesthetic one: with the beacon visible, a child taps the candidate at the beacon's foot and does no arithmetic at all. That version satisfies the letter of the Displacement rule and is strictly EASIER than the worksheet it replaces. This design satisfies the substance: the world judges a position, the position is the hero's, and the same input maps to different answers as the world changes.

**The mark that stays (Device 2).** A lit beacon. It never goes out, and by the end of the session ten of them stand in a line from left to right — which is the number line 0-100 in tens, drawn by the child.

**The waiting party (Device 1).** The family in the lit doorway of the house at (672, 136), drawn from tap one, in a state that only arrival changes.

## World
**ZONE W (56-420) — one scene, one saccade, zero camera tweens between item-start and commit (F3).**

*Sky and horizon.* `ART.skyBand` fills y 56-168 and `ART.horizonLine` rules it off at y = 168; this is the screen's single scenery wash. **THE HOUSE** — the mission goal — sits at (672, 136) for the entire session, `ART.home`, door open, one lit window, the family in the doorway. It GROWS one step per beacon lit, 28 px at item 1 to 64 px at item 10; its (x, y) never changes. **THE BEACONS ALREADY LIT** (the tens digit) are `ART.beaconLit` at size 20, y = 158, x = 66 + 28k for k = 1 … (tens − 1); the most recent one of all is the near beacon drawn large on the road, so a lit beacon is counted exactly once and the census is exact. **THE BEACONS STILL TO LIGHT** are `ART.beaconDark` at size 16, y = 156, x = 448 + 20j for j = 1 … (10 − item). Their number is what shrinks.

*The road (the working number line — the trail IS the number line, MISSIONS.md 2.4a).* `ART.roadBar` runs x 20 → 700 at y = 306, with `ART.roadStone` tops at y = 300.

| element | position |
|---|---|
| last beacon, lit (`ART.beaconLit`, size 72) | base (30, 300), lamp at y = 226, numeral plate (30, 198) |
| road stones h = 1 … 9 (`ART.roadStone`) | x = 66, 102, 138, 174, 210 · 256, 292, 328, 364 (pitch 36, a 10 px break after the fifth so the stretch reads 5-and-5) |
| target beacon, unlit (`ART.beaconDark`, size 72) | base (400, 300), lamp at y = 226, numeral plate (400, 198) — the tenth place of the stretch is the beacon itself |
| the plinth (the ones ten-frame) | 2 × 5 `ART.plinthCell`, 24 px cells at 26 px pitch, rows y = 374 and 400, cell centres x = 348/374/400/426/452, block centred (400, 387) |
| the rabbit | feet on its stone, centre y = 272, 56 px; its numeral on `ART.platePad` at (heroX, 342) |
| the heather beyond | the road recedes past the beacon at a 32 px pitch, x 400 → 700 |

At item 1 the road's left end carries `ART.cairn` instead of a beacon: zero is where you set out from, not something you light, so *lit beacons behind = the tens digit* holds with no exception from the first frame to the last.

**Where a long bound lands, measured.** The worst case is a 9-bound from stone 9 — eight units past the beacon — at x = 400 + 8 × 32 = 656, rabbit right edge 682, on a 720 px stage with 38 px to spare. This fits only because the heather recedes at 32 px against the road's 36; if the art widens the rabbit past 52 px this case clips.

**What the ground tells you, per level.** At L1 every stone also carries `ART.tickNum` at y = 326. At L2 only the two beacons are numbered. At L3 the target beacon reads "?" until it catches. So from L2 the ground between the rabbit and the beacon is unmarked turf and **the gap cannot be counted by eye** — retrieval is forced by the terrain, which is the same support ladder the pre-frame spec ran with tick labels.

**ZONE H (420-560) — THE HAND, three controls.** Three BOUNDS, `ART.boundCard` 108 × 88, centred at (180, 492), (360, 492), (540, 492) — 108 px against the 56 px band floor, gaps 72 px. Each carries `ART.boundArc`, a dashed arc, and `ART.boundNum` at 44 px. At L1 the card also carries a countable row of `ART.boundDot`, one per unit of the bound (the counting-on support that matches the L1 numbered stones); at L2 and L3 the dots are gone and nothing on the screen is measurable against anything.

Tapping a bound LAYS it on the road first and the rabbit then runs the length that was laid. One tap, one commit; there is no Check button. Tab order left → right, Enter commits, so the whole game is keyboard-operable. The three bounds are always {the true complement, the ones digit, the complement ± 1}, **recomputed from the rabbit's current stone** — the diagnostic distractor set of the pre-frame spec, preserved exactly, because those three distractors ARE three of the five misconceptions (BUILD-CONVENTIONS §8.1).

**Interactive-element count (F-69).** Three bound cards. The rabbit, the beacons, the stones, the plinth and the house are inert scenery: three.

**The road is 0 → 100 and the session is ONE journey.** Item i runs from 10i − gap to 10i: ten items, ten beacons, one road. The level sets the gap only, so adaptation never disturbs the journey. Between items the moor turns over inside the same ACT that lit the beacon — the just-lit beacon recedes to the horizon row of lit ones, the next stretch comes forward, and the rabbit WALKS every pixel to its new stone; it never teleports. That is the conveyor F-41 requires (items are events, not locations), not a map.

## How it plays
1. **Start screen.** Title "Beacon Road", `ART.rabbitIdle` at (360, 210) with `ART.flame` in its paws, the language picker at (16, 16), `t("start")` on a `makeButton`. Never auto-starts. A breathing idle is permitted here and nowhere else (ART-BIBLE §6).
2. **Item 1 (L1, gap 3 — the road from 7 to 10).** The whole world builds with `ANIM.appear`: `ART.skyBand`, `ART.horizonLine`, `ART.home` at (672, 136) at 28 px with the family in the doorway, nine `ART.beaconDark` posts thinning away to it, `ART.roadBar`, nine `ART.roadStone`, `ART.cairn` at (30, 300), the target `ART.beaconDark` at (400, 300) with `ART.plateNum` "10" on its `ART.platePad` at (400, 198), and the plinth: ten `ART.plinthCell` with seven `ART.plinthDisc` set and three open. The rabbit stands on stone 7 at x = 292 in the `ART.rabbitIdle` pose, `ART.flame` in its paws, `ART.heroNum` "7" on its plate at (292, 342). Every stone carries `ART.tickNum`. Zone H fills with three `ART.boundCard`: 3, 7, 2, shuffled, each with `ART.boundArc`, `ART.boundNum` and its row of `ART.boundDot`. **F-42 R4 concession:** on the first item only, the rabbit takes one unbidden step-in-place and holds — the mechanic demonstrating itself once. Then the stage FREEZES: zero tweens running while any card is enabled.
3. **The child lays a bound.** Tapping a card `ANIM.pop`s it, `tone("tap")`, all three lock, and the ACT begins at once. The bound falls onto the road as b `ART.laidDash` arcs at y = 288, from the rabbit's own stone forward, one every 30 ms (`ANIM.layDash`, ≤ 300 ms in total). The rabbit swaps to `ART.rabbitHop` and runs the length it laid (`ANIM.run`), a small `ANIM.land` squash at the far end.
4. **Correct — the beacon catches.** The rabbit crosses stones 8, 9 and lands on the beacon's own stone. Each stone it crosses turns to `ART.stoneTrodden`, takes an `ART.stoneBadge` with `ART.badgeNum` 1, 2, 3 at y = 284 (`ANIM.badgeIn`) and plays `tone("tap", k)`, pitch rising; each landing sets the next open plinth cell with `ART.plinthDisc` (`ANIM.cellSet`). At the tenth cell the plinth is full, the rabbit touches `ART.flame` to the lamp, the lamp flares (`ANIM.kindle`) and settles as `ART.beaconLit`; the flame returns to the rabbit's paws — it is not spent. `tone("correct")`, `ART.rabbitHappy`, a praise pop. The plinth block gives way to `ART.eqText` "7 + 3 = 10" centred at (400, 387): **the full ten-frame becomes the equation**, in the same frame as the fiction (GAME-DESIGN-LAW 2.5). Then, inside the same ACT, the moor turns over: the new beacon recedes to the horizon row (`ANIM.recede`), `ART.home` grows one step (`ANIM.grow`), one `ART.beaconDark` post is removed from the row ahead, the next stretch comes forward and the rabbit WALKS to its new stone. Total ACT ≤ 1200 ms; ≤ 1500 ms when a level changes.
5. **Wrong — a SHORT bound (the child taps 2 from stone 47).** Nothing is refused. The rabbit runs two stones, 48 and 49 turn to `ART.stoneTrodden` with badges 1 and 2, two cells set, and it STANDS ON 49 with `ART.heroNum` reading "49". The beacon is still dark and the one bare stone between it and the beacon is right there. `tone("nudge")`. Then the beacon's light sweeps the REMAINING stone (`ART.lightSweep` from the lamp at (400, 226) down the road, `ART.stoneBadge` "1", `ART.plinthGhost` in the one open cell, rising tone) and fades. **The world advanced, nothing was lost, and the remainder is the next problem** — 47 + 2 + 1, the make-ten decomposition enacted by the child's own move rather than explained (F-105's own recommended response falls out of the geometry). Attempt 2 opens from stone 49 with a fresh bound set {1, 9, 2} recomputed from the new stone.
6. **Wrong — a LONG bound (the child taps 7 from stone 47).** The rabbit runs, the beacon's lamp swings as it passes (`ANIM.lampSwing`), and it comes to rest in the heather at x = 528 with four surplus `ART.laidDash` lying beyond the beacon, countable. **The plinth does not fill** — nothing was set, because the rabbit did not land there. `tone("nudge")`. It then lopes back to its take-off stone (`ANIM.lopeBack`) — the one reversal MISSIONS.md FRAME 2 sanctions explicitly, a visible, in-fiction, cost-free undo — and the beacon's light sweeps the true three stones with badges 1, 2, 3, rising tones and three `ART.plinthGhost` preview rings in the open cells, then fades. **No fall, no stumble, no dimming, no sad pose, no denial: the rabbit's pose and position are identical in the wrong-answer screenshot and the right-answer screenshot, and only the road differs** (GAME-DESIGN-LAW 3.0). Attempt 2 opens from the same stone, with the truth having been shown.
7. **Attempt 3 — the show-me.** The correct bound lifts a few pixels proud of the other two and holds there inside `ART.showRing` (`ANIM.showMe`). Tapping it completes the crossing as solved-with-help. There is no attempt 4, and there is no way for the session to end other than arriving.
8. **Items 2-10.** Per Content and Rules. The decade is fixed by the item index; the level sets the gap band, the ground labels and whether the plinth is visible while deciding.
9. **Re-queue (F-41, and MISSIONS.md R5).** A crossing missed on the first bound returns as the same GAP two beacons later — the same ones digit in a new decade, at the rabbit's current position, never a teleport back. It replaces that item's scheduled gap; the count stays 10.
10. **Finish.** The tenth beacon is the one at 100 and it stands outside the house; when it catches, the rabbit walks the last few paces and the family comes out to meet it. The Finish scene re-draws the same world at its play coordinates — `ART.roadBar` at y = 306, `ART.horizonLine` at 168 — with ten `ART.beaconLit` at size 36 in a line from left to right, `ART.home` at full size with the family outside it and `ART.rabbitHappy` (`ANIM.celebrate`) beside them. Under each beacon its own crossing in `ART.tickNum` — "7 + 3", "18 + 2", "27 + 3" … That line IS the number line 0-100 in tens, drawn by the child, and it is also the session summary. `t("all_done")` at (360, 96), `play_again` (250, 510), `menu` (470, 510), `tone("finish")`. **No score, no first-try marking on the beacons**: a beacon lit with help is lit exactly like the others, because the road does not remember who needed a second bound.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  /* --- the hero: roster animal #3, drawn once at 96 px per ART-BIBLE §3/§7. NOT warm-bodied
     (body = the structureSoft dark tint, belly/face the light tint, ink-lined ear insides), so the
     whole §9.4 accent budget stays free for the flame. The roster's `oops` pose is deliberately not
     drawn for this game: the character is never the consequence. --- */
  rabbitIdle:   { kind: "svg", value: LCSArt.get("rabbit.idle"),  size: 56 },
  rabbitThink:  { kind: "svg", value: LCSArt.get("rabbit.think"), size: 56 },
  rabbitHop:    { kind: "svg", value: LCSArt.get("rabbit.hop"),   size: 56 },   // the `act` pose: coiled, mid-bound
  rabbitHappy:  { kind: "svg", value: LCSArt.get("rabbit.happy"), size: 56 },

  /* --- THE ONE ACCENT ENTRY IN THIS GAME (one grep, one number, ART-BIBLE §10.1) --- */
  flame:        { kind: "svg", value: LCSArt.get("flame"), size: 20 },          // accent + accent-light tint only

  /* --- the goal and the horizon --- */
  home:         { kind: "svg", value: LCSArt.get("home.burrow"), size: 120, w: 120, h: 92 },  // NON-SQUARE: size === w (ART-BIBLE §9.1)
  cairn:        { kind: "svg", value: LCSArt.get("cairn"), size: 40 },          // the road's origin at 0; no lamp
  beaconLit:    { kind: "svg", value: LCSArt.get("beacon.lit"),  size: 48, w: 48, h: 72 },    // white glass, structure ring, four short rays
  beaconDark:   { kind: "svg", value: LCSArt.get("beacon.dark"), size: 48, w: 48, h: 72 },    // hollow glass, line ring, no rays
  skyBand:      { kind: "shape", shape: "rect", w: 720, h: 112, fill: "surface2" },
  horizonLine:  { kind: "shape", shape: "rect", w: 720, h: 2, fill: "line" },

  /* --- the road --- */
  roadBar:      { kind: "shape", shape: "rect", w: 680, h: 3, fill: "line" },
  roadStone:    { kind: "shape", shape: "ellipse", w: 22, h: 12, fill: "surface2", stroke: "line", strokeWidth: 2 },
  stoneTrodden: { kind: "shape", shape: "ellipse", w: 22, h: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },

  /* --- the plinth: the ones ten-frame, and the mechanism --- */
  plinthCell:   { kind: "shape", shape: "rect", w: 24, h: 24, fill: "surface", stroke: "line", strokeWidth: 2 },
  plinthDisc:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },                  // a SET cell
  plinthGhost:  { kind: "shape", shape: "circle", r: 8, stroke: "inkSoft", strokeWidth: 2 },  // preview only, visibly hollow

  /* --- numerals in the world --- */
  platePad:     { kind: "shape", shape: "roundRect", w: 44, h: 26, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  plateNum:     { kind: "text", value: "", size: 22, font: "display", color: "structure" },   // a beacon's ten, or "?"
  heroNum:      { kind: "text", value: "", size: 26, font: "display", color: "ink" },         // the rabbit's own number
  tickNum:      { kind: "text", value: "", size: 14, font: "body", color: "inkSoft" },        // L1 stone numerals; Finish crossings
  eqText:       { kind: "text", value: "", size: 26, font: "display", color: "structure" },   // "47 + 3 = 50", where the plinth was

  /* --- the hand --- */
  boundCard:    { kind: "shape", shape: "roundRect", w: 108, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  boundArc:     { kind: "shape", shape: "arc", r: 30, stroke: "structure", strokeWidth: 3 },  // dashed half-arc, lineDash [6,6]
  boundNum:     { kind: "text", value: "", size: 44, font: "display", color: "structure" },
  boundDot:     { kind: "shape", shape: "circle", r: 4, fill: "inkSoft" },                    // L1 only, one per unit
  showRing:     { kind: "shape", shape: "roundRect", w: 120, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },

  /* --- what a move leaves on the road --- */
  laidDash:     { kind: "shape", shape: "arc", r: 18, stroke: "inkSoft", strokeWidth: 2 },    // dashed, lineDash [5,5], stone to stone
  stoneBadge:   { kind: "shape", shape: "circle", r: 11, fill: "structure" },
  badgeNum:     { kind: "text", value: "", size: 14, font: "display", color: "bg" },
  lightSweep:   { kind: "shape", shape: "polygon", points: [[0,0],[-8,74],[8,74]], fill: "structureSoft" }  // the lamp's beam, 35% alpha, drawn under everything
};
```

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a bound card is tapped" },
  layDash:    { alpha: 1, duration: 70, ease: "Sine.Out", trigger: "each ART.laidDash from alpha 0, staggered 30 ms; b dashes in <= 300 ms" },
  run:        { duration: 520, ease: "Sine.InOut", trigger: "the rabbit CONTAINER x to the landing stone; duration = clamp(60 x units, 220, 640); a parallel y -=10 yoyo per unit crossed gives the bound its bob" },
  land:       { scaleY: 0.88, duration: 90, ease: "Sine.Out", yoyo: true, trigger: "squash on arrival, on the rabbit's container" },
  badgeIn:    { alpha: 1, duration: 120, ease: "Back.Out", trigger: "an ART.stoneBadge as its stone is crossed (from alpha 0)" },
  badgePulse: { scale: 1.3, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "badge 1 in the light sweep after an off-by-one bound" },
  cellSet:    { alpha: 1, duration: 150, ease: "Back.Out", trigger: "an ART.plinthDisc as the rabbit lands (from alpha 0); on a CONTAINER, never raw scale on an svg entry (ART-BIBLE §9.3)" },
  cellGhost:  { alpha: 1, duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "an ART.plinthGhost preview ring during a light sweep; returns to alpha 0, sets nothing" },
  sweep:      { scaleY: 1, duration: 260, ease: "Sine.Out", trigger: "ART.lightSweep extending from the lamp down the road, on its container (from scaleY 0.05)" },
  lampSwing:  { angle: 12, duration: 150, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the target beacon's lamp as the rabbit passes it" },
  lopeBack:   { duration: 420, ease: "Sine.InOut", trigger: "the rabbit's container x back to its take-off stone after a long bound" },
  kindle:     { alpha: 1, duration: 260, ease: "Back.Out", yoyo: true, trigger: "ART.flame flaring in the lamp as the tenth cell sets, then returning to the rabbit's paws" },
  recede:     { duration: 340, ease: "Sine.InOut", trigger: "the just-lit beacon's CONTAINER to its horizon place and size, inside the same ACT" },
  grow:       { duration: 300, ease: "Back.Out", trigger: "ART.home's CONTAINER one step larger, +4 px per beacon" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the world building at item start (from alpha 0, scale 0.6), on containers" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ART.showRing on the correct bound, attempt 3 (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the Finish rabbit" }
};
```

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                chrome only       |  zone T   0- 56
 56   +--------------------------------------------------------------+
      |  ART.skyBand      o o o        . . . . .        [HOME 672,136]|
      |  lit beacons (tens)  |  dark posts (still to light)           |  horizon y=168
 168  |--------------------------------------------------------------|
      |   [40]                                   [50]  plates y=198   |  zone W  56-420
      |    |                    (R)               |    lamps  y=226   |  THE WORLD
      |    B  o  o  o  o  o | o  R  o  o          B    stones y=300   |
      |       1  2  3  4  5   6  7  8  9              ART.tickNum 326 |
      |                      [47] hero plate y=342                    |
      |                              [][][][][]  plinth rows 374/400  |
      |                              [][][][][]  (becomes ART.eqText) |
 420  +--------------------------------------------------------------+
      |     [  3  ]          [  7  ]          [  2  ]   y=492         |  zone H 420-560
      |      x=180            x=360            x=540    108 x 88      |  THE HAND
 560  +--------------------------------------------------------------+
```
(B = a beacon on the road; R = the rabbit on its stone; o = `ART.roadStone`.) Stone h at x = 66 + 36(h − 1) for h = 1-5 and x = 76 + 36(h − 1) for h = 6-9; the beacons close the stretch at x = 30 and x = 400. Beyond x = 400 the road recedes at a 32 px pitch into the heather. Fixed 720 × 560, `Scale.FIT`, static camera, no scrolling. Progress is diegetic: the lit beacons receding, the dark posts thinning, `ART.home` growing, and the rabbit's own place on the stones.

## Visual specification
- Background `THEME.colour.bg`. `ART.skyBand` y 56-168 in `THEME.colour.surface2` is the screen's ONE scenery wash (ART-BIBLE §4); `ART.horizonLine` at y = 168.
- `ART.home` at (672, 136), 28 px at item 1 growing +4 px per lit beacon to 64 px at item 10; the lit window and the doorway are `THEME.colour.surface` glass in a `THEME.colour.structure` frame — light in this world always reads as white glass in a teal ring, on the house and on every lamp alike, so nothing means by colour alone (BUILD-CONVENTIONS §12).
- Horizon: `ART.beaconLit` size 20 at y = 158, x = 66 + 28k, k = 1 … (tens − 1); `ART.beaconDark` size 16 at y = 156, x = 448 + 20j, j = 1 … (10 − item). The two rows never overlap and never reach `ART.home`.
- Road: `ART.roadBar` centred (360, 306); nine `ART.roadStone` at y = 300 on the pitch above; a crossed stone becomes `ART.stoneTrodden`. `ART.cairn` at (30, 300) on item 1 only, `ART.beaconLit` size 72 there from item 2 on; `ART.beaconDark` size 72 at (400, 300) until it catches.
- Numerals: `ART.platePad` + `ART.plateNum` at (30, 198) and (400, 198); `ART.platePad` + `ART.heroNum` at (heroX, 342) — the hero's own stone shows its plate instead of an `ART.tickNum`; `ART.tickNum` at (stoneX, 326) at L1 only.
- Plinth: ten `ART.plinthCell` at rows y = 374 / 400, centres x = 348/374/400/426/452; a set cell carries `ART.plinthDisc`, a previewed cell an `ART.plinthGhost` ring. On the catch the block gives way to `ART.eqText` at (400, 387).
- Move art: `ART.laidDash` arcs at y = 288 between consecutive stones; `ART.stoneBadge` + `ART.badgeNum` at (stoneX, 284), drawn beneath the rabbit's depth; `ART.lightSweep` from the lamp at (400, 226) at 35% alpha, under every other element.
- Hero: `ART.rabbitIdle` while a choice is open, `ART.rabbitThink` while the world is showing a light sweep, `ART.rabbitHop` while running, `ART.rabbitHappy` on a catch and on Finish; `ART.flame` in its paws at all times except the ~260 ms it is in the lamp.
- Hand: `makeTile` 108 × 88 (`ART.boundCard`) with `ART.boundArc` at y = 468, `ART.boundNum` at y = 496 and up to nine `ART.boundDot` at y = 524 at L1; `ART.showRing` behind the correct card on attempt 3. Tap floor 108 ≥ 56 (band 6-8), gaps 72 ≥ 12, all elements ≥ 16 px from the stage edge. Tab order left to right.
- Chrome (the language picker) sits at depth 1500 above every game element (BUILD-CONVENTIONS §3.2); a hit rectangle is mapped, never sampled at one point (§3.1).

## Content
Language-neutral: numerals only, no number words, in every one of the eleven locales (F-108). The road is a single journey 0 → 100, so the DECADE is fixed by the item index and the LEVEL sets only the gap, the ground labels and the plinth's timing.

- **Crossing i** runs from `10i − gap` to `10i`, i = 1 … 10. The last crossing is therefore always 9x → 100.
- **Bounds offered** = {gap, 10 − gap, gap ± 1}: gap − 1 when gap ≥ 2, else gap + 1; when gap = 5 both ± 1 are used because the ones digit collides with the answer.

| gap | the three bounds | the error each distractor diagnoses |
|---|---|---|
| 1 | 1 · 9 · 2 | ones digit · counted the start |
| 2 | 2 · 8 · 1 | ones digit · stopped short |
| 3 | 3 · 7 · 2 | ones digit · stopped short |
| 4 | 4 · 6 · 3 | ones digit · stopped short |
| 5 | 5 · 4 · 6 | stopped short · counted the start |
| 6 | 6 · 4 · 5 | ones digit · stopped short |
| 7 | 7 · 3 · 6 | ones digit · stopped short |
| 8 | 8 · 2 · 7 | ones digit · stopped short |
| 9 | 9 · 1 · 8 | ones digit · stopped short |

- **L1** — gaps 1-4; every stone carries `ART.tickNum`; the plinth is visible while deciding; the cards carry `ART.boundDot`.
- **L2** — gaps 5-9; only the two beacons are numbered; the plinth appears only during the run; no dots.
- **L3** — any gap 1-9; as L2, and the target beacon's `ART.plateNum` reads "?" until it catches.

Default sequence when every crossing is made on the first bound (L1 → L2 → L3 by the ladder): 7 → 10 (3) · 18 → 20 (2) · 27 → 30 (3) · 36 → 40 (4) · 45 → 50 (5) · 54 → 60 (6) · 62 → 70 (8) · 75 → 80 (5) · 83 → 90 (7) · 91 → 100 (9). Card positions are shuffled per item and the correct card's slot never repeats twice running (BUILD-CONVENTIONS §13). **The beacons and the stones never move**, which is what a persistent world requires; only the three cards in zone H shuffle, and the anti-brute-force guard does not lean on that shuffle at all.

## Rules
- **Anti-brute-force guard — THE ONE-WAY BOUND** (the named replacement for P1's tile re-shuffle, which is impossible in a persistent world because a station that jumps when you knock on it destroys the world's constancy). The rabbit never un-bounds. A short bound ADVANCES the world, so attempt 2 is posed from a NEW stone with a candidate set recomputed from the new position: after a wrong 2 from stone 47 the correct answer is no longer 3, it is 1. There is no stable "right one" to find by elimination, because the question itself has moved — strictly stronger than shuffling, which hides WHERE the answer is while this changes WHAT it is. Three supports underneath it: the candidate SET (never a fixed pool) is derived from the rabbit's current ones digit; commitment is a one-way door, so a crossing made after any bound but the first never counts as first-try and the level ladder is driven off that; and every wrong bound costs the full enacted correction with the world frozen, so chipping forward one stone at a time is the slowest way to walk the road and still reaches the show-me on attempt 3.
- **Item count**: 10 crossings, one per beacon (a re-queued gap replaces a later crossing's scheduled gap, never adds an item).
- **Difficulty progression**: 2 consecutive first-bound crossings → next level (cap L3).
- **Adaptation**: a wrong first bound on 2 consecutive crossings → the next crossing takes a gap one level down (floor L1). A single miss re-queues its gap two beacons later without changing level. The decade never changes, so the journey is never disturbed.
- **What happens on a correct answer**: the bound is laid, the rabbit runs it, each crossed stone becomes `ART.stoneTrodden` and takes a badge with `tone("tap", k)` rising, each landing sets a plinth cell, the tenth cell fills the plinth, the flame kindles the lamp, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the plinth becomes `ART.eqText`, the beacon recedes to the horizon, the house grows, the next stretch comes forward and the rabbit walks to its new stone.
- **What happens on a wrong answer** — the apparatus changes, never the creature:
  - **Short bound** (stopped short, or the second of two shorts): the rabbit lands and STAYS; the remaining stones are swept by the beacon's light with badges and rising tones; `tone("nudge")`; attempt 2 from the new stone with a recomputed set.
  - **Long bound by the ones digit** (7 for 47): the lamp swings as the rabbit passes, it rests in the heather with the surplus dashes lying behind it, the plinth does not fill, it lopes back, and the light sweeps the true bound.
  - **Long bound by one** (counted the start): as above, and badge 1 pulses over the first stone in the sweep.
  - **Attempt 2 wrong**: attempt 3 opens with `ART.showRing` on the correct bound.
- **Retry behaviour**: attempt 1 (the prediction) → attempt 2 with the truth having been shown → attempt 3 show-me, which completes the crossing as solved-with-help. No attempt 4.
- **THE RATCHET RULE**: a lit beacon never goes out; a set plinth cell never empties (which is exactly why a long bound leaves the plinth untouched — it can then never count down); `ART.home` never recedes; the road never closes behind; a trodden stone stays trodden for its stretch and then becomes part of the lit beacon that closes it. Nothing decays with time and nothing decays with an error. `ART.plinthGhost` and `ART.lightSweep` are LIGHT, not marks: they change no world state, so a correction cannot break the ratchet by construction.
- **Finish condition**: the tenth beacon catches at 100, outside the house. No losing state, no clock, no score, no stars, and exactly zero ways for a session to end other than arriving.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Beacon Road" (Boot and Finish only). **The play surface carries no words at all in any locale** — numerals, "+", "=" and "?" and nothing else — so the mission premise is carried entirely by the picture and the band's ≤ 8-word budget is spent at zero (F-42/F6). All eleven locale keys ship in `STRINGS` per BUILD-CONVENTIONS §17; there is no `LOCALE_DATA`, because there is no locale-varying content.

## Sound
`tone("tap")` when a bound is laid; `tone("tap", k)` on the k-th stone crossed, pitch rising with the count (F-213); `tone("correct")` when the beacon catches; `tone("nudge")` on a bound that does not land on the beacon; `tone("finish")` once. The light sweep re-plays the rising `tone("tap", k)` series over the stones it counts. Silent under `?sound=off`; sound never carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; the play surface stays numerals and symbols in every one).
- [ ] Works at narrow width (400-px iframe: the house, the horizon rows, the whole stretch with both beacons, the plinth and three bound cards all visible and legible).
- [ ] Keyboard operable (Tab across the three bounds, Enter lays one; the focus ring is the only thing that moves while a choice is open).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong bound never ends the session; the short bound advances the world, the long bound lopes back, and the show-me always completes the crossing).
- [ ] **Mission**: `ART.home` is drawn at (672, 136) from the first tap and its (x, y) never changes; the rabbit's x changes on at least 9 of the 10 crossings; the rabbit's position at the start of crossing k+1 equals its position at the end of crossing k (no teleport).
- [ ] **Deletion 2**: with the rabbit and the house removed, the game cannot complete a single crossing — there is no `answer` field to fall back on, because none was ever written.
- [ ] **Instant-cut (Deletion 3)**: patch `ANIM.run`, `ANIM.lopeBack`, `ANIM.recede` and `ANIM.sweep` to duration 0 and the session plays identically — same item log, same decision points, same outcomes, same level ladder. Every fact the traversal renders is also a static property of the frame after the move (trodden stones, badges, surplus dashes, plinth fill).
- [ ] **Ratchet**: driven with a wrong bound on every crossing, no beacon ever goes dark, no plinth cell ever empties, the house never shrinks, and the count of lit beacons never decreases.
- [ ] **F-42 freeze**: at every decision point, whenever any bound is enabled the running tween count is zero — the flame does not flicker, the lamps do not glow, the house does not pulse.
- [ ] The same bound is right from one stone and wrong from another: 3 lands the rabbit on the beacon from stone 47 and one past it from stone 49, and attempt 2 after a short bound offers a set recomputed from the new stone.
- [ ] Tapping 7 from stone 47 lays seven dashes, swings the lamp as the rabbit passes, leaves four surplus dashes beyond the beacon and the plinth at seven, then lopes back.
- [ ] Tapping 2 from stone 47 leaves the rabbit standing on 49 with two cells set and one bare stone in front of it.
- [ ] The tenth plinth cell setting is what makes the lamp catch; the full ten-frame then becomes the equation at (400, 387).
- [ ] At L1 every stone is numbered and the plinth is visible before the tap; at L2 only the beacons are numbered and the plinth appears in the run; at L3 the beacon reads "?" until it catches.
- [ ] The horizon count equals the tens digit at every moment, with `ART.cairn` at the road's origin on item 1 so the census has no exception.
- [ ] The worst overshoot (bound 9 from stone 9) leaves the rabbit fully on stage, right edge ≤ 682.
- [ ] Two first-bound crossings in a row bring bigger gaps; two misses in a row bring smaller ones; the decade never changes.
- [ ] The Finish screen shows ten lit beacons in a line with their crossings beneath, the family outside the house, and no score and no first-try marking.
- [ ] With `?sound=off` nothing is audible; with sound on, each stone crossed is a higher note.
