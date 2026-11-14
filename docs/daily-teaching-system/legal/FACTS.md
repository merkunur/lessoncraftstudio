# Class links and results — the facts, checked against the code

Written 2026-11-11; corrected 2026-11-14 after the legal decision (`DECISION-2026-11-14.md`, section A named ten lines where this file or a text said more than the code did; each is corrected here or closed in the code by the conditions E1 to E9, see `../PART-9-DESIGN.md` section 13). Each statement names where it is enforced. If a later change makes a line here untrue, this file and the legal texts are corrected before the change ships.

## What exists only when a teacher makes it

- A teacher with a paid plan confirms once, before her first class, that she uses class links for teaching and may do so (`class_teacher_confirmations`: who, when, which version of the text; `createClass` in `frontend/lib/class-results/store.ts` makes no class without it).
- She makes a **class**, gives it a name and adds **seats**. A seat is a number and a picture of an animal. **No name:** the server makes every class a numbers class, refuses to switch one to names and refuses a name on a seat, unless the teacher holds a permission that nobody holds today (`Caller.names`, `names_off`; `frontend/lib/class-results/http.ts`). `frontend/prisma/schema.prisma` models `Classroom`, `ClassSeat`.
- The teacher **assigns** worksheets from the site to the class and gets one **class link**.
- A child opens the class link, taps their own seat and plays a worksheet. When the child presses the worksheet's Check button, the page sends **how many answers were right, how many there were, and which were right** (as a list of 1 and 0). Model `ClassAttempt`; rules in `store.ts` (`report`, `cleanReport`).

## What is stored, in full

| Data | Stored | Where it comes from |
|---|---|---|
| The class: its name (free text, shown on the class page) and its language | Yes | The teacher |
| Seat number and animal picture | Yes | Assigned automatically |
| A display name | **No.** The column exists and stays empty: the server refuses a name (above) | — |
| Per worksheet: which worksheet (the assignment and the page), when it was opened, answers right at the first Check and when that was, answers asked, which were right, how many times Check was pressed, whether the page was finished | Yes | The class page (the opening) and the worksheet page (the Check) |
| For a Level Set: which level each page was (easy, core, hard) | Yes | The site |

The opening time and the time of the first Check are both stored, so the time between them could be worked out. No timer runs, the difference is computed nowhere and shown to nobody.

## What is not stored, because there is no field for it

Surname · date of birth or age · gender · email address · photograph · home or school address · IP address · device or browser identification · location · what the child typed or drew (only right or wrong) · anything about a child who uses the site without a class link beyond what the general privacy policy says of every visitor.

- **No cookie.** The reporting request and every request of the class page carry no cookie and read none (`credentials: 'omit'` in `scripts/class-results/web/lcs-class.js` and in the class page). The play check a worksheet page sends carries none either when the address holds a class attempt (`lcs-meter.js` through `scripts/publish-cli/build-lcs-meter.js`, `frontend/lib/client-meter.ts`).
- **Nothing from another company.** The class page, a deck page, an activity and a teacher's own worksheet take their fonts from this site (nginx fetches them itself and replaces the two outside addresses in what it serves: `scripts/class-results/patch-nginx-first-party-fonts.py`). Measured in a real browser on the origin server: every request goes to www.lessoncraftstudio.com (`scripts/class-results/tests/live-hosts.js`).
- **No analytics, no advertising tag** on the class page (`/c/…`) and on any address that carries a class attempt (`#lcs=<token>`): the site's analytics script is loaded through a wrapper that does nothing there (`scripts/class-results/patch-nginx-class-beacon.py`), and the advertising tag (not configured in production) holds back in the same two cases (`frontend/components/tracking/PinterestTag.tsx`).
- A page that shows no marks (a maze, for example) reports only "Check was pressed" and, later, "finished": no number is invented. A worksheet a teacher made with several pages reports once, the sum of its pages.
- The class page is served with `Referrer-Policy: no-referrer`, so the class link is not passed on to the worksheet page as "where the visitor came from".
- So that a child returns from a worksheet to their own list, the browser tab remembers which seat was tapped: on the device only (`sessionStorage`), for 20 minutes, never sent anywhere.
- The result is linked to a seat by a random one-time token that the class page puts in the worksheet's address after `#`. The part after `#` is not sent to any server by the browser and does not appear in server logs.
- **Logs.** Requests to the class page and to what it calls (`/c/…`, `/api/class/…`) are written to the log as time, method, the words `/c/*` or `/api/class/*`, status, size and duration: no address of the device, no browser name, no class key, no seat (`scripts/class-results/patch-nginx-class-logs.py`). The general log of the site (address, time, page address) keeps 14 daily files.

