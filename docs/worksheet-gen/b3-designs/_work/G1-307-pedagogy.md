# G1-307 `opposites` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 unless marked *est.* Sources: `scripts/worksheet-gen/data/b2/word-classes.js` (`WORD_CLASSES[loc].adjectives`, 28-32 per locale), `data/b2/sentences.js` (names, frames), `cache/manifest.json` + `image-cache/resolve.js labelSafeNouns`, the pictures themselves (opened with the Read tool), `REFERENCE TRANSLATIONS/image-vocabulary.js` via `loadVocab()`, `types/_shared/size-compare.js`, `data/science/hot-vs-cold.json`, `frontend/config/topics-taxonomy.json`. Scratch script: `g1307-pairs.js` (read-only).

**Boundary (load-bearing).** This type is LEXICAL: the child reads, writes, matches or chooses the WORD that means the opposite. The interactive `big-small` app (§14.10, `apps.big-small` subject `logic`, age 3-5) and K-032..K-037 (`size-compare.js`: circle the biggest / write 1..N under same-noun icons at `SCALE_LADDER` scales, no words at all) own SIZE COMPARISON of pictures; `data/science/hot-vs-cold.json` + `day-vs-night.json` own the picture SORT into two labelled bins (no words written). Every face below prints or elicits a word, and no face asks the child to compare sizes or sort pictures.

**Four load-bearing measurements.**
1. **The word-classes adjective bank yields only 3-6 clean antonym pairs per locale** (both members present): en 4 (big/small, hot/cold, fast/slow, loud/quiet) · de 4 · es 3 · fr 4 (+propre/sale) · pt 3 · it 3 · nl 4 · sv 4 · da 3 · no 6 (+lang/kort, tung/lett) · fi 4. A further 11-16 concepts per locale have ONE member in the bank (heavy, wet, soft, sweet, brave, tiny, sleepy, shiny, bumpy, clever, gentle...). So `data/b3/opposites.js` is its OWN bank: the panel authors ~20 pairs, reusing bank spellings where they exist (validator cross-check), never reading `word-classes.js` at render.
2. **Picture support is locale-neutral and small: 9 pairs are pictureable on the palette, 2 more *est.*** big/small = one noun at two `SCALE_LADDER` scales (1.0 / 0.42) · hot/cold = `weather/sun` + `weather/snowflake` (the `weather/cold` file is a PENGUIN in a hat and `weather/hot` is a second sun: both REFUSED as pair art) · happy/sad = `emotions/happy` + `emotions/sad` (read: clear) · fast/slow = `zoo animals/cheetah` + `forest creatures/snail` · heavy/light = `zoo animals/elephant` + `easter/feather` · day/night = `space/sun` + `space/moon` (nouns) · full/empty = `primitives/jug.js` at `value:max` / `value:0` · sunny/cloudy = `weather/sunny` + `weather/cloudy` (a sun, a cloud) · soft/hard = `around the house/pillow` + `camping/rock` · *est.* sweet/sour = `At the Supermarket/candy` + `fruits/lemon`, black/white = `colors/black` + `colors/white` (paint drops; read: black is a drop). `sun` backs THREE pairs (hot, sunny, day): at most one of them per page (validator). Not pictureable: tall/short (a scaled noun reads as big/small), long/short (art is never stretched), wet/dry, open/closed, on/off, young/old (no `grandmother`/`old` file), clean/dirty (no recolouring), loud/quiet, new/old.
3. **Gender: 19/30 es · 22/32 pt · 20/30 it · 22/30 fr bank adjectives inflect** (rule est.: -o ending, fr non -e). Nordic adjectives take -t / -a (stor/stort/stora; liten/litet/små is SUPPLETIVE). So chip faces print the citation form only (masc. sg. / indefinite common sg. / fi nominative sg.), and the sentence face never lets code put an adjective next to a noun (section B, F2).
4. **No theme reaches a page**: weather backs 3 pairs (hot/cold, sunny/cloudy, day/night, sharing `sun`), emotions 1 (happy/sad; tired/angry/scared have no clean pictured antonym), every other theme 0-1. `themeAxis:{applicable:false}` on all six faces; a themeless type emits ONE instance per (type, difficulty, locale) (`enumerate.js:19-21`).

