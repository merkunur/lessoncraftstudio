# Row 56 — Pepper's Flip Card: every swap turns the picture (RF.K.2.e)

## 0. Identity
- id `pepper-sound-swap.substitute.rf-k-2-e` (KEPT) · grade K · Common Core RF.K.2.e (add or substitute individual sounds in simple one-syllable words to make new words) · strand Reading: Foundational Skills · page title (frozen, en) "Pepper's Sound Swap — Change a Sound, Make a New Word (Kindergarten)"; the other ten locales get slug, title and intro at build (de/es/fr/it/pt/nl/sv/da/no/fi; grade K equivalents).
- own files `mini tools/flip-card-core.js`, `flip-card-activity.js`, `flip-card-activity.html`; the manifest row stays in `pepper-sound-swap-activities.json` (id, en slug/title/intro frozen) with `tool` repointed; the old `pepper-sound-swap-activity.js` is untouched.
- worksheets it covers: none mapped.
- what the old activity did: tap a picture to hear its name; Pepper changes one sound (e.g. first sound to H); tap the picture of the new word among three; 8 rounds (bands 1–3). **Kept:** all 8 rounds (cat→hat, pan→fan, van→pan, bat→cat, fan→van, hat→bat, cat→cap, hat→ham) and their choices, the frozen promise ("Pepper swaps one sound… tap the picture of the new word") as Level 1–2. **Pepper** becomes the library parrot picture (birds 2/parrot), never a drawing.

## 1. The pitch
"The word sits on a flip card with its sounds on tiles: swap one tile and the card flips over to the word you really made — the goal word, a different real word, or a blank card if it's no word at all."

## 2. Why a child will want it again (the fun)
- **A card that flips.** The picture lives on a thick card with the word's sound tiles along its bottom edge. Push a new tile into a slot — the old tile pops out and tumbles away with a *plok* — and the whole card spins over on its axis (600 ms) to show the picture of the new word. *cat* → push **h** → *flip* → a hat!
- **Every swap is a surprise.** Push **b** into *cat* and it flips to a bat — a real word, just not the one Pepper wanted. Push **m** in and the card flips to its blank grey back with "m a t" written on it and no picture — the card doesn't know that word. Children try everything just to see what the card turns into.
- **Pepper brings the tiles.** The library parrot sits on a perch at the top of the stage with the next tile hanging below her; on success her picture bobs.
- **Chains.** In the chain level every flip leaves a ticket on a strip below — a drawn ticket carrying the word's tiles (*cat → hat → ham → jam*, content letters, no shrunken pictures) — and at the end the tickets light up one by one while the big card flips through all the pictures, one per ticket, at full size.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** substitute one sound (first, last, middle) in a one-syllable word to make a new word; add a sound at the start (RF.K.2.e).
- **Misconception 1 — changing a sound changes the whole word / any word with that letter is fine.** The card turns into exactly the word the tiles now make — *bat*, not *hat* — so the child sees one changed sound gives one new word.
- **Misconception 2 — the position doesn't matter.** Putting **p** at the end of *cat* makes *cap*, at the front makes *pat* (no picture → blank). The card shows the result of *where* the sound went.
- **Misconception 3 — the new sound is added, not swapped.** In swap levels the old tile physically pops out; only one tile fits a slot. In the add level a new slot opens at the front and the tiles slide right.
- **How the material pushes back:** the card flips to the honest result of the swap; the goal frame only lights for the goal word.

## 4. The stage
`layout:'split'` at ≥ 700 px: the card + tiles left (≈ 440 px), the choices / goal + bubble right. Stacked below.

