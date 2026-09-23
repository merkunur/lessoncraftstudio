# G1-380 `digraphs` - pedagogy + content (nt10-E / b5)

Measured 2026-09-23 with read-only node over `lib/b3-common.js bank()`, `lib/b3-picture-index.js hasPicture()`, `approved-words-<loc>.json` (`scripts/v2-data/verify-syllable-boundaries/output/`), `frontend/content/seo-landing/<loc>.json`. Scratch: `%TEMP%/G1-380-{dump,dump2,measure,final}.js`. "pictured" = approved entry with a colour picture (`hasPicture(key, loc)`, BW dirs skipped, `B2_EXCLUDE` applied) and a letters-only word. Counts marked (m) are measured; (s) = measured then screened by ear by me with the exclusion reasons listed; (d) = regex draft that only a native phoneme tag can finalise.

## Boundary (load-bearing)

Four shipped families touch letter combinations; this type must not repeat any of them.
1. **`spelling-rules` G2-315 + G2-324..328 OWNS graphemes as a SPELLING CHOICE** (one sound, two spellings; G2). Shipped rule keys (read from the bank, not from the design file): en magic-e, c-k-ck, ee-ea, ai-ay, floss, y-ies · de tt ll nn ss **ck** tz **ie** · es b-v **c-qu g-gu r-rr ll-y** plural-tilde · pt s-ss **r-rr ch-x** m-antes-de-p-b c-ç plural-ao · fr m-devant-mbp s-ou-ss pluriel-en-x · it doppie **c-ch g-gh gn-gli sc-sch** mp-mb **chi-ghi** · nl d-t **ei-ij** · sv dubbelteckning(incl. **ck**) t-tt l-ll **ng-ljudet sj-ljudet**(cands sj stj skj sk sch ch g) · da ll **ng nd** flertal · no dobbel-konsonant t-tt k-kk **ng-lyden sj-lyden**(sj skj sk) · fi kk tt pp ll astevaihtelu. ⚠ The G2-315 DESIGN ladder also lists sv tj-ljudet, no kj-lyden, da stumt d, fi pitkä vokaali + diftongit, nl au/ou, but the SHIPPED banks do not carry them (only exemplar rules ship per face; live landings confirm: fi G2-324 = "kk", nl = "d of t", de = "tt oder t"). They are unowned today and stay a future G2 rule-fan: this type never builds a "which spelling is right" move on them.
2. **`syllable-reading` G1-306 + G1-330..334 OWNS syllable/blend units**: CV rows incl. **es lla-row, pt cha-row, fr cha-row**; blends / sílabas trabadas / konsonantklynge (G1-333: en bl cl fl gl pl sl br cr dr fr gr tr st sw; de fl kr bl tr; es tr pl gr fl bl br; pt tr pr bl fl gl br cr gr dr; fr br bl cr tr dr fl pl cl; it tr br fr sp st gr cr dr pr sc). **A blend (two sounds) is never a chip, never a distractor.**
3. **`letter-of-the-week` G1-311 "Sound of the Week" OWNS the one-unit HUNT** (trace the unit, circle the 4 pictures that have it, write a row; units en sh ch th · de sch ch ei au · es ll rr ch · pt nh lh ch · fr ou on an ch oi · it gn gli sc · nl oe ij ui · sv ng ll tt · da ng ll kk · no ng ll kk · fi kk tt ll pp; live landings = the exemplar unit only, e.g. de "Laut der Woche sch", fr "Le son de la semaine [ou]"). K-326 owns letter POSITION for single letters at K; K-221/228 beginning sounds; K-318 family sound boxes (its bank already boxes sh ch th ck ng qu wh ph tch dge as one box each).
4. **RULING (mine, recorded for the critic):** 1 and 2 fence the INVENTORY (a grapheme they own is out); 3 fences MOVES only (a single-unit hunt / trace / phoneme boxes). Reading 3 as an inventory fence would refuse en (sh ch th = RF.1.3.a verbatim, the only honest en code; left: ph 9, ng 9, wh 5 = 2 units) and pt (nh lh = the BNCC dígrafos head; left: qu 15, gu 7) and strip fr/de of their CP / Klasse-1 core. Measured strict-reading consequences are in the A table.

