# Part 4 — units at scale: working record

Master plan: `PLAN.md` Part 4. The unit and sub pack formats, the delivery (pages, Teacher-only files, noindex pilots) and their gates: `PART-3-DESIGN.md`. What the units do not have yet: `units/GAPS.<loc>.md` (generated).

## 1. Where it stands (2026-11-11)

English: **36 units, 200 lessons, 7 year plans, one hub**, all `live` (indexable, in sitemap shard 3) since Part 4.4.

| | Units | Lessons | Weeks | Year plan |
|---|---|---|---|---|
| Math, Kindergarten | 6 | 30 | 7 | yes |
| Math, Grade 1 | 6 | 32 | 8 | yes |
| Math, Grade 2 | 6 | 34 | 9 | yes |
| Math, Grade 3 | 7 | 41 | 10 | yes |
| Literacy, Kindergarten | 4 | 22 | 7 | yes |
| Literacy, Grade 1 | 3 | 19 | 5 | yes |
| Literacy, Grade 2 | 3 | 18 | 6 | yes |
| Literacy, Grade 3 | 1 | 4 | 1 | no (a plan needs three units) |

Not built yet: the other ten languages (4.5–4.14). What the English units lack is listed in `units/GAPS.en.md` and in §5 below (topics a US teacher expects under a title and the site has no page for).

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

## 5. The review of the English literacy units (rule #2)

One reviewer, an American K-3 teacher, over one text file: the ten literacy units and the five math lessons written after the math review (62 lessons, 740 lines; read in full). About 110 findings, twelve of them errors a teacher would meet in class. **87 note texts corrected** (`scripts/units/notes/reviews/en-literacy.review.json`), **14 rows of the US registry** corrected through the registry's review path (`out/curricula/en/own-audit-units-3.out.json`, reasons in `curricula/REVIEW-NOTES.en.md`), units reordered and retitled.

What the reviewer found that no gate could:

- **Rules that fail as stated.** "Yesterday I ___ed" as the test for a verb teaches "goed", the very mistake the unit names two lessons later. "Is the vowel before it short or long?" for ck gives "milck". "Write a letter for every tap" contradicts the lesson before it (sh is one tap and two letters). "Each part has a vowel" marks pup-py wrong unless y counts. "Unlock: not locked" is false (on a verb un- means undo).
- **An arithmetic error in a note:** 2 → 4 was given as fitting "+ 4".
- **Mistakes the page cannot produce.** "Chair is sorted as a c word" on a page with pictures and two letter teams only; "not big" as an answer on a draw-a-line page; "wear hats" on a circle-the-choice page. A note's mistake is now checked against what the child can physically do on the page.
- **A method named as the mistake.** Sounding out sight words was called the error; most Kindergarten sight words are decodable, and only the irregular part is learned by heart.
- **Standards of the wrong grade or kind.** A Grade 3 prefix lesson carried only the Grade 2 code; a and an in Kindergarten was "prepares" though the page teaches the Grade 1 standard outright; a research standard on pages where nothing is read.
- **Speech that is not an error.** /f/ or /d/ for th, pin and pen said alike, "he do" and "we was": the notes now tell the teacher to teach the spelling or the school form without calling the home form wrong.
- **Two grades saying the same thing.** The Grade 1 and Grade 2 notes on opposites, synonyms, a and an and missing words were near copies; the later grade's note now starts where the earlier one ends.
- **Titles and order.** Loops were promised on pages without loops; "Stories, Facts, and Writing" had one fact lesson and no text to read (now "Reading Stories and Writing"); word families came after sound boxes with digraphs (now before); sh and ch, the hardest Kindergarten lesson, sat in the middle of its unit (now last).

Checked in the generator where the reviewer could not see the page: the number machines PRINT their rule (the lesson is using a rule, not finding it; objective and note rewritten); the English word-family pages are one-syllable rime families (the two-syllable standard left the lesson).

Not changed, and why: an activity that practices the next lesson's skill stays where removing it would leave the lesson with one asset (Find the letter); the same activity under two grades stays where no other exists; cursive stays in Grade 2 with "(for states that teach cursive in Grade 2)" in its objective.

