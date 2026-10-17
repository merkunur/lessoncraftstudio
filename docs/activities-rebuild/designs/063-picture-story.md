# Row 63 — Fable's Picture Stories → THE BOOKMARK (RL.K.1)

## 0. Identity
- **id** `picture-story.read.rl-k-1` (KEPT; slugs/metadata frozen en..nl; sv da no fi new at build) · grade K · CCSS RL.K.1 (with prompting, ask and answer questions about key details in a text) · strand Reading: Literature · own files `picture-story-core.js` (rewritten for the new model), `picture-story-activity.js` (rewritten), html, `picture-story-activities.json`.
- **Worksheets covered:** G2-254 "Read and Answer", G2-269…G2-273 "Reading Comprehension: Story 2–6" → ASK mode; G1-402 "Story Sequencing Sentences: Match the Pictures" → CAPTION mode (the bookmark carries the sentence); G1-400 "What Happens Next?" and G1-401 "Beginning, Middle and End" → the page questions of ASK mode (*after / middle / first / last / end*; the full picture-ordering skill lives in #064 Wake Up, Pip!).
- **Old activity:** a 3-panel captioned story with emoji glyphs; answer a who/what/where/why/first/last question by tapping a text card. **Kept:** the three stories (The Lost Mitten, The Stuck Carrot, The Rainy Picnic), their captions (lightly adjusted so every thing named is drawable from the library), all 11 questions and their answers, the 6 translations. **Gone:** emoji panels, answer cards. Fable is the library `forest-creatures/fox`.

## 1. The pitch
"The answer is in the book — so you slip the bookmark into the story at the exact page and on the exact thing that answers the question."

## 2. Why a child will want it again
- **A real picture book.** Three (or four) pages laid open side by side like a concertina book, each a little scene built from big library pictures on a drawn sky-and-ground page, with a caption underneath.
- **The bookmark.** A long ribbon bookmark (coral, drawn geometry) with the question printed on its tag. The child drags it into the book; as it crosses a page the page lifts slightly (a 3° page-curl) and things on that page brighten under the ribbon's tip. Dropped on a thing, the ribbon's tail curls around it like a little lasso.
- **The book answers back.** On Check the tag's answer line fills with what the child marked (*Who hopped in the snow? — the bunny*) and the caption words that prove it light up, sliding a gold underline under them. Fable (the library fox) hops onto that page and sits next to the answer.
- **Pages that play.** Tapping a page makes its scene move a little (the bunny hops, the mitten drops, the rain falls) — every page is alive, so children re-read the story by playing it.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** answer who / what / where / why / first / last / how-felt questions about a short literary story using details from the pictures and words (RL.K.1); match sentences to pictures (G1-402); say what happens next (G1-400) and which part is beginning/middle/end (G1-401).
- **Misconception 1 — answering from imagination** ("a bear!"). There is no answer card to pick; the child must point into the story. Whatever they mark is what the tag says, and it is compared with the caption.
- **Misconception 2 — right thing, wrong page.** "When did Ollie sleep?" — marking the moon on page 2 reads *— when the moon came up*; the caption that answers is on page 1 (*while the sun was up*). For where / when / why / page questions the page matters; for who / what questions any picture of the right thing is accepted, because it IS the right thing.
- **Misconception 3 — first/last confusion.** "What happened FIRST?" is answered by marking a PAGE (the ribbon lies across the page's top edge). Page order is the book's left-to-right — the bookmark teaches that the book's order IS the story's order.
- **Misconception 4 — "why" answered with "what".** Why-questions are answered by marking caption words (the bookmark tip snaps to a caption phrase): marking *a giant carrot* for "Why couldn't Millie pull it out?" reads *— because a giant carrot*; the right phrase is *it was stuck*.

## 4. The stage
`layout:'split'` at ≥ 700 px (book left, bubble right); stacked below.

**At 704 px:**
- **The book** (440 × 300 px): 3 pages, each 142 × 300 px (in the 4-page setting the book becomes a 2 × 2 spread of 216 × 180 pages so characters stay 96 px). Page = sky band (pale blue) over a ground band (green / snow-white / brown, chosen per page), 3 px ink frame, page number dot pattern at the foot (1, 2, 3 dots — not numerals). Library pictures 96 px (main character) and 72 px (props), placed by authored coordinates. Caption under each page, 15 px, max 3 lines.
- **The bookmark** parked at the right edge: tag 160 × 60 px with the question (18 px), ribbon 14 px wide. A drag target of the whole tag.
- **The answer line** — the tag's lower half: "— ______" (filled at Check).
- **Fable** — library `forest-creatures/fox`, 80 px, sitting on the book's lower-left corner.
- **Task line (EN):** "Read the story. Slip the bookmark onto the answer."

**At 360 px:** the book becomes a horizontal swipe strip with page dots (one page 300 × 260 visible at a time, neighbours peeking 12 px), characters 80 px, props 64 px, caption 15 px; the bookmark tag sits under the book (full width, 52 px tall); Check at ≈ 640 px. At 320 × 640: page 280 × 230, Check ≈ 590.

**CAPTION mode stage:** the same book with empty caption slots; the bookmark tag holds the current sentence (tag 200 × 64 px at 704, full width at 360).

## 5. The hand
- **Drag the bookmark:** the ribbon follows the finger; the page under the tip curls up 3°; the hovered target (a picture, a caption phrase, or the page's top edge for "page" answers) brightens. Release: the tail curls around the target (220 ms) and stays. Drag again to move it.
- **Tap a page:** its little scene animation plays (≤ 900 ms, see the story table) and TTS reads the caption where available.
- **Keyboard:** Tab through targets in reading order (page 1: pictures, caption phrases, page edge; page 2 …); Enter places the bookmark.
- **CAPTION mode:** drag the sentence-bookmark onto a page (the whole page is the target); it snaps into the page's caption slot; dragging it again moves it.
- **Free play:** after success Fable can be dragged onto any page and does a little hop there.

## 6. The rounds
### The seven stories (pages = library pictures on a drawn page; scene action in brackets; every picture opened on a contact sheet by the critic 2026-10-17)
| story | page 1 | page 2 | page 3 | 4th page (4-page setting) |
|---|---|---|---|---|
| **The Lost Mitten** (kept, adjusted) | Bo the bunny hopped in the snow. [spring/bunny hops; winter/snowflake ×3] | A yellow mitten slipped off by a big rock. [accessories/mitten drops; camping/rock] | A robin found it and called Bo back. [spring/robin lands by the mitten; bunny turns] | Bo put the mitten back on. [mitten slides onto bunny] |
| **The Stuck Carrot** (kept) | Millie the mouse found a giant carrot. [forest-creatures/mouse; vegetables/carrot 1.6× big] | She pulled and pulled, but it was stuck. [mouse leans back, carrot wobbles] | Her friend Hal the hedgehog pushed, and out it popped! [forest-creatures/hedgehog; carrot pops up] | They shared the carrot for lunch. [mouse + hedgehog either side of carrot] |
| **The Rainy Picnic** (kept, adjusted) | Two friends sat down for a picnic. [forest-creatures/rabbit + forest-creatures/squirrel; furniture/table; bakery/pie] | Then dark clouds came and it rained. [weather/rainy slides in] | They ate under a big umbrella, still happy. [spring/umbrella opens over them] | The sun came out again. [beach/sun rises, umbrella folds] |
| **The Muddy Pig** (NEW) | Rosy the pig rolled in a big puddle. [farm-animals/pig; spring/puddle] | The farmer's duck filled a tub with water. [farm-animals/duck; around-the-house/bathtub] | Rosy splashed in the tub and came out clean. [pig hops into bathtub] | Rosy took a nap in the sun. [pig; beach/sun] |
| **The Sleepy Owl** (NEW) | Ollie the owl slept while the sun was up. [forest-creatures/owl tilted; beach/sun] | The sun went down and the moon came up. [sun sinks; camping/moon rises] | Ollie woke up and flew over the trees. [owl lifts; camping/forest] | Ollie said hello to the moon. [owl beside moon] |
| **The Rolling Ball** (NEW) | Dot the dog kicked her ball. [farm-animals/dog; toys/ball rolls] | The ball rolled down the hill into the lake. [ball slides into camping/lake] | A duck pushed the ball back to Dot. [farm-animals/duck nudges ball to dog] | Dot and the duck played catch. [dog + duck, ball between] |
| **The Lost Hat** (NEW) | Ben the bear built a snowman. [zoo-animals/bear wearing winter/hat; winter/snowman] | The wind blew Ben's hat away. [winter/hat flies off the bear] | A penguin brought the hat back. [winter/penguin; hat returns to the bear] | Ben and the penguin built a second snowman. [two snowmen] |

Picture corrections (critic): `camping/pine_tree`, `camping/picnic_table`, `spring/rain` and `spring/sun` do not exist → `camping/rock` (so "by the tree" became "by a big rock"), `furniture/table` + `bakery/pie`, `weather/rainy`, `beach/sun`; the Sleepy Owl flies over `camping/forest`. `accessories/mitten` is YELLOW (caption and answer changed from "red"). `toys/ball` is a black-and-white football (the word "red" is gone). `winter/snowman` already wears a top hat and `winter/hat` is a woolly beanie — so the hat that blows away is now **Ben's** hat (worn by the bear), not the snowman's; the story was renamed *The Lost Hat*. A bird "holding" a mitten cannot be drawn with library art, so the robin lands BESIDE it.

### ASK mode — 18 rounds (9 per pass, order-only reshuffle; a pass mixes all seven stories)
**Who / what questions accept the right THING on ANY page** (the mitten on page 3 is still the mitten that slipped off; marking it is right, and on success the gold underline jumps to the page whose words prove it). **Where / when / why / feel questions and page questions are page-exact** — that is where the page matters.
| # | story | type | question | answer target | marks what | page |
|---|---|---|---|---|---|---|
| 1 | Mitten | who | Who hopped in the snow? | bunny (any page) | picture | 1 |
| 2 | Mitten | what | What slipped off in the snow? | mitten (any page) | picture | 2 |
| 3 | Mitten | where | Where did the mitten slip off? | "by a big rock" | caption phrase | 2 |
| 4 | Mitten | first | What happened FIRST? | page 1 | page | 1 |
| 5 | Carrot | who | Who found the carrot? | mouse (any page) | picture | 1 |
| 6 | Carrot | who | Who helped Millie? | hedgehog | picture | 3 |
| 7 | Carrot | why | Why couldn't Millie pull it out? | "it was stuck" | caption phrase | 2 |
| 8 | Carrot | last | What happened LAST? | page 3 | page | 3 |
| 9 | Picnic | what | What were the friends doing? | "sat down for a picnic" | caption phrase | 1 |
| 10 | Picnic | why | Why did the friends eat under the umbrella? | "it rained" | caption phrase | 2 |
| 11 | Picnic | feel | How did the friends feel at the end? | "still happy" | caption phrase | 3 |
| 12 | Pig | where | Where did Rosy roll? | puddle | picture | 1 |
| 13 | Pig | who | Who filled the tub? | duck | picture | 2 |
| 14 | Owl | when | When did Ollie sleep? | "while the sun was up" | caption phrase | 1 |
| 15 | Owl | after | What happened after the moon came up? | page 3 | page | 3 |
| 16 | Ball | where | Where did the ball roll? | lake | picture | 2 |
| 17 | Ball | middle | What happened in the MIDDLE? | page 2 | page | 2 |
| 18 | Hat | who | Who brought the hat back? | penguin | picture | 3 |
Answer pages: 6 on page 1, 6 on page 2, 6 on page 3. The page questions cover the G1-401 beginning / middle / end (rounds 4, 17, 8) and the G1-400 "what happens next" (round 15, *after*); in the 4-page setting two more page rounds join the pass: Mitten "What happened after the robin found the mitten?" (page 4) and Pig "What happened at the very END?" (page 4). Every question has one right target: no other thing on any page answers it, no other caption phrase answers it (gate). Decoys: the same object on two or more pages (mitten, carrot, ball, hat), so a page-exact question cannot be answered by marking the object wherever it appears.

The old activity's **NEXT-PAGE rounds** (choose a loose page for a blank page) were removed: that is #064 Wake Up, Pip!'s Level 2 almost exactly. The bookmark covers G1-400/401 by pointing at the page that answers *before / after / middle / end*.

### CAPTION mode — 7 rounds (one per story) · G1-402 · THE BOOKMARK CARRIES THE SENTENCE
The book's pages without captions; the bookmark's tag now holds a SENTENCE instead of a question (one caption per round; the three captions of the story come one after another, then the next story). The child slips the sentence-bookmark into the page it tells. On Check the page **acts out the sentence's verb** — the scene's authored animation plays (the bunny hops, the mitten drops, the robin lands):
- **right page:** the animation matches the sentence and the caption slot fills with it, gold-underlined.
- **wrong page:** that page plays ITS OWN action, which is not what the sentence says (the bookmark says *A robin found it* but page 1's bunny just hops), the slot stays empty and the bookmark slides back. Miss 2: every page plays its action in turn, and the page whose action matches pulses.
This is deliberately not a noun-matching mechanic: nouns repeat across pages (Bo, the mitten, the carrot are on several pages), so only the ACTION identifies the page. (It also keeps clear of #067 Otto's Proof Pins, whose pins fly from a sentence's nouns to the things they name.)

**Answer position.** ASK: answer page 6/6/6 over the 18 rounds and 3/3/3 ± 1 in each pass of 9 (the gate builds and measures the passes). CAPTION: caption order shuffled, never the story's own order in more than 2 of 7 rounds. The gate measures both.

## 7. Check, the misses, the success
- **Check with the bookmark not placed** → no miss; the tag wiggles. Hint: "Slip the bookmark into the story."
- **Miss 1:** the answer line fills with what was marked (*Who hopped in the snow? — the rock*); Fable shrugs (the picture tilts left-right). The bookmark slides back out. Hint: "Read the page again: does it say {marked}?"
- **Miss 2:** the caption that holds the answer lights its words that repeat the question (*hopped in the snow*), and its page curls up 6°. Hint: "Find the question's words in the story. The answer is on that page."
- A new drag clears the help until the next Check.
- **Success:** the ribbon tail glows around the answer; the gold underline runs under the proving caption words; Fable hops onto that page. Bubble: "{question} — {answer}. It's right there in the story!" e.g. "Who hopped in the snow? — Bo the bunny. It's right there in the story!" (no page number in words — the page is shown by Fable sitting on it).
- **CAPTION success:** each page plays its action as its sentence lands; after the third sentence the book closes and opens again with the story acted out in order. "Every sentence matches its picture!"

## 8. Settings
1. **Mode:** Ask the book / Caption the pages.
2. **Pages:** 3 pages / 4 pages — the book gains each story's authored 4th page (§6 table); ASK adds the two page-4 rounds and CAPTION a fourth sentence.

## 9. Words (EN source)
- stage title "Fable's Picture Stories" · instruction ASK "Read the story. Slip the bookmark onto the answer." · CAPTION "Read the bookmark. Slip it into the page it tells."
- hints: empty "Slip the bookmark into the story." · miss1 "Read the page again: does it say {marked}?" · miss2 "Find the question's words in the story. The answer is on that page." · captionMiss1 "Watch the page: does it do what the bookmark says?" · captionMiss2 "Watch every page. Which one does what the sentence says?"
- celebrations: "{question} — {answer}. It's right there in the story!" · "Every sentence matches its picture!"
- aria: page "Page {n}: {caption}" · thing "{label} on page {n}" · bookmark "Bookmark: {question}".
- **Locale traps.** es: *cuento*, never *historia* (old file's ruling — kept). Names: Bo, Millie, Hal, Rosy, Ollie, Dot, Ben are kept unless a locale reads them as words (fi: "Sam" fine; da "Bo" is a real name — fine); each locale may rename with the reviewer. Answers per locale are authored as the phrase the tag shows ("— by a big rock" → de "— an einem großen Stein", fi "— ison kiven luona": a whole phrase, not a looked-up noun). Question words differ in what they mark (fi *Missä/Mihin/Mistä* — "where did it slip OFF" may be *Mistä* or *Missä*: the caption phrase must match the question's case; author both together). FIRST/LAST capitals: keep the emphasis as bold, not capitals, in de (capitalised words are nouns). Page dots instead of ordinal words avoid ordinal agreement. Seasons/snow: fine in all locales; pt-BR keeps snow stories as stories.

## 10. Sound off, access, phones
- Legible with sound off: captions, question and the answer line are written; the scene animations show actions. TTS reads captions on page tap.
- Keyboard: targets in reading order; aria labels as above; results announced ("You marked the rock on page 2").
- Taps ≥ 44 px (pictures 64–96 px, caption phrases 44 px tall hit boxes, page edges 44 px strips). Characters 96 at 704, 80 at 360.
- Check above the fold at 360 × 740 and 320 × 640 (§4). Phone: swipe strip of pages; bubble under Check.

## 11. Distinct from
- **#064 Wake Up, Pip! (The Flipbook)** orders and retells; Fable's Bookmark answers detail questions by pointing into a fixed book.
- **#069 Atlas (The Highlighter)** lifts words from an informational text; the Bookmark marks pictures, phrases and pages in a literary picture book.
- **#24 Story Stage** acts out maths stories; **story-line tool** pegs beats on a line. Neither points to evidence.

## 12. Build plan
- **Core** `PictureStoryCore`: `story(id, pages)` → pages with targets `{id, kind:'thing'|'phrase'|'page', page, label}` and each page's `action` id; `newRound(round)`; `mark(state, targetId)`; `grade(state)` → `{ok, markedLabel, provingPhrase, page}` (who/what: ok for the right thing on any page; others page-exact); `captionGrade(sentenceId, page)` → `{ok, playedAction}`.
- **Gate's truth** (`verify-picture-story-core.js`): its own answer table (story, question → target id); every answer target exists on its page; every "why/where/when/feel" answer phrase appears verbatim in that page's caption (per locale); every decoy object appears on ≥ 2 pages; every question has exactly one right target (no second thing, no second phrase answers it); each caption's action id belongs to exactly one page (so CAPTION has one solution); answer-page balance 6/6/6 and 3/3/3 ± 1 per pass.
- **Mutations:** accept the right thing on the wrong page for a where/when question · REFUSE the right thing on another page for a who/what question · accept any caption phrase for why · "first" accepts page 3 · CAPTION accepts any page · decoy removed (object on one page only) · answer always on page 2 · page numerals shown instead of dots. All killed.
- **Pictures (opened by the critic 2026-10-17):** spring/bunny, accessories/mitten (one yellow mitten), camping/rock, spring/robin, forest-creatures/mouse, vegetables/carrot, forest-creatures/hedgehog, forest-creatures/rabbit, forest-creatures/squirrel, furniture/table, bakery/pie, weather/rainy, spring/umbrella, farm-animals/pig, spring/puddle, farm-animals/duck, around-the-house/bathtub, forest-creatures/owl, beach/sun, camping/moon, camping/forest, toys/ball (black-and-white football), camping/lake (a lake landscape vignette — placed as the page's background strip, 160 px wide), farm-animals/dog, zoo-animals/bear, winter/snowman (wears a top hat), winter/hat (a woolly beanie), winter/penguin, winter/snowflake, forest-creatures/fox.
- **Risks:** library pictures are separate objects, so "holding" (bird holds mitten) is shown by overlap and placement — the authored coordinates must be read on rendered pages. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a living picture book whose pages move when touched, and a bookmark that lassos the answer.
2. **Teacher on the board?** Yes — "show me where it says that" is the whole interaction; the class can debate which page.
3. **Parent trust?** Gentle stories, library pictures, no guessing cards, no scores.
4. **Invention:** you answer by slipping the bookmark into the story — the right page, the right thing — and the book shows the words that prove it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 3→5 · reality 2→5
What changed:
- **Pictures did not exist or did not match the words:** camping/pine_tree, camping/picnic_table, spring/rain, spring/sun missing (→ camping/rock, furniture/table + bakery/pie, weather/rainy, beach/sun, camping/forest); the mitten is yellow and the ball a black-and-white football (captions said "red"); the snowman already wears a top hat while winter/hat is a beanie → the hat that blows away is now the bear's (*The Lost Hat*).
- **Unfair page rule:** marking the carrot on page 3 for "What did Millie find?" was a miss — it IS the carrot. Who/what now accept the right thing on any page; where/when/why/page questions stay page-exact.
- **Answer balance** claimed 6/6/6 but was 7/7/4 → rounds re-authored to a measured 6/6/6, with *after* and *middle* page questions covering G1-400/401.
- **Twins removed:** the NEXT-PAGE rounds duplicated #064's missing-page level (cut); CAPTION mode's noun-lighting duplicated #067 Otto's Proof Pins → the bookmark now carries the sentence and the page ACTS OUT its verb (nouns repeat across pages, so only the action identifies the page).
- The celebration template's contradiction ("on page {dots}" vs. its own example) resolved.
