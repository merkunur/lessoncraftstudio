---
name: project_number_sieve_rebuild
description: "Number Sieve (#36) rebuilt to the v4 bar — three of its own claims were false in production (the going-dark never animated, the lit/dark step was 1.44:1, the closing card was unreadable on 44 of 60 boards), two sold paid features did not exist, and the free Print chip produced a blank page."
metadata: 
  node_type: memory
  type: project
  originSessionId: 6a562050-89e6-4916-8717-49b2e830b935
  modified: 2026-08-07T14:03:28.396Z
---

**Rebuilt 2026-08-07.** The first v4 tool, eight tools older than the lessons that
now apply to it. Gates at close: `verify` 33 gates / 0 errors · `local-test` 103 ·
`smoke` 99 across 11 locales · `locale-layout` 506 · `print-sheets` 10 · `liveness`
114/0 · registration preflight 47 tools × 9.

## What was actually wrong — each measured, not inferred

- ⭐⭐ **THE GOING-DARK HAD NEVER ONCE ANIMATED.** `render()` did
  `stage.innerHTML=''` and minted every cell already carrying `nsv-out`; a CSS
  transition needs a node that already existed. The `prefers-reduced-motion` block
  protecting it was inert for the same reason. **Third recurrence of this defect on
  the platform** (`sorting-hoops.js:2217`). Fix = a `_build()`/`_paint()` split.
- ⭐⭐ **THE WHOLE LESSON WAS DRAWN AT 1.44:1.** WCAG asks 3:1 of a non-text
  graphic. cream:slate 1.44 · the committed marker 1.43 · the "survives" half
  against its strip 1.21 — while **amber on deep teal, 5.82:1, was unused**. Fixed
  with a 45° hatch (a second CHANNEL, not a darker tone) and by moving amber onto
  deep teal. Now 8.3 / 8.3 / 5.8, gated by measured arithmetic in N23.
- ⭐⭐ **THE CLOSING CARD EXTINGUISHED ONE NUMBER ON 44 OF 60 BOARDS**, so the
  enacted-clue thesis held for every card except the one the class cares about.
  Fixed by a penultimate floor + **three face-up candidates, exactly one of which
  closes** (constructibility measured: 125/125 boards).
- ⭐ **`shuffle` UN-COMMITTED THE MARKERS** — after a full run, the one control
  inviting a second run let the class move a marker onto the answer they had just
  watched appear. **"Start again" jumped to library board 1** and reset the field.
- ⭐ **The free Print chip produced a BLANK PAGE** — the sheet was appended only for
  a subscriber while the print CSS hid everything else. Found by three native panels
  reading the model; reproduced before fixing.
- ⭐ **`shuffle` renumbered the card backs 1..n**, so "the same cards in another
  order" was byte-identical on screen to a new deck — the headline invention was not
  observable at all. Fixed with per-card emblems that travel through a rotation.
- **Library 60 → 373 boards**, every one ≥4 cards / ≥3 kinds / ≥3 alight at the
  close / carrying a valid closing choice. Two pure additions to the search made it
  possible: a deterministic **keeper rotation** and the **penultimate floor**.

## Gate holes this rebuild found in its own suite

- `local-test` **L4 was dead code** — its leak regex was built from `board.target`,
  a field boards deliberately do not carry, so it read `/undefined/` and could not
  fail.
- `audit-…-locale-layout` had **no non-vacuity guard**: it clicked a chip to reach
  the 1-120 field and never checked it arrived. 484 assertions were measuring the
  two-row board. Adding the guard turned 484 green into 11 red.
- `verify` N16's cell-floor check was an **any**, not an **every** — one matching
  clamp certified all of them, and a mutation dropping the base floor to 22px
  survived.
- `number-sieve` was **unprobed by `audit-tool-print-sheets`** and absent from
  `audit-tool-control-liveness`'s ALL_TOOLS. **No `live-verify` existed** — the
  whole suite proved things about the working tree and nothing about production.
- `verify`'s "independent" `intersect()` called **`T.satisfies`**, the tool's own
  predicate, despite a comment claiming otherwise.

→ [panels audit the source](feedback_native_panels_audit_the_source.md) ·
[verify the measurement](feedback_verify_the_measurement_before_the_defect.md) ·
[704px](feedback_the_tool_page_pins_every_iframe_at_704.md)
