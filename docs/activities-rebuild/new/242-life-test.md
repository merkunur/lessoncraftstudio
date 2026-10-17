# New 242 — The Life Test → THE THREE LAMPS AND THE BELL THAT DOES NOT COUNT (NGSS K-LS1-1)

## 0. Identity
- id `life-test.play.k-ls1-1` · grade K · framework NGSS K-LS1-1 (what plants and animals need to survive; patterns of living things) · strand Science · files `life-test-core.js`, `life-test-activity.js`, `life-test-activity.html`, `life-test-activities.json` (scaffold `--num=242`).
- Worksheet covered: **K-201** Living and Non-living Things (draw a line from each picture to its group) — the sorting crates at the end of every test are that page in motion.
- New instrument. Starting truth: `scripts/worksheet-gen/data/science/living-vs-nonliving.json` (its items re-used where the picture is honest: cat, dog, rabbit, fish, butterfly, bee, bird, flower, frog; chair, car, ball, cup, book, key, clock, spoon) — this design adds the young→grown pairs, the plants and the movers; it keeps the kitchen spoon (purple plastic — a fine non-living thing) and leaves out the pink key (it reads as a toy and adds nothing a cup or a book does not).

## 1. The pitch
"Put a thing on the test bench and three lamps — GROWS, NEEDS FOOD AND WATER, MAKES YOUNG — light up only with evidence; a fourth bell off to the side rings for anything that MOVES, and it does not count: the car rings the bell and lights no lamp, the tulip never rings the bell and lights all three."

## 2. Why a child will want it again
A clean wooden test bench sits in the middle of the stage under a panel of three round glass lamps, and off to the side, on its own little bracket outside the panel, a brass bell. The child drops a chick on the bench: lamp one flickers on as the chick grows — it swaps with a soft *poof* into a hen; a water drop falls, the hen drinks it (the drop shrinks into it with a sparkle) and lamp two lights; then a tiny chick pops up beside the hen and lamp three lights. Ding, ding, ding — and the bell? The hen pecked, so the bell rang too — but the bell is outside the panel. Now the child drops a toy car: it zooms across the bench and back, the bell rings and rings — and the three lamps stay dark: no growing (it stays the same size inside a fading growth ring), the water drop beads up and rolls off onto the bench, and nothing appears beside it. A tulip bud: no bell at all — it just sits there — and then it opens into a tulip, drinks, and a new bud appears beside it: three lamps. Every test ends with the child putting the thing into one of two crates; at the end of a round the LIVING crate's things all give a little grow-pulse together and the NOT-LIVING crate's things give one tidy shake. Children try everything just to see the bell ring for a clock that lights nothing.

## 3. The skill and the misconception
- **Skill:** tell living from non-living things by what living things do: they grow, they need food and water, they make young.
- **Misconceptions and the push-back (mechanism):**
  1. *"If it moves, it is alive"* (a car, a clock, a kite, a robot, a ball). The MOVES bell is real and rings loudly for movers — but it hangs outside the lamp panel and never lights a lamp. The car, the clock's turning hands and the kite's fluttering ring it; the lamps stay dark. The two signals are visibly separate.
  2. *"Plants are not alive"* (they do not move). The tulip, sunflower, grass and apple tree never ring the bell — and light all three lamps with evidence (the bud opens; the drop is drunk; a new bud or a small new plant appears).
  3. *"It has a face, so it is alive"* (robot). The robot rings the bell, lights nothing.
  4. *Sorting by appearance:* the crates only take a thing after its test; in "test after sorting" mode the child commits first, and then the bench runs the test on the thing in the crate — a car in the LIVING crate lights no lamps there, in front of everyone.

## 4. The stage
Layout `split` at ≥ 700 px (stage left 470 px: lamp panel, bell, bench, crates; right column 210 px: the tray of things + bubble); stacked below.

