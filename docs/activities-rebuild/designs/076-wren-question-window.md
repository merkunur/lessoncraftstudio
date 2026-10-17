# Row 76 — The Question Lamp (L.K.1.d)

## 0. Identity
- id `wren-question-window.question-words.l-k-1-d` (KEPT) · grade K · Common Core L.K.1.d (understand and use question words — who, what, where, when, why, how) · strand Language · page title (frozen) "Wren's Question Window — Ask the Right Word (Kindergarten)" · own files `mini tools/question-lamp-core.js`, `question-lamp-activity.js`, `question-lamp-activity.html`; manifest row stays in `wren-question-window-activities.json` (id, slugs, title, intro frozen), `tool` repointed.
- worksheets it covers: **G1-353** Question Words: Who, What, Where · **G1-373** Match the Question to the Answer · **G1-374** Fill In the Question Word · **G1-375** Sort the Answers: Who, What or Where · **G2-356** Write the Question · **G2-357** Ask About the Picture: Why and How.
- what the old activity did: Wren's diner window — a question with a blank ("___ would you like to eat?"), tap a question word. **Kept:** the diner window world, Wren's name, the six question words and the band order (who/what/where → when → why/how), the per-locale question sentences of de/fr/es/pt/it/nl as the panel's seed. **Changed because it was wrong:** several old items had **more than one right answer** ("___ do you like your eggs?" takes how, why, when and where; "___ would you like to eat?" takes what, where, when). Every round now shows the **answer first**, and the question word must ask for *that* answer — so exactly one word is right.

## 1. The pitch
"Every question word is a lamp that shines on one kind of answer — who on a person, where on a place, when on a time — so you choose the word that lights up the part of the answer we want."

## 2. Why a child will want it again (the fun)
- **A lamp that swings.** Over the counter of Wren's diner window hangs a brass lamp on a rail. Put a question word in the blank and press Check: the lamp swings along the rail (400 ms, a gentle pendulum overshoot) and its warm beam drops onto one part of the answer. When it lands on the gold-framed part, the frame and the beam melt into one glow and the answer *pops up* with a little bounce, read aloud (where TTS works).
- **The wrong word is interesting, not wrong.** Choose "where" when we wanted "who", and the lamp honestly swings to the kitchen picture instead: "where" asks about a place. Children start trying words just to see where the lamp goes after a round — free play the design invites.
- **The same picture strip, three questions.** Each answer sentence comes back with a different part framed, so a child sees "who", "what" and "where" pull the lamp to three different spots of the same sentence.
- **The question tour (the earned show).** When the third question about one answer strip is solved, the lamp does a tour on its own: it hops from chunk to chunk along the strip, and for each hop the matching key lifts out of the tray and slots into the blank — "Who…?" lights the chef, "What…?" the pancakes, "Where…?" the kitchen — one rising chime per hop, then all chunks glow together. The child sees one sentence answer every question it can, and keys they never chose get their moment.
- **The window fills.** Each finished question becomes a little order slip pinned along the top of Wren's window (the question and its lit answer); across a pass the window frame is lined with them.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** each question word asks for one kind of answer — who (a person), what (a thing), where (a place), when (a time), why (a reason), how (the way something is done) — choose it (G1-374), match questions to answers (G1-373), sort answers (G1-375), write it (G2-356), and ask about why/how (G2-357).
- **Misconception 1 — "any question word starts a question."** The beam shows what each word points at; a mismatched word lights a different part.
- **Misconception 2 — who / what for people and things** (and "what" for a place). The lamp distinguishes a person picture from a thing picture from a place picture.
- **Misconception 3 — when vs where** (both "a setting"). Time chunks show a sun, a moon, a snowman; place chunks show a kitchen, a garden, a garage. The lamp never confuses them.
- **Misconception 4 — why vs how.** "because…" chunks vs "with / on…" chunks.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 500 × 460):
- **The window frame** (top, 500 × 70): Wren's diner hatch, drawn wood frame; pinned order slips along it (finished rounds).
- **The question strip** (y = 84, 480 × 64): the question sentence (Nunito 26 px bold) with a blank slot 120 × 48 (dashed). Question mark and capital per locale.
- **The lamp rail** (y = 166, 480 × 8) with the **lamp** (drawn brass shade 56 × 40 on a stem). At rest it hangs over the strip's middle.
- **The answer strip** (y = 250, 480 × 150): the answer sentence as **chunk cards** in reading order, each 100 × 150 with a 6 px gap (four picture chunks + the 72-px verb card = 496 px, so the 5-chunk strips F, J, K, L fit the 500-px stage on one line): the **library picture 96 px** on top and the words under it (Nunito 18 px). The verb chunk has no picture (word card only, 72 px wide). One chunk carries a **gold frame** (4 px `#E8A53A`) — the part the question must ask about.
- **The key tray** (bottom, 480 × 64): the level's question-word keys (3, 4 or 6) as brass tags 104 × 52 (word 22 px), in the fixed canonical order who, what, where, when, why, how (the locale's equivalents in their natural teaching order).
- **Task line** above (≤ 24 px). **Bubble** in the right column.

