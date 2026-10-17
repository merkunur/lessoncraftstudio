# Row 62 — Bingo's Picture Card (RF.K.3.d)

## 0. Identity
- **id** `bingo-word-hunt.read-match.rf-k-3-d` (KEPT; en + fr slugs, titles, intros frozen) · grade K · Common Core **RF.K.3.d** (distinguish similarly spelled words by the sounds of the letters that differ) · strand Reading: Foundational Skills.
- **files (key `picture-bingo`)** `mini tools/picture-bingo-core.js`, `picture-bingo-activity.js`, `picture-bingo-activity.html`; the manifest row stays in `bingo-word-hunt-activities.json`, `tool` repointed. New metadata for de es it pt nl sv da no fi.
- **worksheets it covers:** K-225 Match Word to Picture · K-324 Picture Word Cards · K-347 Picture Cards and Word Cards: Matching Pairs · G1-306 Word Families: Read and Write · G1-330 Word Families: Read and Circle · G1-332 Word Family Carpet: Read and Color · G1-333 Word Families with Blends · G1-331 Join the Syllables and Write the Word · G1-334 Read the Syllables, Find the Picture. **Shared with Row 57 The Sticky Name Tag (batch 09), which maps the same nine sheets** — so nothing here repeats 57's mechanics: 57 owns the memory-pairs game and the woven family carpet; this row carries K-347 by its own "You call" game (§6 Level 5) and G1-332 by the card's family lines, and uses different syllable words.
- **what the old activity did:** a picture and three words that differ by one letter (cat/cot/cut); tap the one that names the picture; 8 rounds en + 8 fr; "Bingo the beagle" was a hand-drawn SVG. **Kept:** the name Bingo, every en and fr look-alike triple (they become the squares of the cards), the bands (1 → 3). **Changed because it was wrong:** the hand-drawn beagle is replaced by the library dog (`animals/dog`); three-choice taps were a 33 % guess with instant retry — now the child reads a whole card of look-alikes for every call, and a wrong square shows WHICH letter made it a different word.

## 1. The pitch
"Bingo calls a picture and you find its word on your card of look-alikes — every word you read right flips over and becomes its picture, until your card turns into a picture card and shouts BINGO."

## 2. Why a child will want it again (the fun)
- **It is bingo.** Children know the game and love it. Bingo (the library dog) sits in a little caller's booth beside a card stand; each call slides a picture card up out of the stand with a *shff*. The child's card is a 3 × 3 (or 4 × 3) grid of words that look almost the same.
- **Words turn into pictures.** Slide a chip onto the word you think names the call and press Check: the square flips over like a tile (300 ms, 3D) and on its back is the picture itself. Over a card, words become pictures one by one — reading made visible.
- **BINGO lines.** When three flipped squares make a row, column or diagonal, a light races along the line, the dog hops in the booth and a "BINGO!" banner of the card's own pictures does a little wave. Lines are designed into every card so each card makes at least one BINGO.
- **The leftovers.** At the end, the squares that were never called are still words — "cot", "cut", "hit". The child reads them as a final, gentle joke: these words had no picture on the call cards. Tapping a leftover tilts it with a shrug.
- **Family lines.** On a word-family card every row is one family (-at, -an, -ug) — so a BINGO line is a family, and when it lights the shared ending glows along the whole row: the G1-332 "read and colour" carpet is coloured by reading, one row at a time. (No colour-coded frames: Row 57 owns the woven carpet.)
- **You call (Level 5).** The tables turn: Bingo has the picture card and the child holds the word cards. Bingo needs one picture for his BINGO; the child reads three look-alike word cards and calls one — and Bingo, who reads exactly what he is given, covers whatever that word names. Call *cap* when he needs *cat* and he cheerfully covers the cap; call *cot* and he searches his card, finds nothing, and shrugs. Children love being the caller, and love watching the dog take them literally.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** read words that differ by one letter (most often the vowel) and match each to its picture (RF.K.3.d, K-225, K-324, K-347); read word-family words (same rime, new onset — G1-306, G1-330, G1-332), words with blends (G1-333), and syllabified words, joining the syllables (G1-331, G1-334).
- **Misconception 1 — first-letter guessing.** On every card the words that share a first letter sit together (cat, cot, cut); a first-letter guess lands on a look-alike two times in three.
- **Misconception 2 — vowel blur** (a/o/u, i/e). The miss help lights exactly the letter that differs, which is nearly always the vowel, so the child learns WHERE to look.
- **Misconception 3 — "same ending, same word"** (word families). On a family card, cat/hat/bat share -at; only the onset tells them apart, and the miss shows the onset.
- **Misconception 4 — blends read as one sound or with a vowel inserted** (*f-rog*, *fu-rog*). Blend cards pair crab/crib and flag/flat, so both blend letters AND the vowel must be read.
- **Misconception 5 — syllables read as separate words.** Syllable cards show "rab bit" with a gap; on a right call the two halves slide together into "rabbit" before flipping — joining is the reward.
- **How the material pushes back:** only the word that names the call flips into that picture; a wrong chip slides off, and the letter that made it a different word lights up.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504), bubble column right (176). Stacked below 700.

