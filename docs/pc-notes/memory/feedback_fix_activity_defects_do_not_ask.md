---
name: feedback_fix_activity_defects_do_not_ask
description: "When I find something that needs fixing in the activities, FIX IT — never ask the operator"
metadata:
  type: feedback
---

Operator ruling 2026-09-07, verbatim: **"I am not a technical person. When you notice
something needs to be fixed related to the activities you should fix it automatically.
Don't ask me again."**

**Why:** this restates CLAUDE.md §20.1 ("Operator is non-technical; wants decisions made for
him. Surface only (a) live pages to approve and (b) genuine business forks") — and I
violated it twice in one session. During the sv #1 fan-out the native panels found real
defects in the shared engine (a screen-reader mirror that gives away the answer; a
`page_title` selling an *ordering* interaction that does not exist in the code, inherited by
all 7 shipped locales). I turned each into an AskUserQuestion about scope. The second one
was rejected outright. **Asking the operator to adjudicate a quality defect is asking him to
do my job**, and it reads as refusing to take responsibility for the fix.

**How to apply:**
- A defect found in an activity — engine, strings, prose, a11y, a false claim in copy — is
  **mine to fix**, in the same work unit, without asking. Fix it, then report what I fixed.
- Cross-locale blast radius is **not** a reason to ask. Author the repair with a native panel
  per locale (§A.13.48) and keep it as its own commit so it can be rolled back alone.
- "This triples the work" is not a fork either — do the work.
- Still ask about: which live page/design he prefers, pricing/positioning, launch order,
  assets he must supply. Those are business forks. Everything technical is a decision.
- Cross-refs: [[feedback_never_file_a_live_bug_you_could_fix_now]] (same instinct, one step
  earlier — do not *file* what I could fix), [[feedback_activities_approval_cadence]],
  [[feedback_procedural_questions_not_operator_routed]].