**At 704 px (stage 470 × 470):**
- **The lamp panel** (top, 330 × 110): a drawn wooden board with three round glass lamps (68 px each, 3 px ink rim); dark = smoky grey glass, lit = warm amber glow with rays. Under each lamp an apparatus icon (no words): GROWS = a small-to-big arrow pair (two nested chevrons), FOOD AND WATER = a drop inside a bowl outline, MAKES YOUNG = a big circle with a small circle beside it.
- **The bell** (right of the panel, on its own bracket 70 × 110, separated by a gap of 30 px and a dashed bracket line): a drawn brass bell with a clapper; its icon below: two motion lines. It swings and its rim flashes when it rings.
- **The bench** (middle, 420 × 150): a drawn wooden test bench with a centre spot (a ring) where the thing stands at 128 px, and a "young" spot to its right (a dotted circle, 96 px) where the young appears. Under each lamp hangs a brass **pull-chain** with a round knob (44 px hit area) — the child pulls it to run that lamp's test (§5).
- **The crates** (bottom, two crates 230 × 150): drawn wooden crates; the LIVING crate's front shows the three lamp icons lit (amber) and the word "Living" (the K-201 bank label, 18 px); the NOT LIVING crate's front shows the three icons dark and "Not living". The newest thing sorted into a crate shows inside it at 96 px; earlier ones lie behind it as stacked edges (apparatus — no picture under the floor).
- **The tray** (right column, 210 × 340): the round's things at 96 px in 2 columns.

**At 360 px:** stacked — task → lamp panel 280 × 84 (lamps 56 px) with the bell on its bracket at the right (56 px, gap 14 px) → bench 328 × 130 (thing at 100 px, young spot 64 px, chain knobs 44 px) → crates side by side 160 × 96 (contents 64 px, the newest 2 visible, a count of further ones shown as stacked edges, no numerals) → tray as a row of 3 at 72 px (2 rows) → Check. At 320: lamps 52 px, thing 96 px, tray 64 px.

**Library pictures (living; young → grown pairs where the library has both):**
- `farm-animals/chick` → `farm-animals/hen`; `forest-creatures/caterpillar` → `forest-creatures/butterfly`; `spring/bud` → `spring/tulip` — the only three pairs whose young and grown pictures look different. **Refused as pairs (64/90 px sheet):** calf → cow, foal → horse, lamb → sheep — each young is the SAME drawing as its grown animal at the same box size, so the swap would show no growth at all (the rulings already list calf ≈ cow).
- Living without a young picture (GROWS = the picture grows from 96 px to 128 px with a sprout bounce; MAKES YOUNG = a 96 px copy appears in the young spot — never smaller than the floor): `flowers/sunflower`, `spring/grass`, `tree/apple` (an apple tree), `pets/cat`, `pets/dog`, `forest-creatures/frog`, `forest-creatures/bee`, `spring/bird`, `pets/goldfish`, `farm-animals/cow`, `farm-animals/sheep`, `farm-animals/horse`.
- **Not living:** movers `vehicles/car`, `vehicles/train`, `around-the-house/clock` (its hands turn), `toys/robot`, `toys/kite` (flutters), `toys/ball` (rolls), `toys/balloon` (drifts up and is pulled back by its string); still `camping/rock`, `furniture/chair`, `classroom/book`, `kitchen-tools/cup`, `toys/blocks`, `kitchen-tools/spoon` (`classroom/scissors` is not in the activity picture index).
- **Refused:** once-living things — `camping/log`, `miscellaneous/leaf`, `summer/seashell`, `easter/feather`, `miscellaneous/acorn`, `miscellaneous/pinecone` ("was alive" is beyond K); food (fruit, vegetables, bread — harvested, contested); `weather/sun`, `weather/cloud`, `weather/raindrop`, `camping/campfire` (they "move" and "grow" — too contested for K, and the sun/cloud have faces); `toys/doll`, `toys/baby` (read as people); `farm-animals/duck` vs `duckling` (both drawn as yellow ducklings — no visible growth); `spring/nest` (contains chicks).

**Task line** (≤ 24 px): Lamps first "Put it on the bench. Watch the lamps — then put it in a crate." · Test after "Living or not living? Put it in a crate — then the bench will test it."

