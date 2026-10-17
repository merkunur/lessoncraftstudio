# Row 57 — The Sticky Name Tag: it sticks letter by letter, and peels where the word is different (RF.K.3)

## 0. Identity
- id `choice-board.read-cvc-word.rf-k-3` (KEPT) · grade K · Common Core RF.K.3 (know and apply grade-level phonics in decoding words) · strand Reading: Foundational Skills · page title (frozen, en) "Read the Word, Tap the Picture — Decoding CVC Words"; titles/intros frozen in en/de/es/pt/it/nl; fr/sv/da/no/fi slug, title and intro are new at build.
- own files `mini tools/name-tag-core.js`, `name-tag-activity.js`, `name-tag-activity.html`; the manifest row moves to `name-tag-activities.json` (id/slugs/titles/intros frozen), removed from `choice-board-activities.json` in the same commit, registered in `MANIFEST_FILES` (§21.5). `choice-board-core.js` untouched.
- worksheets it covers: **K-225** Match Word to Picture, **K-324** Picture Word Cards (Level 1); **K-347** Picture Cards and Word Cards: Matching Pairs (Level 4 memory pairs); **G1-306** Word Families: Read and Write, **G1-330** Read and Circle, **G1-332** Word Family Carpet: Read and Color, **G1-333** Word Families with Blends (Level 2); **G1-331** Join the Syllables and Write the Word, **G1-334** Read the Syllables, Find the Picture (Level 3).
- what the old activity did: showed a printed word; four pictures sharing its beginning (cat, cap, can); tap the right one. **Kept:** the frozen promise ("the picture choices share beginnings on purpose, so the only way to find the right one is to read the whole word, all the way to the last sound"), the nine en rounds' words, the de/es/pt/it/nl rounds. **Fixed:** en `lip`/`lid` (`body parts/lip`, `kitchen tools/lid` — not in the library) → the `lip` round is replaced by `pen`; the broken locale references are listed in §6.

## 1. The pitch
"The word is a name tag: hang it on a picture and it sticks down letter by letter from the left — on the wrong picture it sticks until the first different letter, then peels off and falls, so you can see that you have to read to the end."

## 2. Why a child will want it again (the fun)
- **Sticky tags.** The word is printed big on a luggage-style tag with a string. Drag it onto a picture and — after Check — it presses down letter by letter, *tk, tk, tk*, like a sticker being smoothed with a thumb.
- **The peel.** On *cap* the tag "cat" sticks its **c**, sticks its **a**… and at **t** the corner curls up, the tag peels off backwards, flutters and drops back to the tray. Children watch to see *how far* it got — two letters! — and that is exactly the reading lesson.
- **Dressing the wall.** Every picture that gets its own tag wears it on a string like a gift label. A wall of pictures fills with name tags across the pass; tap one and it swings and says its word.
- **Memory pairs (Level 4).** Face-down cards: flip a picture and a tag; if they belong, the tag smooths itself onto the picture right there — if not, it peels and both cards turn back.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** decode a printed word left to right, all the way to the last letter, and match it to its picture (RF.K.3); read word-family words where only the first letter changes (G1-306/330/332/333) and words printed in syllables (G1-331/334).
- **Misconception 1 — reading the first letter and guessing** (cat → cap). The tag sticks only as far as the letters match; it peels at the first difference. A guess from the first letter is physically shown to fail at the end.
- **Misconception 2 — "nearly" is enough.** Two of three letters matching is not a match: the tag never stays on with a curled end.
- **Misconception 3 (word families) — the end is the same, so any picture will do.** In Level 2 the family shares its ending; the *first* letter decides, and a tag on a family sibling won't stick even its first letter.
- **How the material pushes back:** the tag's own adhesion — matching letters stick, the first different one lifts the tag off.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stage 704 × 470):**
- **The picture wall** (left column): a cork-coloured board 460 × 400 (`#E8D5B0`, 2 px ink) with **four picture frames** in a 2 × 2 grid, each 190 × 170 (white card, 2 px ink), **library picture at 136 px**, a small brass hook at each frame's lower edge where a tag hangs.
- **The tag** (right column, y 80–200): a tag 220 × 96 (cream, rounded 12, 3 px ink, a punched hole with a short string at the left), the word at **52 px** school print (Andika / the shell's reading font), letters evenly spaced so each letter has its own sticking zone. Level 3 tags show syllable dots ("pen·cil").
- **The tray** (right column, y 210–300): where the tag returns after a peel; in Level 2 it holds 3–4 tags.
- **The bubble** (right column, y 310–420).
- **Task line** above (≤ 24 px). No words on the apparatus except the word(s) on the tag(s) (content).

**At 360 px (stage 360 × 680):** wall 344 × 344, frames 2 × 2 at 160 × 150, pictures **104 px**; the tag tray above the wall (tags 180 × 76, 40 px letters); bubble under the wall; Check last. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: frames 146 × 136, pictures 92 px, tags 164 × 70, 36 px letters). Level 2 with 4 tags at 360: tags 150 × 64 (34 px) in two rows.

