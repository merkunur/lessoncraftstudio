# Row 60 — The Blink Camera (RF.K.3.c)

## 0. Identity
- **id** `choice-board.read-sight-word.rf-k-3-c` (KEPT; slugs/titles/intros frozen for en de es pt fr it nl sv da no) · grade K · Common Core **RF.K.3.c** (read common high-frequency words by sight) · strand Reading: Foundational Skills.
- **files (key `blink-camera`)** `mini tools/blink-camera-core.js`, `blink-camera-activity.js`, `blink-camera-activity.html`; the manifest row stays in `choice-board-activities.json`, `tool` repointed. New metadata for **fi** (no slug yet).
- **worksheets it covers:** K-389 Sight Word in Sentences · K-390 Sight Word Sentence (step by step) · K-392 Find the Sight Word (colour every box with the word, count them).
- **what the old activity did:** hear a word (TTS), tap it among three look-alikes; 8 words per locale (10 locales; no fi). **Kept:** every locale's 8 target words and their look-alikes (en was/saw·want·with, the/they·then·that … like/lick·line·make; de der, und, ist…; es el, la, los…), the look-alike principle. **Changed because it was wrong:** the prompt was audio only — in 6 of 11 locales TTS is unreliable, so the round was unplayable with the sound off; now the word is SHOWN for a blink, and audio is a bonus.

## 1. The pitch
"A sight word is a word you can read in a blink — so the camera shows it for one blink, and you find the word you saw among its look-alikes."

## 2. Why a child will want it again (the fun)
- **A camera with a real shutter.** A chunky toy camera sits on the stage. Tap its big button: the iris shutter (six overlapping blades, drawn geometry) spins open with a *tch*, the word glows inside the lens for a blink, and the blades spin shut with a *click*. It is the most satisfying button on the site.
- **The cards flip.** While the shutter is open the four word cards below lie face down; when it closes they flip up together (*flap-flap-flap-flap*, 60 ms apart). The child finds the word they "photographed".
- **The photo develops.** When the child is right, an instant photo slides out of the bottom of the camera (*whirr*), its picture of the word fades in from grey to sharp, and the child drags it into a **word album** along the side — eight photo frames per pass. Tapping a photo in the album re-flashes that word for fun.
- **The camera can be set** — a little three-dot dial on the camera body sets how long the blink is (long · medium · short). Children who are sure of a word turn the dial down themselves to "beat the camera" — a challenge they choose, never a timer on their answer.
- **Hunt mode:** the camera flashes the word, then a page of word tiles or a tiny story appears and the child "photographs" every copy by tapping it — each tap drops a camera-frame bracket around the word with a *snap*.
- No timer on answering, no score, streak or lives.

## 3. The skill and the misconception
- **Skill:** recognise a high-frequency word instantly and exactly, alone (RF.K.3.c), among look-alikes (K-392), and in sentences (K-389, K-390).
- **Misconception 1 — first-letter guessing** (the → they/then/that; was → want/with). Every look-alike set shares the first letter or the letters with the target, so a glance at the first letter is never enough; at miss 2 the developed photo sits next to the cards and the differing letters glow.
- **Misconception 2 — order blindness** (was/saw, on/no). Reversed-letter look-alikes are in the sets; the photo comparison shows the letters in order.
- **Misconception 3 — "The" is a different word from "the".** In the story mode, sentence-initial capitals count; a missed "The" is shown at miss 1 as an unbracketed copy that glows.
- **Misconception 4 — finding the word inside a longer word** (the in *they*, an in *and*). Tiles and story tokens are whole words; bracketing "they" when hunting "the" is a miss, and the bracket shows the extra letter outside its frame.
- **How the material pushes back:** the shutter gives one look; the cards are hidden while it is open, so matching letter by letter is impossible — the child must hold the WHOLE word. Help widens the look (a longer blink, then the developed photo), never tells.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504), bubble column right (176). Stacked below 700.

