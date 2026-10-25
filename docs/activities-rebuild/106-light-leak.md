# #106 — Mim's Glow Workshop → THE LIGHT-LEAK LANTERN (1.G.A.2, all 11 locales)

ORDER row 106 · id `shapeforge.compose.1-g-a-2` (kept). Design: `designs/106-shapeforge.md`.

## Files and wiring
- **New files:**
  - `mini tools/light-leak-core.js` holds the model, in two exact geometries:
    - **TRI** (pattern blocks): triangle cells (r, c), up when r + c is even; pieces are cell sets turned in 60° steps through axial lattice points;
    - **TAN** (tangram): the integer lattice of the small triangle's leg, every unit square cut by both diagonals into four quarter-cells, so every tan is an exact set of quarters; turns in 90° steps; a round in frame "A" is drawn turned 45° (the full tangram square stands upright).
  - It also holds the rounds, the coverage (leaks, overhang, overlap), the seams, the snap / drop / turn / take-out moves, the spares and panes, Check and the hints, the ghost (one piece of an exact cover of what is still open, from what is left in the tray), and the plan.
  - `light-leak-activity.js` draws the garland, the workshop wall, the lit frame, the glass, the shadows, the etched seams, the tray / spares / pane rack, and owns drag, tap-to-turn, the flip button and the keyboard (CSS prefix `ll-`).
  - `light-leak-activity.html`.
- **Manifest:** the row stays in `shapeforge-activities.json` (its only row), edited surgically because the file is hand-formatted.
  - `tool` is now `light-leak-activity`, `task_template` is `light-leak`, and the params are `level` / `glass` / `turning` / `rounds`.
  - Slug, title and intro are frozen in the 8 shipped locales (sha1 `21a0282e`, checked).
  - **da / no / fi slug, title and intro are authored new** — the activity never shipped there; reviewed.
  - `verify-shapeforge-core.js` now reports itself RETIRED (its engine has no row left); `shapeforge-core.js` and `shapeforge-activity.*` have a 0-line diff.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.849.
- **Prose:** 8 locales replaced, da / no / fi added.
- **Pictures:** none — glass, frames, wall, lamp and garland are drawn geometry.
- **Sources** (scratchpad):
  - `ll-strings.js` → `ll-apply.js` (66 keys × 11);
  - `ll-prose-src.js` → `ll-prose-apply.js`;
  - `ll-manifest.js`, `ll-dump.js`, `ll-review-fix*.js`.

## The invention
**A lantern only glows when it is sealed.** Behind every frame a lamp burns:
- every gap between the pieces leaks gold light;
- every bit of glass outside the frame throws a dark shadow on the workshop wall;
- sealed means no light and no shadow, and overlaps are impossible: a piece never lands on another.

**Level 1, Glass pieces** — twelve lanterns:
- build;
- use just these pieces;
- the same lantern a NEW way, the remembered seams shown dotted — the same seams are refused, the mirrored filling counts as new;
- only triangles;
- grow a hexagon round a riveted rhombus;
- a long bar.

**Level 2, The missing piece** — a lantern full but for one hole and three loose spares; exactly one fills it, by shape AND size (a small triangle leaks in a medium hole, a large one sticks out). The M7 parallelogram arrives mirrored and only the flip fixes it.

**Level 3, Tangram** — seven builds (T1–T7, T7 the full square last) and four shadow rounds. In a shadow round, three rigid panes slide into the shadow's frame without turning: the turned or flipped ones leak AND throw a shadow, by the same law.

**After a Check:**
- **Miss 1:** the lamp blazes every leak and darkens every shadow; the hint says what the light shows.
- **Miss 2:**
  - build rounds show a dotted ghost piece from an exact cover, which never repeats the remembered seams in a new-way round;
  - level 2 makes the right spare glow; a shadow round lifts the right pane;
  - a same-way miss blinks the old seams.
- **Success:** the glass glows, the seams etch silver, a miniature lantern rises to the garland, and the line names the target and the child's pieces ("Your pieces: 1 rhombus and 2 triangles", Intl list per locale). Then every piece can be taken out and rebuilt.

