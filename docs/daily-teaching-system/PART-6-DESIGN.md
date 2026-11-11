# Part 6 — Curriculum pages: design record

Master plan: `PLAN.md` Part 6 and §11 (rulings 2 and 6). The registry the pages read is Part 2 (`curricula/README.md`).

## 1. Part 6.1 (started 2026-11-11): English (US)

### What a curriculum page is

A per-grade list of one framework's objectives for one subject, with what the site has for each line: the lessons of the units that teach it, their worksheets, the activity. The demand harvest (FINDINGS §2) found one page type with a job: "kindergarten standards checklist", "common core 2nd grade math", "teks kindergarten". People who want the official text go to the publisher; these pages do not try to be that.

### What a line shows

- the objective's own official **code** (`display.json`: `show = code` for Common Core and TEKS) under the title of its area (the domain or strand name);
- **our own description** of what the children do, taken from the lessons that teach it (the lesson's objective), never the official wording as a quotation (Part 2 rule);
- the lessons (unit and lesson number), a worksheet count, the activity where there is one, and for Common Core the existing `/en/standards/<code>` hub where one exists (those hubs keep their URLs and content);
- an objective the site has nothing for is listed by its code and marked as not covered: the page is a checklist, and a principal reads the gaps too.
- one link per page to the publisher's official document for the wording.

### Which pages exist (as published 2026-11-11: objectives with a lesson or a worksheet, of the objectives of the grade)

| Framework | K | Grade 1 | Grade 2 | Grade 3 |
|---|---|---|---|---|
| Common Core Math | 20 of 24 | 17 of 24 | 17 of 28 | 23 of 34 |
| Common Core ELA | 17 of 65 | 22 of 73 | no page | no page |
| TEKS Math | 18 of 34 | 25 of 50 | 20 of 50 | 29 of 53 |
| TEKS ELAR | no page | 18 of 84 | 21 of 88 | no page |
| NGSS, TEKS Science | no page (2 to 9 objectives per grade, no lesson) | | | |

**Rule (PLAN §5 rule 4, "no page ships thin"):** a grade and subject gets a page only when at least 15 of its objectives are taught by content of the language (`MIN_TAUGHT` in `gates.js`, gate Q4). **12 pages for English.** The first count gave 14; after the review two (Common Core ELA Grade 2, TEKS ELAR Kindergarten) fell below 15 and were taken out. The threshold was not moved. The hub names every set that has no checklist and says why. Grades 4 and 5 are outside the site.

### Routes and files

- `/<locale>/curriculum` — the hub: the frameworks of the country, each grade and subject page, and what has no page and why.
- `/<locale>/curriculum/<slug>` — one framework, one grade, one subject. English slugs follow the harvest heads: `common-core-kindergarten-math-standards`, `common-core-1st-grade-ela-standards`, `teks-kindergarten-math`, `teks-1st-grade-elar`.
- Generated: `frontend/content/curriculum-pages/pages.<loc>.json` by `scripts/curriculum-pages/assemble.js` from the registry (`framework.json`, `crosswalk.json`, `display.json`), the live units of the language and the content graph. Typed by hand: the page strings (`ui.<loc>.json`), the page names (`lists/build-<loc>-defs.js`) and the reviewer's sentences (`lines/<loc>.json`).
- Both routes are `dynamic = 'force-dynamic'` (CLAUDE.md §32 trap 1); nginx gives them the 300 s public cache (`scripts/publish-cli/patch-nginx-hub-cache.py`, prefix `curriculum`; **run it again on the server after any nginx rebuild**). Live pages are in sitemap shard 3; a pilot page is `noindex` and in no sitemap.

### How a page is put together (rules the generator holds)

- **The document's own order.** Common Core Math domains CC, OA, NBT, NF, MD, G; Common Core ELA strands RL, RI, RF, W, SL, L; TEKS by statement number; codes in natural order (K.CC.A.2 before K.CC.A.10).
- **A heading is never a line.** Domains, clusters, strands and topics give the group titles. TEKS ELAR groups are headed "Knowledge and skills (N)": the registry holds no short title for them and none is invented.
- **A part without rows of its own is listed as not covered,** even when its parent has rows: the page never claims a part through its parent.
- **Three states of a line:** taught (a `teaches` row), near ("Our lessons lead up to this standard" / "go beyond this standard": `prepares` or `extends` rows only), open (listed by code under "Not covered yet").
- **The sentence of a line** is the reviewer's where there is one, else a lesson objective the page has used least, else the skill text of the teaching point. Gate Q3 refuses a sentence that is the wording of an objective.
- **A framework family may word a string its own way** (`ui[key_<family>]`): the Texas pages speak of "student expectations" and of "English Language Arts and Reading".
- **Unit pages link back:** a standard chip on a unit page links to the line of its code (`#code-…`) on the live checklist of the language; the units hub links to the checklist hub once pages are live.

### Gates (`scripts/curriculum-pages/gates.js`, in `deploy.sh`; 10 poisons, each caught)

Q1 the pages file is the build of its sources · Q2 every lesson is a lesson of a live unit and every worksheet is published · Q3 no description is the official wording · Q4 no thin page, no line with nothing behind it · Q5 no visible string says free · Q6 no string claims an approval, and the hub says the checklists were NOT written or approved by the publishers · Q7 no checklist is titled with one code (the per-code pages `/standards/<code>` own that search) and no two checklists share a title.

### The review (rule #2), one reviewer as an American K–3 teacher

Read: every line of the 14 first pages (338 lines) and every page string, from `dump-for-review.js`. Ruled on 84 lines: **11 drop** (the lessons do not teach the objective), **16 prepares**, **6 extends**, **51 describe** (the claim holds, the sentence did not say what the children do). 8 page strings and the 14 meta descriptions rewritten.

Where each ruling went (`apply-review.js`):

- a sentence → `lines/en.json`;
- a ruling on a claim → **the curriculum registry**, because the same claim stands on the unit pages: 51 point rows changed in `curricula/en/crosswalk-overrides.json` and `curricula/en-tx/crosswalk-authored.json`, each with the reviewer's reason and the rows as they were. Then the registries, the units file, the class-results skill index and the teacher guide PDFs were rebuilt, so the unit pages, the "by curriculum" tab and the PDFs say the same as the checklists.

### Known limits

- English only; the other languages follow one at a time in Part 2 order.
- A line whose lessons cover part of an objective says which part in its sentence; there is no separate "partly" state.
- K.OA.A.5: the number range of the fluency worksheets is not clear from the lesson texts; the line describes what the lessons do.
- The worksheet "Sort by Food Group" names four groups and US teaching names five; recorded for the content-fix session.
- Two lines of a page may carry the same sentence when one lesson teaches two parts of an objective (TEKS 1.2.A.v and 1.2.A.vii).

### Still to build in Part 6

The printable coverage document per grade (open to everyone: its job is to get a budget approved); the "For schools" page with the quote request that reaches the operator by email (ruling 6); then one locale each in Part 2 order (de first: KMK, then the Bavaria, North Rhine-Westphalia and Saxony layers, whose display rule is `label` or `area`, not `code`).
