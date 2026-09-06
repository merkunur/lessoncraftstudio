# 037 — The Road to a Hundred

## Identity
- Slug: `round-up-or-down`
- Subject / topic: Mathematics / rounding two-digit numbers to the nearest ten (47 → 50, 43 → 40, 45 → 50, 96 → 100)
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (the finger's verb is unchanged: address the thing in your hands to one of the places that will take it; here the places are cairns standing on a road and the "sort" is a heading the badger then walks)
- Frame: THE CROSSING
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Frame contract: `design/MISSIONS.md` FRAME 1, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. Sibling games: 005 (the sort-into-bins shape), 034 (distance to the next ten), 177 (decade neighbours).

## Learning
- Objective: Sorts each two-digit number into the "rounds down" bin or the "rounds up" bin, where each bin is labelled with the ten it rounds to, and so names the nearest ten.
- Prerequisites: Reads two-digit numerals; knows the tens 10 … 100 in order; can say how far a number is from a ten (game 034).
- Curriculum links: F-21 (place value; number sense within 100), F-31 rows "Place value tens/ones" and "+/− within 100, mental" — conservative 7-9 → 8-9 (US 3.NBT.A.1 "round whole numbers to the nearest 10"; England Y4 (Y3 practice) "round any number to the nearest 10"; Germany Klasse 3 "Runden auf Zehner"; France CE2 "arrondir à la dizaine"; Netherlands groep 5 "afronden op tientallen"; Spain 2º ciclo; Brazil EF03MA02 "aproximações"; Sweden åk 1-3 "överslagsräkning"; Finland grade 3 "pyöristäminen").
- Common misconceptions (F-108, F-21), each with this game's response:
  1. **Rounding by the tens digit ("47 — 4 is small, so it rounds down to 40").** Response: the barrow's wheel comes up against the half-stone and rocks back once (`ANIM.wheelStop`); the half-stone rises 6 px and its notch comes into view (`ART.halfNotch`, `ANIM.kerbRise`); then the road counts itself — `ART.roadMark`s light one at a time down-road from the stone to the lower cairn with `tone("tap", k)` climbing, and a `ART.runNumeral` settles as the run's length ("7"); the same up-road, settling as "3"; the shorter numeral `ANIM.pop`s and the cairn beneath it lifts its plate and pulses twice (`ANIM.plateLift`). Distance, not digit — and now the refusal has a visible cause standing in the road.
  2. **A five rounds down ("45 is in the middle, so 40").** Response: the stone with the five lies exactly ON the half-stone, so the badger is standing on the kerb, both cairns are five marks away and neither run is shorter. The correction counts 5 and 5 and pops neither. What decides is `ART.tieMark`, the arrow cut into the face of every half-stone pointing up the road: it lifts off the stone and pulses (`ANIM.tiePulse`), then the up-road cairn's plate pulses. The convention is shown at the one point on the number line where nearness genuinely runs out, so the child sees why there has to be a rule. L1 has no fives; the tie-mark appears from L2, once the distance idea is in place.
  3. **"Rounding down makes it smaller, rounding up makes it bigger" — so a number near its lower ten is sent up "to make it bigger", or the ten itself is misnamed (47 → "40, up").** Response: the cairn plates ARE the tens (`ART.cairnTen`, set per cairn and standing there all session), so choosing a cairn is naming a ten. As a stone seats, its numeral morphs into that cairn's ten (`ANIM.morph` — "47" becomes "50" with a pop) and then settles back to its own number under that plate, so the cairn ends the session visibly holding the class of numbers that round to it: cairn 60 stands under a plate reading 60 carrying 57, 61 and 64.
  4. **Not crossing the hundred (96 → 90, or "there is no ten above 96").** Response: the top of the road is the summit cairn (`ART.summitCairn`), plated **100**, and it is the gate of the hut — so the last stone of every route rounds to it and every child meets this case, as the arrival home rather than as a stretch item some sessions never reach. On an error the runs count out 6 and 4 and the plate that lifts reads 100.
  5. **Speed over sense (F-45 — rounding is a fluency topic where drills push guessing).** Response: nothing on the stage moves unless the child moves it; the barrow never gets heavier; a refusal costs a wheel-back and nothing else; and every wrong heading is answered with the full enacted correction rather than with a cost. Plus THE ONE-WAY WHEEL (Rules): a heading once walked cannot be un-walked, so an item touched by any wrong walk is never first-try and the level ladder cannot be climbed by guessing.
  6. **NEW — naming the ten off the ones digit, so the stone is sent past its neighbouring ten (57 → 70, "the 7 says seventy"; 98 → 80).** Response: available only because the world is a road. The badger sets off, wheels the barrow straight past the cairn it should have stopped at (a cairn does not block an empty-handed refusal, only a half-stone does), and is stopped by the first kerb beyond it. The skipped cairn lights its plate FIRST — *you went past one* — and only then do the two runs count out from the stone. The two-bin board could not express this error at all; it had nowhere to go past.

Multiples of ten (40, 50 …) are excluded from the stream — they are not rounded and would need a third "stays" bin, which would blur the two-way decision. Re-staged: on the road that exclusion is structural rather than editorial — a multiple of ten IS a cairn, so it can never be a stone in the barrow.

## Mission
**Mission, as the child would say it.** *Put the stones back and get up to the hut.*

**The hero.** A badger, in side profile, wheeling a barrow up a hill road at the end of the day. It is the way-warden: the road is marked by cairns, one at every ten, and the waystones that have rolled off them are lying about on the road. Its body is drawn in `structure` tints with the badger's `ink` / `surface` face stripe, so the character spends **none** of the coral budget (ART-BIBLE §9.2 / §10.1) and the one coral on the screen is always the stone in play. Poses: `idle`, `think`, `push` (the `act` pose, leaning into the barrow), `happy`. **No `oops` pose is drawn for this game at all** — a deliberate compliance point rather than an omission: GAME-DESIGN-LAW 3.0 says the character is never the consequence and the reviewer check is literally *look at the wrong-answer screenshot; if the creature's state changed, reject*. On every refusal the badger holds `ART.badgerThink` and the road does the reacting.

**The want (the visible lack), readable from one still frame at 400 px with no motion and no words.** Six cairns standing up a hill road with empty cradles on top. A badger halfway up it holding one coral waystone with a number on it. A hut at the summit with two cubs in the lit doorway, and a road between them that is not finished. A nine-year-old reads *the stones are not where they belong and it is not home yet* from the photograph. As the session runs the same frame answers itself: the cradles fill from the bottom of the hill upward and the badger is nearer the door.

**The goal.** The hut, `ART.hut` at a constant (620, 84) for the entire session, with `ART.cub` at (600, 98) and (636, 98) sitting on the doorstep from tap one (Device 1, THE WAITING PARTY). They never animate during play, never react to an item, and change only on the Finish screen — a waiting party that reacts to each correct answer is an approval meter, which F-44 bans.

**S — the single state variable: THE BADGER'S PLACE ON THE ROAD.**

- **Mathematical reading:** the number the badger is standing on. The road is a number line. While it holds a stone it is standing on that stone's value (57); when it comes to rest at a cairn it is standing on a multiple of ten (60). S is a value in [50, 100].
- **Physical reading:** how far up the hill it is — its (x, y) on the road band, and therefore how far it still is from the hut.

The transition function is the walk, and the road is what permits it: **a loaded barrow may not be wheeled across a half-stone** (the kerb set across the road at every five); an empty one may, which is how the badger fetches the next stone. So a walk from S = 57 can end at 60 and nowhere else; a walk from 51 can end at 50 and nowhere else.

**There is no `answer` field anywhere in the game.** The item stores the stone's value; the road stores the half-stones. The commit is one line:

```
walk(badger, heading);                                  // stops at the first half-stone between, else at the cairn
const landed = roadValueAt(badger.x);
if (landed % 10 === 0) seat(stone, cairnAt(landed));    // the world accepted the move
else refuse();                                          // the wheel is against a kerb
```

**The isomorphism — moving IS solving.** *The nearest ten is the only cairn the barrow can reach, so choosing where to stand is choosing which ten the number rounds to.* Rounding to the nearest ten is a partition of the number line by its midpoints; the road makes that partition a physical object. The predicate `|T − N| < 5` is not evaluated and reported — it is **walked**, and the child watches it be true.

**Why this is not "read a tile id, then animate a walk".** The tap sets a **heading**, not an answer. The world then simulates the walk and the badger comes to rest wherever the road lets it — at the cairn, or against a kerb part of the way there. Correctness is read off `badger.x` after the walk resolves. Delete the half-stones and every tap succeeds, because the tapped id was never the answer; the resting position is. That is the Displacement rule literally (`answer = f(character.position)`, GAME-DESIGN-LAW 2.3), and it is why this game has no Check control, no answer strip and no keypad.

**Where the physics stops, and it is the best thing in the design.** On a five the stone lies exactly on the half-stone: the badger is standing on the kerb, both cairns are equidistant, and neither run is shorter. The ground genuinely cannot decide — which is the mathematically honest account of why "5 rounds up" is a **rule** and not a fact about distance. So the road carries the rule where the rule belongs: the tie-mark cut into the face of every half-stone, an arrow pointing up the road, and the kerb's up-road face is a ramp while its down-road face is a sheer step. A barrow standing on a kerb may roll off up-road and not down. The convention is a visible property of the apparatus, at the exact point where nearness runs out.

**Integrated, never concealed (GAME-DESIGN-LAW 2.5).** The abstract notation is in the same frame as the fiction at the moment of the answer: the stone's numeral in the badger's paws, the two cairn plates reading their tens, and — on a correction — the two run-lengths counted out along the road in numerals. The mission supplies the reason; it never replaces the cue. This is not a word problem: there is no story to decode, only a hill with numbers on it.

**The mark that stays (Device 2).** Each seated stone settles into its cairn's cradle and stacks there for the rest of the session, keeping its own numeral. Nothing ever un-seats.

**Diegetic progress — three readings, no progress furniture of any kind on the play surface.** (1) *The cairns fill from the bottom of the hill upward*: cairn 60 ends the session holding 57, 61, 68 under a plate that says 60, which is a better learning summary than fourteen "47→50" chips and is the actual objects in their actual places. (2) *The barrow empties*: `ART.barrowLoad` is drawn as a stack that shrinks by one each item — the only "how many left" the game needs. (3) *The badger climbs*: the cairn it ends each item at is non-decreasing across the whole session, identically in all three levels, so the distance to the hut never grows between items and the last stone of every route is placed on the summit cairn, which is arriving home. `mission.progress` for the M4 gate = (stones seated); monotone by construction.

The within-item backward step of a rounds-down stone (walk forward to 64, then back to 60) is a two-second walk that always ends at a cairn no lower than the one before, so **rounding down never costs ground** — which matters, because if down-rounds lost progress the game would teach that down is the worse answer, which is misconception 3 wearing the game's own clothes.

**The three deletion tests (GAME-DESIGN-LAW 2.2).**

- **A · Delete the maths** — make every cairn accept every stone. The half-stone stops nothing, every heading succeeds, and what is left is a badger walking up a hill tapping posts with no choice to make and no reason to look at anything. There is no arcade underneath, because the walk IS the commit rather than a reward that follows one. Nothing playable survives. **PASSES.**
- **B · Delete the mission** — remove the badger, the barrow, the hut and the cubs. A stone and six cairns and no way to commit at all, because the commit is the badger's arrival: correctness is `roadValueAt(badger.x) % 10 === 0` and there is no badger to have an x. There is no fallback tap-the-tile path hiding behind the hero, because there is no `answer` field for it to compare against. Nothing playable survives. **PASSES.**
- **C · Delete the walking** — patch every traversal tween to `duration: 0`. The badger cuts instantly to the cairn, or instantly to the kerb, and the identical acceptance is computed from the identical position. The correction is not a traversal and is unaffected. **The item log is byte-identical, which is the pass condition** (GAME-DESIGN-LAW 2.2a): travel time carries no mechanic here, and the mission is carried by the arrangement — a hill, a loaded barrow, cairns filling behind, a lit door above — which is intact in a frozen frame. **PASSES.** Measured travel removed: about **8 s** across a fourteen-item session (see the ACT budget in ## World).

**The M-gate and the F-42 gate.** M1: `mission.goal` is the hut, constant at (620, 84) all session; `mission.hero` is the badger, whose x changes on all 14 items. M2: while the live cairn tiles are enabled, zero tweens are running — the badger holds one static pose, the cubs never animate, the road never shimmers, nothing breathes. M3: the badger starts item *k+1* exactly where item *k* ended, at a cairn; the zone-W diff between item 1 and item 14 outside the current span is five loaded cairns. M4: `mission.progress` is monotone under a session driven wrong on every item. M5: no progress dots are drawn during Play. M6: ACT budget about 8 s of travel plus corrections, far inside the 60 s ceiling, because the world is small in the direction that matters. F1 freeze — holds. F2 displacement — holds; the handler reads a position and the tap sets a heading. F3 co-location — holds; one frame, no camera, no panel. F4 single world — Boot / Play / Finish. F5 instant-cut — Test C above. F6 text — the play screen carries **no words at all**, only numerals; the premise lives on the start screen and is two short sentences.

## World
Stage **720 × 560**, `Scale.FIT`, no scrolling, static camera. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7: zone T is chrome only, zone W is the world, zone H is the hand. There is no progress furniture anywhere on the play surface — progress is diegetic, per §1.4 and the amendment to BUILD-CONVENTIONS §6.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). Nothing else: the row of progress circles at y = 28 and `t("question_x_of_y")` at y = 48 that the pre-pivot spec drew here are both deleted.

**Zone W, y 56-420 — THE WORLD.** The hero and the goal are both inside it at every moment of the session, one saccade apart, and the goal's (x, y) never changes.

- **THE ROAD (the apparatus and the number line, one object).** A 22-px band in `surface2` with `line` edges, rising left to right, covering 50 → 100, drawn as five `ART.roadSpan` parallelograms:

  `x(n) = 60 + (n − 50) × 12` · `y(n) = 396 − (n − 50) × 4`  (12 px per unit, 120 px per ten-span)

  | n | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100 |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | x | 60 | 120 | 180 | 240 | 300 | 360 | 420 | 480 | 540 | 600 | 660 |
  | y | 396 | 376 | 356 | 336 | 316 | 296 | 276 | 256 | 236 | 216 | 196 |

- **CAIRNS (the tens).** Five stacked-stone posts, `GameCore.makeTile` 76 × 108, standing on the road's upper edge, centre (x(T), y(T) − 65): **50** (60, 331) · **60** (180, 291) · **70** (300, 251) · **80** (420, 211) · **90** (540, 171). Cairn 50's left edge is x = 22 (≥ 16 margin); adjacent cairn boxes are 44 px apart (≥ 12); every tile is ≥ 56 px (the 8-9 tap floor). Each carries `ART.cairnCourse` lines so it reads as stacked stone, an `ART.cairnPlate` at cairn (0, −8) with its ten in `ART.cairnTen`, and an empty `ART.cradle` at cairn (0, −40) in the top course.
- **THE SUMMIT CAIRN** at 100 is bigger — `ART.summitCairn` 88 × 80, centre (660, 145), box x 616-704, y 105-185 — three courses instead of two, plate reading **100**, cradle in its own top course rather than above it. It is both the last cairn and the gate of the hut.
- **HALF-STONES (the midpoints).** `ART.halfStone`, a kerb 20 × 26 set across the road at every five, centred (x(n), y(n) − 6): (120, 370) · (240, 330) · (360, 290) · (480, 250) · (600, 210). From L2 each carries `ART.tieMark`, the up-road arrow cut into its face. From L3 each is replaced at rest by `ART.turfHump` — a low turf mound, no notch, no arrow — still there, still stopping the wheel, and uncovered by the correction. `ART.halfNotch` is the ramp in the up-road face, drawn only while a correction plays.
- **ROAD MARKS.** `ART.roadMark`, 3 × 12 cross-strokes at 12-px pitch along the band, at every unit that is not a multiple of five — eight per span, with the half-stone standing where the ninth would be. Drawn on the current span at L1 while the child decides; from L2 they exist but are unlit, and light one at a time during a correction.
- **THE GOAL, drawn from tap one and constant all session.** `ART.hut` 84 × 56 at (620, 84) with `ART.hutDoor` at (620, 94), its doorstep resting on the summit cairn's top course; two `ART.cub` at (600, 98) and (636, 98) looking down the hill.
- **THE HERO.** `ART.badgerIdle` / `Think` / `Push` drawn 64 px, feet on the band's lower edge, centred (x(S), y(S) − 21). `ART.barrow` 56 × 36 centred (x(S) + 44, y(S) − 12) — a barrow is pushed, so it is always ahead of the badger in the direction of travel and swings to the leading side when the badger sets off; its centre x is clamped to ≤ 676 so it never leaves the stage at the summit. `ART.barrowLoad` sits in it and shrinks by one stone per item.
- **THE STONE IN PLAY.** `ART.stone` 48 × 40 with `ART.stoneNum`, held at (x(S), y(S) − 62) while the badger decides. It is the game's **single coral element** (about 1,900 px², one per screen). A seated stone becomes `ART.stoneSeated` with `ART.seatedNum` — it loses its coral as it settles — so the coral is always and only "the number being decided now", and fourteen items never put fourteen coral objects on the hill. Seated stones stack above their cairn's top course at 18-px pitch, first centred at cairnTop − 11; the tallest stack (cairn 90, three stones) tops out at y = 60, inside zone W.
- **SCENERY.** `ART.hillWash` behind the road, non-interactive, never animated.

**Zone H, y 420-560 — THE HAND: EMPTY of controls for the whole of play.** Zero controls, zero captions, zero glyphs. THE CROSSING's canonical property: the world is the hand, so the five-control ceiling is spent as zero and F3 co-location is satisfied by construction rather than by discipline. The 140 px is not blank — it holds `ART.hillWash` continued as the valley and `ART.valleyRoad`, the un-numbered stretch already climbed, running off the bottom-left corner. That is the journey behind the badger, drawn as scenery, and it is what keeps the frame reading as a hiker on a ridge (GAME-DESIGN-LAW 2.4) rather than as a diagram with a gap under it. Zone H carries a control on exactly two screens: Start at (360, 470) on the start screen, and `play_again` (250, 510) / `menu` (470, 510) on Finish.

**F-69 element count (§5.1 reading: an instrument counts as one, candidates count individually, inert scenery counts as zero).** Badger (1) + the two live cairns (2) = **3**, rising to **4** on the items that carry the third candidate of misconception 6. Every other cairn is inert scenery with no hit area. Tab order: badger, then the live cairns in road order, lowest first.

**Measured ACT budget.** Commit walk 12-60 px (110-220 ms). Fetch walk to the next stone 12-156 px (110-320 ms). Refusal walk plus wheel-back at most 2 × 260 ms. Fourteen items with the expected error rate come to about **8 s of travel**, against the 60 s ceiling (MISSIONS 8.3 R1). Corrections are not travel and are excluded from that figure by design; each runs about 1.44 s with the world frozen.

**Declared risks — stated rather than designed around.**

1. **The number line shows the answer, and pretending otherwise would be dishonest.** At 12 px per unit a stone at 57 is visibly 36 px from one cairn and 84 px from the other, so a child can often answer by looking. The position taken here is that this is the model working rather than a leak: a number line is *the* standard representation for 3.NBT.A.1 in every one of the twelve curricula cited above, and making nearness visible is the direct refutation of misconception 1, the commonest error in the topic. What the picture never supplies is the **name** of the ten, the **tie** rule (on a five the eye says "neither"), or the fact that the ten above 90 is 100. The ladder withdraws what support it honestly can: L1 shows the road marks so the distance is countable; L2 removes them; L3 grasses the half-stones over so the midpoint itself must be computed. The pre-pivot spec made the same trade (its L1 draws the marker on 47 between 40 and 50) and this is the riskiest single judgement in the design.
2. **The number range narrows from 11-99 to 51-99.** A road needs ≥ 68 px per cairn (56 px tap floor plus a 12 px gap) and ≥ 12 px per unit for the marks to be countable, which caps a 720-px stage at five ten-spans; and the summit must be 100 or misconception 4 has no home. All nine ones digits, four decades, the tie case and the hundred-crossing still appear, so the skill is unchanged — but this is a genuine reduction in content variety and it is the price of the world. Rejected alternatives: a switchback (leg 2 running right-to-left reverses "bigger is that way" on a number line); a wrapping staircase (items straddle the wrap and the local geometry becomes unreadable); a nine-span road at 6.7 px per unit (the badger is wider than a span).
3. **"Why can't the barrow go over the kerb?"** The world rule is learned in one item and never varies, but it is a rule, not a deduction. It is legible — a raised stone, a wheel that bumps it and rocks back — and it is F-61 in pure form, but a child who reads it as arbitrary loses some of the isomorphism's force. This is the sentence most worth hearing a nine-year-old say back in the first play test.
4. **Road marks at 12-px pitch are at the ART-BIBLE floor**, and at a 400-px iframe that is 6.7 real px between marks. They are drawn as paving joints — a texture — rather than as countable objects, and the correction lights them one at a time with a rising tone so the count is heard as well as seen; the load-bearing cue is the settled numeral ("7" / "3"), not the marks. If the 400-px sweep shows them as mush the fix is to drop the L1 marks to a five-and-five grouping, never to widen the span.
5. **Misconception 3 comes across weaker here than on the two-bin board, and it is flagged rather than dropped.** There the choice was literally *which named ten*, because the bins were nothing but labels. Here the cairns are also places, so a child can choose correctly by position without ever reading a plate. Three mitigations, none of which fully closes it: the morph names the ten at the moment of seating; the summit cairn reads 100, which no child resolves by position alone; and the finish groups every stone under its ten. If a build wants this hardened further the honest lever is content — more nineties — not layout.
6. **The badger is 64 px on a 120-px span** and covers about five units of road, so while it is deciding at 57 it partly occludes the kerb at 55. Its feet are the point and everything is computed from them, but the drawing overhangs its own position. Two mitigations: during every enactment the barrow, not the badger, is the thing against the kerb, so the kerb is unobstructed exactly when it is teaching; and the stone's numeral, not the sprite, is the authority on where the badger is. A build should check that a child reading "where am I" off the sprite does not misjudge a 51 or a 54.
7. **Two live candidates on most items** (three on the misconception-6 items), so the guard is weaker than a four-tile board's — see THE ONE-WAY WHEEL in Rules for the full disclosure and the reason a four-cairn board is forbidden by §8.1 rather than merely undesirable.
8. **The goal's first coordinates collided with the world and were re-measured.** The approved design put the hut at (585, 100) with cubs at (563, 118) and (597, 118). Measured against cairn 90's three-stone stack (x 520-560, reaching y = 60) that box overlaps by 17 px, so the hut is at (620, 84) here and rests on the summit cairn instead. Recorded because the lesson is the recurring one in this repo: verify the measurement before trusting the number, including a number in an approved design.
9. **Nothing here has been built**, and the corpus's history is unkind on exactly this point — the fox passed every gate three times and was rejected on sight. The two things worth a throwaway before a line of the real game is written are the half-stone refusal at 400 px and the five-on-the-kerb frame, because both are load-bearing and both are judgements about how a nine-year-old reads a picture, not measurements.
10. **Redundancy.** Checked against the neighbours: 034 `next-ten-gap` (rabbit, a single 40-50 line, P10 predict the complement), 036 `count-back-crossing-ten` (P7 hops), 030 `count-back-cliff` (goat, P7), 008 `frog-hops`, 020 (snail on a hundred square), 041 (goat on a ford), 177 `decade-neighbours`, and 005 `shape-sorter` → THE HARBOUR WALL. The shared element — an animal on a number line — is inherent to the topic family; the differentiators are the cairns-as-tens, the half-stone as the refusing object, delivery rather than counted hops, and a five-span road rather than a single decade. `badger`, `cairn`, `barrow` and `waystone` return zero hits across all 203 specs, so the world is unclaimed. `check-redundancy.js` must be re-run against the transformed designs, not the originals.

## How it plays
1. **Start screen.** Title `S("title")` at (360, 190), 52 px `THEME.font.display` `THEME.colour.structure`; premise `S("premise")` at (360, 250), 22 px `THEME.font.body` `THEME.colour.inkSoft`, two short sentences, wrapped at 520 px; `ART.badgerIdle` 96 px at (360, 350) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 470); the picker at (16, 16). Never auto-starts.

