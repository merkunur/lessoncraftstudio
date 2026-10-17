# Row 67 — Otto's Picture Book → THE PROOF PINS (RL.K.7)

## 0. Identity
- id `otto-picture-book.which-picture.rl-k-7` (KEPT; slugs/metadata frozen en..nl; sv/da/no/fi slug, title, intro new) · grade K · Common Core RL.K.7 (+ grade-1 read-and-do coverage) · strand Reading: Literature · own files `otto-pins-core.js`, `otto-pins-activity.js`, `otto-pins-activity.html`; manifest row stays in `otto-picture-book-activities.json` (same id, new params). `picture-moment-core.js` untouched.
- worksheets covered: G1-368 Match the Sentence to the Picture · G1-350 Fill in the Blank Sentences · G1-367 Choose the Word · G1-366 Letter Boxes (partly — see §6) · G1-242, G1-251, G1-252, G1-409, G1-410, G1-411 Read and Color (one sentence, four sentences, busy page, two sentences, mixed, stop at the number) · G1-308 Read and Do · G1-338 Read and Circle · G1-339 Two-Step · G1-340 First, Second, Between · G1-341 True or False · G1-342 Read and Draw (covered as "read and colour on a scene"; drawing itself stays a paper skill — §12).
- old activity: Otto read a 4-beat story; then one sentence; the child tapped which of the 4 emoji panels showed it. **Kept:** the four-moment stories and their captions (re-cast where the library has no picture — see §6), the target beats (b3, b2, b1, b4… balanced 2/2/2/2), the rule that every choice is a picture from the SAME story. **Gone:** emoji placeholder panels; Otto the hand-drawn owl (Otto is now the library `forest-creatures/owl`, a narrator badge only).

## 1. The pitch
"Every important word in the sentence is a pin on a string — drop the sentence under a picture and each pin flies to the thing it names; if the picture doesn't show it, that pin is left dangling."

## 2. Why a child will want it again
- The pins are a toy: the sentence strip has coloured beads under its key words; each bead trails a string, and when the strip is dropped the beads **fly** like darts into the picture — "thwip, thwip" — and stick to what they name. A dangling pin swings on its string, plainly empty-handed.
- Once a round is solved, the strip stays live: the child can slide it to the other pictures of the story and watch which pins fall off each one — "the boat is there, but the far bank is empty!" (post-success free play only — before the answer is committed the pins never fire, so they can never be used to find it).
- In the colouring tasks the child paints with real pots and the pins then *count and check* their painting: "3" pulls a little loop around three red balloons.
- Earned show per round: when every pin has stuck, the strings pull taut, the picture lifts slightly like a pinned photo, and Otto (library owl badge) stamps a little gold star sticker onto its corner (decorative, drawn star — no count of stars kept). After a pass, the "photo album" (a strip under the stage) holds the pinned pictures.

## 3. The skill and the misconception
- **Skill:** RL.K.7 — describe the relationship between illustrations and the story: which moment an illustration shows; and the grade-1 read-and-do sheets: read a sentence and check it against (or act it out on) a picture — nouns, numbers, colours, places, order words, two-step instructions, true/false.
- **Misconception 1 — "any picture with the right character fits".** All four pictures of a story show the same frog and the same boat; children match on the noun and ignore the detail ("reaches the other side"). **Pushback:** the place/detail word is a pin too — "other side" flies to the far bank; in three of the four pictures the boat is not there, so that pin dangles over an empty bank. The detail is what decides, and the material shows it.
- **Misconception 2 — reading the first word and guessing ("Colour… balloons" → colour every balloon).** **Pushback:** the number pin "3" draws a loop around exactly three painted balloons; a fourth red balloon stays outside the loop with a small grey ring around it ("not asked"). Stop-at-the-number is enforced by the loop's size.
- **Misconception 3 — "true" means "it's about the picture".** **Pushback:** in True or False the child decides first, then the pins fly: one dangling pin is exactly what makes the sentence false, and it shows which word.

