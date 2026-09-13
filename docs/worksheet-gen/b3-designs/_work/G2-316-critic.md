# G2-316 `compound-words` : editor-critic record (2026-09-13)

Inputs: `_work/G2-316-pedagogy.md` + `_work/G2-316-design.md`. Output: `G2-316-compound-words.md` (7 sections, sibling order). Verification: every file / primitive / class / option in the final was read in the repo this session (`page/page.css:16-26, 401`; `templates/components-b2.js:26/58/210/226/243/273`; `templates/components.js:130`; `templates/layouts/card-grid.js`; `primitives/trace-path.js:681`; `primitives/_tokens.js:70`; `lib/b2-common.js:15-69`; `image-cache/resolve.js:62`; `qa/lints.js:32`; `enumerate.js:20-24, 85, 136`; `render/render-instance.js:22`; `tools/gate-variation-distinct.js:31-36`; `tools/register-b2-taxonomy.js:15-42`; `types/g1/G1-249-unscramble-sentence.js`; `scripts/seo-landing/gen-b2var-landings.js:112-124`; `frontend/lib/seo/strand-names.ts:191-213`; `frontend/content/seo-landing/en.json` letter-tracing coordinate). Measurement scripts (scratchpad, read-only): `g2316-measure.js` (both-pictured pairs, links, exact disjoint maximum, ambiguity), `g2316-hubs.js` (one-part hub candidates, F3 cross-product hits), plus a one-liner for the Romance pictured derivations.

## 1 Contradictions and resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | Romance BASE = rows `[pic] + [chip] = [lane]` | Romance base = `familyTree` (root word + 4 affix lanes) | **rows in all 11**; the tree survives only as F5's `webBlock` | one apparatus, three shapes (G1-306 precedent); a tree base would make F5 the base again and halve root breadth per page |
| 2 | F5 = word web, hub PICTURE + 4 partner pictures | (g) word star, hub picture + partner pics + ghost root; ships `lanes:3` or refused | **merged into ONE F5**: hub picture + hub WORD printed; satellites cued by the COMPOUND's own picture + a ghost hub; one-part pool | measured: both-pictured hubs of >= 4 exist only in de/nl/fi (Blume 4, bloem 4, pallo 4), so a partner-pictured web fails the floor everywhere; the one-part pool (whole pictured) reaches fish 6 / Fisch 6 / vis 6 / fisk 6 / kala 6 / pallo 6, da b-side 3 (the design's own numbers) |
| 3 | fan = `setAxis` + `setOverrides` | `setAxis` implicitly / `variantsPerType` | **`unitAxis`** (README cross-type ruling), sets = units | ONE fan mechanism for every non-theme axis |
| 4 | one-part-pictured counts en 40 · de 45 · nl 40 · sv 35 · da 33 · no 35 · fi 50 (*est.*) | not measured | **removed** as unverified: the remainder of a one-part hit cannot be proven a word without a dictionary; the file states the hub upper bounds instead | brief: "UNKNOWN, engineer must measure" beats an estimate |
| 5 | F1 Romance = "the vowel that drops" (`zapat|o` box `-ero`; `gat|o` box `-inho`) | (b) Romance = suffix box 90 + affix legend | **F1 refused it/pt; es/fr default refused, liftable with >= 3 INSERTED literals** (`pan|ad|ero`, `jardin|i|er`) | a dropped vowel cannot be "written in a box" (the same reason fi gradation is OPEN); a suffix box with a legend = the base's chip with extra steps (rule 4 scaffold delta) |
| 6 | F2 d2 = cells + seam drawn + two boxes for the parts | (c) cells + cut rail only; d3 two rulings | **design's d2** (cut only); the two part rulings = d3 | measured: 56 + 12 + 14 x 32 = 516 of 643 leaves no room for two lanes in a 64-high row; writing both parts is the d3 delta |
| 7 | F4 = 12 chips 3x4 with pictures, 6 + 6 real look-alike foils | (e) `wordBank` 10 + 6 two-part lanes, 4 non-decomposable `nonCompounds` | **12-word `wordBank` withIcons + 6 two-part lanes; foils = pictured look-alikes that decompose into no two pictured parts** | pedagogy's foil class is the teaching move (a look-alike, not a nonsense word); design's machine check is the gate; reuse the component |
| 8 | F3 cross-product rule (5) `crossOk` | `alsoValid` list | **`crossWords`** = panel-declared real cross compounds NOT in the pictured pool; the gate rejects a page forming any pool whole OR `crossWords` entry | one name; measured hits prove the gate necessary (see §3) |
| 9 | pool numbers nl 22 · sv 21 · da 27 · no 21 · fi 24 | nl 25 · sv 23 · da 30 · no 25 · fi 23 | **re-measured, see §3** (nl 24/23 · sv 21 · da 28/27 · no 22/21 · fi 23/22) | one stated rule, false hits struck |
| 10 | Romance F5 = the tree (`flor -> florero florista floral florecer`) | (h) Big or Small size rows for pt/es/it; fr may refuse | **size rows for it/pt/es (`sizePairs`), fr default refused**; the es/fr "tree" is REJECTED as a face | a root + affix-chip tree is the base's act in another layout (rule 2/4); pictured derivations (es 6, fr 4 total) cannot cue 2 x 4 satellites; SEP 2º / EF02LP / Indicazioni all carry aumentativo-diminutivo |
| 11 | `data/b3/compounds.js` | `data/b3/compound-words.js` | **`compound-words.js`** (key = file, sibling convention) | naming |
| 12 | stamps `data-lcs-a/-link/-b/-whole/-shape/-set` | `data-lcs-a/-b/-link/-word/-cut/-face` | union: `-a -b -link -whole -cut -face -set` | `cut` is needed by F2 verify; `whole` names the field |
| 13 | F1 layout = 8 `.ws-lane` rows `[Sonne][box][blume][pic][ruling]` | (b) 2x4 cards, tiles line + lane below | **cards** | a 9 + 8-letter tile pair + box + picture + a 410 lane does not fit one 643 row; the card stack is measured (116 <= 151) |

