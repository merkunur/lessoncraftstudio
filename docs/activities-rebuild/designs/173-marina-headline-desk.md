# Row 173 — Marina's Headline Desk → THE STAPLER THAT ONLY BINDS WHAT THE HEADLINE IS ABOUT (RI.2.2)

## 0. Identity
- **id** `marina-headline-desk.main-topic.ri-2-2` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv/da/no/fi get new slug, title and intro at build, grade 2) · CCSS RI.2.2 ("identify the main topic of a multiparagraph text as well as the focus of specific paragraphs within the text") · strand Reading: Informational Text · own files `headline-desk-core.js` (new), `marina-headline-desk-activity.js` (rewritten), html, `marina-headline-desk-activities.json` (stories kept, options rewritten, two levels added).
- **Frozen promise kept true:** "Marina the otter writes headlines at the news desk, and a headline has to say what a story is MOSTLY about. Read each short article, then tap the card that names its main topic — not one small detail it mentions, and not something off the page." Marina is now the library `zoo-animals/otter`.
- **Worksheets covered:** none mapped. The design adds the grade-2 half of the standard the old activity skipped: **multiparagraph** texts (Level 2) and **the focus of one paragraph** (Level 3).
- **Old activity:** 8 three-sentence articles, three cards each (topic / detail copied from a sentence / an unrelated "off-topic" line like "Spiders spin webs."), tap one. **Kept:** all 8 articles verbatim (EN and the de/fr/es/pt/it/nl locale articles), the three card roles. **Changed — a measured answer tell removed:** in every locale the topic card was the only card shaped like a headline starting with a question word ("How bees make their honey.", de "Wie …", fr "Comment …") — 8/8 rounds in all 7 locales — and the off-topic card shared no word with the article, so a child could answer without reading. New cards: all three are headline-shaped phrases; question-word starts are spread over all roles; the off-page card is a *neighbouring* topic that shares a word with the article (§6).

## 1. The pitch
"Lay the article's strips on Marina's desk, slot a headline on top and press the big stapler: it staples down only the strips that headline is really about — the main topic binds every strip into one neat article for the front page, a detail catches just its own strip while the rest blow away in the desk fan's breeze, and an off-page headline catches nothing at all."

## 2. Why a child will want it again (the fun)
- **A news desk with real office toys.** Marina (library otter, 96 px) sits behind the desk (a plain wooden board — apparatus geometry). The article arrives as loose paper strips — one sentence per strip, typed in a newspaper font — fanned across the desk. The library desk fan (`around-the-house/fan`, 72 px) stands at the desk's left edge; its strips' corners lift and settle in its breeze (the strips move, the picture only turns a few degrees left-right — no drawn blades).
- **THE STAPLER.** The library stapler (`classroom/stapler`, a chunky teal stapler, shown 120 × 96 px) waits at the top of the desk. Tap a headline card and it slides into the headline slot above the strips. Press the stapler — *ka-CHUNK* — and the magic happens: every strip the headline is about slides up under it and gets stapled into a tidy stack (one staple per strip, 120 ms each, *tik*). Strips the headline is not about get caught by the fan's breeze and flutter off the desk's edge, landing crumpled-flat on the floor band under the desk (a darker strip of the board), where they stay visible.
- **The front page.** When every strip is stapled, the bundle snaps flat into a front page in place — the headline grows to big letters above the article, a wave icon becomes the masthead (no words), and Marina's paw-print stamp lands on it — then it slides into the newsstand pile (one token per round).
- **The yellow paragraph (Level 3).** The same stapler, but only the highlighted paragraph is slid under its jaw: a headline staples only the yellow strips it is about — so the right one binds both yellow strips, a detail binds one, and the other paragraph's headline reaches for the plain strips and staples nothing yellow.
- **Free play:** at any time a child can drag a strip and drop it back on the desk, tap the fan for a stronger breeze (strips flutter more), or press the empty stapler for the satisfying *ka-CHUNK*.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RI.2.2):** name what a whole informational text is mostly about (main topic), including a text with two paragraphs, and name the focus of one paragraph.
- **Misconception 1 — "the main topic is the most interesting sentence"** (picks "A sailboat on a lake" for the wind article). **Push back:** the detail headline staples only the sailboat strip; the other two strips blow away. The child literally sees most of the article left out.
- **Misconception 2 — "anything about the same subject will do"** (picks "Where frogs sleep in winter" — about frogs, but not on the page). **Push back:** the neighbouring headline staples nothing: not one strip says it. The headline card itself lifts in the breeze.
- **Misconception 3 — one paragraph's focus is the whole topic** (Level 2: "Wings that work like flippers" for a two-paragraph penguin article). **Push back:** it staples the first paragraph's two strips; the second paragraph's two strips blow away — "half the article is missing".
- **Misconception 4 — a paragraph's focus is one of its details** (Level 3: "Short wings like flippers"). **Push back:** the stapler binds one of the yellow paragraph's two strips; the other yellow strip blows off.
- **The material decides by *aboutness*, recorded in the data** (each card lists the strips it covers); nothing on the screen says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: desk left (≈ 450 px), cards + bubble right (≈ 220 px). Stacked below.

