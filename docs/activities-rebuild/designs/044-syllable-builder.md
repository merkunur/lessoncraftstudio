# Row 44 — The Clay Snake: hakken en plakken (RF.K.2.B, nl)

## 0. Identity
- id `syllable-builder.bouw-het-woord-met-klankgroepen.rf-k-2-b` (KEPT) · grade K (nl: groep 2, kleuters) · Common Core RF.K.2.B (count, pronounce, blend and segment syllables in spoken words); the page cites the SLO kerndoelen by name only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in nl only** (slug `bouw-het-woord-met-klankgroepen` and the nl page title "Bouw het woord met klankgroepen — Fonetiek in de kleuterklas" are frozen; no other locale routes).
- own files: `mini tools/clay-snake-core.js`, `clay-snake-activity.js`, `clay-snake-activity.html`. The manifest row stays in `syllable-builder-activities.json` (id, slug, page_title, page_intro, alignment unchanged); `tool` is repointed to `clay-snake-activity`, `params` replaced by the three level tables in §6. 0 lines to `word-builder-core.js`, `syllable-builder-activity.js` (still used by the other rows until each is rebuilt) or `lcs-shell.*`.
- worksheets it covers: none mapped (the EN row 45 carries the worksheet coverage).
- what the old activity did: a picture and a row of empty slots; tap the scrambled klankgroep tiles into the slots in order. **Kept:** the 28-word nl pool and its gated splits (every word re-checked against `approved-words-nl.json` on 2026-10-17: 28/28 approved, same split), the RF.K.2.B blend task (now Level 2), the picture-as-prompt. **Dropped from the pool** after reading the pictures: `meisje` (toys/girl is a doll-like figure in the TOYS theme — a kleuter says "pop"), `schoorsteen` (christmas/chimney draws a whole hearth — "open haard"), `tapijt` (around the house/carpet is a rug — "kleed"/"mat"): each has two right names, so the child cannot know which word to chop. **Gone:** tap-the-tile-into-the-slot.

## 1. The pitch
"Hakken en plakken with real clay: chop the clay snake once for every klankgroep you hear — then press the pieces back together, and only the pieces that really sit next to each other in the word will stick."

## 2. Why a child will want it again (the fun)
- **Clay is the toy.** A fat, soft, terracotta-coloured snake lies on a wooden board. The clay knife follows the finger above it; a tap chops with a soft *tsjk* and the two halves slide 8 px apart with a little squash-and-stretch wobble. Dragging one piece against its neighbour kneads them back into one (a squelch, the seam smooths out in 240 ms). Children chop and knead for the pleasure of it.
- **The stamp roller.** On Check a wooden roller trundles along the snake from left to right and prints the klankgroepen onto the pieces in fat lowercase letters — the child watches the word appear on *their* pieces.
- **Plakken that pushes back.** In Level 2 the child presses klankgroep pieces together: true neighbours melt into each other (the crack closes, the letters slide up to word spacing); a wrong neighbour leaves a crack and pops 12 px away. The clay itself says which joint is wrong.
- **The earned show:** a finished snake curls itself into a spiral — a slakkenhuis — with the whole word around its coil, and rolls onto the shelf above the board. Across a pass the shelf fills with coils of every size (a long `wa-ter-me-loen` makes a fat coil, `bij` a tiny bun).
- **Free play:** between rounds the leftover clay ball in the tub can be pinched (it squashes and springs), and any coil on the shelf can be tapped to unroll and re-roll.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** segment a spoken word into its klankgroepen and count them (Level 1, oral — no letters needed); blend klankgroepen into the word in the right order (Level 2); find where a written word breaks into klankgroepen (Level 3, early readers).
- **Misconception 1 — "a long word has many parts / a short word has one"** (counting by length or by letters). Pushback: the snake is **the same length for every word**, so its length tells nothing; only the child's own chops count, and the stamp shows the truth: a piece with two klankgroepen, or a blank piece that has none.
- **Misconception 2 — "every sound is a part"** (chopping z-o-n…). Pushback: too many pieces → the extra pieces get no klankgroep, stay blank and crumble back into the tub.
- **Misconception 3 — "the parts can go in any order"** (Level 2). Pushback: only true neighbours stick; a wrong joint stays cracked and springs apart, so the child sees *which* joint is wrong.
- **Misconception 4 — "you can split a word anywhere"** (Level 3, `zo|nnebloem`). Pushback: a cut that is not at a klankgroep seam heals — the clay closes over it.

