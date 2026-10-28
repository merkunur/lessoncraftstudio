# #143 — Gus's Snack Cart → THE ROUND-TRIP CART (2.NBT.B.5; all 11 locales)

ORDER row 143 · id `gus-snack-cart.within-100.2-nbt-b-5` (kept). Design: `designs/143-gus-snack-cart.md`.

## The invention
- **The cart checks the child's answer by driving the story back.** A story card shows one library picture of the snack and a sentence ("Gus had 45 cookies. He sold 8."); the equation card shows `45 − 8 = [ ]`. The child types an answer on the instrument's own keypad and presses Check.
  - Gus's cart (the library shopping cart) drives out on a number road ruled 0–100 to the typed number.
  - It turns and drives back by the story's inverse: tens as arcs, then ones as small steps.
  - Only the right answer brings it home to its flag. A written line under the road shows the trip back (`47 + 8 → 55`).
- **The misses:**
  - **Miss 1:** the cart stops off its flag, and a bracket with a number shows the gap (47 → 55, ten off: exactly one post). The hint: "The cart came back to 55, not home to 45." A return that runs off the road says so.
  - **Miss 2:** the child's own trip fades, and the story's hops replay forward from the flag (dashed) to a ghost cart. The hint: "Watch the story hops from 60: 2 tens and 5 ones."
- **During a round the cart is parked on its flag** (otherwise the ruled road would read the answer off). Once home it rolls freely: a tap or drag on the road, or arrow keys.
- **The turn tab** writes the sum in columns, and the typed answer travels with it.
- **Settings:**
  - **A route of three stops** (G2-393): `24 → +30 [ ] → −6 [ ] → +15 [ ]`. Each leg is its own round trip; the first wrong sign is the one checked, and the later signs wait.
  - **Round first** (G3-389): the child taps the nearer ten for each number (two buttons labelled with the tens; the lit ticks show both runs).
    - The farther ten gets a note.
    - On a halfway number (25, 45) the lower ten gets "Halfway between two tens, we round up", marked by an up-chevron.
    - The child then types the rounded total in a box marked with a drawn wavy-equals sign, and then the exact answer.
    - A wrong estimate is never a miss; it shows the correct value in pencil.

## Files and wiring
- **New files:**
  - `mini tools/round-trip-core.js` (`RoundTripCore`) holds the model:
    - the three sets of eight rounds from the design;
    - the inverse trip and its gap, the hops;
    - typing, the rounding taps, the check with literal hint keys;
    - free play, and the banded plan.
  - `round-trip-activity.js` (`RoundTripActivity`, prefix `rt-`, `apparatusClasses: ['rt-art']`) draws the cards, the road (cart and ghost as real library images, the flag in a top layer), the keypad and the animation.
    - The keypad sleeps while rounding and during the trip.
    - Under 310 px the story and the equation share one card.
  - `round-trip-activity.html`.
- **Manifest:** the row stays in `gus-snack-cart-activities.json`.
  - en..nl slug / title / intro are frozen.
  - sv/da/no/fi get a new slug, title and intro, so the row now ships in 11 locales.
  - `tool` → `round-trip-activity`; params = `{trips: [one, route], round: [off, on], rounds}`.
  - The old `gus-snack-cart-activity` files stay on disk, unused.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.887 → 9.888.
- **Stories:** whole sentences per locale and round. Every story names its picture in the vocabulary's own word.
  - The live es/it/pt/nl stories named things no picture shows (nuts, seeds, plums); they are gone.
  - Gus is never called an animal, and no animal is drawn.
- **Prose ×11:** rewritten. Each quotes 45 − 8 = 37, 47 → 55, the route 24 → +30 → −6 → +15 and 38 + 21 → 40 + 20 = 60 (exact 59), all real rounds.
- **Deviations from the design:**
  - The ribbons draw as straight bands rather than unrolling.
  - There is no honk sound or flag bump beyond the waving flag.
  - The written line hides under 310 px; the bracket, its chip and the hint carry the same numbers.
  - The route card shows no snack picture: its sentence is about the cart, and a cookie beside it meant nothing.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **"He packed 36 more" did not clearly add apples** (fr *emballé*, it *incartate* and de *eingepackt* read as wrapping the ones he had). It is now "bought 36 more" in every locale.
