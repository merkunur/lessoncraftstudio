# 018 — Opening Day

## Identity
- Slug: `tens-and-ones-shop`
- Subject / topic: Mathematics / two-digit numbers (10-99) built from ten-rods and one-cubes
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (per-delivery variant: a tap loads the barrow at a yard, or tips the load into one compartment of the crate; the crate judges each delivery as it lands, so there is no Check tile)
- Frame: THE HAUL
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§17. Pattern contract: `catalogue/PATTERNS.md` P2 (tap the source, then tap the destination). Frame contract: `design/MISSIONS.md` FRAME 4 and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE; the F-42 gate). The pattern says only how the finger reaches the world; the frame is the game. P2 permits a spec to say when the arrangement is judged — this one judges every delivery as the crate takes it, and the only whole-crate event is a count at the counter.

## Learning
- Objective: Builds a two-digit number (10-99) shown on a price tag by placing the right number of ten-rods and one-cubes into a tray, then checks it.
- Prerequisites: Reads two-digit numerals; knows a rod is ten ones (games 016/017). Reads nothing else.
- Curriculum links: F-108 (digits as independent numbers; zero placeholder ignored; de/nl/da inverted number words; "tens as bundled rods that cannot be split without an action"), F-50 (base-ten blocks are an evidence-backed manipulative), F-21, F-31 row "Place value tens/ones" — conservative 7-8, earliest 5 → 6-8 (US 1.NBT.B.2 "the two digits of a two-digit number represent amounts of tens and ones"; England Y2 "recognise the place value of each digit in a two-digit number"; Germany Klasse 1-2 "Zehner und Einer"; France CP-CE1 "dizaines et unités"; Netherlands groep 4 "tientallen en eenheden"; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3; Finland grades 1-2).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Digits treated as independent, or the number word's order followed (34 built as 4 rods and 3 cubes; German "vierunddreißig" says four first).** Response: **half of this error is now refused by the object and never reaches a correction at all** — a child who reaches for the ones place first and wheels a load of rods to the cup tray finds that a rod will not go in a cup, the crate declines it wordlessly (`ANIM.nudge` on the tray, the load still on the barrow, no attempt counted), and the ones-first reading is dead before it can be built. The pure count-swap — four rods in the rack, three cubes in the cups — is a legal arrangement of a different number, so no shape can refuse it, and it is corrected in full at the counter: the goods count themselves in place order, rods 10, 20, 30, 40 with `ART.countBadge`s 250 ms apart and a rising `tone("tap", k)`, then cups 41, 42, 43; `ART.countTotal` chalks "43" directly beneath the chit's "34"; the chit's TENS digit takes `ART.digitHi` while the ROD RACK `ANIM.pulse`s and its `ART.tallyChalk` reads 4, then the ONES digit while the CUP TRAY pulses and its tally reads 3. The disagreement is shown in the place where it lives, never as two totals side by side. The layout tens-then-ones is the anchor, never the word order.
  2. **Zero placeholder ignored (30 built as 3 cubes, or as 3 rods and 3 cubes).** Response: **this is the one that resists a physical staging and the spec says so rather than pretending** — there is no act for "put nothing here", and no object can refuse a child who brought some ones when the order said none. It is re-staged at equal strength and equal duration: L2 and L3 keep their zero-ending orders, the count stops at 30 (or runs on to 33), the chit's "0" takes `ART.digitHi`, and `ART.emptyOnes` outlines the WHOLE cup tray and `ANIM.pulse`s once — twenty cups, every one of them empty, is the wordless argument that the ones place holds nothing.
  3. **Building the ones with ten or more cubes instead of a rod (23 as 23 cubes).** Response: the error must stay makeable, so the tray still accepts twenty cubes and nothing intervenes early — but the child now sees it coming, because the barrow's cup bed is two rows of ten and a load of thirteen reads as ONE FULL ROW AND THREE while it is still uncommitted. At the counter, before the count, the badger ties a twine band (`ART.twine`) round each full ten, the ten cubes glide together into one rod (`ANIM.bundle`, 500 ms per bundle, `tone("tap", 10)`) and **the badger carries the new rod across to the rack itself** (`ANIM.carryBack` to the rack, `ART.badgerLift`) — the regroup is an act performed by the hero in the ones place and finished in the tens place, which is the whole content of "ten ones are one ten". The count then runs on the bundled crate; if the total is now correct the item completes as solved-with-help, not first-try.
  4. **Splitting a rod to adjust by one (wanting 29 after building 30).** Response: a rod is one banded piece with nine notches and no seam, and the world says so twice. The rack gives back whole rods only — tapping it with an empty barrow lifts out ONE WHOLE ROD, which the badger then wheels back to the rod yard — and a rod will not go into a cup, so there is nowhere for half a ten to be. To make 29 from 30 the child takes the whole ten back and fetches nine ones. The object refuses the impossible action (F-61); no message.

## Mission
**Mission, as the child would say it.** *Get the shelf stocked so the shop can open.*

**The hero.** A badger with a barrow, in side profile, 80 px, facing whichever way it is walking. It is the roster's undrawn porter (ART-BIBLE §3) and it was chosen deliberately, not for flavour: it is not a warm-bodied mascot, so the §10.1 warm-body clause does not fire and coral stays free to mean something; a badger is the animal that carries and stacks, so a barrow reads as its job rather than as a prop; and its black-and-white markings are drawn as thin `ink` stripes on `surface2` tints, which is exactly what this palette can do. It is **the only thing on the stage that can move a block** — nothing glides on its own, no block teleports, and there is no Check button anywhere. Poses: `idle` · `walk` · `act(lift)` · `act(tip)` · `happy`. It has no `oops` pose, on purpose: see Refusal.

**The want (the visible lack), readable from one still frame at tap one, with no motion and no words.** A bare shop. The stock shelf is empty wood — no crates, no slots, nothing drawn on it at all. The shutter is half down over the door. On the step outside sit a hedgehog and a duckling with empty baskets, perfectly still. Beside the badger stands one open crate with an order chalked on its front board and nothing in it. A seven-year-old reads *"the shop is not open, and it is not open because the shelf is bare"* from the photograph, and by item eight the same still frame reads harder: seven crates on the shelf, each showing what it holds, one empty crate on the stand, two animals still on the step.

