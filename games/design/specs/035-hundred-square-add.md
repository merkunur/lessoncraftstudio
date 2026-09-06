# 035 — The Water Stair

## Identity
- Slug: `hundred-square-add`
- Subject / topic: Mathematics / two-digit addition by tens-then-ones moves on a hundred square (47 + 25: two moves down, then five moves right)
- Age band: `8-9`
- Interaction pattern: `P7` — trace a path along the openings (tap each opening in turn; the drag-across-the-openings form is the accelerator, the tap form is always available)
- Frame: THE CROSSING
- Estimated build size: ~680 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` (this spec declares a taller stage, 720 × 720, per §2). Pattern contract: `catalogue/PATTERNS.md` P7. Frame contract: `design/MISSIONS.md` FRAME 1 and `design/GAME-DESIGN-LAW.md`. Sibling games: 008 (counting on along a line), 034 (the next ten), **020 `hundred-square-trail`** — the near neighbour, and the one this spec must be checked against by name (see "Declared risks", R3).

## Learning
- Objective: Adds a two-digit number to a two-digit number on a hundred square by tracing the tens as moves straight down (+10 each) and then the ones as moves to the right (+1 each, wrapping to the next row), and names the landing cell as the sum.
- Prerequisites: Reads the hundred square (rows of ten); knows that a cell directly below is 10 more; adds ones within a decade.
- Curriculum links: F-21 (+/− within 100 by mental strategies; place value tens/ones), F-31 row "+/− within 100, mental" — conservative 7-9 → 8-9 (US 2.NBT.B.5 "add within 100 using strategies based on place value"; England Y2-3 "add … two-digit numbers … using concrete objects and pictorial representations"; Germany Klasse 2 "Hundertertafel, Addition im Zahlenraum bis 100"; France CE1-CE2 "addition … tableau des nombres"; Netherlands groep 4-5 "honderdveld, rijgen"; Spain 1º ciclo; Brazil EF02MA06; Sweden åk 1-3 "hundrarutan"; Finland grade 2-3).
- Common misconceptions (F-108, F-105, F-109), each with this game's response — the diagnosis and the count are unchanged from the pre-pivot spec (5 → 5, none dropped); every response is re-staged against the new apparatus per GAME-DESIGN-LAW §3.0, and the one genuine diagnostic loss is named rather than hidden:
  1. **Tens and ones treated as separate numbers — adding the ones first, or moving right for a ten.** Response: the load itself is the decomposition — "+25" arrives on the otter's back as **two `ART.barrel`s and five `ART.jug`s**, and a barrel is drawn as a rod of ten jugs, so the place-value reading of 25 is a physical object before a single move is made. The order is enforced by the world and not by a rule: **the barrels sit on top of the jugs, so no jug can be reached until the tens are spent.** Offering a barrel to the side-notch is refused — the notch is one jug wide and the barrel will not go in (`ANIM.nudge` on the barrel, `ART.openNotch` outlined, the barrel returned to the hod, nothing spent). Then `ART.openDrop` lifts on the terrace-lip below with `ART.plusTenLabel` and, for 800 ms, the whole column below the head reads its numerals at full weight (47 / 57 / 67, `ANIM.colRead`) — the tens move is enacted where it belongs. The mirror case is preserved intact: a jug tipped into a terrace-drop wets a tenth of the drop and no more, it is retrieved unspent, and `ART.openNotch` lifts to the right with `ART.plusOneLabel` for 800 ms.
  2. **Dropping the carry (47 + 25 = 62: 7 + 5 = 12, the ten forgotten).** Response: the crossing is now a **physical spillway** — and **this response carries a declared diagnostic downgrade** (R5). The lane ends at the cliff, there is no notch there, and one jug sends the water round `ART.spillway` into the head of the next lane — 70 → 71 for one jug — so the ten is crossed by walking and cannot be quietly skipped. The `ART.hopBadge` on the spilled plot carries its ordinary jug number, so one jug is still one plot even across the spill. The error is still committable as a tap: at a lane end the child who thinks "the next one is down" pours into the terrace-drop, the jug is not enough for a whole terrace, and the refusal shows `ART.openSpill` and the drop **side by side** for 800 ms — 70 and 71 outlined together against the drop column reading 70 / 80. *What is lost:* the pre-pivot response required the child to choose the tile "62", i.e. to state a wrong belief. There are no tiles, so that stated-belief channel is gone. The teaching is stronger and the diagnosis is weaker, and this is recorded, not swapped quietly.
  3. **Counting on from the wrong place (starting AT 47: "47, 48, …" so the ones land one short, or one past).** Response: over-pouring is now impossible — a jug that is not in the hod cannot be spent. Under-pouring cannot end the leg, because **the leg is not finished until the hod is empty, and the jug still in it IS the next move** (THE LEAP's best property, imported and ratchet-safe: the remainder stays visible and countable in zone H). The error is still committable exactly where it lives: a child who counts the plot they are standing on as "one" pours onto ground that is already wet, it runs straight off, **nothing is spent**, and `ART.openNotch` lifts to the right with its `ART.hopBadge` previewing **1** — jug one fills the *next* plot, not this one. Every jug paints its ordinal permanently on the plot it fills, so the child counts 1 … n on the ground instead of watching a replay.
  4. **Losing place on a long path (F-109).** Response: the hod is the move strip made physical — what is still to pour is a stack of `ART.barrel` and `ART.jug` objects at y = 692, always in frame, one saccade below the plot the otter is standing on, and it shrinks **only** on a successful pour. Behind the otter the `ART.hopBadge` ordinals and the `ART.dropMark` "+10" lip marks are a permanent record of what has been spent. After 2 s without a touch the legal opening's mouth lifts once and **stays** lifted (`ANIM.gateLift`) — the P7 idle cue, a one-shot that holds, never a loop and never a clock.
  5. **Reading the square as a list, not a grid (not seeing "below = +10").** Response: the support fade is unchanged (F-46) — at L1 the whole route is pre-cut as a dashed dry channel (`ART.channelDry`), at L2 only the idle gate-lift guides, at L3 nothing is pre-cut. Added by the new apparatus: a barrel pour is visibly **a whole terrace's worth of drop**, and the column's numerals read at full weight while it runs, so "below = +10" is enacted every time the strategy is *used* and not only when it is got wrong.

## Mission
**Mission, as the child would say it.** *Get the water down the stair to the mill.*

**The hero.** An **otter** (ART-BIBLE §3 roster), an irrigation otter working a terraced hillside, carrying the day's load on its back — a hod of barrels and jugs. Poses used: `idle`, `walk`, `act` (heave / pour), `think`, `happy`. **No `oops` pose is ever drawn in this game.** GAME-DESIGN-LAW §3 forbids the character being the consequence, so a refusal changes the apparatus and the otter simply sets the load back down and looks at the opening. Its body uses the `surface2` tint pair with `inkSoft` for the far limb and carries **no `accent` anywhere**, so the one coral on the screen stays available for meaning (ART-BIBLE §9.2 / §9.4).

**The want — a visible lack, legible in one still frame.** **The mill wheel is dry and still, and an otter pup is sitting beside it waiting for it to turn.** The wheel is at a fixed (684, 630) from the first frame; the pup at (684, 556) never moves and never gets worse — Device 1, the waiting party. Between the water's lowest reach and the mill's leat lies a band of **dry, pale plots**: wet green terraces above, a small flag at the water's front, dry stone below it, a motionless wheel at the bottom right. A child glancing at the screen knows how far down the hill the water has got and how far it still has to go, with nothing moving and no glyph to read.

**The goal.** The water's head enters the mill's leat lane (lane 10, plots 91-100). It is on screen from the first tap and its coordinate never changes.

**The single state variable.** **S = the plot the water's head has reached on the hundred square.**

- **Mathematical reading:** the running total — the leg's start number plus everything poured so far. At the start of a leg S = a; when the hod is empty S = a + b, which is the sum.
- **Physical reading:** which terrace plot the water has run down to on the hillside, and therefore where the otter is standing. The otter walks with the head; it is never anywhere else.

One variable, two readings. The hod's remaining cargo is **not** a second state — it is the un-applied remainder of the transition, `b − (S − a)`, drawn rather than stored. The goal predicate on S: *the hod is empty* ends the leg; *S has entered the leat lane* is the mission.

The correctness check is one line, and it never reads an `answer` field:

```
worksheet:  if (tapped === item.answer)                        // a verdict handed down
game:       if (world.accepts(head, tappedPlot, topOfHod))     // is that opening cut, and is that the load on top?
```

**The isomorphism — the answer is the footing.** Water running downhill *is* the hundred square, with nothing left over.

- A **barrel** poured into a terrace-drop takes the water down a whole terrace: **+10**, straight down a column. A barrel is drawn as ten stacked jugs — it **is** a base-ten rod, on the otter's back, in the same frame as the plot numerals.
- A **jug** poured into a side-notch takes the water one plot along: **+1**.
- At the end of a lane there is no notch — the lane ends at the cliff. The only opening is the **spillway**, and one jug sends the water round and down into the head of the next lane: **70 → 71 for one jug.** The wrap is not a rule the game applies; it is where water goes when a channel runs out, and the child watches the ten get crossed for the price of a single unit.

So the second addend is not a number to be processed — it is **cargo, decomposed into tens and ones before the first move**, and every pour spends one piece of it. Moving is solving: the sum is not computed and then walked to, it is **where the otter is standing when the hod is empty.** The commit handler reads the water head's plot index — `answer = f(character.position)` literally — and there is no object anywhere on the screen bearing the sum.

The tens-before-ones ordering, which is the objective's own strategy, is enforced by the world and not by the code: **the barrels are stacked on top of the jugs, so no jug can be reached until the barrels are off.** F-61 in its purest form.

**The mark that stays.** Every plot the water has ever reached stays wet for the session, with its jug ordinal, its "+10" lip marks and its spillway chutes still drawn. By leg 12 the hillside is a map of every sum the child made.

**The one honest amendment to the objective.** The pre-pivot spec ended each item with a P1 tap on one of three numeral tiles ("names the landing cell as the sum"). Under the Displacement rule that tail is a worksheet, and MISSIONS.md §3 prescribes its deletion for the identical case (008 frog-hops: *"delete the three answer tiles; where it lands is the answer"*). **The naming act becomes a reading act:** the plot's numeral, pale on every dry plot, goes dark and full size the moment the water reaches it, and the tally board completes "47 + 25 = 72". That satisfies GAME-DESIGN-LAW §2.5 — the notation is visible in the same frame as the fiction at the moment of the answer — but it **is** one retrieval act fewer than the pre-pivot spec had, and that is recorded in R5 rather than glossed.

**Deletion tests (GAME-DESIGN-LAW §2.2).**
- **A — delete the maths.** Strip the numerals from the plots, make barrels and jugs interchangeable, and make every drop and notch the same size and always open. Every opening now accepts every pour, the water goes wherever it is sent, there is no reason to prefer any move, and there is no condition under which a leg is finished — the hod empties into an arbitrary plot and the mill is reachable by pouring in any direction. **Nothing playable survives: what is left is a hose with no target.**
- **B — delete the mission.** Remove the otter, the hod, the head-gate, the mill and the pup. There is now no thing that pours, no cargo to spend, no head to advance and **no commit path at all** — the plots are a printed hundred square with numbers on it. (The pre-pivot spec survived this deletion: remove the bee and the answer tiles still work.) **Nothing playable survives.**
- **C — delete the walking.** Patch every traversal tween to `duration: 0`. The session plays **identically**: the leg log, the sequence of legs, every refusal, every correction, every first-try flag and the final hillside are the same. Every state transition is caused by a tap and resolved synchronously; nothing waits on a tween. The one timing-coupled thing is the 2-second idle cue, measured **from the moment the world re-freezes at the end of ACT**, so at duration 0 it simply starts sooner and is not a leg-log event. **The walk is pure consequence — motion the child caused, never motion the game needs.**

## World
**Stage 720 × 720** — the taller stage BUILD-CONVENTIONS §2 permits for a grid, as 020 already uses. The pre-pivot spec declared 720 × 640 with a scrolling **six-row window**; the full ten rows are worth the extra 80 px, because they put the goal, the whole apparatus and every start plot in **one frame that never rebuilds**, which is what makes the world persist pixel-for-pixel (MISSIONS.md L2, F-42/F3).

```
y   0 +------------------------------------------------------------+
      | [lang picker 16,16]        chrome only - no progress meter  | zone T   0- 52
 52   +------------------------------------------------------------+
      | [ 1][ 2][ 3][ 4][ 5][ 6][ 7][ 8][ 9][10]  lane j=0  y= 90   |
      | [11]...                                       j=1   y=150   |
      | [21][22][23]...          head-gate on the leg's start plot  | zone W  52-664
      | [31]...                                             y=270   |  the hillside
      | [41]...[47 otter]...                          j=4   y=330   |  10 x 10 plots
      | [51]...   wet plots stay wet all session             y=390   |
      | [61]...                                             y=450   |
      | [71]...   front flag at the lowest plot ever reached y=510   |
      | [81]...                                             y=570   |      pup (684,556)
      | [91]..................................[100]   j=9   y=630   | leat  wheel (684,630) r30
