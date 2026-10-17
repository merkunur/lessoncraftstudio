# Row 52 — The Developing Photo / La photo qui se révèle (RF.K.2.B, fr)

## 0. Identity
- id `syllable-builder.forme-le-mot-en-syllabes.rf-k-2-b` (KEPT) · grade K (grande section / début CP) · Common Core RF.K.2.B; the page names the programmes officiels (§20.10, name only) · strand Reading: Foundational Skills · slug `forme-le-mot-en-syllabes`, title and intro frozen (fr).
- own files `mini tools/photo-syllables-core.js`, `photo-syllables-activity.js`, `photo-syllables-activity.html`; the manifest row stays in `syllable-builder-activities.json` with `tool` repointed. Shared engines untouched.
- **Locale scope (deliberate, §20.2):** the French member of the E8 syllable family; ships **fr only**. No other-locale metadata for this id (the other languages have rows 44–51, 53).
- worksheets it covers: none mapped.
- what the old activity did: a picture, empty slots, the syllable tiles shuffled below; tap them into order; 28 words. **Kept:** all 28 words with their gated *syllabes écrites* splits (`approved-words-fr.json`), building the word from syllable tiles, the picture as the goal. **Fixed:** `soleil` pointed at `weather/sun`, which does not exist → `beach/sun`.

## 1. The pitch
"Lay the syllable cards on the rail and develop the photo: each card carries its own strip of the picture, so the picture only comes out whole when the syllables are the right ones, in the right order."

## 2. Why a child will want it again (the fun)
- **A darkroom on the table.** The photo paper starts blank cream. When the child presses Check, a red safelight glows, the paper ripples, and the picture *develops* from the syllable cards upward — strip by strip, left to right — with the slow, magic fade of a real photograph (900 ms per strip).
- **Wrong is funny, not bad.** Put *pin* before *la* and the rabbit develops with its ears on the right and its tail on the left. Use the decoy card and a stripe of turtle shell appears in the middle of the rabbit. Leave a card out and a white unexposed strip stays empty. Children laugh and fix it — the photograph itself told them.
- **The album.** Every finished photo lifts out of the tray, shakes dry, and slides into a little album at the top of the stage, where it becomes a drawn photo-corner frame with its word written under it (a record in apparatus geometry — no library picture is ever shown below 96/64 px). At the end of a pass the album opens its pages one by one, each photo shown FULL size in the frame again for 1.2 s while its word appears in syllables.
- **Re-develop for fun:** during the task the only way to develop is Check (so a miss means something), but after success any album photo can be re-opened with its cards shuffled and developed again in silly orders, as often as the child likes.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** build a spoken word from its syllables in order, and know how many syllables a word has (RF.K.2.B; programme de maternelle "manipuler des syllabes"; CP "combiner des syllabes"). The French classroom splits by **syllabes écrites** (with the final mute *e* counted: *lu-ne*), and this activity follows the gated pipeline split.
- **Misconception 1 — order does not matter** ("pin-la is still lapin"). The photo shows the strips where the child put them: a misordered word is a misassembled picture.
- **Misconception 2 — any card that "looks right" belongs.** One decoy card per round shares letters with the word (*lac* beside the *lat* of *chocolat*, *bal* beside the *ble* of *table*); it carries a strip from a *different* photo.
- **Misconception 3 — every word has the same number of parts.** Monosyllables (*chat, ours*) develop whole from one card; long words need four. A missing card leaves an unexposed white strip; an extra card overflows the frame and curls.
- **The mute *e*.** In *lune, pomme, livre, tortue* the final *e* is not said (in *lune, pomme* the whole last written syllable is not clapped in speech). The card shows that word-final *e* in grey (the French "lettre muette" convention) and its strip develops like any other — the photo is honest about the written word without pretending the *e* is spoken (§9, §12 open ruling).
- **How the material pushes back:** by the photograph, never by a message.

## 4. The stage
Stacked (the rail must be wide); the bubble sits beside the photo at ≥ 700 px.

