# 185 — Fraction of a Set

## Identity
- Slug: `fraction-of-set`
- Subject / topic: Mathematics / half or a quarter of a SET of objects, found by dealing the set into 2 or 4 equal groups and reading one group
- Age band: `8-9`
- Interaction pattern: `P2` — tap to place (tap a star, then a box; a Check compares the boxes), followed by a P1 tap on the numeral for one group
- Estimated build size: ~490 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (judged on Check because the whole arrangement matters). Content is language-neutral (stars, boxes, numerals and the two symbols 1/2 and 1/4); no `LOCALE_DATA`. Fraction notation is the PROMPT here because the band is 8-9 (F-27); the halving game 183 (6-8) carries no notation and is this game's predecessor.

## Learning
- Objective: Reads a prompt "1/2 of N" or "1/4 of N", deals the N stars into 2 or 4 boxes so that every box holds the same number, and taps the numeral that names how many are in ONE box.
- Prerequisites: Halves a set by dealing (game 183); recognises 1/2 and 1/4 as one of two / four equal parts (games 054, 055, 184); counts to 24; reads numerals to 24.
- Curriculum links: F-112 (fractions: "half" = cut not equal parts; **bigger denominator = bigger** — a quarter of a set judged larger than a half because 4 > 2; the whole changes but parts compared), F-111 (division as sharing — share-among-N before how-many-groups; unequal sharing tolerated; the divisor given as the answer), F-27 (fraction notation at 8-9: US 3.NF, England Y2-3 "find a half / a quarter of a set of objects", France CE2, Spain 3º, Brazil EF03MA09; DE/NL/FI/IT/NO informal → the game stays concrete, the symbol only labels the deal), F-21, F-31 rows "Halves/quarters as equal parts" and "Fraction notation" → 8-9. F-104 (the whole drawn as the container holding the parts), F-43, F-49.
- Common misconceptions (F-112, F-111, F-101), each with this game's response:
  1. **"A quarter is bigger than a half" (4 > 2, so 1/4 of 12 must be more than 1/2 of 12).** Response: L3 asks 1/2 of N and then 1/4 of the SAME N back to back; after the second, both answers are shown as the two box rows one above the other (`ART.compareRow`: 2 boxes of 6 over 4 boxes of 3) for 1500 ms with the two numerals on their boxes — the more boxes, the fewer in each. A tap on the half-of-N tile when a quarter is asked gets the same comparison drawn at once.
  2. **The divisor as the answer (taps 4 for 1/4 of 12; 2 for 1/2 of 14).** Response: the numeral tiles include the divisor; tapping it makes all the boxes `ANIM.pulse` once (there ARE 4 boxes) and then ONE box lifts (`ANIM.lift`) with its badge pulsing — the question is about one box.
  3. **Unequal deal accepted (5, 4, 3 stars in three of four boxes and 0 in the last, or 7 and 5).** Response: Check does not close: every box badge shows its count in `THEME.colour.inkSoft`, the boxes with the most stars ring their extra stars (`ART.leftoverRing`, `ANIM.pulse` — one ring per star above the smallest box) and the emptiest box shows hollow `ART.ghostStar`s for the stars it lacks; Check disables until a star moves.
  4. **Reading the whole or "N minus the divisor" (taps 12, or 8 for 1/4 of 12).** Response: tapping the whole makes all box badges glide to the centre and add up (`ART.sumTag` "3 + 3 + 3 + 3 = 12") for 900 ms; tapping N − d gets the same sum cue — the boxes hold the whole, one box is the answer.
  5. **Off-by-one when reading a box.** Response: one box's stars are counted with badges (`ART.countBadge`, `tone("tap", k)`), the last badge grows (`ANIM.lastBadge`), the box badge pulses.
  6. **Dealing to the wrong number of boxes (dealing 1/4 of 12 into 2 boxes because "half is easier").** Response: cannot happen — the number of boxes is set by the prompt; the boxes are the divisor made visible (`ART.fracCard` shows 1/4 beside FOUR boxes); a child who deals into only two of the four boxes gets the unequal-deal cue with ghost stars in the two empty boxes.