**At 704 px:**
- **The desk** (440 × 320): the headline slot at the top (400 × 52, dashed outline when empty); under it the strips: 3 strips (Level 1) of 400 × 54 px or 4 strips (Level 2/3) of 400 × 48 px, 18 px serif text (line height 1.4, wraps to 2 lines max), slightly rotated (±1.5°) like real paper. In Levels 2–3 a 14 px gap and a thin rule separate the two paragraphs; in Level 3 the target paragraph's strips carry a yellow highlighter band.
- **The stapler:** library `classroom/stapler` at 120 × 96 px, top-right corner of the desk (every level).
- **The fan:** library `around-the-house/fan` at 96 px (64 px at 360) at the desk's left edge; the **floor band** (the desk's lower 36 px, a darker wood tone) is where blown strips land.
- **Marina:** `zoo-animals/otter`, 96 × 96, behind the desk at the right.
- **The newsstand** (top of the right column, 180 × 40): one tiny front-page token per finished round (drawn rectangles — a record, not pictures).
- **Cards** (right column): 3 (or 4) headline cards, 210 × 56, 18 px bold, sentence case, no full stop.
- **Task line (EN, 22 px):** Level 1–2 "Which headline is the whole article mostly about?" · Level 3 "Which headline fits the yellow paragraph?"

**At 360 px:** single column: task line → desk 328 wide (strips 312 × 50, 16 px text; Level 2 strips 312 × 44) with the stapler at the top-right corner (64 × 64 px picture, 64 px is the floor) and Marina at 64 px in the desk's top-left; the fan shrinks to 64 px at the left edge → cards 328 × 52 (16 px) → Check ≈ 690 px on 360 × 740 (Level 2's four strips are capped at 2 lines each, so the desk never exceeds 300 px and Check stays ≤ 700); at 320 × 640 text 15 px, cards 48 px, Check ≈ 620.
- **No words on the apparatus** except the article and the headlines (the content). The masthead is an icon.

## 5. The hand
- **Choose a headline:** tap a card → it slides into the headline slot (200 ms). Tap another → swap. Tap the slotted card → back to the column.
- **Press the stapler** (= Check): tap the stapler or the Check button. Covered strips slide up (160 ms each) and get a staple (*tik*); uncovered strips blow off (500 ms swirl) onto the floor band. The result stays for 1.2 s; on a miss the strips drift back to the desk.
- **Drag a strip** (free play): pick it up and drop it anywhere on the desk; it snaps back into reading order on the next press.
- **Long-press a strip or card** → TTS where a voice exists.
- **Keyboard:** Tab through cards; Enter slots one; S presses the stapler; F taps the fan.
- **Sound:** paper rustle, *ka-CHUNK*, *tik* per staple, a soft *whoosh* for blown strips, a page-snap *flap* and a stamp *thump* on success.

## 6. The rounds
Order-only reshuffle per pass; one right card per round; card order shuffled per round with the balanced table below.

