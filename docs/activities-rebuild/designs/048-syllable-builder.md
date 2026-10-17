# Row 48 — The Stepping Stones: Stenarna i bäcken (RF.K.2.B, sv)

## 0. Identity
- id `syllable-builder.bygg-ordet-av-stavelser.rf-k-2-b` (KEPT) · grade K (sv: förskoleklass) · Common Core RF.K.2.B; the page names Lgr22 only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in sv only** (slug `bygg-ordet-av-stavelser`, page title "Bygg ordet av stavelser — Fonetik i förskoleklass" and intro frozen).
- own files: `mini tools/stepping-stones-core.js`, `stepping-stones-activity.js`, `stepping-stones-activity.html`; manifest row stays in `syllable-builder-activities.json`, `tool` → `stepping-stones-activity`, `params` → §6. 0 lines to shared engines or `lcs-shell.*`.
- worksheets it covers: none mapped.
- what the old activity did: tap scrambled syllable tiles into slots, 28 Swedish words. **Kept:** the gated Swedish splits including the förskoleklass sound-out carve-out (`klock·a`, `äng·el`, §A.13.57), 25 of the 28 words, the blend task (Level 2). **Fixed:** `sol` pointed at weather/sun, which the picture library refuses (not in weather.json) → now beach/sun (label "sol"). **Dropped:** `flicka` — toys/girl is a doll-like figure in the TOYS theme, so a child says "docka". Checked 2026-10-17: every remaining word is in `approved-words-sv.json` with the same split and its picture's sv label equals the word.
- **Gone:** tile tapping.

## 1. The pitch
"Lay one stepping stone for every syllable and the frog hops the word across the stream — and in the hidden-word level, lift a stone out and the frog lands on a brand-new word: solros without sol is a ros."

## 2. Why a child will want it again (the fun)
- **A frog that hops your word.** The library frog sits on the near bank. Press "Hoppa!" and it springs from stone to stone in a bouncy arc (380 ms per hop, a soft *plopp* on each landing); on every landing the stone wears its syllable. The word is literally walked across the water.
- **The stream answers.** A stone with two syllables on it is too heavy and sinks half under (the frog teeters); a stone with no syllable won't hold the frog at all and slides under with bubbles.
- **Hidden words (Level 3) feel like a magic trick.** The stones spell *flodhäst*; lift *flod* out and the frog hops "häst" — and the far bank shows a horse. *Tvättbjörn* without *tvätt* is a bear; *bokhylla* without *hylla* is a book. Children gasp at it.
- **The earned show:** the frog reaches the far bank, the target picture gives a little bounce, and a drawn water-lily pad with the word written on it floats downstream to the **pond** at the bottom-right corner, where every lily of the pass collects (words on drawn lilies — never a shrunken picture).
- **Free play:** between rounds the child may tap the water (rings spread) and tap the frog (it hops on the spot).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** count the syllables of a spoken word (Level 1), blend syllables in order (Level 2), and segment a word into its syllables well enough to remove one and say what is left (Level 3 — the syllable-deletion game of Nordic preschool phonological-awareness programmes; it is segmentation in use).
- **Misconception 1 — "long word, many syllables"** or one stone per sound. Pushback: the stream is the same width every round and the stones always spread evenly across it, so their number is the child's choice alone; the extra stone sinks, the overloaded stone sinks half under.
- **Misconception 2 — order does not matter** (Level 2). Pushback: the frog reads the stones in the order it lands; the first wrong stone tips it back.
- **Misconception 3 — a word is one lump that cannot be taken apart** (Level 3). Pushback: lifting a stone out changes what the frog says — and the far bank shows what word that is.
- **Misconception 4 — "take away the first one" always** (Level 3). Pushback: the target sometimes needs the last stone(s) lifted (*hus·bil* → *hus*), sometimes two stones (*flad·der·mus* → *mus*).