## How it plays
1. **Start screen**: title "Fraction of a Set", the koala (`ART.koala`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 1/2 of 8)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the prompt card (`ART.fracCard`, 200 × 64) at (140, 100) showing `ART.fracText` "1/2" and `ART.ofText` "of 8" (numerals and the word "of" from `S("of")`, 24 px); the sky tray (`ART.tray`, 320 × 74) at (430, 100) holding 8 stars (`ART.star`, 30 px) in a row at y = 100 (pitch 34; 13-24 stars in two rows at y = 88 and y = 112, pitch 26, row 1 holds ceil(N/2)); the koala at (70, 200). Zone B (from y = 270): the boxes (`ART.box`, 130 × 130) — 2 boxes at x = 260 / 460 for a half, 4 boxes (`ART.boxSmall`, 120 × 130) at x = 135 / 285 / 435 / 585 for a quarter — at y = 360; above each box its live badge (`ART.boxBadge`) at (box x, 280) starting at 0. Zone C: Check (`makeButton ok`) at (360, 512), disabled until the tray is empty. Caption `S("sameEach")` ("Same in every box") at (360, 244), 22 px `THEME.colour.inkSoft`.
3. **Dealing**: every star in the tray is a `makeTile` 52 × 52 (transparent body, `ART.star` label); tap a star → it lifts (`ANIM.lift`, `tone("tap")`); tap a box → the star glides (`ANIM.glide`) to the box's next free slot and the box badge counts up (`ANIM.badgeIn`, `tone("tap", n)`, n = the box's new count). **Shortcut**: tapping a box with nothing selected deals the tray's leftmost star to it. A star in a box is still a tile: tap it then another box to move it; tap it then the tray (`makeTile` 320 × 74) to send it back. A full box (8 slots) refuses with `ANIM.nudge`.
4. **Check** (enabled when the tray is empty):
   - **Equal boxes**: `tone("correct")`; all box badges `ANIM.pop` together; `ART.equalMark`s (an "=" between each pair of neighbouring boxes) `ANIM.appear`; the **one-box question**: `ART.oneBox` (a bracket that lifts ONE box — the leftmost — 10 px with `ANIM.lift`) and three numeral tiles (`ART.numeralTile`, 88 × 88) replace Check at y = 512, x = 250 / 360 / 470 (Content lists the tiles), shuffled; `ART.qMark` at (80, 512).
     - **Correct numeral**: `ANIM.pop`, praise pop (rotation), the numeral glides onto the lifted box's badge; `ART.fracCard` shows the answer beside the prompt (`ART.answerText` "= 4"); rail dot fills; next item after 900 ms (boxes clear with `ANIM.rise`, new stars `ANIM.appear`). First-try if no wrong Check and no wrong numeral.
     - **Wrong numeral**: `ANIM.nudge`, `tone("nudge")`, the class-specific cue (Rules); attempt 2; a second wrong → the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
   - **Unequal boxes**: `tone("nudge")`; the rings and ghost stars cue (misconception 3) for 900 ms; badges in `THEME.colour.inkSoft`; Check disables until a star moves. Attempt 2.
   - **Second unequal Check**: the cue, then the show-me: the stars to move gain `ART.showRing`s and the destination boxes pulse; moving them and checking completes the deal as solved-with-help (the one-box question still follows).
5. **Items 2-12**: per Content/Rules. L1 = halves of 4-12 and quarters of 8 and 12; L2 = halves of 14-20 and quarters of 16 and 20 (tray in two rows); L3 = the same N asked as 1/2 then 1/4 back to back (N = 12, 16, 20, 24) with the half-of-N tile as a distractor on the quarter item, and the comparison rows after the second.
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = the twelve items as `ART.fracChip`s (130 × 36, "1/4 of 12 = 3" in 16 px) in three rows of four (y = 320, 364, 408; x = 210 + i × 100), `ART.dotFull` at the left for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 7 minutes (dealing 24 stars ≈ 45 s).

