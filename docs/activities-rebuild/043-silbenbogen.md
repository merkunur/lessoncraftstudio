# #43 — Bau das Wort aus Silben → DIE SCHWUNGBAHN (RF.K.2.B, German only)

ORDER row 43 · id `syllable-builder.bau-das-wort-aus-silben.rf-k-2-b` (kept).

- **Files:**
  - Added: `silbenbogen-core.js`, `silbenbogen-activity.js`, `silbenbogen-activity.html`, `silbenbogen-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 12 rows are byte-identical). The es/it/pt/fr/fi syllable rows stay on their engine untouched.
  - 0 shared-core lines.
- **Locales:** this row ships in German only by design; every language's syllable activity is its own row.
- **Metadata:** slug, title and intro are frozen. The de prose is rewritten.
- **Design:** `designs/043-syllable-builder.md`.
- The `silbenbogen` prefix was checked free before the first write.

## The apparatus and its invention: EVERY SWING DRAWS ONE SILBENBOGEN, AND EVERY BOW HOLDS EXACTLY ONE SYLLABLE
- **No slots are given.** The child taps the picture to hear the word, then swings it. Each tap of the swing pad (or a swipe across the track) flings the ball one arc along the track and leaves a Silbenbogen under the rail.
- **The bows ARE the slots.** The child's own swing count is what builds them.
- **Syllable cards** are lower-case Andika, so the noun capital cannot reveal the first card. They are dragged into a bow, or tapped and then a bow. A full bow swaps; tapping a card in a bow lifts it back; tapping an empty bow removes it.
- **Fahren! (Check):**
  - No bows: "Schwing das Wort …". Not a miss.
  - Cards left and empty bows left: "Leg die Silben in die Bögen.". Not a miss.
  - All bows full with cards left over: "Da fehlt ein Bogen." A dashed missing bow wobbles after the last one.
  - Every card placed with bows left empty: "Ein Bogen ist leer." The empty bow sags grey.
  - Wrong order: the ride stops at the first wrong bow, which wobbles, and the letters as built show under the rail ("lingterschmet"). The hint asks which syllable belongs in *this* bow.
- **Miss 2:**
  - On a count miss: ghost bows pulse the right count, and the hint is "Schwing mit: {n}-mal!".
  - On an order miss: each card shows its slice of the picture (Bildhilfe), and the hint is "Schau auf die Bildstücke."
  - A new move takes the help away.
- **Success:** the ball rides each bow and speaks each syllable. The cards close up into the word with its capital, and the note reads "Schmet – ter – ling: Schmetterling!" and "3 Silben!". The word, with its coloured syllable arcs, joins the word line.
- **Settings:**
  - Wörter: Kurz / Mittel / Lang.
  - Silbenfarben: Aus (teal) / Blau – Rot (the Silbenmethode colouring).
- **Keyboard:** S swings; Backspace removes an empty bow; Enter places the focused card in the first empty bow.
- **Words:** 29, each split taken from `approved-words-de.json` (≥ 4 sources agreeing); the gate re-reads the file.
  - Kurz: 5 one-syllable and 5 two-syllable words.
  - Mittel: 9 two-syllable and 3 three-syllable words.
  - Lang: 3 three-syllable words, 3 four-syllable words and Wassermelone with five.
- **The tray:** the first syllable's card rotates through every position per level and is re-dealt each pass. A word of 3+ syllables never lies in reading order or reversed, on any pass.
- **Order:** an order-only reshuffle per pass that never repeats the previous order. In Kurz the first four rounds alternate one and two syllables.

## Deviations from the design (each measured or ruled)
- **Schinken dropped** (review): the ham-roll picture reads as "Wurst" (one syllable), exactly the count conflict this activity tests. That leaves 29 words.
- **The design's peach/brush defects were already fixed live** (Banane and Birne are in the old row).
- **On phones the swing pad stands beside the picture**, so the track keeps the full width and Check stays above the 640px fold.
- **The tray card width follows the syllable count** on phones, so every card of a word fits one row (≥ 54px).
- **The bows share the whole track** and the ball may rest over the last bow. Six bows still give a 44px target at 320px.
- **No "Schwungbahn" free play** and no level-end swing. The three levels and the colour setting carry the activity.

## Fixes from the build (each found by a gate or a render)
- **"schmet" overflowed its card** at 704. Each syllable's font is now sized to its card (≥ 14px).
- **After the ride the ball parked on the first card.** It now rests after the last bow.
- **The empty tray** stayed as a blank box after the win; it is now hidden.
- **At 320, the five-syllable word put controls below the fold** and the bows were 39px. The pad moved beside the picture and the bow width was recomputed.
- **S and Backspace worked only once.** A repaint rebuilt the cards and dropped keyboard focus out of the activity. Focus now stays on the same card or the pad.
- **A mutation survived as an equivalent mutation:** the deal has two guards, and weakening only the first is caught by the second. The harness now mutates `rev` itself.

## Shared gates corrected (measurement, not thresholds)
- **`audit-settings-efficacy.js`:**
  - **Before:** it demanded drawer labels in all eleven locales from every activity. A German-only row cannot be reached from a French page.
  - **After:** the required locales are the ones the activity's manifest rows give a slug. This is the same rule the gate already applied to tools, read from the file the site reads; with no row found it still expects all eleven.
  - **Poison-tested:** blanking the German label of `setLevel` fires on exactly `de`.
- **`generate-activity-previews.js`:** it skipped every row without an English slug and rendered in English. The one-language syllable rows (43–53) had kept the old engine's thumbnail. It now draws such a row in its own language.

## Gates
- **`verify-silbenbogen-core.js`: 609 checks, 0 failures.** Its own oracle re-reads `approved-words-de.json` and the picture labels. It covers:
  - every split, ≥ 4 sources, every label and picture, and the design's levels and counts;
  - ride() exact for every bow count 0–6 × every placement of the cards (exhaustive up to 4 syllables, sampled for 5);
  - lower-case cards, the noun capital, the tray rules over passes 0–11 and the left/right-first strategies;
  - the hint ladder, the swing/remove/place/lift rules and the order rules;
  - layout floors, strings and the frozen manifest.
- **`mutate-silbenbogen.js`:** 18 of 18 mutations killed. The harness refuses to run on a red clean gate.
- **`local-test-silbenbogen.js`:** 1,220 checks, 0 failures, real pointer. It covers:
  - every word of every level: a ride with no bows, too many bows, removing a bow, a drag-swap into the wrong order with the picture slices, and the right ride with the capital and the celebration;
  - settings and keyboard;
  - a width sweep 320–1366 at rest and built: controls ≥ 44px, pictures ≥ 64px, syllables inside their cards, everything above the fold.
- **`visual-qa-activity.js --locale=de`:** 60 renders pass.
- **`audit-activity-hierarchy.js`:** 362 / 0.
- **`audit-settings-efficacy.js`:** 2 live (Wörter, Silbenfarben).
- **Other gates:** the de content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are all green.
- **Read by me:**
  - the 30-picture contact sheet;
  - rest and built at 320, 360, 704 and 1024;
  - the order miss with picture slices, and the win with the word line;
  - the new preview.

## Review (one agent, German native + pedagogy): applied
- **Confirmed:**
  - all 30 splits and counts (ck stays together, the Fibel and Silbenmethode convention) and the level progression;
  - the strings ("Fahren!", "{n}-mal", "1 Silbe" / "{n} Silben") and the framework naming.
- **Required fixes, applied:**
  - Schinken dropped;
  - hintOrder is now "Welche Silbe gehört in diesen Bogen?" (the ride stops at the first *wrong* bow, often bow 2 or 3);
  - ariaTrack and ariaBow use label forms (no "1 Bögen");
  - prose: the ball *spricht* rather than *liest*, the count is 29, "mit ein oder zwei Silben", and "Namenwörter".
- **Optional fixes not applied, with the reason:**
  - **Bäcker** (a toque might suggest Koch): the figure holds bread, and tapping speaks the word.
  - **Halskette, Wassermelone, Pfannkuchen** (Berlin: Eierkuchen): every picture is spoken on tap, and the counts match the spoken word.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The intro** describes the old tap-and-build mechanic and does not mention swinging or counting.
- **The title and slug** name only the building half.
- **The live page's previous prose** taught wrong splits ("So-nne", "A-pfel"). It is replaced by this rebuild's prose.