**At 704 px** (stage 504 × 470):
- **The camera** (top centre, 300 × 190): a rounded body (teal `#146B5E`, 3 px ink outline, radius 22), a viewfinder bump, the **shutter button** (coral disc 64 px, top right of the body), the **lens** (ink ring 160 px) holding the **iris** (6 blades, cream/grey, 3 px ink edges) — open, the iris shows the word in Baloo 2 **56 px** on cream; the **blink dial** (a 44 px knob with three dots: long · medium · short) on the left of the body; a photo slot (ink line 120 px) along the bottom edge.
- **The word cards** (y = 230): four cards **108 × 84** in one row (16 px gaps), cream, 3 px ink rim, word in Baloo 2 **40 px**; face-down they show a teal back with a small camera-lens circle.
- **The album** (bubble column, top): 8 small photo frames 56 × 44 in two columns; each holds a finished word (Baloo 2 18 px).
- **Hunt page (Find every one):** replaces the cards: a 4 × 3 grid of word tiles **108 × 64** (word 32 px).
- **Story (In the story):** replaces the cards: one library picture **120 px** (the story's subject) left, and 2–3 sentences right (Nunito 26 px, line height 1.6), each word a tappable token.
- **Count strip** (Find every one, after the hunt): number tiles 1–6, 56 × 56.
- **Task line** above (≤ 24 px). Bubble under the album; Check under it.

**At 360 px** (stacked): camera 240 × 152 (lens 124, word 44 px, button 56 px, dial 44 px); cards 2 × 2 of **150 × 72** (word 34 px); hunt grid 3 × 4 tiles **104 × 56** (word 26 px); story: picture **88 px** above the sentences (Nunito 22 px); album collapses to a strip of 8 dots that fill (tap → the album sheet); Check bottom ≤ 700 at 360 × 740. **At 320 × 640:** cards 2 × 2 of 136 × 64, hunt tiles 94 × 52 (word 24 px), Check ≤ 630.

Words on the apparatus: only the content words; the dial has dots, not labels.

## 5. The hand
- **Snap (tap the shutter button):** the cards flip face-down (if up), the iris opens (180 ms spin), the word shows for the blink (long 2.0 s · medium 1.2 s · short 0.7 s, set on the dial), the iris closes (180 ms), the cards flip up. The button can be pressed again at any time to re-flash (the cards hide again) — re-flashing is never counted against the child.
- **Choose:** tap a card — it lifts and gets a coral outline; tap another to change. Check commits.
- **Hunt:** tap a tile or a story word to bracket it (four camera corners close around it, 120 ms, *snap*); tap again to remove the bracket. Check; then (Find every one) tap a number tile for the count, Check.
- **Dial:** turn by tap (cycles long → medium → short) — the dot lights; the setting persists for the visit.
- **Album:** drag the developed photo into the album (or it flies there by itself after 1.5 s); tap any album photo to re-flash it in the lens (free play).
- **TTS bonus:** where a voice exists, the word is spoken as the shutter opens.

## 6. The rounds
One round = one word. Pass = 8 rounds; order-only reshuffle per pass.

**Level 1 — Snap and find (RF.K.3.c).** The old rounds, four cards = target + its three look-alikes. **EN:** was (saw, want, with) · the (they, then, that) · of (off, for, on) · you (your, yes, use) · see (she, say, so) · and (an, end, said) · go (got, do, so) · like (lick, line, make). Every locale keeps its old 8 (de der/dem·den·wer … auf/Lauf·Kauf·Raum; es el … su; pt com … é; fr les … pour; it il … sono; nl de … kan; sv är … inte; da og … var; no det … på), re-checked by the panel; **fi** is new (§9).

**Level 2 — Find every one (K-392), 8 rounds.** After the flash, a grid of 12 tiles: the target 3, 4 or 5 times, the rest its three look-alikes. EN copies per round: was 4 · the 5 · of 3 · you 4 · see 3 · and 5 · go 4 · like 3 (counts balanced 3/4/5 = 3/3/2). Then the count step: "How many did you find?" tiles 1–6; one right count (= copies).

**Level 3 — In the story (K-389, K-390), 8 rounds.** One picture + 2–3 short sentences; the target appears 2 or 3 times (including once sentence-initial with a capital in 4 of 8 stories); each story also contains at least one look-alike. EN:
1. **was** · animals/cat — "The cat **was** on the bed. It **was** hot. I saw the cat." (2; saw)
2. **the** · animals/dog — "**The** dog ran to **the** bus. Then **the** dog sat." (3; then)
3. **of** · fruits/apple — "I have a box **of** apples. One **of** them is red. I bit off a bit." (2; off)
4. **you** · toys/ball — "Can **you** see the ball? **You** can kick it. Is it your ball?" (2; your)
5. **see** · beach/sun — "I **see** the sun. **See** the sun go down! She can see it too." (3; she)
6. **and** · farm-animals/hen — "The hen **and** the duck sat. A hen **and** a duck can nap. An egg is in a nest." (2; an)
7. **go** · vehicles/bus — "**Go**, bus, **go**! We got on the bus. Do we **go** to the park?" (3; got, do)
8. **like** · bakery/cupcake — "I **like** cake. Do you **like** cake? I lick the top." (2; lick)
(Counted copies include "See"/"Go"/"The"/"You" with capitals.) **K-390 "step by step"** is the story's built-in path: flash → bracket the word → read the sentence (TTS reads it as a bonus) → the round's photo develops; nothing to write (the printable keeps the writing).

**Answer position.** Level 1: the target card's slot is balanced 2/2/2/2 over a pass; the three look-alikes are dealt in rotating order (gate: no slot > 30 % target over two passes; a bot "always the card that shares the most letters with the others" scores ≤ 3/8, measured). Level 2: copy positions are dealt by a fixed spread table (each of the 12 slots holds a copy 2–4 times per pass; no row/column holds all copies). Level 3: target positions vary within sentences (initial, middle, final) — gate: each story has ≥ 2 different positions.

**Order:** order-only reshuffle per pass; Level 2 grids re-dealt by the spread table each pass.

## 7. Check, the misses, the success
- **Check with nothing chosen / nothing bracketed:** hint, no miss — the shutter button glows — "Snap the camera, then find the word you saw."
- **Miss 1 (Level 1):** the chosen card shakes once and flips face-down; the camera re-flashes the word by itself at the next-longer blink (short → medium → long → long) · "Look again. Read every letter."
- **Miss 2 (Level 1):** the photo develops and slides out beside the cards, staying visible; on the child's chosen card, every letter that differs from the photo glows coral (position by position; an extra letter glows outside a dashed end) · "Look at the photo. Which card has the same letters, in the same order?"
- **Miss 1 (hunts):** brackets on look-alikes fall off (each drops with a small tumble and its differing letter glows for a moment); copies still unbracketed stay unmarked · "Some brackets were on look-alikes. There are {more} copies to find." (the word "more" only when copies are missing).
- **Miss 2 (hunts):** the developed photo is pinned in the corner of the page and the unbracketed copies get a faint dashed frame · "Find the words with the dashed frames. Do they match the photo?"
- **Count miss:** the brackets light one by one in reading order with small numerals 1, 2, 3 … (count shown by the apparatus) · "Count the brackets."
- **A new move takes the help away** (glows and dashed frames vanish) until the next Check.
- **Success:** the photo develops with a *whirr*, the word sharpens on it, and it flies into the album frame; the right card (or every bracket) gives a soft gold flash. · L1 "{was} — you read it in a blink!" · L2 "{4} copies of {was}. Every one found!" · L3 "You found {was} {2} times in the story."
- **End of pass:** the album's eight photos flash in a ripple and the camera "takes a group picture" — all eight words appear together in the lens for a moment.

## 8. Settings
1. **Game:** Snap and find (default) · Find every one · In the story — the board at rest shows four face-down cards, a face-down grid, or the story frame.
2. **Blink:** Long · Medium (default) · Short — the dial's lit dot on the camera body changes at rest.

## 9. Words (EN source)
- title (shell, frozen): **Read Common Sight Words** · instruction: "Snap the camera. The word shows for one blink — find it!"
- task lines: L1 "Snap the camera, then tap the word you saw." · L2 "Snap the camera, then find every copy of the word." · L3 "Snap the camera, then find the word in the story."
- count prompt: "How many did you find?"
- hints/celebrations: §7 exactly; end of pass: "Your album is full: {8} words you can read in a blink!"
- settings: "Game", "Snap and find", "Find every one", "In the story", "Blink", "Long", "Medium", "Short". aria: "Camera button", "Shutter open: {word}", "Card {n}: {word}", "Bracketed", "Photo of {word}".

**Locale traps:**
- **fi (new):** Finnish spelling is transparent, so "sight words" are framed as **quick words** (the most common little words read in a blink). Starting set for the panel (8 targets, every look-alike a real Finnish word): **ja** (jo, jaa, ne) · **on** (en, oli, ovi) · **ei** (en, eli, oi) · **se** (ne, sen, me) · **hän** (hana, häntä, hai) · **mutta** (muta, mitta, matto) · **kun** (kuu, kuin, kana) · **tämä** (tuo, tämän, nämä). The panel may swap any rare look-alike for a commoner one; the gate refuses a distractor not on the panel's real-word list.
- **Capitals:** de nouns in look-alike sets are capitalised (ist / Ast / Mist), which is a real visible difference and allowed; in the stories sentence-initial capitals count as copies in every locale; de "Die/die" counts; the gate compares case-insensitively except where the capital is part of the word (de nouns).
- **Words inside words:** fr il/fil/lit, it la/ala, sv på/pål, da er/der — whole-word tokens only; elided forms (fr l', d', qu'; it l', un') are tokens of their own and never count as the target "le"/"la".
- **Accents are letters:** pt é ≠ e, não ≠ nao, você ≠ voce; es él vs el is NOT used in K stories (one form only per story); sv är/år/ar, da/no på vs pa: accents are part of the word and the "differing letter" glow treats them as letters.
- **Story grammar per locale:** stories are authored per locale with the locale's target (es "el": "El gato está en la cama. **El** sol…"), never translated from EN; each story uses only the locale's own high-frequency words plus one picture noun.
- **Look-alike honesty:** every distractor is a real word in that locale (the old sets are re-checked: e.g. nl "eed", "veen" are real but rare — the panel may swap rare words for commoner look-alikes).
- Sound off: the blink is visual; audio (the word spoken on the flash, the sentence read) is a bonus only.

## 10. Sound off, access, phones
- **Silent legibility:** the flash, the face-down/face-up cards, the developed photo, the glowing differing letters and the brackets.
- **Keyboard:** Space or Enter on the camera button snaps; Tab/arrows move through cards or tiles; Enter chooses/brackets; D cycles the dial; Check by Enter on Check.
- **Accessibility of the blink:** the Blink setting's Long (2.0 s) is the default for screen-reader users; with a screen reader active the word is also announced in aria-live while the shutter is open, and the cards stay hidden for the same time. (The camera never hides the word from a child who needs more time: re-flash is unlimited.)
- **Taps:** button 56–64 px, cards ≥ 136 × 64, tiles ≥ 94 × 52, story tokens padded to ≥ 44 px tall.
- **Pictures:** the story picture 120 px at 704, 88 px at 360 (≥ 64 px).
- **Phone layout:** stacked; cards in 2 × 2; the album as a dot strip; Check above both folds (measured in all three games).

## 11. Distinct from
- **Row 61 The Word Keys (this batch, same words)** — there the word is NEVER shown: a sentence's meaning chooses it and the lock checks its letter order; here the word is shown for one blink and recognised.
- **Premium `heart-words`** (map a word sound by sound, mark the heart part) — no shutter, no recognition race against nothing; this design never maps sounds.
- **New 230 The Search Lens / New 229 The Blink Viewer** (other batches) — a lens that frosts searched areas, a lightbox that lays one picture over another; here a camera shows a whole WORD for one glimpse and brackets whole word tokens.
- **Batch 09 (Rows 54–57, New 215, 216)** — magnets that blend, lids that pop on matching sounds, a flip card for sound swaps, a name tag that sticks letter by letter, a bead rail for syllables, a keystone arch for vowels: none hides the prompt word or trains whole-word recognition; Row 57's tag is read left to right by design, the opposite of a one-glimpse read.
- **Built registry:** no camera or flash; #12 Peek Window peeks at a group for counting — a window you open, not a shutter that closes on its own.

## 12. Build plan
- **Core state** `{locale, game, blink, round:{target, lookalikes:[w], cards?:[w], grid?:[w], story?:{pic, sentences:[[token]]}, copies:int}, shutterOpen:bool, cardsUp:bool, chosen:int|null, brackets:Set, countPick:int|null, misses, help, album:[w]}`.
- **Functions:** `snap()` (opens for `blinkMs`, then `cardsUp=true`), `choose(i)`, `toggleBracket(i)`, `pickCount(n)`, `check()` → `{ok, wrongBrackets:[i], missing:[i], countOk, diffLetters:[{card, pos}]}`, `blinkFor(misses)` (re-flash ladder), `diff(a, b)` (letter-by-letter, accents as letters, extra/missing letters marked).
- **Gate's own ground truth** (`verify-blink-camera-core.js`): every look-alike is ≠ target (case-insensitive except de nouns) and shares ≥ 1 letter with it; each level-2 grid holds exactly `copies` tokens equal to the target and the rest are look-alikes; each story's whole-word token count of the target (case-insensitive, elisions excluded) equals the round's `copies`, ≥ 2 positions, ≥ 1 look-alike present; slot balance (L1 2/2/2/2; no slot > 30 % over two passes); the bot "most-shared-letters" ≤ 3/8; counts in L2 cover 3, 4 and 5; fi targets present and every fi distractor in the panel's real-word list; `diff()` self-test (was/saw → 2 glows; the/then → 1 extra).
- **Mutations:** cards visible while the shutter is open · re-flash counted as a miss · miss 1 shows the photo · L1 target always slot 1 · story count ignores capitals ("The") · "they" accepted as "the" · fr "l'" counted as "le" · count step accepts copies ± 1 · glows kept after a new move · album photo appears on a miss.
- **Pictures to view:** animals/cat, animals/dog, fruits/apple, toys/ball, beach/sun (seen), farm-animals/hen, vehicles/bus, bakery/cupcake (or desserts-and-sweets/cupcake) — and every locale's story picture.
- **Risks:** a blink that is too short for some children — mitigated by Long default for assistive tech, unlimited re-flash and the dial; the operator's no-timer rule is respected because nothing ever runs out on the child's answer.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a camera button with a spinning shutter, cards that flip, a photo that develops into an album.
2. **Would a teacher put it on the board?** Yes — it is flash-card practice done right: one look, the whole word, look-alikes that punish first-letter guessing, and the same words found again in sentences.
3. **Would a parent trust it?** Yes — the child's own language's real high-frequency words, playable with the sound off, nothing timed against the child.
4. **The invention:** a camera that shows the word for one blink — you read it in a blink, then find it among its look-alikes.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- Every story count re-checked by hand (was 2, the 3, of 2, you 2, see 3, and 2, go 3, like 2) and the Level-2 copy counts (3/3/2) — all right.
- Cross-reference fixed (New 229 is The Blink Viewer) and the batch-09 overlap check written in: no sibling hides the word or trains one-glimpse recognition; no duplicated invention to remove.