## 4. The stage
`layout:'split'` at ≥ 700 px: the stream stage left (480), bubble column right (200).

**At 704 px:**
- **The stream** — a horizontal band 480 × 150 px across the stage at mid-height, water `#BFE3EE` with 3 slow ripple lines (geometry, 6 s loop), banks above and below as soft green strips `#CFE8B8` with a 3 px ink edge. Width constant every round.
- **Near bank** (left end): a grassy ledge 70 × 150; **the frog** (camping/frog, library) **96 px**.
- **Far bank** (right end): a ledge 90 × 150 holding the **target picture** in a round frame **104 px**. In Levels 1–2 the target is the round's word picture; in Level 3 it is the hidden word.
- **The round picture (Levels 1–2) / the compound picture (Level 3)** — in the right column on a wooden signpost: **160 px**, tap = word (TTS bonus). (In Levels 1–2 the far-bank frame and the signpost show the same picture; in Level 3 they differ — the sign shows *solros*, the far bank shows *ros*.)
- **Stones** — flat grey ovals 96 × 58 px (`#9AA3A8`→`#7C858A`, ink outline 3 px, a highlight), spaced evenly across the stream between the banks (centre-to-centre = stream length ÷ (n + 1)). Syllables appear on stones in Nunito ExtraBold 26 px, ink on a pale chalk band.
- **The stone pile** — on the lower bank: L1 a heap of blank stones (always 6); L2 the syllable stones shuffled (+ decoy by setting); L3 none (stones arrive laid).
- **The pond** — bottom-right corner 90 × 60; drawn lily pads (26 px green discs, 3 px ink) with the word in 11 px collect there.
- **Task line** above; **bubble** right column; **Check** = the shell button (its hint text calls it "Hoppa!").

**At 360 px** (stacked): task line · signpost picture **96 px** · stream 336 × 120 (frog 64 px, far-bank frame **80 px**, stones 70 × 44, syllables 20 px) · stone pile 336 × 70 · bubble · Check. Check bottom ≤ 690 at 360 × 740; at 320 × 640 the pond hides and stones are 62 × 40 → Check ≤ 612.

**Library pictures** (each checked in the theme JSON with the sv label equal to the word): camping/frog (the hopper) · Level 1: camping/bear, animals/dog, fruits/apple, vehicles/bicycle, animals/zebra, breakfast/pancake, spring/birdhouse, animals/turtle, vehicles/helicopter, vehicles/motorcycle · Level 2: christmas/bell, christmas/angel, clothing/shirt, fruits/banana, animals/panda, animals/tiger, clothing/dress, spring/flower, easter/chocolate, weather/umbrella · Level 3: flowers/sunflower → flowers/rose; beach/starfish → christmas/star; camping/camper → miscellaneous/house; around the house/toothbrush → body parts/tooth; animals/hippopotamus → animals/horse; animals/bat → forest creatures/mouse; furniture/bookcase → classroom/book; fruits/watermelon → At the Supermarket/melon; animals/raccoon → camping/bear; pets/goldfish → animals/fish. Contact sheets seen: animals, farm animals, christmas, easter, beach, weather, toys, breakfast.

## 5. The hand
- **Lay a stone (L1):** tap the stream (or the pile) → a blank stone flies from the pile and plops into the stream (220 ms arc, ripple rings); all laid stones re-space evenly (180 ms slide). Tap a laid stone → it hops back to the pile and the rest re-space. 1–6 stones. Keyboard: + / −.
- **Place a syllable stone (L2):** drag a stone from the pile into the stream; it drops at the nearest gap in the row (between two stones, or at either end) and the row re-spaces. Drag a stone back to the pile to remove it; drag within the row to move it. Keyboard: Tab through pile stones, Enter places at the end of the row, Backspace returns the last.
- **Lift a stone (L3):** drag a stone up out of the water (or tap it) → it rises dripping (water drops, 240 ms) and sits on the bank; the remaining stones re-space. Tap a lifted stone → it goes back in its old place.
- **Hoppa! = Check.** The frog hops the stones one by one; each landing reveals/lights the stone's syllable (L1 writes it, L2/L3 light it).
- **Tap a stone with a syllable** → it is spoken (TTS bonus); **tap the frog** → a hop on the spot (free play, no effect).

