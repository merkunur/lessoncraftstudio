# 184 — One Each

## Identity
- Slug: `fraction-sort`
- Subject / topic: Mathematics / recognising halves, thirds and quarters as ONE of two, three or four EQUAL parts — and refusing shapes whose parts are not equal
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (tap the tray, then a destination; four destinations)
- Frame: THE ROUNDS
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (item stream, destinations marked by ART icons, per-item judgement, 3rd wrong → show-me on the correct destination). Frame contract: `MISSIONS.md` FRAME 5 THE ROUNDS; law: `GAME-DESIGN-LAW.md`. Content is language-neutral (shapes, cuts and the three fraction symbols); no `LOCALE_DATA`. Fraction notation (1/2, 1/3, 1/4) is used on the tables because this is an 8-9 game (F-27: notation and comparison at 8-9 only).

**Vocabulary map from the pre-pivot spec, so the diff reads cleanly.** The three fraction *bins* are now three round **tables** with 2, 3 and 4 places laid; the "none" *bin* is the **cutting board**; the *belt* is the **sideboard** the trays stand on; the *item* is a scored **tray**. Nothing in the pedagogy moved; the apparatus did.

## Learning
- Objective: Sorts a stream of shapes, each with one part shaded, into the 1/2, 1/3 and 1/4 bins by counting the EQUAL parts, and puts a shape whose parts are not equal into the "none" bin instead of any fraction bin.
- Prerequisites: Recognises halves as two equal parts (game 054) and quarters (game 055); counts to 4; reads the symbols 1/2, 1/3, 1/4 as "one of two / three / four parts" (introduced in game 056).
- Curriculum links: F-112 ("half" = cut, not two EQUAL parts; bigger denominator = bigger; numerator-only comparison; thirds harder than halves and quarters — the equal-parts check by overlay and the level order halves → quarters → thirds are the researched responses), F-27 (halves/quarters at 5-7; formal notation at 6-8 in EN/FR, 8 in US, 8-10 in ES/BR/SE; DE/NL/FI/IT/NO not before 9-10 → 8-9 band, market-conditional), F-21, F-31 row "Fraction notation, compare, number line" — conservative 8-9 (US 3.NF.A.1 "a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts"; England Y2-3 "recognise, find and name a half / a third / a quarter as one of two / three / four equal parts"; France CE2 "fractions simples"; Spain 3º "fracciones sencillas"; Brazil EF03MA09; Sweden åk 3 "enkla bråk"; Netherlands groep 5 "breuken als deel van een geheel"; Germany Klasse 3 "Bruchteile" informal). F-43 (enacted feedback), F-61 (invalid moves refused).
- Common misconceptions (F-112, F-115), each with this game's response:
  1. **Any shape cut into two with one part shaded is "a half" (equal parts not checked).** Response: a 30 / 70 tray carried to the two-place table is dealt out — both mice are served, so *the count was right* — and the tabletop still rests over toward the heavy side (`ANIM.tip`). Then the two pieces swing back together at the centre of the table and stack (`ANIM.stack`), and the strip the smaller piece fails to cover is outlined in the accent colour (`ART.overhang`, `ANIM.pulse`, 900 ms). The board's scriber flicks once (`ANIM.flick`). Nothing is said; the pieces then re-join and the tortoise takes the tray back, still holding it.
  2. **Counting the shaded part only, or the cuts, instead of the parts ("one shaded, so 1/… of what?"; three cuts → thirds).** Response: every set-down deals the tray piece by piece, one piece per place, with `ART.placeNum` 1, 2, 3, 4 appearing on `ART.placeDisc` as each piece lands and `tone("tap", k)` climbing — the shaded piece dealt LAST so it is seen as one of the total. A wrong table leaves either an empty place or a piece stranded in the tortoise's paws (`ANIM.pulse`), the top rests over, and afterwards the table whose place count equals the number of pieces pulses its mice. A cut cannot be dealt to a mouse, so counting cuts stops being an available move.
  3. **Bigger denominator = bigger part (a quarter put in the 1/2 bin because "quarters are more").** Response: the same deal-and-count cue; from L2 the stream alternates a half and a quarter of the SAME shape at the same size. And the room argues it permanently without being asked — the pieces the mice hold at the four-place table are visibly smaller than the pieces the mice hold at the two-place table, because they are pieces of the same size of whole, so *more places means smaller shares* is a standing, wordless property of zone W.
  4. **Thirds are hard: a shape in three parts is called a quarter or a half (F-112 "thirds/fifths hard").** Response: thirds enter only at L2 and always in bars first (three equal strips), circles (three sectors) at L3; the deal lands on 3 and the three-place table's mice pulse; the three-place table stands in the room from item 1 and never leaves, so thirds are met repeatedly (F-41).
  5. **Near-equal parts accepted as equal (a bar cut 45 / 55, a circle cut by a chord close to the diameter).** Response: L3 includes near-miss trays; the tilt is proportional to `(max − min) / mean` and clamped to 4°-8°, so a 10 % imbalance still visibly rests over — a tilted tabletop is easier to read at 400 px than a 4-px line. The stack then draws the thin `ART.overhang` as before; the board is the correct destination, and the show-me on attempt 3 rings it (`ART.showRing`).
  6. **Sorting by shape or shading colour instead of by parts.** Response: shapes (bar, square, circle) and their shading tint are assigned at random per item from three cream/teal tokens. The destinations have no shape at all — a round table takes a bar, a square and a circle alike — so shape cannot predict a destination even in principle, and tint never predicts anything.
  7. **"n parts means 1/n" when the n parts are unequal (a 20 / 40 / 40 bar, a 90° + 135° + 135° circle).** Response: the deal fills every place — every mouse served, nothing left over, the count correct — and the tabletop still rests over. This is the one trap where counting is not enough, and it is the only response in the game that needs the table: a container cannot express "the right number of pieces, wrongly shared", and a one-legged table expresses it as a matter of course. The stack and `ART.overhang` then show which two pieces disagree.

## Mission

**Mission (as the child would say it).** *Get the trays out — nobody can start until the last one is on a table.*

