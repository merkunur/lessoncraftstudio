# Row 154 — Gauge's Good Guess → THE GROWING PICTURE: tap an estimate and the thing grows to that size beside a ruler or a metre stick (2.MD.A.3)

## 0. Identity
- id `gauge-good-guess.estimate.2-md-a-3` (KEPT; slugs/titles/intros frozen en de fr es pt it nl; sv/da/no/fi need new slug, title and intro at build) · grade 2 · CCSS 2.MD.A.3 (estimate lengths in centimetres and metres) · Measurement & Data · own files `growing-picture-core.js`, `growing-picture-activity.js`, `growing-picture-activity.html`, `growing-picture-activities.json` (the row leaves `gauge-good-guess-activities.json`).
- worksheets covered: none mapped (the coverage map lists none for 2.MD.A.3); the round bank is the activity's own.
- old activity: a hand-drawn goat (Gauge) asks "About how long is an ant?" — three estimate cards (same unit), tap one, Check; 8 rounds (ant, door, train, crayon, bus, tall building, spoon, flagpole) with de fr es pt it nl translations; correct-rank balance small 3 / middle 3 / large 2. **Kept**: the question shape ("About how long/tall is …?"), the three-card same-unit estimate format, the rounds ant (1 cm), door (2 m), bus (12 m), spoon (15 cm) with their exact option sets, and the six translations as starting text. **Changed**: the train round becomes a ship (the library train is a single small locomotive — "200 m" would be false for the picture); the crayon becomes a pencil (the library crayon reads as a short crayon, not 9 cm); the tall building becomes a lighthouse and the flagpole is dropped (no library picture of either); the hand-drawn goat becomes the library farm-animals/goat. New: a second level that asks for the UNIT, and the growing-picture check.

## 1. The pitch
"Every estimate is a promise about size — tap one and the picture grows or shrinks to exactly that size next to a 30-cm ruler or a metre stick, so a 12-cm ant towers over half a ruler and a 2-m ship is only two metre sticks long."

## 2. Why a child will want it again
- **The picture changes size under your finger.** Tap "30 cm" on the ant round and the ant balloons into a monster as long as the whole school ruler (*boing*); tap "1 cm" and it shrinks to a speck beside the ruler's first centimetre (*pip*). Children try every card just to see the giant ant and the tiny bus — the comedy IS the reasoning.
- **Gauge the goat** (library goat picture) watches from the corner and leans in on the silly sizes.
- **Earned show:** on success the picture settles at its true size, a stamp "≈ {estimate}" lands on it, and it walks into Gauge's **size album** strip at the top — after a pass the album shows an ant, a key, a spoon, a bed, a bus… ordered from smallest to biggest, a little ladder of real-world sizes.
- No timer, score or streak.

## 3. The skill and the misconception
- Skill (2.MD.A.3): estimate the length or height of familiar things using centimetres and metres — choosing a sensible number AND knowing which unit fits the thing.
- Misconceptions and the push-back:
  1. **The number is all that matters** (a 12-cm ant, a 9-m door). The growing picture makes the estimate a SIZE you can see against a benchmark everybody knows — a 30-cm school ruler for centimetres, a 1-m metre stick for metres (drawn apparatus). An absurd estimate looks absurd.
  2. **cm and m are interchangeable** ("a door is 2"). Level 2 offers the same number with both units: tap "2 cm" and the door shrinks to a stamp-sized door against two centimetres of the ruler; tap "2 m" and it stands as tall as two metre sticks.
  3. **Long things are measured in cm because the unit "sounds small"** — the album ladder, ordered by size, shows the jump from the cm world to the m world (key, spoon, banana … bed, car, bus, ship).
