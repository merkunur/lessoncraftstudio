# 002 — Numeral Nest

## Identity
- Slug: `numeral-nest`
- Subject / topic: Mathematics / numeral recognition 1-10 (quantity → numeral)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~380 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1.

## Learning
- Objective: Looks at a set of 1-10 eggs and taps the numeral (from three) that names how many.
- Prerequisites: Can count a small set of objects (game 001 is the natural predecessor). No reading.
- Curriculum links: F-1 (number recognition/number words in 11 of 15 sources), F-21, F-31 row "Numerals to 20, number words" — conservative age 6-7, earliest 5 → 5-6 (US K.CC.A.3 "write numbers 0-20 … represent a number of objects"; England Reception ELG "have a deep understanding of number to 10"; France GS "lire les nombres écrits en chiffres"; Spain Infantil; Brazil EI03ET07; Sweden förskoleklass "siffror 0-10").
- Common misconceptions (F-102, F-101), each with this game's response:
  1. **Mirror-image numerals (6↔9, reversed 3/5/7 — developmentally normal to ~6).** Response: when the child taps 9 for a set of 6 (or 6 for 9), the two numeral tiles slide side by side under the nest (`ANIM.glide`) and the correct one gains an `ART.underline` bar beneath it (the anchor: "the round part is at the bottom for 6"), then the tiles return. Never marked as a hard error; the item still counts as retried.
  2. **Off-by-one (taps N−1 or N+1).** Response: the eggs are counted for the child — each egg lights in turn with its `ART.countBadge`, the last badge grows (`ANIM.lastBadge`) — and the big numeral appears over the nest for 900 ms. The answer is shown by counting, not stated.
  3. **Cardinality: choosing the numeral of the last egg tapped in a previous item, or any numeral "because it is big".** Response: same enacted count; the hint always ends on the whole set's last numeral.
  4. **Length/spread bias — a spread-out row looks like more.** Response: at L2 the eggs are arranged in two rows and at L3 in a loose cluster inside the nest, so the numeral cannot be read from a row's length; the enacted count is the only route.

## How it plays
1. **Start screen**: title "Numeral Nest", the hen (`ART.hen`) at (360, 200), Start button, language picker. Nothing else moves.
2. **Item 1 (L1, 3 eggs)**: dot rail of 8 at the top (§6). A nest (`ART.nest`) centred at (360, 176) in zone A with 3 eggs (`ART.egg`) laid on it in a row at y = 176 (x = 300, 360, 420; egg size 56, spacing 60 — the eggs are NOT tappable; they are the prompt). The hen sits at the left (110, 170) with a speech bubble (`ART.bubble` at (110, 96)) holding `ART.question`. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480, labelled 2, 3, 4 in a shuffled order, all enabled. Caption `S("howMany")` at (360, 300).
3. **Answering**: the child taps a numeral tile.
   - **Correct**: `ANIM.pop` on the tile, `tone("correct")`, `showPraise` (next key in rotation), the tapped numeral glides (`ANIM.glide`) up to sit on the nest's front (`ART.nestLabel` position (360, 236)) and the hen does `ANIM.cluck` (a small angle wobble); rail dot fills; after 700 ms the next item builds (eggs `ANIM.appear`).
   - **Wrong, off-by-one or other**: tile `ANIM.nudge`, `tone("nudge")`, tile de-selects; then the **enacted count**: each egg in order gets an `ART.countBadge` with its numeral (350 ms apart, `tone("tap", k)`), the last badge `ANIM.lastBadge`, and `ART.totalNumeral` appears above the nest at (360, 96) with `ANIM.appear`; after 900 ms the badges and the total fade (`ANIM.fadeOut`). Attempt 2.
   - **Wrong, mirror pair (6↔9)**: the nudge and tone as above, then BOTH the tapped tile and the correct tile glide to (300, 470) and (420, 470) in zone C, `ART.underline` appears under the correct one for 1200 ms, then both glide back; then the enacted count as above. Attempt 2.
   - **Wrong on attempt 2**: nudge + enacted count again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`). Tapping it completes the item as solved-with-help (the numeral glides to the nest; no praise pop).
4. **Items 2-8**: per §Content and §Rules. Egg layouts: 1-5 one row at y = 176 centred (x = 360 − (n−1) × 30); 6-8 two rows (y = 156 and y = 200), row 1 holds ceil(n/2); 9-10 a cluster: positions listed in §Content (L3 layout table).
5. **Finish**: §10. `t("all_done")` at (360, 110); the hen at (360, 220) with `ANIM.celebrate`; the eight solved numerals as 56 × 56 `ART.numeralTile` copies in a row at y = 400 (x = 360 − 3.5 × 68 + i × 68) — the visual summary; `play_again` (250, 510) and `menu` (470, 510); `tone("finish")`.

Session length ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  hen:          { kind: "emoji", value: "🐔", size: 96 },
  nest:         { kind: "emoji", value: "🪹", size: 128, fallback: "🧺" },   // Unicode 13 → fallback basket (§4)
  egg:          { kind: "emoji", value: "🥚", size: 56 },
  bubble:       { kind: "shape", shape: "roundRect", w: 120, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  question:     { kind: "text",  value: "?", size: 40, font: "display", color: "structure" },
  countBadge:   { kind: "shape", shape: "circle", r: 16, fill: "structure" },      // numeral on it: 20 px display, color bg
  totalNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "structure" },
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  nestLabel:    { kind: "shape", shape: "roundRect", w: 64, h: 48, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 10 },  // holds the solved numeral on the nest
  underline:    { kind: "shape", shape: "rect", w: 72, h: 6, fill: "accent" },
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "last egg's badge in the enacted count" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new eggs; total numeral (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges and total after the enacted count" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "solved numeral to the nest label; mirror pair to zone C and back (x,y set at call)" },
  cluck:     { angle: 6, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hen after a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hen" }
};
```

