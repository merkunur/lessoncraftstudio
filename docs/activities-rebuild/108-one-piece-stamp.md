# #108 — Make Equal Parts → THE ONE-PIECE STAMP (1.G.A.3, all 11 locales)

ORDER row 108 · id `fractions.partition-equal-shares.1-g-a-3` (kept). Design: `designs/108-fractions.md`.

## Files and wiring
- **New files:**
  - `mini tools/one-piece-stamp-core.js` holds the model:
    - eight shapes in a 100 box, all convex; the circle and the oval are 360-gons, so the circle's pegs every 15° are vertices;
    - **the cut menu** per shape (design §4): rails parallel to the sides at 1/24 steps (square, rectangle, oval), the square's two diagonals, the diamond's rails and mid-pins, circle chords between pegs, hexagon cuts between edge points, corner-to-edge cuts on the triangle and pentagon, and spokes from a centre pin on the circle, triangle and hexagon;
    - pieces (lines split every part; two or more spokes make wedges built along the outline);
    - **the stamp**: a piece is turned and/or flipped about its centroid onto another piece's centroid, at every turn that lays one of its straight edges along one of the target's two longest; it is a copy when the areas agree within 0.5 % and the overlap covers ≥ 99.5 %;
    - the round tables (right cuts, tempting cuts, the free-play doubling), Check, kinds, hints, the gold dots and the plan.
  - `one-piece-stamp-activity.js` draws the mat, the pieces, the snap dots, the cuts, the glass stamp, the coral overhang and striped gap, the tokens, the pad, the copy counter, the fraction card, the number wheels and the shelf, and owns drag / tap-tap cutting, tap / drag stamping and the keyboard (CSS prefix `ops-`).
  - `one-piece-stamp-activity.html`.
- **Manifest:** the row moved out of `fractions-activities.json` into its own `one-piece-stamp-activities.json`.
  - The removal was surgical (the file is hand-formatted); the 2 sibling rows (thirds, make-and-count-squares) were proved deep-equal, and `fractions-core.js` / `fractions-activity.*` are untouched.
  - `tool` is now `one-piece-stamp-activity`, `task_template` is `one-piece-stamp`, and the params are `level` / `marks` / `stamp` / `rounds`.
  - Slug, title and intro are byte-equal in all 11 locales.
- **Route:** `one-piece-stamp-activities.json` registered in `MANIFEST_FILES`; `ACTIVITY_WRAPPER_VERSION` 9.851.
- **Prose:** replaced in all 11 locales.
- **Pictures:** none — the mat, shapes, stamp and tokens are drawn geometry.
- **Sources** (scratchpad): `ops-strings.js` → `ops-apply.js` (54 keys × 11); `ops-prose-src.js` → `ops-prose-apply.js`; `ops-manifest.js`; `ops-enum.js` (the first enumeration); `ops-review-fix.js`.

## The invention
**Cut the shape yourself, then stamp a glass copy of one piece on the others.** Equal parts are copies of one piece:
- a copy clicks down and gets the next number;
- a piece that is not a copy shows the stamp hanging over it in coral and the part it cannot cover in stripes.

**The guarantee:** the cut menu is built so that on every round "equal in area" and "every piece is a copy" never disagree. The gate enumerates every reachable cut set (about 690,000) and finds 0 mismatches, so the stamp never rejects a fair cut and never accepts an unfair one.

**Level 1, Halves and fourths** — ten rounds over all eight shapes (the old eight, plus a rectangle in fourths and a circle in fourths).

**Level 2, Thirds** — eight rounds:
- spoke thirds of the circle, triangle and hexagon;
- strip thirds of the rectangle and square;
- the square in fourths by diagonals;
- last, a circle in halves and then "now make fourths from your halves" (the halves cut stays).

**Level 3, Shade and name** — nine rounds:
- shade a fraction on the card by stamping copies (3/4 is three copies of the 1/4 piece; a tap uncolours);
- name a shaded fraction on two number wheels (2/4 also accepts 1/2);
- the trap: "Are these fourths?" — they are not, and "Not equal!" reveals real fourths to shade.

**After a Check:**
- **Miss 1:** the stamp from the biggest piece visits, one after another, every piece it does not fit; the hint names the cause (not all the same size / not as many pieces as asked — the card shows the count against the asked number).
- **Miss 2:** gold dots mark the ends of one fair cut. Level 3 name: the pieces are numbered, the coloured ones first.
- **Success:** every piece numbered and labelled 1/n, the success line, the shape on the shelf. Free play: the scissors halve every piece again along a proved doubling (more parts, smaller parts).

