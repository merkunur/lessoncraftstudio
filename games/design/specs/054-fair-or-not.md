# 054 — Fair or Not

## Identity
- Slug: `fair-or-not`
- Subject / topic: Mathematics / halves as two EQUAL parts (a cut is only a half if the two pieces match)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three cut shapes; tap the one cut into two equal halves)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (shapes and cuts); no `LOCALE_DATA`. No fraction notation appears anywhere (F-27: halves as equal parts, no symbols, at 6-8).

## Learning
- Objective: Chooses, from three shapes each cut into pieces, the one whose cut makes two equal halves, and sees why the others do not when the pieces are laid on top of each other.
- Prerequisites: Recognises the four basic 2D shapes (game 005); understands "same size" by matching. No reading needed; the caption is optional support.
- Curriculum links: F-112 ("half" = cut, not two EQUAL parts — the first fraction misconception; the response is the equal-parts check by overlay), F-27 (halves/quarters of shapes: EN 5, US 6, SE 6, FR 7, BR 7-8, DE/NL/FI informal 6-8 → band 6-8 as sharing without notation), F-21, F-31 row "Halves/quarters as equal parts (no notation)" — conservative 7-8, earliest 5 → 6-8 (US 1.G.A.3 "partition circles and rectangles into two … equal shares"; England Y1 "recognise, find and name a half as one of two equal parts"; Germany Klasse 2 "Hälfte" informal; France CE1 "moitié"; Netherlands groep 4 "de helft"; Spain 1º ciclo "mitad"; Brazil EF02MA — "metade"; Sweden förskoleklass/åk 1 "del av helhet"; Finland grade 2 informal).
- Common misconceptions (F-112, F-115), each with this game's response:
  1. **Any cut makes halves ("I cut it, so these are halves").** Response: when the child taps a shape whose cut is off-centre, the two pieces separate (`ANIM.split`) and the smaller piece turns over onto the larger one (`ANIM.flipOver` — a half turn about the middle of the cut); the strip of the larger piece that is not covered shows as `ART.overhang` (its outline in the accent colour) for 900 ms. Nothing is said: the overhang IS the unfairness.
  2. **Only an upright, vertical cut counts (a diagonal cut "isn't a half").** Response: from L2 the fair shape is often cut diagonally or horizontally; on a correct tap the same overlay plays and the pieces match exactly, with `ART.equalMark` ("=") appearing between the two positions — the child sees that a diagonal cut also makes two matching pieces.
  3. **More pieces = fairer ("it's cut into three equal bits, that's fair").** Response: L3 includes a shape cut into three EQUAL strips as a distractor; tapping it counts the pieces (`ART.countBadge` 1, 2, 3 with `tone("tap", k)`) and the prompt icon (`ART.halfIcon`, a shape in two pieces) pulses — equal, but not TWO, so not halves.
  4. **A near-miss cut looks fair (45 / 55).** Response: L3 uses cuts at 42 % / 58 % of the width; the overlay makes an 8 % overhang visible on tap even when the eye cannot judge it, and the fair shape at L3 is always available to compare by the same overlay after the item is solved (tapping the solved fair shape replays its matching overlay).
  5. **Choosing by shape or colour instead of by the cut.** Response: within one item all three candidates are the SAME shape at the SAME size and the same tint; only the cut differs. The tint is chosen per item from three cream/teal tokens so colour never marks the fair one.

