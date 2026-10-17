# New 296 — The Odd Bump: odd numbers are plates with a bump, two bumps lock together flat — and tens never have a bump (3.OA.D.9)

## 0. Identity
- **id** `spare-sock.play.3-oa-d-9` · grade 3 · CCSS 3.OA.D.9 (identify arithmetic patterns — e.g. the sum of two odd numbers is even — and explain them) · strand Operations & Algebraic Thinking · key `spare-sock` → `spare-sock-core.js`, `spare-sock-activity.js`, `spare-sock-activity.html`, `spare-sock-activities.json`. Start with `node scripts/new-activity.js --num=296`. Page title **"The Odd Bump"**.
- **Why not socks:** the working idea (socks pegged in pairs on a washing line, a lonely sock left over) is retired for three measured reasons: (1) *pairing with one left over* is already three inventions — tool `pair-gate` (remainders of a parade), tool `doubling-mirror` ("nine leaves one with no partner"), New 249 *The Fair Tug* (an odd number leaves a referee); (2) up to 18 loose socks at the 64 px picture floor do not fit a 328 px phone row (18 × 64 = 1,152 px), and accessories/sock is ONE striped sock (picture rulings), so a "pair" would be the picture plus its mirror; (3) socks cannot show the real reason the ones digit decides — tens are always even. The key stays `spare-sock` so the backlog row resolves.
- **Worksheets covered:** G3-386 "Odd or Even Sum? Decide Without Adding" (do not add; look at the underlined ones digit of each number, use the table, tick whether the sum is even or odd).
- New instrument; no old activity.

## 1. The pitch
"Every number is built of dot plates: an even number is a flat plate, an odd number has one bump sticking up — and when two numbers are pushed together, two bumps lock into each other like jigsaw pieces and the plate goes flat; the tens are always flat bars, so only the ones plate can bring a bump."

## 2. Why a child will want it again
- **The jigsaw click.** Push 7 and 9 together and the 9-plate spins half round — now its bump sticks out at its LEFT end on the BOTTOM row — so when it slides up to the 7, the 7's top-row bump slots over the 9's bottom-row bump like two steps of a staircase meeting, with a satisfying *click*: one flat plate of 16, two neat rows of 8. Push 6 and 9 together and the 9's bump is left sticking up, wobbling. Children push numbers together just for the click.
- **Tens are smooth.** In 14 + 3 the ten is a long flat bar with a band round it; when the numbers slide together the bar drops straight into the tray without even looking — only the little ones plates meet. The child *sees* that the big part never matters.
- **The bump peek (big numbers).** For 357 + 229 the numbers are just numerals with their ones digits underlined, and the child decides from the digits. The peek — a curtain under each number that shows only its ones plate (7: bump; 9: bump) beside sealed smooth hundreds and tens slabs marked "×3" / "×5" — is the HELP and the PROOF, not the answer key: it lifts by itself on the reveal, after a miss (see §7), and freely in free play after the round. During the decision it carries a small padlock (critic change: a free peek would let a child count bumps forever without ever learning that 7 and 9 are odd digits).
- **The rule card fills itself.** A small card with three lines — flat + flat, flat + bump, bump + bump — stamps each line the first time the child sees it happen: it is the worksheet's table, earned rather than given.
- **The earned show:** on a right decision the joined plate glows and the dots in the two rows light in pairs, top and bottom together, ending with a soft double chime (even) or a last lonely dot that bounces (odd).
- **Free play:** after each round any two plates on the board can be dragged together to watch the click, and the curtain can be peeked at will.

