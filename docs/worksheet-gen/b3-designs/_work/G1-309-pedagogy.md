# G1-309 `rhyming-words` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 unless marked *candidate* (a draft orthographic rule, never a verified rhyme) or *est.* Sources: `scripts/worksheet-gen/lib/b2-common.js entriesFor` over the 50 colour themes of `cache/manifest.json` (BW dirs excluded by the localized marker), `data/literacy/rhyming-pairs.json`, `types/k/K-232-rhyming-pairs.js` + `types/_shared/science-pair-match.js`, `types/_shared/lit-sound-match.js` (K-226), `types/g1/G1-244-write-the-word.js`, `i18n/strings.<loc>.json` (K-232/K-226/K-233/G1-244 titles x11), `frontend/config/topics-taxonomy.json`, `scripts/seo-landing/gen-b2var-landings.js LEVEL_KEYS`, `frontend/lib/seo/strand-names.ts` ("Phonological Awareness" row), `page/page.css`, `templates/components-b2.js`. Scratch: `g1309-measure.js`, `g1309-strict.js` (read-only).

**Boundary (load-bearing).** RHYME = a shared rime SOUND (stressed vowel + everything after) between two DIFFERENT pictured words. K-232 (draw a line, 5 pairs, EN data only, `phonological-awareness` axis) owns the line-drawing recognition act; K-226 owns the final LETTER; G1-244 writes the picture's OWN name; G1-306 (en shape R "Word Families") PRINTS the rime and the child reads it. No face here prints a rime, asks for a final letter, draws a line between pairs, or writes the anchor's own name; every face hears a rhyme and (all but one) WRITES the rhyming word.

**Four load-bearing measurements.**
1. **The en bank is 8 pairs, all 8 survive `entriesFor` (both pictured, none in `B2_EXCLUDE`)** and all 8 fall in one draft class (-at -og -un -ar -ee -oat -ed -ag). 8 pairs cannot feed a G1 write type (one page of the base needs 6 classes + 12 distractors); the bank is a cross-check, not a source.
2. **Draft census (candidate only; Germanic = monosyllables, rime = vowel run + coda; Romance/fi = penultimate vowel run + rest, plurals dropped):** classes with >= 2 pictured members / >= 3 / candidate pairs: en 46 / 10 / 76 · de 18 / 3 / 27 · nl 48 / 14 / 114 · sv 25 / 9 / 53 · da 29 / 3 / 48 · no 28 / 5 / 41 · es 86 / 51 / 1311 · pt 103 / 48 / 707 · fr 76 / 32 / 1200 · it 100 / 45 / 904 · fi 70 / 26 / 623. The Romance/fi numbers are inflated by suffix classes (es `-ón` 25, it `-ino` 21, fr `-on` 30, fi `-en` 20 = the `-nen` suffix) that ARE rhymes but bore a page; the Germanic numbers are the honest floor. A first pass counting unstressed suffixes (en `-er` 71, de `-en` 68) is NOT a rhyme census and was discarded.
3. **Orthography cannot stand in for sound in en, fr, da** (bee/knee/key; bateau/vélo/chapeau; da `ged`/`vred` share `-ed` and do not rhyme, `bog`/`tog` do). The class `rime` is therefore a panel literal keyed on SOUND, with a per-member `sameSpelling` flag that the write faces read (section D).
4. **Taxonomy:** `apps.rhyming-words` and `axes['exercise-type'].rhyming-words` are ABSENT (grep = 0); K-232 sits under `phonological-awareness` (`default_age_range 5-7`, 11 slugs present). Register `apps.rhyming-words = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'rhyming-words'}` + slug/name x11 before the wave.

## A. IDENTITY

