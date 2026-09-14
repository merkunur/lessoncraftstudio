# K-323 `all-about-me` : editor-critic record (2026-09-14)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README (cross-type rulings, body 722, `coordinate.mode`, the font trap), `_PANEL-FINDINGS.md` §17, K-319 + G2-318 FINALs, `_work/K-323-pedagogy.md`, `_work/K-323-design.md`. Verified in the repo: `templates/components-b2.js` (`SWATCH:20 rulingBlock:58 wordBank:210 copyArrow:219 pillChoice:226 letterBoxes:273`), `templates/components.js answerBox:105`, `page/page.css` (`* box-sizing:border-box :8`, `.ws-page:16`, `.ws-card:126`, `.ws-answerbox:220`, `.ws-scene-banner:274`, `.ws-lane:401`, `.ws-bank:416`, `.ws-pill:422`, `.ws-blankbox:445`), `primitives/ten-frame.js:13`, `primitives/trace-path.js writingRow:681`, `primitives/_tokens.js density:68`, `image-cache/resolve.js`, `lib/b2-common.js`, `data/color-words.js`, `cache/manifest.json`, the vocab via `loadVocab`, `frontend/config/topics-taxonomy.json`, 11 `frontend/content/seo-landing/<loc>.json`, `scripts/seo-landing/gen-b2var-landings.js LEVEL_KEYS:112-124`. Scratch (type-scoped): `k323-critic-verify.js` (node), `k323-critic-measure.js` + `k323-critic-pools.js` (puppeteer, shell woff2 + real `page.css` from a `file://` origin; 4 faces loaded). No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy | design | ruling | why |
|---|---|---|---|---|
| 1 | F1 lane 226 | 232 with inline padding 8 16 | **232** | `.ws-lane` padding 12 16 + border 2 (m): inner 212 + 16 + 4 = 232; 3 x 232 + 24 = 720 <= 722. At the default padding 3 lanes = 744, over. |
| 2 | F2 ten-frame cell 40, cards 330x150, draw box 300 | cell 56, cards 238, draw box 220 | **design** | `density.K.minElement 56` (`_tokens.js:68`, m); cell 40 -> 206x86 breaks it; cell 56 -> 286x118 (m) needs a 210 inner. |
| 3 | `favStarter` (heading + copy starter) | dropped; heading only + `copyArrow` | **design** | Closes pedagogy OPEN 3 by construction: the heading is a whole per-category literal whose agreement is fixed by the category noun; the lane never agrees with the chosen picture. |
| 4 | "fi colour pool 7" (per-locale drop) | same | **GLOBAL pool 7** | The seed is locale-neutral (same six pictures x11), so a per-locale drop breaks the seed. Rule: an option enters only if its label passes 96 px in ALL 11. `pink` fails (fi 128.4) -> 7 colours everywhere. |
| 5 | letterBoxes 616 wide | 618 | **616** | `W = n*box + (n-1)*gap + 2` (`components-b2.js:274`); rendered 616x58 (m). |
| 6 | lane inner 643 (both files) | 643 | **639** | `page.css:8` border-box; 675 - 32 - 4. Consequences: F1 tiles gap 8 -> **7** (640 -> 635); copy writingRow 595 -> **591**; age lane inner 328 -> 324 (still holds 249). |
| 7 | F3 bank 50 | 54 | **59 + margin-bottom 10** | `wordBank` measured 59 in the real CSS; `.ws-scene-banner` carries `margin-bottom:10px` (`page.css:280`). F3 stack 698 -> **713**. |
| 8 | F4 lane 100, cards 140 (714) | same | **lane 116, cards `minmax(136px,1fr)` (714)** | Lane measured: 18 px line 24 + ruling 64 + inline-SVG baseline gap 6 (`rulingBlock` wrapper renders 70 for a 64 row, m) + 20 = 116; 602 + 12 + 116 = 730 > 722. |
| 9 | F5 compare lane 60 / 90 | 90 | **100** | `pillChoice` pills are **48** high at 20 px (m) + label 24 + gap 8 + 20 = 100. F5 stack 640 -> **650**. |
| 10 | `answerBox` for the age / count / letters boxes | same | **NEW `blankNumeralBox`** | `answerBox({w,h})` without an answer stamps `data-lcs-answer="undefined"` (m); an open page must carry no answer attribute. Its `.ws-answerbox` dashes are `grid` (`page.css:224`), not the brief's coral; `.ws-blankbox` is coral. |
| 11 | nameBanner reused as-is | +3 additive options | **+4** (`icon:null`) | G2-318's banner prints a coral paw; not on a child's page. |
| 12 | F3 `orecchio` "≈192 handwritten at 24 px/letter" | same | **UNKNOWN** | A child's handwriting is not a font measure. Bank print width 67 (m). The lane is ungraded and continues. |
| 13 | tick box 44, icon 88, text 150 (F4) | tick 56, icon 80, text 146 | **design** | 56 = K floor for an element the child marks; 56 + 10 + 80 + 10 + 146 = 302 = card inner (m). |
| 14 | F1 heading "24" | same | 18 px with `line-height:24px` | A free 18 px Nunito line is ~25 (m); the explicit line-height makes the 212 arithmetic true. |

