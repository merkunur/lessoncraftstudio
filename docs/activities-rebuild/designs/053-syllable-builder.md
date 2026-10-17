# Row 53 — The Syllable Marble Run / Tavukuularata (RF.K.2.B, fi)

## 0. Identity
- id `syllable-builder.muodosta-sana-tavuista.rf-k-2-b` (KEPT) · grade K (esiopetus / 1. luokka entry) · Common Core RF.K.2.B; the page names OPS 2014 (§20.10, name only) · strand Reading: Foundational Skills · slug `muodosta-sana-tavuista`, title and intro frozen (fi).
- own files `mini tools/marble-run-core.js`, `marble-run-activity.js`, `marble-run-activity.html`; the manifest row stays in `syllable-builder-activities.json` with `tool` repointed. Shared engines untouched.
- **Locale scope (deliberate, §20.2):** the Finnish member of the E8 syllable family; ships **fi only**. The invention's third level is built on the Finnish *tavutus* rule, which no other locale has in this form.
- worksheets it covers: none mapped.
- what the old activity did: picture, empty slots, syllable tiles to tap into order, 28 words from *kuu* to *auringonkukka*. **Kept:** all 28 words with their gated splits (`approved-words-fi.json`), building the word from syllables, the long Finnish words that make it special. **Fixed:** `aurinko` pointed at `weather/sun`, which does not exist → `beach/sun`.

## 1. The pitch
"Each syllable is a piece of marble track: build the run from the funnel to the picture's cup, let the marble go, and it reads your track aloud as it rolls — it only drops into the cup if the track says the picture's name."

## 2. Why a child will want it again (the fun)
- **A marble run.** Every child loves one. Pieces snap onto a pegboard with a wooden *klok*; the shiny marble waits in the funnel; Check pulls the gate and the marble rolls, clacking over each joint, lighting each piece as it passes.
- **The track reads itself.** As the marble crosses a piece, that piece's syllable jumps up into a word strip above the run — *kis… sa* — so the child watches the word being *blended* by the rolling marble, one smooth roll for one whole word.
- **Long words are long rides.** *Au-rin-gon-kuk-ka* is a five-piece run that winds down the board — Finnish's long words become the best rides, not the scariest words.
- **The cup.** When the strip says the picture's name, the marble drops into the picture's cup with a bright *plink*, the picture hops, and a little spiral of light runs back up the track.
- **Wrong is a ride too.** A wrong order rolls the marble to the end where the strip says *sakis* — and the marble trundles past the cup into the side tray. A gap in the track and the marble drops through it. A piece that breaks the Finnish syllable rule has a step too high to climb: the marble bumps, rolls back, and sits there.
- **The marble jar.** Every marble that lands rolls up into a glass jar at the top (drawn glossy spheres, each a different shell-palette colour, clinking as they settle — the record is apparatus, never a shrunken picture). Tapping the jar pours the pass's marbles back down the last track for fun. No score, no timer, no streak, no lives.

## 3. The skill and the misconception
- **Skill:** build a spoken word from its syllables, in order, and blend them (RF.K.2.B; OPS 2014 esiopetus "kielellinen tietoisuus", 1. lk *tavutus*). Level 3: the core *tavutus* consonant rule every Finnish first-grader learns (*konsonanttisääntö*: when consonants stand between two vowels, the syllable break goes before the LAST consonant) — said the child's way: **in a native word, a syllable after the first starts with at most one consonant before its vowel** (*kis-sa*, never *ki-ssa*; *kynt-ti-lä*, never *kyn-tti-lä*). A syllable may also start with NO consonant (*lu-mi-uk-ko*, *o-me-na*) — the rule only forbids two or more. Loanwords are left out of the rule level on purpose: Kielitoimisto allows loanword clusters to stay together (*see-pra* beside *seep-ra*), so `seepra` is a Level 1 word, not a rule word.
- **Misconception 1 — order does not matter.** The marble reads the track left to right; *sa-kis* is a different "word" on the strip and the cup stays shut.
- **Misconception 2 — any syllable that looks close belongs.** Each round has one decoy piece that differs in length (*ku* for *kuu*, *na* for *naa*, *ti* for *tii*) — Finnish vowel length changes words, and the strip shows the difference letter for letter.
- **Misconception 3 — the double consonant goes together** (*ki-ssa*). In Level 3 both splits lie on the tray; a piece starting with two consonants has a **step two notches high** at its entry, and the marble cannot climb it — while a piece starting with a vowel (step 0) or one consonant (step 1) rolls on, which is exactly the rule's "at most one".
- **Misconception 4 — fewer pieces, shorter word.** A missing piece leaves a gap; the marble falls through at that spot.
- **How the material pushes back:** gravity, steps and gaps — the marble either reaches the cup or it doesn't, and you see exactly where it stopped.

