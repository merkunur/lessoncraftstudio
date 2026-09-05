# 044 — Find the Unit

## Identity
- Slug: `find-the-unit`
- Subject / topic: Mathematics / the unit of repeat — identifying the smallest chunk that a repeating pattern is built from
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (the pattern's items are tapped first-to-last into a unit rail; a Check tile judges the rail)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (whole-rail judgement on Check, with per-tap refusal of out-of-order taps).

## Learning
- Objective: Identifies the smallest repeating unit of a long pattern by tapping exactly its items, first to last, into a unit rail and checking it.
- Prerequisites: Can continue a simple repeating pattern (game 043); distinguishes the shapes and pictures used; taps.
- Curriculum links: F-1 (patterns in 7 of 15 sources), F-21 ("repeating (and growing) patterns" in all twelve systems), F-31 row "Sort by attribute; repeating patterns" — conservative 6-7 → 6-8 for the unit-of-repeat task, which F-116 names the hardest pattern task (England Y1-2 "recognise … patterns"; Germany Klasse 1-2 "Muster: Grundeinheit erkennen"; France CP "suites organisées: repérer le motif"; Netherlands groep 3-4 "patronen: de regelmaat"; Spain 1º ciclo "series: patrón"; Brazil EF01MA10 "descrever … a regra de formação"; Sweden åk 1-3 "mönster"; Norway 2. trinn "mønster"; Finland grade 1-2).
- Common misconceptions (F-116), each with this game's response:
  1. **Cannot identify the unit — the pattern is read as a list, so the whole pattern (or most of it) is proposed as the unit.** Response: on Check the proposed unit is walked along the pattern: `ART.bracket` copies lay down under the pattern one unit-length at a time (`ANIM.bracketWalk`). When the proposal is a doubled unit (AB AB for an AB pattern) every bracket fits — and then each bracket splits into two smaller ones (`ART.bracketSmall`, `ANIM.split`) with the line `S("smaller")` ("Is there a smaller unit?"): the child sees the chunk they chose was itself made of chunks.
  2. **Proposing too short a unit (AB for ABB, A for AAB).** Response: the bracket walk lays the first bracket (it always fits — the proposal is a prefix), then the second; the first pattern tile that does not match the proposal pulses (`ART.mismatchRing`, `ANIM.pulse`) and the walk stops there; `t("look_carefully")` shows. The error is located on the pattern itself.
  3. **Copying the last element / picking items from the middle of the pattern.** Response: structurally impossible — the unit rail only accepts the pattern's items in order from the FIRST tile: tapping any other tile nudges and is refused (F-61, no attempt counted). The only decision the child makes is WHERE THE UNIT ENDS, which is exactly the concept.
  4. **Translating to new materials is hard ("same pattern, different things").** Response: L3 contains structure-twins — the same unit shape in two material sets (ABBB in shapes and in fruits); the finish summary shows the units side by side so the twins are visible.

## How it plays
1. **Start screen**: title "Find the Unit", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Item 1 (L1: circle square circle square circle square circle square)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the caption `S("tapUnit")` ("Tap one whole unit") at (360, 90), 24 px `THEME.colour.inkSoft`; the pattern — eight tiles (`ART.patTile`, 56 × 56, `makeTile`) in a row at y = 160, pitch 64, centred (x = 360 − 3.5 × 64 + i × 64), each holding its item (`ART.shapeCircle` / `ART.shapeSquare` …) at 36 px; the parrot at (60, 160). Zone B: the unit rail — five dashed slots (`ART.unitSlot`, 56 × 56) at y = 320, x = 224 + j × 68 (j = 0 … 4); a feedback line at (360, 400), 22 px, empty. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one slot is filled.
3. **Building the unit**: the child taps pattern tiles from the left. Tapping the tile whose index equals the number of filled slots (first tile 0, then tile 1 …) is accepted: a COPY of its item glides (`ANIM.glide`) into the next slot, the original tile gains `ART.posBadge` with the slot number (1, 2, 3 …) at its top-right, `tone("tap", k)`. Tapping any other pattern tile: `ANIM.nudge`, `tone("nudge")`, nothing else (refused, not an attempt). Tapping a filled slot removes the LAST copy (undo, `ANIM.rise`) and its badge. The rail holds at most five. Check enables at one or more.
4. **Check**: tap OK.
   - **Correct (rail = the smallest unit)**: `ANIM.bracketWalk` — one `ART.bracket` (width = unit length × 64 − 8) appears under each unit-length segment of the pattern from left to right, 250 ms apart, `tone("tap", k)` per bracket; a partial segment at the end gets `ART.bracketOpen` (dashed); the rail `ANIM.pop`s; `tone("correct")`; praise pop (rotation); the parrot `ANIM.bob`; rail dot fills; after 900 ms everything clears (`ANIM.rise`) and the next pattern `ANIM.appear`s.
   - **Too short**: the walk lays bracket 1, then bracket 2 tile by tile; at the first mismatch the tile gets `ART.mismatchRing` + `ANIM.pulse`, the walk stops, `tone("nudge")`, `t("look_carefully")` on the feedback line; the brackets laid stay for 1500 ms then fade. The rail keeps its contents (the child extends it). Attempt 2.
   - **Too long, not a multiple (e.g. ABBA for ABB)**: the same walk — bracket 1 fits, bracket 2 mismatches at its first differing tile; ring, tone, `t("look_carefully")`. Attempt 2.
   - **Too long, a multiple (AB AB for AB; ABC ABC for ABC)**: the walk fits to the end; then each bracket `ANIM.split`s into `ART.bracketSmall` pieces of the true unit length, `tone("nudge")`, `S("smaller")` on the feedback line. Attempt 2.
   - **Attempt 2 wrong**: the enactment for its type, then the show-me — the rail clears and the correct copies glide in one by one (`ANIM.glide`, 300 ms apart) while the true brackets lay down; OK gains `ART.showRing` (`ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Items 2-10**: per Content/Rules. L1 = units of 2-3 in eight tiles; L2 = units of 3-4 in nine tiles; L3 = units of 4-5, the AB-with-doubled-unit trap, and structure-twins.
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = the ten found units as `ART.unitChip`s (a rounded card 150 × 44 holding the unit's items at 24 px) in two rows of five (y = 340 and y = 400; x = 120 + i × 120) — the chunks the child found, with a filled `ART.dotFull` at the chip's left for first-Check items and a hollow `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  parrot:        { kind: "emoji", value: "🦜", size: 72, fallback: "🐦" },   // Unicode 11 → bird fallback
  fish:          { kind: "emoji", value: "🐟", size: 36 },
  turtle:        { kind: "emoji", value: "🐢", size: 36 },
  duck:          { kind: "emoji", value: "🦆", size: 36 },
  apple:         { kind: "emoji", value: "🍎", size: 36 },
  pear:          { kind: "emoji", value: "🍐", size: 36 },
  lemon:         { kind: "emoji", value: "🍋", size: 36 },
  shapeCircle:   { kind: "shape", shape: "circle", r: 17, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeSquare:   { kind: "shape", shape: "rect", w: 32, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeTriangle: { kind: "shape", shape: "polygon", points: [[0,-19],[19,14],[-19,14]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  patTile:       { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  unitSlot:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 10 },   // dashed: lineDash [8,6]
  posBadge:      { kind: "shape", shape: "circle", r: 11, fill: "accent" },   // slot number 14 px display inkOnAccent, at the tile's top-right (+22, −22)
  bracket:       { kind: "shape", shape: "roundRect", w: 120, h: 6, fill: "accent", radius: 3 },                          // w = unit length × 64 − 8 at runtime
  bracketOpen:   { kind: "shape", shape: "roundRect", w: 120, h: 6, stroke: "accent", strokeWidth: 3, radius: 3 },        // dashed [6,6]; the partial last segment
  bracketSmall:  { kind: "shape", shape: "roundRect", w: 56, h: 6, fill: "structure", radius: 3 },                        // w = true unit length × 64 − 8; the split pieces
  mismatchRing:  { kind: "shape", shape: "roundRect", w: 66, h: 66, stroke: "accent", strokeWidth: 4, radius: 12 },
  showRing:      { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  unitChip:      { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 10 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Items are drawn inside tiles by `draw(scene, key, x, y)` at the registry size (36 px / shape scale 1.0) and at 24 px / scale 0.7 on unit chips.

## Animation registry
```js
const ANIM = {
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "a copy from a pattern tile to the next slot; show-me copies (x,y set at call)" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a pattern tile tapped out of order" },
  rise:        { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "undo of the last slot; clearing brackets/badges/rail before the next item" },
  bracketWalk: { alpha: 1, scaleX: 1, duration: 220, ease: "Sine.Out", trigger: "each bracket in turn, 250 ms apart (from alpha 0, scaleX 0.2, anchored at its left end)" },
  split:       { scaleX: 1, duration: 300, ease: "Back.Out", trigger: "bracketSmall pieces replace a bracket (from scaleX 0.2), all brackets together" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "mismatchRing on the first non-matching tile" },
  pop:         { scale: 1.1, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the unit rail on a correct Check" },
  bob:         { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on a correct Check" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "brackets and rings 1500 ms after a wrong Check" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pattern tiles (from alpha 0, scale 0.6)" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "Tap one whole unit" (360,90)                    │
      │ (parrot) [o] [□] [o] [□] [o] [□] [o] [□]   pattern y=160      │  zone A
      │  (60,160) x=136 200 264 328 392 456 520 584  (56×56, pitch 64)│
      │           ▔▔▔▔▔▔▔ ▔▔▔▔▔▔▔ ▔▔▔▔▔▔▔ ▔▔▔▔▔▔▔  brackets y=200      │
260   ├──────────────────────────────────────────────────────────────┤
      │          ┊ 1 ┊  ┊ 2 ┊  ┊   ┊  ┊   ┊  ┊   ┊   unit rail y=320  │
      │          x=224   292    360    428    496   (56×56, pitch 68) │  zone B
      │                 feedback line (360,400)                       │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Nine-tile patterns use x = 104 + i × 64 (104 … 616). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Caption 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 90). `ART.parrot` at (60, 160).
- Pattern tiles: `makeTile` 56 × 56 with `ART.patTile` tokens, the item centred; `ART.posBadge` at (+22, −22) with its numeral 14 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- Unit rail: five `makeTile` 56 × 56 with `ART.unitSlot` tokens (dashed); a filled slot draws the copied item centred and its outline solid.
- Brackets at y = 200 under the pattern: `ART.bracket` (anchored at its left end at the segment's first tile x − 28), `ART.bracketOpen` for a partial segment, `ART.bracketSmall` pieces at the same y. `ART.mismatchRing` centred on a tile.
- Feedback line 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 400). Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` around it.
- Tap floors 56 ≥ 56; gaps 8 (pattern) / 12 (rail) — the 8-px pattern gutter is accepted because an out-of-order tap is refused without cost.
- Keyboard: Tab walks pattern tiles left to right, then the rail slots, then OK; Enter taps / undoes / checks.

## Content
Language-neutral apart from two captions. Notation: material set letters; `pattern` = the tiles left to right; `U` = the unit length (the answer). Sets: shapes = circle (`ART.shapeCircle`) / square (`ART.shapeSquare`) / triangle (`ART.shapeTriangle`); animals = fish (`ART.fish`) / turtle (`ART.turtle`) / duck (`ART.duck`); fruits = apple (`ART.apple`) / pear (`ART.pear`) / lemon (`ART.lemon`).

- **L1** (eight tiles; U = 2 or 3):
  1. shapes: circle square circle square circle square circle square — U 2
  2. animals: fish turtle turtle fish turtle turtle fish turtle — U 3
  3. fruits: apple apple pear apple apple pear apple apple — U 3
  4. shapes: triangle circle triangle circle triangle circle triangle circle — U 2
  5. animals: duck fish duck fish duck fish duck fish — U 2
  6. fruits: lemon apple apple lemon apple apple lemon apple — U 3
- **L2** (nine tiles; U = 3 or 4):
  7. shapes: circle square triangle circle square triangle circle square triangle — U 3
  8. animals: fish fish turtle turtle fish fish turtle turtle fish — U 4
  9. fruits: apple pear lemon lemon apple pear lemon lemon apple — U 4
  10. shapes: circle square circle triangle circle square circle triangle circle — U 4
  11. animals: turtle duck fish turtle duck fish turtle duck fish — U 3
  12. fruits: pear pear lemon pear pear lemon pear pear lemon — U 3
- **L3** (nine tiles; U = 2-5, the doubled-unit trap, structure-twins):
  13. shapes: circle square square square circle square square square circle — U 4
  14. animals: fish turtle turtle duck duck fish turtle turtle duck — U 5
  15. fruits: apple lemon apple lemon apple lemon apple lemon apple — U 2 (the trap: a rail of four also "fits" and triggers the split)
  16. shapes: triangle circle square triangle circle square triangle circle square — U 3
  17. animals: duck fish fish duck duck fish fish duck duck — U 4
  18. fruits: pear lemon lemon lemon pear lemon lemon lemon pear — U 4 (structure-twin of item 13)

Play list of 10 per Rules; shuffle within level, levels in order; no item repeats; two consecutive items never share a material set; when items 13 and 18 both appear they are placed consecutively (twin order shuffled).

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or non-first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.bracketWalk` under every unit with `tone("tap", k)` per bracket, `ANIM.pop` on the rail, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], parrot `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`):
  - Too short (AB for ABB): the walk stops at the first mismatching tile, which is ringed and pulses; `t("look_carefully")`; brackets fade after 1500 ms; the rail keeps its contents.
  - Too long, not a multiple (ABBA for ABB): the same — the second bracket's first differing tile is ringed.
  - Too long, a multiple (AB AB for AB): every bracket fits, then each splits into the true-unit pieces; `S("smaller")`.
  - Out-of-order tap on the pattern: refused with a nudge; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the enacted walk → attempt 3 = the show-me (the rail refills itself with the true unit while the brackets lay down; OK ringed); solved-with-help. No attempt 4. Undo is free.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("look_carefully")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Find the Unit"; `tapUnit` = "Tap one whole unit"; `smaller` = "Is there a smaller unit?".

## Sound
`tone("tap", k)` when the k-th item enters the rail and per bracket during a walk (pitch rises along the pattern); `tone("nudge")` on an out-of-order tap and on a wrong Check; `tone("correct")` on a correct Check; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Tap one whole unit", "Is there a smaller unit?", Look carefully, OK, Question x of y, All done, Play again, Menu and praise change with the picker).
- [ ] Works at narrow width (400-px iframe: nine pattern tiles, five rail slots and OK visible; brackets stay under their tiles).
- [ ] Keyboard operable (Tab through pattern tiles, rail slots and OK; Enter copies / undoes / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the show-me refills the rail and OK completes the item).
- [ ] Only the leftmost untaken pattern tile can be copied into the rail; tapping any other tile wiggles it and adds nothing.
- [ ] Each copied tile shows a numbered badge matching its rail slot; tapping a filled slot removes the last copy and its badge.
- [ ] OK is dimmed until the rail holds at least one item.
- [ ] Checking "circle square" on the circle-square pattern lays a coral bracket under every pair with rising notes.
- [ ] Checking "fish turtle" on fish turtle turtle … lays one bracket, then rings and pulses the third tile and shows Look carefully.
- [ ] Checking "apple lemon apple lemon" on the apple-lemon pattern lays brackets that fit, then each splits into two smaller teal pieces with "Is there a smaller unit?".
- [ ] A second wrong Check refills the rail with the true unit by itself and puts a pulsing ring on OK.
- [ ] Two first-Check corrects in a row bring nine-tile patterns with longer units; a wrong Check brings a shorter unit next.
- [ ] The finish screen shows the ten units as cards with a filled dot for first-Check items and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible.
