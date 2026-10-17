# New 254 — The Picture Graph Shelf: THE CATCH-UP CUBBIES (1.MD.C.4)

## 0. Identity
- key `picture-graph-shelf` · id `picture-graph-shelf.play.1-md-c-4` · grade 1 · CCSS 1.MD.C.4 · strand Measurement & Data · files `picture-graph-shelf-core.js`, `picture-graph-shelf-activity.js`, `picture-graph-shelf-activity.html`, `picture-graph-shelf-activities.json` (new engine, registered in `MANIFEST_FILES`; slugs, titles and intros authored for all 11 locales at build).
- worksheets it covers: **G1-141** Read the Picture Graph (count each row, write the numbers) · **G1-142** Most of All (circle the one with the most) · **G1-146** Sort and Count (count each kind, write the totals in the table).
- new instrument; the coverage review's sketch (shelves with slots, refuse-the-wrong-row, tap-the-overhang) is the starting point. Changed: "how many more" is no longer answered by tapping the overhang (that is the comparison-planks tool's move) — the short row CATCHES UP with ghost pictures until a latch drops, which is the difference made physical.

## 1. The pitch
"Every cubby holds one thing and every row starts at the same wall — and to find how many more, you fill the short row with ghosts until the latch can drop: the ghosts ARE the answer."

