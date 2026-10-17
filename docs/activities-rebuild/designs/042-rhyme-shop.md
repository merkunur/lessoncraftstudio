# Row 42 — Rosa Raccoon's Rhyme Wagon → THE RHYME CHAIN (RF.K.2.a)

## 0. Identity
- id `rhyme-shop.rhyme.rf-k-2-a` (KEPT; slugs/metadata frozen en/de/es/pt/it/nl; fr/sv/da/no/fi slug, title and intro are new at build) · grade K · CCSS RF.K.2.a · Reading: Foundational Skills · own files `rhyme-chain-core.js`, `rhyme-chain-activity.js`, `rhyme-chain-activity.html`, `rhyme-chain-activities.json` (the row leaves `rhyme-shop-activities.json`, emptied to `[]`; the id is unchanged).
- Frozen title "Rosa Raccoon's Rhyme Wagon — Hear & Match Rhymes"; frozen intro promises: headphones recommended; tap a picture to HEAR its name, then feed Rosa's wagon the words whose endings RING the same (bee and key, snail and whale). **All kept true:** tap = hear; Rosa's wagon is fed by hanging words on the chain it pulls; "endings ring the same" becomes literal — rhyming words are rings that close on each other. (bee–key and snail–whale both stay in the en rounds.)
- Worksheets also covered: **K-232** Rhyming Pairs (PICK, JUDGE) · **K-352** Rhyme or Not? (JUDGE) · **G1-343** Sort the Rhymes (SORT) · **G1-344** Finish the Rhyme (FINISH) · **G1-345** Rhyme Strings (CHAIN, FIELD) · **G1-309** Rhyming Words: Rhyme and Write and **G1-346** Write Your Own Rhymes (the oral "Your turn" link after every chain — production is spoken, see §3; writing itself is out of scope for a K picture activity and stays with the worksheets).
- Old activity: per-locale rounds of seven kinds (judge, pick, odd, sort, chant, field, chain) for en/de/es/pt/it/nl with phonological rime keys, a print-matcher, SVG stub art. **Kept:** every kind, every rhyme family and every round that still has a library picture; the phonological rime key as the truth (never spelling); the bear/ear spelling trap. **Fixed (pedagogical defects found while designing — the build fixes them at the source and the live page is republished):** en uses five nouns with NO library picture (knee, hair, tree, trail, scale); de uses Hose (no picture) and Tanne (no picture) and Kanne (the picture's label is "Teekanne"); pt uses Cabelo (no picture), Cão (the picture's label is "Cachorro", which does not rhyme with avião) and Panela (the picture is labelled "Frigideira", which does not rhyme with estrela). **New:** fr/sv/da/no/fi rounds (§6).

## 1. The pitch
"Rosa's wagon pulls a chain of rings, and a ring will only close on a ring whose word ends with the same sound — a rhyme is a link that holds; a word that doesn't rhyme simply falls off."

## 2. Why a child will want it again (the fun)
- **Forging a link.** Drag a picture to the end of the chain: a ring forms around its hanger, swings over and tries to close through the last ring. If the endings ring the same it snaps shut with a bright "clink!" and the two words are echoed together ("snail … whale"). If not, the ring's ends spring apart like an open hook, and the picture drops onto the grass with a soft bump and rolls back — funny, not shameful.
- **The chain you made.** Every right word adds a link; Rosa (the library raccoon) sits on the wagon and, at the end of a round, the wagon rolls across the stage towing the chain, every picture swinging and every ring jingling in turn. A long rhyme string makes a long, jingly parade.
- **The ring patterns.** Each rhyme family's rings carry their own colour and engraving (stripes, dots, zigzags) — but a picture's ring only shows its pattern when it is forged. When a link holds, both rings glow the same pattern: same pattern, same ending. Children start to "see" sound.
- **Two wagons** (sort rounds): a second wagon joins and the child sends each word to the chain it fits, like coupling a parade.
- **Free play ("Rhyme yard"):** every picture of the round on the grass, two empty wagons; build any chains you like and hear them.