**At 704 px (stage 704 × 500):**
- **The album** (top band 704 × 44): a ribbon of drawn photo-corner frames (36 × 30, cream, 2 px ink, the word under each at 11 px) — progress without numerals and without shrunken pictures.
- **The photo frame** (centre-left, x 40–360, y 56–316): a white-bordered photo paper 300 × 260 (border 14 px, soft drop shadow, 2 px ink), its image area 272 × 232 holds the **library picture** at **208 px** short side when developed. Before Check: cream `#FBF3E4`, empty, with a faint dashed outline of the image area.
- **The developing tray** behind the frame: a shallow rectangle in teal-grey `#5E7C78` that shows the safelight glow on Check.
- **The bubble** (right, x 380–680, y 80–300).
- **The rail** (y 336–420): a long brass rail 640 × 84 across the stage with a bevelled groove; cards laid on it snap side by side from the left edge. No slots are drawn — the number of syllables is never shown.
- **The card tray** (y 432–496): the round's cards (syllables + decoy) in a row, shuffled.
- **A card:** 104 × 72 at 704 (36 px Baloo 2 ink letters, cream card, 2 px ink outline, rounded 10, a small hole-punch dot top-left that becomes the strip window); a grey mute-*e* letter at 55 % ink.
- **Task line** above the stage (≤ 24 px). No words on the apparatus except the syllables (content).

**At 360 px (stage 360 × 660):** album 360 × 32 (drawn frames 26 × 22, wraps); frame 260 × 220, picture **168 px**; bubble under the frame; rail 344 × 70; cards **76 × 60** (28 px letters; a five-letter syllable like *pluie* at 24 px); tray wraps to two rows when 5 cards; Check under the tray. Check bottom ≤ 700 at 360 × 740 and ≤ 620 at 320 × 640 (320: frame 230 × 190, picture 150 px, cards 68 × 56, 24 px letters).

## 5. The hand
- **Lay a card:** drag a card from the tray onto the rail; it snaps to the first free place on the right of the cards already there (120 ms, a paper *tsk*). Dropped between two cards, it pushes the right-hand ones along (insertion, 160 ms).
- **Reorder:** drag a card along the rail; the others slide aside to show where it will land.
- **Take back:** drag a card off the rail (or tap it once and tap the tray) → it returns to its tray place.
- **Hear it (bonus):** tap a card on the rail → TTS reads that syllable (fr-FR, where available); tap the rail's left end-cap (a round brass stop, 36 px speaker glyph) → TTS reads the rail left to right as one word.
- **Develop = Check.** On Check, the safelight glows (200 ms), the paper ripples, and each card on the rail sends up its strip: a vertical band of *its own* source photo (the picture of the word it came from), at the slice index of that syllable in its own word, band width = image width ÷ that word's syllable count. Bands appear left to right, 900 ms each, fading in from cream. Then the misses/success play (§7).
- **Free play:** after success, the child can tap any album frame to re-open its photo full size in the developing frame: its cards come back shuffled on the rail and can be developed again (no miss counting) — wrong orders make funny pictures on purpose.

## 6. The rounds
One round = one picture + its syllable cards + the decoy card(s). A pass = a level's table, order-only reshuffled (never the same order twice). The tray order is a derangement of the word's order, decoy at a uniformly drawn position.

**Level 1 — Un ou deux morceaux (monosyllables and two-syllable words with no mute *e*).** Monosyllable rounds carry two decoys (so a one-card word is a real choice).

| # | word | split | picture (themeDir/noun) | decoy card(s) (source word) |
|---|---|---|---|---|
| 1 | chat | chat | animals/cat | cho (chocolat) · lac (lac) |
| 2 | chien | chien | animals/dog | che (cloche) · ours (ours) |
| 3 | fleur | fleur | summer/flower | clo (cloche) · lu (lune) |
| 4 | lac | lac | camping/lake | la (lapin) · lat (chocolat) |
| 5 | ours | ours | forest creatures/bear | tour (tournesol) · bou (boulanger) |
| 6 | avion | a-vion | vehicles/airplane | am (ambulance) |
| 7 | lapin | la-pin | animals/rabbit | pa (papillon) |
| 8 | ballon | bal-lon | toys/balloon | ba (banane) |
| 10 | soleil | so-leil | beach/sun | sol (tournesol) |

