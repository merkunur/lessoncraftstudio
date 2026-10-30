# #172 — Make Thirds → THE RAIN TABLE (2.G.A.3; all 11 locales)

ORDER row 172 · id `fractions.partition-thirds.2-g-a-3` (kept). Design: `designs/172-fractions.md`.

## The invention
- **The shape is a little rain table.**
  - Tapping a notch on its edge drops a straight wall across it.
  - Tapping a peg on its rim puts up a wall from the centre pin.
  - Check makes it rain evenly. Every part drains into its own glass tube, so the water in a tube is the part's area.
- **Equal parts fill their tubes to the same gold line.**
  - A bigger part spills over (coral drips) and a smaller one stops short (a dashed gold gap).
  - A part with no tube runs into the puddle tray, and an unused tube stays dry.
  - The parts on the table take the tint of their tube's verdict.
- **The classic mistakes show themselves:**
  - strips of the same height in a triangle fill 1 : 3 : 5;
  - the circle "peace sign" fills 1/2, 1/4, 1/4.
- **The surprise round:** three walls from the centre of a square make three pieces that look nothing alike, and they fill three tubes to the same line.
- **Success:** a rainbow behind the table and a do-mi-sol chord. The success line names the share and the whole ("Each part is one third. Three thirds make one whole."). Next follows 0.5 s later.
- **Color after (setting):** after equal parts, the task line asks to color k of the n parts. The child taps inside the parts, and it rains again.

## Rounds (design §6, measured)
- **Thirds** (default, 9 rounds), **halves** (8) and **fourths** (8), over circle, triangle, hexagon, square, wide rectangle, turned square, oval, the pegs-only square surprise, and tall rectangle.
- **Wall families** follow the critic's near-miss rule:
  - the square and the turned square offer one family only;
  - triangle thirds offer pegs plus the base-parallel notches;
  - rectangles have no pegs.
- **Measured:** every rejected set with the right number of parts misses by at least 18 % (largest ÷ smallest ≥ 1.182), which clears the design's 10 % rule. Every one of the 25 ghost sets is accepted.

## Deviations from the design
- **The row stays in `fractions-activities.json`.** Only the tool and template change, and the old params are dropped, as in row 170. The fractions engine now has no rows, and its two old gates (`verify-fractions-core.js`, `verify-fractions-interaction.js`) checked 0 rounds and still printed PASS. They are retired.
- **No separate cloud on a string.** Check carries a cloud icon and is the rain; the cloud drifts over the table while it rains. The design already said "the pull bead is the same action as Check; Check is always there".
- **No free play after Next** (as in rows 164–171): the table locks when the round is solved.
- **No live part-glow while building.** The walls themselves show the parts. A glow would have shown the seams of non-wall cells.
- **Notches and pegs are marks on one table surface, not separate buttons.** The nearest mark within 24 px of the finger wins, and a press-and-slide shows a highlight that follows the finger, as the design's §10 asks. Each mark is still a keyboard `role="switch"` (Enter and Space). A real tap at 320 px reaches every one of the circle's and the oval's marks (local-test).
- **The tubes sit beside the table on wide screens and under it on phones**, sharing a row with Check. On phones the tubes narrow until the rack fits beside Check.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - `hintUnequal` and the how-to prose said "move a wall". The child can only lift a wall and put one up elsewhere, so all 11 locales now say exactly that.
  - The prose promised "the whole as three thirds", and no on-screen line said it. Every success line now adds "Two halves / Three thirds / Four fourths make one whole" (2.G.A.3).
  - fi `okColour` printed slash notation (grade 3) and garbled "k of n". It now uses the `hintCount` pattern.
  - da prose: "Efter det andet forkerte forsøg".
- **MINOR:**
  - `hintStart` now names a notch or a peg, not "the edge".
  - en instruction: "to the same line".
  - sv uses *pinne*, not *pigg* (a spike), in strings and prose; sv prose has *på ögonmått* and names the setting.
  - fi prose: three fixes (it rains when Check is pressed, the strips fill their tubes, *yhtä suurilta*).
  - nl prose: *derde delen*.

## Found by building and measuring (no gate had them)
- **A single spoke counted as two parts.** The cells on either side of a spoke's line share one edge, and its midpoint is the centre pin, which is the spoke's own end. The cut tested one point. It now tests whether the walls cover the whole shared stretch. Square halves dropped from 36 "accepted" sets to its true 12 diameters.
- **My own gate's flood fill first leaked round a straight wall's end**, so it disagreed with the core on corner slivers. Then it lost a wall entirely: its chord search started at a point outside the triangle. Both are fixed in the gate. The core was right both times, which is why the gate must be independent.
- **The edge notches were invisible.** A straight wall's notch lies on its own line, so the "point at the shape" direction came out zero. Each tick now points at its wall's middle.
- **The success rainbow sat over the shape;** it now arcs behind the table.
- **The idle press-and-slide highlight was parked off the card;** it is now hidden.
- **The fourths color step at 360 overflowed:** four tubes, the pot and Check would not fit in one row.
- **At 320, Finnish put Check 3 px below the fold in the color step;** the narrowest table is now 250 px.
- **A long Check label (es "Comprobar", nl "Controleer", sv "Kontrollera") wrapped Check under the tubes and past a phone's fold.** The tube sizing had assumed a fixed Check width. It is now estimated from the label, and when even the narrowest rack cannot fit beside it, Check drops its cloud icon. A local-test assertion (Check beside the tubes, fourths with the paint pot, 320 and 360, every locale) is poisoned both ways.
- **Solved on a phone, the success bubble and Next fell below the fold** (found by the visual check). The solved table steps back to two thirds, or half when the success line is long (fi square surprise). The local test now asserts Next above the fold at 320 and 360 for the circle and the surprise in every locale, and it is poisoned both ways.
- **The rack and puddle svgs carried `role="img"` for their labels,** which the hierarchy audit bans. The labels moved to the wrappers (`role="group"`).
- **Two mutations first survived because the gate itself was too weak:** "the color step opens on unequal parts" (my case had only 2 parts, so the faulty branch was never reached), and "the reshuffle repeats the previous order" (random orders almost never repeat by chance). The gate now covers three unequal parts with color on, and a generator that deals the same order twice. Both mutations are killed.

## Gates
- `verify-rain-table-core.js` 25,741/0, over 844,736 enumerated wall sets. Its own analytic shapes, pegs and notches, and its own grid flood-fill areas cross-check the core on sampled sets. It covers the design's measured facts (1:3:5, the peace sign, the non-congruent square thirds, parametric vs polar oval spokes), the near-miss rule, ghosts, tubes, the hand, the color step, the plan, the words in 11 locales (placeholders, fr spacing, capitals, the diamond ban poisoned both ways, dead strings), the manifest, and the Next delay.
- `mutate-rain-table.js` 23/23 killed (21 in the full run, plus the 2 former survivors after the gate fix); the control passes.
- `local-test-rain-table.js` 2,904/0 in 11 locales. It covers real taps on notches and pegs, the keyboard, every hint, the tube read-outs, the puddle, the surprise, the settings and the color step. It also checks: every mark of the circle and the oval reached by a real tap at 320; the press-and-slide; the real rain once; Check beside the tubes on phones; Next above the fold when solved; and 7 states × 8 widths with Check above the fold.
- Visual QA ×11 locales: 216 renders each (4 phases × 9 rounds × 6 viewports), all PASS; tablet reach 20/0.
- Other audits: hierarchy 326/0; settings efficacy 2 live; prose claims, SERP copy, content tells, route preflight and Next delay all PASS.
