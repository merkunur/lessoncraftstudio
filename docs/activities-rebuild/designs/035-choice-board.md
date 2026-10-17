# Row 35 — The Sorting Chutes (K.MD.B.3)

## 0. Identity
- id `choice-board.sort-count.k-md-b-3` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade K · CCSS K.MD.B.3 · Measurement & Data · own files `sorting-chutes-core.js`, `sorting-chutes-activity.js`, `sorting-chutes-activity.html`, `sorting-chutes-activities.json` (the row leaves `choice-board-activities.json`).
- worksheets covered: K-013 Count Each Kind · K-060 I Spy… · G1-141 Read the Picture Graph · G1-142 Most of All · G1-146 Sort and Count · G1-160 Three Groups · G3-353 Two-Circle Sort (as a two-way table: kind × "flies or not").
- old activity: a mixed set of pictures, "how many animals?", tap one of four number tiles. **Kept**: the category set (animals, fruits, vehicles), most of the round item lists (cat, dog, duck, apple, banana, orange, strawberry, fish, rabbit, horse, pear, lemon, pig, sheep, car, bus, truck, train, giraffe, owl, fox, elephant, pineapple, watermelon, airplane, boat, helicopter, turtle, van, taxi), classify-then-count. **Dropped**: fruits/cherry, fruits/plum and fruits/peach (the library draws all three as red apples — a child would count an "apple" that the speaker and the aria label call a plum), the four-tile multiple choice (position tells), the static picture grid.

## 1. The pitch
"The mixed pile rides a conveyor belt one thing at a time, and the child drops each one down the right chute — the glass tubes fill into a picture graph, so counting, comparing and ordering the groups is reading the tubes."

## 2. Why a child will want it again
- A conveyor belt is pure toy: rollers turn, the next picture trundles along and waits at the end, the child taps a chute and it drops with a "thunk" and settles into its tube.
- The tubes grow while you work — you can SEE which group is winning before anyone asks.
- Order rounds are physical: drag the glass tubes along their rail into most-to-fewest order; they clink into place.
- The two-way rounds have a sky and a ground: flying things drop into the sky-row tubes, everything else into the ground row — the penguin (a bird that does not fly) is a favourite argument.
- End of round: the tubes fill with a soft colour wash and stand up straight like a finished graph; the belt does one celebratory spin. No timer, no score.

## 3. The skill and the misconception
- Skill (K.MD.B.3): classify objects into given categories, count the number in each category, and sort the categories by count. Worksheets extend it: read a picture graph (one picture per thing), find the most/fewest, how many more (G1-141/142), three groups (G1-160), classify by two attributes at once (G3-353, as a 2 × 2 table).
- Misconceptions: (a) counting a mixed pile directly (skipping or double-counting because members are scattered); (b) judging "most" by how spread out or how big the pictures are; (c) ordering groups by their names or by the order they were sorted; (d) "how many more" answered with the bigger count; (e) in two-way sorting, using only one attribute.
- Push-back by the material: the belt delivers each object ONCE and waits, so nothing is skipped or counted twice; a wrong chute bounces the object back (classification is checked by the material); every object sits in an equal-height slot, so tube height IS the count (a big elephant takes the same slot as a small kiwi); "how many more" is shown by one-to-one pairing lines across two tubes, the unpaired extras glowing; ordering is checked by neighbour tubes leaning towards each other where the order breaks.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 470):
- **Hopper** top-left: a drawn basket 120 × 90 showing the round's remaining pile as a jumble of 44 px library pictures (visible so the child sees "a mixed set" first).
- **Conveyor belt** across the top (y 40–110): drawn rollers (circles 18 px, rotating) under a belt band; the current object rides from the hopper to the end of the belt (x ≈ 560) and waits there at 104 × 104 (library picture, ink-box fitted).
- **Chutes and tubes** below the belt: each chute is a drawn funnel mouth 110 wide leading into a **glass tube** (2 px ink outline, glass tint, rounded bottom) with equal **slots** 52 px tall (max 7 → 364 px). Tube contents are the same library pictures at 46 px, stacked from the bottom.
  - 2 groups: 2 tubes 110 wide, gap 80, centred. 3 groups: 3 tubes 100 wide, gap 40.
  - 2 × 2: four tubes 92 wide in two rows; the top row stands on a pale-blue **sky band** (a drawn cloud line along its top edge), the bottom row on a pale-green **ground band**; slots 36 px (max 5 per tube; tube contents 32 px).
