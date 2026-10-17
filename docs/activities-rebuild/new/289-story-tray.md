# New 289 — The Story Tray: the tray acts out exactly the story you built (3.OA.A.3)

## 0. Identity
- id `story-tray.play.3-oa-a-3` · grade 3 · CCSS 3.OA.A.3 · strand Operations & Algebraic Thinking · files `mini tools/story-tray-core.js`, `story-tray-activity.js`, `story-tray-activity.html`, `story-tray-activities.json` (scaffold `node scripts/new-activity.js --num=289`).
- worksheets covered: G3-370 Multiplication and Division Word Problems · G3-371 Multiplication Word Problems · G3-372 Division: Sharing · G3-373 Division: Making Groups · G3-374 Division: Two Ways · G3-375 Multiply and Group · G3-376 Mixed Problems.
- a new instrument (no old activity).

## 1. The pitch
"Lift the numbers out of the story and drop each into the part of the tray it describes — how many groups, how many in each, how many in all — then the tray acts the story out; if a number is in the wrong place, the tray acts a different story and you can see it."

## 2. Why a child will want it again (the fun)
- **Numbers that come out of the sentence.** The story's numbers sit in the sentence as raised chips. Picked up, a chip leaves a soft dent in the line where it was (so the sentence still reads), and it can be dropped into one of three moulds in the tray. Each mould builds its part at once: drop 4 in GROUPS and four empty rings pop up; drop 3 in EACH and a sample ring fills with three tokens; drop 12 in ALL and a heap of twelve tumbles into the pile tray.
- **The show.** Check plays the story: the sample group copies itself into every ring (multiplying), or the heap deals round the rings (sharing), or a scoop lifts groups out of the heap into new rings until it is gone (grouping). Each move has its own sound — a *pop* per copy, a *plip* per dealt token, a *scoop-thup* per group.
- **The story closes.** The "?" chip turns into the answer, and the tray's three moulds slide together into the number sentence ("12 ÷ 3 = 4" in the locale's signs) under the story — the worksheet's answer line, written by the tray.
- Free play: chips can be moved between moulds as often as the child likes; every move rebuilds the tray instantly, so trying "what if 3 were the groups?" is half the fun.

## 3. The skill and the misconception
- **Skill (3.OA.A.3):** in a word problem, decide which number is the number of groups, which the size of each group, and which is unknown (the product, the group size, or the number of groups); then multiply or divide. Sharing and grouping are both division (G3-374, G3-375).
- **Misconceptions and how the material pushes back:**
  1. *"Multiply the two numbers you see."* If the child puts the total of a sharing story into EACH ("12 in each, 3 groups, ? in all"), the tray dutifully builds 3 rings of 12 = 36 tokens — while the story (and the heap it started with) says 12. The scene is visibly wrong.
  2. *Groups and size swapped.* "3 boxes of 4" placed as 4 groups of 3 builds FOUR rings — the story has three boxes. In division the answer number can come out the same either way (12 ÷ 3 = 4 by sharing or grouping), so the tray judges the STRUCTURE: four rings for "3 friends" is a miss even with the right number.
  3. *Sharing and grouping are different operations.* Both are played from the same heap into the same rings; the success sentence for both is a division.

## 4. The stage
**Stacked layout** (no `layout:'split'`: the story card and the GROUPS mould are 560 px; the split stage column is ~350 at 704). Bubble under the apparatus; stage 620 at 704.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| **story card** (the task line area, up to 3 lines for this activity only, 20 px Nunito): the story with number chips raised in it and a "?" chip after the question | 560 px wide; chips 44 px tall, numerals 22 px | full width; chips 44 px; numerals 20 px; text 17 px | text + content chips |
| the story's **thing picture** at the card's left (what is being counted) | 96 px | 64 px | library picture |
| **GROUPS mould**: a long tray of empty ring sockets; icon on its lip = three small empty circles (no word) | 560 × 120 px; rings 48 px, up to 10 in a row | 300 × 136 px; rings 56 px, 2 rows of 5 | drawn |
| **EACH mould**: one sample ring with its tokens; icon = one circle with dots | ring 72 px | ring 64 px | drawn |
| **ALL mould + pile tray**: a rounded tray where the heap lies; icon = a heap of dots in a box | 220 × 110 px | 150 × 96 px | drawn |
| tokens: drawn discs in the thing's colour | 11 px in rings (3 × 4 grid), 9 px in the heap | 12 px in the 56 px rings | drawn |
| keypad (opens when the "?" chip is tapped in its mould) | keys 48 px | keys 44 px | drawn |
| Check | shell button | above the 360×740 fold | shell |