## 3. The skill and the misconception
- **Skill:** decide whether a sum is even or odd from the addends' parity, without adding — even + even = even, odd + odd = even, even + odd = odd; and, for big numbers, only the ones digit decides (the tens and hundreds are always even). Two and three addends (3.OA.D.9; G3-386).
- **Misconception 1 — "odd + odd = odd".** **Push-back (the mechanic):** two bumps physically lock into each other and leave a flat plate — every two-odd round shows it (3 of 10 rounds with two addends, 3 of 10 with three addends have exactly two odd addends).
- **Misconception 2 — "I must add first".** **Push-back:** the tens bars never take part in the join (they are flat by construction) and in the big-number setting the sum is never shown — only bumps; the decision is made from the ones plates alone.
- **Misconception 3 — looking at the wrong digit** (the first digit of 357). **Push-back:** the peek only ever lifts the ones; the round tables are built so that "use the first digits" is right only 5 and 6 of 10 times in the two big-number sets (measured, §6).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: board 460 px left, decision column 196 px right):**
- **Task line** (22 px): **"Is the sum even or odd? Decide without adding."**
- **The numbers** (board, one row per addend, 2 or 3 rows, 96 px each): on the left the numeral (40 px Baloo; in the big setting its ones digit is underlined with a 4 px teal bar); to its right its **plates** (drawn apparatus, cream with a 2 px ink outline, dots 18 px in 26 px cells): **ten-bars** — 2 × 5 dot slabs (130 × 52) with a band drawn across them, always flat; the **ones plate** — 2 rows of dots, ceil(n/2) wide; an odd plate's TOP row is one dot longer than its bottom row, so its last dot is a **bump** — a rounded tab sticking out at the plate's right end, past the flat right edge of the bottom row (the classic 2-row odd shape; critic correction: a bump standing up ABOVE the top edge, as first drawn, could never interlock with another plate side by side). 0 ones → no ones plate.
- **Small setting (to 20):** plates always visible: 14 = one ten-bar + a 4-plate; 13 = one ten-bar + a 3-plate (bump); 20 = two ten-bars.
- **Big setting (to 1,000):** under each numeral a **curtain** (a soft cream band) hides its plates; the hundreds and tens appear (only when peeked) as sealed slabs with a "×3" / "×5" count and a band, never as dots; the ones plate appears with real dots.
- **The join tray** (board bottom, 460 × 88): an empty dashed tray where the plates slide together on the reveal.
- **The rule card** (decision column top, 180 × 132): three lines of tiny plate icons — flat + flat → flat · flat + bump → bump · bump + bump → flat — each line pale until stamped.
- **Decision buttons** (fixed: **even** LEFT, **odd** RIGHT): 180 × 56 each in the decision column (stacked at 704, side by side at 360), each with an icon (a flat plate / a plate with a bump) and its word.
- **Peek** button (big setting only): 180 × 44, an eye icon.
- No words on the apparatus: numerals, dots, bumps, bands and "×n" counts.

**At 360 px (stacked, content 328 px):** numbers in rows of 80 px — numeral 32 px on the left (64 px column), plates with 22 px cells (a ten-bar 110 × 44, a 9-plate 110 × 44 + bump), so the widest small row (one ten-bar + a 9-plate = 110 + 6 + 110 = 226) fits in 264 px ✓; the rule card becomes a strip of three icon pairs (328 × 44) under the board; buttons side by side 156 × 52; peek 328 × 44. Budget 360 × 740 (three addends): header 56 + task 40 + 3 × 80 + tray 72 + card 44 + buttons 52 + peek 44 + gaps 40 = 588 ✓. **At 320 × 640:** cells 20 px (widest row 100 + 6 + 100 = 206 in 230 ✓), budget ≈ 570 ✓.

## 5. The hand
- **Decide:** tap **even** or **odd** (or press ← / →). The choice is held (the button stays pressed) and the reveal plays.
- **The reveal (≤ 1.4 s):** the plates slide down into the join tray (300 ms); ten-bars and hundred-slabs drop straight in at the tray's left and dim slightly (they never need looking at); the ones plates slide toward each other — when two bumps meet, the right-hand plate spins 180° about its centre (200 ms, dots snapped back to the cell grid) so its bump is bottom-left, and the two staggered ends nest with a *click* into a flat 2-row block; with three addends two bumps lock first, then the third plate joins (if it has a bump it is left sticking up, wobbling). The final tray shows flat or one bump.
- **Peek (big setting):** locked while the child decides (a tap wiggles the padlock and says "Look at the underlined digits."); it lifts on its own during the reveal, before the decision after two misses (help, §7), and on tap in free play after the round (250 ms; tap again to lower). It shows the bumps, never the join.
- **Free play after a round:** drag any number row onto another to replay the join; peek freely.
- **Sound:** a soft wooden slide, the jigsaw *click* when bumps lock, a little spring *boing* for a bump left over; TTS (where available) reads the result ("seven plus nine is even").
- **Keyboard:** ← even, → odd, P peek, Enter = Next.

## 6. The rounds
One round = two or three addends; the child decides even or odd. (o = odd, e = even addend; the parity of each addend is what the plates show.)

**Up to 20, two addends:**

| # | sum | parities | answer |
|---|---|---|---|
| 1 | 7 + 9 | o o | even |
| 2 | 6 + 8 | e e | even |
| 3 | 5 + 12 | o e | odd |
| 4 | 14 + 3 | e o | odd |
| 5 | 11 + 5 | o o | even |
| 6 | 4 + 13 | e o | odd |
| 7 | 9 + 6 | o e | odd |
| 8 | 13 + 7 | o o | even |
| 9 | 10 + 6 | e e | even |
| 10 | 15 + 2 | o e | odd |