## 4. The stage
Stacked; the bubble sits beside the picture cup at ≥ 700 px.

**At 704 px (stage 704 × 500):**
- **The marble jar** (top band 704 × 44): a glass jar outline at the left filling with drawn marbles (12 px spheres) per pass; no numerals, no shrunken pictures.
- **The word strip** (y 52–104): a cream strip 600 × 52 centred, letters at **34 px** — it fills as the marble rolls; empty at rest.
- **The pegboard** (y 112–330): a light wooden board 640 × 218 (warm `#E8D5B0`, 2 px ink, rows of peg dots). At its top-left the **funnel** (a trapezoid hopper 72 × 60, teal) holding the **marble** (a glossy 22 px sphere, coral `#F2784B` with a white highlight); the funnel's gate is a small bar.
- **The track positions:** six peg places in one gentle downward slope from the funnel (x 96 → 616), each 92 × 52, shown at rest only as faint pairs of pegs (never boxes, never a count of the word's syllables — always six).
- **A track piece** (= a syllable card): a slanted rail 92 × 52 (cream face, 2 px ink, a rolling groove along its top edge, the syllable at **30 px** on its face). Its left end has an **entry step** whose height is 0, 1 or 2 notches — the number of consonants before the first vowel of the syllable, capped at 2 (drawn as one or two small ridges in the groove). The step is visible all the time: it is part of the piece, not a hint.
- **The picture cup** (bottom right, x 520–680, y 340–490): a U-shaped cup 120 × 60 (teal, 3 px ink) under the end of the slope; above it the **library picture** at **128 px** on a small stand. To the left of the cup a **side tray** (a flat dish 100 × 30) where a marble that missed rolls.
- **The piece tray** (y 360–440, x 24–500): the round's pieces, shuffled.
- **The bubble** (left of the cup, y 446–496 at 704; one line).
- **Task line** above the stage (≤ 24 px). No words on the apparatus except syllables (content).

**At 360 px (stage 360 × 680):** jar 360 × 32; word strip 340 × 40 (28 px); pegboard 344 × 250 with the six places in **two rows of three** (row 1 left→right, a return chute at the right end drops the marble down-left to row 2's start, row 2 left→right — the reading order stays left-to-right, like a wrapped line); pieces **84 × 50** (26 px syllables; four-letter *pönt*, *teen*, *kynt* at 24 px); picture cup under the board with the picture at **96 px** (≥ 64 required); tray 2 rows; bubble; Check. Check bottom ≤ 700 at 360 × 740 and ≤ 620 at 320 × 640 (320: pieces 76 × 46, picture 84 px).

## 5. The hand
- **Place a piece:** drag a piece from the tray to any of the six places (snap 120 ms, *klok*). The child may leave places empty anywhere — that is how a gap happens.
- **Move / swap:** drag a placed piece to another place; dropping onto an occupied place swaps them (160 ms).
- **Remove:** drag a piece back to the tray, or double-tap it.
- **Hear a piece (bonus):** tap a placed piece → TTS reads the syllable (fi-FI where available; Finnish TTS is often missing, so nothing depends on it).
- **Check = release the marble.** The funnel gate lifts; the marble rolls (constant visual speed 280 px/s on the slope, a soft *tk* at every joint). Entering a piece: the piece lights warm yellow and its syllable flies up into the word strip (letters append, 180 ms). Events along the way:
  - **empty place before the last placed piece** → the marble drops through the gap with a little whistle and lands in the side tray;
  - **a step of 2 at a non-first piece** → the marble bumps (a *tonk*), rolls back to the middle of the previous piece and stays there; that step ridge glows;
  - **end of the track** → if the strip equals the picture's word, the marble drops into the cup; otherwise it trundles past the cup into the side tray and the strip stays showing what the track said.
- **Free play:** after success, the marble can be released again and again (drag it back into the funnel); placing extra pieces between rounds makes silly words on the strip.

## 6. The rounds
One round = one picture + its pieces + the decoy(s). A pass = a level's table, order-only reshuffled (never the same order twice). Tray order: a derangement of the word's order, decoys at uniformly drawn positions.

**Level 1 — Lyhyet sanat (one or two syllables, one decoy piece).**

| # | word | split | picture (themeDir/noun) | decoy (source word) |
|---|---|---|---|---|
| 1 | kuu | kuu | space/moon | ku (kakku) |
| 2 | vyö | vyö | clothing/belt | vo (hevonen) |
| 3 | talo | ta-lo | miscellaneous/house | la (kala) |
| 4 | auto | au-to | vehicles/car | ko (aurinko) |
| 5 | koira | koi-ra | animals/dog | ri (tiikeri) |
| 6 | karhu | kar-hu | forest creatures/bear | ka (kala) |
| 7 | kala | ka-la | animals/fish | lo (talo) |
| 8 | juna | ju-na | toys/train | nu (pannukakku) |
| 9 | siili | sii-li | forest creatures/hedgehog | lu (lumiukko) |
| 10 | vene | ve-ne | vehicles/boat | ke (enkeli) |
| 11 | seepra | seep-ra | animals/zebra | sa (sateenvarjo) |

**Level 2 — Pitkät sanat (three to five syllables, one decoy).** Several decoys differ only in vowel length — the Finnish trap.

| # | word | split | picture | decoy (source) |
|---|---|---|---|---|
| 1 | aurinko | au-rin-ko | beach/sun | kon (kilpikonna) |
| 2 | hevonen | he-vo-nen | farm animals/horse | ho (perhonen) |
| 3 | omena | o-me-na | fruits/apple | mi (lumiukko) |
| 4 | banaani | ba-naa-ni | fruits/banana | na (porkkana) |
| 5 | enkeli | en-ke-li | christmas/angel | kel (kello) |
| 6 | perhonen | per-ho-nen | insects and bugs/butterfly | vo (hevonen) |
| 7 | tiikeri | tii-ke-ri | animals/tiger | ti (kynttilä) |
| 8 | sateenvarjo | sa-teen-var-jo | weather/umbrella | kaa (sateenkaari) |
| 9 | lumiukko | lu-mi-uk-ko | winter/snowman | lo (talo) |
| 10 | pannukakku | pan-nu-kak-ku | breakfast/pancake | kuk (kukka) |
| 11 | linnunpönttö | lin-nun-pönt-tö | spring/birdhouse | nu (pannukakku) |
| 12 | sateenkaari | sa-teen-kaa-ri | weather/rainbow | var (sateenvarjo) |
| 13 | auringonkukka | au-rin-gon-kuk-ka | flowers/sunflower | ko (aurinko) |

**Level 3 — Tavuvahti (the double consonant: both splits lie on the tray).** The pieces are the correct split plus the wrong split's pieces that differ from it.

| # | word | correct split | picture | wrong-split pieces also on the tray |
|---|---|---|---|---|
| 1 | kissa | kis-sa | animals/cat | ki · ssa |
| 2 | kukka | kuk-ka | summer/flower | ku · kka |
| 3 | pallo | pal-lo | toys/ball | pa · llo |
| 4 | kakku | kak-ku | bakery/cake | ka · kku |
| 5 | kello | kel-lo | christmas/bell | ke · llo |
| 6 | porkkana | pork-ka-na | vegetables/carrot | por · kka |
| 7 | kynttilä | kynt-ti-lä | christmas/candle | kyn · tti |
| 8 | kilpikonna | kil-pi-kon-na | animals/turtle | ko · nna |
| 9 | kettu | ket-tu | animals/fox | ke · ttu |
| 10 | sukka | suk-ka | accessories/sock | su · kka |

All 28 legacy words appear exactly once (L1: kuu, vyö, talo, auto, koira, karhu, seepra; L2: the thirteen; L3: kissa, kukka, pallo, kakku, kello, porkkana, kynttilä, kilpikonna); kala, juna, siili, vene (L1) and kettu, sukka (L3, native double-consonant words, TeX+rule+vocab agreed) are new, splits from `approved-words-fi.json`. Every Level 3 word is a native Finnish word (or fully nativised: *porkkana*, *kynttilä*), so the rule holds without exception. In L3, every wrong-split piece that would be non-initial starts with two consonants (a step of 2), so the wrong split is *physically* stopped; a mixed track like *ki-sa* passes the steps but the strip reads *kisa* (a real word — "contest") and the marble misses the cup, which the reviewer confirms is fine and even useful.

**Answer position:** the answer is an order on the board, not a spot. Measured: the tray order is a derangement; over a pass the correct first piece sits in each tray position at least once and in tray slot 1 at most 30 %; decoy positions are uniform (χ² over a 1,000-pass simulation, each position within ± 5 %). Placement on the board is free (any of six places), so the answer never sits at a fixed screen spot.

## 7. Check, the misses, the success
- **Check with no piece placed** → hint, no miss: "Rakenna rata tavuista, sitten päästä kuula." (EN source: "Build the track from syllables, then let the marble go.")
- **Check with a piece missing from the start** (place 1 empty) → hint, no miss: "Radan pitää alkaa suppilosta." ("The track has to start at the funnel.")
- **Miss 1 — the ride as built:** the marble rolls the child's track (gap → falls; step 2 → rolls back; end → misses the cup). The word strip keeps exactly what the marble read. Then the piece where things went wrong is marked: the piece before a gap rocks; a too-high step glows; with a full ride, the first strip letter that differs from the picture's word is underlined in coral (the strip is compared letter by letter with the word only internally — the word itself is not shown). Hints by case:
  - order: "Kuula luki: {read}. Vaihda palojen järjestystä." ("The marble read: {read}. Change the order of the pieces.")
  - decoy / length: "Kuula luki: {read}. Kuuntele: onko ääni pitkä vai lyhyt?" ("The marble read: {read}. Listen: is the sound long or short?")
  - gap: "Radassa on aukko." ("There is a gap in the track.")
  - step: "Kuula ei pääse askeleen yli. Tavun alussa voi olla vain yksi konsonantti." ("The marble can't get over the step. A syllable can start with only one consonant.")
- **Miss 2 — the shadow track:** faint outlines of the right number of pieces appear on the board from the funnel (no letters), and the picture's word appears in the strip as pale grey letters with thin dividers where the syllables break — so the child sees how many pieces and where each one starts. L3 adds a small arrow on the joint between the double consonants. Hint: "Katso harmaita viivoja: yksi pala jokaista tavua kohti." ("Look at the grey lines: one piece for each syllable.")
- **A new move takes the help away** (shadow track and grey word vanish) until the next Check.
- **Success:** the marble rolls the whole track, each piece lighting; the strip completes and its dividers melt so the syllables join into one word; the marble drops into the cup (*plink*), the picture hops twice, and a spiral of light runs back up the track to the funnel (700 ms). TTS reads "kis–sa, kissa" where available. Bubble: "kis-sa: kissa! Rakensit sanan tavuista." (EN source: "{syllables}: {word}! You built the word from syllables.") The picture becomes a sticker on the marble jar.

## 8. Settings
1. **Taso (Level):** Lyhyet sanat · Pitkät sanat · Tavuvahti — the tray holds 1–2 pieces + a decoy / 3–5 pieces + a decoy / both splits, at rest.
2. **Houkutuspala (Decoy piece, L1–L2):** ei · kyllä (default) — the decoy is in the tray or not, at rest. (In L3 the wrong split is the point and cannot be switched off.)

## 9. Words (EN source; the build authors fi by hand, then one native fi + pedagogy reviewer)
- title (shell, frozen) · instruction: "Build the marble track from the syllable pieces, in the right order. Press Check to let the marble go."
- task lines: L1/L2 "Build the picture's name from the pieces. One piece does not belong." · L3 "Build the word. Watch the steps: a syllable can start with only one consonant."
- hints / celebration: §7. Settings: "Level", "Short words", "Long words", "Syllable guard", "Decoy piece", "No", "Yes".
- aria: "Place {n} of 6: {syllable | empty}." · "Piece {syllable}, step {k}." · "The marble read {read}." · "The marble landed in the cup." · "Marble jar: {count} pictures."

**Locale traps (fi only):**
- **Vowel and consonant length** are meaning in Finnish (*tuli/tuuli*, *kuka/kukka*). Decoys that differ only in length are deliberate; the strip shows letters, never a phonetic sign.
- **The tavutus rule** applies to native words; loanwords may keep a cluster together (*see-pra / seep-ra*, *ko-bra / kob-ra* are both accepted), and a word-initial cluster is always allowed (*kro-ko-tii-li*). Level 3 therefore holds native words only (the gate carries a hand-written native-word list); the gate checks that every correct split used anywhere has no non-initial syllable beginning with two consonants.
- **Diphthongs stay together** (*au-to*, *koi-ra*); no wrong split that separates a diphthong is offered (that is a second rule, out of scope here).
- **Compounds** (*sateen-kaari*, *linnun-pönttö*, *auringon-kukka*) are split by syllable, not by compound part — as the gate does.
- **Å/Ä/Ö:** *ä* and *ö* are separate letters; never folded (*lä*, *pönt*, *tö*). The step count treats *y, ä, ö* as vowels.
- **Register:** *esiopetus*-friendly imperatives (*rakenna*, *päästä*), no grammatical persons beyond *sinä*.
- **Sound off:** Finnish TTS is unreliable — the word strip, the steps and the ride carry everything.

## 10. Sound off, access, phones
- Silent legibility: the word strip, the rolling marble, gaps, steps, the cup and the side tray.
- Keyboard: Tab to a tray piece, Enter picks it up, ←/→ chooses a place (1–6), Enter drops; Delete returns a placed piece; Enter on Check releases the marble. A "skip ride" toggle (Esc) jumps the animation to its result for children who need it fast.
- aria-live: reads the strip as it grows ("kis… kissa") and the outcome ("in the cup" / "rolled past the cup" / "fell through a gap at place {n}" / "stopped at a step at place {n}").
- Taps: pieces ≥ 76 × 46; places hit area ≥ 52 × 52.
- Pictures: 128 px at 704, 96 px at 360, 84 px at 320.
- Phone: two rows of three places with a return chute; the cup under the board.

## 11. Distinct from
- **Row 51 (pt)** rolls syllable-family wheels in a lock; **row 52 (fr)** develops a photo from syllable strips; this row reads a marble track. Three different physics for one standard.
- **Row 50 Domino Run (es)** — the nearest sibling: syllable pieces in a line, and a gap or a wrong piece stops the run. What only this row has is the **entry step** — a property of each piece read off its own letters (consonants before the vowel), which enforces the Finnish *tavutus* rule by physics; the domino run has no per-piece property and no rule level. The verdicts also differ: a falling chain stops vs a marble that reads aloud and lands in a picture cup.
- **New 215 Bead Rail** — beats drop beads to count syllables; no track, no order. **New 222 Pencil Path** — a car follows a drawn road; here the track is built from syllables and gravity does the reading.
- **Premium `syllable-splitter`, `blending-board`** — drum/arcs and letter cards; nothing rolls.
- **Built #21 Creek Map** — a boat follows a fork chosen by comparison; no construction, no syllables.

## 12. Build plan
- **Core state:** `{level, round:{word, split[], picture, pieces:[{id, text, step, isDecoy}]}, places:[pieceId|null ×6], tray:[pieceId], ride:null | {read, events:[{place, kind:'enter'|'gap'|'step'|'end'}], landed}, misses}`. Functions: `stepOf(text)` (consonants before the first vowel, vowels = a e i o u y ä ö, capped at 2); `place(id, k)`, `swap(a, b)`, `remove(id)`; `ride()` → walks places 1..6: stops at the first empty place *if any later place is filled* (gap) or ends; at a non-first piece with step 2 → `step` event and stop; else appends text; `landed = (read === word)`.
- **Gate's own ground truth (`verify-marble-run-core.js`):** every split equals `approved-words-fi.json` (read the file); `stepOf` re-implemented in the gate on its own vowel list; in every correct split, every non-initial syllable has step ≤ 1; in L3, every wrong-split piece that can only be non-initial has step 2 and the wrong split concatenates to the same word; every decoy differs from all syllables of its round and equals a syllable of its source word in the approved file; the ride on the correct placement lands; on every derangement it does not; a gap anywhere before the last piece produces a `gap` event; tray orders are derangements; all 28 legacy words present once; pictures exist and are colour.
- **Mutations:** land with a wrong order · let the marble climb a step of 2 · cap the step at 1 · ignore a gap · count *y/ä/ö* as consonants · decoy equal to a target syllable · tray order = correct order · shadow track before miss 2 · help kept after a move · word shown in the strip at miss 1 · pass 2 order = pass 1 · drop a legacy word.
- **Pictures to verify on a contact sheet:** animals fox; accessories sock; space moon; clothing belt; miscellaneous house; vehicles car, boat; animals dog, fish, cat, tiger, zebra, turtle; forest creatures bear, hedgehog; toys train, ball; beach sun; farm animals horse; fruits apple, banana; christmas angel, bell, candle; insects and bugs butterfly; weather umbrella, rainbow; winter snowman; breakfast pancake; spring birdhouse; flowers sunflower; summer flower; bakery cake; vegetables carrot. (animals sheet seen 2026-10-17: clean; the rest from `scratchpad/des/contact/`.)
- **Risks:** the ride must never feel slow — 280 px/s, total ≤ 2.5 s for six pieces, Esc/skip available; the step ridges must read at 360 (2 px ridges, 6 px tall each).
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a marble run that reads aloud, long words that are long rides, a jar to fill.
2. **Would a teacher put it on the board?** Yes — order, the right pieces, vowel length and the *tavutus* rule are all enforced by the track, not by a red cross.
3. **Would a parent trust it?** Yes — calm, library pictures, gated splits, no score, works silently.
4. **The invention:** syllables are pieces of a marble track — the marble reads the track as it rolls and only drops into the picture's cup when the track says its name; a wrong Finnish split has a step too high to climb.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- The tavutus rule was stated wrongly ("a syllable starts with one consonant" — false for *lu-mi-uk-ko*, *o-me-na*). Now: the consonant rule (break before the LAST consonant), said the child's way as "in a native word a syllable after the first starts with AT MOST one consonant"; hint and task line rewritten in fi and EN.
- `seepra` taken out of the rule level: it is a loanword (TeX itself leaves *seepra* unsplit; Kielitoimisto accepts *see-pra* beside *seep-ra*), so "*see-pra* is wrong" would teach a falsehood. It moves to Level 1; native `kettu` (fox) and `sukka` (sock) join Level 3 (both TeX+rule+vocab agreed, pictured) — Level 3 is now native words only, 10 rounds.
- All 34 splits re-checked against `approved-words-fi.json`; labels equal words.
- Marble-jar stickers (24 px pictures) → drawn marbles. Row 50 Domino Run named in §11 with the real difference (the entry step).
