# Row 148 — Comet's Big Leaps → THE GLASS STACK (2.NBT.B.8)

## 0. Identity
- **id** `comet-kangaroo.tens-hundreds.2-nbt-b-8` (frozen) · grade 2 · CCSS 2.NBT.B.8 · strand Number & Operations in Base Ten · own files `glass-stack-core.js`, `glass-stack-activity.js`, `glass-stack-activity.html`; the manifest row stays in `comet-kangaroo-activities.json` (tool → `glass-stack-activity`). Metadata frozen en..nl; sv/da/no/fi new at build (grade 2).
- **Worksheets covered:** G1-131 1 More, 1 Less and G1-132 10 More, 10 Less (the "1 and 10" setting); G2-226 100 More, 100 Less (the default); G2-321 Jump Puzzles, G2-322 Mystery Number, G2-323 How Far Apart? (the "arrow trails" setting).
- **Old activity:** a hand-drawn kangaroo, a three-digit number and a leap (10/100 more or less), the shell keypad. **Kept:** all nine rounds (247+10, 362−10, 415+100, 683−100, 538+10, 271−10, 326+100, 754−100, 489+10), the name Comet and her big leaps, typing where she lands, the hint "only the tens or hundreds change". **Dropped:** the drawn kangaroo (now library `zoo-animals/kangaroo`, side view, as the mascot; her marker on the chart is a drawn token — PICTURE-RULINGS: a moving marker is never a shrunken picture).

## 1. The pitch
"The numbers live in a stack of glass hundred-charts — one more is a step across, ten more is a step down, and a hundred more is the very same square one sheet deeper, so only one digit can ever change."

## 2. Why a child will want it again
- **A stack of glass sheets is a beautiful object.** The current sheet lies big and frosted like a bathroom window; beside it, the edges of all ten sheets stand in a neat spine, each edge tinted a little deeper. Diving a sheet is the signature motion: the top sheet slides away like a page dropping out of a flip-book and the next one is already there under Comet's token — same square, deeper glass.
- **Prediction is a dare.** The child types where Comet will land *before* she leaps. Then a flag with the child's number plants itself wherever that number really lives — the leap either lands on the flag (a joyful double bounce) or misses by a visible step: one square across, one row down, or a whole sheet.
- **Falling off the edge is magic.** Ten more from the bottom row does not hit a wall — Comet's token slides off the bottom edge and drops onto the top row of the next sheet down. 296 → 306 *feels* right.
- **Free play:** drag the token anywhere on the sheet; tap a spine edge to dive to that sheet; the frosted cell under the token clears and shows its number. Children love to find "their" number.

## 3. The skill and the misconception
- **Skill (2.NBT.B.8):** mentally add or subtract 10 or 100 to/from a number 100–900; G1-131/132: 1 more/less and 10 more/less within 100; G2-321–323: follow arrows on a hundred chart (down = 10 more, right = 1 more), find a square from two arrow paths, count the jumps between two numbers.
- **Misconception 1 — changing the wrong digit** (247 + 10 → 248; 415 + 100 → 425): **pushback by geometry:** +10 moves along a column (only the row = the tens changes), +100 moves straight through to the next sheet (only the sheet = the hundreds changes). The child's flag plants itself in the square their number names — one square across from Comet means a ones slip, one row means a tens slip, another sheet means a hundreds slip. The *direction* of the miss is the diagnosis.
- **Misconception 2 — "only one digit ever changes," over-applied at a boundary** (296 + 10 → 206; 602 − 10 → 692): **pushback:** the token falls off the sheet's edge onto the next sheet, so the hundreds visibly change too. Measured: a "change one digit, never carry" bot solves 6/8 and 9/11 rounds — it fails exactly the wrap rounds, which are in every pass.
- **Misconception 3 — 100 more = add a zero / 10 more = add a one** at the end (247 → 2470 / 2471): the flag of a four-digit number has no sheet to land on; it hangs off the spine.

