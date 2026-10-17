# New 258 — The Unchanging Picture → THE PICTURE THAT DRAWS WHAT YOU WRITE (L.2.5.b)

## 0. Identity
- **id** `synonym-swap.play.l-2-5-b` · grade 1 · CCSS **L.2.5.b** (distinguish shades of meaning / relate words with the same meaning — here synonyms) at the grade-1 entry level of L.1.5 · strand Vocabulary Acquisition and Use · own files `synonym-swap-core.js`, `synonym-swap-activity.js`, `synonym-swap-activity.html`, `synonym-swap-activities.json`.
- **Worksheets covered:** G1-395 "Synonyms with Pictures: Two Words, One Picture" → TWO WORDS rounds · G2-358 "Synonyms: Circle the Word That Means the Same" → SWAP rounds (adjective faces; its verb faces go to the doing-stage, recorded) · G2-373 "Synonym Pairs: Match the Words That Mean the Same" → PAIRS.
- **Merged:** grade 2 "The Meaning Mirror" (meaning-mirror) — its mirror IS this picture; its pairs mode is PAIRS.

## 1. The pitch
"Under the sentence is a picture that draws exactly what the sentence says — swap one word and press Check: a word that means the same leaves the picture just as it was, and any other word redraws it, so you SEE whether the meaning moved."

## 2. Why a child will want it again
- **A picture that obeys words.** A little stage frame shows the sentence's picture: "The dog is big." — a big library dog filling the frame. Swap in "small" and the dog shrinks to a pup in the corner; "tall" stretches it up like a giraffe-dog; "huge" makes it burst past the frame's edges; "happy" puts a grinning feeling bubble above a bear, "sad" makes it droop. Children want to try every word just to see what happens — and after each round they may (free play).
- **The photo check.** On Check a camera-shutter blink flashes and the new picture is laid over a photo of the old one: if they match exactly, they *click* into one picture with a bright frame and the two words bow to each other as a pair.
- **Moving pictures.** "The train is fast." — the library train whizzes round a loop track; swap "quick" and it keeps its pace; "slow" and it crawls.
- **The pair wall.** Every synonym pair found is pinned to a small "same-meaning wall" at the side as two word tiles joined by an equals-shaped clip (geometry), so a child sees their collection grow within the session.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** synonyms are different words with the same (or nearly the same) meaning; replacing a word with a synonym keeps the meaning of the sentence (G2-358, G2-373); two words can describe the same picture (G1-395).
- **Misconception 1 — a word from the same topic is "the same"** (big → tall, small → short, fast → long train): the picture redraws differently — "tall" stretches, it does not just enlarge.
- **Misconception 2 — a stronger word is the same word** (big → huge, small → tiny, happy → excited): huge bursts past the frame; tiny shrinks further; excited changes the face. Close in meaning but not the same picture — the material shows the shade.
- **Misconception 3 — the opposite "goes with" it** (big ↔ small, a common associative error): the picture flips to the opposite.
- **Misconception 4 — any word that fits the sentence works** ("The dog is brown"): every candidate fits grammatically; only meaning decides, and meaning is what the picture draws.
- **How the material pushes back:** the picture is a function of the sentence — change the meaning and it cannot stay still.

## 4. The stage
`layout:'split'` at ≥ 700 px: sentence + picture left, cards + wall right.

**At 704 px (stage 672 × ≈ 420):**
- **The sentence strip** (left, 400 × 64): the sentence in 26 px Nunito 800, the swap slot a coloured box (coral border 3 px, 150 × 48) holding the current word card.
- **The picture frame** (under it, 400 × 300): a stage frame (wood geometry) with a pale backdrop; the subject — library picture at 260 px base height (so "tiny" stays 104 px), standing on a floor line. Feeling bubble (FEELINGS rounds): a round bubble (geometry) above the subject holding the library emotions face at 96 px. Speed rounds: an oval track (geometry) and the subject (toys/train or toys/car) at 110 px riding it.
- **The ghost** (shown after a Check): the photo of the original picture as a pale outline (25 % ink, dashed) under the new one.
- **The card tray** (right, 240 wide): 3 or 4 word cards, 200 × 56, 22 px Nunito 800, white with teal border, one column.
- **The same-meaning wall** (right, under the tray): word-pair tiles found so far, 2 per row (110 × 36 each, 15 px), max 8 visible.
- **Task line** above (≤ 24 px).
- No words on the apparatus except the sentence and the cards (content).

