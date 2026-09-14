# K-324 `picture-word-cards` — the FIVE variation faces (build record, 2026-09-14)

Built from `K-324-picture-word-cards.md` §3 (+ §1/§4/§5) under `_FACE-BRIEF.md`, on the base of `_work/K-324-build.md`. Nothing shared was edited; nothing committed. Ids are the allocation's: **K-347 · K-348 · K-349 · K-350 · G1-324**. Every face keeps the base's cut sheet (strip 30 + 674 × 692 = 722, the overlay cut lines, the 12 px cut margin, white borderless cards) and changes what the child DOES with the cards.

## Files
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/picture-word-cards.js` | NEW — 4 rows (K-347 / K-348 / K-349 / G1-324) + 1 HANDWRITTEN (K-350); read by `gen-b3var-specs.js` |
| `scripts/worksheet-gen/types/k/K-347-…-twin-set.js` · `K-348-…-article-cards.js` · `K-349-…-one-and-many.js` · `types/g1/G1-324-…-syllable-cards.js` | emitted by `node tools/gen-b3var-specs.js` (spread base d3 / d2 + the `kind` knob; G1-324 carries `gradeBand:'G1'` via `extra`) |
| `scripts/worksheet-gen/types/k/K-350-picture-word-cards-bilingual-cards.js` | HANDWRITTEN (base K-324): its own `unitAxis` over the bank's `partnerNames` (function values a row cannot carry) |
| `scripts/worksheet-gen/types/k/K-324-picture-word-cards.js` | additive `kind` ∈ `article · plural · bilingual · syllable` dispatched by `_buildWith` (`_articlePool/_buildArticle`, `_pluralPool/_buildPlural`, `_partnerFor/_partnerLabel/_bilingualPool/_buildBilingual`, `_syllablePool/_buildSyllable`), `build()` passes `unit` through, `plateFor` gains the plural / bilingual / syllable branches, `labelForForm` generalises the case rule, `verify()` gains one branch per kind (case rule on `data-lcs-base` where a label carries an article). The word/twin path is untouched — baseline PASS below |
| `scripts/worksheet-gen/templates/components-b3/picture-word-cards.js` | `cutCard`/`wordCard` gain `gap` (default 6 = the base); NEW `articleCard`, `legendDots`, `cloneRow`, `pluralPair`, `bilingualLabel`, `bilingualCard`, `syllableCard` (G1-305's `syllableWord` + `syllableArcsForWord` required from the sibling file — the namespace would be circular). 129 exports in the namespace, no collision |
| `scripts/worksheet-gen/data/b3/picture-word-cards.js` | EN bank: `bilingual.hostName:'English'` (the legend prints `hostName · partner`) + `syllable.exclude:['seagull']` (see open items); the face strings were already there, keyed by mode |
| `scripts/worksheet-gen/qa/verify-b3-picture-word-cards.js` | the gate grows: bank rules (hostName, syllable.exclude ∈ approved), five face renders + the worst legal chrome each, a unit-de bilingual render, a fi hyphen render, node re-derivations per kind, en pools per face, the 11-locale refusal census, face seed sweeps, poisons P6 · P7 · P8 · P9 · P19 · P20 (+ their controls) |
| `docs/worksheet-gen/b3-designs/_work/K-324-faces.md` | this record |

## The five faces

### K-347 — Picture Cards and Word Cards: Matching Pairs — **PARAM** (`{...base.difficulty[3]}`)
- **knob:** row `srcLevel 3`, overrides `{}` → `{kind:'twin', cards:8, cols:4, rows:4, pad:10, pic:120, cap:13, lineCap:13, maxLines:2, tiers:[[8,26],[10,22],[12,20],[13,18]]}`; differs from the published d2 on `kind`, `cols`, `rows`, `pic`, `pad`, `cap`.
- **child does:** cuts sixteen identical 44 × 46 mm cards — rows 1-2 pictures, rows 3-4 DERANGED words — and lays each word beside its picture, or plays Memory (a face-down picture card and word card are indistinguishable). A different routine from naming the base cards.
- **gate:** the base's twin path (picture multiset === word multiset, word slot i ≠ picture slot i, the tier rule per word, 20-seed never-identity sweep — P2 / P12 / P17 already own it); `gate-variation-distinct` poison-tested: the same row on `srcLevel 2` FAILS (`K-347 resolves to the SAME config as its base K-324 at d2`).
- **PNG:** `scripts/worksheet-gen/out/dev/K-347-animals-d2-en.png` (horse · rabbit · duck · seagull · dog · sheep · penguin · dolphin over dolphin · dog · rabbit · penguin · sheep · horse · duck · seagull). Gate: `K-347-gate-animals-d2-en.png`, `K-347-gate-d2-en-longchrome.png`.
- **deviation:** none. (The base's d3 is this face — §2 lists it as the base's own ladder; the b3 waves ship d2 only, so the twin is never the published base deck.)

### K-348 — A or An: Word Cards with the Article — **CODE** `kind:'article'`
- **knob:** `{...base.difficulty[2], kind:'article', cap:18}` → cap 18 glyphs on ONE line at 26 (chip + space + noun; 18 × 14.38 = 259 ≤ 271 beside a 16 + 6 dot), else two lines at 24 over an 84 picture (the base's `pic2`).
- **child does:** says each noun WITH its article, as printed. The article is a LITERAL from `ARTICLES[loc].chips[keyFor(e)]` (K-288's selection verbatim: `countable`, `refuseKeys`, `keyFor` null = refused; `chipsD3` at the bank's `articleStyle.level:3`); join rule `chip.endsWith("'") ? chip + word : chip + ' ' + word`; colour dot + strip legend ONLY when the bank declares `articleStyle.dots` (de blau / rot / grün rendered, every other locale `dots:null` until its panel rules); the article word stays `T.ink`.
- **stamps:** sheet `data-lcs-sheet="article" data-lcs-level data-lcs-dots`; card `data-lcs-chip` + `data-lcs-base` beside `data-lcs-word` (the joined label); plate `[data-lcs-dot]`; strip `[data-lcs-legend]` with `[data-lcs-legend-dot]` × chips.
- **gate:** verify() — label === chip + base under the join rule, an elided chip never followed by a space, dot iff dots, legend iff dots, the case rule on the BASE noun; the node gate re-derives from the vocab: chip === `chips[keyFor(e)]`, dot === `dots[key]`, legend dots === `dots`, no `refuseKeys` noun. Renders: en animals, de animals (dots + legend, `K-348-gate-P6-control-de.png` — der Specht · der Leguan · die Ente · der Fisch · die Eule · das Schaf · das Schwein · der Delfin), fr animals with `elision:'print'` (`K-348-gate-P19-control-fr.png` — l'orang-outan · l'âne · le poisson …). Poisons **P6** (de card 1 chip swapped, stamp + text agreeing → only the vocab re-derivation sees it: `card 1: chip die ≠ der (…)`), **P19** (`l' arbre` with a space → verify `elided article "l'" printed with a space`), **P20** (sv `blocks` forced onto a card → `blocks is a refused key for sv`; pool half: the sv toys pool drops blocks / lego / domino / crayons / chess while the en toys pool keeps domino).
- **PNG:** `scripts/worksheet-gen/out/dev/K-348-animals-d2-en.png` (an iguana · a woodpecker · a panda · a tiger · a swan · a zebra · a dolphin · a hippopotamus).
- **deviations:** (a) **fr `elision:'print'` elides VOWEL-initial nouns only** — the first print render put **"l'hibou"** on a card (h aspiré: *le hibou*); h aspiré / h muet and y (*le yaourt*) are undecidable from the vocab, so under `print` those stay refused and only `/^[aeiouéèêàâîïôûù]/` takes `l'` (the design said "elision nouns" without the h split; the K-288 fr panel had already accepted losing the h words). (b) No gender-mix floor (K-288's) — a card SET is not a choice; sv animals with one ett-noun is a legitimate set. (c) The legend renders the bank's authored literal split at ` · ` with a 12 px dot before each segment (the design's "Nunito 700 16 + three 12 px dots"); the bank's `legend` must therefore have exactly `chips.length` segments (a build refusal otherwise).

### K-349 — One and Many: Singular and Plural Cards — **CODE** `kind:'plural'`
- **knob:** `{...base.difficulty[2], kind:'plural', cards:4, pic:80, clones:3}` (4 entries → 8 cards; `cols × rows === cards × 2`).
- **child does:** each ROW = one picture + the singular beside THREE pictures + the plural, EQUAL 80 px pictures, no numeral — the only difference is number (the NUMBER routine, fi yksikkö / monikko). Pool = `countable(e)` under the bank's case rule on BOTH forms (`labelForForm`), distinct on singular AND plural, both labels under the base label rule (two-line labels stay at 24 over the 80 picture: 80 + 6 + 58 = 144).
- **stamps:** sheet `data-lcs-sheet="plural" data-lcs-clones=3`; card `data-lcs-role="one"|"many"`, the many-card's `[data-lcs-clones]` row of 3 same-src imgs each stamped `data-lcs-pic`.
- **gate:** verify() — roles alternate one/many, the many-card carries its one-card's vocab, one img / `clones` imgs of ONE src, plates present; the node gate re-derives singular/plural from the vocab (`labelForForm(e.plural)`), 4 + 12 pictures in total. Poison **P7** (a many-card with two clones → `card 2: 2 pictures ≠ 3`).
- **PNG:** `scripts/worksheet-gen/out/dev/K-349-animals-d2-en.png` (penguin/penguins · koala/koalas · raccoon/raccoons · horse/horses).
- **deviation:** the three clones are `cloneRow` (this file), not `components.js iconRows` — iconRows' imgs carry no `data-lcs-pic` stamp and verify() requires it on every card picture; the rotation-warmth idiom is the same.

### K-350 — Bilingual Picture Cards: English and {U} — **HANDWRITTEN** (CODE knob `kind:'bilingual'` + its own `unitAxis`)
- **knob:** `{...base.difficulty[2], kind:'bilingual', pic:84, hostPx:26, partnerPx:20, partnerCap:26, gap:4}` (84 + 4 + 60 = 148 ≤ 149 — `cutCard` gained the `gap` param for it). `unitAxis.units(loc)` = the bank's `partnerNames` keys (10), `exemplar` = `bank.bilingual.partnerExemplar` (`es` in en), `tokens → {U: partnerNames[unit], L: the same, UNIT: code}` (a language NAME keeps its authored case: "Spanish" / "Englisch" / "englanti").
- **child does:** says the word in the host language, then in the partner's (L2 with L1 support). Plate = host Baloo 2 700 26 / 30 `T.ink` over partner Nunito 700 20 / 24 `T.teal`; legend `hostName · partnerName` in the strip. Partner label = `vocab[key][unit][0]` under the PARTNER locale's case rule (de keeps its noun capital: `Nilpferd`, `Waschbär`). Host one line (≤ 20 glyphs), partner ≤ 26 glyphs one line — else the entry is refused.
- **stamps:** sheet `data-lcs-partner=<unit>`; card `data-lcs-partner-word`; the partner line `[data-lcs-partner-line]` (never `data-lcs-line`, so the base plate rule reads the host word unchanged); legend `[data-lcs-legend-host]` / `[data-lcs-legend-partner]`.
- **gate:** verify() — partner line === stamp, in Nunito, no overflow, host on one line, partner ≠ host locale; the node gate re-derives the partner from `vocab[key][unit]`; unit renders: es (exemplar) + **de** (`K-350-gate-animals-d2-en-ude.png`, legend "English · German", every partner noun capitalised, title resolved to "English and German"); a host-language partner and an unknown partner REFUSE. Poison **P8** (the partner line printed in the host language → `partner "…" ≠ vocab es "…"`).
- **PNG:** `scripts/worksheet-gen/out/dev/K-350-animals-d2-en.png` (hippopotamus/hipopótamo · iguana/iguana · donkey/burro · horse/caballo · koala/koala · fox/zorro · orangutan/orangután · sheep/oveja).
- **deviations:** (a) `bilingual.hostName` added to the bank (§5's shape had no host name; the legend needs it — bank rule 3 now requires it; the shaped fi/de blocks in the base's P4/P5 poisons gained it). (b) The partner line follows the family's case rule (`gender` null → lower) rather than a bare `displayWord`, so a de partner ADJECTIVE would print lower like the host side; the design's `displayWord(vocab[key][unit][0], unit)` is the noun case and is what renders. (c) The spec title carries `{U}`; the bank's `strings.bilingual.title` is the exemplar-resolved literal ("English and Spanish") — the gate asserts equality after `resolveUnitTokens`. (d) A shared word (iguana / iguana, koala / koala) is NOT refused — the child sees that the word is the same in both languages; a panel may add such keys to `exclude` if it wants only contrasting pairs.

### G1-324 — Syllable Cards: Read the Word in Parts — **CODE** `kind:'syllable'` (id band G1)
- **knob:** `{...base.difficulty[2], kind:'syllable', pic:72, hyphenPic:96, cell:28, fontPx:26, arcH:26, pool:'tex', minCount:2, maxCount:4, maxLetters:10}` + `gradeBand:'G1'`.
- **child does:** reads each word part by part from the PRINTED split — arc locales: picture 72 + 4 + `syllableWord` letter cells (28, Baloo 2 26; de keeps the capital in cell 1) + 2 + printed `syllableArcsForWord` (26) = 144; hyphen locales (fi `mark:'hyphen'`): picture 96 + 6 + a 26 px plate `ka-me-li`. Pool (G1-305's order): `entriesFor` → case rule → letters only → approved by vocabKey with word === display word and split joined === word → count 2..4, ≤ 10 letters → `'TeX'` in `sources_agreed` (README texPool rule) → da strict → `syllable.exclude`.
- **stamps:** sheet `data-lcs-mark data-lcs-pool`; card `data-lcs-split="dol|phin" data-lcs-count data-lcs-mark`; the cells `[data-lcs-prim="syllable-word"]` / arcs `[data-lcs-arcs]`.
- **gate:** verify() — split joins to the word, count === parts ≥ 2, letter cells === the word, cells === letters, arcs === count and `printed`, **each arc's path spans exactly its syllable's cells** (`M x+4,3 … x+w−4,3` re-derived from the split × cell), the stack inside the inner cell; hyphen: plate text === the split; the node gate re-derives from the approved words: TeX-agreed, split === approved split, count in range, ≤ 10 letters, da strict, not excluded. Renders: en animals (arc), fi animals (hyphen, `G1-324-gate-animals-d2-fi-hyphen.png` — ping-vii-ni · an-ti-loop-pi · ka-me-li · lam-mas · le-pak-ko · koi-ra · ket-tu · kis-sa). Poison **P9** (en `acorn`, a rule-only `ac-orn` TeX disagrees with: the texPool filter drops it from `miscellaneous` (full 7 → tex 2) and, forced onto a rendered card, the gate names it `acorn is not TeX-agreed (ac-orn)`).
- **PNG:** `scripts/worksheet-gen/out/dev/G1-324-animals-d2-en.png` (dol-phin · rab-bit · vul-ture · rein-deer · don-key · pen-guin · pan-da · rac-coon).
- **deviations:** (a) `syllable.exclude:['seagull']` in the en bank — approved-words-en.json carries **seag-ull with TeX in `sources_agreed`**, a wrong boundary the texPool rule cannot see (sea-gull, a compound); refused, never filled — which leaves the en `animals` pool at EXACTLY 8 (every seed draws the same eight words; the sweep reports it). (b) `mark:'colour'` (a §3 rejected non-move) is not built: the spec REFUSES it. (c) The K floor in verify() stays 56 (the pictures are 72 / 96); the spec's own floor check reads `tokens.density.G1` (44) through `gradeBand`.

## Gate / distinctness / baseline (final lines)
```
node qa/verify-b3-picture-word-cards.js --quick
  bank en · pools 50/50 · base d1/d2/d3 + dinosaurs + long chrome + four-line backstop (unchanged)
  render K-347 twin · K-348 article · K-349 plural · K-350 bilingual · G1-324 syllable, each d2 animals + long chrome (body 733, block bottom 916 vs footer 921): verify 0 lints 0
  render K-350 unit de · G1-324 fi hyphen · K-348 de (dots + legend) · K-348 fr (elision print): verify 0 lints 0
  pools en: twin 50/50 · article 47/50 (colors 3, emotions 0, tree 6) · plural 48/50 (colors, emotions) · bilingual 50/50 · syllable 13/50 (animals 8)
  census × 11 (bank-shaped blocks; the pinned theme ≥ 8 on every face, fi article REFUSED)
  poison: P1 … P18 (the base's 14) · P6 · P7 · P8 · P9 pool/render · P19 · P20 pool/render — all KILLED
PASS (1335 assertions, 20/20 poisons killed, --quick: sweeps skipped)
full run (sweeps): sweep d2 20 distinct word sets, d3 0/20 identity slots · K-347 / K-348 / K-349 / K-350 10 distinct entry sets over 10 seeds · G1-324 1 (the en animals texPool is exactly the card count)
PASS (1427 assertions, 20/20 poisons killed)

node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=picture-word-cards
[b3:picture-word-cards] compared 15 pairs over 5 faces against their bases + pairwise within family
every variation differs from the deck its base publishes and from its siblings
(poison: the K-347 row on srcLevel 2 → "K-347 resolves to the SAME config as its base K-324 at d2" — FAIL, then restored)

node tools/b3-baseline.js --check --quick
checked build 3068 + enum 211 in 17s: 0 drifted (0 expected), 0 missing
PASS

node i18n/build-en.js → build-en: 538 types -> strings.en.json (title lint clean)   (then git checkout -- i18n/strings.en.json)
```

## Renders read (every PNG opened)
`out/dev/K-347-animals-d2-en.png` · `K-348-animals-d2-en.png` · `K-349-animals-d2-en.png` · `K-350-animals-d2-en.png` · `G1-324-animals-d2-en.png` · the gate's `K-348-gate-P6-control-de.png` (blue / red / green dots before der / die / das, the legend right-aligned in the strip, nouns capitalised, article in ink) · `K-348-gate-P19-control-fr.png` (l'orang-outan, l'âne — after the h-aspiré fix; the pre-fix render carried "l'hibou") · `G1-324-gate-animals-d2-fi-hyphen.png` (96 px pictures, hyphenated plates) · `K-350-gate-animals-d2-en-ude.png` (English · German, capitalised partner nouns). Nothing clipped, nothing under the footer (block bottom 916 vs the band at 921 under the three-line fi title), floors hold (pictures 120 / 104 / 80 / 84 / 72 / 96, dots 16, legend dots 12, partner 20 px), each face does what its title says. Pictures opened on `animals`: all correct for their words (the iguana reads as a lizard, the moose has antlers — the base record's notes hold).

## Per-locale refusals already visible from the bank shape (Phase 4 `hub-expectations.json`)
Measured with `poolSize()` over bank-SHAPED blocks (the en block with each locale's articleStyle / syllable shape; the panels' `exclude` lists will only lower these):
- **fi F3 (K-348): REFUSED** — `articleStyle.enabled:false` (no articles); the spec throws `article cards REFUSED for fi`. → 5 rows in fi (the README's 65 stands).
- **colors + emotions**: below 8 on F3 and F4 in every locale (countable 0-5) — theme refusals, never a type refusal.
- **F3 themes below 8 (bank-shaped, elision refused):** en tree 6 · de 4th of July 7, post office 6, reptiles 7 · fr post office 6, reptiles 7, tools 6, tree 7, weather 7 · it activities 7, bakery 6, desserts 6, post office 7, reptiles 6 · sv activities 7, miscellaneous 7, post office 5, thanksgiving 7, tree 6 · da thanksgiving 6 · no post office 7, thanksgiving 7. (The design's fr "post office 7 / reptiles 7 / tools 7" measure 6 / 7 / 6.) The pinned `animals` is ≥ 29 everywhere.
- **F6 themes ≥ 8 (texPool, count 2-4, ≤ 10 letters):** en 13 · de 42 · es 42 · pt 42 · fr 23 · it 43 · nl 36 · sv 35 · **da 15** (strict pool) · no 32 · fi 42 (hyphen). `animals` holds 8 in en (after seagull) and 9 in da — the two thin locales; every other locale ≥ 12. A wave that pins another theme for F6 in en or da must check this table first.
- **F2 / F5:** every (theme, locale) ≥ 8 (twin 50/50, bilingual 50/50 with the exemplar partner in all 11).

## Open items (panels / build session)
1. **`seagull` in approved-words-en.json is TeX-agreed as `seag-ull`** — a wrong boundary inside the texPool (the README item-6 class in the other direction: TeX agreed and is wrong). Excluded via the bank; the pipeline should be told. Every other en animals split printed correctly; the panels still open every picture + read every split on their pinned theme.
2. **fr h aspiré:** `elision:'print'` never elides h- or y-initial nouns (hibou, hamster, yaourt stay refused). If the fr panel wants *le hibou* / *l'hôtel* printed, that needs a per-word aspiré table (data), not a rule.
3. **Bilingual partner names + hostName ×11** are panel data (`hostName` is NEW in the bank shape — the apply tool / validator rule 3 must require it). The wave ships the exemplar partner only (`en` in the 10 non-en locales, `es` in en); the `{U}` title fans only in en today.
4. **F5 shared words** (koala / koala): kept; a panel may `exclude` them per locale.
5. **de `articleStyle.dots`** renders exactly as the design (blau / rot / grün + legend); every other locale ships `dots:null` until its panel declares a school convention.
6. **F6 in en / da is thin** (13 / 15 themes ≥ 8; `animals` at the floor) — pin `animals` (the design's ruling) and do not fan F6 over other themes in those two locales without re-measuring.
7. **`mark:'colour'`** stays unbuilt (refused by the spec) — a §3 rejected non-move.
8. The G1 landing level for G1-324 per locale (`grade-1` / `1-klasse` / …) and `mode:'bilingual-<partner>'` in the F5 coordinate are Phase 4 (landing JSON) matters, not spec fields.