664   +------------------------------------------------------------+
      | "47 + 25 = ?"  (150,692) 28px  |  hod: [barrel][barrel][jug x5] | zone H 664-720
720   +------------------------------------------------------------+
```

**Zone W — the world (52-664).** The board, the hero, the destination and the history, all of it, all session.

*Plot geometry (the whole game rests on this).* Plot *n* in 1 … 100: `k = (n − 1) mod 10`, `j = floor((n − 1) / 10)`; **centre x = 74 + 60k, centre y = 90 + 60j**; cell **56 × 56**, radius 8, pitch 60. Worked: plot 1 (74, 90) · plot 10 (614, 90) · plot 23 (194, 210) · plot 47 (434, 330) · plot 70 (614, 450) · plot 71 (74, 510) · plot 72 (134, 510) · plot 91 (74, 630) · plot 100 (614, 630). Grid extent x 46-642, y 62-658 — inside zone W with a 46 px left margin and a 78 px right gutter.

*The mill yard* occupies that right gutter, inside zone W, at coordinates that never change for the whole session: the **leat** (`ART.leat`) from (642, 630) to (656, 630); the **wheel** (`ART.millWheel`) centred **(684, 630)**, r 30, drawn still and pale; the **mill house** (`ART.millHouse`) centred (684, 500), 72 × 120 — its right wall is cropped by the stage edge, by design, so the yard reads as continuing off-screen; the **otter pup** (`ART.pupWaiting`) at **(684, 556)**, 44 px, sitting. None of the four is interactive and none of them ever changes during play.

*Plot states.* Meaning is never carried by colour alone (BUILD-CONVENTIONS §12) — fill, stroke weight and numeral weight all change together:

| state | drawn as |
|---|---|
| dry | `ART.plotDry` (surface fill, 1 px `line`) with `ART.plotNumDry`, 20 px, `inkSoft` |
| wet | `ART.plotWet` (structureSoft fill, 2 px `structure`) with `ART.plotNumWet`, 20 px, `ink`. **Permanent for the session.** |
| the head | `ART.plotHead` (structureSoft fill, 3 px `structure`) with the otter standing on it at (cx, cy − 6), 40 px |
| an opening | `ART.openDrop` / `ART.openNotch` / `ART.openSpill` on the shared edge, plus `ART.openTarget` on the plot beyond it — **the screen's only coral** |
| pre-cut route (L1) | `ART.channelDry`, a dashed `inkSoft` outline through the plots the leg will take |

*Permanent history, painted once and never removed:* `ART.hopBadge` (a 20 px `structure` disc at a wet plot's top-left carrying the ordinal of the jug that filled it, 1 … n) · `ART.dropMark` (a small "+10" on the lip between the two plots a barrel connected) · `ART.spillway` (a dashed chute from a lane's last plot round to the next lane's head) · `ART.frontFlag` (a 20 px pennant at the lowest plot the water has *ever* reached).

*The head-gate* (`ART.headGate`) is a 40 × 14 `structure` glyph on the top edge of the leg's start plot, so the leg's origin is on the world and not only on the tally board.

**Zone H — the hand (664-720). It holds no controls.** The world is the hand: the only things a child ever taps are the openings on the hillside, which are in zone W. Zone H carries two displays, one saccade below the plot the otter is standing on:

- **The tally board** — `ART.eqText`, 28 px, at (150, 692), `wordWrap` 260: "47 + 25 = ?", completing to "47 + 25 = 72" when the hod empties. This is the abstract notation GAME-DESIGN-LAW §2.5 forbids the mission to replace; it is required, not decorative.
- **The hod** — the cargo still to pour, drawn as objects from a cursor starting at x = 330, y = 692: `ART.barrel` 34 × 46 at pitch 40, then `ART.jug` 22 × 30 at pitch 26. Worst case (51 + 38) is 3 barrels + 8 jugs = 328 px, ending at x = 658, clear of the 16 px safe margin. A piece leaves the hod the instant its pour lands.

**The hod is not a fuel gauge, and a reviewer will ask.** It empties **only by success** — a refused pour spends nothing — and emptying it *is* finishing the leg. It is the inverse of a meter that runs out, so GAME-DESIGN-LAW §3.1's "a meter empties" ban does not bite.

**Interactive elements (F-69, §5.1 reading).** The otter (1) plus the 2-3 live openings. Every other plot is inert and is not a registered target. Four elements at most, well inside 10.

## How it plays
1. **Start screen.** Title from `STRINGS.title` ("The Water Stair"), the otter (`ART.otterIdle`, 96 px) at (360, 300), the `start` button, the language picker. The wheel and the pup are drawn behind it, still. **Never auto-starts.**

2. **Leg 1 (L1: 23 + 12).** The hillside builds once and is never rebuilt. `ART.headGate` draws on plot 23 (194, 210); plot 23 becomes `ART.plotWet` + `ART.plotHead`; the otter stands on it (`ART.otterIdle`, 40 px, at (194, 204)). The tally board reads "23 + 12 = ?". The hod loads: one `ART.barrel` centred (350, 692) and two `ART.jug`s centred (403, 692) and (429, 692). At L1 `ART.channelDry` pre-cuts the route through plots 33, 34, 35. Because the barrels are on top, the only live opening is the terrace-drop: `ART.openDrop` (56 × 22) on the shared edge at (194, 240) carrying `ART.plusTenLabel`, and `ART.openTarget` on plot 33. Stage frozen, zero tweens running.

3. **A barrel pour (the correct move).** The child taps plot 33 (194, 270). The otter plays `ART.otterAct` with `ANIM.heave` (120 ms), the barrel leaves the hod, `ANIM.pourDown` runs the water down the lip (400 ms), plot 33 becomes `ART.plotWet` and its numeral swaps to `ART.plotNumWet` with `ANIM.numFull`, `ART.dropMark` "+10" is painted permanently on the lip between 23 and 33, and the otter walks (`ART.otterWalk` → `ANIM.walkTo` → `ART.otterIdle`) to (194, 264). `GameCore.tone("tap", 1)`. The hod now holds two jugs; the barrels are gone, so the live opening becomes `ART.openNotch` (26 × 56) on the right edge at (224, 270) with `ART.plusOneLabel`, and `ART.openTarget` on plot 34. Freeze.

4. **A jug pour.** The child taps plot 34 (254, 270). `ANIM.heave`, `ANIM.pourRight` (240 ms), plot 34 wet, `ART.hopBadge` **1** painted at (234, 250) with `ANIM.badgeIn`, the otter walks to (254, 264), `tone("tap", 2)`. Then plot 35 the same way, `ART.hopBadge` **2**, `tone("tap", 3)`.

5. **The leg completes.** The hod is empty, so S = 35. The landing plot's numeral plays `ANIM.numFull`, the tally board completes "23 + 12 = 35" with `ANIM.eqComplete`, the otter plays `ART.otterHappy`, `GameCore.showPraise` takes the next praise key, `tone("correct")`. `ART.frontFlag` moves to plot 35 if 35 is deeper than the current flag (it is). After 800 ms the next leg's `ART.headGate` draws and the otter walks up through its own wet channel to it (`ANIM.walkTo`, ~400 ms). **It never teleports.**

6. **The five refusals.** Every refusal is a physical event with a legible cause, it costs a step and never a life, and **the otter's own state never changes** — it heaves, it does not fit, it sets the load down and looks at the opening (`ART.otterThink`). **The world is frozen for the whole correction** (F-40, EF 0.49 vs KR 0.05).
   - **(a) A barrel offered to a side-notch** (the child moves right while tens are still on top). The otter hefts the barrel toward the notch; the notch is one jug wide and the barrel will not go in — `ANIM.nudge` on the barrel, `ART.openNotch` outlined, the barrel goes back on the hod, nothing spent. Then `ART.openDrop` plays `ANIM.gateLift` on the lip below with `ART.plusTenLabel`, and for 800 ms the column below the head reads its numerals at full weight (`ANIM.colRead`: 47 / 57 / 67), so "below is ten" is seen in the act.
   - **(b) A jug tipped into a terrace-drop** (the child moves down when only ones remain). One jug wets a tenth of the drop and no more; it is retrieved unspent. Then `ART.openNotch` plays `ANIM.gateLift` to the right with `ART.plusOneLabel` for 800 ms.
   - **(c) A pour onto ground that is already wet** (the child counts the plot they are standing on as "one"). It runs straight off (200 ms), **nothing is spent**. `ART.openNotch` lifts to the right and its `ART.hopBadge` previews **1** — jug one fills the *next* plot, not this one.
   - **(d) A pour two or more plots away.** The channel is not cut that far. The near opening plays `ANIM.nudge`; nothing is spent.
   - **(e) At a lane end, a pour into the drop below** (the classic carry error: "the next one is down"). The jug is not enough for a whole terrace; then `ART.openSpill` lifts with `ART.plusOneLabel` and `ART.spillway` draws, with plot 70 and plot 71 outlined together and the drop column reading 70 / 80 — *down is ten, round is one*, both shown at once for 800 ms.
   The support ladder is **per move, not per leg**, so there is more support than before, not less. First refusal on a leg: the enacted correction above. Second and any later refusal: the correction again, then `ART.showRing` appears **static** (4 px `structure`) on the legal destination plot with one 300 ms `ANIM.showMe` lift, **and it holds until it is tapped**. There is no attempt cap and the leg always completes, because the show-me does not expire (F-46).
   *The idle cue.* After 2 s with no touch the legal opening plays `ANIM.gateLift` **once** and stays lifted. Targets are disabled for the 200 ms of that lift and re-enable when it ends, so the F-42 assertion — *whenever any target is enabled, zero tweens are running* — holds at every decision point. The pre-pivot `pulse` (`yoyo, repeat 2`) and `showMe` (`repeat: -1`) were both loops running while a choice was open; both are now one-shot-and-hold. A persistent cue is also better pedagogy than a blinking one.

7. **Finish.** After 12 legs the Finish scene draws **the same world container, unchanged**, at a uniform scale of 0.78 centred on (330, 385) — every wet plot, every jug ordinal, every "+10" lip mark and every spillway chute in the same relative place the child put it. The uniform scale is the only change, and it exists to free y 0-150 and y 630-702 for chrome the 720-tall stage cannot otherwise fit; the world's own geometry is untouched. The water is in the leat lane, `ART.millWheel` **turns** (`ANIM.wheelTurn` — a loop is allowed on the Finish screen, ART-BIBLE §6), and `ART.pupStanding` replaces `ART.pupWaiting` beside it. `t("all_done")` at (360, 60), 44 px `structure`; the otter (`ART.otterHappy`, `ANIM.celebrate`) on the last plot it stood on; the first-try record as twelve marks at y = 112, x = 239 + i × 22 — `ART.dotFull` for a leg walked with no refusals, `ART.dotEmpty` for one that took the show-me — with `t("question_x_of_y")` beneath it at (360, 140); `play_again` (250, 666), `menu` (470, 666); `GameCore.tone("finish")` once; `GameCore.reportHeight()`. The twelve equations are not listed: they are on the ground, as the route. **No score, no count of right answers, no stars.**

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  /* --- the hero. Poses per ART-BIBLE §3; no `oops` pose is ever drawn in this game (§3 of
         GAME-DESIGN-LAW: the character is never the consequence). Body = the surface2 tint pair,
         far limb inkSoft; NO accent anywhere on the otter, so the one coral stays state coral. --- */
  otterIdle:   { kind: "svg", value: LCSArt.get("otter.idle"),  size: 40, fallback: "🦦" },
  otterWalk:   { kind: "svg", value: LCSArt.get("otter.walk"),  size: 40, fallback: "🦦" },
  otterAct:    { kind: "svg", value: LCSArt.get("otter.act"),   size: 40, fallback: "🦦" },  // heave / pour
  otterThink:  { kind: "svg", value: LCSArt.get("otter.think"), size: 40, fallback: "🦦" },
  otterHappy:  { kind: "svg", value: LCSArt.get("otter.happy"), size: 40, fallback: "🦦" },
  /* the waiting party (Device 1) — the same master drawing at a smaller size; no second animal */
  pupWaiting:  { kind: "svg", value: LCSArt.get("otter.idle"),  size: 44, fallback: "🦦" },
  pupStanding: { kind: "svg", value: LCSArt.get("otter.happy"), size: 44, fallback: "🦦" },  // Finish only

  /* --- the mill yard: fixed coordinates, never interactive, never changes during play --- */
  millHouse: { kind: "shape", shape: "roundRect", w: 72, h: 120, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },
  millWheel: { kind: "svg", value: "<svg viewBox='0 0 60 60'>rim + twelve spokes + hub, 3 px var(--structure) on var(--surface2)</svg>", size: 60 },
  leat:      { kind: "shape", shape: "rect", w: 14, h: 10, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },

  /* --- the hillside: 100 plots, pitch 60 --- */
  plotDry:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface",       stroke: "line",      strokeWidth: 1, radius: 8 },
  plotWet:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  plotHead:   { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  plotNumDry: { kind: "text",  value: "", size: 20, font: "display", color: "inkSoft" },
  plotNumWet: { kind: "text",  value: "", size: 20, font: "display", color: "ink" },
  channelDry: { kind: "shape", shape: "roundRect", w: 56, h: 56, stroke: "inkSoft", strokeWidth: 2, radius: 8 },  // L1 pre-cut route, dashed [6,4]

  /* --- the openings: the screen's ONLY accent. A mouth on the shared EDGE, plus a ring on the
         plot beyond it (which is the 56 x 56 tap target). See Visual specification for why the
         mouth is a lip bar and not a filled 56 x 56 plot. --- */
  openDrop:     { kind: "shape", shape: "roundRect", w: 56, h: 22, fill: "accent", stroke: "accent", strokeWidth: 0, radius: 6 },  // terrace-drop lip, below the head
  openNotch:    { kind: "shape", shape: "roundRect", w: 26, h: 56, fill: "accent", stroke: "accent", strokeWidth: 0, radius: 6 },  // side-notch lip, right of the head
  openSpill:    { kind: "shape", shape: "roundRect", w: 26, h: 56, fill: "accent", stroke: "accent", strokeWidth: 0, radius: 6 },  // spillway mouth, LEFT edge of the next lane's head
  openTarget:   { kind: "shape", shape: "roundRect", w: 56, h: 56, stroke: "accent", strokeWidth: 3, radius: 8 },
  plusTenLabel: { kind: "text",  value: "+10", size: 16, font: "display", color: "inkOnAccent" },
  plusOneLabel: { kind: "text",  value: "+1",  size: 16, font: "display", color: "inkOnAccent" },

  /* --- the permanent record: painted once, never removed (the RATCHET RULE) --- */
  hopBadge:  { kind: "shape", shape: "circle", r: 10, fill: "structure" },   // jug ordinal 13 px display in bg, at the plot's top-left
  dropMark:  { kind: "text",  value: "+10", size: 14, font: "display", color: "structure" },
  spillway:  { kind: "shape", shape: "arc", r: 30, stroke: "structure", strokeWidth: 3 },   // dashed [6,4], lane end round to the next lane's head
  frontFlag: { kind: "shape", shape: "polygon", points: "0,0 18,7 0,14 0,0", fill: "structure" },  // 20 px pennant on a 1 px staff
  headGate:  { kind: "shape", shape: "rect", w: 40, h: 14, fill: "structure", stroke: "structure", strokeWidth: 2 },

  /* --- the load (zone H). A barrel IS a base-ten rod: ten stacked jug bands, visibly. --- */
  barrel: { kind: "svg", value: "<svg viewBox='0 0 34 46'>staved cask, 3 px var(--ink) outline, var(--surface2) body, TEN horizontal var(--inkSoft) bands</svg>", size: 34 },
  jug:    { kind: "svg", value: "<svg viewBox='0 0 22 30'>one jug, 2 px var(--ink) outline, var(--surface2) body, one var(--inkSoft) band</svg>", size: 22 },

  /* --- notation and chrome --- */
  eqText:   { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  showRing: { kind: "shape", shape: "roundRect", w: 64, h: 64, stroke: "structure", strokeWidth: 4, radius: 10 },
  dotEmpty: { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },   // FINISH SCREEN ONLY
  dotFull:  { kind: "shape", shape: "circle", r: 8, fill: "structure" }                 // FINISH SCREEN ONLY
};
```