## 6. The rounds
Order-only reshuffle per pass; never the same order twice in a row.

**Level 1 — En sten för varje stavelse (count), 10 rounds.** The stream starts empty every round.

| # | picture | word | syllables | count |
|---|---|---|---|---|
| 1 | camping/bear | björn | björn | 1 |
| 2 | fruits/apple | äpple | äpp·le | 2 |
| 3 | breakfast/pancake | pannkaka | pann·ka·ka | 3 |
| 4 | animals/dog | hund | hund | 1 |
| 5 | vehicles/bicycle | cykel | cy·kel | 2 |
| 6 | spring/birdhouse | fågelholk | få·gel·holk | 3 |
| 7 | vehicles/helicopter | helikopter | he·li·kop·ter | 4 |
| 8 | animals/zebra | sebra | se·bra | 2 |
| 9 | animals/turtle | sköldpadda | sköld·pad·da | 3 |
| 10 | vehicles/motorcycle | motorcykel | mo·tor·cy·kel | 4 |

Counts: 1 ×2, 2 ×3, 3 ×3, 4 ×2.

**Level 2 — Bygg ordet (blend in order), 10 rounds.** Pile holds the word's syllable stones, shuffled (never in word order); setting *Lursten* adds one decoy.

| # | picture | word | stones | decoy |
|---|---|---|---|---|
| 1 | christmas/bell | klocka | klock · a | nan |
| 2 | christmas/angel | ängel | äng · el | da |
| 3 | clothing/shirt | skjorta | skjor · ta | ger |
| 4 | fruits/banana | banan | ba · nan | el |
| 5 | animals/panda | panda | pan · da | ning |
| 6 | animals/tiger | tiger | ti · ger | klad |
| 7 | clothing/dress | klänning | klän · ning | ma |
| 8 | spring/flower | blomma | blom · ma | ply |
| 9 | easter/chocolate | choklad | cho · klad | ta |
| 10 | weather/umbrella | paraply | pa · ra · ply | ti |

**Level 3 — Gömda ord (hidden words), 10 rounds.** Stones laid as the compound (sign shows the compound picture); far bank shows the target; lift the right stone(s).

| # | sign (compound) | stones | far bank (target) | lift | if the OTHER part is lifted, the far bank shows |
|---|---|---|---|---|---|
| 1 | flowers/sunflower | sol · ros | flowers/rose — ros | sol | sol (beach/sun) |
| 2 | beach/starfish | sjö · stjär · na | christmas/star — stjärna | sjö | sjö (camping/lake) |
| 3 | camping/camper | hus · bil | miscellaneous/house — hus | bil | bil (vehicles/car) |
| 4 | around the house/toothbrush | tand · bors · te | body parts/tooth — tand | bors · te | borste (word only — around the house/brush is a PAINTBRUSH, a *pensel*, so it is never shown) |
| 5 | animals/hippopotamus | flod · häst | animals/horse — häst | flod | flod (camping/river) |
| 6 | animals/bat | flad · der · mus | forest creatures/mouse — mus | flad · der | (no word — the frame stays empty) |
| 7 | furniture/bookcase | bok · hyl · la | classroom/book — bok | hyl · la | hylla (furniture/shelf) |
| 8 | fruits/watermelon | vat · ten · me · lon | At the Supermarket/melon — melon | vat · ten | vatten (word only — the water picture is a bottle, not shown) |
| 9 | animals/raccoon | tvätt · björn | camping/bear — björn | tvätt | tvätt (word only — no laundry picture) |
| 10 | pets/goldfish | guld · fisk | animals/fish — fisk | guld | guld (word only — no gold picture) |

