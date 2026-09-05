# 050 — Times-Table Keypad

## Identity
- Slug: `times-table-keypad`
- Subject / topic: Mathematics / retrieval of the 3, 4, 6 and 8 times tables (products to 10 × 10), typed on a keypad
- Age band: `8-9`
- Interaction pattern: `P11` — keypad entry (digits 0-9, backspace, OK; physical keyboard digits also work)
- Estimated build size: ~490 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P11 (display drawn ON the prompt object; 3rd wrong → the answer builds itself and is re-typed).

## Learning
- Objective: Types the product of a fact from the 3, 4, 6 or 8 times table (a × b, b ≤ 10) and repairs a miss by watching the array build row by row.
- Prerequisites: Retrieves the 2, 5 and 10 tables from a choice (game 049); reads and writes two-digit numerals; understands rows × columns (game 048).
- Curriculum links: F-2 (times tables — the strongest demand signal), F-26 (tables retrieval is 8-9 everywhere; EN 3/4/8 at 7 then all by 8, DE all at 8, NL all at 8, IT all to 10 by 8, US "from memory" at 8, FI 6-9 at 9+), F-110, F-41 (expanding re-queue; interleave after an introduction block for 6-9), F-31 row "Tables to 10 retrieval" → 8-9 (US 3.OA.C.7; England Y3 "3, 4 and 8 multiplication tables", Y4 all to 12; Germany Klasse 2-3 "Einmaleins"; France CE2; Netherlands groep 5; Italy classe terza; Brazil 3º ano; Spain 3º; Finland grade 3).
- Common misconceptions (F-110, F-109, F-102, F-108), each with this game's response:
  1. **Near-fact error (6 × 7 = 48 or 36 — a row too many or too few).** Response: the display clears with `ANIM.nudge` and the array for the fact builds in zone A row by row with running totals (`ART.rowTotal` 6, 12, 18 … 42, `tone("tap", k)`): 36 is seen landing on row 6 with a row still to come (that row `ANIM.pulse`s); 48 draws a dashed `ART.ghostRow` under the array that fades — the eighth row does not exist.
  2. **Adding instead of multiplying (6 × 7 = 13).** Response: the array builds and `ART.addStrip` — a single row of a + b dots — draws under the fact so 13 and 42 sit side by side; the strip fades after 1200 ms.
  3. **Digit reversal in the answer (42 typed as 24 — F-102 transcoding; F-108 digits as independent numbers).** Response: when the typed number is the reverse of the product, the array builds AND the two numbers are shown as tens rods and ones cubes: beside the array's total, `ART.rodIcon` × 4 and `ART.cubeIcon` × 2 for 42; beside the display, `ART.rodIcon` × 2 and `ART.cubeIcon` × 4 for 24 (`ANIM.blocksIn`). The order of digits is shown to mean tens then ones, never called an error in words.
  4. **Skip-count drift in the 6s and 8s (6, 12, 18, 24, 32 …).** Response: the running totals are printed at each row, so the drift point is visible on the row where the child's number would have landed (the row whose total is nearest below the typed number pulses).
  5. **Commutativity not used (knows 4 × 8 but stalls on 8 × 4).** Response: after any reveal a turn tile (`ART.turnTile`) rotates the array (`ANIM.turn`) and re-plays the totals the other way; L3 writes some facts multiplier-first (7 × 6).
  6. **Table-switching load (F-41 interleaving hurts before the introduction block).** Response: the first four items of every session come from ONE table (the focus table, chosen at random from 3, 4, 6, 8); from item 5 the tables are interleaved and two consecutive items never share a table.