## 5. The hand
- **Hang a tag:** drag the tag onto a picture frame; it hangs loosely from that frame's hook, swinging gently (it has not stuck yet). Drag it to another frame to change; drag it back to the tray to take it off. Tap the tag then tap a frame = the same (keyboard path §10).
- **Check = smooth it down.** The tag presses down letter by letter from the left (120 ms per letter, a soft *tk* each, the pressed letter darkening to full ink with a tiny glue sheen). At the first letter that differs from the picture's name, pressing stops; the rest of the tag curls up from the right (200 ms), then the tag peels off backwards and flutters back to the tray (500 ms). On the right picture every letter presses down and the string ties itself in a bow.
- **Hear it (bonus):** tap a frame → TTS says the picture's name; tap the tag → TTS says the word slowly, sound by sound (where available). Neither is needed: the task is reading.
- **Level 3 joining:** the tag arrives in two or three syllable pieces; drag one piece onto another's right edge and they clip together (*click*); only a whole tag can be hung.
- **Level 4 memory:** tap a face-down card to flip it (300 ms); after two flips the pair is tested automatically.
- **Free play:** tags already hung on the wall swing when tapped and say their word; after a pass the child can pull tags off and re-hang them.

## 6. The rounds
A pass = a level's table, order-only reshuffled. In every Level 1 round the wall holds the target and three pictures chosen to share its beginning (two share the first two letters where the lexicon allows; one shares the first letter only) — the old design's intent, made exact.

**Level 1 — Read the word, hang the tag (EN; legacy rounds marked L).**

| # | word | target (themeDir/noun) | other pictures on the wall |
|---|---|---|---|
| 1 L | cat | animals/cat | cap (accessories), can (At the Supermarket), car (toys) |
| 2 L | can | At the Supermarket/can | cat, cap, bus (vehicles) |
| 3 L | cap | accessories/cap | cat, car, ham (At the Supermarket) |
| 4 L | bus | vehicles/bus | bun (bakery), bud (spring), cat |
| 5 L | bun | bakery/bun | bus, bud, hat (accessories) |
| 6 L | hat | accessories/hat | ham, bat (animals), sun (beach) |
| 7 L | bat | animals/bat | bag (At the Supermarket), ham, jam (At the Supermarket) |
| 8 L | jam | At the Supermarket/jam | jar (kitchen tools), bus, pig (animals) |
| 9 | pen | classroom/pen | pan (around the house), pig, hen (farm animals) |
| 10 | mop | around the house/mop | map (camping), mug (kitchen tools), cup (around the house) |
| 11 | fan | around the house/fan | fox (animals), fig (fruits), van (vehicles) |
| 12 | dog | animals/dog | duck (animals), log (camping), bed (around the house) |

**Level 2 — Word families (G1-306, G1-330, G1-332, G1-333).** One round = a family: 2–4 tags of the family in the tray, their pictures + one picture from another family on the wall; hang every tag. When all hang, the cork wall behind them fills with a woven *carpet* pattern in the family's colour (G1-332 "read and colour").

| # | family | tags | wall pictures (extra = not in the family) |
|---|---|---|---|
| 1 | -at | cat, hat, bat | cat, hat, bat + cap |
| 2 | -an | can, fan, van | can, fan, van + pen (classroom) |
| 3 | -ag | bag, flag | bag, flag (4th of July) + bat, + cat |
| 4 | -ed | bed, sled | bed, sled (winter) + bus, + hen |
| 5 | -ar | car, jar, star | car, jar, star (christmas) + cat |
| 6 | -un | bun, sun | bun, sun + bus, + cup |
| 7 | -en | hen, pen | hen, pen + ham, + net (beach) |
| 8 | -ug | mug, jug, rug | mug, jug, rug (around the house) + map |
| 9 | -og | dog, log, frog | dog, log, frog (camping) + duck |