- **Tube labels**: on each funnel, three mini library pictures (28 px) that are members of the category but NEVER appear in any round: animals {farm-animals/cow, zoo-animals/lion, forest-creatures/frog} · fruits {fruits/blueberry, fruits/coconut, fruits/grapefruit} · vehicles {vehicles/motorcycle, vehicles/bicycle, vehicles/ship}. In 2 × 2 the columns carry the kind labels; the rows are the sky and ground bands (geometry, no picture).
- **Slot numbers** (setting): small numerals 1…7 beside each tube's slots (the picture-graph scale), or hidden.
- **Question card** (appears when the belt is empty): slides in at the right of the tubes, 150 × 120, with the question's picture symbol (a tube icon with an arrow).
- **Number strip** (count questions only): 1–10 in one row of tiles 52 × 52 under the tubes, fixed order.
- **Check** right of the number strip, 48 px.
At 360 (stage ≈ 336 wide): hopper collapses to a small 56 × 44 basket at the belt's start; belt 70 tall, waiting object 72 px; tubes 2-group 96 wide (slots 36 px, max 7 → 252), 3-group 88 wide (gap 12), 2 × 2 tubes 80 wide, slots 28 px (max 5 → 140 per row); number strip in two rows of five (tiles 56 px); question card above the tubes as a slim bar. Total ≈ 70 + 270 + 120 = 460 px → above the 360 × 740 and 320 × 640 folds.

Library pictures (each verified in `mini tools/pictures/*.json`; contact sheets 2026-10-17): animals/cat, dog, duck, fish, rabbit, horse, pig, sheep, giraffe, owl, fox, elephant, turtle, penguin, bat, seagull, donkey; things-that-fly/parrot; fruits/apple, banana, orange, strawberry, pear, lemon, raspberry, kiwi, pineapple, watermelon, mango; vehicles/car, bus, truck, train, taxi, van, airplane, boat, helicopter, jet, rocket, tractor; labels as listed. Ruled out on the contact sheet: fruits/cherry, plum, peach and apricot (all drawn like apples); fruits/watermelon and kiwi are slices/halves but read as their fruit and are kept. Belt, rollers, chutes, tubes, bands and the question card are drawn apparatus. No words on the apparatus except the slot numerals.

Task line (EN): sorting "Drop each one down the right chute." Then the question replaces it: "How many {category}?" · "Which group has the most?" · "Which group has the fewest?" · "Put the tubes in order — most first." · "How many more {categoryA} than {categoryB}?" · 2 × 2: "How many {category} that fly?" · "How many {category} that do not fly?" · "How many things fly?" · "How many {category} in all?"

## 5. The hand
- **Sorting**: the waiting object sits at the belt's end. **Tap a chute** (or drag the object onto it) → it tips off the belt and drops into the tube (300 ms, "thunk" 160 Hz), settling into the next free slot. The belt then rolls the next object out of the hopper (400 ms, rollers spin). In 2 × 2, the object drops into the column's chute and the child taps the sky or ground tube of that column (one tap on the tube = both decisions, 4 tubes).
  - **Wrong chute**: the object hits the funnel rim, bounces back to the belt end (260 ms, "boing" 240 Hz) and the funnel's three label pictures flash once — the material says "not one of us". Nothing else changes.
- **Counting aid**: during a count question, tapping inside a tube lights the next slot from the bottom (a soft tick), so the child can count 1:1 by touch; tapping above the top does nothing (no over-count). A long press resets the lights.
- **Answering**: count → tap a number tile (ring); most/fewest → tap a tube (ring); order → drag tubes along their rail (they slide and clink into new places, 200 ms); how many more → tap a number tile.
- **Check** submits.
- Undo during sorting: tap the top object of a tube → it pops back onto the belt end (only the top one — a stack).
- Free play (after success): the tubes can be poured back into the hopper (tap the hopper) and the round re-sorted; any order of tubes can be dragged.
- Optional TTS: tapping the waiting object speaks its noun; tapping a funnel speaks the category name.