**What this type therefore owns:** at G1, **discrimination ACROSS ≥3 different-sound letter teams** (the item is fixed, the team varies: circle, sort, write, read, locate, find in text), where each team is one sound the child DECODES, never a spelling choice between two teams for one sound (so two spellings of one sound never share a page: nl ou/au, fr an/en, ai/ei, au/eau, de eu/äu).

## A. Identity

| loc | genre head (_PANEL-FINDINGS + selection reports) | school year | national strand (framework NAME) | CCSS (en only) |
|---|---|---|---|---|
| en | digraphs / sh ch th | grade 1 (`grade-1`) | - | **RF.1.3.a** verbatim; K face = readiness, no code; G2 face carries RF.1.3.a (applied in text), honest |
| de | Wörter mit sch / Laute sch, ch, ei, au (Zwielaute); never "Buchstabenverbindungen" (= joined handwriting) | 1. Klasse (`1-klasse`) | Lehrplan Deutsch: Lesen, Laut-Buchstaben-Zuordnung | - |
| es | **REFUSED whole family** (see table below) | - | - | - |
| pt | dígrafos nh, lh (dígrafo ≠ encontro consonantal) | 1º ano (`1o-ano`) | BNCC Língua Portuguesa, Análise linguística/semiótica (alfabetização) | - |
| fr | les sons complexes / le son ou | CP (`cp`) | programmes officiels, Lecture: correspondances graphèmes-phonèmes | - |
| it | **REFUSED whole family** | - | - | - |
| nl | tweetekenklanken | groep 3 (`groep-3`) | SLO kerndoelen, Taal: technisch lezen | - |
| sv | **REFUSED** (measured) | - | - | - |
| da | **REFUSED** (re-target "stumme bogstaver" measured and failed) | - | - | - |
| no | **REFUSED** (measured) | - | - | - |
| fi | **RE-TARGET: pitkä vokaali** (lyhyt vai pitkä vokaali; long vowels ONLY, diphthongs out) | 1. luokka (`1-luokka`) | OPS 2014 Äidinkieli ja kirjallisuus: kirjoitetun kielen rakenne (äänteen pituus) | - |

**Theme axis: THEMELESS** via `lib/b3-picture-index.js` (`themeAxis.applicable:false`, `coordinate.theme:''`). No single theme reaches 3 teams × ≥3 words (e.g. en `ocean life` sh 6, ch 0). **No `unitAxis`** at launch: each face ships ONE exemplar team set per locale (`sets.exemplar`); a set swap is a data swap, never a face (doctrine 1). A later `unitAxis` over `sets` is additive and optional.

**The rule that locks the type:** every word carries a **panel-signed grapheme segmentation `seg[]`**; an answer is correct iff the team is an ELEMENT of `seg` (never a substring of `word`), and on every item **exactly one** page team is an element of `seg` and **no other** page team occurs even as a letter substring. Words come only from `approved-words-<loc>.json`; morpheme-boundary letter pairs are excluded by an explicit per-locale `falsePairs` list.

### Measured inventory (the lock's test: ≥3 teams × ≥6 pictured approved words, else REFUSED)

