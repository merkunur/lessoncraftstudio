# Row 43 — Bau das Wort aus Silben → DIE SCHWUNGBAHN, THE SYLLABLE-BOW TRACK (RF.K.2.B)

## 0. Identity
- id `syllable-builder.bau-das-wort-aus-silben.rf-k-2-b` (KEPT; slug/metadata frozen — this row exists in **de only**; no other locale ships it, by design: each language's syllable activity is its own row) · grade K (de: Kindergarten / Vorschule, as the frozen title says) · CCSS RF.K.2.B (count, pronounce, blend and segment syllables); de prose names the framework as the Bildungspläne / Lehrplan (§20.10) · Reading: Foundational Skills · own files `silbenbogen-core.js`, `silbenbogen-activity.js`, `silbenbogen-activity.html`, `silbenbogen-activities.json` (the row leaves `syllable-builder-activities.json`; the other syllable-builder rows — es/it/pt/fr/fi — stay on their engine untouched; the id is unchanged).
- Frozen de title "Silben üben im Kindergarten — Wörter aus Silben bauen"; frozen de intro promises: children tap syllables, hear them and build whole words from them; online, no login, Kindergarten and Vorschule. **All kept true** (tap a syllable card = hear it; build the word from the cards).
- Worksheets also covered: none mapped.
- Old activity: a picture, scrambled syllable tiles, tap-to-place into slots, per-tile TTS, the blended word spoken on a correct check; 30 words from the gated syllable output. **Kept:** 28 of the 30 words with their pictures and their gated splits (critic: fruits/peach is drawn like an apple — ruled unusable — and around the house/brush is a shaving-brush/duster a child calls "Pinsel"; both replaced by gated words with unmistakable pictures, Ba-na-ne and Bir-ne; the live page carries the same two picture defects and is fixed at the source with this rebuild or before it), (`approved-words-de.json`, every one verified approved, ≥ 4 sources agreeing), tap-to-hear tiles, building left to right, the blended word on success. **Changed:** the slots are no longer given — the child first **swings the syllables** (Silben schwingen), and every swing draws one **Silbenbogen** under the word track; the bows ARE the slots, so the count is the child's, and too few or too many bows shows itself while building.

## 1. The pitch
"Swing the word like in the Morgenkreis — every swing draws one syllable bow, every bow holds exactly one syllable card, and the finished word sits on its own Silbenbögen just like in the Fibel."

## 2. Why a child will want it again (the fun)
- **The swing.** A bright ball sits at the start of a long track under the picture. Each swipe (or tap) of the swing pad flings the ball in one smooth arc to the right — "whoosh-plop" — and the arc leaves a coloured bow behind it. Kindergarten children swing syllables with their whole arm every day ("Schmet — ter — ling"); here the screen swings with them.
- **Cards that drop into bows.** Each syllable card, dragged onto a bow, sinks into it like a hammock and the bow takes the card's colour; the card says its syllable aloud.
- **The ride.** When every bow is full, the ball rolls back to the start and rides the bows one by one, reading each syllable as it hops — "Schmet … ter … ling" — then runs straight along the bottom and says the whole word "Schmetterling!" while the first letter grows into its capital and the picture does a happy wiggle. The word is read the way a first-grader reads: syllable by syllable, then whole.
- **The word line.** Every built word drops into a word line at the bottom — the child's own little Fibel page of bowed words.
- **Free play ("Schwungbahn"):** swing any number of bows for any picture and drop in cards — or swing your own name and just watch the ball fly.

## 3. The skill and the misconception
- **Skill (RF.K.2.B; de Vorschule: Silben klatschen / schwingen):** hear and count the syllables of a spoken word, say them separately, and blend them back into the word; the build orders the written syllables left to right.
- **Misconception 1 — counting sounds or letters instead of syllables** ("B-ä-r" as three; "Bär" is one). **Push back:** the bows are the count; if the child swings three bows for Bär, the single card fills one bow and two bows stay empty and sag grey — the word is complete with bows left over.
- **Misconception 2 — under-segmenting long words** (Krankenwagen swung as "Kranken-wagen"). **Push back:** four cards and two bows: two cards have no bow to lie in; they hover at the end of the track with a dashed "missing bow" outline that wobbles.
- **Misconception 3 — order doesn't matter / reading right to left.** **Push back:** the ball reads only left to right; a card in the wrong bow makes the ball stop at that bow and wobble while the built letters show "terschmetling" — a word that is not the picture.
- **Misconception 4 — splitting compounds wrong** (Schnee-mann, Leucht-turm, Hand-schuh): the gated splits put the boundary at the compound seam, and the bows make the two parts visible.

## 4. The stage
Layout `stack` (the track needs the full width).

**At 704 px:**
- **Task line** 22 px, de: the prompt (§9).
- **The picture** (centred, 168 px tall, library, on a cream card with 2 px ink) with a speaker badge (36 px) — tap = the whole word spoken.
- **The swing pad** (left of the track, 88 × 88 px): a teal round pad with a curved arrow; tap or swipe it to swing. Next to it the **ball** (a 40 px coral circle with a highlight — apparatus geometry) at the track's start.
- **The track** (608 × 150 px): a cream rail (6 px, 2 px ink). Bows are drawn as arcs **under** the rail (the Silbenbogen convention: the arc hangs below the syllable), each 120 px wide at 704 for ≤ 4 bows; 5 bows (Wassermelone) are 104 px. Empty bows are dashed teal; filled bows take the syllable colour (§8). Each bow has a card bed above the rail where its syllable card sits.
- **The cards** (a tray under the track, 608 × 96 px): one card per gated syllable, scrambled, 104 × 72 px (cream, 3 px ink), syllable in **Andika** 34 px, **lower-case** ("schmet", "ter", "ling") so the capital of the noun cannot reveal the first card; a tiny ear icon (22 px) in the corner.
- **The word line** (bottom, 608 × 56 px): built words in 26 px with their bows drawn under them (smaller).
- **Bubble** (≤ 2 lines) right of the word line; **Check** ("Fahren!" — a ball-on-track icon, 64 px) right of the tray.

**At 360 px:** task line → picture 120 px → swing pad 64 px + track 336 × 120 (bows 80 px each for ≤ 4; 5 bows at 64 px; the track drops the pad below it when 5 bows are needed) → cards in a 2-row tray (cards 96 × 64, syllables 28 px) → Check (56 px) → bubble → word line (a compact horizontal strip). Check bottom ≈ 640 px at 360 × 740. At 320 × 640: cards 88 × 60, syllable 26 px, bows 72 px (5 bows: 60 px); Check ≈ 600 px.

**Library pictures (all 30, de labels verified equal to the word):** insects and bugs/butterfly (Schmetterling), breakfast/pancake (Pfannkuchen), occupations/baker (Bäcker), at the supermarket/ham (Schinken), accessories/necklace (Halskette), miscellaneous/acorn (Eichel), vehicles/ambulance (Krankenwagen), fruits/pear (Birne), bakery/cake (Kuchen), forest creatures/bear (Bär), weather/rainbow (Regenbogen), flowers/sunflower (Sonnenblume), winter/snowman (Schneemann), beach/lighthouse (Leuchtturm), accessories/glove (Handschuh), beach/starfish (Seestern), fruits/watermelon (Wassermelone), weather/umbrella (Regenschirm), fruits/strawberry (Erdbeere), vehicles/airplane (Flugzeug), fruits/apple (Apfel), animals/cat (Katze), fruits/banana (Banane), toys/kite (Drachen — the toy kite, not the dragon), christmas/bell (Glocke), accessories/sock (Socke), animals/fish (Fisch), animals/fox (Fuchs), classroom/book (Buch), accessories/scarf (Schal).

**Words on the apparatus:** only the syllables and the word (the content).

## 5. The hand
- **Tap the picture or its speaker:** the whole word is spoken (`LCSAudio`, de-DE, where the device has a German voice); the picture bounces.
- **Swing** (tap the pad, or swipe up-and-right anywhere on the track): within 40 ms the ball leaves; it flies one arc (360 ms, "whoosh") to the next bow position and lands ("plop", a woody tone that steps up each bow); the arc's trail stays as a dashed bow under the rail. Each swing adds one bow (max 6).
- **Remove a bow:** tap an empty bow → it fades (200 ms) and the ball hops back one position. A bow with a card in it cannot be removed until the card is lifted out.
- **Drag a card onto a bow** (or tap card, then bow): within 40 ms the card lifts; dropped on a bow it sinks into the card bed (180 ms) and the bow fills with its colour; the card speaks its syllable. Dropping on a full bow swaps the two cards. Tap a card in a bow to lift it back to the tray.
- **Cards with no bow:** when every bow is full and cards are still in the tray, the tray cards stay where they are, and a dashed "missing bow" outline appears after the last bow and wobbles gently (the material saying "this card needs a bow").
- **Fahren! (Check):** judged (§7). On success the ball rolls back to the start (300 ms) and rides the bows: one hop per bow (450 ms each), each bow's card lights and is spoken; then the ball rolls straight along the rail under the whole word (700 ms), the cards close up into one word, the first letter becomes the capital (a 200 ms pop: s → S), the whole word is spoken, the picture wiggles, and the word with its bows drops into the word line.
- **Free play ("Schwungbahn"):** any picture of the level, swing freely, cards on request, the ride on any arrangement (no judging).

## 6. The rounds
One round = one word: swing the bows, drop the cards, ride.

**Level "Kurz" (1–2 Silben) — 10 words:** Bär (1) · Fisch (1) · Fuchs (1) · Buch (1) · Schal (1) · Kat-ze (2) · Ap-fel (2) · So-cke (2) · Glo-cke (2) · Dra-chen (2)
**Level "Mittel" (2–3 Silben) — 13 words:** Bä-cker · Schin-ken · Ei-chel · Bir-ne · Ku-chen · Schnee-mann · Leucht-turm · Hand-schuh · See-stern · Flug-zeug (all 2) · Erd-bee-re · Hals-ket-te · Ba-na-ne (3)
**Level "Lang" (3–5 Silben) — 7 words:** Schmet-ter-ling · Pfann-ku-chen · Re-gen-schirm (3) · Kran-ken-wa-gen · Re-gen-bo-gen · Son-nen-blu-me (4) · Was-ser-me-lo-ne (5)

All 30 words (28 old + Birne and Banane), every split exactly as in `approved-words-de.json` (critic re-read all 30 against the file: every key approved, ≥ 4 sources, every split identical, every de picture label identical to the word) (gate v1.1, ≥ 4 sources agreeing — TeX, rule, vocab-phonics, Wiktionary). Splits shown above use the school convention the gate approved (ck stays together: Bä-cker, So-cke, Glo-cke). No split is ever authored by hand; the core reads the approved file at build and the gate fails if a word's tiles differ from it.

**Answer position:**
- **The count** is never on screen before the child swings (no slots are drawn). Within each level the syllable counts are mixed so "always swing 2" fails: Kurz 5 × 1 / 5 × 2; Mittel 10 × 2 / 3 × 3; Lang 3 × 3 / 3 × 4 / 1 × 5.
- **The tray order** is shuffled every round: for 3+ syllables it is never the correct order (a derangement); for 2 syllables the first card lies left in half the rounds and right in the other half (a fixed "always reversed" would itself be a tell). Across a level the first syllable's card sits in each tray position equally often (gate: ± 1 per position per level; "always take the left card first" and "always take the right card first" each succeed in ≤ half of a level's multi-syllable rounds). The tray is in a 2-row layout on phones, read left-to-right, top row first, for this count.
- **Lower-case cards** remove the capital-letter tell of German nouns; the gate asserts no card starts with an upper-case letter.

