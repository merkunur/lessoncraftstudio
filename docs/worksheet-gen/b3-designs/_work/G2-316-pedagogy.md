# G2-316 `compound-words` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 unless marked *est.* Method (scratch `g2316-measure.js`, read-only): `lib/b2-common.js entriesFor(theme, loc)` over the 50 cached colour themes (`cache/manifest.json`, `bw:false`), distinct by lowercased singular. A pictured word W is a **both-pictured pair** when `W === A + link + B`, A and B (>= 3 letters) also pictured singulars, `link` in the locale set (de `'' s n en e er es`, nl `'' s n en e`, sv `'' s e a o u`, da/no `'' s e`, fi `'' n`, en/Romance `'' space -`). Regex hits were hand-audited (removed: nl `hamster`, sv `fotografering blåsfisk`, da `vandring fotografering`, no `fotografering selebukse treblad`, es `pantalón caracol camaleón`, pt `camaleão`). **One-part-pictured** = only one part is a picture, the whole still is (`g2316-half.js`; counts *est.* +-3).

## A. IDENTITY

| field | value |
|---|---|
| id / key / band | `G2-316` / `compound-words` / G2. `default_subject: letters`, `default_age_range: 7-9`, `assetClass: icon-placement`. Key ABSENT from `topics-taxonomy.json` (grep = 0): register before the wave (registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`). |
| theme axis | **`themeAxis:{applicable:false}` + `setAxis`** (the K-317 `letterAxis` mechanism). Measured: both-pictured pairs per single theme peak at flowers 4 (en) / 5 (de) / 6 (sv, no) / 3 (nl, fi) / 4 (da): no theme reaches the 8 a page needs. Pairs are cross-theme by nature (`sun`+`flower`, `tooth`+`brush`); the page draws from a curated per-locale `items[]` in disjoint sets (`set:'A'|'B'`). nt20-C ships set A per face; the per-set fan is the additive knob. |
| CCSS (en; honest) | base, F1, F2, F3, F5 **L.2.4.d** (predict the meaning of compounds from the parts); F4 L.2.4.d + RF.2.3. Family/alterati anchors cite **L.2.4.b / L.2.4.c** (prefix / root + suffix) in the machine anchor only; every non-EN landing names the national framework. |
| data | picture + singular + gender from the vocab; every pair and link morpheme is a panel literal in `data/b3/compounds.js` (section D). No approved-words read: a seam is not a syllable boundary (`Sonnenblume` splits `son-nen-blu-me`; the seam is `Sonne|n|blume`). |

**Rebuild shape per locale** (both-pictured / one-part-pictured, audited):

| loc | genre head | ASCII slug | G2 label | shape | both / one-part | why |
|---|---|---|---|---|---|---|
| en | Compound Words | `compound-words` | grade 2 | compound (closed) | 20 / 40 | A demand; open compounds have 0 pictured pairs (4 multi-token words in the pool): open/closed is a landing sentence, not a face |
| de | Zusammengesetzte Nomen | `zusammengesetzte-nomen` | 2. Klasse | compound + Fugenelement | 25 / 45 | B+; Fugen-n 4 (`Sonne|n|blume`, `Glocke|n|blume`, `Löwe|n|zahn`, `Blume|n|kohl`), `-er` 1 (`Kleid|er|schrank`), 20 bare; **Fugen-s both-pictured = 0** (panel adds one-part items, e.g. `Sonne|n|brille`, `Schraube|n|zieher`; no K-3 Fugen-s whole is in the pool) |
| nl | Samengestelde woorden | `samengestelde-woorden` | groep 4 | compound + tussen-n | 22 / 40 | B+ exact picture form; tussen-`en` 3 (`tand|en|borstel`, `boek|en|kast`, `paard|en|bloem`); `zon|ne|bloem` is the contrast pair (literal `link:'ne'`) |
| sv | Sammansatta ord | `sammansatta-ord` | åk 2 | compound + foge-s | 21 / 35 | B; foge-s both-pictured 0 (`näshorn` unpictured); one-part foge-s `nattduk|s|bord`, `anteckning|s|bok`; adjective-first (`vit|lök`, `blå|klocka`) is Lgr22-legitimate |
| da | Sammensatte ord | `sammensatte-ord` | 2. klasse | compound + fuge-e/-s | 27 / 33 | B; fuge-e 3 (`vask|e|bjørn`, `får|e|kylling`, `fugl|e|hus`), fuge-s 1 (`næsehorn|s|fugl`) |
| no | Sammensatte ord | `sammensatte-ord` | 3. trinn | compound + binde-e | 21 / 35 | B; binde-e 2 (`vask|e|bjørn`, `ost|e|kake`); `sel|e|bukse` removed (`sel` = the seal) |
| fi | Yhdyssanat | `yhdyssanat` | 2. luokka | compound, nominatiivi vs genetiivi alkuosa | 24 / 50 | A, no PDF owner; nominative-first 23; genitive both-pictured **1** (`auringo|n|kukka`), one-part ~5 (`sate|en|kaari`, `karhu|n|vatukka`, `talo|n|mies`); "yhteen vai erikseen" needs authored phrases: OPEN 3 |
| es | Familia de palabras | `familia-de-palabras` | segundo grado | word family | compounds 4 -> compound REFUSED | SEP/NEM "familias léxicas"; 54/68 candidate roots pictured; derivations with their own picture: `florero florista panadero jardinero cocinero librero` (6) |
| fr | Mots de la même famille | `mots-de-la-meme-famille` | CE1 | word family | compounds 6 (`chou-fleur`, `portefeuille` ...) < 8 -> REFUSED | programmes cycle 2 lexique; 49 roots pictured; pictured derivations `fleuriste jardinier cuisinier pâtisserie` (4) |
| it | Nomi alterati | `nomi-alterati` | classe seconda | diminutivo / accrescitivo (-ino, -one) | compounds 4 -> REFUSED; famiglie di parole = classe terza (C) | Indicazioni place "nomi alterati" in classe seconda; 411 regex-regular `-o/-a` nouns (panel confirms 20); shares the pt schema |
| pt | Diminutivo e aumentativo | `diminutivo-e-aumentativo` | 2º ano | diminutivo / aumentativo (-inho, -ão) | compounds 3 -> REFUSED; "família de palavras" not K-3 demand | BNCC EF02LP (the panel's own re-target); 492 regex-regular nouns; `patinho`, `galinha`, `cozinha` pictured (the last two = the "-inho that is not a diminutive" trap) |

## B. THE SIX FACES

**One item schema, three readings:** `{a, link, b, whole}`: `a` = pictured word (first part / root / base noun), `b` = pictured word (compound) or affix literal (`-ista`, `-inho`), `whole` = the pictured target (compound) or a panel literal (family; alterati shows `a`'s picture scaled x0.55 / x1.35, the brief allows scaling). Refusal = `items[].shape` / pool data, never code. Geometry: 8 full-width `.ws-lane` rows (G2 floor 36; pictures 60), the 6x6 match grid (F3), the 12-chip list (F4). Every row stamps `[data-ws-content]`.

| # | id / slug | EN title (<= 70) | teaching move | child does (d2) | family / alterati reading |
|---|---|---|---|---|---|
| F0 | G2-316 `compound-words` | Picture + Picture = Compound Word | synthesis with meaning: two pictures, two words, one new thing; writes the new word | 8 rows `[pic A] + [pic B] = [ruling]`; 8 compounds | `[pic flor] + [chip -ista] = [ruling]`; `[pic big] , [pic small] = [ruling]` writes `gatinho` |
| F1 | G2-3xx `compound-words-joint` | Join the Words: What Goes in the Middle? | the SEAM (Fugen-s/-n, tussen-n, foge-s, fi genitive `-n`); parts as word tiles, a dashed box at the joint, the whole's picture as clue | 8 rows `[Sonne] [box] [blume] [pic] [ruling]`; writes the joint (or nothing) + the whole | `[zapat|o] [box] [-ero]` (the vowel that drops); `[gat|o] [box] [-inho]`. **en REFUSED** (link always empty = concatenation, no decision) |
| F2 | G2-3xx `compound-words-split` | Split the Compound: Find the Two Words | analysis: the whole printed in letter cells; draws the seam, writes the two words in two boxes | 8 rows `[pic] [cells] [box A] [box B]`; 16 parts | printed `florista` -> `flor` + `-ista`; `gatinho` -> `gato` + `-inho` |
| F3 | G2-3xx `compound-words-match` | Match the Halves | pairing 6 first parts with 6 second parts by MEANING (pictures only), then writing | 6x6 `.ws-match` pictures; 6 lines + 6 rulings | es: 6 root pics <-> 6 derived pics (`flor`<->`florista`). **pt REFUSED** (same object big/small = trivial); **fr/it REFUSED** (4 / 3 pictured derivations) |
| F4 | G2-3xx `compound-words-detective` | Compound Detective: Circle the Real Compounds | recognition with foils: 12 pictured words, 6 compounds + 6 look-alikes; circles, writes parts | 12 chips 3x4 `[pic 48][word]` + 6 split boxes | intruders sharing letters not root (`fleur`/`fleuve`, `flor`/`flan`); `galinha cozinha caminho` are not diminutives; it `mattino bambino` |
| F5 | G2-3xx `compound-words-web` | Word Web: One Word, Many Compounds | productivity: a hub picture (`fish`, `Blume`, `kala`) with 4 partner pictures; writes 4 compounds | 2 webs (hub 72, satellites 60, 4 rulings); 8 compounds | hub root -> 4 derivations (`flor`: `florero florista floral florecer`); `gato` -> `gatinho gatão gatinha` = the "árbol de la familia" genre |

**Params (resolved; d2 ships).**

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 6 rows + word bank of the 6 wholes (`collation.js` order), pic 72 | 8 rows, no bank, pic 60, ruling glyphH 26 | 8 rows, `letterBoxes` instead of ruling (letter count shown) | none | base |
| F1 | 6 rows, joint choices printed (`pillChoice` of `links`) | 8 rows, `joint:true`, empty box; >= 3 rows non-empty link, >= 3 empty | 8 rows, whole only, no box | `joint` | CODE |
| F2 | 6 rows, seam printed as a `T.grid` tick, boxes | 8 rows, `split:true`, no tick | 8 rows, no boxes, 2 rulings | `split` | CODE |
| F3 | 4x4 with words under pictures | 6x6, `match:true`, pictures only + 6 rulings | 8x8 lines only (refused where < 8 disjoint) | `match` | CODE |
| F4 | 8 chips 4 + 4, foils = non-words (`ballfoot`) | 12 chips 6 + 6, `detective:true`, real look-alikes | 12 chips 4 + 8 | `detective`, `foils` | CODE |
| F5 | 1 web x 3 + bank | 2 webs x 4, `web:true` | 2 webs x 5, one foil satellite per web | `web` | CODE |

No PARAM face. Guards key on `d.joint` / `d.split` / `d.match` / `d.detective` / `d.web`, never the level index. `tools/gate-variation-distinct.js` reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (measured, b2-bound): a b3 wave file / ROWS is required before it sees G2-316.

**verify() + the truth.** `items[]` is the truth; hidden stamps per row `data-lcs-a/-link/-b/-whole/-shape/-set` (G1-244 precedent). Rules: (1) `whole === casing(aStem||a) + link + b`; de: `a` keeps its capital, `b` is lowercased inside the word; all other locales lower (`displayWord`); (2) **page uniqueness**: no `a`, no `b` in two rows (poison: `cupcake` + `pancake` -> FAIL); (3) no visible text equals `whole` on F0/F1/F3/F5; F2 shows no seam mark at d2; (4) F1 >= 3 empty and >= 3 non-empty links; (5) F3 cross-product `a_i + link_i + b_j` (i != j) not in the pool (node-side, D); (6) F4 exactly 6 `data-lcs-foil` chips from `foils[]`, 12 distinct; (7) F5 satellites distinct, hub on the declared `hubSide` (`sun|flower`, `sun|glasses` are a-side hubs); (8) `img.naturalWidth > 0`; (9) F0/F3 need `a` AND `b` pictured, F1/F2/F4/F5 only `whole`.

**Refusal per locale (pool floors: 8 disjoint items F0/F1/F2/F5; 6 F3; 6 + 6 foils F4).** Both-pictured pairs with DISJOINT parts (greedy max, measured): en 15 · de 15 · nl 16 · sv 14 · da 20 · no 16 · fi 16 -> F0 set A ships x7 (set B needs the panel's one-part items on F1/F2/F5, both-pictured on F0/F3). Hubs with >= 3 pictured compounds (measured): en `fish 6 ball 3 cake 3 flower 3` · de `Fisch 6 Blume 5 Hose 4 Band 4 Kuchen 3 Ball 3` · nl `vis 6 bloem 6 kast 4 bal 4 broek 4` · sv `fisk 6 bil 3 band 3 byxor 3 fågel 3` · da `kage 3 bukser 3 fugl 3` · no `fisk 5 bukse 4 fugl 4 ball 3 kake 3 blomst 3` · fi `kala 6 pallo 6 kakku 4 kukka 4 pää 3` -> F5 x7 (da exactly at the floor; panel confirms). Foils exist x7 (regex false hits, all pictured: en `kitchen cabinet pelican harvest carpet pumpkin hamster`, de `Giraffe Traktor Ventilator Alligator`, nl `spiegel fauteuil hamster`, sv `sparris servitris`, da `uniform papegøje`, fi `porkkana makkara haikara meduusa`). Romance: F0/F1/F2/F4/F5 ship where the panel authors 20 items; F3 es only.

**Fan lever.** `setAxis`: plan `setsPerType` + `setOverrides:{'G2-316':'A'}`; `enumerate.js` loops sets into `instance.set`; `deckIdFor` appends `-s<set>`; `render-instance` passes `set`; until then `build()` reads `bank[loc].exemplarSet`. Theme is never fanned.

**Query face per market.** base = bare head; F1 = the joint (`Fugen-s`, `tussen-n`, `foge-s`, `yhdyssanan alkuosa`; es/pt/it "cambia la vocal"); F2 = split (`zusammengesetzte Wörter zerlegen`, `jaa yhdyssana`; es "busca la raíz"); F3 = match (`Wortteile verbinden`; es "une la raíz con su familia"); F4 = detective (`echte zusammengesetzte Wörter`, `onko yhdyssana?`; fr "l'intrus de la famille"; pt "-inho que não é diminutivo"); F5 = web (`Wörter mit Fisch`, `yhdyssanoja sanasta kala`; es/fr "árbol / arbre de la famille"). de copy never uses `Wortfamilie` for compounds (that is the root-family concept).

**Rejected non-moves.** (1) Theme swap (max 6 pairs per theme anyway). (2) "Longer / 3-part compounds": a range = d3; 3-part both-pictured = 1-2 per locale. (3) **Scrambled compound tiles**: K-231 (letters) / G1-305 Face 4 (syllables) in disguise; two tiles have one non-identity order = no task. (4) Compound inside a sentence = G1-249. (5) **Plural of compounds** = the `singular-plural` family (6 types). (6) Trace the compound = K-284. (7) Word bank + pictures = F0 d1, a scaffold delta (rule 4). (8) Digit answers = K-233 shape. (9) **Open vs closed** (en `ice cream`, fi `yhteen vai erikseen`): 0 pictured open pairs, needs authored phrases and a wrong spelling printed (§20.7 spirit): OPEN 3, not a face. (10) "Which form is right?" with `Sonneblume`: prints a wrong form. (11) "Explain the meaning": open-ended, no verify, a comprehension shape.

## C. NATIVE REBUILD x11

Unit = a per-locale DATA block in `data/b3/compounds.js`; the code substitutes literals and never inflects, joins or cases. The panel authors >= 20 items (set A: 8 with disjoint parts; set B: 8; 4 spare), 6 hub webs, 8 foils, 6 titles/instructions, the skill sentence, slug + name, topicMeta.

| loc | shape | items the panel authors (a | link | b; casing) | refusal rule | traps |
|---|---|---|---|---|---|
| en | compound | `sun|flower star|fish tooth|brush rain|coat cup|cake arm|chair book|shelf earth|worm hand|bag basket|ball sauce|pan bird|house water|melon` (both-pictured) + one-part `rain|bow butter|fly snow|man key|board sun|glasses tooth|paste`; all lower | F1 REFUSED; F3 from 15 disjoint | `bluebell`/`buttercup` opaque: not in F0/F3 (OPEN 1); `carpet` the canonical foil |
| de | compound + Fugenelement | `Sonne|n|blume Glocke|n|blume Löwe|n|zahn Blume|n|kohl Kleid|er|schrank Zahn|bürste Regen|mantel Fuß|ball Käse|kuchen See|stern Wasser|hahn Vogel|haus Brot|dose Koch|topf Kugel|fisch` + one-part Fugen-s/-n | F1 needs >= 3 non-empty joints: Fugen-n 4 + panel Fugen-s | **casing**: `a` capital kept, `b` lowercased inside, whole capital; `ß` kept; `Wortfamilie` never in copy |
| nl | compound + tussen-n | `tand|en|borstel boek|en|kast paard|en|bloem zon|ne|bloem water|meloen hand|schoen voet|bal regen|jas kaas|taart boter|bloem bloem|kool maan|vis zak|lamp ijs|vogel brood|trommel` | F1 ships (3 `en` + `ne` + one-part) | tussen-n is groep 5-6 in SLO: F1 copy says groep 4 only for picture-transparent items; `ij` one letter; `blauweregen` (inflected adjective) excluded |
| sv | compound + foge-s | `sol|ros mask|ros blå|klocka smör|blomma ring|blomma vatten|melon tand|borste fot|boll bok|hylla sjö|stjärna hus|bil skåp|bil flod|häst arm|band vit|lök` + one-part foge-s `nattduk|s|bord anteckning|s|bok` | F1 only if >= 3 foge-s items authored | parts in INDEFINITE singular (`bana` never `banan`); `grupp` unusable; `fotografering` a foil |
| da | compound + fuge-e/-s | `vask|e|bjørn får|e|kylling fugl|e|hus næsehorn|s|fugl vand|melon tand|børste fod|bold regn|frakke pande|kage honning|kage blå|klokke smør|blomst regn|orm skov|snegl flod|hest` | F5 d2 = 2 hubs x 4 with hubs of 3: panel adds one-part satellites or records 2 x 3 | `vandring` is a FOIL; `skrivebord` verb-first (panel decides); `pande` = pan AND forehead (pan picture) |
| no | compound + binde-e | `vask|e|bjørn ost|e|kake løve|tann vann|melon tann|børste fot|ball bok|hylle panne|kake regn|frakk blå|klokke smør|blomst ring|blomst hvit|løk arm|bånd kule|fisk` | F1 needs one-part binde-e (`jul|e|kule`, `barn|e|seng`) | `treblad` (tre = three) and `selebukse` EXCLUDED; bokmål only |
| fi | compound, nominatiivi vs genetiivi | nominative `vesi|meloni hammas|harja jalka|pallo kori|pallo kirja|hylly jää|kaappi juusto|kakku pannu|kakku voi|kukka sade|takki ranne|kello maa|pallo enkeli|kala kukka|kaali`; genitive `auringo|n|kukka` (a `aurinko`, aStem `auringo`), one-part `sate|en|kaari karhu|n|vatukka` | F1 ships if >= 3 genitive items (whole pictured suffices) | F1 prints the NOMINATIVE tile; gradation (`nk`->`ng`) cannot be "written in the box": OPEN 2; instruction a whole literal |
| es | word family | `flor -> florero florista floral` · `pan -> panadero panadería` · `zapato -> zapatero` (aStem `zapat`) · `jardín -> jardinero` · `cocina -> cocinero` · `libro -> librero librería` · `pez -> pescador` (aStem `pesc`) · `hielo -> helado` · `sol -> soleado` · `leche -> lechero` | F3 ships (6 pictured derivations); F1 = the vowel that drops | "familia léxica" (SEP); stem changes are `aStem` literals; intruders share letters not root (`flor`/`flan`/`foca`) |
| fr | famille de mots | `fleur -> fleuriste fleurir` · `jardin -> jardinier jardinage` · `dent -> dentiste dentifrice` · `lait -> laitier laitage` · `chat -> chaton` · `pomme -> pommier` · `glace -> glacier glaçon` · `sel -> salé` · `sucre -> sucré` · `livre -> libraire` · `poisson -> poissonnier` | F3 REFUSED (4 pictured derivations); F1 = linking vowel (`jardin|i|er`) | `boulanger` is NOT in the `pain` family; `fleuve` is THE intruder; accents kept in cells |
| it | nomi alterati | `gatto -> gattino gattone` · `casa -> casetta casona` · `libro -> libretto librone` · `palla -> pallina pallone` · `scarpa -> scarpetta scarpone` · `tavolo -> tavolino` · `naso -> nasino nasone`; EXCLUDE `cane -> cagnolino`, `pesce -> pesciolino`, `fiore -> fiorellino` (irregular) | F3 REFUSED; foils `mattino bambino cantina tacchino` | `-ino`/`-etto` choice is lexical: one alterato per base; `-one` changes gender: never print an article |
| pt | diminutivo e aumentativo | `gato -> gatinho gatão` · `pato -> patinho` (pictured) · `bola -> bolinha bolão` · `carro -> carrinho carrão` · `sapato -> sapatinho` · `casa -> casinha`; EXCLUDE `casarão`, `boquinha` (c->qu), `cãozinho pãozinho` (`-zinho`) from set A | F3 REFUSED; foils `galinha cozinha caminho moinho vizinho` | regular = `-o/-a` drops + `-inho/-inha`; the scaled picture is the ONLY visual cue, never a numeral; EF02LP confirmed by the panel |

## D. DATA + GATES

**`data/b3/compounds.js`** (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js`; the `apply-b2-locale.js` pattern; both TBD, owned by the first design in the batch), per locale:
```
{ shape:'compound'|'family'|'alterati', casing:'keep-first'|'lower', links:['', 'n', 'en', 'er'], exemplarSet:'A',
  items:[ { a:{vocabKey:'sun', word:'sun'}, aStem:null, link:'',
            b:{vocabKey:'flower', word:'flower'} | {affix:'-ista'},
            whole:{word:'sunflower', vocabKey:'sunflower', scale:1}, set:'A', hubSide:'b', opaque:false } ],
  hubs:[ { hub:{vocabKey:'fish'}, side:'b', satellites:['starfish','angelfish','jellyfish','goldfish'] } ],
  foils:[ { vocabKey:'carpet', word:'carpet', looksLike:['car','pet'] } ],
  crossOk:[], strings:{ 'G2-316':{title,instruction}, F1..F5:{...} }, refuse:{ F1:false, F3:false } }
```
`whole.vocabKey` REQUIRED (the F1/F2/F4 clue), `a.vocabKey` REQUIRED, `b.vocabKey` REQUIRED for `compound`, absent for affixes; `whole.scale` 0.55 / 1.35 only for `alterati`.

