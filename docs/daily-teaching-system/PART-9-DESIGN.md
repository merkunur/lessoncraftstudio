# Part 9 — class links and results: design and build record

Master plan: `PLAN.md` (Part 9, rulings in §11). This file is the working record for the build: what exists, how it fits together, what was measured, what is still to do. Read it before touching any file listed here.

## 1. The flow

1. A teacher with a usable Teacher plan makes a **class** in the workspace: a name, and seats. A seat = number + animal picture + (in a names class) a first name or nickname. A class can be numbers-only: then no name is stored.
2. The teacher **assigns** pages by pasting their address: an interactive deck, a Level Set, a worksheet landing page, a deck share link, or their own maker student link.
3. The teacher shows the **class link** `/c/<code>` (10 random characters) or its QR code.
4. A child opens it, taps their seat, taps an assignment. The server mints an **attempt** and sends the child to the page with the attempt token after `#` (`…/decks/<slug>/#lcs=<20 chars>`).
5. On that page `lcs-meter.js` sees the token, sends it with the play check (a live class is not metered) and loads `lcs-class.js`. The reporter hides the page furniture, waits for the child to press the worksheet's own Check, reads what the page shows and posts it. The reply says where the child goes next; the reporter shows one big picture button (arrow = next page of a Level Set, house = back to the class page).
6. The teacher reads the **dashboard**: per child and assignment the first Check; for a Level Set the child's standing per level.

Nothing is collected from a page opened without a token.

## 2. Decisions made in the build (under the operator's delegation), with reasons

| Decision | Reason |
|---|---|
| The token rides after `#`, not as a query parameter | The fragment is never sent to a server: no new URL variants in logs or caches, nothing for a crawler to find, the deck page's bytes and cache key are unchanged |
| The reporter is a separate file loaded only when a token is present | Ordinary visitors download nothing new; the shared script every deck already loads changes by a dozen lines; **no deck file is rewritten** |
| The reporter reads the page's own marks and never grades | Old decks cannot be changed (app decks are never regenerated); what the teacher sees is what the child saw |
| A page with no readable marks reports "played", then "finished" | Operator ruling: never an invented number |
| First Check = the result; later Checks only count | "Got it right the first time" is what a teacher wants to know; corrections after seeing red marks are not the same fact |
| A Level Set follows the printed class sheet's five sentences exactly (`nextLevel`, `bandOf`) | One rule on paper and on screen. Bands: almost all right = no errors, or one error from five answers up, or ≥ 85 %; several wrong = two or more errors and under 60 % |
| Three pages per sitting (six hours), then "done for now" | Young children; and a set's pages last longer |
| The class page works only while the teacher's plan is usable; otherwise it says "ask your teacher" and stores nothing | No child data without a paying, contract-bound teacher (the reason there is no free trial class) |
| Reading and deleting never need a subscription; making and assigning do | A lapsed teacher must always be able to see and remove what is stored |
| Switching a class to numbers-only erases the names | It is the privacy switch, not a display option |
| At most three words and 24 characters in a display name; no `@`, no digits-only | First names with two words are ordinary in es, pt, fr, it; an e-mail or a pasted roster line is refused |
| Caps: 20 classes per teacher, 40 seats, 60 assignments, 80 attempts per child and assignment | Bounded storage and abuse limits |
| Everything is behind `CLASS_RESULTS_ENABLED=1` (server env) | Dark deploy before the lawyer's check |

## 3. Files

