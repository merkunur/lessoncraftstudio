# Color by Number — design review checklist (every design, every batch)

Operator 2026-10-05, after the pilot: *"When you design the rest of the worksheets you should make sure that they
don't have any mistakes."* (The pilot shipped a flower stem that stopped above its pot and a duck head that only
touched its body; a re-read then found a lily pad lying half on the grass.)

## Automatic — `node tools/cbn-preview.js` must report 0 failing
- every visible coloured part has room for its number; no crumbs; no part hidden behind another; level caps
- **every object is ONE solid piece** (`checkSolid`: no gap, no tangent or hairline joint; ink stalks count as joints)
- **no character or object runs off the frame** (scenery — trees, bushes, clouds, fences, rocks, seaweed — may)
- the gate itself is poison-tested: `node qa/verify-cbn-solid.js` (11 cases, both directions)
- `lib/cbn-type.js` refuses to build a design whose cached gate result is not `ok`

## By eye — read the contact sheet (line page + coloured key) for EVERY design
1. Everything that is attached is visibly joined (heads, necks, stems, handles, legs, tails, wheels, strings).
2. Nothing floats that should stand or rest: feet, trunks, pots, houses and wheels touch their ground; boats sit
   on water; things in water are IN the water (a lily pad is not on the grass).
3. Nothing important is cut off by the frame.
4. Every object is what it should be and in the right place: the animal is recognisable, the scene makes sense
   (fish under water, birds in the sky, the sun in the sky, not under a roof).
5. Colours are natural and the coloured key looks like a real picture; no two touching parts share a colour unless
   they are one thing.
6. Nothing that a child would want to colour is left without a number.
7. Numbers are readable; nothing is too fiddly for the level.
8. Nothing is doubled or overlapping by accident; outlines are clean.

## Independent review
One visual + pedagogy reviewer agent reads all 200 contact sheets once, against this list; every finding is fixed
at the source and re-gated.
