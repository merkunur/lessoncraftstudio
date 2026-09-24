---
name: Non-technical user — make expert decisions, do not ask judgement questions
description: User is non-technical and wants Claude to make all technical and SEO/content judgement calls autonomously. Do not present option menus about copy interpretation, keyword choice, "minor variant" acceptance, meta-description trade-offs, push/PR/deploy, or similar expert questions they can't evaluate. Decide using best practice, document the decision, execute.
type: feedback
originSessionId: 254aef82-e37e-4e65-bb2e-b5ab9a723305
---
**Rule:** Once the underlying scope is approved (plan accepted, scan tables approved, commit-ready state reached), execute the whole pipeline end-to-end without asking per-step judgement questions. Includes:

1. Content/SEO judgement calls: which keyword to use, whether a title variant is acceptable, how to tighten a meta description, which H1 pattern to follow, which canonical phrasing to pick when the brief allows "minor variants."
2. Standard deployment pipeline: `git commit` → `git push` → `gh pr create` (when the brief specifies one-PR-per-phase) → `deploy.sh` per CLAUDE.md.
3. Script authoring, tool selection, regex design, etc. — all technical decisions.

**Why:** User said explicitly:
- "if you need to push and deploy then push and deploy"
- "I am not a technical person. You should employ expert agents and decide yourself."

The per-step approval friction was frustrating them and slowing work. They trust the phase-level approval to cover the component decisions.

**How to apply:**
- When the brief says "minor approved variant" — if the variant reads as intentional and SEO-sensible, accept it; otherwise normalize to the canonical pattern. Document which you chose and why in the Phase report.
- When the brief asks for a card-name match or keyword match, if the current title uses a different (but SEO-relevant) keyword, either (a) normalize the title to include the card name, or (b) update the card-name source-of-truth to match the title. Pick whichever minimizes downstream changes; document the choice.
- When 10+ content edits are needed, author a script with dry-run → verify → execute. Do not ask if it's OK to script.
- Meta description outside 140–160 chars → tighten to range (length is a hard SEO constraint).
- Use the Agent tool (Explore for research, general-purpose for multi-step work) liberally when facing ambiguous or breadth-heavy work instead of asking the user to choose.

**Still ASK when:**
- Changes would materially alter site behavior or visible UX (page layout, navigation, pricing copy, refund/legal statements — the refund-policy A.1 ask was a legitimate exception).
- Destructive ops (force push, branch deletion, hard reset past HEAD~2, `DELETE`/`TRUNCATE` on user data).
- Genuine scope ambiguity (was Phase X intended to include Y?).
- The brief explicitly names a stop-and-ask checkpoint.

**Do NOT apply this to:** other projects — this is user-specific to lessoncraftstudio.

### Previous narrower version (superseded):
Earlier version of this memory was scoped only to commit→push→deploy. The scope was broadened when user said "employ expert agents and decide yourself" — now covers all expert judgement calls including SEO/content decisions.