**Level 1 — Story (the 8 kept articles; new cards)** strips = the 3 kept sentences.
| # | article (kept) | main topic (covers 1,2,3) | detail (covers one) | neighbour, off the page (covers none) | 4th card ("4 cards") |
|---|---|---|---|---|---|
| 1 | Bees live together in a busy hive. / They fly from flower to flower for nectar. / Back home, they turn the nectar into honey. | Bees and the honey they make | Visiting flowers for nectar (2) | How flowers grow from seeds | Living in a busy hive (1) |
| 2 | The sun warms the water in lakes and seas. / The water rises up and makes clouds. / When the clouds get heavy, rain falls down. | Where the rain comes from | How the sun warms the sea (1) | Rain boots for puddles | Clouds that get heavy (3) |
| 3 | A frog starts life as a tiny egg. / The egg hatches into a tadpole that swims. / The tadpole slowly grows legs and becomes a frog. | From a tiny egg to a frog | The egg hatching into a tadpole (2) | Where frogs sleep in winter | A tadpole growing legs (3) |
| 4 | Brushing keeps your teeth clean and strong. / It wipes away bits of food and sugar. / Clean teeth help you chew and smile. | Why we brush our teeth | Bits of food and sugar (2) | How a dentist fixes your teeth | Chewing and smiling (3) |
| 5 | Deep under a volcano, hot melted rock waits. / Pressure builds up until it pushes upward. / The rock bursts out as glowing hot lava. | A volcano erupting | Pressure building up (2) | Rocks at the beach | Glowing hot lava (3) |
| 6 | A library is full of books to borrow. / You pick a book and take it home to read. / When you finish, you bring it back for others. | Borrowing books from a library | Taking a book home to read (2) | How books are printed | Bringing a book back (3) |
| 7 | Moving air is what we call wind. / Wind can push a sailboat across a lake. / It can also turn the blades of a windmill. | What the wind can do | A sailboat on a lake (2) | Why lakes freeze in winter | Turning a windmill (3) |
| 8 | A seed needs sun, water, and soil to grow. / Its roots reach down for a drink. / Then a green shoot pushes up to the light. | What a seed needs to grow | Where roots reach down for a drink (2) | Sun hats for hot days | A shoot reaching for the light (3) |

**Level 2 — Two paragraphs (new; whole-article headline)** 4 strips (2 per paragraph).
| # | paragraph 1 / paragraph 2 | main topic (1–4) | one paragraph only (covers 2) | neighbour (none) | 4th card |
|---|---|---|---|---|---|
| 1 | Penguins are birds, but they cannot fly. Their short wings work like flippers in the water. / On land, penguins huddle close to stay warm. They take turns standing on the windy outside. | Penguins in water and on land | Wings that work like flippers (¶1) | Why some birds fly south | Taking turns on the outside (4) |
| 2 | Snow forms high up in cold clouds. Tiny drops of water freeze into ice crystals. / No two snowflakes are exactly alike. Each one has six sides, but its own pattern. | How snowflakes form and look | How water freezes in a cloud (¶1) | Sledding down a snowy hill | Six sides on every flake (4) |
| 3 | Your heart is a muscle about the size of your fist. It beats all day and all night. / Each beat pushes blood around your body. The blood carries food and air to every part of you. | The heart that keeps you going | How blood moves around your body (¶2) | Strong muscles in your legs | As big as your fist (1) |
| 4 | Ants live in big groups called colonies. Thousands of ants can share one nest. / Every ant has a job. Some find food, some guard the nest, and the queen lays eggs. | How ants live together | Who does what in an ant nest (¶2) | A queen in her castle | One nest for thousands (2) |
| 5 | The Moon goes around the Earth. One trip takes about a month. / Sunlight bounces off the Moon to reach our eyes. That is why the Moon seems to shine at night. | Facts about the Moon in our sky | Why the Moon seems to shine (¶2) | How stars twinkle at night | About one month (2) |
| 6 | Bakers mix flour, water, and yeast to make dough. The yeast makes tiny bubbles, so the dough grows. / Next, the dough goes into a hot oven. It bakes into a soft loaf with a crunchy crust. | From flour to a fresh loaf | Mixing flour, water and yeast (¶1) | A crunchy apple for lunch | A crunchy crust (4) |
| 7 | Sleep gives your body time to rest and grow. Children need about ten hours each night. / While you sleep, your brain sorts what you learned that day. That helps you remember it later. | Why sleep is so important | What the brain does at night (¶2) | Bedtime stories for children | Ten hours each night (2) |
| 8 | Trees take in air through their leaves. They give out the oxygen we breathe. / Trees are homes for many animals. Birds nest in branches and squirrels hide in holes. | Why trees help us all | Animal homes in trees (¶2) | Picking apples from trees | The oxygen we breathe (2) |
The one-paragraph card points at ¶1 in 3 rounds and ¶2 in 5.