## What a child sees

The class page shows the class's seats (picture and number) so the child can find their own. Anyone who has the class link can open that page and tap any seat; a seat's page shows which worksheets that seat has started or finished, never how many answers were right. The link contains a random 10-character key; the teacher can replace it at any time, which stops the old one. A child never sees a score, a ranking or a timer. At the foot of the page stands one line for adults, a link to the privacy section.

## What the site works out by itself

Each result is sorted into one of three bands (almost all right, some wrong, many wrong: `bandOf`), in a set with levels the next page is easier or harder accordingly (`nextLevel`), and the teacher's "By curriculum" view groups the bands under the curriculum's headings. This is for the teacher's teaching only; no decision about a child is made by the site, and nothing of it is used for any purpose of the operator.

## Who can see results

Only the teacher who owns the class, signed in to their account (`own()` in `store.ts`: every teacher route checks the class belongs to the caller). No other teacher, no parent portal, no public page. Nobody else reads the rows: the rule for support, scripts and AI coding sessions is in `docs/ops/server-access.md` ("Class data — nobody reads the rows").

## Deletion

- The teacher can delete one child's results, one child, one assignment or the whole class at any time. This works even after the paid plan has ended (`deleteSeat`, `deleteAssignment`, `deleteClass` do not require a subscription).
- Deleting a class removes its seats, assignments and results with it (database `ON DELETE CASCADE`). Deleting the teacher's account deletes all of it, and her confirmation.
- Automatic (`scripts/class-results/retention.js`, daily): a class not used for 14 months (427 days) is deleted; when a teacher's paid plan has ended, her classes are deleted 60 days later (a plan ends: for a cancelled plan on the last day paid for; for a failed payment 14 days after the failure; where no end date is on record, the 60 days count from the class's last use); **every single result is deleted 427 days after it was started, whatever the class's last use**; a page a child opened and never checked is removed after 7 days.

## Where the data is

One database on one dedicated server rented from Hetzner Online GmbH (Germany) in its data centre HEL1-DC6, Helsinki, Finland. The data processing agreement with Hetzner was concluded on 2026-11-14. The site is delivered through Cloudflare, Inc. (plan: Pro; custom security rules only); requests pass through its network.

**Backups:** the whole database is dumped daily; the server keeps 7 days of dumps (and the dumps made before each deploy, also 7 days). **A copy that leaves the server holds no class data:** the weekly pull to the operator's computer (in Sweden) fetches a copy the server made without the rows of the four class tables (`strip-class-data.js --all`, called by `scripts/ops/pull-deck-backup.sh`). So what a teacher deleted is gone from every backup within 7 days.

## Who operates it

A private person in Sweden (no company): the name, postal address and contact e-mail on the site's privacy page. No telephone number is published; one is added before first names are offered to schools in the United States.

## What the data is used for

To show the teacher her own class's results. Nothing else: no advertising, no sale, no use to train any system, no sharing with other customers, no profile for any purpose of the operator. Counts for running the service (for example "how many classes exist") contain no per-child results.

## Not built

No student accounts, no parent accounts, no messaging, no file uploads by children, no camera or microphone use, no first names (the code for them exists and is refused by the server until a school has accepted the terms).