- Mould icons are geometry, not words, so the tray is legible in every language and with the sound off. The only words on screen are the story itself (the content).
- Tokens are drawn: up to 100 things cannot be pictures at the 96/64 px floor; the picture on the story card is the label. Things (seen on `contact/bakery.png`, `fruits.png`, `classroom.png`): cookie, muffin, cupcake, doughnut, pretzel, apple, strawberry, orange, lemon, crayon (`classroom/crayon` — drawn upright and long, ruling batch-30; fine as the label of a counted thing). Each passes the `countable()` gate where the plural carries the number; invariant plurals (it muffin, no kjeks) are allowed because a numeral always stands beside them.
- **Instruction (EN):** "Drag each number from the story into the tray: how many groups, how many in each, how many in all. Then write the missing number."

## 5. The hand
- **Drag a chip** from the story (or from a mould) to a mould; on hover the mould glows; on drop the chip seats with a click and the mould builds its part (rings pop 40 ms apart / sample ring fills / heap tumbles, 300 ms). A mould already holding a chip swaps: the old chip flies back into its dent in the story. Tap a chip in a mould = send it back.
- **The "?" chip** is dragged like the others; once seated, tapping it opens the keypad to type the answer.
- **Check** plays the story from what is built: mul — the sample group copies into each ring (120 ms per ring) and all rings pour into the heap, which counts up; share — the heap deals one token per ring round and round (60 ms per token); group — the scoop lifts a group of the EACH size from the heap into a new ring until the heap is empty (300 ms per scoop).
- Response to every drag < 50 ms; all moves undoable until Check.

## 6. The rounds
Story frames come from `scripts/worksheet-gen/data/b2/wp-muldiv-frames.js` (11 locales, native names, the noun grammar handled by `lib/word-problems-levelset.js W.fill`). ⚠ That file is GENERATED by `tools/apply-b2-locale.js` from `i18n/.draft-b2-<loc>.json` — new frames are added to the drafts and applied, never typed into the generated file. Its frames are arrays, not ids: M1–M4 = `mul[0..3]`, S1–S3 = `share[0..2]`, G1–G3 = `group[0..2]`; the new ones append as `mul[4]` (M5), `mul[5]` (M6), `share[3]` (S4), `group[3]` (G4). Row 193's two box-multiply stories reuse M5 — author once. Four NEW frames are added to that bank so that word order never tells the structure (each authored natively ×11 and reviewed): **M5** "Each box holds {n2} {noun}. {name} fills {n1} boxes. How many {noun} is that in all?" · **M6** "There are {n2} {noun} on each plate. {name} has {n1} plates. How many {noun} are there altogether?" · **S4** "{n2} friends share {n1} {noun} equally. How many {noun} does each friend get?" · **G4** "{name} puts {n2} {noun} in each bag and uses up all {n1} {noun}. How many bags does {name} fill?" (M1–M4, S1–S3, G1–G3 are the bank's existing frames.)

Order-only reshuffle per pass; never the same frame twice running; never the same thing twice running.