## Animation registry
```js
const ANIM = {
  pourDown:   { duration: 400, ease: "Sine.In",    trigger: "a barrel pour: the water runs down the terrace-drop; the destination plot's fill tweens surface -> structureSoft" },
  pourRight:  { duration: 240, ease: "Sine.Out",   trigger: "a jug pour: the water runs one plot along" },
  pourSpill:  { duration: 500, ease: "Sine.InOut", trigger: "a jug into the spillway: the water rounds the chute into the next lane's head" },
  walkTo:     { duration: 400, ease: "Sine.InOut", trigger: "the otter following the head to its new plot, or walking up its own wet channel to the next head-gate; x/y set by the game" },
  heave:      { scale: 1.06, duration: 120, ease: "Back.Out", yoyo: true, trigger: "the otter lifting a piece off the hod (otterAct); the container is tweened, never a kind:'svg' scale (ART-BIBLE §9.3)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused piece: the barrel that will not enter the notch, the jug that will not fill a terrace, a pour two plots away" },
  gateLift:   { y: "-=8", alpha: 1, duration: 200, ease: "Sine.Out", trigger: "an opening's mouth lifts ONCE and STAYS lifted (from alpha 0.35) — the 2-s idle cue and the enacted correction. No yoyo, no repeat: F-42/F1 forbids a loop while a choice is open, so targets are disabled for these 200 ms and re-enable on complete" },
  numFull:    { scale: 1.25, duration: 200, ease: "Back.Out", trigger: "a plot numeral swapping plotNumDry -> plotNumWet as the water reaches it" },
  colRead:    { alpha: 1, duration: 260, ease: "Sine.InOut", trigger: "during a correction, the column below the head reads its numerals at full weight, staggered 120 ms, held 800 ms, then back to pale" },
  badgeIn:    { scale: 1, alpha: 1, duration: 180, ease: "Back.Out", trigger: "a hop badge painted on a newly wet plot (from alpha 0, scale 0.6). It never leaves" },
  showMe:     { y: "-=8", alpha: 1, duration: 300, ease: "Sine.Out", trigger: "second refusal: ART.showRing appears STATIC on the legal destination plot and the mouth lifts once. It holds until tapped — never a repeat" },
  eqComplete: { scale: 1.15, duration: 200, ease: "Back.Out", yoyo: true, trigger: "the tally board completing '47 + 25 = 72' when the hod empties" },
  wheelTurn:  { angle: 360, duration: 4000, ease: "Linear", repeat: -1, trigger: "FINISH SCREEN ONLY — the mill wheel turning (ART-BIBLE §6 permits a loop on the finish screen)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish screen otter" }
};
```