**At 360 px:** stacked: sentence (20 px, slot 120 × 44), frame 336 × 220 (base subject 170 px, tiny 68 px; bubble face 72 px), cards 2 × 2 (156 × 52), the wall collapses to a counter of pair-clips (geometry dots) under the frame. Check at ≈ 640 px. **320 × 640:** frame 300 × 210 (base 160 px, tiny 64 px; face 64), cards 144 × 48, Check ≈ 595.

## 5. The hand
- **Drag a card onto the slot:** the card in the slot lifts out and returns to the tray (or, in SWAP rounds, the ORIGINAL word moves up to a little "was:" tag above the slot — it stays visible); the new card snaps in (120 ms, wood click). The picture does NOT change yet — the child predicts.
- **Check:** shutter blink (80 ms white flash), then the picture morphs to what the new sentence says (350 ms: scale / stretch / face swap / speed change) over the ghost of the old picture.
- **Free play (after a solved round):** any card can be dropped and the picture redraws at once — the child explores every word's meaning; "Next" continues.
- **TWO WORDS rounds:** two identical sentence strips stacked, each with an empty slot, over ONE picture (the meaning is given by the picture only — the original word is hidden); the child fills both slots with different cards.
- **PAIRS:** a column of left words and a column of right words (5 each); drag a right word onto a left word — they dock side by side; drag away to undo. Check tests every pair.
- **Keyboard:** Tab cycles cards → slot(s) → Check; Enter places; in PAIRS, Enter on a left word then on a right word docks them.

## 6. The rounds
Each SWAP round: a sentence with its picture state, 3 cards (choices 3) = the synonym + one antonym + one same-topic word that redraws differently; choices 4 adds a stronger/related word. One right card. Pictures: subject from the library, transforms are scale/stretch/face/speed only (no colour tints — the library has no colour variants and the colors theme is not a set of adjectives).

### Picture states (the gate's own drawing table)
| word | what the picture does |
|---|---|
| big, large | subject at 1.00 (fills the frame) |
| small, little | subject at 0.62 |
| tiny | 0.40 |
| huge | 1.25 (clipped by the frame: it bursts past the edges) |
| tall | scaleY 1.35, scaleX 0.85 |
| short | scaleY 0.70 |
| long | scaleX 1.40 |
| happy, glad | bubble face emotions/happy |
| sad, unhappy | emotions/sad |
| scared, afraid | emotions/scared |
| angry, mad | emotions/angry |
| tired, sleepy | emotions/tired |
| excited | emotions/excited |
| surprised | emotions/surprised |
| bored | emotions/bored |
| fast, quick | 1.6 s per lap |
| slow | 5 s per lap |

### SWAP rounds (EN) — 3 choices (synonym · antonym · same-topic); [4th card at 4 choices]
| # | sentence (subject) | right | antonym | same-topic | [4th] |
|---|---|---|---|---|---|
| S1 | The dog is big. (farm-animals/dog) | large | small | tall | huge |
| S2 | The cow is big. (farm-animals/cow) | large | little | long | huge |
| S3 | The mouse is small. (forest-creatures/mouse) | little | large | short | tiny |
| S4 | The car is little. (toys/car) | small | large | long | tiny |
| S5 | The bear is large. (zoo-animals/bear) | big | small | tall | huge |
| S6 | The cat is happy. (animals/cat) | glad | sad | excited | surprised |
| S7 | The bear is sad. (zoo-animals/bear) | unhappy | glad | tired | bored |
| S8 | The fox is scared. (animals/fox) | afraid | glad | surprised | angry |
| S9 | The pig is angry. (animals/pig) | mad | happy | afraid | sleepy |
| S10 | The owl is tired. (animals/owl) | sleepy | excited | mad | sad |
| S11 | The rabbit is glad. (animals/rabbit) | happy | unhappy | excited | surprised |
| S12 | The train is fast. (toys/train) | quick | slow | long | — (3 only) |
| S13 | The duck is little. (farm-animals/duck) | small | big | tall | tiny |