**At 704 px** (stage 504 × 480):
- **The caller's booth** (top, 504 × 150): a drawn booth frame (ink, 3 px, cream panel) with **Bingo** — `animals/dog` **96 px** — on the left, and the **call stand** in the middle: the called picture **136 px** on a white card that slides up from a slot; a small stack of used call cards (thumbnails 36 px, fanned) on the right shows how many calls are done.
- **The card** (y = 168, 504 × 260): a 3 × 3 grid of squares **156 × 82** (8 px gaps) — cream, 3 px ink rim, radius 12, the word in Baloo 2 **38 px** ink (syllable cards: the two syllables with a 14 px gap). Word-family carpet: 4 × 3 grid of **118 × 82** (word 32 px). Flipped squares show the picture **72 px** with the word small below (16 px).
- **The chip tray** (bottom right): a stack of round chips (teal discs 44 px with an ink rim); the next chip floats on top.
- **Task line** above the stage (≤ 24 px). Bubble in the right column; Check under it.

**At 360 px** (stacked): booth 360 × 112 (dog 64 px, call picture **96 px**, used-card stack hidden behind a small count of thumbnails); card 3 × 3 of **112 × 70** (word 30 px; syllables 26 px), carpet 4 × 3 → **3 × 4** of 112 × 64 (word 26 px); flipped squares at 360 show the picture at **64 px** (the floor) and drop the small word under it (the word was just read); chips 44 px beside Check; Check bottom ≤ 700 at 360 × 740. **At 320 × 640:** squares 100 × 64 (word 26 px), call picture 88 px, Check ≤ 630.

Words on the apparatus: only the content words. The "BINGO!" banner is made of the card's own pictures plus the word "BINGO" — the one display word, the game's name, authored per locale (de "BINGO!", fr "BINGO !").

## 5. The hand
- **A call:** at the start of each call the stand's card slides up (300 ms) with the picture; tapping the call picture speaks its name (TTS where available).
- **Place a chip:** drag the top chip onto a square (the square brightens under it), or tap a square — the chip hops onto it (180 ms). Tap a chipped square to take the chip back; drag it to another square to move it. One chip per call.
- **Check:** right → the chip pops off, the square flips (300 ms) to the call's picture, a bright *ding*; the call card drops onto the used stack. Wrong → §7.
- **Syllable squares:** on a right Check the two syllables slide together (160 ms, a *click*) before the flip.
- **Lines:** each completed line triggers the line light (400 ms) and the dog's hop (two 12 px bounces).
- **You call:** drag one of the three word cards (or tap it) into the call slot on Bingo's booth (200 ms); Bingo's eyes run along his card (300 ms) and his paw drops a chip on the picture the word names (or he shrugs, 400 ms); the card returns to the child's hand on a miss. Taking a card back before Check is free.
- **Free play:** after a card is finished, tapping any flipped square flips it back to its word and again to its picture; tapping a leftover word makes it shrug.

## 6. The rounds
One round = one **call** (one picture to find on the card). A card = 6–10 calls. Each level has ≥ 7 calls per pass; order-only reshuffle of calls per pass; the card layout is fixed per card (lines designed in) but cards alternate per pass.

