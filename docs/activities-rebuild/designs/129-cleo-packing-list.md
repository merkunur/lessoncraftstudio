# Row 129 — The Divider Case (L.1.2.b)

## 0. Identity
- id `cleo-packing-list.series-commas.l-1-2-b` (KEPT) · grade 1 · Common Core L.1.2.b (commas to separate single words in a series) · strand Language · page title (frozen) "Cleo's Packing List — Commas in a List (Grade 1)" · own files `mini tools/divider-case-core.js`, `divider-case-activity.js`, `divider-case-activity.html`; the manifest row stays in `cleo-packing-list-activities.json` (id, slugs en..sv, page_title, page_intro unchanged), `tool` repointed. `series-comma-core.js` stays untouched for anything else that loads it.
- worksheets it covers: none mapped.
- what the old activity did: three sentences on cards; tap the one whose commas are right. **Kept:** every round's lead + item list in all eight shipped locales (en/de/fr/es/pt/it/nl/sv) as seed data; the per-locale rules the old file already researched (en serial comma per the frozen intro; de/fr/es/pt/it/nl/sv no comma before the final conjunction; es items never start with i-/hi- in last place so "y" never becomes "e"; it last item consonant-initial so "e" never becomes "ed"); sv's four-item lists and its two native constraints (two juxtaposed items must not read as one compound; the last item must not attach to the one before it); the shared phone line-break rule (break before the second-to-last item, measured ≤ 27 characters on line 1); the localized chameleon names (used only in words now). **Gone:** the three-card recognition quiz — and with it the measured "pick the card whose comma comes soonest" tell (1.00 in six locales), which cannot exist when the child places the commas. The inline-SVG chameleon (a hand-drawn character) is retired.

## 1. The pitch
"Every comma drops a wall into Cleo's packing case — so each thing in the list gets its own pocket: forget a comma and two things are squashed into one pocket, add one too many and a pocket stays empty."

## 2. Why a child will want it again (the fun)
- **The walls drop live.** Tap a gap in the sentence and a comma pops in — at the same instant a little wooden wall slides down into the case right under that gap with a *tock*. Tap again and the wall lifts out. Wall in, wall out: the case is a toy before it is a task.
- **The Pack lever.** Pull it and the list is packed word by word: a reading light runs along the sentence, and as it passes each thing, that thing's library picture drops out of the word into the pocket under it with a soft bounce. A pocket that gets two things squashes them together, its walls bulge, and the lid will not shut over the bulge. A pocket that gets nothing gapes open and the lid stops on the hole.
- **The earned show:** when every pocket holds exactly one thing, the lid swings shut with a snap, two latches click (left, then right), a luggage tag swings on with the finished sentence written on it, and the case rolls off along Cleo's conveyor to the "ready to go" shelf. Across a pass the shelf stacks up with tagged cases; any of them can be opened again.
- **Level 2 lets the child write the list** — pick three or four pictures from Cleo's shelf, the sentence writes itself, and the commas are theirs to place. Children make silly lists on purpose ("I packed frogs, cakes, and rockets") and still have to comma them right to shut the lid.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** in a list of three or more single words, put a comma between the things (L.1.2.b), following the page language's rule for the last gap: **en** a comma also before "and" (the frozen intro's "apples, pears, and plums"); **de/fr/es/pt/it/nl/sv/da/no/fi** no comma before the final und/et/y/e/e/en/och/og/og/ja, because that word already keeps the last two apart.
- **Misconception 1 — "a list needs a comma somewhere"** (one comma, anywhere). Pushback: every missing comma leaves two things in one pocket — the squash happens at the exact place the comma is missing.
- **Misconception 2 — "a comma goes after every word"** (including right after the lead: "I packed, apples…"). Pushback: a wall before the first thing makes an empty pocket at the left end; there is nothing to pack in it.
- **Misconception 3 — the doubled divider** (non-en: "Äpfel, Birnen, und Pflaumen", the anglicism children copy). Pushback: in those locales the conjunction is itself a wall, so a comma beside it drops a second wall into the same gap — a thin empty sliver pocket appears, obviously useless.
- **Misconception 4 (en) — "and replaces the last comma".** Pushback: in English the "and" is drawn as a ribbon tied to the last thing, not a wall; without the comma the last two things share a pocket. (This is the frozen intro's en rule, recorded as a ruling in §9.)

## 4. The stage
`layout:'split'` at ≥ 700 px: the stage left (480 × 470), the bubble column right (200 px).

**At 704 px:**
- **The sentence strip** (top of stage, 460 × 64): lead and item words in Nunito 26 px bold, ink `#2A2A35`, on a cream card with a 3 px ink outline. Between every pair of words where a comma is possible sits a **gap socket**: a faint dotted caret under the baseline, 30 px wide visible, 44 × 44 touch. The conjunction is a real word on the strip (content); in en it carries a thin coral underline-ribbon that runs into the last item (the "ribbon" of §3). The full stop is printed.
- **The case** (under the strip, 440 × 190): drawn apparatus geometry — a deep rounded tray (radius 14, walls `#C98A4B`, floor `#F6E7CF`, 3 px ink outline), the open lid behind it (a rounded rectangle tilted back 18°), two latch nubs. The floor is divided by **walls** (6 × 150 px slats, `#8C5A2B`) that drop from above. Each wall sits exactly under its socket's x position on the strip — word, socket and wall line up vertically (the strip's word boxes are measured after `document.fonts.ready` and the tray is laid out on the same x-scale).
- **The Pack lever** at the case's right end: 44 × 96 drawn lever, knob 36 px. Pulling it is the Check (the shell's Check button runs the same act).
- **Item pictures** appear only on Pack: library pictures 96 px at 704, centred in their pocket. A plural item shows two identical instances, the second offset 12 px behind the first, so "apples" reads as many.
- **The comma pot** (Level 3, right of the case): a stack of comma tiles 44 × 56 (one big ink comma each).
- **Level 2 shelf** (under the case): 8 library pictures 96 px in two rows of four, each with its plural label in 16 px.
- **Task line** above the strip; **bubble** in the right column.

