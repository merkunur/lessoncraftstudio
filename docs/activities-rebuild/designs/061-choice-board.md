# Row 61 — The Word Keys (RF.K.3.c)

## 0. Identity
- **id** `choice-board.tell-words-apart.rf-k-3-c` (KEPT; slugs/titles/intros frozen for en de es pt fr it nl sv da no) · grade K · Common Core **RF.K.3.c** (read high-frequency words — telling apart the ones children mix up) · strand Reading: Foundational Skills.
- **files (key `word-keys`)** `mini tools/word-keys-core.js`, `word-keys-activity.js`, `word-keys-activity.html`; manifest row stays in `choice-board-activities.json` (`promptKey: promptTellApart` retired), `tool` repointed. New metadata for **fi**.
- **worksheets it covers:** K-389 Sight Word in Sentences (read each sentence, write the word) · K-390 Sight Word Sentence (step by step) · K-392 Find the Sight Word among look-alikes.
- **what the old activity did:** hear a word (TTS), tap it among three look-alikes (was/saw/war/wax …); 8 rounds per locale, no fi. **Kept:** every locale's 8 targets and their look-alike sets — they are the keys on the ring. **Changed because it was wrong:** an audio-only prompt is unplayable with the sound off in 6 of 11 locales; and "hear it, tap it" never asked the child to READ — a child could match the first letter. Now the sentence's meaning chooses the word and the lock checks every letter in order.

## 1. The pitch
"Each little word is a key, and its letters are its teeth — a sentence's lock only turns for the key with exactly the right letters in exactly the right order, so *saw* slides into *was*'s lock and will not turn."

## 2. Why a child will want it again (the fun)
- **Keys you can feel.** Brass keys hang on a ring; each key's blade is cut into teeth, and each tooth carries one letter. Children love keys. Pick one off the ring (it jingles), slide it into the padlock in the sentence, and turn it with a twist of the finger.
- **The turn.** The right key turns a quarter-turn with a solid *clunk*; the padlock's shackle pops up, the lock swings off the sentence, and the word drops into place as ordinary print. The sentence lights word by word as if read aloud (TTS reads it where available) and the picture beside it does a little bounce.
- **The jam.** A wrong key slides in and stops: the teeth that do not match light up, the key rattles (*tk-tk*) and will not turn. *off* in *of*'s lock: the key will not go all the way in — its extra tooth sticks out of the lock. *of* in *off*'s lock: it goes in but a pin at the end glows empty. *saw* in *was*'s lock: s and w glow — same letters, wrong places. The lock shows the difference; it never scolds.
- **Key cutting.** In the third game the child cuts their own key: a blank key sits in a little cutting machine and each letter typed cuts a tooth (*zzzt*, brass shavings fly). Then they try it in the lock.
- **The key ring grows.** Every word opened leaves its key on the child's ring at the top of the stage; after a pass the ring jangles with eight keys. Tap the ring to jingle (free play).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** read high-frequency words exactly — every letter, in order — and tell apart the look-alikes children confuse (was/saw, of/off, the/they/then, no/on, who/how, were/where, want/went), reading them in sentences (K-389, K-390) and finding the right one among look-alikes (K-392).
- **Misconception 1 — reading the first letter and guessing** (want/went/what/wait). The lock checks every tooth; teeth that differ glow, so the child sees that the middle letters matter.
- **Misconception 2 — letter order** (was/saw, no/on). Same letters, wrong places: the lock lights exactly the swapped positions.
- **Misconception 3 — length blindness** (of/off, we/were, the/them). One tooth too many sticks out of the lock; one too few leaves a glowing empty pin — the count of letters becomes physical.
- **Misconception 4 — "any of these could go there".** In the Key-ring game each key opens exactly one of three locks: was opens "The cat ___ on the bed." and saw opens "I ___ the bus go by." — both words are right somewhere, so the child must read the word AND the sentence.
- **How the material pushes back:** the lock is the check; a key with any wrong tooth physically will not turn, and shows which tooth.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 470):
- **The key ring** (top strip, 504 × 60): a drawn ink ring on a hook at the left; collected keys hang from it (small keys 44 × 16).
- **The sentence board** (y = 72, 504 × 150): the round's library picture **120 px** on the left (the sentence's subject), the sentence on the right in Nunito **30 px**, with the **padlock** sitting in the blank: a brass body (`#D9A441`, 3 px ink outline) **132 × 72** with a keyhole slot and a shackle 52 wide. The padlock is the same size for every word (fits up to 5 letters), so its size never tells the length.
- **The keys** (y = 270): the round's three keys hanging from pegs on a rail, each **200 × 64**: a round bow (40 px ring) + a blade whose teeth are letter tiles (Baloo 2 **36 px**, each tooth 34 px wide). A longer word = a longer blade; keys hang at the same height, left-aligned at their bows.
- **Key-ring game:** three sentence boards stacked (each 504 × 96, picture **96 px**, sentence 26 px, padlock 120 × 64) and three keys on the rail below.
- **Cut-the-key game:** the cutting machine (geometry: a vice and a cutting wheel) holds a blank key (200 × 64, empty teeth); a letter tray of 8 tiles **56 × 56** below.
- **Task line** above (≤ 24 px). Bubble in the right column; Check ("Turn") under it.

