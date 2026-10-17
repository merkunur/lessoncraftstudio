# Row 97 — The Nine-Stop Tubes: ten more is one rod, never ten cubes (1.NBT.C.5)

## 0. Identity
- **id** `choice-board.ten-more-less.1-nbt-c-5` (frozen) · grade 1 · CCSS 1.NBT.C.5 · strand Number & Operations in Base Ten · own files `nine-stop-core.js`, `nine-stop-activity.js`, `nine-stop-activity.html`; the manifest row stays in `choice-board-activities.json` with `tool` → `nine-stop-activity` (slugs, titles, intros frozen in all 11 locales — no new metadata needed).
- **Worksheets covered:** G1-243 Number of the Day · G1-255 Number of the Day: Teen Numbers · G1-256 Number of the Day: Ten More, Ten Less · G1-257 Number of the Day: Up to 99 · G1-131 1 More, 1 Less · G1-132 10 More, 10 Less · G2-321 Jump Puzzles: Follow the Arrows · G2-322 Mystery Number: Two Arrows, One Square · G2-323 How Far Apart? Count the Jumps.
- **Old activity:** a choice board — a two-digit number, "What is 10 more?", tap one of four number cards. **Kept:** the eight rounds (34 more, 57 less, 60 more, 82 less, 25 more, 48 less, 71 more, 39 less), the prompt strings `promptTenMore / promptTenLess` (all 11 locales authored), the calm "take all the time you need" tone of the intro. **Dropped:** guessing among four cards — the answer is now *made*, and the instrument pushes back on the counting-by-ones answer by its own shape.

## 1. The pitch
"Two glass tubes hold the number — rods in the tens tube, cubes in the ones tube — and the ones tube stops at nine, so ten more can only ever be one rod dropped in the tens tube."

## 2. Why a child will want it again
- **The handle is the top block.** Each tube is a tall glass cylinder; the topmost block is a fat grip. Pull it up and a new block slides in under it with a glassy *tink*; push it down and the top block drops out through the tube's floor with a *plop*. One notch per block, felt as a little detent (a 2 px snap) — fidgety and pleasing.
- **The ones tube has a lid at nine.** Push the ones handle up at 9 and it bumps the lid: the whole tube shudders, the lid rattles, nothing goes in. Children test it on purpose. That bump *is* the lesson (ten ones never fit; they are a ten).
- **The neighbour cross.** In the "Number of the day" face the number sits in the middle of a cross of four empty frames — 10 less above, 10 more below, 1 less left, 1 more right (the hundreds-chart layout). The child makes each neighbour with the handles; each right one *flies out of the tubes* into its frame, and the tubes spring back to the number of the day. When the cross is full, the board's three other windows (ten frames · tally marks · the number word) light one after another as the show — the same number in many coats.
- **Arrow trips:** in the jump faces an arrow card flips over for each move, and a gold trail ribbon draws between the numbers on a tiny map strip — the trip is visible after it is done.
- **Free play:** the tubes are always live between rounds; the board and its five windows follow whatever number the child builds (try 99! the lid bumps both ways).

