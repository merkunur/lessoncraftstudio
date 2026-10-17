# New 214 — The Bumpy Slide (RF.1.2.d)

## 0. Identity
- **id** `sound-slide.play.rf-1-2-d` · grade K (reaches grade 1) · Common Core **RF.1.2.d** (segment spoken single-syllable words into their complete sequence of individual sounds), with RF.K.2.d as the K floor · strand Reading: Foundational Skills.
- **files (key `sound-slide`)** `mini tools/sound-slide-core.js`, `sound-slide-activity.js`, `sound-slide-activity.html`, `sound-slide-activities.json`. Scaffold: `node scripts/new-activity.js --num=214`.
- **worksheets it covers:** K-318 Sound Boxes (one sound per box; a wide box with a curve for two letters, one sound) · K-329 Count the Sounds (one dot per sound) · K-330 First Sound Given.
- New instrument; no old activity. Working title "The Sound Slide" kept as the key; the instrument's name is **The Bumpy Slide**.

## 1. The pitch
"You build a bumpy slide with one bump for every sound you hear in the word — then the picture rides down it, and every bump it bounces over is one sound."

## 2. Why a child will want it again (the fun)
- **You build the toy.** A playground slide runs down the stage from a little platform to a sandpit. Its ramp is smooth. Say the picture's name slowly and tap the ramp once for each sound: with every tap a bump rises out of the slide with a springy *boing*, and the bumps space themselves out evenly. Tap a bump to press it flat again.
- **The ride.** Press **Slide!**: the sounds' letters drop from above onto the bumps, and then the picture itself — the pig, the sheep, the boat — slides down the ramp, bouncing over each bump (*bop, bop, bop*), the bump's letters glowing as it passes, and lands in the sandpit with a sandy *poof*. The ride is the blend: the word put back together, sound by sound.
- **Two letters, one bump.** In "sheep" five letters ride on three bumps: **sh** shares one bump under a little curve, **ee** shares another. Children see it happen — the letters huddle together on one bump.
- **A slide is a toy.** Between rounds the child can build any slide they like (up to six bumps) and send the picture down for fun. Every bump is the same size, because every sound counts as one.
- **The sandpit fills.** Each picture that rides down stays sitting in the sandpit; after a pass, nine pictures sit there together.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** say a picture word slowly and segment it into its complete sequence of sounds, one bump per sound (K-318, RF.1.2.d); count them (K-329); with the first sound given, segment the rest (K-330); see that two (or three) letters can write one sound.
- **Misconception 1 — one sound per letter** (four sounds for *ship*, five for *sheep*). A child who taps once per letter builds too many bumps; at Check the letters drop and huddle — sh onto one bump, ee onto one bump — and the extra bumps catch nothing and sit empty. The material shows that the letters were fewer sounds than they looked.
- **Misconception 2 — swallowing a sound in a blend** (*fog* for frog, three for *crab*). Too few bumps: two letters land on one bump that is too small for them, the bump cracks down the middle — there was one more sound in there.
- **Misconception 3 — a vowel team heard as two sounds** (*b-e-e*, *m-o-o-n*). In the Letter-teams set the team tile is ONE wide tile under a curve; a child who taps a bump for each vowel letter sees the team land on one bump and the spare bump stay empty. (Syllable counting is New 215's job; every word here has one syllable, so a syllable-counter builds one bump and watches every sound crack it.)
- **Misconception 4 — counting the letters you imagine** (count mode: no letters shown at all — the child must listen, not spell).
- **How the material pushes back:** the falling sounds land one per bump; bumps without a sound stay empty, bumps with two sounds crack. The slide only lets the rider go when every bump carries exactly one sound.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504), bubble column right (176). Stacked below 700.