## Screen layout
Stage **720 × 720** (BUILD-CONVENTIONS §2 taller stage; `height: 720` in the Phaser config, nothing else changes). Fixed layout, FIT scaling, static camera, no scrolling. Zone T carries the language picker and **no progress meter of any kind** — progress is diegetic (the wet channel, the front flag, the shrinking dry gap, the hod).

```
y   0 +------------------------------------------------------------+
      | [lang 16,16]                                               | zone T   0- 52
 52   +------------------------------------------------------------+
      | [ 1][ 2][ 3][ 4][ 5][ 6][ 7][ 8][ 9][10]   lane j=0  y= 90  |
      | [11][12][13][14][15][16][17][18][19][20]         j=1  y=150 |
      | [21][22][23][24][25][26][27][28][29][30]         j=2  y=210 |
      | [31][32][33][34][35]...                          j=3  y=270 | zone W  52-664
      | [41]...[47 OTTER]...                             j=4  y=330 |
      | [51]...                                          j=5  y=390 |
      | [61]...                                          j=6  y=450 |
      | [71][72]...                     flag             j=7  y=510 |     pup   (684,556)
      | [81]...                                          j=8  y=570 |     house (684,500)
      | [91]......................................[100]  j=9  y=630 | leat  wheel (684,630)
664   +------------------------------------------------------------+
      | "47 + 25 = ?" (150,692)   |  hod from x=330, y=692          | zone H 664-720
720   +------------------------------------------------------------+
```

