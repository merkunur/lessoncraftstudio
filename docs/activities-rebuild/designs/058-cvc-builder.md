# Row 58 — The Word Elastic (RF.K.3)

## 0. Identity
- **id** `cvc-builder.build-cvc-word.rf-k-3` (KEPT; slug, title, intro frozen) · grade K · Common Core **RF.K.3** (apply phonics: encode and decode CVC words) · strand Reading: Foundational Skills.
- **files (key `word-elastic`)** `mini tools/word-elastic-core.js`, `word-elastic-activity.js`, `word-elastic-activity.html`. The manifest row STAYS in `cvc-builder-activities.json` (that file also carries rows 110 and 111, which keep the old engine until their own rebuild); only this row's `tool` is repointed to `word-elastic-activity`. New metadata (slug, title, intro) for the 10 locales that have none: de es fr it pt nl sv da no fi.
- **worksheets it covers:** K-231 Build the Word · K-318 Sound Boxes · K-329 Count the Sounds · K-330 First Sound Given · K-224 Missing Sound · G1-244 Write the Word · G1-258 First Letter Given · G1-259 Word Bank, No First Letter · G1-260 Plain Lines · G1-291 Only the First Letter · G1-301 Word Bank and Letter Boxes · G1-303 Letter Boxes and the First Letter · G1-304 Every Clue · G1-312 Sound Strip: How Many Sounds? · G1-314 Blend the Sounds.
- **what the old activity did:** a picture, three empty slots, seven letter tiles; tap letters in order; EN only, 20 words. **Kept:** the EN word list (with the fixes below), tap-to-place as a second gesture beside drag, the "3 right + 4 other" tray. **Changed because it was wrong:** `sun` pointed at `weather/sun`, which does not exist (the library's sun is `beach/sun`); `fox` was taught as a 3-sound word (x = /k/+/s/, four sounds) — moved out of the pool; distractors were random letters (cat: d r o s) — every tray now carries designed traps (a neighbouring short vowel, a mirror letter, a second vowel); the slots were dead boxes — they are now the beads of an elastic the child stretches and lets go.

## 1. The pitch
"You stretch the word like an elastic to hear its sounds one by one, put one letter on each bead, and let go — the beads snap together into the word, and a bead with the wrong sound gets kicked out of the line."

## 2. Why a child will want it again (the fun)
- **An elastic you can pull.** A fat coral elastic band lies across the stage between a peg and a round knob. Grab the knob and pull: the band stretches with real rubber give (resistance grows with distance), and as it passes each notch a bead pops out of the band with a soft *plip* — the word coming apart into its sounds, exactly the way a teacher says "stretch it out: c…a…t".
- **The snap.** Let go (or press Check) and the band whips back. The beads race together and clack into one word tile with a satisfying *thwack* — blending the sounds back together IS the release of the band. Children pull and release an empty band just to feel it; that is allowed any time (free play).
- **The kick.** If a bead holds a letter whose sound is not in that place of the word, the band snaps but that bead is flicked up out of the line on a little loop of elastic and hangs there wobbling. Funny, not shaming — and it says exactly WHERE the problem is.
- **The tag and the shelf.** A correct word flies up as a luggage tag and hooks onto the picture's corner; the picture does a happy hop. Each finished picture glides to a **word shelf** across the top; after nine rounds the shelf is a row of nine labelled pictures the child spelled — a little museum they built. Tapping any shelf picture re-opens its band for a free stretch and snap.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.3 + the worksheets):** say a picture word slowly, segment it into its sounds in order (one bead per sound; two letters for one sound share one bead), map each sound to its letter, blend the sounds back into the word; complete words with a given first sound or one missing sound; spell with a word bank, with letter boxes, on a plain line; count the sounds; read a stretched word by blending it.
- **Misconception 1 — the vowel guess** (cat spelled *cet*, *cit*). Every tray holds the word's vowel's nearest neighbour (a↔e, e↔i, i↔e, o↔u, u↔o). The kicked bead is the middle one, so the child learns the middle sound is the one to listen hardest for.
- **Misconception 2 — order** (*tac*). All three letters are right but the first and last beads are kicked out together: the same letters in the wrong places are not the word.
- **Misconception 3 — mirror letters.** b/d, p/b, n/u, m/w sit in trays as traps (bed holds p; mug holds w).
- **Misconception 4 — one letter per sound** (letter-team level). For *ship* the band has three beads; a child who lays s and h on two beads has no bead left for p; the snap kicks both, and at miss 2 the first bead widens with an under-curve: two letters, one sound.
- **Misconception 5 — skipping the vowel** (*ct*, the classic K spelling). The band never closes over an empty bead (Check with an empty bead = a hint, no miss): the empty socket in the middle of the band is visible.
- **How the material pushes back:** the band's snap IS the check; only beads whose letter is the sound in that place clack home. Nothing is said that the band does not show.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504 wide), bubble column right (176). Below 700: stacked.

**At 704 px** (stage 504 × 470):
- **Word shelf** (top strip, 504 × 56): nine small slots (44 × 44 picture thumbnails, each with its tag as a short ink line); empty slots are dashed rounded squares. Progress the child can see, never a score.
- **The picture** (centre top, y = 70): the round's library picture **150 × 150** on a cream card (`#FFF8EC`, 3 px ink rim, radius 18). A speaker button (36 px) beside it speaks the picture's name (TTS where available).
- **The elastic** (y = 260): left **peg** (ink circle 28 px) at x = 40; the **band** (coral `#F2784B`, 14 px thick, rounded, 2 px darker edge) runs to the **knob** (teal `#146B5E` circle 56 px with a grip ring). At rest the knob sits at x = 140 and the beads are packed inside the band as one dark bar. Fully stretched, the knob reaches x = 460. **Beads**: cream circles **72 px**, 2.5 px ink outline, evenly spaced on the band; a filled bead shows its letter in Baloo 2, 44 px, ink. Notch ticks (8 px) on a faint rail under the band show where beads appear. Four-bead words (es/it/pt/fi) use 64 px beads; a letter-team bead is a 96 × 72 pill.
- **The tray** (bottom, y = 380, 504 × 76): seven letter tiles **60 × 64** (radius 12, cream, ink letter 36 px) in one row, 10 px gaps. Letter-team tiles (sh, ck…) are 84 × 64.
- **Task line** above the stage (Nunito 22 px, ≤ 2 lines). **Bubble** in the right column (hint/celebration), Check under it.

**At 360 px** (stacked): shelf 360 × 40 (thumbnails 32 px; the shelf scrolls inside itself, never the page); picture **112 px** (above the 64 floor because it is the only prompt); elastic spans x 24 → 336, beads **60 px** (52 px for four-bead words, 76 × 60 for team pills), knob 52 px; tray in **two rows** (4 + 3) of tiles 64 × 56; bubble under the tray; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** picture 96 px, beads 52 px (46 px drawn for four-bead words on a 52 px hit circle), tiles 60 × 52, Check bottom ≤ 620.

No words on the apparatus: the only characters on stage are letters on beads and tiles (the content) and the finished word tag.

## 5. The hand
- **Stretch:** drag the knob right. The band follows the finger with rubber lag (the band thins 14 → 9 px as it stretches). Crossing a notch pops the next bead out of the band (scale 0 → 1.15 → 1, 160 ms, a short rising *plip*). In fixed modes the band stops at the round's bead count (a soft bump; the knob will not go further — 80 ms spring). Letting go while the beads are EMPTY lets the band relax back (free play, no check, 300 ms with overshoot).
- **Place a letter:** drag a tile onto a bead (the bead swells 1.08 under the finger), or tap a tile — it flies to the first empty bead, left to right (200 ms). If the band is shut when a tile is dropped on it, the band springs open to its bead count by itself (the child is never blocked). A filled bead accepts a new tile (the old one flies back to its tray slot). Tap a filled bead to send its letter home. Placed letters keep the band stretched.
- **Check = let go.** Press Check, or drag the knob back past half-way: the band snaps (280 ms ease-in, 6 % overshoot, *thwack*). Results in §7.
- **Blend mode:** the band arrives stretched with letters on its beads; the child pulls the knob home slowly; a thin read-line under the band lights each bead as it slides past (left to right), so the child says each sound as the beads close; at shut the word tile forms; the child then taps one of three pictures.
- **Keyboard mode ("Write it"):** the tray becomes a full alphabet keyboard in the locale's order; typing fills the first empty bead; Backspace empties the last filled bead.
- **Free play:** between rounds and on any shelf picture: stretch and snap freely; letters on a finished band can be swapped to watch the band kick them (the finished word is restored when the shelf view closes).
- **Undo:** every placement is reversible until Check; after a miss every tile stays where it was so the child fixes, not restarts.

## 6. The rounds
One round = one picture word. Pass = 9 rounds. Two settings (Clue × Words) shape the board.

**EN pool, Words = "3 sounds"** — two sets of 9 (pass 1 set A, pass 2 set B, then alternate; order reshuffled every pass). Tray = the word's 3 letters + 4 traps: **V** neighbouring short vowel, **V2** a second vowel, **M** mirror/look-alike consonant, **C** a consonant that is never an alternative spelling of a sound in the word (never k for c, s for c, ck, x, q).

| set | word | picture (theme/noun) | traps V · V2 · M · C |
|---|---|---|---|
**Source rule (critic, binding):** every word's sound split comes from `mini tools/sound-boxes-bank-<loc>.json` (en stage s1 = 3 sounds, s2 = letter teams) — never authored by the build. A bank row whose picture reference is broken is re-pointed to an existing library picture of the same thing (the bank's `weather/sun` → `beach/sun`; `kitchen tools/pan` → `around-the-house/pan`, because the kitchen-tools pan is drawn as a pot) or dropped (en `lip`, `chin`: no picture in the library). The old row's `bus`, `fan`, `fig`, `map`, `fox` are not bank rows and leave the pool.

