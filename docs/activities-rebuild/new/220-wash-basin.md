# New 220 — The Wash Basin (health: hygiene)

## 0. Identity
- id `wash-basin.play.hygiene` · grade K · framework HEALTH (hygiene) · strand Health & Safety · files `wash-basin-core.js`, `wash-basin-activity.js`, `wash-basin-activity.html`, `wash-basin-activities.json` (scaffold `--num=220`).
- Worksheets covered: K-382 Hand Washing Steps (Wash mode) · K-380 What Does Each Child Use? (Which-tool mode) · G1-404 Stop the Germs + G1-403 Brushing Teeth: Before, During and After (Germ-trail mode) · G2-379 Why Do We Do Them? (Why mode). G1-405 (a week chart of habits the child really did) is self-report and stays a worksheet.
- Merged: grade-1 "The Germ Trail" = Germ-trail mode (its brushing setting = the toothbrush timeline rounds); grade-2 "The Body Shield" = Why mode.
- ⚠ **Partly BLOCKED on art** (§12): Wash mode needs `soap` and `towel` pictures; the cough-into-your-elbow moment needs an `elbow` label (art exists in the cache). The other three modes build now.

## 1. The pitch
"The germs only come off if you do the steps in the right order — soap won't lather on dry hands, scrubbing is what traps the germs, and a rinse only carries away what the bubbles caught."

## 2. Why a child will want it again
Two hands hover over a real-looking sink, sprinkled with glittery germ dots that twinkle a little. The tools wait on a shelf. Turn the tap and water pours with a shimmer and the hands go shiny-wet. Drop the soap on wet hands and it leaves white blobs; then the child RUBS — a real back-and-forth wipe across the hands — and with every rub the hands slide against each other and froth up bubbles, and each bubble swallows a germ dot inside it (you can see the glitter trapped in the bubble). Rinse, and the bubbles swirl down the plughole carrying their germs with a gurgle. Dry, and the drops vanish in a sparkle and the hands shine. The order is a little machine the child discovers: soap on dry hands just slides off into the sink; scrubbing without soap only pushes the glitter around; a towel on soapy hands comes away smeared. The show at the end: the last germ pops in a sparkle, the hands shine and give a tiny wave.

## 3. The skill and the misconception
- **Skill:** wash hands in the right order (wet, soap, scrub, rinse, dry) and scrub long enough; know which tool is for which care job; choose the action that stops germs spreading; put brushing steps in order; say why we do healthy habits.
- **Misconceptions and how the basin pushes back (mechanism, not message):**
  1. *"A quick rinse cleans."* Rinsing without the scrub washes off only the 3 loose germs on the surface; the other 21 cling and keep twinkling.
  2. *Skipping or shortening the scrub.* Only bubbles trap germs, and each rub wraps about three; it takes 8 rubs to catch all 24 — a child who rubs twice and rinses sees most germs still there. (No timer: the rubs are counted, not the seconds.)
  3. *Soap first.* Soap on dry hands will not lather: the bar slides off the hands into the basin and waits there.
  4. *Drying too early.* The towel on soapy hands comes away smeared and the bubbles (with their germs) are still on the hands.
  5. *Wiping on clothes / coughing into a hand* (Germ trail): the glitter visibly travels — onto the shirt, then onto the apple; from the hand onto the door handle — or vanishes down the drain / into the tissue.

## 4. The stage
Layout `split` at ≥ 700 px (stage left, step strip + bubble right); stacked below.

