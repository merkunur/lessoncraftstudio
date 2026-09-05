# 131 — Compare Two-Digit

## Identity
- Slug: `compare-two-digit`
- Subject / topic: Mathematics / comparing two two-digit numbers with > < = (tens first, then ones)
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (a three-position stepper that turns the crocodile mouth) with a Check
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form). Content is language-neutral (numerals, rods, cubes, symbols); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Sets the comparison symbol (> < =) between two two-digit numbers by comparing the tens first and the ones only when the tens are equal, and checks it.
- Prerequisites: Reads two-digit numerals to 99; knows a rod is ten ones (games 016-019); has compared single-digit sets (game 013).
- Curriculum links: F-1 (compare/order numbers in 9 of 15 sources), F-21 ("comparing/ordering quantities" and "place value tens/ones" in all twelve systems), F-108, F-31 row "Place value tens/ones (teens)" — conservative 7-8 → 6-8 (US 1.NBT.B.3 "compare two two-digit numbers based on meanings of the tens and ones digits, recording the results with > = <"; England Y2 "compare and order numbers from 0 up to 100; use < > and = signs"; Germany Klasse 2 "Zahlen bis 100 vergleichen"; France CE1 "comparer, ranger des nombres < 100"; Netherlands groep 4 "getallen tot 100 vergelijken"; Spain 1º ciclo "comparación de números"; Brazil EF02MA01; Sweden åk 1-3 "naturliga tal … jämföra"; Finland grades 1-2 "lukujen vertailu").
- Common misconceptions (F-103, F-108), each with this game's response:
  1. **Comparing the ones digit (or the bigger single digit) instead of the tens: 39 > 51 "because 9 is more than 1".** Response: on a wrong Check the ones cubes of BOTH numbers fade to alpha 0.25 and the rods slide together into two side-by-side rod columns under the numbers (`ANIM.rodsAlign`), each column badged with its tens value (`ART.tensBadge` "30" / "50"); the taller column pulses. The tens are compared FIRST, visibly, before anything else — the child re-sets the mouth with the tens in view.
  2. **Reading the number as digits (reversed: 36 read as 63 — F-108, and de/nl/da spoken order "sechsunddreißig").** Response: every number is shown as its numeral AND as rods-and-cubes beside it (`ART.rod` × tens, `ART.cube` × ones) at all levels, so the size of the number is readable from the blocks without reading the numeral; the tens-first enactment above uses the blocks, never the digits.
  3. **Same tens, choosing by the number's look ("52 = 57 — they start the same").** Response: when the tens are equal the enactment goes to step two: the rods fade instead, and the cubes of both numbers line up in two rows with pairing lines between matched cubes (`ART.pairLine`); the unmatched cubes pulse with `ART.onesBadge` showing "2" and "7". Equality is only true when every cube pairs.
  4. **Bigger-looking = more: a number drawn with more cubes (48: 4 rods + 8 cubes = 12 blocks) taken as more than 61 (6 rods + 1 cube = 7 blocks).** Response: L2 and L3 deliberately pair a number with many cubes against a number with more rods and fewer cubes; the tens-first enactment (rods only) answers it.
  5. **Mouth direction confused (the symbol read as an arrow).** Response: the mouth is a crocodile that "eats the bigger number": the wide open side always faces the bigger number and the two `ART.tooth` marks sit inside it; when the mouth is set the crocodile head (`ART.croc`) turns to face the same way (`ANIM.turnHead`), so direction is carried by the picture and the symbol together, never by the symbol alone.