Plot *n*: `k = (n − 1) mod 10`, `j = floor((n − 1) / 10)`, centre **(74 + 60k, 90 + 60j)**, cell 56 × 56, pitch 60, radius 8. Grid extent x 46-642, y 62-658. The mill yard fills the 78 px right gutter at fixed coordinates given in World. The Finish scene draws this identical container at scale 0.78 centred on (330, 385) — see How it plays step 7.

## Visual specification
- Background `THEME.colour.bg`. Scenery is one low-contrast wash (ART-BIBLE §4): the terraced hillside behind the plots in `THEME.colour.surface2` with `THEME.colour.line` terrace edges; nothing else, nothing animated, nothing in front of a tappable thing.
- **The plots.** 100 × `ART.plotDry` at the geometry above, each with its number as `ART.plotNumDry` (20 px `THEME.font.display`, `THEME.colour.inkSoft`) centred. A plot the water has reached is redrawn as `ART.plotWet` with `ART.plotNumWet` (`THEME.colour.ink`) and **stays that way for the session**. The plot the head is on carries `ART.plotHead` and the otter at (cx, cy − 6), 40 px. At L1 the leg's route is pre-cut with `ART.channelDry`, dashed [6, 4].
- **The openings, and one declared departure from the approved design brief.** The brief specified a 56 × 56 coral mouth on the destination plot. A filled 56 × 56 `accent` plot puts ~3,100 px² of coral on screen, twice over when two openings are live, against ART-BIBLE §8 rubric 3 ("coral used once per screen, small"). The mouth is therefore **the lip on the shared edge** — `ART.openDrop` 56 × 22 centred on the horizontal edge below the head, `ART.openNotch` 26 × 56 centred on the vertical edge to its right, `ART.openSpill` 26 × 56 on the left edge of the next lane's head plot — each carrying `ART.plusTenLabel` or `ART.plusOneLabel` centred in `THEME.colour.inkOnAccent`; and the plot beyond it takes `ART.openTarget`, a 3 px `THEME.colour.accent` ring. **The tap target is the plot (56 × 56), unchanged.** Nothing else on the play surface uses `accent`.
- **The permanent record.** `ART.hopBadge` at each wet plot's (−20, −20) with the jug ordinal 13 px in `THEME.colour.bg`; `ART.dropMark` on the lip between the two plots a barrel connected; `ART.spillway` drawn from a lane's last plot round to the next lane's head; `ART.frontFlag` on a 1 px `THEME.colour.structure` staff at the top-right of the lowest plot the water has ever reached; `ART.headGate` 40 × 14 on the top edge of the leg's start plot.
- **The mill yard.** `ART.millHouse` centred (684, 500); `ART.millWheel` centred (684, 630) drawn still, 60 px; `ART.leat` from (642, 630) to (656, 630); `ART.pupWaiting` at (684, 556), 44 px. None of them is a target and none of them changes during play.
- **Zone H.** `ART.eqText` at (150, 692), `wordWrap` width 260, two lines maximum, designed at 1.6 × the English width. The hod from a cursor at x = 330: each `ART.barrel` occupies 40 px and each `ART.jug` 26 px, centre = cursor + pitch/2, cursor += pitch; the maximum load (3 + 8) ends at x = 658.
- **Tap targets and the declared gap shortfall (R2).** Every opening's target is a `GameCore.makeTile` 56 × 56 on the destination plot — exactly the 8-9 floor of BUILD-CONVENTIONS §3, 44 real px at 0.8 FIT. The **inter-target gap is 4 px, not the 12 px §3 asks for**, and shrinking the cells is not available: ten lanes at 56 px with 12 px gaps needs 680 px of grid plus chrome, over the 720 stage maximum. The mitigation is structural rather than cosmetic — **only two or three plots are ever registered targets, and the live ones are never edge-adjacent**: the drop is below and the notch is to the right, so they are diagonal neighbours 85 px centre to centre whose 56 × 56 boxes touch at a single corner. Every other plot is inert and a stray tap on one does nothing at all.
- **Keyboard.** Tab / Shift-Tab cycle the 2-3 live openings in the order drop → notch → spillway; Enter or Space pours. On Finish, Tab reaches `play_again` then `menu`. The focus ring is the library's.
- **Pointer.** `pointerdown` on an opening's plot arms it; `pointerup` on the same plot pours. Dragging the finger from the head across the openings pours each one in turn as the pointer enters it (the P7 accelerator); the tap-each-opening form is always available and is the only form the keyboard needs. Hit rectangles follow BUILD-CONVENTIONS §3.1: `makeTile` art is centred on the container origin, so the rectangle is `Rectangle(0, 0, 56, 56)`.
- **Chrome depth.** The language picker sits at depth 1500; nothing in this game is given a depth above it, and the world container is built once in `create()` and never destroyed and re-created (§3.2).
- The Finish scene is specified in How it plays step 7.

