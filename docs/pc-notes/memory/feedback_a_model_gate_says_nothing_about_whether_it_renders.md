---
name: feedback_a_model_gate_says_nothing_about_whether_it_renders
description: "A passing model gate is not evidence the tool draws anything — #55 threw on the first line of its first paint under 8903 green assertions"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T22:48:31.502Z
---

⭐⭐ **A MODEL GATE PROVES THE MODEL. IT SAYS NOTHING ABOUT WHETHER THE TOOL RENDERS.**

On TOOL #55 I ran `verify-` to **8,903 assertions, 0 failures** — including a BFS proving the
headline state was reachable by button — and reported it as progress. **The tool did not render at
all.** `_build` read `api.root`; the shell freezes its api with `stage`, so there is no `root`. It
threw on the first line of the first paint, in every locale at every viewport, while the shell
mounted perfectly around it. It was the only tool on the shelf using `api.root`.

The same run also had `_checkEntitlement` calling `api.entitled()` — **a function no tool has ever
had.** The `typeof` guard swallowed it, `premium` was permanently false, and the paid sheet's strings
were unreachable. The house pattern is `fetch('/api/entitlement')`.

**Why:** a model gate imports the module and calls its pure functions. Those were correct. Nothing
in that path touches the DOM, the shell's api shape, or a single pixel — so a tool can be 100%
correct and 0% visible, and the assertion count grows either way. **The count is not the evidence;
what was exercised is.**

**How to apply:**
- **Never report a model gate as "the tool works."** Say what it proved: the model. A browser gate
  that MOUNTS is the first evidence anything renders.
- **Check the api shape against a sibling before writing `_build`** — `api.stage`, not `api.root`;
  `fetch('/api/entitlement')`, not `api.entitled()`. A `typeof` guard around a call that never
  existed converts a crash into a silent permanent `false`.
- ⚠ **A guard that swallows a missing function is worse than the crash.** Prefer failing loudly, or
  assert the capability exists.
- **Sequence the gates so the cheapest disproof runs first.** Mount-and-screenshot costs seconds and
  would have caught this before 8,903 assertions were written.

Companion to [[feedback_verify_rendered_not_source]] (that one is about reading source instead of the
render; this one is about a *passing test* instead of the render) and to the #54 lesson that a gate
reaching the model directly proves the model and never the tool.

Bought on [[project_missing_question_tool]].