**At 360 px** (stacked): the strip wraps to two lines at the shared break (before the second-to-last item); words 20 px; sockets keep a 44 × 44 touch area by overlapping the inter-word space. The case becomes two stacked half-trays, one under each strip line, every wall under its socket on its own line; pictures **64 px**. The lever becomes a 120 × 48 "Pack" pull-tab under the case. Bubble under the trays. The pull-tab's bottom edge ≤ 690 at 360 × 740 and ≤ 610 at 320 × 640 (at 320 the Level 2 shelf is 4 × 2 at 64 px and moves below the tab).

Pictures (library, colour, every one checked against its theme JSON AND seen on the contact sheets 2026-10-17 by the critic): at-the-supermarket/apple, pear, cherry, lemon, melon, banana, orange, strawberry (the supermarket set, not fruits/: fruits/plum and fruits/cherry are drawn as apples, at-the-supermarket/plum also reads as a red apple — **no plum anywhere**; grapes and peas exist in the image cache but have NO lcs-pictures label, so they are not usable either); animals/cat, dog, pig, owl, fox, swan; toys/car, kite, boat, ball, train; kitchen-tools/cup, plate, fork, spoon, bowl; spring/bee, frog, snail; accessories/hat, mitten, scarf, sock; clothing/shoe, coat; at-the-supermarket/milk, bread, jam; vegetables/corn, carrot, potato; bakery/bun, cupcake, waffle; farm-animals/cow, sheep, goat, horse, rabbit; toys/robot, rocket, dinosaur; kitchen-tools/jug, pot, glass; clothing/dress, skirt; forest-creatures/deer, squirrel, hedgehog, beaver, dragonfly; animals/turtle, fish; farm-animals/duck, goose, hen; forest-creatures/bear; desserts-and-sweets/cake, cookie, muffin, pie; classroom/pen, crayon, book, glue.