## 5. The hand
- **Drag a thing** from the tray onto the bench (any drop on the bench snaps to the centre spot, 160 ms).
- **The child runs the test** (Test first). Landing on the bench runs step 1 by itself — nobody can stop a car from moving, so the bell is not the child's to pull. Then the three pull-chains wake (a small swing): the child pulls each chain, in any order, and that lamp's step plays (≈ 0.8 s; a tap fast-forwards the motion, never skips it). The crates open only when all three chains have been pulled — so every living/not-living decision is made with the evidence the child produced. (Test after sorting: the child sorts first, then the bench runs steps 2–4 by itself on the thing in its crate.)
  1. **Move check** (on landing, 0.8 s): movers do their motion (car zooms across and back; train chugs; clock hands sweep a full turn; robot steps left-right; kite flutters on a string; ball rolls; balloon rises and is tugged back); animals do a small motion (hen pecks: a 6° dip; cat a 4 px hop; fish a wiggle) — and the BELL rings. Plants and still things: nothing, bell silent.
  2. **GROWS** (chain 1): a growth ring expands around the thing; a living thing with a young picture is shown first as the young (it entered the bench as the young: the tray shows the YOUNG picture for these — chick, caterpillar, bud) and swaps to the grown picture with a *poof*; others grow from 96 to 128 px; lamp 1 lights. Non-living: the ring passes, the thing stays exactly the same size, the lamp stays dark.
  3. **FOOD AND WATER** (chain 2): a drop falls from above the bench; a living thing takes it (the drop shrinks into it with a sparkle); lamp 2 lights. Non-living: the drop lands, beads up and rolls off the bench edge; lamp dark.
  4. **MAKES YOUNG** (chain 3): the young spot fills with the young picture (chick beside the hen, caterpillar beside the butterfly, bud beside the tulip) or a 96 px copy; lamp 3 lights. Non-living: the dotted young spot stays empty.
- **Sort:** drag the thing (with its young, which travels with it) from the bench to a crate; it drops in (200 ms).
- **Test after mode:** drag a thing from the tray straight into a crate; then the bench lifts it out of the crate into the test (the same 4 steps), and after the test it returns to the crate it was put in (if right) or §7.
- **Free play:** a "test anything" drawer after each round offers every picture in the tray pool; tests run, nothing is sorted or counted.
- Sound (optional): lamp hum + ding per lamp, the bell's ring, drop plink, roll-off clatter, poof; TTS reads the task line and the thing's name (5 locales).

## 6. The rounds
One round = 6 things (3 living, 3 not living); 8 rounds per pass.

**Everyday (obvious; at most 1 mover among the not-living):**
| # | living (tray shows young where it has one) | not living |
|---|---|---|
| 1 | chick, bud, cat | rock, chair, ball |
| 2 | cow, sunflower, frog | book, cup, car |
| 3 | sheep, grass, dog | blocks, rock, spoon |
| 4 | horse, apple tree, bee | chair, book, clock |
| 5 | caterpillar, bud, goldfish | cup, rock, ball |
| 6 | chick, sunflower, bird | spoon, blocks, train |
| 7 | cow, grass, cat | book, chair, kite |
| 8 | sheep, apple tree, frog | rock, cup, robot |

**Tricky (≥ 3 movers among the not-living, ≥ 2 plants among the living):**
| # | living | not living |
|---|---|---|
| 1 | bud, sunflower, chick | car, clock, robot |
| 2 | grass, apple tree, cow | kite, train, ball |
| 3 | sunflower, bud, caterpillar | balloon, car, clock |
| 4 | apple tree, grass, horse | robot, kite, train |
| 5 | bud, grass, sheep | clock, ball, balloon |
| 6 | sunflower, apple tree, chick | train, robot, car |
| 7 | grass, bud, cow | kite, balloon, clock |
| 8 | apple tree, sunflower, caterpillar | ball, car, robot |

- **Answer position:** the tray order is shuffled so each tray slot holds a living thing 35–65 % of the time across a pass and never 4 living in a row (gate-measured over 200 passes); the crates' left/right positions are fixed (LIVING left, NOT LIVING right in every locale; their fronts carry the lamp icons, so the crate is found by meaning, and the gate does not reward position because every round needs both crates equally).
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with things not yet sorted** → hint, no miss: "Some things are still waiting. Test each one and put it in a crate."
- **Lamps first — wrong crate, miss 1:** the crate refuses — the thing bumps the crate's rim and slides back to the bench, and the test re-runs at 1.5× speed with the lamps lighting (or staying dark) again · living put in NOT LIVING → "Look at the lamps: it grew, it drank, it made young." · not living put in LIVING → "The bell rang — but did any lamp light?" (or, for a still thing: "Did any lamp light?").
- **miss 2 (same thing):** the lamps stay lit (or dark) and a dashed arrow runs from the lamp panel to the crate whose front icons match · "Find the crate with the same lamps."
- **Test after — miss 1:** the thing is lifted out of the crate into the test; at the end its lamps (all lit or all dark) are compared with the crate front's icons, which flash; it slides to the bench edge · same hints. **miss 2:** as above.
- A new move takes the help away until the next Check.
- **Success:** the LIVING crate's things all do one grow-pulse together, the NOT LIVING crate's things one tidy shake; the three lamps flash together, the bell stays still. Bubble "Living things grow, need food and water, and make young. Moving is not enough!" (Everyday: "Living things grow, need food and water, and make young.")