**Level 1 — Look-alikes (RF.K.3.d, K-225), 3 cards, 11 calls, EN** (the old triples). Called words in **bold**; the rest are never called (leftovers):
- Card 1: **cat** · cot · hit / cut · **hat** · cop / hut · **cap** · **cup** — calls cat (animals/cat), hat (accessories/hat), cap (accessories/cap), cup (kitchen-tools/cup). Diagonal cat–hat–cup = BINGO.
- Card 2: dig · **dog** · dug / peg · **pig** · pug / bad · **bed** · bid — calls dog (animals/dog), pig (animals/pig), bed (around-the-house/bed). Middle column = BINGO.
- Card 3: nut · **net** · not / pin · **pan** · **pen** / fin · **fan** · fun — calls net (beach/net), pan (around-the-house/pan, a frying pan), pen (around-the-house/pen), fan (around-the-house/fan). Middle column = BINGO.
The old triples' `hot` and `bud` are labels of library pictures (weather/hot, spring/bud), and a leftover may never be a picture word — so card 1 takes `hut` and card 2 takes `bid` (critic; both real words, neither a library label). `pug` stays a leftover (no library pug).

**Level 2 — Word families (G1-306, G1-330, G1-332), 2 family cards, 17 calls, EN.**
- Carpet A (4 × 3): **cat** · **hat** · **bat** · mat / **fan** · **van** · **pan** · **can** / **mug** · **jug** · **rug** · hug — 10 calls; one family per row (-at, -an, -ug), the middle row is the BINGO line. `bat` = animals/bat — on a family card the animal is the right meaning (the call shows the animal).
- Carpet B (3 × 3): **hen** · **pen** · ten / **pig** · **fig** · wig / **dog** · **log** · jog — 7 calls (farm-animals/hen, around-the-house/pen, animals/pig, fruits/fig, animals/dog, camping/log); families -en, -ig, -og; the right column (ten, wig, jog) are the leftovers.

**Level 3 — Blends (G1-333), 1 card, 7 calls, EN.** **frog** · **flag** · flat / **crab** · **crib** · slid / **drum** · **sled** · **clock** — camping/frog, 4th-of-july/flag, beach/crab, furniture/crib, music/drum, winter/sled, around-the-house/clock. crab/crib and flag/flat force both the blend and the vowel to be read.

**Level 4 — Syllables (G1-331, G1-334), 1 card, 7 calls, EN.** Only words whose split is **TeX-agreed** in `approved-words-en.json` (`sources_agreed` includes TeX — checked 2026-10-17; rule-only splits such as tig·er, lem·on, ro·bot are refused), and none of Row 57's syllable words (pencil, carrot, basket, monkey, muffin…): **rab bit** · **pan da** · **mit ten** / **mel on** · **pil low** · **win dow** / **let tuce** · pan bit · win low — calls animals/rabbit, animals/panda, accessories/mitten, at-the-supermarket/melon (a slice — acceptable as melon), around-the-house/pillow (seen; never beside the cushion), around-the-house/window (seen), vegetables/lettuce. The two leftovers are syllable swaps (pan·bit, win·low) — non-words built from the card's own syllables, so a child who reads only one syllable lands on them. Top row (rabbit–panda–mitten) = BINGO.

**Level 5 — You call (K-324, K-347), 8 rounds, EN.** The roles swap: Bingo holds a 3 × 3 PICTURE card (pictures 72 px) with two squares of one line already chipped and the third square — the one he needs — ringed with a dashed teal ring. The child holds three WORD cards (look-alikes) and drags one into Bingo's call slot. Bingo reads it literally and covers the picture that word names: the needed one (his BINGO — he jumps), a different picture on his card (the decoy, covered — no BINGO, and the word card's differing letter lights), or nothing at all (he searches and shrugs). Picture card and word card are matched by reading — the worksheet's "picture cards and word cards" made into a turn.

| # | Bingo needs | word cards (right first here; dealt in balanced order) | decoy picture on his card |
|---|---|---|---|
| 1 | cat (animals/cat) | cat · cap · cot | cap (accessories/cap) |
| 2 | hat (accessories/hat) | hat · ham · hit | ham (at-the-supermarket/ham) |
| 3 | pig (animals/pig) | pig · pen · peg | pen (around-the-house/pen) |
| 4 | bed (around-the-house/bed) | bed · bag · bid | bag (at-the-supermarket/bag) |
| 5 | cup (around-the-house/cup) | cup · cap · cut | cap |
| 6 | fan (around-the-house/fan) | fan · van · fin | van (vehicles/van) |
| 7 | net (beach/net) | net · nut · not | — (two non-picture look-alikes: he shrugs at both) |
| 8 | mug (kitchen-tools/mug) | mug · jug · hug | jug (kitchen-tools/jug) |

