# Design studio B — picture + word pages (#1 K-284 · #4 K-287 · #5 K-288 · #8 G1-244 · #9 G1-245 · #11 G1-247)

All measurements in CSS px on the 703×945 page box. `.ws-page` has 14px side padding → **inner width 675; every body below is designed to a 660-wide column, centred** (the K-239 / K-241 convention). Body height budget ≈ 760 (single-line instruction); every page below stays ≤ 740 so a two-line de/fi instruction (+25px) still fits.

## 0. Facts measured before designing (they drive every decision below)

**Centreline glyph engine** (`data/tracing/letter-strokes.js`, consumed by `strokeWordLane`): box 100 units; ascender 14 · x-height 44 · baseline 84 · descender 96 → a lowercase word's `glyphH` measures 70 units, so **scale = glyphH / 70**, and the word's rendered width = `textGlyphs(word).width × scale`. Glyph coverage: 52 core + 44 composed accents (ÄÖÜÅÁÀÂÉÈÊËÍÓÔÕÚÙÑ + lowercase incl. ãõüïÿ) + ÆØøæß. **NOT traceable: space, hyphen, apostrophe, ç.** Consequence: nl plurals with `'s` (koala's, auto's), fr/es/it/pt multi-word nouns (raton laveur, pájaro carpintero), hyphens (Orang-Utan, chauve-souris, kuorma-auto) and pt *maçã* / *onça* cannot be traced today.

**Word widths in glyph units over the 4 wave themes × 11 locales** (singular, display case): p50 ≈ 250-390, p90 ≈ 380-640, max 705 (fi *granaattiomena*); plural max 750. Traceable nouns per (theme, locale) never drop below 22 (nl fruits) — comfortably ≥ the 8 any page needs.

**Gender availability for the article page**: sv *animals* is 36 en / 1 ett; da animals 35/2; no animals 35/2 — an article page on that theme would be degenerate. fruits/vehicles/toys carry ≥4 of the minority gender in every gendered locale. no vocab has NO feminine tag (m/n only) → `ei` cannot be keyed.

**Word-case rule (locale slot, not a guess)**: vocab stores Capitalised forms. Display = `toLocaleLowerCase(loc)` everywhere **except de, which keeps the capital** (Nomen großschreiben is the K teaching point). nl `ij` lowercases as two glyphs — fine.