## 3. The skill and the misconception
- **Skill (RF.K.2.a):** recognise and produce rhyming words — hear that snail and whale end with the same sounds; judge rhyme or not; find the odd one out; sort by rhyme; finish a rhyme; build a rhyme string; then say a new rhyming word.
- **Misconception 1 — "words that look alike rhyme" (bear / ear).** **Push back:** the chain judges by the SOUND (the phonological rime key), never the spelling: bear's ring and ear's ring get different patterns and the link springs open even though the printed words share "-ear" (shown when the names setting is on). And snail / whale (spelled -ail / -ale) link perfectly.
- **Misconception 2 — "words that START the same rhyme" (fr chat / chapeau, sv hus / hund, fi kukka / kukko).** Each locale has at least one judge round built on this trap; the ring opens.
- **Misconception 3 — "words from the same group rhyme" (bee and ant are both bugs).** The old category data is kept: distractors are chosen from the target's own category where possible (bee vs snail), so meaning cannot stand in for sound.
- **Production (G1-346, RF.K.2.a "produce").** After every completed chain, an open ring dangles at its end with a "Your turn" ear icon: the child (or class) says a new word that ends the same; the ring is not judged (a free spoken turn) — the teacher hears it. This is honest: a K picture activity cannot check speech; it can invite it.

## 4. The stage
Layout `split` at ≥ 700 px (wagon + chain + grass left, the round card + bubble right); stacked below.