The other six squares of each card are fillers from Level 1's called words (never a look-alike of the round's words). Exactly one word card names the needed picture; the right card's slot (left/middle/right) is balanced 3/3/2 per pass; the decoy is never in the needed line.

**Answer position.** Within each card the called squares are spread so that the right square for consecutive calls never sits in the same row twice in a row (gate checks on the reshuffled call order). Across a level, each card position is a right answer 0–3 times (no position > 25 %). Every called word sits next to at least one of its look-alikes (gate: each called square has a look-alike neighbour sharing ≥ 2 letters). Lines: card 1 diagonal, cards 2–3 a column, carpet A the middle row, carpet B a column, blends the left column (frog–crab–drum), syllables the top row. You call: the needed square's position on Bingo's card visits all nine positions across two passes.

**Order:** order-only reshuffle of the calls per pass (never the same order twice); cards alternate per pass where a level has two.

## 7. Check, the misses, the success
- **Check with no chip placed:** hint, no miss — the call picture wiggles — "Find the word for Bingo's picture and put a chip on it."
- **Miss 1:** the chip slides off the square and back to the tray; on the chosen word, the letter(s) that differ from the right word light coral (cot for cat → the o lights) · "That word says something else. Look at the coral letter and read it again."
- **Miss 2:** every square except the right word and its nearest look-alikes dims (the family of three stays bright), and in those three the differing position lights in all of them (c**a**t · c**o**t · c**u**t), so the child compares just that letter · "Only one letter is different. Which word names the picture?"
- **Miss 3 and after:** the right square's border pulses softly — the child still places the chip.
- **Syllable miss:** a wrong syllable square lights the syllable that differs (pen·**da** vs pan·**da**).
- **You-call miss 1:** Bingo covers the decoy (or shrugs); the chip on the decoy wobbles; on the called word card the letter that differs from the needed picture's name lights coral (cap for cat → the p) · "Bingo covered the {cap}. He needs the {cat}. Which card says {cat}?" — with the sound off, the dashed ring on the needed square pulses beside the lit letter. **Miss 2:** the needed picture's name appears faintly on its square (letters in the same positions as the cards) so the child can compare letter by letter · "Find the card with the same letters."
- **A new move takes the help away** (dimming and lights vanish) until the next Check.
- **Success (each call):** the square flips into the picture, *ding* · "{cat}! You read it." **Line:** the line lights, the dog hops · "BINGO! {cat}, {hat} and {cup} in a line." **Card done:** the leftovers do a shrug in turn · "Your card is full of pictures. These words were never called: {cot}, {cut}, {hit}…" (lists the leftovers). **You call:** Bingo covers the needed picture, his line lights and he jumps · "You called {cat} — BINGO for Bingo!"

## 8. Settings
1. **Card:** Look-alikes (default) · Word families · Blends · Syllables · You call — the grid at rest changes (3 × 3 words, 4 × 3 family card, syllable gaps, Bingo's picture card with the child's three word cards).
2. **Read the call:** Picture (default) · Picture and first letter — the call card shows the picture alone, or the picture with its first letter on a corner tab (support for beginning readers; the vowel must still be read). The tab is visible on the call card at rest.

## 9. Words (EN source)
- title (shell, frozen): **Bingo's Word Hunt** · instruction: "Bingo calls a picture. Find its word on your card!"
- task lines: L1–L4 "Put a chip on the word for Bingo's picture." · L5 "Bingo needs one more picture. Read your cards and call the right word!"
- hints/celebrations: §7 exactly; display word: "BINGO!".
- settings: "Card", "Look-alikes", "Word families", "Blends", "Syllables", "You call", "Read the call", "Picture", "Picture and first letter". aria: "Bingo calls: {picture name}", "Square: {word}", "Square {word} turned into {picture name}", "Line complete", "Leftover word: {word}".

