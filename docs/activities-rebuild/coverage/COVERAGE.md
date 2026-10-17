# Worksheet → activity coverage (2026-10-17)

Every printable worksheet type (811 types in scripts/worksheet-gen/types/) belongs to one teaching point. A point is **covered** by an existing activity, **planned** for a new instrument in `../new/NEW-ORDER.md`, or **out of scope** (with the reason). Source of truth: `coverage-map.json`; gate: `node scripts/audit-activity-coverage.js` (fails on any worksheet type added later and never mapped). Totals: 288 teaching points — 113 covered, 164 planned (49 partial + 115 gap), 11 out of scope; 111 new instruments planned.

## Grade K — 84 teaching points, 271 worksheet types

| teaching point | worksheet types | status | by |
|---|---|---|---|
| Count a set (scattered, framed, in an array) and name / write / match the number, to 10–20 | 7 | covered | `ten-frame.how-many.0-10.animals`, `choice-board.how-many-group.k-c-c-b-5`, `ten-frame.write-numeral.0-20.fruits`, `rivets-number-forge.numeral-album.k-cc-a-3` |
| Make a set of a given number (fill the frame, colour exactly N) | 2 | covered | `ten-frame.count-to-10.make-n.animals`, `mochi-feast.count-out.k-cc-b-5`, `mamas-roll-call.numeral-trace.k-cc-b-5` |
| One-to-one correspondence: give each one a partner | 1 | covered | `choice-board.which-more.k-c-c-6`, `twinsies.count-twin.k-cc-b-5` |
| Compare two groups: more, fewer, equal (incl. comparing the letter counts of two names) | 4 | covered | `choice-board.which-more.k-c-c-6`, `friendship-bridge.compare-balance.k-cc-c-6` |
| Represent a count with tally marks (bundles of five) and read a tally back as a number | 3 | planned (gap) | #206 `tally-fence` |
| Odd or even by pairing up: one left over means odd | 1 | covered | `choice-board.even-odd.2-oa-c-3` |
| Subitize: recognise small quantities and dot / dice / frame arrangements at a glance | 2 | covered | `choice-board.how-many-group.k-c-c-b-5` |
| Fill missing numbers in a count-along strip to 10 / 20 (count forward) | 2 | covered | `choice-board.next-number.k-cc-a-2`, `star-stitcher.connect-sequence.k-cc-a-2` |
| Name the number before / after / between, and count backward from 10 | 4 | planned (gap) | #205 `hopscotch-back` |
| Join numbered dots in counting order (1–10, 11–20, count on from 11 to 30) | 4 | covered | `star-stitcher.connect-sequence.k-cc-a-2` |
| Trace and write the numerals 0–9 and 11–20 | 6 | covered | `digby-number-trace.numeral-formation.k-cc-a-3`, `rivets-number-forge.numeral-album.k-cc-a-3` |
| Ordinal numbers: find / name the 1st–10th in a line, counting from the marked end (either end) | 4 | planned (gap) | #207 `bus-queue` |
| Estimate a quantity, then check by counting | 1 | covered | `wondering-jar.estimate-jar.k-cc-b-5` |
| How many altogether: put two groups together and count all | 1 | covered | `ten-frame.show-the-operation.k-oa-a-1`, `ten-frame.solve-the-story.k-oa-a-2` |
| Number bonds: decompose numbers to 10 into two parts, find the missing part or the whole, make ten | 9 | covered | `numberbond.make-ten.k-oa-a-4`, `chuffer.rail-decompose.k-oa-a-3`, `clunks-lost-lunch.make-total.k-oa-a-3`, `match-pairs.make-the-number.k-oa-a-3`, `numberbond.find-the-total.1-oa-a-1` |
| Number bonds to 20 | 1 | covered | `numberbond.find-the-total.1-oa-a-1`, `ten-stones.add-sub-within-20.1-oa-c-6` |
| Add and subtract fluently (within 5 / 10 / 20) — the colour-by-code math sheets | 3 | covered | `ten-frame.quick-facts-to-5.k-oa-a-5`, `ten-frame.show-the-operation.k-oa-a-1`, `ten-stones.add-sub-within-20.1-oa-c-6` |
| Find the biggest / tallest / longest (and all the big ones) in a row, incl. shapes | 5 | covered | `choice-board.compare-length.k-md-2`, `choice-board.describe-attribute.k-md-a-1` |
| Seriate 3–5 pictures by size or height (smallest → biggest, shortest → tallest) | 3 | planned (partial) | #208 `size-risers` (partly: `seriation.compare-length.1-md-a-1`) |
| Compare weight: which is heavier / lighter, knowing that bigger is not always heavier | 1 | planned (gap) | #209 `market-scale` |
| Visual discrimination: find the identical twins, the pairs, and the one that differs (in detail, size or shape) | 6 | planned (gap) | #229 `pairing-pegs` |
| Which one does not belong (by category) | 1 | covered | `ziggy-odd-one-out.category.l-1-5-a`, `mims-baskets.category-sort.l-k-5-a` |
| Repeating patterns AB / ABC / AABB by picture, size, position and shape — extend, fill the missing element — and growing patterns | 8 | planned (gap) | #226 `bunting-repeat` |
| Complete a picture grid: each row holds one kind; find the piece that fits the gap | 1 | planned (gap) | #225 `logic-cabinet` |
| Match a picture to its shadow; recognise a whole picture from a part (visual closure) | 2 | planned (gap) | #227 `shadow-lamp` |
| Recognise the mirror image (reflection) of a picture | 1 | planned (gap) | #228 `fold-mirror` |
| Search a busy scene for every one like the target (pictures, shapes; the shape of everyday objects) | 3 | planned (gap) | #230 `search-lens` |
| Count each kind in a mixed scene (classify, then count) | 2 | covered | `choice-board.sort-count.k-md-b-3` |
| Compare two pictures and find what changed / what is missing | 6 | out of scope | Already interactive: the b7 find-the-differences decks (242 + the 2,244-deck level set) each ship a tap-the-differences screen with a key; an activity would duplicate that screen. Careful visual comparison is also trained by the proposed pairing-pegs. |
| Position words: on / under / beside, left / right, top / middle / bottom, inside / outside | 4 | planned (partial) | #211 `toy-box-room` (partly: `parking-tower.place-by-relation.k-g-a-1`) |
| Name 2D shapes in any orientation or proportion; follow a shape-coded key; count triangles and squares in a figure | 4 | covered | `pip-museum.curate-wing.k-g-a-2`, `choice-board.shape-id.k-g-a-2` |
| Count the sides of a shape; sort shapes by number of sides | 2 | covered | `choice-board.count-sides.k-g-b-4`, `sort-bins.sort-by-sides.2-g-a-1` |
| Compose shapes from pieces (tangram figures; where two or three pieces meet) | 2 | covered | `shapeforge.compose.1-g-a-2` |
| Draw / build named shapes on dot paper (sides and corners) | 1 | planned (gap) | #212 `geoboard-band` |
| Match a side view to the view from above (the first map skill) | 1 | planned (gap) | #244 `rising-camera` |
| Copy a picture square by square onto an empty grid (with and without letter–number labels) | 4 | planned (gap) | #224 `tile-twin` |
| Pre-writing strokes: lines, slants, zigzags, waves, loops, spirals, shapes, picture-to-picture paths | 9 | planned (gap) | #222 `pencil-path` |
| Trace capital and lowercase letters A–Z | 12 | covered | `penny-alphabet-trace.letter-formation.l-k-1-a`, `snippy.letter-formation.l-k-1-a` |
| Trace and copy whole words (first words, long words, capitals, sight words) and short sentences, left to right with spaces between words | 15 | planned (partial) | #218 `word-ribbon` (partly: `penny-alphabet-trace.letter-formation.l-k-1-a`, `snippy.letter-formation.l-k-1-a`) |
| Read sight words alone and in sentences; find a sight word among look-alikes | 3 | covered | `choice-board.read-sight-word.rf-k-3-c`, `choice-board.tell-words-apart.rf-k-3-c` |
| Identify and sort by the beginning sound (letter of the week, m or n) | 4 | covered | `choice-board.beginning-sound.rf-k-3-a` |
| Hear a sound at the beginning, middle or end; ending sounds; the middle vowel | 4 | covered | `sound-boxes.phoneme-position.rf-k-2-d` |
| Segment a word into its sounds — one sound per box, count the sounds, two letters for one sound share one box | 3 | planned (partial) | #214 `sound-slide` (partly: `sound-boxes.phoneme-position.rf-k-2-d`, `cvc-builder.build-cvc-word.rf-k-3`) |
| Match capital and small letters | 1 | covered | `choice-board.letter-case.rf-k-1-d` |
| Find every copy of a letter among look-alikes (b / d / p / q); circle and count a letter inside words | 2 | planned (partial) | #230 `search-lens` (partly: `choice-board.letter-case.rf-k-1-d`) |
| Alphabetical order: fill the missing letters, join dots a to t | 2 | planned (gap) | #213 `alphabet-lockers` |
| Build / complete CVC words from letters | 2 | covered | `cvc-builder.build-cvc-word.rf-k-3` |
| Match a word to the picture it names (picture-word cards, memory pairs) | 3 | covered | `choice-board.read-cvc-word.rf-k-3`, `bingo-word-hunt.read-match.rf-k-3-d` |
| Tell vowels from consonants | 1 | planned (gap) | #216 `vowel-keystone` |
| Hear rhymes: rhyming pairs, rhyme or not | 2 | covered | `rhyme-shop.rhyme.rf-k-2-a` |
| Count the syllables in a word; sort pictures by syllable count | 2 | planned (partial) | #215 `syllable-drum` (partly: `syllable-builder.build-words-from-syllables.rf-k-2-b`) |
| Hear the digraph (sh / ch) at the start of a word | 1 | covered | `cvc-builder.build-blend-word.rf-1-3` |
| One and many: singular and plural nouns | 7 | covered | `daisy-plate-stack.plurals.l-k-1-c` |
| Choose the article for a noun (en a / an; de der / die / das; fr le / la …) | 4 | planned (gap) | #217 `article-caps` |
| Match opposites with pictures | 1 | covered | `opposites.antonyms.k-l-5-b` |
| Sort pictures into two or more groups by category (incl. cut-and-paste sorts) | 4 | covered | `mims-baskets.category-sort.l-k-5-a` |
| Recognise feelings in faces, match face to feeling word, comfortable vs uncomfortable feelings, name how I feel | 6 | planned (gap) | #246 `face-dial` |
| Days of the week in order; fill the missing days | 2 | planned (gap) | #210 `sleeps-calendar` |
| The four seasons: sort pictures and clothes by season, the seasons in order (the cycle), what does not belong, a tree through the year | 6 | planned (gap) | #238 `season-wheel` |
| Weather symbols and words; a week of weather; cold / warm / hot on a thermometer; hot and cold things | 4 | planned (gap) | #239 `weather-window` |
| Day and night: what belongs to the day sky and to the night | 1 | planned (gap) | #239 `weather-window` |
| Put story pictures in order (first, next, last) | 2 | covered | `wake-up-pip.retell-story.rl-k-2`, `story-spine.role.rl-k-3` |
| Healthy habits: hand-washing steps in order; which tool for which body-care job (toothbrush, soap, comb, tissue) | 2 | planned (gap) | #220 `wash-basin` |
| Read the traffic light / pedestrian signal and cross the road in the right steps (stop, look, listen, cross) | 3 | planned (gap) | #223 `zebra-crossing` |
| The five senses: which body part we use for each experience | 1 | planned (gap) | #232 `sense-face` |
| Parts of the body: name and label them, how many of each, which come in twos, what is missing | 6 | planned (gap) | #219 `body-map` |
| Living and non-living things | 1 | planned (gap) | #242 `life-test` |
| Natural or made by people | 1 | planned (gap) | #234 `where-from-thread` |
| Fruits and vegetables (which part of the plant we eat) | 1 | planned (partial) | #231 `plant-builder` (partly: `mims-baskets.category-sort.l-k-5-a`) |
| Everyday foods and sometimes foods | 1 | planned (gap) | #221 `everyday-plate` |
| Pets, farm and wild animals; where animals live (animal homes) | 3 | planned (gap) | #240 `home-finder` |
| Animal babies and their parents (alike and different) | 1 | planned (gap) | #233 `mother-and-baby` |
| Land, water and air transport; things that fly | 2 | planned (gap) | #247 `three-lanes` |
| Wants and needs | 1 | planned (gap) | #245 `needs-backpack` |
| Community helpers and the tools they use | 1 | planned (gap) | #236 `helper-dispatch` |
| Recycling: which bin each finished thing goes in | 3 | planned (gap) | #241 `bin-windows` |
| What plants need to grow (water and light) | 1 | planned (gap) | #243 `window-sill-pot` |
| Things that float and things that sink | 1 | planned (gap) | #235 `water-tub` |
| Family members and family words (mother, grandfather, brother …) on a family tree | 2 | planned (gap) | #237 `family-tree-frames` |
| All about me: self-portrait, my favourite things, things I can do (personal expression) | 3 | out of scope | Open-ended personal expression (draw yourself, pick YOUR favourite, tick what YOU can do) has no single right answer, which the activity law requires; the countable faces of the family (K-343, K-346) and the labelling face (K-344) are mapped to their skills. |
| Bilingual picture word cards for a word wall | 1 | out of scope | A print artefact (cut-out cards in two languages for the classroom wall); the reading skill is covered by word-picture-match, and every activity already ships in 11 locales. |
| Draw a picture step by step (simple shapes, trace then draw, finish the drawing, draw and write) | 5 | out of scope | Free drawing has no checkable answer and no drawing recognition is available; the pencil control it practises is covered by the proposed pencil-path, shape composing by shapeforge. |
| Colour by number / colour pictures and scenes by a numeral key | 3 | out of scope | Already interactive: the CBN decks (2,200 + b7) ship a tap-to-colour screen with a key. Numeral recognition itself is covered by Letterbox Street / Jar Label. |
| Mazes and handmade picture mazes (incl. ABC, lowercase, numbers 1–20, beginning-sound and babies-and-mothers routes, maze colouring) | 13 | out of scope | Already interactive: every maze deck (b8 maze-puzzles, mzl level set) ships a trace-path "draw the way" screen with a key. The content inside the themed faces is covered by its own skill: alphabet order (alphabet-lockers), numbers to 20 (constellation), beginning sounds (choice-board.beginning-sound), mothers and babies (mother-and-baby). |