**Order:** order-only reshuffle per pass; never the same order twice; in Kurz the pass alternates 1- and 2-syllable words for the first four rounds so a child meets "one bow" early.

## 7. Check, the misses, the success
- **Fahren! with no bows:** no miss; the swing pad pulses and the ball bobs; **"Schwing das Wort: ein Schwung für jede Silbe!"**
- **Fahren! with bows but cards still in the tray (and empty bows left):** no miss; the next card bobs; **"Leg die Silben in die Bögen."**
- **Miss 1 — wrong number of bows** (all bows full and cards left over, or all cards placed and bows left empty): the "missing bow" outline wobbles after the last bow (too few) or the empty bows sag and turn grey (too many); the picture's word is spoken again, slowly, with a pause after each syllable (TTS where reliable; the cards in their bows light in time). Bubble: **"Da fehlt ein Bogen."** / **"Ein Bogen ist leer."**
- **Miss 1 — right count, wrong order:** the ball starts the ride and stops at the first bow whose card is out of place; that bow wobbles; the letters as built appear under the rail ("terschmetling"), and the ball rolls back. Bubble: **"Hör genau: Welche Silbe kommt zuerst?"**
- **Miss 2 — count:** the word is spoken once more and, in time with each spoken syllable, a ghost bow pulses under the rail at the right positions (the right number of bows, shown as rhythm, never as cards). Bubble: **"Schwing mit: {n}-mal!"** written as the digit, e.g. "Schwing mit: 3-mal!"
- **Miss 2 — order (Bildhilfe):** each card in the tray and in the bows shows a vertical slice of the picture on its back edge (slice 1 on the first syllable, slice 2 on the second …), so lining the slices up rebuilds the picture — order found by sight, then read by ear. Bubble: **"Schau auf die Bildstücke."**
- **A new move takes the help away** until the next Check.
- **Success:** the ride (§5); bubble: **"Schmet – ter – ling: Schmetterling!"** (the syllables with en-dash spacing, then the word) and a short count line: **"3 Silben!"** Level end: the word line scrolls by with every bowed word and the ball takes one big swing over all of them: **"So viele Wörter mit Silbenbögen!"**

