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

Fifteen registries: eleven national ones and four state layers. The numbers (nodes, how many teaching points are
taught, near or without a counterpart, by subject) are in the generated `STATUS.md` beside this file
(`node scripts/curricula/report.js`).

| Registry | Documents read | Read from | The builder's own check |
|---|---|---|---|
| `en` United States | Common Core State Standards, Mathematics and ELA (2010); Next Generation Science Standards (2013) | the machine-readable copies of the Achievement Standards Network | every CCSS statement found in the publisher's PDF (10 wordings corrected from it); the NGSS publisher's server gave no answer for the PDF, so that wording is the copy's and the registry says so |
| `en-tx` Texas | TEKS Mathematics (2012), English Language Arts and Reading (2017), Science (2021), K to 5 | the same network's copies | EVERY statement found in the Texas Education Agency's own PDF in the section of its own grade; five changed wordings and two lost statements taken from the PDF (`scripts/curricula/en-tx-pdf-wording.json`); the lettered and numbered lists of every grade counted against the PDF |
| `de` Germany | KMK Bildungsstandards Primarbereich, Deutsch and Mathematik (23.06.2022) | the KMK's PDFs | every standard found in a second reading of the PDF; the bullets counted; stacked fractions put back only where the PDF shows them |
| `de-by` Bavaria | LehrplanPLUS Grundschule: Deutsch, Mathematik, Heimat- und Sachunterricht (1/2, 3/4) | the pages of lehrplanplus.bayern.de | every list item of each page is a node (counted); fractions printed as pictures written out from the picture's file name |
| `de-nw` North Rhine-Westphalia | Lehrpläne für die Primarstufe 2021: Deutsch, Mathematik, Sachunterricht | the official PDFs, by the place of each word (two-column tables) | bullets counted; every expectation begins as a printed line of a second reading |
| `de-sn` Saxony | Lehrpläne Grundschule: Deutsch and Mathematik (2025/2026), Sachunterricht (2019) | the official PDFs, by the place of each word (the binding left column only) | every goal opens with one of the plan's levels of demand; the Lernbereiche numbered without a gap; each line begins as a printed line of a second reading |
| `sv` Sweden | Lgr22: förskoleklass, matematik, svenska, NO, SO, teknik, idrott och hälsa, bild | Skolverket's Syllabus API | the list items of each text counted; the sister subjects print the same list for årskurs 1–3 |
| `es` Mexico | Plan de Estudio 2022: Programas Sintéticos of Fase 2 (preescolar), 3 and 4 (1° to 4° de primaria), four Campos formativos | the SEP's PDFs, by the place of each word (a column per grade) | every contenido holds a process; every process opens with a capital and ends as a sentence |
| `pt` Brazil | BNCC: Educação Infantil (crianças pequenas) and Ensino Fundamental anos iniciais: Língua Portuguesa, Matemática, Ciências, Geografia, História, Arte | the Ministry's PDF, by the place of each word | within each group the official codes run 01, 02, 03 … without a gap; every wording ends as a sentence; a code printed twice has one wording |
| `fr` France | Programmes 2024 of the école maternelle (from 4) and of the cycle 2, français and mathématiques; Questionner le monde (2020); the themes of histoire-géographie (2026) | the annexes of the Bulletin officiel (PDF), by the place of each word (the left column "Objectifs d'apprentissage") | every year of every document holds objectives; each begins as a printed line of a second reading |
| `nl` Netherlands | Besluit kerndoelen primair en speciaal onderwijs 2026 (the NEW kerndoelen Nederlands and Rekenen en wiskunde, in force 1 August 2026); Besluit vernieuwde kerndoelen WPO (the other learning areas) | Staatsblad 2026, 198 and wetten.overheid.nl | the new kerndoelen run 1 to 18, the older ones 34 to 56, without a gap; the consolidated text says from when it is valid |
| `fi` Finland | Perusopetuksen opetussuunnitelman perusteet 2014: matematiikka, suomen kieli ja kirjallisuus, ympäristöoppi, kuvataide (1–2, 3–6) | the National Agency's ePerusteet service | the objectives T and the content areas S numbered without a gap; every objective names content areas of its own unit; the document has no end date |
| `no` Norway | LK20: matematikk, norsk, naturfag, samfunnsfag, mat og helse, kunst og håndverk (aims after years 2, 3, 4) | Utdanningsdirektoratet's Grep service | every plan is the one in force (a replaced plan is followed to its successor) and so is every aim; every aim has a bokmål wording and names its set |
| `da` Denmark | Fælles Mål: BEK nr 1715 and 1716 of 30/12/2024 (børnehaveklassen; dansk, matematik, natur/teknologi, historie, billedkunst, færdselslære, sundheds- og seksualundervisning og familiekundskab) | Retsinformation (XML) | both orders marked valid; each competence area of each klassetrin holds exactly one goal |
| `it` Italy | Indicazioni nazionali per il curricolo 2012: italiano, matematica, scienze, storia, geografia, arte e immagine, tecnologia | the Ministry's PDF, by the place of each word | every objective opens with a capital and ends as a sentence; each begins as a printed line of a second reading |

### What the registries do NOT hold, and why

- **Germany, national:** the KMK has no Bildungsstandards for Sachunterricht. Science, social and health points get their German rows from the three state plans only. The standards describe the end of class 4; only a Land's plan places a skill in a year.
- **Denmark:** since 1 January 2025 only the competence goals and points of attention are binding. The detailed færdigheds- og vidensmål that teachers know from the faghæfter are advisory and are not in the law; the ministry's files of the faghæfter answered with a page instead of the file when a script asked. The Danish registry is therefore small (56 nodes) and broad.
- **Netherlands:** kerndoelen describe the end of primary school and place nothing in a group. SLO's learning lines for the groups (guidance, not law) are not read; SLO's data service answers "not authorised".
- **Sweden, Finland:** the curriculum states content for a band of years (1–3; 1–2 and 3–6), never for one year.
- **France:** the cycle 2 programme "Sciences et technologie" of 2026 is published as a scan (no text). Science rows use the part "Questionner le monde du vivant, de la matière et des objets" of the 2020 programme, which the Ministry still lists for the rentrée 2026. Of histoire-géographie only the themes' titles are read (the programme is prose). Arts and EMC are not read.
- **Italy:** the 2012 text is read. A new text (D.M. 221 of 9 December 2025) replaces it class by class from 2026/27, beginning with the scuola dell'infanzia and the first class; the registry is to be rebuilt on it as it reaches classes 2 and 3. The scuola dell'infanzia is not read.
- **Mexico:** in a few cells a process holds a list of its own; where the list's second heading ("Como audiencia") follows a full stop, it is read as a process of its own.
- **United States:** social studies, health and the arts have no national document here; Texas's social studies TEKS are not read.
- **Finland, Norway, Italy:** the pre-primary year (esiopetus, barnehage, scuola dell'infanzia) is not read; a year-K point can only prepare a first-year objective there.

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