**Topics a US teacher expects under a title and the site has no page for** (no teaching point with worksheets; they join the gap report's reasons and Part 10): Kindergarten letter sounds as their own lesson; Grade 1 long vowels and silent e, blends, endings; Grade 2 contractions and possessive apostrophes, adverbs, collective nouns, reflexive pronouns, an informational text to read, opinion writing; Grade 3 suffixes, multiple-meaning words and homophones, literal and nonliteral meaning, dictionary use. Grade 3 literacy is one unit of four lessons.

**Printed worksheet wording that is British or not American** (Join the dots, grey, gap, naming word, Word Classes, Word Fields, Fact File, Soup Stall) is on the published pages, not in the notes; it is recorded for the dedicated wording session (memory `project_post_launch_content_fixes.md`).

## 6. Part 4.4: the hub, the year plans, the blocks on existing pages

- **Year plans** are data: `plans` in `defs/<loc>.json` (id, slug, titles, the unit ids in teaching order); `assemble.js` writes them into `units.<loc>.json` with each unit's weeks, lessons and the standards it teaches. A plan needs three units; its status is `live` only when every unit is. Page: `/<loc>/units/<plan-slug>` (the same route as a unit; a slug is unique across both lists). Gate P7 with eight poisons: a unit of another grade, two units, weeks that skip, a slug of a unit, a live plan over a pilot unit, a unit left out, a row that is not what its unit says, a title that claims the whole year.
- **A plan says how many weeks its lessons take and that they do not fill a school year, in the search result too.** To an American teacher "scope and sequence" and "pacing guide" mean the whole year, and the line on the page that says otherwise is not in a search result (the reviewer of §7). So the page title carries the weeks ("Kindergarten Math Scope and Sequence with Pacing Guide (7 Weeks)", "Grade 1 ELA Scope and Sequence: Reading and Language (5 Weeks)") and the description says "about 7 weeks in all (not a full year)". `{units}` and `{weeks}` in a plan's title and description are filled in by the assembler, so they always say what the plan holds; when a unit is added the number moves with it. The gate refuses a title that claims the year and lets a denial pass ("not a full year"); both directions are poisoned.
- **The printable plan** is a Teacher-only file (`scripts/units/build-year-plan.js` → `units/<plan id>/scope-and-sequence.pdf`): the same table with a column for the teacher's dates and a box to check. `--shot=<folder>` writes a picture of the sheet to read it.
- **The hub** `/<loc>/units`: every unit by grade and subject, in the plan's order, each with its lesson titles; a link to each plan. A language without units has no hub (404); a language whose units are all pilots has a noindex hub that lists them (how a new language is read before it is published).
- **Unit pages** gained the hub in the breadcrumb, "Unit n of N in the <plan>", and links to the unit before and after.
- **Sitemap shard 3** lists the hub, the live units and the live plans of a language, read from the same file the routes render (a pilot is never listed). hreflang as on the routes: only between live siblings.
- **"In a lesson plan" blocks**: on a worksheet landing (the static renderer `scripts/seo-landing/render-landing-html.js`; inline styles, so a landing in no live unit is byte-identical and every `<head>` is untouched: measured on one landing of each kind) and on an activity page. English: 197 landings and 102 activities link to their unit and lesson. Level Set hub pages and deck pages do not carry the block (a deck page would need a republish of every deck).
- **Decided here (standing delegation):** the 36 English units went live after both reviews were applied; the site navigation gets no "Lesson plans" entry yet (it is baked into 200,000 deck pages; the entry comes when sub packs and tests give that menu more than one item, Part 5 or 7); the Search Console read for units, plans and hub is due **2026-12-09** (four weeks), together with the pages that gained a block.

## 7. The review of the hub, the year plans and the new strings (rule #2)

One reviewer, an American K-3 teacher and US copy editor, over one text file (`scripts/units/dump-hub-for-review.js`: the 34 new strings as they render, the seven plans, the 36 units' titles and descriptions, the four notes rewritten after their review; 28 KB, read in full). About 70 findings, three of them "must". Applied: 12 strings, the seven plans' titles and descriptions, 18 unit descriptions, two unit titles, 15 lesson titles, the four notes (`scripts/units/notes/reviews/en-hub.review.json`), the order of the Kindergarten literacy plan.

- **A search result must not promise a year.** See §6: weeks in the plan's page title, "not a full year" in its description, "addresses" a standard, not "teaches" it.
- **Tier truth, said plainly.** "Every lesson plan is open to read" was not English and hid two facts. Now: anyone can read every lesson plan; without a paid plan the number of worksheets you can print is limited; the three files come with the paid Teacher plan.
- **One thing, one name.** "Practice on a screen", "the screen practice" and "practice on screen" became "on-screen practice"; "Literacy" in page titles became "Reading and Writing", the name the pages carry (the subject word is dropped where the title would pass 70 characters).
- **British and un-American words in lesson and unit titles:** mirror line (line of symmetry), number walls (addition pyramids, with the page's own name in parentheses because the worksheet prints "Number Walls"), joins (connections), capital and small letters (uppercase and lowercase), time to five minutes (to the nearest five minutes), in columns (vertically), time passed (elapsed time), "K to 3" (through).
- **Order:** the Kindergarten literacy plan put the unit that needs letter sounds two weeks before the unit that teaches letters. Letters and Handwriting is first now.
- **Content above the grade is labeled in the description** ("a first look at"): partners that make 20 and odd and even in Kindergarten, 24-hour time in Grade 3.
- **Checked against the page where the reviewer could not see it:** the cursive pages have children trace AND write (the objective keeps "write"); all eight lessons of the first Grade 1 unit have on-screen practice ("each" stays).
- **The downloaded file's name is read by the teacher too:** the printable plan is `scope-and-sequence.pdf`, not "year-plan".
- **Not taken:** "Introduction to Multiplication" for "Starting Multiplication" and "verb tenses" for "verb forms" (the lesson also covers has, does, goes, which is agreement, not tense).

## 8. German (Part 4.5): how a second language is made

- **The unit list is the English Grade 1–3 lessons, re-sequenced by the country's own curricula.** `scripts/units/lists/build-de-defs.js` wrote `defs/de.json` once (its header states the rule; the file is the source from then on). A lesson is kept when at least one of Bavaria, North Rhine-Westphalia and Saxony TEACHES its teaching point in primary school, and sits in the band where those states place it. Moved: three-digit numbers, adding and subtracting with blocks and in columns → Klasse 3; multiplication as equal groups, on the number line, the commutative law, the 2 and 5 tables, division as sharing and grouping → Klasse 2; prefixes → Klasse 2; pronouns → Klasse 3. Left out: fractions on a number line, comparing and equivalent fractions, the whole from a unit fraction (no state teaches them in primary school; three remaining fraction lessons are fewer than a unit), squares on a grid, sorting into three groups. The Kindergarten band is the year before school in Germany (all three registries say "prepares"): no unit in the first wave.
- **Almost every English lesson has German pages** (a dry run of the English list against the German catalogue failed only on US standard ids and on two titles with a placeholder), but the German pages of the reading and writing lessons ask other things than the English ones: Silbenteppich where English has word families, sch/ch/au where English has sh/ch/th, der/die/das where English has a/an, Personalformen where English has irregular past, doubled consonants, ck and ie where English has ck after a short vowel. The notes are therefore WRITTEN from the German pages (`scripts/units/author-sheet.js`: the German title and instruction of every page beside the reviewed English note as a record of the confirmed mistake), never translated.
- **What only a German note says:** "halb drei" is 2:30; "vierunddreißig" is spoken ones first and written 43; the 5-cent coin is bigger than the 10-cent coin; Malpunkt and the colon for division; Verteilen and Aufteilen; Kernaufgaben and Nachbaraufgaben; "14 : 4 = 3 Rest 2" is Klasse 3 content, not a first look; 24-hour time is everyday time; the Faltwinkel; nouns are capitalized, so "the word with the capital goes first" fails in a Schüttelsatz; the pronoun follows the article (der Tisch: er; das Mädchen: es); plural with Umlaut; "du läufst".
- **Register:** the German site says "du". The notes were drafted with "Sie" and turned by `scripts/units/notes/de-address.js` (268 texts by rule, outside quoted speech only; ten by hand); `--check` exits 1 when a formal address is left.
- **Names:** units are "Unterrichtseinheit Mathe Klasse 1: …"; the year plan is a "Stoffverteilungsplan", which by its name is the whole year, so its page title carries the units and weeks and its description says "kein ganzes Schuljahr" (gate word list `WHOLE_YEAR.de`).
- **A framework without codes** (the Bildungsstandards of the KMK) is shown by the heading its objective stands under; the guide's overview table does the same.
- Checks so far: gates pass for both languages (24 poisons), 2,683 addresses of the German units answer on the live site, the German hub, a plan and a unit pass the measured layout checks at 360, 768 and 1024.
