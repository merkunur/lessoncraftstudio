# Row 75 — The Ending That Arrives With the Second Plate (L.K.1.c)

## 0. Identity
- id `daisy-plate-stack.plurals.l-k-1-c` (KEPT) · grade K · Common Core L.K.1.c (form regular plural nouns orally by adding /s/ or /es/) · strand Language · page title (frozen) "Daisy's Plate Stack — More Than One (Kindergarten)" · own files `mini tools/plate-stack-core.js`, `plate-stack-activity.js`, `plate-stack-activity.html`; the manifest row stays in `daisy-plate-stack-activities.json` (id, slugs, title, intro frozen), `tool` repointed.
- worksheets it covers: **K-287** Singular and Plural · **K-302** One and Many: First Words · **K-303** One and Many: Longer Words · **K-313** Many and One · **K-314** One and Many: Write It Yourself · **K-316** Write the Word for One · **K-349** Singular and Plural Cards · **G2-349** Fill in the Blank: Plural Nouns (incl. irregular).
- what the old activity did: a sentence with a blank ("I'd like two ___."), three chips (plural / a wrong form / the singular), tap one. **Kept:** Daisy's diner counter and its orders; the en nouns (cup, egg→not in the picture library, dish→not in the library, fork, plate, box→not in the library, spoon, apple, peach — the three missing pictures are replaced, §6); the per-locale sentence frames of de/fr/pt/it/nl as the seed for the sentence level; the per-locale insight that de/nl/it/pt plurals cannot be derived by a rule. **Gone:** the invented wrong spellings shown as chips ("chatx", "Apfeln", "gattos") — a child should never be handed a made-up misspelling to choose; and the text-only stage.

## 1. The pitch
"The word only grows an ending when the second plate lands — take the plates away again and the ending has to come off."

## 2. Why a child will want it again (the fun)
- **The stack.** Daisy's counter has a pile of plates; drag one onto the serving stand and it clinks down with a library cup (or peach, or fox…) on it. Stack them up — 2, 3, 4, 5 — each plate a little higher, a satisfying porcelain clink rising in pitch.
- **The word wakes up.** Under the stand stands the word, in big wooden letter tiles. With ONE plate it is just "cup". The moment the SECOND plate clinks down, the end of the word slides open like a little drawer — an empty socket that glows: *this word needs something now*. Take the plate away again and the drawer closes. Children open and close it just to watch.
- **Endings are tiles you can feel.** The ending tiles in the tray are chunky: "s", "es" (with a little hump on top — the extra beat you hear in *dish-es*), and a round flip tile with a turning arrow for words that change inside (mouse → mice: the whole word card flips over like a split-flap sign and comes back as "mice").
- **The order goes out.** When it is right, Daisy's bell rings, the stack slides along the counter to the order hatch, the word is read (TTS where available), and the customer's ticket gets a stamp. Across a pass, the counter shelf fills with the orders the child served.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** one vs more than one; form the plural by adding the right ending (en -s / -es; each locale's own endings), the singular by taking it off (K-316, K-313); know that some words change inside (G2-349 irregulars: mice, geese, wolves, elves, knives, leaves; sheep stays sheep).
- **Misconception 1 — "the word stays the same, the picture shows how many."** The socket exists only when there is more than one: number and ending are physically coupled. With 3 plates and "cup" the open drawer keeps glowing empty; with 1 plate and "cups" the drawer cannot close because the s is still in it.
- **Misconception 2 — "just add s to everything."** en: "dish+s" — the word read aloud gets one beat where you hear two (*peach-es*); the hump tile is the beat. For words that change inside, an ending tile simply does not fit: the socket of "mouse" does not open at all when the second plate lands — instead the word card's flip edge glows (the word has to change inside).
- **Misconception 3 (Back to one) — "the singular is the plural minus the last letter."** "glasses" minus one letter is "glasse"; the ending tile comes off whole ("es") because it went on whole. "knives" → the card flips back to "knife".

## 4. The stage
`layout:'split'` at ≥ 700 px: counter stage left (480), bubble column right (200).

**At 704 px** (stage 480 × 470):
- **Order ticket** (top-left, 120 × 90, a paper slip with a drawn clip): the customer's number of plates as a numeral (44 px) and as dots (5-frame dots, 14 px). In the sentence level the ticket also carries the sentence (§6).
- **The holder pile** (left, x 20–130): five drawn plates (discs 96 × 22, cream with teal rim) stacked — or, when the round's noun is an animal or a person, five drawn **counter stools** (a round seat 96 × 18 on one leg, coral seat, teal leg). Nothing living is ever served on a plate: the hen, the geese, the mice and the elves are *customers* who sit on stools at Daisy's counter. Food and kitchen things ride plates.
- **The serving stand** (centre, x 170–330): a drawn tiered stand (for stools: a stepped counter); each holder added sits 48 px higher than the last, with **the round's library picture, 96 px**, on it (identical instances). Every rule below that says "plate" means "holder" — the coupling is the same: the socket opens when the SECOND holder lands.
- **The word bench** (bottom, 480 × 110): the word in wooden letter tiles (Baloo 2, 44 px, tile 40 × 56). Stem tiles are one block; the **socket** at the end is a 0-width gap that slides open to 56 / 96 px (one / two letters) when ≥ 2 plates are on the stand. Irregular words show a flip edge (a 6 px fold line along the card) instead of a socket.
- **Ending tray** (under the bench, 3 tiles 64 × 64, gap 16): per round, the right tile + two others (§6). The es tile carries a 10 px hump on its top edge; the flip tile shows a drawn circular arrow.
- **Task line** above (≤ 24 px). **Bubble** in the right column.

**At 360 px** (stacked; stage 360 × 560): ticket 96 × 70 top-left; pile on the left (plates 64 × 16); stand centre with pictures **64 px**, plate spacing 34 px (5 plates = 170 px tall); bench 360 × 84 (tiles 30 × 44, word 32 px); tray 3 × 56 px; bubble under the tray; Check below: Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: pictures 64 px, plate spacing 30).

