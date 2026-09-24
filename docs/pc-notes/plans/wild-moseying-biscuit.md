# nt20-B — the SECOND batch of 20 new printable worksheet types × 11 locales (220 decks + 220 landings)

## Context

Operator /goal (2026-09-02): design + build 20 NEW worksheet types that make the K-3 catalog more complete and raise its quality, natively REBUILT (not translated) in all 11 locales, with top SEO, aiming at ≥1000 clicks/day from the batch. The first batch (nt20, 2026-09-01) shipped 20 types + 100 variations/locale and is LIVE; this is batch 2 on the same machinery. The catalog now holds **358 types** (K 144 / G1 88 / G2 68 / G3 58; 78 family keys). All facts below were measured this session by three explorers (generator recipe, publish/landing/hub pipeline, raw-material inventory) plus two expert panels (an 11-curriculum pedagogue; an SEO analyst who ran ~180 native-language SERP probes).

**Gap analysis result.** The 358 existing types saturate counting, comparing, patterns, phonics, tracing, clocks, fractions, graphs, arithmetic drills. What is MISSING is exactly what K-3 teachers print daily and search by genre name: the sentence-level literacy genres (Lese-Mal / read-and-color, Schüttelsätze, capitals+punctuation, Wortarten, dictée muette), noun-grammar genres that the house vocab uniquely supports (singular/plural, der-die-das/de-het/el-la, ABC order with locale collation), the daily number-sense rituals (Zahl des Tages, Zahlenmauern, Verdoppeln/Halbieren, Zahlenstrahl), the visuo-spatial classics (points à relier, reproduction sur quadrillage, pixel-art coordinates), and the real-world strands (calendar, shopping with native currency, ×/÷ story problems, picture writing prompts). Both panels independently ranked these at the top; where they disagreed (dot-to-dot: pedagogue "thin", SEO "#2 demand") the skip-counting design resolves it.

**Honest click math (from the SEO panel).** 20 types × 11 locales = 440 pages (deck + landing) ≈ **300-450 clicks/day at 9-15-month maturity** on the house 1-5/page baseline. The 1000+/day contribution is reached the same way nt20 reached it: the per-type **variation/theme fan-out lever** designed in here (themed types fan across themes with zero new design; Phase 9). Ramp is near-zero for the first 2-3 months. This is stated plainly at closeout; no invented numbers.

---

## The 20 types (locked)

Ids are the next free blocks (K-284+, G1-242+, G2-274+, G3-370+). "Family" = `exerciseType` / taxonomy key; **NEW** keys need registration (17 new + 3 reused — the nt20 shape). Themed types fan over image-library themes; themeless carry their own figure/data sets.

