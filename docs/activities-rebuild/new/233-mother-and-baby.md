# New 233 — Mother and Baby → THE GROWING-UP DIAL (NGSS 1-LS3-1)

## 0. Identity
- id `mother-and-baby.play.1-ls3-1` · grade K · NGSS 1-LS3-1 (young animals are like, but not exactly like, their parents), framework via `alignment.framework` · strand Science · files `mother-and-baby-core.js`, `mother-and-baby-activity.js`, `mother-and-baby-activity.html`, `mother-and-baby-activities.json`. Scaffold `node scripts/new-activity.js --num=233`.
- worksheets covered: K-205 Animal Babies (draw a line from each grown-up to its baby).

## 1. The pitch
"Take the baby to the grown-up you think is its mother and wind the growing-up dial: the baby grows into what it really becomes — if it was the right mother, they end up twins."

## 2. Why a child will want it again
- The dial is the toy: a big round crank the child winds with a finger; as it turns, the baby swells and changes, and winding backwards shrinks it to a baby again. Children wind it back and forth just to watch a chick turn into a hen and back.
- The reveal is honest and surprising: the yellow fluffy chick grows into a cream hen with a red comb; the fluffy duckling smooths into a duck that stands like a twin beside its mother; the caterpillar fades, rests, and opens into a butterfly. Wrong guesses are not punished — the baby simply grows into what it is, standing beside the wrong grown-up for everyone to see ("that's a duck next to a goose!").
- Earned show per round: right parent → the grown-up and the grown baby bob together twice as twins, then the baby winds back small and nuzzles in at its mother's feet; the pair moves to a little family row along the meadow fence. After a pass the fence row holds every family the child put together.
- Free play: between rounds, any family on the fence can be tapped to wind its baby up and down again.

## 3. The skill and the misconception
- **Skill:** match baby animals to their parents (K-205); young animals are like their parents in many ways but not exactly alike — some look like small copies, some change colour or shape as they grow, one changes completely (1-LS3-1).
- **Misconception 1 — "babies are small copies of their parents".** **Pushback:** the growing-up crossfade shows the change itself: the chick's yellow fluff becomes cream feathers and a comb; the caterpillar becomes something with wings. A child who gives the hen the yellow, fluffy duckling (it looks most like her chick right now) sees it grow into a duck — standing beside the hen, plainly not her.
- **Misconception 2 — "it goes with the one that looks most like it right now".** The same-family distractor in every round (goose for the duckling, goat for the lamb, donkey for the foal, turkey or quail for the chick, bee or wasp for the caterpillar) looks closest; the dial shows that resemblance now is not the same as what the baby becomes.
- **Misconception 3 — "a caterpillar's mother is a worm".** In the reverse task the earthworm and snail wait beside the caterpillar; dragged to the butterfly they grow into a bigger earthworm/snail — they are already grown-ups of their own kind.

## 4. The stage
At **704 px** (no split; bubble under the stage):
- **Meadow** (680 × 260): a drawn green ground band with a simple drawn rail fence at the back; **four grown-ups** stand on it in four slots (library pictures, 140 px each, 160 px apart). In front of each grown-up a faint drawn **grow pad** (an oval, 120 × 24).
- **The gate** (left, 120 × 180): a drawn gate where the baby waits (library picture 110 px).
- **The growing-up dial** (right of the meadow, 110 × 110): a round drawn dial with a knob on its rim and a track of 8 small ticks; a sun mark at the start and a full ring at the end (geometry only, no words). Greyed until a baby stands on a pad.
- **Family fence row** (top, 680 × 56): finished families as 48 px pairs.
- **Task line (≤ 24 px):** "Who is this baby's mother? Take it there, then wind the dial." (reverse: "Which baby belongs to this mother? Take it to her, then wind the dial.")
- No words on the apparatus.

Reverse task: one grown-up stands in the centre of the meadow (160 px) with its pad; three babies wait at the gate side by side (100 px each).

At **360 px** (stacked): meadow as a 2 × 2 grid (cells 160 × 140, grown-ups 96 px, pads under them); gate row under it with the baby (88 px) and the dial (88 px) side by side; fence row 344 × 40. Height: 40 + 30 + 290 + 110 = 470 — Check above both folds (320: cells 144 × 128, pictures 88).

