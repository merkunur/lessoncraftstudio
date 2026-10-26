# #128 — Wiggles' Sentence Builder → THE SENTENCE STAGE (L.1.1.j; all 11 locales)

ORDER row 128 · id `sentence-builder.build-a-sentence.l-1-1-j` (kept). Design: `designs/128-sentence-builder.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/sentence-stage-core.js` (`SentenceStageCore`) holds the model:
    - every locale's sentences as blocks with roles (determiner, number word, describing word with its colour/size tag, naming word with its actor count, doing word, other word, question opener, end mark, es ¿ ¡), and the level-5 word banks per photo;
    - the script line (a tapped block goes to the first empty place; tapped on the line it goes back); Check, its reasons (start, end, who, order, verb, false) and the hints; the glow from miss 2;
    - what the stage shows after any number of acted words;
    - the plan: a fresh order per pass, and a tray that never starts with the sentence's start or ends with its end and never falls to "a capital first, the end mark last, the rest as given".
    - DATA is written by a build script.
  - `sentence-stage-activity.js` draws the toy theatre (valance, curtains, floorboards, spotlight pools in the colour the sentence gives them, the library actors, the acts, the shimmer and the stars of an exclamation), the level-5 photo frame, the script line with its metronome dot (the speed setting at rest), the wings and the poster strip (CSS prefix `ss-`, `apparatusClasses: ['ss-art']`).
  - `sentence-stage-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `sentence-builder-activity.js` and `sentence-builder-core.js` stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `sentence-builder-activities.json`; `tool` → `sentence-stage-activity`; `params` = `{level: [1…5], speed: [slow, quick], rounds: {1–5: 9}}`; en, de, fr, es, pt, it, nl, sv slug, title and intro frozen; **da, no, fi authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.873.
- **Prose:** en–sv replaced; da, no, fi added. Every quoted sentence is a sentence of that locale's rounds, a true level-5 sentence, or the wrong order the prose describes, with the show freezing where the prose says (gate-checked).
- **Strings:** 36 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/sentence-builder.build-a-sentence.l-1-1-j.js` (replaced): picked (nothing graded before Check) · missed (the stage frozen, the place flickering, the hint) · resolved (every block green, the bow; Next 0.5 s later).
- **Sources** (scratchpad): `sst-src.js` → `sst-build.js`; `sst-strings.js` → `sst-apply.js`; `sst-prose.js`, `sst-manifest.js`, `sst-dump.js`, `sst-probe.js`, `sst-review-fix.js`, `sst-review-fix2.js`.

## The invention
**A sentence is a script, and the stage acts it word by word.** The start word opens the curtain, a number word lights that many spotlights, a describing word sizes the light or colours it, the naming word brings the library actor on, the doing word makes it act, and the end mark closes the curtain. The show freezes at the first word that cannot follow what it has acted. In *The dog big runs.* the dog has already walked on, and *big* has nothing left to describe, so the show freezes on *big*. In level 5, a false word is acted too: a green light under a brown dog, beside the photo.

## The levels
1. **With clues**: the actor stands on the stage as a clue. The end mark rides on the last word. The live canonical sentences are kept.
2. **No clues**: the stage is empty until the naming word acts.
3. **Beginning and end**: the end mark is its own block.
4. **Ask and shout**: questions and exclamations; es with ¿ ¡ blocks, fr with *Est-ce que*.
5. **About the photo**: the child writes from a bank of a determiner, two naming words, four describing words, three doing words, and . and !. The order is the language's own (det–adj–noun in en/de/nl/sv/da/no; det–noun–adj in fr/es/pt/it; adj–noun in fi). A sentence is right when every word is true of the photo.

## Deviations from the design (each measured or ruled)
- **Tap, not drag.** A tapped block goes to the first empty place, and tapping a placed block sends it back. Reading order is the building order.
- **Freeze rule:** the stage skips only describing words when it looks ahead, so a misplaced describing word freezes at itself and every other wrong word freezes at once. Only the sentence's own order plays to the end.
- **The "shortest to longest" guess** is refused by the plan wherever the word lengths allow. Where the middle words already run shortest to longest, it cannot be refused: once a four-word sentence's start and end are found, only two orders remain. The gate asserts it wins only there.
- **Level 5 has at most one describing word** (review): two after a noun need a conjunction in fr/es/pt/it, and two in a row read badly elsewhere.
- **Level 5 has one true doing word, the one the photo shows** (review): the old pairs (*runs / sits*, *stops / drives*) cannot both be true of one still picture. The sheep and horse photos gave way to a fish (swims) and a bat (flies); the dog *smiles*, and the duck walks.
- **Level 5 has no starters** (*I see / Look at*): a starter changes the sentence frame in every locale and was cut to keep one frame per language.
- **No free-play word preview.** After success the stage replays the whole show on a tap.

