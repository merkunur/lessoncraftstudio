# #169 — Sort Shapes by Sides → THE TRUNDLE WHEEL (2.G.A.1; all 11 locales)

ORDER row 169 · id `sort-bins.sort-by-sides.2-g-a-1` (kept). Design: `designs/169-sort-bins.md`.

## The invention
- **Every shape is a wonky trundle wheel.**
  - Dropped on the lane, it tips over its front corner onto its next side, again and again.
  - Each side that lands prints a dash on the paper strip, as long as that side. Each corner it tipped over leaves a mark: a dot, or a little open square for a 90° corner.
  - The start side is coral. When it lands again the ticket is done, and the shape rides home wearing it.
  - A turned shape prints the same ticket from a different dash. Turning changes nothing (gate: tickets at any turn are cyclic shifts).
- **Three boards** (setting):
  - **Sides crates** for 3/4/5/6 sides. Each crate front shows a numeral, a mini ticket and the plural name; a setting shows numbers only or names only.
  - **The quadrilateral cabinet**, with no words: columns are four square corners vs none (open squares vs dots); rows are four equal dashes vs long-and-short. Rounds 5–8 leave one drawer empty, with three candidates on a shelf of which exactly one fits.
  - **Two rings**, "four sides" and "a square corner", with an outside band of their own.
- **Miss 1:** the wheel rolls each misplaced shape for the child, and the shape comes home wearing its ticket. The right ones stay placed.
- **Miss 2:** the misplaced shapes' dashes are numbered and the right place pulses.
- **Success:** the shapes hop; a per-locale success line follows, e.g. "Yes — 2 triangles, 3 quadrilaterals and 1 pentagon!", with the singular for 1 and the fi partitive. Next appears 0.5 s later.

## Deviations from the design
- **No free play** (Next 0.5 s after success, as in rows 164–168). The parade is a hop of every placed shape, not a second tumble down the lane.
- **The row stays in `sort-bins-activities.json`** (the only row there; tool `trundle-wheel-activity`, old params dropped). Metadata is frozen in all 11 locales.
- **Q3:** the right trapezoid (2 square corners) is replaced by a kite. The cabinet's right column is "no square corner", so a shape with 1–3 square corners matched neither header. The design file is updated, and the gate asserts that every cabinet shape has 0 or 4 square corners. The trapezoid stays in the rings.
- **Drawer candidates:** positions are reshuffled per showing (uniform), not the design's 2/1/1 slot plan.
- **No "Check again unchanged" reminder:** after a miss every wrong shape is back in the tray, so the next Check meets "every shape needs a place" first. The branch was dead code and is removed (found by mutation).
- **Phones:**
  - the lane rests as a short dock strip and opens while a shape is on it;
  - the tray has four smaller cells per row;
  - the rings and cabinet are cramped below a 300 px stage.
- **Tap-then-tap is the second way to sort.** While a shape is held, a tap on an already placed shape drops the held one into that place.
- **Crate labels** carry soft hyphens (Quadri-laterals, Vier-hoeken, Fyr-hörningar, Neli-kulmiot …). A headless browser has no hyphenation dictionary, and the label broke as "Quadrilateral-s".

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - The cabinet design flaw above (Q3).
  - `hintCabinet` asked whether "the corners are little squares". It now asks whether all the corner MARKS are little squares, and whether the dashes are all the same length.
  - `okQuads` said "The square" while two rounds hold two squares. It now says "A square …".
  - `hintRings` used folk words ("rechte Ecke" reads as right-hand corner; sv/da/no/fi "square-shaped corner") instead of each ring's term (right angle).
  - The en learning goal claimed "drawing".
  - sv prose said "rätt hörn" (a correct corner).
  - da/no prose used "firkant" (their quadrilateral word) for the corner mark.
- **MINOR:**
  - `hintCount` now names the crate "for that many sides", so it works with names-only crates.
  - en: "Crates by sides" and "in the rectangle column".
  - The square-is-a-rectangle learning goal is phrased as discovery (it is 3.G.A.1 content).
  - es: "¡Sí! {list}.", "un lado más", "se voltee".
  - pt: "mais um lado".
  - it: rings are anelli (cerchio is the shape).
  - nl: "het kind".
  - no: "hyllen".
  - fi: lappu (lippu also means flag), kierähtää, omaan lokeroonsa, and the framework named.

## Gates
- `verify-trundle-wheel-core.js` 2,640/0. Ground truth is parsed from the design's catalogue and round tables, with its own geometry. It checks:
  - **Catalogue:** 22 shapes, all convex; sides, square corners and equal sides as listed; no corner within 3° of 90° unless it is 90°.
  - **Roll:** from every start side at four turns, n dashes and n marks, 360°, the landing side on the ground, square marks only at 90° corners, cyclic tickets, the lowest side docked.
  - **Square-corner rule:** probed on synthetic 85° / 87° / 95° / 89.6° / 90.4° corners.
  - **Rounds:** every round as designed; crates 1–4 each; cabinet cells all filled in Q1–Q4, one drawer fit in Q5–Q8, 0 or 4 square corners per shape; every ring region occupied, and a one-rule bot misses.
  - **Check flow, plan and tray order:** misses, help and success; the round plan; no three tray neighbours share a place; crate positions.
  - **Words and row:** every line in 11 locales; success lists; no dead strings; the manifest row.
- `mutate-trundle-wheel.js` 23/23 killed, control passes.
- `local-test-trundle-wheel.js` in 11 locales: real drags to the lane, along the lane and into crates and drawers; tap-then-tap; the keyboard; the crate settings; misses, help and success; then 9 states × 8 widths with Check above the fold at rest.
- Visual QA × 11 locales; hierarchy 686/0; settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes and next-delay all PASS.
