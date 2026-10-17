# New 282 — The See-Through Fact Sheets (W.2.7)

## 0. Identity
- id `fact-cabinet.play.w-2-7` · grade 2 · Common Core W.2.7 (participate in shared research and writing projects — gather facts on a topic and record them) · strand Writing · files `mini tools/fact-cabinet-core.js`, `fact-cabinet-activity.js`, `fact-cabinet-activity.html`, `fact-cabinet-activities.json`. Title: **"The See-Through Fact Sheets — Animal Fact Files"** (key kept; the instrument is a fact file on tracing film, not a drawer cabinet — drawers that shut or jam are New 225's invention).
- worksheets it covers: **G2-318** Animal Fact File (one fact per row) · **G2-339** Fact File: Circle the True Facts · **G2-340** Fact File with a Word Bank · **G2-341** Fact File: Write Three Sentences (the assembled file is read back as sentences at the end) · **G2-342** Compare Two Animals: Same and Different.
- new instrument (no old activity).

## 1. The pitch
"Each animal's fact file is printed on clear tracing film — file your facts under the right headings, then lay the expert's film on top: where you were right the lines sit exactly on top of each other and turn bold; and to compare two animals you simply lay one animal's film over the other's."

## 2. Why a child will want it again (the fun)
- **A clipboard with real-feeling film.** The child's fact file is a sheet of clear film clipped to a clipboard, five ruled rows with a heading and a little drawn icon each. Fact cards come off a pile one at a time (a gentle card-flip); drag one into a row and it settles under the film with a soft *shff*.
- **The expert's film.** At Check a second film (the expert's file for this animal, its lines printed in teal) slides down over the child's from the top of the clipboard, like a transparency on an overhead projector. Matching lines lock together and go bold with a click per row — a lovely row-by-row reveal.
- **Compare by overlay.** In compare mode two finished files lie side by side; after the child marks each row *same* or *different*, the right-hand film lifts, flies over and lands on the left one: rows that say the same thing merge into one bold line; rows that differ show two lines doubled up. It is the most satisfying "check" imaginable, and it is exactly what *same* means.
- **End-of-round show:** the finished file is read back as three or five sentences under the animal's picture ("A kangaroo eats grass and leaves. Its home is the dry, open land of Australia. …"), then the film slides into a drawn folder on the shelf; the shelf fills with one folder tab per animal.
- **Free play:** after a round the films can be slid over each other freely (any two finished animals), so children can discover "the owl and the penguin both have feathers".
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** gather true facts about an animal and record each under the right heading (food · home · how it moves · body covering · babies); reject facts that belong to a different animal; compare two animals' facts row by row as *same* or *different* — the organise-and-record step of a G2 research report.
- **Misconception 1 — filing by the word on the card, not its meaning.** Pushback by content + mechanism: cards are worded naturally and many open with ANOTHER heading's word ("It **lives** in its mother's pouch while it is a tiny baby" belongs to *babies*; "It **swims** down deep to catch fish" to *eats*; "It **flies** from flower to flower to drink sweet nectar" to *eats*; "It **can walk** a few hours after it is born" to *babies*), while one carries no heading word at all ("Its wide, soft feet do not sink in the sand" → *moves*). Critic-measured (`work-c36/c282.js`, a bot that files each card under the first heading keyword it meets): **8 of 40 cards misfiled** (the designer's "10" did not reproduce — it was 3 before four cards were reworded so their first keyword misleads), 9 cards hold another heading's word, 1 holds none. When a card is misfiled the expert film's line for it lands in a DIFFERENT row — the child sees their card in one row and the true line in another.
- **Misconception 2 — any animal fact is true of this animal.** In *8 cards* the pile holds three facts that are true of other animals in the set (a feathers card for the kangaroo, a "fly without a sound" card for the penguin). They belong in the tray at the clipboard's foot, "Not this animal". **The child judges truth from a SOURCE, not from what she happens to know** (W.2.7 is research from provided sources): a drawn index card, *the Source*, clipped at the top of the board, holds four plain sentences about the animal (§6); every true card says something the Source says (in other words), and every false card is CONTRADICTED by it (fur vs feathers, hops vs flies, a pouch vs a nest) — never merely absent. A false card filed in a row is uncovered when the expert film comes down (no line lands on it); at miss 2 the card turns over to show which animal it is true for (that animal's picture, 96 px) and the Source sentence that contradicts it underlines.
- **Misconception 3 — "same" means "looks a bit alike".** In compare mode the overlay is literal: same = the two lines lie exactly on top of each other.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px — one animal**
- **Animal picture** (top-left of the clipboard, 120 × 120, library).
- **Clipboard** (430 × 420, drawn board with a metal clip) holding the **film**: five rows (410 × 66 each), each row = a heading tab at the left (110 wide: the heading word, Nunito 17 px bold, and a drawn 28 px icon — plate disc for *eats*, house outline for *lives*, a curved motion arrow for *moves*, a hatched swatch for *body covering*, an egg outline for *babies*) and a writing area (290 wide) where a filed card sits (Nunito 16 px, up to 2 lines).
- **Pile** (right column, 200 wide): the next fact card face-up (190 × 72), the rest as a stack edge; under it the **"Not this animal" tray** (190 × 90, drawn tray with a crossed-paw-free outline — just a tray; its label is a word, part of the content, "Not this animal").
- **The Source** (a drawn index card 200 × 120 above the pile, Nunito 15 px, 4 sentences; tap to enlarge to 420 × 220 over the board, tap again to put it back; at 360 it is a 340 × 44 tab above the card strip that opens to a 340 × 200 sheet). It is reading material, not a hint — always available, never counted.
- **Task line:** "Read each fact. File it in the right row — or put it in the tray if it is not true for this animal."