## 4. The stage
`layout:'split'` at ≥ 700 px: the board column left, the picture-and-bubble column right (200 px).

**At 704 px** (stage 480 × 440 + right column 200):
- **The board** — a wooden plank, 470 × 150 px, rounded 18 px, warm wood gradient `#E9C99A`→`#D9B27C`, 3 px ink outline `#5B4636`; grain = 5 faint horizontal strokes (geometry).
- **The snake** — a rounded bar 440 × 64 px (radius 32), terracotta `#D9805F` with a top highlight and a 3 px darker underside, centred on the board. Fixed length for every word. At the left end a small round head-bump, at the right a tapered tail (both plain geometry, no face).
- **The knife** — a 12 × 76 px rounded blade (grey `#B9C1C7`, ink outline) with a round wooden handle cap; hovers over the snake at the pointer's x (mouse) or appears at the tapped x (touch) for 300 ms.
- **Klankgroep letters on clay** — Nunito ExtraBold 32 px, ink `#3B2A20`, lowercase.
- **The clay tub** (Levels 2/3) — a tray 470 × 120 under the board where shuffled pieces lie scattered (random positions on a 4 × 2 cell grid, rotated ±6°). Each piece = a clay lump 96–150 × 56 px sized to its letters.
- **The shelf** — a thin plank 470 × 44 above the board where finished coils sit (36 px coils in a row; overflow scrolls).
- **Right column** — the library picture on a wooden easel (picture **160 px**, easel frame 180 × 190, tap = hear the word), the feedback bubble under it (200 × ≤ 120), Check under the bubble (shell button).
- **Task line** above the stage (≤ 24 px, ≤ 2 lines).

**At 360 px** (stacked): task line · picture 96 px on a small easel (centred) · shelf 320 × 34 · board 336 × 112 with snake 320 × 52 (letters 22 px) · tub 336 × 116 (pieces 72–108 × 46) · bubble · Check. Check bottom ≤ 692 at 360 × 740; at 320 × 640 the shelf hides (coils show only in the end-of-pass show) and the picture is 80 px → Check bottom ≤ 612.

**Library pictures** (all checked in the theme JSON with the nl label equal to the target word; seen on contact sheets: animals, farm animals, christmas, breakfast, toys, weather, beach): animals/cat, zebra, panda, tiger, rabbit, dolphin, bat · farm animals/bee · weather/rainbow, umbrella · flowers/sunflower · winter/snowman · beach/lighthouse, starfish · fruits/strawberry, watermelon · vehicles/bicycle, helicopter, tractor · Things That Fly/airplane · easter/butterfly · accessories/glove · breakfast/pancake, biscuit · camping/binoculars · furniture/bookcase · christmas/angel · toys/balloon. **No words on the apparatus** except the klankgroepen and words that are the content.

## 5. The hand
- **Chop (Levels 1, 3):** tap anywhere on the snake → the knife drops (90 ms), the snake splits at that x and both parts slide 4 px apart each (squash 0.94/1.06 → 1, 220 ms), sound: a short soft *tsjk* (filtered noise, 70 ms). A cut closer than 36 px to another cut or an end is refused: the knife bounces off with a rubbery *boing* and nothing splits (stops accidental double taps). Max 6 pieces. A vertical swipe across the snake does the same as a tap (cut at the swipe's x).
- **Knead back (undo a chop):** drag a piece onto its neighbour (or tap the gap between two pieces) → they squeeze together and the seam smooths away (240 ms, *squelch*). Unlimited.
- **Plakken (Level 2):** drag a lump from the tub onto the board. The board has a start mark at its left end (a small round dent). Lumps dropped on the board snap into a row from the start mark in the order dropped, each touching the previous with a visible crack line between them. Drag a lump back to the tub to remove it; drag it between two lumps to insert it (the others shuffle aside, 180 ms).
- **Tap a piece or lump** — it wobbles (and reads its klankgroep aloud if TTS works and the klankgroep is printed on it; blank Level 1 pieces just wobble).
- **Picture tap** → the word is spoken (TTS bonus); the picture bounces 4 px.
- **Keyboard:** Level 1/3: ← → move the knife along the snake in 12 px steps, Enter chops, Backspace kneads the nearest cut back. Level 2: Tab cycles tub lumps, Enter places the lump at the end of the row, Backspace returns the last lump.
- Every move is reversible until Check; after a right Check the round is closed.

## 6. The rounds
One round = one picture word. Level is chosen with the shell's level picker. Order-only reshuffle per pass (never the same order twice in a row; a level's rounds always stay inside that level).

