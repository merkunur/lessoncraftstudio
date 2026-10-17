# New 294 — The Elastic Flags: a flag on an elastic can only reach the nearest ten, and the two elastics weave the net that catches a sensible answer (3.OA.D.8)

## 0. Identity
- **id** `estimate-flags.play.3-oa-d-8` · grade 3 · CCSS 3.OA.D.8 (… assess the reasonableness of answers using mental computation and estimation strategies including rounding) with 3.NBT.A.1 (round to the nearest 10 or 100) · strand Operations & Algebraic Thinking · key `estimate-flags` → `estimate-flags-core.js`, `estimate-flags-activity.js`, `estimate-flags-activity.html`, `estimate-flags-activities.json`. Start with `node scripts/new-activity.js --num=294`. Page title **"The Elastic Flags"**.
- **Worksheets covered:** G3-389 "Round, then Estimate the Sum" (round both numbers to the nearest ten, write them in the boxes, then add the rounded numbers).
- New instrument; no old activity.

## 1. The pitch
"Each number holds its flag on an elastic that can stretch only half way to a ten — so the flag can only be planted on the nearest ten; the two planted flags add up to the estimate, and the two elastics hang under it as a net that catches any sensible answer and lets a silly one fall through."

## 2. Why a child will want it again
- **The twang.** Drag the flag from 46 toward 40 and the elastic stretches, thins, trembles — and at 45 it is too long: it snaps the flag back to its peg with a springy *twang* and a wobble. Drag it toward 50 and it reaches the post easily and the flag plants with a *thock*. Children try the wrong way on purpose to hear the twang.
- **The halfway hook.** On 45 or 265 the elastic reaches both posts exactly — and the little hook at the halfway mark leans up, so the flag slides up to the bigger ten every time (the rule everyone uses). It is drawn so the child can see *why* 5 goes up.
- **The net.** When both flags are planted and the child has added them, the two flag bars slide end to end onto one long line and plant the big estimate flag. Then the two elastics come along and unroll under it as a hammock net — as wide as the two elastics could ever have stretched, either way.
- **The friend's answer drops.** A card with someone's answer hovers over the line. The child says "close" or "far off" — then lets it drop: a sensible answer bounces softly into the net; a silly one (a forgotten carry, a number lined up wrong) falls straight through the line or flies off its end. It is a little game of catch.
- **The earned show:** a caught card makes the net sway and the estimate flag wave; a correctly spotted silly card falls through and the child's "far off" button stamps; the round ends with the sentence written out: "46 + 52 is about 50 + 50 = 100".
- **Drag, then write (the round ladder — critic addition, the worksheet's own move).** Dragging a flag can at worst take two tries, so dragging alone could find every rounding by trial. In rounds 1–3 of a pass the child drags; from round 4 the flags are pinned and the child WRITES the rounded number into each post box (G3-389: "round both numbers and write them in the boxes") — on Check each flag tries to fly to the written post: the right ten plants it, a wrong ten stretches the elastic past half way and it snaps back with the twang (that box shakes, miss 1). After a miss the flag can be dragged again as the help.
- **Free play:** the flags can be dragged both ways at any time to feel the twang; after a round the card can be dragged anywhere on the line to see where the net catches it.

## 3. The skill and the misconception
- **Skill:** round each addend to the nearest ten (or hundred), add the rounded numbers to get an estimate, and judge whether an exact answer is reasonable by how near it lands to the estimate (3.OA.D.8, 3.NBT.A.1; G3-389).
- **Misconception 1 — rounding the wrong way** (46 → 40) or "always down". **Push-back:** the elastic cannot stretch more than half a ten; dragging the flag past half way snaps it back. The halfway hook settles 5.
- **Misconception 2 — rounding but forgetting to add** (writing "50, 50" as the estimate) or **rounding only one addend.** **Push-back:** the estimate box only takes a sum; and the long line refuses a single bar — the second flag's bar must slide on before the estimate flag can be planted; a typed sum that is not 50 + 50 shows the two bars landing somewhere else than the child's number.
- **Misconception 3 — accepting any exact-looking answer** (349 for 265 + 184, a lost carry). **Push-back:** the card falls through the net — the net is wide only by the two elastics (± 10 when rounding to tens: each rounding moves a number at most 5), so a carry error of 100 misses by ten nets' widths.
- **Honest limit, built in:** rounding to hundreds makes a net ± 100 wide — it cannot catch a slip of 100. The hundreds rounds' silly answers are therefore misses of 230 or more (a forgotten hundred, a dropped digit), never a 100-slip; the teacher can see on the screen why a coarser estimate catches less.

## 4. The stage
**At 704 px (stacked; content 672 px):**
- **Task line** (22 px, two lines max): **"Plant each flag on the nearest ten. Add the flags. Then decide: is the answer close or far off?"** (hundreds: "nearest hundred").
- **The two addend rails** (top half, each 600 × 84 px, 20 px apart): a short number line from the ten below the addend to the ten above (tens: 40 … 50 with a tick every 1; hundreds: 200 … 300 with a tick every 10), end posts drawn as stout 8 × 40 px posts with their numerals (22 px) under them; the **halfway hook** — a tiny curved hook (12 px) at the midpoint that visibly leans toward the upper post. The **peg** at the addend's place (a coral pin with the number on a 22 px tag, "46"). The **flag**: a teal pennant (36 × 28) on a pole 48 px tall, joined to the peg by the **elastic** (a 3 px band drawn as a quadratic curve that thins as it stretches). Beside each rail's right end a small box receives the planted number (`50`, 52 × 44).
- **The sum row** (under the rails): `50 + 50 = ▢` in 32 px numerals, box 64 × 52, keypad in the right part of the row (3 × 4 keys 52 × 44, ✓ = Check) — at 704 the keypad sits to the right of the sum row.
- **The long line** (bottom, 640 × 120): a magnified window of the number line (tens: estimate ± 150; hundreds: 0 … 1,200) with numerals every 50 (tens) / 100 (hundreds), plus a thin overview strip above it (0 … 1,000, 640 × 12) with a bracket showing where the window sits. The two flag bars (teal and cream, 16 px tall) end to end from 0, the **estimate flag** (a 60 px pole, a larger teal pennant with the estimate numeral), and the **net** — a drawn hammock of fine mesh hung from two thin posts at estimate − w and estimate + w (w = 10 for tens, 100 for hundreds), each half visibly made of the two elastic bands laid end to end (5 + 5 / 50 + 50).
- **The friend's card** (judge setting): a white card 96 × 56 with the number (28 px) and a small drawn "?" corner — no character, no name. It hovers over the window at its value (or at the window's edge with an arrow when outside it).
- **Two judge buttons** (fixed: "close" LEFT, "far off" RIGHT): 140 × 56, each with an icon (a card resting in a net / a card falling) and its word.
- No words on the apparatus except numerals.