**At 704 px** (stage 460 × 440):
- **The sink** (around-the-house/sink, 220 px wide) bottom-centre; **the tap** (around-the-house/faucet, 110 px) above its back edge; the water stream is drawn apparatus (a translucent blue ribbon with moving highlights).
- **The hands:** body-parts/hand at 150 px (left hand palm-up as drawn) and the same picture mirrored (right hand), hovering above the basin, fingertips up, 30 px apart.
- **Germ dots:** 24 glitter dots (8 px at 704, 6 px at 360 — tiny on purpose, like real germs; every germ STATE change is carried by something bigger: a 22 px bubble around a caught germ, the 600 ms swirl down the drain, the step strip — so the story is legible at 360 without reading single dots; lime with a white sparkle, gentle twinkle) at seeded positions: palms 10, fingers 8, thumbs 4, between fingers 2.
- **The shelf** (top, 440 × 110): 5 slots of 96 px holding the tools (Wash mode): faucet-tap card (a small faucet picture = "water"), soap, a **rub** card (drawn: two curved arrows facing each other — apparatus), faucet-tap card (rinse uses the same tap card, it can be used twice), towel.
- **The step strip** (right column, 200 × 300): 5 numbered slots (1–5) that record the tools in the order used, as small cards — the K-382 "write 1 to 5" sheet in motion. In the 4-step setting, 4 slots and the tap already running at the start (hands wet).
- **Germ trail:** a film strip of 3 frames (each 200 × 150 at 704) left → right, two action cards below the first frame.
- **Which tool:** a round mirror frame (apparatus) holding one big part picture (body-parts/tooth, head, nose, hand at 160 px) and 3 tool cards (96 px) below.
- **Why:** 3 part pictures (96 px) in a row and 3 habit "shield" cards (96 px, on a drawn shield-shaped tag) below.

**At 360 px:** sink 170 px, hands 110 px each, germs 6 px, shelf a row of 5 × 62 px cards (pictures 56–60 px — tool cards are labels, the hands/part pictures are the subject at ≥ 64 px), the step strip becomes a horizontal row of 5 slots (44 px) under the sink; film frames sit 3 in a row at 104 × 86 px, each showing one picture at 64 px with its glitter. At 320: hands 100 px, shelf cards 56 px (≥ 44 tap).

Library pictures (all in `mini tools/pictures`, seen on contact sheets): around-the-house/ sink, faucet, toothbrush, toothpaste, comb, toilet, door, bed · body-parts/ hand, tooth, head, nose, heart, brain, face · hospital/tissue · kitchen-tools/cup · clothing/shirt · fruits/apple · toys/ball · beach/sunscreen · pets/dog. MISSING (§12): soap, towel, elbow.

**Task line** (≤ 24 px): Wash "Wash the germs away. Use the tools in the right order." · Tool "What do we use for this?" · Germ trail "What should we do now?" / "Put the brushing pictures in order." · Why "Put each habit on the part it keeps healthy."

## 5. The hand
- **Drag a tool onto the hands** (Wash): the tool card lifts, and over the hands it shows its action:
  - **tap card:** water pours (600 ms), hands get a wet sheen + droplets; after the scrub this is the rinse: bubbles with germs swirl down the plughole (900 ms, gurgle); before the scrub: 3 loose germs wash away, the rest stay.
  - **soap:** on wet hands → 3 white soap blobs settle on the palms; on dry hands → the bar slides off the fingertips and lands in the basin (it can be picked out again).
  - **rub card:** activates the scrub: the child drags back and forth across the hands; the two hands slide against each other with each pass (a 12 px sway); every direction change after ≥ 60 px = 1 rub. With soap: each rub froths 4 bubbles and wraps the 3 nearest unwrapped germs (germ dot visible inside a bubble). Without soap: each rub shifts the germs a few px (they move, not wrapped). The rub card's little arc fills one segment per rub (8 segments) — a visible "long enough", not a timer.
  - **towel:** on rinsed wet hands → droplets vanish in a sparkle; on soapy hands → the towel shows grey smears and the bubbles stay.
  - Every tool used adds its card to the next step-strip slot (even a wrong order — the strip shows what was done).
- **Fresh hands** (48 px control): germs re-sprinkle, strip clears (only between attempts; no penalty).
- **Which tool:** tap a tool (it lifts) or drag it to the mirror; Check.
- **Germ trail:** tap one of the two action cards (it lifts); Check plays frames 2 and 3.
- **Brushing timeline:** drag the 3 brushing cards into slots 1-2-3 on a drawn toothbrush-shaped timeline.
- **Why:** drag a shield onto a part; it docks on it.
- **Free play:** after success in Wash mode, the tap, soap and rub stay live (bubbles, splashing) until Next.
- Sound (optional): pouring water, squish of soap, bubble pops, gurgle, sparkle chime; TTS reads the task line.

