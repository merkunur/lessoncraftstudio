---
name: Queue write-back discipline — items mentioned in handoff-rhetoric or authorization-message anchoring must be written back to canonical queue files at end of session
description: Working artifacts (handoff documents, mental models, conversation rhetoric) drift across sessions; canonical files do not. At end of every session, items mentioned in handoff-rhetoric or authorization-message anchoring must be written back to canonical queue files. Surfaced at Brief B Phase 5 sealing 2026-04-29 when project_claude_md_pending_updates.md was discovered empty despite operator-mental-model anchoring "21 items" and phase-status file claiming "item 20 queued."
type: feedback
originSessionId: 057417cc-7dfe-42b6-a061-d175d9f2e80f
---
**Rule:** At the end of every session, items mentioned in handoff-rhetoric or authorization-message anchoring must be written back to canonical queue files. Working artifacts (handoff documents, mental models, conversation rhetoric, phase-status summaries) drift across sessions. Canonical files do not. The canonical file is the source of truth; everything else is a working artifact that may or may not reflect canonical state.

**Why:** Three sources reporting three different states is the failure mode. When `project_claude_md_pending_updates.md` (canonical), CONVERSATION-HANDOFF.md (working artifact), and authorization-message rhetoric (in-conversation working artifact) all describe the same queue, drift between them is invisible until someone audits all three. The canonical file is durable; the working artifacts are not. If the working artifacts are wrong about what's in the canonical file, the wrong claim propagates session-to-session through the working artifacts while the canonical file silently stays at whatever-was-last-actually-written.

**How to apply:**

1. **Identify canonical files for each working concept.** CLAUDE.md amendments queue → `project_claude_md_pending_updates.md`. Deferred-queue items → `project_deferred_items_queue.md`. Phase status → `project_brief_b_phase_status.md`. K-3 NSR flags → `project_k3_phrasing_native_speaker_review.md`. Etc.
2. **At end of session,** before context closes or handoff is written, audit the canonical files for each topic that came up. Are the items mentioned in conversation actually in the canonical file? If not, write them back.
3. **In the handoff document,** when referring to a queued item, write the citation in the form "[item description] — see <canonical file>" rather than restating from memory. Forces verification at write time.
4. **At session restart,** when picking up "what's queued," read the canonical file FIRST. If the handoff document's claim diverges from the canonical file, trust the canonical file. Surface the divergence as drift to be reconciled.

**Instance that surfaced this rule (Brief B Phase 5 sealing 2026-04-29):**

- Canonical queue file `project_claude_md_pending_updates.md` line 15: "(Queue currently empty — Sub-phase E close-out batch applied 2026-04-28 in commit `388dd7d6`...)" — zero pending items.
- Operator mental model anchored "21 items" (per CONVERSATION-HANDOFF.md and authorization-message rhetoric across multiple prior sessions).
- Phase-status file `project_brief_b_phase_status.md` claimed "item 20 queued for Phase 6: publish-cli strict-arg-parsing contract documentation."
- **Three sources, three different states.** Canonical = empty; working artifact (handoff) = "21 items"; working artifact (phase-status) = "item 20 queued."
- The canonical file held the truth. The working artifacts had drifted across sessions; items mentioned in handoff-rhetoric or authorization-message anchoring had never been written back to the canonical file. The drift compounded: each subsequent session inherited the wrong mental model from the prior handoff document.
- **Resolution at Phase 6 brief drafting (2026-04-30):** operator authorized explicit re-queue of all 8 items + 11 §15.x carry-forward into the canonical file. Phase 6 Commit 1 (`ec85a594`) landed the documentation. Phase 6 close-out moved the 19 items from Pending to Applied.
- **Methodology: write-back at end-of-session, audit at start-of-session.**

**Generalization:** at end of every session, items mentioned in handoff-rhetoric or authorization-message anchoring must be written back to canonical queue files. At session restart, read canonical files first; treat working-artifact claims as suspect until verified against canonical.

**Family:** distinct from the claims-vs-real-state family (`feedback_documentation_against_real_emitter.md` / `feedback_decision_premise_verification.md` / `feedback_infrastructure_claim_verification.md`) — those describe verification of factual claims at decision time; this describes the discipline of keeping canonical files in sync with working artifacts. Different layer of the same operational hygiene principle.
