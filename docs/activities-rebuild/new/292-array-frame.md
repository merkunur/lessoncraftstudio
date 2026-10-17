# New 292 — The Pouring Frame: pour the counters into a frame of fixed rows — only one width leaves nothing over and no hole (3.OA.B.6)

## 0. Identity
- **id** `array-frame.play.3-oa-b-6` · grade 3 · CCSS 3.OA.B.6 (division as an unknown-factor problem) · strand Operations & Algebraic Thinking · key `array-frame` → `array-frame-core.js`, `array-frame-activity.js`, `array-frame-activity.html`, `array-frame-activities.json`. Start with `node scripts/new-activity.js --num=292`. Page title **"The Pouring Frame"**.
- **Worksheets covered:** G3-312 "The Missing Factor" (look at the array, write the missing factor) · G3-311 "Times Families" (use the array to finish all four number sentences) · G3-369 "Multiply and Divide Fact Families" (three numbers on the roof, complete the four related facts).
- New instrument; no old activity.

## 1. The pitch
"A hopper holds 24 counters and the frame has 4 rows — stretch the frame and the counters pour in, a column at a time: too narrow and some stay in the hopper, too wide and the last column has holes; the only width where both are clean is the missing factor, and then the same frame reads out four facts."

## 2. Why a child will want it again
- **Pouring is irresistible.** Grab the frame's edge and pull: every new column opens with a click and the counters tumble out of the hopper into it, top to bottom (60 ms apart, a pebbly patter), while the numeral on the hopper counts down. Push the edge back and the column's counters fly back up into the hopper. Children pour it wide, pour it narrow, pour it back, just to hear it.
- **Two kinds of wrong you can see at once.** Too narrow: the frame is full but the hopper still shows "4" and four counters wobble at its mouth, waiting. Too wide: the hopper is empty and the last column hangs with dashed empty holes. Just right: the last counter lands in the last hole, the hopper's mouth shuts with a *clack*, and the frame glows.
- **The test pour.** The child can also just type the missing factor: Check pours the frame to exactly that width in one smooth slide — a wrong guess shows its own leftovers or holes, so typing feels like making a prediction and watching it tested.
- **Pour, then predict (the round ladder — critic addition).** Pulling until the hopper is empty would always find the width without any thinking, so the grip is a tool that hands over to the head: in the first **three** rounds of every pass the grip is free (pour to explore); from round **4** the grip carries a small padlock until the child has typed a number and pressed Check — the test pour IS the check — and it unlocks after a miss as the help. A child who knows 4 × 6 types 6 and watches the frame prove it; a child who doesn't gets the pouring back after one try.
- **Four facts out of one frame (setting).** The frame wears three chips — the rows on its left edge, the columns along its bottom, the total on the hopper. Four sentences each miss one number; tap the chip that fills it and the frame acts the fact out (rows light one by one for 4 × 6; the counters flow out and back into 4 rows for 24 ÷ 4).
- **The earned show:** on a correct factor the frame's rails light row by row while the hopper reads the total back out (6, 12, 18, 24), then the column chip stamps onto the bottom edge; after the four facts the three chips fly onto a little roof above the frame (the fact-family house of G3-369) and the four sentences stack under it.
- **Free play:** the edge stays draggable between rounds — pour any width and watch leftovers and holes appear.

## 3. The skill and the misconception
- **Skill:** find the unknown factor of a known total — 4 × ▢ = 24 is the same question as 24 ÷ 4 = ▢ (3.OA.B.6) — and read one array as four related facts (r × c = N, c × r = N, N ÷ r = c, N ÷ c = r: G3-311, G3-369).
- **Misconception 1 — adding the two given numbers** (24 and 4 → 28). **Push-back:** a typed 28 makes the test pour stretch the frame to its stop (10 columns) — 40 sockets for 24 counters, so four whole columns stand empty — and a dotted ghost of the 18 columns that would still be needed runs off the board's edge; the empty sockets are counted on the edge ("16 ◌").
- **Misconception 2 — division and multiplication as unrelated facts.** **Push-back:** the four facts are read from ONE unchanging frame; each fact is *acted out* by the same counters (× facts fill it by rails, ÷ facts pour it out and back into equal rows or columns), so the child sees one array behave as all four.
- **Misconception 3 — off-by-one guessing** (4 × 5 or 4 × 7 for 24). **Push-back:** 5 columns leave 4 counters in the hopper (one row's worth short); 7 columns leave 4 holes (one row's worth over) — exactly one column of difference, visible.

