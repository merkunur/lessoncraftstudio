# K-319 `emotions`: editor-critic record (2026-09-14)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README (cross-type rulings, 722 body, `unitAxis`), `_PANEL-FINDINGS.md §11`, `G1-307-opposites.md`, `G1-308-read-and-do.md`, `_work/K-319-pedagogy.md`, `_work/K-319-design.md`. Verified in the repo: `templates/components.js` (exports `iconRows fitIcons iconScatter mixedScatter chipRow answerBox distractorsFor`), `templates/components-b2.js` (`rulingBlock:58`, `pillChoice:226`, `wordBank:210`, `sceneStage:138`), `templates/layouts/card-grid.js`, `page/page.css` (`.ws-page:16`, `.ws-cardgrid:119` gap 14, `.ws-card:126`, `.ws-card-stage:156` padding 6 4, `.ws-match*:354-391`, `.ws-lane:401`, `.ws-achip:406`), `types/_shared/science-category-sort.js`, `types/_shared/lit-vocab-match.js`, `types/k/K-225-match-word-picture.js`, `types/k/K-235-category-sort.js`, `lib/b2-common.js` (`B2_EXCLUDE:35`), `image-cache/resolve.js`, `cache/manifest.json`, `emit/manifest.js`, `enumerate.js`, `types/_shared/fixed-theme.js`, `qa/lints.js`, `scripts/seo-landing/gen-b2var-landings.js LEVEL_KEYS`, `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `waves/wave-b2-en.json`, `tools/gen-b2var-specs.js`. Scratch: `k319-critic-measure.js` (a copy of the designer's `k319-measure.js` with 17 / 18 px added). No em-dashes.

## 1 Contradictions and resolutions