## How it plays
1. **Start screen**: title "Compare Two-Digit", the crocodile (`ART.croc`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 32 vs 51)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the left number card (`ART.numCard`, 200 × 170) centred at (170, 160) showing `ART.numeral` "32" (56 px) in its top half and, beneath, its blocks: 3 `ART.rod`s (14 × 60, pitch 20) starting at x = 110, y = 205, and 2 `ART.cube`s (16 × 16, pitch 20) starting at x = 190, y = 205 (cubes wrap into a second row of 5 above the first when there are more than 5). The right number card at (550, 160) shows "51" with 5 rods and 1 cube in the same layout. Between the cards the crocodile head `ART.croc` at (360, 110) and, under it, the mouth (`ART.mouthOpen` or `ART.equalBars`) at (360, 185), starting in the "=" position. Zone B: the stepper — `ART.stepTile` with `ART.mouthLeftIcon` at (260, 380) and `ART.stepTile` with `ART.mouthRightIcon` at (460, 380); between them the symbol readout (`ART.symbolCard`, 96 × 96) at (360, 380) showing the current symbol as text (`ART.symbolText` "=", "<" or ">" at 56 px). Zone C: Check (`makeButton ok`) at (360, 510), enabled from the start.
3. **Setting**: the mouth has three positions: "<" (opens toward the right number), "=" (two bars), ">" (opens toward the left number). Tapping the right-icon tile turns the mouth one step toward the right number (> → = → <, clamped); tapping the left-icon tile turns it one step toward the left number (< → = → >, clamped). Keyboard: Left / Right arrows do the same. Each step: `tone("tap")`, the mouth swaps to the new shape with `ANIM.mouthTurn`, the crocodile head does `ANIM.turnHead` to face the open side (faces forward for "="), and `ART.symbolText` updates. The numbers do not react while setting (predict-then-check, F-40).
4. **Check**: tap OK.
   - **Correct ("<" for 32 vs 51)**: the crocodile head does `ANIM.chomp` (a quick scale-y squash) toward the bigger number, `tone("correct")`, praise pop (rotation), the comparison sentence `ART.sentence` "32 < 51" appears at (360, 250) with `ANIM.appear`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear` on both cards).
   - **Wrong, tens differ (set ">" or "=" for 32 vs 51)**: `tone("nudge")`; the tens-first enactment: both numbers' cubes fade (`ANIM.fadeCubes`), the rods glide into two aligned columns beside the mouth (`ANIM.rodsAlign` — left rods to x = 290, right rods to x = 430, base y = 240, stacked upward 22 px per rod), `ART.tensBadge` "30" and "50" appear above the columns, the taller column pulses (`ANIM.pulse`). The mouth stays where the child left it; the child re-sets and checks again. Attempt 2. The blocks glide home (`ANIM.rodsHome`, cubes restore) 400 ms after the child's next tap on a stepper tile.
   - **Wrong, tens equal (e.g. set ">" for 52 vs 57)**: `tone("nudge")`; step one plays and both tens badges read "50" with `ART.equalBars` drawn between the columns for 600 ms (the tens are the same); then step two: the rods fade, the cubes glide into two rows (`ANIM.cubesAlign` — left cubes along y = 220 from x = 300, right cubes along y = 250 from x = 300, pitch 20), `ART.pairLine`s draw between the matched cubes, the unmatched cubes pulse and `ART.onesBadge`s "2" and "7" appear. Attempt 2.
   - **Second wrong Check**: the enactment replays, and then the show-me: the mouth turns itself to the correct position (`ANIM.mouthTurn`) with `ART.showRing` around the symbol card (`ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Re-queue** (F-41): an item wrong on the first Check re-enters the play list after 2 intervening items with its two numbers swapped left-for-right (so the correct symbol flips), then, if wrong again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 tens differ by ≥ 2 and the number with more cubes is also the bigger number; L2 tens differ by 1 and the smaller number has MORE cubes (the look-bigger trap), plus one equal pair; L3 same tens (ones decide), reversed-digit pairs (36 vs 63) and equal pairs.
7. **Finish**: `t("all_done")` (360, 110); the crocodile (360, 200) `ANIM.celebrate`; the summary = the ten comparison sentences as chips (`ART.sentenceChip`, 120 × 36) in two rows of five from y = 340, first-Check items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items × 25-40 s).