**Up to 20, three addends:** 3 + 5 + 7 (o o o, odd) · 2 + 9 + 5 (e o o, even) · 6 + 4 + 8 (e e e, even) · 5 + 10 + 7 (o e o, even) · 8 + 3 + 4 (e o e, odd) · 9 + 11 + 3 (o o o, odd) · 2 + 6 + 1 (e e o, odd) · 7 + 4 + 9 (o e o, even) · 12 + 6 + 4 (e e e, even) · 1 + 8 + 10 (o e e, odd).

**Up to 1,000 (numerals; ones digit underlined), two addends:** 357 + 229 (o o, even) · 486 + 312 (e e, even) · 345 + 538 (o e, odd) · 670 + 193 (e o, odd) · 713 + 465 (o o, even) · 524 + 707 (e o, odd) · 791 + 204 (o e, odd) · 368 + 451 (e o, odd) · 932 + 186 (e e, even) · 605 + 247 (o o, even).

**Up to 1,000, three addends:** 123 + 456 + 789 (o e o, even) · 240 + 316 + 108 (e e e, even) · 212 + 575 + 346 (e o e, odd) · 907 + 134 + 253 (o e o, even) · 461 + 883 + 129 (o o o, odd) · 658 + 402 + 530 (e e e, even) · 319 + 705 + 221 (o o o, odd) · 846 + 173 + 691 (e o o, even) · 527 + 914 + 368 (o e e, odd) · 132 + 640 + 415 (e e o, odd).

- **Measured (`work-41/par.js`):** every set has 5 even / 5 odd answers (dossier 45–55 % ✓); two-addend sets have each parity combination ≥ 2 times (small: oo 3, ee 2, oe 3, eo 2; big: oo 3, ee 2, oe 2, eo 3); three-addend sets have three odds 2, two odds 3, one odd 3, no odds 2. No addend is 0.
- **Answer position:** even is always LEFT, odd always RIGHT (a parity decision reads best with fixed places); with 5/5 per set "always left" wins 50 %.
- **Shortcut bots** (correct out of 10, small-2 / small-3 / big-2 / big-3): "the parity of the LAST addend" 4 / 5 / 5 / 5; "the parity of the FIRST addend" 5 / 6 / 4 / 6; "add the FIRST digits and use that" 7 / 7 / 5 / 6 (in the small sets the first digit of a one-digit number IS the ones digit, and the plates are visible anyway); "add the TENS digits" 6 / 5 / 4 / 5; "odd if any addend is odd" (the misconception) 7 / 7 / 7 / 7 — it fails exactly every round with two odd addends; "the parity of the biggest addend" 5 / 5 / 5 / 6. Only the ones digits (the bumps) score 10/10.
- **Order:** order-only reshuffle per pass, never the same order twice; constrained so no answer runs more than 3 the same in a row and every pass opens with a two-odd round (the misconception meets the click first).

## 7. Check, the misses, the success
- The decision IS the check (one tap). Before deciding there is nothing to miss; tapping Next without deciding → hint **"Tap even or odd."**
- **A wrong decision (miss):** the reveal still plays, slowed to half speed, and the decisive moment is ringed coral — the two bumps locking (said odd, was even) or the bump left over (said even, was odd). The rule card's matching line pulses. Hint (odd + odd said odd): **"Two bumps lock together — the plate goes flat. Odd + odd is even."** · (said even, a bump is left): **"One bump has no partner, so the sum is odd."** · (three addends): **"Count the bumps: {b}. Pairs of bumps lock flat."**
- **Help after two misses in a pass:** in the big setting the curtains lift automatically before the next decision (the bumps shown, never the join) until the child decides right twice in a row; in the small setting the bumps get a soft coral outline until then.
- **There is no second try on the same round** (a binary choice would become a giveaway); the round completes with the truth and the child presses Next.
- **Success:** the joined plate glows; dots light in pairs top-and-bottom; the rule card stamps its line if new. Bubble: **"{expr} is {parity}: {why}."** with `why` = "two bumps make a pair" / "no bumps at all" / "one bump is left over" / "{b} bumps — one is left over" … e.g. "7 + 9 is even: two bumps make a pair."

