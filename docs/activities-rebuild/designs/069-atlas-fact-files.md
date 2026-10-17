# Row 69 — Atlas's Fact Files → THE HIGHLIGHTER THAT LIFTS FACTS (RI.K.1)

## 0. Identity
- **id** `atlas-fact-files.key-detail.ri-k-1` (KEPT; slugs and metadata frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build) · grade K · CCSS RI.K.1 (with prompting, ask and answer questions about key details in a text) · strand Reading: Informational Text · own files `atlas-fact-files-core.js` (new, replaces the shared `fact-detail-core.js` use), `atlas-fact-files-activity.js` (rewritten), html, `atlas-fact-files-activities.json` (rounds kept and extended).
- **Worksheets covered:** G2-318 "Animal Fact File: {U}", G2-339 "{U} Fact File: Circle the True Facts", G2-340 "{U} Fact File with a Word Bank", G2-341 "{U} Fact File: Write Three Sentences" → the three levels in §6.
- **Old activity:** read a two-sentence fact, tap one of three answer cards. **Kept:** all 8 EN rounds and their 6 translated sets (de fr es pt it nl) — facts, questions, answers. **Gone:** the answer cards (the answer was readable off the card, not found in the text) and the hand-drawn SVG armadillo (Atlas is now the library `zoo-animals/armadillo`).

## 1. The pitch
"You answer by finding it: swipe the highlighter over the words in the fact, and the words you caught lift out of the text and drop into Atlas's file card — if they really answer the question, the card reads as a sentence and snaps shut."

## 2. Why a child will want it again
- **A real highlighter.** A fat yellow highlighter pen (drawn geometry: a chisel tip and a cap) that the child drags across words. The yellow stripe paints behind the words in real time, snapping to whole words, slightly wobbly like a real marker, with a soft "squeak" tone.
- **Words that lift.** On release the highlighted words peel up off the line (a 4 px lift with a shadow, 180 ms), float over to the file card and drop into its answer slot with a paper "flap".
- **The card reads back.** The file card is a sentence frame made from the question: "Bees live ______." The caught words land in the gap and the whole sentence is shown: *Bees live in a hive.* If it makes sense and matches the text, Atlas (the library armadillo, top left) rolls into a ball, rolls across the card and the card stamps itself with a gold paw-dot and slides into the file drawer.
- **The file fills up.** A little drawer at the side holds every finished card; at the end of a level the drawer opens and fans the cards out: a real fact file the child built.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** answer who / what / where / when / how-many questions about an informational text by finding the key detail IN the text (RI.K.1); in the fact-file levels, gather true facts about an animal under headings (eats, lives, moves, covered in, babies) and tell true facts from claims the file does not support (G2-318/339/340/341).
- **Misconception 1 — answering from memory or the picture, not the text.** The old cards let a child pick "in a hive" without reading. Now the only way to answer is to put the highlighter on the words that are there.
- **Misconception 2 — any words from the text will do.** A child who highlights *sweet honey* for "Where do bees live?" gets the card reading *Bees live sweet honey.* — the frame itself makes the mismatch visible, and the card will not shut (it sticks out of the drawer, the words slide back into the text).
- **Misconception 3 — copying the whole sentence.** Highlighting the entire first sentence makes *Bees live Bees live in a hive.* — the frame shows the doubled words in amber, and the extra words peel back into the text one by one until only the part that answers is left (an echo is shown, never counted as a miss).
- **The strategy taught (miss ladder):** the question's own words are a signpost — the answer sits next to them in the text (*live* → *in a hive*).

## 4. The stage
`layout:'split'` at ≥ 700 px: apparatus left, bubble right; stacked below.

