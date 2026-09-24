---
name: feedback_native_panels_audit_the_source
description: "Hand the English to native locale panels as a SOURCE TO AUDIT, not a spec — they read the model and find real bugs"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T08:45:32.153Z
---

When fanning a tool or activity out to the eleven locales with the §A.13.48
three-agent native panel, **hand over the English as a SOURCE TO AUDIT, not as a
specification to render.** Say so explicitly in the brief, give them the repo to
read, and ask at the end: *"tell me if any of these still reads wrong."*

**Why:** the English source is the one surface that never gets reviewed. I write
it, I gate it, and every gate I write is testing what I already believe. The
panels are the only independent read it ever receives — and because they have to
understand the apparatus to rebuild rather than translate, they end up reading
the model.

**How to apply:**
- Brief them on the *apparatus and the laws*, not just the strings — the fence,
  the refuse-list, the named parts, the sibling tools' owned nouns.
- Give the sibling lexicon to avoid, per locale. A collision is invisible from
  English (nl `plank` = SHELF and `heart-words` already owns it; da `for enden`
  is #40's; sv `kant i kant` is `measurement-bench`'s).
- Expect **two or three rounds**, and expect the key set to CHANGE between them.
  Send deltas, not rewrites, and say which keys are accepted as-is.
- When two panels report the same thing independently, that is a fix, not a note.
- When a panel's ruling contradicts your own copy, take theirs unless you can
  name why. They renamed every tool; every rename was right.

**What they have actually caught** (tool #42, [[project_comparison_planks_tool]];
tool #41 before it):
- ⭐⭐ **Live MODEL bugs, found by reading the code.** A hint that instructed a
  move the reducer refuses during that exact phase. One DOM element wearing two
  jobs under one aria-label.
- ⭐⭐ **A law of mine that I had broken myself** — naming a fourth part in a
  tool whose header says three, introduced while fixing a different finding.
- ⭐ **A gate that was structurally missing.** "Nothing in the eighteen strings
  invites the class to say the number your whole thesis says they say aloud."
- ⭐ **A fence that was behavioural, not lexical** — two tools whose questions
  have the same answer, separated only by one of them taking no input. That
  cannot be enforced by a regex, and I had assumed the phrasing was doing it.
- **Spatial claims that are wrong in their language**: "put it ON the shorter
  one" reads as ON TOP in Dutch (*op*) and all Nordic (*på*), while the model
  seats it end-to-end. Five panels each wrote around it silently before one said
  so.
- **Idioms that carry the wrong freight**: it `testa a testa` is a real
  butt-joint term whose dominant reading is *neck-and-neck* — a race idiom on a
  tool under a no-competition lock.
- **Ambiguity a six-year-old resolves by guessing**: es needed the noun repeated
  where English says "it", because *tablón* and *recorte* are both masculine.
- **Screen-reader mechanics**: a spaced hyphen is announced as "dash", as
  "minus", or as nothing, by verbosity setting — a separator reading as an
  operator.

**The corollary:** when a panel flags something as a *wiring* risk rather than a
string problem, turn it into an ASSERTION. #42's aria swap became a gate check
because a panel said "verify this actually happens", not because I doubted it.

Cross-refs: [[feedback_next_tool_build_recipe]] · [[project_premium_tools_v4_catalog]]