## 8. Settings
1. **Numbers:** "up to 20" (default; plates visible) / "up to 1,000" (numerals with the ones digit underlined; plates under curtains, the peek button). At rest the board shows plates vs numerals with curtains.
2. **Addends:** "two" (default) / "three". At rest the board shows two vs three number rows.

## 9. Words (EN source)
- **title:** "The Odd Bump"
- **instruction:** "Is the sum even or odd? Decide without adding."
- **instruction.big:** "Is the sum even or odd? Look at the underlined ones digits — don't add."
- **buttons:** "even" · "odd" · "peek"
- **hints:** `none` "Tap even or odd." · `peekLocked` "Look at the underlined digits." · `wrongOddOdd` "Two bumps lock together — the plate goes flat. Odd + odd is even." · `wrongLeft` "One bump has no partner, so the sum is odd." · `wrongThree` "Count the bumps: {b}. Pairs of bumps lock flat."
- **celebration:** "{expr} is {parity}: {why}." · `why.pair` "two bumps make a pair" · `why.none` "no bumps at all" · `why.one` "one bump is left over" · `why.three` "three bumps — two make a pair, one is left over"
- **settings:** "Numbers" — "up to 20" / "up to 1,000" · "Addends" — "two" / "three"
- **aria:** number rows "{n}: {tens} tens bars, ones plate {ones}, {bump}" with bump = "with a bump" / "flat"; tray live region "flat — even" / "one bump — odd".
- **Locale traps:**
  - **even / odd** are single school words everywhere but some are long or compound: de "gerade" / "ungerade", fr "pair" / "impair", es "par" / "impar", pt "par" / "ímpar", it "pari" / "dispari", nl "even" / "oneven", sv "jämn" / "udda", da "lige" / "ulige", no "partall" / "oddetall" (nouns — the buttons read "partall" / "oddetall", and the sentence "{expr} er et partall"), fi "parillinen" / "pariton" (the longest: 10 letters at 22 px ≈ 120 px — fits the 156 px phone button). Adjective agreement with "the sum": fr "la somme est paire / impaire" (feminine!), es "la suma es par / impar", it "la somma è pari / dispari", pt "a soma é par / ímpar" — **the celebration's {parity} must be authored per sentence, not inserted as a bare word** (fr button "pair", sentence "… est paire").
  - **"bump"** — authors choose a child's word for a knob/tab sticking out: de "Nase" / "Noppe", fr "bosse", es "saliente" / "chichón" (avoid — a bruise; use "pico"), pt "pontinha", it "dentino", nl "nopje", sv "knopp", da "knop", no "knott", fi "nyppy". The native reviewer checks it reads as a piece of a jigsaw, not an injury.
  - **"1,000"** in the setting label uses the locale grouping (`Intl`).
  - **Underlining** the ones digit is universal; no locale writes digits right-to-left.

## 10. Sound off, access, phones
- **Sound off:** bumps are drawn tabs, the lock is visible, the leftover bump wobbles, the rule card stamps — all silent-legible. Buttons carry icons as well as words.
- **Keyboard:** ← even, → odd, P peek, Tab through rows (each announces its parity), Enter = Next.
- **aria:** each number row announces "with a bump" / "flat" only after the peek (big setting) so the screen reader user also decides from the ones digit; the tray announces the result.
- **Taps:** decision buttons 180 × 56 (704) / 156 × 52 (360) / 140 × 52 (320); peek ≥ 44 tall.
- **Pictures:** none — plates, bars, slabs and curtains are apparatus geometry (no library picture needed; see §0 for why the sock was retired).
- **Fold:** the buttons sit at ≈ 500 px on 360 × 740 and ≈ 490 px on 320 × 640 ✓.
- **Phone changes:** rule card becomes a strip; buttons side by side; smaller dot cells.

## 11. Distinct from
- **Tool `pair-gate`** (a parade passes an archway in pairs; can two remainders make a rank?), **tool `doubling-mirror`** (close the tray, nine leaves one without a partner), **New 249 The Fair Tug** (an odd team leaves a referee): all show odd as "one left over". The Odd Bump makes parity a SHAPE that locks — a bump is a jigsaw tab, two tabs interlock — and adds the place-value reason (tens are flat bars, so only the ones plate can carry a bump), which is what "decide without adding" needs for 3-digit numbers.
- **Built #18 The Friendship Bridge / #17 The Partner Bows:** pairing objects to compare groups (K). Not parity of sums.
- **Row 137 The Chimney Roof** (2.OA.C.3, batch-34): one number's parity — bricks roll into a two-wide gravity tower and the flat or chimney roof must fit; tens arrive as flat slabs. **Sum parity (G3-386) is handed to THIS instrument alone** (critic of batch-34, 2026-10-17): 137 dropped its "two numbers / merge the towers" setting so the two rows never teach the same lesson; 137 never joins two numbers, 296 never asks the parity of a single number.
- **Siblings in this batch:** #295 (also 3.OA.D.9) finds a function rule; #292 reads fact families; only #296 is about a pattern in sums.

