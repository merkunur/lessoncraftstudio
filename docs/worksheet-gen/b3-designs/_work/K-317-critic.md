# K-317 `letter-of-the-week` : editor-critic record (2026-09-13)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` section 1, `_work/K-317-pedagogy.md`, `_work/K-317-design.md`. Verified in the repo: `primitives/trace-path.js` (`textLaneGeometry`, `strokeLetterLane`, `strokeWordLane`; no `blankIndex` option exists), `templates/components-b2.js` (`letterBoxes`, `sceneStage`, `rulingBlock`, `pillChoice`), `templates/components.js` (`answerBox`), `lib/b2-common.js`, `enumerate.js`, `render/render-instance.js`, `emit/manifest.js`, `emit/deck-html.js`, `qa/lints.js`, `primitives/_tokens.js`, `types/k/K-221`, `K-224`, `K-229`, `K-238`, `K-284`, `K-310`, `types/_shared/lit-sound-match.js`, `lit-word-build.js`, `data/literacy/letter-knowledge.json`, `beginning-sounds.json`, `frontend/config/topics-taxonomy.json`, `frontend/content/seo-landing/en.json`, `tools/gate-variation-distinct.js`, `tools/apply-b2-locale.js`, `tools/validate-b2-draft.js`. Output: `../K-317-letter-of-the-week.md`.

## 1 Contradictions + resolutions