## 4. The stage
**At 704 px (split: board 440 px left, sentence column 216 px right):**
- **Task line** (22 px): **"Pull the frame or type the missing number. Nothing may stay in the hopper and no hole may stay empty."**
- **The hopper** (board top-left, 120 × 96): a drawn funnel-box (apparatus geometry, no face) with the total N on its front in 32 px numerals; it shows the remaining count as counters pour. The round's **library picture** stands beside it at **96 px** — "these are apples" — the counters themselves are drawn discs (ten-frame ruling: counters in frames are drawn, one picture as the label; a 10 × 10 frame of pictures could never meet the 64 px floor at 360).
- **The frame** (below the hopper, up to 10 × 10 cells, cell 34 px, counters 28 px cream discs with a 2 px teal ring): a wooden border 6 px; **rows-fixed rounds**: r horizontal rails are always visible (the fixed side) and the **right edge** carries a 44 × 44 grip with a double chevron; **columns-fixed rounds**: c vertical rails are fixed and the **bottom edge** carries the grip. An empty socket is a dashed ring.
- **Edge chips:** the fixed side shows its number in a 32 × 32 chip (teal for rows, on the left edge; coral for columns, under the bottom edge). The unknown side's chip is a dashed empty box until solved.
- **The sentence column:** sentence `{r} × ▢ = {N}` (rows-fixed) or `▢ × {c} = {N}` (columns-fixed) with a 52 × 52 box (28 px numerals), keypad 3 × 4 (keys 56 × 44, ✓ = Check). In the four-facts phase the keypad is replaced by four sentence strips (each 200 × 44, 24 px numerals) with one empty box each.
- No words on the apparatus.

**At 360 px (stacked, content 328 px):** hopper 88 × 72 with the picture at **64 px** beside it; frame cell 31 px (10 × 31 = 310 ✓), counters 25 px; grip 44 × 44 overhanging the edge; sentence row 52 px; keypad two rows of six keys 50 × 44. Budget 360 × 740: header 56 + task 40 + hopper row 72 + frame 310 + grip 22 + sentence 52 + keypad 96 + gaps 40 = 688 ✓. Four-facts phase: one strip at a time with four step dots (the frame stays visible): 56 + 40 + 72 + 310 + 22 + 52 + 60 + 40 = 652 ✓. **At 320 × 640:** cell 27 px (counters 22), budget 56 + 36 + 64 + 270 + 22 + 52 + 88 + 30 = 618 ✓.

## 5. The hand
- **Stretch** (free in rounds 1–3 of a pass; from round 4 locked until the first Check, then free after a miss or once solved): drag the grip; the frame snaps column by column (or row by row) as the pointer crosses each half-cell — a click per snap, under 30 ms. A new column fills from the hopper top-to-bottom (60 ms per counter); a removed column's counters fly back into the hopper (40 ms each). Range 1 … 10 on the stretching side. Keyboard: ← / → (or ↑ / ↓) move the edge one cell.
- **Type + Check:** digits into the box, ✓/Enter → **the test pour**: the frame slides to the typed width in 300 ms and pours; then the judgement. A typed number > 10 slides to the stop and draws the dotted ghost of the missing columns off the edge.
- **Facts phase:** tap an empty box in a strip, then tap one of the three chips on the frame (rows / columns / total) — the chip's number flies into the box (200 ms); or type it. Tap a filled box to clear it.
- **Sound:** a pebbly patter per counter, a click per snap, the hopper *clack* when empty, a soft bell on a clean frame. TTS (where available) reads finished sentences.
- **Free play:** the grip stays live after a solve; pouring other widths shows leftovers/holes but never undoes the solve.

## 6. The rounds
One round = a total N and one fixed side; the child finds the other factor. Both factors ≥ 2, totals from the tables 2–10, no total repeated within a setting, nothing over 10 × 10.

**Missing: the columns (rows fixed, default):**

| # | rows (fixed) | total | missing columns |
|---|---|---|---|
| 1 | 4 | 24 | 6 |
| 2 | 3 | 21 | 7 |
| 3 | 6 | 48 | 8 |
| 4 | 2 | 18 | 9 |
| 5 | 7 | 35 | 5 |
| 6 | 5 | 40 | 8 |
| 7 | 8 | 32 | 4 |
| 8 | 9 | 27 | 3 |
| 9 | 10 | 60 | 6 |

