---
name: feedback-never-file-a-live-bug-you-could-fix-now
description: "Finding a live production bug and deferring it as out-of-scope is not scope discipline — if the fix is cheap and the parts are in hand, fix it in the same session"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 86b3dad3-29a2-44c7-87a1-9eea5a232d02
  modified: 2026-08-04T17:20:07.194Z
---

**Rule:** when work turns up a **live bug in production** and the fix is cheap
and mostly already in hand, **fix it in that session.** Do not write it up,
call it out of scope, and ship around it. The operator's words, after I did
exactly that: *"how can you leave a bug unfixed?"*

**What happened (2026-08-04, Fraction Kitchen).** While building the print
sheet, native panels found that `equivDone` pinned a fixed third-person pronoun
against `{big}`, which resolves to one of four nouns across the six EQUIV tasks
— so **three of six tasks were ungrammatical in five locales**, including the
sentence the paywall advertises. Three panels independently called it their most
valuable finding.

I had exact native fixes for **three** of the five. I shipped the print sheet
and filed the bug, reasoning that it was pre-existing and outside the
commission. Getting the last two took **one message each and under a minute** —
the panels were still warm with full context. The deferral bought nothing and
left a defect live in production for no reason.

**The test to apply.** Not "is this in scope?" but:
- Is it **live**, and does it affect users now?
- Are the **parts already in hand** (diagnosis done, most of the fix written)?
- Is the remaining cost **small relative to what I have already spent**?

If yes to all three, scope is not a reason. Scope protects the operator from
*unbounded* expansion, not from a twenty-minute close-out of something I just
broke open. A partial fix is a genuine reason to pause; *"I could finish this
but it belongs to a different commit"* is not.

**Corollaries earned in the same fix.**
- ⚠ **A gate written for a language bug can condemn correct prose.** Banning the
  pronoun tokens flagged French `remplissent LE plateau` and Italian `tutto LO
  spazio` — definite ARTICLES spelt like the proclitic pronouns. No regex
  separates them. **Change what is measured, never loosen the pattern**: the five
  strings are now frozen against the forms their native panels approved, so any
  future edit fails and goes back to a panel. Agreement is a fact about the
  language, not about the characters.
- ⚠ **A poison stopped upstream tests nothing.** My first poison patched the SoT;
  verify reads the TOOL. It reported green and proved nothing. Always confirm the
  needle actually landed in the file under test.
- Related: [[feedback-panels-read-the-code-not-just-the-copy]],
  [[feedback_verify_rendered_not_source]].