**At 704 px:**
- **The fact card** (top, 440 × 190 px, cream paper with a punched-hole edge): a library picture of the subject 110 × 110 px at its left (spring/bee, forest-creatures/frog, spring/sun, winter/penguin, forest-creatures/spider, camping/pine_tree, farm-animals/cow, spring/rain, forest-creatures/owl); the two-sentence fact at its right in 26 px Nunito, line height 1.6 so every word is a ≥ 44 px-tall highlight target.
- **The highlighter** parked at the card's right edge (36 × 120 px), draggable; or the child can simply drag a finger across words (the pen follows).
- **The question tab** above the file card: the question in 22 px with a small question-shape badge (geometry: a circle with **?**).
- **The file card** (440 × 96 px, manila): the sentence frame with a gap: "Bees live ______." in 24 px.
- **Atlas** — library `zoo-animals/armadillo`, 96 px, sitting on the file card's left corner.
- **The drawer** (right of the file card at 704: 70 × 96 px; on phones a row of small card-edges under the file card).
- **Task line (EN):** "Read the fact. Swipe the highlighter over the words that answer the question."

**At 360 px:** fact card full width (328 px), picture 80 px above the text (not beside), text 22 px; file card 328 × 84; Atlas 64 px; Check at ≈ 640 px for the two-sentence level (above 740); at 320 × 640 text 20 px, picture 72 px, Check ≈ 600.

No words on the apparatus except the text and the frames (content).

## 5. The hand
- **Highlight:** pointerdown on a word starts a stripe; dragging extends it word by word (snap to whole words, even across the line break); release lifts the words into the file card's gap (180 ms lift + 260 ms flight). A tap on a single word highlights just that word.
- **Undo:** tap the words in the file card → they fly back and the stripe fades. Highlighting new words replaces the old ones.
- **Tap the fact text** (long-press 500 ms): TTS reads that sentence where a voice exists; the sentence underlines while read.
- **Keyboard:** Tab into the text; Left/Right move a word cursor; Shift+Left/Right extends the highlight; Enter lifts it; Escape clears.
- **Level 2/3 (fact file):** drag a whole sentence strip (Level 2) or a word tile (Level 3) into a drawer (see §6).
- **Free play:** between rounds the highlighter can be swiped anywhere on the finished card; Atlas rolls when tapped.

## 6. The rounds
### Level 1 — Find the answer (RI.K.1) · 9 facts per pass, ONE question each, order-only reshuffle
Every fact now carries TWO authored questions — one answered in sentence 1, one in sentence 2 — and each answer is the other question's trap. The pass picks one question per fact so the answer sits in sentence 1 in 4 or 5 of the 9 rounds; the next pass takes the other question of each fact. (The first draft kept the old single questions, whose answers sat in sentence 2 in **8 of 9** rounds — "always grab the end of the second sentence" would have passed. The old eight questions are all kept as the S2 questions.)
| # | picture | fact (EN, kept) | Q-S1 → answer span · frame | Q-S2 (kept) → answer span · frame |
|---|---|---|---|---|
| 1 | spring/bee | Bees live in a hive. They make sweet honey. | Where do bees live? → **in a hive** · "Bees live ______." | What do bees make? → **sweet honey** · "Bees make ______." |
| 2 | forest-creatures/frog | A frog has long legs. It eats little bugs. | What does a frog have? → **long legs** · "A frog has ______." | What does a frog eat? → **little bugs** · "A frog eats ______." |
| 3 | beach/sun | The sun gives us light. It shines in the day. | What does the sun give us? → **light** · "The sun gives us ______." | When does the sun shine? → **in the day** · "The sun shines ______." |
| 4 | winter/penguin | A penguin has black wings. It lives on cold ice. | What does a penguin have? → **black wings** · "A penguin has ______." | Where does a penguin live? → **on cold ice** · "A penguin lives ______." |
| 5 | insects-and-bugs/spider | A spider spins a web. It has eight legs. | What does a spider spin? → **a web** · "A spider spins ______." | How many legs does a spider have? → **eight legs** · "A spider has ______." |
| 6 | tree/apple | A big tree grows tall. It gives us cool shade. | How does a big tree grow? → **tall** · "A big tree grows ______." | What does a tree give us? → **cool shade** · "A tree gives us ______." |
| 7 | farm-animals/cow | A cow eats green grass. It gives us white milk. | What does a cow eat? → **green grass** · "A cow eats ______." | What does a cow give us? → **white milk** · "A cow gives us ______." |
| 8 | weather/rainy | Rain falls from clouds. It makes the ground wet. | Where does rain fall from? → **clouds** · "Rain falls from ______." | What does rain make wet? → **the ground** · "Rain makes ______ wet." |
| 9 | forest-creatures/owl | An owl sleeps in the day. It hunts at night. (NEW) | When does an owl sleep? → **in the day** · "An owl sleeps ______." | When does an owl hunt? → **at night** · "An owl hunts ______." |

