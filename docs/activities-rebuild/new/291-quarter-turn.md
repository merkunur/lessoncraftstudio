# New 291 — The Turntable: the rows belong to the room, the things belong to the table (3.OA.B.5)

## 0. Identity
- **id** `quarter-turn.play.3-oa-b-5` · grade 3 · CCSS 3.OA.B.5 (commutative property of multiplication) · strand Operations & Algebraic Thinking · key `quarter-turn` → `quarter-turn-core.js`, `quarter-turn-activity.js`, `quarter-turn-activity.html`, `quarter-turn-activities.json`. Start with `node scripts/new-activity.js --num=291`.
- **Worksheets covered:** G3-314 "Flip It Around" (both arrays show the same total — finish both number sentences).
- New instrument; no old activity.

## 1. The pitch
"The counters sit on a turntable, but the row rails are fixed to the room — give the table a quarter turn and the very same counters fall into different rails: 3 rows of 5 become 5 rows of 3, and the count badge riding on the table never changes."

## 2. Why a child will want it again
- **A real turntable under the finger.** A round wooden table (drawn apparatus) with a brass knob on its rim. Drag the knob and the whole table turns smoothly under the finger, 1:1, with a soft ratchet tick every 15°; let go near a quarter and it clicks home. Every counter travels round with the table yet **stays upright** — each counter carries a small coral notch at its top, and the notches keep pointing at the ceiling all the way round, so the child sees the things slide to new places without spinning — which children find quietly magical and turn again just to watch it. The round's library picture (a tulip, a boat…) stands full size beside the table as "what every counter is".
- **The room catches the rows.** Behind the table the room's frame has a ladder of row rails (horizontal bands). They belong to the frame, not to the table: while the table turns they go dark; when it clicks home, every rail that now holds pictures lights teal from left to right, one after the other, and the row tag at its end pops up. Three rails light before the turn, five after — same pictures.
- **The badge that rides.** Once the first sentence is right, a round brass badge with the total ("15") is fixed to the table's rim. It rides the turn like a passenger, staying upright, and never flickers. The children wait for it to change. It never does.
- **The earned show:** the two finished sentences slide together under an equals bridge — `3 × 5 = 15` and `5 × 3 = 15` become `3 × 5 = 5 × 3` — while the table does one slow victory lap (four quarter turns, the rails relighting 3, 5, 3, 5).
- **Free play:** after each success the knob stays live: spin quarter after quarter and watch the rails regroup; the badge rides along unchanged every time.

## 3. The skill and the misconception
- **Skill:** a × b and b × a have the same product — turning an array changes how it is grouped into rows, not how many things there are (3.OA.B.5, commutative property; G3-314 asks the child to finish both sentences for an array and its turned twin). The first factor is always **the number of rows**, the second **how many in each row** — fixed by the colours of the boxes, not by words (see §9 locale traps).
- **Misconception — "3 × 5 and 5 × 3 are different amounts" or "after turning I have to count again".** **Push-back (the mechanic):** the counters on the table are the same counters — nothing joins, nothing leaves — and the count badge, earned before the turn, is bolted to the table and rides through the turn showing the same number. The only thing that changes is which rails catch the pictures, and the rails are visibly part of the *room*.
- **Second misconception — mixing up rows and columns in a sentence** (writing 5 × 3 for 3 rows of 5). **Push-back:** the first box is teal like the rails and the second coral like the in-row ticks; a wrong first box makes the rails count themselves (1, 2, 3 lit at their left end) so the child sees which number the rails make.

