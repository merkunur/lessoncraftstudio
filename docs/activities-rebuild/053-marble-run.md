# #53 — Muodosta sana tavuista (fi) → TAVUKUULARATA, the syllable marble run (RF.K.2.B, Finnish only)

ORDER row 53 · id `syllable-builder.muodosta-sana-tavuista.rf-k-2-b` (kept).

- **Files:**
  - Added: `marble-run-core.js`, `marble-run-activity.js`, `marble-run-activity.html`, `marble-run-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 2 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** fi only by design.
- **Metadata:** slug, title and intro are frozen. The fi prose is rewritten for the new apparatus.
- **Strand chip:** «Fonologinen tietoisuus», as on the other fi phonology row.
- **Design:** `designs/053-syllable-builder.md`. **Prefix:** `tmr-`.

## The apparatus and its invention: SYLLABLES ARE PIECES OF A MARBLE TRACK
- **The pegboard:** six places in a gentle slope from a teal funnel (two rows of three with a return chute on phones). The places show only faint peg pairs at rest, never the number of syllables.
- **The pieces:** cream track pieces with the syllable on their face. Each has a visible **entry step** at its left end, as high as the consonants before its first vowel (0, 1, or 2 = capped; a 2 is drawn coral).
- **Päästä kuula (Check):** the marble rolls from the funnel. Each piece lights as the marble crosses it, and its syllable joins the **word strip**.
  - **Right:** it drops into the picture's cup only when the strip says the picture's name.
  - **A gap:** it falls through.
  - **A step of 2 after the first piece:** it bumps and rolls back. This is the tavutus rule, *in a native word a syllable after the first starts with at most one consonant* (kis-sa, never ki-ssa), enforced by the track.
  - **A wrong word:** it rolls past the cup into the side dish, and the strip keeps what it read, with the first wrong letter underlined.
- **Miss 2:** shadow outlines of the right number of pieces from the funnel, and the word in grey with a divider at each syllable, on a second line of the strip. A move clears the ride and the help.
- **Right:** the strip turns teal, the marble lands, and the picture hops. A marble is added to the jar.
- **Levels:**
  - **Lyhyet sanat:** 11 words, one decoy each.
  - **Pitkät sanat:** 13 words, one decoy each.
  - **Tavuvahti:** 10 native words; both the right and the wrong split lie on the tray.
- **Settings:** Taso; Ylimääräinen pala (ei / kyllä). Tavuvahti keeps its wrong pieces either way.
- **Keyboard:** Enter places a piece on the first free place, ← → move a placed piece, Delete takes it back, Esc skips the ride.

## Deviations from the design (each measured or ruled)
- **pannukakku and vene are out (native review):**
  - pannukakku: the library pancake is a stack of round *letut*.
  - vene: every library boat has a cabin, so a child says *laiva*.
  - **mansikka** and **laiva** (`vehicles/ship`) are in. The other 27 old words are kept.
  - **karhu** uses `camping/bear` (the forest bear reads as a teddy); **kakku** is the whole `4th of July/cake` (the bakery cake is a slice).
- **The length hint fires only for a true length difference** (ku/kuu, kisa/kissa, banani/banaani: the same word once doubled letters are made single). Any other wrong piece gets «Yksi pala ei kuulu sanaan». A "too short" track gets its own hint.
- **Two-piece trays are at chance**, not a derangement (always swapped is a tell).
- **The guard rule is "the wrong split always holds a piece the marble cannot climb"**, not "every wrong piece has a step of 2": *kilpikonna*'s wrong piece «ko» has a step of 1 and rightly earns the length hint («kilpikona»).
- **Free re-release after landing and pouring the jar are not built.** The rail locks once the marble lands.
- **The tray piece taps place a piece on the first free place** (one tap), and a tap on a placed piece takes it back, as on rows 48–52 (the design's double-tap is not used).
- **Layout:**
  - On phones, Päästä kuula sits beside the cup, the tray under them, and the hint last. The picture is 92 px (72 under 340), and the strip text fits the strip.
  - The Tavuvahti task line is short («Katso palojen askelmia»); the rule itself is in the step hint.

## Gates
- **`verify-marble-run-core.js`: 730 checks, 0 failures.** It carries its own oracle: the 34 words, splits, pictures, level tables, decoys, wrong splits and the vowel list. It checks:
  - **Data:** splits = `approved-words-fi.json`; the fi labels; colour themes; pannukakku / vene never; the old words kept.
  - **The step:** the gate's own step rule.
  - **The tavutus rule:** it holds in every right split.
  - **Tavuvahti:** native words only; each wrong split joins to the word and always holds an unclimbable piece.
  - **The decoys:** each is a real syllable of another word.
  - **The ride:** EVERY ordered arrangement of every subset of every round's pieces from place 1 lands only in word order, with the stop place, the strip and the kind of miss right. Also a gap, an empty place 1 and nothing on the track.
  - **The tray:** three or more a derangement, two at chance, the extra piece uniform. The tray measurement first read 0.430 on every two-piece round, which was the LCG's correlated first draws, not the tray; the instrument is fixed.
  - **Also:** the hand, the hints (incl. the length-only rule), the order rule, the strings and the frozen manifest.
- **`mutate-marble-run.js`: 23 of 23 mutations killed**, including the marble climbing a step of 2, y/ä/ö counted as consonants, a loanword in the rule level, every decoy called a length difference, and the pancake stack back.
- **`local-test-marble-run.js`: 2,600 checks, 0 failures.**
  - **At 704, a real pointer** through every round: nothing asks, a piece dragged to place 2 asks for the funnel, dragged to place 1, the decoy / two-consonant piece, the dish or the roll-back, taken off, a wrong order, the shadow track and grey word, all back, dragged and tapped right, cup, jar, celebrate.
  - **Plus:** a gap, a swap, the keyboard and the settings.
  - **The sweep 320–1366** at rest, miss 2 and landed.
  - It caught the long level 31 px below the fold at 320 and a 14-letter reading overflowing the strip.
- **Other gates:**
  - `visual-qa-activity.js --locale=fi`: 66 renders pass. It caught the strip, an `aria-live` region, keeping the inherited 16 px at every width; the strip now carries its letters' size.
  - `audit-activity-hierarchy.js`: 200 / 0;
  - `audit-settings-efficacy.js`: 2 live;
  - prose claims, SERP copy, content tells, answer rank, route preflight, font shorthand ×2 and `verify-activity-content-fi` are green.

## Review (one agent, Finnish native + esiopetus / alkuopetus pedagogy): applied
- **Required:**
  - pannukakku and vene out (picture names);
  - the false prose claim that the decoys differ only in length → «Ylimääräinen pala muistuttaa usein oikeaa palaa»;
  - the length hint only for real length differences;
  - learningGoals and practices (consonant clusters, not only double consonants).
- **Optional, applied:**
  - «Ylimääräinen pala» for the setting;
  - the instruction («laittamalla tavupalat»);
  - hintStep («uusi tavu alkaa enintään yhdellä konsonantilla»);
  - hintLength («kuuluuko jokin äänne pitkänä vai lyhyenä»);
  - «vieriessään».
- **Confirmed fine:**
  - the rule statement;
  - every split (seep-ra, au-rin-gon-kuk-ka, lin-nun-pönt-tö, pork-ka-na);
  - kisa / kuka as honest wrong readings;
  - the other pictures (karhu / juna / pallo / kello may get a second name; acceptable).

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title:** «Esiopetuksen fonologia» sounds academic; *fonologinen tietoisuus* is the normal term.
- **The intro:**
  - esiopetus has its own plan (EOPS 2014), not the basic-education OPS 2014;
  - «Yhteensopiva … kanssa» is a calque;
  - «tavujen … ääntäminen» is translationese.
