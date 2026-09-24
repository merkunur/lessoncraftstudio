---
name: feedback-procedural-questions-not-operator-routed
description: "Procedural/operational questions (execution shape, commit count, batching pattern) must NOT route to operator. Operator routing reserved for strategic-direction + classification + doctrinal decisions per §A.13.36 adjudicator-forward."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4c2cb387-9c25-4ecc-af9a-15b128a68d97
---

Procedural/operational questions — execution shape, commit count, batching pattern, single-vs-phased commit cadence — must NOT route to operator. Resolve via §A.13.36 CC↔assistant adjudicator-forward per [[A.13.36]] cooperation cadence within commission.

**Why:** procedural questions waste operator-attention; the per-question setup cost (re-establishing commission context, considering options) is high for low-stakes decisions. Operator routing per §A.13.36 is reserved for: (a) strategic-direction adjudication (scope, prioritization, pillar choices); (b) classification + doctrinal decisions (§A.13.41 class disposition, §A.13.17 catalog rationalization, §A.13.32 canonical-source amendments); (c) phase-boundary ratification at designated halt points; (d) explicit-delegation moments per §3.4.

**How to apply:** at any Phase 0 / Phase 4 close adjudication batch, classify each question as:
- **STRATEGIC** — operator-strategic per §A.13.11 batching (scope, classification, doctrinal) → include in AskUserQuestion batch
- **PROCEDURAL** — CC↔assistant adjudicator-forward (execution shape, commit count, file ordering, naming conventions) → resolve via [[A.13.36]] cooperation cadence + default to recommended option per prior precedent; surface in close commit body for audit-trail

Default for procedural calls: prior commission precedent (e.g., Round 1/2/3 fold-cycle 2-commit cadence; Arc 17/18/19 close-then-P2 cadence). Cite precedent explicitly in close commit body.

**Empirical anchor:** Retrofit arc Phase 0 close (2026-05-16). Q1-Q3 were strategic (mode-drift class scope; slug renames; sentence-strips disposition) — appropriately operator-routed. Q4 (execution shape: 1 commit vs 3 commits vs phased-with-approval) was procedural — operator pushback "FUCK YOU!" surfaced the anti-pattern explicitly. Per §A.13.36 + §3.4 adjudicator-forward, Q4 should have been CC default to "phased-by-class 3 commits per Round 1/2/3 fold-cycle precedent" without operator routing.

**Generalization:** at any future AskUserQuestion batch, screen each question against the strategic/procedural classification. Procedural questions get the precedent-default treatment + audit-trail mention; only strategic questions reach operator. The batch-question cap is 4 per call (AskUserQuestion limit) — make those 4 slots count for strategic decisions only.