- **The halfway rounds (25, 45):** the reviewer proposed removing them. They stay, because the design teaches the school rule that a five rounds up, in all 11 school systems. But "That ten is farther away" was false there, so a lower-ten tap on a halfway number now gets its own hint.
- **Italian elision:** *al {r}* / *dal {a}* break before 8, 11 and 80–89. Now *al numero {r}*.
- **Column-form labels:** de *Untereinander / Nebeneinander schreiben*, fr *Poser en colonnes*.
- **Route lines:** de "jede Strecke", es "recorre cada tramo de regreso", pt "refaz cada trecho de volta".
- **Titles:** nl "De kar van Gus" (*snoepkar* is a sweets cart, and he sells carrots); sv "Gus kioskvagn" (no hyphen). The sv intro said "har kvar" (has left), which is false for the addition stories.
- **Small grammar fixes:** no "la oppi 47 til", fi aTag "peru napauttamalla", pt aAfter, en aRoad "number road".
- **es prose** now names the SEP.

## Gates
- **`verify-round-trip-core.js`: 3,906 checks, 0 fail.** It checks:
  - **My own copy of the design's tables, re-solved from scratch:**
    - the one-stop answers (distinct, 5 regroup / 3 not, bands);
    - every route leg (1–99, mixed signs, 18 of 24 regroup, finals distinct);
    - every round-first row (half-up, 8 up / 8 down, 4 / 4 per position, about and exact).
  - **The old activity's stories**, read from git (1570d1d4): each is still a round.
  - **For every round and every claim 0–99:** the trip closes only on the answer, and the gap is the claim minus the answer. The hops decompose every step.
  - **Play-throughs:**
    - Check empty gives a note, not a miss;
    - 47 → 55, then miss 2, then 37 home;
    - a return off the road;
    - the route checks its first wrong sign;
    - round first: order, farther ten, halfway, undo, about first, a wrong estimate is not a miss.
  - **The rest:**
    - free play only once home;
    - the plan keeps its bands and never repeats an order;
    - every picture is on disk and in colour, none refused;
    - strings ×11 (each story carries exactly its round's numbers, the success lines say each number as often as needed, no digit in a hint, never "free", Gus never an animal, the true minus sign);
    - prose ×11 and the manifest.
- **`mutate-round-trip.js`:** 26/26 killed; the control passes. The first run left the success line able to drop its answer, so the gate now counts each placeholder.
- **`local-test-round-trip.js`: 7,150 pass, 0 fail** (real pointer, 11 locales). It covers:
  - the 45 − 8 story, the gap 10, the written line, miss 2 with eight ghost steps, home, Next 0.5 s later, free play;
  - **the trip with animation on** (the keys sleep while it drives, and it settles at 55);
  - the turn tab;
  - the route;
  - round first and halfway;
  - every round of every setting at rest, miss and solved through 320…1366.
- **`visual-qa-activity`:** 192 renders pass. The first runs failed on two things, both fixed:
  - the hint size did not scale;
  - at 320 × 640 the keypad fell below the fold, which led to the merged card and the hidden written line (the pictures stay at 64 px).
- **`audit-activity-hierarchy`:** 386 / 0, after the road's SVGs were declared as apparatus.
- **`audit-settings-efficacy --tool=round-trip-activity`:** both settings are live.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the renders** found what no gate had:
  - the flag hidden behind the parked cart;
  - the gap chip behind the cart;
  - collapsed route cards;
  - overlapping rounding buttons at 360;
  - the equation box wrapping at 320;
  - the ghost hops tangled with the child's own trip.

  All fixed.
- **0 lines** in shared cores or `lcs-shell`.
