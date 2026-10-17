# Row 114 — Build Words with Endings → THE ROOT STENCIL (RF.1.3.f)

## 0. Identity
- **id** `syllable-builder.build-endings.rf-1-3-f` (KEPT; slug `build-words-with-endings`, title and intro frozen en) · grade 1 · Common Core **RF.1.3.f** (read words with inflectional endings) · strand Reading: Foundational Skills.
- **files (key `root-stencil`)** `mini tools/root-stencil-core.js`, `root-stencil-activity.js`, `root-stencil-activity.html`. The manifest row STAYS in `syllable-builder-activities.json`; only its `tool` is repointed. `word-builder-core.js` untouched. New metadata (slug, title, intro) for de nl sv da no fr es pt fi (it refused, §6).
- **worksheets it covers:** G1-397 *Root Words with Pictures: Circle the Word* (Clue "Find the root").
- **what the old activity did:** a base word (cat), an ending tray (-s, -ed, -ing), tap base + ending to build "cats"; EN, 9 words, no sentence, no picture. **Kept:** all nine base words and their endings (cats, dogs, books / jumping, walking, helping / played, rained, painted) — now inside sentences that make the ending necessary (Clue "Add the ending"). **Changed because it was wrong:** the ending could be chosen with no reason at all (nothing in the round said "more than one" or "yesterday"), so any ending was a guess; and the activity only BUILT words, while RF.1.3.f is about READING them — two reading clues now lead.

## 1. The pitch
"The root word is a stencil with its letters cut out as windows: lay it over a long word and, if the word is built from that root, every window shows the root's own letter and the leftover slides into an ending sleeve — a look-alike shows a wrong letter in a window, and a fake ending has no sleeve to slide into."

## 2. Why a child will want it again (the fun)
- **A stencil you can lay down.** Each root is a stiff cream card with its letters cut out as windows (geometry: a card with letter-shaped holes, the letters ghosted on its edge). When it drops onto a word card it lands with a soft *thup* and the word's letters show through the holes.
- **Clean fit or wobble.** On a word built from the root, every window frames exactly its letter and glows warm; the stencil lies perfectly flat — *click*. On a look-alike (*boots* under the *book* stencil), one window frames the wrong letter: that window flashes coral and the stencil rocks on it like a table with one short leg, then slides off.
- **The ending sleeves.** Three gold sleeves hang to the right — -s, -ed, -ing. When the stencil fits, the leftover letters poke out of its right edge and the matching sleeve zips over them (*zzip*). Leftover letters that are NOT an ending (*catch* under the *cat* stencil leaves *ch*) find no sleeve: they droop and the card slides back. Children try the stencil on everything to see what fits.
- **The ending columns.** Every word solved hangs its ending sleeve on one of three hooks at the top: after a pass the child sees all the -s words together (more than one), all the -ing words (happening now), all the -ed words (already happened).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3.f + G1-397):** read a word with an ending by finding the root inside it and reading the ending (*jump·ing*, *book·s*, *rain·ed*); know what each ending does (-s more than one, -ing happening now, -ed already happened); -ed is always spelled *ed* even when it sounds /t/, /d/ or /ɪd/ (*walked*, *played*, *painted*); find the one word built from a picture's root among look-alikes; add the ending a sentence needs.
- **Misconception 1 — same beginning = same root** (*jungle* for *jump*, *boots* for *book*). The stencil's window shows the letter that differs; the stencil rocks on it.
- **Misconception 2 — any leftover is an ending** (*catch* from *cat*, *carrot* from *car*). The root shows through perfectly, but the leftover has no sleeve — only real endings are endings.
- **Misconception 3 — the ending changes the root.** The stencil sits on the root in every form (book, books; jump, jumping, jumped): the root's letters never move. A child who peels *jumping* as *jum|ping* sees the stencil fail.
- **Misconception 4 — -ed is spelled the way it sounds** (*walkt*, *playd*). Only the *ed* sleeve exists for the past; the sound is shown by a small sound mark on the sleeve after Check (t / d / id), never by a different spelling.
- **How the material pushes back:** windows that show the wrong letter, a stencil that will not lie flat, and leftovers that no sleeve accepts.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 470):
- **Ending hooks** (top, 504 × 48): three hooks marked only by their sleeves' shapes and letters (-s · -ing · -ed); solved word tags hang under them.
- **The picture** (y 58): library picture **150 × 150** on a cream card (`#FFF8EC`, 3 px ink rim, radius 18) — the ROOT's picture in Find and Peel (book, hand, star, drum, jumping, fishing…); in Add, the sentence's picture.
- **The stencil frame** (y 222): under the picture, a 380 × 84 wooden frame where a word card is laid; the stencil hovers above it, folded away (only its edge shows) until Check, so it never spells the root in advance.
- **Word cards** (Find, y 330): four cards **108 × 64** (word in Baloo 2, 28 px, ink on cream) in a row; drag one into the frame. Peel: one long card in the frame with a slim divider handle (24 px wide, 44 px hit) between letters. Add: the sentence strip (440 × 56, 22 px text) with the root in its gap and three sleeves **80 × 56** below.
- **Sleeves:** gold `#E8A53A` tubes with the ending's letters on them (-s, -ing, -ed), 3 px ink outline.
- **Task line** above (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): hooks 360 × 40; picture **112 px**; frame 344 × 70; Find cards in a 2 × 2 grid **150 × 56** (word 24 px); Peel card 344 × 64 with letters 30 px and divider stops every letter (≥ 22 px apart, 44 px hit columns overlap-resolved to the nearest gap); Add sentence wraps to 2 lines at 20 px; sleeves 72 × 52; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** picture 96 px, cards 142 × 52, Check bottom ≤ 620.

