# New 215 — The Bead Rail (RF.K.2.b)

## 0. Identity
- **id** `syllable-drum.play.rf-k-2-b` · grade K · CCSS RF.K.2.b ("count, pronounce, blend, and segment syllables in spoken words") · strand Reading: Foundational Skills · key `syllable-drum` → `mini tools/syllable-drum-core.js`, `syllable-drum-activity.js`, `syllable-drum-activity.html`, `syllable-drum-activities.json`. Scaffold: `node scripts/new-activity.js --num=215`, then `new/NEW-RECIPE.md`.
- **Worksheets covered:** K-233 "Count the Syllables" (write how many syllables you hear) → BEAT mode; K-234 "Sort by Syllables" (draw a line from each picture to its number of syllables) → SHELF mode.
- New instrument (no old activity). Name: **The Bead Rail**.

## 1. The pitch
"Squash the pillow once for every beat you say — then the word itself comes down and checks you: it breaks into its syllables, and every piece has to find a bead to sit on."

## 2. Why a child will want it again
- **The pillow.** A fat square cushion with stitched edges (drawn geometry, teal, 2 px stitch dashes). Pressed, it squashes 18 % flat and puffs back (120 ms down, 220 ms spring back with one overshoot). It is the most pressable thing on the screen, and pressing it is *saying the word with your hand*.
- **The picture nods along.** Every press makes the library picture do a small squash-nod (scaleY 0.92, 140 ms) — as if the dog were saying the beats with you. Children press slowly just to watch it.
- **Beads with weight.** Each press drops a glossy bead from the top of the stage; it falls onto the rail, bounces twice (6 px then 2 px) and rolls left until it touches the bead before it. A bead tapped on the rail hops off and rolls away (undo).
- **The word comes down.** The surprise of every round: on Check, the written word drops from the picture's caption slot, hovers, and *cracks* into its syllables; each piece floats down to its own bead. When it fits, the beads light left-to-right like a tiny xylophone run (one rising tone per syllable) and the picture nods once per syllable in time — the board says the word back.
- **SHELF mode** has its own toy: three or four wooden shelves with dents for 1, 2, 3, 4 beads. Drop a picture on a shelf and its word lays itself along the dents; a word that is too long has a piece dangling off the end, which swings and pulls the card back to the pile.
- No timer, score, streak or lives. After a round the pillow keeps working: each press lights the next syllable bead and the picture nods (free play — "say it again").

## 3. The skill and the misconception
- **Skill:** hear a spoken picture word, beat it into syllables, count the beats (K-233); group pictures by their number of syllables (K-234).
- **Misconception 1 — counting letters or length.** A long one-syllable word (*cheese*, *shrimp*, *horse*) "feels big"; a short word with more beats (*kiwi*, *panda*, *banana*, *tomato*) "feels small". Every pass carries ≥ 3 such lures and is built so letter count does NOT predict the count (measured, §6). The apparatus pushes back physically: *dress* breaks into ONE piece, so a child who pressed four times sees three dark beads with nothing on them roll off the end of the rail into the tray.
- **Misconception 2 — one press for the whole word / only the first beat.** One bead under *butterfly*: the word cracks into *but · ter · fly*, *but* sits on the bead, *ter* and *fly* hang over empty dips, swinging. The child SEES the parts of the word that got no beat.
- **Misconception 3 — counting sounds.** *cat* pressed three times (c-a-t): two beads stay dark. The written word does not break where the sounds are; it stays whole.
- The rail never says "wrong" — word and beads simply do not match, and the mismatch is a *place* on the rail.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stage ≈ 450 px wide):**
- **Picture stand** — library picture 150 × 150 px on a shallow drawn plinth (cream, 3 px teal outline), centred top. Under it the **caption slot**, an empty rounded bar 220 × 34 px. Before Check the slot is EMPTY, so letters cannot be counted.
- **The rail** — a brass groove 400 × 46 px with dips 64 px apart. Number of dips = the setting's highest count + 1 (4 in Short, 5 in Long), so a full rail is never the answer. Beads are 40 px glossy circles coloured by POSITION on the rail (coral, teal, gold, plum, sky) — never by count.
- **The pillow** — 112 × 112 px cushion right of the rail; the whole cushion is the target.
- **The tray** — a small cup at the right end of the rail (48 × 30 px) where surplus beads roll; tapping it empties it.
- **Check** — the shell button under the rail.
- **Task line (EN, 20 px):** "Say the word. Squash the pillow once for each beat."

