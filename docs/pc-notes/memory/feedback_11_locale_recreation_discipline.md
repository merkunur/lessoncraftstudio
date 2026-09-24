---
name: feedback-11-locale-recreation-discipline
description: "Standing rule for any commission requiring all-11-locale i18n recreation — plan-mode-per-locale + 3-agent native ensemble (linguist + marketing + K-3 educational expert). Operator-locked from this session's homepageV3 arc."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0c75407d-d747-4855-9a05-93b0e6f6f123
---

**Standing rule** (operator-locked across the 10-commission homepageV3 arc this session): when a commission requires recreating (not translating) a content namespace across all 11 supported locales, the workflow is:

1. **Enter plan mode** for each non-EN locale individually (never batch 10 locales in one execution).
2. **Launch a 3-agent ensemble in parallel** (single message, multiple Agent tool calls): one native **linguist**, one native **marketing expert**, one native **K-3 educational content expert** — all native to the target locale, all running concurrently.
3. **Synthesize** their three reports. Surface convergences + divergences explicitly. Note where the 3 agents disagree and which one you weighed heaviest with rationale.
4. **Use AskUserQuestion** for the highest-impact operator-strategic decisions — typically: squiggle/curriculum-framework target, mock panel demo language, register choice (formal vs informal vs mixed), card/image swap requirements.
5. **Write the recreated copy** into the plan file as a string-by-string table (KEY | EN baseline | RECREATED | Synthesis rationale).
6. **Call ExitPlanMode** for operator approval.
7. **Apply** after approval — write the locale's namespace into `frontend/messages/<locale>.json`, plus any component-side changes (e.g., card3 per-locale image map in `PillarActivities.tsx`).
8. **Commit** with locale tag: `[FEATURE][PROTOTYPE] Homepage v3 <LANG> recreation — data-only addition (+ card3 <locale>-locale map)`. For Nordic+Finnic locales (sv/da/no/fi), add `[NSR-FLAG][<LOCALE>]` per CLAUDE.md §17.5.1.
9. **Push + deploy** (`bash /opt/lessoncraftstudio/deploy.sh`) per locale.
10. **Verify** via curl spot-check (~15-17 representative recreated strings per locale + raw-i18n-key leak check + DOM audit for image/tile changes).

**Why**: This was empirically validated across 10 locales in succession (PT, IT, NL, SV, DA, NO, FI plus the 3 earlier in-session DE/FR/ES). Operator's recurring pain was that prior batched-translation attempts missed strings, used wrong register, made wrong squiggle-target calls, etc. The plan-mode-per-locale + 3-agent discipline catches these BEFORE shipping by forcing explicit synthesis + operator approval per locale.

**How to apply**:

- **Don't** batch all 11 locales as one execution.
- **Don't** translate — recreate (operator-locked terminology: "Don't translate — recreate").
- **Don't** use a single agent ("translator") — always launch the 3-agent ensemble per locale.
- **Do** make the 3 agents run in PARALLEL (single message with 3 Agent tool calls), not sequentially.
- **Do** preserve cross-locale precedents — e.g., card 3 syllable mockup must use a 3-syll subject; if FI needs an animal image swap because "elefantti" is 4 syll, document it as a precedent for future locales.
- **Do** consult per-locale curriculum-framework taxonomy at CLAUDE.md §A.13.49 before relaunching agents (avoids re-discovering the same squiggle target).
- **Do** flag NSR review for SV/DA/NO/FI in the commit message per §17.5.1.

**Empirical anchors** (this session):
- 10 plan-mode commissions: DE / FR / ES / PT / IT / NL / SV / DA / NO / FI homepageV3 recreations.
- Each ~5K-15K tokens per Agent × 3 agents = ~15-45K tokens per locale Phase 1.
- AskUserQuestion key decisions: 2-3 per locale (squiggle target, mock-panel language, register/card-subject when locale-specific).
- 1 follow-up batch (worksheetsPage namespace): when the namespace is small (10 keys × 11 locales = 110 entries), the batch-fanout approach is acceptable using vocabulary patterns established from the prior 10 plan-mode commissions.

**When NOT to apply this pattern**:
- Single-string edits (a typo fix).
- Bug-fix CSS / layout changes (not content recreation).
- Cleanup/refactor of existing i18n keys without content change.
- Namespaces ≤5-10 short strings that can be confidently batched per agent-vocabulary precedent.

**Cross-references**:
- [[project-homepage-v3-live]] — what the discipline produced
- [[project-homepage-v3-deferred-followups]] — Nordic+Finnic NSR review still queued
- CLAUDE.md §17.5.1 — NSR-flag Nordic+Finnic doctrine
- CLAUDE.md §A.13.49 — per-locale curriculum-framework squiggle taxonomy (locked from this discipline's outputs)
