# 182 — Groups-Of Keypad

## Identity
- Slug: `groups-of-keypad`
- Subject / topic: Mathematics / multiplication as equal groups — a pictured "N bags of K" problem answered as a total, typed on a keypad
- Age band: `8-9`
- Interaction pattern: `P11` — keypad entry (digits 0-9, backspace, OK; physical keyboard digits also work)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P11 (display drawn ON the prompt object; 3rd wrong → the answer builds itself and is re-typed). Content is language-neutral (pictures and numerals; no word problem text — the "problem" IS the picture, F-6/F-63); no `LOCALE_DATA`. The multiplication sign is shown only AFTER the count-off, never as the prompt.

## Learning
- Objective: Reads a picture of N equal groups of K objects, types the total on a keypad, and repairs a miss by watching the groups count off one at a time with a running total.
- Prerequisites: Counts in 2s, 3s, 4s and 5s (game 039); has built equal groups (game 047) and arrays (game 048); reads and types two-digit numerals. Table retrieval is NOT assumed (game 050 is the retrieval game).
- Curriculum links: F-110 (multiplication misconceptions: groups vs group size, adding instead of multiplying, "always makes bigger", repeated-addition-only), F-6 (word problems are curriculum-heavy but niche as games — this game removes the words and keeps the structure), F-26 (the groups/arrays CONCEPT is 6-8 everywhere; totals of pictured groups with K up to 9 and closed groups at L3 is the 8-9 edge: US 3.OA.A.1 "interpret products of whole numbers … as the total number of objects in 5 groups of 7"; England Y2-3 "solve problems involving multiplication … using concrete objects and pictorial representations"; Germany Klasse 2-3 "Malaufgaben aus Situationen"; France CE1-CE2 "situations multiplicatives"; Netherlands groep 4-5 "keer-sommen bij plaatjes"; Italy classe seconda-terza; Spain 2º-3º; Brazil EF03MA03; Sweden åk 2-3; Finland grade 3), F-31 row "Multiplication as groups/arrays" → 6-8 → 8-9. F-41 (expanding re-queue of misses), F-42 (the display sits ON the picture).
- Common misconceptions (F-110, F-105, F-109, F-102), each with this game's response:
  1. **Answering with the number of groups or the group size (types 3 or 4 for 3 bags of 4).** Response: the display clears with `ANIM.nudge`; the bags count off — each bag `ANIM.open`s in turn and its running total appears above it (`ART.runTotal` 4, 8, 12, `tone("tap", k)`); if 3 was typed, a `ART.groupBadge` "3" sits under the bags with a bracket spanning all of them (`ART.bracket`) while the totals climb past 3; if 4 was typed, the first bag's total "4" pulses and the second bag opens anyway — 4 is one bag, not all of them.
  2. **Adding instead of multiplying (3 + 4 = 7).** Response: the count-off, and then `ART.addStrip` — a single row of 3 + 4 small dots — draws under the bags beside the final total for 1200 ms: 7 objects next to 12 objects. Nothing is written except the two numbers.
  3. **Count-all with a slip (11 or 13 for 12 — F-105 counting the pictured objects one by one and losing place).** Response: the bags count off by GROUP, not by object, with the running total printed on each bag: 4, 8, 12 — the child sees that counting by the group is both shorter and safer; L3 closes the bags (only a tag shows the group size) so counting one by one is impossible and the count-off is the only route.
  4. **"Multiplying always makes bigger" / × 1 and × 0 (types 8 for 1 bag of 8 plus something, or refuses 0 for 3 empty bags).** Response: L2 includes 1 bag of K and L3 includes N empty bags (tag "0"); the count-off for empty bags opens each bag to show nothing, with the running total staying 0, 0, 0 (`ART.runTotal` "0" on each).
  5. **Not seeing that 3 bags of 4 and 4 bags of 3 give the same total (commutativity).** Response: after any count-off a turn tile (`ART.turnTile`) appears; tapping it re-draws the picture as K bags of N (`ANIM.regroup`: the objects glide from the old bags into the new bags) and re-plays the count-off the other way to the same total; `ART.factText` shows "3 × 4 = 12" then "4 × 3 = 12". L3 pairs such items consecutively.
  6. **Digit reversal in the answer (21 for 12 — F-102 transcoding).** Response: when the typed number is the reverse of the product, the count-off plays and the two numbers are shown as tens rods and ones cubes side by side (`ART.rodIcon`, `ART.cubeIcon`, `ANIM.blocksIn`): 1 rod + 2 cubes for 12 beside the picture, 2 rods + 1 cube for 21 beside the display.