## A. IDENTITY

| field | value |
|---|---|
| family key | `opposites`. ABSENT from `topics-taxonomy.json` (`apps.*` + `axes['exercise-type']`, grep = 0): register `apps.opposites = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'opposites'}` + slug/name x11 before the wave. `word-classes` (subject letters, 7-9) is the nearest registered sibling. |
| band | base G1-307 = G1. Faces: F1 picture match = **K** (`K-325+ TBD`), F2/F3/F4 = G1 (`G1-311+`), F5 prefix = **G2** (`G2-320+`). Level key per face from `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`). |
| theme axis | OFF (measurement 4); the fan lever is the PAIR SET (section B). |
| CCSS (en, honest) | The only antonym code is **L.K.5.b** (relate frequently occurring adjectives to their opposites). F1 (K) carries it. Base/F2/F3/F4 (G1): L.K.5.b restated as the skill + **L.1.5** umbrella (clarify word meaning) and **L.1.6** (use acquired words); no invented G1 antonym code. F5: **L.1.4.b** (frequently occurring affixes as a clue to meaning), honest on a grade-2 page. Non-EN landings name the national framework only (§20.10). |
| data | `data/b3/opposites.js` (section D). Pictures via `fileUri(theme, noun)`; `jug()` for full/empty; `B2_EXCLUDE` applies to every picture noun. |

| loc | genre head (title root) | ASCII slug | base level | national strand (name only) |
|---|---|---|---|---|
| en | Opposites (F5 "Antonyms") | `opposites` | grade 1 (F1 kindergarten = the A head) | Language: vocabulary acquisition |
| de | Gegenteile (F3 "Gegensatzpaare") | `gegenteile` | 1. Klasse | Lehrplan Deutsch: Sprache und Sprachgebrauch untersuchen (Wortbedeutung) |
| es | Antónimos (F4 "Sinónimos y antónimos", the paired head) | `antonimos` | primer grado | SEP/NEM Lenguajes: vocabulario, palabras de significado contrario |
| pt | Antônimos (F4 "Sinônimos e antônimos") | `antonimos` | 1º ano | BNCC Língua Portuguesa: análise linguística/semiótica, sinonímia e antonímia (code UNKNOWN, panel cites) |
| fr | Les contraires (F3 "mots de sens contraire") | `les-contraires` | CP | programmes cycle 2: lexique, mots de sens contraire |
| it | I contrari (F4 "sinonimi e contrari") | `i-contrari` | classe prima | Indicazioni: lessico, parole di significato contrario |
| nl | Tegenstellingen | `tegenstellingen` | groep 3 (F1 kleuters) | SLO kerndoel 12: woordenschat |
| sv | Motsatsord | `motsatsord` | åk 1 | Lgr22 svenska: ord och begrepp |
| da | Modsætninger (modsatte ord) | `modsaetninger` | 1. klasse | Fælles Mål dansk: sprogforståelse, ordkendskab |
| no | Motsetninger (motsatte ord) | `motsetninger` | 2. trinn | LK20 norsk: ord og begreper |
| fi | Vastakohdat | `vastakohdat` | 1. luokka | OPS 2014 äidinkieli: kielitieto, sanavarasto |

es/pt: "sinónimos y antónimos" is ALWAYS paired in the SERP (`_PANEL-FINDINGS.md` §6). The base keeps the bare "antónimos" head; F4 (antonym vs synonym choice) owns the paired head. Nothing on this type teaches synonyms as a skill (a synonym appears only as the DISTRACTOR that proves the child knows what "opposite" means).

## B. THE SIX FACES

