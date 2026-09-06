# 131 — Compare Two-Digit

## Identity
- Slug: `compare-two-digit`
- Frame: THE CLIMB
- Subject / topic: Mathematics / comparing two two-digit numbers with > < = (tens first, then ones)
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (a three-position stepper). Under `GAME-DESIGN-LAW.md` the pattern is now only *how the finger reaches the world*: the stepper walks the badger between the three sockets cut in the step it is standing on, and where the badger stands **is** the comparison.
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§17, with §7 replaced by the Mission Layout (`MISSIONS.md` §1.4) and §6's dot record moved to the Finish screen only. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form). Frame contract: `MISSIONS.md` FRAME 14 — THE CLIMB. Content is language-neutral (numerals, rods, cubes, symbols); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Sets the comparison symbol (> < =) between two two-digit numbers by comparing the tens first and the ones only when the tens are equal, and checks it.
- Prerequisites: Reads two-digit numerals to 99; knows a rod is ten ones (games 016-019); has compared single-digit sets (game 013).
- Curriculum links: F-1 (compare/order numbers in 9 of 15 sources), F-21 ("comparing/ordering quantities" and "place value tens/ones" in all twelve systems), F-108, F-31 row "Place value tens/ones (teens)" — conservative 7-8 → 6-8 (US 1.NBT.B.3 "compare two two-digit numbers based on meanings of the tens and ones digits, recording the results with > = <"; England Y2 "compare and order numbers from 0 up to 100; use < > and = signs"; Germany Klasse 2 "Zahlen bis 100 vergleichen"; France CE1 "comparer, ranger des nombres < 100"; Netherlands groep 4 "getallen tot 100 vergelijken"; Spain 1º ciclo "comparación de números"; Brazil EF02MA01; Sweden åk 1-3 "naturliga tal … jämföra"; Finland grades 1-2 "lukujen vertailu").
- Common misconceptions (F-103, F-108), each with this game's response:
  1. **Comparing the ones digit (or the bigger single digit) instead of the tens: 39 > 51 "because 9 is more than 1".** Response: the stone has already told the truth before a word is read — it settled sloping, and its low end is the 51 basket. Then the enactment: the cubes in BOTH baskets sink to the basket floor and fade to alpha 0.25 (`ANIM.fadeCubes`), and the rods climb out and lie down in two stacks of flat bars beside the numbers (`ANIM.rodsAlign` — left stack at x = 290, right at x = 430, based at y = 300, one bar every 14 px going up), each stack badged with its tens value (`ART.tensBadge` "30" / "50"); the taller stack pulses (`ANIM.pulse`). The tens are compared FIRST, visibly, and they agree with the way the stone is already leaning — weight and tens say the same thing in front of the child before a single numeral is read.
  2. **Reading the number as digits (reversed: 36 read as 63 — F-108, and de/nl/da spoken order "sechsunddreißig").** Response: every basket carries its numeral on a slate tag AND its rods and cubes, at every level, so the size of the number is readable from the load without reading the numeral; every enactment moves the stones, never the digits; and the stone's own behaviour is driven by the load, so a child who mis-reads the numeral still sees which end came down.
  3. **Same tens, choosing by the number's look ("52 = 57 — they start the same").** Response: when the two rod stacks come out equal, `ART.equalBars` is drawn between them for 600 ms with both badges reading "50"; then the rods fade (`ANIM.fadeRods`) and the cubes hop out into two rows (`ANIM.cubesAlign` — row A along y = 320, row B along y = 352, both from x = 300, pitch 20) with `ART.pairLine` drawn between every matched pair; the unmatched cubes pulse and `ART.onesBadge` shows "2" and "7". Equality is only true when every cube pairs — which is also why an equal-tens stone hung dead level and then rocked off a slate set at an end.
  4. **Bigger-looking = more: a number drawn with more cubes (48: 4 rods + 8 cubes = 12 blocks) taken as more than 61 (6 rods + 1 cube = 7 blocks).** Response: the rod carries nine grooves cut across it, so a child does not have to take on authority that it is ten cubes — and the basket holding MORE stones visibly weighs LESS, because the stone leaned toward the six long ones. L2 and L3 keep the deliberate pairings of a many-cube number against a fewer-cube, more-rod number; the tens-first enactment (rods only) answers it.
  5. **Mouth direction confused (the symbol read as an arrow).** Response: the glyph is cut into the slate the badger carries, it re-cuts itself as the badger steps between sockets (`ANIM.glyphCut`), and the badger plants it under the end that comes down — so the open end of the symbol is welded to a physical fact the child causes and watches, never to a story about an animal's appetite. **Flagged (`GAME-DESIGN-LAW.md` §3.0): this is a re-authored response, not the old one re-staged.** The crocodile-eats-the-bigger-number mnemonic has no honest home on a cliff — as decoration it fails Deletion 2, as a threat it is a losing state in costume. The replacement anchors the same error to weight rather than appetite, and the finished stair leaves ten planted glyphs standing on the side they belonged to. The loss is real and should be weighed before build: a class already taught the crocodile chant loses the hook they know.

## Mission

**Mission (as the child would say it).** *Build the steps up to them.*

**Hero.** A badger. Its two young are sitting outside the burrow on a ledge at the top of the cliff; the path up fell away in a rockfall. It is never a spectator: it walks the step it is standing on, holds a slate up under the hanging stone, lets the rope go, and climbs onto each slab it has steadied. It carries a bundle of slates on its back — the visible reason it is there. Drawn ~30 px in the reaching pose it holds all through play, ~36 px standing (start screen, base platform, ledge).

**The want, legible in one still frame at 400 px.** A badger low on a broken cliff with rubble under it; two young badgers sitting motionless by a burrow mouth at the top right; and between them a bare rock face with one stone slab hanging on a rope and a stair that is not built yet. The lack is the missing stair. The waiting party (`MISSIONS.md` Device 1) is drawn from tap one at fixed coordinates and changes only at Finish.

