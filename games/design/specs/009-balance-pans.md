# 009 — The Tipping Bridge

## Identity
- Slug: `balance-pans`
- Subject / topic: Mathematics / the equals sign as "the same amount on both sides" (relational equality within 20)
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (+/− stepper) with a Check (walked variant: the stepper's two tiles carry the hero one notch out or one notch back along the deck, and the Check is a pin the child pulls in the world, at the equals sign)
- Frame: THE OPENING
- Estimated build size: ~660 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form). Frame contract: `design/MISSIONS.md` FRAME 3, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. The stepper survives intact — two tiles, one instrument, a value that goes up and down — but the value it sets is **where the hero's feet are**, and the display it drives is the plank's angle.

## Learning
- Objective: Makes a two-pan scale balance by setting the one missing number so that the two sides have the same total, in equations written in standard AND non-standard forms (3 + 4 = _ + 5; 7 = _ + 2; _ + 3 = 4 + 3).
- Prerequisites: Adds within 10 with objects; reads numerals to 20.
- Curriculum links: F-107 (the operational "=" persists to grade 4 and predicts algebra difficulty — McNeil), F-21, F-31 row "Equals sign as balance" — conservative 7-9, earliest 6 → 6-8 (US 1.OA.D.7 "understand the meaning of the equal sign"; England Y1-2 "= sign … equivalence"; Germany Klasse 1-2 "Gleichungen"; France CP-CE1 "égalité"; Netherlands groep 3-4; Spain 1º ciclo "= ≠"; Brazil EF03MA11; Sweden åk 1-3 "likhetstecknets betydelse"; Norway 2. trinn "= ≠").
- Common misconceptions (F-107), each with this game's response:
  1. **Operational view: "=" means "the answer comes next" — for 3 + 4 = _ + 5 the child sets 7.** Response: the goat walks out to notch 7 on the open half and pulls the pin. The two creels count themselves in lockstep, the totals chalk themselves onto the creel rims — 7 against 12 — and the deck tips 60 px, which is five 12-px ticks on the ledge face. **The goat's own side is the heavy one and it sinks below its landing**, so the child is standing on the side they loaded and can see it is too much. The argument needs no words and it is sharper than a verdict: *the 7 you put in did not make this side 7.* The number they wrote and the number their side actually weighs are on screen together at visibly different heights, and the ladder says the difference is five.
  2. **Add-all: 3 + 4 = _ + 5 → 12.** Response: the goat walks to notch 12 — the last cut on the deck — and pulls. The right side weighs 17 against 7, a difference of 10, so the deck **drives past the seventh tick, runs out of ladder and hits its stop with a wooden clunk** (`ANIM.stop`): THE OPENING's over-supply behaviour, *the excess had nowhere to go*. It is distinguishable from response 1 twice over — by the stop, and by the chalked total, 17 against 12 — where the pre-pivot spec capped both errors at the same 30° and could not tell them apart by tilt alone. This response is therefore **stronger than the original**. At L3 the add-all value is past the twelfth notch: the child walks to 12, `ART.stepTile` OUT is refused because the hoof finds no further cut, and the over-supply reads as *the deck ran out* — the same class of refusal, declared as a limitation in How it plays.
  3. **Rejecting non-standard forms (7 = _ + 2 "is backwards").** Response: L1 already includes forms with the operation on the right and a bare number on the left, and the equation is chalked straight across the apparatus in the authored order — left creel board, then the `=` carved in the pivot rock, then the right creel board — so `7 = _ + 2` appears exactly as written. But a plank has no answer side: the pivot is the equals sign and the two halves are mirror images of each other. A one-pile creel and a two-pile creel are both just creels with stone in them, and either one can be the side the goat walks out on. **"Backwards" is not a thing that can be seen here** — a stronger response than the pre-pivot one, because the written linear form is still on screen while the apparatus refuses to give it a direction.
  4. **Counting the weights wrongly (misreading the visual).** Response: unchanged in mechanism and never shorter in duration. Every number on a creel board is shown BOTH as a chalked numeral AND as that many stones (`ART.stone`, 15 px, stacked in columns of five) standing in an open-fronted crate; on a wrong pull the two creels count themselves **in lockstep** — the k-th stone of each side badged together (`ART.countBadge`, `ANIM.countStep`, 220 ms apart) with a rising `tone("tap", k)` — so the child sees which side keeps going after the other has run out. Added, not substituted: the 12-px tick ladder cut into both ledge faces makes the **difference** countable too, so the child can count their way to the fix instead of guessing at an angle.

## Mission
**Mission, as the child would say it.** *Get the winter store across.*

**The hero.** A goat (roster, `ART-BIBLE` §3), in side profile, 58 px wide × 66 px tall, standing on the deck with a pack of ten bundles on its back. It is sure-footed, and that is the whole reason it is a goat rather than anything else: **it can stand on a plank that tips without ever being in danger**, so the apparatus can be the consequence and the creature never is (GAME-DESIGN-LAW 3.0). It replaces the owl of the pre-pivot spec, which flew — a hero that can fly makes *"you cannot get across"* a lie — and which stood at (640, 110) nodding for the whole session.

**The want (the visible lack), readable from one still frame, no words, no motion.** A goat on the near ledge with a full pack. A gorge. A plank across it lying crooked, one end lifted clear of its landing. On the far ledge a half-built stone shelter whose roof-line is drawn as a dashed outline, with two kids standing in its doorway looking back. **The lack is doubled and both halves are visible at once: the bridge is not a bridge, and the shelter is not finished.** A seven-year-old reads *"he has to get that stuff over there, and the plank does not reach"* from the photograph.

**The goal.** The shelter, `ART.shelterPier` + `ART.course` at a constant x 612-716 on the far ledge for the entire session, with the two kids (`ART.kidWait`) in its doorway from tap one — Device 1, THE WAITING PARTY. They never react to a correct answer (that would be an approval meter, which F-44 bans); they change only at the finish.

**S — the single state variable: THE GOAT'S NOTCH INDEX `n` ON THE OPEN HALF OF THE DECK (0…12).**

- **Mathematical reading:** `n` is the value in the blank, hence that side's total, hence `difference = left − right`.
- **Physical reading:** `n` is the number of stones in the open creel, hence the plank's angle, hence **whether both ends of the deck are resting on their landings**.

One variable, two readings. The child manipulates the physical reading by walking; the mathematics is what the walking means. **There is no `answer` field anywhere in the game.** The correctness check is a property of the world:

```
worksheet (the pre-pivot spec):  if (stepperValue === item.answer)
game      (this spec):           if (deck.leftEnd.onLedge && deck.rightEnd.onLedge)
```

**The isomorphism — moving IS solving.** *The gap between the plank and the ledge IS the difference between the two sides. Closing the gap is making them equal.*

The plank is pivoted at its centre on a rock. Under each half hangs a stone creel, and those are the two sides of the equation. When the loads are equal the deck lies flat and **both its ends rest on their landings: it is a bridge.** Unequal, and the light end lifts clear of its landing by **12 px per unit of difference** against a 12-px-pitch tick ladder cut into the ledge face — so the gap the goat cannot step over is, countably, the number it is short by. Over-load and its end sinks below the landing by the same amount: a step up it cannot make. That is THE OPENING's rule exactly — *the amount you supply is the size of the opening* — with the aperture symmetric, so partial knowledge produces partial, legible, non-punishing progress in both directions.

And the supplying is the walking. Each half of the deck is notched 0…12 outward from the pivot and each notch holds one loose ballast stone; **every notch the goat walks past, its hoof pushes that stone off the deck into the creel below**, and every notch it walks back, one is lifted back into its cut. `openCreel.blankPile.length === goat.notchIndex`, always, with no intermediate variable and no stored value. The commit handler reads a **position**: `pullPin() → evaluate(goat.notchIndex)`. There is no tile id, no keypad buffer, no selection index, and no walk that happens *after* an answer is registered — the walk **is** the registering (the Displacement rule, GAME-DESIGN-LAW 2.3).

Two things follow that no worksheet version of this content could give:

- **The goat is standing on the thing being weighed** when the pin comes out, so it is committed to its own answer before the world speaks.
- **The pivot rock has `=` carved on it** (`ART.equalsCarve`) and it is the one place on the apparatus that does not move. The child's finger pulls the pin at the equals sign.

**The mark that stays.** Every balanced pull carries one bundle across and lays **one 10-px course of stone on the shelter wall** (Device 2, and the RATCHET RULE). Ten courses take the wall from the doorway head to the eaves. Each laid course carries, chalked at 11 px, the equation that built it, so the finished wall is made out of the child's own ten answers. No course ever comes off, no bundle ever comes back, and a wrong pull delivers nothing — which is not the same as losing something.

**Diegetic progress — two counts moving in opposite directions, both in frame at all times.** (1) The shelter's wall rises one course per delivered bundle under a dashed roof-line drawn from the first tap, so **the distance to the goal is the gap under that dashed line and it visibly shrinks** (L3, VISIBLE DESTINATION; F-44's *"tower built"* literally). (2) The goat's pack empties, one bundle per crossing, ten to none, and it travels with the hero so it is never off screen. `mission.progress` for the M4 gate = (courses laid) + (bundles delivered); monotone by construction. **There is no progress furniture of any kind on the play surface.**

## World
Fixed **720 × 560**, `Scale.FIT`, zero camera movement, one scene, no scrolling. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** The pre-pivot spec's row of progress circles at y = 28 is deleted, not relocated: progress is the wall and the pack.

**Zone W, y 56-420 — THE WORLD.** The hero and the goal are both inside it at every moment of the session, and the goal's (x, y) never changes.

| element | coordinates |
|---|---|
| near ledge (`ART.ledge`) | x 0-130, top surface **y = 214**, face down to y = 420 |
| far ledge (`ART.ledge`) | x 590-720, top surface **y = 214**, face down to y = 420 |
| tick ladders (`ART.tickMark`, `ART.landingLine`) | cut into both inner ledge faces — near x 116-130, far x 590-604; **fourteen ticks 12 px apart, y = 130 … 298**, seven above and seven below the heavier **landing line at y = 214** |
| the gorge | x 130-590 below y = 214; a shallow, still stream (`ART.stream`) drawn as two flat hairlines at **y = 414 and y = 419**. Nothing in this game ever enters it |
| **the deck** (`ART.deck`) | x 120-600, 480 long × 14 thick, top **y = 214**, pivoting about **(360, 221)**. Level at rest, each end resting 10 px onto its landing |
| deck notches (`ART.notchCut`, `ART.notchDeep`) | **12 per half, 19 px pitch outward from x = 360**; right at x = 379, 398 … 588; left at x = 341, 322 … 132. Notches 5 and 10 are cut deeper. Notch 0 is the pivot itself. Each cut holds one `ART.stone`, seated so 9 px of it stands above the deck |
| **pivot rock** (`ART.pivotRock`) | apex (360, 228) tapering to a 76-wide base at y = 400; **`ART.equalsCarve` at (360, 351), 34 px** |
| **the pin** (`ART.pin`) | driven through the pivot head just under the deck, handle at **(360, 250)**, tap target **72 × 72** (x 324-396, y 214-286), on the rock's centre line directly above the carved `=` |
| chains (`ART.chain`) | 14 px, from the deck underside at (250, 228) and (470, 228) to the creel rims at y = 242 |
| **creels** (`ART.creel`, `ART.creelBoard`) — the two sides | open-fronted stone crates, 148 × 126, centred **x = 250** and **x = 470**; rim y = 242, inner floor line y = 332, front board y 334-368 carrying the chalk |
| stones (`ART.stone`) | 15 × 15, 2 px vertical gaps, columns of five (83 px tall) standing on the inner floor line, **columns 26 px apart**, each pile centred under its own chalked numeral, ≤ 5 columns per creel |
| **the equation** | chalked at 26 px across the apparatus at one height — left board `3 + 4`, rock `=`, right board `▢ + 5`, baseline y = 351. **This is the authored linear form, standard or non-standard, unchanged.** `ART.chalkOp` sits on the divider between a creel's two piles; `ART.chalkBlank` is the box holding the live value |
| **the totals** (`ART.totalPanel`, `ART.totalNum`) | 46 × 22 chalk panels centred on each creel rim at (250, 242) and (470, 242). Hidden until the pin is pulled. They hang from the beam, so **the two totals sit at the same height exactly when they are equal** |
| **the shelter** (the destination) | far ledge, x 612-716. Two piers (`ART.shelterPier`) x 612-632 and x 696-716 standing y 176-214 from the first frame; doorway x 632-696 open all session. Ten courses (`ART.course`) 104 × 10, course *i* at y (176 − 10*i*) to (166 − 10*i*), so course 10 closes at y 76-86 under the eaves |
| **the roof-line** | `ART.roofDash`, apex (664, 62), eaves (612, 86) and (716, 86), **dashed from the first frame**; `ART.roofSolid` replaces it on the Finish screen only |
| **the two kids** (`ART.kidWait`) | (648, 196) and (676, 198), 30 px, in the doorway, still, from tap one; they change only at the finish |
| **the goat** (`ART.goatIdle` / `ART.goatThink` / `ART.goatStep` / `ART.goatHappy`) | 58 × 66, hooves on the deck top, body y 148-214 at rest, drawn at its notch's x, with `ART.packBundle` × (10 − delivered) on its back |

