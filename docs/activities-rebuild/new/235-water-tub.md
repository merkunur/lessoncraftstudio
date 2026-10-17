# New 235 — The Water Tub → THE TUB THAT KEEPS YOUR GUESS (NGSS 2-PS1-2)

## 0. Identity
- id `water-tub.play.2-ps1-2` · grade K (Lab mode reaches grade 3; per-mode grade in the manifest prose only) · framework NGSS 2-PS1-2 · strand Science · files `water-tub-core.js`, `water-tub-activity.js`, `water-tub-activity.html`, `water-tub-activities.json` (scaffold `--num=235`).
- Worksheets covered: **G1-204** Sink or Float? and **G1-399** Predict and Test (Test mode) · **G1-408** Heavy or Light on a Balance Scale (Balance mode) · **G2-382** Make Clay Float (Clay mode) · **G2-383** Floating Facts: True or False (Facts mode) · **G3-400** My Lab Report (Lab mode) · **K-384** Draw What Floats and Sinks (open drawing — covered in spirit by the free-play tub after each round; the drawing itself stays a worksheet).
- Merged instruments: grade-1 "The Float Tank" (its prediction marker = the drop height; its tally board = the tub keeping every object; its balance setting = Balance mode); grade-2 "The Water Tank" (its clay slider = Clay mode); grade-3 "The Test Tank" (= Lab mode, record card + conclusion).
- Correctness SoT: the hand-read claim table of the G1-399 bank `scripts/worksheet-gen/data/b6/sink-or-float.js` (`CLAIMS`, `EXCLUDED`, `PAIRS`, `SHAPES`, `TF`) — every outcome below is a row there, every picture was opened there and again here. The activity never infers an outcome.

## 1. The pitch
"You guess by where you let go — at the top of the water or down on the sand — and then the water moves the thing to where it really goes, leaving your guess behind as a ghost; and nothing is taken out, so the tub ends up as the record of every test."

## 2. Why a child will want it again
A big, clear tub of water fills most of the stage, with a wobbling surface, light ripples and a sandy floor. Things wait on the shelf above it. The child lifts one and lowers it into the water: hold it high and let go → "it will float"; push it right down to the sand and let go → "it will sink". Then the water takes over. A heavy-looking log pushed to the bottom shoots up in a burst of bubbles and bobs at the surface, rocking; a tiny nail laid on the surface wobbles for a heartbeat, then slips down, rocking side to side as it falls, and lands in a puff of sand. A dotted outline — the ghost of your guess — stays where you let go, so you can see the gap between what you thought and what happened. Every object stays in the tub: by the end of a round the surface is crowded with bobbing things (big and small) and the floor holds the sinkers (big and small), and the child can see with one look that "big" and "heavy" did not decide anything. The show: the whole tub sloshes once, every floater bobs in a little wave left to right, and a ring of bubbles rises from each sinker. Clay mode has its own joy: squeeze a grey lump with a slider from ball to boat and watch the same clay that just sank now sail.

## 3. The skill and the misconception
- **Skill:** predict, then test, whether an object floats or sinks; notice that size and weight alone do not decide (a big log floats, a small nail sinks; on the balance the heavier thing can be the floater); the shape of the same clay changes the result; record predictions and results and choose the conclusion the record supports; judge true/false statements about floating.
- **Misconceptions and the push-back (mechanism, not message):**
  1. *"Big things sink, small things float."* Objects are drawn in honest size classes (big 136 px · medium 108 px · small 96 px at 704 — the smallest class still meets the 96 px floor; at 360: 88 · 72 · 64). Every round puts at least one big floater and one small sinker in the same tub, so the finished tub shows a big log on top and a little nail on the floor side by side.
  2. *"Heavy things sink."* Balance mode weighs the pair first — the beam tips down hard on the log's side — then both go in and the heavy log floats while the light nail sinks. The tipped balance stays visible above the tub during the test.
  3. *"The same stuff always does the same thing."* Clay mode: one lump, four shapes; ball, snake and pancake sink, the boat floats — the clay's amount (shown as a fixed grey "same clay" dot count on the slider handle) never changes.
  4. *Ignoring the evidence.* Lab mode: a conclusion the record contradicts is not "marked wrong" — a red thread runs from the conclusion card to the record row that disproves it ("Big things sink" → the row where the big pumpkin floats).