2. **The road is built once, and it is a place.** On entering Play the five `ART.roadSpan`s, the five cairns with their plates and empty cradles, the summit cairn, the five half-stones, `ART.hillWash`, `ART.valleyRoad`, the hut and the two cubs are all drawn. **Nothing here is rebuilt between items and nothing ever moves**, which is what makes the hill a location rather than a board — and it is why P1's tile re-shuffle is unavailable and a named replacement guard is declared in Rules. The badger stands at the foot of the road at 50 (feet at (60, 407)) with `ART.barrowLoad` showing fourteen stones. On the first item only, it wheels forward unbidden to its first stone and holds — the R4 concession, which F-42 permits verbatim (*the first item of a new mechanic can demonstrate itself once, then fade*), and which teaches "the badger goes to the stone" with no words.

3. **Item 1 (L1, stone 52).** The badger is at 50; the stone lies on the road at 52. It wheels the empty barrow forward (`ANIM.fetchTo`, 24 px, 110 ms), lifts the stone (`ANIM.morph` on pick-up is not used; the stone simply rises to (84, 326) with `ANIM.seat` reversed) and holds `ART.badgerThink`. Its feet are at (84, 399); S = 52. The two live cairns light their tile outlines: **50** at (60, 331) and **60** at (180, 291). Zone H stays empty. The stage is now frozen: zero tweens running, one static pose, no ambient anything. At L1 the eight `ART.roadMark`s of the 50-60 span are drawn.

   - **The child taps cairn 50 (correct).** The tap sets a heading, down-road. `ART.badgerPush`; `ANIM.wheelTo` walks the badger 24 px down the band to (60, 407) in 130 ms. Nothing lies between 52 and 50, so it arrives. `roadValueAt(badger.x)` is 50, a multiple of ten, and the world accepts the move: the stone lifts out of the barrow into cairn 50's cradle with `ANIM.seat`, its numeral morphs to **50** with `ANIM.morph` and settles back to **52** as `ART.stoneSeated` under the plate, `tone("correct")`, `ART.badgerHappy` for 400 ms, `ART.barrowLoad` drops to thirteen. Praise `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on first-try items only, every third item and on the fourteenth. Then the badger wheels on to the next stone (`ANIM.fetchTo`) and item 2 opens. **Feedback lands 130 ms after the tap — the walk is the commit, so it never sits between the commit and the feedback (§6).**
   - **The child taps cairn 60 (wrong, attempt 1).** Heading up-road. `ANIM.wheelTo` sets off; at 55 the barrow's wheel meets the half-stone and stops, `ANIM.wheelStop` rocks it back 6° once and settles (240 ms). Nothing is dropped, nothing rolls away, the stone stays in the barrow, and **the badger's pose does not change**. The world then freezes and the correction plays, about 1.44 s, with both cairn tiles `setEnabled(false)` so a tap cannot land mid-teaching: (a) the half-stone rises 6 px and `ART.halfNotch` comes into view, `ANIM.kerbRise`, 220 ms; (b) `ART.roadMark`s light one at a time from the stone down-road to cairn 50, `tone("tap", k)` climbing, an `ART.runNumeral` counting up over the road and settling as **2** in 24 px display `structure`, 2 × 80 ms; (c) the same up-road to cairn 60, settling as **8**, 8 × 80 ms; (d) the shorter numeral `ANIM.pop`s and cairn 50 lifts its plate and pulses twice, `ANIM.plateLift`, 420 ms. Then `ANIM.fadeOut` clears the numerals, the badger wheels back to its stone (`ANIM.wheelBack`, 260 ms) and attempt 2 opens.
   - **Attempt 2 wrong.** The same enactment runs again in full — correction duration may never fall (GAME-DESIGN-LAW §6) — and then attempt 3 opens as the show-me: the correct cairn's cradle opens (`ANIM.cradleOpen`) and stays open with `ART.cradleRing` breathing around it (`ANIM.showMe`). Wheeling the stone there completes the item as solved-with-help. There is no attempt 4 and no way for the session to end other than by arriving at the hut.
   - **Tapping the badger** with a choice open: it holds the stone up and the numeral `ANIM.pop`s. Nothing else — the pre-pivot spec's harmless preview, carried over.