**Goal (the predicate on `S`).** The badger's feet are on the ledge floor, y = 110, which happens exactly when ten slabs have been steadied.

**The single state variable `S`.** *The badger's standing position among the three sockets cut in the step it is on* — left x = 270, centre x = 360, right x = 450 — which is also where its slate is held, under the slab hanging above.

- **Mathematical reading.** The relation between the left number L and the right number R. Left socket = ">" (L bigger) · centre = "=" · right socket = "<" (R bigger).
- **Physical reading.** Which end of the hanging slab is propped, and therefore whether the slab will come to rest level when the rope is let go.

**There is no stored `answer` field anywhere.** The commit computes `restsLevel` from the basket contents by the rule being taught:

```js
function heavierEnd(L, R) {                 // derived, never looked up
  var lt = Math.floor(L / 10), rt = Math.floor(R / 10);
  if (lt !== rt) return lt > rt ? "left" : "right";     // tens first
  var lo = L % 10, ro = R % 10;
  if (lo !== ro) return lo > ro ? "left" : "right";     // ones only when the tens tie
  return "balanced";
}
function restsLevel(socket, L, R) {         // socket = nearestSocket(hero.x)
  var h = heavierEnd(L, R);
  return h === "balanced" ? socket === "centre" : socket === h;
}
```

**The isomorphism.** The rods and cubes ARE the ballast, and a rod is visibly ten cubes — nine grooves cut across it. So the heavier basket IS the bigger number by construction, not by convention. That is the crux, and it is what lets the apparatus teach place value physically: 48's twelve stones are LIGHTER than 61's seven, because six long stones outweigh four, and the child can see on the stone itself why.

Walking to the socket under the end that will come down IS deciding which number is bigger. The commit handler reads `hero.x` → `nearestSocket(hero.x)`; the world's question is *does the slab come to rest level*, never *did the child pick the right symbol*. Nothing is selected and then walked to: the badger's body at a socket is the entire state, visible in the frozen frame, changed by stepping, committed by letting the rope go. `answer = f(character.position)` — the Displacement rule, satisfied literally.

Three cases, all strictly mechanical, no special-casing:

| baskets | slate at | what the stone does |
|---|---|---|
| unequal | the heavy end | comes down onto the slate and rests **LEVEL** — climbable |
| unequal | the light end, or the centre | the heavy end keeps turning about the peg (a prop AT the pivot cannot stop rotation ABOUT the pivot) and it rests **SLOPING** on the course below |
| equal | the centre, against the peg | the rocking is wedged and it rests **LEVEL** |
| equal | an end | nothing is against the peg; it rocks off the slate and **KEEPS SWINGING** |

**The abstract notation is integrated, not concealed** (`GAME-DESIGN-LAW.md` §2.5). It is not a card in a control strip: the badger CARRIES it. The slate is 56 × 44 with the glyph cut into it at 34 px, and the glyph re-cuts itself as the badger steps — ">" at the left socket, "=" at the centre, "<" at the right — so the glyph's open end is always over the side the badger is bracing, which is always the side that comes down, which is always the bigger number. The child plants the symbol under the heavier number with its own paws, one saccade from both baskets and from the numerals on their tags.

**The mark that stays.** The step itself, and the slate bedded into its course. Nothing ever un-builds.

## World

Mission Layout per `MISSIONS.md` §1.4. Fixed 720 × 560, `Scale.FIT`, no scrolling, static camera, zero camera tweens between item-start and commit.

**zone T (0-56) — chrome only.** The language picker at (16, 16), hidden under `?embed=1`. Nothing else. No progress display of any kind.

**zone W (56-420) — THE WORLD.** One frame, everything in it, always.

The vertical spine, and every other number in the spec derives from it:

```
Y(k) = 390 - 28k     the standing line: the top face of the highest laid step after k items
                     Y(0) = 390  the base platform      Y(10) = 110  the ledge floor
S(k) = Y(k) - 72     the centre of the slab hanging for item k+1  (318 - 28k)
```