**Tilt geometry, derived not invented.** The landing point is 230 px from the pivot, so a lift of 84 px is exactly `asin(84/230)` = **21.5°, the cap**, and 84 px is exactly seven 12-px ticks — the ladder's last mark. `lift = min(84, 12 × difference)` px. The creels hang 110 px from the pivot, so they travel ±40 px and shift 7 px toward the pivot at full tilt (they hang plumb from the beam and never swing): low creel bottom 408 against the stream's upper hairline at 414, **6 px of measured clearance**; high creel rim 202, always below the deck it hangs from. Everything stays inside zone W at full tilt.

**Zone H, y 420-560 — THE HAND. Two tiles, and they are one instrument** (§5.1: an instrument counts as one element).

- `ART.stepTile` **OUT** — 88 × 88 at **(250, 490)**
- `ART.stepTile` **BACK** — 88 × 88 at **(470, 490)**

Each carries `ART.hoofChevron`, and **the chevron flips to match the half the goat is standing on**, so "out" always points the way the goat will actually go. There is no Check button and no value display in zone H: the commit is the pin, in the world, at the equals sign, and the value display has moved onto the equation itself as `ART.chalkBlank`. Gap between the tiles 132 ≥ 12; tap floor 88 ≥ 56.

**BACK is `setEnabled(false)` at notch 0**, and its chevron is drawn against the pivot so the child can see why: the far side of the rock is the known side, and the goat will not cross the equals sign. A quantity does not move across `=` by walking.

**Keyboard**, P9's contract preserved verbatim: **Right / Up = one notch out, Left / Down = one notch back, Enter = pull the pin** — value semantics, not screen direction, so Right always increases whichever half is open. Tab reaches OUT, BACK, PIN in that order.

**F-69 element count.** The goat (1) · the stepper (1 instrument, two tiles) · the pin (1) = **3 interactive elements.** Creels, shelter, kids, ledges, rock and stream are inert scenery and count zero.

**Text budget: 8 English words for the whole game**, exactly the band's ceiling (F6). Play screen: **zero**. Start screen: the title (3 words) and the premise (5 words). Finish: `t("all_done")` and the two chrome buttons. The only glyphs on the play surface are numerals, `+`, `−` and `=`.

## How it plays
1. **Start screen.** Title `S("title")` at (360, 200), 52 px `THEME.font.display` `THEME.colour.structure`; premise `S("premise")` at (360, 258), 24 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.goatIdle` 96 px at (360, 360) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 480); the picker at (16, 16). Never auto-starts.

2. **The gorge is built once, and it is a place.** On entering Play the two ledges, both tick ladders, the stream, the pivot rock with its carved `=`, the pin, the deck with its 24 notches, the two chains and the two creels are drawn, and so are the shelter's piers, the open doorway, the two kids and the dashed roof-line. **Nothing here is rebuilt between items.** The stations never move for the whole session — that is what makes the gorge a location rather than a board, and it is why the P1 tile re-shuffle is unavailable and a different guard is declared (Rules, THE PIN).

3. **Item 1 (L1: `3 + 4 = ▢ + 5`, answer 2; the blank is on the right, so the right half is the open half).** The left creel loads with 7 stones in two piles — 3 (one column) and 4 (one column), 26 px apart — and `ART.chalkNum` "3", `ART.chalkOp` "+", `ART.chalkNum` "4" chalk onto its front board (`ANIM.appear`). The right creel loads 5 stones in one pile and chalks `ART.chalkBlank` "0", `ART.chalkOp` "+", `ART.chalkNum` "5". `ART.equalsCarve` sits between them on the rock at (360, 351); all three read across at one height. Twelve `ART.stone` chocks are seated in the right half's notches. The goat is drawn at notch 0, x = 360, `ART.goatThink`, pack full. The deck is **pinned level and shows nothing**.

4. **The DECIDE state.** OUT, BACK and the PIN are enabled; the goat holds one static pose at one coordinate; **zero tweens are running** (F1 freeze, the M2 assertion). Nothing breathes, drifts or loops. The plank does not move while the child is deciding — this is the pre-pivot spec's *"the scale is held until Check"*, re-sited (Rules, THE PIN).

5. **A step out (the child taps OUT).** `ART.goatStep` swaps in; `ANIM.stride` carries the goat container 19 px to notch 1 at x = 379 (180 ms); the chock in that notch drops (`ANIM.stoneDrop`, 260 ms) and lands on the right creel's blank pile; `ART.chalkBlank` re-chalks to "1"; `tone("tap", 1)`. The goat returns to `ART.goatThink`. Every notch is its own ACT, caused by its own tap. A second tap takes it to notch 2, x = 398, blank "2", `tone("tap", 2)` — the pitch climbs with the value exactly as the pre-pivot stepper did.

6. **A step back.** `ANIM.stride` 19 px inward, the top stone of the blank pile is lifted back into its cut (`ANIM.stoneLift`), the blank re-chalks one lower. This is the stepper's minus and it is the child's own choice; **the RATCHET RULE governs what the WORLD does to the child's marks, and nothing the world does ever removes one** — no laid course, no delivered bundle and no set state is ever taken back.

7. **The commit (the child pulls the pin at (360, 250)).** OUT, BACK and the PIN go `setEnabled(false)`. `ANIM.pullPin` slides the pin clear (160 ms) with a wooden note. The two creels count themselves in lockstep — the k-th stone of each side badged together (`ART.countBadge`, `ANIM.countStep`, 220 ms apart, rising `tone("tap", k)`) — so the child watches one side keep going after the other has stopped. `ART.totalPanel` and `ART.totalNum` chalk onto both rims (`ANIM.chalkIn`). Then the deck answers.

8. **BALANCED (notch 2: 7 against 7).** `ANIM.level` settles the deck flat with a small overshoot; **both ends come to rest on their landings and the plank is a bridge**; `tone("correct")`; `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-try items only. `ART.chalkBlank` fills to "2" and the line reads `3 + 4 = 2 + 5`. Then, in one continuous ACT capped at 1500 ms: the load is lashed and the deck visibly locks (`ANIM.lash`, 300 ms — the phase change is *shown*, so the child does not expect the crossing to un-balance the plank); the goat crosses (`ANIM.cross`, 900 ms) to (600, 214) with `ART.goatHappy`; one `ART.packBundle` leaves its back and one `ART.course` is laid on the wall (`ANIM.courseLay`, 300 ms) carrying the item's equation at 11 px in `ART.courseChalk`. The gap under the dashed roof-line is now 90 px instead of 100.

