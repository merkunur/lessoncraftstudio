# Row 110 — Build Blend and Digraph Words → THE PAINT WELLS (RF.1.3)

## 0. Identity
- **id** `cvc-builder.build-blend-word.rf-1-3` (KEPT; slug `build-blend-and-digraph-words`, title and intro frozen en) · grade 1 · Common Core **RF.1.3** (know the spelling-sound correspondences for common consonant digraphs; decode and spell words with blends) · strand Reading: Foundational Skills.
- **files (key `paint-wells`)** `mini tools/paint-wells-core.js`, `paint-wells-activity.js`, `paint-wells-activity.html`. The manifest row STAYS in `cvc-builder-activities.json` (that file also carries row 111 and the repointed row 58); only this row's `tool` is repointed to `paint-wells-activity`. New metadata (slug, title, intro) for de es fr it pt nl sv da no (fi refused, §9).
- **worksheets it covers:** K-378 Digraph Sort sh/ch · G1-380 Which Letter Team Do You Hear? · G1-392 Missing Digraphs · G1-393 Read Digraph Words and Match · G1-394 Where Is the Digraph? · G1-311 Sound of the Week · G2-372 Digraphs in Sentences (Clue "Team jars" + "Sentence"); G1-244 / G1-258 / G1-259 / G1-260 / G1-291 / G1-301 / G1-303 / G1-304 the Write-the-Word family (Clue "Pour the word" with the Help setting); G1-333 Word Families with Blends (Pour the word, set B). Word-family reading (G1-306, G1-330, G1-332), syllable joining (G1-331, G1-334) are carried by Row 113 (The Freezing Floes) — listed there, not duplicated here.
- **what the old activity did:** a picture, three slots, six chunk tiles (sh, i, p + ch, f, t); tap chunks in order; EN only, 8 words. **Kept:** the EN words that are sound-boxes bank rows (ship, frog, flag, drum, crab — *sled* moves to the free-play tray; *clock* is not a bank row) and the designed distractors (sh↔ch, fr↔fl, dr↔tr). **Changed because it was wrong:** `chin` points at `body-parts/chin`, which does not exist — replaced by *chick* (a bank addition); ready-made chunk tiles ("fr", "sh") handed the child the very decision the standard is about — now every tile is ONE letter and the child decides which letters share a sound; the slot count was shown, which told the child "sh is one sound" before they thought.

## 1. The pitch
"Every letter is a drop of its own colour of paint: pour the letters of the picture's word into the wells, one well for each sound — two letters that make ONE new sound mix into one new colour, and letters that keep their own sounds refuse to mix."