## Deviations from the design (each measured or ruled)
- **Tangram turns are 90°, not 45°:**
  - a 45° turn leaves the lattice (the small triangle's legs are √2 of a half-unit), so no exact snap or light law is possible;
  - every figure is reachable in one of two frames, so the two upright squares (T4, T7) are drawn in frame A;
  - the gate proves a 45° turn leaves the lattice.
- **S4 "the square on the medium triangle's short leg" is impossible:** the square's side is 1, the medium triangle's legs are √2. S4 is now the medium triangle with the square under one end of its long side (asymmetric, so the flipped and turned decoys differ).
- **fi rhombus = neljäkäs**, not the design's vinoneliö ("slanted square" — row 105's review: it teaches the turned-square misconception).
- **M7's parallelogram is dealt mirrored.** The gate showed the hole fits the dealt chirality by a turn alone, so as dealt the flip was never needed.
- **Pieces dropped on the wall stay there and throw their shadow**, so a wrong spare shows its overhang; dragged off the bench they go back. Every piece must stay wholly on the bench (an overhang is always seen whole), and a shadow round's bench is sized to hold every pane in the frame.
- **A tap-turn prefers the spot that stays in the frame:** a turned rhombus cannot keep its centre on the grid, and the first try pushed it half out.
- **The answer slot** (right spare / pane) is balanced per pass over the rounds that have one, with the leftover slots drawn at random. The first version gave the last slot the shortfall every pass (0.375 / 0.375 / 0.25 measured).
- **Colours:** the medium tan is indigo and the glow a pale cream — a sun-yellow medium triangle beside a glowing hole read as light.
- **No turning hum, no "clear glass" toggle in free play** — "Glass: clear" is a setting; the keyboard path is the bench (arrows move a cursor, Enter drops, R / F turn / flip, Delete takes the last piece out).
- **de stays "Glühwerkstatt"** (the reviewer suggested "Lichtwerkstatt") because the frozen German page title uses it.

## Review
ONE native + pedagogy reviewer over the compact dump (all strings × 11, sample built success lines, the prose, the new da / no / fi metadata).
- **Confirmed:**
  - shape names and count forms in every locale (fi partitive, da / no lille → små);
  - no answer tells at miss 1;
  - no "free" / Common Core;
  - es-MX farol / charola / encimar;
  - the new da / no metadata.
- **MUST, applied:**
  - the prose said hints never give the answer, while miss 2 points to a fitting piece — now honest;
  - learning goal 4 ("a turned arrangement doesn't fill the same outline", false for a square) — now "turn or flip a piece so it fits a fixed outline";
  - hintSpare told a child holding the right spare at the wrong turn to look for another piece — now "…or try turning it";
  - hintSpare2 / tHole say "turn or flip" (the flip round);
  - fr "blocs logiques" (Dienes blocks) → "blocs mosaïques";
  - sv hintShadow2.
- **SHOULD, applied:** the shadow rounds get their own prose sentence; fi Käytit / ghost hint / OPS sentence; de "lose Teile", hintSame.

## Gates
- `verify-light-leak-core.js` — 22,712 checks, its own oracle: the round tables typed literally, real triangle-cell coordinates turned by real 60° rotations, its own quarter-cell lattice with a winding-number test, its own exact-cover solver. It covers:
  - every build round sealable; "exactly these" only with all its pieces; new-way rounds have other seams;
  - the cell lists draw the intended outlines;
  - level 2 has exactly one fitting spare, the drop-without-turning bot seals ≤ 3 of 8, and M7 needs the flip;
  - shadow rounds: exactly one pane seals, and the decoys are flips / turns;
  - every tan corner for corner; the classic square tiles 32 quarters;
  - 3,000 random drops where leaks, overhang and seal equal the gate's;
  - the ghost inside the light, of a tray kind, leaving a sealable rest;
  - the ghost in a new-way round ends new;
  - a tap-turn stays in the frame;
  - the kinds and hints;
  - the plan (#1 #2 open, #8 after #7, #9 after #6, T7 last, never the previous order, constant generator);
  - the slots, P = 1/3 ± 0.04 over 2,000 passes;
  - the strings × 11.
- `mutate-light-leak.js` — 23 / 23 killed, control survived. One mutant (an off-lattice parallelogram corner) first SURVIVED the quarter-cell sampling; the gate now checks every tan corner for corner.
- `local-test-light-leak.js` — 37,807 checks in 11 locales; real drags from the tray, taps to turn, the flip button, the pane rack, the keyboard; every round of every level at rest, at miss 2 and sealed, through 320…1366. It checks:
  - no sideways scroll, the fold, Check and the hint together at miss 2, the success line in view;
  - controls ≥ 44 px, nothing outside the card, bands that never overlap;
  - the frame and every piece on the bench, the grid side ≥ 30 px.
- `visual-qa-activity` 72 / 72 · `audit-activity-hierarchy` 392 / 0 · `audit-settings-efficacy` 3 live (level, glass, turning) · preflight-activity-routes · prose-claims · SERP copy (incl. the new da / no / fi metadata) · activity-content × 11 · variety static scan — all green.
- `live-verify-light-leak.js` on production: 68 / 0 on 9.849. All 11 pages return 200 (da / no / fi new). In en / de / sv / fi at 1366 and 390, with real drags and taps: a rhombus dragged into the hexagon lantern shrinks the light; Check gives the leak hint and the lamp blazes; every piece the ghost names dragged in (tray turns by taps) seals it; Check gives the success line, the etched seams and a lantern on the garland; the iframe grows with the card. The first run, inside the deploy window, saw no iframe; the rerun passed.
