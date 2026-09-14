# K-322 `seasons`: editor-critic record (2026-09-14)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `README.md` (cross-type rulings, body 722, `science` subject, `coordinate.mode`, font trap), `_PANEL-FINDINGS.md` §18, `K-319-emotions.md`, `K-321-days-and-months.md`, `_work/K-322-pedagogy.md`, `_work/K-322-design.md`. Repo reads: `templates/components-b2.js` (`colorLegend`, `codeList`, `SWATCH`), `templates/components.js`, `templates/layouts/card-grid.js`, `page/page.css` (`.ws-page .ws-bin .ws-bin-label .ws-lane .ws-blankbox .ws-card*`), `primitives/_tokens.js`, `primitives/_svg.js`, `primitives/trace-path.js` (`writingRow`), `types/_shared/science-category-sort.js`, `types/_shared/odd-one-out.js`, `data/science/summer-vs-winter-clothes.json`, `data/color-words.js`, `data/b2/calendar.js`, `image-cache/resolve.js`, `cache/manifest.json`, `lib/b2-common.js` (`B2_EXCLUDE`), `qa/lints.js`, `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `scripts/seo-landing/gen-b2var-landings.js` (`LEVEL_KEYS`), the 11 `frontend/content/seo-landing/<loc>.json`. Scratch (type-scoped): `k322-vocab.js` (pool x vocab x 11), `k322-critic-sheet.js` (24-picture contact sheet), `k322-critic-measure.js` (puppeteer, shell woff2 from `file://`, control `Wednesday` Baloo 2 700 26 = 135.1 vs 127.2 system fallback, 2 fonts loaded). No em-dashes.

## 1 Contradictions and resolutions

