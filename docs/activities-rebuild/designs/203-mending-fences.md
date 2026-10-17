# Row 203 — The Mending Fences → THE FENCE ROLL: wind the roll you think fits, then let it run round the field from the gate (3.MD.D.8)

## 0. Identity
- **id** `mending-fences.mend-board.3-md-d-8` (KEPT; slug/title/intro frozen en..nl; sv/da/no/fi get new metadata at build, grade 3) · grade 3 · CCSS 3.MD.D.8 · Measurement & Data · own files `mending-fences-core.js` (rewritten), `-activity.js`, `-activity.html`, manifest row.
- **Worksheets covered:** G3-337 "Walk the Edge" (count the unit edges around a rectangle; write the perimeter) · G3-339 "Same Fence, New Yard" (find the rectangle with the same distance around).
- **What the old activity did:** five round kinds with Hazel the badger — mend a board (given the whole fence and one side; three number cards), which field needs more fence / grows more grass, edge marks or inside squares, does the roll reach, same area different perimeter. **Kept:** Hazel, every round kind, every field of the old table (6 × 4, 7 × 3, 8 × 4 → reworked as mend rounds; 9 × 2 vs 5 × 5; 10 × 2 vs 6 × 5; the C-field vs 7 × 2; the 4 × 3 fence job; the 5 × 3 grass job; the 16-roll on 4 × 3; the 14-roll on 5 × 4; 6 × 2 vs 4 × 3). **Replaced:** the number cards (in all three live mend rounds the right card was the SMALLEST of the three — {14, 4, 8} → 4, {17, 7, 11} → 7, {20, 8, 12} → 8 — a "pick the smallest" tell; answers are now wound onto a roll, so there are no cards), the drawn Hazel placeholder (now `forest-creatures/badger`), and the verdicts (now the roll itself closes, falls short or has boards left over).

## 1. The pitch
"Wind as many fence boards onto Hazel's roll as you think the field needs, then let it go: the roll unrolls board by board round the edge from the gate — the right number latches back onto the gate, too few leave a gap, too many pile up."

## 2. Why a child will want it again
- **Winding the roll.** Type a number and the spool winds it on with a ratchet tick per board — the roll visibly fattens (its diameter grows with the count, a 20-board roll twice as fat as a 5-board one). Children wind huge rolls just to see.
- **The run (the show).** Press Check: the roll trundles out of the gate and lays boards along the field's edge, one plank every 120 ms with a knock, turning each corner with a little wobble. If it is exactly right, the last board meets the gate post, the latch drops with a clack, and a farm animal (library picture) trots in through the gate. Too few: the roll runs out and the gap stays open, ghost boards drawn dashed. Too many: the spare boards tumble into a heap by the gate.
- **The seed bag.** For grass questions a seed bag sweeps the inside, and each square sprouts green with its number — the inside fills while the fence stays the edge, so the child sees the two measures living side by side.
- **Carry the roll.** In "same fence, new yard" rounds Hazel's exact roll for one field is carried to three other yards; you choose where it will close, and it runs round your choice.
- **Free play:** between rounds the field stays live — wind any roll and run it.

## 3. The skill and the misconception
- **Skill:** perimeter is the distance all the way around a plane figure, counted in unit lengths (boards) along the edge; find it for rectangles and for L/C/T-shaped fields; find an unknown side length from the others; tell perimeter from area; rectangles with the same perimeter can have different areas and the reverse.
- **Misconception 1 — counting the inside squares (area) for the fence.** **Pushback:** a roll of 12 boards for a 4 × 3 field runs out two boards before the gate; the gap is two dashed boards long.
- **Misconception 2 — counting the edge SQUARES instead of the edges** (10 for a 4 × 3: the four corner squares counted once). **Pushback:** the run shows a board on BOTH outer sides of every corner square — the 10-roll leaves a gap of 4.
- **Misconception 3 — adding length and width once** (7 for 4 × 3). **Pushback:** the roll gets halfway round — exactly two sides — and stops.
- **Misconception 4 — more fence means more grass.** **Pushback:** compare rounds ask both questions about the same two fields; the long thin field wins the fence and loses the grass; the seed bag numbers the grass squares and the roll numbers the boards, both visible together.

