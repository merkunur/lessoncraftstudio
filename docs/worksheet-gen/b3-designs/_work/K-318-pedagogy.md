# K-318 `sound-boxes` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 from `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json` joined to `lib/b2-common.js entriesFor(theme, loc)` on `entry.vocabKey === approved.key`, unless marked *est.* Method: flatten nested `chunks`; where `chunks` is flat (== `split`), segment each syllable by letters plus a candidate multigraph list (es ch/ll/rr/qu/gu; pt nh/lh/ch/ss/rr/qu/gu; it gn/gl/sc/ch/gh/qu + doubles; fi ng/nk; da ng; en/fr letters only). Words with space/hyphen are dropped (0-2 per locale: `t-Rex`, `t-shirt`).

**Load-bearing measurement:** grapheme-per-syllable `chunks` exist ONLY in de/nl/sv/no (the chunk-table locales). In en/es/pt/fr/it/da/fi `chunks` equals `split` (syllables, no grapheme layer). sv/no keep double consonants as two graphemes (`katt` = k,a,t,t); de splits `tz` across syllables (`Katze` = k,a,t / z,e). da `policy_managed:false` never occurs: the strict pool is the 402 entries where the field is ABSENT (392 are `true`).

## A. IDENTITY

| field | value |
|---|---|
| family key | `sound-boxes` (NEW `apps.sound-boxes` + `axes['exercise-type'].sound-boxes` in `topics-taxonomy.json`; subject `letters`, age `5-7`; registrar pattern `tools/register-b2-taxonomy.js`) |
| band | base + 2 faces K; 3 faces G1 |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}`; minNouns is checked against the FACE pool (section B), not the vocab count |
| CCSS (en only) | F0 L.K.2.d (+RF.K.2.d on 3-grapheme words); F1 RF.K.2.d; F2 RF.K.2.c + L.K.2.d; F3 RF.1.2.d; F4 RF.1.3.e + RF.1.2.d; F5 RF.1.2.b + RF.1.3.b |
| data | approved-words only (brief line 14); raw vocab is read only for the picture + join key |

Per-locale identity (heads from `_PANEL-FINDINGS.md` section 2; slugs = proposal, the panel may rename):

| loc | native genre head | ASCII slug (base) | K label | G1 label | framework |
|---|---|---|---|---|---|
| en | Sound Boxes (Elkonin boxes) | `sound-boxes` | kindergarten | grade 1 | Common Core |
| de | Wörter in Laute zerlegen (Buchstabenkästchen) | `woerter-in-laute-zerlegen` | Vorschule | 1. Klasse | Lehrplan |
| es | Cajas de sonidos (conciencia fonológica) | `cajas-de-sonidos` | preescolar | primer grado | SEP/NEM |
| pt | Caixinhas de sons (consciência fonológica) | `caixinhas-de-sons` | educação infantil | 1º ano | BNCC |
| fr | Boîtes à sons (conscience phonologique) | `boites-a-sons` | maternelle (GS) | CP | programmes officiels |
| it | Scatole dei suoni (consapevolezza fonologica) | `scatole-dei-suoni` | infanzia | classe prima | Indicazioni nazionali |
| nl | Hakken en plakken | `hakken-en-plakken` | kleuters (groep 2) | groep 3 | SLO kerndoelen |
| sv | Ljuda ord (ljudning) | `ljuda-ord` | förskoleklass | åk 1 | Lgr22 |
| da | Lyd for lyd (lydrette ord) | `lyd-for-lyd` | børnehaveklasse | 1. klasse | Fælles Mål |
| no | Lydering | `lydering` | 1. trinn | 2. trinn | LK20 |
| fi | Äänteet laatikoihin | `aanteet-laatikoihin` | esikoulu | 1. luokka | OPS 2014 |

The axis `phonological-awareness` already owns `conciencia-fonologica` etc. as AXIS slugs; the landing slugs use the apparatus noun so none collides.

## B. THE SIX FACES

Layouts: K faces = full-width rows (6 x 118 px + 5 x 8 gap = 748 <= 760 body); picture 96 px, boxes 60 x 60 (K floor 56), gap 10. G1 faces = rows of 6 (F4, F5) or `cardGrid` 2 x 4 (F3), boxes 44 x 44 (G1 floor). New in `templates/components-b3.js`: `soundBoxRow({graphemes, box, gap, given, printed})` (the `letterBoxes` dashed-coral style), `soundDots({n:6, d})`, `syllableArcs({groups, box, gap, groupGap})`. Every card stamps `[data-ws-content]`.

| # | id / slug | band | working EN title | teaching move | what the child does (d2) |
|---|---|---|---|---|---|
| F0 | K-318 `sound-boxes` | K | Sound Boxes | Segment the spoken word and write ONE grapheme per box; the boxes give the count. | 6 rows; words of 3-5 graphemes; writes 18-30 graphemes per page |
| F1 | K-3xx (TBD) `sound-boxes-count-the-sounds` | K | Count the Sounds | Phoneme counting before writing: one dot per sound, no letters (nl hak-stippen). | 6 rows; 6 uniform empty dots per row; colours 2-5; writes nothing |
| F2 | K-3xx (TBD) `sound-boxes-first-sound-given` | K | Sound Boxes: First Sound Given | Onset given, the child segments the rime. | 6 rows; box 1 pre-printed (teal, solid); writes 2-4 graphemes per row |
| F3 | G1-3xx (TBD) `sound-boxes-six-box-strip` | G1 | Sound Strip: How Many Sounds? | Segment WITHOUT the count scaffold: every word gets the same 6-box strip; fill left-to-right, leave the rest empty. | 8 cards (2 x 4); words 3-6 graphemes; strip always 6 |
| F4 | G1-3xx (TBD) `sound-boxes-syllables-and-sounds` | G1 | Syllables and Sounds | Two-tier: syllable arcs above, grapheme boxes grouped under each arc. | 6 rows; 2-3 syllables, <= 7 graphemes |
| F5 | G1-3xx (TBD) `sound-boxes-blend-and-match` | G1 | Blend the Sounds | Reverse direction: boxes are PRINTED with graphemes; blend and circle the matching picture of three. | 6 rows; 1 target + 2 same-theme distractors; circles 6 pictures |

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | rows 4, g 3-4 | rows 6, g 3-5 | rows 6, g 4-6 | none | base |
| F1 | rows 4, g 2-4 | rows 6, g 2-5, dots 6 | rows 6, g 3-6 | `mode:'dots'`, `dots:6` | CODE |
| F2 | rows 4, g 3-4 | rows 6, g 3-5 | rows 6, g 4-6 | `given:'first'` | CODE |
| F3 | cards 6, g 3-5 | cards 8, g 3-6, strip 6 | cards 8, g 4-6 | `strip:6` | CODE |
| F4 | rows 4, syl 2, g <= 6 | rows 6, syl 2-3, g <= 7 | rows 6, syl 2-3, g 5-7 | `tier:'syllable'` | CODE |
| F5 | rows 4, g 3-4, 2 pics | rows 6, g 3-5, 3 pics | rows 6, g 4-6, 3 pics | `mode:'blend'`, `choices:3` | CODE |

No PARAM face exists: every genuine move here changes what is drawn, and the range-only candidates are rejected below. Knobs are stamped ONLY when declared (`data-lcs-mode` / `-given` / `-strip` / `-tier`) so F0 stays byte-identical; guards key on `d.strip`, `d.mode` etc., never on the level index. `tools/gate-variation-distinct.js` sees 5 distinct resolved d2 configs.

### verify() and re-derivation

Stamps per item: `data-lcs-vocab`, `data-lcs-word` (display form), `data-lcs-graphemes="k|a|t"` (case-folded), `data-lcs-n`; per face `data-lcs-given="0"`, `data-lcs-syl` + `data-lcs-groups="3|2"`, `data-lcs-target` / `data-lcs-choice` on F5 pictures.

- All: `graphemes.join('') === word.toLocaleLowerCase(loc)`; `n === graphemes.length`; `n` within resolved `d.minG..d.maxG`; item count === `d.rows` / `d.cards`; no repeated `data-lcs-word`.
- F0/F2/F3/F4: every `.sb-box` EMPTY of text except F2's `given` index (text === `graphemes[0]` in display case); F0 boxes === n; F3 boxes === 6 per card and n <= 6; F4 groups === `data-lcs-syl` === arcs, groups join === `split`.
- F1: 6 dots per row, no digit in the row, n in 2..6.
- F5: printed texts join === target word; exactly one picture with `data-lcs-vocab === target`; three distinct vocabKeys and words; distractors same theme.
- Re-derivation lives in `tools/gate-sound-boxes-data.js` (node), which recomputes every stamped word from the approved file + config and diffs against `data-lcs-graphemes`; `page.evaluate` cannot require modules.

### Refusal conditions (measured pool per face; cells = 7 themes x 11 locales)

| face | pool rule | cells < 8 | refused cells (loc theme = pool) |
|---|---|---|---|
| F0 / F2 / F5 | approved, single token, 3 <= g <= 5 | 8 / 77 | de fruits 6, de vehicles 7, es clothing 7, it clothing 5, sv fruits 4, da fruits 2, no fruits 3, fi fruits 4 |
| F1 | 2 <= g <= 5 | 8 / 77 | same cells (2-grapheme words are 0-2 per cell) |
| F3 | 3 <= g <= 6 | 4 / 77 | sv fruits 7, da fruits 5, no fruits 6, fi fruits 5 |
| F4 | `count` 2..3 and g <= 7 | 4 / 77 (est. on flat locales) | en vehicles 7, de vehicles 7, no vehicles 7; nl clothing 8 borderline |
| da, all faces | plus `policy_managed` ABSENT | F0 strict: animals 12, house 24, zoo 7, clothing 7, vehicles 6, toys 6, fruits 2 | da K faces ship on animals + around the house only (OQ 5) |

Themes with F0 pool >= 8 in all 11 locales: around the house (16-39), animals (13-19), toys (9-16), zoo animals (10-16); clothing 5-17 (refuses es, it); fruits weakest in 6 locales, fan it LAST.

### Fan lever + query face

Fan lever for every face = theme. Query face = the bare genre head (F0) plus ONE qualifier: F1 "count the sounds" (Laute zählen / hak-stippen / compter les sons / räkna ljuden); F2 "first sound given" (Anlaut vorgegeben / con el primer sonido / första ljudet givet); F3 "sound strip, how many sounds" (Lautleiste / klankstrook / ljudremsa); F4 "syllables and sounds" (Silben und Laute / lettergrepen en klanken / tavut ja äänteet); F5 "blend the sounds" (Laute zusammenziehen / plakken en lezen / ljuda ihop). Qualifiers are nouns of the apparatus or the act, never adjectives.

### Rejected non-moves

1. Theme swap (rule 1). 2. "Long words" 5-7 g: a range, not a move; the title would differ from F3 only by an adjective (rule 4). 3. Multigraph-focus page: multigraph words per theme sv 0-6, no 0-5, da 0-1, fi 0, pt 1-10 -> unbuildable in >= 5 locales (rule 3); multigraphs are handled in every face by the unit rule instead. 4. Middle box blanked = K-224 / K-227. 5. Trace the graphemes = K-284. 6. Write the whole word under the boxes = G1-244. 7. Capital-letter boxes: a case swap. 8. Re-labelling d1 (3-4 g) or d3 (4-6 g): ranges. 9. Arcs only = G1-305.

## C. NATIVE REBUILD x11

The unit is a per-locale DATA decision in `data/b3/sound-boxes.js`; the code never inflects and never guesses a multigraph outside the locale's list. One box per element of the derived array; de keeps the capital in box 1 (`displayWord`), all others lower-case; only F5 prints graphemes (the prompt; the answer is the picture).

| loc | data mode | box unit | multigraphs boxed as ONE (source) | panel authors | refusal | traps |
|---|---|---|---|---|---|---|
| de | nested chunks (545/1028 words carry one) | Laut per Fibel table | sch ch ck pf qu sp st tz ng nk ie ei ai au eu äu (`chunk-tables/de-chunks.json`) | remerge list, capital rule | absent from approved, or a chunk outside the table | `Katze` = k,a,t / z,e loses `tz` -> `remergeAcrossSyllable:['tz']`; `Fuchs` f,u,ch,s (chs = /ks/, panel); box 1 shows `Sch`, `Pf` |
| nl | nested (585/1062) | klank per VLL kern | aa ee oo uu ie oe eu ui ij ei au ou sch ch ng nk (`nl-chunks.json`) | ij/ei note | as de | none measured; `ij` one box |
| sv | nested, doubles letter-level (99/993; `katt` k,a,t,t) | ljud | ng sj skj stj sch tj kj ch (`sv-chunks.json`) | `mergeDoubles` (katt 3 or 4 boxes) | as de | bare singular only, no definite-form risk |
| no | as sv (93/829; `trekkspill` t,r,e,k,k) | lyd | sj skj stj kj tj ng (`no-chunks.json`) | `mergeDoubles`, kj/sj note | as de | kj/sj quarantine already applied by the gate |
| da | FLAT; 794 approved, 402 strict | bogstav (orthographic, K-1 policy) | none; `ng` optional (54 words) | multigraph list | strict pool only (field ABSENT); absent word -> refuse | `policy_managed:false` never occurs (0 measured; CLAUDE.md section 20.7 wording is stale) |
| fi | FLAT; 1120 | kirjain (KÄTS) by default | `ng` / `nk` optional (16 / 46) | äänne vs kirjain (`kissa` 5 or 4 boxes) | absent -> refuse | doubles / long vowels are 2 boxes unless `mergeDoubles` |
| es | FLAT; 958 | letra / dígrafo | ch ll rr qu gu (161 words contain one) | list confirmation | absent -> refuse | `qu` / `gu` one box only before e/i (validator); silent `h` (`búho`) may be excluded |
| pt | FLAT; 891 | letra / dígrafo | nh lh ch ss rr qu gu (181) | as es | as es | `x` several values; panel may exclude |
| it | FLAT; 978 | lettera / digramma | gn gl sc ch gh qu + doubles (414) | doubles as 1 box yes/no | as es | `gl` / `sc` only before i/e (validator) |
| fr | FLAT; 810 | son | ou on an en in un ch eau au ai ei oi eu gn ph ill qu (488 contain one) | WHITELIST: explicit grapheme array per word | absent OR not whitelisted -> refuse | silent finals (`chat`, `loup`, `gland`): a letter box for a mute `t` is a false sound box; the panel writes `[ch,a,t]` |
| en | FLAT; 910 (401 on 2 sources) | phoneme-grapheme | sh ch th ck ng qu ee oo ea ai ay oa ou ow oi oy igh ar or er ir ur (569 contain one) | WHITELIST per word | as fr | `horse` as h,o,r,s,e is false; magic-e words excluded or boxed `[h,or,se]`; whitelist must reach >= 8 per fanned theme |

## D. DATA + GATES

Read from `approved-words-<loc>.json .entries[]`: `key` (join = `vocabKey`), `word`, `split`, `count`, `chunks`, `policy_managed` (da). Not read: `sources_agreed`, `wiktionary_ipa`, `notes`.

`data/b3/sound-boxes.js` is GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the b2 pattern):

```
{ <loc>: { mode:'chunks'|'rule'|'whitelist', multigraphs:[...], remergeAcrossSyllable:[...],
  mergeDoubles:false, capitalBox1:false, strictPool:null|'policy_managed_absent',
  exclude:['vocabKey'], whitelist:{ vocabKey:['ch','a','t'] }, labels:{...} } }
