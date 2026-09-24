---
name: feedback-hand-the-english-to-every-panel-as-a-source
description: "Native locale panels find more defects in the ENGLISH SOURCE than in their own language — brief them to audit it, and read the CALL SITE, not just the string"
metadata:
  type: feedback
---

**Rule:** every native-panel brief must contain a **TASK B: audit my English**,
with the known failure modes named and at least one worked example. Ask them to
read the **call sites**, not only the string table.

**Evidence (fraction-kitchen, 2026-08-04).** Ten three-person panels were asked
for *two* strings each. Between them they returned ~11 genuine defects, and
**almost every one was in the English or in the CODE**, not in their own
language:

- ⭐⭐ **10/10 independently** found that `gateMenu` says *"cutting and sharing —
  are always free"* and is the exact string the **locked** 3-/6-friend chips
  display. The tool refused a share while claiming sharing was free, at the
  instant a parent was deciding. No gate could see this: the string is true in
  isolation and false at one of its four call sites.
- ⭐⭐ **10/10** found that the "one whole" chip spoke `equivDone` — *"4 fourths
  fill it exactly"* — with no tray on screen and nothing being filled. The
  Spanish panel added that es renders a **feminine pronoun pointing at "la
  bandeja"**, which is not there. A pronoun with no antecedent, visible only in
  a gendered language.
- **3 panels** read `_missTray`'s call site and proved `equivTooBig` describes
  an **impossible state**: it fires only when the tray is FULL, so "the space
  left" and "try a smaller one" are both false, and every supply chip is the
  same denominator so the instruction cannot be obeyed.
- **Spanish alone** found that a `/^\{/` capitalisation test misses a template
  opening on **punctuation** — `'¡{fp}! …'` — so only Spanish spoke "¡mitades!".
- **Danish alone**: `tilovers` is not a word (Retskrivningsordbogen); it is
  `til overs`. **Norwegian alone**: one string used `hører til Premium` where
  the whole catalogue says `er en del av Premium` — one tool, two dialects.
- **German + Portuguese** found a child-facing line built by **raw string
  concatenation in code**, i.e. the one utterance no panel could ever reach.

**How to apply.**
- Brief shape: *TASK A — rebuild these N strings. **TASK B — audit my English**,
  it is the more valuable half.* Name the known classes: doubled articles, a
  template fighting the form it slots, a sentence starting lower-case because it
  opens on a placeholder, a mathematical inversion, a verdict hiding in neutral
  wording, **a claim untrue of the tool**.
- Give them a **worked example** of a defect you already found. It calibrates
  what you want and they generalise from it hard.
- Ask for the **LEXICON line**: what the sibling tools already call the paid
  plan in that language. Panels cannot see the product lexicon and will
  otherwise coin a term.
- ⚠ **Reproduce every code-level finding before acting on it** — but expect them
  to be right. Related: [[feedback-the-english-source-is-the-locale-nobody-reads]],
  [[feedback_native_panels_audit_the_source]].
