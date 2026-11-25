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
3. **Science, social studies, health, preschool and theme units in English.** IN PROGRESS (Stage D, plan `lexical-singing-kahan.md`): D-0 standards and D-1 year designs DONE 2026-11-23 (deploy 48); D-2 Level Sets (5,669 noindex pages, ysa/ysb) and D-1b matching DONE 2026-11-23 (deploy 49; work lists `docs/daily-teaching-system/year/TYPE-WORK-LIST.{science,social,health}.md`). ORDER RULED 2026-11-23: a unit is placed only when its lessons have pages (P3 two assets; an indexed unit description may not change later), so the new types come first, grade by grade: D-5 batch K DONE 2026-11-23 (deploy 51). D-3 for Kindergarten DONE 2026-11-23 (deploy 52): 7 science + 2 health units, 42 teacher notes with hands-on routines (a routine now counts as an asset beside a page), batch K2, live fixes (recycling US curbside, K-354 head line, K-374 crossing). Batch 1 + D-3 for Grade 1 DONE 2026-11-24 (deploy 53): 27 Grade 1 types G1-626..G1-652 (Level Set ydm, 167 noindex), 6 science + 2 health units, 39 notes; a content-area investigation may claim the third session its design gives it (`"days": 3` → investigateDays); the plain clear jar retired from the recycling pages (183 live copies republished). Batch 2 + D-3 for Grade 2 DONE 2026-11-24 (deploy 55): 30 Grade 2 types G2-584..G2-613 (Level Set ydn, 156 noindex), 6 science (plan-2-science 28 weeks) + 2 health units, 39 notes; celery replaced by asparagus as the stem we eat on G2-363 (18 live copies in 9 languages; de/da unchanged); the G2-363 landings still name celery (landing text needs the owner). Batch 3 + D-3 for Grade 3 DONE 2026-11-24 (deploy 56, commit aa7900c5b + fix 3a193c54e): 31 Grade 3 types G3-581..G3-611 (Level Set ydo, 125 noindex; G3-609/610 print only in the feelings family), 5 science (plan-3-science, 25 of 26 weeks) + 2 health units, 35 notes; every K-3 science and health line is built; G3-581 left the 11-18 skip list (`C:\Users\rkgen\lcs-skip-types.txt`, an id never committed). Batch SK + D-3 for Kindergarten social studies DONE 2026-11-24 (deploy 57, commit c16df101d): 15 types K-712..K-726 (Level Set ydp, 136 noindex, with K-563), 5 units + plan-k-social (28 weeks: social studies plans share the half week between units, assemble.js + gate P7), 20 notes, 10 guest-teacher scripts on the Kindergarten week days; K-213's mechanic retired (121 live copies checked, 77 + 44 republished in place). Batch S1 + D-3 for Grade 1 social studies DONE 2026-11-25 (deploys 58-59, commits f65feb81b + 9cde8fc0e): 18 types G1-653..G1-670 (Level Set ydq, 164 noindex, with G1-530; G1-670 is a Grade 1 market page with real coins built to the line, replacing G2-472, which is Grade 2), 5 units + plan-1-social (28 weeks; "Read the map key" takes three sessions), 20 notes, 12 guest-teacher scripts on the Grade 1 week days; gate P5 now reads lesson routines (the page prints them). Batch S2 + D-3 for Grade 2 social studies DONE 2026-11-25 (deploy 60, commit 5ee250ccb): 17 types G2-614..G2-630 (Level Set ydr, 127 noindex; seven print only in the family, money and reading-comprehension families), 5 units + plan-2-social (28 weeks; the teacher-led class market takes three sessions), 20 notes, 13 guest-teacher scripts in the Grade 2 social block; the Money Mat on both market lessons; two LIVE guest scripts fixed (2:cardinal-directions said north is the tip that points up; 2:continents named a word box Level 3 lacks; they ship in Grade 2 and Grade 3 weeks). Batch S3 + D-3 for Grade 3 social studies DONE 2026-11-25 (deploy 61, commit edf41c363): 18 types G3-612..G3-629 (Level Set yds, 128 noindex; nine print only in playable families), 4 units + plan-3-social (26 weeks; the grid map takes three sessions), 19 notes, 14 guest-teacher scripts in the Grade 3 social block; every K-3 social studies line is built (D to build 0). The same day (commit 4cb8f6d8a): people stood IN FRONT of their counter, lectern, desk or bench in seven types (G3-627, G3-619, G2-616, G2-617, G2-624, G2-629, G1-655; the owner's reading of the bakery page), fixed at the source with a measured gate check, 30 live copies republished in place, six unit guides rebuilt; and the sitemaps are served from an nginx cache (commit 09f3df1b2; Search Console could not read /sitemap/4.xml after a 504 during a deploy). D-4 preschool theme units DONE 2026-11-25 (deploys 62-63, commits 9978036fc + a61796da4): 30 theme units over 33 weeks (grade P, subject theme; four daily blocks each, exact themed pages, a week-at-a-glance grid and an observation checklist in the guide, no unit check), "Preschool Themes by Month", designed by one US pre-K designer and read by one US pre-K coach (130 findings); the curriculum pages leave the theme blocks out. The same day (commit a899347eb): wrong library pictures found by those two (a housefly called firefly, an alarm clock called timer, a red beet called turnip, a moon called sky) left the cache or got their right word, 450 live Level Set pages in 11 languages republished in place. NEXT: the last piece of item 3, D-3 for the thinking-skills units (plan decision 4, designed in `scripts/units/year/thinking-units.en.json` on 2026-11-23 and never placed: K Look Closely, Think It Through; G1 Detective Thinking; G2 Clues and Reasons; G3 Logic Lab; 20 lessons, no year plan; the G2 unit reuses two G1 points, so those lessons need ids), then item 4; open: unit checks for the science, health and social studies units (the card engine cannot read these pages; 62 gaps frozen once), the Texas reading of the new points, the library nurse picture (red-cross cap, the owner's word), the maker release (the sorting maker still holds K-213's retired pairs, and the makers still draw the wrong pictures until they are rebuilt), one fi K-307 page that keeps the housefly (its rebuilt page trips the frame lint), the 97 app pages with the wrong pictures (app decks are not regenerated).
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
- **Batch lessons of 2026-11-24 (social studies K):** a byte-identity hash must log each type before it builds it (the maze family
  takes up to 13 s a build: hash it in English, seed 1); `build-waves.js` silently drops a face whose meta words are not a
  list (give the type `levelSetWords`); a plan that runs past a grade's sub-day year makes `build-en-weeks.js` fail, and a
  point that gets a unit is "not taught yet" in the week days before its lesson (widen the pools); a guest script names
  only what every copy of its page shows (gate P4; `DRAWN` for drawn pages); `build-guide.js` now measures a lesson
  sheet against its footer.