**Hero.** The tortoise (`ART.tortoise`), kept from the pre-pivot spec: a slow, careful animal is the right body for a game about checking before you commit. It walks the length of the sideboard, lifts a scored tray onto its shell, carries it to one of four places in the room and sets it down. Its x **persists from item to item** — it starts each move from wherever its last answer left it, so its route across the session is drawn by its own decisions (`MISSIONS.md` L2). It is never the consequence of anything: on a refusal it holds its `idle` pose and keeps hold of the tray.

**The want — the visible lack, legible in one still frame at 400 px.** The stack of trays on the left end of the sideboard (visibly tall), the tortoise mid-room with a scored tray on its back, and above it two mice at one table, three at the next, four at the next — all seated, all empty-handed, all still. *Those mice are waiting, and that stack has to go out.* The stack shrinks by one every item and never grows. The mice never react, never leave and never get cross: the waiting party changes only at the finish (Device 1).

**The goal.** `mission.goal` = the **stack mark** at (66, 300) — a line painted on the sideboard under the stack, covered from tap one, bare only when the last tray has gone out. Constant (x, y), inside zone W, one state change, at the end. The distance to it is the stack's height, and it shrinks by one slab every item.

**The single state variable `S` = the load standing on each table.**

- **Mathematical reading.** For the tray on the table: the multiset of the areas of its parts, against that table's place count `n`. `S` is fair at that table exactly when `parts.length === n && allEqual(areas)` — which is the definition of the shaded part being 1/n of the whole (US 3.NF.A.1; England Y2-3).
- **Physical reading.** Whether the table **sits level**. These are round pedestal tables on a single central leg. A one-legged table stands level only when there is one piece at every place and every piece weighs the same. Any other load puts the weight off centre and the top rests over.

**There is no `answer` field anywhere in CONTENT.** An item stores `{ shape, cuts[], shadedIndex }` — geometry only. The fair destination is *derived* at set-down by the same function the table uses. The correctness check is literally `tableUnder(tortoise.x).places === parts.length && allEqual(parts.map(area))` — a question about the world, never a comparison against a stored value (`MISSIONS.md` 1.1).

**The isomorphism.** *A one-legged table sits level only when every place has a piece and every piece is the same. That is what "one of n equal parts" means, and the table is the only thing that says it.* The child is not naming a fraction; they are choosing **which table this tray will feed**, and the table decides. The two things a bin normally judges separately — how many parts, and are they equal — are one physical fact about one object:

- **wrong count** → a place is left empty (too few parts) or a piece is left in the tortoise's paws with nowhere to go (too many). The load is off centre; the top rests over.
- **unequal parts** → every place is filled and the table **still** rests over, because the weight is not even. This is the case a bin cannot distinguish and a table can.

The set-down is the whole move. The tortoise raises the tray onto the top and it **breaks along its own score lines** — the lines the child has been looking at — one piece sliding to each mouse in turn, the shaded piece last. Then the top either settles or rests over. Nothing is scored, judged or announced; a table is level or it is not.

**Displacement (`GAME-DESIGN-LAW.md` §2.3).** `answer = f(tortoise.x)`: the commit handler fires when the carry tween *ends*, reads `tableUnder(tortoise.x)`, and evaluates the predicate above. Nothing is decided at the tap — the tap starts a walk, and the outcome is computed from where the tortoise ended up plus the geometry of what it is holding. The honest caveat is stated in full under **Risks** below.

**Integration, not concealment (§2.5).** The notation is in the frame at the moment of the answer: each table carries its fraction on a card on its pedestal — **1/2 · 1/3 · 1/4** (`ART.fracText`) at 24 px, directly under the mice whose number it names. The tray carries no fraction, because it is not one.

**The mark that stays (Device 2).** Every settled tray leaves one piece in the paws of every mouse at that table, and they keep them; and the tray itself stands on the dresser in zone H under the mark of the table that took it, with its own cuts drawn. Nothing ever un-marks.

**Deletion test A — delete the maths.** Remove the equality/count predicate; every table accepts every tray. The tortoise then carries trays from a sideboard to tables and every one of them settles. **There is no choice left**, because a choice needs the world to have a rule, and the rule *is* the maths. Nothing playable survives.

**Deletion test B — delete the mission.** `mutate-mission.js` removes `mission.hero` and `mission.goal` — the tortoise, the tables, the mice and the stack. What is left is a scored shape and no way to commit anything about it, because **the commit IS the set-down** and there is nothing to set it down on. The game cannot complete an item. (The pre-pivot spec fails this: delete the turtle at (80, 176) and all twelve items still play.)

**Deletion test C — delete the walking.** Patch every traversal tween to `duration: 0`. **The item log is identical**, item for item: the tortoise arrives at the table it was sent to, the tray goes up, the deal runs, the table settles or rests over, the outcome is unchanged. Passing means the walk is the *execution of a decision already made*, never a source of difficulty and never filler the game leans on for pacing. The deal, the count cue and the overlay are not traversal tweens and are untouched by the patch — they are the content.

**F-42 gate.** F1 freeze — zero tweens whenever any target is enabled; the mice never animate during play; the tortoise has no idle bob. F2 displacement — above, with the caveat declared. F3 co-location — tray, tortoise and all four destinations in one 720 × 560 frame, one saccade apart, zero camera tweens. F4 single world — Boot / Play / Finish, no hub. F5 instant-cut — above. F6 text budget — **one short sentence**, `S("mission")` on the Start screen only; the play screen carries only `t("question_x_of_y")`. The pre-pivot caption "What part is shaded?" is deleted: the mice ask it.

**R4 concession (the frozen stage reading as broken).** On item 1 only, and once: the correct table's mice lift their paws and set them down as the first tray slides in — the room showing what a table does, then still. It solves nothing and names nothing. F-42 permits exactly this.

**ACT budget (R1, cap 60 s).** 12 × (lift 300 + walk ≤ 600 + deal 1100) ≈ 24 s, plus ~8 refusal cues × 2.0 s ≈ 16 s → **≈ 40 s measured**, inside budget. The walk is capped at 600 ms because no two destinations are more than 444 px apart.

## World

**Zone W = 56-420. Four destinations, fixed for the whole session, from tap one.** This is a deliberate change from the pre-pivot spec, which introduced the fourth bin at L2: a room does not grow a table mid-meal, the child gets a stable map, and — the pre-pivot spec's own argument for keeping the 1/3 bin present at L1 — a fair tray is never tempted onto the board by the board's absence.

