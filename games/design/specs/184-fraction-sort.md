# 184 — Fraction Sort

## Identity
- Slug: `fraction-sort`
- Subject / topic: Mathematics / recognising halves, thirds and quarters as ONE of two, three or four EQUAL parts — and refusing shapes whose parts are not equal
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (tap the shape, then a bin; four bins)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (item stream, bins labelled by ART icons, per-item judgement, 3rd wrong → show-me on the correct bin). Content is language-neutral (shapes, cuts and the three fraction symbols); no `LOCALE_DATA`. Fraction notation (1/2, 1/3, 1/4) is used on the bins because this is an 8-9 game (F-27: notation and comparison at 8-9 only).

## Learning
- Objective: Sorts a stream of shapes, each with one part shaded, into the 1/2, 1/3 and 1/4 bins by counting the EQUAL parts, and puts a shape whose parts are not equal into the "none" bin instead of any fraction bin.
- Prerequisites: Recognises halves as two equal parts (game 054) and quarters (game 055); counts to 4; reads the symbols 1/2, 1/3, 1/4 as "one of two / three / four parts" (introduced in game 056).
- Curriculum links: F-112 ("half" = cut, not two EQUAL parts; bigger denominator = bigger; numerator-only comparison; thirds harder than halves and quarters — the equal-parts check by overlay and the level order halves → quarters → thirds are the researched responses), F-27 (halves/quarters at 5-7; formal notation at 6-8 in EN/FR, 8 in US, 8-10 in ES/BR/SE; DE/NL/FI/IT/NO not before 9-10 → 8-9 band, market-conditional), F-21, F-31 row "Fraction notation, compare, number line" — conservative 8-9 (US 3.NF.A.1 "a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts"; England Y2-3 "recognise, find and name a half / a third / a quarter as one of two / three / four equal parts"; France CE2 "fractions simples"; Spain 3º "fracciones sencillas"; Brazil EF03MA09; Sweden åk 3 "enkla bråk"; Netherlands groep 5 "breuken als deel van een geheel"; Germany Klasse 3 "Bruchteile" informal). F-43 (enacted feedback), F-61 (invalid moves refused).
- Common misconceptions (F-112, F-115), each with this game's response:
  1. **Any shape cut into two with one part shaded is "a half" (equal parts not checked).** Response: when a shape cut 30 / 70 with the small part shaded is put in the 1/2 bin, the shape glides back to the belt and its parts separate (`ANIM.split`); the shaded part's outline copy glides onto the unshaded part (`ANIM.overlayPart`) and the strip it fails to cover is outlined in the accent colour (`ART.overhang`, `ANIM.pulse`) — the parts do not match, so this is not a half; then the "none" bin's icon (`ART.iconNone`) pulses. Nothing is said.
  2. **Counting the shaded part only, or the cuts, instead of the parts ("one shaded, so 1/… of what?"; three cuts → thirds).** Response: on any wrong fraction bin the parts of the shape light one by one with count badges (`ART.countBadge` 1, 2, 3, 4 and `tone("tap", k)`), the shaded part counted LAST so it is seen as one of the total; then the bin whose denominator equals the count pulses.
  3. **Bigger denominator = bigger part (a quarter put in the 1/2 bin because "quarters are more").** Response: the same part-count cue; from L2 the stream alternates a half and a quarter of the SAME shape at the same size so the two shaded parts can be compared by eye — a bin never pulses because a part "looks big", only because the parts number 2, 3 or 4.
  4. **Thirds are hard: a shape in three parts is called a quarter or a half (F-112 "thirds/fifths hard").** Response: thirds enter only at L2 and always in bars first (three equal strips), circles (three sectors) at L3; the part-count cue lands on 3 and the 1/3 bin pulses; every L2/L3 board keeps the 1/3 bin present so thirds are met repeatedly (F-41).
  5. **Near-equal parts accepted as equal (a bar cut 45 / 55, a circle cut by a chord close to the diameter).** Response: L3 includes near-miss shapes; the overlay cue draws the thin `ART.overhang` at 4 px so the mismatch reads even when the eye cannot judge it; the "none" bin is the correct destination, and the show-me on attempt 3 rings it.
  6. **Sorting by shape or shading colour instead of by parts.** Response: shapes (bar, square, circle) and their shading tint are assigned at random per item from three cream/teal tokens; a circle in halves and a bar in halves go to the same bin; tint never predicts the bin.