## Content
Language-neutral: numerals, "+", "=", "?", "+10" and "+1" are the only glyphs on the play surface. **There are no distractors in this game**, so BUILD-CONVENTIONS §8.1's distractor-legality rules do not apply to it at all — the anti-guessing work has moved entirely into the apparatus (see Rules, THE SPENT POUR). Each leg is written `a + b`; `a` is the start plot the head-gate opens on, and `b` is decomposed by the game into `floor(b/10)` barrels and `b mod 10` jugs, loaded barrels-on-top.

- **L1** (no crossing; b has 1-2 tens; the route pre-cut with `ART.channelDry`): 23 + 12 · 34 + 21 · 15 + 13 · 42 + 15 · 26 + 22 · 31 + 24 · 13 + 25 · 45 + 13 · 22 + 16 · 36 + 12 · 14 + 23 · 27 + 21
- **L2** (no crossing; b has 2-3 tens; ones to 8; idle gate-lift only, nothing pre-cut): 47 + 32 · 25 + 34 · 53 + 26 · 41 + 37 · 32 + 35 · 56 + 23 · 24 + 35 · 63 + 24 · 35 + 33 · 44 + 25 · 51 + 38 · 27 + 32
- **L3** (the ones run off the end of a lane — exactly one spillway per leg; no guide): 47 + 25 · 38 + 16 · 56 + 27 · 29 + 34 · 45 + 18 · 67 + 15 · 36 + 27 · 58 + 24 · 19 + 26 · 48 + 35 · 27 + 36 · 64 + 19
- **L3 leat tail** (new, R7 — the pre-pivot pool topped out at 89, which is lane 9, so no leg could reach the mill; each of these lands in lane 10 and each carries its spillway at the 90 → 91 lane end): 78 + 16 = 94 · 76 + 15 = 91 · 69 + 27 = 96 · 74 + 19 = 93 · 65 + 28 = 93
- **L3 landfall pair** (no spillway — the ones make exactly ten inside the last lane; used only as a session's closing leg, so the water finishes on the mill's own plot): 87 + 13 = 100 · 88 + 12 = 100

