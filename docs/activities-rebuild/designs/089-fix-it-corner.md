# Row 89 — Fixit's Fix-It Corner → THE TWO GAUGES (1.OA.D.8)

## 0. Identity
- id `fix-it-corner.missing-part.1-oa-d-8` (KEPT; slugs/metadata frozen) · grade 1 · CCSS 1.OA.D.8 · Operations & Algebraic Thinking · own files `two-gauges-core.js`, `two-gauges-activity.js`, `two-gauges-activity.html`, `two-gauges-activities.json` (the row leaves `fix-it-corner-activities.json`, which is emptied to `[]`; the id is unchanged). Slugs en/de/fr/es/pt/it/nl exist; sv/da/no/fi slug, title and intro are new at build (grade 1).
- page title (frozen): "Fixit's Fix-It Corner — Find the Missing Number (Grade 1)"; intro (frozen) promises: help Fixit the near-sighted repair-mole work out the part each broken gadget needs — the missing sum, addend, subtrahend or minuend — pop it in and watch it whir to life; counting-on, fact families and balancing. **All kept true** (the mole is never drawn — see §12; he speaks in the bubble).
- worksheets also covered: **G1-115** What Is Missing? (to 10 — the to-10 dials have a countable tick per number) · **G1-218** Missing Number Problems to 10 · **G1-215** Missing Number Problems to 20 · **G3-350** Make It Balance (the BALANCE gadgets: an expression on each side, one blank) · **G2-313** Number Walls with Two-Digit Answers and **G2-393** Math Maze Within 100 (the "Big gadgets" level: tens-friendly unknowns to 100; one gadget's panel is drawn as a three-brick wall, one as a three-station chain like the maze's road signs).
- old activity: eleven rounds of eight "experiences" (make-10 ten-frame fill, missing sum from a tray, count-on hop, count-back hop, fact triangle, recombine, balance, produce) around an SVG-stub mole; "confirm-after-commit" vessels. **Kept:** every blank position the old rounds used (sum, both addends, subtrahend, minuend, balance, make-10), six old equations verbatim (8 + 5 = ▢, 9 + ▢ = 15, 13 − ▢ = 8, ▢ + 5 = 12, 6 + 6 = ▢ + 4, and 7 + ▢ = 10 written whole-first as 10 = 7 + ▢; 6 + 7, 8 + ▢ = 13, ▢ − 5 = 8 and 6 + ▢ = 10 are dropped only because their answers would repeat inside a level), the commit-then-see principle (nothing previews the answer before the child commits), the gadget that whirs to life, and "produce" (now the free-play Workshop). **Changed:** one instrument instead of eight mini-games — every equation is read by the same pair of gauges, so the child learns that "=" always means the same thing; the hand-drawn mole is gone (library gadgets only).

## 1. The pitch
"Every gadget has two gauges, one for each side of the equals sign — and it only runs when both needles point to the same number."

## 2. Why a child will want it again (the fun)
- **The pull lever.** A chunky start lever. Pull it and both needles sweep across their dials at once with a rising "whirrr", trailing a coloured arc — coral for the first number, teal for the second. Children pull it just to watch the needles race.
- **The click of agreement.** When the needles land on the same tick they snap together into one gold needle with a satisfying "clack!", the "=" plate between the gauges lights gold, and the broken gadget on the bench (a library toaster, robot, fan …) floods from grey into colour, shakes, puffs three little steam circles and goes "brrring!".
- **Overshoot is funny, not shameful.** Put in a number that is too big and the needle swings past the other one and bonks the stop-pin with a "boing"; the gadget gives a tiny sputter and a grey puff. Too small and it stalls with a sleepy "fwump". The gap between the needles glows — you can see exactly how far off you were.
- **A shelf of fixed things.** Each repaired gadget leaves a gold gear tag on Fixit's shelf (drawn tags, one per round); a full shelf at the end of a pass makes all the tags spin at once.
- **Workshop (free play).** Build any equation on the panel, pull the lever, watch the gauges; then tap any number to hide it — "Fixit, your turn!" — and that becomes the next puzzle (for a friend at the board). The old "produce" experience, kept and made central.