**Level 2 — Le *e* muet (two written syllables, the last ending in a silent *e*).** (`tortue` moved here from Level 1: its final *e* is silent too — *tor-tue* is two written syllables, one heard syllable *tor-tu*.)

| # | word | split | picture | decoy (source) |
|---|---|---|---|---|
| 1 | lune | lu-ne | space/moon | la (lapin) |
| 2 | table | ta-ble | furniture/table | bal (ballon) |
| 3 | ange | an-ge | christmas/angel | am (ambulance) |
| 4 | cloche | clo-che | christmas/bell | cho (chocolat) |
| 5 | livre | li-vre | classroom/book | bre (zèbre) |
| 6 | tigre | ti-gre | animals/tiger | gi (girafe) |
| 7 | zèbre | zè-bre | animals/zebra | vre (livre) |
| 8 | pomme | pom-me | fruits/apple | pa (papillon) |
| 9 | tortue | tor-tue | animals/turtle | tu (voiture) |

**Level 3 — Trois syllabes et plus.**

| # | word | split | picture | decoy (source) |
|---|---|---|---|---|
| 1 | banane | ba-na-ne | fruits/banana | pa (papillon) |
| 2 | voiture | voi-tu-re | vehicles/car | tue (tortue) |
| 3 | papillon | pa-pil-lon | insects and bugs/butterfly | bal (ballon) |
| 4 | parapluie | pa-ra-pluie | weather/umbrella | la (lapin) |
| 5 | chocolat | cho-co-lat | easter/chocolate | lac (lac) |
| 6 | éléphant | é-lé-phant | animals/elephant | ne (lune) |
| 7 | girafe | gi-ra-fe | animals/giraffe | ti (tigre) |
| 8 | tournesol | tour-ne-sol | flowers/sunflower | so (soleil) |
| 9 | boulanger | bou-lan-ger | occupations/baker | ba (banane) |
| 10 | ambulance | am-bu-lan-ce | vehicles/ambulance | an (ange) |

All 28 legacy words are present. A decoy's text never equals a syllable of its round's word (the gate checks), so no two cards on a rail can look the same while carrying different strips.

**Answer position:** none on a map — the answer is an order. Measured: the tray order is a derangement; across a pass the correct first card sits in every tray position at least once and in tray slot 1 at most 30 %; the decoy's tray position is uniform (gate: χ² over a 1,000-pass simulation, every position within ± 5 % of uniform).

## 7. Check, the misses, the success
- **Check with an empty rail** → hint, no miss: "Pose les cartes sur le rail, puis développe la photo." (EN source: "Lay the cards on the rail, then develop the photo.")
- **Miss 1 — the photo as it is:** the photo develops exactly from the rail (misordered strips, a foreign strip, a white gap, or an overflow that curls past the frame edge). Strips that are the right card in the right place develop **sharp**; every other strip develops **fogged** (a soft blur + 30 % cream veil). The rail cards under fogged strips tilt by 4°. Hint by case:
  - order wrong: "Les morceaux de l'image sont mélangés. Change l'ordre des cartes." ("The picture's pieces are mixed up. Change the order of the cards.")
  - decoy used: "Une carte vient d'une autre photo. Laquelle ?" ("One card comes from a different photo. Which one?")
  - card missing: "Il manque un morceau de la photo." ("A piece of the photo is missing.")