4. **Item 3 (L1, stone 57) — the misconception-6 item.** The badger fetches from cairn 50 to 57, crossing the kerb at 55 with an empty barrow (which is legal, and is the child's second lesson about the rule). S = 57; live cairns **50** and **60**; and because the ones digit 7 names 70, which is exactly one cairn beyond the upper flanking cairn, **cairn 70 is live as well** for this item only. A tap on 70 sets a heading up-road; the badger wheels past cairn 60 — a cairn does not stop a barrow, only a half-stone does — and is stopped at the kerb at 65. Cairn 60's plate lights first (`ANIM.plateLift`, *you went past one*) and only then do the runs count out, 7 down and 3 up, with 3 popping and cairn 60 pulsing. This over-shoot could not be expressed on the two-bin board at all.

5. **A five (L2, stone 55).** The badger fetches to 55 and stands ON the half-stone. Both cairns are five marks away and neither direction is barred by distance; what decides is the kerb's own shape — a ramp on its up-road face, a sheer step on its down-road face. A tap on cairn 50 is refused by that step (`ANIM.wheelStop`) and the correction counts 5 and 5 and pops neither numeral. Instead `ART.tieMark` lifts off the half-stone and pulses (`ANIM.tiePulse`), and cairn 60's plate pulses. The world says, wordlessly, *the ground cannot decide this one; the road's rule can.*

6. **The last item (stone 98 at L1, 95 at L2, 96 at L3).** Live cairns **90** and the summit **100**. The correct heading takes the badger to the summit cairn at the hut's gate; the stone seats in the summit cradle with its numeral morphing to **100**. On an error the runs count 6 and 4 (or 5 and 5 on the L2 five) and the plate that lifts reads 100. Arriving is the finish.

7. **Finish.** The world at its play coordinates, unmoved: the whole road, the six cairns each carrying the stones that round to it, the badger at the hut door with its two cubs, the barrow empty and tipped on its side beside them at (596, 178). `t("all_done")` at (300, 84), 52 px `structure`; `ART.badgerHappy` with `ANIM.celebrate` and the two cubs each hopping once (`ANIM.cubHop`), ≤ 1.5 s total; `tone("finish")`; `makeButton` `play_again` (250, 510) and `menu` (470, 510); `GameCore.reportHeight()`. No score, no stars, no first-try tally, no progress dots. The session's fourteen answers are all still on the hill where the child put them, sorted under their tens, and that is the summary.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  /* the hero and his family — one drawing family, the cub is the same animal at 55% */
  badgerIdle:   { kind: "svg", value: LCSArt.get("badger.idle"),  size: 96, fallback: "🦡" },
  badgerThink:  { kind: "svg", value: LCSArt.get("badger.think"), size: 96, fallback: "🦡" },
  badgerPush:   { kind: "svg", value: LCSArt.get("badger.push"),  size: 96, fallback: "🦡" },   // the `act` pose, leaning into the barrow
  badgerHappy:  { kind: "svg", value: LCSArt.get("badger.happy"), size: 96, fallback: "🦡" },
  cub:          { kind: "svg", value: LCSArt.get("badger.cub"),   size: 96, fallback: "🦡" },
  barrow:       { kind: "svg", value: LCSArt.get("barrow"),       size: 96 },                   // one wheel, two handles, drawn side-on
  barrowLoad:   { kind: "shape", shape: "roundRect", w: 34, h: 12, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 4 },  // one unplaced waystone in the barrow; stacked

  /* the hill */
  hillWash:     { kind: "shape", shape: "roundRect", w: 720, h: 520, fill: "structureSoft", radius: 0 },
  roadSpan:     { kind: "shape", shape: "polygon", points: [[-60,31],[60,-9],[60,-31],[-60,9]], fill: "surface2", stroke: "line", strokeWidth: 2 },  // one 120 x 40 rising span of the 22-px road band
  valleyRoad:   { kind: "shape", shape: "polygon", points: [[-120,70],[60,-14],[60,-36],[-120,48]], fill: "surface2", stroke: "line", strokeWidth: 2 },  // the stretch already climbed, running off the bottom-left corner
  roadMark:     { kind: "shape", shape: "rect", w: 3, h: 12, fill: "line" },                    // a paving joint, one per unit that is not a multiple of five

  /* the tens */
  cairn:        { kind: "shape", shape: "roundRect", w: 76, h: 108, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },
  cairnCourse:  { kind: "shape", shape: "rect", w: 68, h: 2, fill: "line" },                    // the joints between courses, so a cairn reads as stacked stone
  cairnPlate:   { kind: "shape", shape: "roundRect", w: 46, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 6 },
  cairnTen:     { kind: "text",  value: "", size: 28, font: "display", color: "ink" },          // "50" … "100", set once, standing all session
  cradle:       { kind: "shape", shape: "polygon", points: [[-20,10],[-12,-10],[12,-10],[20,10]], fill: "surface2", stroke: "structure", strokeWidth: 2 },  // the empty seat in the top course
  summitCairn:  { kind: "shape", shape: "roundRect", w: 88, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },

  /* the midpoints — the objects that refuse */
  halfStone:    { kind: "shape", shape: "roundRect", w: 20, h: 26, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 4 },
  halfNotch:    { kind: "shape", shape: "polygon", points: [[-10,7],[10,-7],[10,7]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },  // the ramp cut in the up-road face; the down-road face is a sheer step
  tieMark:      { kind: "shape", shape: "polygon", points: [[-7,5],[3,5],[3,9],[9,0],[3,-9],[3,-5],[-7,-5]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },  // the up-road arrow cut into the face, from L2
  turfHump:     { kind: "shape", shape: "ellipse", w: 26, h: 14, fill: "structureSoft", stroke: "line", strokeWidth: 2 },   // the L3 grassed-over form of a half-stone

  /* the stone in play — the ONE coral element on the screen */
  stone:        { kind: "shape", shape: "roundRect", w: 48, h: 40, fill: "accent", stroke: "structure", strokeWidth: 2, radius: 8 },
  stoneNum:     { kind: "text",  value: "", size: 26, font: "display", color: "inkOnAccent" },
  stoneSeated:  { kind: "shape", shape: "roundRect", w: 40, h: 20, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 5 },   // a seated stone loses its coral
  seatedNum:    { kind: "text",  value: "", size: 14, font: "display", color: "ink" },

  /* the enacted correction */
  runNumeral:   { kind: "text",  value: "", size: 24, font: "display", color: "structure" },    // the length of one run, counted out over the road
  cradleRing:   { kind: "shape", shape: "roundRect", w: 52, h: 32, stroke: "structure", strokeWidth: 4, radius: 8 },   // the show-me, around an opened cradle

  /* the goal */
  hut:          { kind: "svg", value: LCSArt.get("hut"), size: 96 },
  hutDoor:      { kind: "shape", shape: "roundRect", w: 44, h: 36, fill: "accent", stroke: "structure", strokeWidth: 2, radius: 6 }
};
```
The pose set deliberately omits `oops`. The approved design named one; it is not drawn, because GAME-DESIGN-LAW 3.0 is stricter than the ART-BIBLE pose vocabulary — the character is never the consequence.

Coral audit: exactly two entries carry `accent` — `ART.stone` (about 1,900 px²) and `ART.hutDoor` (about 1,580 px², the lit doorway at the summit, and the reason the goal reads as warm from tap one). They are the only warm objects on a teal-and-cream hill, and they are the two ends of the journey: the number in your hands, and the door you are taking it toward. `ART.stoneNum` on coral uses `inkOnAccent`, never `surface` (§12).

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the four tweens Test C (instant-cut) patches to duration 0, and no others */
  wheelTo:     { duration: 130, ease: "Sine.InOut", trigger: "the badger container along the road on the chosen heading; stops at the first half-stone between, else at the cairn (x,y set at call)" },
  fetchTo:     { duration: 260, ease: "Sine.InOut", trigger: "the badger, empty-handed, from the cairn it rests at to the next stone on the road (x,y set at call)" },
  wheelBack:   { duration: 260, ease: "Sine.InOut", trigger: "the badger back to its stone after a refusal (x,y set at call)" },
  seat:        { duration: 240, ease: "Sine.Out",  trigger: "the stone out of the barrow into the cairn's cradle (x,y set at call)" },

  /* the world's answer to a move */
  wheelStop:   { angle: 6, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "the barrow's wheel against a kerb — rocks back once and settles; the badger's pose does not change" },
  morph:       { scale: 1.2, duration: 160, ease: "Back.Out", yoyo: true, trigger: "the stone's numeral becoming the cairn's ten as it seats, then settling back to its own number" },
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the shorter run numeral; the stone's numeral on a preview tap of the badger" },

  /* the enacted correction — NOT traversal; never patched by the instant-cut harness */
  kerbRise:    { y: "-=6", duration: 220, ease: "Sine.Out", trigger: "the half-stone rising so its notch comes into view; at L3 the turf parts and the buried kerb appears" },
  markLight:   { alpha: 1, duration: 80, ease: "Sine.Out", trigger: "each roadMark in turn along a run, with tone(\"tap\", k) climbing (from alpha 0.25)" },
  runSettle:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a runNumeral settling as its run's length (from alpha 0, scale 0.6)" },
  plateLift:   { y: "-=4", scale: 1.06, duration: 210, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a cairn naming itself — the correct one after the runs, or a skipped one before them" },
  tiePulse:    { y: "-=8", scale: 1.15, duration: 210, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the tieMark lifting off a half-stone on a five, when neither run is shorter" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "runNumerals, lit roadMarks and the raised kerb, once the correction has played" },
  cradleOpen:  { scaleY: 1.25, duration: 240, ease: "Back.Out", trigger: "the correct cairn's cradle opening on attempt 3" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "cradleRing around the opened cradle (from alpha 0.2)" },

  /* Boot and Finish only */
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the badger at the hut door on the finish screen" },
  cubHop:      { y: "-=14", duration: 180, ease: "Sine.Out", yoyo: true, trigger: "each cub, once, on the finish screen only" },
  breathe:     { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the badger on the Boot and Finish screens only (ART-BIBLE §6)" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                             zone T  0-56  chrome │
 56   ├──────────────────────────────────────────────────────────────┤
      │                                      hut(620,84) [cub][cub]   │
      │                                              100 (660,145)    │
      │                                  90 (540,171)                 │
      │                      80 (420,211)                             │
      │          70 (300,251)                zone W  56-420  THE WORLD│
      │  60 (180,291)      [57]  badger + barrow standing on the road │
      │ 50 (60,331)   road  50 ..|55|.. 60 ..|65|.. 70 .. 80 .. 90 ...│
420   ├──────────────────────────────────────────────────────────────┤
      │  the valley, and the road already climbed   zone H  420-560   │
      │  NO controls at any point during play                         │
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling, static camera, no scrolling. The road rises left to right at 12 px per unit and 4 px of climb per unit; the cairns stand on its upper edge; the badger walks its lower edge; the kerbs (`|55|`, `|65|` …) are set across it at every five. Progress is diegetic and lives in three places, all of them inside the world: the cradles filling from the bottom of the hill upward, the barrow emptying, and the badger's own altitude on the hill. Zone T carries the language picker and nothing else; zone H carries no control during play.

## Visual specification
- Background `THEME.colour.bg`. `ART.hillWash` fills y 40-560 behind everything, non-interactive and never animated. `ART.valleyRoad` centred (30, 500), running off the bottom-left corner.
- **The road:** five `ART.roadSpan`s centred at (120, 376), (240, 336), (360, 296), (480, 256), (600, 216) — the midpoint of each ten-span, at the band's centre line. `ART.roadMark` at (x(v), y(v)) for every v in 51-99 that is not a multiple of five; `THEME.colour.line` at 25 % alpha when unlit, full when lit by a correction. At L1 only the current span's marks are drawn before the child chooses; from L2 they are present but unlit.
- **The cairns:** `GameCore.makeTile` 76 × 108 wrapping `ART.cairn` at (60, 331), (180, 291), (300, 251), (420, 211), (540, 171), with three `ART.cairnCourse` lines at cairn (0, −22), (0, +6), (0, +34); `ART.cairnPlate` at cairn (0, −8) carrying `ART.cairnTen` in 28 px `THEME.font.display` `THEME.colour.ink`; `ART.cradle` at cairn (0, −40). `ART.summitCairn` at (660, 145) with the same furniture at summit (0, −6) and (0, −30) and a plate reading 100. A live cairn shows the tile's 3-px `THEME.colour.structure` outline; an inert one has no hit area and no outline.
- **The half-stones:** `ART.halfStone` at (120, 370), (240, 330), (360, 290), (480, 250), (600, 210). From L2 each carries `ART.tieMark` at its centre. At L3 `ART.turfHump` is drawn in its place at rest and the kerb beneath is revealed by `ANIM.kerbRise` during a correction. `ART.halfNotch` is drawn on the up-road face only while a correction plays.
- **The hero:** `ART.badgerThink` while a choice is open, `ART.badgerPush` while walking, `ART.badgerHappy` for 400 ms on a seated stone, `ART.badgerIdle` on Boot and Finish — all drawn 64 px, centred (x(S), y(S) − 21), facing the direction of travel. `ART.barrow` 56 × 36 at (x(S) + 44, y(S) − 12), clamped to x ≤ 676, holding a stack of `ART.barrowLoad` at 6-px pitch, one per stone not yet placed.
- **The stone in play:** `ART.stone` at (x(S), y(S) − 62) with `ART.stoneNum` centred on it in 26 px `THEME.font.display` `THEME.colour.inkOnAccent`. A seated stone is `ART.stoneSeated` with `ART.seatedNum`, stacked above its cairn's top course at 18-px pitch, first centred at cairnTop − 11; the summit stone seats inside the summit cairn's own top course at (660, 121).
- **The correction:** `ART.runNumeral` in 24 px `THEME.font.display` `THEME.colour.structure`, drawn above the midpoint of the run it measures at (x(mid), y(mid) − 34). `ART.cradleRing` around an opened cradle on attempt 3.
- **The goal:** `ART.hut` 84 × 56 at (620, 84) with `ART.hutDoor` at (620, 94) and two `ART.cub` drawn 26 px at (600, 98) and (636, 98). Drawn from tap one, never animated during play, changed only on Finish.
- **Tap floors and gaps:** cairn tiles 76 × 108 and the summit 88 × 80 (≥ 56 for band 8-9), badger 64 × 64; adjacent cairn boxes 44 px apart, summit 38 px from cairn 90, every element ≥ 16 px from the stage edge. Tab order: the badger, then the live cairns lowest-first.
- **Meaning is never carried by colour alone (§12):** a live cairn differs from an inert one by a 3-px outline and a focus ring, not by tint; a seated stone differs from a held one by size and by shape as well as by losing its coral; a half-stone at L3 differs from a bare road by silhouette.

## Content
Language-neutral (numerals only). The route is fixed by the road: fourteen positions, each with the cairn the stone belongs on and the heading the child must choose, **identical in all three levels** so the badger's climb is monotone whatever the ladder does. Position → cairn / heading:

`1 · 50 down` · `2 · 50 down` · `3 · 60 up` · `4 · 60 down` · `5 · 60 down` · `6 · 70 up` · `7 · 70 down` · `8 · 70 down` · `9 · 80 up` · `10 · 80 down` · `11 · 90 up` · `12 · 90 down` · `13 · 90 down` · `14 · 100 up`

Heading pattern `D D U D D U D D U D U D D U` — no more than two stones in a row round the same way. Cairn 60 legitimately receives three stones in a row, but the child taps up-road, then down-road, then down-road to do it, from three different standing positions, so no positional habit is available to form.

Each level supplies one stone per position. Stone values ascend within every level, so the badger only ever walks forward to fetch.

- **L1** (ones digits 1-4 and 6-9, no fives; road marks drawn while deciding): 52 → 50 · 53 → 50 · **57 → 60** · 61 → 60 · 64 → 60 · **68 → 70** · 71 → 70 · 73 → 70 · 77 → 80 · 82 → 80 · 88 → 90 · 91 → 90 · 93 → 90 · **98 → 100**
- **L2** (fives added, tie-mark shown on every half-stone; road marks present but unlit until a correction): 51 → 50 · 54 → 50 · **55 → 60** · 62 → 60 · 64 → 60 · **68 → 70** · 72 → 70 · 74 → 70 · **75 → 80** · 83 → 80 · **87 → 90** · 92 → 90 · 94 → 90 · **95 → 100**
- **L3** (half-stones grassed over, so the midpoint must be computed; fives; the near-ten cases and the top of the road): 51 → 50 · 53 → 50 · **57 → 60** · 61 → 60 · 64 → 60 · **65 → 70** · 71 → 70 · 74 → 70 · **75 → 80** · 81 → 80 · **87 → 90** · 91 → 90 · 94 → 90 · **96 → 100**

**The third live cairn (misconception 6)** is added for an item exactly when the stone's ones digit `d` names a ten that stands one cairn beyond a flanking cairn — that is, when `10 × d` equals the upper flanking ten plus ten, or the lower flanking ten minus ten — **and never on a five item**, because a five must be a clean two-way decision about the tie rule. Over the three routes that fires on 57 (→ 70), 68 (→ 80), 98 (→ 80), 87 (→ 70): three items at L1, two at L2, two at L3. Every one of those is an output of a named error and therefore legal under §8.1; every ten further away is visibly absurd and is excluded, so no cairn beyond those is ever live.

No stone is a multiple of ten. Every level carries all four decades of the road, at least two stones adjacent to a ten (the near-ten cases 51 / 61 / 71 / 91), and the hundred-crossing on the last item.

## Rules
- **Item count**: 14 (one item = one stone fetched, one heading chosen, one seat).
- **Difficulty progression**: 3 consecutive first-try items → the next item comes from the next level up (cap L3). Three, not two: an item is quick, about 12 s.
- **Adaptation**: a wrong walk, or a non-first-try on 2 consecutive items → the next item comes from one level down (floor L1). The route position is unchanged; only which level supplies its stone changes, so the badger's climb stays monotone.
- **What happens on a correct answer** (the world accepts the move — the walk resolves at a multiple of ten): `ART.badgerPush`, `ANIM.wheelTo` along the road, `ANIM.seat` lifts the stone into the cairn's cradle, `ANIM.morph` turns its numeral into the cairn's ten and settles it back as `ART.stoneSeated`, `tone("correct")`, `ART.badgerHappy` for 400 ms, `ART.barrowLoad` drops by one, `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on first-try items only, every third item and on the fourteenth (a solved-with-help item gets `tone("correct")` and no praise pop). Then `ANIM.fetchTo` carries the badger on to the next stone. Feedback lands about 130 ms after the tap.
- **What happens on a wrong answer** (the world refuses the move). Every refusal begins with `tone("nudge")` and `ANIM.wheelStop` — the barrow's wheel against the kerb, rocking back once — and **the badger's pose does not change**. Then the world freezes, both cairn tiles are `setEnabled(false)`, and the correction plays for about 1.44 s, against the pre-pivot spec's ~0.7 s (correction duration may never fall, GAME-DESIGN-LAW §6):
  - Rounded by the tens digit, or the wrong direction (57 sent down): `ANIM.kerbRise` shows the notch; the road marks light down-road with `tone("tap", k)` climbing and an `ART.runNumeral` settles as 7; the same up-road settles as 3; the 3 `ANIM.pop`s and cairn 60 `ANIM.plateLift`s twice.
  - A five sent down (55 sent to 50): the runs count 5 and 5 and neither pops; `ART.tieMark` lifts off the half-stone with `ANIM.tiePulse` and the up-road cairn's plate pulses.
  - The hundred not crossed (98 sent to 90): the runs count 8 and 2 and the plate that lifts reads 100; on 96 they count 6 and 4.
  - Sent past a cairn (57 sent to 70, 87 sent to 70): the badger wheels past the cairn it should have stopped at and is halted by the first kerb beyond; the **skipped** cairn's plate lifts first, then the two runs count out from the stone as above.
  - A number near its lower ten sent up (51 sent to 60): the runs count 1 and 9 and the 1 pops; cairn 50 pulses.
  At L3 the half-stone is under turf until `ANIM.kerbRise` parts it. Afterwards `ANIM.fadeOut` clears the numerals and the badger wheels back to its stone.
- **Retry behaviour**: attempt 1 unaided → attempt 2 after the full enactment → attempt 3 with the show-me, the correct cairn's cradle opening (`ANIM.cradleOpen`) and holding with `ART.cradleRing` breathing around it; wheeling the stone there completes the item as solved-with-help. No attempt 4. Success is certain.
- **Anti-brute-force guard: THE ONE-WAY WHEEL.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the hill a place (GAME-DESIGN-LAW §6). The named replacement has four parts. (1) *Commitment is a one-way door:* the moment the wheel meets a kerb the item is flagged, and wheeling back does not un-choose; an item touched by any wrong walk never counts as first-try, so the ladder cannot be climbed by guessing and a guesser plays the whole session at L1 and is never handed the fives or the hundred-crossing early. (2) *The candidate set moves; the world does not:* the live pair is always the two cairns flanking the stone, so the pair changes every item — 50/60, then 60/70, then 70/80 — and is never the same pair twice running. This is §6's requirement met exactly, *the candidate set, not the positions, varies per item*: there is no "the left one", because there is a cairn at 60 that is the answer when the stone is 57 and the wrong answer when the stone is 64. (3) *The refusal is instruction, not a cost:* every wrong walk plays the full 1.44 s enactment with the world frozen, so guessing is strictly slower than reading the stone and is answered with teaching rather than with a penalty, which is the only pressure this project permits. (4) *Direction is never a habit:* no more than two stones in a row round the same way, verified across all three routes. **Honest disclosure, undressed:** most items carry **two** live candidates, so the guard is weaker than a four-tile board's — a random tapper is right on half of first attempts and reaches the show-me on about a quarter of items, which is at the edge of F-65's "most items". The seven misconception-6 items across the three routes carry three, which helps but does not change the shape. A four-cairn board was considered and is **forbidden by §8.1**, not merely disliked: a distractor must be an output of the error the item diagnoses, and 80 is not a plausible wrong answer for 52 — it is visibly absurd, so the item would collapse to a coin-flip between the two real candidates while pretending to be a four-way choice. Rounding to the nearest ten has exactly two plausible answers, and parts 1 and 4 are what actually carry this game. A build should **measure** the first-try rate of a random tapper rather than assume it. Related: §13's "never the same slot twice running" has no meaning in a fixed world, so per the MISSIONS 6.3 amendment the guarded category is read as the **direction**, not the cairn.
- **Finish condition**: 14 stones seated, the badger at the hut door. No losing state, nothing that runs down, nothing that can be lost; exactly zero ways a session ends other than by finishing. Nothing in the world ever decays (the RATCHET RULE): no seated stone is taken back, the barrow never gets heavier, the road never crumbles, the cubs never leave, the hut never moves, and a refusal costs a wheel-back and nothing else.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific `STRINGS` (all 11 locales at build, §17), read through `S(key)`:
  - `title` = "The Road to a Hundred"
  - `premise` = "Every stone goes back on the nearest cairn. Then the badger is home."
- **Text budget.** Band 8-9 allows ≤ 2 short sentences including the premise; this game spends the title plus one two-sentence premise, both on the start screen. **The play screen carries no words at all** — only numerals: the stone's number, the six cairn plates, and the two run-lengths during a correction. There is no caption, no prompt line and no item counter, so the 1.6× German and Finnish width allowance costs the layout nothing.

## Sound
`tone("tap")` on a preview tap of the badger; `tone("correct")` on a seated stone; `tone("nudge")` when the wheel meets a kerb; `tone("tap", k)` once per road mark while a run counts out, so the pitch climbs with the distance and the child hears which run is shorter as well as seeing it (F-213); `tone("finish")` once on the finish screen. Sound never carries meaning the screen does not also show: every run's length is also a settled numeral. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (start, All done, Play again, Menu, praise rotation, the title and the premise; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: the whole road, all six cairns, the badger, the stone's numeral, every cairn plate and the hut visible and separate; the road marks legible enough to count).
- [ ] Keyboard operable (Tab: the badger, then the live cairns lowest-first; Enter or Space sets that heading; the focus ring is visible on a cairn against the hill wash).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong heading never ends the session; the show-me always leads to completion; there is no way to finish other than reaching the hut).
- [ ] **Mission.** The hut and both cubs are drawn from the first frame of Play at a constant (620, 84) and never move or react to an item; the badger's x changes on all 14 items; the badger begins item *k+1* where item *k* ended, at a cairn; the cairn it rests at is non-decreasing across the whole session at every level.
- [ ] **The commit reads a position, not a tile id.** Instrument `roadValueAt(badger.x)` at the moment of the seat and assert it equals the seated cairn's ten on every item of a full session. Poison it: remove the half-stones and assert that every heading then succeeds — if a wrong heading still fails with the kerbs gone, an `answer` field has crept in and the game is a worksheet.
- [ ] **Ratchet.** Drive a full session answering wrong twice on every item and assert that the number of seated stones never decreases, that no seated stone changes cairn, that the barrow's load never grows, and that the badger's cairn index never falls.
- [ ] **Instant-cut (Test C).** Patch `ANIM.wheelTo`, `ANIM.fetchTo`, `ANIM.wheelBack` and `ANIM.seat` to `duration: 0` and assert the item log is byte-identical to the un-patched run. Assert separately that total travel time across a session is under 60 s (expected about 8 s).
- [ ] **Freeze (F-42 / M2).** At every decision point, while any cairn tile is enabled, the running tween count is zero — no idle bob, no ambient hill, no cub animating, no badger walking while the child deliberates.
- [ ] **The character is never the consequence.** Screenshot the stage on a refusal at all three levels: the badger's pose is `badgerThink` in every one, the barrow still holds its stone, and no `oops` drawing exists in the build.
- [ ] No progress dots, no item counter and no score are drawn during Play; the finish screen shows the world at its play coordinates with no tally.
- [ ] The two live cairns for an item are always the two flanking tens (57 shows 50 and 60; 96 shows 90 and 100); a third is live only on the seven declared misconception-6 items and never on a five.
- [ ] Sending 57 down-road stops the barrow at the half-stone at 55, raises it, counts 7 and 3 along the road and lifts cairn 60's plate; sending 57 to cairn 70 lights cairn 60's plate first.
- [ ] Seating 57 on cairn 60 morphs the numeral to 60 and settles it back to 57 under the plate; cairn 60 ends an L1 session carrying 57, 61 and 64.
- [ ] No fives appear at the first level; from the second level every half-stone carries the tie-mark, and 55 sent to cairn 50 counts 5 and 5, pops neither, and pulses the tie-mark.
- [ ] At the third level the half-stones are under turf at rest and the kerb is uncovered only by a correction.
- [ ] No stone is a multiple of ten; stone values ascend within every level so the badger only walks forward to fetch.
- [ ] The last item of every level rounds to 100 and seats in the summit cairn at the hut's gate.
- [ ] Every element is ≥ 16 px from the stage edge and every tap target is ≥ 44 real px at a 704-px iframe; the barrow never leaves the stage at the summit.
- [ ] With `?sound=off` nothing is audible, and every run's length is still readable as a numeral.
