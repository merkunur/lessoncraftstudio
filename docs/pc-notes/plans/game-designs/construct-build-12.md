# Grandpa Pip's Nesting Pots — APPROVED DESIGN SPEC
**id:** construct-build-12 · **standard:** K.CC.C.7 (compare written numerals 1–10) · **family:** construct-build (seriation-by-nesting) · **engine:** new `engine-ordering.js` · **runtime:** SIMPLE
**Status:** approved 2026-06-20 (6-expert ensemble: 2 game designers + pedagogy + web/interaction → creative-director synthesis → adversarial premium critic; all 8 blocking fixes + 2 polish applied). Build deferred to the build phase.
**also_teaches:** 1.NBT.B.3 / 2.NBT.A.4 (multi-digit compare) via R9. Measurement branch (K.MD.A.2/1.MD.A.1/2.MD.A.4) CUT — length-bar object broke one-world focus; deferred to a dedicated measurement game.

## Concept & creative hook
Grandpa Pip hand-carves & paints nesting pots, **no two alike** — a little pot may wear **9**, a fat pot **3**, and in this hand-made world that's ordinary, never weird. The painted **belly numeral** = "how many friends fit inside." Carved peg-doll **Tucklings** come home each evening; the child nests pots **biggest→smallest** so everyone tucks in and the baby **Wee Olen** is safe in the middle.
- **Load-bearing move:** hand-made pots make *size ≠ number* the charming NORM from round 1 → kills the K.CC.C.7 size-cheat pitfall via the WORLD, not a confusing late trick.
- **Anti-generic:** the only catalog compare-game that builds ONE nested stack ordering the WHOLE set (vs two-way compares); the math (order by number) and the warm beat (everyone tucks in safe) are the same gesture.
- **Cast = 3:** Grandpa Pip (TTS/hints, names both numbers), Wee Olen (the baby; peeks from the open pot-mouth as the live target), Doot the Duck (comic + gentle wrong reaction). Other Tucklings = anonymous group.
- **Reactions:** idle breathing-bob/blink + Doot waddles; correct = tonk squash-settle + felt-thump + sparkle + wave + Grandpa "7 tucks inside 9 — 7 is less than 9"; wrong = gentle boing bob-out (never destroyed) + "hmm?" + teaching nudge (NO red X); round-complete = family tucks into the big pot + quilt + snore-bubble; the finished nest pins to the workshop shelf and PERSISTS across the session.

## Core loop & the 8 distinct rounds
**Loop:** place biggest first; each next must be SMALLER than the current innermost. The live target is SEEN — the open pot-mouth glows (animated dashed ring) with Wee Olen peeking. Tap tray pot → lifts + Grandpa speaks its number → tap glowing mouth → validator `selected.value < innermost.value` (reads `.value` only). Correct → tonk-nest; wrong → bob-out + nudge.
**Numeral is ALWAYS the primary/largest/highest-contrast stimulus on every pot;** dots/ten-frame/tally are fading peek-supports, never the answer surface.

| Tier | # | Round | Distinct child action | sizeMode | set |
|---|---|---|---|---|---|
| 1 on-ramp | R1 | Two Pots, One Tuck | atomic K.CC.C.7 PAIR; numeral+dots | graduated | 2 |
| 1 on-ramp | R2 | Tuck the Three | first seriation, order 3; numeral+dots | graduated | 3 |
| 2 standard | R3 | Same-Coat Cousins ★ | identical footprint, numeral primary + dots peek-on-tap; sort tray (pure K.CC.C.7) | sameFootprint | 4 |
| 2 standard | R4 | One at a Time | INSERTION — pots arrive one-by-one; tuck each into the partial nest | sameFootprint | 4–5 |
| 3 depth | R7 | Who's Missing? | partial nest with a GAP; pick the pot whose numeral fits between (>below, <above) | sameFootprint | 5 |
| 3 depth | R8 | Twin Pots ◆ | two EQUAL numbers bob out ("5 and 5 are the same — neither fits inside") and rest side-by-side | sameFootprint | 4+twin |
| 3 depth | R9 | Big-Belly Pots | two-digit, tens-then-ones (1.NBT.B.3/2.NBT.A.4) | sameFootprint | 4 |
| 4 capstone | R10 | Grandpa's Sneakiest Pots | size INVERSE to value — "trust the number, not the size" | labelOnly+inverse | 4 |

**Dual-coding:** R1–R2 numeral+visible dots → R3+ numeral primary, dots peek-on-tap → R9/R10 numeral only. Never numeral-absent.
**Tiers = structural ramp, NOT a performance gate:** `nextTask` reshuffles WITHIN tier only; R10 is reached by EVERY child via tier-ordering (no clean-pass gate, no "diagnostic" framing — those are latent fail-states).
**Free slice:** R1, R2, R3 (R3 = the pure numeral-primary standard round, proving it teaches reading numerals). Gate holds R4, R7–R10 + place-value ladder + keepsakes.

