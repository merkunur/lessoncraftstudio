# Row 109 — Stretch the Giraffe → THE SOUND ROLL (RF.1.2.a)

## 0. Identity
- **id** `stretch-giraffe.long-short-vowel.rf-1-2-a` (KEPT; slug, title "Stretch the Giraffe — Long & Short Vowel Sounds (Grade 1)" and intro frozen en/de/nl) · grade 1 · Common Core **RF.1.2.a** (distinguish long from short vowel sounds in spoken single-syllable words) · strand Reading: Foundational Skills.
- **files (key `sound-roll`)** `mini tools/sound-roll-core.js`, `sound-roll-activity.js`, `sound-roll-activity.html`, `sound-roll-activities.json` (the row moves out of `stretch-giraffe-activities.json`, which is emptied to `[]`; `vowel-length-core.js` untouched). New metadata (slug, title, intro) for sv, da, no, fi.
- **worksheets it covers:** G1-312 *Sound Strip: How Many Sounds?* (Clue "Count the sounds") · G1-314 *Blend the Sounds* (Clue "Blend").
- **what the old activity did:** three library pictures; "tap the word with the LONG (or SHORT) vowel"; tap a picture to hear it; a hand-drawn SVG giraffe. **Kept:** every old EN word that is a sound-boxes bank row with a real picture (cake, cat, pig, fish, bee, duck, sock, sun, kite, frog, crab, hand, hat, leaf; *pie* and *nose* are not bank rows and wait for a bank addition) and the de/nl word lists (minus the defects below). **Changed because it was wrong:** `rope` (camping) and `rain` (spring) do not exist in the library — gone; the de round "Reh" points at `forest-creatures/deer`, whose de label is *Hirsch* (a short vowel!) — replaced; the nl round marks *geit* (goat) "short", but *ei* is a diphthong, neither long nor short — removed; the one-of-three "ask long / ask short" tap is gone (a 33 % guess, and the ask flip was the only thing that made a child read the prompt); the hand-drawn giraffe is replaced by the library `zoo-animals/giraffe`.

## 1. The pitch
"Punch one hole in the music-box roll for every sound you say — hold the punch down while you say a long, stretchy vowel and the hole stretches into a slot — then crank the box and the word plays back exactly as you punched it."

