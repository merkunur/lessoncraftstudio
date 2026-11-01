# The 10 toughest maker tasks — handed to Fable 5.1 (STOPPED after task 6)

> **Operator 2026-11-01: "Don't launch any more Fable 5.1 agents."** Tasks 1–6 were done by agents (handoffs 01–06). Tasks 7–10 are
> the main session's own work, built in the maker order; no agent is launched for them.

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
2. **Do not launch sub-agents.** After the first batch (tasks 2, 4, 5, run in parallel) the operator runs ONE agent at a
   time; the lock and ownership rules in "Agents in parallel" below are binding.
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
8. **Run only the checks for YOUR work** before you finish: your own gates and tests, plus the existing gates your
   change can affect (e.g. parity + slots for a shared-module change, the shell gates for a shell change), under the lock
   only when you rebuild. **Never run the full build + all-gates loop** — it takes over an hour and, under the shared
   lock, it queued three agents behind each other for hours (2026-11-01). The main session runs the full suite after
   you report. Report failures honestly; a failing gate you did not cause is reported, not hidden.
9. **No own-image upload, anywhere** (operator ruling 2026-11-01): pictures come only from the reviewed library; do not
   build, plan or keep any upload / own-photo path.
10. **Handoff:** write `docs/makers/handoff/<NN>-<slug>.md` (≤ 1 page): what is built and committed (hashes), how it was
   measured, what is NOT done, strings needing the native review, decisions only the operator can make, traps paid for.
   The main session folds it into BUILD-LOG.

## Agents in parallel (operator 2026-11-01) — binding while agents run in parallel

The operator first allowed three at a time (tasks 2, 4, 5 run together), then ruled: **"After the active Fable 5.1 agents
complete their tasks launch 2 agents at a time, not 3."** So the next task starts only when fewer than two agents are
running; from then on at most TWO run in parallel.

**Superseded the same day: "After the active Fable 5.1 agents complete their tasks launch one agent a time, not more than
one."** The current batch (2, 4, 5) finishes; after that exactly ONE agent runs at a time — the next starts only when the
previous one has reported. The lock and ownership rules below still apply (the main session runs builds too).

Agents share ONE working tree. Two things collide: builds/gates and files.

- **One build or gate run at a time.** `build-bundles.js` rewrites the shared `out/makers` data folder and the gates read it,
  so a run in one agent breaks another's mid-run. Wrap EVERY build or gate run (also the main session's) in the lock:
  `until mkdir out/.makers-lock 2>/dev/null; do sleep 30; done; <your command>; rmdir out/.makers-lock`
  Keep the lock as short as you can (one maker `--makers=<id>` while developing; the full loop once at the end). If a
  lock is older than 90 minutes its owner died: remove it and say so in your handoff.
- **Own your files.** Edit only files your task owns (listed in your brief) plus NEW files. A shared file another task
  owns: do not edit it — write what you need into your handoff, or add a separate new module and import it.
- **Commit only your own hunks.** Before `git add`, run `git diff <file>`; if a file holds another agent's change, commit
  only yours (`git add -p` is unavailable — use `git diff <file> > p.patch`, cut it to your hunks, `git apply --cached p.patch`).
- **A gate failing because of another agent's unfinished work** is reported in your handoff, not "fixed" by editing their
  files.