Lift position: the first part ×7, the last part ×3 (rows 3, 4, 7); two stones ×4 (rows 4, 6, 7, 8) — so "always lift the first stone" solves 5/10 and "always lift one stone" 6/10; neither passes the level.

**Answer position.** L1: stones spread evenly, so the stream never tells the count. L2: pile order fresh per render, never word order; gate: "place pile left to right" ≤ 0.25, "first pile stone is the first syllable" ≤ 0.35. L3: lift targets as above; bots "lift the first stone" and "lift one stone" each ≤ 0.6 and never pass the pass-level check (≥ 8/10).

## 7. Check, the misses, the success
- **Check with nothing done:** L1 "Lägg en sten för varje stavelse du hör." ("Lay a stone for every syllable you hear.") · L2 "Lägg stenarna i ordning över bäcken." ("Lay the stones in order across the stream.") · L3 "Lyft bort en sten så att grodan kommer till {target}." ("Lift a stone out so the frog gets to the {target}.") — no miss.
- **L1 miss 1** — the frog hops; syllables appear on the stones in order:
  - too few: the last stone receives two (or more) syllables and sinks half under; the frog teeters on it and stops; a ghost stone outline floats beside it. "Två stavelser på en sten — den sjunker! Lägg en sten till." ("Two syllables on one stone — it sinks! Lay one more stone.")
  - too many: when the word has run out, the next blank stone wobbles and slips under with bubbles before the frog lands; the frog hops back to the last written stone. "Den stenen har ingen stavelse." ("That stone has no syllable.")
  - the blank/sunk stones bob back up after 900 ms so the child can fix the count.
- **L1 miss 2** — the frog does a slow demonstration: the word appears over the stream and the frog bobs once per syllable (TTS says it in syllables); ghost stones appear in the right number. "Se grodan nicka: en sten för varje nick." ("Watch the frog nod: one stone for each nod.")
- **L2 miss 1** — the frog hops while the stones are right; at the first wrong stone, that stone tips sideways and the frog hops back onto the previous stone; the tipped stone floats back to the pile; stones before it glow (they are right and stay). A decoy tips the same way. "Grodan kom till {lastRight}. Vad kommer sen?" ("The frog got to {lastRight}. What comes next?"; nothing right yet: "Vilken stavelse kommer först?" — "Which syllable comes first?") · decoy: "Den stenen hör inte till ordet." ("That stone is not part of the word.")
- **L2 miss 2** — the next right stone in the pile glows; TTS says the word in syllables, pausing before it. "Den lysande stenen är nästa." ("The glowing stone is next.")
- **L3 miss 1** — the frog hops the remaining stones; the far bank's frame shows what that makes for 1.4 s — the picture where the table names one (the sun, the lake, the car, the river, the shelf), the written word on a cream card where it is a word with no picture (*borste*, *vatten*, *tvätt*, *guld*), or the leftover syllables with a dashed outline where it is no word at all (`flad·der`); then the target returns and the lifted stone(s) splash back into place. "Det blev {made}! Vi ville till {target}." ("That made {made}! We wanted the {target}.") / no word: "Det blev inget ord. Vilken sten ska bort?" ("That made no word. Which stone has to go?")
- **L3 miss 2** — the target's syllables light up on their stones (the stones to keep glow); TTS says "{compound} … utan {lift}". "Behåll stenarna som lyser." ("Keep the glowing stones.")
- **A new move takes the help away** until the next Check.
- **Success:** the frog lands on the far bank, the picture bounces, the stones' syllables slide together over the water into the whole word (L1/L2) or the hidden word (L3), and a lily pad with the word drifts to the pond. Bubble: L1 "{word}: {n} stavelser — {s1} · {s2} …" (n = 1: "{word}: en stavelse!") · L2 "{s1} + {s2} … = {word}!" · L3 "{compound} utan {lift} blir {target}!" ("{compound} without {lift} is {target}!"). End of pass: the lily pads in the pond turn slowly in a circle.

