# The 10 toughest maker tasks — handed to Fable 5.1, one agent at a time

Operator, 2026-11-01: *"Analyze thoroughly and find out the 10 toughest tasks waiting for you in building the new
worksheet makers. Launch Fable 5.1 agents to get those 10 tasks done. Launch one agent at a time."*

The main session keeps building the B1 makers (place-value, fractions, multiplication-division) while each agent runs.
Every agent reads this file first. Its brief names its task number.

## The tasks (in launch order)

| # | task | design source |
|---|---|---|
| 1 | **Screen from the answer marks** — the generic screen engine, the two new kinds (`tap-pair`, `tap-place`), the 5 generic screen instructions ×11, the `screen-from-marks` gate (poisoned both ways), the S* marking edits, wired into the maker so a template's screen version is built in the browser | `docs/makers/INTERACTIVE-AND-SHARING.md` §A, §B, §F |
| 2 | **Student play page + sharing** — `/s/<id>` (SSR head with per-link OG/Twitter card, noindex), the play shell from a recipe, the embed snippet with two backlinks outside the iframe, the subscriber play-meter bypass, the middleware carve-out, deck → maker presets | INTERACTIVE-AND-SHARING §C, §F; ARCHITECTURE §8, §9 |
| 3 | **Release wiring (P5), prepared and tested locally, never run on the server** — Prisma models + migration file for recipes / links, the recipe and link APIs, the old-landing smart links, the nginx patch script, the `deploy.sh` build step, the `registration` gate | ARCHITECTURE §5, §8, §13, §15 (gate 13), BUILD-LOG "NEXT" |
| 4 | **The missing gates of the suite** — `settings-space` (guessability + answer position over every exposed control value), `collision`, `own-input`, `screen-geometry`, `pdf-parity`; each poisoned both ways and run over the built makers | ARCHITECTURE §15 |
| 5 | **Picture engines in the browser (spike S6)** — the `sharp`-dependent engines (`lib/cbn-lineart`, `fd-scene`, `hm-verify`, `htd-vector`, `pt-trace`, `pt-verify`, `image-cache/silhouette`/`derive`) given a browser path with identical output, measured | ARCHITECTURE §2, §17.4; ENGINES-ART |
| 6 | **Logic puzzles with one proven solution, fast in the browser** | ENGINES [logic-puzzles-Q1], Part 2 B3 |
| 7 | **Word search + crossword engines** (layout < 1 s, fillers, rude-word blocklists ×11, no duplicate word) | ENGINES [word-search-Q1], [crossword-Q1], Part 3 A, B |
| 8 | **Secret code + bingo + colouring-page composer** | ENGINES Part 3 C, D, E |
| 9 | **National written column methods ×11** (carry / borrow position and notation, written multiplication, long division) | ENGINES [addition-subtraction-Q1], OPEN-DECISIONS #11, #27 |
| 10 | **Letter models per locale + cursive guides aligned on every OS** | ENGINES [letter-tracing-Q1], [cursive-Q1], OPEN-DECISIONS #16, #26 |

## Rules for every agent (binding)

1. Read `CLAUDE.md` (the #1 and #2 rules, §A.14.12, the pedagogical-mistakes amendment), `docs/makers/ARCHITECTURE.md`,
   `docs/makers/BUILD-LOG.md` (what is built and the traps paid for), and your design source. **Verify every claim against
   the code; a doc is not a fact.**
2. **Do not launch sub-agents.** One agent at a time is the operator's rule.
3. **Local only.** No `deploy.sh`, no ssh, no live server, no production database, no `prisma migrate deploy`. A migration
   is a file, applied to nothing.
4. **Do not edit these files — the main session edits them concurrently:** `scripts/worksheet-gen/i18n/strings.*.json`,
   `scripts/worksheet-gen/i18n/level-instructions.json`, `frontend/messages/makers/*.json`, `docs/makers/BUILD-LOG.md`,
   `scripts/makers/topic-map.js`, `docs/activities-rebuild/coverage/coverage-map.json`, `docs/makers/inventory/types.json`,
   and any type of the `place-value`, `fractions`, `multiplication-division` (`arrays-multiplication`,
   `multiplication-tables`, `division-with-remainder`) families. New strings go in NEW files you own (e.g.
   `scripts/worksheet-gen/i18n/<your-area>.json`), in all 11 languages (en = American English, es = Mexican Spanish,
   pt = Brazilian Portuguese), and are listed in your handoff note for the native review.
5. **The catalogue never changes.** Every published page builds byte-identical (the slots / parity gates are the proof).
   A change to a shared module is additive or proven identical.
6. **Every gate you write is poisoned in both directions** (it fails a broken page, passes a correct one). Never move a
   threshold to pass; fix what is measured.
7. **Git:** commit only your own work, with explicit paths (`git add <paths>`, never `git add .`), message
   `[FEATURE|CHORE][MAKERS] …` ending with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Never commit renders,
   screenshots, `out/`, or `docs/audit-results/mobile/*`. Delete your test screenshots and leftovers when done.
8. Run, before you finish: the full `node scripts/makers/build-bundles.js`, then every gate in `scripts/makers/gates/`
   (the loop in BUILD-LOG), and `scripts/makers/tests/*.test.js`. Report failures honestly; a failing gate you did not
   cause is reported, not hidden.
9. **No own-image upload, anywhere** (operator ruling 2026-11-01): pictures come only from the reviewed library; do not
   build, plan or keep any upload / own-photo path.
10. **Handoff:** write `docs/makers/handoff/<NN>-<slug>.md` (≤ 1 page): what is built and committed (hashes), how it was
   measured, what is NOT done, strings needing the native review, decisions only the operator can make, traps paid for.
   The main session folds it into BUILD-LOG.