9. **Between items.** The goat walks back along the deck to the pivot (`ANIM.trotBack`, 900 ms), and **the walk back lifts each stone it passes back into its cut**, so the open creel is empty when it reaches notch 0. The apparatus resets itself by the same physics it uses to set, with no off-screen bookkeeping. The next equation chalks in, the fixed piles load, and the deck re-pins level. The kids do not react. Nothing on the wall changes.

10. **WRONG, attempt 1 (the child sets 7 and pulls — misconception 1).** The creels count in lockstep to 7 and 12; the totals chalk "7" and "12"; the deck tips (`ANIM.tip`, 500 ms) toward the heavier creel by `lift = min(84, 12 × 5) = 60` px, capped at 21.5°, `tone("nudge")`. **The goat's own end sinks 60 px below its landing** — five ticks down the far ledge's ladder — while the near end lifts five ticks clear of its own. The world then **holds, frozen, for 600 ms** while the correction is legible: two totals at different heights, two ladders each reading five. `ANIM.seatPin` re-seats the pin, the deck returns to level, and **every stone stays exactly where the child put it.** Attempt 2 costs a walk, not a rebuild.

11. **The character is not the consequence.** Through all of that the goat stands at its notch and braces — `ART.goatThink`, never an `oops` pose, which is why no `oops` is drawn. It does not fall, slip, sit down, look back at the child, or change in any way. It rides the plank because it is standing on the thing that moved; nothing about the goat is diminished, and its pack, the shelter, the kids and the courses already laid are all untouched. **Reviewer check on the wrong-answer screenshot: if the goat looks different, reject.**

12. **WRONG, attempt 2 (the child sets 12 — misconception 2).** OUT is refused at notch 12 (`ANIM.reachOut` — the hoof comes down where there is no cut and comes back; the stone chocks have run out): the deck cannot take more than twelve. The pull then gives 17 against 7, a difference of 10, so the lift saturates at 84 px, **drives past the seventh tick and hits its stop with a clunk** (`ANIM.stop`, a 60 ms recoil). Distinguishable from attempt 1 by the stop and by the total.

13. **WRONG, attempt 3 — the show-me, re-staged.** After the second wrong pull, **the correct notch lifts 4 px proud of the deck and holds there** (`ANIM.proud`) with `ART.showRing` around it, and `ART.chalkBlank` flashes its correct numeral once per second (`ANIM.hintFlash`, ≤ 1 Hz, no strobe) until the goat is walked onto it. **The ground shows you where to stand.** Walking there and pulling completes the item; it counts as solved-with-help. There is no fourth attempt and no way for a session to end other than by finishing.

14. **Items 2-10.** Per Content and Rules. L1 keeps the blank on the right with sums ≤ 10; L2 moves it to either side and brings the bare-number forms (`7 = _ + 2`), so the open half changes side and the chevrons flip; L3 puts two addends on both sides with sums to 18 and ends with two subtraction items, where a side reading `a − b` is loaded with *a* stones and then *b* of them are lifted out and set on the creel's rim as `ART.stoneLifted`, hollow, countable, and visibly not in the crate.

15. **Finish.** The same world, at the same coordinates, at the end of the day (§10 as amended by MISSIONS.md 9.1.6). The shelter finished — `ART.roofSolid` where the dashes were — with the two kids at its window as `ART.kidHappy`. The goat on the far ledge with an empty pack, `ART.goatIdle`, `ANIM.breathe`. Behind it the plank lying level and pinned across the gorge, both ends on their landings: **the bridge it proved ten times, still standing.** The ten courses each carry their equation, so the summary is not a summary — it is the thing the child built, at play coordinates. `t("all_done")` at (360, 96); `makeButton` `t("play_again")` (250, 510) and `t("menu")` (470, 510); `tone("finish")` once. **No score, no stars, no first-try count anywhere**, and no per-course mark distinguishing a helped course from an unaided one — the approved design drew a kid standing on the wall beside each helped course, which cannot represent more than two of them without becoming a tally, so it is dropped.

Session ≈ 6-7 minutes.

**Honest risks, stated rather than hidden.**

- **R1 · The ACT budget, and it is the one most likely to bite.** Measured estimate per item: ~5.2 notch steps × 180 ms ≈ 940 ms, the pull 160, the deck's answer 500, the lash 300, the crossing 900, the course 300, the walk back 900 ≈ **4.0 s, × 10 ≈ 40 s of caused motion**; plus ~5 wrong pulls × (lockstep count ~2.6 s + tip 500 + hold 600 + re-seat 400) ≈ **20 s**. **≈ 60 s against the 60 s cap.** This must be *measured* by `qa-game`, not trusted. The first cut if it breaches is the inter-item walk back (900 ms × 10 = 9 s), which Test C already proves is free. Traversal alone — the only thing the instant-cut harness patches — sums to ~27 s of a ~360 s session (7.6 %), or ~18 s (5 %) with the walk back cut.
- **R2 · The frame deviates from THE OPENING's world, and I am not going to pretend otherwise.** THE OPENING specifies a corridor of 3-5 barriers seen at once with doors standing open behind. This ships **one barrier opened ten times**, because a balance apparatus that stays countable is 480 px wide and three of them do not fit in 720. What is kept is the frame's identity — *the amount you supply is the size of the opening*, the quantitative-gap refusal, the walk through — and the two-count progress display is borrowed from THE FERRY. A reviewer should call this what it is: **THE OPENING with a compressed corridor.**
- **R3 · "My end is up, so my side is too light" is an inference.** It is correct, and it is exactly what a see-saw teaches, but it is one step. Mitigated because the tilt is the *magnitude* signal only — the primary correction is the lockstep self-count and the two chalked totals, which are explicit. If children read the direction backwards in testing, the fix is on the apparatus, never on the mathematics.
- **R4 · The goat rides the tilt, and a visual critic may read that as jeopardy.** It is structural, not stylistic: position *is* the load, so the goat cannot be moved off the deck at commit without changing the answer. It must be drawn bracing and sure-footed, over a still stream 200 px below, on a plank that tips 21.5° at most, with no fall, no pose change and no sound of alarm. **This is the single screenshot to check on a wrong answer.** If it reads as danger, the honest fix is to lower the tilt cap and lengthen the ladder — not to move the goat.
- **R5 · Physics quibble.** A goat standing on a see-saw at notch 7 would tip it. The pin holds it until commit, the creels are stone against a light kid goat, and after a balanced pull the load is lashed and the deck locks so the crossing changes nothing. An eight-year-old could still object; the answer would be to move the walking line to a fixed kerb beside the deck, which costs the image of the hero standing on the thing being weighed. I would keep the image.
- **R6 · Two meanings for walking.** During DECIDE, walking sets the load; after a balanced commit, walking crosses. That is a genuine two-phase item, and F-42's two-beat cycle carries it, but the phase change is *shown* by `ANIM.lash` or the child will expect the crossing to un-balance the plank.
- **R7 · Unmeasured.** Every claim above about how a seven-year-old reads a lifted plank end is a design judgement. The fox passed every gate three times and was rejected on sight. This wants a local link and a child, not another gate.

