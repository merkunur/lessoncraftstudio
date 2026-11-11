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

### Which pages exist (measured 2026-11-11, `cov.js` in the session scratchpad: leaf objectives a `teaches` row covers)

| Framework | K | Grade 1 | Grade 2 | Grade 3 |
|---|---|---|---|---|
| Common Core Math | 21 of 24 | 21 of 23 | 22 of 27 | 25 of 33 |
| Common Core ELA | 20 of 64 | 25 of 72 | 21 of 63 | 5 of 79 (no page) |
| TEKS Math | 18 of 36 | 27 of 50 | 25 of 50 | 33 of 53 |
| TEKS ELAR | 19 of 84 | 24 of 86 | 25 of 90 | 5 of 92 (no page) |
| NGSS, TEKS Science | 2 to 9 per grade, no lesson (no page) | | | |

**Rule (PLAN §5 rule 4, "no page ships thin"):** a grade and subject gets a page only when at least 15 of its objectives are taught by content of the language. 14 pages for English: Common Core Math K–3, Common Core ELA K–2, TEKS Math K–3, TEKS ELAR K–2. Grades 4 and 5 are outside the site.

### Routes

- `/<locale>/curriculum` — the hub: the frameworks of the country, each grade and subject page, and what has no page yet and why.
- `/<locale>/curriculum/<slug>` — one framework, one grade, one subject. English slugs: `common-core-kindergarten-math-standards`, `common-core-first-grade-ela-standards`, `teks-kindergarten-math`, `teks-first-grade-elar` (the words of the harvest heads).
- Generated content: `frontend/content/curriculum-pages/pages.<loc>.json` by `scripts/curriculum-pages/assemble.js` from the registry (`framework.json`, `crosswalk.json`, `display.json`), the units of the language and the content graph. Nothing on a page is typed by hand except the page strings (`ui.<loc>.json`).
- Pilot first (`noindex`, in no sitemap), then one reviewer reads the visible text, then live.

### Still to build in Part 6

The label on unit pages that links an objective to its curriculum page (no crawlable filter parameter); JSON-LD on the curriculum pages; the printable coverage document per grade (open to everyone: its job is to get a budget approved); the "For schools" page with the quote request that reaches the operator by email (ruling 6); the cannibalization gate against `/standards/` and the topic pages; then one locale each in Part 2 order.