**At 704 px — compare**
- Two clipboards side by side (each 300 × 400) with their animals (96 × 96) and five filled rows; between the rows a column of = / ≠ buttons (44 × 44 each, drawn signs — the content). Task line: "Read both fact files. Is each row the same or different?"

**At 360 px** (stacked): animal 96 × 96 beside the clipboard top; clipboard 340 wide, rows 340 × 60 (heading tab 96 wide, card text 15 px, 2 lines); the pile becomes a single card strip ABOVE the clipboard (340 × 64) with the tray as a button-sized drop zone (120 × 52) beside it. Compare: the two files stack vertically (each 340 × 300, rows 340 × 52 with smaller headings) and the = / ≠ pairs sit at the right of the lower file's rows. Check bottom at 360 × 740: header 56 + task 52 + card strip 72 + animal/clip head 104 + rows 5 × 64 + Check 52 = 656 ≤ 740 (320 × 640: rows 56 → 616).
- Library pictures only for animals (≥ 96 px at 704 and at 360 — the 96 floor holds on phones too). Clipboard, film, icons, tray are drawn geometry; heading words and fact cards are content (reading the headings is part of the G2 task).

## 5. The hand
- **Drag the top card** to a row (it slides under the film into that row, *shff*) or to the tray. Tap path: tap the card (it lifts), tap a row/tray. Keyboard: Enter lifts, Up/Down choose the row (tray last), Enter drops.
- **Move a filed card:** drag it to another row (a row holds one card; dropping on a full row swaps the two). Taking a card back sends it to the top of the pile.
- **Compare:** tap = or ≠ for each row (a choice toggles; the chosen sign fills teal).
- **Check** (button "Lay the expert's sheet", 52 px). §7.
- Free play §2.

## 6. The rounds
**One animal** — 8 animals; each round = file all the pile. *Cards: 5* = the five true cards; *Cards: 8* = the five true + three false cards, the false cards placed at random positions in the pile (dealt so a false card is never first and never the last two together; per pass false cards occupy each pile position 1–8 at most 4 times across the 8 animals).