Layout units on the 703x760 body: `cardGrid` 2x4 (cards ~335x170), `wordBank({words})` banner (`components-b2.js:210`, 44 px), `answerBox({w,h})` (`components.js:105`), `writingRow({w,h,glyphH})` (`trace-path.js:681`), `.ws-match` columns (`page.css:354`), `.ws-tile ws-tile--word` chips (G2-275 shape, 44 px high, 17-20 px Nunito 800), `jug()` (`primitives/jug.js`). NEW in `templates/components-b3.js`: `pairCard({a, aPic, answerW})` (word chip + optional picture 72 px + one dashed box), `chipMesh({chips, cols:4, rows:3, chip:150x52})` (F3), `choiceRow({target, chips:3})` (F4), `prefixRow({base, prefix, glyphH})` (F5). G1 floors: element 44 / answer 26 / 6-12 items (`_tokens.js:69`); K face 56 / 30 / 4-8.

| # | id / slug | EN title (<=70, no "worksheet") | teaching move | what the child does at d2 |
|---|---|---|---|---|
| F0 | G1-307 `opposites` | Write the Opposite | RECALL + WRITE: read a word, retrieve its antonym from a bank, write it | bank of 8 answers (shuffled) over 8 `pairCard`s 2x4: printed word (picture beside it where the pair is pictured), dashed box 150x44; writes 8 words |
| F1 | K-3xx `opposites-picture-match` | Match the Opposite Pictures | RECOGNISE the relation on pictures + words, no writing | 6 pairs in two `.ws-match` columns: left picture 88 px + word, right = the OPPOSITE picture + word, deranged; draws 6 lines |
| F2 | G1-3xx `opposites-sentence` | Opposites in a Sentence | USE the antonym in context: a negated frame forces the opposite | 6 frame rows: picture 64 + "The elephant is not small. It is ___." + `answerBox` 150x44; bank of 6; writes 6 words |
| F3 | G1-3xx `opposites-pair-up` | Pair Up the Opposites | RECOGNISE word-to-word with no picture and no column alignment (12 words, 6 hidden pairs) | `chipMesh` 4x3 of 12 word chips; draws 6 lines joining each word to its opposite |
| F4 | G1-3xx `opposites-or-same` | Opposite or Same? Circle the Opposite | DISCRIMINATE antonym from synonym (the es/pt "sinónimos y antónimos" head) | 8 `choiceRow`s: target word, 3 chips (antonym, near-synonym, unrelated); circles 8 chips |
| F5 | G2-3xx `opposites-prefix` | Make the Opposite with un- | MORPHOLOGY: build the antonym from a prefix (L.1.4.b) | prefix chip "un-" + 8 `prefixRow`s: base word, `writingRow` 300x56 glyphH 26; writes 8 prefixed words |

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 6 cards, every card pictured (tier 1 only), bank 6 | 8 cards, >=3 pictured, tiers 1-2, bank 8 | 10 cards, tiers 1-3, bank 12 (2 far distractors), font 17 | none (`cards`, `tiers`, `bankExtra`) | base |
| F1 | 4 pairs, tier 1 pictured | 6 pairs pictured | 7 pairs, words hidden on the RIGHT column | `mode:'pictureMatch'`, `hideRightWord` | CODE |
| F2 | 4 frames, pictured | 6 frames, bank 6 | 8 frames, no bank | `mode:'sentence'`, `bank:bool` | CODE |
| F3 | 8 chips 4x2 | 12 chips 4x3 | 16 chips 4x4, tiers 1-3 | `mode:'mesh'`, `chips` | CODE |
| F4 | 6 rows, 2 chips (antonym + unrelated) | 8 rows, 3 chips (+ near-synonym) | 8 rows, 3 chips, unrelated = same semantic field | `mode:'choice'`, `chips`, `synonym:bool` | CODE |
| F5 | 6 rows, prefix printed on every row | 8 rows, prefix chip once at the top | 10 rows; en/es/pt/fr/it: prefix bank of 2-3, child picks the prefix; de/nl/sv/da/no/fi have ONE productive prefix so d3 = d2 + 10 rows (recorded, not faked) | `mode:'prefix'`, `prefixBank` | CODE |

