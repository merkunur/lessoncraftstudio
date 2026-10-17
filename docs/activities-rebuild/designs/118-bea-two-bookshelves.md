# Row 118 — Bea's Two Bookshelves → THE SHAKER SHELF AND THE RIBBON SHELF (RL.1.5)

## 0. Identity
- **id** `bea-two-bookshelves.story-or-fact.rl-1-5` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build, grade 1) · CCSS RL.1.5 ("explain major differences between books that tell stories and books that give information, drawing on a wide reading of a range of text types") · strand Reading: Literature · own files `bea-two-bookshelves-core.js` (new), `bea-two-bookshelves-activity.js` (rewritten), html, `bea-two-bookshelves-activities.json` (rounds kept and extended).
- **Worksheets covered:** none mapped.
- **Old activity:** three book covers (title + one-line blurb); Bea asks for the story book or the fact book; tap it. **Kept:** all 8 EN rounds (asks, the 10 books, titles and blurbs, bands) and the de/fr/es/pt/it/nl sets; the frozen task ("read the three covers, tap the one Bea asks for") stays Level 1. Bea the bookworm becomes the library `insects-and-bugs/worm` (forest-creatures/earthworm as fallback — §12). **Added:** every book now has three inside pages; 5 new books that share a topic with an existing one (so topic can never decide); the two shelves become the test.

## 1. The pitch
"Bea's two shelves test a book the way the books themselves are made: the fact shelf shakes every book's pages into a new order — a fact book still makes sense, because every page stands on its own — while the story shelf ties a ribbon through the pages from beginning to end, and only a story has a beginning, a middle and an end to tie."

## 2. Why a child will want it again
- **Books you can open and shake.** Each cover (drawn geometry: a hardback with a spine and a library picture on the front) opens with a tap into a three-page strip. A "shake" handle on the book (or a real wiggle-drag) flips the pages into a random new order with a papery flutter — children love shaking books.
- **Two shelves with personalities.** The **shaker shelf** (fact books) has a little rocking mechanism: a book put on it gets rattled (300 ms shimmy), its pages flash up in a new order and settle. The **ribbon shelf** (story books) has a red ribbon on a spool: a book put on it gets the ribbon threaded through its pages, page 1 → 2 → 3, and if it can, the ribbon ties a bow on the spine.
- **The reactions are funny and fair.** A story book on the shaker shelf comes out with its ending first ("At last Bunny found her mitten. / Bunny hopped all over town. / Bunny lost her mitten.") — it slumps sideways, its pages hurry back into order, and it hops back to the desk. A fact book on the ribbon shelf: the ribbon finds three headings and no beginning or end, slips off, and the book slides back.
- **The earned show:** the right book stands tall on its shelf; the bow ties (ribbon shelf) or the book stays perfectly upright after its shake (shaker shelf); Bea pops her head over the shelf top and the book's spine gets a little coloured band (story = ribbon red, fact = shaker teal). At the end of a pass, Bea's two shelves are full — a library the child sorted.
- **Free play:** any book on the desk can be opened and shaken at any time — reading the shaken pages is how a child discovers the difference.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.1.5):** tell books that tell stories from books that give information, and explain the differences: a story has characters and a made-up happening that goes from a beginning to an end; an information book teaches true facts about real things, with headings, and its pages can be read in any order.
- **Misconception 1 — judging by topic** ("it's about bees, so it's a fact book"). In Level 2 two books share a topic and a library picture style (*How Bees Make Honey* / *Buzz Flies to the Moon*); only reading the pages decides.
- **Misconception 2 — judging by the picture or the title's look.** Covers carry the same kind of library picture; titles of both kinds can sound alike.
- **Misconception 3 — "a story is anything with an animal in it".** Fact books about rabbits sit beside a story about a bunny.
- **The material pushes back** through the shelves' tests, which ARE the difference: order matters in a story (the ribbon), not in a fact book (the shaker). Plus the content difference (make-believe vs real) is visible on the pages the child reads. No text says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: the desk with books left (430 px), the two shelves + Bea + bubble right (240 px); stacked below.