**At 360 px** (stacked): ring 360 × 44; sentence board: picture **80 px** above the sentence (Nunito 24 px), padlock 112 × 60; keys **156 × 52** (teeth letters 28 px), stacked in a column of three on the left half? — no: keys in one row would need 480 px, so they hang in **a column** (3 rows of 156 × 52, right-aligned under the board); Key-ring game: three boards with pictures **64 px** and sentences 20 px, keys in a 3-column grid of 108 × 44 (letters 22 px); letter tray 4 × 2 tiles 64 × 52; Check bottom ≤ 710 at 360 × 740. **At 320 × 640:** Key-ring game boards collapse to one visible board at a time (a 3-dot pager), Check ≤ 630.

Words on the apparatus: only the content words (sentences, letters on teeth).

## 5. The hand
- **Take a key:** drag a key off its peg (jingle) — it follows the finger, bow first. Tap a key = it flies to the (focused) padlock and slides into the keyhole (240 ms).
- **Insert:** drop the key's tip on the keyhole; it slides in (160 ms) as far as its teeth allow (a key too long stops with its extra teeth outside).
- **Turn (Check):** twist — drag the bow in a quarter-circle (≥ 45° counts) or press Turn. Right: the key turns 90° (300 ms), *clunk*, the shackle springs (120 ms), the padlock swings off and fades, the word drops into the sentence (200 ms). Wrong: §7.
- **Remove:** pull the key back out, or tap it; it returns to its peg.
- **Cut the key:** tap letter tiles (or type) — each fills the next tooth on the blank with a *zzzt* and a puff of shavings (120 ms); Backspace un-cuts the last tooth. Then drag the cut key to the lock.
- **Free play:** tap the ring to jingle; after a round, any key may be tried in the opened sentence again (it turns only for the right one, as a toy).

## 6. The rounds
One round = one lock (or one board of three locks). Pass = 8 rounds; order-only reshuffle per pass. Every sentence is authored so that **exactly one** key makes a grammatical, sensible sentence — the native reviewer reads every sentence with every key in it.

**Game 1 — Three keys (the old rounds, now in sentences).** EN target · look-alikes · sentence · picture:
1. **was** · saw, war, wax — "The cat ___ on the bed." · animals/cat
2. **of** · off, for, or — "One ___ the ducks can swim." · farm-animals/duck
3. **the** · they, then, them — "I can see ___ moon." · space/moon
4. **were** · where, here, we — "The pigs ___ in the mud." · animals/pig
5. **want** · went, what, wait — "I ___ a red apple." · fruits/apple
6. **no** · on, now, not — "I have ___ cake left." · around-the-house/plate (an empty plate)
7. **who** · how, why, hot — "___ is at the door?" · around-the-house/door
8. **saw** · was, say, sat — "I ___ the bus go by." · vehicles/bus
Three keys per round = the target + two of its three old look-alikes (the third rotates in on the next pass, so all three are met across two passes). Rejected sentences recorded for the reviewer (each let a look-alike fit): "a bowl ___ cherries" (for), "There is ___ milk" (now), "I ___ a bee" (was).

