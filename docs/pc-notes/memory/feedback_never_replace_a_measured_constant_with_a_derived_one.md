---
name: feedback-never-replace-a-measured-constant-with-a-derived-one
description: "A constant someone probe-measured outranks a formula you reasoned out — and when a layout defect appears, fix the ONE coupling that broke, never restructure the numbers around it"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 86b3dad3-29a2-44c7-87a1-9eea5a232d02
  modified: 2026-08-04T15:04:50.691Z
---

**Rule:** when fixing a layout defect, change the **one thing that is wrong** and
leave every measured constant alone. If a number in the file was probe-measured
by an earlier programme, a formula you derive to replace it is a **downgrade**,
however principled it looks.

**Why.** Fraction Kitchen (#16) shipped a cutting board whose aspect ran 1.10 to
**3.14** — a plank — because its WIDTH came from a viewport tier and its HEIGHT
from a fixed px/vh term, so nothing held the proportion. The real fix was one
line: derive the board from the same driver as the food.

Instead I also rewrote the card `max-width` ladder as a formula off the food
size. Those four widths — 1080/1240/1560/1740 — had been **probe-measured at
every tier floor in Italian** by the wide-viewport programme. My version shrank
the card to 931 at 1366 and dropped FILL at 2560 below its floor.
`audit-tool-wide-viewport.js` holds **1366 as a CONTROL cell that must equal its
baseline EXACTLY**, and that is what caught it. Without that gate the regression
was invisible: the tool looked fine.

⭐ **I then wrote the card HEIGHT as a formula twice, and was wrong both times.**
`fb*2.2+430` over-allotted the board nearly double its real height — that surplus
*was* the empty band the operator complained about. `fb*1.18+560` counted only
cut-mode chrome, so share mode (plates, faces, a second chip row) overlapped the
header and clipped its own controls. Both were me predicting a height the browser
already knows. `height:auto` in a centring root is exact in every mode, with no
term to keep in step. **If you find yourself maintaining a formula whose terms
must track the content, the content should be computing it.**

**How to apply.**
- Before touching a numeric constant, `git log`/`git blame` it. A comment saying
  MEASURED, or a companion baseline JSON, means hands off.
- Fix the coupling, not the numbers around it.
- Any gate with a "control cell / baseline / neutrality" check exists precisely
  to catch this. Run it *before* you commit a layout change, not after.
- Prefer `height:auto`, `min-content`, intrinsic sizing over a formula summing
  chrome you have to keep in step by hand.

**Companion rule — the sweep must reach the viewport the operator actually
uses.** Every gate here stopped at 1366; the operator is on ~2000. Everything
below 1366 was green while the class above shipped broken, twice in one session.
Extending the sweep to 320–2560 immediately found a *phone* defect I had just
introduced. **A viewport class a gate never visits is a viewport class that
ships broken.** Assert the proportion (aspect), the fill, and containment — not
just horizontal overflow — and do it in every MODE, since the worst case was the
mode I was not shooting.

Related: [[feedback-visual-qa-container-containment]] (the activity-side
desktop-first DoD), [[project_wide_viewport_program.md]] (whose ladder this
nearly undid).
