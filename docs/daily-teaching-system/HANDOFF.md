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

## 2. Where the programme stands (2026-11-19)

- LIVE: Parts 0 to 7, 11, 12.2 (batches A to Y), 8.1 readers. English units 54 with 330 lessons; German and Swedish
  units for mathematics; unit checks en 73 (every English unit, Stage B-2, deploy 38, 2026-11-19) / de 27 / sv 35;
  sub plans en and de. Writing checks end with an on-demand writing part scored with a guide
  (`scripts/assessments/rubrics/en.json`); reading checks print the read-aloud texts on the key and the teacher pages.
- Part 9 (class results) is BUILT and switched OFF. Only the owner switches it on (`CLASS_RESULTS_ENABLED=1`).
- 12.3 English literacy: **every buildable row of the year design is placed** (batch PP, 2026-11-17). English has 73
  units, 415 lessons and 8 plans, all live (K, Grades 1 to 3, mathematics and literacy). Grade 3 batch H (G3-498 to
  G3-501) and the unit Reading to Learn: Informational Texts were built and placed on 2026-11-16, RI.3.7 (G3-510/511)
  joined on 2026-11-17; the line "the Grade 3 unit waits for batch H" that stood here was a stale note of 2026-11-16
  (corrected 2026-11-19 after a measurement).
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

## 4. The title tails are back (operator, 2026-11-18: "give the tails back")

873 landing-less indexable pages had lost their search-title tail in republish rounds before 2026-11-13 (57 to 130 per
language; the 820 not republished since plus 53 that were). On the operator's word they got the tail back in one
scoped run (`append-demand-title-tail.js --slugs-file`, each page the tail kind it carried; 0 errors, a rescan finds
no page without its tail). **The identity baseline was taken again: `docs/SEO/daily-system-baseline/baseline.json`,
captured 2026-11-18T22:34:15Z** (three sampled titles gained their tail, nothing else changed). Nothing is open here.

## 5. NEXT: the programme in the ruled order (approved plan, Stage B onward)

0. **DONE 2026-11-22:** the maker release for the f1119 fixes (deploy 39), readers 12 → 63 with the `/en/readers`
   hubs (deploy 40), the homepage Reading Room (deploy 41) and the books' page-turn screen (deploy 42; PART-8-DESIGN.md
   §6); PLAN.md entries of 2026-11-22. **NEXT:** item 3 below (item 2 done 2026-11-23).
1. **English literacy year (12.3) with readers to 60 (8.2).** (a), (b) and (c) are DONE (B-2 live 2026-11-19, B-3 live
   2026-11-22, screen version included; PLAN.md entries of those dates). Measured 2026-11-19 (plan
   `C:\Users\rkgen\.claude\plans\lexical-singing-kahan.md`): the units are complete; what is open is (a) the design
   order: the Grade 1 reorder is applied, the K story-order move and the "Choosing the Right Word" split are decided
   NOT to be made, and five rows wait (PLAN.md §11, ruling of 2026-11-19); (b) **unit checks for the 31 English units
   that have none** (4 mathematics, 27 literacy) and the 4 pilot checks, in four waves (mathematics, literacy items,
   reading, writing with rubrics); (c) 48 more readers with hubs and a screen version.
2. **DONE 2026-11-23: English checks and sub days for the whole year:** coverage gate (C-1), 120 week sub days (C-4,
   deploy 45), 24 checks of the year and 9 placement checks (C-2/C-3, deploys 46-47). Coverage: 3 gaps left, the three
   literacy plans under 28 weeks. **NEXT:** item 3 below.
