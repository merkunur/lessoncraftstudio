# 180 — Expanded Form

## Identity
- Slug: `expanded-form-cards`
- Subject / topic: Mathematics / expanded form of a three-digit number with ARROW CARDS — 346 = 300 + 40 + 6, built by overlaying a hundreds card, a tens card and a ones card; a zero place uses a blank card
- Age band: `8-9`
- Interaction pattern: `P2` — tap to place (tap a card in the tray, then tap the base), judged on Check
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (whole-arrangement judgement on a Check tile). **Arrow cards, not place-value blocks**: the free activity owns blocks (and game 018 uses rods and cubes); this game's manipulative is the overlay of three number cards whose arrow tips line up on the right, so that 300, 40 and 6 stacked READ as 346. Content is language-neutral (numerals only).

## Learning
- Objective: Builds a three-digit number from a hundreds card, a tens card and a ones card chosen from a tray, overlaying them on a base so the stack reads the number, and uses the blank card for a place that holds nothing.
- Prerequisites: Reads three-digit numerals; knows 300 is three hundreds (games 038, 179 territory); has built two-digit numbers (game 018).
- Curriculum links: F-108 (digits as independent numbers; zero placeholder ignored; syntactic transcoding 105 → "one hundred and five" built as 100 + 10 + 5; de/nl/da inverted tens and ones; "place-value tile overlay" is the named response), F-102 (writing as heard), F-21, F-31 row "Numbers to 1000; +/− 3-digit" — conservative 8-9 → 8-9 (US 2.NBT.A.3 "read and write numbers to 1000 using … expanded form"; England Y3 "recognise the place value of each digit in a three-digit number"; Germany Klasse 3 "Stellenwerttafel, Zahlen bis 1000"; France CE2 "décomposer un nombre en centaines, dizaines et unités"; Netherlands groep 5 "honderdtallen, tientallen, eenheden"; Spain 2º ciclo "descomposición"; Brazil EF03MA02; Sweden åk 3 "positionssystemet"; Denmark 3. klasse; Norway 3. trinn; Finland grade 3).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Digits as independent numbers — 346 built from 300 + 4 + 6, or wanting a "3" card for the hundreds.** Response: cards are KIND-locked — a ones card can only land in the ones position of the stack, so "4" placed for the tens lands as the ones card and the stack reads 3?4 with the tens position empty; on Check the stack **fans out** (`ANIM.fanOut`): the cards slide down into a row reading "300 + 4 = 304" (`ART.plusText`, `ART.sumText`) and `ART.digitHi` outlines the tens digit on the target while the empty tens position pulses (`ART.slotGhost`). The value of a card is its whole number, not its first digit.
  2. **Zero placeholder ignored — 306 built as 300 + 6 with the tens position empty, or 450 built with the ones position empty (F-108 "empty tens shown as an empty slot").** Response: Check is disabled until every position holds a card — including the BLANK card (`ART.blankCard`) for a place that holds nothing; if the child stalls with the tens position empty for 6 s the blank card in the tray `ANIM.pulse`s once (an inactivity cue, never a clock). The blank card, when placed, lets the 0 of the hundreds card show through: the stack reads 306.
  3. **Transcoding as heard — 105 built as 100 + 10 + 5 ("one hundred and five") = 115.** Response: the fan-out reads "100 + 10 + 5 = 115" beside the target 105; `ART.digitHi` outlines the target's 0 and the 10 card pulses; the child swaps it for the blank card.
  4. **Inverted tens and ones (de/nl/da "dreihundertsechsundvierzig" → 300 + 60 + 4).** Response: the fan-out reads "300 + 60 + 4 = 364"; `ART.digitHi` outlines the target's tens digit while the 60 card pulses, then the ones digit while the 4 card pulses — the stack's left-to-right layout is the anchor, not the word order.
  5. **Reading the stack as a sum of digits or as digits side by side (300, 40, 6 → "346" seen as "300406").** Response: every correct Check shows the fan-out reading "300 + 40 + 6 = 346" and then re-stacks the cards (`ANIM.fanIn`) so the same three cards visibly become the numeral — the overlay IS the equation.

