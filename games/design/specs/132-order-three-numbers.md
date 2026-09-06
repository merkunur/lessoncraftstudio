# 132 — The Long Climb

## Identity
- Slug: `order-three-numbers`
- Subject / topic: Mathematics / ordering three two-digit numbers from smallest to largest (tens first, then ones)
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement; the finger reaches the world by tapping a branch, and the tap is a destination, never a report)
- Frame: THE CLIMB
- Estimated build size: ~560 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§17. Pattern contract: `catalogue/PATTERNS.md` P4. Frame contract: `design/MISSIONS.md` FRAME 14, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. Content is language-neutral (numerals, bars, cubes); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Taps three two-digit numbers in order from smallest to largest, deciding by the tens first and by the ones only when the tens are equal.
- Prerequisites: Reads two-digit numerals to 99; knows a rod is ten ones (games 016-019); compares two two-digit numbers (game 131).
- Curriculum links: F-1 (compare/order numbers in 9 of 15 sources; ordering is on the UK 5-7 map, F-4), F-21 ("comparing/ordering quantities", "place value tens/ones" in all twelve systems), F-108, F-31 row "Count to 100; number line to 100" — conservative 7-8 → 6-8 (US 1.NBT.B.3 / 2.NBT.A.4; England Y2 "compare and order numbers from 0 up to 100"; Germany Klasse 2 "Zahlen bis 100 ordnen"; France CE1 "ranger des nombres"; Netherlands groep 4 "getallen tot 100 ordenen"; Spain 1º ciclo "ordenación"; Brazil EF02MA01; Sweden åk 1-3; Finland grades 1-2 "lukujen järjestäminen").
- Common misconceptions (F-103, F-108), each with this game's response:
  1. **Ordering by the ones digit, or by the biggest single digit anywhere in the number (39 placed after 51 because 9 > 5).** Response: the branch sways once and stays; then the trunk **lights its storey lines upward from the squirrel's own height and stops at the height of the branch that was skipped**, so the way up visibly ends below the branch the child asked for — there is a branch in between, said in geometry. The two numbers' bundles then lift off their pads and stand side by side at full size against the trunk (`ART.bigBar` columns, `ANIM.bundleLift`) with `ART.tensBadge`s reading "30" and "50", and the storey lines between the two branches pulse (`ANIM.bandPulse`). This is the pre-pivot number-line correction unchanged in substance: the number line has become the trunk, and the markers have become the branches themselves.
  2. **Reading a number reversed (63 as 36 — F-108; de/nl/da spoken order).** Response: every branch pad carries the numeral AND its bars-and-cubes (`ART.tensBar`, `ART.onesCube`), so size is readable from the blocks however the numeral is parsed — and now from a third independent channel the pre-pivot spec did not have, the branch's own **height on the trunk**. L3 keeps the reversed-digit boards (36 and 63 on one tree), and the correction lifts and compares the bars before anything else happens.
  3. **Same tens, ordered by look ("52, 57 — they start the same, either order").** Response: two numbers with equal tens hang **inside the same storey of the trunk**, between the same two storey lines, and at 2.8 px per unit their pads sit about 14 px apart — the eye genuinely cannot order them, so the ones must be read. The correction lights that single storey as one block (`ART.storeyBand`), shows the equal `ART.tensBadge`s, then goes to the ones: the two pads' loose cubes pair off in two rows with `ART.pairLine`s and the unmatched cubes pulse with `ART.onesBadge`s while the storey re-labels to that single ten (`ART.storeyLabel`, 50, 51 … 60). The hardest misconception now sits in the one case the world's own geometry refuses to answer for the child.
  4. **Bigger-looking = more: a tile with many cubes (48) taken as more than one with more rods and few cubes (61).** Response: L2 trees always carry such a pair. A child who counts loose cubes taps 61 first; the way up lights and stops at 48; the bundles stand side by side, 4 bars against 6, with badges "40" and "60". And because a branch's height **is** its value, the rebuttal stands on the tree at every moment of the item, not only while the correction plays.
  5. **Rail confusion (putting the largest first, "biggest wins").** Response: **flagged, not silently dropped** — the three-slot rail, its `slotNum` 1/2/3 glyphs and its small-to-big size cue do not exist in this design, so the ordinal notation that taught direction is gone and gravity carries it instead: a squirrel starts at the foot of a tree and the store is at the crown, so the first move of every trip is the lowest branch and the world refuses any other. The specific answer to a largest-first tap is that the lit path stops at the **lowest** branch while the tapped branch is at the far end of the trunk, so the whole span of storey lines between them lights and pulses — the biggest gap the world can show, shown at full size. A child sees eight storeys of "not yet" in one frame. (If ordinal labelling turns out to be load-bearing for some children, the recovery is cheap and diegetic: number the notches as they are cut.)

## Mission
**Mission, as the child would say it.** *Fill the store before winter.*

**The hero.** A grey squirrel — `squirrel`, ART-BIBLE §3 roster — drawn in the `surface2` tint pair over a 3 px `ink` outline, **not** in an `accent` tint. That is a deliberate refusal of the §9.4 warm-body exemption: the ones-cubes in this game are `accent` and they are content, so the character may not spend the state colour. It also separates the silhouette from the built fox (which is warm, side-profile and brush-tailed) — this squirrel is drawn **upright, clinging to a trunk, seen from behind-and-side, tail up the back**. The §12 identity check and the `art-sheet.js` 48/96/192/384 read are mandatory before the visual critic sees it.

Poses used: `idle` (clinging, still), `think` (head turned up the trunk — the stuck cue), `act` (reaching out to a pad and taking an acorn), `happy` (at the crown, tipping the load in). **There is no `oops` pose in this game**: the character never carries the error.

What it physically does: climbs the trunk, steps out along a limb onto a branch pad, takes one acorn, climbs on, and at the crown tips the trip's three acorns into the store. Then it slides down the trunk for the next load. Its altitude is never decorative — it is the game's whole state.

**The want (the visible lack), readable from one still frame at 400 px with zero words.** The winter store in the drey at the crown is nearly empty, and the full-line is scored across its mouth well above the heap. Two young look out over the rim. A small animal stands at the foot of a tall tree; three laden branches hang between it and a marked container at the top with a visible gap between what is in it and the line it has to reach. Nothing is threatened, nobody is hungry, no light is failing — the lack is simply *not full yet*, which is the whole of GAME-DESIGN-LAW §4's "what 001 was missing is a WANT".

**The goal.** The drey, `ART.drey`, at a constant (360, 92) for the entire session, with `ART.dreyLine` scored across its mouth and the two young at its rim from tap one (Device 1, THE WAITING PARTY). Thirty acorns at the line and the store full.

