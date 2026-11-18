# Daily Teaching System: handoff of 2026-11-18 (night)

Written at the operator's request so a new session can continue exactly here. Read this file first, then the last
entry of `docs/daily-teaching-system/PLAN.md` and the last lines of the memory file
`project_daily_teaching_system_plan.md`.

## 1. What the programme is and where its truth lives

- **The goal the operator set:** "when the electricity went off you were implementing the 'indispensable daily teaching
  system' product transformation. Find out everything about it and complete the product transformation."
- **Master plan:** `docs/daily-teaching-system/PLAN.md` (Parts 0 to 12; rulings in §11; the progress log is its end).
- **Approved working plan (stages):** `C:\Users\rkgen\.claude\plans\logical-strolling-papert.md`. Stage A (finish the
  f1115 fix round) is closed. Stage B onward is the rest of the programme (section 5 below).
- **Working record:** memory file `project_daily_teaching_system_plan.md` (read its LAST LINES first) and `MEMORY.md`.
- **Rules:** `CLAUDE.md` (rule 1: never waste the operator's usage; rule 2: a native-speaker check and a pedagogical
  check in every content task; pedagogical mistakes are fixed at once and live pages are republished in place).

## 2. Where the programme stands (2026-11-18)

- LIVE: Parts 0 to 7, 11, 12.2 (batches A to Y), 8.1 readers. English units 54 with 330 lessons; German and Swedish
  units for mathematics; unit checks en 42 / de 27 / sv 35; sub plans en and de.
- Part 9 (class results) is BUILT and switched OFF. Only the owner switches it on (`CLASS_RESULTS_ENABLED=1`).
- 12.3 English literacy: informational units live for K (4 lessons), Grade 1 (4), Grade 2 (5). Grade 3 batch G is live
  (G3-494 to G3-497); the Grade 3 unit waits for batch H (RI.3.5, RI.3.7, RI.3.3).
- The other eight languages are built noindex in the order fr, no, nl, fi, da, it, es-MX, pt-BR and are opened to
  Google only after the Search Console read of 2026-12-09.
- Activities (Part 10) are last.

## 3. The maker-audit round: DONE and LIVE (deploy 37, 2026-11-18)

The operator reported that the Position Words templates "left and right", "top, middle, bottom" and "inside and
outside" asked the same thing on every "New version", and then asked for the same search in every template of every
maker, for language mistakes too. The whole round is described in the last entry of PLAN.md. Final state:

- **Live makers = the build:** all 59 makers on the server equal `out/makers/versions.json` (Position Words
  `0192066dccd5`, shared data `c50e84fd3497`). In a real browser on the live origin, "New version" pressed five times:
  K-065 asks RIGHT / LEFT in turn, K-066 TOP / MIDDLE / BOTTOM, K-067 INSIDE / OUTSIDE.
- **Deploy 37:** exit 0, smoke tests passed, payment canary OK, 59 makers registered. Live checks pass: units en 1,182 /
  de 610 / sv 537, assessments en 738 / de 503 / sv 655.
- **Live pages:** about 17,900 pages replaced in eleven languages; ten pt G2-349 pages replaced after the instruction
  went back to two lines; 14 Level Set copies that cannot be rebuilt unpublished on the operator's word (archive on the
  PC: `C:\Users\rkgen\lcs-archive\unpublished-level-set-copies-1118_*.tar.gz`).
- **Search identity repaired** (found by the identity check of deploy 37): an in-place republish writes a fresh head,
  so a landing-less indexable deck page loses its title tail ("— Free Printable PDF" …) and its meta description
  changes with the instruction. All 481 landing-less indexable pages republished since the identity baseline of
  2026-11-13 now carry the title and description of the baseline moment again; the identity check passes (287 pages,
  11 shards unchanged). Tools: `scripts/publish-cli/scan-lost-tails.js`, `restore-update-identity.js --at=<baseline
  "captured">`, `append-demand-title-tail.js --slugs-file`.
- **Git:** everything is pushed (`origin/pivot/printable-business-toolkit` = local HEAD). Not mine, never commit:
  `docs/audit-results/mobile/*`, `scripts/worksheet-gen/data/literacy/beginning-sounds.json`,
  `tools/level-set/year-lit-r.config.js`, `check-zips-ylr.js`.
- **Cleaned:** server staging, logs and archived pages; PC wave files, staging, release pack, temp folders.

## 4. One decision that waits for the operator

**820 landing-less indexable pages lost their search-title tail in republish rounds BEFORE 2026-11-13** (about 75 per
language). The identity baseline of 13 November recorded them without the tail, so they were left as the baseline has
them. Giving the tail back is a title change on 820 indexed pages and needs the operator's word plus a new baseline
(`node scripts/seo/identity-snapshot.js --capture --out=docs/SEO/daily-system-baseline/baseline.json`). The list is in
`C:\Users\rkgen\lcs-handoff-1118\server\lost-tails-restored.txt` (all 1,262 pages that ever lost a tail; the 820 are
those whose live version is older than the baseline) and the before/after journal beside it.

