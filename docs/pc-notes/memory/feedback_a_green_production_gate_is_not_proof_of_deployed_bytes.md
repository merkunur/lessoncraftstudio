---
name: feedback_a_green_production_gate_is_not_proof_of_deployed_bytes
description: "A live-verify gate passed 108 assertions against a stale deploy, because every assertion tested the model and the model was identical in the broken build"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-09T20:12:54.481Z
---

**A GREEN PRODUCTION GATE IS NOT EVIDENCE THAT THE BYTES YOU WROTE ARE THE BYTES BEING
SERVED.** On tool #45 `live-verify` returned **PASS — 108 assertions against production**
while Cloudflare was still serving the *previous* build. `/mini-tools/` sends
`Cache-Control: public, max-age=3600`, so the old file sat at the edge for an hour under the
same `?v=1` cache key.

**Why:** every assertion in the file tested the **MODEL** — conservation through an exchange,
the lock in both directions, the carry, a record solved end to end. All of those were
**identical in the broken build**. The defect was in the PICTURE (counters drawn outside
their own column), and the gate had no eyes.

**Why:** I changed the `.js` and did not bump the wrapper's `?v=`. §A.13.42 says a
cache-buster bump belongs in the same commit as **every** `.js` change, and MEMORY already
records six commits lost to exactly this. It is not a rule about *significant* changes.

**How to apply:**
1. **Bump the cache-buster in the same commit as any `mini tools/*.js` edit.** No exceptions,
   no judgement about whether the change "needs" it.
2. **Make the production gate assert something that can only be true of the new build** — a
   rendered geometry, a new node, a changed count. Then the gate doubles as a deployed-bytes
   check. Model-only assertions certify whatever is on the edge.
3. **Compare the served bytes directly** when a fix is the point of the deploy:
   `curl …?cb=$RANDOM` (a cache-buster on the *probe*, or you measure the cache, not the
   origin) and compare length + a marker string against the local file.
4. ⚠ **Verify the probe before believing it.** My first comparison used
   `/i >= this\.BASE \? U \* 2\.4/` inside a shell heredoc; the shell ate the `\B`, the
   pattern could not match, and the probe reported the old code **"GONE"** from a file that
   still contained it — a wrong measurement agreeing with a wrong measurement. Print what the
   pattern matched, or assert a positive marker (`indexOf('OVER_ROWS') >= 0`) instead of an
   absence.

Related: [[project_exchange_machine_tool]] · [[feedback_verify_the_measurement_before_the_defect]]
· [[feedback_verify_rendered_not_source]] · [[feedback_poison_every_assertion_not_just_the_first]]