## 4. The stage
**At 704 px (split: paddock left 470 px, Hazel + the roll + bubble right 210 px):**
- **Task line** (20 px), §9.
- **The paddock:** a meadow-green field on a light ground, drawn on a square grid with cell **42 px** (fields up to 10 wide: 420 px); grass squares show faint lines (setting "count the boards") or no lines with each side's length written in the middle of the side (setting "side lengths written", numerals Baloo 2 18 px). The gate is always the top-left corner post (a taller post with a latch). Intact fence boards are drawn planks along cell edges (5 px thick, one plank per unit edge, a post at each joint).
- **Mend rounds:** some sides are intact, the broken stretch shows only posts at its two ends and bare ground between.
- **Compare rounds:** two fields side by side (each ≤ 220 px wide at a shared cell size of 22 px for the 10 × 2) with a tap target around each (≥ 200 × 120).
- **Same-roll rounds:** a small "home field" top left with its roll lying beside it, and three yards in a row below at a shared cell size.
- **Right column:** Hazel = `forest-creatures/badger` at **96 px**; the **roll** (drawn spool, diameter 40–96 px by count) on a little stand; keypad 3 × 4 keys 56 × 52 with the answer box (110 × 60) printed "boards" (fence) or "squares" (grass) by the job; Check 140 × 56; bubble.
- The **job card** (job and compare rounds): an icon tile 72 × 72 — a fence plank icon (fence) or a grass-tuft icon (grass), drawn apparatus. Compare rounds show the fence icon first, then the grass icon.
- The **animal** that trots in on success: `farm-animals/sheep`, `farm-animals/goat`, `farm-animals/cow`, `farm-animals/donkey`, `farm-animals/pig` (rotating), **96 px**, entering at the gate (it walks over the fence line onto the field, overlapping the field — never shrunk to fit inside).
- No words on the apparatus: side lengths are numerals.

**At 360 px (stacked):** paddock full width, cell **30 px** (10 wide = 300 px); compare fields stacked vertically; same-roll yards cannot sit 3-up legibly at 360, so the phone shows the three yards **one at a time in a carousel** (swipe or ‹ › buttons 44 px), each at cell 26 px, with three dots showing which yard is on screen; a tap on the shown yard chooses it. Hazel 64 px beside the roll; keypad 4 × 3 keys 76 × 46; Check full width. Budget 360 × 740: header 56 + task 48 + paddock ≤ 230 + Hazel/roll/answer band 90 + keys 100 + Check 52 = 576 ✓; 320 × 640: cell 27, keys 70 × 44 → 560 ✓.