## 3. The skill and the misconception
- **Skill (1.OA.D.8):** determine the unknown whole number in an addition or subtraction equation relating three whole numbers, with the unknown in any position (8 + ? = 11, 5 = ▢ − 3, 6 + 6 = ▢); the worksheets add the balance form a + b = ▢ + c (G3-350) and tens-friendly unknowns to 100 (G2-313, G2-393).
- **Misconception 1 — "add the two numbers you see"** (8 + ▢ = 13 → 21). **Push back:** with 21 in the socket the left needle runs 8, then 21 more, flies past 13, hits the stop-pin and bounces; the gap between the needles is huge and lit. The material says "way too much" without a word.
- **Misconception 2 — "=" means "the answer comes next"** (6 + 6 = ▢ + 4 → 12; 9 + 3 = 10 + ▢ → 22). **Push back:** the two sides are two separate gauges with the "=" plate between them; the gadget runs only when both needles agree. With 12 in the socket the right needle reads 16 and the left reads 12, and the 4-tick gap glows. The equals sign is a promise that the two gauges match, not an arrow to the answer.
- **Misconception 3 — subtraction blanks done backwards** (13 − ▢ = 8 → 21; ▢ − 5 = 8 → 3). **Push back:** a subtraction sweeps the needle UP to the first number (coral) and then BACK (teal; the needle visibly reverses). ▢ = 3 in ▢ − 5 = 8 makes the needle climb to 3, start back, and bump the zero pin — nowhere near 8.
- **Misconception 4 — off by one when counting on** (counts the start number). **Push back:** miss 2 numbers the ticks of the path 1, 2, 3 … starting on the tick AFTER the known number, so "8" is never counted as "1".

## 4. The stage
Layout `split` at ≥ 700 px (bench left, Fixit column right); stacked below.

**At 704 px** (stage 452 px + column 220 px):
- **Task line** (22 px, ≤ 2 lines): the round's prompt (§9).
- **The bench** (drawn: a warm wood strip 452 × 16 along the bottom of the stage).
- **The gadget** (library picture, 120 px, standing on the bench at the far left): broken = CSS `grayscale(1)` + 0.7 opacity; fixed = full colour. Nine gadgets, verified in `mini tools/pictures/*.json` and seen on the kitchen-tools, toys and around-the-house contact sheets: **kitchen-tools/toaster, kitchen-tools/blender, kitchen-tools/kettle, kitchen-tools/mixer, kitchen-tools/microwave, toys/robot, toys/train, toys/helicopter, around-the-house/fan**. (Not used: kitchen-tools/timer and around-the-house/clock — their round faces look like gauges and would compete with the apparatus. blender and mixer are both "Mixer"/"Rührgerät"-confusable in de and are never in the same pass.)
- **The control panel** (drawn: a cream plate 432 × 300, 3 px ink outline, four screw dots) holding:
  - **Two gauges**, dials 180 px across, side by side with a **"=" plate** (40 × 40, turns gold when matched) between them: 180 + 12 + 40 + 12 + 180 = 424 px. Each dial: a 270° scale from 0 (lower left) clockwise to the level's top (10, 20 or 100); a tick for every whole number (to 100: short ticks every 1, long every 10); numerals in Baloo 2 16 px at every number 0–10 (to 10), at 0, 5, 10, 15, 20 (to 20), at 0, 10 … 100 (big); a **zero pin** just below 0 and a **stop pin** just past the top; a teal needle 70 px with a 16 px hub. The LEFT gauge reads the LEFT side of the equation, the RIGHT gauge the right side — always.
  - **The equation strip** under the gauges (432 × 72): number chips (numerals 34 px on 56 × 56 chips), operator chips "+" / "−" (28 px), and the "=" chip centred exactly under the "=" plate so each side of the strip sits under its own gauge. The blank is **the socket**: a recessed number drum 64 × 64 with a glowing rim and a "?" until set. In BALANCE rounds the strip holds an operator on each side.
  - **The start lever** (a coral knob 56 px riding a 90 px slot) at the right end of the strip.
- **Right column (220 px):** Fixit's **bubble** (≤ 3 lines, 17 px) → the **shelf** (a drawn rail, one gold gear tag 28 px per solved round, empty outlines for the rest of the pass) → speaker 36 px.