## 2. Why a child will want it again (the fun)
- **A punch you can feel.** One big round PUNCH key, like the key of a toy piano. Press it: *chk!* — a hole appears in a paper roll and the roll steps forward. Hold it: the hole keeps growing into a long slot under your finger with a rising hum, and at the **stretch mark** it clicks — long. Children punch tunes on an empty roll just to hear them (free play, any time).
- **The crank.** Turn the little crank (or press Check): the roll feeds into a music box and a comb of brass teeth plays it, one note per hole — a short *plink* for a round hole, a held *plinnnng* for a slot. The library giraffe on the lid nods on every note and rises on tiptoe for every long one — *stretch the giraffe*.
- **The master roll.** As the child's roll plays, the word's own roll slides up underneath (pre-punched, with letters printed below each hole). Where the two agree, light shines through both and the note rings gold. Where they disagree you SEE it: a hole with no partner, a partner with no hole, a round hole sitting over a long slot with the rest of the slot dark beside it.
- **The song book.** Every finished word becomes a punched card clipped into a song book along the top. After a pass the book is a row of cards with their tunes; tap one and it plays again. Long words have long slots — after a pass the child can SEE which words stretch.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.2.a):** hear whether a word's vowel is long (it says its name: the a in *cake*, the e in *bee*; in de/nl/sv/da/no/fi the vowel is literally held longer: *Boot*, *maan*, *sol*, *kuu*) or short (*cat*, *Bett*, *kat*, *katt*). **G1-312:** say a word slowly and count its sounds (one hole per sound — *fish* is 3, *frog* is 4). **G1-314:** read sounds left to right and blend them into the word.
- **Misconception 1 — "long" means a long word.** *frog* has more letters than *bee*, but *bee* has the long vowel. On the roll, length lives in ONE hole: how many holes (sounds) and how long the vowel slot is are two things the child sees separately.
- **Misconception 2 — letters = sounds.** *fish* has 4 letters and 3 sounds; *sheep* 5 letters and 3 sounds. In Count mode a child who punches one hole per letter sees an extra hole with no partner — and the master prints *sh* under ONE hole.
- **Misconception 3 — saying the letter's name for a short vowel.** A child who says /eɪ/ for *cat*'s a punches a slot; the master's round hole leaves the end of the slot dark, and the comb plays the master's short note against the child's long one — the two notes are heard AND seen to differ.
- **How the material pushes back:** the comb and the master roll do it. Nothing is said that the roll does not show.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 480):
- **Song book** (top strip, 504 × 52): nine card slots 40 × 44, each card drawn as tool-grade geometry — a tiny strip of its own holes (dots and slots), never a shrunken picture (orchestrator ruling); empty slots dashed.
- **Picture cards** (y 64–200): in Long-or-short THREE library pictures, each **120 × 120** on a cream card (`#FFF8EC`, 3 px ink rim, radius 16), 24 px apart; in Count ONE picture **150 × 150** centred; in Blend the roll sits on top and three **104 px** choice pictures sit under it. A 36 px speaker under each picture says its name (TTS where reliable).
- **The rolls** (y 214–330): one paper roll per picture, left→right. In 3-picture mode three short rolls 150 × 56, each directly under its own picture; in 1-picture modes one roll 440 × 72, always 10 units long (so its length never hints the count). Paper `#FFFDF6`, sprocket dots along both edges (geometry). Holes: round **28 px** (consonant or short vowel); long slot **64 × 28** with a thin ink **stretch mark** tick at its two-thirds point. Unit 36 px.
- **The punch key**: in 1-picture modes a teal `#146B5E` disc **72 px** with a cream ring at the roll's right end; in 3-picture mode each roll's vowel place has its own punch key **52 px** under it (§5).
- **The music box** (bottom-left, 120 × 84): drawn geometry box with a brass comb (8 teeth) and a crank handle (44 px hit); the library `zoo-animals/giraffe` stands on the lid, **96 px** tall.
- **Task line** above the stage (Nunito 22 px, ≤ 2 lines). Bubble right; Check under it.

**At 360 px** (stacked): song book 360 × 40 (cards 30 px). 3-picture mode: the three pictures in one row at **96 × 96** (gaps 12) with their rolls under them at 104 × 48 (holes 22, slot 48 × 22, vowel punch keys 48 px). 1-picture modes: picture 112 px, roll 328 × 60 (holes 24, slot 56 × 24), punch key 64 px at the roll's right; music box 96 × 68 with the giraffe at **72 px** below the roll; bubble under; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** 3-up pictures **88 px** (3 × 88 + 2 × 8 = 280 fits), rolls 92 × 44; Check bottom ≤ 620.

No words on the apparatus: the only characters are the letters printed under the MASTER roll's holes (Blend mode, and after a check) — the content.

## 5. The hand
- **Punch (1-picture modes):** press the key: a round hole appears at the roll's next position (scale 0 → 1, 90 ms, a dry *chk*) and the roll steps one unit left (120 ms). Keep holding past 180 ms and the hole grows rightward at 110 px/s with a soft rising hum; at **450 ms** it reaches the stretch mark: a *tick* and a 4 % bump — now it is a long slot, and it grows no further. Release before 450 ms: the half-grown hole springs back to round (120 ms). There are only two shapes, and the child FEELS which one they made.
- **Punch (Long-or-short):** each roll arrives with its consonant holes already punched (faint ink fill) and ONE empty dashed vowel place; its small punch key sits under that place. Tap = short hole, hold to the mark = long slot. Pressing again re-punches (the old hole heals shut, 120 ms).
- **Fix:** tap any hole on the child's roll to close it (Count: later holes slide left); drag a slot's right end to shorten or lengthen it (it snaps to round or long) — a second way that never needs timing.
- **Crank = Check:** drag the crank a full turn (or press Check): the roll feeds into the box at 1 unit per 220 ms; the comb plucks each hole; the giraffe tilts its head 8° on each note (160 ms) and rises 12 px on each long one. The master roll slides up under the child's roll (240 ms) and the comparison lights (§7).
- **Blend mode:** a lettered master roll arrives; the child drags the crank slowly — each hole passing the comb lights its letter(s) and plays its note (TTS sounds where reliable) — then taps one of three pictures.
- **Free play:** between rounds the key punches an endless empty roll; crank to hear the tune. Tapping a song-book card replays that word.
- **Undo:** everything is reversible until Check; after a miss the child's holes stay, so the child fixes rather than restarts.