**Game 2 — Key ring (K-392, K-389), 8 boards.** Three sentences, three keys; each key opens exactly one lock (so the two look-alikes are BOTH right, in different sentences). EN:
1. **was · saw · say**: "The cat ___ on the bed." (was) · "I ___ the bus go by." (saw) · "What did you ___?" (say — no picture; the board's one picture-less lock)
2. **of · off · for**: "One ___ the ducks can swim." · "Take ___ your hat." (accessories/hat) · "This cake is ___ you." (bakery/cake)
3. **the · then · they**: "I can see ___ moon." · "First we eat, ___ we play." (breakfast/pancake) · "Look at the dogs. ___ can run." (animals/dog)
4. **no · on · not**: "I have ___ cake left." · "The cat sat ___ the bed." (animals/cat) · "The sun is ___ cold." (beach/sun)
5. **who · how · why**: "___ is at the door?" (who) · "___ old are you?" (how — bakery/cake) · "___ do you wear a coat? Because it is cold." (why — clothing/coat; the "because" is what rules out *how*)
6. **want · went · what**: "I ___ a red apple." · "We ___ to the park." (activities/playground) · "___ is in the box?" (christmas/present)
7. **were · where · we**: "The pigs ___ in the mud." · "___ is my sock?" (accessories/sock) · "Can ___ go now?" (vehicles/bus)
8. **saw · was · wax**: "We ___ a whale in the sea." (saw — beach/whale; "we was" is not English) · "The pancake ___ hot." (was — breakfast/pancake) · "The candle is made of ___." (wax — christmas/candle)
Rejected while authoring (a look-alike also fit, so the board would have two right keys): "The cat is ___ the bed." (on and not both fit — "The cat is not the bed" is a true sentence; critic), "The dog ___ on the rug." (sat and was both fit), "___ is the sky blue?" (why and how both fit), "I ___ a big whale." (saw and was both fit).
Each board's three pictures sit on their sentence boards; the order of the keys on the rail never matches the order of the locks.

**Game 3 — Cut the key (K-389 write, K-390), 8 rounds.** Game-1 sentences; the blank key is cut letter by letter from a tray of 8 tiles (the target's letters + the look-alikes' extra letters, e.g. was: w a s r x y t e). The lock then checks it.

**Answer position.** Game 1: the right key's peg (left/middle/right) is balanced 3/3/2 over a pass, and the right key is never the shortest-or-longest in more than half the rounds (gate measures "pick the middle-length key" ≤ 50 %). Game 2: keys are dealt so no key hangs under its own sentence row in more than 1 of 3 positions per board, balanced over the pass. Game 3: tray tiles in a per-pass rotating order (target letters never adjacent in spelling order).

## 7. Check, the misses, the success
- **Turn with no key in the lock:** hint, no miss — the keyhole glints — "Choose a key and slide it into the lock."
- **Miss 1:** the key slides in as far as it can; each tooth whose letter differs from the lock's pin at that position glows coral; an extra tooth sticks out of the lock body and glows; a missing tooth leaves the last keyhole notch glowing empty; the key rattles and slides half out. · "This key won't turn. Read every letter on it — and read the sentence again."
- **Miss 2:** the padlock turns to glass: its pins show as plain bars (one per letter of the right word) and the pins under the glowing teeth glow too, so the child sees how many letters the lock wants and where the key went wrong; the sentence is read aloud where TTS exists. · "Look inside the lock. How many letters does it need? Which key has them in the right order?"
- **Miss 3 and after:** the glass pins show faint ghost letters — the child still chooses and turns the key.
- **Key-ring miss:** a wrong key in a lock behaves as above; locks already opened stay open.
- **Cut-the-key miss:** the cut key jams the same way; the miscut teeth glow and can be re-cut.
- **A new move takes the help away** (glass turns back to brass) until the next Turn.
- **Success:** *clunk*, the shackle pops, the padlock swings away, the word drops into the sentence, the sentence lights word by word, the key flies up to the ring with a jingle. · "“{The cat was on the bed.}” — {was} opened the lock!" · Key ring: "Every key found its lock: {was}, {saw}, {say}."
- **End of pass:** the full ring jangles and the eight keys fan out once.

## 8. Settings
1. **Game:** Three keys (default) · Key ring · Cut the key — the board at rest shows one lock + three keys, three locks + three keys, or the cutting machine.
2. **Help in the sentence:** Picture on (default) · Picture off — with the picture off, the sentence board is text only (the board visibly narrows); for confident readers.

## 9. Words (EN source)
- title (shell, frozen): **Tell the Words Apart** · instruction: "Read the sentence. Find the key that opens its lock."
- task lines: G1 "Which key opens this sentence?" · G2 "Each key opens one lock. Which one?" · G3 "Cut a key for this sentence, then turn it."
- hints/celebrations: §7 exactly.
- settings: "Game", "Three keys", "Key ring", "Cut the key", "Help in the sentence", "Picture on", "Picture off". aria: "Key: {word}", "Lock in: {sentence with blank}", "Key turned. Lock open.", "Key will not turn: letter {n} is different", "Key is too long", "Key is too short".

**Locale traps:**
- **One key per sentence, per language.** Every sentence is written natively for its target (de "Der Hund ___ im Garten." for war vs wir/wer/was; es "___ gato duerme." for El vs En/Es/Mi …); look-alikes that are grammatical in a sentence disqualify it. The panel writes each sentence and the reviewer reads all three key-versions aloud.
- **Sentence-initial capitals:** a lock at the start of a sentence needs a capital; the keys are then shown with capitals on all three (so case never gives the answer); the lock compares case-insensitively except **de nouns**, whose capital is part of the word (de look-alikes Hund/und: "Hund" key never opens an "und" lock — a real difference the lock shows).
- **Accents are teeth:** pt é/e, não/nao, sv är/ar, da/no på/pa, fr à/a, es él/el — an accent is part of the tooth; the lock treats accented and plain letters as different (pt "é" vs "e" is the round's point in pt).
- **fr elision:** l' / d' / qu' are never keys; a sentence never requires an elided form of the target. **fr** old set includes les/bus/mes/vis — the reviewer checks each fits a sentence frame honestly (the panel may swap "vis" for a commoner look-alike).
- **Word order (V2):** de/nl/sv/da/no sentences are authored natively; the lock may sit in second position ("Heute ___ es kalt.").
- **fi (new):** Finnish "quick words" with look-alikes, e.g. **on** (en, oli) "Kissa ___ sängyllä." · **ei** (en, eli) "Minä ___ halua." → "Minä en halua" — careful: fi negation agrees with person (en/et/ei), so "ei" vs "en" in a sentence is GRAMMAR, which is exactly a good look-alike lock when the subject is shown ("Hän ___ tule." → ei). The panel authors all 8.
- **Pictures:** every picture is a library picture matching the sentence's subject; abstract sentences ("What did you say?") take a neutral picture tied to the sentence's noun or, with none, show no picture (allowed only in Game 2's third lock; the gate counts ≤ 1 picture-less lock per board).
- Sound off: the sentence, the picture, the glowing teeth and the glass pins carry the round; TTS (reading the finished sentence) is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** the sentence's meaning chooses the key; the lock's glow shows which letters differ.
- **Keyboard:** Tab to a key, Enter puts it in the focused lock; Tab moves between locks (Key ring); Space = Turn; Escape pulls the key out; Cut: type letters, Backspace.
- **aria-live:** "Key saw does not turn: letters 1 and 3 are different." / "Key was turned. The cat was on the bed."
- **Taps:** keys ≥ 108 × 44 (Key-ring phone grid), ≥ 156 × 52 otherwise; letter tiles ≥ 56 × 52; locks ≥ 112 × 60 drop target.
- **Pictures:** 120 px at 704, 80 px at 360 (Game 1), 96 / 64 px (Game 2).
- **Phone layout:** stacked; keys in a column; Key-ring boards may page at 320; Check above both folds (measured on every board).

## 11. Distinct from
- **Row 60 The Blink Camera (this batch, same words)** — there the word is SHOWN for a blink and recognised; here it is never shown — the sentence asks for it and the lock checks its letters.
- **New 217 The Article Caps** (a cap that only sits on the right word) — caps fit nouns by sound; these keys fit sentences by exact spelling, with tooth-by-tooth feedback.
- **New 213 The Alphabet Lockers (this batch)** — lockers order letters; no keys there.
- **Row 57 The Sticky Name Tag** (batch 09) — a printed word sticks to a picture letter by letter and peels at the first difference; there the PICTURE judges a word's letters left to right; here a SENTENCE's meaning chooses between look-alike high-frequency words that have no picture at all, and the lock judges every position at once.
- **Premium `heart-words`** — maps words to sounds; nothing here maps sounds.
- **Built registry:** no keys or locks exist.

## 12. Build plan
- **Core state** `{locale, game, picture, round:{locks:[{sentence:[before, after], answer, pic|null}], keys:[word]}, inLock:{lockIdx: keyWord|cutWord}, cut:[letters], opened:Set, misses, help, ring:[word]}`.
- **Functions:** `insert(key, lockIdx)` → `{depth, stickOut:int}`, `remove(lockIdx)`, `cutLetter(ch)`, `uncut()`, `turn(lockIdx)` → `{ok, diffPos:[i], extra:int, missing:int}`, `compare(key, answer, locale)` (case rule: insensitive except de nouns; accents significant), `helpFor(result, misses)` → `{glow:[i], glass:bool, ghost:bool}`.
- **Gate's own ground truth** (`verify-word-keys-core.js`): `compare()` re-implemented in the gate and asserted on every key × lock pair: exactly one key opens each lock; in Game 2 the key→lock mapping is a perfect matching; every key is a real word in the locale list; target sets preserved from the old manifest (all 8 targets per locale present); diff self-tests (was/saw → [0,2]; of/off → extra 1; off/of → missing 1; the/then → extra 1); peg balance 3/3/2; middle-length bot ≤ 50 %; Game-3 tray contains every target letter once plus ≥ 3 extras, never in spelling order; every picture exists and is colour; a sentence list of "rejected frames" from the reviewer is never used.
- **Mutations:** lock opens for a key with the right letters in the wrong order · lock opens for a key one letter longer (prefix match) · a key one letter shorter accepted · case makes "The" ≠ "the" · de "Hund" opens "und" · accents ignored (pt é = e) · glass shown at miss 1 · Game 2 two keys open one lock · right key always on the middle peg · padlock width depends on word length (length leak).
- **Pictures to view:** animals (cat, pig, dog), farm-animals/duck, space/moon, fruits/apple, around-the-house (plate, door, rug — seen), vehicles/bus, accessories (hat, sock — seen), bakery/cake, breakfast/pancake, clothing/coat, christmas/candle, activities/playground (check it reads as a park, not a single child), christmas/present, beach/sun (seen), plus a whale (animals/whale or beach/whale — seen).
- **Risks:** sentence authoring is the content risk (one key per lock in 11 languages) — the reviewer pass reads every key in every sentence; the gate can only enforce the structure.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — keys, a padlock that pops open, a jingling ring, and a machine that cuts keys.
2. **Would a teacher put it on the board?** Yes — "was and saw have the same teeth in different places" is the exact lesson, shown by a lock; and the Key-ring game makes both look-alikes right somewhere, so children must truly read.
3. **Would a parent trust it?** Yes — real sentences in the child's language, playable with the sound off, feedback that shows the letters rather than judging.
4. **The invention:** each little word is a key whose letters are its teeth — a sentence's lock only turns for exactly the right letters in exactly the right order.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Every Game 1 and Game 2 sentence read with every key: "The cat is ___ the bed" let `not` turn too ("The cat is not the bed" is true English) → "The cat sat ___ the bed"; recorded in the rejected list.
- Distinct-from adds Row 57 The Sticky Name Tag (picture judges a word left to right vs a sentence choosing among picture-less look-alikes).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