## 4. The stage
**At 704 px (split: board 440 px left, sentence column 216 px right):**
- **Task line** (22 px, up to two lines): **"Write the number sentence for the rows. Then turn the table a quarter and write it again."**
- **The room frame** (440 × 440): a cream square with a soft inner shadow. Across it run the **row rails** — horizontal bands 6 px tall. Per round the frame lays a rail at every height where a row of the array can sit in EITHER orientation (an odd number of rows sits on whole steps from the centre, an even number on half steps, so the rails are the union of the two lattices — at most r + c rails; 3 × 6 → 3 whole-step rails + 6 half-step rails). The rails are fixed to the frame and stay faint until they catch pictures. Unlit rails are pale grey; lit rails are teal with a **row tag** at their right end (28 × 28 chip) showing how many pictures that rail holds.
- **The turntable:** a wooden disc 420 px across (warm wood tint, a darker 8 px rim) centred in the frame; the **knob** — a 44 × 44 brass circle on the rim at 45° (top-right). The array sits centred on the disc.
- **The counters (both levels — critic ruling 2026-10-17):** the array is made of **drawn counters** — cream discs with a 3 px teal ring and a small coral notch at the top (the "up" mark that proves positions turn and things do not), 0.8 × the cell step s = 0.92 × table ÷ √(rows² + cols²) of the LEVEL's largest pair, so sizes never jump between rounds. Small level (largest pair 5 × 6, diagonal 7.81 cells): s = 49.5 px → counters **40 px** at 704, 30 px at 360, 26 px at 320. Big level (6 × 9, diagonal 10.82): s = 35.7 → counters **29 px** at 704, 21.5 px at 360, 19 px at 320. **Why not pictures:** library pictures in the array would sit at 46 / 35 / 30.7 px — under rule 4's 96 / 64 px floor, rotating, and smaller than the label beside them (the "main elements smaller than secondary stuff" defect). The data-mark exception covers graphs and puzzle grids, not a set the child counts; the closest ruling is the ten-frame one — counters in frames are drawn tool-grade, one picture as the label — and it is followed here.
- **The label picture:** the round's library picture **full size, 96 px** (704) / **64 px** (360, 320) at the top of the sentence column — "every counter is a tulip"; it is also the noun of the celebration.
- **The count badge:** a 48 px brass disc with the total in 24 px numerals, fixed to the table rim at the "6 o'clock" point; hidden until sentence 1 is right.
- **The sentence column (216 px):** the label picture (96 px) · sentence 1 `▢ × ▢ = ▢` (boxes 52 × 52, 28 px numerals; the first box has a 4 px teal top edge = rails, the second a 4 px coral top edge = in each row, the third plain) · a quarter-turn arrow icon (drawn, 32 px) between the sentences · sentence 2 `▢ × ▢ = ▢` (dimmed until the table has turned, or, in "predict" mode, until sentence 1 is right) · a keypad 3 × 4 (keys 56 × 44: 1–9, ⌫, 0, ✓ = Check).
- No words on the apparatus: the rails, tags, badge and boxes carry numerals and colour only.

**At 360 px (stacked, content 328 px):** task line 2 × 18 px; frame 328 × 328 with the table 316 px → small-array counters 30 px, big-array counters 21.5 px; knob 44 px; row tags 24 px; label picture 64 px inline left of sentence 1; sentence rows 48 px tall (boxes 48 × 44); keypad in two rows of six keys 50 × 44 (1–6 / 7–9, 0, ⌫, Check). Budget 360 × 740: header 56 + task 40 + frame 328 + sentences 2 × 52 + keypad 2 × 48 + gaps 40 = 664 ✓ (Check on the keypad at ≈ 650). **At 320 × 640:** table 280 px → small-array counters 26 px, big 19 px (drawn apparatus; the notch stays ≥ 6 px); the finished sentence collapses to one 28 px line; budget 56 + 36 + 288 + 48 + 28 + 2 × 44 + 30 = 574 ✓.

