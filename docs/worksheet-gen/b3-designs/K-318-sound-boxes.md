# K-318 `sound-boxes` - FINAL design (editor-critic merge, 2026-09-13)

Merged from `_work/K-318-pedagogy.md` + `_work/K-318-design.md`; every file, primitive and option named below was verified in the repo (record: `_work/K-318-critic.md`). Pool numbers are MEASURED (approved-words joined to `entriesFor(theme,loc)` on `vocabKey === key`, `/^\p{L}+$/u`, distinct by word, da `policy_managed !== true`); es/pt/it/fi/da used a draft digraph rule (*est.*), en/fr count letters (upper bound until the bank exists).

## 1. Identity

| field | value |
|---|---|
| id / key | `K-318` / `sound-boxes` (NEW family: `apps.sound-boxes` `{default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'sound-boxes'}` + `axes['exercise-type'].sound-boxes.{slug,name}` x11; registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`; measured 2026-09-13: neither exists yet) |
| bands | base + faces 2-3 = K; faces 4-6 = G1 |
| default_subject | `letters` |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}`; minNouns is checked on the FACE pool after segmentation, not on the vocab count |
| themes, base d2 (3-5 graphemes) pool >= 8 | animals, around the house, forest creatures: 11/11 · toys, zoo animals, farm animals: 10/11 (da refused) · vehicles 9/11 (de 7, da 6) · clothing 8/11 (es 7, it 5, da 7) · fruits 6/11 (de 6, sv 4, da 2, no 3, fi 4) · pets 4/11 |
| refused themes | fruits and pets for the whole type (below 8 in >= 5 locales); every BW theme; `farm animals` for the syllable face in sv/da/no (2-4 two-syllable words) |
| CCSS (en only; national framework NAME elsewhere) | base L.K.2.d · Count RF.K.2.d · First Sound Given RF.K.2.c + L.K.2.d · Sound Strip RF.1.2.d · Syllables and Sounds RF.1.3.e + RF.1.2.d · Blend RF.1.2.b + RF.1.3.b |
| data | approved-words only (brief line 14); raw vocab supplies picture + join key + display case |

| loc | genre head (title of the base) | ASCII slug | K label | G1 label |
|---|---|---|---|---|
| en | Sound Boxes | `sound-boxes` | kindergarten | grade 1 |
| de | Wörter in Laute zerlegen | `woerter-in-laute-zerlegen` | Vorschule | 1. Klasse |
| es | Cajas de sonidos | `cajas-de-sonidos` | preescolar | primer grado |
| pt | Caixinhas de sons | `caixinhas-de-sons` | educação infantil | 1º ano |
| fr | Boîtes à sons | `boites-a-sons` | maternelle (GS) | CP |
| it | Scatole dei suoni | `scatole-dei-suoni` | infanzia | classe prima |
| nl | Hakken en plakken | `hakken-en-plakken` | kleuters (groep 2) | groep 3 |
| sv | Ljuda ord | `ljuda-ord` | förskoleklass | åk 1 |
| da | Lyd for lyd | `lyd-for-lyd` | børnehaveklasse | 1. klasse |
| no | Lydering | `lydering` | 1. trinn | 2. trinn |
| fi | Äänteet laatikoihin | `aanteet-laatikoihin` | esikoulu | 1. luokka |

Heads come from `_PANEL-FINDINGS.md` §2; the panel may rename. `conciencia-fonologica` etc. are AXIS slugs of `phonological-awareness`; the apparatus noun keeps the landing slug clear of them.

## 2. The base page

**Concept.** "Say it slowly, write one sound in each box." Six cream cards (2x3): a theme picture over a row of 3-5 dashed coral boxes, one per verified grapheme. A multigraph box is 1.5x wide with a teal tie arc under it (one sound, more letters). The word is never printed. nl adds hak-stippen (one filled teal dot over each box); all other locales ship without dots at d2. Distinct from K-224 (word printed minus ONE letter), K-231 (letter bank), K-233 (syllable digit), G1-244 d2 (one box per LETTER plus a ruling, G1).

**Layout d2 (px).** Page 703x945, `.ws-page` padding 0 14 -> inner 675 (`page/page.css:16`). Body ≈ 760 (UNKNOWN exact: engineer must measure header+instruction+footer). `cardGrid({cols:2, rows:3})`: `.ws-cardgrid` gap 14 -> card 330x244; `.ws-card` padding 12 + border 2 -> inner 302x216. `.ws-card-stage` has `padding:6px 4px` in page.css; the spec sets it inline to `padding:6px 0` (precedent G1-244) so the full 302 is usable; stage height 204.

```
+------------- card 330x244 -------------+  +------------- card 330x244 -------------+
|[1]                                      |  |[2]                                      |
|              [picture 104]              |  |              [picture 104]              |
|        nl only:   o    o    o           |  |        nl only:  o      o    o          |
|        +----+  +----+  +----+           |  |        +--------+  +----+  +----+       |
|        :    :  :    :  :    :  48 boxes |  |        :  wide  :  :    :  :    :  72   |
|        +----+  +----+  +----+  gap 8    |  |        +--------+  +----+  +----+       |
|                                         |  |          \_____/  tie arc, teal         |
+-----------------------------------------+  +-----------------------------------------+
rows 2 and 3 identical: 6 cards, 2 cols x 3 rows, gap 14
```

Stack (column, gap 10): air 8 + picture 104 + 10 + dots 14 (nl) + boxes svg 52 + tie allowance 10 = 198 <= 204.

**Box geometry.** box 48, gap 8, wide = round(box x 1.5), dash `6 5`, stroke 2.5 coral, r 8, white fill. Row width = sum(widths) + 8(n-1) + 2. Fit rule: `box = min(48, floor((302 - 8(n-1) - 2) / (n + 0.5·wide)))`, REFUSE below 44. Resolved: n=3 -> 48 (162) · n=4, 0-2 wide -> 48 (194/218/242) · n=5, 0 wide -> 48 (274) · n=5, 1 wide -> 47 (293) · n=5, 2 wide -> 44 (298) · n=5, 3 wide -> 41 REFUSED · n=6 -> 43 REFUSED. (The design file's "n=5, 2 wide -> 45 (296)" was arithmetically wrong: 3x45 + 2x68 + 32 + 2 = 305.) 48 px = 12.7 mm, a comfortable K pencil letter; picture 104 clears the K element floor 56.

**Ladder (resolved `difficulty`).**

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards / cols / rows | 4 / 2 / 2 | 6 / 2 / 3 | 8 / 2 / 4 |
| pic / box / gap | 128 / 52 / 10 | 104 / 48 / 8 | 80 / 44 / 8 |
| minG / maxG | 2 / 3 | 3 / 5 | 4 / 5 |
| maxWide / minWideCards | 0 / 0 | 2 / 0 | 2 / 2 |
| dots | every locale | `strings.<loc>.json` flag (nl true) | never |
| band | K | K | G1 |

d3 stack: 6 + 80 + 8 + 48 = 142 <= 151 (card inner at rows 4). Pool guard `sampleEntries(rng, pool, d.cards, 'K-318')` (sample-or-throw, `lib/b2-common.js:64`); the wave records the refusal.

**Answer-hiding + uniqueness.** Hidden stamps only (precedent G1-244 `data-lcs-word`): on each `.ws-card-stage` `data-lcs-word` (display form, de capital kept), `data-lcs-vocab`, `data-lcs-chunks="k|a|t"` (lowercase), `data-lcs-face="base"`; per-face extras in §3. Box COUNT and WIDTH are the Elkonin scaffold, not a leak. Eligibility: `/^\p{L}+$/u`, `distinctByWord`, approved entry + grapheme source present (§5), da `policy_managed !== true`. The picture names one vocab word, so the segmentation is unique by the bank.

`verify(page)` (browser, no modules): boxes == chunks.length; `data-lcs-wide` == (chunk length >= 2); `chunks.join('') === word.toLocaleLowerCase()`; no visible text on a card except the face-declared starter/printed text; no duplicate words; `img.naturalWidth > 0`; nl dots == boxes; svg width <= 302; cards == `d.cards`. Re-derivation from the approved file is node-side (`tools/gate-sound-boxes-data.js`, §5): `page.evaluate` cannot require modules.

**Primitives / components.**
Reused: `cardGrid` (`templates/layouts/card-grid.js`); `.ws-card .ws-card-badge .ws-card-stage .ws-icon` (`page/page.css`); `answerBox({w,h,answer,label})` -> `.ws-answerbox` with `data-lcs-answer` (`templates/components.js:105`); `svgRoot roundedRect circle label el` (`primitives/_svg.js:116`); `entriesFor displayWord distinctByWord sampleEntries fileUri` (`lib/b2-common.js`); tokens `T.coral T.coralSoft T.teal T.white`. NOT used: `countBadge` (prints a count), `letterBoxes` (ancestor; box 26, one per letter, stays untouched for G1-244).
NEW in `templates/components-b3.js`:
- `soundBoxes({chunks, box=48, gap=8, wide=1.5, dash='6 5', starter=null, printed=false, uniform=null})` -> `svgRoot` with `data-lcs-soundboxes=n`; per chunk i a `roundedRect{w: len>=2 ? round(box*wide) : box, h: box, r: 8, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash, data:{'data-lcs-box':i,'data-lcs-wide':0|1}}`; under a wide box a tie arc `M x+6,y+box+3 Q cx,y+box+11 x+w-6,y+box+3`, stroke `T.teal` 2; height = box + 2 + (anyWide ? 10 : 0). `starter={i:0,text:'Sch'}` prints `label` Baloo 2 700 26 `T.teal` centred in box i. `printed:true` prints every chunk (Blend). `uniform:6` ignores chunk widths and draws 6 equal boxes with `data-lcs-strip=6` (Sound Strip).
- `hakDots({centers, filled=true})` -> 14 px svg, `circle r=5` at each box centre x, `T.teal` fill.
- `soundLane({w, h=56})` -> white rounded lane, dashed coral 2.5, `data-lcs-soundlane`, no ticks (a tick discloses the count).
- `syllableArcs({spans, gap, h=22})` -> NEW `primitives/syllable-arcs.js` (shareable with G1-305): one quadratic arc per syllable cluster, `T.teal` stroke 3, `data-lcs-arcs=n`.

**Locale slot structure.** `i18n/strings.<loc>.json` keyed by id (`K-318` + five face ids) `{title, instruction}`; `i18n/skill-sentences.<loc>.json` key `sound-boxes` `{full, short}`; taxonomy slug+name; `frontend/messages/<loc>.json topicMeta.sound-boxes`; `data/b3/sound-boxes.js` per-locale block (§5). Reading order left-to-right in all 11.

**Alternatives.** Alt A, landscape rows (K-287 shape): picture left, up to 7 boxes; only 4-6 items and much empty row at K; used for the G1 faces (§3), rejected for the base. Alt B, 3x2 portrait cards: inner 187 -> 4 boxes force 40 < 44; rejected. Recommendation: the 2x3 base.

**Risks -> mitigations.** No grapheme layer in 7 locales -> per-word bank + gate (§5); without a bank the type ships in de/nl/sv/no and the wave log says so. Overflow -> fit rule refuses below 44 + verify svg width + QA lint. "Why is this box bigger?" -> the tie arc, named once in the instruction. de capital -> verify compares lowercased. Theme thinness -> minNouns 8 after segmentation, refusals recorded. Palette -> coral/white/teal/coralSoft only.

**Print check.** box 48 = 12.7 mm, wide 72 = 19 mm, stroke 2.5 px ≈ 0.66 mm; dashed coral prints mid-grey on mono laser (G1-244 precedent); nothing within 14 px of the edge; smallest text 26 px.

## 3. Faces 2-6

All five are CODE faces (a named additive knob on `build()` + a `verify()` branch, stamped only when declared; base byte-identical). Guards key on `d.countMode` / `d.starter` / `d.strip` / `d.tiers` / `d.mode`, never the level index. No PARAM face: every real move changes what is drawn. K faces keep the §2 cards; G1 faces use rows: `cardGrid({cols:1, rows:6})` -> card 675x115, inner 647x87 (stage inline `padding:0`), picture 80 left, gap 16, apparatus right. "Ceiling" = MEASURED cells >= 8 over ten themes; en/fr upper bounds.

### Face 2 - Count the Sounds (K-3xx, band K, id TBD by emitter)
Teaching move: phoneme counting before writing (the nl hak-stippen act, the sv "räkna ljuden" head); the child draws one dot per sound, then writes the numeral. Layout delta: no boxes, no dots; `soundLane({w:232})` + `answerBox({w:56, h:56})` side by side (232 + 12 + 56 = 300 <= 302), stack 8 + 104 + 10 + 56 = 178. Config: `{...base.difficulty[2], countMode:true, minG:2, maxG:5}`; stamps `data-lcs-face="count"`, `data-lcs-answer` = chunks.length on the answerBox. Verify: answer == chunks.length; no `data-lcs-soundboxes`, no dots, no digit visible. Ceiling: animals / house / forest / farm 11/11; toys, zoo 10/11 (da); vehicles 9/11 (de 7, da 6); clothing 8/11 (es 7, it 5, da 7). Fan lever: theme. Query face: "count the sounds" (Laute zählen / hak-stippen / compter les sons / räkna ljuden), not K-233 (syllables, digit).

### Face 3 - First Sound Given (K-3xx, band K)
Teaching move: onset given, the child segments the rime (RF.K.2.c). Layout delta: box 1 pre-printed (`starter={i:0, text: displayWord(word,loc).slice(0, chunks[0].length)}`, a slice of a stored literal; de shows "Sch"); the rest as base. Config: `{...base.difficulty[2], starter:true, minG:4, maxG:5}`; stamp `data-lcs-face="starter"`. Verify: the only visible text on a card == chunks[0] in display case; boxes == chunks.length. Ceiling: animals / house 11/11; forest, farm 10/11 (da); toys, zoo 9/11 (de toys 7; da; no zoo 6); clothing 8/11 (es, it, da). Fan lever: theme. Query face: "sound boxes with the first sound" (Anlaut vorgegeben / con el primer sonido / första ljudet givet). Boundary: K-221 asks FOR the first letter; this face GIVES it.

### Face 4 - Sound Strip: How Many Sounds? (G1-3xx, band G1)
Teaching move: segment WITHOUT the count scaffold; every word gets the same 6-box strip, fill from the left, leave the rest empty (RF.1.2.d). Layout delta: 6 rows; `soundBoxes({uniform:6, box:48})` = 6 x 48 + 5 x 8 + 2 = 330 beside the picture (80 + 16 + 330 = 426 <= 647); no wide boxes, no arcs (a multigraph goes in ONE box, the child writes two letters). Config: `{cards:6, cols:1, rows:6, pic:80, box:48, gap:8, strip:6, minG:3, maxG:6, maxWide:9}`; stamp `data-lcs-face="strip"`, `data-lcs-strip=6`. Verify: 6 boxes per row, n <= 6, no wide box. Ceiling: animals, house, forest, toys, clothing, farm 11/11; zoo, vehicles 10/11 (da 7); fruits 7/11 (sv 7, da 4, no 6, fi 5). Fan lever: theme. Query face: "sound strip" (Lautleiste / klankstrook / ljudremsa). Boundary: G1-244 d2 boxes = the letter count; here the strip is uniform (count hidden).

### Face 5 - Syllables and Sounds (G1-3xx, band G1)
Teaching move: two tiers, clap the syllables then write each sound under its arc (RF.1.3.e + RF.1.2.d); the bridge to G1-305. Layout delta: 6 rows; `syllableArcs` above box clusters grouped by syllable (intra gap 8, inter gap 22); 7 boxes at 44 + 4 x 8 + 2 x 22 = 384, row 80 + 16 + 384 = 480 <= 647; stack height 22 + 46 + 10 = 78 <= 87. Config: `{cards:6, cols:1, rows:6, pic:80, box:44, gap:8, tiers:true, minSyl:2, maxSyl:3, minG:4, maxG:7, maxWide:3}`; stamps `data-lcs-face="tiers"`, `data-lcs-syl="2|3"` (graphemes per syllable). Verify: arcs == syllables == `count`; cluster sizes == `data-lcs-syl`; per-syllable join == `split[s]`. Ceiling: house, animals 11/11 (da 14 / 8); zoo, toys, clothing, fruits 10/11 (da); forest 9/11 (da 7, no 7); vehicles 7/11 (en, de, da, no); farm 6/11 (sv 4, da 2, no 2). Fan lever: theme, never farm animals in sv/da/no. Query face: "syllables and sounds" (Silben und Laute / lettergrepen en klanken / tavut ja äänteet); never the G1-305 head.

### Face 6 - Blend the Sounds (G1-3xx, band G1)
Teaching move: reverse direction; the boxes are PRINTED with graphemes, the child blends and circles the matching picture of three (RF.1.2.b + RF.1.3.b; the "plakken" half of the nl head, sv "ljuda ihop"). Layout delta: 6 rows; `soundBoxes({printed:true, box:44})` left (max 4 x 44 + 66 + 32 + 2 = 276), then 3 pictures 72 px with gap 12 (240): 276 + 24 + 240 = 540 <= 647. Config: `{cards:6, cols:1, rows:6, mode:'blend', choices:3, box:44, gap:8, pic:72, minG:3, maxG:5, maxWide:1}`; stamps `data-lcs-face="blend"`, `data-lcs-target=vocabKey` on the row, `data-lcs-choice=vocabKey` on each picture. Verify: printed labels join == target word lowercased; exactly one picture with `data-lcs-choice === data-lcs-target`; three distinct vocabKeys and words; distractors same theme; six distinct targets. Distractors need only a picture (theme >= 18 nouns; every fanned theme has >= 19). Ceiling: animals, house, forest 11/11; zoo, farm 10/11 (da); vehicles 9/11 (de 7, da 6); toys 9/11 (de 6, da 6); clothing 8/11 (es, it, da). Fan lever: theme. Query face: "blend the sounds" (Laute zusammenziehen / plakken en lezen / ljuda ihop). Boundary: K-225 matches a whole printed WORD; here it is segmented.

**Rejected non-moves.** (1) Theme swap. (2) "Long words": a range, an adjective away from Sound Strip. (3) Multigraph-focus page: multigraph words sv 99 / no 93 whole-pool, 0-6 per theme in sv/no/da/fi -> unbuildable in >= 4 locales. (4) "Where do you hear it" (colour the box of a given sound): K-221/226/227 already own those heads (de titles measured: Anlaute / Auslaute / Inlaute); target yield unmeasured. (5) Six colourable dots at K: 6 x 56 (K element floor) > 302; replaced by lane + numeral. (6) Boxes drawn by the child: unverifiable, collapses into G1-244 d3. (7) Middle box blanked = K-224/K-227. (8) Trace the graphemes = K-284. (9) Whole word written = G1-244. (10) Capital boxes: a case swap. (11) d1/d3 re-labelled: ranges. (12) Arcs only = G1-305.

## 4. Native rebuild plan x11

Unit = a per-locale DATA decision in `data/b3/sound-boxes.js`; the code substitutes literals and never inflects or infers a digraph. One box per element of the stored array; de keeps the capital in box 1 (`displayWord`), all others lower-case; only Blend prints graphemes.

| loc | teaching point | unit rule / what the panel authors | refusal rule | traps |
|---|---|---|---|---|
| de | Wörter in Laute zerlegen (Anlaut-Inlaut-Auslaut family, Klasse 1) | nested `chunks` (1028/1028; 545 carry a multigraph; inventory = `chunk-tables/de-chunks.json`). Panel: per-word overrides; the cross-syllable `tz`/`chs` ruling (`Katze` = k,a,t / z,e today; `Fuchs` = f,u,ch,s) | absent from approved; a chunk outside the table | capital in box 1 (`Sch`, `Pf`); a seam remerge is a panel ruling, default OFF |
| nl | hakken en plakken (groep 2 / 3) | nested (1062/1062; 585 with a multigraph; `nl-chunks.json`) | as de | `ij` is ONE chunk (`iJs` = ij,s); dots ON at d2 |
| sv | ljuda ord / ljudning (förskoleklass, åk 1) | nested (993/993; 99 with a multigraph; `sv-chunks.json`); doubles TWO graphemes (`katt` = k,a,t,t), `ck` two (`kyckling` = k,y,c,k / l,i,ng). Panel: `mergeDoubles` | as de | bare singular, no definite form; `ck` two unless overridden per word |
| no | lydering (1. / 2. trinn) | nested (829/829; 93 with a multigraph; `no-chunks.json`); doubles two. Panel: `mergeDoubles`, kj/sj note | as de | kj/sj quarantine applied upstream |
| da | lyd for lyd, lydrette ord (0. / 1. kl) | FLAT (794; K-1 strict = 402 where `policy_managed` is ABSENT, 392 are `true`, `false` never occurs); panel authors a per-word grapheme bank (orthographic units; `ng` optional, 54 words) | strict pool only; absent -> refuse | only animals + house reach 8 on the K faces; da ships those two themes unless the panel widens |
| fi | äänteet laatikoihin (esikoulu / 1. lk) | FLAT (1120); bank per word; default kirjain (KÄTS: `kissa` = 5 boxes) or äänne (`ss` one wide box, 4) - the panel rules per OPS 2014; `ng`/`nk` optional (16 / 46) | absent -> refuse | `[NSR-FLAG][fi]`; a nominative token never enters a sentence slot; the title is a bare nominative phrase |
| es | cajas de sonidos, conciencia fonológica | FLAT (958); bank per word, drafted by rule (ch ll rr qu gu; 161 words), panel-confirmed | absent -> refuse | `qu`/`gu` one box only before e/i; silent `h` (`búho`) excluded |
| pt | caixinhas de sons, consciência fonológica | FLAT (891); bank (nh lh ch ss rr qu gu; 181) | as es | `x` has several values, panel may exclude |
| it | scatole dei suoni, consapevolezza fonologica | FLAT (978); bank (gn gl sc ch gh qu + doubles; 414); doubles one box yes/no | as es | `gl`/`sc` only before i/e |
| fr | boîtes à sons, conscience phonologique (GS / CP) | FLAT (810); WHITELIST array per word (ou on an en in ch eau au ai oi eu gn ph ill qu; 488 words) | absent OR not whitelisted -> refuse | mute finals: `chat` = ch,a; `loup` = l,ou; a box for a mute letter is a false sound box |
| en | sound boxes, Elkonin boxes | FLAT (910; 401 on 2 sources); WHITELIST per word (sh ch th ck ng qu ee oo ea ai ay oa ou ow oi oy igh ar or er ir ur; 569 words) | as fr | magic-e excluded or boxed `[h,or,se]`; yield per theme UNKNOWN until authored |

Every panel also authors 6 titles, 6 instructions (one imperative, <= 150 chars, the tie arc named once), the skill sentence, slug + name, topicMeta.

## 5. Data + gates

**Approved-words read.** `entries[]` fields: `key` (join = `vocabKey`), `word`, `split`, `count`, `chunks`, `total_agreed`, `policy_managed` (da). Chunks caveat: `[[graphemes per syllable]]` ONLY in de/nl/sv/no (1028/1062/993/829 nested, 0 elsewhere); in the other seven `chunks === split`, no grapheme information -> bank or refuse. Never the raw vocab for a segmentation (§20.5).

**`data/b3/sound-boxes.js`** (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js`, the `apply-b2-locale.js` / `validate-b2-draft.js` pattern), per locale:
```
{ mode:'chunks'|'bank', capitalBox1:false, strictPool:null|'policy_managed_absent',
  mergeDoubles:false, remergeAcrossSyllable:[], exclude:['vocabKey'],
  bank:{ '<vocabKey>': [['ch','a'],['t']] }, dots:false }
```
`lib/sound-boxes.js segment(entry, cfg)`: `chunks` -> copy (+ per-word `bank` override, `mergeDoubles`, `remergeAcrossSyllable`); `bank` -> lookup or null. Refuse when the flat join !== `word.toLocaleLowerCase(loc)`. A drafting aid `tools/gen-b3-sound-boxes-draft.js` may PROPOSE bank rows for es/pt/it/fi/da from a closed digraph list; the panel reviews; only the literal ships.

**`tools/validate-b3-draft.js` rules (sound-boxes part).** 6 x `{title, instruction}`: no worksheet-word, title <= 70 and unique in band, instruction <= 150 with an end mark; skill `{full 60-180, short 15-90}`; family `{slug ASCII-kebab, name}`; every `bank` row: key in `approved-words-<loc>.json`, `flat.join('') === word.toLowerCase()`, `rows.length === count`, `rows[s].join('') === split[s]` per syllable (merges only INSIDE a verified syllable unless the seam is in `remergeAcrossSyllable`); da: no `policy_managed:true` key; `exclude` keys exist; a de/nl/sv/no bank row identical to `chunks` fails (dead row).

**`tools/gate-sound-boxes-data.js`** (node, every locale x theme x face before a wave):
1. every fanned word is in the approved file (poison: `{vocabKey:'zebra', word:'sebra'}` in a fake pool -> FAIL "not approved");
2. `segment().join('') === word` case-folded (poison: en bank `horse:[['h','or','s']]` -> FAIL "hors != horse");
3. every multigraph of a chunk-table locale is a key of `chunk-tables/<loc>-chunks.json` (poison: add `sh` to a de row -> FAIL);
4. n within the face's `minG..maxG`, wide <= `maxWide`, Strip n <= 6, Tiers `count` in 2..3, Blend three distinct keys and words per row (poison: duplicated distractor -> FAIL);
5. da: `policy_managed` absent on every fanned word (poison: `hund` with `policy_managed:true` -> FAIL);
6. pool >= `minNouns` per cell or the cell is recorded REFUSED, never filled;
7. the rendered `data-lcs-chunks` of every card equals the re-derived segmentation (diff, not trust);
8. non-vacuity: prints words checked per cell; 0 checked = FAIL.

**`tools/gate-variation-distinct.js`** compares resolved `difficulty[2]` against the base's published d2; it reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS`, so a b3 wave file / rows list is required before it can see K-318 (OPEN 3 in the critic file). Expected: 5 distinct configs (poison: First Sound Given without `starter` and with base ranges -> FAIL).

**QA lint** (`qa/lints.js`): every stage stamps `[data-ws-content]`; overflow, palette, min-text 9 px as today.

## 6. SEO plan

| face | title pattern (all locales: `{head}{sep}{Theme}`; qualifier faces `{head} {qualifier}{sep}{Theme}`) | meta MIDDLE | h1 / eyebrow / strand | hub coordinate |
|---|---|---|---|---|
| base | `Sound Boxes: Animals` · `Wörter in Laute zerlegen: Tiere` · `Boîtes à sons : les animaux` | instruction if it fits 120-170, else `skill-sentences.<loc>.sound-boxes.full` | title / K label / `Phonological Awareness` row of `strand-names.ts` (de "Phonologische Bewusstheit", pt "Análise linguística/semiótica") | `{type:'sound-boxes', mode:'base', theme, level:K}` |
| Count | `Count the Sounds: Animals` · `Laute zählen: Tiere` | "no letters, one dot per sound" | K label | `{…, mode:'count', level:K}` |
| First Sound Given | `Sound Boxes with the First Sound: Toys` · `Anlaut vorgegeben: Spielzeug` | "the first sound is printed" | K label | `{…, mode:'starter', level:K}` |
| Sound Strip | `Sound Strip: Animals` · `Lautleiste: Tiere` | "same six boxes for every word, leave the rest empty" | G1 label | `{…, mode:'strip', level:G1}` |
| Syllables and Sounds | `Syllables and Sounds: Zoo Animals` · `Silben und Laute: Zootiere` | "clap, then write each sound under its arc" | G1 label | `{…, mode:'tiers', level:G1}` |
| Blend | `Blend the Sounds: Animals` · `Plakken en lezen: dieren` | "the sounds are printed, circle the picture" | G1 label | `{…, mode:'blend', level:G1}` |

Titles <= 70, no worksheet-word (the engine appends it), unique per band; `sep` is the locale's colon rule (fr ` : `). JSON-LD `LearningResource` with `educationalAlignment.targetName` = the CCSS code (en) or the framework NAME (others); no `targetUrl`. `level` = the emitter's band-table key for the face's band.

Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-224 (Missing Sound) | K-224 prints the word minus ONE letter; base prints NO letters, one box per sound | 0.15 |
| base vs K-231 (Build the Word) | K-231 gives a letter bank; base has no bank | 0.15 |
| base vs G1-244 d2 (letter boxes + ruling, G1) | base is K, one box per SOUND (wide box for a digraph), no ruling, word never written whole | 0.25 |
| Count vs K-233 (Count the Syllables) | sounds vs syllables; dots + numeral vs a digit | 0.20 |
| First Sound Given vs K-221 (Beginning Sounds) | K-221 asks FOR the first letter; here it is GIVEN | 0.15 |
| Sound Strip vs base | strip hides the count; G1 | 0.35 |
| Syllables and Sounds vs G1-305 | G1-305 splits only; here sounds are written under arcs | 0.30 |
| Blend vs K-225 (Match Word to Picture) | whole-word match vs segmented blending | 0.20 |

Base landing boundary sentence: "This page shows no letters of the word: the child hears the sounds and writes one in each box" (against K-224 "one letter is missing", K-231 "letters are given"). Syllables and Sounds never uses the G1-305 head.

## 7. Hub visibility contract

A face appears under `sound-boxes` on `/[locale]/worksheets` IFF all four hold (brief, "Hub visibility contract"):
1. `apps.sound-boxes` exists in `frontend/config/topics-taxonomy.json` (missing = the type is rendered NOWHERE in the rail); measured 2026-09-13: absent, registrar required;
2. `axes['exercise-type'].sound-boxes` has `slug` + `name` in all 11 locales;
3. exactly one landing per face per locale with `coordinate.type === 'sound-boxes'` verbatim, a level key from the band table (K faces the K key, G1 faces the G1 key), a unique slug, and `canonicalDeckSlug` = the published deck;
4. the landing JSON is committed and DEPLOYED (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=sound-boxes`, expecting exactly 6 rows per locale (66 total). Measured 2026-09-13: this script does not exist (`scripts/verify-worksheets-hub-order.js` and `verify-worksheets-hub-render.js` are the nearest siblings); it must be written and poison-tested (a 5-row locale and a wrong `coordinate.type` must FAIL) before the `apps.sound-boxes` registration lands.
