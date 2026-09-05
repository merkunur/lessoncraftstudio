# 026 — Near-Doubles Ladder

## Identity
- Slug: `near-doubles-ladder`
- Subject / topic: Mathematics / near doubles (n + (n + 1)) solved as "double n, then one more"
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N, in two steps per item (first the strategy card, then the answer tile)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (numerals, symbols and dots); no `LOCALE_DATA`.

## Learning
- Objective: For a near-double such as 6 + 7, first taps the strategy card that rewrites it as the double plus one ("6 + 6 + 1"), then taps the answer, and sees the extra dot that makes the difference.
- Prerequisites: Knows doubles to 10 + 10 (game 025); adds 1 to a number within 20; reads numerals to 20.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources), F-105 ("fade counters, introduce doubles/make-ten anchors"), F-46 (a support ladder: the strategy card is the scaffold, faded at L3), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.6 "using … doubles plus one"; England Y1-2 "use known facts … near doubles"; Germany Klasse 1-2 "Nachbaraufgaben, Verdoppeln plus eins"; France CP-CE1 "presque-doubles"; Netherlands groep 3-4 "bijna-dubbelen"; Spain 1º ciclo; Brazil EF02MA05; Sweden åk 1-2 "nästan dubbelt"; Finland grade 1-2).
- Common misconceptions (F-105, F-104), each with this game's response:
  1. **Doubling and forgetting the one (6 + 7 = 12).** Response: the card "6 + 6" (without the + 1) is a distractor at every level; tapping it lays out the dot rows for 6 and 7 with the seventh dot drawn as `ART.dotExtra` (a ringed dot that `ANIM.pulse`s) and the split bar (`ART.splitBar`) placed after six dots in the second row — "the second row has one MORE than the first". At the answer step 2n is a distractor for the same slip.
  2. **Doubling the larger number and adding one (7 + 7 + 1 = 15).** Response: "7 + 7 + 1" is a distractor card; tapping it shows the dot rows with the 7-row's extra dot ringed, and a ghost dot (`ART.dotGhost`, dashed) appears at the end of the 6-row where a seventh would be needed for 7 + 7 — "the first row does not have seven"; 2n + 2 is the matching answer distractor. (Double-the-larger-minus-one is a valid strategy but is not offered, so it is never marked wrong.)
  3. **Counting all instead of using the double.** Response: the dot rows never appear before the strategy card is chosen — the child commits to a strategy first (F-40, retrieval before showing); once the correct card is chosen the rows show the double as one bracketed block (`ART.doubleBracket` under the first 2n dots) and the extra dot beside it, so the answer step is "12 and 1 more", not a count from 1.
  4. **Not seeing which pair is the near double when the larger number is written first (7 + 6).** Response: L3 writes the larger addend first for half the items; the correct card is still "6 + 6 + 1"; a card "7 + 7 + 1" is the distractor; on the correct choice the equation shows the swap (`ART.eqText` "7 + 6" → "6 + 7", `ANIM.swap`) before the rows draw.
  5. **Reading the strategy card as a new sum to compute from scratch.** Response: the card and the rows carry the same numerals; after the correct card, the double's total appears on the bracket (`ART.bracketTag` "12") before the answer tiles enable, so the remaining step is exactly + 1.

## How it plays
1. **Start screen**: title "Near-Doubles Ladder", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Item 1 (L1: 2 + 3)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the ladder (`ART.ladderRail` × 2 vertical bars at x = 80 and x = 140, from y = 70 to y = 250, with `ART.rung`s every 45 px) with the koala on the lowest rung at (110, 230); the equation (`ART.eqText`, 44 px) "2 + 3 = ?" at (400, 100); beneath it the dot area (`ART.rowsBack`, 360 × 110, centred (400, 190)) — EMPTY until the strategy card is chosen. Zone B, step 1: three strategy cards (`ART.card`, 180 × 72) at y = 340, x = 170 / 360 / 550: "2 + 2 + 1", "2 + 2", "3 + 3 + 1" shuffled (24 px numerals). Caption `S("whichWay")` ("Which way?") at (360, 288), 24 px `THEME.colour.inkSoft`.
3. **Step 1 — the strategy card**: tap a card.
   - **Correct ("2 + 2 + 1")**: `ANIM.pop`, `tone("correct")` (no praise pop yet); the card glides (`ANIM.glide`) up to sit under the equation at (400, 140) as `ART.cardLocked`; the dot rows draw (`ANIM.rowIn`): row 1 = 2 dots (`ART.dot`) at y = 170, row 2 = 3 dots at y = 210, left-aligned from x = 260 at pitch 36; `ART.splitBar` drops between dot 2 and dot 3 of row 2; `ART.doubleBracket` spans the first two dots of both rows at y = 236 with `ART.bracketTag` "4"; the third dot of row 2 is `ART.dotExtra` with `ART.plusOneTag` "+ 1" above it. The koala climbs one rung (`ANIM.climb`). Then step 2 begins: the cards are replaced (`ANIM.cardsOut`, then `ANIM.appear`) by three answer tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480: 5, 4, 6 shuffled; the caption changes to `S("howMuch")` ("How much?").
   - **Wrong card "2 + 2" (forgot the one)**: `ANIM.nudge`, `tone("nudge")`, the card de-selects and stays; the rows draw as above with the extra dot `ANIM.pulse`-ing three times and `ART.plusOneTag` `ANIM.pulse`-ing with it; after 1200 ms the rows fade (`ANIM.fadeOut`) and the child taps again (attempt 2 of step 1).
   - **Wrong card "3 + 3 + 1" (doubled the larger)**: nudge + tone; the rows draw with `ART.dotGhost` at the end of row 1 (where a third dot would have to be) pulsing, then fade. Attempt 2.
   - **Second wrong card**: the hint again, then the correct card gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it proceeds to step 2 as solved-with-help.