Play list of 12 per Rules; shuffled within level, levels in order. **Never the same category twice running** — MISSIONS.md §6.3's fixed-world form of BUILD-CONVENTIONS §13: the plots cannot move, so the constraint lives on the CONTENT list instead. Here the category is the leg's shape, `(tens, ones, crossing?)`, and two consecutive legs never share it. Additionally, the list is ordered so that within a level each leg's start plot is at or below the previous leg's landing wherever the pool allows, so the otter's own movement across the session trends down the hill toward the mill; where it cannot, the otter walks back **up through its own wet channel**, which reads as "I made that" rather than as a reset.

## Rules
- **Item count**: 12 legs (BUILD-CONVENTIONS §8, 8-9 band 12-15). A leg is a MOVE, not a question (MISSIONS.md §1.3).
- **Levels**: L1 / L2 / L3 as in Content; play starts at L1. Support fades L1 pre-cut route → L2 idle gate-lift only → L3 nothing (F-46).
- **Difficulty progression**: after 2 consecutive first-try legs the next leg comes from the next level up (cap L3). **First-try = the leg walked with zero refused pours.**
- **Adaptation**: 2 or more refused pours in a leg, or a non-first-try leg twice running, brings the next leg from one level down (floor L1). The current leg is never abandoned.
- **What happens on a correct answer** (a legal pour, and then the leg completing): the piece leaves the hod, `ANIM.heave` then `ANIM.pourDown` / `ANIM.pourRight` / `ANIM.pourSpill`, the destination plot becomes `ART.plotWet` with `ANIM.numFull`, its `ART.hopBadge` or `ART.dropMark` is painted permanently, the otter follows with `ANIM.walkTo`, `GameCore.tone("tap", k)` with k the move number so the pitch climbs along the leg. When the hod empties, S = a + b: the tally board completes with `ANIM.eqComplete`, `ART.otterHappy`, `GameCore.showPraise` from ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `tone("correct")`, `ART.frontFlag` advances if the landing is the deepest plot yet reached, and the next leg's head-gate opens 800 ms later.
- **What happens on a wrong answer** (a refused pour — all five cases are in How it plays step 6): the piece is never spent, the otter's own state never changes, the world freezes, and the enacted correction plays for 800 ms with the legal opening lifted and the relevant column or pair read at full weight. `tone("nudge")`. Two or more refused pours in a leg make it non-first-try (F-65), which feeds the ladder; it is never punished and never ends anything.
- **Retry behaviour**: refusal 1 → the enacted correction. Refusal 2 and every refusal after it → the correction again, then `ART.showRing` static on the legal destination plot with one `ANIM.showMe` lift, **holding until it is tapped**. There is no attempt cap and no attempt 4, because the show-me does not expire; the leg always completes (solved-with-help).
- **Finish condition**: 12 legs. **No losing state, no lost load, no clock** — the 2-s idle gate-lift is a cue only. Exactly zero ways a session can end other than by finishing.
- **THE RATCHET RULE, enforced by construction.** Wet plots stay wet; hop badges, lip marks and spillway chutes are painted once and never removed; `ART.frontFlag` is defined as the **deepest plot ever wet**, so it cannot retreat even when the ladder serves an easier leg that lands higher up the hill; the pup and the wheel never change for the worse; the hod empties only on success. Nothing in the world decays with time or with an error.
- **THE ANTI-BRUTE-FORCE GUARD: THE SPENT POUR.** P1's tile re-shuffle (BUILD-CONVENTIONS §13, PATTERNS P1) is unavailable here, because a terrace that jumped when you poured on it would stop being a place (MISSIONS.md §6). The named replacement has four parts:
  1. **There is no object on the screen bearing the sum, so the sum cannot be guessed at all.** The pre-pivot design offered three numeral tiles and a random tapper got the answer one time in three. This design offers only *the next step*, and the candidate set is the two or three adjacent openings, never the hundred plots. Guessing a whole leg is (1/2 to 1/3) per move over 2-11 moves — and unlike a tile row it gets **harder as the arithmetic gets harder**, which is the right direction.
  2. **A pour is spent.** A legal pour removes the cargo and moves the water, irreversibly; the otter does not walk back and the channel does not un-cut. Commitment is a one-way door, so a child cannot try both openings and keep the one that looked better.
  3. **A refusal spends nothing but it is counted.** Two or more refused pours in a leg make it non-first-try (F-65), which feeds the ladder and eases the next leg. Systematic trial-and-error is detected and answered pedagogically, never punished.
  4. **The candidate set varies per leg, not the positions.** The plots are fixed — that is what makes the hillside a place — but which neighbours are legal changes with what is on top of the hod, and the working stretch of the hillside moves every leg.
  "The child could just try them all" fails as a rejection here: trying them all still requires knowing *which* of two openings to pour into on every one of up to eleven consecutive moves, and every wrong try costs the leg its first-try status.
- **ACT budget (F-42, MISSIONS.md M6/R1), measured.** Barrel pour 400 ms, jug 240, spillway 500, inter-leg walk 400, correction 800. A typical leg (2 barrels + 5 jugs) is ≈ 2.0 s; twelve legs ≈ 24 s, plus ≈ 4.8 s of walking and ≈ 6.4 s of corrections ≈ **35 s**, inside the 60 s ceiling with margin, and no single ACT exceeds 500 ms against the 1200 ms cap. **A builder who animates the water flowing down the whole wet channel on each pour, rather than only the new plot, will blow this without any gate noticing.**