## 8. Settings
1. **Lursten** (Level 2): Av / På — one decoy stone in the pile. Visible at rest.
2. **Stavelserna** (Level 1): Visas när grodan hoppar (default) / Syns från början — for early readers the word is written faintly over the stream from the start (the count still has to be laid). Visible at rest.

## 9. Words (EN source; build authors sv; one native sv + pedagogy reviewer)
- Title frozen. Instrument name in aria: "Stenarna i bäcken".
- Instruction: EN "Lay a stone for every syllable and the frog hops the word across. In Hidden words, lift a stone out and see what word is left." → sv draft "Lägg en sten för varje stavelse, så hoppar grodan över ordet. I Gömda ord lyfter du bort en sten och ser vilket ord som blir kvar."
- Task lines: L1 "En sten för varje stavelse." · L2 "Bygg ordet över bäcken." ("Build the word across the stream.") · L3 "Vilken sten ska bort?" ("Which stone has to go?")
- Hints and celebrations: §7. Settings: "Lursten" / "Av" / "På" · "Stavelserna" / "Visas när grodan hoppar" / "Syns från början". Levels: "Räkna stavelser" / "Bygg ordet" / "Gömda ord".
- aria: "Bäck med {n} stenar" · "Sten {i}: {stavelse|tom}" · "Grodan står på sten {i}" · "Andra stranden: {ord}" · "Stenhög med {n} stenar".

**Locale traps (sv):**
- **Förskoleklass sound-out splits** (§A.13.57 carve-out) are kept exactly as gated: `klock·a`, `äng·el`, `äpp·le` — the reviewer must not "correct" them to typographic hyphenation; the gate asserts the gated split.
- **Compound seams in Level 3** come only from the gated compounds whose parts are themselves gated words with their own pictures (`sol·ros` → `ros`); no hand-made splits. Leftovers like `flad·der` are shown as syllables, never named as a word.
- **"grodan" (definite)** in prose: Swedish double definiteness never appears on the apparatus (no articles on stones); prose uses "grodan", "stenen", "bäcken" — reviewer check.
- **Never «grupp»** in copy (it is the counting word in sv maths decks); the instrument has no use for it.
- **å ä ö** in syllables (`få·gel·holk`, `äng·el`, `björn`, `klän·ning`) — the stone font carries them at 20–26 px.
- **Lowercase**; no capitalised nouns. `\b` must not be used in any sv string check (ASCII-only).

## 10. Sound off, access, phones
- **Sound off:** Level 1 needs no reading; the overloaded half-sunk stone, the blank stone slipping under and the nodding frog are visual. Level 3 is read through pictures (the far bank shows what was made). TTS is a bonus.
- **Keyboard:** §5; aria-live "Grodan hoppade till {stavelse}", "Stenen sjönk", "Andra stranden visar {ord}".
- **Taps:** stones ≥ 62 × 44 hit area; the whole stream is a tap target in L1; pile stones ≥ 62 × 44.
- **Pictures:** signpost 160 / 96 px; far-bank frame 104 / 80 px; frog 96 / 64 px.
- **Reduced motion:** hops become fades between stones (still in order, one per 300 ms).
- **Phone:** stacked; the pond hides at 320.

## 11. Distinct from
- **Rows 44–47, 49, 50:** chop, roll, pull, thread, hook, topple — this is the only one with syllable DELETION (hidden words) and the only one where a library animal walks the word.
- **#21 The Creek Map (built)** — a boat chooses forks by comparing numbers; here stones are laid and lifted to spell words; no forks, no numbers.
- **New #205 The Hopscotch Court** — a hopper on numbered squares that must turn; here stones carry syllables and the stream re-spaces them.
- **New #215 The Bead Rail / premium syllable-splitter** — beat taps, beads, arcs; none here.

