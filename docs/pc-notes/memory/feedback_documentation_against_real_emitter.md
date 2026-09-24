---
name: Documentation and config authored against real emitter, not mental model
description: Whenever documentation OR a config file describes a contract between two components, write against the actual emitting component's source — not against the conceptual shape that "looks right." Two instances cited (D3 §16.5 placeholder names; D4 topics-taxonomy.json picture-sudoku key); both surfaced in Brief B Phase 2 / D3 fix-up.
type: feedback
originSessionId: 057417cc-7dfe-42b6-a061-d175d9f2e80f
---
**Rule:** Any time documentation OR a data-config file describes a contract between two components, write against the actual emitting component's source. Mental model "this is roughly the shape" is not enough. Open the file. Read the actual constants, function signatures, key names, value types. Cite line numbers when authoring references.

**Why:** Emitting components are the source of truth for the contract. Documentation that describes a contract from the consumer's expected shape is documentation that diverges from reality the moment the emitter's actual shape changes. Two instances surfaced in close succession demonstrated this is a recurring drift pattern, not a one-off.

**How to apply:**

1. Before authoring any CLAUDE.md section that describes a contract (placeholder names, function signatures, config schema), find the source-of-truth file and read it.
2. Before authoring any config file that consumes another file's emitted values (taxonomy keys, registry entries, mapping tables), find the emitting code and confirm the value names verbatim.
3. Cite the source: line number reference (e.g., `catalog-export.js:34-46`) makes the authoring traceable and audit-cheap.
4. At amendment-application time, re-verify cross-references against the emitter (the `b03ff5c9` / `388dd7d6` precedent — drift catches happen at apply, not at draft).

**Two instances that surfaced this rule (Brief B Phase 2 / Drift D3 fix-up):**

- **D3 (CLAUDE.md authoring).** §16.5 placeholder names committed at `f75e8d1e` against theoretical shapes — `__LINK_EXERCISE_TYPE__`, etc. — rather than `catalog-export.js:34-46`'s actual emission shapes (`__LINK_MORE_TYPE__` family). `__END_DECK_HEADING__` was missing entirely from the original §16.5 inventory because the brief author hadn't read the emitter source. Resolved standalone at `86a3b9be` with cross-checking the published `?v=9` cache-buster against production curl.
- **D4 (config-file authoring).** `topics-taxonomy.json` keyed `picture-sudoku` rather than the canonical `sudoku` (per §14.10) which is what `generator.app` actually emits. The brief author had used the app's friendly-name "Picture Sudoku" mental model rather than reading the deployed app's manifest output. Synthetic Phase 2 ZIPs had the same drift baked in. Resolved at `59a0cde9` with three-step fix: taxonomy edit + test-fixture audit + 29-app forward-look (every app's `generator.app` cross-checked against §14.10 canonical name; PASSED clean).

**Family:** parent of `feedback_decision_premise_verification.md` (decision-premise layer) and `feedback_infrastructure_claim_verification.md` (infrastructure layer). All three describe the same pattern at different layers: claims (in docs / decisions / infra) verified against real state (emitter / codebase / production) before being relied upon.

**Generalization:** any time documentation OR data-config describes a contract between two components, write against the actual emitting component's source, not against the conceptual shape. This is the same principle as `feedback_verification_regex_from_real_samples.md` applied at the documentation/config layer rather than the verification layer.