"Words" setting: size and speed = S1–S5, S12, S13 (7 rounds) · feelings = S6–S11 + S14 "The dog is afraid. (farm-animals/dog) | scared | glad | bored | surprised" (7 rounds).
**Critic fix — the "rare word wins" shortcut (measured, `work-c25/m258.js` → `m258b.js`):** in the draft every less-common word (glad, unhappy, afraid, mad, sleepy) appeared ONLY as a right answer, while every distractor was a basic word (happy, sad, big) — a child who learns "the unusual word is the answer" scored 100 % on feelings rounds. Now each of those words is also a distractor elsewhere (glad wrong 3× / right 1×; unhappy, afraid, mad, sleepy, large 1:1 or better); only quick (one speed round) and scared (S14) stay answer-only. Column naming corrected: in feelings rounds the "antonym" column is a FAR feeling (happy is not the opposite of scared or angry) — only happy/glad ↔ sad/unhappy are true antonyms; the gate tags them "far" vs "opposite". Length tell (EN): the right card is strictly the longest in 5/14 rounds (3 choices) and 3/13 (4 choices); strictly the shortest in 3/14 and 3/13 — no length tell.
"The" subjects never repeat in consecutive rounds; the same emotions face is never both the original and the right answer's picture in two rounds running.

### TWO WORDS rounds (G1-395) — picture only, four cards, two keep it
| # | picture | right pair | others |
|---|---|---|---|
| T1 | happy cat | happy · glad | sad · tired |
| T2 | big cow | big · large | small · tall |
| T3 | sad bear | sad · unhappy | happy · angry |
| T4 | small mouse | small · little | big · tall |
| T5 | scared fox | scared · afraid | angry · happy |
| T6 | tired owl | tired · sleepy | excited · sad |
| T7 | fast train | fast · quick | slow · long |