## 4. The stage
**At 704 px (split layout: sheet 430 px left, column 250 px right):**
- **Task line** (≤ 24 px): see §9.
- **The sheet** (420 × 420): a 10 × 10 grid of cells 40 × 40 (2 px glass lines), row by row in counting order from the top-left: row 0 = `_00 … _09`, row 9 = `_90 … _99` for the current hundred (top sheet `0–99`, numbers below 10 are never used in any round). Frosted glass fill (cream, 75 % opacity, faint texture); a frosted cell shows nothing; a cleared cell shows its number in 15 px Baloo 2. The start cell is cleared and outlined teal.
- **Comet's token:** a coral disc 32 px with a white ring and a small leaping-arc mark (geometry), sitting in a cell; it moves in arcs (tens, ones) or rides the dive.
- **The spine** (right column, 120 × 300): ten sheet edges stacked top-to-bottom, each 120 × 24 with a 6 px gap, each labelled with its hundred `0`, `100`, … `900` in 16 px; the current sheet's edge is raised and teal. Comet (`zoo-animals/kangaroo`, 96 × 96, side view, facing the sheet) stands on top of the spine.
- **Leap card** (column, 200 × 64): the leap in numerals and a drawn arrow: `+10 ↓` · `−10 ↑` · `+1 →` · `−1 ←` · `+100` with a dive arrow (an arrow going into a stack icon) · `−100` with a rise arrow. In trails: a row of 2–4 arrow chips.
- **Answer box** 140 × 60 (44 px) under the card; shell keypad. (Trails "how far": two boxes, each headed by an arrow chip, `↓ [ ]  → [ ]`.)
- **Feedback bubble** under the sheet, 18 px. **No words on the apparatus:** numerals and arrows only.

**At 360 px (stacked):** task line → leap card + answer box in one row (328 × 64) → sheet 280 × 280 (cells 28 × 28; cleared numbers 12 px; token 24 px) with a slim spine 40 px wide to its right (ten edges 40 × 24, labels `0`, `100` … `900` in 12 px — the same labels as at 704, never a bare `1` that could be read as one; Comet 64 × 64 sits at the right end of the leap row, facing left toward the card, as drawn) → bubble → shell keypad. Height ≈ 44 + 64 + 280 + 28 + keypad → Check above the 740 fold; at 320 × 640 cells 26 px (sheet 260) → fits. The token is dragged, never tapped by cell, so 26–28 px cells are a visual size, not a tap target; the drag handle is the token's 44 px hit circle.

## 5. The hand
- **Type** the landing number first (the shell keypad; ≤ 100 ms echo).
- **Check → the leap:** the child's number becomes a teal **flag** and flies to the square where it lives (if on another sheet, the flag flies to that sheet's spine edge and sticks there as a pin). Then Comet leaps:
  - `±1`: a short hop to the next cell (180 ms); at a row end it slides off the right edge and pops in at the start of the next row (or reverse).
  - `±10`: an arc to the cell below/above (240 ms); off the bottom row it slides through the bottom edge, the sheet slides away to the left (300 ms), the spine edge below rises, and the token arrives on the top row of the new sheet.
  - `±100`: the dive — the token stays put while the whole sheet slides out from under it (380 ms, a glassy *shff*) and the next sheet is already there; the spine's raised edge moves one step.
- **Lands on the flag** → success (§7). **Misses** → both stay: the flag in its square (or pinned on its spine edge), the token on the true square, a dashed coral connector between them.
- **Drag the token yourself (miss 2, trails, free play):** the token moves only along rows and columns, cell to cell (it snaps), leaving a trail of small arrow marks; drag it onto a spine edge to dive to that sheet (same square).
- **Trails setting:**
  - *Follow the arrows:* the card shows 2–4 arrow chips; the child types where they end; Check runs the token chip by chip (each chip lights as its step plays).
  - *Mystery square:* two starts are cleared, each with one arrow chip; the child types the square both arrows point to; Check sends two tokens (coral and teal) that meet.
  - *How far:* two cells are cleared; the child types how many steps down and how many right; Check walks the token down then right, laying arrow marks and counting them.
- **Glass setting "clear":** every cell shows its number (a full chart for children who need it).
- **Keyboard:** arrow keys move the token one cell (free play / miss 2); PageDown / PageUp dive / rise a sheet; Tab → answer box → Check.

## 6. The rounds
One round = one start and one leap (or one trail). No 0 as a start; every number shown is 10–999.

**1 and 10** (G1-131 / G1-132; one sheet, 0–99):
| # | start | leap | lands | moves along |
|---|---|---|---|---|
| 1 | 47 | +10 | 57 | column |
| 2 | 35 | +10 | 45 | column |
| 3 | 63 | −10 | 53 | column |
| 4 | 91 | −10 | 81 | column |
| 5 | 29 | +1 | 30 | row end → next row (wrap) |
| 6 | 58 | +1 | 59 | row |
| 7 | 80 | −1 | 79 | row start → previous row (wrap) |
| 8 | 64 | −1 | 63 | row |
2 of each leap; 2 wraps; all landings different.

