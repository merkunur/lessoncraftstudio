# 123 — Found You!

## Identity
- Slug: `position-hide-and-seek`
- Subject / topic: Mathematics / position words — in, on, under, beside, between — shown as an icon, never as a word
- Frame: THE CROSSING
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (UNCHANGED; now in its ONE-TAP form — Pip is the only body that moves, so she is permanently the selected source and the child taps only the destination)
- Estimated build size: ~560 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (judged per placement). Frame contract: `design/MISSIONS.md` FRAME 1 — THE CROSSING, in its band-5-6 compressed form (§4 of `GAME-DESIGN-LAW.md`: one landmark, therefore no route and no navigation; the crossing is present as ARRANGEMENT — MISSIONS.md 2.4). Content is language-neutral: the prompt is an ICON (an arrow relative to a small box) chalked on a slate, and nothing on the play screen is written; the position WORDS are deliberately out of scope for this game (a reader gets nothing a pre-reader does not). Left/right are NOT in this game (game 124).

**Two deliberate refinements of the approved mission brief, both flagged rather than folded in silently.** (1) **Pip carries no hit area.** The brief made her a sixth target; an 84 px hero target riding on a body that moves between 84 px place tiles pitched 14-16 px apart collides with a live tile by construction, and the brief's own persistence rule forbids the step-out that would have separated them. The harmless-preview affordance the brief wanted (misconception 5) is preserved intact and moved to the SLATE — tapping it makes Pip turn and look at the prompt, costs nothing and counts nothing. Interactive elements: 4 / 5 / 6 by level, all of them places plus the slate. (2) **The show-me does not pulse.** A repeating tween while a target is enabled fails the F-42 freeze check (F1); the tail tip is drawn and STILL, which is a stronger signal anyway and repairs a latent defect the pre-pivot spec carried.

## Learning
- Objective: Places the mouse in, on, under, beside or between the crate(s) to match an arrow-and-box icon, choosing the one spot among 3-5 that the icon shows.
- Prerequisites: None beyond tapping. The first item is discoverable: the mouse tile pops when tapped and the spots are visible dashed outlines.
- Curriculum links: F-21 ("position and direction words" in the common core of all twelve systems), F-31 row "Position words (in/on/under/left/right)" — conservative 7, earliest 5, 11 of 12 systems → 5-6 (US K.G.A.1 "describe the relative positions of objects using terms such as above, below, beside, in front of, behind, next to"; England Reception ELG / Y1 "describe position, direction and movement"; Germany Klasse 1 "Lagebeziehungen"; France GS "se situer / situer des objets: sur, sous, dans, à côté, entre"; Netherlands groep 1-2 "ruimtelijke begrippen"; Spain Infantil "nociones espaciales"; Brazil EI03ET04; Sweden förskoleklass "lägesord"; Finland esiopetus). Feedback is enacted, not written (F-43, F-42: zero text on the play screen for 5-6); invalid placements are refused, never punished (F-61); tap-then-tap replaces drag (F-49).
- Common misconceptions (position-word acquisition order and the errors it produces; responses rest on F-43 enacted feedback and F-61), each with this game's response:
  1. **"In" and "on" confused (the mouse is put on top of the crate when the icon shows the arrow going into it, or vice versa).** Response (re-staged, ~1.9 s, world frozen): Pip is standing where she was sent and STAYS there while the correction plays — on the lid with the arrow pointing inside, or shoulders-deep in the well with the arrow pointing at the lid. The crate's front panel `ANIM.liftPanel`s 8 px and settles so the inside is plainly bare, `ART.slate` `ANIM.pulse`s, then `ART.hintArrow` (44 px) appears at the correct place and `ANIM.bob`s three times. **Stronger than the pre-pivot response**, which contrasted two abstract rectangles: the contrast is now between two positions of the same mouse.
  2. **"Under" read as "at the bottom of" (the child puts the mouse inside, low down).** Response (~1.9 s): both `ART.foot`s `ANIM.pulse` and `ART.gapGlow` lights the gap between them for 900 ms while `ART.hintArrow`, rotated 180°, points UP into that gap from the floor. Pip is visibly standing inside the crate while the arrow is below her feet AND below the crate's whole body — the crate is physically interposed between where she is and where "under" is. That is the misconception, drawn.
  3. **"Beside" read as "anywhere near" (the child taps the between spot or the under spot).** Response (~1.9 s): `ART.sideGlow` lights the crate's left wall for 900 ms while `ART.hintArrow`, rotated −90°, points horizontally at it from outside, and Pip — standing under the crate or in the far gap — is visibly touching no wall at all. Beside means touching the side, on the ground, and the glow says which side.
  4. **"Between" read as "beside" (only one neighbour considered).** Response (~2.0 s): the pulse alternates `ART.crate` → `ART.pot` → both together, so "two" becomes a temporal fact as well as a spatial one; then `ART.hintArrow` drops into the gap. Pip is standing with exactly one thing next to her and the correction shows her the second one. The pre-pivot simultaneous both-neighbours pulse is preserved as the final beat.
  5. **Tapping a spot before choosing the mouse.** Response: **this diagnosis has no home on the new apparatus and is flagged, not dropped.** It is an interaction-order error, not a position-word error, and it is structurally impossible here — Pip is the hero, she is always the thing that moves, and there is no select-then-place step to get out of order. Two things are done instead of one. **(a) Its function is preserved exactly**: its real job was a harmless, uncounted tap for a fidgety five-year-old, so `ART.slate` is tappable — tapping it makes Pip `ANIM.peek` (turn and look at the prompt) and the slate `ANIM.pulse` once; no attempt is counted, nothing changes. **(b) Its slot is filled by a genuine, distinct position misconception this apparatus surfaces and the pre-pivot spec never named — 5′ · the slate's arrow read as a SCREEN DIRECTION rather than as a relation to the box.** The child sees a down-arrow and sends Pip to the lowest place whatever the little box shows; sees an up-arrow and sends her to the highest. Response (~2.0 s): `ART.slate` `ANIM.slateSlide`s — scaling to 1.8× and travelling to sit over the real crate — so its drawn box registers against the actual crate's outline and the child watches the arrow's tip land inside / on / under THAT box; the slate returns to (140, 196) and `ART.hintArrow` appears at the matching real place. This teaches "the box in the picture IS the crate", the icon-decoding skill the whole game rests on, which nothing else in the spec ever taught. **Count: 5 distinct diagnoses, 5 enacted corrections — the count does not fall and the strength does not fall.**

