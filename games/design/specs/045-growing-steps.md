# 045 — The High Meadow

## Identity
- Slug: `growing-steps`
- Subject / topic: Mathematics / growing patterns (+1, +2) — building the next term of a staircase from the difference between terms
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (the grid is the gorge's course scale; the finger sets and takes out stone courses under the hero's own feet, and a beam commits the run)
- Frame: THE CLIMB
- Estimated build size: ~650 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (build a column; a commit control judges it). Frame contract: `design/MISSIONS.md` FRAME 14, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. P6's column is no longer a well of dashed cells beside the staircase — it is the prop the hero is standing on, and its height is the hero's altitude.

## Learning
- Objective: Builds the next (or a missing) term of a growing staircase pattern on a grid so that the difference between consecutive terms stays constant (+1 or +2).
- Prerequisites: Counts to 8; compares two towers by height; has met repeating patterns (game 043).
- Curriculum links: F-1 (patterns in 7 of 15 sources), F-21 ("repeating (and growing) patterns" named in all twelve systems by age 8), F-31 row "Sort by attribute; repeating patterns" extended to growing patterns → 6-8 (US 1.OA / 2.OA pattern work in state standards, 4.OA.C.5 formalises later; England Y1-2 "count in steps" + "patterns"; Germany Klasse 1-2 "Muster und Strukturen: wachsende Muster"; France CP-CE1 "suites de nombres"; Netherlands groep 3-4 "groeipatronen"; Spain 1º ciclo "series crecientes"; Brazil EF02MA11 "sequências recursivas"; Sweden åk 1-3 "hur enkla mönster … konstrueras"; Norway 2. trinn "mønster"; Finland grade 1-2).
- Common misconceptions (F-116 — extending by copying; the unit/rule not identified — and F-109 for the step as a count-on), each with this game's response:
  1. **Copying the last term (after 1, 3, 5 the child builds 5 again).** Response: the beam comes out **dead level** across a path that has been climbing all session — the flattest, most unmistakable shape in the game, and the child sees it before any numeral appears. Then the riser numerals appear along the path between the standing pairs (`ART.riserTag` "+2", "+2", `ANIM.appear`, 250 ms apart, `tone("tap", k)`), and last the ACTUAL riser between the previous prop and the goat's, in a coral tag (`ART.riserTagWrong` "+0"). The T − S courses the prop is short by are outlined on the strata lines between the beam's far end and the prop top (`ART.needCourse`, `ANIM.pulse`) — the path stops short of the goat's head, by a whole number of courses, countable in the same stones the child was laying. The child reads "+2, +2, +0" — the break in the rule — and sets more stone.
  2. **Adding one by default (builds 6 for 1, 3, 5, _).** Response: the beam climbs, but **less steeply than the run behind it** — a visible kink downward at the joint. The same tags: "+2, +2, +1"; one `ART.needCourse` outline pulses between the beam's end and the prop top.
  3. **Treating the growing pattern as repeating (builds 1 again, "it starts over").** Response: the child has taken courses out down to the floor, so the beam **plunges downhill into the gorge**. The tags read "+2, +2, −4" (`ART.riserTagWrong` carries its sign); four `ART.needCourse` outlines pulse. This response is why the prop must be lowerable below path level: the floor is course 1, never course 0, so the goat always has stone under it and the misconception still has a home to be enacted in.
  4. **Overshooting (builds 8 for 1, 3, 5, _).** Response: "+2, +2, +3"; the top S − T courses **stand proud through the beam** — the prop pokes up through the path — each ringed in coral (`ART.proudRing`) and pulsing; the child takes the top stone out and lays the beam again. The game never removes a course for the child before the show-me step.
  5. **Filling cells anywhere (a tower with holes).** Response: structurally impossible, and now for a physical reason rather than a UI rule — a stone is set on **top** of the prop and taken off the **top** of the prop, because that is what a mason does and what gravity allows. A prop cannot have a hole in it. F-48: mirror the physical manipulative.

## Mission
**Mission, as the child would say it.** *Get up to the meadow.*

**The hero.** A goat (ART-BIBLE §3 roster: `goat`), 56 px, in side profile facing along the path. Its horns give it a silhouette that survives 48 px, and it is the one animal on the roster whose whole identity is standing on impossible ledges, so a refusal can be *the path did not lie straight* and never anything happening to the creature. It is not a bobber and it has no idle loop: on every single tap it sets a stone under its own feet and rises one course, or takes one out and settles one course; between items it walks one prop forward; at the finish it walks the whole path it built.

**The want (the visible lack), readable from one still frame with no words and no motion.** Bottom-left, a small goat alone on a stub of stone path that stops in mid-air over a gorge. Top-right, at a fixed coordinate, two adult goats on a green shelf, standing apart, with an obvious goat-shaped gap between them, looking down. Between the two, a row of broken stone props of increasing height with nothing on top of them. A six-year-old reads *"that one has to get up there, and the path is not finished"* from the photograph. Nothing is rising, nothing is running out, nothing is chasing: the picture is a lack, not a threat.

**The goal.** The high meadow — `ART.shelf` at a constant (686, 130) with its top edge on course 16, two `ART.herdGoat` at (676, 84) and (706, 84) and `ART.shelfGap` between them at (692, 84), drawn from tap one (Device 1, THE WAITING PARTY). It changes state only at the finish; nothing about it reacts to a correct answer, because a waiting party that reacts per item is an approval meter and F-44 bans that shape.

**S — the single state variable: THE GOAT'S ALTITUDE ON THE PROP IT IS STANDING ON, counted in courses against the gorge's strata scale.**

- **Mathematical reading:** S is the next (or the missing) term of the growing sequence — the height of this prop in the run 1, 2, 3, … or 10, 12, 14, ….
- **Physical reading:** S is how high the goat is standing, read off the numbered strata painted up the near-bank rock.

There is one variable and the two readings are the same number. The goat's container centre is drawn at `propTop − 28` at every instant, so its feet rest on the prop top and **raising the prop raises the goat**; there is no separate "answer" object anywhere on the stage, no answer tile, no keypad, no target numeral to choose between. The child's tap selects a transition of S (`S → S ± 1`, floor 1, ceiling 16); it never reports an answer about S.

**The isomorphism — moving IS solving.** *A path over props lies straight only if each prop is taller than the last by the same amount. The goat's altitude IS the next term, and the world's acceptance is "does the path lie straight through where the goat is standing".*

The commit is not a comparison, it is a fit:

```
worksheet:  if (built === item.answer)
game:       if (onLine(deck.lastPropTop, deck.pitch, hero.x, hero.y))
```

The commit handler must read `hero.y`, never a course counter and never an `item.answer` field — that is the assertion `mutate-mission.js` can make, and it is the Displacement rule literally (`answer = f(character.position)`, GAME-DESIGN-LAW 2.3). Concretely: the path already built runs at one straight pitch. The goat is standing on the next prop. When the beam is laid from the last locked prop top out to the goat's feet, it either continues that straight line — and locks as path — or it does not, and the discrepancy is a whole number of courses, visible and countable in the same stones the child was laying.