- **kangaroo** (zoo-animals/kangaroo) — eats: "Grass and leaves are its food." · lives: "Its home is the dry, open land of Australia." · moves: "It hops on its big, strong back legs." · covering: "Soft fur covers its whole body." · babies: "It lives in its mother's pouch while it is a tiny baby." — false: "Its chicks live in a nest until they can fly." (owl) · "It flies with four thin wings." (bee) · "Short, thick feathers keep it warm." (penguin)
- **penguin** (winter/penguin) — eats: "It swims down deep to catch fish." · lives: "It lives by cold seas in the south of the world." · moves: "It waddles on land and swims with its flippers." · covering: "Short, thick feathers keep it warm." · babies: "Its chick hatches from an egg." — false: "Its soft wings let it fly without a sound." (owl) · "Grass and leaves are its food." (kangaroo) · "Soft fur covers its whole body." (kangaroo)
- **frog** (pets/frog) — eats: "It catches insects with its long, sticky tongue." · lives: "It lives in and near ponds." · moves: "It jumps with its long back legs." · covering: "Its skin is smooth and wet." · babies: "Tadpoles hatch from its eggs and swim in the water." — false: "Soft feathers cover its body." (owl) · "It chews grass for hours every day." (cow) · "It drinks its mother's milk when it is a calf." (cow)
- **cow** (farm-animals/cow) — eats: "It chews grass for hours every day." · lives: "It lives on farms, in fields and barns." · moves: "It walks on four legs with hard hooves." · covering: "Short hair covers its body." · babies: "It drinks its mother's milk when it is a calf." — false: "Its chicks live in a nest until they can fly." (owl) · "It catches insects with its long, sticky tongue." (frog) · "It flies with four thin wings." (bee)
- **owl** (forest-creatures/owl) — eats: "It flies out at night to catch mice." · lives: "It lives in woods, often in a hole in a tree." · moves: "Its soft wings let it fly without a sound." · covering: "Soft feathers cover its body." · babies: "Its chicks live in a nest until they can fly." — false: "It waddles on land and swims with its flippers." (penguin) · "Its skin is smooth and wet." (frog) · "It chews grass for hours every day." (cow)
- **bee** (insects-and-bugs/bee) — eats: "It flies from flower to flower to drink sweet nectar." · lives: "It lives in a hive with many other bees." · moves: "It flies with four thin wings." · covering: "Tiny hairs cover its body." · babies: "Its babies hatch from eggs the queen lays in wax cells." — false: "Soft feathers cover its body." (owl) · "It waddles on land and swims with its flippers." (penguin) · "It drinks its mother's milk when it is a calf." (cow)
- **shark** (ocean-life/shark) — eats: "It hunts fish and other sea animals." · lives: "It lives in the ocean." · moves: "It swims by swishing its tail." · covering: "Its skin is rough, like sandpaper." · babies: "It swims off on its own as soon as it is born." — false: "Soft fur covers its whole body." (kangaroo) · "It lives in a hive with many other bees." (bee) · "It waddles on land and swims with its flippers." (penguin)
- **camel** (zoo-animals/camel) — eats: "Dry, prickly desert plants are its food." · lives: "It lives in hot, dry deserts." · moves: "Its wide, soft feet do not sink in the sand." · covering: "Thick hair covers its body." · babies: "It can walk a few hours after it is born." — false: "It swims down deep to catch fish." (penguin) · "Its chicks live in a nest until they can fly." (owl) · "Its skin is smooth and wet." (frog)