**Stories = mixed · Numbers = tables to 5** (10):
| # | frame | structure | thing | answer |
|---|---|---|---|---|
| 1 | M1 | 3 groups of 4, ? in all | cookie | 12 |
| 2 | M5 (size first) | 2 boxes of 5 | muffin | 10 |
| 3 | M2 | 4 rows of 2 | crayon | 8 |
| 4 | M6 (size first) | 5 plates of 3 | strawberry | 15 |
| 5 | S1 | 12 shared among 3 | apple | 4 |
| 6 | S4 (groups first) | 20 shared among 4 | strawberry | 5 |
| 7 | S2 | 15 into 5 groups | muffin | 3 |
| 8 | G1 | 10, 2 in each group | lemon | 5 |
| 9 | G4 (size first) | 16, 4 in each bag | pretzel | 4 |
| 10 | G2 | 12, groups of 4 | orange | 3 |

**Stories = mixed · Numbers = tables to 10** (10): M3 6 sets of 7 (cupcake, 42) · M5 4 boxes of 8 (cookie, 32) · M4 9 rows of 3 (apple, 27) · M6 9 plates of 6 (doughnut, 54) · S1 48 among 8 (strawberry, 6) · S4 63 among 7 (cookie, 9) · S3 40 in 5 rows (orange, 8) · G1 49, 7 in each (lemon, 7) · G4 30, 6 in each bag (muffin, 5) · G3 72 in rows of 9 (pretzel, 8).

**Stories = multiply only** — to 5: M1 2×4 · M5 3 boxes of 5 · M2 5×2 · M6 4 plates of 3 · M3 3×3 · M5 5 boxes of 4 · M4 2×5 · M6 4 plates of 4 · M1 5×5 (answers 8, 15, 10, 12, 9, 20, 10, 16, 25). To 10: M1 7×4 · M5 6 of 8 · M2 3×9 · M6 8 of 7 · M3 9×4 · M5 4 of 6 · M4 10×3 · M6 6 of 9 · M1 8×5 (28, 48, 27, 56, 36, 24, 30, 54, 40).

**Stories = divide only** — to 5: S1 12 among 4 · S4 15 among 3 · S2 8 into 2 · S3 20 in 5 rows · G1 6, 2 each · G4 10, 5 each · G2 16 in 4s · G3 15 in rows of 3 · S4 25 among 5 (3, 5, 4, 4, 3, 2, 4, 5, 5). To 10: S1 42 among 6 · S4 32 among 8 · S2 27 into 9 · S3 36 in 4 rows · **G1 42, 6 in each** (a deliberate "two ways" twin of the first story — G3-374) · G4 24, 8 each · G2 30 in 5s · G3 63 in rows of 7 · S4 50 among 5 (7, 4, 3, 9, 7, 3, 6, 9, 10).