**Missing: either side (fixed side R = rows fixed, C = columns fixed):**

| # | fixed | fixed value | total | missing |
|---|---|---|---|---|
| 1 | R | 3 rows | 24 | 8 columns |
| 2 | C | 4 columns | 28 | 7 rows |
| 3 | R | 6 rows | 42 | 7 columns |
| 4 | R | 5 rows | 45 | 9 columns |
| 5 | C | 9 columns | 54 | 6 rows |
| 6 | R | 8 rows | 40 | 5 columns |
| 7 | C | 3 columns | 30 | 10 rows |
| 8 | C | 5 columns | 20 | 4 rows |
| 9 | R | 9 rows | 72 | 8 columns |

- **Measured (critic's own oracle, `work-c41/rest.js`):** totals distinct within each setting (24, 21, 48, 18, 35, 40, 32, 27, 60 · 24, 28, 42, 45, 54, 40, 30, 20, 72); every factor 2–10; exactly one clean width in 1 … 10 per round; the fixed side in "either" runs R C R R C R C C R — R 5, C 4, longest streak 2 ✓ (dossier: no streak > 2). Answers are typed numbers, so there is no option position to guess; the missing factors are 6 7 8 9 5 8 4 3 6 and 8 7 7 9 6 5 10 4 8 — no value more than twice per setting (the designer's "either" table had 8 three times; round 6 was changed from 2 rows / 16 to 8 rows / 40).
- **The four facts (setting "all four facts"):** each round's four strips follow one of three blank patterns, rotating A B C A B C A B C:
  - A: `r × c = ▢` (total) · `c × ▢ = N` (rows) · `N ÷ r = ▢` (columns) · `▢ ÷ c = r` (total)
  - B: `▢ × c = N` (rows) · `c × r = ▢` (total) · `N ÷ ▢ = c` (rows) · `N ÷ c = ▢` (rows)
  - C: `r × ▢ = N` (columns) · `▢ × r = N` (columns) · `▢ ÷ r = c` (total) · `N ÷ ▢ = r` (columns)
  - **Measured:** over a pass the answer chip is the rows chip 12, the columns chip 12, the total chip 12 times out of 36 — "always tap the total" or "always tap the left chip" wins 33 %. The chips sit by role (left edge / bottom edge / hopper), so this balance IS the position balance.
- **Pictures (label only, one per round, colour themes):** fruits/apple, banana, lemon, strawberry, orange · vegetables/carrot, tomato, corn · toys/ball, car · insects-and-bugs/bee, ladybug — never cherry/plum/peach/mango (rulings). Seen on the contact sheets.
- **Order:** order-only reshuffle per pass, never the same order twice; in "either" the shuffle is constrained so no fixed side repeats more than twice in a row.

## 7. Check, the misses, the success
- **Check with an empty box** → hint, no miss: **"Pull the frame, or type a number in the box."** (rounds ≥ 4: **"Type a number — the frame will test it."**; a tap on the padlocked grip gives the same hint and a 4 px wiggle.)
- **Miss 1** (test pour wrong): the frame stays at the typed width; leftovers in the hopper glow coral and are counted on the hopper ("4 left"); or the empty holes are ringed coral and counted on the frame ("4 holes"). Hint (too narrow): **"Counters are still in the hopper. Make the frame wider."** · (too wide): **"There are holes. Make the frame narrower."**
- **Miss 2:** the frame steps from its typed width toward the right one, one column per 250 ms, with a tick per column, showing the leftovers shrink (or the holes fill) — and stops ONE column short, leaving the last column for the child to pull or type. Hint: **"Each column takes {r}. How many columns of {r} make {N}?"** (columns-fixed: **"Each row takes {c}. How many rows of {c} make {N}?"**)
- **A new stretch or keystroke** clears the showing until the next Check.
- **Success (factor):** the last counter clicks into the last hole, the hopper shuts, the rails light row by row with running totals read off the hopper, the unknown chip stamps the factor. Bubble: **"{r} rows of {c} make {N}. So {N} ÷ {r} = {c}."**
- **Four facts:** a wrong chip in a strip → miss 1: the frame acts out that sentence (× : rails light one by one with running totals; ÷ by rows: the counters pour out and back in, one rail at a time, each rail showing its count; ÷ by columns: the same by columns); hint **"Watch the frame do it."** · miss 2: the right chip pulses twice; hint **"Which chip is the {role}?"** with {role} authored as three keys (rows / columns / total). Success after the fourth strip: the three chips fly onto the roof, the four sentences stack under it. Bubble: **"One frame, four facts!"**