## 2. Why a child will want it again
- **The tumble.** Each round starts with a handful of library pictures tumbling onto a wooden table with a little bounce, jumbled and overlapping. Tidying a mess is satisfying in itself.
- **Snap, snap, snap.** Dragged to its row, a picture slides along the shelf and drops into the next free cubby with a wooden clack — always the next one, so the row grows from the wall like beads on a rod.
- **The latch.** A brass latch bar hangs above the shelf's right end. When the rows are equally long it swings down across them with a satisfying CLUNK. Catching up the short row with dotted ghosts, one tap per ghost, until the latch can fall, is the moment of the round.
- **The table empties, the card turns.** When the question is answered right the question card flips over to show the answer sentence and every cubby gives a little hop in turn, row by row, counting itself.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (1.MD.C.4):** organise up to three categories of objects into a picture graph (one picture per cell), and answer questions about it — how many in each, which has most / fewest, how many more / fewer one has than another, how many in all.
- **Misconceptions and the push-back:**
  - *"Most" judged by how spread out the pictures look:* on the table the fewest kind is always laid out widest and the most kind huddled (the generator's spread rule, §6); on the shelf every picture takes exactly one cubby from the same wall, so length can only mean number. The table literally lies and the shelf tells the truth.
  - *A row made longer by spacing:* impossible — a picture can only drop into the next free cubby; there are no gaps to leave.
  - *"How many more" answered with the bigger count* ("apples: 7" for "how many more apples than pears?"): the latch will not drop until the short row is as long as the long one; the number of ghosts it took is the difference, and only that number is accepted. A child who types 7 sees the miss show the latch line and the gap — the gap is 3 cubbies, not 7.
  - *Total = the biggest row:* the "in all" help numbers the cubbies straight on from one row into the next.

## 4. The stage
**At 704 (stacked):**
- **The table** (top), 660 × 300 px: a warm wooden surface (#E9D3B0, 3 px ink edge). The round's pictures (max 19) lie on it at 96 px (overlap ≤ 25 % except inside the huddled kind, slight random rotations −8°…8°). 660 × 300 holds a 6 × 3 grid of 96 px pictures without overlap, so the 19-piece round fits with the huddle overlapping. When the table is empty it folds away (300 ms) and the question card + number strip take its place, so the stage never carries both.
- **The shelf** (below), 640 × (rows × 100) px: a wooden frame with a thick left **wall** (14 px, the start line) and rows of **8 cubbies**. Each row: a **label plaque** 104 × 100 px at the wall holding the kind's library picture at 96 px (the row's name — a picture, no word) and, in its top-left corner, a drawn **row badge** 26 px (row 1 a teal circle ●, row 2 a coral triangle ▲, row 3 a gold square ■ — shape AND colour, apparatus geometry), then 8 cubbies 64 × 76 px (dividers 2 px). In a cubby the picture sits at 60 px — a data mark (the graph's symbol), the same drawing as the label. Empty cubbies show a faint dotted square.
- **The latch:** a brass bar (12 px wide) hinged above the shelf; it swings down along any vertical cubby line, normally parked at the right end, out of the way.
- **The count boxes** (count setting on): one box 56 × 56 px at the right end of each row, outside the cubbies (the "table" of G1-146), with the row's badge (16 px) above it, Baloo 2 32 px numeral when filled.
- **The number strip** (under the shelf, when a number is asked): tiles 1…10 (or 1…24 for totals, two rows of 12), each 52 × 52 px.
- **The question card** (in the table's place once it folds): 300 × 80 px; the question with inline **row badges** (28 px drawn ●/▲/■, never shrunken library pictures — the picture ruling) for the rows it names — e.g. "How many more ● than ▲?" — and at the same moment the two named rows' label plaques glow in their badge colour and pulse once, so the 96 px picture of each kind is what the child actually reads.
- **Bubble** (18 px) under the card. **Task line** (20 px) above the table.

**At 360:** table 328 × 260 (pictures 64 px; 5 × 4 grid capacity); shelf 328 wide in two bands per row: the label band (row badge 22 px + the kind's picture at 64 px, 328 × 68, tappable as the row) above its cubby band (8 cubbies 39 × 46 starting at the same wall, data marks 32 px); count boxes move to a strip of three under the shelf (one per row, its badge 22 px beside it, box 48 × 48); number strip 5 per row (tiles 56 × 48). 320: cubbies 35 × 44, marks 30 px (never below the ruling's 30 px floor).
⚠ **Data marks (PICTURE-RULINGS: allowed only inside a graph, ≥ 40 px at 704 / ≥ 30 px at 360):** a graph row of 8 cannot hold 96 px pictures at 704 (or 64 px at 360). The kind's full-size picture is the row's label (96 / 64 px) and appears full size on the table; inside the cubbies the same drawing is a data mark (60 px at 704, 32 px at 360, 30 px at 320 — all at or above the floor). The question card and count strip use drawn row badges, never small pictures — exactly as on the printed worksheet, where a picture graph uses small symbols. The hierarchy audit is told this (the cubby marks are tagged `data-mark`); everything else meets the rule.

Pictures (theme JSON + contact sheets checked; identical instances per kind; no cherry — it is drawn as an apple; never chick with duck): fruits — apple, banana, pear, orange, strawberry, lemon · vegetables — carrot, tomato, corn, potato · toys — ball, car, kite, boat · farm-animals — pig, sheep, cow, duck · insects-and-bugs — ladybug, bee, butterfly, snail. One theme per round, kinds chosen to be unmistakable at 30 px (no apple with tomato in one round; no orange with lemon at 30 px — both round and yellow-orange — never together).

## 5. The hand
- **Drag a picture** from the table to the shelf: it lifts (scale 1.08, shadow) under the finger within 30 ms. Drop it over its own row (anywhere on the row, label or cubbies) → it slides to the next free cubby from the wall (180 ms) and clacks. Drop it over another row → it bumps against that row's label plaque (a 6 px shove, 120 ms), then glides back to its table spot (250 ms). Drop it nowhere → back to the table.
- **Tap a picture on the table** (access path): it is selected (ring); tapping a row's label plaque sends it there (same right/refuse rules).
- **Take one back:** tap the LAST picture in a row → it hops back to the table (only the last one, so the row never has a gap).
- **Count boxes:** tap a box → it opens (ring), tap a number tile → the numeral drops in; tap the box again to change.
- **Catch-up ghosts (how-many-more questions):** the two asked rows glow; the third (if any) dims. Tapping the first empty cubby of the SHORTER row adds a ghost (the kind's picture as a dotted outline, 40 % alpha) — one per tap, always the next cubby. When the short row's ghosts reach the end of the long row, the latch swings down (300 ms) across both rows: CLUNK. A tap past that point does nothing but a soft bump (the latch is down; it is level). Tapping the last ghost removes it (and lifts the latch if it was down). Ghosts are a tool, never required — the child may answer straight away.
- **Rows (most / fewest questions):** tap a row's label plaque to choose it (teal ring).
- **Free play:** before the table is empty the child may move pictures freely; after success, pictures may be dragged back to the table and re-sorted; the latch can be swung by dragging it to any cubby line (it lies along that line — a ruler for "who reaches here?").
- **Keyboard:** Tab cycles table pictures; 1/2/3 sends the focused picture to row 1/2/3; Tab → boxes/strip/rows; Enter.

## 6. The rounds
A round = a theme, 2 or 3 kinds with counts (1–8, all different within the round except where stated), the jumble, and one question (plus the count boxes when the count setting is on). The table empties into the shelf before the question card appears.

**3 categories (8 rounds):**
| # | theme · kinds (row order) | counts | question | answer |
|---|---|---|---|---|
| 1 | fruits · apple, banana, pear | 5, 7, 3 | Which has the most? | banana (row 2) |
| 2 | toys · ball, car, kite | 6, 2, 4 | How many more balls than kites? | 2 |
| 3 | farm · pig, sheep, cow | 4, 8, 5 | Which has the fewest? | pig (row 1) |
| 4 | bugs · ladybug, bee, snail | 3, 6, 7 | How many fewer ladybugs than snails? | 4 |
| 5 | vegetables · carrot, corn, potato | 8, 5, 6 | How many in all? | 19 |
| 6 | fruits · strawberry, orange, banana | 2, 6, 8 | Which has the most? | banana (row 3) |
| 7 | toys · boat, ball, car | 7, 3, 5 | How many more boats than cars? | 2 |
| 8 | farm · duck, cow, sheep | 6, 4, 1 | Which has the fewest? | sheep (row 3) |

**2 categories (8 rounds):**
| # | theme · kinds | counts | question | answer |
|---|---|---|---|---|
| 1 | fruits · apple, pear | 6, 4 | How many more apples than pears? | 2 |
| 2 | bugs · bee, butterfly | 3, 8 | Which has the most? | butterfly (row 2) |
| 3 | toys · kite, car | 7, 2 | How many fewer cars than kites? | 5 |
| 4 | vegetables · tomato, carrot | 5, 7 | How many in all? | 12 |
| 5 | farm · cow, pig | 8, 5 | Which has the fewest? | pig (row 2) |
| 6 | fruits · lemon, strawberry | 4, 7 | How many more strawberries than lemons? | 3 |
| 7 | toys · ball, boat | 5, 6 | How many more boats than balls? | 1 |
| 8 | bugs · snail, ladybug | 8, 3 | How many in all? | 11 |

**Question setting** filters/rebuilds the question of each round from its counts: "most & fewest" turns every round's question into most or fewest — per round the one fixed in a table so the answer rows balance (3 categories: r1 fewest→row 3, r2 fewest→2, r3 most→2, r4 most→3, r5 most→1, r6 fewest→1, r7 fewest→2, r8 fewest→3 = 2/3/3; 2 categories alternate most/fewest = 4/4), "how many more & fewer" into a more/fewer question between two named rows (the pair chosen so the difference is 1–5 and the asked pair includes the middle row in half the 3-row rounds), "everything" keeps the table above. The gate recomputes every question's answer from the counts.

**Jumble rule (the spread lie):** on the table, the kind with the fewest pieces is laid out on a wide grid (spacing 1.8 × picture size), the kind with the most is huddled (spacing 0.7 ×, overlapping); a middle kind normal. Pieces are shuffled in depth (interleaved), so the table never pre-sorts.

**Answer position:** most/fewest answer rows over a pass: in the "everything" list the four most/fewest questions sit in rows 2, 1, 3, 3 (3 categories) and 2, 2 (2 categories); the most & fewest setting balances them 2/3/3 and 4/4 (table above); the longer row in more/fewer questions is row 1 in half the rounds and the later row in the other half; the asked first noun is the bigger row in "more" questions and the smaller in "fewer" questions (so every question is true). Numeric answers span 1–5 (differences) and 11–19 (totals) with no answer repeated more than twice per pass. (The sentence order — the bigger kind named first in "more", the smaller first in "fewer" — is the meaning of the question, so it is not counted as a tell; the answer is a number, and the row positions of the bigger kind are what is balanced.) **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with pictures still on the table** → hint "Put every picture on the shelf first." (no miss; the table pictures wiggle).
- **Check with count boxes empty (count setting)** → hint "Write how many are in each row." (no miss).
- **Check with the question unanswered** → hint by question: "Tap a row." / "Choose a number." (no miss).
- **Count boxes wrong** (checked first): the wrong box's row gets a hop-count (each cubby in that row lifts in turn, 150 ms apart) — the miss shows the counting, not the number. Hint "Count the {token} row again."
- **Miss 1 — what the apparatus shows:**
  - *most/fewest:* the latch swings to the end of the row the child picked and lies down there across all rows — rows reaching past it (most) or stopping short of it (fewest) are seen at once. Hint "Look at where each row ends."
  - *more/fewer:* if the child has not made ghosts, the latch drops at the end of the LONG row across both rows and the short row's empty cubbies up to it flash (outlined teal). Hint "How many cubbies until the short row catches up?"
  - *in all:* every cubby in row 1 shows a small numeral 1, 2, 3 … (13 px, top-left); the next rows stay blank. Hint "Count on into the next row."
- **Miss 2:**
  - *most/fewest:* each row's count appears in its count box (filled by the apparatus, grey), with the right row's plaque pulsing.
  - *more/fewer:* the ghosts fill in by themselves one by one, each numbered 1, 2, 3 … and the latch clunks. Hint "Count the ghosts."
  - *in all:* the numbering continues through every row to the last cubby.
- Any new move (a tap, a ghost, a number) clears the showing.
- **Success:** the question card flips (400 ms) to the answer sentence; every filled cubby hops once in reading order with a soft rising tone; ghosts (if any) turn solid for a moment and then fade, the latch rising. Bubble = the card's sentence:
  - most: "The {token} row is the longest — {n} is the most!"
  - fewest: "The {token} row is the shortest — {n} is the fewest!"
  - more: "{a} is {d} more than {b}!" (e.g. "7 is 3 more than 4!") — the numbers, never noun inflections.
  - fewer: "{b} is {d} fewer than {a}!"
  - in all: "{a} + {b} + {c} = {total} in all!"

## 8. Settings (each visibly changes the board at rest)
1. **Categories:** two / three — the shelf has two or three rows.
2. **Question:** most & fewest / how many more & fewer / everything (incl. how many in all) — the question card's corner shows the question type icon at rest (a crown-free icon set: an up-bar for most/fewest, the latch for more/fewer, a plus for in all); **Count boxes** sit inside this setting as a second toggle: "write the counts: on / off" (on by default: the boxes appear at the row ends).

## 9. Words (EN source)
- title (in-tool): "The Picture Graph Shelf"
- instruction: "Sort the pictures onto the shelf. Then answer the question."
- questions ({token…} = the named row's drawn badge ●/▲/■, while that row's 96 / 64 px label plaque glows — never a shrunken library picture): qMost "Which has the most?" · qFewest "Which has the fewest?" · qMore "How many more {tokenA} than {tokenB}?" · qFewer "How many fewer {tokenA} than {tokenB}?" · qAll "How many in all?"
- hints: hintTable "Put every picture on the shelf first." · hintCounts "Write how many are in each row." · hintRow "Tap a row." · hintNumber "Choose a number." · hintRecount "Count the {token} row again." · hintEnds "Look at where each row ends." · hintCatch "How many cubbies until the short row catches up?" · hintCountOn "Count on into the next row." · hintGhosts "Count the ghosts."
- success: as §7.
- settings: "Categories" · "two" · "three" · "Question" · "most and fewest" · "how many more and fewer" · "everything" · "Write the counts" · "on" · "off"
- aria: rows "{label plural}: {n}" (from an authored count-form table, below); ghost "ghost {label}".
- **Locale traps:**
  - **Noun inflection after numbers and in comparisons is never generated.** On screen the kinds are picture tokens; the sentences carry numbers ("7 is 3 more than 4"). Spoken/aria forms need case: fi partitive after numbers and *kuin* (*kolme omenaa*, *enemmän omenoita kuin päärynöitä*), de plural with *als* (*mehr Äpfel als Birnen*), fr *de* (*plus de pommes que de poires*). So a small authored table — the ~22 nouns used × 11 locales × the 2–3 forms each frame needs — is part of the build, and the reviewer checks every (question × noun pair) the gate prints. The image-vocabulary plural is NOT enough for fi.
  - **more / fewer / less:** en *fewer* (count noun); de *weniger*, fr *moins de*, es/pt *menos*, it *meno*, nl *minder*, sv/da/no *färre / færre / færre*, fi *vähemmän* — "fewer" questions are authored as their own strings, never "more" negated.
  - **"in all"**: de *insgesamt*, fr *en tout*, es *en total*, pt *ao todo*, it *in tutto*, nl *in totaal*, sv *sammanlagt*, da *i alt*, no *til sammen*, fi *yhteensä*.
  - **Graph direction:** rows run left-to-right from the wall in every locale (all 11 read left to right).
  - Strawberry plural, sheep (invariant plural en) — handled by the table; the screen never shows these words.

## 10. Sound off, access, phones
- Sound off: the badges + glowing plaques carry the kinds, the latch and ghosts show the comparison, numbers carry the answer. TTS (bonus) reads questions via the authored count-form table.
- Keyboard path §5; every table picture is a focusable button ("apple, on the table"); every row label plaque a button ("apple row, 5").
- Taps: table pictures 96 / 64 px; cubbies 64 × 76 / 39 × 46 (a ghost tap anywhere on the short row's empty part counts as "the next cubby", so the effective target is the row: ≥ 50 px tall); number tiles ≥ 48 px.
- Fold at 360 × 740: sorting phase task 48 + table 260 + shelf 3 × 118 + Check 56 ≈ 720; question phase (table folded) task 48 + card 72 + number strip 2 × 52 + shelf 354 + count strip 56 + Check 56 ≈ 690. At 320 × 640 the label band drops to 56 (picture 64 px still) and the count strip shares the number strip's place (one shown at a time) → ≤ 630 in both phases.

## 11. Distinct from
- **Row 35 The Sorting Chutes (designed, K.MD.B.3):** a conveyor feeds one object at a time into vertical glass tubes; here the whole jumble lies on a table (the spread lie is the point), the graph is a horizontal shelf from a wall, numbers are written into a table, and the grade-1 questions "how many more / fewer / in all" are answered with the catch-up ghosts and latch — which the chutes do not have.
- **class-graph tool** (votes → picture graph → bar graph): no voting, no conversion; here the child sorts and interprets.
- **comparison-planks tool** (the overhang comes off the long plank and lands at the end of the short one): nothing moves off the long row here; the short row is filled with ghosts until a latch drops — the "make them equal" (missing-addend) view of difference, which is the other one children need.
- **#17 Partner Bows** pairs objects across two mats for more/less at K; no rows, no graph, no difference number.

## 12. Build plan
- **Core state:** `{cats:2|3, qmode, counts:[n1,n2,(n3)], kinds:[…], table:[{kind,x,y,rot}], rows:[[…]], boxes:[null…], ghosts:0, latch:'park'|cubbyIndex, pick:null|row|number, miss, help}`.
- **Core functions:** `place(piece,row)` → 'ok'|'refuse' (kind must match; index = rows[row].length) · `takeBack(row)` (last only) · `addGhost()` (only on the shorter asked row, only up to the longer row's length) · `latchLevel()` (true when short + ghosts = long) · `question(round, qmode)` → {type, rows, answer} · `jumble(round, seed)` (the spread rule) · `check(state)` → `{ok, kind:'table'|'boxesEmpty'|'boxWrong'|'unanswered'|'wrongRow'|'biggerCount'|'otherNumber'|'notTotal'}`.
- **Gate ground truth (own oracle):** counts per round distinct and 1–8; every answer recomputed from counts (argmax/argmin unique, |a−b| for more/fewer, sum for in all); in every round the fewest kind's jumble footprint (bounding-box area) is ≥ 1.5 × the most kind's (the lie is real); `place` never leaves a gap; ghosts cannot exceed the difference; position balance as §6; the asked first noun in "more" questions is the bigger row and in "fewer" questions the smaller; no forbidden picture pairs in one round (orange+lemon, apple+tomato, duck+chick, cherry anywhere); every (question × noun pair) has an authored aria string in all 11 locales · no library picture is rendered below 96/64 px outside the cubbies, and no cubby mark below 40 px at 704 / 30 px at 320–360 (the data-mark ruling) · the question card's badges match the named rows' plaques.
- **Mutations:** wrong row accepted · a piece can drop into any cubby (gap) · "how many more" accepts the bigger count · ghosts allowed past the long row · latch drops before level · in-all accepts the biggest row · spread rule inverted (most kind spread) · take-back allowed from the middle of a row · counts duplicated in a round · help survives a new move · fi aria built from the nominative plural · a shrunken library picture used as a question token · a 19-piece table generated with a non-huddle overlap > 25 %.
- **Pictures to confirm on a contact sheet at build:** each used kind at 30 px in a cubby (fruits, vegetables, toys, farm, bugs sheets already seen: apple, banana, pear, orange, strawberry, lemon, carrot, tomato, corn, potato, ball, car, kite, boat, pig, sheep, cow, duck, ladybug, bee, butterfly, snail all clear at full size; the 30 px read is the build check).
- **Risks:** 30 px data marks on phones (the reason for the exception and the per-round "unmistakable kinds" rule); a 20-piece table at 320 px — the table holds max 20 pieces at 64 px with ≤ 25 % overlap, the generator refuses denser layouts and re-seeds.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a tumbling heap to tidy, cubbies that clack, ghosts to summon and a latch that CLUNKS.
2. **Would a teacher put it on the board?** Yes — "how many more?" is the hardest picture-graph question in grade 1, and "fill the short row until it catches up" is the method teachers want; the spread-out table makes the "looks like more" trap visible to the whole class.
3. **Would a parent trust it?** Yes — library pictures, a calm shelf, numbers that match the worksheet, no score.
4. **The invention, in one sentence:** every cubby holds one thing from the same wall, and the short row fills with ghosts until the latch drops — the ghosts are how many more.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Data-mark ruling applied: cubby marks stay library pictures only because the shelf IS the graph, and now never fall below the floor (60 px at 704, 32 at 360, 30 at 320 — was 28 at 320). The 28 px inline picture tokens on the question card and the 28 px pictures in the phone count strip (not graph rows) became drawn row badges ●/▲/■ (shape + colour), with the named rows' 96/64 px plaques glowing as the real reference.
- The table could not physically hold the rounds (19 pictures at 96 px on 640 × 190 is ~1.4× its area): now 660 × 300 at 704 / 328 × 260 at 360, folding away once empty so the question phase reuses the space; folds re-measured for both phases at 360 × 740 and 320 × 640.
- Removed a false claim (that noun order never tells the longer row — in "how many more A than B" it must, or the question is false); the balanced quantity is stated correctly as row position.
- Gate + mutations extended for the size floor, badge/plaque agreement and the table density. Round tables re-verified (all 16 answers recomputed; most/fewest setting balance 2/3/3 and 4/4 confirmed). Distinct from class-graph (no voting/conversion) and comparison-planks (nothing is carried off the long row).
