# Part 7 — Assessments: design record

Master plan: `PLAN.md` Part 7 and §11 ruling 1 (student pages are ordinary printables; key, scoring sheet, class grid and "what next" page are Teacher-only). What teachers type: `docs/SEO/daily-system-demand/FINDINGS.md` §3.

## 1. Part 7.1 (started 2026-11-12): the engine and the English K–1 mathematics unit checks

### What a unit check is

A short paper check that belongs to one unit: two forms (A before the unit, B after it) built from the same blueprint, so a teacher can see what moved. It is a classroom check of this unit's lessons. It is not a standardized test: no percentiles, no validity claims, no cut score presented as more than guidance, and the copy says so.

### How an item is made: cut from the worksheet the lesson hands out

Measured 2026-11-12 over the 62 lessons of the 12 English K–1 mathematics units: the first worksheet type of 38 lessons is built of self-contained cards (`.ws-card`, `templates/layouts/card-grid.js`) that carry their own answers in the markup (`data-lcs-answer`, `data-lcs-correct`); 9 more are cards without a machine-readable answer (colouring and drawing tasks); 15 are whole-page tasks (a scene, a chart, a tracing page).

So an item of a check is **a card of the lesson's own worksheet type**, built by the same generator at the same level (difficulty 2) with a seed of its own, at the size it has on its worksheet. Nothing about the item is new: the task, the picture rules and the answer are the ones that were gated and reviewed for the worksheet. The key is the same markup with the answers shown, so a key cannot disagree with its page.

- **Blueprint of a unit check:** for each lesson of the unit, in order, two cards of the lesson's first worksheet type that has answer-carrying cards. A lesson without such a type is not in the check, and the check's page says which lessons it covers.
- **A section** is the cards of one lesson under the worksheet's own instruction line, numbered through the check.
- **Forms A and B:** the same blueprint, two seeds. Gate: no card of A is a card of B (compared by what the card asks, not by its markup), and both forms have the same sections with the same number of cards.
- **Pages:** sections flow onto pages of the worksheet shell (Letter for en), a section never split.

### Outputs per check

| File | Who gets it |
|---|---|
| Form A and form B, student pages | everyone, as a printable (metered like every PDF) |
| Answer key A and B | Teacher plan |
| Scoring sheet per student (one line per section: points, and the lesson it belongs to) | Teacher plan |
| Class grid (students down, sections across) | Teacher plan |
| "What next" page: per section the lesson, its easier and harder worksheet, the practice on screen | Teacher plan |

"What next" is generated from the unit's own data (the lesson's worksheets at three levels, its screen practice, its tool); every link must exist in the language (gate).

### Where it is shown

On the unit's page, as its own section with a findable name ("Unit check: before and after"). Benchmarks (beginning, middle and end of the year) and the assessments hub come in 7.4; they will get pages of their own.

### Gates (to build with the engine)

T1 every card of a form carries an answer and the key shows exactly these answers · T2 forms A and B share no card and have the same blueprint · T3 a section's instruction names nothing that is not in the section (read by the reviewer: an instruction written for a whole page may point at something a cut card lacks) · T4 nothing on a page overflows, measured in the browser · T5 every "what next" link exists · T6 no file or page says standardized, percentile, diagnostic of a disorder, or free · T7 the rules that bind items stay measured: where the answer sits (in both directions, over both forms), counting never includes 0.

### Review (rule #2)

One reviewer as an American K–1 teacher over contact sheets of the forms (a word review cannot see a picture) with the keys beside them: one right answer per card, the instruction fits the cut cards, the section tests what the lesson taught, two cards are enough to tell, the wording of the teacher pages.

## 2. What was built (2026-11-12) and what the first review changed

### The tools (`scripts/assessments/`)

