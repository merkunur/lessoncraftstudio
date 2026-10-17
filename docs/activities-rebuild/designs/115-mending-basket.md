# Row 115 — Granny's Mending Basket → THE THREAD THAT SNAPS BETWEEN TWO WORDS (RF.1.4.a)

## 0. Identity
- **id** `mending-basket.mend-page.rf-1-4-a` (KEPT; slug, title "Granny's Mending Basket — Read for Meaning (Grade 1)" and intro frozen en) · grade 1 · Common Core **RF.1.4.a** (read grade-level text with purpose and understanding) · strand Reading: Foundational Skills.
- **files (key `mending-basket`)** `mini tools/mending-basket-core.js` (new), `mending-basket-activity.js` (rewritten), `mending-basket-activity.html`, `mending-basket-activities.json`. New metadata (slug, title, intro) for de es fr it pt nl sv da no fi.
- **worksheets it covers:** G1-350, G1-366, G1-367, G2-350 (fill in the blank: word bank, letter boxes, choose the word, story) → Clue "Fill the gap"; G1-308, G1-338, G1-339, G1-340, G1-342 (read and do, read and circle, two-step, first/second/between, read and draw) and G1-242, G1-251, G1-252, G1-409, G1-410, G1-411 (read and color) → Clue "Do what it says"; G1-341 (true or false), G1-368 (match the sentence to the picture) → Clue "True or not?"; G2-254, G2-269 … G2-273 (read and answer, stories 2–6) → Clue "Story questions".
- **what the old activity did:** a torn storybook page; pick the piece the meaning needs (fill the gap, fix the word that doesn't fit, follow who the story means, place the cat, match a picture, order strips, sort sentences); the mended page develops from grey into colour; hand-drawn Granny and hand-drawn "picture families". **Kept:** the mending idea, the grey-to-colour page, every one of the 15 rounds' TEXT (cloze puppy/soup ×2, contradiction rain/fire, connect dog/mouse, placement under/on, match bow/paw, sequence seed/rain, sort wear-eat/day-night), the keystone-word design (each round names the word the meaning hangs on) and the minimal pairs (soup hot/cold, cat on/under). **Changed because it was wrong:** the pictures were hand-drawn SVG scenes and Granny was a hand-drawn character — now every picture is a library picture composed on the page (Granny lives in the words only; the library has no grandmother figure — picture ruling); *match-paw* needed a dog with "one white paw", which no library picture shows — re-authored; a correct piece and a wrong piece behaved the same until Check and the Check only said yes/no — now the thread shows WHICH two words disagree.

## 1. The pitch
"Granny's needle sews the torn page shut word by word, and the thread only holds where the words agree — put in a piece that doesn't fit and the thread snaps exactly between the two words that disagree."

## 2. Why a child will want it again (the fun)
- **A torn page and a basket of pieces.** The storybook page lies on a sewing table with a jagged tear through it. Granny's mending basket (a woven basket drawn as geometry, open at the front) holds paper pieces, each torn along the SAME jagged edge with one word or phrase on it — so the shape never tells which fits; only the meaning does.
- **The needle sews.** Press Check: a silver needle trailing red thread dives in at the first word and stitches along the sentence, one loop per word, *tick tick tick*, pulling the edges of the tear together. At the end it makes one long stitch from the mended piece BACK to the word the meaning hangs on (the keystone, e.g. *tiny* ↔ *carefully*) and pulls.
- **Hold or snap.** If they agree, the thread pulls tight with a satisfying *zip*, the tear closes, and the page floods from grey into colour from the stitches outward — the pictures on the page come alive (the dog wags, the cat blinks, the kite sways). If they disagree, the thread SNAPS — *ping!* — right between the two words, both glow, and the frayed ends hang there. A child sees in one look which word their piece fought with.
- **The mended book.** Each mended page is bound into Granny's book along the top; after a pass the book has nine coloured pages, and tapping one replays its sewing.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.4.a + the worksheets):** read a sentence or short text closely enough that every word agrees with the others: choose the word the context needs; find the word that doesn't make sense; know who *he/it/they/the dog* refers to; do exactly what a sentence says (place, colour by number, ordinal and between, two steps); judge whether a sentence is true of a picture; answer who/what/where/when/why from a story and point to the sentence that proves it.
- **Misconception 1 — the word that "goes with" the topic** (*quickly* after "look … in the tall grass": you can look quickly; it is *tiny* that demands *carefully*). The snapped thread runs between *tiny* and *quickly* — the keystone, not the neighbour, decides.
- **Misconception 2 — reading half the sentence** (soup "too hot … let it get **warm**"). The minimal-pair rounds (hot/cool, cold/warm) put the same three pieces with opposite keystones: a child who reads only the end gets one right and one wrong, and the snap points at *hot* or *cold*.
- **Misconception 3 — the last-named noun is "it"** ("The dog chased the ball. Then ___ brought it back": *the ball* is nearest, but a ball cannot bring). The thread from *brought* snaps at the ball.
- **Misconception 4 — doing roughly what it says** (three kites rung red when it said two; the second fish instead of the third). In Do rounds the threads run from each instruction word to the things the child marked; the one that does not match snaps (the thread from *two* to the third kite).
- **Misconception 5 — answering from memory, not from the text.** In Story questions the thread from the answer must find its proof sentence; a guess has no sentence to hold — the thread drifts, then snaps at the sentence that says otherwise.
- **How the material pushes back:** the thread — it holds only where the meaning agrees, and its snap point is the evidence.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504), bubble column right (176). Below 700: stacked.