- **DESTINATION (fixed all session).** `ART.ledge` 220 × 12 centred (360, 116), top face y = 110, x 250-470. `ART.burrow` 56 × 46 centred (430, 88), standing on it at the top right. Two young badgers `ART.cub` 34 px, seated, at (300, 94) and (344, 96) — motionless, unchanged until Finish. Their (x, y) never moves; only arrival changes them.
- **THE STAIR (the mark that stays).** `ART.platform` 300 × 30 centred (360, 405) is the intact base ledge. Step k (k = 1..10) is `ART.step` 260 × 12 centred (360, Y(k) + 6), x 230-490. The course gap between step k's top face and step k+1's underside is 28 − 12 = **16 px**, and that gap holds `ART.mark` 46 × 16 at (socketX, Y(k) − 8) with `ART.markGlyph` at 14 px — the bedded slate. By Finish the stair is ten courses with ten planted slates at three distinguishable offsets: the session's comparisons, in place, in the same code the game taught.
- **THE RUBBLE.** `ART.rubble` 340 × 44 centred (360, 398), heaped in front of the platform — the fallen path, the reason the stair is being built. Inert.
- **THE HANGING SLAB (the apparatus, item k+1).** `ART.slab` 260 × 12 centred (360, S(k)), the same size as a laid step because it IS the next step. It hangs on `ART.rope` from `ART.horn` at (360, 60), drawn behind the stair in `line` at 2 px, and balances on `ART.peg` (r 9) at (360, S(k) + 6), a rock knuckle jutting from the face. It reveals nothing before the commit — predict-then-check, F-40. Its underside sits at Y(k) − 66, which is exactly the top of the slate the badger is holding up.
- **THE TWO BASKETS.** `ART.spar` 150 × 4 runs from each end of the slab (x 230 and 490) out to x 80 and 640 at y = S(k); `ART.cord` hangs from (130, S(k)) and (590, S(k)) to `ART.basket` 170 × 96 centred (130, S(k) + 54) and (590, S(k) + 54) — extents x 45-215 and 505-675, clear of the 260-wide stair on both sides, and inside zone W at every k (item 1 bottom 420, item 10 top 72). Each holds its number: `ART.rod` 12 × 44 with nine grooves, pitch 16, up to 9 standing on the basket floor; `ART.cube` 14 × 14, pitch 16, up to 5 per row with the second row above them. `ART.tag` 84 × 44 hangs on the outer side at (60, S(k) + 54) and (660, S(k) + 54) with `ART.numeral` at 40 px. Numeral AND blocks, at every level, always (misconception 2).
- **THE BADGER.** `ART.badgerReach` at (socketX, Y(k) − 15), feet on the standing line, both paws up on `ART.slate` 56 × 44 centred (socketX, Y(k) − 44), whose top touches the slab's underside. `ART.glyph` 34 px is cut into the slate; `ART.slateEdge` 62 × 50 rings it in the screen's one coral. The badger's position changes on every single item, twice (the walk, then the climb), and persists into the next — L2 PERSISTENCE, asserted by `check-mission.js` M3.
- **ENACTMENT STAGE (frozen world, corrections only).** Rods lie down as flat bars 44 × 12 in two stacks, left x = 290 and right x = 430, based at y = 300, one bar every 14 px going up (9 bars → top at 188); `ART.tensBadge` above each stack at y = 170; `ART.equalBars` between them at (360, 240) when the tens tie. Cube row A along y = 320 and row B along y = 352, both from x = 300 at pitch 20, with `ART.pairLine` (3 × 18) at (cubeX, 336) between matched cubes and `ART.onesBadge` at the right end of each row.

**Interactive elements: 7 of 10** (F-69 as read in `MISSIONS.md` §9.4 — an instrument counts as one, candidates count individually). The badger 1 · three sockets 3 · two step tiles 2 · the release 1. The baskets, slab, spars, stair, ledge, burrow, cubs and rubble are inert scenery and count zero.

**zone H (420-560) — THE HAND.** Three controls and nothing else. There is no symbol card here, because the symbol is on the slate in the badger's paws, up in zone W, one saccade from both baskets.

- Left step tile: `ART.stepTile` 96 × 96 with `ART.arrowLeft` at (180, 490).
- Right step tile: `ART.stepTile` 96 × 96 with `ART.arrowRight` at (360, 490).
- The release: `makeButton` `ok` 150 × 80 at (560, 490), enabled from the start — the badger flicks the rope loop off its stub and lets the stone find its own level.

Each step tile tap walks the badger one socket (clamped at the ends), `tone("tap")`, and the glyph on its slate re-cuts. Direct taps on the three socket tiles (78 × 64, gaps 12 px, both above the 56 px floor) are a pointer accelerator that does exactly the same thing — they move the badger, they never commit. Keyboard: Left / Right arrows step; Tab reaches the left tile, the right tile and the release first, then the three socket tiles; Enter / Space activates.

## How it plays

1. **Start screen.** Title "The Rocking Steps"; the badger `ART.badgerIdle` at (360, 210) standing at the foot of the cliff with its bundle of slates, the two cubs already on the ledge above it; `makeButton` `t("start")` at (360, 470); the picker at (16, 16), absent under `?embed=1`. It never auto-starts.

2. **Item 1 (L1: 32 vs 51).** The world builds once and is never rebuilt. Base platform top face Y(0) = 390. The badger stands at the centre socket, `ART.badgerReach` at (360, 375), slate at (360, 346) showing "=" at 34 px inside `ART.slateEdge`. The slab for step 1 hangs at S(0) = 318, level on `ART.rope` from `ART.horn` (360, 60), on `ART.peg` at (360, 324). Spars out to x 80 and 640; `ART.basket` at (130, 372) holding 3 `ART.rod`s and 2 `ART.cube`s with `ART.tag` "32" at (60, 372); `ART.basket` at (590, 372) holding 5 rods and 1 cube with tag "51" at (660, 372). Above: `ART.ledge`, `ART.burrow`, two `ART.cub`s. Below: `ART.rubble`. Zone H: the two `ART.stepTile`s and the release. **DECIDE: zero tweens are running** (F-42 / M2). The badger holds one static pose at one coordinate; the slab hangs still; the cubs do not breathe.

3. **Stepping (the whole of the input).** Tapping the right step tile walks the badger one socket to the right (centre → right, clamped), 320 ms, `ANIM.walkStep`, `tone("tap")`; the slate travels with it and `ANIM.glyphCut` swaps the glyph (">" at 270, "=" at 360, "<" at 450) so its open end always faces the side being braced. The baskets do not react while the badger walks — predict-then-check, F-40. Then the stage freezes again.

