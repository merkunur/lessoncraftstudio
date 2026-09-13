# G2-317 `verb-forms` : editor-critic record (2026-09-13)

Inputs: `_work/G2-317-pedagogy.md` + `_work/G2-317-design.md`. Output: `../G2-317-verb-forms.md`. Doctrine applied: measured buildability beats preference; the brief's rules beat both. Everything below was read or measured in the repo on 2026-09-13.

## 1 Contradictions + resolutions

| # | pedagogy | design | resolution (who won, why) |
|---|---|---|---|
| 1 | Faces: F1 match pronoun/infinitive · F2 picture gap sentences · F3 irregular core (PARAM) · F4 choose among 3 forms · F5 find the verb, write the infinitive | F2 match · F3 gap sentences x6 · F4 present/past pair table · F5 ending sort · F6 who does it | **Pedagogy's five.** Ending sort: honest in fr it es pt only; a last-letter bot scores 100 % (the sv #26 class); the "regularity" variant writes PAST forms = Kl. 3 in de; nl refused. Who does it: F1 by direction + F5's exactly-one-chip move, refused in 3. The pair table is absorbed: in tense-mode locales the irregular core IS a present/past table with `pool:'irregular'`. Face 4 keeps the A-tier fr/it head. |
| 2 | Base = 3 verbs x 6 persons (18 cells, 9 gapped), pictures optional per row | Base = two side-by-side `verbTable`s (2 verbs) + 3 lanes, both headers pictured | **Design geometry** (measured 734 <= 736, 206 px box, >= 44 px rows) with the **pedagogy's data rules**. Items d2 = 9-11, inside the G23 window. |
| 3 | A cell equal to a printed anchor is NEVER gapped | A gap equal to the header infinitive is SOFT (allowed), >= 3 hard gaps per table | **Pedagogy (the brief's instruction).** Anchors are printed, never gapped, never counted as givens; `given = min(d.given, nonAnchorRows - 3)` keeps >= 3 hard gaps: fr/es/it/pt/fi 2 + 4, de 1 + 3, nl 0 + 3. The design's `given:2` alone would leave de with 2 hard gaps. |
| 4 | en grid = `he/she/it today · yesterday` | "the en 3sg -s is not a page" | **Pedagogy.** With the base form printed, en present cells equal the anchor and can never be gapped; the 3sg present column makes both columns a task (L.1.1.c + L.2.1.d). |
| 5 | Pictured floor: fr 3 -er = the page minimum | `< 8 pictured verbs refuses the locale` | **Pedagogy.** The design's 8 would refuse en (5), pt (6), fr (3). Base needs 2 pictured verbs (its two tables); floor = 3 per pool. |
| 6 | Picture = fixed `pic:{theme,noun}` from 10 opened files | 16 candidate names, "UNKNOWN until opened" | **Pedagogy, minus `athlete`** (a second runner, a duplicate cue for one verb, no bank has two run-verbs). Allowlist = 9. The 6 unopened design candidates (fishing skiing skating knitting sewing biking) match no bank verb in any locale. |
| 7 | nl F1: 3 distinct forms (loop/loopt/lopen): 9 lines or refuse | `matchRows` drops the row identical to 3p | **Ships**: nl `matchPersons ['ik','jij','wij']` x 3 verbs = 9 lines (>= 8), three blocks stacked (608 px); this IS the groep-4 point (stam / stam+t / hele werkwoord). Recorded as a data decision the nl panel may still refuse (hub 65). |
| 8 | de F1 distinct forms = 5 | `matchRows` 5 in de | **Re-measured: 4 for regular verbs** (`male malst malt malen`; `ihr malt = er malt`); 5 only with Vokalwechsel (`lauft`). `matchPersons` de = `ich du er wir`; new poison P11. |
| 9 | F1 tense mode = infinitive -> past form | (same) | **Critic addition:** with past forms alone a longest-common-prefix bot scores 6/6 (`hoppa -> hoppade`). Right column = past AND present of each verb (12 items, 708 px), the child draws to the past only; stem-bot gate + poison P10. |
| 10 | fan = `verbGroup` / `tense` | `fanAxis:{name:'tense'}` (the G2-315 `ruleAxis` mechanism) | **README cross-type ruling: `unitAxis`**, units are DATA (`kind:'tense'` changes `forms[unit]`; `kind:'group'` filters the pool). |
| 11 | de `sie` frames carry a name | `sie` never offered bare on the who-face | **Extended to nl `zij`** (she/they, the same ambiguity): frames carry a NAME; poison P5b. |
| 12 | data file `data/b3/verbs.js` | `data/b3/verb-forms.js` | **`verb-forms.js`** (the task + the key). |
| 13 | F4 choose = 8 rows | lane 110 (the design's lane) | 8 x 110 = 880 > 736: re-laid at **h 84** (8 x 84 + 7 x 8 = 728), padding 6 14, one-line sentence <= 44 chars + pills h 40 (71 <= 72). Same for Face 6 (69 <= 72). Pill widths *est.*, engineer measures. |
| 14 | base d1: 2 pictured verbs, 1 gap per column | base d1: 2 lanes with `pillChoice` | d1 lanes `write` (the choose move belongs to Face 5 alone). d1 does not ship. |
| 15 | hub coordinate `mode:'base'` | (none) | **`mode:null`** (m: every `word-classes` + `letter-tracing` base landing in `frontend/content/seo-landing/en.json` carries `mode:null`; G1-307 follows it, G2-315 wrote `'base'` and should be aligned). |

## 2 Claims removed as unverified or wrong

- Design line numbers in `templates/components-b2.js`: `pillChoice :675` -> **:226**; `wordTiles :475` -> **:26**; `rulingBlock :507` -> **:58**; `fixChecklist :712` -> **:263** (m). The `page.css` numbers were right (`.ws-page` :16-26, `.ws-lane` :401, `.ws-nchip` :412, `.ws-blankbox` :445, `.ws-match` :354).
- Design: "candidate ACTION pictures … 16" and "whether each shows a PERSON ACTING is UNKNOWN": 14 were opened (section 3); the other 6 are irrelevant to every bank.
- Design: `.ws-lane` inner 639x82 and lane 110 as the Face-5/6 row: replaced (contradiction 13).
- Design: "Ships 8/11" (who) and "10/11" (bins): the faces are gone.
- Pedagogy: de F1 distinct forms 5 (contradiction 8); `occupations/athlete` in the allowlist (6).
- Pedagogy F0 d2 "3 verbs (>= 2 pictured), ~50 % gaps": replaced by the design's 2 tables (contradiction 2).
- Both files: "Nunito 800" is loaded (m: `page.css:398, 419` use weight 800), kept.
- Neither file measured the body height: still "≈ 760, proven at 736".

## 3 Pictures opened (Read tool, `scripts/worksheet-gen/cache/themes/…@3x.webp`)

| file | what it shows | verdict |
|---|---|---|
| activities/running | a girl in a red shirt running, full stride | ACTION: run |
| activities/reading | a girl sitting cross-legged on a cushion reading a green book | ACTION: read |
| activities/jumping | a girl holding a skipping rope, one foot lifted, mid-step (not airborne) | ACTION, weak: jump-rope; da `hoppe` vs `sjippe` = panel call |
| activities/dancing | a ballerina en pointe, arms out | ACTION: dance |
| activities/hiking | a hiker with a red backpack and a stick stepping over rocks and grass (small ground scenery baked in) | ACTION: hike / wander; candidate for fr `marcher`, it `camminare` |
| activities/writing | a young man (teen/adult) writing in a notebook at a desk | ACTION: write; figure older than K-3 |
| activities/baking | a girl in a chef's hat and apron with three buns on a board, hands on one | ACTION, weak: bake (reads "baker") |
| occupations/singer | a boy singing into a stand microphone while holding a guitar | ACTION: sing (dual cue with "play") |
| occupations/artist | a child, back to the viewer, painting an easel canvas with a brush | ACTION: paint (de malen, es pintar, fi maalata; NOT draw) |
| occupations/athlete | a girl running (tank top, shorts) | duplicate of running: DROPPED |
| activities/swimming | swimming goggles, nobody | OBJECT: refused |
| activities/singing | a hand-held microphone, nobody | OBJECT: refused |
| activities/painting | a paint palette with a brush, nobody | OBJECT: refused |
| activities/playground | a climbing frame with a slide, nobody | OBJECT: refused |

## 4 Numbers re-measured (node, `data/b2/word-classes.js`, `data/b2/sentences.js`, `cache/manifest.json`, `topics-taxonomy.json`, `strand-names.ts`)

- Verb bank: en 28 (10/10/8) · de 30 (11/10/9) · es 30 (11/12/7) · pt 32 (12/12/8) · fr 28 (11/10/7) · it 30 (11/12/7) · nl 32 (12/11/9) · sv 30 (10/11/9) · da 30 (10/11/9) · no 31 (11/11/9) · fi 30 (11/11/8). Pedagogy's counts confirmed; the design quoted none.
- Pictured verbs (bank ∩ allowlist, every name confirmed present): en 5 (run read jump dance sing) · de 8 · es 7 · pt 6 · fr 6 (-er 3) · it 6 · nl 7 · sv 7 · da 7 · no 7 · fi 7. Candidates via hiking: en `wander`, fr `marcher` (would make -er 4), it `camminare`, es `pasear`, pt `passear`/`andar`, nl `lopen`, fi `kävellä`: panel calls.
- Names 8 per locale; frames 19-23 with no verb slot (pedagogy right).
- `activities` = 34 nouns all with a vocabKey; `occupations` 49 files / 35 vocab (substrate right).
- `verb-forms` in `topics-taxonomy.json`: 0 hits. `strand-names.ts:170` `Language` row: en de fr es nl fi pt it sv; **da + no absent**.
- `gate-variation-distinct.js` reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (pedagogy OPEN 10 confirmed).
- Absent files: `templates/components-b3.js`, `lib/b3-picture-index.js`, `tools/validate-b3-draft.js`, `tools/apply-b3-locale.js`, `scripts/verify-hub-type-rows.js`.
- Face 2 tense geometry: right column 12 x 48 + 11 x 12 = 708 <= 724 (`.ws-match` padding 6); left 6 x 100 + 60 = 660; item widths 250 + 250 + padding 60 = 560 <= 675.

## 5 OPEN items

**Engineer**
1. Measure the exact body height (header + instruction + footer) on a de and a fi render; every stack is proven at 736.
2. Baloo 2 / Nunito 800 advance: the 96 px pronoun column (`er/sie/es`, `ils/elles`), the 206 box at 12 letters, the 169 px pill at 11 letters (Face 5 three pills <= 571). On failure lower `maxFormLetters`, never the font.
3. Build `verify-hub-type-rows.js` (spec: brief step 10) and poison-test it before `apps['verb-forms']` lands.
4. `gate-variation-distinct.js` is b2-bound (wave-b2 + ROWS): a b3 wave file / rows list, and it must read `pool` + `given` for the PARAM Face 4.
5. `unitAxis` plumbing (README ruling) so de Präteritum / fr -ir can fan later; the exemplar ships now. A unit may carry a different band (de Präteritum Kl. 3): the wave's level per unit is not plumbed today.
6. `formMatch` with a 2n right column (`.ws-match-col` uses `space-around`, so mismatched counts render; confirm the dot alignment at 48 px items).
7. Face 4 chip-only headers (`src:null`): keep the 84 px header so the table geometry stays byte-identical to the base.

**Panels (x11)**
8. Every panel OPENS its 5-8 `pic` files and confirms the weak cues (jumping = jump-rope; baking; singer with guitar; writing = an older figure). da: `hoppe` vs the jump-rope picture.
9. nl: ship Face 2 as 3 x 3 (9 lines) or refuse; and the `zij` name rule.
10. fr: accept `marcher` on the hiking picture (-er pictured 4) or keep 3.
11. no: `-et` vs `-a` preterite, one form per cell (Bokmålsordboka).
12. fi: `juosta` in the d2 `noGradation` pool (3. lk convention).
13. en: d2 `pool:'all'` (L.2.1.d) vs `regular`; F6 homographs `dance play jump`.
14. da + no: author the `Language` row for `strand-names.ts` (Fælles Mål / LK20 domain names).
15. sv/da/no/fi: `[NSR-FLAG]`; sv copy never uses `grupp`.

**Pipeline**
16. `tools/validate-b3-draft.js` + `apply-b3-locale.js` + `lib/b3-picture-index.js` + `templates/components-b3.js` are owned by the first b3 design built; this file assumes their existence.
17. The meta lead inherits `seo.words.free_printable` ("Free printable"): the tier-truth ruling (README item 1) is catalogue-wide; surface before the first b3 publish.
18. G2-315's hub coordinate says `mode:'base'`; the corpus uses `mode:null` for a base landing: align G2-315 when it is built.

## 6 Quality verdict (a critical second-grade teacher)

The base page is the conjugation table I actually draw on the board, with a picture and the infinitive as the only help, and the three sentences underneath make the child use it at once; nothing on the page gives the answer away, not even "wir laufen", because that row is printed as what it is.
The five variations are five different things my class does with a verb (find the form, use it, learn the hard ones, pick the right one, name the base form), not five colourings of one table, and the Dutch and Nordic pages teach what THEIR curriculum teaches instead of a translated German paradigm.
What still worries me: two of the nine pictures are weak (the girl is not visibly jumping, the baker is holding buns), and eight sentences at 84 px with three pills each will be tight on a Finnish page; both are measured before a child sees them, not after.