**`tools/validate-b3-draft.js` rules (compounds part).** (1) `whole.word === casing(aStem||a.word) + link + (b.word || b.affix minus '-')` (poison: `{a:'Sonne', link:'', b:'Blume', whole:'Sonnenblume'}` -> FAIL link; `SonnenBlume` -> FAIL casing); (2) every `vocabKey` resolves in `cache/manifest.json` with `bw:false`, has a locale entry, and is not in `B2_EXCLUDE`; (3) `link` in `links`; (4) sets A and B: 8 items, 16 distinct parts each (poison: two `-fish` in A -> FAIL); (5) hubs >= 2, satellites >= 3, all item wholes sharing `hub` on `side`; (6) foils are pictured words that are no item's whole and not `x + link + y` for any two pool parts (poison: foil `sunflower` -> FAIL); (7) 6 x `{title, instruction}`: no worksheet-word, title <= 70 unique in band, instruction <= 150 with an end mark; (8) `refuse.F1` forced for en, `refuse.F3` forced for pt/fr/it; (9) `affix` starts with `-`; `whole.vocabKey` may be absent ONLY for family/alterati.

**`tools/gate-compounds-data.js`** (node, every locale x face before a wave; prints items checked per cell, 0 checked = FAIL):
1. rendered `data-lcs-whole` re-derives from the bank, never from the page (poison: stamp `sunflowers` -> FAIL);
2. page uniqueness of parts (poison as (4) above);
3. F3 cross-product `a_i + link_i + b_j` (i != j) not in the locale pool nor in `crossOk` (poison: add `sunfish` to the pool with `sun`/`fish` on one page -> FAIL);
4. F1 >= 3 empty and >= 3 non-empty links (en never reaches this gate);
5. F4 exactly 6 `data-lcs-foil` chips from `foils[]`; no foil contains a pool whole;
6. F2 d2: `[data-lcs-seam]` count 0 (poison: the d1 tick at d2 -> FAIL);
7. every `<img>` resolves via `fileUri`; `manifest.themes[t].bw === false` (poison: `animals bw/cat` -> FAIL);
8. de tiles: `a` starts capital, `b` lowercase; other locales all-lower (poison: nl tile `Zon` -> FAIL);
9. F5 satellites distinct, hub on the declared side;
10. pool >= floor per cell (8 / 6 F3 / 6 + 6 F4) or the cell is recorded REFUSED, never filled.