No words on the apparatus besides the content (words, letters, endings, sentences).

## 5. The hand
- **Find:** drag a word card into the frame (or tap it: it slides in, 200 ms). Another card replaces it (the first slides home).
- **Peel:** drag the divider handle along the word; it snaps to the gaps between letters (40 ms tick per gap); the letters right of it shift 6 px right to show the split.
- **Add:** drag a sleeve onto the root in the sentence (or tap it) — it zips onto the root's end (160 ms) and the word reads as one (*jump*+*ing* → *jumping*); another sleeve replaces it.
- **Check:** the stencil unfolds and drops onto the frame (220 ms, *thup*) — §7.
- **Hear:** a speaker beside the frame reads the word in the frame (TTS where reliable).
- **Free play:** between rounds the stencil of the last root can be dragged over any word on the bench to test it; nothing is graded.
- **Undo:** everything until Check; after a miss, the child's card stays in the frame so they can choose again.

## 6. The rounds
Pass = 9 rounds per clue. Two EN sets for Find (A = clear look-alikes, B = tricky), one set each for Peel and Add (order reshuffled every pass, never the same order twice).

**Clue "Find the root" (default — G1-397).** The picture is the root; four cards: the one built word + three look-alikes sharing the root's first two or three letters.

| # | picture (root) | built word | look-alikes (set A) |
|---|---|---|---|
| 1 | classroom/book (book) | books | boots · bones · bottle |
| 2 | body-parts/hand (hand) | hands | hats · hammers · happen |
| 3 | christmas/star (star) | stars | stamps · stairs · stack |
| 4 | music/drum (drum) | drums | drops · dress · dreams |
| 5 | activities/jumping (jump) | jumping | juggling · jungle · jumbo |
| 6 | animals/fish (fish) | fishing | fixing · filling · fist |
| 7 | activities/camping (camp) | camping | calling · candy · camel |
| 8 | weather/rainy (rain) | rained | raked · rabbit · radio |
| 9 | activities/reading (read) | reading | resting · real · red |

**Set B (setting "Look-alikes: tricky")** — every round adds ONE trap card that begins with the WHOLE root but continues with letters that are not an ending; the stencil fits the root, and the leftover finds no sleeve.

| # | picture (root) | built word | trap | plain look-alikes |
|---|---|---|---|---|
| 1 | body-parts/hand | hands | handle | hats · hamster |
| 2 | christmas/star | stars | start | stamps · stair |
| 3 | activities/reading (read) | reading | ready | resting · real |
| 4 | animals/cat | cats | catch | cans · cap |
| 5 | toys/car | cars | carrot | cards · cart |
| 6 | christmas/bell | bells | belly | belts · bench |
| 7 | accessories/hat | hats | hatch | hams · has |
| 8 | accessories/cap | caps | captain | camps · can |
| 9 | classroom/book | books | booth | boots · bone |