| loc | owned (excluded) | candidate teams, pictured approved words (s) | teams ≥6 | verdict |
|---|---|---|---|---|
| en | ck ee ea ai ay (spelling-rules); blends (G1-333) | **sh 30 · ch 28 · th 17 · ph 9 · ng 9** · wh 5 (narwhal whale wheelchair whisk whiteboard; `white` = paint drop) | 5 | SHIPS; exemplar sh/ch/th, K set sh/ch. (strict G1-311 reading: ph 9, ng 9 only = 2 → refused) |
| de | ie ck (spelling-rules); fl kr bl tr (syllable-reading) | **sch 87 · ch 60 · au 48 · ei 38 · pf 16 · ng 10 · eu 8** · äu 1 · qu 2 (chunks layer; −6 `chs`=/ks/ words, −1 Küchenchef, −loans) | 7 | SHIPS; exemplar sch/ch/au; K set sch/au. (strict: pf 16, ng 10, eu 8 = 3, ships) |
| es | c-qu g-gu r-rr ll-y (spelling-rules); lla-row + trabadas (syllable-reading) | **ch 28** (chef /ʃ/ out) · ll 53 / rr 26 / qu 15 / gu 19 all OWNED | 1 | **REFUSED - lock CONFIRMED** (1 unowned team < 3) |
| pt | rr ss ch (spelling-rules ch-x AND syllable-reading cha-row) | **nh 28 · lh 23 · qu 15 · gu 7** (qu/gu only where u is silent before e/i; quadrado, pinguim [gw in BR], água out) | 4 | SHIPS; exemplar nh/lh/qu; K set nh/lh. (strict: qu 15, gu 7 = 2 → refused) |
| fr | m/n before m b p (om am em im); s/ss; -aux/-oux; **ch** (syllable-reading cha-row); br bl cr tr dr fl pl cl | (d) **ou 54 · on ~45 · an ~40 · eau 26 · oi 26 · eu ~24 · in ~14 · ai ~15 · gn 12** · ei 7; an/en, ai/ei, au/eau/o never on one page | 9 (d) | SHIPS; exemplar ou/on/oi; K set ou/on. Every count needs the native phoneme tag (substring ≠ sound: banane, bonnet, oignon) |
| it | c-ch g-gh gn-gli sc-sch chi-ghi (spelling-rules) | gn 12 / gl 22 / sc 40 / ch 36 / gh 11 all OWNED; qu 8 = /kw/ two sounds, not a digraph | 0 | **REFUSED - lock CONFIRMED** |
| nl | ei ij d/t (spelling-rules); mkm/mmkm (syllable-reading) | **aa 59 · oe 55 · ee 48 · oo 43 · ie 37 · ui 29 · ng 16 · eu 9 · nk 9 · ou 8** · au 5 (+7 dinosaur names) · uu 2 (chunks layer) | 10 | SHIPS; exemplar oe/ui/eu; K set oe/ui. (strict: without oe ui: aa ee oo ie ... ships) |
| sv | sj stj skj sk sch ch g (sj-ljudet); ng; ck + doubles | tj 1 (tjur) · kj 1 (kjol; strykjärn = stryk-järn boundary; skjorta = skj owned) · dj 1 (bältdjur) · gj 0 · hj 3 · lj 2 (initial silent l: ljus, ljusslingor; lilja/fåtölj/medalj pronounce l) · soft k+e/i/y/ä/ö 13 = ONE letter, not a team | 0 | **REFUSED** (measured) |
| da | ll ng nd (nd = stumt d after n) | hv 5 (hval hvalros hveps hvidløg narhval; hvid = paint drop) · hj 4 (hjerne hjerte hjort løbehjul) · **ld 8** (bold fodbold guldfisk guldsmed hylde skulder skildpadde landskildpadde; koldt/lunefuld/regnfuldt/stormfuldt = adjective/weather pictures; bulldozer loan) · **rd 6** (bord natbord skrivebord jorden jordbær gepard) · ds 3 · silent g ~5 (fugl ×4 compounds, kugle). K-1 strict pool (`policy_managed` absent): ld 0 · rd 2 · hv 4 · hj 1 | 2 | **REFUSED** (third team hv misses by ONE; as letter units stumt h 9 / stumt d 17 / stumt g 5 also 2 of 3; stumt h already refused at 9 in G2-315) |
| no | ng; sj skj sk (sj-lyden); doubles | **kj 6** (kjeks kjegle kjole kjøkken kjelke halskjede) · hv 4 (hvit = colour drop) · hj 3 · gj 1 · tj 0 (stjerne = sj-lyd) · soft k+i/y 4 = one letter | 1 | **REFUSED** (measured) |
| fi | kk tt pp ll astevaihtelu | **aa 48 · ii 33 · uu 29 · ää 17 · ee 11 · oo 8** · yy 4 (kyyhky kyynärpää pyyhekumi tyyny) · öö 0 (loans shampoo smoothie frisbee halloween beesi brownie, colour/emotion adjectives, plural twins dropped). Diphthongs ai 36 au 53 ei 30 oi 22 uo 17 ie 16 ... measured and EXCLUDED: two sounds, not one | 6 | SHIPS as re-target; exemplar aa/uu/ää; K set aa/uu |