Guards key on `d.mode`, never the level index; `data-lcs-mode` is stamped only when declared so the base stays byte-identical; `tools/gate-variation-distinct.js` sees five distinct resolved d2 configs (different `mode`).

### verify() rules (answers are re-derived from stamps; the pair set is a curated bijection)

Common: root `<div data-ws-content data-lcs-pairs='["big-small",...]'>`; every item stamps `data-lcs-pair`, `data-lcs-word` (printed), `data-lcs-answer` (hidden). Pairs on a page are DISJOINT (no word in two pairs, no pair twice) = uniqueness by construction; every `img.complete && naturalWidth > 0`; no B&W path; no `<img>` from a noun used twice on the page; no text node outside the bank equals a hidden answer.
- F0: bank word set === answer set (plus declared `bankExtra` words, none an antonym or synonym of any printed word); bank order != card order (a derangement over the 8); boxes empty; d2 pictured cards >= 3.
- F1: right column is a permutation of left with no fixed point; each row's `data-lcs-right` is the pair's `b`; both pictures resolve; `sun` (or any noun) once per page; K floors (icon >= 56).
- F2: frame text contains `a` literally and NOT `answer` (leak); answers distinct across the 6 rows; bank === answers; every frame's `pic` resolves. **Agreement trap avoided by construction:** the panel writes the WHOLE sentence with its own subject and a stored `answer` literal; the code never puts an adjective beside a noun it chose, so `{name}` is not used (names carry gender: "Sofía no es pequeño" would be wrong). de/nl predicative adjectives never inflect; fi/Nordic frames are singular with a common-gender or neuter subject the panel wrote the form for; es/pt/it/fr frames use an object subject and the answer literal may be feminine ("A girafa não é baixa. É ___ (alta)"), in which case the bank prints "alta" (bank = the frames' answer literals, never the citation form).
- F3: 12 chips = 6 stamped pairs, each chip in exactly one; no pair horizontally adjacent or vertically adjacent in the grid (a 20-seed sweep must place >= 4 of 6 pairs non-adjacent; adjacent-count === 0 at d2 is asserted).
- F4: exactly one chip per row equals `b`; the synonym chip is in `pair.syn` and NOT in any pair's `b` for that `a`; the unrelated chip is a bank word from another semantic field; correct index is not constant over the 8 rows.
- F5: `expected === prefix + base` OR `expected` is the stored literal with `expected.endsWith(base)` and `prefix` in `prefixes[]` (it `s-fortunato`, fr `im-poli`); no row's `base` is itself prefixed; `writingRow` present, no answer text.

### Refusal per locale (pool floors: F0 8 pairs of which 3 pictured · F1 6 pictured · F2 6 frames · F3 12 distinct words · F4 8 rows with `syn` · F5 8 prefix items)

| locale | pictured pairs available (universal set, minus word gaps) | word-only pairs (bank + panel, *est.* target 20) | prefix items *est.* | refusals |
|---|---|---|---|---|
| all 11 | 9 pictured + 2 *est.* (measurement 2); no word gap found for any member | bank gives 3-6, panel adds 14-17 | >= 8 per locale (section C lists the prefixes) | none expected; F5 d3 prefix-choice refused in de/nl/sv/da/no/fi (one prefix); an F4 row without a G1-legible near-synonym is dropped, never filled |

Refusal is a DATA decision: a face below its floor in a locale drops from that locale's wave and is recorded in the design index, never padded.

**Fan lever.** The pair SET: nt20-C ships one d2 deck per face; the tail is `pairSet` (tier 1 concrete / tier 2 feelings and textures / tier 3 abstract) and, for F5, the PREFIX (`un-`, `dis-`, `in-`; `s-`/`in-`/`dis-` it). Both are additive wave knobs of the K-317 `letterAxis` shape (`enumerate` loops `pairSet` into `instance`, `variant_id` gains `-<set>`); until then the exemplar set ships.