Pictures (all opened by the critic 2026-10-17): `spring/sun`, `spring/rain` and `camping/pine_tree` do not exist — the sun is `beach/sun`, the rain is `weather/rainy` (a cloud with drops), the tree is `tree/apple` (the theme holds fruit trees only; its label "Apple" is never shown). The spider is `insects-and-bugs/spider` because it clearly shows EIGHT legs — a picture that contradicted "eight legs" would teach a child to doubt the text. With Pictures on, rounds 2, 4 and 5 can be partly seen in the picture; that is why the trap is always another true fact from the same text, and why Pictures off exists.

**What counts as an answer.** Each round has an authored *answer span* (bold above) with a *core word* (the last word: hive, honey, legs, bugs, light, day, wings, ice, web, legs, tall, shade, grass, milk, clouds, ground, day, night). A highlight is:
- **right** if it contains the core word and lies inside the answer span — *hive*, *a hive* and *in a hive* are all right. On success the missing words of the span slide in from the text, outlined, so the card ALWAYS reads the authored sentence (*Bees live in a hive.*), never *Bees live hive.*
- **an echo** (not a miss) if it contains the whole answer span plus words from the same sentence (*It lives on cold ice*): the card shows the doubled words in amber, then the extra words peel back into the text one by one, and the round succeeds — the child SEES which part answered.
- **a miss** in every other case, including the trap (the other sentence's answer).
The sv/da/no/fi/de/fr/es/pt/it/nl rounds need the S1 question and frame authored by hand (the six shipped sets have only the S2 question).

### Level 2 — Fill the fact file (G2-318, G2-339) · 7 animals
A five-sentence text; five drawers labelled with the fact-file headings (content words): **eats · lives · moves · is covered in · babies**. The child drags each sentence strip into its drawer. A sentence in the right drawer *shrinks to its key detail* (the other words fade out: "It nibbles grass and carrots." → **grass and carrots**) and the drawer slides shut. **No sentence repeats its drawer's heading word** (it *nibbles* / *munches* / *catches*, its *home is*, it *hops* / *swims*, *… keeps it warm*, *baby …s*) — otherwise sorting would be matching a word, not reading for meaning. The gate asserts that no sentence contains its own heading verb (eats / lives / moves / covered), and only the babies drawer may share a stem (*baby*). Then the **claim step** (G2-339): three claim cards; the child flicks each into the open file ("true — it's in the file") or into the tray ("not in the file").
| # | animal (picture) | eats | lives | moves | is covered in | babies | claims (true, true, false) |
|---|---|---|---|---|---|---|---|
| 1 | forest-creatures/rabbit | grass and carrots | in a hole in the ground | hops on strong back legs | soft fur | are called kits | A rabbit has soft fur. / A rabbit hops. / A rabbit lives in the sea. |
| 2 | farm-animals/duck | plants and little bugs | on a pond | swims with webbed feet | waterproof feathers | hatch from eggs | A duck can swim. / Duck babies hatch from eggs. / A duck has fur. |
| 3 | forest-creatures/frog | flies and bugs | near ponds | jumps and swims | smooth, wet skin | start as tadpoles | A frog jumps. / A frog has wet skin. / A frog eats grass. |
| 4 | winter/penguin | fish | on cold ice | waddles and swims | thick feathers | hatch from eggs | A penguin swims. / A penguin eats fish. / A penguin can fly. |
| 5 | forest-creatures/turtle | plants and worms | in and near water | walks slowly and swims | a hard shell | hatch from eggs | A turtle has a shell. / A turtle walks slowly. / A turtle runs fast. |
| 6 | forest-creatures/owl | mice and bugs | in a hole in a tree | flies without a sound | soft feathers | are called owlets | An owl can fly. / An owl eats mice. / An owl sleeps at night. |
| 7 | zoo-animals/armadillo (Atlas's own file) | ants and beetles | in a burrow | digs with strong claws | hard plates | are called pups | An armadillo digs. / An armadillo has hard plates. / An armadillo lives in a tree. |
Text = five sentences in a fixed natural order, written so the heading word is never in its own sentence. The seven EN texts:
- rabbit: "A rabbit nibbles grass and carrots. Its home is a hole in the ground. It hops on strong back legs. Soft fur keeps it warm. Baby rabbits are called kits."
- duck: "A duck gobbles plants and little bugs. Its home is on a pond. It swims with webbed feet. Waterproof feathers keep it dry. Baby ducks hatch from eggs."
- frog: "A frog catches flies and bugs. Its home is near a pond. It jumps and swims. Its skin is smooth and wet. Baby frogs start as tadpoles."
- penguin: "A penguin catches fish. Its home is on cold ice. It waddles and swims. Thick feathers keep it warm. Baby penguins hatch from eggs."
- turtle: "A turtle munches plants and worms. Its home is in and near water. It walks slowly and swims. A hard shell keeps it safe. Baby turtles hatch from eggs."
- owl: "An owl catches mice and bugs. Its home is a hole in a tree. It flies without a sound. Soft feathers keep it warm. Baby owls are called owlets."
- armadillo: "An armadillo digs up ants and beetles. Its home is a burrow. It digs with strong claws. Hard plates keep it safe. Baby armadillos are called pups."
The strips are shuffled on the tray. (The table's key-detail columns are unchanged; "is covered in" now reads its detail from "… keeps it warm/dry/safe".)

### Level 3 — Word-bank file (G2-340, G2-341)
Same seven animals; **the five-sentence text stays visible above the drawers** (the answer is always checked against it — this is still reading, not recall). Each drawer shows a frame with a gap: "A rabbit eats ______." · "A rabbit lives ______." · "A rabbit moves: it ______." · "A rabbit is covered in ______." · "Its babies are called ______." The **word bank** holds the five key-detail tiles plus one trap tile from another animal (rabbit's trap: *fish*). A tile is right only in the frame whose sentence in the text contains it — one right answer per frame, by the text. The child drags tiles into frames. Done → the file prints its **three-sentence summary** (G2-341): the child taps the three drawers they like most, and the card writes them out as three sentences in the child's chosen order ("A rabbit eats grass and carrots. It hops on strong back legs. Its babies are called kits.") — the "write three sentences" sheet as a choosing act.

**Answer position.** Level 1: the answer sits in sentence 1 in 4 or 5 of 9 rounds per pass (two questions per fact, above) and the trap is always in the other sentence; the gate measures the sentence split per pass and that the answer is not reliably the last words of the fact (≤ 5 of 9 rounds). Level 2: strip order shuffled; claim order shuffled, the false claim in each position 2–3 times per pass. Level 3: tile order shuffled.

## 7. Check, the misses, the success
- **Check with nothing highlighted** → no miss; the highlighter wiggles. Hint: "Swipe the highlighter over the words that answer."
- **Miss 1:** the frame reads the child's words in place (*Bees live sweet honey.*) for 1.4 s with the caught words in amber; then they fly back to the text and keep a faint yellow trace. The card does not shut. Hint: "Read the card. Does it answer {question}?"
- **Miss 2:** the question's signpost word lights in BOTH places — in the question and in the text (*live* … *live*) with a dotted arc between them; the sentence that holds the answer is full ink, the other fades to 40 %. Hint: "Find the question's word in the fact. The answer is right next to it."
- A new highlight removes the signposts until the next Check.
- **Success:** the words settle, the frame becomes a full sentence, Atlas curls into a ball and rolls across the card, the gold paw-dot stamps, the card slides into the drawer. Bubble: "{frameFilled} You found it in the fact!" e.g. "Bees live in a hive. You found it in the fact!"
- **Level 2 misses:** a strip in the wrong drawer will not shrink — it sticks out of the drawer, the drawer cannot close, and it slides back (miss 1: "That fact is about how it {heading}? Read it again."); miss 2: the strip's key verb lights (*eats*, *lives*, *hops*, *covered*, *babies*) and so does the matching drawer label. Claim step: a claim flicked to the wrong side — the file opens the drawer whose fact matches or contradicts it and shows them side by side (*A penguin can fly.* next to **waddles and swims**). Success: the file closes, its cover shows the animal picture and five filled headings; "Atlas's fact file about the {animal} is full!"

## 8. Settings
1. **Level:** Find the answer / Fill the fact file / Word-bank file.
2. **Help:** Pictures on / Pictures off — Level 1 shows or hides the subject picture (pictures off = pure text evidence; the board visibly changes).

## 9. Words (EN source)
- title (frozen page title stays) — stage title "Atlas's Fact Files" · instruction L1 "Read the fact. Swipe the highlighter over the words that answer the question." · L2 "Put each fact in its drawer." · L3 "Drag a word from the word bank into each sentence."
- hints: empty "Swipe the highlighter over the words that answer." · miss1 "Read the card. Does it answer {question}?" · miss2 "Find the question's word in the fact. The answer is right next to it." · L2miss1 "Is that fact about what it eats, where it lives, how it moves, what it is covered in, or its babies?" · L2miss2 "Look for the word that tells you which drawer." · claimMiss "Look in the file. Does it say that?"
- celebrations: "{frameFilled} You found it in the fact!" · "Atlas's fact file about the {animal} is full!" · L3 "Here are your three facts about the {animal}!"
- drawer labels: "eats" · "lives" · "moves" · "is covered in" · "babies" · tray "not in the file".
- aria: highlighter "Highlighter — drag across words" · word "{word}, word {i}" · file card "Answer card: {frame}".
- **Locale traps.** Frames must be authored per locale with agreement (fr "Les abeilles vivent ______." — the plural verb; de verb-second "Bienen leben ______."; fi case: the answer span carries its case ending — *pesässä* — so the frame is "Mehiläiset asuvat ______." and the accepted span is the inflected word; the highlighter snaps to words, never to stems). Article inside spans: allow spans with or without the article where the language has one; fi/sv/da/no definite suffixes stay in the word. Number words (*eight*) are written as words in the fact (the content), so no digit/word mismatch. es is es-MX (armadillo stays *armadillo*, per the old file's note). "Babies are called kits/owlets/pups" — young-animal names differ per language: author per locale (de *Jungtiere*, fi *poikaset*); if a language has no special word, the fact becomes "Its babies are born in …" — never translate "kits". "Is covered in" → de "hat … am Körper", sv "har …" — the drawer label is the locale's school fact-file heading (the reviewer checks against the G2 worksheet strings).

## 10. Sound off, access, phones
- Legible with sound off: everything is text plus the subject picture; TTS (long-press a sentence) is help, never required.
- Keyboard: §5. Screen reader: the text is real text; highlights announced ("highlighted: in a hive").
- Taps: words are ≥ 44 px tall targets (line height); highlighter 36 × 120; strips 52 px tall; tiles 48 px.
- Pictures 110 px at 704, 80 px at 360 (Atlas 96 / 64). Check above the fold at 360 × 740 and 320 × 640 for Level 1; Levels 2–3 scroll the drawer row under the text with Check pinned under the drawers (≤ 720 px at 360).

## 11. Distinct from
- **#063 Fable's Picture Stories (The Bookmark)** answers story questions by marking a page and a picture; Atlas works on informational TEXT and the answer is lifted out of the words themselves.
- **#071 Linc's Domino Track** links two facts; **#070 Nila's Umbrella** finds the big idea over details. Atlas is the single key detail.
- **#230 Search Lens** frosts what was looked at; the highlighter marks a *span* and moves it — different act, different skill.

## 12. Build plan
- **Core** `AtlasFactFilesCore`: `tokens(text)` (word list with sentence index); `grade(round, span)` → `{ok, core, extra, trapHit, echo}` where ok = span ⊇ core and span ⊆ maxSpan (echo = span includes question words — ok but trimmed); `drawerGrade(animal, strip, drawer)`; `claimGrade(animal, claim, side)`; `tileGrade(frame, tile)`; `summary(animal, picks, order)`.
- **Gate's truth** (`verify-atlas-fact-files-core.js`): for every locale's rounds — both questions exist; the S1 answer is in sentence 1 and the S2 answer in sentence 2; every pass has 4 or 5 S1 rounds; the core span appears verbatim in the fact; the trap span appears verbatim and does NOT contain the core; the frame with the core inserted equals a fixed authored "answer sentence" (written into the gate's own table, not derived); every Level-2 key detail appears verbatim in its sentence; each false claim contradicts or is absent from the file; answer-sentence balance per pass ≤ 5 of 9.
- **Mutations:** accept any span · accept the trap span · accept a span that is a superset of the whole fact · lift partial words (no word snap) · drawer accepts any strip · claim step accepts the false claim as true · answers always in sentence 2 · a bare core word accepted without the span sliding in (card reads "Bees live hive.") · a Level-2 sentence containing its own heading verb · same strip order every pass · pictures-off setting still shows the picture. All killed.
- **Pictures (critic, 2026-10-17, opened):** spring/bee, beach/sun (face), weather/rainy (cloud with drops), tree/apple (a big tree — the label is never shown), winter/penguin (black wings), insects-and-bugs/spider (eight legs), forest-creatures/frog, owl, rabbit, turtle, farm-animals/cow, duck, zoo-animals/armadillo (side view, banded shell — reads as an armadillo). spring/sun, spring/rain and camping/pine_tree do not exist.
- **Risks:** fi/sv/da/no new rounds need native authoring; the fact file's young-animal names need checking per locale. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a squeaky highlighter, words that peel off the page, an armadillo that rolls across your card, and a file you fill yourself.
2. **Teacher on the board?** Yes — it enacts "show me where it says that": the only way to answer is to point at the evidence.
3. **Parent trust?** Real facts, library pictures, no guessing cards, no scores.
4. **Invention:** the highlighter lifts the words you found into the question's own sentence — if they really answer it, the card reads true and snaps shut.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **Answer-position tell:** the kept questions put the answer in sentence 2 in 8 of 9 rounds ("grab the end of the second sentence" would pass) while the draft claimed a 4/5 balance. Every fact now has two authored questions (one per sentence, each the other's trap); a pass takes one per fact → 4–5 sentence-1 rounds, gate-measured. All old questions are kept as the sentence-2 set.
- **The span rule contradicted itself** (echo spans both accepted and excluded; a bare core word made "Bees live hive."). Now: right = core inside the span, and the rest of the span slides in so the card always reads the authored sentence; an echo is shown and trimmed visibly, never a miss.
- **Level 2 was word-matching:** each sentence contained its own drawer heading ("It eats…" → *eats*). All seven texts rewritten so no sentence repeats its heading verb (gate-asserted). Level 3 keeps the text visible so each frame has one answer by the text.
- **Pictures:** spring/sun, spring/rain, camping/pine_tree do not exist → beach/sun, weather/rainy, tree/apple; the spider is the eight-legged insects-and-bugs/spider, so the picture never contradicts the text. All opened on contact sheets.
