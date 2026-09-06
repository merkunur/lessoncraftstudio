# 019 — Read the Rods

## Identity
- Slug: `read-the-rods`
- Subject / topic: Mathematics / reading a two-digit number from base-ten blocks (rods and cubes in a mixed arrangement)
- Age band: `6-8`
- Frame: THE OPENING
- Interaction pattern: `P11` — keypad entry (two-digit answers; physical keyboard digits also work)
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§17, with §7 replaced by the MISSION LAYOUT (`design/MISSIONS.md` §1.4) and §6's dot display removed from the play surface. Pattern contract: `catalogue/PATTERNS.md` P11. Frame contract: `design/MISSIONS.md` FRAME 3 — THE OPENING. Ruling: `design/GAME-DESIGN-LAW.md`. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Types the two-digit number shown by a set of ten-rods and one-cubes, even when the blocks are mixed up rather than sorted tens-then-ones, and even when there are ten or more cubes.
- Prerequisites: Reads and types numerals to 99; knows a rod is ten ones (games 016-018).
- Curriculum links: F-108 (digits as independent numbers; zero placeholder; de/nl/da inverted number words), F-102 (order reversal 12↔21, syntactic transcoding), F-50 (base-ten blocks), F-21, F-31 row "Place value tens/ones" — conservative 7-8 → 6-8 (US 1.NBT.B.2 / 2.NBT.A.1; England Y2 "recognise the place value of each digit"; Germany Klasse 2 "Stellenwerte"; France CE1 "dizaines et unités"; Netherlands groep 4; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3 "positionssystemet"; Finland grades 1-2).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Reading the blocks left to right as digits (a cube, then two rods, then a cube → "121" or "12").** Response: the shutter is set to one tall gate and two small hatches. One log beds in; **the second log drifts back down and lies in the yard**, and both billets pass. The world then freezes and the load sorts itself *at the wall* — every log glides to the tens row and every billet to the ones row (`ANIM.sortGlide`, one block at a time, 120 ms apart) — and counts itself 10, 20 then 21, 22 with `ART.countBadge`s that stay visible; the jamb numerals clear with `ANIM.nudge`. The sort now has a destination: the two rows it sorts into are the two rows the child had to open. The mixed arrangement is the point of L2+: the child must find the tens wherever they are.
  2. **Counting every block as one (2 rods + 3 cubes → "5").** Response: zero tall gates and five small hatches. **The two logs cannot enter a hatch at all** — a log is ten billets long and a hatch is one billet wide — so they set themselves back down in the yard while two hatches gape. Refused in both directions by the geometry, not by a verdict. Then the same sort-and-count at the wall; the logs' badges read 10, 20 — a rod is never "1". The log also carries its ten notches so the ten is visible.
  3. **Zero placeholder dropped (4 rods, no cubes → "4").** Response: "4" opens **zero tall gates and four small hatches**; four logs stand at a blank wall and four hatches gape. The count ends at "40" and the closed ones row is outlined dashed (`ART.emptyOnes`) with a "0" badge inside it (`ART.countBadge` "0") before the numerals clear. L3 includes rod-only sets. This correction also has a pre-commit twin the child causes themselves: typing "4" then "0" makes the four hatches walk up the wall into four tall gates while a fresh empty hatch row appears beneath them.
  4. **Ten or more cubes not regrouped (3 rods + 12 cubes → "312").** Response — **and the surface form of this error changes, which is flagged, not hidden.** The apparatus is two rows of nine, so the string "312" cannot be entered; the old spec deliberately accepted a third digit so the error could be made. The error is still fully makeable in the form the mathematics actually takes: the child sets three tall gates and then walks the ones row hunting for a tenth, eleventh and twelfth hatch — **and the row ends at nine**, which is exactly where the number system refuses too. They commit with three billets stranded in the yard; ten billets tie themselves into a log at the wall (`ANIM.bundle`), which takes the fourth tall gate, and the sorted set counts 10, 20, 30, 40, 41, 42. The diagnosis, the bundling and the enacted count are unchanged; only the typed string it starts from is different. *(The `CATALOGUE.md` row's "the display accepts three digits" line must be rewritten to match, not quietly kept.)*
  5. **Digit order reversed when typing (types 23 for 32 — F-102, and de/nl/da word order "zweiunddreißig").** Response: a reversal strands something in **both** rows at once — one log left lying in the yard **and** one hatch left black, one above the other, which is what a reversed pair of digits physically is. Then the sort-and-count writes 10, 20, 30 on the logs and 31, 32 on the billets in that order, and on the third attempt **the badger walks the answer**: the tens ledge first while the logs pulse, down the jamb stair, then the ones ledge while the billets pulse, the two jamb numerals writing themselves in that order (`ANIM.digitIn`). For the inverted-word-word locales the route is physically top-then-bottom every time, so the written order becomes something the body does rather than a rule to remember.

## Mission
**Mission, as the child would say it.** *Open the door wide enough to get the whole load in.*

**The want — one still frame showing a lack.** A jumbled load of ten-logs and billets lying in the cold yard on the left; a blank stone shutter on the right; and behind it, through the fanlight, a lit lamp and two young badgers in a store that is not yet full. The load is outside; it should be inside. No pixel needs to move and no word needs to be read for that to be legible. The single coral element on the screen is **the lamp** — the accent is the destination, which is ART-BIBLE §9.2's one warm highlight spent well.

**The hero.** A **badger** (roster, unused so far). It is a store-keeper, not a mascot: it works the two ledges of the shutter and **its position on them is the answer**. Poses `idle` · `walk` · `act` (a paw on the ledge lever) · `happy` (Finish only). It is outside in the yard for the whole session and goes inside exactly once, at the Finish.

**The waiting party (Device 1).** The lamp and the two cubs are drawn from tap one, at a fixed coordinate in zone W, and change **only** at the Finish. They never react to a correct answer, so they can never become an approval meter.

**The single state variable `S`.** *The shutter's setting: the ordered pair (T tall gates open, O small hatches open), T and O each 0-9, read off the badger's own work on the two ledges.*

- **Mathematical reading.** The two-digit number the child has claimed the load to be. T is the tens digit, O is the ones digit — and they are not the same kind of thing, which is the whole content of F-108. The two numerals are painted on the jamb stone, each level with its own row, so `S` is legible as a written numeral at every instant (the §2.5 integrated-notation rule, satisfied by construction rather than by a card).
- **Physical reading.** The size and shape of the opening in the store's door: T log-sized gates and O billet-sized hatches. An aperture with a shape, not a magnitude.

The goal is a predicate on `S` alone: *the slab rides up* if and only if every socket is filled and no block is left in the yard. **There is no `answer` field anywhere in the game.** The commit handler counts open gates and open hatches — that is, it reads the world — and then asks whether the load beds into it. `world.accepts(load, opening)`, never `tapped === item.answer`.

**The isomorphism — moving is solving.** *The number you say is the shape of the hole you make, and the load has to fit it exactly.*

The badger opens a socket **by walking over it**. A digit key sends it to that position on the ledge it is working, and the sockets swing open under its feet one at a time as it passes. So `answer = f(badger.ledge, badger.x)`: the transition on `S` is a walk, and the keypad is the badger's legs exactly as spec 120's keypad is the owl's cradle. Two things make the commit a fit rather than a verdict:

1. **A log will not go through a billet-hatch.** A ten-log is ten billets long; a hatch is one billet wide. Setting "5" for two logs and three billets does not produce a wrong-answer message — it produces two logs standing at a blank wall while three billets rattle through. *A rod is never a one* is refuted by geometry.
2. **A mismatch in either direction strands something, and both are visible in one still frame.** Under-open leaves a log lying in the yard. Over-open leaves a black hole in the wall. The slab rides up on a full, even bed of blocks; leftovers or gaps and it lifts a hand's breadth and settles back.

**The best moment in the design is a keystroke, not a commit.** With four logs and no billets the child presses "4" and gets **four small hatches**, because a single digit is ones. Then they press "0", and **the four hatches walk up the wall and become four tall gates while a fresh empty hatch row appears below them.** The place-value shift, caused by the child's own finger, on the apparatus, in about 400 ms — F-108 enacted rather than explained. Backspacing back down runs the shift in reverse, for free.

**The mark that stays (Device 2).** Every load that goes in becomes a permanent course of blocks on the store's shelves, seen through the fanlight, and nothing ever removes one. The store fills; the yard empties; the badger's distance to its own door shrinks. That is the whole progress display.

**Winter is a reason, not a clock.** The store is being stocked; that is why the load matters. Nothing in this world worsens with time — the lamp never dims, the yard never cools, the queue never grows, and no state anywhere decreases. A deadline dressed as weather is a banned shape (`MISSIONS.md` §5) and this game does not have one.

**Objective compliance.** The invariant objective — *types the two-digit number shown* — is met literally: the input is a digit keypad, and the number appears, 44 px, on the jamb beside the blocks it describes.

## World
Zone T (0-56) carries chrome only: the language picker at (16, 16). **Nothing else, and no dot display** — progress is diegetic (`MISSIONS.md` §1.4).

**Zone W (56-420) — THE WORLD.** The yard on the left and the store's front on the right, one saccade apart, in one frozen frame, with no camera movement at any point in the session (F3 of the F-42 gate).

*The yard (x 20-320, floor line y = 404).*
- **The current load** lies in 20 fixed positions in two rows: x = 44 + p × 28 (p = 0…9), row 1 at y = 268, row 2 at y = 356. A ten-log (`ART.rod`) stands vertically centred on its position; a billet (`ART.cube`) sits centred. Row-1 logs span y 228-308 and row-2 logs 316-396, so the rows never overlap and nothing crosses the floor line.
- **The queue of loads still to come:** twelve small stacks (`ART.queueStack`) along the yard's back wall at (34 + k × 22, 96), k = 0…11. One fades out as its load is tipped into the yard. **This is the item counter, and it is a thing in the world.**

*The store's front (x 340-700).*
- **The slab** (`ART.slab`) fills x 340-700, y 100-320.
- **Nine tall gates — the TENS row** (`ART.gate`, 26 × 76) centred at (352 + i × 36, 158) for i = 1…9, so x runs 375-689 and y 120-196. An open gate is a black opening; a filled one shows its log set flush.
- **Nine small hatches — the ONES row** (`ART.hatch`, 24 × 24) centred at (352 + i × 36, 266) for i = 1…9, spanning y 254-278.
- **The tens ledge** (`ART.ledge`) at y = 116, x 336-700. The badger stands centred at (352 + T × 36, 92).
- **The ones ledge** at y = 250, x 336-700. The badger stands centred at (352 + O × 36, 226).
- **The jamb stair** (`ART.jamb`) at x = 352 — position 0 on both ledges — links the two ledges and drops to the yard floor. Position 0 is the badger's rest post and the physical meaning of a zero digit.
- **The two numerals** (`ART.numeral`) on the jamb stone: tens at (318, 158), ones at (318, 266), each exactly level with its own row. The readout's layout **is** a place-value column.
- **The fanlight** (`ART.fanlight`), a permanent arched opening above the slab at x 350-690, y 62-96. Through it: the **lamp** (`ART.lamp`) at (368, 79) and the **two cubs** (`ART.cub`) at (394, 84) and (416, 84) — the waiting party, drawn from tap one; and the **store's three shelf lines** at y = 96, 84 and 72 running x 436-688, which fill with the blocks of every load brought in.
- **The doorway** (`ART.doorway`), x 400-620, y 228-320, revealed only when the slab rides up 92 px at the Finish.
- **The badger** (`ART.badger`, 48 px) on one of the two ledges, always.

**Zone H (420-560) — THE HAND. Two controls**, under the `MISSIONS.md` §5.1 reading (an instrument counts as one; candidates count individually): the keypad and OK. Twelve targets cannot sit in one row at the 6-8 tap floor on a 720 stage (12 × 56 + 11 × 12 = 804 against 688 usable), so the instrument takes two rows.
- **Row 1, y = 448:** digits 1-9, `makeTile` 56 × 56 at x = 88 + i × 68 (i = 0…8), so 88…632, gaps 12.
- **Row 2, y = 516:** backspace 56 × 56 at (200, 516); `0` 56 × 56 at (280, 516); **OK** as a 160 × 56 `makeTile` at (440, 516), drawn as the door-chain handle and labelled `t("ok")`, alpha 0.5 until at least one socket is open. Gaps 24 and 52; the bottom edge is 544, so the 16 px stage margin holds.

**Interactive-element budget (F-69):** the badger 1 + the keypad instrument 1 + OK 1 + the slab as the goal 1 = **4**. The gates and hatches are not tappable; they are opened by walking.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title `S("title")`, premise `S("premise")` beneath it): the badger (`ART.badger`) at (360, 210), Start, picker (hidden under `?embed=1`). Nothing auto-starts.
2. **The world builds (item 1, L1: 2 logs + 3 billets, sorted).** The Play scene draws zone W complete and frozen: the yard with the first load tipped in (`ANIM.tip`), eleven stacks still waiting at the back wall, the slab blank with every socket shut, the badger at the jamb on the ones ledge at (352, 226), the fanlight with the lamp lit and the two cubs behind it, and the shelves empty. The jamb numerals both read 0. OK sits at alpha 0.5. **Zero tweens run while a choice is open** (F1).
3. **The single sanctioned demonstration (item 1 only, F-42's own allowance and `MISSIONS.md` R4).** On arrival, once, unbidden: the badger walks out to position 2 on the ones ledge opening two hatches, two billets fly up and bed in, one hatch shuts as it walks back to the jamb, and everything returns to the opening state. About 1500 ms, then frozen. That single demonstration is how the child learns the one convention this world has — *the slab rides up on a full, even bed* — without a sentence.
4. **Working the shutter.** Each key press is one ACT, and the badger's walk **is** the input:
   - **The first digit `d` of an item:** the badger walks the ones ledge from the jamb to position `d`, and `d` hatches swing open under its feet, one at a time, ≈ 250 ms total (`ANIM.walk` + `ANIM.socketOpen`). The ones numeral now reads `d`.
   - **The second digit `e`:** the **shift** runs first — the `d` open hatches rise 108 px up the wall and widen into `d` tall gates, the badger rides up the jamb stair with them to position `d` on the tens ledge, and a fresh empty hatch row appears below (`ANIM.promote`, 300 ms). Then it comes back down the stair and walks the ones ledge to position `e`, opening `e` hatches (250 ms). Total ≈ 700 ms. The numerals now read `d` over `e`.
   - **Any further digit:** the badger walks along the ones ledge from where it stands to the new position, opening or shutting hatches as it passes. There is no third row, so the ones digit is simply revised.
   - **A tenth step:** the ones ledge ends at position 9 and the badger does not move past it. No sound, no message, no mark — the same no-punishment posture the old spec gave a fourth digit. **The apparatus's ceiling is nine because ten ones are a ten.**
   - **Backspace:** the badger walks back one position and that socket shuts. At position 0 of the ones row with the tens row promoted, one more backspace **un-promotes**: the tall gates drop back into hatches and the badger walks out onto them. The place-value shift, run backwards, by the child.
   - Physical keys 0-9, Backspace and Enter do exactly the same. `tone("tap")` on each key. OK enables as soon as any socket is open.
5. **Commit.** The child taps OK (or presses Enter). One ACT of ≈ 1000 ms, and **the badger stays on its ledge throughout — it never walks at the door and gets turned back.** The refusal happens entirely at the apparatus. The load rises and flies to the slab in a staggered flock (`ANIM.flock`, 400 ms), logs queueing at the tens row and billets at the ones row. **At the wall, every ten billets tie themselves into a log** (`ANIM.bundle`) and join the log queue — the normalisation is the world's rule, not the child's option. Then each block beds into a socket (`ANIM.bed`, 150 ms, staggered 60 ms).
   - **Correct — every socket filled, nothing left over (23 for 2 logs + 3 billets).** `tone("correct")`; the bedded blocks count themselves once anyway so the structure is shown on every success (F-43): logs 10, 20 with `ART.countBadge`s, then billets 21, 22, 23, rising tones. **The slab rides up 92 px** (`ANIM.lift`), the blocks slide off into the store and settle as a new course on the shelves (`ANIM.courseIn`), the slab settles back with its sockets shut, and the badger walks back to the jamb. `GameCore.showPraise(scene, key)` with the next praise key. The next stack fades out of the queue and its load is tipped into the yard (`ANIM.tip`). About 900 ms after the course lands, the world is frozen again on the next item.
   - **Wrong, too few opened (34 for 43).** `tone("nudge")`. Three logs bed in and **one log drifts back down and lies in the yard** (`ANIM.strand`); three billets bed in and **one hatch stays black**. The slab lifts 12 px and settles (`ANIM.settle`). Both faults are visible at once, one row above the other. Then the world freezes and the enacted correction plays at full length: the load sorts itself at the wall (`ANIM.sortGlide`), counts itself with badges that stay visible (`ANIM.badgeIn`), and the jamb numerals clear with `ANIM.nudge`. The sockets shut and the badger walks back to the jamb. Attempt 2 runs with the sorted, counted load in view.
   - **Wrong, too many opened (52 for 43).** Four logs bed in and **one tall gate stays black**; two billets bed in and **one billet lies in the yard**. Identical settle, identical correction. Over-guessing is refused by exactly the same fact as under-guessing, which is the property a rise-by-that-many gate does not have.
   - **Wrong again (attempt 2) — the show-me.** The same enactment, then: **the badger walks the answer.** It walks the tens ledge to T while the logs pulse (`ANIM.pulse`), drops down the jamb stair, walks the ones ledge to O while the billets pulse, and the two jamb numerals write themselves in that order (`ANIM.digitIn`). Held 1200 ms. It then walks back to the jamb, the sockets shut, the child re-sets the shutter themselves and taps OK, which now carries `ART.showRing` (`ANIM.showMe`). Solved-with-help; no praise pop. If the re-set is still wrong the answer walks itself again and waits — there is no attempt 4 and no way for the item to end unsolved.
6. **Re-queue (F-41).** An item wrong on the first OK re-enters the play list after 2 intervening items with its load re-mixed; the item count stays 12 (the re-queued item replaces the last unplayed item of the same level). It returns as a new load in the same yard, at the badger's current post — a stretch of work done twice, not a teleport.
7. **Items 2-12.** Built from the level pools in Content by the Rules. L1 loads are sorted (logs fill row 1 from p = 0, billets row 2 from p = 0); L2 and L3 loads are mixed — the R + C blocks take the first R + C positions of a shuffled order of the 20, so a log may stand between two billets.
8. **Finish** (after 12 loads). The store front stays at its play coordinates: the slab is up, **the doorway is open, and the badger is inside with the two cubs and the lamp** (`ANIM.celebrate`) — the one time in the session it leaves the ledges, and the only change the waiting party ever makes. The yard is bare and the queue is gone. The shelves are full. Over the emptied yard: `t("all_done")` at (170, 96), 44 px `THEME.colour.structure`, and the twelve loads as chips (`ART.numberChip`, 64 × 36) in two columns of six at x = 106 and x = 234, y = 150 + r × 42 (r = 0…5), each with its blocks beside it (`ART.miniRod` × tens, `ART.miniCube` × ones) and `ART.dotFull` (first-try) or `ART.dotEmpty` (helped) at its left — a record of what was read unaided, not a score. `makeButton play_again` at (240, 512), `makeButton menu` at (480, 512). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 6 minutes: 12 loads × (set the shutter + commit + count ≈ 25-35 s). Traversal ACT is ≈ 2 s per item (two ledge walks plus the commit), so ≈ 24 s per session against the 60 s budget.

## Art registry
```js
const ART = {
  badger:     { kind: "emoji", value: "🦡", size: 48 },   // built: LCSArt "badger.idle|walk|act|happy", ART-BIBLE §3; grey inkSoft tints, surface2 face stripes, ink mask — no accent anywhere on this character
  cub:        { kind: "emoji", value: "🦡", size: 26 },   // built: LCSArt "badger.cub"; two of them, static all session
  lamp:       { kind: "shape", shape: "ellipse", w: 20, h: 26, fill: "accent", stroke: "ink", strokeWidth: 2 },   // THE ONE accent entry in this game
  rod:        { kind: "shape", shape: "rect", w: 16, h: 80, fill: "structure", stroke: "ink", strokeWidth: 2 },   // nine hairline bg notches 8 px apart: the ten is countable
  cube:       { kind: "shape", shape: "rect", w: 18, h: 18, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  slab:       { kind: "shape", shape: "roundRect", w: 360, h: 220, fill: "surface2", stroke: "line", strokeWidth: 3, radius: 10 },
  gate:       { kind: "shape", shape: "rect", w: 26, h: 76, fill: "ink", stroke: "structure", strokeWidth: 2 },    // open = ink opening; shut = surface2 fill
  hatch:      { kind: "shape", shape: "rect", w: 24, h: 24, fill: "ink", stroke: "structure", strokeWidth: 2 },
  ledge:      { kind: "shape", shape: "rect", w: 364, h: 6, fill: "structure" },
  jamb:       { kind: "shape", shape: "rect", w: 24, h: 300, fill: "surface2", stroke: "line", strokeWidth: 2 },   // the stone at x 352 with the stair treads drawn as inkSoft hairlines
  fanlight:   { kind: "shape", shape: "arc", w: 340, h: 34, fill: "bg", stroke: "line", strokeWidth: 2 },
  doorway:    { kind: "shape", shape: "roundRect", w: 220, h: 92, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 8 },
  shelfRod:   { kind: "shape", shape: "rect", w: 3, h: 10, fill: "structure" },
  shelfCube:  { kind: "shape", shape: "rect", w: 3, h: 3, fill: "structure" },
  queueStack: { kind: "shape", shape: "roundRect", w: 16, h: 20, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 3 },
  yardFloor:  { kind: "shape", shape: "line", w: 300, h: 2, stroke: "line", strokeWidth: 2 },
  numeral:    { kind: "text",  value: "0", size: 44, font: "display", color: "ink" },
  countBadge: { kind: "shape", shape: "roundRect", w: 34, h: 20, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },   // numeral 13 px display structure
  emptyOnes:  { kind: "shape", shape: "roundRect", w: 330, h: 34, stroke: "inkSoft", strokeWidth: 2, radius: 8 },   // dashed; drawn over the shut ones row for a rod-only load
  key:        { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 28 px display ink
  backGlyph:  { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  okTile:     { kind: "shape", shape: "roundRect", w: 160, h: 56, fill: "structure", stroke: "ink", strokeWidth: 2, radius: 14 },  // label t("ok") 24 px display bg
  showRing:   { kind: "shape", shape: "roundRect", w: 176, h: 72, stroke: "structure", strokeWidth: 4, radius: 20 },
  numberChip: { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniRod:    { kind: "shape", shape: "rect", w: 4, h: 18, fill: "structure" },
  miniCube:   { kind: "shape", shape: "rect", w: 4, h: 4, fill: "structure" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. **Exactly one `accent` entry** (`lamp`), per ART-BIBLE §9.2 — one grep, one number. Logs and billets differ by size AND shape AND notches, never by colour. `ART.dotEmpty` / `ART.dotFull` exist for the Finish record only and are never drawn during play.

## Animation registry
```js
const ANIM = {
  walk:       { duration: 250, ease: "Sine.InOut", trigger: "badger container to (352 + n × 36, ledgeY) — the input itself; x set at call" },
  climb:      { duration: 200, ease: "Sine.InOut", trigger: "badger container up or down the jamb stair between y 226 and y 92" },
  promote:    { y: "-=108", duration: 300, ease: "Back.Out", trigger: "the open hatches rise and widen into tall gates (w 24→26, h 24→76 on the same tween); a fresh empty hatch row fades in beneath" },
  socketOpen: { alpha: 1, duration: 90, ease: "Sine.Out", trigger: "one gate or hatch as the badger passes over it (from alpha 0)" },
  socketShut: { alpha: 0, duration: 90, ease: "Sine.In", trigger: "one socket on a backspace step, and every socket after a commit" },
  tip:        { alpha: 1, scale: 1, duration: 260, ease: "Back.Out", trigger: "the next load arriving in the yard (from alpha 0, scale 0.6)" },
  flock:      { duration: 400, ease: "Sine.InOut", trigger: "each block from the yard to its queue position at the wall, 40 ms apart; x, y set at call" },
  bed:        { duration: 150, ease: "Back.Out", trigger: "one block settling flush into its socket, 60 ms apart" },
  strand:     { duration: 320, ease: "Sine.InOut", trigger: "a block that found no socket drifting back down to a free yard position; x, y set at call" },
  lift:       { y: "-=92", duration: 420, ease: "Sine.Out", trigger: "the slab riding up on a full, even bed" },
  settle:     { y: "-=12", duration: 260, ease: "Sine.InOut", yoyo: true, trigger: "the slab lifting a hand's breadth and settling back when the bed is not full" },
  courseIn:   { alpha: 1, duration: 300, ease: "Sine.Out", trigger: "a solved load's blocks appearing on the store shelves (from alpha 0); never removed" },
  sortGlide:  { duration: 220, ease: "Sine.InOut", trigger: "each block to its sorted place at the wall, 120 ms apart: logs to the tens row, billets to the ones row; x, y set at call" },
  bundle:     { duration: 500, ease: "Sine.InOut", trigger: "ten billets glide together at the wall and are replaced by a log (alpha swap over the last 100 ms)" },
  badgeIn:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5); they stay" },
  digitIn:    { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a jamb numeral changing, and the show-me numerals (from alpha 0, scale 0.6)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the two jamb numerals after a refused fit, then they clear" },
  pulse:      { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the log group while the tens digit builds; the billet group while the ones digit builds; and the two numerals on the stuck cue" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the badger on the Finish screen only" }
};
```
No flashing: `showMe` cycles at 1 Hz; the show-me numerals appear once each. Every entry above is a **consequence of a tap** and runs only inside an ACT; nothing loops or breathes while a choice is open. Per ART-BIBLE §9.3, any `kind:"svg"` art is wrapped in a container and the container is tweened.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed. Progress is the emptying yard, the filling store and the badger's own distance to its door; there is no abstract progress display on the play surface.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  n n n n n n n n n n n n  loads waiting  y=96                 │
      │                    .--- fanlight x350-690 y62-96 ---.         │
      │                    | (lamp)(cub)(cub)   ==== shelves |        │
      │                    +----------------------------------+       │  zone W
      │  | . | | .   row1 y=268    ==== tens ledge y=116 ==========    │  56-420
      │              (badger)      [][][][][][][][][] gates  y=158    │
      │  . | . . |   row2 y=356    ==== ones ledge y=250 ==========    │
      │                            [][][][][][][][][] hatches y=266   │
      │ ------------- floor y=404   jamb x=352   numerals x=318        │
420   ├──────────────────────────────────────────────────────────────┤
      │  [1][2][3][4][5][6][7][8][9]        y=448  x=88+i*68          │  zone H
      │        [BK]  [0]        [    OK    ]  y=516                   │  420-560
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `|` a ten-log, `.` a billet, `[]` a socket, `n` a load still waiting, BK backspace. Yard positions x = 44 + p × 28 (p = 0…9), row 1 y = 268, row 2 y = 356; a load of R logs and C billets takes the first R + C positions of a shuffled order of the 20 at L2/L3, and the sorted order at L1.

## Visual specification
- Background: `THEME.colour.bg`. One scene wash only: the store front (`ART.slab` on `THEME.colour.surface2`) with `ART.yardFloor` at y = 404 across x 20-320.
- **The load.** `ART.rod` / `ART.cube` at their yard positions; a log's nine notches are hairlines in `THEME.colour.bg`, 8 px apart, so the ten can be counted at 400 px.
- **The waiting loads.** Twelve `ART.queueStack` at (34 + k × 22, 96); one fades out per solved load, never back in.
- **The shutter.** `ART.slab` centred (520, 210); `ART.gate` × 9 at (352 + i × 36, 158); `ART.hatch` × 9 at (352 + i × 36, 266); `ART.ledge` at y = 116 and y = 250 across x 336-700; `ART.jamb` at x = 352 from y 92 to y 404 with its stair treads as `THEME.colour.inkSoft` hairlines. A shut socket is `THEME.colour.surface2` flush with the slab; an open one is `THEME.colour.ink`; a filled one carries its block drawn inside it.
- **The readout.** `ART.numeral` twice on the jamb stone: tens at (318, 158), ones at (318, 266), 44 px `THEME.font.display` `THEME.colour.ink`, each level with its own row so the pair reads as a place-value column. `ART.emptyOnes` is drawn across the shut ones row (centred 520, 266) with a "0" `ART.countBadge` inside it during a rod-only correction.
- **The store.** `ART.fanlight` at x 350-690, y 62-96; `ART.lamp` at (368, 79) — the single coral element on the screen, and it is the destination; `ART.cub` at (394, 84) and (416, 84). Three shelf lines at y = 96, 84, 72 running x 436-688. A solved load's blocks pack from the LOWEST shelf, left to right from x = 436 at pitch 4, logs first (`ART.shelfRod`, bottom on the line) then billets (`ART.shelfCube`), wrapping to the next shelf up at x = 436 when the next block would pass x = 688, with a 6 px gap before the following load. Capacity 3 × 63 = 189 marks against a worst case of 109 blocks plus eleven gaps.
- **The hero.** `ART.badger` 48 px, centred at (352 + T × 36, 92) on the tens ledge or (352 + O × 36, 226) on the ones ledge; pose `idle` while frozen, `walk` while travelling, `act` for the paw-on-the-lever beat as a socket opens, `happy` on the Finish screen only. Its state never changes on a wrong answer.
- **The doorway.** `ART.doorway` centred (510, 274), drawn only when the slab has ridden up at the Finish.
- **The hand.** Eleven `ART.key` tiles as `makeTile` 56 × 56 (digits 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`) and `ART.okTile` 160 × 56 at (440, 516) labelled `t("ok")` 24 px `THEME.font.display` on `THEME.colour.bg` (never white on coral, and this tile is teal in any case). OK sits at alpha 0.5 while every socket is shut; `ART.showRing` surrounds it during show-me.
- **Tab order:** keys 1-9 in reading order, backspace, 0, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter (BUILD-CONVENTIONS P11).
- **The Finish record** uses `ART.numberChip`, `ART.miniRod`, `ART.miniCube`, `ART.dotFull` and `ART.dotEmpty`, laid out in How it plays §8. None of those five is drawn during play.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral on the play surface: the abstract notation is two numerals on the jamb and there is **no prose in zone W or zone H at all**. `LOCALE_DATA` is not needed; number words never appear.