**QA lint** (`qa/lints.js`): every row stamps `[data-ws-content]`; overflow, palette, min-text 9 px as today. Floors this file fixes: pictures >= 60 on F0/F1/F2, >= 48 chips on F3/F4, hub 72; ruling glyphH 26. Px layout belongs to the design file.

## E. SEO

| face | title pattern | meta MIDDLE (120-170) | h1 / eyebrow / strand | hub coordinate |
|---|---|---|---|---|
| base | `Compound Words: Picture + Picture` · `Zusammengesetzte Nomen: Bild + Bild` · `Yhdyssanat: kuva + kuva` · `Familia de palabras: raíz y terminación` · `Diminutivo e aumentativo` | instruction if it fits, else `skill-sentences.<loc>.compound-words.full` | title / G2 label / `Vocabulary Acquisition and Use` row of `strand-names.ts` (measured present: de `Wortschatz untersuchen`, fr `Le lexique`, es `Ampliación del vocabulario`, pt `Ampliação do vocabulário`, it `Lessico`, nl `Woordenschat en woordvorming`) | `{type:'compound-words', mode:'base', level:G2}` (no theme) |
| F1 | `Join the Words: The Letter in the Middle` · `Fugen-s und Fugen-n` · `Tussen-n in samenstellingen` · `Yhdyssanan alkuosa` · es `Cambia la vocal` | "both words are printed; write the joint and the whole word" | G2 | `{…, mode:'joint'}` |
| F2 | `Split the Compound Word` · `Zusammengesetzte Wörter zerlegen` · `Jaa yhdyssana osiin` · fr `Retrouve le mot-base` | "the whole word is printed; find the two words inside" | G2 | `{…, mode:'split'}` |
| F3 | `Match the Halves` · `Wortteile verbinden` · `Yhdistä sanan osat` · es `Une la raíz con su familia` | "draw a line from the first picture to the second, then write the word" | G2 | `{…, mode:'match'}` |
| F4 | `Compound Detective` · `Echte zusammengesetzte Wörter finden` · `Onko se yhdyssana?` · fr `L'intrus de la famille` · pt `-inho que não é diminutivo` | "twelve words, six are real compounds: circle them and write their parts" | G2 | `{…, mode:'detective'}` |
| F5 | `Word Web: One Word, Many Compounds` · `Wörter mit Fisch, Blume, Ball` · `Yhdyssanoja sanasta kala` · es/fr `Árbol / Arbre de la famille` | "one word in the middle, four pictures around it: write the four new words" | G2 | `{…, mode:'web'}` |