## Grade 1 — 75 teaching points, 265 worksheet types

| teaching point | worksheet types | status | by |
|---|---|---|---|
| Add two groups within 10-12 using a picture, ten-frame, domino or dice model | 5 | covered | `ten-frame.show-the-operation.k-oa-a-1`, `numberbond.find-the-total.1-oa-a-1`, `ten-frame.quick-facts-to-5.k-oa-a-5` |
| Subtract within 10 by crossing out (take-away) a picture model | 2 | covered | `ten-frame.show-the-operation.k-oa-a-1`, `ten-frame.solve-the-story.k-oa-a-2` |
| Find the partner that makes 10 (number bonds to 10) | 2 | covered | `numberbond.make-ten.k-oa-a-4`, `numberbond.make-ten-to-add.1-oa-c-6` |
| Add three groups / three numbers | 1 | covered | `numberbond.add-three.1-oa-a-2`, `tally-squirrel.add-four.2-nbt-b-6` |
| Use three related numbers to write the four facts of a fact family (addition and subtraction are inverse) | 6 | planned (partial) | #248 `fact-family-bar` (partly: `numberbond.subtraction-unknown-addend.1-oa-b-4`, `match-pairs.add-it-both-ways.1-oa-b-3`, `match-pairs.addition-and-subtraction-pairs.1-oa-d-7`) |
| Find the unknown in an addition/subtraction equation within 10/20 (pictures or numbers) | 3 | covered | `fix-it-corner.missing-part.1-oa-d-8`, `sharing-jar.make-fair.1-oa-d-8`, `match-pairs.find-the-missing-number.1-oa-d-8`, `numberbond.subtraction-unknown-addend.1-oa-b-4` |
| Add and subtract within 20 mentally (fluency, make-a-ten strategy) | 5 | covered | `ten-stones.add-sub-within-20.1-oa-c-6`, `numberbond.make-ten-to-add.1-oa-c-6`, `match-pairs.match-facts-to-20.2-oa-b-2`, `numbers-court.judge-balance.1-oa-d-7` |
| Add and subtract by counting on / back with hops on a number line; count back from 20 | 5 | covered | `hoppers-number-line.jump-sums.2-md-b-6`, `star-stitcher.connect-sequence.k-cc-a-2`, `track-repair.count-to-120.1-nbt-a-1` |
| Solve add/subtract word problems within 10/20 using pictures | 5 | covered | `vet-diagnosis.word-problems.1-oa-a-1`, `ten-frame.solve-the-story.k-oa-a-2`, `numberbond.story-problem.2-oa-a-1` |
| Number walls: each brick is the sum of the two below; find a missing brick by subtracting; work top-down | 5 | planned (gap) | #250 `number-wall-bricks` |
| Doubles and halves of a group / number to 20 | 10 | planned (gap) | #249 `mirror-tray` |
| Odd and even: share a group fairly between two / circle in pairs; is anything left over? | 3 | covered | `choice-board.even-odd.2-oa-c-3` |
| Read and build two-digit numbers as tens and ones (rods and cubes); expanded form | 4 | covered | `place-value.tens-and-ones.1-nbt-b-2`, `bos-berry-pantry.slingshot-tens.1-nbt-b-2`, `bundle-bot.bundle-machine.1-nbt-b-2-a`, `place-value.expanded-form.2-nbt-a-3` |
| Represent one number many ways (tens/ones, ten frame, tally, 10 more/less, number words) | 4 | covered | `place-value.tens-and-ones.1-nbt-b-2`, `ten-frame.teen-numbers.make-n`, `choice-board.ten-more-less.1-nbt-c-5` |
| Find 1 more / 1 less and 10 more / 10 less than a number | 2 | covered | `choice-board.ten-more-less.1-nbt-c-5`, `choice-board.next-number.k-cc-a-2`, `comet-kangaroo.tens-hundreds.2-nbt-b-8` |
| Skip count by 2s, 5s and 10s, with equal groups (running total) and on a number line whose ticks are worth 5 or 10 | 9 | planned (partial) | #252 `washing-line` (partly: `skipcount.fill.2-nbt-a-2`, `posy-egg-cartons.count-tens.k-cc-a-1`) |
| Hundreds-chart structure: missing numbers, puzzle pieces (+1 right, +10 down), find the wrong number, colour a counting pattern | 5 | planned (gap) | #251 `chart-patches` |
| Locate / read a number on a number line from the nearest printed number (0-10, 0-20 sparse labels, 0-30, 0-50, 20-40) | 7 | covered | `track-repair.count-to-120.1-nbt-a-1` |
| Compare two-digit numbers (and picture groups) with > < =, and order three numbers least-to-greatest / greatest-to-least | 4 | covered | `choice-board.compare-two-digit.1-nbt-b-3`, `nesting-pots.seriate.k-cc-c-7`, `friendship-bridge.compare-balance.k-cc-c-6` |
| Read and write number words to 20, tens words to 100, words to 50; match numerals to words | 6 | planned (gap) | #253 `number-name-builder` |
| Measure length with unit cubes/squares and order three objects by length | 2 | covered | `lay-units.measure.1-md-a-2`, `seriation.compare-length.1-md-a-1` |
| Tell time to the hour and half hour; match analog to digital | 3 | covered | `clock-digital.read-hour.1-md-b-3`, `clock-digital.read-half-hour.1-md-b-3`, `clock-read.tell-time.1-md-b-3`, `clock-digital.match-clocks.2-md-c-7` |
| Draw (set) the clock hands for o'clock, half past, quarter hours, five minutes, mixed | 6 | covered | `clock.set-clock.1-md-b-3`, `clock.tell-time-5-min.2-md-c-7` |
| Count coins in a purse (one kind, two kinds, all coins) and compare two purses | 6 | covered | `coin-stall.money.2-md-c-8`, `money.count-out.2-md-c-8` |
| Read a bar graph, find the tallest bar, colour a bar graph from counts | 3 | covered | `graph-it.bar-graph.2-md-d-10` |
| Sort a mixed set into a table, read a picture graph (one picture per thing), find the most, how many more | 3 | planned (partial) | #254 `picture-graph-shelf` (partly: `choice-board.sort-count.k-md-b-3`, `graph-it.bar-graph.2-md-d-10`) |
| Name 2D shapes, tell real from not-real by defining attributes, shape riddles | 3 | covered | `sort-bins.defining-attributes.1-g-a-1`, `choice-board.shape-id.k-g-a-2`, `pip-museum.curate-wing.k-g-a-2`, `choice-board.count-sides.k-g-b-4` |
| Compose figures from tangram pieces; find the missing piece | 2 | covered | `shapeforge.compose.1-g-a-2` |
| Complete a repeating pattern with two missing items | 1 | planned (gap) | #226 `bunting-repeat` |
| Picture analogies: A is to B as C is to ? | 1 | planned (gap) | #259 `same-way-machine` |
| 4x4 picture sudoku: every row, column and box has each picture once | 1 | planned (gap) | #261 `sudoku-garden` |
| Logic grid with picture clues (cross out / circle what each child has) | 1 | planned (gap) | #260 `clue-table` |
| Sort pictures into three groups | 1 | covered | `mims-baskets.category-sort.l-k-5-a`, `choice-board.sort-count.k-md-b-3`, `olive-kind-of.category-attribute.l-1-5-b` |
| Copy a picture square by square onto an empty grid (visual-spatial, row/column tracking) | 1 | planned (gap) | #224 `tile-twin` |
| Follow drawing steps, draw a figure in a scene, order drawing steps, copy each step | 3 | out of scope | Freehand drawing with a pencil; the screen has no drawing recognition, and the one transferable part (copying on a grid) is the grid-copy point. Ordering steps (G1-418) is sequencing, practised by the story-sequencing activities. |
| Visual discrimination: find 7 differences, how many differences, what changed (tick the words), mirror differences | 4 | out of scope | Every find-the-differences deck already ships a tap-the-differences screen with an answer key (b7 flagship, interactive printable family); an activity would duplicate it. |
| Picture mazes: big picture, underground, shortest way in town, tangled lines, collect the carrots, avoid the walruses | 6 | out of scope | Every handmade-maze deck already ships a draw-the-way (trace-path) screen with per-face hints (b8); an activity would duplicate it. The maze faces with a content skill (G1-426 ABC, G1-427 make 10, G1-428 subtraction) are placed under those skills. |
| Spell picture words (with first letter, word bank, letter boxes, plain lines) | 8 | covered | `word-clinic.spell-by-ear.l-1-2-e`, `cvc-builder.build-cvc-word.rf-k-3`, `cvc-builder.build-blend-word.rf-1-3` |
| Put words in ABC order by first letter, and by second letter when the first is the same; hop the letters in order | 5 | planned (gap) | #213 `alphabet-lockers` |
| Clap and split words into syllables, missing syllable, syllable scramble, 2 or 3 syllables, syllable cards | 7 | covered | `domino-two-part.two-syllable.rf-1-3-e`, `syllable-builder.build-words-from-syllables.rf-k-2-b`, `sound-boxes.phoneme-position.rf-k-2-d` |
| Every syllable has a vowel (find the vowel in each syllable) | 1 | planned (gap) | #255 `vowel-scoops` |
| Read word-family / syllable words (carpet), join syllables, words with blends, read syllabified words and find the picture | 6 | covered | `choice-board.read-cvc-word.rf-k-3`, `cvc-builder.build-blend-word.rf-1-3`, `domino-two-part.two-syllable.rf-1-3-e`, `bingo-word-hunt.read-match.rf-k-3-d` |
| Segment a word into its sounds (sound boxes) and blend sounds into a word | 2 | covered | `sound-boxes.phoneme-position.rf-k-2-d`, `choice-board.onset-rime-blend.rf-k-2-c`, `cvc-builder.build-cvc-word.rf-k-3`, `stretch-giraffe.long-short-vowel.rf-1-2-a` |
| Consonant digraphs sh/ch/th: hear the letter team, write it, read and match, where in the word; sound of the week | 5 | covered | `cvc-builder.build-blend-word.rf-1-3`, `sound-boxes.phoneme-position.rf-k-2-d`, `choice-board.beginning-sound.rf-k-3-a` |
| Hear, sort, finish and produce rhymes | 5 | covered | `rhyme-shop.rhyme.rf-k-2-a` |
| Put scrambled words into a sentence with a capital and an end mark | 4 | covered | `sentence-builder.build-a-sentence.l-1-1-j` |
| Sort nouns by the article in front (a/an; der/die/das; en/ett; un/une ...) | 1 | planned (gap) | #217 `article-caps` |
| Nouns vs verbs; nouns vs adjectives | 2 | planned (partial) | #257 `word-class-frames` (partly: `wordclass.adjective-adverb.l-2-1-e`) |
| Opposites: write / pair / choose the opposite, opposites in a sentence | 4 | covered | `opposites.antonyms.k-l-5-b` |
| Two words, one picture: words that mean the same | 1 | planned (gap) | #258 `synonym-swap` |
| Order words from weakest to strongest | 1 | covered | `shades.pick.l-1-5-d`, `roary-roar-meter.shades.l-2-5-b` |
| Find the word built from a root (picture word) | 1 | covered | `sage-root-garden.roots.l-2-4-c`, `syllable-builder.build-endings.rf-1-3-f` |
| Fill the blank in a sentence from a word bank / choose the word / match the sentence to the picture | 4 | covered | `mending-basket.mend-page.rf-1-4-a`, `fern-clue-garden.context-clues.l-2-4-a`, `otto-picture-book.which-picture.rl-k-7` |
| Personal pronouns: replace a name, sort names into he/she/they | 3 | covered | `pronoun.case.l-1-1-d` |
| Who / what / where: choose, fill in, match question to answer, sort answers | 4 | covered | `wren-question-window.question-words.l-k-1-d` |
| Read a sentence and do exactly what it says: colour N pictures a colour, two-step instructions, by place (first/second/between), true or false, read and draw | 12 | planned (partial) | #256 `instruction-paintbox` (partly: `mending-basket.mend-page.rf-1-4-a`, `otto-picture-book.which-picture.rl-k-7`) |
| Ordinal numbers: write the missing ordinals, match ordinal words, which place, who wins the race | 4 | planned (gap) | #207 `bus-queue` |
| Yesterday/today/tomorrow, months in order, month before/after, day abbreviations, months and seasons | 4 | planned (gap) | #210 `sleeps-calendar` |
| Sequence a story: what happens next, draw the middle, order sentences to pictures | 3 | covered | `wake-up-pip.retell-story.rl-k-2`, `story-spine.role.rl-k-3`, `picture-story.read.rl-k-1` |
| Classify animals into groups (mammal, bird, fish, reptile, insect) by body covering (fur, feathers, scales, smooth skin) | 2 | planned (gap) | #263 `covering-lens` |
| Where animals live, who does not live here, what animals eat, what animals need (food and a home) | 5 | planned (gap) | #240 `home-finder` |
| Life cycles in order: chicken, butterfly, frog, plant; what comes next | 5 | planned (gap) | #264 `cycle-wheel` |
| Predict and test sink or float; heavier does not mean it sinks (balance scale) | 3 | planned (gap) | #235 `water-tub` |
| Sort foods into the four food groups | 1 | planned (gap) | #221 `everyday-plate` |
| Which sense for each thing: sort by sense, choose the body part, odd one out, write the sense word, I can hear / see ... | 5 | planned (gap) | #232 `sense-face` |
| Name the parts of the body (label the figure) | 1 | planned (gap) | #219 `body-map` |
| Weather symbols and words; read a weekly forecast | 2 | planned (gap) | #239 `weather-window` |
| What is it made of (paper, plastic, glass, metal, wood); things I recycle | 2 | planned (gap) | #265 `material-test-bench` |
| Sun, Earth or Moon facts; moon phases in order (growing / shrinking) | 2 | planned (gap) | #262 `moon-lamp` |
| Name the parts of a plant (root, stem, leaf, flower) and what each does | 1 | planned (gap) | #231 `plant-builder` |
| Read a map key: find each symbol on the map and count them | 1 | planned (gap) | #266 `map-key-lens` |
| Road safety: traffic signs and what they mean | 1 | planned (gap) | #223 `zebra-crossing` |
| Family generations oldest to youngest; read clues to fill a family tree; my own family tree | 3 | planned (gap) | #237 `family-tree-frames` |
| Brushing teeth before/during/after; stop the germs (the healthy choice); weekly habit chart | 3 | planned (gap) | #220 `wash-basin` |
| Yesterday/today/tomorrow, months in order, month before/after, day abbreviations, months and seasons (part moved to season-wheel) | 1 | planned (gap) | #238 `season-wheel` |