## 3. The skill and the misconception
- **Skill:** given a two-digit number, mentally find 10 more or 10 less without counting (1.NBT.C.5); also 1 more / 1 less (G1-131), moves on the hundreds-chart grammar applied to quantities (↓ = 10 more, → = 1 more, G2-321/322/323 — the chart itself is New #251's job) and the Number-of-the-Day *neighbours* (10 less, 1 less, 1 more, 10 more). The Number-of-the-Day *coats* (word, tally, ten frames, tens and ones) are built in Row 98; here they are only the reward show.
- **Misconception 1 — "10 more than 34 is 35"** (one more instead of ten more) or counting on by ones (35, 36 … 44). **Pushback:** to count on by ones the child pushes the ones handle up — at 39 it hits the lid. Ten ones simply do not fit in the ones tube. The only move that makes ten more is one rod in the tens tube, and the ones tube does not change: the child *sees* the 4 stay a 4.
- **Misconception 2 — the digit that wraps:** "1 more than 39 is 310" or "30". **Pushback:** at 39 the ones tube is full to the lid; 1 more can only be made by lifting a rod into the tens tube *and* emptying the ones tube (push down nine times, or hold the handle down — it drains). The child does the trade with their own hand.
- **Misconception 3 — up/down on the chart:** thinking ↓ means "1 more". **Pushback:** every arrow card is tied to one tube: ↓ ↑ cards are drawn with a rod symbol, → ← with a cube symbol, and a card played on the wrong tube will not flip.
- **Mental first:** the setting "Glass: frosted" hides the blocks — the child moves the handles by the digits alone (only the digit under each tube shows), and the blocks appear after Check. That is the "in your head" form the standard asks for.

## 4. The stage
**At 704 px (split layout: apparatus left 420 px, board right 240 px):**
- **The question card** (top, 420 × 56): big numeral of the round's start (48 px) and the operation in words — "10 more" (the task line repeats nothing else).
- **The two tubes** (centre-left): the tens tube 96 × 340 px holding up to 9 rods stacked horizontally (each rod 80 × 30, ten segment lines); the ones tube 96 × 340 px holding up to 9 cubes stacked (each cube 30 × 30, centred), topped by a **lid** drawn as a dark cap with a notch at the 9th level. Same height on purpose — nine rods and nine cubes reach the same level, so the size of a block, not the height of the stack, carries the value. Handles: the top block of each tube gets a grip band (44 × 44 touch area minimum, 96 × 44 actual). The tens tube is on the left, ones on the right.
- **Digit plates** under each tube: the tens digit and the ones digit (56 px numerals) reading together as the number; a hairline joins them into one numeral when both are set.
- **The board (right column, 240 × 380):** the **neighbour cross** on top (a centre frame 72 × 56 with the number, four frames 72 × 56 above/below/left/right, empty until made) and three windows under it (each 220 × 56): ten frames (drawn, filled dots), tally marks (five-gates), the number word (from `lib/number-words.js`). Windows are dim until the round is solved; in the other faces the cross shows only the one neighbour the round asked for.
- **The arrow tray** (jump faces only, under the question card): 2–4 cards ↓ ↑ ← →, each 56 × 56, drawn as a big arrow with a tiny rod (↓↑) or cube (←→) emblem.
- **Task line** (≤ 24 px), EN default: **"Make the new number with the handles."**
- **No words on the apparatus**; the board windows show numerals, dots, tallies and the number word (content).

**At 360 px (stacked):** question card 328 × 48; tubes 2 × 120 wide, 260 tall (rods 100 × 22, cubes 22 × 22, nine-stop lid kept); digit plates 44 px; board becomes a horizontal strip of five 64 × 64 thumbnails under the tubes that open full width when tapped; arrow cards 52 px. Check above the 740 fold (the board strip sits below Check). At 320: tubes 2 × 110, 240 tall.

## 5. The hand
- **Pull a handle up:** a new block slides into the tube below the handle (120 ms ease-out), the digit plate ticks up (flip 90 ms), *tink* (rods a lower tone than cubes). Fast drags step one block per 28 px of travel; there is no momentum, so the child cannot fling ten in by accident.
- **Push a handle down:** the top block drops out through the floor into a small catch dish under the tube (plop) and the plate ticks down. Holding down drains one block per 90 ms.
- **The lid (ones tube at 9):** an up-drag shudders the tube (160 ms, ±3 px), the lid rattles, no block enters. The tens tube also stops at 9 (the number tops at 99 — no hundreds in grade 1); the tens tube's top is a lid too.
- **Empty tube:** a down-drag at 0 lifts the grip a hair and settles (nothing to take). The tens digit 0 is shown as an empty plate only in teen/one-digit results (e.g. 13 − 10 = 3 shows the tens plate blank, not "0", so "03" never appears).
- **Arrow cards (jump faces):** tap or drag a card onto a tube: ↓ onto tens = one rod in; ↑ onto tens = one rod out; → onto ones = one cube in; ← onto ones = one cube out. Played, the card flips face-down and joins the trail strip. A card dropped on the wrong tube does not flip — it slides back (300 ms) and the matching tube's rim glows once. The child may also just move the handles directly; cards are a reading aid, not a lock.
- **Undo:** handles move freely until Check; flipped cards can be tapped to un-flip (the move is undone with them).

## 6. The rounds
Each round starts with the tubes showing the start number (or empty in the Number-of-the-day face). The child changes the tubes to the answer and presses Check.

**Face "Ten more, ten less"** (default; the old eight + two):
| # | start | op | answer | note |
|---|---|---|---|---|
| 1 | 34 | 10 more | 44 | |
| 2 | 57 | 10 less | 47 | |
| 3 | 60 | 10 more | 70 | ones tube empty throughout |
| 4 | 82 | 10 less | 72 | |
| 5 | 25 | 10 more | 35 | |
| 6 | 48 | 10 less | 38 | |
| 7 | 71 | 10 more | 81 | |
| 8 | 39 | 10 less | 29 | ones tube full — a child counting back by ones still cannot pass 30 the way they expect |
| 9 | 13 | 10 less | 3 | tens tube empties |
| 10 | 86 | 10 more | 96 | |

**Face "One more, one less"** (G1-131): 46+1=47 · 39+1=40 (trade) · 52−1=51 · 70−1=69 (trade: a rod down, nine cubes up) · 18+1=19 · 29+1=30 (trade) · 61−1=60 · 80−1=79 (trade) · 14−1=13.

**Face "Arrow jumps"** (G2-321/322/323 on quantities; every round differs from New #251's chart rounds), cards shown in order:
- follow: 34 ↓↓→ = 55 · 27 ↓→→ = 39 · 32 ↑← = 21 · 45 ↓↓← = 64 · 58 ↑↑→→ = 40 (trade inside the trip: 38 → 39 → the lid → a rod in, nine cubes out) · 92 ←↑ = 81 · 16 ↓↓↓ = 46 · 83 ↑→→ = 75. Landings 55, 39, 21, 64, 40, 81, 46, 75 lie in 7 different tens.
- mystery (two trips, one number; the child runs the first trip, the tubes reset to the second start, the second trip must land on the same number — the first landing stays pinned as a ghost plate): (24 ↓↓→ | 56 ↑←) → 45 · (17 ↓↓→ | 49 ↑←) → 38 · (22 ↓↓→ | 64 ↑↑←) → 43 · (35 ↓→→ | 67 ↑↑) → 47.
- count the jumps (start and end given): the child **predicts first** — types the counts in two small boxes "↓ ▢  → ▢" (or ↑ ▢ ← ▢) — then presses Check, and the tubes *run* the counted trip on their own (one rod per ↓, one cube per →, 300 ms each). A right count stops exactly on the end number; a wrong count stops on a different number, shown in a pencil plate beside the end (e.g. 2 ↓ 4 → from 23 stops on 47, not 57). Rounds: 23 → 57 (3 ↓, 4 →) · 41 → 63 (2 ↓, 2 →) · 68 → 35 (3 ↑, 3 ←) · 12 → 45 (3 ↓, 3 →) · 76 → 54 (2 ↑, 2 ←).

**Face "Number of the day"** (G1-243/255/256/257 — the neighbours): the number of the day stands in the tubes and in the centre of the cross; the child makes its four neighbours in order (10 less, 1 less, 1 more, 10 more), the tubes springing back to the number after each one. Ten rounds: 47 (37, 46, 48, 57) · 63 (53, 62, 64, 73) · 28 (18, 27, 29, 38) · 15 (5, 14, 16, 25) · 52 (42, 51, 53, 62) · 36 (26, 35, 37, 46) · 70 (60, 69, 71, 80 — 1 less needs a rod out and nine cubes in) · 19 (9, 18, 20, 29 — 1 more needs the trade) · 89 (79, 88, 90, 99) · 11 (1, 10, 12, 21). Teen setting of the Numbers-of-the-day sheet (G1-255) = 15, 19, 11 kept in every pass; no neighbour is ever 0.

- **Answer position:** answers are built, not chosen — no position. In Arrow jumps the gate checks the follow landings lie in ≥ 6 different tens (they lie in 7); in Ten more/less the ops alternate so that neither "more" nor "less" appears three times running; starts never repeat within a pass.
- **Order:** order-only reshuffle each pass; never the same order twice. Never 0 as an answer (13 − 10 = 3 is the smallest).

## 7. Check, the misses, the success
- **Check with the tubes unchanged** → bubble "Move a handle first." (no miss).
- **Miss 1:** a **ghost parcel** shows what the operation really is: for "10 more" a translucent rod floats down into the tens tube beside the child's blocks and settles where the answer's top would be; for "1 more" a ghost cube. The child's wrong blocks (e.g. the extra cube in the ones tube) blink once. EN **"10 more is one more ten. Look at the tens tube."** (1 more: **"1 more is one more one. Look at the ones tube."**; jumps: the wrongly played arrow card flips back up and glows: **"↓ means one more ten."**)
- **Miss 2:** the start number's blocks are outlined in pencil inside the tubes and the answer's digit plates ghost in pencil under the real plates: the unchanged digit is ringed in gold ("the 4 stays"). EN **"{start} → {answer}: only the tens digit changes."** (1 more across a ten: **"39 has no room for one more one — it becomes 40."**)
- New moves take the help away until the next Check.
- **Success:** the changed digit plate flips with a sparkle; the unchanged plate gets a gold ring; the made neighbour flies into its frame of the cross and the board's three windows light in turn (one every 160 ms); a soft three-note chime. EN **"34 and 10 more is 44 — the 3 tens became 4 tens, the 4 ones stayed."** Number of the day (cross full): **"47, forty-seven: 37 and 57 above and below, 46 and 48 beside it."** (number word from the locale table). Jumps: **"From 34: ↓ ↓ → lands on 55."** Count the jumps: **"From 23 to 57: 3 tens down and 4 ones across."**

## 8. Settings
1. **Task:** ten more, ten less (default) / one more, one less / arrow jumps / number of the day — changes the question card, the arrow tray and the board at rest.
2. **Glass:** clear (default) / frosted — frosted shows only the digit plates while the child works (blocks hidden behind frosted glass), the "in your head" form; the frost clears on Check.

## 9. Words (EN source)
- in-tool title: **"Ten More, Ten Less"**
- instruction: **"Make the new number with the handles."** · (jumps) **"Follow the arrows with the handles."** · (count the jumps) **"How many jumps? Guess first, then watch."** · (number of the day) **"Make the four neighbours of the number of the day."**
- prompts: `promptTenMore` **"What is 10 more?"** · `promptTenLess` **"What is 10 less?"** (kept, 11 locales) · new: **"What is 1 more?"** · **"What is 1 less?"** · **"10 less than {n}"** · **"1 more than {n}"** · **"{t} tens, {o} ones"** · jumps **"Where do the arrows land?"** · **"Both trips land on one number."** · **"How many jumps from {a} to {b}?"**
- hints: **"Move a handle first."** · **"10 more is one more ten. Look at the tens tube."** · **"10 less is one ten fewer. Look at the tens tube."** · **"1 more is one more one. Look at the ones tube."** · **"↓ means one more ten."** · **"{start} → {answer}: only the tens digit changes."** · **"{start} has no room for one more one — it becomes {answer}."**
- celebrations: **"{start} and 10 more is {answer} — the {t1} tens became {t2} tens, the {o} ones stayed."** · **"{start} and 10 less is {answer} — the {t1} tens became {t2} tens, the {o} ones stayed."** · **"{n}, {word}: {m10} and {p10} above and below, {m1} and {p1} beside it."** · **"From {start}: {arrows} lands on {answer}."** · **"From {a} to {b}: {d} tens down and {r} ones across."** (and the ↑ ← form "{d} tens up and {r} ones back")
- board: no captions — the cross, the frames, the tallies and the word read for themselves (aria labels carry the names).
- settings: **"Task"**: "10 more, 10 less" / "1 more, 1 less" / "arrow jumps" / "number of the day" · **"Glass"**: "clear" / "frosted"
- **Locale traps:** (a) **number words** for the word window come from `scripts/worksheet-gen/lib/number-words.js` per locale (da vigesimal *syvogfyrre*, fr *soixante-dix*, de/nl ones-first *siebenundvierzig / zevenenveertig*, fi *neljäkymmentäseitsemän*) — never generated by rule in the activity; the reviewer checks 10–99. (b) **Tally marks**: the five-gate (four strokes + a cross stroke) is the convention in en/de/fr/es/pt/it/nl/sv/da/no/fi alike (es/pt also know the square-and-diagonal *conteo*; use the five-gate everywhere, reviewer confirms). (c) **"10 more" phrasing:** keep the authored prompts; da *10 mere*, no *10 mer*, sv *10 mer*, fi *10 enemmän* (partitive-free form already authored). (d) **Arrow meaning** is the hundreds-chart convention (↓ = +10) which presumes a chart that counts left-to-right, top-to-bottom: true for every locale's school chart (the *Hundertertafel*, *tableau des nombres*, *hundraruta*, *satataulu*). (e) **Tens/ones words** in the board: de *Zehner/Einer*, fr *dizaines/unités*, es/pt *decenas/unidades · dezenas/unidades*, it *decine/unità*, nl *tientallen/eenheden*, sv *tiotal/ental*, da/no *tiere/enere*, fi *kymmenet/ykköset* (fi with numerals: *4 kymmentä, 7 ykköstä* — partitive after a numeral; the reviewer fixes the frame).

## 10. Sound off, access, phones
- Legible with sound off: lid bump, ghost parcel, gold ring and board windows are visual; tones are a bonus.
- Keyboard: Tab to a tube; ↑/↓ move its handle one block; Enter on an arrow card plays it on its own tube.
- aria: tube `aria-label="tens: 3 rods"` / `"ones: 9 cubes — full"`; handles are sliders with `aria-valuenow` 0–9.
- Taps: grips ≥ 44 px; cards 52–56 px; no picture (all apparatus). Check above the fold at 360×740 and 320×640.

## 11. Distinct from
- **number-drum (tool):** an odometer — turning the ones ring past 9 drags the tens automatically. Here nothing carries by itself: the lid *stops* the ones, and the child makes the trade.
- **place-value-lab / Row 98 Arrow Cards (this batch):** building a number; here the number already exists and only one block changes — the "change one thing" move is the content.
- **#19 Number Elevator, number-hotel (tool):** a number as a place; here a number is two quantities.
- **New #251 Chart Patches (this batch):** the hundreds chart itself; here the same arrows act on quantities, no chart.

## 12. Build plan
- **Core state:** `{ face, frosted, t:0..9, o:0..9, start, op, cards:[{dir, played}], trip:[n…], ndt:{coat, value}, windowsLit:[…] }`.
- **Functions:** `up(tube)` (refused at 9 — returns `'lid'`), `down(tube)` (refused at 0), `value()` = 10t + o, `playCard(i, tube)` (refused unless the card's tube matches), `check()` → `{ok, kind:'none'|'ones-for-tens'|'off-by'|…}`, `boardFor(n)` → `{tensOnes, frames, tally, word, neighbours}`.
- **Gate's truth (`verify-nine-stop-core.js`):** its own arithmetic oracle (start ± 10 / ± 1, arrow composition, the two-trip meeting square, the jump counts as |Δtens|, |Δones|) — every round has exactly one answer within 1–99 and never 0; the mystery trips really meet; the ones tube can never hold 10 (exhaustive: from every state, `up('o')` at 9 refuses); `boardFor` agrees with an independently built tally/frame decomposition; number words taken from the shared table equal a hand list for 11 locales × {11, 15, 19, 28, 36, 47, 52, 63, 70, 84}.
- **Mutations:** lid at 10 · lid missing on the tens tube (100 reachable) · `playCard` accepts any tube · ↓ means +1 · arrow trip computed left-to-right but applied right-to-left · frosted mode leaks the blocks before Check · same order twice · two "more" rounds three times running · a mystery round whose trips do not meet · word window uses the wrong locale · a count-the-jumps run that lands on the end with a wrong count · the cross accepts a neighbour in the wrong frame · a neighbour of 0 reachable in the round list.
- **Pictures:** none (all apparatus). **Risks:** the "13 − 10" blank tens plate must not read as a missing digit (plate shows a faint dash) — reviewer looks at the render. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — glass tubes with grippy handles, a lid that rattles, a board that lights up in five coats.
2. **Teacher on the board?** Yes — "only the tens digit changes" is not told but *felt*: the ones tube cannot take ten, so ten more is one rod. The arrow and Number-of-the-day routines teachers already run are faces of the same instrument.
3. **Parent trust?** Calm, no timer, nothing to buy, numerals and quantities only; the frosted glass is the "do it in your head" step parents recognise.
4. **Invention:** the number lives in two glass tubes, and the ones tube stops at nine — so ten more can only be one rod in the tens tube.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 3→5 · reality 5→5
What changed:
- **Arrow rounds fixed:** the gate's own rule (landings in ≥ 6 tens) failed on the designer's list (5 tens); two follow rounds replaced (32 ↑← = 21, 92 ←↑ = 81) → 7 tens. Every trip re-computed.
- **Collision with New #251 removed:** the mystery round (61 →→↓ | 84 ↑←) → 73 was identical in both designs; replaced, and a fourth mystery and fifth jumps round added so each sub-face has ≥ 4.
- **Count the jumps was answered by the trail itself** (the trail counted the moves the child had just made); now the child predicts the counts first and the tubes run them — a wrong count visibly lands on the wrong number.
- **Collision with Row 98 removed:** both designs built Number-of-the-Day from its coats. Here the face is now the **neighbour cross** (10 less / 1 less / 1 more / 10 more, hundreds-chart layout); the coats belong to Row 98 and appear here only as the reward show.
- Board captions (words on the apparatus) dropped; the "10 less" celebration was an unfinished "…" string — written out.
