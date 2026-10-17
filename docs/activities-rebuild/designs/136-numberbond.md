# Row 136 — Story Problems → THE REPLAY TRACK: put your number into the story and the story replays itself on a measuring track — every number the story told is a flag the bars must hit (2.OA.A.1)

## 0. Identity
- **id** `numberbond.story-problem.2-oa-a-1` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.OA.A.1 (with 1.OA.A.1 for the within-20 setting and 3.OA.A.3 for the equal-groups setting) · strand Operations & Algebraic Thinking · own files `replay-track-core.js`, `replay-track-activity.js`, `replay-track-activity.html`, `replay-track-activities.json` (the row leaves `number-bond-activities.json`; register the manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `number-bond-core.js` and `lcs-shell.*`).
- **Page intro (frozen):** "An interactive Grade 2 math activity: read a word problem, see it as a number bond, then type the missing number. One-step add and subtract within 100 (20 + 30 = ?)." Kept: read a word problem, type the missing number, one-step within 100 is the default setting. "See it as a number bond" becomes "see it as a measuring track", and the success bubble still shows the bond (whole over two parts) next to the equation, so the page's promise is literally on the screen.
- **Worksheets it must also cover:** G1-213 "Picture Word Problems", G1-238 "Addition Word Problems", G1-239 "Subtraction Word Problems", G1-240 "Word Problems Within 10", G1-241 "Word Problem Practice" → **within 20** setting (pictures; add and subtract; result unknown 4 of 10, change, start and compare 6 of 10) · G3-370 "Multiplication and Division Word Problems", G3-371 "Multiplication Word Problems", G3-372 "Division: Sharing", G3-373 "Division: Making Groups", G3-374 "Division: Two Ways", G3-375 "Multiply and Group", G3-376 "Mixed" → **equal groups** setting (multiply, share, make groups, mixed).
- **What the old activity did:** 8 word problems per locale (all 11 locales hand-written), a number bond with the unknown in the first part, second part or whole, typed answer. **Kept, verbatim, in all 11 locales:** the 8 stories and their numbers (tulips 20 + 30, books 45 − 25, apples 18 + 21, sheep 50 − 20, crayons 60 − 35, ducks 16 → 30, marbles ? + 22 = 40, class 24 + 23) — they are rounds 1–8 of the within-100 setting. **New:** 6 more within-100 stories (so add and subtract are exactly 7 : 7 and compare problems exist), 10 within-20 stories, 8 two-step stories, 10 equal-groups stories, and the replay.

## 1. The pitch
"Type the number you think is missing — then press Replay: the story plays itself out on a measuring track with your number put in, every number the story told is a little flag, and if your number is right the bars land exactly on every flag."

