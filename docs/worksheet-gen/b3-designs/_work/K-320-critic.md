# K-320 `ordinal-numbers` : editor-critic record (2026-09-14)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README (cross-type rulings, open items 12 + the `coordinate.mode` ruling, body 722, `unitAxis`), `_PANEL-FINDINGS.md` §15, `G1-308-read-and-do.md`, `K-319-emotions.md`, `_work/K-320-pedagogy.md`, `_work/K-320-design.md`. Verified in the repo: `data/b2/calendar.js` (`ordinal(style, n)` run by node for all 11 styles), `templates/components.js` (`answerBox:105`), `templates/components-b2.js` (exports; `components-b3.js` ABSENT), `page/page.css` (`.ws-page:16`, `.ws-icon:178`, `.ws-answerbox:220`, `.ws-lane:401`, `.ws-achip:406`, `.ws-pill:422`, `.ws-blankbox:445`), `qa/lints.js:32` content selector, `primitives/_tokens.js:68-70` density, `types/_shared/position-words.js`, `frontend/lib/seo/strand-names.ts:32-44`, `frontend/config/topics-taxonomy.json` (`apps` + every axis slug), `scripts/seo-landing/gen-b2var-landings.js:112-124` (`LEVEL_KEYS`), `lib/b2-common.js` (`B2_EXCLUDE:35`, `entriesFor:40`), `assets/fonts/fonts.css` + `baloo2-700-latin.woff2`, `types/g2/G2-277-read-the-calendar.js:17,91,94`. Scratch (type-scoped): `k320-glyph.js`, `k320-words.js` in the session scratchpad. No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base = 5 rows, ONE chip + flag + 6 tiles (80/64/6), circle only | base = 3 `.ws-lane` panels, 7 tiles 84/72/8, TWO chips each with mark icons | **design geometry** (task instruction) with the action pool trimmed to **circle + cross at d2**, tick from d3 | two chips per strip with different marks make each answer attributable; pic 72 > 64; a K legend of two icons, not three (K load) |
| 2 | chip numeral 30 (implied by K token) vs design chipPx 28 at d2 | | **30** at d2 | brief's K answer-numeral floor 30 (`_tokens.js fontChoice`); the chip is the only numeral the K child reads |
| 3 | F1 = 3 blocks x 8, 4 given + 4 blank, position 1 never blank | b = 2 strips x 6, all 12 boxes blank | **pedagogy content on design geometry**: 3 x 8 (76/60/5), `under:'box'`, 4 given + 4 blank | the given cells ARE the suffix pattern the child copies; two all-blank 1..6 strips repeat each other; 3 x 8 reaches 7th/8th; stack 546 |
| 4 | F2 = ordinal WORD chips under a line-up, lines up to pictures | c = themeless notation-to-word column match + `positionDots` | **pedagogy form** (word -> position -> picture) | design c removes the line-up (the type boundary) and the dots restate the answer as a diagram (the pedagogy's own rejected "symbol match"); themeless would also break the type's theme fan |
| 5 | F3 = fixed-head-noun frame with an inline picture (`{pic}`) | d = pictured query (clone + arrow + box) | **pictured query**; the frame reduced to an OPTIONAL noun-free label `where.label` (`printed:false` default) | task instruction (language-free wins); no `{pic}` slot, no agreement, no fi case; the label is a data decision per locale |
| 6 | F4 PARAM `start:'mixed'`, 5 rows, >= 2 per side | e CODE `startMix:true`, strips 1 + 3 right | **PARAM** `{...base.difficulty[2], start:'mixed'}`, 3 strips, >= 1 each side per seed (6 patterns) | PARAM before CODE: `start` is a base config key read by `build()` (default `'left'`), so the face adds no code; a fixed R-L-R pattern is predictable |
| 7 | F5 = 5 lanes h 100, sep >= 40, 8 `racers` | f = 6 lanes h 96, sep >= 44, 13 `movers` | **6 lanes, sep 44, the 8 `racers`** | 5 items < the G1 floor 6 (`_tokens.js`); 44 = the G1 element floor; `movers` held `reptiles and Amphibians` (9 nouns) and `birds` (12) below/near `minNouns` and themes outside the fan set |
| 8 | base d3 = 5 rows x 8 (pic 56) | d3 = 10 tiles 62 / pic 56 / gap 3 | **8 x 76 / 64 / 5** | the task asked for a ruling: 56 is AT the floor with a 3 px ring reserve; 76/64/5 keeps the 6 px tile margin + 5 px gap the G1-308 tile idiom relies on; d3 does not ship |
| 9 | answer boxes 60x44 (F1) / 72x44 (F3) | 64x44 (d, f) | **F1 68x44 (tile - 8), F3 + F5 72x44** | `10th` at 26 px = 50.8 (m), `10:e` 46.0; a child's four glyphs need > 56 px inner; F5 trail shortened 551 -> 543 |
| 10 | `genderPolicy` absent; "head noun fixes gender" | `genderPolicy:'position'|'noun'` for face b | kept, **F1 only**; fr and the 7 non-inflecting locales forced `'position'` | task instruction; `'noun'` needs a full `notationF`, which only es/pt/it have |
| 11 | `coordinate.mode` `null` on the base | (silent) | `'base'` | README ruling (`coordKey()` = `type|mode|theme`) |
| 12 | F2 chips "<= 110 px, validator caps 10 glyphs" | words at Baloo 26 in a 260 column | **measured**: 22 px chips overflow in fr (667) and fi (660) -> those two at 20 px (622 / 616); no glyph cap | a glyph cap would refuse `ensimmäinen` (11 glyphs, the Finnish word for "first") |
| 13 | panel "196" / stack "612" | | **198 / 618** | 20 + 4 + 84 + 22 + 44 = 174 content + 20 padding + 4 border; the design omitted the 4 px arrow gap |
| 14 | pedagogy: "calendar `sv` prints 1:e" (F.1) | design: same | **stale, removed**: `ordinal('sv', n)` = `1:a 2:a 3:e ... 21:a 22:a 31:a` (node, README item 12, commit `d1acae96`) | the table stays the source anyway; the validator now REPORTS agreement for sv instead of a divergence |

## 2 Claims removed or downgraded as unverified

- "Baloo 2 `º` coverage UNKNOWN / superscript-o fallback" (design §6, §9): **measured present** (widths differ from the system fallback with the face loaded); the fallback text is deleted.
- Pool counts vehicles 29 / toys 30 / birds 2 39 (pedagogy §A): en-only; **MIN over 11 = 28 / 29 / 38** (`entriesFor` applies `B2_EXCLUDE`: `crane`, `tank`/`loader` in da, `lego` in no).
- `matchColumns`, `positionDots` (design §5, §7c): dropped with face c.
- Design's `movers` theme list (13): replaced by the 8 `racers`; `insects and bugs` (15), `ocean life` (23), `Things That Fly` (34) are legal pools but not in this type's fan set; `reptiles and Amphibians` 9 < `minNouns`.
- Pedagogy's per-locale F3 frames with `{pic}` (11 sentences) and the `headGender` validator rule: replaced by the optional noun-free label; the head-noun table (`lugar posto rang Stelle plaats plats plads plass monesko`) survives only as the RATIONALE for `genderPolicy:'position'`.
- National-framework wordings (pt "EF01MA01", nl "kerndoel 26", sv/da/no/fi lines): kept as "panel confirms wording" + [NSR]; not verified here.
- "widest notation ~62 px" (design §2): measured 54.7 (`10th` at 28); chip ~131 at 30 is an estimate from that.
- The pedagogy's claim that 8 of 10 fan themes are "race-capable" stands (fruits, toys refused for F5).

## 3 Numbers re-measured (which won)

| number | pedagogy | design | measured | wins |
|---|---|---|---|---|
| `.ws-lane` inner width (inline padding 10 12) | 647 (G1-308) | 647 | 675 - 24 - 4 = 647 | both |
| base panel min / stack | (5 rows 588) | 196 / 612 | 198 / 618 | measured |
| tiles 7 x 84 + 6 x 8 | | 636 | 636 <= 647 | design |
| F1 stack | 476 | 376 | 546 (3 x 174 + 24) | measured (new geometry) |
| F2 stack (min) | ~416 | 722 (columns) | 468 (2 x 228 + 12) | measured |
| F3 stack | ~670 | 600 | 636 (3 x 204 + 24) | measured |
| F5 stack | 548 (5 lanes) | 616 (6 lanes) | 616 | design |
| F2 worst chip row at 22 px | "<= 647 est." | | en 506 de 504 es 563 pt 562 it 536 nl 535 sv 504 da 522 no 515 **fr 667 fi 660** | measured; fr/fi at 20 px = 622 / 616 |
| notation widths at 28 px | | ~62 | `10th` 54.7 · `10:e` 49.5 · `10.º` 44.2 · `1:a` 32.7 · `1er` 37.3 | measured |
| `10th` at 26 (answer box) | | | 50.8 (`10:e` 46.0, `10.º` 41.1) | measured -> boxes 68 / 72 |
| `ordinal('sv', n)` | `n:e` (wrong) | `1:e` (wrong) | `1:a 2:a 3:e ... 21:a 22:a 31:a` | measured (fixed `d1acae96`) |
| es/pt/it/fr calendar styles | plain / bare | plain / bare | es pt it `1 2 3`, fr `1er 2 3` | agree; table stays the source |
| taxonomy slug collisions (11 slugs x every axis x 11 locales) | 0 | 0 | 0 | agree |
| `apps` subjects | | | math 38 · letters 28 · spatial-reasoning 13 · logic 12 · science 3 | `math` legal |
| `strand-names.ts` `Counting & Cardinality` | all 11 | | all 11 present | agree |

## 4 OPEN items (numbered)

1. **`tools/gate-variation-distinct.js` reads only the b2 wave + `gen-b2var-specs.js ROWS`** (m); a b3 wave file / ROWS list must exist before the six resolved configs can be gated (batch-wide; also G1-308 OPEN 7, K-319 OPEN 6).
2. **`pictureStrip` is owned by G1-308** and does not exist yet; the three additive options (`start`, `flagScale`, `under` + item `given`) must land with defaults byte-identical to G1-308's build, proven by `b3-baseline --check` after G1-308 has rendered once.
3. **F5 art facing.** No `facing` table exists; a runner drawn facing left runs away from the finish. The critic reads one race per racer theme (8 renders); the `facing:{noun:'left'}` mirror knob is added only where a picture needs it. Not resolvable at design time.
4. **es/pt dot in the ordinal indicator** (`1.º` RAE vs `1º` MX/BR school print) and es `1.º` vs `1.er`: each panel rules ONCE; the validator enforces all-or-none; `alt[]` holds the other.
5. **de citation form for F2 chips** (`erste` vs `der Erste`): panel rules; `capital:true` covers either.
6. **Mono print of the coral flag + X icon**: one d2 base page on a mono laser; the pennant shape and the ink pole carry direction; if the X icon on the grey mini tile reads as a tile decoration, the icon's tile becomes an outline only (a `markIcon` change, no data change).
7. **Published sv calendar decks** (G2-277/296/297/298/312 family) whose random date hit 1/2/21/22/31 still carry `1:e`-class forms: README item 12 says count from the DB and republish with `--updates-manifest` in the build session. Not this type's file, recorded so it is not lost.
8. **Answer-key ambiguity in F3**: a child who writes the cardinal `3` instead of `3rd` is not wrong about the place; the key prints the notation and the instruction says "ordinal number". A teacher note on the answer key ("3 = 3rd is acceptable at G1") is a landing/answer-key copy decision for the panel, not a verify change.
9. **F2 at 20 px in fr/fi** is 2 px under the 22 px the other nine locales get; if a panel adds a longer word set (e.g. fr `première`) the validator steps that locale down again only to 20; below 20 the face is REFUSED for the locale, never squeezed.
10. **`where.printed`**: no locale has asked for the label yet; if a panel sets it, the panel min grows by ~24 px (3 x 24 = 72 <= the 86 px slack at 722 after 636); the verifier must re-run that locale.

## 5 Quality verdict (a critical K / first-grade teacher)

The base page is the one I would actually print: three calm rows of seven, a flag I can point to, two chips per row whose marks tell me at a glance which child counted from the wrong end, and nothing on the page my non-readers have to read. The five faces are honest steps (write it, read the word, find the place, read the flag, rank by distance) rather than relabels, and the race is the page children ask for again. What I would still watch: the cross-out icon on a K page of cute animals (some classes dislike "crossing out" a puppy; the tick at d3 exists for that reason) and the fr/fi word chips at 20 px, which are readable but the smallest text in the type.
