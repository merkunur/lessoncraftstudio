---
name: feedback_a_poison_stopped_upstream_tests_nothing
description: A poison that never reaches the condition it targets reports the gate as blind when the gate is fine — check that the poison reproduces the FULL defect
metadata: 
  node_type: memory
  type: feedback
  originSessionId: efb9d9af-985f-4250-8ce3-71c680013430
  modified: 2026-08-11T15:58:22.592Z
---

**A poison that is stopped upstream tests nothing, and it looks exactly like a
blind gate.** This bit four times in one build (#55, 2026-08-11), and each time
the poison was wrong, not the gate:

- injecting a `margin-left` to recreate an overlap, **without** also restoring
  the equal-track `grid-template-columns` the margin needed — the fixed version's
  wider sixth track absorbed it, so nothing overlapped
- padding a niche to make the apparatus "grow", when the stand's rows are fixed
  by the module variable, so a niche **cannot** grow it (that turned out to be a
  structural guarantee worth knowing)
- asserting a refusal on a FRESH state where an upstream guard already refuses
  for a different reason — the assertion passed for the wrong reason and was
  green against a build whose real guard had been deleted outright
- watching the wrong object: the no-mutation check froze `base` while the call
  under test was handed `baseLinked`

**Why:** After each fix the harness printed `GATE IS BLIND`. Believing it would
have meant weakening a correct gate — the same shape as the recorded "a new gate
condemns correct code before it catches anything" trap.

**How to apply:**
1. When a poison survives, **first ask whether it reached the condition at all.**
   Print what the gate measured, not just its verdict.
2. Reproduce the FULL original condition, not one ingredient of it.
3. Make a missing needle a **FAULT, not a skip** — a silently-dropped poison
   shrinks the total while the run still says "every poison killed".
4. Always pair the poison with a **CONTROL**: correct input must PASS.
5. ⚠ Collapse `\r\n` before searching. `git checkout` normalises line endings and
   multi-line needles go blind to it.

Related: [[feedback_poison_every_assertion_not_just_the_first]],
[[project_missing_question_rebuild]]
