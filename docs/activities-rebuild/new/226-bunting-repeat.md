# New 226 — The Bunting Line (READINESS · patterns)

## 0. Identity
- **id** `bunting-repeat.play.patterns` · **grade** K (two-gap rounds reach the G1-155 face) · **framework** readiness — repeating and growing patterns (`alignment.framework` from `frontend/lib/frameworks.ts`; CCSS has no K pattern standard) · **strand** Logic & Visual Thinking · **files** `mini tools/bunting-repeat-core.js`, `bunting-repeat-activity.js`, `bunting-repeat-activity.html`, `bunting-repeat-activities.json` · **key** `bunting-repeat`
- **worksheets covered (9):** K-046 What Comes Next? (AB) · K-047 ABC Patterns · K-048 AABB Patterns · K-049 Complete the Pattern (one missing) · K-050 Big and Small Patterns · K-052 Up and Down Patterns · K-053 Growing Patterns · K-077 Shape Patterns · G1-155 Two Are Missing! · absorbed: G1 "The Pattern Quilt" (`pattern-quilt`) → its stitch frame becomes the **fold clip**, and its two holes become the **two missing** task.
- All 11 locales; wordless apparatus.

## 1. The pitch
"Clip the bunting where you think the pattern starts again and it folds into hanging strips — if you found the repeat, every row of the strips lines up like a table."

## 2. Why a child will want it again (the fun)
- **Bunting is a party.** Flag cards with library pictures hang from little pegs on a string that sags gently between pegs; they sway when touched (each flag a damped swing, 600 ms). Empty pegs wait at the end (or in the middle) with dotted outlines.
- **The fold clip.** A wooden clothes-peg sits on a hook at the start of the line. Drag it onto the string between any two flags and the bunting **folds**: it is cut into strips of that length, and each strip drops down to hang under the rail, side by side (a 500 ms cascade, strip after strip, with a paper "flup" per strip). If the clip marked the real repeat, the strips line up into perfect rows — every apple in one row, every banana in the next — and the rows give a soft shimmer. If not, the rows are a jumble. Children try 2, then 3, then 4, like turning a key until it clicks: *finding the unit is something the hand does*.
- **Hanging flags.** Drag a flag from the basket (an endless stack per kind) to an empty peg; it clips on with a "tick" and swings.
- **The earned show — the wave.** When the line is right, a wave runs along the bunting: each flag swings in turn, left to right, and each time the pattern **starts again** a chime rings — AB gives *ding-dong ding-dong*, ABC *ding-dong-dang*, AABB *ding-ding-dong-dong*. The child hears the unit. Then the bunting folds itself into its strips for one second, rows shimmering, and unfolds.
- Free play: after a right round, the child may keep hanging flags on extra pegs at the end (the line grows; no judging), and fold the line anywhere.

## 3. The skill and the misconception
- **Skill.** Find the repeating unit (AB, ABC, AABB, ABB) by picture, size, position or shape; extend it, fill one missing piece, fill two missing pieces; extend a growing pattern (each group one bigger).
- **Misconception 1: copying the last picture instead of the unit** (… A B A → A). Pushback: on a miss the line folds at the true unit; the wrong flag sits in a row of different pictures, visibly out of line.
- **Misconception 2: not seeing where the unit restarts** (treating AAB or ABB as AB). Pushback: the fold clip. Clipped at 2 on an ABB line, the strips are a jumble (A B / B A / B B…); clipped at 3 they line up. The child *sees* the restart point because only the right one makes rows.
- **Misconception 3 (growing): adding the same group again.** Pushback: growing groups hang as drops, so the line IS a **staircase** (1, 2, 3 tall); the next drop must be one step taller — a same-size group hangs visibly level with the last step, and one two steps taller overshoots the line of the steps.