**The Sources** (EN; each locale's author rewrites them with the same facts; every true card is a paraphrase of one sentence, every false card contradicts one):
- kangaroo — "Kangaroos live on the dry, open land of Australia. They hop on big, strong back legs and eat grass and leaves. Soft fur covers a kangaroo's body. A baby kangaroo grows in a pouch on its mother's belly."
- penguin — "Penguins live by cold seas in the south of the world. They cannot fly: they waddle on land and swim with their flippers, diving deep to catch fish. Thick feathers keep them warm. A penguin chick hatches from an egg."
- frog — "Frogs live in and near ponds. A frog jumps with its long back legs and catches insects with its sticky tongue. Its skin is smooth and wet. Frog eggs hatch into tadpoles that swim in the water."
- cow — "Cows live on farms, in fields and barns. A cow walks on four legs with hard hooves and chews grass for hours. Short hair covers its body. A cow's calf drinks its mother's milk."
- owl — "Owls live in woods, often in a hole in a tree. At night an owl flies out on soft, silent wings to catch mice. Soft feathers cover its body. Owl chicks stay in the nest until they can fly."
- bee — "Bees live in a hive with many other bees. A bee flies on four thin wings from flower to flower and drinks sweet nectar. Tiny hairs cover its body. The queen lays eggs in wax cells, and the baby bees hatch from them."
- shark — "Sharks live in the ocean. A shark swims by swishing its tail and hunts fish and other sea animals. Its skin is rough, like sandpaper. A baby shark, called a pup, swims off on its own as soon as it is born."
- camel — "Camels live in hot, dry deserts and eat dry, prickly desert plants. A camel's wide, soft feet do not sink in the sand. Thick hair covers its body. A baby camel, called a calf, can walk a few hours after it is born."
Contradiction check (critic): each false card meets a Source sentence that says the opposite — kangaroo: wings/flies ⟂ hops, feathers ⟂ fur, nest ⟂ pouch · penguin: flies ⟂ cannot fly, grass ⟂ fish, fur ⟂ feathers · frog: feathers ⟂ smooth wet skin, grass ⟂ insects, milk ⟂ eggs/tadpoles · cow: nest/chicks ⟂ calf, insects ⟂ grass, flies ⟂ walks · owl: waddles/flippers ⟂ flies, wet skin ⟂ feathers, grass ⟂ mice · bee: feathers ⟂ hairs, waddles ⟂ flies, milk ⟂ eggs · shark: fur ⟂ rough skin, hive ⟂ ocean, waddles ⟂ swims · camel: fish ⟂ desert plants, nest ⟂ calf, wet skin ⟂ thick hair.

Every false card is TRUE for its named owner (gated: the owner's file contains it word for word) and false for the round's animal. The headings never appear on the card in the place a child would expect (see Misconception 1). Facts reviewed for science: a penguin's wings do not fly; bees have four wings and a hairy body; shark pups swim from birth; a camel calf walks within hours; kangaroo joeys grow in the pouch.

**Compare two** — 8 pairs; each row of each file is a short category fact worded IDENTICALLY when two animals share it (that is what lets the films merge), from this value table: *eats* plants / other animals · *lives* on land / on land and in water · *moves* hops / walks / swims / flies / jumps · *body covering* fur / feathers / smooth, wet skin / a hard body with tiny hairs · *babies* are born / hatch from eggs.

| # | pair | eats | lives | moves | covering | babies |
|---|---|---|---|---|---|---|
| 1 | kangaroo · cow | same | same | different (hops · walks) | same (fur) | same (born) |
| 2 | penguin · owl | same (other animals) | different | different (swims · flies) | same (feathers) | same (eggs) |
| 3 | owl · bee | different | same | same (flies) | different | same (eggs) |
| 4 | camel · kangaroo | same | same | different | same | same |
| 5 | frog · penguin | same | same (land and water) | different | different | same |
| 6 | kangaroo · penguin | different | different | different | different | different |
| 7 | bee · cow | same (plants) | same | different | different | different |
| 8 | frog · owl | same | different | different | different | same |
Measured (`work-36/d282.js`): *same* 21 of 40 rows, *different* 19 — a "say same every time" bot gets 52 %, "different every time" 48 %; per heading *same* 6 · 5 · 1 · 3 · 6 (eats … babies), so no heading is always one answer except *moves* (only the owl–bee pair shares a way of moving) — which is the true biology the files show. Each pair's left/right placement alternates by round.
(The shark is in the one-animal set but not in compare: shark babies are born in some species and hatch in others — one honest value does not exist.)

**Order:** order-only reshuffle of animals/pairs per pass (never the previous order, never the same animal twice running, the same animal never on both sides).
**Pictures** (labelled ×11; seen on zoo-animals, winter, pets, farm-animals, forest-creatures, insects-and-bugs, ocean-life sheets): zoo-animals/kangaroo, winter/penguin, pets/frog (side view), farm-animals/cow, forest-creatures/owl (ear tufts — fine here, no "pointy ears" question), insects-and-bugs/bee, ocean-life/shark, zoo-animals/camel. Not used: animals/elephant and zoo-animals/giraffe (chibi babies: no tusks, short neck — facts about trunks/necks would contradict the picture), animals/wolf (a husky pup), any duck (drawn as ducklings that do not fly).

## 7. Check, the misses, the success
- **Check with cards still on the pile** → hint, no miss: "File every card first — a row, or the tray." (compare: "Choose same or different for every row.")
- **Miss 1 (one animal):** the expert's film slides down. Rows that match lock bold (they stay right and locked). A misfiled card: the expert's line for that fact appears in its TRUE row (a teal ghost line) while the child's card blinks in the wrong row; a false card filed in a row: no line lands on it and it blinks; a true card put in the tray: its ghost line appears in its row with the tray card blinking. The film then lifts away again (the child moves the blinking cards). Hint: "The teal lines show where your blinking cards belong."
- **Miss 2:** the film comes down and STAYS half-transparent over the rows until the next move; a false card in a row turns over to show the animal it is true for (picture 96 px + "This is true for {animal}."). Hint: "Move each blinking card to its line — or to the tray."
- **Compare — miss 1:** the right film flies over and lands; rows marked wrong blink their sign (a *same* that shows doubled lines, a *different* that shows one merged line); the film lifts back. Hint: "Look at the blinking rows: one line means same, two lines mean different." **Miss 2:** the film stays down until the next move.
- A new move clears the help.
- **Success:** every row locks bold; the file is read back as sentences under the animal ("A kangaroo eats grass and leaves." etc.); compare success: the two films stay overlaid and the same rows glow: "The kangaroo and the cow are the same in 4 ways and different in 1." (counts computed; numerals as content).

## 8. Settings (each visibly changes the board at rest)
1. **Mode:** *One animal* (one clipboard + pile + tray) / *Compare two* (two clipboards + = / ≠ column). Default: one animal.
2. **Cards:** *5 (all true)* (no tray shown) / *8 (with 3 that are not true)* (tray shown). Applies to one-animal mode; in compare mode it switches between *3 rows* (eats, moves, babies) and *5 rows*. Default: 5.

## 9. Words (EN source)
- Title "The See-Through Fact Sheets" · instruction "File each fact about the animal under the right heading — and leave out what is not true for it. Then compare two animals."
- Headings: **eats · lives · moves · body covering · babies** (content, printed on the rows).
- Task lines §4. Tray label: "Not this animal".
- Hints: `pileLeft` "File every card first — a row, or the tray." · `cmpLeft` "Choose same or different for every row." · `one1` "The teal lines show where your blinking cards belong." · `one2` "Move each blinking card to its line — or to the tray." · `owner` "This is true for {animal}." · `cmp1` "Look at the blinking rows: one line means same, two lines mean different."
- Success: the file read-back (per animal, authored); compare "The {A} and the {B} are the same in {s} ways and different in {d}."
- Settings "Mode" — "One animal" / "Compare two"; "Cards" — "5 (all true)" / "8 (with 3 that are not true)".
- **Locale traps.** (1) Facts are authored per locale by a native author AND checked by one science reviewer (the same facts must be true everywhere; wording natural). (2) The keyword-trap design must survive translation: the author keeps ≥ 8 of 40 cards with another heading's word and ≥ 2 with no heading word (gate counts with a per-locale keyword list the author supplies). (3) Headings: de *frisst · lebt · bewegt sich · Körperbedeckung · Junge*; fr *mange · vit · se déplace · couverture du corps · petits*; es *come · vive · se mueve · cubierta del cuerpo · crías*; fi *syö · elää · liikkuu · ihoa peittää · poikaset* — "eats" for animals is *fressen* in de (never *essen*), *comer* is fine in es. (4) Species names: fr *manchot* for the southern penguin (the vocab label), sv/da/no *pingvin*; zoo-animals/camel is drawn with ONE hump (a dromedary) — the fr label *Chameau* names the two-humped camel, so the fr author writes *dromadaire* (es *dromedario* / it *dromedario* optional; de *Kamel*, nl *kameel* are generic and fine) and no fact may mention two humps; da "bi" vs "bier"; de "Hirsch" issues do not arise (no deer). (5) The read-back sentences need the animal name with the right article and case (de "Ein Känguru frisst Gras und Blätter."; fi "Kenguru syö ruohoa ja lehtiä." partitive) — authored as full sentences, never a template.

## 10. Sound off, access, phones
- The overlay, ghost lines, blink and card flip carry everything; TTS (optional) reads the card and the read-back.
- Keyboard §5; aria: rows "{heading}: {card text or 'empty'}"; = / ≠ "row {heading}: same / different".
- Taps: cards 64–72 tall; rows ≥ 52 tall; tray ≥ 52; = / ≠ 44 × 44.
- Pictures: 96–120 px at 704, 96 px at 360.
- Phone §4.

## 11. Distinct from
- **New 225 The Sorting Cabinet** (nine drawers; the right piece shuts the drawer, the wrong one jams): filing by drawer physics. Here nothing jams; the check is an overlay of the expert's transparent sheet, and compare is literal overlap.
- **Row 68 The Story Zipper** (two stories zip together where both agree): a Venn-like zip for stories. Here two animals' files are laid on top of each other row by row; "same" is lines that coincide.
- **New 265 The Punch-Card Key** (material test holes) · **New 263 The Rubbing** (body covering by touch) · **New 225** — other mechanics. **Row 69 Atlas's Fact Files** (RI.K.1) also lists G2-318/339/340/341: there the child swipes a highlighter over words in a text and the caught words lift into one answer slot. Here nothing is highlighted or lifted: loose, reworded fact cards are SORTED by meaning into five headings, judged true or false against a Source, and checked by laying a transparent expert sheet over the file — and two files are compared by literal overlap (G2-342, which 069 does not cover).

## 12. Build plan
- **Model (core):** `state = {mode, animal|pair, pile:[cardId], rows:{eats..babies: cardId|null}, tray:[cardId], marks:{heading:'same'|'diff'|null}, missStage}`; card `{id, text, heading|null, owner}`; `file(card, row|'tray')`, `check() → {rowsOk:{...}, misfiled:[...], falseInRows:[...], trueInTray:[...]}`, `compare(pair) → {heading: same?}` from the value table, `dealPile(pass)`.
- **Gate (`verify-fact-cabinet-core.js`, own oracle):** per locale × animal: five true cards, one per heading; each false card appears verbatim in its owner's true set and not in the animal's; keyword-bot wrong filings ≥ 8/40 and ≥ 2 cards with no heading word (per-locale keyword list); compare: same/different computed from values equals the table; *same* share between 40 % and 60 % overall; the shark never in compare; every false card is tagged with the Source sentence that contradicts it and every true card with the sentence it paraphrases (the reviewer signs the tags per locale); pile dealing rules (false never first, positions spread); a check with cards on the pile is not a miss; locked rows stay locked; Check never accepts a false card in a row.
- **Mutations:** file by keyword accepted · false card accepted in a row · true card accepted in the tray · compare uses picture similarity instead of values · overlay merges different lines · pile deals a false card first · locked row unlocks on a new move · owner flip shows at miss 1 · read-back skips a heading · the shark enters compare · a false card whose Source contradiction tag is missing (merely absent facts) · the Source hidden in *8 cards*.
- **Pictures to verify:** the 8 animals (labels ×11 checked; seen on contact sheets).
- **Risks:** science wording per locale (one science + native reviewer, sequential); the "a hard body with tiny hairs" value for the bee needs the reviewer's plain-language check per locale.
- Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Sliding see-through sheets over each other is pure overhead-projector magic, and lines snapping bold row by row is a satisfying reveal.
2. **Would a teacher put it on the board?** Yes — headings by meaning (the cards defeat keyword matching), truth-checking (cards true for another animal), and a same/different comparison that is literally overlap; facts science-checked.
3. **Would a parent trust it?** Real facts, library animals, calm design, no score.
4. **The invention in one sentence:** every fact file is printed on clear film — lay the expert's film over yours and right lines merge, lay one animal's film over another's and the facts they share become one line.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- Truth-judging had no source: a child had to KNOW that a kangaroo does not swim with its tail (kangaroos actually do swim) — world knowledge, not W.2.7 research. Added *the Source*: four plain sentences per animal (written out for all 8); every true card paraphrases one, every false card is CONTRADICTED by one (listed pair by pair), never merely absent; at miss 2 the contradicting sentence underlines.
- Replaced three false cards that were weak or wrong: kangaroo "It swims by swishing its tail" (kangaroos can swim) → the bee's "It flies with four thin wings"; owl "It hops on its big, strong back legs" (owls do hop) → the penguin's waddle/flipper card; camel "It jumps with its long back legs" → the frog's "Its skin is smooth and wet". My own script (`work-c36/c282.js`) re-checks every false card verbatim in its owner's file and absent from the animal's: 0 problems.
- The keyword trap did not hold: the designer's "10 of 40 misfiled" re-measured to 3. Reworded four cards so their FIRST heading word misleads ("It lives in its mother's pouch while it is a tiny baby", "It flies from flower to flower to drink sweet nectar", "It swims off on its own as soon as it is born", "It can walk a few hours after it is born", "It drinks its mother's milk when it is a calf") → 8 of 40 misfiled by the keyword bot; all still scientifically true.
- Compare table recomputed from the value table: matches all 40 cells, same 21 / different 19. §11 now names Row 69 (same fact-file worksheets, a highlighter on a text) and why sorting + overlay + G2-342 is a different instrument.
- Looked at the zoo-animals sheet: the camel has ONE hump — fr *Chameau* would name the wrong animal; the fr author writes *dromadaire* (locale trap added, ruling appended).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