**At 704 px** (stage 504 × 450):
- **The platform** (top left): a drawn platform (ink, 3 px; cream deck 120 × 20) on two posts with a ladder (geometry). The **rider** = the round's library picture **104 px** sitting on the platform's edge. A speaker button (36 px) beside it (TTS name, bonus).
- **The ramp:** a wide coral band (`#F2784B`, 40 px thick, 3 px ink rim, rounded) from the platform (x 120, y 150) down to the sandpit (x 470, y 390) — a straight run of 400 px. **Bumps** rise from its top surface as smooth teal arcs (`#146B5E`, height 36 px, base width = run / (n + 1), max 6 bumps), evenly spaced; each bump has a 3 px ink edge. Above each bump floats a **drop spot** where its sound will land.
- **The sound tiles** (at Check, letters mode): cream rounded tiles 48 × 48 (Baloo 2 30 px ink) — one per SOUND; a team tile is 72 × 48 with an under-curve (2.5 px ink arc) beneath its two letters (three letters: 92 × 48).
- **The dots** (count mode): teal dots 22 px.
- **The sandpit** (bottom right): a sand-coloured rounded trough 180 × 60; finished pictures sit in it at 48 px (the round's rider at 72 px when it lands).
- **Task line** above (≤ 24 px). Bubble in the right column; **Slide!** (Check) under it.

**At 360 px** (stacked, stage 360 × 400): platform 90 wide, rider **72 px**; ramp run 300 px (40 px band, from x 70, y 120 to x 340, y 330); bumps base ≥ 48 px with 5 bumps (≥ 43 px at 6 bumps — the hit area of a bump is its base plus 6 px each side, so ≥ 48 px), height 30 px; tiles 40 × 40 (team 60 × 40); sandpit 140 × 46; bubble under; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** rider 64 px, ramp run 270, bumps capped at 6 with a 50 px hit band each (the tap target is the ramp segment), Check ≤ 620.

No words on the apparatus: only the letters of the sounds (at Check) and the picture.

## 5. The hand
- **Raise a bump:** tap the ramp — a new bump rises at the end of the row of bumps (scale-up 0 → 1.1 → 1, 140 ms, *boing* with a rising pitch per bump), and all bumps glide to even spacing (160 ms). Up to 6.
- **Flatten a bump:** tap a bump — it sinks (120 ms, a low *thup*); the rest re-space. Drag along the ramp from top to bottom = raises nothing (prevents scroll accidents); only taps count.
- **First sound given:** the first bump is pre-raised and already carries its sound tile (locked, teal rim); tapping it does nothing.
- **Slide! (Check):** the sound tiles (or dots) drop from above onto the bumps, left to right (each falls 220 ms, 90 ms apart, a soft *tak* on landing). If every bump carries exactly one sound, the rider slides (§7, success). Otherwise §7.
- **Free play:** after a round, the child may raise/flatten bumps and press Slide! freely — the rider rides any slide (no letters fall; just the ride), then hops back to the platform.
- **Undo:** bumps can be raised and flattened freely until Slide!; after a miss the bumps stay so the child adjusts.

## 6. The rounds
One round = one picture word. Pass = 9 rounds; order-only reshuffle per pass. Sounds are listed with "|" between them; letter teams in **bold**.

**Source rule (critic, binding):** every word and every split is a row of `mini tools/sound-boxes-bank-<loc>.json` (en: s1 = 3 sounds, s2 = letter teams, s3 = 4 sounds with a blend, s4 = vowel teams). Nothing is hand-split by the build. Bank rows with a broken picture are re-pointed to the same thing in the library (`weather/sun` → `beach/sun`, `kitchen tools/pan` → `around-the-house/pan`) or dropped (en `lip`, `chin`, `rain`, `toad` — no picture; `egg` — the carton; `tree` — the only tree is a decorated Christmas tree; `mouse` — its silent e; the magic-e rows `cake kite rope cone gate rose` — a split team the slide cannot show in one place).

**Setting Words = "Simple sounds"** (letters = sounds; the bank has no 5-sound rows, so a pass mixes 3 and 4):
- Pass A: cat c|a|t (animals) · sun s|u|n (beach) · pig p|i|g (animals) · bed b|e|d (around-the-house) · frog f|r|o|g (reptiles-and-amphibians) · crab c|r|a|b (beach) · nest n|e|s|t (spring) · lamp l|a|m|p (furniture) · drum d|r|u|m (music)
- Pass B: hen h|e|n (farm-animals) · mop m|o|p (around-the-house) · jug j|u|g (kitchen-tools) · net n|e|t (beach) · flag f|l|a|g (4th-of-july) · sled s|l|e|d (winter) · hand h|a|n|d (body-parts) · milk m|i|l|k (at-the-supermarket) · belt b|e|l|t (clothing)
Counts per pass: four 3-sound and five 4-sound words, alternating which count leads (pass A, B, A… then the shares swap to five 3s and four 4s by moving `drum` / `belt` out for `dog` / `pot`). Because the child BUILDS the slide before any sound is shown, a fixed count is no strategy: a bot that always builds 4 bumps lands ≤ 5/9 and sees an empty or cracked bump on every other word. The 4-sound words all start or end with a blend (fr-, cr-, -st, -mp, -nd…) — exactly where children swallow a sound.

**Setting Words = "Letter teams"** (every word has a sound written with two letters, so letters ≠ sounds in all 9 — the worksheet's "wide box with a curve"; all bank rows):
- Pass A: bee b|**ee** (farm-animals) · ship **sh**|i|p (vehicles) · sheep **sh**|**ee**|p (farm-animals) · duck d|u|**ck** (animals) · moon m|**oo**|n (space) · boat b|**oa**|t (beach) · snail s|n|**ai**|l (insects-and-bugs) · cloud c|l|**ou**|d (beach) · brush b|r|u|**sh** (around-the-house — a paintbrush, still "brush")
- Pass B: bee b|**ee** · fish f|i|**sh** (animals) · sock s|o|**ck** (accessories) · ring r|i|**ng** (accessories) · bell b|e|**ll** (christmas) · coat c|**oa**|t (clothing) · snail · cloud · brush
(The bank holds one 2-sound team row with a picture — bee — and three 4-sound ones — snail, cloud, brush — so they recur every pass; the 3-sound rows rotate, with lock (around-the-house) and rock (camping) as reserves.) Counts per pass 1/5/3 (2/3/4 sounds); letters-per-word 3–5, so a letter-counter is wrong on every word (gate: letters ≠ sounds in 9/9) and an always-3 bot meets an empty or cracked bump on 4 of 9.
**Excluded on purpose:** r-controlled words (shark, star, bird — the sounds differ by accent), x-words (fox, box — x writes two sounds, /k/ + /s/), soft c/g words (city, giraffe — never a letter's main sound), silent-e and magic-e rows (a split team), `egg` (the carton), `tree` (a Christmas tree), `mouse` (silent e).

**Setting Show:** letters (default; tiles fall at Check) · **count only** (K-329; dots fall, no letters ever — after success the sandpit sign shows the number of bumps as a numeral, never the spelling).
**Setting Start:** from the top (default) · **first sound given** (K-330; the first bump is raised with its tile).

**Answer position.** The answer is a count the child builds before anything is shown; balance is on counts (as above) and, in Letter teams, on where the curve lands — pass A: front 2 (ship, sheep), middle 5 (sheep, moon, boat, snail, cloud), end 3 (bee, duck, brush); pass B: front 0, middle 3, end 6 — so across two passes the curve is never "always first" or "always last" (gate: no position > 60 % over two passes).

**Order:** order-only reshuffle per pass; passes A and B alternate.

**Other locales** (the build authors each list; the native reviewer checks every split). Source: `mini tools/sound-boxes-bank-<loc>.json`, which already holds per-locale splits (e.g. de Fisch F|i|**sch**, Schaf **Sch**|a|f, Schuh **Sch**|**uh** (2), Maus M|**au**|s; nl boek b|**oe**|k, muis m|**ui**|s, schip s|**ch**|i|p (4 sounds, 5 letters); fr chat **ch**|a (2 sounds, 4 letters — the silent t falls as a small hollow "quiet" tile that lands on no bump, beside the last one), loup l|**ou**, poule p|**ou**|l; es queso **qu**|e|s|o, perro p|e|**rr**|o, llave **ll**|a|v|e; it chiave **ch**|i|a|v|e, gatto g|a|**tt**|o; pt chave **ch**|a|v|e, ninho n|i|**nh**|o; sv katt k|a|**tt**, hatt, tupp, lamm, mugg, dörr; no katt, penn, buss, ring r|i|**ng**; **da**'s bank has no team rows, so da ships Simple sounds only (from the `policy_managed:false` pool, plus its 4-sound s2 rows gris, fisk, glas, krus)). Each locale fills Simple sounds (letters = sounds) and Letter teams with ≥ 7 words per pass; Finnish fills Simple sounds from its bank stage s2 (ovi o|v|i, susi, käsi, muki, lasi, vene, auto a|u|t|o — au is two vowels, two bumps, as the bank says; `poro` dropped: no reindeer picture) — 7 rows, so the pass repeats one in a fresh order. Its second set is **Long sounds** under the **Finnish ruling** (shared with Row 58, binding): Finnish first grade teaches *pitkä äänne kirjoitetaan kahdella kirjaimella* — a long sound is written with two letters, one letter per box — and `sound-boxes-bank-fi.json` splits it exactly so (kuu k|u|u, kukka k|u|k|k|a). So a long sound needs TWO bumps: the child stretches the sound and taps twice, and at the ride the two bumps under a doubled letter fuse into one long hill (*pitkä mäki*) with a teal length bar beneath, the same letter landing on both halves — kuu = 3 bumps, the last two fused; kukka = 5 bumps, the middle two fused. A child who taps once for the long sound (k-u, the classic *ku* for *kuu* spelling) watches the long uu tile land on one bump too small for it and crack it: one more bump. Rows: kuu (space/moon), suu (body-parts/mouth), kukka (summer/flower), kuppi (around-the-house/cup), pallo (toys/ball), kettu (animals/fox), sukka (accessories/sock), lippu (4th-of-july/flag) — 8 bank rows, all with pictures. **Count only is hidden for the Long-sounds set** (counted boxes and heard length would argue); fi counts with the short set only.

## 7. Check, the misses, the success
- **Slide! with no bumps:** hint, no miss — the ramp shimmers — "Say the picture's name slowly. Tap the slide once for every sound."
- **Miss 1:** the sounds drop one per bump, left to right; **extra bumps** catch nothing and stay empty (they dim, a small grey "nothing" puff); **too few bumps**: when two sounds must share a bump, the bump cracks down the middle (a jagged ink line) and the two tiles sit squeezed and tilted on it. The rider stays on the platform. In letters mode the falling tiles are the true sounds — so a child who built one bump per letter sees **sh** land together under its curve and an empty bump left over. · too many: "Some bumps have no sound. Say it slowly again." · too few: "A bump has two sounds on it. There is one more sound."
- **Miss 2:** dashed **ghost bumps** appear on the ramp at the right count and spacing; the child's own bumps that do not sit on a ghost are dimmed; the child raises/flattens bumps to fill exactly the ghosts · "Make one bump for each dashed bump. Say each sound as you tap."
- **Count mode** behaves the same with dots instead of letters.
- **A new move takes the help away** (ghosts vanish) until the next Slide!.
- **Success:** the tiles sit one per bump; the rider pushes off and slides down, bouncing over each bump (each bounce 160 ms, the bump's tile lighting gold as it passes — a blend of the sounds, read left to right), and lands in the sandpit with a *poof* of sand dots; the word appears on a little sign stuck in the sand (letters mode) or the bump count (count mode). · letters: "{sh}–{ee}–{p}: {sheep} has {3} sounds!" · count: "{3} sounds! You heard every one."
- **End of pass:** the nine pictures in the sandpit wave in turn.

## 8. Settings
1. **Words:** Simple sounds (default) · Letter teams (fi: Long sounds; hidden in da) — the ramp at rest looks the same, so the setting also changes the platform's flag: a small flag with one letter (simple), two letters under a curve (teams) or, in fi, one long hill with a length bar — visible at rest.
2. **Show:** Letters (default) · Count only — at rest the drop spots above the ramp show a small letter-tile outline or a dot outline. (**Start:** from the top / first sound given — a sub-option; the first bump appears raised with its tile.)

## 9. Words (EN source)
- title: **The Bumpy Slide** · instruction: "Tap the slide once for every sound in the word, then let it ride!"
- task lines: "Say the word slowly. Tap one bump for each sound." · first given: "The first sound is already on the slide. Add a bump for each sound after it." · count only: "Tap one bump for each sound you hear."
- button: "Slide!" (the shell's Check, relabelled).
- hints/celebrations: §7 exactly.
- settings: "Words", "Simple sounds", "Letter teams", "Long sounds", "Show", "Letters", "Count only", "Start", "From the top", "First sound given". aria: "Slide with {n} bumps", "Bump {i}: {sound|empty|two sounds}", "Ramp: tap to add a bump", "{picture} slid down: {n} sounds".

**Locale traps:**
- **Sounds are language-specific and the split IS the content:** each locale's list is authored and split by a native speaker (no phoneme data is assumed from English). fi/es/it are nearly one-letter-one-sound (rich Simple sets); en/fr/da/nl/de are team-heavy (rich Letter-team sets).
- **fr silent letters** (chat, lit, nid): a silent final letter falls as a small hollow **quiet tile** that lands beside the last bump, never on one, and is never counted; the count mode ignores it.
- **Diphthongs and long vowels:** de au/ei/eu, nl ui/ij/ei/ou, sv/no/da long vowels written single, en vowel teams — the native reviewer decides each: one sound = one bump. Words whose count is disputed between regional pronunciations are dropped, not argued (en r-controlled words excluded for that reason).
- **Danish:** only `policy_managed:false` words (the K-1 orthographic pool); soft-d words (e.g. "mad") excluded.
- **Doubled consonants** (de Bett, it gatto, sv katt) are ONE sound on one bump under a curve; the gate knows each locale's doubling rule.
- **German nouns** keep their capital on the sound tile (**Sch**|a|f).
- **Labels:** the rider's word is the `image-vocabulary.js` label in the locale; a picture is used only if its locale label is the word split (es "pato" not "el pato").
- Sound off: the child says the word themselves; the bumps, the falling tiles, the crack and the empty bumps carry every message; TTS (the picture's name, the sounds on success) is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** the picture is the prompt; empty bumps and cracked bumps show too many/too few; ghosts show the count; the ride shows success.
- **Keyboard:** Tab to the ramp, Enter (or "+") raises a bump, Backspace (or "−") flattens the last; Tab through bumps, Enter flattens the focused one; Space = Slide!.
- **aria-live:** "3 bumps. Bump 4 has no sound." / "Bump 2 has two sounds." / "Sheep slid down: 3 sounds."
- **Taps:** the ramp segment hit band ≥ 48 px wide per bump, 64 px tall; bumps ≥ 48 px including margins; Slide! ≥ 48 px.
- **Pictures:** rider 104 px at 704, 72 px at 360, 64 px at 320.
- **Phone layout:** stacked; ramp shortened; bubble under; Slide! above both folds (measured at 6 bumps, team tiles included).

## 11. Distinct from
- **Premium `sound-boxes`** (push a chip into a box for each sound, then reveal letters) and **Row 55 Coco's Sound Boxes** — there are no boxes or chips here: the child BUILDS bumps on a slide, sounds fall onto them, and a ride blends them; too many/too few are shown by empty and cracked bumps, not by box counts.
- **Row 58 The Word Elastic (this batch)** — spells letters onto beads of a stretched elastic; this one counts sounds and never asks the child to place letters. The two share the Finnish long-sound ruling and the bank, nothing else.
- **Row 54 The Blending Magnets** (batch 09) blends onset and rime by closing a gap; **Row 55 Coco's Pop-Up Sound Boxes** pops lids where two words' sounds match — neither builds a count.
- **New 208 The Marble Stairs** (a marble hops down tops ordered by size): a rolling ride too, but there the ride TESTS an order of sizes; here the rider blends sounds the child built as bumps, and the check happens before the ride, by falling tiles.
- **New 215 The Bead Rail** (batch 09) — syllables, squashing a pillow per beat; this counts single sounds in one-syllable words.
- **Built registry:** #3 Peek Path, #5 Fading Line — paths and lines for numbers; no slide, no bump-per-sound.

## 12. Build plan
- **Core state** `{locale, wordsMode, show, firstGiven, round:{word, pic, sounds:[grapheme], quiet:[grapheme]}, bumps:int, locked:0|1, misses, help, sandpit:[pic]}`.
- **Functions:** `raise()`, `flatten(i)` (locked bump excluded), `slide()` → `{ok, empty:[i], cracked:[i], placement:[[grapheme]]}` (sounds dealt left to right; if bumps < sounds, the extra sounds pile onto bumps from the end inward so the crack appears where sounds are squeezed; if bumps > sounds, the trailing bumps are empty), `ghosts()` → n, `rideFrames()`.
- **Gate's own ground truth** (`verify-sound-slide-core.js`): every round's `sounds` equal its `sound-boxes-bank-<loc>.json` row (no word outside the bank); its OWN grapheme table re-splits each label and must agree with the bank row (a disagreement is a gate failure that a native reviewer resolves IN the bank, never in the activity); joined sounds (+ quiet) equal the locale label's spelling; Simple sounds: letters = sounds in every word, counts per pass 4/5 or 5/4; Letter teams: letters ≠ sounds in every word; fi Long sounds: every doubled letter is two bumps fused, never one; excluded classes (r-controlled en, x-words, soft c/g, magic/silent e, `egg`, `tree`) never present; every picture exists and is colour; fr quiet tiles never on a bump and never counted; da words `policy_managed:false`; the bot "always 4" ≤ 5/9 in Simple sounds, "always 3" ≤ 5/9 in Letter teams, and "count the letters" = 0/9 in Letter teams.
- **Mutations:** rider rides with an empty bump · rider rides with a cracked bump · count mode shows letters · sounds dealt per LETTER instead of per sound · team tile split across two bumps · fi long sound accepted on ONE bump · ghosts shown at miss 1 · ghosts kept after a new move · locked first bump flattenable · a Simple pass with only one count · fr quiet tile counted · Simple set containing "sheep" · a word not in the bank.
- **Pictures (all verified to exist in the theme JSONs 2026-10-17; around-the-house and camping seen on contact sheets):** animals (cat, pig, fish, duck, dog, fox), beach (sun, crab, net, boat, cloud), reptiles-and-amphibians/frog, spring/nest, furniture/lamp, music/drum, 4th-of-july/flag, winter/sled, body-parts (hand — a left palm, fine for "hand"; mouth), at-the-supermarket/milk, clothing (belt, coat), farm-animals (hen, bee, sheep), vehicles/ship, around-the-house (bed, mop, pot, cup, brush, lock — seen), kitchen-tools/jug, accessories (sock, ring), christmas/bell, insects-and-bugs/snail, space/moon, summer/flower, toys/ball. Still to view before build: animals, beach, farm-animals sheets (boat must read as one boat; cloud as one cloud).
- **Risks:** six bumps at 320 px (kukka needs 5); thin banks (fr 20, da 16, sv 20 rows) — a set under 7 usable rows is hidden for that locale, never padded with hand splits; the fi long-sound convention is RULED (two letters, two bumps fused — the bank's own split).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — they build a slide, the picture rides it bouncing over their bumps, and lands in the sand.
2. **Would a teacher put it on the board?** Yes — "one bump for every sound" is Elkonin segmenting turned into a toy, and *sheep* landing as three huddled sounds on three bumps is the clearest picture of "letters are not sounds" there is.
3. **Would a parent trust it?** Yes — real pictures, the child's own language's sounds, nothing to read but the content, no timer.
4. **The invention:** a slide you build with one bump per sound — the sounds fall onto the bumps and the picture rides them, so empty and cracked bumps show exactly where the count went wrong.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 4→5 · reality 4→5
What changed:
- Hand-split words removed (lemon, robot, stamp, camel — syllabic l makes it 4 or 5 —, melon, panda, shoe, key, tooth, crown, spoon, tie, cow, pie, train): every word and split is now a bank row; Simple sounds = bank s1 + s3 (3 and 4 sounds, blends), Letter teams = bank s2 + s4 (bee, ship, sheep, duck, moon, boat, snail, cloud, brush / fish, sock, ring, bell, coat …); broken bank pictures re-pointed or dropped (rain, toad, lip, tree = a Christmas tree).
- Misconception 3 replaced (no 2-syllable bank words): a vowel team heard as two sounds.
- FINNISH RULING settled (shared with 058): long sound = two letters = two bumps fused into a long hill; one bump for a long sound cracks; Count only hidden for the long set; fi Simple sounds from bank s2 (talo/kala were syllable rows, poro has no picture).
- Answer-position and bots re-measured for the new pools; da ships Simple sounds only (no team rows in its bank); sv team words corrected.
- Distinct-from adds 054, 055 and New 208 The Marble Stairs (a ride that tests order vs a ride that blends a count).