**At 704 px:**
- **The desk** (left): 3 books standing (Level 3: 4 books), each cover 128 × 176 px: title 18 px bold across the top and a library picture 96 × 96 in the middle. The blurb (16 px) is on the inside cover, shown when the book is opened (§5), so the closed cover stays readable at its size.
- **The open book** (overlay over the desk, 420 × 260): three pages side by side (130 × 220 each), 16 px text; story pages: one sentence each; fact pages: a heading (16 px bold) + one sentence. A shake handle (a round knob, 44 px) on the open book's spine; a close tab.
- **The shelves** (right column, each 230 × 120): top = **ribbon shelf** (a red ribbon spool at its left end), bottom = **shaker shelf** (two small springs under its plank). Each shelf has a symbol plate, no words: a ribbon bow / a pair of shake lines. Bea's ask uses the same symbols plus the word.
- **Bea:** library `insects-and-bugs/worm`, 96 × 96, peeking over the top shelf.
- **Bea's ask** (bubble near Bea): "Find the STORY book!" with the ribbon symbol, or "Find the FACT book!" with the shaker symbol (the frozen intro's task).
- **Task line (EN, 22 px):** "Read the books. Find the one Bea asks for, and put it on its shelf."

**At 360 px:** single column: Bea + ask (Bea 64 px) → desk with 3 covers in a row, 100 × 140 each (picture 72 px, title 15 px, 2 lines) → shelves side by side 160 × 96 each → Check ≈ 640 px (360 × 740). The open book becomes one page at a time, swiped or tapped (page dots 1–3 at its foot) with the shake knob still on the spine. At 320 × 640: covers 92 × 132 (picture 66), Check ≈ 600. Level 3 (4 books): 2 × 2 covers.
- No words on the apparatus except the books' text (content) and Bea's ask.

## 5. The hand
- **Tap a cover** → it opens (240 ms page fan) showing its three pages; the blurb sits under the title on page 0 (the inside cover).
- **Shake** (knob tap, or a quick left-right drag of the open book) → the pages shuffle into a new order (350 ms flutter, a rattle sound); shake again → another order. A story's shaken pages stay shaken until the child taps "close" (they snap back to order on close).
- **Choose:** drag a closed cover to a shelf, or tap a cover then tap a shelf (tap-tap path for phones). The book slides onto the shelf (280 ms) but nothing is tested yet.
- **Check:** the shelf runs its test on the book(s) placed on it (§7).
- **Undo:** drag/tap a book on a shelf back to the desk.
- **Keyboard:** Tab through covers; Enter opens; S shakes; 1/2 sends the focused book to the ribbon/shaker shelf; C = Check.
- **Free play:** open and shake any book any time.

## 6. The rounds
**8 rounds per level, order-only reshuffle per pass.**