## Grade 2 — 75 teaching points, 181 worksheet types

| teaching point | worksheet types | status | by |
|---|---|---|---|
| Add two groups of base-ten blocks within 1000 and write the total | 1 | covered | `place-value-regroup.add-compose-hundred.2-nbt-b-7`, `place-value-regroup.add-compose-ten.1-nbt-c-4` |
| Take away base-ten blocks within 1000 | 1 | covered | `place-value-regroup.subtract-decompose.2-nbt-b-7`, `place-value-regroup.subtract-decompose-hundred.2-nbt-b-7` |
| Bundle 10 ones into a ten and read tens and ones | 1 | covered | `bundle-bot.bundle-machine.1-nbt-b-2-a`, `bos-berry-pantry.slingshot-tens.1-nbt-b-2` |
| Skip count by 5s, 10s and 100s (incl. the dot-to-dot and maze practice formats) | 3 | covered | `skipcount.fill.2-nbt-a-2`, `posy-egg-cartons.count-tens.k-cc-a-1` |
| Skip count by 3s and by 4s and fill the missing numbers | 2 | planned (gap) | #252 `washing-line` (partly: `skipcount.fill.2-nbt-a-2`) |
| Count equal groups, write the repeated addition, then the multiplication sentence | 3 | covered | `array.equal-groups.2-oa-c-4`, `echo-grove.match-the-rune.3-oa-a-1` |
| Rows and columns of an array; match an array to a multiplication | 2 | covered | `array.build-array.2-oa-c-4`, `echo-grove.match-the-rune.3-oa-a-1`, `fractions.make-and-count-squares.2-g-a-2` |
| Share a pile equally into bins; count how many equal groups (division readiness) | 2 | covered | `maple-bakery.share.3-oa-a-2`, `winter-piles.draw-partition.2-oa-c-4` |
| Decide odd/even by pairing objects, as two equal addends (n + n or n + n + 1), and by the ones digit for numbers under 100 | 3 | covered | `choice-board.even-odd.2-oa-c-3` |
| Compare two 3-digit numbers with < > = and order four from smallest to greatest | 2 | covered | `match-pairs.compare-three-digit-numbers.2-nbt-a-4` |
| Round to the nearest ten on a number line and by the 5-or-more rule | 2 | covered | `halfway-harbors.nearest.3-nbt-a-1` |
| Read and build a 3-digit number from hundreds/tens/ones blocks and a place-value chart | 3 | covered | `place-value.hundreds-tens-and-ones.2-nbt-a-1` |
| Expanded form of a 3-digit number and the value of a digit | 2 | covered | `place-value.expanded-form.2-nbt-a-3`, `match-pairs.three-ways-to-show-a-number.2-nbt-a-3` |
| Find 100 more and 100 less | 1 | covered | `comet-kangaroo.tens-hundreds.2-nbt-b-8` |
| Partition shapes into halves, thirds and fourths; recognise equal vs unequal parts; match a picture to its fraction | 6 | covered | `fractions.partition-thirds.2-g-a-3`, `choice-board.fraction-noncongruent.2-g-a-3`, `fractions.partition-equal-shares.1-g-a-3`, `choice-board.fraction-equal-shares.1-g-a-3` |
| Find a fraction (1/2, 1/3, 1/4) of a set of pictures and say how many that is | 1 | planned (gap) | #268 `deal-tray` (partly: `maple-bakery.share.3-oa-a-2`) |
| Measure an object with a ruler starting at 0 | 1 | covered | `tildy.measure-ruler.2-md-a-1`, `choice-board.read-ruler.2-md-a-1` |
| Measure two objects and find how much longer | 1 | covered | `span-length-gap.how-much-longer.2-md-a-4` |
| Make a bar graph from a tally/data set and answer put-together and compare questions | 2 | covered | `graph-it.bar-graph.2-md-d-10` |
| Read and make a pictograph where each picture stands for 2 | 1 | planned (gap) | #272 `double-stamp` (partly: `graph-it.bar-graph.2-md-d-10`) |
| Read a line plot (X marks above numbers) | 1 | covered | `line-plot.read.2-md-d-9` |
| Sort 2D shapes by number of sides | 1 | covered | `sort-bins.sort-by-sides.2-g-a-1`, `choice-board.count-sides.k-g-b-4` |
| Count the faces, edges and vertices of cubes, prisms, pyramids, cylinders and cones | 3 | planned (gap) | #275 `ink-pad-solids` (partly: `choice-board.flat-solid.k-g-a-3`) |
| Match a solid (sphere, cube, cylinder, cone, rectangular prism, pyramid) to a real object of the same shape | 1 | planned (gap) | #275 `ink-pad-solids` (partly: `choice-board.flat-solid.k-g-a-3`, `pip-museum.curate-wing.k-g-a-2`) |
| Sort shapes into flat (2D) and solid (3D) | 1 | covered | `choice-board.flat-solid.k-g-a-3` |
| Decide whether a dashed line is a mirror line; pick the picture that is the same on both sides | 2 | planned (gap) | #285 `fold-press` |
| Complete a half-drawn grid picture so it is symmetrical (vertical and horizontal mirror lines) | 6 | planned (gap) | #285 `fold-press` |
| Tell time to 5 minutes and to the quarter hour | 2 | covered | `clock-digital.read-five-minute.2-md-c-7`, `clock-digital.read-quarter-hour.2-md-c-7`, `clock.tell-time-5-min.2-md-c-7` |
| Add and subtract 2- and 3-digit numbers in columns, ones first, writing the carried/borrowed digit | 6 | planned (partial) | #267 `carry-chute` (partly: `place-value-regroup.add-compose-ten.1-nbt-c-4`, `place-value-regroup.subtract-decompose.2-nbt-b-7`, `gus-snack-cart.within-100.2-nbt-b-5`) |
| Read the liquid in a measuring jug in millilitres (to 1000 and 2000 ml) | 2 | covered | `pond-juice.pour-measure.3-md-a-2` |
| Read mass in grams on a balance with weights and on a scale with small steps (incl. the mixed jug + scale sheets) | 3 | planned (partial) | #271 `gram-balance` (partly: `pond-juice.pour-measure.3-md-a-2`) |
| Add up shelf prices, decide whether there is enough money, find how much more, and make change | 8 | planned (partial) | #270 `wallet-bar` (partly: `money.make-change.2-md-c-8`, `coin-stall.money.2-md-c-8`, `money.count-out.2-md-c-8`) |
| Read a month calendar: weekday of a date, one week later, days between two dates | 5 | planned (gap) | #273 `week-drop-calendar` |
| Find a square by its letter-number code (B2) and colour it; write the code of a square | 4 | planned (gap) | #284 `crossing-lights` (partly: `parking-tower.place-by-relation.k-g-a-1`) |
| Locate a number on a number line that starts at 40 or 60 and labels only some ticks | 2 | planned (partial) | #269 `tick-comb` (partly: `track-repair.count-to-120.1-nbt-a-1`, `hoppers-number-line.jump-sums.2-md-b-6`) |
| Add/subtract within 100 in puzzle formats: number walls and the math maze | 2 | covered | `gus-snack-cart.within-100.2-nbt-b-5`, `tally-squirrel.add-four.2-nbt-b-6`, `fix-it-corner.missing-part.1-oa-d-8` |
| Move on a hundreds chart (down = 10 more, right = 1 more); find a square from two arrow paths; count the jumps between two numbers | 3 | planned (partial) | #251 `chart-patches` (partly: `choice-board.ten-more-less.1-nbt-c-5`, `comet-kangaroo.tens-hundreds.2-nbt-b-8`) |
| Solve a logic grid from yes/no/either-or clues (cross out what cannot be, check what must be) and read a solved grid | 3 | planned (gap) | #260 `clue-table` (partly: `ziggy-odd-one-out.category.l-1-5-a`) |
| Match a tangram solution to its shadow exactly, rejecting turned or flipped ones | 1 | planned (partial) | #274 `shadow-table` (partly: `shapeforge.compose.1-g-a-2`) |
| Read a short story and answer who/what/where/when/why with details from the text | 6 | planned (partial) | #276 `proof-highlighter` (partly: `picture-story.read.rl-k-1`, `marlo-magnifier.trait-evidence.rl-1-3`, `mending-basket.mend-page.rf-1-4-a`) |
| Capital letter and end mark; choose . or ?; split two run-together sentences | 5 | planned (partial) | #278 `full-stop-gate` (partly: `wally-capital-crane.special-names.l-2-2-a`, `sentence-clinic.fix-it.l-2-1`) |
| Sort words into nouns, verbs and adjectives (with and without picture help) | 4 | planned (partial) | #257 `word-class-frames` (partly: `wordclass.adjective-adverb.l-2-1-e`) |
| Write sentences about a picture using a word bank and sentence starters | 3 | planned (partial) | #280 `true-caption` (partly: `sentence-builder.build-a-sentence.l-1-1-j`) |
| Retell a picture story in order with time-order starters (First, Next, Then, At the end) | 1 | planned (partial) | #281 `film-strip` (partly: `wake-up-pip.retell-story.rl-k-2`, `story-spine.role.rl-k-3`) |
| Apply a position-dependent spelling rule (e.g. ck/k, tch/ch, -dge/-ge, ai/ay; -s/-es/-ies plurals): fill, spot and sort by the rule letters | 6 | planned (partial) | #279 `rule-stencil` (partly: `word-clinic.spell-by-ear.l-1-2-e`, `plural.irregular.l-2-1-b`) |
| Build, split and mean compound words (incl. the joining letter in de/nl/sv/da/no) | 6 | covered | `compound-meaning.predict.l-2-4-d` |
| Present and past forms incl. irregular be/have/do/go; choose the form for a sentence; find the verb | 6 | covered | `rusty-yesterday.irregular-past.l-2-1-d`, `tense.past-present-future.l-1-1-e`, `vera-verb-match.be-agreement.l-1-1-c` |
| Add a prefix to change meaning (un-, dis-, in-; re-, pre-, mis-) | 2 | covered | `affix.apply.l-2-4-b`, `opposites.antonyms.k-l-5-b` |
| Write the plural for more than one (regular and irregular) | 1 | covered | `plural.irregular.l-2-1-b`, `daisy-plate-stack.plurals.l-k-1-c` |
| Use the story context to choose the missing word | 1 | covered | `fern-clue-garden.context-clues.l-2-4-a`, `mending-basket.mend-page.rf-1-4-a` |
| Link a pronoun to its name; possessive pronouns; replace a name with a pronoun | 3 | covered | `pronoun.case.l-1-1-d`, `robin-mirror.reflexive.l-2-1-c` |
| Choose/write the question word that asks for a highlighted answer (who, where, why, how) | 2 | covered | `wren-question-window.question-words.l-k-1-d` |
| Match words that mean the same; pick a synonym for "said" | 2 | planned (partial) | #258 `synonym-swap` (partly: `roary-roar-meter.shades.l-2-5-b`, `shades.pick.l-1-5-d`) |
| Find the shared root word; sort words by root | 2 | covered | `sage-root-garden.roots.l-2-4-c` |
| Find and count a digraph (sh) in sentences | 1 | covered | `cvc-builder.build-blend-word.rf-1-3` |
| Write cursive lowercase letters, capitals, the joins between letters, and whole words | 4 | planned (gap) | #283 `cursive-ribbon` (partly: `penny-alphabet-trace.letter-formation.l-k-1-a`, `snippy.letter-formation.l-k-1-a`) |
| Read words written in cursive | 1 | planned (gap) | #283 `cursive-ribbon` |
| Gather true facts about an animal into a fact file (eats, lives, moves, body covering, babies) | 4 | planned (partial) | #282 `fact-cabinet` (partly: `atlas-fact-files.key-detail.ri-k-1`) |
| Compare two animals: which facts are the same and which are different | 1 | planned (gap) | #282 `fact-cabinet` (partly: `willow-story-corner.compare-tales.rl-k-9`) |
| Use clues one at a time to find a mystery animal | 1 | planned (gap) | #277 `clue-curtain` |
| Name plant parts, what each part does, and which part of a plant we eat | 2 | planned (gap) | #231 `plant-builder` |
| Order the butterfly life cycle and match young stages to the animal they become | 2 | planned (gap) | #264 `cycle-wheel` |
| Day and night come from the Earth turning toward or away from the Sun | 1 | planned (gap) | #262 `moon-lamp` |
| Name the phases of the Moon | 1 | planned (gap) | #262 `moon-lamp` |
| The four compass directions and using them on a map | 2 | planned (gap) | #286 `compass-walker` (partly: `parking-tower.place-by-relation.k-g-a-1`) |
| Name and locate the continents on a world map | 1 | planned (gap) | #287 `world-jigsaw` |
| Kinds of road signs (warning / must-not / information) and which sign fits a situation | 2 | planned (gap) | #223 `zebra-crossing` |
| Family words for relationships (aunt, cousin, grandmother) from riddles | 1 | planned (gap) | #237 `family-tree-frames` |
| Why we do healthy habits (what each habit protects) | 1 | planned (gap) | #220 `wash-basin` |
| Which animals and plants live in a habitat, and which body feature helps an animal live there | 2 | planned (gap) | #240 `home-finder` (partly: `mims-baskets.category-sort.l-k-5-a`) |
| Predict and test sink or float; changing shape (a clay boat) changes floating | 2 | planned (gap) | #235 `water-tub` |
| Group things by the material they are made of (paper, plastic, glass, metal, wood) for recycling | 1 | planned (gap) | #265 `material-test-bench` (partly: `ziggy-odd-one-out.category.l-1-5-a`) |
| Visual discrimination: find 10 differences; write a sentence about each difference | 2 | out of scope | Every find-the-differences deck already ships its own tap-the-differences screen + key (b7 / fd level set), so an activity would duplicate it; the writing half of G2-389 is the describe-a-picture skill (true-caption). |
| Draw by steps then write about it; draw from memory | 2 | out of scope | Free drawing cannot be checked on screen and its targets are fine motor (covered by the tracing activities and cursive-ribbon) and visual memory; the write-three-sentences half is the describe-a-picture skill (true-caption). |
| Match words that mean the same; pick a synonym for "said" (part moved to doing-stage) | 1 | planned (gap) | #311 `doing-stage` |

