---
name: feedback_nl_fanout_autocommit_no_ask
description: "Operator standing order — per-activity commit+push is AUTOMATIC, never ask for approval; no deploy until the whole nl program ends"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b693e745-7c59-48e7-8afe-9ff1ed2d7045
  modified: 2026-08-27T11:02:42.150Z
---

For the Dutch (nl) second-batch fan-out (and the same-shape locale loops), **after the LOCAL DoD is green, commit + push the activity immediately without asking for approval.** Do NOT deploy — the whole nl program deploys once at the very end.

**Why:** 2026-08-27 the operator reacted strongly ("Of course you should commit and push... Don't ask me again") when I paused to ask "shall I commit + push?" after finishing nl #2. Asking each time is unwanted friction — the build passing the DoD IS the go-ahead.

**How to apply:** The per-activity flow stays: operator says "continue" → plan mode → 3-agent native ensemble → ExitPlanMode (this is the ONE approval gate they still want) → build activity-layer → full §A.13.62 LOCAL DoD → **commit + push (NO deploy) automatically** → report done + move on. Never insert a "shall I commit?" question after the build. The ExitPlanMode plan approval already covers consent. See [[project_nl_secondbatch_fanout]].
