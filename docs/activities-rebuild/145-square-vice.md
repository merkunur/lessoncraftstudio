# #145 — Tuck Makes a Hundred → THE SQUARE VICE (2.NBT.B.7; all 11 locales)

ORDER row 145 · id `place-value-regroup.add-compose-hundred.2-nbt-b-7` (kept). Design: `designs/145-place-value-regroup.md`.

## The invention
- **Tuck's vice only locks shut on a square.**
  - Behind its bed stands a gauge plate: a square ruled into ten stripes.
  - A rod lying on the bed is exactly as long as the square is wide and one stripe thick.
- **How the child uses it:**
  1. Tap a column to lay its pieces on the bed. Press and hold for a handful; tap the bed to take the top piece off.
  2. Crank the T-handle down, by a tap or a drag. The jaw stops on the stack.
- **What the vice does:**
  - The catch drops into the notch only at exactly ten. Out comes a cream-gold piece of the next place, which drops into the next column (ten rods make a flat; ten cubes make a rod).
  - Nine pieces leave a bare stripe. Eleven stick out over the notch. Neither locks.
  - For cubes, the gauge turns into an upright rod's face.
  - The up arrow cranks the vice open: one rod or flat on the bed splits back into ten.
- **The task line is the sum itself** (`160 + 50 = ?`). The child types the total. The digits land right-aligned in three boxes, one under each column.
- **Check:**
  - Nothing typed → hintType.
  - A column still holding ten or more → hintTooMany: the column pulses, and it is not a miss, because one digit cannot describe ten.
  - Otherwise each box is compared with the column above it.
- **Misses:**
  - Miss 1: the wrong columns count their pieces in place-value steps, the boxes wobble, hintCount.
  - Miss 2: the right digits appear in pencil, plus "Hundreds: 2 · Tens: 1 · Ones: 0" and the written sum with its carried 1.
- **Settings:**
  - Numbers: no trade needed (G2-203) / tens make a hundred (default, the old eight) / ones and tens both trade (G3-359/361).
  - Written sum: hidden / shown. The carry box writes its 1 when the vice locks a piece into that column. In de, the carry sits in the Übertragszeile; elsewhere it sits above the top number.

## Files and wiring
- **New files:**
  - `mini tools/square-vice-core.js` (`SquareViceCore`): the three tables, load / unload / crankDown / crankUp, carry, typing, the check with literal hint keys, needs, the plan. The default face never opens with two exactly-ten rounds.
  - `square-vice-activity.js` (`SquareViceActivity`, prefix `sv-`, `apparatusClasses: ['sv-art']`).
  - `square-vice-activity.html`.
- **Manifest:**
  - The row stays in `place-value-regroup-activities.json`; en..sv slug, title and intro are frozen.
  - `tool` → `square-vice-activity`; params mirror the core tables.
  - da/no/fi get a new slug, title and intro (3. klasse / 3. trinn / 3. luokka, like the frozen de/sv Klasse 3 / åk 3).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.889 → 9.890.
- **Prose ×11:** rewritten. It quotes 160 + 50 = 210, 320 + 80 = 400, 34 + 25 = 59 and 268 + 157 = 425.
- **Deviations from the design:**
  - **Crank-up is also a visible up-arrow button** next to the handle, so it is reachable by tap, keyboard and the liveness gates. Drag-up and Shift+Enter work too.
  - **Taps instead of drags:** a tap moves one piece, and press-and-hold lifts a handful. A release anywhere counts, so a drag to the vice works too.
  - **The bed holds up to 12 pieces.** A column never exceeds 19: a split or a lock that would overfill it is refused (free play only).
  - **Phone sizes:** the vice gauge is 90 px at 360 and 70 px at 320.
  - **The written sum on phones:** it sits under the keypad, so Check stays above the fold.
  - **The hint above the written sum:** the hint sits above the written sum, so it is in view at a miss.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **en (source, inherited everywhere):**
  - practices[0] "when the tens make more than ten tens" was false for the four exactly-ten rounds. It is now "add up to ten or more" ×11.
  - hintShort and hintTall named "the square", which is false for cubes. Both are now anchored on the notch ×11.
  - howToPlay[0] now says "one at a time (press and hold for a handful)" ×11.