## 5. The hand
- **Drag the baby** (lifts within 50 ms with a little hop): over a pad the pad brightens; drop → the baby **trots** there (library picture bobbing in 3 small hops, 450 ms). Drop elsewhere → it hops back to the gate. A baby on a pad can be dragged to another pad before winding.
- **Wind the dial** (drag the knob around clockwise; or tap the dial centre for an automatic 1.6 s wind): the baby scales from 1.0 to the grown-up's size (`adultScale` per pair, 1.4–1.8) and, between 35 % and 75 % of the turn, crossfades into **its own true grown-up picture** (from the pair table — never the chosen one). A soft rising tone follows the knob. Winding backwards reverses everything. For the caterpillar the crossfade has a rest: from 40 % to 60 % the caterpillar's opacity falls to a dashed outline (a drawn oval, the resting stage) and the dial's ring shows a small moon tick; then the butterfly opens from the outline.
- **At the end of the turn (100 %):**
  - **right grown-up:** the grown baby and the grown-up stand side by side; both bob together twice (twin bob, 2 × 300 ms); paired outline rings (drawn, teal, hand-set hotspots) flash on what they share — beak and beak, feet and feet, ears and ears — then the dial unwinds by itself, the baby shrinks back and nuzzles against the grown-up (a 6° lean), and the family slides to the fence row.
  - **wrong grown-up:** the grown baby is visibly a different animal beside the chosen one; it looks round (flip 180° and back, 300 ms), the dial unwinds by itself, the baby shrinks back and hops to the gate.
- **Free play:** families on the fence wind up and down on tap.

## 6. The rounds
### The pairs (one right parent each; same-family distractor marked ★)
Critic rulings from the contact sheets (PICTURE-RULINGS.md): **farm-animals/duckling and farm-animals/duck are near-identical drawings** (the "baby" would simply be the mother picture — matching, not thinking) → the duckling is **spring/duckling** (a fluffy baby with a flat orange bill and brown wing fluff — plainly a baby, plainly a duck); **farm-animals/calf is drawn as a small horned cow** and is refused wherever "calf" is named → the calf/cow pair is dropped; **chick and duck are never in one round** (too close at small sizes). Each baby has two or three different library drawings, so a pass meets the same kind of baby drawn differently (the child matches the animal, not a copy of a picture).

| baby (library drawings) | true grown-up | adultScale | change shown |
|---|---|---|---|
| chick — farm-animals/chick · spring/chick · easter/chick | farm-animals/hen | 1.6 | yellow fluff → cream feathers, a red comb appears |
| duckling — spring/duckling | farm-animals/duck | 1.5 | fluff → smooth feathers, same bill |
| foal — farm-animals/foal | farm-animals/horse | 1.6 | small copy, longer legs |
| lamb — farm-animals/lamb · spring/lamb · easter/lamb | farm-animals/sheep | 1.4 | small copy, wool grows thick |
| caterpillar — insects-and-bugs/caterpillar · spring/caterpillar | insects-and-bugs/butterfly (insects drawing) / spring/butterfly (spring drawing) | 1.3 | changes completely (Change rounds only) |