## 6. The rounds
One round = one mixed pile → sort → one question. Counts 1–7 (never 0); in "most/fewest/order" rounds all counts in the round are different. The pile's belt order is shuffled with no more than 3 of one category in a row.

**Groups: 2** (K-013, G1-146)
| # | pile | question → answer |
|---|---|---|
| 1 | animals 3 (cat, dog, duck) · fruits 2 (apple, banana) | How many animals? → 3 |
| 2 | fruits 5 (apple, orange, banana, strawberry, pear) · animals 2 (dog, fish) | How many fruits? → 5 |
| 3 | animals 4 (fish, duck, rabbit, horse) · fruits 6 (pear, lemon, raspberry, orange, kiwi, pineapple) | Which has the most? → fruits |
| 4 | vehicles 2 (car, bus) · animals 7 (cat, dog, fish, rabbit, sheep, pig, horse) | How many vehicles? → 2 |
| 5 | animals 3 (owl, fox, elephant) · vehicles 5 (car, truck, train, taxi, van) | Order, most first → vehicles, animals |
| 6 | fruits 4 (strawberry, apple, pear, banana) · animals 3 (horse, pig, sheep) | How many animals? → 3 |
| 7 | vehicles 6 (car, bus, truck, train, airplane, boat) · fruits 1 (banana) | Which has the fewest? → fruits |
| 8 | animals 5 (giraffe, horse, rabbit, pig, sheep) · fruits 3 (mango, pineapple, watermelon) | How many fruits? → 3 |
| 9 | vehicles 3 (airplane, boat, helicopter) · animals 4 (turtle, owl, fox, rabbit) | Order, most first → animals, vehicles |

**Groups: 3** (G1-160, G1-141, G1-142)
| # | pile | question → answer |
|---|---|---|
| 1 | animals 4 (cat, dog, duck, fish) · fruits 2 (apple, banana) · vehicles 3 (car, bus, truck) | How many vehicles? → 3 |
| 2 | animals 2 (rabbit, horse) · fruits 5 (pear, lemon, orange, raspberry, kiwi) · vehicles 3 (train, taxi, van) | Which has the most? → fruits |
| 3 | animals 5 (pig, sheep, cat, dog, duck) · fruits 1 (kiwi) · vehicles 3 (boat, airplane, bus) | Order, most first → animals, vehicles, fruits |
| 4 | animals 3 (owl, fox, elephant) · fruits 4 (banana, apple, strawberry, mango) · vehicles 2 (car, truck) | How many fruits? → 4 |
| 5 | animals 6 (turtle, penguin, giraffe, horse, rabbit, pig) · fruits 2 (orange, pear) · vehicles 4 (helicopter, car, bus, van) | Which has the fewest? → fruits |
| 6 | animals 2 (cat, fish) · fruits 7 (apple, raspberry, pear, banana, lemon, kiwi, mango) · vehicles 5 (train, boat, taxi, truck, car) | Order, most first → fruits, vehicles, animals |
| 7 | animals 3 (dog, duck, sheep) · fruits 1 (banana) · vehicles 5 (airplane, bus, car, van, train) | How many more vehicles than animals? → 2 |
| 8 | animals 4 (elephant, giraffe, horse, donkey) · fruits 3 (strawberry, watermelon, pineapple) · vehicles 2 (tractor, bus) | Which has the most? → animals |
| 9 | animals 5 (rabbit, cat, dog, pig, sheep) · fruits 2 (apple, orange) · vehicles 3 (car, taxi, boat) | How many more animals than fruits? → 3 |

