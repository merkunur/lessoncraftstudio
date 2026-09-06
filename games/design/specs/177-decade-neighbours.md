# 177 — The Hundred Road

## Identity
- Slug: `decade-neighbours`
- Subject / topic: Mathematics / the two tens either side of a two-digit number (47 lies between 40 and 50)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three or four lit stretches of the road; the pattern is now only how the finger reaches the world, per GAME-DESIGN-LAW §3)
- Frame: THE CLIMB
- Estimated build size: ~580 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14, with §7's zone A/B/C replaced by the MISSION LAYOUT (`MISSIONS.md` §1.4) and §6's progress display replaced by diegetic progress. Pattern contract: `catalogue/PATTERNS.md` P1. Frame contract: `MISSIONS.md` FRAME 14. Content is language-neutral (numerals only) — the number words of de/nl/da, which say the ones before the tens, are exactly why the visual tens-then-ones anchor matters (F-108).

**Frame fit, declared rather than assumed.** THE CLIMB is right on its isomorphism — *the answer is where you are on the measured thing* — and its catalogue entry names **place value** and P1 explicitly. It is bent on two details and both are stated so a reviewer sees them at a glance: the scale is laid **horizontal**, because the 0-100 number line is the object six of the eleven curricula name and a vertical 100-scale inside a 364 px zone gives 3.6 px per unit (unreadable) where horizontal gives 6; and **diegetic progress is not the hero's own altitude**, because the numbers arrive in mixed order so her position is not monotone — the job CLIMB usually gives to height is done here by the road filling with posts (Device 2). THE CROSSING was considered and is structurally excluded: its live set is *"the 2-4 stones immediately ahead"*, and the digit-swap distractor for 47 is the seventies, three decades away by construction. Making THE CROSSING fit would mean deleting misconception 1's distractor, which the law forbids.

## Learning
- Objective: Reads a two-digit number and taps the tile naming the two tens it lies between (47 → "40 – 50"), with a 0-100 number line as the enacted check.
- Prerequisites: Reads two-digit numerals; counts in tens to 100 (games 016-020, 041).
- Curriculum links: F-108 (place value — digits treated as independent numbers; de/nl/da inverted number words), F-103 (comparison — "nearly 50" is not "in the 50s"), F-21 (counting to 100 and the number line to 100; place value tens/ones in all 12 systems), F-31 rows "Count to 100; number line to 100" (conservative 7-8, earliest 5) and "Place value tens/ones" (conservative 7-8) → 6-8 (US 1.NBT.B.2 / 2.NBT.A.1; England Y2 "recognise the place value of each digit … identify, represent and estimate numbers using … the number line"; Germany Klasse 2 "Zahlen bis 100 im Zahlenraum verorten"; France CE1 "encadrer un nombre entre deux dizaines"; Netherlands groep 4 "tientallen"; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3; Denmark 1.-2. klasse; Norway 2. trinn; Finland grades 1-2).
- Common misconceptions (F-108, F-103), each with this game's response:
  1. **Digits as independent numbers, or the spoken order followed — 47 read from its ones digit ("siebenundvierzig": seven first) → taps 70 – 80.** Response: the road refuses (the stone will not seat); then `ART.digitHi` outlines the TENS digit "4" on the stone in her cart and **four `ART.miniRod`s fly out of it and lay themselves along the road, end to end, from the 0 stone** — each rod exactly one decade long, `tone("tap", 10)` each. The fourth rod ends **at the 40 milestone**, which lights and `ANIM.grow`s. `ART.digitHi` fades and re-forms around the ones digit "7", and **seven `ART.miniCube`s** lay themselves on from the 40 stone, `tone("tap", 1)` each, ending where `ART.socket` opens and holds. The tens are measured FIRST, left to right, along the line itself, so the **layout, not the word, is the anchor** — and seven cubes visibly do not reach anywhere near the seventies.
  2. **"Nearly 50 means in the fifties" — 49 → taps 50 – 60 (F-103 rounding confused with placing).** Response: the magnifier drawer opens under the **correct** stretch, its two guide lines fanned from that stretch's own two milestones; the tortoise steps down into it and stands on the **49 mark — one mark short of the 50 tag**, which `ANIM.pulse`s. Her own body is the evidence: she is standing *before* the stone, not past it — and the 50 milestone is simultaneously visible on the road above her, still ahead. Two drawings of "not yet 50", one saccade apart, agreeing.
  3. **Adjacent-decade slip — 47 → taps 30 – 40 (counting the tens from 1 or reading the lower neighbour as the one below the tens digit).** Response: **the milestones themselves count up** — stones 10, 20, 30, 40 light and `ANIM.grow` in turn, 250 ms apart, `tone("tap", k)` each: *the tens digit is the count of tens, and here are the tens, standing on the road.* Then the drawer opens under 40 … 50 and she stands on the 47 mark between the two decade tags.
  4. **Treating a decade as a possible answer in itself (looking for a "47" tile).** Response: **prevented rather than corrected, and declared as such.** There is no tappable numeral anywhere in the game; the only things a child can tap are spans of road *between* two milestones. A milestone is inert scenery that already carries its own ten and has no socket beside it, so a decade cannot be walked onto as an answer. The caption still reads "Between which tens?" and numbers ending in 0 never appear. By the third item the road itself is teaching it: **tens are tall stones, numbers are the little posts standing between them**, accumulating all session — a permanent physical distinction the original's twelve independent items never built.

## Mission
**Mission, as the child would say it.** *Put the numbers back on the road.*