## Review
ONE native + Grade-1/2 pedagogy reviewer over all 11 locales: every sentence with its picture, every level-5 bank with what the photo shows, the strings, the prose and the new metadata.

Applied:
- **Second orders removed:**
  - es/pt/it: size and age adjectives that can stand before the noun became colour words, which only go after it (es *El pájaro naranja*, *El ratón gris*, *La gata naranja duerme otra vez*, *La camioneta naranja*; pt *O rato cinza*, *A vaca branca*, *Minha pipa vermelha*, *O cachorro marrom*; it *Il topo grigio*, *La mucca bianca*, *Il cane marrone*, *Il furgone arancione*).
  - fr *Le canard jaune nage* (was *joyeux*).
  - fi level 3 without the adverbs that may also stand before the verb.
- **Truths:** nl *De rode vis* (was *gladde*, which no picture can show); it *Il piccolo uccello* (consistent with level 2).
- **Level 5:** one adjective, one true verb, new photos. no *En snegle* (masculine). da *gøer* (*gør* also means *does*).
- **Strings:**
  - missWho in all locales: *The actor comes on before the doing word* (the actor never comes first).
  - de okSentence *großer Anfangsbuchstabe*.
  - fr missEnd *Le point à la fin*.
  - es *va al final*.
  - da missFalse word order and quote marks.
- **Prose:** pt *com uma reverência*; sv and no wording; level-5 examples updated.

Kept, with reason: nl *gakt* (the standard Dutch word for a goose). The frozen de L1 *Der bunte Fisch* is true of the patterned fish.

**Open (frozen metadata, not edited):** the en intro and the de, fr, es, pt, it, nl and sv titles and intros describe the retired tile game with Wiggles the caterpillar.

## Gates
- **`verify-sentence-stage-core.js`:** 71,628 checks, 0 fail. It has its own tables:
  - what each picture shows, and each locale's colour words;
  - the kept live level-1 sentences;
  - its own reading of a script: skip only describing words, freeze at the first word that cannot follow; level 5 by the language's template plus truth.

  What it covers:
  - every sentence (a capital start, only German nouns capitalised inside, one end mark, es ¿ ¡ paired, number words agreeing, colour words true, no word twice, pictures exact case);
  - 300 random scripts per round freeze where its own reading freezes;
  - level 5, an exhaustive template walk plus 300 random scripts per photo;
  - the reasons, empty and part scripts, no glow after one miss, the glow at miss 2;
  - the plan and its bots, strings × 11, prose quotes and the manifest.
- **`mutate-sentence-stage.js`:** 17 of 17 killed, control survived.
- **`local-test-sentence-stage.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. See the record below.
- **`visual-qa-activity`:** PASSED, 216 renders. Its first run found the six-hens round pushing Next below the fold, so that stage was tightened.
- **`audit-activity-hierarchy`:** 218 / 0.
- **`audit-settings-efficacy`:** "level" and "speed" both change the board.
- **`audit-activity-next-delay`:** pass.
- Content × 11, prose claims, SERP copy, content tells and route preflight: pass.

My own render read found two things:
- the six hens ran four to a row under the curtains at 360 (now three to a row);
- a level-5 miss on a false word in first place left the curtain shut (it now acts the false thing).

## Live
`live-verify-sentence-stage.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200. en, de, sv and fi at 1366 and 390 embed sentence-stage-activity.html at wrapper 9.873. With a real pointer, two swapped words freeze the show (the place flickers, the stage is frozen, and the hint names the word), and the sentence then plays to the end with the bow, every block green and the success line. The iframe grows with the card. The first run came minutes after the deploy and still saw the old iframe in the page cache; once the page served 9.873 (checked with curl), the second run was clean.