**At 360 px (stacked, content 328 px):** rails 320 × 72 (tick every 1 still drawn for tens: 32 px per unit… 10 units across 300 px = 30 px per unit; hundreds: ticks every 10 = 30 px), posts 6 × 32, flag 32 × 24 on a 40 px pole; the planted-number box sits above the rail's right post; sum row 48 px (boxes 56 × 44) with the keypad below it in two rows of six keys 50 × 44 (shown only in the add phase; replaced by the judge buttons 152 × 52 in the judge phase); long line 320 × 100 — tens window estimate ± 120 (1.25 px per unit, net 25 px across), hundreds 0 … 1,200 (0.27 px per unit, net 53 px across); card 80 × 48. Budget 360 × 740: header 56 + task 40 + rails 2 × 72 + 12 + sum 48 + keypad or buttons 96 + long line 100 + overview 16 + gaps 40 = 552 ✓. **At 320 × 640:** rails 288 wide (27 px per unit), long line 288, budget ≈ 540 ✓.

## 5. The hand
- **Plant a flag** (rounds 1–3 of a pass; from round 4 the child types each post number instead and Check flies the flag there — §2): drag the flag along its rail (it follows the finger within one frame). The elastic's length = |flag − peg|. While it is ≤ half a ten it bends gently; past half a ten it is taut and coral; **release** (or continue dragging past the post) → if the flag is at a post within half a ten, it plants (*thock*, 120 ms bounce) and the post's number drops into the box; if not, the elastic snaps it back to the peg (*twang*, 220 ms overshoot wobble). At exactly half a ten the hook catches the band only on the side it leans toward (up): the flag released on the lower post slides along the band to the upper one (260 ms) — the hook visibly guides it. Tap a planted flag to pull it back to its peg. Keyboard: ← / → step the flag one tick, Enter plants.
- **Add:** the sum row unlocks when both flags are planted; type the sum, ✓/Enter checks it.
- **The slide:** on a correct sum the two bars slide down onto the long line end to end (400 ms), the estimate flag plants, the elastics unroll into the net (300 ms).
- **Judge (setting):** tap "close" or "far off" (or press ← / →), then the card drops (gravity ease, 500 ms): caught in the net with a soft bounce, or through the line with a *whoosh* (outside the window: it slides off the edge with its arrow).
- **Sound:** twang, thock, a soft click per keypad press, a net *swish*, a whoosh; TTS (where available) reads the final sentence.
- **Free play:** flags can be dragged both ways at any time (planted flags only after a tap returns them); after the judgement the card can be dragged along the line to test the net.

