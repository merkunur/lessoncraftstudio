# New 271 — The Gram Balance: the beam only rests level when the brass on the right IS the object's grams — and a dial only reads true once you have told it what one mark is worth (3.MD.A.2)

## 0. Identity
- **id** `gram-balance.play.3-md-a-2` · grade 2 (taught in Grade 2 in most of our locales; CCSS 3.MD.A.2) · strand Measurement & Data · key `gram-balance` → `gram-balance-core.js`, `gram-balance-activity.js`, `gram-balance-activity.html`, `gram-balance-activities.json`. Start with `node scripts/new-activity.js --num=271`.
- **Worksheets covered:** G2-261 "Balance Scales in Grams" (read the weights on a scale, write the grams) · G2-262 "Reading Scales: Small Steps" (jugs and scales with fine marks) · G2-252 "Measuring Jugs and Scales" (jug in ml + scale in g, write the amount with its unit). The **jug** is therefore a third mode — the same "what is one mark worth?" skill on a vertical scale in millilitres.
- New instrument; no old activity.

## 1. The pitch
"Put brass weights on the right pan until the beam rests level — the beam can only rest when the weights are exactly the object's grams, so the answer is the weights you can see; and before a dial or a jug can be read, you tell it what one little mark is worth, and it numbers its first gap to show you whether you were right."

## 2. Why a child will want it again
- **Real brass in the hand.** The weight box is a drawn wooden case with felt hollows; each weight is a drawn brass cylinder with a knob, stamped "100 g", "50 g", "20 g", "10 g", "5 g" (and "500 g", "200 g" in the 1000 range), **its size growing with its mass** (5 g 20 × 18 px … 500 g 64 × 58). Lift one and it clinks onto the pan, the beam swings and slowly settles (damped, 900 ms). Children love the *last* weight: the beam drifts, hesitates, and comes to rest dead level with a soft click and a tiny bubble-level glow.
- **The beam feels small differences.** 5 g too much and the beam visibly dips a little (1.5°); 300 g too much and it slams down (14°). The child learns to swap a big weight for smaller ones — real weighing strategy, discovered by hand.
- **The step chip.** On the dial and the jug, numerals are printed only every 100 (jug: every 100 or 200). The child drops a step chip (1 · 10 · 20 · 25 · 50 · 100) on the first gap; the gap numbers its marks in that step — and if the chip is wrong, the last number crashes into the printed numeral ("50" landing where "100" stands) and both flash. It is a satisfying little experiment with an unmistakable result.
- **The end-of-pass show — THE WEIGHED SHELF:** after the last object of the pass, every object of the pass stands on a shelf in order of grams with its gram tag, each at its real-size class (96 / 120 / 144 px at 704 in two shelf rows, 64 / 76 / 92 px at 360 in three — never below the picture floors) — the big pillow standing to the *left* of the small hammer (to 1000), the long banana left of the round apple (to 500). Size and mass disagree in front of the child's eyes.
- **Free play:** after each round the balance stays live: add or take weights and watch the beam; on the dial, drop any chip on any gap.