3. **Science, social studies, health, preschool and theme units in English.** IN PROGRESS (Stage D, plan `lexical-singing-kahan.md`): D-0 standards and D-1 year designs DONE 2026-11-23 (deploy 48); D-2 Level Sets (5,669 noindex pages, ysa/ysb) and D-1b matching DONE 2026-11-23 (deploy 49; work lists `docs/daily-teaching-system/year/TYPE-WORK-LIST.{science,social,health}.md`). ORDER RULED 2026-11-23: a unit is placed only when its lessons have pages (P3 two assets; an indexed unit description may not change later), so the new types come first, grade by grade: D-5 batch K DONE 2026-11-23 (deploy 51). D-3 for Kindergarten DONE 2026-11-23 (deploy 52): 7 science + 2 health units, 42 teacher notes with hands-on routines (a routine now counts as an asset beside a page), batch K2, live fixes (recycling US curbside, K-354 head line, K-374 crossing). Batch 1 + D-3 for Grade 1 DONE 2026-11-24 (deploy 53): 27 Grade 1 types G1-626..G1-652 (Level Set ydm, 167 noindex), 6 science + 2 health units, 39 notes; a content-area investigation may claim the third session its design gives it (`"days": 3` → investigateDays); the plain clear jar retired from the recycling pages (183 live copies republished). Batch 2 + D-3 for Grade 2 DONE 2026-11-24 (deploy 55): 30 Grade 2 types G2-584..G2-613 (Level Set ydn, 156 noindex), 6 science (plan-2-science 28 weeks) + 2 health units, 39 notes; celery replaced by asparagus as the stem we eat on G2-363 (18 live copies in 9 languages; de/da unchanged); the G2-363 landings still name celery (landing text needs the owner). Batch 3 + D-3 for Grade 3 DONE 2026-11-24 (deploy 56, commit aa7900c5b + fix 3a193c54e): 31 Grade 3 types G3-581..G3-611 (Level Set ydo, 125 noindex; G3-609/610 print only in the feelings family), 5 science (plan-3-science, 25 of 26 weeks) + 2 health units, 35 notes; every K-3 science and health line is built; G3-581 left the 11-18 skip list (`C:\Users\rkgen\lcs-skip-types.txt`, an id never committed). NEXT: social studies K-3 (design rows, pages, units: `type-work-list.js --subject=social`); open: unit checks for the science and health units (the card engine cannot read these pages; 38 gaps frozen once), the Texas reading of the new points, the library nurse picture (red-cross cap, the owner's word). D-4 preschool themes after.
4. **German and Swedish to the whole year.**
5. **The eight other languages, one at a time: fr, no, nl, fi, da, it, es-MX, pt-BR** (built noindex; indexing waits
   for the Search Console read of 2026-12-09).
6. **Readers to 150 and 300** in English, then every language.
7. **Part 9:** built, switch OFF; only the owner switches it on.
8. **Part 10:** the remaining activities, last.

Each stage ends deployed, verified live and recorded (PLAN.md entry, memory checkpoint).

## 6. Rules and traps the next session needs at once

- **Before a deploy that carries a new or changed page type, run `node scripts/worksheet-gen/tools/check-types-load-without-cache.js`** (and `--poison`). The server has no picture cache. A type that looks a picture up while its module loads crashes deploy.sh's content-graph gate, and the deploy stops. It did so on 2026-11-15 and on 2026-11-24 (the first run of deploy 56). **Wait for a deploy by watching the process** (`pgrep -f "[b]ash deploy.sh"`), never by grepping the log for "complete" or "FAILED": the first wait of deploy 56 sat 57 minutes on a deploy that had already stopped.
- No Fable agents. Agents: `model: opus`, `subagent_type: general-purpose`, at most 2 at a time (operator 2026-11-18; the session itself runs on Opus 5.5), each with its own
  files; use them for as much of the work as possible; I brief, check and publish.
- en = American, pt = Brazilian, es = Mexican. One reviewer over a compact dump plus my own reading, in every content
  task.
- Never `git add .`; commit with explicit paths; `scripts/worksheet-gen/data/` is gitignored (`git add -f`); commit
  messages through `git commit -F <file>`; end them with the Co-Authored-By line the session names for its own model.
- Bash heredocs mangle quotes and backslashes (it cost a broken script again on 2026-11-18): write scripts with the
  Write tool.
- Builds and gates: `export WSG_SKIP_TYPES=$(cat C:/Users/rkgen/lcs-skip-types.txt)` (durable copy of the handoff
  folder's list, 2026-11-19; none of its 16 types has a file in the tree any more, so it guards nothing today); a full `build-bundles.js` run takes about 2 h 10 min and the full gate
  suite about 7 h; never run one gate twice in parallel, never a family gate beside the maker gates; no source edits
  under `scripts/worksheet-gen` or `scripts/makers` while a build or the suite runs; `run-all-gates.sh` deletes the logs
  in its log folder at its start (`GATE_LOGS=<other folder>` for a partial run); a filtered run fails `unique-solution`
  when no puzzle maker is in the filter.
- **After ANY in-place republish, in this order:** `audit-update-injections.js` (+ `restore-update-injections.sh
  confirm`), `scan-lost-tails.js` and `restore-update-identity.js <list> --at=2026-11-18T22:34:15Z --confirm` (the baseline's "captured"; read it from the file if the baseline was taken again) (also for
  the list of exempt pages republished since the baseline), then `repoint-deck-canonical.js --types=<families>
  --locale=<l>` as the LAST server step (never without `--types`; second pass must change 0; the families of EVERY
  republished deck, noindex included: noindex decks can have landings, and on 2026-11-19 27 were left self-canonical
  when only the indexable decks' families were repointed), then
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
`lib/email.ts`; regenerate app decks; change titles or descriptions of indexed pages; any destructive
server action outside a republish cleanup.

## 8. Working files of the ended session

`C:\Users\rkgen\lcs-handoff-1118\` holds the release scripts, gate logs, the republish tools (`unresolved*.js`,
`repoint-types.json`), the identity journals and lists (`server\`), and `skip-types.txt`. Nothing in the repository
depends on it; keep `skip-types.txt` (copy it somewhere durable first), delete the rest when it is no longer wanted.