## How it plays
1. **Start screen**: title "Times-Table Keypad", the octopus (`ART.octopus`) at (360, 200), Start, picker.
2. **Item 1 (introduction block, focus table 4; L1: 4 × 3)**: rail of 14 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the fact card (`ART.factCard`, 360 × 72) at (360, 100) reading "4 × 3 =" (`ART.factText`, 40 px) followed by the two-cell display (`ART.digitCell` × 2 at x = 470 and 510, y = 100) that shows typed digits at 40 px; the octopus at (70, 190); the array area at (360, 195) is EMPTY (the array appears only as a hint). Zone B: the keypad — row 1 keys 1 2 3 4 5 at y = 300, row 2 keys 6 7 8 9 0 at y = 380 (`ART.key`, 64 × 64, x = 208 / 284 / 360 / 436 / 512). Zone C: the backspace key (`ART.key` with `ART.backGlyph`) at (250, 512) and Check (`makeButton ok`) at (450, 512), disabled until a digit is typed.
3. **Typing**: tap a digit → it appears in the next display cell (`ANIM.digitIn`, `tone("tap")`); a third digit is refused (`ANIM.nudge` on the display); backspace removes the last digit; physical 0-9, Backspace and Enter do the same. A one-digit answer sits in the LEFT cell.
4. **Check**: tap OK (or Enter).
   - **Correct**: the fact card `ANIM.pop`s and the display digits turn `THEME.colour.structure`; `tone("correct")`; praise pop (rotation); the octopus `ANIM.wave`; rail dot fills; next item after 700 ms. First-try.
   - **Wrong**: `tone("nudge")`; the display clears with `ANIM.nudge`; the array builds in zone A (`ART.gridBack` `ANIM.appear`s, rows light with `ANIM.rowOn` 250 ms apart, `ART.rowTotal`s, `tone("tap", k)`), then the class-specific cue (Rules: ghost row / row pulse / add strip / rods-and-cubes); `ART.turnTile` appears at (600, 195). The keypad is disabled during the build (≈ 2 s). Attempt 2 with the array visible.
   - **Second wrong**: the array re-counts its rows and the cue plays again. Attempt 3.
   - **Third wrong**: the show-me — the product builds itself digit by digit in the display (`ANIM.digitIn`, 400 ms apart, `tone("tap", k)`), holds 1200 ms, then clears; OK gains `ART.showRing` (`ANIM.showMe`); the child re-types it and taps OK; solved-with-help (no praise pop). A wrong re-type repeats the show-me (no limit).
   - **Turn tile**: optional after any reveal; rotates the array and re-plays the totals the other way, with `ART.factText` showing the swapped fact once the item is solved; never changes the item's state.
5. **Interleaving and re-queue (F-41)**: items 1-4 come from the focus table at the current level; from item 5 the play list interleaves all four tables. A fact missed on its first Check re-enters after 1 intervening item, then after 3 if missed again, then no more. Re-queued repeats replace the last unplayed items of the same level; the item count stays 14.
6. **Items 2-14**: per Content/Rules. L1 = multipliers 1-5 in all four tables; L2 = multipliers 6-10 in the 3s and 4s, × 1 and × 10 in the 6s and 8s; L3 = the 6s and 8s with multipliers 6-9, multiplier-first facts and × 0.
7. **Finish**: `t("all_done")` (360, 110); the octopus (360, 200) `ANIM.celebrate`; the summary = the fourteen facts as `ART.factChip`s (120 × 36, "6 × 7 = 42" in 18 px) in four rows of four (y = 300, 344, 388, 432; x = 210 + i × 100; the last row holds two, centred at x = 310 / 410), with a filled `ART.dotFull` at the left for first-Check facts and a hollow `ART.dotEmpty` for helped ones — a record of unaided retrieval, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 7 minutes.

