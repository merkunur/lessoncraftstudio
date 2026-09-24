---
name: feedback_a_census_is_only_exhaustive_over_the_space_you_let_it_see
description: "A gate proved conservation 118,000 times and certified the one configuration where conservation failed, because it never enumerated a state the bug could reach"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-09T22:15:17.499Z
---

**A CENSUS IS ONLY EXHAUSTIVE OVER THE SPACE YOU LET IT SEE — and "exhaustive" is the word that
stops you looking.** Tool #46's gate enumerated every legal state of every tray from 1×1 to 10×10 —
3,400 states, 118,000 assertions — and asserted conservation on every one. The tool also ships a
setting that raises the ceiling to 12. `rotate`, `crack` and `push` rebuilt the state without
passing that ceiling, so it fell back to 10 and the dimension was silently clamped: **a 12×7 tray of
84 buns became 70 on a turn.** The tool's one claim, false in exactly the configuration its second
setting sells.

⚠ **Worse than missing it: the gate CERTIFIED it.** The clamp test fed `11` into its junk list and
asserted the result lands at 10 — correct for a default tray, and precisely the bug for a raised
one. A guard written against one configuration will happily prove the other one wrong.

**How to apply:**
1. **Enumerate the CONFIGURATION SPACE, not just the state space.** Every setting that changes a
   bound is a second census. Ask: what setting, mode or entitlement changes the range of any value
   this gate iterates? Then run the census again inside it.
2. **When a value has a ceiling, put the ceiling ON THE THING**, not in the argument list. Every
   mutator that rebuilds state must carry it, and the only way to guarantee that is to make
   forgetting impossible rather than to remember.
3. **Poison the configuration boundary specifically.** Three mutations now cover this class:
   dropping the ceiling in the turn, dropping it in the break, and removing it from the state
   entirely. Before, none existed, because the space they act on was never visited.
4. ⭐ **The people who find this are the ones who RUN the model, not the ones who read the gate.** A
   Portuguese native panel found it in node while checking whether a settings label was honest. The
   gate's author is the last person likely to notice the space the gate does not enter.

Related: [[project_baking_tray_tool]] · [[feedback_poison_every_assertion_not_just_the_first]] ·
[[feedback_native_panels_read_the_model]] ·
[[feedback_a_green_production_gate_is_not_proof_of_deployed_bytes]]