**At 360 px:** picture 110 × 110; rail 320 × 40, dips 52 px apart, beads 36 px; pillow 96 px centred under the rail; Check under the pillow at ≈ 610 px (above the 740 fold). At 320 × 640: picture 96, pillow 84, Check ≈ 575 px.

**SHELF mode stage:** SHELF uses the full width (`layout:'stack'`, bubble under Check) because placed pictures must stay ≥ 96 px. The picture pile (fanned stack, top card 120 px at 704 / 88 px at 360) at the top; below it the shelves in fixed order top-to-bottom: 1 dent, 2 dents, 3 dents (and 4 dents in Long). No numerals — the dents are the number. Shelf 640 × 108 px at 704 (dents on the left 200 px, then room for 4 pictures at 96 px); at 360 the shelf is 328 × 76 (dents 120 px, then 3 pictures at 64 px). No round ever puts more than 3 pictures on one shelf.

No words on the apparatus before Check; the only text that ever appears on it is the word itself (content).

**Pictures** — library only, colour themes: `animals`, `farm-animals`, `zoo-animals`, `forest-creatures`, `pets`, `ocean-life`, `fruits`, `vegetables`, `at-the-supermarket`, `vehicles`, `toys`, `clothing`, `accessories`, `camping`, `reptiles-and-amphibians`. Refused: `toys/girl`, `toys/baby` (people), `toys/cards`, `toys/blocks`, `toys/crayons`, `toys/dice` (sets); **`fruits/cherry` (drawn as an apple — use `at-the-supermarket/cherry`), `fruits/plum` and `fruits/peach` (read as apples), `fruits/mango` (reads as a peach), `fruits/persimmon` (reads as an orange/tomato to a five-year-old)**; `zoo-animals/koala` is refused because the gated count is 2 (*koal·a*) where the spoken word has 3 (*ko·a·la*) — a gate defect flagged to the pipeline owner, never shipped. Checked on contact sheets (critic, 2026-10-17): cheese (supermarket wedge), shrimp, kiwi (cut half — still a kiwi), banana, tomato, whale, goose, robot, potato, flashlight, octopus, alligator, watermelon (a slice), avocado, squirrel, zebra, tiger, gorilla, panda, armadillo, butterfly, dragonfly, umbrella, at-the-supermarket cherry and melon.

## 5. The hand
- **Press the pillow** (pointerdown): squash within 16 ms; a bead spawns and falls (260 ms ease-in), bounces, rolls to the next free dip (180 ms). Sound: one soft wooden "tok" (fixed pitch). The picture nods. Keyboard: Space/Enter on the pillow.
- **Press when every dip is full:** the bead lands on the last bead, wobbles, rolls into the tray (no message — the rail is simply full).
- **Tap a bead on the rail:** it hops (120 ms) and rolls into the tray; beads to its right roll left to close the gap. Keyboard: Backspace removes the last bead.
- **Tap the tray:** spare beads vanish with a pop.
- **Tap the picture:** TTS says the word where a voice exists, and the picture nods. Without TTS the picture still nods — the child says the word.
- **SHELF mode:** drag the top picture to a shelf (the whole card is the handle); release over a shelf → it snaps in (150 ms). Tap a placed thumbnail to return it. Keyboard: arrows choose a shelf, Enter drops.
- **Free play:** after success each pillow press lights the next syllable bead in turn, cycling, and the picture nods.

## 6. The rounds
**BEAT round** = one picture word; the child lays beads; Check. A **pass** = 9 words; order-only reshuffle every pass (never the same order twice), no count three times in a row, the first word is never a lure.

**Pool law (all locales):** words are vocab keys present in the gated `approved-words-<locale>.json` AND in a theme above. The **count** comes from the gated `count`. The **printed split** is shown only when `sources_agreed` includes `TeX` and every chunk contains a vowel; otherwise the word is **count-only**: it lands WHOLE over the beads with one dot under it per syllable (no boundary printed). da: `policy_managed:false` only. fr: no word ending in a mute *e* (ruling open, §20.9). sv: the school-split carve-out is already in the file (§A.13.57).