| # | pedagogy said | design said | ruling + why |
|---|---|---|---|
| 1 | base = strip of 8 tiles above four `seasonBin`s 150 x 190 with a dashed open top, name pill 18 px | the SANDWICH: 4 tiles above, 4 signs 150 x 160 solid teal, 4 tiles below, name 22 nowrap, `maxAlignedPerRow:1` | **design.** Verified: 112 + 160 + 112 = 384 fits 722 with 169 px line zones; a dashed open top would take the lower row's lines at its base; the pedagogy's own d3 third row would sit in the lower row's line path. K floors: bin name 22 >= `density.K.fontLabel` 18 (`_tokens.js:68`); `fontChoice` 30 is the ANSWER-NUMERAL floor and there is no numeral on the page, so it does not apply to a printed label. Icons 88 >= 56. |
| 2 | picture icons `winter/snowflake` `spring/flower` `weather/sun` `thanksgivinng/autumn`, reserved from pools | token SVG `seasonIcon` glyphs, 64-unit geometry; pictures as a data knob (Alt C) | **design.** The leak becomes structurally impossible (no icon noun exists), palette-lint clean, and `k322-mono.png` (read) shows the picture snowflake and sun as pale radial blurs at 88 px. Alt C is honest (a 40 px `.ws-icon` swap + validator reservation), kept as `SEASONS[loc].icons`. The glyphs' OWN mono legibility is UNKNOWN until rendered (recorded in §2 of the design file). |
| 3 | F2 = draw a line from 3 loose tiles to 3 empty slots on a 4-point ring | F2 = copy the sign glyph into each empty slot in cycle order; the line act is geometrically impossible | **design; argument re-derived and it holds.** Wheel 440, ring r 160, slots r 55 at N E S W, bank tile centres x 96 / 220 / 344 at y 512. Left tile -> E slot: perpendicular distance from the S slot centre = 3.1 px (through the slot). Right tile -> W: mirror. Middle tile -> E: 63.4 px from S, i.e. 8 px clear of its rim. Only the reversed order W S E is crossing-free, and a reversed bank is banned. Copy-the-glyph keeps verify unique (fixed direction + one anchor => one key per slot). |
| 4 | base d3 = 3 rows of 4 (top, bottom, second bottom) | d3 = 6 + 6 at 84 px tiles | **design** (line-path collision). |
| 5 | F1 markers 78 in a `markerRow` gap 24 (282); choice tiles 68 | markers 88, gap 14 (292) | **design, corrected to gap 12** (3 x 88 + 24 = 288 <= 294: 292 left a 2 px margin). |
| 6 | F3 rows `minmax(112,1fr)`, icons 78 in 98 tiles | rows `minmax(140,1fr)`, icons 96 in 116 tiles | **design** (590 <= 722; 574 <= lane inner 639 with the badge; larger icons at K). |
| 7 | F2 wheel d 420 | d 440 + 96 bank = 560 | **design.** |
| 8 | F4 month tile 200 x 88, name 22, circle 36; "widest month `marraskuu` 105" | same | **both corrected.** Measured at Baloo 2 700 22: es `septiembre` **113.5** is the widest (marraskuu 106.8); 113.5 + 36 + 48 = 197.5 fits 200 by 2.5 px, and 36 is under the G1 `minElement` 44. Final: tile **210 x 88**, circle **44**, gap 22 (3 x 210 + 44 = 674 <= 675). |
| 9 | pedagogy: vocab cross-check for names against keys `winter / spring / summer / autumn` | design: literals, no check | **neither as written.** The vocab has ONLY `autumn` (m). Final: `autumn` vs vocab; `winter` / `summer` vs the K-207 bank's bin labels (all 11, Capitalised, case-insensitive); `spring` panel-only. |
| 10 | pedagogy: K-207 disjointness by `(theme, noun)` | design: same | **tightened to NOUN.** `winter/coat` and `clothing/coat` are different pictures (opened: a pink puffer jacket vs a red button coat) of the same noun; K-207 uses `clothing/coat`. A `(theme, noun)` rule would let `winter/coat` into a neutral pool. The pt override reuses the coat / sweater / boots / scarf NOUNS with a `reason` (P2 poison both ways). |
| 11 | pt spring override lists bud tulip nest chick duckling + butterfly bee (lamb missing) | not addressed | **the 6 neutral + butterfly + bee = 8**; the lamb omission read as accidental. |
| 12 | winter pool 8, all d2-eligible | `winter/ice` "weakest, d3 only" | **both `ice` and `icicle` `weak:true`** (mono sheet: both pale on white). Winter d2 pool = 6. |
| 13 | `coordinate.mode` | pedagogy `'base'` on the base | **kept** (README ruling; K-319's `mode:null` was the error). |
| 14 | de "Jahreszeiten" landings | pedagogy flagged | **OPEN 2** (§21.5a). |

## 2 Claims removed or corrected as unverified

- Pedagogy: "Every picture named below was OPENED": accepted for the 28 on `k322-sheet.png`; the pedagogy's pt-override pictures (`winter/coat sweater boots fireplace`, `clothing/scarf beanie`, `fruits/persimmon`, `spring/butterfly bee`) were NOT on that sheet; I opened them (`k322-critic-sheet.png`, §3).
- Pedagogy: "30 of 32 accepted nouns have an entry in all 11": measured **32 of 33 pooled refs** (`ice_cream` was never pooled; only `tree/maple` lacks a vocabKey).
- Pedagogy: "fr 130 / fi 86 titles carry a season word": my regexes gave fr 171 / fi 132 (`été` and `kesä` over-match inside other words); en 125 / de 98 reproduce exactly. Reported as "~100 per locale".
- Pedagogy: `Primavera` / `Printemps` "~78 px est. at 18": measured 82.9 / 83.7 at 18, 101.4 / 102.3 at 22 (all fit the 128 inner).
- Design: "`Årstiderna` ... heading form": measured 105.4 at 22, but it is never a pill; dropped from the width list.
- Design: "F4 legend wraps to 2 lines x11, ~80 tall": kept as *est.* (the legend widths depend on the panel's names; the four colour words are measured: widest `arancione` 78.1, `keltainen` 74.5 at Nunito 800 17).
- Both: "lines cross lines, never a picture or a sign" on the base: holds by construction for the two-row sandwich (every line runs from a tile edge into the middle band); not measured on a render (the engineer's HB print check).
- Pedagogy: `tree/maple` "alt literal from the panel": kept, but the picture is a whole red-orange TREE, not a leaf; `alt` must say so.
- Design §6 "da `forår` INDEFINITE on pills": kept; note the theme axis folds da `forår` -> `forar` while the type slug uses `aarstider` (K-321 precedent); both are collision-free (m), the inconsistency is the repo's, recorded.
- `science-sort` "0 landings in all 11 corpora": **verified** (m), and therefore whether the K-207 DECK is live cannot be read from the corpora; DB count needed (OPEN 3).

## 3 Pictures and sheets opened, what they show

`k322-sheet.png` (28 at 184 px, read): snowflake (blue six-arm flake) · flower (red daisy, orange centre) · sun (smiling yellow face with rays) · autumn (red-orange maple LEAF) · snowman (top hat, red scarf, mittens) · sled (wooden sledge) · icicle (pale blue spike) · skating (girl in red on ice skates) · ice (blue pond with slabs) · sledding (child on a sledge) · tulip · chick · bud (red bud on a stem) · **nest: two birds with red combs sitting in a nest (hen-like; a K child may read "chickens in a nest"; kept as a nesting marker, flagged for the panel)** · lamb · duckling · sandcastle · sunglasses (a K-207 item; on the sheet, NOT in a pool) · popsicle · watermelon · beach (umbrella, two chairs, palm) · flip-flops · pumpkin · acorn · maple (a whole red-orange autumn TREE) · harvest (wheat sheaf) · scarecrow · hedgehog.

`k322-mono.png` (same 28 at 88 px greyscale, read): the sun is a pale face with faint rays, the snowflake a pale grey star: the design's "both blur into pale radial marks" is right; the daisy and the maple leaf keep mid-grey mass. Markers: all 24 keep identity; `ice` and `icicle` are the palest (both `weak:true`); sunglasses, popsicle, watermelon, flip-flops, pumpkin, acorn, scarecrow, hedgehog are strong; the beach and sandcastle read as scenes but stay distinct.

`k322-critic-sheet.png` (24 at 184 px, built + read): **robin** = a European robin (orange breast): EXCLUDED, the winter bird in de/UK and the spring bird in the US · **kite** = a red / yellow diamond kite with a tail: EXCLUDED (spring / autumn / winter by locale) · **haystack** = a round hay pile: EXCLUDED (June) · **`summer/swimsuit`** = a purple two-piece bikini on no body; **`clothing/swimsuit`** = a navy / red one-piece: both adult garments, both out (K-207 owns swimsuit) · **`winter/coat`** = a pink hooded puffer jacket; **`clothing/coat`** = a red button coat: different pictures, ONE noun (ruling 10) · **persimmon** = an orange fruit with a leafy calyx that reads as a tomato / orange at 88 px: pt autumn, `weak`, panel confirms (OPEN 8) · fireplace = a brick hearth with fire (pt winter, fine) · butterfly, bee (pt spring, fine) · skiing, snowboarding (child on skis / a board) · swimming (girl in water) · pool (an empty rectangular pool) · seashell (scallop) · surfboard · tent (blue) · mushroom (fly agaric, THE de/nl/Nordic Herbst icon) · birdhouse (red-roofed; weak) · beanie (blue knit) · sweater (Nordic pattern) · boots (purple snow boots) · apple (a basket of red apples).

## 4 Numbers re-measured (shell fonts, `file://`)

| what | pedagogy | design | measured | won |
|---|---|---|---|---|
| widest season pill at Baloo 2 700 22 | (18 px pill, ~78 est.) | `Printemps` 95 + 6 % = 101 | fr `printemps` **102.3**, es/pt/it `primavera` 101.4, fr `automne` 88.6, de `Frühling` 82.4 | measured; all <= 128 |
| widest at 18 | ~78 | : | 83.7 | : |
| widest month at 22 | `marraskuu` 105 | same | es `septiembre` **113.5** (`septembre` 107.4, `september` 109.1 / 107.7, `marraskuu` 106.8) | measured -> tile 210 |
| colour words Nunito 800 17 | : | : | `arancione` 78.1, `keltainen` 74.5, `amarillo` 66.9, `blu` 26.1 | measured |
| F1 marker row | 3 x 78 + 48 = 282 | 3 x 88 + 28 = 292 | 3 x 88 + 24 = **288** <= 294 | editor |
| F4 tile / circle | 200 / 36 | 200 / 36 | **210 / 44** (G1 floor 44) | editor |
| base stack at 722 | 112 + 190 + 112 = 414, gaps 154 | 112 + 160 + 112 = 384, zones 169 | design's | design |
| F2 stack | 420 + 20 + 100 = 540 | 440 + 24 + 96 = 560 | 560 <= 722 | design |
| F3 floor | 4 x 112 + 30 = 478 | 4 x 140 + 30 = 590 | 590 <= 722; lane row 574 <= 639 | design |
| vocab coverage | 30 / 32 | : | 32 / 33 pooled (`tree/maple` null) | measured |
| slug collisions x11 | 0 | : | 0 (all four axes, all 11) | confirmed |
| `science-sort` landings | 0 | : | 0 in all 11 | confirmed |
| de landings with the head | 2 | : | 2 (`find-objects`, `matching`) | confirmed |

Geometry check for ruling 3 (F2): distance from the S slot centre (220, 380) to the line from the left bank tile (96, 512) to the E slot (380, 220) = |124 x (-292) - (-132) x 284| / 407.3 = 3.1 px; from the middle tile (220, 512): 21120 / 333 = 63.4 px (rim at 55).

## 5 OPEN items (numbered)

1. **en Fall vs Autumn.** The vocab prints "Autumn" on the `autumn` key; US K charts print "Fall". The en panel picks; the validator accepts the declared `alt`.
2. **The two de landings that already claim "Jahreszeiten"** (`objekte-finden-anders-finden-winter-78c2`, `zuordnung-buchstaben-fruhling-b9c0`): re-title the OLD ones to their own genre if `gate.js` reads > 0.65 against the base. This is a §21.5a mass-rewrite-freeze call (two titles, additive-repair territory): surface to the operator in the build session, never re-title the new landing.
3. **Is the K-207 deck live at all?** `science-sort` has 0 landings; a DB count on Hetzner decides whether the landing boundary sentence names a live sibling.
4. **`tree/maple` has no vocabKey**: the panels author `alt` x11 (a whole autumn tree); if the operator prefers vocab-only pools, autumn drops to 7 neutral and pt-BR autumn to 3.
5. **`strand-names.ts` has no science row**: raw `l.strand` is the readiness path; an additive `Science` row would take the 11 literals (decide with G2-318, the other science type).
6. **b3 ROWS list + `verify-hub-type-rows.js`**: `gate-variation-distinct.js` reads `gen-b2var-specs.js ROWS`; the hub gate is absent. Both are batch-level prerequisites (README open item 2).
7. **pt-BR F5**: re-target to `figure:'frame'` ("Desenhe o tempo em cada estação") vs refusal; the pt panel decides; hub expectation 66 or 65.
8. **`fruits/persimmon`** reads as a tomato / orange at 88 px; the pt panel keeps it (`weak`) or drops it (pt autumn 4 -> 3, still >= 3).
9. **`spring/nest`** shows two red-combed hen-like birds; the panels confirm it reads "nesting" to a 5-year-old or drop it (spring 6 -> 5 at d2).
10. **Glyph mono legibility** at 40 / 56 px is unrendered: the engineer renders the four `seasonIcon`s greyscale before the first wave; if a pair blurs, Alt C (picture icons) is the fallback, at the cost of the validator reservation.
11. **`cycleStart` per locale** (winter-first vs de spring-first) is a panel call recorded in data; F2 anchors on it.
12. **da slug fold**: the type uses `aarstider` (K-321 precedent) while the theme axis already folded da `forår` -> `forar`; the repo folds inconsistently. 0 collisions either way; a single fold rule is a batch-level tidy-up, not this type's.
13. **pt-BR winter sign**: a snowflake glyph over a no-snow winter; the pt panel confirms or swaps the four icons via `SEASONS.pt.icons`.

## 6 Quality verdict (a critical kindergarten teacher)

The base page is the classroom chart my children already know: four signs across the middle, real objects to sort, one pencil line each, nothing to read but four words. Which-season, odd-one-out and the wheel are the three things I actually do with that chart, and the wheel finally asks them to DRAW the season sign instead of matching it, which is the right hand for five-year-olds.
I would still open every picture with my class first: a hen in a nest, a persimmon that looks like a tomato, and a robin that is a winter bird here and a spring bird in Boston are exactly the pictures that start an argument at the sorting table; the design already knows this and vetoes by locale, but the pt-BR pages are the ones I would want a Brazilian teacher to see before printing.
The colour-the-month page is honest grade-1 work (twelve names to read, one legend) and it is the only face where colour means anything, with the word beside every swatch for the black-and-white copier; if the tree page stays open-ended and the sign glyphs survive a greyscale print, this set ships.
