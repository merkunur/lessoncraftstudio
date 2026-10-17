# New 276 — The Proof Tabs (RL.2.1)

## 0. Identity
- id `proof-highlighter.play.rl-2-1` · grade 2 · Common Core RL.2.1 (ask and answer who, what, where, when, why and how questions to show understanding of key details in a text) · strand Reading: Literature · files (key kept from the plan) `mini tools/proof-highlighter-core.js`, `proof-highlighter-activity.js`, `proof-highlighter-activity.html`, `proof-highlighter-activities.json`. Working title becomes **"The Proof Tabs — Answer from the Story"** (the instrument is a set of sticky page tabs, not a highlighter: a swipe-highlighter that lifts words into an answer is already Row 69's invention, *The Highlighter That Lifts Facts*, and must not be reused).
- worksheets it covers: **G2-254** Read and Answer · **G2-269 … G2-273** Reading Comprehension: Story 2–6 (all "Read the story carefully. Then circle the best answer to each question."). The worksheet's three-choice question is kept exactly; what the screen adds is the proof: no answer counts until its tab sits on the sentence that says it. The worksheet's level-1 "Sentence N" chips become the *Sentence numbers* setting.
- new instrument (no old activity).

## 1. The pitch
"Before you may answer, you stick the question's tab next to the sentence that says the answer — so every answer is one you found in the story, and the closed book shows a tab wherever you found one."

## 2. Why a child will want it again (the fun)
- **Real sticky tabs.** Each question card wears a fat coloured tab on its edge (Who teal, What plum, Where sky, When amber, Why rose — the colour belongs to the question WORD, never to right/wrong). The child peels it off with a little paper-tear *fffp*, carries it, and presses it into the book's margin beside a sentence: it sticks with a soft *pat*, the sentence gets a thin underline in the tab's colour, and the tab sticks out of the page edge like the tabs in a grown-up's well-read book. Children love tabs; teachers use exactly this close-reading routine.
- **The cards wake up.** Until a tab is in the book the three answer cards are blank cream slips (just their outline). The moment the tab sticks, the three answers type themselves onto the slips letter by letter (240 ms). The story is the key that opens the answers.
- **The earned show (end of a story).** The book closes. Its fore-edge now bristles with three (or five) coloured tabs at different heights — because the answers were in different places. The book then riffles open to each tab in turn (top to bottom): the proof sentence glows in the tab colour and the question and answer are read out underneath as one line: "Who brought a long ladder? — A park helper." Then the story's picture slides onto a little bookshelf strip at the bottom of the stage (one spine per story read, drawn geometry). No score.
- **Free play.** After a story is solved the child can peel any tab and re-stick it anywhere; a tab put back on its proof sentence clicks into place with the same glow. Between rounds the tabs can be fanned like a deck by dragging the stack.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.2.1 as the six worksheets mean it):** read a short three-paragraph story, read a who/what/where/when/why question, find the sentence that answers it and choose the answer that sentence gives. G2 adds the WHY question (a reason, usually after *because*/*so*), and an answer may sit in any paragraph.
- **Misconception 1 — answering from memory, from a first skim, or from the picture.** Pushback by mechanism: the answer cards are blank until a tab is in the story, and Check grades the tab's sentence as well as the card. A child who taps the right card from memory but tabs a sentence that does not say it gets the paragraph ring (§7) and must go back to the words. The story picture is never an answer and in six of the eight stories it is a *distractor* (a ladder for "What did Nora carry?", the gate for "Where did Sam find the egg?"): the picture trap catches a child who answers by looking.
- **Misconception 2 — answering a Why? with a What/When detail.** Every why-question's distractors are *true details from the same story* dressed as reasons ("because the wind blew hard near the pond", "because it was Monday"): the child can find those words in the text, but the tab test shows they sit in a different sentence from the reason, and the reason sentence is the one with *because/so*.
- **Misconception 3 — any answer of the right kind will do.** Every distractor is the same kind as the answer (Who → two other people *from the story*; Where → two other places *from the story*), so the question word alone cannot choose. Measured: a bot that picks the option whose words appear in the story wins a clear victory in only 5 of 40 questions (35 three-way ties), i.e. distractors are as "in the text" as the answers.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px**
- **The book (left, 430 × 470):** a drawn open-book page (cream `#FBF3E4`, 2 px ink edge, a soft spine shadow on the left). At the top a 96 × 96 library picture (§6 per story) beside the story title (Baloo 2, 22 px). Below, the three paragraphs, Nunito 19 px, line height 30 px, 16 px between paragraphs, each paragraph preceded by a tiny drawn pilcrow-free margin mark (a 6 px dot) so "paragraph" is visible. A 34 px **tab margin** runs down the right edge of the page: tabs stick here, vertically centred on their sentence. With *Sentence numbers* on, each sentence starts with a small grey superscript numeral (14 px).
- **The question column (right, 240 wide):** the question card (white, teal 2 px outline, 236 × ~92): question word large (Baloo 2, 26 px, in the question word's colour) then the rest of the question (Nunito 18 px). Its tab (44 × 56, rounded on the outer end) sticks out of the card's left edge. Below: three **answer slips** (236 × 56 each, 10 px gap, Nunito 18 px, up to 2 lines; blank = dashed outline only). Under them the feedback bubble (≤ 3 lines, 16 px) and Check.
- **The tab stack** (above the question card): the cards still to come show only their tabs fanned (each 18 px of colour), so the child sees "three more questions" without numbers.
- **Bookshelf strip** (bottom, full width, 40 px): one drawn spine per finished story.
- **Task line (≤ 24 px, never changes):** "Stick the tab next to the sentence that answers the question. Then choose the answer."

**At 360 px** (stacked)
- The book becomes a **three-page booklet**: one paragraph per page (340 × ~210, Nunito 18 px, line 28), with page buttons 1 · 2 · 3 (44 × 44, drawn dog-ears at the page's bottom corners) and a swipe between pages. Picture 64 × 64 beside the title on page 1 only. The tab margin (30 px) stays on the right; a tab placed on page 2 shows as a coloured nick on the booklet's edge whatever page is open.
- Below: question card (340 wide), the three slips stacked (340 × 52), Check. Measured budget at 360 × 740: header 56 + task line 52 + page 250 + question 88 + slips 3 × 52 + 2 × 8 + Check 52 → Check bottom ≈ 690 ≤ 740. At 320 × 640 the slips drop to 48 px and the page to 230 px; Check bottom ≈ 628 ≤ 640.
- Library pictures: one per story, ≥ 96 px at 704 / 64 px at 360. Nothing else on the stage is a picture; tabs, slips, book, spines are drawn geometry. No words on the apparatus except the story, the question and the answers, which ARE the content.

## 5. The hand
- **Peel a tab:** pointerdown on the question card's tab → the tab lifts (scale 1.08, 80 ms) and follows the finger; the *fffp* tear sound. Tap path: tap the tab (it lifts and pulses), then tap any sentence. Keyboard: Tab focuses the question card's tab, Enter lifts it, Up/Down walks the sentences (each focused sentence gets a dotted outline), Enter sticks.
- **Stick:** release over the page → the tab snaps to the margin beside the NEAREST sentence (sentence hit-boxes span the full line height; on a line holding the end of one sentence and the start of the next, the half of the line under the finger decides). 60 ms snap, *pat* sound, the sentence underlines in the tab colour (2 px), and the three slips type in their answers (240 ms). A tab dropped outside the page flies back to its card (no miss).
- **Move a tab:** drag it to another sentence any time before Check; the slips stay filled (the options do not change with the sentence — the proof is graded, not used to change the choices; see §12).
- **Choose:** tap a slip → it fills cream-to-white with a 2 px ink outline and a small drawn pin at its left (120 ms). Tap another to change. Keyboard: Up/Down + Enter.
- **Check:** see §7.
- **Undo:** everything before Check is movable; after a right answer the round's tab and slip lock.
- **Free play:** §2.

## 6. The rounds
One **round = one story**; inside it the questions come one at a time in a fixed order (who → what → where → when → why; setting 1 stops after where). 8 stories (≥ 7 required). Each question has exactly one right answer and one proof sentence. Order-only reshuffle per pass: the story order is permuted and never repeats the previous pass's order; the question order inside a story is fixed (it follows the worksheet).

**Content rules (gated, §12):** 6 sentences in 3 paragraphs, 2 sentences each, ≤ 20 words a sentence; the who/what/where answers sit in three DIFFERENT paragraphs in every story (setting 1 never lets a child answer three questions from one paragraph); across all five, no paragraph holds more than three answers; every distractor is the same kind as the answer and at least one of the two is lifted from another sentence of the same story (exempt only where every other time/reason in the story would also be TRUE for the question — the author then writes two plainly-false same-kind distractors, and the reviewer checks no distractor is nested-true: "in the cold ground" for "Where did they dig the holes?" was such a second right answer and is gone); the story picture never names an answer; every why-answer and its distractors share one connector (*because* / *so* / *to*) so the connector is no tell; answers are short phrases copied from the sentence (articles and pronoun subjects may change: "he feeds the hens").

**Measured on the EN set (critic re-measure, scratch `work-c36/c276.js`, parses this file's tables, 40 questions):** answer paragraph ¶1 15 · ¶2 8 · ¶3 17 (setting 1 alone: 8 · 8 · 8); answer length rank among its three options shortest/middle/longest 14 · 12 · 14 (strictly longest 14 of 40 = 35 %, chance 33 %); "pick the option most present in the story" bot: 3 clear wins (7.5 %), 37 ties (the 3 are when/why questions whose only other time or reason in the story would ALSO be true — a nested time like "at night" inside "last summer" — so no lifted distractor is honest there); every answer's content words occur in its proof sentence (0 exceptions); "pick the option sharing words with the question" bot: 0 wins.

**Story 1 — Nora's Kite** (picture tools/ladder)
- ¶1 — [1] On Saturday morning, Nora went to the park with her grandpa. [2] She carried her new kite under her arm.
- ¶2 — [3] The wind blew hard near the pond. [4] The kite flew up high, but then it got stuck in a tall tree.
- ¶3 — [5] Grandpa could not reach it, so after a while a park helper brought a long ladder. [6] Nora gave the helper a big hug because she was so happy to have her kite back.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who brought a long ladder? | **a park helper** ([5], ¶3) | Grandpa · Nora |
| what | What did Nora carry under her arm? | **her new kite** ([2], ¶1) | a long ladder · a big hug |
| where | Where did the kite get stuck? | **in a tall tree** ([4], ¶2) | near the pond · in the park |
| when | When did Nora go to the park? | **on Saturday morning** ([1], ¶1) | after a while · on Sunday night |
| why | Why did Nora hug the helper? | **because she was happy to have her kite back** ([6], ¶3) | because the wind blew hard near the pond · because Grandpa could not reach the kite |

**Story 2 — The Missing Egg** (picture around-the-house/gate)
- ¶1 — [1] Every morning, Sam feeds the hens on his aunt's farm. [2] One day, the brown hen did not lay an egg in her box.
- ¶2 — [3] Sam looked in the shed and behind the gate. [4] At last he found the egg under a pile of hay.
- ¶3 — [5] Aunt Rosa laughed when she saw it. [6] She said the hen hides her eggs because she likes a quiet place.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who laughed when she saw the egg? | **Aunt Rosa** ([5], ¶3) | the brown hen · Sam |
| what | What does Sam do every morning? | **he feeds the hens** ([1], ¶1) | he hides the eggs · he looks in the shed |
| where | Where did Sam find the egg? | **under a pile of hay** ([4], ¶2) | in her box · behind the gate |
| when | When does Sam feed the hens? | **every morning** ([1], ¶1) | every night · at last |
| why | Why does the hen hide her eggs? | **because she likes a quiet place** ([6], ¶3) | because Sam looked behind the gate · because Aunt Rosa laughed |

**Story 3 — The Sandcastle** (picture beach/sandcastle)
- ¶1 — [1] After lunch, Leo and his big sister Mia walked down to the beach. [2] They built a sandcastle with four towers.
- ¶2 — [3] Leo put a shell on top of each tower. [4] Later that afternoon, a big wave rolled in and washed one tower away.
- ¶3 — [5] Mia did not get cross. [6] Mia dug a deep ditch around the castle so the water could not reach it again.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who dug a deep ditch? | **Mia** ([6], ¶3) | Leo · a big wave |
| what | What did Leo put on each tower? | **a shell** ([3], ¶2) | a ditch · a wave |
| where | Where did Leo and Mia walk after lunch? | **down to the beach** ([1], ¶1) | around the castle · on top of a tower |
| when | When did they walk to the beach? | **after lunch** ([1], ¶1) | later that afternoon · late at night |
| why | Why did Mia dig a ditch? | **so the water could not reach the castle** ([6], ¶3) | so Leo could put a shell on each tower · so a big wave could roll in |

**Story 4 — Snow Day** (picture winter/sled)
- ¶1 — [1] When Ana woke up on Monday, the garden was white. [2] School was closed because of the deep snow.
- ¶2 — [3] Ana and her friend Tom pulled a sled up the big hill. [4] They slid down so fast that Tom's hat flew off.
- ¶3 — [5] In the evening, Ana's mom made hot soup. [6] Ana ate two bowls because she was cold and hungry.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who made hot soup? | **Ana's mom** ([5], ¶3) | Tom · Ana |
| what | What was closed because of the deep snow? | **school** ([2], ¶1) | the garden · the big hill |
| where | Where did Ana and Tom pull the sled? | **up the big hill** ([3], ¶2) | into the garden · to the school |
| when | When did Ana's mom make soup? | **in the evening** ([5], ¶3) | when Ana woke up · at lunch time |
| why | Why was school closed? | **because of the deep snow** ([2], ¶1) | because it was Monday · because Tom lost his hat |

**Story 5 — A Night in the Tent** (picture camping/tent)
- ¶1 — [1] Last summer, Kai camped in the woods with his mom. [2] They put up a small green tent next to a lake.
- ¶2 — [3] At night, Kai heard a strange hooting sound. [4] Kai's mom shone her flashlight up into a pine tree.
- ¶3 — [5] Two round eyes looked down at them. [6] It was an owl, and Kai smiled because now he was not scared.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who shone a flashlight into the tree? | **Kai's mom** ([4], ¶2) | Kai · the owl |
| what | What was making the hooting sound? | **an owl** ([6], ¶3) | the lake · the flashlight |
| where | Where did they put up the tent? | **next to a lake** ([2], ¶1) | up in a pine tree · in the garden |
| when | When did Kai camp in the woods? | **last summer** ([1], ¶1) | last winter · this morning |
| why | Why did Kai smile? | **because now he was not scared** ([6], ¶3) | because the tent was small and green · because he heard a hooting sound |

**Story 6 — Pepper Gets Lost** (picture pets/dog)
- ¶1 — [1] On Sunday, Ella took her puppy Pepper to the market. [2] Pepper saw a cat and ran away between the stalls.
- ¶2 — [3] Ella looked for him for a long time. [4] A baker called out that a puppy was sitting by his bread.
- ¶3 — [5] Ella ran to the bakery stall and picked Pepper up. [6] She bought a bun from the baker to say thank you.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who called out to Ella? | **a baker** ([4], ¶2) | Pepper · a farmer |
| what | What did Ella buy from the baker? | **a bun** ([6], ¶3) | a puppy · a cat |
| where | Where did Ella take Pepper on Sunday? | **to the market** ([1], ¶1) | to the bakery · to the park |
| when | When did Ella go to the market? | **on Sunday** ([1], ¶1) | on Friday · for a long time |
| why | Why did Ella buy a bun from the baker? | **to say thank you** ([6], ¶3) | to pick Pepper up · to look for a cat |

**Story 7 — Grandma's Tulips** (picture spring/tulip)
- ¶1 — [1] In the autumn, Ben helped his grandma plant tulip bulbs. [2] They dug small holes along the fence.
- ¶2 — [3] All winter, snow lay on the garden path and nothing grew in the cold ground. [4] Ben worried that the bulbs were lost.
- ¶3 — [5] Then, one warm day in spring, red tulips opened by the fence. [6] Grandma picked three tulips for Ben because he had helped her so well.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who picked three tulips? | **Grandma** ([6], ¶3) | Ben · the farmer |
| what | What did Ben worry about? | **that the bulbs were lost** ([4], ¶2) | that the fence would fall · that the tulips were red |
| where | Where did they dig the holes? | **along the fence** ([2], ¶1) | on the garden path · by the front door |
| when | When did the tulips open? | **one warm day in spring** ([5], ¶3) | in the autumn · all winter long |
| why | Why did Grandma pick tulips for Ben? | **because he had helped her so well** ([6], ¶3) | because nothing grew in winter · because he dug holes by the door |

**Story 8 — The Last Stop** (picture vehicles/bus)
- ¶1 — [1] Every day after school, Omar rides the bus home. [2] Yesterday he fell asleep in his seat.
- ¶2 — [3] When he woke up, the bus was at the very last stop. [4] The driver smiled and asked where Omar lived.
- ¶3 — [5] The driver took the bus back along the road. [6] Omar waved from his front door because he was glad to be home.

| q | question | answer (sentence, ¶) | distractors |
|---|---|---|---|
| who | Who took the bus back? | **the driver** ([5], ¶3) | Omar · his teacher |
| what | What happened to Omar yesterday? | **he fell asleep in his seat** ([2], ¶1) | he waved from his door · he missed the bus |
| where | Where was the bus when Omar woke up? | **at the very last stop** ([3], ¶2) | at his front door · outside his school |
| when | When does Omar ride the bus home? | **every day after school** ([1], ¶1) | every morning · only on Saturdays |
| why | Why did Omar wave? | **because he was glad to be home** ([6], ¶3) | because the driver smiled at him · because he fell asleep in his seat |


**Answer position (the three slips).** Not left to a random shuffle. Per pass the engine deals slip positions from a balanced deck: setting 1 (24 questions) each of top/middle/bottom exactly 8 times; setting 2 (40) 13/13/14; never the same position three questions running; re-dealt each pass. Distractor order inside the remaining two slips alternates. The gate measures it.

**Other locales.** Each locale's native author writes 8 ORIGINAL stories to the same content rules (local names — es Lucía, fi Aino, de Paul —, local places, weekdays, seasons), never translations; the EN set is a model of shape, not a script. The existing native pools in `scripts/worksheet-gen/data/literacy/reading-passages.js` (6 per locale, 3 sentences each) may seed characters and topics but are too short to reuse as they are. One native + pedagogy reviewer per locale batch signs: one proof sentence per question, distractors same kind, picture never an answer, the why-connector rule.

## 7. Check, the misses, the success
- **Check with no tab placed** → hint, no miss: "Stick the {word} tab next to the sentence that answers the question." (the tab on the card wiggles twice).
- **Check with a tab but no slip chosen** → hint, no miss: "Now choose the answer the sentence gives you."
- **Miss 1** — what the book SHOWS depends on what is wrong:
  - *tab on the wrong sentence* (slip right or wrong): the tab peels itself back to the card with a soft *flap*, and the paragraph that holds the proof gets a 3 px ring round its block (on phones the booklet turns to that page and rings it). Hint: "The answer is in the ringed part. Read it and stick the tab again."
  - *tab right, slip wrong*: the chosen slip slides over beside the tabbed sentence like a ruler laid under a line; its words that are NOT in the sentence stay grey, the ones that are go ink (for a why-trap like "because it was Monday" the words *it was Monday* sit in a different sentence, so they stay grey here). The slip slides back unchosen. Hint: "Your tab is in the right place. Read that sentence again: which answer does it say?"
- **Miss 2** (the same question again):
  - *tab wrong*: the proof sentence itself gets the dotted outline (on phones its page opens) — the child still has to drag the tab there. Hint: "Look at the sentence with dots round it."
  - *slip wrong*: inside the tabbed sentence, the words of the right answer get a thicker underline in the tab colour; the slips stay as they were. Hint: "The thick line shows the answer's words. Find the card that says them."
- A new move (moving the tab, choosing a slip) removes the help until the next Check. Misses never stack into a "wrong" state; there is no third escalation (the miss-2 showing stays available on every later Check).
- **Success (per question):** the tab presses flat and turns solid; the proof words in the sentence glow in the tab colour (400 ms); the right slip lifts and tucks under the question card, and the card folds itself into its tab, which stays sticking out of the book margin; the next card slides up. Line under the book (bubble): "{Question} — {Answer}." e.g. "Who brought a long ladder? — A park helper."
- **Success (story):** the book-closing show of §2; bubble: "You found every answer in the story." (one sentence, no count).

## 8. Settings (each visibly changes the board at rest)
1. **Questions:** *Who, what, where* (three tabs fanned above the card) / *All five, with when and why* (five tabs). Default: three.
2. **Sentence numbers:** *Off* / *On* (small grey numerals before each sentence — the worksheet's level-1 support). Default: off.

## 9. Words (EN source)
- Title: **The Proof Tabs** · instruction (page intro line): "Read the story. Stick each question's tab next to the sentence that answers it, then choose the answer."
- Task line: "Stick the tab next to the sentence that answers the question. Then choose the answer."
- Question words on the cards (the content): **Who? What? Where? When? Why?** followed by the question.
- Hints: `noTab` "Stick the {word} tab next to the sentence that answers the question." · `noSlip` "Now choose the answer the sentence gives you." · `tabWrong1` "The answer is in the ringed part. Read it and stick the tab again." · `slipWrong1` "Your tab is in the right place. Read that sentence again: which answer does it say?" · `tabWrong2` "Look at the sentence with dots round it." · `slipWrong2` "The thick line shows the answer's words. Find the card that says them."
- Success line: "{question} — {answer}." · story end: "You found every answer in the story."
- Settings: "Questions" — "Who, what, where" / "All five"; "Sentence numbers" — "Off" / "On".
- aria: tab "{Word} tab — drag it next to a sentence"; slip "Answer: {text}"; sentence "Sentence {n}: {text}".
- **Locale traps.** Question words and their answer forms: de *Wer/Was/Wo/Wann/Warum* (answers in the case the question asks: *Wo?* → dative "in einem hohen Baum"; *Warum?* → *weil* + verb-final, so every why-slip in de ends in its verb: "weil sie ihren Drachen wiederhatte"); fr *Qui/Que (Qu'est-ce que)/Où/Quand/Pourquoi* (why-slips "parce que …" all three); es/pt/it *¿Quién?/Quem/Chi …* — es needs ¿…? on the card; nl *Wie/Wat/Waar/Wanneer/Waarom* (omdat + verb-final); sv/da/no *Vem/Vad/Var/När/Varför* · *Hvem/Hvad/Hvor/Hvornår/Hvorfor* · *Hvem/Hva/Hvor/Når/Hvorfor* (eftersom/fordi; Nordic V2 is no issue inside a subordinate clause, but the author keeps all three why-slips in one clause type); **fi** *Kuka/Mitä/Missä/Milloin/Miksi* — Finnish "where" has three questions (*missä* in / *mistä* from / *mihin* to): the question's case decides the answer's case, so a *missä* question takes inessive/adessive answers ("puussa", "järven rannalla") and every distractor must be in the SAME case or the case becomes the tell — the reviewer checks case agreement of all three slips. Weekdays/seasons: southern-hemisphere seasons are not an issue (the stories name their own season), but "Saturday" vs local school weeks is the author's call. Names: never a name that is also a common noun in the locale. Article/gender in answers comes from the native author, not from a template.

## 10. Sound off, access, phones
- Legible with the sound off: every hint is shown in the bubble AND by the apparatus (ring, dots, underline); TTS (where it works) reads the story sentence by sentence on the speaker button and the question card on its own speaker — a bonus only.
- Keyboard path §5. Focus order: question tab → sentences → slips → Check. aria-live polite on the bubble.
- Taps: tab 44 × 56; slips ≥ 48 px tall; page buttons 44; sentence hit-boxes ≥ 28 px tall with the whole line width (the tab margin hit-box is 44 wide).
- Picture: 96 px at 704, 64 px at 360/320.
- Phone layout: §4 (booklet pages).

## 11. Distinct from
- **Row 69 Atlas's Fact Files — The Highlighter That Lifts Facts (RI.K.1):** swipe words and they lift out to BECOME the answer. Here the child never builds the answer from the swipe; the tab is a proof marker and the answer is a choice the proof must agree with. No highlighter swipe anywhere.
- **Row 63 The Bookmark (RL.K.1)**: one bookmark into a picture book page; K, picture answers. **Row 117 Marlo's Magnifier** — its Level 3 also covers G2-254/G2-269–273, but there the child puts a ready-made clue card in the lens and the MACHINE sweeps the story to find its sentence; here the child must find the sentence and stick the tab herself before any answer exists, and the answers are blank until she does (search by the child vs search by the apparatus); **Row 76 The Question Lamp**: question words light kinds of answers (no text proof). **Row 185 The Clue Jug**: word meaning from clues.
- Premium tools: *reading-easel* (phrasing fluency) — unrelated.
- The four batch siblings (#286 Compass Walker, #287 globe map, #190 gauges, #280 caption camera, #281 splice tape, #282 see-through fact sheets) share no mechanic with a sticky tab.

## 12. Build plan
- **Model (core):** `state = {story, qIndex, tab:{sentence|null}, slip:null|0..2, missStage:0|1|2, order:[slipPermutation]}`. Functions: `placeTab(sentenceIdx)`, `choose(slipIdx)`, `check() → {ok, tabOk, slipOk, show:'ringPara'|'outlineSentence'|'greyWords'|'underlineAnswer'|null}`, `nextQuestion()`, `dealPositions(pass)` (balanced deck), `sentenceAt(x,y)` (layout helper in the activity, not the core).
- **Why the options do not change with the tab:** generating "answers from a wrong sentence" would invent content nobody reviewed; three reviewed options + a graded proof gives the same pressure to read with zero unreviewed text.
- **Gate (own ground truth, `verify-proof-highlighter-core.js`):** for every locale × story × question: exactly one proof sentence, the answer's content words occur in that sentence (normalising articles/pronouns via a per-locale stoplist the reviewer signs); who/what/where in three distinct paragraphs; no paragraph > 3 answers; picture noun (image-vocabulary label in the locale) absent from every answer; why-slips share their first word; distractor kind tag equals answer kind; in-story bot ≤ 25 % clear wins per locale; slip-length "pick the longest" bot ≤ 40 % per locale; slip positions balanced per pass (exact counts above) and no position thrice running; Check without tab never counts a miss; a right slip with a wrong tab is NOT a success.
- **Mutations (one per rule):** accept a right slip with no tab · accept a wrong tab · options change with the tab · deal all answers to the top slip · let two questions of one story share a paragraph in setting 1 · show a story picture that names an answer · drop the why-connector rule · ring the wrong paragraph on miss 1 · keep the miss-2 underline after a new move · repeat the previous pass's story order.
- **Pictures to verify on a contact sheet:** tools/ladder, around-the-house/gate, beach/sandcastle, winter/sled, camping/tent, pets/dog, spring/tulip, vehicles/bus (all labelled in all 11 locales — checked). Each locale's own stories name their pictures; the same rule applies (picture never an answer).
- **Risks:** content cost (8 native stories × 10 locales) — one native reviewer per batch, the gate does the structure; Finnish case agreement of slips (reviewer item); at 360 the booklet hides two paragraphs — the ring and the tab nicks on the booklet edge carry the "other pages" so a child is not lost.
- Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes: peeling and sticking tabs is a toy in itself, the blank slips that wake up when the tab sticks are a small magic, and the closed book bristling with tabs is a visible record of "I found them all".
2. **Would a teacher put it on the board?** Yes: it is the "find the proof in the text" routine every G2 teacher teaches with sticky notes, the why-traps are true story details, distractors are same-kind, the picture is a trap not a crutch, answer positions are dealt from a balanced deck.
3. **Would a parent trust it?** Calm, readable, real stories, one library picture, no score; the help teaches where to look rather than giving the answer.
4. **The invention in one sentence:** the answer only counts when the question's tab is stuck next to the sentence that says it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-measured the round tables with my own parser (`work-c36/c276.js`): the designer's "5 clear wins" for the in-story bot was really 7 — every when-question had two invented distractors, so the one time phrase in the story was the tell. Rewrote S1/S3/S4 when-distractors to times lifted from the story ("after a while", "later that afternoon", "when Ana woke up"), adding the time phrase to the story where needed; now 3 clear wins / 37 ties, every answer word in its proof sentence.
- Removed two second-right-answers: S7 "Where did they dig the holes?" offered "in the cold ground" (the holes ARE in the ground) → "on the garden path" (new ¶2 detail); S4 "Where was the snow?" offered "on the big hill" (the hill obviously had snow — they sled on it) → the S4 what/where questions rebuilt (what was closed → school ¶1; where did they pull the sled → up the big hill ¶2), paragraph spread kept 1·2·3.
- S2 why-distractor "because she did not like her box" was near-true (she skipped her box) → "because Aunt Rosa laughed"; tense of "looks" fixed; S5 why-answer now copies the sentence ("because now he was not scared").
- Content rule now names the nested-truth exemption the reviewer must check; §11 now states the real overlap with Row 117 Level 3 (same worksheets) and why the child-finds-it tab is a different act from the lens that finds it.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
