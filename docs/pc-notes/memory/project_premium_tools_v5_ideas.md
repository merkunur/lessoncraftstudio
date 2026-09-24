---
name: project_premium_tools_v5_ideas
description: "docs/premium-tools-v5-ideas.md holds 20 tool ideas for the FINAL batch — rebuilt once after the operator rejected 19 of 20; ideas only, not approved, and NOT the \"build the next tool\" trigger."
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-09T17:14:20.308Z
---

**`docs/premium-tools-v5-ideas.md`** — 20 ideas for the **final** tool batch. Draft 1 `828a1012`
(maths objects — REJECTED), draft 2 `7557fd53` (pedagogy abstractions — REJECTED, "you keep getting
stupid tool ideas"), **draft 3 `67d578f7` = the TOPIC-FIRST batch, all on 2026-08-09**. Branch
`pivot/printable-business-toolkit`, **committed not pushed**. The current 20: Exchange Machine
(regrouping+national carry notation) · Baking Tray · Folding Wall · Counting Cups · Number Hotel ·
Number Drum · Landing Strip · Rounding Hill · Pair Gate · Doubling Mirror · Missing Question (kept) ·
Curtain · Shape Stretcher · Hinge · Sheep Pen · Staircase · Ice-Cream Stand (Kombinatorik) · Shadow
Stick · Queue (ordinals) · Number Studio (digits). Heroes: Exchange Machine, Number Hotel, Sheep Pen.
Supersedes/absorbs unbuilt v4 slots A3, A4, B6, C2.

⚠ **STATUS: ideas only, NOT approved, NOT a build trigger.** "Build the next tool" still resolves to
[[feedback_next_tool_build_recipe]] and CLAUDE.md §23.0 (next = **B5 Reshape**, ordinal **#45**).

**Why the first draft died and what replaced it → [[feedback_a_tool_is_a_teaching_move_not_a_maths_object]].**
Short version: optimising for §23 ruling 5 produced *maths objects*; the batch is now *teaching moves
turned into apparatus*, and the entry test is "name the teacher's sentence · name what a child does
in the first ten seconds · a whiteboard must not be able to do it."

## ⭐⭐ CHECK THE EVIDENCE AT THE TARGET AGE — it overturned the ranking

Most instructional research is done on teenagers. Commissioning an age-scoped evidence check
(alongside the teacher panel and the fence audit) changed which ideas survived, and it disagreed with
the practising teachers on their own favourite:

- **Hinge questions** scored 23/25 with the teachers and were CUT. No controlled trial exists; the
  parent construct is overclaimed ~3× (**formative assessment is 0.20**, Kingston & Nash — *never*
  quote Black & Wiliam's 0.4-0.7); the EEF learner-response RCT found **no impact**; zero K-3
  evidence; and a five-year-old cannot read four written options.
- **Productive failure is CONTRAINDICATED** below the typical age group (Kapur; Loibl & Rummel).
- **Low-floor-high-ceiling** has **no efficacy study at all** — every source is a blog or publisher.
- **Erroneous examples** and **compare-two-methods** both **REVERSE for zero-prior-knowledge
  learners** — the default K-3 state — so they survive only with forced design constraints (correct
  content first, error attributed to a named other, ends on the corrected version; comparison only as
  consolidation, both methods simultaneously visible).
- **The protégé effect does not reach below 10.** The real in-band citation is **Siegler 1995**:
  five-year-olds explaining *the experimenter's* reasoning learned considerably more than explaining
  their own — which underwrites the whole error-analysis family.
- **Safe to claim at 5-9:** concreteness fading (Ching & Wu, kindergarten; Fyfe gr 2-3) · retrieval +
  expanding intervals (Fritz, preschool **d=1.9**) · spacing for generalisation (Vlach & Sandhofer,
  5-7) · number-line magnitude → arithmetic learning (Booth & Siegler, grade 1, **causal**) ·
  blocks↔written-method lockstep (Fuson & Briars, grades 1-2) · explaining another's reasoning.

⚠ **Two numbers never to repeat:** Black & Wiliam 0.4-0.7, and the CRA meta-analysis Tau-BC 0.996 as
if it were a Cohen's *d*.

⭐ **The evidence also corrected a DESIGN, not just a claim:** blocks and written marks must be
**co-located and co-temporal** (Fuson & Briars), so my "two columns" split-screen framing was wrong —
a lagged split screen recreates the dual-representation problem it is meant to cure.

## Fence findings worth keeping

- **The written column algorithm exists on NONE of the four surfaces** (`REFERENCE APPS/addition.html`'s
  own analysis lists vertical format as a non-capability) — the only large virgin payload in either draft.
- **No table square / times-tables surface** anywhere; but the noun `table` is dead in **nine of eleven
  locales** (de/nl/sv/da/no = the blackboard noun of five shipped tools; nl *de tafels* ARE the times
  tables; es `tabla` / fr / it `tavola pitagorica` / pt `tabuada`).
- **No server-side tool-state store exists** — `api/prisma/schema.prisma` has four models and none holds
  it, so "saved setups" are localStorage, per browser, wiped by a cache clear. §23 already calls this
  the #1 unbuilt shared piece and the honest prerequisite for selling "paid depth + record".
- Two teacher-panel favourites are **already shipped**: their Splat = `#39 The Lids`, their Wrong Ruler
  = `#40 unit-handle`.

See also [[project_premium_tools_v4_catalog]] — v5 forces three v4 decisions (Cogs vs A4, Peephole vs
A7, All the Ways vs C4) only if the FIRST draft is revived; the rebuilt batch does not.