- **Batch lessons of 2026-11-25 (social studies Grade 1):** before reusing an existing type under a new grade, render it:
  G2-472 under a Grade 1 id was the Grade 2 page (the notes writer caught it). Write the fix brief from scratch, never
  by `sed` from the last batch's: a converted brief carries the old batch's rulings (one launch had to be stopped).
  A lesson with three page types shows its thumbnails in two rows, so its note must stay near 1,050 letters to fit
  the sheet; build its guide before the note review is final. A note's quotes are checked against every copy, not
  copy 1 (the postcard year differs by copy). A note names a tool by the name the unit page prints (`tool-content`
  name, "The Rail That Waits", never its key `arrow-strip`). The unit page allows no "free" anywhere, the routine
  included (gate P5 reads it now); history uses "enslaved", not "not free". `build-pack.js --weeks` rebuilds every
  grade's week packs: after one grade's days change, build only that grade with `--pack=<grade>-week-N`, then `--binder`.
- **Batch lessons of 2026-11-25 (social studies Grade 2):** measure a tell on EVERY word of a bank, not only the first word and the length: round 1 cleared those two at 72% while "to" sorted the cards 84% and "for" 82%, and fixing one tell by adding words ("a drill for making holes") made the next. A check that reads an attribute the page never writes measures nothing: the label check read `data-s2-want` and passed a "United States" label lying on Mexico; assert the check found something before trusting it. A thought bubble must show know-how, never a tool, a paper or a clock (a tape measure and a recipe card were defensible as tools). A Level Set description under 120 letters gets a family `levelSetShort` in `i18n/skill-sentences.en.json` (never-indexed pages only). The guide sheet prints routine, mistake, words and watch, not the objective: trim those when a sheet runs past its foot. The notes reviewer also reads the guest scripts of the EXISTING points a unit uses: two live scripts were wrong. A changed guest script also changes the packs of every grade that uses the point (four Grade 3 packs here): compare packs with HEAD and build every changed one. `pgrep -fa "[b]ash deploy.sh"` run inside `bash -c` matches its own command line; use `pgrep -f "^bash deploy.sh"`.
- **Batch lessons of 2026-11-25 (social studies Grade 3):** a scene gate that checks each drawing alone cannot see
  what it is drawn IN FRONT of: the baker and cashier stood over the counter on every bakery copy while every gate
  passed. Read people at furniture in the renders, and gate it measured: the person is drawn before the furniture and
  the feet sit no lower than its foot (`s1/s2/s3VerifyInPage`, with a minimum number of people judged per drawing).
  When a defect class turns up in one batch, audit the earlier batches' factories for it (five S1/S2 types had it).
  An in-place republish of a vector drawing fix: `guessfix-compare.js` sees words and image places only, so it calls
  every page unchanged; compare the rendered PDFs pixel by pixel (PyMuPDF) and republish only the pages that differ
  (`C:\Users\rkgen\lcs-stage-d\bakeryfix\pixdiff.py`). A teacher guide shows its lessons' live thumbnails: after a
  republish of a lesson's core page, wait until the edge serves the new thumbnail, then rebuild that unit's guide
  and upload. A sitemap is served from the nginx cache (`patch-nginx-sitemap-cache.py`; header `X-Sitemap-Cache`):
  after an nginx rebuild run it again.