**Query face per market.** F0 bare head + "write" · F1 "pictures" · F2 "in a sentence" · F3 "pair up" / "Gegensatzpaare" · F4 "opposite or same" / "sinónimos y antónimos" · F5 the prefix string (section E).

**Rejected non-moves.** Theme swap · same-noun scaled rows "circle the big one" (K-032/K-040, `big-small` app: comparison, not lexis) · hot/cold, day/night picture sort into bins (`science-category-sort`, no word) · antonym crossword-lite (box count reveals the answer; unequal word lengths across 11 locales; collides with K-224/K-231 letter faces) · cut-and-paste pairs (same move as F3 with scissors) · classic odd-one-out over antonyms (a row [big, small, huge] has two defensible answers) · "draw the opposite" (open-ended, no verify, and it becomes size comparison again) · base d3 relabelled as a face (more cards, same move).

## C. NATIVE REBUILD x11

Citation form printed on chips: es/pt/it/fr masculine singular (no picture NOUN ever printed beside it, so no agreement); nl/de uninflected; sv/da/no indefinite common singular; fi nominative singular. ~20 pairs = 3-6 bank pairs (measured) + panel pairs from the 21-concept list in `g1307-pairs.js` (big/small ... gentle/rough) plus the noun pairs day/night, full/empty.