## How it plays
1. **Start screen**: title "Groups-Of Keypad", the squirrel (`ART.squirrel`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3 bags of 4 apples)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the shelf (`ART.shelf`, a bar at y = 232 from x = 60 to 660); on it N bags (`ART.bag`, 96 × 96, open) at y = 180, centred per §7.1 with pitch 108 (3 bags → x = 252 / 360 / 468); inside each bag K apples (`ART.apple`, 24 px) in the grid in Visual specification. The squirrel at (70, 120) holds the answer card (`ART.totalCard`, 150 × 60) at (610, 100) — the display: two `ART.digitCell`s at (592, 100) and (630, 100) with a small `ART.basketGlyph` at the card's left; typed digits appear there at 36 px. No expression is written yet. Caption `S("howManyAll")` ("How many in all?") at (360, 268), 22 px `THEME.colour.inkSoft` — the only sentence on the screen.
3. Zone B: the keypad — row 1 keys 1 2 3 4 5 at y = 330, row 2 keys 6 7 8 9 0 at y = 410 (`ART.key`, 64 × 64, x = 208 / 284 / 360 / 436 / 512). Zone C: backspace (`ART.key` with `ART.backGlyph`) at (250, 512) and Check (`makeButton ok`) at (450, 512), disabled until a digit is typed.
4. **Typing**: tap a digit → it appears in the next display cell (`ANIM.digitIn`, `tone("tap")`); a third digit is refused (`ANIM.nudge` on the card); backspace removes the last digit; physical 0-9, Backspace and Enter do the same. A one-digit answer sits in the LEFT cell.
5. **Check**: tap OK (or Enter).
   - **Correct**: the card `ANIM.pop`s and the digits turn `THEME.colour.structure`; `ART.factText` ("3 × 4 = 12") `ANIM.appear`s under the shelf at (360, 300) — the symbol is met only after the picture is solved; `tone("correct")`; praise pop (rotation); the squirrel `ANIM.hop`; rail dot fills; next item after 900 ms. First-try.
   - **Wrong**: `tone("nudge")`; the display clears with `ANIM.nudge`; the **count-off**: bag 1 `ANIM.open`s (its flap lifts; at L3 the lid slides off and the apples appear), `ART.runTotal` "4" `ANIM.appear`s above it with `tone("tap", 1)`; 500 ms later bag 2 opens, "8", `tone("tap", 2)`; bag 3, "12", `tone("tap", 3)`; the last total `ANIM.pulse`s; then the class-specific cue (Rules). `ART.turnTile` appears at (610, 180). The keypad is disabled during the count-off (≈ 0.5 s × N + 1.2 s). Attempt 2 with the totals still visible.
   - **Second wrong**: the totals clear and the count-off replays with the cue. Attempt 3.
   - **Third wrong**: the show-me — the total builds itself digit by digit in the display (`ANIM.digitIn`, 400 ms apart, `tone("tap", k)`), holds 1200 ms, then clears; OK gains `ART.showRing` (`ANIM.showMe`); the child re-types it and taps OK; solved-with-help (no praise pop; the fact text still appears). A wrong re-type repeats the show-me.
   - **Turn tile** (optional, after any count-off or after the item is solved): the apples glide into K new bags of N (`ANIM.regroup`), the count-off replays the other way, `ART.factText` shows both facts in turn; never changes the item's state.