## 5. The hand
- **Type:** tap a box (or it is focused in order) and use the keypad / keyboard digits; ⌫ deletes; the next box gets focus when a box holds as many digits as its largest possible answer.
- **Check (✓ key or Enter):** judges the active sentence (§7).
- **Turn:** drag the knob along the rim — the table rotates with the finger (pointer angle around the centre, 1:1, rendered every frame, < 16 ms lag); a soft tick every 15°; on release the table eases to the nearest quarter (120 ms) — clockwise or anticlockwise both work. During the turn every picture's position rotates and its image counter-rotates (always upright); the rails fade to grey (80 ms). On a quarter stop the rails that now hold pictures light one by one top to bottom (70 ms apart) and their row tags pop in. Keyboard: ← / → turn a quarter. Before sentence 1 is right the knob is locked (it wiggles 4° and returns — "first write what you see").
- **Undo:** a box can be retyped any time before Check; the table can be turned back (a quarter the other way restores the first grouping).
- **Sound:** ratchet ticks, a wooden *clunk* on the quarter, a rising two-note chime per lit rail, brass *ting* when the badge appears; TTS (where available) reads each finished sentence.
- **Free play:** after the round is solved the knob turns freely until Next; the rails regroup and the badge rides along every time.

## 6. The rounds
One round = one array (rows × cols, a ≠ b) of one library picture, shown in one orientation first; the child writes its sentence, turns the table a quarter, and writes the sentence of the turned array. Which orientation comes first alternates (wide first, tall first), so "the second sentence has the bigger first number" is never a rule.

**Small arrays (factors 2–6; drawn counters, picture as label):**

| # | first shown (rows × in each row) | after the turn | total | label picture |
|---|---|---|---|---|
| 1 | 3 × 5 | 5 × 3 | 15 | fruits/apple |
| 2 | 6 × 2 | 2 × 6 | 12 | insects-and-bugs/bee |
| 3 | 2 × 5 | 5 × 2 | 10 | flowers/tulip |
| 4 | 4 × 3 | 3 × 4 | 12 | toys/car |
| 5 | 4 × 6 | 6 × 4 | 24 | fruits/lemon |
| 6 | 3 × 2 | 2 × 3 | 6 | insects-and-bugs/butterfly |
| 7 | 3 × 6 | 6 × 3 | 18 | flowers/sunflower |
| 8 | 5 × 4 | 4 × 5 | 20 | toys/boat |
| 9 | 2 × 4 | 4 × 2 | 8 | fruits/strawberry |
| 10 | 6 × 5 | 5 × 6 | 30 | vegetables/carrot |

**Big arrays (factors 2–10; drawn counters, picture as label):**

| # | first shown | after the turn | total | label picture |
|---|---|---|---|---|
| 1 | 3 × 7 | 7 × 3 | 21 | insects-and-bugs/ladybug |
| 2 | 8 × 4 | 4 × 8 | 32 | fruits/orange |
| 3 | 6 × 9 | 9 × 6 | 54 | flowers/rose |
| 4 | 10 × 2 | 2 × 10 | 20 | toys/ball |
| 5 | 5 × 7 | 7 × 5 | 35 | fruits/apple |
| 6 | 9 × 3 | 3 × 9 | 27 | insects-and-bugs/snail |
| 7 | 6 × 8 | 8 × 6 | 48 | flowers/daffodil |
| 8 | 7 × 4 | 4 × 7 | 28 | toys/robot |
| 9 | 2 × 9 | 9 × 2 | 18 | fruits/strawberry |

- **Measured (critic, `work-c41`):** the 10 small rounds are exactly the 10 distinct unordered pairs of 2–6 with a ≠ b ({5,6} restored now that the array is counters) — no fact appears twice in a pass; wide-first / tall-first alternate W T W T W T W T W T (small, 5/5) and W T W T W T W T W (big, 5/4); the largest diagonal per level is 7.81 cells (small, 5 × 6) and 10.82 cells (big, 6 × 9) — the counter sizes in §4 are computed from these. Every answer is typed: there is no option position to guess. The second sentence's total always equals the first's — that IS the property; in "predict" mode the child commits to it before seeing the turn, so it is a prediction, not a giveaway (see §8).
- **Pictures (labels):** one per round, all seen on the contact sheets and present in their theme JSONs; never cherry/plum/peach/mango (rulings); never two near-twins and never one noun twice in a pass.
- **Order:** order-only reshuffle per pass, never the same order twice in a row; the alternation W/T is re-imposed after the shuffle (shuffle within the W set and within the T set, then interleave).