**10 and 100** (default — the old nine plus two wraps):
| # | start | leap | lands | what changes |
|---|---|---|---|---|
| 1 | 247 | +10 | 257 | tens |
| 2 | 362 | −10 | 352 | tens |
| 3 | 415 | +100 | 515 | hundreds |
| 4 | 683 | −100 | 583 | hundreds |
| 5 | 538 | +10 | 548 | tens |
| 6 | 271 | −10 | 261 | tens |
| 7 | 326 | +100 | 426 | hundreds |
| 8 | 754 | −100 | 654 | hundreds |
| 9 | 489 | +10 | 499 | tens |
| 10 | 296 | +10 | 306 | tens **and** hundreds (falls to the next sheet) |
| 11 | 602 | −10 | 592 | tens **and** hundreds (rises to the sheet above) |
+10 ×4, −10 ×3, +100 ×2, −100 ×2; all landings different. Old bands kept (1: #1–3; 2: #4–6; 3: #7–9), the wraps join band 3.

**Arrow trails** (G2-321 / 322 / 323):
| # | kind | given | answer |
|---|---|---|---|
| 1 | follow | 34, then ↓ ↓ → | 55 |
| 2 | follow | 68, then ↑ ← ← | 56 |
| 3 | follow | 21, then ↓ → → ↓ | 43 |
| 4 | follow | 79, then ← ↑ ↑ | 58 |
| 5 | follow | 145, then +100 (dive) → | 246 |
| 6 | mystery | ↓ from 38, and → from 47 | 48 |
| 7 | mystery | ↑ from 82, and ← from 73 | 72 |
| 8 | how far | from 23 to 57 | ↓ 3, → 4 |
| 9 | how far | from 36 to 58 | ↓ 2, → 2 |
| 10 | mystery | ↓ from 15, and ← from 26 | 25 |
| 11 | how far | from 14 to 76 | ↓ 6, → 2 |
| 12 | how far | from 52 to 83 | ↓ 3, → 1 |
Five follows, three mysteries, four how-fars (the three worksheets each get a real round set; G2-323's own range is 1–6 jumps each way, never 0 — all four pairs are inside it and all different). Every mystery has exactly one square both arrows reach.

- **Answer position:** typed — nothing to guess by place. **Measured bots:** "always +10" solves 2/8 and 4/11 (only the +10 rounds); "always +1" 2/8 (the two +1 rounds) and 0/11 (re-measured — the old "4/8" counted a bot that already knew the direction); "copy the start" 0/all; "change one digit, never carry" 6/8 and 9/11 — it is the correct idea everywhere except the wraps, which is exactly why the four wrap rounds exist and the gate requires at least one wrap in every pass of the first two settings.
- **Order:** order-only reshuffle per pass inside bands; never the same order twice; two wraps never back to back.

## 7. Check, the misses, the success
- **Check with nothing typed** → "Where will Comet land? Type the number first." (no miss).
- **Miss 1** → the leap and the flag stay where they are (§5) — that *is* the showing; the axis the leap moved along lights (a teal band along the column for ±10, along the row for ±1, along the spine for ±100), and the start number's three digits appear as three chips beside the spine, row label and column label: `7` on its spine edge, `5` beside its row, `4` above its column; the chip on the leap's axis carries `+1` or `−1`. EN **"{leap} moves along one line — only that digit changes."** (wrap rounds: **"Comet went over the edge — look which sheet she is on now."**)
- **Miss 2** → the cells along the leap's path clear (the numbers appear), the token goes back to the start, and the child drags it themselves along the lit axis; the landing cell clears only when the token is dropped on it. EN **"Move Comet yourself and read where she lands."**
- A new keystroke clears the flag, the band and the chips until the next Check.
- **Success** → the token bounces twice on the flag, the landing cell clears, and the two unchanged digits glow (e.g. for 247 + 10 the `2` on the spine and the `7` column stay lit while the row label flips 4 → 5). EN **"{start} {leap} is {land} — only the {place} changed!"** with `{place}` = tens / hundreds / ones (wraps: **"{start} {leap} is {land} — over the edge to the next hundred!"**; trails: **"{start}, {arrows} … {land}!"**; how far: **"From {a} to {b}: {d} down and {r} across."**).

## 8. Settings
1. **Leaps:** 1 and 10 / 10 and 100 (default) / arrow trails — the spine shows one sheet only (1 and 10), ten sheets, or ten sheets with trail chips, at rest.
2. **Glass:** frosted (default — work it out in your head) / clear (every number visible) — the sheet's cells at rest.

## 9. Words (EN source)
- in-tool title: **"Comet's Big Leaps"** (frozen)
- instruction: **"Where will Comet land? Type the number, then watch her leap."** · trails: **"Follow the arrows: down is 10 more, right is 1 more, up is 10 less, left is 1 less."**
- prompt (kept): **"What is {hop} than {start}?"** with `{hop}` = "10 more", "10 less", "100 more", "100 less", "1 more", "1 less"
- hints as §7; hintType **"Where will Comet land? Type the number first."**
- celebrations as §7. settings: **"Leaps"**: "1 and 10" / "10 and 100" / "arrow trails" · **"Glass"**: "frosted" / "clear". aria: token **"Comet on 247: sheet 2, row 4, column 7"**.
- **Locale traps:**
  - (a) **Hundred-chart layout:** this chart is 0–99 per sheet (row = tens digit, column = ones digit) because the place-value geometry needs it. US classrooms often use 1–100 and G2-321 level 3 uses 101–200; in de (*Hundertertafel* 1–100), nl (*honderdveld*), fr (*tableau des nombres*) the 1–100 chart is also common. The sheet never shows a 0 start, and the spine labels make the "row = tens" rule visible — but the native reviewer checks the instruction does not claim "the chart from 1 to 100".
  - (b) **The prompt:** "{hop} than {start}" must be authored per locale as a whole sentence, not assembled: de *Was ist 10 mehr als 247?*, fr *Quel nombre est 10 de plus que 247 ?* (the live fr *Combien font 10 de plus que 247 ?* is awkward — rewrite), es-MX *¿Cuánto es 10 más que 247?*, pt *Quanto é 10 a mais que 247?*, it *Quanto fa 247 più 10?* / *10 in più di 247*, nl *Wat is 10 meer dan 247?*, sv *Vad är 10 mer än 247?*, da *Hvad er 10 mere end 247?*, no *Hva er 10 mer enn 247?*, fi *Mikä on 10 enemmän kuin 247?*
  - (c) **Comet's gender:** she in en; de *das Känguru → es* (the live de *wo es landet* is right), fr *Comète* f., es/pt *Cometa* (a masculine noun used as a name — the reviewer picks *la canguro Cometa* or keeps masculine agreement consistently), it *Cometa* f., nl *Komeet* (het/de per name, use *ze*), sv/da/no *Komet* (*hon/hun*), fi no gender.
  - (d) **Arrow meaning** (down = 10 more) is the same in all eleven chart conventions (row-major, top-left start); right-to-left reading never applies.
  - (e) Number words never appear on the apparatus; spoken numbers (TTS bonus) use each locale's own words (fr *quatre-vingt-dix*, da *halvfems* — no conflict, nothing is assembled).

## 10. Sound off, access, phones
- Legible with the sound off: flag vs token positions, the lit axis, the digit chips and the cleared cells show everything; the glassy dive sound is bonus.
- Keyboard path in §5; aria live after a leap: **"Comet landed on 257. Your flag is on 248: one row up, one column right."**
- Taps: the token drag circle 44 px; spine edges ≥ 120 × 24 at 704 with a 44 px hit height (6 px gaps + padding), at 360 the spine is a 44 px-wide hit strip; keypad ≥ 44 px. Comet 96 / 64 px. Check above the folds (§4).
- Reduced motion: leaps become instant moves with a 200 ms fade trail; the dive becomes a cross-fade of sheets.

## 11. Distinct from
- **Row 141 Flip Pads (2.NBT.A.2):** a number's digits are flip-flaps; a hop of ten flips the tens flap. Here no digit flips — the *place* of a digit is a *direction in space* (across / down / deeper), so the child sees why only one digit changes and what happens at an edge.
- **Row 251 Chart Patches (1.NBT.C.5):** jigsaw pieces of one hundred chart that must agree. Here there are ten stacked sheets and a token that leaps; nothing is assembled.
- **number-hotel (tool):** a 0–99 corridor building to count in. Here the hundreds are a third dimension and the task is predicting a leap.
- **Row 157 Hopper's Spring / Row 143 Round-Trip Cart:** number-line landings. Here the space is a chart stack, and a miss is read by *which axis* it is off on.
- **Row 284 Crossing Lights (grid coordinates):** letter/number coordinates. Here the coordinates *are the digits of the number*.

## 12. Build plan
- **Core state:** `{ face:'small'|'big'|'trails', glass:'frost'|'clear', round, token:{n}, flag:null|{n}, typed, path:[], cleared:Set }`.
- **Functions:** `addr(n)` → `{sheet: ⌊n/100⌋, row: ⌊n/10⌋ % 10, col: n % 10}` · `step(n, dir)` → n ± 1 or ± 10 or ± 100 (the arithmetic *is* the geometry: falling off an edge is just n ± 10 crossing a hundred) · `trail(n, chips)` · `meet(a, chipA, b, chipB)` · `howFar(a, b)` → `{down, right}` · `offset(claim, truth)` → `{dSheet, dRow, dCol}` (the diagnosis) · `check(typed)` · `nextTask` banded reshuffle.
- **Gate's own truth (`verify-glass-stack-core.js`):** independent arithmetic for every round; `addr` round-trips for all 0–999; `step` equals the arithmetic for every cell and direction incl. every edge; for every non-wrap round exactly one of `dSheet/dRow/dCol` differs between start and landing, for every wrap round two differ; mystery rounds: both arrows reach the same cell and no other cell satisfies both; how-far rounds: down/right counts reproduce the target; landings distinct per table; ≥ 1 wrap in every generated pass of the first two settings (1 000 shuffles); the bot table of §6 reproduced.
- **Mutations:** +10 moves along the row · +100 moves to the next row instead of the next sheet · a wrap stops at the sheet edge (no fall-through) · a flag for a 4-digit number lands on sheet 9 · frosted cells reveal the landing before Check · offset reports |values| only (no direction) · mystery round with two valid cells · same order twice · celebration names the wrong place · clear-glass setting does not change the board.
- **Pictures:** `zoo-animals/kangaroo` (contact sheet: side view, the ruling's recommended kangaroo). Token, sheets, spine, arrows are apparatus geometry.
- **Risks:** 30 px cells at 360 with 12 px numerals in clear mode — readable (3-digit numbers fit 30 px at 12 px Baloo). The dive animation must keep the token pixel-still (the sheet moves, not the token) — the core tests position equality. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a glass flip-book to dive through, a kangaroo token that falls off edges, and a dare to predict the landing.
2. **Would a teacher put it on the board?** Yes — "only the tens digit changes" finally has a reason you can point at (the same column), the hundred-chart sheets they already use become the hundreds, and the edge rounds catch the over-learned rule.
3. **Would a parent trust it?** Calm, one library kangaroo, numerals and arrows only, no timer or score.
4. **The invention in one sentence:** the numbers live in a stack of glass hundred-charts where one more is a step across, ten more a step down and a hundred more the same square one sheet deeper — so each digit is a direction.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- Every round re-solved by script (`work-c33/verify.js`, `extra.js`): 1-and-10 landings 57 45 53 81 30 59 79 63 and 10-and-100 landings 257 352 515 583 548 261 426 654 499 306 592 — distinct; the leap tally (+10 ×4, −10 ×3, +100 ×2, −100 ×2) and the wraps hold. Bots re-measured: one-digit-never-carry 6/8 and 9/11 (fails exactly the wraps), always +10 2/8 and 4/11; **"always one step in the ones" was mis-measured as 4/8 — an always-+1 bot scores 2/8**, corrected.
- **Trails were thin for three worksheets** (two mysteries, two how-fars in nine rounds): now twelve rounds — five follows, three mysteries (each with exactly one square both arrows reach), four how-fars inside G2-323's 1–6-jump range (↓3 →4, ↓2 →2, ↓6 →2, ↓3 →1), all re-checked.
- Phone spine: the hundreds were labelled with bare `1`–`9` at 11 px — a "1" beside a chart of 0–99 reads as *one*. Now `0`, `100` … `900` at 12 px on a 40 px spine (sheet 280, cells 28).
- Picture re-checked on the contact sheet: `zoo-animals/kangaroo` faces LEFT — on top of the right-hand spine she faces the sheet; on phones she now sits at the right end of the leap row so she faces the card, not the edge.
- Distinct from Row 251 Chart Patches (a jigsaw of one chart) and the number-hotel tool re-checked: the third dimension (a hundred = one sheet deeper) and the read-the-miss-by-its-axis flag are this row's own.