| set | word | picture (theme/noun) | traps V · V2 · M · C |
|---|---|---|---|
| A | cat | animals/cat | e · o · d · g |
| A | hat | accessories/hat | e · o · n · p |
| A | hen | farm-animals/hen | i · a · m · r |
| A | net | beach/net (a fishing net — seen) | i · a · m · l |
| A | pig | animals/pig | e · u · b · d |
| A | mop | around-the-house/mop (seen) | u · a · b · n |
| A | log | camping/log (seen) | u · a · d · p |
| A | cup | around-the-house/cup (a teacup — seen) | o · a · q · m |
| A | mug | kitchen-tools/mug | o · a · w · n |
| B | bag | at-the-supermarket/bag | e · o · d · p |
| B | van | vehicles/van | e · i · w · m |
| B | bed | around-the-house/bed (seen) | i · a · p · t |
| B | pen | around-the-house/pen (a click pen — seen) | i · a · b · m |
| B | pig | animals/pig | e · a · q · t |
| B | pot | around-the-house/pot (a cooking pot — seen) | u · a · b · d |
| B | dog | animals/dog | u · a · b · t |
| B | sun | beach/sun | o · a · m · z |
| B | jug | kitchen-tools/jug | o · a · p · d |

Vowel balance: set A a2 e2 i1 o2 u2; set B a2 e2 i1 o2 u2 — every short vowel in both sets. `pig` is the bank's only short-i word with a picture (the bank's `lip` has none), so it sits in both sets with different traps. **Reserve** (blend "other" pictures and bank cards — pictures only, never built): pan (around-the-house/pan, a frying pan), bat (animals/bat — on a card the animal IS the word's meaning), cap, rug, jam, can, ham, bun. **Refused everywhere:** `fox` (x writes TWO sounds, /k/ + /s/ — never a 3-sound word), `egg` (at-the-supermarket/egg is a carton of three; easter/egg is painted), kitchen-tools/pan (drawn as a pot).

**Words = "letter teams" (EN, 8 rounds — every en bank s2 row with a usable picture):** fish (animals/fish) f·i·**sh** · ship (vehicles/ship) **sh**·i·p · duck (animals/duck) d·u·**ck** · sock (accessories/sock — seen) s·o·**ck** · rock (camping/rock, a boulder — seen) r·o·**ck** · lock (around-the-house/lock, a padlock — seen) l·o·**ck** · ring (accessories/ring — seen) r·i·**ng** · bell (christmas/bell) b·e·**ll**. (The bank's `chin` has no picture and `egg` is the carton — both out; `chick` is not a bank row.) Team position: front 1 (ship), end 7 — not balanced on purpose: the end team is where children drop a letter, and where the pill bead teaches most. Tray: the word's tiles (team tiles double-width) + the team split into single letters (s and h / c and k / n and g / l) + one neighbouring vowel. A team bead accepts only its team tile — two single letters can never share a bead.

**Clue setting — what each round looks like (same word lists):**
1. **Letter beads** (K-231, K-318, G1-301 boxes): band shut, beads = sounds, tray 7.
2. **First sound given** (K-330, G1-258, G1-291, G1-303): bead 1 filled and locked (teal rim), tray 6 (the 2 remaining letters + 4 traps).
3. **One sound missing** (K-224): two beads filled and locked; the empty bead is the middle in 4 of 9 rounds, the last in 3, the first in 2; tray 4 (the right letter + V + M + C).
4. **Word bank** (G1-259, G1-301): a bank card of 4 written words pinned at the stage's right (the round's word + 3 reserve words of the same shape, e.g. bag · bug · big · bed); the child finds the word that names the picture and builds it with the tray. The bank card is reading support, not a tile source.
5. **Write it** (G1-244, G1-260, G1-304): keyboard instead of tray; the band shows its beads (letter boxes). Sub-option **"Stretch it yourself"** (G1-260 plain line, G1-312): the band has no stops — every notch up to 6 adds a bead; the child types the letters too, so this is a SPELLING task in which the bead count is the child's own segmentation. (Pure counting without spelling belongs to New 214 The Bumpy Slide, which also covers K-329.) Too many beads: at the snap the beads clack together and the empty one is squeezed out of the line like a pip (it pops off the band and rolls away). Too few: the beads cannot clack together — a gap stays open between the two beads where a sound is missing, and the band hangs slack there until the child pulls out one more bead.
6. **Blend and find** (G1-314): the band arrives stretched and lettered (set A/B words); three pictures under the band: the word plus two words that differ from it by ONE letter where the library has them (cat · hat · can; hen · pen · net; sun · bun · bus; pot · pan · pen; mug · jug · rug; bag · bed · bus is NOT allowed — when no one-letter neighbour exists, the third picture shares the first letter: pig · pen · pot). Gate: exactly one picture's locale label equals the blended word.

**Answer position.** Tray: the 7 slots follow a per-pass Latin square so each right letter visits each slot; the three right letters are never adjacent in word order (gate: no tray where c-a-t reads left to right; any right letter's slot share ≤ 20 % over a pass). Missing-bead position balanced 4/3/2 as above. Blend: right picture slot 3/3/3 per pass. Word bank: the round's word sits in each of the 4 bank rows at most 3 times per pass.

**Order:** order-only reshuffle per pass (never the same order twice; the shelf fills in the order played).

**Other locales** (the build authors each list; the native reviewer checks every split). Source = `mini tools/sound-boxes-bank-<loc>.json` (already per-locale phoneme splits) intersected with the library, re-checked: words where every sound is one letter or one letter team. Bead count follows the language (every word below is a bank row; the build re-points any broken picture as in the source rule): **3 beads** en, de (Hut, Bus, Wal, Bär, Fuß, Tor → around-the-house/gate), nl (vis, zon, kat, pen, sok, bus, mok, kip), sv (sol, mus, hus, ris, räv, lök, val, får), da (sol, hus, kat, mus, bus, ris, hat, sko), no (sol, bil, hus, mus, lam, gås, sko); **4 beads** for the CV-CV languages es (mapa, nido, pera, foca, nube, vaso, lobo, rana), it (mano, naso, vaso, lupo, pane, fico, riso), pt (rato, sapo, dedo, bolo, vela, luva), fi (susi, käsi, muki, lasi, vene, auto — au is two vowels in two beads, as the bank says; ovi = 3 beads; the bank's `poro` is dropped: there is no reindeer picture) — fi has 7, so its set repeats in a fresh order; fr uses 3-sound words plus a **quiet bead** (§9). Each locale needs ≥ 9 words per set; with 7–8 the set repeats in a fresh order; under 7 the gate refuses.

## 7. Check, the misses, the success
- **Check with an empty bead** (or the band shut with nothing placed): hint, no miss — the empty bead pulses — "Every bead needs one sound. Say the picture's name slowly."
- **Miss 1:** the band snaps; every correct bead clacks home; each wrong bead is flicked up out of the line on a loop and hangs wobbling with a coral rim; the band stays half-stretched so the child can swap. · "That bead's sound is not in this word. Say the word slowly and listen for each sound."
- **Miss 2:** the wobbling bead grows a **place arrow** under it (first / middle / last: an ink triangle on the rail) and the tray dims every tile except **two**: the right one and the one the child chose. For an order miss the two lit tiles are the two swapped letters, each shown with its own bead's arrow. · "Listen for the {first|middle|last} sound. Is it this one or that one?" (the two tiles pulse in turn).
- **Miss 3 and after:** a ghost letter appears in the bead (25 % ink) to copy — the child still places the tile.
- **Letter teams, miss 2:** when two single letters sit where one team belongs, the first bead widens into a pill with an under-curve and the two letters slide inside it side by side; the extra bead empties · "Two letters can make one sound. They share one bead."
- **Stretch-it-yourself count misses:** too many → the empty extra bead is squeezed out and rolls off · "One bead had no sound." Too few → the band hangs slack with a gap between two beads · "A sound is missing here. Pull out one more bead."
- **A new move takes the help away** (arrows and dimming vanish) until the next Check.
- **Success:** the band snaps shut, the beads clack into one word tile (gaps close, 160 ms), a *thwack* and a rising two-note chime; the tag flies up and hooks onto the picture, the picture hops, then both glide to the shelf. · "{c}–{a}–{t} … {cat}! You stretched it and snapped it back together." (sounds written with dashes, then the word; TTS reads it where available).
- **Blend success:** "{s}–{u}–{n} makes {sun}!" and the chosen picture gets the tag.

## 8. Settings
1. **Clue:** Letter beads (default) · First sound given · One sound missing · Word bank · Write it · Stretch it yourself · Blend and find — each visibly changes the board at rest (locked beads, the bank card, the keyboard, a stop-less band, a lettered band with three pictures).
2. **Words:** 3 sounds (default; "Short words" in es/it/pt/fi) · Letter teams (fi: Long sounds; hidden in da, whose bank has no team rows) — visible as the wide team tiles in the tray (fi: the board opens stop-less, the band's notch rail runs to 6).

## 9. Words (EN source)
- title (shell, frozen): **Build the CVC Word** · instruction: "Stretch the word, put one letter on each bead, then let go."
- task lines: letter beads / first given / missing — "Stretch the word and give each sound its letter." · word bank — "Find the word in the bank, then build it on the elastic." · write — "Type one letter for each sound." · stretch yourself — "Pull out one bead for each sound you hear, then type the letters." · blend — "Close the elastic slowly and read the word. Which picture is it?"
- hints and celebrations: §7 exactly. One first-time nudge: "Pull the knob to stretch the word." (once per visit, if the board is untouched; never a timer).
- settings: "Clue", "Letter beads", "First sound given", "One sound missing", "Word bank", "Write it", "Stretch it yourself", "Blend and find", "Words", "3 sounds", "Short words", "Letter teams", "Long sounds". aria: "Picture: {name}", "Bead {n} of {total}: {letter|empty}", "Elastic stretched", "Elastic snapped shut", "Bead {n} kicked out".

**Locale traps:**
- **Not every language is CVC.** es/it/pt/fi picture words are CV-CV; their first Words setting is "Short words" with 4 beads, and their new page title/intro must not promise "three-letter words" (en metadata stays frozen).
- **fr silent letters:** chat, lit, nid end in letters with no sound. The band gets a small hollow **quiet bead** after the last sound bead: it holds a letter but makes no *plip* and is never counted as a sound; the count and stretch modes ignore it. Silent-letter words appear only in the second set (the panel names it, e.g. "Lettres muettes et équipes"), so the first set stays transparent (bol, lac, sac, bus).
- **Letter teams are per language:** de sch, ch, ck, tz, doubled ll/mm/ss as one sound (Fisch, Schaf, Buch, Bett); nl ch, ng, oe, ui, aa/oo, ij (boek, ring, muis, vijg); sv doubled consonants (katt, hatt, tupp, lamm, mugg, dörr — the bank's `ägg` is the carton picture and `läpp` has no picture); no doubled consonants and ng (katt, penn, buss, ring); **da has no team rows in its bank** (its K-1 pool is orthographic and transparent), so da hides the setting; es ch, ll, rr, qu (leche, silla, perro, queso); it ch, gn, sc and doubled consonants (chiave, gatto); pt ch, lh, nh, rr (chave, folha, ninho, carro); fr ch, ou, oi (chou, loup, poire). **fi has no letter teams — the FINNISH RULING (critic, binding for 058 and 214):** Finnish first-grade spelling teaches *pitkä äänne kirjoitetaan kahdella kirjaimella* — a long sound is written with TWO letters, one letter per box, which is exactly how `sound-boxes-bank-fi.json` splits it (kuu k|u|u, kukka k|u|k|k|a: "kirjoita kirjain kahdesti"). The bank is the authority; nothing is re-split. So fi's second setting **"Long sounds"** (pitkät äänteet: kuu, suu, kukka, kuppi, pallo, kettu, sukka, lippu — 8 bank rows, all with pictures) gives a long sound TWO beads, linked by a short teal **length bar** under them (the visible mark of one long sound), each bead holding the same letter. The setting runs as *Stretch it yourself* (no stops), because stops would give the length away: a child who hears *kuu* as short pulls out two beads (k-u), and at the snap the band hangs slack with a gap — one more bead; the linked pair and its length bar appear on success ("k–u–u: pitkä uu, kaksi u-kirjainta"). This is the core Finnish spelling error (*ku* for *kuu*, *kuka* for *kukka*), so the material pushes back on the right thing. Counting (sound strip) in fi uses only the short-word set, where letters = sounds and no length question arises.
- **German nouns are capitalised:** the first bead of a de word takes a capital tile (the tray's first-sound letters and their traps are capitals, the rest lowercase); the finished tag reads "Hut".
- **Keyboard order and extra letters:** sv/fi …x y z å ä ö; da/no …æ ø å; de ä ö ü ß as their own keys; es ñ; it shows its 21-letter school alphabet with j k w x y in a smaller second row.
- **Danish:** only `policy_managed:false` words (the K-1 orthographic pool); soft d and silent letters keep several picture words out.
- **Picture labels** come from `image-vocabulary.js`; a word is used only if its locale label is exactly that short singular spelling: sv "ben" is refused (leg/bone), nl "mok" for the mug is confirmed by the panel.
- Sound off: the band, the kicked bead and the place arrow carry every message; TTS (picture name, the sounds, the word) is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** the picture is the prompt; the beads show the count; the kick shows the place; the arrow shows which sound; the two lit tiles show the choice.
- **Keyboard:** Tab to the knob, Right/Left arrows stretch/relax one notch; Tab through tiles, Enter places a tile in the first empty bead; Tab to a bead, Delete empties it; Space = Check (let go); Blend: arrows close the band, Tab to pictures, Enter.
- **aria-live:** "Bead 2 kicked out: the middle sound." / "cat. Well built!"
- **Taps:** beads ≥ 52 px hit circle, tiles ≥ 52 × 56, knob 52 px; every target ≥ 44 px.
- **Pictures:** 150 px at 704, 112 px at 360, 96 px at 320; blend pictures 104 px at 704, 80 px at 360.
- **Phone layout:** stacked; tray in two rows; shelf thumbnails shrink; Check above the 360 × 740 and 320 × 640 folds (measured in local-test on every round, including four-bead and team rounds).

## 11. Distinct from
- **Premium `letter-tiles`** (magnetic letters on a board) and **`blending-board`** (flick letter cards, sweep to blend): no elastic, no segmenting by stretching, no snap check; here the check is the band's physics.
- **Premium `sound-boxes`, Row 55 Coco's Pop-Up Sound Boxes (lids pop where sounds match), New 214 The Bumpy Slide (this batch: build one bump per sound, sounds fall onto the bumps, the picture rides):** those segment and count without spelling; here the child ENCODES letters onto beads and blends by releasing. The count misses here (a pip squeezed out, a slack gap) are band physics, not 214's empty and cracked bumps.
- **Row 54 The Blending Magnets** (two magnets snap across a pause), **Row 56 Pepper's Flip Card** (substitution) and **Row 57 The Sticky Name Tag** (a whole printed word sticks letter by letter to a picture): the Blend mode here reads a stretched word by closing the elastic, never by tapping text.
- **Built registry:** no elastic and no bead-kick exist; #9 Counting Necklace is beads on a string for counting — here beads are sound sockets on a stretching band.

## 12. Build plan
- **Core state** `{locale, clue, wordsMode, set, round:{word, pic, sounds:[grapheme], quiet:[grapheme], given:[i], bank:[w]|null, choices:[pic]|null}, tray:[{id, g}], beads:[tileId|null], stretch:0..nMax, misses, help}`.
- **Functions:** `stretchTo(n)` (fixed modes clamp to `sounds.length`), `place(tileId, bead)`, `clearBead(i)`, `type(ch)`, `check()` → `{ok, empty:[i], wrong:[i], order:bool, countDelta:int, teamSplit:bool}`, `blendPick(i)`, `helpFor(result, misses)` → `{kicked:[i], arrows:[i], litTiles:[id,id], ghost:[i]}`.
- **Gate's own ground truth** (`verify-word-elastic-core.js`): its OWN per-locale grapheme table (en: single letters + sh ch th ck ng ll; others per §9) and re-splits every word itself; asserts the concatenated sounds (+ quiet letters) equal the spelling; bead count = the gate's sound count; every tray holds each needed grapheme exactly once and no trap is an alternative spelling of a sound in the word (its own alt table: c/k, ck/k, s/c, z/s, f/ph…); every trap set holds a neighbouring vowel; no tray reads the word in order; slot shares ≤ 20 %; missing-bead positions 4/3/2; each blend round has exactly one picture whose locale label equals the word; every picture file exists, is a colour theme, and its label matches; `bat`, `fox`, `weather/sun`, `kitchen-tools/pan`, `egg` never referenced; fr quiet beads never counted; every word and split equals its `sound-boxes-bank-<loc>.json` row (no authored splits); fi long sounds are two linked beads on doubled letters (the bank split), never one pill; every da word `policy_managed:false`.
- **Mutations (one per rule):** accept a wrong middle letter · flag only the first wrong bead when two are wrong · treat an empty bead as a miss · let a fixed-mode stretch pass the bead count · let a locked given letter be removed · duplicate a right letter in the tray · put k in a c-word tray · show the ghost at miss 1 · keep the dimming after a new move · count the fr quiet bead as a sound · a team bead accepting two singles · blend right picture always in slot 1 · word bank listing the word first · sun pointing at weather/sun.
- **Pictures:** seen 2026-10-17 — around-the-house (bed, fan, mop, pen, pot, pan, rug, lock), beach (net, sun, rock, hat), kitchen-tools (mug, jug; its `pan` is a pot → refused), at-the-supermarket (bag, jam, can, ham; `egg` refused), accessories (sock, ring, cap, hat). Still to view on a contact sheet: animals (cat, pig, fish), farm-animals (hen, duck, chick), vehicles (bus, van, ship), fruits/fig, camping (log, map), bakery/bun, christmas/bell, and every non-EN word's picture.
- **Risks:** four-bead words at 320 px (measure); the knob drag must not fight page scroll (`touch-action:none` on the band only); fr and da lists are thin (gate refuses < 7).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a rubber band to pull and snap is a toy before it is a task, and the kicked-out bead is funny.
2. **Would a teacher put it on the board?** Yes — "stretch the word, give each sound a letter, snap it back" is exactly how K encoding is taught, and the band shows which sound is wrong without a word of scolding.
3. **Would a parent trust it?** Yes — real pictures, the child's own language's sounds and letter teams, calm feedback, nothing sold in the play.
4. **The invention:** the word is an elastic — stretching it pulls out one bead per sound, and letting go snaps the letters back into the word, kicking out any bead with the wrong sound.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- Source rule: every word and split now comes from `sound-boxes-bank-<loc>.json`; the non-bank words bus, fan, fig, map, chick left the pools, en sets rebuilt from bank s1 (cat hat hen net pig mop log cup mug / bag van bed pen pig pot dog sun jug), vowel balance a2 e2 i1 o2 u2 in both sets, traps re-cut.
- Letter teams = the 8 bank s2 rows with pictures (chin has no picture, egg is the carton).
- FINNISH RULING settled from the bank: a long sound is two letters in two beads (kuu k|u|u, kukka k|u|k|k|a), linked by a length bar, run stop-less so a child who hears it short meets a slack gap; nothing is re-split. Same ruling written into 214.
- Stretch-it-yourself misses changed to band physics (a squeezed-out pip, a slack gap) so they no longer echo 214's empty/cracked bumps; pure counting handed to 214.
- Locale lists corrected to the banks: fi poro dropped (no reindeer picture), sv team words fixed (ägg is the carton), da has no team rows (setting hidden), no team words named.
- Distinct-from updated to batch 09's real names (054 Blending Magnets, 055 Pop-Up Sound Boxes, 057 Sticky Name Tag).