**S — the single state variable: THE SQUIRREL'S HEIGHT ON THE TRUNK, h.**

- **Physical reading:** how far up the tree it is, read against the trunk's storey lines. At the foot h = 0; on a branch pad h is that branch's height; at the crown it is above 100 and it is tipping the load in.
- **Mathematical reading:** the largest of the numbers already ordered — how far along the ascending sequence the child has got. h = 0 means *nothing placed yet*; h = 27 means *27 is placed, and everything still to come must be larger than 27*.

One variable, two readings, and the transition function is the ordering itself: **the only legal move from h is to the smallest remaining value strictly greater than h.**

**There is no `answer` field anywhere in the item.** The correctness line is `world.accepts(squirrel, branch)` — *is this the lowest branch above me* — which is `branch.v === min(remaining.filter(v => v > h))`, a fact about the world's arrangement and not a comparison against a stored key. Delete every numeral from the game and that predicate still exists as pure geometry; delete the tree and it has no arguments. The commit handler reads **the squirrel's altitude and the tapped branch's altitude, and nothing else** — no tile id, no index, no slot. That is the Displacement rule literally (`answer = f(character.position)`, GAME-DESIGN-LAW §2.3).

**The isomorphism — moving IS solving.** *You climb a tree hold by hold, from the bottom, so the branch you can reach IS the smallest one left.* The three numbers of an item are not tiles; they are three branches at three heights on one trunk, and a branch's height, its numeral tag and its bars-and-cubes are three readings of one value. A squirrel gets up a tree by taking the next hold above it; it cannot reach the fifth branch before the second, and no child needs that explained. So *order these smallest to largest* and *climb this tree* are the same instruction, and the child never receives the first one.

**Tens-first is a property of the geometry rather than a rule taught beside it.** The trunk is divided into ten storeys by its storey lines. A number's tens digit is *which storey its branch hangs in*; its ones digit is *how far up that storey*. So "compare the tens first" is literally "look at which storey it is in", and "the tens are equal, so look at the ones" is literally "they are in the same storey, so look inside it". A bundle of ten cubes on a pad is one storey of trunk — the manipulative and the scale are the same unit (F-108's own remedy, drawn).

And the climb is never a reward for a decision already made. Tapping a branch does not mean *I choose 27* and then earn a walk; it means *go there*, and where the squirrel ends up is the answer. On a legal move it ends up on the pad; on an illegal one it ends up exactly where it was.

**The mark that stays (Device 2, and the RATCHET RULE).** Two permanent marks, and neither is ever un-made. (1) Every storey line the squirrel climbs past **lights for the rest of the session**, so by trip 2 or 3 the trunk is a fully graduated number line the child drew by climbing it. (2) Every height the squirrel has ever stood at gets a **notch** cut into the trunk's edge with its numeral beside it — thirty notches by the end of a clean session, the whole session's arithmetic accumulated on one number line, in place.

**Diegetic progress — four surfaces, and no progress furniture of any kind on the play surface.** (1) The heap in the drey rising toward the full-line: three acorns per trip, ten trips, thirty at the line — the goal's distance shrinking, literally, which is what replaces the ten hollow circles at y = 28 (F-44's *tower built*). (2) The trunk lighting. (3) The notches. (4) The squirrel's own altitude, which is the within-trip progress and needs no display because it **is** the display (FRAME 14: *the child is the meter*). `mission.progress` for the M4 gate = (acorns in the store) + (lit storey lines) + (notches cut); monotone by construction.

**The three deletion tests.** **A — delete the maths: nothing playable survives.** The maths here is not the numerals, it is the quantities, and the quantities are the branch heights; delete them and the branches have no heights, the trunk has no holds and the squirrel has nowhere to go. There is no residual arcade to leave behind — no jumping, no dodging, no aiming, no obstacle other than the arrangement of the numbers. (Stripping the numerals *alone* leaves pure magnitude ordering read off the scale, which is not a leak but the number-line representation F-108 prescribes; the numerals stay because §2.5 requires the notation in frame at the moment of the answer.) **B — delete the mission: nothing playable survives.** Remove the tree, the drey, the store, the young and the squirrel and three numbers remain with no arrangement, no altitudes, no reachability predicate and **no way to commit a choice at all** — no rail, no slot, no Check tile, no tray. `mutate-mission.js` removing `mission.goal` and `mission.hero` must leave a game that cannot complete an item, and it does, because `mission.hero.h` *is* the state the transition function reads. **C — the instant cut: the item log is identical.** Patch every traversal tween to `duration: 0` and the session is unchanged in every respect that matters — the same taps legal in the same order, the same refusals, the same corrections (corrections are not traversals and are never patched), the same notches, the same store, the same finish. The walk here is expression, not content; nothing in the game works because a tween filled time. Journey is a property of the arrangement (§2.4): a still frame of a squirrel halfway up a graduated trunk, lit lines and cut notches below it, a laden branch above it and a marked store at the crown, reads as a mission with zero pixels moving.

## World
Stage **720 × 560**, `Scale.FIT`, static camera, no scrolling. Zones follow MISSIONS.md §1.4, not BUILD-CONVENTIONS §7.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2), hidden under `?embed=1`. **Nothing else.** Two things that stood here in the pre-pivot spec are deleted outright: the ten progress circles at y = 28 and `t("question_x_of_y")` at (360, 48). Both are banned on the play surface by MISSIONS.md §1.4 — progress is the store filling, and the trunk.

**Zone W, y 56-420 — THE WORLD.** Everything below persists for the whole session unless marked per-item. The hero and the goal are both inside it at every moment, and the goal's (x, y) never changes.