## 6. The rounds
**Wash mode (5 steps; correct order wet → soap → scrub → rinse → dry):** rounds vary the pre-done step (already shown in the strip, greyed, done for the child) and the shelf order; each tool sits in each shelf slot across the pass.
| # | pre-done step | shelf order (slots 1–5) |
|---|---|---|
| 1 | none | towel, tap, rub, soap, tap |
| 2 | wet | soap, towel, tap, rub, (tap — used) |
| 3 | none | rub, soap, towel, tap, tap |
| 4 | soap (wet + soap done) | tap, rub, soap, towel, tap |
| 5 | none | tap, tap, soap, rub, towel |
| 6 | scrub (wet, soap, scrub done) | towel, soap, rub, tap, tap |
| 7 | none | soap, rub, tap, towel, tap |
| 8 | none | tap, towel, tap, soap, rub |
| 9 | rinse (all but dry done) | rub, tap, towel, tap, soap |
4-step setting: the tap runs at the start (hands wet), order soap → scrub → rinse → dry, shelf of 4 (tap, soap, rub, towel) in a 4 × 4 Latin square over rounds 1–4, repeated with rounds 5–8, round 9 = round 1 reversed.

**Which-tool mode** (part in the mirror → 3 tools, correct slot):
| # | part | tools (L, M, R) | right |
|---|---|---|---|
| 1 | tooth | toothbrush, comb, tissue | L |
| 2 | head (hair) | tissue, comb, faucet | M |
| 3 | nose | comb, faucet, tissue | R |
| 4 | hand | faucet, toothbrush, comb | L |
| 5 | tooth | tissue, toothbrush, faucet | M |
| 6 | head | toothbrush, tissue, comb | R |
| 7 | nose | tissue, comb, toothbrush | L |
| 8 | hand | comb, faucet, tissue | M |
| 9 | tooth | faucet, comb, toothbrush | R |
(toothpaste never appears as a distractor for tooth — it is right too; it appears in the brushing timeline.)

**Germ-trail mode** (moment → 2 action cards; the right one stops the germs):
| # | moment (frame 1) | cards | right | frame 2 → 3 if right / if wrong |
|---|---|---|---|---|
| 1 | hands with glitter + apple (before eating) | faucet / shirt | faucet | glitter down the drain → clean hands holding the apple / glitter on the shirt → glitter on the apple |
| 2 | sneeze (a hand near the nose) | hand / tissue | tissue | glitter caught in the folded tissue / glitter on the hand → on the door |
| 3 | after the toilet (toilet) | faucet / ball | faucet | clean hands → ball / glitter on the ball |
| 4 | after stroking the dog (dog) | apple / faucet | faucet | clean hands → apple / glitter on the apple |
| 5 | brushing timeline: toothpaste, toothbrush on tooth, cup | slots 1–3 | toothpaste → toothbrush → cup | — |
| 6 | sneeze again (nose) | tissue / hand | tissue | as 2 |
| 7 | before eating (apple) | shirt / faucet | faucet | as 1 |
| 8 | brushing timeline (cards dealt in a different order) | slots 1–3 | toothpaste → toothbrush → cup | — |
| 9 | after the toilet | ball / faucet | faucet | as 3 |
Cards are listed in their dealt order: the right card is on the left in rounds 1, 3, 6 and on the right in rounds 2, 4, 7, 9 (gate: L 3 / R 4, and the per-pass reshuffle never puts the right card on the same side 3 rounds running). Cough-into-your-elbow rounds (elbow / hand) are added when the elbow label lands.