## 12. Build plan
- **Core state:** `{ setting:{numbers,addends}, round:{ addends:[n…] }, choice:null|'even'|'odd', peeked:false, phase:'decide'|'reveal'|'done', missesInPass, rightStreak, ruleCard:{ee,eo,oo} }`.
- **Core functions:** `parity(n)` (from n mod 2 — the gate re-derives it from the ones digit independently); `plates(n)` → `{ hundreds, tens, ones, bump: ones % 2 === 1 }`; `join(addends)` → `{ bumpsLocked: 2·floor(b/2), leftover: b % 2 }`; `answer()`; `decide(choice)`; `helpOn()` (after two misses, until two right in a row).
- **Gate ground truth (`verify-spare-sock-core.js`):** (1) for every round, `answer` = parity of the sum computed by brute addition AND = parity of the count of odd ONES digits (the two methods agree — the point of the lesson); (2) 5/5 even/odd per set; combination counts as in §6; (3) the shortcut bots in §6 score exactly as listed (rerun on any table edit; fail if any bot other than "ones digits" exceeds 7/10); (4) `plates(n).tens` is never drawn with a bump; (5) after 500 seeded shuffles: no answer run > 3, every pass opens with a two-odd round; (6) help switches on after two misses and off after two consecutive rights.
- **Mutations:** odd + odd joins to "bump" (the misconception wired in) · the tens bar drawn with a bump for odd tens digits · parity read from the first digit · the peek reveals the join · the peek open during the decision before any miss (big setting) · the odd plate's bump drawn above the top row instead of at the end of the longer top row (the two plates cannot nest) · buttons swap sides between rounds · a second try allowed on the same round · help never switches off · three addends: leftover computed as b > 0 instead of b % 2 · the celebration inserts the bare button word (fr "pair" instead of "paire") — caught by the locale smoke.
- **Local test:** taps on both buttons for every round of all four sets at 320·360·412·704·768·1024·1366; assert the tray's final state (flat / one bump) and the rule-card stamps; measure the widest plate row ≤ the board width.
- **Pictures:** none.
- **Risks:** the 180° spin of a plate must keep its dots aligned to the cell grid after rotation (rotate about the plate's centre and snap) — the local test compares dot centres with the grid.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — the jigsaw click of two bumps locking is a little physical joke they will want to see again, and the peek turns big numbers into a guessing game they can win by looking at one digit.
2. **Would a teacher put it on the board?** Yes — it shows WHY odd + odd is even (the bumps pair up) and WHY only the ones digit matters (tens are flat bars) — the explanation 3.OA.D.9 asks for, not just the rule.
3. **Would a parent trust it?** Calm, drawn dot plates only, no characters, numerals on the apparatus, every wrong decision answered by watching the plates join.
4. **The invention:** "Odd numbers are plates with a bump and even numbers are flat; push two together and two bumps lock flat like jigsaw pieces — and since tens are always flat bars, only the ones plate can bring a bump."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- **The bump geometry could not interlock:** a bump "standing proud of the top edge" on two side-by-side plates never meets. Corrected to the true 2-row odd shape — the top row one dot longer, its last dot a tab at the right end; the spun plate's tab is bottom-left, and the two staggered ends nest into a flat rectangle (the standard visual proof). Reveal animation, gate and a mutation follow.
- **The free peek bypassed the skill:** in the big setting a child could peek every round and count bumps without ever reading the ones digit. The peek is now locked during the decision, lifts on the reveal, after two misses (help) and in free play.
- Re-measured all four sets and every shortcut bot with my own script (work-c41/par.js): 5/5 even-odd, every parity combination ≥ 2 in the two-addend sets, only the ones digits score 10/10; "odd if any is odd" is 7/10 by construction (it fails exactly the two-odd rounds; every pass opens with one).
- Distinctness checked against new/249 The Fair Tug and the tools pair-gate, doubling-mirror, number-balance, rounding-hill, landing-strip: pair-gate shares the TRUTH (two remainders make a rank) but not the move; the Odd Bump's interlocking shape and its place-value reason (tens are flat bars) are its own.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
