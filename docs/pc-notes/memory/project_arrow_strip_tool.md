---
name: project_arrow_strip_tool
description: "TOOL #37 The Arrow Strip / The Rail That Waits — REBUILT to the v4 bar 2026-08-06; the ten-panel unanimous English defect, the frozen-instrument trap, and the gate that asserted the bug"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e1bb5e2-a503-413c-8a95-f3901bc402dd
  modified: 2026-08-06T07:35:09.480Z
---

# TOOL #37 — THE RAIL THAT WAITS (`arrow-strip`) — REBUILT 2026-08-06

Build #2, live 11/11. Commits `0d027eff` (rebuild) → `537a686b` (live gate).
`TOOL_WRAPPER_VERSION` 7.69 → 7.70, `arrow-strip.js?v=2` → `?v=3`.
Gates: verify **21 invariants** · mutate **78/78 killed, 0 anchorless** ·
local-test **226** · smoke **11/11, all 34 strings rendered** · locale-layout
**11×10** · print **10/10** · liveness **59 / 21 controls / 43 paths** ·
live-verify **88 on production**. 0 lines to lcs-shell or any protected core.

## ⭐⭐ ALL TEN NATIVE PANELS FOUND THE SAME FALSE SENTENCE IN MY ENGLISH
Each was asked only to write its own language. All ten independently reported
that the SOURCE said *"the beetle steps forward or back, **the way its nose
points**"* — a back step goes the OPPOSITE way. The nose fixes a **LINE**, not
a direction. The print sheet went further (*"to reach a square its nose is not
pointing at, turn it first"*), refuted by the `back` card beside it. **It was
the operator's own sentence and I wrote it wrong**, in the one locale nobody
reviews, and nine languages were about to inherit it. Eight also independently
restructured `"{n} cards run"` (→ *"1 cards run"*, ungrammatical in fi/sv/de/it)
into a label-colon-count — **the English took the fix too**.
Also unanimous: `changedHint` promised a divergence the model cannot guarantee
(edit the LAST card, or one the edge refuses, and the trails never part);
`predictHint` asked only for the SQUARE, which is the one thing a turn card
does not change; **no aria string carried the heading at all**, so a screen
reader user got two thirds of the pose on a tool whose whole subject is facing.

## ⭐⭐ THE GATE ASSERTED THE DEFECT — TWICE
`local-test` said `is(rot.fixed, "the beetle is fixed dead centre while the
world turns under it")` and `live-verify` said the same. Dead centre is exactly
where it must NOT be: every mat is even-sided, so the mat centre is a **grid
vertex and never a square**, and the beetle was drawn off its own square in
every state. And `verify` A14 proved the ghost invention by calling `setCard` —
**an operation no handler could perform**. A green suite certifying an
invention through a path the UI cannot reach.
→ New invariant class **A17: no dead MODEL FUNCTION** (A15 covers strings).
It fired again immediately: my own `cycleCard` mutated the rail array
directly, leaving `setCard`/`removeCard` dead *in the very function written to
fix that defect*.

## ⭐⭐ 211 ASSERTIONS PASSED ON A FROZEN INSTRUMENT
After the 422px unpin the mat measured **372px at 2560 — byte-identical to its
1024 size** — and every containment, tap-floor, canvas-floor, FITS and overflow
check was green. They all ask *does it fit*; none asked *does it USE what it is
given*. Cause: I replaced `vmin` (circular inside the iframe) with
`screen.availHeight`, which **headless reports as 600 whatever the viewport
is**. A signal the gate cannot see is a signal nobody can verify.
→ `window.parent.innerHeight` (real, same-origin, outside this tool's layout)
+ new **L9: strict growth ≥1.6×** between 1024 and 2560. Now 2.25×.
→ And the chrome allowance must be measured in the **longest locale**: derived
in English it overflowed fr and it by 6-15px.

## ⭐⭐ READING THE RENDER FOUND WHAT 225 ASSERTIONS DID NOT
The beetle **was not on the mat at all** — I appended a bare `<use>` into a
`<div>`, and a `<use>` outside an `<svg>` root paints nothing. Every gate
passed because they measure the div's BOUNDING BOX, which a CSS width gives it
whether or not anything is painted. Also found by reading, not measuring: the
mat's outer frame was clipped by `.arw-scroll{overflow:hidden}` (box-shadow),
and the rail scrolled past the card edge with no cue.

## THE DEFECTS THAT SHIPPED IN BUILD #1 (each now an invariant)
**D1** the trail could not show a TURN — `[F,F]` and `[F,L,R,F]` drew the same
line and `[L,L,L,L]` drew NOTHING, on a tool whose thesis is that turns matter
(→ pivot arcs; `[L,L,L,L]` now draws a circle on one square) · **D3** nothing
ever animated and nothing could (render() rebuilt every node, so both CSS
transitions were dead and the beetle's-eye toggle SNAPPED) · **D4** "change ONE
card" had no UI · **D5** the eye toggle rotated by the START heading, so at the
default h:0 the mat did not move · **D8/D9/D10** iframe pinned at 422px, four
wide tiers dead, **"Run it" clipped off the bottom of its own landing page** ·
**D11** Ctrl+P handed a free visitor the paid sheet AND printed the answer ·
**D12** the landing copy sold "saved mats" and "blank cards to cut out", which
did not exist — **both were BUILT rather than retreated from**.

## PANEL RULINGS WORTH KEEPING
⭐ **da: "Kør billen" reads as "kør bilen" = DRIVE THE CAR** (`bille`/`bil` one
doubled letter apart). Standing constraint: Danish `kør` never takes `billen`
as its object; every Danish run string is intransitive.
⭐ **da: every `bille-` COMPOUND risks `billed-` (picture-)** — `Billesporet` →
`billedsporet`, a real word (the video track). Hence the genitive *Billens
skinne*. **Norwegian has no such twin, so `Billebanen` is safe** — the same
decision resolved oppositely in two neighbouring languages.
⭐ **no: `our-day` ships no `'Matte'` meaning THE MATHS LESSON**, so "Skriv ut
matta" reads as *print the maths* → `rutegulvet`.
⭐ **THREE BYTE-IDENTICAL LIVE COLLISIONS WITH sorting-hoops**: nl
`"Mat afdrukken"`, no `"Skriv ut matta"`, fi `"Tulosta matto"`. sv and da were
one morpheme away. **Nobody checks a collision in a language they do not read.**
⚠ My briefing notes were STALE and the panels corrected them: sv `räls`, nl
`baan`, no `bane` are all FREE. A doc is not a fact.

## GATE TRAPS BOUGHT HERE
⚠ **Anchor on the element, not on the label** — the label moved to `_sync()`
and the handler stayed in `_build()`, so a "find runBtn then look 400 chars
ahead" anchor reported a MISSING handler on a correct tool. ⚠ **Reach controls
by `data-fk`, never by index** — the foot gained a control and `[1]` silently
became a different button. ⚠ **Wait on a signal, never a sleep** — the stepped
run made every fixed `wait(360)` expire mid-journey, and the tool correctly
refusing the next click read as three wrong trails. ⚠ **Measure the flattened
CSS, not its source layout** (declarations split across `+ '…'` lines) and
**start the brace count at the css string, not at the function**. ⚠ **A6's
immutability probe ran on a FRESH state, where `clearRail` is a no-op** — a
mutation SURVIVED for exactly that reason; probe a populated state and assert
it is populated first. ⚠ `arrow-strip.*` **does not match
`arrow-strip-mats.json`** — the #42 glob trap, hit again on the deploy chown.

Related: [[project_premium_tools_v4_catalog]] · [[feedback_next_tool_build_recipe]] ·
[[feedback_native_panels_audit_the_source]] · [[feedback_poison_every_assertion_not_just_the_first]] ·
`docs/claude-md/premium-tools-v4.md` · CLAUDE.md §23