## 12. Build plan
- **Data:** `params.levels.{count:[{noun,themeDir,word,split}], build:[{…,decoy}], hidden:[{compound:{noun,themeDir,word,split}, target:{noun,themeDir,word}, lift:[indices], others:[{lift:[…], made, picture|null}]}]}`; every split copied from `approved-words-sv.json`; every hidden target must be a gated word equal to the concatenation of the kept syllables.
- **Core state** `{level, round, stones:[{syl|null}], pile:[…], lifted:[i…], frogAt, misses}`; functions `lay()`, `unlay(i)`, `place(id, gap)`, `lift(i)`, `unlift(i)`, `hop()` → `{landings:[{i, syl:[…], sinks:'half'|'full'|null}], verdict, made, madePicture}`.
- **Gate's own ground truth** (`verify-stepping-stones-core.js`): typed splits of all 30 words; L1 right iff stones = count (1…6), short = leftovers on the last stone, long = blank stones sink; stone spacing depends only on n (never on the word); L2: every arrangement up to N+1 stones — frog stops at the first wrong stone, prefix glows, decoy tips, right only for the word; L3: for every subset of liftable stones, `made` = concatenation of the kept syllables; right iff made = target; `madePicture` set only where the table says; target ≠ compound; bots as §6.
- **Mutations:** around the house/brush shown as *borste* · a made word with no picture shown as empty instead of written · spacing tied to the word's count (a tell) · short case spreads syllables · blank stones hold the frog · L2 accepts any order · decoy accepted · L3 accepts lifting any stone · L3 "made" computed from the target instead of the kept stones · `flicka` back on toys/girl · `sol` back on weather/sun · a carve-out split replaced by typographic hyphenation (`klo·cka`) · reshuffle repeats an order · miss 2 shows every remaining stone instead of the next.
- **Pictures to verify on a contact sheet at build:** camping/frog, camping/camper, camping/lake, camping/river, flowers/rose, flowers/sunflower, christmas/star (seen), body parts/tooth, animals/hippopotamus (seen), forest creatures/mouse, classroom/book, furniture/bookcase, furniture/shelf, At the Supermarket/melon, animals/raccoon (seen), pets/goldfish, spring/birdhouse, spring/flower, breakfast/pancake (seen).
- **Risks:** camping/frog (seen 2026-10-17) is a front-facing frog, so it has no direction to fix; it reads as a frog at 64 px. The hop arc carries the direction.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a frog hopping your word over the water is a game, and hidden words (solros → ros) are a genuine surprise every round.
2. **Would a teacher put it on the board?** Yes — it is the syllable-deletion game Swedish förskoleklass teachers already play, made visible: the stone you lift, the word that is left, and the far bank that names it.
3. **Would a parent trust it?** Yes — library pictures, gated school splits, a calm stream, no score.
4. **The invention:** stepping stones that each hold one syllable — the frog hops the word across, and lifting a stone out turns it into a different word.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-verified by script: all 30 words (incl. every hidden-word target and every "other part" word) are in `approved-words-sv.json` with the shown split and equal their pictures' sv labels; the sound-out carve-out splits (`klock·a`, `äng·el`, `äpp·le`) stay.
- **Picture fault found on the contact sheet:** around the house/brush is a paintbrush (*pensel*), so Level 3's "lift *tand*, get *borste*" would show the wrong thing. Now word-only; added to PICTURE-RULINGS.
- Level 3 table corrected: *tvätt* and *guld* ARE Swedish words (it said "no word"); the far bank now shows three honest outcomes — picture, written word on a card, or leftover syllables in a dashed frame.
- Lily pads in the pond carry the word on a drawn pad, not a 26-px picture (record ruling).
- Kept: the frog and stones, the even spacing (the stream never tells the count), the Swedish compound-deletion game (*solros* utan *sol* blir *ros*) with its measured lift-position bots.