**Measured** (re-checked by the critic with an own script, `work-c40/c289.js` — every table's arithmetic, unknown split, word-order bot and answer spread reproduced exactly; the gate re-measures):
- *Unknown balanced:* mixed tables 4 product / 3 group size / 3 group count.
- *Word-order bot* ("first number = groups, second = each, ? = all"): 2/10 on the mixed tables; on the multiplication stories alone 2/4 (mixed) and 5/9 (multiply only) — the size-first frames are what break it. (Without M5/M6 it would have scored 100% on multiplication stories: every existing frame names the groups first.)
- *Division structure* follows from reading the question ("how many does EACH friend get" → ? in EACH) plus the fact that the total is the biggest number — that is the reasoning the standard asks for, not a cue; the gate reports it (9/9) so nobody mistakes it for a tell.
- *Answer spread:* no answer value more than twice in any table except divide-only to 5 (4 and 5 three times each — with quotients and divisors limited to 2–5, nine distinct stories allow no better).
- One right answer and one right structure per story.

## 7. Check, the misses, the success
- **Check with a mould empty** → hint, no miss: "Every part of the tray needs a number — and one of them is the ?." · **"?" not typed** → "Tap the ? and write the missing number."
- **Miss 1 — structure wrong.** The tray still plays what was built (so the child SEES the other story: 36 tokens for a 12-apple story, or four rings for three friends). Then each chip's phrase in the story lights in the colour of the mould it went to, and the mould that disagrees with the story shakes. Hints EN: groups — "Which number tells how many groups (friends, boxes, rows)?" · each — "Which number tells how many are in ONE group?" · all — "Which number is all of them together?"
- **Miss 2 — the story is annotated.** Small mould icons appear above the matching words in the story (three empty circles above "3 friends", a dotted circle above "4 in each", a heap above "12 apples"). Hint EN: "Match the icons: the story shows which number goes where."
- **Answer wrong, structure right:** miss 1 — the play shows the truth and the unknown part counts itself (the rings number themselves 1, 2, 3 for "how many groups"; one ring's tokens number themselves for "how many in each"; the heap counts up for "how many in all"). Hint EN: "Count what the tray made for the ?." Miss 2 — the number sentence appears with the ? still open ("12 ÷ 3 = ?" or "3 × 4 = ?").
- Moving any chip or typing again clears the miss showing.
- **Success:** the ? chip turns into the answer with a bright pop, the moulds slide together into the number sentence under the story, and the thing picture gives a little hop. Bubble EN: mul — "{g} groups of {s} make {t}: {g} × {s} = {t}." · share — "{t} shared into {g} groups: {s} in each. {t} ÷ {g} = {s}." · group — "{t} in groups of {s} makes {g} groups. {t} ÷ {s} = {g}."

## 8. Settings
1. **Stories:** multiply only / divide only (share and group) / mixed. At rest: the story changes; in divide-only the ? chip sits on a "how many in each / how many groups" question.
2. **Numbers:** tables to 5 / tables to 10. At rest: the numbers in the story change (and the GROUPS mould grows to 10 sockets).

## 9. Words (EN source)
- title **The Story Tray** · instruction (section 4).
- stories: the frame bank (M1–M6, S1–S4, G1–G4) per locale.
- hints `hintEmpty` · `hintTypeQ` · `hintGroups` · `hintEach` · `hintAll` · `hintIcons` · `hintCount` · `hintSentence` (section 7).
- celebrations `winMul` · `winShare` · `winGroup`.
- settings "Stories" — "multiply only" / "divide only" / "mixed"; "Numbers" — "tables to 5" / "tables to 10".
- aria: moulds `srGroups` "How many groups: {n}." / `srEach` "How many in each: {n}." / `srAll` "How many in all: {n}." (the mould's name is read, so the icons have spoken names) · `srChip` "Number {n} from the story."
- **Locale traps:**
  - *Story grammar* is the frame bank's job (names, noun case and plural; fi partitive after numerals "neljä omenaa"; de noun capitalised; es-MX nouns). The four new frames follow each locale's existing frame style (de already uses Kisten/Tüten/Regale; fr boîtes/sacs).
  - *Chip lifting* must not break agreement: the dent keeps the numeral's width so the sentence still reads; fi/de case endings sit on the NOUN, not the number, so lifting a numeral never strands an ending. (Watch fr "12 pommes" vs elision — no elision attaches to a numeral.)
  - *Number sentences* use `notation.js`: × or ·, ÷ or : or / (sv). Division sentences follow the story structure (total ÷ groups = each; total ÷ each = groups). Multiplication sentences follow the shared `FACTOR_ORDER` table (Row 192 §9a): groups × each everywhere except it, which prints each × groups ("3 piatti da 4" → 4 × 3 = 12). The moulds, not the sentence, carry the structure, so grading is the same in every locale.
  - *"Friends" in share frames* stays a group word (the GROUPS mould); "rows" (M2/M4/S3/G3) are groups too — the icons, not the nouns, define the moulds.

## 10. Sound off, access, phones
- Sound off: moulds, rings, the heap and the play carry everything; TTS reads the story only in the locales where it works (5), and the story is always on screen.
- Keyboard: Tab to a chip, Enter to pick up, Tab to a mould, Enter to drop; Tab to the ? chip, Enter opens the keypad; digits type; Check.
- aria-live: the mould names and numbers after each drop.
- Taps: chips 44 px tall (min 56 px wide), moulds ≥ 96 px drop zones, keys 48/44.
- Picture: the thing picture 96/64 px.
- Phones: the story card takes the top (3 lines at 17 px); the GROUPS mould wraps to 2 rows of 5 rings (56 px); EACH and ALL sit side by side below it. At 320 px rings are 50 px. Check stays above the 360×740 fold (stage 600 px with the keypad closed); at 320×640 the ALL tray shrinks to 130 × 84 px.

## 11. Distinct from
- **Row 24 The Story Stage** (K: every sentence is a stage direction you perform) and **Row 82 The Story Film** (an x-ray film checks whether your numbers are the story, addition) — here the child does not perform or film; the child CLASSIFIES each number by its role, and the tray acts the classification.
- **missing-question** (tool: three empty places, the class decides what could be asked) — no structure moulds, no acting.
- **#193 The Trapdoor Tower** (this batch) packs groups and drops them onto plates — its only story decision is where the boxes go; the tray classifies EVERY number of a story by role and plays all three operations.
- **#192 The Echo Grove**, **#288 The Walking Dividers** — products as copies and steps, no stories.

## 12. Build plan
- **Core state:** `{ story {frame, kind, g, s, t, unknown: 'all'|'each'|'groups', noun}, chips [{value, home}], slots {groups, each, all}, typed, misses }`. Functions `place(chip, slot)` (swap on occupied), `buildScene()` (rings = slots.groups, sample = slots.each, heap = slots.all), `play()` (mul/share/group from WHAT IS BUILT, not from the story), `structureOK()` = slots match the story's roles, `judge()` = structureOK ∧ typed = the unknown.
- **Verify gate** (own oracle): every story's numbers (t = g × s; divisions exact; factors ≤ 5 or ≤ 10 by setting); unknown split 4/3/3 in mixed tables; word-order bot ≤ 5/9 on multiplication stories per table; no answer > 2 times (> 3 in divide-only to 5); the frame list per locale has M1–M6, S1–S4, G1–G4; `play()` on a swapped build yields a scene whose ring count ≠ the story's groups; reshuffle never repeats an order, a frame or a thing twice running (1,000 shuffles).
- **Mutations:** play() reads the story instead of the slots (the scene would always look right) → scene-from-build rule; judge accepts a swapped structure with the right number → structure rule; size-first frames removed → word-order rule; chip leaves no dent (sentence collapses) → local-test asserts the sentence width is unchanged; ÷ printed in sv → notation rule; heap shown countable before Check → local-test asserts heap tokens are not laid out in a grid before play.
- **Local test:** real chip drags (and keyboard path) at the seven widths, every story of every setting, swaps, the full miss ladder, the play of each kind.
- **Pictures:** the 10 things above (seen). **Risks:** native authoring of the four new frames ×11 (medium — one reviewer reads all 44 lines plus the existing bank lines used). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — pulling numbers out of a sentence and watching a tray copy, deal or scoop is a little machine to play with, and wrong placements produce funny wrong scenes.
2. **Would a teacher put it on the board?** Yes — it isolates the real difficulty of 3.OA.A.3 (which number is which), it cannot be beaten by word order, and it treats sharing and grouping as division in one picture.
3. **Would a parent trust it?** Calm, library pictures as labels, no score, the story always readable.
4. **The invention:** a tray with three moulds — groups, each, all — that acts out exactly the story the child built from the sentence's numbers, so a misplaced number shows up as a different story.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 5→5 · reality 4→5
What changed:
- Layout: split → stacked (560 px card and mould cannot sit in the ~350 px split column).
- The frame bank is a GENERATED file with array-indexed frames: the design now says where the four new frames go (drafts + `apply-b2-locale.js`) and maps M/S/G ids to array slots; Row 193 reuses M5 (author once).
- Multiplication sentences follow the shared per-locale `FACTOR_ORDER` (it prints each × groups); division sentences follow the story structure; grading rests on the moulds, so it is the same in all 11 locales.
- Picture note corrected (classroom/crayon is long, not a stub — irrelevant to its use as a label).
- Re-measured every table with my own script: arithmetic, unknown split 4/3/3, word-order bot 2/10 and 5/9, answer spread — all reproduced.