| # | id | Type (EN working title) | Family key | Themed | CCSS / band honesty | Primitives / data | Native-rebuild notes (the panels rule per locale) |
|---|---|---|---|---|---|---|---|
| 1 | K-284 | Trace and Write the Words | `word-tracing` NEW | yes (label-safe nouns) | L.K.1.a · K | `strokeWordLane` (exists, centerline glyphs ×11 incl. ñ ß æ ø å ä ö) + `schoolLines` + picture | zero authoring: word = vocab singular; title = locale genre name (Wörter nachspuren / repasa la palabra / cubra a palavra …) |
| 2 | K-285 | Dot-to-Dot 1 to 20 | `dot-to-dot` NEW | no (own figure set) | K.CC.A.2 · K (d1 1-10, d3 skip-2s to 40) | NEW primitive `dot-figure.js` + NEW `data/b2/dot-figures.js` (≥16 hand-authored ordered polylines 12-30 vertices: star, house, boat, rocket, fish, kite, heart, butterfly, tree, car, cat, ice-cream, umbrella, whale, sailboat, crown; verified closed + non-self-intersecting + min vertex spacing) | figure names ×11 (like symmetry figure-names); "Punkt zu Punkt / points à relier / unir los puntos / ligue os pontos / unisci i puntini / prik til prik…" |
| 3 | K-286 | Copy the Grid Picture | `grid-copy` NEW | no | readiness (fr/pt curriculum item) · K (d3 = 8×8) | reuse `sym-grid.js` engine idea → NEW `grid-copy.js` (left filled grid, right empty, same orientation, coordinate letters/numbers optional) + NEW `data/b2/pixel-figures.js` (≥12 ASYMMETRIC figures, 6×6…8×8) | language-free; genre names: Gitterbilder / reproduction sur quadrillage / copia en la cuadrícula / malha quadriculada / riproduci sui quadretti |
| 4 | K-287 | Singular and Plural | `singular-plural` NEW | yes | L.K.1.c · K (trace the plural, then write) | picture ×1 + word · pictures ×2-3 (clone) + `strokeWordLane` traced plural + blank ruling | vocab plural ×11 = the key; fi -t plural fine; sv/da/no ett/en irrelevant here |
| 5 | K-288 | Articles: der / die / das (locale-specific) | `articles` NEW | yes | L.1.1.h (en) · K (circle the article, no writing) | picture + 2-3 article chips to circle; vocab gender drives the key | **REBUILT per locale**: de der/die/das (+ colour convention blue/red/green) · nl de/het · fr le/la (+ un/une d3) · es el/la · pt o/a · it il/lo/la/l' · sv en/ett · da en/et · no en/ei/et · **en = a/an** (vowel-sound rule; panel supplies the initial-sound exceptions list) · **fi = no articles → fi panel rebuilds as a noun-form staple** (default proposal: *Missä?* locative -ssa/-lla with the vocab noun; panel may substitute *yksikkö/monikko*-adjacent or refuse → then fi ships NO K-288 and the wave excludes it, substrate-honest) |
| 6 | G1-242 | Read and Color | `read-and-color` NEW | yes, **BW themes only** (`animals bw`, `fruits bw` cached; pull `vehicles bw`, `food bw`, `toys bw`, `farm bw` via `image-cache/pull-themes.js`) | RF.1.4 · G1 | picture grid of 6-8 BW nouns + numbered sentences "Color N {plural} {color}" + colour-word legend (`data/color-words.js` grows to 8 colours) | NEW `data/b2/sentences.js` per-locale FRAME BANK; frames must be grammatical using ONLY vocab forms (sing/plural/gender) + invariant colour devices (de "…blau an", fr "en bleu", es/pt "de azul", it "di blu", nl "blauw", sv/da/no plural-invariant adjective, fi partitive via the existing `nounForms` tables — extend); panels prove each frame on 5 nouns |
| 7 | G1-243 | Number of the Day | `number-of-the-day` NEW | no | K.NBT.A.1 / 1.NBT.B.2 · G1 (d1 to 20, d2 to 50, d3 to 100) | composite page: big numeral · number word (`lib/number-words.js` ×11) · tens/ones (`base-ten.js`) · two ten-frames (`ten-frame.js`) · tally (`tally.js`) · before/after · +10/−10 · odd/even · number line mark (`number-line.js`) · "draw it" box | Zahl des Tages / nombre du jour / número del día / getal van de dag / dagens tal / päivän luku; cell labels ×11 |
| 8 | G1-244 | Write the Word (dictée muette) | `write-the-word` NEW | yes | L.K.2.d / L.1.2.d · G1 | 8 pictures over blank rulings + word bank strip at top (d3: no word bank) | zero authoring beyond labels; fr title = *dictée muette*; de *Bild beschriften*; pt *escreva o nome das figuras* |
| 9 | G1-245 | Alphabetical Order | `alphabetical-order` NEW | yes | L.2.2.e · G1 (d1 first-letter distinct; d3 second-letter ties) | scattered picture+word cards, numbered answer boxes, alphabet strip on top (from `data/tracing/letter-sets.js`) + NEW `data/b2/collation.js` | **locale collation is the differentiator**: sv/fi å ä ö after z; da/no æ ø å after z; es ñ after n; de ä ö ü as base letter; verify() sorts with the locale table, never ASCII |
| 10 | G1-246 | Number Walls | `number-walls` NEW | no | 1.OA.C.6 / 1.OA.D.8 · G1 (d1 3-row ≤10, d2 3-row ≤20, d3 4-row ≤20 with base gaps) | NEW primitive `number-wall.js` (brick pyramid, dashed blanks) | Zahlenmauern / pyramides additives / pirámides numéricas / rekenpiramide / talpyramid / lukupyramidi |
| 11 | G1-247 | Doubles and Halves | `doubles-halves` NEW | yes (G1 icon groups) | 1.OA.C.6 · G1 | left: N icons → "double" box with mirrored clone group + numeral; right: 2N icons → "half" (d3 numeric only to 20) | Verdoppeln und Halbieren / doubles et moitiés / dobles y mitades / dubbelt och hälften |
| 12 | G1-248 | Where on the Number Line? | `number-lines` REUSE | no | 1.NBT.A.1 / 2.MD.B.6 · G1 | `number-line.js` with blank tick labels + arrows to unlabeled positions; d3 0-100 by 5s/10s | Zahlenstrahl beschriften / droite graduée / recta numérica / getallenlijn / tallinje / lukusuora |
| 13 | G1-249 | Unscramble the Sentence | `sentence-building` NEW | yes (one picture per sentence) | L.1.1.j · G1 | word tiles row (shuffled; first word keeps capital, last keeps period at d1; hidden at d3) + ruling under each; NEW tile component | frames from `data/b2/sentences.js` (same bank as #6/#14); panels choose SVO frames with ONE natural order; de V2 order is the teaching point |
| 14 | G2-274 | Fix the Sentence | `capitals-punctuation` NEW | yes | L.1.2.a/b / L.2.2.a · G2 | 6 sentences printed lowercase + unpunctuated, rewrite ruling; d3 adds ? and ! (es/pt render ¿ ¡) | de adds noun capitalisation (Nomen großschreiben) as its own d2/d3 rule; en adds "I" + names |
| 15 | G2-275 | Word Classes: Nouns, Verbs, Adjectives | `word-classes` NEW | yes (nouns get pictures) | L.1.1.b/e, L.2.1.e · G2 | three labelled bins (icons: picture / running figure / colour splash) + 12-15 word chips; reuse `sort-to-bins` layout | NEW `data/b2/word-classes.js`: nouns from vocab; ≥24 verbs + ≥24 adjectives authored per locale with the locale's school term (Nomen·Verben·Adjektive / nature des mots / sustantivo·verbo·adjetivo / navneord·udsagnsord·tillægsord / sanaluokat) |
| 16 | G2-276 | Shopping Math | `money` REUSE | yes (items with price tags) | 2.MD.C.8 · G2 | shelf of 4-6 theme items with price tags (`coins.js` currency + NEW `price-tag` component); tasks: total of two, pay-with → change, "can you buy…"; all sums in the locale's smallest natural unit (nt20 currency rulings in `data/money/currencies.js`) | NEW `data/b2/shop-frames.js` per locale (question frames); da "kr." with period, es "cts", fr "c", it "cent", pt "centavos" — never re-derive (nt20 rulings) |
| 17 | G2-277 | Read the Calendar | `calendar` NEW | no | readiness (de Klasse 1-2 Zeit, fr CP-CE1) · G2 | NEW primitive `calendar.js` (month grid; **weekStart Monday for all 10 non-en, Sunday for en**; day/month names lowercase where the language does) + 6 questions + theme sticker on 2-3 dates | NEW `data/b2/calendar.js` (day/month names ×11, weekStart, question frames) |
| 18 | G2-278 | Write About the Picture | `picture-writing` NEW | yes | W.1.3 / W.2.3 · G2 | one large picture + word bank of 6 labelled mini-pictures + locale-correct ruling (`schoolLines`), 2 sentence starters (d1 = draw + 1 line; d3 = 8 lines, no starters) | starters per locale (Schreibanlass / production d'écrit / escribe sobre la imagen / produção de texto) |
| 19 | G2-279 | Grid Coordinates: Color the Squares | `grid-coordinates` NEW | no | readiness (fr repérage sur quadrillage, de Koordinaten) · G2 | NEW primitive `coord-grid.js` (A-J × 1-10, code list "B3 = blue" using `codeColors`; d1 6×6 / d3 10×10) + NEW pixel figures (reuse `data/b2/pixel-figures.js`) | language-free; pixel art à imprimer / pixel art griglia / cuadrícula coordenadas |
| 20 | G3-370 | Multiplication and Division Word Problems | `word-problems` REUSE | yes | 3.OA.A.3 · G3 | reuse G1-213 layout + equal-groups picture support (rows of icons) + working box + answer sentence line | NEW `data/b2/wp-muldiv-frames.js`: per-locale `{name}{n1}{n2}{noun}` frames for mul (groups × per-group) and div (share / group); fi partitive tables reused/extended; ALL locales repeat {name} (nt20 gender rule) |

**Held for the backlog (ranked next):** Opposites (needs adjective-pair art), Hundreds-chart puzzles, Two-step word problems, Days-of-week/months (fold into `calendar` d1 later), Compound words (Germanic+fi only), Verb tenses, Picture-story sequencing (asset-blocked), Cursive (glyph-set blocked). Rejected: trace-the-shapes (saturated by pre-writing), multiplication-grid (saturated utility SERP), number-sequences + spot-the-difference (already covered: skip-count strips / K-061).

---

## Architecture (reuse first; every new piece named)

**Spec contract** (`scripts/worksheet-gen/types/<band>/<ID>-<slug>.js`): `{id, slug, gradeBand, assetClass, exerciseType, themeAxis, difficulty{1,2,3}, i18n:{en}, build({theme,difficulty,locale},{rng}) → {bodyHtml, meta}, verify(page) → []}`; ground truth stamped as `data-lcs-*`, re-derived in `verify`; answers never printed. Themed specs read `image-cache/resolve.js` (`labelSafeNouns`, `fileUri`, `labels`); locale data via `data/...` keyed `loc.slice(0,2)` with **refuse-don't-guess** throws. Types are auto-discovered (`lib/load-types.js`). Content elements MUST match `qa/lints.js CONTENT_SEL` (`.ws-card-stage`, `.ws-bin`, `.ws-trace-lane`, `[data-ws-content]`…) — every new full-page layout stamps `[data-ws-content]`. New hex colours go into `primitives/_tokens.js` (or `codeColors`) or lint #4 fails.

**New primitives** (`scripts/worksheet-gen/primitives/`): `dot-figure.js`, `number-wall.js`, `calendar.js`, `coord-grid.js`, `grid-copy.js`, plus components in `templates/components.js`: `wordTiles`, `priceTag`, `articleChips`, `rulingBlock` (thin wrappers over `schoolLines`). All pure SVG on the token palette.

**New data** (`scripts/worksheet-gen/data/b2/`): `dot-figures.js` + `dot-figure-names.js` (×11, GENERATED), `pixel-figures.js` + names (×11, GENERATED), `collation.js` (×11 hand-authored, verified), `calendar.js` (×11 GENERATED), `sentences.js` (×11 GENERATED — one bank feeding #6 #13 #14), `word-classes.js` (×11 GENERATED), `shop-frames.js` (×11 GENERATED), `wp-muldiv-frames.js` (×11 GENERATED), `articles.js` (×11 GENERATED, incl. the en a/an exceptions + the fi rebuild config), `number-of-day-labels.js` (×11 GENERATED). `data/color-words.js` grows from 4 to 8 colours ×11 (additive; K-241 keeps reading the first 4 — prove byte-identity).

**Frame-bank validator** (`scripts/worksheet-gen/tools/validate-b2-draft.js`): every frame contains exactly its required slots, no adjacent slots, no worksheet-word in titles, per-band title uniqueness against the locale's EXISTING `strings.<loc>.json`, fi frames carry a partitive `nounForms` table covering every wave theme's nouns, sentence frames render on 5 sample nouns without a double space / orphan article. Poison-tested (must FAIL on a broken frame, PASS on a correct fi frame — the nt20 "ban-too-wide" lesson).

**Locale apply tool** `tools/apply-b2-locale.js <locale|all> [--dry-run]` modelled on `tools/apply-lc-locale.js` (checks titles against existing strings) + the data-module writes of `apply-nt20-locale.js`. Draft file: `i18n/.draft-b2-<loc>.json` = `{locale, types{20:{title,instruction}}, families{17:{slug,name}}, skills{17:{full,short}}, topicMeta{17}, data:{dotFigureNames, pixelFigureNames, calendar, sentences, wordClasses, shopFrames, wpMulDivFrames, articles, numberOfDayLabels, colorWords8}}`. Writes: `strings.<loc>.json`, `skill-sentences.<loc>.json`, taxonomy `slug/name.<loc>` ×17 (with the per-locale cross-family slug-collision check), `frontend/messages/<loc>.json topicMeta` ×17, the GENERATED data modules. Then `i18n/lint-locale.js <loc>` must be 0 errors.

**Registration** (EN): `tools/register-b2-taxonomy.js` (clone of `register-nt20-taxonomy.js`: `apps.<key>` + `axes['exercise-type'].<key>.slug/name.en`; `default_subject` ∈ math/letters/logic/spatial-reasoning; `default_age_range` per band) and `tools/register-b2-en-content.js` (`skill-sentences.en.json` + `frontend/messages/en.json topicMeta`) — **run BEFORE the EN wave** (`emit/deck-html.js skillSentenceFor` returns `{}` silently for an unregistered family and the description can miss the 120-char floor). `node i18n/build-en.js` regenerates `strings.en.json` and throws on per-band title collisions; titles never contain "Worksheet".

**Waves**: `waves/wave-b2-<loc>.json` ×11 = `{id:'wave-b2-<loc>', seedEpoch:1, locales:[loc], themes:['animals','fruits','vehicles','toys'] (+ BW themes list for #6 via themeAxis.needsBw), themesPerType:1, difficulties:[2], types:[20 ids]}`. Deck id `wsg-wb2<loc>-<idlower>-<theme|nothm>-d2-<loc>`; slug `<famSlug>[-<themeSlug>]-<idlower>` (the landing composer's formula). fi wave drops K-288 if the fi panel refuses.

---

## Phases

### Phase 0 — Design studio (creativity is the operator's explicit ask)
- Launch **3 expert design agents in parallel** (`general-purpose`), each with the type table above, the token palette (`primitives/_tokens.js`), the page box (186×250 mm), three rendered nt20 exemplar PNGs (`render/one.js` K-243 / G1-213 / G2-253 → Read) and the house rules (Baloo 2 + Nunito, teal/coral/cream, dual-shadow card, whitespace, no clutter, B&W-safe signals). Split: agent A = #2 #3 #7 #10 #12 #17 #19 (apparatus pages), agent B = #1 #4 #5 #8 #9 #11 (picture-word pages), agent C = #6 #13 #14 #15 #16 #18 #20 (sentence/story pages). Each returns per type: layout sketch (ASCII + measurements), difficulty ladder d1/d2/d3, what the child DOES, answer-hiding rule, the `verify()` invariants, and 2 alternative layouts with a recommendation.
- A **4th agent = pedagogue critic** reviews the three studios' proposals against CCSS honesty + K-3 motor/reading load and flags anything that "touches" rather than "instantiates" the skill.
- I synthesize one design spec per type into `docs/worksheet-gen/b2-design-specs.md` (committed) — the brief every later panel is given (nt20 lesson: **brief panels from the generator/spec, not from prose**).

### Phase 1 — Primitives + EN data (byte-identity protected)
- Capture a build-hash baseline of 30 published nt20/lc coordinates BEFORE any shared edit (`tools/var-baseline.js` pattern); re-check after every base edit (`color-words.js` growth, `templates/components.js` additions, `_tokens.js` additions).
- Author the 5 primitives + 4 components; each gets a `scripts/worksheet-gen/qa/verify-<primitive>.js` with its own ground truth (dot figures: closed, no self-intersection, ≥ 22px spacing at page scale; number wall: every brick = sum of the two below, exactly one solution; calendar: Monday/Sunday start, 28-31 days, correct weekday alignment for the chosen (year, month); coord grid: code list ↔ cells bijective; grid-copy: figure fits, ≥40% fill) — poison-tested both directions.
- Author EN data: 16 dot figures, 12 pixel figures, collation table, EN frames/word lists (the EN source IS the locale nobody reviews — hand it to every locale panel as a source to AUDIT, nt20 lesson).

### Phase 2 — 20 specs + EN QA
- Write the 20 spec files (K-284…G3-370) with `verify()` per the design spec; `node i18n/build-en.js` (title-collision gate).
- Render sweep: `render/batch.js` jobs = 20 types × d1/d2/d3 × 2 themes (en) → 0 lints, 0 verify fails; `qa/contact-sheet.js` per type.
- **Visual critic** (agent, reads every PNG) against the 14-point rubric + the nt20 catches (pictureless problem under a pictures-promising instruction, brim-full/impossible states, duplicate items, overflow at long-noun themes) → fix → re-render.
- **I personally Read** at least one d2 PNG per type (20) + the two longest-text pages (G2-278, G3-370) at the wordiest theme.

### Phase 3 — EN registration + EN wave
- `node tools/register-b2-taxonomy.js` → `node tools/register-b2-en-content.js` → `node i18n/build-en.js` → `node i18n/lint-locale.js` (en has no lint; run `emit/deck-html.test.js` + `emit/manifest.test.js`).
- `node cli.js generate --wave waves/wave-b2-en.json --dry-run` (theme/taxonomy pre-flight) → real run → `_summary.txt failed: 0` → scan-desc-band over the staged ZIPs (120-170) → fix any short-title middles via `skill-sentences` (never move the gate).

### Phase 4 — Native rebuild ×10 locales (the long pole)
- Per locale, **one 3-agent native panel** (K-3 educator + native linguist/content creator + native SEO), briefed from `b2-design-specs.md` + the EN spec renders + the exact draft JSON schema; the panel **writes** `i18n/.draft-b2-<loc>.json` itself (proven cheaper than transcribing). Batch 3-4 locales at a time; resume-with-shortfall-list on validator failures. Order de→es→fr→pt→it→nl→sv→da→no→fi ([NSR-FLAG] sv/da/no/fi).
- Panel deliverables per locale: 20 `{title, instruction}` (titles = the locale's GENRE NAME, keyword-led, no worksheet-word), 17 family `{slug,name}` (ASCII-folded slugs; da ø→oe å→aa, no ø→o, sv/fi ä→a ö→o), 17 skill sentences (full 60-180 / short 15-90), 17 topicMeta (≥50 chars), all data banks (frames proven on 5 nouns; fi partitive tables for every wave theme noun of the sentence-bearing types; en/fi article rulings), 8 colour words, calendar names, and an **EN-source audit list** (defects found in the EN strings/frames — fold into EN before any other locale inherits them).
- `node tools/validate-b2-draft.js <loc>` → `node tools/apply-b2-locale.js <loc>` → `node i18n/lint-locale.js <loc>` = 0 errors (title collisions with legacy types only surface here — nt20 lesson) → probe renders `render/one.js` for the 6 text-heaviest types in de/fi/pt (overflow at long-noun themes; compact furniture rules from nt20).

### Phase 5 — Generate ×10
- `cli.js generate --wave waves/wave-b2-<loc>.json` per locale → 20/20 (19 for fi if K-288 refused) → desc-band scan → contact sheets → critic pass on the 3 wordiest locales → personal Read of de/fi/pt samples.

### Phase 6 — Publish (Hetzner, scoped recipe; NOT the 50-min full OG)
- `git pull` on Hetzner FIRST (taxonomy keys must exist or `deck-html.js` throws) · scp ZIPs to `/root/staging/wave-b2-<loc>/` · per locale `index.js publish-bulk <dir> --dry-run` (ok=20, collisions=0) → `--confirm` → collect slugs to `/root/staging/b2-slugs.txt` · `regenerate-og-images.js --slugs-file=/root/staging/b2-slugs.txt --locales=en,de,es,fr,pt,it,nl,sv,da,no,fi` (⚠ `=` syntax; default is en,es,pt) · `populate-and-inject-hreflang.js --confirm --locales=<all 11>` ONCE after all locales · `audit-deck-html.js --slugs-file= --locales=<all>` (bare slugs, else OOM) → 220/220 clean · live curl sample per locale (title keyword, canonical www, 200).

### Phase 7 — Landings (220) — the hub renders ONLY the landing tier
- Clone `scripts/seo-landing/gen-nt20-landings.js` → `gen-b2-landings.js` with its own `TYPES` table (family/theme/band/standard; K pages carry no standard; readiness types carry none) — check `LEVEL_KEYS` against the CORPUS (nt20 and lc disagree on it/sv keys) · panels ×11 write `scripts/worksheet-gen/i18n/.landing-b2-<loc>.json` (9 fields; ≥200-word bodies — demand ≥205 up front; meta 120-170 to satisfy BOTH composer and gate; title ≤75; p1 names the school level in prose where the locale can satisfy the slot-token lint) · `--dry-run` ×11 → apply ×11 · `gate.js <loc>.json` ×11 — **read BOTH sections** (§4.B lint + similarity; exit code is always 0) — 0 FAIL, 0 dup-titles; similarity vs the nearest nt20 siblings (word-tracing vs sight-words; write-the-word vs word-tracing; read-and-color vs color-by-code) fixed by mode-true pedagogy, never by moving the gauge · curl every canonicalDeckSlug 200 before commit.

### Phase 8 — Hub strip + deploy + repoint + robots map + verify
- Extend `scripts/seo-landing/gen-var-highlights.js` `BASES` with the 20 new base ids (empty `GROUPS` rows) → run → `frontend/config/worksheets-new-highlights.ts` regenerated (41 cards; strip reuses `worksheetsPage.newHeading`) → `npx tsc --noEmit`.
- Commit + push → `deploy.sh > log 2>&1; echo EXIT=$?` (renders static landings, rebuilds the hub; NEVER `| tail`) → `repoint-deck-canonical.js --types=<17 new + number-lines,money,word-problems> --locale=<each>` ×11 on Hetzner → `refresh-deck-noindex-exempt.sh` (robots map AFTER landings) → `indexnow-submit.js <220 landing URLs>` → live verify: `/en/worksheets` bare state lists all 20 new cards (origin + cache-busted edge), `verify-hub-autobind.js --locale=en --type=<fam>` LEAK=0 for 3 families, one repointed canonical spot-check per locale, `/<loc>/topic/<new-family-slug>` 200.

### Phase 9 — Closeout + the fan-out lever
- Memory: `memory/project_nt20b_worksheet_types.md` + MEMORY.md one-liner; CLAUDE.md §14.10 count note (47 → 64 family keys); plan-file closeout with the honest click note.
- **Fan-out lever (follow-up, click-data-gated like nt20-VAR):** themed types (#1 #4 #5 #6 #8 #9 #11 #13 #14 #15 #16 #18 #20) fan across 3-4 more themes each with ZERO new design (`themesPerType` waves); dot-to-dot / pixel / calendar fan by figure-set or month; this is the designed-in path from ~300-450 to ≥1000/day, run when Search Console names the winners.

---

## Critical files

| File | Change |
|---|---|
| `scripts/worksheet-gen/types/{k,g1,g2,g3}/K-284…G3-370-*.js` | 20 NEW specs |
| `scripts/worksheet-gen/primitives/{dot-figure,number-wall,calendar,coord-grid,grid-copy}.js` | NEW primitives (+ `_tokens.js` additive colours if needed) |
| `scripts/worksheet-gen/templates/components.js` | + `wordTiles`, `priceTag`, `articleChips`, `rulingBlock` (additive) |
| `scripts/worksheet-gen/data/b2/*.js` | NEW data modules (hand-authored EN + GENERATED ×11) |
| `scripts/worksheet-gen/data/color-words.js` | 4 → 8 colours ×11 (additive, byte-identity proven for K-241) |
| `scripts/worksheet-gen/tools/{register-b2-taxonomy,register-b2-en-content,validate-b2-draft,apply-b2-locale}.js` | NEW batch tools (clones of the nt20/lc tools) |
| `scripts/worksheet-gen/qa/verify-<primitive>.js` | NEW poison-tested gates |
| `scripts/worksheet-gen/waves/wave-b2-<loc>.json` | 11 NEW waves |
| `scripts/worksheet-gen/i18n/{strings,skill-sentences}.<loc>.json`, `frontend/config/topics-taxonomy.json`, `frontend/messages/<loc>.json` | GENERATED by the tools |
| `scripts/seo-landing/gen-b2-landings.js` | NEW composer clone; `frontend/content/seo-landing/<loc>.json` +20 ×11 |
| `scripts/seo-landing/gen-var-highlights.js` → `frontend/config/worksheets-new-highlights.ts` | +20 BASES |
| `docs/worksheet-gen/b2-design-specs.md` | the synthesized design brief |

**Reused, not rewritten:** `trace-path.js` lanes, `number-line.js`, `ten-frame.js`, `tally.js`, `base-ten.js`, `coins.js`, `sym-grid.js` idea, `sort-to-bins.js` layout, G1-213 word-problem layout + frames contract, `lib/number-words.js`, `data/tracing/letter-sets.js`, `data/money/currencies.js` rulings, `image-cache/resolve.js`, `render/one.js` + `render/batch.js` + `qa/contact-sheet.js`, `cli.js`, publish-cli scoped recipe, `gate.js`, `repoint-deck-canonical.js`, `refresh-deck-noindex-exempt.sh`.

---

## Verification (end-to-end DoD)
1. Every primitive gate + the draft validator **poison-tested in both directions** before trusting them.
2. 20 types × 3 difficulties × 2 themes render with 0 lints / 0 verify fails in EN; contact sheets + visual critic + personal Read (20 pages + the 2 wordiest).
3. Byte-identity: the 30-coordinate baseline unchanged after every shared edit.
4. `build-en.js` clean; `lint-locale.js` 0 errors ×10; probe renders de/fi/pt clean.
5. Generation 220 (or 219 if fi refuses K-288) with `failed: 0`; desc band 120-170 ×220.
6. Publish dry-run ok=20 / collisions=0 ×11; `audit-deck-html` 220/220; hreflang groups include all 11 (10 for a refused fi type); live curls.
7. Landings: composer refuses on any floor; `gate.js` 0 FAIL / 0 dup-titles ×11 (both sections read); all 220 canonicalDeckSlugs 200.
8. Hub: bare `/<loc>/worksheets` page 1 contains all 20 new landing links ×11 (origin + edge); `verify-hub-autobind` LEAK=0; robots map refreshed after landings; deploy EXIT=0.
9. Closeout states the measured page count and the panel click estimate honestly, with the fan-out lever named as the path to 1000+/day.