**Level 1 — Hakken (count the klankgroepen by chopping), 10 rounds.** Snake blank, length 440 px for every word.

| # | picture (theme/noun) | word | klankgroepen | count |
|---|---|---|---|---|
| 1 | animals/cat | kat | kat | 1 |
| 2 | animals/zebra | zebra | ze·bra | 2 |
| 3 | weather/rainbow | regenboog | re·gen·boog | 3 |
| 4 | vehicles/bicycle | fiets | fiets | 1 |
| 5 | easter/butterfly | vlinder | vlin·der | 2 |
| 6 | flowers/sunflower | zonnebloem | zon·ne·bloem | 3 |
| 7 | vehicles/helicopter | helikopter | he·li·kop·ter | 4 |
| 8 | winter/snowman | sneeuwpop | sneeuw·pop | 2 |
| 9 | beach/lighthouse | vuurtoren | vuur·to·ren | 3 |
| 10 | camping/binoculars | verrekijker | ver·re·kij·ker | 4 |

Counts per pass: 1 ×2, 2 ×3, 3 ×3, 4 ×2 — "always make 2 pieces" solves 3/10, "always 3" 3/10.

**Name check (sound off, the child names the picture in their head):** every L1 picture's likely kleuter alternative has the SAME count, so a child who thinks *poes* for the cat still chops right — kat/poes 1 · fiets 1 · zebra 2 · vlinder 2 · sneeuwpop/sneeuwman 2 · regenboog 3 · zonnebloem 3 · vuurtoren 3 · helikopter 4 · verrekijker 4 (no common alternative). L2/L3 print the klankgroepen, so the word is given there (konijn, not *haas*).

**Level 2 — Plakken (press the pieces together in order), 10 rounds.** Tub holds the word's klankgroep lumps, shuffled; setting *Extra stukje* adds one decoy lump.

| # | picture | word | lumps (in the tub, shuffled) | decoy (setting on) |
|---|---|---|---|---|
| 1 | animals/panda | panda | pan · da | ster |
| 2 | animals/rabbit | konijn | ko · nijn | pan |
| 3 | beach/starfish | zeester | zee · ster | da |
| 4 | fruits/strawberry | aardbei | aard · bei | koek |
| 5 | furniture/bookcase | boekenkast | boe · ken · kast | muis |
| 6 | breakfast/pancake | pannenkoek | pan · nen · koek | bei |
| 7 | weather/umbrella | paraplu | pa · ra · plu | ken |
| 8 | fruits/watermelon | watermeloen | wa · ter · me · loen | plu |
| 9 | animals/bat | vleermuis | vleer · muis | zee |
| 10 | animals/dolphin | dolfijn | dol · fijn | ra |

Decoys are klankgroepen of OTHER pool words, chosen so that no decoy + lumps make a different real word with a library picture (gate-checked).

**Level 3 — Hakken met letters (chop the written word at its seams), 8 rounds.** The whole word is printed along the snake (letters spaced evenly, 32 px); cuts snap to the nearest letter gap.

| # | picture | word | seams (after letter n) |
|---|---|---|---|
| 1 | Things That Fly/airplane | vliegtuig | vlieg·tuig (5) |
| 2 | animals/tiger | tijger | tij·ger (3) |
| 3 | toys/balloon | ballon | bal·lon (3) |
| 4 | christmas/angel | engel | en·gel (2) |
| 5 | accessories/glove | handschoen | hand·schoen (4) |
| 6 | breakfast/biscuit | koekje | koek·je (4) |
| 7 | vehicles/tractor | tractor | trac·tor (4) |
| 8 | farm animals/bee | bij | (none — one klankgroep: Check with no cut is right) |