## Win-states & juice (no competition)
No timer/score/streak/countdown/leaderboard. Per-correct: tonk + felt-thump + sparkle + wave + relation-naming TTS. Per-round: family tucks in, quilt, snore-bubble, the nest pins to the shelf and persists ("I made these"). Per-round keepsake = Family Portrait card; full-pass = Hollow Night Lantern into the cross-game GameCollection album; rare unearned firefly gift. All juice = CSS/WebAudio; honors mute + prefers-reduced-motion.

## Pedagogy
- **Instantiation (the heart):** numeral is primary every round; dots are fading peek-scaffolds → a child can't win by dot-area (that's K.CC.C.6). Seriation = chained pairwise numeral comparisons, one boundary at a time. R3 = clean assessed surface; R1 = the atom in isolation.
- **Decouple = the world, not a phase trick:** size ⊥ value from R1; dot-dual-coded on-ramp builds numeral↔quantity link without a size-cheat; R10 inverse = proof the numeral drives the decision.
- **Hints teach:** 1st miss = name both numbers + relation; 2nd miss = peek-dots bloom + counted aloud (CRA regression-to-concrete); correct restates the relation.
- **Misconceptions:** bigger-pot=bigger-number → impossible (sameFootprint + R10); every-pair-has-a-winner → R8 equal-edge; off-by-one → peek-dots; reversal → fits-inside physics + hint.
- **No-test assessment:** pause-then-place on R3, self-correction, side-by-side on R8, "8 is more!" verbalization.
- **Accessibility:** per-locale TTS for numerals + relation words (numerals near-universal → cheap localization); dots always countable; tap-to-place primary; ≥36px; relation never color-only.
- **also_teaches ladder:** R9 two-digit (1.NBT.B.3) → 2.NBT.A.4 three-digit by re-skin.

## Interaction & UX
- Tap-to-place primary (tap → lift + speak → tap glowing mouth → shared validator); drag = enhancement through the same validator. States: tray-idle → lifted → validating → nested(tonk) OR bob-out(returns to stable tray slot) → round-complete.
- Legal target is visible (glowing mouth + Wee Olen peek), never an inferred "innermost pot" rule.
- **Mobile 280–768:** no literal shrink-inside → stepped-overlap nest (each placed pot inset ~22px top-right, z-stacked); every pot ≥56px; numeral on a placed pot pins to its EXPOSED top-right lip and must be legible at the exposed-slice size; ≥36px targets; cap 5 pots, drop to 4 when <360px. Column <600px (nest top/tray below wraps 2 rows); row ≥600px.

## Visual & art direction
- Direction-A: cream #FBF3E4, teal #146B5E, coral #F2784B; Baloo 2 + Nunito; dual-shadow rounded cards; hand-made-workshop texture.
- Numbers/dots/ten-frames ALWAYS DOM over a pot "belly cartouche" — re-skinning art never touches the math.
- **Stub-first families:** pot-body ×5 sizes, pot-lid, Grandpa Pip, Wee Olen, Doot, generic Tuckling, workshop-shelf bg.
- **CA5 worklist:** pot body ×5 (static, empty cartouche) · lid close 3f · Grandpa Pip idle/talk · Wee Olen peek/wave · Doot waddle 4f + tilt 2f · generic Tuckling idle/wave · shelf bg static · keepsakes (Portrait card, Lantern) static. Everything else (tonk, bob, sparkle, twinkle, lid/quilt close, shelf-fill) = CSS/WebAudio.

## Runtime mapping
- **engine-ordering.js** (new generic seriation engine; reusable): ordered nest state; comparator `isValid(selected, innermost)=>selected.value<innermost.value` (reads `.value` only); owns tray + live-target innermost pointer + round-complete; representation-agnostic via `renderItem`. Round-descriptor `{goal:'nest', tier, sizeMode:'graduated|sameFootprint|labelOnly', items:[{value, rep, footprint /* ⊥ value except onramp; inverse R10 */}], insertion, gapFill, equalEdge}`. Reshuffle = `nextTask`-driven within tier (NOT shell `tasks[]`).
- GameAssets stub→CA5 via one `register()`; per-round Portrait + full-pass Lantern → cross-game GameCollection; persisting shelf reads from it.
- **Build-gate `verify-engine-ordering.js` (MEASURED):** (a) comparator reads `.value` only; (b) footprint ⊥ value in every non-onramp round (inverse R10); (c) every pot renders a numeral DOM node; (d) no round winnable by quantity-area alone; (e) ≥7 distinct rounds + `nextTask` reshuffle; (f) `audit-activity-mobile.js` 280→768 with the nest FULLY built (5 pots) — exposed-corner numeral legibility + ≥36px + zero overflow/occlusion.
- **Feasibility:** SIMPLE — one engine module + ~8 short/static sprite families + DOM labels + CSS/WebAudio. Vacancy-chain filed as optional future advanced variant (`prePlaced`), not core.
