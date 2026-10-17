# Row 188 — The Pages That Push (L.2.4.e)

## 0. Identity
- id `booker-glossary-desk.guide-words.l-2-4-e` (KEPT) · grade 2 · Common Core L.2.4.e (use glossaries and beginning dictionaries to determine or clarify the meaning of words — here the finding skill: guide words and ABC order) · strand Language · page title (frozen) "Booker's Glossary Desk — Use Guide Words to Find the Page (Grade 2)" · own files `mini tools/glossary-pages-core.js`, `glossary-pages-activity.js`, `glossary-pages-activity.html`; manifest row stays in `booker-glossary-desk-activities.json` (id, slugs en de fr es pt it nl, titles, intros unchanged), `tool` repointed. sv/da/no/fi get new slug/title/intro at build.
- worksheets it covers: none mapped.
- what the old activity did: a page with two guide words and three words; tap the one that belongs on the page. **Kept:** every guide-word pair in all seven locales (en cap–cot … bed–box; de Ball–Dose … Tanne–Tasse; fr banane–dinde … pain–porte; es casa–foco … cama–cara; pt; it; nl bad–bos … pil–pit) and their right words (all verified: exactly one word falls between each pair). **Fixed (an answer tell in the live data):** in EVERY round of every locale checked, one wrong word came before the page and one after it — so the right word was always the alphabetical middle of the three, and "sort the three cards and take the middle one" solved every round without looking at the guide words. Distractors are now re-chosen so both wrong words fall on the SAME side in two thirds of the rounds (§6).

## 1. The pitch
"A glossary page only holds the words that come between its two guide words — drop any other word on it and the page pushes it out: off the left edge if it belongs on an earlier page, off the right edge if it belongs later."

