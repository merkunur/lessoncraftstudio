---
name: feedback_scope_a_qa_harness_to_its_own_surface
description: "A page-level QA harness must query inside its own surface, or it reports the site chrome as your defect and drives the wrong controls"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ed8658b3-33fc-4a8a-bf03-9ea4bf22a2d3
  modified: 2026-08-07T17:23:30.744Z
---

**A QA harness that queries `document` measures the SITE, not your page.**

First run of `scripts/visual-qa-workspace.js` (2026-08-07) produced three confident FAILs against
code that was not on trial:

1. **Tap targets** — it reported `BUTTON"Toggle menu"=40x40`, the locale switcher `"English"=97x36`
   and the header search `INPUT=...x42`. All site header, all pre-existing, none mine.
2. **Overflow** — counted elements past the right edge that were tab buttons inside a
   deliberately `overflow-x-auto` strip. A scroller's children are *supposed* to be past the edge.
3. **It crashed.** `document.querySelectorAll('nav button')` also matched the site header's nav,
   so "click workspace tab index 1" clicked a site-nav link, navigated away, and destroyed the
   execution context. That read as a harness bug rather than the selector fault it was.

**Why:** Reaching a control BY INDEX instead of by localized English text is the recorded rule —
but reaching by index *into the wrong collection* is just as wrong. The index was right; the
collection was the whole document.

**How to apply:**
- Give the page a stable scope hook (`data-workspace-root=""`) and resolve `root` ONCE, then
  query `root.querySelectorAll(...)` everywhere. Bail loudly if the hook is missing.
- Find sub-regions through structure, not brittle class chains:
  `root.querySelector('nav[aria-label]')?.parentElement` beats `div.rounded-\[20px\]`.
- **Exclude elements inside an `overflow-x:auto|scroll` ancestor from an overflow check** — and
  assert the PAGE doesn't scroll (`documentElement.scrollWidth <= clientWidth`) separately.
- **The 44px floor is a TOUCH guideline** — assert it below the `md` breakpoint only, skip
  `display:inline` links (they are text, not controls), and require width ≥44 only for icon-only
  controls. Demanding 44px of an inline text link condemns a correct page.

⚠ **The trap that nearly hid all of this:** I added the scroller exclusion and the "report WHICH
elements overflowed" logging in the SAME edit. The failures vanished and I never saw the evidence
— indistinguishable from switching the gate off. Fixed by adding an `AUDIT=1` env that disables
the exclusion so the excluded set can be inspected; it confirmed every one was a tab button in
the scroller. **Change the measurement and the reporting in separate steps, or you cannot tell a
fix from a blindfold.** Related: [[feedback_verify_the_measurement_before_the_defect]],
[[feedback_poison_every_assertion_not_just_the_first]].