**At 704 px (stage 704 × 490):**
- **Pepper's perch** (top-left, 704 × 104 band): the library parrot at **96 px** on a drawn perch bar (teal rod), with **the swap tile** hanging below her on a string (a coral tile 64 × 64, letter at 40 px white). In Level 3+ the perch holds the **letter tray** instead (four tiles).
- **The flip card** (left column, x 40–360, y 112–432; the stage grows to 704 × 520): a card 300 × 320 (white face, 3 px ink, rounded 16, a 6 px card-thickness edge visible during the flip). Picture area **200 px** (library picture). Along the bottom: the word's **sound tiles** in slots — three slots **76 × 76** (gap 10), cream tiles with **44 px** ink letters (a digraph tile carries two letters).
- **The arrow** (Level 1–2): a small coral arrow from Pepper's tile down to the slot it will replace (geometry).
- **Choices** (right column, Level 1, 2, 5): three library pictures at **104 px** in frames, stacked vertically (x 400–520), plus the **guess frame** (x 540–680): an empty dashed frame 132 × 132 beside the card where the chosen picture goes.
- **The goal frame** (Level 3–4, right column top): a small framed picture of the goal word at **104 px** with a soft star-shaped ribbon corner (geometry) — "this is what we want".
- **The chain strip** (Level 4, bottom band 704 × 56): drawn tickets 96 × 44, each carrying its word's tiles at 22 px, joined by small arrows — a record in apparatus geometry (the 96/64 px picture floor forbids shrunken cards).
- **The bubble** (right column, under the choices / goal).
- **Task line** above (≤ 24 px). No words on the apparatus except the sound letters (content).

**At 360 px (stage 360 × 720):** perch band 360 × 72 (Pepper **64 px**, tile 52 × 52); card 280 × 280, picture **150 px**, slots 64 × 64 (36 px letters); choices in a row of three under the card (**80 px** pictures), guess frame becomes a ring around the chosen picture (no separate frame); goal frame 80 px at the top-right of the card; chain strip of tickets 72 × 36 (18 px tiles), wrapping to 2 rows; bubble; Check. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: card 250, picture 132, choices 72, slots 58).