- **Batch lessons of 2026-11-25 (preschool themes, D-4):** a preschool theme lesson is a named lesson on a Kindergarten
  readiness point ("<point>#p-<theme>") that hands out EXACT page addresses (`pages`), never pages chosen by level: a
  themed copy carries its theme in its address, and only an exact address keeps a farm week on farm pictures. Every
  reader of the units must be asked what a theme block is: the curriculum pages would have listed preschool dot-to-dots
  as the lessons of Kindergarten counting lines (a theme block does not teach its point's objective; `curriculum-pages/
  assemble.js` leaves themes out), the homepage and topic pictures would have switched to the preschool guide (the
  default look skips P), build-checks would have tried unit checks. A guide sheet that must also carry five day lines
  overflows: the week-at-a-glance grid holds them. A designer writing from page TITLES gets the picture wrong (the
  reviewer caught dot-to-dots, a kitten called a fox, an oven called a pot): look at every page. Pilot first, read the
  live renders, then open the pages: the pilot read found three layout faults. After a deploy the nginx sitemap cache
  kept new pages out of the sitemap for 30 minutes: deploy.sh now empties it at its end (`a84adcf7e`).
- **Wrong library pictures (2026-11-25):** a picture that shows ANOTHER thing than its word leaves the cache in
  `image-cache/resolve.js` (WRONG_PICTURES), or keeps its place under its right word where the vocabulary has one
  (RENAMED_PICTURES: the space "sky" is a moon); a look-alike (Venus, the squids) stays, as picture-refusals.js treats
  them. Removing a picture can leave a pinned page short of nouns (it cannot be rebuilt) or break a bank that pins it
  ("noun not cached"): prefer the right word when one exists, and drop pinned bank rows and their draft twins.
  `guessfix-regen.js --only-live` renders only the live pages of a pinned wave (proved pixel-identical to a full wave);
  compare the rebuilt PDFs with the live ones pixel by pixel and republish only those that differ (125 of 575 did not).
  `data/` is git-ignored: a bank file needs `git add -f`. To wait for a server chain, watch its log for the chain's
  own done line: `ssh … "pgrep -f chain.sh"` matches the remote shell that carries those words and never reads empty.
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
