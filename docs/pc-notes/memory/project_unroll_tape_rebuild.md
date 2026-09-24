---
name: project_unroll_tape_rebuild
description: "#41 All the Way Round rebuilt 2026-08-06 — the flag was invisible, the wide tiers were dead inside the 704px iframe, and eleven gate scripts had never touched the flag with a pointer"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1c365a76-5544-429b-bb71-bfb5aa9a7c72
  modified: 2026-08-06T13:18:48.045Z
---

# #41 "All the Way Round" (`unroll-tape`) — rebuilt 2026-08-06

LIVE. **live-verify 117 driven on production**, 11 locales. Commits `18206c3c` + `673f16ad`.

## The report, and what it actually was

Operator: *"I could not set the flag, it was not possible to drag on my screen."* Measured:

- ⭐⭐ **THE FLAG WAS INVISIBLE.** The tool's own page renders the bench at **660px**, so one model
  unit is 0.66px and the 30-unit pennant drew **under 20px** — behind an **18px OPAQUE TEAL DOT**
  covering the pole and half the cloth, at **45% opacity** (the universal *disabled* signal). Three
  identical dots sat on the bench and the hint said "Drag the flag".
- **The drag destroyed its own event target**: every `pointermove` ran `render()` →
  `stage.innerHTML=''`, removing the element mid-`pointerdown`, no pointer capture.
- **No way to tap the runway** — the gesture a teacher reaches for first.

## ⭐⭐ Why it shipped: the suite certified a control it never touched

Every `.urt-flag` assertion in **eleven scripts** was `!!querySelector`. The flag was only ever
moved by calling `setFlag` inside `page.evaluate`. Its three DOM paths each carried a comment
saying a liveness gate had reported them dead — **none was driven by any test**. The rendered flag
classes appeared **zero times** in `scripts/`.

## ⭐⭐ Every wide tier was dead on the tool's own page

The tool page pins the iframe at **704px** at 1440/1920/2560 alike, and **media queries inside an
iframe resolve against the IFRAME viewport** — so tiers keyed `min-width:1367px` could never match.
Unseen because **both QA renders were taken STANDALONE**. ⚠ **Render QA at the embedded size.**
⚠ And do NOT inherit the sibling 422px height-pin diagnosis: that belongs to tools binding
`#lcs-root{height:100%}`; this one never did. Measured before fixing.

## What the rebuild is

build/paint split + one window gesture object (`{passive:false}`, rAF, `pointercancel`+`blur`,
flush-on-release) + `setPointerCapture` · **the whole runway plants a flag, up to three** · the flag
is HTML (an SVG pennant is 9px of cloth at 320px) · **adaptive viewBox** (dead air was 37% of the
stage; plate +29%, bench aspect .340→.276) · size drag handle **deleted** for three discrete rungs ·
height stands up the shape instead of lying in the runway's number space · ⭐ **the record** — each
landing leaves a mark under a same-width miniature; `circle == reuleaux` at 3.1416 is Barbier and
the two marks **stagger onto two rows** · twelve-shape shelf, seven padlocked (the shape gate was
previously *unreachable*) · paid Print gives the shape at **true size 25mm + 50mm** on a cut line.

⚠ **The runway must OUTRUN the answer** — filling it exactly put every landing at ~97% of the scale,
so a child could guess short but never long.

## Gates (rebuilt)

verify **261** · mutate **52/52, 0 harness faults** — ⭐ **6 killed ONLY by the new browser
escalation** (`mutate` used to run the model gate alone, so every render claim had zero coverage) ·
local-test **117** incl. a real pointer drag + `elementFromPoint` topmost + handle overlap ·
smoke **133×11** · locale-layout **990/99** (was **fully vacuous** on an empty NodeList; poison now
fails 198) · liveness 69 × 3 states · print 10 · wide-viewport 12 (one **measured** row rebaselined,
adjudicated) · live-verify **117 on production**.

## Locales

Ten native panels convicted my English: **9 of 10** found `gateBody` PRINTED THE ANSWER on a panel
the class sees; **7** found `acrossUnit` was a **verbatim regression of the previous round's own
recorded finding**. Landing copy: `classroomIdeas[2]` asked a teacher to resize until the strand
lands on the fourth mark — **impossible**, the landing is size-invariant (that is the thesis) and no
shape reads 4.00. Repaired in all 11 + the fi `lanka`→`naru` sweep. metaTitle/metaDescription
untouched per the §21.5a churn freeze.

Related: [[feedback_next_tool_build_recipe]] · [[project_premium_tools_v4_catalog]] ·
[[feedback_the_tool_page_pins_every_iframe_at_704]] · CLAUDE.md §23.6.