### PAIRS (G2-373) — 7 rounds, five left words, five right words
| # | left | right (shuffled) |
|---|---|---|
| P1 | big · small · happy · scared · fast | large · little · glad · afraid · quick |
| P2 | sad · angry · tired · big · little | unhappy · mad · sleepy · large · small |
| P3 | glad · afraid · quick · large · sleepy | happy · scared · fast · big · tired |
| P4 | small · mad · unhappy · fast · big | little · angry · sad · quick · large |
| P5 | happy · tired · little · scared · large | glad · sleepy · small · afraid · big |
| P6 | quick · sad · big · afraid · angry | fast · unhappy · large · scared · mad |
| P7 | sleepy · glad · small · mad · large | tired · happy · little · angry · big |
Every pair is tested with ONE sentence frame per pair that suits both words (the gate's frame table: size pairs "The dog is ___.", feelings "The cat is ___.", speed "The train is ___.").

- **Answer position.** The synonym's tray slot is FIXED by the table, not left to a shuffle: slot = round index mod choices (7 rounds × 3 slots → 3/2/2; at 4 choices 2/2/2/1), the other cards fill the remaining slots in table order; the gate also checks the synonym is not systematically the longest or shortest card (≤ 45 %, per locale). TWO WORDS: the two right cards never sit adjacent in more than half the rounds. PAIRS: the right column is shuffled so no right word sits opposite its partner more than chance (≤ 1 per round).
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with the original word still in the slot (SWAP)** → no miss; the tray cards wobble. Hint: "Drag a different word into the box."
- **Check in TWO WORDS with a slot empty / PAIRS with words undocked** → no miss; the empty places wobble. Hint: "Fill every box." / "Give every word a partner."
- **Miss 1 (the picture shows it):** the picture redraws to the wrong word's meaning and STAYS changed for 2 s over the dashed ghost of the original (the dog shrinks inside its own big outline; the face swaps with the old face shown faint beside it), then morphs back and the card returns to the tray. Hint: "The picture changed — {word} means something different. Find a word that keeps it the same."
- **Miss 2:** before the next try, every tray card that would change the picture greys a little (the right card stays bright) — no thumbnails of what they would draw (ruling: no shrunken pictures), only grey versus bright. Hint: "Only one word leaves the picture just as it is."
- **TWO WORDS miss:** each strip draws its own picture side by side under the original; the strip whose picture differs shows it over the ghost; right strips lock.
- **PAIRS check:** pair by pair, the main frame draws the left word's sentence, then the right word's over its ghost: a matching pair leaves the picture unchanged and locks (its tiles fly to the wall); a non-matching pair shows the change for 2 s and undocks (that is the miss for that pair).
- A new move takes the help away.
- **Success:** the shutter flash, the new picture lies exactly on the ghost and the frame glows; the two words fly to the same-meaning wall as a clipped pair. Bubble (EN): "{word1} and {word2} mean the same — the picture didn't change!" TWO WORDS: "{word1} and {word2} both fit the picture!" PAIRS: "Five pairs of words that mean the same!"

## 8. Settings
1. **Words:** size / feelings (the subject and the picture kind at rest: a scaled animal or an animal with a feeling bubble; speed rounds live in "size" since they are about how the picture moves — renamed "size and speed" in the label).
2. **Task:** find the swap (3 choices) / find the swap (4 choices) / two words / make pairs.

## 9. Words (EN source)
- title "The Picture That Doesn't Change" (page "Synonyms — Words That Mean the Same (Grade 1)")
- instructions: SWAP "Which word keeps the picture the same? Put it in the box." · TWO WORDS "Find two words that both fit the picture." · PAIRS "Give each word a partner that means the same."
- word bank (EN): big · large · small · little · tiny · huge · tall · short · long · happy · glad · sad · unhappy · scared · afraid · angry · mad · tired · sleepy · excited · surprised · bored · fast · quick · slow.
- hints / celebrations: §7. aria: "Sentence: {sentence}" · "Picture: {subject}, {state}" · "Word card {word}".
- settings: "Words" · "Size and speed" · "Feelings" · "Task" · "Find the swap (3)" · "Find the swap (4)" · "Two words" · "Make pairs".
- **Locale traps.** The bank is **authored natively per locale** (≥ 9 picturable synonym pairs, or that setting is refused in that locale — recorded, never padded with near-synonyms). Known shapes: de groß/riesig is NOT a pair (riesig = huge → it is the 4th card), de pairs like klein/winzig are refused for the same reason; de froh/fröhlich/glücklich, traurig/betrübt, müde/schläfrig, schnell/flink, wütend/zornig — the native panel chooses. **Agreement:** fr/es/it/pt adjectives agree with the subject (fr "Le chien est grand" vs "La souris est petite"), so every card is authored in the round's agreed form — never a lemma; sv/da/no predicative adjectives agree with en/ett nouns ("Huset är stort") — subject and card forms authored together; fi predicative adjectives in the nominative singular ("Koira on iso / suuri") with subject nouns from the vocab. de predicative adjectives are uninflected — but nouns are capitalised in the sentence. en uses "mad" (US register; the reviewer may switch to "cross" for en-GB readers — one choice, recorded). Feeling faces are emoji-like library faces — the feeling WORD per locale must match what the face shows (the emotions labels: de "Verängstigt" for scared). Speed pairs exist only where a natural pair exists; otherwise S12/T7 drop in that locale.

## 10. Sound off, access, phones
- Legible with sound off: the picture change IS the feedback; words are on cards.
- Keyboard path §5; announcements ("The dog got smaller — 'small' changes the picture").
- Taps ≥ 44 px (cards 56/52/48 tall, slot 48/44).
- Pictures: subject base 260/170/160 px (smallest state 104/68/64); feeling faces 96/72/64; PAIRS tests pair by pair in the one main frame (never mini pictures).
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 595).