## 5. The hand
- **Tap a gap socket** (Levels 1–2): a comma appears glued to the word on its left (no space before it) within 60 ms; its wall drops into the tray (200 ms ease-in, *tock*, wood tone). Tap again: the comma pops off and the wall lifts out (150 ms, lighter tick). Undo is the same tap.
- **Drag a comma tile** (Level 3; also allowed in 1–2): from the pot onto a socket — same result. Drag a placed comma off the strip to remove it.
- **Pull Pack** (= Check): a soft yellow reading band moves left→right behind the words at 260 ms per word; as it passes an item, that item's picture falls from the word into the pocket below (240 ms, bounce). Then:
  - every pocket holds exactly one thing → the lid closes (350 ms), latches click, tag swings on, the case rolls to the shelf (600 ms);
  - a pocket holds two or three → they squash (each scaled to 70 %, overlapped 40 %, tilted ±8°), the walls around them bow outward 6 px, the lid comes down and bounces back open with a dull *thump*;
  - a pocket is empty → its floor darkens; the lid stops on it and bounces back open.
  The packed state stays on screen until the child's next move.
- **Level 2 shelf:** tap a picture to add it to the end of the list (its plural label joins the strip; the conjunction moves to stay before the last item). Tap a word on the strip to send it back to the shelf. 3 or 4 items allowed; with fewer than 3 the Pack lever is greyed and the bubble says "A list needs three things or more."
- **Free play:** a finished case on the shelf can be tapped to open, show its pockets and read its tag (TTS bonus). Walls of an unfinished case can be dropped and lifted freely — nothing counts until Pack.

## 6. The rounds
One round = one list and one case. A round is right when the commas are exactly the locale's required set.

**The required set (the rule the gate implements itself):** sockets exist between the lead and the first item, between items, and on both sides of the conjunction. **en:** a comma after every item except the last, including the gap before "and". **All other locales:** a comma after every item except the last two (the gap before the conjunction stays empty). Never a comma in the lead gap or after the conjunction.

**Level 1 — Place the commas** (default), 16 rounds in two bands. EN data (the eight old rounds kept; the colours round becomes toys because colours have no pictures; "bugs" and "beans" become library nouns):

| # | band | lead | items |
|---|---|---|---|
| 1 | 3 items | I packed | apples · pears · cherries |
| 2 | 3 | We saw | cats · dogs · pigs |
| 3 | 3 | I like | cars · kites · boats |
| 4 | 3 | We need | cups · plates · forks |
| 5 | 3 | I see | bees · frogs · snails |
| 6 | 3 | We have | hats · mittens · scarves |
| 7 | 3 | I want | milk · bread · jam |
| 8 | 3 | We grow | corn · carrots · potatoes |
| 9 | 4 items | Cleo packs | socks · shoes · hats · coats |
| 10 | 4 | We bake | cakes · cookies · muffins · pies |
| 11 | 4 | I saw | owls · foxes · bears · frogs |
| 12 | 4 | We need | pens · crayons · books · glue |
| 13 | 4 | Mom buys | lemons · pears · cherries · melons |
| 14 | 4 | We play with | balls · kites · cars · trains |
| 15 | 4 | I see | ducks · geese · swans · hens |
| 16 | 4 | We pack | spoons · cups · bowls · plates |

The other locales keep their old eight rounds (band 1) and add eight four-item rounds (band 2) authored by the build in the same shape; sv already has four items in every round, so sv's band 1 gets eight three-item rounds instead.

**Seed items whose picture does not exist are swapped, never kept as a broken tile** (the gate fails any item without a labelled colour picture): plums → cherries (all locales: de Pflaumen → Kirschen, fr des prunes → des cerises, …), grapes → melons, peas → potatoes, scissors (de Scheren) → glue sticks (classroom/glue), the colours round (de Rot/Blau/Grün, fr le rouge/le bleu/le vert, …) → the toys round (cars, kites, boats) because colours have no pictures. The swapped noun keeps the round's lead and band.

**Level 2 shelves (EN; each locale uses the same pictures with its own plural labels):**

