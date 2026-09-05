# 048 — Array Turn

## Identity
- Slug: `array-turn`
- Subject / topic: Mathematics / commutativity in arrays — R rows of C and C rows of R have the same total
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (the commit is a P1 two-tile choice with a Check)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10 (the reveal is the feedback; a missed item re-queues mirrored, F-41).

## Learning
- Objective: Predicts whether a shown array (R rows of C) and a covered array described by its label (C rows of R, or a different array) have the same total, then watches the array turn and both arrays count themselves.
- Prerequisites: Counts a small array by rows (skip counts in 2s-5s or counts on); reads numerals to 30; has met "groups of" (game 047).
- Curriculum links: F-1, F-26 (arrays are a 6-8 objective everywhere), F-21, F-48 (mirror physical manipulatives — arrays — exactly), F-31 row "Multiplication as groups/arrays" — conservative 8, earliest 5-6 → 6-8 (US 2.OA.C.4 "rectangular arrays" / 3.OA.B.5 commutative property; England Y2 "multiplication of two numbers can be done in any order (commutative)"; Germany Klasse 2 "Tauschaufgaben"; France CE1 "commutativité de la multiplication"; Netherlands groep 4 "omkeren van de keer-som"; Spain 1º ciclo "propiedad conmutativa"; Brazil EF02MA07; Sweden åk 1-3 "kommutativa lagen"; Finland grade 2).
- Common misconceptions (F-110, F-109), each with this game's response:
  1. **Commutativity not seen — "4 rows of 3 is a different amount from 3 rows of 4".** Response: on Check the shown array TURNS a quarter turn in place (`ANIM.turn`) and settles as the covered array's shape while the shutter lifts; both arrays then count row by row with running totals (`ART.rowTotal`, `tone("tap", k)`) and the two totals land equal with `ART.eqGlyph` "=" between them. The same dots, turned — nothing added, nothing removed.
  2. **"More rows means more" (4 rows read as bigger than 3 rows).** Response: the row-by-row count ends on the same total; the child's "different" tile stays visible beside the revealed equality; the item re-queues mirrored (the covered array becomes the shown one).
  3. **"Any two arrays with different rows are different" (2 rows of 6 vs 3 rows of 4 predicted different).** Response: L3 items are equal-total NON-rotations; both count to 12 and "=" appears without a turn — same total, different shape.
  4. **Over-generalising to "always the same" once the turn is learned.** Response: from L1 one third of the items are genuinely different (a row or column added); on the reveal the surplus dots on the larger array are ringed (`ART.extraRing`, `ANIM.pulse`) and `ART.eqGlyph` shows "≠"; a child who taps Same for these sees exactly which dots are extra.
  5. **Rows and columns confused in the label (reads "4 rows of 3" as 3 rows).** Response: every label pairs the numeral with an icon — stacked bars (`ART.rowIcon`) for rows and a dotted row (`ART.dotsIcon`) for the row length — and the array's rows light one at a time so rows are seen as rows.

