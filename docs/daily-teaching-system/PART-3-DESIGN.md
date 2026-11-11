# Part 3 — shared delivery and the format pilots

Master plan: `PLAN.md` (Part 3). This file is the record of what was built, why, and how to work with it.

## 1. What exists

| Piece | Where | What it does |
|---|---|---|
| Unit assembler | `scripts/units/assemble.js` | A unit = lessons; a lesson = ONE teaching point. Every slot is filled from a registry: the worksheets at three levels (the published catalogue), the tool, the activity or the page with a Check button, the exit ticket (one more core page), the maker, the national objective (the curriculum registry, shown by `scripts/curricula/show.js`). Fails on a lesson with fewer than two real assets and on a unit with fewer than four lessons. |
| Unit texts | `frontend/content/units/defs/<loc>.json` (which points, which worksheet types), `points/<loc>.json` (per TEACHING POINT: title, objective, teacher note) | The teacher note is the only prose. It belongs to the teaching point, not to the unit: every unit that teaches the point shows the same note. |
| Sub pack assembler | `scripts/sub-plans/assemble.js`, `frontend/content/sub-plans/defs/`, `scripts/` (per teaching point: say, first, stuck) | One school day of review: a worksheet per block, an easier page and a page for early finishers where the type has them. |
| Generated data | `frontend/content/units/units.<loc>.json`, `frontend/content/sub-plans/packs.<loc>.json` | The pages render these files and nothing else. `--check` proves a committed file is the build of its inputs (PC: needs `out/teaching-graph/decks.tsv`). |
| Pages | `/[locale]/units/[slug]`, `/[locale]/sub-plans/[slug]` (`components/units/`, `components/sub-plans/`) | `force-dynamic`; the same page for everyone; `status: pilot` → `noindex, follow`, no sitemap, linked from nowhere; hreflang only between live siblings. |
| Teacher-only gate | `GET /api/quota/dl?kind=teacher&loc=<loc>&file=<kind>/<id>/<name>` (`lib/teacher-files.ts`) | Files live in `/var/www/lcs-media/teacher-files/`, outside everything nginx serves. A subscriber gets the PDF; everybody else, crawlers included, the redirect (not signed in → sign-up; no plan → pricing). It never touches the monthly counters and does not read `METERING_ENABLED`. `probe=1` answers `{ ok, to }`. `lib/quota.ts` is unchanged. |
| The whole unit in one file | `components/units/UnitBundleButton.tsx` | Built in the teacher's browser: the guide through the gate, then every worksheet's own PDF, joined with the makers' pdf-lib build (`/makers/app/vendor/pdf-lib.js`). No new dependency; no merged copy on the server. |
| Teacher guide, guest teacher pages | `scripts/units/build-guide.js`, `scripts/sub-plans/build-pack.js` → `out/teacher-files/<loc>/…` | Generated from the same data as the page. Letter for en and es, A4 elsewhere. Uploaded with `scripts/units/upload-teacher-files.sh <loc>`. |
| Save to my collections | `POST /api/collections/from-pack`, `SaveToCollectionsButton` | The pages of a unit or pack become one collection in lesson order. The existing collections model, no new table. |
| Gates | `scripts/units/gates.js` (+ `--poison`), `check-live.js`, `shots.js`, `dump-for-review.js` | See §3. |

## 2. Decisions

1. **The teacher notes are on the page, for everyone.** They are what makes a unit page worth reading (and not thin). Teacher-only is what saves time: the whole unit as one file, the teacher guide to print, the pages as a collection.
2. **Teacher-only files are read from disk by the gate, not handed to nginx.** They are small and rarely fetched; a file outside every served folder cannot leak through a forgotten location block, and no nginx change is needed.
3. **The bundle is built in the browser** (plan, Part 3 item 2). The makers already ship pdf-lib; the bundle imports that build at run time.
4. **A lesson is one teaching point.** A unit never has prose of its own: its page is its lessons. That is the filler gate of the plan made structural.
5. **Scripts and notes attach to teaching points**, so that 306 notes and 306 scripts per language cover every unit and every pack that will ever be assembled.
6. **A screen slot is filled by a live activity of the point, else by a page of the lesson with a Check button.** A planned activity never shows; when it ships, re-running the assembler fills the slot.
7. **Strand names**: the registries proved eight names wrong (es, fr, nl, da, it). They are corrected on everything a visitor sees and in JSON-LD (`strandLabel`), while the meta descriptions of indexed `/standards` pages keep the old wording (`localizeStrand`): no title or description of an existing page changes.

## 3. Gates

