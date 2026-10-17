# New 249 — The Fair Tug (was "The Mirror Tray") → A TUG-OF-WAR ONLY HOLDS STILL WHEN THE TEAMS ARE EQUAL (1.OA.C.6)

## 0. Identity
- id `mirror-tray.play.1-oa-c-6` · grade 1 · CCSS 1.OA.C.6 (add and subtract within 20; the doubles and halves strategy) · Operations & Algebraic Thinking · files keep the planned key `mirror-tray` (`mirror-tray-core.js`, `mirror-tray-activity.js`, `mirror-tray-activity.html`, `mirror-tray-activities.json`) so `node scripts/new-activity.js --num=249` and NEW-ORDER.md need no change; the on-screen title is **The Fair Tug**. New metadata in all 11 locales at build.
- worksheets covered: **G1-247** Doubles and Halves · **G1-270** Doubles and Halves: First Steps · **G1-271** Doubles and Halves to 20 (numbers only) · **G1-286** Doubles and Halves with Pictures to 20 · **G1-287** Doubles to 14 · **G1-288** Halves to 12 · **G1-296** Doubles to 20 with Pictures · **G1-297** Halves to 20 with Pictures · **G1-298** Doubles to 20: Just the Numbers · **G1-299** Halves to 20: Just the Numbers.
- why the mirror was replaced: the coverage review's hinged mirror tray is, in interaction, the premium tool **doubling-mirror** ("close the tray … nine leaves one with no partner"), and its halving step (drag a hinge and fold the row over) is the **folding-sheet** tool and **#228 Fold Mirror**. Pairing-off mechanics are taken too (#17 Partner Bows, the Story Zipper of row 68). The Fair Tug gives doubles and halves a new home: **a double is a tie**.

## 1. The pitch
"A tug-of-war rope only holds still when both teams have the same number of hands on it — a double is a tie, a half is one team of a tie, and an odd number always leaves one in the middle to be the referee."

## 2. Why a child will want it again (the fun)
- **Tug-of-war!** Two library animal captains face each other at the ends of a thick rope (a pig and a goat, a cow and a horse …). Every hand-grip the child adds to a team's side of the rope makes that team stronger.
- **"Pull!"** The child pulls the big lever: both captains lean back, the rope stretches and creaks — and if one team has more hands, the rope slides toward it, the flag on the middle of the rope slipping across the ticks, and the other captain stumbles a comic step forward. Children love making it slide.
- **The tie.** When the teams are equal the rope quivers in place, neither side moves, both captains strain … and then "ding-ding — a tie!" Both captains bounce and the rope glows. Hunting for the tie is the game.
- **The referee.** With an odd number of hands one is always left over. Tap it and it hops to the middle of the rope and becomes the referee's knot on the flag — nobody is left out, it just can't join a team fairly.
- **Free play ("Tug field"):** add and remove hands freely, pull as often as you like, swap captains.

## 3. The skill and the misconception
- **Skill (1.OA.C.6 doubles/halves, as the worksheets mean it):** the double of n is n + n (to 20); half of an even number is the size of each of two equal parts; an odd number cannot be split into two equal whole parts (one is left over). With pictures and "just the numbers".
- **Misconception 1 — double means one more** (double 6 → 7) **or something huge** (12 + 12). **Push back:** the double is built as two equal teams — 6 hands and 6 hands; with 7 on the second team the rope slides one tick; the tie only comes at 6 and 6, and the total is all the hands on the rope.
- **Misconception 2 — halving means "take some away"** (half of 12 → "I took 4, 8 left"). **Push back:** every hand from the coil must join a team (the coil must be empty before the rope can tie), and the rope slides toward the bigger team until the two are equal: 8 and 4 slides 4 ticks — visibly unfair.
- **Misconception 3 — every number can be halved.** **Push back:** an odd coil always ends with teams tied and one hand with nowhere fair to go — it becomes the referee.
- **Misconception 4 — not seeing how far from fair** (moves hands one at a time at random). **Push back:** the flag's slide equals the DIFFERENCE between the teams (one tick per extra hand) — the tick scale makes "4 apart, so move 2 across" discoverable.

## 4. The stage
Layout `split` at ≥ 700 px (field left, answer column right); stacked below.

