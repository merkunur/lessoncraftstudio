# Part 5 — Sub packs: design record

Master plan: `PLAN.md` Part 5. The format (page, guest teacher pages, gate) was built as a pilot in Part 3 (`PART-3-DESIGN.md`). This file records what Part 5 adds and decides.

## 1. Part 5.1 (2026-11-11): Kindergarten and Grade 1, English (US)

**12 packs:** per grade three times of year (start, middle, end) and two different days for each. A teacher who is out twice in one season has a second day; "two themes" of the plan became two days, because two pages that differ only by a picture theme would be near copies for a searcher and for a class.

### What a pack is made of

- `frontend/content/sub-plans/defs/en.json` — WRITTEN by `scripts/sub-plans/lists/build-en-defs.js` (edit the lists there): per pack the blocks, each a block kind, minutes, teaching point and worksheet type.
- `scripts/sub-plans/texts/en-k.js`, `en-1.js` — the guest teacher scripts, one per teaching point (say, start together, if a child is stuck), `byType` for what is true of one worksheet type; merged into `frontend/content/sub-plans/scripts/en.json` by `apply-texts.js` (`--check`).
- `scripts/sub-plans/assemble.js` → `packs.en.json` (generated). `build-pack.js` → the guest teacher pages (PDF, Teacher-only).
- Page strings `ui.en.json` (120): the pack page, the hub, the guest teacher pages, the forms.

### Rules