### A. Baby finds its mother (setting Direction: baby → mother) — 9 rounds (7 with Change rounds off)
| # | baby (drawing) | the four grown-ups in the meadow |
|---|---|---|
| M1 | farm-animals/chick | **hen** · birds-2/turkey ★ · farm-animals/goose · farm-animals/cow |
| M2 | spring/duckling | **duck** · farm-animals/goose ★ · birds-2/swan · farm-animals/pig |
| M3 | farm-animals/foal | **horse** · farm-animals/donkey ★ · farm-animals/llama · farm-animals/sheep |
| M4 | farm-animals/lamb | **sheep** · farm-animals/goat ★ · farm-animals/llama · farm-animals/pig |
| M5 | insects-and-bugs/caterpillar | **butterfly** · insects-and-bugs/bee ★ · insects-and-bugs/ladybug · insects-and-bugs/dragonfly *(Change)* |
| M6 | spring/chick | **hen** · birds-2/quail ★ · birds-2/turkey · farm-animals/horse |
| M7 | spring/lamb | **sheep** · farm-animals/goat ★ · farm-animals/donkey · farm-animals/cow |
| M8 | spring/caterpillar | **spring/butterfly** · insects-and-bugs/wasp ★ · insects-and-bugs/ladybug · spring/bee *(Change)* |
| M9 | easter/chick | **hen** · birds-2/turkey ★ · farm-animals/goose · farm-animals/llama |
**Refused as distractors because they are a true parent or the same animal:** rooster (the chick's father), bull and ox (cattle), farm-animals/chicken (= the hen drawing), birds-2/hen (a second hen), horse_2, cat_2. **No duck in a chick round, no chick in a duck round.** Every grown-up in the meadow is a different animal from the baby's true parent, and the ★ is the closest look-alike now (the turkey and quail are also ground birds; the goat is woolly-ish and hoofed; the donkey is a horse shape; the bee and wasp are striped flyers).

### B. Mother finds her baby (setting Direction: mother → baby) — 9 rounds (7 with Change rounds off)
| # | mother | the three babies at the gate |
|---|---|---|
| R1 | hen | **farm-animals/chick** · spring/duckling ★ · farm-animals/lamb |
| R2 | duck | **spring/duckling** · spring/lamb · farm-animals/foal |
| R3 | horse | **farm-animals/foal** · spring/lamb · spring/chick |
| R4 | sheep | **farm-animals/lamb** · farm-animals/foal · easter/chick |
| R5 | butterfly | **insects-and-bugs/caterpillar** · forest-creatures/earthworm ★ · insects-and-bugs/snail *(Change)* |
| R6 | hen | **spring/chick** · spring/duckling ★ · easter/lamb |
| R7 | sheep | **easter/lamb** · farm-animals/foal · spring/duckling |
| R8 | horse | **farm-animals/foal** · easter/chick · spring/lamb |
| R9 | spring/butterfly | **spring/caterpillar** · insects-and-bugs/worm ★ · forest-creatures/snail *(Change)* |
(R2 has no ★: the only baby that looks like a duckling is a chick, and chick + duck never share a round.) A wrong baby wound beside the mother grows into its own grown-up (spring/duckling → duck beside the hen); the earthworm, worm and snails grow only a little and stay themselves (adultScale 1.2, no crossfade) — "already a grown-up kind".

**Answer position:** baby→mother: the true grown-up's meadow slot over 9 rounds is 3/2/2/2 (7 rounds: 2/2/2/1), never the same slot twice running, the ★ adjacent to it; the gate asserts no slot > 34 % per pass. mother→baby: the true baby's gate position over 9 rounds is 3/3/3 (7: 3/2/2), never the same twice running.
**Order:** order-only reshuffle per pass (round order and, within a round, the non-answer positions), never the previous pass's sequence; two rounds with the same baby kind are never adjacent.

## 7. Check, the misses, the success
The dial is the Check (answerType 'state'); the shell Check winds the dial automatically.
- **Wind with the baby still at the gate** → the dial does not turn (a small shake); bubble "First take the baby to a grown-up." (no miss)
- **Miss 1 — the shape:** the baby grows to full size beside the wrong grown-up, but only as a **shadow**: its true grown-up's silhouette (the library picture's own alpha mask, filled flat teal at 35 %, no inner detail — derived from library art, never drawn) — so the child sees that what it grows into is not the shape standing next to it (a hen-shaped shadow beside a goose), without being shown which animal it is. Then it shrinks and hops back. Hint: "It doesn't grow into that shape. Look at the shadow again." (reverse: "That baby doesn't grow into a {mother}. Try another baby.")
- **Miss 2 — the animal:** as miss 1, but the shadow fills in to the full true grown-up picture (crossfade 400 ms), both stand together for 1.2 s, then the true grown-up in the meadow lifts its head (a 10° raise and a soft glow ring on its pad). Hint: "It grew into a {grown-up}! Find the {grown-up}." (reverse: "That baby grows into a {grown-up}. Which baby grows into a {mother}?")
- A new drag clears the showing until the next wind.
- **Success:** twin bob, shared-feature rings, the baby nuzzles in, the family moves to the fence. Bubble: "The {baby} grows into a {grown-up}. Its mother is the {grown-up}!" plus one authored like/unlike line per pair:
  - chick: "A chick is yellow and fluffy. When it grows, it gets cream feathers and a red comb."
  - duckling: "A duckling is fluffy. When it grows, its feathers get smooth."
  - foal: "A foal looks like a little horse with long legs."
  - lamb: "A lamb looks like a little sheep. Its wool grows thick."
  - caterpillar: "A caterpillar changes completely. It becomes a butterfly!"