## 7. Check, the misses, the success
- **Check with empty boxes** → hint, no miss: **"Fill in all three boxes."**
- **Sentence 1 — miss 1:** the apparatus shows *what the wrong box should match*:
  - first box wrong → the lit rails count themselves: a numeral 1, 2, 3 appears at each rail's left end (teal);
  - second box wrong → the counters of the top row get small coral numerals 1–5;
  - total wrong → the rails add up: each lit rail's tag changes to a running total, top to bottom (5, 10, 15).
  - Hint: **"Count the teal rails, then how many sit on each rail."**
- **Sentence 1 — miss 2:** every counter gets its own number 1 … 15 in reading order (small ink numerals, upright); hint: **"Count every counter. Rails first, then the total."**
- **Sentence 2 (after the turn) — miss 1:** if the total is wrong, the badge glows and the table does a slow quarter back and forth once — the badge rides unchanged — and the rails add up in their new grouping (3, 6, 9, 12, 15). If a factor is wrong, the same rail / top-row counting as above. Hint: **"Did anything get on or off the table?"**
- **Sentence 2 — miss 2:** the counter numbers from before the turn come back *and ride the turn* — the 15th counter is still number 15 in its new place. Hint: **"Same counters, same number. Only the rows changed."**
- **A new keystroke** removes the miss showings until the next Check.
- **Success (sentence 1):** the badge drops onto the rim with a *ting*; the knob unlocks with a small wiggle. Bubble: **"{r} rows of {c} make {t}. Now turn the table!"**
- **Success (round):** the equals bridge slides in under both sentences and writes `{a} × {b} = {b} × {a}`; victory lap. Bubble: **"{a} × {b} = {b} × {a}. Same {plural}, other rows!"** — {plural} is the library plural label in the page locale ("Same tulips, other rows!").

## 8. Settings
1. **Arrays:** "up to 6 × 6" (default; bigger counters) / "up to 10 × 10" (smaller counters). At rest the board shows 40 px vs 29 px counters and the rail ladder has 6 vs 10 slots.
2. **Ask:** "count both times" (default — turn first, then write sentence 2) / "predict before the turn" (sentence 2 must be typed BEFORE the knob unlocks; the turn itself is the check: the rails light the new rows, the badge rides; a wrong prediction is judged after the turn with the misses above). At rest the second sentence row shows a small closed-eye icon in "predict" mode and the knob carries a lock until then.