*Note on the verbatim carry-across: `Prerequisites` is copied byte-for-byte per the redesign contract and its second sentence describes the retired mouse tile. The discoverability claim it makes is honoured by the new apparatus in a different way — the first item demonstrates itself once (F-42's permitted single demonstration): Pip takes one step unbidden on arrival and then holds, and the places are visible dashed outlines from the first frame.*

## Mission

**Mission, as the child would say it.** *Find all my friends before I go in.*

**The hero.** **Pip, a mouse** (roster entry `mouse`; `ART.mouse` is promoted from a tile label to the hero of the game). She is the SEEKER in a game of hide-and-seek in the hay barn and she is not going in for the night until she has found all eight of her friends. She physically walks the barn floor and puts her own body into places: she climbs onto the crate, drops into it under the propped lid, ducks into the gap beneath it, stands against its side wall, wedges into the gap between the crate and the flowerpot. **Her (x, y) persists between items** — item k+1 begins exactly where item k left her. She never teleports home, and there is no home to teleport to.

**The waiting party (Device 1).** **Nib, a cat**, sits by the lit doorway at a fixed (562, 344) with everybody's chalk slates stacked on the wall behind him. He is drawn from tap one, he is a friend minding the slates and never a predator, and **he never reacts to a right or a wrong look** — a companion who applauded each correct answer would be an approval meter, which is F-44's banned shape. He changes state exactly once, at the finish, when he stands up.

**The want — the visible lack, legible in one still frame at 400 px.** **Nobody is on the doorstep.** A lit doorway on the right, Nib beside it, a stack of eight chalk slates leaning on the wall above him, and an empty doorstep running the whole width of the bottom of the screen. Eight slates still stacked = eight friends still out there, and the child reads it without a single glyph. **The want is restated every single item**, which is the band-5-6 requirement (F-42, and `GAME-DESIGN-LAW.md` §4): one slate comes off the stack, is propped against the crate, and Pip goes to find the friend who drew it. **The payoff is inside the item** — that friend is found, right there, and walks out to the doorstep with her slate. No eight-items-away reward, no carried state, no subgoal chain.

**The single state variable.**

> **S = Pip's position in the barn.**
>
> - **Mathematical reading:** which position relation her body currently holds to the crate — and, on between-items, to the crate *and* the pot. IN · ON · UNDER · BESIDE · BETWEEN, computed geometrically from her coordinates against the landmark's own furniture: inside the crate's body = IN; supported on the crate's top edge = ON; on the floor within the span between the two feet and below the crate's whole body = UNDER; on the floor, outside the footprint, touching a side wall = BESIDE; on the floor, in a gap with a solid thing on each side = BETWEEN.
> - **Physical reading:** where the mouse is standing — what covers her, what holds her up, what is on each side of her, and therefore what she can and cannot see into.

One variable, two readings (MISSIONS.md 1.1). The mission's goal is a predicate on S (Pip is where her friend is hiding). The cognitive operation is the transition function on S (decoding the slate selects the legal move). The child's tap selects a transition of S and never "reports an answer about" it.

**The isomorphism — where Pip is standing IS the answer, because a friend is either in that place or is not.** The commit handler never sees a tile id. Tapping a place does exactly one thing: **it walks Pip there.** The world then resolves from her coordinates:

```
worksheet (the pre-pivot spec):   if (tappedSpot === item.answer)
this game:                        if (regionOf(pip.x, pip.y, crate, pot) contains friend.hidingPoint)
```

`regionOf()` is a pure geometric predicate over Pip's coordinates and the landmark's rectangles — the same function returns the same relation whether she was put there by tap, by Tab-and-Enter or by the test hook. `friend.hidingPoint` is a point in the barn a body occupies; it is not a string in an answer field. **There is no "answer" object anywhere on the screen.** The places are places, the slate is a picture, the friend is a body. This is `GAME-DESIGN-LAW.md` §2.3 satisfied at the source rather than at the surface: move the crate 40 px and every relation's coordinates move with it, with no content change anywhere.

Two independent facts about the world have to be reconciled, and reconciling them is the mathematics: **the slate says where she went, the barn says where that is.** Decoding "arrow-tip-inside-the-box" into "down inside the crate, not on its lid" is the whole of the objective, and it is the only thing standing between Pip and her friend. The slate is diegetic — it is the friend's own chalk drawing of her hiding place, which is the rule of this barn's hide-and-seek — so the abstract notation is **integrated, never concealed** (`GAME-DESIGN-LAW.md` §2.5): the box-and-arrow icon is propped 140 px from the places, in the same frame, visible at the moment of the answer. The fiction supplies the reason; it never replaces the cue, and nothing here is a word problem.

And the payoff has the isomorphism's own shape: **you find somebody by being in the same place as them.** That is what hide-and-seek is, and it is what a position word means.

**The mark that stays (Device 2).** Each found friend, in her new state — found, out, safe — sitting on the doorstep with her slate. Never a token representing one.

**Deletion tests.** **A · delete the maths** (make the slate meaningless, or put a friend in every place): Pip can be sent anywhere and somebody always springs out, so the doorstep fills whatever the child does — a tap-anything-get-a-mouse loop with no choice that matters. Keep the friends where they are but remove the ability to decode the relation and there is no way to know where to look at all. Nothing playable either way. **PASSES.** **B · delete the mission** (remove Pip, the eight friends, the doorway, Nib, the slate stack and the barn): a box-and-arrow picture and three to five dashed rectangles with nothing to put in them, nothing hidden, nobody to find, nowhere for anything to go — and no commit action at all, because the commit WAS walking Pip somewhere. **PASSES.** (The pre-pivot spec passed A and failed B: delete the cat and the spots and the mouse-tile-to-spot worksheet still works perfectly.) **C · delete the walking** — patch `ANIM.walkTo`, `ANIM.runOut` and `ANIM.slatePlace` to `duration: 0`: Pip appears at the place, the friend appears on the doorstep, the slate appears propped. Same items, same choices, same geometry, same relations resolved, same corrections, same ladder, same finish state, same first-try record. Nothing is doing its work during a tween, because the answer is Pip's POSITION, not her journey to it. **PASSES.**

**F-42 gate.** **F1 freeze** — during DECIDE, Pip holds one static pose, the places are static dashed outlines, the slate is still, Nib is still, `ART.lamp` does not flicker, the doorstep friends do not fidget, no dust drifts: zero tweens running while any target is enabled, the show-me included. **F2 displacement** — above. **F3 co-location** — slate at (140, 196), places between x 98 and 456, Pip and the doorway both in zone W; zero camera tweens; one saccade. **F4 single world** — Boot / Play / Finish only. **F5 instant-cut** — test C. **F6 text budget** — zero words on the play screen in all eleven locales.

**Honest limits, stated rather than hidden.** (i) `GAME-DESIGN-LAW.md` §4 gives band 5-6 "no journey, no navigation" while MISSIONS.md rates THE CROSSING "best at 5-6"; this design takes the law's side and compresses the crossing to its 5-6 form — **exactly one landmark, therefore no route, no plan, no subgoal, and every item complete in itself.** The crossing is present as arrangement only. (ii) The *position* half of the isomorphism is fully geometric; the *hiding* half is a premise — a crate does not compel a mouse to be inside it the way a square hole compels a square stone; she is there because she drew the slate. That is a strong joint, not a weak one, but it is a premise, and the barn does not refuse a wrong relation — it is simply empty. (iii) Zone H is used as an accumulator rather than left empty (MISSIONS.md's sanctioned TENDING pattern); an M-gate written as "zone H contains no drawn objects" would fail this game, and the rule that actually matters is "**no enabled targets** in zone H".