## 6. The rounds
Pass = 9 rounds; two EN sets (pass 1 set A, pass 2 set B, then alternating); order reshuffled every pass, never the same order twice.

**Source rule (critic, binding).** The roll pre-punches a word's holes and, with letters shown, prints its letters under them — that is a sound split, so **every word whose roll appears comes from `mini tools/sound-boxes-bank-<loc>.json`, split exactly as the bank splits it** (en `cake` = c · a_e · k, `sheep` = sh · ee · p, `snail` = s · n · ai · l). A word the build wants that the bank lacks is ADDED to the bank first in the bank's notation and read by the native reviewer — never split in this activity's data (the Row 55 precedent). Bank rows with a broken picture are re-pointed to the same thing (`weather/sun` → `beach/sun`) or dropped (`rope`, `rain`, `lip`, `chin`: no picture). A split digraph (a_e, i_e) is one LONG slot under the vowel with a small hole-less **e** ghost after the last hole, joined to the slot by an under-arc. Distractor pictures in Blend show no roll and may be any library word.

**Clue "Long or short?" (default) — three words per round, every vowel punched.** L = long (says its name), S = short. Every word is an en bank row with a checked picture.

| Set A | word 1 | word 2 | word 3 | pattern |
|---|---|---|---|---|
| A1 | cake (4th-of-july/cake — the whole cake) L | goat (farm-animals/goat) L | leaf (miscellaneous/leaf) L | LLL |
| A2 | cat (animals/cat) S | drum (music/drum) S | sock (accessories/sock) S | SSS |
| A3 | pig (animals/pig) S | bed (furniture/bed) S | flag (4th-of-july/flag) S | SSS |
| A4 | kite (beach/kite) L | fish (animals/fish) S | boat (beach/boat) L | LSL |
| A5 | hand (body-parts/hand) S | bee (farm-animals/bee) L | rose (flowers/rose) L | SLL |
| A6 | gate (around-the-house/gate) L | frog (camping/frog) S | cup (around-the-house/cup) S | LSS |
| A7 | sheep (farm-animals/sheep) L | hat (accessories/hat) S | bell (christmas/bell) S | LSS |
| A8 | duck (farm-animals/duck) S | snail (spring/snail) L | lock (around-the-house/lock — a padlock) S | SLS |
| A9 | lamp (furniture/lamp) S | net (beach/net) S | coat (clothing/coat) L | SSL |

| Set B | word 1 | word 2 | word 3 | pattern |
|---|---|---|---|---|
| B1 | kite L | sheep L | coat L | LLL |
| B2 | dog (pets/dog) S | ring (accessories/ring) S | mug (kitchen-tools/mug) S | SSS |
| B3 | van (vehicles/van) S | sled (winter/sled) S | pot (around-the-house/pot) S | SSS |
| B4 | goat L | mask (accessories/mask) S | cake L | LSL |
| B5 | ship (vehicles/ship) S | leaf L | gate L | SLL |
| B6 | rose L | crab (beach/crab) S | belt (accessories/belt) S | LSS |
| B7 | bee L | log (camping/log) S | jug (kitchen-tools/jug) S | LSS |
| B8 | milk (breakfast/milk) S | boat L | sun (beach/sun) S | SLS |
| B9 | pen (around-the-house/pen) S | vest (accessories/vest) S | snail L | SSL |

