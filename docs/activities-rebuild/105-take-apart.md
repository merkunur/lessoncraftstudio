# #105 — Is It Still a Triangle? → THE TAKE-APART TRAY (1.G.A.1, all 11 locales)

ORDER row 105 · id `sort-bins.defining-attributes.1-g-a-1` (kept). Design: `designs/105-sort-bins.md`.

## Files and wiring
- **New files:**
  - `mini tools/take-apart-core.js` holds the model:
    - the shape catalogue (design §6 points; open corners, arcs, hoops);
    - the take-apart: sticks longest first, cups = stick ends ÷ 2 (a hoop has none), an open corner an EMPTY cup, square corners from the interior angle (a reflex corner is not one);
    - the counts / names / `belongs` / riddle `satisfies`;
    - the "disguised" and "nearly" tags, the "4 shapes" shelf;
    - the deal (positions and colours fresh per round);
    - the state: tap / place / frame / choose;
    - Check with the kinds tray · ok · turn · open · bent · count · circle · oval (level 1), name (level 2), riddle (level 3);
    - the hint ladder, the miss-2 prototype, the plan.
  - `take-apart-activity.js` draws the shelf, the tray, the boxes / name board / riddle card and the free-play tools, and owns drag, tap-then-box and the keyboard (CSS prefix `ta-`).
  - `take-apart-activity.html`.
- **Manifest, split as the design decided:**
  - The row's object moved out of `sort-bins-activities.json` into `take-apart-activities.json`. The sibling 2.G.A.1 row stays byte-identical (the file re-serialises identically; the mover refuses otherwise).
  - `take-apart-activities.json` is registered in `MANIFEST_FILES` directly after `sort-bins-activities.json`.
  - id, alignment, theme, slugs, titles, intros and kid prompt are frozen in all 11 locales (sha1 `7ad9058c`, checked).
  - `tool` is now `take-apart-activity`, `task_template` is `take-apart`, and the params are `level` / `tray` / `shapes` / `rounds`.
  - `sort-bins-core.js` and `sort-bins-activity.*` have a 0-line diff; `local-test-sort-bins.js` dropped the moved row from its list.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.848 (9.847 at first deploy).
- **Pictures:** none — every shape is drawn geometry (the shapes ARE the mathematics).
- **Sources** (scratchpad):
  - `ta-strings.js` → `ta-apply.js` (109 keys × 11);
  - `ta-prose-src.js` → `ta-prose.json` → `ta-prose-apply.js`;
  - `ta-manifest.js`, `ta-dump.js` → `ta-dump.md`, `ta-review-fix.js`.

## The invention
**Tap any shape and it falls apart into its sticks and joints on a tray.** A triangle is three straight sticks and three full cups however it was turned, painted or stretched; a curved "triangle" drops a bent stick, an open one leaves a cup EMPTY, a circle is one hoop with no cups.
- **Level 1, Real or not?** Six shapes on a shelf, two boxes ("Triangle" / "Not a triangle", full literal phrases per locale). Drag, or tap a shape (it comes apart and is chosen) and then tap a box. The shelf holds only the shapes not yet sorted.
- **Level 2, Name it:** one shape, four name tiles and a slot. "Rectangle" is never a wrong tile for a square.
- **Level 3, Riddles:** a riddle card, three shapes and an answer frame.
- **Miss 1:** the first misplaced shape lies taken apart on the tray; the yes-box shows its rule as a stick pattern (level 1). The hint is a question about the sticks, never the verdict and never a count.
- **Miss 2:** level 1 lays the target's prototype on a second tray row, stick for stick; level 2 lays the chosen name's prototype (a square beside the rectangle); level 3 draws the riddle's sticks and cups on the card (a prototype there would show the answer).
- **After a showing:** any new placement takes the help away.
- **Success:** level 1 shuts the yes-box's lid and ties each of its shapes' sticks into a bundle with a ribbon; level 2 lights the slot and spins the shape; level 3 lights the card. Then a paint pot, a turn knob and a stretch handle change the shape on the tray, and the sticks never change in number.

## Rounds
Nine per level, the design's tables typed literally in the gate.
- Every level-1 round has a disguised true (turned ≥ 90°, the smallest size, skinny / lopsided / concave) and a nearly false (open, curved, half-circle, oval, one side off).
- Order: an order-only reshuffle per pass that never repeats the previous pass; level 1 opens on round 1.
- Positions: level 1's shelf is a fresh uniform shuffle; level 2's right tile sits in each slot 2–3 times a pass, level 3's answer in each slot 3 times.