## Screen layout
Stage 720 × 560, fixed layout, FIT scaling.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ART.bubble "?" (110,96)        ART.totalNumeral (360,96)     │
      │  ART.hen (110,170)        ART.nest (360,176) with eggs on it  │  zone A
      │                           ART.nestLabel (360,236)             │
260   ├──────────────────────────────────────────────────────────────┤
      │  "How many?" (360,300)                                        │
      │        [ 2 ]      [ 3 ]      [ 4 ]   y=380, x=240/360/480     │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │  mirror-pair parking spots (300,470) (420,470)                │  zone C
560   └──────────────────────────────────────────────────────────────┘
```

## Visual specification
- Background `THEME.colour.bg`.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); a solved item swaps its dot for `ART.dotFull`.
- `ART.hen` (110, 170); `ART.bubble` (110, 96) with `ART.question` centred in it.
- `ART.nest` centred (360, 176); eggs `ART.egg` at the positions in Screen layout / Content; `ART.nestLabel` (360, 236) empty until solved, then holds the numeral (32 px `THEME.font.display`, `THEME.colour.ink`).
- Numeral tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, label 44 px `THEME.font.display` `THEME.colour.ink`.
- `ART.totalNumeral` at (360, 96); `ART.countBadge` at each egg's (+22, −22) with 20 px numeral in `THEME.colour.bg`; `ART.underline` centred 8 px below the correct tile's bottom edge during the mirror cue; `ART.showRing` behind the correct tile.
- Caption `S("howMany")` 28 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 300).
- All tiles ≥ 80 px (5-6 floor); gaps ≥ 24 px.
- Tab order: the three numeral tiles left to right (creation order); the language picker header is not in the game Tab list (library behaviour). Under `?embed=1` the picker is not created; nothing else changes.
- While the enacted count or the mirror cue plays (≈ 2.5 s), all three tiles are `setEnabled(false)` so a tap during the animation cannot count as an attempt; they re-enable when it ends.

## Content
Language-neutral (quantities and numerals only).

Level pools (count; distractors):
- **L1** (1-5, one row): (3; 2, 4) · (1; 2, 3) · (5; 4, 6) · (2; 1, 3) · (4; 3, 5)
- **L2** (5-8, two rows): (6; 5, 9) · (7; 6, 8) · (8; 7, 9) · (5; 4, 6)
- **L3** (8-10, cluster; mirror distractor on every 6/9 item): (9; 6, 8) · (10; 9, 8) · (8; 6, 9) · (9; 10, 6)

L3 cluster egg positions (relative to the nest centre (360, 176)): 8 eggs → (−90,−20) (−45,−30) (0,−22) (45,−30) (90,−20) (−60,20) (0,26) (60,20); 9 eggs → the 8 above + (−100,20); 10 eggs → the 9 above + (100,20).

Play list of 8 built per BUILD-CONVENTIONS §13 and Rules; no item repeats within a session; correct tile position never repeats in the same slot twice running.

Worked example of one session (a child who is fluent to 5 and shaky above): item 1 L1 (3) first-try ✓ · item 2 L1 (5) first-try ✓ → step up · item 3 L2 (7) first-try ✓ · item 4 L2 (6) wrong (tapped 9 → mirror cue, enacted count) then ✓ → step down · item 5 L1 (2) ✓ · item 6 L1 (4) ✓ → step up · item 7 L2 (8) ✓ · item 8 L2 (5) ✓ → Finish. The nest label numerals on the finish screen read 3, 5, 7, 6, 2, 4, 8, 5.

Egg row positions (relative to the nest centre): one row of n → x = −(n−1)×30 + i×60, y = 0; two rows → row 1 y = −20, row 2 y = +24, each centred by the same formula.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], numeral glides to the nest label, hen `ANIM.cluck`, rail dot fills, next item after 700 ms.
- What happens on a wrong answer:
  - Off-by-one or unrelated numeral (cardinality / counting): `ANIM.nudge` + `tone("nudge")` + the enacted count with badges, rising tones and the big total.
  - Mirror pair 6/9 (numeral orientation): nudge + tone, then both tiles park in zone C with `ART.underline` under the correct one for 1200 ms, then the enacted count.
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted count → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4.
- Finish condition: 8 items solved. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Numeral Nest"; `howMany` = "How many?".

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", k)` on the k-th egg during the enacted count (pitch climbs); `tone("finish")` once. Silent under `?sound=off`. No audio files.

## Testing checklist
- [ ] Works in all 11 languages (picker changes Start, All done, Play again, Menu, praise).
- [ ] Works at narrow width (400-px iframe: nest, eggs and three tiles fully visible, no clipping).
- [ ] Keyboard operable (Tab cycles the three numeral tiles; Enter picks; eggs are not focusable).
- [ ] Never auto-starts (start screen until Start is tapped).
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Eggs are not tappable; tapping an egg does nothing.
- [ ] A wrong numeral triggers an egg-by-egg count with badges and a big total, then clears.
- [ ] Tapping 9 for a set of 6 (or 6 for 9) parks both tiles below with a coral bar under the correct one before the count.
- [ ] After a correct tap the numeral appears on the nest label and the hen wobbles.
- [ ] Two first-try corrects in a row bring bigger sets (two rows / cluster); a wrong tap brings a smaller set next.
- [ ] Sets of 9-10 are shown as a cluster, not a row.
- [ ] The finish screen shows the eight solved numerals in order and no score.
- [ ] If the nest emoji is missing on the device, a basket appears in its place (fallback).
- [ ] With `?sound=off` nothing is audible.
