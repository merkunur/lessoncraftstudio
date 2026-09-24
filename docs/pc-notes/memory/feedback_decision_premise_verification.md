---
name: Decision-premise verification — operator-supplied factual claims about codebase state checked against real source before locking
description: When operator-supplied reasoning at a decision point contains factual claims about codebase state (schema enums, column types, file presence, function signatures), verify against real source before locking. If claim is wrong, surface for re-confirmation regardless of whether the operator's preferred direction is still defensible. Surfaced at Brief B Phase 5 v1→v2 brief lockdown.
type: feedback
originSessionId: 057417cc-7dfe-42b6-a061-d175d9f2e80f
---
**Rule:** When operator-supplied reasoning contains factual claims about codebase state — schema enum values, column types, file presence, function signatures, locked rule wording — verify against real source before locking the decision. If the claim is wrong, surface the correction even when the operator's preferred direction is still defensible on other grounds. Two layers of verification (substantive grounds + factual premise) are independent; both must pass.

**Why:** Operator reasoning at decision points often blends substantive judgment (scope-grounds, strategic-grounds) with factual premises about codebase state (schema-grounds, capability-grounds). The substantive judgment is the operator's call. The factual premises are checkable against real source. Conflating them — or treating the factual premises as authoritative just because the operator stated them — drifts the decision-making away from real constraints. Surfacing factual corrections preserves operator authority over the substantive decision while keeping the engineering grounded in real state.

**How to apply:**

1. When operator-supplied reasoning at a decision lockdown contains a factual claim ("the schema has X column"; "the existing parser does Y"; "the helper accepts Z"), pause before locking.
2. Verify the factual claim against real source: read the file, query the database, run the command. Cite the source line.
3. If the claim was wrong, surface the correction explicitly: "The actual state is <X'>; this changes the implementation cost from <A> to <B>; do you want to reconfirm <preferred direction> on those grounds?"
4. If the substantive direction is still defensible after correction, lock and proceed. If the correction changes the cost-benefit, the operator may pivot.
5. **Don't quietly lock around the factual error.** Even if the engineering still works out, a wrong factual premise in the brief contaminates downstream reasoning and gets cargo-culted into the next decision.

**Instance that surfaced this rule (Brief B Phase 5 v1→v2 brief lockdown 2026-04-29):**

- Operator-supplied Q2 reasoning leaned on a schema-cost claim (paraphrased): "schema doesn't have a `status` column; `unpublished` is a new enum value to add." Substantive direction: Path A (block-on-archived-reuse) over Path B (allow-reactivation).
- Real schema state (verified against `frontend/prisma/schema.prisma` + production DB): `status` enum already exists with values `draft | published | archived`. `archived` is the existing correct marker for an unpublished deck; no schema change needed.
- The substantive Q2 decision (block-on-reuse vs reactivation) was scope-grounds (out-of-scope for Brief B) and remained Path A regardless of schema reality.
- BUT the schema-reality correction was significant: it meant code-only logic in `publish.js` + `bulk.js` was sufficient (no Prisma migration needed). Implementation cost dropped meaningfully.
- The correction was surfaced for reconfirmation; operator held Path A on the (still-defensible) scope-grounds. Lock proceeded with corrected schema understanding. Phase 5 commit `0ad626cb` shipped the code-only block.

**Generalization:** when operator-supplied reasoning contains factual claims about codebase state, verify against real source before locking; if the claim is wrong, surface for re-confirmation regardless of whether the operator's preferred direction is still defensible. Two layers of verification (substantive + factual) are independent.

**Family:** sibling of `feedback_documentation_against_real_emitter.md` (documentation/config layer) and `feedback_brief_review_against_explicit_rules.md` (engineering-claim layer). All three describe the claims-vs-real-state pattern at different decision layers.
