# New 256 — The Instruction Paintbox → THE SENTENCE THAT READS YOUR PICTURE BACK (RF.1.4.a)

## 0. Identity
- **id** `instruction-paintbox.play.rf-1-4-a` · grade 1 · CCSS RF.1.4.a ("read grade-level text with purpose and understanding") · strand Reading: Foundational Skills · key `instruction-paintbox` → own files `instruction-paintbox-core.js`, `instruction-paintbox-activity.js`, `instruction-paintbox-activity.html`, `instruction-paintbox-activities.json`. Stage title (EN): **"The Instruction Paintbox"**.
- **Worksheets covered (12)** — every sentence the child reads comes from the SAME native-reviewed bank the worksheet prints (cited per level):
  - **Level 1 "Colour"** ← G1-242 Read and Color, G1-251 Four Sentences, G1-411 Stop at the Number (bank: `scripts/worksheet-gen/data/b2/sentences.js` → `frames` c1–c4, `kind:'color'`; colour words + `avoidNatural` + `CONFUSABLES` from `lib/read-and-color.js`) + one **Draw** round per pass ← G1-342 Read and Draw (bank: `data/b3/instructions.js` → `draw`, e.g. "Draw {n} {pl} in the box.").
  - **Level 2 "Two sentences"** ← G1-409 Two Sentences, G1-252 A Busy Page, G1-410 All Mixed Up (two b2 colour sentences, two colours, one big mixed row).
  - **Level 3 "Two steps"** ← G1-339 Two-Step Instructions, G1-338 Read and Circle (bank: `data/b3/instructions.js` → `verbs` circle `Circle {obj}.` / cross `Cross out {all}.`, `objForms` `unique`/`all`/`ord`, `fixed` first/last/between, joined by the bank's `and` literal exactly as G1-308's `steps:2` composer does: clause 1 minus its full stop + " {and} " + clause 2 with its first letter lowered) + two **Draw-two** rounds ← G1-342 (`draw2`: "Draw {n} {pl} and {n2} {pl2} in the box.").
  - **Level 4 "Places"** ← G1-308 Follow the Instructions, G1-340 First, Second, Between (b3 `fixed.ordPic`, `fixed.between/rightof/leftof`, `objForms.ord`; a flag at the left, as on the sheet).
  - **Check: "True or false"** ← G1-341 Read and Check (b3 `truth.frames`: "There are {n} {pl} in the row.", "…more than…", "…fewer than…", "The last picture is {obj}.", "The second picture is {obj}.", "The picture right after {obj} is {obj2}." · stamps from `truth.yes/no`).
- **Number words follow the bank:** b2 colour frames print the numeral (the G1-242 gate requires the digit); b3 reading faces (draw, truth) print the number WORD where the locale's `numbers` map exists (en "three", de, es, it, nl, da, no, fi) and the numeral where it does not (fr, pt, sv). Colour frames are plural-only (`sentence()` throws at n < 2), so colour counts are 2–5.
- **Nouns**: only the 13 nouns every locale's b3 `objForms` carries reviewed (apple, banana, pig, cow, cat, dog, goat, horse, ball, car, boat, bicycle, bee — and duck is EXCLUDED: sv/da/no "duck" is a duckling and da *anden* also means "the second", G1-308's own per-locale refusal). The gate refuses any noun without a reviewed form in that locale (fi partitive via b2 `nounForms`).
- New instrument; nothing to keep.

## 1. The pitch
"Do what the sentence says with the brush and the stamps — then press Check and the sentence reads your picture back, word by word: every word that is true lights up, and the first word that isn't stops the reading and points at what you did."

