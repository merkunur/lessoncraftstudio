---
name: project_unroll_tape_tool
description: "Premium tool #41 \"All the Way Round\" (2026-08-01) — a strand unwraps a curve and lies down straight; and the six defects eleven native panels found in my English"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T06:43:44.858Z
---

**LIVE 2026-08-01 — v4 tool #41 `unroll-tape`, "All the Way Round"** (catalog slot B4).
Commits `6107ceeb` → `3956fd30`. Next = **A5 Comparison Tape**, ordinal **#42**,
`PREV='unroll-tape'`, wrapper **7.54 → 7.55**, `TOOL_KEYS` **45**.

## What it is

A flat shape stands on a runway ruled in **its own width**. A strand lies all the way round its
edge; drag the tip and it **slides off and lies down straight**, keeping exactly the length it had
when it was curved.

**THE THESIS: a circle reads 3.14 at EVERY size — and so does a Reuleaux triangle**, which is
visibly not a circle (Barbier's theorem, measured to 1.5e-8 constant width). Because the tick step
IS the shape's across, size-invariance is true *by construction*, not by hope: measured spread
**0.00e+0** across five sizes on production.

**The peel is a SLIDE along one fixed guide, not a lift.** The strand occupies guide-arclength
`[L·t, L·t+L]`, so its total is L at every frame BY CONSTRUCTION — 2.5e-15 across 12 shapes × 65
frames. (The exact physical lift is the *involute*; its free end sweeps to ≈6.3r, straight out of
frame.)

**"Around or tall" is a rigged coin** — `P ≥ 2·diameter` for every closed curve. So the binary
became a plantable **flag**, frozen by refusal at the first movement, never marked, never scored.

## ⭐⭐ ELEVEN PANELS AUDITED MY ENGLISH AND ALL ELEVEN FOUND THE SAME SIX DEFECTS

Asked only to write their own language. This is the #38 "the English source is a locale too"
lesson arriving again, unprompted and at full strength:

1. **The title named TAPE** — the one noun the tool forbids, which sibling #40 owns, while all
   fifteen other strings said *strand*. Six panels refused to translate it. Now "All the Way Round".
2. **Nothing unrolls.** A cord round an edge SLIDES OFF; "unroll" describes a spool.
3. **"the bench" was a fourth named part** in a three-part tool — and in sv/da/no it is a sibling
   tool's NAME (Mätbänken, Målebænken, Målebenken).
4. **`benchLabel` omitted the height bar and the flag** while the next string told that same
   screen-reader user to drag the flag. An accessibility hole.
5. "how many of the shape's own **widths**" — a shape has one width.
6. "print **for** paper" is not English.

⭐ **AND THE FRENCH PANEL FOUND A REAL MODEL BUG** — at 0<t<1 with no flag the hint said "drag the
flag" while `setFlag` refused and no handle was drawn. **I reproduced it before fixing it.**

⭐ **BEST CATCH: Swedish `bana` (track) has the definite `banan` — identical to *banana*.**
"Skriv ut banan" would have shipped **"print the banana"** to seven-year-olds. They used `spår`.
No English-side check could ever have found that.

**Each locale chose its nouns against the SHIPPED lexicon of the other 43 tools**, which is why
they are unrelated words rather than one word respelled: de Schnur/Leiste · fr ficelle/couloir ·
es cordón/pista · pt barbante/trilha · it spago/pista · nl touwtje/lijn · sv snöre/spår ·
da tråd/bane · no hyssing/spor · fi lanka/kaista. The *obvious* word was routinely taken. Two
vetoes were mathematical: **es `cuerda` is the term for a CHORD of a circle** (the tool is full of
circles — it would teach the word backwards), and **fr `s'allonger` means GETS LONGER**, the exact
misconception the tool exists to kill. And **pt `pista` means CLUE** in Brazilian classrooms.

## Three real defects the gates bought

1. ⭐ **A MISSING CORNER COSTS AN ORDER OF CONVERGENCE.** Families declare the corners they can see
   — the Reuleaux says `[1/3, 2/3]` — but it has THREE, and the third is the parametrisation
   **seam**, implicit while u=0 is the start and invisible once the B-shift moves it. Convergence
   collapsed O(1/N²)→O(1/N) and the Reuleaux read 3.14089 instead of 3.1415911 — a **450× deficit,
   on the shape whose whole job is to read π.**
2. **A flat bottom has no single lowest point.** A ternary search comparing equal values walks to
   an arbitrary end, which put a knot on the seam and forced two COINCIDENT samples (1.4e-9,
   2.8e-7 of the median). Now the middle of the flat span + a half-step cut-merge.
3. **The y axis flips** — B is the minimum y in maths and the MAXIMUM on screen, so every shape
   rendered *under* the runway.

## Gate lessons

- ⚠ **THE CATALOG SPEC WAS WRONG TWICE.** "within 0.00px" is arithmetically impossible (chord ≤ arc
  is a theorem); "unchanged under 360 rotations" is true of the LENGTH, false of the RATIO.
- ⚠ **TWO DESIGNED LAWS WERE REFUTED BEFORE BEING GATED**: perimeter is NOT monotone in the
  superellipse's `n` (it minimises at n=1, the rhombus, = 4√2 to 9e-16).
- ⚠ **AN INVENTED THRESHOLD IS NOT A MEASUREMENT.** My non-vacuity check asserted a made-up "20×
  margin" and failed a CORRECT tool at 6×. The real requirement — *a dropped segment lands outside
  the ±10% band* — is stronger and passes. **Fix what is measured, never the number.**
- ⚠ **The ban was too wide twice more** (a case-insensitive `\bright\b` matched `RIGHT: 985`; a
  blanket `toFixed` ban matched the SVG coordinate serialiser) **and once too NARROW** (French
  `centimètres` has an accented è that `centimet` misses — caught by the must-fire half).
- ⚠ **A drag-only handle is DEAD** to a keyboard, to assistive tech and to the liveness gate: a
  synthetic `.click()` never fires `pointerdown`. Scored 0/9 paths × 3 states until it also acted
  on click and Enter/Space.
- ⚠ **A radius in MODEL units cannot hold a floor in PIXELS** — 44 model units rendered 29px on a
  660px bench. The handles became fixed-size HTML buttons over the bench.
- ⚠ **live-verify was wrong three times**, all from assuming rather than naming: it asserted "3.14"
  against whatever shape was loaded (the bench opens on the PEBBLE, R=2.30), and asked for a
  toggle label that only exists at t=1.

**Final:** verify 188 · mutate **42/42, 0 harness faults** · local-test 51 · smoke 122 × 11 ·
locale-layout 396 / 66 renders · liveness 27/27 × 3 · **live-verify 117 on production** ·
0 protected-core lines.

See [[project_premium_tools_v4_catalog]] · [[feedback_next_tool_build_recipe]] ·
[[project_unit_handle_tool]] · [[project_lids_tool]].