| # | conflict | resolution | basis |
|---|---|---|---|
| 1 | design: themed page (`applicable:true, minNouns:12`), letter derived from the theme; pedagogy: theme axis OFF, cross-theme per-letter pool | **theme OFF, cross-theme pool, letter = fan lever** | (m) single themes reach 4 hits + 4 foils for only some (theme, letter) pairs (en 75 of 1,300; da 14); best single theme = 12 hits. A themed page makes the letter a function of the theme and cannot serve "letter m worksheets". Cross-theme letters passing the floor: 17-22 per locale. |
| 2 | base shape: design four zones incl. position cards (748 px); pedagogy three zones | **three zones** (trace / hunt / write), 604 px at d2 | position is face 3's move; four zones put it on the base and left 12 px of slack. |
| 3 | face sets differ | **F2 words-with (anywhere), F3 position, F4 circle+count, F5 unit, F6 pair** | see section 2 for each drop. |
| 4 | design F(a) scene hunt | **rejected** | `sceneStage({theme, nouns, ...})` calls `fileUri(theme, noun)` with ONE theme, so a cross-theme pool cannot feed it; a single-theme scene re-pins the letter to the theme (conflict 1). Band question resolved anyway: no `bandFor`; hero -> front, others alternate mid/back by index parity, repeats back/mid. |
| 5 | design F(c) big-letter tracing | **rejected** | K-238/K-278 family (`strokeLetterLane` lanes over the alphabet); the design file flagged it itself. |
| 6 | pedagogy V3 missing-letter gap | **rejected** | `lit-word-build.js` mode `cvc-missing` = picture + word with ONE blanked tile, child writes the letter, blank position panel-chosen. V3 is the same act with the answer known in advance (the week's letter). |
| 7 | design F(e) write the whole word with M pre-filled | **rejected** | K spelling a whole word from a picture is G1-244's skill and above a K page; the letter scaffold does not lower it. |
| 8 | replacement fifth face | **F2 "Words with M": anywhere hunt, PARAM `scope:'anywhere'`, hits non-initial** | genuine step between onset (base) and position (F3); owns the es/it/pt "palabras con la M" heads the design wanted for F(e); capacity 21-25 letters per locale (m). |
| 9 | pedagogy F.5: V4 id band K vs G1 | **id band G1** (content is G1 in 9 of 11 locales); landing `level` per locale from `units[].band`; hub still 6 rows per key | substrate: ids follow the band the CONTENT belongs to. |
| 10 | design `fold` flag for accents vs pedagogy grapheme-true hits | **no fold**: hit = `graphemes[0] === L` exactly; foil = NFD base free of L | `école` is neither an e-hit nor an e-foil; one rule, no per-locale flag. |
| 11 | design zone 3 = `rulingBlock` with starters; pedagogy = model glyph | **`strokeWordLane({text:'M', reps:1, stack:true})`** | `rulingBlock.starters` renders Nunito `<text>` in inkSoft, not a stroke model. |
| 12 | design position boxes 28 px via `letterBoxes` | **44 px boxes in a NEW `positionCard`** | `letterBoxes` default 26 px; a K answer slot floor is 30 px (`tokens.density.K`). |
| 13 | pedagogy V5 chips "44 px", design none | `letterChips` NEW, 48 px, fixed a|b order | `pillChoice` read: text pill row, no per-card stamp. |

## 2 Claims removed as unverified or wrong

- "effective glyphH ~50 in a 74 px lane, engineer must measure" (design): measured, 48.7 for capitals, 52 for lowercase; lanes set to 80 px.
- "whether 28 px letter boxes pass the K element lint" (design): `qa/lints.js` has NO element-size lint (checks: blank, overflow, footer, broken image, font >= 9, palette; `density` is passed in and never read). The 56/30 floors are a brief rule; the design file asserts them in the type gate instead.
- "the wave can pin a per-letter axis, UNKNOWN" (design) and "who adds a letters axis" (pedagogy F.1): resolved from `enumerate.js` + `render-instance.js:22`: no letter axis, `build()` receives `{theme, difficulty, locale}` only; the wave ships the exemplar; the fan is the named `letterAxis` change.
- pedagogy "Face V1 chips ●○○" as text: replaced by the `positionKey` pictogram (no characters to localise, nothing the font lint can fail).
- pedagogy "da 514 eligible": the da pool the pedagogy itself mandates (strict, `policy_managed:false`) yields 295 (m); 514 is the unfiltered pool.
- design "`letterBoxes` cannot do grapheme-wide boxes -> `groups:[1,1,3,1]`": moot (position boxes are not per-letter boxes any more).
- design "verify requires the traced word to be in the hit set": moot (base traces the letter, not words).
- design d1 `scope:'initial'` vs d2 `'anywhere'` ladder: replaced; base is initial at every level, anywhere is face 2 (a level relabel is not a face, brief rule 2).

## 3 Numbers re-measured (node, 2026-09-13)

- Eligible pool (approved AND pictured AND `traceable`, distinct by word): en 796 · de 703 · es 759 · pt 713 · fr 641 · it 770 · nl 732 · sv 667 · da 295 · no 584 · fi 780.
- Letters with >= 4 initial + >= 4 foils (string-level): en 22 · de 21 · es 21 · pt 21 · fr 18 · it 19 · nl 22 · sv 19 · da 17 · no 20 · fi 21 (pedagogy: 22/20/21/22/20/19/21/18/23/20/21; differences = grapheme-true subtraction in de/nl/sv/no, the strict pool in da, and fr/pt within 2).
- Letters with 2 start / 2 mid / 2 end, letter once: en 20 · de 19 · nl 17 · sv 17 · no 17 · da 15 · es 12 · pt 12 · fr 12 · it 11 · fi 8 (fi m/k/b end = 0: confirms the syllable re-target).
- Letters with >= 6 circle-able words (1-2 occurrences, <= 9 letters): 21-25 in every locale.
- Lane geometry (`METRICS` capMarkTop 1, capTop 16, ascender 14, base 84, desc 96; `LANE_PAD` 6): h 74 / glyphH 52 -> capital 48.7, lowercase 52; h 80 -> 52 / 52; h 90 / 56 -> 56; h 110 / 64 -> 64; word lane h 56 / 40 -> 40. `textGlyphs('Sch').width` = 145.5 units, `'Aa'` 106, `'ij'` 62.1.
- Existing data: `beginning-sounds.json` items per locale 22-26 (too small to seed this type; the bank is new). `letter-tracing` has 6 en landings (`mode:null, theme:''`); `beginning-sounds` has 0. `topics-taxonomy.json` contains no `letter-of-the-week`. `scripts/verify-hub-type-rows.js` does not exist.

## 4 OPEN items

For the engineer:
1. Build `letterAxis` (enumerate loop + `deckIdFor` letter part + `instanceSeed` + `render-instance` passing `letter` to `build()` + `manifest.variant_id` + `{U}{L}` token resolution in `emit/deck-html.js`); until then only the exemplar deck per face is shippable.
2. Build `scripts/verify-hub-type-rows.js` (6 rows per key per locale; count distinct faces once letters fan).
3. Measure fi syllable-mode capacity for F3 (`approved-words-fi.json`: letters with >= 2 words per syllable index, letter once); refuse F3 for fi if < 8 letters.
4. Confirm the en F5 grapheme-true subset of sh/ch/th (substring counts 30/40/20 include `mishap`-type splits); the panel marks, the validator checks rule 11.
5. Assert the density floors in `qa/verify-b3-letter-of-the-week.js` (no lint does it): icons >= 56, chips/boxes >= 30, poison P6.
6. `letterCard` width for `Sch`-class units (111 px at glyphH 52 in a 134 px inner width): compute from `textGlyphs().width * scale`, never a fixed 150.
7. F4 caps rows: re-run `traceable()` AFTER `toLocaleUpperCase` (K-284 lesson; pt Ã / nl Ï have no capital strokes).
8. Register `apps['letter-of-the-week']` + `axes['exercise-type']` x 11 before `enumerate` (it throws on a missing family slug/name for non-EN).

For the native panels:
9. Confirm exemplar letters (est. en M, de M, es M, pt A, fr A, it A, nl k, sv S, da S, no S, fi A) against the local "letter of the week" convention and the pool floors.
10. Open every hit picture (sv #35 rule); mark any noun whose picture shows several objects.
11. Author `graphemes` in en/es/fr/pt/it/da/fi (no chunk layer there); a second cold panel audits them before apply.
12. Decide F5 band labels per locale (`units[].band`), da F5 at 1. klasse or refuse, no kj/sj at 2. trinn or refuse.
13. The EN source strings are handed over as a source to audit, not a target.

For the build session:
14. **Meta lead vs "nothing is free"** (pedagogy F.4, NOT resolved here): the deck description lead comes from `seo.words.free_printable` in `frontend/messages/<loc>.json` via `emit/deck-html.js:188`; `frontend/content/seo-landing/en.json` still carries "| Free Printable PDF" in `letter-tracing` titles (read 2026-09-13); the sv and fr b2var drafts record doubled-worksheet-word leads in that same string. Confirm the LIVE lead per locale from shipped bytes before panels write MIDDLEs; do not assume the brief's "Free printable {TITLE}".
15. Confirm the Romance "ma me mi mo mu" head stays with G1-306 `syllable-reading` (pedagogy F.7); es/it F5 keep ch/ll/rr and ch/gl/sc.
16. Level labels: de/it panels may band the whole type 1. Klasse / classe prima; the hub gate accepts any band-table key, so this is a data decision.

## 5 Quality verdict (a critical kindergarten teacher)

The base is the four-zone page I already know from the classroom, minus the one zone that was too much for five-year-olds, and every picture the child circles is one they can name because the panel checked it. The five faces are five different things to do with one letter (hear it anywhere, find where, count it in words, meet its two-letter friend, tell it from its twin), not five colours of the same sheet. What I still cannot see from a document is whether a 100 px picture with no word under it is unambiguous for THIS letter in THIS language; that is settled only by the panel opening the pictures.