**Locale traps (each locale's cards are authored natively; EN is the template):**
- **fr (slug exists):** the old triples become fr cards — **pomme** · somme · gomme / **vache** · tache · hache / **sac** · sec · suc …; calls pomme (fruits/apple), vache (farm-animals/cow), sac (at-the-supermarket/bag), chat (animals/cat), pain (at-the-supermarket/bread), lit (around-the-house/bed), pot (around-the-house/pot) — never sel: at-the-supermarket/salt carries the printed English word SALT, so it is unusable outside en, and "sel" (its fr label) may not sit on a card as a leftover either. "main" is a real picture (body-parts/hand) — if it sits on the pain card it must be CALLED too, never a leftover (the gate refuses a leftover that is a library label). fr silent letters (lit, pot, chat) are fine: the look-alike differs in a sounded letter.
- **Not every language has CVC look-alikes:** es/it/pt/fi cards use CV-CV look-alikes differing in one vowel or consonant, real words only (es **mesa** · misa · masa; **gato** · pato · gata — and since pato is a library picture (duck) it is CALLED, never a leftover; es **sol** · son · sor, where sol (beach/sun) is called and son/sor are real words that are no library label — the salt picture is out, it carries the printed word SALT), and their Syllables level is the strongest (these languages are taught by syllables: es **ma·no**, **lu·na**; it **ca·ne**, **pa·ne**; pt **ga·to**, **bo·la**; fi **ta·lo**, **ka·la**) — splits only from `approved-words-<locale>.json`, TeX-agreed where TeX exists.
- **Word families per locale:** the panel picks rimes that have ≥ 2 library pictures (de -aus: Haus? (miscellaneous/house), Maus (forest-creatures/mouse); -and: Hand; es -ato: gato, pato, plato; it -ane: cane, pane; pt -ato: gato, pato, rato; nl -at: kat; sv -at? → if a locale cannot fill a carpet with ≥ 7 called pictures, Level 2 is one 3 × 3 card with ≥ 7 calls or is hidden for that locale; the gate refuses < 7).
- **Blends per locale:** de **Fr**osch, **Kr**abbe, **Tr**ommel, **Schl**itten; es **fr**esa, **gl**obo, **tr**en; fr **cr**abe, **dr**apeau, **tr**ain; nl **kl**ok, **vl**ag, **sl**ak; sv/da/no blends only where a library picture carries one (the panel decides); fi words rarely begin with blends → fi hides Level 3.
- **Capitals:** de nouns on squares are capitalised, so a de triple is built only from words with the same capitalisation pattern — in practice three nouns that differ by one letter, such as **Maus** · Laus · **Haus** (forest-creatures/mouse and miscellaneous/house both called; Laus is a real word but never called); case must never tell the answer.
- **Accents are letters:** es/pt/fr/it accented vowels count as the differing letter (pt **pé** · pá · pó).
- **Labels:** the call's word is the `image-vocabulary.js` label in the locale (singular, no article), and must equal the square's word exactly.
- Sound off: the call picture, the coral differing letter, the dimming and the flips carry the game; TTS (picture name, the word) is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** picture calls, flips into pictures, the differing letter lit.
- **Keyboard:** arrows move a focus ring over the card; Enter places/removes the chip; Space = Check; You call: Tab through the three word cards, Enter calls.
- **aria-live:** "Bingo calls: cat." / "cot is a different word: the second letter is o." / "Cat turned into its picture. Line complete: BINGO."
- **Taps:** squares ≥ 100 × 64, chips 44 px, You-call word cards ≥ 112 × 64.
- **Pictures:** call picture 136 px at 704, 96 px at 360 (≥ 64); flipped squares 72 px / 64 px; Bingo 96 / 64 px.
- **Phone layout:** stacked; the carpet turns 3 × 4; the used-call stack collapses; Check above both folds (measured on every card).

## 11. Distinct from
- **Row 57 The Sticky Name Tag** (batch 09, same nine worksheets) — a given word is hung on one of four pictures and sticks letter by letter until the first difference; it owns memory pairs, the woven family carpet and its syllable words (pencil, carrot, basket, monkey, muffin…). Here the PICTURE is called and the child searches a whole card of look-alike words that flip into pictures, with leftovers that are never called; the family carpet is a BINGO line; the syllable card uses other words with syllable-swap leftovers; and K-347 is the "You call" turn, not memory.
- **Row 60 The Blink Camera, Row 61 The Word Keys (this batch)** — high-frequency words without pictures; here picture-nameable decodable words.
- **Premium `picture-word-wall`** (a projector word wall; tap a card to see it big) — no game, no look-alikes, no flip check.
- **Premium `blending-board`** — builds words; this game only reads them.
- **Built registry:** no bingo card; #13 Roll Book calls names for counting — not reading.

## 12. Build plan
- **Core state** `{locale, cardMode, readCall, card:{cols, rows, squares:[{word, syll?:[a,b], callId|null, family?}], lines:[[i]]}, calls:[{id, pic, word}], order:[callIdx], callIdx, chipAt:int|null, flipped:Set, misses, help, youCall?:{needed, decoy|null, hand:[word], called:word|null}}`.
- **Functions:** `placeChip(i)`, `liftChip()`, `check()` → `{ok, diffPos:[pos], family:[i]}` (diffPos computed letter by letter vs the right word; for different lengths, the extra/missing letters), `linesCompleted()` → `[line]`, `leftovers()`, `callWord(w)` → `{covered: picId|null, bingo:bool, diffPos:[pos]}` (Bingo covers the picture whose locale label EQUALS w, else nothing).
- **Gate's own ground truth** (`verify-picture-bingo-core.js`): for every card: every called square's word equals its call picture's locale label exactly; no two squares share a word; no leftover word is a library label in any theme (no uncalled picture word); each called square has a look-alike neighbour (≥ 2 shared letters, same length ± 1); at least one designed line consists only of called squares; each family card's rows derived by the gate's own rime split (one rime per row); You call: exactly one hand card equals the needed label, every decoy equals another hand card exactly, no hand card names a filler; syllable squares' splits equal the approved-words entry AND that entry lists TeX among `sources_agreed` (where the locale has TeX); diffPos self-tests (cat/cot → [1]; crab/crib → [2]; pan·da/pen·da → syllable 0); position balance (no square > 25 % of right answers per level; no same-row repeats in a call order); every picture exists and is colour; `animals/dog` is the only character art; ≥ 7 calls per level per locale or the level is hidden.
- **Mutations:** a wrong square flips into the call picture · diffPos lights the first letter always · a leftover is a picture label (e.g. `hot`, `bud`) · two calls with the same right square · a line contains a leftover (BINGO impossible) · syllables join on a wrong Check · miss 2 dims the right square · chip allowed on two squares per call · a TeX-disagreed split on the syllable card · a Row-57 syllable word on the syllable card · You call: Bingo covers the needed square for a look-alike word · You call: two word cards name the needed picture · call order identical across passes.
- **Pictures (all exist in the theme JSONs — checked 2026-10-17):** animals (cat, dog, pig, bat, rabbit, panda), accessories (hat, cap, mitten), kitchen-tools (cup, mug, jug), around-the-house (bed, pan, pen, fan, rug, clock, cup, pillow, window — seen), beach (net, crab), vehicles/van, at-the-supermarket (can, ham, bag, melon), farm-animals (hen, cow), fruits/fig, camping (log, frog — seen), 4th-of-july/flag, furniture/crib, music/drum, winter/sled, vegetables/lettuce; fr: fruits/apple, at-the-supermarket/bread, body-parts/hand (at-the-supermarket/salt refused: printed "SALT"). Still to view: animals, accessories, vegetables sheets (lettuce must read as a head of lettuce, not cabbage).
- **Risks:** thin family/blend sets in some locales (the gate hides a level under 7 calls, never pads with weak words); card layout at 320 px with 4-letter words (measure).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — it is bingo, the words flip into pictures, and every card ends in a BINGO line.
2. **Would a teacher put it on the board?** Yes — a whole card of cat/cot/cut forces reading the middle letter, the miss lights exactly that letter, and the same card mechanic carries word families, blends and syllables.
3. **Would a parent trust it?** Yes — real pictures (Bingo is now the library dog), each language's own word families and syllables, nothing timed.
4. **The invention:** a bingo card of look-alike words where every word you read right flips over into its picture — until the card becomes a picture card and the words left over are the ones never called.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 2→5 · reality 4→5
What changed:
- Batch-09 Row 57 The Sticky Name Tag maps the SAME nine worksheets and already owns memory pairs, the woven family carpet and pencil/carrot/basket/monkey/muffin: the memory-pairs level is replaced by a new bingo-native game, **You call** (the child calls a word card, Bingo covers exactly what it names — a decoy, nothing, or his BINGO), with an 8-round table; family colour frames replaced by family ROWS that are the BINGO lines; the syllable card rebuilt from TeX-agreed words 57 does not use (rabbit panda mitten melon pillow window lettuce) with swap leftovers pan·bit, win·low.
- Leftovers that were library labels (hot = weather/hot, bud = spring/bud) broke the design's own gate → hut, bid.
- at-the-supermarket/salt carries the printed word SALT → removed from fr (sel) and es (sal) cards.
- Build plan, keyboard, taps, mutations and gate updated for You call.
