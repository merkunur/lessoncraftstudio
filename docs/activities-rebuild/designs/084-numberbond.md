# Row 84 — Find the Missing Part → THE TURNING DOMINO (1.OA.B.4)

## 0. Identity
- id `numberbond.subtraction-unknown-addend.1-oa-b-4` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.OA.B.4 · Operations & Algebraic Thinking · own files `turning-domino-core.js`, `turning-domino-activity.js`, `turning-domino-activity.html`, `turning-domino-activities.json` (the row leaves `number-bond-activities.json`; the id is unchanged).
- page title (frozen): "Find the Missing Part — Subtraction as a Number Bond (Grade 1)". Page intro (frozen) stays true: a subtraction like 8 − 3 is shown as one whole and two parts — the whole and one part are given, the child fills in the missing part ("3 and ? make 8"). The domino IS the bond: its brass plate is the whole, its two halves are the parts.
- worksheets covered: **G1-113** Fact Families · **G1-209** Fact Family Houses · **G1-219** Fact Families to 10 · **G1-220** Fact Family Houses to 20 · **G1-221** Fact House Practice to 10 · **G1-222** Fact Families: Missing Partners (the fact house, stage 2) · **G1-115** What Is Missing? · **G1-215** Missing Number Problems to 20 · **G1-218** Missing Number Problems to 10 (stage 1 — the unknown in all five positions, including the whole).
- old activity: a part-part-whole bond, whole and one part given, the child fills the missing part; 8 rounds (8/3, 9/4, 11/7, 12/5, 13/8, 14/6, 15/9, 16/9). **Kept:** all 8 number trios and the "whole + one part → missing part" task. **Changed:** in six trios the OTHER part is the unknown (same trio, so the old content is intact) so that the answer 5 no longer comes three times. **Added:** the domino, the four-fact house, the five equation stances (the unknown in every position, including the whole), two more trios to 20 and a Within 10 level.

## 1. The pitch
"Every fact family is one domino: turn it round and the addition swaps, break a half off and what is left is the subtraction — and the face-down half is the missing part."

## 2. Why a child will want it again (the fun)
- **A big, heavy domino.** A chunky ivory domino with a brass number plate lies on a green felt holder. It turns with a satisfying spin, and a half breaks off with a crisp "clack" when you pull it — and snaps back on when you return it. Handling it is the fun.
- **The face-down half.** One half lies face down (a teal criss-cross back). The child dials how many pips it hides; hollow ghost rings appear on its back. Will the domino agree? The test is physical: all the pips march up under the brass plate, and the plate has exactly as many sockets as its number.
- **The fact house lights up.** Beside the domino stands a fact house (roof triangle with the three numbers, four windows). Every new way the child holds the domino writes one fact into a window with a stamp-thump; four windows lit = the house glows warm.
- **The domino shelf.** Each solved domino slides down onto a shelf under the stage — after a pass the child has a row of their own dominoes, each showing its family. Sliding along the shelf (tapping a past domino) replays its four facts.
- **Free play ("Domino maker"):** dial both halves of a blank domino (1–10 each); the plate fills in the whole by itself; turn it and break it as much as you like; the house writes the facts.