| field | value |
|---|---|
| id / key / band | `G1-309` / `rhyming-words` / base G1 in en de es pt fr it nl fi; **K level key in sv da no** (Lgr22 förskoleklass "rim, ramsor", Fælles Mål børnehaveklasse "sproglig opmærksomhed", LK20 1. trinn "leke med rim") because the K band there already writes short words; fi esikoulu does NOT write words (OPS 2014 esiopetus), so the fi base is 1. luokka (open question 1). Level key per locale from `LEVEL_KEYS` (`gen-b2var-landings.js:112-124`). |
| subject / class | `default_subject: letters`, `assetClass: icon-placement`, `exerciseType: rhyming-words` |
| theme axis | `themeAxis:{applicable:false}` on all six faces: a rhyme pair is cross-theme by nature (cat/hat = animals/accessories); pictures come from ALL 50 colour themes via `fileUri(theme, noun)`, one `pic:{theme,noun}` per bank member. Fan lever = the rhyme CLASS set (section B). |
| CCSS (en, honest) | **RF.K.2.a** (recognize AND produce rhyming words) is the only rhyme code; there is no G1 rhyme standard. Write faces add **L.1.2.d** (conventional spelling of words with common spelling patterns); F1 (K) carries RF.K.2.a alone. Non-EN landings name the national framework only (§20.10). |
| data | `data/b3/rhymes.js` (section D); render reads it + `fileUri`; never `image-vocabulary.js` or `approved-words-*.json` at render (the validator reads both). |

| loc | genre head (base title root) | ASCII slug | base level | national strand (name only) |
|---|---|---|---|---|
| en | Rhyming Words (K-232 keeps "Rhyming Pairs") | `rhyming-words` | grade 1 | Phonological Awareness |
| de | Reimwörter (K-232 keeps "Reimpaare") | `reimwoerter` | 1. Klasse | Lehrplan Deutsch: phonologische Bewusstheit |
| es (MX) | Palabras que riman | `palabras-que-riman` | primer grado | SEP/NEM Lenguajes: conciencia fonológica |
| pt (BR) | Palavras que rimam | `palavras-que-rimam` | 1º ano | BNCC Língua Portuguesa: rimas em cantigas e quadrinhas (EF12LP07, panel confirms) |
| fr | Mots qui riment (K-232 keeps "Les rimes") | `mots-qui-riment` | CP (F1 at maternelle GS = the "rimes maternelle" gap query) | programmes cycle 2: conscience phonologique |
| it | Parole in rima | `parole-in-rima` | classe prima | Indicazioni nazionali: consapevolezza fonologica |
| nl | Rijmwoorden (K-232 keeps "Rijmparen") | `rijmwoorden` | groep 3 (F1 kleuters) | SLO kerndoelen: fonemisch bewustzijn |
| sv | Rimord (K-232 keeps "Ord som rimmar") | `rimord` | förskoleklass | Lgr22 svenska: rim och ramsor |
| da | Rimord, ALWAYS the compound (never bare "rim": Rimowa pollutes the SERP) | `rimord` | børnehaveklasse | Fælles Mål dansk: sproglig opmærksomhed |
| no | Rimord (K-232 keeps "Rimpar") | `rimord` | 1. trinn | LK20 norsk: rim og rytme |
| fi | Riimisanat (K-232 keeps "Riimiparit") | `riimisanat` | 1. luokka (F1 esikoulu) | OPS 2014 äidinkieli: kielellinen tietoisuus |

## B. THE SIX FACES