## 5. The hand
- **Wind:** each digit typed winds the spool to the new count (ratchet tick per board added, 30 ms each, the spool's diameter animating); ⌫ unwinds. Keyboard digits.
- **Run (Check):** the roll moves to the gate (200 ms), then lays one board per unit edge clockwise from the gate, 120 ms per board, each board's running number flashing on it for 400 ms; at a corner the roll turns with an 80 ms wobble. Mend rounds: the run starts at the first broken post and lays only into the gap.
- **Seed bag (grass questions):** after a grass answer is typed, Check sows: the bag sweeps row by row, 90 ms per square, each square turning bright with its number.
- **Choose (compare / same-roll):** tap a field (it lifts 4 px, teal outline); tap again to put it down.
- **Undo:** ⌫; a run that missed rewinds the boards back onto the roll (500 ms) when the child changes the number.

## 6. The rounds
Fields: w × h rectangles (w across, h down) or masks ('1' field square). P = perimeter in boards, A = area in squares.

**Default table — any shape, 14 rounds** (the "rectangles only" setting uses the 10 rectangle rounds, marked ▢):
1. ▢ **Roll** — 4 × 3 → **14** (A 12)
2. ▢ **Mend** — 6 × 4; top (6) and left (4) intact, bottom and right broken → wind **10**
3. ▢ **Compare** — 9 × 2 (P 22, A 18) vs 5 × 5 (P 20, A 25): more fence → **9 × 2**; more grass → **5 × 5**
4. **Roll** — C-field `1111,...1,1111` → **20** (A 9)
5. ▢ **Job: grass** — 5 × 3 → **15** squares (P 16 is the trap next door)
6. ▢ **Same roll** — Hazel's exact roll for the 6 × 2 field (16): yards 3 × 5 (P 16 ✓, A 15) · 4 × 3 (P 14, A 12 — the same grass as 6 × 2) · 5 × 4 (P 18, A 20) → **3 × 5** (the 4 × 4 yard was dropped: its area is also 16, so a child who compared the yards' AREAS with the roll's 16 boards would have been "right" for the wrong reason)
7. **Mend** — L-field `1111,1111,11..,11..`; every side intact except the notch (the two inner sides) → wind **4** (the top 4 = bottom 2 + notch 2; the left 4 = right 2 + notch 2)
8. ▢ **Roll** — 7 × 2 → **18** (A 14)
9. ▢ **Compare** — 10 × 2 (P 24, A 20) vs 6 × 5 (P 22, A 30): fence → **10 × 2**; grass → **6 × 5**
10. ▢ **Job: fence** — 4 × 3 → **14** boards (A 12 is the trap)
11. ▢ **Same roll** — the exact roll for the 5 × 5 field (20): yards 7 × 3 (P 20 ✓, A 21) · 6 × 5 (P 22) · 8 × 3 (P 22, A 24 — nearly the 5 × 5's grass) → **7 × 3**
12. **Roll** — L-field `11111,11111,11...,11...` → **18** (A 14)
13. **Roll** — T-field `11111,.111.,.111.` → **16** (A 11)
14. ▢ **Same seeds** (the reverse — G3-339's other half: same grass, different fence) — Hazel's seed bag sows the 4 × 3 field exactly (12 squares; its fence is 14): yards 6 × 2 (A 12 ✓, P 16) · 3 × 5 (A 15, P 16) · 2 × 5 (A 10, **P 14 — the same fence as 4 × 3**) → **6 × 2**. Task: **"Hazel's seeds fill this field exactly. Which yard will they fill too?"** The bag sows the chosen yard (squares numbered; holes stay bare or seeds spill). On success the roll then runs round both fields side by side — 14 boards and 16 boards — and the bubble says **"The same 12 squares of grass — but 16 boards of fence, not 14."**
(Old-table fields reused: 6 × 4 → mend; 7 × 3 → the same-roll yard; 8 × 4 retired as a mend because its side counts duplicate 6 × 4's lesson; the 16-roll on 4 × 3 and 14-roll on 5 × 4 live on as the first two misses' "roll too long / too short" outcomes rather than as yes/no rounds — a yes/no answer is 50 % guessable.)

**Measured (`work-38/geo.js`):** in every Roll/Job-fence round P ≠ A, P ≠ w + h, P ≠ the number of edge squares (4 × 3: 14 vs 12 / 7 / 10; C: 20 vs 9 / — / 9; 7 × 2: 18 vs 14 / 9 / 14; L: 18 vs 14 / — / 13; T: 16 vs 11 / — / 10), so the area bot, the half-perimeter bot and the edge-squares bot are wrong in all 6; in Mend rounds the "repeat a shown side" bot (6, 4 / 2) and the "whole perimeter" bot (20 / 16) are wrong. Compare rounds: the field with more fence has less grass in both (fence-then-grass never repeats the same field), so "the same field twice" is wrong 2 / 2 and "the bigger-looking field both times" is right on grass only.
Same-roll / same-seeds bots (critic's solver `work-c38/c203.js`): "the yard whose AREA equals the home roll" — none in round 6, none in round 11; "the yard with the home field's grass" picks 4 × 3 (wrong) in round 6; in round 14 "the yard with the home field's fence" picks 2 × 5 (wrong) — so neither "fence = grass" nor "grass = fence" survives a round.
**Answer position:** typed answers have none. Compare: which field is left is drawn by a per-pass coin, re-drawn so each side carries the fence answer once per pass (1 of 2) and the grass answer is the other field by construction. Same-roll and same-seeds (3 rounds of three yards): the right yard's slot cycles so that over 3 passes each slot carries it 3 times; the gate measures each slot 28–39 % over 1,000 passes.
**Order:** order-only reshuffle per pass, never the same order twice; two Same-roll rounds never adjacent.

## 7. Check, the misses, the success
- **Check with an empty roll** → the spool rattles; **"Wind boards onto the roll first."** (no miss). Compare/same-roll with nothing chosen → the fields wobble; **"Tap a field."**
- **Miss 1 (Roll / Mend / Job-fence)** — the run happens: a gap stays with dashed ghost boards (short) or spare boards heap at the gate (long); the boards keep their numbers. Bubble short: **"The roll ran out — {g} more boards would close the gap."** long: **"{s} boards are left over."** (the numbers g and s are the physical gap/heap, counted on screen).
- **Miss 2** — each side of the field lights in turn with its board count written beside it (4, 3, 4, 3) and a sum strip builds under the paddock: 4 + 3 + 4 + 3. Bubble **"Walk all the way round: add every side."** Mend: the intact opposite sides light up with their counts. Bubble **"Opposite sides of a field match."**
- **Job-grass miss** — the seed bag sows and numbers the squares; bubble **"Grass grows on the squares inside, not along the edge."** (miss 2: rows light with their counts: **"{rows} rows of {cols}."**)
- **Compare miss** — the roll runs round both fields (or the seed bag sows both): the numbers sit side by side. Bubble fence **"Count the boards round each field."** grass **"Count the squares inside each field."**
- **Same-roll miss** — the roll runs round the yard the child chose: gap or heap; the chosen yard keeps a chalk cross. Bubble as the roll misses above.
- A new digit or a new choice takes the help away.
- **Success** — the last board latches into the gate; the animal trots in and stops in the field; the boards' numbers ripple once round the fence. EN fence **"{p} boards all the way round — the perimeter is {p}!"** · grass **"{a} squares of grass inside — the area is {a}!"** · compare **"This field needs more fence, but the other grows more grass."** · same roll **"The same {p} boards fence this yard too!"** · same seeds **"The same {a} squares of grass — but {p2} boards of fence, not {p1}."** · mend **"Mended! {g} boards closed the gap."** End of pass: all the fenced fields stand together as a farm map, each with its fence number on the gate.

## 8. Settings
1. **Sides:** count the boards (default, grid lines on the grass) / side lengths written (no grid; each side's length printed as a numeral) — visible at rest.
2. **Fields:** any shape (default, 14 rounds) / rectangles only (10 rounds) — the round table; L, C and T fields only appear in the first.

## 9. Words (EN source)
- title **"The Mending Fences"** (frozen)
- task lines: Roll **"How many boards fence this field all the way round? Wind them on the roll."** · Mend **"How many boards will mend the gap?"** · Job fence **"Hazel needs fence. How many boards?"** · Job grass **"Hazel needs grass. How many squares?"** · Compare **"Which field needs more fence?"** then **"Which field grows more grass?"** · Same roll **"Hazel's roll fits this field exactly. Which yard will it fit too?"** · Same seeds **"Hazel's seeds fill this field exactly. Which yard will they fill too?"**
- answer chips **"boards"** / **"squares"**
- hints, celebrations as §7.
- settings **"Sides"**: "count the boards" / "side lengths written" · **"Fields"**: "any shape" / "rectangles only"
- **Locale traps:** (a) **perimeter term** (de *Umfang*, fr *périmètre*, es/pt/it *perímetro*, nl *omtrek*, sv *omkrets*, da *omkreds*, no *omkrets*, fi *piiri* — Finnish school uses *piiri* for perimeter; never *ympärysmitta* which is circumference) and **area term** (de *Flächeninhalt*, fr *aire*, es *área*, it *area*, pt *área*, nl *oppervlakte*, sv *area*, da *areal*, no *areal*, fi *pinta-ala*). (b) **"board"** (fence plank): de *Brett/Latte*, fr *planche*, es *tabla*, it *asse*, pt *tábua*, nl *plank*, sv *bräda*, da *bræt*, no *planke*, fi *lauta* (partitive *lautaa* after numbers — authored whole per sentence). (c) **"field" vs "yard"** — the same paddock word everywhere is clearer (de *Weide*, fr *enclos*, nl *wei*, sv *hage*, fi *aitaus*); the en "yard" in G3-339 is kept as "yard" only in en. (d) **Number + plural** sentences ({p} boards) are authored per locale with the numeral in a fixed slot. (e) No × sign on screen ("rows of" in words).

## 10. Sound off, access, phones
- Sound off: the roll's size, the boards laying, gaps, heaps, numbers and the animal are all visible; knocks and the latch are bonus.
- Keyboard: digits wind; Enter runs; compare/same-roll ← → choose, Enter confirms; carousel ‹ › keys.
- aria: field `"field {w} by {h}"` in written-lengths mode or `"field with {rows} rows of grass squares"`, never P or A; after the run `"{n} boards laid, gap of {g}"` / `"…, {s} left over"` / `"fence closed"`.
- Taps ≥ 44 px (keys, fields ≥ 120 px boxes, carousel buttons 44). Hazel 96/64 px; farm animals 96/64 px (floors met). Boards, posts, roll, seed bag are drawn apparatus.
- Check above the fold (§4).

## 11. Distinct from
- **tool `unroll-tape`** lays a strand round a shape and then straightens it on a ruler; here nothing is straightened — a counted roll is wound first and runs round to close or not, a prediction tested by closure. **New 306 The Fence Loop** keeps a fixed loop and drags a corner (area changes while perimeter holds); here every round is a count, and the "same fence, new yard" question is answered by carrying a roll. **Row 169 The Trundle Wheel** prints a shape's sides (2.G.A.1). **Row 99 The Travelling Cord** compares lengths of ribbons.
- **Batch siblings:** 201/202/305 measure the inside (area); this measures the edge, and the seed bag shows the inside only as the contrast.

## 12. Build plan
- **Core state:** `{ sides:'boards'|'lengths', fields:'any'|'rect', round:{kind, field|fields, broken?, home?, yards?, job?}, roll:n|null, choice, phase:'fence'|'grass', misses }`.
- **Functions:** `edges(mask)` → ordered unit edges clockwise from the gate corner; `perimeter(mask)`, `area(mask)`; `brokenEdges(round)`; `run(n)` → `{laid, gap: max(0, need − n), spare: max(0, n − need), closed}`; `sow(mask)` → numbered squares; `sideCounts(mask)`.
- **Gate (own truth):** P and A recomputed from masks; every Roll/Job-fence round has P ≠ A, ≠ w + h, ≠ edge-square count; Mend answers = number of broken unit edges; compare rounds: the fence winner ≠ the grass winner; same-roll: exactly one yard with P = home P, at least one decoy with A = home A or within 1 of it; slot shares 28–39 %; ≥ 7 rounds per table; reshuffle constraints.
- **Mutations (each killed):** run counts squares along the edge instead of edges · corner squares get one board · run starts anywhere but the gate · mend counts all sides · seed bag numbers edge squares only · compare grass winner = fence winner · two yards close · number cards returning · drawn Hazel placeholder · same order twice.
- **Pictures:** `forest-creatures/badger` (Hazel), `farm-animals/sheep, goat, cow, donkey, pig` (seen; pig/sheep/donkey face the viewer — fine, they only trot in). Not used: `farm-animals/calf` (reads as a cow), `around-the-house/fence` and `around-the-house/gate` (pictures of the answer's object — the fence is apparatus).
- **Risks:** the phone carousel for same-roll rounds (the three yards cannot be shown legibly side by side at 360). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — winding a fat roll and watching it knock its way round the field, latch the gate and let a sheep in is a toy; a gap or a heap is funny, not shaming.
2. **Teacher on the board?** Yes — perimeter as boards round the edge, area as squares inside, the classic edge-squares and length + width errors refuted by a roll that does not close, unknown sides and same-perimeter yards included.
3. **Parent trust?** Calm, real counting, library pictures only, no timer, no score.
4. **Invention:** wind the roll you predict, let it run round from the gate — it latches, falls short or piles up — so the perimeter is the roll that closes the field.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Every field re-solved (perimeter, area, edge squares, w + h) by an independent solver — all values right.
- Same-roll round 6 had an answer tell for the very misconception the row fights: the right yard (4 × 4) had AREA 16 = the roll's 16 boards, so "compare areas with the roll" picked it. Replaced by 3 × 5 (P 16, A 15).
- The teaching point "same perimeter, different area AND THE REVERSE" had no reverse question: added round 14 Same seeds (same grass, different fence) with a decoy that has the home field's fence, and a closing comparison of the two rolls (14 vs 16 boards).
- Settings counts, answer-slot balance and EN strings updated for 14 / 10 rounds. Gate addition for the builder: no same-roll yard may have area = the home perimeter; no same-seeds yard may have perimeter = the home perimeter unless it is a decoy.