**Constant difference ⟺ collinear tops ⟺ a path you can walk.** That is the whole of the mathematics and it is also the whole of the physics, which is why the maths is the steering: the child is not stating a fact about a sequence, they are setting the height a path has to run through.

Two consequences worth naming. **The child sights along the built path to judge the next height — and that is the target skill in its geometric form, not a leak.** Extending a linear run by eye and counting risers on the strata are the same operation. And **the abstract notation is permanently in frame** (GAME-DESIGN-LAW 2.5, INTEGRATED NEVER CONCEALED): the strata are numbered up the near-bank rock, every locked prop top carries its own height numeral on the path, and the riser numerals "+1" / "+2" sit on the path between prop tops. The mission supplies the reason; it never replaces the cue, and nothing here is a word problem.

**A third consequence, and it is a gift from the geometry: the goal's altitude is the sequence's last term.** The meadow shelf sits on course 16, which is exactly where 10, 12, 14, 16 arrives. A child who doubts the rule can check it against where they are going. That is THE CLIMB at its best — *the answer is how high you are*, and the destination is a number.

**The mark that stays.** Every locked beam is path for the rest of the session and every locked prop keeps its courses (Device 2, and the RATCHET RULE). By item 8 the gorge carries a two-run stone path with a visible joint in it — the session's arithmetic, drawn as the object it produced.

**Diegetic progress (there is no progress furniture of any kind on the play surface).** Two displays, no glyphs, no counter. *Ahead:* the bare stubs still standing at course 0 between the goat and the meadow, and the raw distance from the goat's altitude to the shelf at y = 108 — a child glancing at the screen sees "four props left and I am about half way up". *Behind:* every locked beam and every prop the child raised. This is F-44's *"path filled"* literally. `mission.progress` for the M4 gate = (locked beams) + (locked props); it counts only committed work, never the working prop's courses, so a child adjusting their own uncommitted prop is not the world decaying. Monotone by construction.

## World
Stage **720 × 720** — this spec declares the taller stage, which BUILD-CONVENTIONS §2 permits (max 720 × 720); the Phaser config `height` is 720 and nothing else changes. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7. The canonical zone W is 56-420 on the 560-high stage; on this taller stage the world takes 56-580 and the hand takes 580-720, because a sixteen-course climb and its destination must be in one frame, one saccade apart (F3 co-location).

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** Three things that stood here in the pre-pivot spec are gone: the progress circles at y = 28, `t("question_x_of_y")` at y = 48, and the caption at y = 84. The first two are banned on the play surface by MISSIONS.md 1.4; the caption is not deleted so much as re-sited — "build the next step" is now what the apparatus itself says, and the notation it carried rides on the path as `ART.riserTag` and `ART.heightTag`.

**Zone W, y 56-580 — THE WORLD.** The hero and the goal are both inside it at every moment of the session, and the goal's (x, y) never changes.