Titles <= 70, no worksheet-word, unique per band, no theme (themeless type); JSON-LD `LearningResource`, `educationalAlignment.targetName` = L.2.4.d (en; L.2.4.c for family/alterati) or the framework NAME, no `targetUrl` (§22.1).

Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-231 Build the Word | LETTER tiles make one word there; two PICTURES make a new word here, no tiles | 0.15 |
| F1 vs G1-249 Unscramble the Sentence | a sentence in the wrong order there; exactly two words and the letter between them here | 0.15 |
| F2 vs G1-305 Syllable Division | a syllable is a sound unit (`Son-nen-blu-me`); a seam is a MEANING unit (`Sonne|blume`); "syllable" never in copy | 0.25 |
| F3 vs K-225 / `visual-matching` | word-to-picture there; two pictures make a third word here; "halves" | 0.20 |
| F4 vs G2-315 F2 Rule Detective | rule graphemes there; "is it made of two words?" here; foils are look-alikes not rule breaks | 0.20 |
| F5 vs G1-306 Word Families | rime tables (`-at`) there; whole WORDS combine here; de avoids `Wortfamilie` | 0.25 |
| es/fr family vs G2-315 F5 | derivation (new word, new meaning) vs inflection (plural); "nueva palabra" / "nouveau mot" | 0.20 |
| pt/it alterati vs `comparing-sizes` | sizes compare objects, no writing; here the size is an ENDING the child writes | 0.15 |

