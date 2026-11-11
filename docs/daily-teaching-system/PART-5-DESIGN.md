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

### Known limits

- No answer key (the worksheets of the printable families ship none); the picture-word lists are true of the page for everyone only.
- Two Kindergarten packs for the start of the year share the worksheet type "Find the Letter" with different pages (the start of Kindergarten has few literacy pages a class can do alone).
- `1:logic-picture-clues`, `K:letter-case` and `K:alphabet-order` keep a script in the text files and are in no pack.