```

`lib/sound-boxes.js segment(entry, cfg)`: chunks -> flatten -> remerge -> doubles; rule -> per syllable greedy longest-match over `multigraphs`; whitelist -> lookup or null. The result must satisfy `join === word.toLocaleLowerCase(loc)` or the word is refused (`sampleEntries` sample-or-throw).

Gate `tools/gate-sound-boxes-data.js` (every locale x theme x face, before a wave):
1. every fanned word exists in the approved file (poison: inject `{noun:'zebra', word:'sebra'}` into a fake en pool -> FAIL "not approved").
2. `segment().join('') === word` case-folded (poison: en whitelist `horse:[h,or,s]` -> FAIL "hors != horse").
3. every multigraph of a chunk-table locale is a key of `chunk-tables/<loc>-chunks.json` (poison: add `sh` to de -> FAIL).
4. `n` within the face's `minG..maxG`; F1 and F3 n <= 6; F4 `count` in 2..3.
5. da: `policy_managed` ABSENT on every fanned word (poison: `hund` with `policy_managed:true` -> FAIL).
6. F5: three distinct vocabKeys and words, distractors same theme (poison: duplicate vocabKey -> FAIL).
7. pool >= `minNouns` per cell or the cell is recorded REFUSED, never filled.
8. `gate-variation-distinct.js`: 5 resolved d2 configs differ from base (poison: F2 without `given` -> FAIL).
9. non-vacuity: prints words checked per cell; 0 checked = FAIL.

## E. SEO

Title pattern per face = `{native head}: {Theme}` for F0 and `{native head} {qualifier}: {Theme}` for F1-F5 (qualifiers in section B), <= 70 chars, no worksheet-word (the engine appends it). Examples: en `Sound Boxes: Animals` / `Count the Sounds: Animals` / `Blend the Sounds: Toys`; de `Wörter in Laute zerlegen: Tiere` / `Laute zählen: Tiere`; nl `Hakken en plakken: dieren` / `Hak-stippen: dieren`; fr `Boîtes à sons : les animaux`; sv `Ljuda ord: djur` / `Räkna ljuden: djur`; fi `Äänteet laatikoihin: eläimet`. Meta = `Free printable {TITLE} ... {LEVEL}. {MIDDLE}.` with MIDDLE = the face instruction when it fits 120-170, else the family sentence (`skill-sentences.<loc>.json sound-boxes.full`, new key). Landing: eyebrow = band-table level label; h1 = title; strand = the locale's phonological-awareness domain from `frontend/lib/seo/strand-names.ts` (de "Laute & Silben"); JSON-LD `LearningResource` with `educationalAlignment.targetName` = the CCSS code (en) or the national framework NAME (others).

Non-cannibalisation (raw 3-gram Jaccard, est.; `scripts/seo-landing/gate.js` FAIL >= 0.80):

| pair | why distinct in copy | est. |
|---|---|---|
| F0 vs K-224 cvc-missing-letter | K-224 prints the word minus ONE letter; F0 prints NO letters, one box per sound | 0.15 |
| F0 vs K-231 build-the-word | K-231 gives a letter bank; F0 has no bank, the child produces graphemes | 0.15 |
| F1 vs K-233 count-the-syllables | sounds vs syllables; dots vs a written digit | 0.20 |
| F4 vs G1-305 syllable-split | G1-305 arcs / split only; F4 boxes under arcs, graphemes written | 0.30 |
| F5 vs K-225 word-picture match | whole-word sight match vs segmented blending | 0.20 |
| F2 vs K-221 beginning-sounds | K-221 asks FOR the first letter; F2 GIVES it | 0.15 |
| F3 vs F0 | F3 hides the count (uniform strip), G1 | 0.35 |

Boundary sentence on every landing: F0 "This page shows no letters of the word: the child hears the sounds and writes one in each box", against K-224 "one letter is missing" and K-231 "letters are given to build". F4 copy never uses "Silbenbögen" / "split" as its head (owned by G1-305).

## F. OPEN QUESTIONS

1. fi unit: kirjain (5 boxes `kissa`) or äänne (4, doubles merged)? Both supported via `mergeDoubles`; the OPS panel decides.
2. sv / no doubles: `chunks` keep `tt` / `kk` as two graphemes; ljudning teaches one long sound. `mergeDoubles` default?
3. de cross-syllable `tz` and `chs`: remerge list content; does box 1 for `Sch` need 84 px instead of 60?
4. en / fr whitelist: who authors the per-word arrays, and do they reach >= 8 per fanned theme (fr animals 13, en animals 19 candidates; yield UNKNOWN until authored)?
5. da strict pool refuses 5 of 7 themes at minNouns 8 for the K faces (pools 2-7): ship animals + house only, or lower da minNouns to 6 (no within-theme variety)?
6. 401/910 en and 130-210 es/pt/it/fi entries rest on 2 agreeing sources (`rule_authoritative`): refuse `total_agreed < 3` here, or trust the v1.1 gate?
7. `scripts/verify-hub-type-rows.js` does not exist (measured): who builds it before the `apps.sound-boxes` registration?
8. F1 cites RF.K.2.d although full segmentation is RF.1.2.d: keep d2 at 2-5 sounds or narrow to 3-4 (cells < 8 would rise above 8)?
9. F5 distractors: allow minimal pairs (`kat` / `kar`)? Pedagogically useful; verify forbids only identical words.

**Summary.** K-318 is one apparatus (picture + one box per grapheme) with six faces that change the child's act: write all sounds (F0), count sounds as dots (F1), segment the rime after a given onset (F2), segment with no count hint on a 6-box strip (F3), two-tier syllable-then-sound (F4), blend printed boxes back to a picture (F5); no PARAM face, because ranges are not moves. Grapheme data is real only in de/nl/sv/no; the other seven need a per-locale unit rule (es/pt/it/fi/da) or a whitelist (en/fr), all in `data/b3/sound-boxes.js`, never in code. Around the house, animals, toys and zoo animals carry every face in all 11 locales; fruits fails the 3-5-grapheme faces in 6 locales; da's strict pool (field absent, 402) ships K faces on 2 themes only. A node gate with 9 assertions and poison cases re-derives every stamped word before a wave.