Everything both files agreed on and the repo confirmed stands: faces (base · favourites · family · face · I can · name), the K band x6, `letters`, theme OFF, `coordinate.mode` per face (base `'base'`), the 11 heads / slugs / level keys, the label forms and agreement rules, the hand-outline refusal (3.78 px/mm, ~470 px), family = words + drawing, no "I feel", no birthday month, no name tracing.

## 2 Claims removed as unverified or wrong

- "F3 anchors are estimates from the 512 render" (pedagogy): replaced by the design's sharp centroids, which the editor cross-read against the picture (§3).
- "fi colour pool 7" as a per-locale fact: replaced by the global-pool rule (§1 #4).
- `Schmetterling` 107 as an F1 casualty (design): butterfly is not in the `animals` theme (m); the real all-11 casualties are `bat hippopotamus orangutan woodpecker` (animals) and `can cart cereal potato toothbrush` (supermarket).
- "F3 stack 694 / 698", "F4 714 with lane 100", "F5 622 / 640", "letterBoxes 618", "lane inner 643", "bank 50 / 54": re-measured (§4).
- The pedagogy's note that a "name tracing, EN A-tier" claim exists: grep of `_PANEL-FINDINGS.md` = 0 (m); recorded as not in the committed findings; out of scope either way.
- `drawBox({w,h,label})`: G1-308 FINAL defines `drawBox({w=300,h=140})` with NO `label`; the label is G2-318's additive claim. Recorded as such (whichever type builds first adds it).

## 3 Pictures opened (`cache/themes-512/<theme>/<noun>@3x.webp`) and what they show

| picture | shows | verdict |
|---|---|---|
| `body parts/face` | frontal child's face, black side-swept hair to y ~0.50, neutral closed smile, red cheeks, red nose tip, ears at both edges | the ONE F3 picture. **Anchor check (fractions of the 512 box):** hair {0.50, 0.20} sits inside the hair mass top-centre; nose {0.50, 0.68} on the red nose; eye {0.655, 0.59} on the right pupil; ear {0.86, 0.64} on the right ear at the edge; mouth {0.50, 0.84} on the lip line; eyebrow {0.32, 0.47} on the left brow; chin {0.50, 0.93} at the jaw. All plausible; side assignment (hair + nose L, eye + ear + mouth R) keeps each line off the other features. |
| `activities/running` | a girl mid-stride, ponytail, red shirt | child cue: keep |
| `activities/biking` | a boy riding a red bicycle | child cue: keep |
| `activities/jumping` | a girl skipping with a rope | child cue: keep |
| `activities/reading` | a child cross-legged reading a green book | child cue: keep |
| `activities/swimming` | swimming goggles only | object cue: keep (no swimmer art) |
| `activities/painting` | a palette with a brush | object cue: keep |
| `activities/puzzle` | four interlocking jigsaw pieces | object cue: keep |
| `activities/soccer` | a football | object cue: keep |
| `activities/dancing` | an adult ballerina in a tutu | REJECTED (the pedagogy's call confirmed) |

Not opened (design's claims carried): `writing`, `gymnastics` (both rejected as adult), `classroom/pencil`, `clothing/shoe`, `At the Supermarket/toothbrush` (resolve via `fileUri`, m). The family question needed no picture: the manifest's 59 themes carry no family art (only `toys/baby`, `toys/baby_girl`, `toys/girl`, all dolls).

## 4 Numbers re-measured (shell fonts + real `page.css`, `file://` origin; 4 faces loaded)

| item | draft(s) | measured | used |
|---|---|---|---|
| `.ws-lane` inner width, any inline vertical padding | 643 | **639** | 639 |
| F1 tile row 6 x 100, gap 8 / gap 7 | 640 fits | 640 > 639 / **635** | gap 7 |
| `wordBank` 5 words at 17 px (en, it) | 50 / 54 | **59** high, +10 margin-bottom | 59 + 10 |
| `wordBank` 7 words (pt d3) | one row | **108** (2 rows) | d3 re-budgets |
| `pillChoice` at 20 px | 44-ish | pill **48** high; `meine Freundin` 191.7 wide | 48 |
| `letterBoxes 10x56 gap 6` | 616 / 618 | **616x58** | 616 |
| `tenFrame cell 56` / `cell 40` | 286x118 / 206x86 | **286x118** / 206x86 | 56 |
| `writingRow 591x64 glyphH 40` | 595 | **591x64** | 591 |
| `rulingBlock rows 1 h 64` wrapper | 64 | **70** (inline-SVG gap 6) | F4 lane 116 |
| `Minun nimeni on` 20 px | 156.6 | 156.6 | banner label cap 191 |
| `Minha comida favorita` 18 px | 189.2 | 189.2 (wraps at 189) | 2-line band |
| `Personen in meiner Familie:` 18 px | 234.9 | 234.9 | one line at 236 |
| `Buchstaben in meinem Namen:` 18 px | 262.8 | 262.8 | 2 lines at 232 |
| `Osaan ajaa polkupyörällä` / `polkupyörällä` 18 px | 217.4 / 118.5 | 217.4 / 118.5 | 2 lines, word <= 146 |
| `vaaleanpunainen` 16 px | 128.4 | 128.4 | pink out globally |
| `sopracciglio` / `orecchio` 17 px | 96.5 / (192 hand) | 96.5 / **67** | d3 only / UNKNOWN by hand |
| F1 pools passing 96 px in ALL 11 | "≥ 8 per category" | animals **33**, supermarket **58**, fruits 22, toys 22, vehicles 15, colours **7** | ceilings in §3 F1 |
| slug collisions x11 (every axis) | 0 | **0** | |
| landing heads (11 corpora) | 0 of 30,773 | **0 of 32,773** | |
| `apps['all-about-me']`, `axes` key, `apps.emotions` | absent | absent, absent, absent | |

The designer's own widths (`k323-measure.js`, `file://` origin) reproduced exactly; the draft errors were in CSS box arithmetic and component heights, not in font widths.

## 5 OPEN items

1. **`letters` vs `sel`** for K-319 + K-323 jointly (a §16.4 doctrine review + a two-row disc). Default `letters`; the design files ship on `letters`.
2. **Favourite copy-lane form.** The heading-only form is shipped; a locale panel may ask for a copula starter (en / sv / da / no / fi natural). Accepting it re-opens the agreement trap in es/pt/it/fr: only allow where the panel confirms a bare noun never agrees.
3. **nl `gezin` vs `familie`** (base vs F2); **no** `Familien min` vs `Mitt favorittdyr` register; the panels rule.
4. **`orecchio` on a 200 px lane at glyphH 40** (it) and `sopracciglio` (d3): handwriting width UNKNOWN; if the it panel objects, the F3 lanes widen to 210 by shrinking the icon to 240 (all >= floors).
5. **`drawBox` `label` option** is claimed by both G2-318 and K-323 against a G1-308 definition without it: one additive edit, first builder adds it.
6. **`tools/gate-variation-distinct.js`** needs the b3 wave file + ROWS (shared with every sibling).
7. **Description window per locale** for six instructions (README open item 1: the live "free printable" lead): measure with `tools/measure-instruction-window.js` at the wave.
8. **F1 category curation** (8-12 K-recognisable options per category inside the measured all-11 ceilings): the pedagogue authors the list; the validator's global 96 px gate is the backstop, never the curator.

## 6 Quality verdict (a critical kindergarten teacher)

The base is a real first-week page, not a colouring sheet: a name lane a five-year-old can actually fill, a portrait big enough for a crayon, and three favourites to draw before anyone asks them to write. The five faces each add one honest move (choose-and-copy, count your own family, label a face, tick what you can do, count your name) with the K floors held everywhere after the re-measure, and nothing prints an answer or a feeling.
What I would still watch at the first render: the F1 page is 2 px from the floor, and the "I can" literals will be the panels' hardest strings (a three-line sentence is refused, not shrunk).
