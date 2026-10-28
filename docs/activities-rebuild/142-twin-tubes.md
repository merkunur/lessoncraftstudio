# #142 — Three Ways to Show a Number → THE TWIN TUBES (2.NBT.A.3; all 11 locales)

ORDER row 142 · id `match-pairs.three-ways-to-show-a-number.2-nbt-a-3` (kept). Design: `designs/142-match-pairs.md`.

## The invention
- **The twin stand.** A round deals nine cards — three numerals, three number names, three expanded forms — for three numbers made of the same digits (247, 274, 427; with zeros 305, 350, 530). The child puts two cards in the stand and each pours its hundreds, tens and ones into its own three glass tubes:
  - a numeral digit by digit;
  - an expanded card part by part;
  - a word card in the order its words name the places (de / nl / da pour the ones before the tens: *vierundsiebzig*).
- **Two cards clip together only when all three pairs of tubes stand level.** The pair goes to the shelf; tapping it puts it back in the stand beside the third card, which completes the triple.
- **Frosted glass.** The word card (and, in digit values, the coloured-digit numeral and its word) pours into frosted tubes: the liquid arrives but its height is hidden, so reading the number name stays the child's job. A clip melts the frost.
- **The misses:**
  - **Miss 1:** the uneven tubes are ringed, the clear card's amount is written beside its tube (a frosted one shows "?"), and the hint names the place: "The tens are different: 4 tens and 7 tens." or "The tens are not the same. The card with clear tubes has 4 tens."
  - **Miss 2:** each part is written over its tube in both halves (200 | 40 | 7 against 400 | 20 | 7; a word card's own words).
- **Digit values** (setting): one digit in all three places (721, 172, 217); the coloured 7 clips with 700 and "seven hundred".

## Files and wiring
- **New files:**
  - `mini tools/twin-tubes-core.js` (`TwinTubesCore`) holds the model:
    - the three sets of 8 rounds;
    - word chunks cut on the shipped number words (`PlaceValueCore._NUMBER_WORD_HELPERS`, read only), so they always join back exactly;
    - the cards, the deal (no number keeps one column), the pour, the level test, put / take out / pour, literal hint keys, the plan.
  - `twin-tubes-activity.js` (`TwinTubesActivity`, prefix `tt-`, `apparatusClasses: ['tt-art']`) draws the deck, the stand and its tubes, and the shelf.
    - Phones (narrow): word cards one per line.
    - Under 310 px: word cards two to a row, shorter tubes.
    - A finished round hides the deck (and on phones the empty stand), leaving the three triples on the shelf.
  - `twin-tubes-activity.html`.
- **Manifest:** the row stays in `match-pairs-activities.json`, metadata frozen (it already shipped in 11 locales).
  - `tool` → `twin-tubes-activity`.
  - params = `{cards: [three, digits], nums: [nozero, zeros], rounds}`.
  - The old `match-pairs` engine still serves the other rows.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.886 → 9.887.
- **Prose ×11:** rewritten. Each quotes 247 / 274 / 427, 305 / 350 / 530, 300 + 5 and the 7 in 721 (700), all real rounds.
- **Deviations from the design:**
  - The found pair is tapped from the shelf into the stand instead of jumping there automatically. Auto-placement would tell the child the card belongs to that number.
  - There is no chime triad or end-of-round re-pour animation.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **A zero count broke the hint sentence** in fr / es / pt / it / fi ("Cette carte a aucune centaine", "Tässä kortissa on ei satoja"). The zero forms are now *zéro centaine*, *cero centenas*, *zero centena*, *zero centinaia* and *nolla sataa*, which also read correctly inside "different: … and …".
- **"Bright digit" read as "pale"** in de / nl / sv / da / no / fi (and fi used the same word for the clear card). The digit is now the coloured digit: *farbige Ziffer*, *gekleurde cijfer*, *färgade siffran*, *farvede ciffer*, *fargede sifferet*, *värillinen numero*, plus es *de color*, it *colorata*, en *colored*.
- **sv "i stället" means "instead"**, so the stand is now *stativet* everywhere.
- **Framework bands:**
  - sv Lgr22 åk 1–3;
  - da Fælles Mål 1.–3. klasse;
  - fi OPS 2014 vuosiluokat 1–2;
  - nl SLO-kerndoelen (end-of-primary).
- **Prose wording:**
  - de "Stellenwertschreibweise" is the 2H 7Z 4E notation, so it is now *Zerlegung (wie 200 + 70 + 4)*;
  - fi "luku kaatuu" (the number falls over);
  - da "intet ur" is now *intet stopur*;
  - da okDigit spelling (*Cifret*);
  - nl pThree.
- **"This card has 4 tens" did not say which card.** The hint now names the card with clear tubes, in every locale and in the prose.

## Gates
- **`verify-twin-tubes-core.js`: 26,997 checks, 0 fail.** It checks:
  - **Every number 100–999 in 11 locales against the shipped words:** the chunks join back exactly, pour each non-zero place once and a zero place never, the hundreds first, in the language's order (ones before tens in de / nl / da), a teen as one word. Only French 71–76 / 91–96 pour as one chunk.
  - **The rounds:** same digits, never three different hundreds, never a whole hundred, the zero set always has a zero, the digit set one digit in all three places.
  - **The old activity's numbers**, read from git (f243102a): five stay, and their patterns have counterparts.
  - **The deal:** 1,000 deals, plus probes with a stuck column.
  - **Level if and only if same value**, for every card pair in every round of every setting × 11 locales. Every pair also clips with its own third card and only that one.
  - **The rest:** frost, the play-through hint keys, the plan, strings ×11 (no digit in a hint, never "free", the count phrases), prose and the manifest.
- **The gate found two real core bugs:**
  - The ones word hiding inside the tens word (pt *sete* in *setenta*, it *tre* in *trenta*, fr *cinq* in *cinquante*) made those words pour tens and ones as one chunk.
  - In digit values a found pair poured its numeral's digits (721) instead of the value it shows (700), so no digit round could ever be finished.
- **`mutate-twin-tubes.js`:** 27/27 killed; the control passes.
- **`local-test-twin-tubes.js`: 7,051 pass, 0 fail** (real pointer, 11 locales). It covers:
  - one card, then the diff hint with 4 and 7 beside the ringed tens;
  - out;
  - the frosted hint;
  - miss 2's split over both halves;
  - a pair with the frost melted;
  - a triple;
  - the round line, then Next 0.5 s later;
  - 305 = 300 + 5 with the tens tubes dry;
  - the 7 in 721 is worth 700;
  - every round of every setting at rest, miss and solved through 320…1366.
- **`visual-qa-activity`:** 240 renders pass. The first runs failed because the finished round left the hidden deck taking up space, so the deck is now hidden when done.
- **`audit-activity-hierarchy`:** 195 / 0.
- **`audit-settings-efficacy --tool=twin-tubes-activity`:** both settings are live.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the renders** found what no gate had:
  - the right cradle overflowing its half at 360 and covering the left one;
  - a Finnish word broken mid-word in a 320 px cradle;
  - a blank row where a used word card had stood;
  - miss 2's labels pushing only one half's tubes down.

  All fixed.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-twin-tubes.js` ran on production on 2026-10-28: **52 pass, 0 fail.**
- All 11 pages return 200.
- en, de, sv and fi, at 1366 and at 390, embed twin-tubes-activity.html at wrapper 9.887.
- With a real pointer, 247 against 200 + 70 + 4 gives the tens tubes ringed and "4 tens and 7 tens". Every number was then clipped by hand (numeral + word, then the pair + its expanded form), which gave the round line.
- The iframe grows with the card.

The first run fell in the Cloudflare cache window for sv and fi (the cached pages still embedded the old tool). The rerun was clean.