**Why mode** (3 parts + 3 shields per round; the five habits: toothbrush → tooth (no holes), ball → heart (strong heart), bed → brain (rested), faucet → hand (no germs), sunscreen → face (skin safe from sunburn)):
| # | parts | shields (dealt order) |
|---|---|---|
| 1 | tooth, heart, hand | faucet, toothbrush, ball |
| 2 | brain, face, tooth | toothbrush, bed, sunscreen |
| 3 | hand, brain, heart | ball, faucet, bed |
| 4 | face, hand, tooth | sunscreen, toothbrush, faucet |
| 5 | heart, face, brain | bed, ball, sunscreen |
| 6 | tooth, brain, hand | faucet, bed, toothbrush |
| 7 | heart, tooth, face | toothbrush, sunscreen, ball |
| 8 | brain, hand, face | sunscreen, faucet, bed |
| 9 | hand, heart, tooth | ball, toothbrush, faucet |
A shield is never dealt directly under its own part (gate-asserted).

- **Answer position:** Wash — Latin-square shelf (each tool in each slot ≥ 1 per pass, gate-measured); Which tool — right slot L 3 / M 3 / R 3; Germ trail — right card L 3–4 / R 3–4; Why — never under its part.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: Wash "Pick a tool and put it on the hands." · Tool "Tap the thing we use for this." · Trail "Tap what we should do." · Why "Drag a habit onto a part."
- **Wash — Check with germs left, soap left, or wet hands** = a miss:
  - **miss 1:** the germs that remain pulse; in the step strip the first slot that is out of order (or the missing step) pulses with an empty outline · hint "Some germs are still there. Look at the step strip — which step is missing or out of place?" (if the rub card is under 8 segments: "Rub longer — keep going until every germ is in a bubble.")
  - **miss 2:** the strip shows the outline of the next right tool in its slot, and that tool on the shelf breathes · hint "Use the tool that is glowing next."
- **Which tool — miss 1:** the chosen tool does its motion over the part and nothing happens (a comb over a tooth just slides) · "Does that help the {part}? Try another." **miss 2:** the right tool's card lifts and glows · "This one cares for the {part}."
- **Germ trail — miss 1:** frames 2 and 3 play the wrong path: the glitter visibly spreads · "Look where the germs went. Which card stops them?" **miss 2:** the right card's frames play as a faint preview · "Try the card that keeps the germs away."
- **Brushing — miss 1:** the misplaced card wobbles · "What do we do first, before brushing?" **miss 2:** slot 1 shows the toothpaste outline.
- **Why — miss 1:** the wrong shield slides off and the part it really protects glows faintly · "This habit helps a different part." **miss 2:** the right part for each loose shield shows its outline.
- A new move takes the help away until the next Check.
- **Success:** Wash — the last germ fades in a sparkle, the hands shine and give a small wave, the strip's five cards glow 1-2-3-4-5 · "Clean hands! Wet, soap, scrub, rinse, dry." Tool — the tool does its job (brush strokes on the tooth, comb strokes on the hair, tissue dab on the nose, water over the hand) · "Yes — we use the {tool} for the {part}." Trail — the clean path frames glow · "Yes — that stops the germs!" Brushing — the three slots glow in order · "Before: toothpaste. During: brush. After: rinse." Why — each part glows and its "because" line appears under it (stored per habit: "Brushing keeps teeth free of holes.", "Running and playing make your heart strong.", "Sleep rests your brain.", "Washing takes germs off your hands.", "Sun cream keeps your skin safe from sunburn.").

## 8. Settings
1. **Mode:** wash the hands / which tool? / stop the germs / why we do it — the board at rest changes (sink and hands · mirror and tools · film strip · parts and shields). While Wash is blocked the drawer hides it.
2. **Steps** (Wash mode only): 5 steps / 4 steps (tap already running) — visible at rest (5 vs 4 strip slots and shelf cards).