**At 704 px** (stage 452 + column 220):
- **Task line** (22 px): the prompt (§9).
- **The card** (DOUBLE rounds; drawn cream tag 96 × 64, numeral 40 px) at the top centre — how many hands on one team.
- **The field** (drawn: a grass strip 452 × 260 with a white centre line).
- **The rope** (drawn: a thick braided band 440 × 18, warm hemp colour, 3 px ink edges) across the field at mid-height; on its centre a **flag** (a small red ribbon on the rope) and under the rope a **tick scale** of 10 ticks either side of the centre line (no numerals at rest).
- **The captains** (library pictures, 96 px) at the two rope ends. Pairs per round, all seen on the farm-animals sheet, **eighteen different animals so no captain returns in a pass**: pig/goat, cow/horse, sheep/donkey, duckling/rabbit (farm-animals/rabbit), dog/cat, goose/llama, turkey/rooster, ox/hen, bee/owl. (Critic, from the contact sheet: the first draft's calf/foal pair re-used the cow and horse drawings at the same size, and lamb + sheep, pig ×2, goat ×2 and cow ×2 repeated captains — a pass looked like the same four animals. Never chick with duckling, never hen with chicken.) **Facing:** a side-view captain that faces away from the rope is mirrored (CSS scaleX(−1); no farm picture carries text) so both look at the middle; front-facing captains (pig, sheep, donkey, owl, bee; the cow faces left and is mirrored like the other side-views) are left as drawn — they lean back without turning.
- **Hand-grips:** each team member is a drawn grip (a rounded knot 26 px, 3 px ink outline) hanging under the rope on its team's side, arranged as a **ten-frame bunch** — two rows of five from the captain inward (coral grips on the left team, teal on the right). Up to 10 per team.
- **The coil** (HALVE rounds; a drawn rope coil 100 px at the bottom centre) holding T loose grips heaped, or a closed coil with a numeral in "numbers only" rounds.
- **Tap zones:** left half of the field = the left team, right half = the right team (each ≥ 220 × 200 px).
- **The pull lever** (drawn: a coral knob 56 px on a short post) at the bottom right of the field.
- **Right column (220 px):** the **answer box** (120 × 64, numeral 36 px; in HALVE rounds a two-grip icon "one coral + one teal" shows it means "each team") → keypad (1–10 or 1–20, keys 40 × 40, five per row) → bubble (≤ 3 lines) → speaker.

**At 360 px** (stacked): task line → card 72 × 48 → field 336 × 230 (rope 330 × 14, grips 22 px in two rows of five per side — 5 × 22 + 4 × 4 = 126 px per side, captains 64 px at the ends, coil 72 px, lever 48 px) → answer box + keypad (keys 44 × 44, five per row) → bubble → Check. The keypad appears only when the rope is tied (it replaces nothing above it). Check ≈ 700 px at 360 × 740 with a 1–20 keypad. **At 320 × 640:** field 300 × 210, grips 20 px, captains 64 px; Check ≈ 630 px.

**Words on the apparatus:** none — the card's numeral, the coil's numeral (numbers only) and the answer.

## 5. The hand
- **Tap a team's zone:** one grip joins that team (DOUBLE: from an endless supply; HALVE: from the coil — a 220 ms hop with a "tup"), taking the next ten-frame place. **Tap a grip:** it hops across to the other team (HALVE) or leaves (DOUBLE). **Long-press a zone:** all its grips go back (to the coil in HALVE).
- **Pull the lever** (drag it down, tap it, or Space): both captains lean back (200 ms) with a creak; then:
  - **unequal:** the rope slides toward the bigger team by one tick per extra grip (80 ms per tick), the flag travels with it, the smaller team's captain lurches a step forward; after 1.2 s everything eases back to the centre. The scale has 10 ticks a side; a difference above 10 (only possible in HALVE up to 10, e.g. a whole coil of 14 dealt to one side) slides the flag to the end stop and the captain is pulled over the centre line — the extra is not drawn as ticks it does not have;
  - **equal:** the rope quivers in place (600 ms, a thrum), then "ding-ding": a tie. Both captains bounce. If a HALVE coil still holds grips, the tie does not count yet (the coil wobbles: everyone must join).
  - Pulling is free and unlimited — it is the instrument, not the check.
- **The referee (odd coil):** when the teams are tied and the coil holds exactly one grip, that grip glows; tap it and it hops to the flag and hangs there as the referee's knot (the rope can now tie for good).
- **Answer:** after a counting tie the answer box opens; keypad → Check.
- **Free play ("Tug field"):** both supplies endless, captains chosen from the list, pull freely.

## 6. The rounds
- **DOUBLE (pictures):** card n. Build the left team to n, then the right team to the same (the child adds both), pull for the tie, type the total 2n.
- **HALVE (pictures):** coil of T. Deal every grip into the two teams until the rope ties (odd: plus the referee), type how many on each team (⌊T/2⌋).
- **Numbers only** (G1-271, G1-298, G1-299): the rope and grips are hidden under a canvas (a plain cover over the field) and the card / coil shows its numeral; the answer box and keypad are open at rest (there is no tie to wait for) and the child types first; the canvas lifts on miss 1 and on success, and then plays the tie (or the deal) that proves the number.

**Setting "Up to 5" (doubles 1–5, halves of 2–10 — G1-247, G1-270, G1-287, G1-288):**
- DOUBLE mode (7): n = 3, 1, 5, 2, 4 (pictures) · n = 4, 2 (numbers only). Answers 6, 2, 10, 4, 8 · 8, 4.
- HALVE mode (7): T = 6, 2, 10, 4, 8 (pictures) · T = 7 (pictures, odd: 3 each + referee) · T = 8 (numbers only). Answers 3, 1, 5, 2, 4, 3, 4.
- MIXED (8): DOUBLE 3 · HALVE 8 · DOUBLE 5 · HALVE 6 · DOUBLE 2 · HALVE 7 (odd) · DOUBLE 4 (numbers only) · HALVE 10 (numbers only).
(Only five doubles exist up to 5; the two repeats are the numbers-only form, which G1-270 pairs with the pictures.)

**Setting "Up to 10" (doubles 1–10, halves of 2–20 — G1-271, G1-286, G1-296, G1-297, G1-298, G1-299):**
- DOUBLE mode (9): n = 6, 3, 9, 7, 4, 10, 8 (pictures) · n = 5, 2 (numbers only). Answers 12, 6, 18, 14, 8, 20, 16 · 10, 4.
- HALVE mode (9): T = 12, 6, 18, 14, 16, 20 (pictures) · T = 13 (pictures, odd: 6 each + referee) · T = 10, 8 (numbers only). Answers 6, 3, 9, 7, 8, 10, 6, 5, 4.
- MIXED (9): DOUBLE 7 · HALVE 16 · DOUBLE 9 · HALVE 12 · DOUBLE 6 · HALVE 15 (odd: 7 + referee) · DOUBLE 8 (numbers only) · HALVE 18 (numbers only) · DOUBLE 10.

Never 0 (n ≥ 1, T ≥ 2). Exactly one odd coil per pass in every setting/mode that has halves.

**Answer position:** answers are typed (no screen position). The coil sits nearer the left team in half the HALVE rounds and nearer the right in the other half; captain pairs alternate which animal is on the left. The gate measures: one odd coil per pass; no n or T repeated in the pictures presentation within a setting/mode; no equal answers in adjacent rounds after the shuffle; coil side 50/50 ± 1.
**Order:** order-only reshuffle per pass (never the same order twice); MIXED keeps DOUBLE/HALVE alternation after the shuffle.

## 7. Check, the misses, the success
- **Check before a counting tie:** no miss. The lever bobs; bubble: DOUBLE **"Give both teams {n} hands, then pull."** · HALVE **"Put every hand on a team, then pull."**
- **Check with the tie made but the answer empty:** no miss; the box pulses; **"How many hands in all?"** / **"How many on each team?"**
- **DOUBLE, left team ≠ n when pulling:** not a miss — the card and the left team both flash: **"The card says {n}."**
- **Miss 1 — DOUBLE wrong total:** the right team's grips fade to outlines for 1.5 s (leaving the n coral grips — "6 and 6 again"), then come back one by one beside their row partners. Bubble: **"{n} and {n} again — count all the hands."** — numbers only: the canvas lifts and shows the two tied teams of n.
- **Miss 1 — HALVE wrong answer:** the left team's grips light one by one (a visible count of ONE team), the right stays dim. Bubble: **"Count one team only."** — numbers only: the canvas lifts, the coil deals itself left, right, left, right (120 ms a hop), and the rope ties.
- **Miss 2:** numerals appear — DOUBLE on every grip, 1, 2, 3 … alternating left team, right team (the total climbs in twos); HALVE on the left team's grips 1, 2, 3 … with each right-team row partner flashing as its partner is numbered. Bubble: **"Follow the numbers."**
- **A new move takes the help away** until the next Check.
- **Success:** the tie glows, both captains bounce, a burst of drawn confetti dots; bubble: DOUBLE **"Double 6 is 12: 6 + 6 = 12."** · HALVE **"Half of 12 is 6: 6 and 6."** · ODD **"13 can't be shared fairly: 6 on each team and 1 referee."** End of pass: **"Every tug was fair!"**

## 8. Settings
1. **Mode:** Double / Halve / Mixed (default Mixed) — at rest the board shows a card (double) or a coil (halve).
2. **Numbers:** Up to 5 / Up to 10 (default Up to 5) — the grip bunches (one row of five or two rows of five per team) and the keypad (1–10 / 1–20) change at rest.

## 9. Words (EN source)
- on-screen title: **The Fair Tug**
- instruction: **A tug-of-war only holds still when both teams have the same number of hands. Double: give both teams the same. Half: put every hand on a team until it's a tie.**
- prompts: DOUBLE **What is double {n}?** · HALVE **What is half of {t}?** (the odd round uses the same string)
- hints: **Give both teams {n} hands, then pull.** · **Put every hand on a team, then pull.** · **How many hands in all?** · **How many on each team?** · **The card says {n}.** · **{n} and {n} again — count all the hands.** · **Count one team only.** · **Follow the numbers.**
- success: **Double {n} is {d}: {n} + {n} = {d}.** · **Half of {t} is {h}: {h} and {h}.** · **{t} can't be shared fairly: {h} on each team and 1 referee.** · **Every tug was fair!**
- free play: **Tug field**
- settings: **Mode** — **Double** / **Halve** / **Mixed** · **Numbers** — **Up to 5** / **Up to 10**

**Locale traps:**
- **"Double" / "half" frames** (each authored whole, never word + numeral): de "das Doppelte von 6" / "die Hälfte von 12", fr "le double de 6" / "la moitié de 12", es "el doble de 6" / "la mitad de 12", pt "o dobro de 6" / "a metade de 12", it "il doppio di 6" / "la metà di 12", nl "het dubbele van 6" / "de helft van 12", sv "dubbelt så mycket som 6" / "hälften av 12", da "det dobbelte af 6" / "halvdelen af 12", no "det dobbelte av 6" / "halvparten av 12", fi "kaksi kertaa 6" or "luvun 6 kaksinkertainen" / "puolet luvusta 12".
- **Tug-of-war** is "Tauziehen" (de), "tir à la corde" (fr), "jalar la cuerda / juego de la soga" (es-MX), "cabo de guerra" (pt-BR), "tiro alla fune" (it), "touwtrekken" (nl), "dragkamp" (sv), "tovtrækning" (da), "tautrekking" (no), "köydenveto" (fi) — a familiar playground game in all 11 markets.
- **"Referee"** (de "Schiedsrichter", fr "l'arbitre", fi "erotuomari") — the success line says the odd one becomes the referee; it is never called "left over" with a sad tone.
- **Hands** (grips) — "Hände" / "mains" / "manos" / "kädet"; fi partitive after numerals ("6 kättä").
- Numbers are numerals; number words for TTS from `scripts/worksheet-gen/lib/number-words.js`.

## 10. Sound off, access, phones
- Legible silent: grips joining, the rope sliding by ticks, the quivering tie, the referee knot, the canvas lifting.
- Keyboard: ← / → add a grip to the left / right team; Shift+← / → move a grip across; Space pulls; digits answer; Enter = Check; R sends the last coil grip to be referee.
- aria: teams "left team, 6 hands" / "right team, 4 hands"; after a pull "rope slides 2 toward the left team" / "a tie, 6 and 6"; coil "coil, 3 hands left".
- Taps: team zones ≥ 150 × 180 px on phones; lever 56/48 px; keys 44 px.
- Reduced motion: the rope jumps to its slid position; captains do not lean.

## 11. Distinct from
- **doubling-mirror (tool), folding-sheet (tool), #228 Fold Mirror:** reflection and folding. The Fair Tug reflects nothing.
- **number-balance (tool) and row 107 Fair Mobile:** a beam or mobile that tips for an equation or for fair fractions. The Tug is a horizontal pull whose slide IS the difference in hands, built team by team, and its whole use is doubles and halves (a double is a tie; an odd number makes a referee).
- **#17 Partner Bows, row 68 Story Zipper, pair-gate (tool):** pairing items off one-to-one. The Tug never pairs individual hands; it compares team sizes by force.
- **#18 Friendship Bridge, lids (tool):** fair sharing of toys / under lids, not doubles.
- **#250 Light Wall, #248 Fact Family Bar** (this batch): sums and families; #249 is the doubles/halves strategy.

## 12. Build plan
- **Core state:** `{ mode, upTo, order[], idx, round: {type:'double'|'halve', n|t, numbersOnly, coilSide, captains:[L,R]}, left:int, right:int, coil:int, referee:bool, lastPull:null|{slide:int, tie:bool}, answer:int|null, misses, help }`.
- **Functions:** `add(side)`, `moveAcross(side)`, `clear(side)`, `pull()` → `{slide: right − left (signed ticks), tie: left === right, counts: coil === 0 || (referee) }`, `makeReferee()` (only when tied, coil === 1, T odd), `setAnswer(v)`, `check()` → `{ok, reason}`, `expected(round)` (2n / ⌊t/2⌋), `nextTask(index)`.
- **Gate `verify-mirror-tray-core.js` (own oracle):** (1) for every (left, right) the pull slides exactly |left − right| ticks toward the bigger team and ties iff equal; (2) a HALVE tie counts only with the coil empty, or with exactly one grip turned referee when T is odd; the referee is impossible for even T or untied teams; (3) DOUBLE accepts only left = right = n before the answer opens; (4) answers 2n / ⌊t/2⌋, accepted iff equal; (5) tables: ranges, no 0, one odd coil per pass, no repeat in the pictures presentation, MIXED alternation after shuffle, coil side 50/50 ± 1; (6) captain pictures exist on disk; no chick with duckling, no hen with chicken in one round.
- **Mutations:** the rope slides by the total instead of the difference; tie declared with grips left in the coil; referee allowed with even T; DOUBLE accepts left = n, right = n + 1; half answer accepted as any team's count after an unequal deal; answer box opens before a counting tie; numbers-only canvas missing at rest; two odd coils in a pass; MIXED alternation lost; card of 0.
- **Pictures verified on the farm-animals sheet:** pig, goat, cow, horse, sheep, donkey, duckling, rabbit, dog, cat, goose, llama, turkey, rooster, ox, hen, bee, owl (eighteen, none repeated in a pass; calf and foal refused as same-size copies of cow and horse; lamb dropped as the sheep's twin). The grips are drawn tokens (ruling: counters in frames are tool-grade, one picture labels the group — here the captain). **Risks:** two rows of ten grips per team in the up-to-10 setting at 320 px (20 px grips) — still ≥ 20 px and never tapped individually except to move across (the zone tap is the main action; a moved grip is chosen by its row end). Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — tug-of-war with farm animals, a lever that makes the rope slide, a tense quivering tie, and a referee for the odd one out.
2. **Would a teacher put it on the board?** Yes — "Why did it slide? How many must cross for a tie?" A double is a tie, a half is one team of a tie, and an odd number visibly cannot tie without a referee — for pictures and just numbers.
3. **Would a parent trust it?** Playful but calm, no score or timer, library animals, numbers only on the apparatus.
4. **The invention:** a tug-of-war rope only holds still when both teams have the same number of hands, and it slides by exactly the difference — so a double is a tie, a half is one team of a tie, and an odd number always leaves a referee in the middle.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 5→5 · reality 4→5
What changed:
- **Captains re-cast from the contact sheet:** calf/foal are the cow/horse drawings at the same size, lamb is the sheep's twin, and pig, goat and cow each appeared twice — the nine pairs are now eighteen different farm animals; facing (mirror side-views, keep front-facing) ruled.
- **Rope scale overflow:** a HALVE deal can differ by more than the 10 ticks a side; the end-stop behaviour is now specified instead of drawing ticks that do not exist.
- **Numbers-only flow:** the keypad was gated on a tie that numbers-only rounds never have; it is now open at rest in those rounds, and the canvas lifts to PROVE the typed number.
- Measured: tables in range, no 0, one odd coil per pass in each halving set (7, 13, 15), keypad answers (no screen position), coil side alternates. The design's own move away from the coverage review's hinged mirror is right — doubling-mirror (premium tool) and folding-sheet already own that interaction (checked in `cov/tools.txt`).
