---
name: feedback_verify_the_measurement_before_the_defect
description: Twice in one session a number looked like a shipped defect and was actually a wrong measurement — check what the selector actually selected before changing any code.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d4192bb8-51c4-4af8-8c5a-cd3da4abe89d
  modified: 2026-08-05T12:36:54.178Z
---

# Verify the measurement before you believe the defect

Two false alarms in the site-chrome build, both of which would have caused a wrong fix:

1. **`minTap` read 26px** on the header nav, under the 44px touch guideline. I edited the CSS.
   The number did not move — but the header height *did* (52→58px), which is how I noticed the
   fix HAD applied and the measurement was wrong. The probe was
   `hdr.querySelectorAll('a')`, which scoops up `.lcs-sc-brand` — the logo anchor, legitimately
   short (26px) but **178px wide**, a perfectly comfortable target. Measured as
   `.lcs-sc-link` only, the real answer was 40/40px at every viewport.

2. **The landing body copy looked blue** in a screenshot, suggesting my CSS had leaked. Rather
   than hunt the cascade I measured `getComputedStyle` on the live page and on mine:
   `rgb(46,42,34)` on both. It was a PNG rendering artefact. Zero colour drift.

A third, smaller one the same day: a throwaway poison probe wrote `/\/\$/` inside a shell
heredoc instead of `/\/$/` and reported the trailing-slash check as broken. **A wrong
measurement agreeing with a wrong measurement.**

**How to apply:**
- Before believing a number, print **what it selected** — the count, and one example element.
  A `querySelectorAll` result is not evidence until you have shown it selected the right thing.
- When a fix "doesn't work", check whether some *other* signal moved. If it did, suspect the
  measurement, not the fix.
- Compare against the live/unchanged baseline with the **same instrument**, not against
  intuition or a screenshot.
- Never hand-approximate a predicate the code already contains — drive the real code path.