- *Ground line:* `ART.ground`, y = 396, x from 30 to 690.
- *Trunk:* `ART.trunk`, x 325 → 395 (70 wide, centre x = 360), from y = 396 up to y = 96.
- *The scale:* value v maps to **y = 396 − 2.8·v**. So 0 → 396, 10 → 368, 25 → 326, 50 → 256, 75 → 186, 100 → 116. `ART.tenLine` is a 2 px hairline right across the trunk at every v = 10k; `ART.midMark` doubles the v = 50 line so the column is not a featureless ladder. **The scale carries no numerals at all** — the storeys are the tens, and counting storeys is counting rods. This is language-free by construction.
- *Lit trunk:* storey lines start dim. Every line the squirrel climbs past switches permanently to `ART.tenLineLit`, which is **longer and thicker** as well as teal, so the state is carried by shape and not by colour alone (BUILD-CONVENTIONS §12).
- *Height notches:* every height the squirrel has ever stood at gets `ART.notch`, a 10 px wedge cut into the trunk's left edge at that y, with `ART.notchNum` 12 px beside it at x = 306. Nothing ever removes one.
- *The drey — THE GOAL, constant (x, y) all session:* `ART.drey` 140 × 72 centred (360, 92), spanning x 290-430, y 56-128, sitting on the crown **above the 100 line**. `ART.dreyLine` is scored across its mouth; inside, the heap of `ART.acorn` rises. Two `ART.young` look out over the rim; **they do not react to anything and change only on the Finish screen** (Device 1 — a waiting party, not an approval meter, which is F-44's banned shape).
- *The squirrel:* on the trunk face at x = 360, **y = 396 − 2.8·h − 22**. It starts each trip at the foot, h = 0.
- *The three branches (per item — these are EVENTS, not locations; the tree renews its crop between trips):* each is `ART.limb`, 8 px thick, from the trunk edge out to `ART.pad` 130 × 56 whose vertical centre is exactly y(v). The hit box is padded to 140 × 64, above the band's 56 px floor (§3). On the pad: `ART.padNum` 34 px in a 40-wide field at the left; then the bundle in an 80-wide field — `ART.tensBar` up to 9 bars 6 × 24 at pitch 8, `ART.onesCube` up to 9 squares 7 × 7 at pitch 8 on a second row beneath. A number with 0 ones shows one `ART.onesGhost`.
- *Four lanes; each item uses three of them,* so two pads can never overlap however close their values: **L-far** pad centre x = 90 (spans 25-155) · **L-near** x = 240 (175-305) · **R-near** x = 470 (405-535) · **R-far** x = 615 (550-680). Lanes are chosen per item **by the item index, never by rank**, so screen position never tells the child which value is the middle one. A far limb passing behind a near pad is drawn behind it — limbs overlap on a tree.
- *The v ≥ 86 rule, derived not guessed:* a pad's top edge is y(v) − 28, and the drey's underside is y = 128, so a near-lane pad fouls the drey when 396 − 2.8v − 28 < 128, i.e. v > 85.7. **Any value v ≥ 86 takes a far lane.** The content list is checked against this: no item carries three values ≥ 86 (the worst case is L3's 29/92/99, which needs exactly the two far lanes available).

**Zone H, y 420-560 — EMPTY.** No controls, no instrument, no caption, no tray, no Check tile. `ART.floor` (forest floor wash) only, zero interactive elements. The world is the hand: the child taps the branches themselves, which is what makes the tap a destination rather than a report. The moment this game grows a zone-H control — three numeral tiles, a row of slots, a Check button — the tap becomes a report and the Displacement rule is broken in one line of code. The pre-pivot spec's zone B *was* three tiles and its zone A *was* a three-slot rail; that pairing is the worksheet, drawn as a layout, and deleting it is most of this redesign. There is also nothing left for a control to do: no value to set, no digit to enter, no piece to place, and no commitment to confirm — a climb commits itself. The 140 px is not wasted, either: it is what lets the world take 364 px of height instead of BUILD-CONVENTIONS §7's 204, which is what makes a 0-100 scale with ten readable storeys possible at all. (`play_again` and `menu` appear here on the Finish screen only.)

**Text budget: three English words for the whole game**, against the band's eight (F6). Play screen: **zero**. Start screen: the title. Finish: `t("all_done")` and the two chrome buttons. The only glyphs on the play surface are numerals.

**F-69 element count** (§5.1 reading: an instrument counts as ONE, candidates count individually): squirrel 1 + three branch pads 3 + drey 1 = **5**, half the ceiling.

**Keyboard.** Tab cycles the three pads **in lane order** L-far → L-near → R-near → R-far, never in height order — cycling bottom-to-top would hand the answer to a keyboard user. Enter climbs to the focused branch. The focus ring is the one thing exempt from the freeze assertion (M2).

**Declared risks, stated rather than designed around.**

1. **The heights make L1 orderable by eye, and pretending otherwise would be dishonest.** At L1 (tens differing by ≥ 2) the lowest branch is visibly lowest and a child can climb correctly without reading a numeral. The position is that this is the manipulative working, not a leak — the pre-pivot spec already drew every number's magnitude as bars and cubes on every tile, so no reading demand is lost against it, and a child ordering by height is reading a number line, which is exactly what F-108 prescribes. The demand is restored where the teaching lives: at L2 the many-cubes/few-bars pair is 36 px apart among three branches, and at L3 two branches in one storey sit about 14 px apart and the eye cannot separate them at all. If this still worries the operator, the honest fix is to weight the play list toward L2/L3, never to hide the heights.
2. **The ones are not countable on a pad at 400 px.** Bars land at about 3.3 px wide and cubes at about 3.9 px in a 400 px iframe. Mitigated the way the pre-pivot spec mitigates it: the countable comparison happens in the **correction**, where both bundles lift off their branches and stand at full size (12 × 44) at the centre of the stage. The pad's blocks are a magnitude cue; the correction is where you count. This wants measuring on a real 400 px render, not reasoning about.
3. **Persistence (L2, gate M3) is satisfied in the letter and bruised in the spirit.** The squirrel returns to the foot between trips. It never teleports — it slides down the trunk, in view, carrying nothing, as the last beat of the item — and the world never resets: lit lines, notches and the store only ever grow. But the hero's *altitude* does not accumulate across items, and structurally it cannot: ten triples drawn from 13-99 cannot chain monotonically on one absolute scale, so a climbing game over this content is a round trip or it is nothing. A reviewer running M3 must accept "the foot of the tree" as the persistent position. If that is judged a failure, the frame is wrong for this objective and the fallback is a want-and-agency-without-travel design.
4. **The stuck cue had to be rebuilt to survive the freeze assertion.** The pre-pivot spec pulses the smallest remaining tile every 8 s, which is a tween running while targets are enabled — an M2 failure. Replaced with two **discrete state changes and zero tweens**: at 8 s the squirrel swaps to `ART.squirrelThink` facing up the trunk (a cue that something is expected, giving nothing away); at 16 s the lowest remaining branch gains `ART.hintOutline`. Better than the original and it costs nothing.
5. **The four-lane placement is the thing a builder will get wrong.** Three of four lanes per item, chosen by item index and never by rank; far limbs drawn behind near pads; no near-lane pad at v ≥ 86. A naive implementation that assigns lanes by sorted order re-introduces the rank leak the lanes exist to prevent, and it will not fail any existing gate. This wants its own assertion: over a full session the lane of the middle value must not be predictable.
6. **Notch crowding on the trunk edge.** Thirty notches across 13-99 at 2.8 px per unit will place some numerals within 6 px of each other. Mitigation: the notch itself is always cut on the edge; its numeral takes rank 1 at x = 306, rank 2 at x = 284 when it would land within 14 px of an existing numeral, and is omitted at a third coincidence. Notch numerals are drawn beneath the pads in the display list. This is the risk most likely to be found by the operator's eye rather than by a gate.
7. **Character identity.** Squirrel and fox are both bushy-tailed and the fox is already built. This one is grey-and-cream on `surface2` tints (not the §9.4 warm-body route — the ones-cubes are `accent` and are content, so the character may not spend the state colour), upright and clinging rather than side-profile and standing. Per the standing rule it goes through `art-sheet.js` at 48/96/192/384 and is read by a person at 384 **before** the visual critic sees it, because the critic grades 104 px screenshots and would not catch a bad drawing.
8. **Nothing here has been built or shown to a child.** Every claim about how a seven-year-old reads a path of light that stops below the branch they asked for is a design judgement (Wouters 2013: learning d = 0.29, motivation d = 0.26, not significant). It ships to a local link so a child can settle it.

## How it plays

1. **Start screen.** `S("title")` at (360, 200), 52 px `THEME.font.display` `THEME.colour.structure`; `ART.squirrelIdle` 96 px at (360, 330) with a 2 % `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 470); the picker at (16, 16). Never auto-starts.

2. **The tree is built once, and it is a place.** On entering Play, `ART.ground`, `ART.floor`, `ART.trunk`, the eleven `ART.tenLine`s (with `ART.midMark` on the v = 50 line), `ART.drey`, `ART.dreyLine` and the two `ART.young` are drawn and are never rebuilt between items. The heap inside the drey starts empty, well below the full-line. `ART.squirrelIdle` clings at (360, 374), h = 0. Nothing here moves for the whole session — that is what makes the tree a location rather than a board, and it is why P1's tile re-shuffle is unavailable and a different guard is declared (Rules, THE ONE-WAY CLIMB).

3. **Item 1 — L1 (27, 51, 84).** Three limbs and pads `ANIM.appear` into their lanes: item index 0 drops lane R-far, so the crop hangs at L-far, L-near and R-near, with the permutation of ranks fixed by the index and not by size — say 51 at L-far (x 90, y = 396 − 142.8 = 253), 84 at L-near (x 240, y = 160.8) and 27 at R-near (x 470, y = 320.4). The squirrel is at the foot in `ART.squirrelIdle`. **No caption, no counter, no instruction.** The child looks up a tree at three branches and one of them is the one you can reach.

4. **A legal tap — the world accepts the move** (`branch.v === min(remaining above h)`; here 27):
   - `ANIM.climb` runs the squirrel container up the trunk to y(27) − 22 = 320 (≤ 420 ms). Each `ART.tenLine` it passes switches to `ART.tenLineLit` in turn (`ANIM.litRise`, 90 ms apart) with `tone("tap", k)` climbing — the pitch rises with altitude (F-213). Lines 0, 10, 20 light and stay lit for the session.
   - `ANIM.stepOut` (140 ms) carries it out along the limb onto the pad; pose swaps to `ART.squirrelAct`; `ANIM.takeAcorn` (180 ms) brings one `ART.acorn` into its arms.
   - `ART.notch` is cut at y(27) with `ART.notchNum` "27" beside it (`ANIM.notchCut`), permanently.
   - h is now 27. Pose returns to `ART.squirrelIdle`, the world unfreezes, and the two remaining branches are the whole choice. Feedback has landed about 340 ms after the tap (F-40).
5. **The second and third branches** are the same act with a smaller remaining set: 51, then 84. `tone("correct")` on the third acorn. Then the trip closes: `ANIM.climb` to the crown (h > 100), pose `ART.squirrelHappy`, `ANIM.tipIn` (560 ms) tips the three acorns into the store and the heap rises by three with `ANIM.acornSettle`; `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for clean trips only (helped trips get `tone("correct")` and no praise pop); `ANIM.slideDown` (480 ms) returns it to the foot, and the next crop `ANIM.appear`s. The young do not react.

6. **An illegal tap — attempt 1, world frozen, every target disabled** (the child taps 84 or 51 first). One ACT, and **nothing happens to the squirrel**:
   - `tone("nudge")`; the tapped branch `ANIM.sway`s once, 6° and back, and settles — out of reach, undamaged, still there, still tappable (THE CROSSING's tipping stone, re-sited).
   - The trunk lights its storey lines upward from h and **stops at the height of the branch that was skipped** (`ANIM.litRise`); the lit path visibly ends below the branch the child asked for. That is the whole refusal and it is readable without language.
   - The squirrel does not move, does not reach, does not stretch and does not sag. Its pose is `ART.squirrelIdle` throughout, then `ART.squirrelThink` when the correction ends. Look at the wrong-answer screenshot: the character is pixel-identical to the frame before it (GAME-DESIGN-LAW §3, the reviewer check).
   - Then the enacted correction, world still frozen, ≥ 1200 ms: both numbers' bundles `ANIM.bundleLift` off their pads and stand at full size as `ART.bigBar` / `ART.bigCube` columns at x = 255 (the true next) and x = 465 (the tapped one), bases y = 300, with `ART.tensBadge`s above at y = 236 (`ANIM.badgeIn`); the storey lines between the two branches `ANIM.bandPulse` (≤ 3 cycles). **If the tens are equal**, the ones step follows for a further ~800 ms: `ART.storeyBand` lights the shared storey as one block (`ANIM.storeyIn`), the loose cubes pair off in two rows with `ART.pairLine`s (`ANIM.pairIn`), the unmatched cubes `ANIM.cubePulse` with `ART.onesBadge`s, and `ART.storeyLabel`s re-label that storey 50, 51 … 60. `ANIM.bundleHome` (300 ms) puts the blocks back on their pads. Total ≈ 1400 ms, or ≈ 2200 ms with the ones step — never shorter than the pre-pivot enactment (GAME-DESIGN-LAW §6). The item counts as retried.
7. **Attempt 2** on the same target replays the correction. **Attempt 3**: the true next branch's pad gains `ART.showRing` (`ANIM.showMe`) and holds it until tapped; that tap completes the move as solved-with-help. There is no attempt 4, and there is no way for a trip to end other than by reaching the crown.

8. **Re-queue** (F-41) rides on the store without a seam: a retried item comes back after 2 intervening items as a **different triple at the same level** — a new crop on the same tree, never the same three numbers again — and, if missed again, near the end ("last look"). The store does not care which triple filled it, so the item count stays 10 and no progress surface has to be rewound.

9. **Items 2-10** per Content and Rules: L1 all tens differing by ≥ 2; L2 tens differing by 1 with a many-cubes-but-smaller number; L3 boards with two numbers sharing tens (the ones decide) and reversed-digit pairs.

10. **Finish.** The tree at its play coordinates, redrawn once and not re-composed: the trunk fully lit, ten storeys, top to bottom; **thirty `ART.notch`es** down its edge at the thirty heights the child climbed, each with its numeral — the whole session's arithmetic standing on one number line, in ascending runs of three. Notches from clean trips carry `ART.dotFull`, notches from retried trips `ART.dotEmpty`: **a record, not a score** — no total, no percentage, no clock, no star, and the two forms differ by shape and fill, never by colour alone. The store is full to `ART.dreyLine`, the line met exactly. The two `ART.young` are **out of the drey for the first time in the session**, on the crown beside the squirrel, which is in `ART.squirrelHappy` — the only moment the waiting party changes. `t("all_done")` at (360, 44); `makeButton` `play_again` (250, 510) and `menu` (470, 510); `tone("finish")` once. One `ANIM.celebrate` on the squirrel, ≤ 1500 ms, then the 2 % `ANIM.breathe`. `GameCore.reportHeight()` after build. The gate asserts *properties* of this screen — store at the line, 30 notches present, goal reached — never a pixel match, because the notch pattern is content-dependent by design.

**ACT budget, measured rather than asserted.** Per branch: climb ≤ 420 + stepOut 140 + takeAcorn 180 ≈ 740 ms. Three branches ≈ 2.22 s; tipIn 560; slideDown 480 → ≈ 3.26 s per trip, ≈ 33 s across ten trips, plus about six corrections at ~1.5 s ≈ 9 s → **≈ 42 s against the 60 s ceiling**. Session ≈ 5-6 minutes. `qa-game` must measure this rather than trust the estimate.

## Art registry
```js
const ART = {
  /* the hero and the waiting party */
  squirrelIdle:  { kind: "svg", value: LCSArt.get("squirrel.idle"),  size: 96, fallback: "🐿️" },
  squirrelThink: { kind: "svg", value: LCSArt.get("squirrel.think"), size: 96, fallback: "🐿️" },
  squirrelAct:   { kind: "svg", value: LCSArt.get("squirrel.act"),   size: 96, fallback: "🐿️" },
  squirrelHappy: { kind: "svg", value: LCSArt.get("squirrel.happy"), size: 96, fallback: "🐿️" },
  young:         { kind: "svg", value: LCSArt.get("squirrel.young"), size: 96, fallback: "🐿️" },
  acorn:         { kind: "svg", value: LCSArt.get("acorn"),          size: 64, fallback: "🌰" },

  /* the tree — the apparatus and the scale in one object */
  ground:     { kind: "shape", shape: "rect", w: 660, h: 3, fill: "line" },
  floor:      { kind: "shape", shape: "rect", w: 720, h: 164, fill: "surface2" },              // zone H wash, never animated
  trunk:      { kind: "shape", shape: "roundRect", w: 70, h: 300, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },
  tenLine:    { kind: "shape", shape: "rect", w: 70, h: 2, fill: "line" },                      // a storey line, not yet climbed past
  tenLineLit: { kind: "shape", shape: "rect", w: 82, h: 3, fill: "structure" },                 // LONGER and thicker: state by shape, not colour alone
  midMark:    { kind: "shape", shape: "rect", w: 70, h: 3, fill: "inkSoft" },                   // doubles the v = 50 line so the column is not a featureless ladder
  notch:      { kind: "shape", shape: "polygon", points: [[0,-5],[10,0],[0,5]], fill: "structure" },
  notchNum:   { kind: "text",  value: "", size: 12, font: "body", color: "inkSoft" },

  /* the crop of the item — events, not locations */
  limb:       { kind: "shape", shape: "line", points: [0, 0, 1, 0], stroke: "line", strokeWidth: 8 },   // endpoints set at call
  pad:        { kind: "shape", shape: "roundRect", w: 130, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  padNum:     { kind: "text",  value: "", size: 34, font: "display", color: "ink" },
  tensBar:    { kind: "shape", shape: "rect", w: 6, h: 24, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches, 2.4 px apart
  onesCube:   { kind: "shape", shape: "rect", w: 7, h: 7, fill: "accent", stroke: "bg", strokeWidth: 1 },
  onesGhost:  { kind: "shape", shape: "rect", w: 7, h: 7, stroke: "accent", strokeWidth: 1 },   // a 0-ones number: one dashed empty square at 0.4 alpha
  hintOutline:{ kind: "shape", shape: "roundRect", w: 140, h: 64, stroke: "inkSoft", strokeWidth: 2, radius: 12 },

  /* the goal */
  drey:       { kind: "shape", shape: "roundRect", w: 140, h: 72, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 22 },
  dreyLine:   { kind: "shape", shape: "rect", w: 120, h: 3, fill: "structure" },                // the full-line, scored across the mouth

  /* the enacted corrections — full size, at the centre, where a child can count them */
  bigBar:     { kind: "shape", shape: "rect", w: 12, h: 44, fill: "structure", stroke: "bg", strokeWidth: 1 },
  bigCube:    { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },
  tensBadge:  { kind: "shape", shape: "roundRect", w: 44, h: 24, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 6 },   // numeral 15 px display structure
  onesBadge:  { kind: "shape", shape: "roundRect", w: 30, h: 24, fill: "bg", stroke: "accent", strokeWidth: 2, radius: 6 },      // numeral 15 px display ink
  pairLine:   { kind: "shape", shape: "line", points: [0, -13, 0, 13], stroke: "structure", strokeWidth: 3 },
  storeyBand: { kind: "shape", shape: "roundRect", w: 86, h: 28, fill: "structureSoft", radius: 6 },   // one storey lit as a single block
  storeyLabel:{ kind: "text",  value: "", size: 16, font: "body", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 150, h: 72, stroke: "structure", strokeWidth: 4, radius: 14 },

  /* Finish screen only — the first-try record, cut into the bark */
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The pose set deliberately omits `oops`. The approved design named none, and GAME-DESIGN-LAW §3 is stricter than the ART-BIBLE pose vocabulary: *the character is never the consequence*. On every refusal the squirrel holds `ART.squirrelIdle` and the apparatus does all the reacting.

Bars and cubes differ by size AND shape AND notches, never by colour alone. Exactly three `accent` entries exist (`onesCube`, `onesGhost`, `bigCube`, plus `onesBadge`'s stroke) and they are all the same one thing — the ones — which is why the hero is drawn in `surface2` tints and not in a warm tint (ART-BIBLE §9.4: a warm-bodied mascot spends the state colour).

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the five tweens Test C (the instant cut) patches to duration 0, and no others */
  climb:       { duration: 420, ease: "Sine.InOut", trigger: "the squirrel container up or down the trunk to y(v) − 22 (y set at call)" },
  stepOut:     { duration: 140, ease: "Sine.Out",   trigger: "out along the limb onto the pad (x set at call)" },
  takeAcorn:   { duration: 180, ease: "Sine.InOut", trigger: "one acorn from the pad into the squirrel's arms" },
  tipIn:       { duration: 560, ease: "Sine.InOut", trigger: "the trip's three acorns from the arms into the store" },
  slideDown:   { duration: 480, ease: "Sine.In",    trigger: "the squirrel down the trunk to the foot, h = 0, between trips" },

  /* the world's answer to a move — marks that stay; never patched */
  litRise:     { alpha: 1, duration: 120, ease: "Sine.Out", trigger: "each storey line switching to tenLineLit in turn, 90 ms apart" },
  notchCut:    { scale: 1.3, duration: 160, ease: "Back.Out", yoyo: true, trigger: "a notch appearing at a height just stood on" },
  acornSettle: { y: "+=6", duration: 180, ease: "Bounce.Out", trigger: "the heap rising by three inside the drey" },
  sway:        { angle: 6, duration: 80, ease: "Sine.InOut", yoyo: true, trigger: "a branch that is not the lowest one above h" },

  /* the enacted corrections — teaching, not travel; the instant-cut harness must NOT patch these */
  bundleLift:  { duration: 300, ease: "Sine.InOut", trigger: "both numbers' blocks to two full-size columns against the trunk, 60 ms apart" },
  bundleHome:  { duration: 300, ease: "Sine.InOut", trigger: "the blocks back onto their pads" },
  badgeIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "tens / ones badges (from alpha 0, scale 0.5)" },
  bandPulse:   { alpha: 0.35, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the storey lines between the two branches" },
  storeyIn:    { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "storeyBand over a shared storey (from alpha 0)" },
  pairIn:      { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each pairLine between two matched cubes, 60 ms apart" },
  cubePulse:   { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the unmatched cubes of the ones step" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the true-next pad (from alpha 0.2)" },

  /* arrival and chrome */
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new crop of limbs and pads (from alpha 0, scale 0.6)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the finish squirrel" },
  breathe:     { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "Boot and Finish screens ONLY (ART-BIBLE §6)" }
};
```
No flashing: `showMe` cycles at 1 Hz; every pulse is ≤ 3 cycles. Nothing loops, drifts or breathes on the play surface.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T  chrome only
 56   ├───────────────────────  ╔══════════╗  ─────────────────────  │
      │                        ║  ▂▂▂▂▂▂  ║ drey (360,92) 140×72     │
      │                        ╚═══╤══╤═══╝ full-line across mouth   │
116   │  - - - - - - - - - - - - - ┼──┼ - - - - - - - - - - - - - -  │  v=100  y=116
      │      ┌────────────┐        │  │                              │
160   │      │ 84  ▌▌▌▌ ▪ │────────┤  │        v=84  y=160.8         │  zone W
      │      └────────────┘        │  │                              │  56-420
      │  ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ┼══┼ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  │  v=50 doubled
253   │  ┌────────────┐            │  │                              │
      │  │ 51  ▌▌▌▌▌ ▪│────────────┤  │        v=51  y=253.2         │
      │  └────────────┘            │  │             ┌────────────┐   │
320   │  - - - - - - - - - - - - - ┼──┼─────────────│ 27  ▌▌ ▪▪▪▪│   │  v=27  y=320.4
      │                          ◄─┤▓▓│             └────────────┘   │  squirrel at h
      │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┼──┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  v=10  y=368
396   │══════════════════════════════════════════════════════════════│  ground
420   ├──────────────────────────────────────────────────────────────┤
      │              forest floor — EMPTY, zero controls              │  zone H
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `▌` = a tens bar, `▪` = a ones cube, `▓` = the squirrel on the trunk face, `═`/`─`/`- -` = storey lines (lit / dim / dim). Lane centres are x = 90, 240, 470, 615; the drawing above shows item 1's crop at L-far, L-near and R-near. During a correction the two full-size block columns stand at x = 255 and x = 465 with bases at y = 300 and their badges at y = 236; `ART.storeyBand` sits on the trunk at the shared storey. Fixed layout, `Scale.FIT`, nothing reflows.

## Visual specification
- Background `THEME.colour.bg`. Zone T carries the picker and nothing else — **no progress furniture and no item counter of any kind on the play surface** (MISSIONS.md §1.4); progress is the store filling, the trunk lighting and the notches accumulating.
- `ART.ground` at (360, 396), 660 wide. `ART.floor` fills y 420-560 as a low-contrast wash, never animated, never in front of a tappable thing (ART-BIBLE §4).
- `ART.trunk` centred (360, 246), 70 × 300, from y = 96 to y = 396. `ART.tenLine` at y = 396 − 28k for k = 0 … 10, each 70 wide across the trunk; `ART.midMark` replaces the k = 5 line at y = 256. A line the squirrel has climbed past is swapped to `ART.tenLineLit` (82 wide, 3 px, `structure`) **permanently** — longer and thicker as well as teal, so the state reads without colour.
- `ART.notch` at x = 320 on the trunk's left edge at y(v) for every height ever stood at, with `ART.notchNum` at x = 306 (rank 1) or x = 284 (rank 2, when a numeral would land within 14 px of one already placed); a third coincidence draws the notch with no numeral. Notch numerals are drawn beneath the pads in the display list.
- `ART.drey` centred (360, 92) with `ART.dreyLine` at (360, 70) across its mouth; the heap of `ART.acorn` at 20 px each in rows of six from y = 116 upward, three added per trip, meeting the full-line exactly at thirty. Two `ART.young` at 34 px at (326, 74) and (394, 74), facing out, **static for the whole of play**.
- The squirrel is drawn at (360, 396 − 2.8·h − 22) at 56 px on the trunk face, `ART.squirrelIdle` while a choice is open, `ART.squirrelAct` only inside an ACT, `ART.squirrelThink` after a correction and at the 8 s stuck cue.
- `ART.limb` from the trunk edge (x = 325 or x = 395) to the pad's near edge, 8 px, `line`; a far limb is drawn behind a near pad. `ART.pad` 130 × 56 with the hit box padded to 140 × 64 via `makeTile`; `ART.padNum` 34 px at pad (−45, 0); `ART.tensBar` from pad (−22, +6) at pitch 8; `ART.onesCube` at pitch 8 on a row 10 px beneath; `ART.onesGhost` in place of the cube row for a 0-ones number.
- Correction elements: `ART.bigBar` columns at x = 255 (true next) and x = 465 (tapped), bases y = 300, pitch 16; `ART.bigCube` rows beneath them at pitch 18; `ART.tensBadge` above each column at y = 236; `ART.onesBadge` at the right end of each cube row; `ART.pairLine` between matched cubes; `ART.storeyBand` on the trunk at the shared storey; `ART.storeyLabel`s beside it, t, t+1 … t+10. `ART.showRing` behind the true-next pad; `ART.hintOutline` on the lowest remaining pad at the 16 s stuck cue.
- Finish only: `ART.dotFull` / `ART.dotEmpty` at x = 296 beside each notch — filled for a clean trip, hollow for a retried one; shape and fill both differ, never colour alone.
- Only ONE `accent` region is on screen in any frame: the ones-cubes of the live crop while a choice is open, or the correction's cubes and badges while one is playing, never both — the correction lifts the pads' blocks rather than duplicating them.
- Tap floors: pads 140 × 64 ≥ 56 (§3); gaps between lanes ≥ 20 px horizontally and unbounded vertically. Tab order is the three pads in lane order L-far → L-near → R-near → R-far. Under `?embed=1` the picker is not created.

## Content
Language-neutral; the item is three numbers and the tree is the rest. Items listed in ascending order; **lane assignment is by item index, never by rank** (Rules), and `v ≥ 86` forces a far lane.
- **L1** (tens differ by ≥ 2): (27, 51, 84) · (13, 46, 72) · (35, 68, 90) · (21, 59, 97) · (18, 43, 76) · (32, 65, 88)
- **L2** (tens differ by 1; the smaller number has more cubes): (48, 61, 73) · (39, 52, 64) · (29, 38, 47) · (57, 68, 79) · (19, 26, 35) · (44, 58, 63)
- **L3** (same tens for two of the three; reversed-digit pairs; a zero-ones number): (52, 57, 75) · (36, 63, 66) · (41, 47, 74) · (68, 80, 86) · (29, 92, 99) · (34, 40, 43) · (15, 51, 55) · (70, 77, 79)

Checked against the world, not assumed: no item carries three values ≥ 86 (the tightest is (29, 92, 99), which needs exactly the two far lanes that exist); the closest same-storey pair is (52, 57), 14 px apart, which is the L3 teaching case; the widest crop is (13, 46, 72), spanning 165 px of trunk.

Play list of 10 per Rules with re-queue; no item repeats except by re-queue, and a re-queued item returns as a **different** triple at the same level; two consecutive items never share a number.

Worked example: item 1 (27, 51, 84) climbs 27, 51, 84 cleanly, lighting storeys 0-80 and cutting three notches · item 2 (13, 46, 72) clean → L2 · item 3 (48, 61, 73) taps 61 first (more bars, fewer cubes — reads 48 as more): the way up lights and stops at 48, the columns stand 4 bars against 6 with badges "40" / "60", the 50 and 60 storey lines pulse; then 48, 61, 73 (retried) · item 4 (39, 52, 64) clean · item 5 (29, 38, 47) clean → L3 · item 6 = the re-queue of item 3, returning as (57, 68, 79) · items 7-10 at L3 with (52, 57, 75) retried once (57 tapped before 52 → equal "50" badges, then the ones step) → Finish shows thirty notches, twenty-four of them filled.

## Rules
- **Item count**: 10 (one item = one trip of three branches; three acorns per trip, thirty at the full-line).
- **Difficulty progression**: 2 consecutive clean trips (no refused tap) → the next trip comes from the next level up (cap L3).
- **Adaptation**: a refused tap on 2 consecutive items → the next item comes from one level down (floor L1). A single retried item re-queues (after 2 items, then a last look) without changing level, and returns as a different triple at the same level.
- **Stuck rule** (an inactivity cue, never a clock): at 8 s with no tap the squirrel swaps to `ART.squirrelThink` facing up the trunk; at 16 s the lowest remaining pad gains `ART.hintOutline`. Both are **discrete state changes with zero tweens**, so the freeze assertion (M2) holds while targets are enabled. Nothing about elapsed time is shown and nothing ends.
- **What happens on a correct answer** (the world accepts the move — `branch.v === min(remaining.filter(v => v > h))`): `ANIM.climb` to y(v) with each passed storey line switching to `ART.tenLineLit` (`ANIM.litRise`) and `tone("tap", k)` climbing with altitude; `ANIM.stepOut`; `ART.squirrelAct` and `ANIM.takeAcorn`; `ART.notch` + `ART.notchNum` cut permanently (`ANIM.notchCut`); h becomes v. On the third branch: `tone("correct")`, `ANIM.climb` to the crown, `ART.squirrelHappy`, `ANIM.tipIn`, the heap rising by three (`ANIM.acornSettle`), `GameCore.showPraise` for clean trips only, then `ANIM.slideDown` to the foot and the next crop `ANIM.appear`s.
- **What happens on a wrong answer** (the world refuses the move). Every refusal is `tone("nudge")` + `ANIM.sway` on the tapped branch + the lit path rising from h and stopping at the skipped branch, with the squirrel's pose unchanged. Then, by anticipated mistake:
  - Ones-first / biggest-digit (39 after 51, tens differ): `ANIM.bundleLift` stands both bundles at full size with `ART.tensBadge`s "30" / "50"; the storey lines between the branches `ANIM.bandPulse`.
  - Bigger-looking = more (61 before 48): the same, 4 bars against 6, badges "40" / "60"; and the branch heights say it again for free.
  - Same tens (57 before 52): the tens step shows equal badges, then `ART.storeyBand` lights the shared storey, `ART.pairLine`s pair the cubes, the unmatched cubes pulse with `ART.onesBadge`s and `ART.storeyLabel`s re-label that storey 50 … 60.
  - Largest first ("biggest wins"): the lit path stops at the lowest branch while the tapped branch is at the far end of the trunk, so the whole span of storey lines between them lights and pulses.
  The tree is `setEnabled(false)` for the whole enactment — ≈ 1400 ms, ≈ 2200 ms when the ones step runs — so a tap cannot land mid-teaching. This is never shorter than the pre-pivot enactment (GAME-DESIGN-LAW §6: correction duration may not fall, and the world freezes while a correction plays).
- **Retry behaviour**: per branch — attempt 1 unaided → attempt 2 after the enacted comparison → attempt 3 `ART.showRing` on the true next pad, held until tapped; that tap completes the move as solved-with-help. No attempt 4. Success is certain. **The pre-pivot free undo is deleted, and that is a real feature loss stated rather than buried**: a climb is one-way, there is no un-climbing, and inventing one would be exactly the *walking back does not un-choose* violation the law names.
- **Anti-brute-force guard: THE ONE-WAY CLIMB.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the tree a place (GAME-DESIGN-LAW §6). The named replacement has four parts. (1) *Commitment is a one-way door:* the squirrel never climbs back down inside a trip, a branch taken is beneath it and behind it, and no move can be un-chosen or re-ordered — the only way through is to be right at the moment of the tap. (2) *The board cannot be memorised:* a retried item returns as a **different triple at the same level**, never the same three numbers again, and lanes are re-drawn each item from four **by the item index, never by rank**, so no child ever learns "the middle one is the one on its own". The candidate set, not the positions, varies per item (F-41), and this is strictly stronger than a re-shuffle because it removes the *item* from memory and not just its arrangement. (3) *A guess costs exactly the thing a guesser is trying to skip:* every refused tap freezes the world and plays the full tens-then-ones comparison, ≥ 1200 ms, unskippable — guessing does not buy speed, it buys the demonstration. (4) *Guessing converges on being shown:* with three candidates a random tapper reaches the show-me on most items, every such item is recorded as retried and re-queued as a fresh triple, and no strategy completes a session faster than reading the numbers.
- **Finish condition**: 10 trips, thirty acorns, the store at the full-line. No losing state, no clock, nothing that can be lost; exactly zero ways a session ends other than by finishing. Nothing in the world ever decays: no lit line goes dim, no notch closes, no acorn leaves the store, the store never sinks, the drey never moves, the young never react, and a refused tap costs a pause and a demonstration and nothing else (the RATCHET RULE). The squirrel never slips, is never denied a hold it had, and is never shown as having failed.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is deliberately NOT used — there is no item counter on the play surface.
- Game-specific `STRINGS` (all 11 locales at build time, §17): `title` = "The Long Climb". **Three English words for the whole game**, against the 6-8 band's eight (F6), and they appear on the Start screen only. The pre-pivot caption "Smallest first" is deleted: the tree says it. The play surface carries no words in any locale — only numerals.

## Sound
`tone("tap", k)` as each storey line lights during a climb, k rising with altitude so the child hears the height climb (F-213); `tone("correct")` when a trip's third acorn is taken; `tone("nudge")` on a refused tap; `tone("tap", k)` per bar as the correction columns stand up; `tone("finish")` once at the Finish screen. Sound never carries meaning the screen does not also show, and nothing is spoken. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (the title, All done, Play again, Menu and the praise rotation change with the picker; the tree is numerals and blocks and does not change).
- [ ] Works at narrow width (400-px iframe: the trunk, all three pads with their numerals and blocks, the squirrel, the drey and the full-line all visible and separate in one frame).
- [ ] Keyboard operable (Tab cycles the three pads in LANE order, never height order; Enter climbs to the focused branch; at least one assertion drives a real pointer and maps the hit rectangle rather than sampling its centre, per §3.1).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused taps still completes the trip via the show-me ring; nothing can be lost; the session cannot end except by finishing).
- [ ] MISSION — the squirrel, the three branches and the drey are all on screen in the very first frame of item 1, and the drey's (x, y) is identical in the first and last frames of the session (M1).
- [ ] MISSION — driving a full session, the hero's height changes on every item, and every change is a tween the child caused (M1). Note the declared M3 reading in World: the squirrel slides to the foot between trips, so its start height is not EQUAL to its finishing height, and the correct assertion is *no discontinuity without a caused tween*, never positional equality.
- [ ] RATCHET — a session driven with a wrong answer on every item never decreases `mission.progress` (acorns + lit lines + notches); no lit line goes dim; no notch closes; no acorn leaves the store; the heap never sinks (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.climb`, `ANIM.stepOut`, `ANIM.takeAcorn`, `ANIM.tipIn` and `ANIM.slideDown` to duration 0 produces an identical item log: the same branch tapped, the same acorn taken, the same notch cut, the same storeys lit, in the same order. The harness must NOT patch `ANIM.bundleLift`, `ANIM.bandPulse`, `ANIM.pairIn`, `ANIM.storeyIn` or `ANIM.cubePulse` — those are the teaching, not the travel, and at duration 0 elaborated feedback collapses to knowledge-of-result.
- [ ] DELETION 1 — strip the numerals and the blocks from the pads: the branches still hang at their heights, which is the number-line representation and not a leak; strip the heights as well and no playable climbing mode survives, because no branch is reachable.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: the commit is `world.accepts(squirrel, branch)` over the hero's altitude, so an item becomes mechanically impossible to complete.
- [ ] FREEZE (M2) — at every decision point of a full session, if any pad is enabled the running tween count is zero; the squirrel holds one static pose and nothing breathes, drifts or loops during play. The 8 s and 16 s stuck cues are discrete state changes and add no tween.
- [ ] Every pad shows its numeral and the matching bars and cubes (51 = five bars and one cube; 40 = four bars and one dashed ghost square).
- [ ] Tapping the lowest branch carries the squirrel to it, lights every storey line it passes and leaves them lit for the rest of the session, and cuts a notch with its numeral.
- [ ] Tapping a higher branch first sways it 6°, lights the path from the squirrel and STOPS it at the skipped branch, and leaves the squirrel pixel-identical to the frame before the tap (the character is never the consequence).
- [ ] Tapping 61 before 48 stands 4 bars beside 6 bars at full size with "40" and "60" badges and pulses the 50 and 60 storey lines.
- [ ] Tapping 57 before 52 shows equal "50" badges, lights the shared storey as one block, pairs the cubes with linking lines, badges "2" and "7", and re-labels that storey 50 … 60.
- [ ] Tapping the largest first lights and pulses the whole span of storey lines between the squirrel and that branch.
- [ ] A value of 86 or more never takes a near lane, and no two pads of one item ever overlap.
- [ ] Over a full session the lane of the middle value is not predictable from its rank (lanes come from the item index).
- [ ] A retried item comes back two items later as a DIFFERENT triple at the same level, never the same three numbers.
- [ ] Two clean trips in a row bring the harder level; refused taps on two consecutive items bring the easier one.
- [ ] Only ONE coral region is on screen in any frame: the live crop's ones-cubes, or the correction's cubes and badges, never both.
- [ ] The store rises three acorns per trip and meets the full-line exactly at thirty; the two young do not react to a correct answer and leave the drey only at the finish.
- [ ] The finish screen re-draws the tree at its play coordinates with the trunk fully lit, thirty notches with their numerals, a filled mark beside each clean trip's notches and a hollow one beside each retried trip's; no score, no percentage, no star, no clock.
- [ ] The squirrel art has been rendered by `art-sheet.js` at 48/96/192/384 on the stage colour, in every pose, and READ by a person before the visual critic ran (ART-BIBLE §11.1, §12.1 — identity, not just execution).
- [ ] ACT budget: total ACT time across a full session is measured and is under 60 s (the estimate is ≈ 42 s).
- [ ] With `?sound=off` nothing is audible.