## 4. The stage
At **704 px** (split: stage 470 px left, sentence column 214 px right):
- **Sentence strip** (right column, 200 × 120–180): the sentence in Nunito 20 px, ≤ 3 lines; under each key word a coloured bead (16 px) on a short string. Strips are draggable in "Which picture?"; fixed elsewhere. Otto (library `forest-creatures/owl`, 64 px) sits above the strip as narrator; tap Otto = read the sentence (TTS where available).
- **Stage by task:**
  - *Which picture?* — the story's 4 moments in a 2 × 2 grid (panels 220 × 160, gap 10); each panel = a drawn frame + ground line + 2–3 library pictures (actor 112 / thing 96 / sky 72). A small numeral 1–4 in each panel's corner = the story order (Otto read them in that order first).
  - *Fill the blank* — one scene panel 440 × 300 (pictures 120 px); the sentence in the strip has a blank box; three word tiles (120 × 48) under the strip.
  - *Read and colour* — a scene of 6–9 library things laid out in a row or two rows (each tile 96 × 96, a white disc behind each picture); six paint pots at the bottom (44 px circles: red, blue, yellow, green, orange, brown, each with a tiny pattern — dots, stripes, cross-hatch… — for colour-blind children). Painting = filling the disc behind a picture with that colour (the library picture itself is never recoloured).
  - *True or false?* — one scene panel 440 × 300 and two big tiles under the strip: ✓ and ✗ (64 × 64, symbols only).