## 4. The stage
Layout `split` at ≥ 700 px (stage left 480 px; right column 200 px: bubble + the mode's side panel — the record card in Lab, the facts card in Facts, the shape slider in Clay); stacked below.

**At 704 px (stage 480 × 480):**
- **The shelf** (top, 480 × 150; a second plank appears below it when the round has 5–6 things): a drawn plank with up to 4 object cards per plank (picture at its size class, never smaller than 96 px). Every object wears a small numbered tag on a string (1–6, apparatus: a cream tag, 22 px numeral) — the tag travels with it into the tub and is how the record card names it.
- **The tub** (480 × 340): a drawn clear tank (2.5 px ink outline, slight glass highlight), water `#BFE6F2` at 75 % opacity filling the top 85 %, an animated surface line (two low sine waves, 2 px amplitude), a **surface band** (top 70 px of the water, faintly lighter — the "let go here for float" zone) and a **sand floor** (bottom 50 px, drawn grains — the "let go here for sink" zone). Between them the middle water: letting go there counts as no guess (the thing returns to the shelf with a tiny shrug, no miss).
- **The balance** (Balance mode only, above the tub, 300 × 110): a drawn beam on a triangle post with two pans; it tips by up to 18° to the heavier side (hand-read in `PAIRS`).
- **The clay** (Clay mode): a drawn grey lump (a shape path, never a picture), 110 px, whose outline morphs along four stops; the slider in the right column (4 detents with small shape icons, no words).
- **Facts card** (Facts mode, right column 200 × 160): one sentence in 20 px type + two big tokens ✓ and ✗ (64 px).
- **Record card** (Lab mode, right column 200 × 300): a question card on top (a short sentence, 18 px), then 6 rows: the object's tag numeral (a cream tag, 28 px — the record is apparatus, never a shrunken picture) · guess arrow (up = floats, down = sinks) · result arrow · a match mark (✓ or a hollow ring) — icons only; under it the three conclusion cards (sentences, 18 px).

**At 360 px:** stacked — task line → shelf (2 rows of 3 cards, size classes 88 / 72 / 64 px) → tub 328 × 260 (surface band 56 px, sand 40 px) → mode panel below (record card as a horizontal 6-column strip of 52 px cells; conclusions as 3 full-width cards). At 320: tub 292 × 230, small class 64 px.

**Library pictures** (theme/noun; outcome from `CLAIMS`; size class):
- Floats: `toys/ball` (big) · `camping/log` (big) · `vegetables/pumpkin` (big) · `fruits/apple` (medium) · `fruits/lemon` (medium) · `fruits/banana` (medium) · `miscellaneous/leaf` (medium) · `easter/feather` (medium) · `camping/pinecone` (medium) · `classroom/pencil` (medium) · `toys/boat` (medium, a toy boat) · `vehicles/ship` (big — Facts and Lab only, `testable:false`: shown as a picture going into the tub, never dragged).
- Sinks: `camping/rock` (medium) · `tools/nail` (small) · `tools/hammer` (medium) · `tools/bolt` (small) · `vegetables/potato` (medium). (`classroom/scissors` and `tools/pliers` are bank rows but have NO activity-index label — they are not in `mini tools/pictures/`, so they never appear; the sinker pool is these five.)
- **Refused (from `EXCLUDED`, re-checked):** the PINK key (reads as a plastic toy key), both spoons (the kitchen one is purple plastic), the sponge, the balloon, the seashell, the acorn, the ring (choking-size; and a clash with the word "ring"), `beach/rock`, `around-the-house/hammer`, the screwdriver (plastic handle), the fork, the egg, the carrot, the pear, ice. Not in the activity index at all: pliers (`tools/pliers` has no label).

**Task line** (≤ 24 px): Test "Will it float or sink? Let go at the top or on the sand — then watch." · Balance "The scale shows which is heavier. Will each one float or sink?" · Clay "Shape the clay, then put it in. Can you make it float?" · Facts "True or false? Tap one — then the tub shows you." · Lab "Answer the question: guess, test, and look at your record."

## 5. The hand
- **Lift a thing** from the shelf (pointerdown): it lifts and casts a shadow on the water within 50 ms. Over the tub a soft vertical "drop line" follows it and the zone under the finger lightens (surface band or sand) — the child sees which guess they are about to make.
- **Let go in the surface band** = guess FLOATS; **let go on the sand** = guess SINKS. A dotted ghost outline of the object is left exactly there (it stays until the next round).
  - Floater released at the surface → splash ring, it settles and bobs (±3 px, 1.6 s period). Right.
  - Floater released on the sand → it rises (900 ms, ease-out with a bubble trail) and bobs; the ghost stays on the sand. Miss (§7).
  - Sinker released on the sand → puff of sand, it settles. Right.
  - Sinker released at the surface → it floats for 250 ms, tilts, then falls with a side-to-side rock (1100 ms) into a sand puff; the ghost stays at the surface. Miss.
- **Balance:** at round start the two objects sit in the pans and the beam tips (600 ms, damped overshoot) — no action needed; then each object is lifted from its pan and dropped as above. The beam stays tipped (empty pans keep the tilt as a "remembered" shadow) during the test.
- **Clay:** drag the slider (or tap a detent): the lump morphs between stops (220 ms per step) — ball, snake, pancake, boat (a hull with raised sides). Then lift the clay and drop it like any object. After a test the clay can be lifted out (drag it back to the shelf), reshaped and tried again — the only mode where things come out.
- **Facts:** tap ✓ or ✗ (it lifts and glows); then Check drops the sentence's witness object(s) into the tub as the proof.
- **Lab:** each of the 6 objects is dropped like Test mode; its record row fills as it settles (guess arrow from the release zone, result arrow from the truth, match mark). After the 6th, tap one conclusion card.
- **Free play:** after each round's success the tub stays live — every thing on the shelf (all 16 testable objects in a drawer: 11 floaters, 5 sinkers) can be dropped and re-dropped, nothing scored, until Next.
- Sound (optional): plop, bubbles, sand puff, slosh; TTS reads the task line, facts and the question card (5 locales).

## 6. The rounds
**Test mode — Everyday (4 objects per round, 2 float + 2 sink; ≥ 1 big floater with ≥ 1 small sinker in the same round):**
| # | objects (truth) |
|---|---|
| 1 | log (F), nail (S), apple (F), rock (S) |
| 2 | ball (F), bolt (S), leaf (F), potato (S) |
| 3 | pumpkin (F), nail (S), feather (F), rock (S) |
| 4 | log (F), bolt (S), lemon (F), hammer (S) |
| 5 | ball (F), nail (S), pinecone (F), potato (S) |
| 6 | pumpkin (F), bolt (S), pencil (F), rock (S) |
| 7 | log (F), nail (S), banana (F), hammer (S) |
| 8 | ball (F), bolt (S), toy boat (F), hammer (S) |

**Test mode — Tricky (5 objects; the lures: big floaters, small sinkers, apple vs potato):**
| # | objects |
|---|---|
| 1 | pumpkin (F), nail (S), apple (F), potato (S), feather (F) |
| 2 | log (F), bolt (S), pencil (F), rock (S), nail (S) |
| 3 | ball (F), potato (S), lemon (F), bolt (S), rock (S) |
| 4 | pumpkin (F), log (F), nail (S), apple (F), potato (S) |
| 5 | log (F), bolt (S), pinecone (F), hammer (S), leaf (F) |
| 6 | ball (F), nail (S), apple (F), potato (S), rock (S) |
| 7 | pumpkin (F), bolt (S), banana (F), hammer (S), pencil (F) |
| 8 | log (F), nail (S), toy boat (F), potato (S), hammer (S) |
(Float:sink 3:2 or 2:3 alternating, so "half and half" never tells.)

**Balance mode (one pair per round; `PAIRS`; the heavier side and the floater are decoupled):**
| # | left pan · right pan | heavier | floats |
|---|---|---|---|
| 1 | pumpkin · potato | pumpkin | pumpkin |
| 2 | hammer · log | log | log |
| 3 | nail · ball | ball | ball |
| 4 | pencil · hammer | hammer | pencil |
| 5 | rock · feather | rock | feather |
| 6 | nail · apple | apple | apple |
| 7 | potato · pinecone | potato | pinecone |
| 8 | hammer · feather | hammer | feather |
| 9 | nail · lemon | lemon | lemon |
The heavier object is the floater in rounds 1, 2, 3, 6, 9 and the sinker in 4, 5, 7, 8 (5:4) — so "the heavy one sinks" fails in more than half the rounds. The heavier pan is left in rounds 1, 5, 7, 8 and right in 2, 3, 4, 6, 9.

**Clay mode (8 rounds):**
| # | task | shape given | truth |
|---|---|---|---|
| 1 | guess, then test | ball | sinks |
| 2 | guess, then test | boat | floats |
| 3 | guess, then test | pancake | sinks |
| 4 | guess, then test | snake | sinks |
| 5 | make it float | ball (start) | succeed when a boat floats |
| 6 | guess, then test | boat | floats |
| 7 | guess, then test | pancake | sinks |
| 8 | make it float | snake (start) | succeed when a boat floats |
(The slider is locked to the given shape in guess rounds; free in "make it float" rounds.)

**Facts mode (9 rounds; `TF` rows, witnesses from `TF.*.objects` / `evidence`):**
| # | sentence | truth | witness dropped by Check |
|---|---|---|---|
| 1 | A big log floats. | true | log |
| 2 | A potato floats. | false | potato |
| 3 | A small nail sinks. | true | nail |
| 4 | A feather sinks. | false | feather |
| 5 | All heavy things sink. | false | log |
| 6 | A heavy pumpkin floats. | true | pumpkin |
| 7 | Big things always sink. | false | pumpkin, ball |
| 8 | Some light things sink. | true | nail |
| 9 | A ball full of air sinks. | false | ball |
(The answer is "true" in 4 rounds and "false" in 5; never 3 of one in a row after the per-pass reshuffle — gate-asserted.) F9 "Only small things can float" and T3/F3 (the steel ship) are the reserve pool for the second pass (ship shown, not dragged).

**Lab mode (7 record sets of 6; each set breaks the naive rule its question names at least once):**
| # | question card | objects (truth) | conclusions (★ = supported) |
|---|---|---|---|
| 1 | Do heavy things always sink? | log F, nail S, pumpkin F, rock S, apple F, hammer S | ★ "Some heavy things float." · "Heavy things always sink." · "Only light things float." |
| 2 | Do big things always sink? | pumpkin F, bolt S, ball F, potato S, log F, nail S | ★ "Big things can float." · "Big things always sink." · "Small things always float." |
| 3 | Do small things always float? | nail S, bolt S, feather F, leaf F, potato S, apple F | ★ "Some small things sink." · "Small things always float." · "Only big things sink." |
| 4 | Do fruits float? | apple F, lemon F, banana F, potato S, rock S, pinecone F | ★ "These fruits floated." · "These fruits sank." · "Fruits and potatoes do the same." |
| 5 | Does metal float? | nail S, bolt S, hammer S, ball F, log F, pencil F | ★ "These metal things sank." · "Metal things float." · "Small metal floats." |
| 6 | Do heavy things always sink? | pumpkin F, rock S, log F, nail S, ball F, potato S | ★ "Some heavy things float." · "All heavy things sink." · "Heavy and light do the same." |
| 7 | Do light things always float? | feather F, nail S, leaf F, bolt S, pencil F, apple F | ★ "Some light things sink." · "All light things float." · "Light things always sink." |
The three conclusion cards are shuffled per round so ★ sits in each position 2–3 times per pass.

- **Answer position:** Test/Lab — shelf order shuffled per round so floaters occupy each shelf slot 35–65 % of the time over a pass (gate-measured over 200 passes); the drop zone is the answer, not a card position. Balance — heavier pan left 4 / right 5. Facts 4 true / 5 false. Lab ★ position balanced.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
Each drop resolves itself (the water is the judge); Check closes the round.
- **Check with things still on the shelf** → hint, no miss: "Put every thing in the water first."
- **A wrong guess (miss 1 for that object):** the physics of §5 — it travels from your ghost to its true place, and the ghost stays. Bubble: floated-but-guessed-sink → "You thought it would sink — but it floats! Look how big it is." (only if size class big; else "…but it floats!") · sank-but-guessed-float → "You thought it would float — but it sinks, even though it is small." (only if small; else "…but it sinks!").
- **Miss 2 (a second wrong guess in the same round):** before the next drop, the surface band and the sand both show faint silhouettes of the things already tested that "look like" the next one (same size class), so the child compares: "Look at what already floated and sank."
- **Balance:** a wrong guess on the heavier object adds a line under the tipped beam: "It was the heavier one — and it floats." (or "…and it sinks.").
- **Clay — guess rounds:** as Test. **Make-it-float rounds:** a sinking shape is a try, never a miss; after 2 sinking tries the boat detent on the slider glows · "Try a shape with sides that keeps the water out."
- **Facts — miss 1:** the witness drops in and does the opposite of the chosen token; the token tips over · "Watch the tub. Does it agree?" **miss 2:** the right token glows.
- **Lab — miss 1 (a conclusion the record contradicts):** a red thread runs from the card to the disproving row, which pulses, and the object in the tub wearing that row's tag lifts and settles again (the big log bobbing up) — the evidence is shown in the water, not only in the table; the card greys · "Look at this row. Does it agree?" **miss 2:** the supported card's border glows.
- A new move takes the help away until the next Check.
- **Success:** the tub sloshes once, floaters bob in a wave, bubbles rise from each sinker; bubble: Test "{f} floated and {s} sank — and size did not decide!" (f, s from the round; ICU plural, never 0) · Balance "The heavier one {floated|sank}: weight alone does not decide." · Clay "Same clay — the boat shape floats!" · Facts "Yes — the tub agrees." · Lab "Your record shows it: {conclusion}".

## 8. Settings
1. **Mode:** predict and test · balance first · shape the clay · true or false · my lab — the board at rest changes (bare tub · balance over the tub · clay lump + slider · facts card · record card).
2. **Objects** (Test mode): everyday (4 per round) · tricky (5, with big floaters and small sinkers) — visible at rest (4 vs 5 shelf cards). Hidden in the other modes.

## 9. Words (EN source)
- title "The Water Tub" · instruction "Guess where each thing will go — the top of the water or the sand — then let go and watch what the water does."
- prompts: promptTest, promptBalance, promptClay, promptFacts, promptLab (§4).
- hints: hintShelf "Put every thing in the water first." · hintFloatBig "You thought it would sink — but it floats! Look how big it is." · hintFloat "You thought it would sink — but it floats!" · hintSinkSmall "You thought it would float — but it sinks, even though it is small." · hintSink "You thought it would float — but it sinks!" · hintCompare "Look at what already floated and sank." · hintHeavyFloats "It was the heavier one — and it floats." · hintHeavySinks "It was the heavier one — and it sinks." · hintClay "Try a shape with sides that keeps the water out." · hintFacts1 "Watch the tub. Does it agree?" · hintLab1 "Look at this row. Does it agree?"
- celebrations: celebrateTest "{f} floated and {s} sank — and size did not decide!" · celebrateBalanceF "The heavier one floated: weight alone does not decide." · celebrateBalanceS "The heavier one sank: weight alone does not decide." · celebrateClay "Same clay — the boat shape floats!" · celebrateFacts "Yes — the tub agrees." · celebrateLab "Your record shows it: {conclusion}"
- facts sentences + lab questions + conclusions: stored whole per locale (the bank's `tf` block supplies the sentences already reviewed in 11 locales; questions/conclusions new, same register).
- labels: object names are the bank's panel literals (`labels[claimId]`), never vocab — `nail` reads "fingernail" in es/pt/fr/it/da/no/fi and `rock` "cliff" in 8 locales.
- settings: setMode "Mode" · modeTest "Predict and test" · modeBalance "Balance first" · modeClay "Shape the clay" · modeFacts "True or false" · modeLab "My lab" · setObjects "Objects" · objEveryday "Everyday" · objTricky "Tricky".
- **Locale traps:** float/sink verbs differ in form (de "schwimmt" — not "schwebt"; fr "flotte / coule"; nl "drijft / zinkt"; fi "kelluu / uppoaa"; sv "flyter / sjunker"; it "galleggia / affonda"; es "flota / se hunde"); the bank's `floatWord/sinkWord` are reused. The ✓ / ✗ tokens are universal; the words "true/false" appear only in aria. Size words ("big", "small") agree with the object in gendered locales — the hints are stored per object-gender-free frame ("Look how big it is" → de "Schau, wie groß es ist" uses "es" for "das Ding"; fr "Regarde comme c'est gros" — c'est avoids agreement). fi: no articles; partitive in "{f} kelluu" — the celebration uses the bank-reviewed pattern "{f} kellui ja {s} upposi" with numerals (verb agrees with a numeral as singular in fi). Lab questions use "always" (de "immer", fi "aina") — the reviewer confirms each conclusion has exactly one supported reading.

## 10. Sound off, access, phones
- Sound off: the ghost-vs-result gap, rising and falling motion, the tipped beam, the red thread to a record row — all visual.
- Keyboard: Tab to a shelf object; ↑ (float) or ↓ (sink) then Enter drops it; Clay: ← / → move the slider; Facts: ← / → choose ✓ / ✗; Lab: Tab to a conclusion, Enter.
- aria-live: "Log: you guessed sink. It floats." · "Beam tips toward the pumpkin."
- Taps: shelf cards ≥ 64 px; the surface band and sand zones are ≥ 40 px tall at 320 (drop targets, not buttons) and a keyboard alternative exists; ✓/✗ 64 px; Check 48 px.
- Pictures: size classes 136/108/96 px at 704 (all ≥ 96); at 360 88/72/64 px; record rows use tag numerals, never pictures.
- Fold at 360 × 740: header 56 + task 52 + shelf 2 × 80 + tub 260 + Check 56 = 584 px (Lab adds the record strip below the fold, reachable by scroll; Check stays above it because Check sits between tub and record). At 320 × 640: shelf 2 × 72, tub 230 → 538 px.

## 11. Distinct from
- **The Bet Pan** (new 209: put the thing you think heavier on the down-arrow pan) — weight comparison is the whole task there; here the balance is GIVEN and only sets up the float test. No betting pan, no pin.
- **measurement-bench** tool (tilting balance) — a measuring tool, not a buoyancy test.
- **Market Scale / Measuring Stations** (rows 32, 209) — measurement; this is materials science.
- The invention — guessing by release depth, the ghost, the tub keeping every test — is new in the registry.

## 12. Build plan
- **Model (core):** `state = { mode, set, roundIdx, shelf:[{id, size, truth}], tub:[{id, guess:'float'|'sink', truth, ghostY}], balance:{left,right,heavier}|null, clay:{shape:'ball'|'snake'|'pancake'|'boat', tries}, facts:{sentenceId, truth, choice}, lab:{rows:[], conclusionIdx, choice} }`. `release(id, zone)` → zone 'mid' = return; else push `{guess, truth}`, miss if differ. `shape(stop)`. `chooseFact(tf)`. `chooseConclusion(i)` → right iff ★; else `disproving row index` (first row whose truth contradicts the card's claim, from a hand-written per-card contradiction rule). `nextTask` order-only.
- **Gate ground truth (`verify-water-tub-core.js`, own table):** every object outcome equals a hand-copied row of `CLAIMS` (the gate keeps its own copy and asserts it equals the bank — a drift fails); no `EXCLUDED` picture and no unlabelled noun; every Test round has ≥ 1 big floater + ≥ 1 small sinker; Balance heavier-is-floater 5 / 4 and pan side balance; Clay: only `boat` floats; Facts truth matches `TF`, 4 T / 5 F; Lab: every set breaks its question's naive rule at least once, exactly one ★ per round, each wrong card has a disproving row; ★ position balance; celebrate counts ≥ 1.
- **Mutations:** release zone ignored (always right) · ghost not kept · object outcome flipped (nail floats) · a refused picture admitted · Test round without a small sinker · balance heavier drawn on the wrong side · clay pancake floats · Facts truth flipped · Lab wrong card has no disproving row · ★ always first · fixed shuffle · label from vocab (`nail` fingernail) · Check with shelf items succeeds.
- **Pictures to re-open at 96 and 64 px:** nail (steel grey), bolt (brass — reads metal), log (sawn), pencil (wood), pumpkin (whole), potato (brown, not a stone).
- **Clay physics owned here, not by the bank:** the bank's `SHAPES` rules only ball → sinks and boat → floats; this design adds snake and pancake → sink (true for modelling clay, density ≈ 1.5–1.8, no walls to hold air). The gate keeps this 4-row table as its own ground truth and the reviewer confirms it.
- **Risks:** a toy boat floats because of its shape — fine at K; `vehicles/ship` is shown, never physics-tested. Size classes are a design claim (pumpkin > potato, log > hammer) — the reviewer checks they match the `PAIRS` mass order. 
- **BLOCKED:** nothing. Wanted later: a labelled steel key (the pink one is refused) and a coin.

## 13. The four questions
1. **Choose it again?** Splashes, bubbles, logs shooting up from the bottom, nails rocking down, clay that turns into a boat, and a free tub after every round — yes.
2. **On the board?** The class shouts "top!" or "bottom!" before the teacher lets go; the ghost makes every surprise a discussion; the balance and the lab card are the textbook lessons in motion.
3. **Parent trust?** Every outcome comes from a reviewed, picture-checked table; no timer, no score; calm water.
4. **The invention:** "You guess by where you let go — at the top of the water or on the sand — and the water carries the thing to the truth, leaving your guess as a ghost and every test in the tub."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **`classroom/scissors` does not exist in the activity picture index** (it is a worksheet-bank row only); it sat in 6 round rows. Replaced with rock/hammer (Test 3/7, Tricky 3/7, Lab 5/6); the "Does metal float?" set is now nail, bolt, hammer + three floaters. The free-play drawer count corrected to 16.
- **Picture floor:** the small size class was 76 px at 704 and the record card showed 40 px object pictures. Size classes are now 136/108/96 (the honest big-vs-small contrast is kept, the floor is met); every object wears a numbered tag, and the record rows name objects by tag numeral (apparatus), per the orchestrator's record ruling.
- Shelf wraps to a second plank for 5–6 things so cards never shrink.
- Science checked against the G1-399 bank: every outcome (11 floaters, 5 sinkers) is a `CLAIMS` row; all 9 Balance pairs equal `PAIRS` (heavier side and floater verified, heavier-is-floater 5/4, heavier pan left 4/right 5); all 9 Facts sentences equal `TF` (4 true / 5 false); every Lab set breaks its question's naive rule at least once. Clay snake/pancake rows flagged as design-owned physics for the reviewer.