**Hub expectation: 6 shipping locales (en de pt fr nl fi) × 6 faces − 1 face refusal (F4 pt) = 35 landings.** Refused whole-family: es it sv da no (0 rows each). ⚠ This is the thinnest locale reach in the batch; it is honest. The two near-misses are recorded for a future vocab commission, never padded: da `hv` needs ONE more pictured approved word; no needs a second and third team.

## B. The six faces

### Base: Which Letter Team? (G1, G1-380, CODE `mode:'base'`)
- **Move:** the ITEM is fixed (one picture), the child chooses among THREE different-sound teams by ear (G1-311 fixes the team and varies the pictures; G2-324 opposes two spellings of one sound).
- **Child:** en "Say the name of each picture. Circle the letter team you hear in it." (91 chars)
- **Params:** d1 `{cards:6, teams:2}` · **d2 (ships) `{cards:8, teams:3, perTeam:[2,3], showWord:false}`** · d3 `{cards:10, teams:3, requireFoilLetterInWord:true}` (a foil team's single letters occur in the word, e.g. en "chess" vs chip `sh`).
- **verify():** stamps `data-lcs-face="base"`, per card `data-lcs-key`, `data-lcs-seg` (the signed segmentation, `|`-joined), `data-lcs-teams` (page order); re-derive the answer = the unique page team ∈ seg; FAIL on 0 or ≥2; each team answers 2-3 of 8 cards; chips in ONE fixed page order (answer index spread both directions ≤ 3/8 per slot); the word is NOT printed.
- **Refusals:** none (6 locales). fi: chips are long vowels; ≥50% of cards contain a foil vowel SHORT (e.g. "tomaatti" with chip `ii`: short i present) so length is load-bearing.
- **Query face:** the bare genre head (digraphs / sch ch au / tweetekenklanken / sons complexes / dígrafos / pitkä vokaali).

### F1: Sort by Letter Team (K, K-3xx TBD by the emitter, CODE `mode:'sort-two'`)
- **Move:** categorise, two bins, by ear, at K density; no chips per card, no writing.
- **Child:** en "Say each picture's name. Draw a line from each picture to the box with its letter team." (86)
- **Params:** d1 `{pictures:4, bins:2}` · **d2 `{pictures:6, bins:2, split:[3,3], iconPx:72}`** · d3 `{pictures:8, bins:2, split:[3,5]|[4,4]}`. Picture strip 6 × (72 + 18) = 540 ≤ 639; two bins 300 × 280, head = the team in Baloo 2 40 px. K floors 56 / 30 / 4-8.
- **verify():** `data-lcs-bin-of` per picture = the K-set team ∈ seg; bins === `sets.k`; split 3/3 (poison 6/0 FAIL); no word printed.
- **Refusals:** none by data. Curriculum note (landing copy, not a refusal): de/nl/fr/pt/fi teach teams in grade 1; the K page is readiness in every locale ("dígrafos educação infantil", "Anlaute Sch" and esikoulu "pitkä äänne" have K demand).
- **Query face:** "+ kindergarten / Vorschule / maternelle / educação infantil / kleuters / esikoulu" + "sort".

### F2: Write the Missing Letter Team (G1, G1-3xx TBD, CODE `mode:'gap'`)
- **Move:** production: the printed word has a dashed gap exactly where the team sits; a 3-team bank at the top; the child writes the letters.
- **Child:** en "Say the picture word. Write the missing letter team from the box in the dashed spaces." (86)
- **Params:** **d2 `{rows:8, bankTeams:3, gapCells:'max', maxLetters:12}`**; layout `cardGrid({cols:1, rows:8})`, row ≈ 88, pic 64, cells `min(30, floor(460/n))` (≥ 26 answer floor up to n = 17; n ≤ 12 enforced). **`gapCells` = the LONGEST bank team on every row** (de sch/ch/au → 3 boxes everywhere) so box count never leaks the answer (the G2-324 leak rule). d1 6 rows; d3 the team bank hidden.
- **verify():** `data-lcs-gap-from/len` = the seg span of the team; the frame `pre + t + post` for every OTHER bank team is NOT a word in the locale's full approved list (frame uniqueness); gap box width identical on every row; the answer letters never printed.
- **Refusals:** none. fi: the gap is the long vowel (2 boxes on every row, K-318 double-letter ruling), bank = aa uu ää; frame check prevents "tuli/tuuli"-type second readings.
- **Query face:** "missing digraph / fehlende Buchstaben sch ch / complète avec le son / complete com nh lh / vul de klank in / puuttuva kirjain".

### F3: Read and Match (G1, G1-3xx TBD, CODE `mode:'match'`)
- **Move:** reading direction: 6 printed team words (the team underlined in coral, not coloured) left, 6 shuffled pictures right, draw lines.
- **Child:** en "Read each word. The letter team is underlined. Draw a line to the picture it names." (81)
- **Params:** **d2 `{pairs:6, underline:true, teams:3, perTeam:2}`**, `.ws-match` layout (science-pair-match), row ≈ 110, word Nunito 800 24 px, pic 72. d1 4 pairs; d3 no underline.
- **verify():** `data-lcs-pair` both sides; derangement (no word in the row of its own picture); 2 words per team; each word ≤ 10 letters and pictured.
- **Refusals:** none.
- **Query face:** "read digraph words / Wörter mit sch lesen / lire des mots avec le son / leia palavras com dígrafos / lezen tweetekenklanken / lue sanat".

### F4: Where Is the Letter Team? (G1, G1-3xx TBD, CODE `mode:'position'`)
- **Move:** position analysis of a TEAM (beginning / middle / end), reusing `positionCard` + `positionKey` (components-b3/letter-of-the-week.js) with the team chip on the card.
- **Child:** en "Say the picture word. Where do you hear the letter team? Colour the box: beginning, middle or end." (99)
- **Params:** **d2 `{cards:8, team:1 of sets.exemplar per card, posSplit:[2..3,2..3,2..3]}`**; position = index in `seg` after dropping graphemes tagged `silent` (fr loup: `p` silent → end); middle = neither first nor last spoken grapheme.
- **verify():** `data-lcs-pos` re-derived from seg + silent tags; every position used 2-3 times.
- **Refusals:** **pt REFUSED** (measured: nh 28 and lh 23 are all medial except lhama; pt words end in a vowel → "end" unreachable; a 2-position page is a non-task). fi ships but thin at "beginning" (aasi, aalto, uuni = 3: posSplit [2,3,3]); fr "beginning" needs the panel (ours, oie, ongle, antilope; oignon oi = /ɔ/ trap).
- **Query face:** "beginning, middle or end digraph / Wo hörst du sch? / où entends-tu le son / waar hoor je de klank / missä kohdassa pitkä vokaali".

### F5: Letter Teams in Sentences (G2, G2-3xx TBD, CODE `mode:'text'`)
- **Move:** connected text: 3 short decodable sentences; circle every instance of ONE target team; write how many in each sentence.
- **Child:** en "Read the sentences. Circle every sh you see. Write how many are in each sentence." (80; `{L}` = the target team)
- **Params:** **d2 `{sentences:3, target:sets.exemplar[0], hitsPerSentence:[1,4], total:[5,8]}`**; lanes Nunito 800 22 px line 44, `blankNumeralBox` per sentence (answer numeral ≥ 22).
- **verify():** count per sentence = number of `target` elements in the sentence's signed token segmentation (never `split(target)`); no falsePair token; the numbers never printed.
- **Refusals:** none by data (the sentence bank is panel-authored: 6 sentences per locale, 3 ship). de/fi words in the sentences come from the locale's everyday vocabulary, not only the picture pool; every token is segmented and signed.
- **Query face:** "digraphs in sentences / sch in Sätzen / texte son ou CE1 / tweetekenklanken zinnen groep 4 / pitkät vokaalit lauseissa".

**Rejected non-moves.** "Circle the pictures that have sh" (G1-311); "sh or ch?" two spellings of one sound (G2-324); count the sounds (K-318); a second team set as a face (data swap); a vowel-team face for en ee/ea/ai/ay (owned); diphthongs for fi (two sounds); colour-by-team (black ink). Also rejected: "word hunt grid" (wordsearch owns it).

## C. Native rebuild ×11

| loc | literals the panel authors (counts) | slots/forms needed | refusal / re-target | traps |
|---|---|---|---|---|
| en | 6 × {title, instruction}; `seg` for ~93 words (reuse the 46 already signed in `letter-of-the-week.en.units[].items[].graphemes`); falsePairs ≥6; 6 sentences + token seg | none (frames never contain a noun); `{L}` token only | - | exclude grasshopper (s-h), lighthouse (t-h), sunglasses (n-g); ch = /tʃ/ only (chef, orchid, architect, mechanic out); **tch** words (kitchen watch pitcher stretcher crutches) out: trigraph; ng only as /ŋ/ (angel orange sponge = /ndʒ/, finger/mango = /ŋg/ out); `white` paint drop; -fish compounds ≤2 per page |
| de | same; `seg` from the chunks layer, PANEL-SIGNED (chunks ≠ graphemes: the layer stores `sp`/`st` as chunks) | none; nouns keep the capital | - | `chs` = /ks/ (Dachs Fuchs Ochse Eidechse Sechseck Wachsmalstift) never a ch item; Häs-chen, Radies-chen (chunks already split them, validator re-checks); sp/st initial never a chip or distractor; Chinchilla, Christbaum, Chef out; eu/äu never together; never "Buchstabenverbindungen" |
| es | `refused:{reason, measured}` only | - | **REFUSED**: unowned = ch (28) only | - |
| pt | 6 × strings; seg ~73; sentences | none | F4 REFUSED | qu/gu only before e/i with silent u (quadrado, água, língua, pinguim BR [gw] out); "dígrafo ≠ encontro consonantal" in titles; ch excluded (owned twice) |
| fr | 6 × strings; **phoneme tag per word** (substring ≠ sound); seg ~250; `silent` tags; sentences | none | - | on/an/in only when nasal (bonnet, banane, ananas, camionnette out); -ien = /ɛ̃/ out of an/en; oignon oi = /ɔ/; ain/ein words (pain main train) are `ain`, not `in`/`ai`; om/am/em/im spellings owned; ch owned (syllable-reading); never "fiche" in a title |
| it | `refused` only | - | **REFUSED**: every team owned; qu = /kw/ | - |
| nl | 6 × strings; seg from chunks, signed; sentences | none | - | ou/au and ei/ij never on one page (ei/ij owned); IJ one grapheme; uu 2 = not a unit; ie vs i; aubergine/auteur/beige loans out; "werkblad" engine-appended |
| sv | `refused` | - | **REFUSED** | (for the record: tj-ljud is one sound with three spellings, a G2 rule, not a team family) |
| da | `refused` | - | **REFUSED** | near miss hv 5; K-1 strict pool far lower |
| no | `refused` | - | **REFUSED** | kj 6 is the only team |
| fi | 6 × strings; seg ~146 (long vowel = ONE element, `aa`); sentences | none; the target long vowel in the instruction is written out by the panel (never a token dropped into a case frame) | re-target long vowels; diphthongs out | compound seams (maa-apu type) out; loans with oo (shampoo) out; `[NSR-FLAG][fi]`; "pitkä vokaali kirjoitetaan kahdella kirjaimella" is the teaching sentence |

## D. Data + gates

```js
// data/b5/digraphs.js  (+ data/b5/locales/digraphs.<loc>.json generated by tools/apply-b5-locale.js)
DIGRAPHS[loc] = {
  head, refused: null | { reason, measured: { '<team>': n } },
  teams: { '<t>': { t, sound: '/ʃ/', band: 'G1', items: [
      { vocabKey, theme, noun, word, seg: ['sh','i','p'], silent: [], pos: 0|'mid'|'end', picOpened: true } ] } },
  samesound: [['ou','au'], ...],          // never two of a group on one page
  owned: ['ck','ee', ...],                // copied from the spelling-rules + syllable-reading banks by the validator, not typed
  falsePairs: [{ word, letters, why }],   // en grasshopper 'sh', de Häschen 'sch', de Fuchs 'ch' ...
  sets: { exemplar: ['sh','ch','th'], k: ['sh','ch'] },
  sentences: [{ id, text, tokens: [{ w, seg }] }],   // F5, >= 6
  strings: { 'G1-380': {title, instruction}, '<face ids>': {...} }
}
```
Reuses: `letter-of-the-week` unit items (`graphemes` = already-reviewed segmentations for en sh/ch/th, de sch/ch/ei/au, pt nh/lh, fr ou/on/an/oi, nl oe/ui, 17-27 each) as the seed; `positionCard/positionKey/letterChips` (components-b3/letter-of-the-week); `blankNumeralBox` (components-b3/ordinal-numbers); `sampleEntries`, `distinctByWord`. New: `lib/b5-common.js bank()` over `data/b5/`.

**Validator (`tools/validate-b5-draft.js`, digraphs part; exit 1 on any):**
1. every item's `vocabKey` is in `approved-words-<loc>.json` and `word` === its approved word; `hasPicture` true; theme dir carries no localized BW marker; `picOpened:true`.
2. `seg.join('') === word` (case-folded).
3. the item's team ∈ `seg` exactly once.
4. no team is in `owned` (derived at validation time from `bank('spelling-rules')` cands + `bank('syllable-reading')` blends/rows); no blend is a team.
5. the word is not in `falsePairs` for any page team; no page team occurs as a letter substring outside its seg element.
6. de/nl: `seg` agrees with the `chunks` layer after splitting the non-team chunks into letters (`sp` → s,p); a disagreement FAILS.
7. `samesound` groups: at most one member per page (`sets.*`).
8. floors: ≥3 teams × ≥6 items, else the locale must carry `refused` with measured counts; a refused locale carries NO items.
9. F2 frame uniqueness against the WHOLE approved list for every other bank team.
10. F4: `pos` re-derived from seg minus `silent` equals the stored `pos`; each position has ≥3 items in `sets.exemplar`, else F4 refused for the locale.
11. F5: each sentence's hit count 1-4, total 5-8; every token segmented.
12. titles ≤70 without the worksheet word, unique in band; instructions ≤150 with an end mark, naming only on-page apparatus (chips / boxes / lines / bins / sentences).

**Poison cases (each must FAIL; the correct draft is the control):** (1) en `grasshopper` as an sh item; (2) de `Häschen` as sch; (3) de `Fuchs` as ch; (4) en `chef` as ch; (5) en `toothbrush` on a page with chips th + sh (two answers); (6) nl `ou` and `au` in one set; (7) fr `banane` tagged `an`; (8) es block with items and no `refused`; (9) de `ie` as a team (owned); (10) en `st` as a team (blend); (11) fi `jääkaappi` with chips ää + aa; (12) fr `loup` with `silent:[]` stored `pos:'end'`; (13) F5 sentence claiming 3 hits whose seg holds 2; (14) `picOpened:false`; (15) F2 row whose gap width differs from the page maximum; (16) `seg` joining to a different word.

**`qa/verify-b5-digraphs.js` on the render:** density floors per face band (K 56/30, G1 44/26, G2 36/22) measured on the rendered boxes; body ≤ 722 at the three-line-title chrome and the fi four-line title (677); lanes ≤ 639; chips identical size and fixed order; exactly one chip ∈ seg per card; per-team answer counts within `perTeam`; answer-slot distribution measured in BOTH directions; no answer text anywhere (base/F1/F4 print no word; F2 prints no gap letters; F5 prints no numerals); `data-ws-content` present; every picture src resolves (throw, never blank).

## E. SEO

Title patterns (engine appends the worksheet word; `{SET}` = `sets.exemplar` joined by the locale's list style):

| face | Germanic (en / de / nl) | Romance (fr / pt) | fi |
|---|---|---|---|
| base | Digraphs {SET}: Circle the Letter Team / Wörter mit {SET}: Welchen Laut hörst du? / Tweetekenklanken {SET}: welke klank hoor je? | Les sons complexes {SET} : quel son entends-tu ? / Dígrafos {SET}: qual dígrafo tem? | Pitkä vokaali {SET}: mikä kuuluu? |
| F1 K | Sort by Digraph: {K} / Laute sortieren: {K} / Sorteren op klank: {K} | Trier les sons {K} / Separe os dígrafos {K} | Lajittele pitkät vokaalit {K} |
| F2 | Write the Missing Digraph / Fehlende Buchstaben: {SET} / Vul de klank in: {SET} | Complète avec le bon son : {SET} / Complete com o dígrafo | Kirjoita puuttuva pitkä vokaali |
| F3 | Read Digraph Words and Match / Wörter mit {SET} lesen / Lees en koppel: {SET} | Lire des mots avec {SET} / Leia e ligue: dígrafos | Lue ja yhdistä: pitkät vokaalit |
| F4 | Beginning, Middle or End Digraph / Wo hörst du {T}? / Waar hoor je {T}? | Où entends-tu le son {T} ? / (pt refused) | Missä kohdassa pitkä vokaali? |
| F5 | Digraphs in Sentences / {T} in Sätzen finden / Tweetekenklanken in zinnen | Le son {T} dans un texte / Dígrafos em frases | Pitkät vokaalit lauseissa |

Meta MIDDLEs = the six instructions above (en 80-99 chars; with the title and level the whole meta lands 120-170 in en; de/fi run ~35% longer: the panel shortens the instruction, never the title head).

Coordinates: `{type:'digraphs', mode, level, theme:''}` with modes `base` · `sort-two` · `gap` · `match` · `position` · `text`; levels: base/F2/F3/F4 = G1 key (`grade-1` · `1-klasse` · `groep-3` · `cp` · `1o-ano` · `1-luokka`), F1 = K key (`kindergarten` · `vorschule` · `kleuters` · `maternelle` · `educacao-infantil` · `esikoulu`), F5 = G2 key (`grade-2` · `2-klasse` · `groep-4` · `ce1` · `2o-ano` · `2-luokka`).

Non-cannibalisation (whole-page 3-gram Jaccard, est.): base ↔ G1-311 Sound of the Week ~0.10 (fixed team vs fixed item; different title head) · F2 ↔ G2-315 base ~0.14 (gap move shared; teams are different sounds, not a rule; G1 vs G2) · F1 ↔ G2-326 sort-by-rule ~0.10 · F4 ↔ K-326 beginning-middle-end **~0.20, the highest pair**: fenced by the team chip, "letter team"/"Buchstabengruppe" in the head, G1 vs K; F3 ↔ K-225 word↔picture ~0.08 · F5 ↔ G1-341 read-and-check ~0.05 · face ↔ face: base ↔ F2 ~0.18 (same teams, different act), base ↔ F4 ~0.15, all others < 0.12.

## F. Open questions + summary

**Engineer must measure:** the fi four-line title at 677 px for F4; F2 row fit for de 12-letter words at cell 30 (460 px lane est.); whether `positionCard` accepts a multi-letter chip without widening (`letterChips` px 48 holds "sch"? est.); the fr phoneme-tagged counts (my fr numbers are regex drafts); that every picture named in a bank is opened (none opened in this pedagogy pass: `picOpened` is the gate).
**Only a native panel can rule:** fr phoneme tags + silent letters; de/nl chunk-to-grapheme signatures; fi whether the chips should be three long vowels (my design) or the binary "a vai aa" (rejected here: it is the G2-324 length-choice move on vowels); pt whether qu/gu belong in a G1 set (BNCC lists them; my set uses qu); whether the K face is honest readiness in each locale's own frame; the sentence banks.
**Operator-level flags:** the hub ships 35 rows, not 66; the refusal of da hinges on ONE missing `hv` picture word; the G1-311-as-move-fence ruling (Boundary 4) should be confirmed by the critic.

**Summary.** Six faces: base Which Letter Team (G1) · F1 Sort by Letter Team (K, 2 bins) · F2 Write the Missing Letter Team (G1) · F3 Read and Match (G1) · F4 Where Is the Letter Team (G1) · F5 Letter Teams in Sentences (G2). Ships en de pt fr nl fi (fi re-targeted to long vowels). REFUSED: es (1 unowned team, ch 28) · it (0) · sv (0 teams ≥6: tj 1, kj 1, hj 3, lj 2) · da (ld 8, rd 6, hv 5: two teams) · no (kj 6 only). F4 refused in pt (no word-final nh/lh). 35 landings.
