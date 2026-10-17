# New #273 — The Week-Drop Calendar — Read a Month (READINESS calendar)

Backlog entry #273 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 2 · Measurement & Data. Planned files: `week-drop-calendar-core.js`, `week-drop-calendar-activity.js`, `week-drop-calendar-activity.html`, `week-drop-calendar-activities.json` (id `week-drop-calendar.play.calendar`). Start with `node scripts/new-activity.js --num=273`, then `NEW-RECIPE.md`.

## The skill
Find the weekday of a date, the date one week later, and the number of days between two dates on a month calendar.

## The apparatus and its invention
THE WEEK-DROP CALENDAR. A month calendar (7 columns, weekday initials on top, a fresh month layout each round) and a sticker the child drags. One square right = 1 day later; one row DOWN = 7 days later; the sticker leaves a footprint on every day it passes. Weekday question: the child slides the sticker straight up its column to the weekday header. One week later / earlier: the child drops it one row down or up — the next square (12 → 13) is a lure the footprints expose as 1 day, not 7. Days between: the child walks the sticker from one date to the other and types the number of days; only after the answer do the footprints number themselves (the start day carries no footprint, so counting the start day shows as one too many). Miss 1: the footprints on the path pulse; miss 2: they number themselves. Right: the event sticker (a library picture: bakery/cake, vegetables/pumpkin, christmas/present) lands on its date and the date ring closes.

- **Misconception the apparatus makes visible:** Thinking one week later is the next number (12 → 13), or counting the start day when counting days between.
- **Pictures:** none (drawn calendar); seasonal library pictures (birthday cake, pumpkin…) as event stickers
- **Settings:** Question: weekday / one week later / days between / mixed · Month: starts Monday (eu) / Sunday (us) by locale
- **Rounds:** ≥ 8 rounds per question with a fresh month layout (start weekday and length 28–31 vary) and fresh dates; weekday answers spread over all 7 columns.
- **Worksheet types it covers:** G2-277, G2-296, G2-297, G2-298, G2-312
- **Distinct from:** No calendar activity exists; Calendar Wall (tool #7) is the class's daily routine tool. Here the 7-day row structure is the mechanic.
- **Build risk:** Low. First weekday and weekday letters per locale.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
