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

### Known limits (5.1)

- No answer key (the worksheets of the printable families ship none); the picture-word lists are true of the page for everyone only.
- Two Kindergarten packs for the start of the year share the worksheet type "Find the Letter" with different pages (the start of Kindergarten has few literacy pages a class can do alone).
- `1:logic-picture-clues`, `K:letter-case` and `K:alphabet-order` keep a script in the text files and are in no pack.