## 9. Words (EN source)
- **title:** "The Turntable"
- **instruction:** "Write the number sentence for the rows. Then turn the table a quarter and write it again." · predict mode: "Write the number sentence for the rows. Then write what it will be after a quarter turn — and turn to see."
- **instructionShort** (≤ 400 px): "Write it, turn the table, write it again."
- **hints:** `empty` "Fill in all three boxes." · `s1.more` "Count the teal rails, then how many sit on each rail." · `s1.most` "Count every counter. Rails first, then the total." · `s2.more` "Did anything get on or off the table?" · `s2.most` "Same counters, same number. Only the rows changed." · `locked` "First write what you see."
- **celebrations:** `s1` "{r} rows of {c} make {t}. Now turn the table!" · `round` "{a} × {b} = {b} × {a}. Same {plural}, other rows!"
- **settings:** "Arrays" — "up to 6 × 6" / "up to 10 × 10" · "Ask" — "count both times" / "predict before the turn"
- **aria:** knob "Turn the table a quarter"; rails live region "{n} rows of {m}"; badge "Total {t}".
- **Locale traps:**
  - **Which factor means "rows"?** Conventions differ: en/nl/sv/da/no/fi teach "3 × 5" as 3 groups of 5; de "3 · 5" is read "3 mal 5" = 5 + 5 + 5 (3 groups of 5) — same; fr "3 × 5" ("3 fois 5") is also 3 groups of 5 in the current programme, but some it/es/pt texts read "5 × 3" as "5 taken 3 times". The activity never depends on the reading: **the first box's teal edge = the rails, the second's coral edge = in each row**, and the row tags show those numbers. Because both orders are written in every round, the property holds whichever reading a teacher uses. Authors keep the words "rows" and "in each row" in the hints so the colours are anchored.
  - **Multiplication glyph:** "·" in de/sv/da/no/fi, "×" elsewhere (`notation.js` sets — port, never re-table).
  - **{plural}** comes from `image-vocabulary.js` via the picture labels (plural form, lower-cased mid-sentence except de nouns, which keep their capital: "Gleiche Tulpen, andere Reihen!").
  - **"rows of"** with a count needs ICU plurals: fi "3 riviä, joissa 5", de "3 Reihen mit je 5", fr "3 rangées de 5", es "3 filas de 5", pt "3 fileiras de 5", it "3 file da 5", nl "3 rijen van 5", sv "3 rader med 5", da "3 rækker med 5", no "3 rader med 5".
  - **"a quarter turn"** — authored per locale (Vierteldrehung, quart de tour, cuarto de vuelta, quarto de volta, quarto di giro, kwartslag, kvarts varv, kvart omgang, kvart omdreining, neljännes kierros).

## 10. Sound off, access, phones
- **Sound off:** rails light visibly, row tags carry numbers, the badge is a numeral, misses are drawn numerals on rails/counters — nothing depends on hearing.
- **Keyboard:** Tab through the boxes, digits type, Enter checks; ← / → turn the table a quarter; focus ring teal 3 px; the knob is a focusable `slider` role with `aria-valuetext` "0 / 90 degrees".
- **aria:** every box labelled ("rows", "in each row", "total"); after each quarter stop a polite live region reads "5 rows of 3"; the array has `aria-label` "{n} {plural}".
- **Taps:** knob 44 × 44; boxes ≥ 48 × 44; keypad keys ≥ 50 × 44.
- **Pictures:** the label picture only, 96 px (704) / 64 px (360, 320) — full floor. The array is drawn counters at both levels (critic ruling, §4); the upright delight survives through the counters' coral notch.
- **Fold:** Check (on the keypad) at ≈ 650 px on 360 × 740 and ≈ 560 px on 320 × 640 ✓.
- **Phone changes:** stacked; label picture inline; keypad in two rows; the finished sentence collapses at ≤ 340 px.

## 11. Distinct from
- **Row 84 The Turning Domino (1.OA.B.4):** a domino turned end-for-end swaps the two addends (grade 1, addition, a half-turn of two parts). Here a quarter turn of a 2-D array *regroups* the same objects into different rows — the rails of the room do the regrouping, the badge proves the amount; it is multiplication, and the regrouping is the point.
- **Tool `folding-wall`:** folds away known facts on a 100-card wall (it uses the commutative property as a shortcut); it never shows WHY. **Tool `baking-tray`:** breaks an array into two arrays (distributive). **Tool `build-plan`:** turns a building to compare views. None has fixed-room rails catching a turned array.
- **Siblings in this batch:** #292 (The Pouring Frame) also uses an array, but there the frame is *stretched* to find an unknown factor and counters pour in; here the array is complete and only turned. #290 trains, #293 ladder, #294 elastics, #295 crank, #296 bumps — no other turn.

