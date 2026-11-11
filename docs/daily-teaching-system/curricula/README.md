# The national curriculum registry (Part 2)

What a teacher is told when a page says "this teaches …" must be true in HER curriculum. This registry holds, for
each country (and for the states that plan for themselves), the official objectives as the official document words
them, and a crosswalk from every teaching point of the content graph (Part 1) to those objectives.

Nothing in a registry is written from memory. Every node is read by a script from an official document that the
registry names (publisher, year, address, date read, checksum), and each builder has its own check that what it
read is what the document says.

## Where things are

| What | Where |
|---|---|
| a registry | `frontend/content/curricula/<reg>/` — `<reg>` is a language (`en`, `de` …) for the national framework, `<language>-<state>` (`en-tx`, `de-by`, `de-nw`, `de-sn`) for a state layer |
| its objectives | `framework.json` — GENERATED: `frameworks[]` (the documents) and `nodes[]` (`id`, `f` = the document, `kind`, `grade`, `parent`, `text`, sometimes `label` = the plan's own number) |
| its crosswalk | `crosswalk.json` — GENERATED: `points["<teaching point>"] = { rows: [{ id, rel, grade }], by }` or `{ none: "<why>", by }` |
| what reviewers wrote | `crosswalk-overrides.json` (corrections to a derived crosswalk: `en`) or `crosswalk-authored.json` (the whole crosswalk, point by point: every other registry); each entry keeps the reviewer's `why` |
| the reviewers' notes | `docs/daily-teaching-system/curricula/REVIEW-NOTES.<reg>.md` |
| builders | `scripts/curricula/build-<reg>.js` (`--check` proves the committed files are what the builder produces; `--list` prints the nodes) |
| shared tools | `scripts/curricula/lib.js`, `gates.js`, `dump-for-author.js`, `apply-review.js`, `sample.js`, `pdf-words.py` |
| raw documents | `out/curricula/<reg>/` (not committed; a builder fetches what is missing) |

## The three relations

A crosswalk row says how a teaching point stands to an objective:

- **teaches** — a child who does these worksheets does what the objective asks, or a clearly stated part of it;
- **prepares** — the worksheets are a step before it (readiness, a smaller number range, the idea before its formal form);
- **extends** — the worksheets go beyond it on the same line of learning.

The row carries the grade (or band) where THAT curriculum places the objective, which is often not the grade the
worksheets sit in. A point with no counterpart says why (`none`). A page may say "teaches" only for a `teaches` row.

What a visitor is shown: the framework's name and the objective's code or the title of its area — never the wording
as a quotation, and never an id this registry had to invent (`ids` in each framework says which numbers are the
document's own).

## The registries

| Registry | Documents | Nodes | How the wording is checked | Crosswalk |
|---|---|---|---|---|
| `en` United States | Common Core State Standards, Mathematics and ELA (2010); Next Generation Science Standards (2013) | 884 | read from the machine-readable copies (Achievement Standards Network); every CCSS statement found in the publisher's PDF (math 191/191, ELA 486/486, 10 wordings corrected from the PDF). The NGSS publisher's server gave no answer when the PDF was asked for: its wording is the copy's, and the registry says so | derived from the codes the points carry, then audited by two reviewers (math; ELA and science): 96 points corrected; 43 have no counterpart |
| `en-tx` Texas | TEKS Mathematics (adopted 2012), English Language Arts and Reading (2017), Science (2021): 19 TAC Chapters 111, 110, 112, Subchapter A | 1,301 | read from the machine-readable copies; EVERY statement found in the Texas Education Agency's own PDF in the section of its own grade; five wordings the State Board changed and two statements the copy had lost are taken from the PDF (`scripts/curricula/en-tx-pdf-wording.json`); the lettered and numbered lists of every grade are counted against the PDF | authored by two reviewers (math; ELAR and science): 260 points mapped, 46 with no counterpart |
| `de` Germany | KMK Bildungsstandards Primarbereich, Deutsch and Mathematik (version of 23.06.2022) | 235 | parsed from the KMK's PDFs; every standard found in a second, independent reading of the same PDF; the bullets of the standards chapters counted | authored (see below) |
| `de-by` Bavaria | LehrplanPLUS Grundschule: Deutsch, Mathematik, Heimat- und Sachunterricht, Jahrgangsstufen 1/2 and 3/4 | 687 | read from the official pages of lehrplanplus.bayern.de; every list item of each page is a node (counted) | authored |
| `de-nw` North Rhine-Westphalia | Lehrpläne für die Primarstufe (2021): Deutsch, Mathematik, Sachunterricht | 367 | read from the official PDFs by the place of each word on the page (two-column tables); bullets counted; every expectation begins as a line of a second reading | authored |
| `de-sn` Saxony | Lehrpläne Grundschule: Deutsch and Mathematik (2025/2026), Sachunterricht (2019) | 862 | read from the official PDFs by the place of each word (the binding left column only; the remarks are not read); every goal opens with one of the plan's levels of demand; Lernbereiche numbered without a gap | authored |

Germany needs the state layers because the national standards say what a child can do **at the end of class 4** and
place nothing in a year: only a Land's plan tells a teacher of class 2 what is hers. The KMK has no standards for
Sachunterricht; science, social and health points get their German rows from the state plans.

## How a registry is made

1. **Find the official document** and a way to read it that a script can repeat. In order of preference: a
   machine-readable copy checked against the official PDF (`en`, `en-tx`); the official web page when the plan is
   published as structured pages (`de-by`); the official PDF's text (`de`); the official PDF's words with their
   places, for plans printed as tables (`de-nw`, `de-sn`: `python scripts/curricula/pdf-words.py`).
2. **Write `build-<reg>.js`**: it fetches the document into `out/curricula/<reg>/`, reads the nodes, and FAILS unless
   its own checks hold (a count against the document, a second reading, lists without gaps). A wording the script
   cannot read as printed (stacked fractions, a statement the copy lost) is repaired only where the document itself
   shows the repair, and the node says so (`wordingFrom`).
3. **Read the list** (`--list`): the builder's author reads the whole outline and a sample of the wording.
4. **Author the crosswalk**: `node scripts/curricula/dump-for-author.js <reg> <name> --subjects=… --frameworks=…`
   writes the brief (the teaching points, then every objective with its wording); a reviewer who teaches to that
   curriculum writes `{ points: { id: { rows, none?, why } }, notes }`; `node scripts/curricula/apply-review.js <reg>
   --authored <files>` checks it (every point, only real nodes, a reason each) and writes `crosswalk-authored.json`
   and the notes; the builder then writes `crosswalk.json`.
5. **Read a sample yourself**: `node scripts/curricula/sample.js <reg> --every=11`, `--gaps` (every `teaches` row
   two or more years from its point), `--none`.
6. **Gates**: `node scripts/curricula/gates.js` (C1 sources, C2 nodes, C3 every point crossed, C4 rows true to their
   nodes, C5 where a row comes from), `--poison` plants eleven faults that must all be caught.

## What the registries already say about the catalogue

The reviewers' notes are in `REVIEW-NOTES.<reg>.md`. Read them before Part 3 chooses its pilot units: they name the
skills a curriculum places in another grade than our worksheets, the content teachers will look for that no teaching
point covers, and the points whose skill line was too vague to place.