**The books (EN; kept titles + blurbs, NEW inside pages; pictures):**
| book | kind | blurb (kept) | pages (new) | cover picture |
|---|---|---|---|---|
| The Sleepy Dragons | story | Two dragons go looking for a cozy nap. | "Two little dragons could not fall asleep." / "They flew to a soft cloud, but it was too wet." / "At last they curled up in a warm cave and snored." | things-that-fly/dragon |
| All About Real Bugs | fact | Facts about bugs and where they live. | **Where bugs live** — Many bugs live under rocks and logs. / **Bug legs** — Every insect has six legs. / **Bug homes** — Ants live together in a nest. | insects-and-bugs/ladybug |
| Diggers and Cranes | fact | How real machines lift and dig. | **Diggers** — A digger scoops dirt with its bucket. / **Cranes** — A crane lifts heavy things up high. / **Wheels and tracks** — Big diggers roll on tracks, not wheels. | vehicles/excavator |
| Bones in Your Body | fact | The real bones that hold your body up. | **Your skull** — Your skull keeps your brain safe. / **Your ribs** — Your ribs keep your heart and lungs safe. / **Growing bones** — Your bones grow as you grow. | hospital/x-ray |
| Bunny's Lost Mitten | story | Bunny hops all over town to find it. | "One cold day, Bunny lost her yellow mitten." / "She hopped to the shop, the park and the pond." / "At last she found it on her own front step." | accessories/mitten |
| How Tall Trees Grow | fact | A seed becomes a tree over many years. | **Roots** — Roots drink water from the ground. / **Leaves** — Leaves use sunlight to make food for the tree. / **Bark** — Bark keeps the tree safe, like skin. | tree/apple |
| How Bees Make Honey | fact | Real bees turn flower nectar into honey. | **Flowers** — Bees drink sweet nectar from flowers. / **The hive** — Thousands of bees live together in one hive. / **Honey** — Bees keep their honey in tiny wax rooms. | spring/bee |
| The Brave Red Boat | story | A little boat sails through a big storm. | "A little red boat sailed out to sea." / "A big storm came, and the waves grew tall." / "The brave boat sailed home, and the sun came out." | vehicles/boat |
| Goblin's Sock Hunt | story | A goblin sneaks around for missing socks. | "Every night, a goblin crept into the laundry room." / "He looked for socks that had lost their partners." / "In the morning, every sock had a new friend." | accessories/sock |
| Pip's Lucky Acorns | story | Pip plants acorns and makes a wish. | "Pip the squirrel found three shiny acorns." / "He planted them and made a wish." / "In spring, three tiny oak trees waved hello." | miscellaneous/acorn |
| **Buzz Flies to the Moon** (NEW) | story | A little bee dreams of visiting the moon. | "Buzz the bee wanted to visit the moon." / "She built a rocket out of a sunflower." / "At last Buzz landed on the moon and said hello." | spring/bee |
| **Real Rabbits** (NEW) | fact | What real rabbits eat and where they live. | **Food** — Rabbits eat grass and leafy plants. / **Homes** — Wild rabbits live in holes called burrows. / **Ears** — Long ears help rabbits hear danger. | pets/rabbit |
| **Boats That Float** (NEW) | fact | Why real boats float on water. | **Floating** — A boat floats because it pushes water away. / **Sails** — Wind pushes on a sail to move a sailboat. / **Engines** — Big ships use engines to move. | beach/sailboat |
| **The Tree Who Wanted to Walk** (NEW) | story | An old tree dreams of seeing the world. | "An old tree wished it could walk." / "One night it pulled up its roots and tiptoed to the sea." / "By morning it was home again, happy to stay." | tree/apple |
| **Digby Can't Sleep** (NEW) | story | A little digger is too excited for bed. | "Digby the digger could not sleep." / "He dug a hole, then a hill, then a tunnel." / "At last he yawned and fell asleep in his tunnel." | vehicles/excavator |
Every story has a named character, a made-up happening, and a beginning-middle-end with time words in its first and last page; every fact book has three headings, present-tense general facts about real things, and pages that stand alone in any order. **Critic fix — the shaker test must be TRUE of every fact book:** the old pages of *How Bees Make Honey* (nectar → back to the hive → turns into honey) and *How Tall Trees Grow* (seed → roots → taller every year) were STEPS — shaken, they would not make sense, and the shaker shelf would have contradicted itself. Both now carry three stand-alone "all-about" facts (above). Rule for every locale: a fact page never refers to another page and carries no sequence word (en first/then/next/after that/later/at last; each locale's list in the gate). Honest scope for the teacher prose: Bea's fact books are *all-about* books; real how-to and life-cycle books DO go in order — the shelves teach the main difference at grade 1 (a story needs its order; an all-about book does not), not that every non-fiction book is unordered. Same pictures recur across kinds on purpose (spring/bee, tree/apple, vehicles/excavator, the boats) so a picture never decides.

**Level 1 — Bea asks (kept rounds sf1–sf8, the frozen task):**
| # | ask | books (kept order) | right |
|---|---|---|---|
| 1 | story | The Sleepy Dragons · All About Real Bugs · Diggers and Cranes | Sleepy Dragons |
| 2 | story | Bones in Your Body · Bunny's Lost Mitten · How Tall Trees Grow | Bunny's Lost Mitten |
| 3 | story | How Bees Make Honey · Bones in Your Body · The Brave Red Boat | Brave Red Boat |
| 4 | story | How Tall Trees Grow · Goblin's Sock Hunt · Diggers and Cranes | Goblin's Sock Hunt |
| 5 | fact | Bunny's Lost Mitten · Goblin's Sock Hunt · How Bees Make Honey | How Bees Make Honey |
| 6 | fact | Bones in Your Body · The Sleepy Dragons · Pip's Lucky Acorns | Bones in Your Body |
| 7 | fact | Bunny's Lost Mitten · The Brave Red Boat · How Tall Trees Grow | How Tall Trees Grow |
| 8 | fact | The Sleepy Dragons · Diggers and Cranes · Goblin's Sock Hunt | Diggers and Cranes |
Asks 4 story / 4 fact; the displayed cover order is shuffled per presentation (kept order is the source only); the gate measures ≤ 3 of 8 per slot.

**Level 2 — Same topic (NEW; two books share a topic, the third is the other kind):**
| # | ask | books | right |
|---|---|---|---|
| 1 | story | How Bees Make Honey · Buzz Flies to the Moon · Bones in Your Body | Buzz Flies to the Moon |
| 2 | fact | Buzz Flies to the Moon · How Bees Make Honey · Pip's Lucky Acorns | How Bees Make Honey |
| 3 | story | Real Rabbits · Bunny's Lost Mitten · Boats That Float | Bunny's Lost Mitten |
| 4 | fact | Bunny's Lost Mitten · Real Rabbits · The Sleepy Dragons | Real Rabbits |
| 5 | story | Boats That Float · The Brave Red Boat · All About Real Bugs | The Brave Red Boat |
| 6 | fact | The Tree Who Wanted to Walk · How Tall Trees Grow · Goblin's Sock Hunt | How Tall Trees Grow |
| 7 | story | Diggers and Cranes · Digby Can't Sleep · How Tall Trees Grow | Digby Can't Sleep |
| 8 | fact | Digby Can't Sleep · The Brave Red Boat · Diggers and Cranes | Diggers and Cranes |

**Level 3 — Fill both shelves (NEW; 4 books, 2 of each kind, no ask — every book goes on its shelf):** 8 sets drawn from the 15 books, each with at least one same-topic pair, e.g. {Buzz Flies to the Moon, How Bees Make Honey, Digby Can't Sleep, Real Rabbits}; the gate builds 8 fixed sets so every book appears 2–3 times per pass.

**Answer position — a fixed balanced table, not a random shuffle:** the asked-for book's displayed slot over rounds 1–8 is 1,2,3,1,2,3,3,2 in Level 1 and 2,3,1,3,1,2,1,2 in Level 2 (each 2/3/3 or 3/3/2 — no slot > 3), rotated by +1 each pass; in Level 3 the 2+2 split is fixed and the four positions follow a table where each kind holds each slot 4 times per pass. Title-keyword bot ("How / All About / Real" → fact): EN measured by hand — it decides outright in Level 1 rounds 5 and 7 only (2/8; a coin flip in 4 story rounds, useless in rounds 6 and 8) and in Level 2 rounds 2, 4, 6 (3/8; a coin flip in the 4 story rounds, useless in round 8); it can never be zero honestly (such words DO mark all-about books), so the gate holds its expected score ≤ 5/8 and the same-topic pairs carry the rest. Cover pictures never decide (the same picture is on both kinds in Level 2 rounds 1–2, 6, 7–8).

## 7. Check, the misses, the success
- **Check with no book on a shelf** → no miss; the asked shelf glows its symbol. Hint: "Put a book on Bea's {story|fact} shelf."
- **The tests (every Check):** the ribbon shelf threads its books page 1 → 2 → 3 (each page lights in turn, 250 ms) and tries to tie a bow; the shaker shelf rattles its books and shows their pages in a new order for 1.5 s.
- **Miss 1:**
  - story book on the shaker shelf → its shaken pages are shown big (ending first, beginning last); the time words *At last* / *One cold day* get a dotted underline; the book slumps, its pages hurry back into order, it returns to the desk. Hint: "Shaken up, this book doesn't make sense any more. A book that has to go in order is a story."
  - fact book on the ribbon shelf → the ribbon runs over three headings, finds no beginning (all three pages light at once), slips off; the headings get a dotted underline; the book returns to the desk. Hint: "These pages each tell their own fact. There is no beginning and end to tie."
- **Miss 2:** the right book on the desk opens itself to its pages and the decisive marks are underlined — story: the character's name and the first/last time words; fact: the three headings and a real-fact word ("Every insect has six legs"). Hint: "Look inside. Does it tell a make-believe story, or true facts?"
- A new move removes the underlines until the next Check.
- **Success:** the ribbon ties a bow (story) or the book stays bolt upright after its shake (fact), Bea pops up, the spine gets its band. Bubble: story "Yes — {title} is a story: it has a beginning, a middle and an end." · fact "Yes — {title} is a fact book: it teaches true facts, page by page." (Level 3: "Both shelves are right!").

## 8. Settings
1. **Books:** Bea asks / Same topic / Fill both shelves — at rest: 3 covers + an ask (first two) or 4 covers and no ask (third).
2. **Inside pages:** closed until opened / open on the desk — "open" lays every book's three pages under its cover (more reading on the board, no tapping needed — for whole-class use on a whiteboard).

## 9. Words (EN source)
- title "Bea's Two Bookshelves" · instruction "Read the books. Find the one Bea asks for, and put it on its shelf." · instruction (fill both) "Read the books. Put every book on its shelf."
- ask "Find the STORY book!" · "Find the FACT book!"
- hints: empty "Put a book on Bea's {story|fact} shelf." · storyOnShaker "Shaken up, this book doesn't make sense any more. A book that has to go in order is a story." · factOnRibbon "These pages each tell their own fact. There is no beginning and end to tie." · miss2 "Look inside. Does it tell a make-believe story, or true facts?"
- success story "Yes — {title} is a story: it has a beginning, a middle and an end." · fact "Yes — {title} is a fact book: it teaches true facts, page by page." · both "Both shelves are right!"
- settings: "Books" — "Bea asks" / "Same topic" / "Fill both shelves" · "Inside pages" — "Closed until opened" / "Open on the desk"
- aria: cover "{title}, book" · page "page {i}: {text}" · shelf "story shelf (ribbon)" / "fact shelf (shaker)" · shake "shake the pages".
- **Locale traps.** (1) School terms: en "story book / fact book", de "Geschichte / Sachbuch", fr "histoire / documentaire", es "cuento / libro informativo", pt-BR "história / livro informativo", it "racconto / libro di informazioni", nl "verhaal / informatieboek", sv "berättelse / faktabok", da "historie / faktabog", no "fortelling / faktabok", fi "tarina / tietokirja" — use the classroom pair. (2) Titles are translated *as titles* (natural book titles in that language, rhythm over literalness: de "Hoppels verlorener Fäustling" kept). (3) Story time words ("Once / At last") per locale ("Es war einmal / Endlich", "Il était une fois / Enfin", "Había una vez / Por fin", "Det var en gång / Till slut", "Olipa kerran / Lopulta"). (4) Fact pages in the general present ("Bees drink nectar") — fi/sv/de use the plain present; avoid "the bee" singular-generic where it reads like a character. (5) "Six legs" facts are numerals or words as each locale's school books write them (keep consistent per locale). (6) es-MX: "libro informativo"; pt-BR: "livro informativo".

## 10. Sound off, access, phones
- Legible with the sound off: covers, pages and shelf reactions; TTS on long-press of a page where a voice exists (bonus).
- Shelf symbols (ribbon bow / shake lines) pair with the words in Bea's ask, so shelves are told apart without colour.
- Keyboard §5; live region narrates the tests ("Ribbon: page 1, page 2, page 3 — tied." / "Shaken: pages now 3, 1, 2.").
- Taps: covers ≥ 100 × 140; shake knob 44 px; shelves ≥ 96 px tall; Check 48 px.
- Cover pictures 96 px at 704, 72 px at 360 (66 at 320 — above the 64 floor).
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 600).

## 11. Distinct from
- **Row 66 Inky's Two Inks** (author vs illustrator roles) and **Row 68 Story Zipper** (two stories compared) — different acts.
- **Row 121 Field Guide** (sibling): uses text features to locate; Bea classifies the kind of book — the headings appear here as one *sign* of a fact book, not as tools.
- **Row 116 lantern / 117 lens / 119 windows** (siblings) — no shelves, no shaking.
- Premium tool **story-line** (peg story cards in order on a clothesline) — the ribbon shelf runs a *test* of whether a book has an order; the child never builds a sequence here.

## 12. Build plan
- **Core** `BeaShelvesCore`: `books(locale)` → `{id, kind, title, blurb, pages:[{heading?, text}], picture}`; `shake(book, rng)` → page order; `ribbonTest(book)` → `{tied: kind==='story'}`; `shakerTest(book)` → `{upright: kind==='fact'}`; `check(round, placements)`; rounds per level; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-bea-two-bookshelves-core.js`): independent EN kinds; for every locale and book: story pages = 3, the first contains a locale "beginning" marker or a named character and the last a locale "ending" marker (from a per-locale marker list the gate owns); fact pages = 3 each with a non-empty heading and no named character (no capitalised name from the locale's `names` list); every round has exactly one book of the asked kind; Level 2 every round has a same-topic pair of opposite kinds; displayed slot ≤ 3/8; the title-keyword bot ≤ 5/8; every cover picture exists in a colour theme.
- **Mutations (each killed):** story passes the shaker test · fact passes the ribbon test · topic decides (Level 2 accepts the same-topic fact for "story") · right book always in slot 1 · shaken story stays shuffled after close · pages hidden in "open on the desk" · same order every pass · Level 3 accepts 3+1 · a fact page carries a sequence word or points at another page · the right book in one slot > 3/8.
- **Pictures to verify on contact sheets:** insects-and-bugs/worm (Bea — check it reads as a friendly worm; else forest-creatures/earthworm ✓ seen, a cheerful striped worm), things-that-fly/dragon, insects-and-bugs/ladybug, vehicles/excavator, hospital/x-ray, accessories/mitten (ONE YELLOW mitten — the story says yellow), tree/apple (a whole apple tree — per ruling the tree theme is fruit trees only; fine for both tree books), spring/bee, vehicles/boat, accessories/sock, miscellaneous/acorn, pets/rabbit ✓, beach/sailboat ✓. **Do not use birds-2/crane** for "Diggers and Cranes" (it is the bird).
- **Risks:** 5 new books × 11 locales of native authoring (titles, blurbs, pages). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — shaking books, watching a story fall apart and a fact book shrug it off, ribbons that tie bows.
2. **Teacher on the board?** Yes — "a story goes in order from beginning to end; a fact book can be opened anywhere" is exactly the anchor chart, and same-topic pairs kill the topic shortcut.
3. **Parent trust?** Gentle make-believe and true facts, library pictures, no scores.
4. **Invention:** two shelves that test a book by how it is built — shake it and only a fact book still makes sense; thread a ribbon from beginning to end and only a story can be tied.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **The shaker test made true:** two fact books were written as STEPS (how honey is made; how a tree grows) — shaken they would not make sense, so the shelf's own law would have failed on them. Both now carry stand-alone all-about facts; the gate refuses sequence words on fact pages; the teacher prose names the honest scope (how-to and life-cycle books do go in order).
- **Picture truth:** accessories/mitten is ONE YELLOW mitten, so Bunny now loses her *yellow* mitten.
- **Answer position is a fixed balanced table per level, rotated per pass**, and the title-keyword bot is measured (decides L1 2/8, L2 3/8) instead of assumed.
- Distinct from 063/064 (bookmark, flipbook ORDER — the child builds an order there; here the shelf tests whether a book HAS an order) and from 069 (facts lifted from a text).