| Tool | What it does |
|---|---|
| `lib/cut-cards.js` | builds a worksheet type with a seed of the check, renders it, and returns its cards with what is known of each: size, answers, where a right option sits, the shape of the task (`kind`), its numbers and size (`mag`), and what makes two cards the same task (`key`) |
| `build-checks.js --loc=en --subject=math --grades=K,1 [--unit=] [--png] [--debug]` | the blueprint, the two forms, the keys; stops when a key does not show every answer or a section leaves its page |
| `build-teacher-pages.js --loc=en` | three pages: how to use the check and its points; what to do next per part; a class record |
| `contact-sheets.js --loc=en` | per check one picture, key pages of form A over form B, for the reviewer and for reading |
| `assemble.js --loc=en [--check]` | `frontend/content/assessments/checks.<loc>.json`: what the site shows, with a fingerprint of every task of both forms |
| `gates.js [--poison]` | T1 blueprint · T2 no shared task · T3 the unit · T6 wording · T7 position · T8 strings (11 poisons); in `deploy.sh` |
| `live-check.js --loc=en` | the section on the unit page, the five files and what each answers to a visitor who is not signed in |
| `lists/<loc>.json` | what a reviewer ruled: lessons left out of a check, a direction reworded for cut cards, units without a check |

### How a section's cards are chosen (rules the first review forced)

The first build took the first cards of one worksheet page for each form. One reviewer, as an American K–1 teacher, read all 74 task boxes of six checks on contact sheets and found that this was not enough:

- **Form B must be the same kind of task as form A.** A missing-number page also prints plain sums; form A had asked `2 + ? = 6` and form B `4 + 2 = ?`. Now each card of B has the `kind` of its card in A (the unknown in the same place, the same sign), about the same size, and is never the same task: two or more numbers are a fact in any order (4 and 1 is 1 and 4); a card with one number or none is the same task only when it shows the same thing.
- **A section does not ask the same thing twice** (not the same answer, not two choices with the right option in the same place), and takes the larger tasks of a page first (a check of "within 10" had asked 1 + 1).
- **A page that hides a number inside the task is about that**: such cards before the plain results the same page prints.
- **The parts stand in lesson order.** The first build reordered them to save a page; the pre-check then asked for missing addends before take-away.
- **The key must show every answer.** Answers that sit in a drawing (the circle of a number bond, the brick of a number wall) were not written, and writing into a group erased its shape. The key now writes into the shape, and the build stops if an answer is not on the page.
- **Boxes are numbered 1, 2 inside their part** (they had kept their worksheet numbers).
- Each form chooses from eight built worksheet pages of the type, not from one.

Rulings (`lists/en.json`): two parts left out (which of two things is heavier: no sure answer for the pairs the generator draws; partners of 20 in a Kindergarten check: not something a child can try before the unit), two directions reworded for cut cards (odd or even; doubles). Nine strings of the teacher pages changed (what to say before Check A; "a part where a child does not have all the points" in place of "Check B is not higher than Check A", which flagged every child with full points twice).

### What the engine can and cannot build today (English K–1 mathematics)

5 of 12 units have a check. A unit gets one when at least three of its lessons hand out a worksheet that is one grid of answer-carrying cards with enough different tasks for two forms. The others fall short for reasons that are honest, not faults: worksheets that are a scene, a chart or a tracing page; cards that lean on a bank or a legend beside them; cards the child colours or draws on, whose answer is not in the markup; a type with too few different tasks (count the sides: four shapes). Raising this is work on the worksheet types (an answer mark on the colour and draw cards), not on the check builder.

### The site

- `components/units/UnitCheckSection.tsx` on the unit's page, for a check whose status is live: its parts with their lessons, what is not in it, the two forms, the Teacher-only files, and the sentence that says what the check is not.
- Student forms: `GET /api/quota/dl?kind=form&file=checks/<unit>/check-a|check-b`, counted like any PDF download; only these two names can be asked for, so a key cannot be fetched as a form (400).
- Keys and teacher pages: Teacher-only files of the kind `checks` (`kind=teacher`).
- Files: `out/teacher-files/<loc>/checks/<unit>/`, uploaded with `scripts/units/upload-teacher-files.sh <loc>`.

### The second look, and the rule that caused its findings

The same reviewer read the five rebuilt checks: one ready, four "publish after fixes", seven parts named. All seven came from one rule of the rebuild, **"the larger tasks first"**: 10 became the answer or the total almost everywhere, so one box answered another, a fact came back in another part, and form A took both hard doubles and left form B the easy ones. What replaced it (`chooseA`, `chooseB` in `build-checks.js`):