- **Task lines (≤ 24 px):** Which "Put Otto's sentence under the picture that shows it." · Fill "Which word makes the sentence match the picture?" · Colour "Read and colour." · True/False "Is it true? Tap ✓ or ✗."
- No words on the apparatus except the sentence and word tiles (content). The numerals 1–4 are story order (content of RL.K.7's "which part").

At **360 px** (stacked): Otto + strip across the top (344 × 110, sentence 18 px); 2 × 2 grid of panels 168 × 124 (pictures 64 px; the sky slot merges into the corner at 56 px and never decides); single scenes 344 × 240; colour tiles 72 × 72 in rows of 4 (two rows up to 8; a 9-tile scene wraps to 3 rows of 3 at 96 × 72); pots 44 px in one row of 6 (6 × 52 = 312). Check above the 360×740 fold (110 + 262 + 60 = 432 for Which; colour: 110 + 230 + 56 = 396).

## 5. The hand
- **Which picture?** Drag the strip (it lifts within 50 ms); hovering over a panel makes it glow; **drop** → the strip docks under the panel with a soft click; the beads stay quietly on the strip (the panel border thickens to show where it docked). It can be moved to another panel freely. **Check** → the pins fire one by one (120 ms apart), each bead flying on a 220 ms arc to its target and sticking with a tick. A pin with no target in that panel flies to the panel's centre, finds nothing, falls back and swings on its string (600 ms damped swing). **Pins fire only on Check** — a strip that fired on every drop would let a child find the picture by sliding it around without reading a word. The panels carry **no captions** in this task (only their small story-order numerals); the sentence exists only on the strip.
- **Fill the blank:** drag a word tile into the blank (snap 120 ms); it can be replaced freely. On **Check** the chosen word's pin (and the sentence's other pins) fire into the scene: stick or dangle. Nothing fires before Check.
- **Read and colour:** tap a pot (it lifts, its colour rings the cursor/finger) → tap a tile: its disc fills with the colour (150 ms ripple). Tap again with the same colour → clears. Two-part sentences have two lines; each line's pins wait for Check.
- **True or false:** tap ✓ or ✗ (the tile presses in); then Check → pins fire.
- **Pins on Check (Colour):** the number pin draws a loop (string tightening into a lasso, 400 ms) around that many tiles matching noun AND colour; the noun pin taps each tile of that kind; the colour pin dips into the painted discs; place/order pins land on the one named tile (an arrow along the row from the row's start shows "first, second…", and "between" draws two short brackets from the two neighbours).
- **Free play:** paint freely before Check (Colour); after a solved Which round, slide the strip over the other panels and watch pins dangle. Undo: every action is reversible until Check.

## 6. The rounds
### A. Which picture? (RL.K.7, G1-368) — 8 stories × one target each (kept targets)
Panels are library pictures only; names kept from the old stories, now worn by library animals (the library has no consistent child figure). Key words (pins) in brackets.
| story | actor | b1 | b2 | b3 | b4 | target |
|---|---|---|---|---|---|---|
| boat | Finn = pets/frog | "Finn has a little boat." frog + toys/boat on the near bank | "Finn sets the boat on the [stream]." boat on the drawn water band, near side | "A gust of [wind] pushes the [boat]." weather/cloud with 3 drawn wind lines + boat mid-stream, tilted | "The boat reaches the [other side]." boat at the far bank | **b3** |
| acorn (replaces nest: the library nest already holds chicks and the Easter egg is painted) | forest-creatures/squirrel | "A squirrel finds an [acorn]." squirrel + miscellaneous/acorn | "She [buries] it in the [ground]." acorn below the ground line, squirrel above | "[Rain] falls on the ground." weather/rainy | "A little [bud] comes up." spring/bud on the ground line (the library bud is red — no colour word) | **b4** |
| sandcastle | Mae = pets/turtle | "Mae fills her [bucket] with sand." turtle + beach/bucket | "Mae builds a tall [sand castle]." + beach/sandcastle | "She puts a [shell] on [top]." + beach/seashell on the castle top | "The [sun] shines on her castle." + weather/sunny | **b2** |
| apple | Theo = forest-creatures/bear | "A red [apple] hangs in the [tree]." tree/apple | "Theo holds out a [basket]." bear + at-the-supermarket/basket under the tree | "The apple drops [into the basket]." fruits/apple inside the basket | "Theo takes a happy [bite]." bear + fruits/apple at the mouth | **b1** |
| raincoat (boots → raincoat: rain boots are cache-only) | Sam = farm-animals/dog | "[Rain] pours down outside." weather/rainy + miscellaneous/house | "Sam puts on his [raincoat]." dog + weather/raincoat | "Sam splashes in a big [puddle]." dog + raincoat + weather/puddle | "A [rainbow] fills the sky." weather/rainbow | **b4** |
| ball (teddy bear → ball: teddy bear is cache-only) | Bo = forest-creatures/rabbit | "Bo cannot find his ball." rabbit + emotions/sad badge | "Bo looks under the [bed]." rabbit + furniture/bed | "He shines a [flashlight]." rabbit + tools/flashlight | "Bo finds his [ball] at last!" rabbit + toys/ball | **b2** |
| snowman | Lina = winter/penguin | "Soft [snow] falls on the yard." winter/snowflake ×3 + miscellaneous/house | "Lina makes a big [snowman]." penguin + winter/snowman | "She wraps a [scarf] around it." snowman + weather/scarf | "Lina cheers at her snowman." penguin + snowman with scarf + emotions/excited badge | **b3** |
| butterfly | — | "A [caterpillar] munches a [leaf]." insects-and-bugs/caterpillar + spring/leaf | "It rests on the leaf at [night]." caterpillar + leaf + camping/moon | "It turns into a [butterfly]." insects-and-bugs/butterfly + leaf | "The butterfly visits a [flower]." butterfly + flowers/zinnia | **b1** |
Targets: b1 ×2, b2 ×2, b3 ×2, b4 ×2 — balanced. The grid position of the target varies by story; the gate asserts each grid cell holds the target 2 of 8 times. Every distractor panel must make at least one pin dangle (the gate computes it).

### B. Fill the blank (G1-350, G1-367) — 8 rounds, word bank of 3
| # | scene | sentence | bank (right first here; shuffled on screen) |
|---|---|---|---|
| FB1 | farm-animals/dog under around-the-house/table | "The dog is ___ the table." | under · on · in |
| FB2 | farm-animals/cat on furniture/sofa | "The cat sits on the ___." | sofa · bed · bus |
| FB3 | 3 × farm-animals/duck | "I see ___ ducks." | three · two · four |
| FB4 | pets/goldfish in kitchen-tools/bowl | "The fish is in a ___." | bowl · cup · hat |
| FB5 | weather/sunny over forest-creatures/rabbit | "It is ___ today." | sunny · rainy · snowy |
| FB6 | animals/elephant alone, filling the panel | "I see a big ___." | elephant · mouse · ant |
| FB7 | pets/frog on camping/log | "The frog is on a ___." | log · car · cake |
| FB8 | forest-creatures/bear holding 2 × fruits/apple | "The bear has ___ apples." | two · one · five |
Right-tile position balanced across the 3 slots (3/3/2). **Letter boxes (G1-366):** with the setting *Sentences: two parts*, rounds FB2, FB4, FB7 replace the bank with letter tiles for the word (one box per letter, 3–4 letters, plus 2 decoy letters) — the noun pin fires when the spelled word is complete. Letter-box words must be ≤ 5 letters in the locale; where the locale word is longer, that round keeps the word bank (authored per locale, flagged in data).

### C. Read and colour (G1-242/251/252/409/410/411, G1-308, G1-338, G1-339, G1-340) — 8 one-part + 7 two-part
| # | scene (left → right) | sentence |
|---|---|---|
| RC1 | 5 toys/balloon, 3 toys/kite (mixed) | "Colour 3 balloons red." |
| RC2 | 4 fruits/apple, 4 fruits/pear | "Colour 2 pears green." |
| RC3 | 6 ocean-life/fish in a row | "Colour the second fish blue." |
| RC4 | crab, fish, crab, fish, fish, starfish (ocean-life) | "Colour the fish between the two crabs yellow." |
| RC5 | 4 toys/car, 4 toys/truck | "Colour all the trucks orange." |
| RC6 | 6 farm-animals/duck in a row | "Colour the first and the last duck yellow." |
| RC7 | 3 farm-animals/cat, 3 farm-animals/dog | "Colour 1 dog brown." |
| RC8 | 7 christmas/star | "Colour 4 stars yellow." |
| RC9 | 3 apples, 3 pears | "Colour 2 apples red and 1 pear green." |
| RC10 | car, truck, car, truck, car, truck | "Colour the first car blue. Then colour the last truck red." |
| RC11 | 4 fish, 1 crab | "Colour 3 fish orange and the crab red." |
| RC12 | 4 balloons, 3 kites | "Colour the second balloon green and 2 kites yellow." |
| RC13 | 3 cats, 3 dogs | "Colour 1 cat orange and 2 dogs brown." |
| RC14 | hen, duck, hen, duck, hen (farm-animals) | "Colour the duck between the first two hens yellow and the last hen red." |
| RC15 | 5 stars, 2 space/moon | "Colour 4 stars yellow and 1 moon blue." |
Numbers 1–4 only, never 0; "first/second/last/between" read from the LEFT, marked by a small drawn arrow at the row's start (so "first" has one meaning in every locale). Each round has exactly one set of right tiles up to choice among identical copies ("3 balloons" = any 3 of 5 — every choice of 3 is right; the gate accepts any subset of the right size).

### D. True or false? (G1-341) — 8 rounds, 4 true / 4 false
| # | scene | sentence | answer | the dangling pin when false |
|---|---|---|---|---|
| TF1 | cat on sofa | "The cat is on the sofa." | ✓ | — |
| TF2 | dog under table | "The dog is on the table." | ✗ | [on] |
| TF3 | 3 ducks | "There are three ducks." | ✓ | — |
| TF4 | weather/rainy, rabbit under weather/umbrella | "It is sunny." | ✗ | [sunny] |
| TF5 | bear + 2 apples | "The bear has two apples." | ✓ | — |
| TF6 | frog on log | "The frog is in the water." | ✗ | [in the water] |
| TF7 | forest-creatures/owl + camping/moon | "It is night." | ✓ | — |
| TF8 | elephant + mouse | "The mouse is bigger than the elephant." | ✗ | [bigger] |
The true/false sequence never runs 3 of the same in a row; over a pass 4/4.

**Order:** order-only reshuffle per pass within each task's table; never the previous pass's order.

## 7. Check, the misses, the success
- **Nothing done:** Which with the strip undocked → "Drop the sentence under a picture." · Fill with the blank empty → "Put a word in the box." · Colour with nothing painted → "Pick a colour, then tap the pictures." · T/F with no tile → "Tap ✓ or ✗." (no miss)
- **Miss 1:** the pins fire and the dangling pin(s) swing over the place where the thing should be; the word above each dangling pin turns coral and is underlined. Hints: Which "Look at the pin that is hanging. Find the picture where it sticks." · Fill "That word's pin can't find anything in the picture." · Colour (wrong count) "Count again: the loop holds {n}." (wrong noun) "Look at the word {noun}." (wrong place) "Start at the arrow and count." · T/F "Check the pins: does every word stick?"
- **Miss 2:** stronger showing: Which → the dangling pin's string stretches and points (a dashed line) to the one panel where that word's target is; Fill → the right tile's bead glows; Colour → the tiles the loop should hold get a faint dashed ring (count/noun/place errors) and over-painted tiles get a grey "not asked" ring; T/F → the pins fire before the child chooses again. Hints: "Follow the string." · "Try the word with the glowing bead." · "Paint only the ringed pictures." · "Now look again: true or false?"
- A new drop/paint/tap clears the showing until the next Check.
- **Success:** every pin sticks; the strings pull taut, the picture lifts like a pinned photo, Otto stamps a gold star sticker on its corner, the picture slides into the album strip. Bubble: Which "Yes! Picture {n} shows: '{sentence}'" · Fill "'{sentence}' — the picture shows it!" · Colour "You read it and did it: {sentence}" · T/F "True — every pin sticks!" / "False — '{word}' isn't in the picture!"

## 8. Settings
1. **Task:** Which picture? · Fill the blank · Read and colour · True or false? (default Which). At rest: the 2 × 2 grid / scene + bank / scene + pots / scene + ✓ ✗.
2. **Sentences:** One part · Two parts (default one). At rest: the strip shows one or two lines; Colour uses RC9–RC15; Fill uses letter boxes on FB2/FB4/FB7; T/F sentences gain "and" (TF1 → "The cat is on the sofa and the ball is under it." — two-part T/F set authored with the same 4/4 balance); Which shows the strip with two sentences and the child docks each (two targets, never the same panel).

## 9. Words (EN source)
- title (frozen): Otto's Picture Book — Which Picture Shows It? (Kindergarten)
- instruction: "Otto pins every important word to the picture. Find the picture where all the pins stick."
- task lines: §4. Sentences: §6 tables.
- hints / celebrations: §7 (exact strings).
- settings: "Task" — "Which picture?" / "Fill the blank" / "Read and colour" / "True or false?" · "Sentences" — "One part" / "Two parts"
- **Locale traps:**
  - **Colour words agree** with the noun in fr/es/pt/it (*rouges, rojos*), de adjective endings are avoided by using predicative frames ("Male 3 Ballons rot an.") — each sentence authored per locale; the colour pin's word is marked in each locale's sentence by character offsets in the data.
  - **Number words vs numerals:** sentences use numerals for counts (3) in all locales (no agreement of *drei/tre/três* needed), except FB3/FB8 where the number word IS the answer — authored per locale; fi partitive after numerals ("kolme ankkaa") changes the noun — the noun pin targets the noun, the sentence is authored.
  - **Ordinals:** "second" de *zweite*, fr *deuxième*, fi *toinen*; "between" de *zwischen*, fi *välissä* (postposition after the genitive: "rapujen välissä") — pins mark spans, not single tokens.
  - **Colour vs color** spelling: en-US worksheets say "Color"; LessonCraftStudio EN uses US spelling site-wide? → follow the existing EN worksheets' spelling (G1-242 "Read and Color") — use **"Color"** in EN strings; the table above uses "Colour" for readability only; the build writes "Color".
  - Prepositions: "on/under/in" are 1:1 in all 11; Nordic *på/under/i* fine; fi uses cases (*pöydällä / pöydän alla / kulhossa*) — the pin marks the inflected word or postposition.
  - Animal sound or names: Finn, Mae, Theo, Sam, Bo, Lina stay as names.
  - True/false uses ✓/✗ symbols, no words — no locale issue.

## 10. Sound off, access, phones
- Sound off: pins sticking/dangling, loops, rings, arrows are all visual; TTS (tap Otto) is a bonus.
- Keyboard: Which — arrows choose a panel, Enter docks; Fill — 1/2/3 choose a tile; Colour — number keys pick a pot, arrows move over tiles, Space paints; T/F — ←/→, Enter.
- aria: panels "Picture {n}: {labels}"; live region narrates pins: "'other side' did not stick"; pots named by colour word.
- Taps ≥ 44 px (pots 44, tiles ≥ 72, panels ≥ 124). Pictures ≥ 96 at 704 (panel actors 112, things 96, colour tiles 96), ≥ 64 at 360.
- Colour-blind: every pot has a pattern; painted discs carry the pattern too.

## 11. Distinct from
- **#24 Story Stage** (sentences are stage directions that move pictures), **#211 Toy Box Room** (place a toy where the words say): here nothing is moved by the sentence — the sentence is *tested* against a fixed picture by pins.
- **#219 Body Map** (pins with lenses on a doll, labels): the pins here are the sentence's own words, and dangling is the evidence.
- Batch siblings: #65 orders story pages, #66 sends pages to makers, #68 compares two tales on a zipper.

## 12. Build plan
- **Model:** `{task, round, docking:null|panel, blank:null|word|letters[], paint:{tileIdx:colour}, choice:null|true|false, miss}`; `pinsFor(sentence, scene)` → `[{word, target, stuck:boolean}]` computed from the scene's tagged pictures (`{noun, place, count, colour, index}`); `check()` → ok iff every pin sticks (Colour: the set of painted tiles equals a valid right set — count, noun, colour, place — and nothing else painted).
- **Gate (own oracle):** in every Which story the target panel makes all pins stick and every other panel leaves ≥ 1 dangling; target grid cell balanced 2/8; fill banks have exactly one sticking word; colour rounds have ≥ 1 valid set and counts 1–4 (never 0); T/F answer equals "all pins stick"; 4/4 true/false; every picture labelled, no BW; every sentence and pin span present in 11 locales.
- **Mutations:** pins fire on drop (before Check) in Which or Fill; a caption shown under a Which panel; a distractor panel where all pins stick; number pin accepting any count ≥ n; "second" counted from the right; T/F answer key inverted; colour pin ignored; fill bank with two sticking words; a pin span missing in one locale.
- **Pictures to verify:** pets/{frog, goldfish}, toys/{boat, ball, balloon, kite, car, truck}, weather/{cloud, rainy, sunny, raincoat, puddle, rainbow, scarf, umbrella}, forest-creatures/{squirrel, bear, rabbit, mouse, owl}, miscellaneous/{acorn, house}, spring/{bud, leaf}, pets/turtle, beach/{bucket, sandcastle, seashell}, tree/apple, at-the-supermarket/basket, fruits/{apple, pear}, farm-animals/{dog, cat, duck, hen}, furniture/{bed, sofa}, tools/flashlight, emotions/{sad, excited}, winter/{penguin, snowflake, snowman}, insects-and-bugs/{caterpillar, butterfly}, camping/{moon, log}, flowers/zinnia, around-the-house/table, kitchen-tools/bowl, animals/elephant, ocean-life/{fish, crab, starfish}, christmas/star, space/moon.
- **Coverage honesty:** G1-342 *Read and Draw* asks the child to draw; the activity covers its reading half (read a sentence, act it out on a scene by colouring/marking); drawing stays on the printed sheet. G1-366 letter boxes are covered only on the three short-word rounds.
- **Risks:** composed panels must make the decisive detail big (the boat at the far bank must be unmistakable) — the reviewer reads every panel render.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Choose it again?** Yes — darts on strings that fly and stick, and, once you have found the picture, a sentence you can slide over the others to watch their pins fall off.
2. **Teacher on the board?** Yes — "every word must stick to the picture" is a reading strategy a teacher will name aloud, and it covers a whole family of read-and-do sheets with one rule.
3. **Parent trust?** Library pictures, no score, no timer, nothing sold.
4. **The invention:** the sentence's key words are pins on strings — dropped under a picture they fly to what they name, and a pin with nothing to stick to dangles, showing exactly which word the picture doesn't show.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **The pins could find the answer without reading.** They fired on every drop, so a child could slide the strip from panel to panel until every pin stuck — and Fill the blank fired each word's pin on drop. Pins now fire **only on Check**; the strip docks quietly; Which panels carry no captions. Sliding the strip to watch pins fall off is kept as post-success free play.
- **FB6 had two right answers** (elephant AND mouse were both in the picture, and a pin only tests presence) → elephant alone, "I see a big ___."
- "A little green bud" sat over the red library bud → "A little bud comes up."
- Mutations added for both holes.