## Art registry
```js
const ART = {
  octopus:     { kind: "emoji", value: "🐙", size: 64 },
  factCard:    { kind: "shape", shape: "roundRect", w: 360, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  factText:    { kind: "text",  value: "", size: 40, font: "display", color: "structure" },       // "4 × 3 ="
  digitCell:   { kind: "shape", shape: "roundRect", w: 36, h: 48, fill: "bg", stroke: "accent", strokeWidth: 2, radius: 6 },   // digit 40 px display ink
  gridBack:    { kind: "shape", shape: "roundRect", w: 372, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  dot:         { kind: "shape", shape: "circle", r: 8, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },    // lit = fill structure; r = pitch × 0.35
  ghostRow:    { kind: "shape", shape: "roundRect", w: 340, h: 22, stroke: "accent", strokeWidth: 2, radius: 6 },       // dashed [6,6]; holds ghostDots
  ghostDot:    { kind: "shape", shape: "circle", r: 8, stroke: "accent", strokeWidth: 2 },
  rowTotal:    { kind: "text",  value: "", size: 16, font: "display", color: "structure" },
  addStrip:    { kind: "shape", shape: "circle", r: 5, fill: "accent" },                          // a + b dots in one row, pitch 12, at (360, 150)
  rodIcon:     { kind: "shape", shape: "rect", w: 10, h: 34, fill: "structure" },                 // one tens rod
  cubeIcon:    { kind: "shape", shape: "rect", w: 10, h: 10, fill: "accent" },                    // one ones cube
  key:         { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 32 px display ink
  backGlyph:   { kind: "text",  value: "⌫", size: 30, font: "display", color: "structure" },
  turnTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  turnGlyph:   { kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  factChip:    { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Array sizing: rows = the first factor, columns = the second; cell pitch = min(24, 130 / rows), so 8 rows fit at pitch 16 and 10 columns at pitch 24 span 240 px inside the 372-px back; dot r = pitch × 0.35.

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 140, ease: "Back.Out", trigger: "a digit typed / built in the display (from alpha 0, scale 0.6)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a refused third digit; display clearing after a wrong Check" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "gridBack, turn tile, new fact (from alpha 0, scale 0.6)" },
  rowOn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each row's dots switch to the lit fill, 250 ms apart" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the row nearest below the typed number, and its total" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost row for a one-row-too-many answer (from alpha 0), then fades" },
  stripIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "addStrip for an a + b answer (from alpha 0), then fades" },
  blocksIn:  { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each rod / cube, 120 ms apart, for a digit-reversal answer (from alpha 0, scale 0.5); all fade with fadeOut after 1500 ms" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "rods and cubes after the reversal cue" },
  turn:      { angle: 90, duration: 500, ease: "Sine.InOut", trigger: "array container on the turn tile; totals re-play after" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "fact card on a correct Check" },
  wave:      { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "octopus on a correct Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK while the show-me answer is to be re-typed (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish octopus" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 14" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            ┌─────────────────────────────┐                    │
      │ (octo)     │   4 × 3 =   [_][_]          │  fact card (360,100)│
      │ (70,190)   └─────────────────────────────┘  cells x=470/510   │  zone A
      │            · · · · · · ·  addStrip (360,150)  (hint only)      │
      │            ┌───────────────────────────┐   ↻ (600,195)        │
      │            │ array (hint only) 372×130 │   after a reveal     │
      │            └───────────────────────────┘ (360,195)            │
260   ├──────────────────────────────────────────────────────────────┤
      │         [1]   [2]   [3]   [4]   [5]     y=300                 │
      │         [6]   [7]   [8]   [9]   [0]     y=380  (64×64)        │  zone B
      │         x=208  284   360   436   512                          │
480   ├──────────────────────────────────────────────────────────────┤
      │          [⌫] (250,512)         [   OK   ] (450,512)           │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.rowTotal`s sit at x = 560 beside their rows; the rods-and-cubes cue draws at (600, 100) for the typed number (beside the display) and at (600, 250) for the true product (beside the array's last total).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 14 × `ART.dotEmpty` (x = 217 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.factCard` at (360, 100) with `ART.factText` left-aligned from x = 200 and the two `ART.digitCell`s at (470, 100) and (510, 100); typed digits 40 px `THEME.font.display` `THEME.colour.ink`, turning `THEME.colour.structure` on a correct Check.
- `ART.octopus` at (70, 190). Array (hint only): `ART.gridBack` centred (360, 195); `ART.dot`s on the pitch rule (unlit fill until their row lights); `ART.rowTotal` at (560, row y); `ART.ghostRow` + `ART.ghostDot`s under the last row; `ART.addStrip` dots centred at (360, 150).
- Rods and cubes: `ART.rodIcon`s at pitch 14 then `ART.cubeIcon`s at pitch 14, in one row, left-anchored at x = 600 − (rods + cubes) × 7, at y = 100 (typed) and y = 250 (product).
- Keypad: ten `makeTile` 64 × 64 with `ART.key` tokens, digit 32 px `THEME.font.display` `THEME.colour.ink`; backspace `makeTile` with `ART.backGlyph`; Check `makeButton` `ok` at (450, 512), alpha 0.5 while disabled; `ART.showRing` around it. `ART.turnTile` = `makeTile` 64 × 64 with `ART.turnGlyph` at (600, 195), visible only after a reveal.
- Tap floors 64 ≥ 56; gaps 12. Keyboard: Tab order = keys 1 … 0, backspace, OK, turn tile (when present); physical 0-9 / Backspace / Enter on `keydown`.

## Content
Language-neutral (numerals and symbols). Facts as (a × b); the first factor is the number of rows. Distractor classes are not needed — the child types — but the cue class is decided from the typed number: a × (b − 1) → row pulse; a × (b + 1) → ghost row; a + b → add strip; the digit reverse of the product → rods and cubes; anything else → the nearest-below row pulses.
- **L1** (multipliers 1-5, all four tables): 3 × 2 · 3 × 4 · 3 × 5 · 3 × 3 · 4 × 2 · 4 × 3 · 4 × 5 · 4 × 4 · 6 × 2 · 6 × 3 · 6 × 5 · 6 × 4 · 8 × 2 · 8 × 3 · 8 × 5 · 8 × 4
- **L2** (multipliers 6-10 in the 3s and 4s; × 1 and × 10 in the 6s and 8s): 3 × 6 · 3 × 7 · 3 × 8 · 3 × 9 · 3 × 10 · 4 × 6 · 4 × 7 · 4 × 8 · 4 × 9 · 4 × 10 · 6 × 10 · 8 × 10 · 6 × 1 · 8 × 1
- **L3** (6s and 8s with multipliers 6-9; multiplier-first facts; × 0): 6 × 6 · 6 × 7 · 6 × 8 · 6 × 9 · 8 × 6 · 8 × 7 · 8 × 8 · 8 × 9 · 7 × 6 · 9 × 8 · 7 × 8 · 9 × 6 · 6 × 0 · 8 × 0

Focus table: chosen at random per session from {3, 4, 6, 8}; items 1-4 are four distinct L1 facts of that table (every table has exactly four in L1). From item 5: shuffle within level, levels in order, no two consecutive items from the same table, no fact repeated except by re-queue. Play list of 14 with expanding re-queue as in How it plays §5.

## Rules
- Item count: 14 (re-queued repeats replace unplayed items).
- Difficulty progression: 3 consecutive first-Check correct → next level (cap L3). The introduction block (items 1-4) stays at the current level regardless.
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the fact without changing the level.
- What happens on a correct answer: fact card `ANIM.pop`, digits turn teal, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-Check items only), octopus `ANIM.wave`, rail dot, next fact after 700 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`, the display clearing with `ANIM.nudge`, and the array building with row totals):
  - a × (b − 1) (a row short): the last row and its total pulse.
  - a × (b + 1) (a row too many): the dashed ghost row draws under the array and fades.
  - a + b (added): the add strip of a + b dots draws under the fact card and fades.
  - Digit reversal (24 for 42): rods and cubes for the typed number beside the display and for the product beside the array's total; they fade after 1500 ms.
  - Any other number (skip-count drift): the row whose total is nearest below the typed number pulses with its total.
  - A third digit typed: refused with a nudge; not an attempt.
- Retry behaviour: attempt 1 (retrieval) → attempt 2 with the array visible → attempt 3 with the array re-counted → the show-me (the product builds itself on the display and the child re-types it with OK ringed); solved-with-help; the fact re-queues after 1 item, then after 3, then no more. No attempt 4.
- Finish condition: 14 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Times-Table Keypad". The play screen carries only numerals and symbols.

## Sound
`tone("tap")` on each key; `tone("tap", k)` per row lit during a reveal and per digit built in the show-me (pitch rises with k — F-213); `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, All done, Play again, Menu and praise change with the picker; the play screen is numerals).
- [ ] Works at narrow width (400-px iframe: the fact card, the array after a miss, ten keys, backspace and OK visible and separate; an 8-row array fits the array box).
- [ ] Keyboard operable (physical 0-9 type, Backspace deletes, Enter checks; Tab walks the keys, backspace, OK and the turn tile).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the product builds itself and re-typing it completes the item).
- [ ] The first four facts of a session all come from one table; from the fifth, consecutive facts come from different tables.
- [ ] No array is shown before the first Check; after a wrong Check the display clears and the array builds row by row with running totals.
- [ ] Typing 36 for 6 × 7 makes the seventh row and "42" pulse; typing 48 draws a dashed extra row that fades.
- [ ] Typing 13 for 6 × 7 draws a strip of thirteen coral dots under the fact card beside the 42-dot array.
- [ ] Typing 24 for 6 × 7 shows 2 rods + 4 cubes beside the display and 4 rods + 2 cubes beside the array's 42, then they fade.
- [ ] Tapping the turn tile after a reveal rotates the array and re-plays the totals the other way.
- [ ] A missed fact returns after one item and, if missed again, after three more; it is not re-queued a third time.
- [ ] "6 × 0" and "8 × 0" accept 0 and reveal an empty grid; at level 3 some facts are written multiplier-first (7 × 6).
- [ ] A third wrong Check makes the product appear digit by digit in the display, then clear; typing it and checking completes the item.
- [ ] The finish screen lists the fourteen facts with a filled dot for unaided ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
