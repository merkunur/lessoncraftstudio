# Row 191 — Match Facts to 20 → THE TWENTY-BEAD LOCKETS (2.OA.B.2)

## 0. Identity
- **id** `match-pairs.match-facts-to-20.2-oa-b-2` (KEPT; slugs, page title "Match Facts to 20" and intro frozen in all 11 locales) · grade 2 · CCSS 2.OA.B.2 · strand Operations and Algebraic Thinking · own files `fact-lockets-core.js`, `fact-lockets-activity.js`, `fact-lockets-activity.html`, `fact-lockets-activities.json` (the row leaves `match-pairs-activities.json`; the other match-pairs rows stay; 0 lines to `match-pairs-activity.js`, `lcs-shell.*` or any shared core).
- **Frozen promise kept true:** "Work out each fact, like 8 + 5 or 17 − 9, then match it to its answer. Tap a fact, then tap the number that is its answer, and watch the pair link." — the child taps a fact card, then taps an answer locket; the link is the beads pouring in and the locket clicking shut.
- **Worksheets covered:** G1-208 "Mental Math to 20" and G1-216 / G1-217 "Addition / Subtraction Practice to 20" → Level 1 (to 20, both signs, crossing ten) · G1-214 "Mental Math to 10" → Level 2 · G1-428 "Subtraction Maze Within 20" (step only on stones whose answer is the gingerbread man's number) → Level 3 "One locket" (many facts, one answer). Teaching point: add and subtract within 20 mentally — fluency and the make-a-ten strategy.
- **Old activity:** 8 tasks of 6 cards (three fact cards + three answer cards), tap a fact, tap its answer, a link line; anti-adjacency scatter. **Kept:** every one of the 24 old facts, in its old round (Level 1), tap-then-tap linking, three facts per round. **Changed:** answers are lockets that physically test the link; each round adds one **near-miss locket** (a classic slip), so the last match is never free; two levels added for the worksheets.

## 1. The pitch
"Every answer is a locket with a twenty-bead frame inside and exactly its number of holes — link a fact to it and the fact's beads pour in, filling the first ten before the rest: if the number is right every hole fills and the locket clicks shut; one bead too many sits on the rim, one too few leaves a hole that glows."

## 2. Why a child will want it again (the fun)
- **Lockets that open.** Each answer is a round brass locket (drawn, 92 px) hanging on a little chain from a bar at the top of the stage, its numeral engraved on the lid (30 px). Tap it and the lid swings open on its hinge to show the inside: two rows of ten bead seats (a twenty-frame, 5 + 5 per row with a small gap), but only the first N seats are drilled as holes — the rest are polished metal. The open locket shows the number as a shape.
- **The pour.** A fact card (cream, 22 px numerals, "8 + 5") holds its numbers as two strings of coloured beads under the numerals, hidden by default and shown when tapped. Link it to a locket and the beads fly in: the 8 coral beads fill the first row's first eight holes (40 ms each, tick-tick-tick), then the 5 teal beads — two of them finish the first row with a bright *ting* (ten!), three start the second row. The make-a-ten move happens by itself, every time, because that is how a twenty-frame fills.
- **The click.** All holes full and nothing left over → the lid snaps shut with a satisfying metallic *click*, the fact card folds itself into a little tag that hangs from the locket's chain, and the locket swings gently.
- **Subtraction pours too.** "14 − 6": the card's 14 beads (a full ten + 4) let 6 jump off first — the 4 loose ones, then 2 out of the ten ("back to ten, then 2 more") — and the 8 that stay pour into the locket.
- **The near-miss locket** is always there: 12 next to 13. Children learn to check, not grab.
- **The earned show:** when all three facts hang from their lockets, the near-miss locket (unused) gives a little shrug and swings aside, and the three lockets jingle together and open and shut in a ripple, showing their bead shapes side by side.
- **Free play ("Bead table"):** set any a + b or a − b with two number dials on a blank card and pour it into any locket; lockets for 1–20 hang on a long bar.
- No timer, score, streak or lives — fluency is built by many quick, *checked* links, not by a clock.

## 3. The skill and the misconception
- **Skill (2.OA.B.2):** fluently add and subtract within 20 using mental strategies, especially making ten (8 + 5 = 8 + 2 + 3) and decomposing back to ten (14 − 6 = 14 − 4 − 2); know sums of two one-digit numbers; G1-428: recognise many facts that share one answer.
- **Misconception 1 — off by one (counting on from the wrong place: 8 + 5 → "12", starting the count at 8).** **Push back:** the near-miss locket in every Level-1 round is exactly that slip; link 8 + 5 to 12 and one teal bead has no hole — it sits on the rim, the lid cannot close, and the bead hops back onto the card.
- **Misconception 2 — the "ten" is invisible** (children add 8 + 5 by ones). **Push back:** the first row of ten fills and *tings* before the second row starts on every link, so the ten is seen and heard each time; a miss slows the pour to 300 ms per bead and draws a bracket under the first row with "10".
- **Misconception 3 — adding instead of subtracting** (11 − 7 → "18"). **Push back:** some near-miss lockets are the add-instead answer (18 next to 4); link 11 − 7 to 18 and only 4 beads arrive — 14 holes stay empty and glow.
- **Misconception 4 — a fact has one "home"** (G1-428). **Push back:** Level 3 has a single locket and six facts; three different facts all fill it exactly — 4 + 5, 16 − 7 and 17 − 8 each close the 9 locket.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The locket bar** (top, 470 wide): 4 lockets (Level 1–2) spaced evenly, each 92 px across on a 30 px chain, numeral 30 px on the lid. Open locket interior: twenty-frame 2 × 10 seats, seat 12 px, row gap 6 px, a 4 px gap after every fifth seat. Lockets are always ordered by value, smallest left (they hang like a number line).
- **The fact cards** (below, a 3 × 1 row): 140 × 92 each, numerals 26 px; beads (12 px, coral first number, teal second) appear under the numerals when the card is tapped, as two strings.
- **Level 3:** one big locket (128 px) in the middle of the bar; six stepping-stone cards (120 × 72) in two rows of three under it.
- **Bubble** right: feedback text.
- **Task line (EN, 22 px):** "Tap a fact, then the locket that is its answer." (Level 3: "Tap every fact whose answer is {n}.")

**At 360 px:** lockets 72 px (numerals 24 px; seats 9 px) in one row of four; fact cards 104 × 76 in one row of three (numerals 22 px); Level 3 big locket 104 px, stones 104 × 64 in two rows; bubble under the cards; the board fits in ≈ 560 px, Check at ≈ 600 px on 360 × 740; at 320 × 640 lockets 66 px, cards 96 × 70, Check ≈ 580.
- **No words on the apparatus:** numerals, signs and beads only. No pictures (beads are drawn counters).

## 5. The hand
- **Tap a fact card** → it lifts 6 px, its bead strings slide out under the numerals (120 ms), a soft *pip*. Tap again → deselects.
- **Tap a locket** (with a card selected) → the lid swings open (120 ms), the beads fly in (40 ms per bead, first number then second; subtraction: the take-away beads hop off first, 60 ms each, then the rest fly). Total ≤ 900 ms.
  - fits exactly → *click*, the card becomes a tag on that locket (it can be taken back by tapping the tag: it flies back to its slot and the locket reopens).
  - does not fit → the beads stay a moment (rim bead or glowing holes, 700 ms), then fly back to the card; the card returns to its slot. This is a **try**, and counts toward the miss ladder of that card (§7).
- **Tap a locket without a card** → it opens and shows its holes (pure exploration), closes on the next tap.
- **Check** (Levels 1–2) is optional: a round ends by itself when all three facts hang. Level 3: tap a stone → it pours into the big locket and stays as a tag if it fits; when the three right stones hang, the round ends; a wrong stone pours and bounces back.
- **Keyboard:** Tab cards → Enter selects; Tab lockets → Enter pours; Esc deselects.
- **Sound:** pip, ticks (pitch rises bead by bead), *ting* at the tenth bead, *click*, a gentle *tunk* on a misfit. TTS (bonus): "8 plus 5 is 13".

## 6. The rounds
One round = three facts and four lockets (one is a near-miss) — or, in Level 3, one locket and six stones. ≥ 8 rounds per level, order-only reshuffle per pass; fact-card order shuffled within a round.

**Level 1 — Facts to 20 (the 24 kept facts, in their old rounds) + one near-miss locket**
| # | facts (answer) | near-miss locket (the slip it catches) | lockets left→right | near-miss rank |
|---|---|---|---|---|
| 1 | 8 + 5 (13) · 9 + 7 (16) · 14 − 6 (8) | 12 (count started on 8) | 8 · 12 · 13 · 16 | 2 |
| 2 | 6 + 9 (15) · 17 − 8 (9) · 7 + 5 (12) | 8 (17 − 8 one short) | 8 · 9 · 12 · 15 | 1 |
| 3 | 9 + 9 (18) · 16 − 9 (7) · 8 + 6 (14) | 19 (double one too many) | 7 · 14 · 18 · 19 | 4 |
| 4 | 7 + 8 (15) · 13 − 4 (9) · 6 + 5 (11) | 14 (7 + 7 instead of 7 + 8) | 9 · 11 · 14 · 15 | 3 |
| 5 | 5 + 9 (14) · 11 − 7 (4) · 8 + 8 (16) | 18 (added 11 + 7) | 4 · 14 · 16 · 18 | 4 |
| 6 | 7 + 6 (13) · 15 − 6 (9) · 9 + 8 (17) | 12 (count started on 7) | 9 · 12 · 13 · 17 | 2 |
| 7 | 12 − 8 (4) · 6 + 7 (13) · 14 − 5 (9) | 3 (12 − 8 one short) | 3 · 4 · 9 · 13 | 1 |
| 8 | 8 + 9 (17) · 13 − 7 (6) · 7 + 7 (14) | 16 (8 + 8 instead of 8 + 9) | 6 · 14 · 16 · 17 | 3 |
Near-miss rank over 8 rounds: 1 ×2, 2 ×2, 3 ×2, 4 ×2 — the spare locket is never "the biggest" or "the odd one" by position.

**Level 2 — Facts to 10 (G1-214)**
| # | facts (answer) | near-miss | lockets | rank |
|---|---|---|---|---|
| 1 | 3 + 4 (7) · 9 − 5 (4) · 2 + 6 (8) | 6 | 4 · 6 · 7 · 8 | 2 |
| 2 | 5 + 5 (10) · 8 − 3 (5) · 4 + 2 (6) | 9 | 5 · 6 · 9 · 10 | 3 |
| 3 | 6 + 3 (9) · 10 − 4 (6) · 1 + 7 (8) | 10 | 6 · 8 · 9 · 10 | 4 |
| 4 | 7 − 2 (5) · 2 + 2 (4) · 3 + 5 (8) | 9 | 4 · 5 · 8 · 9 | 4 |
| 5 | 4 + 4 (8) · 9 − 6 (3) · 6 + 4 (10) | 2 | 2 · 3 · 8 · 10 | 1 |
| 6 | 10 − 7 (3) · 5 + 2 (7) · 8 − 6 (2) | 4 | 2 · 3 · 4 · 7 | 3 |
| 7 | 3 + 3 (6) · 7 − 4 (3) · 9 − 1 (8) | 2 | 2 · 3 · 6 · 8 | 1 |
| 8 | 6 − 5 (1) · 2 + 7 (9) · 4 + 3 (7) | 2 | 1 · 2 · 7 · 9 | 2 |
Rank: 1 ×2, 2 ×2, 3 ×2, 4 ×2. Every near-miss is one away from a real answer in the round. Answers ≥ 1 (never 0).

**Level 3 — One locket (G1-428): three stones close it, three are one off**
| # | locket | stones that fit | stones one off (their value) |
|---|---|---|---|
| 1 | 9 | 4 + 5 · 16 − 7 · 17 − 8 | 16 − 6 (10) · 4 + 6 (10) · 17 − 9 (8) |
| 2 | 12 | 3 + 9 · 4 + 8 · 18 − 6 | 4 + 7 (11) · 19 − 6 (13) · 3 + 8 (11) |
| 3 | 7 | 12 − 5 · 3 + 4 · 11 − 4 | 3 + 5 (8) · 12 − 6 (6) · 11 − 3 (8) |
| 4 | 15 | 20 − 5 · 8 + 7 · 7 + 8 | 19 − 5 (14) · 7 + 9 (16) · 8 + 8 (16) |
| 5 | 11 | 19 − 8 · 17 − 6 · 2 + 9 | 19 − 7 (12) · 2 + 8 (10) · 17 − 7 (10) |
| 6 | 8 | 2 + 6 · 11 − 3 · 13 − 5 | 2 + 7 (9) · 13 − 4 (9) · 11 − 4 (7) |
| 7 | 13 | 17 − 4 · 19 − 6 · 4 + 9 | 4 + 8 (12) · 19 − 7 (12) · 17 − 5 (12) |
| 8 | 6 | 13 − 7 · 12 − 6 · 15 − 9 | 12 − 5 (7) · 15 − 8 (7) · 13 − 8 (5) |
Mostly subtraction (30 of 48 stones), as in the maze worksheet. **Every false stone shares a number with a true one in the same round** (16 − 6 beside 16 − 7, 4 + 6 beside 4 + 5 — critic: the designer's claim was false for 6 stones; rebuilt and checked by `work-c35/l3-new.js`), so the eye cannot sort them. **Additions are balanced: 9 of 24 true stones and 9 of 24 false stones** (the old table had 9 vs 5, so "pick the + stones" beat chance). Round 4 shows a turnaround pair (8 + 7, 7 + 8). Every operand 1–20, every value 5–16.
- **Answer position:** lockets are always in value order (a teaching structure, not a tell) and the near-miss rank is balanced 2/2/2/2 per level; fact cards and stones are shuffled per round with a seeded permutation that is new each pass (gate: over 200 passes each card lands in each slot 33 % ± 6 %). **Elimination bot:** with a spare locket, matching the first two facts never forces the third (the gate asserts the third fact always has 2 lockets left and only one fits). **Measured by the critic (`work-c35/lockets-bots.js`, `l3-new.js`):** a *size-guess* bot (an addition takes a locket just above its bigger number, a subtraction about half its first number; lockets assigned in order, one dropped) is right on 56–57 % of facts but completes only 19 % (L1) / 22 % (L2) of rounds — estimation gets near the answer and the near-miss locket, always one step from a real answer except in round L1-5, catches the last step; a *spot-the-spare* bot (the spare is one of the lockets with a ±1 neighbour) finds it 44 % (L1) / 38 % (L2) against 25 % chance — and finding the spare still matches no fact; Level 3: picking 3 of 6 stones at random succeeds 1 in 20; 'pick the + stones first', 'smallest/largest first number', 'smallest/largest second number' all score 12.0 of 24 true stones = chance.

## 7. Check, the misses, the success
- **Check with nothing linked** → no miss; the first card wiggles. Hint: "Tap a fact first, then its locket."
- Misses are counted **per fact card** (a misfit pour is a try).
- **Miss 1 (first misfit for that card) — what the apparatus SHOWS:** too many → the extra bead(s) sit on the rim, coral, and the lid tries to close twice; too few → the empty holes glow teal. Both stay 700 ms before the beads return. Hint: "One bead had no hole." / "{n} holes stayed empty." (n is the count, shown in the glowing holes themselves.)
- **Miss 2 (second misfit for that card) — the stronger showing:** the pour replays slowly (300 ms per bead): a bracket "10" draws under the first full row, then the leftover beads count up on the second row "11, 12, 13" in small numerals over the holes, and the card's bead strings stay out. Subtraction: the take-away beads hop off one by one with a count (6 → "back to 10" at the 4th). Hint: "Fill the ten first: 8 and 2 make 10, and 3 more makes 13."
- **Miss 3:** the right locket's chain glints once (the only time the apparatus points). Hint: "Try the locket that glints."
- Linking a different card resets nothing for the first card; the help for a card disappears once it is linked.
- **Success (round):** the three lockets close with tags, the near-miss locket shrugs aside, the lockets jingle and open in a ripple. Bubble: "8 + 5 = 13 · 9 + 7 = 16 · 14 − 6 = 8 — every locket is full!" Level 3: "4 + 5, 16 − 7 and 17 − 8 all make 9!"

## 8. Settings (each visibly changes the board at rest)
1. **Facts:** To 20 / To 10 / One locket — at rest: four lockets 3–19 with + and − cards (to 20), four small-number lockets (to 10), one big locket with six stones (one locket).
2. **Beads on the cards:** Shown / Only when poured — with "Shown" every card displays its two bead strings under the numerals at rest (a model to lean on); with "Only when poured" the cards show numerals only (from memory — fluency), and beads appear only inside the locket. **Default:** "Only when poured" for To 20 and One locket (2.OA.B.2 asks for facts from memory; with beads shown a child could count 13 beads and never add), "Shown" for To 10 (the G1 worksheet level).

## 9. Words (EN source; native authors write the other 10)
- title (frozen) "Match Facts to 20" · instruction: "Tap a fact, then the locket that is its answer." · Level 3 instruction: "Tap every fact whose answer is {n}."
- hints: start "Tap a fact first, then its locket." · over "One bead had no hole." · under "{n} holes stayed empty." · miss2Add "Fill the ten first: {a} and {toTen} make 10, and {rest} more makes {sum}." · miss2Sub "Take away {firstPart} to get back to 10, then {rest} more: {answer}." · miss3 "Try the locket that glints." · L3 wrong "That one makes {value}, not {n}."
- success: "{f1} · {f2} · {f3} — every locket is full!" · L3 "{f1}, {f2} and {f3} all make {n}!"
- settings: "Facts" — "To 20" / "To 10" / "One locket" · "Beads on the cards" — "Shown" / "Only when poured"
- aria: card "Fact {expr}" · locket "Locket {n}, {open|closed}, {k} holes" · tag "{expr} hangs on locket {n}".
- **Locale traps.** (1) Minus sign: use the true minus "−" (U+2212) in every locale; de/sv/da/no/fi school print also uses "−". (2) Spacing: fr puts a thin space around signs in print ("8 + 5") — same as here; no locale writes "8+5". (3) The "make ten" hint names "10" as a numeral (no number words), so no gender/case issues; fi "10:een" is avoided by writing "{a} ja {toTen} on 10". (4) Equals in success lines: some locales write "8 + 5 = 13" identically; no comma decimals occur. (5) "locket": de *Medaillon*, fr *médaillon*, es *relicario* (MX: *relicario* is understood; alternative *guardapelo* is old-fashioned — native author decides), pt *medalhão*, it *medaglione*, nl *medaillon*, sv/da/no *medaljong/medaljon/medaljong*, fi *medaljonki* — the word appears only in hints and the instruction, never on the apparatus.

## 10. Sound off, access, phones
- Legible with the sound off: the rim bead and glowing holes are visible; the "10" bracket and counts on miss 2 are numerals; TTS bonus.
- Keyboard §5; aria-live: "13 beads, 12 holes: one bead left over." / "8 + 5 fits locket 13."
- Taps: lockets 72–92 px, cards ≥ 96 × 70, stones ≥ 104 × 64, Check 48 px.
- No library pictures on the board (drawn counters); bead seats ≥ 9 px on phones.
- Check (optional) above the fold at 360 × 740 (≈ 600) and 320 × 640 (≈ 580); phone layout keeps lockets in one row of four.

## 11. Distinct from
- **Row 85 Ten Plug** (a ten-rack with a hole plugged by a snapped stick: addition only, one fact) and **Row 86 Sunken Stones** (a number line where the leap stops at ten): both teach the make-ten move on one fact; here the twenty-frame is *inside the answer*, every link is a test of a chosen answer, both signs pour, and near-miss lockets make it a fluency check.
- **Row 87 Rung Ladder** (two cards become rails with one hole per unit — equal height is the equals sign) and **Row 90 Plank Path** (a number is a plank exactly as long as the gap) share the family idea "a quantity fits or it doesn't". The locket's own move is different and is the point of the row: the twenty-frame lives INSIDE the answer, the beads must pass through a full ten (the *ting*) on every addition, and every subtraction visibly breaks a ten — the make-a-ten strategy is performed by the material on every link, which neither the ladder (one-to-one rails) nor the plank (a length) does.
- **Row 29 Music-Box Strip** (quick facts to 5, right answers punch a song), **Row 87 Rung Ladder**, **Row 135 Leapfrog**, **Row 142 Twin Tubes** (other match-pairs rows) — different mechanics and skills.
- **Premium tools:** `rekenrek` (bead rack), `part-whole-frame` (number bonds) — no answer lockets, no matching; no interaction copied.

## 12. Build plan
- **Core `FactLocketsCore`:** round `{level, facts:[{a,op,b,value}], lockets:[n…], spare:n}` or `{level:3, target, stones:[{a,op,b,value,fits}]}`; `pour(fact, locket)` → `{fits, over, under, sequence:[{bead, seat, colour}]}` (first-row-first seat order; subtraction take-away order: loose beads first, then from the ten); `link`, `unlink`; `tries[factId]`; `missLevel(factId)`; `roundDone`; `shuffledOrder`.
- **Gate's truth (`verify-fact-lockets-core.js`):** independent table of 24 kept facts (Level 1 = old tasks verbatim, by round); every value within 1–20 and every operand within 0–20 with no 0 answer; each round has exactly one locket per fact and one spare not equal to any answer; spare rank per level = 2/2/2/2; Level 3: exactly three stones equal the target, three differ by exactly 1, every false stone shares an operand with a true stone, additions 9/24 true vs 9/24 false; the default of "Beads on the cards" per level; `pour` seat order always fills seat 10 before seat 11; over/under counts = |value − locket|; elimination: after any two correct links the last fact has two candidate lockets; the success line's facts equal the round's (11 locales); card-slot uniformity over 200 seeded passes.
- **Mutations (each killed):** spare locket equals an answer · pour fills row 2 before row 1 · subtraction pours the whole minuend · misfit leaves the card linked · Level 1 facts differ from the old tasks · spare always rank 4 · Level 3 accepts a one-off stone · miss 3 glints the wrong locket · "Beads on the cards" setting has no effect · reshuffle repeats · near-miss rank counted from the right · a Level-3 false stone that shares no number with a true one · beads shown by default at To 20.
- **Pictures:** none. **Risks:** at 320 px the 20 seats inside a 66 px locket shrink to 8 px — the open locket zooms to 140 px while pouring (an overlay that returns), measured by local-test at 320. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — brass lockets that open, beads that pour with ticks and a *ting* at ten, a satisfying *click*, and the cheeky spare locket that shrugs away.
2. **Would a teacher put it on the board?** Yes — every link shows the make-ten strategy on a twenty-frame, both signs, and the near-miss answers are the exact slips teachers see.
3. **Would a parent trust it?** Numerals and beads only, no clock, no score; a wrong answer simply does not fit.
4. **The invention:** each answer is a locket drilled with exactly its number of holes in a twenty-frame, and a fact is matched by pouring its beads in — ten first — until it clicks shut or visibly doesn't.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- **Level 3 rebuilt:** the claim "each false stone shares a number with a true one" was false for 6 of 24 stones, and additions were 9 true vs 5 false (a "pick the + cards" bot beat chance). New false stones: every one shares an operand with a true stone in its round, additions 9 vs 9; every surface bot (operation, size of either number) now scores exactly chance (12.0/24, `work-c35/l3-new.js`).
- Level 1/2 tables re-checked with my own script (24 kept facts verbatim, spare never an answer, rank 2/2/2/2) and new bots measured and written in: estimation finishes ≤ 22 % of rounds because the near-miss locket is one step from a real answer.
- "Beads on the cards" got a default per level: hidden at To 20 (from memory, as 2.OA.B.2 says), shown at To 10.
- §11 now says plainly why this is not Row 87's rails or Row 90's planks: the twenty-frame inside the answer performs make-a-ten / break-a-ten on every single link.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