## 8. Settings
1. **Things:** obvious · tricky (movers and plants) — at rest: the tray shows still things (rock, chair, cup) vs cars, clocks, robots, kites, plants.
2. **Lamps:** test first · test after sorting — at rest: the bench is the drop target with the crates closed (lids on, apparatus) vs the crates open as the drop target and the bench waiting.

## 9. Words (EN source)
- title "The Life Test" · instruction "Test each thing on the bench: living things grow, need food and water, and make young — the bell rings for anything that moves, but moving is not a lamp."
- prompts: promptFirst "Put it on the bench. Watch the lamps — then put it in a crate." · promptAfter "Living or not living? Put it in a crate — then the bench will test it."
- crate labels: the K-201 bank labels ("Living" / "Non-living" — here "Not living"; per locale from the bank: de "Lebendig / Nicht lebendig", fr "Vivant / Non-vivant", fi "Elävä / Eloton", …).
- hints: hintWaiting "Some things are still waiting. Test each one and put it in a crate." · hintLiving1 "Look at the lamps: it grew, it drank, it made young." · hintMover1 "The bell rang — but did any lamp light?" · hintStill1 "Did any lamp light?" · hint2 "Find the crate with the same lamps."
- celebrations: celebrateTricky "Living things grow, need food and water, and make young. Moving is not enough!" · celebrateEveryday "Living things grow, need food and water, and make young."
- aria: ariaLamps "{thing}: grows {on|off}, food and water {on|off}, makes young {on|off}" · ariaBell "the bell rang: it moves".
- settings: setThings "Things" · thingsObvious "Obvious" · thingsTricky "Tricky" · setLamps "Lamps" · lampsFirst "Test first" · lampsAfter "Test after sorting".
- **Locale traps:**
  - **"Living / non-living"** has no neat K word in several locales: fi "elävä / eloton" (fine), sv "levande / icke levande" (the bank's "icke levande" is formal — the reviewer may prefer "inte levande"), fr "vivant / non vivant", es "ser vivo / no vivo" (es also "inerte" — too formal for K), pt "ser vivo / não vivo", nl "levend / niet levend", de "lebendig / nicht lebendig" ("Lebewesen" is the school noun — crate labels are adjectives here, reviewer's choice). The crate words are content; the lamp icons carry the meaning without them.
  - **"Makes young":** de "bekommt Junge", fr "a des petits", fi "saa poikasia" — a plant does not "have babies" in natural speech in most locales; the lamp's meaning for plants is shown (a new bud/plant), and hintLiving1 is stored with a plant variant per locale ("it grew, it drank, it made new plants": de "neue Pflanzen", fi "uusia kasveja").
  - **"Drinks":** plants "take up water" — the hint uses "it needed water" for plants in locales where "drink" is wrong for a plant (fr "elle a bu" is acceptable at K; de "trinken" for plants is common in Kita register; fi "joi" — reviewer).
  - Young names (chick, caterpillar, bud) from vocab per locale; they appear only in aria (the pictures carry them on screen).

## 10. Sound off, access, phones
- Sound off: the lamps glow, the bell visibly swings and flashes, the growth swap, the drop drunk or rolling off, the young appearing — all visual.
- Keyboard: Tab to a tray thing, Enter puts it on the bench (the move check runs); Tab to each lamp chain, Enter pulls it (Space fast-forwards); when all three are pulled, ← / → choose a crate, Enter sorts.
- aria-live announces each test result (`ariaLamps`, `ariaBell`).
- Taps: tray things 72–96 px; the bench and crates are large drop targets; Check 48 px.
- Pictures: bench thing 128 px, young 96 px, tray 96 px, newest crate thing 96 px at 704; ≥ 64 px at 360.
- Fold at 360 × 740: header 56 + task 52 + panel 92 + bench 130 + crates 104 + tray 2 × 80 + Check 56 = 650 px. At 320 × 640: panel 84, bench 120, crates 96, tray 2 × 72 → 608 px.

