---
name: feedback-story-mechanic-variety
description: "Operator feedback 2026-07-10: story-library interaction verbs must vary — tap-choice/drag-drop-heavy stories are not premium; every story pulls from the full verb spectrum"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a2e17929-17e5-40da-9618-9a072a0f2e70
---

# Story-library mechanic variety (operator, 2026-07-10, on reviewing stories #1–#6)

**The feedback (verbatim intent):** "So far there wasn't enough variety of mechanics in the stories. It was almost always either drag and drop or click the right option. These interactive stories will be the premium product of the website. So, they must be designed in a professional way."

**Why:** The stories are the platform's PREMIUM product. Six stories in, the verb census was ~90% tap-select (choice-board/find-object) + drag-place (shape-fit/complete-picture/listen-place). The palette has richer verbs that were sitting unused: finger-tracing (`sb-trace`), maze navigation (`sb-maze`), audio-first listening (`sb-listen`), snap-stamping (`sb-dot-stamp`), tap-in-order (`sb-sequence`/`sb-connect-dots`), color-assignment (`sb-color-code`), pair-flip memory, spot-diff, and the SEP worksheet bridge.

**How to apply (standing, every story from #7 on):**
1. At design time, run a **verb census** over the page list: verb families = select / order-tap / place-drag / trace / navigate / audio-first. Target ≥3 families per story; plain tap-select ≤50% of pages (ideally ≤2 pages). Mechanic-fit still wins per page (playbook §5) — but when two mechanics fit a teaching point, PREFER the verb the library has used least.
2. **Machine check:** `gate-library.js` verb-census WARNs (`verb-variety` <3 families; `select-heavy` >50%) — added with story #7. WARN not HARD; treat a WARN as a design smell to justify or fix, never ignore silently.
3. Cross-library: track each story's dominant mechanic in [[project-story-library-250]]; avoid repeating a dominant within a grade band until the palette is exhausted.
4. Shipped #1–#6 are grandfathered (not re-gated / not rebuilt) unless the operator asks.

Proof-of-response: story #7 "Kiko Paints the Rainbow" ships with listen ×3 + trace ×3 + stamp ×1 + maze ×1 — zero tap-choice, zero drag-drop.