- One right answer per round: options are at least ×2 apart (most ×3 or more) and only one matches the real thing; the benchmark depends only on the unit and on long-vs-tall, never on which option is right (so it cannot leak the answer).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (stacked: size frame left 440 px, cards + question right 220 px):**
- **The size frame** — a cream panel 420 × 300 with a floor line; long things lie along the floor, tall things stand on it. Left of the object: the **benchmark** drawn to the same scale — a cream **30-cm school ruler** (numbers 0, 10, 20, 30) for cm options, or a teal-and-cream striped **1-m metre stick** for m options; horizontal for "how long", upright for "how tall".
- **The object** — the round's library picture. Before any tap it shows at a neutral 150 px ("which size?" — a dashed outline frame around it). When an option is tapped, the frame rescales so the larger of (object at that estimate, benchmark) fills 90 % of the frame's length, and the smaller is drawn in true proportion. If the smaller would render under the picture floor, it is drawn as a **size bar** (a coloured bar of the true length, the data-mark rule) and the picture (≥ 96 px) sits beside the bar as its label; if the benchmark would render under 12 px, it is drawn as a row of tiny sticks with a count tag "×{n}" (e.g. "×200").
- **Gauge** — library farm-animals/goat, 96 × 96, top-right.
- **The question** — Nunito 800 24 px above the cards: "About how long is {an ant}?" / "About how tall is {a door}?"
- **Three estimate cards** (Level 1) — 200 × 64, Nunito 800 26 px ("1 cm", "12 cm", "30 cm"); **two unit cards** (Level 2) — "cm" / "m", 96 × 72, under a sentence with a gap: "{A door} is about 2 ___ tall."
- **Size album** — a strip 640 × 56 across the top (finished objects as 44-px data-mark thumbnails in size order).
- Task line (EN, 22 px): "Picture the real size, then tap the estimate that makes sense."

**At 360 (stacked):** size frame 336 × 220; object neutral 110 px (≥ 64 floor whenever drawn as a picture; bars otherwise, label 64 px); cards in one row of three 104 × 56 (font 20 px) or two unit cards 120 × 64; question 20 px; Gauge 64 × 64 beside the question. Stage ≈ 44 + 40 (question) + 220 + 12 + 56 = 372 px → Check above 360 × 740 and 320 × 640 (at 320: frame 300 × 200, cards 96 × 56).

No words on the apparatus (the ruler's 0/10/20/30 and the cards' numbers and units ARE the content).

## 5. The hand
- **Tap a card** → it rings (coral 3 px) and the picture grows/shrinks to that estimate (scale tween 420 ms, ease-out-back; sound pitch follows size: big = low *boing*, small = high *pip*). Tapping another card re-sizes from the current size. Nothing is graded until Check.
- **Tap the picture** → (TTS locales) says the noun; otherwise a gentle bounce.
- **Check** → the chosen card is judged (§7).
- **Free play:** after success, every card can be tapped again to replay the silly sizes; the album thumbnails can be dragged back into the frame to compare two things at their true sizes side by side (e.g. the bus beside the whale).
- **Keyboard:** 1/2/3 (or ←/→) choose a card, Enter = Check.

## 6. The rounds
**Level 1 — Pick the estimate** (13 rounds; one unit per round, three options). Rank of the right answer among the three values: smallest 4 · middle 5 · largest 4.
| # | thing (library) | asked | options | right | rank | benchmark |
|---|---|---|---|---|---|---|
| 1 | insects-and-bugs/ant | long | 1 cm · 12 cm · 30 cm | 1 cm | S | ruler (long) |
| 2 | kitchen-tools/spoon (a plastic eating spoon) | long | 15 cm · 60 cm · 150 cm | 15 cm | S | ruler |
| 3 | insects-and-bugs/snail | long | 3 cm · 30 cm · 90 cm | 3 cm | S | ruler |
| 4 | furniture/bed | long | 2 m · 6 m · 20 m | 2 m | S | metre stick (long) |
| 5 | around-the-house/door | tall | 1 m · 2 m · 9 m | 2 m | M | metre stick (upright) |
| 6 | classroom/pencil | long | 2 cm · 17 cm · 90 cm | 17 cm | M | ruler |
| 7 | vehicles/bus | long | 2 m · 12 m · 90 m | 12 m | M | metre stick |
| 8 | beach/lighthouse | tall | 3 m · 30 m · 300 m | 30 m | M | metre stick (upright) |
| 9 | miscellaneous/house (about 1½ storeys) | tall | 1 m · 8 m · 80 m | 8 m | M | metre stick (upright) |
| 10 | vehicles/airplane (a passenger jet) | long | 1 m · 4 m · 40 m | 40 m | L | metre stick |
| 11 | vehicles/ship | long | 2 m · 6 m · 100 m | 100 m | L | metre stick |
| 12 | ocean-life/whale | long | 1 m · 3 m · 15 m | 15 m | L | metre stick |
| 13 | fruits/banana | long | 2 cm · 6 cm · 20 cm | 20 cm | L | ruler |
Rounds 1, 2, 5, 7 are the old ones with their exact option sets. Option ratios (critic-measured, `work-c29/est154.js`): every neighbour pair ≥ ×2 (door 1→2 m is the only ×2, kept from the old content; all others ≥ ×2.5). Units: cm 5 rounds, m 8 rounds; long 10, tall 3. Rank of the right value: S 4 · M 5 · L 4.
**Critic's honest-size rulings (one right answer means: only ONE option is believable for the thing in the picture):**
- **Whale → 15 m.** ocean-life/whale is a generic grey whale (white belly, one fin) — the size a child should carry for "a whale" is a humpback / grey / sperm whale, 13–16 m; 25 m is a blue whale only, and the old distractor 8 m is itself a real whale size (minke). Options 1 m · 3 m · 15 m: no whale is 1 m or 3 m long, so exactly one option is a whale.
- **Ship → 100 m.** vehicles/ship is a mid-size ship (cabin, portholes, funnel); real ships run 40–300 m, so the designer's 3 / 40 / 200 m offered TWO believable lengths. Options 2 m · 6 m · 100 m: 2 m and 6 m are car-sized, absurd for any ship.
- **House → 8 m.** miscellaneous/house is a 1½-storey house (ground-floor windows, one attic window, chimney) — about 7–9 m to the ridge; the designer's 1 / 3 / 10 m offered no good answer (3 m is a wall, 10 m a three-storey house). Options 1 m · 8 m · 80 m.
- **Airplane → 40 m, now rank L** (options 1 m · 4 m · 40 m — 4 m is a car; the jet with its many windows is a 35–40 m airliner).
- **Spoon** is kitchen-tools/spoon (an eating spoon, ~15 cm); around-the-house/spoon reads as a ~30-cm wooden cooking spoon, which would make 15 and 60 equally wrong.
Shortcut bots on Level 1 (measured): biggest value 4/13, smallest 4/13, middle value 5/13; longest card text 4/13, shortest 2/13, middle-length 1/13 — none beats chance by more than one round.

