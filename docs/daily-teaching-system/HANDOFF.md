# Daily Teaching System: handoff of 2026-11-18 (evening)

Written at the operator's request so a new session can continue exactly here. Read this file first, then the last
entry of `docs/daily-teaching-system/PLAN.md` and the last lines of the memory file
`project_daily_teaching_system_plan.md`.

## 1. What the programme is and where its truth lives

- **The goal the operator set:** "when the electricity went off you were implementing the 'indispensable daily teaching
  system' product transformation. Find out everything about it and complete the product transformation."
- **Master plan:** `docs/daily-teaching-system/PLAN.md` (Parts 0 to 12; rulings in §11; the progress log is its end).
- **Approved working plan (stages):** `C:\Users\rkgen\.claude\plans\logical-strolling-papert.md`. Stage A (finish the
  f1115 fix round) is closed. Stage B onward is the rest of the programme (section 6 below).
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

## 3. What this session did (the maker-audit round)

The operator reported that the Position Words templates "left and right", "top, middle, bottom" and "inside and
outside" asked the same thing on every "New version", and then asked for the same search in every template of every
maker, for language mistakes too. All of it is described in the last entry of PLAN.md. In short:

- Sameness fixed in 36 templates (commits `9dc8c35f4`, `1b91e5187`); 1,437 strings corrected in eleven languages after
  a native review (`fb99ee6a3` and follow-ups); about 17,900 live pages replaced in place in 11 languages; K-663 got a
  teacher strip (`cf85b914b`).
- Full maker build, full gate suite (27 of 30), three findings fixed at their source, suite run again for the five
  makers those fixes touch (29 pass; `unique-solution` refuses a run without a puzzle maker, it passed on the full run).
- pt G2-349: instruction restored to two lines (`a9dbf4216`), ten live pt pages replaced, canonical repoint run again in
  all 11 languages (second pass changed 0), server staging cleaned.
- Fourteen noindex Level Set copies that cannot be rebuilt were unpublished on the operator's word ("unpublish them",
  2026-11-18): en 1, de 3, nl 3, it 1, es 6 (list: `C:\Users\rkgen\lcs-handoff-1118\republish\unpub-1118.txt`). All 14
  addresses return 404; `verify-level-set-pathways.js` (183 passed) and `verify-level-set-hubs.js` (146 hubs, 0 fail)
  pass on the server afterwards.

## 4. State of the repository and the build at handoff

- Branch `pivot/printable-business-toolkit`. **Local commits NOT pushed** (oldest first): `c55ee4be3`, `174bcc706`,
  `1ea934b9a`, `f61a8314b`, `4e01fe28c`, `f1101546b`, `cf85b914b`, `a9dbf4216`, `805898330`, `b1ec0a090`, plus the commit
  that adds this file and the PLAN.md entry.
- Not mine, never commit: `docs/audit-results/mobile/*`, `scripts/worksheet-gen/data/literacy/beginning-sounds.json`
  (line endings only), `tools/level-set/year-lit-r.config.js`, `check-zips-ylr.js`.
- **Maker build in `out/makers` is the release candidate:** 58 of 59 makers changed against live (secret-code the
  same), shared data `c50e84fd3497`, Position Words `0192066dccd5`, Sentences `67b43212833a`. 66 fix records and the
  rebuilt catalog are committed (`b1ec0a090`). Do NOT run `build-bundles.js` again unless a source under
  `scripts/worksheet-gen` or `scripts/makers` changes: a full build takes about 2 h 10 min, the full gate suite about 7 h.
- **The live makers still serve the old templates.** The Position Words fix reaches teachers only with the release
  below.