## Art registry
```js
const ART = {
  /* the hero and the waiting party — one drawing family, the kid is the same animal at 60% */
  goatIdle:      { kind: "svg", value: LCSArt.get("goat.idle"),      size: 96, fallback: "🐐" },
  goatThink:     { kind: "svg", value: LCSArt.get("goat.think"),     size: 96, fallback: "🐐" },
  goatStep:      { kind: "svg", value: LCSArt.get("goat.step"),      size: 96, fallback: "🐐" },
  goatHappy:     { kind: "svg", value: LCSArt.get("goat.happy"),     size: 96, fallback: "🐐" },
  kidWait:       { kind: "svg", value: LCSArt.get("goat.kid.wait"),  size: 96, fallback: "🐐" },
  kidHappy:      { kind: "svg", value: LCSArt.get("goat.kid.happy"), size: 96, fallback: "🐐" },
  packBundle:    { kind: "shape", shape: "roundRect", w: 16, h: 11, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 3 },

  /* the gorge */
  ledge:         { kind: "shape", shape: "rect", w: 130, h: 206, fill: "surface2", stroke: "line", strokeWidth: 2 },
  tickMark:      { kind: "shape", shape: "rect", w: 14, h: 2, fill: "inkSoft" },
  landingLine:   { kind: "shape", shape: "rect", w: 14, h: 4, fill: "structure" },
  stream:        { kind: "shape", shape: "line", points: [-230, 0, 230, 0], stroke: "line", strokeWidth: 2 },

  /* the instrument being weighed */
  deck:          { kind: "shape", shape: "rect", w: 480, h: 14, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  notchCut:      { kind: "shape", shape: "rect", w: 15, h: 6, fill: "surface2", stroke: "structure", strokeWidth: 1 },
  notchDeep:     { kind: "shape", shape: "rect", w: 15, h: 10, fill: "surface2", stroke: "structure", strokeWidth: 2 },
  stone:         { kind: "shape", shape: "roundRect", w: 15, h: 15, fill: "structure", stroke: "bg", strokeWidth: 1, radius: 3 },
  stoneLifted:   { kind: "shape", shape: "roundRect", w: 15, h: 15, stroke: "inkSoft", strokeWidth: 2, radius: 3 },   // taken out of the crate on a minus side
  pivotRock:     { kind: "shape", shape: "polygon", points: [[-38,172],[38,172],[6,0],[-6,0]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  equalsCarve:   { kind: "text",  value: "=", size: 34, font: "display", color: "structure" },
  pin:           { kind: "shape", shape: "roundRect", w: 20, h: 46, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 8 },
  chain:         { kind: "shape", shape: "line", points: [0, -7, 0, 7], stroke: "inkSoft", strokeWidth: 3 },
  creel:         { kind: "shape", shape: "roundRect", w: 148, h: 126, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 8 },
  creelBoard:    { kind: "shape", shape: "rect", w: 148, h: 34, fill: "surface2", stroke: "structure", strokeWidth: 2 },

  /* the notation, ON the apparatus (GAME-DESIGN-LAW 2.5) */
  chalkNum:      { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  chalkOp:       { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },
  chalkBlank:    { kind: "shape", shape: "roundRect", w: 34, h: 30, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 6 },  // the live value, 26 px inkOnAccent — the ONLY accent entry
  totalPanel:    { kind: "shape", shape: "roundRect", w: 46, h: 22, fill: "bg", stroke: "structure", strokeWidth: 2, radius: 6 },
  totalNum:      { kind: "text",  value: "", size: 20, font: "display", color: "structure" },

  /* the enacted corrections */
  countBadge:    { kind: "shape", shape: "circle", r: 9, fill: "structure" },      // numeral k 12 px bg, on each stone during the lockstep count
  showRing:      { kind: "shape", shape: "roundRect", w: 30, h: 26, stroke: "structure", strokeWidth: 4, radius: 6 },

  /* the destination */
  shelterPier:   { kind: "shape", shape: "rect", w: 20, h: 38, fill: "surface2", stroke: "structure", strokeWidth: 2 },
  course:        { kind: "shape", shape: "rect", w: 104, h: 10, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  courseChalk:   { kind: "text",  value: "", size: 11, font: "display", color: "inkSoft" },
  roofDash:      { kind: "shape", shape: "polygon", points: [[-52,24],[0,-24],[52,24]], stroke: "line", strokeWidth: 3 },
  roofSolid:     { kind: "shape", shape: "polygon", points: [[-52,24],[0,-24],[52,24]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },

  /* zone H — the instrument */
  stepTile:      { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  hoofChevron:   { kind: "text",  value: "›", size: 52, font: "display", color: "structure" }
};
```
No `oops` pose is drawn. The approved design named none and GAME-DESIGN-LAW 3.0 is stricter than the ART-BIBLE pose vocabulary — *the character is never the consequence* — so on every refusal the goat holds `ART.goatThink` and the apparatus does the reacting.