## 4. The stage
Apparatus geometry: the string (2 px ink curve with gentle sag), pegs (small wooden clips), flag cards (cream #FFFDF6 rounded rect, ink border, a small triangular pennant tail below), the fold clip, the top rail of the folded view, the basket. Library pictures only (identical instances per kind); size = scale transform of one picture (big 100 % / small 62 %; ABC sizes 100 / 80 / 62); position = high or low peg (string tag 10 px vs 46 px; ABC adds middle 28 px). **Shapes are drawn SVG geometry in ONE fill (teal #146B5E, 2.5 px ink), never the shapes theme** — the library shapes are each a different colour, so a shape pattern would also be a colour pattern and the child could solve K-077 by colour alone (picture ruling). A shape flag is a geometry figure at 84 % of the picture box: circle, square, triangle, star (5-point, regular), heart, hexagon.

**704 px (content ≈ 656):**
- **Task line** (20 px).
- **The line (unfolded):** wraps at **5 flags per row** (5 divides none of the units 2, 3, 4, so wrapping never lines up a pattern by accident). Flag card 116×132, picture box **96 px**, row height 156. Up to 11 flags = 3 rows (≈ 470 px). The string continues from the end of one row to the start of the next with a loop at the right margin.
- **The fold clip:** 26×56 wooden peg on a hook at the left of row 1.
- **The folded view** (replaces the line, same area): a top rail; each unit is a vertical strip hanging from it, strips side by side, flag cards 104×116 (picture 96). The right unit folds every table into ≤ 4 strips (≤ 4 × 116 = 464 px wide); height = unit length × 120 (≤ 4 × 120 = 480). A **wrong** clip can make more strips (clip 2 on an 11-flag line = 6 strips): strips are then 104 wide with 6 px gaps (6 × 104 + 5 × 6 = 654 px — fits), and since a short clip makes short strips (2 × 120 = 240 tall) nothing ever overflows.
- **Basket** (bottom, 96 tall): a woven-pattern board (drawn geometry) holding 3 (or 4) flag stacks, each 96 px picture card; the stack shows 2 offset cards behind to read as "many".
- **Check** to the right of the basket; bubble above it.

**360 px (content ≈ 328):**
- Unfolded: **one row that scrolls horizontally** (flag 84×100, picture 72 px), the end of the line (empty pegs) scrolled into view at start; the fold clip stays pinned at the left edge.
- Folded: strips 76 px wide (picture **64 px**), ≤ 4 strips per rail (≤ 316 px). The right unit always gives ≤ 4 strips; a wrong, short clip can give 5–6, which wrap onto a **second rail** under the first (rows still line up across both rails because every strip is the same length) — clip 2 on 11 flags = rails of 4 + 2 strips, 2 × (2 × 84 + 20) = 376 px tall.
- Basket: a row of 3–4 stacks, 72 px pictures.
- Fold: task 40 + line 116 (unfolded) or ≤ 4 × 84 = 336 (folded) + basket 84 + check row 52 → **≤ 512 px** (< 640 at 320, where pictures stay 64 px and strips 70 px).

**Words on the apparatus:** none.

## 5. The hand
- **Hang a flag:** pointerdown on a basket stack → a copy lifts and swings under the finger; over an empty peg the peg opens (its jaws part); drop → it clips on ("tick", 880 Hz 30 ms) and swings once. Dropped on a filled peg → it replaces that flag (the old one drops back into the basket). Dropped elsewhere → back to the basket.
- **Take a flag off:** drag it off a peg you filled (given flags are fixed and do not lift), or tap it (it drops into the basket).
- **Fold clip:** drag along the string; it snaps between flags (snap points every flag boundary after the first 2 flags); release → fold cascade. Tap the clip → unfold (the strips rise and re-join, 400 ms). Drag it to a new boundary → re-fold. Folding never changes the answers; empty pegs fold with the line, so a child can hang flags in the folded view too (drop onto an empty peg in a strip).
- **Keyboard / tap-tap:** Tab to a basket stack, Enter lifts, Tab/arrows to an empty peg, Enter hangs; F (or the clip button) cycles the clip through boundaries; Shift+F unfolds.
- **Free play:** after a right round, extra empty pegs appear at the end; hang anything; fold anywhere.

## 6. The rounds
A round = a line of given flags + 2 empty pegs (extend), or a line ending on a whole unit with 1 or 2 empty pegs inside (one / two missing). Basket = the pattern's kinds + 1 lure kind (shape lure = another SVG shape, size/position lure = the third size/position), each kind in every basket slot across a pass (gate-measured). One right answer per peg. Attributes rotate inside each pattern set: rounds 1–3 picture, 4–5 size, 6–7 position, 8–9 shape. L = given flags before the empties (extend task); the stop is mid-unit in ≥ half the rounds.

**AB** (unit 2)

| # | attribute: A / B | L (extend) → next two | lure |
|---|---|---|---|
| 1 | fruits/apple / fruits/banana | 5 → B A | fruits/pear |
| 2 | farm-animals/duck / farm-animals/pig | 6 → A B | farm-animals/cow |
| 3 | toys/car / toys/boat | 5 → B A | toys/ball |
| 4 | big toys/kite / small toys/kite | 6 → A B | middle kite |
| 5 | big fruits/strawberry / small strawberry | 5 → B A | middle strawberry |
| 6 | high toys/ball / low toys/ball | 5 → B A | middle ball |
| 7 | high vehicles/bus / low vehicles/bus | 6 → A B | middle bus |
| 8 | circle / triangle (SVG) | 5 → B A | square |
| 9 | star / square (SVG) | 6 → A B | heart |

**ABC** (unit 3)

| # | A / B / C | L → next two | lure |
|---|---|---|---|
| 1 | apple / pear / lemon | 7 → B C | banana |
| 2 | cow / sheep / hen (farm-animals) | 8 → C A | pig |
| 3 | ball / kite / robot (toys) | 6 → A B | rocket |
| 4 | big / middle / small farm-animals/pig | 7 → B C | big farm-animals/duck |
| 5 | big / middle / small toys/rocket | 8 → C A | car |
| 6 | high / middle / low toys/car | 7 → B C | toys/boat |
| 7 | high / middle / low farm-animals/duck | 8 → C A | farm-animals/hen |
| 8 | circle / square / triangle | 6 → A B | star |
| 9 | heart / star / hexagon | 7 → B C | circle |

**AABB** (unit 4)

| # | A / B | L → next two | lure |
|---|---|---|---|
| 1 | strawberry / lemon | 6 → B B | apple |
| 2 | farm-animals/rabbit / farm-animals/goat | 7 → B A | sheep |
| 3 | vehicles/train / vehicles/bus | 9 → A B | tractor |
| 4 | big / small apple | 8 → A A | middle apple |
| 5 | big / small duck | 7 → B A | middle duck |
| 6 | high / low kite | 6 → B B | middle kite |
| 7 | high / low robot | 9 → A B | middle robot |
| 8 | triangle / circle | 7 → B A | square |
| 9 | square / heart | 6 → B B | star |

**ABB** (unit 3)

| # | A / B | L → next two | lure |
|---|---|---|---|
| 1 | pig / cow | 7 → B B | duck |
| 2 | banana / apple | 8 → B A | pear |
| 3 | toys/boat / toys/car | 6 → A B | ball |
| 4 | small / big kite | 7 → B B | middle kite |
| 5 | big / small hen | 8 → B A | middle hen |
| 6 | low / high ball | 7 → B B | middle ball |
| 7 | high / low bus | 6 → A B | middle bus |
| 8 | star / circle | 8 → B A | triangle |
| 9 | hexagon / triangle | 7 → B B | square |

**Growing** (groups of identical pictures, each one bigger; the basket holds group cards of n−1, n, n+1). **How a group hangs:** on the line each group is a **drop** — n flag cards hanging in a column from one peg — so groups 1, 2, 3 hang as a staircase the moment the line appears (no fold is needed; the fold clip is hidden in growing rounds). In the basket each group card lies **across** (n pictures in a row on one long card) so three of them stack in a short basket; a card picked up swings round to hang as a drop. Sizes: line pictures 96 px at 704 (tallest drop 4 × 100 = 400 px) and 64 px at 360 (4 × 68 = 272 px); basket rows at 360 hold up to 5 × 64 = 320 px. 360 fold: task 40 + line 292 + basket 3 × 72 = 216 + check 52 = **600 px** (< 640).

| # | picture | shown groups → next | basket (slot order) |
|---|---|---|---|
| 1 | fruits/apple | 1, 2, 3 → **4** | 3 · **4** · 5 |
| 2 | farm-animals/duck | 1, 2, 3 → **4** | **4** · 5 · 3 |
| 3 | toys/ball | 1, 2 → **3** | 2 · 4 · **3** |
| 4 | fruits/strawberry | 1, 2, 3 → **4** | 5 · 3 · **4** |
| 5 | star (SVG) | 1, 2 → **3** | **3** · 2 · 4 |
| 6 | toys/kite | 1, 2, 3 → **4** | 3 · **4** · 5 |
| 7 | farm-animals/pig | 1, 2 → **3** | 4 · **3** · 2 |
| 8 | heart (SVG) | 1, 2, 3 → **4** | **4** · 3 · 5 |
| 9 | vehicles/bus | 1, 2 → **3** | 2 · 4 · **3** |

(Answer slot: 1 ×3, 2 ×3, 3 ×3. The largest group hung is 4 and the largest in the basket 5, so the staircase fits a phone.)

**One missing / two missing:** the same tables with the line extended to a whole number of units (≥ 2½ units shown) and the gaps placed by rule: one gap in the **second** unit at unit position `k = (round − 1) mod unitLength` (every unit position equally often over a pass); two gaps in two different units at two different unit positions (`k` and `k+1 mod u`). Growing: one missing = the middle group; two missing = groups 2 and 4 of 1–4.

**Phone strips:** with the right unit every table folds into ≤ 4 strips (AB 7–8 flags = 4; ABC 9–10 = 4; AABB 8–11 = 3; ABB 8–10 ≤ 4); wrong clips wrap to a second rail (§4). Gate: right-unit strips ≤ 4 for every round.

**Answer position:** answers are pattern positions, not places; the basket order is shuffled per round with each kind in each slot across a pass, and the gate measures two blind strategies per pass: **"always take the basket's first card"** must not beat chance (≤ 1 / basket size + 0.07 of pegs — ≤ 40 % with 3 stacks, ≤ 32 % with 4), and **"copy the last flag"** must never complete a whole round (per-peg it is 0 % on AB/ABC by construction but 33–50 % on ABB/AABB, where a doubled picture really does follow itself half the time — so every ABB/AABB stop point is chosen so copying fails on at least one of the round's pegs; verified on the tables above: AABB L 6/7/8/9 and ABB L 6/7/8 each break copying on peg 1 or peg 2).

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with an empty peg** → no miss; empty pegs bounce. "Hang a flag on every empty peg."
- **Miss 1** → right flags stay; the line **folds itself at the true unit** (whatever the clip said); each wrong flag hangs tilted 12° in a row of different pictures, and that row's other flags glow teal for 1.5 s. Hint: "Look along each row — which flag is different?" The line stays folded (the child can fix it there).
- **Miss 2** → as miss 1, plus each unit's **first flag** gets a small coral notch on its peg ("the pattern starts again here") and the row above/below the wrong flag is dimmed so only the matching row and the wrong flag are bright. Hint: "The pattern starts again at every notch. What comes in this place?"
- A new flag or a clip move clears the help (until the next Check).
- **Success** → the wave with a chime at every restart, then the self-fold showing the aligned rows for 1 s, then unfold. Bubble: AB/ABC/AABB/ABB "The pattern goes {unit} again and again!" ({unit} = the unit spoken as its pictures in the aria, and shown as a mini strip of the unit's flags in the bubble — no words needed) · growing "Each group grows by one!"

## 8. Settings
1. **Pattern:** AB / ABC / AABB / ABB / growing — the line on the board changes at rest.
2. **Task:** what comes next / one missing / two missing — where the empty pegs sit (end vs inside) changes at rest.

## 9. Words (EN source)
- title "The Bunting Line" · instruction "Find the part that repeats, then hang the right flags."
- task: next "What comes next? Hang the flags." · one "One flag is missing. Hang the right one." · two "Two flags are missing. Hang the right ones." · growing "The groups grow. Hang the next group."
- hints: hintEmpty "Hang a flag on every empty peg." · hintMiss1 "Look along each row — which flag is different?" · hintMiss2 "The pattern starts again at every notch. What comes in this place?" · hintGrow1 "Look at the steps. How many come next?"
- clip: clipHint (first visit only, under the clip for 4 s) "Clip where the pattern starts again."
- celebrate: celebrateRepeat "The pattern goes like this, again and again!" (+ mini strip of the unit) · celebrateGrow "Each group grows by one!"
- aria: lineLabel "bunting with {n} flags" · flagLabel "{picture}" / "{size} {picture}" / "{picture}, high" · pegEmpty "empty peg {i}" · clipLabel "fold clip, after flag {i}" · stripLabel "strip {i}: {pictures}".
- settings: "Pattern" — "AB" / "ABC" / "AABB" / "ABB" / "Growing" · "Task" — "What comes next" / "One missing" / "Two missing".
- **Locale traps:** pattern names AB/ABC are universal school notation (Latin letters in every locale's maths books). Size and position words only in aria, composed as "{picture}, big" (no adjective agreement). Picture names from `image-vocabulary.js` singular. No word on the apparatus.

## 10. Sound off, access, phones
- Sound off: folding into aligned rows, tilted wrong flags and notches carry everything; the wave's restart chime is doubled by a little hop of each restarting flag.
- Keyboard path (§5); screen reader reads the line as a list and each strip as a row.
- Taps: empty pegs' drop zones are the whole flag area (≥ 76×96); basket stacks ≥ 72 px; the clip ≥ 44×56.
- Pictures 96 px at 704; 72 px unfolded / 64 px folded at 360.
- Phone layout: scrolling single line until folded, ≤ 4 strips folded.

## 11. Distinct from
- **Pattern Bench** tool (build the unit, the strip repeats it): there the child *authors* the unit and the tool repeats it; here the unit is hidden in a given line and the child must *find* it — the fold clip is a test the child applies, and a wrong clip produces a jumble. No ORDER rebuild row teaches K patterns (checked: ORDER.md has no pattern row), so no sibling claims the fold. **#225 Sorting Cabinet** reads rows and columns of a fixed table; the bunting *becomes* a table only if the child finds the unit. Registry #1–#22: no pattern instrument.

## 12. Build plan
- **Core state:** `{ pattern, task, rounds, r, line:[{kind|null, given}], basket:[kind], clip:null|k, folded, misses }`. Functions: `unitOf(round)`, `expectedAt(i)`, `hang(i, kind)`, `remove(i)`, `setClip(k)` → strips, `aligned(k)` (every row of the strips uniform), `check()` → `{wrong:[i]}`, `restartIndices()`, `nextRound()`.
- **Gate's own truth (`verify-bunting-repeat-core.js`):** regenerates every line from its own copy of the tables; asserts exactly one answer per empty peg; the stop is mid-unit in ≥ half the extend rounds per pattern; one-missing gaps cover every unit position equally per pass; two-missing gaps sit at two different unit positions; `aligned(k)` true for the true unit (and its multiples) and false for every other k on every round (so the clip cannot be satisfied by a wrong length); growing answers = last + 1; each basket kind appears in every slot across a pass; "first basket card" ≤ 1/basket + 0.07 and "copy last flag" never solves a whole round; right-unit folds ≤ 4 strips on phones, wrong clips wrap to a second rail; identical instances per kind; sizes 100/80/62 %, the smallest ≥ 64 px at 360.
- **Mutations:** accept "copy the last flag" · aligned() true for unit 2 on ABB · miss-1 fold at the clip's length instead of the true unit · gaps always at unit position 0 · growing answer = last group · basket order fixed · a 5-strip right-unit phone round · shapes drawn from the shapes theme (colour tells) · a growing group hung across instead of as a drop · notch on the wrong flag.
- **local-test:** real pointer drags of flags and the clip in every round of every pattern × task, 7 widths; screenshot of a wrong clip (jumble) and the right clip (rows).
- **Pictures:** apple, banana, pear, lemon, strawberry, cow, pig, duck, sheep, hen, rabbit, goat, car, boat, ball, kite, robot, rocket, bus, train, tractor — all seen on contact sheets (fruits, farm-animals, toys, vehicles). Shapes are SVG geometry in one fill (no shapes-theme art: its shapes are each a different colour). **Nothing blocked.**

## 13. The four questions
1. **Choose it again?** Yes — bunting that sways, a clothes-peg that folds the line into a table, and a wave that rings every time the pattern starts again.
2. **Teacher on the board?** Yes — every K pattern face (AB, ABC, AABB, ABB, size, position, shape, growing, missing pieces) and the core idea made visible: a pattern is a unit that repeats, and the fold proves it.
3. **Parent trust?** Wordless, library pictures, no score, calm.
4. **The invention:** clip the line where you think the pattern starts again and it folds into hanging strips — the right repeat lines up into rows, the wrong one is a jumble.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Reality: shape patterns used the shapes theme, whose shapes are each a different colour (picture ruling), so K-077 could be solved by colour. Shapes are now SVG geometry in one teal fill.
- Growing patterns had no workable layout (group cards of up to 5 pictures could not fit a phone at 64 px). Groups now hang as vertical drops (the line IS the staircase; the fold clip is hidden there) and lie across in the basket; the 360 px fold is measured at 600 px.
- Wrong clips could make 5–6 strips that overflow (6 × 116 > 656 at 704; > 328 at 360): strips now narrow to 104 at 704 and wrap to a second rail on phones; right-unit folds stay ≤ 4 strips (gate).
- Correctness: the gate's "first basket card ≤ 25 %" is impossible with 3 stacks (chance = 33 %) and "copy the last flag ≤ 25 %" is false for AABB (50 % per peg by construction). Replaced by measurable rules: first card ≤ 1/basket + 0.07; copy-last never completes a round (checked on every AABB/ABB stop point in the tables).
