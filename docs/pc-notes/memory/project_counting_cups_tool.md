---
name: project_counting_cups_tool
description: "TOOL #48 The Counting Cups — build record; measurement refuted the spec three times and ten native panels found eight defects in my English"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T04:22:34.215Z
---

**TOOL #48 `counting-cups` — THE COUNTING CUPS, live in all eleven locales, 2026-08-10.**
Commit `0ecc1f50` (+ `2fa3e5c7` live-verify). TOOL_KEYS 50→51, wrapper **7.83**, category
`number`, ordinal **#48**, `PREV='folding-wall'`. **live-verify 121/121 on production.**

**The object:** chips spill across a mat, far too many to be worth counting one at a time. A press
lifts **whatever is under the scoop — never a fixed ten** — into a cup that **shuts itself at the
tenth**. Ten cups nest into a stack, and the stack is a hundred. Three readout places **refuse to
guess**: the ones stay `?` while another ten could still be made, and all three settle the instant
it cannot. Names: de Die Zehnerdosen · fr Les barquettes de dix · es Los botes de diez · pt Os
potinhos de dez · it I secchielli da dieci · nl De Tienkokers · sv Tioaskarna · da Tælleæskerne ·
no Ti om gangen · fi Kymppirasiat.

## ⭐⭐ TWO EXPERT PANELS CAME BACK WITH OPPOSITE DESIGNS, BOTH CITING THE SAME FENCE
Pedagogy: *the container never refuses, the child picks the group size.* Interaction: *the cup
closes itself at ten, not even a setting.* Both cited `bundle-machine`'s family-head doctrine.
**Adjudicated to the self-closing cup on five grounds, the decisive one being that VARIABLE GROUP
SIZE HAS NO DIGITS** — a base-7 grouping has no readout, so "digits ARE closed containers", the
commissioned thesis and the named Grade-1 dread, evaporates. The pedagogy panel had designed an
excellent *Counting Collections* instrument; it is not a *place-value* instrument.
⭐ The child's decision was relocated, not deleted: the scoop takes what is under its mouth, so
WHERE TO AIM is a real decision with a different consequence every press.

## ⭐⭐ MEASUREMENT REFUTED THE SPEC THREE TIMES — none fixed by moving a threshold
1. **The art panel's three scatter numbers are mutually unsatisfiable.** At `d=0.68√(A/N)` the
   demanded min spacing (1.02d ≈ 40.9u) EXCEEDS the Poisson MEAN nearest-neighbour (29.5u) — a
   minimum cannot exceed a mean — and non-overlap at 36% coverage forces R>1, the opposite of the
   demanded clustered 0.78. **R deleted as an invented threshold; measured (1.4) and reported.**
2. **200 objects cannot render** (69% coverage = a slab). The ceiling is **199 and FORCED BY THE
   SHELF** — one stack + nine cups + nine ones — not chosen.
3. **The keyboard STRANDED 44 of 120 play-throughs.** Centroid-aimed scoops eat a region's middle
   and leave an **ANNULUS whose centroid is the hole they just made** (every chip 99–160u out, mouth
   reaches 96). Aiming at the thickest CHIP makes stranding structurally impossible — and removed
   the need for the specified "survivors slide to centre" rule, so the stronger invariant survived:
   **mat positions are assigned once and never rewritten.**

⭐ **MOUTH_TARGET = 2 cupfuls, and press counts did not choose it:** at exactly one cupful nothing is
ever left behind, so **the preview-as-refusal never fires**. At two the child always sees chips that
will stay. (Refusal now fires in 60/60 heap and spill sessions.)

## ⭐⭐ TEN NATIVE PANELS AUDITED MY ENGLISH AND FOUND EIGHT REAL DEFECTS, FOUR IN THE MODEL
- **aria/render parity broken in BOTH directions** (de): the blind child heard *"Tens: 3"* while the
  wall showed `?`, and was told hundreds were unknown while a stack stood in plain sight. Fixed by
  building the THREE-state readout I had specified and then collapsed to two.
- **"1 hundreds" / "1 places left"**, and a slot that must hold both a digit and a phrase → the
  agreement-free **colon frame** (es, fr, pt, da, no, fi all reached it independently).