Round 8 is the honest trap: a one-klankgroep word written with three letters; the right move is not to chop. Its position in the pass is reshuffled like every round (never always last), so "don't chop the last one" cannot be learned.

**Answer position.** Levels 1 and 3 have no position (the count / the seam is the content; the snake length is constant, so it tells nothing). Level 2: tub cell positions are a fresh shuffle per render, and the gate measures that "drag lumps in tub reading order (left-right, top-bottom)" solves ≤ 1/N on average (≤ 0.30 over the level) and that the first lump in tub order is the word's first klankgroep in ≤ 35 % of renders.

## 7. Check, the misses, the success
- **Check with nothing done:** hint, no miss — EXCEPT Level 3 round 8 (`bij`), where zero cuts IS the answer: Check with no cut on a one-klankgroep word is the success, never the hint (the core decides by `seamCount === 0`, not by "nothing done"). L1/L3 "Hak de klei in stukjes: één stukje voor elke klankgroep." (EN "Chop the clay: one piece for every part you hear.") · L2 "Leg de stukjes op de plank." ("Put the pieces on the board.")
- **Level 1, miss 1** — the stamp roller prints the klankgroepen onto the pieces in order:
  - too few pieces: the last piece receives two (or more) klankgroepen, with a dotted seam line between them and the knife hovering over that line, pulsing — "Er zit nog een klankgroep in dit stukje. Hak het door!" ("There is still a part in this piece. Chop it!")
  - too many: the extra pieces stay blank, wobble, and crumble into a ball that rolls back to the tub (600 ms) — "Dit stukje heeft geen klankgroep. Het rolt terug." ("This piece has no part. It rolls back.")
  - after the showing the snake returns to the child's cuts (blank again) so the child can try.
- **Level 1, miss 2** — the snake is reprinted with the whole word and the seams glow as dotted lines; the picture word is spoken (TTS) and the klankgroepen light one after another, 500 ms each, as if clapped. The child chops along the glowing lines. Hint: "Klap het woord mee en hak waar het licht is." ("Clap the word and chop where it lights up.")
- **Level 2, miss 1** — the row slides together: every true-neighbour joint melts smooth; every wrong joint stays as a jagged crack and springs 12 px apart; a decoy lump cracks on both sides and slides back to the tub. Hint by case: wrong joint → "Deze twee horen niet naast elkaar." ("These two don't go next to each other.") · decoy → "Dit stukje hoort niet bij dit woord." ("This piece is not part of this word.") · lumps still in the tub (not a miss, no Check consumed) → "Er liggen nog stukjes in de bak." ("There are still pieces in the tub.")
- **Level 2, miss 2** — the first klankgroep's lump rolls by itself to the start mark and sticks there (locked, a small dent pressed into it); the others return to the tub. Hint: "Het woord begint met {first}." ("The word starts with {first}.")
- **Level 3, miss 1** — cuts at true seams stay open; cuts inside a klankgroep heal (the clay closes over them, 300 ms); a missing seam shows as a faint dimple. Hint: "Waar het dicht is gegaan, zat geen naad." ("Where it closed, there was no seam.") · round 8 chopped: "Bij is één klankgroep. Niet hakken!" ("Bij is one part. Don't chop!")
- **Level 3, miss 2** — the seams dimple deeper and glow; spoken word with the klankgroepen lighting in turn. Hint: "Hak in de deukjes." ("Chop in the dents.")
- **A new move takes the help away** until the next Check (glows fade, the hovering knife leaves).
- **Success:** the pieces close into one smooth snake (seams vanish, letters slide to word spacing, 400 ms), the snake curls into a coil around the word (700 ms) and rolls onto the shelf. Bubble: L1 "{word}: {n} klankgroepen — {k1} · {k2} · …!" (EN "{word}: {n} parts — {p1} · {p2} · …!"; n = 1 → "{word}: één klankgroep!") · L2 "{k1} + {k2} + … = {word}!" · L3 "{k1} | {k2} | … — zo hak je {word}!" ("{p1} | {p2} — that is how you chop {word}!"). End of pass: all coils on the shelf wobble in turn, left to right.