## Art registry
```js
const ART = {
  croc:          { kind: "emoji", value: "🐊", size: 72 },
  numCard:       { kind: "shape", shape: "roundRect", w: 200, h: 170, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  numeral:       { kind: "text",  value: "", size: 56, font: "display", color: "ink" },
  rod:           { kind: "shape", shape: "rect", w: 14, h: 60, fill: "structure", stroke: "bg", strokeWidth: 1 },      // nine hairline notches (line token) 6 px apart
  cube:          { kind: "shape", shape: "rect", w: 16, h: 16, fill: "accent", stroke: "bg", strokeWidth: 1 },
  mouthOpen:     { kind: "shape", shape: "polygon", points: [[-36,-40],[36,0],[-36,40],[-24,0]], fill: "structure" },  // ">" shape: wide end at the left; scaleX −1 for "<"
  tooth:         { kind: "shape", shape: "polygon", points: [[-5,0],[5,0],[0,10]], fill: "bg" },                         // two teeth inside the open mouth, at (−22,−18) and (−22,+18)
  equalBars:     { kind: "shape", shape: "rect", w: 60, h: 10, fill: "structure" },                                     // drawn twice, 14 px apart, for "="
  symbolCard:    { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 14 },
  symbolText:    { kind: "text",  value: "=", size: 56, font: "display", color: "inkOnAccent" },
  stepTile:      { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  mouthLeftIcon: { kind: "shape", shape: "polygon", points: [[18,-20],[-18,0],[18,20],[10,0]], fill: "structure" },   // a small mouth opening to the left
  mouthRightIcon:{ kind: "shape", shape: "polygon", points: [[-18,-20],[18,0],[-18,20],[-10,0]], fill: "structure" },  // a small mouth opening to the right
  tensBadge:     { kind: "shape", shape: "roundRect", w: 44, h: 24, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 6 },   // numeral 15 px display structure
  onesBadge:     { kind: "shape", shape: "roundRect", w: 30, h: 24, fill: "bg", stroke: "accent", strokeWidth: 2, radius: 6 },      // numeral 15 px display ink
  pairLine:      { kind: "shape", shape: "line", w: 2, stroke: "structure", strokeWidth: 3 },   // vertical, from a top-row cube to the cube below it (length 30)
  sentence:      { kind: "text",  value: "", size: 32, font: "display", color: "structure" },
  showRing:      { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  sentenceChip:  { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // label 18 px display ink
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Rods and cubes differ by size AND shape AND notches, never by colour alone. Block layout inside a card: rods in one row (pitch 20) starting 60 px left of the card centre at y = card centre + 45; cubes to the right of the rods (pitch 20), up to 5 per row, the second row 20 px higher; a number with 0 ones shows a dashed empty cube slot (`ART.cube` drawn with stroke only, alpha 0.4).

## Animation registry
```js
const ANIM = {
  mouthTurn:  { scale: 1.0, alpha: 1, duration: 160, ease: "Back.Out", trigger: "the mouth shape swaps to the new position (old shape alpha → 0 over 80 ms, new shape from alpha 0, scale 0.7)" },
  turnHead:   { scaleX: -1, duration: 200, ease: "Sine.InOut", trigger: "croc faces the open side of the mouth (scaleX −1 to face right, +1 to face left, 1 at scale 0.9 when facing forward for =)" },
  chomp:      { scaleY: 0.8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "croc on a correct Check" },
  fadeCubes:  { alpha: 0.25, duration: 250, ease: "Sine.Out", trigger: "all cubes during the tens-first enactment" },
  fadeRods:   { alpha: 0.25, duration: 250, ease: "Sine.Out", trigger: "all rods during the ones enactment (tens equal)" },
  rodsAlign:  { duration: 300, ease: "Sine.InOut", trigger: "each rod to its column position, 60 ms apart (x, y set at call)" },
  cubesAlign: { duration: 300, ease: "Sine.InOut", trigger: "each cube to its comparison row, 60 ms apart (x, y set at call)" },
  rodsHome:   { duration: 300, ease: "Sine.InOut", trigger: "rods and cubes glide back to their card positions; alpha restored to 1" },
  pulse:      { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "taller rod column; unmatched cubes" },
  badgeIn:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "tens/ones badges (from alpha 0, scale 0.5)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "sentence; new item's cards (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the symbol card (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish croc" }
};
```
No flashing: `showMe` cycles at 1 Hz; the enactment steps are one-shot.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌───────────┐         croc (360,110)        ┌───────────┐  │
      │  │    32     │                               │    51     │  │  zone A
      │  │ ||| ::    │   mouth (360,185)  "<" / "=" / ">"   │ ||||| .   │  │
      │  └───────────┘ (170,160)                     └───────────┘ (550,160)
      │              "32 < 51" (360,250) after Check                 │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ <mouth ]     [  =  ]     [ mouth> ]   y=380         │  zone B
      │         x=260          x=360        x=460    (96×96)         │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `|` = a rod, `.` / `:` = cubes. During the tens-first enactment the rod columns stand at x = 290 and x = 430 with their bases at y = 240; during the ones enactment the cube rows run along y = 220 and y = 250 from x = 300. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.numCard` at (170, 160) and (550, 160); `ART.numeral` centred at card (0, −45); blocks per the layout note under the Art registry.