## 3. The skill and the misconception
- **Skill (1.OA.B.4):** understand subtraction as an unknown-addend problem — find 8 − 3 by finding the number that makes 8 when added to 3. With the fact-family sheets: three related numbers make four facts (two additions, two subtractions); addition and subtraction undo each other. With the missing-number sheets: find the unknown in an addition or subtraction equation within 10/20.
- **Misconception 1 — "3 + ? = 8 means add the numbers" (answer 11):** **Push back:** a half can hold at most ten pips (a full ten-frame), and the test marches every pip under the brass plate, which has exactly 8 sockets: with 3 visible and 11 dialled, the dial stops at 10 and even then 5 pips hang off the end of the plate with nowhere to go.
- **Misconception 2 — subtraction is a separate, unrelated sum:** **Push back:** the four facts are made with ONE object. Breaking the half with 3 off leaves 5 on the holder: 8 − 3 = 5 is just the domino with a piece taken away; putting it back is 5 + 3 = 8.
- **Misconception 3 — the order of the parts matters / "5 + 3" is a new fact to learn:** **Push back:** turning the domino swaps the halves and the plate does not change.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (content 672):**
- **Task line** 22 px: "Dial the ? and press Check. Then make all four facts." (one wording for every stance — the equation strip shows where the ? is)
- **Domino zone (left, 440 × 420):**
  - **The brass plate** (the whole): 120 × 52 px, centred above the domino, numeral 38 px Baloo 2 dark ink on brass (#C79A3E → #E8C26A). Under it, hidden until a test, a row of sockets (one per unit of the whole, 2 rows of 10 at 18 px pitch, 14 px rings).
  - **The domino:** 400 × 196 px, ivory (#FBF6EA) with a 3 px ink outline, radius 18, a centre groove line. Each half 196 × 196 holds a 5 × 2 grid of pip sockets (pips 28 px dark ink discs, ten-frame order: fill the top row of 5 first); empty sockets are not drawn on a face-up half. A face-down half shows the back: teal (#146B5E) with a cream criss-cross.
  - **The holder:** a green felt strip 420 × 24 under the domino.
  - **Handling chips** under the holder: **turn** (a round 56 px chip with a circular-arrow icon) — the domino can also be rotated by a two-finger twist or a long drag around its centre.
  - **The tray** (for a broken-off half): a dashed cream box 200 × 200 at the domino's lower right, below the holder.
  - **Equation strip** under everything: 36 px Baloo 2, e.g. "3 + ? = 8"; it rewrites itself live as the domino is handled.
- **Dial** (stage 1): drum 100 × 56 with − / + (52 × 52), range 1–10 for a half, 2–20 when the plate wears its lid.
- **The lid** (the `? − a = b` stance only): a green felt cap over the brass plate, the plate's numeral hidden; the dial's value appears on the cap as faint socket rings.
- **Fact house (right, 220 × 360):** a roof triangle 220 × 100 holding the trio (whole at the apex, the two parts at the lower corners, 28 px), a body 200 × 250 with four windows (each 180 × 52, cream, 24 px numerals), each window empty with a faint ICON of the handling that makes it: the domino as it lies; the turn arrow; the left half leaving; the right half leaving.
- **Shelf** (bottom, full width, 64 px tall): solved dominoes at 64 × 32 each.
- **Check** under the equation strip at the right.

**At 360 px (content 336):** task line 20 px (2 lines) → plate 96 × 44 → domino 320 × 156 (halves 156 × 156, pips 22 px) → holder → turn chip 52 px + tray 140 × 140 to its right (the broken half shrinks to fit) → equation strip 30 px → dial (drum 96 × 52, buttons 48 px) + Check in one row → fact house collapses to a strip: the trio badge (whole over the two parts) at the left + four windows in a 2 × 2 grid (each 150 × 44, 20 px). Check bottom ≈ 560 px; the house's last window ≈ 690 px at 360 × 740. At 320 × 640 the domino is 288 × 140 (pips 20 px); Check ≈ 520 px. The shelf scrolls horizontally under the house.

**Pictures:** none — the domino, house and shelf are apparatus geometry. **Words on the apparatus:** none; numerals and + − = only.

## 5. The hand
**Stage 1 — the face-down half:**
- **The dial:** + / − or swipe; hollow ghost rings (28 px, 2 px teal) appear on the face-down back in ten-frame order, one per dial step, with a soft tick.
- **Check:** the test — the visible half's pips and the ghost rings lift off (staggered 40 ms) and march up into the plate's socket row, filling sockets left to right (visible pips first, then ghosts). Exactly right: every socket full, no pip left → the face-down half flips (3D flip 320 ms) and its real pips drop into the ghost rings with a click; the equation becomes "3 + 5 = 8"; the first window of the house fills (stamp thump).
- **The lid stance (`? − a = b`):** the dial sets how many socket rings the plate has; on Check every pip on the holder AND in the tray marches up — too few sockets → the extra pips hang off the plate's end (amber); too many → empty sockets glow; exactly right → the lid lifts off and the numeral stands there.
- **The tray stances (`w − a = ?`, `w − ? = b`):** the face-down half lies where the stance puts it (holder or tray); the march takes the visible half's pips plus the ghosts, as above.
- **After a right Check** the solved equation stamps into its window (it is one of the family's four facts) and any tray half snaps back on: stage 2 always starts with the whole domino on the holder.
- Undo: the dial can be changed freely before Check.

**Stage 2 — the four facts (fact house on):**
- **Turn** (chip, twist or long circular drag): the domino spins 180° in 450 ms (ease-out with a 4 % overshoot), the halves swap sides, the plate stays put; the equation rewrites "5 + 3 = 8"; if that fact is new, it stamps into its window.
- **Break a half off:** drag either half downward/away: at 24 px the groove cracks (a "clack"), the half comes off and follows the finger; release in the tray (or anywhere outside the domino) → it lands in the tray. The holder keeps the other half; the plate still says 8; the equation becomes "8 − 3 = 5" (the whole, minus the half in the tray, equals the half on the holder). A new fact stamps into its window.
- **Put it back:** drag the tray half onto the empty side → it snaps on (a lower "clack"); the equation becomes the addition again.
- The order of the four facts is free; a repeated fact flashes its window instead of stamping.
- When all four windows are filled, the house glows, the roof's three numbers pulse once, and the domino slides down onto the shelf (500 ms).
- **Free play "Domino maker":** two dials (one per half); the plate shows their sum live; turn and break freely; the house fills.

## 6. The rounds
One round = one domino: stage 1 (find the face-down half), then stage 2 (the four facts) when the fact house is on.

**Every round opens the domino in the stance of ONE equation form** (critic: the first draft only ever asked "visible + ? = whole", which leaves the missing-number sheets G1-115/215/218 and "Missing Partners" G1-222 half covered — they ask for the unknown in every position). The equation strip shows the form with "?" from the first frame:

| form | the stance at round start | what is dialled |
|---|---|---|
| `a + ? = w` | both halves on the holder, the RIGHT half face down | the face-down half |
| `? + a = w` | both halves on the holder, the LEFT half face down | the face-down half |
| `w − a = ?` | half a lies face up in the tray; the half left on the holder is face down | the holder half |
| `w − ? = b` | the half in the tray is face down; half b face up on the holder | the tray half |
| `? − a = b` | both halves face up (a in the tray, b on the holder); the brass plate wears a felt LID — the whole is the unknown | the plate (2–20) |

The march test is the same law in every stance: every pip (visible pips + the dialled ghosts) marches into the plate's sockets. For the lid form the dial sets how many sockets the plate has: too few sockets → pips hang off the end; too many → empty sockets glow (the child who subtracts, 8 − 5 = 3 for "? − 5 = 8", watches 13 pips crowd a 3-socket plate — 10 hang off).

**Level "Within 20" (default) — 10 rounds** (every trio is an old trio, 9 and 10 new; in six rounds the OTHER part of the old trio is now the unknown, which is why 5 no longer comes three times):

| # | whole | parts | form (as the strip shows it) | answer |
|---|---|---|---|---|
| 1 | 8 | 3, 5 | 3 + ? = 8 | 5 |
| 2 | 9 | 5, 4 | ? + 5 = 9 | 4 |
| 3 | 11 | 4, 7 | 11 − 4 = ? | 7 |
| 4 | 12 | 7, 5 | 12 − ? = 7 | 5 |
| 5 | 13 | 5, 8 | ? − 5 = 8 | 13 |
| 6 | 14 | 8, 6 | ? + 8 = 14 | 6 |
| 7 | 15 | 6, 9 | 6 + ? = 15 | 9 |
| 8 | 16 | 9, 7 | 16 − 9 = ? | 7 |
| 9 (new) | 17 | 8, 9 | 17 − ? = 8 | 9 |
| 10 (new) | 19 | 10, 9 | ? − 10 = 9 | 19 |

**Level "Within 10" — 8 rounds:** 2 + ? = 6 → **4** · ? + 4 = 7 → **3** · 8 − 2 = ? → **6** · 9 − ? = 7 → **2** · ? − 4 = 6 → **10** · 4 + ? = 5 → **1** · ? + 3 = 10 → **7** · ? − 5 = 4 → **9**.

**One right answer each; never 0;** every half 1–10; halves sum to the whole; the plate dial runs 2–20.
**Answer position:** the answer is dialled. Balanced and measured (critic oracle): (a) every form appears twice in Within 20 (2/2/1/1/2 in Within 10 — `a + ?` 2, `? + a` 2, `w − a` 1, `w − ?` 1, `? − a` 2); (b) where a PART is unknown it is the bigger part in 4 of 8 (Within 20) and 3 of 6 (Within 10) rounds, so "the hidden half is always the big one / the small one" fails; (c) answers: Within 20 — 5, 7, 9 twice each, the rest once; Within 10 — all eight different; no two adjacent rounds share an answer after the shuffle; (d) a part answer never equals the whole or the visible half; the lid answer never equals a part.
**Order:** order-only reshuffle per pass; never the same order twice.

## 7. Check, the misses, the success
- **Stage 1, Check with the dial untouched:** no miss; the dial glows; bubble: **"Turn the dial: how many pips are hiding?"** (lid stance: **"Turn the dial: how many places does the plate need?"**)
- **Miss 1:** the march test runs. Too few: the plate's last socket(s) stay empty and glow dark amber. Too many: the extra ghost rings have no socket and hang off the end of the plate, amber. Then the pips and ghosts return to the domino (the face-down half stays face down). Bubble: **"The plate has room for {whole}. Look at the gap."** / **"The plate has room for {whole}. Some don't fit!"**
- **Miss 1, lid stance:** the dialled sockets fill; leftover pips hang off the end, or empty sockets glow. Bubble: **"Your plate has room for {d}. Do all the pips fit?"**
- **Miss 2:** the plate's sockets show small numerals 1…{whole}; the visible pips march up and fill 1…{visible}, and the remaining sockets stay as dashed glowing rings — count them. Bubble: **"Count the empty places on the plate."** (lid stance: every pip — holder and tray — gets a numeral 1…{whole} as it lifts; bubble **"Count all the pips — on the holder and in the tray."**)
- **A new dial move takes the help away** until the next Check.
- **Stage 1 success:** the half flips (or the lid lifts), pips click into the rings, the equation strip fills its "?" — e.g. **"12 − 5 = 7"** or **"13 − 5 = 8"** — and that fact stamps into its window. Bubble: **"{a} and {b} make {whole}!"**
- **Stage 2:** nothing to get wrong; after 6 s with no new fact, the next empty window's icon wiggles once (the hint is the icon, not a word). When the house is full, bubble: **"One domino, four facts: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}."** and the domino slides to the shelf.

## 8. Settings
1. **Numbers:** Within 10 / Within 20 (default Within 20) — at rest the plate's socket row is one row of ≤ 10 or two rows, and the dominoes are lighter (≤ 10 pips in all).
2. **Fact house:** On / Off (default On) — Off: the house is hidden, the domino goes to the shelf straight after stage 1 (for a quick missing-number round, G1-115/215/218). Visibly different at rest.

## 9. Words (EN source)
- on-screen title: **The Turning Domino**
- instruction: **One half of the domino is face down. Dial how many pips it hides, then press Check. Then turn the domino and break off a half to make all four facts of its family.**
- task line: **Dial the ? and press Check. Then make all four facts.**
- hints: **Turn the dial: how many pips are hiding?** · **Turn the dial: how many places does the plate need?** · **Your plate has room for {d}. Do all the pips fit?** · **Count all the pips — on the holder and in the tray.** · **The plate has room for {whole}. Look at the gap.** · **The plate has room for {whole}. Some don't fit!** · **Count the empty places on the plate.**
- success: **{a} and {b} make {whole}!** · **One domino, four facts: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.**
- free play: **Domino maker**
- settings: **Numbers** — **Within 10** / **Within 20** · **Fact house** — **On** / **Off**

**Locale traps:**
- **"Fact family" / "fact house"** are school words that differ: de **Rechenhaus** (the beloved roof-house form — use it), nl **rekenhuisje** / sommenfamilie, fr **famille d'opérations**, es **familia de operaciones**, pt **família de fatos**, it **famiglia di operazioni**, sv **talfamilj**, da **talfamilie**, no **tallfamilie**, fi **laskuperhe**. The house's title is chrome (the settings label), not on the apparatus.
- **"Pips"**: de "Punkte (Augen)", fr "points", es "puntos", pt "pontos", it "puntini", nl "stippen", sv "prickar", da "prikker", no "prikker", fi "pisteet/pistettä" (partitive after numbers). Domino is "domino/Domino/dominó/dominó/tessera del domino/dominosteen/dominobricka/dominobrik/dominobrikke/dominopala" — the reviewer chooses the natural child word.
- **"make" in "3 and 5 make 8"**: de "3 und 5 sind zusammen 8", fr "3 et 5 font 8", es "3 y 5 son 8", fi "3 ja 5 on yhteensä 8".
- Equations use "−" (true minus) in every locale; "=" universal.

## 10. Sound off, access, phones
- Legible silent: the march test, the sockets, the flip and the window icons carry everything; the clacks are a bonus.
- Keyboard: ↑/↓ dial; Enter = Check; T turns; ← / → breaks off the left / right half; B puts it back.
- aria: "domino, left half 3 pips, right half face down"; "brass plate 8"; the march result is announced ("one place is still empty").
- Taps: halves ≥ 156 px; turn chip ≥ 52 px; dial buttons ≥ 48 px; windows are not tap targets (they fill by handling).
- Reduced motion: the turn is a crossfade; pips appear in sockets without marching.

## 11. Distinct from
- **part-whole-frame (tool):** carry counters across a two-part frame, cover a part or the whole. Here nothing is covered and nothing is carried: one object is TURNED (commutative) and BROKEN (subtraction), and the unknown part is a face-down half tested against a fixed-size plate.
- **Row 90 The Plank Path (1.OA.D.8, designed in batch 22 — its earlier name "The Domino Train" is retired):** every equation is a gap in a stream-side path and every number is a plank exactly that long; only the right plank spans its gap. No domino at all any more. **Coverage ownership (batch-22 critic ruling 2026-10-17): row 90 OWNS the missing-number sheets G1-115 / G1-215 / G1-218.** This row keeps its five missing-number stances as stage 1 (they are how 1.OA.B.4's unknown addend is asked) and practises those sheets as a secondary use; it OWNS the fact-family sheets G1-113 / 209 / 219 / 220 / 221 / 222 together with New 248 (four facts acted on a tray) and row 135 (the turnaround and take-away twins).
- **Row 87 (this batch, the ladder)** pairs expressions of equal value; **row 83** joins three drops; **row 85** snips a stick. None uses a single object to generate four facts.
- **#18 Friendship Bridge / #17 Partner Bows** compare or share groups; **#40 Number Post Box** uses slots for numbers, not part-whole.

## 12. Build plan
- **Core state:** `{ level, house, order[], idx, round:{whole, a, b, form:'a+?'|'?+a'|'w-a'|'w-?'|'?-a'}, dial, faceDown:'left'|'right'|'tray'|'holder'|'lid', orientation:0|180, removed:null|'left'|'right', facts:Set, misses, help }`.
- **Functions:** `setDial(n)` (1–10), `march(dial)` → `{filled, empty, overflow}`, `check()`, `flip()`, `turn()`, `breakOff(side)`, `putBack()`, `currentEquation()` (from orientation + removed), `factKey(eq)`, `nextTask(index)`.
- **Gate `verify-turning-domino-core.js` (own oracle):** (1) a + b = whole and every half 1–10 for every round; the answer = the part the stance hides, or the whole for `? − a = b` (gate re-derives from the form); (2) part stances: `march(d)` → empty = max(0, whole − visible − d), overflow = max(0, visible + d − whole) for all d 1–10; lid stance: empty = max(0, d − whole), overflow = max(0, whole − d) for all d 2–20; check passes iff d = the answer; the starting stance matches the form (which half/lid is hidden, which half is in the tray); (3) `currentEquation` gives exactly the four distinct facts over the 4 handling states (as lies, turned, left off, right off) — and turned + left off equals as lies + right off (the same subtraction fact), asserted; (4) the house fills only from handling, never from the dial; (5) each form twice in Within 20, the Within 10 form counts as listed; a hidden part is the bigger part 4 of 8 / 3 of 6; answers ≤ 2 per level, no adjacent repeats over 10 000 seeds; a part answer ≠ whole, ≠ visible; (6) the half dial never offers 0 or 11, the plate dial never 0, 1 or 21; (7) every trio in Within 20 rounds 1–8 equals an old trio; (8) after a right Check the stamped fact is the stance's equation and the domino is whole before stage 2.
- **Mutations:** let the dial reach 11; lid stance grades on a part instead of the whole; a stance starts with the wrong half hidden; drop one form from the Within 20 table; march ignores overflow; turning changes the plate; breaking a half writes an addition; a fact stamps twice; house fills from the dial; hidden always the bigger part; a round where halves don't sum to the whole; flip reveals on a miss (the answer leaks).
- **Pictures:** none. **Risks:** the 2 × 2 window grid at 320 px (150 × 44, 20 px numerals) — measured by `visual-qa-activity.js`; discoverability of "break a half off" (the window icon wiggle + the aria/keyboard path). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a big domino that spins and clacks apart in your hand, a hidden half to crack, a little house that lights up, and a shelf of your own dominoes.
2. **Would a teacher put it on the board?** Yes — "3 and how many make 8?" is tested against a plate that only has 8 places, and the fact family stops being four sums to memorise: it is one domino held four ways.
3. **Would a parent trust it?** Quiet, wordless, no score; the answer is dialled, never chosen from options; the help counts empty places, it does not give the number.
4. **The invention:** one domino is a whole fact family — turning it swaps the addition, breaking off a half makes the subtraction, and the face-down half is the missing part.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- **Coverage gap closed.** Stage 1 only ever asked "visible + ? = whole", but the dossier's missing-number sheets (G1-115 / 215 / 218) and Missing Partners (G1-222) put the unknown in every position — including the whole (? − 3 = 5). The domino now opens in one of FIVE stances (`a + ?`, `? + a`, `w − a = ?`, `w − ? = b`, `? − a = b` with a felt lid on the plate); the same march test proves every one (for the lid, the dial sets the plate's sockets, so the subtract-instead-of-add error shows 10 pips hanging off a 3-socket plate). New hints, gate clauses and mutations for the stances.
- **Round tables rebuilt and re-solved by my oracle:** every trio still an old trio (1–8), each form twice in Within 20, answers 5/7/9 twice each and the rest once (Within 10: eight different answers), hidden part bigger in 4 of 8 / 3 of 6. The old ✱ notes miscounted (six trios, not three, swap their unknown) — corrected.
- **One task line for every stance** ("Dial the ? and press Check…") so the line never changes wording (LAW rule 2).
- **Distinctness:** row 90 (then "The Domino Train", now The Plank Path, 1.OA.D.8, batch 22) — §11 states the ownership of the missing-number sheets (row 90) and that nothing is shared.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