## 8. Settings
1. **Extra stukje** (Level 2): Uit / Aan — an extra decoy lump lies in the tub. Visible at rest (one more lump in the tub).
2. **Letters op de klei** (Level 1): Pas na het hakken (default — the stamp prints them at Check) / Meteen (the word is printed on the snake from the start, faint 40 %, for children who already read; chopping still has to match the klankgroepen). Visible at rest.

## 9. Words (EN source; the build authors nl by hand, then one native nl + pedagogy reviewer)
- Shell title: the frozen nl page title. Instrument name inside the page (aria only): "De kleislang".
- Instruction: EN "Chop the clay snake: one piece for every part of the word. Then press the pieces back together." → nl "Hak de kleislang: één stukje voor elke klankgroep. Plak de stukjes daarna weer aan elkaar."
- Task lines: L1 "Hak de klei: één stukje voor elke klankgroep die je hoort." ("Chop the clay: one piece for every part you hear.") · L2 "Plak de stukjes in de goede volgorde." ("Press the pieces together in the right order.") · L3 "Hak het woord in klankgroepen." ("Chop the word into parts.")
- Hints and celebrations: §7 exactly. Settings: "Extra stukje" / "Uit" / "Aan" · "Letters op de klei" / "Pas na het hakken" / "Meteen". Level picker: "Hakken" / "Plakken" / "Hakken met letters".
- aria: "Kleislang, {n} stukjes" · "Stukje {i}: {klankgroep|leeg}" · "Klei-mes op {pos} procent" · "Bak met {n} stukjes" · "Plaatje: {word}".

**Locale traps (nl):**
- **School terms.** "klankgroep" (not "lettergreep") is the word Dutch infant and groep-3 classrooms use; "hakken en plakken" is the standard Dutch reading-method verb pair (in groep 3 it is used for sounds; in groep 2 for clapping words in parts). The design uses both verbs for klankgroepen only and never splits into single sounds. The reviewer confirms "klankgroep" over "stukje" in the task lines.
- **ij is one letter.** Cuts in Level 3 never land between i and j (the gap between them is not a snap point); `tij·ger`, `kij` render ij as one glyph cell.
- **Diminutive -je is its own klankgroep** (`koek·je`) — gated split kept.
- **Open/closed klankgroepen** (`ta·fel` vs `bal·lon`): Level 3 includes double-consonant words so children see the seam between the two l's — the beginning of the Dutch spelling rule, without naming it.
- **Lowercase** throughout (Dutch kleuters learn lowercase first); no capitalised nouns in Dutch.
- **No articles** on the apparatus (de/het never appear), so no gender trap.
- Pool vocabulary is Netherlands Dutch; Flemish alternatives (e.g. "valies") are not used; `pannenkoek` reads for the library's thick pancake in both.

## 10. Sound off, access, phones
- **Legible with the sound off:** Level 1 needs no reading and no sound — the child names the picture in their head and chops; the stamp, the crumbling blank piece and the double-print are all visual. TTS (picture tap, klankgroep clap at miss 2) is a bonus.
- **Keyboard path** as §5; focus ring 3 px teal on the snake/knife/lumps.
- **aria-live:** "Je hebt {n} stukjes gehakt" · "Stukje {i} kreeg twee klankgroepen" · "Stukje {i} is leeg en rolt terug" · "{a} en {b} plakken" · "{a} en {b} plakken niet".
- **Taps:** the snake is a 64 px (52 at 360) tall hit band; lumps ≥ 72 × 46; knife cut precision forgiving (36 px refuse rule). Pictures 160 px at 704, 96 at 360 (80 at 320).
- **Phone layout:** stacked; the shelf shrinks to a single line of small coils; at 320 the shelf is hidden.

## 11. Distinct from
- **Rows 45–50 (this batch):** the Word Lock (dials, en), the Telescope (pull-out segments, da), the Lacing Board (thread a lace, no), the Stepping Stones (a frog hops, sv), the Syllable Chain (shared syllable as the hook, it), the Domino Run (a toppling run, es) — seven verbs: chop/press · roll · pull · thread · hop · hook · topple.
- **New #215 The Bead Rail** — a beat pad drops beads on a rail; here nothing is tapped per beat: the child *divides one fixed object*, so the same-length snake makes "length = parts" visibly false, and Level 2 adds joint-by-joint adjacency feedback that the bead rail does not have.
- **Premium tool syllable-splitter** — drum taps and arcs under a written word; here no drum, no arcs, and the default level has no letters at all.
- **Registry:** no built activity divides a continuous object; #1–#22 are all counting/comparison instruments.