4. **The release (tap `ok`).** Every target is disabled for the length of the ACT. The badger reaches back, flicks the rope loop off its stub, and steps to the stair's outer edge. Then:

   - **Level (the badger is at the right socket for 32 vs 51).** The slab comes down 50 px onto the slate (`ANIM.settleLevel`, 900 ms), driving it into the course so 16 px of it stands proud as `ART.mark` with `ART.markGlyph` "<" at 14 px. `tone("correct")`. The badger climbs onto the new step (`ANIM.climb`, 700 ms) to (450, Y(1) − 15) = (450, 347), takes a fresh slate from its bundle, and the next slab is already hanging at S(1) = 290 with the next pair in the baskets. Praise rotation on a first-release item, unannounced, no pop over the world. The gap between the badger's feet and the ledge has shrunk by 28 px and there is one more step under it. **Nothing else on the screen has changed** — the cubs have not reacted; a waiting party that reacts to each correct answer is an approval meter, which is F-44's banned shape.
   - **Sloping (the badger is at the left or the centre socket for 32 vs 51).** `tone("nudge")`. The heavy end turns down about the peg and the slab settles sloping, its low end resting on the course below, at the 51 basket (`ANIM.settleSlope`, 900 ms). The badger's foot lifts toward it and comes back down on the step it was already standing on; pose `ANIM.oopsHold` for 400 ms, then back to `badgerReach`. It never steps onto the slab, never falls, never sags. The slate is still in its paws. **The apparatus is the consequence, never the creature.** Then the world freezes and the tens-first enactment plays (misconception 1 / 4, ~2.0 s): cubes sink and fade (`ANIM.fadeCubes`), rods lie down into two stacks at x = 290 and x = 430 based at y = 300 (`ANIM.rodsAlign`, 60 ms apart, `tone("tap", k)` per bar), `ART.tensBadge` "30" and "50" appear (`ANIM.badgeIn`), the taller stack pulses. The badger is drawn in front of the stair and behind nothing; the stacks sit in the open band above it. Then `ANIM.rodsHome` returns every stone to its basket, the rope is re-hitched and the slab re-hung level, and attempt 2 opens with the badger exactly where it was left.
   - **Swinging (equal baskets, the badger at an end — e.g. 55 vs 55 at the right socket).** `tone("nudge")`. Nothing is against the peg; the slab rocks off the slate and keeps swinging, three slow decreasing rocks (`ANIM.rockOff`, 900 ms), and does not settle. The badger waits, catches the rope, and the slab is re-hung level. Then the tens-equal enactment plays (misconception 3, ~3.2 s): the rods lie down into two equal stacks with both `ART.tensBadge`s reading "50" and `ART.equalBars` drawn between them for 600 ms; then `ANIM.fadeRods` and the cubes hop out into rows A and B (`ANIM.cubesAlign`) with `ART.pairLine`s between the matched pairs and `ART.onesBadge` on the unmatched ones. Attempt 2.
   - **Second release without a level rest.** The enactment replays in full, then the show-me: `ART.showRing` 96 × 80 appears around the correct socket and pulses at 1 Hz (`ANIM.showMe`), and the slab nods once toward it (`ANIM.slabNod`). Walking there and releasing completes the item as solved-with-help — the slab settles level, the step is laid, the badger climbs. No praise pop. There is no attempt 4 and no way for the item to end unsolved.

5. **The mirrored re-hang (F-41).** An item that did not rest level on the first release comes back after 2 intervening items with the two baskets swapped left for right, so the correct socket flips. A child who remembered "it was the right-hand one" is wrong; a child who compared is right. If it is missed again it returns near the end for a last look. The item count stays 10; re-queued items replace unplayed items of the same level.

6. **Items 2-10.** Per Content and Rules. The stair grows 28 px per item; the badger's altitude is the progress and the gap to the ledge is 280 px at item 1, 28 px at item 10, zero at Finish. L1 tens differ by at least 2 and the number with more cubes is also the bigger number; L2 tens differ by 1 and the smaller number has MORE cubes (the look-bigger trap), plus one equal pair; L3 same tens (ones decide), reversed-digit pairs (36 vs 63) and equal pairs.

7. **Finish.** Step 10's top face lands on y = 110, the ledge floor. The badger climbs onto it, stands to `ART.badgerHappy` at (360, 92), and the two cubs come off their haunches to meet it — the only change they make all session. `t("all_done")` at (360, 44); `tone("finish")`; `ANIM.celebrate` on the badger only.

   Below it the whole stair stands as it was built: ten courses, ten planted slates at their three offsets, the rubble at the bottom. **The finish screen is not a summary of the world — it IS the world, at the coordinates it occupied all session** (`MISSIONS.md` §9.1 item 6). The record is preserved from the original spec: the ten comparison sentences as `ART.sentenceChip` 120 × 36 in two rows of five from y = 448, first-release items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score. `makeButton` `play_again` at (250, 530) and `menu` at (470, 530).

Session ≈ 6 minutes (10 items × 25-40 s). Total ACT across a clean 10-item session ≈ 14 s, well inside R1's 60 s ceiling; corrections are additional and are protected teaching time (`GAME-DESIGN-LAW.md` §3.0).