## 3. The skill and the misconception
- **Skill:** measure mass in grams with a pan balance and standard weights (add the weights); read a dial scale and a measuring jug whose marks stand for 10, 20, 25, 50 or 100, with numerals only every 100 or 200; write the amount with its unit (g, ml).
- **Misconception 1 — bigger looks heavier.** **Pushback:** the beam ignores size; the pillow (big) balances 450 g and the hammer (small) needs 625 g; the banana (long) 120 g against the apple's 150 g. The weighed shelf orders them by grams so the contradiction is visible all at once.
- **Misconception 2 — every small mark counts as 1** (reading 2 marks past 100 as 102 on a 20-step dial). **Pushback:** the step chip "1" on the first gap numbers the marks 1, 2, 3, 4 and then "5" collides with the printed 100 — the dial itself refuses the idea. Only the true step makes the numbering arrive exactly at the printed numeral.
- **Misconception 3 — reading the weights, not adding them** (writing "100, 50, 20" or the number of weights). **Pushback:** the answer box takes one number; miss 1 stacks the running sum above the pan's weights (100 → 150 → 170).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: apparatus left 480 px, bubble under the stage):**
- **Task line** (≤ 24 px) — balance: **"Put weights on the pan until the beam is level. How many grams?"** · dial: **"What is one little mark worth? Then read the scale."** · jug: **"What is one little mark worth? Then read the jug."**
- **Balance mode:** a drawn pan balance — a 16 px brass pillar 220 px tall, a beam 420 px long with a centre pointer over a small arc gauge (the beam's own needle; no numbers), two pans 150 px wide on chains. Left pan: one library object drawn at its **real-size class** (critic addition — so "bigger looks heavier" is something the child SEES contradicted, not something they must imagine): small things (carrot, banana, apple, car, orange, potato, mug, hammer) **96 px**, middle things (ball, robot, train, teapot, cabbage, pot) **120 px**, big things (pillow, pineapple) **144 px** — the pillow fills its pan and still rises above the 96 px hammer's pan. Right pan: the weights stack in a neat pyramid (largest at the bottom), stamps facing out (13 px bold). The weight box under the balance: 480 × 92, five (to 500) or seven (to 1000) felt hollows, each an endless supply (taking one leaves another behind).
- **Dial mode:** a drawn kitchen scale — the object (at its size class, 96 / 120 / 144 px) standing on a top plate over a round dial 300 px across: a 300° arc of marks (2 px, 14 px long), long marks + numerals (20 px) every 100 g, a red needle. Under the dial: the **step chips** (4 round tokens 56 px, white with a 20 px numeral: always "1", the true step and two others) and the answer box (96 × 56, "g" printed after it) + keypad.
- **Jug mode:** a drawn measuring jug 180 × 330 px (glass outline, handle, a blue water body with a 3 px meniscus line), scale on its right edge: marks every step, long marks + numerals every 100 ml (to 500) or 200 ml (to 1000). No library picture (the jug is apparatus; `kitchen-tools/jug` is a pitcher with no scale).
- **The bubble column:** feedback bubble, the running-sum chip, and in dial/jug mode a small "first gap" magnifier (160 × 90) showing the gap from 0 to the first numeral enlarged ×1.6 so the chip's numbering is legible.
- **Answer + keypad:** keys 52 × 52 (0–9, ⌫), Check 120 × 52.
- No words on the apparatus — only stamped numerals, "g"/"ml" unit marks and printed scale numerals.

**At 360 px (stacked):** balance beam 320 px, pans 112 px, object by size class **64 / 76 / 92 px** (≥ 64), weights scaled 0.8 (5 g 16 × 15 px — weights are apparatus, and each is a ≥ 44 px tap target through a padded hit box), weight box 328 × 80 (to 1000: two rows of 4/3); dial 240 px across (marks every 20 g at 500: 25 marks over 300° → 21 px apart at the rim; at 1000 step 20: 50 marks → 10.5 px — legible, and the magnifier carries the first gap); jug 140 × 260 (the to-1000 jug marks every 50 ml: 20 marks → 13 px). Chips 52 px, keys 56 × 46 full width. Budget 360 × 740: header 56, task 52, apparatus 320, chips/box 64, keypad 104, Check 52 → 648. At 320 × 640: apparatus 280 (dial 210 px), keys 46 × 44 → 600.

## 5. The hand
- **Weigh (balance):** drag a weight from the box (or tap it) onto the right pan: it arcs over and clinks (150 ms); the beam re-targets its angle and swings there with a damped spring (settles in 900 ms; the first response starts within 16 ms). Angle = 0 only when pan = object; otherwise sign(d) × (1.5° + 12.5° × min(1, |d| ÷ R)), R = 100 g (to 500) / 200 g (to 1000) — so even 5 g shows. Tap a weight on the pan (or drag it back) to return it. When the beam rests level: a click, a green glow in the arc gauge, the answer box wakes.
- **Step chip (dial / jug):** drag a chip onto the first gap (or tap chip → it flies there). The gap's marks receive numbers in that step from 0, one per 80 ms: right step → the last number lands exactly on the printed numeral, which glows (a soft chime); wrong → the numbering either stops short or overshoots and the last number **collides** with the printed numeral (both shake 300 ms, the numbers fade after 1.5 s). The chip can be changed any time; only a right chip keeps its numbers.
- **Read:** type the reading (dial/jug) or the weights' total (balance), max 4 digits; Check.
- **Keyboard:** Tab across weights (Enter puts one on the pan; Shift+Enter takes the last off), chips (Enter places), keypad digits, Enter = Check.
- **Sound** (bonus): brass clink (pitch lower for heavier weights), the level click, a water slosh when the jug fills at round start.

## 6. The rounds
Each object has ONE mass everywhere (a scale and a balance never disagree). Masses are plausible and hand-checked (native/pedagogy review re-checks them).
- **Balance · to 500 g** (weights 100, 50, 20, 10, 5 — 9 objects; critic: the old 8 were all multiples of 10, so the 5 g weight was never needed): carrot **85** (50+20+10+5) · banana 120 (100+20) · apple 150 (100+50) · car **175** (100+50+20+5) · orange 210 (100+100+10) · potato 240 (100+100+20+20) · mug 330 (100×3+20+10) · ball 440 (100×4+20+20) · pillow 450 (100×4+50).
- **Balance · to 1000 g** (weights 500, 200, 100, 50, 20, 10, 5): robot 420 (200+200+20) · pillow 450 (200+200+50) · train 540 (500+20+20) · hammer 625 (500+100+20+5) · teapot 680 (500+100+50+20+10) · cabbage 750 (500+200+50) · pineapple 875 (500+200+100+50+20+5) · pot 960 (500+200+200+50+10). Largest stack 6 weights.
- **Dial · to 500 g** (numerals every 100; reading never in the first gap): banana 120 (step 20) · car 175 (**25** — the car keeps one mass everywhere) · apple 150 (50) · orange 210 (10) · potato 240 (20) · mug 330 (10) · ball 440 (20) · pillow 450 (50).
- **Dial · to 1000 g** (numerals every 100; steps 20/25/50, never 10 — 100 marks would be too dense): robot 420 (20) · pillow 450 (50) · train 540 (20) · hammer 625 (25) · teapot 680 (20) · cabbage 750 (50) · pineapple 875 (25) · pot 960 (20).
- **Jug · to 500 ml** (numerals every 100; steps 20/25/50): 160 (20) · 125 (25) · 150 (50) · 280 (20) · 350 (50) · 375 (25) · 440 (20) · 475 (25).
- **Jug · to 1000 ml** (numerals every 200; steps 50/100): 250 (50) · 300 (100) · 350 (50) · 500 (100) · 650 (50) · 700 (100) · 850 (50) · 950 (50).
- **Measured:** no reading sits on a printed numeral or in the first gap (the chip's numbering never gives the answer away); steps per level: dial 500 = 10 ×2, 20 ×3, 25 ×1, 50 ×2 · dial 1000 = 20 ×4, 25 ×2, 50 ×2 · jug 500 = 20 ×3, 25 ×3, 50 ×2 · jug 1000 = 50 ×5, 100 ×3 — the step changes between consecutive rounds after the reshuffle in ≥ 5 of 7 transitions (the order generator re-draws when it does not). Size-contradiction pairs inside one pass (measured with the real-size classes on screen): banana (longer) 120 < apple 150 (to 500), pillow (bigger) 450 < hammer 625 and < train 540 (to 1000).
- **Step chips per round:** {1, the true step, two of the other steps}, shuffled per round; the gate measures the true chip in each of the 4 slots 20–30 % over 1,000 shuffles and "1" in every round.
- **Answer position:** typed answers have no position; the object always sits on the left pan (the balance is the instrument, not a choice).
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Balance, Check before the beam is level** → the heavy side's pan bobs once; bubble **"The beam is not level yet — the low side is heavier."** (no miss). **Dial/jug, Check with no right chip placed** → the first gap pulses; **"First find what one little mark is worth."** (no miss). **Nothing typed** → **"Type the grams."** / **"Type the millilitres."** (no miss).
- **Miss 1 —** balance: the weights on the pan show their running sum chips above the stack, bottom to top (500 → 600 → 620 → 625); EN **"Add the weights: start with the biggest."** · dial/jug: the marks from the last numeral before the needle light one by one *with* their step numbers up to the needle (e.g. 200 → 220 → 240); EN **"Count on from {numeral} in {step}s to the needle."**
- **Miss 2 —** balance: the weights split into groups by kind with a count under each ("2 × 200") and the total line; EN **"{list} make {total}."** (list built from the pan, e.g. "500, 100, 20 and 5") · dial/jug: the needle's mark gets its number in the magnifier; EN **"Each little mark is {step} {unit}."**
- A new weight, chip or key takes the help away until the next Check.
- **Success:** balance — the beam glows level and the answer stamps onto a brass tag hung on the object's pan ("625 g"); dial — the tag locks onto the needle; jug — the reading rings round the meniscus. EN balance **"The {object} weighs {g} g!"** (object = vocab label, author the frame per locale) · dial **"The scale says {g} g!"** · jug **"There are {ml} ml in the jug!"** After round 8: the weighed shelf (§2) with **"Big is not always heavy!"**

## 8. Settings
1. **Mode:** balance (default) / dial scale / measuring jug — changes the whole apparatus at rest.
2. **Range:** to 500 (default) / to 1000 — changes the weight box (5 vs 7 weights), the dial's numerals and the jug's scale at rest.

## 9. Words (EN source)
- title **"The Gram Balance"**
- instructions (three, §4)
- hints **"The beam is not level yet — the low side is heavier."** · **"First find what one little mark is worth."** · **"Type the grams."** · **"Type the millilitres."** · **"Add the weights: start with the biggest."** · **"Count on from {numeral} in {step}s to the needle."** (jug: "…to the water.") · **"{list} make {total}."** · **"Each little mark is {step} {unit}."**
- celebrations **"The {object} weighs {g} g!"** · **"The scale says {g} g!"** · **"There are {ml} ml in the jug!"** · **"Big is not always heavy!"**
- settings **"Mode"**: "balance" / "dial scale" / "measuring jug" · **"Range"**: "to 500" / "to 1000"
- **Locale traps:** (a) **"weighs"**: the frame carries the object noun, so it is authored whole per locale with the vocab label and its gender/article (de *Die Ananas wiegt 875 g!*, fr *L'ananas pèse 875 g !* — French space before !, it *L'ananas pesa…*, fi *Ananas painaa 875 g!*). Use the singular label; avoid articles where the locale allows (sv/da/no definite forms: *Ananasen väger…* — authored per noun). (b) **unit symbols** g / ml are universal; the space before them is a no-break space; fr/sv/fi write "875 g" with a narrow space — the build uses U+202F where the native reviewer asks. (c) **thousands:** no reading reaches 1000 (max 960 g / 950 ml), so no thousands separator ever appears. (d) **"mark"** — the word for a scale line: de *Strich*, fr *trait / graduation*, es *rayita*, it *tacchetta*, pt *risquinho / tracinho*, nl *streepje*, sv *streck*, da *streg*, no *strek*, fi *viiva*. (e) **"millilitre"** spelling (es *mililitros*, fi *millilitraa* — partitive after a number; the celebration uses "ml" to avoid it). (f) Object nouns: `kitchen-tools/pot` is fr *Casserole* (saucepan) — fine; `kitchen-tools/kettle` is NOT used (es *Tetera* = also the teapot).

## 10. Sound off, access, phones
- Sound off: the beam's tilt, the level glow, the colliding numbers, running sums, the lit marks — all visible.
- Keyboard path §5; aria: beam `aria-label="beam: right pan {lighter|heavier|level}"` (never a number); dial `"scale with numbers every 100 grams, the needle between {a} and {b}"`.
- Taps: weights ≥ 44 px hit boxes, chips 52–56 px, keys ≥ 46 × 44. Pictures: object 96 / 120 / 144 px at 704 and 64 / 76 / 92 px at 360 by real-size class — never below the floors; the weighed-shelf show uses 96 / 64 px.
- Check above the folds (§4 budgets).

## 11. Distinct from
- **measurement-bench (tool):** weighs animals on a tilting balance in CUBES (non-standard units) to compare and estimate; its capacity bench pours cups between beakers — no gram weights, no dial, no "what is one mark worth" step chip. **Row 88 The Equal-Sign Beam (designed):** a beam that reads = / < / > between two number amounts — no units. **number-balance (tool):** the equals sign as balance of numbers. **New 209 The Bet Pan:** which of two objects is heavier, a bet on a pan — comparison, no units. Here the beam measures grams with standard weights, and dials/jugs are read through the step chip.
- **Batch siblings:** 269 (every tick is 1, count from a landmark) vs here (find what a mark is worth); 270 (money as length).

## 12. Build plan
- **Core state:** `{ mode, range, object:{key, g}, pan:[w], chip:null|step, chipOK, typed, reading:{v, step, numeralEvery} }`.
- **Functions:** `addWeight(w)`, `removeWeight(i)`, `panTotal()`, `beamAngle()` (formula §5), `isLevel()`, `placeChip(s)` → `{numbers:[...], ok}` where numbers = s, 2s … up to the first numeral (ok iff the last equals it), `check()`.
- **Gate's own truth (`verify-gram-balance-core.js`):** greedy decomposition exists for every balance mass with the level's weights and ≤ 6 pieces; `beamAngle` = 0 iff equal and |angle| ≥ 1.5° for |d| = 5; every reading is a multiple of its step, not a printed numeral, not inside the first gap; dial 1000 never uses step 10; jug 1000 numerals every 200; each object has one mass across modes; chip sets contain 1 and the true step; true-chip slot 20–30 % over 1,000 shuffles; step changes between consecutive rounds in ≥ 5 of 7 transitions; the weighed shelf sorts by grams and pillow sits left of hammer.
- **Mutations (each killed):** every balance mass a multiple of 10 (the 5 g weight never needed) · objects drawn at one size (size class ignored) · beam level within ±10 g · angle proportional to the count of weights · a reading on a printed numeral · a reading inside the first gap · chip "1" missing · wrong chip keeps its numbers · numbering starts at the first mark as 1 instead of the step · running sum built from the top weight down · two masses for the pillow · the shelf sorted by picture size · kettle used in es · same order twice.
- **Pictures verified on contact sheets:** `vegetables/carrot`, `fruits/banana`, `fruits/apple`, `fruits/orange`, `vegetables/potato`, `kitchen-tools/mug`, `toys/ball`, `toys/car`, `around-the-house/pillow`, `toys/robot`, `toys/train`, `tools/hammer`, `kitchen-tools/teapot`, `vegetables/cabbage`, `fruits/pineapple`, `kitchen-tools/pot`. Not used: `fruits/watermelon` (a slice, and a whole one is kilos), `toys/balloon` (drawn with a string like a helium balloon — it would float), `vegetables/pumpkin` (kilos), `kitchen-tools/kitchen_scale` (in the cache but unlabelled — and the scale here is apparatus anyway).
- **Risks:** mass plausibility (reviewer); dial legibility at 320 (magnifier). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — clinking brass that the beam answers at once, the hushed moment it settles level, and a step chip that either lands perfectly or crashes into the printed number.
2. **Teacher on the board?** Yes — standard weights, real gram readings, and the classic "each mark is 1" error refuted by the dial itself.
3. **Parent trust?** Plausible masses of everyday things, real units, calm motion, no timer.
4. **Invention:** the beam only rests level when the brass IS the grams, and a scale only reads true once you tell it — with a chip it tests on its first gap — what one mark is worth.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- **The 5 g weight now matters.** Measured: all 8 old "to 500" balance masses were multiples of 10, so the 5 g brass weight in the box was never needed. Added carrot 85 (50+20+10+5) and car 175 (100+50+20+5; the car keeps 175 on the dial too, read with a new step-25 dial round), 9 balance objects; every decomposition re-checked (≤ 6 pieces), every dial/jug reading re-checked (multiple of its step, never on a numeral, never in the first gap).
- **"Bigger looks heavier" made visible.** Every object rendered at the same 112 px meant the size contradiction lived only in the child's head. Objects are now drawn at a real-size class (96 / 120 / 144 px at 704; 64 / 76 / 92 px at 360), so the 144 px pillow visibly fills its pan and still rises against the 96 px hammer's 625 g; the weighed shelf keeps the classes.
- Distinctness spelled out: measurement-bench weighs in cubes (non-standard) and has no step chip; Row 88's beam compares numbers, not grams.
- Picture check: `vegetables/cabbage` is drawn CUT IN HALF (a cross-section) — 750 g is right for a half cabbage; the mass table and the aria say "cabbage" (the native reviewer may prefer "half a cabbage" per locale). Ruling appended to PICTURE-RULINGS.md.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