- **de:** okNone and the about text now say "musste nichts gebündelt werden".
- **fr:**
  - aSplit "Séparée de nouveau en dix".
  - okNone "pas besoin d'échange".
- **it:** "ne avanza una".
- **nl:**
  - "tien gelijke blokjes".
  - okNone and the about text now say "zonder inwisselen".
  - aSplit "Weer in tien uit elkaar gehaald".
- **sv:**
  - "en nolla".
  - okNone "behövdes ingen växling".
- **da:**
  - "til næste blok".
  - okNone "skulle der ikke veksles".
- **no:** "minnetallet" (not the Danish "mente") ×3.
- **fi:**
  - The instruction now says "yhdeksi isommaksi palaksi".
  - hintTooMany has a noun.
  - aBed "ylin pala palaa takaisin".
  - nBoth is a noun phrase.
  - Two idioms fixed in the about text.
- **es, pt:** no findings.

## Gates
- **`verify-square-vice-core.js`: 2,301 checks, 0 fail.**
  - **My own tables, re-solved by column arithmetic:**
    - The old eight: four exactly-ten rounds, four with eleven tens.
    - The warm-up: tens 5–8, ones 6–9, no lock possible.
    - Both-trade: a ones lock and a tens lock every round.
  - **The old rounds**, read from git (1c2c7a8e).
  - **The vice at every stack height 1–12, for rods and for cubes:** it stops at n, and locks only at ten.
  - **Splits and bounds.**
  - **10,000 random hands:** value is conserved and the bounds are kept. This found a real defect: a lock could overfill a column after free-play splits. It is now refused.
  - **A scripted player for every round of every face.**
  - **Carries, verdicts, typing and the plan.**
  - **The shortcut bots:**
    - tens written as they are: 0/8;
    - no carry: 0/8;
    - drop the leftover: right only on the four exactly-ten rounds;
    - both-trade, no carry: 0/8;
    - both-trade, carry the ones and forget the tens: 0/8.
  - **Picture, strings ×11, prose ×11 and the manifest:** sibling rows untouched.
- **`mutate-square-vice.js`:** 28/28 killed, and the control passes.
- **`local-test-square-vice.js`: 8,734 pass, 0 fail** (real pointer, 11 locales). It covers:
  - the 160 + 50 walk-through: hintType → hintTooMany (the column pulses) → nine rods short → eleven tall → ten lock (a gold flat, one rod left) → miss 1 counting → miss 2 pencil and written carry → solved → Next 0.5 s later;
  - 168 + 284: press and hold for a handful, both locks, both carry boxes;
  - a drag on the handle, and the up-arrow split;
  - the warm-up line;
  - Shift+Space;
  - then every round of every face at rest / miss 2 / solved through 320…1366.
  - It found real layout defects, all fixed:
    - the written sum pushed Check off a phone, so it now goes under the keypad on phones;
    - German's longer title pushed Check below the 320 × 640 fold, so the 320 layout tightened;
    - a full tens column of fourteen rods overshot 320, so a full column packs tighter.
- **`visual-qa-activity`: 192 renders pass**, after the hundreds column lies in two overlapping piles on a phone. Five flats in a grid overshot 360 after the trade.
- **`audit-activity-hierarchy`:** 578 / 0.
- **`audit-settings-efficacy --tool=square-vice-activity`:** both settings live.
- **Other gates:** `audit-activity-next-delay` passes; content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the 360 / 768 / 1024 renders and the preview.** The first render showed the screw poking out of the drawing into the header; it is now a separate rod that stretches from the crossbar.
- **0 lines** in shared cores or `lcs-shell`.