## 2. Why a child will want it again (the fun)
- **Paint you can pour.** The letters sit in a row of little glass droppers, each letter a fat drop of its own colour (s blue, h yellow, f red, r violet…). Drag a dropper over a well and tip it: the drop falls in with a soft *plop* and the letter floats on the paint.
- **The stir.** Press Check — a little paddle sweeps along the wells and stirs each one. A well holding *s* and *h* swirls blue into yellow into GREEN — a brand-new colour, the *sh* sound — and the two letters lock side by side on the green. A well holding *f* and *r* will not mix: the paints turn round each other in stripes, and the well splits in two with a *plink*, because f and r each keep their own sound. Children pour silly pairs into one well just to watch what happens.
- **The word dries.** When every well is right, the paints dry into a strip of coloured tiles — the word's own colour code — and slide up under the picture like a label. Blends show as neighbouring colours; digraphs show as one new colour.
- **The colour shelf.** Each finished word's colour strip goes on a shelf; after a pass the child can see every *sh* is the same green, every *ch* the same orange, wherever it sat in the word — the letter team is a colour, not a position.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3 + worksheets):** spell and read words that begin (or end) with a consonant blend (fr, fl, dr, cr, sl, cl, tr, br — two sounds, said fast) or a consonant digraph (sh, ch, th, ck, wh — two letters, ONE sound); hear which letter team a word has; write the missing team; say where it is (start or end); find and count a team in a sentence.
- **Misconception 1 — a digraph is two sounds** (*ship* spelled and read as s-h-i-p). Two wells for s and h: on the stir, the two paints lean toward each other across the wall; at miss 2 the wall melts and they flow into one green well — and the extra well is left empty.
- **Misconception 2 — a blend is one sound** (*frog* with f and r in one well, or the r dropped: *fog*). Poured into one well, f and r refuse to mix: the well splits. Dropped altogether, the stir finds the word one colour short: a gap opens in the dried strip where the r's violet should be.
- **Misconception 3 — sh / ch / th confusion.** The tray always holds the near team's letters (ship: c as well as s; chick: s as well as c; tooth: s and c beside t). A wrong team mixes into the WRONG colour (ch is orange, sh is green) — the colour on the dried strip is not the colour the word needs, and at miss 2 the right colour glows beside it.
- **How the material pushes back:** the stir. Paint that mixes or refuses is physics, not a message.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 470):
- **Colour shelf** (top strip, 504 × 44): nine slots, each a thin dried colour strip (geometry); empty slots dashed.
- **The picture** (centre, y 56): the round's library picture **150 × 150** on a cream card (`#FFF8EC`, 3 px ink rim, radius 18); speaker 36 px beside it (TTS where reliable).
- **The wells** (y 226): a wooden palette rail 460 × 96 with **six** round glass wells, each **64 px** across, 12 px apart — always six, whatever the word (so the number of wells never says how many sounds). Empty wells are clear glass with a faint shine.
- **The droppers** (y 340): the tray — one dropper per letter, **56 × 72** (a glass dropper silhouette, geometry), the letter in Baloo 2 34 px, cream, on its drop colour. 7–8 droppers in one row (10 px gaps).
- **Colour code:** a fixed 26-colour letter palette tuned for contrast (letters keep their colour everywhere in the activity); team colours are separate, deeper hues (sh green `#2E9E5B`, ch orange `#E67E22`, th plum `#8E44AD`, ck slate `#4A6FA5`, wh teal-grey). Colour is NEVER the only cue: a mixed team carries a solid fill with an ink ring; an unmixed blend shows two clear stripes; letters are always printed.
- **Task line** above the stage (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): shelf 360 × 36; picture **112 px**; palette 344 × 72 with six wells **50 px** (hit area 52); droppers in two rows (4 + 4) at **52 × 64**; bubble under; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** picture 96 px, wells 46 px drawn on 48 px hit circles (6 × 46 + 5 × 6 = 306 ≤ 320 − 2×6), droppers 48 × 60; Check bottom ≤ 620.

No words on the apparatus: letters on droppers and in wells are the content.

## 5. The hand
- **Pour:** drag a dropper; the target well swells 1.08 under it; release: the drop falls (140 ms, *plop*) and the letter floats in the well. Or tap a dropper: it pours into the FIRST EMPTY well (left to right, 200 ms). To pour into a well that already holds a letter, the child must DRAG onto it (a tap never doubles up — so sharing a well is always a deliberate choice).
- **Two in one well:** the second drop lands beside the first and the two float side by side, UNMIXED (two colour blobs) until the stir. A well holds at most three letters (de *sch*).
- **Take out:** tap a letter in a well — it flies back to its dropper (180 ms). Drag a letter from one well to another to move it.
- **Stir = Check:** the paddle sweeps left to right (60 ms per well); each well resolves (§7). Mixing: a 420 ms swirl animation into the team colour; refusing: the two blobs circle once in stripes, then the well splits into two wells with a *plink* (the wells to the right slide over).
- **Free play:** between rounds the palette is a toy: pour any two letters into one well and stir — the paint shows whether they are a team in this language. (Free play is never graded.)
- **Undo:** everything until Check; after a miss nothing is cleared.

## 6. The rounds
Pass = 9 rounds. Two EN sets per clue (set A on pass 1, set B on pass 2, alternating; order reshuffled every pass, never the same order twice).