**EN, Short words (1–3), pass A** (checked against the gated file 2026-10-17; `*` = count-only: the gated count is used but the boundary is not TeX-agreed, so it is never printed)
| # | picture (theme/noun) | count | reveal | role |
|---|---|---|---|---|
| 1 | forest-creatures/squirrel | 2 | squir · rel | long 2 |
| 2 | at-the-supermarket/cheese | 1 | cheese | long lure |
| 3 | fruits/banana | 3 | banana* (3 dots) | short lure |
| 4 | zoo-animals/panda | 2 | pan · da | |
| 5 | ocean-life/shrimp | 1 | shrimp | long lure |
| 6 | forest-creatures/butterfly | 3 | but · ter · fly | |
| 7 | fruits/kiwi | 2 | kiwi* (2 dots) | short lure |
| 8 | animals/horse | 1 | horse | long lure |
| 9 | vegetables/tomato | 3 | tomato* (3 dots) | short lure |

Spearman(letters, count) = **0.36**.

**EN, Short words, pass B:** ocean-life/shrimp 1 · ocean-life/whale 1 (long lure) · farm-animals/goose 1 (long lure) · zoo-animals/tiger 2* (short) · zoo-animals/zebra 2* (short) · forest-creatures/squirrel 2 · vegetables/potato 3* (short lure) · fruits/banana 3* · zoo-animals/gorilla 3*. Spearman **0.50**. Passes alternate A, B, A, B with a fresh order each time.

**EN, Long words (1–4), pass C:** at-the-supermarket/cheese 1 · farm-animals/goose 1 · fruits/kiwi 2* · toys/robot 2* · forest-creatures/squirrel 2 · vegetables/tomato 3* · fruits/banana 3* · fruits/avocado 4* · zoo-animals/armadillo 4* — Spearman **0.58**. **Pass D:** ocean-life/shrimp 1 · forest-creatures/snail 1 · zoo-animals/panda 2 · zoo-animals/tiger 2* · camping/flashlight 2* · vegetables/potato 3* · ocean-life/octopus 3* · reptiles-and-amphibians/alligator 4* · fruits/watermelon 4* — Spearman **0.61**. (EN has no TeX-agreed four-syllable picture word, so every EN 4 is count-only; the two-syllable *flashlight* is the longest word in the pass — the strongest letter-count lure the library offers.)

**Per-locale count sets** (the language decides, not English):
| locale | Short | Long | why |
|---|---|---|---|
| en de fr nl sv da no | 1–3 | 1–4 | plenty of one-syllable picture nouns |
| es pt it fi | 2–3 | 2–4 | almost no one-syllable picture nouns (fi has one, *vyö*); a 1-shelf would always be empty |

Examples the build must reproduce from the gated files (verified 2026-10-17): **de Short** — Hund 1, Schwein 1 (long lure), Biene *Bie·ne* 2, Katze *Kat·ze* 2, Banane *Ba·na·ne* 3, Giraffe *Gi·raf·fe* 3, Fisch 1 (`ocean-life/fish`, not farm-animals), Puppe 2, Karotte 3. The gated file stores splits in lower case: the reveal takes its CASING from the `image-vocabulary.js` label (de nouns capitalised) and only its BOUNDARIES from the gated split. **fi Short** — kissa 2, koira 2, pallo 2, banaani 3, porkkana 3, kirahvi 3, kettu 2, sammakko 3, lehmä 2. **es Long** — perro 2, burro 2, jirafa 3, manzana 3, caballo 3, mariposa 4, bicicleta 4, pelota 3, armadillo 4.

**SHELF round** = 6 pictures to sort, ≥ 1 per shelf, ≤ 3 per shelf, ≥ 1 lure; 8 rounds per pass. Cherry and melon come from `at-the-supermarket`.
| # | EN pictures (count) |
|---|---|
| 1 | cat 1 · horse 1 · carrot 2 · panda 2 · butterfly 3 · umbrella 3 |
| 2 | dog 1 · dress 1 · tiger 2* · dolphin 2 · strawberry 3 · dragonfly 3 |
| 3 | frog 1 · scarf 1 · cherry 2 · donkey 2 · rabbit 2 · banana 3* |
| 4 | duck 1 · sheep 1 · goat 1 · balloon 2 · penguin 2 · butterfly 3 |
| 5 | pig 1 · skirt 1 · hamster 2 · airplane 2 · umbrella 3 · strawberry 3 |
| 6 | fox 1 · cheese 1 · melon 2 · panda 2 · dragonfly 3 · tomato 3* |
| 7 | bus 1 · shirt 1 · jeep 1 · carrot 2 · rabbit 2 · butterfly 3 |
| 8 | corn 1 · pear 1 · dolphin 2 · kiwi 2* · cherry 2 · umbrella 3 |
In Long, every round swaps in 1–2 four-syllable pictures and the 4-dent shelf appears.