**The goal.** The door with the half-lowered shutter at a constant (664, 101) for the entire session, and the two animals on the step in front of it — Device 1, THE WAITING PARTY, drawn from tap one, in zone W, in a state that only the finish changes. They never react to a correct answer (that would make them an approval meter, F-44's banned shape); they sit in exactly the same pose for as long as the child takes.

**S — the single state variable: WHAT IS STANDING IN THE CRATE'S TWO COMPARTMENTS.**

- **Physical reading:** how many ten-rods are seated in the crate's left rack, and how many single cubes are sitting in its right cup tray. You can point at it; the badger put every one of them there by hand.
- **Mathematical reading:** the two-digit number (rack × 10) + cups, held in the place-value structure the crate is built as — a rack that only takes rods on the left, cups that only take singles on the right, in the same left-to-right order the order numeral is read.

The mission's goal is a predicate on S: the crate holds what the order chalked on its own front board says. The transition function is the badger's delivery run — fetch n of one kind onto the barrow, wheel it to ONE of the crate's two compartments, tip it in. The child's tap always selects a transition of S (fetch one more · deliver this load HERE · take one back); it never reports an answer about S. **There is no `answer` field anywhere in the game.** The numeral on the chit is the ORDER, not a key, and the two compartments are not stored as "correct" or "wrong" — they are a rack that takes rods and a tray that takes cubes.

The commit handler for a delivery reads a POSITION, which is the Displacement rule literally (GAME-DESIGN-LAW 2.3):

```js
deliver() {                                   // fired when the badger arrives, not when a tile is tapped
  var c = crate.compartmentAt(badger.x);      // WHERE THE BADGER IS STANDING
  if (!c)                             return;                 // it wheeled somewhere that is not a compartment
  if (c.takes !== barrow.kind)        return refuse(c);        // a rod will not go in a cup
  if (c.count + barrow.n > c.capacity) return refuse(c);       // nine slots; twenty cups
  c.take(barrow);                                              // the world accepted the move
}
```

**The isomorphism — moving IS solving.** *The answer is the load, and the place is where the badger tips it.* The crate is a place-value chart you can walk up to: left rack = tens, right cup tray = ones, a divider between them, in the numeral's own reading order. The child's whole verb is to stand at a yard, load the barrow (one tap = one thing, and the load sits in the barrow IN VIEW, countable, uncommitted), then wheel it to one compartment. Two runs per order. Two loads. Two digits. Three things make the moving literally be the solving:

- **The walk is the commitment.** The barrow shows four rods while the chit says 34. Nothing has happened yet — the error is visible before it exists. Committing is not pressing a button, it is the badger setting off, and that single beat is why zone H is empty: **the barrow, not a control strip, is the hand.**
- **Which compartment is a decision the world judges, not a label it reads.** A load of rods wheeled to the cup tray is refused by the shape of the crate, so the ones-first half of misconception 1 is refused physically and wordlessly by an object. The pre-pivot spec could only correct that after the fact, on a Check.
- **The unit of delivery is the unit of place value.** The barrow tips as ONE load. Nine rods go in as nine rods; ten cubes go in as ten cubes and come out the far side as one rod. The child never "answers 34"; the child fetches three tens and four ones, and the crate is then what the order says.

**Where the isomorphism stops, stated plainly.** The final verdict at the counter is a COUNT — the goods are counted in, tens first (10, 20, 30) then ones (31, 32, 33, 34), and the number that count lands on is compared with the chit. That is `count === order`, and this spec is not going to dress it as a fit. A both-directions physical predicate was looked for and every candidate failed on a measurement or on the pedagogy: a counterweight belongs to 019 (MISSIONS §3 already assigns `read-the-rods` a base-ten counterweight door); an aperture only ever refuses one direction; a receptacle of N cells reveals N; a two-part socket PRE-DECOMPOSES the numeral and destroys the transcoding this game exists to teach; and a continuous measured extent needs a unit of ≥ 3.4 px at 99 units inside a 364-px zone W, which makes a one-cube invisible. Cardinality is established by counting. What the world DOES own is the entire structure — every illegal place-value move is refused by an object — and only a plain miscount reaches the count. This is the MISSIONS §8.2 Tier-C declaration idiom applied to a maths row, and a reviewer should check it is not spreading.

**Apparatus mapping, because the Objective above is carried across byte for byte** (GAME-DESIGN-LAW §3: the objective is invariant): the *price tag* is the order chit chalked on the crate's own front board, and the *tray* is the crate with its rack and its cup tray. Nothing about the number, the blocks or the reading order changed; the furniture the child touches did.

**The mark that stays.** A crate accepted at the counter is set on the stock shelf, left to right, and it stays there for the rest of the session with its order chalked on it and its rods and cubes visible through the slats (Device 2, and the RATCHET RULE). Ten orders, ten crates, one shelf going from bare wood to full. This is not a dot rail in costume and it passes the test that settles it: the mark is **the object itself in its new state**, never a token standing for it (F-66). A circle says "one done". Crate seven on the shelf says "sixty, and here is what sixty looks like: six rods and nothing in the ones". No empty slots are pre-drawn, so there is no meter to read — an empty shelf is an empty shelf, not nine unfilled circles.

**Diegetic progress, and there is no progress furniture of any kind on the play surface.** Three displays, no glyphs, no counter: (1) the shelf filling left to right; (2) the shutter, half down from tap one and up once at the end; (3) within an item, the two tally chalks under the crate's compartments, which fill as each run lands. `mission.progress` for the M4 gate = crates on the shelf; monotone by construction, and a session driven with a wrong answer on every item never decreases it. Nothing here is timed: the shop opens WHEN it is stocked, not BY anything. There is no dusk, no closing hour, no queue that gives up.

## World
Stage **720 × 560**, `Scale.FIT`, static camera, no scrolling. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** Two things that stood here in the pre-pivot spec are deleted outright: the row of progress circles at y = 28 and `t("question_x_of_y")` at y = 48. Both are banned on the play surface by MISSIONS.md 1.4; the first-try record survives only as an optional line on the Finish screen (§10).

**Zone W, y 56-420 — THE WORLD.** The hero and the goal are both inside it at every moment of the session, and the goal's (x, y) never changes.

*Shop band, y 58-146 (the destination).* A single low-contrast scene wash `ART.shopWall`, 560 × 84, centred (330, 104), `surface2` fill with a `line` edge — one scene element, per ART-BIBLE §4. On it:
- **The stock shelf** `ART.shelf`, a 3-px `structure` board from x 44 to x 500 at y = 132, bare at tap one. Finished crate *i* is set on it at (66 + i × 44, 108), 40 × 44, i = 0…9, each chalked with its own order in `ART.shelfNumeral` (15 px display) and carrying `ART.miniRod` × tens and `ART.miniCube` × ones so its contents stay readable from across the shop.
- **The counter hatch** — the commit target. `makeTile` 84 × 72 centred (556, 104). Tapping it sends the badger to the counter run-up to present the crate.
- **The door and the waiting party.** `ART.door` 68 × 86 at (664, 101) with `ART.shutter` 68 × 44 half down over it at (664, 80); `ART.step` a 3-px `line` from x 616 to x 712 at y = 146; `ART.hedgehogWait` 42 px at (634, 125) and `ART.ducklingWait` 36 px at (676, 128), each drawn with its own empty basket at its feet.

*The crate, centred (360, 232), 350 × 148 → x 185…535, y 158…306.* `ART.crate`, `roundRect` r 16, `surface2` fill, 3-px `structure` stroke.
- **Rod rack (tens)** — `makeTile` 164 × 116 centred (281, 230) → x 199…363, y 172…288, drawn with `ART.rodRack`. Nine slots; rod *i* at (209 + i × 18, 230), i = 0…8, each `ART.rod` 14 × 84 with nine hairline notches.
- **Divider** — `ART.divider`, a 2-px `line` 116 tall at x = 370. The gap between the two tap targets is 14 px (§3 requires ≥ 12); the divider sits in the middle of it.
- **Cup tray (ones)** — `makeTile` 144 × 116 centred (449, 230) → x 377…521, y 172…288, drawn with `ART.cupTray`. **Twenty cups in TWO ROWS OF TEN**: cup *j* at (386 + (j mod 10) × 14, 214 + floor(j / 10) × 32), each `ART.cube` 12 × 12. The row-of-ten shape is load-bearing — it is what makes a tenth cube look like a full row rather than "one more".
- **Order chit** — `ART.orderChit`, a 116 × 40 chalk board pinned to the crate's front board, centred (360, 306), overlapping the crate's lower edge. `ART.orderNumeral` 40 px display, tens digit at x = 344 and ones digit at x = 376, so `ART.digitHi` can ring either one alone.
- **Per-place tallies** — `ART.tallyChalk` 34 × 32 at (255, 308) and (465, 308), each directly under its own compartment and 30 px clear of the chit, carrying `ART.tallyNumeral`. Blank until that run lands.
- **The count total** — `ART.countTotal`, 40 px display at (360, 352), drawn only during and after a counting-in. It is never on screen at the same moment as the badger, because a counting-in only happens while the badger is away at the counter run-up.

*The yards (the two sources, both places the badger walks to).*
- **Rod yard** — `makeTile` 128 × 128 centred (88, 250) with `ART.rodYard`: a pallet with one `ART.rod` drawn on it plus `ART.rodLabel` "10" at 26 px.
- **Ones bin** — `makeTile` 128 × 128 centred (632, 250) with `ART.onesBin`: a bin with one `ART.cube` plus `ART.cubeLabel` "1".

*The badger and the barrow — the walking line, feet at y = 410.* `ART.badgerIdle` (and its four other poses) 80 px centred (x, 370), spanning y 330…410, fully inside zone W. Four stations: rod yard (88, 370) · crate (360, 370) · counter run-up (540, 370) · ones bin (632, 370). `ART.barrow` 148 × 56 is drawn at the badger's crate-facing side, centred (badger.x ± 74, 384): +74 at the rod yard and the crate, −74 at the counter run-up and the ones bin, so it never leaves the stage. Rods on it lie flat at (barrow.x − 58 + i × 14, 380), 10 × 44; cubes ride in a 2 × 10 cup bed at (barrow.x − 62 + (j mod 10) × 13, 372 + floor(j / 10) × 22), 11 × 11 — **so the barrow shows a full row of ten before the child ever commits it.**

**Zone H, y 420-560 — THE HAND, and it is EMPTY of controls.** A plain `ART.floorWash` floorboard band, 720 × 140 centred (360, 490), `surface2`, and nothing else. No keypad, no Check tile, no caption. This is the frame's own provision (MISSIONS §1.4: zone H *"may be EMPTY … because the world itself is what the child taps"*). Every target in this game is a diegetic object — a yard, a compartment, a hatch — and the hand is the barrow, which is a world object at the badger's side in zone W because it must travel with the badger and because the pre-commit load is the thing the child is really holding. Two consequences, declared rather than hidden: **(a)** 140 px of stage carries no control and the visual critic will probably read it as dead space on the first sweep — the honest answer is that the working band (yards, crate, badger, y 158-410) is where the eye belongs and the floor beneath it is floor, and if the critic still calls it the fix is to raise the walking line and deepen the shop band, **never** to invent a control to fill it, which would put the hand back on the screen and undo the point; **(b)** on the FINISH screen only, zone H carries `play_again` at (250, 510) and `menu` at (470, 510), per §10.

**Interactive elements (F-69, §5.1 reading):** rod yard · ones bin · rod rack · cup tray · counter hatch = 5 targets, plus the badger counted as the character = **6**. Four under the ceiling. Individual cups and rods are NOT tap targets — the compartment is, which deletes the pre-pivot spec's declared 44-px-hit-area compromise outright.

**Tap floors (band 6-8 = 56):** 128 · 128 · 164 × 116 · 144 × 116 · 84 × 72. All clear. **Gaps:** rod yard → rack 47 · rack → tray 14 · tray → ones bin 47 · shelf → hatch 14. **Tab order:** rod yard → rod rack → cup tray → ones bin → counter hatch.

**Longest traversal:** rod yard → crate ≈ 272 px, 520 ms. Nothing crosses the stage.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title `S("title")` = "Opening Day"): `ART.badgerIdle` at (360, 200) with `ART.barrow`, the premise `S("premise")` = "Stock the shelf. Open the shop." at (360, 300) in 24 px `THEME.font.body` `THEME.colour.inkSoft`, Start, and the picker (hidden under `?embed=1`). Six of the band's eight English words are spent here and none on the play surface.
2. **Item 1 (L1, order 23).** The Play scene builds the whole world at once, in the coordinates above: the bare shelf, the shutter half down, the two animals on the step, the empty crate on its stand with "23" chalked on its chit, the two yards, and the badger `ART.badgerIdle` at the crate station (360, 370) with an empty barrow. Zone T carries the picker and nothing else; zone H is floor. **Per MISSIONS R4, the first item demonstrates itself once and then holds:** the badger takes one step toward the rod yard and stops (`ANIM.walk`, 200 ms, ~40 px), which F-42 permits verbatim for the first item of a new mechanic. Then the stage FREEZES — zero tweens, every target live.
3. **Fetching.** The child taps the **rod yard**. If the badger is not already there it walks (`ANIM.walk`, `ART.badgerWalk`, ≈ 500 ms), then lifts one rod onto the barrow (`ART.badgerLift`, `ANIM.loadOn`, `tone("tap", 10)`). Each further tap on the yard adds one more rod to the barrow, in view and countable, with no walk. Tapping the **ones bin** does the same for cubes (`tone("tap", 1)`), walking there first if needed; a barrow can only carry one kind, so switching yards with a load aboard first wheels the load back and sets it down where it came from (`ANIM.carryBack`) — nothing is ever lost.
4. **Delivering.** The child taps a **compartment** — the rod rack or the cup tray. The badger wheels the barrow to the crate (`ANIM.wheel`, ≈ 520 ms) and tips it into that compartment (`ART.badgerTip`, `ANIM.tipIn`, one `tone("tap", k)` per piece as it seats). The blocks take their drawn positions, and `ART.tallyChalk` under that compartment gains the count the badger just delivered. The stage freezes again.
5. **Refusals (all four are an object declining, and the badger's drawing never changes).**
   - **Rods wheeled to the cup tray, or cubes wheeled to the rod rack.** The badger tips; the load will not go; `ANIM.nudge` on that compartment; the load stays on the barrow. No message, no attempt counted. This is the word-order error refused by the shape of the crate.
   - **A tenth rod.** The rack has nine slots. The rod stays on the barrow, `ANIM.nudge` on the rack. A capacity, not a rule.
   - **A twenty-first cube.** The tray has twenty cups. The same.
   - **Taking a rod back.** Tapping the rack with an **empty** barrow lifts out one WHOLE rod (`ART.badgerLift`) and the badger wheels it to the rod yard (`ANIM.carryBack`). There is no gesture anywhere that yields part of a rod. Tapping the tray with an empty barrow takes back one cube the same way.
6. **Presenting (the commit).** The child taps the **counter hatch**. The badger walks to the counter run-up (540, 370) (`ANIM.walk`, ≈ 350 ms) and knocks; every target is disabled and the world freezes except the counting-in. If the crate is empty, the badger simply looks at the hatch and holds — the crate's own emptiness is the reason, no penalty, no attempt.
   - **Bundling first**, if the tray holds ≥ 10 cubes: `ART.twine` binds each full ten, the ten cubes glide together (`ANIM.bundle`, 500 ms) and become one rod, and the badger carries it across to the rack (`ANIM.carryBack`, `tone("tap", 10)`). If the rack is already full the bundle stops there and the surplus cubes stay cubes; the count then simply disagrees.
   - **The counting-in:** rods take `ART.countBadge`s 10, 20, 30 … in turn, 250 ms apart, with a rising `tone("tap", k)`; then the cups continue 31, 32, 33; `ART.countTotal` chalks the total at (360, 352).
   - **The order matches (2 rods + 3 cubes = 23):** `ANIM.pop` on the chit, `tone("correct")`, `GameCore.showPraise(scene, key)` with the next praise key; the crate glides from its stand through the hatch and up to its slot on the shelf (`ANIM.hoist`, 2 × 300 ms), where it stays for the rest of the session with its numeral and its blocks visible; `ART.badgerHappy`; a fresh empty crate `ANIM.appear`s on the stand with the next order chalked on it. The badger stays at the counter run-up, which is where item *k+1* begins — it never teleports home (L2 PERSISTENCE, gate M3).
   - **The order does not match:** `tone("nudge")`; the counting-in has already run to its end; the enacted correction for that mistake plays at the crate (Rules); then the badger walks back to the crate station (`ANIM.walk`) with **every block still in the crate** — nothing is emptied, nothing is confiscated, no crate ever leaves the child's hands. The cost is the walk back, re-doable in the same breath (Device 3). Attempt 2.
7. **Attempt 3 — the show-me.** On a second wrong counting-in against the same order: `ART.ghostRod` × tens appear dashed in the rack and `ART.ghostCube` × ones dashed in the cups at their exact positions; blocks already correct sit on their ghosts; surplus blocks `ANIM.nudge` until they are taken back; and the **counter hatch** carries `ART.showRing` with `ANIM.showMe`. Filling the ghosts and presenting completes the item as solved-with-help (no praise pop; the crate still goes on the shelf). No attempt 4; the item always completes (F-46).
8. **Items 2-10.** Built from the level pools in Content by the Rules. The shelf keeps everything; the badger starts each item wherever it finished the last one.
9. **Finish** (after 10 items). **The shop open**, drawn at the same coordinates it held all session, so it is the world finished rather than a summary screen: `ART.shutter` rises out of view (`ANIM.shutterUp`), the door stands open, `ART.hedgehogIn` and `ART.ducklingIn` are inside at the counter with full baskets — the first change in their state since the first frame — and `ART.badgerHappy` is behind the counter at (556, 200) with `ANIM.celebrate`. The stock shelf carries all ten crates, each chalked with its order and each showing its own rods and cubes. `t("all_done")` at (360, 110), 52 px `THEME.colour.structure`. Zone H carries `makeButton play_again` at (250, 510) and `makeButton menu` at (470, 510); optional `t("question_x_of_y")` with n = first-try items at (360, 460). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

**Measured travel (GAME-DESIGN-LAW 2.2a — the load audit, reported not asserted).** Per item: two fetch walks ≈ 1.0 s, two barrow crossings ≈ 1.0 s, the commit walk ≈ 0.35 s, two tips ≈ 0.6 s → **≈ 3.0 s of traversal per item, ≈ 30 s across a ten-item session** of 6-7 minutes. The counting-in and its badges are a further ~2.5 s per item, but those are enacted correction, not travel, and GAME-DESIGN-LAW 3.0 forbids shortening them — see Risks.

## Art registry
```js
const ART = {
  /* the hero and his barrow */
  badgerIdle:   { kind: "svg", value: LCSArt.get("badger.idle"),  size: 96, fallback: "🦡" },
  badgerWalk:   { kind: "svg", value: LCSArt.get("badger.walk"),  size: 96, fallback: "🦡" },
  badgerLift:   { kind: "svg", value: LCSArt.get("badger.lift"),  size: 96, fallback: "🦡" },
  badgerTip:    { kind: "svg", value: LCSArt.get("badger.tip"),   size: 96, fallback: "🦡" },
  badgerHappy:  { kind: "svg", value: LCSArt.get("badger.happy"), size: 96, fallback: "🦡" },
  barrow:       { kind: "svg", value: LCSArt.get("barrow"), size: 148, w: 148, h: 56, fallback: "🛒" },

  /* the waiting party — Device 1; each drawn with its own basket */
  hedgehogWait: { kind: "svg", value: LCSArt.get("hedgehog.wait"), size: 96, fallback: "🦔" },
  hedgehogIn:   { kind: "svg", value: LCSArt.get("hedgehog.happy"), size: 96, fallback: "🦔" },
  ducklingWait: { kind: "svg", value: LCSArt.get("duck.chick.wait"), size: 96, fallback: "🐤" },
  ducklingIn:   { kind: "svg", value: LCSArt.get("duck.chick.happy"), size: 96, fallback: "🐤" },

  /* the shop — the destination band */
  shopWall:     { kind: "shape", shape: "roundRect", w: 560, h: 84, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },
  shelf:        { kind: "shape", shape: "rect", w: 456, h: 3, fill: "structure" },
  shelfCrate:   { kind: "shape", shape: "roundRect", w: 40, h: 44, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 5 },
  shelfNumeral: { kind: "text",  value: "", size: 15, font: "display", color: "structure" },
  miniRod:      { kind: "shape", shape: "rect", w: 3, h: 16, fill: "structure" },
  miniCube:     { kind: "shape", shape: "rect", w: 4, h: 4, fill: "surface", stroke: "ink", strokeWidth: 1 },
  door:         { kind: "shape", shape: "roundRect", w: 68, h: 86, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 6 },
  shutter:      { kind: "shape", shape: "rect", w: 68, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  step:         { kind: "shape", shape: "rect", w: 96, h: 3, fill: "line" },
  counterHatch: { kind: "shape", shape: "roundRect", w: 84, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },

  /* the crate — the place-value chart you walk up to */
  crate:        { kind: "shape", shape: "roundRect", w: 350, h: 148, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 16 },
  rodRack:      { kind: "shape", shape: "roundRect", w: 164, h: 116, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  cupTray:      { kind: "shape", shape: "roundRect", w: 144, h: 116, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  divider:      { kind: "shape", shape: "rect", w: 2, h: 116, fill: "line" },
  rod:          { kind: "shape", shape: "rect", w: 14, h: 84, fill: "structure", stroke: "ink", strokeWidth: 1 },   // nine hairline `line` notches 8.4 px apart
  cube:         { kind: "shape", shape: "rect", w: 12, h: 12, fill: "surface", stroke: "ink", strokeWidth: 1 },
  twine:        { kind: "shape", shape: "rect", w: 16, h: 3, fill: "inkSoft" },                                     // the band tied round a bundled ten

  /* the notation, on the object */
  orderChit:    { kind: "shape", shape: "roundRect", w: 116, h: 40, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 6 },
  orderNumeral: { kind: "text",  value: "", size: 40, font: "display", color: "ink" },
  tallyChalk:   { kind: "shape", shape: "roundRect", w: 34, h: 32, fill: "surface", stroke: "line", strokeWidth: 2, radius: 4 },
  tallyNumeral: { kind: "text",  value: "", size: 20, font: "display", color: "structure" },
  countTotal:   { kind: "text",  value: "", size: 40, font: "display", color: "structure" },

  /* the enacted corrections — the only two `accent` entries in the game */
  countBadge:   { kind: "shape", shape: "roundRect", w: 34, h: 20, fill: "accent", radius: 4 },                     // numeral 13 px display inkOnAccent on it
  digitHi:      { kind: "shape", shape: "roundRect", w: 30, h: 48, stroke: "accent", strokeWidth: 3, radius: 6 },
  emptyOnes:    { kind: "shape", shape: "roundRect", w: 144, h: 116, stroke: "structure", strokeWidth: 2, radius: 8 },  // dashed, lineDash [6,4]
  ghostRod:     { kind: "shape", shape: "rect", w: 14, h: 84, stroke: "structure", strokeWidth: 2 },                // dashed
  ghostCube:    { kind: "shape", shape: "rect", w: 12, h: 12, stroke: "ink", strokeWidth: 2 },                      // dashed
  showRing:     { kind: "shape", shape: "roundRect", w: 100, h: 88, stroke: "structure", strokeWidth: 4, radius: 14 },

  /* the yards */
  rodYard:      { kind: "shape", shape: "roundRect", w: 128, h: 128, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  onesBin:      { kind: "shape", shape: "roundRect", w: 128, h: 128, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  rodLabel:     { kind: "text",  value: "10", size: 26, font: "display", color: "structure" },
  cubeLabel:    { kind: "text",  value: "1",  size: 26, font: "display", color: "structure" },

  /* the floor */
  floorWash:    { kind: "shape", shape: "rect", w: 720, h: 140, fill: "surface2" }
};
```
**No `oops` pose exists**, on purpose: GAME-DESIGN-LAW 3.0 is stricter than the ART-BIBLE pose vocabulary — *the character is never the consequence*, and the reviewer check is literally *look at the wrong-answer screenshot; if the character's drawing changed, reject*. On every refusal the badger holds `ART.badgerIdle` and the apparatus does the reacting.

**Exactly two `accent` entries exist** (`countBadge`, `digitHi`) and they are never on screen at the same moment: the badges fade before the digit outline is drawn. The pre-pivot registry painted cubes `accent`, which would have put forty coral squares on one screen and broken ART-BIBLE §2 (*never large areas*); cubes are now `surface` with an `ink` outline, and rods and cubes differ by size AND shape AND notches AND fill, never by colour alone (§12). No red exists anywhere in the palette (ART-BIBLE §10.2), and nothing in this game needs it.

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the four tweens the instant-cut harness patches to duration 0, and no others */
  walk:       { duration: 500, ease: "Sine.InOut", trigger: "the badger container to a station (x set at call; 200 ms for the item-1 demonstration step)" },
  wheel:      { duration: 520, ease: "Sine.InOut", trigger: "the badger and the loaded barrow together to the crate station" },
  carryBack:  { duration: 520, ease: "Sine.InOut", trigger: "the badger and a taken-back load to its yard; the bundled rod across to the rack" },
  hoist:      { duration: 300, ease: "Sine.InOut", trigger: "the accepted crate to the hatch, then on to its shelf slot (x, y set at call; runs twice)" },

  /* the world's answer to a move */
  loadOn:     { duration: 220, ease: "Sine.Out",   trigger: "one rod or cube from a yard onto the barrow" },
  tipIn:      { duration: 300, ease: "Sine.InOut", trigger: "the barrow's load into a compartment; pieces seat one after another, 60 ms apart" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a compartment refusing a load; a surplus block during show-me" },
  bundle:     { duration: 500, ease: "Sine.InOut", trigger: "ten cubes glide to one point and are replaced by a rod (alpha swap over the last 100 ms)" },

  /* the enacted corrections — NOT traversal; never patched by the instant-cut harness */
  badgeIn:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5)" },
  chalk:      { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "a tally or the count total appearing (from alpha 0)" },
  pulse:      { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "a compartment, or the empty-ones outline, during a correction" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the order chit when the count agrees with it" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the fresh crate on the stand; ghost outlines (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the ring around the counter hatch during show-me (from alpha 0.2)" },

  /* finish only */
  shutterUp:  { y: "-=44", alpha: 0, duration: 700, ease: "Sine.Out", trigger: "the shutter rising once, at the finish" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the badger behind the counter on the Finish screen" }
};
```
No flashing: `showMe` cycles at 1 Hz, `pulse` at ≤ 1.7 Hz. Every `kind:"svg"` entry is wrapped in a container before any scale is tweened (ART-BIBLE §9.3 — tweening a raw `scale` on rasterised art renders it at double size with no error).

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed. Zones per MISSIONS.md 1.4.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T  0-56, chrome only
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌shop wall (330,104) 560×84──────────┐   ┌hatch┐   ┌door┐   │
      │  │ ▭ ▭ ▭ ▭ ▭ ▭ ▭ ▭ ▭ ▭  crates i:(66+44i,108)│ (556,104)│(664,101)│  zone W
      │  │ ──── shelf board y=132, x 44..500 ──┘   84×72  │ hedgehog+  │  56-420
      │  └──────────────────────────────────────┘         │ duckling   │
      │                                                    step y=146  │
      │  ┌rod yard┐   ┌── crate (360,232) 350×148 ──┐   ┌ones bin┐     │
      │  │ (88,250)│   │ [rack 164×116]│[tray 144×116]│   │(632,250)│    │
      │  │ 128×128 │   │  (281,230)    │  (449,230)   │   │128×128 │    │
      │  └─────────┘   │   9 rod slots │ 20 cups, 2×10│   └────────┘     │
      │                └───[chit "23" (360,306)]──────┘                 │
      │        tally(255,308)      total(360,352)     tally(465,308)    │
      │                                                                 │
      │   badger + barrow, feet y=410, stations x = 88·360·540·632      │
420   ├──────────────────────────────────────────────────────────────┤
      │            zone H — floorboards, NO CONTROLS                  │  zone H  420-560
      │            (Finish screen only: play_again 250,510 · menu 470,510)│
560   └──────────────────────────────────────────────────────────────┘
```
Rod slots: (209 + i × 18, 230), i = 0…8. Cups: (386 + (j mod 10) × 14, 214 + floor(j / 10) × 32), j = 0…19. Divider at x = 370. Barrow at (badger.x ± 74, 384), the sign chosen so it always faces the crate and never leaves the stage. Nothing is drawn in zone T but the picker, and nothing at all reports how many items are done.

## Visual specification
- Background `THEME.colour.bg`. One scene element only: `ART.shopWall` at (330, 104), a low-contrast `surface2` wash with a `line` edge (ART-BIBLE §4).
- **The shelf starts bare.** `ART.shelf` is drawn at tap one; no slots, holes, outlines or placeholders are drawn on it. Crate *i* appears only when it is earned, as `ART.shelfCrate` at (66 + i × 44, 108) with `ART.shelfNumeral` on its board and `ART.miniRod` × tens along its left half, `ART.miniCube` × ones along its right half.
- **The door and the party.** `ART.door` (664, 101); `ART.shutter` (664, 80) half down for the whole session; `ART.step` (664, 146); `ART.hedgehogWait` (634, 125) and `ART.ducklingWait` (676, 128), both static in every frame of every item. They are swapped for `ART.hedgehogIn` / `ART.ducklingIn` **only** on the Finish screen — never on a correct answer, which would make them an approval meter.
- **The crate.** `ART.crate` (360, 232); `makeTile` rod rack drawn with `ART.rodRack` at (281, 230) and `makeTile` cup tray with `ART.cupTray` at (449, 230); `ART.divider` at (370, 230). `ART.rod` and `ART.cube` at the positions above. A rod carries nine hairline `line` notches 8.4 px apart so its ten-ness is visible without counting cubes; a cube is a plain outlined square 12 × 12. `ART.twine` is drawn across each bundled ten during a regroup only.
- **The notation, on the object.** `ART.orderChit` (360, 306) with `ART.orderNumeral` centred; `ART.digitHi` sits over the tens digit at (344, 306) or the ones digit at (376, 306) during a correction, never both. `ART.tallyChalk` + `ART.tallyNumeral` at (255, 308) and (465, 308). `ART.countTotal` at (360, 352), drawn only from the first count badge of an item until that item completes.
- **Corrections.** `ART.countBadge` sits above each rod (rod centre + (0, −54)) and above each cube (cube centre + (0, −14)) as the count reaches it. `ART.emptyOnes` outlines the whole cup tray at (449, 230). `ART.ghostRod` / `ART.ghostCube` at the exact correct positions during show-me; `ART.showRing` around the counter hatch at (556, 104).
- **The yards.** `makeTile` with `ART.rodYard` (88, 250) drawing one `ART.rod` at (−22, 0) and `ART.rodLabel` at (+26, 0); `makeTile` with `ART.onesBin` (632, 250) drawing one `ART.cube` at (−22, 0) and `ART.cubeLabel` at (+26, 0). Selected uses the library's selected look (`structureSoft` fill, 3-px `structure` stroke) and persists until the other yard is tapped.
- **The hero.** The badger pose is swapped, never tweened: `badgerIdle` at rest and on every refusal, `badgerWalk` only while a traversal tween is running, `badgerLift` while loading or taking back, `badgerTip` during `ANIM.tipIn`, `badgerHappy` only when a count agrees and on the Finish screen. `ART.barrow` is redrawn at the badger's crate-facing side after every move.
- **Zone H** is `ART.floorWash` and nothing else during Play.
- **Colour.** Exactly two `accent` entries (`countBadge`, `digitHi`), never simultaneous, both geometric and both at least 120 px from the badger's bounding box. Everything else is `structure`, `surface`, `surface2`, `line` and `ink`. Meaning is never carried by colour alone: a rod is tall-and-notched, a cube is small-and-square, a set crate sits ON the shelf, a refused load stays ON the barrow.
- **Tap floors and gaps** as listed in World. Font sizes: order numeral 40 px, yard labels 26 px, tallies 20 px, shelf numerals 15 px (art, not copy; the 6-8 minimum of 24 px applies to words, §12).
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: the order is a bare numeral with **no currency symbol** (money is market-conditional and absent from Nordic curricula, F-29; the shop is a frame, not a money objective). `LOCALE_DATA` is not needed. Two game-specific strings only.

Orders as (tens; ones):
- **L1** (11-39, ones 1-5): 23 (2; 3) · 15 (1; 5) · 31 (3; 1) · 34 (3; 4) · 12 (1; 2) · 25 (2; 5)
- **L2** (40-79, any ones including 0): 47 (4; 7) · 60 (6; 0) · 58 (5; 8) · 72 (7; 2) · 40 (4; 0) · 66 (6; 6)
- **L3** (80-99, including 0 ones and "reversal traps" whose digits are both plausible): 83 (8; 3) · 90 (9; 0) · 97 (9; 7) · 88 (8; 8) · 91 (9; 1) · 79 (7; 9)

Play list: 10 items; start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled. **The shuffle must never place two orders with the same TENS digit next to each other** — L1's 31 and 34, L2's 47 and 40, L2's 60 and 66, L3's 90 / 97 / 91 and L3's 83 / 88. This is the fixed-world form of §13 (see Rules).

## Rules
- **Item count**: 10.
- **Difficulty progression**: after 2 consecutive first-try correct presentations, the next order comes from the next level up (cap L3). "First-try correct" = the first counting-in agreed with the chit AND no bundling was needed.
- **Adaptation**: a wrong counting-in, or a non-first-try on 2 consecutive items, moves the NEXT order one level down (floor L1). The current order is never abandoned.
- **Stuck cue (an inactivity hint, and deliberately motionless).** If 6 s pass with no tap, one target's stroke thickens from 2 px to 4 px in a single frame and holds — the rod yard when the crate is empty, the counter hatch when it is not — and returns to 2 px on the next tap. It is a **static** change and not a tween, precisely so the F-42 freeze assertion (`targets enabled ⇒ zero running tweens`, gate M2) stays true at every decision point of a driven session. Nothing about elapsed time is displayed; nothing ends.
- **What happens on a correct answer**: bundling if any, the counting-in with badges and rising tones, `ART.countTotal` equal to the order, `ANIM.pop` on the chit, `tone("correct")`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, `ANIM.hoist` twice to put the crate on the shelf, `ART.badgerHappy`, a fresh crate `ANIM.appear`s with the next order. The badger stays where it is.
- **What happens on a wrong answer** (per anticipated mistake, each re-staged against the crate):
  - **Digits swapped (4 rods, 3 cubes for 34)**: the counting-in runs to its end → `ART.countTotal` "43" beneath the chit's "34"; `ART.digitHi` on the tens digit while the ROD RACK `ANIM.pulse`s and its tally reads 4, then on the ones digit while the CUP TRAY pulses and its tally reads 3; `tone("nudge")`; the badger walks back to the crate with the blocks untouched.
  - **A load wheeled to the wrong compartment**: refused as it lands, `ANIM.nudge`, load retained, **no attempt counted** — the error never reaches a counting-in.
  - **Zero ones built with cubes or with extra rods (30 as 3 cubes, or 3 rods + 3 cubes)**: the counting-in; `ART.digitHi` on the "0"; `ART.emptyOnes` outlines the whole cup tray and `ANIM.pulse`s once.
  - **Too many or too few by one or two**: the counting-in; the compartment that is off `ANIM.pulse`s and its digit takes `ART.digitHi`; the total stands beneath the chit so the difference is read off two numerals in the same place.
  - **Ten or more cubes**: bundled with `ART.twine` and carried across to the rack BEFORE the counting-in; if the total then agrees, the item completes as solved-with-help.
  - **A tenth rod, a twenty-first cube, or a rod offered to a cup**: refused by the object with `ANIM.nudge`, no message, no attempt counted.
  - **Taking back**: a rod leaves whole, never in pieces.
- **Retry behaviour**: attempt 1 unaided → attempt 2 after the enacted correction → attempt 3 with the ghost arrangement and the ringed hatch; completing the ghosts is solved-with-help. No attempt 4.
- **Finish condition**: 10 orders on the shelf → Finish scene. There is no losing state and no way to end a session other than finishing; the only exits are Finish and Menu.
- **ANTI-BRUTE-FORCE GUARD — THE WHEEL-BACK** (the named replacement required of every framed spec by GAME-DESIGN-LAW §6, because P1's tile re-shuffle is impossible here: the yards, the crate and the counter are fixed furniture in a persistent shop, and a station that jumps when you knock on it destroys the world's constancy). Four parts, none of them a punishment:
  1. **Commitment is a walk, and the walk costs the full correction.** A guess is not a tap on a tile; it is the badger presenting the crate at the counter. The counting-in runs to its end with the world frozen, the mismatch is chalked, and only then does the badger walk back. Guessing buys nothing and spends the whole elaborated correction every time.
  2. **The answer space is open, not enumerated.** There are no candidates on screen. The order is one of ninety two-digit numbers and the crate can hold any of them, so there is nothing to try exhaustively. A random tapper loads noise, is refused by the crate's shape wherever the move is illegal, and arrives at the three-attempt ladder — which is the intended path and always completes the item (F-65, F-46).
  3. **First-try is forfeit on any wrong presentation**, and on a bundled tray as well. An item solved after help is recorded as solved-with-help, and the ladder above then sends the next order DOWN a level, so guessing makes the game easier-looking and teaches the child nothing they can ride.
  4. **Never the same tens digit twice running** — the fixed-world form of §13's "never the same slot twice running" (MISSIONS §6.3), enforced on the CONTENT list at shuffle time. A child cannot carry one rod-count across two orders and be right by inertia.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, and the praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. There is no `ok` key, because there is no Check tile.
- Game-specific strings (`STRINGS.en`, read through a local `S(key)`; all 11 locales authored at build time per §17):
  - `title` = "Opening Day"
  - `premise` = "Stock the shelf. Open the shop."
- **Text budget (F6, band 6-8 = ≤ 8 English words INCLUDING the premise):** 6 words, all of them on the Start screen. **The play surface carries zero authored words** — the only glyphs on it are numerals, which are notation, not copy (GAME-DESIGN-LAW 2.5: the abstract notation is visible in the same frame as the fiction at the moment of the answer). The pre-pivot spec's "Build the price" caption is deleted; the bare shelf and the shuttered door say it.

## Sound
`GameCore.tone` only (§11): `tone("tap", 10)` when a rod goes onto the barrow or seats in the rack and `tone("tap", 1)` for a cube, so a rod always sounds a bigger step than a cube; `tone("tap", k)` per badge during the counting-in, so the child hears the count climb 10, 20, 30, then 31, 32, 33 (F-213); `tone("tap", 10)` on each bundle; `tone("correct")` when the count agrees with the chit; `tone("nudge")` on a wrong counting-in, mellow and never a buzzer; `tone("finish")` once on the Finish screen. A refusal by an object carries no tone at all — the load staying on the barrow is the message. Silent under `?sound=off`; no audio files; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "Question 3 of 10", "All done!", "Play again", "Menu" and the praise pops; "Opening Day" and the premise change once translations are loaded; no currency symbol appears in any language.
- [ ] Works at narrow width: in a 400-px-wide iframe the shelf, the door with both animals, the crate with nine rod slots and twenty cups, both yards, the badger and the hatch are all visible, and **a full row of ten cups reads as a row** (the visual critic is asked this question specifically).
- [ ] Keyboard operable: Tab reaches the rod yard, rod rack, cup tray, ones bin and counter hatch in that order; Enter loads, delivers, takes back and presents. Every one of those five is driven by a REAL pointer in at least one assertion (§3.1 — a synthetic emit proves nothing).
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong counting-ins never end the session; the ghost arrangement and the ringed hatch always complete the item; a session driven with a wrong answer on every item still reaches Finish.
- [ ] **Mission (gate `check-mission.js`)**: M1 the goal (the door) is at a constant (664, 101) inside zone W all session and the badger's x changes on at least 9 of 10 items · M2 whenever any target is enabled the running tween count is zero (the stuck cue is static and must not break this) · M3 the badger's position at the start of item *k+1* equals its position at the end of item *k* · M4 `mission.progress` (crates on the shelf) never decreases across a session answered wrong every time · M5 no progress circles are drawn during Play.
- [ ] **Mutation (gate `mutate-mission.js`)**: strip `mission.hero` and `mission.goal` and the build must FAIL to complete an item — with no badger there is no `deliver()`, and with no counter hatch there is no commit.
- [ ] **Ratchet rule**: no block ever leaves the crate except by the child taking it back; a crate on the shelf is never removed, dimmed or re-opened; the shutter only ever goes up; nothing falls, spills, tires, empties, closes or leaves.
- [ ] **Instant-cut test (Test C)**: patch `walk`, `wheel`, `carryBack` and `hoist` to `duration: 0` and the item log must be BYTE-IDENTICAL — every load, refusal, bundle, badge, tally, correction and shelved crate unchanged — and the removed time must measure ≈ 30 s across a ten-item session.
- [ ] **The character is never the consequence**: screenshot every wrong state; if the badger's drawing differs from `badgerIdle`, reject the build.
- [ ] A load of rods wheeled to the cup tray is refused with the rods still on the barrow, and no attempt is counted.
- [ ] Tapping the rod rack with an empty barrow lifts out one WHOLE rod and wheels it to the rod yard; it is never possible to remove part of a rod.
- [ ] Building 43 for an order of 34 chalks "43" beneath "34", outlines the 3 while the rack pulses and its tally reads 4, then the 4 while the tray pulses and its tally reads 3.
- [ ] Placing 12 cubes and presenting binds ten of them with twine, carries the new rod across to the rack, and only then counts.
- [ ] An order ending in 0 built with cubes outlines the whole cup tray and the "0" on the chit.
- [ ] Two first-try corrects in a row bring bigger orders; a wrong counting-in brings smaller ones next; no two consecutive orders share a tens digit.
- [ ] The Finish screen asserts PROPERTIES, never a pixel match (MISSIONS R6): the shutter is up, ten crates stand on the shelf, and every crate's chalked numeral matches the blocks drawn on it.
- [ ] With `?sound=off` nothing is audible; with sound on, a rod sounds a bigger step than a cube and the counting-in climbs.

## Risks
1. **The verdict is a count, and it is declared rather than dressed.** The world owns the whole place-value structure and refuses every illegal move physically, but *"is this crate 34?"* is settled by counting-in against the chit. Every candidate for a both-directions physical predicate failed on a measurement or on the pedagogy (Mission, above). Read it as a Tier-C-style declared joint (MISSIONS §8.2) on a maths row and check it is not spreading.
2. **The 60-second ACT budget (MISSIONS R1) will fail this game, and probably every game with a real correction.** Traversal measures ≈ 3.0 s per item, ≈ 30 s a session, comfortably inside. But the counting-in and its badges are ~2.5 s per item on their own and GAME-DESIGN-LAW 3.0 forbids shortening them, so total ACT lands near 70-80 s. **`qa-game` must measure TRAVERSAL-ACT and CORRECTION-ACT separately and gate only the first**, or the two rules the contract holds most dear contradict each other in every build. Surfaced now rather than tuned away later.
3. **Two behaviours on one target.** Tapping the rod rack DELIVERS when the barrow is loaded and TAKES ONE BACK when it is empty. It is disambiguated by a visibly loaded or visibly empty barrow and taught by the item-1 demonstration (F-42 permits the first item of a new mechanic to demonstrate itself once, then fade). This must be proven by a real pointer in `local-test`, at 400 px, on a child-shaped path — never by a synthetic emit.
4. **Twenty cups at 14-px pitch.** The cups are legible but dense at the 400-px sweep width, and the two-rows-of-ten shape is load-bearing for misconception 3, so it cannot be thinned. The cups are not tap targets (the tray is), so tap floors are unaffected — but the visual critic must be asked specifically whether a full row of ten reads as a row at 400 px.
5. **Palette.** Cubes moved off `accent` because forty coral squares on one screen breaks ART-BIBLE §2. Coral is now spent only on `countBadge` and `digitHi`, which is what it is for.
6. **Art cost, and the standing rule that governs it.** Badger × 5 poses, barrow, hedgehog × 2, duckling × 2. `_tools/art-sheet.js` renders every new entry at 48 / 96 / 192 / 384 and **it is read personally before the visual critic is asked anything** — 48 px for the silhouette, 384 px for the honesty. A badger is a black-and-white animal in a palette with no black fill: its stripes are thin `ink` lines on `surface2` tints and they are the identity feature, so they must survive 48 px or it is a generic quadruped.
7. **Redundancy, to be re-run against the transformed design** (GAME-DESIGN-LAW §7 requires the fence be re-checked after framing). Nearest neighbours: 016 uses boxes-of-ten but its verb is COUNTING A GIVEN SET, not building one; 017 is teen pairs; 019 is the reverse direction (blocks → numeral, keypad, THE OPENING with a counterweight door), so every counterweight, gate and aperture has been kept deliberately out of this design; 020 owns the hundred square, which is why the tens/ones pair is NOT laid out as a 10 × 10 grid even though that is the one arrangement in which a hero's position could literally encode a two-digit number.
8. **Zone H is 140 px of floor.** Declared in World. If the critic calls it, the fix is to raise the walking line and deepen the shop band — never to invent a control to fill it.
9. **The title.** "Opening Day" is the mission in two words and localises cleanly (de *Eröffnungstag* · sv *Öppningsdagen* · pt *Dia da abertura*). The one thing to check with the native panels is that it does not read as a sports fixture in any of the eleven — and, per the standing rule, **the panels get the English as a SOURCE TO AUDIT, not as a target.**

## Deletion tests
**A — delete the maths.** Blank the order chit and make the counter accept whatever arrives. The crate now takes any load, so the rack's nine slots, the tray's twenty cups, the rod-will-not-fit-a-cup refusal and the whole counting-in have nothing to be about; the badger wheels arbitrary loads to a counter that always opens and the shelf fills by itself. There is no reason to fetch any particular number and no move that can be wrong. **Nothing playable survives.**

**B — delete the mission.** Remove the badger, the barrow, the yards, the crate, the counter, the shelf, the shutter and the two animals on the step. What is left is a numeral and two kinds of block with no transport, nowhere to be put, no compartment to choose between and no commit path at all — the badger is the only thing on the stage that can move a block and the hatch is the only commit. **Nothing playable survives.** (The pre-pivot spec fails this outright: delete its fox at (60, 120) and the tray, the two sources and the Check button are untouched.)

**C — delete the walking.** Patch `walk`, `wheel`, `carryBack` and `hoist` to `duration: 0`: the badger snaps between yard, crate and counter, the barrow's crossing is instant, the crate's run to the shelf is instant. Every load, refusal, bundle, count badge, chalked tally, correction and shelved crate is byte-identical and the item log diffs clean. **The session plays identically** — which is the pass condition (GAME-DESIGN-LAW 2.2a), and it is the proof that the travel carries MEANING (which yard, which compartment, which load) and never fills time. The removed time measures ≈ 30 s of a 6-7 minute session.