1. **Review only, by time of year** (`scripts/sub-plans/position.js`, enforced by the assembler and by gate P8 with a poison): a block may take a point of an earlier grade, a point no plan of the grade teaches (puzzles, drawing, science), or a point whose unit has ended by the pack's time of year in the grade's plan (start: first third of the plan's weeks; middle: two thirds). The pilot pack failed this rule on its first run (ABC order, taught in the last week, in a mid-year pack).
2. **A page is handed out once per grade.** Two packs of a grade may use one worksheet type; the assembler gives the second its next published page (gate P8: no page twice in a grade).
3. **No title with a placeholder** (types made per letter or per picture) in a pack.
4. **Scripts are checked against the picture, not the directions.** The first scripts were written from each worksheet's printed title and directions; reading contact sheets of all 96 pages (`out/sub-plans/thumbs/`) changed about 40 of them: a page of size analogies was scripted as meaning analogies; "three pictures" were four; a code used the numbers 3, 2, 6 and 5 where the script said "all the 1s first"; number-line hops were already drawn; coins print their value; a word-family page has two families; a tree page gives bare trees to add to. A spelling page without a word bank (scooter, balloon, crayons) was replaced.
5. **The guest teacher has no answer key**, so a script names the picture words of the page for everyone where a sound task depends on them (bus, hat, sun, pig …), and no pack holds a puzzle whose answer the guest teacher cannot check or explain (the logic grid left; the picture sudoku moved from the start of Grade 1 to the middle).
6. **Block kinds:** morning, reading, phonics (word work), writing, math, numbers, problems, science, logic, drawing, closing. Reading, writing and math are required.

### The review (rule #2)

One reviewer in two roles (an American K–1 teacher; a guest teacher who has only these pages), every block read: 13 scripts and 8 strings corrected (`scripts/sub-plans/reviews/en-k-1.review.json`, `.ui.review.json`, applied by `apply-review.js`), and structural findings that changed the packs:

- **The first weeks of Kindergarten** get no page that needs letter names (matching capital and small letters left) or alphabet order (the ABC dot-to-dot left); pre-writing strokes come before letter tracing; the "All About Me" page takes 20 minutes.
- **The blocks do not fill a school day** (75–105 minutes of seat work in Kindergarten, 135–150 in Grade 1). The guest teacher pages now say so and carry a list "When there is time between blocks" (read aloud, a movement game, quiet reading, drawing, I Spy), printed before the scripts.
- **Hand-out wording per block:** a block with an easier page and no page for early finishers no longer says "keep the page for early finishers ready".
- **Class information sheets:** who may pick up each child; where name tags, crayons and counters are; snack and where the class goes for each part of the day.
- **Feelings page:** nobody is asked why in front of the class; the guest teacher notes the child's name for the teacher and tells the office if a child says something worrying about their safety.
- **Word problems at the end of Grade 1:** the children read the stories themselves after the first.
- British wording printed on five English worksheets ("tick", "join the dots") is recorded for the content-fix session.

### Pages

- Hub `/en/sub-plans` (`components/sub-plans/SubPlansHub.tsx`): the packs by grade and time of year; noindex while every pack is a pilot; in the sitemap (shard 3) when packs are live.
- Pack page: breadcrumb to the hub and, under the samples, the other days of the same grade.
- Names (demand findings, Part 0.3): "Kindergarten Sub Plans: Start of the Year, Day 1"; page title "Kindergarten Emergency Sub Plans: …"; the description says "no-prep emergency sub plans".

## 2. Part 5.2 (2026-11-11): Grade 2 and Grade 3, English (US)

**12 more packs** (`g2-early-1 … g3-late-2`), 96 blocks; the English set is 24 packs. Texts: `scripts/sub-plans/texts/en-2.js`, `en-3.js`; day lists in `lists/build-en-defs.js`.

### What the grades above Grade 1 changed

1. **A harder page as the page for everyone** (`level: 'hard'` in a block's definition). The catalogue has no Grade 3 reading passage; its Grade 2 story types each have a harder page (the same short story, two inference questions, one written answer). A Grade 3 pack hands that page to everyone, the standard page is the easier page, and there is no page for early finishers. Such a block needs a script of its own (`byType` key `<type>+`; the assembler refuses the block without it), and its id for the reviewer is `<point> / <type>+`. Used for five stories, the number machines, the division stories, the root-word sort and the retelling page.
2. **A printed title that is not the type's** is given in the block's definition (`title`): one story type's harder pages carry their own story title.
3. **No holiday page** (`HOLIDAY_PAGE` in `position.js`; assembler; gate P8 with a poison): a sub day can fall on any date and not every child keeps every holiday. Three pages of the Grade 1 packs changed with it (an easier page and two pages for early finishers).
4. **Grade 2–3 wording of the guest teacher pages:** a ui key with the suffix `_23` replaces the key without it in the packs of Grades 2 and 3 (read-aloud from a chapter book, counting by fives around the room, Twenty Questions, three sentences about the day). `build-pack.js` picks it.
5. **Answers for the guest teacher.** Every script whose page has checkable answers names them ("For your own reference, on the page for everyone …"). They were read off the page pictures, then checked against the printed text of each worksheet's PDF (`pdftotext`), then verified by the reviewer.
6. **Minutes are what the page takes**, not a timetable slot: a page of four to six short items is 10 minutes. The packs state 105–130 minutes of seat work (the first assembly stated 130–155).

### The review (rule #2), two passes

**First pass** (one reviewer as a Grade 2–3 teacher and as a guest teacher, every block; `reviews/en-2-3.review.json`, `.ui.review.json`): 24 scripts and 1 string corrected, every reference answer verified, and 18 structural findings. What they changed:

- **Mid-year Grade 2 reading** was Kindergarten work (circle "sh"; "Circle the seal.") → a clue-reading page and a riddle page.
- **Grade 3 reading** was a Grade 1–2 task → the harder pages (rule 1).
- **× and ÷ at the end of Grade 2** are Grade 3 signs in US classrooms → repeated addition, equal parts and change from two quarters; the pages with the signs moved to Grade 3 or left.
- **Start of Grade 2** held new content (100 more and less to 960; two-digit column addition) → Grade 1 pages; the two pages moved to the middle and the end of the year.
- **Start of Grade 3** had no regrouping → addition with carrying and subtraction with borrowing.
- **End of Grade 3** held pages two grades too low (his / her / their, machines that add 7, a drawing page as the writing block) → rounding to 10 and 100, the harder machines, a retelling without sentence starters.
- **The order of the planets** is no K–3 standard → animal adaptations.
- The guest teacher pages now tell the guest teacher that several pages need crayons.

**Second pass** (one reviewer, the reworked days and the 21 new scripts only; `reviews/en-2-3.review2.json`): every reference answer right, 13 scripts corrected, no finding that blocks a day, seven blocks given fewer minutes. What it changed: the Grade 3 reading scripts no longer say the answers are "not in the story in so many words" (untrue of question 3) and, from the middle of the year on, ask for three sentences on the back about what happens next; the family riddles are modeled with stick people and stay with the family on the page, never the children's own; the change page names what each child buys and gives early finishers the other three animals; the retelling page's script says that the page has no starters although its title does. Left as it is and recorded: neither mid-year Grade 2 day has a story (the plan teaches story questions in its last unit, so the review rule refuses them before the end of the year).

**A tool fault the rework found:** `apply-review.js --new` treated a point whose script lives in the scripts file of the first pilot pack as a new point and replaced the point's own script, which a live Grade 1 pack uses. Caught by comparing every live script part with the committed file before the commit (0 differences after the repair); the tool now reads the scripts file first.

### Known limits (5.2)

- The guest teacher cannot check the two find-the-differences pages, the two sudokus, the grid pictures and the two number mazes without a solved picture; the scripts say how the children check themselves.
- Printed wording on the worksheets that is British or not a US school term ("tick", "break", "cupboard", "work out", the titles "Word Classes", "Word Fields", "Number Walls") is explained in the scripts and recorded for the content-fix session; three sentences of the verb page G2-335 take two right answers (the script says so).
- The literacy catalogue above Grade 2 is thin: Grade 3 word work and writing use Grade 2 types at their harder level.

## 3. Measurement (rule 12 of the plan)

Sub plans are live in English. Rule 12 allows two more markets before the read; a pack needs the units of its language for the review rule, so the only markets that can follow now are German (5.3: single lessons by grade and subject, the form the harvest found there) and Swedish (no indexable pack pages unless a native reviewer finds the search words). French full days wait for the French units. The Search Console read is on **2026-12-09** (the same read as the units):

- **Pages:** `/en/sub-plans` and the 24 pack pages (sitemap shard 3).
- **Read:** impressions, clicks and average position per page; the queries that show a pack page (expected heads: "emergency sub plans" with a grade, "sub plans" with a grade, "no prep sub plans"); beside them the 28-day numbers of the baseline (`docs/SEO/daily-system-baseline/`), to see that no old page lost what a pack page gained.
- **Decides:** which form each market gets in 5.3 (PLAN §12, Part 0.3, point 3), and whether a third day per time of year is worth writing. A pack page with impressions and no clicks gets a new title before anything else is built.

## 4. Part 5.3 (2026-11-11): German, single substitute lessons

**The form follows the market.** Germany does not search for a substitute day; it searches for one lesson by subject and school year ("Vertretungsstunde Mathe Klasse 2", "Vertretungsstunde Deutsch", "Vertretungsstunden Material"; `docs/SEO/daily-system-demand`, FINDINGS §4). A German pack therefore has the form `lesson`: one 45-minute lesson of one subject for one school year and one time of year, four blocks (an opening page, two pages of work, a closing page), 40–45 minutes. **18 lessons** to start: Klasse 1–3 × Mathe and Deutsch × Schuljahresanfang, -mitte, -ende (`lists/build-de-defs.js`, ids `m1-early … d3-late`), hub `/de/sub-plans` ("Vertretungsstunden für die Grundschule").

### What the second language changed in the builder

1. **A point is placed by the language's own units** (`position.js`): the school year in which the German units teach it, not the grade in the point's id. A page of US Kindergarten content that no German unit holds is first-weeks work of Klasse 1; the times tables are Klasse 2 work in Germany because the German unit teaches them there. English packs are unchanged by it (`assemble.js --loc=en --check`).
2. **`packShape`** (`position.js`, used by the assembler and gate P4): a day needs five blocks with reading, writing and math; a lesson needs three or four blocks, 35–45 minutes, the opening block first and the closing block last.
3. **Holiday words per language** in `HOLIDAY_PAGE` (weihnacht, ostern, nikolaus, advent, fasching, karneval, st-martin, muttertag).
4. `apply-review.js` can start a language (no packs file and no scripts file yet), and a point that is used with its harder page only keeps that script as its own.
5. **`ui.de.json`** has exactly the English keys (gate P6) and is written for one lesson: "Die Stunde im Überblick", "Vor der Stunde", "Während der Stunde", "Wenn Zeit bleibt", "Klasseninfo". The site strings use "du" like the rest of the German site; the pages for the covering teacher use "Sie".

### How the pages were chosen and checked

All 72 German pages were read as pictures (contact sheets) and as the printed text of their PDFs before a script was written. Refused while reading: the initial-sounds page K-221 (a wine glass and a jeep among the pictures, and it asks children of the first school weeks to write letters), K-228 and K-232 (pictures with two possible names, a Christmas tree), the picture sudoku G3-348 (two look-alike red fruits). German specifics the scripts carry: every picture page is named aloud together first, so that each child claps or rhymes the same word; "halb sieben" for 6:30 and both "Viertel vor zwei" and "drei viertel zwei"; nouns are capitalized in the fix-the-sentence pages, which the page's own key does not say.

### The review (rule #2)

**First pass** (one reviewer as a German primary teacher and as the colleague who covers the lesson; `reviews/de.review.json`, `de.ui.review.json`): 29 scripts and 2 strings corrected, every answer checked against the printed text or the page (clock hands and kite strings read from the PDF's vector data), six findings marked "must", after which five lessons were rebuilt:

- **Start of Klasse 2** worked in numbers to 100 (Klasse 1 ends at 20) → number walls and doubling within 20; the hundred-chart pages moved to the middle of the year.
- **Start of Klasse 3** held three-digit numbers and written addition, both new in Klasse 3 → number walls to 100, shopping with three prices, counting by threes; written addition moved to the end of the year.
- **Start of Klasse 2 Deutsch** sorted nouns, verbs and adjectives before verbs and adjectives are introduced → opposites; the word-class page opens the first Klasse 3 lesson.
- **First weeks of Klasse 1** traced six capital letters, which a covering teacher would drill with wrong strokes → a second tracing picture; the letters moved to the middle of the year, the harder reading pages to the end.
- Half hours became full hours at the end of Klasse 1; the hard synonym cards in the middle of Klasse 2 became synonyms with pictures; one opener of five minutes got ten.
- One script was wrong against its page (the two find-the-differences pairs are stacked, not side by side).

**Second pass:** the same reviewer on the rebuilt lessons and the nine new scripts (`reviews/de.review2.json`); result in the PLAN entry.

### Known limits (5.3)

- The German plans the review rule reads are short (7 to 10 plan weeks per subject and year); the reviewer's judgement of what a class has met by the start of a year was stricter than the rule and decided the start-of-year lessons.
- Printed defects on about 25 German worksheets (ambiguous pictures, nouns in lower case on one page, answers that can be read off the position) are recorded for the content-fix session; the scripts name the picture words where a task depends on them.
- Klasse 3 Deutsch reads Klasse 2 stories at their harder level; they are short for the year.

### Known limits (5.1)

- No answer key (the worksheets of the printable families ship none); the picture-word lists are true of the page for everyone only.
- Two Kindergarten packs for the start of the year share the worksheet type "Find the Letter" with different pages (the start of Kindergarten has few literacy pages a class can do alone).
- `1:logic-picture-clues`, `K:letter-case` and `K:alphabet-order` keep a script in the text files and are in no pack.
