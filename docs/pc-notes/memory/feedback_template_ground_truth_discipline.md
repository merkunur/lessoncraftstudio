---
name: Behavior-describing content must cite source code it was verified against
description: When authoring per-(component, mode) prose templates / UI-mechanic guidance / kid-interaction descriptions, the content describes BEHAVIOR not DATA and is authored against the actual source code, not a mental model. Per-entry source-citation comments are mandatory; empty citation = defect. Sub-Phase 2.4 (commit `7eac8f50`) surfaced 4 of 10 templates drifted post-ship.
type: feedback
originSessionId: 12858146-3749-4191-b753-18ee82e70f50
---
**Rule:** When you author prose, templates, or guidance content that describes the BEHAVIOR of a component you have not directly observed (per-app templates, per-mode explanations, UI-interaction descriptions, correct-answer shapes), Phase 1 MUST verify the actual source code BEFORE authoring. Every template entry MUST carry a `// Verified against: <file>:<lines>` source-citation comment block in the canonical form per CLAUDE.md §A.13.29.

**Why:** Behavior content authored from mental-model assumption is the same defect class as TypeScript `any`: structurally permitted, semantically wrong. The Sub-Phase 2.4 incident demonstrated empirically — 10 per-(app, mode) prose templates shipped to production based on what "looked right" given the app names; ground-truth audit later showed **4 of 10 drifted** from actual app behavior:

- `find-and-count` template said "per-row counting"; ACTUAL is whole-grid category-counting with legend answer blanks (one blank per target image type in the legend).
- `more-less` template said "kid circles the group with MORE"; ACTUAL is "kid taps one of three symbol buttons (>, <, =) between the two groups". No circling involved.
- `word-guess` template used wrong param name "clue-density" as a content descriptor; ACTUAL param is `difficulty` (0/2/4/6 setting letter-reveal ratio per word).
- `odd-one-out` template said "kid circles the unrelated"; ACTUAL is "kid choice-taps one of 4 image buttons". The odd image is from a DIFFERENT PAIRED THEME the app rolls at deck-generation, not "unrelated generically".

The operator surfaced this as **content blindness**. The defect class generalizes to ANY external-behavior-describing content authored without reading the source.

**How to apply (any commission authoring behavior-describing content):**

1. **Phase 1 Explore against source code, not against mental model.** Launch an Explore agent (or direct Read+Grep) against `REFERENCE APPS/<app>.html` or the equivalent source file for the component you're describing. Identify per-(mode, params): mode dispatch (which params trigger which rendering), kid interaction (tap | circle | write | draw line | drag), answer shape, visual feedback, correctness criteria.
2. **Cite source per entry.** Above every template entry / behavior-describing block, place a comment block:
   ```
   // Verified against: REFERENCE APPS/<app>.html lines X-Y
   // Mode dispatch: <which params trigger which rendering>
   // Kid interaction: <tap | circle | write | draw line | drag>
   // Audited <YYYY-MM-DD> against actual app source.
   ```
   The file-level preamble in `frontend/scripts/lib/exercise-answer-templates.ts` (Sub-Phase 2.4) is the canonical pattern.
3. **Empty citation = defect.** Reviewer (operator OR self-audit) rejects content authored without a source citation. Same severity as a TS `any` or a missing test for a new code path.
4. **Re-verify on source change.** When the cited source component's rendering logic changes, grep for the cited line range; if shifted, re-audit the rendering behavior; update template prose + citation line range. Stale citations are silent drift accumulators.

**Where this applies (not exhaustive):**

- Per-(appName, exerciseMode) prose templates — the surfaced case
- Parent-letter / take-home-letter prose IF it claims specific exercise mechanics
- Sentence-strips guidance IF it claims specific UI layouts (sentence-frame templates themselves are operator-authored verbatim port = ground-truth by construction)
- Any future material-generator copy describing kid interactions, correct-answer shapes, or app-specific UI conventions
- Per-app "what does this generate" docs (admin tooling, marketing copy, support content, FAQ entries)

**Empirical anchor:** Sub-Phase 2.4 commit `7eac8f50` — 4 of 10 templates drifted post-ship. 25th §A.13.6 firing. Discipline established at fix time + reinforced at the multi-mechanism lock commission (this session, 26th §A.13.6 firing).

**Family:** sibling of [feedback_documentation_against_real_emitter.md](feedback_documentation_against_real_emitter.md) (documentation/config layer), [feedback_decision_premise_verification.md](feedback_decision_premise_verification.md) (decision-premise layer), [feedback_infrastructure_claim_verification.md](feedback_infrastructure_claim_verification.md) (infrastructure layer), [feedback_verification_regex_from_real_samples.md](feedback_verification_regex_from_real_samples.md) (verification-regex layer). All five describe the same pattern at different layers: **claims** (in code / docs / decisions / infra / behavior-description) **verified against real state** (emitter / codebase / production / app source) **before being relied upon**.

**Generalization:** any time you author content that describes external behavior you haven't directly observed, the source-of-truth is the source code, not a mental model. Read the source. Cite the source. Citations are audit-cheap and prevent silent drift.