6. **Re-queue** (F-41): an item wrong on its first Check re-enters after 1 intervening item, then after 3 if wrong again, then no more; repeats replace the last unplayed items of the same level; the item count stays 12.
7. **Items 2-12**: per Content/Rules. L1 open bags, N 2-5, K 2-5; L2 open bags, N 2-6, K up to 9, including 1 bag of K; L3 CLOSED boxes (`ART.box` with `ART.tag` showing K), N up to 6, K up to 9, empty boxes (tag 0), and commutative pairs back to back.
8. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = the twelve pictures as `ART.factChip`s (120 × 36, "3 × 4 = 12" in 18 px) in three rows of four (y = 320, 364, 408; x = 210 + i × 100), a filled `ART.dotFull` at the left for first-Check items and a hollow `ART.dotEmpty` for helped ones — a record of the groups solved, not a score; optionally `t("question_x_of_y", {n: first-try, total: 12})` at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  squirrel:    { kind: "emoji", value: "🐿️", size: 64 },
  apple:       { kind: "emoji", value: "🍎", size: 24 },
  shelf:       { kind: "shape", shape: "roundRect", w: 600, h: 12, fill: "line", radius: 6 },
  bag:         { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },     // open bag: apples visible inside
  bagFlap:     { kind: "shape", shape: "roundRect", w: 96, h: 22, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },  // the top flap; lifts on open (L1-L2)
  box:         { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 10 },    // L3 closed box; apples hidden until it opens
  lid:         { kind: "shape", shape: "roundRect", w: 104, h: 30, fill: "structure", radius: 8 },                                          // L3 lid; slides off on open
  tag:         { kind: "shape", shape: "roundRect", w: 40, h: 30, fill: "bg", stroke: "structure", strokeWidth: 2, radius: 6 },            // on the lid; the group size numeral 20 px display ink
  totalCard:   { kind: "shape", shape: "roundRect", w: 150, h: 60, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  basketGlyph: { kind: "text",  value: "Σ", size: 26, font: "display", color: "structure" },        // "all together" mark at the card's left
  digitCell:   { kind: "shape", shape: "roundRect", w: 34, h: 44, fill: "bg", stroke: "accent", strokeWidth: 2, radius: 6 },              // digit 36 px display ink
  runTotal:    { kind: "text",  value: "", size: 24, font: "display", color: "structure" },          // running total above each opened bag
  groupBadge:  { kind: "text",  value: "", size: 22, font: "display", color: "inkOnAccent" },        // on a small accent pill under the bracket
  bracket:     { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 4 },            // horizontal bar under all bags with 10 px end ticks; length set at call
  addStrip:    { kind: "shape", shape: "circle", r: 5, fill: "accent" },                             // N + K dots in one row, pitch 12, at (360, 300)
  rodIcon:     { kind: "shape", shape: "rect", w: 10, h: 34, fill: "structure" },
  cubeIcon:    { kind: "shape", shape: "rect", w: 10, h: 10, fill: "accent" },
  factText:    { kind: "text",  value: "", size: 30, font: "display", color: "structure" },          // "3 × 4 = 12", shown after a solve or a turn
  key:         { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },           // digit 32 px display ink
  backGlyph:   { kind: "text",  value: "⌫", size: 30, font: "display", color: "structure" },
  turnTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  turnGlyph:   { kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  factChip:    { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Apple grid inside a bag (relative to the bag centre, pitch 26): K ≤ 3 → one row at y = +8; K 4-6 → two rows of ceil(K/2) at y = −6 and +20; K 7-9 → three rows of 3 at y = −18, +8, +34 (the last row holds K − 6). The bag flap sits at the bag's (0, −37) and hides the top of the first row until it lifts.

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 140, ease: "Back.Out", trigger: "a digit typed / built in the display (from alpha 0, scale 0.6)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "card on a refused third digit; display clearing after a wrong Check" },
  open:      { y: "-=26", angle: -12, duration: 260, ease: "Sine.Out", trigger: "bagFlap lifts (L1-L2) / lid slides up and off (L3: y -=40, alpha 0) when a bag counts off; bags open 500 ms apart" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "runTotal, factText, turn tile, new item (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the last running total; the first bag's total when the group size was typed" },
  stripIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "addStrip for an N + K answer (from alpha 0), then fades" },
  bracketIn: { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "bracket + groupBadge when the number of groups was typed (from alpha 0), then fades" },
  blocksIn:  { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each rod / cube, 120 ms apart, for a digit-reversal answer (from alpha 0, scale 0.5); all fade with fadeOut after 1500 ms" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "rods and cubes; running totals before a replay" },
  regroup:   { duration: 500, ease: "Sine.InOut", trigger: "each apple glides from its old bag slot to its new bag slot (x,y set at call) on the turn tile; old bags fade, new bags appear" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "total card on a correct Check" },
  hop:       { y: "-=14", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "squirrel on a correct Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK while the show-me answer is to be re-typed (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```
No flashing: bags open one at a time; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ squirrel                                 ┌─ Σ [_][_] ─┐      │
      │ (70,120)      4        8       12        │ card (610,100)│    │
      │            ┌────┐   ┌────┐   ┌────┐      └────────────┘      │  zone A
      │            │ oo │   │ oo │   │ oo │   bags y=180, pitch 108   │
      │            │ oo │   │ oo │   │ oo │   x=252/360/468  ↻(610,180)│
      │  ══════════╧════╧═══╧════╧═══╧════╧═════════ shelf y=232 ═══  │
      │            "How many in all?" (360,268); fact text (360,300)  │
260   ├──────────────────────────────────────────────────────────────┤
      │         [1]   [2]   [3]   [4]   [5]     y=330                 │
      │         [6]   [7]   [8]   [9]   [0]     y=410  (64×64)        │  zone B
      │         x=208  284   360   436   512                          │
480   ├──────────────────────────────────────────────────────────────┤
      │          [⌫] (250,512)         [   OK   ] (450,512)           │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Six bags span x = 90 … 630 (pitch 108); the squirrel moves to (48, 90) when N ≥ 5 and the card stays at (610, 100) above the shelf. `ART.runTotal`s sit at each bag's (0, −70). Zone A extends to y = 310 for the caption and fact text; the keypad's first row at y = 330 leaves the 12-px gap.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.shelf` centred (360, 232). Bags: `ART.bag` at y = 180 with `ART.apple`s per the grid rule and `ART.bagFlap` at (0, −37); at L3 `ART.box` with `ART.lid` at (0, −44) carrying `ART.tag` and the group-size numeral (20 px `THEME.font.display` `THEME.colour.ink`); apples inside are drawn only when the box opens. Bags are plain draws (not tiles — nothing in zone A is tappable except the turn tile).
- `ART.totalCard` at (610, 100) with `ART.basketGlyph` at (552, 100) and the two `ART.digitCell`s at (592, 100) and (630, 100); typed digits 36 px `THEME.font.display` `THEME.colour.ink`, turning `THEME.colour.structure` on a correct Check.
- Cue elements: `ART.runTotal` above each opened bag; `ART.bracket` under the bags at y = 250 spanning from the first bag's left edge to the last bag's right edge with `ART.groupBadge` on a 36 × 26 accent pill at its centre; `ART.addStrip` dots centred at (360, 300) (the fact text moves to (360, 300) only after the strip fades); rods and cubes at (560, 150) for the typed number and (560, 250) for the product, left-anchored at x − (rods + cubes) × 7.
- `ART.factText` at (360, 300). Keypad: ten `makeTile` 64 × 64 with `ART.key` tokens, digit 32 px `THEME.font.display` `THEME.colour.ink`; backspace `makeTile` with `ART.backGlyph`; Check `makeButton` `ok` at (450, 512), alpha 0.5 while disabled; `ART.showRing` around it. `ART.turnTile` = `makeTile` 64 × 64 with `ART.turnGlyph` at (610, 180), visible only after a count-off or a solve.
- Caption `S("howManyAll")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 268), `wordWrap` 600, one line.
- `ART.squirrel` at (70, 120). Tap floors 64 ≥ 56; gaps 12. Keyboard: Tab order = keys 1 … 0, backspace, OK, turn tile (when present); physical 0-9 / Backspace / Enter on `keydown`.

## Content
Language-neutral. Items as (N bags of K; product). The cue class is decided from the typed number: N or K → bracket-and-badge (N) or first-total pulse (K); N + K → add strip; the digit reverse of the product → rods and cubes; product ± K → the last total pulses with the bag that would be one too many outlined by a dashed `ART.bag` copy (drawn at alpha 0.5 beyond the last bag) or the last bag's total pulsing; anything else → plain count-off.
- **L1** (open bags; N 2-5, K 2-5): 2 of 3 · 3 of 2 · 3 of 4 · 4 of 3 · 2 of 5 · 5 of 2 · 4 of 4 · 3 of 5 · 5 of 3 · 4 of 5 · 2 of 2 · 3 of 3 · 5 of 5 · 5 of 4
- **L2** (open bags; N 2-6, K 2-9; includes 1 bag): 3 of 6 · 4 of 6 · 2 of 7 · 3 of 7 · 5 of 6 · 2 of 8 · 3 of 8 · 4 of 7 · 6 of 3 · 6 of 4 · 1 of 8 · 1 of 9 · 2 of 9 · 6 of 5
- **L3** (closed boxes with a size tag; N 2-6, K 0-9; commutative pairs back to back; empty boxes): 4 of 8 · 6 of 6 · 5 of 7 · 7 of 5 (pair with the previous) · 3 of 9 · 9 of 3 (pair) · 6 of 8 · 8 of 6 (pair) · 3 of 0 · 5 of 0 · 4 of 9 · 6 of 7 · 5 of 9 · 6 of 9

Play list of 12: shuffle within level, levels in order; at L3 a commutative pair is kept adjacent when both members are drawn; no item repeated except by re-queue (expanding: after 1, then after 3). Bag positions are fixed by N (§7.1, pitch 108).

Worked example: item 1 (3 of 4) types 12 → first-try, fact text "3 × 4 = 12" · item 2 (2 of 5) first-try · item 3 (4 of 4) first-try → L2 · item 4 (3 of 7) types 10 (added) → count-off 7, 14, 21, then a strip of 10 coral dots under the bags; types 21 → helped · item 5 = re-queued (3 of 7) after one item: types 21 first-try · item 6 (2 of 8) first-try · item 7 (1 of 8) first-try → L3 · item 8 (5 of 7, closed boxes) types 5 (the number of boxes) → lids slide off one by one, 7, 14, 21, 28, 35 climb while a bracket under all five boxes carries a "5" badge; types 35 → helped · item 9 (7 of 5) types 35 first-try, taps the turn tile: the apples regroup into 5 boxes of 7 and count off to 35 again · items 10-12 first-try → Finish shows twelve chips, ten with filled dots.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items of the same level).
- Difficulty progression: 3 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item (after 1, then after 3) without changing the level.
- What happens on a correct answer: card `ANIM.pop`, digits turn teal, `ART.factText` appears, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-Check items only), squirrel `ANIM.hop`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`, the display clearing with `ANIM.nudge`, and the count-off: bags open one at a time with running totals and rising tones):
  - N typed (number of groups as the answer): `ART.bracket` under all the bags with `ART.groupBadge` N, fading after 1200 ms, while the totals climb past N.
  - K typed (group size as the answer): the first bag's total pulses and the second bag opens anyway; the count-off continues to the end.
  - N + K typed (added): `ART.addStrip` of N + K dots under the bags beside the final total, fading after 1200 ms.
  - Digit reversal (21 for 12): rods and cubes for the typed number beside the display and for the product beside the last total; they fade after 1500 ms.
  - Product ± K (a group too many or too few): the last total pulses; for + K a dashed extra bag is drawn beyond the last and fades — that bag does not exist.
  - Any other number (a count-all slip): the plain count-off; the last total pulses.
  - A third digit typed: refused with a nudge; not an attempt.
- Retry behaviour: attempt 1 (from the picture) → attempt 2 with the totals visible → attempt 3 after a replay → the show-me (the total builds itself on the display and the child re-types it with OK ringed); solved-with-help; the item re-queues after 1, then after 3, then no more. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Groups-Of Keypad"; `howManyAll` = "How many in all?". The pictures, numerals and the × sign carry everything else.

## Sound
`tone("tap")` on each key; `tone("tap", k)` per bag opened during a count-off and per digit built in the show-me (pitch rises with k — F-213); `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`; the running totals show everything the tones mark.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, All done, Play again, Menu, praise and the caption change with the picker; the picture and numerals do not).
- [ ] Works at narrow width (400-px iframe: six bags, the card, ten keys, backspace and OK visible and separate; no bag overlaps the squirrel).
- [ ] Keyboard operable (physical 0-9 type, Backspace deletes, Enter checks; Tab walks the keys, backspace, OK and the turn tile).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the total builds itself and re-typing it completes the item).
- [ ] No × sign or fact is visible before the first correct Check; after it, "3 × 4 = 12" appears under the shelf.
- [ ] Typing 3 for 3 bags of 4 opens the bags one by one with 4, 8, 12 above them and a bracket under all three carrying a "3".
- [ ] Typing 7 for 3 bags of 4 shows a strip of seven coral dots next to the 12 after the count-off.
- [ ] Typing 21 for 12 shows 2 rods + 1 cube beside the display and 1 rod + 2 cubes beside the last total, then they fade.
- [ ] At the third level the boxes are closed and show only a size tag; a wrong Check slides the lids off one at a time and the apples appear.
- [ ] "3 of 0" accepts 0 and every opened box is empty with 0 above it.
- [ ] Tapping the turn tile moves the apples into the other grouping and counts them off to the same total, showing both facts.
- [ ] A missed item returns after one item and, if missed again, after three more; not a third time.
- [ ] The finish screen lists the twelve facts with filled dots for unaided ones and hollow dots for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