**Measured (critic, `work-c23/m114.js`).** In the designer's tables only the built word carried an ending in 8 of 9 set-A rounds, so a child could find it by spotting *-s/-ing/-ed* and never look at the picture. Now every round holds at least one OTHER real root + ending (*boots, bones, hats, hammers, stamps, stairs, drops, dreams, juggling, fixing, filling, calling, raked, resting* / *cans, cards, belts, hams, camps, stamps, hats, resting, boots*): the "pick a word with an ending" bot falls to 3.6 of 9 (set A) and 4.3 of 9 (set B), longest-card 2.0 and 1.1, shortest 1.2 and 1.1 (chance 2.25). Only reading the picture's root inside the word wins — set A by finding the root, set B (where the trap also starts with the whole root) by checking that the rest is a real ending: the "starts with the root" bot gets 9 of 9 in A (that IS the skill) and only 4.75 in B. Every look-alike shares the root's first two letters and is not root + ending.

Refused as traps (recorded so the build does not re-try): suffixes and compounds that ARE relatives of the root (*booklet*, *drummer*, *jumpy*, *fishy*, *rainbow*, *raincoat*, *drumstick*) — calling them "not built from the root" would teach a false boundary; spelling-change plurals (*buses*); words outside grade-1 vocabulary (*campus*, *pantry*, *antler*, *drumlin*). *ready* is kept: in grade-1 meaning it is not "read + y".

**Clue "Peel the ending" (reading by splitting).** One built word in the frame; slide the divider to where the root ends; on Check the root lifts to show its picture and the ending's sleeve slides onto the right part. 9 rounds: books (book|s) · hands (hand|s) · stars (star|s) · jumping (jump|ing) · reading (read|ing) · fishing (fish|ing) · rained (rain|ed) · jumped (jump|ed) · camped (camp|ed). The -ed sound marks shown after success: rained /d/, jumped /t/, camped /t/ (and in Add, played /d/, painted /ɪd/).

**Clue "Add the ending" (the old content, each inside a sentence that decides it).** The root sits in the sentence's gap; three sleeves; pick the one the sentence needs. The **signal word** (bold here, plain on screen) is what decides.

| # | sentence (gap = root) | root | answer | picture (optional) |
|---|---|---|---|---|
| 1 | I have **two** ___. | cat | cats | animals/cat ×2 (two identical copies) |
| 2 | **Three** ___ run in the park. | dog | dogs | pets/dog ×3 |
| 3 | Look at **all the** ___ on the shelf! | book | books | classroom/book ×4 |
| 4 | Look! Mia **is** ___ rope **now**. | jump | jumping | activities/jumping |
| 5 | We **are** ___ to school **right now**. | walk | walking | — |
| 6 | Ben **is** ___ his dad **now**. | help | helping | — |
| 7 | **Yesterday** we ___ in the snow. | play | played | — |
| 8 | It ___ all day **yesterday**. | rain | rained | weather/rainy |
| 9 | **Last week** I ___ a big red flower. | paint | painted | — |

Endings 3/3/3. Rounds 4–6 and 7–9 have a signal word before AND/OR after the gap so the child must read the whole sentence.

**Answer position.** Find: the built word's card slot is 1/2/3/4 balanced per pass (each slot 2–3 times), never the same slot twice running; Add: the right sleeve's slot (left/middle/right) 3/3/3 per pass; Peel: the right gap's position varies with the word (3rd–5th gap).

**Order:** order-only reshuffle per pass.