**Groups: 2 × 2** (G3-353 as a two-way table; columns animals / vehicles, rows fly / do not fly)
| # | animals that fly | animals that do not | vehicles that fly | vehicles that do not | question → answer |
|---|---|---|---|---|---|
| 1 | owl, bat (2) | dog, pig, cat (3) | airplane (1) | car, bus, truck, train (4) | How many animals that fly? → 2 |
| 2 | duck, owl, seagull (3) | rabbit, horse (2) | helicopter, jet (2) | boat, taxi, tractor, car, bus (5) | How many vehicles that do not fly? → 5 |
| 3 | parrot (1) | elephant, turtle, penguin, dog (4) | airplane, helicopter, rocket (3) | car, train (2) | How many things fly? → 4 |
| 4 | bat, owl, duck, seagull (4) | cat (1) | jet, airplane (2) | bus, truck, taxi (3) | Which tube has the most? → animals that fly |
| 5 | owl, duck (2) | pig, horse, rabbit, dog, cat (5) | rocket (1) | boat, car, train, tractor (4) | How many animals in all? → 7 |
| 6 | seagull, parrot, bat (3) | penguin, turtle (2) | helicopter, airplane, jet, rocket (4) | bus (1) | How many things fly? → 7 |
| 7 | duck (1) | elephant, dog, pig (3) | airplane, jet (2) | car, bus, truck, taxi, train (5) | How many vehicles that do not fly? → 5 |
The penguin appears in rounds 3 and 6 on purpose (a bird that does not fly); its sky-tube drop bounces, which is the classification argument the worksheet wants.

- **Answer position**: count answers are values on a fixed 1–10 strip (no shuffled options → no position tell); the gate checks that the numeric answers of each level cover ≥ 3 different values (2 groups: 2, 3, 5; 3 groups: 2, 3, 4; 2 × 2: 2, 4, 5, 7) and no value appears more than 3 times in a level. "Most/fewest" answers: the tube positions are re-dealt every round (category → tube slot shuffled), and the answer tube sits in each position 30–70 % of the times it exists over a pass. Order rounds start in an order that is never already sorted.
- **Order**: order-only reshuffle per pass (`nextTask`); the belt order of each pile reshuffles every showing.

## 7. Check, the misses, the success
- Check with no answer → "Tap the number." / "Tap a tube." / "Drag the tubes into order." (no miss)
- **Count, miss 1**: the asked tube's slots light one by one from the bottom with soft ticks (the count enacted), the other tubes dim. Hint "Count them from the bottom of the tube."
- **Count, miss 2**: slot numerals appear beside that tube (even when the setting hides them) and stay until the next Check. Hint "Read the number at the top."
- **Most/fewest, miss 1**: a dashed line runs across from the top of the chosen tube; every tube that rises above it (most) — or stops below it (fewest) — glows at that part. Hint "Look at how high each tube is filled." **miss 2**: slot numerals on every tube.
- **Order, miss 1**: each neighbour pair that breaks the order leans together (4°, twice) and its tops glow. Hint "These two are the wrong way round." **miss 2**: numerals on all tubes.
- **How many more, miss 1**: pairing lines join the two tubes' slots one-to-one from the bottom; the unpaired extras in the fuller tube glow. Hint "Pair them up. How many have no partner?" **miss 2**: the extras get numerals 1, 2, 3.
- a new answer takes the help away.
- **Success**: the tubes fill with a soft colour wash (category colours: animals teal, fruits coral, vehicles gold; sky/ground rows lighter/darker), stand straight with a small bounce, the belt spins once. Bubble: "Yes — {n} {category}!" · "Yes — {category} have the most!" · "Yes — {category} have the fewest!" · "Yes — {c1}, then {c2}{, then {c3}}: from most to fewest!" · "Yes — {n} more {categoryA} than {categoryB}!" · 2 × 2: "Yes — {n}!" plus the tube flashing.

## 8. Settings
1. **Groups**: 2 / 3 / 2 × 2 (fly or not) — the number and arrangement of tubes change at rest.
2. **Tube numbers**: Shown / Hidden — slot numerals beside every tube appear or disappear at rest (shown = picture-graph reading; hidden = the child counts).

