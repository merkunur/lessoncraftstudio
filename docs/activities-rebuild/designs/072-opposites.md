# Row 72 — The Two-Ended Rod (K.L.5.b)

## 0. Identity
- id `opposites.antonyms.k-l-5-b` (KEPT) · grade K · Common Core K.L.5.b (relate verbs and adjectives to their opposites) · strand Language · page title (frozen) "Quill's Mirror Market — Find the Opposite" · own files `mini tools/opposites-rod-core.js`, `opposites-rod-activity.js`, `opposites-rod-activity.html`; the manifest row stays in `opposites-activities.json` (id, slugs, page_title, page_intro unchanged), `tool` repointed to the new activity. `opposites-pairs.json` is kept as the data source and extended (see §12).
- worksheets it covers: **K-351** Opposites with Pictures · **G1-307** Write the Opposite Word · **G1-335** Opposites in a Sentence · **G1-336** Pair Up the Opposites · **G1-337** Opposite or the Same? · **G2-320** Antonyms with un-, dis-, in- · **G2-376** Prefixes re-, pre-, mis-: Pick by Meaning.
- what the old activity did: Quill the hedgehog's market — tap the opposite among three glyph cards, with route/odd-pair/balance/verb/bedtime-scene variants. **Kept:** the ten pairs and their classification (categorical vs complementary, gradable middles, same-dimension siblings) from `opposites-pairs.json`; the deliberate distractor relations (same-dimension sibling, unrelated); the bedtime-scene round (re-made on rods); the 6-locale round data as the starting point for the native panels; the frozen intro's promise ("the other end, not just a friend"). **Gone:** the tap-a-card quiz, code-drawn lamps/doors/suns (replaced by library pictures).

## 1. The pitch
"Every pair of opposites lives on one rod: put a word on the rod and it slides to where its meaning lives — the opposite goes all the way to the other end."

## 2. Why a child will want it again (the fun)
- **The rod decides, out loud.** Drop a card on the rod and it *slides*: the opposite races to the far end and clicks into the clip with a satisfying brass "clack"; "warm" glides and stops halfway with a soft tap ("not the other end — only the middle"); "huge" slides back to sit right beside "big" ("same end — same meaning"); "red" bumps against the grey black-to-white rod, finds no shade of itself, and hops off.
- **The rods look like their meaning.** The size rod tapers from thin to thick; the temperature rod is painted ice-blue to warm red; the day–night rod is a sky going from morning to stars; the up–down rod stands upright and the left–right rod lies across it, so "left is on the other rod" is something the child sees.
- **The end-of-round show:** the two end cards spin once on their clips and the rod "rings" like a xylophone bar — a long bar, a low note. Then Quill's market shelf takes the finished rod: across a pass the shelf fills with rods of every kind.
- Free play: between rounds the child can slide any finished rod's cards back and forth; the middle stops click.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** relate a word to its opposite (K.L.5.b); tell opposite from same (G1-337); pair, write and use opposites in sentences (G1-307/335/336); change a word's meaning with a prefix (G2-320 un-/dis-/in-; G2-376 re-/pre-/mis-).
- **Misconception 1 — "an opposite is any word from the same family"** (black → red, up → left). Pushback: red cannot sit anywhere on a grey black-to-white rod and falls off; left slides onto the *crossing* horizontal rod, not the upright one.
- **Misconception 2 — "the middle is the opposite"** (hot → warm, big → medium, full → half). Pushback: middle words physically stop at the rod's middle groove, never at the end.
- **Misconception 3 — "a word that means the same is the opposite"** (big → huge). Pushback: it slides to the *same* end and stacks beside the target.
- **Misconception 4 — "any prefix flips any word"** (dishappy). Pushback (Level 4): the prefix is not stuck on the word — it is the **far clip of the rod itself**. The child hangs a prefix clip at the empty far end and pushes the base word along the rod: with the right clip the word slides all the way, the clip closes on it and the two become one card ("unhappy"); with a wrong clip the word slides, touches the clip, finds no word there and rolls back to its own end. A non-word is never built or printed.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 wide × 460 high + bubble column):
- **The rod** — horizontal: 440 × 28 px brass bar (rounded caps), centred, 150 px from the stage top; vertical (up/down) 28 × 340 px. Paint per dimension (geometry, 6-stop gradients): size = tapering width 12→36 px; temperature `#4A90D9`→`#E2574B`; colour-value grey `#262626`→`#FFFFFF`; day–night sky `#FCE38A`→`#1E2A5A`; fill = a glass tube filling left to right; feeling = neutral cream with a groove; on/off and open/closed are **switch rods**: short (280 px), with NO middle groove (complementary pairs have no middle).
- **End clips**: a 112 × 132 card frame at each end, ink outline 3 px. The target card hangs in one clip; the other clip is empty with a dashed outline.
- **Middle groove** (gradable rods only): a 6 px notch at the centre.
- **Cards**: 112 × 132 at 704 — library picture 96 px + the word under it (Nunito 20 px bold). Word cards in Levels 2–4: word 26 px + a small picture 64 px when one exists.
- **Basket** under the rod: 3–4 cards in a row (gap 16), 112 × 132 each.
- **Task line** (≤ 24 px) above the stage; **bubble** in the right column.