- **Miss 2 — the contact print:** the paper shows the right picture as a faint ghost at 18 % behind the fogged result, with thin vertical guide lines where each syllable's strip begins and ends — so the child can see how many strips and where each goes, without being shown which card. The rail's end-cap speaker pulses (TTS reads the word in syllables where available). Hint: "Regarde les traits sur la photo : un morceau pour chaque syllabe." ("Look at the lines on the photo: one piece for each syllable.")
- **A new move takes the help away:** moving any card returns the paper to blank cream until the next Check.
- **Success:** every strip develops sharp; the bands' seams melt away (300 ms) into one clean photo; a soft camera-flash white bloom (120 ms); the cards on the rail light gold left to right while the bubble shows the word in syllables and then whole; TTS reads "la — pin — lapin". The photo lifts out of the tray, gives a little shake, and pins itself into the album. Bubble: "la-pin : lapin ! Tu as formé le mot en 2 syllabes." (EN source: "{syllables}: {word}! You built the word from {n} syllables.") For one-syllable words: "chat : un seul morceau, une seule syllabe !" ("{word}: one piece, one syllable!").

## 8. Settings
1. **Niveau (Level):** Un ou deux morceaux · Le e muet · Trois syllabes et plus — the tray shows 1–2 syllable cards / grey-*e* cards / 3–4 cards at rest.
2. **Carte piège (Decoy card):** aucune · une (default) — the tray holds the decoy card(s) or not, at rest.

## 9. Words (EN source; the build authors fr by hand, then one native fr + pedagogy reviewer)
- title (shell, frozen) · instruction: "Lay the syllable cards on the rail in the right order, then press Check to develop the photo."
- task lines: L1 "Build the word, then develop the photo." · L2 "Build the word. The grey e is written but not said." · L3 "Build the long word, one card for each syllable."
- hints / celebrations: §7. Settings: "Level", "One or two pieces", "The silent e", "Three syllables or more", "Decoy card", "None", "One".
- aria: "Rail: {cards}." · "Card {syllable}, from the tray." · "The photo shows {state}: all sharp / mixed up / a piece from another photo / a missing piece." · "Album: {count} photos."

**Locale traps (fr only):**
- **Syllabes écrites vs orales — the mute *e*.** The shipped pipeline and every gated split count the final mute *e* (*lu-ne* = 2). French maternelle claps *oral* syllables (*lune* = 1). CLAUDE.md §20.9 records this as a **deferred operator ruling** (fr mute-e convention review). This design does NOT decide it: it follows the gated split (écrites), shows the mute *e* in grey (standard CP practice — "la lettre muette"), and Level 2's task line says out loud that the grey *e* is written but not said. If the operator rules for oral syllables, Level 2 becomes "one oral syllable" rounds by re-splitting from a reviewed oral list; the core's split source is a single function so nothing else changes.
- **Accents are part of the syllable** (*zè, é, lé*) — never folded.
- **Liaison and elision** never cross a card (single words only, no articles on cards). The picture label in the bubble uses the vocabulary noun without article.
- **Capital letters:** all cards lower case (CP script print); no proper nouns.
- **Typography in fr strings:** non-breaking space before « : ! ? » in the bubble (the page shell already fixes text nodes on the fr site — verify the activity bubble goes through it, or hard-code U+202F).
- **Cursive** is not used on cards (print first; cursive is a separate skill).
- Sound off: everything is in the photograph; TTS fr-FR is a bonus.

## 10. Sound off, access, phones
- Silent legibility: sharp/fogged strips, gaps, foreign strips and the guide lines carry every message.
- Keyboard: Tab to a tray card, Enter lays it on the rail; on the rail ←/→ move the focused card, Delete returns it to the tray; Enter on Check develops.
- aria-live: "Developing… The photo is all sharp." / "Two pieces are mixed up." / "One piece is from another photo." / "A piece is missing."
- Taps: cards ≥ 68 × 56 everywhere; end-cap hit area 44 × 44.
- Pictures: developed photo 208 px at 704, 168 px at 360, 150 px at 320; album thumbnails are a record, not a task picture.
- Phone: frame → bubble → rail → tray → Check, stacked.