**Measured** (`work-c23/m109.js`): each set = 27 distinct words, 11 long (41 %), 16 short; patterns LLL ×1 · SSS ×2 · LSL · SLL · LSS ×2 · SLS · SSL — no pattern more than twice; long words per position 4 / 3 / 4; an "everything short" guesser gets 16 of 27 vowels and only the two SSS rounds whole, "everything long" one round. Short a e i o u appear in both sets. **Honest gap:** the en bank holds exactly eleven long-vowel words with a usable picture, so both sets use the same eleven in new company — no long *u* at all (*cube, mule, tube* are not bank rows) and long *i* only in *kite*. The long pool may grow only by bank additions (candidates with checked pictures: *tie, pie, key, seal, jeep, train, whale, plate, globe, nose, slide, cube*), never by hand-splitting. Never mug + jug, pot + pan, or ship + sheep in one round. **Refused:** *vase* (US/UK), *moon/spoon/broom* (oo is not a letter name), *cone* (truncated cone), *rope*/*rain* (no picture), *brush* (its en label is "Paint Brush").

**Clue "Count the sounds" (G1-312) — one picture, blank roll, one hole per sound (length not judged); counts from the bank:** set A bee (2: b·ee) · fish (3: f·i·sh) · cake (3: c·a_e·k) · ship (3: sh·i·p) · bell (3: b·e·ll) · frog (4) · crab (4) · lamp (4) · hand (4); set B bee (2) · sheep (3: sh·ee·p) · boat (3: b·oa·t) · duck (3: d·u·ck) · ring (3: r·i·ng) · drum (4) · sled (4) · snail (4: s·n·ai·l) · mask (4). (*bee* is the bank's only two-sound word with a picture, so it is in both sets.) In 5 of set A's and 6 of set B's words letters ≠ sounds, so "one hole per letter" fails visibly; "always 3" and "always 4" each get 4 of 9. The shuffle never puts the same count three times in a row.

**Clue "Blend" (G1-314) — a lettered master roll arrives; crank, then tap the picture.** Targets are bank rows; the other two pictures differ by one sound where the library allows; rounds 1–4 are the long/short contrasts:

| # | roll (letters under holes; ‿ = long slot) | right | the other two |
|---|---|---|---|
| 1 | sh · ee‿ · p | sheep | ship · sock |
| 2 | sh · i · p | ship | sheep · shoe (clothing/shoe) |
| 3 | c · a · t | cat | cake · hat |
| 4 | c · a‿ · k (a hole-less e ghost after k) | cake | cat · kite |
| 5 | b · oa‿ · t | boat | goat · coat |
| 6 | g · oa‿ · t | goat | boat · gate |
| 7 | f · r · o · g | frog | flag · fish |
| 8 | s · n · ai‿ · l | snail | sled · seal (ocean-life/seal) |
| 9 | d · r · u · m | drum | duck · crab |

(*cap/cape* left this clue: neither is a bank row; the pair is taught by Row 111.)

**Answer position.** Long-or-short: no tap position to guess; the measured pattern spread above is the gate's assertion. Blend: the right picture's slot (left / middle / right) is 3/3/3 per pass (fixed Latin square), and a minimal-pair partner never sits in the same slot twice running. Count: the roll is always 10 units, so its length gives nothing away.

**Other locales** (vowel length is a phonemic contrast in **de, nl, sv, da, no, fi** — the instrument ships there; every roll word is a bank row of that locale, picture checked; one native + pedagogy reviewer checks every vowel):
- **de** (bank rows, one syllable): long — Hut, Tor, Tür, Wal, Bär, Fuß, Schaf, Schal, Schuh, Buch, Mond, Brot, Glas, Zahn, Huhn, Boot, Krug; short — Bus, Fisch, Schiff, Hund, Hand, Mund, Nest, Wolf, Netz, Rock, Ball, Bett, Kamm, Milch, Elch, Korb. Enough for two full sets. Old de rounds stay where their word is a bank row; "Reh" is gone (the deer picture is *Hirsch*).
- **nl** (bank): long only *maan, boot*; short vis, kat, pen, sok, bus, mok, kip, ring, slak, vlag, klok, melk, vork, lamp, wolf, schip. The long side needs bank additions first (roos, schaap, kaas, peer, been, oor, brood, vaas — pictures checked); *geit* (ei) and *koe* (oe) are refused for this clue.
- **sv** (bank): long bi, ko, mus, hus, ris, ben, räv, lök, val, får; short katt, hatt, tupp, lamm, mugg, dörr (*sol* has no picture label; *läpp*, *ägg* no picture). **da / no:** from their banks (da only `policy_managed:false`). These banks hold 16–20 rows, so a set may use a word twice (never twice in a round, never in adjacent rounds); with fewer than 7 distinct rounds the locale stays hidden until rows are added.
- **fi** — length is WRITTEN: a long vowel is a doubled letter, and the bank splits it as two boxes (kuu k|u|u — the Finnish ruling of Row 58). So in fi the long slot spans exactly TWO hole places and prints the doubled letter across them; Count counts it as two, matching the bank. Only phoneme-split rows are used (the bank's stage-s1 rows are syllable splits *ta·lo* and are skipped): long kuu, suu (+ additions: juusto, tuuli…), short muki, lasi, vene, susi, käsi, ovi.
- **es, it, pt, fr: NOT shipped (refusal recorded).** These school curricula have no long/short vowel contrast; their sound-strip worksheets are taught by Row 58 (The Word Elastic). No slug exists there and none is created.
Each shipped locale needs ≥ 9 rounds per set in Long-or-short (the gate refuses < 7).

## 7. Check, the misses, the success
- **Check with an empty vowel place / an empty roll:** hint, no miss — the empty place pulses — "Say the word slowly and punch its sounds."
- **Miss 1:** the box plays the child's roll; the master slides up underneath; agreeing holes shine gold; each disagreeing place is ringed coral — a slot over a round master hole shows its extra length dark with a torn edge; a round hole over a long master slot shows the slot's unlit part as a dashed outline; an extra or missing hole has no partner. · Long-or-short: "Listen to the vowel again. Does it say its name, or is it quick?" · Count: "One hole for every sound — not every letter."
- **Miss 2:** the master stays up and the box plays the TWO notes side by side for each wrong place (the child's, then the word's: *plink* vs *plinnng*) while the giraffe rises only for the long one; in Count the master's two-letter holes (sh, ck, ee, ai, oa) light their letters with an under-curve. · "Hear the two notes? This vowel is {long|short}. Punch it again." / "Two letters, one sound — one hole."
- **A new punch takes the help away** (the master slides back down) until the next Check.
- **Success:** the roll plays clean, every hole shines gold, the giraffe stretches to full tiptoe on the long notes and turns at the end; the card flies to the song book. · Long-or-short: "{cake} stretches, {cat} and {bed} are quick — you heard every vowel!" (long words first, then short; all-same rounds: "All three stretch!" / "All three are quick!") · Count: "{fish} has {3} sounds — you punched every one!" · Blend: "{sh}–{ee}–{p} makes {sheep}!"

## 8. Settings
1. **Clue:** Long or short? (default) · Count the sounds · Blend — visible at rest (three pictures with three short rolls / one picture with a blank roll / a lettered roll over three pictures).
2. **Letters under the holes:** Hidden (default — a listening task) · Shown — in Long-or-short the consonant holes print their letters and the vowel place its vowel letter(s): reading support; visible at rest.

## 9. Words (EN source)
- title (shell, frozen): **Stretch the Giraffe** · instruction: "Punch one hole for each sound. Hold the punch for a long, stretchy vowel."
- task lines: long-or-short — "Punch each vowel: tap for a quick one, hold for a long one." · count — "Say the word slowly and punch one hole for each sound." · blend — "Turn the crank slowly and read the sounds. Which picture is it?"
- hints / celebrations: §7 exactly. First-time nudge (once per visit, untouched board): "Press the punch — and try holding it!"
- settings: "Clue", "Long or short?", "Count the sounds", "Blend", "Letters under the holes", "Hidden", "Shown". aria: "Picture: {name}", "Roll for {name}: {n} holes", "Hole {n}: {round|long}", "Vowel place: empty", "Music box playing", "Hole {n} does not match: the word's hole is {round|long|missing}".

**Locale traps:**
- **"Long" means different things.** en: the vowel says its letter name (a quality change); de/nl/sv/da/no/fi: the same vowel held longer. "Says its name" appears only in the EN strings; the slot and the giraffe carry "long" everywhere.
- **Diphthongs are not long vowels** (de ei/au/eu, nl ei/ij/ui/ou, sv/no au/ei/øy, fi ai/ei/oi…): refused in Long-or-short; allowed in Count/Blend as one hole.
- **fi:** long = doubled letter; Blend prints the doubled letter under the slot, never one letter stretched.
- **nl open syllables** (*bo·ten*, long o written single): only one-syllable words, so the rule never misleads.
- **Danish soft d / stød** make many "obvious" words unreliable — `policy_managed:false` only, panel-checked.
- **Pictures are never captioned in Long-or-short** (a caption hands over the spelling); the child names the picture.
- **Sound off:** the slot shape, the gold/coral light, the master's letters and the giraffe's tiptoe carry every verdict; TTS is a bonus in the 5 reliable locales.

## 10. Sound off, access, phones
- **Silent legibility:** the child names the picture; punch shapes, the master's holes and letters and the light show every result; the giraffe's tiptoe doubles the long/short call.
- **Keyboard:** Tab to a roll's punch key; Enter = round hole, Shift+Enter = long slot (or hold Space ≥ 450 ms); Backspace closes the last hole; Tab to the crank, Space = Check; Blend: Right arrow turns the crank one hole, Tab to pictures, Enter.
- **aria-live:** "Vowel punched: long." / "Hole 3 does not match: the word's hole is round." / "cake stretches, cat and bed are quick."
- **Taps:** punch keys ≥ 48 px, holes have 44 px hit areas, crank 44 px; pictures 120 px at 704 (3-up) / 150 (1-up), 96 at 360, 88 at 320.
- **Phone layout:** stacked; each roll stays directly under its picture; the music box drops under the rolls; Check above the 360 × 740 and 320 × 640 folds (measured on every round of every clue).

## 11. Distinct from
- **Row 58 The Word Elastic:** segments by stretching a band into beads and snaps letters back; here a word is PUNCHED in time and played on a comb, and the new dimension is a hole's LENGTH (vowel length). No elastic, no bead kick.
- **Premium `sound-boxes`** (a chip per sound) and **`syllable-splitter`** (drum per clap): no duration, no long/short, no music box.
- **New 214 The Bumpy Slide** (one bump per sound — the nearest to the Count clue, which is why Count here never judges length and its holes are punched in time, not built as bumps) and **New 215 The Bead Rail** (squash per beat): beats and bumps, never the length of one sound.
- **Built registry:** no music box, roll or punch exists; #9 Counting Necklace beads are not holes.

## 12. Build plan
- **Core state** `{locale, clue, letters, set, round:{words:[{pic, graphemes:[g], vowelIdx, vowelLong:bool}] | word, choices}, rolls:[[{len:'round'|'long'}]], misses, help}`.
- **Functions:** `punch(rollIdx, long)`, `closeHole(rollIdx, i)`, `setLen(rollIdx, i, long)`, `holdToLen(ms)` (pure: `ms >= 450`), `check()` → per roll `{ok, extra:[i], missing:[i], lenWrong:[i]}`, `blendPick(i)`, `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-sound-roll-core.js`): its OWN per-locale grapheme and long-vowel table (en: each word's vowel marked L/S by hand inside the gate, never read from the manifest; fi: long ⇔ doubled vowel letter, derived from spelling); asserts every round's pattern, long share 40–60 %, ≤ 2 uses of a pattern per set, no two all-same rounds adjacent after shuffle; every roll word's split equals its `sound-boxes-bank-<loc>.json` row (read from the file; no authored splits) and every Count word's hole count = the bank's box count; every Blend round has exactly one picture whose locale label equals the rolled word and the four minimal-pair rounds exist; every picture exists, is a colour theme and its label matches; `rope`, `rain`, `vase`, `moon`, "Reh", nl "geit" absent from Long-or-short; no es/it/pt/fr rows; `holdToLen(449)` = round and `holdToLen(450)` = long.
- **Mutations (one per rule):** accept a round hole for a long vowel · count holes per letter · treat sh as two holes · show the master before Check · keep the help after a new punch · Blend right picture always slot 1 · stretch threshold 200 ms · LSS three times in a set · ship an es row · Count judging vowel length · drop the dashed outline for a missing slot part.
- **Pictures (critic 2026-10-17):** accessories (hat = a blue fedora, sock = one green striped sock, ring, mask, belt, vest) and around-the-house (cup = a teacup, pot = a red lidded pot, pen, lock = a padlock, gate) seen on the contact sheets; furniture/lamp, kitchen-tools/mug/jug, breakfast/milk, camping/log, pets/dog, vehicles/van still to view. Earlier: seen on contact sheets 2026-10-17 (`work-23/s109.png`, `s110.png`, `s113.png`): kite, cake, rose, cube (a purple solid — fine as "cube"), gate (a big double gate), nose, key, train, snail, moon, sheep, goat, boat, seal, jeep, coat, bee, leaf (maple), pie (a slice), tie, whale, slide, plate, globe, cow, ear, leg, ship, shoe (a loafer), fish, clock, sled, frog, flag (a US flag), crab, drum. Still to view before build: furniture/bed, accessories/sock/hat/cap/cape, camping/map/log, around-the-house/pen/cup/mop/pot/rug/fan, vehicles/bus/van, pets/dog, christmas/bell, at-the-supermarket/jam, beach/net, kitchen-tools/mug, zoo-animals/giraffe, and every non-EN word's picture.
- **Risks:** hold timing for motor-impaired children (drag-the-end and keyboard paths cover it); TTS-less locales depend on the child naming the picture — the panel picks unambiguous pictures; three rolls at 320 px (measured).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a punch that clicks, a hole that grows under your finger, a crank, a music box, and a giraffe that stands on tiptoe for long notes; children punch tunes for fun.
2. **Would a teacher put it on the board?** Yes — "short vowels are a quick plink, long vowels stretch" is the classroom language; the roll separates *how many sounds* from *how long one sound is*; ship/sheep and cat/cake are the standard in one look.
3. **Would a parent trust it?** Yes — real pictures, honest per-language rules (no long-vowel game forced on Spanish), calm, nothing sold.
4. **The invention:** a music-box roll you punch one hole per sound, where holding the punch for a long vowel stretches the hole into a slot — and the box plays back exactly what you punched against the word's own roll.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 4→5 · reality 3→5
What changed:
- Long-or-short sets rebuilt from `sound-boxes-bank-en.json` rows only (the roll pre-punches holes = a sound split; 15 old roll words — tie, key, pie, nose, globe, cube, train, whale, plate, slide, seal, jeep, map, jam, fan… — were not bank rows). Measured with `work-c23/m109.js`: 27 distinct words per set, 11 long (41 %), no pattern > 2 (the old set B used SLS three times, breaking its own gate), long per position 4/3/4.
- The false claim "every vowel letter appears long AND short in each set" removed (old set B had no long u); the honest gap is written down (the bank has no long-u picture word; long i = kite only) with the bank-addition route.
- Count and Blend rebuilt on bank rows (cake = c·a_e·k with the e ghost; cap/cape left — not bank rows, taught by 111); nest (holds chicks) replaced by lock; de/nl/sv/da/no/fi lists re-sourced from their banks, fi long slot = two hole places (the Finnish ruling: kuu k|u|u).
- Distinct-from now names New 214 The Bumpy Slide explicitly against the Count clue.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