(Blends — *flag, sled, star, frog* — are G1-333's "families with blends"; their tags stick their two-letter onset as two letters.)

**Level 3 — Words in syllables (G1-331, G1-334).** The tag comes in syllable pieces; join them, hang the tag. Each round puts the word's look-alike partner on the wall (same first syllable), so the second syllable decides. Splits from `approved-words-en.json` — only words whose gated split is a clean reading split (allow-list in §12).

| # | tag | target | wall partner (same first syllable) | other wall pictures |
|---|---|---|---|---|
| 1 | pen·cil | around the house/pencil | penguin (animals) | monkey (zoo animals), muffin (bakery) |
| 2 | pen·guin | animals/penguin | pencil | popcorn (At the Supermarket), carrot (vegetables) |
| 3 | car·rot | vegetables/carrot | carpet (around the house) | cupcake (bakery), hammer (tools) |
| 4 | car·pet | around the house/carpet | carrot | muffin, panda (animals) |
| 5 | ham·mer | tools/hammer | hamster (pets) | basket (At the Supermarket), monkey |
| 6 | ham·ster | pets/hamster | hammer | pancake (breakfast), pencil |
| 7 | pan·da | animals/panda | pancake (breakfast) | basket, cupcake |
| 8 | pan·cake | breakfast/pancake | panda | basketball (activities), popcorn |
| 9 | bas·ket | At the Supermarket/basket | basketball | muffin, carpet |
| 10 | bas·ket·ball | activities/basketball | basket | penguin, hamster |

(The draft's *but·ter / but·ter·fly* pair is struck: `at-the-supermarket/butter` is a yellow block with holes that every child reads as CHEESE — PICTURE-RULINGS — so the tag "butter" would be "wrong" on a picture the child correctly names. *pan·da / pan·cake* (both TeX+rule+vocab agreed) is the same lesson: one shared first syllable, the second decides. `activities/basketball` is confirmed on the contact sheet as the ball itself, not a player.)

In Level 3 the tag sticks **syllable by syllable** (a syllable presses as one) and peels at the first different syllable — *pen·cil* on the penguin sticks *pen*, peels at *cil*.

**Level 4 — Memory pairs (K-347, K-324).** Six cards face down (3 pictures + 3 tags); a picture + its tag stay up with the tag stuck on; any other pair flips back after 1.2 s (a tag on a wrong picture shows its peel first). Boards: {cat, can, cap} · {bus, bun, bud} · {hat, ham, bat} · {jam, jar, bag} · {pen, pig, pan} · {mop, map, mug} · {fan, fox, fig} · {dog, duck, log} — each board's words share beginnings, so a remembered *position* is not enough; the tag must be read.

**Other locales.** de, es, pt, it, nl keep their nine rounds (same-beginning sets: de *Ball/Banane/Bagger*, es *gato/gallo*, pt *bola/bolo*, it *Gatto/Gallo*, nl *kat/kam*) — re-checked 2026-10-17, with broken references to fix at build: de `weather/sun` (→ `beach/sun`), de `clothing/pants` (*Hose* — no pants picture: replace), es `weather/sun` ×4 (→ `beach/sun`), pt `weather/sun` ×3 (→ `beach/sun`), pt `At the Supermarket/egg` and `/grapes` (no entry: replace), it `tools/nut`, `body parts/chin`, `vegetables/turnip` (no entries: replace). fr/sv/da/no/fi panels author 12 Level 1 rounds, ≥ 7 family rounds (where the language has families: sv *-ål, -at*; da/no *-us*; fr *-on, -ou*; es/it/pt/fi use "same first syllable" sets instead — §9) and ≥ 7 syllable rounds from their `approved-words` file.

**Answer position (measured):** the target's frame (one of four) is uniform per level (¼ ± 1 per pass); the picture sharing the most letters with the word sits beside the target (row or column neighbour) in exactly half the rounds; Level 4 card layouts are shuffled so a word's tag and picture are never always adjacent. The gate counts all three.

## 7. Check, the misses, the success
- **Check with the tag in the tray** → hint, no miss: "Hang the tag on a picture first." (Level 2 with tags still in the tray: "Some tags are still in the tray." — not a miss.)
- **Miss 1 — the peel:** the tag presses down letter by letter and peels at the first different letter (§5); the letters that stuck stay printed faintly on the picture's frame for 2 s as a "glue mark", and the first different letter on the tag is ringed in coral. Hint: "It stuck as far as {k} letters — look at the next letter: {letter}." (k = 0: "The very first letter is different.")
- **Miss 2 — the reading finger:** the tag spreads its letters apart on little hooks (c · a · t) and a soft light walks under them left to right, one letter at a time, with each sound spoken where TTS exists; under each picture on the wall its own name appears as a faint ghost word for 3 s, so the child compares print with print, to the end. Hint: "Read every letter, all the way to the end."
- **A new move takes the help away** until the next Check.
- **Success:** every letter presses down, the string ties a bow, the picture's frame glows once, and the tag gives a little swing. TTS reads the word (where available). Bubble: "c-a-t: cat — you read it to the end!" (EN source: "{sounds}: {word} — you read it to the end!"). Level 2 end: the carpet weaves in; "cat, hat, bat — the -at family!". Level 3: "pen-cil: pencil!". Level 4 end: "All the tags are on!".

## 8. Settings
1. **Level:** Read the word · Word families · Words in syllables · Memory pairs — the wall + tray change at rest (one tag / a family of tags / syllable pieces / face-down cards).
2. **Look-alike pictures:** close (default: shared first two letters) · far (only the first letter shared) — the wall shows the closer or farther set at rest (early readers start on "far").

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native ×11 + pedagogy reviewer)
- title (frozen en) · instruction: "Read the word on the tag. Hang it on its picture, then press Check."
- task lines: L1 "Read the tag and hang it on its picture." · L2 "Hang each family word on its picture." · L3 "Join the pieces, read the word, hang the tag." · L4 "Find each picture and its tag."
- hints / celebrations: §7. Settings: "Level", "Read the word", "Word families", "Words in syllables", "Memory pairs", "Look-alike pictures", "Close", "Far".
- aria: "Tag: {word}." · "Picture {n} of 4." · "The tag stuck {k} letters and peeled at {letter}." · "Tag on: {word}." · "Card {n}: picture / tag, face down / up."

**Locale traps:**
- **What "decodable" means differs:** en CVC; de/nl/sv/da/no rich CVC(C) monosyllables (de capital nouns: the tag prints *Ball* with its capital, and the picture's name is compared case-insensitively); es/it/pt/fr/fi decode CV-CV words — their sets share the **first syllable** (*gato/gallo*, *bola/bolo*) so the second syllable decides.
- **Letters with marks are letters:** *ä ö ü ß å æ ø ñ ç é è ê*; *ö ≠ o* in the peel test (*Mus ≠ Müs*-type), *ñ ≠ n*. The comparison is by **grapheme clusters**, so *sch*, *ch*, *ij*, *ll* each count as the letters they are but a peel never happens in the middle of a combining accent.
- **Word families** exist only where the language uses them pedagogically (en, nl *-at/-ip*, sv/da/no); Romance and fi use syllable families (*ba·be·bi*, *ka·ke·ki*), so their Level 2 is "same ending syllable" sets (*pato/gato/rato*) — each panel rules it, the reviewer confirms.
- **Syllable dots** use the locale's `approved-words` split only (da: the `policy_managed:false` pool).
- **Reading font:** single-storey *a* and *g* (school print) in every locale.
- Sound off: everything is print + the peel.

## 10. Sound off, access, phones
- Silent legibility: the press-down, the curl at the first different letter, the glue mark and the coral ring.
- Keyboard: Tab to the tag, Space picks it, ←/→/↑/↓ choose a frame, Space hangs; Enter = Check; Level 3: Space picks a piece, → attaches it to the previous; Level 4: arrows + Space flip.
- aria-live: "Stuck c, a. Peeled at t." / "The tag is on: cat."
- Taps: frames ≥ 136 px, tags ≥ 150 × 64, cards ≥ 96 px.
- Pictures: 136 px at 704, 104 px at 360, 92 px at 320.
- Reduced motion: the peel becomes a fade with the ring kept.
- Phone: tray → wall → bubble → Check.

## 11. Distinct from
- **Row 54 Blending Magnets** (sounds snapped on a rail, attraction test on the picture's spoken parts), **row 55 Sound Boxes** (lids pop where sounds match), **row 56 Flip Card** (a swap turns the card). This is the only *printed-word* decoding instrument of the batch: the test is print against print, left to right.
- **Row 58 CVC builder / row 61 tell-words-apart (batch 10)** — building words from letters / telling look-alike words apart; here the child reads a whole given word and the tag's adhesion judges it.
- **Premium `blending-board`, `letter-tiles`, `dictation-desk`** — building and checking spellings; none hangs a word on a picture.
- **New 229 Blink Viewer** (overlay twins) — pictures vs pictures; this is word vs picture name.

## 12. Build plan
- **Core state:** `{level, round:{word|tags[], pictures:[{key, theme, name}]}, hung:{tagId → frame}, memory:{cards[], up[]}, misses}`. Functions: `hang(tag, frame)`, `unhang(tag)`, `stickTest(tagWord, pictureName)` → `{stuck:k, peelAt}` comparing grapheme clusters (Level 3: syllable units) from the left; `check()`; `join(pieceA, pieceB)`; `flip(card)`.
- **Gate's own ground truth (`verify-name-tag-core.js`):** for every round, exactly one wall picture's name equals the word (vocab label in the page locale, lower-cased); every Level 1 distractor shares ≥ 1 leading letter with the word (≥ 2 for the "close" set where listed); `stickTest` re-implemented in the gate with `Intl.Segmenter` graphemes; Level 2 tags all share the family ending and the extra picture does not; Level 3 splits read from `approved-words-en.json` and restricted to the TeX-agreed allow-list (pencil, penguin, carrot, carpet, hammer, hamster, panda, pancake, basket, basketball, muffin, cupcake, popcorn, monkey — every one checked 2026-10-17 to carry TeX + rule + vocab agreement in `approved-words-en.json`) because many en gated splits are rule-only (*rob-ot*, *ban-an-a*); position balances per §6; every picture exists and is colour; legacy en words present.
- **Mutations:** stick on a first-letter match only · stick fully when two of three match · compare right-to-left · peel at the right letter but report k+1 · case-sensitive compare (de *Ball*) · accent folded (*ö = o*) · Level 2 extra picture accepted · Level 3 split not from the file · target always top-left · help at miss 1 · help kept after a move · pass 2 order = pass 1.
- **Pictures to verify on a contact sheet:** animals cat, bat, pig, fox, dog, duck, penguin; At the Supermarket can, ham, bag, jam, basket, popcorn; breakfast pancake; animals panda; accessories cap, hat; toys car; vehicles bus, van; bakery bun, muffin, cupcake; spring bud (✓ critic 2026-10-17: a single red flower bud on a stem — reads as "bud"; a hard word for K, so it stays a DISTRACTOR's job only in rounds 4–5 and the target rounds never use it); beach sun, net; kitchen tools jar, mug, jug; classroom pen; around the house pan, mop, cup, fan, bed, rug, carpet, pencil; camping map, log, frog; fruits fig; farm animals hen; 4th of July flag; winter sled; christmas star; vegetables carrot; tools hammer; pets hamster; insects and bugs butterfly; activities basketball (✓ critic 2026-10-17: the orange ball itself); zoo animals monkey. Seen 2026-10-17: animals, around-the-house, at-the-supermarket, kitchen-tools.
- **Risks:** the per-letter press must line up with the printed letters — the tag lays letters in fixed-width cells (monospaced layout of a proportional font, centred per cell) so each sticking zone is exact.
- **BLOCKED:** nothing for en (lip/lid replaced; butter replaced; bud and basketball confirmed on the contact sheets).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — sticky tags that press down and peel, a wall of named pictures, a memory game.
2. **Would a teacher put it on the board?** Yes — "read to the end" is not a slogan here: the tag shows exactly how far the word matched and where it differs.
3. **Would a parent trust it?** Yes — library pictures, calm, no score, all print, works silently.
4. **The invention:** a name tag that sticks down letter by letter from the left and peels off at the first letter that is different.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- *but·ter / but·ter·fly* struck: the butter picture reads as cheese, so the right tag would "peel" off a picture the child names correctly → *pan·da / pan·cake* (both TeX+rule+vocab agreed). Allow-list re-verified word by word against `approved-words-en.json`.
- Level 2 *-an* round had no outsider picture (four tags, four frames), so misconception 3 could not appear → three tags + *pen*.
- spring/bud (a red flower bud) and activities/basketball (the ball) confirmed on the contact sheets; the conditional fallbacks removed.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
