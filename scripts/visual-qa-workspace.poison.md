# visual-qa-workspace poison matrix

Every assertion class in `visual-qa-workspace.js` must be shown CAPABLE of
failing before its green run is trusted. `POISON=<kind>` injects one synthetic
defect into the rendered page before measuring; the run must then FAIL. A
control run (no POISON) must pass on the same build.

Run each with `QUICK=1` unless marked **full** (the interaction/dialog block
only runs without QUICK):

| kind | injects | must fail |
|---|---|---|
| `teal-text` | static `<p>` with `color: rgb(20,107,94)` in a card | B — no teal TEXT fill |
| `teal-text-alpha` | same at `rgba(…,0.6)` | B (any alpha) |
| `terracotta` | node with `text-terracotta-500` class | C — no terracotta |
| `tiny-target` | 20×20 icon-only button | E — ≥44px targets (<768 only) |
| `collision` | two absolutely-positioned overlapping text boxes | F — no box collisions |
| `overflow` | 4000px-wide element | D — no overflow |
| `two-filled` | solid teal-filled button appended to a row | G — ZERO filled controls per row at rest |
| `extra-coral` | second coral-filled button on the page | G — exactly one coral CTA per view |
| `wrong-panel-bg` | first `[data-workspace-card]` recolored red | A — every card is paper #FFFDF8 |
| `menu-inert` (**full**) | menu items replaced with listener-less clones | interaction — Rename/Delete consequence |
| `dialog-terracotta` (**full**) | terracotta-class node inside the open rename dialog | H — dialog: no terracotta |
| `dialog-teal-text` (**full**) | static teal text inside the open rename dialog | H — dialog: no teal text fill |
| `dialog-confirm-not-brick` (**full**) | confirm button recolored coral | H — dialog: confirm is brick #B3392B |

Caveats:
- **A poison that mutates a transitioned property must set `transition: none`
  first.** `dialog-confirm-not-brick` survived its first run because the
  confirm button has `transition-all`: a computed `backgroundColor` read
  milliseconds after the inline change still reported the near-brick
  mid-transition value. Poisons that APPEND nodes are immune; poisons that
  MUTATE styled nodes are not.
- The dialogs portal to `<body>` — outside `[data-workspace-root]` — so the
  root-scoped scans (B/C/A) can never see them; the `dialog-*` kinds prove the
  H assertions that close that blind spot.
- `wrong-panel-bg`'s non-vacuity partner is the `>= 2 cards rendered` check:
  a selector matching zero nodes must FAIL, not certify.