## 2. Why a child will want it again
- **The replay is a tiny film of the story.** A play-head with the story's picture (the tulip, the book, the sheep…) walks along the track sentence by sentence; each sentence lights up in the story card as its bar grows or shrinks — "20 red tulips" grows a coral bar to 20, "and 30 yellow tulips" grows a gold bar on to 50, the question's "?" bar is the child's number.
- **The flags are a target.** Every number the story told is a little pennant planted on the track. When the bars land exactly on every flag, the flags wave and a *ta-da* chime plays. When they don't, the bar overshoots or falls short of the flag and you *see* by how much.
- **Your number is the hero.** The child's typed number becomes a bar in the story — they are trying their idea inside the story, not answering a quiz.
- **Rewind.** After a miss the child can drag the play-head back and watch the story again slowly, step by step (the track is a scrubber).
- **The earned show:** on success the track folds up into the number bond (the whole bar on top, the two part bars below — the page's promised bond) and the equation types itself underneath: **20 + 30 = 50**.
- **Free play:** after a round, the child may type other numbers and replay just to watch what happens — no judging after success.

## 3. The skill and the misconception
- **Skill (2.OA.A.1; 1.OA.A.1; 3.OA.A.3):** solve one- and two-step word problems — adding to, taking from, putting together, taking apart, comparing — with the unknown in any position; within 20 with pictures (grade 1); equal-groups multiplication and both kinds of division (grade 3). Check an answer by putting it back into the story.
- **Misconception 1 — "add all the numbers"** (Tom found 22 more, now has 40 → 62). **Pushback:** the replay starts Tom with 62 marbles, grows by 22 to 84 and sails far past the "now 40" flag — the overshoot is the size of the mistake. Measured (critic, `work-c34/c136.js`): adding the two told numbers is right in **7 of 14** within-100 rounds and **5 of 10** within-20 rounds (exactly chance for a two-operation guess), **0 of 8** two-step rounds and **0 of 10** groups rounds.
- **Misconception 2 — keyword reading** ("more" → add, "left" → subtract). **Pushback:** the within-100 set has 7 rounds where the keyword points the wrong way (more ducks *came*, found 22 *more*, gave away … *left*, flew away … *still*, 12 *more than* Ben, how many *more*, 9 *fewer than* Lina), and the within-20 set 6 (more cars drive in … how many; fly away … at first; more boats sail in … how many; eaten … at first; how many *more* bees; gave away … at first) — all caught by the flags. Measured (critic, `work-c34/c136.js`, a keyword bot that reads in all / together / more / came / found as + and left / rest / away / gave / fewer / eaten / pop as −, the question sentence breaking ties): right in **7 of 14** within 100 and **4 of 10** within 20 — at or below the 50 % of a coin toss.
- **Misconception 3 — the start-unknown and compare problems are subtract-the-small-from-the-big.** Balanced: subtracting the smaller from the bigger is right in 7/14 (within 20: 5/10) — and the replay shows exactly where it fails (e.g. Lea's stickers start at 5 and go negative off the track's left end).
- **Misconception 4 — sharing vs making groups are different operations** (G3-374). **Pushback:** the replay acts each out differently — sharing deals the pile into a fixed number of segments, grouping cuts off segments of a fixed size — and both land on the same told total flag only with the right number.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout):**
- **Task line** (≤ 24 px): **"Read the story. Type the missing number, then press Replay."**
- **The story card** (left, 400 × 170): the story in 20 px text, ≤ 5 lines; each told number is a chip (rounded, bold, its flag colour); the question sentence is underlined; the "?" chip at the end. To the right of the text the story's **library picture** at 96 px (§4 list; no picture for rounds whose thing has no good picture).
- **The answer box + keypad** (right column, 230 px): the answer box (110 × 72, digits 40 px), a 3 × 4 keypad (keys 64 × 52), the **Replay** button (= the shell's Check, labelled with a ▶ glyph and the word).
- **The track** (full width 672 × 170, below): a ruler from 0 to the setting's top (0–20 with a tick every 1 and numerals every 5 at 18 px; 0–100 with a tick every 1, longer every 5, numerals every 10; 0–50 for equal groups with numerals every 5). Above it the **flags**: one pennant per told *total* (states such as "now 40", "45 books") at its value, teal; the **play-head** (a drawn coral token, 40 px — never a shrunken picture; the story's picture stays at full size in the card). Bars are drawn on two lanes (lane A for the main quantity, lane B for compare problems), 28 px tall, coral / gold / teal by role; the child's number always draws in **coral with a dashed edge** so it is visibly "your number".
- Vertical budget: task 56 + card 170 + track 170 + gaps 32 = **428** (the keypad column sits beside the card and track).

