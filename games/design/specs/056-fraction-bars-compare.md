# 056 — Fraction Bars

## Identity
- Slug: `fraction-bars-compare`
- Subject / topic: Mathematics / comparing two unit fractions of the same whole (which is bigger, 1/4 or 1/8?)
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (two fraction tiles; tap the bigger)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (bars and fraction numerals); no `LOCALE_DATA`.

## Learning
- Objective: Chooses the larger of two unit fractions by comparing the shaded piece of two bars of the same whole, and explains the choice by seeing the smaller piece fit inside the larger.
- Prerequisites: Names halves, quarters and thirds of a shape (games 054/055); reads the notation 1/n as "one of n equal parts" (introduced on the tiles here with the bar always alongside, never alone at L1-L2).
- Curriculum links: F-112 ("bigger denominator = bigger" is the central fraction misconception; the response is to compare bars of the same whole), F-27 (formal notation and comparison at 8-9 only: FR 7, EN 6-7, US 8, SE 9, ES/BR 8-10; DE/NL/FI/IT/NO not before 9-10 — market-conditional, which is why the bar is always present as the primary representation), F-21, F-31 row "Fraction notation, compare, number line" — conservative 8-9 → 8-9 (US 3.NF.A.3.d "compare two fractions with the same numerator … by reasoning about their size"; England Y3 "compare and order unit fractions"; France CE2 "fractions simples"; Spain 2º ciclo; Brazil EF04MA09; Sweden åk 3 "enkla bråk"; Germany/Netherlands/Finland/Italy/Norway informal at this age — the bars carry the game where the notation is not yet taught).
- Common misconceptions (F-112), each with this game's response:
  1. **Bigger denominator = bigger fraction ("8 is more than 4, so 1/8 is bigger").** Response: on that tap the tile nudges and the bar with the bigger denominator SPLITS piece by piece (`ANIM.splitPiece`, one part at a time with `ART.pieceBadge` 1 … 8 and `tone("tap", k)`): more pieces, and each visibly smaller; then the 1/8 piece glides up (`ANIM.overlay`) onto the 1/4 piece and fits inside it with room to spare, the spare shown as `ART.overhang`. The comparison is enacted as size, not stated as a rule.
  2. **Comparing the numerals only, ignoring the whole.** Response: both bars are always the same length and drawn one above the other, left-aligned at L1-L2, so the pieces are directly comparable; the `ART.wholeBracket` spans both bars with the label `S("sameWhole")` shown once at L1.
  3. **The whole changes but the parts are compared (a longer 1/8 bar "beats" a short 1/4 bar).** Response: this game never varies the whole (F-112: vary wholes only at 8-9 and only deliberately); the bracket makes the shared whole explicit. L3 moves the shaded piece away from the left end so the child compares SIZE, not alignment, but the bars stay equal.
  4. **Reading the fraction as two numbers (1 and 8).** Response: the tile shows the notation with the bar of the same fraction as a mini bar (`ART.miniBar`) under it at L1-L2, so "1/8" is always seen next to "one of eight"; L3 withdraws the mini bar from the tiles (cue fading, F-46) while the big bars remain in zone A.
  5. **Guessing by position (the top bar is bigger).** Response: which fraction is drawn on top is shuffled per item, and the tiles' order is shuffled independently of the bars' order, so neither position predicts the answer (§13).

## How it plays
1. **Start screen**: title "Fraction Bars", the mouse (`ART.mouse`) at (360, 200), Start, picker.
2. **Item 1 (L1: 1/2 vs 1/4)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: two bars (`ART.barOutline`, 360 × 52) at (380, 120) and (380, 196), each divided into its denominator's equal parts by `ART.partLine`s, with the first part shaded (`ART.piece`); left of each bar its fraction (`ART.fracNum` over `ART.fracBar` over `ART.fracDen`, 30 px numerals, a 36 × 3 bar) at x = 150; `ART.wholeBracket` (a thin bracket spanning the bars' full width) at y = 236 with `S("sameWhole")` ("same whole") 16 px beneath at L1 only; the mouse at (60, 158). Zone B: two tiles (`ART.fracTile`, 160 × 120) at y = 380, x = 250 / 470, each showing its fraction notation (30 px) and, at L1-L2, `ART.miniBar` (a 120 × 20 bar with the matching part shaded) beneath. Zone C: empty (praise pops). Caption `S("whichBigger")` ("Which is bigger?") at (360, 290), 22 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Answering**: the child taps a tile.
   - **Correct (1/2)**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the confirmation overlay: the smaller piece (1/4) glides (`ANIM.overlay`) onto the larger piece (1/2) and nests inside it, `ART.overhang` outlines the spare part for 900 ms, `ART.gtMark` (">") appears between the bars' fractions with the bigger on the left (`ART.compareLine` "1/2 > 1/4" at (380, 262)); praise pop (next key in rotation); the piece glides back; rail dot fills; after 900 ms the next item builds (bars `ANIM.appear`). First-try correct.
   - **Wrong (1/4)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the enacted cue: the bar with the larger denominator splits piece by piece with badges and rising tones (1 … 4), then its shaded piece glides onto the other bar's shaded piece and nests inside, the spare part outlined (`ART.overhang`, `ANIM.pulse`); 900 ms; the piece returns. During the cue the tiles are disabled; they re-enable after. Attempt 2.
   - **Wrong on attempt 2**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1: halving pairs (1/2 vs 1/4, 1/4 vs 1/8, 1/3 vs 1/6) where one piece is exactly two of the other; L2: neighbouring denominators (1/3 vs 1/4, 1/4 vs 1/5, 1/5 vs 1/6), pieces close in size; L3: denominators 6-10 with the shaded piece placed at a random position along each bar and no mini bar on the tiles.
