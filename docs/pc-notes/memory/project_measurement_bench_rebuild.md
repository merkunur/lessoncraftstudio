---
name: project-measurement-bench-rebuild
description: "Measurement Bench rebuilt to the v4 bar 2026-08-05 — the reported defects were the smallest ones, and six native panels found four bugs in code written that hour"
metadata: 
  node_type: memory
  type: project
  originSessionId: b3199fbc-b260-427e-ab07-05a100ea8f36
  modified: 2026-08-05T22:04:06.046Z
---

**LIVE 2026-08-05/06.** `measurement-bench` rebuilt to the v4 bar.
`live-verify-measurement-bench.js` = **198 assertions driven on production, 11/11**.

## The operator reported two defects. Both were real; both were the smallest ones.

- **Capacity solved ONE problem and stopped.** No next-problem chip — but
  underneath, the answer was the vessel's declared `cap`, so only TWO
  measurements existed in the whole bench, and **jug 10 could never fill
  tall 8 + wide 6 = 14**, so both beakers were unfillable and press-and-hold
  went silent at an empty jug with no sound and no message.
- **The jug tipped AWAY from what it was filling.** One rule,
  `rotate(-7deg)`, on the source; negative is counter-clockwise and every
  target sits to its right. The same rule served the reverse pour, where
  negative is correct — so one direction was right by accident.

## ⭐⭐ Bigger than both: it rendered in a 422px iframe on every desktop

`repro-wodb-iframe-height.js` already NAMED this tool. `#lcs-root{height:100%}`
bound the app to the iframe viewport, which the shell reported back to a parent
that had set it from `INITIAL_HEIGHT = 420`. All four wide tiers were gated on
`min-height:880px` and could never fire; standalone, `.mb-stage-outer`'s base
`max-width:680px` capped the scale at **1.03** whatever `--mb-maxscale` said.
**The bench had never once drawn above design size anywhere.** Live now: 538-781px
frames, 2.30x at 2560. ⚠ **A SECOND fixed point appeared after the fix** — inside a
content-sized iframe `window.innerHeight` IS the height `_fitStage` is computing,
so the height term applies only when NOT embedded.

## ⭐⭐ Six native panels found four defects in code written that hour

Briefed to treat my English as a **SOURCE TO AUDIT** and to **READ THE MODEL**.

- **`bothCountsLine` said "With gaps" and a GAPPY CHAIN CANNOT REACH IT.** Four
  panels traced it independently: a gappy chain closes to FEWER units than the
  object needs, so `closed.length < need0` returns early. The line renders only
  for overlaps/overhang, where the first number is the LARGER.
- **Three live contraction bugs in my drafts** — es "de el tenedor", pt "de o
  garfo", it "di il martello", plus fr "de le crayon" for ~17 of 30 nouns.
- **Finnish**: my capacity drafts used `vetää` with vessel phrases stored in the
  ILLATIVE — ungrammatical in every pair. `mahtua` governs the stored case.
- **The free bench was dead to a keyboard while ANNOUNCING itself to one** — the
  supply was a `<div>` with `pointerdown` only, and `api.announce` reads "drag
  from the pile" on bench entry.

## Other measured findings

- **A cup was NOT the same amount in every vessel**: 2383/2969/4000 px² per cup,
  a 68% spread — and the WIDE beaker had the larger cross-section while holding
  FEWER. Now one `CUP_AREA` for all.
- **`tall=8` vs `wide=6` CONFIRMED "taller means more"**, the misconception the
  bench exists to disturb.
- **A perfectly laid CUBE CHAIN drew an 8px gap between every pair** — 22px of art
  in a 30px lattice cell, on a bench whose lesson is "no gaps".
- **The jug's spout overflowed its viewBox by 11px** and was clipped away entirely.
- **`BAL_ROPE_HALF` was declared once and used NOWHERE** while the gate built two
  assertions on it AND a third enforcing the contradicting single-point version.
- `pointercancel` LAID a unit the child never released; the supply pile sat inside
  its own drop band; the settle moment called `render()`, destroying the SVG it
  was celebrating on.

## Gates

verify (+ NEW pour-direction, vessel-model and weight-reachability laws) ·
**NEW `mutate-measurement-bench.js` 20/20** · local-test 86/0 ·
**NEW `audit-measurement-bench-locale-layout.js` 330/0** · smoke 11/11 ·
print 10/10 (NEW double-locked 2-page sheet) · liveness 67/0 ·
**NEW `live-verify-` 198/0 on production**.

⭐ **Three gates were vacuous and only poison found it.** The locale-layout
h-overflow check compared `scrollWidth` — which the tool's own
`overflow-x:hidden` makes impossible; repaired, it immediately failed the
control with **2px of real German overflow at 320**. The placeholder-parity law
derived its expected set from `en`, so dropping a placeholder from ENGLISH made
the set empty — and my first fix was STILL vacuous because `--locales=en`
reduced the cross-locale union to one locale.

⚠ **A mutation survived and the gate was not at fault**: my poison changed one of
TWO inversions and the law (>=1) still held. Raising the threshold to 2 would
have been fitting the law to its own bad counter-example.

## Fence (§23.3)

K.MD.A.2 is occupied for **capacity** (`bramble.holds-more`) and **length**
(`choice-board.compare-length`); 1.MD.A.1 by `seriation`. **The remainder is
WEIGHT** — nobody owns heavier/lighter. The portable measuring strip was
subtracted entirely; object-vs-object on the balance is the one survivor and is
**NOT BUILT**. Also rejected: a two-unit record strip claiming 2.MD.A.2, which
#40 The Unit Handle owns.

## Still open
- Object-vs-object weight comparison (the fence remainder), designed not built.
- `takeOneOff` key name is a fossil — the string no longer instructs; five panels
  asked for `cubesHeavier`.
- `compareLine` renders unit-less numbers; in the premium guess log, rows from
  three benches sit together with paperclips/cups/cubes indistinguishable.
- The print sheet reuses BUTTON labels as table column headings.
- `_checkOver` speaks before the damped beam visibly tips.

Plan file: `C:\Users\rkgen\.claude\plans\glowing-greeting-aurora.md`