**The hero.** The tortoise (the spec's own mascot, kept — a road, a load and a slow walker belong together), pulling a small handcart. She is agentive in the literal sense: she is the only thing on the stage that moves, she moves because the child sent her somewhere, and **where she ends up is the answer**. She never bobs, never nods a verdict, and she is never the consequence of an error — the *stone* refuses to seat, she does not.

**The want (the visible lack).** A cart full of numbered stones and a road with nothing on it. One still frame at 400 px reads the whole premise with no words: eleven tall stones standing along a road at even spacing, carrying 0, 10, 20 … 100; between them, bare road; behind the tortoise, a cart with a numbered post standing in it; at the far end past the 100 stone, three young tortoises sitting at a gate, waiting. The flood took the little number-posts and left the heavy milestones. **The lack is the gaps between the tens** — which is also, exactly, the mathematics.

**The goal.** The three young ones at the gate do not set off down the road until it has its numbers back. They are drawn from tap one, they never react to a correct answer, and they change only at the finish (Device 1, THE WAITING PARTY — a waiting party that reacts per item is an approval meter, which F-44 bans).

**The single state variable.** `S` = **the tortoise's position along the road, measured in road units 0-100.**
- **Mathematical reading.** `S` is a value on the 0-100 number line, and the quantity the item is about is `⌊S/10⌋` — which decade she is standing in. Her body is the marker; the road is the scale.
- **Physical reading.** Where she is on the road between the 0 stone and the 100 stone.

`x = 60 + 6·S` on the stage, so the two readings are the same number in two units and nothing converts between them.

**The goal predicate.** For the number `n` on the stone in her cart, the road will take that stone iff `⌊S/10⌋ === ⌊n/10⌋`. A socket for `n` exists at exactly one place on the whole road — `x = 60 + 6n` — and it is reachable only from inside `n`'s own decade. The commit, in one line:

```js
const under = Math.floor((hero.x - 60) / 60);   // the ground beneath her feet
accepted   = (under === Math.floor(n / 10));    // will the road take the stone?
```

There is **no `answer` field anywhere in the game**, and no object anywhere bearing the label "40 – 50".

**The isomorphism — where she stands IS which two tens the number lies between.** The old spec carried two states: an item (`tapped === item.answer`) and a number line used afterwards as a diagram to justify the verdict. This design deletes the first and promotes the second: **the number line is the terrain, and the child's only verb is "send her to a stretch of it."** The three tiles labelled "40 – 50", "30 – 40", "70 – 80" are gone; in their place, three (four at L3) stretches of the actual road are lit — the road between the 40 stone and the 50 stone, between the 30 and the 40, between the 70 and the 80. Those are not tiles bearing labels; they *are* those intervals, at those positions, because 6 px is one unit and 60 px is one ten. **The label cannot be moved to another object, which is precisely what a tile is and this is not.**

The child taps a lit stretch. The tortoise **walks** — a real traversal in world coordinates, never a teleport — and stops. The world then reads the ground under her feet: where there is a socket she lifts the stone out of the cart and sets it in, and it stands for the rest of the session; where the road is whole the stone rocks and will not seat, and she keeps it. Two properties make this the real thing rather than a walk bolted onto a quiz:

1. **The candidate's meaning is its position.** In THE CROSSING a stone *carries* a candidate and the label could be painted on any stone. Here the 40-50 stretch is 40-50 *because of where it is*, six pixels per unit from the 0 stone.
2. **The setting is the enacted check, not a reward for a verdict.** The old spec dropped a marker at 47 *after* the child was told they were right. Here the stone going in **is** the rightness — and it lands at x = 342, forty-two pixels past the 40 stone and eighteen short of the 50, so *"47 is between 40 and 50, and nearer 50"* is a fact about the picture the child just made.

**The honest limit, stated rather than buried.** The choice space is discrete (three or four lit stretches), so this is the thinnest the Displacement rule can be while still being true. What keeps it true is that the commit reads `hero.x` and nothing else, and the same predicate would work unchanged for a continuous walk. **The build gate must poison-test it:** displace the hero one decade (60 px) immediately before the commit and assert the item's outcome flips. If it does not, the handler is reading a stretch index and the game must be rejected.

**The mark that stays.** Every solved number becomes a numbered post standing in the road at its own true position. Nothing ever un-marks; the road only ever gains posts (the RATCHET RULE, absolutely).

## World
**Zone W (56-420) — the road, the stones, the hero, the gate. All of it, all session.** Zone H (420-560) carries no controls at all.

```
 0                                                                      720
 ┌────────────────────────────────────────────────────────────────────────┐
 │ [lang 16,16]                                              zone T 0-56  │
 ├────────────────────────────────────────────────────────────────────────┤
 │                    "Between which tens?"  (360, 96)                    │
 │   hill wash, one scene element, surface2         zone W - THE WORLD    │
 │                                                                        │
 │  ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮      milestones y 198-250   │
 │  0  10  20  30  40  50  60  70  80  90 100      numeral 15px y = 224   │
 │ ════════════════════════════════════════════════▯▯  road  y 250-330    │
 │        hero + cart      [ lit stretch ]             gate x = 690       │
 │                                                                        │
 │   ┌── magnifier drawer, y 350-412 (corrections only) ───┐              │
 │   │  40 | 41 42 43 44 45 46 47 48 49 |  50              │              │
 │   └──────────────────────────────────────────────────────┘             │
 ├────────────────────────────────────────────────────────────────────────┤
 │            ▌▌▌▌▌▌▌▌▌▌▌▌   the load rack  (360, 495)       zone H       │
 └────────────────────────────────────────────────────────────────────────┘
```

**The number line.** `x = 60 + 6·n`, so x(0) = 60 and x(100) = 660: **6 px per unit, 60 px per ten.** Every coordinate below falls out of that one formula.

**Milestones (11, inert scenery).** Standing stones at x = 60 + 60k, k = 0…10 → 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660. Each 30 × 52, base on the road's back edge at y = 250, top at y = 198, its ten carved on the face at (x, 224). They never move, they light only during a correction, and they are never tappable. **Tall stone = a ten**: this is the world's furniture and it is also the teaching object.

**The road.** A band from x = 20 to x = 700, y = 250 … 330 (80 px deep). She walks on it with her feet at y = 328.

**Lit stretches — the only interactive things besides the hero.** For the current item, three (L1/L2) or four (L3) decade panels light: x ∈ [60 + 60k, 120 + 60k], y ∈ [250, 330] → **60 × 80**, drawn brighter than the road, outlined, and standing 4 px proud of the road plane (three signals; never colour alone, per BUILD-CONVENTIONS §12). Which decades light comes straight from the item's own distractor classes.

**Hit areas, and this is an accessibility fix rather than a decoration.** A lit stretch whose neighbouring decade is *not* lit extends its hit area 30 px into the dark road on that side, so an isolated candidate catches 120 × 80. Where two lit stretches are adjacent, the boundary is their shared milestone and each is exactly 60 × 80 (≥ 56, the 6-8 floor). **A tap on dark road is inert** — she turns her head that way, nothing is recorded, nothing is scored as an attempt. A mis-tap costs a tap, never an error.

**The hero.** The tortoise, 56 px, standing on the road at her current `S`. She starts a session at x = 110 — just past the 0 stone, so her cart clears the stage edge — and **her x persists across every item** (L2 PERSISTENCE): she stays where she set the last stone.

**The cart.** 46 × 36 at (hero.x − 46, 300), and standing proud in it the item's numbered stone, 64 × 50, its numeral 34 px, centred (hero.x − 46, 286). *This is the abstract notation, riding on the object, in the same frame as the fiction at the moment of the answer* — GAME-DESIGN-LAW §2.5 satisfied by construction rather than by a card in a corner.

**The marks that stay.** Each solved number becomes a post set into the road at x = 60 + 6n: 5 wide, 24 tall, standing from y = 250 up to y = 226, with its numeral at y = 212 — or y = 194 on the alternate row when another post is within 26 px (45 and 47 are 12 px apart in the L1 pool). By item 12 the road carries twelve numbered posts at their true positions between tall stones.

**The waiting party.** A gate at x = 690 spanning y = 236 … 330, with three young tortoises (28 px) beyond it at (676, 318), (700, 318) and (688, 300); her stop is clamped to x ≤ 654 in the top decade, five pixels clear of the gate posts. Drawn from tap one. They do not react to a correct answer. They sit, unchanged, until the finish.

**The magnifier drawer (corrections only, y 350-412).** The lit decade opens downward into a strip spanning x = 60 … 660 at ×10, with two guide lines fanning from (60 + 60d, 330) and (120 + 60d, 330) down to (60, 350) and (660, 350). Inside: the two decade tags at 30 px on the ends, nine unit marks at x = 60 + 60m (m = 1…9) with 13 px numerals, and the tortoise standing on one of them. **The whole 0-100 road stays on screen above it** — which is exactly why this replaces the original's ×5.6 whole-line zoom, that hid everything else while it argued.

**Zone H — empty of controls; the road is the hand.** Every choice a child can make is a stretch of road in zone W, so there is nothing to put in zone H (as in THE CROSSING, THE ROUNDS and THE TENDING). Putting the candidates down here would immediately reintroduce the tile: an object bearing a label, at a coordinate that means nothing, which the hero then walks to — the exact shape the Displacement rule rejects. Zone H instead carries **the load rack**, a frame at (360, 495), 248 × 50, holding the stones still to be set as **blank slates** 16 × 44 with centres at x = 250 + 20i, i = 0…11. Twelve at the start; one lifts into the cart at the start of each item; the rack empties from the left. The slates are blank on purpose: showing the upcoming numerals would leak the adaptive ladder's next choice (2-up steps the level, a wrong walk steps it down, so the play list is not fixed at boot). A rack of blank slates says *"eight left"* honestly and says nothing else. It is a record, not a control.

**Interactive element count (F-69, read per §5.1):** the hero (1) + the lit stretches (≤ 4) = **5**. Milestones, set posts, the gate, the young ones, the rack and the drawer are inert scenery and count zero.

**Diegetic progress, and no dot rail during play (BUILD-CONVENTIONS §6, amended).** Two counts move in opposite directions, both readable from a photograph, neither a meter: zone H's twelve blank slates go to zero, and zone W's road goes from no posts to twelve, each at its true position between two tall stones. That is F-44's *"path filled"* verbatim. The original spec's Finish screen already drew exactly this picture — *"one 0-100 line with all twelve numbers as small markers at their positions"* — it just drew it once, at the end, as a summary. This design moves that picture from the last five seconds to the whole session.

## How it plays
1. **Start screen (never auto-starts).** `S("title")` at (360, 150) 44 px `THEME.font.display` `THEME.colour.structure`; a short piece of road at y = 300 with `ART.heroIdle` and `ART.cart` at (330, 300) and one milestone behind her; `makeButton` `t("start")` at (360, 430); the language picker at (16, 16), hidden under `?embed=1`. A 2 % breathing idle is allowed here and on the Finish screen only (ART-BIBLE §6).

2. **Item 1 (L1: 47; lit decades 4, 7, 3).** The world builds once and is never rebuilt: `ART.hillWash`, `ART.road`, eleven `ART.milestone`s with their `ART.milestoneNum`s, `ART.gate` and three `ART.young` at the far end, `ART.rack` with twelve `ART.slate`s. The hero stands at x = 110 (S ≈ 8, inside the empty first decade — nothing there to leak) with `ART.cart` behind her; the leftmost slate lifts out of the rack and becomes `ART.numberStone` with `ART.stoneNum` "47" standing in the cart. Three stretches light: x ∈ [240, 300] (the thirties), [300, 360] (the forties) and [480, 540] (the seventies). Caption `S("betweenWhich")` at (360, 96). **Nothing is animating** — zero tweens run while a target is enabled (the F-42 gate, F1).
   *The first item of a session may demonstrate itself once (F-42's own concession): the hero takes one step to the right and holds. It happens once per session, before any target is enabled.*

3. **The move.** The child taps a lit stretch (or Tabs to it and presses Enter).
   - She walks. `ANIM.walk`, duration `min(560, 200 + 0.6 × |dx|)` — a neighbouring decade is ~236 ms, the longest crossing on the board is 560 ms — with `ANIM.step` as her gait and the pose swapping `ART.heroIdle` ↔ `ART.heroWalk` every 160 ms. She stops at the point of road under the child's finger, clamped into the tapped stretch's own 60 px body (keyboard Enter sends her to its midpoint, x = 90 + 60k).
   - **At 250 ms into the walk, or on arrival if the walk is shorter, the road answers** (F-40: feedback within ~300 ms of the commit, and the walk never sits between them). Where the road can take the stone, `ART.socket` opens at x = 60 + 6n and `ANIM.pulse`s. Where it cannot, the road stays unbroken and the stone in the cart tips forward once (`ANIM.rock`) — it has nowhere to go.
   - **Accepted.** She arrives, lifts the stone with `ART.heroAct`, and `ART.post` drops into the socket (`ANIM.seat`, 400 ms, `tone("correct")`, `tone("tap", n mod 12)`) with `ART.postNum` above it and `ART.postCapSolid` on its head. It stands there for the rest of the session. Praise pop (next key in the rotation) on a first-try item only. One slate has already gone from the rack. Next item after 700 ms; **she does not move** — item *k+1* begins exactly where item *k* ended.
   - **Refused.** She arrives, sets her forelimbs on the road with `ART.heroAct`, finds it whole, and the stone stays in the cart (`tone("nudge")`, 300 ms). **Her pose does not change** and nothing is taken from her — the reviewer check on the wrong-answer screenshot passes by construction, because the refusal animation is on the stone, never on the creature. Then the world freezes and the enacted correction plays.

4. **The three enacted corrections** (every target disabled, zero taps accepted, the world frozen throughout; each runs a floor of 4.1 s of frozen argument via `hold = max(1000, 4100 − elapsed)`, so the choreography never gets shorter than the original's ≈ 4.1 s cue no matter which digits the item carries):
   - **Digit-swap (she walked into the seventies for 47).** `ART.digitHi` around the tens digit; four `ART.miniRod`s lay themselves along the road from x = 60, `ANIM.layDown` 190 ms apart, `tone("tap", 10)` each, the last ending at the 40 milestone which `ANIM.grow`s; `ART.digitHi` fades and re-forms on the ones digit; seven `ART.miniCube`s lay on from x = 300, 110 ms apart, `tone("tap", 1)` each, ending at x = 342 where `ART.socket` opens. She turns her head back along the rods. Hold, then `ANIM.fadeOut` on rods, cubes and outline; the socket stays lit for attempt 2. **4.3 s.**
   - **Nearest-ten (she walked into the fifties for 49).** `ART.drawer` opens under the correct stretch (`ANIM.openDraw`) with its two `ART.guideLine`s, nine `ART.unitMark`s with `ART.unitNum`s and two `ART.decadeTag`s; she steps down a guide line (`ANIM.climbIn`) and stands on the 49 mark; the 50 tag `ANIM.pulse`s. Hold; `ANIM.closeDraw`; she steps back up **to her exact road x**. **4.5 s.**
   - **Adjacent slip (she walked into the thirties for 47).** Milestones 10, 20, 30, 40 light and `ANIM.grow` in turn, 250 ms apart, `tone("tap", k)` each; then the drawer, and she stands on 47 between the two decade tags. Hold; close. **4.5 s.**

5. **The ladder.** Attempt 1 → the refusal and its correction, which leaves `ART.socket` lit on the road at x = 60 + 6n. Attempt 2 → the child now has to send her to the place she was shown, which is still a walk and still position-as-answer; **the wrong stretch stays lit and stays available**, and sending her back into it refuses again in exactly the same way, because the world has rules and the rules do not change to punish anyone. Attempt 3 → `ART.showRing` (`ANIM.showMe`) on the correct stretch and its two milestones glow; tapping it walks her there and the stone seats, solved-with-help, no praise pop, `ART.postCapHollow` on that post's head. No attempt 4. **Success is certain.**

6. **A full worked session.** Item 1 (47, at x = 110) taps the forties → walks 220 px in 332 ms → socket at x = 342 → post seats, she stands at ~330 · item 2 (23, lit 2/3/1) ✓ from 330 back down to ~200 → step up · item 3 (L2: 49, lit 4/9/5) she walks into the fifties ✗ → the drawer, 49 one mark short of the pulsing 50 → sent to the forties ✓, and the post lands 6 px from the 50 stone → step down · item 4 (L1: 65) ✓ · item 5 (34) ✓ → step up · item 6 (L2: 81, lit 8/1/7) she walks into the tens ✗ → eight rods and one cube → ✓ · item 7 (L2: 38) ✓ · item 8 (L2: 63) ✓ → step up · items 9-12 (L3, four lit, the middle milestones turned away) ✓ ✓ (76: into the sixties ✗ → the milestone count-up, then the drawer) ✓ ✓ → twelve posts standing → Finish.

7. **Finish.** The Finish scene **is the play scene at the play coordinates** — nothing is re-laid out. On the twelfth post seating she walks the rest of the road to the gate (≤ 1200 ms), `ART.gate` opens (`ANIM.gateSwing`), and **the three young tortoises walk down the road from the 100 stone to the 0 stone**, passing every post the child set, high numbers first (`ANIM.procession`, ~4 s) while she stands at the gate end and lets them go by. It is the only long tween in the game and it is the payoff: *the road the child marked, being walked.* `t("all_done")` at (360, 96); `ART.heroHappy` with `ANIM.celebrate`; the rack in zone H is empty; `makeButton` `t("play_again")` at (250, 520) and `t("menu")` at (470, 520); `GameCore.tone("finish")` once; `GameCore.reportHeight()`. The first-try record is kept warm, not scored: a first-try post wears `ART.postCapSolid`, a helped post `ART.postCapHollow` — a shape difference, never a colour one — plus the optional `t("question_x_of_y")` with n = first-try items at (360, 448). No stars, no badges, no total.

Session ≈ 5-6 minutes. Total ACT time ≈ 30 s (twelve moves at ≤ 0.96 s, about four corrections at ≤ 4.5 s, one 4 s procession), inside the 60 s budget of `MISSIONS.md` §8.3 R1.

## Art registry
```js
const ART = {
  heroIdle:     { kind: "svg", value: LCSArt.get("tortoise.idle"),  size: 56, fallback: "🐢" },
  heroWalk:     { kind: "svg", value: LCSArt.get("tortoise.walk"),  size: 56, fallback: "🐢" },   // legs extended, head forward
  heroAct:      { kind: "svg", value: LCSArt.get("tortoise.act"),   size: 56, fallback: "🐢" },   // leaning, both forelimbs on the road
  heroHappy:    { kind: "svg", value: LCSArt.get("tortoise.happy"), size: 56, fallback: "🐢" },   // Finish screen only
  young:        { kind: "svg", value: LCSArt.get("tortoise.young"), size: 28, fallback: "🐢" },
  cart:         { kind: "svg", value: LCSArt.get("handcart"),       size: 46, fallback: "🛒" },   // two wheels, open bed, shafts to the hero
  hillWash:     { kind: "shape", shape: "ellipse", w: 760, h: 190, fill: "surface2" },
  road:         { kind: "shape", shape: "rect", w: 680, h: 80, fill: "surface2" },
  roadEdge:     { kind: "shape", shape: "rect", w: 680, h: 3, fill: "line" },
  milestone:    { kind: "shape", shape: "roundRect", w: 30, h: 52, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 6 },
  milestoneNum: { kind: "text",  value: "", size: 15, font: "display", color: "structure" },
  stretchLit:   { kind: "shape", shape: "rect", w: 60, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3 },
  numberStone:  { kind: "shape", shape: "roundRect", w: 64, h: 50, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },
  stoneNum:     { kind: "text",  value: "", size: 34, font: "display", color: "ink" },
  socket:       { kind: "shape", shape: "rect", w: 9, h: 10, fill: "accent" },                     // the opening in the road, at x = 60 + 6n
  post:         { kind: "shape", shape: "rect", w: 5, h: 24, fill: "structure" },
  postCapSolid: { kind: "shape", shape: "rect", w: 11, h: 5, fill: "structure" },                  // first-try
  postCapHollow:{ kind: "shape", shape: "rect", w: 11, h: 5, stroke: "structure", strokeWidth: 2 },// solved-with-help
  postNum:      { kind: "text",  value: "", size: 11, font: "display", color: "inkSoft" },
  gate:         { kind: "shape", shape: "roundRect", w: 26, h: 94, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  drawer:       { kind: "shape", shape: "roundRect", w: 640, h: 62, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  guideLine:    { kind: "shape", shape: "line", points: [[0,0],[0,0]], stroke: "line", strokeWidth: 2 },  // endpoints set by the game
  unitMark:     { kind: "shape", shape: "rect", w: 2, h: 14, fill: "inkSoft" },
  unitNum:      { kind: "text",  value: "", size: 13, font: "display", color: "inkSoft" },
  decadeTag:    { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  miniRod:      { kind: "shape", shape: "rect", w: 60, h: 9, fill: "structure", stroke: "bg", strokeWidth: 1 },   // ONE TEN, laid along the road
  miniCube:     { kind: "shape", shape: "rect", w: 6, h: 9, fill: "inkSoft", stroke: "bg", strokeWidth: 1 },      // ONE, laid along the road
  digitHi:      { kind: "shape", shape: "roundRect", w: 26, h: 44, stroke: "accent", strokeWidth: 3, radius: 6 },
  showRing:     { kind: "shape", shape: "roundRect", w: 66, h: 86, stroke: "structure", strokeWidth: 4, radius: 10 },
  rack:         { kind: "shape", shape: "roundRect", w: 248, h: 50, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },
  slate:        { kind: "shape", shape: "rect", w: 16, h: 44, fill: "surface", stroke: "line", strokeWidth: 2 }
};
```
No emoji newer than Unicode 12, and every emoji here is the declared platform fallback of an svg entry (BUILD-CONVENTIONS §4). The tortoise's shell is a `structureSoft` tint and her skin a `surface2` tint, so no character carries teal (which already means *set / chosen / correct*) and the ART-BIBLE §10.1 warm-body clause does not apply. **Exactly two entries use `accent` — `ART.socket` and `ART.digitHi` — and they are never on screen at the same moment** (the outline fades before the socket opens): one warm highlight per screen, per ART-BIBLE §2. A rod is ten times a cube in length and differs in fill; the lit stretch is brighter *and* outlined *and* raised; nothing is carried by colour alone.

## Animation registry
```js
const ANIM = {
  walk:       { duration: 560, ease: "Sine.InOut", trigger: "the hero travels to the tapped point; the game sets x and duration = min(560, 200 + 0.6 × |dx|)" },
  step:       { y: "-=4", duration: 130, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "her gait, running ONLY while ANIM.walk runs; killed on arrival" },
  seat:       { alpha: 1, scale: 1, duration: 400, ease: "Back.Out", trigger: "a post drops into its socket from 22 px above (from alpha 0, scale 0.6) and stays for the session" },
  rock:       { angle: 9, duration: 250, ease: "Sine.InOut", yoyo: true, trigger: "the number stone tilts once in the cart and comes back up — the road refusing; nothing on the hero changes" },
  grow:       { scale: 1.6, duration: 220, ease: "Back.Out", yoyo: true, trigger: "each milestone in the count-up, 250 ms apart; the milestone a rod's end reaches" },
  layDown:    { alpha: 1, duration: 190, ease: "Sine.Out", trigger: "each ART.miniRod (190 ms apart) / ART.miniCube (110 ms apart) laying itself along the road from the previous one's end; the game sets x" },
  openDraw:   { alpha: 1, scaleY: 1, duration: 400, ease: "Back.Out", trigger: "the magnifier unfolding downward from the lit stretch (from scaleY 0.1, alpha 0)" },
  closeDraw:  { alpha: 0, scaleY: 0.1, duration: 400, ease: "Sine.In", trigger: "the magnifier folding back up" },
  climbIn:    { duration: 500, ease: "Sine.InOut", trigger: "the hero steps down a guide line into the magnifier and back up when it closes; the game sets x and y and restores her road x exactly" },
  pulse:      { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the decade tag the child overshot; the socket when it opens" },
  turnFace:   { scaleX: 1, duration: 300, ease: "Back.Out", trigger: "an L3 milestone turning its carved face to the road (from scaleX 0.15); once faced it stays faced for the session" },
  fadeOut:    { alpha: 0, duration: 200, ease: "Sine.In", trigger: "rods, cubes, ART.digitHi and the magnifier's contents clearing" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ART.showRing on the correct stretch at attempt 3 (from alpha 0.2)" },
  gateSwing:  { angle: -80, duration: 500, ease: "Sine.InOut", trigger: "the gate opening, Finish only" },
  procession: { duration: 4000, ease: "Sine.InOut", trigger: "the three young tortoises walking from the gate to the 0 stone, Finish only; the game sets x" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the hero on the Finish screen, after the procession" }
};
```
Motion is a consequence, never a companion: the only tweens in the Play scene are a traversal, a refusal, a correction or a seat, and every one of them is caused by a tap. Nothing bobs, drifts or breathes while a stretch is enabled — `assert scene.tweens.getTweens().length === 0 whenever targets.some(t => t.enabled)`.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │             "Between which tens?"   (360, 96)                │
      │        hill wash (360, 190) — one scene element              │
      │  ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮   ▮  tops y = 198     │  zone W
      │  0  10  20  30  40  50  60  70  80  90 100  faces y = 224    │  56-420
      │ ══════════════════════════════════════════════▯▯  y 250-330  │
      │      hero + cart       [ lit 300-360 ]        gate x = 690   │
      │   ┌── magnifier 350-412 (corrections only) ──────┐           │
      │   │  40 | 41 42 43 44 45 46 47 48 49 | 50        │           │
      │   └──────────────────────────────────────────────┘           │
420   ├──────────────────────────────────────────────────────────────┤
      │        ▌▌▌▌▌▌▌▌▌▌▌▌  the load rack (360, 495)                │  zone H
560   └──────────────────────────────────────────────────────────────┘
```
Fixed 720 × 560, `Scale.FIT`, no scrolling, no camera movement, zero navigation screens (Boot / Play / Finish only). The hero and the goal are both inside zone W at every moment of the session, and the goal's coordinates never change. Progress is diegetic — the road filling with posts and the load rack emptying — and there is no abstract progress meter of any kind on the play surface; the first-try record appears only on the Finish screen, as the shape of each post's head.

## Visual specification
- Background `THEME.colour.bg`. `ART.hillWash` centred (360, 190) as the single scene element, low contrast, behind everything, never animated.
- `ART.road` centred (360, 290) spanning x = 20 … 700, y = 250 … 330; `ART.roadEdge` along its back edge at y = 250 and again at y = 330.
- Eleven `ART.milestone`s at x = 60 + 60k (k = 0…10), each with its base at y = 250 and top at y = 198, carrying `ART.milestoneNum` ("0", "10" … "100") at (x, 224), 15 px `THEME.font.display` `THEME.colour.structure`. At L3 only the 0 and 100 stones show a face; the nine between are turned away (`scaleX` 0.15, numeral hidden) and turn back one at a time under `ANIM.turnFace` when a correction needs them — and stay faced for the rest of the session.
- Lit stretches: `ART.stretchLit` at (90 + 60k, 290), 60 × 80, drawn 4 px above the road plane so its top edge steps proud of `ART.roadEdge`; `GameCore.makeTile` carries the hit area, widened to 120 × 80 on any side whose neighbouring decade is unlit. Tap floor 60 × 80 (≥ 56 for the 6-8 band); the gap between two adjacent lit stretches is their shared milestone, 30 px wide.
- The hero: `ART.heroIdle` at (hero.x, 300), feet at y = 328, swapping to `ART.heroWalk` while travelling and `ART.heroAct` when she reaches for the stone; `ART.heroHappy` on the Finish screen only. One soft `ink` 8 %-alpha ellipse under her, 44 × 10 at (hero.x, 330). She never carries a reaction to the child's error.
- `ART.cart` at (hero.x − 46, 300) with `ART.numberStone` standing in it, centred (hero.x − 46, 286), carrying `ART.stoneNum` at 34 px `THEME.font.display` `THEME.colour.ink`; `ART.digitHi` sits around the tens digit at (hero.x − 61, 286) or the ones digit at (hero.x − 31, 286).
- Set posts: `ART.post` at (60 + 6n, 238) standing from y = 250 to y = 226, `ART.postCapSolid` or `ART.postCapHollow` at (60 + 6n, 226), `ART.postNum` at (60 + 6n, 212) — or (60 + 6n, 194) when a numbered post already stands within 26 px. `ART.socket` sits at (60 + 6n, 254), the only coral on the play surface.
- `ART.gate` at (690, 283) spanning y = 236 … 330; three `ART.young` drawn behind it at (676, 318), (700, 318) and (688, 300), unchanged from the first tap until the procession.
- Magnifier: `ART.drawer` at (360, 381) spanning x = 40 … 680, y = 350 … 412; two `ART.guideLine`s from (60 + 60d, 330) and (120 + 60d, 330) to (60, 350) and (660, 350); `ART.decadeTag`s at (60, 381) and (660, 381) at 30 px; nine `ART.unitMark`s at (60 + 60m, 388) with `ART.unitNum`s at (60 + 60m, 404); the hero at 40 % scale standing on the mark for `n`. Present only during a correction; never tappable.
- Correction art: `ART.miniRod`s laid end to end from (60, 295) in 60 px steps, `ART.miniCube`s in 6 px steps from the last rod's end; `ART.showRing` behind the correct stretch at (90 + 60k, 290).
- Zone H: `ART.rack` at (360, 495), 248 × 50; twelve `ART.slate`s at (250 + 20i, 495), 16 × 44, blank; they are drawn, never tappable, and the leftmost remaining one lifts out at the start of each item.
- Caption `S("betweenWhich")` at (360, 96), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, max 2 lines. That plus a two-word praise pop is the entire text budget of the play screen: **three words standing, five at most** (F-42's 6-8 allowance is eight including the premise, and the premise here is carried entirely by the picture).
- Tab order: the lit stretches left to right, then Enter. Arrow keys move between them; Enter sends her to the midpoint of the focused stretch. Focus ring `THEME.colour.focus`, drawn by the library.
- While a correction plays, every stretch is `setEnabled(false)` and the frozen world holds for 4.3-4.5 s.

## Content
Language-neutral (numerals only; one caption string). Each item = (the number `n`; the correct decade `d = ⌊n/10⌋`; the distractor decades that light beside it). Distractor classes are unchanged: **swap** = the decade the digit-swapped number lies in; **adjacent** = the decade below or above; **nearest** = the decade the number would round into (for a ones digit of 9 the decade above; for 1 the decade below). Numbers ending in 0 never appear — a ten is not between two tens, and on this board that is visible rather than stipulated.

- **L1** (ones digit 2-8; three lit decades — correct, swap, adjacent): 47 (4; 7, 3) · 23 (2; 3, 1) · 65 (6; 5, 7) · 34 (3; 4, 2) · 56 (5; 6, 4) · 28 (2; 8, 3) · 72 (7; 2, 6) · 45 (4; 5, 3)
- **L2** (ones digits 1 and 9 included; three lit — correct, swap, nearest or adjacent): 41 (4; 1, 3) · 49 (4; 9, 5) · 38 (3; 8, 4) · 81 (8; 1, 7) · 19 (1; 9, 2) · 63 (6; 3, 5) · 92 (9; 2, 8) · 17 (1; 7, 2)
- **L3** (four lit — correct, swap, nearest, adjacent; the middle nine milestones turned away until a correction needs them): 59 (5; 9, 6, 4) · 21 (2; 1, 0, 3 — the swap and the nearest coincide, so 0 fills the fourth) · 68 (6; 8, 7, 5) · 91 (9; 1, 8, 0) · 39 (3; 9, 4, 2) · 84 (8; 4, 9, 7) · 11 (1; 0, 2, 9 — 11 is its own swap, so 9 fills the fourth) · 76 (7; 6, 8, 2)

Play list of 12 per Rules (shuffle within level, levels in order, no item repeats). Two content constraints replace the tile shuffle, and both are constraints on the LIST, never on the layout: **no decade is the correct answer more than twice in one session**, and **the correct stretch is never the same ordinal within the lit set on two consecutive items** (the fixed-world form of BUILD-CONVENTIONS §13). The builder rejects and re-draws a play list that violates either.

The hero starts every session at x = 110 and her position carries between items; an item is an **event**, not a location, so a re-queued item (F-41) is a new stone in her cart wherever she happens to be standing, never a teleport back.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → the next item comes from the next level up (cap L3).
- Adaptation: a wrong walk, or wrong first-try on 2 consecutive items → the next item comes from one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: at 250 ms into the walk `ART.socket` opens ahead of her at x = 60 + 6n and `ANIM.pulse`s; on arrival she lifts the stone (`ART.heroAct`) and `ART.post` seats (`ANIM.seat`, `tone("correct")`, `tone("tap", n mod 12)`), keeping its numeral and its cap for the rest of the session; a praise key from the rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] pops on first-try items only; one slate has left the rack; the next item starts after 700 ms with the hero exactly where she stopped.
- What happens on a wrong answer: at 250 ms the road stays unbroken and the stone tips once in the cart (`ANIM.rock`, `tone("nudge")`); on arrival she sets her forelimbs on the whole road and the stone stays in the cart. **Nothing is dropped, taken, removed or reversed, and her pose does not change.** Then the world freezes for the enacted correction of that error class — digit-swap, nearest-ten, or adjacent slip — each running a floor of 4.1 s via `hold = max(1000, 4100 − elapsed)`, total 4.3-4.5 s, unskippable, every target disabled.
- Retry behaviour: attempt 1 → the refusal plus its correction, which leaves the socket lit on the road → attempt 2 from wherever she now stands (a wrong choice costs a longer walk, never a lost thing; the wrong stretch stays lit and will refuse again identically) → attempt 3 with `ART.showRing` on the correct stretch and its two milestones glowing; tapping it completes the item as solved-with-help, its post capped hollow, no praise pop. No attempt 4.
- Finish condition: 12 posts standing on the road. No clock, no score, no lose state, no way for a session to end other than by finishing. A tap on dark road is inert and is never counted as an attempt.
- **Anti-brute-force guard, by name: THE LIT SET MOVES, THE ROAD NEVER DOES.** P1's tile re-shuffle is impossible here — a milestone that jumped when you walked at it would destroy the constancy that makes this a place — so the sanctioned replacement (F-65, `MISSIONS.md` §6) has four clauses. (1) **The candidate SET varies; the positions never do.** Every decade is where the mathematics puts it, all session; what changes per item is which decades are lit, drawn from that item's own distractor classes, so "tap the leftmost lit one" is not a strategy because the lit set moves under it — enforced by the two content constraints above. (2) **Commitment is a one-way door.** She walks and she stays walked; attempt 2 starts from a worse place, which is what a wrong turn on a road is. (3) **An item solved after any wrong move is never first-try.** (4) **A wrong walk is paid for in full, unskippable, enacted instruction** — 4.3-4.5 s of frozen world, longer than the original's cue, so guessing is slower than thinking and returns the teaching every time. A uniform random tapper on the lit set is first-try on 1/3 of L1-L2 items and 1/4 of L3, so it reaches the show-me ladder on the large majority (F-65), and it cannot generate a wrong answer by flailing because dark road is inert. **Stated honestly: with three lit stretches a determined child can still exhaust them in three taps, exactly as in the original; no P1 game in the corpus defeats that, and what the contract requires is a named guard that does not move the world.**
- Deletion tests (GAME-DESIGN-LAW §2.2). **A — delete the maths:** with no tens on the milestones, no numeral on the stone and a socket everywhere, she walks wherever she is sent and every stone seats; there is no criterion, so no choice, so nothing to do. **B — delete the mission:** removing the hero, the cart, the road, the milestones and the gate removes **the input surface itself** — the candidates *are* the road — and `commit()` dereferences `hero.x` with no other path to a decision, so the game cannot complete an item. **C — delete the walking:** patch every traversal to `duration: 0` and the item log is byte-identical, because the answer is where she ends up and nothing is gated on elapsed motion. *An earlier version of this design failed test C and was cut: the refusal was an exhaustive search — she walked the whole wrong decade, 71 … 79 passing under her feet, and 47 was not among them. Beautiful, and at `duration: 0` the argument evaporates, which is exactly the seductive-detail-with-an-excuse the test exists to catch. The shipped refusal is instantaneous and the argument sits in the frozen correction, where its duration is measured and protected.*

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`const STRINGS`, read through `S(key)`, all 11 locales at build time per BUILD-CONVENTIONS §17): `title` = "The Hundred Road"; `betweenWhich` = "Between which tens?".
- Every number on the board is a numeral, so the road, the stones, the posts and the magnifier are identical in all 11 languages; only the caption, the title and the chrome are translated. The premise is carried entirely by the picture — a cart of numbered stones, a bare road, a family waiting at a gate — and buys itself no words.

## Sound
`tone("tap", 10)` per `ART.miniRod` and `tone("tap", 1)` per `ART.miniCube` in the digit correction, so a ten audibly steps further than a one; `tone("tap", k)` per milestone in the count-up, k = 1…d, so the tens climb; `tone("tap", n mod 12)` as a post seats; `tone("correct")` on a seat, `tone("nudge")` on a refusal, `tone("finish")` once. Silent under `?sound=off`, and nothing in the game depends on hearing it — every count is also laid out along the road. Nothing is spoken: no number words in any language, which is the point of a game whose subject is the mismatch between the word and the layout (F-108).

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, praise, the caption translated; every numeral on the road identical in all of them).
- [ ] Works at narrow width (400-px iframe: the whole 0-100 road with eleven faced milestones, four lit stretches at L3, the cart's numeral and the magnifier all legible and separate).
- [ ] Keyboard operable (Tab and arrows move between the lit stretches, Enter sends her to the focused one; the focus ring is visible on the road).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong walk never ends the session; the show-me always completes the item; a tap on dark road records nothing).
- [ ] **Mission.** The hero's x changes on at least 11 of the 12 items; the gate and the three young ones are drawn from the first tap at constant coordinates and do not react to a correct answer; item *k+1* starts at exactly the x item *k* ended at.
- [ ] **Ratchet.** Driving a full session with a wrong answer on every item: no post is ever removed, no numeral cleared, no milestone un-faced, the hero never moves backward against her own history, and the count of standing posts is monotone non-decreasing.
- [ ] **Instant-cut (deletion test C).** With every traversal patched to `duration: 0`, the item log is byte-identical to the normal run — same items, same outcomes, same first-try record, same twelve posts at the same x.
- [ ] **Displacement poison test.** Displacing the hero one decade (60 px) immediately before `commit()` flips the item's outcome. If it does not, the handler is reading a stretch index and the build is rejected.
- [ ] **Freeze (F-42).** At every decision point of a full session, if any target is enabled the running tween count is zero — no idle bob, no ambient scenery, no gait between moves.
- [ ] Walking into the seventies for 47 outlines the 4, lays four rods from the 0 stone to the 40 stone, then seven cubes to the socket; the correction runs at least 4.1 s with every target disabled and cannot be tapped through.
- [ ] Walking into the fifties for 49 opens the magnifier under 40 … 50 with her standing one mark before the pulsing 50, and the 0-100 road stays fully visible above it.
- [ ] Walking into the thirties for 47 counts the milestones 10, 20, 30, 40 before the magnifier opens.
- [ ] A correct walk seats a post at exactly x = 60 + 6n and it is still standing, with its numeral, at the finish.
- [ ] No two set-post numerals overlap, at every level path, across a full session (45 and 47 are 12 px apart; the alternate row must engage).
- [ ] Two first-try corrects in a row bring numbers ending in 1 or 9, then four lit stretches with the middle milestones turned away; a wrong walk brings simpler items next.
- [ ] The finish screen is the play scene at the play coordinates: twelve posts, each inside its own decade, the rack empty, the three young ones past the gate. Asserted as properties, never as a pixel match.
- [ ] With `?sound=off` nothing is audible; with sound on, a rod sounds a bigger step than a cube.
- [ ] Total ACT time for a full session is under 60 s, and no single move exceeds 1200 ms.

### Honest limits and named risks
**R1 — the tap target regresses against the original, and this is the sharpest cost of the design.** Ten decades across a 600 px line is 60 logical px each: at the 6-8 floor of 56, but ~33 CSS px in a 400 px iframe, against the original's 150 × 90 tiles. Mitigations are designed in rather than asserted — the hit area is 60 × 80 and extends 30 px into unlit road on any side with no lit neighbour; a tap on dark road is inert, so the failure mode is a wasted tap and never a wrong answer; full keyboard operation. **The worst case is four consecutive lit decades — L3 items 21 (decades 0, 1, 2, 3) and 11 (0, 1, 2 plus 9) — where every extension is suppressed and every target is exactly 60 px. Measure that on a real phone before ship; do not infer it.**

**R2 — the magnifier is a second drawing of the same road**, and it is the closest thing here to split attention (F-42). It is one saccade below, physically attached by two guide lines to the stretch it magnifies, present only during corrections, and the 0-100 road stays fully on screen above it — which the original's whole-line zoom did not. A net improvement on what it replaces, and still the part a visual critic should attack first.

**R3 — the build is bigger than the original's ~420 lines.** The road with its persistent post register, the magnifier with its fan geometry, the two-row numeral collision rule and the procession put it at ~580. Nothing is complex; the estimate is corrected rather than quietly overrun.

**R4 — redundancy with 020 `hundred-square-trail` must be re-checked against the transformed design**, per GAME-DESIGN-LAW §7, since both now have an animal moving along a persistent 0-100 structure. The discriminator I believe holds: 020 is a **2-D grid** (P6, build-on-a-grid; the trail is the thing built; the operation is ±1 / ±10 from a lit cell), this is a **1-D proportional line** (P1; the answer is which interval contains a number). `check-redundancy.js` decides, not the spec.

**R5 — the waiting party is one bad tween from being an approval meter.** The three young ones must not react to a correct answer, not once, not a nod. It is the single easiest thing in this design to "improve" into an F-44 violation.

**R6 — the premise is carried entirely by a picture**, because the text budget is three words. A cart of numbered stones plus a bare road plus a family at a gate should read as *"put those on there"* to a six-year-old, but that is a design judgement and not a measurement — and this repo's history on exactly that point says to put it in front of a child before believing it.