## 8. Settings
1. **Missing:** "the columns" (default; the right edge stretches) / "either side" (rows-fixed and columns-fixed rounds alternate; the grip is on the right or on the bottom). At rest the grip visibly moves edge.
2. **Facts:** "missing factor only" (default) / "all four facts" (after the factor, four sentence strips). At rest the sentence column shows one sentence vs the stacked four strips (greyed until the factor is found).

## 9. Words (EN source)
- **title:** "The Pouring Frame"
- **instruction:** "Pull the frame or type the missing number. Nothing may stay in the hopper and no hole may stay empty."
- **instructionShort:** "Find the width that uses every counter."
- **instruction.facts:** "Tap a number on the frame to finish each sentence."
- **hints:** `empty` "Pull the frame, or type a number in the box." · `emptyPredict` "Type a number — the frame will test it." · `narrow` "Counters are still in the hopper. Make the frame wider." · `wide` "There are holes. Make the frame narrower." · `more.cols` "Each column takes {r}. How many columns of {r} make {N}?" · `more.rows` "Each row takes {c}. How many rows of {c} make {N}?" · `fact.more` "Watch the frame do it." · `fact.most.rows` "Which chip shows the rows?" · `fact.most.cols` "Which chip shows the columns?" · `fact.most.total` "Which chip shows how many in all?"
- **readouts on the apparatus (numerals with a tiny icon, not words):** "4 ⦿" on the hopper for leftovers; "4 ◌" on the frame for holes. The words "left" / "holes" appear only in the hint bubble.
- **celebrations:** `factor` "{r} rows of {c} make {N}. So {N} ÷ {r} = {c}." · `facts` "One frame, four facts!"
- **settings:** "Missing" — "the columns" / "either side" · "Facts" — "missing factor only" / "all four facts"
- **Locale traps:**
  - **Division and multiplication glyphs** from `notation.js` (port the three sets): ÷ is ":" in de/it/nl/da/no/fi and "/" in sv (never "÷" in sv — it once meant minus); × is "·" in de/sv/da/no/fi. The four strips, the bubble and the settings label all use them.
  - **"rows of {c}"** with counts: ICU plurals per locale (de "4 Reihen mit je 6", fr "4 rangées de 6", es "4 filas de 6", pt "4 fileiras de 6", it "4 file da 6", nl "4 rijen van 6", sv "4 rader med 6", da "4 rækker med 6", no "4 rader med 6", fi "4 riviä, joissa on 6").
  - **"hopper"** is not a child word in most languages: authors choose the everyday container word (de Trichter, fr entonnoir, es embudo, pt funil, it imbuto, nl trechter, sv tratt, da/no tragt/trakt, fi suppilo — "funnel"), used only in hints.
  - **Fact-family "house/roof"** (G3-369) is a picture convention, never named in words.
  - Numerals only on the apparatus.

## 10. Sound off, access, phones
- **Sound off:** leftovers and holes are drawn and counted with numerals; the frame's glow and the hopper's shut mouth show success.
- **Keyboard:** arrows move the edge, digits type, Enter checks; in the facts phase Tab moves between strips and chips, Enter places.
- **aria:** frame `role="img"` with label "{r} rows, {cols} columns, {holes} empty"; grip is a `slider` (value = width); live region after each pour: "{left} counters left" / "{holes} empty holes" / "No counters left, no holes".
- **Taps:** grip 44 × 44; chips 32 px drawn but 44 × 44 hit areas; keys ≥ 50 × 44; strips 44 tall.
- **Pictures:** the label picture 96 px (704) / 64 px (360, 320) — full floor; counters are drawn tokens (ten-frame ruling).
- **Fold:** Check (on the keypad) at ≈ 670 px on 360 × 740 and ≈ 600 px on 320 × 640 ✓.
- **Phone changes:** facts one strip at a time with step dots; keypad in two rows.