## 6. The rounds
One round = two addends, their rounding, the estimate, and (judge setting) one friend's answer. Ten rounds per setting.

**Round to the nearest ten:**

| # | addends | rounded | estimate | exact | friend's answer | verdict | how the friend got it |
|---|---|---|---|---|---|---|---|
| 1 | 46 + 52 | 50 + 50 | 100 | 98 | 98 | close | right |
| 2 | 36 + 48 | 40 + 50 | 90 | 84 | 74 | far off | forgot to carry the ten |
| 3 | 55 + 38 | 60 + 40 | 100 | 93 | 93 | close | right |
| 4 | 62 + 29 | 60 + 30 | 90 | 91 | 811 | far off | wrote 2 + 9 = 11 in full, then 6 + 2 = 8 |
| 5 | 148 + 273 | 150 + 270 | 420 | 421 | 421 | close | right |
| 6 | 265 + 184 | 270 + 180 | 450 | 449 | 349 | far off | forgot the carry into the hundreds |
| 7 | 312 + 94 | 310 + 90 | 400 | 406 | 406 | close | right |
| 8 | 135 + 248 | 140 + 250 | 390 | 383 | 373 | far off | forgot to carry the ten |
| 9 | 523 + 212 | 520 + 210 | 730 | 735 | 735 | close | right |
| 10 | 383 + 47 | 380 + 50 | 430 | 430 | 853 | far off | lined 47 up as 470 |