## 2. Why a child will want it again
- **A real paintbox.** A row of fat paint pots (swatch + a texture, no words), a chunky brush, a sponge, and two rubber stamps (a ring and a cross). Dip → the brush tip takes the colour with a "blop"; tap a picture → **the picture itself turns that colour**: the picture is desaturated (`filter: grayscale(1)` on that one image) and a paint layer masked to its own silhouette (CSS `mask-image` = the library webp's alpha) is laid over it with `mix-blend-mode: multiply`, exactly like colouring a black-and-white drawing: white areas take the full paint colour, the ink lines stay dark, the shading stays — a black-and-white cow really becomes a purple cow (a plain `color` blend would leave white and black areas unchanged, which is most of a cow or a football) — flooding outward from the tap point (240 ms, wet shine). The pot's texture rides in the same mask at 25 % so colour-blind readers see it too.
- **The reading bar.** On Check, a little brass slider rides along under the sentence like a finger reading. As it passes each word, that word is *tested on the picture row* and lights: "3" counts ticks under the painted pictures (1… 2… 3), "purple" sends a shimmer from the word to each purple picture, "cows" makes the painted cows wiggle, "all" checks every dog in turn.
- **Honest, funny pushback.** Paint a 4th cow and, when the bar reaches "3", that 4th cow's paint drips off in three drops. Paint a horse and when the bar reaches "cows" the horse shakes the paint off like a wet dog. Do only the first half of a two-step sentence and the bar slides into the second half and finds nothing — the second verb's word stays dark and taps its foot.
- **The earned show.** When the bar reaches the full stop with every word lit, the whole sentence turns gold, the marked pictures do a little jump in reading order, and the brush taps the full stop like a conductor's baton.
- **Free play:** between rounds the child can paint a spare "test card" picture beside the pots (any colour, wiped next round) and squeeze the sponge (bubbles).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** read a short instruction to the end and carry out exactly what it says — how many, which colour, which thing, which place, both steps (RF.1.4.a, purpose and understanding); judge whether a sentence is true of a picture row (G1-341).
- **Misconception 1 — ignores the number** (colours all the cows). In colour rounds the row always holds the named thing **count + 2** times (G1-411's "more pictures than the number" rule, strengthened), so "all of them" is always wrong — and the extra paint drips off when the bar reads the number.
- **Misconception 2 — ignores the colour word** (favourite colour, or the thing's natural colour). The colour is never the thing's natural colour (`avoidNatural`, `NATURAL_COLOR` — no red apples, no yellow bananas, no pink pigs), so guessing from the world never helps.
- **Misconception 3 — stops after the first step** (G1-339). Step order varies (circle-first 4, cross-first 3), so "do the first verb" succeeds 0 times; the dark second verb is visible.
- **Misconception 4 — "all" vs a number, "the second cow" vs "the second picture"** (G1-338/340). *the second cow* counts only cows from the flag; the bar's hop-dots land on cows only, so counting pictures lands on the wrong one.
- **Misconception 5 — counts from the wrong end** (G1-340). The flag is always at the left; places are counted from it.
- **The material pushes back** through the reading bar: the sentence's own words test the row, in reading order. No text says "wrong".

## 4. The stage
Full-width stage (no split): the sentence on top, the row in the middle, the paintbox at the bottom; the hint bubble appears under the row.

**At 704 px:**
- **The sentence card** (top, 640 × 84 px, cream with a ruled line): the instruction in 28 px Nunito (two-step and two-sentence cards may wrap to 2 lines; the gate measures ≤ 2 lines at 704 and ≤ 3 at 360 in every locale). Long-press a word → TTS of the sentence where a voice exists. The brass **reading bar** sits on the ruled line at the sentence's left.
- **The picture row:**
  - Level 1 and Level 3: 8 pictures in 2 rows of 4, tile 120 × 120 px with the library picture at 100 × 100, 10 px gaps. Level 3 rows carry the flag (drawn geometry, 28 px) left of tile 1 because *first/last/the second X* are counted from it (G1-308).
  - Level 2: 10 pictures in 2 rows of 5, tile 112 × 112 (picture 96).
  - Level 4: 5 pictures in ONE row, tile 116 × 116 (picture 100), flag left of tile 1.
  - Draw rounds: one empty frame 400 × 220 px with a dotted floor line (holds up to 8 prints of 96 px in 2 rows); the stamp-picture shown on the tray.
- **The paintbox** (bottom, 640 × 96): 6 pots (Level 2: 8), each a 56 px round swatch + texture (red solid · blue waves · yellow dots · green diagonal stripes · orange checks · purple zigzag · brown cross-hatch · pink rings); the brush (shows the dipped colour); the **ring stamp** and **cross stamp** (Levels 3–4); the sponge (undo). Tools that a level does not use are not shown (Levels 3–4 show no pots; Levels 1–2 show no stamps).
- **Task line (EN, 22 px):** "Read the sentence to the end. Then do exactly what it says." (True/false: "Read the sentence. Is it true or false for these pictures?")

**At 360 px:** sentence card 328 × 92 px, 22 px text (≤ 3 lines). Levels 1/3: tiles 76 × 76 (picture 66) in 2 rows of 4 (4 × 76 + 3 × 8 = 328). Level 2: 10 tiles 76 × 76 in rows of 4/4/2. Level 4: 5 tiles 64 × 64 (picture 64, border inside) with 2 px gaps (328), the flag above tile 1's left edge. Draw frame 328 × 156 (prints 72 px, 4 per row, 2 rows). Paintbox: pots 44 px in one row of 6 (8 pots: 2 rows of 4); tools 48 px. Check ≈ 600 px at 360 × 740 (Level 2 ≈ 680); at 320 × 640: tiles 70/58, pots 40, Check ≈ 590 (Level 2 ≈ 630).
- No words on the apparatus: the pots carry no colour names (an accessibility toggle "Pot names" can add them — §10).

## 5. The hand
- **Dip:** tap a pot → the brush (follows as a cursor badge on pointer devices; on touch it is the "selected tool" chip) takes that colour, the pot lid wobbles (120 ms).
- **Paint:** with the brush, tap a picture → it turns that colour (silhouette-masked, §2; 240 ms, a soft "shhp"). Tap a painted picture with another colour → repaints. Same colour → a little shimmer, no change.
- **Stamp:** select ring or cross → tap a picture → the ring draws itself round the tile (300 ms pen stroke) or a cross strikes through (two 150 ms strokes). Tap again with the same stamp → it lifts off (undo).
- **Sponge:** tap a picture → clears paint and stamps (bubbles, 200 ms).
- **Draw rounds:** the tray shows the round's library picture(s) as rubber stamps (Draw-two rounds: two stamps); tap inside the frame → the picture is printed there (96 px at 704, 72 px at 360 — never below the 64 px floor). Tap a print → it lifts off (undo).
- **True/false:** two big stamps carrying the bank's words ("true" / "false" — content words, as on G1-341) sit where the paintbox is; tap one → it thumps onto the sentence card's corner.
- **Keyboard:** Tab cycles pots → tools → pictures; Enter applies the selected tool; C = Check.
- **Free play:** the spare test picture beside the pots takes any paint; it is wiped on the next round.

## 6. The rounds
**9 rounds per level, order-only reshuffle per pass (§A.13.60 `nextTask`).** The EN tables below are the source and the gate's truth; other locales fill the SAME frame ids, nouns, counts and colours from their own bank blocks. Counts 1–5, never 0.

**Level 1 — Colour** (b2 frames; 8 pictures; target noun × (n+2), the rest another noun; colour never natural)
| # | frame | sentence (EN, from the bank) | row (8) | right |
|---|---|---|---|---|
| 1 | c1 | Color 3 cows purple. | farm-animals/cow ×5, farm-animals/horse ×3 | any 3 cows purple, nothing else painted |
| 2 | c2 | Find 2 apples and color them blue. | fruits/apple ×4, fruits/banana ×4 | 2 apples blue |
| 3 | c3 | Make 4 balls orange. | toys/ball ×6, toys/car ×2 | 4 balls orange |
| 4 | c4 | Mia colors 2 pigs green. | farm-animals/pig ×4, farm-animals/goat ×4 | 2 pigs green |
| 5 | c1 | Color 5 bees red. | insects-and-bugs/bee ×7, farm-animals/cat ×1 | 5 bees red |
| 6 | c2 | Find 3 boats and color them yellow. | toys/boat ×5, toys/car ×3 | 3 boats yellow |
| 7 | c3 | Make 2 dogs red. | farm-animals/dog ×4, farm-animals/cat ×4 | 2 dogs red |
| 8 | c4 | Ben colors 4 bicycles blue. | toys/bicycle ×6, toys/ball ×2 | 4 bicycles blue |
| 9 | draw | Draw three balls in the box. | (frame; stamp toys/ball) | exactly 3 prints |
Per pass the Draw round's noun rotates apple / ball / car / cat (n 2–4). Colours used: purple, blue ×2, orange, green, red ×2, yellow — all six pots, none natural for its noun (`NATURAL_COLOR` checked: apple ≠ red/green/yellow, banana ≠ yellow/green, pig ≠ pink). Frames c3/c4 are used only where the locale's bank keeps them (`familyFrame`); otherwise c1/c2 alternate.

**Level 2 — Two sentences** (G1-409 / 252 / 410; two b2 sentences on one card, one mixed row of 10; each noun × (n+2); different colours)
| # | sentences (EN) | row (10) |
|---|---|---|
| 1 | Color 2 cats blue. Color 3 dogs yellow. | cat ×4, dog ×5, horse ×1 |
| 2 | Find 2 cows and color them green. Find 3 pigs and color them orange. | cow ×4, pig ×5, goat ×1 |
| 3 | Make 3 balls red. Make 2 cars purple. | ball ×5, car ×4, boat ×1 |
| 4 | Mia colors 2 apples blue. Mia colors 4 bananas red. | apple ×4, banana ×6 |
| 5 | Color 3 boats green. Color 3 bicycles yellow. | boat ×5, bicycle ×5 |
| 6 | Find 2 bees and color them purple. Find 2 cats and color them orange. | bee ×4, cat ×4, dog ×2 |
| 7 | Make 4 goats blue. Make 2 horses red. | goat ×6, horse ×4 |
| 8 | Ben colors 2 dogs green. Ben colors 3 cows purple. | dog ×4, cow ×5, pig ×1 |
| 9 | Color 3 cars orange. Color 2 balls blue. | car ×5, ball ×4, bicycle ×1 |
Pictures are scattered (the core shuffles positions per mount; any n of the noun are right, so position cannot be guessed — only read).

**Level 3 — Two steps** (G1-339 + G1-338; b3 verbs; 8 pictures with the flag; tile numbers count from the flag)
| # | sentence (EN, composed from the bank) | row 1→8 | circle | cross |
|---|---|---|---|---|
| 1 | Circle the cat and cross out all the dogs. | cow · dog · pig · CAT · dog · cow · pig · dog | 4 | 2, 5, 8 |
| 2 | Cross out all the apples and circle the banana. | car · apple · ball · apple · BANANA · car · apple · ball | 5 | 2, 4, 7 |
| 3 | Circle the first picture and cross out all the goats. | HORSE · cow · goat · pig · goat · cat · dog · goat | 1 | 3, 5, 8 |
| 4 | Circle the last picture and cross out all the bees. | bee · cat · bee · dog · cow · bee · pig · GOAT | 8 | 1, 3, 6 |
| 5 | Cross out all the horses and circle the second cow. | cow · COW · horse · pig · horse · dog · cow · horse | 2 | 3, 5, 8 |
| 6 | Circle the third ball and cross out all the boats. | ball · car · boat · ball · boat · BALL · car · car | 6 | 3, 5 |
| 7 | Cross out all the pigs and circle the picture between the cat and the dog. | pig · goat · pig · cow · horse · cat · GOAT · dog | 7 | 1, 3 |
| 8 | Draw two apples and three balls in the box. | (frame; stamps apple + ball) | — | — |
| 9 | Draw three cars. Then draw two boats. | (frame; stamps car + boat) | — | — |
Circle targets over rounds 1–7: tiles 4, 5, 1, 8, 2, 6, 7 — seven different tiles; circle-first 4 rounds, cross-first 3. "Do the first verb only", "do the second verb only" and "circle every picture of the named thing" each succeed 0/7. *the cat*, *the banana*, *the dog* are `unique` forms, so each appears exactly once in its row (gate-asserted). No row holds two nouns of one `CONFUSABLES` group or G1-308's look-alike list.

**Level 4 — Places** (G1-308 / G1-340; 5 pictures from the flag; verb circle; the bank's `fixed` and `ord` forms)
| # | row (flag →) | sentence (EN) | right tile |
|---|---|---|---|
| 1 | cat · dog · cow · pig · goat | Circle the second picture. | 2 |
| 2 | apple · banana · apple · ball · apple | Circle the third apple. | 5 |
| 3 | car · boat · bicycle · ball · cat | Circle the picture between the boat and the ball. | 3 |
| 4 | horse · cow · goat · horse · pig | Circle the last picture. | 5 |
| 5 | pig · cow · pig · dog · pig | Circle the second pig. | 3 |
| 6 | bee · cat · dog · bee · cow | Circle the picture to the right of the dog. | 4 |
| 7 | ball · car · ball · boat · bicycle | Circle the first picture. | 1 |
| 8 | goat · horse · cow · dog · cat | Circle the fourth picture. | 4 |
| 9 | apple · banana · cow · apple · pig | Circle the picture to the left of the cow. | 2 |
Target spread: 1:1 · 2:2 · 3:2 · 4:2 · 5:2 (no tile more than 2 of 9). Rounds 2 and 5 are the noun-ordinal trap: counting *pictures* lands on tile 3 / tile 2, the wrong tile.

**True or false** (Check setting; b3 `truth.frames`; plain colour rows of 8 with the flag; 9 statements per pass on 3 rows)
| row | statement (EN, bank frame) | truth |
|---|---|---|
| A: cat · dog · cat · pig · cow · cat · dog · goat | There are three cats in the row. | true |
| A | There are two pigs in the row. | false (number) |
| A | The last picture is the goat. | true |
| B: horse · ball · horse · car · horse · boat · ball · bee | There are more than three horses in the row. | false (comparison) |
| B | The second picture is the ball. | true |
| B | The picture right after the car is the boat. | false (it is the horse) |
| C: apple · banana · banana · cow · banana · apple · dog · banana | There are fewer than two apples in the row. | false (comparison) |
| C | The first picture is the apple. | true |
| C | The picture right after the cow is the banana. | true |
5 true / 4 false (56 %); every false statement breaks exactly ONE part. Always-true bot 5/9, always-false 4/9. (*the ball* in row B and *the apple* in row C name the noun's first occurrence only in frames the bank permits — the gate checks each `{obj}` against the locale's `unique` rule; where a locale refuses a `unique` cue on a repeated noun, that statement is swapped for a count frame.)

**Answer position / guessability (gate-measured on every locale's sets):** colour rounds — any n instances are right, so position carries nothing; "paint all of the noun" never succeeds; "use the natural colour" never succeeds; Level 3 first-verb-only / second-verb-only 0/7, circle targets 7 different tiles; Level 4 "pick tile 2" bot 2/9, no tile > 2/9; true/false bots ≤ 5/9.

## 7. Check, the misses, the success
- **Check with nothing done** → no miss; the brush (or the stamps) wiggle. Hint: "Read the sentence first. Then pick up the brush."
- **The reading pass (every Check):** the bar rides word by word (180 ms per word, content words 360 ms). Each content word tests its part:
  - number → ticks under each matching marked picture, counted aloud by numerals 1, 2, 3 above the ticks;
  - colour → shimmer from the word to each picture painted that colour;
  - thing → marked pictures wiggle if they are that thing;
  - *all* → visits every picture of the thing in turn;
  - place / ordinal → hop-dots from the flag (on the named noun only, for *the second cow*) to the named place;
  - verb (two-step) → its marked pictures flash (ring/cross).
  - It stops at the **first false word**.
- **Miss 1:** the bar stops; the false word blinks (3 × 200 ms) and the picture(s) that broke it react: extra paint drips off (too many) · an empty tick waits where a missing one should be (too few) · wrong colour runs down the picture · wrong thing shakes its paint off · *all* with one missed: the bar's visit stops at the unmarked one and it glows · wrong place: the hop-dots land on the right tile and it glows faintly · missing second step: that verb stays dark and taps. The child's work stays (except the dripped extra, which is removed). Hint (by what failed): number "Read the number again: {n}." · colour "Read the colour word again." · thing "Read which thing again." · all "The sentence says all. Look at every one." · place "Start at the flag and count." · step "The sentence has two jobs. Read it to the end."
- **Miss 2:** the failing word is underlined in the matching pot's texture (colour), or every picture of the named thing gets a dashed outline (thing/number — always ALL of them, never exactly n, so counting stays the child's job), or the hop-dots stay on the row (place). Hint: "Look at the glowing word. Do just what it says."
- A new move removes the help until the next Check.
- **True/false:** the child stamps first; Check runs the reading bar over the statement against the row: true → every word lights; false → the bar stops at the broken word. If the stamp disagrees, that is the miss (miss 1 shows the stop; miss 2 underlines the deciding word). Hint: "Look where the reading stopped. Is that word true for the pictures?"
- **Success:** the bar reaches the full stop, the sentence turns gold, the marked pictures hop in reading order, the brush taps the full stop. Bubble: "You did exactly what it said!" + a short per-round echo literal from the manifest ("3 purple cows!", "the cat circled, the dogs crossed out!", "the second picture!") — authored literals per locale, no runtime grammar. True/false: "Yes — that sentence is {true|false}!" (the bank's own words).

## 8. Settings
1. **Sentence:** Colour / Two sentences / Two steps / Places — changes the row (8 / 10 / 8 with a flag / 5 with a flag) and the tools (pots vs stamps) at rest.
2. **Check:** Do it / True or false — the paintbox is replaced by the two stamps and the row arrives unmarked with a statement.
- Accessibility toggle (not a teaching setting): **Pot names** off / on — puts the colour word under each pot, for colour-blind children.

## 9. Words (EN source)
- title "The Instruction Paintbox" · instruction "Read the sentence to the end. Then do exactly what it says." · instruction (true/false) "Read the sentence. Is it true or false for these pictures?"
- every round sentence: FROM THE BANKS (§0) — never authored in this file's strings; stamps "true" / "false" = b3 `truth.yes/no`.
- hints: empty "Read the sentence first. Then pick up the brush." · number "Read the number again: {n}." · colour "Read the colour word again." · thing "Read which thing again." · all "The sentence says all. Look at every one." · place "Start at the flag and count." · step "The sentence has two jobs. Read it to the end." · miss2 "Look at the glowing word. Do just what it says." · tfMiss "Look where the reading stopped. Is that word true for the pictures?"
- celebration "You did exactly what it said!" + echo literal · true/false "Yes — that sentence is {true|false}!"
- settings: "Sentence" — "Colour" / "Two sentences" / "Two steps" / "Places" · "Check" — "Do it" / "True or false" · "Pot names" — "Off" / "On"
- aria: pot "{colour} paint" · tool "brush, holding {colour}" / "ring stamp" / "cross stamp" / "sponge" · tile "{noun}, picture {i}, {painted colour|plain}, {circled|crossed out}"
- **Locale traps.** (1) **Colour agreement** fr/es/it/pt — the b2 bank handles it (`colorInSentence`); nothing new is authored. (2) **fi** translative colour ("väritä punaiseksi") and partitive after numbers ("3 lehmää") — b2 `colorWords` + `nounForms`. (3) **de separable verb** "male … an" — the bar treats "an" as a non-content word. (4) **Place phrases and case** only from b3 (de dative "zwischen der Katze und dem Hund", fi postposition + genitive). (5) **Number words** only where the locale's b3 `numbers` map exists (fr/pt/sv print numerals). (6) en keeps the bank's US "Color". (7) **da *anden*** = "the duck" AND "the second" — duck is excluded from every round in every locale. (8) Reading direction of the row: left-to-right from the flag in all 11 locales. (9) `avoidNatural` per noun in every locale.

## 10. Sound off, access, phones
- Legible with the sound off: the sentence is the content; the reading bar shows the test visually; TTS (long-press) is a bonus.
- Pot textures (also inside the painted silhouette) make every colour distinguishable without hue; "Pot names" toggle for colour-blind readers.
- Keyboard path §5; aria per tile; the reading pass is announced word by word in a live region ("3: yes. cows: yes. purple: no.").
- Taps: tiles 120/76/64 px; pots 56/44 px; tools ≥ 48 px; Check 48 px.
- Pictures 100/96 px at 704; 66 (Levels 1–3) / 64 (Level 4) at 360.
- Check above the fold at 360 × 740 and 320 × 640 (figures in §4).

## 11. Distinct from
- **Row 37 Identify the Shape (the paint that only stays in its own shape):** a brush there TESTS a shape (paint sets only on the tin's shape); here the brush CARRIES OUT a sentence and the sentence tests the row. Different invention (the reading bar), different skill.
- **Row 67 Proof Pins** (sentence words fly to a picture to prove it) — the child judges a given picture; here the CHILD builds the picture from a command, and the bar walks the sentence in order, stopping at the first false word.
- **Row 76 Question Lamp**, **Row 80 Lamplight Cupboard** — vocabulary meaning; this is following a multi-part instruction.
- **New 207 Bus Queue** (ordinals counted from the door) — ordinals are one step here, inside a reading task.
- Premium tools: none paint by instruction.

## 12. Build plan
- **Core** `InstructionPaintboxCore`: `round` = `{level, frameId, sentence, parts:[{kind:'number'|'colour'|'thing'|'all'|'place'|'verb', wordSpan:[i,j], value}], row:[noun], target}`; `apply(state, tool, tile)`; `read(round, state)` → `[{wordIndex, ok, culprits:[tile]}]` stopping at the first false part; `checkTF(round, stamp)`; `assemble(locale, level)` that FILLS bank frames (b2 `sentence()`, b3 composer) — it never authors text; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-instruction-paintbox-core.js`): an independent table of each EN round's right marks; for every locale: every sentence equals the bank's fill of its frame id (re-filled by the gate from the bank — a hand-edited sentence fails); every content-word span exists in the rendered sentence; "paint all of the noun" fails every colour round; no natural colour; n ≥ 2 in colour frames; first-verb-only and second-verb-only fail every two-step round; `unique` nouns appear exactly once; no duck; no confusable pair in a row; place targets ≤ 2 per tile; circle targets distinct in Level 3; TF 40–60 % true and each false breaks one part; every picture exists in a colour theme; no round asks 0; sentence card ≤ 2 lines at 704 / ≤ 3 at 360.
- **Mutations (each killed):** accept more than n · accept fewer than n · ignore the colour · accept any thing · "all" accepted with one missing · count places from the right · ordinal counts pictures not the noun · accept only the first step · TF stamp ignored · reading continues past the first false word · Miss-2 outlines exactly n tiles · same order every pass · natural colour allowed · a sentence not from the bank · duck allowed in da.
- **Pictures to verify on contact sheets:** farm-animals/cow, horse, pig, goat, cat, dog; fruits/apple, banana; toys/ball (a black-and-white football — never "a red ball"), car (green), boat, bicycle; insects-and-bugs/bee. All exist (checked against `mini tools/pictures`). The silhouette mask needs each webp's alpha: the build asserts every used picture has a transparent background (else that noun drops).
- **Risks:** the grayscale + multiply paint must read as the pot's colour on every used picture: the gate renders each colour-round noun painted in each of its round colours and measures the silhouette's mean hue within a fixed distance of the pot (dark-bodied pictures fail this); a failing noun drops from colour rounds and stays usable in Levels 3–4. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — fat paint pots that really recolour the pictures, rubber stamps, and a reading bar that tests your picture with drips and wet-dog shakes.
2. **Teacher on the board?** Yes — it is "read it to the end, then do exactly that", with the very sentences of the worksheets she prints, and the sentence shows the class which word was not obeyed.
3. **Parent trust?** Real reading from banks reviewed in 11 languages, library pictures, colour-blind-safe textures, no scores.
4. **Invention:** the sentence reads your picture back word by word, lighting what is true and stopping at the first word you didn't do.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 3→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **Sentences now come from the banks, cited** (b2 `sentences.js` frames c1–c4; b3 `instructions.js` verbs, `objForms`, `fixed`, `draw`, `draw2`, `truth`, `numbers`, `and`). The old tables invented forms the banks do not have and could not produce: "Color 1 ball orange" / "circle 1 dog" (b2 colour frames are plural-only — `sentence()` throws at n < 2), "colour … and circle …" mixes (G1-339 joins two b3 clauses), "Color the second picture red" (b3 has no colour verb), and hand-written true/false statements (b3 has `truth.frames`).
- **Count + 2 now holds everywhere** — five of the old Level-2 rows broke it (4 carrots for "3"); with 8 tiles two counted nouns cannot both carry +2, so the two-sentence level gets 10 tiles.
- **Nouns restricted to the 13 every locale's b3 bank carries reviewed**, and **duck removed** (sv/da/no duckling; da *anden* = "the second" — the G1-308 refusal).
- **Painting a colour picture made honest:** the paint recolours the picture's own silhouette (grayscale + alpha-masked `multiply` — the colouring-book look), so "colour 3 cows purple" really shows purple cows — the old design flooded the tile behind an unchanged picture.
- **Level 2 re-split** into "Two sentences" (G1-409/252/410) and "Two steps" (G1-339/338 + draw2), positions written tile by tile: circle targets on 7 different tiles; first-verb-only 0/7; Places target spread 1/2/2/2/2; TF 5/4.
- Settings cut to two teaching settings (+ an accessibility toggle).
