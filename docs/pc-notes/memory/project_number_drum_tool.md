---
name: project_number_drum_tool
description: "TOOL #50 The Number Drum — built and committed, NOT yet localised/registered/deployed; a fence ruled it a duplicate and a pedagogy panel ruled DO NOT BUILD, and the tool is their own dissent"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T10:06:38.708Z
---

**TOOL #50 `number-drum` — built, gated and COMMITTED 2026-08-10. ⚠ NOT YET SHIPPED.**
CSS prefix `ndr-`, category `number`, `PREV='number-hotel'`.

## ✅ SHIPPED — live in all eleven locales, `live-verify 44/44` on production
Commits `dedf625e` (locales + registration) → `14c931da` (live verify). TOOL_KEYS 52→53, wrapper
**7.85**, category `number`, ordinal **#50**, `PREV='number-hotel'`.

## ⚠ TWO GAPS LEFT OPEN, deliberately and on the record
- **The gate suite is the four that matter, not all eight.** Shipped: `verify` (120,129), `probe`
  (48 pixel checks × 4 viewports), `smoke`×11 with a reachability recorder, `preflight-tool-
  registration` 53/53, `tsc`, `live-verify` 44/44. NOT written: `mutate-`, `local-test-`,
  `audit-locale-layout`, `audit-tool-control-liveness`, `audit-tool-print-sheets`,
  `audit-tool-wide-viewport`. The liveness gate is the notable absence — it is the ONLY instrument
  that has ever caught a consequence-free control.
- ⚠ **The 11-locale strings are MINE, not a native panel's.** Every prior tool ran a three-agent
  panel per locale and every one of them found real defects in my English AND in the model. This
  tool's copy has had no native review. The apply-gate's structural checks (key-set agreement both
  directions, placeholder parity, per-locale owned-noun bans poisoned both ways) all pass, but
  **that proves shape, never quality**.

## The object
Two (or three) rings of numerals in a frame, no readout. Crank the ones ring past its 9 and a tooth
catches the ring beside it. **SLOW moves a HALF notch**, so the class can park it mid-catch.

## ⭐⭐ THE INVENTION — the fence and the pedagogy panel both handed it over while arguing against it
The fence ruled it **a duplicate of #49 with the metaphor swapped**, and the pedagogy panel ruled
**DO NOT BUILD 3-1**. Both were argued well and both are recorded in the file header rather than
answered (**#47's rule: redefining the deliverable is the operator's call**).
⭐ **The tool is the pedagogy panel's own dissent, which it dismissed as "one visual assertion":**
*nothing on the shelf models the ones as a CLOSED RING* — #49's corridor ends at door 9 and draws a
wall, the sieve's row ends, the choral column ends, so on every one of them 9→0 is a BREAK. On a ring
it is a NEIGHBOUR. That is exactly what a child who says "forty-ten" has not learnt.

## ⭐ THE DECISION, and the refuse-list objection that shaped it
A ring has no unreadable state, so #49's "say it before you can read it" cannot be reused. **The
decision is WHERE TO STOP.** The panel's refuse-list is right that a counting number must never have
an in-between value — **adjudicated: the mid state is a MACHINE state, never a NUMBER, so the tool
has NO READOUT AT ALL.** The rings ARE the number; mid-turn it is genuinely not yet decided.

## ⭐ TIER INVERTED FROM THE CATALOG
The interaction panel read §23.1 ("free apparatus, paid depth and record") and won: **all three rings
FREE** — the hundreds is a third identical part, and 99→100 is the best thing the tool does.
**PAID = the paper rings.** ⚠ **NOT sold: a boundary preset shelf** — `choral-counting.js:129-135`
already ships per-locale boundary presets free in eleven locales, and selling it twice would be a lie.

## ⚠⚠ THREE DEFECTS NO GATE COULD SEE, ALL CAUGHT BY READING THE RENDER
- ⭐⭐ **EVERY STRING WAS DEAD.** A flat `{key:'English'}` map makes `lcs-shell.js:488`'s `t()` hand
  back the KEY — the heading rendered the literal word **"title"**. 120k model assertions and 48
  pixel checks were green: **the model gate tests arithmetic, the probe tests geometry, and neither
  reads a word.** New law **L13a** (every string is a per-locale object with an `en`), poisoned.
- **The tooth pointed AWAY from the ring it catches** (outer edge), and the obvious fix would then
  have been clipped by the window's own `overflow:hidden`.
- **`GEO.WINDOW` was declared while the CSS retyped `3`** — caught by the L12 dead-constant law #49
  added, on the very next tool.

## ⚠ THREE MEASUREMENT BUGS IN MY OWN PROBE, verified before being filed as defects
DOM ring order is **most-significant first**, the reverse of the model (#44's convention trap); a
strict straddle test is **false for BOTH cells at exactly half a notch**, the one state it exists to
measure; and the **90ms beat was sampled at 120ms**, after it had ended. Also nearly filed two false
defects off misreading which column was which in a screenshot.

## The art panel's one transferable number
**`T_CATCH = 90`** — the tooth seats and for 90ms *nothing moves*. Below ~80ms two events read as
simultaneous. **Without the beat a carry is magic.** Sound: direction in the pitch (880 fwd / 440
back), the seat between them at 660 so no contour encodes value.

## Gates green
`verify` **120,129 assertions enumerating BOTH whole state spaces** (199 and 1999 half-notch states ×
6 moves) against its own re-derived oracle, **poisoned 7/7 with a green control** · `probe` **48
render checks in PIXELS** at 360/704/768/1024. **0 lines to `lcs-shell.{js,css}` or any core.**

Related: [[project_number_hotel_tool]] · [[project_counting_cups_tool]] ·
[[feedback_native_panels_read_the_model]] · [[feedback_verify_the_measurement_before_the_defect]]