No words on the apparatus except the word and the endings (content) and the ticket numeral.

## 5. The hand
- **Add a plate:** drag the top plate from the pile onto the stand (or tap the pile — a plate flies up, 220 ms). It clinks (pitch rises with height). Within 60 ms of the second plate landing the socket slides open (180 ms ease-out, a soft wooden "tock"); for irregular words the flip edge glows instead.
- **Remove a plate:** drag the top plate back to the pile (or tap the top plate). If the stand drops back to one plate with an ending still in the socket, the socket cannot close — the ending tile rattles once (the word "does not fit" one plate) and stays until the child pulls it out.
- **Drop an ending** into the socket: it snaps in (90 ms), the word reads as one (the tiles slide together, no gap). Pull it out again by dragging. Drop the flip tile on a word card: the card flips (split-flap, 360 ms) — irregular words flip to their plural (and back when the flip tile is pulled off); a regular word flips all the way round and comes back unchanged ("nothing changes inside — it needs an ending").
- **Write it** (setting): the socket becomes a write box; a letter keyboard (the locale alphabet) types into it.
- **Free play:** the plates and the drawer can be played with at any time; tapping the word reads it; tapping a stacked picture makes it bob.

## 6. The rounds
One round = one order: a ticket, a picture, a word. Check when the stand and the word match the ticket.

**Level 1 — More than one (+s) (K-302, K-287, L.K.1.c), 9 rounds.** Start: 1 plate, singular word; ticket 2–5. Tray: s · es · flip.

| # | picture (library) | word | ticket |
|---|---|---|---|
| 1 | kitchen-tools/cup | cup | 2 |
| 2 | breakfast/donut | donut | 3 |
| 3 | kitchen-tools/fork | fork | 4 |
| 4 | kitchen-tools/spoon | spoon | 2 |
| 5 | fruits/apple | apple | 5 |
| 6 | farm-animals/hen (stool) | hen | 3 |
| 7 | bakery/muffin | muffin | 4 |
| 8 | fruits/pear | pear | 2 |
| 9 | farm-animals/pig (stool) | pig | 3 |

**Level 2 — s or es? (K-303, L.K.1.c), 9 rounds,** tray s · es · flip. Every es word is one where you HEAR the extra beat (/ɪz/ after s, x, ch, sh) — never potato/tomato, whose -es adds no beat: peach (fruits/peach, 3, es) · glass (kitchen-tools/glass, 2, es) · radish (vegetables/radish, 4, es) · fork (kitchen-tools/fork, 2, s) · lunchbox (classroom/lunchbox, 2, es) · fox (animals/fox, stool, 5, es) · bowl (kitchen-tools/bowl, 3, s) · mug (kitchen-tools/mug, 4, s) · spoon (kitchen-tools/spoon, 3, s). es 5, s 4; pass 2 swaps peach → squash (vegetables/squash, 3, es) and fork → cup, so the words change but the class split stays 5/4.