## 8. Settings
1. **Direction:** baby finds its mother · mother finds her baby (default baby → mother). At rest: four grown-ups + one baby, or one grown-up + three babies.
2. **Change rounds:** off · on (default off at K). At rest: with "on" the dial shows its small moon tick (the resting stage marker) and the caterpillar/butterfly rounds join the pass; with "off" the dial ring has no moon tick and the pass has 7 rounds (with "on", 9).

## 9. Words (EN source)
- title: "Mother and Baby — Animal Babies"
- instruction: "Take the baby to its mother, then wind the dial and watch it grow up."
- task lines: §4.
- hints: "First take the baby to a grown-up." · "It doesn't grow into that shape. Look at the shadow again." · "That baby doesn't grow into a {mother}. Try another baby." · "It grew into a {grown-up}! Find the {grown-up}." · "That baby grows into a {grown-up}. Which baby grows into a {mother}?"
- celebrations: §7 (exact strings, per pair).
- settings: "Direction" — "Baby finds its mother" / "Mother finds her baby" · "Change rounds" — "Off" / "On"
- **Locale traps:**
  - **Baby-animal words** are separate lexemes in most locales and must come from `image-vocabulary.js` labels per locale (de *Küken / Kalb / Fohlen / Lamm / Entenküken*, fr *poussin / veau / poulain / agneau / caneton*, es *pollito / ternero (becerro in es-MX) / potro / cordero / patito*, sv *kyckling / kalv / föl / lamm / ankunge*, fi *tipu / vasikka / varsa / karitsa / ankanpoikanen*). Where a locale's library label is a compound or a phrase, the hint sentences are authored around it.
  - **"Mother"** with gendered parents: hen (f), cow (f), sheep (de *Schaf* n; fr *brebis* f vs *mouton*), duck (de *Ente* f), horse (fr *jument* f vs *cheval*; de *Stute* vs *Pferd*): the library labels are the general words (*cheval, Pferd, mouton*); the hint says "{grown-up}" with the library word and the success line "Its mother is the {grown-up}" is authored per locale so it never calls a *cheval* (m) "la mère" ungrammatically — fr: "Sa maman, c'est le cheval !" is acceptable to the native reviewer or rewritten as "Il deviendra un cheval comme sa maman."
  - Butterfly is not a "mother" of a caterpillar in everyday speech in some locales; the caterpillar success line says "It becomes a butterfly" and the task line for that round is authored as "…which grown-up it becomes".
  - No seasons, numbers, or reading-direction traps.

## 10. Sound off, access, phones
- Sound off: the growth, twin bob, wrong-animal-beside, glow and nuzzle are visual; the dial's rising tone is a bonus.
- Keyboard: Space picks the baby; arrows choose a pad; Space drops; D or Enter winds the dial (arrow keys turn it step by step, so a keyboard child can wind back and forth too).
- aria: pads "Grow pad by the {grown-up}"; dial `role="slider"` 0–100 "Growing up"; live region "The duckling grew into a duck. They match!"
- Taps ≥ 44 px (pads 120 × 44 hit areas, dial 88). Pictures ≥ 96 px at 704 (grown-ups 140, baby 110), ≥ 64 at 360 (88–96).
- Phone layout §4.

## 11. Distinct from
- **#229 Blink Viewer** (twins compared by blinking one over the other) and **#230 Search Lens** (frosting magnifier): no overlay, no lens — the baby is grown along a dial and compared side by side; the evidence is what it becomes.
- **#22 Nesting Pots** (pots grow to their number): growth there is magnitude; here growth is development with a crossfade into a different picture.
- Premium tools: none grows animals.
- Batch siblings: #231 water path, #232 sense signals, #68 story zipper.