## Deviations from the design (each measured or ruled)
- **"Two disguised trues never both at the ends" dropped.** Where every true is disguised (rounds 4, 5, 7) it left the end slots true 35–40 % of the time against 55–60 % in the middle — a measured position tell. The deal is a plain uniform shuffle; the gate measures every slot within the true share ± 0.06.
- **Tap = take apart AND choose**, then tap a box (or the frame). The design's 300 ms press to select was replaced: one tap does both, a second tap on the same shape snaps it back together. A tap on a box or the frame where shapes already sit still drops the chosen shape (found by the browser test: the tap landed on a shape inside the box and was lost). A shape lying on the tray but not chosen (shown by a miss) is chosen by the first tap; only a chosen one snaps back together — found on production, where the first tap after a miss put the shape back together and the box tap that followed did nothing.
- **The shelf empties as the child sorts** (no dashed placeholders): at 360 the placeholders pushed the success line below the fold.
- **Free play by buttons, not drags:** the paint pot, turn knob and stretch handle are buttons acting on the shape on the tray (keyboard-reachable).
- **Miss 1 shows the first misplaced shape** (not every misplaced one in turn) — one tray, one question.
- **Hints are questions with no digit** ("Count the sticks on the tray. How many does a triangle have?") instead of the design's "Count the sticks: {count}. A {name} has {n}.", which printed the verdict.
- **Open corners stop 10 units short** (design: 7) so the gap shows at the smallest size.
- **Phones:** the empty tray is a slim strip that grows when a shape comes apart; on a 320 px phone (the shell header alone is 191 px) shelf cells 76, tray 84, name shape 112, tiles 48, gaps 6 — Check stays above the fold in all 11 locales.

## Review
ONE native + pedagogy reviewer over the compact dump (all 109 strings × 11, the round data, the prose).
- **Confirmed:** every riddle has exactly one fit and its digits match English in all 11; no hint names a box, a name or a shape or prints a count; no two-right-answer tile round; the L-hexagon and the half-circle lines are right.
- **MUST, applied:**
  - every locale's circle success line said "round, no corners", which is true of the oval the same round rejects — now "round all the way and just as wide every way";
  - it hintOval called the oval "cerchietto";
  - fi "vinoneliö" (= slanted square, the very turn misconception) → "neljäkäs";
  - fi success-line tails were ungrammatical;
  - fr hintTurn had the wrong gender.
- **SHOULD, applied:**
  - pt "adivinha" → "adivinhação";
  - es "doblado" → "curvo";
  - hintTurn reworded in es / it / pt / da / no;
  - one colon per line in es / it / pt / fr;
  - fr / it "upright" no longer collides with "straight";
  - da word order;
  - de / nl / fi hintRiddle2 and nl hintCircle;
  - de prose.
- **Model point from the reviewer:** a hoop in the pentagon / four-sided box fired "One stick is bent" — now "One stick is curved" in every locale.

## Gates
- `verify-take-apart-core.js` — 188,412 checks, its own oracle (the catalogue, rounds and riddle attributes typed literally; every attribute recomputed with the gate's own geometry), covering:
  - the level-1 splits;
  - disguised / nearly;
  - "4 shapes";
  - level-2 single right tile;
  - riddle fits and digits ×11;
  - 1,000 random transforms never change the take-apart;
  - cups = ends ÷ 2;
  - the prototype-matching bot fails every level-1 round;
  - the size floor;
  - answer position and colour independence over 2,000 deals;
  - Check / hint kinds;
  - the plan (incl. a constant generator);
  - the strings ×11 (no digit in any hint, fr narrow spaces, fr/it apostrophes, never "free").
- `mutate-take-apart.js` — 23 / 23 killed (core and activity), control survived (one equivalent mutant re-aimed at the plan's fallback).
- `local-test-take-apart.js` — 33,033 checks in 11 locales; real taps, drags and keys; every round of every level at rest, at miss 2 and solved through 320…1366. It checks:
  - no sideways scroll, Check above the fold at rest, Check and the hint in view at miss 2, the success line in view;
  - controls ≥ 44 px, nothing outside the card, bands that never overlap;
  - every stick inside its tray row, the tray = the model's sticks and cups, shapes never under the size floor, words never clipped.
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 488 / 0 · `audit-settings-efficacy` 3 live (level, tray, shapes) · preflight-activity-routes (193 manifests) · prose-claims · SERP copy · activity-content ×11 · variety static scan — all green.
- `live-verify-take-apart.js` on production: 78 / 0 on 9.848. All 11 pages of this row return 200, and all 11 of the 2.G.A.1 sibling (still on sort-bins). In en / de / sv / fi at 1366 and 390, with real taps: the open "triangle" comes apart with 3 sticks and one empty cup; every shape sorted by tap-then-box with the turned small triangle in "not" gives a miss (hintTurn, its sticks on the tray); that triangle moved to the yes-box gives the success line, the lid and three bundles; the iframe grows with the card. The first run against 9.847 found the tap-after-a-miss defect (fixed in 93dd8b4a); each first run inside a deploy window saw no iframe and the rerun passed.