## World

**Stage 720 × 560. Zone T 0-56 · zone W 56-420 (THE WORLD) · zone H 420-560 (the doorstep). No progress dots anywhere during play.**

**Zone T (0-56).** The language picker at (16, 16), hidden under `?embed=1`. Nothing else. Progress is diegetic and lives in the world.

**Zone W (56-420) — the barn.**

- **Back wall** `ART.wall`, 680 × 236 centred (360, 182) → x 20-700, y 64-300. Inert scenery, never animates.
- **Floor** `ART.ground`, y = 386, x 20 → 700.
- **THE CRATE — the landmark, fixed for the whole session.** `ART.crate` 170 × 84 at (280, 242) → x 195-365, y 200-284. `ART.crateFront` 170 × 40 at (280, 264), drawn on a layer **above** Pip, so a mouse standing IN is hidden from the waist down. `ART.crateWell` 150 × 44 at (280, 236), the box's inside, drawn only while the lid is propped. `ART.foot` 24 × 100 twice, at (210, 336) and (350, 336) → y 286-386, so a real gap stands under the crate's whole body. `ART.lidProp` 170 × 10, hinged at the crate's back top edge and rotated −18°, appears when the crate has been looked into and stays while Pip is inside it.
- **THE POT** `ART.pot` 60 × 64 at (496, 354) → x 466-526, y 322-386. Present **only on between-items** (L3); `ANIM.appear` in, `ANIM.fadeOut` out.
- **THE COVER.** `ART.hayWisp` sits at the mouth of each open place — 84 × 26 on the crate's lid (ON), 140 × 30 in the gap under it (UNDER), 84 × 46 heaped against the crate's left wall (BESIDE). The crate's own body covers IN; `ART.pot` covers BETWEEN. A friend is drawn at her hiding point on a layer **below** these, so she is genuinely invisible until Pip puts herself in the place. Sweeping a wisp aside (`ANIM.sweep`) leaves it swept for the rest of the round — the cover and the searched mark are one object.
- **THE SLATE — the prompt, in the world.** `ART.slate` 96 × 72 at (140, 196) → x 92-188, y 160-232, propped against the wall on the crate's left. Inside it: `ART.promptBox` (an open-topped box outline, 40 × 30), `ART.arrowGlyph` (30 px, rotated per relation) and, on between-items, `ART.promptPot` (24 px). Relative geometry carried verbatim from the pre-pivot bubble. **This is the game's one tappable non-place**, and the tap is free.
- **THE DOORWAY — the goal, at a fixed (x, y) all session.** `ART.doorway` 96 × 164 at (648, 304) → x 600-696, y 222-386, its threshold on the floor line. `ART.lamp` 34 × 34 at (648, 196) — **never animates during play**.
- **NIB, the waiting party.** `ART.cat` 64 px at (562, 344), facing into the barn. Still from tap one; changes only at the finish.
- **THE SLATE STACK — how many are still hidden.** N overlapping `ART.slateSmall` on the wall at (562, 250), the i-th 4 px above the last. N = items remaining. It shrinks by one per item. Countable, diegetic, and made of the content itself.
- **PIP.** `ART.mouse` 56 px, starting at (80, 352) facing right, carrying no hit area of her own.

**THE PLACES.** `GameCore.makeTile` 84 × 84 (band floor 80), `surface2` at 35 % with a dashed `line` outline, drawn from `ART.place`. They are *places*, not choice tiles: there is no "selected" look and their only effect is to move Pip.

| place | tile centre | tile box | Pip stands at | friend hides at | region rectangle | levels |
|---|---|---|---|---|---|---|
| ON | (280, 144) | x 238-322, y 102-186 | (280, 176), on the crate's top edge | (250, 182) | x 195-365, y 168-200 | L1+ |
| IN | (280, 242) | x 238-322, y 200-284 | (280, 252), down in the well | (300, 262) | x 195-365, y 200-284 | L1+ |
| UNDER | (280, 342) | x 238-322, y 300-384 | (280, 352), in the gap between the feet | (300, 352) | x 222-338, y 286-386 | L1+ |
| BESIDE | (140, 342) | x 98-182, y 300-384 | (140, 352), floor, against the left wall | (128, 352) | x 98-195, y 300-386 | L2+ |
| BETWEEN | (414, 342) | x 372-456, y 300-384 | (414, 352), in the crate-pot gap | (438, 348) | x 365-466, y 300-386 | L3 between-items only |