## 2 Claims removed as unverified or wrong

- Pedagogy: "F1 ships de nl da no from the draft" : no has 2 linked both-pictured items (`vask|e|bjørn`, `ost|e|kake`; the design's `sel|e|bukse` is a false hit, `levering|s` is not a compound), below the >= 3 floor -> no is conditional.
- Pedagogy: fi "genitive both-pictured 1 (`auringo|n|kukka`)" : under the strict rule 0 (`auringo` is a stem, not a pictured word); carried as `aStem` set B only.
- Design: da `flag|er|mus`, no `flagg|er|mus` are not Fuge analyses (`flager-` is a fossil); struck; the linked counts drop to da 4, no 2 (= the pedagogy's numbers).
- Design: `sel|e|bukse` (no) struck (`sel` = the seal); `blauw|e|regen` (nl) excluded by data (inflected adjective, not a linking morpheme).
- Design: "lane capacity ≈ 19 letters" and "wordBank 3 rows ≈ 290" kept but marked *est.* (no font metrics in `build()`).
- Design: `.ws-lane` "padding 8 14 -> inner 643x64" : page.css default is `padding:12px 16px`; the design's inline override is stated explicitly in the final.
- Pedagogy: `default_age_range: 7-9` kept; pedagogy's "F0 set A ships x7" kept; pedagogy's "F3 from 15 disjoint" (en) kept (m 15).
- Pedagogy `strand-names.ts` claim "measured present" for six locales: confirmed (`:191-198`) plus sv `Ord och begrepp` (`:213`); da / no / fi were NOT read in that row -> OPEN 8, not claimed.
- Both files: `letter-tracing` landing precedent `{mode:null, theme:''}` confirmed; the base coordinate therefore carries `mode:null` (the pedagogy's `mode:'base'` corrected).

## 3 Numbers re-measured (rule in the final's preamble)

| loc | both-pictured | linked (link != '') | disjoint max (exact) | maxLen | notes |
|---|---|---|---|---|---|
| en | 20 | 0 | 15 | 10 | opaque `bluebell buttercup cornflower`; both files agreed |
| de | 25 | 5 (`Kleid|er|schrank Glocke|n|blume Löwe|n|zahn Sonne|n|blume Blume|n|kohl`) | 15 | 14 | Fugen-s both-pictured 0 (pedagogy confirmed) |
| nl | 24 (23) | 5 (4) | 16 | 14 | `blauw|e|regen` excluded; `jacht|luipaard neushoorn|vogel ijs|lolly tand|pasta` are the items the pedagogy's 22 missed |
| sv | 21 | 0 | 14 | 11 | pedagogy 21 wins; design 23 carried `fotografering blåsfisk` |
| da | 28 (27) | 5 (4) | 21 (20) | 13 | `flag|er|mus` struck; `skovsnegl` ambiguous parse (`skov|snegl` / `skov|s|negl`), bank pins one |
| no | 22 (21) | 3 (2) | 17 (16) | 11 | `flagg|er|mus` struck |
| fi | 23 (22) | 0 | 16 | 15 | `varvassandaalit` 15 > cap 14 |
| es / fr / it / pt | 0 / 1 / 0 / 0 | | | | compound shape refused; `portefeuille` alone |

Disjoint maxima equal the pedagogy's (15 · 15 · 16 · 14 · 20 · 16 · 16) after the struck items. Hub candidates (one-part upper bound) reproduce the pedagogy's headline numbers (en fish 6; de Fisch 6 Blume 5; nl vis 6 bloem 6; sv fisk 6; da b-side hubs of 3, a-side `regn 5 vand 5 sol 4`; no fisk 5 bukse 4 fugl 4; fi kala 6 pallo 6) with false members the panel strikes (nl `ster` <- `hamster badmeester`, da `and` <- `strand`). F3 cross-product hits inside the both-pictured pools: nl `ijs+vogel`, da `pande+kage pande+bånd vand+ring`, no `panne+kake panne+bånd`, fi `maa+pallo`, sv `blå+s+fisk`; en/de none. Romance pictured derivations: es 6 (`florero florista panadero jardinero cocinero librero`), fr 4 (+ `boulanger`, wrong family), it 0, pt 1 (`patinho`) + foils `galinha cozinha`.

## 4 OPEN items

**Engineer**
1. Lane capacity is an estimate (≈ 21 px/glyph at glyphH 28): render a 14-letter de compound written by a wide G2 hand before trusting `maxLetters:14`; likewise the F1 tile widths (9 + 8 letters at font 18 in 302) and the F4 `wordBank` height (12 chips with 44 px icons in 651).
2. Ghost hub at `opacity:.55` on a mono laser: prove it reads as "the same picture again", not as a faded choice; fallback `.65`, never a ring.
3. fi gradation (`aurinko -> auringon`): the stem change cannot be written in F1's box; set A ungraded genitives only, graded ones set B via `aStem`; the F1 tile prints the nominative.
4. **F1 fallback if es AND fr refuse** (then 5 refusals, rule 3): replace F1 by "Which half is missing?" (`mode:'half'`: the whole's picture + ONE printed part, the child writes the other; one-part pool, works in all 11 incl. en). Designed only as a contingency; not in the final unless triggered.
5. de Fugen-s: both-pictured 0; the F1 title says `Fugen-n` unless the panel supplies >= 3 one-part Fugen-s items with a pictured whole (`Geburtstag|s|kuchen` has no pictured whole; `Sonne|n|brille` is Fugen-n).
6. `tools/gate-variation-distinct.js` reads only `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS`: a b3 wave file / ROWS source is required before it sees G2-316.
7. `scripts/verify-hub-type-rows.js` does not exist: write + poison-test (short locale, wrong `coordinate.type`) before `apps['compound-words']` lands; expectation table in the final §7 (47 design rows, ceiling 55).
8. `strand-names.ts` `'Vocabulary Acquisition and Use'` row: da / no / fi entries were not read this session; verify before the eyebrow strand is emitted (README open item 8 notes the `Language` row lacks da/no).
9. `components-b3.js`, `lib/b3-picture-index.js`, `tools/apply-b3-locale.js`, `tools/validate-b3-draft.js` are absent (m); owned by the batch's first design; this type adds `compoundRow opGlyph linkBox splitWord webBlock` and the compound-words validator block.

**Panels**
10. Every kept picture opened (`picOpened:true`); the `crane` class and the sv #35 `fruits/plum` precedent apply.
11. sv / no / fi: >= 3 one-part linked items each, or F1 is recorded refused there.
12. da / no: confirm 2 hubs x 4 satellites (a-side hubs allowed) or accept `lanes:3`.
13. es / fr: decide F1 (>= 3 inserted-joint literals) and fr F5 (>= 8 regular `sizePairs`); es authors `sizePairs` (-ito/-ote) for F5.
14. it: may revert to "famiglie di parole" if it bands classe terza (schema `shape:'family'`; slug changes).
15. Opaque compounds (`bluebell`, `gräshoppa`, `rødhals`, `Löwenzahn`): confirm `opaque:true` placement (F2/F4 only).

**Pipeline**
16. `unitAxis` knob (README ruling) not built; until then only set A ships per face.
17. Meta lead "Free printable" vs tier truth (README open item 1): inherited, surfaced, not decided here.
18. en open/closed compounds and fi "yhteen vai erikseen": 0 pictured open pairs; a candidate future type, not a face.

## 5 Verdict (a critical second-grade teacher)

The base page is honest and quick to teach from: two pictures, one new word, no clutter, and the German child really has to decide the Fugen-n instead of copying it. The detective and the web are the pages children would ask for again; the split page is the one I would use for the weak readers because the word is printed. My worry is the Romance side: es/fr get a family page that leans on six pictured derivations and a size page that borrows Italian pedagogy, and French may end with three faces, so the panels must actually author, not translate.
