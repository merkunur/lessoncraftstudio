---
name: feedback_agreement_between_panels_is_not_confirmation
description: Independent expert panels that read the same file can share a premise and be wrong together — four agreed on a defect that measurement refuted
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T01:37:26.346Z
---

**Four of the eleven #47 native panels independently reported the same defect — and it did not
exist.** Each said `saidHead` over-reports after the STACK move: that pressing a header on the
stacked residue announces six products while only one card in that row is standing. Three of them
cited the exact source lines. It reads like overwhelming confirmation.

**One `node -e` refuted it in ten seconds.** The announced sequence `k × live[]` is *exactly* the
standing cross's products, because the cross always retains one of each commutative pair — the
missing half is held on the other side. The Spanish panel was the only one that ran the check, and
it reported the code CORRECT.

**Why:** every panel read the same file, and the file's own `_ringSet` head branch builds keys for
cells that no longer have cards. From that shared premise the wrong conclusion follows naturally, and
it follows *for all of them*. They were not independent observers; they were one observer sampled
four times.

**Why it matters:** the recorded doctrine on this platform is that native panels routinely find
defects no gate can see, and they do — the same eleven panels found fifteen real ones on that build,
four of them in the model. That track record is exactly what makes a false positive dangerous:
weight-of-agreement is the heuristic that would have shipped a "fix" to correct code.

**How to apply:**
- **Count measurements, not agreements.** Four panels reporting a defect is one hypothesis, not four.
- **Reproduce before fixing, every time** — the standing rule already says this for a single panel;
  it applies *more* when several agree, not less.
- **Prefer the panel that RAN something.** One agent that executed the model outranks three that read
  it, and say so when reporting.
- **Note the shared premise in the write-up.** "Four panels reported X; measurement refuted it; the
  shared premise was Y" is the useful record — it stops the same wrong conclusion being re-derived
  next build.
- The converse also held on that build: the Danish panel found two real defects **in the ban file**
  by running `checkStrings`, which no amount of reading had surfaced.

Related: [[feedback_native_panels_read_the_model]] · [[feedback_verify_the_measurement_before_the_defect]] ·
[[project_times_shelf_tool]]