## 9. Words (EN source)
- title "The Wash Basin" · instruction "Use the tools in the right order to wash every germ away — and choose what keeps germs from spreading."
- prompts: promptWash "Wash the germs away. Use the tools in the right order." · promptTool "What do we use for this?" · promptTrail "What should we do now?" · promptBrush "Put the brushing pictures in order." · promptWhy "Put each habit on the part it keeps healthy."
- hints: all §7 strings (hintWashStart, hintWash1, hintRubLonger, hintWash2, hintTool1 "Does that help the {part}? Try another.", hintTool2, hintTrail1, hintTrail2, hintBrush1, hintBrush2, hintWhy1, hintWhy2).
- celebrations: celebrateWash · celebrateTool · celebrateTrail · celebrateBrush · the five "because" lines.
- step names (aria + strip tooltips): wet, soap, scrub, rinse, dry.
- settings: setMode "Mode" · modeWash "Wash the hands" · modeTool "Which tool?" · modeTrail "Stop the germs" · modeWhy "Why we do it" · setSteps "Steps" · steps5 "5 steps" · steps4 "4 steps".
- **Locale traps:** "germs" — de *Keime* (child register; not *Bakterien*), fr *microbes*, es *gérmenes*, it *germi / microbi*, pt *germes*, nl *bacteriën / bacillen* (reviewer: *bacteriën* is the school word), sv *bakterier* (K register), da *bakterier*, no *bakterier*, fi *bakteerit / pöpöt* (child register *pöpöt* — reviewer decides). "Sun cream" vs "sunscreen" — the picture label comes from vocab (beach/sunscreen); fr *crème solaire*. The steps' verbs need the K imperative register (de "nass machen, einseifen, reiben, abspülen, abtrocknen"; fr "mouiller, savonner, frotter, rincer, sécher"; fi "kastele, saippuoi, hankaa, huuhtele, kuivaa"). "Before / during / after" in fi: *ennen / aikana / jälkeen* are postpositions ("pesun jälkeen") — the brushing celebration is stored whole. Sneezing into a tissue vs the elbow: the elbow advice is universal across the 11 school health programmes; the tissue round stays valid everywhere.

## 10. Sound off, access, phones
- Legible with sound off: germs are visible glitter, bubbles visibly trap them, the drain swirl, the smeared towel, the step strip — all visual.
- Keyboard: Tab to a shelf tool, Enter applies it to the hands; on the rub card Space = one rub; Germ trail / Tool: arrow keys + Enter; Why: Tab a shield, Tab a part, Enter docks.
- aria-live: "Soap slid off — hands are dry", "7 germs left", "All germs in bubbles".
- Taps: shelf cards ≥ 56 px at 320, the rub area = the whole hands region (≥ 200 × 110), controls 48 px.
- Pictures: hands 150 / 110 px, part and tool pictures ≥ 96 at 704; at 360 the subject pictures ≥ 64 px.
- Check above the fold at 360: header 56, task 52, shelf 70, stage 240, strip row 52 → ≈ 470 px.

## 11. Distinct from
- #221 Everyday Plate (same batch) sorts foods into sections; #219 Body Map labels parts. Here the invention is ORDER-DEPENDENT physics on the hands.
- `our-day` tool (a daily schedule of cards) — a timetable, not a cause-and-effect sequence.
- Registry: no mechanic reused.

