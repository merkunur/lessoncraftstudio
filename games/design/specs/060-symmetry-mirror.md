# 060 — Out to the Tortoise

## Identity
- Slug: `symmetry-mirror`
- Subject / topic: Mathematics / line symmetry — completing the mirror half of a figure on a grid across a vertical line
- Age band: `8-9`
- Interaction pattern: `P6` — build on a grid (tap positions to lay boards; the commit is the badger's walk, not a Check tile)
- Frame: THE SPAN
- Estimated build size: ~660 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6. Frame contract: `design/MISSIONS.md` FRAME 6, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. Content is language-neutral (a walkway, boards and a mirror beam); no `LOCALE_DATA`.

## Learning
- Objective: Completes the reflection of a half-figure across a vertical mirror line on a cell grid so that every filled cell has a matching cell the same distance from the line on the other side, and checks it.
- Prerequisites: Fills and un-fills grid cells by tapping (games 003/055); counts cells along a row.
- Curriculum links: F-115 (2D shapes — sides lit one by one; the reflected-cell feedback is the symmetry analogue: each wrong cell reflects back across the line), F-31 row "Symmetry" — conservative 8-9, earliest 6, 9 of 12 systems → 8-9 (US 4.G.A.3 "recognize a line of symmetry … identify line-symmetric figures" prepared at grade 3; England Y2-3 "line of symmetry in a vertical line" (Y2) and "symmetry in 2-D shapes" (Y3-4); Germany Klasse 3 "Achsensymmetrie / Spiegeln"; France CE2 "symétrie axiale sur quadrillage"; Netherlands groep 5 "spiegelen"; Spain 2º ciclo "simetría"; Brazil EF03MA — figuras simétricas; Sweden åk 3 "symmetri"; Denmark 2.-3. klasse "spejling" (F-39 — spejling at 8); Norway 3. trinn "symmetri"; Finland grade 3 "peilaus").
- Common misconceptions (F-115, F-101), each with this game's response:
  1. **Translation instead of reflection (copying the half across so the figure repeats rather than flips).** Response: a translated copy preserves left-to-right order, so column 1 is boarded where column 4 belongs — **every** board is then resting on nothing and **every** tie is unfinished. The badger stops at the first row that will not carry it and steps back one row; then, world frozen, every loose board in the section lifts on the water and drifts across the beam (`ANIM.drift`, 400 ms, 200 ms apart) to the position it would need as a partner, bumps against bare water where no given board is, drifts back, and the badger sets it on the pile; **and** every unfinished tie in the section lifts its bare end clear of the water (`ANIM.tieRise`, 300 ms apart) and holds. The child sees the whole copy fail to find partners, with the true reaches visible as timber at the same moment. Enactment ≥ the pre-pivot spec's, and the section is `setEnabled(false)` throughout.
  2. **Distance from the line ignored (the mirror cell put one column too close or too far).** Response: the tie rises. It is ONE timber with the beam at its middle, the given board nailed to one end, and its far end breaking the water **exactly one square short of, or one square beyond, the board the child laid**. The old dashed mirror thread was a hint drawn on top of the grid; here the same horizontal equal-length measure is a rigid object that could not be otherwise, so the wrong distance is refuted by the wood rather than explained by the game. `ART.tie` holds up for 1200 ms, then sinks (`ANIM.tieSink`).
  3. **Rows shifted (the reflection placed a row up or down).** Response: a tie lies square across the beam, so a board one row off is on no tie at all — it lifts and drifts as a loose board and comes back to the pile, while the tie it was meant for rises **in the row above or below it** with nothing on its far end. The measure is still always horizontal; it is now load-bearing, and the child watches the board and its intended timber fail to be in the same row.
  4. **Cells adjacent to the line handled wrongly (a cell touching the line "reflects onto itself" or is skipped).** Response: these are the shortest ties — 176 px of timber, one square each side — and they lie **directly under the badger's feet on the beam**. The 64 px clear channel at x 328-392 exists precisely so the badger never covers them. L1 figures always include a position touching the line, so the first tie a child ever sees rise is the one it is standing on: the mirror is the LINE, not the first column. In the pre-pivot spec this was the least visible correction on the board; on this apparatus it is the most.
  5. **Not checking symmetry as a whole (some cells right, some missing, the child stops).** Response: the badger cannot reach the far edge, and it is carrying the next section's beam on its shoulders, so the walk is manifestly unfinished. Every unfinished tie in the section rises and holds. On the second failed walk the ties **stay up out of the water** and the badger lays a board on each bare end one at a time from the beam outward (`ANIM.layBoard`, `tone("tap", k)`), any loose boards drift back to the pile, and `ART.showRing` appears around the badger; tapping it completes the section as solved-with-help, with no praise pop. The section is never accepted until every tie carries two boards and nothing is loose.

## Mission
**Mission, as the child would say it.** *Get the tortoise off the hummock.*

**The hero.** A badger, in side profile, 56 px, standing out on the unfinished walkway. It is chosen deliberately over the otter and the beaver on a colour argument, not a flavour one: ART-BIBLE §9.4's warm-body clause says a mascot whose body is an `accent` tint spends the game's ENTIRE coral budget, and in this game the coral is the child's own boards, scattered all over the apparatus. The badger's body is `surface2` tints with `ink` head stripes — zero accent, zero teal — so it collides with neither the given boards (`structure`) nor the child's (`accent`). It is also the right animal for the job: a low, heavy, digging animal that reads as able to shoulder a timber, and one that wades without any suggestion of peril.

**What it physically does, and it does it in both beats of every item.** During the build it **walks the beam** — the centre stringer of the section, which is the mirror line itself — sliding up and down between the five rows and reaching out to set a board where it stands. At the commit it takes the next section's timber across its shoulders and **walks the section it just built**. This is THE SPAN's signature rule kept literally (MISSIONS.md FRAME 6: *"the hero is never a spectator waiting for a finished bridge, it is out on the end of the unfinished one"*).

**The want (the visible lack), readable from one still frame at 400 px with no motion and no words.** A half-built duckboard walk running away from you across a shallow flooded fen. Boards down one side of its centre beam, bare water down the other. A badger standing on the beam with an armful of boards. At the top of the frame, over open reeds, a dry hummock with a tortoise sitting on it, facing this way, not coming. The lack is the missing half, and a walkway with planks on only one side is visibly not a walkway yet — a child who cannot read gets it from the photograph.

Nothing about the tortoise is in peril and nothing about it worsens. It is on dry grass in the sun. It simply cannot cross an inch of water on its own, because it is low-slung, and it stays exactly as drawn until the badger arrives. It does **not** react to a correct answer: a waiting party that reacts every item becomes an approval meter, which is F-44's banned shape (MISSIONS.md §5 Device 1).

**The goal.** `ART.hummock` with `ART.tortoise` on it at a constant **(520, 74)** for the entire session, drawn from tap one, changing state only at the finish.

**S — the single state variable: THE SET OF POSITIONS ON THE OPEN SIDE WHERE THE BADGER HAS SET A BOARD.**

- **Mathematical reading:** the reflection the child has produced so far — for each given cell at (column-from-line c, row r), whether a cell exists at (c, r) on the other side, and whether any cell exists that has no partner. S is the candidate mirror image.
- **Physical reading:** how much of this section's deck is laid. Every board on the built side is nailed to the end of a **tie** — one timber laid across the beam, sticking out the same distance both ways *because it is one timber and the beam is its middle*. A tie carrying a board at both ends is finished deck. A tie carrying a board at only one end is a see-saw. A board sitting where no tie runs is loose, resting on nothing.

**Goal predicate on S:** the badger reaches the far edge of the section carrying the next beam. That happens exactly when every tie is finished and no board is loose — which is exactly when S is the reflection.

**Transition function:** setting one board = reflecting one cell. **The child's tap selects a transition of S**; it never reports an answer about S. There is no `answer` field anywhere in the game, no answer tile, no keypad and no Check tile; the test is whether the deck will carry the timber.

**The isomorphism — moving IS solving.** *The tie is one timber, so its two ends are the same distance from the beam and in the same row. The reflection is not compared to the deck — the reflection IS the deck.*

That one sentence carries both components of the mathematics at once:

- **Distance from the line** is enforced because a tie is rigid and the beam is its midpoint. It cannot reach 3 one way and 1 the other.
- **Row** is enforced because a tie lies square across the beam. A board one row off is not on that tie, it is on nothing.
- **Extras** are caught because a tie only exists where a given board sits. A board anywhere else has nothing under it.
- **Empty rows are trivially passable**, which is correct: the empty set is symmetric, and the badger walks straight over a row with no ties.

**The ties are submerged and invisible while the child is building.** That is the whole task, given a diegetic reason: the built side is the evidence, the open side is opaque water, and the child must work out where the timber reaches before putting a board on it. On a failed walk the badger's weight lifts each unfinished tie's bare end clear of the water.

**Why the deferred, whole-section commit is load-bearing and not a worksheet tail.** Laying a board is free — a board is light and the ties are underwater. **Weight is what tests a see-saw.** So the badger builds freely (P6 unchanged: any order, one tap per board, tap again to lift) and then *takes the load*. The commit is a traversal — `answer = f(the badger's progress along the section)` — and the objective's own words, *"and checks it"*, survive intact. Instant per-board refusal would have been easier to build and would have destroyed misconceptions 1 and 5, which only exist because a child can complete a whole wrong figure and stop.

**Two beats, one apparatus, no split attention.** The child never leaves the section. There is no world screen and no problem panel; the journey is along the thing being learned (GAME-DESIGN-LAW 2.4a, and F-42's larger half).

**The mark that stays.** Every completed section is laid into the walk and never comes up again (Device 2, and the RATCHET RULE). `mission.progress` for the M4 gate = (courses laid) + (boards settled under a walked row); monotone by construction, and a session driven with a wrong answer on every item never decreases it.

**Diegetic progress (no progress furniture of any kind on the play surface).** Three displays, no glyphs, no counter: (1) *the walk lengthens* — ten courses, each drawn with the silhouette of the figure the child completed in it, a record of the session that is also the thing itself, which is F-44's *"path filled"* literally rather than as a metaphor; (2) *the badger's own far-edge y rises* about 9 px per section, so it is nearer the tortoise than it was and never goes back; (3) *the timber it carried out becomes the next section's beam*, so the world visibly extends by exactly the thing the child just earned. From the first tap the whole distance is on screen: the deck's far edge, the band of open reed water above it, and the tortoise beyond.

## World
Stage **720 × 560**, `Scale.FIT`, static camera, no scrolling, legible at a 400-px iframe. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** Two things that stood here in the pre-pivot spec are deleted: the progress circles at y = 28 and `t("question_x_of_y")` at (360, 48). Both are banned on the play surface by MISSIONS.md 1.4 — the closing reeds are the counter.

**Zone W, y 56-548 — THE WORLD.** The canonical zone W is 56-420; **zone H is empty in this frame, so its 140 px is ceded to the world** ("the world gets the height", MISSIONS.md 1.4; 041 sets the precedent). The hero and the goal are both inside zone W at every moment of the session and the goal's (x, y) never changes.

- **The far hummock, y 56-92.** `ART.hummock` — a band of dry grass and reed heads, x 60-660. `ART.tortoise` 64 px at **(520, 74)**, facing down the walk. Never animated during play.
- **The finished walk, y 92-190.** A receding strip. At item *k* the deck's far edge is at **y = 186 − 9.4 × (k − 1)**; laying section *k* moves it to 186 − 9.4 × k, so the `ART.reedWater` between deck and hummock closes by one course per section and is gone after item 10 (edge at y = 92). Each completed section is one `ART.deckCourse` about 9.4 px tall, tapering **300 px wide at y = 186 to 150 px at the hummock**, carrying its own figure as an `ART.courseFigure` silhouette at 40 % alpha — so the ten courses are ten different shapes, not ten identical tokens.
- **The working section, y 190-490 — the apparatus.**
  - `ART.stringer`: a 10 px `structure` beam at **x = 360**, y 190 → 490, with `ART.joint` cross-pieces at (360, 192) and (360, 488). This is the mirror line, the badger's catwalk, and every tie's midpoint — one object doing all three jobs.
  - **A 64 px clear channel at the centre (x 328-392)**, so the 56 px badger standing on the beam never occludes the two line-adjacent positions, which are the most important positions in the game (misconception 4).
  - 40 positions, `ART.cell` 56 × 56, pitch 60 inside each half. Left column centres **x = 300 (c1) · 240 (c2) · 180 (c3) · 120 (c4)**; right column centres **x = 420 (c1) · 480 (c2) · 540 (c3) · 600 (c4)**; row centres **y = 220 · 280 · 340 · 400 · 460**. Distances from the beam: **60 · 120 · 180 · 240, identical both sides**.
  - `ART.fen` is the shallow-water wash behind the whole section, low-contrast, never animated (ART-BIBLE §4).
  - `ART.givenBoard` + `ART.givenStud` on the given side, locked and unfocusable. `ART.board` + `ART.boardStud` where the child has set one. The two halves differ by **stud shape as well as colour** (§12): a round pale stud on a given board, a small dark square on the child's.
  - `ART.tie`: submerged, alpha 0. A tie at reach *c* spans x = 360 ± (60c + 28) at its row's y, with a depth offset of −9 / −3 / +3 / +9 px for c = 1…4 so several ties in one row read as stacked timbers rather than one blur.
- **The near landing, y 490-548.** `ART.landing` — firm bank. `ART.pile`, the timber stack, at **(120, 518)**, **explicitly unlimited: nothing ever runs out**. The badger's start mark at (360, 512).
- **The badger.** 56 px. On the near landing at item start; on the beam at (360, rowY) while building; walking the channel at the commit. Its far-edge y is monotone across the session, rising about 9 px per completed section.

**Zone H, y 420-560 — EMPTY. Zero controls, zero pixels.** The five-control ceiling is spent as zero, exactly as in THE CROSSING, THE ROUNDS and THE TENDING: everything the child may play is a place in the section, so a strip of controls under it would only be a second copy of the world. **The commit control is the badger itself** — tapping it sends it for the timber and out along the section. That replaces the pre-pivot `makeButton ok` at (360, 510); an OK button under a grid is the worksheet shape the ruling names, and the walkway already has a better one: the animal that has to walk it.

- **Ready state.** Once at least one board is down, `ART.readyRing` (a soft `structure` ring, the mooring-rope motif) appears around the badger — the diegetic form of "OK is dimmed until at least one cell is filled". Before that, tapping the badger does nothing but a small `ART.badgerThink` head-turn toward the pile.
- **Discovery (the R4 concession, which F-42 permits verbatim: the first item of a new mechanic may demonstrate itself once, then fade).** On item 1 only, about 400 ms after the first board is laid, the badger takes **one step toward the pile and stops**, and one tie surfaces for 500 ms and sinks again. Both demonstrate once and never repeat.
- **Keyboard.** Arrow keys move the badger between the open side's positions row-major (it slides on the beam and reaches, exactly as a tap does); Enter sets or lifts a board; **Tab reaches the badger, Enter sends it**. Given boards are skipped. Under `?embed=1` the picker is not created.

**Text budget: 8 English words for the whole game**, against the band's ceiling of two short sentences. Play screen: **zero**. Start screen: the title (4 words) and the premise (2 short sentences). Finish: `t("all_done")` and the two chrome buttons.

**F-69 element count (§5.1 reading: an instrument counts as ONE, candidates count individually).** The section grid is **1 instrument** — a coordinate field the child learns once, not twenty alternatives to evaluate, on exactly the reading that lets spec 120 ship an eleven-key keypad. Plus the badger (1) = **2 elements**. The pile, the beam, the hummock and the tortoise are inert scenery and count zero. This game depends on that reading; see the risk note in How it plays.

## How it plays
1. **Start screen.** `S("title")` at (360, 190), 52 px `THEME.font.display` `THEME.colour.structure`; `S("premise")` at (360, 252), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, two lines maximum; `ART.badgerIdle` 96 px at (360, 350) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 470); the picker at (16, 16). **Never auto-starts.**

2. **The fen is built once, and it is a place.** On entering Play the game draws `ART.fen`, `ART.landing`, `ART.pile`, `ART.hummock` and `ART.tortoise`, the empty `ART.reedWater` band, and the first working section: `ART.stringer` with its two `ART.joint`s, forty `ART.cell` positions, and the item's given boards. **None of this is rebuilt between items** except the section's own contents. The positions never move for the whole session — that is what makes the fen a location rather than a board, and it is why the P1 tile re-shuffle is unavailable and a different guard is declared (Rules, THE SETTLED COURSE).

3. **Item 1 (L1, a 3-cell figure — say [(1,2) (1,3) (2,3)] given on the left).** The badger stands at its mark (360, 512), `ART.badgerIdle`, facing up the walk. Three `ART.givenBoard`s sit at (300, 280), (300, 340) and (240, 340). The open right half shows twenty `ART.cell` positions of shallow water and mooring pegs. The tortoise is already on the hummock. Nothing is animating: the stage is frozen and a choice is open (F1).

4. **Laying a board (an ACT, ≤ 220 ms).** The child taps an open position, say (420, 280). The badger slides along the beam to (360, 280) (`ANIM.slide`; usually zero travel, because it is often already at that row) and reaches out (`ART.badgerReach`, `ANIM.reach`); `ART.board` + `ART.boardStud` appear at the position (`ANIM.layBoard`), `tone("tap", k)` with k = the number of boards down, so the pitch climbs as the deck grows. Tapping a laid board again slides the badger to that row and lifts it (`ANIM.liftBoard`, `tone("tap", k)` at the new lower count); it goes back on the pile. **Any order, any number of changes, no judgement, no feedback** — this is the free half of the item and it is free on purpose. After the first board `ART.readyRing` appears around the badger.

5. **The commit (an ACT, ≤ 900 ms).** The child taps the badger. It walks down to (120, 518), shoulders a beam (`ART.badgerCarry`, `ANIM.shoulder`), returns to the near joint (360, 488), and walks **up the channel** row by row — y 460 → 400 → 340 → 280 → 220 → 190 — one `ANIM.tread` per row, `tone("tap", k)` per row settled. A row settles when every tie in it carries a board at both ends and no board in it is loose. A row with no ties is walked straight over.
   - **Correct (the world accepts the load).** The badger reaches y = 190, lays the beam down as the next section's spine, and the section's boards and given boards settle together in pairs from the beam outward (`ANIM.pairSettle`, 120 ms per pair, `tone("tap", k)`). `tone("correct")`. `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] — **first-try sections only**; helped sections get `tone("correct")` and no pop. `ART.badgerHappy` for 400 ms. Then the reflow: the completed section shrinks into a new `ART.deckCourse` carrying its `ART.courseFigure` silhouette, the deck's far edge rises 9.4 px, the reed water narrows, and the next section is framed in the same 190-490 box (`ANIM.settleCourse`, one ACT, about 600 ms, **after** the commit and never during an item, so zero camera tweens sit between item-start and commit — F3 intact). The badger walks back down the new beam to (360, 512).
   - **Wrong, attempt 1 (the world refuses the load).** The badger reaches the first row that will not carry it, **stops, and steps back one row** (`ANIM.stepBack`). It does not fall, does not get wet, does not drop the timber, does not go back to the start, and **its pose does not change**: `ART.badgerCarry` in the before and after screenshots, identical (GAME-DESIGN-LAW 3.0's reviewer check). `tone("nudge")` once. Then, section `setEnabled(false)` and world frozen, the row shows why — see Rules for the per-misconception choreography. Rows the badger has walked are pegged (Rules, THE SETTLED COURSE); the child edits the rows ahead and taps the badger again.
   - **Wrong, attempt 2.** The same enactment, then the show-me: the ties **stay up out of the water**, the badger lays a board on each bare end one at a time from the beam outward (`ANIM.layBoard`, `tone("tap", k)`), any loose boards drift back to the pile, and `ART.showRing` appears around the badger (`ANIM.showMe`). Tapping the badger walks it out and completes the section as **solved-with-help**. No attempt 4. Success is certain.

6. **Items 2-10** per Content and Rules, each one section further out. L1: 3-4 given boards, all within two columns of the beam, at least one touching it. L2: 5-7 given boards reaching the far columns, with a diagonal run. L3: 8-10 given boards, a figure with a hole, and on the last two L3 items **the given half is on the RIGHT** and the child boards the left, so "mirror" never collapses into "fill the right-hand side".

7. **Finish.** The badger steps off the last course onto the hummock and sets the final timber down. **The tortoise gets up** (`ART.tortoiseUp`, `ANIM.celebrate`). The Finish screen is not a summary — it is the fen at the same coordinates it has held all session, with the working grid gone and the whole walk visible end to end: ten courses running from the near landing at y 512 to the hummock at y 74, each carrying its own figure, the badger and the tortoise together at the far end. `t("all_done")` at (360, 110). A first-try course carries `ART.dotFull` at its near end and a helped one `ART.dotEmpty` — the first-try record kept warm rather than scored (§10 permits it on Finish). `makeButton` `t("play_again")` at (250, 510) and `t("menu")` at (470, 510). `tone("finish")` once. `GameCore.reportHeight()`.

**Session ≈ 6-7 minutes. Measured ACT budget:** up to 10 lay-ACTs at ≤ 220 ms plus one walk at ≤ 900 ms per item, plus one ≤ 600 ms reflow, over ten items ≈ **31 s of travel across a session**, inside the 60 s M6 gate. Attempt 2 resumes from the last settled row, so a retry is **shorter**, not longer. Enacted corrections are excluded from that budget and must not be shortened — they are the most expensive thing in the corpus to break (GAME-DESIGN-LAW §6).

**Risk, named rather than buried (see also Rules).** The row half of the answer is genuinely positional — the badger slides the beam to that row and reaches from there, and the item's commit is genuinely a traversal, so the Displacement rule is satisfied at the level that decides correctness. But the reach out to column *c* is a tap on a place, in the sanctioned CROSSING sense (a position in the world, no candidate markings, no separate answer object) rather than four discrete steps outward. Four steps outward would have been purer and would have cost about four taps per board on a ten-board figure. **This is a trade of purity for a tap budget and it is stated, not hidden.**

## Art registry
```js
const ART = {
  badgerIdle:   { kind: "svg", value: LCSArt.get("badger.idle"),   size: 56 },  // side profile, facing up the walk; body surface2 tints, ink head stripes, NO accent and NO structure on the creature (ART-BIBLE 9.4 warm-body clause spent on the child's boards instead)
  badgerThink:  { kind: "svg", value: LCSArt.get("badger.think"),  size: 56 },  // head turned toward the pile; the only response to tapping it before a board is down
  badgerReach:  { kind: "svg", value: LCSArt.get("badger.act"),    size: 56 },  // one forepaw extended sideways off the beam, board in paw
  badgerWalk:   { kind: "svg", value: LCSArt.get("badger.walk"),   size: 56 },  // swapped pose, not a spritesheet
  badgerCarry:  { kind: "svg", value: LCSArt.get("badger.carry"),  size: 56 },  // a beam across the shoulders; the commit pose, and the ONLY pose during a refusal
  badgerHappy:  { kind: "svg", value: LCSArt.get("badger.happy"),  size: 56 },
  tortoise:     { kind: "svg", value: LCSArt.get("tortoise.idle"), size: 64 },  // sitting on dry grass in the sun, facing down the walk; drawn from tap one, never animated during play
  tortoiseUp:   { kind: "svg", value: LCSArt.get("tortoise.walk"), size: 64 },  // finish only: it gets up
  hummock:      { kind: "shape", shape: "roundRect", w: 600, h: 36, fill: "structureSoft", radius: 14 },   // dry grass and reed heads, x 60-660, y 56-92
  reedWater:    { kind: "shape", shape: "rect", w: 600, h: 94, fill: "surface2" },                          // the open water still to be decked, between the deck's far edge and the hummock; shrinks by one course per section
  fen:          { kind: "shape", shape: "roundRect", w: 616, h: 300, fill: "surface2", radius: 16 },        // the shallow water the working section stands in; low-contrast, never animated
  landing:      { kind: "shape", shape: "roundRect", w: 616, h: 58, fill: "structureSoft", radius: 12 },    // the firm near bank, y 490-548
  pile:         { kind: "shape", shape: "roundRect", w: 84, h: 34, fill: "structure", radius: 5 },          // the timber stack at (120, 518); unlimited, never depletes
  deckCourse:   { kind: "shape", shape: "polygon", points: [], fill: "structure", stroke: "line", strokeWidth: 1 },  // one completed section, laid into the receding walk; trapezium, width set at call (300 px at y 186 to 150 px at the hummock), height about 9.4
  courseFigure: { kind: "shape", shape: "polygon", points: [], fill: "structure" },                          // the silhouette of the figure completed in that course, drawn on it at 40% alpha; points computed from the section's cells
  stringer:     { kind: "shape", shape: "rect", w: 10, h: 300, fill: "structure" },                          // the beam at x = 360: mirror line, catwalk and every tie's midpoint, one object
  joint:        { kind: "shape", shape: "rect", w: 44, h: 8, fill: "structure" },                            // cross-pieces at the beam's ends, (360,192) and (360,488)
  cell:         { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 6 },  // an open position: shallow water with four mooring pegs at its corners, NOT a tile
  givenBoard:   { kind: "shape", shape: "roundRect", w: 46, h: 46, fill: "structure", radius: 5 },
  givenStud:    { kind: "shape", shape: "circle", r: 5, fill: "bg" },                                        // round pale stud on every given board
  board:        { kind: "shape", shape: "roundRect", w: 46, h: 46, fill: "accent", radius: 5 },              // a board the child set
  boardStud:    { kind: "shape", shape: "rect", w: 10, h: 10, fill: "inkOnAccent" },                          // small dark square: the two halves are told apart by SHAPE as well as colour (12)
  tie:          { kind: "shape", shape: "rect", w: 8, h: 8, fill: "ink" },                                    // one timber across the beam; length set at call = 2 x (60c + 28); alpha 0 while submerged
  readyRing:    { kind: "shape", shape: "circle", r: 40, stroke: "structure", strokeWidth: 4 },               // mooring-rope motif around the badger once at least one board is down
  showRing:     { kind: "shape", shape: "circle", r: 44, stroke: "structure", strokeWidth: 5 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },                     // FINISH SCREEN ONLY (10)
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }                                   // FINISH SCREEN ONLY (10)
};
```
Position addressing: columns are numbered by distance from the beam, 1-4 on each side (column 1 touches it), rows 1-5 top to bottom. A given board at (side L, column c, row r) is nailed to a tie whose other end is at (side R, column c, row r). No `oops` pose is declared for the badger and none may be added: an error changes the apparatus, never the creature.

## Animation registry
```js
const ANIM = {
  slide:        { duration: 180, ease: "Sine.InOut", trigger: "the badger slides along the beam to the tapped row; y set at call (220/280/340/400/460); x stays 360" },
  reach:        { angle: 6, duration: 120, ease: "Sine.Out", yoyo: true, trigger: "the badger reaches sideways off the beam to set or lift a board" },
  layBoard:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a board set (from alpha 0, scale 0.6); also each show-me board" },
  liftBoard:    { y: "-=24", alpha: 0, duration: 240, ease: "Sine.In", trigger: "a board lifted back to the pile (undo, loose-board return, section clear)" },
  shoulder:     { duration: 220, ease: "Sine.InOut", trigger: "the badger takes the next section's beam across its shoulders at the pile (120, 518)" },
  tread:        { duration: 150, ease: "Sine.InOut", trigger: "one row of the commit walk up the channel; y decreases 60 per step, x stays 360" },
  stepBack:     { y: "+=60", duration: 200, ease: "Sine.Out", trigger: "the walk is refused: the badger steps back one row and holds" },
  tieRise:      { alpha: 1, y: "-=10", duration: 300, ease: "Sine.Out", trigger: "an unfinished tie lifts its bare end clear of the water and HOLDS (from alpha 0)" },
  tieSink:      { alpha: 0, y: "+=10", duration: 300, ease: "Sine.In", trigger: "the ties settle back under the water 1200 ms after the enactment ends" },
  drift:        { duration: 400, ease: "Sine.InOut", trigger: "a loose board lifts on the water and glides across the beam to its would-be partner position (x set at call: 720 - x), rests 400 ms against bare water, glides back, then is lifted to the pile" },
  pairSettle:   { scale: 1.06, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a given board and its partner together on an accepted section, pairs from the beam outward" },
  settleCourse: { duration: 600, ease: "Sine.InOut", trigger: "the completed section shrinks into a deck course, the deck's far edge rises 9.4 px and the reed water narrows; ONE act, after the commit, never during an item" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the ring around the badger on the third attempt (from alpha 0.2)" },
  breathe:      { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the badger on the Boot and Finish screens ONLY (ART-BIBLE 6)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the tortoise getting up, finish screen only" }
};
```

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                                 |  zone T  0-56
 56   +--------------------------------------------------------------+   chrome only
      |  ~~~ dry grass, reed heads ~~~        (tortoise 520,74)       |  hummock 56-92
 92   +--------------------------------------------------------------+
      |            open reed water, narrowing every section           |
      |   ====================================== 150 px at the top    |  the finished
      |    ====================================  one course per item  |  walk 92-190
      |     ==================================   300 px at y=186      |
190   +--------------------------------------------------------------+
      |   given half (left)      ||      open half (right)            |
      |  +----+----+----+----+   ||   +----+----+----+----+  row1 y=220|
      |  |    |    |    | ## |   ||   |    |    |    |    |            |
      |  +----+----+----+----+   ||   +----+----+----+----+  row2 y=280|  the working
      |  |    |    | ## | ## |   ||   |    |    |    |    |            |  section
      |  +----+----+----+----+   ||   +----+----+----+----+  row3 y=340|  190-490
      |  |    |    |    |    |   ||   |    |    |    |    |            |
      |  +----+----+----+----+   ||   +----+----+----+----+  row4 y=400|
      |  |    |    |    |    |   ||   |    |    |    |    |            |
      |  +----+----+----+----+   ||   +----+----+----+----+  row5 y=460|
      |  x=120  180  240  300    ||    420  480  540  600              |
      |          beam x=360, 64 px clear channel 328-392               |
490   +--------------------------------------------------------------+
      |  [pile 120,518]        (badger start mark 360,512)            |  near landing
548   +--------------------------------------------------------------+   490-548
      |  zone H 420-560: EMPTY. Zero controls. The badger IS the       |
560   +--------------------------------------------------------------+   commit control.
```
Fixed 720 × 560 layout, `Scale.FIT`, static camera. Zone H holds nothing, so the world runs to y 548 (MISSIONS.md 1.4: the world gets the height). There is no progress furniture and no item counter anywhere on the play surface — the closing reed water is the counter, and the ten courses are the record.

## Visual specification
- Background `THEME.colour.bg`. `ART.fen` behind the working section, `ART.landing` across the near bank, `ART.hummock` across the top, `ART.reedWater` between the deck's far edge and the hummock.
- `ART.tortoise` 64 px at (520, 74), `THEME.colour.ink` outlines, drawn from the first frame and static for the whole session.
- Completed sections: `ART.deckCourse` stacked from y = 186 upward, one per item, each with its `ART.courseFigure` at 40 % alpha in `THEME.colour.structure`.
- `ART.stringer` at (360, 340) spanning y 190-490, with `ART.joint` at (360, 192) and (360, 488). The 64 px channel x 328-392 stays clear of art at all times.
- Forty positions: the open half's twenty are `GameCore.makeTile` 56 × 56 carrying `ART.cell`; the given half's twenty are plain draws, locked and not focusable, with `ART.givenBoard` + `ART.givenStud` on the figure's positions. Pitch 60 gives a 4 px gap, below the §3 gap guidance and accepted for the same reason the pre-pivot spec accepted it: nothing is judged while boards are being laid and a mis-tap is undone by one tap. Tap target 56 × 56 is exactly the 8-9 floor.
- `ART.board` + `ART.boardStud` on the child's boards. `ART.tie` drawn at alpha 0 under each given board's row, length 2 × (60c + 28), depth offset −9 / −3 / +3 / +9 px by reach so stacked timbers are separable.
- The badger: `ART.badgerIdle` at rest, `ART.badgerReach` while setting, `ART.badgerWalk` on the beam, `ART.badgerCarry` for the whole commit including every refusal, `ART.badgerHappy` for 400 ms on an accepted section, `ART.badgerThink` only when tapped with nothing built. `ART.readyRing` around it once a board is down; `ART.showRing` on the third attempt.
- Colour discipline (§12, ART-BIBLE §10): `structure` teal is the given half, the beam and the walk; `accent` coral is the child's boards and nothing else on the play surface — one accent region per frame. The palette carries no red, and no state is signalled by colour alone: given and child boards differ by stud shape, a see-saw is signalled by a timber standing out of the water, a loose board by drifting.
- Text on the play surface: **none**. Numerals: none. The only abstract notation is the grid itself and the timber's equal reach, both visible in the same frame as the fiction at the moment of the answer (GAME-DESIGN-LAW 2.5).
- Keyboard: arrows move the badger between the open half's positions row-major; Enter sets or lifts; Tab reaches the badger; Enter sends it. Focus ring per `makeTile`. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Figures are lists of given boards (column-from-line c, row r) on the given side; the deck is the same list mirrored. "Side" = which half is given (L unless stated); on a side-R figure the child boards the LEFT half.
- **L1** (3-4 boards, columns 1-2, one touching the beam): [(1,2) (1,3) (2,3)] · [(1,1) (1,2) (2,2) (2,3)] · [(1,3) (2,3) (2,4)] · [(1,2) (2,2) (2,1) (1,4)]
- **L2** (5-7 boards, reaching columns 3-4, a diagonal run): [(1,3) (2,2) (3,1) (2,4) (3,5)] · [(1,1) (1,2) (2,2) (3,3) (4,4) (4,5)] · [(1,2) (2,2) (3,2) (3,3) (3,4) (2,5)] · [(1,4) (2,3) (3,2) (4,1) (1,5) (2,5) (3,5)] · [(2,1) (2,2) (1,3) (3,3) (4,3) (2,4)]
- **L3** (8-10 boards, a hole; the last two given on the RIGHT): [(1,1) (2,1) (3,1) (3,2) (3,3) (2,3) (1,3) (1,2) — hole at (2,2)] · [(1,1) (2,2) (3,3) (4,4) (4,3) (4,2) (3,1) (2,4) (1,5)] · [(2,1) (3,1) (4,2) (4,3) (4,4) (3,5) (2,5) (1,4) (1,2) (2,3)] · (side R) [(1,2) (2,1) (3,1) (3,2) (2,3) (3,4) (2,5) (1,5)] · (side R) [(1,1) (1,2) (1,3) (2,3) (3,3) (3,4) (3,5) (2,5) (4,1) (4,2)]

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted; the open half is always bare at the start of a section. The **positions never change** — what varies per item is the FIGURE, which is the fixed-world form of §13 (never the same figure twice running replaces never the same slot twice running).

Worked example. Section 1 [(1,2) (1,3) (2,3)]: the child lays (420,280), (420,340), (480,340), taps the badger, it shoulders a beam and walks rows 5, 4, 3, 2, 1 — the three ties carry, the two empty rows are walked straight over — and reaches the far edge. Pairs settle, praise, the course lays, first-try. Section 2 first-try, so L2. Section 3 [(1,3) (2,2) (3,1) (2,4) (3,5)]: the child copies the shape without flipping, so the boards go at columns mirrored in reading order and every one of them is loose. The badger stops at row 5, steps back, `tone("nudge")`; the loose boards drift across one at a time, bump bare water, drift back to the pile; the five ties rise and hold, and their bare ends show where the boards belong. The child re-boards the rows ahead — rows already walked are pegged — taps the badger, and the section completes, helped. Section 4 first-try, section 5 first-try, so L3. Section 6 (the hole figure) leaves the hole bare and passes first-try. Sections 7-10 with one miss on the first side-R figure. The finish shows the walk end to end: ten courses, eight with a filled dot.

## Rules
- **Item count**: 10 (one item = one section of the walk).
- **Difficulty progression**: 2 consecutive first-try sections (accepted on the first walk, no refusal) → the next section comes from the next level up (cap L3).
- **Adaptation**: a section refused twice, or a non-first-try section on 2 consecutive items → the next section comes from one level down (floor L1).
- **What happens on a correct answer** (the world accepts the load — every tie carries a board at both ends and nothing is loose): the badger walks the whole section carrying the beam, `tone("tap", k)` per row settled, reaches y = 190 and lays the beam as the next spine; the boards settle in pairs from the beam outward (`ANIM.pairSettle`, `tone("tap", k)`), `tone("correct")`, `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-try sections only, `ART.badgerHappy` 400 ms, then `ANIM.settleCourse` lays the course, raises the deck's far edge by 9.4 px and narrows the reed water. Capped at 1500 ms for the celebration plus 600 ms for the reflow.
- **What happens on a wrong answer** (the world refuses the load). Every refusal begins the same way: the badger stops at the first row that will not carry it, `ANIM.stepBack` one row, `tone("nudge")` once, **pose unchanged** (`ART.badgerCarry` before and after — the character is never the consequence). The section is `setEnabled(false)` for the whole enactment so a tap cannot land mid-teaching, and the world is frozen. Then, by anticipated mistake:
  - *Translated copy (misconception 1)*: every loose board in the section drifts across the beam to its would-be partner position, rests 400 ms against bare water, drifts back and returns to the pile (`ANIM.drift`, 200 ms apart); every unfinished tie in the section rises and holds (`ANIM.tieRise`, 300 ms apart). About 3.2 s on a five-board figure — never shorter than the pre-pivot spec's enactment.
  - *Wrong distance (misconception 2)*: the tie rises and holds for 1200 ms — one timber, the beam at its middle, the given board on one end, the far end breaking the water exactly one square short of or beyond the board the child laid.
  - *Wrong row (misconception 3)*: the board is loose, so it drifts and returns; the tie it was meant for rises in the row above or below it with nothing on its far end.
  - *Missing boards only (misconceptions 4 and 5)*: every unfinished tie in the section rises and holds, shortest first, so a line-adjacent tie under the badger's feet is the first thing the child sees.
  - The ties sink again 1200 ms after the last one rises (`ANIM.tieSink`).
- **Retry behaviour**: attempt 1 unaided → attempt 2 after the drift and the tie-rise, resuming from the last settled row so the retry is shorter, not longer → attempt 3 is the show-me (ties stay up, the badger lays a board on each bare end from the beam outward, loose boards return to the pile, `ART.showRing` on the badger; tapping it walks it out and completes the section as solved-with-help, no praise pop). No attempt 4. Success is certain (F-46).
- **Anti-brute-force guard: THE SETTLED COURSE.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the fen a place (GAME-DESIGN-LAW §6). The named replacement is a one-way door: **a row the badger has walked is pegged down — its boards can no longer be lifted, and no board can be added to it.** The child builds the whole section freely, sends the badger, and every row it carries is nailed off behind it, so the only rows still editable are the ones ahead of the badger, and the badger only ever advances over rows that were already right. There is no combination-trying and nothing to walk back to. Three supports hold it together: (1) *first-try is lost on any failed walk*, whatever happens afterwards; (2) *the candidate set varies, the world does not* — the positions are fixed for the session because they are a place, and the FIGURES rotate through a shuffled per-level pool that does not repeat until exhausted, which is §13's fixed-world form; (3) *the search space is not tappable-through anyway* — twenty positions, 3-10 of them needed, exactly three attempts, so a random tapper reaches the show-me ladder on essentially every item and is taught rather than rewarded (F-65's own check). **And the guard is honest about what it does not do:** it does not stop a child rearranging boards on a row the badger has not reached yet. Nothing does, and nothing should — a child moving boards on an unbuilt row is thinking, not guessing. The guard exists to stop a child grinding the whole section by repeated commits, and a one-way walk stops exactly that.
- **Finish condition**: 10 sections laid, the walk touching the hummock, the badger and the tortoise together. No losing state, no clock, nothing that can be lost. Exactly zero ways a session ends other than by finishing. Nothing in the world ever decays (the RATCHET RULE): the timber pile is unlimited and never runs out, a correctly placed board is never removed by anything, the deck never shortens, the water never rises, the tortoise never moves and is never in peril, and a refusal costs one row of walking and nothing else.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is **deliberately not used**: MISSIONS.md 1.4 bans the item counter from the play surface, and the closing reed water carries it instead.
- Game-specific (`STRINGS.en`, via `S(key)`, all 11 locales authored at build per §17): `title` = "Out to the Tortoise"; `premise` = "The tortoise cannot cross. Build the walk out to it."
- **No text of any kind on the play screen.** Two short sentences on the Start screen is the whole authored budget, against the 8-9 band's ceiling of two short sentences. "Stranded" must never harden into jeopardy in any locale: the tortoise is on dry grass in the sun and simply cannot cross an inch of water — it is never cold, hungry, frightened, or running out of anything.

## Sound
`tone("tap", k)` on each board set or lifted (k = boards down, so an undo sounds lower); `tone("tap", k)` per row settled as the badger walks the section, so the pitch climbs along the walk; `tone("tap", k)` per pair as the boards settle on an accepted section, and per board during the show-me; `tone("nudge")` once at the start of a refusal; `tone("correct")` when the badger reaches the far edge; `tone("finish")` once. Silent under `?sound=off`; no audio files; sound never carries meaning the screen does not also show (§11).

## Testing checklist
- [ ] Works in all 11 languages (the title, the premise, All done, Play again, Menu and the praise rotation change with the picker; the play surface is wordless in every locale, and no locale's premise implies the tortoise is in danger).
- [ ] Works at narrow width (400-px iframe: all 40 positions, the beam, the badger, the pile, the deck courses, the reed water and the tortoise all visible in one frame; adjacent positions remain separate targets at the 56 px floor; a real pointer drives at least one assertion per §3.1 and the hit rectangle is mapped, not sampled at the centre).
- [ ] Keyboard operable (arrows move the badger between the open half's positions row-major, Enter sets and lifts, Tab reaches the badger, Enter sends it; given boards are skipped; pegged rows are skipped).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused walks still ends in a laid section via the show-me; nothing can be lost; the session cannot end except by finishing).
- [ ] MISSION — the badger, the working section and the tortoise are all on screen in the very first frame of item 1, and the tortoise's (x, y) is identical in the first and last frames of the session (M1); the tortoise does not react to a correct answer at any point before the finish.
- [ ] MISSION — driving a full session, the badger's position changes on at least 9 of the 10 items, and every position change is a tween the child caused (M1); its far-edge y is monotone across the session.
- [ ] RATCHET — a session driven with a wrong answer on every item never decreases `mission.progress` (courses laid + boards settled under a walked row); no laid course is ever removed; no correctly placed board is ever taken away; the pile never depletes; the reed water never widens (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.slide`, `ANIM.tread`, `ANIM.shoulder`, `ANIM.stepBack` and `ANIM.settleCourse` to duration 0 produces a byte-identical item log: the same positions boarded, the same row refused, the same section accepted, in the same order. The harness must NOT patch `ANIM.drift`, `ANIM.tieRise` or `ANIM.layBoard` — those are the teaching, not the travel, and at duration 0 elaborated feedback collapses to knowledge-of-result.
- [ ] DELETION 1 — give every position a tie, so any arrangement is deck: the badger walks a section it never needed to build, the given half means nothing, and no playable mode survives.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: the badger is the only placer (the boards are in its arms and its position on the beam selects the row) and the commit is its walk, so an item becomes mechanically impossible to complete.
- [ ] FREEZE (M2) — at every decision point of a full session, if any position is enabled the running tween count is zero; the badger holds one static pose and nothing breathes, drifts or loops during play (`ANIM.breathe` fires on Boot and Finish only).
- [ ] NO PROGRESS FURNITURE — no progress circles and no item counter are drawn anywhere in the Play scene (M5); `ART.dotEmpty` and `ART.dotFull` appear on the Finish screen only.
- [ ] Copying the given half straight across without flipping makes every board lift, drift across the beam, bump bare water, drift back and return to the pile, and every tie in the section rise and hold.
- [ ] A board one column too far makes its tie rise with the far end breaking the water exactly one square off the board that was laid; a board one row off drifts back as loose while its intended tie rises in the neighbouring row.
- [ ] An L1 figure always includes a position touching the beam, and the badger standing on the beam never occludes either line-adjacent position (the 64 px channel at x 328-392 stays clear at every viewport).
- [ ] A row with no ties is walked straight over without a refusal (the empty set is symmetric).
- [ ] A refused walk leaves the badger's pose identical in the before and after screenshots, one row back from where it stopped; it never falls, never gets wet, never drops the timber and never returns to the start.
- [ ] Rows the badger has walked are pegged: their boards cannot be lifted and no board can be added to them; rows ahead of it stay fully editable.
- [ ] Only ONE coral region is on screen in any frame — the child's boards — and the palette contains no red at all.
- [ ] At the third level one figure has a hole, and on the last two items the given half is on the right and the child boards the left.
- [ ] Two first-try sections in a row bring a bigger figure reaching the far columns; a section refused twice brings a smaller figure near the beam.
- [ ] The deck's far edge rises 9.4 px per completed section and touches the hummock after the tenth; each course carries the silhouette of the figure completed in it, so the ten courses are ten different shapes.
- [ ] The finish screen re-draws the fen at its play coordinates with all ten courses laid, a filled dot at the near end of each first-try course and a hollow one on each helped course; the tortoise gets up; no score, no time, no star.
- [ ] ACT budget: total ACT time across a full session is measured and is under 60 s (R1); no single lay exceeds 220 ms, no walk exceeds 900 ms, and a retry is shorter than the walk it repeats.
- [ ] With `?sound=off` nothing is audible.