- `ART.croc` at (360, 110); the mouth at (360, 185): `ART.mouthOpen` for ">" (as drawn), the same shape with scaleX −1 for "<", two `ART.equalBars` (y = 178 and y = 192) for "="; `ART.tooth` × 2 inside the open mouth.
- `ART.sentence` at (360, 250). `ART.tensBadge` above each rod column (column top − 18); `ART.onesBadge` at the right end of each cube row (+ 24 px); `ART.pairLine` between matched cubes.
- Stepper: `makeTile` 96 × 96 (`ART.stepTile`) with `ART.mouthLeftIcon` at (260, 380) and `ART.mouthRightIcon` at (460, 380); `ART.symbolCard` at (360, 380) with `ART.symbolText` centred; `ART.showRing` around the symbol card during show-me. Check `makeButton` `ok` at (360, 510).
- Keyboard: Left / Right arrows turn the mouth one step; Tab reaches the left tile, right tile, OK; Enter activates.
- Tap floors 96 ≥ 56; gap between the stepper tiles and the symbol card 4 px each side (a mis-tap on the card does nothing).
- During an enactment (≈ 2 s) the stepper tiles and OK are `setEnabled(false)`; they re-enable when it ends. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (left; right; correct symbol). The correct symbol is never the same three items running (the play list re-orders if it would be).
- **L1** (tens differ by ≥ 2; the bigger number also has more cubes or the same): (32; 51; <) · (74; 46; >) · (23; 65; <) · (81; 37; >) · (15; 58; <) · (67; 29; >)
- **L2** (tens differ by 1; the smaller number has more cubes; one equal pair): (48; 61; <) · (39; 52; <) · (70; 68; >) · (26; 34; <) · (55; 55; =) · (83; 79; >) · (17; 25; <)
- **L3** (same tens, ones decide; reversed digits; equal pairs): (52; 57; <) · (36; 63; <) · (94; 91; >) · (45; 54; <) · (78; 78; =) · (60; 66; <) · (29; 92; <) · (83; 81; >) · (40; 40; =)

Play list of 10 per Rules with re-queue (How it plays §5); no item repeats except by re-queue (swapped); two consecutive items never share both numbers.

Worked example: item 1 (32; 51) sets "<" first Check · item 2 (74; 46) ">" first Check → L2 · item 3 (48; 61) sets ">" (more cubes) → tens-first enactment 40 vs 60, re-sets "<" (helped) · item 4 (39; 52) "<" · item 5 (55; 55) "=" → L3 · item 6 = re-queued (61; 48) ">" first Check · items 7-10 at L3 with (36; 63) missed once → Finish shows ten chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued swaps replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item swapped (after 2 items, then a last look) without changing level.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no stepper tap, the symbol card `ANIM.pulse`s once; repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: croc `ANIM.chomp` toward the bigger number (or a forward nod for "="), `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-Check items), `ART.sentence` shows, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Ones compared instead of tens / bigger-looking number chosen (tens differ): `tone("nudge")`; cubes fade, rods align into two columns with tens badges, the taller column pulses; the mouth stays; attempt 2.
  - Tens equal but "<" or ">" set, or tens equal and "=" set when the ones differ: `tone("nudge")`; tens step shows equal badges with the bars, then the ones step pairs the cubes and badges the unmatched ones; attempt 2.
  - "=" set when the tens differ: the tens step (as the first bullet).
  - Second wrong Check: the enactment replays, then the mouth turns itself to the correct symbol with the show-me ring; OK completes the item as solved-with-help.
- Retry behaviour: attempt 1 unaided → attempt 2 with the blocks aligned in view → attempt 3 show-me; solved-with-help; the swapped item re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Compare Two-Digit". The play screen shows only numerals, blocks and the symbols < = >.

## Sound
`tone("tap")` on each stepper step; `tone("tap", k)` per rod as the columns align (k = 1..tens, a big step per rod) and per cube pair as the pair lines draw; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check (mellow); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: both number cards, the mouth, the three stepper elements and OK visible and separate).
- [ ] Keyboard operable (Left / Right arrows turn the mouth; Tab reaches the two tiles and OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong Checks still ends with the mouth turning itself to the right symbol and OK completing the item).
- [ ] Every number shows its numeral and the matching rods and cubes (32 = three rods and two cubes).
- [ ] Tapping the right-mouth tile from "=" shows "<" with the mouth open toward the right number and the crocodile facing right; tapping the left-mouth tile from "=" shows ">" facing left.
- [ ] The number cards do not change while the mouth is being set; only OK triggers anything.
- [ ] Checking ">" for 48 vs 61 fades the cubes, lines up 4 rods beside 6 rods with "40" and "60" badges, and the 6-rod column pulses.
- [ ] Checking ">" for 52 vs 57 first shows equal "50" badges with bars, then pairs the cubes and badges the unmatched ones "2" and "7".
- [ ] A missed item comes back two items later with the numbers swapped and the opposite symbol correct.
- [ ] Two first-Check corrects in a row bring the harder level; two misses in a row bring the easier one.
- [ ] The finish screen shows ten comparison chips with a filled dot for first-Check ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
