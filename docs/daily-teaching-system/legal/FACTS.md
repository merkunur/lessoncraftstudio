# Class links and results — the facts, checked against the code

Written 2026-11-11 for the lawyer's check. Each statement names where it is enforced. If a later change makes a line here untrue, this file and the legal texts are corrected before the change ships.

## What exists only when a teacher makes it

- A teacher with a paid plan makes a **class**, gives it a name and adds **seats**. A seat is a number, a picture of an animal and, if the teacher types one, a **display name** (a first name or a nickname, at most 24 characters). `frontend/prisma/schema.prisma` models `Classroom`, `ClassSeat`.
- The teacher **assigns** worksheets from the site to the class and gets one **class link**.
- A child opens the class link, taps their own seat and plays a worksheet. When the child presses the worksheet's Check button, the page sends **how many answers were right, how many there were, and which were right** (as a list of 1 and 0). Model `ClassAttempt`; rules in `frontend/lib/class-results/store.ts` (`report`, `cleanReport`).

## What is stored about a child, in full

| Data | Stored | Where it comes from |
|---|---|---|
| Display name (first name or nickname) | Yes, if the teacher typed one. Never in a "numbers only" class | The teacher |
| Seat number and animal picture | Yes | Assigned automatically |
| Per worksheet: answers right, answers asked, which were right, how many times Check was pressed, whether the page was finished, the date and time | Yes | The worksheet page, when the child presses Check |
| For a Level Set: which level each page was (easy, core, hard) | Yes | The site |

## What is not stored, because there is no field for it

Surname · date of birth or age · gender · email address · photograph · home or school address · IP address · device or browser identification · location · what the child typed or drew (only right or wrong) · how long the child took · anything about a child who uses the site without a class link.

- The reporting request carries **no cookie** and reads none (`credentials: 'omit'` in `scripts/class-results/web/lcs-class.js`). The same holds for every request the class page makes.
- A page that shows no marks (a maze, for example) reports only "Check was pressed" and, later, "finished": no number is invented. A worksheet a teacher made with several pages reports once, the sum of its pages.
- The class page (`frontend/lib/class-results/child-page.ts`) loads nothing from another company: its fonts and pictures come from this site and it carries no analytics script. It is served with `Referrer-Policy: no-referrer`, so the class link is not passed on to the worksheet page as "where the visitor came from".
- So that a child returns from a worksheet to their own list, the browser tab remembers which seat was tapped — on the device only (`sessionStorage`), for 20 minutes, and it is never sent anywhere.
- The result is linked to a seat by a random one-time token that the class page puts in the worksheet's address after `#`. The part after `#` is not sent to any server by the browser and does not appear in server logs.
- The web server keeps ordinary access logs (IP address, time, address requested) for security, as for every visitor to the site. Those logs are not linked to seats or results.

## What a child sees

The class page shows the class's seats (picture, number and, in a names class, the display names of **all** children in the class) so the child can find their own. Anyone who has the class link can see that list. The link contains a random 10-character key; the teacher can replace it at any time, which stops the old one. A child never sees a score list, a ranking, a timer or another child's results.

## Who can see results

Only the teacher who owns the class, signed in to their account (`own()` in `store.ts`: every teacher route checks the class belongs to the caller). No other teacher, no parent portal, no public page.

## Deletion

- The teacher can delete one child's results, one child, one assignment or the whole class at any time. This works even after the paid plan has ended (`deleteSeat`, `deleteAssignment`, `deleteClass` do not require a subscription).
- Switching a class to "numbers only" erases every stored name in it (`updateClass` → `clearSeatNames`).
- Deleting a class removes its seats, assignments and results with it (database `ON DELETE CASCADE`).
- Automatic: a class not used for 14 months (427 days) is deleted; when a teacher's paid plan has ended, their classes are deleted 60 days later. A plan ends: for a cancelled plan on the last day paid for; for a failed payment 14 days after the failure (the grace period in which the class link still works). Where no end date is on record, the 60 days count from the class's last use. The job also removes, after 7 days, attempts a child opened and never checked (they hold no result). Rule: `classExpired` in `store.ts`, run every day on the server by `scripts/class-results/retention.js --apply`; it logs counts only, never a name. Checked by `scripts/class-results/tests/retention.test.js`. **True since 2026-11-11: the daily schedule is installed on the server (04:20, root's crontab) and ran once against the real database (0 classes).**
- Deleting the teacher's account deletes all of the above (cascade from `users`).

## Where the data is

One database on one dedicated server rented by LessonCraftStudio from Hetzner Online GmbH. **The data centre's country is to be confirmed by the operator from the Hetzner account before this text is used** (evidence gathered 2026-11-11: the server's first network hop is `dc1.hel1.hetzner.com`, Hetzner's Helsinki site in Finland) (Hetzner's dedicated servers are in Germany or Finland; the drafts say "in the European Union"). Cloudflare, Inc. delivers the site's pages and passes requests through to the server; class data is sent with a no-store instruction and is not kept by it.

**Backups:** the whole database is dumped daily; the server keeps 7 days of dumps (and the dumps made before each deploy, also 7 days); the operator's own computer keeps the newest 7 dumps and one dump per month with no end date. Every week, when the computer fetches the new dumps, the rows of the four class tables are taken out of every dump older than 28 days (`scripts/class-results/strip-class-data.js`, called by `scripts/ops/pull-deck-backup.sh`; the rewritten file is read back in full before it replaces the original). 28 days plus the weekly run: **no copy older than 35 days holds class data**, so what was deleted — by the teacher or by the automatic rule — is gone from every backup within 35 days, as the legal texts say. True in code since 2026-11-11 (`scripts/class-results/tests/retention.test.js`); it takes effect with the first weekly run after the class tables exist.

## What the data is used for

To show the teacher their own class's results. Nothing else: no advertising, no profiling, no sale, no use to train any system, no sharing with other customers. Aggregate product statistics (for example "how many classes exist") contain no names and no per-child results.

## Not built

No student accounts, no parent accounts, no messaging, no file uploads by children, no camera or microphone use, no third-party analytics on the class page or in the reporting request.