## 9. Words (EN source)
- title (instrument) "The Sorting Chutes"
- instruction "Drop each picture down the right chute, then answer the question about the tubes."
- prompts: "Drop each one down the right chute." · "How many {category}?" · "Which group has the most?" · "Which group has the fewest?" · "Put the tubes in order — most first." · "How many more {categoryA} than {categoryB}?" · "How many {category} that fly?" · "How many {category} that do not fly?" · "How many things fly?" · "How many {category} in all?"
- hints: "Tap the number." · "Tap a tube." · "Drag the tubes into order." · "Count them from the bottom of the tube." · "Read the number at the top." · "Look at how high each tube is filled." · "These two are the wrong way round." · "Pair them up. How many have no partner?"
- celebrations: "Yes — {n} {category}!" · "Yes — {category} have the most!" · "Yes — {category} have the fewest!" · "Yes — {list}: from most to fewest!" · "Yes — {n} more {categoryA} than {categoryB}!" · "Yes — {n}!"
- category names: "animals" · "fruits" · "vehicles"
- settings: "Groups" — "2" / "3" / "2 × 2" · "Tube numbers" — "Shown" / "Hidden"
- aria: chute "{category} chute"; tube "{category}: {n}"; sky row "Things that fly"; ground row "Things that do not fly".

Locale traps:
- Category nouns are plural and gendered: de "Tiere / Obst (uncountable!) / Fahrzeuge" — "Obst" cannot be counted ("wie viel Obst" is wrong for counting) → use "Früchte" in de count sentences ("Wie viele Früchte?"), "Obstsorten" never; fr "animaux / fruits / véhicules"; es "animales / frutas / vehículos"; pt "animais / frutas / veículos"; it "animali / frutti (or frutta, uncountable — use 'frutti') / veicoli"; nl "dieren / vruchten (not 'fruit', uncountable) / voertuigen"; sv "djur / frukter / fordon"; da "dyr / frugter / køretøjer"; no "dyr / frukter / kjøretøy"; fi "eläimet / hedelmät / kulkuneuvot" (fi needs the partitive in "kuinka monta eläintä?" and elative/partitive in "how many more": "kuinka monta eläintä enemmän kuin hedelmiä?") — author fi frames, never fill nominative plurals into a slot.
- "have the most" agreement: fr "Ce sont les animaux qui sont les plus nombreux", es "Hay más animales", etc. — the native reviewer rewrites each celebration as a whole sentence per category (3 categories × 4 frames = 12 short authored sentences per locale) rather than slotting.
- Ordering list "{c1}, then {c2}, then {c3}": conjunctions and list commas per locale (fr no Oxford comma; fi "ensin…, sitten…").
- "fly": the 2 × 2 rows are "things that fly / do not fly" — de "fliegen/fliegen nicht", fi "lentävät / eivät lennä"; the vehicle "boat" does not fly; the penguin is a bird that does not fly (true everywhere; the native reviewer confirms "duck flies" reads naturally — it does in all 11).
- "vehicle" is a formal word for 5-year-olds in some locales: es-MX "vehículos" is standard school vocabulary; sv "fordon", fi "kulkuneuvot" are the school words (the reviewer may prefer "ajoneuvot").
- `×` in "2 × 2": a settings label; fr/de use the same sign; fi "2 × 2" fine.

## 10. Sound off, access, phones
- Silent-legible: bounce-back and flashing labels (wrong chute), the growing tubes, lights, dashed lines, leaning tubes, pairing lines.
- Keyboard: during sorting, arrow keys move a focus ring across the chutes (2 × 2: across the four tubes), Enter drops; during questions Tab reaches the strip/tubes/Check, Space selects, arrows reorder a focused tube in order rounds.
- aria-live announces each drop ("cat — animals: 3") and each bounce ("not a vehicle").
- Taps: chutes ≥ 80 px, number tiles 52–56 px, tubes ≥ 80 px wide, Check 48 px.
- Pictures: the waiting object 104 px at 704 / 72 px at 360 — the picture the child judges is big; tube contents are graph marks (46 / 36 / 32 / 28 px) and are never the thing being identified (each was seen big on the belt first).
- Phone: tubes under the belt, strip in two rows, Check beside the strip's second row — above the 360 × 740 and 320 × 640 folds.
- prefers-reduced-motion: no roller spin, drops are instant.