## Art registry
```js
const ART = {
  koala:        { kind: "emoji", value: "🐨", size: 80 },
  star:         { kind: "emoji", value: "⭐", size: 30 },
  fracCard:     { kind: "shape", shape: "roundRect", w: 200, h: 64, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  fracText:     { kind: "text",  value: "", size: 32, font: "display", color: "structure" },       // "1/2" or "1/4"
  ofText:       { kind: "text",  value: "", size: 24, font: "body", color: "ink" },                // S("of") + " " + N
  answerText:   { kind: "text",  value: "", size: 28, font: "display", color: "structure" },       // "= 4" after a solve
  tray:         { kind: "shape", shape: "roundRect", w: 320, h: 74, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 24 },
  box:          { kind: "shape", shape: "roundRect", w: 130, h: 130, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },   // 2-box layout
  boxSmall:     { kind: "shape", shape: "roundRect", w: 120, h: 130, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },   // 4-box layout
  boxBadge:     { kind: "shape", shape: "circle", r: 16, fill: "structure" },        // count 20 px display, color bg
  equalMark:    { kind: "text",  value: "=", size: 32, font: "display", color: "structure" },
  oneBox:       { kind: "shape", shape: "roundRect", w: 146, h: 146, stroke: "accent", strokeWidth: 4, radius: 20 },   // bracket around the ONE box the question is about
  qMark:        { kind: "text",  value: "?", size: 40, font: "display", color: "structure" },
  leftoverRing: { kind: "shape", shape: "circle", r: 19, stroke: "accent", strokeWidth: 4 },    // around a star above the smallest box's count
  ghostStar:    { kind: "shape", shape: "circle", r: 13, stroke: "accent", strokeWidth: 3 },    // a hollow slot in an emptier box
  sumTag:       { kind: "text",  value: "", size: 26, font: "display", color: "structure" },     // "3 + 3 + 3 + 3 = 12"
  countBadge:   { kind: "shape", shape: "circle", r: 12, fill: "accent" },           // numeral 15 px display inkOnAccent
  compareRow:   { kind: "shape", shape: "roundRect", w: 600, h: 70, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 12 },   // two rows: the half deal above the quarter deal, drawn small (boxes 50 × 50) with their numerals
  numeralTile:  { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 40 px
  showRing:     { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  fracChip:     { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Box slots (relative to the box centre, pitch 30, up to 8 per box in 4-box mode / 12 per box in 2-box mode): 2-box → a 4 × 3 grid, columns x = −45, −15, 15, 45, rows y = −30, 0, 30, filled row-major; 4-box → a 2 × 4 grid, columns x = −15, 15, rows y = −45, −15, 15, 45. A quarter of 24 = 6 per box fits the 2 × 4 grid; a half of 24 = 12 fills the 4 × 3 grid.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=10", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "star selected; the ONE box for the question; the box in the divisor cue" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "star to a box slot / across / back to the tray; numeral to the badge; badges to the centre for the sum cue (x,y set at call)" },
  badgeIn:   { scale: 1.3, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a box badge when its count changes" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused placement; a wrong numeral tile" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "rings and ghost stars; all boxes in the divisor cue; a box badge after a count cue" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "rings, ghosts, sumTag, compareRow and count badges after a cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "equal marks, numeral tiles, qMark, compareRow, answerText, new stars (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "all box badges on an equal Check; the correct numeral tile" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last count badge in the box count cue" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "stars, badges and marks clearing between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "rings on the stars to move / on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```
No flashing: `showMe` at 1 Hz; every cue is one continuous motion.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌─ 1/4 of 12 ─┐ (140,100)      ( * * * * * * * * * * * * )  │
      │  └────────────┘                  tray (430,100)               │  zone A
      │  koala (70,200)     "Same in every box" (360,244)             │
260   ├──────────────────────────────────────────────────────────────┤
      │      (3)        (3)        (3)        (3)     badges y=280    │
      │   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐                  │  zone B
      │   │ * *  │ = │ * *  │ = │ * *  │ = │ * *  │   boxes y=360     │
      │   │ *    │   │ *    │   │ *    │   │ *    │   x=135/285/435/585│
      │   └──────┘   └──────┘   └──────┘   └──────┘   (120×130)       │