## Deviations from the design (each measured or ruled)
- **Cuts are dragged from dot to dot** (or tapped dot-then-dot) instead of sliding rail handles. The menu is exactly the design's, and the dots of one cut light when its start is chosen. With the ruler-marks setting, the half / third / fourth dots are gold.
- **Lifting the stamp is a tap** (or the start of a drag), not a 300 ms hold. The pad shows the stamp held; a tap on the pad (or on its own piece) puts it back.
- **The miss-1 test shows one piece at a time.** Drawing every overhang together piled coral shapes over the mat.
- **Gold dots only at miss 2**, without a dashed ghost cut beside an off-centre cut. The dots are the ends of one right cut set.
- **Halve again** uses the round's proved doubling on the round's own fair cut set. It is offered where one exists (it does not for the triangle and pentagon halves, the oval and the diamond).
- **The bounding-box bot:** the design's "fails the triangle, pentagon and hexagon rounds" is false for halves — the box's midline is the symmetry line and a fair cut. The gate asserts the true version: box slices never solve a round of three or more parts on a shape that is not a rectangle.
- **Hints carry no digits** (the design's "You made {k} pieces. Make {n}" and "Count your colored pieces: {k}" would print counts). The card shows the count against the asked number instead.
- **No sound-only cues;** the shelf, tokens and glow carry the result.
- **On a 320 px phone** the shelf of finished shapes is hidden and the mat is a little smaller in the name and trap rounds, so Check stays above the fold.

## Review
ONE native + pedagogy reviewer over the compact dump (all strings × 11, the prose).
- **Confirmed:**
  - no digit or answer in any hint, and no "free";
  - the fraction words, the shape words (rhombus / Raute / ruit / romb / rombe / rombo / losango / losange / neljäkäs; fr disque) and the stamp nouns in every locale;
  - 2/4 = 1/2, "more parts, smaller parts" and the trap round are sound.
- **MUST, applied:**
  - "equal parts are copies of each other" is false in general (2.G.A.3: equal shares need not have the same shape). The prose now says it holds **on this mat** (the cuts are chosen so), and the learning goal is the stamp test, not a general rule;
  - a = 1 made "1 copies" / "1 von 2 … sind": new singular lines okShade1 / okName1;
  - nl hintName2 ("alle delen samen"); da "Ikke lige!" (= not straight) → "Ikke lige store!"; sv "ett stift"; fr title "Le tampon d'une part" (= "on the one hand") → "Le tampon des parts égales".
- **SHOULD, applied:**
  - en "rhombus"; de "Der Teile-Stempel" and "Nadel" (not Stift = pencil); nl "zijn samen de hele vorm";
  - da "Stykkestemplet", "skæreunderlag", hintGhost; sv / no "Inte lika stora!" / "Ikke like store!", no "matten";
  - pt tTrap / hintTrap; fr hintTrap (morceaux, masculine), "inéquitable"; fi notEqual, okShade, "muodostavat koko kuvion", sAuto.

## Gates
- `verify-one-piece-stamp-core.js` — 2,067 checks, its own ground truth: the shapes, the menu rules and the round tables typed from the design, its own polygon clipper, wedge builder and exact overlap. It covers:
  - the menu: the core offers exactly the design's cuts on every shape;
  - **the guarantee** on every round (equal ⇔ all copies, ~690,000 cut sets; every certified copy re-checked with the gate's own transform);
  - hand-built pieces: equal area is not a copy, a mirror image and a turned copy are, 48/52 is not;
  - the rounds (right sets right, tempting sets reachable and wrong, doublings proved, the central-cut and box-slice bots);
  - level 3 (shade by stamped copies, the wheels, 2/4 = 1/2, the trap opens only with "Not equal!", shaded positions varied);
  - the state machine (limit, duplicates, the locked halves, an empty Check is never a miss, the gold dots are a fair cut's ends, halve again and back);
  - the plan; the strings × 11.
- `mutate-one-piece-stamp.js` — 16 / 16 killed, control survived (the rectangle gets diagonals, spokes on the square, the stamp cannot flip, a copy by area only, a 5 % tolerance, the count unchecked, the trap and name and two-step rules, the gold dots, the limit, the plan, the opposite 2/4 shading, a tempting cut made fair, a digit in a hint).
- `local-test-one-piece-stamp.js` — 33,209 checks in 11 locales; real drags and taps for cuts and stamps, Check, the wheels, the trap, the keyboard, the settings; every round of every level at rest, at miss 2 and solved, through 320…1366.
- `visual-qa-activity` · `audit-activity-hierarchy` · `audit-settings-efficacy` · preflight-activity-routes · prose-claims · SERP copy · activity-content × 11 — all green.
- LIVEVERIFY
