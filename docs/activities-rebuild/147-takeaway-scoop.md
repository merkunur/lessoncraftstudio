# #147 — Tuck Breaks a Ten → THE TAKE-AWAY SCOOP (2.NBT.B.7; all 11 locales)

ORDER row 147 · id `place-value-regroup.subtract-decompose.2-nbt-b-7` (kept). Design: `designs/147-place-value-regroup.md`.

## The invention
- **The number you take away is a scoop built to match it:**
  - one round cup per one;
  - one long slot per ten;
  - one square slot per hundred;
  - the number itself is on its handle.
- **Over Tuck's shelves its cups light up where a block lies under them, and the scoop lifts only when every cup is full.**
  - A refused lift moves nothing: the empty cups blink (hintShort), and it is not a miss.
  - "The smaller digit from the bigger" cannot happen. Five cups over two cubes leave three cups dark, and the scoop will not lift.
- **Snapping:**
  - A tap on the tens shelf snaps a rod (scored like a chocolate bar) into ten cubes.
  - A tap on the hundreds shelf snaps a flat into ten rods.
  - Snapping only goes downhill, and never while the next shelf holds ten or more (hintEnough).
  - Cubes cannot be snapped: the ones shelf is not a control.
  - Ten loose pieces show a dashed outline that clicks them back together.
- **One lift per round.** It carries the number to Tuck's bowl; tapping the bowl pours it back.
- **Answer and Check:**
  - The child types what is left into digit boxes under the shelves.
  - A right answer on an untidy mat is accepted, after the extra ten clicks back.
- **Misses:**
  - Miss 1: the shelves with a wrong digit count their pieces in place-value steps; hintCount.
  - Miss 2: one count-on run across the whole mat (100, 200, 300, 310 … ?), the written subtraction with strike-and-rewrite (4→3, 12 over the 2), and hintCountOn.
- **Faces:**
  - nothing to snap (G2-205 warm-up: 58−23 …);
  - ones only (default, the old eight);
  - bigger numbers (52−27 … 627−346, the one hundred snap).
  - The written subtraction is a setting.

## Files and wiring
- **New files:**
  - `mini tools/takeaway-scoop-core.js` (`TakeawayScoopCore`): the three tables, cupsFilled / canLift / lift / pour / snap / rebuild / tidy, typing, the check with literal hint keys, marks (the child's and the method's own), the plan (the two 0-tens rounds never open together).
  - `takeaway-scoop-activity.js` (`TakeawayScoopActivity`, prefix `tk-` — `ts-` is taken by telescope/ten-stones — `apparatusClasses: ['tk-art']`).
  - `takeaway-scoop-activity.html`.
- **Manifest:**
  - The row stays in `place-value-regroup-activities.json`; en..sv slug, title and intro are frozen.
  - `tool` → `takeaway-scoop-activity`; params mirror the core tables.
  - da/no/fi get a new slug, title and intro.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.891 → 9.892.