## 12. Build plan
- **Data** (in the manifest row `params`): `{levels:{hak:[{noun,themeDir,word,split}],plak:[{…,decoy}],letters:[{…}]}}`; every `split` copied from `approved-words-nl.json` by key (build script asserts equality).
- **Core state** `{level, round, snake:{cuts:[x…]}, tub:[lumpId…], row:[lumpId…], misses, helpOn}`; functions `chop(x)` → ok/refused, `knead(i)`, `stamp()` → `{pieces:[{klankgroepen:[…]}], verdict:'right'|'short'|'long'}`, `place(lumpId, at)`, `press()` → `{joints:[{i, sticks:bool}], decoys:[…], complete}`, `snapCut(x)` → letter-gap index (L3), `seamsOK()` → `{kept:[…], healed:[…], missing:[…]}`.
- **Gate's own ground truth** (`verify-clay-snake-core.js`): its own copy of the 28 splits typed in the gate (not read from the core): L1 — for every round and every k = 1…6 pieces, `stamp()` gives right iff k = count, the short case puts all leftover klankgroepen on the last piece, the long case marks exactly k − count blank pieces; snake length identical across rounds. L2 — for every permutation of the lumps (≤ 4! = 24, + decoy positions), `press()` marks a joint sticky iff the pair is consecutive in the split; complete-and-right only for the identity order; decoys never stick. L3 — every seam index matches the split; an inner cut always heals; round 8 right with zero cuts. Count distribution per pass; "always 2 / always 3" bots ≤ 0.30; tub-order bot ≤ 0.30; first-lump-in-tub-order ≤ 0.35 over 2,000 renders. No pool word lacks its picture; no decoy forms a library word with any lump.
- **Mutations (one per rule):** L3 Check with zero cuts on `bij` treated as "nothing done" (hint) instead of success · stamp splits the overflow across all pieces (instead of the last) · extra pieces receive a klankgroep · snake length scales with the word · joint sticks for any pair in the word (not only consecutive) · decoy sticks · identity order not required (any order complete) · L3 inner cut does not heal · L3 cut allowed between i and j · round 8 requires a cut · 36 px refuse rule removed · reshuffle returns the same order twice · miss-2 lock places the last klankgroep instead of the first.
- **Pictures to verify on a contact sheet at build:** flowers/sunflower, camping/binoculars, furniture/bookcase, beach/lighthouse, fruits/watermelon, accessories/glove, vehicles/bicycle (seen 2026-10-17: animals, farm animals, christmas, breakfast, toys, weather, beach).
- **Risks:** the coil animation must keep the word readable at 36 px (fallback: the coil shows the picture thumbnail and the word appears in the bubble only); Level 3 snap points must exclude the i–j gap.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — chopping and kneading clay is a toy before it is a task, and the shelf of coils is a collection that grows.
2. **Would a teacher put it on the board?** Yes — it is the Dutch classroom's own "hakken en plakken" made touchable; the same-length snake answers "long word = many parts" by itself, and the cracked joint shows exactly which klankgroepen were swapped.
3. **Would a parent trust it?** Yes — library pictures, calm clay sounds, no score; three ambiguous pictures removed so the word is always clear.
4. **The invention:** a snake of clay that is always the same length — the parts only exist where the child chops, and only true neighbours stick back together.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-verified all 28 words against `approved-words-nl.json` (28/28, same splits) and every nl picture label (28/28 equal to the word) with a script; contact sheets re-read (camping/binoculars, around the house).
- Fixed a rule collision: Level 3 round 8 (`bij`, zero cuts is right) contradicted "Check with nothing done → hint"; the core now judges by seam count, with a mutation for it; the `bij` round is reshuffled so its place never tells.
- Added the sound-off name check: every Level 1 picture's common alternative name (kat/poes, sneeuwpop/sneeuwman) has the same klankgroep count, so the oral level cannot be failed by naming the picture differently.
- Invention, round tables and klankgroep/hakken-en-plakken pedagogy kept as written — they already beat the bar (the fixed-length snake makes "long word = many parts" visibly false).