Vertical gaps 14 px (ON→IN) and 16 px (IN→UNDER); BESIDE clears the left foot by 16 px; BETWEEN clears the right foot by 10 px and the pot by 10 px. Every gap between tap targets is ≥ 12 px. Note that the IN tile is exactly the crate's own body — **the place IS the object**, which is why the region rectangle and the art rectangle are the same numbers.

**Zone H (420-560) — the doorstep. NO CONTROLS, and that is the point.** THE CROSSING's contract is *"zone H is empty: the world is the hand"* — the child taps places in the barn, not tiles in a tray. The pre-pivot mouse-tile-on-a-mat at (100, 290) is deleted: the mouse is no longer a token pushed around a worksheet, she is the hero standing in the world, and the two-tap select-then-place collapses to one tap (also the right call at band 5-6 on its own merits: one tap is one chunk of working memory instead of two). Zone H instead carries the record. `ART.stepEdge` runs across y = 420. Found friends accumulate as `ART.mouseling` 44 px along **y = 490**, first at **x = 596** (nearest the door), pitch **−68** → 596, 528, 460, 392, 324, 256, 188, 120; each friend's own `ART.slateSmall` is propped at (x, 448) beside her. Nothing in y 420-560 is ever tappable. It also solves a real defect risk this repo has hit before: an empty 140 px band at the foot of a short game reads as a broken layout to the visual critic — here it fills with the thing the child is achieving.

**Interactive elements (F-69):** 3 places + the slate at L1, 4 + the slate at L2, 5 + the slate at L3 between-items = **4 / 5 / 6**, well inside the ≤ 10 budget with no instrument-counts-as-one argument needed. **Tab order:** the slate first, then the live places in reading order — ON, IN, UNDER, BESIDE, BETWEEN (those present). Enter or Space on a place walks Pip there; Enter on the slate is the free look.

**Everything fits one frame at 400 px wide. No scrolling, no camera move, no second screen.**

## How it plays

1. **Start screen.** Title "Found You!", Pip (`ART.mouse`) at (300, 200) and Nib (`ART.cat`) at (420, 200), `makeButton` Start, the picker (hidden under `?embed=1`). A breathing idle is permitted here and on the finish only (ART-BIBLE §6).

2. **The barn assembles (item 1, L1, prompt = IN).** Zone T holds only the picker. The barn is drawn: `ART.wall`, `ART.ground`, the crate with its two feet and its front panel, `ART.hayWisp` on the lid and in the gap beneath, `ART.doorway` with `ART.lamp`, Nib at (562, 344), the stack of **eight** `ART.slateSmall` at (562, 250), the doorstep edge at y = 420 and **an empty doorstep**. Pip stands at (80, 352). The three places ON / IN / UNDER are drawn as dashed outlines. **Then the one permitted demonstration** (F-42): Pip takes a single step to the right, unbidden, and holds. Nothing moves again until the child taps.
   The item begins: the top `ART.slateSmall` leaves the stack and `ANIM.slatePlace`s to (140, 196), becoming `ART.slate` with the IN icon — `ART.promptBox` at (0, 6) and `ART.arrowGlyph` at (0, −4), the arrowhead inside the box. The friend who drew it is placed at her hiding point (300, 262), invisible below the crate. Targets enable. **The stage is frozen.**

3. **The child taps a place.** `tone("tap")`, targets disable, Pip `ANIM.walkTo`s to that place's standing mark (≤ 450 ms, one hop — a short traversal, never a sweep across the stage), `tone("tap", 4)` as she arrives. The world resolves from her coordinates.
   - **She is where the friend is (correct, IN).** The lid `ANIM.tipLid`s and stays propped, `ART.crateWell` opens, the friend `ANIM.spring`s up over the rim, the two `ANIM.noses` once, `tone("correct")`, `GameCore.showPraise` with the next key in the rotation. The friend takes her slate and `ANIM.runOut`s to (596, 490) with the slate settling at (596, 448). **The stack is down to seven.** The doorstep has one friend on it. Pip stays exactly where she is. After 900 ms the next slate comes off the stack.
   - **The place is empty (wrong, attempt 1).** Pip is standing in it and the place opens for her — the lid tips and the crate is plainly bare, or the hay is swept aside and there is plainly nobody. `tone("nudge")`. **Nothing is scored, nothing is crossed out, and nothing whatever happens to Pip**: she is not denied, not sad, not stopped — she is a mouse who looked in a box and the box was empty, which is the most ordinary event in hide-and-seek. The consequence lands entirely on the apparatus (a lid, some hay), never on the creature (F-47, F-61). Then, **world frozen**, the enacted correction for that error class plays (Rules; ~1.9 s, longer than the pre-pivot 1.6 s) **with Pip's own body still standing in the wrong relation**, ending with `ART.hintArrow` bobbing three times at the correct place. Pip stays put. The place she looked into is now visibly searched and **is disabled for the rest of the round**. Targets re-enable. Attempt 2.
   - **Attempt 2 is never a blind guess**, because the hint arrow has already shown the correct place. If it is still wrong, the matching correction plays again and the place just searched also goes dead.
   - **Attempt 3 — the show-me, and it is the kindest thing in the design.** `ART.tailTip` appears, sticking out of the correct place, with a still `ART.showRing` behind it (no pulse — F1 forbids a running tween while a target is enabled). Sending Pip there completes the item as **solved-with-help**: no praise pop, but the friend still springs out and they still touch noses. That is exactly how a real game of hide-and-seek ends when the little one has waited long enough — a delight rather than a remediation. **At L1 only two places can be live at once after a miss, so rungs 2 and 3 land on the same tap: the hint arrow AND the tail appear together.** No rung's content is skipped; no attempt 4 exists; no way to end a session other than by finishing.
   - **Tapping the slate at any time.** Pip `ANIM.peek`s (turns and looks at it) and the slate `ANIM.pulse`s once. No attempt counted, no state changed, nothing else. The free look for a fidgety five-year-old (F-60).