| File | What |
|---|---|
| `frontend/prisma/schema.prisma` — `Classroom`, `ClassSeat`, `ClassAssignment`, `ClassAttempt` | The four tables; everything cascades from the class |
| `frontend/prisma/migrations/20271111000000_add_class_results/migration.sql` | Additive migration. **Not applied on the server yet** |
| `frontend/lib/class-results/store.ts` | The rules: pure, no database import (the makers' pattern) |
| `frontend/lib/class-results/db.ts` | Prisma implementation + catalogue lookups (deck, Level Set, landing, share link, maker link) |
| `frontend/lib/class-results/http.ts` | The switch, the caller, the reply |
| `frontend/app/api/classes/**` (7 routes) | Teacher API |
| `frontend/app/api/class/**` (4 routes) | Child API: class page, seat page, start, report |
| `frontend/app/api/quota/check-and-increment/route.ts` | A play with a live class token is not metered |
| `scripts/class-results/web/lcs-class.js` | The reporter (working copy; deploy step copies it beside `lcs-meter.js`) |
| `scripts/class-results/web/lcs-meter.js` | Working copy of the shared script with the token hook. `REFERENCE TRANSLATIONS/lcs-meter.js` is updated only after deploy (that folder's own rule) |
| `scripts/class-results/tests/class-store.test.js` | 143 checks over an in-memory database; every refusal has a passing twin |
| `scripts/class-results/tests/mutate-class-store.js` | 36 planted faults, each must fail the suite |
| `scripts/class-results/tests/reporter-live.js` | A robot that plays 26 real published decks with the local scripts swapped in and the API mocked; `--poison` |
| `docs/daily-teaching-system/legal/` | Drafts for the lawyer: facts sheet, privacy section, school agreement, parent note |
| `frontend/lib/class-results/child-page.ts`, `child-strings.ts`, `app/c/[code]/route.ts` | The children's class page `/c/<code>` and its words ×11 |
| `frontend/lib/class-results/teacher-app.ts`, `teacher-strings.ts`, `messages/classes/<loc>.json`, `app/[locale]/workspace/classes/` | The teacher screen and its words ×11 |
| `scripts/makers/play/ssr.js` (`CLASS_LOADER`), `app/s/[id]/route.ts` | The one-line loader on a maker student page, only while the switch is on |
| `scripts/class-results/retention.js`, `strip-class-data.js` | The daily deletion job; class rows out of old database copies on the PC |
| `scripts/class-results/dev-server.js`, `mem-db.js` | The local preview: the real rules over an in-memory database |
| `scripts/class-results/live-db-check.js`, `tests/live-dark.js` | The two checks that run against the server |
| `scripts/class-results/tests/all.js` | Every local check in order (§7) |

## 4. What the reporter reads, measured on live decks (2026-11-11)

Run: `node scripts/class-results/tests/reporter-live.js` → 26 decks, no failures; `--poison` fails as it must.

| Page | Result the teacher gets | How it was checked |
|---|---|---|
| Worksheet screens with tap-the-answer (number lines, telling time, number words, cloze, money, fractions, graphs) | right / total and which answers | The robot chose the answers itself, some wrong on purpose; the report matched its own count and marks |
| Type-a-number, colour-by-code, edit-the-sentence screens | right / total and which answers | Compared with the marks the page drew |
| Tap-every-difference, logic grid | right / total | Compared with the page's own score line |
| Mazes (draw the way) | **played / finished, no number** | The page draws no marks and its message is a hint, not a score |
| A teacher's own maker worksheet (`/s/<linkId>`), several pages | one result: the sum of the pages' first Checks | `reporter-maker.js`: the robot answered page 1 right and crossed two pairs on page 3; the report matched its own count |
| Type-a-word screens | not played by the robot (same marking code as type-a-number) | Page code read only |
| Old app decks: addition, more / less, word scramble | right / total and which answers | Compared with the ticks and crosses the page drew, counted by colour |
| Old app decks: chart count, find and count, matching, pattern train | right / total | Compared with the page's summary line |
| Old app decks: grid match | finished or not | No marks, no summary numbers |
| Old app decks: crossword, picture sort, sudoku | not played by the robot (drag or grid typing); their code draws readable marks | Page code read only |
| Old app decks: word search | nothing until the page celebrates (no Check button) | Page code read only |

Defects the robot found in my own reporter before anything shipped, each now a standing check: class mode hid the Check bar on old app decks (they use `footer.lcs-footer` for the bar, the newer pages for a credit line); download buttons stayed tappable; the same answers were counted twice (a progress row echoes them); the "is it visible" test failed for fixed-position elements; the button covered the page's own buttons at the end of the page; and number patterns broken by a shell here-document that halves backslashes (write code with the file tools only).

## 5. What release 1 added after the first commit (2026-11-11)

**Maker worksheets (9.2b).** `/s/<linkId>` shows each page of a teacher's own worksheet in an embedded frame. The reporter reads a worksheet through a page context, so the same code reads a deck page and each frame. It reports **once**, when every page that has a screen version has had its first Check: the sum of those first Checks (per-answer marks only when every page gave them). Between pages the button is the arrow to the next unchecked page; a page made for paper is not waited for; a worksheet with no screen page shows the way back at once and reports nothing. The `/s/` route adds a one-line loader (`ssr.js` `CLASS_LOADER`) only while the switch is on; the bytes are the same for every visitor.

**"Played" (rule change).** A page with no marks to read (a maze, grid match) now reports its Check as `{ finished: false }` and later `{ finished: true }`. Before, nothing was stored until the page was finished, so a teacher could not tell "tried" from "never opened". Still never a number.

**The children's class page (9.3)** — `frontend/lib/class-results/child-page.ts`, served by `app/c/[code]/route.ts`. One static document for every class; it reads its code from its own address. Decisions:

| Decision | Reason |
|---|---|
| No third party at all: fonts and pictures from this site, no analytics script | A page children open should call nobody else |
| `Referrer-Policy: no-referrer` (header and meta) | The class code must not travel to the worksheet page's logs as "where the visitor came from" |
| The tab remembers the tapped seat for 20 minutes, in `sessionStorage` only | A child comes back from a worksheet to their own list; the next child on a shared tablet does not inherit it |
| Marks are start · done · done for today; "finished the set" uses the same mark as done | No score, no star, no ranking on a child's screen |
| The button back to the pictures says "Not me" | Reviewer: a five-year-old says this, not "someone else" |
| Names are written with `textContent` | A teacher's text is never parsed as markup |

**The teacher screen (9.3)** — `frontend/lib/class-results/teacher-app.ts`, a framework-free DOM module mounted by `app/[locale]/workspace/classes/` (its own page, not a workspace tab: a teacher whose plan has ended must still reach it, and the workspace is behind the subscriber gate). The workspace links to it only while the switch is on. Screens: the class list; a new class (names or numbers only); Results (by child, and for a Level Set by level; a child's row opens the sentence view "Level 2: passed (5 of 5) · Level 3: found it hard (2 of 6) · Now on Level 2"); Children (rename, change picture, add, remove, print the class list); Worksheets (paste an address, hide, remove); Class link (copy, QR code, new link, rename, language, numbers-only switch, delete class). Every removal asks once more in place. Without a plan and without a class: the plan card and an **example dashboard with made-up children** (no trial class). The list reply carries `canEdit`, so the screen shows what the server will allow, not what the page assumed.

**Why framework-free:** the same module runs in the website and in the local preview over an in-memory database, where a robot plays it. There is no local Postgres on the PC, so a React-only screen could not have been tested before it shipped.

**Retention (9.4).** `scripts/class-results/retention.js` (daily, `--apply`): a class unused for 427 days, or whose teacher's plan ended more than 60 days ago, is deleted with everything under it; attempts never checked go after 7 days. It prints counts only. Its plain-JS rule is compared with the website's own (`store.ts` + `entitlements.ts`) over 492 cases in `tests/retention.test.js`. `scripts/class-results/strip-class-data.js` takes class rows out of every database copy on the PC older than 28 days, weekly (called by `pull-deck-backup.sh`): no copy older than 35 days holds class data.

## 6. The texts and their review (rule #2)

156 texts × 11 languages: 135 teacher screen (`frontend/messages/classes/<loc>.json`), 19 class page (`child-strings.ts`), 2 reporter labels. Written natively by the build session, then read on 2026-11-11 by **two native reviewers** (de fr es pt it + the English source; nl sv da no fi + the English source) over a compact dump (`node scripts/class-results/tests/strings.js --dump`). About 110 findings, all applied (140 texts changed). The ones that change how the next texts are written:

- **The English source was wrong in six places and every language had copied it:** "You see who got a page right" (the screen shows a count, not right/wrong); a privacy sentence that said "only X … plus Y"; "Each result is the first time…" (a result is not a time); "Some wrong / Several wrong" (two bands nobody can tell apart; now "Some wrong / Many wrong"); "your children" (reads as a parent's own); British "marks", "go on".
- A status word describes the level, not the child: "found it hard", fr "a eu du mal", it "ha fatto fatica" — not "en difficulté" / "in difficoltà", which are institutional labels for a child.
- French agreement follows the noun the label stands for (fiche, page → Terminée, Essayée); "Nom" on a French form means surname.
- Mexico: "regresar", "configuración", “ ” not « », "1° B"; Brazil: "QR Code", "Terminada" (not "Pronta", which also means "ready").
- Finnish: the teacher screen says "tehtäväarkki" (the site's word); the child page keeps the shorter "tehtävä"; a limit is "voi olla", a rule "saa olla".
- Scandinavian: "who got a page right" was a calque in sv, da and no.
- Observation, not changed here: the worksheets' own button label in Spanish, "Comprobar respuestas", is peninsular (Mexico: "Revisar respuestas"). It is the worksheet runtime's string; the class texts quote it as it is.

Gate: `tests/strings.js` (same keys and placeholders in 11 languages, no empty text, no text left in English, no "free" claim) and `tests/teacher-app.js` (every key the screen asks for exists in `en.json`; no key is unused).

## 7. Checks

`node scripts/class-results/tests/all.js` (about two minutes; `--live` adds the 26 published decks; `--quick` skips the browser):

| Check | What it proves |
|---|---|
| `class-store.test.js` — 150 | The rules over an in-memory database, every refusal with a passing twin |
| `mutate-class-store.js` — 37 of 37 | Each planted fault fails the suite |
| `retention.test.js` — 23 | The job's rule = the website's rule; what is deleted; the log holds counts only; the backup step leaves every other line byte-identical |
| `strings.js` | The texts, 11 languages |
| `seat-icons-sheet.js` | The 40 pictures |
| `reporter-maker.js` (+ poison) | A three-page maker worksheet: one report, the sum of two first Checks, as the robot answered |
| `class-page.js` (+ poison) | The class page at 360 / 768 / 1024; a real Level Set walked by taps on live pages (core → harder → finished; three pages → "done for today" → open again seven hours later); numbers-only; closed link; unknown link |
| `teacher-app.js` (+ poison) | A teacher's whole path by clicks; the dashboard compared with what was played through the rules; lapsed, no plan, signed out; 390 px |
| `reporter-live.js` (+ poison) | 26 published decks, read only |
| `live-db-check.js` (on the server) | The Prisma layer and the catalogue lookups against real Postgres, as one throwaway class that is deleted again |

The local preview: `node scripts/class-results/dev-server.js --seed` → http://localhost:8495/teacher (the real rules over an in-memory database; a maker student link plays locally; a published deck is fetched read-only from the live site with the local scripts swapped in).

Defects the robots and my own reading found before anything shipped: every picture chooser on the Children tab was open at once (a `hidden` attribute lost to `display:flex`; found reading the screenshot, the robot had passed it); a pairing page marks the line it draws as well as the two ends, so eight marks for four answers (the reporter now trusts the page's own count and reads the buttons only); the Copy button did nothing in a browser without clipboard permission (now falls back to copying the selected address); and my own test fixture listed a Level Set's print-only first page as playable (the production lookup never did: see §8).

## 8. Deploy state (2026-11-11): on the server, switched off

| Step | State | Proof |
|---|---|---|
| Code deployed (commit `0a80dca09`) | Done | `deploy.sh` exit 0; smoke tests passed; payment canary OK |
| Migration `20271111000000_add_class_results` | Applied | four tables, five foreign keys, all `ON DELETE CASCADE`; `prisma migrate status` listed this one migration and no other as pending |
| `lcs-class.js` (new) and `lcs-meter.js` (updated) | In place through `update-worksheet.sh` | md5 on the server = the working copies; before the copy the live deck script was byte-identical to `REFERENCE TRANSLATIONS/lcs-meter.js`, and the working copy differed from it by the class hook only |
| The Prisma layer and the catalogue lookups | Checked against real Postgres | `live-db-check.js`: 24 of 24; the throwaway class was deleted and the four tables held 0 rows before and after |
| Retention job | Scheduled daily 04:20 (server time) in root's crontab; log `/var/log/lcs-class-retention.log` (one line a day, counts only) | dry run and `--apply` both ran with the exact cron command line: 0 classes |
| Switched off | `CLASS_RESULTS_ENABLED` is not set | `tests/live-dark.js`: all 11 class routes answer 404, the workspace does not mention the screen, an ordinary deck visit requests no reporter and its play check carries no token |
| Old pages unchanged | — | `identity-snapshot.js --compare` before and after the deploy: 287 pages and 11 shards unchanged |

**The screen lookup: what was claimed, what was measured.** Commit `cc0b953a4` changed the lookup "can this page be played on screen" to read the published page itself (`db.ts` `pageHasScreen`: its Check button or its celebration) instead of the site's hand-kept list, and said the old lookup would have handed the print-only page `/en/decks/number-lines-g1116/` to a child. **That example was wrong**: I had seen the page in my own test fixture and blamed the rule without running it; the rule refuses that page.

Then every published page was measured (172,996 pages, `docs/daily-teaching-system/graph/FINDINGS.md` §2). The rule and the page agree on all but **143 pages**: the rhyming-words face `g1346` (print-only, open answers) on pages whose address carries a word-family after the type code, 13 in each language. The site's code reader does not read such an address, so the rule calls those pages playable. A teacher who pasted one of them as a single worksheet would have been allowed to assign it by the old lookup. **So the change repairs a real hole of 143 pages; the page named in the commit message was never one of them.**

`pageHasScreen` is committed and not yet on the server. **It should be live before the switch is set** (launch checklist step 3); until then the deployed lookup has that hole, which nobody can reach while the switch is off.

`tests/live-dark.js` step 5 (a made-up token while switched off) was skipped on the first run because the edge still served the previous deck script (cache up to four hours); run it once more after that.

Rollback, should it ever be needed: the reporter does nothing without a class token; to remove it anyway, put back the previous deck script (git history of `REFERENCE TRANSLATIONS/lcs-meter.js`) with `update-worksheet.sh`. The four tables are empty and can stay.

## 9. Launch checklist (the operator's go; nothing here is done yet)

1. **Legal:** the data-protection lawyer has answered the eight questions in `legal/README.md` and approved or changed the three texts. The data-centre country is confirmed from the Hetzner account (the server's first network hop is `dc1.hel1.hetzner.com`, which is Hetzner's Helsinki site in Finland; that is evidence, not the contract). Company name, address and privacy contact are filled in.
2. **Texts:** the privacy section is translated natively into the ten other languages and reviewed; the pricing page and the Teacher plan's feature list name class links (no page says "free"). **The sentence "We collect no student data at all" (`pricingPage.faq.a4`, eleven languages) is true only while the switch is off: it is rewritten in the same deploy that sets the switch** (a class with names stores a first name, a seat number and results; a numbers-only class stores a seat number and results), and every other page is searched for the same claim before the switch (found 2026-11-11 while writing the schools page).
3. **A deploy that contains `pageHasScreen`** (any deploy after commit `cc0b953a4`), then `node scripts/class-results/tests/all.js --live`.
4. **Switch on:** add `CLASS_RESULTS_ENABLED=1` to `frontend/.env.production` on the server and reload the app (`deploy.sh` copies the file into each release).
5. **Live walk with the operator's own subscriber account:** make a class (numbers only), add a Level Set, a single page and a maker student link; open the class link on a tablet; play each; read the dashboard; delete the class. Then `tests/live-dark.js` must FAIL at step 1 (it proves the switch is really on).
6. **First week:** read `/var/log/lcs-class-retention.log` once; after the first Sunday backup pull, read its "class data:" lines.

## 10. Not in release 1 (release 2, after Parts 1 and 2)

Activities reporting through the shared shell (built 2026-11-11, §11); the skill view (results by teaching point and by national objective, from the content graph); "what to practise next"; a robot for type-a-word, crossword, picture sort and sudoku pages (their marks are read from code only today).

## 11. Release 2, step 9.5: an activity as an assignment (built 2026-11-11, behind the same switch)

**What a teacher does.** She pastes an activity's address (`/<language>/activities/<slug>`) where she pastes a worksheet's. The class page lists it like any other assignment; a child taps it and plays.

**What the child sees.** The activity fills the screen (the site's header, footer and every link out are covered). After seven solved tasks one round button with a house appears UNDER the activity and leads back to the class page. No score, streak, timer or ranking.

**What is stored.** One sitting = seven solved tasks = one report, through the same `/api/class/report` and the same rules as a worksheet (the first report of an attempt is its result). A child who stops before the seventh task leaves no result: the sheet shows "started", never a partial number. No new table and no migration (`kind` is a text column; `content` holds `{ kind: 'activity', locale, slug, activity }`, the address and the id of the activity in the manifests).

**The finding that changed the design.** The plan said "an emitter in the activity shell". The shell already has one (`window.LCS_TRACK(event, payload)`, called on every press of its Check), so no line of the shell or of any activity changes. But measured over the 203 activities: **in 167 the activity judges a try itself**, keeps a wrong try to itself and presses the shell's Check only once the task is solved. The shell hears "right" for every task; marks read from it would be 7 of 7 for every child. Only 36 activities let the shell judge every Check.

**The rule (`frontend/components/activities/ActivityClassMode.tsx`): a mark is never invented.** A solved task counts toward marks only when its tries are known:
- **the shell judged it:** every Check the shell heard was a real press by the child (a click the browser marks as trusted; a press the activity made itself is not), so each wrong try was heard; or
- **the activity said so itself — the contract for an activity that judges its own tries:** it calls `api.track('task:try', { ok })` on every try, right or wrong, before it presses the shell's Check.

One task with unknown tries makes the whole sitting **"Finished" with no number** (the sheet's existing chip for a page that is not scored). So today: 36 activities give marks (the seven first tries), 167 give "Finished". **Part 10 follow-up, decided:** every new activity follows the contract from its first day (two lines at its own Check), and the 167 are retrofitted when each is next touched; each activity already counts its misses in its own state.

**Files.** `components/activities/ActivityClassMode.tsx` (class mode, the listener, the one report, the back button) · `lib/class-results/back-label.ts` (the button's label ×11, the same texts as the worksheet reporter's) · `app/[locale]/activities/[slug]/page.tsx` mounts it only while `CLASS_RESULTS_ENABLED=1` · `lib/class-results/store.ts` (`activity` kind: link parsing, the play address, the assignment, "the same thing twice") · `db.ts` `resolveActivity` (the lookup the activity page itself uses) · `lib/client-meter.ts` sends the class token with the play check, so a class of thirty on six tablets does not meet the per-device wall (the server ignores any token that is not a live class's) · one new teacher text `kindActivity` ×11 (in the next native review, with step 9.6's texts).

**Checks.** Rules: 172 checks, 42 planted faults all caught (five new: a longer path taken for an activity, a missing activity assigned anyway, an activity opened as a worksheet page, two activities taken for one, the id forgotten). Robot `scripts/class-results/tests/activity-class.js` on the local class preview, which now serves activity pages with the REAL class mode over the local activities: **A** Block Towers (the shell judges): seven tasks by real taps, two wrong first → 5 of 7 with the marks 1 0 1 1 0 1 1, one report, the back button under the activity and in view, the class page's mark, the teacher's sheet; **B** Build an Array (the activity judges): one task wrong first → "finished", no number; **C** the same activity following the contract → 6 of 7; an activity page with no token, or a malformed one, is the ordinary page. Poisoned (the rule taken out): B fails with 7 of 7, as it must. My own reading: the phone and tablet renders (the first version of the back button floated over the activity and covered its message at phone width; it now sits in the page's flow).

**Not verified:** the activity page as Next renders it with the switch on (the robot uses the same component over a reduced page; the switch is off on the server and stays off until the launch checklist of §9).

## 12. Release 2, step 9.6: results by curriculum, the next step, paper (built 2026-11-11, behind the same switch)

**What a teacher sees.** A second tab on the class screen, "By curriculum". The class's work stands under the headings of the country's own curriculum; under each heading, who had many wrong, who had some wrong, how many were almost all right, how many only played a page that is not scored, how many have not played. Where a child had some or many wrong, the next step is one press or one link.

**A heading is what the curriculum registry allows a page to show** (`scripts/curricula/show.js`, Part 2): the document's short name, the objective's own official code or the plan's own number, and the titles of the parts it stands under. Never an id the registry invented, never the objective's wording. So a US teacher reads "Common Core 1.OA.C.5 · Operations and Algebraic Thinking", a Texan "TEKS 1.3.D", a Swedish teacher "Lgr22 · Taluppfattning och tals användning". A teaching point the curriculum names no objective for at these grades stands under the national domain name of its strand, with the line "Not named in this curriculum for these grades".

**Which curriculum.** Every registry of the class's language, the country's own first: `en` Common Core then Texas; `de` KMK then Bavaria, North Rhine-Westphalia, Saxony; one each for the other nine. The teacher's choice is kept on her device (no new column).

**How a result is placed.** `scripts/class-results/build-skill-index.js` builds one file per registry (`frontend/content/class-skills/<registry>.json`, 78 to 95 KB, 15 files) from the content graph and the registry: page type code → teaching point → the point's FIRST crosswalk row with the relation "teaches" → heading. A row that only prepares for or extends an objective never makes a heading. An activity that practises several points stands under the earliest. A teacher's own maker worksheet, a page of the 29 retired apps (no type code) and the 38 activities no teaching point names are listed under "Not placed under a heading" and never guessed.

**What counts for a child under a heading** (`classSkills` in `store.ts`): the most recent result among the work under it. A single page or an activity counts by its FIRST play (the same page played again is not new evidence); a Level Set by the LAST page played, and a finished set as almost all right.

**The next step is offered only for what exists and is missing:** the Level Set of the teaching point (looked up again at that moment: it must have screen pages in the class's language) unless the class has it; an activity of the point that is live in that language and that the class does not have; the classroom tool that models the point; the unit lesson on the point (English pilots today). Nothing is offered for a heading where nobody had anything wrong, and nothing is invented where the graph holds nothing.

**Paper.** Two buttons open the browser's print window (which also saves a PDF; no new dependency): the class overview, and one page per child for a talk with parents: the child's headings with one word each (almost all right, some wrong, many wrong, played, not played yet) and one sentence that it is a sign among many, not a grade. A child's page names no other child; a child with no result gets no page.

**Files.** `scripts/class-results/build-skill-index.js` (+ `--check`, a warning in `deploy.sh` until the switch) · `frontend/content/class-skills/*.json` (generated) · `lib/class-results/skill-index.ts` (loads one registry when the view is opened) · `store.ts` `classSkills`, `pointOfAssignment` · `app/api/classes/[id]/skills/route.ts` (behind the switch like every class route; `tests/live-dark.js` now probes 12 routes) · `teacher-app.ts` (the tab, the print pages) · 22 new teacher texts and one changed (`workHelp` names an activity) ×11.

**Checks.** Rules: 207 checks, 55 planted faults all caught (13 new for this step: another teacher reads the view, an index of another language, any text passed on as a curriculum key, the earliest result counting, a single page by its last play, a Level Set by its first page, a step offered when nobody had anything wrong, a Level Set or an activity the class has offered again, an activity that is not live offered, a page with no type code placed under a heading, headings out of teaching order, "only played" counted as almost all right). The index: `--check` (poisoned once by hand: one type moved to another point → STALE). The teacher screen robot plays the seeded class through the real loader and the real index: the headings, who stands where, the next step by one press, the two print documents (Max's page names no other child), Texas, the remembered choice, phone width; poisoned (the wrong children listed under a result) it fails, as it must. My own reading: the tab at 1280 and 390.

**The texts and their review (rule #2).** 22 new teacher texts, the changed `workHelp` and `kindActivity`, written natively in the eleven languages (en American, es Mexican, pt Brazilian), then read by ONE reviewer acting as a native primary teacher per language over a compact dump with each text's place on the screen (all 24 keys × 11 read; the reviewer named sv, da, no, fi as the languages where its own wording is weakest). **66 texts corrected at the source.** What the review changed beyond wording:
- **The word for the thing itself is the country's, not a translation of "curriculum".** en: a US teacher calls Common Core and TEKS "standards" ("curriculum" is the adopted program), so the tab is "By standard". pt: "Pela BNCC". it: "Indicazioni nazionali" ("curricolo" is what each school writes for itself). nl: "Volgens de kerndoelen". da: "Fælles Mål" everywhere ("læseplan" is a different document). sv, no: the definite form ("Enligt läroplanen", "Etter læreplanen"). fi: "OPSin mukaan".
- **A name in a title must survive every name.** fr "Ce que {name} a travaillé" breaks before a vowel ("Ce qu'Anna"); the title is now "{name} : ce qui a été travaillé". it "Al {date}" breaks before 1, 8 and 11 ("All'11"); now "Aggiornamento: {date}".
- **The parents' sentence.** de "wie der erste Versuch gelang" presupposed success; it "indizio" sounds like evidence; sv and da children of this age get no grades, so "not a grade" became "no judgment of your child"; the literal "one sign among many" was replaced by each language's own word.
- **A result word agrees with its neighbour** (fr "Pas encore faite", sv "Inte gjord än", beside "Faite" and "Gjord").
- **Two decisions that are mine, not the reviewer's.** de and fi: the reviewer found "Aufgabe" and "Tehtävä" ambiguous for an activity (each also means one task on a worksheet) and proposed "Interaktive Übung" and "Harjoitus". The site's own activity pages say "Aufgaben" and "tehtävät", so the label is now "Interaktive Aufgabe" and "Interaktiivinen tehtävä": the site's word, made unambiguous. The print hint: the reviewer proposed quoting the browser's "Save as PDF" label; the label differs by browser, so no label is quoted in any language.
- **French spacing:** the whole French file now uses a non-breaking space inside « » and before : ; ! ? (32 places; the release 1 texts had ordinary spaces, which can break a line there).
- In English the tab is therefore called "By standard"; this record keeps "by curriculum" as the name of the view.

## 13. The legal decision of 2026-11-14 and its thirteen conditions (the switch stays off until all are done)

The operator delegated the legal check to an AI legal agent (not a licensed lawyer). Its decision is `legal/DECISION-2026-11-14.md`: **as built NO-GO; GO for numbers-only classes, in every language and country, after the conditions E1 to E13.** First-name classes stay off for everyone at launch. This section is the build list; it replaces step 1 of the launch checklist in section 9.

| | Condition | State |
|---|---|---|
| E1 | Numbers only, enforced by the server; first names need the server switch `CLASS_NAMES_ENABLED` AND the teacher's own permission | **built 2026-11-14.** `Caller.names` (store.ts); a class is made as a numbers class whatever is sent, cannot be switched to names, no seat takes a name (`names_off`, 403); `http.ts` gives nobody the permission (no acceptance record exists yet); the teacher screen offers the choice only when the server says so and starts on numbers. 223 rule checks, 60 of 60 planted faults caught, the robot plays a teacher with and without the permission. |
| E2 | The teacher's one-time confirmation before her first class, stored (a new small table) | **built 2026-11-14** (commit `4e414b04c`): table `class_teacher_confirmations` (migration `20271114000000_add_class_teacher_confirmations`, **not yet applied on the server: `npx prisma migrate deploy` after the next deploy, before the switch**); `CONFIRM_VERSION` in store.ts; no class without the confirmation of today's text (`confirm_first`); the tick in the new-class form with links to `/<locale>/privacy#classes` and `/<locale>/class-terms` (**both targets are made with E7**). 232 rule checks, 63 of 63 planted faults, the robot plays a teacher who has not confirmed. The wording in the ten other languages is mine and waits for E7's native reader. |
| E3 | No request to another company, no analytics, no ad tag on any page a child reaches through a class link | open, the largest piece: fonts from this site on deck pages (about 200,000 published), maker play pages and the activity shell; the beacon and the ad tag silent when the address carries `#lcs=`; a robot that records every request. Facts read on the server 2026-11-14: no Pinterest tag id and no other tag is set in production; the analytics is the site's own Umami. |
| E4 | nginx: `/c/` and `/api/class/` logged without address and browser name; the general log lives 14 days at most | **script written 2026-11-14** (`scripts/class-results/patch-nginx-class-logs.py`): a log format with time, method, the path cut to its first part, status, size and duration; two locations with the request limit of the play endpoint (thirty tablets share one address); it refuses to run when the general log keeps more than 14 daily files. **Install on the server after a deploy, then read one class request in the log.** |
| E5 | No result older than 427 days, whatever the class's last use | **built 2026-11-14** (`retention.js` `RESULT_MAX_DAYS`; 25 checks; poisoned twice). |
| E6 | The play check of a class visit carries no cookie | **built 2026-11-14**: with a class token the check is sent with `credentials: 'omit'` and no sign-in header (`build-lcs-meter.js`, `client-meter.ts`); the browser test reads what the script hands to fetch, poisoned once. **The served `lcs-meter.js` is replaced on the server with `update-worksheet.sh` at the next deploy.** |
| E7 | The corrected texts in eleven languages, natively written and read; the pricing answer a4 replaced in the same deploy; FACTS.md corrected | open. One native reviewer over all eleven. |
| E8 | Class rows never leave the server in a backup, or the owner confirms the backup computer | **built 2026-11-14**: the weekly pull fetches a copy the SERVER made without the rows of the four tables (`strip-class-data.js --all` in a folder of its own; the server's own dump unchanged; tried on the newest real dump: same line count, 0 class rows today). `--days=0` used to fall back to 28 silently and is refused now. |
| E9 | A privacy link at the foot of the children's class page | open (small). |
| E10 | A written rule: no person, script or AI session reads class rows | **written 2026-11-14**: `docs/ops/server-access.md`, "Class data — nobody reads the rows". Scripts print counts only; a fault is reproduced on the local preview with made-up children. |
| E11 | "Do not put a child's name here." under the class-name field, eleven languages | **built 2026-11-14** (`formNameHelp`); the ten other languages wait for E7's native reader. |
| E12 | Company details in the texts; the hosting data-processing agreement concluded | **operator named 2026-11-14**: no company; the owner as a private person, with the postal address he gave for publication (it stands on the live privacy page since commit `6032492bc`); contact = the support address (the three other mailboxes reached nobody and were replaced on the privacy, terms and license pages). Data centre: HEL1-DC6 (Helsinki, Finland). **Still open: the hosting data-processing agreement** (the owner had the form open on 2026-11-14 and was told what to tick; he reports the date when it is concluded). |
| E13 | A deploy that contains `pageHasScreen` | done (every deploy since commit `cc0b953a4`). |

**Order of the rest:** E6, E9, E10, E8 (small, no texts) → E2 (table, endpoint, screen) → E3 (fonts, beacon, the request robot) → E4 (nginx) → E7 + E11 (texts ×11, one native reviewer) → E12 from the owner's answers → the launch walk of section 9.

**The owner's answers of 2026-11-14 (decision section F):** there is no company yet; the owner lives in Sweden (established in the EU: no EU representative needed); the privacy contact is the support address (`support@lessoncraftstudio.com`; the live privacy page names `privacy@`, `dataprotection@` and `legal@`, asked whether they arrive); the hosting data-processing agreement is not known to be concluded (steps given: accounts.hetzner.com, the DPA entry; the data centre from the server list); Cloudflare Pro with custom security rules only; the backup computer is in Sweden with no cloud synchronisation (no longer a condition: class rows stay on the server since E8); nobody but the owner and Claude Code sessions can read the production database (the rule of E10 covers them); no school or district has asked for a signed agreement. Read on the server the same day: no Pinterest tag id and no other third-party tag is set in production; the analytics is the site's own Umami; nginx keeps 14 daily logs.
