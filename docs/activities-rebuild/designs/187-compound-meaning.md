# Row 187 — The Weld That Stands on Its Last Word (L.2.4.d)

## 0. Identity
- id `compound-meaning.predict.l-2-4-d` (KEPT) · grade 2 · Common Core L.2.4.d (use knowledge of the meaning of individual words to predict the meaning of compound words) · strand Language · page title (frozen) "Skip's Word-Welding Yard — Build & Mean Compound Words" · own files `mini tools/weld-yard-core.js`, `weld-yard-activity.js`, `weld-yard-activity.html`; manifest row stays in `compound-meaning-activities.json` (id, slugs en de nl, titles, intros unchanged), `tool` repointed. fr/es/pt/it/sv/da/no/fi get new slug/title/intro at build.
- worksheets it covers: **G2-316** Compound Words: Picture + Picture · **G2-329** What Goes in the Middle? · **G2-330** Split the Compound · **G2-331** Match the Halves · **G2-332** Compound Detective · **G2-333** Word Web: One Word, Many Compounds.
- what the old activity did: five round kinds — predict (what does fishbowl mean?), ticket (which word means this?), supply (which part finishes it?), head (what KIND of thing is it?), build. **Kept:** the frozen promise "a fishbowl is a bowl FOR fish, not a bowl made OF fish", the made-of / reversed / wrong-modifier misconceptions as the yard's three failure shapes, the head question (now physical — the weld stands on its head), de/nl content (Handschuh, Zahnbürste, Handtasche, Milchkanne, Hundebett, Fußball, Eierbecher, Apfelkuchen, Regenschirm; handschoen, eierbeker, schoenborstel, voetbal, hondenbed, melkkan, tandenborstel, melkbeker, appeltaart, handtas). **Fixed (pedagogical defects in the live data):** en "milkjug", "dogbed", "bookbag" are taught as one word, but in English they are written as two (milk jug, dog bed, book bag) — replaced by real closed compounds from the native-signed compound bank (`scripts/worksheet-gen/data/b3/compound-words.js`); de/nl "Regenschirm"/head rounds pointed at `spring/rain`, a picture that does not exist (rulings) — rain is `weather/rainy`.

## 1. The pitch
"Weld two words and the new thing stands on its LAST word — a sunflower stands on 'flower', so it's a kind of flower — so swap the blocks and you get a different thing, and the yard builds exactly what your weld means: a bowl made OF fish is a bowl built out of fish."