**Source rule (critic, binding).** The wells ARE a sound split, so every word's split comes from `mini tools/sound-boxes-bank-<loc>.json` exactly as the bank writes it (en `ship` = sh · i · p, `duck` = d · u · ck, `bell` = b · e · ll). Words this activity needs that the bank lacks are ADDED to the bank first, in the bank's notation, and read by the native reviewer (the Row 55 precedent) — never split in this activity's data. **en bank additions required before build** (pictures checked): chick ch·i·ck (farm-animals/chick), whisk wh·i·s·k (kitchen-tools/whisk), bench b·e·n·ch (furniture/bench), shelf sh·e·l·f (furniture/shelf), shrimp sh·r·i·m·p (ocean-life/shrimp), cheese ch·ee·s (at-the-supermarket/cheese; its final e is silent and left out of the boxes, as the bank already does for *mouse*), tooth t·oo·th (body-parts/tooth), mouth m·ou·th (body-parts/mouth), sloth s·l·o·th (zoo-animals/sloth). *ch* and *th* have NO bank row with a picture today (the bank's *chin* has no picture), so these additions are not optional. Below, * marks an addition.

**Clue "Pour the word" (default).** Tray = the word's letters + designed traps: **T** the near-team letter (c for an sh word, s for a ch word), **B** the near-blend letter, **V** a neighbouring short vowel, plus the h whenever the word has none (so c+h / s+h is always pourable). Wells used = the word's sounds; six wells always.

| set | word (picture) | sounds (wells) | tray traps |
|---|---|---|---|
| A | ship (vehicles/ship) | sh · i · p (3) | T c · V e · B l |
| A | fish (animals/fish) | f · i · sh (3) | T c · V e · r |
| A | chick* (farm-animals/chick) | ch · i · ck (3) | T s · V e · k |
| A | duck (farm-animals/duck) | d · u · ck (3) | h · V o · s |
| A | whisk* (kitchen-tools/whisk) | wh · i · s · k (4) | T c · V e · h is in the word · l |
| A | frog (camping/frog) | f · r · o · g (4) | B l · V u · h |
| A | flag (4th-of-july/flag) | f · l · a · g (4) | B r · V e · h |
| A | drum (music/drum) | d · r · u · m (4) | B t · V o · h |
| A | crab (beach/crab) | c · r · a · b (4) | B l · V e · h |
| B | sock (accessories/sock) | s · o · ck (3) | h · V a · l |
| B | ring (accessories/ring) | r · i · ng (3) | k · V a · h |
| B | bell (christmas/bell) | b · e · ll (3) | t · V a · h |
| B | bench* (furniture/bench) | b · e · n · ch (4) | T s · V i · k |
| B | shelf* (furniture/shelf) | sh · e · l · f (4) | T c · V i · t |
| B | shrimp* (ocean-life/shrimp) | sh · r · i · m · p (5) | T c · B l · V e |
| B | vest (accessories/vest) | v · e · s · t (4) | V i · k · h |
| B | lamp (furniture/lamp) | l · a · m · p (4) | V e · b · h |
| B | belt (accessories/belt) | b · e · l · t (4) | V i · d · h |

Set A: four digraph words (sh start, sh end, ch start, ck end), one wh + final-blend word, four initial blends; set B: final teams (ck, ng, ll, ch), two words with a digraph AND a blend (*shelf*, *shrimp*), three final blends (-st, -mp, -lt: the G1-333 "word families with blends" endings). *ll* is taught as ONE sound: the same colour poured twice into one well deepens rather than mixes (a doubled letter, one sound). **Measured** (`work-c23/m110.js`): a child who never shares a well (one letter per well) gets 4 of 9 in set A and 3 of 9 in set B — the pure-blend words — and nothing else; one who always shares the first two letters gets 2 + 2; one who pours one well per letter of every word never fills a team word right. Removed for cause: *brush* (its en label is "Paint Brush"), *stamp* (no `post-office/stamp` in the picture index), *clock* / *truck* / *dress* / *tent* / *desk* / *blocks* (not bank rows; nothing they teach is missing above).

**Clue "Team jars" (G1-380 hear it · G1-392 write it · G1-394 where is it · K-378 sort · G1-311 sound of the week).** The word is already poured except ONE empty well where its team belongs; three pre-mixed jars (sh green · ch orange · th plum) stand where the droppers were. Pour the right jar into the empty well. The empty well sits at the start or the end, so the child must hear WHERE the team is.