## How it plays
1. **Start screen**: title "Array Turn", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 rows of 4 → 4 rows of 3)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the left array — 3 × 4 `ART.dot`s (pitch 28) centred at (200, 150) on `ART.gridBack` (190 × 190); its label above at (200, 70): three `ART.rowIcon` bars, "3", then `S("rowsOf")` rendered as "3 rows of 4" in 18 px with four `ART.dotsIcon` dots after the 4. The right array is hidden: `ART.gridBack` at (520, 150) covered by `ART.shutter` (190 × 190, teal) with `ART.shutterGrip`; its label at (520, 70) reads "4 rows of 3" with four bars and three dots. Between them at (360, 150) `ART.queryGlyph` "?". The caption `S("sameTotal")` ("Same total?") at (360, 244), 24 px `THEME.colour.inkSoft`. Zone B: two answer tiles (`ART.answerTile`, 160 × 96) at y = 380, x = 260 and x = 460: the SAME tile shows `ART.sameGlyph` "=" with `S("same")` ("Same") beneath at 20 px; the DIFFERENT tile shows `ART.diffGlyph` "≠" with `S("different")` ("Different"). Tile sides are shuffled per item. Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`); tapping the other switches; Check enables.
4. **Check → Reveal**: the shutter slides up (`ANIM.shutterUp`, 400 ms) uncovering the right array's dots (unlit). If the item is a rotation, the left array's container plays `ANIM.turn` (a quarter turn, 500 ms) at the same time and its dots are then redrawn in the turned shape (4 rows of 3) so the two arrays now match. Then both arrays count: the left array's rows light one by one (`ANIM.rowOn`, 300 ms apart, `ART.rowTotal` at each row's right, `tone("tap", k)`), then the right array's rows the same way; the totals appear beneath each array (`ART.totalText` at (200, 236) and (520, 236), `ANIM.appear`) and `ART.eqGlyph` replaces the "?" with "=" or "≠".
   - **Prediction correct**: the chosen tile `ANIM.pop`s, `tone("correct")`, praise pop (rotation); the owl `ANIM.nod`; rail dot fills; after 1000 ms the arrays clear (`ANIM.rise`) and the next item builds. First-try.
   - **Prediction wrong**: `tone("nudge")`, the chosen tile `ANIM.nudge`s and de-selects; the reveal has already shown the truth; for a "different" item the surplus dots on the larger array gain `ART.extraRing` and pulse; then the correct tile gains `ART.showRing` (`ANIM.showMe`) and the child taps it to close the item (solved-with-help, no praise pop, rail dot fills). The item's MIRROR (the covered array shown, the shown array covered) re-enters the play list after 2 intervening items (F-41).
5. **Items 2-10**: per Content/Rules. L1 = rotations and one-row-added pairs with factors 2-5; L2 = factors to 5 × 6; L3 = equal-total non-rotations (2 × 6 vs 3 × 4) and near-miss differents.
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the ten pairs as `ART.pairChip`s (200 × 36) in two columns of five (x = 220 / 500, y = 320 + i × 44) reading "3 × 4 = 4 × 3" or "3 × 4 ≠ 4 × 4" in 18 px, with a filled `ART.dotFull` at the left for first-try items and a hollow `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  owl:         { kind: "emoji", value: "🦉", size: 64 },
  gridBack:    { kind: "shape", shape: "roundRect", w: 190, h: 190, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  dot:         { kind: "shape", shape: "circle", r: 11, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // lit = fill structure
  shutter:     { kind: "shape", shape: "roundRect", w: 190, h: 190, fill: "structure", radius: 14 },
  shutterGrip: { kind: "shape", shape: "roundRect", w: 56, h: 8, fill: "bg", radius: 4 },
  rowIcon:     { kind: "shape", shape: "rect", w: 22, h: 4, fill: "inkSoft" },       // R stacked bars, 6 px apart, left of the first numeral
  dotsIcon:    { kind: "shape", shape: "circle", r: 3, fill: "inkSoft" },            // C dots in a row, 8 px apart, right of the second numeral
  rowTotal:    { kind: "text",  value: "", size: 18, font: "display", color: "structure" },
  totalText:   { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  queryGlyph:  { kind: "text",  value: "?", size: 44, font: "display", color: "inkSoft" },
  eqGlyph:     { kind: "text",  value: "", size: 56, font: "display", color: "structure" },   // "=" or "≠"
  answerTile:  { kind: "shape", shape: "roundRect", w: 160, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  sameGlyph:   { kind: "text",  value: "=", size: 40, font: "display", color: "structure" },
  diffGlyph:   { kind: "text",  value: "≠", size: 40, font: "display", color: "structure" },
  extraRing:   { kind: "shape", shape: "circle", r: 15, stroke: "accent", strokeWidth: 3 },
  showRing:    { kind: "shape", shape: "roundRect", w: 172, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:    { kind: "shape", shape: "roundRect", w: 200, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Arrays are at most 5 rows × 6 columns at pitch 28 (140 × 168), so every array fits inside the 190 × 190 back with the labels above and totals below.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "answer tile selected" },
  shutterUp: { y: "-=200", alpha: 0, duration: 400, ease: "Sine.In", trigger: "shutter on Check" },
  turn:      { angle: 90, duration: 500, ease: "Sine.InOut", trigger: "left array container on a rotation item; the dots are redrawn in the turned shape when it ends" },
  rowOn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each row's dots switch to the lit fill, 300 ms apart" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "totals, eqGlyph, new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.1, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct tile on a correct prediction" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the chosen tile on a wrong prediction" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "extraRings on the surplus dots" },
  nod:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "owl on a correct prediction" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "arrays and glyphs clearing before the next item" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ≡ 3 rows of 4 ····  (200,70)      ≡ 4 rows of 3 ··· (520,70)│
      │   ┌───────────────┐                 ┌───────────────┐         │
      │   │ o o o o       │        ?        │ ▓▓▓ shutter ▓▓│         │  zone A
      │   │ o o o o       │     (360,150)   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓│         │
      │   │ o o o o       │                 │ ▓▓▓▓ ▬ ▓▓▓▓▓▓│         │
      │   └───────────────┘ (200,150)       └───────────────┘ (520,150)│
      │        12 (200,236)   "Same total?" (360,244)   12 (520,236)  │
260   ├──────────────────────────────────────────────────────────────┤
      │         ┌────────┐            ┌────────┐                      │
      │         │   =    │            │   ≠    │   tiles y=380        │  zone B
      │         │  Same  │            │Different│  x=260 / 460 (160×96)│
      │         └────────┘            └────────┘                      │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.rowTotal`s sit at each array's right edge (x + 100) beside their rows; the "?" at (360, 150) becomes `ART.eqGlyph` on the reveal.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Labels at (200, 70) and (520, 70): `ART.rowIcon` × R stacked at the label's left, the text `S("rowsOf")` with the numerals in 18 px `THEME.font.body` `THEME.colour.ink`, `ART.dotsIcon` × C after the text; `wordWrap` width 220, max two lines.
- `ART.gridBack` at (200, 150) and (520, 150); dots at pitch 28 centred in each; the right back is covered by `ART.shutter` + `ART.shutterGrip` (grip at the shutter's bottom centre) until Check.
- `ART.queryGlyph` / `ART.eqGlyph` at (360, 150); `ART.totalText` at (200, 236) and (520, 236); caption 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 244).
- Answer tiles: `makeTile` 160 × 96 with `ART.answerTile` tokens, the glyph at (0, −14) and the word at (0, +26) in 20 px `THEME.font.body` `THEME.colour.ink`.
- `ART.extraRing` on each surplus dot; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- `ART.owl` at (60, 150) during play (left of the left array), 64 px. Tap floors 160 × 96 ≥ 56; gap 40.
- Keyboard: Tab across the two tiles then OK; Enter selects / checks.

## Content
Language-neutral except three short strings. Items as (shown array R × C; covered array R' × C'; answer). R ≤ 5 and C ≤ 6 for every array.
- **L1** (rotations and one-row/column-added pairs, factors 2-5): (3 × 4; 4 × 3; same) · (2 × 5; 5 × 2; same) · (3 × 4; 4 × 4; different) · (2 × 3; 3 × 2; same) · (4 × 2; 4 × 3; different) · (5 × 2; 2 × 5; same)
- **L2** (factors to 5 × 6): (4 × 5; 5 × 4; same) · (3 × 5; 5 × 3; same) · (3 × 5; 3 × 4; different) · (4 × 4; 4 × 5; different) · (5 × 3; 3 × 5; same) · (4 × 3; 3 × 5; different) · (3 × 6; 3 × 5; different)
- **L3** (equal totals that are NOT rotations; near-miss differents): (2 × 6; 3 × 4; same) · (4 × 3; 2 × 6; same) · (5 × 4; 4 × 5; same) · (3 × 4; 2 × 5; different) · (5 × 2; 3 × 4; different) · (3 × 5; 5 × 3; same) · (4 × 4; 3 × 5; different) · (2 × 5; 5 × 2; same)

Rotation = the covered array is exactly the shown array's rows and columns swapped; only rotation items play `ANIM.turn`. Play list of 10 per Rules with mirrored re-queue; shuffle within level, levels in order; the correct tile's side never repeats twice running; at most two "same" items in a row.

## Rules
- Item count: 10 (re-queued mirrors replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong prediction, or non-first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: reveal (turn if a rotation; both arrays count with running totals; "=" or "≠"), tile `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], owl `ANIM.nod`, rail dot, next item after 1000 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and the tile's `ANIM.nudge`):
  - "Different" for a rotation: the turn plays, both totals land equal, "=" appears; the correct tile is ringed for the closing tap.
  - "Different" for an equal-total non-rotation (L3): both count to the same total, "=" appears; ringed closing tap.
  - "Same" for a different pair: both count, "≠" appears, the surplus dots on the larger array pulse in coral rings; ringed closing tap.
  - In every case the mirrored item re-enters after 2 intervening items.
- Retry behaviour: attempt 1 (the prediction) → the reveal is the feedback → the show-me ring on the correct tile closes the item as solved-with-help. No further attempts on the same item; the mirror comes back later. Success is certain.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Array Turn"; `rowsOf` = "{a} rows of {b}" (numerals substituted at runtime; both placeholders kept in translation); `sameTotal` = "Same total?"; `same` = "Same"; `different` = "Different".

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per row lit during the counts (pitch rises with the running total's row index); `tone("correct")` on a correct prediction; `tone("nudge")` on a wrong one; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("3 rows of 4", "Same total?", Same / Different, OK, Question x of y, All done, Play again, Menu and praise change with the picker).
- [ ] Works at narrow width (400-px iframe: both arrays, labels, the two tiles and OK visible; a 5 × 6 array stays inside its back).
- [ ] Keyboard operable (Tab across the two tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong prediction still closes via the ringed correct tile; nothing ends the session early).
- [ ] The right array is hidden under a teal shutter until OK; OK is dimmed until a tile is chosen.
- [ ] On a rotation item the left array turns a quarter turn while the shutter lifts, both arrays count row by row with running totals, and "=" appears between equal totals.
- [ ] On a different item no turn plays, "≠" appears, and the extra dots on the bigger array get pulsing coral rings.
- [ ] At level 3 "2 rows of 6" against "3 rows of 4" counts to 12 and 12 and shows "=" without a turn.
- [ ] After a wrong prediction the correct tile pulses a ring and tapping it moves on; the mirrored pair returns two items later.
- [ ] The Same and Different tiles swap sides between items.
- [ ] Two first-try corrects in a row bring larger arrays; a wrong prediction brings smaller ones next.
- [ ] The finish screen lists the ten pairs as "3 × 4 = 4 × 3" chips with filled or hollow dots; no score, no time.
- [ ] With `?sound=off` nothing is audible.