Loads as (logs; billets = the number; layout):
- **L1** (sorted; 1-4 logs, 1-5 billets): (2; 3 = 23) · (1; 4 = 14) · (3; 1 = 31) · (4; 5 = 45) · (1; 2 = 12) · (3; 6 = 36)
- **L2** (mixed; 2-7 logs, 1-9 billets): (2; 7 = 27) · (5; 2 = 52) · (6; 8 = 68) · (7; 3 = 73) · (4; 1 = 41) · (5; 9 = 59)
- **L3** (mixed; rod-only loads and loads with ten or more billets): (4; 0 = 40) · (3; 12 = 42) · (7; 0 = 70) · (2; 15 = 35) · (9; 0 = 90) · (5; 11 = 61)

Every load is at most 17 blocks, so all twenty yard positions are never needed and no block is ever drawn outside the yard. Play list: 12 loads with re-queue (How it plays §6); start at L1; shuffle within the level without repeats; the level changes per Rules; if a pool is exhausted it is reused reshuffled with the load re-mixed. Two consecutive loads never share a number, and — the fixed-world form of BUILD-CONVENTIONS §13 — never the same (T, O) setting twice running.

## Rules
- **Item count:** 12 (including re-queued repeats, which replace unplayed items). The twelve waiting stacks on the yard's back wall are that number, drawn.
- **Difficulty progression:** after 2 consecutive first-try correct answers, the next load comes from the next level up (cap L3). "First-try correct" = the first OK produced a full, even bed.
- **Adaptation:** a refused fit on a load, or wrong first-try on 2 consecutive loads, moves the NEXT load one level down (floor L1). The current load is never abandoned; a missed load re-queues after 2 loads with its blocks re-mixed.
- **Anti-brute-force guard — THE SHUTTER MIRRORS, IT NEVER GRADES.** P1's tile re-shuffle is unavailable here and unwanted: the ledges are fixed for the whole session and their constancy is what makes the wall a place — a station that jumps when you knock on it destroys the world's constancy. The replacement guard is that **the apparatus shows the child's own claim and gives zero comparative signal until commit.** Opening four gates tells the child that they said four; nothing tells them whether four is right. There is no "too heavy / too light" channel to bisect, which is exactly why the counterweight and balance versions of this world were rejected. Three supports underneath it: the answer space is the 90 two-digit values rather than N tiles, so a random setter reaches the show-me ladder on essentially every load (F-65); commitment is a one-way door — a load wrong on the first OK never counts as first-try, and walking the badger back does not un-commit; and **the load varies per item while the positions never do** — the candidate set moves, the world does not. One channel is open by design and must not be closed: a child may count their four open gates against four logs in the yard before committing. That is one-to-one correspondence between rods and tens-places, which is the objective of the game, and it requires reading the load correctly.
- **Stuck rule (an inactivity cue, and the one declared exception to F1):** if 8 s pass with no key pressed, the two jamb numerals `ANIM.pulse` once; repeats every 8 s. This is motion while a choice is open, it is inherited from the old spec and BUILD-CONVENTIONS §8, and it is declared here so `check-mission.js` M2 whitelists it rather than a builder discovering it. Nothing about elapsed time is shown; nothing ends.
- **What happens on a correct answer:** the flock beds in with nothing stranded and no socket left black; `tone("correct")`; the blocks count themselves once with badges and rising tones (F-43, F-213); the slab rides up (`ANIM.lift`); the load slides into the store and becomes a permanent course on the shelves (`ANIM.courseIn`); the slab settles with its sockets shut; the badger walks back to the jamb; `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation; one waiting stack fades from the queue and the next load is tipped in.
- **What happens on a wrong answer (per anticipated mistake).** In every case: `tone("nudge")`, the slab lifts a hand's breadth and settles, the world freezes, the enacted correction plays at full length, the sockets shut and the badger walks back to the jamb. **Nothing is lost, nothing decays, no state anywhere decreases, and the badger's pose does not change.**
  - **Blocks read as digits in the order seen (12 for a billet-log-log-billet load worth 22):** one log strands in the yard, both billets pass; then the sort-and-count 10, 20, 21, 22 with badges that stay.
  - **Every block counted as one (5 for 2 logs + 3 billets):** the two logs will not enter a hatch at all and set themselves back down; two hatches gape; then the sort-and-count, the logs' 10, 20 badges carrying the information.
  - **Zero dropped (4 for 4 logs):** four logs at a blank wall, four hatches gaping; the count ends at 40 and `ART.emptyOnes` outlines the shut ones row with a "0" badge.
  - **Billets not regrouped (three billets stranded for 3 logs + 12 billets):** ten billets `ANIM.bundle` into a log at the wall first and take the fourth tall gate; then the count 10, 20, 30, 40, 41, 42.
  - **Digits reversed (34 for 43):** one log in the yard AND one hatch black, simultaneously, one row above the other; then the sort-and-count, and on attempt 3 the badger walks the answer tens ledge first.
  - **A tenth step on a ledge:** the badger does not move. No sound, no mark, no message.
- **Retry behaviour:** attempt 1 unaided → attempt 2 with the sorted, counted load in view → attempt 3 the badger walks the answer and the numerals write themselves, then the child re-sets the shutter with the ringed OK; solved-with-help. There is no attempt 4 — a still-wrong setting simply makes the answer walk itself again until it is entered. **Success is certain and the ladder always completes.**
- **Finish condition:** 12 loads in the store → the Finish state (How it plays §8). No losing state exists anywhere; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is deliberately **not** used: the twelve waiting stacks are the count.
- Game-specific strings (`STRINGS.en`, read via `S(key)`; the build ships all 11 locales per BUILD-CONVENTIONS §17):
  - `title` = "The Winter Door"
  - `premise` = "Fit the load in."
- **Text budget (F6 of the F-42 gate): 7 English words total, including the mission premise**, against the 6-8 band's ceiling of 8. Both strings live on the Start screen. **The play surface carries no prose at all** — only the two jamb numerals and the count badges, which are integrated notation rather than copy (§2.5). Every text box is designed for 1.6 × the English width.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on each key press; `tone("tap", k)` per badge during a self-count (k = the tens count for logs — a big step per log — then one step per billet, F-213); `tone("tap", 10)` on a bundle at the wall; `tone("correct")` when the slab rides up; `tone("nudge")` when it settles back (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show, and no sound is the only signal of a refusal — the stranded log and the black socket are.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, OK, "All done!", "Play again", "Menu" and the praise pops; "The Winter Door" and "Fit the load in." change once translations are loaded.
- [ ] Works at narrow width: in a 400-px-wide iframe the yard, the two socket rows, both jamb numerals, all eleven keys and OK are visible and separate, and a log's ten notches are still countable.
- [ ] Keyboard operable: Tab walks the keys then OK; Enter taps; physical digit keys walk the badger, Backspace steps it back, Enter commits.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: a refused fit never ends the session; after two refusals the badger walks the answer and re-setting the shutter completes the load.
- [ ] **The mission is load-bearing (Deletion 2):** `mutate-mission.js` removes `mission.hero` and `mission.goal` and the game **cannot complete a single load** — the gates were the only commit path, so there is nothing left for the keypad to drive.
- [ ] **The maths is load-bearing (Deletion 1):** give every block the same value and every setting of the shutter admits the load, so there is nothing to decide.
- [ ] **The instant-cut test (Deletion 3):** patch every **traversal** tween (`walk`, `climb`, `flock`, `bed`, `strand`, `lift`) to `duration: 0` and the same loads pass and fail in the same order — the `qa-game` item log is byte-identical. The enacted corrections (`sortGlide`, `bundle`, `badgeIn`, `pulse`) are **excluded** from this patch: they are elaborated feedback, not travel, and cutting them would delete the teaching.
- [ ] **The ratchet rule:** driven with a wrong answer on every load, no shelf course is ever removed, no waiting stack ever returns, the lamp never dims and nothing in the world decreases.
- [ ] **The character is never the consequence:** on the wrong-answer screenshot the badger's pose, position and expression are unchanged; only the apparatus changed.
- [ ] **Freeze (F1):** at every decision point of a full session, if any target is enabled the running tween count is zero — except the declared 8 s stuck cue on the jamb numerals.
- [ ] Pressing 4 opens four small hatches and the ones numeral reads 4; pressing 0 then makes those four hatches walk up the wall into four tall gates, the tens numeral reads 4 and a fresh empty hatch row appears below.
- [ ] Backspace at position 0 of the ones row un-promotes: the tall gates drop back into hatches and the badger walks out onto them.
- [ ] The ones ledge ends at nine: a tenth step moves nothing, makes no sound and leaves no mark.
- [ ] Setting 34 for a load worth 43 leaves one log lying in the yard AND one hatch black at the same time, then the load sorts and counts 10, 20, 30, 40, 41, 42, 43.
- [ ] For 3 logs and 12 billets, ten billets tie into a log at the wall and take a fourth tall gate before the count runs.
- [ ] For a load of only 4 logs, setting 4 leaves four logs at a blank wall and the count ends at 40 with a dashed empty ones row and a "0" badge.
- [ ] A missed load comes back two loads later with its blocks re-mixed, in the same yard, at the badger's current post.
- [ ] Two first-try corrects in a row bring mixed loads, then loads with ten or more billets; two misses in a row bring sorted loads.
- [ ] Progress is diegetic: the yard's waiting stacks shrink to none and the store's shelves fill; there is no abstract progress display anywhere on the play surface.
- [ ] The finish screen shows the badger inside the open doorway with the two cubs and the lamp, and lists twelve numbers with their blocks, a filled dot for first-try loads and a hollow dot for helped ones; no score, no elapsed time.
- [ ] With `?sound=off` nothing is audible.

## Declared exceptions and risks
1. **The §4.1 world-layer exemption is mis-scoped, and this game takes the frame anyway.** `GAME-DESIGN-LAW.md` §4.1 exempts "the 9 P11 keypad games", and 019 is one of them — but the stated ground is *retrieval density at 8-9* (F-2: a child practising tables does not want a walk between questions). This game is 6-8 at 25-35 s per load, the opposite of high-density retrieval, and `MISSIONS.md` §3 assigns it THE OPENING by name with a worked example while §6.1 gives its P11 sibling 120 a full framed transformation. The two documents contradict each other. The frame is taken; the catalogue pass should re-scope the exemption to retrieval-fluency games (010, 049, 050, arguably 182) rather than to a pattern.
2. **Two-digit values cannot be one positional axis on this stage, and that is a hard geometric fact.** 99 units across zone W's 364 px is 3.7 px per unit; at a 400 px display that is sub-pixel, so 41 and 42 would be indistinguishable. Every single-extent version of this game — a counterweight gate, a leap runway, a 99-rung ladder — dies on that arithmetic. The Displacement rule is therefore satisfied in **two registers**, which is not a workaround but the content: a two-digit number is not a length, it is ten of these and some of those.
3. **`MISSIONS.md`'s own sketch for 019 has an over-supply hole.** "Type the number and the door rises by that many units" refuses an under-guess beautifully and rewards an over-guess, because a gate that clunks up to its stops is open and the hero walks through. The socket design exists to close that: over-open leaves a black hole and the slab will not ride.
4. **The wedge convention is learned, not innate.** *The slab rides up only on a full, even bed* is the one rule of this world a child must pick up. It is legible in both directions in a still frame — a log in the yard, a hole in the wall — but it needs the single sanctioned demonstration on item 1 (How it plays §3), which F-42 permits verbatim.
5. **Persistence (L2) is read as "the store persists, the instrument returns to zero".** The badger walks back to the jamb as the last beat of each load's closing ACT, so its position at the start of load *k+1* equals its position at the end of load *k* and M3 holds literally. What persists across the session is the world — the shelves, the shrinking queue, the open doorway — not the door's setting. An instrument returns to zero; a store does not empty. At 6-8, starting each load from a known zero on a two-row apparatus is also a real working-memory saving.
6. **The ACT meter must exclude enacted corrections.** Traversal is ≈ 2 s per load, ≈ 24 s per session, well inside M6's 60 s. An enacted correction costs 2.5-4.5 s (bundle, sort, up to eighteen badges at 250 ms apart), so a wrong-heavy session crosses 60 s easily. If `qa-game`'s ACT meter counts correction time it will push a builder to cut elaborated feedback to pass a traversal budget — the most expensive thing in the corpus to break (EF 0.49 against KR 0.05). R1 in `MISSIONS.md` §8.3 should say so.
7. **The shelf record is a texture of accumulation, not twelve countable numbers.** At 3 px per mark the store reads as *how much is in* at a 400 px display, which is what a filling store looks like; the individually countable record lives on the Finish screen. A critic sweeping the play screen should not expect to read it.
8. **Redundancy with 018, its inverse.** 018 is a shop with a tray where the child **places blocks** to build a number; 019 is a door where the child **declares a quantity and the load places itself** — the child never touches a block here. That is a checkable difference, but both will end up with rods, cubes and a container, so `check-redundancy.js` must be re-run against the **transformed** 018 when it lands, not against its current spec.
9. **`MISSIONS.md` §6.1's keypad row does not fit a 720 stage.** Twelve tiles at pitch 62 from x = 50 ends at 732, using 52 px tiles below this band's 56 px floor. This spec uses two rows instead; §6.1 is worth correcting there before three more games copy it.
10. **Untested with children, like everything in this pivot.** Every claim above about how a six-year-old reads a black hole in a wall is a design judgement. The fox passed every gate three times and was rejected on sight. This should ship to the local link and be watched, not assumed.
