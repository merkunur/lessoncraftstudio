# New 250 — The Number Wall → THE LIGHT WALL (1.OA.C.6)

## 0. Identity
- id `number-wall-bricks.play.1-oa-c-6` · grade 1 · CCSS 1.OA.C.6 (add and subtract within 20; the number wall's add-up and subtract-down) · Operations & Algebraic Thinking · files (key `number-wall-bricks`, kept): `number-wall-bricks-core.js`, `number-wall-bricks-activity.js`, `number-wall-bricks-activity.html`, `number-wall-bricks-activities.json`. Start with `node scripts/new-activity.js --num=250`. New metadata in all 11 locales at build (the Zahlenmauer is native German/Dutch/Nordic school furniture — the locales will recognise it).
- worksheets covered: **G1-246** Number Walls (build up, missing numbers) · **G1-266** Number Walls to 10 (build every wall to the top) · **G1-267** Number Walls: Build Every Row (four rows) · **G1-268** Number Walls: Find the Missing Brick (one bottom brick missing, the brick above it given) · **G1-289** Number Walls: Start at the Top (top given + one brick per row, work down).
- the coverage review's "bricks that pour up" is kept in spirit but made honest: objects that pour UP out of a brick would leave it empty, yet in a number wall every lower brick feeds TWO bricks above it and keeps its own number. Light does that: a glass brick's light rises into both bricks resting on it and the brick stays lit.

## 1. The pitch
"Every brick is a glass block: its light rises only into the bricks resting on it, and each brick holds exactly as many lights as its number."

## 2. Why a child will want it again (the fun)
- **Glass bricks that glow.** A wall of frosted glass blocks on a dusk-blue ground. A brick with its number written glows warm, and its light visibly climbs in two soft beams into the bricks resting on it, where little lights settle into its sockets — coral from the left brick, teal from the right.
- **Write a number, light the next row.** The moment a brick's number is right, it glows and its beams rise — the wall lights itself row by row as the child works, like turning on the floors of a lighthouse.
- **Overflow sparks.** Type too big a number into a brick under a known brick and its light pours up, fills every socket and spills over the top as fizzing sparks — funny, and it says "too much" with no words.
- **The bell at the top.** When every brick is written, a wave of light runs from the bottom row to the top, the top brick rings like a glass bell and throws a burst of light-dots, and the finished wall slides away to stand in a little street of walls along the bottom (one silhouette per wall solved).
- **Free play ("Build a wall"):** type any bottom numbers (1–10) and watch the wall build and light itself; then hide any bricks and hand it to a friend.

## 3. The skill and the misconception
- **Skill (as the worksheets mean it):** in a number wall each brick holds the sum of the two bricks it stands on; build walls of three and four rows to 10 and to 20; find a missing bottom brick by subtracting (the brick above it is given); start at the top and work down by subtracting.
- **Misconception 1 — adding the wrong pair** (a diagonal brick, or two bricks far apart). **Push back:** light only rises straight up, and a brick catches light only from the two bricks it rests on. When the child types a number into a brick, the beams that rise into it come from its two real supports — if the child added two other bricks, the lights that arrive do not match the typed number (§7 shows the difference). In the numbers-only setting the miss draws the two true beams.
- **Misconception 2 — adding when the top is known** (missing bottom brick: the brick above says 7, its neighbour says 3 → types 10). **Push back:** the known brick above shows its 7 sockets as hollow rings; the neighbour's 3 lights already sit in three of them; typing 10 into the gap makes 10 lights rise into the 4 hollow rings — 6 spill over the top as sparks. Typing 4 fills them exactly.
- **Misconception 3 — the wall is read sideways** (adding neighbours on the same row). **Push back:** a brick's light never goes sideways; same-row bricks never feed each other — there is no beam between them.

## 4. The stage
Layout `split` at ≥ 700 px (wall left, keypad + bubble right); stacked below.

**At 704 px** (stage 452 + column 220):
- **Task line** (22 px): the prompt (§9).
- **The ground** (drawn: a dusk-blue panel #24425A with a faint brick-joint texture) behind the wall, 452 × 380.
- **The wall** (drawn glass bricks, 3 px ink outline, 10 px radius, frosted cream #F4F1E8 unlit / warm gold glow lit), bottom row on the ground, each brick resting half on each of the two below:
  - **3 rows:** bricks 140 × 96, 6 px joints (bottom row 432 px wide).
  - **4 rows:** bricks 104 × 80, 6 px joints (bottom row 434 px wide).
  - Each brick shows its **numeral** (Baloo 2 34 px; 4 rows 28 px) in its upper part and its **sockets** in the lower part: to 10, a 2 × 5 socket grid (cells 16 px); to 20 on 3 rows, a 2 × 10 grid (cells 11 px); 4-row walls show a **glow bar** instead (a horizontal tube with a tick at every 5 and a stronger tick at 10, filling with light) because 20 sockets do not fit legibly.
  - An **unknown brick** shows a dashed numeral box (52 × 40) and empty sockets; a **given** brick shows its numeral in ink and is lit.
  - **Beams:** from a lit brick's top edge two soft light columns (each half the brick's width) rise into the two bricks resting on it. **Commit, then see** (critic: the first draft let a written brick's beams fill the sockets of the unknown brick above at once, so in "build up" every answer sat in the brick as countable lights BEFORE the child typed — and "add the wrong pair" could never happen): a beam into an UNKNOWN brick is drawn as a faint, empty column — it shows WHICH two bricks feed it, never how much. The unknown brick's sockets stay dark until the child presses Check with a number; only then does the true light pour in. The child's own counting tool is the given bricks' lights below (count the two supports), which is the pictorial strategy of G1-266, not the answer.
- **The street** (bottom strip, 452 × 28): small brick-wall silhouettes, one per solved wall.
- **Right column (220 px):** the **keypad** (1–20, keys 40 × 40, five per row; to-10 walls show 1–10 only) → bubble (≤ 3 lines) → speaker.

**At 360 px** (stacked): task line → wall 336 px wide (3 rows: bricks 108 × 76, numeral 28 px, to-10 sockets 2 × 5 cells 14 px, to-20 3-row walls use the glow bar; 4 rows: bricks 80 × 60, numeral 22 px, glow bar) → keypad 1–10 in two rows / 1–20 in four rows of five (keys 56 × 44) → bubble → Check. Check ≈ 700 px at 360 × 740 (4-row wall 4 × 60 + 3 × 4 = 252 px tall). **At 320 × 640:** 3-row bricks 96 × 68, 4-row bricks 72 × 54 (numeral 20 px), keypad keys 52 × 44; Check ≈ 630 px.

**Words on the apparatus:** none — numerals only.

## 5. The hand
- **Tap an unknown brick:** it lifts 4 px and gets a teal outline (selected); the keypad wakes. If the brick cannot be worked out yet (in "build up", a brick whose two supports are not both written), its unwritten support blinks twice instead — the dependency is shown, not explained. (In "missing bottom" and "start at the top", a brick can be worked out from above: a brick is workable when it has a written brick resting on it AND that brick's other support is written.)
- **Tap a key:** the number appears in the brick's box (it can be changed until Check).
- **Check** (per brick — the child can check as soon as the selected brick has a number): the brick tries the number: its light switches on and its beams rise; the round's physics shows whether it fits (§7). Right → the number turns to ink, the brick glows and its sockets fill; its beams into the bricks above brighten to show it now feeds them, but those bricks' sockets stay dark until they in turn are checked.
- **Tap a lit brick:** its beams pulse once (300 ms) — a "show me where your light goes" toy, never a miss.
- **Light in the sockets:** coral lights arrive from the left support, teal from the right, one socket every 60 ms, ten-frame order (top row left to right, then bottom row), so 5 and 3 read as "a full row and 3" (cf. the old school dot pattern).
- **Undo:** a written brick that was typed by the child can be tapped and cleared until the wall is complete; bricks resting on it clear too (their light drains).
- **Free play ("Build a wall"):** the bottom row takes any numbers 1–10 (a cap keeps the top ≤ 20); the wall builds and lights itself; tap any brick to hide it.

## 6. The rounds
A round = one wall; the child writes every unknown brick (in any workable order). Three missing modes (setting "Missing") over the same walls; two wall settings.

**Walls "3 rows to 10"** (G1-266, G1-246) — bottom / middle / top:
| # | bottom | middle | top |
|---|---|---|---|
| A1 | 1 2 3 | 3 5 | 8 |
| A2 | 2 1 2 | 3 3 | 6 |
| A3 | 3 1 4 | 4 5 | 9 |
| A4 | 1 3 1 | 4 4 | 8 |
| A5 | 5 1 2 | 6 3 | 9 |
| A6 | 6 1 1 | 7 2 | 9 |
| A7 | 1 1 7 | 2 8 | 10 |
| A8 | 3 2 2 | 5 4 | 9 |
| A9 | 1 4 1 | 5 5 | 10 |

**Walls "3–4 rows to 20"** (G1-267, G1-246 to 20) — bottom → top:
| # | rows (bottom → top) | top |
|---|---|---|
| B1 | 5 3 4 · 8 7 · 15 | 15 |
| B2 | 6 2 7 · 8 9 · 17 | 17 |
| B3 | 2 7 3 · 9 10 · 19 | 19 |
| B4 | 3 4 2 · 7 6 · 13 | 13 |
| B5 | 1 2 1 3 · 3 3 4 · 6 7 · 13 | 13 |
| B6 | 2 1 3 1 · 3 4 4 · 7 8 · 15 | 15 |
| B7 | 1 2 3 2 · 3 5 5 · 8 10 · 18 | 18 |
| B8 | 3 1 2 2 · 4 3 4 · 7 7 · 14 | 14 |
| B9 | 1 1 2 1 · 2 3 3 · 5 6 · 11 | 11 |

(Generated and checked by script: every brick = the sum of the two under it, no brick 0, every top within the cap.)

**Mode "Build up"** (G1-246, G1-266, G1-267): the whole bottom row is given; every brick above is unknown.

**Mode "Missing bottom brick"** (G1-268): every bottom brick is given except one; the brick resting on the gap (one of the two, as the worksheet does) is also given; everything else unknown. Gap (answer) per wall:
- A: A1 right (given middle-right 5 → 3) · A2 left (middle-left 3 → 2) · A3 right (5 → 4) · A4 middle (middle-left 4 → 3) · A5 left (6 → 5) · A6 left (7 → 6) · A7 right (8 → 7) · A8 middle (middle-right 4 → 2) · A9 middle (middle-left 5 → 4). (Critic: the first draft's A walls had bottoms 1–4 only, so every missing-brick answer was 2, 3 or 4 and "type 3" was right in 4 of 9 walls. A5–A8 rebuilt; answers now 3 2 4 3 5 6 7 2 4.)
- B: B1 right (7 → 4) · B2 left (8 → 6) · B3 middle (9 → 7) · B4 right (6 → 2) · B5 second from left (3 → 2) · B6 right (4 → 1) · B7 third from left (5 → 3) · B8 left (4 → 3) · B9 left (2 → 1).
Gap position: left 3, middle/inner 3, right 3 in each setting (33 % each — inside the review's 30–40 %).

**Mode "Start at the top"** (G1-289): the top brick plus exactly one brick in every lower row is given; everything else is worked out (down by subtracting, up by adding). Given bricks per wall (row: position):
- A: A1 top 8 · middle left 3 · bottom right 3 — A2 top 6 · middle right 3 · bottom left 2 — A3 top 9 · middle left 4 · bottom middle 1 — A4 top 8 · middle right 4 · bottom right 1 — A5 top 9 · middle left 6 · bottom right 2 — A6 top 9 · middle right 2 · bottom left 6 — A7 top 10 · middle left 2 · bottom middle 1 — A8 top 9 · middle right 4 · bottom left 3 — A9 top 10 · middle left 5 · bottom middle 4.
- B (3-row): B1 top 15 · middle right 7 · bottom left 5 — B2 top 17 · middle left 8 · bottom right 7 — B3 top 19 · middle right 10 · bottom middle 7 — B4 top 13 · middle left 7 · bottom left 3.
- B (4-row): B5 top 13 · row 3 left 6 · row 2 right 4 · bottom 2nd 2 — B6 top 15 · row 3 right 8 · row 2 left 3 · bottom right 1 — B7 top 18 · row 3 right 10 · row 2 middle 5 · bottom left 1 — B8 top 14 · row 3 left 7 · row 2 left 4 · bottom 3rd 2 — B9 top 11 · row 3 right 6 · row 2 middle 3 · bottom 2nd 1.
(Each given set was checked by a propagation solver: the whole wall follows uniquely. Critic re-checked every wall, every missing-bottom set and every start-at-the-top set with an independent brute-force solver over all bottoms 1–20, `work-c22/m250.js`: each has exactly one solution, every brick = the sum of its two supports, no 0, every top ≤ cap.)

Never 0 in any brick.
**Answer position:** answers are typed into bricks; the order of working is free, so there is no position to guess beyond the gap's place, which is balanced 3/3/3 as above. The given middle brick in "start at the top" alternates left/right (A: L R L R L R L R L). The gate asserts both balances.
**Order:** order-only reshuffle of the 9 walls per pass (never the same order twice); the street of finished walls resets each pass.

## 7. Check, the misses, the success
- **Check with no brick selected or the selected brick empty:** no miss. A workable unknown brick pulses; bubble: **"Pick a brick and type its number."**
- **Check on a brick that is not workable yet:** no miss; its missing support blinks; **"Find the bricks under it first."**
- **Miss 1 (wrong number in a brick):** the brick's light switches on with the CHILD's number and the physics shows the difference:
  - **building up** (the brick's supports are known): the true beams rise from its two supports and fill its sockets with the true count; the child's typed number is shown as a ring of that many socket outlines over them — extra outlines glow coral (too many) or lights sit outside any outline (too few). Bubble: **"Count the lights the two bricks under it send up."**
  - **working down** (a known brick rests on this one): the child's light rises from this brick into the known brick above; too many → the sockets fill and the extras **spill over the top as sparks**; too few → hollow rings stay dark. Bubble: **"Too much light — it spills over!"** / **"Some sockets are still dark."**
  The typed number then clears.
- **Miss 2 (second miss on the same brick):** the sockets that matter number themselves 1, 2, 3 …: building up — the lights in the brick; working down — the hollow rings left in the known brick above (exactly the missing count). In 4-row walls (glow bar) the bar shows tick numbers along its length. Bubble: **"Count the {lights|dark sockets}."**
- **A new number takes the help away** until the next Check.
- **Success (each brick):** a glass "ting", the numeral turns to ink, the brick glows, its beams rise and fill the bricks above. **Wall complete:** a wave of light from the bottom row to the top (120 ms per row), the top brick rings like a glass bell and bursts into light-dots, the wall slides into the street. Bubble: build up **"Every brick holds the two under it: 3 and 5 make 8 at the top!"** · missing bottom **"7 take away 3 is 4 — the missing brick was 4!"** · start at the top **"You worked down from 8 and built the whole wall!"** End of pass: **"A whole street of walls!"**

## 8. Settings
1. **Wall:** 3 rows to 10 · lights / 3–4 rows to 20 · lights / Numbers only to 20 (default 3 rows to 10 · lights) — at rest the brick count, the sockets or glow bars, and (numbers only) dark bricks with numerals change. Numbers only = the B walls with no light at rest; light appears only on a miss (the beams and sockets of miss 1/2).
2. **Missing:** Build up / Bottom brick / Start at the top (default Build up) — at rest the given bricks change.

## 9. Words (EN source)
- on-screen title: **The Number Wall**
- instruction: **Each brick holds the two bricks it stands on. Pick a brick, type its number and press Check — its light climbs into the bricks above.**
- prompts: build up **Build the wall to the top.** · missing bottom **One bottom brick is missing. Find it, then build the wall.** · start at the top **The top is given. Work down, then fill the wall.**
- hints: **Pick a brick and type its number.** · **Find the bricks under it first.** · **Count the lights the two bricks under it send up.** · **Too much light — it spills over!** · **Some sockets are still dark.** · **Count the lights.** · **Count the dark sockets.**
- success: **Every brick holds the two under it: {l} and {r} make {t} at the top!** · **{u} take away {k} is {m} — the missing brick was {m}!** · **You worked down from {t} and built the whole wall!** · **A whole street of walls!**
- free play: **Build a wall**
- settings: **Wall** — **3 rows to 10 · lights** / **3–4 rows to 20 · lights** / **Numbers only to 20** · **Missing** — **Build up** / **Bottom brick** / **Start at the top**

**Locale traps:**
- **The name of the thing:** de "Zahlenmauer", nl "rekenmuur", sv "talmur" (also "sifferpyramid"), da "talmur", no "tallmur", fi "lukumuuri"/"laskumuuri", fr "mur de nombres" (also "pyramide de nombres"), es "muro numérico"/"pirámide de números", pt "muro de números"/"pirâmide numérica", it "muro dei numeri"/"piramide dei numeri". Each locale's reviewer picks its school word; the apparatus is the same wall.
- **"Brick"** is literal in every locale (de "Stein" in Zahlenmauern, not "Ziegel"; nl "steen"; sv/no "sten"/"stein", fi "kivi" — the school terms, not the construction terms).
- **"Stands on / rests on"**: de "steht auf", fr "repose sur", fi "on … päällä"; the instruction is authored whole per locale.
- **"Light"/"sockets"** are poetic; the hints may use "dots"/"places" where a locale has no natural "socket" (fi "paikat", de "Plätze").
- Numbers are numerals; no plurals with nouns except "bricks" (fi partitive after numbers, not used in strings with numerals).

## 10. Sound off, access, phones
- Legible silent: glowing bricks, rising beams, filling sockets, sparks and dark rings show everything.
- Keyboard: arrow keys move between bricks (geometric: ↑ goes to the brick resting on the right of the current one, ↗/↖ via Shift+←/→), digits type, Enter = Check, Esc clears the box.
- aria: each brick "brick, bottom row, 2nd from left, 3" / "brick, middle row, left, unknown"; the live region reads "5 lights arrive: 3 from the left, 2 from the right".
- Taps: bricks ≥ 72 × 54 px everywhere (the whole brick is the target); keys ≥ 44 px.
- Reduced motion: lights appear at once, no beams travel; the bell burst is a single highlight.

## 11. Distinct from
- **#089 Two Gauges** (this batch, the number-wall panel in its big level): one equation read on dials; here the wall is the apparatus and its dependency structure is the lesson.
- **#30 Overflow Trays** (pour into a tray until it overflows into the next — teen numbers) and the coverage review's pour-up crates: here nothing is moved; light is copied up into two bricks, which is what a number wall actually does.
- **build-plan (tool):** numbers on a blueprint and a 3-D building's views — spatial; no sums.
- **Row 27 Two-Ended Lantern String, row 106 Light-Leak Lantern, New 237 Star Walk** (other batches) use light as a signal along a string, through gaps, or along a path; here light is a QUANTITY — a brick holds exactly its number of lights and passes copies up into the two bricks resting on it.
- **#248 Fact Family Bar** and **#249 Fair Tug:** families and doubles; #250 is chained addition and subtraction.

## 12. Build plan
- **Core state:** `{ wallSet, missing, order[], idx, n (rows), value[r][c], given[r][c], written[r][c], selected:null|{r,c}, typed:int|null, misses: map brickKey→int, help }`.
- **Functions:** `workable(r,c)` (supports both written, or a written brick above with its other support written), `beamsInto(r,c)` → `{left, right}` (light from the true supports), `tryNumber(r,c,v)` → `{ok, mode:'up'|'down', extra, short, spill}`, `clear(r,c)` (and everything resting on it), `complete()`, `nextTask(index)`.
- **Gate `verify-number-wall-bricks-core.js` (own oracle):** (1) every table brick equals the sum of its two supports, no 0, tops within cap; (2) a propagation solver proves each missing-mode given set determines the wall uniquely; (3) `tryNumber` accepts iff v equals the oracle's brick value, for v = 1…20 on every brick of every wall in every mode; (4) `spill` = v − (above − other support) when > 0 in down mode; (5) `workable` matches the dependency rule; a non-workable brick never accepts; (6) gap positions 3/3/3 per wall set; given middle alternation in start-at-top; (7) light never flows sideways (beams only into (r+1, c−1) and (r+1, c)); (8) an unknown brick shows zero lit sockets at rest in every mode and setting (no answer is countable before Check); missing-bottom answers span ≥ 5 different values per wall set.
- **Mutations:** the beams pour light into an unknown brick before Check (answer countable at rest); a brick sums a diagonal pair; light flows sideways; down mode adds instead of subtracting; spill count off by one; a non-workable brick accepts a number; clearing a brick leaves the bricks above lit; a 0 brick in a table; two gaps in one wall; gap always left; numbers-only setting shows lights at rest.
- **Pictures:** none (glass bricks are apparatus geometry). **Risks:** the 4-row wall at 320 px (bricks 72 × 54) — numeral 20 px + glow bar 8 px tall fit; sockets are never used there. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a glowing glass wall that lights itself row by row, sparks when you overshoot, and a bell at the top.
2. **Would a teacher put it on the board?** Yes — "Which two bricks send their light into this one?" The beams make "the two it stands on" impossible to miss, and the spill makes subtracting-down visible for the missing-brick and start-at-the-top worksheets.
3. **Would a parent trust it?** Calm, no score or timer, numerals only, the help counts but never tells.
4. **The invention:** every brick is a glass block whose light rises only into the bricks resting on it, and each brick holds exactly as many lights as its number — so building up is adding the light that arrives, and finding a missing brick is filling the dark sockets that are left.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **The answer was countable before the child typed:** a written brick's beams filled the sockets of the unknown brick above at once, so in "build up" every brick displayed its own answer as lights, and the wrong-pair misconception the design names could not occur. Now beams into an unknown brick are empty columns (which bricks feed it, not how much); light pours in only after Check. Gate clause (8) + mutation.
- **Missing-brick answers were 2, 3 or 4 in all nine "to 10" walls** (bot: "type 3" wins 4 of 9). A5–A8 rebuilt (5 1 2, 6 1 1, 1 1 7, 3 2 2); answers now 3 2 4 3 5 6 7 2 4; gap position still left 3 / middle 3 / right 3.
- **Every wall and every given set re-solved** by my own brute-force solver (all bottoms 1–20): exactly one solution each, including the new start-at-the-top sets for A5–A8.