## Art registry
```js
const ART = {
  badgerIdle:   { kind: "svg", value: LCSArt.get("badger.idle"),  size: 36 },
  badgerReach:  { kind: "svg", value: LCSArt.get("badger.act"),   size: 30 },   // both paws up on the slate
  badgerHappy:  { kind: "svg", value: LCSArt.get("badger.happy"), size: 36 },
  badgerOops:   { kind: "svg", value: LCSArt.get("badger.oops"),  size: 30 },   // surprise, never disapproval
  cub:          { kind: "svg", value: LCSArt.get("badger.cub"),   size: 34 },   // seated; drawn twice
  cliffWash:    { kind: "shape", shape: "rect", w: 720, h: 364, fill: "surface2" },              // three hairline strata in "line"
  ledge:        { kind: "shape", shape: "rect", w: 220, h: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  burrow:       { kind: "shape", shape: "arc", r: 28, w: 56, h: 46, fill: "ink", stroke: "inkSoft", strokeWidth: 2 },
  platform:     { kind: "shape", shape: "rect", w: 300, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  rubble:       { kind: "shape", shape: "polygon", points: [[-170,22],[-96,-14],[-30,6],[36,-20],[112,2],[170,22]], fill: "surface2", stroke: "line", strokeWidth: 2 },
  step:         { kind: "shape", shape: "rect", w: 260, h: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  slab:         { kind: "shape", shape: "rect", w: 260, h: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  peg:          { kind: "shape", shape: "circle", r: 9, fill: "structure", stroke: "ink", strokeWidth: 2 },
  horn:         { kind: "shape", shape: "polygon", points: [[-16,10],[0,-14],[16,10]], fill: "surface2", stroke: "ink", strokeWidth: 2 },
  rope:         { kind: "shape", shape: "line", w: 2, stroke: "line", strokeWidth: 2 },          // horn to each slab end; drawn behind the stair
  spar:         { kind: "shape", shape: "rect", w: 150, h: 4, fill: "inkSoft" },
  cord:         { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 2 },       // spar to basket, 48 long
  basket:       { kind: "shape", shape: "roundRect", w: 170, h: 96, fill: "surface", stroke: "ink", strokeWidth: 3, radius: 10 },
  tag:          { kind: "shape", shape: "roundRect", w: 84, h: 44, fill: "surface2", stroke: "ink", strokeWidth: 2, radius: 6 },
  numeral:      { kind: "text",  value: "", size: 40, font: "display", color: "ink" },
  rod:          { kind: "shape", shape: "rect", w: 12, h: 44, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine 1-px "line" grooves across it, 4.4 px apart
  cube:         { kind: "shape", shape: "rect", w: 14, h: 14, fill: "surface2", stroke: "ink", strokeWidth: 2 },
  socket:       { kind: "shape", shape: "rect", w: 46, h: 6, fill: "ink" },                      // a mortice in the step's top face
  slate:        { kind: "shape", shape: "roundRect", w: 56, h: 44, fill: "surface2", stroke: "ink", strokeWidth: 3, radius: 6 },
  slateEdge:    { kind: "shape", shape: "roundRect", w: 62, h: 50, stroke: "accent", strokeWidth: 3, radius: 8 },  // the screen's ONE state coral
  glyph:        { kind: "text",  value: "=", size: 34, font: "display", color: "ink" },
  mark:         { kind: "shape", shape: "rect", w: 46, h: 16, fill: "surface2", stroke: "inkSoft", strokeWidth: 2 },
  markGlyph:    { kind: "text",  value: "=", size: 14, font: "display", color: "structure" },
  stepTile:     { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  arrowLeft:    { kind: "shape", shape: "polygon", points: [[18,-20],[-18,0],[18,20],[10,0]], fill: "structure" },
  arrowRight:   { kind: "shape", shape: "polygon", points: [[-18,-20],[18,0],[-18,20],[-10,0]], fill: "structure" },
  tensBadge:    { kind: "shape", shape: "roundRect", w: 48, h: 26, fill: "bg", stroke: "structure", strokeWidth: 2, radius: 6 },   // numeral 16 px display structure
  onesBadge:    { kind: "shape", shape: "roundRect", w: 32, h: 26, fill: "bg", stroke: "structure", strokeWidth: 2, radius: 6 },   // numeral 16 px display ink
  equalBars:    { kind: "shape", shape: "rect", w: 60, h: 10, fill: "structure" },               // drawn twice, 14 px apart
  pairLine:     { kind: "shape", shape: "rect", w: 3, h: 18, fill: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 96, h: 80, stroke: "structure", strokeWidth: 4, radius: 14 },
  sentenceChip: { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },  // label 18 px display ink
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },        // Finish screen only
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }                      // Finish screen only
};
```
Rods and cubes differ by size AND shape AND grooves, never by colour alone (BUILD-CONVENTIONS §12). Inside a basket: rods stand on the basket floor at basket y + 40, side by side at pitch 16 (9 rods span 140 in a 150-wide interior); cubes sit in rows above them, row 1 centred at basket y − 15 and row 2 at basket y − 31, up to 5 per row at pitch 16. A number with 0 ones shows a dashed empty cube slot (`ART.cube` stroke only, alpha 0.4). `ART.slateEdge` is the only `accent` entry in the registry — one grep, one number (ART-BIBLE §10.1). The badger is grey-and-cream from the `surface2` and `inkSoft` tint pairs, so it carries no identity coral and the state coral stays available for meaning.

## Animation registry
```js
const ANIM = {
  walkStep:     { duration: 320, ease: "Sine.InOut", trigger: "the badger container to the next socket x, slate and glyph travelling with it" },
  glyphCut:     { alpha: 1, scale: 1, duration: 140, ease: "Back.Out", trigger: "the new glyph on the slate (old alpha to 0 over 70 ms, new from alpha 0 scale 0.7)" },
  settleLevel:  { duration: 900, ease: "Sine.In", trigger: "the slab down 50 px onto the slate; the slate compresses into the course and ART.mark appears" },
  settleSlope:  { angle: 9, duration: 900, ease: "Sine.In", trigger: "the slab rotates about the peg until its heavy end rests on the course below" },
  rockOff:      { angle: 7, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "equal baskets with the slate at an end; three decreasing rocks, never settling" },
  climb:        { duration: 700, ease: "Sine.InOut", trigger: "the badger container up 28 px onto the new step, then to badgerReach at the same socket x" },
  oopsHold:     { duration: 400, ease: "Sine.Out", trigger: "pose swap to badgerOops for 400 ms, then back to badgerReach; the badger's coordinate does not change" },
  fadeCubes:    { alpha: 0.25, duration: 250, ease: "Sine.Out", trigger: "all cubes during the tens-first enactment" },
  fadeRods:     { alpha: 0.25, duration: 250, ease: "Sine.Out", trigger: "all rods during the ones enactment (tens equal)" },
  rodsAlign:    { duration: 300, ease: "Sine.InOut", trigger: "each rod lies down into its stack, 60 ms apart (x, y set at call)" },
  cubesAlign:   { duration: 300, ease: "Sine.InOut", trigger: "each cube to its comparison row, 60 ms apart (x, y set at call)" },
  rodsHome:     { duration: 300, ease: "Sine.InOut", trigger: "every stone glides back into its own basket; alpha restored to 1" },
  pulse:        { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the taller rod stack; unmatched cubes" },
  badgeIn:      { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "tens/ones badges (from alpha 0, scale 0.5)" },
  slabNod:      { angle: 4, duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "the slab dips once toward the correct socket during the show-me" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new item's baskets, tags and stones (from alpha 0, scale 0.6)" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct socket (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the badger on the finish screen only" }
};
```
No flashing: `showMe` cycles at 1 Hz; every enactment step is one-shot. Every entry above is a CONSEQUENCE of a tap; nothing loops while a choice is open. Wrapping rule: art declared `kind: "svg"` is animated through its container, never by tweening raw `scale` (ART-BIBLE §9.3).

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                                 |  zone T   0- 56
 56   +--------------------------------------------------------------+  chrome only
      |            horn (360,60)                                     |
      |                 burrow (430,88)                              |
      |        cub  cub        ledge  top face y=110  x 250-470      |  zone W  56-420
      |       (300,94)(344,96)                                       |  THE WORLD
      |            [====== hanging slab 260x12 @ S(k) ======]        |
      |  ---spar---                peg (360,S+6)      ---spar---     |
      |  tag  ( basket 32 )                     ( basket 51 )  tag   |
      |  (60)   (130,S+54)                        (590,S+54)  (660)  |
      |                    slate (socketX, Y-44)                     |
      |                     badger (socketX, Y-15)                   |
      |                 [=== step k  260x12  y=Y(k)+6 ===]           |
      |                 [=== step k-1 ... mark plugs  ===]           |
      |                 [====== base platform (360,405) ======]      |
      |                        rubble (360,398)                      |
