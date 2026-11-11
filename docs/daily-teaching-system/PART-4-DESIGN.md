# Part 4 — units at scale: working record

Master plan: `PLAN.md` Part 4. The unit and sub pack formats, the delivery (pages, Teacher-only files, noindex pilots) and their gates: `PART-3-DESIGN.md`. What the units do not have yet: `units/GAPS.<loc>.md` (generated).

## 1. Where it stands (2026-11-11)

English: **32 units, 178 lessons**, every one a `pilot` (noindex, in no sitemap).

| | Units | Lessons |
|---|---|---|
| Math, Kindergarten | 6 | 30 |
| Math, Grade 1 | 6 (one is the Part 3 pilot) | 32 |
| Math, Grade 2 | 6 | 34 |
| Math, Grade 3 | 7 | 41 |
| Literacy, Kindergarten | 4 (one is the Part 3 pilot) | 22 |
| Literacy, Grade 1 | 3 | 19 |

Not built yet: literacy Grades 2 and 3 (about 20 lessons), the year plans, the units hub, the additive "Part of the unit" blocks on existing pages, the teacher guides of the new units (PDF), the other ten languages.

## 2. How a unit is made

1. **The working sheet.** `node scripts/units/dump-points.js --loc=en --subject=math [--grade=K]` prints every teaching point of a subject in teaching order beside what its worksheets PRINT (each type's own title and instruction, pages per level, Level Set, screen copy), the tools and the live activities.
2. **The unit list** is authored by hand from that sheet: which teaching points make a unit, in which order, under which title. `scripts/units/draft-defs.js` turns a list into definitions (two worksheet types per lesson by a fixed preference, or the pages the list names) and refuses a point that cannot make a lesson. A list file is a drafting input and is not kept; `frontend/content/units/defs/<loc>.json` is the source from then on.
3. **The teacher notes** are written per teaching point from the page's printed instruction, in `scripts/units/notes/<loc>-<subject>-<grade>.js`; `notes/apply.js` merges them into `content/units/points/<loc>.json` (`--check` proves the merge).
4. **Assemble, gate, read:** `assemble.js`, `gates.js` (and `--poison`), `check-live.js`, `gap-report.js`, then my own reading of assembled units.
5. **Review (rule #2):** `dump-for-review.js --loc=en --units=<id prefixes> --name=<part>` writes a part of the units as one text file; one reviewer per file, at most two at a time. Corrections are a JSON file per review in `scripts/units/notes/reviews/`, applied by `notes/rewrite.js` (it rewrites the note files; a new note names the file it joins).

## 3. Rules that came out of this part

- **A lesson needs two real assets, and the same page twice is one.** Worksheet types, a classroom tool, practice on screen. Practice on screen is an activity, or a page with a Check button that is NOT one of the pages the lesson hands out. (The first rule counted only activities; it kept a wrong activity in a lesson because removing it would have dropped the lesson, and it left out lessons such as fractions on a number line that have six pages per level and screen copies.) Poison: a lesson whose only screen practice is the very page it hands out must fail.
- **The activity of a lesson is chosen, not taken.** The content graph lists activities per teaching point loosely; the first live one is often of another grade or another skill (an addition activity under multiplication hops, a position-words activity under grid squares). A definition may name the activity (`activity`) or refuse one (`activity: null`); the reviewers judged every screen line.
- **A lesson may name the standards its own pages teach** (`standards`: ids of the point's rows in the registry). A teaching point is wider than the two or three pages one lesson hands out: the point "draw the clock hands" reaches five-minute times, the Grade 1 lesson uses the o'clock and half-past pages only.
- **A row that only prepares for or extends an objective two or more years away is not shown.** A Grade 4 code on a Kindergarten lesson reads as a mistake.
- **An activity's title names its own grade.** In a unit of another grade only the activity's name is shown ("Flat or Solid?", not "… for Kindergarten").
- **Two pages of one lesson never carry the same title;** a definition gives one of them a label (`titles`). A placeholder at the end of a type's title ("Color by Number: {UNIT}") is dropped; one in the middle is refused.
- **A note is written from the page, and the page's numbers are checked.** My note for "Number Bonds to 20" described teen numbers as ten and some more; the page asks for the partner that makes exactly 20. The reviewer could not see the page either and proposed a standard from my wrong note. I read the generator and rewrote the note. Where a note names a range, the range is now read from the type's configuration.

## 4. The review of the English math units (rule #2)

Two reviewers at once, each an American teacher and math coach for its grades, each over one text file: Kindergarten and Grade 1 (11 units, 51 lessons, 71 KB) and Grades 2 and 3 (13 units, 75 lessons, 93 KB). Both read every lesson and said so. About 150 findings; **193 note texts corrected**, the units restructured, eleven rows of the US registry corrected through the registry's own review path (`out/curricula/en/own-audit-units-2.out.json`, reasons in `curricula/REVIEW-NOTES.en.md`).

What they found that no gate could:

- **False rules in "words to use".** "TUES-day has the U, THURS-day has the H" (Thursday has a U too). "1st, 2nd, 3rd; all the others end in th" (21st, 22nd). "The total always comes first in a division" (false from Grade 5 on). "The remainder is always smaller than the size of a group" (wrong for the same lesson's sharing page, where it is compared with the number of boxes). "A cone has a round bottom, a pyramid a flat one" (both are flat). "A rectangle has only 2 mirror lines" one lesson after "a square is a rectangle".
- **A check that defeats the lesson.** "Fold paper to check that the parts match" makes children reject real halves: a rectangle cut corner to corner has two equal halves that do not fold onto each other.
- **Mistakes described the wrong way round.** Counting the corner dot of an array for both the row and the column is correct; the real mistake is refusing to count it twice. Counting the marks one lands on gives the right number of hops; counting the starting mark gives one too many.
- **Content of another grade presented as this grade's.** Grams and milliliters in Grade 2 (Grade 3 and 4 in Common Core), rounding in Grade 2 (Grade 3), remainders in Grade 3 (Grade 4), four-digit numbers in a unit called "Within 1,000". Lessons moved to the grade where the standard sits, or the description says "a first look".
- **Titles that promise more than the lessons hold.** "Addition Strategies Within 20" held no counting on and no making ten; "Putting Together and Taking Apart" held no taking away; "Multiplication" reached the 2s and 5s. Retitled for what is inside.
- **Order that does not build.** Comparing by counting before counting; writing numbers before the lesson that teaches writing them; estimating asked in the lesson before the one that teaches it.
- **British words** ("measuring jug", "join the dots", "go along", "number sentence" in Grade 3) and sentences no American teacher says ("Which part says itself again and again?").

Not taken as given: a Kindergarten-standard claim built on my wrong note (§3, last rule); quoting a browser's or a page's exact label where I could not see it; the wish to split one teaching point over two lessons (a lesson is one point: the page in question left the lesson instead).

## 5. Not reviewed yet

The literacy notes of Kindergarten and Grade 1 (35 lessons) and the seven notes added after the review (heavier or lighter, number machines, cube towers, fractions on a number line, a fraction of a group, a or an, synonyms). They go to one reviewer together with the literacy of Grades 2 and 3. No unit is indexed before that.