Boundary sentence per shape: "Two words make a new word with a new meaning" / "One root, many words" / "The ending makes it small or big".

## F. OPEN QUESTIONS + SUMMARY

1. **Opaque compounds** (`bluebell`, `buttercup`, da `fårekylling`, sv `gräshoppa`): real but not the sum of the parts. Proposal: allowed in F2/F4 (analysis), never in F0/F3 (meaning-synthesis); `opaque:true` per item, panel confirms.
2. **fi gradation** (`aurinko` -> `auringon`): the stem change cannot be "written in the box". Proposal: graded genitives set B only; set A uses ungraded ones (`sateen`, `karhun`, `talon`). Panel decides.
3. **fi "yhteen vai erikseen" / en open compounds**: 0 pictured pairs; needs authored two-word phrases and a wrong spelling printed. Not a face; candidate later type (fi head A).
4. **de Fugen-s exemplar**: both-pictured = 0; the panel supplies >= 3 one-part Fugen-s items with a pictured whole, or F1 ships Fugen-n only and the title drops "Fugen-s".
5. **da F5 at the floor**: hubs of exactly 3; ship 2 x 3 (config, recorded) or the panel adds one-part satellites.
6. **it may revert to "famiglie di parole"** if it bands classe terza; schema supports it (`shape:'family'`), the slug changes.

**Summary.** G2-316 is a themeless, set-fanned G2 type: `picture + picture = word` for en/de/nl/sv/da/no/fi (audited both-pictured pools 20-27 per locale, 14-20 with disjoint parts, one-part pools 33-50, every link morpheme a panel literal), rebuilt as word families for es/fr and as diminutivo/aumentativo (alterati) for pt/it under ONE schema `{a, link, b, whole}`. Six faces: synthesis (base), the joint (F1, en refused), split (F2), match halves (F3, pt/fr/it refused), detective with pictured foils (F4), word web (F5); all CODE faces keyed on config flags, verified against the curated bank with page-level part uniqueness. Compounds are never syllables, never letter tiles, never plurals: the three boundaries the copy and the gates enforce.