**At 704 px (left 452, right 196):**
- **Task line** 22 px: the prompt (§9).
- **Rosa's wagon** (left end of the stage, 150 × 130 px): a drawn wooden wagon (cream bed, teal wheels, 3 px ink) with **Rosa** = library **forest creatures/raccoon** at 104 px sitting in it. A tow bar runs right to the **anchor ring**.
- **The chain** (from the wagon's tow bar across the stage, 300 × 150 px): rings are drawn steel loops (44 px, 4 px stroke); each ring carries a **picture card** hanging under it (96 × 96 px library picture on a cream tag with 2 px ink). The anchor ring (the target word) shows its family pattern from the start; empty slots for the next links are dotted ring outlines. Up to four pictures fit on the chain at 704 (the chain bends down into a gentle swag if longer).
- **The grass** (452 × 140 px, under the chain): the candidate picture cards (96 × 96) standing in a row, each with a tiny ear icon (24 px) in its corner (tap = hear). Their hanger rings are plain grey — no pattern until forged.
- **JUDGE rounds:** two pictures hang on two separate rings side by side, not yet joined; two big chunky buttons under them: a **closed-link** icon (two rings joined, 64 px) and an **open-link** icon (two rings apart, 64 px) — no words.
- **SORT rounds:** a second wagon and chain appear under the first (each chain 300 × 120; picture cards 88 px).
- **FINISH rounds:** a **song strip** (a ribbon of paper above the chain) shows the line Rosa sings, with the final word as a blank; TTS sings it where reliable; the line is printed for readers and adults (18 px).
- **Right column:** the round card (which kind: a small icon), the **Your turn** ring after a chain is complete, the bubble (≤ 3 lines), speaker 36 px, Check ("Pull the wagon" — a 64 px wagon-handle icon).

**At 360 px:** stacked: task line → wagon (Rosa 72 px) + chain in a swag 336 × 150 (rings 34 px, picture cards 72 px) → grass as a row of 3–4 cards (72 × 72; with four cards: 4 × 72 + 3 × 8 = 312 px) → bubble → Check. JUDGE buttons 56 px. Check bottom ≈ 640 px at 360 × 740. At 320 × 640: cards 64 px (the picture floor at phones), rings 30 px; Check ≈ 600 px. SORT at 360: the two chains stack, cards 64 px.

**Words on the apparatus:** none. Picture names appear only when the setting "Names" is on (a 16 px label under each card, from `image-vocabulary.js`, lower-case except German nouns), never by default — the activity is about hearing.

## 5. The hand
- **Tap a picture's ear** (or tap the picture once): it bounces (160 ms) and, where TTS is reliable, says its name (`LCSAudio`, page locale); with sound off the bounce plus the optional name label stand in, and the instruction asks the child to say the names aloud. Tapping never commits.
- **Drag a picture to the chain's end** (or tap-tap: picture, then the dotted ring): a ring forms round its hanger (120 ms) and swings to the last ring (260 ms). It then **reveals its pattern** and:
  - **same rime** → the ring closes through the last ring: "clink!", both rings glow the shared pattern, TTS echoes the two words ("snail … whale"); the chain grows one link.
  - **different rime** → the ring's ends spring apart (an open C, 180 ms "sproing"), the picture drops to the grass with a bump and rolls back to its place (500 ms). Its ring stays patterned (now known to the child) but grey-rimmed.
- **Unhook a link:** tap a hung picture (not the anchor) → it drops back to the grass (undo).
- **JUDGE:** tap the closed-link or the open-link button (the prediction); then the two rings move toward each other and either link or spring apart — the prediction is judged by what the rings do.
- **ODD ONE OUT:** four pictures are already hung on four rings resting loosely end to end; the child taps the one they think will not hold; Check shakes the chain: the odd ring springs open and its picture falls (if the child chose right, their marked picture is the one that falls).
- **Pull the wagon (Check):** used in ODD, FIELD, SORT and CHAIN to end the round; in PICK the forging itself is the test.
- **The parade (success):** the wagon rolls right across the stage (1.6 s) towing the chain, each ring jingling in order (a rising arpeggio), then rolls back.
- **Free play ("Rhyme yard"):** every picture of the round on the grass, two empty wagons, no judging beyond the rings' own behaviour.

## 6. The rounds
**Kinds (from the old cogs):** JUDGE (rhyme or not — one right button) · PICK (one of three rhymes with the anchor) · ODD (three of four rhyme; tap the one that won't hold) · SORT (two anchors; send each of four pictures to its chain) · FINISH (old *chant*: Rosa's line ends in a blank; pick the word that rhymes) · FIELD (two of four rhyme with the anchor; hang both) · CHAIN (build a three-link string, one choice of three per step). Every round has exactly one right answer (one button, one picture, one set, one sort).

**en — 12 rounds (old content kept; the five pictureless nouns replaced):**
1. JUDGE snail – whale → rhyme ✓ (old)
2. JUDGE bear – ear → NOT ✗ (old spelling trap)
3. PICK snail: bee / whale / key → whale (old)
4. PICK pear: pie / chair / bee → chair (old; knee → bee)
5. PICK cat: dog / hat / sun → hat (replaces pick-knee)
6. ODD snail, nail, whale | bee → bee (trail → nail)
7. ODD bear, chair, pear | key → key (hair → pear)
8. SORT anchors whale / cat · pile snail, hat, nail, bat (replaces tree/scale/key)
9. FINISH "A snail, a whale and a shiny steel …" → nail (choices key / nail / pie; trail → nail; the old "the whale will wail" line used a homophone of whale and is dropped)
10. FINISH "A shiny golden key — it rhymes with …" → bee (choices bear / bee / tie)
11. FIELD dog: log, frog | cat, bus → log + frog (replaces field-bee, whose tree has no picture)
12. CHAIN boat → goat → coat (step 1: goat / sun / bee · step 2: coat / cat / key)
Pictures (all in mini tools/pictures): insects and bugs/snail, animals/whale, forest creatures/bear, body parts/ear, farm animals/bee, around the house/key, fruits/pear, around the house/chair, bakery/pie, farm animals/cat, farm animals/dog, accessories/hat, beach/sun, tools/nail (the metal nail — en ONLY: critic found its lcs-pictures labels are the FINGERNAIL words in every other locale — fr Ongle, es Uña, sv Nagel, da/no Negl, fi Kynsi — while the picture is a metal nail, whose real words are image-vocabulary `metal-nail`: fr Clou, da Søm, no Spiker, sv Spik, fi Naula; da therefore uses body parts/nail, which IS a fingernail, for negl), animals/bat, accessories/tie, camping/log, camping/frog, vehicles/bus, vehicles/boat, farm animals/goat, clothing/coat.

**de — 10 rounds (old, three fixes):** JUDGE Maus–Haus ✓ · JUDGE Fisch–Hund ✗ · PICK Fisch: Tisch / Hund / Rose → Tisch · PICK **Dose** (can; replaces Hose): Rose / Schwein / Boot → Rose · PICK Hahn: Zahn / Glocke / Maus → Zahn · ODD Pfanne, **Teekanne**, **Badewanne** | Socke → Socke (Kanne → the picture's real label Teekanne; Tanne → Badewanne) · SORT (old) · FINISH (old) · FIELD (old) · CHAIN (old). Words always equal the picture's `image-vocabulary.js` label.

**es / it / nl — 10 rounds each:** the old rounds verbatim (every picture verified present and every word equal to its vocab label: es Gato/Pato/Zapato, Avión/Camión/Limón/Ratón, Campana/Manzana, Camiseta/Galleta…; it -ino/-ello/-one families; nl Huis/Muis, Beer/Peer, Citroen/Meloen/Schoen, Banaan/Haan…).

**pt — 10 rounds (old, three fixes):** ELO family: Cabelo → **Martelo** (hammer) and **Camelo** (camel) · AO family: Cão → **Pão** (bread) (avião, caminhão, limão, pão) · ELA family: Panela → **Janela** (window) (estrela, janela). Every other round verbatim.

**fr — 11 rounds (new; families -eau [o], -on [ɔ̃], -ette [ɛt], -in [ɛ̃]):**
1. JUDGE bateau – gâteau ✓ · 2. JUDGE chat – chapeau ✗ (onset trap) · 3. PICK poisson: lune / mouton / vache → mouton · 4. PICK lapin: ours / pain / chat → pain · 5. PICK seau: oiseau / souris / main → oiseau · 6. ODD ballon, cochon, citron | vache → vache · 7. ODD bateau, râteau, chapeau | lapin → lapin · 8. SORT gâteau / trompette · pile seau, fourchette, oiseau, chaussette · 9. FINISH « Le petit cochon joue avec son … » → ballon (ballon / chat / main) · 10. FIELD camion: avion, maison | chat, lune · 11. CHAIN main → lapin → pain (lapin / ours / vache · pain / lune / chat).
Pictures: vehicles/boat, desserts and sweets/cake, farm animals/cat, accessories/hat, animals/fish, space/moon, farm animals/sheep, farm animals/cow, farm animals/rabbit, forest creatures/bear, at the supermarket/bread, toys/bucket, spring/bird, forest creatures/mouse, body parts/hand, toys/ball, farm animals/pig, fruits/lemon, around the house/rake, music/trumpet, kitchen tools/fork, accessories/sock, vehicles/truck, vehicles/airplane, miscellaneous/house.

**sv — 11 rounds (new; families -att, -us, -ol, -o, -and, -opp; pictures: farm animals/cat, accessories/hat, miscellaneous/house, farm animals/dog, beach/sun, around the house/chair, vehicles/car, farm animals/pig, farm animals/cow, clothing/shoe, animals/fish, forest creatures/mouse, toys/ball, body parts/hand, summer/sand, body parts/tooth, kitchen tools/cup, around the house/mop, spring/bud — every label checked equal to the word):**
1. JUDGE katt – hatt ✓ · 2. JUDGE hus – hund ✗ (onset trap) · 3. PICK sol: stol / bil / gris → stol · 4. PICK ko: sko / katt / fisk → sko · 5. PICK mus: hus / sol / boll → hus · 6. ODD hand, sand, tand | gris → gris · 7. ODD kopp, mopp, knopp | hatt → hatt · 8. SORT sand / kopp · pile hand, tand, mopp, knopp · 9. FINISH "Titta, en katt med en …" → hatt (hatt / sko / sol — the rhyme sits inside the line, as in "Katten i hatten") · 10. FIELD hand: sand, tand | ko, bil · 11. CHAIN kopp → mopp → knopp (mopp / katt / sol · knopp / gris / ko).

**da — 11 rounds (new; families -at, -us, -ol, -o, -and [anˀ], -egl; pictures as sv plus farm animals/duck (and), beach/bucket (spand), body parts/nail (negl — the fingernail; never tools/nail), insects and bugs/snail (snegl); no water picture — every library "water" is a BOTTLE a Danish child calls "flaske", so vand is out):**
1. JUDGE kat – hat ✓ · 2. JUDGE hus – hund ✗ · 3. PICK sol: stol / bil / gris → stol · 4. PICK ko: sko / kat / fisk → sko · 5. PICK mus: hus / sol / ko → hus · 6. ODD and, sand, tand | gris → gris · 7. JUDGE negl (body parts/nail) – snegl ✓ · 8. SORT and / kat · pile sand, tand, spand, hat (three to one chain, one to the other) · 9. FINISH "Se, en kat med en …" → hat (hat / sko / sol) · 10. FIELD and: sand, spand | kat, sol · 11. CHAIN and → sand → tand (sand / ko / bil · tand / mus / hat).

**no — 11 rounds (new, bokmål; families -att, -us, -ol, -ake, -åke, -and/-ann [ɑn]; pictures as sv plus bakery/cake (kake), around the house/rake, farm animals/duck (and), body parts/tooth (tann), animals/seagull (måke), birds-2/crow (kråke); the cow is "ku" in bokmål — the library label — never "ko"; no water picture, for the same bottle reason as da):**
1. JUDGE katt – hatt ✓ · 2. JUDGE hus – hund ✗ · 3. PICK sol: stol / bil / gris → stol · 4. PICK kake: rake / katt / fisk → rake · 5. PICK mus: hus / sol / kake → hus · 6. ODD and, sand, tann | gris → gris · 7. JUDGE måke – kråke ✓ · 8. SORT sand / kake · pile and, tann, rake (two to one chain, one to the other) · 9. FINISH "Se, en katt med en …" → hatt (hatt / sko / sol) · 10. FIELD and: sand, tann | katt, mus · 11. CHAIN and → sand → tann (sand / ku / bil · tann / mus / hatt).

**fi — 11 rounds (new; families -uu, -ukka, -una, -ukko, -rava):**
1. JUDGE kuu – suu ✓ · 2. JUDGE kukka – kukko ✗ (same start, different end) · 3. PICK kukka: sukka / kissa / auto → sukka · 4. PICK juna: muna / kala / pallo → muna · 5. PICK orava: harava / koira / kana → harava · 6. ODD juna, muna, peruna | kala → kala · 7. JUDGE kukko – lukko ✓ · 8. SORT kukka / juna · pile sukka, muna, peruna (one to the kukka chain, two to the juna chain) · 9. FINISH "Kuu paistaa, ja auki on …" → suu (suu / kala / auto; the reviewer may replace the line with a more natural loru line that still ends on suu) · 10. FIELD juna: muna, peruna | kissa, auto · 11. CHAIN orava → harava (step: harava / koira / kana), then the "Your turn" ring — a two-link chain, because Finnish picture rhymes in the library come in pairs; the gate allows CHAIN length 2 for fi only.
Pictures (fi): space/moon, body parts/mouth, spring/flower, accessories/sock, farm animals/rooster, around the house/lock, vehicles/train, easter/egg (critic saw it: a striped painted Easter egg; its fi label is "Muna" and it reads as an egg, but a child may say "pääsiäismuna" — Names is On by default in fi, so the printed name settles it), vegetables/potato, camping/squirrel, around the house/rake, farm animals/cat, animals/fish, vehicles/car, toys/ball, farm animals/dog, farm animals/hen.

**Rule for every new locale table (the gate checks it):** every word equals its picture's label in `image-vocabulary.js`; every rhyme pair shares the rime by a native reviewer's ear (stress and vowel length included: sv sol/stol both long /uː/, da and/sand/tand all [anˀ], no and/sand/vann all [ɑn]); every JUDGE-NOT and every distractor shares no rime with the anchor; each locale has at least one onset-trap round.

**Answer position:** PICK choices: the right picture sits in slots 1/2/3 equally often per locale (± 1); FIELD: the two right pictures never always adjacent or always at the ends; ODD: the odd picture's slot rotates through 1–4; JUDGE: rhyme vs not split as evenly as the locale's table allows (≥ 1 of each); SORT piles alternate families irregularly. The grass order is re-dealt every pass under these balances (gate: slot counts per locale within ± 1, and "always first slot" ≤ 2 hits per pass).

**Order:** order-only reshuffle per pass; never the same order twice; a pass starts with a PICK; FINISH rounds never adjacent.

## 7. Check, the misses, the success
- **Check with nothing done:** no miss; the first grass picture bobs and its ear icon pulses; **"Tap a picture to hear it. Then hang the one that rhymes."**
- **Miss 1 (a ring springs open / a wrong JUDGE / a wrong ODD pick / a mis-sort):** the apparatus shows it — the open ring and the falling picture (PICK/FIELD/CHAIN/SORT), the rings refusing (JUDGE), the wrong ring falling (ODD). Then the two words are **echoed with their endings stretched**: TTS says "bear … ear" and the shell's speech bubble shows two sound-wave ribbons of different patterns. Bubble: **"Listen to the ends: {a} … {b}. Do they sound the same?"** (words written only if "Names" is on; otherwise the bubble shows the two pictures at 40 px).
- **Miss 2:** the anchor ring and every candidate ring on the grass show their family patterns at once (the sound made visible for this round), and TTS repeats the anchor twice slowly. Bubble: **"Find the ring with the same pattern as {anchor}."** (the picture of the anchor in the bubble when names are off)
- **A new move takes the help away** (patterns go grey again) until the next Check.
- **Success:** the parade; bubble: PICK/CHAIN **"Snail, whale — they rhyme!"** (the chain's words read in order: **"Boat, goat, coat — a rhyme chain!"**) · JUDGE ✓ **"Yes! {a} and {b} rhyme."** · JUDGE ✗ **"Right — {a} and {b} don't rhyme."** · ODD **"{x} doesn't rhyme with the others!"** · SORT **"Every word is on its rhyme chain!"** · FINISH (Rosa sings the whole line) **"A snail, a whale and a shiny steel nail!"** · then the **Your turn** ring: **"Your turn! Say another word that rhymes."** Pass end: Rosa's wagon does a lap with every chain of the pass: **"What a rhyme parade!"**

## 8. Settings
1. **Names:** Off / On (default Off) — On prints each picture's name under its card (for readers, adults, and the six locales where TTS is unreliable); the cards at rest gain labels.
2. **Patterns:** After hanging / Always (default After hanging) — Always shows every ring's family pattern from the start (a scaffold for children who need to see the sound groups before hearing them reliably; the teacher's choice).

## 9. Words (EN source)
- on-screen title: **Rosa's Rhyme Wagon**
- instruction: **Tap a picture to hear its name. Hang it on Rosa's chain — a ring only closes if the ending sounds the same!**
- prompts: JUDGE **Do these two rhyme?** · PICK **Which one rhymes with {anchor}?** · ODD **Which one doesn't rhyme?** · SORT **Hang each picture on the chain it rhymes with.** · FINISH **Finish Rosa's rhyme!** · FIELD **Find both that rhyme with {anchor}.** · CHAIN **Make a rhyme chain!** ({anchor} is the picture's name; when Names is off the prompt is spoken and printed with the name — the prompt is chrome, not apparatus)
- hints: **Tap a picture to hear it. Then hang the one that rhymes.** · **Listen to the ends: {a} … {b}. Do they sound the same?** · **Find the ring with the same pattern as {anchor}.**
- success: **{a}, {b} — they rhyme!** · **{list} — a rhyme chain!** · **Yes! {a} and {b} rhyme.** · **Right — {a} and {b} don't rhyme.** · **{x} doesn't rhyme with the others!** · **Every word is on its rhyme chain!** · **Your turn! Say another word that rhymes.** · **What a rhyme parade!**
- FINISH lines (per locale, authored, sung by TTS where reliable): en **A snail, a whale and a shiny steel …** · **A shiny golden key — it rhymes with …**; fr « Le petit cochon joue avec son … »; sv "Titta, en katt med en …"; da "Se, en kat med en …"; no "Se, en katt med en …"; fi "Kuu paistaa, ja auki on …"; de/es/pt/it/nl keep their old chant lines.
- button: **Pull the wagon** (Check) · free play: **Rhyme yard** · settings: **Names** — **Off** / **On** · **Patterns** — **After hanging** / **Always**

**Locale traps:**
- **Rhyme is per language and is never translated.** Every locale has its own families (§6); a translated pair almost never rhymes (snail/whale → de Schnecke/Wal).
- **Spoken vs written:** families are keyed by sound (rimeKey), so es -ón with accents (avión, camión) and pt -ão (avião, pão) are one family each; fr -eau/-o and -ette spelled variants are allowed only where they sound identical.
- **German nouns** keep their capital in labels; Rosa says and prints bare nouns without articles (an article adds a word the child must ignore; rhyme lives at the end of the noun).
- **Picture label = word:** the word Rosa says and prints MUST equal the picture's vocabulary label (this is what broke pt Cão/Cachorro and Panela/Frigideira). The gate enforces it.
- **TTS reliability:** the activity says "headphones recommended" (frozen intro); in locales without reliable TTS the Names setting defaults to On for that locale (sv/da/no/fi and any locale the build measures as unreliable), the instruction asks the child to say the names aloud, and the ring patterns carry the judgement silently.
- **Finnish rhyme** is less central to Finnish phonological teaching than syllables; the fi table uses clear end-rhymes (kuu/suu, kukka/sukka) typical of Finnish lorut; the reviewer confirms grade fit (esiopetus).

## 10. Sound off, access, phones
- Legible silent: the ring closing or springing open, the falling picture, the patterns that match, and the optional names make every judgement visible; what sound adds is the hearing itself, which the child can supply by saying the names aloud (the instruction says so).
- Keyboard: arrows move over grass pictures; Space hears the focused picture; Enter hangs it; Backspace unhooks the last link; Y / N answer JUDGE (closed / open link); Enter on the wagon handle = Check.
- aria: picture "{name}"; chain "chain: snail, whale"; ring results in a live region ("whale holds — it rhymes with snail" / "bee falls off — it does not rhyme with snail").
- Taps: cards ≥ 64 px; JUDGE buttons 56–64 px; ear icons have a 44 px hit area overlapping the card corner.
- Reduced motion: rings appear closed or open without swinging; the parade becomes a highlight that runs along the chain.

## 11. Distinct from
- **Built #9 Counting Necklace / #4 Constellation Thread:** strings for counting. **Row 27 Lantern String:** lights for number pairs. **Row 72 Two-Ended Rod:** opposites slide by meaning. Here the ring's closing IS the rhyme judgement, keyed by sound.
- **sound-boxes / blending-board tools:** segmenting and blending phonemes; no rhyme judgement, no picture chains.
- **New 217 Article Caps (a cap that won't sit):** a fit-or-refuse mechanic for grammar; the Rhyme Chain's refuse is a ring that springs open and the sound patterns it reveals — a different object, a different skill.

## 12. Build plan
- **Core state:** `{ locale, names, patterns, order[], idx, kind, anchor:{word, noun, theme, rime}, grass:[{id, word, noun, theme, rime, revealed}], chains:[[id…]] (1 or 2), judge:null|'yes'|'no', oddPick:null|id, misses, help }`.
- **Functions:** `hear(id)`, `hang(id, chainIdx)` → `{holds}` (holds iff rime = chain's anchor rime), `unhook(id)`, `answerJudge(v)`, `pickOdd(id)`, `pull()` (Check) → `{ok, reason}`, `nextTask(index)`.
- **Gate `verify-rhyme-chain-core.js` (own oracle):** (1) for every locale table: every word equals its picture's `image-vocabulary.js` label and every picture exists in `mini tools/pictures/<theme>.json` (this check would have caught knee/hair/tree/trail/scale, Hose/Tanne/Kanne, Cabelo/Cão/Panela); (2) `hang` holds iff rime keys match — exhaustive over every word pair of every table; (3) each round has exactly one right answer (PICK one rhyming choice; FIELD exactly the listed two; ODD exactly one non-member; SORT a unique assignment; JUDGE the table's truth); (4) every locale has ≥ 1 onset-trap JUDGE-NOT round and en keeps the bear/ear spelling trap; (5) answer slots balanced ± 1 per locale; (6) distractors never share the anchor's rime; (7) the CHAIN length rule (3, or 2 where the table says so).
- **Mutations:** hang holds on spelling instead of rime (bear/ear links); hang holds on onset; a distractor with the anchor's rime; a word ≠ its picture label (Cão on a Cachorro picture); a missing picture accepted; FIELD accepts one of two; SORT accepts a swap; JUDGE answer inverted; slot always 1; help persists after a move; patterns shown before hanging with "After hanging" set.
- **Pictures to verify on contact sheets:** every picture listed in §6 (en/fr/sv/da/no/fi lists; de/es/it/nl/pt old sets re-checked), tools/nail (metal nail — en only, see the label defect), easter/egg (painted, reads as an egg), summer/sand (a sand pile), spring/bud (a closed tulip bud), beach/bucket, animals/seagull, birds-2/crow — all seen by the critic; vegetables/potato, around the house/rake, camping/squirrel. **Risks:** native ear-check of the five new tables (one reviewer, §A.13.48 rule 2); TTS quality per locale. **BLOCKED nothing** — but the five live defects (en 5 pictureless nouns; de Hose/Tanne/Kanne; pt Cabelo/Cão/Panela) are live pedagogical mistakes that should be fixed on the current page at once, independent of this rebuild.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clinking rings, pictures that tumble off when they don't fit, a raccoon pulling a jingling parade of their own rhyme chain.
2. **Would a teacher put it on the board?** Yes — "Will 'ear' hold on 'bear'?" The class predicts, the ring answers; the spelling trap and the same-start trap are built in, and the "Your turn" ring invites the class to produce rhymes aloud.
3. **Would a parent trust it?** Calm, real library pictures whose names match what is said, the right words in every language, no score.
4. **The invention:** a chain where a word's ring will only close on a ring whose word ends with the same sound — so a rhyme is a link that holds and a non-rhyme falls off.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Every fr/sv/da/no/fi word looked up against the theme JSON labels and every pair checked by sound. Defects fixed: no "ko" in a no round — the bokmål label is "ku"; da/no "vand"/"vann" used a water BOTTLE picture (a child says "flaske") → da spand (beach/bucket), no rounds rebuilt with tann and a new JUDGE måke–kråke (seagull/crow).
- tools/nail: the designer's da choice (body-parts/nail = "Negl", the fingernail) is RIGHT; the real defect is that tools/nail (a metal nail) carries the fingernail labels in every non-en locale, whose true word is image-vocabulary metal-nail (da Søm). tools/nail is now en-only; ruling recorded.
- en FINISH line "The whale will wail…" used a homophone of whale → "A snail, a whale and a shiny steel …". sv/da/no FINISH lines rebuilt so the rhyme lives inside the line ("Titta, en katt med en …").
- Picture lists written out for sv/da/no; easter/egg, summer/sand, spring/bud, beach/bucket, seagull, crow seen on contact sheets. fi FINISH line flagged for the native reviewer.