**Level 2 — Pick the unit** (10 rounds; the number is given, the child chooses cm or m; right answer cm 5 / m 5):
| # | sentence (EN) | right | (the other card makes it…) |
|---|---|---|---|
| 1 | A bee is about 2 ___ long. (insects-and-bugs/bee) | cm | a 2-m bee, as long as a bed |
| 2 | A door is about 2 ___ tall. | m | a door the size of a stamp |
| 3 | A car is about 4 ___ long. (vehicles/car) | m | a car shorter than a banana |
| 4 | A key is about 6 ___ long. (around-the-house/key) | cm | a 6-m key, longer than a car |
| 5 | A bus is about 12 ___ long. | m | a bus shorter than a pencil |
| 6 | A spoon is about 15 ___ long. (kitchen-tools/spoon) | cm | a spoon longer than a bus |
| 7 | A whale is about 15 ___ long. | m | a whale the size of a spoon |
| 8 | A banana is about 20 ___ long. | cm | a banana as long as two buses |
| 9 | A book is about 25 ___ long. (classroom/book) | cm | a book longer than two buses |
| 10 | A lighthouse is about 30 ___ tall. (beach/lighthouse) | m | a lighthouse as tall as a ruler |
Critic change: the designer's Level 2 let the NUMBER give the unit away — a "small number → m, big number → cm" bot won 7/10 (2 m, 4 m, 2 m vs 17 cm, 15 cm, 20 cm). The new set pairs the same numbers with both units (2 cm bee / 2 m door; 15 cm spoon / 15 m whale) and interleaves the rest (cm 2, 6, 15, 20, 25 · m 2, 4, 12, 15, 30): the best number-threshold bot now wins **6/10** (measured over every threshold and direction). cm 5 / m 5.
(In Level 2 the frame shows BOTH benchmarks side by side — the ruler and the metre stick — so tapping either unit card grows the picture against its own stick.)