4. **Items 2-8.** Per Content and Rules. The barn never moves. What changes each item is the slate, which friend is hiding and where, the searched marks tidying themselves (the friend who just came out kicked the hay back and let the lid down — this removes only the record of a wrong look, never a piece of the goal), the stack getting shorter and the doorstep getting longer. **L2** adds BESIDE — the fourth place at (140, 342), with a hay heap against the crate's left wall. **L3** adds BETWEEN: on between-items only, `ART.pot` `ANIM.appear`s at (496, 354) and the fifth place opens at (414, 342), and the icon shows two things with the arrow over the gap; on L3 beside-items the pot is absent and there are four places, so the between place never competes with beside.

5. **Finish.** The barn with **every hiding place standing open** — the lid propped, both wisps swept, the pot tipped — Pip on the threshold at (600, 350), **Nib on his feet**, and **all eight friends in a row on the doorstep** with their eight slates above them, `ANIM.celebrate` on Pip and Nib. The wall where the stack was is bare. `t("all_done")` at (360, 110); `makeButton` `play_again` (250, 510) and `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`. **No score, no stars, no badges, no first-try count on screen.** The finish is a picture of a finished thing: everybody out, everybody found, the barn searched end to end — and the eight slates are still readable, so the child can look back over the eight places they searched. (This is the pre-pivot spec's eight summary chips, made diegetic: not a scorecard, the eight drawings the friends made.)

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  mouse:       { kind: "emoji", value: "🐭", size: 56 },   // PIP, the hero; promoted from a tile label. Body from the surface2 tint pair (#FFFFFF / #E9E1D2) with a 3 px ink outline so she separates from the structureSoft crate she hides inside
  mouseling:   { kind: "emoji", value: "🐭", size: 44 },   // a friend: hiding (drawn below the cover layer) and then found, seated on the doorstep. Eight identical instances so the row is countable
  cat:         { kind: "emoji", value: "🐱", size: 64 },   // NIB, the waiting party; still from tap one, stands only at the finish
  wall:        { kind: "shape", shape: "rect", w: 680, h: 236, fill: "surface2", stroke: "line", strokeWidth: 2 },
  ground:      { kind: "shape", shape: "line", w: 680, stroke: "line", strokeWidth: 3 },                                   // y=386, x 20-700
  crate:       { kind: "shape", shape: "roundRect", w: 170, h: 84, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 10 },
  crateWell:   { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 6 },   // the inside of the box; drawn only while the lid is propped
  crateFront:  { kind: "shape", shape: "rect", w: 170, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },         // front panel, drawn ABOVE the mouse layer
  foot:        { kind: "shape", shape: "rect", w: 24, h: 100, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  lidProp:     { kind: "shape", shape: "rect", w: 170, h: 10, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },         // the propped lid, hinged at the crate's back top edge, angle −18
  hayWisp:     { kind: "shape", shape: "polygon", points: [[-42,10],[-24,-10],[0,-13],[26,-8],[42,10]], fill: "surface2", stroke: "line", strokeWidth: 2 },   // the cover at a place's mouth AND its searched mark once swept; scaled per place (84×26 lid, 140×30 gap, 84×46 heap)
  pot:         { kind: "shape", shape: "polygon", points: [[-24,-32],[24,-32],[18,32],[-18,32]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },  // the flowerpot; a SHAPE, not an emoji, so no Unicode-13 fallback risk
  slate:       { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 6 },    // the prompt, propped in the world; the game's one tappable non-place
  slateSmall:  { kind: "shape", shape: "roundRect", w: 34, h: 26, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 4 },    // the wall stack (how many are still hidden) and the doorstep record; holds a 60 %-scale copy of its icon
  promptBox:   { kind: "shape", shape: "polygon", points: [[-20,-15],[-20,15],[20,15],[20,-15]], stroke: "ink", strokeWidth: 3 },   // open-topped box outline (no top edge), chalked on the slate
  promptPot:   { kind: "shape", shape: "polygon", points: [[-10,-12],[10,-12],[7,12],[-7,12]], stroke: "ink", strokeWidth: 2 },     // the pot inside the between icon; same single-weight ink glyph family
  arrowGlyph:  { kind: "text",  value: "↓", size: 30, font: "display", color: "accent" },   // the prompt arrow; rotated 180 for "up", ±90 sideways
  hintArrow:   { kind: "text",  value: "↓", size: 44, font: "display", color: "accent" },   // THE SAME GLYPH, larger, at the correct place; exists only while the world is frozen
  place:       { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed via lineDash [8,6], fill at 35 % alpha; no selected look — a place is a destination
  showRing:    { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },                // drawn STILL behind the tail tip
  tailTip:     { kind: "shape", shape: "polygon", points: [[-3,-16],[3,-16],[5,14],[-5,14]], fill: "surface2", stroke: "ink", strokeWidth: 2 },   // the show-me: a tail sticking out of the right place
  sideGlow:    { kind: "shape", shape: "rect", w: 8, h: 84, fill: "structure" },            // lights the crate's left wall during the beside correction
  gapGlow:     { kind: "shape", shape: "rect", w: 116, h: 26, fill: "structureSoft" },      // lights the gap between the feet during the under correction
  doorway:     { kind: "shape", shape: "roundRect", w: 96, h: 164, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  lamp:        { kind: "shape", shape: "circle", r: 17, fill: "surface2", stroke: "structure", strokeWidth: 2 },                    // never animates during play
  stepEdge:    { kind: "shape", shape: "line", w: 720, stroke: "line", strokeWidth: 2 }     // the doorstep edge at y=420
};
```

**Prompt icon geometry inside `ART.slate`** (relative to the slate centre, carried verbatim from the pre-pivot bubble): IN = `ART.promptBox` at (0, 6) and `ART.arrowGlyph` at (0, −4) so the arrowhead sits inside the box; ON = box at (0, 12), arrow at (0, −26) pointing down onto the box's top; UNDER = box at (0, −10), arrow rotated 180° at (0, 30) pointing up at the box's underside; BESIDE = box at (16, 4), arrow rotated −90° (pointing right) at (−28, 4) aimed at the box's left side; BETWEEN = box at (−26, 8), `ART.promptPot` at (28, 8), arrow at (0, −24) pointing down into the gap. `ART.hintArrow` uses the same rotation and sits at the correct place's centre offset toward the crate by 30 px (IN: on the centre; ON: 30 px above; UNDER: 30 px below; BESIDE: 30 px left; BETWEEN: 30 px above). `ART.slateSmall` carries a 60 %-scale copy of its own item's icon.

**Coral discipline.** Exactly two `accent` entries, and they are **the same glyph**: `ART.arrowGlyph` (always on the slate) and `ART.hintArrow` (only during a correction, while the slate's arrow is pulsing as part of that same correction). One meaning, one colour, both small and geometric. Nothing else on the play screen is coral — `ART.sideGlow`, `ART.gapGlow`, `ART.showRing`, `ART.doorway` and `ART.lamp` are all `structure` / `structureSoft`. Pip's body comes from the `surface2` tint pair with a 3 px `ink` outline; ART-BIBLE §10.1's warm-body clause therefore does not apply, and if the artist gives her a teal body she vanishes into the crate she is hiding in — that is the one palette decision to check on the render rather than in the code.

## Animation registry
```js
const ANIM = {
  walkTo:     { duration: 450, ease: "Sine.InOut", trigger: "TRAVERSAL — Pip to a place's standing mark (x,y set at call); patched to 0 by deletion test C" },
  runOut:     { duration: 700, ease: "Sine.InOut", trigger: "TRAVERSAL — a found friend and her slate to the doorstep (x,y set at call); patched to 0 by deletion test C" },
  slatePlace: { duration: 400, ease: "Sine.InOut", trigger: "TRAVERSAL — a slate off the stack to (140,196); patched to 0 by deletion test C" },
  tipLid:     { angle: -18, duration: 300, ease: "Back.Out", trigger: "the crate's lid props open and STAYS while Pip is inside it" },
  sweep:      { angle: 22, x: "+=10", duration: 300, ease: "Sine.Out", trigger: "a hay wisp swept aside; it STAYS swept for the rest of the round" },
  tipPot:     { angle: -14, duration: 260, ease: "Sine.Out", trigger: "the pot tips when the between place is looked into" },
  liftPanel:  { y: "-=8", duration: 260, ease: "Sine.InOut", yoyo: true, trigger: "the crate's front panel lifts to show the inside is bare (in/on correction)" },
  spring:     { y: "-=10", scale: 1.15, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the found friend springs up out of her place" },
  noses:      { x: "+=6", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "Pip and the found friend touch noses" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a slate arriving at the crate; a friend settling on the doorstep" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the swept cover after an empty look — never Pip herself" },
  bob:        { y: "-=10", duration: 220, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the hint arrow at the correct place, three bobs then stop" },
  pulse:      { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the slate; the scene part named by the misconception (front panel, feet, side wall, crate + pot)" },
  peek:       { angle: -8, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "Pip turns and looks at the slate — the free look" },
  slateSlide: { scale: 1.8, duration: 420, ease: "Sine.InOut", yoyo: true, trigger: "misconception 5' — the slate travels to sit over the real crate and back" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new prompt icon; the pot and the fifth place on between-items (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 250, ease: "Sine.In", trigger: "the hint arrow after a correction; the pot and the fifth place when leaving a between-item" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish screen only — Pip and Nib" }
};
```
No flashing; `bob` runs three times then stops; every tween above runs only inside an ACT beat, caused by a tap, and the total of the three traversals is ≤ 1200 ms per move. **The show-me has no animation at all** — `ART.tailTip` and `ART.showRing` are drawn still, because a repeating tween while a target is enabled fails F1.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                     │  zone T  0-56
 56   ├──────────────────────────────────────────────────────────────────┤
      │        ┌ ON place (280,144) ┐                          lamp      │
      │  slate │                    │                        (648,196)   │  zone W
      │(140,196)└─ crate (280,242) ─┘        slate stack ▤ (562,250)      │  56-420
      │  [icon]  │ IN place = the crate │      ░ doorway (648,304) ░      │  THE WORLD
      │          │ front panel y=264    │                                 │
      │  BESIDE  └─ foot ─ UNDER ─ foot ┘   BETWEEN     pot    Nib        │
      │ (140,342)   (210)  (280,342) (350)  (414,342) (496,354) (562,344) │
      │ ──────────────────── ground y=386 ──────────────────────────────  │
420   ├──────────────────────────────────────────────────────────────────┤
      │   THE DOORSTEP — no controls, ever                               │  zone H
      │   slates  y=448          friends  y=490, x 596 → 120, pitch −68   │  420-560
560   └──────────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling, static camera, no scrolling. Pip walks the barn floor and stands inside the places; her position persists across every item, so she is drawn wherever the last item left her. The pot and the between place exist only on L3 between-items. **Progress is diegetic and there are no progress dots on this screen**: the stack on the wall shrinks, the doorstep fills, and the barn keeps a visible history of what has been searched this round.

## Visual specification
- Background `THEME.colour.bg`. **Zone T carries the language picker and nothing else** — the goal is on screen and the distance to it shrinks, so no abstract progress display is drawn during play.
- Scene, back to front: `ART.wall` at (360, 182); `ART.slateSmall` × N stacked at (562, 250), the i-th 4 px above the last; `ART.doorway` at (648, 304) with `ART.lamp` at (648, 196); `ART.ground` at y = 386; `ART.foot` twice at (210, 336) and (350, 336); the hiding friend (`ART.mouseling`) at her item's hiding point; `ART.crate` at (280, 242); `ART.crateWell` at (280, 236) when the lid is propped; `ART.lidProp` hinged at (195, 200) at −18° when propped; `ART.pot` at (496, 354) on between-items; `ART.hayWisp` at (280, 190) scaled to 84 × 26, at (280, 330) scaled to 140 × 30 and at (140, 340) scaled to 84 × 46; `ART.cat` at (562, 344); `ART.mouse` at her current standing mark; `ART.crateFront` at (280, 264) **above** the mouse layer; `ART.slate` at (140, 196) with its icon; the correction art (`ART.sideGlow` at (191, 242), `ART.gapGlow` at (280, 336), `ART.hintArrow`) on top.
- Places: `GameCore.makeTile` 84 × 84 drawn from `ART.place` (dashed `line` outline via graphics `lineDash [8, 6]`, `surface2` fill at 35 % alpha) at ON (280, 144), IN (280, 242), UNDER (280, 342), BESIDE (140, 342) from L2, BETWEEN (414, 342) on L3 between-items. A place never shows a selected look — it is a destination, not a choice chip. A place already looked into this round is drawn with its cover swept or its lid propped and is disabled.
- Pip's standing marks: ON (280, 176), IN (280, 252), UNDER (280, 352), BESIDE (140, 352), BETWEEN (414, 352); her session start is (80, 352). Standing IN, she is hidden from the waist down behind `ART.crateFront` — the best moment in the game and the easiest to lose at 400 px, so the `surface2`-tinted body over `structureSoft` crate contrast is load-bearing and must be checked on the render.
- Doorstep: `ART.stepEdge` across y = 420; `ART.mouseling` 44 px at y = 490, x = 596 − i × 68; that friend's `ART.slateSmall` at (596 − i × 68, 448). Nothing here is ever a target.
- Every tap target is 84 × 84 or larger (5-6 floor is 80) and the smallest gap between two of them is 12 px. Tab order: `ART.slate`, then ON, IN, UNDER, BESIDE, BETWEEN (those present). Under `?embed=1` the picker is not created.
- **A barn at dusk begs for ambient motion and every bit of it is banned**: no swinging lamp, no drifting dust, no flickering light, no idle bob on Nib or on the doorstep row. This is the most likely place for F-42 to erode during the build, because the scene will look "too still" to whoever is drawing it. The freeze assertion is run, never assumed.
- No text on the play screen in any of the eleven languages.

## Content

Language-neutral. Item = (prompt; places shown; the friend's hiding point). Prompt keys: IN · ON · UNDER · BESIDE · BETWEEN. The prompt key selects both the slate's icon and the friend's hiding point from the table in `## World`, so the icon and the body are two views of one fact.

- **L1** (three places ON / IN / UNDER): IN · ON · UNDER · IN · UNDER · ON
- **L2** (four places, + BESIDE): BESIDE · UNDER · BESIDE · ON · IN · BESIDE
- **L3** (four places on non-between items; five places + the pot on between-items): BETWEEN · BESIDE · BETWEEN · UNDER · BETWEEN · ON

The play list of 8 is built per Rules: start at L1; within a level take prompts in the listed order from a random starting index (wrapping). **§13 in its fixed-world form**: the barn's places cannot be shuffled, so "the correct tile is never in the same slot twice running" becomes **never the same relation twice running AND never the same place twice running** — and in this world the relation IS the place, so the two clauses coincide and the builder skips a prompt whose place equals the previous item's. The barn never moves; what changes is which slate is propped, where the friend is, and what the child has already searched.

**A tap on the place Pip is already standing in is legal and is a normal look** — "look again, right here". Because the previous item ended with her in the correct place and §13 forbids the same place twice running, that place is never this item's answer, so the look is honestly empty and costs an attempt like any other. This keeps all 3-5 places live every item (the objective's "one spot among 3-5"), keeps Pip exactly where the last item left her (persistence, MISSIONS.md L2), and needs no step-out mark and no second target on a moving body.

**Worked example.** Item 1 IN — the first slate is propped, the child taps IN, Pip drops into the crate under the tipping lid, the friend springs up, they touch noses, she runs out to (596, 490): seven slates left, one friend on the step. Item 2 ON first-try, Pip climbs onto the lid → L2. Item 3 BESIDE — the child taps UNDER: Pip ducks into the gap, the hay sweeps aside, it is plainly empty; the world freezes, `ART.sideGlow` lights the crate's left wall while the hint arrow points horizontally at it from outside, and Pip is visibly touching no wall; the UNDER place goes dead; she taps BESIDE and Pip walks out and stands against the wall — found, solved-with-help → L1. Item 4 UNDER first-try. Item 5 IN first-try → L2. Item 6 BESIDE first-try. Item 7 ON first-try → L3. Item 8 BETWEEN — the pot appears, the fifth place opens, first-try. Finish: eight friends on the step, eight slates above them, every place in the barn standing open.

## Rules

- **Item count**: 8.
- **Difficulty progression**: 2 consecutive first-try correct → next level (cap L3).
- **Adaptation**: any empty look on an item, or a wrong first look on 2 consecutive items → the next item comes one level down (floor L1). The current item is never abandoned.
- **What happens on a correct answer**: the place opens for Pip (lid tips and props, or the cover sweeps aside and stays swept, or the pot tips), the friend `ANIM.spring`s up, `ANIM.noses` once, `tone("correct")`, `GameCore.showPraise` from the rotation `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`; the friend and her slate `ANIM.runOut` to the doorstep and `ANIM.pop` into place; the wall stack is one shorter; Pip stays exactly where she is; the next slate `ANIM.slatePlace`s after 900 ms. Nothing happens to Nib.
- **What happens on a wrong answer** (per anticipated mistake; the world is frozen for the whole correction and Pip stays standing in the wrong relation throughout):
  - **ON looked into for IN, or IN for ON**: the place opens and is plainly bare, `tone("nudge")`, the swept cover `ANIM.nudge`s; then `ART.crateFront` `ANIM.liftPanel`s, `ART.slate` `ANIM.pulse`s, `ART.hintArrow` appears at the correct place and `ANIM.bob`s three times. ~1.9 s.
  - **IN looked into for UNDER** (under read as "low inside"): nudge, tone; both `ART.foot`s `ANIM.pulse` and `ART.gapGlow` lights the gap for 900 ms while `ART.hintArrow`, rotated 180°, points up into it from the floor. ~1.9 s.
  - **UNDER or BETWEEN looked into for BESIDE** (beside read as "near"): nudge, tone; `ART.sideGlow` lights the crate's left wall for 900 ms while `ART.hintArrow`, rotated −90°, points at it from outside. ~1.9 s.
  - **BESIDE looked into for BETWEEN** (one neighbour only): nudge, tone; `ART.crate` and `ART.pot` `ANIM.pulse` alternately then together, then `ART.hintArrow` drops into the gap. ~2.0 s.
  - **A place chosen by the arrow's screen direction rather than by its relation to the box** (misconception 5′ — the lowest place for a down-arrow whatever the box shows): nudge, tone; `ART.slate` `ANIM.slateSlide`s over the real crate so its drawn box registers against the crate's outline, returns, and `ART.hintArrow` appears at the matching real place. ~2.0 s.
  - **Any other empty place**: nudge, tone, `ART.slate` `ANIM.pulse`, `ART.hintArrow` at the correct place with `ANIM.bob`. ~1.8 s.
  - **A tap on `ART.slate`**: Pip `ANIM.peek`s and the slate `ANIM.pulse`s once. **No attempt is counted and nothing changes.**
  - **Nothing whatever happens to Pip on any wrong answer** — no fall, no denial, no sad pose, no reaction from Nib. An error changes the apparatus, never the creature (F-47).
- **Retry behaviour**: attempt 1 unaided → attempt 2 after the enacted correction, which already includes the hint arrow at the correct place, so the second look is never a blind guess → attempt 3 the show-me: `ART.tailTip` sticking out of the correct place with a still `ART.showRing` behind it; sending Pip there completes the item as solved-with-help (no praise pop; the friend still springs out and they still touch noses). At L1, where only two places remain live after a miss, rungs 2 and 3 are delivered on the same tap (hint arrow and tail together) — no rung's content is skipped. No attempt 4. An item completed after any empty look never counts as first-try.
- **Anti-brute-force guard — "THE TAIL SHOWS LAST".** P1's tile re-shuffle is impossible here: a hiding place that jumped when you knocked on it would destroy the constancy that makes the barn a place, and these places are geometrically defined by the crate itself, so they physically cannot be shuffled. Four components replace it. **(1) The one-way look.** Pip goes where she is sent and STAYS there; a place looked into this round is visibly searched and its target is disabled for the rest of the round. The choice set shrinks by the child's own action — the law's one-way door, made physical, with no free reset. **(2) No blind second guess exists.** After the first miss the hint arrow already shows the correct place; after the second, the tail shows. There is no state in which exhaustive tapping is faster than reading the slate; brute force is not punished, it is made pointless. **(3) First-try is unrecoverable and it is the only thing the ladder reads.** Any empty look marks the item solved-with-help permanently, and two consecutive first-try corrects is the only route to L2 and L3 — **a guessing child cannot climb** and never meets BESIDE or BETWEEN at all, so guessing does not merely fail to score, it fails to unlock the content. **(4) The candidate set varies, the coordinates do not** — which relations exist changes by level (3 → 4 → 5) and by whether the pot is present, and §13 takes its fixed-world form on the content list. **Honest limit, stated rather than hidden:** at L1 there are three places, so a determined child can exhaust them inside one item and reach the show-me. Component 3 is what makes that a dead end rather than a strategy — it buys one completed item and nothing else, forever. The geometry itself does not forbid guessing, and no three-choice band-5-6 game's can.
- **The ratchet.** Nothing in this barn can decay. An empty look never takes a friend off the doorstep, never puts a slate back on the stack, never un-finds anybody, never moves the doorway and never closes a place the child has earned. The searched marks tidy themselves between rounds, which removes only the record of a wrong look, never a piece of the goal. The tension is always *not yet found*, never *lost again*.
- **Finish condition**: 8 items. No losing state; no clock; exactly zero ways a session ends other than by finishing — eight empty looks in a row still reach All done by way of the tail.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Found You!". Eleven locale keys ship in the built game (BUILD-CONVENTIONS §17); the title is what a child actually says at the payoff, so each locale's panel authors the phrase its own children shout, never a translation of the English. **No words on the play screen**, and the position words themselves are never displayed in any language — declared out of scope, because the icon is the prompt and a reader must get nothing a pre-reader does not.
- `CATALOGUE.md` row 123 currently reads "Hide and Seek"; the retitle to "Found You!" is a catalogue edit and the hub reads its title from there, so it goes in the same commit.

## Sound
`tone("tap")` when a place is tapped; `tone("tap", 4)` when Pip arrives at it; `tone("correct")` when a friend is found; `tone("nudge")` when a place is empty; `tone("finish")` once at the end. Silent under `?sound=off`; no audio files; nothing is spoken. The arrow carries the meaning and the barn carries the answer, so a child with the sound off loses nothing.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and the praise strings change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: the crate, all places, the slate, the stack, the doorway, Nib and the whole doorstep row fully visible; places remain separate targets).
- [ ] Keyboard operable (Tab reaches the slate then each live place; Enter on a place walks Pip there; Enter on the slate is the free look and counts nothing).
- [ ] Never auto-starts.
- [ ] No losing state (8 empty looks in a row still reach All done by way of the tail; nothing ever happens to Pip).
- [ ] **Mission** — the doorway is at (648, 304) in zone W from the first frame to the last and never moves; Pip's (x, y) changes on at least 7 of the 8 items; item k+1 starts with Pip exactly where item k left her; there are no progress dots on the play screen.
- [ ] **The ratchet** — driving a session with a wrong answer on every item, the doorstep row never shrinks, the wall stack never grows, and no found friend ever leaves the step.
- [ ] **Instant-cut (deletion test C)** — patching `walkTo`, `runOut` and `slatePlace` to `duration: 0` produces an identical item log, an identical finish state and an identical first-try record.
- [ ] **Deletion test B** — with the hero and the goal removed the game cannot complete an item.
- [ ] **F1 freeze** — at every decision point of a full session, including while the show-me is on screen, the running tween count is zero.
- [ ] The commit handler reads Pip's coordinates: moving the crate 40 px moves every relation with it, with no content change (`regionOf` poison test).
- [ ] Sending Pip IN hides her lower half behind the crate's front panel, and she is still legible against it at 400 px.
- [ ] An empty place opens and is plainly bare, then the correction plays with Pip still standing in the wrong relation, and that place is disabled for the rest of the round.
- [ ] Looking IN when the icon shows UNDER makes both feet pulse and the arrow point up into the gap from the floor.
- [ ] At level 2 a fourth place appears against the crate's left wall; at level 3 the pot and the fifth place appear on between-items only, and beside-items have neither.
- [ ] Tapping the slate makes Pip look at it and costs nothing; two first-try corrects in a row open a place, and an empty look closes one on the next item.
- [ ] The finish shows eight friends on the doorstep, eight readable slates, every hiding place standing open, Nib on his feet — and no score.
- [ ] With `?sound=off` nothing is audible.