## 12. Build plan
- **Core state** `{mode, steps, roundIdx, hands:{wet, soap:0..3, germs:[{x,y,state:'loose'|'stuck'|'bubbled'|'gone'}], smears, dry}, strip:[tool…], rubs, chosen, help}`. Functions: `apply(tool)` (the rules of §5 as a pure reducer), `rub()` (direction-change detector in the activity; the core counts), `germsLeft()`, `stripErrors()` (first out-of-order index vs the canonical order), `checkWash()` = germs all gone ∧ no soap ∧ dry — judged on the HANDS, not on the strip: extra tap uses are allowed (an early rinse then the full sequence still ends clean, because the scrub catches the 21 that clung — 7 rubs — and the second rinse carries them off). The strip records honestly what was done, so in the success line it shows the child's real order; `chooseTool`, `chooseCard`, `placeBrush`, `dockShield`, `check()`, `helpLevel()`, `hintKey()`, `layout(width)`.
- **Gate's own truth (verify):** an independent simulator of the basin rules asserts: the canonical order with 8 rubs ends clean in every round; every order that uses each of the 5 shelf cards exactly once, other than canonical, leaves germs, soap or water (exhaustive over the distinct orders × rub counts 0–10); with free extra tap uses, every sequence that ends clean CONTAINS wet → soap → scrub (enough rubs) → rinse → dry as a subsequence (search to length 8); 7 rubs leave ≥ 1 germ, 8 leave 0; soap on dry hands never lathers; rinse before scrub removes exactly the loose germs; the towel on soapy hands leaves bubbles. Which-tool / trail / why tables: one right answer, slot tallies as §6, shield never under its part. Every picture key exists in `mini tools/pictures` (soap/towel/elbow flagged MISSING → Wash mode and the elbow rounds disabled).
- **Mutations:** soap lathers on dry hands · rub without soap wraps germs · rinse before scrub removes all germs · towel dries soapy hands clean · 4 rubs enough · strip records only right steps · pre-done step ignored · comb accepted for tooth · shirt card stops germs · brushing cup accepted first · shield accepted on the wrong part · help kept after a new move · Check with nothing counts a miss.
- **Pictures to verify:** around-the-house (sink, faucet, toothbrush, toothpaste, comb, toilet, door, bed), body-parts (hand, tooth, head, nose, heart, brain, face), hospital/tissue, kitchen-tools/cup, clothing/shirt, fruits/apple, toys/ball, beach/sunscreen, pets/dog — seen on the contact sheets except clothing/fruits/beach/pets (open at build).
- **BLOCKED — exact missing art:** `soap` (a bar of soap or a plain soap pump, labelled "soap" in lcs-pictures ×11; the at-the-supermarket/shampoo pump must NOT be relabelled — its vocab word is shampoo), `towel` (a hand towel), `elbow` (art exists in the cache `body parts/elbow` — needs an lcs-pictures entry with labels ×11). **Honest fallback:** build and ship Which-tool, Germ-trail (without the cough moment) and Why now — they cover K-380, G1-403, G1-404 and G2-379; Wash mode (K-382, the core sequence) is coded and gated against stand-in test keys but hidden from the drawer until soap and towel land. There is no honest substitute for soap or a towel (a drawn soap bar is a drawn object; a relabelled shampoo is a false label). Add both to `new/ART-NEEDS.md`.
- **Risks:** the rub gesture on small phones — the whole hands region is the rub zone and a keyboard/tap alternative (each tap on the rub card = 1 rub) exists.

## 13. The four questions
1. **Would a child choose it again?** Yes — taps that pour, soap that blobs, rubbing that froths bubbles which swallow glitter, a gurgling drain and shining hands.
2. **Would a teacher put it on the board?** Yes — the order and the scrub length are enforced by cause and effect, not by a list; the germ trail SHOWS spreading; the why-shields tie habits to the body.
3. **Would a parent trust it?** Calm, library pictures, sound health advice in every locale, no fear (germs are glitter, not monsters), no score or timer.
4. **The invention:** germs that only bubbles can catch — so wet, soap, scrub (long enough), rinse and dry is the only order that leaves the hands clean.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→3 (Wash mode honestly BLOCKED on soap + towel; the other three modes are real today)
What changed:
- **Correctness:** the success rule is now judged on the HANDS, not the strip. Extra tap uses are allowed, and the gate's claim is now exact: only exactly-once orders can be compared with "every other permutation". A child who rinses early and then does the full sequence ends clean, as in life. Before, the gate's "120 permutations" claim did not match a shelf where the tap can be used twice.
- Germs at 6–8 px were the smallest thing on the stage. Every germ state change now has a bigger carrier: a 22 px bubble, the drain swirl, the step strip.
- **Reality:** opened the around-the-house contact sheet. The sink (pedestal), faucet, comb, toothbrush, toothpaste, toilet and door are all clean. around-the-house/shampoo is a blue pump bottle labelled *shampoo*, and at-the-supermarket/shampoo is a pink pump. Neither may stand in for soap, which confirms the BLOCKED call. around-the-house/brush is a PAINT brush, so the design is right to use the comb for hair. clothing/shirt exists in the JSON.
- Not changed, and stated plainly: Wash mode is the heart of this design and K-382's core sequence, and it is BLOCKED until `soap` and `towel` art is labelled (and `elbow` for the cough round). Until then the activity ships Which-tool, Germ-trail and Why. That is honest, but it is not yet the unbeatable version.