## 12. Build plan
- **Model:** `{dir, change, round:{baby, grownups[] | babies[], mother}, placedAt:null|slot, dial:0..1, miss}`; `placeBaby(slot)`; `wind(t)` → frame `{scale, crossfade, rest}` from the pair's `adultScale` and the baby's TRUE adult (`adultOf(baby)`); `check()` at t = 1 → ok iff `adultOf(baby) === chosen` (mother→baby: `adultOf(chosenBaby) === mother`).
- **Gate (own oracle):** every round has exactly one right answer under `adultOf`; no refused animal (rooster, bull, ox, chicken, horse_2) appears; the ★ distractor is from the same family and present in every round; slot balance ≤ 34 % and no repeat slot; with Change off no caterpillar round; every picture labelled in its theme JSON, no BW (localized markers); every string in 11 locales; the crossfade target is always `adultOf(baby)`, never the chosen animal (DOM check at t = 1).
- **Mutations:** crossfade into the chosen grown-up (makes every guess "right"); rooster allowed as a chick distractor; ★ distractor missing; true slot fixed; earthworm grows into a butterfly; caterpillar rounds with Change off.
- **Pictures (all labelled in their theme JSON; seen by the critic on the contact sheets):** farm-animals/{chick, hen, cow, foal, horse, lamb, sheep, duck, goat, donkey, llama, pig, goose}, spring/{chick, duckling, lamb, caterpillar, butterfly, bee}, easter/{chick, lamb}, birds-2/{turkey, quail, swan}, insects-and-bugs/{caterpillar, butterfly, bee, wasp, ladybug, dragonfly, snail, worm}, forest-creatures/{earthworm, snail}. **Not used:** farm-animals/duckling (a twin of the duck drawing), farm-animals/calf (a small horned cow — refused where "calf" is named), easter/duckling (reads as a chick), insects-and-bugs/slug (cache-only, no label). The spring/duckling beside a chick (R1, R6) is the deliberate ★ — both yellow and fluffy, told apart by the bill — and is shown at ≥ 100 px; the reviewer confirms it reads at 360.
- **Shared-feature hotspots** (`{x, y, r}` per picture, two pairs per family) are hand-set and reviewer-checked on the renders.
- **Risk:** only five honest pairs exist (no kitten, puppy, piglet, tadpole, joey, and no calf that reads as a calf). The design reaches ≥ 7 rounds per direction by meeting each baby in two or three different library drawings with different meadows; adding pairs needs art (puppy/dog, kitten/cat, piglet/pig, tadpole/frog, a hornless calf) — listed for `new/ART-NEEDS.md`, not blocking.
- **Mutations (added by the critic):** a miss-1 that shows the full true grown-up (skipping the shadow step); a chick round containing the duck; farm-animals/duckling or calf in the pool; two rounds with the same baby kind adjacent.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Choose it again?** Yes — a crank that grows a baby up and shrinks it back down, and a fluffy yellow chick that grows a red comb.
2. **Teacher on the board?** Yes — the dial shows "like but not exactly like" in motion; a wrong pick shows the baby's real grown-up beside the wrong one — evidence, not a red cross.
3. **Parent trust?** Library pictures, calm, honest biology (no rooster trick, caterpillar changes completely), no score.
4. **The invention:** the growing-up dial — whichever grown-up you choose, the baby grows into what it really becomes; with the right mother they end up twins.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 2→5
What changed:
- **Two of six pairs broke the picture rulings:** farm-animals/duckling is a twin of the duck drawing (the "baby" was just the mother picture) → spring/duckling, a real fluffy baby; farm-animals/calf is a small horned cow, refused where "calf" is named → the calf/cow pair is dropped; chick and duck never share a round.
- **≥ 7 rounds per direction with five honest pairs:** each baby is met in two or three library drawings (farm/spring/easter chick and lamb, insect/spring caterpillar) with different meadows; 9 rounds with Change on, 7 off; slot balance re-stated.
- **The miss ladder showed the answer at miss 1** (the full true grown-up beside the wrong one). Miss 1 is now the true grown-up's SHADOW (the library picture's own alpha mask, flat teal) — the shape does not match, the animal is not named; miss 2 fills it in and lifts the true parent's head.
- "#229 Blink Viewer" → "#229 Blink Viewer" (the name the batch now uses).