**At 704 px** (stage 504 × 490):
- **Granny's book** (top strip, 504 × 44): nine page slots, mended pages as tiny coloured page edges (geometry).
- **The page** (y 54, 504 × 300): cream paper with a faint linen texture, a jagged tear (geometry) running through the text and across a corner of the picture panel.
  - **Text** (top of page, left-aligned, Nunito 22 px, line height 1.5, max 4 lines; stories up to 6 lines at 20 px): the sentence or story, with the gap as a torn hole sized to the LONGEST of the round's pieces (so the hole never measures the answer).
  - **Picture panel** (lower page, 460 × 150): 1–5 library pictures composed on a soft ground line (geometry), each **≥ 96 px**; in Fill/Fix rounds the tear's corner covers the part of the picture that would give the answer away (the old `answerDetailInTornRegion` rule), revealed when the page heals. Before healing the page is greyscale (CSS `filter: grayscale(1)` on the panel), after healing in full colour.
- **The basket** (y 366): three paper pieces **132 × 56** (word 22 px) lying in the open basket mouth; in Do rounds the basket holds crayons (three crayon tiles 64 × 56, geometry, colour + name of the colour printed) or sticker pictures (library pictures 72 px) instead; in True-or-not the basket holds two tools: a **needle-and-thread** card ("it's true — sew it in") and a **scissors** card ("it's not true — cut it out"), icons only.
- **The needle and thread:** drawn geometry (silver needle 40 px, red thread 3 px), parked on the basket rim.
- **Task line** above (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): book 360 × 36; page 360 × 300 (text 20 px, ≤ 5 lines; stories scroll INSIDE the page, never the window); picture panel 336 × 120 (pictures **≥ 64 px**); pieces in one row of three at 112 × 52 (or a 2 + 1 arrangement for long phrases, 160 × 52); bubble under; Check bottom ≤ 700 at 360 × 740. **At 320 × 640:** text 18 px, pictures 64 px, pieces 98 × 48; stories use a "page turn" (the story on one page, the question on the next, the child swipes back and forth); Check bottom ≤ 620.

No words on the apparatus besides the content (the story text, the pieces, the colour names on crayons).