## 2. Why a child will want it again (the fun)
- **A real book on the desk.** A big open glossary (drawn: cream pages, a soft spine shadow, page edges stacked at the fore-edge). At the top corners of each page, its two guide words in bold. Down the page, a few entries on ruled lines.
- **Pages that push.** The child drags a word card onto the page. If it belongs, it slides down the page and tucks itself into its exact line between two entries — the lines below shuffle down to make room, *shff*. If it doesn't, the page gives a little shrug and pushes the card out sideways: off the LEFT edge with a page-flutter toward the front of the book if it comes earlier, off the RIGHT edge toward the back if it comes later. The direction itself teaches.
- **Flipping to find** (Level 2): the book opens in the middle. The child flips forward or back — real page-turn animation, page by page — reading guide words until the word's page is found. A word dropped on the wrong page is pushed toward the side where it belongs and the book turns one page that way by itself.
- **End-of-round show:** the found word gets its meaning: the entry line unfolds a short definition under it (authored per word), and Booker's library stamp (a drawn round stamp, no character) thumps beside the entry; finished pages fan out on the desk's side tray after a set.
- **Free play:** any card can be dropped on any page between rounds to watch where it gets pushed.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** guide words name the first and last word on a page; a word is on that page only if it comes between them in ABC order; when the first letters match, the next letter decides (and the next); to find a page, compare with the guide words and flip toward earlier or later.
- **Misconception 1 — "same first letter = same page"** (car on the cap–cot page is right, but cup isn't). Pushback: cup is pushed out the right edge — later.
- **Misconception 2 — only the first guide word matters** (anything after "bat" belongs on bat–bug). Pushback: bun is pushed out the right edge, past "bug".
- **Misconception 3 — compare only the first letter** (sad and see both start with s). Pushback (Level 3): sad is pushed out the left edge — "sa" comes before "se".
- **Misconception 4 — flip from the front every time.** Pushback (Level 2): the book opens in the middle; the first push already tells which way to go.
- **Misconception 5 — guide words are just two words at the top.** Pushback (Level 4): the child builds a page, and the guide words print themselves from the first and last lines.

## 4. The stage
Stacked layout (the book needs the width).

**At 704 px:**
- **The book** (centre, 620 × 360): Level 1 and 3 show ONE big page (360 × 360, centred) with a faint spine shadow at its left; Level 2 shows a spread (two pages 300 × 340); Level 4 one page. Guide words: top-left = first, top-right = last, Nunito 24 px bold teal `#146B5E`, with a thin rule under them. Entries: ruled lines 40 px apart, Nunito 20 px ink; 4 lines visible (the two guide words are the first and last entries; two more between).
- **Word cards** (below the book, 3 cards, 130 × 56, cream with a coral left tab, Nunito 24 px).
- **Flip tabs** (Level 2): two big page-corner arrows at the book's lower corners, 56 × 56, and a row of thin page-edge marks at the fore-edge showing how many pages lie each way (6 pages; no words on the marks).
- **Desk tray** (bottom strip 620 × 48): finished pages as small fanned page tokens.
- **Task line** (≤ 24 px): L1 "Which word lives on this page? Drop it on the page." · L2 "Flip to the page where this word lives, and drop it there." · L3 "Same first letter! Look at the next letter. Which word lives here?" · L4 "Put the words on the page in ABC order. The guide words will print themselves."

**At 360 px:** single page 336 × 320 (Level 2/5 open on p3; "0 flips" rounds there are p3 words, p4 words are 1 forward — the bots are re-measured for the phone opening: back 3 · none 2 · forward 5 → the phone build opens on p4 for odd passes and p3 for even passes so no direction exceeds 50 %) (guide words 20 px, entries 17 px, lines 36 px); Level 2 shows ONE page at a time (flip arrows 48 × 48 at its lower corners) instead of a spread; cards 104 × 48 (20 px) in a row of three; tray as a scroll strip. Check bottom ≤ 690 at 360 × 740 and ≤ 620 at 320 × 640 (at 320 the page is 300 × 300 and cards 96 × 48).

No library pictures on the board (the content is words). Booker the bear appears only in the success moment as the library picture **zoo-animals/bear** at 96 px (64 px on phones) beside the stamp for 1.2 s.

## 5. The hand
- **Drag a card onto the page** (tap card, tap page; keyboard: Tab card, Enter, Tab page, Enter). The drop IS the decision. Belongs → the card shrinks into an entry and slides to its line (400 ms), the lines below move down (200 ms), a soft *shff*. Doesn't → the page tilts 3° toward the side the word belongs to and the card slides off that edge (350 ms), with a single page-flutter drawn at that edge; the card returns to the shelf.
- **Flip** (Level 2): tap a corner arrow or swipe the page (drag ≥ 40 px horizontally); 450 ms page turn; keyboard PageUp/PageDown.
- **Level 4:** drag cards onto the four lines in any order; a line holds one card; drop on an occupied line swaps. When all four lines are filled, the guide words do NOT print yet — Check prints them (first line → top-left, last line → top-right).
- **Undo:** a pushed card is back on the shelf; a placed card in Level 4 can be dragged off.

## 6. The rounds
One right page / word per round. Card positions FIXED per round (balanced); the pass reshuffle permutes round order only.

**Level 1 — Which word lives here? EN, 9 rounds** (cards A · B · C; e = pushed out the left/earlier edge, l = right/later):
| # | page (guide words) | entries between | A | B | C | right | wrong words go |
|---|---|---|---|---|---|---|---|
| 1 | cap — cot | cat, coat | car | can | cup | A | e, l (split) |
| 2 | bat — bug | bed, bird | ant | bee | bag | B | e, e (both earlier) |
| 3 | dad — dog | den, dish | dot | duck | dig | C | l, l (both later) |
| 4 | fan — fox | feet, fish | fig | egg | fun | A | e, l |
| 5 | map — mud | men, milk | man | mop | mad | B | e, e |
| 6 | pat — pup | pet, pig | rat | put | pen | C | l, l |
| 7 | sea — sit | seed, sip | see | saw | sky | A | e, l |
| 8 | ten — top | tent, tin | tag | tip | tan | B | e, e |
| 9 | bed — box | bell, bike | buy | bun | big | C | l, l |
(Entries are chosen so the right word fits between two shown lines — car between cap … cat; bee between bat … bed; dig between den … dish; fig between feet … fish; mop between milk … mud; pen between pat … pet; see between sea … seed; tip between tin … top; big between bell … bike.)
**Measured:** positions A/B/C = 3/3/3. "Sort the three and take the middle" = 3/9 (split rounds only); "take the alphabetically first" = 3/9 (both-later rounds); "take the last" = 3/9 (both-earlier rounds); "the card whose first letter matches the first guide word" — ambiguous in 6/9 (two or three cards share it), right outright in 2/9. The gate re-measures every locale and requires each bot ≤ 4/9; the old data scored 9/9 on "middle".

**Level 2 — Find the page, EN, 10 rounds** — the same six-page glossary every round (p1 ant–bat · p2 bed–cow · p3 cup–egg · p4 elf–gum · p5 hat–ink · p6 jam–kit), opening at the middle spread (p3 | p4):
| # | word | page | flips from the opening |
|---|---|---|---|
| 1 | ape | p1 | 2 back |
| 2 | frog | p4 | 0 |
| 3 | cat | p2 | 1 back |
| 4 | jet | p6 | 2 forward |
| 5 | dog | p3 | 0 |
| 6 | hen | p5 | 1 forward |
| 7 | bird | p2 | 1 back |
| 8 | goat | p4 | 0 |
| 9 | key | p6 | 2 forward |
| 10 | duck | p3 | 0 |
**Measured:** pages 1–6 used 1 / 2 / 2 / 2 / 1 / 2 times; direction back 3 / none 4 / forward 3 — "never flip" wins 4/10 (≤ 40 %, the gate's bound). No target falls between two pages (asserted: every word sits strictly inside one page's range).

**Level 3 — The next letter, EN, 9 rounds** (all cards share the page's first letter):
| # | page | A | B | C | right | wrong words go |
|---|---|---|---|---|---|---|
| 1 | sea — sit | sad | saw | see | C | e, e |
| 2 | ten — top | tip | toy | tub | A | l, l |
| 3 | bed — box | bag | big | bun | B | e, l |
| 4 | shark — shoe | shop | shut | sheep | C | l, l |
| 5 | cake — coat | cave | cab | cub | A | e, l |
| 6 | pig — pot | pie | pin | pet | B | e, e |
| 7 | mat — mix | mud | mop | men | C | l, l |
| 8 | rat — rug | red | ram | run | A | e, l |
| 9 | fan — fix | face | fern | fall | B | e, e |
**Measured:** positions 3/3/3; middle / first / last bots 3/9 each.

**Level 4 — Make the page, EN, 7 rounds** (four cards → four lines; the guide words print from lines 1 and 4): fish · fan · fox · fig → fan, fig, fish, fox · bus · bell · bed · bike → bed, bell, bike, bus · cup · cap · cow · cat → cap, cat, cow, cup · dog · desk · dad · duck → dad, desk, dog, duck · moon · milk · map · mud → map, milk, moon, mud · sun · sock · seed · sand → sand, seed, sock, sun · tree · top · ten · tag → tag, ten, top, tree. Cards are dealt so no card starts on its own line (a derangement, asserted).

**Level 5 — Look it up (the meaning half of L.2.4.e; critic addition), EN, 8 rounds.** A sentence card with one bold word sits on the desk; the child flips the same six-page glossary (Level 2 mechanics) to the word's page and drops the sentence card on the page; the word's entry then opens with TWO numbered meanings, and the child drops the sentence card on the meaning number that fits the sentence. Nothing else changes: the page still pushes a card dropped on the wrong page. Words are deliberately NOT row 185's (bark, bat, trunk, ring, light, fair, wave, park, duck).
| # | sentence | page | meaning 1 | meaning 2 | right |
|---|---|---|---|---|---|
| 1 | We put **jam** on our toast. | p6 (jam is its first guide word) | a sweet fruit spread | cars stuck in a long line | 1 |
| 2 | Turn on the **fan**, it is so hot. | p4 | a person who cheers for a team | a machine that blows air | 2 |
| 3 | The **kid** followed its mother goat up the hill. | p6 | a baby goat | a child | 1 |
| 4 | The duck dipped its **bill** in the pond. | p2 | paper that says what to pay | the hard mouth part of a bird | 2 |
| 5 | **Can** you swim? | p2 | to be able to | a metal tin for food | 1 |
| 6 | Our cat likes to **hide** under the bed. | p5 | the skin of an animal | to go where no one can see you | 2 |
| 7 | We fished from the **bank** of the river. | p1 | the land beside a river | a place that keeps people's money | 1 |
| 8 | Grandma ate a sweet **date**. | p3 | the day of the month | a sweet brown fruit from a palm tree | 2 |
**Measured (`work-c28/m.js`):** right meaning 1/2 = 4/4; the right meaning is the longer one in 4/8; pages p1·p2·p3·p4·p5·p6 = 1·2·1·1·1·2. Miss on the meaning: the wrong meaning is read into the sentence ("Turn on the *person who cheers for a team*") — the same read-back idea, no message needed. Success bubble: "{word} here means: {meaning}!" Task line: "Find the word's page, then choose the meaning that fits the sentence." (Locales: each native author picks 8 two-meaning words of its own that fall inside its six-page glossary.)

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- (Levels 1–3 have no Check button: the drop decides. Level 4 has Check.)
- **Drop on the desk instead of the page:** the card returns, no miss.
- **Miss 1** — the push IS the showing: the card slides off the edge where it belongs, and the guide word on that side lights up. Hint: earlier — "{word} comes before {first}, so it lives on an earlier page." · later — "{word} comes after {last}, so it lives on a later page." · Level 2 adds the automatic one-page turn in that direction. · Level 4 (Check with lines out of order) — each line whose word comes before the line above slides up to swap places, one pair at a time (300 ms each), stopping at the first wrong pair. Hint: "{word} comes before {other} — look at the {n}th letter."
- **Miss 2** — the letters being compared light up in colour across the guide word and every card: Level 1 the first letters, Level 3 the first two letters (the deciding letter coral). Level 2 the fore-edge marks show a small arrow toward the right page. Hint: "Look at the {n}th letter: {letter} comes between {a} and {b}."
- **A new move takes the help away** until the next drop.
- **Success:** the entry tucks in, its definition line unfolds (e.g. "car — a machine with wheels that people ride in"), the stamp thumps, Booker appears for a moment. Bubble: "{word} comes after {first} and before {last} — it lives on this page!" · Level 4: "First word {a}, last word {d}: those are the guide words!"

## 8. Settings
1. **Entries on the page:** shown (default — two entries between the guide words) · hidden (only the guide words; harder). Visible at rest: lines with or without entries.
2. **Letter help:** off (default) · first letters coloured at rest (practice — the first letter of every word on the board is tinted). Visible at rest: tinted initials or not.

## 9. Words (EN source)
- title "Booker's Glossary Desk".
- instruction "Every glossary page has two guide words at the top: the first and the last word on that page. A word lives on the page only if it comes between them in ABC order."
- task lines §4 · hints and celebrations §7 · labels "Check", "Flip" (aria only), settings names · one definition line per word (authored per locale, ≤ 60 characters, never generated).
- aria: "Page: {first} to {last}" · "{word} lives here, between {a} and {b}" · "{word} was pushed to an earlier page" · "{word} was pushed to a later page" · "Page {n} of 6".

**Locale traps — ABC order is NOT universal:**
- **sv / fi: å ä ö come after z** (sv: … x y z å ä ö; fi: … z å ä ö); **da / no: æ ø å after z**. A Swedish page ö … must sit at the back of the glossary; the gate sorts with the locale's own collation table, never with JavaScript's default.
- **de:** ä ö ü sort as a o u (DIN 5007-1 dictionary order), ß as ss; nouns are capitalised — capitals do not affect order.
- **es:** ñ is its own letter after n (año after anzuelo); ch and ll are NOT separate letters (since 2010) — the gate uses that order.
- **fr:** accents are ignored at first comparison (école files among the e-words), used only to break exact ties.
- **nl:** ij is sorted as i + j (Van Dale order), not as y.
- **it / pt:** plain Latin order; pt ç sorts as c.
- **Every locale re-balances its distractors** (one third split, one third both-earlier, one third both-later), because all seven authored sets carried the "middle word" tell; the existing right words and guide pairs stay.
- **Prefix words** (ten before tent) appear only in Level 4 where both are on the page, never as a Level 1–3 trap at this grade.
- **Definitions** are native child definitions, one line each, authored with the word lists.

## 10. Sound off, access, phones
- Silent legibility: the tuck-in versus the sideways push and the lit guide word carry the reasoning; TTS reads words and guide words as a bonus.
- Keyboard: Tab to cards; Enter picks; Tab to the page; Enter drops; PageUp/PageDown flip; Level 4 arrows choose a line.
- aria-live per §9. Taps ≥ 44 px (cards 96 × 48+, flip arrows 48+, lines 36+ tall with 44 px hit areas). Pictures: only Booker at success (96 / 64 px).

## 11. Distinct from
- **New 213 The Alphabet Lockers** — a corridor of single-LETTER lockers whose doors shut on the letter between neighbours; here whole words, ranges defined by two guide words, and a book that pushes strangers off the edge toward their page.
- **Row 65 Flipbook / story-order rows** — page order of pictures; nothing alphabetical.
- Not a reused invention: no registered design uses page ranges that physically push a word toward the earlier or later side.

## 12. Build plan
- **Data** `glossary-pages-rounds.json` per locale: `here:[{first, last, entries:[…], cards:[…], right, sides:{word:"e"|"l"}}]`, `book:{pages:[{first,last,entries}], open:[3,4]}`, `find:[{word, page}]`, `next:[…as here]`, `make:[{cards:[…]}]`, `defs:{word: line}`, `collation:"sv"|"da"|…`.
- **Core state** `{level, round, page, placed:{}, misses}`; functions `cmp(a,b)` (locale collation), `belongs(word, page)` → `-1|0|1`, `drop(word, page)` → `{in:bool, side}`, `flip(dir)`, `checkOrder(lines)` → first wrong pair.
- **Gate's own ground truth** (`verify-glossary-pages-core.js`): its own collation tables for all 11 locales (sv/fi å ä ö after z; da/no æ ø å after z; de umlauts as base letters; es ñ after n; nl ij = i+j; fr accents ignored); asserts exactly one card per round belongs; every shown entry lies between the guide words and the right word fits between two shown lines; the bots of §6 (middle / first / last / match-first-letter) each ≤ 4/9 per locale; Level 2 targets each inside exactly one page; Level 4 deals are derangements.
- **Mutations:** default JS sort instead of the locale collation (fails sv/da/no/fi/de/es) · push direction inverted · a word equal to a guide word refused · Level 2 opens at page 1 · distractors restored to one-each-side · Level 4 prints guide words before Check · the entry line placed by first letter only.
- **Pictures to confirm:** zoo-animals/bear (success only).
- **Risks:** long de/fi words on 96 px cards at 320 (cards grow to two lines at 18 px; measured); collation of å/ä/ö in the push direction.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a book that tucks words in or shoves them off its edge, and real page-turning to hunt a word, feel like playing with a real book.
2. **Would a teacher put it on the board?** Yes — "it fell off the right edge, so it's on a later page" is the guide-word idea in one gesture, and the next-letter level is the step children find hardest; the old "always the middle word" tell is gone.
3. **Would a parent trust it?** Yes — calm, no scores, each language's own alphabet (å ä ö really live after z in a Swedish glossary).
4. **The invention:** a glossary page only holds the words between its guide words and pushes every other word out toward the side of the book where it belongs.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- L.2.4.e is about using a glossary to determine MEANING; the draft only found pages. Added Level 5 "Look it up": flip to the page, then drop the sentence on the entry meaning that fits (8 rounds, words not shared with row 185; meaning 1/2 = 4/4, right-is-longer 4/8, measured).
- Phone opening re-measured (one page at a time skews flips forward 5/10) → alternate p3/p4 opening per pass.
- All Level 1–4 tables re-verified letter by letter (one word between each guide pair; middle/first/last bots 3/9 each).