## 5. The hand
- **Level 1–2 (Pepper swaps; you predict):** tap a choice picture → it slides into the guess frame (220 ms); tap another to change. Tap the card's picture → TTS says the start word (bonus). Tap a tile → TTS says its sound (bonus).
- **Level 3–4 (you swap):** drag a tile from the tray onto a slot of the card. Within 100 ms the old tile pops out (bounces off the card edge, rolls back to the tray) and the new tile seats with a *clunk*; then the card flips (600 ms rotateY) to its new face:
  - a **picture word** (the tiles spell a noun in the round's lexicon) → the face shows that picture; if it equals the goal, the goal frame glows;
  - **no picture** → the grey back face with the tiles' letters written large and no picture (a calm grey, never a cross).
  Swapping again flips again. A tile can be dragged off the card back to the tray (the slot shows its last tile ghosted until filled).
- **Level 5 (add a sound):** Pepper's tile hovers before the first slot; the child predicts as in Level 1; on Check a new slot opens at the front, the tiles slide right (200 ms), the tile drops in, the card flips.
- **Free play:** at any time in Levels 3–4 the child may swap anything (that IS the play); after success in Levels 1–2 the tray appears for 8 s with the round's letters for free swapping.

## 6. The rounds
A pass = a level's table, order-only reshuffled. The picture lexicon for flips = every en noun in the activity's word list that has a library picture (≈ 60 CVC/CCVC nouns: cat bat hat cap can fan pan van jam ham bag map dog log fox pot mop sun bun bus mug jug cup pig fig bed hen pen net jet leg sock lock rock duck ship fish chick sheep car jar star sled flag frog crab drum sack bowl owl bear pear ear eye pie clock snail nail oar door) — so any swap that spells one of them flips to its picture. (`ox` is out of the lexicon: its picture reads as a bull.)

**Level 1 — Pepper swaps the first sound (predict).** (legacy rounds marked L)

| # | start (theme) | Pepper's tile → slot | answer | other choices |
|---|---|---|---|---|
| 1 L | cat (animals) | h → first | hat (accessories) | bat (animals), dog (animals) |
| 2 L | pan (around the house) | f → first | fan (around the house) | van (vehicles), sun (beach) |
| 3 L | van | p → first | pan | fan, log (camping) |
| 4 L | bat | c → first | cat | hat, fox (animals) |
| 5 L | fan | v → first | van | pan, sun |
| 6 L | hat | b → first | bat | cat, mop (around the house) |
| 7 | sock (accessories) | l → first | lock (around the house) | rock (beach), sun |
| 8 | dog | l → first | log | fox, duck (animals) |
| 9 | mug (kitchen tools) | j → first | jug (kitchen tools) | cup (around the house), bun (bakery) |
| 10 | hen (farm animals) | p → first | pen (classroom) | net (beach), hat |

**Level 2 — the last or the middle sound (predict).**

| # | start | tile → slot | answer | other choices |
|---|---|---|---|---|
| 1 L | cat | p → last | cap (accessories) | map (camping), dog |
| 2 L | hat | m → last | ham (At the Supermarket) | jam (At the Supermarket), fox |
| 3 | bag (At the Supermarket) | t → last | bat | cat, pig (animals) |
| 4 | can (At the Supermarket) | p → last | cap | pan, cup |
| 5 | pan | e → middle | pen | fan, bun |
| 6 | mop | a → middle | map | mug, cap |
| 7 | sock | a → middle | sack (christmas) | lock, sun |
| 8 | log | e → middle | leg (body parts) | dog, lock |
| 9 | cap | u → middle | cup | can, map |
| 10 | ham | t → last | hat | jam, hen |

**Level 3 — You swap (goal + tray of four tiles).** The tray always holds the goal's tile plus three tiles that make *other* outcomes (another real picture word or a blank) — computed by the core, listed here for en:

| # | start → goal | tray | notable other outcomes |
|---|---|---|---|
| 1 | cat → hat | h b p m | b-first → bat · p-last → cap · m → blank (mat) |
| 2 | pan → fan | f v e s | v-first → van · e-middle → pen · s → blank |
| 3 | mug → jug | j b p h | b → blank (bug) · h → blank (hug) — the reviewer confirms *bug/hug* are blanks only because the library has no picture (the bubble never says "not a word") |
| 4 | sock → lock | l r d a | r-first → rock · a-middle → sack · d-first → blank (dock) |
| 5 | dog → log | l f h e | e-middle → blank (deg) · f-first → blank (fog) · h-first → blank (hog) |
| 6 | hat → ham | m b t c | b-first → bat · c-first → cat |
| 7 | cap → cup | u i o n | n-last → can · i → blank (kip) · o → blank (cop) |
| 8 | mop → map | a h t u | t-first → top (blank) |
| 9 | log → leg | e d f o | d-first → dog |
| 10 | hen → pen | p n t a | t-first → ten (blank) |

**Level 4 — Word chains (three or four swaps; the goal moves on after each).**

| # | chain |
|---|---|
| 1 | cat → hat → ham → jam |
| 2 | pan → pen → hen |
| 3 | mop → map → cap → can |
| 4 | sock → lock → log → dog |
| 5 | sun → bun → bus |
| 6 | cup → cap → can → fan → van |
| 7 | leg → log → dog |
| 8 | bag → bat → cat → cap → cup |

**Level 5 — Add a sound at the start (predict).** (The draft's *ox → fox* is struck: `farm-animals/ox` is drawn as a bull — PICTURE-RULINGS — so the start word cannot be named from its picture. *oar → door* replaces it: `camping/oar` and `around-the-house/door`, both clean on the contact sheets.)

| # | start | Pepper adds | answer | other choices |
|---|---|---|---|---|
| 1 | oar (camping) | d | door (around the house) | bear, lock |
| 2 | owl (animals) | b | bowl (around the house) | oar, cup |
| 3 | ear (body parts) | b | bear (forest creatures) | pear (fruits), eye (body parts) |
| 4 | ear | p | pear | bear, pie (At the Supermarket) |
| 5 | eye | p | pie | pear, ear |
| 6 | lock | c | clock (around the house) | sock, rock |
| 7 | nail (tools) | s | snail (insects and bugs) | nail, fish |

(Levels 5's 3 and 4 share a start on purpose: the added sound decides between *bear* and *pear*.)

**Answer position (measured):** Levels 1, 2, 5 — the answer's choice slot is uniform over three slots (⅓ ± 1 per level; legacy rounds re-slotted to satisfy it); the choice that shares the *untouched* sounds (the "nearly" picture, e.g. *bat* for cat→hat) is never always beside the answer (half the rounds). Level 3 — the goal tile's tray position is uniform over four. The gate counts these.

## 7. Check, the misses, the success
- **Check with no choice** (L1/2/5) → hint, no miss: "Which picture will the card turn into? Tap one." · L3/L4 with the card unchanged → "Swap a tile to change the word."
- **Miss 1 — the swap shows what it really made (L1/2/5):** Pepper's tile drops into the slot, the old tile pops out, and the card flips — to the **true** new word's picture; the guess frame's picture shakes and shows its own tiles under it, with the one tile that differs from the card's tiles glowing coral. Then the card flips back to the start word and the round goes on (the child has now *seen* the result — the second try is about connecting it). Hint: "The card turned into a {result}. Your picture is {guess} — listen to its {first/last/middle} sound." *(Rationale: hiding the result after a wrong guess teaches nothing at this age; showing it makes the second try a matching of what was heard and seen, and the gate still counts it as a miss.)*
- **L3/L4 Check with a wrong card face** → miss 1: the goal frame and the card stand side by side; their tiles line up under each other and the slot that differs glows; hint: "Your card says {current}. Which tile has to change to make {goal}?"
- **Miss 2 (all levels):** the slot that has to change pulses (the arrow returns in L3/L4), and TTS (where available) says the goal word slowly, sound by sound; hint: "Change only this tile." (L1/2/5: "Say {start}. Now say it with {tile} at the {position}.")
- **A new move takes the help away** until the next Check.
- **Success:** the card flips (or, in L3/L4, has flipped) to the goal; the goal frame and the card glow together; Pepper bobs; the old tile tumbles off the stage edge. Bubble: "cat → hat: one new sound, one new word!" (EN source: "{start} → {result}: one new sound, one new word!"). Level 5: "ox + f = fox!". Level 4 end: the chain strip lights ticket by ticket while the card flips through every picture; "cat, hat, ham, jam — three swaps!".

## 8. Settings
1. **Level:** Pepper swaps the first sound · Last or middle sound · You swap · Word chains · Add a sound — at rest the board shows choices + one hanging tile / a goal + a tray of four / a chain strip.
2. **Letters on the tiles:** shown (default) · sounds only — with "sounds only", tiles show coloured dots instead of letters (each sound its colour, Pepper's new sound a new colour); the task becomes purely oral (TTS-locales recommended; the setting is hidden where the locale has no TTS voice).

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native ×11 + pedagogy reviewer)
- title (frozen en) · instruction: "Pepper changes one sound. What will the card turn into?"
- task lines: L1/2 "{start}: change the {first/last/middle} sound to {tile}. What is the new word?" · L3 "Swap one tile to make {goal}." · L4 "Swap one tile at a time to reach {goal}." · L5 "Add {tile} to the start of {start}. What is the new word?"
- hints / celebrations: §7. Settings: "Level", "Pepper swaps the first sound", "Last or middle sound", "You swap", "Word chains", "Add a sound", "Letters on the tiles", "Shown", "Sounds only".
- aria: "Card: {word}, tiles {tiles}." · "The card flipped to {result | a blank card: {letters}}." · "Goal: {goal}." · "Chain: {list}."

**Locale traps:**
- **Each locale authors its own substitution pairs** from picture nouns only (both words pictured, labels in the locale). Seed first-sound swaps MEASURED from `mini tools/pictures/*.json` on 2026-10-17 (one first consonant replaced by one other; the panel strikes any picture that does not read as its word):
  - de Hund→Mund · Maus→Haus · Fisch→Tisch · Topf→Kopf · Vase→Nase · Hahn→Zahn · Schuh→Kuh · Dose→Hose→Rose · Kamm→Lamm
  - nl sok→rok→mok→kok · kam→ham→jam→lam · pan→kan · pen→hen · vos→bos · hond→mond · tas→jas→das · hand→tand→zand · peer→beer→meer · huis→muis · mus→bus · vaas→kaas
  - sv hatt→katt · kopp→mopp · kök→lök→hök · lås→gås · mus→hus · väst→häst · skål→kål · stol→kjol (add-a-sound: ris→gris, sol→stol)
  - da hat→kat · sok→kok · vest→hest · hund→mund · lås→gås · mus→hus→bus · pen→ben · kam→lam (add: ris→gris)
  - no hatt→katt · sokk→kokk · vest→hest · lås→gås · kopp→mopp→sopp · mus→hus · kam→lam (add: ris→gris)
  - es gato→pato · roca→boca→foca · loro→toro · luna→cuna · cono→mono · capa→mapa→papa · bollo→pollo
  - it cane→pane · vaso→naso · zucca→mucca · riso→viso · torta→porta · sacco→pacco · tenda→benda · tavolo→cavolo (*gatto→matto* struck: no picture for *matto*)
  - pt gato→pato→rato→jato · faca→vaca→maca · pente→dente · porta→torta · boca→foca · cola→bola · panela→janela · pão→mão · capa→mapa
  - fr sac→lac · pain→main · jus→bus · tarte→carte · bouche→louche · gâteau→râteau · coussin→poussin · gilet→filet (add: lune→prune is a cluster, not used)
  - fi sukka→kukka · lammas→hammas · lukko→kukko · suu→kuu · hana→kana · pannu→kannu · tussi→bussi · mekko→gekko · lokki→kokki · liivi→kiivi
  So es/it/pt/fr/fi CAN fill Level 1 (first sound) honestly with two-syllable words; Level 2 (last/middle sound) and Level 5 (add a sound) are mostly English/Germanic — each panel measures its own; if a locale cannot reach 7 rounds in a level, that level is hidden in that locale (never padded with picture-less words); the reviewer signs off each locale's pair list.
- **Sound ≠ letter:** a swap is a SOUND; en *c* and *k* are one sound (*cat → kit* is not offered), de *v/f*, nl *g/ch*, es *c/qu*, fr nasal vowels — tiles carry graphemes, but the core compares sound keys.
- **No rude results:** every reachable blank/real outcome in Level 3 is listed for the reviewer (the core can enumerate them); any rude outcome removes that tile from the tray. The critic already struck one: the draft's *k* tile on *sock* reaches a vulgar English word in the first slot — the tray now holds *d* (dock). The gate holds a per-locale deny-list of reachable strings and fails the build if any tray can reach one.
- **"Blank" is not "wrong word":** the grey card never says a word is not a word (English *mat* is a word); it only has no picture. The bubble text never claims otherwise.
- **Capitals:** de nouns are capitalised in print — tiles stay lower case; the bubble writes the noun correctly.
- **Sound off:** letters on tiles + the flip carry the task; "sounds only" needs TTS.

## 10. Sound off, access, phones
- Silent legibility: letters on tiles, the arrow, the flip result, the coral differing tile.
- Keyboard: L1/2/5 ←/→ choose a picture, Space selects, Enter = Check; L3/4 Tab to the tray, Space picks a tile, ←/→ chooses a slot, Space drops (the card flips); Enter = Check.
- aria-live announces each flip result.
- Taps: tiles ≥ 52 px, choices ≥ 72 px, card slots ≥ 58 px.
- Pictures: card 200 / 150 / 132 px; choices 104 / 80 / 72 px; Pepper 96 / 64 / 64 px (decoration, never below the floor).
- Reduced motion: the flip becomes a 200 ms cross-fade.
- Phone: perch → card → choices row → bubble → chain → Check (Check bottom re-measured with the 72 px perch: ≤ 700 at 360 × 740; at 320 × 640 Pepper moves beside the card's top-right corner to save the band).

## 11. Distinct from
- **Row 54 Blending Magnets** (onset + rime snapped on a rail), **row 55 Sound Boxes** (lids pop where two words match), **row 57 Name Tag** (a printed word sticks to its picture). This is the only one that *changes* a word and shows the result.
- **Row 51 pt lock** — wheels roll vowels inside syllables to dial a known word; here one sound is swapped and the card answers with whatever word results.
- **Premium `blending-board` / `letter-tiles`** — build and check words from letters; no flip card, no goal, no chain, no "what did my swap make".
- **New 258 Synonym Swap** (word meaning) — unrelated skill.

## 12. Build plan
- **Core state:** `{level, round:{start, goal|answer, tile, slot, choices[], tray[]}, card:{tiles:[{letters, soundKey}], face:'picture'|'blank', word}, guess, chain:[], misses}`. Functions: `swap(slot, tile)` → `{popped, word, face}` (lookup in the locale lexicon of picture nouns keyed by their sound-key sequence); `add(tile)`; `predictCheck(guess)`; `goalCheck()`; `outcomes(start, tray)` → every (slot × tile) result for the reviewer dump.
- **Gate's own ground truth (`verify-flip-card-core.js`):** for every L1/2/5 round, applying the tile to the start's sound keys yields exactly the answer's sound keys, and no other choice equals that result; for every L3 round the goal is reachable in one swap with a tray tile and the tray holds ≥ 2 tiles leading to a different outcome; every L4 chain is a sequence of single-sound changes, each step reachable with its tray; every word in the lexicon has a library picture (colour theme); the "nearly" choice shares all untouched sounds with the start (it is the pedagogical distractor) yet ≠ result; slot balances per §6; all 8 legacy rounds present.
- **Mutations:** swap without popping the old tile (adds instead) · compare letters not sound keys (c/k) · flip to the goal even when the tiles spell something else · blank face for a lexicon word · L1 accept the "nearly" choice · tile goes to the wrong slot · add-level inserts at the end · answer always slot 1 · help at miss 1 · help kept after a move · pass 2 order = pass 1 · drop a legacy round.
- **Pictures to verify on a contact sheet:** birds 2 parrot; animals cat, bat, dog, fox, duck, owl; accessories hat, cap, sock; around the house pan, fan, mop, lock, cup, bowl, clock; vehicles van, bus; beach sun, rock, net; camping log, map; kitchen tools mug, jug; bakery bun; farm animals hen; classroom pen; At the Supermarket bag, can, ham, jam, pie; christmas sack (✓ critic 2026-10-17: a plain red drawstring sack, no Santa); camping oar; around the house door; body parts leg, ear, eye; forest creatures bear; fruits pear; tools nail (⚠ a metal nail — fine for "nail"); insects and bugs snail. Seen 2026-10-17: animals, around-the-house (lock is a padlock, clock a wall clock — both good), at-the-supermarket, kitchen-tools.
- **Risks:** the flip must start within 100 ms of the drop (the old tile's pop and the flip overlap); the blank face must feel neutral — test with the reviewer.
- **BLOCKED:** nothing for en; other locales are limited only by picture pairs (each panel lists its pairs; ≥ 7 per level or the level is hidden in that locale).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a card that flips into whatever you made, surprises at every swap, word chains.
2. **Would a teacher put it on the board?** Yes — one sound changes, one word changes, and position matters; the result is shown honestly, including real-but-unwanted words.
3. **Would a parent trust it?** Yes — library pictures, calm, no score; a blank card never shames.
4. **The invention:** swap one sound tile and the card flips over to the word you really made — the goal, another real word, or a blank card.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 3→5
What changed:
- Level 5 *ox → fox* struck (the ox picture reads as a bull) → *oar → door* (both clean on contact sheets); `ox` removed from the flip lexicon.
- Level 3 tray: the *k* tile on *sock* reached a vulgar word → *d* (dock); the *a* tile on *cap* changed nothing → *i*. The gate now holds a per-locale deny-list of reachable strings.
- Locale pairs measured from the picture library for all ten non-en locales (first-sound swaps both pictured); *gatto → matto* struck (no picture). Romance/fi can fill Level 1 honestly; other levels hide per locale below 7 rounds.
- Pepper 64/48 px and the 56/44 px chain cards broke the picture floor → Pepper 96/64 px, chain = drawn word tickets (renamed from "dominoes" to stay clear of row 50's Domino Run). christmas/sack confirmed on the contact sheet (a plain sack).
