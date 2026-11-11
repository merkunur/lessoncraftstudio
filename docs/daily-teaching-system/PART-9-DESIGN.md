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
| A page with no readable marks reports "finished" only | Operator ruling: never an invented number |
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

## 4. What the reporter reads, measured on live decks (2026-11-11)

Run: `node scripts/class-results/tests/reporter-live.js` → 26 decks, no failures; `--poison` fails as it must.

| Page | Result the teacher gets | How it was checked |
|---|---|---|
| Worksheet screens with tap-the-answer (number lines, telling time, number words, cloze, money, fractions, graphs) | right / total and which answers | The robot chose the answers itself, some wrong on purpose; the report matched its own count and marks |
| Type-a-number, colour-by-code, edit-the-sentence screens | right / total and which answers | Compared with the marks the page drew |
| Tap-every-difference, logic grid | right / total | Compared with the page's own score line |
| Mazes (draw the way) | **finished or not, no number** | The page draws no marks and its message is a hint, not a score |
| Type-a-word screens | not played by the robot (same marking code as type-a-number) | Page code read only |
| Old app decks: addition, more / less, word scramble | right / total and which answers | Compared with the ticks and crosses the page drew, counted by colour |
| Old app decks: chart count, find and count, matching, pattern train | right / total | Compared with the page's summary line |
| Old app decks: grid match | finished or not | No marks, no summary numbers |
| Old app decks: crossword, picture sort, sudoku | not played by the robot (drag or grid typing); their code draws readable marks | Page code read only |
| Old app decks: word search | nothing until the page celebrates (no Check button) | Page code read only |

Defects the robot found in my own reporter before anything shipped, each now a standing check: class mode hid the Check bar on old app decks (they use `footer.lcs-footer` for the bar, the newer pages for a credit line); download buttons stayed tappable; the same answers were counted twice (a progress row echoes them); the "is it visible" test failed for fixed-position elements; the button covered the page's own buttons at the end of the page; and number patterns broken by a shell here-document that halves backslashes (write code with the file tools only).

## 5. Still to build in release 1

1. **Maker worksheets** (9.2b): `/s/<linkId>` renders each page in an embedded frame, so the reporter needs an adapter that watches those frames and reports once every screen page has had its first Check. The rules already accept a maker link as an assignment. Until the adapter exists a maker assignment plays but records nothing — it must be finished or switched off before launch.
2. **The class page** `/c/<code>` (9.3): seat grid with pictures, the child's assignments with done / rest / mastered states, the 40 seat pictures opened and checked one by one, middleware carve-out, no-store, noindex.
3. **The workspace "Classes" tab** (9.3): make and edit a class, paste a link to assign, class link + QR, the dashboard by child and by level, delete buttons, a printable class list.
4. **Strings in 11 languages** for all of the above, written natively, one reviewer (9.4).
5. **Retention job** `scripts/class-results/retention.js` + cron, and **class tables left out of dumps kept longer than 35 days** (9.4). `legal/FACTS.md` marks both lines as not yet true.
6. **Privacy page section and pricing copy** in 11 languages, after the lawyer's check (9.4).
7. **Deploy, dark:** apply the migration, copy `lcs-class.js` and the new `lcs-meter.js` with the server's update helper, deploy, verify with a test subscriber, then set the switch only after the legal check.
8. Type-a-word, crossword, picture sort and sudoku pages played by a robot (they are read from code only today).
