# Part 7 — Assessments: design record

Master plan: `PLAN.md` Part 7 and §11 ruling 1 (student pages are ordinary printables; key, scoring sheet, class grid and "what next" page are Teacher-only). What teachers type: `docs/SEO/daily-system-demand/FINDINGS.md` §3.

## 1. Part 7.1 (started 2026-11-12): the engine and the English K–1 mathematics unit checks

### What a unit check is

A short paper check that belongs to one unit: two forms (A before the unit, B after it) built from the same blueprint, so a teacher can see what moved. It is a classroom check of this unit's lessons. It is not a standardized test: no percentiles, no validity claims, no cut score presented as more than guidance, and the copy says so.

### How an item is made: cut from the worksheet the lesson hands out

Measured 2026-11-12 over the 62 lessons of the 12 English K–1 mathematics units: the first worksheet type of 38 lessons is built of self-contained cards (`.ws-card`, `templates/layouts/card-grid.js`) that carry their own answers in the markup (`data-lcs-answer`, `data-lcs-correct`); 9 more are cards without a machine-readable answer (colouring and drawing tasks); 15 are whole-page tasks (a scene, a chart, a tracing page).

So an item of a check is **a card of the lesson's own worksheet type**, built by the same generator at the same level (difficulty 2) with a seed of its own, at the size it has on its worksheet. Nothing about the item is new: the task, the picture rules and the answer are the ones that were gated and reviewed for the worksheet. The key is the same markup with the answers shown, so a key cannot disagree with its page.

- **Blueprint of a unit check:** for each lesson of the unit, in order, two cards of the lesson's first worksheet type that has answer-carrying cards. A lesson without such a type is not in the check, and the check's page says which lessons it covers.
- **A section** is the cards of one lesson under the worksheet's own instruction line, numbered through the check.
- **Forms A and B:** the same blueprint, two seeds. Gate: no card of A is a card of B (compared by what the card asks, not by its markup), and both forms have the same sections with the same number of cards.
- **Pages:** sections flow onto pages of the worksheet shell (Letter for en), a section never split.

### Outputs per check

| File | Who gets it |
|---|---|
| Form A and form B, student pages | everyone, as a printable (metered like every PDF) |
| Answer key A and B | Teacher plan |
| Scoring sheet per student (one line per section: points, and the lesson it belongs to) | Teacher plan |
| Class grid (students down, sections across) | Teacher plan |
| "What next" page: per section the lesson, its easier and harder worksheet, the practice on screen | Teacher plan |

"What next" is generated from the unit's own data (the lesson's worksheets at three levels, its screen practice, its tool); every link must exist in the language (gate).

### Where it is shown

On the unit's page, as its own section with a findable name ("Unit check: before and after"). Benchmarks (beginning, middle and end of the year) and the assessments hub come in 7.4; they will get pages of their own.

### Gates (to build with the engine)

T1 every card of a form carries an answer and the key shows exactly these answers · T2 forms A and B share no card and have the same blueprint · T3 a section's instruction names nothing that is not in the section (read by the reviewer: an instruction written for a whole page may point at something a cut card lacks) · T4 nothing on a page overflows, measured in the browser · T5 every "what next" link exists · T6 no file or page says standardized, percentile, diagnostic of a disorder, or free · T7 the rules that bind items stay measured: where the answer sits (in both directions, over both forms), counting never includes 0.

### Review (rule #2)

One reviewer as an American K–1 teacher over contact sheets of the forms (a word review cannot see a picture) with the keys beside them: one right answer per card, the instruction fits the cut cards, the section tests what the lesson taught, two cards are enough to tell, the wording of the teacher pages.