**Answer position:** Level 1 cards are shuffled per round (the right card's slot is measured ≈ ⅓ each over 30 passes, bounded 20–47 %); the right VALUE's rank is balanced 4/5/4 (above); card text length follows the number of digits (so it carries no more than the value rank, which is balanced): measured on the EN strings, the right card is the uniquely shortest in 2 rounds, uniquely longest in 4, strictly middle in 2 and tied in 5 — so "always pick the longest/shortest card" wins at most 4 of 13 (chance is 4.3); the gate re-measures every locale and fails if any single length strategy wins more than 5 of 13. Level 2: the cm card is left in 50 % of rounds per pass. Order: order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with no card tapped** → hint, no miss: "Tap an estimate to see that size."
- **Miss 1** — the picture stays at the child's estimate and a faint dashed **true-size ghost** appears next to it at the real size against the same benchmark (but with no number on it): the child sees how far off they were, in size, not in digits. Hint: "Look at the ruler (or metre stick). Could a real {thing} be that big?" / "…that small?"
- **Miss 2** — the ghost fills in and the album opens briefly with one known thing nearest in size highlighted (e.g. for the bus: "the bed" thumbnail grows beside it). Hint: "A {thing} is about as long as {six beds}." (authored per round as a benchmark comparison, never stating the answer number).
- **A new tap** removes the ghost and hints until the next Check.
- **Success** — the picture settles at the true size, a stamp "≈ {estimate}" lands on it, Gauge nods; the thing walks into the album. Bubble: "Yes — a {thing} is about {estimate} {long/tall}." (Level 2: "{number} {unit}: centimetres for small things, metres for big ones.")

## 8. Settings (each visibly changes the board at rest)
1. **Level:** Pick the estimate · Pick the unit — three number cards / a sentence with a gap and two unit cards (and two benchmarks in the frame).
2. **Size check:** Grow the picture when I tap · Only after Check — in the second, the frame shows only the benchmark and the neutral picture at rest, and tapping a card just rings it (the growing happens on Check — a harder, pure-estimate mode).

## 9. Words (EN source; de fr es pt it nl start from the old round translations; sv da no fi new; one native + pedagogy reviewer). Title and intro FROZEN where they exist.
- instruction: "Picture the real size, then tap the estimate that makes sense. The picture will grow to your estimate next to the ruler."
- prompt: "Picture the real size, then tap the estimate that makes sense." · questions per round (authored whole): "About how long is an ant?" … "About how tall is a door?" · Level 2 sentences as in §6.
- hints: "Tap an estimate to see that size." · "Look at the ruler. Could a real {thing} be that big?" · "…that small?" · per-round comparison hints, e.g. "A bus is about as long as six beds." · "A spoon is about half a school ruler." · "A lighthouse is as tall as about four houses." (30 m ÷ the 8-m house; every comparison hint is checked against the round table: bus 12 m ≈ six 2-m beds, ship 100 m ≈ eight buses, whale 15 m ≈ a bus and a car)
- celebration: "Yes — a {thing} is about {estimate} long." / "…tall." · "{number} {unit}: centimetres for small things, metres for big ones."
- settings: "Level" — "Pick the estimate" / "Pick the unit"; "Size check" — "Grow the picture when I tap" / "Only after Check".
- **Locale traps:** every question and hint is authored WHOLE per locale with the noun's article and case (de "Wie lang ist ungefähr eine Ameise?" — fem. *eine*, neut. *ein Bett*; fr "une fourmi / un lit"; fi partitive/genitive "Kuinka pitkä on muurahainen?"; sv/da/no definite vs indefinite) — the old roundsL10n are the starting point for 6 locales. **Decimal comma**: no decimals anywhere (all whole numbers). **Units**: "cm" and "m" are the same symbols in all 11; there are no inches/feet (the CCSS also names inches/feet — out of scope for an 11-locale metric product; recorded). Number formatting: no thousands (max 400). The sv label for pencil is "Penna" (fine as pencil); "a passenger jet" is shown as the airliner picture — the word is the library label (de Flugzeug, fr Avion…). A "whale" is generic in every locale — the critic's ruling is 15 m (the honest typical size for the generic word and for the grey whale drawn; §6), so no reviewer call is pending. "A book" is a school reading book (about 25 cm tall/long); the bee is a bumblebee-sized 2 cm.

## 10. Sound off, access, phones
- Legible with sound off: the growing picture, the benchmark, the ghost and the album say everything; TTS (5 locales) reads the question.
- Keyboard path §5; aria: cards "estimate {v}"; frame "{thing} shown {v} long next to a {ruler|metre stick}"; after a miss "the real {thing} is shown as a dashed outline".
- Taps: cards 200 × 64 / 104 × 56; unit cards 96 × 72 / 120 × 64. Pictures ≥ 96 at 704, ≥ 64 at 360 whenever drawn as pictures (bars + labels otherwise). Check above the folds.

## 11. Distinct from
- **Row 152 The Glow Ruler / Row 153 The CM Cutter** (this batch): exact reading with a ruler; here nothing is measured — the skill is a sensible estimate, and the ruler/metre stick are benchmarks for imagination.
- **New 209 The Market Scale (bet pan)** and **#16 The Bug Jar** (guess against ten): estimation of weight / quantity; here length with units.
- **Premium "estimation-jar"** (whole-class quantity guesses on a number line) and **"unit-handle"** (one object, changing unit): neither grows a picture to the guessed size.

## 12. Build plan
- **Core state:** `{ round, level, chosen:null|i, sizeCheck }`. Functions: `scaleFor(estimate, unit, orientation)` → `{objPx, benchPx, objAsBar, benchAsCount, count}`; `evaluate(round, chosen)`; `ghost(round)` → true-size render spec.
- **Verify gate (own oracle):** every round has exactly one option equal to its `answer`; options strictly increasing values with neighbour ratio ≥ 2; rank balance 4/5/4 (Level 1) and cm/m 5/5 (Level 2); the benchmark chosen from (unit, orientation) only — asserted by rendering each option of a round and checking the benchmark never depends on which option is right; card slot balance 20–47 % per slot over 30 passes; no single card-length strategy (shortest / longest / middle) wins more than 5 of the 13 Level-1 rounds in any locale; every picture exists in `mini tools/pictures/<theme>.json`; a rendered picture never goes below 96/64 px (else it must be a bar with a label).
- **Mutations:** benchmark keyed to the right answer · ghost shows the number · options not shuffled · two options equal to the answer · scale not proportional (fixed size) · Level-2 cm card always left · rounds sorted · a picture drawn below floor instead of a bar.
- **Pictures verified on contact sheets (critic):** ocean-life/whale (generic grey whale → 15 m), vehicles/ship (mid-size ship → 100 m, never two believable options), vehicles/airplane (airliner with many windows), miscellaneous/house (1½ storeys → 8 m), beach/lighthouse (slim striped tower), kitchen-tools/spoon (replaces the wooden around-the-house/spoon). Still to view at build: insects-and-bugs/ant, insects-and-bugs/snail (seen), insects-and-bugs/bee, classroom/book (seen: a lying red book), furniture/bed, around-the-house/door, classroom/pencil (seen, diagonal — rotate to lie flat for "long"), vehicles/bus, vehicles/airplane, vehicles/ship (seen), beach/lighthouse, ocean-life/whale, fruits/banana, miscellaneous/house, vehicles/car (seen), around-the-house/key, farm-animals/goat (Gauge). Long objects drawn diagonally (pencil, spoon, banana) are rotated to lie flat in the frame (per-noun angle table, as in #152).
- **Risks:** none open on sizes (whale ruled 15 m). Inches/feet not taught (metric product). Every round carries an authored "believable range" for its thing and the gate asserts exactly one option inside it. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — giant ants and pocket-sized buses are funny, and the album ladder of real sizes is satisfying to fill.
2. **On the board?** Yes — "would a 12-cm ant make sense? Look at the ruler!" is the benchmark reasoning teachers want, and the unit level makes cm vs m visible.
3. **Parent trust?** Library pictures, real sizes, no score, calm.
4. **The invention:** tap an estimate and the picture grows to exactly that size beside a 30-cm ruler or a metre stick — a wrong estimate looks wrong.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- One right answer is now true for every round: whale ruled **15 m** (the generic grey whale drawn; 25 m is a blue whale only and the old 8 m distractor is a real minke size), ship 2 · 6 · **100 m** (the drawn ship is mid-size — 40 m and 200 m were both believable), house **8 m** (a 1½-storey house; 3 / 10 m offered no good answer), airplane re-optioned 1 · 4 · 40 m; spoon re-pinned to kitchen-tools/spoon (the around-the-house spoon is a 30-cm wooden spoon).
- Rank balance kept at S4 · M5 · L4 and all bots measured (value rank ≤ 5/13, card length ≤ 4/13).
- Level 2 rebuilt: the old set let the number pick the unit (threshold bot 7/10); paired numbers (2 cm bee / 2 m door, 15 cm spoon / 15 m whale) bring the best bot to 6/10, cm 5 / m 5.
- Each round now carries a believable-size range, gated (exactly one option inside it) — and #152 in this batch now measures objects at real lengths too, so the two activities teach one size sense.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