| # | family | lead | the 8 pictures |
|---|---|---|---|
| 1 | fruit | I packed | supermarket apple, pear, cherry, lemon, banana, orange, strawberry, melon |
| 2 | farm | We saw | farm-animals cow, pig, sheep, goat, horse, duck, hen, rabbit (no chick — it twins the duck) |
| 3 | toys | I like | toys ball, kite, car, boat, train, robot, rocket, dinosaur |
| 4 | kitchen | We need | kitchen-tools cup, plate, fork, spoon, bowl, jug, pot, glass |
| 5 | clothes | I wear | accessories hat, sock, mitten, scarf · clothing shoe, coat, dress, skirt |
| 6 | bakery | We bake | bakery cake, cookie, muffin, pie, bun, cupcake, waffle, pretzel |
| 7 | forest | I saw | forest-creatures fox, bear, deer, owl, squirrel, hedgehog, rabbit, beaver |
| 8 | pond | We found | duck, goose, swan, frog, snail, turtle, fish, dragonfly |

Plural labels come from `image-vocabulary.js`; a picture whose plural equals its singular in the page locale (en deer, fish, sheep) is fine in a list — the commas do not care — but never two such pictures side by side in fi/sv/da/no where an unchanged plural can read as a compound with its neighbour (asserted by the compound check).

**Level 2 — Make your own list**, 8 rounds: shelf of 8 pictures from one family per round (fruit · farm · toys · kitchen · clothes · bakery · forest · pond birds) with a lead ("I packed" · "We saw" · "I like" · "We need" · "I wear" · "We bake" · "I saw" · "We found"). The child picks 3 or 4 in any order; right = the commas match the rule for that length.

**Level 3 — Fix the list** (commas already placed, walls drop only at Pack), 10 rounds. EN start states:
1 "We saw cats dogs, and pigs." (missing after cats) · 2 "I packed, apples, pears, and cherries." (extra after the lead) · 3 "We need cups, plates and forks." (missing before and) · 4 "I like cars kites and boats." (all missing) · 5 "We have hats, mittens, and, scarves." (extra after and) · 6 "Cleo packs socks shoes, hats, and coats." (missing first) · 7 "We bake cakes, cookies muffins, and pies." (missing middle) · 8 "I see, ducks geese, swans, and hens." (one extra + one missing) · 9 "We play with balls, kites, cars and trains." (missing before and) · 10 "I want milk, bread, and jam." (already right — so "always change something" fails; exactly one such round per pass).
Non-en: the same ten mistake shapes on the locale's rounds, where shapes 3 and 9 become "comma beside the conjunction" (the doubled divider).

**Answer position / guessability.** There is no card position; the gate runs strategy bots, each must succeed on ≤ 1 of 16 Level-1 rounds per locale: "comma in every socket", "comma after every word", "one comma after the first item", "comma before the conjunction only", "comma after every item" (must fail every non-en round), and in Level 3 "leave it as it is" (≤ 1 of 10).
**Order:** order-only reshuffle per pass, never the same order twice in a row; with "3 then 4" the bands stay grouped.

## 7. Check, the misses, the success
- **Pack with no comma placed** (Levels 1–2): hint, no miss — the sockets pulse once: "Tap the gaps between the things to put in commas, then pull Pack."
- **Miss 1** — the packing is the showing: the squashed and empty pockets stay on screen and the lid bounces. Hint by what the case shows: squash → "Two things are squashed in one pocket. Which gap needs a comma?" · empty at the left → "The first pocket is empty. No comma comes before the first thing." · (non-en) sliver beside the conjunction → "{and} already keeps the last two apart. The comma beside it is one too many." · (en) last two squashed → "In English, a comma goes before {and} too." · empty after the conjunction → "{and} and its thing stay together."
- **Miss 2** — the stronger showing: the tray stays packed and every *wrong* socket glows on the strip — a missing comma shows as a pulsing ghost comma, an extra comma shakes; the right commas glow teal. Hint: "Look at the glowing gaps."
- **A new move takes the help away** (glows clear, pictures float back up into their words) until the next Pack.
- **Success:** lid shuts, latches, tag, conveyor. Bubble: "Packed! {sentence}" — the finished sentence in full with its commas in coral, e.g. "Packed! I packed apples, pears, and cherries." Level 2 adds "Your own list — every thing has its own pocket!"