Layout units (body 703x760, `.ws-page` inner 675): `cardGrid` (`templates/layouts/card-grid.js`; 1x6 rows = card 675x115, inner 647x87 per K-318's measurement; 2x3 = 330x244, inner 302x216; 2x4 = card ~330x179, inner ~302x151, engineer measures), `writingRow({w,h,glyphH})` (`trace-path.js:681`), `wordBank({words,wordPx})` (`components-b2.js:210`, 44 px banner), `.ws-lane` (`page.css`), `.ws-chip` 52 px circle (K faces use 56, the K element floor), `.ws-tile` white chip. NEW in `templates/components-b3.js`: `picChoices({items, px:72, gap:12})` (white `.ws-tile` per picture, `data-lcs-choice=vocabKey`), `yesNoChips({size:56})` (a tick and a cross drawn in SVG, `data-lcs-yn`), `rhymeBins({bins, w})` (head picture + printed head word + N writing rows), `coupletLane({pic, lines, glyphH})` (line 2 ends in an inline `writingRow`). Density G1 44/26/6-12; K 56/30/4-8; K whole-word rulings glyphH 40 (brief).

| # | id / slug | EN title (<=70, no "worksheet") | teaching move | what the child does at d2 |
|---|---|---|---|---|
| F0 | G1-309 `rhyming-words` | Rhyme and Write | RECOGNISE among a choice, then PRODUCE in writing (RF.K.2.a both halves + L.1.2.d) | 6 rows: anchor picture 80, three pictures 72 (one rhymes, two from OTHER classes), circles it, writes its word on `writingRow` 250x56 glyphH 26 (K locales 40); 6 words written |
| F1 | K-3xx `rhyme-or-not` | Rhyme or Not? | JUDGE a pair (recognition only, no writing, no line) | 8 cards 2x4: two pictures 64 side by side + tick/cross chips 56; 4 rhyming + 4 non-rhyming pairs; circles 8 chips |
| F2 | G1-3xx `rhyme-sort` | Sort the Rhymes | CLASSIFY by rime sound, then write: three families on one page | banner of 6 loose pictures 64; 3 `rhymeBins` (head picture 64 + head word printed Baloo 24 + 2 writing rows 190x48 glyphH 26); writes 6 words |
| F3 | G1-3xx `finish-the-rhyme` | Finish the Rhyme | READ a two-line verse, HEAR the missing rhyme, write it (picture cue) | 6 `coupletLane`s h 106: picture 64, line 1 Nunito 800 19, line 2 ends in an inline `writingRow` 200x56; writes 6 words |
| F4 | G1-3xx `rhyme-strings` | Rhyme Strings | PRODUCE two rhymes per anchor from a bank that also holds foils | bank of 12 words (8 answers + 4 foils, shuffled); 4 lanes h 130: anchor picture 80 + two stacked writing rows 250x52; writes 8 words |
| F5 | G1-3xx `write-your-own-rhymes` | Write Your Own Rhymes | OPEN production: invent rhymes (no verify) | 6 cards 2x3: picture 88 + its word printed Baloo 24 + two `writingRow` 280x48; writes up to 12 words |

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 4 rows, 2 choices, first letter of the answer printed as a starter (`strokeWordLane` of one glyph, G1-244 d1 shape) | 6 rows, 3 choices, no starter | 6 rows, 4 choices incl. ONE `nearMiss` foil (same onset+vowel, e.g. cat -> cap) | `rows choices starter nearMiss` | base |
| F1 | 6 cards, non-rhymes differ in vowel AND coda | 8 cards, 4/4 | 8 cards, 2 of the 4 non-rhymes are `nearMiss` foils | `mode:'judge'`, `foils` | CODE |
| F2 | 2 bins x 2 loose | 3 bins x 2 loose | 3 bins x 3 loose (needs classes >= 4) | `mode:'sort'`, `bins`, `perBin` | CODE |
| F3 | 4 lanes, answer word in a bank of 4 | 6 lanes, no bank | 6 lanes, no picture cue (the verse alone; needs `couplets[].cueFree:true`) | `mode:'couplet'`, `bank`, `cue` | CODE |
| F4 | 3 anchors x 2, bank of 8 (2 foils) | 4 anchors x 2, bank 12 (4 foils) | 4 anchors x 3, bank 16 (needs classes >= 4) | `mode:'string'`, `per`, `foils` | CODE |
| F5 | 4 cards, 1 line each | 6 cards, 2 lines | 6 cards, 3 lines | `mode:'open'`, `lines` | CODE (no verify) |

Guards key on `d.mode`, never the level index; `data-lcs-mode` stamped only when declared so the base stays byte-identical; `tools/gate-variation-distinct.js` sees five distinct resolved d2 configs. The K-locale `glyphH:40` is a per-locale band resolution (`glyphH:{G1:26,K:40}` picked by `LEVEL_KEYS[loc]`), not a d-level.

### verify() rules (the bank is the truth; answers are re-derived from hidden stamps)

Common: root `<div data-ws-content data-lcs-face>`; every item stamps `data-lcs-anchor=vocabKey`, `data-lcs-class=classId`, `data-lcs-answer` (hidden word, display form); no text node on an item equals a hidden answer (leak); every `img.complete && naturalWidth > 0`; no BW dir in any `src`; no vocabKey twice on a page; no two items share a class (a second rhyme on the page = two right answers).
- F0: exactly one `data-lcs-choice` per row whose class === the anchor's class; the two others carry classes !== anchor's AND !== each other (two distractors that rhyme with each other read as a pair); correct index takes all 3 values over a 20-seed sweep; d3 foil's `data-lcs-foil` is in the anchor's `nearMiss`; ruling present, empty; starter (d1 only) === first glyph of the answer.
- F1: tick/cross answer === (classA === classB); the 4 rhyming pairs come from 4 distinct classes; a non-rhyming pair never shares a class; d1 non-rhymes differ in class `rime` by the last 2 letters as well (no near-miss); correct value is not constant.
- F2: 3 bins from 3 distinct classes; every loose picture's class is exactly one bin's class; 2 per bin; bank order never groups a bin's members adjacently (20-seed sweep, adjacency of same-class loose pictures = 0 at d2).
- F3: `lines[1]` contains the `___` slot once and NOT the answer; `rhymeWith` (the last word of line 1) is a member of the answer's class OR a panel-declared `extra` of that class (verse words need not be pictured); answers distinct; the picture cue resolves; <= 45 chars per line.
- F4: bank set === 8 answers + 4 foils; each anchor's two answers are in its class; foils from classes not on the page; bank never lists an anchor's two answers adjacently; rows empty.
- F5: no verify (open-ended, brief line 11); layout lints only; answer key prints "examples" = the class members, never a single answer.

### Refusal per locale (floors at d2; counts = candidate classes with >= 2 / >= 3 pictured members)

| face | floor | en 46/10 | de 18/3 | es 86/51 | pt 103/48 | fr 76/32 | it 100/45 | nl 48/14 | sv 25/9 | da 29/3 | no 28/5 | fi 70/26 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F0 | >= 8 classes >= 2, >= 24 classified words | ok | ok (40 words) | ok | ok | ok | ok | ok | ok | ok | ok | ok |
| F1 | >= 8 classes >= 2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |
| F2 | >= 3 classes >= 3 | ok | 3 = ONE page (small pool) | ok | ok | ok | ok | ok | ok | 3 = ONE page | ok | ok |
| F3 | >= 8 verified couplets (panel) | panel | panel | es may refuse (C demand) | panel | panel | it may refuse (C demand) | panel | panel | panel | panel | panel |
| F4 | >= 4 classes >= 3 | ok | REFUSED (3) unless the panel finds a 4th by sound | ok | ok | ok | ok | ok | ok | REFUSED (3) | ok (5) | ok |
| F5 | >= 6 `productive` anchors | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

"Small pool" = the face ships exactly one page in that locale (no fan, one landing); "refused" = no page, no landing, recorded in the wave log; the hub gate then sees 5 rows for that locale (open question 3). F4 is buildable in 9 of 11 by the draft, F3 in >= 7 *est.* (the two C-tier locales are the likely refusals); both clear the ">= 7 locales" bar. **Fan lever:** the rhyme class (`unit` = class id; the wave ships one exemplar set per face per locale, the fan is an additive `classAxis` knob), never a theme.

**Rejected non-moves.** (1) K draw-a-line (the non-EN rebuild of K-232): identical move to K-232; in en a duplicate landing, in the other 10 a data fix for K-232 (open question 2), not a face here. (2) Theme swap. (3) "Longer words": a range. (4) First-letter starter as a face: it is d1. (5) Printed-word choice (circle the rhyming WORD among three printed words): a reading act, G1-306 R territory. (6) Rhyme bingo / rhyme memory: two players, not a worksheet. (7) Draw the rhyming picture: unverifiable, no writing. (8) "Rhyme with a nonsense word": no picture, no verify. (9) Rhyme + syllable count: K-233 owns the digit. (10) Alliteration ("same first sound"): K-221/K-228 own it; it appears here only as the d3 `nearMiss` foil.

## C. NATIVE REBUILD x11

The unit is a per-locale DATA decision in `data/b3/rhymes.js`: the panel authors classes by SOUND, the code substitutes literals and never derives a rime from spelling. Every member is a pictured vocab word (`vocabKey`); verse words that are not pictured live in `extra`. Bare singular, nominative, lowercase everywhere except de (`displayWord` keeps the capital); never a plural, never a definite form.

| loc | rhyme definition the panel applies | what the panel authors | orthography trustworthy? | refusal rule | traps |
|---|---|---|---|---|---|
| en | stressed vowel + coda by SOUND (`bee`/`knee`/`tree`) | >= 12 classes with `rime` as a spelling and `sound` key; members flagged `sameSpelling`; 8 couplets; `nearMiss` per class; cross-check the 8 json pairs (all 8 must land in one class) | NO | write faces (F0 F2 F4) use `sameSpelling:true` members only at d1/d2 | r-controlled (`car star jar`) and magic-e (`cake lake`) are classes; `bear`/`pear` vs `hear`; the K-5 SERP is HARD, the write form is the B lane |
| de | Reim = betonter Vokal + Rest | >= 12 classes; couplets; `Hut`, `Hund` capital on display | mostly (ai/ei, äu/eu cross-spell: `sameSpelling:false`) | none expected | capital in the written answer (verify case-folds); `-en`/`-er`/`-el` suffix words are NOT Reime (unstressed); Vokallänge: `Hut`/`Blut` rhyme, `Bett`/`Beet` do not |
| es (MX) | rima consonante = vocal tónica + resto | >= 12 classes preferring 2-syllable nouns over `-ero`/`-ador` agentives; couplets optional | mostly (accents mark stress; seseo makes `-asa`/`-aza` one sound: panel merges, `sameSpelling:false`) | F3 may be refused (C demand) | `-ón`/`-ero` classes are endless and boring: cap a class at 8 shown members; masc./fem. never matters (nouns only) |
| pt (BR) | rima = vogal tônica + resto, same timbre | as es; couplets from quadrinhas | mostly (open vs closed `ó`/`ô`, `é`/`ê` do NOT rhyme: `pêra`/`terra` no) | none expected | nasal endings (`-ão`) one class; `-inho` diminutives allowed but capped |
| fr | rime = dernière voyelle prononcée + consonnes prononcées; mute e carries the rhyme (`pomme`/`gomme`) | classes by sound across spellings (`-eau`/`-o`/`-au` one class), `sameSpelling` per member; comptines à trous for F3 | NO | write faces use `sameSpelling` only | mute finals (`chat`/`rat`/`bras` rhyme); `-on` class of 30 is `rime pauvre` at scale: cap; F1 lands the "rimes maternelle" query at GS |
| it | rima = vocale tonica + resto | >= 12 classes; filastrocche for F3 | yes (open/closed e/o rare in this vocab) | F3 may be refused (C demand) | `-ino`/`-ello`/`-etto` suffix classes: cap; nouns only, no articles |
| nl | rijm = beklemtoonde klinker + rest | >= 12 classes (census 48); rijmpjes for F3 | mostly (`ei`/`ij`, `au`/`ou` homophones: merge by sound, `sameSpelling:false`) | none expected | de/het never printed; `-en` suffix words are not rhymes; F1 at kleuters is the demand head |
| sv | rim = betonad vokal + det som följer | >= 12 classes (census 25); rimramsor for F3 | yes (vowel length via double consonant: `katt`/`hatt`) | none expected | NEVER a definite form (`katten`); NEVER `grupp` in copy (a counting word in shipped maths decks); `[NSR-FLAG]` |
| da | rimord by EAR: vowel quality + stød + soft d/g | >= 12 classes; remser for F3 | NO (`ged`/`vred` no; `bog`/`tog` yes; `hus`/`mus` yes) | none expected; F4 refused at the draft's 3 | "rimord" in every title and meta, never bare "rim"; `[NSR-FLAG]` |
| no | rim = trykksterk vokal + resten (bokmål) | >= 12 classes (census 28) | mostly (`tog`/`skog` differ in vowel quality: panel rejects) | none expected | `-er` plurals excluded; 1. trinn = K key; `[NSR-FLAG]` |
| fi | loppusointu = the last TWO syllables identical (from the approved `split`), same vowel length | >= 12 classes (census 70, inflated by `-nen`); lorut for F3; couplet lines inflect the word, chips stay nominative | yes, but `tuli`/`tuuli` are not a rhyme (length) | none expected | `-nen` suffix rhymes are legal in lorut but cap them; a nominative token never enters a verse slot: the panel writes the inflected line; `[NSR-FLAG]` |

Every panel also authors 6 titles (genre head, <= 70, no worksheet-word, unique in band, none of the K-232/K-226/G1-244 titles listed in the sources), 6 instructions (<= 150, the child's sentence), the skill sentence, slug + name, `topicMeta.rhyming-words`. The EN is handed over as a SOURCE TO AUDIT. Every panel OPENS every picture it keeps (`picOpened:true` per member, asserted): `fruits/plum` is a red apple, `christmas/tree` is decorated (sv #35).

## D. DATA + GATES

`data/b3/rhymes.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern; both b3 tools absent, owned by the batch's first design; `data/` gitignored, force-add):
```
RHYMES[loc] = {
  rule: 'stressedVowelCoda' | 'lastTwoSyllables',            // fi
  orthographyTrusted: false,                                    // en fr da
  classes: [{ id:'at', rime:'-at', sound:'æt', cap:8,
              members: [{ vocabKey:'cat', word:'cat', pic:{theme:'animals',noun:'cat'}, sameSpelling:true, productive:true, picOpened:true }],
              extra: ['mat','sat'],                            // verse words, not pictured, never rendered as a picture
              nearMiss: ['cap','cot'] }],                      // vocabKeys sharing onset+vowel, d3 foils only
  couplets: [{ id:'cat-hat', lines:['The cat sat on the mat', 'and put on a big ___'], answer:{vocabKey:'hat'}, rhymeWith:'mat', cueFree:false }],
  strings: { 'G1-309':{title,instruction}, F1..F5:{...} } }
```
**`tools/validate-b3-draft.js` (rhymes block; all rules run, exit 1 on any):** (1) every member `vocabKey` exists in `entriesFor` of its `pic.theme` for `loc`, not in `B2_EXCLUDE[loc]`, `word === displayWord(singular, loc)` lowercased-compared; (2) `pic.theme` carries no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); (3) a `vocabKey` in exactly ONE class; no two classes share `rime`+`sound`; (4) class size >= 2 (pairs) and >= 3 for F2/F4 membership; `cap` >= 3; (5) `sameSpelling:true` only if `word.endsWith(rime.slice(1))`; where `orthographyTrusted:false` every member carries the flag explicitly; (6) fi: `rime` === the last two elements of the approved `split` joined, for every member (reads `approved-words-fi.json`); (7) `nearMiss` keys are pictured and NOT in the class; (8) en: each of the 8 pairs of `rhyming-pairs.json` lands in one class (a split pair = FAIL, a missing pair = WARN); (9) couplets: `lines[1]` has one `___`, no line contains `answer.word`, `rhymeWith` in `members[].word` or `extra` of the answer's class, <= 45 chars per line, >= 8 couplets else F3 REFUSED and recorded; (10) titles: worksheet-word guard, <= 70, unique in band, da titles contain "rimord"; instruction <= 150.
**`qa/verify-b3-rhymes.js`:** renders face x 11 locales at d2; `verify()` empty; `qa/lints.js` clean; density asserted itself (`.ws-icon` >= 44 G1 / 56 K; K rulings glyphH 40); 20-seed sweep: F0 correct index takes all 3 values, F1 tick/cross both >= 3 of 8, F2 same-class adjacency 0, F4 bank never adjacent-pairs an anchor. **Poison** (each must FAIL; the correct draft is the control): P1 a distractor from the anchor's OWN class on an F0 row (two right answers); P2 a class member whose `vocabKey` is absent from the vocab / not pictured (`{vocabKey:'lynx'}`); P3 `dog` placed in `-og` AND a second class; P4 a couplet whose line 2 prints the answer; P5 a `zoo animals bw` pic; P6 en pair `bee`/`tree` split across two classes; P7 fi member whose `rime` != last two syllables of `split`; P8 F1 "non-rhyming" pair drawn from one class; P9 da title "Rim og ramser" (bare "rim").
**Page reads:** `RHYMES[loc]`, `fileUri`; never `image-vocabulary.js`, `rhyming-pairs.json` or `approved-words-*.json` at render.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (the instruction, said to the child; whole description 120-170) | coordinate |
|---|---|---|---|
| F0 | head + write: "Rhyming Words: Rhyme and Write" · "Reimwörter finden und schreiben" / "Palabras que riman: elige y escribe" · "Mots qui riment : choisis et écris" / "Rimord: hitta och skriv" · "Riimisanat: valitse ja kirjoita" | Circle the picture that rhymes with the first one, then write its word on the line | `{type:'rhyming-words', mode:null, theme:'', level: G1 key (K key sv/da/no)}` |
| F1 | "Rhyme or Not?" · "Reimt sich das?" / "¿Riman o no?" · "Ça rime ou pas ?" / "Rimmar det?" · "Rimer det?" (da: "Rimord: rimer det?") · "Riimiikö?" | Say both words out loud and circle the tick if they rhyme, the cross if they do not | K key |
| F2 | "Sort the Rhymes" (never "word families": G1-306 en owns it) · "Reimfamilien sortieren" / "Familias de rimas" · "Familles de rimes" / "Rimfamiljer" · "Riimiperheet" | Write each picture's word under the picture it rhymes with | G1 key (K sv/da/no) |
| F3 | "Finish the Rhyme" · "Reimverse ergänzen" / "Completa la rima" · "Complète la comptine" / "Fyll i rimramsan" · "Täydennä loru" | Read the two lines, look at the picture and write the missing rhyming word | G1 key |
| F4 | "Rhyme Strings" · "Reimketten" / "Cadenas de rimas" · "Chaînes de rimes" / "Rimkedjor" · "Riimiketjut" | Find two words in the bank that rhyme with each picture and write them, some bank words fit nowhere | G1 key (K sv/da/no) |
| F5 | "Write Your Own Rhymes" · "Eigene Reimwörter schreiben" / "Escribe tus propias rimas" · "Trouve tes rimes" / "Skriv egna rimord" · "Keksi omat riimit" | Read the word, think of two words that rhyme with it and write them | G1 key |

h1 = title; eyebrow = level label; strand = the "Phonological Awareness" row of `strand-names.ts` (de "Phonologische Bewusstheit", fr "Conscience phonologique"). JSON-LD `educationalAlignment` en only: RF.K.2.a on all six, plus L.1.2.d on F0/F2/F3/F4; no `targetUrl`. `topicMeta.rhyming-words` (>= 50 chars) and `skill-sentences.<loc>.json` registered by `tools/register-b3-en-content.js`. The existing `topicMeta.phonological-awareness` already says "rhyming pairs": the new meta says "rhyme and write", never "pairs".

**Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures).** F0 vs K-232: K, draw a line, "pairs" vs G1, circle + write (0.20). F1 vs K-232: tick/cross judgement, 8 pairs half of them wrong, vs 5 matched pairs (0.30; the closest pair, the copy says "some do not rhyme"). F0 vs K-226 "Ending Sounds": final LETTER of the same picture vs the whole rhyming word of another (0.15). F0 vs G1-244 "Write the Word": the picture's own name vs a rhyme (0.20). F2 vs G1-306 en R "Word Families": rime PRINTED and read vs rime heard and sorted; titles never share "family"/"families" in en (0.25). F2 vs K-234 sort by syllables: syllable count vs rime (0.15). F3 vs reading-comprehension (6): a verse with a picture-cued slot vs a passage with questions (0.15). F5 vs picture-writing G2-278: two rhyme words vs a sentence (0.15). F1 owns the K level and the "or not" head; F0 the bare head + "write"; F2 "sort"; F3 "finish/verse"; F4 "strings"; F5 "your own".

## F. OPEN QUESTIONS + SUMMARY

1. **fi band.** OPS 2014 esiopetus teaches riimittely but not word writing: base at 1. luokka, F1 at esikoulu (proposed). sv/da/no keep the K key on every write face except F3/F5 (reading a verse, open production = åk 1 / 1. klasse / 2. trinn). Confirm.
2. **K-232 data.** The same bank can feed K-232's `rhyming-pairs.json` per locale (a `pairs` export from `classes`), giving the 10 non-EN locales the line-drawing K page without a new face. A separate data commission; the type here does not depend on it.
3. **Hub gate vs refusal.** `verify-hub-type-rows.js` (absent; brief §hub) expects exactly 6 rows per key per locale; F3/F4 refusals in es/it/de/da give 5. The gate needs a recorded-refusal allowlist or the refusals must be re-targeted; decide before the registrar lands.
4. **Class caps.** Romance/fi suffix classes (es `-ón` 25, fr `-on` 30) are true rhymes but a page of them is "rima pobre"; `cap:8` is proposed, the panel may set lower.
5. **`.ws-bin` geometry** for F2 (three bins at ~215 px with a printed head word + 2 rulings 190x48) is *est.*: engineer measures against `page.css` `.ws-bin` and the fi/de head-word width at Baloo 24.
6. **Draft census is a candidate list, not a bank.** The de/da floors (F2 one page, F4 refused) are the DRAFT's; a panel authoring by sound (de `Haus`/`Maus`, da `hus`/`mus`/`krus`) will likely lift both; the design refuses on the authored bank, never on the census.

**Summary.** A rhyme-and-WRITE family for G1 (K in sv/da/no): six moves on one sound-authored bank, choose-and-write (base), tick-or-cross (K, no writing), sort into three rime families, finish a picture-cued couplet, write two rhymes per anchor from a bank with foils, write your own (open). K-232's 8 en pairs all survive but cannot feed it; a draft orthographic census gives 18-103 candidate classes per locale, honest only where spelling tracks sound (not en/fr/da), so `data/b3/rhymes.js` is panel-authored with a `sameSpelling` flag that the write faces read. Uniqueness is structural: one class per word, distractors only from other classes, no class twice on a page. Gates: a 10-rule validator, a 9-case poison set (a rhyming distractor and an unpictured member both FAIL), the human open of every picture, and the fi rime tied to the approved syllable split.