| # | word (picture) | strip (∅ = the empty well) | team · place |
|---|---|---|---|
| 1 | ship | ∅ · i · p | sh · start |
| 2 | shelf* | ∅ · e · l · f | sh · start |
| 3 | fish | f · i · ∅ | sh · end |
| 4 | chick* | ∅ · i · ck | ch · start |
| 5 | cheese* | ∅ · ee · s (the silent e sits after the last well as a hollow, paintless letter) | ch · start |
| 6 | bench* | b · e · n · ∅ | ch · end |
| 7 | tooth* (body-parts/tooth) | t · oo · ∅ | th · end |
| 8 | mouth* (body-parts/mouth) | m · ou · ∅ | th · end |
| 9 | sloth* (zoo-animals/sloth) | s · l · o · ∅ | th · end |

Team balance 3/3/3; place 4 start / 5 end. **Measured honestly:** every grade-1 *th* picture in the library ends in th (the th-initial pictures are *thermometer* and *theater* — 11- and 7-letter words, out of grade), so a child who has noticed "th comes at the end" can reach 5 of 9 by place alone (start → sh, end → th) against 3 of 9 by chance; the jar still has to be the right colour for the four start words and the two non-th end words. The thermometer row is removed (an 11-letter strip with r-controlled *er* twice is not a grade-1 decodable). **Sound of the week** (G1-311): the teacher can lock the jars to one team via the Help setting "One team" — every round then needs that team, with the place varying.

**Clue "Sentence" (G2-372):** a sentence on a paper strip; tap every word that holds *sh* — a drop of green runs into its sh letters; a drop also falls into a counting jar (geometry, one drop per find). Seven sentences, 2–4 sh each, never at the same place twice: "The fish swim past the big ship." (2) · "She has a red brush." (2) · "Shake the dish and wash it." (3) · "A sheep is in the shed." (2) · "Push the shell into the shop." (3) · "Shh! The fish is in a dish." (3) · "She shut the shed and the shop." (4). A tapped word without sh stays clear (no drop) — at miss 1 the clear word shows its letters' own colours, no green among them.

**Answer position.** Pour: the tray order follows a per-pass Latin square; the word's letters are never adjacent in spelling order (gate); each right letter's slot share ≤ 20 %. Team jars: the right jar's slot (left / middle / right) is 3/3/3 per pass and never the same twice running; the empty well's place is 4/5. Sentence: answers vary in count 2–4 and position.

**Order:** order-only reshuffle per pass.