**Exactly ONE `accent` entry exists in the whole game: `chalkBlank`.** One grep, one number. The unknown is the single coral region on the screen at any moment, it is geometric, it is small (34 × 30 = 1020 px²) and it is never adjacent to the goat. The goat's body is cream with `inkSoft` legs and horns, so it carries no `accent` tint and ART-BIBLE §9.4's warm-body clause does not apply to it.

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the tweens Test C (instant-cut) patches to duration 0, and no others */
  stride:     { duration: 180, ease: "Sine.InOut", trigger: "the goat container 19 px to the next notch (x set at call)" },
  cross:      { duration: 900, ease: "Sine.InOut", trigger: "the goat container from its notch to (600, 214) on the far ledge after a balanced pull" },
  trotBack:   { duration: 900, ease: "Sine.InOut", trigger: "the goat container from the far ledge back to notch 0 between items, lifting each stone it passes" },

  /* the world's answer to a move */
  pullPin:    { y: "-=34", duration: 160, ease: "Sine.Out",  trigger: "the pin sliding clear of the pivot head on commit" },
  seatPin:    { y: "+=34", duration: 400, ease: "Back.Out",  trigger: "the pin driven home again after a refusal; the deck returns to level with it" },
  tip:        { duration: 500, ease: "Sine.InOut", trigger: "the beam container to ±asin(min(84, 12×difference)/230) degrees, capped at 21.5°; chains, creels and totals follow; creels counter-rotate so they hang plumb" },
  stop:       { angle: "-=1.5", duration: 60, ease: "Sine.Out", yoyo: true, trigger: "the beam recoiling off its stop when the difference saturates the ladder (over-supply)" },
  level:      { duration: 500, ease: "Back.Out", trigger: "the beam to 0° with a small overshoot on a balanced pull; both ends come to rest on their landings" },
  stoneDrop:  { duration: 260, ease: "Sine.In",  trigger: "a chock leaving its notch and landing on the open creel's blank pile (y set at call)" },
  stoneLift:  { duration: 260, ease: "Sine.Out", trigger: "the top stone of the blank pile returning to its cut on a step back (y set at call)" },
  reachOut:   { x: "+=8", duration: 90, ease: "Sine.InOut", yoyo: true, trigger: "the goat's foreleg toward a notch that does not exist past notch 12: the deck has run out of cuts" },
  lash:       { duration: 300, ease: "Sine.Out", trigger: "the load lashed and the deck visibly locked after a balanced pull, before the crossing (R6: the phase change is shown)" },
  courseLay:  { duration: 300, ease: "Back.Out", trigger: "one course settling onto the shelter wall with its equation" },

  /* the enacted corrections — NOT traversal; never patched by the instant-cut harness */
  countStep:  { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "the k-th countBadge of BOTH creels together, 220 ms apart (from alpha 0, scale 0.5)" },
  chalkIn:    { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "totalPanel and totalNum arriving on both rims after the count (from alpha 0)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new item's chalked numerals, piles and lifted stones (from alpha 0, scale 0.6)" },
  proud:      { y: "-=4", duration: 220, ease: "Back.Out", trigger: "the correct notch lifting proud of the deck at attempt 3 and HOLDING there" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the proud notch (from alpha 0.2)" },
  hintFlash:  { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the correct numeral inside chalkBlank at attempt 3 (from alpha 0); 1 Hz, no strobe" },

  /* Boot and Finish only */
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the goat stepping onto the far ledge at the finish" },
  breathe:    { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the goat on the Boot and Finish screens only (ART-BIBLE §6)" }
};
```
Per ART-BIBLE §9.3, no `kind: "svg"` entry is ever tweened on raw `scale`: the goat, the kids and every stone are wrapped in a container and the container is animated.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                     │  zone T  0-56  chrome only
 56   ├──────────────────────────────────────────────────────────────────┤
      │                                              /\  roof dashes 62  │
      │                                          ┌───────┐  courses 76-176│
      │  ledge                                   │ ▯ kids│  shelter 612-716│
 214  │══════╪═══ deck 120-600, pivot (360,221) ══╪═══════│  landing y=214 │  zone W  56-420
      │ ticks│      goat 58×66 on its notch      │ ticks │  ±7 @ 12px    │
      │      │        ▲ pin (360,250)            │       │               │
      │   ┌──┴──┐   /   =   \                 ┌──┴──┐                    │
      │   │creel│  /  rock   \                │creel│  rims y=242        │
      │   │x=250│ /  (360,351)\               │x=470│  boards y=334-368  │
      │   └─────┘                             └─────┘                    │
      │  ~~~~~~~~~~ stream y=414 / 419 ~~~~~~~~~~                        │
 420  ├──────────────────────────────────────────────────────────────────┤
      │        [ OUT ]                        [ BACK ]     y=490         │  zone H  420-560
      │        x=250 88×88                    x=470 88×88                │  two tiles, ONE instrument
 560  └──────────────────────────────────────────────────────────────────┘
```
Fixed layout, `Scale.FIT`, nothing reflows. **Zone T carries the language picker and nothing else**; progress is the wall rising under the dashed roof-line and the pack emptying on the goat's back. The deck, its 24 notches, the chocks still seated in them, both chains, both creels with their contents and both total panels are **one container rotated about (360, 221)**; the creels counter-rotate about their own hang points so they stay plumb, and the goat's container rides the deck at its notch's local coordinate. Everything else — ledges, ticks, rock, pin, stream, shelter, kids — is drawn outside that container and never moves.

## Visual specification
- Background `THEME.colour.bg`. No progress furniture of any kind on the play surface; `ART.dotEmpty` / `ART.dotFull` are not declared anywhere in this game.
- `ART.ledge` ×2 at (65, 317) and (655, 317). On each inner face, fourteen `ART.tickMark` at y = 130, 142 … 202 and 226, 238 … 298, with `ART.landingLine` at y = 214: near at x = 123, far at x = 597. `ART.stream` ×2 centred (360, 414) and (360, 419).
- `ART.deck` centred (360, 221). Twelve `ART.notchCut` per half at 19 px pitch from x = 360 (notches 5 and 10 use `ART.notchDeep`), each holding one `ART.stone` seated so 9 px stands proud. `ART.pivotRock` with its apex at (360, 228); `ART.equalsCarve` at (360, 351); `ART.pin` at (360, 250) with a 72 × 72 hit box mapped per §3.1, never sampled at its centre.
- `ART.chain` ×2 at (250, 235) and (470, 235). `ART.creel` centred (250, 305) and (470, 305) with `ART.creelBoard` across each front at y 334-368. Stones stand on the inner floor line y = 332 in columns of five, 26 px apart, each pile centred under its own numeral. On a minus side the taken stones are drawn as `ART.stoneLifted` in a row on the creel's rim at y = 234.
- The equation reads across at one height, baseline y = 351: `ART.chalkNum` and `ART.chalkOp` at 26 px on both boards, `ART.chalkBlank` in place of the unknown with its live value at 26 px `THEME.colour.inkOnAccent`. `ART.totalPanel` + `ART.totalNum` centred on each rim at (250, 242) and (470, 242), hidden until a pull.
- `ART.countBadge` sits on each stone in turn during the lockstep count, its k at 12 px `THEME.colour.bg`. `ART.showRing` sits around the proud notch at attempt 3 only.
- `ART.shelterPier` ×2 at (622, 195) and (706, 195); the doorway x 632-696 stays open all session with `ART.kidWait` ×2 at (648, 196) and (676, 198). `ART.course` *i* centred (664, 171 − 10*i*) with `ART.courseChalk` on it at 11 px — a record, not a cue, exactly as spec 041 keeps its completed-span tags at 11 px; the LIVE notation is the 26 px chalk on the boards. `ART.roofDash` centred (664, 62 + 24); `ART.roofSolid` replaces it on Finish only.
- `ART.goatIdle` / `ART.goatThink` / `ART.goatStep` / `ART.goatHappy` at 58 × 66 with its hooves on the deck top, plus `ART.packBundle` × (10 − delivered) stacked on its back. `ART.kidHappy` ×2 on Finish.
- Zone H: two `makeTile` 88 × 88 using `ART.stepTile` at (250, 490) and (470, 490), each labelled `ART.hoofChevron`, the chevron mirrored to point along the open half. Tap floors 88 and 72 both ≥ 56; the gap between the two tiles is 132.
- **Colour discipline.** Exactly one coral region is on screen in any frame — `ART.chalkBlank`, the unknown. Every state cue is carried by shape or position as well: a set notch is empty of its chock, a laid course is a solid band under a dashed outline, a resting deck end overlaps its landing, and the two totals are level or they are not.
- Keyboard: Right/Up steps out, Left/Down steps back, Enter pulls the pin; Tab reaches OUT, BACK, PIN in that order with a visible focus ring. At least one assertion drives a real pointer (§3.1).

## Content
Language-neutral. Items as (left side = right side; the blank marked _; the answer). Every answer is ≤ 10 and every creel total is ≤ 18, so no pile exceeds five columns and no answer is out of the deck's reach.
- **L1** (blank on the right, sums ≤ 10): 3 + 4 = _ + 5 (2) · 2 + 6 = _ + 3 (5) · 5 + 3 = 4 + _ (4) · 6 + 2 = _ + 7 (1) · 4 + 4 = 6 + _ (2) · 7 + 1 = _ + 5 (3)
- **L2** (blank on either side; bare-number forms; sums ≤ 12): 7 = _ + 2 (5) · _ + 3 = 4 + 3 (4) · 9 = 6 + _ (3) · 5 + _ = 8 + 2 (5) · 10 = _ + 4 (6) · _ + 6 = 11 (5) · 8 + 3 = _ + 9 (2) · 12 = 7 + _ (5)
- **L3** (two addends both sides, sums ≤ 18; last two with a subtraction): _ + 6 = 9 + 4 (7) · 8 + 7 = _ + 9 (6) · 11 + _ = 6 + 9 (4) · 13 + 5 = 9 + _ (9) · _ + 8 = 12 + 6 (10) · 9 + 9 = _ + 11 (7) · 10 − 3 = _ + 2 (5) · 15 − 6 = 4 + _ (5)

A bare-number side loads one pile and chalks one numeral with no operator — which is misconception 3's whole point, drawn: a one-pile creel and a two-pile creel are both just creels with stone in them. Play list of 10 per Rules; no repeats; the goat starts each item at notch 0 and the open creel starts empty.

## Rules
- **Item count**: 10 (one item = one weighing and, when it balances, one crossing and one course).
- **Difficulty progression**: 2 consecutive first-pull balances → the next item comes from the next level up (cap L3).
- **Adaptation**: an item that took more than one pull, or a non-first-pull item on 2 consecutive items → the next item comes from one level down (floor L1).
- **What happens on a correct answer** (the world accepts the move — `deck.leftEnd.onLedge && deck.rightEnd.onLedge`): the lockstep self-count runs, both `ART.totalPanel`s chalk in equal, `ANIM.level` settles the deck flat with both ends on their landings, `tone("correct")`, `ART.chalkBlank` fills, the line completes, `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-pull items only (helped items get `tone("correct")` and no praise pop), then `ANIM.lash` → `ANIM.cross` → one `ART.packBundle` leaves the pack → `ANIM.courseLay` lays the course with its equation, capped at 1500 ms. The gap under the dashed roof-line shrinks by one course.
- **What happens on a wrong answer** (the world refuses the move). Every refusal begins with the lockstep count, then the totals, then `ANIM.tip` and `tone("nudge")`; the goat's pose does not change and nothing already built is touched. Then, by anticipated mistake:
  - **Operational "=" (the blank set to the other side's total, e.g. 7 in `3 + 4 = _ + 5`)**: totals 7 and 12, the deck tips 60 px — five ticks — and the goat's own end is the one that sinks.
  - **Add-all (12)**: totals 7 and 17, difference 10, the lift saturates at 84 px, the deck drives past the seventh tick and `ANIM.stop` recoils off the stop with a wooden clunk. Above notch 12 the deck has no cuts and OUT is refused with `ANIM.reachOut`.
  - **Off-by-one (3 for 2)**: totals 7 and 8, the deck tips 12 px — one tick. A small difference is one mark, and it is countable rather than estimated.
  - **Any other value**: the same mechanism; the ladder is the information.
  The world is `setEnabled(false)` and **frozen for the whole enactment** — about 3.6 s at L1 and up to 5.0 s at L3 — so a tap cannot land mid-teaching. The lockstep count at 220 ms per pair is never shorter than the pre-pivot spec's 120 ms left-then-right at the same item, and it adds a comparison the original could not make (GAME-DESIGN-LAW §6: correction duration may not fall, and the world freezes while a correction plays).
- **Retry behaviour**: per item — attempt 1 unaided → attempt 2 after the tilt, the totals and the ladders → attempt 3 with `ANIM.proud` lifting the correct notch, `ART.showRing` around it and `ANIM.hintFlash` on the blank's numeral, until the goat is walked onto it and the pin pulled; solved-with-help. No attempt 4. Success is certain.
- **Anti-brute-force guard: THE PIN.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the gorge a place (GAME-DESIGN-LAW §6). The named replacement is the direct re-staging of the pre-pivot spec's *"the beam does not move while setting; the scale is held until Check"*, and it has four parts. (1) **The absence of signal.** While the goat loads, the plank is pinned level and shows nothing: no tilt, no totals, no chalk on the rims. Walking out and back gives the child exactly zero information about whether they are right, so the value must be computed before it is committed. This is why the stations can be fixed — the notches are a graduated track and a track that moves is not a track — so the guard is the absence of feedback, not the absence of stability. (2) **Commitment is a one-way door.** Once the pin is pulled the plank has spoken; walking back to change the load does not un-pull it. (3) **An item solved after any wrong pull never counts as first-pull**, and first-pull is what the 2-up/2-down ladder reads, so a search costs the child the thing that moves them up a level. (4) **The candidate set, not the positions, varies per item** — the equation, the level and which half is open all change; the notches never do, and cannot. A random walker is not fast here: it gets no feedback until it commits, and every commit costs a full enacted correction with the world frozen through it. That correction is not a penalty — it is the teaching, and it is the reason the guard is affordable.
- **Finish condition**: 10 items, ten courses, an empty pack and a level pinned bridge. No losing state, nothing that can be lost, and exactly zero ways a session ends other than by finishing. Nothing in the world ever decays: no course comes off the wall, no bundle comes back, the kids never leave the doorway, the shelter never moves, the stream never rises, and a wrong pull costs a walk and nothing else (the RATCHET RULE). A step back is the stepper's minus, chosen by the child; the ratchet governs what the world does to the child's marks, and the world never removes one.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, and the praise rotation `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")` through `GameCore.showPraise`.
- Game-specific `STRINGS`, authored in all 11 locales per §17: `title` = "The Tipping Bridge" (3 words) and `premise` = "Get the winter store across." (5 words). **Eight English words for the whole game**, exactly the 6-8 band ceiling, and both appear on the Start screen only.
- The play screen shows **no words at all** — only numerals, `+`, `−` and `=`. Nothing in `LOCALE_DATA` is needed: the apparatus is language-neutral by construction, which is what makes an 11-locale build a translation of two strings rather than a re-authoring.

## Sound
`tone("tap", v)` on each step out or back, the pitch following the notch index 0-12 exactly as the pre-pivot stepper followed the value; `tone("tap", k)` on the k-th badge of the lockstep count so the count climbs; `tone("nudge")` on a tilt; a low wooden note on `ANIM.pullPin` and `ANIM.stop`; `tone("correct")` on a level deck; `tone("finish")` once. Sound never carries meaning the screen does not also show — the deck's angle, the ticks and the two chalked totals say everything the notes do. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (the title, the premise, All done, Play again, Menu and the praise rotation change with the picker; the apparatus is numerals and symbols).
- [ ] Works at narrow width (400-px iframe: both ledges, both ladders, the deck, both creels with their chalked equation, the shelter, the kids and both step tiles all visible in one frame; the tipped deck never leaves the stage).
- [ ] Keyboard operable (Right/Up steps out, Left/Down steps back, Enter pulls the pin; Tab reaches OUT, BACK, PIN; at least one assertion drives a real pointer and the pin's 72 × 72 hit rectangle is mapped, not sampled at its centre, per §3.1).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pulls still ends in a balanced item via the proud notch; nothing can be lost; the session cannot end except by finishing).
- [ ] MISSION — the goat, the shelter, the dashed roof-line and both kids are on screen in the very first frame of item 1, and the shelter's (x, y) is identical in the first and last frames of the session (M1).
- [ ] MISSION — driving a full session, the goat's notch index changes on at least 9 of the 10 items, and every position change is a tween the child caused (M1).
- [ ] RATCHET — a session driven with a wrong answer on every item never decreases `mission.progress` (courses laid + bundles delivered); no course ever comes off the wall; no bundle ever returns to the pack; the kids never move (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.stride`, `ANIM.cross` and `ANIM.trotBack` to duration 0 produces an identical item log: the same notch reached, the same stones dropped, the same pull, the same course laid, in the same order. The harness must NOT patch `ANIM.countStep`, `ANIM.tip`, `ANIM.chalkIn` or `ANIM.proud` — those are the teaching, not the travel, and at duration 0 elaborated feedback collapses to knowledge-of-result.
- [ ] DELETION 1 — remove the loads, the creels and the equation: the plank has nothing to be unequal about, so it is always level, so it is always a bridge; the goat walks across ten times unimpeded and no playable mode survives.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: the correctness check IS `deck.leftEnd.onLedge && deck.rightEnd.onLedge`, so deleting the ledges leaves the predicate with no operands, the pin drives nothing, and there is no goat to change S. **The mutation cannot complete a single item.**
- [ ] FREEZE (M2) — at every decision point of a full session, if OUT, BACK or the PIN is enabled the running tween count is zero; the goat holds one static pose and nothing breathes, drifts or loops during play.
- [ ] The deck does not move while stepping; it moves only after the pin is pulled.
- [ ] Walking to notch 7 in `3 + 4 = ▢ + 5` and pulling sinks the goat's own end 60 px, five ticks below its landing, lifts the far end five ticks above its own, and chalks 7 and 12 on the rims.
- [ ] Walking to notch 2 and pulling levels the deck, lands both ends on their landings, completes the line as `3 + 4 = 2 + 5`, and lays one course.
- [ ] Walking to notch 12 and pulling drives past the seventh tick and recoils off the stop; a thirteenth OUT is refused with the hoof coming back, and the goat's pose is identical in the before and after screenshots.
- [ ] BACK is disabled at notch 0 and the goat never crosses the pivot.
- [ ] Each number on a creel board has the same number of stones beneath it, stacked in columns of five, and the two creels count themselves in lockstep before the totals show.
- [ ] Forms like `7 = _ + 2` appear at the second level with the blank on the left and both chevrons flipped, and `10 − 3 = _ + 2` at the third with three hollow stones on the creel's rim.
- [ ] The goat never leaves notch 0…12 and the blank never shows a negative number.
- [ ] After two wrong pulls the correct notch lifts proud and holds, a ring pulses around it, and the correct numeral blinks gently in the blank once per second.
- [ ] The wall rises exactly one 10-px course per delivered bundle, each carrying its equation, and the gap under the dashed roof-line shrinks to nothing across ten items.
- [ ] Only ONE coral region is on screen in any frame — the blank — and the goat carries no coral at all.
- [ ] Two first-pull balances in a row bring a harder item; an item taking two pulls brings an easier one next.
- [ ] The finish screen re-draws the gorge at its play coordinates with the roof solid, the pack empty and the plank level and pinned; no score, no star, no first-try count.
- [ ] ACT budget: total caused-motion time across a full session is measured and is under 60 s (R1); the traversal sum is reported separately.
- [ ] With `?sound=off` nothing is audible; with sound on, stepping out raises the pitch and stepping back lowers it.
