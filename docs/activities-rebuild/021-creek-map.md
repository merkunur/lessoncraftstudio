# #21 — Comparison Creek → THE CREEK MAP (K.CC.C.7)

ORDER row 21 · id `comparison-creek.river-steer.k-cc-c-7` · own files `creek-map-core.js`, `creek-map-activity.js`, `creek-map-activity.html`, `creek-map-activities.json` (`comparison-creek-activities.json` emptied to `[]`). The page title stays "Comparison Creek" (metadata frozen en..sv; da/no/fi slug, title and intro are new).

## The skill
K.CC.C.7: compare two numbers between 1 and 10 given as written numerals — BOTH ways, by a rule the child has to hold.

## The apparatus and its invention: THE ROUTE
- A creek down the stage forks twice on its way to a pond where a library friend waits (frog, turtle, beaver, fox, rabbit, hedgehog, raccoon, squirrel, bear — a new one each round; toad left out as the frog's near-double). The boat is the library sailboat.
- The setup at each fork: two channels round an island, with a number buoy on the outer bank of each channel.
- A sign at the source gives the round's rule (a short bar and a tall bar, one lit): follow the BIGGER numbers, or the SMALLER ones. The rule changes every round, so a child who always picks the bigger number cannot get through.
- The child plans the whole route (one buoy per fork, drawn dashed), then Check: the boat sails it.
  - Half a route: "choose at both forks" (no miss).
  - A wrong fork: the boat sails to the FIRST wrong fork and stops in the reeds; that fork is ringed ("which number there is bigger/smaller?").
  - Miss 2: dots under that fork's two numbers.
  - A new tap clears it.
  - Right: the boat reaches the friend, "you followed the bigger numbers, 7 and 5, all the way to the pond!".
- #19 shows "bigger" as height on a building; #20 shows "smaller" as the count that stops first; #21 makes the child apply either rule, twice per round.
- Rounds: up to 10 ×9 and up to 5 ×8, rule alternating.
  - Answer side balanced within 35–65% under every rule setting.
  - Both forks go the same way in some rounds but not all.
  - Neighbours appear in ≥ 3 rounds.
  - Never equal, never 0.

## Layout
- Wide (≥ 560): boat 96, buoys 64, channels boat + 26, islands drawn over the water.
- Phones: boat 64 (56 below a 328 px stage), buoys 46/44 half in the water, dots 7 px so they never touch the stuck boat.

## Settings
Numbers up to 5 / up to 10 · Rule: bigger and smaller / always bigger / always smaller.

## Gates
verify-creek-map-core 285 · mutate-creek-map 23/23 · local-test 11 locales × 7 widths 1939/0 · visual-qa 54 · hierarchy 272/0 · settings-efficacy 2 live (`--tool=creek-map-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
MUST-FIX: the page prose in all 11 locales gave "far apart, like 9 and 2" — no fork is 9/2 → "2 and 7" (a real fork). Now gated: every "N and M" in the en prose must be a real fork or a real route ([E] in verify, poisoned with 9 and 2). Applied: fr title "Le ruisseau des nombres"; no "forgrening" (bokmål, not "forgreining"); fi "haarauma" (a "haara" is one branch); learningGoals[2] no longer overclaims ("check a comparison by counting dots"). Self-caught before review: channels drawn too wide merged into one lake (forks invisible) → narrow channels + islands drawn over the water; phone dots touched the stuck boat by 2 px.