- **Two density phrases did not compose**: *"the mat is only a few left"* is not a sentence (nl, fr,
  sv, it, da) — half of every screen-reader state report was ungrammatical.
- **`moreOff` blamed the mat when the ceiling is on the collection** (es, de) — a label the class can
  see is false.
- **`sheetNote` taught the OPPOSITE procedure** (fi): "ring ten at a time" is the deliberate-ten move
  this apparatus exists to remove.
- **`instruction` was FALSE at the handful band the tool itself ships** (it).
- **`cupOpen` was authored and REFERENCED NOWHERE** — the #39 dead-string defect, caught by a source
  scan and by the es panel independently.
- ⚠⚠ **"Ti." alone is the Danish imperative "Be quiet!"** — a screen reader would have scolded the
  class. No English-side check could ever reach it.

⚠ **The panels corrected MY BRIEF twice:** I took each plan name from a single
`workspace.billing.line` string and picked the **minority** form — de is `Lehrkraft-Abo` (20 vs my 1),
nl is `Leerkracht-abonnement` (18 vs 1), es is `plan Docente` (32 vs 1). **Measure the whole file.**

## ⭐ READING THE RENDER CAUGHT TWO THE MODEL COULD NOT SEE
The **closed and open cups were nearly the same drawing** — the mouth was filled with the mat's own
colour so there was no notch, and the lid was a 4.6px bar merging into the outline, on a tool whose
whole subject is closed containers versus loose ones. My own build law said the notch is
load-bearing and my render had removed it. Fixed with a dark teal notch and a coral-filled closed
cup (**a closed cup is FULL; an empty outline says the opposite**). And **provisional digits rendered
ink-on-seats** — the seat means "no longer negotiable", so the tool was claiming a digit was final
while it could still change.

## ⭐ THE MUTATION HARNESS FOUND THREE PIECES OF DEAD CODE BY BEING UNABLE TO KILL THEM
A void-repair pass (changed the worst void by nothing, to two decimals), a band clamp (the draw
expression is already exactly `[lo+1, hi-1]`), and an equivalent `_st` fallback. **All deleted, not
gated.** And **the gate was marking its own homework in one place**: it read `NN_FLOOR` off the tool,
so lowering the tool's floor lowered the gate's expectation. Now two distinct assertions — a
geometric fact the gate owns (centres ≥ d) plus the tool's declared floor with a separate guard that
it cannot lower it.

⚠ **Poisoning the browser gate found two more holes:** the position oracle read only **one of the two
painted layers** (a 40u shift of every ring sailed through), and a consequence check asserted
`closed` in a state where `closed` was already 0 — **an assertion whose expected value equals the
broken value is not an assertion.**

## Gates
`verify` **13,493** over an exhaustive census, own oracle, non-vacuity first, bounded loops ·
`mutate` **47/47 killed**, control green, 0 harness faults · `local-test` **1,386** across nine
viewports with a pixel-recomputed position oracle, a collision check and the DOM half of the
numeral-leak law · both **poison-proven in both directions** · preflight-tool-registration **51/51** ·
preflight-indexable-routes clean · **live-verify 121/121 on production**. **0 lines to
`lcs-shell.{js,css}` or any protected core.**

⭐ **The heap is TWO `<path>` nodes** (one for rings, one for bodies, N sub-paths each) — because
`querySelectorAll('.ccp-chip').length` IS the answer in any design that draws N nodes, and every
string audit passes while it leaks.

## ⚠ Surfaced, not fixed
`folding-wall.js`'s header still said **"THIS IS NOT THE FOLDING WALL AND IT DOES NOT FOLD"** while
line 1024 ships the fold — corrected here, since it would have made the next session rip it out.
Its `manipulatives.ts` hub card still carries the stale name **"The Times Shelf"** in all 11 locales.
**"Premium" remains a plan that does not exist in any locale**, live in 17–27 strings each.

Related: [[project_folding_wall_tool]] · [[feedback_next_tool_build_recipe]] ·
[[feedback_native_panels_read_the_model]] · [[feedback_a_naming_note_is_not_a_design_ban]]
