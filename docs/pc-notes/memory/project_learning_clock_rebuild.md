---
name: project-learning-clock-rebuild
description: "Learning Clock (#14) rebuilt to the v4 bar 2026-08-05 — the touch fix, and the eleven native panels that found 22 model bugs no gate could see"
metadata: 
  node_type: memory
  type: project
  originSessionId: e6554076-4c17-45ce-9ef7-7e3fc8e3e1e8
  modified: 2026-08-05T11:21:19.137Z
---

LIVE 2026-08-05, commit `1af86260`. live-verify **94 assertions against
production**, including a real CDP finger drag that moves the hands.

**The reported defect, reproduced in one line before anything changed.**
`touch-action:none` sat on `.lck-hand`, an SVG `<g>`, where it is not
honoured. Measured at 412px with real touch events:
`pointerdown:1 pointermove:2 POINTERCANCEL:1  150 -> 150`. And
`pointercancel` was wired straight to the release handler, so the hand
snapped back before it visibly moved. `clock-core.js:329` declares the rule
on the `<svg>` ROOT; this file had copied the sibling line and dropped the
root one. `scripts/repro-learning-clock-touch.js` is now a permanent gate
that MEASURES which of the three declarations is load-bearing (any one
suffices; removing all three breaks it).

**⭐⭐ THREE GATES WERE STRUCTURALLY BLIND TO IT.** local-test drove
`page.mouse` — touch-action is irrelevant to a mouse — so "one real pointer
drag moves the hands" was true of the only input it tested. Its tap sweep
listed five selectors and not `.lck-hand`, so the two most important
controls had never been measured against any floor (21.1px / 27.4px against
44/34). The wide tiers were keyed on `min-height` inside an iframe whose
height is derived from content, so they plausibly never fired.

**⭐⭐ ELEVEN NATIVE PANELS READ THE MODEL AND FOUND 22 BUGS NO GATE COULD.**
Two independently found the flagship arc draws the wrong distance in every
half-relative locale: at 2:25 Swedish says `fem i halv 3` — five minutes to
the HALF mark — and the arc swept 35 minutes. Wrong at :20/:25/:35/:40 in
de/sv/nl/da/no/fi, **correct in English throughout, which is why nothing
caught it.** The Finnish panel independently re-derived it and then verified
the fix at all twelve Finnish positions. See
[[feedback_native_panels_audit_the_source]].

**⭐⭐ PRACTICE HAD NEVER ASKED A CHILD TO SET THE MINUTE HAND** — 948/948
measured. `(target + 180) % 720`: 180 MINUTES is three hours, so the minute
hand opened ON the answer at every granularity. And the 5-minute pool never
offered :05/:10/:50/:55 (a Portuguese reader measured 400 draws) because six
zones × floor(24/6) filled every slot and sliced the remainder to zero.

**⭐ WORDS ONLY A NATIVE COULD SEE.** Danish `Kvarterer` = NEIGHBOURHOODS —
the shipped step ladder read "Hours, Half hours, Neighbourhoods, 5 minutes"
and the paywall sold them. Portuguese `quartos` alone = BEDROOMS. Swedish
`niceBreak` opened "fem i rad" and `fem i` is this tool's own idiom for
"five to". Spanish `esfera` is the platform's word for SPHERE, on an
instrument of circles. **And my own ban regex caught "streak" but missed
"five in a row" / "fem i træk" / "fünf hintereinander" / "vijf op rij" — it
had certified the banned thing in eleven languages, and could not see
Finnish at all.**

**Tier change (one constant, `FREE_STEPS`):** quarter-hours and 5-minute
steps moved to FREE, because in seven of the eleven curricula *halv* and
*kvart* are one lesson. 1-minute stays paid (it is the only rung that
engages the formal register).

**Surfaced, NOT fixed — needs an operator call, both inside the byte-frozen
moat:** `_say` never passes `pm` into `sayTime`, so fr/pt/it read **midnight
as noon** (`midi et quart` at 00:15) while the 24h ring and the night face
disagree on screen. And `TIME_RULES.nl.hourWordsAlt[0] = 'een'` should be
`'één'` — a Dutch voice says "a hour" at the paid 1-minute step.

Gates: verify 161 (exhaustive) · mutate 34/34 · local-test 84 (touch section
poisoned) · smoke 56 across 11 fresh browsers with every key proved REACHED
by a strings Proxy · locale layout 2,838 / 660 renders · print 10/10 ·
liveness 95/0/0 · wide-viewport 30/30 · speech gate 176 anchors unchanged.
0 lines to any protected core.