- **A fact stands once in a form, in whatever part, and in one form only.** A fact is the numbers of a task in any order, and a group of pictures counts as its number (3 camels + 1 + 4 is the fact 1, 3, 4, 8). Form B is chosen after every task of form A is known.
- **The boxes of a part do not share a total**, nor one of the larger numbers (11 and above; the labels of a number line, which every card prints, are not counted).
- **A section's cards are taken at a spread of the type's sizes** (two cards: three quarters up and two fifths up its range), and form B follows form A card by card: the same kind, a size within two or a fifth, the same case of "two numbers in one ten", "ten or more apart" or "equal". Where two candidates are equally far, form B takes the larger one for its first box and the smaller for its second.
- **A card that prints one number and asks about it is the task of that number** (9: odd or even? 16: which word?), so 9 cannot stand in both forms.
- **A size a worksheet draws badly is avoided** (`lists/en.json` → `avoid`: odd or even never with 10, where the fifth pair stands where a leftover picture would).

Gate T9 holds the result: card by card the same kind, sizes at the same level, no shared total in a part (`kinds` and `sizes` are kept in `checks.<loc>.json`). T2 now sees a fact that comes back in another part.

A lesson learned about the reviews themselves: both findings lists were about what a child can SEE across a whole form (an answer given away two boxes further down), which no rule about one section could catch. The pictures of whole forms, key included, are what was reviewed, and it is what the next sub-parts must give their reviewer too.

### What I found reading the rebuilt forms myself, after the second look

- A fact family (7, 3, 4) came back two parts later as "7 − 4": the fact test compared every number a card prints, and a fact-family house prints its three numbers a dozen times. A fact is now the DIFFERENT numbers of a task.
- A sum of three picture groups came back in form B in another order: the groups are pictures, so the card had no numbers to compare. A group of pictures is now a number of the task.
- Both forms' first ordering box was already in order (writing 1, 2, 3 from left to right was right without comparing). Such a card is not taken.
- Form B had an "equal" comparison where form A had none: equal, within one ten, and ten or more apart are three cases, matched card by card.

### Published 2026-11-12: five unit checks (English, Kindergarten and Grade 1 mathematics)

| Unit | Parts | Tasks | Pages per form | Lessons not in the check |
|---|---|---|---|---|
| `g1-add-subtract-within-10` | 7 | 11 | 3 | 7 |
| `k-position-size-patterns` | 3 | 3 | 2 | 2, 3 |
| `k-putting-together-number-bonds` | 3 | 4 | 2 | 3, 4 |
| `g1-doubles-three-addends-number-walls` | 3 | 5 | 2 | 2 |
| `g1-tens-and-ones` | 3 | 5 | 2 | 4 |

Seven units have no check (see "what the engine can and cannot build"). Review: one reader as an American K–1 teacher, two passes over contact sheets of whole forms with their keys (74 task boxes, then the five rebuilt checks), and my own reading of every form after each rebuild. The cut worksheet pages are cached (`out/assessments/_cut-cache`), so a change of the choice rebuilds in seconds; a change of a worksheet type, of the cutter or of the strings rebuilds what it touches.

### Next in Part 7

7.2 Grades 2 and 3 mathematics (a first trial built checks for 4 of 12 units before the stricter rules); raising the share of units with a check means giving the colour-and-draw worksheet types an answer mark the cutter can read (several already carry one under another name: `data-lcs-target`, `data-lcs-nth`, `data-lcs-key-ring`). 7.3 English literacy. 7.4 the checks of the beginning, middle and end of the year and the hub. 7.5 German and Swedish.

## 3. Part 7.2 (started 2026-11-12): the generators' own answer keys; Grades 2 and 3

### A key the worksheet type draws itself

Many worksheet types draw their answer key when asked (`ctx.answerKey`: a ring round the pictures to colour, a mark on the right group, a badge on the missing piece). The cutter now builds every page a second time from the same seed in that mode: those cards are the key cards of a check, and a card the child circles or colours, which carries no answer in the child's markup, takes its answer (and where it sits) from what the key marks. A type that marks nothing in either mode is still refused.

First result (English K–1): the Kindergarten unit "Counting to 10" gets a check (count and write, colour that many, how many at a glance, which group has more), and "Position Words, Size, and Patterns" a fourth part (the biggest one). The four other live checks keep exactly their tasks (their fingerprints are unchanged).