## 11. Distinct from
- **Tool `lids`:** lids hide equal shares on a table with the remainder in plain sight (sharing). Here the *shape* of an array is stretched until it is exact — the unknown factor is a width, and the remainder can be either side (left in the hopper or a hole).
- **Row 94 The Ten-Pocket Band / New 248 The Tray That Only Holds the Whole:** fixed-capacity containers for tens and part-whole addition (grade 1). The frame's capacity is a product that the child *changes*.
- **Tool `pair-gate`:** pairs and remainders of a parade (parity). **Tool `baking-tray`:** breaks a given array (distributive). Neither finds an unknown factor by filling.
- **Siblings in this batch:** #291 turns a complete array; #290 finds unknowns by train length; #293 builds a table on a ladder. Only #292 finds a factor by *pouring a total into a fixed number of rows* and reads the four facts off one frame.

## 12. Build plan
- **Core state:** `{ setting:{missing,facts}, round:{ fixed:'R'|'C', k, N, picture }, width:1..10, typed, phase:'factor'|'facts'|'done', facts:[{pattern,blankRole,value}×4], misses }`.
- **Core functions:** `pour(width)` → `{ placed:min(N, k·width), left:max(0, N − k·width), holes:max(0, k·width − N) }`; `isClean(width)` = left 0 and holes 0; `judgeFactor(n)`; `factPatterns(roundIndex)` (A/B/C rotation); `judgeFact(i, value)`; `actOut(i)` (the animation script for a fact).
- **Gate ground truth (`verify-array-frame-core.js`):** independent arithmetic: (1) for every round exactly one width in 1 … 10 is clean and it equals N ÷ k; (2) `pour` returns the exact leftovers/holes for every width; (3) a typed r + N (the adding misconception) is never clean and pours to the stop with holes = 10k − N and a ghost of (typed − 10) columns, both reported exactly; (4) totals distinct within a setting; (5) the "either" setting has no fixed-side streak > 2 after 500 seeded shuffles; no missing factor more than twice per setting; the grip is free in rounds 1–3 and locked from round 4 until a Check, unlocking after a miss; (6) fact blanks: each role exactly 12 of 36 per pass; every fact sentence true when filled with its role's value and false with each other chip.
- **Mutations:** clean test ignores holes · clean test ignores leftovers · pour fills row-major in rows-fixed rounds (columns would not appear as groups) · width allowed past 10 · typed number not test-poured (judged silently) · fact pattern C replaced by A (role balance breaks) · a ÷ strip accepts the total chip · miss 2 steps all the way to the answer (gives it away) · the "either" shuffle allows a streak of 3 · the label picture rendered at counter size · the grip unlocked from round 4 before any Check (pull-until-empty solves every round with no thinking).
- **Local test:** real pointer drags of the grip at 320·360·412·704·768·1024·1366, every round, both settings; typed wrong / right; facts tapped.
- **Pictures to verify (seen on contact sheets):** fruits/apple, banana, lemon, strawberry, orange; vegetables/carrot, tomato, corn; toys/ball, car; insects-and-bugs/bee, ladybug.
- **Risks:** a 10 × 10 frame at 320 (27 px cells) — counters 22 px are drawn tokens, legal; the grip must not overlap the hopper in columns-fixed rounds (grip on the bottom edge).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — pulling a frame open and watching counters pour into it with a patter, then flying back, is pure toy; the hopper snapping shut on the exact width is a satisfying little lock.
2. **Would a teacher put it on the board?** Yes — "4 × ▢ = 24" becomes a visible search: too narrow leaves counters, too wide leaves holes; and the four facts are read off one frame, which is exactly what fact families mean.
3. **Would a parent trust it?** Calm, one library picture as the label, drawn counters, numerals only, misses shown as countable leftovers or holes.
4. **The invention:** "Pour a total into a frame with a fixed number of rows — the only width with nothing left in the hopper and no empty hole is the missing factor."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **The shortcut that solved every round:** pulling the grip until the hopper empties lands exactly on the missing factor every time (the first empty-hopper width IS N ÷ k) — 100 % with no multiplication. Added the round ladder: the grip is free in rounds 1–3 of a pass (explore), padlocked from round 4 until the child types a number and the test pour checks it, and unlocks after a miss as the help. Hint, gate and mutation added.
- Re-solved both tables with my own oracle: the "either" table had the missing factor 8 three times (claim was "no value more than twice") — round 6 changed from 2 rows / 16 to 8 rows / 40 (5 columns); totals still distinct; one clean width per round.
- Fixed the adding-misconception text ("40 holes for 24 counters" → 40 sockets, 16 empty).
- Fact-pattern role balance re-derived by hand: rows 12 / columns 12 / total 12 of 36 ✓.