**Level 3 — Words that change (G2-349, K-316), 9 rounds per pass = 6 changers + 3 regular words** (cup, glass, fox — so the flip is never automatically right), tray flip · s · es. Changers (all 6 every pass): mouse→mice (forest-creatures/mouse, stool) · goose→geese (farm-animals/goose, stool) · wolf→wolves (animals/wolf, stool) · elf→elves (christmas/elf, stool) · knife→knives (kitchen-tools/knife, plate) · leaf→leaves (miscellaneous/leaf, plate — a salad leaf). Not used: tooth/foot (body parts on a diner stand), scarf (not a diner thing), fruits/cherry (drawn as an APPLE — PICTURE-RULINGS), farm-animals/calf and ox (read as a cow and a bull). **sheep→sheep** is a separate *Same word* round in pass 2: tray flip · s · "nothing" (an empty tile with a dotted outline); the socket opens, the right answer is the empty tile, and the word reads "sheep" with five sheep on the stand.

**Level 4 — Back to one (K-316, K-313, K-349), 9 rounds.** Start: 3–5 plates and the plural word; ticket 1. The child takes plates off to one, then pulls the ending out (or flips the card back). Rounds mix the three classes: cups (4), peaches (3), mice (5), donuts (2), glasses (4), geese (3), apples (5), knives (2), radishes (3). Check fails if the ending is still in or plates ≠ 1.

**Level 5 — In a sentence / write it (G2-349, K-314), 9 rounds.** The ticket carries a sentence with a blank; the stand starts at one plate; the child stacks to the number in the sentence and finishes the word. Setting *Answer: tiles / write it* — "write it" covers K-314 ("Write It Yourself"). EN (the old frames kept where the picture exists): "I'd like two ___." (cups) · "Can I have three ___?" (apples) · "Wash all four ___." (glasses) · "We need four ___." (forks) · "Please bring two ___." (donuts) · "Three ___ sit at the counter." (mice) · "Set out five ___." (spoons) · "I'll take four ___." (peaches) · "Two ___ waddle in for lunch." (geese).

**Answer position.** Tray order shuffled per render with a balance constraint: within each level the right tile sits in slot 1/2/3 exactly 3 times. The gate's bots: *always s* (Level 2 ≤ 4/9), *always es* (Level 2 ≤ 5/9), *always the first tile* (≤ 3/9), *always flip* (Level 3 ≤ 6/9, failing every regular round).
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing done:** hint, no miss — "Look at the ticket. How many plates does the order need?"
- **Miss 1** — what the apparatus shows, by case:
  - plates ≠ ticket → the ticket's dots light one by one beside the plates, so the extra/missing plates stand out · "Count the plates on the ticket."
  - more than one plate, socket empty → the open drawer pulses · "More than one! The word needs its ending."
  - wrong ending (s for es) → the word is read beat by beat and **beat dots** appear under it: the right plural's beats (peach·es = 2) as two dots, the built word's as one; the hump of the es tile glows · "Say it slowly: peach-es. Do you hear one more beat?"
  - an ending on a changing word (de umlaut words / irregulars) → it does not snap; the flip edge glows · "This word changes inside."
  - Back to one with the ending still in → the ending rattles in the socket · "Only one now — take the ending off."
- **Miss 2:** the right ending tile (or the flip) rises 6 px in the tray and gets a teal ring; in write mode the first letter of the ending appears ghosted in the box · "Try the one that is glowing."
- **A new move takes the help away** until the next Check.
- **Success:** the bell rings, the stack slides to the hatch, the customer's ticket is stamped · "Three peaches — more than one, so we add -es!" (by class: "…so we add -s!" / "…so the word changes: mice!" / "…one cup: the ending comes off!" / "…sheep stays sheep!").

## 8. Settings
1. **Words:** First words (Level 1) · s or es (2) · Words that change (3) · Back to one (4) · Sentences (5) — through the shell's level picker; the tray shows its tiles at rest.
2. **Answer:** Ending tiles (default) · Write it (K-314) — the tray becomes a keyboard at rest.