## Grade 3 — 54 teaching points, 94 worksheet types

| teaching point | worksheet types | status | by |
|---|---|---|---|
| Interpret a product as equal groups / an array and find the total | 2 | covered | `echo-grove.match-the-rune.3-oa-a-1`, `array.build-array.2-oa-c-4`, `array.equal-groups.2-oa-c-4` |
| Multiply as equal jumps from 0 on a number line (multiples) | 1 | planned (partial) | #288 `skip-rod` (partly: `hoppers-number-line.jump-sums.2-md-b-6`, `skipcount.fill.2-nbt-a-2`) |
| Divide by sharing a pile equally into a given number of groups | 1 | covered | `maple-bakery.share.3-oa-a-2` |
| Divide by measuring: how many equal hops back from N reach 0 | 1 | planned (partial) | #288 `skip-rod` (partly: `maple-bakery.share.3-oa-a-2`, `hoppers-number-line.jump-sums.2-md-b-6`) |
| Find an unknown factor and write the four related facts (division as an unknown-factor problem) | 3 | planned (partial) | #292 `array-frame` (partly: `echo-grove.match-the-rune.3-oa-a-1`, `maple-bakery.share.3-oa-a-2`) |
| Area of a rectangle = rows × columns (tiling becomes multiplication) | 1 | planned (partial) | #305 `tile-roller` (partly: `patchwork-meadow.tile.3-md-c-6`, `mosaic-menders.area-match.3-md-c-6`, `array.build-array.2-oa-c-4`) |
| a×b and b×a give the same total (turn the array) | 1 | planned (gap) | #291 `quarter-turn` |
| Name and shade a/b as a copies of the unit piece 1/b | 2 | covered | `fox-forge.fraction.3-nf-a-1`, `fractions.partition-equal-shares.1-g-a-3` |
| Place a fraction on a number line from 0 to 1 by counting equal spaces | 1 | planned (gap) | #301 `folding-strip` |
| Recognise equivalent fractions as the same amount | 2 | covered | `fraction-equiv.same-amount.3-nf-a-3` |
| Compare two fractions of the same whole (same numerator or same denominator) | 1 | planned (partial) | #302 `cutting-board` (partly: `fraction-equiv.same-amount.3-nf-a-3`) |
| Find a fraction of a group of objects (1/3 of 12) | 1 | planned (gap) | #268 `deal-tray` |
| Rebuild the whole from one unit-fraction piece | 1 | planned (partial) | #300 `piece-stamp` (partly: `fox-forge.fraction.3-nf-a-1`) |
| Partition shapes into equal areas and name each part as a unit fraction | 1 | covered | `choice-board.fraction-noncongruent.2-g-a-3`, `fractions.partition-thirds.2-g-a-3`, `choice-board.fraction-equal-shares.1-g-a-3` |
| Round to the nearest 10 and 100 (number line, halfway, up/down) | 5 | covered | `halfway-harbors.nearest.3-nbt-a-1` |
| Round both addends, add the rounded numbers, and judge whether an exact answer is reasonable | 1 | planned (partial) | #294 `estimate-flags` (partly: `halfway-harbors.nearest.3-nbt-a-1`, `gus-snack-cart.within-100.2-nbt-b-5`) |
| Compare four-digit numbers by place value from the left | 1 | covered | `match-pairs.compare-three-digit-numbers.2-nbt-a-4`, `choice-board.compare-two-digit.1-nbt-b-3` |
| Find the constant step of a growing or shrinking number pattern (incl. 25s, 50s, 100s) and continue it | 3 | planned (partial) | #297 `spring-frog` (partly: `skipcount.fill.2-nbt-a-2`, `track-repair.count-to-120.1-nbt-a-1`) |
| Find the rule of an input/output machine and apply it both ways | 1 | planned (gap) | #295 `number-machine` |
| Predict whether a sum is odd or even from the addends' parity, without adding | 1 | planned (partial) | #296 `spare-sock` (partly: `choice-board.even-odd.2-oa-c-3`) |
| Read and build scaled bar graphs and pictographs (one picture/step = 2, 5, 10) | 3 | planned (partial) | #272 `double-stamp` (partly: `graph-it.bar-graph.2-md-d-10`) |
| Measure to the half unit and show the data on a line plot marked in halves | 1 | planned (partial) | #304 `half-mark-plot` (partly: `line-plot.read.2-md-d-9`) |
| Find perimeter as the distance around a shape | 1 | covered | `mending-fences.mend-board.3-md-d-8` |
| Recognise rectangles with the same area but a different shape | 1 | covered | `mosaic-menders.area-match.3-md-c-6` |
| Same perimeter, different area (and the reverse) | 1 | planned (partial) | #306 `fence-loop` (partly: `mending-fences.mend-board.3-md-d-8`) |
| Classify quadrilaterals by attributes; squares are rectangles (and rhombuses) | 1 | planned (partial) | #308 `shape-sieve` (partly: `sort-bins.sort-by-sides.2-g-a-1`) |
| Recognise right angles (and angles smaller/bigger than a square corner) | 1 | planned (gap) | #309 `corner-card` |
| Find and count lines of symmetry | 1 | planned (gap) | #285 `fold-press` |
| Find how much time passed between two clock times | 1 | planned (partial) | #303 `time-ribbon` (partly: `clock-elapsed.what-time.3-md-a-1`, `clock-elapsed.add-subtract.3-md-a-1`) |
| Read an analog clock to the minute | 1 | covered | `clock-digital.read-minute.3-md-a-1` |
| Convert between 12-hour and 24-hour time | 1 | covered | `clock-convert.12-24.2-md-c-7` |
| Add or subtract minutes/hours to a clock time | 1 | covered | `clock-elapsed.add-subtract.3-md-a-1` |
| Read a thermometer whose scale counts by 2, 5 or 10 | 1 | planned (partial) | #313 `warm-tube` (partly: `pond-juice.pour-measure.3-md-a-2`) |
| Count unit cubes in a solid, including hidden ones (volume) | 1 | planned (gap) | #307 `cube-stacker` |
| Solve a 6×6 picture sudoku: each picture once in every row, column and box | 1 | planned (gap) | #261 `sudoku-garden` |
| Complete a magic square so every row and column has the same sum | 1 | planned (gap) | #298 `lantern-square` |
| The equal sign means both sides are the same amount; find the missing number with an operation on both sides | 1 | planned (partial) | #290 `even-beam` (partly: `numbers-court.judge-balance.1-oa-d-7`, `fix-it-corner.missing-part.1-oa-d-8`) |
| Classify by two attributes at once (two-circle Venn, row × column table, the missing cell) | 1 | planned (partial) | #312 `two-way-sort` (partly: `mims-baskets.category-sort.l-k-5-a`, `sort-bins.sort-by-sides.2-g-a-1`, `choice-board.sort-count.k-md-b-3`) |
| Add and subtract within 1000 with the written column method, carrying and borrowing (incl. across zeros) | 6 | planned (partial) | #267 `carry-chute` (partly: `place-value-regroup.add-compose-hundred.2-nbt-b-7`, `place-value-regroup.subtract-decompose.2-nbt-b-7`, `place-value-regroup.subtract-decompose-hundred.2-nbt-b-7`) |
| Know the multiplication tables 2-10 from memory, deriving unknown facts from neighbours | 10 | planned (partial) | #293 `table-ladder` (partly: `echo-grove.match-the-rune.3-oa-a-1`, `array.build-array.2-oa-c-4`) |
| Solve multiplication and division word problems by modelling groups vs group size (share vs make groups) | 7 | planned (partial) | #289 `story-tray` (partly: `maple-bakery.share.3-oa-a-2`, `vet-diagnosis.word-problems.1-oa-a-1`, `numberbond.story-problem.2-oa-a-1`) |
| Divide with a remainder; the remainder is always smaller than the divisor | 6 | planned (gap) | #299 `leftover-dealer` |
| Solve a logic grid from clues (cross out what cannot be, tick what must be) | 2 | planned (gap) | #260 `clue-table` |
| Name the stages of the water cycle: evaporation, condensation, precipitation, collection | 1 | planned (gap) | #315 `drop-journey` |
| Name the parts of a flower and what each does | 1 | planned (gap) | #231 `plant-builder` |
| Compare the butterfly and frog life cycles (true of one, the other, or both) | 1 | planned (gap) | #264 `cycle-wheel` |
| Order the planets from the Sun and sort them into rocky and giant planets | 2 | planned (gap) | #314 `orbit-rail` |
| Locate the seven continents and five oceans on a world map | 1 | planned (gap) | #287 `world-jigsaw` |
| Group verbs into word fields by meaning and tell close words apart (stroll/dash, glance/stare) | 1 | planned (partial) | #311 `doing-stage` (partly: `shades.pick.l-1-5-d`, `roary-roar-meter.shades.l-2-5-b`, `ziggy-odd-one-out.category.l-1-5-a`) |
| Form person words with a suffix (bake -> baker, run -> runner) and know what they mean | 1 | planned (partial) | #310 `word-press` (partly: `sage-root-garden.roots.l-2-4-c`, `affix.apply.l-2-4-b`) |
| Use a known root to choose the right family form for a sentence (bake / baker / baking / baked) | 1 | planned (partial) | #310 `word-press` (partly: `sage-root-garden.roots.l-2-4-c`) |
| Run a fair test: predict, test, record what happened and draw a conclusion (sink or float) | 1 | planned (gap) | #235 `water-tub` |
| Trace and copy a sentence in joined (cursive) handwriting | 1 | planned (gap) | #283 `cursive-ribbon` |
| Classify by two attributes at once (two-circle Venn, row × column table, the missing cell) (part moved to logic-cabinet) | 1 | planned (gap) | #225 `logic-cabinet` |
