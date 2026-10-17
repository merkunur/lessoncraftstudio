# #15 — Twinsies → THE TWIN POOLS (K.CC.B.5, count how many, then count out that many)

ORDER row 15 · id `twinsies.count-twin.k-cc-b-5` · own files `twin-pools-core.js`, `twin-pools-activity.js`, `twin-pools-activity.html`, `twin-pools-activities.json` (`twinsies-activities.json` emptied to `[]`).

## The skill
Both halves of K.CC.B.5 in one move: count how many there are in a line, a ring, an array or a scatter (up to 10), then count out that many. Behind it, K.CC.C.6's matching: two groups are the same number when every one has a twin.

## The apparatus and its invention: THE STRINGS
- Two rock pools. The first holds library sea creatures of one kind (crab, starfish, clownfish, jellyfish, octopus, scallop, shrimp, pufferfish, angelfish; the contact sheet ruled out the big animals, the generic "fish", tuna (food) and oyster/seaweed). A tap on one puts the child's own tick on it (counted) — never a number.
- The twin pool is empty: always 12 places (8 up to five), so its size never tells. A tap on a place puts in a creature of a different kind; a tap on a creature takes it out. "Empty the twin pool".
- Check: empty → start hint, no miss. Too many / too few → a miss; miss 1 numbers the twin pool (only for that Check — never a running count). Miss 2 → the strings tie as many pairs as they can (shortest total length, so no two cross) and ring the creatures with no twin. Right → a string on every pair, both pools numbered 1..n so every string joins a number to the same number, the last pair gold. The help never moves a creature.

## Why it differs from the other count-out rebuilds
The target is a GROUP, not a numeral (Jar Label, Animal Train, Fruit Stand, Roll Book, Treat Box all start from a numeral); the twins are a different creature in a different shape, so only the number can match; and the proof is a one-to-one matching the child can see.

## Refuse-list
No number on the first pool before the round is done; no live count anywhere; no pool-full stop; no mascot (Twinsies survives only in the page title); no 0.

## Layout
wide (W ≥ 560): the pools SIDE BY SIDE, tall (3 × 4 places, 2 × 4 up to five), 6 px rim, cell ≤ 112, picture cell − 2 (97 px on the live 648 px stage), a 28–56 px gap the strings cross. A two-row pool squashed every ring flat and every big scatter into rows, so desktop went side by side. stack (300–559, < 280): first above twin, 4 × 3 (4 × 2), cell ≤ 66, picture cell − 2. narrow (280–299): 6 × 2, picture = cell. Lines and arrays run along the pool's long side; a ring sits on a drawn loop of pebbles; a scatter is free seeded placement (spacing down to 0.92 of a picture — the creatures' ink is ≤ 0.96 of the box), then a seeded shake from the places, then (two-row pool only) rows at random spacing.

## Settings
Numbers up to 5 / up to 10 · In the twin pool: different sea creatures / the same sea creatures.

## Gates
verify-twin-pools-core 706 (the strings against brute force: shortest, never crossing) · mutate-twin-pools 38/38 · local-test 11 locales × 7 widths 1740/0 · visual-qa 54 · hierarchy 548/0 · settings-efficacy 2 live (`--tool=twin-pools-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
it prose quoted a hint the screen never shows («pochi» → «mancano»); "only the number can match" untrue with the same-creatures setting → "by default" ×11; no word order + "ett"; da "et dyr til".