- **Prose ×11:** rewritten. It quotes 342 − 5 = 337, the 343 slip, 58 − 23 = 35 and 627 − 346 = 281.
- **Deviations from the design:**
  - **The scoop lifts on a tap as well as a drag** (drag it onto the shelves and let go). A tap is reachable by keyboard and assistive tech.
  - **The digit boxes sit under the shelves** (as in #145/#146), not one answer box under Tuck, so miss 1 marks the wrong shelf's own digit.
  - **Undo of a snap is the dashed click-back outline** (the #146 pattern), not dragging ten cubes.
  - **The handle number is fixed in a round.** The 1–9 free-play handle was not built; the scoop is the round's take-away.
  - **The third face is named "bigger numbers"** (reviewer: its take-aways include hundreds, so "tens and ones" named it wrongly).

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **en (source, inherited everywhere):**
  - "a tray with exactly that many cups" was false: 128 has 8 cups, 2 slots and 1 square. It is now "a tray built to match it" ×11, and in the da/no/fi intros.
  - The instruction said "snap a ten if you need more ones", which is wrong for 627 − 346, where a hundred must snap. It is now "a ten or a hundred if a cup stays empty" ×11.
  - hintCountOn said "from the hundreds", but two-digit rounds have none. It is now "from the biggest pieces" ×11, in the prose too.
  - The setting "tens and ones" is now "bigger numbers" ×11; "bigger ones" is now "bigger take-aways".
  - aScoop read "1 cups full" aloud. It now says "Full cups: {full}. Empty cups: {empty}." ×11.
- **de:** "zu zerbrechen" ×2; "Hier liegen schon genug."
- **it:** spezzarla / spezzarlo agreement.
- **nl:**
  - The about[0] subject/predicate is untangled.
  - "op te breken" ×2.
- **sv:**
  - "Förblir … tomma".
  - "tillräckligt många".
- **da:**
  - "brække … i" ×3.
  - "Forbliver".
- **no:**
  - "brekke … i" ×3.
  - "blir stående tomme".
  - A comma fixed.
- **fi:**
  - okHundred now says "sadan" (not the money word "satasen").
  - aState is in the nominative.
  - A missing verb is added.
  - howToPlay[2] grammar fixed.
- **fr, es, pt:** no findings beyond the source ones.

## Gates
- **`verify-takeaway-scoop-core.js`: 2,419 checks, 0 fail.**
  - **My own three tables, re-solved by column subtraction:**
    - ones only: 337 443 206 127 406 118 343 238, one rod each, two leave 0 tens;
    - nothing to snap: no column borrows;
    - bigger numbers: one snap each, 627 − 346 the flat.
  - **The old rounds**, read from git (ce9f35dc).
  - **The scoop:** it cannot lift before the method's snap and can after it; a refused lift moves nothing and its empty cups are exactly the ones the shelves cannot fill; the lift takes exactly b; one lift per round; the bowl pours it back.
  - **Snapping:** downhill only, and refused at ten loose.
  - **An exhaustive 6-move search from every round:** no lift with an empty cup, no shelf negative or over nineteen, the mat plus the scoop always equals the top number.
  - **The marks:** they follow the snaps.
  - **An untidy right answer** is tidied and accepted.
  - **Right-aligned digits.**
  - **The bots:** smaller-from-bigger 0/16, snap-but-forget-the-rod 0/8, copy-the-top 0/24. The core marks each a miss.
  - **Picture, strings ×11, prose ×11 and the manifest.**
- **`mutate-takeaway-scoop.js`:** 29/29 killed, and the control passes. Two first-run "survivors" were equivalent mutations: a partial lift is unreachable because a lift needs every cup, and a snap-order swap is unreachable because no round needs two snaps. They were replaced with mutations that change behaviour (a scoop that ignores its ten-slots; the hundred line never used).
- **`local-test-takeaway-scoop.js`: 8,767 pass, 0 fail** (real pointer and drags, 11 locales). It covers:
  - 342 − 5:
    - parked Check → hintScoop;
    - the ones shelf is no control;
    - the refused lift blinks three cups;
    - a snap lights all five;
    - a second snap is refused (hintEnough, the ones shelf pulses);
    - click-back, then snap again;
    - a DRAG of the scoop onto the shelves lifts;
    - the bowl pours back, and a tap lifts;
    - hintType;
    - 327 counts 10, 20, 30;
    - 338 shows the run 100 … 330, 335, ? and the marks;
    - 337 → solved → Next 0.5 s later;
  - 627 − 346: the wrong snap is allowed but doesn't fill the slots; a flat snaps; 281;
  - 58 − 23: lifts at once, and a needless snap is clicked back;
  - Enter on the shelf and on the scoop;
  - then every round of every face at rest / miss 2 / solved through 320…1366.
- **`visual-qa-activity`: 192 renders pass.**
- **`audit-activity-hierarchy`:** 578 / 0.
- **`audit-settings-efficacy --tool=takeaway-scoop-activity`:** both settings live.
- **Other gates:** `audit-activity-next-delay` passes; content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the 320 / 360 / 704 / 768 / 1024 renders and the preview.** The desktop scoop was too small for the hero object, so its parts were enlarged; `role="img"` on the ones shelf became a labelled group.
- **0 lines** in shared cores or `lcs-shell`.