**Declared risks and limits (R1-R8).** These are design judgements, stated so a reviewer can see them rather than discover them at build time.
- **R1 · The hero cannot start every leg where the last one ended, and the reason is arithmetic.** MISSIONS.md L2 wants `start(k+1) = landing(k)`. Twelve legs of two-digit addends average about +24, so a continuous route needs ≈ 288 plots and the board has 100; the longest honest continuous session on one hundred square is about four legs. **Persistence is therefore carried by the world** — the wet channel, the badges, the chutes and the front flag, none of which ever reset — and the otter walks, visibly and through its own wet channel, to the next head-gate. It never teleports, but M3's strict position-continuity half should be relaxed for this game to *"the hero's position changes only by a drawn traversal"*. Inventing three valleys and resetting the world twice a session would be worse.
- **R2 · The 12 px inter-target gap is not met** — 4 px at pitch 60 — and the mitigation is structural, not a shrunk cell (see Visual specification). A build should measure a real mis-tap rate before this is treated as settled.
- **R3 · Redundancy with 020 `hundred-square-trail` is real and must be checked against the transformed design, not the original.** Both are an animal on a hundred square leaving a permanent mark. The differentiators: 020 is one ±1/±10 neighbour tap per item at band 6-8 with no cargo, no ordering and no crossing; 035 is a **loaded multi-move descent** at band 8-9 where the second addend is physical cargo, the tens-before-ones order is enforced by the stack, the carry is a walked spillway, and the goal is a mill the water has to reach. Different verb, different world, different band, different sub-objective — but `_tools/check-redundancy.js` should be run on the pair explicitly.
- **R4 · Legibility at 400 px is the tightest thing in the game.** Ten lanes of 20 px numerals scale to about 11 real px in a 400 px iframe. That meets the 8-9 floor of BUILD-CONVENTIONS §12 and is exactly what the pre-pivot six-row window gave at the same scale, so nothing is lost — but the pale `inkSoft` numeral on a dry plot is the specific thing to look at in the render sweep, and the pup at 44 px is 24 real px, near the limit for reading a waiting animal.
- **R5 · The objective's last clause changed and one retrieval act is gone.** "Names the landing cell as the sum" was a three-tile choice; it is now a reading of the plot the otter is standing on. The Displacement rule and MISSIONS.md's own worked example for 008 both mandate this, and the anti-guess property improves enormously, but the child no longer *states* the sum and misconception 2 loses its stated-belief diagnostic with it.
- **R6 · Persistence makes the finish state content-dependent.** Which legs the ladder served decides what the hillside looks like, so the gate must assert **properties** — water in lane 10, wet-plot count at least the sum of the legs walked, wheel turning, pup standing — and never a pixel match.
- **R7 · The content needed a leat tail.** The pre-pivot pool topped out at 89, which is lane 9, so no leg could reach the mill. Seven new in-band items were added (Content, L3 leat tail and landfall pair), all two-digit + two-digit, all ≤ 100.
- **R8 · Nothing here has been built.** Every claim above about how an eight-year-old reads a barrel that will not fit a notch is a design judgement, not a measurement. This repo's history is unkind on exactly that point: the fox passed every gate three times and was rejected on sight.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")` (Finish screen only, first-try count), `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific `STRINGS`, authored in all 11 locales per BUILD-CONVENTIONS §17: `title` = "The Water Stair". That is the whole set — **the play surface shows no words at all**, only numerals, "+", "=", "?", "+10" and "+1", so the 8-9 text budget (≤ 2 short sentences, F-42/F6) is spent entirely on the start-screen title and the mission premise is carried by the picture: a still hillside, a flag, a dry gap, a motionless wheel and a waiting pup.

## Sound
`GameCore.tone("tap", k)` on pour *k* of a leg, so the pitch climbs along the route (F-213); `tone("correct")` when the hod empties; `tone("nudge")` on a refused pour; `tone("finish")` once on the Finish screen. Sound never carries meaning the screen does not also show. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (start, All done, Play again, Menu, the praise rotation, the title; the hillside is numerals).
- [ ] Works at narrow width (400-px iframe: all ten lanes, the mill yard, the tally board and the whole hod visible; the 720 × 720 stage scales as one; the pale dry numerals are still readable).
- [ ] Keyboard operable (Tab cycles only the 2-3 live openings, Enter pours; on Finish, Tab reaches Play again then Menu).
- [ ] Never auto-starts.
- [ ] No losing state (a refused pour never spends a piece, never ends a leg and never ends the session; the show-me holds until tapped, so every leg completes).
- [ ] **Mission.** The otter's plot changes on at least 11 of the 12 legs (M1); the mill wheel, the mill house, the leat and the pup are drawn from the first frame at their fixed coordinates and are never re-created; the hillside container is built once and never destroyed (M1, M3).
- [ ] **The ratchet rule (M4).** Drive a session with a refused pour on every leg: no plot ever returns to dry, no hop badge, lip mark or spillway chute is ever removed, `ART.frontFlag` never moves up the hill, and the hod never gains a piece back.
- [ ] **The instant-cut test (deletion C, F5).** Patch `ANIM.pourDown` / `pourRight` / `pourSpill` / `walkTo` to `duration: 0` and diff the leg log against an unpatched run: identical leg sequence, identical refusals, identical first-try flags, identical final hillside.
- [ ] **Deletion B (`mutate-mission.js`).** Remove the otter and the mill: the game must fail to complete a leg.
- [ ] **The freeze gate (M2).** At every decision point of a full `qa-game` session, whenever any target is enabled the running tween count is zero — including during the 2-s idle gate-lift, which disables its targets for its 200 ms and re-enables them on complete.
- [ ] **No progress meter on the play surface (M5).** `ART.dotFull` / `ART.dotEmpty` are drawn on the Finish screen and nowhere else.
- [ ] For 47 + 25 the hod loads two barrels then five jugs, barrels on top, and no jug is reachable until both barrels are spent.
- [ ] Tapping plot 48 for 47 + 25 while barrels are on top refuses the barrel, returns it unspent, lifts the drop below and reads 47 / 57 / 67 at full weight for 800 ms.
- [ ] Tapping the plot below during the ones phase refuses the jug, returns it unspent, and lifts the notch to the right with "+1" for 800 ms.
- [ ] Pouring onto a plot that is already wet spends nothing and previews hop badge **1** on the plot to the right.
- [ ] At plot 70 the drop below is refused and `ART.openSpill` lifts with 70 and 71 outlined together against the drop column reading 70 / 80.
- [ ] One jug takes the water 70 → 71 through the spillway, the chute is drawn, and the badge on 71 carries its ordinary ordinal.
- [ ] When the hod empties, the landing plot's numeral goes full weight and the tally board completes; there is no object anywhere on screen bearing the sum before that moment.
- [ ] Two first-try legs in a row bring a leg with a spillway; two refused pours in a leg bring an easier leg next.
- [ ] The Finish screen shows the hillside the child made at scale 0.78 with the wheel turning and the pup standing, twelve first-try marks and no score; the gate asserts properties, never a pixel match (R6).
- [ ] Total ACT time across a full session is under 60 s, and no single ACT exceeds 1200 ms.
- [ ] With `?sound=off` nothing is audible; with sound on, each pour in a leg is a higher note.