- *The gorge:* `ART.gorge`, 560 × 500 centred (368, 306). A low-contrast wash, never animated (ART-BIBLE §4).
- *The scale — the world's furniture, and the reason a prop top is read rather than estimated (F-118).* Datum at course 0, **y = 556**; course pitch **28**. Course *c* top = `556 − 28c`, c = 0 … 16, so y runs 556 down to 108. `ART.strataLine`, a 1 px hairline, crosses the gorge from x = 92 to x = 648 at every course. `ART.strataNum` sits up the near-bank rock at **x = 76**, 16 px, on every second course (2, 4, 6, 8, 10, 12, 14, 16 → y = 500, 444, 388, 332, 276, 220, 164, 108). `ART.datumLine` runs the full width at y = 556.
- *Near bank:* `ART.nearBank`, rock from x = 0 to 92 with its top at y = 556. The path's first beam springs from here.
- *The high meadow (the goal, fixed all session, M1):* `ART.shelf` from **x = 652 to 720, top edge y = 108** (course 16), drawn centred at (686, 130). `ART.herdGoat` at **(676, 84)** and **(706, 84)**, both 44 px, facing down toward the gorge. `ART.shelfGap` — a dashed goat-shaped outline, 34 × 44 — at **(692, 84)**. Drawn from tap one; changes only at the finish.
- *Twelve prop stations,* x = `100 + i × 48` → **100, 148, 196, 244, 292, 340, 388, 436, 484, 532, 580, 628**. A prop is 36 px wide, drawn as stacked `ART.course` / `ART.courseSet` rectangles 36 × 28 with a 1.5 px `THEME.colour.inkSoft` joint line per course, so a child can count the courses in the prop under the goat's feet. A station with no prop shows `ART.stub`, a 36 × 10 remnant on the datum.
- *Standing at the start (the old path's surviving footings, and they never move):* stations 1, 2, 3 at heights **1, 2, 3**; station 9 at height **10**, a surviving footing out in the middle of the gorge. Everything else is a bare stub at course 0. Station 9 is what shows the child, before any item asks it, that the pitch changed at the abutment.
- *The path:* `ART.beam`, 8 px `THEME.colour.structure`, laid prop top to prop top, straight within a run, with `ART.beamJoint` at station 8 where the pitch changes from +1 to +2. Every locked beam stays for the session.
- *The goat:* 56 px, container centre at `(stationX, propTop − 28)` so its feet rest on the prop top. Session start: station 3, feet at **(196, 472)**.

**Height budget, closed.** Run A (+1) covers stations 1-8 at heights 1 … 8; the abutment joint is at station 8; run B (+2) covers stations 8-12 at 8, 10, 12, 14, 16. Top = course 16 = the meadow's own height, so the last beam arrives level with the shelf. Three footings are given on the near side and one out in the gorge, which leaves **eight buildable props and therefore eight items** — the arithmetic is forced, not chosen, and it is the reason for the declared item-count deviation below.

**Worked opening state, item 1.** Props 1/2/3 at 1/2/3 (tops y = 528 / 500 / 472), beams over them, riser numerals "+1" "+1" on the path, height numerals "1" "2" "3" at the prop tops. The goat stands at (196, 472). Station 4's footing rises to **3** — level with the path — and the goat walks 48 px flat onto it, so it never steps down. The child raises it. Correct is 4 (top y = 444); the goat ends the item at (244, 444), one course higher than it started, and item 2 begins by walking it flat onto station 5.

**Zone H, y 580-720 — THE HAND. One control.** The **beam**, a `makeButton` 220 × 72 drawn as a timber plank, at **(360, 650)**, carrying `t("ok")`. Disabled at alpha 0.5 until the working prop's height differs from the height it started the item at. Tapping it lays the beam. The five-control ceiling is spent as one.

**The other control is in the world, which is where THE CLIMB wants it.** The working prop's column, a 56 px wide hit strip centred on the station, split at the goat's feet:

| target | rectangle | height at course 1 | height at course 16 | action |
|---|---|---|---|---|
| SET | `Rect(x − 28, 52, 56, propTop − 52)` | 476 | **56** | set a stone: the prop and the goat rise one course, ≤ 160 ms |
| TAKE OUT | `Rect(x − 28, propTop, 56, 584 − propTop)` | **56** | 476 | take the top stone out: both settle one course |

The two rectangles meet exactly at `propTop` — the goat's feet — so there is **no dead zone and no ambiguous seam**, and both are **at or above the 6-8 band's 56 × 56 floor at every one of the sixteen heights** (the arithmetic is in the table: the SET target is never smaller than the goat's own body, and the TAKE OUT target always includes the 28 px of bedding under the datum in which a prop foot sits). The floor is course 1, never 0, so the goat always stands on something. The drawn prop is 36 px and the strip is 56, which is wider — the neighbouring props are inert scenery and are not tappable, so the wider strip cannot collide with anything.

**F-69 element count** (§5.1 reading: an instrument counts as ONE, candidates count individually, inert scenery counts as zero). The working prop is **1 instrument** — the child does not evaluate sixteen alternatives, they set a height, which is a stepper's cognitive shape. Plus the hero (1, and it is the upper half of that same instrument), the beam control (1) and the meadow goal (1) = **4 elements** against a budget of ten. The eleven non-working props are scenery and are not enabled. This game depends on the §5.1 reading only lightly; even counting the hero separately it is inside the budget.

**Text budget.** Play surface: **zero words**. The only glyphs on it are numerals, a plus sign and a minus sign. Start screen: the title (3 words) and the premise (4 words) = **7 English words for the whole game**, against the 6-8 band's eight (F6, GAME-DESIGN-LAW §5). Finish: `t("all_done")` and the two chrome buttons.

**Declared risks and deviations — stated rather than designed around.**

1. **The stage must be 720 × 720, and 720 × 560 provably does not close.** A growing pattern must climb, so stations × average difference ≤ courses available. At 560 the world zone is 364 px, which is 12 readable courses; twelve courses at an average difference of 1.4 buys eight or nine stations, of which four are given — four or five items, far below any legal floor. At 720 the world zone is 524 px = 16 courses at a 28 px pitch, which buys twelve stations and eight items. This is a constraint, not a preference.
2. **Item count is 8, and BUILD-CONVENTIONS §8 asks 10-12 for the 6-8 band.** The approved design cited §8 as "8-15"; §8 does not say that, and repeating a mis-citation of the shared contract is exactly the failure this repo keeps paying for, so the number is declared as a **deviation** rather than laundered as a permitted range. The cause is the closed height budget above: twelve stations minus four surviving footings is eight buildable props, and a thirteenth station at the 48 px pitch would land at x = 676, inside the meadow. The compensation is that every item is a genuine new term of one continuous path rather than one of ten unrelated four-term staircases, and the session still runs about six minutes because each item carries a real build and a real commit. If the operator rules that ten items are required, the honest fix is a 24 px course and a 42 px station pitch (21 courses, 14 stations, 10 items) at a real cost in legibility — not a shorter path pretending to be ten items.
3. **A level cannot select the item here, so it selects the CUE SET.** §8's levels are "named subsets of CONTENT", but in one continuous world the item order **is** the path and the pitch schedule is fixed by the closed height budget. The approved design proposed inserting an abutment at run time wherever the ladder moves; that cannot be done without breaking the budget, so the correction is stated here: L1 / L2 / L3 change how much of the rule is shown, exactly mirroring the pre-pivot spec's three levels (tags-and-ghost / tags-hidden / numerals-only). See Content.
4. **Legibility at 400 px is what I expect the visual sweep to challenge.** A 28 px course renders at 15.6 real px and a 36 px prop at 20 px. The strata hairlines and the numbered rock are what make this survivable — the child reads a top against a line and never estimates it, and never has to count sixteen stones, because the risers are one or two. If the sweep rejects it, the honest fix is nine stations and six items, not a smaller course.
5. **The prerequisite says "counts to 8" and the path climbs to 16.** Declared, not hidden. The child never counts past 2 in a single act — the riser is the thing the hand makes — and an altitude is **read** off the numbered rock rather than counted out. The prop under the goat's feet in run B holds 10 to 16 courses, which is more than the prerequisite covers if a child chooses to count it; the height numeral on the path is there so they do not have to.
6. **§12 asks 24 px minimum text for the 6-8 band; the strata numerals are 16 px.** They are furniture read against a hairline, not prompt copy, and the load-bearing notation (`ART.riserTag`, `ART.heightTag`) is at 20 px. Declared for the reviewer rather than buried, in the same way 041 declares its 4 px stone gutter.
7. **The child's hand supplies the RISER, and the world composes the TERM.** The prop starts each item pre-built to the previous prop's height — which is what a builder does, and it is what stops the goat ever stepping down — so the courses the child adds are the *difference*, not the whole term. The term itself is still the state (the prop's total height, the goat's altitude, read against the numbered strata), and the L3 mist items force it to be computed rather than counted. I judge this a gain, because the objective's own words are *"so that the difference between consecutive terms stays constant"* and the difference is now the thing the child physically makes. A reviewer should know it is a change and not discover it at build time.
8. **The sight-along-the-path cue is strong at L1.** A critic may read it as the answer being visible. It is not — the path stops at the last locked prop and the child extends it mentally — but the cue is genuinely strong, which is what L1 is for; L2 and L3 remove it.
9. **Redundancy, to be re-run against the transformed designs, not the originals** (`check-redundancy.js`, GAME-DESIGN-LAW §7). **004 `bridge-of-ten`** is also a span with an animal standing on it, but that bridge is flat and its mathematics is part-whole composition to ten; this one climbs and its mathematics is a constant first difference, which is why the title carries no word for bridge. **120 → THE ROOFTOP ROUND** is also altitude-as-value, but there the height is *read* off an existing chart with a keypad; here it is *made* with stone and there is no keypad. **046 `number-pattern-gaps`** is the numeric twin: 046 types a numeral onto a number line, 045 builds a height, which is the split the two catalogue rows already declare.
10. **The mission has not been played by a child.** Everything above about how a seven-year-old reads a beam that will not lie flat is a design judgement. This corpus's own history is unkind on that point — the fox passed three gate runs and was rejected on sight — so the local link matters more than the gates (Wouters 2013: learning d = 0.29, motivation d = 0.26, not significant).

## How it plays
1. **Start screen.** `S("title")` at (360, 200), 52 px `THEME.font.display` `THEME.colour.structure`; `S("premise")` at (360, 258), 24 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.goatIdle` 96 px at (360, 370) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 490); the picker at (16, 16). Never auto-starts.

2. **The gorge is built once, and it is a place.** On entering Play: `ART.gorge`, the sixteen `ART.strataLine` hairlines with their `ART.strataNum` labels up the rock, `ART.datumLine`, `ART.nearBank`, the twelve stations (props 1, 2, 3 at 1, 2, 3 and prop 9 at 10 as `ART.courseSet` stacks, the other eight as `ART.stub`), the beams over 1-2-3 with their `ART.riserTag` "+1" "+1" and `ART.heightTag` "1" "2" "3", and the meadow — `ART.shelf`, two `ART.herdGoat`, `ART.shelfGap`. **Nothing here is rebuilt between items and no station ever moves**; that is what makes the gorge a location rather than a board, and it is why P1's tile re-shuffle is unavailable and a different guard is declared (Rules, THE MORTAR SETS).

3. **Item 1 (station 4; run A, +1; the run behind reads 1, 2, 3; T = 4).** As the tail of the Start tap's ACT chain, station 4's `ART.stub` rises to a 3-course prop (`ANIM.footingUp`, 250 ms) — level with the path, so nothing is ever stepped down onto — and the goat walks 48 px flat onto it (`ART.goatWalk`, `ANIM.stepAcross`, 250 ms), arriving at feet (244, 472). Then it holds `ART.goatThink` and the stage freezes. F-42 permits the first item of a new mechanic to demonstrate itself once; here the demonstration is the walk, and it is caused by a tap.

4. **The DECIDE state.** The working prop's two hit rectangles are enabled and the beam control is disabled; every other prop is scenery; the goat holds one static pose at one coordinate; **zero tweens are running** (F1 freeze, the M2 assertion). Nothing breathes, nothing drifts, the gorge wash does not move and the herd does not shuffle.

5. **Setting a course (the child taps the goat, or the strip above it).** `ART.goatSet` swaps in for 160 ms; a new `ART.course` appears on top of the prop (`ANIM.courseIn`); the prop container and the goat move up together by 28 px (`ANIM.rise`, 160 ms) so the feet stay on the top; `tone("tap", k)` with k = the prop's new height, so the pitch climbs with the stone. The goat returns to `ART.goatThink`. The beam control enables the moment the height differs from the height the item started at. Ceiling: course 16 — a further tap is a no-op with no sound and no reaction, because the meadow is as high as the gorge goes.

6. **Taking a course out (the child taps the stones below the feet).** The top `ART.course` leaves (`ANIM.courseOut`); prop and goat settle 28 px (`ANIM.rise`); `tone("tap", k)` at the new height. Floor: course 1 — the goat always has stone under it, and the floor is what gives misconception 3 somewhere to happen.

7. **Laying the beam (the child taps the plank).** `ART.beamGhost` extends from the last locked prop top out to the goat's feet at the run's pitch (`ANIM.beamOut`, 320 ms). Then the world answers, and the answer is `onLine(deck.lastPropTop, deck.pitch, hero.x, hero.y)` — a predicate on the hero's **position**, not a comparison against a stored field.

   - **It lies straight (S = T).** `ART.beamGhost` becomes `ART.beam` and locks (`ANIM.beamLock`); its `ART.riserTag` appears at the beam's midpoint with the run's difference, and the prop's `ART.heightTag` appears at its top; the prop's courses swap to `ART.courseSet`; `tone("correct")`; `GameCore.showPraise` with the rotation, first-try items only; `ART.goatHappy` for 400 ms. Feedback lands within 300 ms of the commit (F-40) — the beam settling **is** the feedback. Then the head of the next item: the next station's stub rises to the just-locked height (`ANIM.footingUp`) and the goat walks 48 px flat onto it (`ANIM.stepAcross`). **At item 5 one extra thing happens**: locking prop 8 also lays the abutment beam 8 → 9 onto the standing footing, `ART.beamJoint` appears at station 8, and that beam's `ART.riserTag` reads **"+2"**. The world announces the pitch change by building it, not by saying it.
   - **It does not lie straight.** See 8.

8. **A beam the world refuses.** The whole apparatus is `setEnabled(false)` for the duration, so nothing can be tapped mid-teaching, and **the goat's pose does not change at any point of it** — it holds `ART.goatThink` throughout. One of two things is visibly true, and both are counted in whole courses:

   - **Prop too short (S < T).** The beam's far end stops in the air above it. The gap between the beam and the prop top is exactly T − S courses, each drawn as an outlined `ART.needCourse` rectangle on its strata line, pulsing (`ANIM.pulse`). The path is short of the goat's head.
   - **Prop too tall (S > T).** The top S − T courses stand proud through the beam. Each is ringed with `ART.proudRing` and pulses. The prop pokes up through the path.

   Then the numerals, in order, 250 ms apart with `tone("tap", k)`: the last three `ART.riserTag`s of the run behind (all of them, when the run is shorter), and last the coral `ART.riserTagWrong` carrying the **actual** difference and its sign between the previous prop and the goat's. "+1, +1, +0" — the break in the rule, in the same frame as the stones that broke it.

   Then `ART.beamGhost` **lifts back off** (`ANIM.beamLift`). It was never set. Nothing was lost, nothing decayed, no stone the child laid was taken away, and the goat is exactly where it was. `tone("nudge")`. The beam control disables until the prop's height changes; the outlines and the coral tag stay until it does, then `ANIM.fadeOut`. The whole enactment runs 2.4-3.2 s, which is never shorter than the pre-pivot spec's (GAME-DESIGN-LAW §6: correction duration may not fall, and the world freezes while a correction plays).

9. **The support ladder, which always ends in success.** Attempt 1 unaided → attempt 2 after the outlines and the tags → **attempt 3 is the show-me**: the prop fills or empties itself to T, 200 ms per course with `tone("tap", k)`, the goat riding it up or down; the beam lays and locks; the beam control gains `ART.showRing` (`ANIM.showMe`); tapping it completes the item **solved-with-help**, with no praise pop. No attempt 4. There is no dead end and no way for a session to end other than by finishing.

10. **Items 2-8.** Per Content and Rules. Stations 5, 6, 7, 8 close run A; station 9 stands where it always stood; stations 10, 11, 12 climb run B at +2. The stations do not move; what changes is which prop is live, what its target is, and how much of the rule is shown.

11. **Finish.** The last beam locks at station 12 and one more `ART.beam` lays flat from prop 12 onto the shelf — the path now runs unbroken from the near bank to the meadow in two straight runs with one joint. **The goat walks the whole thing**: one continuous `ANIM.traverse`, ~1200 ms, from x = 100 up the line it built, and steps into `ART.shelfGap` between the two adults, which turn to it (`ART.goatHappy`, `ANIM.celebrate` once). The gap closes; three goats stand where there were two. The picture the child is left with is the answer to every item at once — a path that climbs in a straight line because every riser is the same.

12. **Finish screen — the world at its play coordinates** (MISSIONS.md 9.1 item 6). The same gorge, the same path, no re-layout, nothing cleared. `ART.finishPlaque` at (360, 96) carries `t("all_done")` at 40 px `THEME.colour.structure`. The first-try record is eight tokens at (360, 620), 22 px apart: `ART.dotFull` for an item whose beam lay straight the first time, `ART.dotEmpty` for one that needed the show-me — MISSIONS.md 1.4 permits those two tokens on the Finish screen only, and they are a record of what was built unaided, never a score, never a time, never a star. `makeButton` `t("play_again")` at (250, 660) and `t("menu")` at (470, 660); `tone("finish")` once; `GameCore.reportHeight()`.

Session about 6 minutes. **Measured ACT time, reported rather than asserted** (GAME-DESIGN-LAW 2.2a): traversal alone is 8 × 250 ms (`ANIM.stepAcross`) + 1200 ms (`ANIM.traverse`) = **3.2 s**, which is what the instant-cut harness removes. Total ACT — every tween the child caused, including course sets, footings rising, beams laying and about seven enacted corrections — is about **35 s against the 60 s ceiling** (M6). `qa-game` must measure it rather than trust this estimate.

## Art registry
```js
const ART = {
  /* the hero and the herd — one drawing family (ART-BIBLE §3 roster: goat) */
  goatIdle:      { kind: "svg", value: LCSArt.get("goat.idle"),  size: 96, fallback: "🐐" },
  goatThink:     { kind: "svg", value: LCSArt.get("goat.think"), size: 96, fallback: "🐐" },
  goatWalk:      { kind: "svg", value: LCSArt.get("goat.walk"),  size: 96, fallback: "🐐" },
  goatSet:       { kind: "svg", value: LCSArt.get("goat.act"),   size: 96, fallback: "🐐" },   // fore-hoof down, setting a stone
  goatHappy:     { kind: "svg", value: LCSArt.get("goat.happy"), size: 96, fallback: "🐐" },
  herdGoat:      { kind: "svg", value: LCSArt.get("goat.idle"),  size: 96, fallback: "🐐" },   // the two adults on the shelf, drawn flipped

  /* the gorge and its scale */
  gorge:         { kind: "shape", shape: "rect",      w: 560, h: 500, fill: "surface2" },
  nearBank:      { kind: "shape", shape: "rect",      w: 92,  h: 164, fill: "structureSoft", stroke: "line", strokeWidth: 2 },
  strataLine:    { kind: "shape", shape: "line",      points: [-278, 0, 278, 0], stroke: "line", strokeWidth: 1 },
  strataNum:     { kind: "text",  value: "", size: 16, font: "display", color: "inkSoft" },
  datumLine:     { kind: "shape", shape: "rect",      w: 556, h: 3, fill: "line" },

  /* the props */
  course:        { kind: "shape", shape: "rect",      w: 36, h: 28, fill: "surface",       stroke: "line",      strokeWidth: 1.5 },
  courseSet:     { kind: "shape", shape: "rect",      w: 36, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 1.5 },
  stub:          { kind: "shape", shape: "rect",      w: 36, h: 10, fill: "line" },
  mist:          { kind: "shape", shape: "rect",      w: 44, h: 470, fill: "surface2" },      // L3 only, alpha 0.85, over a locked prop

  /* the path, and the notation that rides on it */
  beam:          { kind: "shape", shape: "rect",      w: 48, h: 8, fill: "structure" },
  beamGhost:     { kind: "shape", shape: "rect",      w: 48, h: 8, fill: "structure" },       // alpha 0.45 while the beam is under test
  beamJoint:     { kind: "shape", shape: "circle",    r: 7, fill: "surface", stroke: "structure", strokeWidth: 3 },
  riserTag:      { kind: "text",  value: "", size: 20, font: "display", color: "structure" }, // "+1" / "+2" on a locked beam
  riserTagWrong: { kind: "text",  value: "", size: 20, font: "display", color: "accent" },    // the actual difference, with its sign
  heightTag:     { kind: "text",  value: "", size: 20, font: "display", color: "ink" },       // a locked prop's own altitude, at its top

  /* the world's answer to a beam that will not lie straight */
  needCourse:    { kind: "shape", shape: "rect",      w: 44, h: 28, stroke: "accent", strokeWidth: 4 },   // an EMPTY course between beam and prop top
  proudRing:     { kind: "shape", shape: "rect",      w: 44, h: 28, stroke: "accent", strokeWidth: 4 },   // a FILLED course standing through the beam
  showRing:      { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },

  /* the goal */
  shelf:         { kind: "shape", shape: "roundRect", w: 68, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  shelfGap:      { kind: "shape", shape: "roundRect", w: 34, h: 44, stroke: "line", strokeWidth: 2, radius: 8 },   // dashed: lineDash [6,5]

  /* Finish screen only */
  finishPlaque:  { kind: "shape", shape: "roundRect", w: 380, h: 56, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 18 },
  dotEmpty:      { kind: "shape", shape: "circle",    r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle",    r: 8, fill: "structure" }
};
```
`needCourse` and `proudRing` are drawn identically on purpose: the cue is **position**, not colour — an outline sitting on empty air above the prop means the path is short of you, an outline sitting on a stone that pokes through the beam means the prop is proud of the path (§12, meaning never by colour alone).

The pose set deliberately omits `oops`. GAME-DESIGN-LAW 3.0 is stricter than the ART-BIBLE pose vocabulary — *the character is never the consequence* — and the reviewer check is literally *look at the wrong-answer screenshot; if the character's state changed, reject*. On every refusal the goat holds `ART.goatThink` and the apparatus does all the reacting.

Exactly three `accent` entries exist (`riserTagWrong`, `needCourse`, `proudRing`) and they only ever appear together, during a correction, which is how the one-warm-region rule is kept (ART-BIBLE §2).

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the only two tweens Test C (instant-cut) patches to duration 0 */
  stepAcross: { duration: 250,  ease: "Sine.InOut", trigger: "the goat container 48 px flat onto the next station, once its footing has risen to path level (x set at call)" },
  traverse:   { duration: 1200, ease: "Sine.InOut", trigger: "the finish walk: the goat along the whole locked path and into the gap on the shelf (waypoints set at call)" },

  /* the apparatus answering a tap */
  courseIn:   { alpha: 1, scale: 1,   duration: 150, ease: "Back.Out", trigger: "a course set on top of the working prop (from alpha 0, scale 0.6); show-me fill" },
  courseOut:  { alpha: 0, scale: 0.6, duration: 150, ease: "Sine.In",  trigger: "the top course taken out; show-me empty" },
  rise:       { duration: 160, ease: "Sine.Out", trigger: "the prop container and the goat together, one course up or down (y set at call)" },
  footingUp:  { duration: 250, ease: "Sine.Out", trigger: "the next station's stub rising to path level at the head of an item (y set at call)" },

  /* the beam */
  beamOut:    { duration: 320, ease: "Sine.Out", trigger: "beamGhost extending from the last locked prop top out to the goat's feet (scaleX 0 to 1)" },
  beamLock:   { scale: 1.06, duration: 160, ease: "Back.Out", yoyo: true, trigger: "a beam that lies straight, settling into path" },
  beamLift:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "a beam that does not lie straight, lifting back off — it was never set" },

  /* the enacted correction — teaching, NOT travel; never patched by the instant-cut harness */
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "riserTags 250 ms apart; heightTags; needCourse and proudRing outlines; beamJoint (from alpha 0, scale 0.6)" },
  pulse:      { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCourse and proudRing outlines" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "the outlines and the coral riser tag, once the working prop's height changes" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the beam control (from alpha 0.2)" },
  mistIn:     { alpha: 0.85, duration: 400, ease: "Sine.Out", trigger: "mist settling over the locked props behind the goat at L3 (from alpha 0); static thereafter" },

  /* Boot and Finish only */
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the goat taking its place in the line on the shelf" },
  breathe:    { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the goat on the Boot and Finish screens only (ART-BIBLE §6)" }
};
```
There is no bobbing entry and no idle loop for the play surface. Every tween above is caused by a tap (GAME-DESIGN-LAW §5, Corollary 1).

## Screen layout
This game declares the taller stage **720 × 720** (BUILD-CONVENTIONS §2); the Phaser config `height` is 720 and nothing else changes. Zones are MISSIONS.md 1.4 — zone T chrome, zone W the world, zone H the hand — not BUILD-CONVENTIONS §7.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]              chrome only, nothing else           │  zone T   0- 56
 56   ├──────────────────────────────────────────────────────────────┤
      │ 16 ─────────────────────────────────────────── y=108 ▟meadow▙ │  course 16 = shelf top
      │                                              ▐█▌      ○  ◇ ○  │  herd (676/706,84)
      │ 14 ─────────────────────────────────── y=164 ▐█▌▐█▌           │  zone W  56-580
      │                                    +2 ▟▛▐█▌▐█▌                │  THE WORLD
      │ 12 ───────────────────────── y=220 ▐█▌▐█▌                     │
      │                          +2 ▟▛▐█▌                            │  the gorge
      │ 10 ─────────── y=276 ▐█▌▐█▌  ← station 9 stands from tap one  │  strata every 28 px
      │              +2 ▟▛(joint @ station 8)                         │  numbered up the rock
      │  8 ──── y=332 ▐█▌                                             │  at x=76
      │      +1 ▟▛▐█▌                                                 │
      │  6 ─ y=388 ▐█▌   (goat rides the top of the working prop)      │
      │  4 ─ y=444 ▐█▌                                                │
      │  2 ─ y=500 ▐█▌                                                │
      │  0 ══════════════════════════════════════ datum y=556 ════════ │
      │  x = 100 148 196 244 292 340 388 436 484 532 580 628           │  props 36 px wide
580   ├──────────────────────────────────────────────────────────────┤
      │                    [ beam plank ] (360,650)                   │  zone H 580-720
720   └──────────────────────────────────────────────────────────────┘
```

Fixed layout, FIT scaling. Course *c* top = `556 − 28c`. Prop *i* stands at `x = 100 + i × 48` (i = 0 … 11 for stations 1 … 12). The goat's container centre is `(stationX, propTop − 28)`, so its feet are on the prop top and its body spans `propTop − 56` to `propTop`; at course 16 that is y 52-108, four pixels above the zone-T line on the far right of the stage, where the language picker never reaches. `ART.riserTag` sits at a beam's midpoint, 14 px above it. `ART.heightTag` sits 12 px above a locked prop's top, offset 22 px to the left of the station so it never sits under the goat. Zone H holds one control and nothing else; there is no progress furniture, no counter and no caption anywhere on the play surface.

## Visual specification
- Background `THEME.colour.bg`. Zone T carries the language picker and nothing else. Progress is diegetic: the bare stubs ahead, the goat's own altitude against the shelf, and the locked path behind (MISSIONS.md 1.4).
- `ART.gorge` centred (368, 306), a low-contrast `THEME.colour.surface2` wash, never animated, drawn behind everything else in zone W.
- The scale: sixteen `ART.strataLine` hairlines in `THEME.colour.line` from x = 92 to x = 648 at `y = 556 − 28c`; `ART.strataNum` at x = 76, 16 px `THEME.font.display` `THEME.colour.inkSoft`, on even courses only; `ART.datumLine` full width at y = 556; `ART.nearBank` from x = 0 to 92 with its top edge on the datum.
- Props: stacks of 36 × 28 rectangles. A working prop's courses are `ART.course` (`fill: surface`); a locked prop's are `ART.courseSet` (`fill: structureSoft`, `stroke: structure`) — **the two states differ in stroke weight and fill together, and a locked prop additionally carries its `ART.heightTag`**, so state is never carried by colour alone (§12). A station with no prop shows `ART.stub` on the datum.
- The path: `ART.beam` 8 px `THEME.colour.structure` between consecutive locked prop tops, rotated to the run's pitch; `ART.beamJoint` at station 8; `ART.beamGhost` at alpha 0.45 while a beam is under test. `ART.riserTag` at each beam's midpoint, 20 px `THEME.font.display` `THEME.colour.structure`.
- The hero: `ART.goatIdle` / `ART.goatThink` / `ART.goatWalk` / `ART.goatSet` / `ART.goatHappy` at 56 px, side profile, facing along the path, at `(stationX, propTop − 28)`. It is drawn from the `structure` and `surface2` tint pairs and carries no coral, so the ART-BIBLE §10.1 warm-body clause does not apply.
- The goal: `ART.shelf` centred (686, 130) with its top edge on course 16; two `ART.herdGoat` at 44 px, (676, 84) and (706, 84), flipped to face the gorge; `ART.shelfGap` dashed at (692, 84). Drawn from tap one, inert during play. **A reviewer will read the herd as a dead element; it is Device 1 working correctly, and making it react per item would turn it into an approval meter, which F-44 bans.**
- **The coral rule (ART-BIBLE §2, one warm region per screen).** In the DECIDE state there is **no coral on the stage at all** — the notation on the path is `structure` and `ink`. Coral exists only during a correction, and then all three coral entries belong to the same region: `ART.riserTagWrong` at the failing beam plus the `ART.needCourse` or `ART.proudRing` outlines directly under or through it.
- L3 only: `ART.mist` at alpha 0.85 `THEME.colour.surface2` over each locked prop **behind** the goat, arriving once with `ANIM.mistIn` and static thereafter, clipped so the prop's `ART.heightTag`, the beams and the `ART.riserTag`s stay readable. The stones stop being countable; the numerals do not stop being readable.
- Tap floors, measured rather than asserted: the SET rectangle is `Rect(x − 28, 52, 56, propTop − 52)` and the TAKE OUT rectangle is `Rect(x − 28, propTop, 56, 584 − propTop)`. Because `108 ≤ propTop ≤ 528`, both are at least 56 × 56 at every one of the sixteen heights, and they share the edge at `propTop` so there is no gap between them. The beam `makeButton` is 220 × 72 at (360, 650). Per §3.1 the hit rectangles are **mapped, not sampled at the centre**, and both are driven by a real pointer in at least one assertion.
- Keyboard: Tab moves between the working prop and the beam control. On the prop, Up arrow or Enter sets a course, Down arrow takes the top one out; on the beam, Enter or Space lays it. The focus ring is the library's.
- Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral: numerals, a plus sign and a minus sign on the play surface, two strings on the Start screen. **The content is the path**, authored once as a station table, and the level controls the cue set rather than the item (see World, deviation 3).

**The station table (fixed for the whole session; nothing here ever moves).**

| station | x | at session start | item | target height T | prop top y | run |
|---|---|---|---|---|---|---|
| 1 | 100 | stands at 1 | — | 1 | 528 | A |
| 2 | 148 | stands at 2 | — | 2 | 500 | A |
| 3 | 196 | stands at 3 (the goat starts here) | — | 3 | 472 | A |
| 4 | 244 | bare stub | **1** | 4 | 444 | A (+1) |
| 5 | 292 | bare stub | **2** | 5 | 416 | A (+1) |
| 6 | 340 | bare stub | **3** | 6 | 388 | A (+1) |
| 7 | 388 | bare stub | **4** | 7 | 360 | A (+1) |
| 8 | 436 | bare stub | **5** | 8 | 332 | A (+1), abutment |
| 9 | 484 | **stands at 10** (surviving footing) | — | 10 | 276 | B |
| 10 | 532 | bare stub | **6** | 12 | 220 | B (+2) |
| 11 | 580 | bare stub | **7** | 14 | 164 | B (+2) |
| 12 | 628 | bare stub | **8** | 16 | 108 | B (+2) |

**The two missing-term items are structural properties of the stations, not of the level.**
- **Item 5 (station 8)** is bracketed: prop 7 stands at 7 on its left and prop 9 stands at 10 on its right. The run behind is +1, so the answer is 8; the standing 10 is the world showing that the pitch is about to change, and locking prop 8 lays the abutment beam and its "+2" riser. A child who tries to interpolate between 7 and 10 finds no whole course there, which is the point.
- **Item 8 (station 12)** is bracketed by prop 11 at 14 and by the meadow shelf itself, whose top edge is course 16. The last term is pinned on both sides, and the destination is the answer.

**The three levels — cue sets, in the pre-pivot spec's own three shapes.**
- **L1** (the pre-pivot "tags and ghost shown"): every `ART.riserTag` on the path behind the goat is visible from the item's first frame, and the working prop starts level with the path, which is the physical form of the old ghost of the previous term's height.
- **L2** (the pre-pivot "tags hidden until Check"): a riser numeral appears only when its beam locks, and stays. By construction the abutment "+2" is already on the path from item 5 onward whatever the level, because it locked there.
- **L3** (the pre-pivot "numerals only, towers revealed on Check"): as L2, plus `ART.mist` over the locked props behind the goat, so their stones cannot be counted and only their `ART.heightTag`s can be read. The run must be computed from numerals rather than seen as a staircase.

Height numerals (`ART.heightTag`) are on every locked prop at every level: the abstract notation is never the thing that is hidden (GAME-DESIGN-LAW 2.5).

**No shuffle, and that is not an omission.** §13's "shuffle within level" and "never the same slot twice running" cannot apply to a single continuous path — the item order **is** the path, and a station that jumps when you knock on it stops being a place. §13's fixed-world form applies instead: what varies per item is the target and the run, never the positions (Rules, THE MORTAR SETS, part 4). The child never controls item order, so F-41's conveyor rule holds: the items are events, the gorge is a location.

## Rules
- **Item count**: 8 (one item = one prop raised and one beam laid). Below §8's 10-12 for the 6-8 band; the cause and the alternative are declared in World, deviation 2.
- **Difficulty progression**: 2 consecutive first-beam-straight items → the next item is played at the next cue level up (cap L3).
- **Adaptation**: a refused beam, or a non-first-beam item on 2 consecutive items → the next item is played one cue level down (floor L1). The item itself is never abandoned or skipped — the path has no branches.
- **What happens on a correct answer** (the world accepts the move — `onLine(deck.lastPropTop, deck.pitch, hero.x, hero.y)` holds): `ART.beamGhost` becomes `ART.beam` and locks with `ANIM.beamLock`; the beam's `ART.riserTag` and the prop's `ART.heightTag` appear (`ANIM.appear`); the prop's courses swap to `ART.courseSet`; `tone("correct")`; `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-beam items only (helped items get `tone("correct")` and no praise pop); `ART.goatHappy` 400 ms. At item 5 the abutment beam 8 → 9 also lays, `ART.beamJoint` appears and its riser reads "+2". Then the head of the next item: `ANIM.footingUp` raises the next stub to path level and `ANIM.stepAcross` walks the goat onto it, capped together at 600 ms.
- **What happens on a wrong answer** (the world refuses the move; the apparatus is disabled for the whole enactment, the goat's pose never changes, and nothing the child built is removed):
  - Copied the last term (set 5 for a run reading 1, 3, 5): the beam comes out dead level in a climbing path; tags "+2, +2" then coral "+0"; two `ART.needCourse` outlines pulse between the beam's end and the prop top.
  - Added one by default on a +2 run (set 6): the beam kinks downward at the joint; "+2, +2, +1"; one `ART.needCourse` outline pulses.
  - Started over (emptied to the floor): the beam plunges downhill into the gorge; "+2, +2, −4"; four `ART.needCourse` outlines pulse.
  - Overshoot (set 8 where 7 was the term): the top course stands proud through the beam, ringed by `ART.proudRing` and pulsing; "+2, +2, +3"; the child takes the stone out and lays the beam again.
  - A bracketed item wrong (item 5 or item 8): the same enactment, and the standing prop on the far side keeps its own `ART.heightTag`, so the child can read the term the run has to arrive at as well as the one it came from.
  Every one begins with `tone("nudge")` and ends with `ANIM.beamLift` — the beam was never set. The enactment runs 2.4-3.2 s and is never shorter than the pre-pivot spec's.
- **Retry behaviour**: per item — attempt 1 unaided → attempt 2 after the outlines and the riser tags → attempt 3 is the show-me (the prop fills or empties itself to T at 200 ms per course with tones, the goat riding it; `ART.showRing` pulses on the beam control; tapping it completes the item solved-with-help). No attempt 4. Success is certain.
- **Anti-brute-force guard: THE MORTAR SETS.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the gorge a place (GAME-DESIGN-LAW §6). The named replacement has four parts and does not depend on anything moving. (1) *A beam, once locked, is path for the rest of the session*: the span cannot be revisited or re-tried after its item, and commitment is a one-way door. (2) *Any refused beam forfeits the first-beam mark for that span, and attempt 3 is the show-me*, so laddering a course at a time can never produce a clean span — a child who guesses upward still finishes the path (success is certain) and finishes it with a hollow token. (3) *There is no tile set to re-shuffle, because there are no tiles*: the answer is a height on a sixteen-course continuum, so a random setter is right about one time in sixteen against one in three on a three-tile board, and a guesser reaches the show-me ladder on essentially every item and is TAUGHT rather than rewarded. (4) *The rule changes at the abutment*, so the previous item's answer is never reusable and no single habit ("add one") survives the session; what varies per item is the target and the prop's starting height, never the positions. The remaining shortcut is stated rather than defended against: a child can sight along the built path instead of counting risers, which is extending a linear pattern geometrically — the objective in another register. L2 hides the riser numerals until commit and L3 puts the standing props in mist, which removes the geometric cue entirely and forces the arithmetic.
- **Finish condition**: 8 items — the path unbroken from the near bank to the meadow, and the goat standing in the gap in the line. No losing state, nothing that can be lost, nothing that counts down. Exactly zero ways a session ends other than by finishing. Nothing in the world ever decays: no locked beam unlocks, no locked prop sinks, the meadow never moves further away, the herd never leaves, and a refused beam costs an attempt and nothing else (the RATCHET RULE). The one thing that ever goes down is a course the child themselves takes out of their own uncommitted prop, which is a builder adjusting their own work.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is deliberately NOT used — there is no item counter on the play surface.
- Game-specific `STRINGS` (all 11 locales at build time, §17): `title` = "The High Meadow"; `premise` = "Make the path straight." **Seven English words for the whole game**, against the 6-8 band's eight (F6). Both appear on the Start screen only; the play surface carries zero words. Riser tags are a sign and a numeral and height tags are a numeral, never words, in every locale.

## Sound
`tone("tap", k)` on each course set or taken out, with k = the prop's new height, so the pitch climbs with the stone and a child hears the tower grow (F-213); `tone("tap", k)` per riser tag revealed during a correction, 250 ms apart; `tone("tap", k)` per course during a show-me fill or empty, 200 ms apart; `tone("correct")` when a beam locks; `tone("nudge")` when a beam does not lie straight; `tone("finish")` once. Sound never carries meaning the screen does not also show. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (the title, the premise, the beam plank's label, All done, Play again, Menu and the praise rotation change with the picker; the gorge is numerals and signs).
- [ ] Works at narrow width (400-px iframe: all twelve stations, the strata numerals up the rock, the goat, the meadow and the beam plank all visible in one frame; the stage is 720 × 720 and scales as one).
- [ ] Keyboard operable (Tab moves between the working prop and the beam; Up or Enter sets a course, Down takes the top one out, Enter or Space lays the beam; and per §3.1 at least one assertion drives a **real pointer**, with the hit rectangles mapped rather than sampled at the centre).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused beams still ends in a locked span via the show-me; the goat never falls, is never denied and never changes pose on a refusal; the session cannot end except by finishing).
- [ ] MISSION — the goat, the working prop and the meadow are all on screen in the very first frame of item 1, and the meadow's (x, y) is identical in the first and last frames of the session (M1).
- [ ] MISSION — driving a full session, the hero's y changes on every one of the 8 items, and every position change is a tween the child caused (M1).
- [ ] MISSION — the commit handler reads `hero.y`; a repo-wide search finds no `item.answer` field and no stored target compared against a tap (the Displacement rule, GAME-DESIGN-LAW 2.3).
- [ ] RATCHET — a session driven with a wrong answer on every item never decreases `mission.progress` (locked beams + locked props); no locked beam unlocks, no locked prop sinks, the meadow never moves and neither adult goat leaves the shelf (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.stepAcross` and `ANIM.traverse` to duration 0 produces a byte-identical item log: the same courses set, the same beams laid, the same tags placed, in the same order. The removed time is 3.2 s across a ~6 minute session, and it is reported, not asserted. The harness must NOT patch `ANIM.appear`, `ANIM.pulse` or the show-me — those are the teaching, not the travel.
- [ ] DELETION 1 — accept every prop height and lock every beam: there is no choice left anywhere on the stage, raising the prop stops meaning anything, and no playable building mode survives.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: the beam has nothing to reach and the correctness predicate has no position to read, so item 1 becomes mechanically impossible to complete.
- [ ] FREEZE (M2) — at every decision point of a full session, if the working prop is enabled the running tween count is zero; the goat holds one static pose and nothing breathes, drifts, wilts or loops during play.
- [ ] Tapping the goat, or the strip above it, sets one course; the prop and the goat rise 28 px together and the goat's feet stay on the prop top; the note rises with the height. Tapping the stones below the feet takes the top course out. A prop can never have a hole in it.
- [ ] The SET and TAKE OUT rectangles are measured at course 1 and at course 16 and are both at least 56 × 56 at both extremes, and they share their edge at the goat's feet with no gap and no overlap.
- [ ] The prop cannot go below course 1 or above course 16, and a tap at either limit is a silent no-op that does not move the goat.
- [ ] Item 1 opens with station 4's footing already risen to 3 and the goat walked flat onto it — it never steps down onto a working prop at any item or any level.
- [ ] A dead-level beam on a climbing path shows a coral "+0" and outlines the missing courses between the beam's end and the prop top; an over-tall prop shows its top courses standing proud through the beam, ringed; the two outlines are the same drawing and are told apart by position, not colour.
- [ ] A refused beam lifts back off, nothing the child built is removed, the goat's pose is identical in the before and after screenshots, and the beam control stays disabled until the prop's height changes.
- [ ] Locking prop 8 lays the abutment beam onto the standing footing at station 9, places the joint, and its riser reads "+2" — the pitch change is built, never announced.
- [ ] At L1 every riser numeral behind the goat is visible from the item's first frame; at L2 a riser appears only as its beam locks; at L3 the locked props behind sit in a static mist with their height numerals still readable.
- [ ] Only ONE coral region is on screen in any frame, and in the DECIDE state there is none at all.
- [ ] Two first-beam items in a row move the next item up a cue level; a refused beam moves it down one.
- [ ] The finish walk carries the goat along the whole path it built and into the gap between the two adults; the gap closes and three goats stand where there were two.
- [ ] The finish screen re-draws the gorge at its play coordinates with the whole path still standing, and shows eight first-try tokens — filled for an unaided item, hollow for a helped one — and no score, no time and no star.
- [ ] With `?sound=off` nothing is audible.