## 11. Distinct from
- **Mother and Baby** (new 233: a magnifier compares a baby with possible parents) — this instrument uses young→grown pictures only as evidence that a thing grows and makes young; it never asks which parent.
- **The Home Finder** (240, same batch: need badges that a place gives) — badges are about places; these lamps are about what a thing is.
- **The Where-From Thread** (234) and **The Bin Windows** (241) — materials, not life.
- No registered invention separates a "moves" signal from the criteria it is confused with.

## 12. Build plan
- **Model (core):** `chains:{grows,feeds,young}` (pulled flags; `sort()` refused until all true in Test first) plus `state = { things, lamps, round, tray:[{key, living, moves, young:{theme,noun}|null, grown:{theme,noun}|null}], bench:null|key, test:{step, grows, feeds, young, bell}, crates:{living:[], not:[]}, misses:{} }`. `test(key)` → `{bell: moves, grows: living, feeds: living, young: living}` (from the item table, never inferred); `sort(key, crate)` → right iff `crate === (living ? 'living' : 'not')`; `nextTask`.
- **Gate ground truth (`verify-life-test-core.js`, own table):** every item's living/moves flags hand-written; every living thing lights all three lamps and every non-living none; the bell is independent (≥ 1 non-living mover rings and lights nothing in every Tricky round; ≥ 2 plants per Tricky round never ring); every young→grown pair exists in its theme JSON and the tray shows the young; no refused picture (once-living, food, faces of sun/cloud, dolls); 3 + 3 per round; tray-slot balance 35–65 %.
- **Mutations:** a crate accepts before all three chains are pulled (Test first) · a pulled chain runs a different lamp's step · a mover lights a lamp · the bell counts as a lamp · a plant rings the bell · a living thing leaves a lamp dark · tray shows the grown picture (no growth visible) · a once-living thing (log) admitted · Tricky round with < 3 movers · a round with 4 living · wrong crate accepted · fixed tray order · the drop rolls off a living thing · Check with unsorted things succeeds.
- **Pictures to re-open at 64 px:** bud (reads as a tulip bud), caterpillar → butterfly (forest-creatures pair, same colours), chick vs hen (distinct), robot (reads as a toy), balloon, blocks (a toy, not living).
- **BLOCKED:** nothing. Wanted: a seed and seedling pair (seed → plant) to make plants' MAKES YOUNG as concrete as the animals'; until then plants show a new bud (tulip) or a 45 % copy.

## 13. The four questions
1. **Choose it again?** Lamps that ding on, a bell that rings for a clock and lights nothing, a chick that grows into a hen — children test everything, twice.
2. **On the board?** "Is a car alive? It moves!" — the class watches the bell ring and the lamps stay dark; then a tulip that never moves lights all three. That is the K-LS1 lesson in one minute.
3. **Parent trust?** Honest criteria shown by evidence, contested things (fire, sun, logs) refused, no scores.
4. **The invention:** "Three lamps light only with evidence of growing, needing food and water, and making young — and a separate bell rings for moving, so the child sees that moving is not one of them."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **The child runs the test.** Before, the bench played all three lamps by itself and the child only read the result and sorted — a watch-then-sort quiz. Now step 1 (moving, the bell) happens by itself on landing, and the child pulls three lamp chains to produce the evidence; the crates open only after all three. The bell-vs-lamps invention is now in the hand.
- **Growth pairs that show no growth removed:** calf/foal/lamb are the same drawings as cow/horse/sheep at the same size (contact sheet), so the "grows" swap was invisible. Pairs are chick→hen, caterpillar→butterfly, bud→tulip; cow, horse, sheep grow by size like the others.
- **`classroom/scissors` is not in the activity index** — replaced by `toys/blocks`.
- **Picture floor:** the young copy (45 % = 58 px), the growth start (55 %) and crate contents (64 px) were under 96 px at 704; now young 96, growth 96→128, crates show the newest at 96.
- §0's contradictory spoon/key sentence rewritten. 3 + 3 per round and ≥ 3 movers / ≥ 2 plants per Tricky round re-checked.