(Critic change: the designer's two-digit "far off" cards were 179 and 188 — "carried a 1 that wasn't there" into an empty hundreds place is not an error a seven-year-old makes, and a 100-slip on a two-digit sum is caught by any sense of size, so the net was never needed. They are now the two classic two-digit slips — the forgotten carry (74, only 16 from the estimate: the case where "it's roughly right" fails and only the ± 10 net decides) and column sums written in full (811). Round 8 is a second forgotten carry inside the hundreds (373 vs 390), so twice per pass the net — not a feeling — is what catches the slip.)

**Round to the nearest hundred:**

| # | addends | rounded | estimate | exact | friend's answer | verdict | how the friend got it |
|---|---|---|---|---|---|---|---|
| 1 | 346 + 487 | 300 + 500 | 800 | 833 | 833 | close | right |
| 2 | 152 + 629 | 200 + 600 | 800 | 781 | 781 | close | right |
| 3 | 250 + 418 | 300 + 400 | 700 | 668 | 268 | far off | left out the 400 |
| 4 | 538 + 276 | 500 + 300 | 800 | 814 | 814 | close | right |
| 5 | 713 + 164 | 700 + 200 | 900 | 877 | 177 | far off | left out the 700 |
| 6 | 450 + 329 | 500 + 300 | 800 | 779 | 779 | close | right |
| 7 | 287 + 605 | 300 + 600 | 900 | 892 | 352 | far off | read 605 as 65 |
| 8 | 361 + 222 | 400 + 200 | 600 | 583 | 583 | close | right |
| 9 | 649 + 148 | 600 + 100 | 700 | 797 | 197 | far off | left out the 600 |
| 10 | 175 + 550 | 200 + 600 | 800 | 725 | 225 | far off | left out the 500 |

- **Measured (critic's own oracle, `work-c41/rest.js`):** every exact sum lies inside its net (tens: |exact − estimate| ≤ 7 ≤ 10; hundreds: ≤ 97 ≤ 100); every "close" card is the exact sum; every "far off" card lies outside the net — tens by 16, 17, 101, 423, 721 (1.6 to 72 nets), hundreds by 432 … 723 (≥ 4.3 nets). Rounding direction balance: tens 11 up / 9 down (3 halves: 55, 265, 135), hundreds 10 up / 10 down (3 halves: 250, 450, 550); so "always round up" plants 55 % / 50 % of the flags and the elastic stops the rest. The 2-digit rounds (1–4) are the worksheet's own range (sums 98, 84, 93, 91 ≤ 100).
- **The judge answer:** close 5 / far off 5 per setting, buttons fixed (close left, far off right) — so "always left" wins 50 %.
- **Shortcut bots on the verdict (critic re-measured on the new tables):** "close if the card's ones digit matches the ones digit of the true sum" — 6/10 tens, 5/10 hundreds; "close if the card has as many digits as the estimate" — 4/10 tens, 5/10 hundreds; "close if it starts with the estimate's first digit" — 7/10 tens (fooled by 98/93 against 100 and by 373 against 390); "close if within 100 of the estimate" (a loose sense of size) — 8/10 tens (fooled by 74 and 373 — exactly the lesson). At hundreds the coarse net makes "within 100" the honest rule (10/10) — named in §3's honest limit. Only the net (± 10 / ± 100) scores 10/10 in both.
- **Order:** order-only reshuffle per pass, never the same order twice; the shuffle is constrained so the verdicts never run more than 3 the same in a row.

## 7. Check, the misses, the success
- **Check with a flag unplanted** → hint, no miss: **"Plant both flags first."** · Check with an empty sum box → **"Add the two flags and write the sum."**
- **Flag snaps back** (not a miss — it is the material talking): the halfway tick lights coral for 600 ms and the distances to both posts appear as small numerals over the rail ("6" ← · → "4"). If the same flag snaps back twice in a round: hint **"The elastic only reaches the nearer ten."**
- **Sum — miss 1:** the two bars slide onto the long line anyway and land at the true estimate; the child's number appears as a ghost tick where they typed it, with the gap between. Hint: **"Add the two flag numbers: {a} + {b}."**
- **Sum — miss 2:** the bars count up by tens (or hundreds) along the line from 0 with tags (10, 20, 30 … 80). Hint: **"Count on in tens from {a}."**
- **Judge — miss 1** (wrong verdict): the card drops and shows the truth (caught, or falling through), and the two distance arrows from the estimate flag to the card and to the net's edge appear with their numbers ("101" vs "10"). Hint (said close, was far): **"It fell through — it is {d} away, and the net is only {w} wide each way."** · (said far, was close): **"It landed in the net — only {d} away from the estimate."** The round then continues to the success (one verdict per round; a wrong verdict is counted as one miss and the truth is shown).
- **A new drag or keystroke** clears the showings until the next Check.
- **Success:** **"{a} + {b} is about {ra} + {rb} = {est}."** · judge: close → **"{f} is close to {est} — it makes sense!"** · far off → **"{f} is far from {est} — something went wrong!"**

## 8. Settings
1. **Round to:** "nearest ten" (default) / "nearest hundred". At rest the rails show 40 … 50 with unit ticks vs 300 … 400 with ten-ticks, and the net width changes.
2. **Ask:** "estimate only" / "estimate, then judge an answer" (default). At rest the judge buttons and the card's slot are present or absent.

## 9. Words (EN source)
- **title:** "The Elastic Flags"
- **instruction:** "Plant each flag on the nearest ten. Add the flags. Then decide: is the answer close or far off?" · hundreds: "… on the nearest hundred …" · estimate-only: "Plant each flag on the nearest ten, then add the flags."
- **instructionShort:** "Round, add, then decide."
- **buttons:** "close" · "far off"
- **hints:** `flags` "Plant both flags first." · `sumEmpty` "Add the two flags and write the sum." · `snap` "The elastic only reaches the nearer ten." (hundreds: "nearer hundred") · `sum.more` "Add the two flag numbers: {a} + {b}." · `sum.most` "Count on in tens from {a}." (hundreds: "in hundreds") · `judge.wrongClose` "It fell through — it is {d} away, and the net is only {w} wide each way." · `judge.wrongFar` "It landed in the net — only {d} away from the estimate."
- **celebrations:** `estimate` "{a} + {b} is about {ra} + {rb} = {est}." · `close` "{f} is close to {est} — it makes sense!" · `far` "{f} is far from {est} — something went wrong!"
- **settings:** "Round to" — "nearest ten" / "nearest hundred" · "Ask" — "estimate only" / "estimate, then judge an answer"
- **aria:** rail "{n}: between {lo} and {hi}"; flag "Flag for {n}, at {pos}"; net "Net from {lo} to {hi}"; card "An answer: {f}".
- **Locale traps:**
  - **Rounding rule at 5:** all 11 locales teach "5 rounds up" in school (Kaufmännisches Runden in de; "arrondi au plus proche, 5 vers le haut" in fr; "avrunding oppover ved 5" in no …) — the hook leans up everywhere; reviewer confirms. Never "banker's rounding".
  - **"about" / "is approximately"** — authored per locale: de "ist ungefähr", fr "fait environ", es "es aproximadamente", pt "é aproximadamente", it "è circa", nl "is ongeveer", sv "är ungefär", da "er cirka", no "er omtrent", fi "on noin". Some locales write the estimate with "≈" (de/nl/sv/fi textbooks: `46 + 52 ≈ 100`) — **the celebration may use "≈" in those locales**, but "≈" is never drawn on the apparatus.
  - **Numbers ≥ 1,000:** no card or estimate reaches 1,000 (largest card 856, largest estimate 900); only the overview strip's end label and the hundreds window's "1000 / 1100 / 1200" do. They use the locale's grouping via `Intl.NumberFormat` (en "1,000", de/it/pt/da/nl "1.000", fr/sv/fi/no "1 000" with a narrow no-break space; es prints four-digit numbers without grouping, "1000") — never a hand-written separator.
  - **"close" / "far off"** — short everyday words: de "nah dran" / "weit weg", fr "proche" / "loin", es "cerca" / "lejos", pt "perto" / "longe", it "vicino" / "lontano", nl "dichtbij" / "ver weg", sv "nära" / "långt ifrån", da "tæt på" / "langt fra", no "nær" / "langt unna", fi "lähellä" / "kaukana". The buttons must fit 140 px at 22 px — all do (longest "langt ifrån").
  - **"nearest ten"** — de "auf den nächsten Zehner", fr "à la dizaine la plus proche", es "a la decena más cercana", pt "para a dezena mais próxima", it "alla decina più vicina", nl "op het dichtstbijzijnde tiental", sv "till närmaste tiotal", da "til nærmeste tier", no "til nærmeste tier", fi "lähimpään kymmeneen".

## 10. Sound off, access, phones
- **Sound off:** the snap-back is a visible wobble with distances shown; plant = the number in the box; the net and the falling card are drawn.
- **Keyboard:** Tab between flags, ← / → step a flag, Enter plants; digits + Enter for the sum; ← / → for the verdict buttons.
- **aria:** flags are `slider`s with `aria-valuetext` "at {pos}"; a live region reads "Planted on 50" / "Too far — the elastic pulled it back"; the card drop is announced ("caught in the net" / "fell through").
- **Taps:** flag hit area 48 × 64; keys ≥ 50 × 44; verdict buttons 140 × 56 (704) / 152 × 52 (360).
- **Pictures:** none (rails, posts, flags, elastic, net and card are apparatus geometry).
- **Fold:** the verdict buttons/Check at ≈ 470 px on 360 × 740, ≈ 460 px on 320 × 640 ✓.
- **Phone changes:** keypad and verdict buttons swap places by phase; planted-number boxes above the posts.

## 11. Distinct from
- **Tool `rounding-hill`:** a stone rolls downhill into the nearest ten (slope = nearness); **tool `landing-strip`:** the class names the nearest post, then places the number. Here the mechanic is a *length limit* — an elastic that cannot stretch more than half a ten — and the same elastics later become the reasonableness net. Neither tool estimates a sum or judges an answer.
- **Built #3 The Peek Path / #6 Letterbox Street:** number-line counting (K). Not rounding.
- **Row 154 Gauge's Good Guess (2.MD.A.3):** estimates a LENGTH by growing a picture; here an arithmetic answer is judged against a computed estimate.
- **Siblings in this batch:** #290 compares two sides by train length; #295 tests a rule against pairs; only #294 makes "about" a physical range.

## 12. Build plan
- **Core state:** `{ setting:{unit:10|100, ask}, round:{a,b,friend}, flags:[{pos,planted:null|n}×2], sum:null, phase:'round'|'add'|'line'|'judge'|'done', verdict:null, misses }`.
- **Core functions:** `roundHalfUp(x,u)`; `canPlant(peg, post, u)` = |post − peg| < u/2 OR (|post − peg| = u/2 AND post > peg); `estimate()`; `netRange()` = [est − u, est + u]; `judgeFriend(f)` = f ∈ netRange; `windowFor(est,u,width)`.
- **Gate ground truth (`verify-estimate-flags-core.js`):** independent arithmetic: (1) for every addend, exactly one post is plantable and it equals `round half up`; (2) at every halfway addend only the upper post plants; (3) every exact sum ∈ net; every "close" card = exact sum; every "far off" card ∉ net and ≥ 2 nets away; (4) verdict balance 5/5 per setting; (5) after 500 seeded shuffles no verdict run > 3; (6) the shortcut bots in §6 score as listed (ones-digit ≤ 6/10, digit-count ≤ 5/10, first-digit ≤ 7/10, within-100 ≤ 8/10 at tens) — rerun on any table edit; at least two tens "far off" cards lie within 20 of the estimate (the net, not a feeling, must decide them); (7) the sum box accepts only ra + rb; (8) from round 4 of a pass the flags are pinned until the post boxes are typed and checked; a typed wrong ten snaps back and counts one miss.
- **Mutations:** half rounds down · elastic limit set to a full ten (both posts plantable) · net width = one half-unit (catches nothing off by 7) · net width doubled (catches the 101-slips at tens) · a "far off" card equal to the exact sum · verdict buttons swap sides between rounds · the long line accepts a single bar · the estimate computed from the exact addends · miss-2 counting from the wrong flag · flags draggable from round 4 before the post boxes are typed (rounding by trial).
- **Local test:** real pointer drags of both flags both ways (snap-back and plant), halfway cases, typed sums, both verdicts, at 320·360·412·704·768·1024·1366; assert the card's final y (caught vs fallen) matches the table.
- **Pictures:** none.
- **Risks:** the tens net at 360 is 25 px across — the local test measures it ≥ 24 px and the card's caught position visibly inside; the overview strip must never be read as the measuring line (it carries no flags, only the window bracket).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — the twang of an over-stretched elastic, the hook that slides a flag up, and a game of catch with someone's answer are all toy-like and repeatable.
2. **Would a teacher put it on the board?** Yes — rounding is shown as "can only reach half way", the estimate is literally the sum of the flags, and reasonableness is a net whose width comes from the roundings — the honest maths of estimation, including why rounding to hundreds catches less.
3. **Would a parent trust it?** Calm, no characters, numerals and drawn geometry only; a wrong verdict is answered by watching where the answer actually lands.
4. **The invention:** "Each number holds its flag on an elastic that can stretch only half way to a ten, so the flag can only reach the nearest ten — and the two elastics become the net that catches a sensible answer and drops a silly one."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **The "far off" cards were not real children's errors and never needed the net:** 179 and 188 ("carried a 1 that wasn't there" into an empty hundreds place) and 100-slips caught by any sense of size. Replaced with the classic slips — a forgotten carry (74 for 36 + 48, only 16 from the estimate), column sums written in full (811 for 62 + 29), a forgotten carry inside the hundreds (373 for 135 + 248) — so twice a pass only the ± 10 net decides. Round 9 rebalanced (523 + 212) to keep rounding 11 up / 9 down with 3 halves.
- Re-solved both tables with my own oracle (work-c41/rest.js): every exact sum inside its net, every close card exact, every far card outside; all four shortcut bots re-measured and written down (ones-digit 6/10, digit-count 4/10, first-digit 7/10, within-100 8/10 at tens; the hundreds' coarse net named honestly).
- Gate now demands ≥ 2 tens far cards within 20 of the estimate.
- **Rounding by trial closed:** a dragged flag finds the right ten in at most two tries. Rounds 1–3 of a pass stay drag (feel the elastic); from round 4 the child WRITES each rounded number in the post box (the worksheet's own move) and Check flies the flag there — a wrong ten snaps back with the twang and counts a miss; dragging returns as the help. Gate + mutation added.