## 11. Distinct from
- **Row 51 (pt)** turns syllable-family wheels in a lock; **row 53 (fi)** builds a marble track from syllable pieces; this row develops a sliced photograph. Three different physics for the same standard.
- **Rows 44–50** (other languages' builders) — each rebuilt as its own instrument; none uses a photograph.
- **New 215 Bead Rail** (count beats with beads) and **premium `syllable-splitter`** (drum + arcs + rebuild): no drum, no arcs, no beads here.
- **New 229 Blink Viewer** overlays two pictures to compare; here one picture is assembled from strips — a jigsaw that only completes when the syllables are right, not an overlay.

## 12. Build plan
- **Core state:** `{level, round:{word, split[], picture, decoys:[{text, srcWord, srcIdx, srcCount, srcPicture}]}, rail:[cardId], tray:[cardId], developed:null | {bands:[{cardId, sharp, foreign, gapAfter}], overflow}, misses}`. Functions: `lay(cardId, at)`, `move(cardId, to)`, `takeBack(cardId)`, `develop()` → bands (each band = `{picture, srcIdx, srcCount}` of its card, `sharp` iff card k is the word's syllable k), `isWhole()`.
- **Gate's own ground truth (`verify-photo-syllables-core.js`):** every split equals `approved-words-fr.json` (read the file); every decoy text ≠ every syllable of its round and equals syllable `srcIdx` of `srcWord` in the approved file; `develop()` on the correct order → all bands sharp, total band width = frame width ± 1 px; on each derangement → at least one fogged band; with the decoy laid → a foreign band; with a card missing → a gap; tray orders are derangements; every picture exists and is colour; all 28 legacy words present once; the mute-*e* flag is set exactly on the word-final plain *e* (never *é/è/ê*, never a non-final *e*) — computed by the gate's own rule, then compared; Level 1 contains no word with a word-final plain *e*.
- **Mutations:** accept a wrong order · decoy band drawn from the target photo · band width from the round word instead of the card's own word · missing card closes the gap · tray order = correct order · sharp band on a misplaced card · help ghost before miss 2 · ghost kept after a move · mute-*e* grey on a non-final *e* · pass 2 order = pass 1 · drop a legacy word.
- **Pictures to verify on a contact sheet:** animals cat, dog, rabbit, turtle, tiger, zebra, elephant, giraffe; summer flower; camping lake; forest creatures bear; vehicles airplane, car, ambulance; toys balloon; beach sun; space moon; furniture table; christmas angel, bell; classroom book; fruits apple, banana; insects and bugs butterfly; weather umbrella; easter chocolate; flowers sunflower; occupations baker. ⚠ The slicing makes every picture's *left-to-right layout* matter: a picture drawn symmetric (the sun, the moon, the apple) gives a weak "mixed up" signal, because swapped halves look almost the same. Rule: **a round whose picture's left half and right half differ by < 12 % of pixels (the gate measures it on the webp) is moved to Level 3 or gets the decoy forced on.** Expected weak ones: sun, moon, apple, flower, ball(oon). The decoy still works there (a foreign stripe is always obvious).
- **Risks:** strips cut through a thin picture (the umbrella handle) look broken even when right — seams melt on success, so only misses show seams.
- **Open ruling (not blocking):** the fr mute-*e* convention (§9); default = written syllables, matching the gate.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a darkroom that makes funny wrong pictures and perfect right ones, and an album to fill.
2. **Would a teacher put it on the board?** Yes — order, the right parts, and the number of parts are all shown by the picture itself; the grey mute *e* matches how CP teaches it.
3. **Would a parent trust it?** Yes — calm, library pictures only, gated splits, no score, works without sound.
4. **The invention:** every syllable card carries its own strip of the picture, so the photo only develops whole when the syllables are right and in order.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- All 28 splits re-checked against `approved-words-fr.json` (all equal), every fr label equals its word.
- `tortue` moved from Level 1 ("no mute e") to Level 2: its final *e* is silent too. The grey-*e* rule is now exactly "the word-final plain *e*" (never *é/è/ê*), checked by the gate.
- The album of 36/24 px photos broke the picture floor → drawn photo-corner frames with the word under each; photos are only ever shown full size.
- The fr mute-e convention stays the deferred operator ruling of CLAUDE.md §20.9 — the design follows the gated *syllabes écrites* and says so on screen; correct and honest as written.