4. **Step 2 — the answer**: tap a tile.
   - **Correct (5)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation) — the one praise per item; `ART.eqText` completes "2 + 3 = 5"; the koala climbs a second rung; rail dot fills; after 800 ms the next item builds (the koala returns to the bottom rung with `ANIM.slideDown` as the new ladder item appears — the ladder is per item: two rungs per item, bottom → strategy → answer).
   - **Wrong (4 = the double; forgot the one)**: nudge + tone; `ART.bracketTag` "4" and `ART.plusOneTag` "+ 1" pulse together and the extra dot `ANIM.pulse`s; attempt 2.
   - **Wrong (6 or other)**: nudge + tone; the rows re-count: bracket tag pulses, then the extra dot's badge (`ART.countBadge` "5") appears with `tone("tap", 5)`; attempt 2.
   - **Second wrong**: the correct tile gains the show-me ring; solved-with-help.
   An item is first-try only if BOTH steps were first-try.
5. **Items 2-10**: per Content/Rules. L1 n = 1-4 (sums 3-9); L2 n = 4-7 (sums 9-15, crossing 10); L3 n = 6-9 (sums 13-19) with the larger addend written first for half the items (swap shown) and, at L3, the strategy cards fade: the correct card is still offered but the rows appear WITHOUT the bracket tag, so the child adds the double themselves (the ladder's top rung).
6. **Finish**: `t("all_done")` (360, 110); the koala at the top of a tall ladder (`ART.ladderRail` at x = 330 / 390 from y = 150 to y = 260, koala at (360, 160)) `ANIM.celebrate`; the summary = the ten near-doubles as chips (`ART.eqChip`, 150 × 36, "6 + 7 = 13") in two rows of five from y = 330 (pitch 140), first-try chips with `ART.dotFull` at their left, helped with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes (10 items × 2 taps).

## Art registry
```js
const ART = {
  koala:         { kind: "emoji", value: "🐨", size: 56 },
  ladderRail:    { kind: "shape", shape: "rect", w: 8, h: 180, fill: "structure" },
  rung:          { kind: "shape", shape: "rect", w: 60, h: 6, fill: "structure" },
  eqText:        { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  rowsBack:      { kind: "shape", shape: "roundRect", w: 360, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  dot:           { kind: "shape", shape: "circle", r: 14, fill: "structure" },
  dotExtra:      { kind: "shape", shape: "circle", r: 14, fill: "surface", stroke: "accent", strokeWidth: 5 },   // the "+ 1" dot: hollow ringed
  dotGhost:      { kind: "shape", shape: "circle", r: 14, stroke: "inkSoft", strokeWidth: 2 },                  // dashed (lineDash [4,4]): where a dot is NOT
  splitBar:      { kind: "shape", shape: "rect", w: 4, h: 40, fill: "accent" },
  doubleBracket: { kind: "shape", shape: "rect", w: 200, h: 4, fill: "structure" },      // width = 2n dots' span, set at call; two short 10-px uprights at its ends drawn with the same token
  bracketTag:    { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  plusOneTag:    { kind: "text",  value: "+ 1", size: 20, font: "display", color: "accent" },
  countBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },              // numeral 15 px display, color inkOnAccent
  card:          { kind: "shape", shape: "roundRect", w: 180, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // label 24 px display ink
  cardLocked:    { kind: "shape", shape: "roundRect", w: 180, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 12 },
  numeralTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:      { kind: "shape", shape: "roundRect", w: 192, h: 84, stroke: "structure", strokeWidth: 4, radius: 16 },   // around a card; 108 × 108 variant drawn by scaling for a tile
  eqChip:        { kind: "shape", shape: "roundRect", w: 150, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Dot rows: row 1 (n dots) at y = 170, row 2 (n + 1 dots) at y = 210, both left-aligned from x = 260 at pitch 36 (n ≤ 9 → the longest row spans 360 px inside the 360-wide `ART.rowsBack`, which is widened to 400 for n ≥ 8).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct card; correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card; wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "correct card to its locked place under the equation (x,y set at call)" },
  rowIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each dot of the rows (from alpha 0, scale 0.5), 90 ms apart, row 1 then row 2" },
  pulse:     { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "dotExtra, plusOneTag, bracketTag or dotGhost per the error" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "hint rows clearing after 1200 ms at step 1" },
  cardsOut:  { y: "+=30", alpha: 0, duration: 200, ease: "Sine.In", trigger: "the two unchosen cards when step 2 begins" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "answer tiles; new item (from alpha 0, scale 0.6)" },
  climb:     { y: "-=45", duration: 300, ease: "Back.Out", trigger: "koala up one rung (after the correct card, and after the correct answer)" },
  slideDown: { y: 230, duration: 300, ease: "Sine.InOut", trigger: "koala back to the bottom rung for the next item" },
  swap:      { x: "+=100", duration: 300, ease: "Sine.InOut", trigger: "L3: the two addends in eqText exchange places (the other moves −=100)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct card / tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ║   ║              "6 + 7 = ?"  eqText (400,100)            │
      │  ╠═══╣              [ 6 + 6 + 1 ] cardLocked (400,140)       │  zone A
      │  ║   ║   ┌────────────────────────────────────┐              │
      │  ╠═══╣   │ ● ● ● ● ● ●            row 1 y=170 │ rowsBack     │
      │  ║ K ║   │ ● ● ● ● ● ● | ◎  +1    row 2 y=210 │ (400,190)    │
      │  ╠═══╣   │ └── 12 ──┘  bracket y=236           │              │
      │ x=80/140 └────────────────────────────────────┘              │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Which way?" / "How much?" (360,288)         │
      │  [ 6 + 6 + 1 ]   [ 6 + 6 ]   [ 7 + 7 + 1 ]   cards y=340     │  zone B
      │        [ 12 ]      [ 13 ]      [ 14 ]         tiles y=400    │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop centred)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Cards (step 1) and tiles (step 2) are never on screen together: the cards leave before the tiles appear. `K` marks the koala on a rung. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- Ladder: `ART.ladderRail` at (80, 160) and (140, 160); `ART.rung` at (110, y) for y = 95, 140, 185, 230; `ART.koala` on the bottom rung at (110, 230), climbing to 185 then 140 within an item.
- `ART.eqText` (400, 100); `ART.cardLocked` (400, 140) with the chosen card's label in 22 px; `ART.rowsBack` (400, 190); dots per the layout note; `ART.splitBar` at (260 + n × 36 − 18, 210); `ART.doubleBracket` at y = 236 spanning x = 246 … 246 + 2n × 18 (the first n dots of each row read as the double); `ART.bracketTag` centred under the bracket at y = 252 (hidden at L3); `ART.plusOneTag` above the extra dot at (x, 186); `ART.dotGhost` at the end of row 1 when the doubled-the-larger hint plays.
- Cards: `makeTile` 180 × 72 (`ART.card` tokens), label 24 px `THEME.font.display` `THEME.colour.ink` (fit-to-width, ≤ 1.6 × English — the labels are numerals and never translate); tiles `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px. `ART.showRing` behind the correct card or (scaled to 108 × 108) the correct tile.
- Caption `S("whichWay")` / `S("howMuch")` at (360, 288), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
- During a hint (≈ 1.5-2 s) cards/tiles are `setEnabled(false)`; they re-enable when it ends.
- Tap floors: cards 180 × 72, tiles 96 (≥ 56); gaps ≥ 10 between cards (x pitch 190, width 180) — acceptable at the 6-8 floor; tile gaps 24. Tab order: cards (then tiles) left to right. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (equation; cards; tiles). Cards always = correct "n + n + 1", "n + n", "(n + 1) + (n + 1) + 1"; tiles = 2n + 1, 2n, 2n + 2 (for n = 1: 3, 2, 4). Card and tile slots shuffled; the correct slot never repeats twice running (§13).
- **L1** (n = 1-4): 2 + 3 · 3 + 4 · 1 + 2 · 4 + 5 · 3 + 4 · 2 + 3
- **L2** (n = 4-7, sums cross 10): 5 + 6 · 6 + 7 · 4 + 5 · 7 + 8 · 5 + 6 · 6 + 7
- **L3** (n = 6-9; the larger addend written first in the marked items; no bracket tag): 8 + 9 · 7 + 6 (swap) · 9 + 10 · 8 + 7 (swap) · 6 + 7 · 9 + 8 (swap) · 7 + 8 · 10 + 9 (swap)

For the swap items the correct card is "n + n + 1" with n the SMALLER addend (7 + 6 → "6 + 6 + 1"); the distractor "7 + 7 + 1" reads as the tempting double-the-first.

Play list of 10 per Rules; no item repeats within a session (L1/L2 list two items twice so the pool covers a child who stays low; a repeat is only reached if a level's pool is exhausted).

Worked example: 2 + 3 (card first-try, tile first-try) · 3 + 4 first-try → L2 · 5 + 6: card "5 + 5" → extra dot pulses → "5 + 5 + 1" → tile 11 first-try (item helped) → L1 · 1 + 2 first-try · 4 + 5 first-try → L2 · 6 + 7 first-try · 4 + 5 first-try → L3 · 7 + 6 (swap shown) card first-try, tile 14 → bracket hidden, badge "13" appears → 13 (helped) · 8 + 9 first-try · 9 + 10 first-try → Finish: 10 chips, 8 with filled dots.

## Rules
- Item count: 10 (each item = strategy card + answer tile).
- Difficulty progression: 2 consecutive first-try items (both steps first-try) → next level (cap L3).
- Adaptation: any wrong tap in an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: step 1 — `ANIM.pop`, `tone("correct")`, the card locks under the equation, the rows draw with the bracket and the extra dot, the koala climbs; step 2 — `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the equation completes, the koala climbs again, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - Card "n + n" (forgot the one): nudge + `tone("nudge")`; the rows draw with the extra dot and "+ 1" pulsing, then fade; attempt 2 of step 1.
  - Card "(n + 1) + (n + 1) + 1" (doubled the larger): nudge + tone; the rows draw with a dashed ghost dot at the end of the shorter row pulsing, then fade; attempt 2.
  - Tile 2n (forgot the one at the answer step): nudge + tone; bracket tag, "+ 1" and the extra dot pulse; attempt 2 of step 2.
  - Tile 2n + 2 or other: nudge + tone; the bracket tag pulses, then the extra dot's badge shows the total; attempt 2.
  - Second wrong at either step: the show-me ring on the correct card / tile; solved-with-help.
- Retry behaviour: per step — attempt 1 unaided → attempt 2 after the enacted hint → attempt 3 with the show-me ring; solved-with-help. No attempt 4 at either step. An item is first-try only when both steps were.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Near-Doubles Ladder"; `whichWay` = "Which way?"; `howMuch` = "How much?".

## Sound
`tone("tap")` on a tap; `tone("correct")` on each correct step (the praise chime only at step 2); `tone("nudge")` on a wrong card or tile; `tone("tap", 2n)` when the bracket tag appears and `tone("tap", 2n + 1)` on the extra dot's badge; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and the two captions change; cards and tiles are numerals).
- [ ] Works at narrow width (400-px iframe: the ladder, the equation, the dot rows and three cards fully visible; a 9 + 10 row fits inside the box).
- [ ] Keyboard operable (Tab across the three cards, then — after a correct card — the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong cards or tiles never end the session; the show-me ring always completes each step).
- [ ] No dots are visible before a strategy card is tapped.
- [ ] Tapping "6 + 6 + 1" for 6 + 7 draws two rows of 6 and 7 dots with a bracket labelled 12 and a ringed seventh dot marked "+ 1".
- [ ] Tapping "6 + 6" makes the ringed dot and "+ 1" pulse and then the rows disappear so the child can choose again.
- [ ] Tapping "7 + 7 + 1" shows a dashed empty circle at the end of the 6-row that pulses.
- [ ] Tapping 12 at the answer step makes the bracket's 12 and the "+ 1" pulse together.
- [ ] At the third level "7 + 6" visibly swaps to "6 + 7" and the bracket carries no total.
- [ ] The koala climbs one rung after the card and one after the answer, and starts at the bottom for the next item.
- [ ] Two first-try items in a row bring bigger near-doubles; a wrong tap brings smaller ones.
- [ ] The finish screen lists the ten near-doubles with a filled dot for first-try ones and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible.