## How it plays
1. **Start screen**: title "Fraction Sort", the turtle (`ART.turtle`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: a bar in two equal halves, left half shaded)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a conveyor strip (`ART.belt`, a rounded bar across zone A at y = 176) with the turtle at the left end (80, 176); the item — a shape built from its part polygons (`ART.part` ×2, one drawn with the shaded fill) with the whole outline (`ART.outline`) — slides in from the right (`ANIM.slideIn`) to the centre (360, 176) as a `makeTile` 150 × 120 (transparent body; the shape graphic is a child). Zone B: three bins at L1 (`ART.bin`, 150 × 110) at y = 380, x = 180 / 360 / 540, each with its icon on its front — `ART.iconHalf` (a small bar in two equal parts, one shaded, with `ART.fracText` "1/2" beneath), `ART.iconThird` ("1/3"), `ART.iconQuarter` ("1/4") — and a count sub-label (`ART.binCount`, "0"). Caption `S("whichPart")` ("What part is shaded?") at (360, 262), 22 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Sorting**: tap the shape (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The shape glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; a praise pop on every third correct sort and on the last; the rail dot fills; the next shape slides in after 400 ms. First-try if no wrong bin on the item.
   - **Wrong bin**: the shape glides back to the belt centre, `tone("nudge")`; then the enacted cue for the error class (Rules) — the part-count cue for a wrong fraction bin, the overlay cue for an unequal shape put in a fraction bin, the part-count cue ending on the correct bin for an equal shape put in the "none" bin; all bins are `setEnabled(false)` during the cue (≈ 1.8 s). Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin's icon gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the shape there completes the item as solved-with-help.
   - Tapping a bin with no shape selected: the bin's icon `ANIM.pop`s (a harmless preview); nothing else.
4. **Items 2-12**: L1 = bars and squares in halves and quarters (three bins: 1/2, 1/3, 1/4 — the 1/3 bin present but its shapes not yet in the stream, so a quarter is never tempted into a "third" by absence); L2 = four bins (the "none" bin `ART.iconNone` joins at x = 600 and the others move to x = 120 / 280 / 440), thirds in bars, halves and quarters of the same shape alternating, obviously-unequal shapes (30 / 70 bars, a square in one big and three small parts); L3 = circles (sectors), diagonal cuts, near-miss unequal shapes (45 / 55 bars, off-centre chords), thirds in circles.
5. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) `ANIM.celebrate`; the four bins in a row at y = 400 (x = 120 / 280 / 440 / 600, 120 × 90) showing their final counts and, above each, that bin's shapes drawn tiny (`ART.miniShape`, 36 × 24, in a row of up to 5 at y = 330) — the sorted collection is the summary, not a score; optionally `t("question_x_of_y", {n: first-try, total: 12})` at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  turtle:      { kind: "emoji", value: "🐢", size: 72 },
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  outline:     { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 3 },      // the whole shape's outline (bar 140×60, square 100×100) or a circle r 50 (drawn via arc when the item is a circle)
  part:        { kind: "shape", shape: "polygon", points: [], fill: "surface", stroke: "structure", strokeWidth: 2 },   // one part; points set per item; the shaded part uses fill "structureSoft" (or the item's tint token)
  sector:      { kind: "shape", shape: "arc", r: 50, fill: "surface", stroke: "structure", strokeWidth: 2 },            // one circle part: startDeg/endDeg set per item; shaded = the tint fill
  overhang:    { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 4 },        // the uncovered strip of the larger part after the overlay
  countBadge:  { kind: "shape", shape: "circle", r: 13, fill: "structure" },                              // numeral 16 px display, color bg; on each part in turn
  bin:         { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  binNarrow:   { kind: "shape", shape: "roundRect", w: 140, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // four-bin layout (L2-L3)
  iconHalf:    { kind: "shape", shape: "rect", w: 44, h: 22, stroke: "ink", strokeWidth: 2 },             // drawn with a centre cut line and the left part filled structureSoft
  iconThird:   { kind: "shape", shape: "rect", w: 45, h: 22, stroke: "ink", strokeWidth: 2 },             // two cut lines at thirds; the left part filled
  iconQuarter: { kind: "shape", shape: "rect", w: 44, h: 22, stroke: "ink", strokeWidth: 2 },             // three cut lines at quarters; the left part filled
  iconNone:    { kind: "shape", shape: "rect", w: 44, h: 22, stroke: "ink", strokeWidth: 2 },             // one cut line at 30 %; the small part filled; a 2-px accent diagonal bar across the icon (no ✗ glyph — a single slash)
  fracText:    { kind: "text",  value: "", size: 18, font: "display", color: "ink" },                     // "1/2", "1/3", "1/4" under the bin icon; the none bin shows "—"
  binCount:    { kind: "text",  value: "0", size: 20, font: "display", color: "inkSoft" },
  showRing:    { kind: "shape", shape: "roundRect", w: 162, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniShape:   { kind: "shape", shape: "rect", w: 36, h: 24, fill: "structureSoft", stroke: "structure", strokeWidth: 1 },   // finish: one per sorted item above its bin, cut lines in 1-px ink
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Part geometry (relative to the shape centre on its tile): a bar 140 × 60 cut at fractions f1 < f2 … of its width gives parts [−70 + 140 fi, −30] … [−70 + 140 fi+1, 30]; a square 100 × 100 cut in halves vertically / horizontally / diagonally, in quarters as 2 × 2, as four vertical strips, or by both diagonals (four triangles meeting at the centre); a circle r 50 in halves (two 180° sectors at angle θ), thirds (three 120° sectors), quarters (four 90° sectors). Unequal shapes: bar 30 / 70 (small part shaded); bar 45 / 55; bar 20 / 40 / 40 ("three parts", not thirds); square as one 50 × 100 part plus two 50 × 50 parts ("three parts"); square 2 × 2 with the lines at 35 % (four unequal parts); circle cut by a chord 15 px from the centre; circle in sectors of 90° + 135° + 135° ("three parts"). The shading tint per item is chosen at random from `structureSoft`, `surface2`, `bg`; the shaded part is chosen at random among the parts (for unequal shapes the SMALLER part is shaded on half the items and a larger one on the rest).

## Animation registry
```js
const ANIM = {
  slideIn:     { x: 360, duration: 320, ease: "Sine.Out", trigger: "new shape from x = 760 to the belt centre" },
  lift:        { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "shape selected" },
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "shape to a bin / back to the belt (x,y set at call)" },
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct shape; bin icon preview tap" },
  split:       { x: "+=8", duration: 200, ease: "Sine.Out", trigger: "each part moves 8 px away from the shape centre along its own centroid direction (sign per part set at call)" },
  overlayPart: { duration: 500, ease: "Sine.InOut", trigger: "an outline copy of the shaded part glides onto the largest unshaded part (x,y,angle set at call — rotated for sectors and triangles) and holds 900 ms" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "overhang outline; the correct bin's icon after a cue" },
  badgeIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each count badge in turn, 320 ms apart (from alpha 0, scale 0.5)" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges, overlay copy and overhang after a cue; parts re-join with split reversed" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```
No flashing: badges arrive one at a time; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ turtle(80,176) ═══════════ belt y=176 ═══════════ shape enters→│  zone A
      │                     [ ▮ │ ▯ ] shape (360,176) 150×120          │
      │              "What part is shaded?" (360,262)                 │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐  bins y=380  │
      │   │ ▮▯   │     │ ▮▯▯  │     │ ▮▯▯▯ │     │ ▮▯ ⁄  │  L2-L3 x=    │  zone B
      │   │ 1/2  │     │ 1/3  │     │ 1/4  │     │  —   │  120/280/    │
      │   │  0   │     │  0   │     │  0   │     │  0   │  440/600     │
      │   └──────┘     └──────┘     └──────┘     └──────┘  (140×110)   │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L1 uses three bins (`ART.bin`, 150 × 110) at x = 180 / 360 / 540. Fixed layout, FIT scaling. The overlay copy never leaves the shape's tile.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.turtle` (80, 176); `ART.belt` centred (390, 176).
- The item: a `makeTile` 150 × 120 at (360, 176) with transparent body (`fill`/`stroke` = `THEME.colour.bg` tokens); children = the `ART.part`s / `ART.sector`s (each its own container so it can split) with `ART.outline` on top; selected look = `ANIM.lift` + the tile's `selectedStroke` outline (`THEME.colour.structure`, 3 px).
- Bins: `makeTile` with `ART.bin` (L1) or `ART.binNarrow` (L2-L3) tokens; the icon centred at (0, −22), `ART.fracText` at (0, +6), `ART.binCount` at (0, +34). Bin order left to right is FIXED at 1/2, 1/3, 1/4, none (a scale of parts, smallest denominator first); the correct bin varies with the item.
- Cue shapes: `ART.countBadge` at each part's centroid; the overlay copy (an `ART.part` / `ART.sector` with no fill and an accent stroke) over the larger part; `ART.overhang` outlining the uncovered region; `ART.showRing` around the correct bin.
- Caption `S("whichPart")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 262), two lines max.
- Tap floors: shape tile 150 × 120, bins ≥ 140 × 110 (≥ 56). Gaps ≥ 20. Tab order: the shape, then the bins left to right; Enter selects the shape / drops it in a bin.

## Content
Language-neutral. Items as (shape; cut; shaded part; correct bin). "v" = vertical cuts at the listed fractions of the width, "h" = horizontal, "diag" = one or both diagonals, "sect" = circle sectors of the listed degrees, "chord d" = a chord at distance d px from the centre.
- **L1** (bars and squares; halves and quarters; three bins): (bar; v 50; left; 1/2) · (square; v 25 50 75; second; 1/4) · (bar; v 25 50 75; last; 1/4) · (square; h 50; top; 1/2) · (bar; v 50; right; 1/2) · (square; 2 × 2; top-right; 1/4) · (square; diag one; upper; 1/2) · (bar; v 25 50 75; first; 1/4)
- **L2** (four bins; thirds in bars; same-shape half/quarter alternation; obviously-unequal shapes): (bar; v 33 67; middle; 1/3) · (bar; v 50; left; 1/2) · (bar; v 25 50 75; second; 1/4) · (bar; v 30; small; none) · (bar; v 33 67; first; 1/3) · (square; one 50 × 100 + two 50 × 50; the big part; none) · (square; 2 × 2; bottom-left; 1/4) · (square; v 50; right; 1/2) · (bar; v 20 60; first (20 %); none) · (bar; v 33 67; last; 1/3)
- **L3** (circles; diagonal quarters; near-miss unequal; thirds in circles): (circle; sect 180 180 at 45°; upper; 1/2) · (circle; sect 120 × 3; one; 1/3) · (circle; sect 90 × 4; one; 1/4) · (bar; v 45; small; none) · (square; diag both; one triangle; 1/4) · (circle; chord 15; small segment; none) · (circle; sect 90 135 135; the 90° one; none) · (bar; v 33 67; middle; 1/3) · (circle; sect 120 × 3; one; 1/3) · (square; 2 × 2 at 35 %; the small one; none) · (circle; sect 180 180 at 0°; lower; 1/2) · (bar; v 55; large; none)

Play list of 12: start at L1; shuffle within level; levels in order per Rules; at L2 a "half of shape X" is immediately followed by a "quarter of shape X" when both are drawn (the same-shape alternation); no item repeated in a session; the correct bin never repeats more than twice running; the tint per item is random.

Worked example: item 1 (bar 1/2) → 1/2 first-try · item 2 (square 1/4) first-try · item 3 (bar 1/4) first-try → L2 · item 4 (bar 30 / 70, small part shaded) → 1/2 bin: the parts split, the small part's outline glides onto the big part and the uncovered strip glows; then the none bin's icon pulses; → none (helped) · item 5 (bar thirds) → 1/4 bin: parts badged 1, 2, 3 with the shaded one last; the 1/3 bin pulses; → 1/3 (helped) → L1 · item 6 first-try · item 7 first-try · item 8 first-try → L2 · items 9-11 first-try → L3 · item 12 (bar 45 / 55) → 1/2 bin: overlay, a thin coral strip; → none (helped) → Finish shows four bins with their shapes above them.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three: items are quick, ~15 s each.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: shape glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next shape in 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Unequal shape put in a fraction bin (any cut = a fraction): shape returns, `tone("nudge")`, parts split, the shaded part's outline overlays the largest unshaded part, `ART.overhang` pulses 900 ms, parts re-join, then the none bin's icon pulses.
  - Equal shape put in the wrong fraction bin (parts miscounted / "bigger denominator = bigger" / thirds called quarters): shape returns, tone, parts badged 1 … n with rising tones and the shaded part last, then the bin whose denominator is n pulses.
  - Equal shape put in the none bin: shape returns, tone, the same part-count cue; the overlay ALSO plays and matches exactly (no overhang), then the correct fraction bin pulses.
  - Near-miss unequal shape put in a fraction bin (L3): the overlay cue with the 4-px overhang; then the none bin pulses.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4. An item completed after any wrong bin does not count as first-try.
- Finish condition: 12 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fraction Sort"; `whichPart` = "What part is shaded?". The bin labels are the symbols 1/2, 1/3, 1/4 and "—" (drawn as `ART.fracText`), not words.

## Sound
`tone("tap")` on selecting a shape; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` per badged part (the pitch climbs to the denominator — F-213); `tone("tap")` when the overlay copy lands; `tone("finish")` once. Silent under `?sound=off`; the badges and the overhang carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise and the caption change with the picker; the bins read 1/2, 1/3, 1/4, — in every language).
- [ ] Works at narrow width (400-px iframe: belt, shape and all four bins visible and separate).
- [ ] Keyboard operable (Tab: the shape, then the bins left to right; Enter selects the shape / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The bins stay in the order 1/2, 1/3, 1/4, — throughout; the fourth bin appears only from the second level.
- [ ] A bar cut 30 / 70 with the small part shaded, put in the 1/2 bin, splits, overlays and shows a coral strip on the big part; then the — bin's icon pulses.
- [ ] A bar in three equal strips put in the 1/4 bin is badged 1, 2, 3 with the shaded strip last, and the 1/3 bin pulses.
- [ ] A square in four equal quarters put in the — bin is badged 1-4, its overlay matches with no coral strip, and the 1/4 bin pulses.
- [ ] At the third level a circle in three sectors goes to 1/3, a circle cut by an off-centre chord goes to —, and a bar cut 45 / 55 shows a thin coral strip when put in 1/2.
- [ ] Shading colour varies and never predicts the bin; a circle in halves and a bar in halves both go to 1/2.
- [ ] Three first-try corrects in a row bring thirds and the — bin; a wrong bin brings simpler shapes next.
- [ ] The finish screen shows the four bins with their counts and the sorted shapes drawn small above each; no score.
- [ ] With `?sound=off` nothing is audible.