**Two small shared additions I ask Phase 1 to make** (they unlock 100 % noun coverage for #1/#4/#8 and cost ~30 lines):
- `letter-strokes.js`: add `' '` (advance-only, `adv` = 34 units, no strokes), `'-'` (one stroke at x-height mid, 24 units), `'’'`/`'\''` (one short 8-unit stroke in the accent band), `'ç'` (composed: `c` + a 2-point cedilla stroke tagged `isMark`). Until they land, every spec below filters with `traceable(word)` = every code point ∈ CORE ∪ COMPOSED ∪ NEW — refuse, never guess.
- `trace-path.js strokeWordLane`: an additive `stack: true` option (reps laid out **vertically**, each on its own school-line trio, all left-aligned at `padLeft`, optional `emptyLast` blank trio) — see §1.5. Side-by-side reps in a 660 lane cap a long word at glyphH ≈ 25px (K-239's shrink rule), which is unusable for K tracing (x-height 3.7mm). Stacking gives every word the full lane width.

---

## #1 · K-284 — Trace and Write the Words (`word-tracing`, K, L.K.1.a)

### 1. Page concept
Four flashcard rows. On the left of each row a big theme picture on a cream card; on the right a three-line writing block: the word once in solid teal school hand, the same word directly beneath in dashed centreline strokes, then an empty school-line trio. The child names the picture, reads the model, traces the dashed word letter-for-letter under the model (the columns line up, so *this* letter is right above *that* letter — a copying scaffold, not a puzzle), then writes it alone on the empty line. Delight = the page reads like four picture-dictionary cards the child is finishing; long German and Finnish words get the same dignity as *cat* because every word owns a full-width lane.

### 2. Layout (d2)
```
┌────────────────┬──────────────────────────────────────────────────┐
│  ┌──────────┐  │  ─────────── Regenschirm (solid teal) ───────── │  lane 1 h58
│  │ picture  │  │  ·········· Regenschirm (dashed grid) ·········· │  lane 2 h58
│  │  120px   │  │  ───────────── (empty school lines) ──────────── │  lane 3 h58
│  └──────────┘  │                                                  │
└────────────────┴──────────────────────────────────────────────────┘  row 178
   (×4 rows, 12px gap)
```
- Row = flex, 660 wide, h 178, gap 14. **Picture card** `.ws-card` 150×178 (cream, 2px creamDeep border, r14), picture 120×120 centred, rotation ±4°. **Lane block** 496 wide: one `strokeWordLane({stack:true, w:496, laneH:58, glyphH:46, reps:2, emptyLast:true, padLeft:10})` → three school-line trios stacked (2px between), rep 0 solid model, rep 1 dashed, third trio blank. Word width at glyphH 46 (scale 0.657): fi max 705 u → 463px ≤ 478 usable → **no shrink for any wave noun**. Glyph x-height = 46×30/70 ≈ 20px (5.2mm) — a real K pencil size.
- Rows are `.ws-trace-lane` (lint CONTENT_SEL) and stamp `data-lcs-word` / `data-lcs-vocab`.
- Body: 4×178 + 3×12 = 748. (A two-line instruction pushes this to the limit → `laneH` drops to 56 automatically when the instruction wraps? No — keep it static: 748 ≤ 760 holds with the single-line instruction, and the de/fi panel titles are one line; if a locale's instruction wraps, the engineer sets `rowH 172` for that locale via `d.compact` — same mechanism as G1-213's `problems>=3`.)

**d1**: 3 rows, h 218: picture 150 in a 176-wide card; lanes glyphH 56, laneH 68 (three trios = 208). Words ≤ 5 letters only.
**d3**: 4 rows, h 178, but the *solid model shrinks into the picture card* as a caption (glyphH 24 centreline word under a 96px picture — a true flashcard) and the lane block becomes **dashed trace + two empty trios** ("trace once, write twice"). Words prefer ≥ 6 letters.

### 3. Difficulty ladder
| | words | letters | glyphH / laneH | lanes | picture |
|---|---|---|---|---|---|
| d1 | 3 | 3-5 | 56 / 68 | model · trace · write | 150 |
| d2 | 4 | any traceable (≤ 14) | 46 / 58 | model · trace · write | 120 |
| d3 | 4 | prefer 6-14 | 40 / 52 (caption 24) | trace · write · write | 96 |
Noun sampling: `rng.sample(traceableNouns, n)`; d1 filters `len ≤ 5` (fallback: the 3 shortest), d3 sorts by length desc and samples from the top 60 %. Distinct vocab keys; distinct **display words** (two nouns can share a word in one locale — e.g. toys `helicopter` twins).

### 4. Answer-hiding + uniqueness
Nothing to hide (a tracing page has no hidden answer) — the invariant is *the promised empty line is empty and the model is the word the picture shows*. verify() asserts, per `[data-lcs-word]` row:
- `data-lcs-word` matches `[data-lcs-prim="trace-word"] data-lcs-text` and `data-lcs-letters === [...word].length`; word passes `/^[\p{L}]{2,16}$/u` (extend to `[\p{L} '’-]` once the glyphs exist).
- `:scope > g` count === `data-lcs-reps` (2 at d1/d2, 1 at d3); rep 0 solid (no dasharray), later reps dashed, every path `fill="none"`; no `<text>` in the lane; no `circle/polygon` (word lanes carry no guides — K-239 rule).
- `data-lcs-empty-slot` present and the empty trio(s) contain **no** `<g>` / `<path>` — count of school-line `<line>` === 3 × trios (3×3 = 9 at d2).
- one `<img>` per row, `naturalWidth > 0`; `data-lcs-vocab` unique across rows; display words unique; **de rows start with an uppercase letter, every other locale's rows start lowercase** (`data-lcs-case` stamped by build from the locale rule, asserted against the first code point).
- Stamps: row `data-lcs-word data-lcs-vocab data-lcs-case="upper|lower"`, lane svg (existing) `data-lcs-prim data-lcs-text data-lcs-reps data-lcs-letters data-lcs-strokes data-lcs-empty-slot`, picture `data-lcs-pic="<vocabKey>"`.

### 5. Primitives / new drawing
Reuse: `strokeWordLane` (+ the `stack` option), `schoolLines`, `fileUri`, `labelSafeNouns`, `labels`, `.ws-card`.
**New — `strokeWordLane({stack:true})`** (additive branch inside the existing function): `trioH = laneH`; for i in 0..reps-1 (+1 if emptyLast): `y0 = i × (trioH + 2)`; draw `schoolLines({w, yTop, yBase, yMid})` translated to y0 (same `textLaneGeometry` as today, so the ruling matches the inline lane byte-for-byte); rep i glyphs via `renderTextRep({x0: padLeft, …})` translated by y0; maxW = `w − padLeft − 8`; svg height = trios × trioH + (trios−1) × 2. Attributes unchanged plus `data-lcs-stack="1"`. Colours: model `teal`, trace `grid`, lines `grid` — tokens only.
**New — picture caption (d3)**: same lane, `reps:1, stack:true, glyphH:24, laneH:32, padLeft:0` centred (`align:'center'` = x0 computed like the inline lane) under the picture inside the card.

### 6. Locale slot structure
- Word = `labels(noun, loc)[0]` (singular) in display case (`de` keep, others lower). No authored text on the apparatus. Title/instruction = locale genre name (Wörter nachspuren · repasa la palabra · cubra a palavra …).
- Per-locale overrides a panel may set in `data/b2/word-tracing.js[loc]`: `case: 'keep'|'lower'` (default lower; de keep), `exclude: [vocabKeys]` (e.g. nl may exclude *ijsbeer* if the panel wants `IJ` capitalised — it would render as `Ij`… no: display is lowercase `ijsbeer`, correct), `prefer: [vocabKeys]` (the panel's classroom favourites get sampled first at d1).

### 7. Alternatives
- **A — K-239 clone (inline model | trace, reps 2, 660 wide, no picture column, picture as a 64px badge at the lane's left end).** Cheaper (zero primitive change) but the long-word shrink drops fi/de words to glyphH ≈ 25 — rejected on the x-height floor.
- **B — 2×4 card grid, each card = picture top + dashed word + writing line (portrait cards).** Prettier at a glance, but 323-wide cards hold only ~300-unit words at glyphH 40; half the de/fi nouns shrink. Rejected.
- **Recommendation: the stacked flashcard row (above)** — full-width lanes are the only shape that keeps K-size tracing for *Regenschirm* and *sammakko*, and the vertically aligned letters are a genuine copying scaffold no side-by-side lane gives.

### 8. Risks
- **Untraceable nouns** (space/hyphen/apostrophe/ç) → filtered by `traceable()`; the wave themes keep ≥ 22 per locale. Add the 4 glyphs in Phase 1 to close the gap; verify's regex widens with them.
- **Wrapped instruction (de/fi)** eats 25px → `d.compact` rowH 172 (laneH 56).
- **Print/B&W**: dashed `grid` (#C8BFAE) at 3.4px on white — proven on K-239/K-278. School lines 1.5/1/1.5 px.
- **Duplicate display words** in one locale (toys *helicopter*) → uniqueness on the display string, not just vocab key.

---

## #4 · K-287 — Singular and Plural (`singular-plural`, K, L.K.1.c)

### 1. Page concept
Four rows, each a tiny story: **one** picture with its word printed solid on the left; on the right the same picture cloned **two or three times** (slightly rotated, like they were tipped out of a box) with the plural word in dashed strokes under them and an empty line beneath. Count badges (1 · 3) sit on the picture groups so the page is legible with zero reading. The child sees the word *grow* when the things multiply, traces the plural, then writes it. Delight: the cloned pictures are a little crowd; the ending "shows up" only where the crowd is.

### 2. Layout (d2)
```
┌── column heads: [1]            [2 · 3]  (numeral pills; optional locale words) ──┐
┌─────────────────┬──────────────────────────────────────────────────────────────┐
│ ①  [pic 80]     │  ③ [pic64][pic64][pic64]                                     │ h 64
│   Apfel (solid) │  ······· Äpfel (dashed, glyphH 40) ·······                  │ h 52
│   glyphH 30     │  ─────────── (empty school lines) ─────────                  │ h 46
└─────────────────┴──────────────────────────────────────────────────────────────┘ row 172
 (×4 rows, gap 12)
```
- Column-head strip h 30 (two `.ws-scene-legend-item`-style pills: left "1", right "2 · 3", Baloo 22 teal; optional authored words after the numeral, Nunito 800 15).
- Row `.ws-card` 660×172, padding 10. **Left cell** 176 wide: picture 80 centred with a teal count badge "1" (24px circle, top-left); beneath it the singular as a **solid centreline word** (`strokeWordLane reps:1, glyphH:30, laneH:40, w:160`, centred). **Divider**: 2px dashed `grid` vertical line. **Right cell** 450 wide: clone row (2-3 pictures 64px, gap 8, rotation −6°/0/+6°, count badge = n), dashed plural lane (`strokeWordLane({stack:true, reps:2, laneH:52, glyphH:40, w:440, padLeft:8, modelless:true})` — see §5: solid model is the *singular* already on the left, the plural's first rep is dashed), empty writing trio (`emptyLast`).
- Body: 30 + 8 + 4×172 + 3×12 = 762 → tighten row to 168 (clone row 60) = 746.

**d1**: 3 rows h 224; clones always exactly 2; pictures 96 / 76; plural lane glyphH 48; **only regular plurals** (see §3). **d3**: 5 rows h 140: pictures 64 / 52, clones 2-3, singular caption glyphH 26, plural lane glyphH 34, writing trio 40; **≥ 2 non-prefix plurals** (Apfel→Äpfel, mouse→mice, fi *nukke→nuket*) when the theme has them.

### 3. Difficulty ladder
| | rows | clones | plural class | glyphH plural | picture single/clone |
|---|---|---|---|---|---|
| d1 | 3 | 2 | plural = singular + suffix only (`plural.startsWith(singular)`) | 48 | 96 / 76 |
| d2 | 4 | 2-3 | any, but ≥ 3 of the 4 are prefix-plurals | 40 | 80 / 64 |
| d3 | 5 | 2-3 | ≥ 2 non-prefix plurals if available; else longest words | 34 | 64 / 52 |
Regularity proxy is language-neutral: **prefix test on the display strings** (de Apfel/Äpfel fails it, fi omena/omenat passes, en dog/dogs passes, it mela/mele fails). Nouns with `plural === singular` (sheep, Hubschrauber, sv äpple/äpplen ok) are **excluded** at every level. Clone count: 2 or 3, never 4 (K counts, and 3×64 fits).

### 4. Answer-hiding + uniqueness
The plural must appear ONLY as the dashed trace — never as solid text on the row, and the writing trio is empty.
- Row stamps `data-lcs-vocab data-lcs-singular data-lcs-plural data-lcs-n="2|3"`; verify: `singular !== plural`; the left lane's `data-lcs-text === singular`, its single rep is solid; the right lane's `data-lcs-text === plural`, `data-lcs-reps === 1` drawn, that rep dashed, `data-lcs-empty-slot` present with an empty trio.
- `img[data-lcs-pic]` count in the left cell === 1, in the right cell === `data-lcs-n`, all same `src`.
- Count badge text === image count on each side (badges are the only `<span>` text on the row; verify reads them).
- No `<text>` anywhere inside the lanes; no solid path in the plural lane. Vocab keys unique; page-level `data-lcs-regular-count` ≥ the level's floor (d1 = all).

### 5. Primitives / new drawing
Reuse: `strokeWordLane` (stack + a `modelless:true` flag that makes rep 0 dashed — 1-line change: `isModel: !modelless && i === 0`), `schoolLines`, `.ws-card`, `fileUri`.
**New — count badge**: SVG 24×24, circle r 11 fill `teal`, numeral Baloo 700 13 `white`, placed absolutely at the picture group's top-left (−4,−4). **New — column-head pill**: `roundedRect` 88×30 r15 fill `white` stroke `creamDeep` 2, numeral(s) Baloo 700 20 `teal` ("1" / "2 · 3"); optional word to the right in Nunito 800 15 `ink`.

### 6. Locale slot structure
- singular = `labels(k, loc)[0]`, plural = `labels(k, loc)[1]`, display case per the K-284 rule (de keeps capitals on both). fi `-t` plural is a prefix plural — d1-friendly. sv/da/no `en/ett` is irrelevant here (no article shown).
- Authored per locale (`data/b2/singular-plural.js[loc]`): `singularLabel`, `pluralLabel` (optional, ≤ 12 chars, shown after the pill numerals — de "Einzahl/Mehrzahl", fr "un/plusieurs", fi "yksikkö/monikko"); `exclude: [vocabKeys]` (a panel may drop a plural it judges non-K, e.g. it *uovo/uova* class, de *Kaktus/Kakteen*); `preferIrregular: [vocabKeys]` for d3.
- Untraceable plurals (nl `koala's`) → row skipped by `traceable()` until the apostrophe glyph lands.

### 7. Alternatives
- **A — 2×4 card grid, each card = one picture top / three pictures bottom with both words.** Compact but the plural lane is 300 wide → fi/de plurals shrink below K size. Rejected.
- **B — Match-style two columns: singles on the left, crowds on the right, draw lines, write the plural once.** Tests matching, not the morpheme — touches L.K.1.c rather than instantiating it. Rejected.
- **Recommendation: the story row** — the ONE → MANY reading direction on each row makes the plural ending the visible consequence of the crowd, and the full-width dashed lane keeps every plural at K tracing size.

### 8. Risks
- **Locales with few regular plurals in a theme** (de fruits is all -n/-en → fine; de toys has 13 same-plural nouns → excluded, still 17 left). If `< rows` candidates → throw (refuse).
- **Overflow at d3 5 rows** with a wrapped instruction → d3 row 136 / drop to 4 rows via `d.compact`.
- **B&W**: the count badge numeral is the signal; the crowd is visible without colour.
- **Ambiguity**: nouns whose plural is also a different singular (en *glasses*) are excluded by the panel's `exclude`.

---

## #5 · K-288 — Articles: der / die / das (`articles`, K, L.1.1.h for en) — locale-rebuilt

### 1. Page concept
Six generous picture cards; under each picture a row of two or three identical white chips carrying the locale's articles in a **fixed, canonical order** (der · die · das). The child says the noun with its article aloud and circles the chip. No writing at K. Delight: it is the Grundschule "Artikel-Kreis" made pretty, and the identical chip rows turn it into a rhythm — say, circle, say, circle. For English the chips are *a / an*; for Finnish the same slot structure carries a noun-form choice (*Missä? — sammakossa / sammakolla / sammakon*) the fi panel authors.

### 2. Layout (d2)
```
┌────────────────────┐ ┌────────────────────┐
│ ①                  │ │ ②                  │
│      [pic 118]     │ │      [pic 118]     │   card 323 × 236
│                    │ │                    │
│  (der) (die) (das) │ │  (der) (die) (das) │   chips 84×48, gap 12
└────────────────────┘ └────────────────────┘
        ×3 rows, gap 14
```
- `cardGrid({cols:2, rows:3})`, card 323×236 (3×236 + 2×14 = 736). Stage: picture 118 centred (rotation ±4°). Chip row `.ws-choices`-style, padding-top 6: chips are `roundedRect`-styled spans 84×48 r24, `white` fill, 2.5px `teal` border, Baloo 700 24 `ink`. 3 chips = 3×84 + 2×12 = 276 ≤ 299 inner. 2-chip locales use 96×48 chips.
- Optional **de colour convention**: a 10px dot in the chip's top-left corner — der `codeBlue`, die `codeRed`, das `codeGreen` (existing `codeColors`, SVG fill so lint passes) — only when `articles.js.de.chipDots` is set; the word carries the signal in B&W.

**d1**: 4 cards 2×2 (323×361), picture 150, chips 96×56 Baloo 28. **d3**: 8 cards 2×4 (323×172), picture 88 left + chips right in a row (chips 76×44) — or the locale's harder chip set (fr `un/une`; it adds `l'`/`lo`; nl `de/het` d3 with plural `de` distractor excluded — the panel picks; en d3 = nouns starting with the tricky vowels/consonants: *unicorn, hour, owl, elephant*).

### 3. Difficulty ladder
| | cards | chips per card | gender mix | picture |
|---|---|---|---|---|
| d1 | 4 | locale set (2-3) | each present gender ≥ 1, minority ≥ 1 | 150 |
| d2 | 6 | locale set | **≥ 2 of every chip that appears as a key**; 3-gender locales: ≥ 1 each and ≥ 2 of two | 118 |
| d3 | 8 | locale set for d3 (`chipSets[3]`) | ≥ 2 each; en: ≥ 3 "an" | 88 |
Build: `pool = labelSafeNouns(theme).map(n → {n, key: articles[loc].keyFor(entry)}).filter(key != null)`; sample until the mix rule holds (guard 200) else **throw** — the wave then picks the next theme (sv/da/no animals will refuse; fruits/vehicles/toys pass).

### 4. Answer-hiding + uniqueness
- Card stamps `data-lcs-vocab data-lcs-key="<chipIndex>"`; each chip `data-lcs-chip="<index>" data-lcs-label="der"`, the correct one additionally `data-lcs-correct="1"`. verify: exactly one `[data-lcs-correct]` per card and its `data-lcs-chip === data-lcs-key`; **chip order identical on every card** (concatenated labels equal across cards — the canonical order never shuffles, so position leaks nothing because the key varies); chips share one class and no inline style differs between chips of a card (verify compares `getAttribute('style')` — the only per-chip difference allowed is the de dot's `fill`, which is data, not a hint); no card prints the article anywhere but the chips (card `textContent` minus chips === badge numeral).
- Page: `data-lcs-mode="article|form"`, `data-lcs-keys` histogram satisfies the mix floor.
- For `mode:'form'` (fi): chips are per-noun strings; verify additionally asserts all chips of a card are distinct and none equals the bare singular unless the table says so.

### 5. Primitives / new drawing
Reuse: `cardGrid`, `.ws-card-stage`, `fileUri`. **New component `articleChips({chips, correctIndex, size, dots})`** in `templates/components.js`: returns the chip row (spans, same DOM shape as `chipRow` but pill-shaped and text-labelled), dot = inline 12×12 SVG circle r5 with the codeColor fill + 1px `ink` stroke.

### 6. Locale slot structure — `data/b2/articles.js`
```js
{ de: { mode:'article', chips:['der','die','das'], keyFor: e => ({m:0,f:1,n:2})[e[2]],
        chipDots:['codeBlue','codeRed','codeGreen'], chipSets:{3:['der','die','das']} },
  en: { mode:'article', chips:['a','an'], keyFor: e => EXC[e.key] ?? (/^[aeiou]/i.test(e[0]) ? 1 : 0) },  // EXC: unicorn→0, hour→1, one→0 …
  fr: { chips:['le','la'], keyFor: e => /^[aeiouéèêh]/i.test(e[0]) ? null : ({m:0,f:1})[e[2]] },  // elision nouns refused; d3 set ['un','une']
  it: { chips:['il','la','lo',"l'"], keyFor: ITALIAN_RULE },   // lo: s+cons/z/gn/ps/y; l': vowel; else il/la
  nl: { chips:['de','het'], keyFor: e => ({d:0,h:1})[e[2]] },
  sv: { chips:['en','ett'], keyFor: e => ({n:0,t:1})[e[2]] },  da: same with t→'et',
  no: { chips:['en','et'], keyFor: e => ({m:0,n:1})[e[2]] },   // vocab has no f → 2-way; panel may add 'ei' only with an authored f-list
  es: { chips:['el','la'] }, pt: { chips:['o','a'] },
  fi: { mode:'form', prompt:'Missä?', forms: { sammakko:{ chips:['sammakossa','sammakolla','sammakon'], correct:0 }, … },
        keyFor: e => forms[e.key] ? forms[e.key].correct : null, chipsFor: e => forms[e.key].chips } }
```
`keyFor` returning `null` = noun refused (never guessed). The fi panel may replace the whole `forms` table, rename the prompt, or set `refuse:true` → fi ships no K-288 (substrate-honest). Gender letters per locale follow §A.13.58 (sv/da `t` neuter, no `n` neuter, nl `d/h`).

### 7. Alternatives
- **A — "Sort into three baskets" (der/die/das bins, sort-to-bins layout).** Lovely for de but a 2-chip locale gets a thin two-bin page, and drawing lines from 9 pictures is a motor load at K. Rejected as the base; a good future variation.
- **B — Write-the-article: dashed line before a solid word.** Requires writing at K and the en/fi rebuilds get awkward. Rejected.
- **Recommendation: circle-the-chip cards** — zero writing, one fixed chip rhythm, and the chip slot structure is exactly what lets fi plug a noun-form choice into the same page.

### 8. Risks
- **Degenerate gender mix** (sv/da/no animals) → build throws; wave theme order must put fruits/toys first for those locales (note for `wave-b2-<loc>.json`).
- **fr elision / it lo-l'** — handled in `keyFor`; nouns refused rather than mis-keyed.
- **en a/an exceptions** (hour, unicorn, one, university) — panel-authored `EXC`; verify cannot know English phonology, so the table is poison-tested in `validate-b2-draft.js` (must key *unicorn→a*).
- **B&W**: chips are outline + word; the optional de dots are redundant.
- **Chip width**: it `l'` and longest article "het" fit 84px at Baloo 24; fi forms (≤ 12 chars, *sammakossa*) need 96×44 chips at Baloo 18 with a 3-chip row = 312 → card inner 299 → fi uses **2 chips per card** (correct + 1 distractor) at 120×48.

---

## #8 · G1-244 — Write the Word / dictée muette (`write-the-word`, G1, L.K.2.d / L.1.2.d)

### 1. Page concept
A word bank runs along the top like a row of name tags — every word the page needs, in alphabetical order, none of them beside its picture. Below, eight cards: picture on the left, a clean school-line ruling on the right. The child finds the word in the bank (or, at d3, spells it from memory) and writes it on the line. It is the French *dictée muette* / German *Bild beschriften* exactly as teachers know it, on our cream cards, with a real three-line ruling instead of a flat blank.

### 2. Layout (d2)
```
┌──── word bank (alphabetical, white pills, wraps to 2 lines if needed) ──────┐  h 44-78
┌──────────────────────────────┐ ┌──────────────────────────────┐
│ ① [pic 80] ── school lines ──│ │ ② [pic 80] ── school lines ──│   card 323×152
└──────────────────────────────┘ └──────────────────────────────┘
                           ×4 rows, gap 12
```
- **Word bank** `.ws-scene-banner` (white, 2.5px dashed `coral` border, r12) full width; pills Nunito 800 17 `ink`, 8px 14px padding, gap 10, `flex-wrap`. 8 en words ≈ 1 line (44); 8 fi words ≈ 2 lines (78). Stamp `data-lcs-bank`.
- **Cards** `cardGrid({cols:2, rows:4, numbered:true})` 323×152: stage is a row: picture 80×80 (left, 8px in) + `writingRow({w:214, h:64, glyphH:30, xHeight:true})` right. x-height ≈ 13px (3.4mm) — Klasse-1 ruling size. A 14-letter word at ~15px/letter = 210 ≤ 214.
- Body: 78 + 12 + 4×152 + 3×12 = 734.

**d1**: 6 cards (2×3, 323×206), picture 104, ruling glyphH 36 w 190, words ≤ 6 letters, **first letter printed solid** on the ruling as a starter (centreline glyph via `strokeWordLane reps:1` of the single letter at the line's left). **d3**: 8 cards, **no word bank** (the cards grow to 323×170), words any length ≤ 12, no starter.

### 3. Difficulty ladder
| | cards | bank | starter letter | letters |
|---|---|---|---|---|
| d1 | 6 | yes | first letter solid | ≤ 6 |
| d2 | 8 | yes | none | ≤ 12 |
| d3 | 8 | none | none | ≤ 12, prefer ≥ 5 |
Nouns: `labelSafeNouns` (no traceability filter needed — bank text is HTML; the d1 starter needs the first letter glyph only, and every alphabet letter exists). Distinct display words; no two words sharing the first two letters at d1 (the starter would not disambiguate).

### 4. Answer-hiding + uniqueness
- The word never appears on its own card: verify asserts every `[data-lcs-card]` `textContent` (badge excluded) is empty (d2/d3) or exactly one letter equal to the word's first letter (d1, `data-lcs-hint`).
- Bank: `[data-lcs-bank] [data-lcs-bank-word]` set === the set of card `data-lcs-word` (no extras, no misses); **bank order is the locale collation order** (`data/b2/collation.js`, stamped `data-lcs-collation`), and **card order ≠ bank order and ≠ reverse** (build reshuffles cards until true; verify asserts) — otherwise position gives the answer.
- One `img` per card, unique `data-lcs-vocab`; writing row present with 3 `<line>` and no `<g>`.
- Stamps: card `data-lcs-word data-lcs-vocab data-lcs-hint?`, bank `data-lcs-bank data-lcs-collation`, pill `data-lcs-bank-word`.

### 5. Primitives / new drawing
Reuse: `cardGrid`, `writingRow` (xHeight), `.ws-scene-banner`, `strokeWordLane` (d1 starter: `reps:1, glyphH:30`, single letter, `padLeft:0`, placed absolutely at the ruling's left so the child continues on the same baseline — it needs the same `textLaneGeometry` as the writingRow: pass identical `h/glyphH`). **New**: `wordBank({words, collation})` — a 12-line component (sorted pills). New data `data/b2/collation.js` (shared with #9).

### 6. Locale slot structure
- Words = singular display case (de capitals). Bank order = collation table (sv/fi å ä ö after z; da/no æ ø å after z; es ñ after n; de/fi/… ä ö ü fold to base for de only — see #9).
- Authored per locale: title (*dictée muette* / *Bild beschriften* / *escreva o nome das figuras*), instruction, optional `exclude`. Nothing else.

### 7. Alternatives
- **A — 3×3 portrait cards, ruling under the picture.** Ruling width 300 (better for fi), but 9 items and a taller page; the bank + 3 rows of 220 = 748 with no air. Kept as the fi/de fallback if `d.portrait` is ever needed. 
- **B — Bank at the bottom (answers after the work).** Children look down anyway; top is the school convention. Rejected.
- **Recommendation: landscape cards with a top bank** — 8 items at G1 density, ruling wide enough for every ≤ 12-letter noun, and the alphabetical bank is both honest and self-verifying.

### 8. Risks
- **fi 2-line bank** → budget already assumes 78px; a 3-line bank (pt multi-word nouns) is prevented by the ≤ 12-letter filter + `exclude`.
- **Ruling too short for a long handwritten word** → letter cap 12 at d2/d3; the row gives 214px ≈ 14 letters at a G1 hand.
- **Ambiguous pictures** (toy *helicopter* vs vehicle *helicopter* are separate themes — fine; within a theme two nouns with the same display word are excluded).
- **B&W**: bank pills and rulings are line art.

---

## #9 · G1-245 — Alphabetical Order (`alphabetical-order`, G1, L.2.2.e)

### 1. Page concept
An alphabet strip across the top — the locale's *whole* alphabet, 21 to 29 cells, ä ö ü / å / æ ø where that language puts them. Below it, six picture-word cards tossed onto the page at slight angles, each with a small dashed coral circle in its corner. The child finds each word's first letter on the strip, writes 1-6 in the circles, then copies the words in order onto six numbered lines at the bottom. Delight: the cards look shuffled on a desk; the strip is the ruler you slide your finger along; the ordered list at the bottom is the reward.

### 2. Layout (d2)
```
┌ a b c d e f g h i j k l m n o p q r s t u v w x y z å ä ö ┐  strip 660×34 (29 cells × 22)
┌──────────────────────── scatter stage 660×372 ──────────────────────────┐
│   [pic]  ○        [pic]  ○         [pic]  ○      (3 columns × 2 rows,  │
│   word            word             word           cards 168×148,       │
│                                                   rotated ±5°)         │
│   [pic]  ○        [pic]  ○         [pic]  ○                             │
└─────────────────────────────────────────────────────────────────────────┘
 1 ───────────────────────    4 ───────────────────────
 2 ───────────────────────    5 ───────────────────────   answer rulings 2 cols × 3, each 320×50
 3 ───────────────────────    6 ───────────────────────
```
- **Strip**: SVG 660×34; `cellW = min(28, floor(660 / N))` (26 → 25, 27 → 24, 29 → 22, it 21 → 28), strip width N×cellW centred; cells alternate `white` / `tealSoft` fill, 1px `grid` separators, outer `roundedRect` r8 stroke `teal` 2; letters Baloo 700 `round(cellW×0.68)` → 15-19px, `teal`. Lowercase by default; `stripCase:'upper'` for de (its words are capitalised). Stamp `data-lcs-strip data-lcs-alphabet="<letters joined>"`.
- **Scatter stage** 660×372, 3×2 cells (220×186); card 168×148 `.ws-card` (cream) jittered ±12px, rotated ±5°: picture 76 centred top, word below Nunito 800 17 `ink` (15 when ≥ 11 letters, 13 when ≥ 14 — never < 12), and a **rank circle** 34px dashed `coral` 2.5px `white` fill at the card's top-right (−6,−6). Card stamps `data-lcs-word data-lcs-vocab data-lcs-rank="<1..6>"` (rank hidden).
- **Answer block**: 2 columns × 3 numbered rulings, each `writingRow({w:280, h:50, glyphH:26, xHeight:true})` with a Baloo 700 18 teal numeral at the left (28px column). Stamp `data-lcs-answer-line="1..6"` — no words.
- Body: 34 + 10 + 372 + 10 + 3×50 + 2×6 = 588. Generous.

**d1**: 4 cards (2×2 cells, card 200×176, picture 100, word 20), ranks only (no answer block — the rank circle is the whole task), first letters ≥ 3 alphabet positions apart. **d3**: 6 cards incl. **two pairs sharing a first letter** (second-letter decision; the pair's second letters ≥ 2 positions apart), plus the answer block; strip highlights nothing.

### 3. Difficulty ladder
| | cards | first-letter rule | ties | answer lines |
|---|---|---|---|---|
| d1 | 4 | all distinct, pairwise ≥ 3 apart in the locale alphabet | none | none (rank circles) |
| d2 | 6 | all distinct (≥ 1 apart) | none | 6 |
| d3 | 6 | exactly 2 pairs share a first letter | resolved at letter 2 (≥ 2 apart) | 6 |
Sampling: `pool = labelSafeNouns` → display words (lowercase; de keep) → sort with `collation[loc]` → choose by the rule (guard 300, else throw). Cards' **visual reading order** (row-major on the un-jittered grid) must not equal the sorted order or its reverse → reshuffle.

### 4. Answer-hiding + uniqueness
- verify re-sorts the 6 `data-lcs-word` values **with the collation table passed into `page.evaluate`** (`{alphabet, fold}` from `collation.js` — never `localeCompare`, never ASCII) and asserts `data-lcs-rank` equals that order; ranks are a permutation 1..n; no two words equal; at d1/d2 first letters (after fold) distinct; at d3 exactly two collisions, each resolved at letter 2 (letter-2 distinct after fold).
- Position leak: the cards' row-major order ≠ sorted, ≠ reversed sorted; rank circles empty (`textContent === ''`); answer rulings contain no text.
- Strip: `data-lcs-alphabet` letters equal `collation[loc].strip` and every card's first letter (folded) is present in the strip; the strip has no highlighted cell (all cells share the alternating fill pattern — verify compares fills to the expected parity).
- Stamps: strip `data-lcs-strip data-lcs-alphabet data-lcs-collation`, card `data-lcs-word data-lcs-vocab data-lcs-rank`, rank circle `data-lcs-rank-slot`, rulings `data-lcs-answer-line`.

### 5. Primitives / new drawing
Reuse: `writingRow`, `.ws-card`, `fileUri`, `iconScatter`'s jittered-cell idea (new small helper `cardScatter`). **New — `alphabetStrip({letters, w, case})`** SVG as specified (cells, alternating fills, hairlines, teal frame). **New — rank circle**: `circle r16 fill white stroke coral 2.5 dasharray 5 4`. **New data — `data/b2/collation.js`** ×11 hand-authored: `{ alphabet:[…ordered letters…], strip:[…letters shown…], fold: {ä:'a', ö:'o', ü:'u', ß:'ss'} | {}, tieRule:'letter' }`. Examples: sv/fi `[a..z,å,ä,ö]`, da/no `[a..z,æ,ø,å]`, es `[a..n,ñ,o..z]`, de `[a..z]` + fold ä→a ö→o ü→u ß→ss, nl `[a..z]` (ij sorts as i,j), it `[a,b,c,d,e,f,g,h,i,l,m,n,o,p,q,r,s,t,u,v,z]` (strip) but `alphabet` keeps j k w x y for loanwords, fr/pt/en fold accents (é→e, ã→a). Every table poison-tested in `validate-b2-draft.js` (sv: `zebra < åsna`; de: `Äpfel < Banane`; es: `nube < ñu < oso`).

### 6. Locale slot structure
- Words = singular display case. Strip case = `stripCase` (de upper; others lower). Title = locale genre name (*alphabetische Reihenfolge* / *ordre alphabétique* / *orden alfabético* / *aakkosjärjestys*).
- Panel overrides: the whole `collation.js[loc]` entry (they own the order, the fold table and the strip set); `exclude` for words whose alphabetical position is contested (de panel may exclude ß-initial — none exist; nl may exclude *ij*-initial words if the school treats ij as y).

### 7. Alternatives
- **A — Straight list of 6 words with numbered boxes, no pictures.** Cleaner for G2 but pictureless at G1 and it drops the theme axis. Rejected.
- **B — Cards already in a row; child writes the words in order below (no rank circles).** Loses the low-motor first step (rank only) that makes d1 accessible. Rejected.
- **Recommendation: scattered cards + rank circles + ordered rulings** — two entry points (rank, then copy), the strip makes 29-letter alphabets a feature, and the collation table is the differentiator the plan asked for.

### 8. Risks
- **Strip legibility at 22px cells** (29 letters): 15px Baloo lowercase is readable in print; never drop below cellW 20 (a 33-letter alphabet does not exist in the 11 locales).
- **Long words on 168-wide cards** (fi *granaattiomena* 14 letters): font steps 17→15→13; cap words at 14 letters; `exclude` for outliers.
- **Collation ambiguity** (de ä-fold ties: *Äpfel/Apfel* would tie) → the sampling rule forbids folded first-letter ties except at d3 second-letter pairs, and forbids full folded-prefix collisions everywhere.
- **Leaked order** via layout → row-major ≠ sorted assertion; rotation and jitter make columns non-obvious anyway.

---

## #11 · G1-247 — Doubles and Halves (`doubles-halves`, G1, 1.OA.C.6)

### 1. Page concept
Six cards in two columns. Left column **doubles**: a group of theme pictures and, across a thin dashed "mirror line", the same group reflected — the double is literally the picture's reflection; beneath, `4 + 4 = ▢`. Right column **halves**: a bigger group laid in two equal rows with a dashed coral cut line between them; beneath, `8 → ▢` under a small *half* pill. Each column has one authored one-word label pill (*double / half* — *Verdoppeln / Halbieren*), the only words on the page. The child counts (or just *sees* the mirror) and writes the number. Delight: the mirror trick makes doubling feel like magic, and halving is a visible fold.

### 2. Layout (d2)
```
┌ [double]  ─────────────────┐ ┌ [half] ──────────────────────┐
│ ①  ▣▣▣ ┊ ▣▣▣   (mirror)   │ │ ②   ▣▣▣▣▣▣                   │
│    ▣    ┊    ▣            │ │     ┈┈┈┈┈┈┈┈┈  (cut line)     │  card 323×236
│      4 + 4 = ▢            │ │     ▣▣▣▣▣▣                    │
│                           │ │        12 → ▢                 │
└───────────────────────────┘ └───────────────────────────────┘
        (rows 2-3 repeat: doubles left, halves right)
```
- `cardGrid({cols:2, rows:3})`, card 323×236, padding 12. Pill (top, under the badge): `roundedRect` 96×24 r12 fill `coralSoft`, Nunito 800 14 `ink` (the authored label, ≤ 12 chars; fi *tuplaa/puolita* fits).
- **Doubles stage** (white inner box 299×130 r12 border creamDeep): two groups of N icons (40px, rows of ≤ 3, gap 6), group A left, a vertical dashed `teal` 2px line at the centre, group B = group A with `transform: scaleX(-1)` and the same row layout (true reflection: same rows, mirrored order). N ≤ 6 → each group ≤ 2 rows of 3 = 132 wide; 132+18+132 = 282 ≤ 299.
- **Halves stage**: 2N icons (40px) in exactly two rows of N (N ≤ 6 → 6×40 + 5×6 = 270), a horizontal dashed `coral` 2.5px line between the rows with a tiny coral scissors-free "cut" mark = two short 8px ticks at each end.
- **Equation strip** h 56: Baloo 700 26 `ink` numerals, `+`/`=`/`→` in `teal`; `answerBox({w:64, h:48})`.

**d1**: 4 cards 2×2 (323×361): N 1-4, icons 52, doubles only on the left, halves of 2·4 on the right; numerals 30. **d3**: 8 cards 2×4 (323×172), **numeric only**: `n + n = ▢` (n 5-10) and `2n → ▢` (2n even 10-20) — no icons; the pill stays; optional d3 twist: 2 of 8 cards are "near doubles" `n + (n+1)` — off the standard, so **not** included (honesty).

### 3. Difficulty ladder
| | cards | doubles N | halves 2N | icons | numerals |
|---|---|---|---|---|---|
| d1 | 4 (2+2) | 1-4 | 2,4,6,8 | 52 | 30 |
| d2 | 6 (3+3) | 2-6, distinct | 4-12 even, distinct | 40 | 26 |
| d3 | 8 (4+4) | 5-10 distinct | 10-20 even distinct | none | 26 |
Column assignment fixed (doubles left, halves right) so the pill rhythm is stable. One noun per page (`rng.pick(labelSafeNouns)`), icons rotated ±4° (mirrored group uses the negated angles so the reflection is exact).

### 4. Answer-hiding + uniqueness
- Card stamps `data-lcs-op="double|half" data-lcs-n="<N>"`; `answerBox data-lcs-answer` = 2N (double) or N (half).
- Doubles: `[data-lcs-g1] img` count === N and `[data-lcs-g2] img` count === N; the printed strip text matches `/^N \+ N =$/` and **does not contain 2N** (verify regex `(^|\D)2N(\D|$)` on the strip text); the group-B wrapper has `data-lcs-mirror="1"` and its `transform` contains `scaleX(-1)`.
- Halves: icon count === 2N, arranged as two `[data-lcs-row]` of N each; the strip text is `2N →` and **does not contain N** (`(^|\D)N(\D|$)` absent — N < 2N so this is checkable; N = 1 excluded at d2/d3 since "1" could appear inside "12" — the regex handles it, but d2 starts at N = 2 anyway).
- Distinct N within each column; page has ≥ 2 of each op; every answer 2-20; pills present with non-empty authored text (`data-lcs-pill="double|half"`), and the two pill texts differ.
- Stamps: card `data-lcs-op data-lcs-n`, groups `data-lcs-g1 / data-lcs-g2[data-lcs-mirror] / data-lcs-row`, strip `data-lcs-strip`, box `data-lcs-answer`, pill `data-lcs-pill`.

### 5. Primitives / new drawing
Reuse: `cardGrid`, `iconRows` (for each group; mirror by wrapping group B in `<div style="transform:scaleX(-1)">`), `answerBox`, `.ws-subgroup`-style white box. **New drawing**: mirror line = SVG `line` dashed `7 5` `teal` 2px, full stage height, with two 6px `teal` dots at the ends; cut line = `line` dashed `7 5` `coral` 2.5px with 8px end ticks. Numerals via plain spans (Baloo) — no new primitive.

### 6. Locale slot structure
`data/b2/doubles-halves.js[loc] = { double:'double', half:'half' }` — one word each, ≤ 12 chars, lowercase unless the locale capitalises nominalised verbs (de *Verdoppeln / Halbieren*; fr *le double / la moitié*; es *el doble / la mitad*; pt *o dobro / a metade*; it *il doppio / la metà*; nl *dubbel / de helft*; sv *dubbelt / hälften*; da *det dobbelte / halvdelen*; no *det dobbelte / halvparten*; fi *kaksinkertainen* is 15 chars → panel must pick a short form (*tuplaa / puolet*)). The pill is the ONLY authored text; numerals, `+ = →` are universal. Panels may also swap `→` for `=`-style if their curriculum writes *halbiere 12 = 6* — a config flag `halfSymbol`.

### 7. Alternatives
- **A — Doubles ladder table (1+1 … 10+10) with a picture strip per row** — the classic *Verdoppeln* chart. Numeric-heavy, no halves; better as a d3 variation. Rejected as base.
- **B — Number-bond shape (whole on top, two equal parts) reused from K-243** for halves and doubles alike. Elegant reuse, but the bond hides whether the child is doubling or halving — the pill would carry all the meaning. Rejected; the mirror/cut pictures ARE the meaning.
- **Recommendation: mirror-and-cut cards** — the doubling picture proves 4+4 by reflection and the halving picture proves 12→6 by an equal cut; both are visual arguments, not just prompts.

### 8. Risks
- **Mirror reveals nothing wrong but a mirrored asymmetric object (a car facing left) looks odd** — acceptable and even charming; verify only checks structure. Objects with text (none in the themes) would read reversed — exclude via `exclude`.
- **Icon count at N = 6 halves = 12 icons** in 270px — fits; N = 7+ is numeric-only at d3.
- **Leak**: a halves stage with two rows of N visibly "gives" N — that is the intended G1 scaffold at d1/d2 (count one row), removed at d3.
- **B&W**: the cut line is dashed and ticked; the mirror line dashed and dotted-ended — distinguishable without colour.
- **Authored pill overflow** (fi/da long forms) → 12-char cap enforced by `validate-b2-draft.js`.

---

## Shared notes for the engineer
- Every new full-page stage stamps `[data-ws-content]`; rows in #1/#4 use `.ws-trace-lane`; cards use `.ws-card`/`.ws-card-stage` (lint CONTENT_SEL).
- All colours: `tokens.color.*`; only #5's optional de dots touch `codeColors` (SVG fill, already whitelisted).
- Font floor: smallest text on any page = 13px (#9 card word at ≥ 14 letters) — above the 9px lint floor and above the brief's "no element under 9px".
- Refuse-don't-guess everywhere: missing collation / articles / label table → throw with the locale + key in the message.
- Poison tests to write with each verify(): #1 a dashed model / a filled writing row; #4 a solid plural; #5 two `data-lcs-correct` chips, shuffled chip order; #8 a word printed on its card, bank in card order; #9 ASCII-sorted ranks on a sv page (*åsna* before *zebra* must FAIL); #11 the strip text containing the answer.