## How it plays
1. **Start screen**: title "Expanded Form", the toucan (`ART.toucan`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 346)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the target card (`ART.targetCard`, 150 × 100) at (150, 150) with `ART.bigNumeral` "346" (52 px); the base (`ART.base`, 280 × 110, `makeTile`) at (470, 150) with three faint position ghosts (`ART.slotGhost`) inside it showing where a hundreds card (150 wide), a tens card (104 wide) and a ones card (58 wide) will sit, all right-aligned at x = 590; the toucan at (650, 90). Zone B: the tray — three rows of four cards, each a `makeTile`: hundreds row (`ART.cardH`, 150 × 56) at y = 300, x = 111 / 277 / 443 / 609; tens row (`ART.cardT`, 104 × 56) at y = 372, x = 180 / 300 / 420 / 540; ones row (`ART.cardO`, 58 × 56 drawn, hit area 72 × 56) at y = 444, x = 228 / 316 / 404 / 492. Every card has its arrow tip on the RIGHT and its numeral left of the tip; the blank card (`ART.blankCard`) is a tens- or ones-width card with no numeral and a dashed stroke. Zone C: Check (`makeButton ok`) at (360, 516), disabled until all three positions are filled. Caption `S("buildIt")` ("Build the number") at (360, 232), 22 px `THEME.colour.inkSoft`.
3. **Placing**: tap a tray card (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap the base: the card glides (`ANIM.glide`) onto the base into the position of its KIND (hundreds under, tens over it, ones on top), arrow tips aligned at x = 590; `tone("tap", 9)` for a hundreds card, `tone("tap", 5)` for tens, `tone("tap", 1)` for ones. A position that already holds a card refuses (the arriving card springs back, `ANIM.nudge`, no message). Tapping a card on the base returns it to the tray (undo, free). The stack is drawn with later cards on top, so the visible numerals read as one number (300 + 40 + 6 shows "346"; 300 + blank + 6 shows "306"). Check enables when the three positions are filled.
4. **Check** (the child taps OK):
   - **Correct**: the stack **fans out** (`ANIM.fanOut`: the three cards slide down and apart into a row at y = 235 — hundreds at x = 380, tens at x = 500, ones at x = 590 — with `ART.plusText` "+" between them and `ART.sumText` "= 346" after; 600 ms; `tone("tap", k)` per card), holds 700 ms, then **re-stacks** (`ANIM.fanIn`) and the target card `ANIM.pop`s; `tone("correct")`; praise pop (next key in rotation; first-try items only); the toucan `ANIM.nod`s; rail dot fills; next item after 900 ms (`ANIM.appear`: new target, new tray, empty base).
   - **Wrong**: `tone("nudge")`; the fan-out shows what the child built — e.g. "300 + 60 + 4 = 364" — with `ART.sumText` in `THEME.colour.inkSoft`; then the **place cue**: for each place that differs from the target, `ART.digitHi` outlines that digit on the target card while the wrong card `ANIM.pulse`s (tens first, then ones, 900 ms each); the cards stay fanned; tapping a fanned card returns it to the tray; the child replaces it (the stack re-forms as cards are placed) and checks again. Check disables until the stack changes. Attempt 2.
   - **Second wrong Check**: the cue again, then the show-me: the three correct tray cards gain `ART.showRing` (`ANIM.showMe`) — for a zero place the blank card is ringed — and OK is ringed; placing exactly those and checking completes the item as solved-with-help (no praise pop).
5. **A full worked session**: item 1 (346) 300 ✓ 40 ✓ 6 ✓ → OK: "300 + 40 + 6 = 346" fans and re-stacks ✓ · item 2 (528) ✓ → step up · item 3 (L2: 306) places 300 and 6, stalls; the blank tens card pulses; places blank → OK ✓ · item 4 (L2: 450) 400 + 50 + blank ✓ → step up · item 5 (L3: 105) 100 + 10 + 5 ✗ → fan reads "= 115", the target's 0 outlined, the 10 card pulses → returns 10, places blank → ✓ (retried) → step down · item 6 (L2: 802) ✓ · item 7 (L2: 590) ✓ → step up · item 8 (L3: 461) 400 + 10 + 6 ✗ (inverted) → "= 416", tens then ones outlined → 400 + 60 + 1 ✓ · items 9-10 (L3: 703 ✓, 382 ✓) → Finish.
6. **Finish**: `t("all_done")` (360, 110); the toucan (360, 200) `ANIM.celebrate`; the summary = the ten numbers as small fanned rows (`ART.miniCard` × 3 with their values in 13 px and "+" between) in two columns of five (x = 200 and 520; y = 320 + i × 34), first-try items with `ART.dotFull` at the left and helped items with `ART.dotEmpty` — the expansions the child built; optional `t("question_x_of_y")` with n = first-try items at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  toucan:     { kind: "emoji", value: "🦜", size: 80 },                          // Unicode 12 (a parrot glyph stands for the toucan host)
  targetCard: { kind: "shape", shape: "roundRect", w: 150, h: 100, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  bigNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "ink" },
  digitHi:    { kind: "shape", shape: "roundRect", w: 36, h: 64, stroke: "accent", strokeWidth: 3, radius: 8 },        // around one digit of the target
  base:       { kind: "shape", shape: "roundRect", w: 280, h: 110, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 16 },
  slotGhost:  { kind: "shape", shape: "polygon", points: [[-75,-28],[57,-28],[75,0],[57,28],[-75,28]], stroke: "line", strokeWidth: 2 },   // dashed; scaled to each card width at runtime
  // arrow cards — the numeral sits left of the arrow tip; tips align on the right when stacked
  cardH:      { kind: "shape", shape: "polygon", points: [[-75,-28],[57,-28],[75,0],[57,28],[-75,28]], fill: "surface", stroke: "structure", strokeWidth: 3 },   // 150 × 56; numeral 30 px display ink, centred at (−12, 0)
  cardT:      { kind: "shape", shape: "polygon", points: [[-52,-28],[34,-28],[52,0],[34,28],[-52,28]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // 104 × 56
  cardO:      { kind: "shape", shape: "polygon", points: [[-29,-28],[11,-28],[29,0],[11,28],[-29,28]], fill: "bg", stroke: "structure", strokeWidth: 3 },   // 58 × 56
  blankCard:  { kind: "shape", shape: "polygon", points: [[-52,-28],[34,-28],[52,0],[34,28],[-52,28]], stroke: "inkSoft", strokeWidth: 2 },   // dashed (lineDash [6,4]), no fill, no numeral; drawn at ones width for the ones blank
  cardNum:    { kind: "text",  value: "", size: 30, font: "display", color: "ink" },
  plusText:   { kind: "text",  value: "+", size: 30, font: "display", color: "inkSoft" },
  sumText:    { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  miniCard:   { kind: "shape", shape: "roundRect", w: 44, h: 22, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 4 },
  showRing:   { kind: "shape", shape: "roundRect", w: 162, h: 68, stroke: "structure", strokeWidth: 4, radius: 14 },   // scaled to each card width; 232 × 84 around OK
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
`ART.toucan` is Unicode 12 (2019) — the newest allowed without a fallback. The three card kinds differ in WIDTH (150 / 104 / 58) as well as fill, and the blank card differs by its dashed stroke and missing numeral — never colour alone. A stacked card hides the right-hand digits of the card beneath exactly (widths are multiples of one digit cell: 46 px per digit plus the 18-px arrow tip), so the overlay reads as one numeral.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to its stack position / back to the tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement into an occupied position" },
  fanOut:    { y: 235, duration: 600, ease: "Sine.InOut", trigger: "each stacked card slides down to its row position (x set at call: 380 / 500 / 590); plusText and sumText appear at the end" },
  fanIn:     { y: 150, duration: 500, ease: "Sine.InOut", trigger: "cards return to the stack on the base (x set at call); plusText and sumText fade first" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "target card on a correct Check" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "a wrong card during the place cue; the tray's blank card after 6 s with a place still empty" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "plusText / sumText; new item (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "digitHi, plusText, sumText clearing" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "toucan on a correct Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "rings on the three correct tray cards and OK (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish toucan" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐            ┌──────────────────────┐  toucan(650,90)│
      │   │  346   │            │ [300▷ ][40▷][6▷]     │  base (470,150)│  zone A
      │   └────────┘(150,150)   │  tips aligned x=590  │  280×110       │
      │                         └──────────────────────┘               │
      │              "Build the number" (232)   fan row y=235           │
260   ├──────────────────────────────────────────────────────────────┤
      │  [ 300▷ ]   [ 600▷ ]   [ 400▷ ]   [ 200▷ ]   hundreds y=300    │
      │     [ 40▷ ]  [ 60▷ ]  [ blank▷ ]  [ 30▷ ]    tens y=372        │  zone B
      │        [6▷]   [4▷]   [blank▷]  [7▷]          ones y=444        │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,516)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(▷ marks each card's arrow tip.) Stack positions on the base, all with the tip at x = 590, y = 150: hundreds card centre (515, 150), tens card centre (538, 150), ones card centre (561, 150). Fan row y = 235 overlaps the caption's line, so the caption hides while fanned. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.targetCard` at (150, 150) with `ART.bigNumeral` centred; `ART.digitHi` around the hundreds / tens / ones digit at x = 116 / 150 / 184.
- Base: `makeTile(scene, 470, 150, 280, 110, …)` with `ART.base` tokens; three `ART.slotGhost`s (dashed) at the stack positions, scaled to 150 / 104 / 58 wide; placed cards drawn at those positions with `ART.cardNum` left of the tip (a 300 card's numeral centred at (−12, 0) of the card; a 40 card's at (−9, 0); a 6 card's at (−7, 0)) so that the stack's visible digits fall on the same three digit cells: x = 521 (hundreds), 544 (tens), 567 (ones) in stage space. Each placed card is a `makeTile` hit area over its exposed part (removal target).
- Tray: hundreds `makeTile` 150 × 56 (`ART.cardH`), tens 104 × 56 (`ART.cardT`), ones 58 × 56 drawn inside a 72 × 56 hit area (`ART.cardO`); the blank card `ART.blankCard` at tens width in the tens row and at ones width in the ones row (its polygon scaled), dashed, no numeral. Selection persists only until a base tap.
- Fan-out row at y = 235: cards at x = 380 / 500 / 590 with `ART.plusText` at x = 440 and 545; `ART.sumText` ("= 346", 30 px) sits BELOW the row at (500, 270) so it never leaves the stage.
- Check: `makeButton` `ok` at (360, 516), alpha 0.5 while disabled; `ART.showRing` around the correct tray cards (scaled to each width) and around OK.
- Caption `S("buildIt")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 232), `wordWrap` 300, max 2 lines; hidden while the fan row is shown.
- `ART.toucan` at (650, 90).
- Tap floors: every tray card ≥ 56 tall; ones cards get a 72-wide hit area; base 280 × 110; OK 220 × 72. Gaps: hundreds row 16, tens row 16, ones row 16 (hit areas), rows 16.
- Tab order: hundreds row left to right, tens row, ones row, the base, placed cards, OK.
- During the fan-out + place cue (≈ 0.6 + 0.9 × wrong places + 0.7 s) every tile is `setEnabled(false)`.

## Content
Language-neutral (numerals only; one caption string). Each item = (target; hundreds row; tens row; ones row) — the four cards offered in each row, in authored order (shuffled per item). "blank" = `ART.blankCard`. Distractor logic baked into the rows: the digit-swap value (tens ↔ ones), the ±1-place neighbour, the transcoding trap (the "10" card for 1x5-type numbers), and the blank card in the tens and ones rows of EVERY item so that its presence never gives away a zero place.

- **L1** (no zero place): 346 (300, 600, 400, 200; 40, 60, blank, 30; 6, 4, blank, 7) · 528 (500, 200, 800, 600; 20, 80, blank, 50; 8, 2, blank, 9) · 173 (100, 700, 300, 200; 70, 30, blank, 10; 3, 7, blank, 1) · 794 (700, 900, 400, 600; 90, 40, blank, 70; 4, 9, blank, 5) · 265 (200, 600, 500, 300; 60, 50, blank, 20; 5, 6, blank, 2) · 431 (400, 300, 100, 500; 30, 10, blank, 40; 1, 3, blank, 4) · 687 (600, 800, 700, 500; 80, 70, blank, 60; 7, 8, blank, 6) · 952 (900, 500, 200, 800; 50, 20, blank, 90; 2, 5, blank, 9)
- **L2** (one zero place — the blank card is the answer in one row): 306 (300, 600, 100, 400; blank, 30, 60, 10; 6, 3, blank, 5) · 450 (400, 500, 100, 200; 50, 40, blank, 10; blank, 5, 4, 6) · 802 (800, 200, 100, 900; blank, 80, 20, 10; 2, 8, blank, 3) · 590 (500, 900, 400, 600; 90, 50, blank, 10; blank, 9, 5, 4) · 207 (200, 700, 100, 300; blank, 20, 70, 10; 7, 2, blank, 8) · 640 (600, 400, 500, 700; 40, 60, blank, 10; blank, 4, 6, 3) · 103 (100, 300, 200, 400; blank, 10, 30, 20; 3, 1, blank, 2) · 910 (900, 100, 800, 200; 10, 90, blank, 20; blank, 1, 9, 2)
- **L3** (transcoding traps with the 10 card, inverted-digit traps, 999, two zero-adjacent cases): 105 (100, 500, 200, 400; blank, 10, 50, 20; 5, 1, blank, 6) · 210 (200, 100, 300, 400; 10, 20, blank, 30; blank, 1, 2, 4) · 703 (700, 300, 800, 600; blank, 70, 30, 10; 3, 7, blank, 2) · 461 (400, 600, 100, 500; 60, 10, blank, 40; 1, 6, blank, 4) · 382 (300, 800, 200, 400; 80, 20, blank, 30; 2, 8, blank, 3) · 999 (900, 100, 800, 500; 90, 10, blank, 80; 9, 1, blank, 8) · 560 (500, 600, 100, 400; 60, 50, blank, 10; blank, 6, 5, 1) · 604 (600, 400, 100, 700; blank, 60, 40, 10; 4, 6, blank, 5)

A "0" card never exists in any row — zero is always the blank card. Play list of 10 per Rules (shuffle within level; levels in order; no item repeats); row order shuffled per item; the correct card is never in the same slot of its row twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap and a position is still empty, the tray card that fills it — the blank card when that place is zero, otherwise nothing (the child must find the value) — `ANIM.pulse`s once; repeats every 6 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: the stack fans out reading "h + t + o = target" with rising tones, holds, re-stacks; the target card `ANIM.pop`s; `tone("correct")`; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items); toucan `ANIM.nod`; rail dot; next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and the fan-out reading what was built):
  - Inverted tens and ones (300 + 60 + 4 for 346): `ART.digitHi` on the target's tens digit while the 60 card pulses, then on the ones digit while the 4 card pulses.
  - Transcoding (100 + 10 + 5 for 105): `ART.digitHi` on the target's 0 while the 10 card pulses; the sum reads "= 115".
  - Zero place filled with a value (300 + 30 + 6 for 306; 400 + 50 + 6 for 450): `ART.digitHi` on the 0 while the wrong card pulses; the blank card in the tray pulses after it.
  - A wrong single place (600 for 300; 20 for 40): `ART.digitHi` on that digit while that card pulses.
  - A card sent to an occupied position: refused, `ANIM.nudge`, no message, not an attempt. Check with a position empty: impossible (OK disabled).
- Retry behaviour: attempt 1 → attempt 2 after the fan-out and place cue (the cards stay fanned; the child swaps cards) → attempt 3 with the show-me rings on the three correct tray cards and OK; building exactly those is solved-with-help. Undo is free. No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Expanded Form"; `buildIt` = "Build the number". Cards, plus signs and sums are numerals and symbols.

## Sound
`tone("tap")` on selecting a card; `tone("tap", 9)` / `tone("tap", 5)` / `tone("tap", 1)` when a hundreds / tens / ones card lands (the pitch tells the place); `tone("tap", k)` per card in the fan-out (k = 9, 5, 1 in order); `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken — no number words in any language.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 1 of 10", All done, Play again, Menu, praise; the caption once translated; every card is a numeral).
- [ ] Works at narrow width (400-px iframe: the target, the base, three tray rows of four cards and OK fully visible; ones cards remain separate targets).
- [ ] Keyboard operable (Tab: hundreds row, tens row, ones row, base, placed cards, OK; Enter selects / places / removes / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the ringed cards and OK always complete the item).
- [ ] A hundreds card, a tens card and a ones card stacked on the base line up their arrow tips on the right and read as one three-digit numeral.
- [ ] A ones card can never sit in the tens position; placing "4" for 346 leaves the tens position empty and OK dimmed.
- [ ] OK is dimmed until all three positions hold a card; for 306 the blank card must be placed in the tens position, and the stack then reads 306.
- [ ] Checking 300 + 60 + 4 for 346 fans the cards into a row reading "300 + 60 + 4 = 364", outlines the 4 on the target while the 60 card pulses, then the 6 while the 4 card pulses.
- [ ] Checking 100 + 10 + 5 for 105 reads "= 115" and the 10 card pulses with the target's 0 outlined.
- [ ] A correct Check fans the cards out reading the expansion, then re-stacks them into the numeral before the next item.
- [ ] Tapping a card on the base (stacked or fanned) returns it to the tray.
- [ ] No place-value blocks, rods or cubes appear anywhere in the game.
- [ ] The finish screen shows ten small expansions and no score beyond the optional "n of 10".
- [ ] With `?sound=off` nothing is audible; with sound on, a hundreds card lands on a higher note than a ones card.
