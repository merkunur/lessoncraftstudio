# New #288 — The Measuring Rod (3.OA.A.1)

Backlog entry #288 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 3 · Operations & Algebraic Thinking. Planned files: `skip-rod-core.js`, `skip-rod-activity.js`, `skip-rod-activity.html`, `skip-rod-activities.json` (id `skip-rod.play.3-oa-a-1`). Start with `node scripts/new-activity.js --num=288`, then `NEW-RECIPE.md`.

## The skill
Multiplication as a equal jumps of b from 0, and division as how many rods of b fit back from N to 0.

## The apparatus and its invention
THE MEASURING ROD: a wooden rod exactly b units long lies beside a 0-100 number line; the child drags it from 0 and it clicks end to end, each landing lighting its multiple. Lay-out mode: the task asks for 6 rods of 4 — the child lays rods and the landing is read as 6×4. Measure-back mode: the rod starts at N and is laid back toward 0; the count of rods is the quotient (and a gap shorter than the rod is left over if the setting allows). A rod cannot be laid with a gap or overlap — it snaps only to the previous rod's end, so 'jumps of different sizes' is physically impossible. Miss 1: the rods already laid show their count above them; miss 2: the multiples of b under the line get tick dots.

- **Misconception the apparatus makes visible:** Counting tick marks instead of jumps (landing on 6×4 by counting 24 single steps), and treating division hops as unequal; the rigid rod makes every jump identical and the count of rods visible.
- **Pictures:** none (rod and number line drawn tool-grade); a library animal (frog/kangaroo) may ride the rod end as a marker
- **Settings:** Mode: lay out (×) / measure back (÷) · Rod sizes: 2, 5, 10 / any 2-10
- **Rounds:** Generated (a,b) pairs with a,b in 2-10, ≥ 9 rounds per mode, no product repeated; the answer is a typed number or a landing tap whose position on the line is spread across the full 0-100 range (measured: landing position decile balanced).
- **Worksheet types it covers:** G3-308, G3-310
- **Distinct from:** Hopper's Number Line hops variable add/sub amounts and Lily Hops fixes the step at 5/10/100; the rod makes the step a rigid physical length of any size and runs both directions of one structure. Not the Fading Line (K) or Creek Map.
- **Build risk:** Low; the number line must show 0-100 legibly at 360 px (zoom to the used range).

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