Also new: form B prefers a card whose answer form A does not have in the part (9 elephants, then 9 pears, is the same count).

### What my own reading of the first Grade 2–3 forms changed (before any reviewer)

- **Blank paper.** A card was set at the height it has on its worksheet page, where a page of four cards stretches each to a quarter of the page. The cutter now measures each card again with the grid let go (`nh`); a card whose pictures change size when let go keeps its page height. A check sets a card at `nh` + 16 px, and the build stops when anything is cut off inside a card. Area and Perimeter went from 4 pages to 3, Fractions from 3 to 2, Equal Groups from 2 to 1. Which cards a part takes is still decided on the page height (the reviewed checks keep their tasks).
- **A question picture stands in one form only.** A choice card is fingerprinted without its options (`ask`: the clock, the rectangle to match). Two cards that ask the same thing with other options are one task; form B never takes form A's.
- **The same picture twice among the options** (two identical halved circles to circle) is a weak box: such a card is not taken (`twins`). Three shapes in another order are the same box too (`shapes`, in the builder).
- **262 and 263.** Form B took the three-digit number nearest to form A's; it now takes one at least 5 % away and, when the pool has one, in another hundred.
- **A lesson with one worksheet per table.** "Multiplication facts for 2 and 5" hands out the table of 2 and the table of 5; the first alone asked no fact of 5. A ruling (`lists: blend`) lets a part take its boxes from several types of one lesson and shape in turn; form B follows type by type. The teacher pages name both worksheets.

### The review of 2026-11-12 (one reader as an American K–3 teacher, twelve sheets of whole forms with keys)

File: `scripts/assessments/reviews/en.review-g23-math.json`. Every key was right. 14 parts ruled (13 fix, 1 drop), 14 direction lines reworded, 17 notes. What was done:

| Finding | Done |
|---|---|
| Counting to 10: one number was the answer three times in a form | A single number (counted, coloured or circled among three) is an answer once in a form across its parts (`solo`) |
| Place value: the frame "[ ] ■×10 + [ ]" of "Make a Ten!" in Grade 2 | That lesson has no part (`drop`); recorded for the worksheet |
| 262 reads the same with the places in the wrong order | A three-digit answer with a repeated digit is not preferred (`plain`) |
| All four pairs to compare decided by the hundreds | A type that has pairs in one hundred gives a part one such pair and one the hundreds decide (`wide`: sameH) |
| A half of a group in form A, a fourth in form B | `sameGiven`: form B prints the fraction form A prints |
| Symmetry: library pictures keyed as symmetrical are not exact mirror images; the sphere is a flat circle | The unit has no check (`noCheck`); recorded for the worksheets |
| Clocks: a choice one minute from the key, the hand short of the marks; 24-hour time is not U.S. K–3 | The unit has no check (`noCheck`); recorded |
| Fractions: eighths in A, halves in B | `sameLook`: a card with about as much drawing, and never the same shapes |
| 2/4 keyed where 1/2 is also right | `lowestTerms` |
| Number line: 3/4 in A, the first mark (1/4) in B | `avoidAns`: no unit fraction and no 0 |
| 1/3 against 1/6 in A, 1/3 against 4/6 in B | `pairKind`: pairs that share the top or the bottom number, form B like form A |
| Ten direction lines written for a whole worksheet page or in British words | `instruction` per type |
| A "circle every shape" box: when is it a point? | Said on the teacher page (`tpHow3`) |
| The pale tint of a shaded fraction part may drop out on a copier | Darker in a check (`STYLE`); recorded for the worksheets |

Not done, and why: the place-value blocks of form A and form B both have 2 hundreds (the pool has no card of the same size in another hundred); the key does not ring the pictures of "circle that part of the group" (the worksheet type draws no key for it; the number is scored). The reviewer's findings on the published worksheets themselves are in the memory file of the content-fix session.

After the rulings I read every rebuilt form again; three faults of my own rules showed only there: the pair rule took the common pair first and left no room for the rare one (the rare one is now taken first); a guard against "too few cards after a ruling" also fired for types without a ruling and cost a Kindergarten part; the once-per-form rule missed a number circled among three (it read the numbers printed, not the answer).

### Published 2026-11-12: eleven unit checks (English mathematics, Kindergarten to Grade 3)

