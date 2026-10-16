# 004 — Count the Stars Awake (K.CC.A.2) — the Constellation Thread

Replaces `star-stitcher.connect-sequence.k-cc-a-2` (a firefly moved by a "Count on" button over unnumbered dark stars; emoji creatures as the reward; 7 locales, sv/da/no/fi missing). Same manifest id; the seven existing slugs, page titles and intros frozen; sv/da/no/fi authored new with this build. New tool `constellation-activity`, own core `constellation-core.js`, own manifest `constellation-activities.json`; `star-stitcher-activities.json` is emptied (the #2 precedent).

Distinct from #3 (the Peek Path = ONE successor, written on keys): here the child produces a RUN of successors — 7, 8, 9, 10, 11, 12 — by finding and threading numbered stars in a scattered sky.

## The four questions

1. **Would a 5–8-year-old choose it again?** A night sky of numbered stars. One star is awake (the given number, gold) with a soft halo; the rest sleep, dim. The child taps the star that comes next: it wakes, a gold thread runs to it, the number is spoken, and a rising chime plays. Star by star the thread draws a picture — a kite, a cup, a crown, a staircase — that closes on the last tap and twinkles. Nothing is bigger than the sky; the picture is earned, never shown in advance.
2. **Would a teacher put it on the board?** K.CC.A.2 is "count forward beginning from a given number within the known sequence (instead of having to begin at 1)". The start is never 1. Stars numbered BELOW the start sleep in the same sky (1 is always there): tapping one names the slip — *that comes before; you don't have to go back, count on from 9*. A star too far ahead names *too far, one at a time*. Nothing lights for a wrong tap; the thread only ever grows by one. The run so far is read out under the sky as a row of chips (7 · 8 · 9), so the oral sequence is visible and the conversation is "where did we start — and what came after?". Settings: numbers to 10 (starts 2–6) or to 20 (starts 7–16, the teens); sky *starry* (extra sleeping stars, the pedagogy) or *clear* (only the picture's stars, a scaffold). No timer, no score. Check confirms when the picture is complete (it fires itself on the last star); pressed early it says *not finished yet*.
3. **Would a parent trust it?** Nothing drawn by hand: a sky panel, star discs with rays, a thread, numeral chips — all in the shell palette plus gold for awake stars. Numerals are the only words on the apparatus. Works at 320 px; legible with the sound off (the numbers are spoken as a bonus).
4. **Is it creative?** The invention: **the constellation thread — the next number is the star the thread reaches for, the picture only exists if the count is right, and stars from "before" are in the sky to be refused.**

## Apparatus

- **The sky** (`.sky-mat`): a deep-teal rounded panel, square on a phone / 3:2 (aspect 0.66) from 480 px — the card must fit the 640 and 900 folds with the strip and Check below it; an SVG layer underneath for the thread (`.sky-thread`), star buttons on top.
- **Stars** (`.sky-star`): 44–68 px buttons; rays + disc + numeral. States: `is-lit` (gold disc, ink numeral), `is-here` (lit + halo pulse), sleeping (cream outline, cream numeral, readable). Path stars and extra stars look identical asleep — the only difference is the numeral.
- **The thread**: 5 px gold polyline through the lit stars in order; on the last star the picture's closing segments draw and all its stars twinkle in sequence.
- **The readout strip** (`.sky-strip`): the current number large (gold chip), the run so far as small chips in order, a one-line note (what to do / the named slip), and *Start again* (relights only the start).
- Settings drawer: Numbers (to 10 / to 20), Sky (starry / clear).

## Rounds (order-only reshuffle per pass; both pools ≥ 7)

Each round = (start, picture); the run is start … start + points − 1; the pictures are fixed point lists (5–9 points) that read as objects:

- **to 10** (10 rounds): mountains 2→6 · star 3→7 · house 4→8 · fish 5→9 · cup 6→10 · kite 3→8 · boat 4→9 · bolt 5→10 · crown 3→9 · stairs 2→10.
- **to 20** (10 rounds): saucepan 7→13 · umbrella 8→14 · wave 9→16 · stairs 10→18 · kite 11→16 · crown 12→18 · boat 13→18 · house 14→18 · star 15→19 · cup 16→20.

Extra stars (starry sky): D = min(run length, 12 − points) numerals, in priority 1 → start−1 → end+1 → the rest alternating below/above; positions seeded from the round (deterministic), each ≥ 1.12 × star size from every other star, each placed as near as the sampler can to a path star (a lure) so nearness never gives the answer. The gate prints the proximity bot's success rate per sky (measured, not asserted against an invented number).

One right answer per tap (the current number + 1); a tap is `next` / `done` / `same` / `back` (any lit or lower numeral) / `skip` (any higher numeral but the next).

## Layout

Stacked (the sky is the hero at full card width; a readout STRIP under it, not a column — a 376 px split sky would shrink 14 stars to 55 px). Stage width W: sky W × aspect; star = clamp(44, 68, min(W, H)/6.8) — the shorter side sets the star; inner pad 10; star centres map the unit square onto [R, P − R]. Minimum centre distance 0.22 in the unit square → ≥ 1.12 × star at every width ≥ 320 (verified in the gate for every round, both skies, 17 widths). No `vh`.

## Strings (×11, one reviewer)

title · instruction · prompt ("Start at {s}. Count on and wake the stars one by one.") · hintStart · hintUnfinished · noteNext/noteBack/noteSkip/noteSame/noteDone (the strip, interpolated by the wrapper) · celebrate ("Yes! From {s} to {e} — you woke {shape}!") · skyLabel · starSleeping/starLit/starHere · runLabel · restart · setRange/range10/range20 · setSky/skyStarry/skyClear · 13 picture names in object form with their article (de accusative, fi -n/-t object).

## Refuse-list

No firefly or any character. No "Count on" button (the next star IS the count). No numerals hidden on the path (reading the next numeral in a scattered field is the K move; hiding them made the old button the whole game). No picture shown before it is counted. No start at 1. No timer.

## Gates

`verify-constellation-core.js` (own oracle: pools, tap table, extras priority + distances + determinism, layout floors, proximity bot printed) · `mutate-constellation.js` · `local-test-constellation.js` (real pointer, every round of both pools, 11 locales, 7 widths, settings, resize broadcast) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `audit-settings-efficacy.js --tool=constellation-activity` · `preflight-activity-routes.js` · `verify-activity-prose-claims.js` · preview · one reviewer · `live-verify-constellation.js`.