- Working files of the session (the scratchpad may be gone): `C:\Users\rkgen\lcs-handoff-1118\` (`skip-types.txt`,
  `live-versions-1117.json`, `release-fix-ids.js`, `release-record.js`, `release-fix-plan.json`, `measure-canon.js`,
  the two gate logs, `republish/repoint-types.json`, `republish/unresolved*.js`). Delete the folder when section 5 is
  done.

## 5. NEXT STEPS, in this order (the makers release, deploy 37)

1. **Deploy gates on the PC** (sources changed after the last full run: `a9dbf4216`, `b1ec0a090`): run the hard gates
   of `deploy.sh` that read the repository, at least
   `node scripts/makers/gates/registration.js`, `node scripts/makers/gates/landings.js`,
   `node scripts/worksheet-gen/tools/check-b4-string-parity.js`, `node scripts/units/gates.js`,
   `node scripts/units/apply-pacing-to-defs.js --check`, `node scripts/assessments/gates.js`,
   `node scripts/teacher-gate/gates.js`, `node scripts/seo-landing/verify-level-set-hubs.js`. Stop and report on a failure.
2. **Pack:** `node scripts/makers/release-pack.js` → `out/makers-release/` (about 600 MB; it is not gitignored, never
   `git add` it).
3. **Upload:** `tar -C out/makers-release -cf - . | ssh -i ~/.ssh/id_ed25519 root@65.108.5.250 "mkdir -p /var/www/lcs-media/_staging/makers-release && tar -C /var/www/lcs-media/_staging/makers-release -xf -"`
   (run in the background; compare the file count on both sides).
4. **Push** the local commits (`git push`, plain fast-forward).
5. **Deploy:** `ssh … "bash /opt/lessoncraftstudio/deploy.sh > /root/deploy-37.log 2>&1; echo exit \$?"` (background);
   read "exit 0", the smoke tests, the payment canary and the identity check in the log. `deploy.sh` installs the
   staged maker release (`install-release.js`) and runs `registration --served` and `landings`.
6. **After the deploy:**
   - `bash scripts/units/upload-teacher-files.sh en` (the teacher guide of `k-short-vowels-and-cvc-words` was rebuilt
     for the K-663 strip).
   - `node scripts/units/live-check.js` and `node scripts/assessments/live-check.js` (en, de, sv).
   - `https://www.lessoncraftstudio.com/makers/versions.json` must equal `out/makers/versions.json` (Position Words
     `0192066dccd5`, data `c50e84fd3497`).
   - In a real browser: `https://www.lessoncraftstudio.com/makers/app/?maker=position-words&lang=en&t=K-065`, press
     "New version" several times: the page must ask left and right in turn. Same for K-066 (top, middle, bottom) and
     K-067 (inside, outside). Mind the 5-minute edge cache.
7. **Clean:**
   - Server: `/var/www/lcs-media/_staging/makers-release` (after the install), `/root/deploy-37.log`; move the 14
     archived pages to the PC archive with `bash scripts/ops/archive-from-server.sh unpublished-1118 <paths> --delete`
     (they sit in `/var/www/lcs-media/decks/.archived/<loc>/<slug>-unpublished-20261118…`; the tool verifies the archive
     before it deletes).
   - PC: `scripts/worksheet-gen/waves/_fix-aud-*`, `_fix-aud2-*`, `_fix-k663-*`, `_fix-pt349-*` and
     `waves/wave-msrbal-en.json` (untracked); `scripts/worksheet-gen/out/staging/_pt349fix`; `out/makers-release`;
     `C:\Users\rkgen\lcs-tmp-pt349`; `C:\Users\rkgen\lcs-handoff-1118`; test renders.
8. **Record:** one sentence at the end of the last PLAN.md entry ("deployed 2026-11-…, deploy 37, live checks pass"),
   a final checkpoint in the memory file, the MEMORY.md pointer line of the Daily Teaching System, then delete this
   file's section 5 or mark it done.

## 6. After the release: the programme in the ruled order (approved plan, Stage B onward)

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

## 7. Rules and traps the next session needs at once

- No Fable agents. Agents: `model: opus`, `subagent_type: general-purpose`, at most 5 at a time, each with its own
  files; use them for as much of the work as possible; I brief, check and publish.
- en = American, pt = Brazilian, es = Mexican. One reviewer over a compact dump plus my own reading, in every content
  task.
- Never `git add .`; commit with explicit paths; `scripts/worksheet-gen/data/` is gitignored (`git add -f`); commit
  messages through `git commit -F <file>`; end them with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.
- Bash heredocs mangle quotes and backslashes: write scripts with the Write tool.
- Builds and gates: `export WSG_SKIP_TYPES=$(cat C:/Users/rkgen/lcs-handoff-1118/skip-types.txt)`; never run one gate
  twice in parallel, never a family gate beside the maker gates; no source edits under `scripts/worksheet-gen` or
  `scripts/makers` while a build or the suite runs; `run-all-gates.sh` deletes the logs in its log folder at its start
  (use `GATE_LOGS=<other folder>` for a partial run); a filtered run fails `unique-solution` when no puzzle maker is in
  the filter.
- After ANY page publish: `audit-update-injections.js` (+ `restore-update-injections.sh confirm` when something is
  lost), then `repoint-deck-canonical.js --types=<families> --locale=<l>` as the LAST server step, never without
  `--types`, second pass must change 0; then clean `_staging`, `.publish-cli-staging/<batch>*` and the logs.
- A regeneration log with "failed: N" is not closed by a later round that does not name the page: run
  `republish/unresolved.js` after a republish round and deal with every page it names.
- Compare live PDFs through the origin (`curl --resolve www.lessoncraftstudio.com:443:65.108.5.250 …`), not the edge
  cache.
- The permission check blocks removals of live content that the operator did not ask for in his own words: ask first.

## 8. Not without the owner

Switch Part 9 on; open the other languages' new pages to Google before the 2026-12-09 read; touch auth routes or
`lib/email.ts`; regenerate app decks; any destructive server action outside the cleanup named above.