| Gate | Runs | What it proves |
|---|---|---|
| `scripts/units/gates.js` | deploy.sh, HARD | P1 shape; P2 teaching points exist; P3 no filler (≥ 4 lessons, ≥ 2 real assets, a note names a mistake, gives words in quotation marks and what to watch for, no two points share a note); P4 a pack has reading, writing and math and a full script per block; P5 no string says free; P6 the pages' strings are complete. 14 poisons. |
| `assemble.js --check` (units, sub-plans) | PC, before commit | the committed generated file is the build of its inputs |
| `scripts/units/check-live.js --loc=<loc>` | PC, before and after a deploy | every page, thumbnail, PDF, tool, activity and maker a unit or pack names answers 200 on the live site |
| `scripts/units/shots.js <url>` | PC | 360, 768, 1024: no overflow, no text under 14 px, tap targets ≥ 44 px, no script error; screenshots to read |
| `scripts/units/dump-for-review.js --loc=<loc>` | PC | the one text file for the one reviewer (rule #2) |
| `scripts/seo/identity-snapshot.js --compare` | deploy.sh, after the flip | no existing indexed page changed its title, description, canonical, robots, h1 or hreflang; no sitemap shard lost a URL |
| `scripts/preflight-indexable-routes.js` | deploy.sh, HARD | the new routes declare robots and canonical |

## 4. The pilots (English, noindex)

- `/en/units/addition-and-subtraction-within-10-grade-1-unit` (8 lessons)
- `/en/units/hearing-sounds-in-words-kindergarten-unit` (6 lessons)
- `/en/sub-plans/first-grade-sub-plans-day-of-review` (8 review blocks, about 145 minutes of seat work)

What the operator rules on (PLAN.md "Done when"): the unit format and the sub pack format. Parts 4 and 5 fan the formats out; a change of format after that costs every unit.

## 5. Working with it

```
# a new unit: add it to defs/<loc>.json, write the missing points in points/<loc>.json, then
node scripts/units/assemble.js --loc=en
node scripts/units/gates.js && node scripts/units/gates.js --poison
node scripts/units/dump-for-review.js --loc=en        # → the reviewer
node scripts/units/build-guide.js --loc=en
node scripts/units/check-live.js --loc=en
bash scripts/units/upload-teacher-files.sh en          # before the deploy that carries the unit
# local preview: next dev (set TEACHER_FILES_DIR=<repo>/out/teacher-files), then
node scripts/units/shots.js http://localhost:3000/en/units/<slug> --name=<stem>
```

After decks are published or republished the catalogue table must be pulled again (`bash scripts/teaching-graph/pull-decks.sh`) before `assemble.js`: a unit names concrete pages.

## 6. Known limits

- **No answer keys in a bundle.** Printable-only pages ship without an answer key; the teacher guide does not print answers. Part 7 (assessments) generates items with their answers and can add a key to the guide.
- **The check-up page of a lesson is one more core page** until Part 7's item engine exists (an American teacher's "exit ticket" is two or three questions at the door, so the page does not use that name).
- **A sub pack has no answer key**; its note tells the guest teacher to do the first item of each page beforehand. Same remedy as above.
- **Printed pages still carry a few British forms** ("tick a box", "Work out the missing number"): they belong to the worksheets, not to this part, and are on the list of post-launch content fixes.
- **The "easier" and "harder" page of a block may show another picture theme** than the core page (they are the next free pages of the type).
- **The hub-cache nginx block** covers the two new prefixes only after `python3 scripts/publish-cli/patch-nginx-hub-cache.py` is run on the server (it reinstalls its block).

## 7. The review of the pilot texts (rule #2), 2026-11-11

One reviewer (an American K-1 teacher and editor of teacher materials) read everything a teacher reads in the three pilots beside the printed instruction of every worksheet (`node scripts/units/dump-for-review.js --loc=en` → `out/units/review-en.md`) and returned 54 findings; all are applied at the source.

What the findings changed in the SYSTEM, not only in the texts:

1. **A note or script must be written from the page's printed instruction.** The first lesson 2 told the teacher that children cross pictures out; the page prints them already crossed out. The review dump now prints every worksheet's instruction beside its note, and both text files say so in their header.
2. **A standard of another grade is labelled for what it is in the unit.** A Kindergarten code in a Grade 1 unit reads "Reviews", a Grade 2 code "Later grade" (`assemble.js`, `relIn`); the unit's own standards come first; three at most.
3. **Three rows of the US crosswalk were wrong and are corrected in the registry** (`out/curricula/en/own-audit-units.out.json`): a group heading shown as a standard (RF.K.3), the commutative property missing from fact families, the letter standards missing where the pages ask for a written letter.
4. **A script has two layers**: what holds for the teaching point, and under `byType` what holds for one worksheet type only (how many items, how the page is laid out). What belongs to a time of day (the morning greeting, attendance, "before the bell") is in the pack's own strings, not in a point's script.
5. **A "reading" block needs a page with text to read.** The first pack used a picture-sequencing page under that name; it now uses "Read and Color: Four Sentences".
6. **A day of seat work for first graders is about 145 minutes in blocks of 10 to 25**, with the note telling the guest teacher to let the class move after every block and where the read-aloud and the extra-time list are. The first pack claimed "a full day" of 190 minutes.
7. **What a guest teacher needs and the first forms did not ask for**: a class list and seating chart, attendance and lunch count, the behavior plan, who gets the easier page, who leaves the room and when, how each child goes home by name, and who makes the copies (the teacher, ahead of time, for the sub binder).
8. **American English is a review item of its own**: "figure out" (not "work out"), "check off" (not "tick"), "directions", "classroom teacher", "stacks", periods and commas inside closing quotation marks, the serial comma (adopted for all en texts of this programme).