## 8. Settings
1. **Wörter (words):** Kurz / Mittel / Lang (default Kurz) — the picture's word and the tray's number of cards at rest change.
2. **Silbenfarben (syllable colours):** Aus / Blau – Rot (default Blau – Rot) — Blau – Rot fills the bows alternately blue and red, the colouring of the Silbenmethode many German first-grade primers use (blue #2F6FD6 / red #D9452F, the method's own convention, used as content colour); Aus fills every bow teal. The track at rest shows the empty bows dashed in the chosen scheme.

## 9. Words (de is the only locale; EN gloss in brackets)
- on-screen title: **Silben schwingen** [Swing the syllables]
- instruction: **Hör dir das Wort an. Schwing für jede Silbe einen Bogen. Leg dann die Silben in die Bögen und lass die Kugel fahren!** [Listen to the word. Swing one bow for each syllable. Then put the syllables in the bows and let the ball ride!]
- prompt (task line): **Wie viele Silben hat das Wort?** [How many syllables does the word have?] — after the first swing it stays; the task line never changes wording (LAW rule 2).
- hints: **Schwing das Wort: ein Schwung für jede Silbe!** · **Leg die Silben in die Bögen.** · **Da fehlt ein Bogen.** · **Ein Bogen ist leer.** · **Hör genau: Welche Silbe kommt zuerst?** · **Schwing mit: {n}-mal!** · **Schau auf die Bildstücke.**
- success: **{s1} – {s2} – {s3}: {Wort}!** · **{n} Silben!** / **1 Silbe!** · **So viele Wörter mit Silbenbögen!**
- button: **Fahren!** [Ride!] · free play: **Schwungbahn** · settings: **Wörter** — **Kurz** / **Mittel** / **Lang** · **Silbenfarben** — **Aus** / **Blau – Rot**

**Language traps (de):**
- **Splits come only from the gated file;** German hyphenation rules for ck (Bä-cker, not Bäk-ker — the 1996 reform) and st (Seestern: See-stern at the compound seam) are exactly what the gate approved; nobody re-splits by ear.
- **Noun capital:** cards are lower-case; the capital appears only on the finished word (and the pop teaches it: German nouns start with a capital).
- **"Silbe" plural:** "1 Silbe" vs "{n} Silben" — two templates.
- **Pictures that could be named otherwise:** toys/kite = Drachen (also "dragon" — the kite picture is used; the reviewer confirms it reads as a kite); bakery/cake = Kuchen (not Torte); weather/umbrella = Regenschirm (not Schirm) — the spoken word and the picture label are the same word, so a child who says "Schirm" hears "Regenschirm" from the picture first.
- **Framework name:** de prose names the Bildungspläne der Länder / Vorschule, never "Common Core" (§20.10).

## 10. Sound off, access, phones
- Legible silent: the bows, the card fills, the missing-bow outline, the ride lighting each bow and the word assembling carry everything; with sound off the child (or adult) says the word — the picture is the prompt and the instruction says "Hör dir das Wort an" (the build measures de TTS on its test devices; the silent path must work fully on its own).
- Keyboard: S = swing; Backspace = remove the last empty bow; arrows move across tray cards; Enter drops the focused card into the first empty bow; Enter on Fahren! = Check; Space on the picture = hear the word.
- aria: picture "{Wort}"; track "{b} Bögen, {f} gefüllt"; card "Silbe {s}"; ride results in a live region ("Schmet, ter, ling — Schmetterling").
- Taps: swing pad 64–88 px; cards ≥ 88 × 60; bows' hit area 72 px wide.
- Reduced motion: the ball appears at each bow without flying; the ride highlights bows in sequence.

## 11. Distinct from
- **The E8 syllable-builder rows (es/it/pt/fr/fi):** slots given, tap tiles in — this row replaces given slots with bows the child swings, and is the German Silbenbogen convention specifically; those rows will get their own designs from their own countries' syllable methods.
- **Row 74 Rewind Rail / Row 73 Writing Carriage:** letter formation. **sound-boxes tool:** one chip per PHONEME. **blending-board tool:** letter cards blended into words. None counts syllables by swinging bows.
- **New 222 Pencil Path:** a car on a stroke path; here the ball's arcs are the syllables of a word.

## 12. Build plan
- **Core state:** `{ level, colours, order[], idx, word:{text, noun, theme, syllables[]}, bows:int, beds:[cardId|null], tray:[cardId], misses, help, line:[word] }`.
- **Functions:** `swing()` (bows + 1, max 6), `removeBow()` (only an empty last bow), `place(cardId, bow)` (swap if occupied), `lift(bow)`, `ride()` (Check) → `{ok, reason:'noBows'|'unplaced'|'tooFew'|'tooMany'|'order', stopAt}`, `nextTask(index)`.
- **Gate `verify-silbenbogen-core.js` (own oracle):** (1) every word's syllables equal `approved-words-de.json` → `split` for its key, read by the gate itself (a word missing from the approved file fails the build); (2) `ride` ok iff bows = syllables.length AND beds read the syllables in order; reasons exact for every bows 1–6 × every arrangement for ≤ 4 syllables (exhaustive) and sampled for 5; (3) cards are lower-case; the finished word's first letter is upper-case and equals the vocab label; (4) tray order never correct for 3+ syllables; first-syllable position balanced ± 1 per level, and left-first / right-first strategies each ≤ half of the multi-syllable rounds; (5) the 30 words are all present, each once, in the levels listed; fruits/peach and around the house/brush never appear; (6) the picture label in `mini tools/pictures/<theme>.json` (de) equals the word.
- **Mutations:** ride accepts bows ≠ syllables; ride accepts wrong order; 2-syllable trays always reversed; a hand-split replaces a gated split (e.g. Bäk-ker); a capitalised first card; tray already in order; a filled bow removable; help persists after a move; a 31st word without an approved entry; picture label ≠ word.
- **Pictures to verify on a contact sheet:** all 30 (§4; labels verified equal to the words; critic saw fruits, around-the-house, beach and toys sheets); especially toys/kite (reads as a kite) and breakfast/pancake (Pfannkuchen reads as a pancake stack, not a crêpe — acceptable in de either way). **Risks:** five bows at 320 px (60 px bows fit: 5 × 60 = 300); the Silbenmethode colours sit outside the shell palette — a deliberate, named content convention. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a ball that flies one arc per syllable, cards that sink into hammock-bows, and a ride that reads the word back to them.
2. **Would a teacher put it on the board?** Yes — it is exactly "Silben schwingen" and the Silbenbögen of every German primer; the class swings along, and a wrong count shows as an empty bow or a card with nowhere to lie.
3. **Would a parent trust it?** Calm, real pictures, splits from a multi-source checked list, German noun capitals taught right, no score.
4. **The invention:** the child swings one bow per syllable and every bow holds exactly one syllable card — so the count is the child's own, and a wrong count or a wrong order shows itself on the track.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 3→5
What changed:
- All 30 splits re-read from approved-words-de.json (all approved, ≥ 4 sources, identical) and all de labels equal the words.
- Two pictures fail on the contact sheets: fruits/peach is drawn like an apple (existing ruling) and around the house/brush is a shaving-brush/duster ("Pinsel"). Replaced by Ba-na-ne (fruits/banana) and Bir-ne (fruits/pear), both gated — which also lifts Mittel's count variety from 11×2/2×3 to 10×2/3×3. The same two defects are live on the current de page and must be fixed at the source now.