## 11. Distinct from
- #254 The Picture Graph Shelf (other batch): drag from a tumbled table into horizontal shelf rows, the wrong row refuses; Grade 1 graph questions. Here: a conveyor delivers ONE object at a time (the anti-skip, anti-double-count mechanism), vertical glass tubes, ordering the categories by count (the third clause of K.MD.B.3, which the shelf does not do), and the 2 × 2 sky/ground table.
- `sorting-hoops` tool (two overlapping hoops with a hidden rule the hoop decides) and `class-graph` tool (votes → picture graph → bar graph): neither has a belt, chutes, given categories with a count question, or ordering by count.
- #225 The Sorting Cabinet (matrix reasoning: the missing cell by rule): reasoning about a rule, not counting categories.
- Registry: no built activity uses a conveyor, chutes or tubes.

## 12. Build plan
- **Core state**: `{round, belt:[items], current, tubes:{cat:[items]}, tubeOrder:[cats], question, answer, lights, misses}`; functions `nextOnBelt()`, `drop(cat|cell)` → `{ok}` (bounce if wrong), `undoTop(cat)`, `counts()`, `truth(question)` (from the pile literals), `judge(answer)`, `orderBreaks(tubeOrder)`, `pairing(a,b)`, `nextTask`.
- **Gate's own ground truth** (`verify-sorting-chutes-core.js`): re-counts every pile from the table text; asserts counts 1–7, distinct where the question compares, never already sorted at the start of order rounds, belt runs ≤ 3 of a kind, each object classified exactly once (100 random sort sessions: Σ tube sizes = pile size, no duplicates), answer values spread over the 1–10 strip, most/fewest tube position 30–70 %, every noun exists in a colour theme, label pictures never appear in a round, no fruits/cherry, plum, peach or apricot (apple look-alikes), penguin only in the "do not fly" cell.
- **Mutations**: plum back in a pile · wrong chute accepted · belt skips an object · undo removes a non-top object · count truth from the old 4-tile data · most judged by picture size · order already sorted at start · how-many-more answers the bigger count · tube slots scale with picture size · penguin classed as flying · number strip shuffled · de "Obst" in a count frame.
- **Local test**: real taps on chutes (right, wrong), drags of tubes, count-aid taps, every question type, both settings, 7 widths × 11 locales; asserts slot geometry equal across categories.
- **Contact sheet at build**: label sets (cow, lion, frog / blueberry, coconut, grapefruit / motorcycle, bicycle, ship) at 28 px; animals/bat, seagull, things-that-fly/parrot, vehicles/jet, rocket, tractor.
- **Risks**: 2 × 2 at 320 px is the tightest layout (80 px tubes, 28 px slots) — measured by the local test; fi case frames.
- Nothing BLOCKED.

## 13. The four questions
1. Yes — a conveyor belt and chutes are a toy; the tubes visibly race, and the penguin starts arguments.
2. Yes — it does all three clauses of K.MD.B.3 (classify, count, sort the categories by count), prevents skip/double counting by construction, and reaches into picture graphs, how-many-more and two-way sorting for seven worksheets.
3. Yes — library pictures, drawn machinery, no option tiles to guess from, nothing scored.
4. The mixed pile rides a conveyor one thing at a time down the right chutes, and the tubes become a picture graph to count, compare and put in order.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 3→5
What changed:
- Contact sheet: fruits/plum and fruits/peach are drawn as red apples (and fruits/apricot, a funnel label, as an orange apple). Five piles used them, so a child would sort an "apple" that the speaker and aria label call a plum — and some piles held three near-identical red apples. Replaced by raspberry, pineapple, kiwi, mango, strawberry, banana (every pile count unchanged, so every answer, the 1–10 value spread and the order rounds are untouched); the fruit label set is now blueberry, coconut, grapefruit. Gated, with a mutation.
- Re-checked every pile: counts 1–7, distinct where a question compares, max 7 slots (2 × 2 max 5); 2 × 2 sums ("things that fly" 4 and 7, "animals in all" 7) right; the penguin only in the ground row, the bat in the sky row.
- Checked on the contact sheet: animals/bat, seagull, penguin, owl, donkey, turtle; vehicles/jet, rocket, tractor, helicopter, airplane, boat; things-that-fly/parrot exists in the theme JSON (the local cache files it under "Things That Fly").
