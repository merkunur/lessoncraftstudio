---
name: feedback_relay_the_strings_not_the_reasoning
description: "Relaying a panel's reasoning instead of its verbatim strings loses the deliverable — and agents address each other by NAME, never by type"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-11T02:27:34.447Z
---

⭐⭐ **I RELAYED TEN PANELS' REASONING AND NONE OF THEIR STRINGS, AND NOTHING LANDED FOR HOURS.**

On TOOL #56, ten native panels each produced a verbatim block of locale copy. Every relay I wrote
carried their *arguments*, their *rulings*, and a few quoted fragments — and **not the strings**. The
coordinating agent measured tool against panel file (300 values, **0 drifted**) and correctly
concluded nothing had been applied, then **refused to reconstruct native copy from my paraphrase.**
That refusal was right and it is the only reason no invented Danish shipped.

**Two causes, both mine:**

1. **I summarised a deliverable.** Reasoning is what you relay when the recipient must *decide*.
   When the recipient must *apply*, the artefact is the deliverable and a summary of it is worthless.
   Ask which one you are passing on before you compress.
2. ⚠⚠ **The panels could not route around me because they were addressing `general-purpose` — an
   agent TYPE, not a name.** Every panel reported "no agent by that name is reachable", four times
   each, and fell back to reporting through me. **SendMessage takes a name or an agent ID.** Hand
   subagents the real IDs of their peers when you want them to talk to each other, or every message
   funnels through you and degrades.

**How to apply:**
- **Relay artefacts by reference, never by retyping.** The fix that worked: each panel wrote
  `scripts/_the-gap-locale-<loc>.js` for its own locale, and a merger folded them **by reference**,
  refusing any panel that touched another locale's key.
- ⚠ **Do not have N agents edit one shared file.** Ten agents read-modify-write the same file is a
  lost-update race: the last writer silently erases the rest, nothing errors, and the file looks
  plausible. Per-agent files plus a merge step is the correct shape.
- ⚠ **If subagents have a standing "report only, do not write files" instruction, LIFT IT
  EXPLICITLY when you need artefacts.** Several panels surfaced the conflict rather than deciding
  for themselves — correct behaviour that cost a round because I had not anticipated it.
- **A relay is a measurement too.** I passed on two panels' disputed census arithmetic without
  re-measuring; both were wrong. I relayed a locale's round-2 values after it had **withdrawn** them
  in a round-3 reply that never reached me — applying them would have *introduced* the defect.
  **Verify before relaying, and say which round a value comes from.**

Bought on [[project_the_gap_tool]]. Companion to
[[feedback_a_model_gate_says_nothing_about_whether_it_renders]].
