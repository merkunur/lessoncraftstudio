---
name: project_number_bonds_board_rebuild
description: "Number Bonds Board (part-whole-frame) rebuilt to the v4 bar 2026-08-05 and deployed — eleven model bugs, the two worst inside the features the operator asked for"
metadata: 
  node_type: memory
  type: project
  originSessionId: f974ba13-5c31-4506-bc65-1378587152b3
  modified: 2026-08-05T04:04:49.024Z
---

**LIVE 2026-08-05**, commit `e8214e50`, 11 locales, live-verify **73/0** (a real tap carried on
production in every locale). Tool key `part-whole-frame`, slug `number-bonds` (EN).

## What it is now

Two-tone counters where **colour marks the TRAY, not the token** — so a carry changes one coat
and never the length of the nest's run. Four counter shapes (circle/square/heart/star), three
CVD-safe colour pairs measured for ΔL* and edge contrast, a 260ms FLIP carry, fact-family
notation, quick-set numerals, wholes from 2, a cloth that holds in **five** channels, and a
two-page printable (a mat for real counters + the record the class made).

## ⭐⭐ The two defects every gate was blind to — both inside the operator's own asks

1. **The colour picker shipped THREE BLANK CHIPS.** `lcs-shell` paints a `type:'color'` chip with
   `sw.style.background = value`, and the options were the scheme KEY, so it assigned
   `'coral-ink'` — not a colour. `schemeValue()` existed, was documented in that very file as
   "the option VALUE", and was reachable only from inside `schemeFor`. **Four native panels found
   it; no gate could, because local-test set the setting programmatically and never opened the
   drawer.** → gate now opens the drawer and asserts each swatch carries a real gradient AND that
   every choice field has a chip marked selected.
2. **A free visitor's Ctrl+P printed a blank page.** Printed pages built only for a subscriber
   while `@media print` hid the whole screen unconditionally. *Gating the chip is not gating the
   feature* — the recorded fraction-kitchen defect, back. → print rules scoped to `body.pwf-paid`.

## ⭐ The renderer ignored its own verified model, twice

`slot()` had a whole gate section — pairwise, banded, stable under n→n+1 — and `_buildCounter`
**never called it**, so a whole of six drew as five-and-one: the exact five-structure the
arrangement exists to refuse. Every model check green. **Reading the render caught it, and the
render then refuted the arrangement itself**: column-major pairs put the two-tone boundary on a
DIAGONAL, which is not the unbroken run the design rests on. Reading order fixes both and makes
a double read as one full row of each colour.

## The other nine, each reproduced before fixing

stepper printed the whole the cloth was hiding (biggest glyph on the board) · every completed
drag-carry swallowed the next tap (`_dragMoved` reset in a click handler on a node `render()`
had already destroyed) · **connector legs MISSED the trays by 38px at 1367** and more per tier ·
the two "co-equal" parts were different widths in every locale · the record leaked the hidden
split (blinding only the CURRENT row was not enough — a row recorded one carry earlier gives the
answer by subtracting one) · narrowing the band left rows describing another number · the focus
arrow pointed at the wrong tray · a covered tray advertised a grab and refused it · Start again
threw away the teacher's number · the record panel made the instrument SMALLER at 1024 than 899
(a VIEWPORT query against a 720px-capped card).

## Files

`mini tools/part-whole-frame.{js,html}` (`?v=4`) · gates
`scripts/{verify,mutate,local-test,smoke,audit-…-locale-layout,live-verify,poison-…-bans,
poison-…-reachability,apply-…-locales}-part-whole-frame*.js` · SoT `scripts/_part-whole-frame-
{strings,landing}.js` · `scripts/update-part-whole-frame-landing.js` · hub card
`frontend/lib/manipulatives.ts` · 11 × `frontend/messages/tool-content/*.json`.

Gate results: verify 0 · **mutate 67/67, 0 harness faults** · local-test 207/0 (320–2560, two
configurations) · smoke 110/0 · locale layout 462 · print 121 · liveness 86/0 (6 warns are the
already-selected-radio class) · reachability all 45 keys. **0 lines to lcs-shell or any core.**

Related: [[feedback_native_panels_read_the_model]] · [[feedback_next_tool_build_recipe]] ·
[[project_premium_tools_v4_catalog]]