**Answer position.** BEAT has no options; the answer is a count. Per pass each count appears ≥ 2 times, never three equal in a row, and **length must not predict count**: the gate asserts Spearman(letters, syllables) ≤ 0.65 in every authored and every generated pass and ≥ 3 lures. (The four EN passes above measure 0.36 / 0.50 / 0.58 / 0.61; the critic measured the first draft's passes at 0.91 / 0.92 / 0.96 / 0.80 — letter-counting would have worked.) SHELF: the pile is shuffled; across a pass the right shelf for the top card is spread over all shelves (each 2–3 times).

## 7. Check, the misses, the success
- **Check with no beads** → no miss; the pillow pulses twice. Hint: "Say the word, and squash the pillow on each beat."
- **Miss 1** (wrong count): the word drops and cracks. *Too many beads:* pieces sit on beads from the left; the empty beads go dark and roll off the right end into the tray one after another. *Too few:* the pieces with no bead hang over the empty dips, swinging, outlined amber. After 1.6 s the word lifts back into the caption slot and **stays visible** from now on. Hint: "Listen again: say {word} slowly and squash on each beat."
- **Miss 2:** the word lies along the rail already split with a dot between pieces, each piece over a dip; the child's beads are cleared; each press now drops a bead under the next piece ("beat with me"). Hint: "Squash once under each part of the word."
- Any new press after a miss clears the help on the rail (the caption stays).
- **Success:** every piece sits on a bead; the beads light left to right with rising tones, the picture nods once per syllable in time, one ripple. Bubble: "{split} — {n} beats!" e.g. "but·ter·fly — 3 beats!" (count-only: "watermelon — 4 beats!").
- **SHELF Check:** each shelf lays its words along its dents. A word that fits glows; too long → a piece hangs off the end and the card slides back to the pile; too short → an empty dent glows amber and the card slides back. Miss 2 (SHELF): the top card of the pile shows its word with beat dots under it. Success: shelves ripple top to bottom; "Every word is on its shelf!"

## 8. Settings
1. **Mode:** Beat it / Sort to shelves — the board changes completely.
2. **Words:** Short words / Long words — the rail gains a dip and SHELF gains the 4-dent shelf (per-locale count sets in §6).

## 9. Words (EN source)
- title "The Bead Rail" · instruction (BEAT) "Say the word. Squash the pillow once for each beat." · instruction (SHELF) "Say each word. Put it on the shelf with one dent for each beat."
- hints: empty "Say the word, and squash the pillow on each beat." · miss1 "Listen again: say {word} slowly and squash on each beat." · miss2 "Squash once under each part of the word." · shelfMiss1 "Look at the shelf — the word must fill every dent." · shelfMiss2 "Say the top word and count its beats."
- celebration "{split} — {n} beats!" · shelfDone "Every word is on its shelf!"
- aria: pillow "Beat pillow — press once for each beat" · bead "Bead {i} — tap to remove" · tray "Spare beads — tap to empty" · shelf "Shelf with {n} dents" · picture "{word} — tap to hear it".
- settings "Mode": "Beat it" / "Sort to shelves"; "Words": "Short words" / "Long words".
- **Locale traps.** Use each school's syllable word: de *Silbe*, fr *syllabe*, es/pt *sílaba*, it *sillaba*, nl the term the shipped nl E9 deck uses (*klankgroep*) — the reviewer confirms; sv/da/no *stavelse*, fi *tavu*. "Beat" may be kept as the friendly word (de *Klatscher*-free: "für jede Silbe"). The pillow verb must not become "hit" (de *drücke*, fr *appuie*, es *aprieta*, fi *paina*). The split mark is a **middle dot** everywhere — never a hyphen, which reads as a real hyphen in de/nl/fi compounds. Counts are numerals, so no number-word agreement. es/pt/it/fi never mention a one-beat shelf. fr: mute-e words excluded until ruled. es = es-MX vocabulary straight from the vocab file.

## 10. Sound off, access, phones
- Legible with the sound off: the child says the word; the reveal is written; every mismatch is a place on the rail. TTS is a bonus.
- Keyboard: Tab → picture (speak) → pillow (Space/Enter) → Backspace removes → Check. SHELF: arrows + Enter.
- Taps ≥ 44 px (pillow 84–112 px; beads 36–40 inside 48 px hit areas; shelves ≥ 54). Pictures 150 at 704, 110 at 360 (pile 88).
- Check above the fold at 360 × 740 and 320 × 640 (§4). Phone: pillow under the rail; bubble under Check.

## 11. Distinct from
- **syllable-splitter tool** (tap a drum per clap, draw arcs, rebuild): no drum (a soft pillow), no arcs, and the tool never grades — here *the written word comes down and grades the beads*.
- **E8/E9 Syllable Builder** — blends given syllables; this is the reverse (split and count).
- **#9 Counting Necklace** — beads there are quantities threaded by the child; here a bead is a *beat* made by pressing, and the content is a word's structure.
- **sound-boxes tool** — one chip per SOUND; *cat* deliberately shows syllables are not sounds.

## 12. Build plan
- **Core** `SyllableDrumCore`: `newRound(entry)` → `{word, count, split|null, countOnly}`; `press(s)` (beads up to dips, then tray); `remove(s, i)`; `grade(s)` → `{ok, extraBeads, missingPieces}`; `shelfGrade(placements)` → per card `{fits, overhang, gap}`; `buildPass(pool, setting, rng)` → 9 entries obeying: each count ≥ 2, ≥ 3 lures (count 1 with ≥ 5 letters, or count ≥ 2 with ≤ 5 letters, or count 2 with ≥ 8 letters), no three equal counts in a row, Spearman(letters, count) ≤ 0.65.
- **Gate's own truth** (`verify-syllable-drum-core.js`) reads the approved-words files itself and asserts per locale: every pool word approved, colour theme, not refused; printed splits only for TeX-agreed entries with a vowel in every chunk; count-only entries never print a boundary; fr pool has no mute-e endings; da pool is `policy_managed:false`; count sets match §6; 1,000 generated passes per setting obey the pass rules; `grade()` is ok exactly when beads == count for every bead count 0..dips.
- **Mutations (one per rule, all killed):** print a non-TeX split · grade by letters · allow three equal counts in a row · drop the lure rule · a 1-shelf in fi · a mute-e fr word · a policy-managed da word · dips == max count · colour beads by count · caption visible before Check · SHELF graded by shelf position instead of dents.
- **Pictures to check** on each locale's pool contact sheet (the EN set was opened by the critic, §4); the refused list in §4 applies in every locale.
- **Risks:** EN has no TeX-agreed 4-syllable picture words → EN 4s are count-only (count gated, boundaries not printed). it *bue* (gate 1, spoken 2) falls outside the it count set — still flag it to the reviewer. EN *koala* (gate 2, spoken 3) is the same class of gate defect — refused and reported; the build runs a count sanity pass per locale (gated count vs. vowel-group count) and the reviewer hears every word where the two differ before it enters a pool. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a squashy pillow, a nodding picture, bouncing beads and a word that cracks open; children keep pressing after the round.
2. **Teacher on the board?** Yes — the "clap the word" routine made checkable; the lures make letter-counting fail in front of the class.
3. **Parent trust?** Library pictures, no words until the reveal, gated syllable data only, no scores.
4. **Invention:** the word comes down onto your beats and breaks into syllables — every piece needs a bead, every bead needs a piece.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **The passes let letter-counting win.** Measured Spearman(letters, syllables) on the draft's four EN passes: 0.91 / 0.92 / 0.96 / 0.80 — its own gate (< 0.6) would have failed all four. Rebuilt every EN pass from the gated file with real long-one-beat lures (cheese, shrimp, whale, goose), short-many-beat lures (kiwi, banana, tomato, potato) and the long two-beat *squirrel* / *flashlight*: now 0.36 / 0.50 / 0.58 / 0.61; gate set to ≤ 0.65 with ≥ 3 lures.
- **Wrong pictures removed:** fruits/cherry is drawn as an apple, fruits/melon does not exist in fruits, fruits/plum is a red apple, fruits/mango reads as a peach, fruits/persimmon as an orange — replaced (supermarket cherry/melon, tiger, banana, tomato, cheese, kiwi). Every EN pool word re-checked in `approved-words-en.json` (count, and TeX agreement → printed split vs count-only).
- *koala* found mis-counted by the gate (2 for 3 spoken beats) — refused and flagged; the build adds a per-locale count sanity pass.
- SHELF placed pictures were 64 px at 704 (below the 96 px floor) — SHELF now uses the full width with 108 px shelves and ≤ 3 pictures per shelf.
- de casing: boundaries from the gated split, casing from the vocab label (*Kat·ze*, not *kat·ze*).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