## 9. Words (EN source)
- title (shell): **Daisy's Plate Stack** (frozen) · instruction: "Stack the plates for the order. More than one? Give the word its ending."
- task lines: L1–L3 "Stack the plates, then finish the word." · L4 "Make it just one again." · L5 "Read the order, stack the plates, finish the word."
- hints/celebrations: §7 exactly. Settings labels: "Words", "First words", "s or es", "Words that change", "Back to one", "Sentences", "Answer", "Ending tiles", "Write it".
- aria: "Stand with {n} plates of {noun}", "Word: {word}. The ending drawer is {open|closed}", "Ending tile {t}", "Flip tile: the word changes inside".

**Locale traps (all endings are data derived from `image-vocabulary.js`, then confirmed by each native panel):**
- **Endings per locale.** The build splits each [singular, plural] pair: if the singular is a prefix of the plural, the ending is the rest (Tasse→Tassen: -n; Hund→Hunde: -e). **A doubled consonant is not a clean ending** (da kop→kopper, sv/no kopp→kopper is clean, nl kip→kippen doubles): such words are flip-class or excluded by the panel; if one stem vowel gains an umlaut (Apfel→Äpfel, Topf→Töpfe, tand→tänder, fot→fötter, hånd→hænder) the class is **umlaut**: an extra "¨" tile drops onto the vowel tile (the vowel split-flaps to Ä/Ö/Ü/Æ/Ø) plus an ending tile if any; anything else is **flip** (mouse→mice, œil→yeux, lautanen→lautaset). The two wrong tiles per round are real endings of that locale (de: -e, -en, -n, -er, -s; nl: -en, -s, -'s; sv: -ar, -or, -er, -n; da/no: -er, -e, none; fr: -s, -x; es/pt: -s, -es (pt -ões/-ães are flip); it: final vowel change -o→-i, -a→-e is its own class: **the last tile is replaced**, so it's socket *covers* the final vowel tile instead of opening after it; fi: -t).
- **No attested alternatives.** A noun is refused if a wrong tile would build a real alternative plural (nl appel→appels/appelen, de Pizza, en fish/fishes, it frutto/frutti/frutta). The gate checks the shipped pool against a per-locale refusal list.
- **Finnish numerals take the partitive singular** ("kaksi kuppia", not "kupit"): fi tickets show dots only — never a numeral before the noun — and fi sentences use the plural nominative as a subject ("___ ovat pöydällä."); fi also has consonant gradation (kuppi→kupit, kenkä→kengät): gradation nouns are flip-class; Level 1 fi uses gradation-free nouns only (banaani, omena, kulho, pallo, tuoli).
- **Zero plurals** (sv/da/no neuter nouns: får, glas, lamm; de Teller, Löffel, Messer; en sheep): only in the *Same word* rounds, with the empty tile.
- **Vocab defects found while designing (fix at source before this ships, standing rule):** sv `baby` = ["Baby","Babies"] — "Babies" is English (sv: bebis/bebisar); excluded from sv until fixed. sv `muffin` singular "Muffins" (colloquially accepted; the panel rules). Report both to the vocab fix list.
- **Articles/agreement in sentences** (de "zwei Tassen", fr "deux tasses", es "dos tazas") are literal per-locale strings; nothing is assembled by code. es is es-MX vocabulary (the library's es labels: durazno, plátano).
- **German nouns are capitalised**; the tiles keep the capital (Tassen).
- Sound off: the drawer, beat dots and the flip are visible; TTS only reads the finished word.

## 10. Sound off, access, phones
- Silent legibility: open/closed drawer, plate count vs ticket dots, beat dots, glowing flip edge.
- Keyboard: + / − add/remove a plate; Tab to tray tiles, Enter drops the tile into the socket; Backspace pulls it out; in write mode the physical keyboard types.
- aria-live: "Two plates — the word's ending drawer opened." / "The ending is still on, but there is only one plate."
- Taps: plates 96 × 22 drawn with a 96 × 48 hit area (64 × 44 at 360), tray tiles 64/56 px.
- Pictures 96 px at 704, 64 px at 360, identical instances on every plate.
- Phone: stacked; the bubble collapses to one line; the shelf of served orders becomes a counter under the ticket ("3 served" as plate icons, no numbers that read as a score — icons only).

## 11. Distinct from
- **#310 Word Press** (grade 3 suffixes; a stamp prints a new word form) — no number coupling; the ending there is chosen by sentence role.
- **#217 Article Caps** — a cap on a noun for gender; here the socket exists only with "more than one".
- **#14 Treat Box / #18 Bridge** (count out a number) — here counting is only the ticket; the skill is the word.
- **Row 77 Sunny-Side Diner (this batch)** — the same diner world, but magnet plates and the "and" coupler build a sentence; Daisy builds a word.
- No built activity has a socket that appears with quantity.

## 12. Build plan
- **Data:** per locale, a pool built at authoring time from `image-vocabulary.js` [singular, plural] (colour-theme nouns only), classified {add, umlaut, flip, replace-final (it), same}, with the two distractor endings; the native panel confirms every row; refusals recorded.
- **Core state** `{level, round:{noun, sing, plural, cls, ending, ticket}, plates, socket:{open, tile}, flipped, umlaut, typed, misses}`; functions `addPlate()`, `removePlate()`, `socketOpen()` (= plates ≥ 2 && cls ∈ {add, umlaut, replace-final, same}), `dropTile(t)` → `{seated}`, `flip()`, `pull()`, `word()` (the word the bench now shows), `check()` → `{ok, reason}`.
- **Gate's own ground truth** (`verify-plate-stack-core.js`): the gate re-derives each round's plural from its own copy of the vocab pair (not from the core) and asserts: the bench word equals the vocab plural only for the right tile and the ticket count; with 1 plate the socket is closed unless a tile is stuck in it; flip on a regular word returns the singular; no shipped wrong tile ever yields an attested plural (refusal list); Level-balance slot 3/3/3; bots (*always s*, *always first*, *always flip*) under their caps; fi rounds have no numeral before the noun; every picture exists and is colour.
- **Mutations:** socket opens at 1 plate · an animal noun served on a plate (holder must be a stool) · socket opens with ONE stool + one plate mixed · socket stays open at 1 with no tile · any tile seats on a flip word · flip changes a regular word · ending removal leaves a letter behind (glasse) · es hump on the s tile · slot always 1 · fi ticket shows a numeral sentence · it replace-final appended instead of replacing · Back to one accepts the ending left in.
- **Pictures seen on contact sheets (2026-10-17):** kitchen-tools cup, plate, fork, spoon, bowl, glass, knife (clean single objects); farm-animals hen, pig, goose. Verify at build: fruits apple, pear, peach; breakfast/donut; bakery/muffin; vegetables radish, squash (squash must read as one vegetable at 64 px — fallback: birds/ostrich on a stool, "ostriches", also an extra-beat -es word); classroom/lunchbox; kitchen-tools/mug; animals fox, wolf; christmas/elf; forest-creatures/mouse; miscellaneous/leaf; farm-animals/sheep. Excluded by ruling: fruits/cherry (drawn as an apple).
- **Risks:** five identical pictures on a tall stand at 320 — plate spacing 30 px with 64 px pictures overlaps by design (like a real stack); the topmost picture is fully visible and the count also shows as the plate rims.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clinking plates, a drawer that opens with the second plate, a word card that flips, an order that goes out with a bell.
2. **Would a teacher put it on the board?** Yes — "the ending comes with the second one" is shown by the machine, the extra beat of -es is visible, and irregulars are a different physical move.
3. **Would a parent trust it?** Yes — real words from the picture dictionary in their language, no invented misspellings to pick from, no scores.
4. **The invention:** the word grows an ending only when the second plate lands, and the ending must come off when the plates go back to one.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **No living thing on a plate.** The hen, the pig, mice, geese, a wolf were "served" on Daisy's plates (and teeth and feet in Level 3). Animal and people nouns now sit on **counter stools** (customers), food and kitchen things ride plates — the socket still opens when the SECOND holder lands. Body parts removed from the diner entirely.
- **Changers:** mice, geese, wolves, elves, knives, leaves (+ sheep stays sheep); out: tooth/foot, scarf, fruits/cherry (drawn as an APPLE — ruling), calf/ox (read as cow/bull).
- **s or es:** dress, watch, bench, brush on plates replaced by diner words where the extra beat is heard — peach, glass, radish, lunchbox, fox (stool) vs fork, bowl, mug, spoon; split 5/4 so neither "always s" nor "always es" passes (bots capped ≤ 4/9 and ≤ 5/9); potato/tomato banned (their -es adds no beat).
- Level 1 plate-on-a-plate and ball → donut, muffin; Level 4/5 teeth/dresses → geese/radishes; "Three mice ran into a hole" → "Three mice sit at the counter"; "Brush your teeth" → "Two geese waddle in for lunch."
- Two mutations added (animal on a plate; mixed holders).