**At 360 px** (stacked): task line → gadget 72 px at the left with the bubble beside it (264 px wide) → gauges 150 px each with a 28 px "=" plate (150 + 6 + 28 + 6 + 150 = 340) → equation strip (chips 44 × 44, numerals 28 px, socket 56 × 56, lever knob 48 px at its end) → shelf as a row of 9 dots 12 px → Check. Check bottom ≈ 640 px at 360 × 740. **At 320 × 640:** gauges 132 px, gadget 64 px, bubble 15 px, shelf dots folded into the progress chip; Check ≈ 600 px.

**Words on the apparatus:** none — numerals and + − = only.

## 5. The hand
- **Tap the socket** (or Tab + Enter): within 60 ms a number pad slides up from the strip — keys 48 × 48 px, five per row: to 10 → 1–10; to 20 → 1–20 (no 0 key: no answer is 0). **Big gadgets:** the socket is a **two-drum socket** (tens drum 0–9, ones drum 0–9), each drum with ▲ / ▼ buttons 44 px; the drums roll with a ratchet click per step (80 ms).
- **Tap a key:** the number drops into the socket with a soft "tock" (120 ms) and the pad closes. Tapping the socket again reopens the pad (nothing is final until the lever).
- **Pull the lever** (drag the knob down 60 px, tap it, or press Check — the same action): the lever clunks (100 ms) and both needles sweep at once — first term at 70 ms per unit with a coral trail, a 150 ms pause, then the second term at 70 ms per unit with a teal trail (clockwise for +, counter-clockwise for −); a pitch-rising "whirr" follows the needle. A side that is a single number swings straight to it with a grey trail. Total sweep ≤ 2.2 s (big gadgets: 12 ms per unit).
- **Judged** (§7) the moment both needles stop.
- **Tap a gauge face** after a run: replays that gauge's sweep slowly (300 ms per unit) — the "watch it again" button, as often as wanted, never a miss.
- **At rest, before the lever:** a side that holds no socket shows its reading (its needle rests on its value with its coloured trail — e.g. in 6 + 6 = ▢ + 4 the left needle rests on 12 with a 6-coral, 6-teal trail; in 10 = 7 + ▢ the left needle rests on 10). The side with the socket rests on 0. **One exception, because it would print the answer:** when the socket stands ALONE on its side (a result blank: 6 + 3 = ▢, 16 − 7 = ▢, 40 + 30 = ▢), the other side's needle also rests on 0 until the lever — otherwise its needle would sit on the answer before the child has thought. (Critic, measured: 5 of the 27 rounds leaked their answer at rest under the first rule.) So the child sees what the socket's side must reach whenever that is not itself the answer, and never what the socket does until the lever is pulled.
- **Workshop (free play)**, chip "Workshop" in the column: every chip on the strip is settable; pull and watch; tap the small hide-dot under any chip to hide it; "Fixit, your turn!" turns it into the next puzzle.
- Undo: re-tap the socket; nothing else is committed.

## 6. The rounds
A round = one gadget, one equation with exactly one socket. Three levels (setting "Numbers"), 9 rounds each; order-only reshuffle per pass (never the same order twice; never the same blank kind three times running; gadgets shuffled separately so the toaster is not always the make-10 round).

**Level "To 10"** (G1-115, G1-218) — dials 0–10:
| # | equation | answer | blank |
|---|---|---|---|
| 1 | 10 = 7 + ▢ | 3 | 2nd addend, whole first (make 10, old) |
| 2 | ▢ + 4 = 9 | 5 | 1st addend |
| 3 | 6 + 3 = ▢ | 9 | sum |
| 4 | 10 − ▢ = 6 | 4 | subtrahend |
| 5 | ▢ − 3 = 5 | 8 | minuend |
| 6 | 9 − 7 = ▢ | 2 | difference |
| 7 | 2 + ▢ = 8 | 6 | 2nd addend |
| 8 | 4 + 4 = ▢ + 1 | 7 | balance |
| 9 | ▢ + 2 = 3 | 1 | 1st addend |

