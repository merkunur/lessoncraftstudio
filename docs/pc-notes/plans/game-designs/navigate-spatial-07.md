# Park the Truck — kid-facing "Bramble's Busy Parking Tower" — APPROVED DESIGN SPEC
**id:** navigate-spatial-07 · **standard:** K.G.A.1 (Kindergarten positional language: above/below/beside/in front of/behind/next to) · **family:** navigate-spatial · **engine:** new `engine-place-by-relation.js` · **runtime:** SIMPLE · **EN pilot**
**Status:** approved 2026-06-20 (6-expert ensemble; all 8 critic fixes — 3 non-negotiable: near-orthographic side-on view + floor-slabs, two-stage de-leaked feedback, heuristic-bank build-gate). Build deferred.
**also_teaches:** L.K.1.e + L.1.1.i (positional prepositions — math AND language) · K.MD.B.3 · RL.1.3.

## Concept & creative hook
A multi-level parking TOWER in **near-orthographic SIDE-ON cross-section** (cutaway elevation), stacked open levels separated by visible **floor-slabs**, a spiral ramp, a city skyline behind. Run by **Beaver Bramble**.
- **World IS the pedagogy (fix #1/#8):** real vertical structure → **above = the level higher on screen = gravity-up** (zero arbitrary convention). View is **side-on, NOT 3/4 oblique** (oblique would let "higher on screen" read as "further back/behind" — the ambiguity the side-on frame exists to kill). "Above the bus" = the bay on the next level up, same column, with a visible **floor-slab between** (load-bearing art — you can't park *on top of* a bus). Adjacency/between = same-level screen-X. **Depth (in-front/behind) = dedicated rounds that ZOOM into a single level** (others hidden) so occlusion is readable + never competes with vertical stacking.
- **ONE character w/ through-line (fix #8):** Bramble = a fussy, tidy-loving attendant (want: everything parked just-so; tic: slipping cap + expressive tail; failure-relationship: the reverse rounds are HIS lost truck — "my truck's hiding behind the bus — find where I parked!"). Numbered bays + the ramp make next-to/between read as "in *this* tower."
- No-shame: correct = roll-in + toot + headlight-blink + driver-wave + tidy-click + tail-slap; wrong = polite beep-beep reverse-roll-back (no red X); celebrate = skyline lights window-by-window + cap-toss. Non-numeric vessel = tower filling / skyline lighting.
- **Anti-generic:** identical faint dashed bays, ≥1 a confusable-sibling near-miss → the spoken word is the ONLY discriminator (build-gate PROVES a non-grammatical guesser fails). Verb varies (place/reverse/productive/two-truck); tower persists into a keepsake.

## Core loop & the 8 distinct experiences
**Loop:** paddle (DOM word) + TTS full instruction (stressed term) → identical dashed bays shown BEFORE the term → tap truck → tap bay → L-path drive-in → validate (id-match). Correct → tidy-fit + vehicle STAYS (ownership; becomes a landmark later). Wrong → reverse + **two-stage feedback (fix #2):** 1st miss = NON-NAMING re-teach of the TARGET term ("above means higher up — try again"; never names the bay hit); 2nd miss = name-the-mismatch + re-speak.

Distinctness = the perceptual operation, NOT antonym flips (fix #4/#4b — antonyms are *content within* a round-type, tested by the near-miss, not padded separate rounds):
| Band | Distinct experience | Child does | Content (via near-miss) | View |
|---|---|---|---|---|
| A | Adjacency place | park beside a landmark (numbered bays) | next-to/beside; near-miss = between-gap or above | tower |
| A | Vertical place | park on the level above/below a landmark (floor-slab) | above↔below (#1 K confusion; sibling-dir near-miss) | tower |
| B | Between place (apex) | park in the same-level gap between TWO landmarks | between; near-miss = next-to-ONE-only | tower |
| B | Depth place | park in front of/behind a TALL landmark | in-front↔behind; egocentric occlusion = intrinsic | **level ZOOM** |
| C | Reverse / find-Bramble's-truck | tap the spot where Bramble parked (among foils) | any relation; lost-truck beat | per relation |
| C | Transfer | a learned term in a NEW scene | proves term not scene | tower |
| D | Productive name-it | park freely → "Where did you park? Tap the word" | generate the term (deepest evidence) | tower |
| D | Two-truck relational | park between/next-to two trucks placed earlier | uses persistence | tower |

Near-miss board: ≥2 identical bays, ≥1 confusable-sibling — AND (fix #5) the sibling bay is the one the dominant non-grammatical heuristic would pick (so guessing lands wrong). Banding = structural ramp, reshuffle within band via `nextTask`. **Free slice = Adjacency(next-to) + Vertical(above) + Between** (between proves the 2-landmark skill).

## Win-states & juice (no competition)
No timer/score/streak. Progress = tower fills + skyline lights. Tidy-fit per placement. Ownership-persistence (placed vehicles stay, become landmarks, finished tower = keepsake). Full-pass cross-game keepsake = lit skyline + cap-toss → GameCollection. CSS/WebAudio; mute + reduced-motion. **Invariant:** persisted state appends ONLY on validated-correct placement; a reversed truck writes nothing (fix #3).

## Pedagogy
- K.G.A.1 instantiated: parse the word + map to a relation among named landmarks, receptively (place/tap-spot) AND productively (park-then-name).
- Frame-of-reference: near-orthographic side-on; above=gravity-up; depth=occlusion EGOCENTRIC (never the landmark's intrinsic facing); **DEFER LEFT/RIGHT** (late-developing, not in K.G.A.1 → use beside/next-to).
- Receptive→productive→transfer ladder. Misconceptions trapped: above↔below, in-front↔behind, between-vs-next-to-one.
- No-test assessment = behavior (correct-first on a near-miss board; self-correct after re-teach; productive; transfer); guess-and-correct reads not-yet-mastered, never a surfaced score.
- TTS SAFE (whole-word terms); speak full instruction + re-speak stressed term on miss; hear-it-again ≥44px; words DOM; ≥36px.
- also_teaches: L.K.1.e/L.1.1.i prepositions (same surface); K.MD.B.3 bonus count; RL.1.3 describe Bramble+tower.

## Interaction & UX
- `engine-place-by-relation.js`: relation PRE-RESOLVED at authoring; runtime = geometry-free id-matching (`targetSpotIds.includes(placedSpotId)`). Tap-to-place primary; drag = enhancement (snap nearest within radius → same validator).
- **Two view modes (fix #1):** full-tower side-on (vertical/adjacency/between/transfer/productive/two-truck) + single-level ZOOM (depth) — engine switches per relation family.
- **Mobile @280–768 (fix #6):** fixed aspect-ratio 4/3 %-stage (gridPos→%); **≤3 levels at ≤360px** (4 wider) → level ≥50px; depth rounds single-level-zoom so occluded-behind (~0.85) stays ≥36px; hit-targets ≥36px + ≥8px gaps; ≤3 dashed bays at narrow; cap 6 landmarks; no two share a cell. Mandatory `audit-activity-mobile.js` 280→768 render-and-measure (empty+filled+occluded) — build fails if <36px.

## Visual & art direction
Direction-A (cream #FBF3E4 / teal #146B5E / coral #F2784B; Baloo 2 + Nunito). Side-on cross-section tower with **floor-slabs** (make "above" coherent), spiral ramp, skyline backdrop (lights up = keepsake). Bays = CSS dashed (not art). Bramble ~5 poses (idle/think/delight/cap-toss/point). Depth-cue (depth rounds only): behind ~0.85 + occluded by tall landmark's bbox + offset up; in-front full-size overlapping; only tall landmarks (bus/van) host depth. Words ALWAYS DOM. Stub-first → CA5 ~26 frames; bays/juice = CSS/WebAudio.

## Runtime mapping + MEASURED build-gate + PER-LOCALE
- Round-descriptor: `{id, relation, experience, view:'tower|level-zoom', termRef[], tts{}, scene{grid≤5×4, levels, mover, landmarks[{id,sheet,pose,label,gridPos,z}], spots[]}, targetSpotIds, nearMiss{spotId:siblingTerm}}`. `nextTask` within-band reshuffle.
- **`verify-place-by-relation.js` (HALTS build; fix #5):** (1) geometry re-derive ⊥ author (above=higher level same col + floor-slab; between=col strictly between the 2 termRef cols same level ≥1 gap; **behind = verified by RENDERED OCCLUSION bbox-overlap, NOT an authored z-tag**); (2) **heuristic-solver BANK** (nearest-landmark/nearest-truck/topmost/bottommost/only-empty-on-level/center-most) must ALL fail — round passes only if the confusable near-miss is the bay the dominant heuristic picks; **threshold = 100% of receptive rounds** (productive exempt); (3) term-removal must leave ≥2 valid bays. Plus standing gates (mobile/variety/SEO).
- **PER-LOCALE — cheaper than grammar but NOT pure translation (fix #7):** art never localizes (words DOM) = cheap; but cost = per-locale RELATION-AUTHORING + native-ensemble validation: (a) on/above split (de auf/über = different relations); (b) Finnish "between" = a CASE → author the inflected phrase literally (§A.13.56), never a token; (c) beside/next-to parity varies → re-validate sibling pairs per locale; (d) in-front/behind frame bias → author so egocentric (occlusion) = intrinsic (vehicle's rear), or DEFER depth per-locale like left/right. 3-agent native ensemble (§A.13.48) citing each national framework's spatial-vocabulary strand (§20.10). Still far cheaper than grammar (no morphology/art) — the deliberate favorable contrast, honestly classified.
- Feasibility: SIMPLE — one engine + two view modes + DOM/CSS/WebAudio + ~26 frames. Stub-first.