```
y   0 +----------------------------------------------------------------+
      | [lang 16,16]              "3 of 12"  (360,30) 18px inkSoft      | zone T
      |            chrome only; no progress dots (MISSIONS.md 1.4)      |  0- 56
 56   +----------------------------------------------------------------+
      |  back-wall wash surface2, x 24->696, y 56->104  (the ONE scene  |
104   |  element); wall/floor line 2px at y = 104                       | zone W
      |                                                                 |  56-420
108   |   +--------+    +--------+    +--------+    +--------+          |
      |   | oo     |    | ooo    |    | oooo   |    |  /     |  mice    |
      |   |  ____  |    |  ____  |    |  ____  |    | ====== |  y=156   |
176   |   | /    \ |    | /    \ |    | /    \ |    | board  |  top     |
      |   |   ||   |    |   ||   |    |   ||   |    |  /\/\  |  y=176   |
232   |   |  [1/2] |    |  [1/3] |    |  [1/4] |    | [recut]|  card    |
268   |   +---+----+    +---+----+    +---+----+    +--------+  foot    |
      |     x=152         x=300         x=448         x=596             |
      |     each 132 wide x 160 tall (hit area y 108->268); pitch 148,   |
      |     gap 16; left edge 86, right edge 662  (>=16 from stage edge) |
      |                                                                 |
300   |  [stack] (66, 264->300)  ==== SIDEBOARD y=311, x 40->680 =====   |
      |     12 slabs 52x3          roundRect h 22, surface2 + line      |
      |                                                                 |
      |              [tray on shell (tortoise.x, 296) 116x84]           |
372   |              TORTOISE  (tortoise.x, 372), 76px  - x PERSISTS    |
      |                 starts x = 152 . walks the sideboard only        |
420   +----------------------------------------------------------------+
      |  THE DRESSER - no controls. shelf x 40->680, y = 470            | zone H
446   |  marks:  1/2 @150   1/3 @300   1/4 @448   recut @596            | 420-560
      |  every tray the child has settled stands here at 34x26 with its |
      |  own cuts drawn 1px ink, pitch 20 from mark.x - 50, wrap at 6   |
      |  praise pop centred (360, 506)                                  |
560   +----------------------------------------------------------------+
```

**A destination in detail** (centre `cx`, e.g. 300 = the three-place table):

- table top: `ART.tableTop`, ellipse 132 × 30 at (cx, 176), `surface` fill with a `line` 2-px edge — **bare wood, no plates, no bowls**;
- pedestal: `ART.pedestal`, a `structure` capsule 26 wide from y 176 to 262; foot `ART.tableFoot`, ellipse 64 × 12 at (cx, 264);
- places: `n` **identical mice** (`ART.mouse`, one drawing, ART-BIBLE §4 "countable objects must be identical instances"), 28 px, seated at y = 156, paws up and empty. Offsets from `cx`: n = 2 → ±34 · n = 3 → −44, 0, +44 · n = 4 → ±51, ±17;
- card: `ART.fracText` "1/2" / "1/3" / "1/4", 24 px `ink` on `surface`, at (cx, 232);
- **the board** (cx = 596): `ART.board`, a rectangular board 120 × 26 on `ART.trestle` legs at y = 176, with `ART.scriber` (an `ink` line glyph, 34 px) at (596, 150) — **no mice and no fraction card**; its card is `ART.iconRecut`, a small shape with a dashed fair cut through it.

**The sideboard and the stack.** `ART.sideboard` runs x 40 → 680 at y = 311; `ART.stackSlab` × 12 stands at (66, 264 → 300), one slab removed per item, never added; `ART.stackMark` is the painted line under it, covered from tap one and bare at the finish.

**Zone H = 420-560 carries NO controls — the world is the hand.** Frame 5's own rule: zone H is empty when the items lie in the world, and here the tray lies on the sideboard in zone W where the tortoise stands. What zone H carries instead is **the dresser (`ART.dresserShelf`, `ART.shelfMark`): the record of everything the child has settled**, all session. Each entry is the tray itself (`ART.miniTray`) at 34 × 26 with its own cut lines drawn, standing under the mark of the table that took it.

**This is not a progress meter in costume, and the test is one line: every mark on a dot row is identical and means only "done" — every tray on this dresser is a different picture.** The child can look down at any moment and see the twelve partitions they have judged, grouped by what they turned out to be. It is F-44's "path filled" and Device 2's "the mark must be the object itself in its new state, never a token representing it". It is also the pre-pivot Finish-screen summary, moved into the world and made available from item 1.