## 2. Why a child will want it again (the fun)
- **A welding yard.** Word blocks with their pictures lie on a shelf; the welding plate has two sockets. Drop two blocks, pull the big lever: sparks (drawn), a bright seam, a *clang* — and the welded block **stands up on its right-hand block**. That block's picture grows big; the left block shrinks into a little tag on it. Flower + sun? It stands on SUN: a sun with a flower tag. Sun + flower? A flower with a sun tag — and it turns into the real sunflower picture.
- **The yard builds what you say.** In the meaning level the yard shows three things it could build from "fish" and "bowl": a bowl with a fish swimming in it, a bowl built out of tiled fish pictures, and a fish carrying a bowl as a tag. The child picks which one IS a fishbowl. The made-of version is always funny.
- **The cutting torch.** Compounds can be cut: tap where the two words meet and the block splits with sparks into two blocks that fly up and show their pictures. Cut "carpet" into car + pet and the yard welds them back as a pet with a car tag — next to a picture of a carpet. Not a kind of pet!
- **The word web.** One hub block (book) with sockets on BOTH sides: shelf welds on the right (bookshelf), note welds on the left (notebook). The side matters — and the yard shows why.
- **End-of-round show:** each finished compound is hoisted by the drawn crane arm onto the yard's display rack along the top; after a set, every block on the rack clinks once in a ripple.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a compound is two words joined; its meaning comes from both parts; in English and the Germanic languages the LAST part names what kind of thing it is (the head) and the first part says which kind; the relation between the parts varies (for, made of, looks like, has); some words only look like two words (carpet). In de/nl/sv/da/no a joining letter may sit in the middle (Hund**e**bett, Geburt**s**tag).
- **Misconception 1 — the order doesn't matter** (flowersun, bowlfish). Pushback: the weld stands on whichever block is on the right; the wrong order builds a different thing (a sun, a fish).
- **Misconception 2 — "fishbowl" means made of fish** (the relation is always "made of"). Pushback: the yard builds the made-of version — a bowl tiled from fish — and it is plainly not a fishbowl; for cheesecake it IS (a cake made with cheese), so the child must think about each word.
- **Misconception 3 — any word that splits into two words is a compound** (carpet = car + pet). Pushback: the re-weld test stands on "pet" — a kind of pet? — beside the carpet picture.
- **Misconception 4 — a compound's parts can go on either side of a hub** (shelfbook). Pushback: the word web's hub stands as a different thing; only the correct side builds the pictured word.
- **Misconception 5 (de/nl/sv/da/no) — parts just touch** (Hundbett). Pushback: the weld cracks without the joining bead; it holds only with the right bead (§9).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The welding plate** (centre, 330 × 120, drawn steel plate with two sockets 140 × 110, a seam line between them; a joining-bead slot 36 px wide between the sockets in de/nl/sv/da/no only) and the **lever** (right, 48 × 120).
- **Word blocks** (on the shelf above, 4 blocks; each 140 × 130: the library picture 96 px over its word, Nunito 20 px, image-vocabulary label in the page locale; drawn steel frame).
- **The order card** (Level 1, left of the plate, 140 × 150): the WHOLE compound's library picture 96 px, no word.
- **The stand** (centre, after a weld): the head block's picture 120 px with the modifier as a tag (its picture 64 px — the 64 px floor holds — on a drawn tag). Renderings for Level 2 (three, 140 × 140 each): FOR = head picture with the modifier picture placed in/on it; MADE OF = the head's silhouette (CSS mask from the head picture's alpha) filled with ONE enlarged modifier picture (≥ 120 px, cropped to the silhouette — a bowl-shaped piece of fish, a cake-shaped piece of cheese); critic fix: the draft tiled the modifier at 40 px, which breaks the 64/96 px picture floor; REVERSED = the modifier picture big with the head as its tag; HAS = the head picture with the modifier attached at its sides; LOOKS LIKE = the head picture filling the modifier's silhouette.
- **The torch** (Level 3): the compound word on one long block (Nunito 30 px letters, cut-gap hit areas 44 × 56 between letters) and a "one word" stamp button (120 × 48).
- **The rack** (top strip 450 × 56): finished compounds as small drawn steel tokens with the word (16 px).
- **Task line** (≤ 24 px): L1 "Weld two blocks to make the thing in the picture." · L2 "Which one is a {compound}?" · L3 "Cut it where two words meet — or stamp it ONE WORD." · L4 "Weld words onto the hub. Which side do they go on?" · L5 "Weld the two words. Does the middle need a joining letter?"

**At 360 px** (stacked): plate 330 × 96 (sockets 120 × 92); blocks 104 × 112 (pictures 64 px, words 16 px), shelf 2 × 2; order card 104 × 120; stand 96 px head + 64 px tag; Level 2 renderings in a row of three at 108 × 108 (each rendering ≥ 64 px); torch letters 24 px with 44 px tall hit areas; lever 44 × 96. Check bottom ≤ 700 at 360 × 740 and ≤ 630 at 320 × 640 (at 320 renderings 96 × 96, blocks 96 × 104).

Pictures (library, colour; the compound bank's pins, opened by its gate, plus): parts — beach/sun, spring/flower, weather/rainy (rain), clothing/coat, spring/bird, miscellaneous/house, body-parts/tooth, body-parts/arm, furniture/chair, classroom/book, furniture/shelf, toys/ball, body-parts/foot, animals/fish, kitchen-tools/bowl, at-the-supermarket/cheese, 4th-of-july/cake (the only whole cake), weather/snowflake (as "snow"), at-the-supermarket/bread, at-the-supermarket/corn, at-the-supermarket/basket, space/earth, spring/worm; wholes — flowers/sunflower, weather/raincoat, spring/birdhouse, around-the-house/toothbrush, around-the-house/armchair, around-the-house/bookshelf, activities/football, around-the-house/carpet, at-the-supermarket/carrot (foil), activities/basketball, forest-creatures/earthworm. Word-web satellites (bow, drop, glasses, flake, jelly, note, case …) are word blocks; a satellite shows a picture only where the library has an honest one. **"brush" is a WORD-ONLY block** (no picture) in every locale and every round: around-the-house/brush is a PAINTBRUSH whose EN label is "Paint Brush" and whose de/nl/sv… labels name a scrubbing brush (rulings), so a picture would either lie or teach Pinsel as Bürste. Ruled out: water (every library water is a bottle), jellyfish and angelfish (critic: a jellyfish is not a fish — same reason as starfish; angelfish is not Grade-2 vocabulary), starfish (a starfish is not a fish — never taught as "a kind of fish"), spring/rain (does not exist), cherry (drawn as an apple).

## 5. The hand
- **Drag a block** from the shelf into a socket (tap block, tap socket; keyboard Tab/Enter). A block in a socket can be dragged out or swapped; blocks snap in 60 ms with a metal *tock*.
- **Pull the lever** (drag down or tap; Enter): sparks 400 ms, *clang*, the welded block rises and stands on the right socket's block (the head grows to 120 px, the left block shrinks to a 64 px tag, 500 ms). The stand is the Check in Level 1.
- **Level 2:** tap one of the three renderings (it lifts 8 px) and pull the lever to commit.
- **Level 3 torch:** tap a cut gap (a dashed line appears; tap another to move it) or tap ONE WORD; the lever commits. A cut sends two blocks flying up (300 ms); real words show their pictures (or their word only, if unpicturable), non-words fall as grey scrap.
- **Level 4:** drag each satellite onto the hub's left or right socket, or onto the scrap bin; lever checks all four.
- **Level 5 bead:** drag a joining bead (–, e, s, n, en …) into the middle slot before welding.
- **Free play:** after a round, any two shelf blocks can be welded in either order to see what stands (nothing recorded).

## 6. The rounds
One right weld / rendering / cut per round. Positions FIXED per round in data (balanced); the pass reshuffle permutes round order only.

**Level 1 — Build the picture (G2-316, G2-331), EN, 10 rounds** — shelf slots 1–4; the two right blocks and two decoys (no shelf pair forms any real word except the target, in either order — asserted from the bank's crossWords check):
| # | order picture | shelf (1 · 2 · 3 · 4) | right weld (left + right) |
|---|---|---|---|
| 1 | sunflower | flower · ball · sun · coat | sun + flower (slots 3, 1) |
| 2 | raincoat | rain · chair · coat · fish | rain + coat (1, 3) |
| 3 | birdhouse | brush · house · book · bird | bird + house (4, 2) |
| 4 | toothbrush | tooth · brush · cake · arm | tooth + brush (1, 2) |
| 5 | armchair | shelf · arm · chair · sun | arm + chair (2, 3) |
| 6 | bookshelf | shelf · coat · bird · book | book + shelf (4, 1) |
| 7 | football | ball · foot · flower · bowl | foot + ball (2, 1) |
| 8 | cheesecake | house · cheese · tooth · cake | cheese + cake (2, 4) |
| 9 | basketball | basket · rain · ball · chair | basket + ball (1, 3) |
| 10 | earthworm | brush · worm · arm · earth | earth + worm (4, 2) |
**Measured:** the modifier sits left of the head on the shelf in 5/10 rounds and right in 5/10, so "weld them in shelf order" scores 5/10; across the 20 right blocks the shelf slots are used 6 / 6 / 4 / 4 times (slots 1–4). Decoys are always from other rounds.

**Level 2 — What does it mean? (the old predict), EN, 8 rounds** — three renderings the yard builds; the child picks the one that IS the word:
| # | compound | renderings (A · B · C) | right |
|---|---|---|---|
| 1 | fishbowl | FOR (a bowl with a fish in it) · MADE (a bowl tiled from fish) · REVERSED (a fish with a bowl tag) | A |
| 2 | cheesecake | REVERSED (cheese with a cake tag) · MADE (a cake built from cheese) · FOR (a cake with a cheese sitting on it) | B |
| 3 | raincoat | LOOKS (a coat in the shape of the rain cloud) · REVERSED (a rain cloud with a coat tag) · FOR (a coat with rain falling on it) | C | (critic: toothbrush left Level 2 — its "brush" would have to be the paintbrush picture)
| 4 | snowball | MADE (a ball built from snowflakes) · FOR (a ball with a snowflake on it) · REVERSED | A |
| 5 | birdhouse | REVERSED · FOR (a house with a bird at its door) · MADE (a house tiled from birds) | B |
| 6 | sunflower | FOR (a flower holding a little sun) · REVERSED · LOOKS (a flower filling a sun's shape) | C |
| 7 | cornbread | MADE (bread built from corn) · REVERSED · FOR (bread with a corn cob on it) | A |
| 8 | armchair | MADE (a chair built from arms) · HAS (a chair with arms at its sides) · REVERSED | B |
Positions A/B/C = 3/3/2. Right relation: FOR 3 (fishbowl, raincoat, birdhouse) · MADE 3 (cheesecake, snowball, cornbread) · LOOKS 1 (sunflower) · HAS 1 (armchair). **Measured (critic recount, `work-c28`):** REVERSED is never right (it is the order misconception, shown in every round); with it set aside the bots score: "always MADE when offered" 3/8 · "never MADE, never REVERSED" 4/8 (two coin-flip rounds counted as halves) · "always FOR when offered" 3.5/8 · "pick the rarer type (LOOKS/HAS)" 2/8 — the gate requires every bot ≤ 5/8 and the right answer's position ≤ 3/8 in any slot. The text meaning appears only AFTER the pick ("a bowl for fish"), so wording cannot be gamed.

**Level 3 — Cut it or stamp it (G2-330, G2-332), EN, 8 rounds:** toothbrush (tooth|brush) · carpet (ONE WORD — car + pet re-welds as "a kind of pet?" beside the carpet picture) · raincoat (rain|coat) · carrot (ONE WORD — car + rot) · sunflower (sun|flower) · mushroom (ONE WORD — mush + room; the library mushroom is a toadstool, fine here) · bookshelf (book|shelf) · season (ONE WORD — sea + son: "a kind of son?"; word blocks only, no picture; critic replaced "pumpkin" because "kin" is not a word a seven-year-old knows, so the round tested nothing). **Measured:** "cut wherever two real words appear" 4/8; "always ONE WORD" 4/8; the right cut's letter index varies 4 / 4 / 3 / 4 (after tooth, rain, sun, book) — the gate asserts no index rule beats 4/8.

**Level 4 — Word web (G2-333), EN, 7 hubs** (4 satellites each: 3 that weld + 1 scrap):
rain — coat (R), bow (R), drop (R), shoe (scrap) · sun — flower (R), glasses (R), screen (R), bell (scrap) · cake — cheese (L), cup (L), pan (L), coat (scrap) · snow — ball (R), flake (R), man (R), box (scrap) · fish — gold (L), cat (L), sword (L), chair (scrap) · book — shelf (R), note (L), case (R), rain (scrap) · house — bird (L), dog (L), boat (R), sun (scrap). (L = the satellite welds on the hub's left; R = right.) **Measured:** across 21 welding satellites, left 9 / right 12; hubs book and house mix both sides, so "same side for all three" fails on them.

**Level 5 — The joining bead (G2-329)** — de/nl/sv/da/no only (hidden in en and the Romance locales). The tray offers four beads per round (the right one + three from the locale's set incl. "–"). Exact rounds (critic-authored; the b3 compound bank holds en only, so these are the gate's ground truth, native-signed at review):
- **de, 10 rounds:** Hund·e·Bett · Geburt·s·Tag · Kind·er·Garten · Sonne·n·Blume · Blume·n·Topf · Schwein·e·Stall · Apfel·–·Baum · Hand·–·Schuh · Zahn·–·Bürste · Haus·–·Tür — beads e 2 · s 1 · er 1 · n 2 · none 4 ("always a bead" 6/10, "never" 4/10). The weld drops the second capital (Hundebett).
- **nl, 8 rounds:** tand·en·borstel · boek·en·kast · paard·en·stal · ei·er·beker · stad·s·park · voet·–·bal · hand·–·schoen · appel·–·taart — en 3 · er 1 · s 1 · none 3. Words whose first part changes its spelling before the bead (zon → zonnebloem, kip → kippenhok) are left out: the bead would look like it brings letters it does not.
- **sv / da / no:** ≥ 7 rounds each, authored by the native panel from the locale's linking letters (sv -s- and -o-/-u- as in kvällsmat, veckodag; da/no -e- and -s-), "no bead" right in ≥ 2; a locale with fewer than 7 honest rounds hides Level 5.

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Lever with an empty socket:** hint, no miss — the empty socket glows: "Put a block in both sockets." (Level 3 with no cut and no stamp: "Cut it, or stamp it ONE WORD.")
- **Miss 1** — the stand IS the showing: the welded thing stands on its right block next to the order picture (a sun with a flower tag beside the sunflower picture) or Level 2's chosen rendering slides beside the word's real picture; Level 3's re-weld stands beside the word's picture; Level 4 a wrong-side weld stands as the other thing. Hints: L1 "It stands on {right word} — so it's a kind of {right word}. Is the picture a kind of {right word}?" · L2 "That's a {head} {relation} {modifier}. Is that what a {compound} is?" · L3 "{a} + {b} would be a kind of {b}. Is a {word} a kind of {b}?" · L4 "{hub} + {sat} stands on {last}: is it a {last}?"
- **Miss 2** — L1: the order picture's head is outlined, and the block that must go on the right glows; L2: the word's real picture appears small (64 px) under the right rendering's slot without selecting it; L3: the true cut shows a faint spark line, or the ONE WORD stamp glows; L4: the right socket for each misplaced satellite glows. Hint: "The last word tells what it is."
- **A new move takes the help away** until the next lever pull.
- **Success:** the real whole picture replaces the stand (96 / 120 px), the joined word appears under it, the crane hoists it onto the rack. Bubble: "{modifier} + {head} = {compound}: a kind of {head}!" · L2 "A {compound} is {meaning}!" (the native-authored meaning line, e.g. "a bowl for fish", "a cake made with cheese") · L3 compound: "{a} + {b}: two words!" · foil: "{word} is one word — it isn't a kind of {b}!" · L4: "{hub} makes {words}!"

## 8. Settings
1. **Picture labels:** words under pictures (default) · pictures only (the child names the parts — G2-316's no-text face). Visible at rest: block captions present or not.
2. **Shelf:** 4 blocks (default) · 3 blocks (one decoy). Visible at rest: the number of blocks on the shelf.

## 9. Words (EN source)
- title "Skip's Word-Welding Yard".
- instruction "Weld two words into one new word. The new word stands on its last word — so a sunflower is a kind of flower. Build it, cut it, and find out what it means."
- task lines §4 · hints and celebrations §7 · buttons "Weld", "ONE WORD" · settings names.
- aria: "Block {word} in the left socket" · "Welded {compound}: it stands on {head}" · "Rendering: {description}" · "Cut after {letters}".

**Locale traps:**
- **Germanic heads are on the right** (de/nl/sv/da/no/fi and en) — the yard stands on the right block. **Romance compounds are different and are rebuilt, never translated:** fr/es/it/pt N+N compounds put the head on the LEFT (fr chou-fleur is a chou, it pescespada is a pesce, pt couve-flor is a couve) — in these locales the plate stands on its LEFT block; and verb+noun compounds (es paraguas, sacapuntas, abrelatas; fr porte-clés; it portafoglio, girasole; pt guarda-chuva, beija-flor) have no head among their parts — the weld stands on a new plain block ("a thing that … ") and Level 2's renderings become "a thing that stops water" vs … (native authored). Romance pages are new (no slug yet); their round sets are authored by the native panel from these shapes. The b3 bank's es/fr "family" and it/pt "alterati" shapes are derivation, not compounding — they belong to row 186, not here.
- **de capitalisation:** the welded word takes ONE capital at the front (Hand + Schuh → Handschuh: the second capital drops — animated during the weld); blocks show nouns capitalised.
- **Joining letters** (Level 5): de -e-, -s-, -n-, -en-, -er-; nl -e-, -en-, -s-; sv -s-, -e-, -a-; da/no -e-, -s-; fi none (genitive-first compounds like *kirjastokortti* are authored as plain welds). The bank's `links` per locale is the gate's set.
- **Two-word vs one-word spelling:** only CLOSED compounds are welded (the en fix above). The gate rejects any en compound not written as one word in the signed bank.
- **Meaning lines (Level 2) are authored per locale** with natural relations (de "eine Bürste für die Zähne", nl "een borstel voor je tanden"); the renderings are language-free, so the pick is the same in every locale.
- **Gender of the whole:** de/nl compounds take the gender of the LAST part (der Hund + das Bett = das Hundebett) — shown in the success bubble with the article, a free bonus of the head idea.

## 10. Sound off, access, phones
- Silent legibility: the stand, the renderings, the cut and the re-weld say everything; TTS reads the blocks and the meaning line as a bonus.
- Keyboard: Tab blocks/sockets/renderings/gaps; Enter places; L pulls the lever.
- aria-live per §9. Taps ≥ 44 px (blocks 96+, sockets 120+, gap hit areas 44 tall, lever 44+). Pictures ≥ 96 px at 704 (blocks, stand head 120, renderings 120) and ≥ 64 px at 360/320 (tags 64 px everywhere).

## 11. Distinct from
- **Row 186 The Root Bulb (this batch)** — derivation (root + part sinking); here two free words weld and stand on the head.
- **Row 44 The Clay Snake / syllable rows** — syllables, not words.
- **Row 126 The Turning Bridge** — joining words in sentences.
- Not a reused invention: no registered design makes a joined word stand on its head part and then builds the literal meaning of a relation.

## 12. Build plan
- **Data** `weld-yard-rounds.json` per locale: `build:[{whole:{word,pic}, shelf:[{word,pic}], left, right}]`, `meaning:[{compound, mod, head, renderings:[{type, right?}], meaningLine}]`, `cut:[{word, cutAt|null, pieces?, pic}]`, `web:[{hub, sats:[{word, side|"scrap"}]}]`, `beads:[{a, b, link}]`, `headSide:"right"|"left"`, `capitalise`.
- **Core state** `{level, round, sockets:[a,b], bead, rendering, cut, placed:{}, misses}`; functions `weld()` → `{word, head, tag}` (head = the `headSide` socket; de capital rule), `render(type, mod, head)`, `cutAt(i)` → `{pieces, real:[bool,bool]}`, `reweld(pieces)`, `check()`.
- **Gate's own ground truth** (`verify-weld-yard-core.js`): its own compound list per locale; asserts every right weld spells a closed compound in the signed bank; no other shelf pair (either order) is a real word; each L2 round has exactly one right rendering and REVERSED is never right; L3 foils split into two real words AND are absent from the compound list; L4 sides match the bank's hub sides; bead rounds use the locale's `links`; bots of §6 within their bounds; no ruled-out picture (water, starfish, spring/rain, cherry).
- **Mutations:** the stand uses the left block in en · order ignored (either order accepted) · MADE rendering accepted for fishbowl · a foil accepted as a compound · L4 accepts either side · de keeps both capitals · a bead accepted where none belongs · shelf decoys that form a real compound.
- **Pictures to confirm on contact sheets:** the list in §4 (blocks at 96 px; tiles in MADE renderings are pattern fills).
- **Risks:** MADE renderings must stay legible (silhouette masks of library pictures — built with CSS mask from each picture's alpha; fallback: a drawn outline of the head filled with the modifier pattern); Romance head-left/no-head shapes need their own native round sets.
- **Blocked:** none for en/de/nl; Romance locales need their native rounds (authoring, not art).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — sparks, a clanging lever, a block that stands up, a bowl built out of fish, a torch that cuts words apart: a yard full of toys.
2. **Would a teacher put it on the board?** Yes — "it stands on its last word" is the clearest picture of a compound's head a class will ever see, and the carpet re-weld ends the "car + pet" debate in one move; six worksheets live in one yard.
3. **Would a parent trust it?** Yes — library pictures, real closed compounds (the live "milkjug" error is gone), each language's own compound shape.
4. **The invention:** a welded word stands on its last part — and the yard literally builds what the two parts mean together.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- MADE renderings tiled library pictures at 40 px (breaks the picture floor) → one enlarged modifier picture masked into the head's silhouette.
- "brush" is word-only everywhere (the library brush is a PAINTBRUSH, EN label "Paint Brush", de Bürste wrong); toothbrush left Level 2 for raincoat.
- jellyfish/angelfish removed from the fish hub (a jellyfish is not a fish — the design's own starfish rule) → catfish, swordfish; pumpkin ("kin") → season.
- Level 5 bead rounds written out for de (10) and nl (8), spelling-change words excluded; L2 bot numbers recounted (no more "4.5/8").
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