| # | pedagogy | design | ruling + why |
|---|---|---|---|
| 1 | F3 `perBin:4` (8 faces, 9-face bank) | `perBin:3` on a "72 px face rule" | **perBin 3, design wins, but on a different reason.** No "72 rule" exists in the brief (K floor is 56, `_tokens.js:68`); 8 faces at 69 px would be legal on density. The real reason is the factory's own CSS (m): box = itemPx + 2·round(0.12·itemPx) + 4; 8 items -> 8x89 + 7x12 = 796 > 675 -> the flex-wrap strip breaks 6 + 2; 6 items -> 648 <= 675, one row. The 72 px figure is kept only as this TYPE's d2 legibility floor (the mono sheet proves it), never as a token. |
| 2 | 9-face F3 bank with refused word-faces | same bank, no face-by-face check | **Bank confirmed by opening all 15.** good = happy merry content excited; bad = sad angry scared capricious disgusted. bored (worried, eyes up), confused (printed "?"), shy (small smile, sideways glance) are NOT unmistakable in valence: excluded. tired / surprised neutral: excluded. |
| 3 | `faceChoiceRow` on round `.ws-achip` tiles | square white `faceTile`, border 2 creamDeep | **Design wins.** `.ws-achip` is white with a 2.5 px TEAL border and r 24 (`page.css:406-410`): a printed frame pre-empts the child's pencil ring and its Baloo font-family is dead weight on an image tile. The G1-308 strip tile (white, r 10, creamDeep) is the house idiom. |
| 4 | syringe veto -> "d2 drops to 5 cards" (per locale) | 5-card `sceneGrid` (odd-count component) | **Both, with one correction: the veto is GLOBAL.** The brief's locale-neutral seed means the same pictures in all 11; the pedagogy's own data comment says apply- propagates a veto to all 11. So one veto = 5 cards everywhere via `sceneGrid` (a 2x3 `cardGrid` leaves a hole). 5 >= K floor 4. No third honest scared cue exists (ghost / spider smile; `stormy` is a second thunderstorm). |
| 5 | fi word width "170 *est.*" | es `sorprendido` 145.8 (m) | **Measured wins** (re-run today, identical: 145.8 at 28; fi `surullinen` 121.4). The 260 column holds the widest by 82 px. |
| 6 | F5 lane "600 + 40 <= 643" | (design's own number) | **Wrong inner width.** `.ws-lane` padding 12 16 + border 2 -> 639, not 643; six 100-px tiles at gap 8 = 640 overflow by 1 px. Ruled gap 6 (630). |
| 7 | subject `letters`, `sel` open | (silent) | **`letters`** for the hub disc: taxonomy allows 4 subjects, every verifiable face prints or elicits a feeling word (L.K.5), a 5th subject is a §16.4 doctrine review. K-323 alignment OPEN. |
| 8 | scene `bed` with no theme | `bed` with no theme | **Pinned `furniture/bed`.** `bed` exists in `around the house`, `furniture` AND `hospital` (m); the hospital one is a wheeled hospital bed (opened) = sick, not tired. Validator asserts the literal. |
| 9 | `alsoPlausible` only on present / balloon / syringe | same | **Extended** after opening: teddy_bear [tired] (a bedtime cuddle), medal [surprised], thunderstorm [surprised], both moon scenes [scared] (afraid of the dark). Each removes a decoy that could be a second honest answer; >= 4 decoy candidates remain per scene. |
| 10 | slugs sv `kanslokort`, da `foelelser` | not adjudicated | **sv `mina-kanslor`, da `mine-foelelser`** [NSR]. `kanslokort` is literally what a K-324 picture-word-card deck on the emotions theme is called (K-324 is theme-fanned); `foelelser` is the oe-fold twin of the theme slug `folelser`. Grep against every axis slug x11: 0 collisions for all 11 final slugs (m). |
| 11 | F1 d3 "4 choices" | 4 tiles at 68 = 296 > 294 "engineer trims" | **d3 = 3 tiles, choice pool + `sad` decoy.** No geometry change; d3 is unpublished anyway. |
| 12 | F2 / F5 "OPEN" | "no verify" | Confirmed and stated in the file: no `verify()`, layout lints only; `data-lcs-blankface` / `data-lcs-checkin` stamps are for the key note and the content lint. |

Face set confirmed as six genuine, distinct moves at resolved d2 config: base `{layout:undefined, pairs:6}` (match) · F1 `{layout:'scene', cards:6, choices:3}` (infer from a situation) · F2 `{layout:'draw', cards:4}` (produce, open) · F3 factory `{perBin:3}` on a different spec (valence) · F4 `{layout:'choice', rows:6, choices:3}` (receptive, no elimination) · F5 `{layout:'checkin', faces:6}` (self-report, open).

## 2 Claims removed or corrected as unverified

- "80 >= 72 (brief)": the brief has no 72; corrected to the K token floor 56 + a type floor 72.
- "`matchColumns` (m in G1-307)": it is DEFINED by G1-307 in a file that does not exist yet (`components-b3.js` absent, m); stated as such.
- The pedagogy's `apps.*` age: none given; set `default_age_range:'5-7'` (K, `AGE_BY_ID_PREFIX`, `emit/manifest.js:24`).
- "The wave may already emit K-284 on emotions": checked `waves/wave-b2-*.json`: themes are `animals vehicles toys fruits` + 4 BW; no emotions tracing deck exists. Rejected-move note corrected.
- `expandHubRows` "in `worksheets-catalog.ts`" (README): it lives in `frontend/lib/worksheets-sheets.ts` (m); `applyLandingFilters` + `buildLandingFacets` are in `worksheets-catalog.ts:98/125`. §7 names both.
- Pedagogy §E line span "125 px": kept (dot centre sits 20 px outside the tile: `right:-26px` on a 12 px dot).
- Strand names: the pedagogy cited "(CASEL)" for en; dropped the brand, kept the phrase.

## 3 Pictures opened (`cache/themes-512/<theme>/<noun>@3x.webp`) and what they show

| picture | what I saw | verdict |
|---|---|---|
| emotions/happy | yellow ball, open toothed grin, raised brows, blush | ACCEPT word |
| emotions/sad | deep frown, brows raised inward, large dark eyes, blush | ACCEPT word |
| emotions/angry | thick V brows, gritted teeth, darker orange ball | ACCEPT word |
| emotions/scared | wide ringed eyes with small pupils, worried brows, gaping mouth with teeth + tongue | ACCEPT word (near pair: surprised) |
| emotions/surprised | raised brows, small round O mouth, lashes | ACCEPT word |
| emotions/tired | closed lids, drooping brows, small yawn | ACCEPT word; F3 excluded (neutral) |
| emotions/disgusted | eyes squeezed shut in `><`, red marks radiating, open wailing mouth | reads pain / yuck / cry-out: F3 BAD, no word |
| emotions/bored | drawn brows, eyes glancing up-right, slight frown | reads unsure / worried: NOT unmistakable, excluded |
| emotions/confused | worried face, sprout of hair, a printed orange "?" | the glyph carries the meaning: excluded |
| emotions/capricious | eyes shut, brows raised, wailing mouth with teeth | reads crying: F3 BAD, no word |
| emotions/merry | eyes shut in smiles, laughing mouth | F3 GOOD, no word (two right answers vs happy) |
| emotions/content | calm closed smile, oval eyes | F3 GOOD, no word |
| emotions/excited | wide eyes with lashes, big open grin | = happy with lashes: F3 GOOD, no word |
| emotions/shy | small smile, sideways glance, lashes, blush | ambiguous valence: excluded everywhere |
| christmas/present | red box, green ribbon, red bow | happy cue |
| toys/balloon | one green balloon on a string | happy cue (weak but honest) |
| accessories/medal | gold rosette medal, red ribbon | happy cue (+ surprised plausible) |
| toys/teddy_bear | smiling brown teddy, `vocabKey:null` | happy cue (+ tired plausible); the toy's own smile primes the answer, accepted |
| weather/thunderstorm | dark cloud, red-yellow lightning bolt | scared cue |
| hospital/syringe | syringe with RED liquid and a needle | scared cue; the strongest picture on the type, first veto candidate |
| furniture/bed | blue single bed with pillow and blanket | tired cue |
| hospital/bed | wheeled hospital bed, red stripes | REFUSED (sick, not tired); validator pins `furniture` |
| around the house/pillow | red-and-white pillow | tired cue with moon |
| clothing/pajamas | red patterned pajamas | tired cue with moon |
| space/moon | full moon, grey-blue | night cue |
| desserts and sweets/cake | one slice with a strawberry, no candles | weak happy alternate only |
| miscellaneous/ghost | cute SMILING ghost, blush | not a scared cue (poison P2 stands) |
| insects and bugs/spider | cartoon spider with a SMILE | not a scared cue |
| weather/stormy | red cloud, rain, a bolt | a second thunderstorm, red reads angry: refused |
| `k319-mono-72.png` (scratch) | the six accepted faces at 72 px, grey row over colour row | all six distinct in mono; scared / surprised the only near pair, same as colour |

## 4 Numbers re-measured (puppeteer, Baloo 2 700, the shell's woff2)

- Widest word per size: `sorprendido` 88.5 @17 · 93.7 @18 · 135.3 @26 · **145.8 @28** · 156.2 @30. Base column 228 usable; F4 word column 220; F5 tile 100 (18 px label 93.7 <= 94).
- fi `surullinen` 121.4 @28, `yllättynyt` 115.1; de `überrascht` 130.7; it `arrabbiato` / `spaventato` 129.1; da `ked af det` 118.2 (one line); no `lei seg` 72.3.
- F3 bin labels @17: `desagradable` 96.3, `unangenehm` 93.5, `désagréable` 85.9, `ubehagelig` 78.4, `spiacevole` 73.7, `Feels good` 76.0, `niet fijn` 57.1; + 32 padding <= 210 bin, all.
- F3 strip arithmetic from `science-category-sort.js:82` + its SCOPED_CSS: n=6 -> itemPx 78, pad 9, box 98, strip 648; n=8 -> itemPx 69, pad 8, box 89, strip 796 (> 675, wraps).
- Geometry: `.ws-match` inner 615x710 at 722 (6x108 + 5x12 = 708); card w 330.5, stage inner 294 (F1 stage h 191 at row 231; F2 314 at row 354); `.ws-lane` inner width 639; F4 6 x minmax(112) + 5 x 10 = 722; F5 180 + 14 + 292 + 14 + 178 = 678.
- Taxonomy: `apps.emotions` and `axes['exercise-type'].emotions` absent; 94 apps / 95 exercise-type keys today; theme slugs x11 as listed in §1; 0 collisions for the 11 final type slugs.
- Manifest: `theme = themeAxisKey(cacheTheme)` -> null for a themeless instance (`emit/manifest.js:79`), so the decks do NOT enter the emotions theme hub (OPEN 5).

## 5 OPEN items

1. **`syringe` ruling.** de / fr keep it (Kita / GS canon), sv / fi likely veto; a veto is global and makes F1 a 5-card page in all 11 (`sceneGrid`). Ask every panel in the EN-audit round; default if ANY panel vetoes = global veto.
2. **`default_subject` `letters` vs a new `sel` subject** (§16.4 doctrine review): decide together with K-323 all-about-me; K-323 must not add an "I feel" item (F5 owns the check-in).
3. **sv / da slugs** `mina-kanslor` / `mine-foelelser` are editor rulings pending the native panels; K-324's emotions instance must avoid "känslokort" as a landing slug if the sv panel prefers it here.
4. **F3 d3 `labelHtml` knob** on the shared `_shared/science-category-sort.js` factory (additive; `labelFor` is text-only): else d3 = d2.
5. **Theme-hub join.** `themeAxis:{applicable:false}` yields manifest `theme:null` and `coordinate.theme:''`, so `/topic/<loc>/emotions` (theme axis) never lists these decks. A `fixedTheme` pass-through (`withFixedTheme` sets it, `enumerate.js` ignores it) would be an additive change shared with the K-070 shapes types; also check the §15.16 `MISSING_THEME` class on a themeless deck whose images are all `emotions/*` (`--themeless-ok` in `publish-wave`).
6. **`tools/gate-variation-distinct.js`** reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS`; a b3 wave file / ROWS list must exist before it sees these five faces.
7. **`teddy_bear` `vocabKey:null`**: F1 never prints a word for it, but the deck's alt-text retrofit (`rewrite-deck-html-alt-text.js`) may emit an empty alt for that picture; the scene's `alt.<loc>` literal is the intended source. Engineer confirms the retrofit reads it or leaves alt empty.
8. **`matchColumns`, `components-b3.js`, `validate-b3-draft.js`, `apply-b3-locale.js`, `verify-hub-type-rows.js`** are all absent; owned by the batch's first design, this file only consumes them.

## 6 Quality verdict (a critical kindergarten teacher)

The base and F4 are exactly the two feelings pages I already print, with better faces than most and no numerals or clutter; F1 is the one page here that teaches something (why do you feel that), and its scene list is honest rather than long.
F3 is useful for circle time but the labels "feels good / feels bad" need my voice beside them for five-year-olds, and I would want the syringe question settled before this reaches a Swedish or Finnish class.
The check-in and draw pages are the ones children actually finish; both are open-ended and are correctly not graded.