| Unit | Parts | Tasks | Pages per form | Lessons not in the check |
|---|---|---|---|---|
| `g1-add-subtract-within-10` | 7 | 11 | 3 | 7 |
| `k-position-size-patterns` | 4 | 4 | 2 | 2 |
| `k-counting-to-10` | 4 | 6 | 2 | 1, 2, 5 |
| `k-putting-together-number-bonds` | 3 | 4 | 2 | 3, 4 |
| `g1-doubles-three-addends-number-walls` | 3 | 5 | 2 | 2 |
| `g1-tens-and-ones` | 3 | 5 | 2 | 4 |
| `g2-place-value-to-1000` | 5 | 7 | 2 | 1, 2, 4 |
| `g2-equal-groups-equal-shares` | 3 | 4 | 1 | 1, 3, 4, 5 |
| `g3-starting-multiplication` | 3 | 5 | 2 | 2, 5 |
| `g3-area-perimeter-volume` | 5 | 7 | 3 | none |
| `g3-fractions` | 6 | 7 | 2 | 6 |

Fourteen of 25 English mathematics units have no check: twelve have fewer than three lessons whose worksheet is one grid of answer-carrying cards, two by a ruling. Three of the five checks published in 7.1 have other boxes in form B (the rule "form B prefers an answer form A does not have"); the reader passed them again.

### Next in Part 7

7.3 English literacy. 7.4 the checks of the beginning, middle and end of the year and the hub. 7.5 German and Swedish. More mathematics units get a check when worksheet types that are one drawing per page (charts, number lines with a bank) are given cards, which is work on the types, not on the checks.

## 4. Part 7.3 (2026-11-12): English literacy, and pages that are not a card grid

### Why the first trial gave no literacy unit a check

A literacy worksheet is seldom a grid of `.ws-card` directly on the page: it is rows of sentences, small picture cards in a wrapper, a page with a word bank. And its answers are seldom in the page markup: several types draw them only in their key mode, some by a style sheet of the key page, and the types that have a Level Set build their published copy 1 without any key mode at all.

### What the cutter does now (`lib/cut-cards.js`)

- **The tasks of a page.** The cards of a card grid as before (a grid directly on the page is cut exactly as in 7.1 and 7.2: the published mathematics checks kept their tasks through every rebuild, measured by fingerprint). Any other page: the largest group of three or more children of one element that are alike. A task stands alone when nothing else on the page takes room (a bank, a story, a legend); otherwise the type is refused.
- **Out of its page with its context.** A task keeps the classes of what it stood in (the wrappers are let go with `display:contents`) and the style sheets its type carries in the page.
- **The answer.** In this order: a mark in the page; a mark or a written answer in the key mode; what the rules of a key-only style sheet select (the mark is put ONTO those elements, because such rules name a card by its place on its page and a check numbers its boxes anew); a key card that differs from its page card. A type whose published copy has no key mode is built as copy 2 (the same page of other words, with its key).
- **What is a task of words.** Its key is what it says and shows (`t:` words, `p:` pictures), whatever its place on the page; its kind is how it is answered (choose or write, and how many), its size the count it asks for when that differs from card to card.

### What the builder does now (`build-checks.js`)

- A picture stands once in a form across its parts, and form B prefers pictures form A does not show; two boxes of a part do not print the same numbers (23 ÷ 2 with foxes is 23 ÷ 2 with mangoes).
- Form B is filled with a second try when the first choice leaves a later box empty; in a part of words it stands in another order than form A.
- Three boxes of numbers are a middle, a large and a small one (7, 6, 5 sides read as a countdown).
- The key: rings only on what is marked right; the answer of a row with a gap is written into its gap box; a note of the reader for the teacher under the direction (`keyNote`); the word of a picture the teacher has to say, printed in the box.
- One packing serves the child's page and the key (a key note makes a part taller).
- A text listing of every box of a check (`dump.json`: words, pictures by name, answer) is what a reader reads first.

### The review of 2026-11-12 (one reader as an American K–3 teacher with a phonics background)

File: `scripts/assessments/reviews/en.review-73.json`: 11 checks read from the text listing and one look at each sheet; 17 parts to fix, 11 direction lines, 15 notes; 1 publish, 10 publish after fixes. Done with it:

| Finding | Done |
|---|---|
| A honey jar is "jar", birds in a nest are "birds" | `avoidPictures`; in Kindergarten the teacher names every picture (direction lines), and the key prints the word in the box |
| Five-sound words in Kindergarten; fox has four sounds; tiger, zebra are not spelled as they sound | `onlyPictures`: three-sound words spelled as they sound, both forms |
| Spelling: horse, camel, apple, lemon (the worksheet has no regular word) | A key note: before the unit the point is for a spelling that shows every sound in order |
| "vulture" in first- and second-grade sentences | `avoidText` |
| Opposites far above Grade 1; a wrong choice that can be defended | `onlyText`: targets a first grader reads |
| One syllable in one form, three in the other | Both forms scoop two words of two syllables |
| A hint word under one picture of four | The row is not taken |
| "What time does … ?" is as right as "When does … ?" | A key note |
| Sides 7, 6, 5 against 8, 4, 3; tangram of 3 pieces against 2 | The spread of three; `sameLook` |
| A mirror picture of an animal that faces the front | That lesson has no part |
| "_ × 5 = 25" (copy the 5); 5 = 2 + 2 + 1 in Grade 2 against 13; odd in one form only | `avoidEcho`; `avoid`; `parity` |
| Two mathematics checks that leave out the main skills of their unit (graphs; regrouping and numbers above 100) | No check for those units (`noCheck`) |

My own reading before and after found what the reader could not see or what my rulings broke: a key that ringed every option (key rules of several pages merged), the same division in both forms with other pictures, a number of the page badge taken for the size of a task, a part reduced to one box by a rule made for sums, a published check changed by a rule meant for words (bound to tasks of words now). The findings on the published worksheets themselves are in the memory file of the content-fix session.

### Published 2026-11-12: eighteen unit checks (English, Kindergarten to Grade 3)

| Unit | Subject | Parts | Tasks | Pages per form | Lessons not in the check |
|---|---|---|---|---|---|
| `g1-add-subtract-within-10` | math | 7 | 11 | 3 | 7 |
| `k-hearing-sounds-in-words` | literacy | 5 | 14 | 2 | 1 |
| `k-position-size-patterns` | math | 4 | 4 | 2 | 2 |
| `k-counting-to-10` | math | 4 | 6 | 2 | 1, 2, 5 |
| `k-shapes` | math | 3 | 6 | 2 | 4 |
| `k-putting-together-number-bonds` | math | 3 | 4 | 2 | 3, 4 |
| `g1-doubles-three-addends-number-walls` | math | 4 | 7 | 2 | none |
| `g1-tens-and-ones` | math | 3 | 5 | 2 | 4 |
| `g2-place-value-to-1000` | math | 5 | 7 | 2 | 1, 2, 4 |
| `g2-equal-groups-equal-shares` | math | 4 | 6 | 2 | 3, 4, 5 |
| `g3-starting-multiplication` | math | 3 | 5 | 2 | 2, 5 |
| `g3-division` | math | 3 | 4 | 2 | 2, 4 |
| `g3-area-perimeter-volume` | math | 5 | 7 | 3 | none |
| `g3-fractions` | math | 6 | 7 | 2 | 6 |
| `g1-sounds-spelling-syllables` | literacy | 3 | 6 | 2 | 1, 2, 4 |
| `g1-reading-sentences-and-stories` | literacy | 3 | 4 | 1 | 1, 2 |
| `g1-words-and-how-they-work` | literacy | 4 | 7 | 2 | 1, 2, 4, 7 |
| `g2-sentences-and-grammar` | literacy | 3 | 5 | 1 | 1, 2, 4 |

Mathematics 13 of 25 units, literacy 5 of 11. **What still has no check and why:** the six other literacy units are built of whole-page tasks (matching lines, sorting into bins, a story with questions, a page with a word bank, tracing): a page of that kind is one task and cannot be cut into boxes. A check for them needs a second form of item (the whole small page as one part, or items authored for the check). That is the open limit of this method; it is not hidden by thin checks.

### Next in Part 7

7.4 the checks of the beginning, middle and end of the year and the assessments hub. 7.5 German and Swedish (the same engine; the rulings lists are per language).
