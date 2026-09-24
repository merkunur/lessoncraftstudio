---
name: feedback_poison_every_assertion_not_just_the_first
description: "A gate with N checks needs N poisons — the obvious poison short-circuits at check 1 and leaves the rest never observed failing, which is indistinguishable from unable to fail."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d4192bb8-51c4-4af8-8c5a-cd3da4abe89d
  modified: 2026-08-05T12:36:39.195Z
---

# Poison every assertion, not just the first one

`verify-deck-site-chrome.js` has 11 assertions. My first poison suite had three modes and all
three passed, so the gate looked proven. It wasn't: the `missing` mode strips the chrome out
entirely, which fails **check 1 (`marker`) and returns immediately** — checks 3 through 11 had
*never been observed failing*.

**A check never observed failing is indistinguishable from a check that CANNOT fail.** So each
remaining assertion got its own poison, constructed in a state where the thing it measures
actually exists: head-order, footer-order, trailing-slash, English-labels-on-correct-URLs, and
`<h1>`-in-chrome. All five fired. Two of them would have shipped untested otherwise.

**Why:** this is the recorded "a gate that measures nothing reports *measured nothing*, not
FAIL" rule, one level up — the gate as a whole reported PASS while most of it was inert.

**How to apply:**
- Count the assertions. Write that many poisons, minus the ones a single poison genuinely
  co-triggers. If a poison short-circuits, the checks after it are untested.
- **Always include a control**: a *correct* input must come back clean, in every locale.
  A gate that rejects correct code is exactly as useless as one that cannot fail, and it
  teaches whoever hits it to work around the gate rather than report it.
- **Poison with the real artefact too.** Running the verifier on the corpus *before* the fix
  must report 100% FAIL. That is free, uses real data, and is the only proof it is not blind.
- To prove a gate that reads its own module, **break the real module and restore from a
  backup you made** — not `git checkout --`, which restores from the index and silently
  discards uncommitted work.