## 8. Settings
1. **Lists:** 3 things · 4 things · 3 then 4 (default). Visible at rest: the strip length and the number of shelf picks.
2. **Walls:** drop as I go (default in Levels 1–2) · only when I pack (default in Level 3). Visible at rest: with "as I go" each placed comma already has its wall in the empty tray; with "when I pack" the tray floor is undivided until Pack.
(The shell level picker: Place the commas / Make your own list / Fix the list.)

## 9. Words (EN source)
- title: "Cleo's Packing List".
- instruction: "Put a comma between the things in Cleo's list. Then pull Pack."
- task lines: L1 "Put in the commas so every thing gets its own pocket." · L2 "Pick three or four things for Cleo's list. Then put in the commas." · L3 "Fix Cleo's list so every thing gets its own pocket."
- hints and celebrations: §7 exactly; {and} = the locale conjunction; {sentence} = the finished list.
- labels: "Pack" · "A list needs three things or more." · settings "Lists", "3 things", "4 things", "3 then 4", "Walls", "Drop as I go", "Only when I pack".
- aria: "Gap between {a} and {b}", "Comma placed", "Comma removed", "Packing case with {n} pockets", "{word} is packed in pocket {n}", "Pocket {n} is empty", "Pocket {n} holds {a} and {b}".

**Locale traps:**
- **The last gap is the whole rule, and it is per locale.** en: serial comma — the frozen intro's rule, recorded as the en ruling and locked by the gate so it cannot drift. de/fr/es/pt/it/nl/sv/da/no/fi: no comma before und/et/y/e/e/en/och/og/og/ja. The apparatus encodes `conjunctionDivides: true|false` — in en the conjunction is a ribbon, elsewhere it is a wall. Same physics, honest rule.
- **Euphony:** es "y"→"e" before i-/hi-, it "e"→"ed" before a vowel — the Level 2 picker greys a picture while it would land in last place and needs the euphonic form (it can still go earlier); round data asserted the same way.
- **Articles (fr, and pt/it/es where a round uses them):** "des pommes, des poires et des prunes" — the article belongs to its item's pocket (the picture drops from the whole span); no socket ever sits between an article and its noun.
- **Plurals:** Level 2 labels come from the plural column of `image-vocabulary.js` in the page locale; lower-cased mid-sentence except de nouns, which stay capitalised.
- **Compounds (sv/da/no/de/nl):** any two adjacent items written without a comma must not read as one compound — asserted for every adjacent pair in every round (Level 3 can remove any comma), not only items 2+3.
- **fi:** items authored in the case the lead governs ("Näen kissoja, koiria ja possuja" — partitive plural after "Näen"); the Level 2 shelf uses a native-authored partitive column per picture, never generated. Rule for fi Level 2 leads: every lead governs the partitive plural ("Näen…", "Ostamme…", "Pakkaan…"), so one authored column serves the whole shelf; the native reviewer signs off each lead + column pair.
- **Typography:** fr puts no space before a comma (the space rule is for ; : ! ?) — asserted, so a French-spacing helper can never touch the commas.

## 10. Sound off, access, phones
- Silent legibility: the case shows everything — pockets, squash, empties, the lid. TTS (optional) reads the finished sentence pausing at each comma, which is itself why commas exist.
- Keyboard: Tab moves through the gap sockets left to right; Space toggles a comma; Enter on Pack packs. Level 2: arrows move on the shelf, Enter adds; Delete on a strip word sends it back.
- aria-live announces each wall placed/removed and the packing result pocket by pocket.
- Taps ≥ 44 px (sockets 44 × 44 touch, shelf cards ≥ 64 px, pull-tab 120 × 48).
- Pictures 96 px at 704, 64 px at 360.
- Phone: two-line strip with two half-trays; the conveyor shelf becomes a row of small tagged-case icons above the bubble.

## 11. Distinct from
- **Row 73 The Writing Carriage / New 218 The Word Ribbon** — spaces between words as paper moves; here punctuation divides a list and the consequence is packing.
- **Reading Easel (premium tool)** — scoops a line into phrases for fluency; it never places punctuation.
- **Row 35 The Sorting Chutes** — things drop by kind; here things drop by position and the walls are the child's commas.
- No registered design maps punctuation to physical dividers.