480   ├──────────────────────────────────────────────────────────────┤
      │  [?] (80,512)   [ 3 ] [ 4 ] [ 12 ]  y=512  (replaces OK)     │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Two-box items use `ART.box` at x = 260 / 460. Fixed layout, FIT scaling. `ART.compareRow` is drawn at (360, 244) over the caption during the L3 comparison; `ART.sumTag` at (360, 244) during the sum cue.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.fracCard` at (140, 100) with `ART.fracText` at (90, 100) and `ART.ofText` right of it from x = 120; `ART.answerText` at (140, 140) after a solve. `ART.tray` at (430, 100) — a `makeTile` 320 × 74 so a box star can be sent back; tray stars: `makeTile` 52 × 52 with transparent body and `ART.star` as label.
- Boxes: `makeTile` 130 × 130 (`ART.box`) or 120 × 130 (`ART.boxSmall`) at y = 360; placed stars are re-parented tiles at the box slots (30-px glyphs at 30-px pitch — a mis-tap selects a neighbouring star in the same box, equally valid). `ART.boxBadge` at (box x, 280) with the count in `THEME.colour.bg` 20 px `THEME.font.display`. `ART.equalMark`s at the midpoints between neighbouring boxes at y = 360. `ART.oneBox` around the leftmost box during the question.
- Cue elements: `ART.leftoverRing` over a star; `ART.ghostStar` in an empty slot; `ART.sumTag` at (360, 244); `ART.countBadge` at a star's (+14, −14); `ART.compareRow` at (360, 244) holding two mini rows (2 boxes of 50 × 50 with their numeral, then 4 boxes of 50 × 50 with theirs).
- Zone C: Check `makeButton` `ok` at (360, 512), alpha 0.5 while disabled; after an equal Check, three `makeTile` 88 × 88 (`ART.numeralTile`, numeral 40 px) at x = 250 / 360 / 470 and `ART.qMark` at (80, 512); `ART.showRing` behind the correct tile.
- Caption `S("sameEach")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 244). `ART.koala` at (70, 200).
- Tap floors: stars 52, boxes ≥ 120, tray 320 × 74, numerals 88, OK 220 × 72 — all ≥ 56; gaps ≥ 30 between boxes. Tab order: tray stars left to right, the boxes left to right, the tray, then OK (or the numeral tiles).

## Content
Language-neutral except `of` (one word, translated with the game). Items as (fraction of N; boxes; answer; numeral tiles). Tiles always include the answer; the correct tile's slot is shuffled and never repeats twice running (§13).
- **L1** (2 boxes for halves of 4-12; 4 boxes for quarters of 8 and 12; tiles = answer, divisor, whole): (1/2 of 8; 2; 4; 4, 2, 8) · (1/2 of 6; 2; 3; 3, 2, 6) · (1/4 of 8; 4; 2; 2, 4, 8) · (1/2 of 10; 2; 5; 5, 2, 10) · (1/4 of 12; 4; 3; 3, 4, 12) · (1/2 of 12; 2; 6; 6, 2, 12) · (1/2 of 4; 2; 2; 2, 4, 3)
- **L2** (tray in two rows; tiles = answer, answer ± 1, N − divisor): (1/2 of 14; 2; 7; 7, 6, 12) · (1/4 of 16; 4; 4; 4, 5, 12) · (1/2 of 16; 2; 8; 8, 9, 14) · (1/4 of 20; 4; 5; 5, 4, 16) · (1/2 of 18; 2; 9; 9, 8, 16) · (1/2 of 20; 2; 10; 10, 11, 18) · (1/4 of 12; 4; 3; 3, 2, 8)
- **L3** (the same N as 1/2 then 1/4 back to back; the quarter item's tiles = answer, half-of-N, divisor): (1/2 of 12; 2; 6; 6, 2, 12) then (1/4 of 12; 4; 3; 3, 6, 4) · (1/2 of 16; 2; 8; 8, 2, 16) then (1/4 of 16; 4; 4; 4, 8, 2) · (1/2 of 20; 2; 10; 10, 2, 20) then (1/4 of 20; 4; 5; 5, 10, 4) · (1/2 of 24; 2; 12; 12, 2, 24) then (1/4 of 24; 4; 6; 6, 12, 4)

Play list of 12 per Rules; shuffle within level; L3 pairs stay adjacent and in half-then-quarter order; no N repeats consecutively except within an L3 pair.

Worked example: item 1 (1/2 of 8) deals 4 and 4, Check → "=", taps 4 → first-try · item 2 (1/4 of 12) deals 3, 3, 3, 3 by tapping the boxes in turn, Check, taps 4 (the number of boxes) → all four boxes pulse, then one lifts with its badge pulsing; taps 3 → helped · item 3 (1/2 of 10) first-try · item 4 (1/2 of 6) first-try → L2 · item 5 (1/4 of 16) deals 5, 5, 4, 2, Check → the two 5-boxes ring one star each, the 2-box shows two hollow slots; moves two stars, Check → "="; taps 4 → helped → L1 · items 6-7 first-try → L2 · items 8-9 first-try → L3 · item 10 (1/2 of 16) first-try, then item 11 (1/4 of 16) taps 8 (the half) → the comparison rows: 2 boxes of 8 above 4 boxes of 4; taps 4 → helped · item 12 first-try → Finish shows twelve chips.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try items → next level (cap L3). First-try = equal on the first Check AND the answer on the first numeral tap.
- Adaptation: a wrong Check or a wrong numeral on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1); an L3 pair is never split by a level change (the quarter item always follows its half).
- What happens on a correct answer: equal Check → `tone("correct")`, badges `ANIM.pop`, equal marks, the one-box bracket and the numeral tiles; correct numeral → `ANIM.pop`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try only), the numeral glides to the badge, `ART.answerText` on the card, rail dot, next item after 900 ms (after an L3 quarter item the `ART.compareRow` shows for 1500 ms first).
- What happens on a wrong answer (per anticipated mistake):
  - Unequal boxes on Check (unequal sharing / boxes left empty): `tone("nudge")`; extra stars ringed on the fuller boxes, hollow slots in the emptier ones, badges shown; Check disables until a star moves. Second unequal Check → show-me rings on the stars to move and the destination boxes pulsing.
  - The divisor tapped (2 or 4): nudge + tone; all boxes pulse once, then ONE box lifts with its badge pulsing.
  - The whole, or N − divisor, tapped: nudge + tone; the badges glide to the centre and `ART.sumTag` shows "a + a (+ a + a) = N" for 900 ms, then return.
  - Half-of-N tapped on a quarter item (bigger denominator = bigger): nudge + tone; `ART.compareRow` shows 2 boxes of the half above 4 boxes of the quarter for 1500 ms.
  - Answer ± 1 tapped: nudge + tone; the lifted box's stars are counted with badges and rising tones; the box badge pulses.
  - A full box tapped as a destination: the star springs back; not an attempt.