**At 360 px** (stacked): rod 300 × 22 (vertical 22 × 230), clips 80 × 100, cards 80 × 100 with pictures **64 px**, word 16 px, basket 3 across (4 → 2 × 2), bubble under the basket, Check under the bubble: Check bottom ≤ 690 at 360 × 740, ≤ 610 at 320 × 640 (320: cards 72 × 92, pictures 64).

Pictures (library, verified in theme JSON; seen on contact sheets): toys/ball (scaled 1.0 / 0.55 / 0.78 for big/small/medium — identical instances), weather/hot, weather/cold, **beach/sun** (weather/sun is in the cache but has no lcs-pictures label — not usable), weather/rainbow, space/moon, emotions/happy, sad, content, around-the-house/door (open = the same picture with `rotateY(-58deg)` on its hinge edge and a dark doorway rectangle behind it), around-the-house/lamp (on = a soft yellow halo disc behind it; off = `brightness(.55)`), kitchen-tools/jar (full / half / empty = a clipped fill rectangle inside the jar's glass area, geometry), weather/thermometer (warm = a mid-level red bar overlay). Colour swatches and arrows are drawn geometry (they ARE the content). Words on cards are content.

## 5. The hand
- **Drag a card from the basket onto the rod or the empty clip** (anywhere within 40 px of the rod counts). Within 60 ms the card lands on the rod; then the **slide** (ease-out, 420 ms for a full length) to its home position:
  - opposite → the far end, clicks into the clip ("clack", a low wood tone), the clip outline turns solid;
  - middle word → stops at the groove (soft tap tone); stays there until moved;
  - same-meaning word → slides to the target's end and parks beside the target, slightly overlapping (two-note "same" chime);
  - other-dimension word → bumps the rod (the rod shivers 4 px), the card drops back into the basket along an arc (300 ms) — the rod has no place for it.
  - on the up–down rod, a left/right card lands on the faint crossing horizontal rod (drawn at 30 % opacity, appearing only then) and slides to its own end there, then fades back to the basket after 1.2 s.
- **Lift a parked card** (middle or same-end) back into the basket by dragging; tapping it reads the word (TTS optional).
- **Level 3 write:** the empty clip becomes a write box; a letter keyboard (the locale alphabet, 40 px keys) types the word into the clip; Enter or Check sends the typed card onto the rod — it slides wherever that word lives (a typed "red" falls off like a card).
- **Level 4 prefix clips:** the base word hangs at one end; the far clip is empty. Three prefix clips (brass clips 72 × 48 with the prefix, e.g. "un") hang on a hook. Drag one into the far end — it clicks in (90 ms). Then push the base card along the rod (drag, or tap it): it slides (420 ms). Right clip → the clip closes on the card's front edge (in fi on its BACK edge, because the fi ending comes after the word — §9), the two fuse into one card with the new word, *clack*, low note. Wrong clip → the card touches the clip, the clip stays open, and the card rolls back to its own end with a soft bump (a non-word like "dishappy" is never assembled). The clip can be swapped any time.
- **Free play:** finished rods on the shelf can be slid; tapping a rod plays its note.

## 6. The rounds
One round = one rod and its basket. Target end alternates L/R (top/bottom on the vertical rod). Every round has exactly one card that reaches the far end.

**Level 1 — Pictures (K-351, K.L.5.b), 10 rounds** (basket: opposite · near-miss · unrelated):

| # | rod | target (end) | opposite | near-miss (what the rod does) | unrelated |
|---|---|---|---|---|---|
| 1 | grey | black (L) | white | red — falls off | up arrow |
| 2 | upright | up (top) | down | left — goes to the crossing rod | black |
| 3 | size | big ball (R) | small ball | medium ball — middle | happy |
| 4 | temperature | hot (L) | cold | warm (thermometer) — middle | big ball |
| 5 | feeling | happy (R) | sad | content — same end | down |
| 6 | sky | day / sun (L) | night / moon | rainbow — falls off (weather, not day or night) | full jar |
| 7 | fill | full jar (R) | empty jar | half jar — middle | up |
| 8 | switch | open door (L) | closed door | (none — switch rod) lamp on | white |
| 9 | switch | lamp on (R) | lamp off | (none) open door — falls off | small ball |
| 10 | bedtime scene | sun, lamp on, door open on three mini switch rods | tap each to flip it to its other end (the old scene, kept) | — | — |

**Level 2a — Same or opposite? (G1-337), 8 rounds.** Word cards. One rod, the target at one end, four cards: each must be placed — opposites to the far end (the first fills the clip, more stack beside it), same-meaning words beside the target. The same/opposite split varies (2/2, 1/3, 3/1) so counting cards tells nothing. EN (target | same | opposite; per-locale by the panel, same shape):
1 big | huge, large | small, tiny · 2 happy | glad | sad, upset, grumpy · 3 fast | quick, speedy | slow · 4 loud | noisy | quiet, silent, soft · 5 hot | boiling | cold, chilly, icy · 6 start | begin | stop, finish, end · 7 wet | soaked, soggy | dry · 8 open (switch rod) | — | shut, closed, + "red" (falls off — the one round where a card belongs nowhere, so "every card goes somewhere" is not a rule). Rounds 3 and 7 carry three cards; the rest four.

**Level 2b — Pair up (G1-336), 7 rounds.** Three short rods stacked, each with a target at its left end; three opposite cards in the basket; each card slides home only on its own rod (on another rod it bumps and drops back). 1 big · up · happy → small, down, sad · 2 full · fast · loud → empty, slow, quiet · 3 open · wet · day → closed, dry, night · 4 hot · in · push → cold, out, pull · 5 tall · on · old → short, off, new · 6 black · near · first → white, far, last · 7 start · light · front → stop, dark, back. Basket order rotates so each card sits in each slot across the level.

**Level 3 — In a sentence / write it (G1-335, G1-307), 9 rounds.** A sentence strip over the rod, with the round picture: the rod carries the first word, the far clip is the blank. Setting *Answer* = pick (3 cards) or write (keyboard). EN rounds:
1 "The jar is full. Now it is ___." (empty) · 2 "The door was open. Now it is ___." (closed) · 3 "The lamp is on. Now it is ___." (off) · 4 "This ball is big. That ball is ___." (small) · 5 "The kite goes up. Then it comes ___." (down) · 6 "It is day. Soon it will be ___." (night) · 7 "Soup is hot. Ice cream is ___." (cold) · 8 "I was sad. Now I am ___." (happy) · 9 "Push the door to go in. ___ it to go out." (Pull — capital, sentence-initial).
Pick distractors per round: the near-miss of Level 1 for that pair + one unrelated word.

**Level 4 — Prefix clips (G2-320, G2-376), 9 + 9 rounds.**
- *Flip clips* (G2-320), clips un · dis · in(im): happy→unhappy · kind→unkind · lock→unlock · tie→untie · agree→disagree · like→dislike · appear→disappear · correct→incorrect · possible→impossible (the in-clip shows "im" when it closes on a p-word; it reads "in/im" on the hook). The fused card lands at the far end of the word's own meaning rod — "unhappy" sits where "sad" would.
- *Meaning clips* (G2-376), clips re · pre · mis: the rod ends in a **three-way junction** instead of a clip (a loop going back round to the start = again; a short spur ending at a tick *before* a numbered line 1→2 = before; a crooked, wobbly spur = wrongly); the child hangs a clip at the junction mouth and pushes the card: the right clip lets the card run its spur and the sentence's blank fills; a wrong clip turns the card back. EN: "Mia read the story again. She ___ it." (reread) · "Heat the oven before you bake. ___ it." (Preheat) · "Tom wrote cat as kat. He ___ it." (misspelled) · "The cup is empty. ___ it, please." (Refill) · "Before we read, we look at the pictures. We ___ the book." (preview) · "I heard you wrong. I ___ you." (misheard) · "The tower fell down. Let's ___ it." (rebuild) · "Before kindergarten, Sam went to ___." (preschool) · "He did not read it right. He ___ the word." (misread). (re 3 · pre 3 · mis 3.)

**Answer position.** Level 1/3 pick: the right card's basket slot rotates so each slot holds it exactly 3 times per level (10th round = scene); the near-miss and unrelated fill the other slots in alternation. Level 2: card order shuffled per render; the gate measures that "always drop the first card" solves ≤ 1/3. Level 4: right clip's hook slot balanced 3/3/3. Level 2b: each card in each basket slot across the level. Target end alternates, so "the far end is always the right" carries no positional tell.
**Order:** order-only reshuffle per pass (never the same order twice in a row).

## 7. Check, the misses, the success
- **Check with nothing done:** hint, no miss — "Drag a card onto the rod. Where will it slide?"
- **Miss 1** (a drop that does not reach the far end): the slide itself is the showing — the card stops at the middle, parks beside the target, falls off, or goes to the crossing rod. Hint by what happened: middle → "That is only halfway. The opposite is all the way at the other end." · same end → "That one means the same. Find the one at the other end." · fell off → "That word does not live on this rod." · crossing rod → "Left and right are on a different rod."
- **Miss 2** (second miss in the round): the empty far clip pulses and the rod paint brightens toward the far end (the gradient runs like a light along the bar toward the clip); the target card is read aloud once. Hint: "Think of the word at the very other end of {word}."
- **A new move takes the help away** until the next Check.
- **Success** (the far clip filled with the right card; Check): both end cards spin once, the rod rings its note, the rod flies to Quill's shelf · "{word1} and {word2} are opposites — the two ends of one rod!" Level 2: "Same end: {same list}. Other end: {opposite list}." Level 4 flip: "{prefix} turned {base} into its opposite: {new}!" Level 4 meaning: "{prefix} means {gloss}: {new}." (gloss = again / before / wrongly).
- Level 3 write: a misspelled typed word that is not in the round's lexicon does not slide at all — it shakes in the clip: "Check the letters: is it spelled right?" (never counted as an opposite error).

## 8. Settings
1. **Words:** Pictures (Levels 1–3 cards show pictures, default for K) · Words only (pictures hidden; reading the word is the task). Visible at rest.
2. **Answer** (Level 3): Pick a card · Write it. Visible at rest: the basket or the keyboard.
(The level picker of the shell chooses Pictures / Same or opposite / Sentences / Prefixes.)

## 9. Words (EN source)
- title: **Quill's Mirror Market** (frozen page title) · on-stage title "The Two-Ended Rod" is NOT shown; the shell title stays.
- instruction: "Put a word on the rod. The opposite slides all the way to the other end."
- task lines: L1 "Find the opposite — the other end of the rod!" (keeps the old kid prompt "Find the opposite — the OTHER end!") · L2a "Put each word where it belongs: same end or other end." · L2b "Slide each opposite onto its own rod." · L3 "Finish the sentence with the opposite." · L4a "Which clip turns the word into its opposite?" · L4b "Which clip gives the word the meaning in the sentence?"
- hints and celebrations: §7 exactly. Settings: "Words", "Pictures", "Words only", "Answer", "Pick a card", "Write it".
- aria: "Rod from {a} to {b}", "{word} card", "Empty end of the rod", "Prefix clip {p}".
- L4 hint lines: wrong clip → "{word} rolled back: “{prefix}” does not make a word with it. Try another clip." · miss 2 → the right clip glints on the hook · "Which clip makes the opposite of {word}?" / "Which clip means {gloss}?"

**Locale traps:**
- **Gender/agreement of adjectives** (de/fr/es/pt/it/nl/sv/da/no): cards show the base (masculine singular / uninflected) form, and sentences in Level 3 are authored so the adjective agrees with its noun (fr "La tasse est pleine. Maintenant elle est ___." → vide; es "llena/vacía"). Rounds are literal per-locale strings; nothing is inflected by code.
- **Pairs that are not single words in some locales:** "on/off" for a lamp is a verb phrase in many (de an/aus works; fr allumée/éteinte; es encendida/apagada; fi päällä/pois päältä — two words on one card is fine). Open/closed: de offen/zu (or geschlossen — the panel picks the K word).
- **Same-meaning lists** (Level 2) must be true synonyms for children in that language; the panel authors them, and the gate checks every Level-2 card is labelled same/opposite in the data (no "unclassified" card).
- **Prefixes are per-locale data; the apparatus adapts.** de un- (unglücklich), nl on- (ongelukkig), sv o- (olycklig), da/no u- (ulykkelig), fr in-/im-/mal-/dé- (impossible, malheureux, défaire), es in-/des- (infeliz, deshacer), pt in-/des- (infeliz, desfazer), it in-/s-/dis- (infelice, scortese, disfare). **fi forms antonyms with a suffix** (onneton = unhappy, -ton/-tön with vowel harmony and stem changes — the panel lists only transparent, child-known pairs) or the prefix epä- (epäreilu): fi clips carry their ending and close on the card's BACK edge — same mechanic, honest morphology. The fused fi word is a literal per-locale string, never built by code.
- **G2-376 (re-/pre-/mis-) exists cleanly only in some languages.** fr (re-, pré-, mé-), es (re-, pre-, —), pt (re-, pré-, —), it (ri-, pre-, —) can carry partial sets; de/nl/sv/da/no/fi have no transparent K-2 set of three. Rule: a locale ships the meaning-clip rounds only if its native panel finds ≥ 7 transparent, child-known words; otherwise those rounds are a recorded **refusal** for that locale (the coverage expectation drops; the flip-clip rounds still ship everywhere).
- **Capital at sentence start** (L3 round 9 "Pull"), and German nouns are capitalised mid-sentence — typed answers in de are checked case-sensitively only where the language requires it.
- Keyboard letters per locale (å ä ö æ ø ñ ç é è ü ß …).

## 10. Sound off, access, phones
- Silent legibility: the slide outcome (far end / middle / beside / off) is the feedback; no sound needed.
- Keyboard: Tab to a basket card, Enter picks it up, Enter again drops it on the rod; arrows move between basket cards; in write mode the physical keyboard types.
- aria-live: "{word} slid to the middle of the rod", "{word} went to the same end as {target}", "{word} does not belong on this rod".
- Taps ≥ 44 px (cards 80 × 100 at 360, keys 40 → 44 px hit area, clips 72 × 48).
- Pictures 96 px at 704, 64 px at 360.
- Phone: stacked; vertical rod shortened; the shelf of finished rods becomes a single row of small rod icons under the bubble.

## 11. Distinct from
- **#258 The Unchanging Picture (synonyms)** — the picture redraws to test a swap; here meaning is a *position on a scale*.
- **#310 Word Press** (suffixes) and **#217 Article Caps** — #217 drops a cap onto a word; here nothing is put on the word: the prefix is the far end of the rod, and the word has to travel there and be accepted.
- **Premium shape-stretcher / sorting-hoops** — no scale-position mechanic for words.
- Registry #19 Number Elevator uses a vertical scale for numbers; this is a semantic scale of word meanings with middles, same-end stacks and crossing rods — not a number line.

## 12. Build plan
- **Data:** extend `opposites-pairs.json` with, per pair, `rodPaint`, `positions` {word → 0 | 0.5 | 1 | 'off' | 'cross'}, `picture` (theme/noun + transform), and per-locale `roundsL10n` for Levels 1–4 (the existing de/fr/es/pt/it/nl rounds are the seed for the panel; sv/da/no/fi new).
- **Core state** `{level, round, rod:{pairId, targetEnd}, placed:{cardId → pos}, typed, clip, misses}`; functions `newRound(spec)`, `homeOf(card)` → `{rod:'this'|'cross'|'none', pos}`, `drop(cardId)` → outcome, `typeWord(str)` → card or `{unknown}`, `hangClip(clipId)`, `pushBase()` → `{fused, newWord}|{rolledBack}`, `isComplete()`.
- **Gate's own ground truth** (`verify-opposites-rod-core.js`): its own table of pair poles and middles (written in the gate, not read from the core) — for every Level 1 and 3 round: exactly one card has home = far end; middles land at 0.5 only on gradable rods; switch rods have no 0.5; siblings never reach a pole; same-meaning words land at the target pole; clips: exactly one fuses; no non-word string is ever produced by a wrong clip (the core returns `{rolledBack:true}` without building it); every L2a card is labelled same/opposite/off in the gate table; every L2b card has exactly one home rod. Slot balance 3/3/3 per level; target end alternates. Level 2 bot "drop in basket order" ≤ 1/3 success. Locale gate: every L3 sentence contains the blank once and its answer is the round's far-pole word; every picture exists and is colour.
- **Mutations:** sibling allowed at the pole · middle allowed at the pole · same-meaning word sent to the far end · switch rod given a middle · crossing rod disabled (left accepted on upright) · wrong clip fuses · a fused non-word string built · fi clip closes on the front edge · L2b card accepted on another rod · L2a same/opposite split constant · slot always 1 · target end always L · typed unknown word treated as wrong opposite.
- **Pictures to verify on contact sheets at build:** toys/ball, weather/hot, cold, rainbow, thermometer, beach/sun, space/moon, emotions/happy, sad, content, around-the-house/door, lamp, kitchen-tools/jar (seen: weather, emotions, around-the-house, kitchen-tools sheets 2026-10-17 — "cold" is a penguin in a scarf and hat, which reads as cold; "content" is a calm smile, close to happy, which is exactly why it is the same-end card).
- **Risks:** the door `rotateY` must not look broken at 64 px (fallback: the open door is the door picture slid aside 40 % behind a dark doorway rectangle); the fill overlay must be clipped to the jar glass bounds measured from the picture's ink box.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dropping a card to see where it slides is a little physics toy, and the rods with their notes fill a shelf.
2. **Would a teacher put it on the board?** Yes — "warm is only halfway", "huge is the same end", "left is on the other rod" are exactly the conversations K.L.5.b needs, and the rod shows them.
3. **Would a parent trust it?** Yes — library pictures, calm motion, no scores; a wrong prefix never prints a non-word.
4. **The invention:** opposites are the two ends of one rod — every word slides to where its meaning lives.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 3→5 · reality 4→5
What changed:
- **Distinctness:** Level 4 "prefix caps dropped onto the word" was the #217 Article Caps invention. Replaced by **prefix clips that ARE the far end of the rod**: the child hangs a clip at the empty end and pushes the base word along — the right clip closes and fuses the word ("unhappy" lands where "sad" would); a wrong clip lets the word touch and roll back. Same rod metaphor, no cap, no non-word ever built; fi clips close on the back edge (suffix -ton/-tön).
- **Level 2 was incomplete:** rounds with 2–3 cards, "tall | high" (not synonyms), and "Pair up" rounds with no content. Now L2a Same-or-opposite (8 exact rounds, same/opposite split varies 2/2, 1/3, 3/1 so card-counting tells nothing, one round with a card that belongs nowhere) and L2b Pair up (7 exact rounds, three rods, each card has one home rod) for G1-336.
- **G2-376:** 9 rounds balanced re 3 / pre 3 / mis 3 (added "preschool"; the odd "preview the movie before school" rewritten).
- **Pictures:** weather/sun has no lcs-pictures label → beach/sun; round 6 near-miss "sunny — same end" was not a synonym of "day" → weather/rainbow, which falls off the day–night rod.
- Strings, aria, gate and mutations updated for clips, L2a/L2b.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