## How it plays
1. **Start screen**: title "Fair or Not", the frog (`ART.frog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: three bars)**: rail of 10 dots (§6). Zone A: the frog at (110, 170) with a speech bubble (`ART.bubble`) at (110, 96) holding `ART.halfIcon` (a small bar cut fairly in two, the two pieces slightly apart with `ART.equalMark` between them — "two the same, please"); centred in zone A, two empty plates (`ART.plate`, r 40) at (300, 180) and (420, 180) — the destination for the fair halves. Zone B: three candidate tiles (`makeTile` 180 × 120, transparent fill, `ART.candidateTile` tokens) at y = 370, x = 150 / 360 / 570 (pitch 210). On each tile a bar (`ART.bar`, 160 × 70) drawn as two pieces (`ART.pieceRect` ×2) with a visible cut line (`ART.cutLine`) between them: tile A cut at 50 % (fair), tile B at 30 %, tile C at 70 % — positions shuffled. Caption `S("whichFair")` ("Which one is cut in half?") at (360, 290), 24 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Answering**: the child taps a tile.
   - **Correct (the fair cut)**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the overlay plays as confirmation: the two pieces separate (`ANIM.split`), the right piece flips over onto the left (`ANIM.flipOver`) and covers it exactly, `ART.equalMark` appears above the tile (`ANIM.appear`); then the pieces glide (`ANIM.glide`) one to each plate in zone A and sit there; praise pop (`GameCore.showPraise`, next key in rotation); rail dot fills; after 900 ms the next item builds (plates clear with `ANIM.rise`, new candidates `ANIM.appear`). First-try correct.
   - **Wrong (an off-centre cut)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the **overlay**: the pieces split, the smaller flips over onto the larger, the uncovered part of the larger piece shows `ART.overhang` (pulsing once via `ANIM.pulse`), 900 ms; then the small piece flips back and the pieces close. During the overlay all tiles are disabled; they re-enable after. Attempt 2.
   - **Wrong (the three-equal-strips distractor, L3)**: nudge and tone; then the three pieces separate slightly and are badged 1, 2, 3 (`ART.countBadge`, `tone("tap", k)`, 300 ms apart) while `ART.halfIcon` in the bubble pulses (`ANIM.pulse`); after 900 ms the badges fade and the pieces close. Attempt 2.
   - **Wrong on attempt 2**: the cue again, and the fair tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the halves go to the plates; no praise pop).
4. **Items 2-10**: per Content/Rules. L1 bars with obvious offsets (30 / 70 %); L2 squares, where the fair cut may be vertical, horizontal or DIAGONAL and the unfair cuts run from a corner to the midpoint of the opposite side (a triangle and a quadrilateral); L3 circles cut by a diameter (fair) or a chord (unfair), bars with near-miss cuts (42 / 58 %), and the three-equal-strips distractor.
5. **Finish**: `t("all_done")` (360, 110); the frog (360, 200) `ANIM.celebrate`; the summary = the ten fair shapes the child found, drawn small (`ART.miniShape`, 48 × 30) with their cut lines in two rows of five from y = 330, in play order — a row of true halves, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  frog:          { kind: "emoji", value: "🐸", size: 96 },
  bubble:        { kind: "shape", shape: "roundRect", w: 140, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  halfIcon:      { kind: "shape", shape: "rect", w: 26, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // drawn twice, 8 px apart, inside the bubble: two matching pieces
  equalMark:     { kind: "text",  value: "=", size: 28, font: "display", color: "structure" },
  plate:         { kind: "shape", shape: "circle", r: 40, fill: "surface", stroke: "line", strokeWidth: 2 },
  candidateTile: { kind: "shape", shape: "roundRect", w: 180, h: 120, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 14 },   // invisible tile body; selected look = a structure 3 px rounded outline
  bar:           { kind: "shape", shape: "rect", w: 160, h: 70, stroke: "structure", strokeWidth: 3 },      // outline of the whole bar (L1, L3 bars)
  square:        { kind: "shape", shape: "rect", w: 110, h: 110, stroke: "structure", strokeWidth: 3 },     // outline of the whole square (L2)
  circle:        { kind: "shape", shape: "circle", r: 55, stroke: "structure", strokeWidth: 3 },            // outline of the whole circle (L3)
  pieceRect:     { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // one piece; points set per item (rect or square pieces, triangles, quadrilaterals)
  pieceArc:      { kind: "shape", shape: "arc", r: 55, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },            // one circle segment: startDeg/endDeg set per item, closed by the chord
  cutLine:       { kind: "shape", shape: "line", w: 3, stroke: "ink", strokeWidth: 3 },                     // the cut, drawn over the pieces; length and angle set per item
  overhang:      { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 4 },        // outline of the uncovered part of the larger piece; points computed as (larger piece) minus (flipped smaller piece)
  countBadge:    { kind: "shape", shape: "circle", r: 14, fill: "structure" },      // numeral 18 px display, color bg
  showRing:      { kind: "shape", shape: "roundRect", w: 192, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniShape:     { kind: "shape", shape: "rect", w: 48, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1 },   // finish summary; a 1-px ink cut line drawn at the item's fair position
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Piece geometry (all coordinates relative to the shape's centre on its tile): a bar cut at fraction f of its width has pieces [−80, −35]…[−80 + 160f, 35] and [−80 + 160f, −35]…[80, 35]; a square cut vertically/horizontally at f likewise on 110; a square cut diagonally has two triangles (−55,−55)(55,−55)(55,55) and (−55,−55)(−55,55)(55,55); a corner-to-midpoint cut has the triangle (−55,−55)(55,−55)(55,0) and the quadrilateral (−55,−55)(55,0)(55,55)(−55,55); a circle cut by a line at angle θ through the centre has two `ART.pieceArc` halves (θ → θ + 180°, θ + 180° → θ); a chord at distance 20 from the centre gives the two segments with the chord's end angles. The overhang polygon for a straight cut through a centrally symmetric shape is the part of the larger piece beyond the flipped smaller piece — for a bar cut at 30 % it is the middle 40 % strip; the builder computes it as the larger piece clipped to the band between the cut and its mirror about the shape's centre. Fill tint per item is chosen from `structureSoft`, `surface2`, `bg` (never a cue).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the fair tile tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile tapped" },
  split:     { x: "+=10", duration: 200, ease: "Sine.Out", trigger: "each piece moves 10 px away from the cut along the cut's normal (the sign set per piece at call)" },
  flipOver:  { angle: 180, duration: 500, ease: "Sine.InOut", trigger: "the smaller piece rotates a half turn about the midpoint of the cut (container pivot set at call); yoyo back after the hold in the wrong case" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the overhang outline; the halfIcon in the bubble during the three-pieces cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "equalMark; new candidates (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "count badges and overhang after a cue" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "each fair half to its plate in zone A (x,y set at call)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "plates clearing between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the fair tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```
No flashing: `showMe` at 1 Hz; the overlay is one continuous half turn.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bubble [▮=▮] (110,96)                                         │
      │  frog (110,170)         ( )  ( )   plates (300,180) (420,180)  │  zone A
260   ├──────────────────────────────────────────────────────────────┤
      │           "Which one is cut in half?" (360,290)              │
      │   ┌───────┐        ┌───────┐        ┌───────┐   tiles y=370   │  zone B
      │   │ ▮ │▮▮ │        │ ▮▮│▮▮ │        │ ▮▮▮│ ▮ │   x=150/360/570  │
      │   └───────┘        └───────┘        └───────┘   (180×120)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The flipped piece never leaves its own tile (its rotation pivot is on the cut, inside the tile).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.frog` (110, 170); `ART.bubble` (110, 96) with two `ART.halfIcon`s and `ART.equalMark` inside; `ART.plate`s at (300, 180) and (420, 180).
- Candidate tiles: `makeTile` 180 × 120 with `ART.candidateTile` tokens (the body is invisible; `selectedStroke: THEME.colour.structure` 3 px draws the chosen outline); inside each, the whole-shape outline (`ART.bar` / `ART.square` / `ART.circle`) and the pieces (`ART.pieceRect` / `ART.pieceArc`) with `ART.cutLine` on top. Each piece is its own container so it can split and flip.
- `ART.overhang` drawn over the larger piece during a wrong overlay; `ART.equalMark` at the tile's (0, −70) during a correct overlay; `ART.countBadge`s at each piece's centre for the three-pieces cue.
- `ART.showRing` around the fair tile. Caption `S("whichFair")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- Tap floors 180 × 120 ≥ 56; gaps 30. Tab order: the three tiles left to right. While a cue plays (≈ 1.6 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral. Items as (shape; the three cuts, F = fair). Cut positions are fractions of the width for vertical cuts (v), of the height for horizontal (h); "diag" = corner to opposite corner; "corner-mid" = corner to the midpoint of the opposite side; "diam θ" = a line through the circle's centre at θ degrees; "chord θ d" = a chord parallel to diam θ at distance d px; "thirds" = two cuts at 1/3 and 2/3.
- **L1** (bars, vertical cuts, obvious offsets): (bar; v 50 F, v 30, v 70) · (bar; v 50 F, v 25, v 65) · (bar; v 50 F, v 35, v 75) · (bar; v 50 F, v 30, v 60)
- **L2** (squares; fair cut may be vertical, horizontal or diagonal; unfair = off-centre or corner-mid): (square; diag F, v 30, corner-mid) · (square; h 50 F, v 35, corner-mid) · (square; v 50 F, h 30, diag-mirror corner-mid) · (square; diag F, h 65, v 30) · (square; h 50 F, corner-mid, v 70)
- **L3** (circles; near-miss bars; the three-strips distractor): (circle; diam 90 F, chord 90 20, chord 0 22) · (circle; diam 45 F, chord 45 18, chord 135 24) · (bar; v 50 F, v 42, v 58) · (bar; v 50 F, thirds, v 40) · (circle; diam 0 F, chord 0 20, chord 90 26) · (bar; v 50 F, thirds, v 60)

Play list of 10 per Rules (L1 4 items, then L2/L3 as the child advances; if a level pool is exhausted it is reshuffled). The fair tile's position is shuffled per item and never the same slot twice running (§13); the fill tint per item is random from the three tokens.

Worked example: item 1 (bar 30/50/70) first-try · item 2 first-try → L2 · item 3 (square; diag F) taps the corner-mid cut → its triangle flips onto the quadrilateral and the uncovered strip glows; then taps the diagonal (helped) · item 4 (square; h 50 F) first-try · item 5 first-try → L3 · item 6 (bar; thirds distractor) taps the thirds → badges 1, 2, 3, the bubble icon pulses; then the fair bar (helped) · items 7-10 with no misses → Finish shows ten small halved shapes.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the matching overlay with `ART.equalMark`, the halves glide to the plates, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Off-centre cut chosen (any cut = a half): `ANIM.nudge`, `tone("nudge")`, then the split-and-flip overlay with the `ART.overhang` outline pulsing for 900 ms, then the pieces return.
  - Three equal strips chosen (more pieces = fairer): nudge, tone, the pieces are badged 1, 2, 3 with rising tones and the bubble's two-piece icon pulses; badges fade.
  - Near-miss cut chosen (42 / 58): the same overlay; the thin overhang strip is outlined in the accent colour at 4 px so it reads even when small.
- Retry behaviour: attempt 1 unaided → attempt 2 after the overlay → attempt 3 with the show-me ring on the fair tile; the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fair or Not"; `whichFair` = "Which one is cut in half?". No fraction notation, no other text.

## Sound
`tone("correct")` on the fair tile; `tone("nudge")` on a wrong tile; `tone("tap", k)` per badged piece in the three-pieces cue; `tone("tap")` when a flipped piece lands; `tone("finish")` once. Silent under `?sound=off`; no audio files. The overhang outline carries the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the frog, both plates and all three candidate tiles visible; the flipped piece stays inside its tile).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks; plates and the frog are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Tapping a bar cut at 30 % makes the small piece flip onto the big piece and a coral outline shows the uncovered strip.
- [ ] Tapping the fair bar makes the two pieces flip together, match, show "=", and go to the two plates.
- [ ] At level 2 a square cut corner-to-corner is accepted as fair and its two triangles match on the flip.
- [ ] At level 3 a bar cut into three equal strips is refused with badges 1, 2, 3 and the bubble icon pulsing.
- [ ] At level 3 a circle cut off-centre shows a crescent-shaped overhang; a circle cut through the middle at any angle is accepted.
- [ ] Within one item all three shapes are the same shape, size and colour; only the cut differs.
- [ ] Two first-try corrects in a row bring squares then circles; a wrong tap brings bars again.
- [ ] The finish screen shows ten small halved shapes and no score.
- [ ] Tapping the already-solved fair shape at level 3 replays its matching overlay and changes nothing else.
- [ ] No fraction symbol (1/2, ½) appears anywhere on any screen.
- [ ] With `?sound=off` nothing is audible.