5. **Re-queue** (F-41): an item wrong on the first tap re-enters after 2 intervening items with the bar order and tile order re-shuffled, then, if wrong again, near the end. The item count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the mouse (360, 200) `ANIM.celebrate`; the summary = the twelve comparisons as chips (`ART.compChip`, 120 × 34, text like "1/4 > 1/8") in three rows of four from y = 320, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  mouse:        { kind: "emoji", value: "🐭", size: 72 },
  barOutline:   { kind: "shape", shape: "rect", w: 360, h: 52, fill: "surface", stroke: "structure", strokeWidth: 3 },
  partLine:     { kind: "shape", shape: "line", w: 2, stroke: "structure", strokeWidth: 2 },      // vertical division lines, length 52
  piece:        { kind: "shape", shape: "rect", w: 0, h: 46, fill: "structure" },                 // the shaded part; w = 360 / denominator − 4, inset 3 px; carries a fillDot
  fillDot:      { kind: "shape", shape: "circle", r: 5, fill: "bg" },                              // on every shaded piece so the state is not colour-only
  pieceBadge:   { kind: "shape", shape: "circle", r: 10, fill: "bg" },                             // 1..d during a split, 12 px display, color structure
  overhang:     { kind: "shape", shape: "rect", w: 0, h: 46, stroke: "accent", strokeWidth: 4 },  // the part of the bigger piece not covered by the smaller; w set at call
  fracNum:      { kind: "text",  value: "1", size: 30, font: "display", color: "ink" },
  fracBar:      { kind: "shape", shape: "rect", w: 36, h: 3, fill: "ink" },
  fracDen:      { kind: "text",  value: "", size: 30, font: "display", color: "ink" },
  wholeBracket: { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 2 },        // a bracket: a 360-px line with 8-px up-ticks at both ends
  gtMark:       { kind: "text",  value: ">", size: 32, font: "display", color: "structure" },
  compareLine:  { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  fracTile:     { kind: "shape", shape: "roundRect", w: 160, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  miniBar:      { kind: "shape", shape: "rect", w: 120, h: 20, fill: "surface2", stroke: "structure", strokeWidth: 2 },   // on a tile at L1-L2; divided and shaded like the big bar
  showRing:     { kind: "shape", shape: "roundRect", w: 172, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  compChip:     { kind: "shape", shape: "roundRect", w: 120, h: 34, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // text 14 px display ink
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Fraction notation is drawn as three ART parts stacked (numerator, bar, denominator) at 30 px — a real vertical fraction, never "1/4" inline on the play screen (the chips on the finish screen use the inline form at 14 px for space). A bar of denominator d has d − 1 `ART.partLine`s at x = −180 + k × 360 / d; the piece is 360 / d wide.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the bigger-fraction tile tapped" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile tapped" },
  splitPiece: { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each part of the larger-denominator bar is re-drawn as a separate piece with its badge (from alpha 0), 220 ms apart" },
  overlay:    { duration: 400, ease: "Sine.InOut", trigger: "the smaller piece glides onto the bigger piece (x,y set at call: left edges aligned at L1-L2, centred at L3), then back after the hold" },
  pulse:      { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the overhang outline during a wrong-answer cue" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "gtMark and compareLine; new bars (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouse" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ mouse   1   ┌─────────┬─────────────────┐  bar 1 (380,120)     │
      │ (60,158) 2  │ ▓▓▓▓▓▓▓ │                 │                      │  zone A
      │         1   ┌────┬────┬────┬────┐        bar 2 (380,196)      │
      │         4   │ ▓▓ │    │    │    │                             │
      │             └──── same whole ─────────┘  bracket y=236         │
      │                 "1/2 > 1/4" (380,262) after the answer        │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "Which is bigger?" (360,290)                 │
      │        ┌──────────┐            ┌──────────┐   tiles y=380     │  zone B
      │        │   1/2    │            │   1/4    │   x=250 / 470     │
      │        │ ▓▓▓▓░░░░ │            │ ▓░░░░░░░ │   (160×120)       │
      │        └──────────┘            └──────────┘                   │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The overlay moves a piece between the two bars only; nothing leaves zone A.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Bars: `ART.barOutline` at (380, 120) and (380, 196) with `ART.partLine`s and one `ART.piece` (plus `ART.fillDot`) each; the fraction stack (`ART.fracNum`, `ART.fracBar`, `ART.fracDen`) centred at x = 150 beside each bar; `ART.wholeBracket` at (380, 236); `S("sameWhole")` 16 px `THEME.colour.inkSoft` at (380, 252) at L1 only; `ART.compareLine` at (380, 262) after an answer (it replaces the bracket label); `ART.gtMark` is drawn inside `ART.compareLine`'s text at runtime.
- `ART.pieceBadge`s on split parts; `ART.overhang` over the uncovered part of the bigger piece.
- Tiles: `makeTile` 160 × 120 (`ART.fracTile` tokens) at (250, 380) and (470, 380); the fraction stack at the tile's (0, −22) and `ART.miniBar` at (0, +36) (L1-L2 only). `ART.showRing` around the correct tile.
- Caption `S("whichBigger")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- `ART.mouse` at (60, 158). Tap floors 160 × 120 ≥ 56; gap 60. Tab order: the two tiles left to right. During a cue (≈ 2.5 s) the tiles are `setEnabled(false)`.

## Content
Language-neutral. Items as (fraction A vs fraction B; bigger). Bar order (which is on top) and tile order are shuffled independently per item; the bigger tile's slot never repeats twice running (§13).
- **L1** (halving pairs; mini bars on tiles; bracket labelled): (1/2 vs 1/4; 1/2) · (1/4 vs 1/8; 1/4) · (1/3 vs 1/6; 1/3) · (1/2 vs 1/8; 1/2) · (1/5 vs 1/10; 1/5) · (1/4 vs 1/2; 1/2)
- **L2** (neighbouring denominators; mini bars on tiles): (1/3 vs 1/4; 1/3) · (1/4 vs 1/5; 1/4) · (1/5 vs 1/6; 1/5) · (1/2 vs 1/3; 1/2) · (1/6 vs 1/8; 1/6) · (1/3 vs 1/5; 1/3)
- **L3** (denominators 6-10; shaded piece at a random position; no mini bars): (1/7 vs 1/8; 1/7) · (1/9 vs 1/10; 1/9) · (1/6 vs 1/9; 1/6) · (1/8 vs 1/10; 1/8) · (1/7 vs 1/10; 1/7) · (1/6 vs 1/7; 1/6)

Play list of 12 per Rules with re-queue; no item repeats except by re-queue. At L3 the shaded part index for each bar is random in 0 … d − 1; the overlay then centres the smaller piece on the bigger one.

Worked example: item 1 (1/2 vs 1/4) first-try · item 2 (1/4 vs 1/8) first-try → L2 · item 3 (1/3 vs 1/4) taps 1/4 → the quarter bar splits 1 … 4 with badges, its piece glides onto the third and the spare sliver is outlined; then taps 1/3 (helped) · item 4 (1/5 vs 1/6) first-try · item 5 (1/2 vs 1/3) first-try → L3 · item 6 = re-queued (1/3 vs 1/4) first-try · items 7-12 L3 with one miss → Finish shows 12 chips, 10 with filled dots.

## Rules
- Item count: 12 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item (after 2 items, then a last look) without changing level.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the nesting overlay with the spare outlined and the comparison line "1/2 > 1/4", praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - The larger denominator chosen (bigger number = bigger piece): `ANIM.nudge`, `tone("nudge")`, the larger-denominator bar splits piece by piece with badges and rising tones, then its piece nests inside the other piece with the spare outlined and pulsing; attempt 2.
  - Position guess (top bar / left tile): the same cue; the bar and tile orders are re-shuffled on the re-queue so the guess cannot be repeated.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 unaided → attempt 2 after the cue → attempt 3 show-me; solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fraction Bars"; `whichBigger` = "Which is bigger?"; `sameWhole` = "same whole". Fractions are numerals.

## Sound
`tone("correct")` on the bigger tile; `tone("nudge")` on the smaller; `tone("tap", k)` per piece as a bar splits (pitch climbs with the piece count — more pieces, higher and more notes); `tone("tap")` when the overlaid piece lands; `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 12", All done, Play again, Menu, praise change with the picker; the caption and "same whole" once translated).
- [ ] Works at narrow width (400-px iframe: both bars with their fraction stacks, the bracket and both tiles visible).
- [ ] Keyboard operable (Tab cycles the two tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Both bars are always the same length, one above the other, with a bracket spanning them.
- [ ] Tapping 1/8 for 1/4 vs 1/8 makes the eighths bar split into eight numbered pieces, then its shaded piece slides onto the quarter piece and fits inside with the spare outlined in coral.
- [ ] Tapping the bigger fraction shows the same nesting and the line "1/4 > 1/8" under the bars.
- [ ] The fraction on top and the tile on the left do not predict the answer across ten items.
- [ ] At the third level the shaded piece is not at the left end and the tiles show only the numerals.
- [ ] A missed item comes back two items later with the bars and tiles re-ordered, and again near the end.
- [ ] Two first-try corrects in a row bring closer denominators; two misses in a row bring halving pairs again.
- [ ] The finish screen lists twelve comparisons with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