## 12. Build plan
- **Core state:** `{ setting:{arrays,ask}, round:{ r, c, picture }, angle:0|90|180|270, sentences:[{a,b,t,locked},{a,b,t,locked}], badge:null|t, misses:{s1,s2}, phase:'s1'|'turn'|'s2'|'done' }`.
- **Core functions:** `cellPositions(r,c,step)`; `rotatePositions(pos, angleDeg)` (positions only; `imageRotation = 0` always); `railsFor(positions)` → which rail slots hold how many; `judge(sentenceIndex, values)`; `expected(sentenceIndex)` = (r, c, r·c) or (c, r, r·c); `canTurn()`; `quarterSnap(angle)`.
- **Gate ground truth (`verify-quarter-turn-core.js`):** independent of the core: (1) for every round and every quarter angle, the rails computed from rotated positions hold exactly r rails of c (0°/180°) or c rails of r (90°/270°); (2) the badge value equals r·c before and after every turn (the badge is never recomputed from the rails); (3) image rotation is 0 for every picture at every sampled angle (5° steps); (4) `judge` accepts only (r, c, rc) for s1 and only (c, r, rc) for s2 — and rejects the swapped order; (5) the W/T alternation survives every shuffle (500 seeds); (6) every array cell is a drawn counter (no library picture inside the table at any level), its size comes from the level's largest pair (identical in every round of a level), the label picture is ≥ 96 px at 704 and ≥ 64 px at 360/320, and every counter's notch points up (±1°) at every sampled angle; (7) the knob is locked until s1 is correct.
- **Mutations:** rotate images with the table · rails recomputed from the table (so they turn with it) · badge recomputed from the rails after the turn · s2 accepts s1's order · knob unlocked before s1 · the W/T alternation dropped · predict mode unlocks the knob before s2 is typed · miss-2 numbers renumbered after the turn (instead of riding) · step computed from the round's own pair instead of the level's largest (sizes jump between rounds) · a library picture rendered as an array cell · the counters' notch rotated with the table.
- **Local test:** real pointer drags on the knob (quarter clockwise and anticlockwise) at 320·360·412·704·768·1024·1366, every round, both settings; measure the label picture against its floor and every counter's notch angle; assert the rails' lit count before/after.
- **Pictures to verify on the contact sheets (seen):** fruits/apple, lemon, orange, strawberry; insects-and-bugs/bee, butterfly, ladybug, snail; flowers/tulip, sunflower, rose, daffodil; toys/car, boat, ball, robot; vegetables/carrot. All present in their theme JSONs.
- **Risks:** rotating up to 54 counters every frame on a low-end phone — positions are CSS transforms on absolutely-positioned elements (no re-layout).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a turntable they spin with a finger, counters whose little notches stay magically pointing up, rails that light up in a new pattern every quarter, a badge they keep expecting to change.
2. **Would a teacher put it on the board?** Yes — the whole class sees the same 15 counters make 3 rows of 5 and then 5 rows of 3 while the total stays bolted to the table: the commutative property shown, not told.
3. **Would a parent trust it?** Calm, one full-size library picture per round, drawn counters, no characters, no words on the apparatus, every miss answered by counting that the child can see.
4. **The invention:** "The counters ride a turntable but the row rails belong to the room — a quarter turn drops the same counters into different rows, and the total, bolted to the table, never changes."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **Picture ruling decided (the orchestrator's question):** library pictures as array cells at 46 / 35 / 30.7 px (704 / 360 / 320) are NOT acceptable. The data-mark exception covers graphs and puzzle grids; an array the child counts is a counting set, and the closest ruling is the ten-frame one (counters drawn tool-grade, one picture as the label). 30.7 px at 320 sits below even the data-mark floor's spirit, the pictures rotate, and they would be smaller than the 96 px label beside them — the operator's "main elements smaller than secondary stuff" defect. Both levels are now drawn counters (40 / 30 / 26 px small, 29 / 21.5 / 19 px big) with the full-size picture as the label.
- The "stays upright" delight is kept honestly: every counter carries a coral notch that keeps pointing up through the turn (positions rotate, things do not) — gated and mutated.
- {5,6} restored (it was dropped only for the picture floor): the small level is now all 10 distinct pairs of 2–6, alternating W/T 5/5; sizes recomputed from the new largest diagonal (7.81).
- Every "picture" in hints, misses, settings, gate and the four questions changed to "counter"; the settings at rest now differ by counter size and rail count.