## 11. Distinct from
- **#72 The Two-Ended Rod** (opposites slide to two ends of a rod) — antonyms by position on a scale; this tests SAMENESS of meaning by an unchanged picture.
- **#259 The Same-Way Machine** (analogies through a machine dial) — relations between pairs, not word meaning.
- **#229 The Blink Viewer** (overlaying pictures to find twins, readiness) — a visual-discrimination tool; here the picture is GENERATED by the sentence and the child edits words, not pictures.
- **#246 The Face Dial** (shape a face for a feeling) — feelings, not word meaning.

## 12. Build plan
- **Core** `SynonymSwapCore`: `STATES` (word → picture state, per locale bank); `render(subject, word)` → state; `swapGrade(round, card)` → `{ok, state, original}` (ok iff `state(card) == state(original)`); `twoGrade(round, a, b)`; `pairsGrade(pairs)` per pair with the frame table.
- **Gate's own truth** (`verify-synonym-swap-core.js`): its own state table (independent of the manifest) → for every round exactly one card (two in TWO WORDS) yields the original state and every distractor a different state; each round has one antonym and one same-topic distractor (tagged in the gate); PAIRS have a unique perfect matching under the state table; tray-slot and length balance per locale; no colour-tint word anywhere; no subject repeated in consecutive rounds.
- **Mutations (each killed):** "huge" draws the same as "big" · "tall" accepted as a synonym of "big" · the picture redraws on drop (before Check) in task mode · TWO WORDS accepts one right + one wrong · PAIRS accepts big–tall · miss 2 greys the right card · the right card always in slot 0 · a feelings round whose right card shows a different face than the original.
- **Pictures (seen this session):** emotions sheet — happy, sad, angry, scared, tired, excited, surprised, bored are distinct round faces (labelled; plural = singular in en); animals sheet — cat, fox, pig, owl, rabbit, farm-animals/{dog, cow} (animals/elephant is NOT used: it is a chibi BABY — a wrong "big" exemplar); toys — car, train; forest-creatures/mouse; zoo-animals/bear; farm-animals/duck (never with chick/duckling).
- **Risks:** per-locale bank sizes (refusals recorded per setting). Library animals carry their own cartoon smiles — a "sad bear" whose drawing grins under a sad bubble is a contradiction; feelings rounds use only subjects whose faces read neutral at 260 px (the reviewer opens each; refused subjects swap within the table), and the bubble face is drawn ≥ 96 px so it dominates. The smallest state ("tiny", 0.40) must stay ≥ 96 px at 704 and ≥ 64 px on phones — hence the base subject heights 260 / 170 / 160 px; "huge" (1.25) is clipped by the frame on purpose. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a picture that obeys your words (shrinks, stretches, bursts out of the frame, droops, races) is a toy; after each round every word can be tried.
2. **Teacher on the board?** Yes — "does it still mean the same? look at the picture!" makes synonymy visible, and the huge/tall/excited traps are exactly the near-misses teachers discuss.
3. **Parent trust?** Library pictures, natively authored word banks per language, no scores.
4. **Invention:** the picture draws exactly what the sentence says, so a word that means the same is the only swap that leaves it unchanged.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Measured a "pick the unusual word" shortcut (work-c25/m258.js): glad, unhappy, afraid, mad and sleepy were ONLY ever right answers (every distractor was a basic word) — a bot scored 100 % on feelings. Distractor columns rebuilt so each appears as a wrong card too (m258b.js); length tell checked (right strictly longest 5/14, shortest 3/14).
- "Antonym" column corrected: happy is not the opposite of scared/angry/tired — those are FAR feelings; only happy/glad ↔ sad/unhappy are true opposites (gate tags far vs opposite).
- animals/elephant (a chibi BABY) removed as the "big" exemplar → farm-animals/cow. Tray slot fixed by table (i mod choices). #229 renamed The Blink Viewer. Neutral-face rule for feelings subjects.