## 5. The hand
- **Mend (Fill / Fix / Who):** drag a paper piece into the torn hole (or tap it — it flies in, 220 ms, a paper *shff*). It sits in the hole with its edge matching (all pieces share the same jag). Another piece replaces it.
- **Unpick (Fix):** first tap the word that doesn't fit — the needle unpicks it (*snip*, 180 ms): it lifts out leaving a torn hole; then mend the hole with a piece. Tapping a different word puts the first back.
- **Do:** pick a crayon (it lifts 6 px) then tap pictures — each tapped picture gets a ring of that colour (a 6 px coloured halo; the library picture itself is never recoloured); tap again to remove. Placing: drag a sticker picture (or the scene's own picture) to a spot; it lands where dropped and settles onto the nearest zone (on / under / beside / in front / behind / above, all zones invisible until help).
- **True or not:** drag the needle card or the scissors card onto the page.
- **Story:** tap a piece (answer) — it flies into the answer hole under the question.
- **Check = the needle sews** (§7). 60 ms per word stitch, 400 ms for the long keystone stitch; the thread then holds (page colours, 600 ms) or snaps (*ping*, frayed ends 2 s).
- **Free play:** between rounds the child can drag the needle along any mended page in the book — it re-sews it with all its colour.
- **Undo:** everything until Check; after a miss the child's piece stays so they can swap it.

## 6. The rounds
Pass = 9 rounds per clue; order reshuffled every pass, never the same order twice. The **keystone** (the word the meaning hangs on) is part of every round's data; the gate checks the thread runs to it.

**Clue "Fill the gap" (default).** Sentence with a torn gap; three pieces.

| # | sentence (keystone in **bold**) | right | other pieces | pictures (theme/noun) |
|---|---|---|---|---|
| 1 | The puppy was so **tiny** that Granny had to look ___ to find him in the tall grass. | carefully | quickly · loudly | pets/dog · spring/grass |
| 2 | The soup was too **hot**, so Granny made it ___. | cool | warm · soft | around-the-house/bowl · kitchen-tools/spoon |
| 3 | The soup was too **cold**, so Granny made it ___. | warm | cool · soft | around-the-house/bowl · kitchen-tools/spoon |
| 4 | It was **dark**, so Granny turned on the ___. | lamp | fan · rug | furniture/lamp (under the tear) |
| 5 | The kite **flew** high up in the ___. | sky | box · pond | beach/kite · weather/cloud |
| 6 | Sam was **cold**, so he put on his ___. | coat | swimsuit · sunglasses | clothing/coat (under the tear) |
| 7 | The bird made a **nest** in the ___. | tree | bath · shoe | spring/bird · tree/apple (an apple tree) |
| 8 | Mia was **thirsty**, so she drank a glass of ___. | water | bread · sand | kitchen-tools/glass |
| 9 | The snowman **melted** because the sun was so ___. | hot | cold · sad | winter/snowman · beach/sun |

Rounds 2 and 3 are the kept minimal pair (same pieces, opposite keystone). Critic: the old frame "…so Granny let it get warm" made cold soup warm itself; both now read "…so Granny made it ___", natural for both answers. With the "Longer pages" setting, two story-cloze rounds join (G2-350): "Granny planted a tiny **seed**. She watered it every day. Soon a tall ___ grew up." (flower · rock · cup; spring/flower) and "It rained all morning, so Ben stayed **inside**. He sat by the window and read a ___." (book · puddle · kite; classroom/book) — the keystone sits in an EARLIER sentence. With the Help setting "Letter boxes" (G1-366) the pieces are replaced by letter boxes (one per letter) and a letter tray — the child spells the gap word.

**Clue "Fix the word" (the old contradictions, plus five).** One word in the sentence does not fit: tap it, the needle unpicks it, mend with one of three pieces.

| # | sentence (wrong word in [ ], keystone in **bold**) | right piece | other pieces | pictures |
|---|---|---|---|---|
| 1 | It was **raining**, so Granny opened her **umbrella** to stay [wet]. | dry | hot · sad | weather/rainy · accessories/umbrella |
| 2 | The **fire** was hot, so Granny felt [cold] by it. | warm | wet · tall | camping/campfire |
| 3 | Ben was so [tall] that he **could not reach** the shelf. | short | big · strong | — |
| 4 | The snail was very [fast], so it took **all day** to cross the path. | slow | noisy · wet | spring/snail |
| 5 | The night was [bright], so Granny **lit a candle**. | dark | warm · loud | christmas/candle |
| 6 | The box was [empty], so it was too **heavy** to lift. | full | small · red | post-office/package |
| 7 | The dog was [dry], so Granny got a towel to **dry** it. | wet | big · happy | pets/dog |
| 8 | The bird sang a [sad] song, so Granny **smiled**. | happy | quiet · long | spring/bird |
| 9 | Mia was [full], so she **ate** a big lunch. | hungry | sleepy · wet | — |

The tap on the wrong word is graded with the mend: tapping a right word and "fixing" it is a miss (the thread snaps between the changed word and the keystone).

**Clue "Who is it?" (the old connect rounds, plus five).**

| # | text | right | other pieces | pictures |
|---|---|---|---|---|
| 1 | The dog chased the ball. Then ___ **brought it back** to Granny. | the dog | the ball · Granny | pets/dog · toys/ball |
| 2 | A little mouse found some cheese. Quickly ___ **ran** to its hole. | the mouse | the cheese · the hole | forest-creatures/mouse · at-the-supermarket/cheese |
| 3 | The bird pecked at the seeds. Soon ___ **were all gone**. | the seeds | the bird · the tree | spring/bird |
| 4 | Mia put the cup on the table. Then ___ **fell off and broke**. | the cup | the table · Mia | around-the-house/cup · around-the-house/table |
| 5 | The frog jumped on the log. ___ **caught a fly with its long tongue**. | The frog | The log · The sun | camping/frog · camping/log |
| 6 | Sam and Mia built a snowman. Then ___ **gave it a hat**. | they | it · the hat | winter/snowman |
| 7 | The cow ate the grass. The next day ___ **gave** lots of **milk**. | the cow | the grass · the day | farm-animals/cow · spring/grass |
| 8 | Ben gave the dog a bone. Then ___ **wagged its tail**. | the dog | Ben · the bone | pets/dog |
| 9 | Mia saw a big red bus. ___ **waved** to the driver. | Mia | the bus · the road | vehicles/bus |

9 rounds; in each the wrong pieces include the NEAREST noun (misconception 3). Critic: round 5 used to end "___ sat in the sun all day" — *the log sat in the sun all day* is a perfectly good sentence, so it had two right answers; a log cannot catch a fly.

**Clue "Do what it says" (read and do · read and colour · first/second/between · two steps · read and draw → read and place).** Pictures in the scene are identical instances where counting matters.

| # | instruction | scene | what the child does |
|---|---|---|---|
| 1 | Put the cat **under** the bed. | furniture/bed · animals/cat (beside it) | drag the cat |
| 2 | Put the cat **on** the bed. | same | drag the cat |
| 3 | Put the ball **beside** the dog. | pets/dog · toys/ball | drag the ball |
| 4 | Colour **two** balloons **red**. | toys/balloon ×5 | red crayon, ring two |
| 5 | Colour the **third** fish **blue**. | ocean-life/fish ×4 in a row | blue crayon, ring the 3rd from the left |
| 6 | Colour the fish **between** the crab and the starfish **yellow**. | crab · fish · starfish · fish (beach/crab, ocean-life/fish, ocean-life/starfish) | yellow crayon, ring the fish in place 2 |
| 7 | Put a sun **above** the house. **Then** put a cat **in front of** the house. | miscellaneous/house + sticker tray (beach/sun · animals/cat · beach/kite) | two placements, in order |
| 8 | Colour **one** balloon **red** and **two** balloons **blue**. | toys/balloon ×5 | two crayons |
| 9 | Put the frog **on** the log, **then** put the bird **above** the log. | camping/log + stickers (camping/frog · spring/bird · beach/kite) | two placements |

Colour is shown as a coloured ring around the picture (the library picture is never recoloured); each crayon also prints its colour's NAME, so colour-blind children read it. "Left" is the child's left; ordinals count from the left (the instruction says so in rounds 5–6 by a small arrow at the row's start — geometry).

**Clue "True or not?" (G1-341, and G1-368 with the "Two pictures" Help setting).** A scene and a sentence; sew it in (true) or cut it out (not true).

| # | scene | sentence | answer |
|---|---|---|---|
| 1 | cat ON the bed | The cat is **under** the bed. | not true |
| 2 | farm-animals/duck ×3 | There are **three** ducks. | true |
| 3 | dog with toys/ball | The dog has a **hat**. | not true |
| 4 | winter/snowman (wears a top hat) | The snowman has a **hat**. | true |
| 5 | apple ×2, banana ×1 | There are **two bananas**. | not true |
| 6 | frog on log | The frog is **on** the log. | true |
| 7 | around-the-house/cup standing ON around-the-house/table | The cup is **under** the table. | not true |
| 8 | toys/balloon ×4 | There are **four** balloons. | true |
| 9 | animals/cat · accessories/ribbon (a bow) on its head · around-the-house/door | The cat with a **bow** sits by the **door**. | true |

True 5 / not true 4 per pass, never four of one in a row. Critic: the old round 7 (a bird beside a nest — and `spring/nest` already holds two chicks) was true for a child who counts the chicks as birds; replaced. **Measured** (`work-c23/m115.js`): picking the longest piece wins 3.5 / 2.2 / 2.0 of 9 in Fill / Fix / Who, the shortest 3.0 / 1.5 / 1.5 (chance 3) — the old Fix pieces let "longest" win 4.7 of 9 (*short, slow, hungry* were all the longest), now re-cut. **Two pictures (G1-368):** the sentence and two scenes (e.g. round 9's cat with a bow vs the same cat without; the kept *match-paw* round is re-authored as "The big dog has a **ball**" — dog with ball vs dog with a hat), drag the page onto its picture; the threads run from the sentence's words to the chosen scene and snap at the missing thing.

**Clue "Story questions" (G2-254, G2-269–273).** A 4-sentence story, three questions each; the answer's thread must find its PROOF sentence.

Story 1 — *Granny planted a tiny seed in a pot. She watered it every day. One morning, a red flower opened. Granny put the pot by the window.* (spring/flower · around-the-house/window)
- What did Granny plant? → **a seed** (a flower · a pot) — proof: sentence 1.
- When did the flower open? → **one morning** (every day · at night) — proof: sentence 3.
- Where did Granny put the pot? → **by the window** (in the garden · on the bed) — proof: sentence 4.

Story 2 — *Sam flew his kite at the park. The wind blew hard and the kite got stuck in a tree. Mia got a long stick. She pulled the kite down, and Sam said thank you.* (beach/kite · tree/apple)
- Who helped Sam? → **Mia** (the wind · Granny) — proof: sentences 3–4.
- Why did the kite get stuck? → **the wind blew hard** (Mia pulled it · Sam was sad) — proof: sentence 2.
- What did Mia use? → **a long stick** (a rope · a ladder) — proof: sentence 3.

Story 3 — *It rained all morning. Ben could not play outside, so he read a book about whales. After lunch the sun came out. Ben put on his boots and jumped in the puddles.* (weather/rainy · beach/whale · spring/puddle)
- Why did Ben stay inside? → **it rained** (he was sleepy · he was sick) — proof: sentences 1–2.
- What was Ben's book about? → **whales** (boots · puddles) — proof: sentence 2.
- What did Ben do after lunch? → **jumped in the puddles** (read a book · ate lunch) — proof: sentence 4.

The kept **order** rounds (seed: planted → watered → grew; rain: sky dark → rain fell → umbrella) and **sort** rounds (wear/eat; day/night) join this clue as rounds 10–13 under the "Longer pages" setting: order — strips stitched top to bottom, the thread snaps between two strips out of order and their time words glow; sort — each sentence is stitched to the basket (wear / eat, day / night — drawn basket labels are pictures: clothing/hat, at-the-supermarket/apple; beach/sun, camping/moon) and snaps if the sentence's meaning word does not belong.

**Answer position.** The right piece's place in the basket (left / middle / right) is 3/3/3 per pass by a fixed Latin square, never the same twice running; True/not true 5/4 with no run of four; Story answers balanced across the three places; the torn hole is always as wide as the longest piece; all pieces share one jag shape.

**Order:** order-only reshuffle per pass (stories keep their three questions in story order but the stories reshuffle).

**Other locales** (the build authors every sentence natively — rebuilt, never translated — and one native + pedagogy reviewer reads the full text dump). Every round must keep its KEYSTONE in the authored sentence and its minimal pairs; the gate checks the keystone word exists in each locale's sentence.

## 7. Check, the misses, the success
- **Check with the hole empty / nothing marked / no tool chosen:** hint, no miss — the hole (or the crayons, or the tools) pulses — "Choose a piece for the torn hole." / "Read the sentence, then do what it says."
- **Miss 1:** the needle sews; the word stitches hold up to the trouble, then the long thread to the keystone SNAPS between the two words that disagree (both glow coral-gold, frayed ends hang); in Do and True rounds, threads run from each instruction word to the scene and the one that does not match snaps at the wrong object (or at the empty place where something should be); in Story rounds the answer's thread drifts over the story and snaps at the sentence that says otherwise. The page stays grey. · "The thread broke between {tiny} and {quickly}. Do those two words go together?" · Do: "The thread broke at {two}. Read that word again." · Story: "Find the sentence that tells you."
- **Miss 2:** the keystone word lifts and is underlined in gold with a soft pulse (Fill/Fix/Who); in Do rounds the drop zones appear as dashed outlines and the counted objects get small number tags 1, 2, 3 …; in Story rounds the proof sentence is shaded pale gold. · "This word tells you what fits: {tiny}." / "Count again: 1, 2 …" / "The answer is in this sentence."
- **A new move takes the help away** until the next Check.
- **Success:** the thread pulls tight (*zip*), the tear closes from the stitches outward, the page floods with colour, the pictures come alive (one small motion each: wag, blink, sway, bob); the page binds into Granny's book. · Fill: "{The puppy was so tiny that Granny had to look carefully to find him in the tall grass.} Mended!" (the whole healed sentence) · Fix: "{wet} → {dry}: now every word agrees." · Who: "{The dog} brought it back!" · Do: "Two red balloons — just what it said!" · True or not: "True — sewn in!" / "Not true — cut out!" · Story: "Yes: {a seed}. It says so here."

## 8. Settings
1. **Clue:** Fill the gap (default) · Fix the word · Who is it? · Do what it says · True or not? · Story questions — each visibly different at rest (pieces / a whole sentence with no hole / two-sentence text / crayons or stickers / needle and scissors cards / a story with a question).
2. **Help:** Pieces (default) · Letter boxes (Fill only: spell the gap word, G1-366) · Longer pages (story-cloze, order and sort rounds; G2-350) · Two pictures (True or not → match the sentence to the picture, G1-368). Visible at rest.

## 9. Words (EN source)
- title (shell, frozen): **Granny's Mending Basket** · instruction: "Read carefully. Mend the page with the piece the meaning needs — the thread only holds if the words agree."
- task lines: fill — "Which piece mends the sentence?" · fix — "Tap the word that doesn't fit, then mend it." · who — "Who is it? Mend the gap." · do — "Read it, then do exactly what it says." · true — "Is it true? Sew it in — or cut it out." · story — "Read the story. Answer the question."
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drag a paper piece into the torn hole."
- settings: "Clue", "Fill the gap", "Fix the word", "Who is it?", "Do what it says", "True or not?", "Story questions", "Help", "Pieces", "Letter boxes", "Longer pages", "Two pictures". Crayon names: "red", "blue", "yellow", "green". aria: "Page: {text}", "Torn hole: {piece|empty}", "Piece: {text}", "Thread held", "Thread broke between {a} and {b}", "Picture: {name}, ringed {colour}", "Placed {name} {zone} the {name}".

**Locale traps:**
- **Rebuild, never translate:** each locale's keystone must stay a single readable word and still force exactly one piece (es/pt/it/fr adjective agreement: *la sopa … fría / se enfrió*; de separable verbs and verb-final clauses can push the gap to the end — the keystone must still precede it or the round is re-authored).
- **Pronouns and gender (Who is it?):** fr/es/it/pt/de nouns carry gender, so "it" rounds become *il/elle*, *er/sie/es* — a gender clue that can give the answer away by grammar alone; the authored gap is the full noun phrase (*le chien*) and the three pieces have the SAME gender where possible.
- **Ordinals** (*dritte*, *troisième*, *tercero*, *kolmas*) and "between"; "left" is the child's left in every locale.
- **Colour names** per locale on the crayons; no colour is named in English outside en.
- **Plural agreement** (*were all gone*) is a deliberate clue in en; in fi/sv where it differs, the keystone moves to the verb or noun.
- **Picture labels** come from `image-vocabulary.js` when a picture is named in text (*Kaninchen*, *Seestern*…); `spring/nest` already holds two chicks (picture ruling) — used only where that is true to the sentence; `weather/cloud` has a smiling face — used as a background cloud only.
- **Sound off:** the thread (holds / snaps between two words), the gold keystone, the coloured page carry everything; TTS reads the healed sentence where reliable.

## 10. Sound off, access, phones
- **Silent legibility:** every verdict is the thread: where it snaps names the two disagreeing words or the object that does not match; the page turning colour is success.
- **Keyboard:** Tab to pieces, Enter places in the hole; Fix: Tab through the sentence's words, Enter unpicks; Do: Tab to crayons, Enter picks, Tab through scene pictures, Enter rings; placing: Enter picks up a sticker, arrow keys move it between zones, Enter drops; True: Tab to the two tool cards; Story: Tab to answers; Space = Check.
- **aria-live:** "Thread broke between tiny and quickly." / "Thread held. Mended: The puppy was so tiny …"
- **Taps:** pieces ≥ 98 × 48, crayons 64 × 56, tool cards 96 × 64, scene pictures ≥ 64 px with 44 px minimum hit; text never below 18 px.
- **Phone layout:** stacked; stories scroll inside the page or use the page turn at 320 px; Check above the 360 × 740 and 320 × 640 folds (measured on every round, including the longest story).

## 11. Distinct from
- **Row 65 The Book That Cracks and Mends** (story spine — events in order; a cracked book mends when the order is right): order of events; here the thread tests agreement BETWEEN WORDS inside sentences and between a sentence and a picture, and its snap point is the evidence.
- **Row 67 The Proof Pins** (pin a picture detail that proves a sentence): pins from text to picture; here a sewing thread through the sentence itself, with a keystone stitch and a visible snap between disagreeing words; true/not true is a sew/cut decision, and stories demand the proof SENTENCE.
- **Row 69 The Highlighter That Lifts Facts** (informational facts): highlighting; no mending, no agreement test.
- **Row 124 The Pronoun Prism / New 217 The Article Caps:** grammar of single words; here meaning across a sentence.
- **Built registry:** no thread, needle or snapping link exists.

## 12. Build plan
- **Core state** `{locale, clue, help, round:{type, tokens:[{t}|{gap}], keystone:int, answer, pieces:[p], scene:[{pic, x, zone, id}], instruction:{ops:[{verb, colour|zone, count|ordinal|between, target}]}|null, story:{sentences:[s], q, proof:[int]}|null}, hole:piece|null, unpicked:int|null, marks:{picId:colour}, placed:{picId:zone}, tool:'sew'|'cut'|null, misses, help}`.
- **Functions:** `mend(piece)`, `unpick(i)`, `pickCrayon(c)`, `ring(picId)`, `place(picId, zone)`, `chooseTool(t)`, `answer(piece)`, `sew()` → `{held:bool, snap:{a:wordIdx|picId, b:wordIdx|picId}|null}` (Fill/Fix/Who: compare piece to answer; Do: evaluate every op against marks/placed, snap at the first unmet op; True: compare tool to the round's truth; Story: compare answer, snap at the contradicting sentence index), `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-mending-basket-core.js`): its OWN round table (answers, keystones, truth values, op lists) authored in the gate; asserts every keystone index points at a word present in the sentence and BEFORE the gap where the round says so; minimal pairs (soup hot/cold, cat on/under) exist with identical pieces; every hole is sized to the longest piece; right-piece slots 3/3/3; True/not true 5/4 with no run of 4; every Do round's ops are satisfiable in exactly one way (enumerated over all ring/place combinations); every Story proof index names a sentence that contains the answer phrase; every picture exists in a colour theme; no hand-drawn character or object in the wrapper (no `<path>` outside apparatus geometry ids).
- **Mutations (one per rule):** let a wrong piece hold · snap at the neighbour instead of the keystone · accept three rings for "two" · count ordinals from the right · accept a placement in the wrong zone · show the keystone gold before a miss · hole sized to the right piece · True rounds all "true" · story answer accepted without a proof sentence · keep help after a new move · recolour the library picture instead of ringing it · right piece always in the middle.
- **Pictures:** seen 2026-10-17 (`work-23/s115.png`, `s111.png`, `s112.png`, `s110.png`, `s113.png`): book, car, balloon (a single green balloon), door, nest (holds two chicks), bird, puddle, flower, tree/apple, glass, cloud (a smiling pink cloud — background only), campfire, fireplace, package (a cardboard box), bowl, spoon, candle, house, starfish, dog, ball (a football), cat, bed, mouse, rug, lamp, umbrella, rainy, snowman (top hat), kite, cup, table, frog, log, cow, grass, cheese, coat, sun, ribbon (a BOW — used AS a bow here), snail, whale. Still to view: clothing/swimsuit, accessories/sunglasses, farm-animals/duck (seen small), ocean-life/fish, beach/crab, at-the-supermarket/apple, at-the-supermarket/banana, camping/moon.
- **Risks:** text length per locale (fi and de sentences run long — the page measures at 18 px floor, and a round that cannot fit is re-authored, never shrunk); five identical pictures do not fit one row at 320 px at the 64 px floor (5 × 64 + gaps = 344), so five-object colour rounds use a 3 + 2 two-row arrangement at 320 px, and the ordinal rounds (third, between) use rows of FOUR (4 × 64 + 3 × 12 = 292) so the row is never broken — measured.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a needle that sews the page with a red thread, a page that floods from grey into colour, pictures that come alive, and a thread that snaps with a *ping* right where the mistake is.
2. **Would a teacher put it on the board?** Yes — "find the word that the meaning hangs on" is exactly close reading for grade 1; the snap shows the two words that disagree, the Do rounds check every word of an instruction, and the story rounds demand the proof sentence.
3. **Would a parent trust it?** Yes — library pictures only, no hand-drawn characters, every sentence authored natively, calm, nothing sold.
4. **The invention:** a sewing thread that only holds where the words agree — and snaps exactly between the two words (or the word and the picture) that disagree.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Two-right-answer round fixed: "The log sat in the sun all day" was a good sentence → "___ caught a fly with its long tongue".
- True-or-not round 7 (a bird beside a nest that already holds chicks) was true for a child who counts chicks as birds → cup on the table / "The cup is under the table".
- Fix-the-word pieces re-cut: "pick the longest piece" won 4.7 of 9 (short, slow, hungry were all longest) → 2.2 (measured, `work-c23/m115.js`).
- Soup minimal pair reframed ("…so Granny made it ___"): cold soup does not get warm by itself. Who-is-it grown from 7 to 9 rounds (dog/bone, Mia/bus). Do round 9 names the log instead of an ambiguous "it".