**Other locales** (the build authors each list from the locale's `scripts/worksheet-gen/data/b5/locales/word-parts.<loc>.json` — its `inflections` list and `picFamilies` roots — and one native + pedagogy reviewer checks every word). Only roots that stay UNCHANGED inside the inflected word are used (the stencil must fit letter for letter).
- **de:** plural sleeves -e, -en, -s (from the bank's inflection list e/es/s/st/t) and verb sleeves -e/-st/-t for ich/du/er (*ich spiele, du spielst, er spielt*): Add rounds use person signal words. Roots with umlaut plurals (*Hand → Hände*) are refused (the stencil would not fit).
- **nl:** -en, -s plurals; -t, -te/-de verb endings (*hij werkt*, *wij werkten*); roots with spelling changes (*boom → bomen*) refused.
- **sv / da / no:** plural -ar/-or/-er (sv), -er/-e (da), -er (no); definite -en/-et; past -ade/-de/-te (sv), -ede/-te (da), -et/-te (no). Words chosen so the root is unchanged (sv *katt → katter*, *hund → hundar*).
- **fr:** -s plural (silent! the sleeve carries a tiny "quiet" mark: you see it, you don't hear it) and verb -ent/-ons/-ez; roots unchanged (*chat → chats*).
- **es / pt:** -s / -es plural only (*gato → gatos*, *flor → flores*); verb endings replace the vowel and are refused.
- **fi:** plural -t and case endings that do not change the stem (*kala → kalat*, *kissa → kissat*, *pallo → pallot*); consonant-gradation words (*käsi → kädet*) refused.
- **it: NOT shipped (refusal recorded).** Italian plurals and verb endings REPLACE the final vowel (*gatto → gatti*): there is no unchanged root to lay a stencil on. (The word-parts bank itself refuses it's root-word face for the same reason.)
Each shipped locale needs ≥ 9 rounds per clue (the gate refuses < 7).

## 7. Check, the misses, the success
- **Check with an empty frame / no sleeve chosen:** hint, no miss — the frame (or the gap) pulses — "Lay a word in the frame." / "Pick an ending for the word."
- **Miss 1:** the stencil drops: on a look-alike, the window over the wrong letter flashes coral and the stencil rocks on it, then lifts; on a trap, every window glows but the leftover droops — no sleeve takes it — and the card slides back; in Peel, a divider in the wrong gap leaves a window half-covered (the stencil cannot fit over a split letter run) and the stencil rocks; in Add, the signal word lights gold and the sleeve pops off the root. · Find: "Look through the windows. Is every letter the picture's word?" · trap: "The picture's word is inside — but is the rest a real ending?" · Peel: "Find where the picture's word ends." · Add: "Read the whole sentence. Which word tells you how many — or when?"
- **Miss 2:** Find: the stencil stays hovering over the frame, its windows SHOWING the root's letters faintly (now the child can compare letter by letter); Add: the signal word lifts and a gold thread runs from it to the sleeve that belongs with it (e.g., **two** → -s); Peel: the root's last letter gets a small end-tick on the stencil edge. · "Compare each letter with the windows." / "{two} goes with {-s}." / "The word ends after this letter."
- **A new move takes the help away** until the next Check.
- **Success:** the stencil lies flat (*click*), the ending sleeve zips on, the root's picture gives a small nod, and the sleeve flies to its hook at the top. · Find: "{books} is built from {book} — {book} + {s}!" · Peel: "{jump} + {ed} = {jumped}. The {ed} says /t/." · Add: "{Yesterday} we {played}: {-ed} means it already happened!" (for -s: "more than one"; for -ing: "happening now").

## 8. Settings
1. **Clue:** Find the root (default) · Peel the ending · Add the ending — visibly different at rest (picture + four cards / one long word with a divider / a sentence with three sleeves).
2. **Look-alikes** (Find only): Plain (default, set A) · Tricky (set B, with a trap card that starts with the whole root) — visible at rest in the cards.

## 9. Words (EN source)
- title (shell, frozen): **Build Words with Endings** · instruction: "Find the root word inside a longer word, then the ending: -s, -ed or -ing."
- task lines: find — "Which word is built from the picture's word? Lay it in the frame." · peel — "Slide the line to where the picture's word ends." · add — "Read the sentence. Which ending does the word need?"
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drag a word card into the frame, then press Check."
- settings: "Clue", "Find the root", "Peel the ending", "Add the ending", "Look-alikes", "Plain", "Tricky". aria: "Picture: {name}", "Word card: {word}", "Frame: {word|empty}", "Divider after letter {n}", "Sleeve {ending}", "Window {n} shows {letter}, the root needs {letter}", "No ending fits {letters}".

**Locale traps:** roots must survive inflection unchanged (umlaut plurals, consonant gradation, vowel-swapping plurals refused; it refused entirely); fr silent plural -s (the sleeve shows a quiet mark); de capitalised nouns (the stencil's first window is a capital); the -ed sound marks are EN-only; sentence signal words are authored per locale (de *zwei*, *gestern*, *jetzt*; fi *kaksi*, *eilen*…). Sound off: windows, the rocking stencil, sleeves that fit or not, and the gold thread to the signal word carry every verdict.

## 10. Sound off, access, phones
- **Silent legibility:** the stencil shows letter-by-letter agreement; sleeves show which leftovers are endings; the hooks show what each ending means by the words collected under them.
- **Keyboard:** Tab through cards, Enter lays one in the frame; Peel: Left/Right moves the divider one gap; Add: Tab through sleeves, Enter fits one; Space = Check.
- **aria-live:** "Window 4 shows t; the root needs k." / "books is built from book plus s."
- **Taps:** cards ≥ 142 × 52, sleeves ≥ 72 × 52, divider hit column 44 px; picture 150 / 112 / 96 px.
- **Phone layout:** stacked; Find cards 2 × 2; Add sentence wraps; Check above the 360 × 740 and 320 × 640 folds (measured on every round, including the longest sentence).

## 11. Distinct from
- **Row 75 The Ending That Arrives With the Second Plate** (plural -s/-es appear when a second plate lands): counting triggers an ending; here a STENCIL proves a root is inside a word, and the leftover must be a real ending — a reading test, not a counting trigger.
- **Row 125 Photo, Window, Envelope** (verb forms develop into frames by tense): tense filing; here morphology — root plus ending — with the meaning collected on the hooks.
- **Row 130 The Mirror Chart** (letters spell a picture in a mirror): spelling to picture; here a fixed root is laid OVER words to test membership.
- **New 224 The Tile Twin / New 229 The Blink Viewer** (overlay pictures to compare): overlays of pictures; here a cut-out root over letters, and the leftover letters are the point.
- **Built registry:** no stencil or sleeve exists.

## 12. Build plan
- **Core state** `{locale, clue, lookalikes, round:{root, pic, built, ending, cards:[w]|null, sentence|null, signal|null}, frame:word|null, divider:int|null, sleeve:ending|null, misses, help}`.
- **Functions:** `lay(card)`, `setDivider(i)`, `fitSleeve(e)`, `stencilOver(word, root)` → `{windows:[ok|bad], leftover}`, `isEnding(leftover, locale)`, `check()` → `{ok, kind:'wrongLetter'|'fakeEnding'|'wrongSplit'|'wrongEnding'|'empty'}`, `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-root-stencil-core.js`): its OWN per-locale ending list and root table; asserts each built word = root + a listed ending exactly (string concatenation, no spelling change), each look-alike shares ≥ 2 initial letters with the root and is NOT root + listed ending, every Find round holds ≥ 1 non-answer card that is SOME other root + a listed ending (the "spot an ending" bot ≤ 4.5 of 9, longest/shortest-card bots ≤ 2.5), each trap starts with the whole root and its leftover is NOT a listed ending, Add rounds' signal words exist in the sentence and endings are 3/3/3, Find slot balance, every picture exists in a colour theme with the root's label (activity pictures: the root of the -ing label), no -er/-y/-let/compound traps, no it rows.
- **Mutations (one per rule):** accept a look-alike whose first three letters match · accept a trap (any leftover counts as ending) · let *walkt* be built · show the stencil's letters before Check · allow a split mid-root in Peel · Add answer always the middle sleeve · built word always in card slot 1 · keep help after a new move · ship an it row · accept an umlaut plural in de.
- **Pictures:** `weather/rainy`'s label is *Rainy* (its root is *rain*, as the activity pictures' -ing labels root to *jump/read/camp*); the picture is never captioned, so no shown word contradicts a label. Seen 2026-10-17 (`work-23/s112.png`, `s110.png`, `s109.png`): activities/jumping (skipping rope), reading, camping (a tent), weather/rainy, christmas/star, music/drum, body-parts/hand (a LEFT palm), animals/fish, pets/dog, animals/cat, christmas/bell, accessories/hat, accessories/cap. Still to view: classroom/book, toys/car. Label check: activities labels are -ing words (*Jumping*, *Reading*, *Camping*) — the picture is never captioned in Find/Peel (the caption would be the built word itself).
- **Risks:** Peel divider precision on phones (gap columns ≥ 22 px, snapping); sentence wrapping at 320 px.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a cut-out stencil that clicks flat or rocks on a wrong letter, gold sleeves that zip onto endings, and a trap card that almost fits.
2. **Would a teacher put it on the board?** Yes — "find the root, then the ending" is exactly how inflected words are read; the stencil shows the root never changes; the hooks gather what each ending means; and sentences make the ending choice a reason, not a guess.
3. **Would a parent trust it?** Yes — library pictures, each language's own endings (and no fake stencil where a language swaps vowels), calm, nothing sold.
4. **The invention:** a root-word stencil laid over longer words — only a word truly built from the root shows every root letter in its windows, and only a real ending slides into a sleeve.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 2→5 · distinctness 5→5 · reality 4→5
What changed:
- Find the root was solvable without the picture: the built word was the only card with an ending in 8 of 9 set-A rounds. Every round now carries other real root + ending cards; measured (`work-c23/m114.js`): ending-spotting bot 3.6 / 4.3 of 9, longest/shortest ≤ 2.0 (chance 2.25); the gate asserts it.
- Add-sentence names made neutral (Mia, Ben) instead of "the girl" over an unchecked picture.
- Distinct-from uses the current name of New 229 (The Blink Viewer); the *Rainy* label of the rain picture recorded.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