420   +--------------------------------------------------------------+
      |   [ <-tile ]        [ ->tile ]            [   OK   ]         |  zone H 420-560
      |    (180,490)         (360,490)             (560,490)         |  THE HAND
560   +--------------------------------------------------------------+
```
Legend: `Y(k) = 390 - 28k` is the standing line; `S(k) = Y(k) - 72` is the hanging slab's centre. Sockets at x = 270 / 360 / 450 on whichever step the badger is on; socket tiles 78 × 64 centred (socketX, Y(k) − 34) with 12 px gaps. Progress is the stair and the badger's own altitude — the gap from its feet to the ledge is 280 px at item 1 and 0 at Finish. There is no abstract completion meter anywhere on the play surface (`MISSIONS.md` §1.4). Fixed layout, FIT scaling, static camera.

## Visual specification
- Background `THEME.colour.bg`; `ART.cliffWash` 720 × 364 centred (360, 238) with three hairline strata in `THEME.colour.line` — a low-contrast wash, never detailed, never animated, never in front of a tappable thing (ART-BIBLE §4).
- Destination, drawn from tap one and untouched until Finish: `ART.ledge` (360, 116); `ART.burrow` (430, 88); `ART.cub` at (300, 94) and (344, 96), seated, 34 px, feet on the ledge floor.
- Stair: `ART.platform` (360, 405); `ART.rubble` (360, 398) in front of it; `ART.step` centred (360, 390 − 28k + 6) for each laid step; `ART.mark` at (socketX, 390 − 28k − 8) with `ART.markGlyph` at 14 px in `THEME.colour.structure`, one per laid course.
- Apparatus: `ART.slab` (360, S(k)); `ART.peg` (360, S(k) + 6); `ART.horn` (360, 60) with two `ART.rope` lines to (230, S(k)) and (490, S(k)), depth below the stair; `ART.spar` from each slab end out to x 80 and 640; `ART.cord` from (130, S(k)) and (590, S(k)) down 48 px; `ART.basket` at (130, S(k) + 54) and (590, S(k) + 54) with `ART.rod` and `ART.cube` laid out per the note under the Art registry; `ART.tag` at (60, S(k) + 54) and (660, S(k) + 54) with `ART.numeral` at 40 px centred in it.
- Hero: `ART.badgerReach` at (socketX, Y(k) − 15) during play; `ART.badgerOops` swapped in for 400 ms after a slab fails to rest level; `ART.badgerIdle` on the start screen and `ART.badgerHappy` at Finish. `ART.slate` at (socketX, Y(k) − 44) with `ART.glyph` centred on it at 34 px and `ART.slateEdge` ringing it. `ART.socket` is drawn in the step's top face at all three x positions so the three places are visible before the badger goes to them.
- Enactment: `ART.rod` re-laid as flat 44 × 12 bars in two stacks at x = 290 and x = 430, based at y = 300, pitch 14; `ART.tensBadge` at (290, 170) and (430, 170); `ART.equalBars` at (360, 234) and (360, 248); `ART.cube` rows at y = 320 and y = 352 from x = 300 at pitch 20; `ART.pairLine` at (cubeX, 336); `ART.onesBadge` 24 px past the end of each row.
- Zone H: `makeTile` 96 × 96 (`ART.stepTile`) carrying `ART.arrowLeft` at (180, 490) and `ART.arrowRight` at (360, 490); `makeButton` `ok` 150 × 80 at (560, 490). `ART.showRing` 96 × 80 around the correct socket during the show-me.
- Keyboard: Left / Right arrows step the badger; Tab reaches the left tile, the right tile and the release, then the three socket tiles; Enter / Space activates. Focus ring in `THEME.colour.focus`.
- Tap floors: step tiles 96, release 150 × 80, socket tiles 78 × 64 — all above the 56 px floor for 6-8, all with gaps of at least 12 px. Every interactive element is at least 16 px from the stage edge.
- While an enactment plays (2.0 s tens-only, 3.2 s tens-then-ones) and while any ACT runs, the two step tiles, the three socket tiles and the release are `setEnabled(false)`; they re-enable the moment the world freezes again. Under `?embed=1` the picker is not created.
- The one coral on screen is `ART.slateEdge`. Show-me, badges and pulses are all `structure`, so nothing competes with it.

## Content
Language-neutral. Items as (left basket; right basket; the socket that holds it). The correct socket is never the same three items running (the play list re-orders if it would be).
- **L1** (tens differ by at least 2; the bigger number also has more cubes or the same): (32; 51; right) · (74; 46; left) · (23; 65; right) · (81; 37; left) · (15; 58; right) · (67; 29; left)
- **L2** (tens differ by 1; the smaller number has more cubes; one equal pair): (48; 61; right) · (39; 52; right) · (70; 68; left) · (26; 34; right) · (55; 55; centre) · (83; 79; left) · (17; 25; right)
- **L3** (same tens, the ones decide; reversed digits; equal pairs): (52; 57; right) · (36; 63; right) · (94; 91; left) · (45; 54; right) · (78; 78; centre) · (60; 66; right) · (29; 92; right) · (83; 81; left) · (40; 40; centre)

Play list of 10 per Rules with the mirrored re-hang (How it plays §5); no item repeats except by re-hang (swapped); two consecutive items never share both numbers. What varies from item to item is the pair of numbers in the baskets — never the geometry of the world. The three sockets are cut in the rock at 270 / 360 / 450 and never move, which is what makes the cliff a place.

Worked example: item 1 (32; 51) rests level from the right socket, step 1 laid with a "<" slate · item 2 (74; 46) level from the left, step 2 with ">" → L2 · item 3 (48; 61) released from the left socket (more cubes) → the slab settles sloping toward 61, tens-first enactment 40 against 60, the badger walks to the right socket and the stone comes down (helped) · item 4 (39; 52) level from the right · item 5 (55; 55) level from the centre → L3 · item 6 = the mirrored re-hang of item 3, now (61; 48), level from the left · items 7-10 at L3 with (36; 63) missed once → Finish shows the ten-course stair and ten chips, 8 with filled dots.

## Rules
- **Item count**: 10 (re-hung swaps replace unplayed items of the same level). Ten items, ten steps, 28 px each — the stair reaches the ledge floor at exactly item 10.
- **Difficulty progression**: 2 consecutive first-release levels → next level (cap L3).
- **Adaptation**: a first release that does not rest level on 2 consecutive items → next item one level down (floor L1). A single miss re-hangs the item mirrored (after 2 items, then a last look) without changing level.
- **ANTI-BRUTE-FORCE GUARD — "THE ROPE IS LET GO ONCE", plus the mirrored re-hang.** Named because P1's tile re-shuffle is dead in a persistent world: a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes it a place (`GAME-DESIGN-LAW.md` §6). Four parts:
  1. **One-way commitment.** Letting the rope go is irreversible for the item's record: any slab that fails to rest level marks the item solved-with-help for good, however it ends. Walking to another socket afterwards does not un-choose.
  2. **The enactment is not skippable and the world is frozen through it** — 2.0 s on the tens step, 3.2 s when the tens tie and the cubes must pair. Guessing is strictly slower than reading the baskets, which is the only anti-guess pressure allowed here.
  3. **The mirrored re-hang.** A missed item returns after 2 intervening items with the baskets swapped left for right, so the correct socket flips; a child who memorised a side is wrong, a child who compared is right.
  4. **The candidate SET varies, the positions do not.** Numbers change every item; the three sockets never move.
  A random tapper hits 1 in 3, is slowed by a mandatory correction on every miss, and meets each miss again mirrored — so `qa-game`'s random-tapper run reaches the show-me ladder on most items (F-65's requirement, satisfied without moving a station).
- **Stuck rule** (an inactivity cue, never a clock): if 8 s pass with no step-tile tap, `ART.slateEdge` pulses once; repeats every 8 s. Nothing about elapsed time is shown; nothing ends.
- **What happens on a correct answer**: the slab settles level (`ANIM.settleLevel`), the slate is driven home and `ART.mark` appears in the course, `tone("correct")`, the badger climbs (`ANIM.climb`) to the new standing line 28 px higher, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on first-release items, and the next slab is hanging before the badger has finished standing up. The comparison sentence is recorded for the Finish screen. Nothing in the world is removed, moved or dimmed.
- **What happens on a wrong answer**:
  - Ones compared instead of tens, or the bigger-looking number chosen (tens differ): the slab settles **sloping** toward the heavier basket (`ANIM.settleSlope`), `tone("nudge")`; cubes fade, rods lie down into two stacks with tens badges, the taller stack pulses; the badger keeps its slate and its socket; attempt 2.
  - Tens equal and the slate at an end: the slab **rocks off and keeps swinging** (`ANIM.rockOff`), `tone("nudge")`; the tens step shows equal badges with the bars, then the ones step pairs the cubes and badges the unmatched ones; attempt 2.
  - "=" set at the centre when the tens differ: the prop is at the pivot, so the slab turns anyway and settles sloping — the tens step follows.
  - Second release without a level rest: the enactment replays, then `ART.showRing` marks the correct socket and the slab nods toward it; walking there and releasing completes the item as solved-with-help.
  - In every branch the consequence is the apparatus — a stone that slopes, a stone that swings. The badger never falls, never sags, never sinks, and nothing already built is disturbed. **THE RATCHET RULE:** every step laid stays laid, every slate stays planted, the cubs never leave, the ledge never moves further away.
- **Retry behaviour**: attempt 1 unaided → attempt 2 with the stones aligned in view → attempt 3 show-me; solved-with-help; the mirrored item re-hangs later. No attempt 4.
- **Finish condition**: 10 items, which is 10 steps, which is the ledge. No losing state, no clock, no score, no points, no stars, no badges (F-44, F-45, F-64). Exactly zero ways a session ends other than by arriving.

**Deletion tests** (`GAME-DESIGN-LAW.md` §2.2), all three of which must find nothing playable:

- **A — delete the maths.** Strip the rods and cubes from the baskets and the tens-then-ones derivation of `heavierEnd`. Every socket now rests the slab level, so the badger climbs whatever it does; what is left is a step tile and a climb button, with no reason to prefer any socket and no state worth reading. The `mutate-mission.js` form: with the basket contents zeroed, an item completes on any socket on attempt 1, 3 times out of 3.
- **B — delete the mission.** Remove the badger, the slab, the stair and the ledge. There is no commit path at all: the step tiles have nothing to move, `S` is undefined because `S` IS the hero's position, the release frees nothing, and no item can complete. This is the test the pre-pivot spec failed — delete its crocodile and the game was unchanged, because the state was `setSymbol === correctSymbol` and the croc was a nod animation.
- **C — delete the walking (instant cut).** Patch every traversal tween to `duration: 0`: the badger appears at the socket, the slab settles instantly, the climb is a cut. **The session plays identically** — same items, same order, same commits, same enactments, same first-release record, same item log. That is the pass condition (F5), and it is why the walk is not a seductive detail: the movement is the input and the arrangement, never the spectacle.

**F-42 two-beat cycle.** DECIDE is frozen: zero tweens run while the step tiles, socket tiles or the release are enabled — the badger holds one static pose at one socket, the slab hangs still, the cubs do not breathe. ACT begins only on a tap: one socket step ≤ 320 ms, the release-and-settle ≤ 900 ms, the climb ≤ 700 ms.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "The Rocking Steps" (`STRINGS` carries all 11 locale keys per BUILD-CONVENTIONS §17; the word is a plain noun phrase in every locale and must not name a tool the sibling tools already own). The play screen itself shows only numerals, stones and the symbols < = >.
- Text budget: the mission premise is carried entirely by the picture — a badger, two young on a ledge, a fallen path and one hanging stone. Zero premise words on the play screen, which is inside the 6-8 budget of 8 English words with the whole budget unspent (F-42, F6).

## Sound
`tone("tap")` on each socket step; `tone("tap", k)` per rod as the stacks lie down (k = 1..tens, one step per rod, so the child hears the tens climb — F-213) and per cube pair as the pair lines draw; `tone("correct")` when the slab comes to rest level; `tone("nudge")` when it settles sloping or rocks off (mellow); `tone("finish")` once at the ledge. Silent under `?sound=off`. Nothing is spoken; no sound carries meaning the screen does not also show — the stone's angle carries the message on its own.

## Testing checklist
- [ ] Works in all 11 languages (Start, OK, All done, Play again, Menu, praise rotation; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: both baskets with their numerals, the hanging slab, the badger with its slate and glyph, the three sockets, both step tiles and the release all visible and separate).
- [ ] Keyboard operable (Left / Right arrows step the badger; Tab reaches the two step tiles, the release, then the three socket tiles; Enter activates).
- [ ] Never auto-starts.
- [ ] No losing state (any number of releases that fail to rest level still ends with the show-me ring, the stone coming down and the step laid).
- [ ] **Mission — the goal is on screen from tap one.** The ledge, the burrow and both cubs are drawn before the first tap, at (300, 94) and (344, 96), and do not change until Finish. `mission.goal` has constant (x, y) inside zone W for the whole session (M1).
- [ ] **Mission — the hero moves and the world remembers.** The badger's (x, y) changes on at least 9 of 10 items, and its position at the start of item k+1 equals its position at the end of item k (M3). Item 1 and item 10 differ in zone W outside the current item's own region.
- [ ] **Mission — displacement.** The commit handler reads `hero.x` and never a tile id: forcing `hero.x` to a socket and calling the release completes or refuses the item with no tile ever tapped (F2).
- [ ] **Ratchet rule.** Drive a full session answering wrongly on every item: the number of laid steps never decreases, no planted slate is removed, both cubs stay at their coordinates, and the ledge's y never changes (M4).
- [ ] **The character is never the consequence.** On the wrong-answer screenshot the badger's coordinate is unchanged and its pose is `badgerOops` (surprise) for at most 400 ms; it never falls, sags, sinks or leaves.
- [ ] **Instant-cut test (Deletion C).** With every traversal tween patched to `duration: 0`, a scripted session produces a byte-identical item log — same items, same order, same first-release record.
- [ ] **Freeze (F-42 / M2).** At every decision point of a full `qa-game` session, `scene.tweens.getTweens().length === 0` whenever any target is enabled (the focus ring excepted).
- [ ] **No progress meter on the play surface** (M5): no dot art is drawn during Play; the only progress is the stair and the shrinking gap to the ledge.
- [ ] Every basket shows its numeral on its tag and the matching rods and cubes (32 = three rods and two cubes), at every level.
- [ ] Stepping right from the centre socket moves the badger to x = 450 and re-cuts the glyph to "<"; stepping left from the centre moves it to x = 270 and re-cuts to ">".
- [ ] The baskets do not react while the badger walks; only the release triggers anything.
- [ ] Releasing from the left socket for 48 against 61 settles the slab sloping toward the 61 basket, fades the cubes, lays 4 bars beside 6 bars with "40" and "60" badges, and pulses the 6-bar stack.
- [ ] Releasing from an end socket for 52 against 57 shows equal "50" badges with the bars, then pairs the cubes and badges the unmatched ones "2" and "7".
- [ ] Releasing from an end socket for 55 against 55 makes the slab rock off the slate and keep swinging, then re-hang level; releasing from the centre for the same pair rests it level.
- [ ] A missed item comes back two items later with the baskets swapped and the opposite socket correct.
- [ ] Two first-release levels in a row bring the harder level; two misses in a row bring the easier one.
- [ ] Step 10's top face lands on y = 110 and the badger's feet reach the ledge floor exactly at item 10.
- [ ] The finish screen redraws the world at its play coordinates and adds ten comparison chips with a filled dot for first-release items and a hollow dot for helped ones; no score, no elapsed time.
- [ ] Interactive elements on the play screen number 7 (badger, three sockets, two step tiles, release); every one is at least 56 px and at least 12 px from its neighbour.
- [ ] With `?sound=off` nothing is audible.