## 12. Build plan
- **Data:** `divider-case-rounds.json` — per locale `{ conjunction, conjunctionDivides, rounds:[{id, band, lead, items:[{text, pic:{theme,noun}}]}], fixStarts:[{roundId, commas:[socketIdx…]}], shelves:[{lead, pics:[…], labels}] }`. Seed = the old `params.rounds` + `roundsL10n` (en..sv); da/no/fi new.
- **Core state** `{level, round, sockets:[{idx, kind:'lead'|'item'|'beforeConj'|'afterConj'}], commas:Set, packed:null|pockets, misses}`; functions `socketsOf(round, locale)`, `toggle(idx)`, `walls()` (commas ∪ conjunction wall when it divides), `pockets()` → `[{from, to, items}]`, `pack()` → `{ok, pockets, squashed:[i], empty:[i]}`, `required(round, locale)`.
- **Gate's own ground truth** (`verify-divider-case-core.js`): its own rule table per locale, written in the gate → the required comma set for every round; asserts `pack().ok` iff commas == required; squash/empty reports equal an independent pocket count; the strategy bots within their bounds per locale; Level 3 has exactly one already-right start per pass and every other start differs from required; data asserts (es i-/hi-, it consonant-initial last item, no compound for any adjacent pair in sv/da/no/de/nl, fr article never split from its noun, every picture exists and is colour, plural labels match vocab).
- **Mutations (one per rule):** en conjunction made a divider (serial comma no longer required) · non-en conjunction not a divider (comma before und accepted) · lead socket accepted · after-conjunction socket accepted · empty pocket not reported · squash not reported · Level 3 without an already-right round · shelf allows a euphonic item last · compound check off · fr comma given a space before it.
- **Pictures to verify on contact sheets:** fruits, animals, toys, kitchen-tools, spring, accessories, clothing, at-the-supermarket, vegetables, farm-animals, forest-creatures, desserts-and-sweets, classroom (seen 2026-10-17: toys, kitchen-tools, at-the-supermarket — plate/cup/fork/spoon/bowl clean; milk a bottle, bread a loaf, jam a jar, peas a pod: all read at 64 px).
- **Risks:** strip-to-tray alignment must be re-measured after fonts load and on resize; at 320 px a four-item fr list with articles must still break only at the shared point — local-test asserts no word straddles lines in any round of any locale.
- **Blocked:** none. (Dates — the other half of L.1.2.b — are deliberately out: only en writes a comma in a date; if ever added it is an en-only level and a recorded refusal for the ten other locales.)

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dropping walls in and out is a toy, the squash and the snapping lid are funny, and packing their own silly lists keeps them going.
2. **Would a teacher put it on the board?** Yes — "a comma gives each thing its own place" is the idea itself, the squashed pocket shows the class which comma is missing without a word, and each language's last-gap rule is honoured, not glossed over.
3. **Would a parent trust it?** Yes — library pictures only, calm motion, no scores, the rule of the family's own language.
4. **The invention:** every comma drops a wall into the packing case, so a list is right when each thing gets exactly one pocket.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Removed every picture that does not exist or is not what it says: plums (fruits/plum and the supermarket plum both read as red apples), grapes and peas (in the image cache but unlabelled, so they render as broken tiles). Rounds 1, 8, 13 and Level 3 start 2 now use cherries, potatoes and melons; the picture list names the supermarket set that was seen on the contact sheet.
- Added the swap rule for the eight old locale seeds (plums, grapes, peas, scissors and the colours round had no usable picture in any locale) so the build cannot ship a broken tile in de/fr/es/pt/it/nl/sv.
- Level 2 was "a shelf of 8 pictures from one family" with no pictures named: the eight shelves are now written out picture by picture (no chick beside the duck), with the unchanged-plural compound trap noted.
- The invention (each comma drops a wall; a missing comma squashes two things into one pocket, a doubled divider leaves an empty sliver) is kept: it is the skill, it honours each language's last-gap rule, and it was already the strongest design in the batch.