## 5. NEXT: the programme in the ruled order (approved plan, Stage B onward)

1. **English literacy year (12.3) with readers to 60 (8.2).** Next concrete piece: Grade 3 batch H (RI.3.5, RI.3.7,
   RI.3.3), then the Grade 3 informational unit (a unit needs 4 lessons, a plan 3 units); the Grade 2 row-band pass; unit
   checks for the new units; the split of "Choosing the Right Word"; story banks; phonics, grammar and writing units
   (about 130 lessons open); 48 more readers.
2. **English checks and sub days for the whole year** (item bank rest, year checks, placement checks, a sub day for
   every week the units cover, the coverage gate).
3. **Science, social studies, health, preschool and theme units in English.**
4. **German and Swedish to the whole year.**
5. **The eight other languages, one at a time: fr, no, nl, fi, da, it, es-MX, pt-BR** (built noindex; indexing waits
   for the Search Console read of 2026-12-09).
6. **Readers to 150 and 300** in English, then every language.
7. **Part 9:** built, switch OFF; only the owner switches it on.
8. **Part 10:** the remaining activities, last.

Each stage ends deployed, verified live and recorded (PLAN.md entry, memory checkpoint).

## 6. Rules and traps the next session needs at once

- No Fable agents. Agents: `model: opus`, `subagent_type: general-purpose`, at most 2 at a time (operator 2026-11-18; the session itself runs on Opus 5.5), each with its own
  files; use them for as much of the work as possible; I brief, check and publish.
- en = American, pt = Brazilian, es = Mexican. One reviewer over a compact dump plus my own reading, in every content
  task.
- Never `git add .`; commit with explicit paths; `scripts/worksheet-gen/data/` is gitignored (`git add -f`); commit
  messages through `git commit -F <file>`; end them with the Co-Authored-By line the session names for its own model.
- Bash heredocs mangle quotes and backslashes (it cost a broken script again on 2026-11-18): write scripts with the
  Write tool.
- Builds and gates: `export WSG_SKIP_TYPES=$(cat C:/Users/rkgen/lcs-handoff-1118/skip-types.txt)` (copy that file
  somewhere durable before deleting the folder); a full `build-bundles.js` run takes about 2 h 10 min and the full gate
  suite about 7 h; never run one gate twice in parallel, never a family gate beside the maker gates; no source edits
  under `scripts/worksheet-gen` or `scripts/makers` while a build or the suite runs; `run-all-gates.sh` deletes the logs
  in its log folder at its start (`GATE_LOGS=<other folder>` for a partial run); a filtered run fails `unique-solution`
  when no puzzle maker is in the filter.
- **After ANY in-place republish, in this order:** `audit-update-injections.js` (+ `restore-update-injections.sh
  confirm`), `scan-lost-tails.js` and `restore-update-identity.js <list> --at=<baseline captured> --confirm` (also for
  the list of exempt pages republished since the baseline), then `repoint-deck-canonical.js --types=<families>
  --locale=<l>` as the LAST server step (never without `--types`; second pass must change 0), then
  `node scripts/seo/identity-snapshot.js --compare=docs/SEO/daily-system-baseline/baseline.json --origin=127.0.0.1` on
  the server, then clean `_staging`, `.publish-cli-staging/<batch>*` and the logs.
- NEVER run `append-demand-title-tail.js --confirm` without `--slugs-file`: it would tail about 120,000 noindex copies.
- A regeneration log with "failed: N" is not closed by a later round that does not name the page: run
  `republish/unresolved.js` (in the handoff folder) after a republish round and deal with every page it names.
- Read live files through the origin (`curl --resolve www.lessoncraftstudio.com:443:65.108.5.250 …`): the edge cache
  keeps PDFs for an hour and answers scripted requests with a challenge page.
- A real-browser check of a maker without a login: `C:\Users\rkgen\lcs-handoff-1118\live-position-words.js`
  (puppeteer on the origin, the access answer given locally).
- The permission check blocks removals of live content that the operator did not ask for in his own words: ask first.

## 7. Not without the owner

Switch Part 9 on; open the other languages' new pages to Google before the 2026-12-09 read; touch auth routes or
`lib/email.ts`; regenerate app decks; change titles or descriptions of indexed pages (section 4); any destructive
server action outside a republish cleanup.

## 8. Working files of the ended session

`C:\Users\rkgen\lcs-handoff-1118\` holds the release scripts, gate logs, the republish tools (`unresolved*.js`,
`repoint-types.json`), the identity journals and lists (`server\`), and `skip-types.txt`. Nothing in the repository
depends on it; keep `skip-types.txt` and the `server\` folder until section 4 is decided, delete the rest.
