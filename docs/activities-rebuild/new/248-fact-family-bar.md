# New #248 — The Fact Family Bar (1.OA.B.4)

Backlog entry #248 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 1 · Operations & Algebraic Thinking. Planned files: `fact-family-bar-core.js`, `fact-family-bar-activity.js`, `fact-family-bar-activity.html`, `fact-family-bar-activities.json` (id `fact-family-bar.play.1-oa-b-4`). Start with `node scripts/new-activity.js --num=248`, then `NEW-RECIPE.md`.

## The skill
Three numbers make four facts: two additions and two subtractions read off one whole and its two parts.

## The apparatus and its invention
THE BAR THAT ONLY CUTS ONE WAY. On top lies one whole bar (e.g. 9 squares); under it two part bars (4 and 5, two colours) that together exactly cover it. Beside them four empty fact rails, two printed '▢ + ▢ = ▢' and two '▢ − ▢ = ▢'. An addition rail takes two bars laid end to end and then the whole: it snaps only when the two parts end exactly where the whole ends, and 4 + 5 = 9 appears under the bars. A subtraction rail takes the whole first, then a part laid ON it: the uncovered stretch lights and becomes the third bar, 9 − 4 = 5. A part in the whole's place fails physically: the 9 bar laid on the 4 bar overhangs and slides back, so '4 − 9' cannot be made. A rail that would repeat a fact already made shakes and refuses. When all four rails hold four different facts, the bars stack back into the whole and the four sentences glow together. Miss 1 rings the overhang or the repeat; miss 2 numbers every square on the bars.

- **Misconception the apparatus makes visible:** Thinks a fact family is "any four sentences with these numbers" and writes 4 - 9 = 5, or does not see that the whole is always the biggest number and is the start of every subtraction.
- **Pictures:** none (bars drawn as square-strips in the shell palette); optional identical library counters inside the squares (fruits) for the within-10 setting
- **Settings:** Numbers: within 10 / within 20 · Show squares: always / only as a help.
- **Rounds:** 9+ rounds from distinct (part, part) pairs with parts never equal in 7 of them (equal parts make only two facts, used once as a talking round); the order in which the four rails must be filled is free, so there is no answer position; the bars start shuffled left/right.
- **Worksheet types it covers:** G1-113, G1-209, G1-219, G1-220, G1-221, G1-222
- **Distinct from:** match-pairs.add-it-both-ways shows only commutativity; numberbond.subtraction-unknown-addend shows one subtraction as a missing part. Neither makes all four facts from one whole, and neither makes an impossible subtraction physically refuse.
- **Build risk:** Equal-parts rounds have only two distinct facts; the round generator must treat them as a special case.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
