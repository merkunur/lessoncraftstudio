---
name: REFERENCE APPS/ is the ONLY source of truth for ALL 33 worksheet generators
description: Whenever editing, fixing, or deploying any worksheet-generator HTML (addition, coloring, crossword, sudoku, wordsearch — any of the 33), edit REFERENCE APPS/<app>.html. Never read, search, grep, or reference any other location for worksheet HTML. The dormant legacy-apps/ and "worksheet generators/" parallel deployments were deleted on 2026-04-24; only REFERENCE APPS, the gitignored dev mirror, and the immutable production copy remain.
type: feedback
originSessionId: 7e165e80-2f01-4cb3-9ef1-fe900163c4e9
---
**Rule:** `REFERENCE APPS/` is the source of truth for **ALL 33 worksheet
generator HTML files**. Any change to any app — addition, alphabet-train,
big-small, bingo, chart-count, code-addition, coloring, crossword, cryptogram,
draw-and-color, drawing-lines, find-and-count, find-objects, grid-match,
matching, math-puzzle, math-worksheet, missing-pieces, more-less, odd-one-out,
pattern-train, pattern-worksheet, picture-path, picture-sort, prepositions,
shadow-match, subtraction, sudoku, treasure-hunt, word-guess, word-scramble,
wordsearch, writing — MUST be made in `REFERENCE APPS/<app>.html`.

**Stronger version of this rule (added 2026-04-24):** Don't read, search, grep,
or reference *any* other location for worksheet-generator HTML. There are exactly
two other places worksheet HTML legitimately exists, and both are derived from
REFERENCE APPS:

1. `frontend/public/worksheet-generators/<app>.html` — gitignored, populated
   by `scripts\master-sync.bat`, served by the Next.js dev server. Content
   identity with REFERENCE APPS is enforced by master-sync. Never edit; never
   commit; never quote in conversation as if it were a separate source.
2. `/var/www/lcs-media/worksheet-generators/<app>.html` (production server) —
   `chattr +i` immutable, updated only via `update-worksheet.sh`.

**If you ever encounter a worksheet HTML at any other path — flag it as
unexpected and stop.** It probably means dormant infrastructure was reintroduced
or master-sync was rerouted.

**What was deleted on 2026-04-24:** the parallel Express deployments at
`legacy-apps/` (a Dockerized standalone server) and `worksheet generators/`
(a non-Docker standalone server). Both contained their own `public/`
HTML mirror that master-sync wrote to. They confused agent and human
readers — `git status`, grep, and IDE searches kept surfacing them as if
they were canonical. Removed in commit `chore: remove dormant legacy-apps
+ worksheet-generators express deployments`. The two `docker-compose*.yml`
files lost their `legacy-apps:` service blocks at the same time.
master-sync.bat / .sh now sync to one location only (the dev mirror).

**Why the rule exists:**
- The dev mirror at `frontend/public/worksheet-generators/` is gitignored
  and gets overwritten by `scripts\master-sync.bat`. Edits to it vanish on
  next sync.
- The production server copy is `chattr +i` and updated only via the helper
  script. Direct `cp` fails and leaves the path in an inconsistent state.
- Editing either silently diverges from git. The next deploy overwrites
  the mistake. The "fix" becomes invisible.

**How to apply:** When asked to change ANY of the 33 worksheet generators:

1. Edit `REFERENCE APPS/<app>.html` — the git-tracked source.
2. Run `scripts\master-sync.bat` to refresh the dev mirror at
   `frontend/public/worksheet-generators/<app>.html`.
3. Test locally at `http://localhost:3000/worksheet-generators/<app>.html`.
4. `git add "REFERENCE APPS/<app>.html"` — only that path. The dev mirror
   is gitignored; nothing else needs staging.
5. Commit, push, deploy via `deploy.sh`, then sync the immutable served
   copy with `update-worksheet.sh` (CLAUDE.md §14.6 — the two-step rule).
6. Post-deploy sanity check:
   `wc -c "REFERENCE APPS/<app>.html"` local ==
   server `wc -c < /var/www/lcs-media/worksheet-generators/<app>.html`.

**Also applies to:** translation files in `REFERENCE TRANSLATIONS/` and content
managers in `REFERENCE CONTENT MANAGERS/` — each is the authoritative source
for its respective deployed asset. Same "edit source first, deploy, verify"
loop applies.
