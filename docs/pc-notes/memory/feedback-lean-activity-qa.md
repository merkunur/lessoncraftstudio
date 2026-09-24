---
name: feedback-lean-activity-qa
description: "Operator's standing rule for how thorough/fast to QA activity builds — lean per-activity, NEVER whole-catalog sweeps"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 69ebeee1-4452-4c2a-809f-05377b5aff6d
---

Operator (2026-06-28, during the Otto/Willow reading-activity build) asked "why does it take so long? Is it really necessary?" then chose **Lean & fast** and added: **"apply the same for the future activity builds. Don't sweep the complete catalog ever."**

**The standing default for every activity build/fix from now on:**
- Per activity: run the **fast functional gates** (`verify-<core>.js`, `local-test-<activity>.js`, `preflight-activity-routes.js`) + the **activity-SCOPED** visual check `visual-qa-activity.js --activity=<id>` + a quick personal eyeball at phone+desktop. That's the whole DoD now.
- **NEVER run the whole-catalog sweeps** `scripts/audit-activity-mobile.js` or `scripts/audit-activity-variety.js` — they ignore `--activity` and audit all ~90 activities, which is the slow part and almost entirely wasted on a single build. The per-activity `visual-qa-activity.js` + `local-test` already cover mobile-fit + ≥7-variety + reshuffle for the one activity being built.
- Skip the multi-round visual-critic agent loop unless something looks off in the eyeball.

**Why:** the §A.13.62 full DoD (6-viewport sweep + critic + catalog-wide audits) was the long pole and the operator found it excessive for routine builds. This relaxes §A.13.55/§A.13.60/§A.13.62 from "run every gate exhaustively" to "run the per-activity gates only." The locked *intent* (no cut-off/overflow/tiny/answer-leak reaches the operator) still holds — `visual-qa-activity.js --activity=<id>` is MEASURED and still catches cut-off (it caught Otto's r7 cut-off in this very session). **How to apply:** still fix any real defect the scoped gate finds (never move a threshold); just don't broaden the run to the whole catalog. Relates to [[feedback-visual-qa-container-containment]].

**Refinement (2026-06-28, Hopper build): the scoped `visual-qa-activity.js` only drives the FIRST-PAINT phase of an activity.** For a MULTI-PHASE activity (e.g. a modeler: model-phase → dial-phase), the later phase is often TALLER and the scoped gate NEVER renders it (it doesn't drive the controls), so a fold cut-off there ships green. Hopper's dial phase was cut off at 320×640, 360×740 AND desktop 1024×900 while first-paint passed 54/54. **RULE: for any phase the scoped visual-qa can't reach (anything past first paint — dial/recap/solved/feedback states), capture+measure that phase's fold by hand (a tiny puppeteer script that sets the state then measures the lowest control vs viewport) before "done."** Fix a cut-off by compacting/collapsing UI (the vet/Bram pattern: drop the modeling controls once you advance to the answer phase) — never move a gate threshold.