- Retry behaviour: dealing — attempt 1 → attempt 2 after the ring cue → attempt 3 with the show-me rings; numeral — attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4 in either step.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fraction of a Set"; `sameEach` = "Same in every box"; `of` = "of" (the card reads "1/4 of 12" as symbol + `S("of")` + numeral; the translation step supplies the connective for each language).

## Sound
`tone("tap")` on selecting a star; `tone("tap", n)` when a star lands in a box (n = that box's new count, so equal boxes end on the same pitch — F-213); `tone("tap", k)` per badge in the count cue; `tone("correct")` on an equal Check; `tone("nudge")` on an unequal Check or a wrong numeral; `tone("finish")` once. Silent under `?sound=off`; badges, rings and marks show everything the tones mark.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, All done, Play again, Menu, praise, the caption and the word "of" change with the picker; the symbols 1/2 and 1/4 do not).
- [ ] Works at narrow width (400-px iframe: the card, the tray with 24 stars in two rows, four boxes with badges and OK visible; nothing overlaps the koala).
- [ ] Keyboard operable (Tab walks the tray stars, the boxes, the tray and OK / the numeral tiles; Enter selects, places and checks).
- [ ] Never auto-starts.
- [ ] No losing state (unequal Checks and wrong numerals never end the session; the show-me rings always lead to completion).
- [ ] A "1/4 of" prompt always shows four boxes; a "1/2 of" prompt two; tapping a box with nothing selected deals the leftmost tray star to it.
- [ ] With 5, 5, 4, 2 in the boxes, OK rings one star on each 5-box and shows two hollow slots in the 2-box; OK dims until a star moves.
- [ ] With 3, 3, 3, 3, OK shows "=" between the boxes, brackets the leftmost box and shows three numeral tiles.
- [ ] Tapping 4 for 1/4 of 12 pulses all four boxes then lifts one; tapping 12 shows "3 + 3 + 3 + 3 = 12"; tapping 2 counts the box's stars with badges to 3.
- [ ] At the third level "1/2 of 16" is followed by "1/4 of 16", and tapping 8 on the quarter item shows two boxes of 8 above four boxes of 4.
- [ ] Two first-try items in a row bring bigger sets; a wrong Check or numeral brings smaller ones (an L3 pair is never split).
- [ ] The finish screen lists twelve chips like "1/4 of 12 = 3" with filled dots for unaided ones; no score, no time.
- [ ] With `?sound=off` nothing is audible; with sound on, equal boxes play the same note on their last star.