**Level 3 — One paragraph (the yellow one; same 8 articles → 16 rounds, each paragraph lit once)**
| article | ¶ lit | fits the paragraph (covers both its strips) | a detail of it (covers one) | the other paragraph's headline (covers the other ¶) |
|---|---|---|---|---|
| penguins | 1 / 2 | Great swimmers that never fly / Huddling against the cold wind | Short wings like flippers / Taking turns on the outside | (each other's) |
| snow | 1 / 2 | Born high in a cold cloud / No two flakes are the same | Water drops that freeze / Six sides on every flake | (each other's) |
| heart | 1 / 2 | A muscle that never stops / Sending blood all around you | As big as your fist / Food and air in your blood | (each other's) |
| ants | 1 / 2 | Living in huge groups / A job for every ant | One nest for thousands / The queen lays the eggs | (each other's) |
| moon | 1 / 2 | The Moon's trip around Earth / Why the Moon seems to glow | About one month / Light reaching our eyes | (each other's) |
| bread | 1 / 2 | Making the dough grow / Baking the loaf | Flour, water and yeast / A crunchy crust | (each other's) |
| sleep | 1 / 2 | Rest for a growing body / Sleep helps you remember | Ten hours each night / Your brain sorts the day | (each other's) |
| trees | 1 / 2 | Leaves that clean the air / Homes in the branches | The oxygen we breathe / Squirrels hiding in holes | (each other's) |
"4 cards" adds the whole-article headline from Level 2 (too big: it reaches for all four strips, the plain ones are not under the jaw, and the stapler jams open — the yellow strips stay loose).

- **Shortcut bots, re-measured by the critic on the cards above (`work-c35/readbots.js` + `marina-c35.js`, EN; expected hits with random tie-break; chance = 2.67/8 with 3 cards, 2.00/8 with 4, 5.33/16 in Level 3):** Level 1 (3 cards) — longest 2.5, shortest 2.5, most article words 1.5, fewest 1.0, "pick a How/Why card" 2.3, "avoid How/Why" 1.8. Level 1 (4 cards) — all ≤ 2.5. Level 2 (3 cards) — longest 2.0, shortest 1.5, most words 1.0, fewest 1.5, pick-question-word 2.8, avoid 2.3. Level 3 (16) — longest 5.5, shortest 2.5, most words of the yellow paragraph 5.5, pick-question-word 5.7. Question-word starts now sit on topic 4, detail 2, neighbour 5 cards in Level 1 and topic 4, paragraph 5, neighbour 2 in Level 2, so neither choosing nor avoiding them helps. *(Critic: the designer's own cards had a neighbour that shared no word with the article in 4 rounds — wind "Why the sky is blue", seed "Why leaves fall in autumn", ants "Bees in a busy hive", bread "Why toast turns brown" — breaking rule 4 and leaving "the card that shares no word" as a free elimination; and the topic was the shortest or the most-overlapping card in 3–4 of 8. All rewritten.)* One cue stays on purpose: **the topic card names the noun the article repeats most** (4/8 L1, 4.3/8 L2) — that repeated noun IS the main topic, it is exactly what miss 2 underlines, and the neighbour card names it too in several rounds (frogs, teeth, books, birds, stars), so the cue only works for a child who has read which sentences it runs through. The gate holds every other bot ≤ 3/8 (L1–2) and ≤ 6/16 (L3) in every locale; native authors re-run it on their own locale.
- **Card position — a fixed balanced table, rotated +1 per pass:** Level 1 right-card slot 1,2,3,1,3,2,2,3 (slots 1/2/3 = 2/3/3); Level 2 3,1,2,2,1,3,3,1; Level 3 (16) 2,3,1,1,3,2,3,1,2,2,1,3,1,2,3,3 (5/5/6). "4 cards": the 4th card takes slot 4 in 2 of 8 rounds and the right card moves there in 2 of 8. Gate: no slot > 3 of 8 / 6 of 16.

## 7. Check, the misses, the success
- **Check (stapler) with no headline slotted** → no miss; the stapler chomps air (*ka-CHUNK*) and the slot glows. Hint: "Put a headline on top of the article first."
- **Miss 1 — what the desk SHOWS:**
  - detail → its one strip is stapled, the rest blow onto the floor band and lie there visibly. Hint: "That headline only holds one strip. What are ALL the strips about?"
  - neighbour → nothing staples, every strip blows away, the card flutters. Hint: "None of the strips talks about that. Read the strips again."
  - one-paragraph card (L2) → its two strips staple, the other paragraph's two blow away. Hint: "That fits only one paragraph. Find the headline for both."
  - L3 detail → the stapler binds one yellow strip; the other yellow strip blows off. Hint: "That is one small part. What is the whole yellow paragraph about?"
  - L3 other paragraph → the stapler jaw lifts towards the plain paragraph (not under it) and stays open; the yellow strips stay loose. Hint: "That fits the other paragraph. Look at the yellow one."
- **Miss 2 — the stronger showing:** the strips stay on the desk and Marina's highlighter underlines, in each strip, the words that talk about the same thing (one colour across all strips — "bees … they … they" for the bees article; "penguins … wings … penguins … they" in Level 2), so the thread running through every strip is visible. Hint: "Look at the underlined words. They are in every strip. Which headline says that?"
- A new card removes the help until the next press.
- **Success:** every strip stapled, the bundle snaps into the front page with the headline in big letters, Marina stamps it with a paw print, and it flies to the newsstand. Bubble: "Front page! '{headline}' — every strip is about that." (Level 3: "Stapled! '{headline}' — the whole yellow paragraph is about that.")

## 8. Settings (each visibly changes the board at rest)
1. **Level:** Story / Two paragraphs / One paragraph — at rest: three strips + stapler, four strips in two paragraphs + stapler, four strips with one paragraph highlighted yellow and slid under the stapler's jaw.
2. **Cards:** 3 / 4 — the card column shows three or four headline cards.

## 9. Words (EN source; native authors write the other 10)
- title (frozen) "Marina's Headline Desk" · instruction: "Read the strips. Put the headline on top and press the stapler." · task lines: "Which headline is the whole article mostly about?" · "Which headline fits the yellow paragraph?"
- hints: empty "Put a headline on top of the article first." · detail "That headline only holds one strip. What are ALL the strips about?" · neighbour "None of the strips talks about that. Read the strips again." · oneParagraph "That fits only one paragraph. Find the headline for both." · l3detail "That is one small part. What is the whole yellow paragraph about?" · l3other "That fits the other paragraph. Look at the yellow one." · miss2 "Look at the underlined words. They are in every strip. Which headline says that?"
- success: "Front page! '{headline}' — every strip is about that." · L3 "Stapled! '{headline}' — the whole yellow paragraph is about that."
- settings: "Level" — "Story" / "Two paragraphs" / "One paragraph" · "Cards" — "3" / "4"
- aria: strip "Strip {i}: {text}" (+ ", yellow paragraph") · slot "Headline: {text|empty}" · stapler "Stapler — press to check".
- **Card-authoring rules (every locale, the gate checks):** (1) all cards are headline phrases in sentence case, no final full stop, 14–34 characters (EN), similar length within a round; (2) question-word starts (How/Why/What/Where; de Wie/Warum/Was/Woher; fr Comment/Pourquoi; es Cómo/Por qué/Dónde; it Come/Perché; pt Como/Por que; nl Hoe/Waarom/Waar; sv Hur/Varför; da Hvordan/Hvorfor; no Hvordan/Hvorfor; fi Miten/Miksi/Mistä) appear on at least two different card roles per level; (3) the detail is a paraphrase of one strip, never a copy; (4) the neighbour shares a word with the article but its subject is not on the page.
- **Locale traps.** (1) Headline style: de/nl/sv/da/no/fi prefer noun phrases ("Bienen und ihr Honig"), fr/es/it/pt allow "Les abeilles et leur miel" — both fine; never Title Case in en (it would make the headline look different from the strips). (2) fr typography: no space before the apostrophe; « » only if quoting — the success line quotes the headline with the locale's quotes (de „…“, fr « … », sv/fi ”…”, da/no «…» or „…“ per native author). (3) The kept de/fr/es/pt/it/nl articles stay; their cards are rewritten to the rules (the kept topic cards "Wie Bienen Honig machen." etc. are the measured tell). (4) Pronoun chains used by miss 2 ("they … they") are found per locale by the native author and stored in the round as highlight spans — never computed. (5) Moon/Earth capitalised in en/de as proper names; lower-case "lune/terre" in fr/es/it/pt — follow each locale's school use.

## 10. Sound off, access, phones
- Legible with the sound off: stapled vs blown strips are visible; underlines on miss 2 are visual; TTS bonus.
- Keyboard §5; aria-live: "Stapled 1 of 3 strips. Two strips blew away." / "All 3 strips stapled."
- Reduced motion: strips fade to 30 % instead of swirling; the stapler's chunk is a single frame.
- Taps: cards 52–56 px, stapler 96–120 × 40–48 px, strips ≥ 44 px.
- Pictures: Marina 96/64 px.
- Check above the fold at 360 × 740 (≈ 700) and 320 × 640 (≈ 620).

## 11. Distinct from
- **Row 70 Nila's Idea Umbrella (RI.K.2)** — main idea of one short text: an umbrella that keeps sentences dry. Here the grade-2 standard (multiparagraph + paragraph focus) and a different act: binding loose strips into one article or one highlighted paragraph with a stapler while the rest blows away.
- **Row 79 About-Strings (W.K.2)**, **Row 121 Field Guide (text features)**, **Row 69 Highlighter**: other informational-text acts.
- **Siblings in this batch:** 174 (author's purpose — the reason a text was written) and 175 (reasons supporting a point) — different questions about the same kind of text.

## 12. Build plan
- **Core `HeadlineDeskCore`:** round `{id, level, paragraphs:[[s…],[s…]] | strips:[s…], lit?:0|1, cards:[{id, text, role:'topic'|'detail'|'paragraph'|'neighbour'|'other'|'whole', covers:[stripIdx…]}], highlights:[[start,end]…]}`; `press(round, cardId)` → `{stapled:[…], blown:[…], ok}` where ok ⇔ covers equals the target set (all strips; or the lit paragraph's strips); `slotOrder(level, round, pass)`; `shuffledOrder`; `nextTask`.
- **Gate's truth (`verify-headline-desk-core.js`):** an independent EN table of right cards and covers; for every locale and level: exactly one card whose covers = target; detail covers exactly one strip; neighbour covers none and shares ≥ 1 content word with the article (stemmed per locale) while never being a paraphrase of a strip (reviewer-signed flag); question-word starts occur on ≥ 2 roles per level; the five bots (longest, shortest, most-words, middle-words, question-word) ≤ 3/8 (L1–2) and ≤ 6/16 (L3), also with 4 cards; right-slot table ≤ 3/8 per slot; old article strips byte-equal to the kept data; highlight spans fall inside the strips.
- **Mutations (each killed):** detail staples all strips · neighbour staples one · paragraph card staples the whole L2 article · L3 accepts the other paragraph · a neighbour that shares no content word with its article · topic card again starts with a question word in every round · neighbour shares no article word · right card always slot 1 · stapler result shown before the press · 4-card setting has no effect · reshuffle repeats · a kept article sentence edited.
- **Pictures:** `zoo-animals/otter` ✓ (upright orange-brown otter; never beside the meerkat) · `classroom/stapler` ✓ (teal desk stapler, lies flat) · `around-the-house/fan` ✓ (desk fan, red-yellow blades, on a stand) — all seen on the contact sheets. No other object is drawn: desk, strips, floor band and newsstand tokens are apparatus. **Risks:** native authoring of the new Level 2–3 articles and cards in 10 locales (the build authors, one reviewer checks). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a chunky stapler that goes *ka-CHUNK*, strips that blow off the desk in a fan's breeze, and your own front page stamped with a paw print.
2. **Would a teacher put it on the board?** Yes — "what is it MOSTLY about?" becomes visible: the main topic holds every strip, a detail holds one, a neighbouring topic holds none; and it finally teaches the grade-2 half (two paragraphs, paragraph focus).
3. **Would a parent trust it?** Real, kind non-fiction about bees, rain, hearts and trees; library pictures; no score, no clock.
4. **The invention:** a stapler that only binds the article strips its headline is really about — so a detail keeps one strip and loses the rest to the breeze.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Four neighbour cards broke the design's own rule 4** (they shared no word with the article — wind, seed, ants, bread), which made "drop the card with no article word" a free elimination; and the topic was the shortest card or the most-overlapping card too often. Rewrote 13 cards (L1 rain, frog, volcano, library, wind, seed; L2 ants, bread) and re-measured every bot with my own script: all ≤ 2.5/8 in Levels 1–2 (chance 2.67) and ≤ 5.7/16 in Level 3 (chance 5.33). The one remaining cue — the topic names the repeated noun — is recorded as the skill itself.
- **Hand-drawn objects removed:** the stapler and the fan are now the library pictures `classroom/stapler` and `around-the-house/fan` (seen); the drawn paper clip, wastepaper basket and printing press are gone — Level 3 uses the same stapler on the yellow paragraph, blown strips land on the desk's floor band, the front page forms in place.
- Kept: the 8 articles verbatim, the stapler invention, the multiparagraph and paragraph-focus levels that finally carry the grade-2 half of RI.2.2.