**The pre-pivot `binCount` art entry is deleted** (it appears nowhere in the Art registry above). The pre-pivot per-bin running totals are a score with a different name (`MISSIONS.md` §6.3's critique of the same fixture in 005); the trays on the shelf carry everything a count carried and more.

**Interactive element budget: the tray (1) + four destinations (4) = 5** (F-69, read per `GAME-DESIGN-LAW.md` §5.1). The tortoise, the mice, the stack, the sideboard and the dresser are scenery.

## How it plays

1. **Start screen.** `ART.tortoise` at (360, 190) with `S("title")` above it and `S("mission")` at (360, 300), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600; `t("start")` `makeButton` at (360, 400); language picker at (16, 16), hidden under `?embed=1`. Never auto-starts.

2. **The room is built once, and it stays.** All four destinations, the mice, the sideboard, the twelve-slab stack and the empty dresser are drawn at the coordinates above. The tortoise stands at x = 152 (under the two-place table) with empty paws. `t("question_x_of_y")` at (360, 30). Zero tweens are running: the stage is frozen and a choice is open (F1).

3. **Item 1 (L1: a bar in two equal halves, left half shaded).** The next tray slides out of the stack along the sideboard to (66 + 60, 296) and stops (`ANIM.slideOut`, 320 ms) — a `makeTile` 116 × 84, transparent body, whose children are the `ART.part` pieces (the shaded one drawn in the item's tint) under `ART.trayOutline`. **On item 1 only** the two-place table's mice lift their paws once and set them down (the R4 concession), then hold.

4. **The move.** Tap the tray — the tortoise walks to it (`ANIM.carry`, ≤ 600 ms), lifts it onto its shell (`ANIM.lift`, 300 ms, `tone("tap")`) and holds `idle`. Tap a destination — the tortoise carries the tray along the sideboard to that destination's `cx` (`ANIM.carry`, ≤ 600 ms) and raises it onto the top (`ANIM.raise`, 260 ms). **The commit handler runs when the carry tween ends**, reads `tableUnder(tortoise.x)` and evaluates the world predicate.

5. **The deal — it always happens, whichever way it goes (~1100 ms).** The tray breaks along its own score lines and one piece slides to each place in turn (`ANIM.deal`, 220 ms apart), **the shaded piece last**, with `ART.placeNum` 1 … k on `ART.placeDisc` appearing as each piece lands and `tone("tap", k)` climbing to the piece count (F-213). Every destination and the tray are `setEnabled(false)` for the whole cue; nothing else on the stage moves (F1 holds inside ACT because the child caused it).

6. **It is fair.** Every place is filled, every piece the same: the top **settles level** (`ANIM.settleLevel`, 200 ms), each mouse closes its paws on its piece and keeps it for the rest of the session, `tone("correct")`. One slab leaves the stack (`ANIM.fadeOut`) and a `ART.miniTray` stands up on the dresser under that table's mark (`ANIM.shelve`, 260 ms). Praise pop (`GameCore.showPraise`) on every third correct item and on the twelfth, centred at (360, 506). The tortoise stays where it is; the next tray slides out after 400 ms. First-try if no wrong destination was used on the item.

7. **Wrong — too few parts** (a half taken to the three-place table). The pieces slide out, one to each mouse, the shaded piece last, `ART.placeNum` 1, 2 climbing; **one mouse is left with empty paws** and its place `ANIM.pulse`s. The top rests over 6° toward the loaded side (`ANIM.tip`) and holds. Then the pieces slide back, the tray re-joins (`ANIM.rejoin`), the top returns level, and the tortoise takes it — **still holding it**, so attempt 2 costs one tap.

8. **Wrong — too many parts** (a quarter taken to the three-place table). Every mouse is served and **one piece is left in the tortoise's paws with nowhere to go**; it `ANIM.pulse`s. Same count cue, same rest-over, same hand-back.

9. **Wrong — unequal parts, any table** (30 / 70 at the two-place; 20 / 40 / 40 at the three-place). Every place is filled — the count was right — and the top **still** rests over, tilting toward the heavy side by `clamp(4°, 8°, (max − min) / mean × 40)`, so a near-miss still reads. The pieces then swing together at the centre of the table and stack (`ANIM.stack`, 500 ms), and the strip the smaller one fails to cover is outlined in `ART.overhang` (accent, 4 px) and pulses for 900 ms. `ART.scriber` on the board flicks once (`ANIM.flick`). Then everything comes back.

10. **Wrong — a fair tray taken to the board** (over-rejection). The scriber runs the length of the tray (`ANIM.scribe`, 600 ms) and **finds no cut to make**: each score line ticks in turn with the count cue, the pieces stack and match with **no** overhang. Then the table with that many places has its mice `ANIM.pulse` once.

11. **Attempt 3 — the show-me.** The correct destination gains `ART.showRing` around the whole table (`ANIM.showMe`, 1 Hz). Carrying the tray there completes the item, solved-with-help. No attempt 4.

12. **Tapping a destination empty-handed.** The mice at that table lift their paws once and settle (`ANIM.pulse`); the board's scriber ticks once. A harmless preview, unchanged from the pre-pivot spec; nothing else happens.

13. **A correct set-down at the board is a positive act, not a bin for failures.** The tray goes on the board and the scriber **draws the fair cut it should have had** (`ART.fairCut`, `ANIM.scribe`, 600 ms) — the answer to a question the child has just asked (F-66: the reward IS the content). Then the corrected tray shelves on the dresser under the recut mark, showing both its own cuts and the fair one.

14. **Items 2-12.** Levels per Rules. The room never changes; the trays do. The tortoise's x at the start of item *k*+1 is its x at the end of item *k* (L2 persistence, asserted by M3).

15. **Finish.** The stack mark at (66, 300) is bare and the last tray is on its table. **Every mouse at every table lifts its piece at once** (`ANIM.celebrate`, ≤ 1.5 s, all three tables together so no table is "first") — the only thing the waiting party does in the whole session. The tortoise steps to the middle of the sideboard, sets down its empty paws and sits. `t("all_done")` at (360, 96), size 52, `THEME.colour.structure`. The four destinations stay exactly where they played, at their play coordinates, still loaded (`MISSIONS.md` §9.1 item 6). **The dresser stays and is the summary**: twelve trays on a shelf, grouped under 1/2, 1/3, 1/4 and the recut mark, each drawn with its own cuts — the child's session, as an object. No score, no stars, no counts. Optionally `t("question_x_of_y", {n: first-try, total: 12})` at (360, 440). `t("play_again")` `makeButton` at (250, 512), `t("menu")` at (470, 512); `tone("finish")` once; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes; ≈ 40 s of it is ACT (measured above).

## Art registry
```js
const ART = {
  tortoise:    { kind: "emoji", value: "🐢", size: 76 },                                                  // hero; poses idle / act (lift) / happy (finish). No idle bob during play.
  mouse:       { kind: "emoji", value: "🐭", size: 28 },                                                  // one drawing, n identical instances per table (ART-BIBLE §4)
  backWall:    { kind: "shape", shape: "rect", w: 672, h: 48, fill: "surface2", stroke: "line", strokeWidth: 2 },       // the ONE scene element (ART-BIBLE §4)
  tableTop:    { kind: "shape", shape: "ellipse", w: 132, h: 30, fill: "surface", stroke: "line", strokeWidth: 2 },     // rotates on ANIM.tip; origin at its centre so the tilt is about the pedestal
  pedestal:    { kind: "shape", shape: "roundRect", w: 26, h: 86, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 12 },
  tableFoot:   { kind: "shape", shape: "ellipse", w: 64, h: 12, fill: "structure" },
  fracText:    { kind: "text",  value: "", size: 24, font: "display", color: "ink" },                     // "1/2", "1/3", "1/4" on the pedestal card
  board:       { kind: "shape", shape: "rect", w: 120, h: 26, fill: "surface2", stroke: "line", strokeWidth: 2 },       // the cutting board — the fourth destination
  trestle:     { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 3 },      // two crossed legs under the board
  scriber:     { kind: "shape", shape: "polygon", points: [], stroke: "ink", strokeWidth: 3 },            // the marking tool, 34 px line glyph, at (596, 150)
  iconRecut:   { kind: "shape", shape: "rect", w: 44, h: 22, stroke: "ink", strokeWidth: 2 },             // the board's card: a small shape with a dashed centre cut, no fill
  fairCut:     { kind: "shape", shape: "line", points: [], stroke: "structure", strokeWidth: 3 },         // the cut the scriber draws on a correct board set-down (dashed)
  sideboard:   { kind: "shape", shape: "roundRect", w: 640, h: 22, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 11 },
  stackSlab:   { kind: "shape", shape: "rect", w: 52, h: 3, fill: "surface", stroke: "line", strokeWidth: 1 },          // 12 of them; one leaves per item, never returns
  stackMark:   { kind: "shape", shape: "line", points: [], stroke: "inkSoft", strokeWidth: 2 },           // the goal: painted under the stack, bare only at the finish
  trayOutline: { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 3 },      // the whole tray's edge (bar 116×50, square 84×84) or a circle r 42
  part:        { kind: "shape", shape: "polygon", points: [], fill: "surface", stroke: "structure", strokeWidth: 2 },   // one piece; points per item; the shaded piece uses the item's tint token
  sector:      { kind: "shape", shape: "arc", r: 42, fill: "surface", stroke: "structure", strokeWidth: 2 },            // one circular piece: startDeg/endDeg per item
  placeDisc:   { kind: "shape", shape: "circle", r: 12, fill: "surface", stroke: "structure", strokeWidth: 2 },         // the disc a dealt piece's number sits on
  placeNum:    { kind: "text",  value: "", size: 18, font: "display", color: "ink" },                     // 1 … k as each piece lands, the shaded piece last
  overhang:    { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 4 },         // THE ONE ACCENT ON THE SCREEN: the strip the smaller piece fails to cover
  showRing:    { kind: "shape", shape: "roundRect", w: 150, h: 172, stroke: "structure", strokeWidth: 4, radius: 18 },  // attempt 3, around the whole correct destination
  dresserShelf:{ kind: "shape", shape: "roundRect", w: 640, h: 6, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 3 },
  shelfMark:   { kind: "text",  value: "", size: 16, font: "display", color: "inkSoft" },                 // "1/2" "1/3" "1/4" and the recut glyph, under the shelf
  miniTray:    { kind: "shape", shape: "rect", w: 34, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 1 }  // one per settled tray on the dresser, its cuts drawn 1-px ink
};
```
**Accent budget: exactly one `accent` entry (`ART.overhang`)** — one grep, one number (ART-BIBLE §10.1). Everything else is `structure` / `surface` / `line` / `ink`. There is no red anywhere and the palette has none to give (ART-BIBLE §10.2).

**Tray geometry** (relative to the tray centre on its tile; 116 × 84 tile): a bar 116 × 50 cut at fractions f1 < f2 … of its width gives parts [−58 + 116·fi, −25] … [−58 + 116·fi+1, 25]; a square 84 × 84 cut in halves vertically / horizontally / diagonally, in quarters as 2 × 2, as four vertical strips, or by both diagonals (four triangles meeting at the centre); a circle r 42 in halves (two 180° sectors at angle θ), thirds (three 120° sectors), quarters (four 90° sectors). Unequal trays: bar 30 / 70; bar 45 / 55; bar 20 / 40 / 40; square as one 42 × 84 piece plus two 42 × 42 pieces; square 2 × 2 with the lines at 35 %; circle cut by a chord 13 px from the centre; circle in sectors of 90° + 135° + 135°. The shading tint per item is chosen at random from `structureSoft`, `surface2`, `bg`; the shaded piece is chosen at random among the pieces (for unequal trays the SMALLER piece is shaded on half the items and a larger one on the rest).

**Mouse seating offsets from a table's `cx`:** n = 2 → ±34 · n = 3 → −44, 0, +44 · n = 4 → ±51, ±17. A dealt piece is tweened to its mouse's paws and scaled to `min(1, 26 / pieceLongSide)` so four quarters visibly sit smaller in the paws than two halves do — misconception 3, standing, wordless.

## Animation registry
```js
const ANIM = {
  slideOut:    { duration: 320, ease: "Sine.Out", trigger: "next tray leaves the stack along the sideboard to (126, 296)" },
  carry:       { duration: 600, ease: "Sine.InOut", trigger: "the tortoise walks along the sideboard; target x set at call. TRAVERSAL — patched to 0 by deletion test C" },
  lift:        { y: "-=10", scale: 1.04, duration: 300, ease: "Back.Out", trigger: "the tray goes onto the shell" },
  raise:       { duration: 260, ease: "Sine.Out", trigger: "the tray goes from the shell up onto the tabletop (y set at call)" },
  deal:        { duration: 220, ease: "Sine.InOut", trigger: "one piece slides to one place; called k times, 220 ms apart, the shaded piece last (x,y per place)" },
  badgeIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each place number as its piece lands (from alpha 0, scale 0.5)" },
  settleLevel: { angle: 0, duration: 200, ease: "Sine.Out", trigger: "a fair load: the top comes level and stays" },
  tip:         { duration: 260, ease: "Sine.Out", trigger: "an unfair load: the top rests over; angle set at call, clamped 4-8 deg toward the heavy side; HOLDS until the tray comes off" },
  stack:       { duration: 500, ease: "Sine.InOut", trigger: "the pieces swing to the table centre and stack, largest first (x,y,angle per piece)" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the empty place; the stranded piece; the overhang; the correct table's mice after a cue" },
  flick:       { angle: 12, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the scriber, once, after an unequal-parts cue" },
  scribe:      { duration: 600, ease: "Sine.InOut", trigger: "the scriber runs the length of a tray on the board and draws (or fails to find) a cut" },
  rejoin:      { duration: 300, ease: "Sine.InOut", trigger: "pieces return to the tray and the tray returns to the shell after a refusal" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "place numbers, the stacked copy and the overhang after a cue; one stack slab per item" },
  shelve:      { duration: 260, ease: "Sine.Out", trigger: "the settled tray stands up on the dresser under its mark" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the ring around the correct destination on attempt 3 (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish: every mouse lifts its piece at once, and the tortoise" }
};
```
No flashing: place numbers arrive one at a time, `showMe` cycles at 1 Hz, and `tip` holds a static angle rather than oscillating. **No idle loop on the tortoise or the mice during play** (F1). The only motion outside a child-caused ACT is the R4 one-off on item 1.

## Screen layout
```
y   0 +----------------------------------------------------------------+
      | [lang 16,16]            "3 of 12" (360,30) 18px inkSoft        |  zone T   0- 56
 56   +----------------------------------------------------------------+
      | back-wall wash 24..696, 56..104; floor line y=104               |
      |  2 mice        3 mice        4 mice        scriber   y=156      |
      |  [ top ]       [ top ]       [ top ]       [ board ]  y=176     |  zone W  56-420
      |  [1/2]         [1/3]         [1/4]         [recut]    y=232     |
      |  x=152         x=300         x=448         x=596                |
      |  [stack 66,264..300]  ==== sideboard y=311 ====                 |
      |  tray on shell (tortoise.x, 296)   TORTOISE (tortoise.x, 372)   |
420   +----------------------------------------------------------------+
      | THE DRESSER: shelf y=470, marks y=446, settled trays 34x26      |  zone H 420-560
      | praise pop centred (360, 506)                                   |
560   +----------------------------------------------------------------+
```
Fixed 720 × 560, `Scale.FIT`, no scrolling, no camera movement, static camera for the whole session. Four destination hit areas 132 × 160 (y 108 → 268) at x = 152 / 300 / 448 / 596, pitch 148, gap 16, outer edges 86 and 662 — every one at least 16 px from the stage edge. The tray tile is 116 × 84 wherever it is (on the sideboard, on the shell, on a top). Progress is diegetic: the stack going down, the mice filling up, the dresser filling (`MISSIONS.md` 1.4 L3).

## Visual specification
- Background `THEME.colour.bg`. `t("question_x_of_y")` at (360, 30), 18 px `THEME.colour.inkSoft`, `THEME.font.body`.
- **The room.** `ART.backWall` centred (360, 80). `ART.sideboard` centred (360, 311). `ART.stackSlab` × 12 at (66, 264 + i × 3), the topmost one leaving on each correct set-down; `ART.stackMark` beneath at (66, 300), 52 px wide, `inkSoft`, uncovered only at the finish.
- **A destination** (`cx` ∈ {152, 300, 448, 596}) is a `makeTile` 132 × 160 with a transparent body whose children are, bottom to top: `ART.tableFoot` (0, +88), `ART.pedestal` (0, +43), `ART.tableTop` (0, 0) as its own container so `ANIM.tip` rotates only the top, the `n` × `ART.mouse` at y = −20 on the offsets above, and `ART.fracText` at (0, +56). The board destination substitutes `ART.trestle` + `ART.board` + `ART.scriber` (0, −26) and `ART.iconRecut` at (0, +56).
- **The tray** is a `makeTile` 116 × 84 with a transparent body (`fill` / `stroke` = `THEME.colour.bg` tokens); children = the `ART.part` / `ART.sector` pieces (each its own container so it can be dealt away) with `ART.trayOutline` on top. Selected look = `ANIM.lift` plus the tile's `selectedStroke` (`THEME.colour.structure`, 3 px).
- **Cue objects.** `ART.placeDisc` + `ART.placeNum` at each served place, 1 … k, the shaded piece last; the stacked copy drawn as an `ART.part` / `ART.sector` with no fill and a `structure` stroke; `ART.overhang` outlining the uncovered region in `THEME.colour.accent`, the only accent on the screen; `ART.showRing` around the whole correct destination.
- **The dresser.** `ART.dresserShelf` centred (360, 470); `ART.shelfMark` at (150 / 300 / 448 / 596, 446); each settled `ART.miniTray` at `mark.x − 50 + (i mod 6) × 20`, y = 456, its cut lines drawn 1 px `THEME.colour.ink`, wrapping to a second row at y = 432 after six.
- **Tap floors (band 8-9, ≥ 56).** Destinations 132 × 160; the tray 116 × 84. Gaps ≥ 16. Tab order: the tray, then the four destinations left to right; Enter picks the tray up / sets it down at the focused destination. Every target ≥ 44 real px at a 704-px iframe.
- **Legibility at 400 px.** The FIT scale is 0.556, so the 24-px `ART.fracText` card is ~13 real px and is the **primary** label; the mice are the second cue and the empty paws the third. Meaning is never carried by a count of small things alone, nor by colour alone (§12). If the four-mouse row grades unreadable on the 400-px screenshot, the fix is a wider table (140) with 34-px mice and a 12-px gap — **never a moved threshold**.

## Content
Language-neutral. **An item stores geometry only — `{ shape, cuts[], shadedIndex }` — and no `answer` field**; the destination below is shown in brackets as a reading aid and is *derived at set-down*, never stored. "v" = vertical cuts at the listed fractions of the width, "h" = horizontal, "diag" = one or both diagonals, "sect" = circular sectors of the listed degrees, "chord d" = a chord at distance d px from the centre.

- **L1** (bars and squares; halves and quarters; all four destinations present): (bar; v 50; left) [2-place] · (square; v 25 50 75; second) [4-place] · (bar; v 25 50 75; last) [4-place] · (square; h 50; top) [2-place] · (bar; v 50; right) [2-place] · (square; 2 × 2; top-right) [4-place] · (square; diag one; upper) [2-place] · (bar; v 25 50 75; first) [4-place]
- **L2** (thirds in bars; same-shape half/quarter alternation; obviously-unequal trays): (bar; v 33 67; middle) [3-place] · (bar; v 50; left) [2-place] · (bar; v 25 50 75; second) [4-place] · (bar; v 30; small) [board] · (bar; v 33 67; first) [3-place] · (square; one 42 × 84 + two 42 × 42; the big piece) [board] · (square; 2 × 2; bottom-left) [4-place] · (square; v 50; right) [2-place] · (bar; v 20 60; first, 20 %) [board] · (bar; v 33 67; last) [3-place]
- **L3** (circles; diagonal quarters; near-miss unequal; thirds in circles): (circle; sect 180 180 at 45°; upper) [2-place] · (circle; sect 120 × 3; one) [3-place] · (circle; sect 90 × 4; one) [4-place] · (bar; v 45; small) [board] · (square; diag both; one triangle) [4-place] · (circle; chord 13; small segment) [board] · (circle; sect 90 135 135; the 90° one) [board] · (bar; v 33 67; middle) [3-place] · (circle; sect 120 × 3; one) [3-place] · (square; 2 × 2 at 35 %; the small one) [board] · (circle; sect 180 180 at 0°; lower) [2-place] · (bar; v 55; large) [board]

Play list of 12: start at L1; shuffle within level; levels in order per Rules; at L2 a "half of shape X" is immediately followed by a "quarter of shape X" when both are drawn (the same-shape alternation); no item repeated in a session; **the derived destination never repeats more than twice running** (the fixed-world form of §13, `MISSIONS.md` §6.3: the tables cannot move, so the variation is carried by the CONTENT list, not by the layout); the tint per item is random.

**Worked example.** Item 1 (bar in halves) — the tortoise is at x = 152, carries it up to the two-place table, both mice served, the top settles, one slab leaves the stack, first tray on the dresser under 1/2 · item 2 (square in quarters) first-try, tortoise now at 448 · item 3 (bar in quarters) first-try → L2 · item 4 (bar 30 / 70, small piece shaded) taken to the two-place table: both mice served, the top rests over 6°, the pieces stack, a coral strip glows on the big one, the scriber flicks; the tray comes back to the shell; attempt 2 → the board, the scriber draws the fair cut, shelved under recut (helped) · item 5 (bar in thirds) taken to the four-place table: three pieces dealt 1, 2, 3, one place empty and pulsing, the top rests over; attempt 2 → the three-place table, level (helped) → L1 · items 6-8 first-try → L2 · items 9-11 first-try → L3 · item 12 (bar 45 / 55) taken to the two-place table: both served, the top rests over 4°, a thin coral strip; → the board (helped) → the stack mark is bare, every mouse lifts its piece, twelve trays stand on the dresser.

## Rules
- **Item count**: 12.
- **Difficulty progression**: 3 consecutive first-try correct → next level (cap L3). (Three: items are quick, ~15 s each.)
- **Adaptation**: a wrong destination, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- **What happens on a correct answer**: the deal runs, the top settles level, each mouse keeps its piece, `tone("correct")`; one slab leaves the stack; the tray stands up on the dresser under that destination's mark; praise pop (rotation `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`) on every third correct item and on the twelfth; the next tray slides out of the stack after 400 ms. A correct set-down at the board additionally draws `ART.fairCut`.
- **What happens on a wrong answer** (per anticipated mistake — the tray is dealt out every time, so the cost of an error is instruction, not a mark):
  - *Too few parts for that table*: pieces dealt with `ART.placeNum` 1 … k, one place left empty and pulsing, the top rests over; then `ANIM.rejoin` and the tray returns to the shell.
  - *Too many parts for that table*: every place served, one piece stranded in the tortoise's paws and pulsing, the top rests over; then `ANIM.rejoin`.
  - *Unequal parts, count correct*: every place served, the top **still** rests over by 4-8°, the pieces stack, `ART.overhang` pulses 900 ms, the scriber flicks; then `ANIM.rejoin`.
  - *A fair tray taken to the board (over-rejection)*: the scriber runs the tray and finds no cut to make, the pieces stack with no overhang, then the table with that many places pulses its mice.
  - The tortoise holds `idle` and keeps the tray throughout every one of these. Its pose in the wrong-answer screenshot is byte-identical to its pose in the correct one — **the character is never the consequence**.
- **Retry behaviour**: attempt 1 → attempt 2 after the deal (the tortoise is still holding the tray, so it costs one tap) → attempt 3 with `ART.showRing` on the correct destination; carrying it there completes the item, solved-with-help. No attempt 4. An item completed after any wrong destination does not count as first-try.
- **Finish condition**: 12 trays set down and the stack mark bare. No losing state; nothing decays; a table that rested over is upright again the moment the tray comes off; no piece is ever dropped, no tray taken away, no mouse leaves.
- **THE RATCHET RULE, itemised**: the stack only shrinks, the dresser only grows, the mice only ever gain pieces, and the stack mark is uncovered once and never re-covered. `mission.progress` = trays settled, asserted monotone by M4 across a session driven with a wrong answer on every item.
- **ANTI-BRUTE-FORCE GUARD — "THE SHARE IS ALWAYS DEALT, AND COUNTING THE PARTS IS NOT ENOUGH".** P1's tile re-shuffle is unavailable here: the tables are furniture, and furniture that jumps when you knock on it stops being a place (`GAME-DESIGN-LAW.md` §6). The named replacement has three parts and the third is the structural one.
  1. *The one-way deal.* There is no cheap "no". Every set-down deals the tray place by place with the numbered count cue, the shaded piece last, and the table settles or rests over — ~2.0 s, world frozen, unskippable. A child sweeping all four destinations spends ~6 s of enacted counting and overlay, during which the correct answer is taught three times.
  2. *First-try is the only currency.* Three consecutive first-try correct advances the level; any wrong destination disqualifies the item. A guesser never leaves L1 and so **never meets thirds, circles, diagonal cuts or the near-misses** — the entire content of the game. The session still completes (success is certain, F-46) but a guessed session is the easy content, repeatedly.
  3. *The cheapest visible heuristic is actively refuted by the stream.* A child who never checks equality and simply counts the pieces and matches the mice ("three pieces → the three-mouse table") is **wrong on every unequal tray** — ~30 % of the stream from L2, and from L3 they include 45 / 55 bars and off-centre chords that a piece-count reads as perfectly ordinary. There is no positional habit to acquire (the tables never move, but the trays vary in shape, cut count and equality every item) and no count-only strategy that survives. **The one property that cannot be guessed is the one the game is about.**
  - *Declared honestly*: the base rate on a blind tap is 1 in 4, the same exposure the pre-pivot four-bin spec carries — the frame does not make it worse, and the always-dealt cue makes each wrong guess more expensive and more instructive than a bin nudge. F-65's criterion is met: a random tapper reaches the show-me ladder on most items.

### Risks (declared, not hidden)
1. **The Displacement caveat, and it is this design's weakest joint.** The child taps a destination and the tortoise *then* walks there — the shape §2.3 warns about. Frame 5 is nonetheless the sanctioned P8 home and works exactly this way (the Harbour Wall: *"tap a hole — the crab scuttles along the ledge"*). What separates it from answer-then-arcade: **nothing is decided at the tap.** The tap starts a walk; the outcome is computed at set-down from `tortoise.x` and the tray's geometry, by a predicate about the world; and **there is no `answer` field in CONTENT to compare against.** If a builder ever adds one, the game has become a worksheet again and the guard is gone.
2. **Fiction adjacency to 051 and 185 — real, and to be re-checked rather than waved through.** 051 *Fair Share* deals cherries onto K plates; 185 *Fraction of a Set* deals stars into 2 or 4 boxes. Mitigations built in: **no plates, no boxes, no bowls, and nothing discrete is dealt** — one continuous shape splits along its own score lines; the destinations are round tables that tip, which neither sibling has; and 184 has no numeral tiles and no numeric answer at all, where both siblings are numeral-tap games. Recommendation: **185 should take a different fiction at its own redesign**, and `check-redundancy.js` must be re-run against the transformed designs, not the originals (`GAME-DESIGN-LAW.md` §7).
3. **054 *Fair or Not* is the nearest neighbour on content, not fiction.** It is halves only, band 6-8, with no fraction notation anywhere, and the child compares three cuts of the same shape; 184 is 2/3/4-and-none at 8-9 with the symbols on the tables, and the child judges one tray. Flag it for the redundancy pass anyway.
4. **Counting four mice at 400 px.** ~15 real px per mouse, ~76 real px for a row of four: countable but not comfortable. The fraction card is the primary label and the mitigation is specified above; grade it explicitly on the 400-px screenshot.
5. **The tilt must never read as the tortoise's fault.** Reviewer check: the tortoise's pose is identical in the correct and the wrong screenshot.
6. **The proportional tilt needs a floor and a ceiling.** Below 4° a near-miss is invisible; above ~8° a table looks broken. Clamp 4-8°, driven by `(max − min) / mean`. A measured constant, never a derived one.
7. **Nothing here has been built.** Every claim about how an eight-year-old reads a table resting over is a design judgement. The tilt, the deal and the 400-px mouse count are the three things to put in front of the operator first.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read through `S(key)`): `title` = "One Each"; `mission` = "Everybody gets the same". **`mission` appears on the Start screen only** — one short sentence, five English words, inside the 8-9 budget with the 1.6× German/Finnish allowance. The pre-pivot caption `whichPart` ("What part is shaded?") is deleted; the play screen carries no game-specific text at all, because the mice ask the question.
- The destination labels are the symbols 1/2, 1/3, 1/4 (drawn as `ART.fracText`) and the recut glyph (`ART.iconRecut`), not words, in every language.
- All 11 locales are authored at build time per BUILD-CONVENTIONS §17; there is no `LOCALE_DATA` because the content is geometry.

## Sound
`tone("tap")` when the tray goes onto the shell; `tone("tap", k)` per dealt piece (the pitch climbs to the piece count — F-213); `tone("tap")` when the stacked copy lands; `tone("correct")` when a top settles level; `tone("nudge")` when a top rests over; `tone("finish")` once at the end. Silent under `?sound=off` — and nothing is carried by sound alone: the place numbers, the empty place, the stranded piece, the tilt and the overhang carry every meaning the tones carry (§12, F-43).

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise and the Start-screen mission sentence change with the picker; the pedestal cards read 1/2, 1/3, 1/4 and the recut glyph in every language).
- [ ] Works at narrow width (400-px iframe: all four destinations, the stack, the tortoise, the tray and the dresser visible and separate; the fraction cards legible; the four-mouse row countable).
- [ ] Keyboard operable (Tab: the tray, then the four destinations left to right; Enter picks the tray up / sets it down at the focused destination).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong destination never ends the session; the show-me always leads to completion; the tortoise never falls, is never denied and never changes pose on an error).
- [ ] **Mission**: `mission.goal` (the stack mark) is at a constant (66, 300) inside zone W for the whole session, and `mission.hero`'s x changes on at least 11 of the 12 items (M1); the tortoise's x at the start of item k+1 equals its x at the end of item k (M3); the room's zone-W pixels differ visibly between item 1 and item 12 outside the current item's own region (M3).
- [ ] **Ratchet**: driven with a wrong answer on every item, the stack never grows, the dresser never shrinks, no mouse ever gives a piece back, and `mission.progress` never decreases (M4).
- [ ] **Freeze (F1)**: at every decision point, if any target is enabled the running tween count is zero — including the mice, which never animate during play (M2).
- [ ] **Instant cut (F5 / deletion test C)**: with every `ANIM.carry` patched to `duration: 0`, the item log is identical, item for item; total ACT time per session is ≤ 60 s (measured ≈ 40 s) (M6).
- [ ] **Deletion test B**: with `mission.hero` and `mission.goal` removed, the game fails to complete an item (`mutate-mission.js`).
- [ ] No progress dots on the play surface; progress reads from the stack, the mice and the dresser alone (M5).
- [ ] A bar cut 30 / 70 taken to the two-place table serves both mice, rests the top over, stacks the pieces and shows a coral strip on the big one; the tray comes back to the shell and the tortoise's pose is unchanged.
- [ ] A bar in three equal strips taken to the four-place table is dealt 1, 2, 3 with the shaded strip last, leaves one place empty and pulsing, and rests the top over; the three-place table's mice pulse afterwards.
- [ ] A square in four equal quarters taken to the board is run by the scriber, finds no cut to make, stacks with no coral strip, and the four-place table's mice pulse.
- [ ] A bar cut 20 / 40 / 40 taken to the three-place table serves every mouse and the top **still** rests over (misconception 7 — the count is right and the answer is wrong).
- [ ] At L3 a circle in three sectors goes level on the three-place table, a circle cut by an off-centre chord goes to the board, and a bar cut 45 / 55 rests the top over by at least 4°.
- [ ] Shading tint varies and never predicts a destination; a circle in halves and a bar in halves both settle on the two-place table.
- [ ] Three first-try corrects in a row bring thirds and the near-misses; a wrong destination brings simpler trays next.
- [ ] The finish shows the stack mark bare, every mouse holding at least one piece, the four destinations at their play coordinates still loaded, and twelve trays standing on the dresser under their marks; no score, no stars, no counts. The gate asserts these properties, never a pixel match (R6).
- [ ] With `?sound=off` nothing is audible and every cue still reads.