| loc | bank pairs (measured) | pictured pairs usable | prefix antonyms (panel authors; *est.* examples) | refusal rule | traps |
|---|---|---|---|---|---|
| en | big/small hot/cold fast/slow loud/quiet | all 9 (+2 est.) | un- (happy, kind, safe, fair, tidy, lucky), dis- (honest, obey), in- (visible) | F4 rows without a G1 synonym drop | big/LITTLE vs big/small: the bank fixes `small` as THE answer, `alt:['little']` only in the answer-key note; "short" is the antonym of BOTH tall and long: never both on one page (validator `exclusiveWith`) |
| de | groß/klein heiß/kalt schnell/langsam laut/leise | 9 | un- (glücklich, freundlich, ordentlich, gesund, ruhig, bekannt, ehrlich, sichtbar) | none | head is "Gegenteile" / "Gegensatzpaare", not "das Gegenteil"; adjectives lowercase on chips, capital only sentence-initially in F2; DaZ register welcome (B tier) |
| es (MX) | grande/pequeño caliente/frío rápido/lento | 9 | in-/im- (feliz, posible, cómodo, paciente), des- (ordenado, conocido, obediente) | none | MX prefers **chico** to pequeño: panel decides ONE and the bank spelling follows; `caliente` NEVER with a person subject in F2 (MX reading); titles carry "antónimos"; masc. sg. on chips |
| pt (BR) | grande/pequeno quente/frio rápido/lento | 9 | in- (feliz, possível), des- (arrumado, conhecido, obediente), im- (paciente) | none | "antônimos" with circumflex (BR); F2 subjects with gender-fixed nouns ("O elefante não é pequeno. É ___") |
| fr | grand/petit chaud/froid rapide/lent propre/sale | 9 | in-/im- (connu, visible, possible, poli, patient), dé- (faire), mal- (heureux, honnête) | none | content/triste is the CP pair (heureux/malheureux moves to F5); "mots de sens contraire" is the programme term; F2 avoids liaison-sensitive frames; `im-` before p/b/m is a stored literal |
| it | grande/piccolo caldo/freddo veloce/lento | 9 | s- (fortunato, contento), in- (felice, possibile), dis- (ordinato, onesto, attento) | none | "i contrari" is the classe-prima head, "sinonimi e contrari" the F4 head; `s-` join is a stored literal |
| nl | groot/klein heet/koud snel/langzaam luid/stil | 9 | on- (gelukkig, eerlijk, rustig, beleefd, gezond, bekend, veilig, handig) | F5 d3 refused (one prefix) | `warm`/`koud` is the school pair in groep 3 (heet is bank): panel picks; F1 at kleuters is the demand head |
| sv | stor/liten varm/kall snabb/långsam hög/tyst | 9 | o- (lycklig, vänlig, snäll, trevlig, säker, känd, artig, rättvis) | F5 d3 refused | **`orolig` = worried, NOT "not funny"**: `rolig` is banned from F5 (validator `prefixBan`); `liten` has suppletive `lilla/små`: chips print `liten`, F2 subjects singular common gender; "motsatsord" (all incumbents paid) |
| da | stor/lille varm/kold hurtig/langsom | 9 | u- (venlig, høflig, sikker, kendt, rolig, sund, heldig, ærlig) | F5 d3 refused | "ked af det" (sad) is three words: chips allow spaces (`/^[\p{L}\- ]+$/u`), F3 mesh chip width 150 fits 12 letters at 18 px (engineer measures); `urolig` = restless (fine, but panel confirms it is not "worried" in the child's reading) |
| no | stor/liten varm/kald rask/langsom høy/stille lang/kort tung/lett | 9 | u- (vennlig, høflig, sikker, kjent, rolig, sunn, heldig, lykkelig) | F5 d3 refused | bokmål only; `glad/trist` or `glad/lei seg` (panel); band 2. trinn (Nordic +1) |
| fi | iso/pieni kuuma/kylmä nopea/hidas kovaääninen/hiljainen | 9 | epä- (rehellinen, siisti, kohtelias, tavallinen, selvä, varma, mukava, reilu) | F5 d3 refused; `-ton` caritive NOT used (too advanced) | head "vastakohdat" (vastakohta sg. in the instruction); F2 frames "X ei ole pieni, vaan iso." (`vaan`, not `mutta`); no case problem because the adjective is predicative nominative; `kovaääninen` is long: F3 chip 150 px holds it at 16 px (measure) |

Panels author `pairs[]`, `frames[]`, `prefix.items[]`, six titles (genre head, <=70, no worksheet-word) + instructions (<=150, the child's sentence). The EN is handed over as a SOURCE TO AUDIT.

## D. DATA + GATES

`data/b3/opposites.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; en hand-authored; `data/` gitignored, force-add):
```
OPPOSITES[loc] = {
  pairs: [{ id:'big-small', a:'big', b:'small', tier:1, pos:'adj'|'noun', alt:['little'],   // alt = answer-key note only
            exclusiveWith:['long-short'],                                                  // never on one page
            syn:{ a:'huge', b:'tiny' }, far:'red',                                         // F4 distractors (syn optional)
            pic:{ kind:'scale', theme:'zoo animals', noun:'elephant', scales:[1.0, 0.42] }  // big-small
               | { kind:'two', a:{theme:'weather',noun:'sun'}, b:{theme:'weather',noun:'snowflake'} }
               | { kind:'jug', a:{value:400,max:400,step:100}, b:{value:0,max:400,step:100} } }],
  frames: [{ pair:'big-small', text:'The elephant is not small. It is ___.', answer:'big', pic:{theme:'zoo animals',noun:'elephant'} }],
  prefix: { prefixes:['un','dis','in'], items:[{ base:'happy', prefix:'un', expected:'unhappy' }], ban:['rolig'] },
  strings: { 'G1-307':{title,instruction}, F1..F5:{...} } }
```
**`tools/validate-b3-draft.js` (opposites block; all rules run, exit 1 on any):** (1) `pairs` is a bijection: every word in exactly ONE pair, `a !== b`, ids unique, `exclusiveWith` ids exist; (2) `a`/`b` match `/^[\p{L}\- ]+$/u`, <= 14 chars, lowercase except de sentence-initial in `frames`; (3) every `pic` resolves: `fileUri(theme, noun)` exists, noun not in `B2_EXCLUDE[loc]`, theme carries no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`), `jug` values on a tick; `scale` kind has 2 scales with ratio >= 1.3 (`SCALE_LADDER` neighbours); (4) >= 6 pictured pairs after `exclusiveWith` and the one-noun-per-page rule (else F1 refused, reported); (5) `frames`: `text` contains `a` and not `answer`; `answer` is `b` or a declared inflected literal of `b` (`pairs[].forms` lists it); >= 6 frames with distinct answers; (6) `syn.a/syn.b` not equal to any pair member of the SAME concept, not in `far`; >= 8 pairs with `syn` else F4 refused; (7) `prefix.items`: `expected` starts with a listed prefix and ends with `base`; `base` not in `ban`; `base` not itself in `pairs` as a member whose partner is a different word (un-happy vs sad: allowed only if `pairs` has no happy/sad, else the page teaches two answers); >= 8 items or F5 refused; (8) bank-spelling cross-check: a word present in `WORD_CLASSES[loc].adjectives` must be spelled identically; (9) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150.
**`qa/verify-b3-opposites.js`:** renders face x 11 locales at d2; `verify()` empty, `qa/lints.js` clean, density floors asserted itself (`.ws-icon` >= 44 G1 / 56 K; chips >= 44 high; boxes >= 26); 20-seed sweep: F0 bank never in card order, F3 adjacency 0, F4 correct index takes all 3 values. **Poison** (each must FAIL; the correct draft is the control): P1 `small` placed in two pairs (`big-small` + `tiny-small`); P2 F2 frame "The elephant is not small. It is big." (answer leaked); P3 `pic.b = {theme:'weather', noun:'cold'}` (the penguin file: passes the file check, so P3 is a PANEL gate: every pair picture opened by a human, sv #35 lesson, recorded in the draft as `picOpened:true` and asserted); P4 sv prefix item `rolig -> orolig`; P5 F4 syn `little` for `big/small` (a second correct answer); P6 `sun` backing hot AND sunny on one page; P7 a `zoo animals bw` noun. P3 shows the validator cannot see a wrong picture: the human open is part of the gate, not a courtesy.
**Page reads:** `data/b3/opposites.js[loc]` only, `fileUri`, `jug`; never `image-vocabulary.js` or `word-classes.js` at render.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (whole description 120-170; the instruction, said to the child) | coordinate |
|---|---|---|---|
| F0 | head + "write": "Opposites: Write the Opposite Word" · "Gegenteile: das Gegenteil schreiben" / "Antónimos: escribe el contrario" / "Motsatsord: skriv motsatsen" · "Vastakohdat: kirjoita vastakohta" | Read each word and write its opposite from the word bank in the box | `{type:'opposites', mode:null, theme:'', level:'grade-1'}` (per-locale key) |
| F1 | head + "with pictures" / "mit Bildern" / "kleuters" / "con dibujos" / "med bilder" / "kuvilla" | Draw a line from each picture to the picture and word that show its opposite | `level:'kindergarten'` (K key per locale) |
| F2 | head + "in a sentence" / "im Satz" / "en oraciones" / "dans une phrase" / "i meningar" / "lauseessa" | Finish each sentence with the opposite of the word that is crossed out | grade-1 |
| F3 | "Pair Up the Opposites" · "Gegensatzpaare finden" / "Une las parejas de antónimos" · "Relie les contraires" / "Para ihop motsatsorden" · "Yhdistä vastakohtaparit" | Draw a line between the two words that are opposites until every word has a partner | grade-1 |
| F4 | "Opposite or Same? Circle the Opposite" · "Gegenteil oder gleich?" / "Sinónimos y antónimos: encierra el antónimo" · "Sinonimi e contrari: cerchia il contrario" / "Motsats eller samma?" · "Vastakohta vai sama?" | Circle the word that means the opposite, not the one that means the same | grade-1 |
| F5 | "Antonyms with un-, dis- and in-" · "Gegenteile mit der Vorsilbe un-" / "Antónimos con des- e in-" · "I contrari con s-, in- e dis-" / "Motsatsord med o-" · "Vastakohdat epä-alkuliitteellä" | Add the prefix to each word and write the new opposite word on the line | grade-2 |

h1 = title; eyebrow = level label; strand: en Language (vocabulary) · de Sprache untersuchen · es Lenguajes · pt Língua Portuguesa · fr Lexique · it Lessico · nl Woordenschat · sv Ord och begrepp · da Sprogforståelse · no Ord og begreper · fi Kielitieto ja sanavarasto. JSON-LD `educationalAlignment` en only: F1 L.K.5.b; F0/F2/F3/F4 L.1.5 (+ prose names L.K.5.b as the skill); F5 L.1.4.b. `topicMeta.opposites` (>= 50 chars) and `skill-sentences.en.json` entries registered by `tools/register-b3-en-content.js`. Meta lead ("Free printable") inherits the live `seo.words.free_printable` (README open item 1).

**Non-cannibalisation.** F0 owns the bare head + "write"; F1 "pictures" (and the K level); F2 "sentence"; F3 "pairs"; F4 the synonym contrast (es/pt/it paired head); F5 the prefix string. Boundaries: **comparing-sizes K-032..037** and the **`big-small` app** compare PICTURES with no word (their titles say big/small/tall/long; ours say opposites/antonyms and never a size word in the title); **word-classes G2-275** sorts words by CLASS (noun/verb/adjective) and never pairs them; **science hot-vs-cold / day-vs-night** sort pictures into two bins with no writing (F1 draws lines between PAIRS with the word printed on both ends, and `sun`/`snowflake` appear together with their words); **K-225** matches a word to its OWN picture (identity), F1 to the OPPOSITE picture; **K-319 emotions** teaches feeling words, F0/F1 use only happy/sad as one pair.

## F. OPEN QUESTIONS + SUMMARY

1. **en band split.** The en A-head is "opposites worksheets kindergarten/preschool" and the only CCSS antonym code is K; the type id is G1-307. Proposed: F1 carries the K head (K id), F0-F4 grade-1, F5 grade-2 ("antonyms 2nd grade", the second en head). Confirm before the emitter assigns ids.
2. **es register: chico vs pequeño** (MX). Bank has `pequeño`; SEP classroom usage prefers `chico`. Panel decision; the validator cross-check (rule 8) must then accept a declared override.
3. **pt BNCC code** for antonímia is UNKNOWN to this pass; the panel cites the habilidade or names the framework only.
4. **F5 band in fr/it/nl.** Prefix work is CE1/CE2 in France and classe seconda in Italy; the face is G2 by design, but a panel may band it up or refuse it; refusal is allowed (F5 buildable in >= 4 locales regardless).
5. **F3 chip width** at 150 px for `kovaääninen` (fi) and `ked af det` (da): engineer must measure the fit at 16-18 px Nunito 800.
6. **Sweet/sour and black/white pictures** are *est.*: the panel opens `candy`, `lemon`, `colors/black`, `colors/white` and rules them in or out per locale (a black paint drop must read as "black", not "drop").

**Summary.** A LEXICAL antonym family: the word is always printed or written, never a size to compare or a picture to sort. Six moves: write from a bank (base, G1), match opposite pictures with words (K), finish a negated sentence (G1), pair up 12 loose words (G1), circle the antonym against a synonym decoy (G1, the es/pt/it paired head), build the antonym with the locale's prefix (G2). The word-classes bank seeds only 3-6 pairs per locale (measured), so `data/b3/opposites.js` is panel-authored (~20 pairs, 6+ frames, 8+ prefix items); 9 pairs are pictureable on the palette and `sun` may back only one pair per page. Agreement is designed out: chips print citation forms, frames are whole authored sentences with a stored answer literal, code never inflects. Gates: bijection + picture + leak + prefix-ban validators with 7 poison cases, and the human open of every pair picture (`weather/cold` is a penguin).
