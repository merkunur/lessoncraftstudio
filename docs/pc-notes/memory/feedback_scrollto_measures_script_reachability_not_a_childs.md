---
name: feedback_scrollto_measures_script_reachability_not_a_childs
description: "window.scrollTo scrolls an overflow:hidden root, so a reachability gate built on it certifies pages a child cannot scroll — use page.mouse.wheel"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T23:16:36.182Z
---

⭐⭐ **`window.scrollTo` MOVES AN `overflow:hidden` ROOT. A CHILD'S SWIPE DOES NOT.**

TOOL #55's probe carried an assertion whose docblock read *"REACHABILITY, MEASURED — NOT INFERRED
FROM A CSS PROPERTY"*, written specifically for the #22 defect class (a control physically
unreachable below the fold on a standalone phone). It called `window.scrollTo(0, 999999)` inside
`page.evaluate`, then measured whether the lowest control had come into view.

**It could not fail on either single-rule removal.** Poisoned both directions, both PASSED. Measured
at 320×568 with the `html.x{overflow-y:auto}` rule removed:

```
html rule removed:  html overflow-y=hidden   window.scrollTo moved 582px  -> "REACHABLE"
both rules removed: html overflow-y=hidden   window.scrollTo moved   0px  -> unreachable
```

`overflow:hidden` blocks **user input**, not scripted scrolling. So the page could scroll 582px for
a script and **zero** for a child, and the gate reported the child was fine.

**Why this is the sharpest version of the family:** the assertion was not lazy, not vacuous, and not
a property check — it was a *measurement*, of the wrong actor. It measured **script** reachability
while claiming **user** reachability, and the tool was safe only because a weaker STRING check in
`verify` happened to kill the same mutations. The strong-looking guard was the broken one.

**How to apply:**
- **Drive real input.** `page.mouse.wheel({deltaY})` in a loop, or a touch drag — both are real events
  and obey `overflow`. Never `window.scrollTo`/`scrollIntoView` in a reachability assertion; both are
  script paths and will scroll a root the user cannot.
- **Poison on EACH single condition, not just the conjunction.** Removing both rules fired; removing
  either one did not. A poison that only tests "everything gone" tests almost nothing — this is
  [[feedback_poison_every_assertion_not_just_the_first]] applied to the *inputs* of one assertion.
- ⚠ **A docblock asserting rigour is not rigour.** This one named the exact defect class it was
  blind to. Re-read the strongest claim in a gate's comment and ask what actor it measures.
- The repaired form: CONTROL PASS 28,796/0; html rule alone removed FAILS at 320 and 360 with
  *"scrolled 0 of a possible 582"* — the page can scroll and the child cannot.

Two shipped siblings still carry the inert scroll form and measure unreachable at 320×568:
`doubling-mirror.js:1102` and `landing-strip.js:1322`.

Bought on [[project_missing_question_tool]]. Companion to
[[feedback_a_model_gate_says_nothing_about_whether_it_renders]].