**At 360 px** (stacked; stage 360 × 600): question strip 360 × 56 (text 20 px, blank 96 × 40); lamp rail 340 wide; answer strip wraps to 2 rows of 3 chunk cards 104 × 128 (pictures **64 px**, words 15 px); key tray 3 × 2 tags 108 × 48; Check under the bubble: Check bottom ≤ 720 at 360 × 740 (the 6-key level), ≤ 630 at 320 × 640 with the 3-key level (6-key at 320: answer strip chunk cards 96 × 118, keys 96 × 44).

Words on the stage are content (the question, the answer, the question words). No other words.

## 5. The hand
- **Drag a key** into the blank (or tap a key — it flies into the blank, 200 ms). The question reads as one sentence (the key's word takes the sentence-initial capital where the language needs it). Drag another key over it to replace; drag it out to empty the blank. The lamp does **not** move yet — reading the whole question comes first.
- **Check:** the lamp swings to the chunk whose *kind* matches the key (400 ms ease with a 6 % overshoot), the beam fades in (200 ms), a soft "ting". If no chunk of that kind is in the sentence, the lamp sweeps the whole rail once and its beam lands on the empty counter edge (the sentence has no answer of that kind).
- **Free play after a round** (and on any finished round slip): tapping keys swings the lamp freely so the child can see where every word points — this is allowed only once the round is solved, so it never gives the answer away.
- **Write it** (setting, G2-356): the blank becomes a write box; a letter keyboard types the question word (accents and ¿ handled by the locale keyboard).
- **Sort level:** drag answer cards into trays under three fixed lamps (§6).

## 6. The rounds
One round = one question (or one sort board). Every round has exactly one right key: the answer strip contains exactly one chunk of each kind it uses, and the gold frame decides.

**Level 1 — who · what · where (G1-353, G1-374), 9 rounds,** keys who / what / where. Three answer strips, each asked three ways:
- **A** "The chef | cooks | pancakes | in the kitchen." — occupations/chef · breakfast/pancake · around-the-house/kitchen
- **B** "The waitress | carries | milk | to the table." — occupations/waitress · breakfast/milk · furniture/table
- **C** "In the garden, | the farmer | picks | apples." — spring/garden · occupations/farmer · fruits/apple (place FIRST, so the person is not always the first card and "gold first = who" is never a rule)

| # | strip | framed | question (EN) | key |
|---|---|---|---|---|
| 1 | A | chef | "___ cooks the pancakes?" | Who |
| 2 | B | milk | "___ does the waitress carry?" | What |
| 3 | C | garden | "___ does the farmer pick apples?" | Where |
| 4 | A | pancakes | "___ does the chef cook?" | What |
| 5 | B | table | "___ does the waitress carry the milk?" | Where |
| 6 | C | farmer | "___ picks the apples?" | Who |
| 7 | A | kitchen | "___ does the chef cook the pancakes?" | Where |
| 8 | B | waitress | "___ carries the milk?" | Who |
| 9 | C | apples | "___ does the farmer pick?" | What |
Pass 2 swaps strip C for **D** "In the garage, | the firefighter | washes | the truck." (around-the-house/garage · occupations/firefighter · vehicles/truck). The questions stay exactly as in the table (questions do not depend on the strip's word order).

**Level 2 — + when, 8 rounds,** keys who / what / where / when. Strips with a time chunk (pictures: beach/sun = in the morning — weather/sun has no lcs-pictures label, space/moon = at night, winter/snowman = in winter):
- **E** "In the morning, | the baker | bakes | bread." (beach/sun · occupations/baker · bakery/baguette)
- **F** "The chef | washes | the pots | in the kitchen | at night." (… · kitchen-tools/pot · around-the-house/kitchen · space/moon)
- **H** "The firefighter | drinks | milk | in the morning." (occupations/firefighter · breakfast/milk · beach/sun)
- **I** "The farmer | wears | a scarf | in winter." (occupations/farmer · clothing/scarf · winter/snowman)

Rounds:

1 "___ does the baker bake bread?" → When (E, sun) · 2 "___ bakes bread in the morning?" → Who (E) · 3 "___ does the chef wash the pots?" → When (F, moon) · 4 "___ does the chef wash the pots at night?" → Where (F, kitchen) · 5 "___ does the chef wash at night?" → What (F, pots) · 6 "___ does the firefighter drink milk?" → When (H, sun) · 7 "___ drinks milk in the morning?" → Who (H) · 8 "___ does the farmer wear a scarf?" → When (I, snowman).
Key balance: when 4, who 2, where 1, what 1 — the new word gets the weight; the gate checks every key appears.

**Level 3 — why · how (G2-357), 8 rounds,** all six keys. Strips with reason and manner chunks:
- **J** "The farmer | wears | a raincoat | because it is raining." (… · weather/raincoat · weather/rainy)
- **K** "The chef | stirs | the soup | with a spoon." (… · kitchen-tools/pot · kitchen-tools/spoon)
- **L** "The baker | goes to work | on a bicycle | in the morning." (occupations/baker · vehicles/bicycle · beach/sun)
- **M** "The waitress | wears | a scarf | because it is cold." (… · clothing/scarf · weather/cold)
Rounds: 1 J-why "___ does the farmer wear a raincoat?" · 2 K-how "___ does the chef stir the soup?" · 3 L-how "___ does the baker go to work?" · 4 M-why "___ does the waitress wear a scarf?" · 5 L-when "___ does the baker go to work on a bicycle?" · 6 K-what "___ does the chef stir with a spoon?" · 7 J-who "___ wears a raincoat because it is raining?" · 8 M-what "___ does the waitress wear because it is cold?" (why 2, how 2, when 1, what 2, who 1).

**Level 4 — Match the question to the answer (G1-373), 8 rounds.** The question is complete (its key already in it, the lamp hanging over its key); three answer cards (picture + phrase) wait in the tray; the child drops one into the empty reply slot. Check: the lamp's beam drops into the slot — the right kind turns the slot gold. EN: "Who bakes bread?" (the baker / a muffin / in the kitchen) · "What does the chef cook?" (pancakes / the chef / at night) · "Where is the cat sleeping?" (on the bed — furniture/bed / the cat / milk) · "When does the owl hunt?" (at night — space/moon / the owl — forest-creatures/owl / in the forest — camping/forest) · "Who sells the flowers?" (the florist — occupations/florist / the flowers / in the morning) · "Where do the fish swim?" (in the lake — camping/lake / the fish / at night) · "What does the farmer pick?" (apples / the farmer / in the garden) · "Where is the truck?" (in the garage / the truck / the firefighter).
**Level 5 — Sort the answers (G1-375), 7 boards.** Three lamps hang over three trays — who, what, where; six answer cards per board (two of each kind, pictures + phrase); drop each card in a tray. On Check each lamp shines on its own tray: a card of its kind glows in the beam, a card of another kind stays dark in it (the lamp only lights its own kind). Cards (picture + phrase): people — the chef, the waitress, the farmer, the firefighter, the baker, the florist, the gardener (occupations/…); things — pancakes (breakfast/pancake), milk (breakfast/milk), apples (fruits/apple), the truck (vehicles/truck), bread (bakery/baguette), a scarf (clothing/scarf), a spoon (kitchen-tools/spoon), a bicycle (vehicles/bicycle), tulips (spring/tulip); places — in the kitchen (around-the-house/kitchen), at the table (furniture/table), in the garden (spring/garden), in the garage (around-the-house/garage), at the lake (camping/lake), in the forest (camping/forest), at the playground (activities/playground), at the pool (summer/pool), at home (miscellaneous/house). Boards (who | what | where):
1 the chef, the farmer | pancakes, apples | in the kitchen, in the garden · 2 the waitress, the baker | milk, bread | at the table, at the lake · 3 the firefighter, the gardener | the truck, a scarf | in the garage, in the forest · 4 the florist, the chef | a spoon, a bicycle | at the playground, at the pool · 5 the farmer, the waitress | tulips, bread | at home, in the kitchen · 6 the baker, the firefighter | pancakes, a bicycle | in the garden, at the lake · 7 the gardener, the florist | milk, the truck | at the pool, in the garage. Every card appears at least once per pass; the six cards are shuffled per board so no two of one kind start side by side more than once.

**Answer position.** The correct key's position is the fixed canonical order, so position is a property of the word, not the round; balance is measured on the *keys*: per level every key is right at least once and no key more than 4 times in 9; the framed chunk's position in the strip varies (left, middle, right) roughly evenly (gate: no position > 50 %), AND for each kind the framed chunk sits in at least two different positions within a level (strips C/D/E put the place or time first) — so "the first card is always who" is false. Level 4: right answer card's tray slot 1/2/3 balanced (3/3/2); Level 5: card order shuffled. Bot "always who" ≤ 3/9 in Level 1.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with the blank empty:** hint, no miss — "Put a question word in the gap. Which part of the answer do we want to ask about?" and the gold frame pulses.
- **Miss 1:** the lamp swings to the chunk the chosen word asks about (or the empty counter edge) and stays there; the bubble names what the beam shows · "{Word} asks about {kind}: it lit up “{chunk}”. We want to ask about the gold part." (kind = a person / a thing / a place / a time / a reason / the way).
- **Miss 2:** small **kind tabs** appear under every chunk and on every key (a person tab = teal circle, thing = coral square, place = gold pentagon roof, time = plum clock face, reason = blue chevron, way = green wave — geometry only); the gold chunk's tab and its matching key's tab pulse together · "Find the key with the same mark as the gold part."
- **A new move takes the help away** (tabs vanish) until the next Check.
- **Success:** beam and frame merge in one glow, the framed chunk bounces, Wren's window gets a new pinned slip · "“{Question}” — “{answer}!” {Word} asks about {kind}."
- Level 4 miss: the beam drops into the slot but stays white; the card shows its kind tab · "That answer is {kind}. The question asks about {kind2}." Level 5: dark cards in a beam are the misses; miss 2 adds kind tabs.

## 8. Settings
1. **Question words:** Who, what, where (L1) · + when (L2) · + why, how (L3) · Match (L4) · Sort (L5) — via the level picker; the key tray shows 3/4/6 keys at rest.
2. **Answer:** Keys (default) · Write it (G2-356) — the tray becomes a keyboard at rest.

## 9. Words (EN source)
- title (shell): **Wren's Question Window** (frozen) · instruction: "Pick the question word that asks about the gold part of the answer."
- task lines: L1–L3 "Which question word asks about the gold part?" · L4 "Find the answer to the question." · L5 "Sort the answers under the lamps."
- hints/celebrations: §7 exactly; kind words: "a person", "a thing", "a place", "a time", "a reason", "the way".
- settings: "Question words", "Who, what, where", "Add when", "Add why and how", "Match", "Sort", "Answer", "Keys", "Write it". aria: "Question: {q}", "Answer part {n}: {chunk}", "gold part", "Lamp shining on {chunk}".

**Locale traps (every round is a literal per-locale string with a kind tag on each chunk; nothing is assembled by code):**
- **The question word's FORM depends on the sentence** in several languages, so each round's keys show the forms that round needs: fi (**kuka / mitä / mikä / missä / mihin / mistä / milloin / miksi / miten**: "Mitä kokki paistaa?" partitive, "Missä kokki paistaa?" vs "Mihin tarjoilija vie maidon?" to-where), de (**wo / wohin**: "Wohin trägt die Kellnerin die Milch?"), sv (**var / vart**), da/no (**hvor / hvorhen**), es (**dónde / adónde**, and **quién / quiénes**), fr (**que / qu'est-ce que / quoi**; "Qu'est-ce que le cuisinier prépare ?"), pt (**o que**, and pt-BR **"por que"** for why — never "porque", which is the *answer's* word), it (**chi / che cosa / dove / quando / perché / come**). A round's three-to-six keys are authored together so no two forms of one question word appear side by side.
- **Punctuation:** es opens with **¿**; fr puts a space before **?** (rendered with a narrow no-break space); the blank is sentence-initial → the key word is capitalised.
- **Word order** differs (V2 in de/nl/sv/da/no; inversion in fr), so the *answer strip's* chunk order is per-locale; the gold frame follows the chunk, not the position.
- **"Who" for animals:** no round asks "who" about an animal (en and several languages would use "what"/"which"); people only (occupations theme).
- **Time words:** "in the morning" with the sun, "at night" with the moon, "in winter" with the snowman — seasons are named, never months (southern-hemisphere neutral). No clock times (the Learning Clock owns time).
- **Occupation genders:** the library pictures have a visible gender (the waitress, the chef); the panel picks the matching noun (fr la serveuse, de die Kellnerin, es la mesera (MX), it la cameriera, pt a garçonete); de/fr/es/it/pt answers agree.
- The old de/fr/es/pt/it/nl diner questions are the panel's seed: each is kept only if a picture strip can carry its answer.
- Sound off: the beam and the gold frame are the whole feedback; TTS reads the finished question and answer.

## 10. Sound off, access, phones
- Silent legibility: the gold frame, the beam position, the kind tabs.
- Keyboard: Tab through keys, Enter puts a key in the blank, Delete empties it, Space = Check; Level 5: Tab to a card, Enter, arrows to a tray, Enter.
- aria-live: "The lamp shines on: in the kitchen — a place."
- Taps: keys 104 × 52 (108 × 48 at 360), cards ≥ 96 × 118.
- Pictures 96 px at 704, 64 px at 360.
- Phone: stacked; answer strip in two rows (reading order left→right, top→bottom; the gold frame follows); the window's pinned slips become a small counter of slip icons.

## 11. Distinct from
- **#230 Search Lens, #263 Covering Lens, #266 Map-Key Lens** — lenses that reveal or cover; here a lamp *points* a word at a part of a sentence.
- **#280 True Caption, #257 Word Class Frames** — sentence building/testing; no question-word mapping.
- **Row 77 Sunny-Side Diner (this batch)** — same diner world; it builds a compound sentence with an "and" coupler.
- **Premium story-line / reading-easel** — no question-word apparatus.
- No built activity points from a word to a part of a sentence.

## 12. Build plan
- **Core state** `{level, round:{question:{before, after}, keys:[{id, form, kind}], chunks:[{text, pic, kind}], framed}, blank:keyId|null, typed, lampAt, misses}`; functions `placeKey(id)`, `clearBlank()`, `typeWord(s)` → keyId|unknown, `check()` → `{ok, lampTarget:index|'none', kind}`, `kindOf(keyId)`, sort: `drop(card, tray)`, `checkSort()`.
- **Gate's own ground truth** (`verify-question-lamp-core.js`): its own table mapping question words (per locale, all forms) to kinds; per round: exactly one chunk has the framed kind, exactly one key maps to it, no two keys share a kind, every chunk kind used is ≤ 1 per strip; the lamp target for every key is the unique chunk of its kind or 'none'; key-balance caps; framed position ≤ 50 % in any slot; Level 4 slot balance; Level 5 every card's kind ∈ {who, what, where}. Locale: es questions start with ¿; pt "por que" never "porque" in a question; fi key forms present in the gate's form table; every picture exists and is colour.
- **Mutations:** lamp moves before Check (answer leak) · two keys with one kind · framed kind missing from the keys · lamp goes to the first chunk of a kind when two exist (forbidden data) · 'none' never produced · tabs visible before miss 2 · "who" asked about an animal · es ¿ missing · pt "porque" in a question · Level 5 lamp lights all cards.
- **Pictures to verify:** occupations chef, waitress, farmer, firefighter, baker, gardener, florist (seen 2026-10-17 — clear, single people; all in the theme JSON — mail_carrier is NOT in the JSON and is not used); breakfast pancake, milk; fruits/apple; bakery/baguette; kitchen-tools pot, spoon; furniture table, bed; spring garden, tulip; around-the-house kitchen, garage (seen — the kitchen is a room view, the garage a building: both read as places); vehicles truck, bicycle; beach/sun, weather rainy, raincoat, cold; space/moon; winter/snowman; clothing/scarf; camping lake, forest; forest-creatures/owl; spring/tulip; activities/playground; summer/pool; miscellaneous/house.
- **Risks:** a place picture that reads as a thing (garage = building) — the panel and the pedagogy reviewer confirm each place chunk is read as a place in its phrase ("in the garage").
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a swinging lamp that lands somewhere every time, and a gold glow when it is right.
2. **Would a teacher put it on the board?** Yes — "who points at the chef, where points at the kitchen" is the whole lesson, shown; and every round has exactly one right word (the old version did not).
3. **Would a parent trust it?** Yes — real pictures, honest feedback that shows rather than scolds, correct question forms in their own language.
4. **The invention:** each question word is a lamp that shines on one kind of answer — choose the word that lights the gold part.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **Answer tell removed:** in every strip the person was the first card, so "gold first card = who" solved Level 1 without reading. Strips C/D (and E) now put the place/time first ("In the garden, the farmer picks apples."); the gate asserts each kind is framed in ≥ 2 positions per level.
- **Sizing:** 5-chunk strips did not fit (5 × 112 > 500 px) — chunk cards are now 100 px (picture still 96) with a 72-px verb card: 496 px.
- **Level 5 was unspecified:** 7 exact sort boards (2 who · 2 what · 2 where each) with every card's picture named.
- **Level 4:** "When does the moon come out?" used the same moon picture for the subject and the answer → "When does the owl hunt?".
- **Fun:** the earned show — the question tour: when a strip's third question is solved, the lamp hops chunk to chunk while each key slots in turn.
- **Pictures:** weather/sun has no lcs-pictures label → beach/sun; added camping/forest, forest-creatures/owl, spring/tulip, activities/playground, summer/pool, miscellaneous/house to the verify list (all present in the JSONs).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