**Level "To 20"** (G1-215, G3-350; holds the old rounds) — dials 0–20:
| # | equation | answer | blank |
|---|---|---|---|
| 1 | 8 + 5 = ▢ | 13 | sum (old) |
| 2 | 9 + ▢ = 15 | 6 | 2nd addend (old) |
| 3 | 13 − ▢ = 8 | 5 | subtrahend (old) |
| 4 | ▢ + 5 = 12 | 7 | 1st addend (old) |
| 5 | ▢ − 6 = 8 | 14 | minuend |
| 6 | 6 + 6 = ▢ + 4 | 8 | balance (old) |
| 7 | 16 − 7 = ▢ | 9 | difference |
| 8 | 18 = 7 + ▢ | 11 | 2nd addend, whole first |
| 9 | 10 + ▢ = 9 + 3 | 2 | balance, blank on the LEFT |

**Level "Big gadgets"** (G2-313, G2-393) — dials 0–100:
| # | equation | answer | panel |
|---|---|---|---|
| 1 | 40 + 30 = ▢ | 70 | strip |
| 2 | 90 = 50 + ▢ | 40 | strip (whole first) |
| 3 | ▢ + 20 = 80 | 60 | strip |
| 4 | 60 = 90 − ▢ | 30 | strip (result first) |
| 5 | ▢ − 40 = 50 | 90 | strip |
| 6 | 35 + ▢ = 40 | 5 | strip (to the next ten) |
| 7 | 62 + ▢ = 72 | 10 | **wall panel**: two bottom bricks 62 and ▢ under a top brick 72 |
| 8 | 30 + 40 = ▢ + 50 | 20 | balance |
| 9 | 25 + 10 + ▢ = 50 | 15 | **chain panel**: three stations in a row (25 → +10 → +▢) ending at 50 |

The wall panel draws the strip as three bricks (two below, one on top); the left gauge reads the two bottom bricks and the right gauge the top brick — a number wall is shown to be an equation. The chain panel draws the three addends as stations joined by arrows, the maze's running total; the left gauge sweeps three terms (coral, teal, gold).

**Answers** are all different within each level (to 10: 3 5 9 4 8 2 6 7 1; to 20: 13 6 5 7 14 8 9 11 2; big: 70 40 60 30 90 5 10 20 15). Never 0 anywhere.

**Answer position:** the socket stands under the LEFT gauge in 5 of 9 rounds and under the RIGHT gauge in 4, in every level (to 10 right: rows 1, 3, 6, 8; to 20 right: rows 1, 6, 7, 8; big right: rows 1, 2, 4, 8 — critic-measured with `work-c22/m089.js`). The whole-first rows (10 = 7 + ▢, 18 = 7 + ▢, 90 = 50 + ▢, 60 = 90 − ▢) are there on purpose: the blank on the right of an unfamiliar-looking equation is the case children skip. The balance blank sits on the right in to 10 and big, and on the LEFT in to 20 (10 + ▢ = 9 + 3), so G3-350's "either side" is met and "the blank in a balance is always on the right" is never learnable. First addend, second addend, minuend, subtrahend, result and balance blanks each appear ≥ 1 per level. A pad answer has no screen position. **The gate measures:** answers distinct per level (to 10: 3 5 9 4 8 2 6 7 1; to 20: 13 6 5 7 14 8 9 11 2; big: 70 40 60 30 90 5 10 20 15); |left − right| ≤ 1 per level; **no round shows its answer at rest** (with the result-blank exception of §5); in every unknown-PART round the typical error (add the two visible numbers; for a minuend blank, subtract them) lands ≥ 3 ticks from the answer or off the scale (measured minimum 4: 2 + ▢ = 8 → 10, ▢ + 2 = 3 → 5); in balance rounds the "answer comes next" error (4 + 4 → 8, 6 + 6 → 12, 9 + 3 → 12, 30 + 40 → 70) always leaves a gap of ≥ 1 tick; no blank kind 3× adjacent over 10 000 shuffles.