**At 360 px (stacked):** task 52 · story card 328 × auto (≤ 7 lines at 17 px; picture 64 px at the card's top right) · track 328 × 130 (0–100 numerals every 20 at 14 px; bars 22 tall) · answer box 96 × 56 + Replay 140 × 48 in one row · keypad 3 × 4 keys 96 × 44 (4 rows = 188) · Check is the Replay button. Budget: header 56 + 52 + 150 + 130 + 56 + 188 + gaps 40 = **672 ≤ 740**.
**At 320 px:** card text 16 px (≤ 8 lines, 160), track 288 × 120, keys 88 × 44 → 56 + 48 + 160 + 120 + 52 + 188 + 16 = **640 ≤ 640**.

**Library pictures** (the story's thing; all looked at on contact sheets): flowers/tulip, classroom/book, fruits/apple, farm-animals/sheep, toys/crayons (shown as "crayons" — it is a set of three), farm-animals/duck (a duckling — fine for ducks on a pond; never as a flying bird), beach/seashell, spring/bird, forest-creatures/frog, toys/car, fruits/strawberry, toys/balloon (green), toys/boat, bakery/cookie, insects-and-bugs/bee. No picture (the play-head is a plain coral dot): marbles, the class, stickers, beads, pages, children on the bus, stamps, eggs (no plain egg exists), chairs, plates.

## 5. The hand
- **Type:** keypad digits fill the answer box (3 digits max), ⌫ deletes. The "?" chip in the story card mirrors the typed number live.
- **Replay** (= Check): the play-head walks the story; each sentence lights in the card as its bar animates (grow 30 units/s, at least 400 ms per sentence; a soft *tick* per 10 units). The child's number enters at its sentence as the dashed coral bar. At each flag the bar's end either lands (flag waves, *ding*) or misses (the gap between bar end and flag shades coral and the bar end wobbles).
- **Scrub:** after a replay, drag the play-head along the track to re-watch any step (the story card highlights the matching sentence).
- **Track shown before answering** (setting): the told totals' flags stand on the track from the start, so the child can count up or back along it — a number-line model, not the answer.
- **Undo:** delete digits; replays are free (only a wrong Check counts as a miss).
- Keyboard: digits type; Enter = Replay; ← / → scrub after a replay.

## 6. The rounds
**Within 100 — one step (2.OA.A.1; 14 rounds; 1–8 are the old rounds, unchanged in all 11 locales):**

| # | Story (EN) | Type | Answer | Op |
|---|---|---|---|---|
| 1 | A garden has 20 red tulips and 30 yellow tulips. How many tulips are there in all? | put together, total ? | 50 | + |
| 2 | There are 45 books on a shelf. 25 are picture books and the rest are story books. How many story books are there? | take apart, part ? | 20 | − |
| 3 | Maya picked 18 apples and Sam picked 21 apples. How many apples did they pick together? | put together | 39 | + |
| 4 | There were 50 sheep in a field. 20 ran away. How many sheep are left? | take from, result ? | 30 | − |
| 5 | A box holds 60 crayons. 35 are red and the rest are blue. How many crayons are blue? | take apart | 25 | − |
| 6 | 16 ducks are in a pond. More ducks come. Now there are 30 ducks. How many ducks came? | add to, change ? | 14 | − |
| 7 | Tom had some marbles. He found 22 more. Now he has 40 marbles. How many did he start with? | add to, start ? | 18 | − |
| 8 | A class has 24 girls and 23 boys. How many children are in the class? | put together | 47 | + |
| 9 | Lea gave away 15 stickers. Now she has 20 stickers left. How many stickers did she have at first? | take from, start ? | 35 | + |
| 10 | Ben has 21 shells. Ana has 13 more shells than Ben. How many shells does Ana have? | compare, bigger ? | 34 | + |
| 11 | Some birds were in a tree. 14 flew away. 25 birds are still in the tree. How many birds were there at first? | take from, start ? | 39 | + |
| 12 | Mia has 38 beads. That is 12 more than Ben has. How many beads does Ben have? | compare, smaller ? | 26 | − |
| 13 | Ana has 34 shells and Ben has 21. How many more shells does Ana have? | compare, difference ? | 13 | − |
| 14 | Sam has 27 cards. That is 9 fewer than Lina has. How many cards does Lina have? | compare, bigger ? ("fewer" trap) | 36 | + |

Measured (critic, `work-c34/c136.js`, rounds 1–14): add the told numbers **7/14**, subtract smaller from bigger **7/14**, keyword rule **7/14**, type a told number **0/14**. Add 7 : subtract 7 (the designer's 13 rounds were 6 : 7, so "always subtract" beat a coin toss; round 14, a "fewer than" compare-bigger, evens it). The unknown is the total/result 5×, a part/change 3×, the start 3× (7, 9, 11), compare-bigger 2× (10, 14) and compare-smaller/difference 2×. Picture for round 14: toys/cards (a pair of playing cards — fine as "cards").

**Within 20 with pictures (1.OA.A.1; G1-213, G1-238…241; 10 rounds — critic rewrite so the operation and keyword bots sit at chance):**

| # | Story (EN) | Type | Answer | Op | Picture |
|---|---|---|---|---|---|
| 1 | 4 frogs sit on a log. 3 more frogs hop on. How many frogs are on the log now? | add to, result ? | 7 | + | forest-creatures/frog |
| 2 | 9 apples are in a bowl. Sam eats 5. How many apples are left? | take from, result ? | 4 | − | fruits/apple |
| 3 | 5 cars are in the garage. More cars drive in. Now there are 12 cars. How many cars drove in? | add to, change ? | 7 | − | toys/car |
| 4 | Some birds sit on a wire. 4 fly away. 8 birds are left. How many birds were there at first? | take from, start ? | 12 | + | spring/bird |
| 5 | 7 strawberries are on one plate and 8 are on another. How many strawberries are there in all? | put together | 15 | + | fruits/strawberry |
| 6 | 15 balloons are at the party. 6 pop. How many balloons are left? | take from, result ? | 9 | − | toys/balloon |
| 7 | 10 boats are in the harbour. Some more boats sail in. Now there are 17 boats. How many boats sailed in? | add to, change ? | 7 | − | toys/boat |
| 8 | Some cookies were on a tray. 7 were eaten. 11 cookies are left. How many cookies were there at first? | take from, start ? | 18 | + | bakery/cookie |
| 9 | 14 bees and 5 butterflies are on the flowers. How many more bees than butterflies are there? | compare, difference ? | 9 | − | insects-and-bugs/bee + butterfly |
| 10 | Ana gave away 6 shells. Now she has 9 shells left. How many shells did she have at first? | take from, start ? | 15 | + | beach/seashell |

Add 5 : subtract 5; add the two told numbers 5/10, subtract 5/10, keyword rule 4/10, a told number 0/10 (measured, `work-c34/c136.js`). Result-unknown 4 (the grade-1 core), change/start/compare 6 — 1.OA.A.1 names "unknowns in all positions" and the replay makes the harder ones checkable. In this setting the bars are made of **drawn unit squares** (one per object, 26 px at 704 on a 0–20 ruler, 15 px on phones) — not shrunken pictures (a 22-px picture unit would break the 40-px data-mark floor); the 96-px picture in the card is the label, and the compare round draws two lanes (bees / butterflies) each labelled with its picture in the card.

**Two steps (2.OA.A.1; 8 rounds):** 24 children are on the bus; 8 get off and 13 get on (29) · Lena has 35 stickers; she gives 12 to Max and 9 to Sara (14) · Tom has 18 marbles; Ana has 7 more than Tom; how many do they have together (43) · 50 birds are on a field; 25 fly away, then 10 come back (35) · Mia read 16 pages on Monday and 16 on Tuesday; her book has 40 pages; how many pages are left (8) · A box has 40 crayons: 15 red, 15 blue, the rest green (10) · Sam had 27 stamps; he gave 6 away, then got 9 more (30) · Max has 12 balloons and Lea has 30 balloons; 20 pop (22) — no colour words (toys/balloon is green). Add-all 0/8, subtract-big-small 0/8. The replay runs both steps; the intermediate state gets its own grey flag after the first step, so a child who did only one step sees the bar stop at the grey flag.

**Equal groups (3.OA.A.3; G3-370…376; 10 rounds):** multiply — 5 bags with 6 apples each (30) · 4 boxes of 8 crayons (32) · 3 rows of 7 chairs (21) · 6 plates with 4 cookies on each (24) · 9 bikes with 2 wheels each (18); share — 24 strawberries shared equally by 4 friends, how many each (6) · 35 stickers shared equally among 5 children (7) · 27 cards dealt equally to 3 players (9; toys/cards); make groups — 28 eggs, 4 in each box, how many boxes (7) · 30 flowers, 5 in each vase, how many vases (6). Multiply 5 : divide 5 (share 3, groups 2); "always multiply" 5/10, "always divide" 5/10, add-all 0/10. Track 0–50; multiply draws the child's flag and lays equal segments onto it; share lays the told number of segments, each as long as the child's number, toward the told total flag; groups lays segments of the told size, as many as the child's number.
- **Answer position:** typed — there is no position.
- **Order:** order-only reshuffle per pass, never the same order twice; never two rounds of the same story type (e.g. two start-unknowns) in a row; never three rounds of the same operation in a row (so "it was minus last time" cannot ride a run).

## 7. Check, the misses, the success
- **Replay with an empty box** → the story replays with a blank "?" bar that pulses at its sentence — **"Type your number, then watch the story again."** (no miss).
- **Miss 1:** the replay itself is the help: the bar misses its flag by a shaded gap; the sentence where it went wrong stays lit in the story card; the play-head stops there — **"With {guess}, the story does not end at {flag}. Watch where it goes wrong."** ({flag} is the told number of the missed flag.)
- **Miss 2:** the track replays **backwards** from the told end to the unknown — e.g. from "now 40" the 22 Tom found is taken back off, landing on 18; for compare, the gap between the two bars is outlined — **"Go back from {flag}: undo what happened, and see where you land."** (The landing point is not labelled with a numeral; the child reads it on the ruler.)
- A new digit takes the help away until the next Replay.
- **Success:** every flag waves, the chime plays, the track folds up into the **number bond** (whole over two parts; equal-groups: the whole over its equal parts) and the equation types itself under the story: **"{equation}"** (e.g. "18 + 22 = 40", "40 − 22 = 18", "4 × 6 = 24", "24 ÷ 4 = 6"); the bubble reads **"Yes — {answer} makes the whole story work."**

## 8. Settings
1. **Story:** within 20 (pictures) · within 100 · two steps · equal groups — changes the ruler (0–20 / 0–100 / 0–100 / 0–50) and the round set.
2. **Track:** shown before you answer · only on the replay — the told flags stand on the ruler from the start, or the ruler stays blank until Replay.

## 9. Words (EN source; the old 8 stories kept verbatim in all 11 locales)
- title (frozen) **Story Problems — Add & Subtract Within 100 as a Bond (Grade 2)** · instruction **"Read the story, type the missing number, and press Replay to watch the story with your number in it."**
- task **"Read the story. Type the missing number, then press Replay."** · Replay button **"Replay"**.
- hints and success as in §7; settings **Story** — within 20 / within 100 / two steps / equal groups · **Track** — shown first / only on replay.
- New stories (rounds 9–13, the within-20, two-step and equal-groups sets): EN as in §6; the build writes the 10 other locales **by hand** (native frames, no machine translation), keeping each story's numbers and structure.
- **Locale traps:**
  - Every story's noun agrees with its number: de "1 Ente / 16 Enten", fr "16 canards", it "16 anatre", fi partitive after numerals ("16 ankkaa", "40 kuulaa"). The old stories already do this; the new ones must, too.
  - Keyword traps must survive translation: "13 more shells than Ben" (de "13 Muscheln mehr als Ben", fr "13 coquillages de plus que Ben", fi "13 simpukkaa enemmän kuin Ben") — the comparison word must stay a *more* word so the keyword trap is real; "left" stories must keep the *left* word (de "übrig", fr "reste", fi "jäljellä").
  - Names: the old locales use local names (Lena, Léa, Luca, Sem, Erik, Noah, Ola, Liisa…) — keep that habit for the new stories; the name never changes a number.
  - Sharing vs grouping: de "gerecht verteilen" vs "in Gruppen zu je", fr "partager équitablement" vs "par paquets de", es "repartir en partes iguales" vs "en grupos de", fi "jakaa tasan" vs "ryhmiin, joissa on" — both must exist per locale.
  - Operator glyphs in the success equation: × in en/es/fr/it/pt/nl, **·** in de/sv/da/no/fi (the G3-358 convention); ÷ in en, **:** in de/nl/sv/da/no/fi/fr/it/es/pt (school notation; es/pt also use ÷ — the author decides with the reviewer).
  - Decimal commas never arise (whole numbers only). Money never appears.

## 10. Sound off, access, phones
- Legible with the sound off: the replay is motion; the flags wave; the story card highlights the sentence. TTS reads the story where available (a bonus).
- aria: story card (the full text), "Your number: {n}", Replay "Replay the story with {n}", flags "{n}, told in the story", the replay narrated per sentence ("20 red tulips: the bar grows to 20").
- Taps: keys 96 × 44 (88 × 44 at 320), Replay ≥ 48 tall, the play-head 40 px (drag zone 56).
- Pictures 96 at 704 / 64 at 360 in the card only; the within-20 units on the track are drawn squares (never shrunken pictures).
- Check above the fold: 672 at 360 × 740, 640 at 320 × 640.

## 11. Distinct from
- **Row 24 The Story Stage** (K.OA.A.2: sentences are stage directions acted on a ten-frame) — kindergarten, the child acts each sentence; here the child *predicts* the unknown and the story is replayed with that number as a check.
- **Row 81 The Covered Basket**, **New 248 Tray That Only Holds the Whole**, **Part-Whole Frame** (tool) — count-on and part-whole within 10–20, no story replay.
- **Row 156 The Spirit Level** (2.MD.B.5: two rails must end level for length stories) — length stories as two rails and a dialled board; here any story type is replayed in time along one track with flags for every told number.
- **New 289 The Story Tray** (planned: drag number tags into "groups" / "each" slots) — the child classifies numbers; here the child answers and the replay checks.
- **Missing Question** (tool) — inventing questions; no replay.

## 12. Build plan
- **Core state:** `{ setting, round:{ text, told:[…], unknown, steps:[{op, from, by, lane}], flags:[…] }, typed, replay:{ frames:[…] } }`. Every story is stored as a **script of steps** with the unknown as a symbol (e.g. `[{set:'?'}, {add:22}, {flag:40}]`); `play(typed)` substitutes and returns the frames and the first missed flag; `rewind()` builds the backwards frames from the last told flag.
- **The gate's own ground truth (`verify-replay-track-core.js`):** for every round, solving the script independently (its own inverse-operation solver) gives the table's answer; `play(answer)` hits every flag and `play(answer ± 1)` misses at least one; add-the-told-numbers / subtract-big-small / keyword bots ≤ 7/14 (within 100) and ≤ 5/10 (within 20), add-all 0/8 (two steps), always-multiply / always-divide 5/10 (groups), told-number 0 everywhere; no answer equals a told number; the within-20 answers ≤ 20, within-100 ≤ 100, groups products ≤ 50; every listed picture exists in its theme JSON and on disk; the 8 old stories are byte-identical to the shipped manifest in all 11 locales.
- **Mutations:** grade by "add all the numbers" · accept the intermediate of a two-step story · let a bar landing ±1 count as hitting a flag · swap share and group replays · show the backwards replay's landing numeral · drop the old stories' locale text · allow an answer equal to a told number · allow two start-unknowns in a row after the reshuffle · make the within-100 set 6 : 8 add : subtract (the operation bot beats chance) · draw the within-20 units as 22-px pictures.
- **Local test:** typing + Replay + scrubbing at 320·360·412·704·768·1024·1366 in all four settings and 11 locales; assert the longest story (fi/de) fits the card at 320 (≤ 8 lines), flags never overlap their labels (a flag at 45 and one at 50 offset vertically), Check above the fold.
- **Pictures verified on contact sheets:** flowers (tulip is red — fine with "red and yellow tulips" as a label), classroom, fruits, farm-animals, toys (cards = two playing cards; balloon is green, so no story names a balloon colour), beach (seashell), spring, forest-creatures, bakery, insects-and-bugs (bee, butterfly) — see §4. **Risks:** story length in fi/de at 320 px — the card scrolls internally only as a last resort; prefer 16 px at 320. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — their own number becomes a bar in a little film of the story, the flags wave when it works, and they can rewind.
2. **Would a teacher put it on the board?** Yes — it teaches the most valuable habit in word problems (put your answer back into the story), defeats keyword reading and add-everything on purpose, and covers every 2.OA.A.1 type plus the grade-1 and grade-3 faces.
3. **Would a parent trust it?** Calm, library pictures, stories in the child's language written by hand, no timer, no scores.
4. **The invention:** the story replays itself on a measuring track with the child's number put in, and every number the story told is a flag the bars must land on.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→4 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Operation bots were above chance.** Within 100 was 6 add : 7 subtract (13 rounds), so "always subtract the small from the big" scored 7/13; round 14 ("Sam has 27 cards. That is 9 fewer than Lina has.") — a compare-bigger with a *fewer* trap — makes it 7 : 7 and every operation and keyword bot 7/14 (`work-c34/c136.js`, my own keyword bot).
- **Within 20 rebuilt to 10 rounds** (5 add : 5 subtract; result-unknown 4, change/start/compare 6): the designer's 9 were all direct result-unknown stories where the keyword rule was right ~9/9 and "add" 5/9. Now add 5/10, subtract 5/10, keyword 4/10, a told number 0/10.
- **Picture floor:** the play-head carried a 32-px picture and the within-20 bars were 22-px picture units — both below the 40-px data-mark floor. Now a drawn play-head token and drawn unit squares; pictures stay full size in the story card.
- "12 red balloons and 30 blue balloons" removed (toys/balloon is green); toys/cards named for the cards stories; a no-three-same-operation-in-a-row order rule added.
- Invention stays at 4: the hand types and the track checks — the replay and the backwards replay are genuinely new and teach "put your answer back into the story", but the modelling itself is not done by the hand.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
