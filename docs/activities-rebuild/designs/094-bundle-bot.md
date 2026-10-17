# Row 94 — Bundle Bot: THE TEN-POCKET BAND (1.NBT.B.2.a)

## 0. Identity
- id `bundle-bot.bundle-machine.1-nbt-b-2-a` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl, sv; da/no/fi slug, title and intro are new at build) · grade 1 · CCSS 1.NBT.B.2.a (with 2.b teens and 2.c decades) · strand Number & Operations in Base Ten · own files at rebuild: `bundle-bot-core.js` (new; replaces the dependency on the shared `bundle-machine-core.js`), `bundle-bot-activity.js`, `bundle-bot-activity.html`, `bundle-bot-activities.json`.
- frozen page title "Bundle Bot — Make a Ten from Ten Ones"; the frozen intro promises an eager robot who tidies loose ones into neat tens but can't bundle without the child, counting the loose ones, pulling the lever at exactly ten to clunk them into one ten, and building numbers up to forty-nine — all kept (the "to 99" setting is an extension; the default stays to 49).
- worksheets it covers: **G1-120** Tens and Ones · **G1-121** Build It Right · **G1-122** How Many Tens? · **G1-133** Stretch the Number · **G2-206** Make a Ten! (shared with row 93 Bo's Berry Pantry, which takes reading/writing/expanded form; this row takes making and breaking tens).
- old activity: 9 rounds (build 23/34/45/27, unbundle 32 → 2 tens 12 ones, impostor 29 with 9 look-alike ones, decade 40, read-state 24, overfill 36 with clumps of 3); clumps of 1–3 fed into a loose scatter tray, a lever the child pulls (never glows), refusals on sub-ten, canonical form required; robot and cubes as SVG stubs. **Kept:** all nine rounds and their numbers, clumps of 1–3, the scatter (never a ten-frame), the child-only lever, canonical form (number words now from `number-words.js`, §9). **Changed:** the refusal is now physical — the band shows what ten is (§1); the robot is the library `toys/robot`, the cubes are drawn apparatus.

## 1. The pitch
"Pull the lever and Bot wraps a band with exactly ten pockets around the loose ones: ten cubes and it clasps with a CLUNK into one neat ten; nine and one pocket hangs empty so the band springs open; twelve and the band squeezes the extra two back out."

## 2. Why a child will want it again
- **A machine with a lever.** Bot sits on top of a chunky machine: a hopper that coughs out little clumps of cubes, a press plate, and a big red lever the child pulls down. The press drops, a striped band whirs out and the cubes leap into its pockets one after another — a satisfying cascade.
- **CLUNK.** When the band closes it clasps with a heavy CLUNK, Bot's eyes go round, and the new ten rolls off on a little conveyor and drops into the tens rack with a rattle.
- **The spring-open.** When it isn't ten, the band still tries — the cubes leap in, one pocket stays empty, the ends can't meet, and the band springs open with a comic boing, the cubes tumbling back. Children pull the lever with eight on purpose to watch it (and they learn "two short" from the empty pockets).
- **Snip — the band in reverse.** Drag a ten off the rack back under the press: the clasp pops (snip!) and the band's ten pockets empty one at a time onto the plate, tick … tick … ten — the same band that made the ten un-makes it, pocket by pocket. The number on the rack and plate does not change, and Bot counts it to prove it.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (1.NBT.B.2.a–c):** ten ones can be bundled into one ten; a two-digit number is tens and ones; build a number with as many tens as possible (canonical form); unbundle a ten into ten ones without changing the number; read a number given as tens and ones (including non-canonical: 1 ten 15 ones = 25); decades are tens with no ones.
- **Misconceptions and the push-back:**
  - *"About ten" is a ten* (a scatter of 9 that looks full): the band has exactly ten pockets — one stays empty and the band cannot close.
  - *A ten is "all of them"* (pulling with 12 and expecting a bundle of 12): the band clasps on ten and pushes the extras back out; a ten is a size, not a heap.
  - *A bundle is one thing and stops being ten* (counting 3 tens + 4 ones as 7): the snip shows ten cubes inside every bundle, and at Check Bot counts each bundle as 10, 20, 30 …
  - *Unbundling changes the number* (32 → 2 tens 12 ones "is less"): after a snip Bot's count still says 32 — the cubes are only rearranged.
  - *Ten loose ones left lying* (2 tens and 14 ones for 34, non-canonical): the plate's ten-hiding check (§7) lights ten of the loose cubes and Bot taps the lever with his finger.

## 4. The stage
**At 704 (stacked):**
- **Bot's machine** (640 × 380, drawn apparatus — panels, rivets, rounded corners; palette #146B5E / #F2784B / cream; 3 px ink): top-left the **hopper** (a funnel 120 × 110, the tap target, with a small chute); top-centre **Bot** — library `toys/robot` at 120 px in a cab window; centre the **press plate** (a steel plate 380 × 190 px, dotted edge) where loose cubes lie scattered; above the plate the **press head** (a bar 380 × 26) that carries the rolled **ten-pocket band** (a ribbon 360 × 40 px with ten square pockets 34 × 34, stripes #F2784B/cream — only visible when it unrolls); right of the plate the **lever** (a red knob 56 px on a 140 px arm; hit area 88 × 160) and below it the **conveyor** (short belt) to the **tens rack** (right, 160 × 300): slots for 4 tens (9 in the "to 99" setting, two columns), each ten a vertical rod of ten cubes 26 × 260 wrapped by its band with a round **clasp** (34 px, tap target 48).
- **Cubes** (drawn apparatus, never pictures): 30 px teal cubes with a light top face; in a ten they are stacked in a column of ten (the ten visibly made of ten).
- **Plate buttons:** "take one out" (− in a circle, 48 px) at the plate's lower left; nothing else on the plate.
- **The order card** (left under the hopper, 180 × 72): the target numeral, Baloo 2 48 px; in read rounds the card is a blank with a keypad below (keys 48 px) or two slots "_ tens _ ones" (see §6; the words "tens/ones" are the content of the sentence and are authored per locale).
- **Task line** (20 px) above; **bubble** (18 px) under the machine.
- No words on the apparatus.

**At 360 (stacked):** machine 328 × 360: hopper 80 × 72; Bot 72 px; plate 230 × 150 (cubes 22 px, scatter keeps ≥ 2 px gaps); band 220 × 26 (pockets 20 px); lever 48 px knob on a 100 px arm (hit 72 × 120); tens rack 84 wide, rods 16 × 160 (4 slots) or two columns of 16 px rods (9 slots); order card 150 × 56 (numeral 36 px) above the machine. 320: plate 200 × 140, cubes 20 px.

Pictures: `toys/robot` (contact sheet: a friendly yellow-orange robot, upright, clear at 72 px). Everything else is drawn apparatus (machine, cubes, band, rack, lever).

## 5. The hand
- **Tap the hopper:** it shakes (80 ms) and drops the round's next clump (1, 2 or 3 cubes, from the round's clump list in order, cycling) down the chute onto a random free spot on the plate (300 ms tumble). The clump lands as a little cluster (subitizable: 2 side by side, 3 in an L or a row), never in a line with earlier cubes. First response < 40 ms.
- **Take one out:** the − button lifts one cube (the most recently landed) back up into the hopper (200 ms). Repeated taps take more.
- **Pull the lever:** drag the knob down (or tap it): the press head drops (250 ms), the band unrolls over the plate and the cubes leap into its pockets left to right, one every 40 ms (a rising tick per pocket):
  - **exactly 10:** the band clasps — CLUNK (heavy thud, Bot's eyes widen), the ten stands up as a rod, rolls along the conveyor (400 ms) and drops into the next rack slot;
  - **fewer than 10:** the filled pockets wait 600 ms with the empty pockets outlined (in the "just spring open" setting: no outline, 200 ms), the ends cannot meet, the band springs open (boing) and the cubes tumble back to new random spots;
  - **more than 10:** ten pockets fill and clasp; the extra cubes are pushed sideways out of the press (they skid back onto the plate) and the ten leaves as above;
  - **rack full** (4 tens at "to 49"): the lever is stiff — it moves 10 px and bounces; Bot shakes his head.
- **Snip a ten:** drag a ten from the rack onto the press plate (it rides back along the conveyor under the finger) → the press head catches it, the clasp pops, and the band unrolls with the ten cubes in its pockets; the pockets empty one by one left to right (40 ms each, a falling tick per cube) and the empty band rolls back up. A ten dropped anywhere else slides back to its slot. (Tap-access: tap a ten to pick it up, tap the plate to drop it.) This is deliberately NOT a tap-the-column exchange (the exchange-machine tool's move): the ten is carried into the band, which visibly releases exactly ten.
- **Keypad / slots** (read rounds): tap a slot, tap digits.
- **Free play:** at any time the hopper, lever and clasps work — the machine is a toy; after success Bot keeps working and a small live tally under the rack shows "tens · ones" (free play only; never during a task).
- **Keyboard:** H = hopper, L = lever, − = take one out, Tab → tens on the rack (Enter picks up, Enter again on the plate snips) → keypad.

## 6. The rounds
A round = an order (a target number, or a question about the machine), a starting machine state (rack tens + plate loose) and a clump list for the hopper.

**Numbers "to 49" (default, 11 rounds):**
| # | type | start (rack · plate) | clumps | task | right end state / answer |
|---|---|---|---|---|---|
| 1 | build | 0 · 0 | 1, 2, 3 | Make 23 | 2 tens · 3 loose |
| 2 | build | 0 · 0 | 1, 2, 3 | Make 34 | 3 · 4 |
| 3 | unbundle | 3 · 2 | — | Bot needs 12 loose ones. Keep the number 32. | 2 · 12 (non-canonical by request) |
| 4 | impostor | 1 · 9 (the nine laid out in a near-ten scatter) | 1, 2, 3 | Make 29 | 2 · 9 (needs one more cube, a bundle, then nine more) |
| 5 | decade | 0 · 0 | 1, 2, 3 | Make 40 | 4 · 0 |
| 6 | read | 2 · 4 | — | How many cubes? (keypad) | 24 |
| 7 | overfill | 0 · 0 | 3 only | Make 36 | 3 · 6 (four clumps of 3 = 12 on the plate: the band squeezes two back out) |
| 8 | build | 0 · 0 | 1, 2, 3 | Make 45 | 4 · 5 |
| 9 | build | 0 · 0 | 1, 2, 3 | Make 27 | 2 · 7 |
| 10 | how many tens | 0 · 37 (all on the plate, scattered) | — | Bundle every ten you can. Then fill in: _ tens _ ones | 3 tens 7 ones (plate 7) |
| 11 | read | 1 · 15 | — | How many cubes? (keypad) | 25 |

**Numbers "to 99" (10 rounds):** build 58 · build 63 · decade 70 · unbundle (5 · 1) → "Bot needs 11 loose ones. Keep 51." → 4 · 11 · impostor (6 · 9 near-ten) → make 79 · read (7 · 5) → 75 · overfill (clumps of 3) make 47 · how many tens (0 · 46 on the plate) → 4 tens 6 ones · read (5 · 14) → 64 · build 81.

**Answer position / guessability:** targets never have equal digits; build targets' ones digit is never 0 except decades and never 9 except the impostor round (whose 9 is the trap); clump order is fixed per round but the landing spots are random, and the starting scatter of the impostor round is the one that looks most like ten (two rows of five with one missing in the middle — never a ten-frame). Read-round answers alternate canonical and non-canonical. **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with an untouched machine / an empty keypad / empty slots** → "Tap the hopper to get some ones." / "Type how many cubes." / "Fill in the tens and the ones." (no miss).
- **Bot's count (every Check in build-type rounds):** Bot's arm points at each ten on the rack — each flashes and a counter above the rack reads 10, 20, 30 …, then each loose cube on the plate hops — 31, 32 … The count is the truth.
- **Ten hiding (build rounds, plate ≥ 10 loose):** not counted as right even if the total matches: ten of the loose cubes light up (gold outline) and Bot taps the lever. Counted as **miss** kind `tenHiding`. Hint "Ten loose ones are hiding — bundle them!"
- **Miss 1 — what the apparatus shows:** the count stops where it leaves the target: too many tens → the extra ten on the rack glows coral; too few → a dotted ten-outline in the next rack slot; ones wrong → the plate's loose cubes number themselves 1, 2, 3 … beside the order card's ones digit, which glows. Unbundle: a band reappears faintly around the ten that should be snipped. Read rounds: the tens on the rack get "10" labels at their feet. Hints: build "Count Bot's tens: 10, 20, 30 … then the ones." · impostor "Is that really ten? Pull the lever and see." · unbundle "Snip one ten to get ten more loose ones." · read "Each ten is ten cubes. Count the tens by tens."
- **Miss 2:** the counting stays on screen as labels (10, 20, 30 under each ten; 1 … n on the loose cubes) and the order card splits into its two digits, each pointing to its part (tens digit → rack, ones digit → plate). Hint "Count by tens, then count on the ones."
- Any hopper tap, take-out, lever pull, snip or keypad edit clears the showing.
- **Success:** Bot's count lands on the target with a chime; Bot does a little victory spin of his cab window and a confetti of tiny cube outlines puffs out of the hopper; the order card flips to the sentence. Bubble: "{t} tens and {o} ones make {n}!" (e.g. "3 tens and 4 ones make 34!"); decades "{t} tens and no ones make {n}!"; unbundle "Still {n}: {t} tens and {o} ones!"; read "{t} tens and {o} ones — {n} cubes!"

## 8. Settings (each visibly changes the board at rest)
1. **Numbers:** to 49 / to 99 — the tens rack shows 4 or 9 slots.
2. **When the band can't close:** show the empty pockets / just spring open — at rest the band's coil on the press head shows ten pocket marks (first) or a plain coil (second). "Just spring open" keeps the counting load on the child (for children ready to count to ten unaided); the default shows how many are missing (make-ten practice).

## 9. Words (EN source)
- title (in-tool): "Bundle Bot"
- instruction: "Ten loose ones make a ten. Pull the lever when there are exactly ten."
- prompts: build "Make {n}." · unbundle "Bot needs {k} loose ones. Keep the number {n}." · read "How many cubes?" · howManyTens "Bundle every ten you can. Then fill in the tens and the ones."
- slots sentence: "{t} tens {o} ones" (slots for t and o; authored per locale with plural agreement — see traps).
- hints: hintStart "Tap the hopper to get some ones." · hintType "Type how many cubes." · hintSlots "Fill in the tens and the ones." · hintHiding "Ten loose ones are hiding — bundle them!" · hintCount "Count Bot's tens: 10, 20, 30 … then the ones." · hintImpostor "Is that really ten? Pull the lever and see." · hintSnip "Snip one ten to get ten more loose ones." · hintTensByTens "Each ten is ten cubes. Count the tens by tens." · hintStrong "Count by tens, then count on the ones."
- success: as §7.
- settings: "Numbers" · "to 49" · "to 99" · "When the band can't close" · "show the empty pockets" · "just spring open"
- **Locale traps:**
  - **"Ten" as a noun:** en *a ten*, de *ein Zehner / Einer* (the school words — Zehner, Einer), fr *une dizaine / unités*, es *decena / unidades*, pt *dezena / unidades*, it *decina / unità*, nl *tiental / eenheden*, sv *tiotal / ental*, da *tier / enere*, no *tier / enere*, fi *kymmen / ykkönen* (school terms *kymmenet / ykköset*). The slot sentence needs number agreement: de *3 Zehner 4 Einer* (invariant), fr *3 dizaines 4 unités* (1 → *une dizaine*), es *3 decenas 4 unidades* (1 → *una decena*), fi partitive after numbers *3 kymmentä 4 ykköstä* (1 → *1 kymmen*), sv *3 tiotal 4 ental* (invariant). The slots are numbers; the nouns are authored per (locale × value 0/1/2+) and the reviewer checks the table.
  - **Number words** (TTS only; screen shows numerals): de *vierunddreißig*, nl *vierendertig*, da *fireogtredive* say ones first; Danish vigesimal tens; fr *soixante-dix*, rectified *vingt-et-un*; no *trettifire*. SoT = `scripts/worksheet-gen/lib/number-words.js` (`numberWord(n, locale)`, 0–100, 11 locales); the old de/fr tables in the activity file are retired, no new hand table.
  - **Bot's name** per locale from the old file (en Bolt in the old code / "Bundle Bot" on the page); sv present; da/no/fi names at build.
  - **"Loose ones":** de *einzelne Würfel*, fr *cubes isolés*, es *cubos sueltos*, fi *irralliset kuutiot* — authored, never "ones" translated literally where the school word is *Einer/unités* (prompts use "loose cubes" wording in locales where "ones" is only the place name).

## 10. Sound off, access, phones
- Sound off: the band's pockets, the empty outlines, the CLUNK flash, Bot's count numerals and the labels carry everything; the thud and boing are decoration.
- Keyboard path §5; aria: plate "press plate: {k} loose cubes"; rack "{t} tens"; lever "lever — pull to bundle"; ten "ten {i} — carry to the plate to snip".
- Taps: hopper ≥ 72 px; lever hit 88 × 160 / 72 × 120; − button 48 px; clasps 48 px; keypad keys 48 px.
- Pictures: Bot 120 / 72 px.
- Fold at 360 × 740: task 48 + order card 64 + machine 360 + keypad (read rounds) 110 + Check 56 ≈ 640; 320 × 640: machine 330, keypad 2 rows of 6 keys (44 px) → ≈ 600.

## 11. Distinct from
- **Row 93 Bo's Berry Pantry (this batch):** tens arrive sealed and the number stretches into 30 + 4; here the child MAKES and BREAKS tens and the ten-pocket band is the invention.
- **place-value-lab tool:** ten ones snap into a ten automatically; here nothing ever bundles itself — only the child's lever, and the band refuses anything but ten in a way the child can see.
- **counting-cups tool** (scoop chips into cups of ten): scooping fills a container until full; here the child judges first and the band answers after the pull.
- **exchange-machine tool** (a column gives one, ten arrive next door): regrouping columns; no lever, no band.
- **Row 30 Overflow Trays / Row 31 Ghost Rafts (designed, K):** pouring until a tray overflows, catching ten on a raft — teen numbers at K; here two-digit numbers to 49/99 and the unbundle/read work of grade 1.

## 12. Build plan
- **Core state:** `{range:49|99, gaps:'show'|'spring', round, type:'build'|'decade'|'unbundle'|'impostor'|'read'|'overfill'|'tens', target, rack:t, plate:[{x,y}], clumps:[…], clumpIdx, slots:{t,o}, typed:'', miss, help}`.
- **Core functions:** `hopper()` → adds clump[clumpIdx] cubes at free random spots (min gap) · `takeOut()` · `pull()` → {result:'clunk'|'spring'|'stiff', squeezed:k, empty:k} (ten only when plate ≥ 10 and rack < cap) · `snip(i)` → rack−1, plate+10 · `value()` = 10·rack + plate.length · `canonical()` = plate < 10 · `check(s)` → `{ok, kind:'empty'|'tenHiding'|'tooManyTens'|'tooFewTens'|'onesWrong'|'notUnbundled'|'readWrong'|'slotsWrong'}`.
- **Gate ground truth (own oracle):** every round's right state recomputed from the target (build: rack = ⌊n/10⌋, plate = n mod 10; unbundle: rack = original − 1, plate = original + 10, value unchanged); pull clasps only on ≥ 10 and leaves plate − 10; a 9-cube pull never produces a ten; overfill clump lists overshoot ten at least once; impostor starts with exactly 9 loose; targets never have equal digits; read answers = 10·t + o; every success/slot sentence has per-locale agreement for t ∈ {0,1,2+}; ≥ 7 rounds per range.
- **Mutations:** pull bundles 9 · pull bundles all cubes (12 → a ten of 12) · extras deleted instead of returned · snip changes the value · non-canonical build accepted (2 tens 14 ones for 34) · unbundle round accepts the untouched start · lever works with a full rack · a ten counted as 1 in Bot's count · hopper drops clumps in a line (ten-frame look) · help survives a hopper tap · fr slot noun singular after 3 (*3 dizaine*).
- **Pictures to confirm at build:** `toys/robot` at 72 px in the cab window (contact sheet 2026-10-17: an orange boxy robot, upright, clear).
- **Risks:** up to 46 cubes on a 200 px phone plate — cubes 20 px with a min-gap scatter solver (the generator refuses to place a cube overlapping another; capacity proven by the gate at 320 for 46 cubes).
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a hopper that coughs out cubes, a big lever, a band that CLUNKs or boings, and a snip that cascades.
2. **Would a teacher put it on the board?** Yes — "is that really ten? pull and see" turns the hardest idea of grade 1 (a ten is ten ones AND one thing) into something the class watches; unbundling with the number unchanged is the regrouping groundwork for grade 2.
3. **Would a parent trust it?** Yes — one library robot, clean apparatus, no score.
4. **The invention, in one sentence:** the lever wraps a band with exactly ten pockets around the loose ones — ten clasps into one neat ten, fewer leaves an empty pocket and the band springs open, more and the extras are squeezed back out.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- The snip was "tap a ten → ten ones", which is the exchange-machine tool's move (tap a column, ten arrive next door). It now runs the design's own invention backwards: the child carries the ten into the press and the ten-pocket band releases its cubes one pocket at a time — un-bundling is seen as exactly ten, by the same band that made it. Keyboard and aria follow.
- Number words: SoT is `number-words.js` (0–100, 11 locales; fr rectified *vingt-et-un*, no *trettifire*, da vigesimal); the old de/fr tables are retired.
- Verified: all 21 rounds reachable and one-answer (incl. the clumps-of-3 overfill targets: plate values 3k − 10j plus take-out reach every ones digit), no doubled digits, ones digit 9 only in the impostor rounds, read rounds alternate canonical/non-canonical; `toys/robot` seen on the contact sheet. Distinct from place-value-lab (nothing bundles itself) and counting-cups (no scooping to full).