## 7. Check, the misses, the success
- **Lever / Check with the socket empty:** no miss. The socket rim pulses twice; bubble (Fixit): **"Pop a number in the socket first."**
- **Miss 1 (needles disagree):** both needles stay where they stopped; the **gap arc** between their tips lights coral with its ticks bright (unnumbered); the needle that went past the other trembles. Gadget: a 3 px shake and one grey puff. Bubble: **"The needles don't agree. Look at the gap."** — or, when a needle hit a pin, **"Whoa — that went right off the dial!"**
- **Miss 2:** the gap stays and the **counting path** appears on the gauge that holds the socket, its ticks numbered 1, 2, 3 … from the tick AFTER the known number. Which stretch, and which hint, depends on the blank — chosen so that the bubble NEVER prints the answer (critic: the first draft's single "Count the steps from {k} to {target}" printed the answer as {target} in every minuend round, e.g. "from 8 to 13" for ▢ − 5 = 8):
  - unknown addend / subtrahend (8 + ▢ = 13, 13 − ▢ = 8, 10 = 7 + ▢): the path from the known number to the printed target; the answer is the COUNT. Bubble: **"Count the steps from {k} to {target}."**
  - minuend (▢ − 5 = 8): the path climbs from 8 by 5 (the start is 5 more than what is left). Bubble: **"Start at {c} and count on {b}."**
  - result (8 + 5 = ▢ / 16 − 7 = ▢): the second term's stretch from the first number, forwards or back. Bubble: **"Start at {a} and count on {b}."** / **"Start at {a} and count back {b}."**
  - balance: from the socket side's known part to the other gauge's reading. Bubble: **"Both gauges must read {n}."** ({n} is the other side's value — never the answer.)
  The answer is never spoken or printed; in the to-10 dials a minuend/result path ends on a numbered tick, which is the strongest showing and is reserved for miss 2.
- **A new socket value takes the help away** (gap and path fade) until the next pull.
- **Success:** the two needles click into one gold needle, the "=" plate lights gold, the gadget floods into colour (400 ms), wiggles and puffs three steam circles (600 ms), a gold gear tag drops onto the shelf. Bubble reads the equation: **"8 + 5 = 13 — it works!"** (balance: **"6 + 6 = 8 + 4 — both sides make 12!"**). End of the pass, all nine tags spin: **"Every gadget is fixed!"**

## 8. Settings
1. **Numbers:** To 10 / To 20 / Big gadgets — the dials' scale (0–10 with every numeral, 0–20, 0–100 by tens) and the socket (pad or two drums) change at rest. Default To 20.
2. **Counting path:** Only as a help / Always — "Always" draws the dashed path (unnumbered) at rest on every unknown-PART round (addend, subtrahend, balance), where its LENGTH is the answer and must still be counted; result and minuend rounds get no path at rest, because their path ENDS on the answer. Its numbering still waits for miss 2.

## 9. Words (EN source)
- on-screen title: **Fixit's Fix-It Corner**
- instruction: **Put the missing number in the socket, then pull the lever. The gadget only runs when both needles point to the same number.**
- prompts (task line): sum **{a} and {b} — how many in all?** · 2nd addend **{a} and how many more make {c}?** · make 10 **Fill it up to exactly 10!** · 1st addend **What plus {b} makes {c}?** · subtrahend **{a} take away how many leaves {c}?** · minuend **Take away {b}, leaves {c} — start with what?** · difference **{a} take away {b} — how many are left?** · balance **Make both sides match.** · chain **What makes the whole row {c}?** (sum, 2nd addend, make 10, 1st addend, subtrahend, minuend and balance are the old strings, kept in en/de/fr/es/pt/it/nl)
- hints (Fixit, in the bubble): **Pop a number in the socket first.** · **The needles don't agree. Look at the gap.** · **Whoa — that went right off the dial!** · **Count the steps from {k} to {target}.** · **Start at {c} and count on {b}.** · **Start at {a} and count on {b}.** · **Start at {a} and count back {b}.** · **Both gauges must read {n}.**
- success: **{equation} — it works!** · **{a} + {b} = {c} + {d} — both sides make {s}!** · **Every gadget is fixed!**
- free play: **Workshop** · **Fixit, your turn!** · **Tap a number to hide it.**
- settings: **Numbers** — **To 10** / **To 20** / **Big gadgets** · **Counting path** — **Only as a help** / **Always**

**Locale traps:**
- **Minus sign:** the strip prints U+2212 "−" (never a hyphen) in all locales.
- **Equation direction:** every locale reads left to right; the left gauge is always the left side; "10 = 7 + ▢" (whole first) is ordinary school notation in all 11.
- **"Take away"** uses each locale's school verb (de "wegnehmen", fr "enlever", es "quitar", pt "tirar", it "togliere", nl "eraf halen", sv "ta bort", da "tage væk", no "ta bort", fi "ottaa pois"); the old de/fr/es/pt/it/nl prompts are kept.
- **Balance:** G3-350 is "Make It Balance", but no scale is drawn — the prompt says "match", and no locale may translate it as "balance the scale" (it would name an apparatus that is not there).
- **Fixit** stays "Fixit" in all 11 (a nonsense name the old 7 locales already use).
- **Gadget nouns** never appear on the apparatus; if a success line ever names one it comes from `image-vocabulary.js`.
- **Number words** for TTS via `scripts/worksheet-gen/lib/number-words.js` (fr "soixante-dix", da "halvfjerds" for 70 in the big level — the numerals on screen carry the meaning when TTS is silent).

## 10. Sound off, access, phones
- Legible silent: the needles, the coloured trails, the gold click, the gap arc and the colour flood carry every outcome.
- Keyboard: Tab → socket → digits type directly (Enter confirms); Space/Enter on the lever = run; G replays the left gauge, H the right; ▲▼ roll the drums in the big level.
- aria: socket "missing number, empty" / "missing number, 5"; after a run the live region reads "left side 11, right side 13, 2 apart" or "both sides 13".
- Taps: pad keys 48 px, drum buttons 44 px, lever 56/48 px, socket 64/56 px.
- Reduced motion: needles jump to their stops with the trails drawn at once; no shake.
- Phones: the two gauges stay side by side down to 320 px — never stacked, because left-gauge/right-gauge IS the reading of the equation.

## 11. Distinct from
- **number-balance (tool):** a beam that tips when two built sides differ. The Two Gauges tips nothing: each side is READ on its own dial, and equality is two needles at one number — measuring, not weighing; the child commits one number and the needles compute the sides.
- **#090 Plank Path** (this batch): the missing number is a plank that must span its gap. **Owner of the missing-number sheets G1-115 / G1-215 / G1-218 is #090 Plank Path** (critic ruling 2026-10-17: the row whose whole job is "find the missing number", blank in any position). #089, #091 and row 84 (Turning Domino, as its stage 1) also practise these sheets, but #090 answers for them in the coverage audit. #089 OWNS G3-350 (Make It Balance), G2-313 and G2-393. **#091 Fair Ribbon:** difference as levelling two jars. **#250 Number Wall:** light rising through glass bricks. **#19 Number Elevator / #21 Creek Map:** comparison, not unknowns.
- **open-number-line / number-line (tools):** free jumps; here the sweep is made by the gauge from the child's committed number and judged against the other side.
- **New 239 The Weather Window** (NGSS, another batch) — checked against its file: its "two gauges" are a painted sky and a numeral-less thermometer that the child drags like a slider; nothing sweeps, nothing is compared, and the point is that the two need NOT agree. Here two numbered dials are swept by the lever from the child's committed number and the point is that they MUST agree. The words are shared, the instruments are not. **number-balance (premium tool, checked in `cov/tools.txt`):** "build both sides, watch the beam tip" — there the child builds both sides; here the child commits ONE number and the dials compute both sides (no beam, no weighing, no building). Registry checked: no other needle mechanic.

## 12. Build plan
- **Core state:** `{ level, pathAlways, order[], idx, eq: { left: Term[], right: Term[], socket: {side, index} }, value: null|int, run: null|{leftReads, rightReads, gap, pinHit}, misses, help, shelf, workshop }` with `Term = {n: int|null, op: '+'|'−'}`.
- **Functions:** `setSocket(v)`, `sweep(terms, v)` (pure: the list of needle stops; reports a zero-pin or stop-pin hit), `pull()` → `{ok, leftReads, rightReads, gap, pinHit, reason:'empty'|'mismatch'}`, `countingPath()` (start tick, end tick, direction — computed from the equation, never from the answer key), `hide(chipIndex)` (workshop), `nextTask(index)`.
- **Gate `verify-two-gauges-core.js` (own oracle — solves each equation with its own algebra):** (0) the at-rest needle positions never equal the round's answer on any round (the result-blank exception), and no miss-2 bubble string contains the answer; (1) `pull` succeeds iff the socket value equals the oracle's unknown, checked for every value 1…top on every round; (2) a needle path ends at its side's value, hits the zero pin below 0 and the stop pin above the top; (3) the miss-2 path matches its blank kind (§7) — for an unknown part its length equals the unknown, for a minuend or result it is the known term's stretch — and it always starts one tick after the known number; (4) answers distinct per level, never 0; |left − right| ≤ 1 per level; the error-distance rule above; (5) every gadget picture exists on disk, none repeats in a pass, blender and mixer never share a pass; (6) a workshop-hidden puzzle has exactly one solution in range.
- **Mutations (one per rule):** the non-socket side rests on its reading in a result round (answer shown at rest); the minuend hint prints {target}; "Always" path drawn on a result round; gauge reads the wrong side; subtraction sweeps forward; no zero pin (negative readings); success when the sum of all four numbers is even-split (ignores the "="); path starts on the known tick (off by one); path drawn before miss 2 when "only as a help"; pad offers 0; an answer duplicated in a level; socket always on the left; needle previews while the pad is open.
- **Pictures verified on contact sheets:** kitchen-tools/toaster, blender, kettle, mixer, microwave; toys/robot, train, helicopter; around-the-house/fan. **BLOCKED → honest fallback:** there is **no mole** in the library (forest-creatures has mouse, hedgehog, gopher, badger — none is a mole). Fixit is never drawn: he is the voice in the bubble (its tail points at the shelf), so the frozen intro's "repair-mole" stays true in words. Dressing another animal up as a mole would be dishonest.
- **Risks:** the big level's 100-tick dial at 132 px (phones): only the ten-ticks are bold, ones are a faint fringe; the gap arc in the big level is read by its ten-ticks, the counting path counts in tens where the unknown is a multiple of 10 and in ones only in round 6 (35 + ▢ = 40).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lever, two racing needles, a gold click and a toaster that comes back to life; overshooting is funny, and the shelf fills.
2. **Would a teacher put it on the board?** Yes — "The left side says 12. What must the right side say?" The gauges make the meaning of "=" visible for every blank position, including the balance form most children get wrong.
3. **Would a parent trust it?** Calm, library gadgets, no score or timer, numbers only on the apparatus, the answer never given away.
4. **The invention:** each side of the equals sign has its own gauge, and the gadget runs only when both needles point to the same number — so finding the missing number means making the two sides read the same.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- **The answer was on the screen at rest in 5 of 27 rounds** (measured, `work-c22/m089.js`): in every result round (6 + 3 = ▢, 9 − 7 = ▢, 8 + 5 = ▢, 16 − 7 = ▢, 40 + 30 = ▢) the "show the non-socket side at rest" rule parked a needle on the answer. Result rounds now keep both needles on 0 until the lever; gate clause (0) and a mutation guard it.
- **The miss-2 bubble printed the answer** in every minuend round ("Count the steps from 8 to 13" for ▢ − 5 = 8). Four kind-specific hints now; none contains the answer.
- **"Counting path: Always" drew a path ENDING on the answer** in result/minuend rounds; it now draws only where the path's length must still be counted.
- **Balance blank was always on the right** (4 of 4); to-20 row 9 is now 10 + ▢ = 9 + 3, and row 8 became whole-first 18 = 7 + ▢ to keep the 5/4 socket balance (re-measured: 5 left / 4 right in all three levels, answers distinct, unknown-part error ≥ 4 ticks away).
- **Coverage ownership ruled:** #090 Plank Path owns G1-115/215/218; #089 owns G3-350, G2-313, G2-393 (stated in §11 here, in #090 and in row 84).
- **Distinctness checked against the real files**, not names: New 239's "two gauges" (sky + slider thermometer, need not agree) and the premium number-balance (child builds both sides, beam tips) — written into §11.
