---
name: project-pattern-bench-rebuild
description: "Pattern Bench (tool #32) rebuilt to the v4 bar 2026-08-06 — the tap-edits invention, the bracket slide, and the defects three expert panels plus eleven native panels found"
metadata: 
  node_type: memory
  type: project
  originSessionId: a421c1c7-72db-44f4-b010-3b418f11c778
  modified: 2026-08-06T05:19:54.306Z
---

**LIVE 2026-08-06**, commit `a583b9e5` + the live-verify gate. `live-verify-pattern-bench.js` = **220 assertions DRIVEN on production, 11/11 locales**.

## What the operator asked for, and what it turned out to be
"It is great but it would be good to add that by tapping on dots you can actually change the pattern." That was the visible tip of a tool **rendering at phone size inside a pinned ~422px iframe on every desktop**. Measured after the fix: **704×752** on all eleven locales.

## The two inventions
- **EVERY BEAD IS A HANDLE** — tapping any bead cycles the SLOT it belongs to, so its whole congruence class (i mod k) moves in one frame. The family **rings on press-in, before the commit**, so the causal story reads bead → slot → all beads and never bead → beads (the latter teaches "the beads are magically linked", which is wrong and does not survive a longer strip).
- **THE BRACKET SLIDES** — state gained `phase`; sliding rotates the unit the other way and the strip is byte-identical. ⭐ The shipped header CLAIMED the class could test "AB or BA?" — **it could not**, because rebuilding from `[b,a]` produced a strip starting with the other bead. The tool staged an argument it had no mechanism to settle. Both the design and the pedagogy panel arrived at the phase offset independently.

## ⭐⭐ The showstopper the native panels found in code written that hour
`_dissolve()` added `.ptn-fade{opacity:0}` and **nothing removed it** — the bench went BLANK on its single most important gesture and stayed blank (measured 9/9 glyphs at opacity 0, still 0 after 4.4s). **My own local-test passed it because it compared path `fill`/`d` ATTRIBUTES, which are perfectly present on an invisible node.** Five of the eleven panels reported it by reading the model. → [[feedback_native_panels_read_the_model]]

## ⭐⭐ Five panels independently found my headline string was FALSE
`hintTap` said "every bead **like** it changes too" — resemblance. The model moves the same **PLACE**. With a unit of AABB those are different sets, and AABB is already a shipped printable (K-048). Worse, "beads that look the same move together" is the surface reading the tool exists to defeat. Fixed in all 11.

Other native catches, each a live near-miss: **fi "Peitä helmi" reads as "Cover HELMI"**, a common girls' name · **da/no "Dekk" is a TYRE** · **nl "de haak" is a coat-hook AND the wrong gender** (het haakje) · the bracket noun collided with `comparison-planks` in **five** languages, each time with the OPPOSITE consequence (there you drag it to CUT A PIECE OFF) · **"Key" on a printed sheet reads as ANSWER KEY** — the one artefact this tool refuses.

## Measured defects (each has a number, none assumed)
| | defect |
|---|---|
| D1/D2/D3 | iframe pinned ~422px; all 3 wide tiers dead code (`min-height` vs a 422px viewport); scroll escape keyed `max-width:700px` against a **704px** embed — missed by four pixels |
| D4/D5 | Ctrl+P delivered the paid sheet to a free visitor; there was no sheet, only a restyle of the live DOM, so a **scrolled** strip printed cut off |
| D12 | colour costume failed the house ΔE00 floor at **protan dE 14.5** — the identical number sorting-hoops was rebuilt to remove. New set: dE 24.8 **plus a true value ladder** (min L\* gap 12.3 vs 4.6) |
| D13 | shape glyphs spread **58.1%** on optical area → 2.4%. The hexagon is gone: it differs from a circle by **1.71px at a 34px bead** |
| D14 | apple and cherry were the same red blob — **the PAID costume could not carry the pattern** |
| D17 | `len ∈ {12,16,20,24}`: for k=2 and k=4 **every** reachable length ended ON a unit boundary. Now `reps*k+1` at all 34 reachable states |

## Gates
`verify` 17 invariants (incl. a ΔE00 palette gate and a glyph-mass gate the gate computes **itself** from the path data) · `mutate` **71/71 killed**, control first · `local-test` 143 assertions + poison · `smoke` 11 locales with a **Proxy key-recorder** (`api.t` cannot be wrapped — `lcs-shell.js:482` freezes it) · **`audit-pattern-bench-locale-layout` NEW — 1,980 assertions / 330 cells** · print-sheets probe NEW · liveness 78/0 at depth 2. **0 lines to `lcs-shell.{js,css}`.**

## Deferred, with reasons (do not re-open casually)
Rail B (a second independently-editable strip) — the pedagogy panel's highest-value feature, unlocking 5 missing progression rungs; it is a second instrument's worth of work and doubles every gate matrix. Growing patterns — **permanently** out (catalog rejected list `premium-tools-v4.md:609`, shipped at K-053, and they have no unit, so admitting one falsifies invention #1). Orientation/size costumes — occupied by K-050/K-052 and each teaches against something. UNIT_MAX stays 4: six sockets at 2× bead size cannot fit a phone without undoing D8.
