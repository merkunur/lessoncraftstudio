---
name: feedback-es-fanout-autocommit
description: "Spanish (Mexican) activity fan-out — commit+push automatically after each activity's DoD passes; do NOT ask for approval to commit"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1252178e-b7e7-4f94-9e26-ec0cc1098fd2
---

For the **Spanish (Mexican) second-batch activity fan-out** (and the same pattern for any
one-activity-per-session locale fan-out), **commit + push automatically as the final step of each
activity, the moment the §A.13.62 LOCAL DoD passes.** Do NOT stop and ask "approve to commit?" /
"do these look good to commit?" — that gate is unwanted and the operator got angry twice at having
to reply "commit and push" every time.

**Why:** the operator said "build them one by one" and "you are supposed to commit and push after
you complete each activity." Re-asking wastes their attention and reads as not listening.

**How to apply:**
- The ONLY approval gate in this loop is the plan-mode/ensemble gate the operator explicitly set:
  ask to switch to plan mode before STARTING each activity (so the 3-agent native ensemble runs),
  ExitPlanMode for plan approval. That's it.
- After building activity-layer edits + running the full DoD (node --check, verify-<engine>-core,
  verify-activity-content-es, preflight, visual-qa es+en, personal Read, visual-critic, EN-leak
  grep, git diff 0-core) and it's all green → stage exactly the ~5 files → commit + push to
  `pivot/printable-business-toolkit` → **NO deploy** (es batch deploys once at the very end).
- Still show the screenshots + a short completion note in the SAME turn as the commit — the operator
  wants to SEE the result, just not be asked permission to commit it.
- This supersedes the "show screenshots → approve → commit" cadence I mistakenly carried over from
  the German recipe. Related: [[feedback-activities-approval-cadence]], the German fan-out SoT.