**Other locales** (every word and split is a row of that locale's `sound-boxes-bank-<loc>.json`, picture checked; additions go into the bank first; one native + pedagogy reviewer checks every split). The core never uses a pair list: each word carries its bank split, so a pair mixes only where it makes one sound IN THAT WORD. **Consonants only:** vowel teams (nl oe/ui/aa, fr ou/oi, en oa/ee) are never poured here — they belong to Row 112 (The Talking Clasp), so the two instruments never test the same pair.
- **de** (bank): Fisch f·i·sch (three drops, one colour), Schiff, Schaf, Schal, Schuh, Schwein (Sch·w·ei·n — a team, a blend AND a vowel team), Buch, Milch, Elch (final ch), Glocke (Gl blend + ck), Kleid, Krug, Brot, Glas, Blume (initial blends), Socke, Jacke, Rock (ck), Netz (tz), Ball, Bett, Kamm, Tasse (doubled letters deepen). Two full sets. Initial st/sp (/ʃt/, /ʃp/) stay out — their s is not an s sound.
- **nl** (bank): schip s·ch·i·p (sch = s + ch, TWO sounds — the s refuses to mix with ch: the lovely trap), ring (ng), slak, vlag, klok (blends), melk, vork, lamp, wolf (final blends) — 9 rows, one set repeated in a fresh order.
- **fr** (bank): chat ch·a, chou, bouche b·ou·ch (ch), clé c·l·é (blend) — 4 consonant rows, under the floor: fr ships after bank additions (crabe, train, fleur, cloche, vache…, each read by the native reviewer); silent final letters (chat's t, bouche's e) get Row 58's **quiet well**: a hollow well that holds the letter but no paint. The ou/oi words stay in Row 112.
- **es** (bank): queso (qu = one sound, the u does not mix as a vowel), perro, gorro, carro, burro (rr), gallo, silla, pollo, llave (ll), leche (ch) — 10 rows. The bank writes es blends as syllables (*fre·sa*, *glo·bo*), so es Pour teaches teams only.
- **it** (bank): chiave (ch), pesce (sc), agnello (gn + ll), treno (t·r blend), gatto, palla, penna, mucca (doubles) — 8 rows, one set, repeated fresh.
- **pt** (bank): chave (ch), ninho (nh), olho, folha, ovelha (lh), carro, burro (rr) — 7 rows, the minimum.
- **no** (bank): fisk, hest, gris, melk, sko (blends), katt, penn, buss (doubles), ring (ng) — 9. (*hund* and *brød* carry a silent d — skipped.)
- **sv** (bank): katt, hatt, tupp, lamm, mugg, dörr (doubled consonants) — 6 rows, under the 7 floor. sv ships only after bank additions read by the native reviewer: *sked* sk·e·d (sk before e is ONE sound) beside *sko* s·k·o (two sounds) — the paint shows the sj-sound rule — plus *krabba*, *klocka*, *trumma*. Until then sv is hidden (the gate refuses < 7).
- **da** (bank): gris, fisk, glas, krus, sko — 5 rows, no team rows; hidden until additions (`policy_managed:false` words only).
- **fi: NOT shipped (refusal recorded).** Finnish spelling has no consonant digraphs to teach (ng/nk are taught as long sounds) and native words do not begin with blends.
Each shipped locale needs ≥ 7 Pour words per set (a locale with one set repeats it in a fresh order) and 9 Team-jar words over its own team set (de sch/ch/ck, nl ch/ng, es ch/ll/rr…), drawn from the same bank.

## 7. Check, the misses, the success
- **Check with nothing poured:** hint, no miss — the first well glows — "Say the word slowly. Pour one well for each sound." (A word that is merely short of letters is stirred like any other — a hint there would give the sound count away.)
- **Miss 1:** the stir runs. Right wells dry to their colour; a wrong letter's well clouds grey and the letter rises to the surface, ringed coral; a blend poured into one well splits into two (they stay, now correct as two wells, but the split is shown with a little crack mark); a team poured into two wells: the two paints LEAN toward each other across the wall and stop. · "Some wells did not dry. Say the word slowly and listen to each sound."
- **Miss 2:** for the leaning pair, the wall between them melts and they flow into one well of the team colour — then the paddle waits for the child to Check again (they still must move the letters; the extra empty well pulses); for a wrong team colour, a ghost drop of the right team's colour hovers beside it; for a wrong letter, the tray dims every dropper except TWO (the right one and the one chosen). · "Two letters, one sound — they share one well." / "Listen: is it this sound or that one?"
- **Miss 3+:** a ghost letter (25 % ink) in the well to copy; the child still pours.
- **A new pour takes the help away** until the next Check.
- **Success:** every well swirls to its colour, the paint dries into a tile strip that slides up under the picture and reads the word; the picture does a small hop; the strip flies to the shelf. · "{sh}–{i}–{p}: {ship}! The {sh} made one new sound." (for blend words: "{f}–{r}–{o}–{g}: {frog}! {f} and {r} kept both their sounds.") · Team jars: "{tooth} ends with {th}!" / "{chick} starts with {ch}!" · Sentence: "{3} words with {sh}!"

## 8. Settings
1. **Clue:** Pour the word (default) · Team jars · Sentence — each visibly different at rest (droppers + six empty wells / a poured strip with one empty well and three jars / a sentence strip with a counting jar).
2. **Help** (the Write-the-Word family): Every clue (default for Pour: the picture + the first letter pre-poured and locked — G1-258/G1-303) · Picture only (no letter given — G1-244/G1-260/G1-304) · Word bank (a card of four written words pinned beside the picture — the word + three of the same pattern; G1-259/G1-301) · Keyboard (droppers replaced by the locale alphabet, typing pours into the first empty well; long-press a letter to pour it into the previous well — G1-260 plain lines) · One team (Team jars only: the teacher picks sh, ch or th — G1-311). Visible at rest.

## 9. Words (EN source)
- title (shell, frozen): **Build Blend and Digraph Words** · instruction: "Pour one well for each sound. Two letters that make one sound share a well."
- task lines: pour — "Pour the letters for the picture — one well for each sound." · team jars — "Which letter team is missing? Pour the right paint into the empty well." · sentence — "Tap every word with sh."
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drag a letter into a well. Try two in one well and press Check!"
- settings: "Clue", "Pour the word", "Team jars", "Sentence", "Help", "Every clue", "Picture only", "Word bank", "Keyboard", "One team". aria: "Picture: {name}", "Well {n}: {letters|empty}", "Dropper {letter}", "Jar {team}", "Well {n} mixed: {team}", "Well {n} split: two sounds", "{n} words with {team} found".

**Locale traps:**
- **A team is a team only in its word.** sv *sk* (one sound in *sked*, two in *sko*), nl *sch* (two sounds), es *qu* (one sound, u silent), de initial *st/sp* (refused): the grapheme split lives per word; the gate checks it against its own per-locale table.
- **Doubled letters** (ss, ff, ll, ck, tt in de/sv/da/no/it): one sound, one well — the same colour twice deepens.
- **German capitals:** the first letter of a noun is a capital dropper; its colour is the lowercase letter's colour.
- **Alphabets:** keyboard order per locale (sv/fi å ä ö at the end; da/no æ ø å; de ä ö ü ß; es ñ; it's 21-letter school alphabet with j k w x y in a second row).
- **Danish:** `policy_managed:false` words only.
- **Labels with traps:** the library brush is a PAINTBRUSH — its de/nl/sv/da/no/fi/fr/es/it/pt labels name a scrubbing brush (picture ruling 2026-10-17), so *brush* is EN-only; there is no `post-office/stamp` in the picture index at all, so *stamp* is not used; `christmas/chimney` is drawn as a fireplace and is never used.
- **Colour-blind safety:** letters are always printed; a team = solid fill + ink ring, a blend = two stripes + a crack mark.
- **Sound off:** the stir, the colours, the splitting well and the strip carry every verdict; TTS is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** the picture is the prompt; mixing and splitting show one-vs-two sounds; colour + ring/stripe patterns show which team; the dried strip shows the word.
- **Keyboard:** Tab through droppers; Enter pours into the first empty well; Shift+Enter pours into the last filled well (share); Tab to a well, Delete returns its last letter; Space = Check; Team jars: Tab to jars, Enter pours into the empty well; Sentence: Tab through words, Enter taps.
- **aria-live:** "Well 1 mixed: sh, one sound." / "Well 1 split: f and r are two sounds." / "ship. Well poured!"
- **Taps:** wells ≥ 48 px hit, droppers ≥ 48 × 60, jars 64 px; picture 150 / 112 / 96 px.
- **Phone layout:** stacked; droppers in two rows; Check above the 360 × 740 and 320 × 640 folds (measured on every round, including the 5-sound *shrimp*).

## 11. Distinct from
- **Row 58 The Word Elastic:** stretches a band into beads, team TILES are given ready-made, and a team bead refuses two singles. Here there are NO ready-made team tiles: the child decides to share a well, and the evidence is chemical (mix vs refuse), plus blends are the other half of the lesson.
- **Row 112 The Talking Clasp (this batch):** VOWEL teams only, clasped by hand in a fixed ORDER (oa locks, ao does not) into a tile whose talker letter lights the long sound it says, plus the same-sound/other-spelling choice; here CONSONANTS only (no vowel team is ever poured), and the question is one sound or two, answered by colour.
- **Premium `letter-tiles` / `blending-board`:** magnetic letters and flick cards; no colour mixing, no one-vs-two-sound physics.
- **New 225 Sorting Cabinet, New 216 Vowel Keystone:** sort and build arches; no paint.
- **Built registry:** no paint, wells or mixing exist.

## 12. Build plan
- **Core state** `{locale, clue, help, set, round:{word, pic, graphemes:[g], kinds:['team'|'single'|'double'], traps:[letter], emptyIdx|null, sentence|null}, wells:[[letter]], misses, help}`.
- **Functions:** `pour(dropperId, wellIdx|'next')`, `take(wellIdx, k)`, `move(wellIdx, k, toWell)`, `stir()` → per well `{state:'ok'|'wrongLetter'|'split'|'lean'|'wrongTeam'|'empty'}`, `pourJar(team)`, `tapWord(i)`, `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-paint-wells-core.js`): its OWN per-locale grapheme table (en: sh ch th ck wh ng ss ll ff + single letters; per locale §6) re-splits every word and asserts the split equals BOTH the manifest's and the word's `sound-boxes-bank-<loc>.json` row (read from the file — a word missing from the bank fails the gate); the concatenation equals the spelling; every tray holds each needed letter once and at least one near-team or near-blend trap; the tray never reads the word in order; slot shares ≤ 20 %; jars 3/3/3 and places 4/5; every sentence's sh count equals the gate's own count of words containing "sh"; every picture exists, is a colour theme and its label equals the word; `chin`, `chimney`, `brush`, `stamp`, `thermometer` never referenced; sv/da rows absent until their bank rows exist; fi rows absent; the never-share bot ≤ 4/9 per set.
- **Mutations (one per rule):** let f+r mix · let s and h in two wells pass · accept ch for sh · show the six wells as the word's count (fewer wells) · let a tap pour into a filled well · put the jars always sh-ch-th · count a non-sh word in a sentence · keep the help after a new pour · ss mixing into a new colour instead of deepening · use a pair list so sv *sko* mixes.
- **Pictures:** critic 2026-10-17 — `post-office/stamp` is NOT in the index (removed); `around-the-house/brush`'s en label is "Paint Brush" (removed); still to view: furniture/shelf, ocean-life/shrimp, zoo-animals/sloth, accessories/ring, furniture/lamp. Designer: seen 2026-10-17 (`work-23/s110.png`): ship, chick, shirt, shoe, fish, brush (a PAINTBRUSH), mouth (open lips with teeth), watch, bench, couch, chair, cheese, chimney (a FIREPLACE — refused), church, whistle, whisk, thermometer (a digital thermometer), drum, dress, truck, star, stamp (a POSTAGE stamp), skirt, glove, crown, broom, grass, sled, clock, frog, flag (US), crab ×2, shovel, snowman, scarf ×2, spoon, stool, bread. Still to view: camping/tent, classroom/desk, toys/blocks, body-parts/tooth (seen in s109 — fine).
- **Risks:** colour palette distinctness for 26 letters (use letter + colour, not colour alone; tested under deuteranopia simulation); the five-sound *shrimp* uses five of the six wells — measured at 320.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — pouring paint and watching two colours become a new one is irresistible, and a well that refuses and splits is funny.
2. **Would a teacher put it on the board?** Yes — "sh is a brand-new sound, like blue and yellow make a brand-new green; f and r stay f and r" is a picture a whole class remembers, and the child, not the tile set, makes the one-sound/two-sounds decision.
3. **Would a parent trust it?** Yes — library pictures, each language's own letter teams (with the Swedish and Dutch traps handled honestly), calm, nothing sold.
4. **The invention:** paint wells where two letters that make one sound mix into one new colour and letters that keep their own sounds refuse to mix.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 3→5 · reality 2→5
What changed:
- Every split now from the bank; the en bank has NO ch/th row with a picture, so nine bank additions (chick, whisk, bench, shelf, shrimp, cheese, tooth, mouth, sloth) are listed as a build prerequisite.
- Removed: post-office/stamp (not in the picture index), brush (en label "Paint Brush"), clock/truck/dress/tent/desk/blocks (not bank rows), the 11-letter thermometer jar round, nest (holds chicks → vest).
- Pour sets re-cut so "never share a well" wins only 4/9 and 3/9 (measured, `work-c23/m110.js`); Team-jar place bias measured and stated (th is word-final in every grade-1 library picture: 5/9 by place vs 3/9 chance).
- Collision with Row 112 removed: 110 is CONSONANTS only, vowel teams never poured. Locale lists re-sourced from the banks; sv (6 rows), da (5), fr (4 consonant rows) hidden until bank additions.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
