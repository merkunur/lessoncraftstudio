# K-317 `letter-of-the-week`: pedagogy + content design (2026-09-13)

Numbers are MEASURED (node over `lib/b2-common.js entriesFor` × 37 colour themes, intersected with `approved-words-<loc>.json`) unless marked *est.* Read: `_STUDIO-BRIEF`, `_SUBSTRATE`, `_PANEL-FINDINGS §1`, K-221/228/229/222, `lit-sound-match.js`, `lit-letter-knowledge.js`, K-238, K-284, `letter-sets.js`, `letter-knowledge.json`, `beginning-sounds.json`, `b2-common.js`, `gate-variation-distinct.js`, `validate-b2-draft.js`, `apply-b2-locale.js`, `qa/lints.js`.

## A. Identity

| field | value |
|---|---|
| family key | `letter-of-the-week` (absent from `topics-taxonomy.json` `apps.*` and `axes['exercise-type']`, measured) |
| band | K (V4 bands G1 by content in 9 locales, see B) |
| `default_subject` | `letters` (as `beginning-sounds`) |
| theme axis | **`{applicable:false}`**. No theme reaches 4 initial-letter nouns for most letters (en animals `m` 1/37, de zoo `m` 0/34, fr toys `m` 0/30; only `around the house` 80 / `At the Supermarket` 63 reach ≥4 for s/t/k/b). Items are a cross-theme per-letter pool authored per locale (the K-221 model); pictures from any colour theme, BW excluded by the localized marker. **Fan lever = the LETTER** (`letters[]` per locale, 18–24 usable letters measured, table C). |
| CCSS (K, honest) | base RF.K.1.d + RF.K.3.a (+ RF.K.2.d sound-level locales) + L.K.1.a (trace) · V1 RF.K.2.d · V2 RF.K.1.d · V3 RF.K.3.a + L.K.1.a · V5 RF.K.3.a · **V4 en = readiness** (digraphs are RF.1.3.a; no G1 code on a K page) |
| eligible pool (approved ∩ picture) | en 701 · de 624 · es 673 · pt 625 · fr 572 · it 686 · nl 647 · sv 597 · da 514 · no 516 · fi 689 |

| loc | genre HEAD the title carries | slug | level label |
|---|---|---|---|
| en | Letter of the Week (+ letter) | `letter-of-the-week` | kindergarten |
| de | **Buchstabeneinführung** (panel: no "Buchstabe der Woche" genre; V1 = Anlaut Inlaut Auslaut) | `buchstabeneinfuehrung` | Vorschule (hunt); panel may band the type 1. Klasse, where the Lehrplan places Buchstabeneinführung |
| es | **La letra M** (V1/V5 "sonidos iniciales") | `la-letra` | preescolar; V2/V3 may sit primer grado |
| pt | **Atividades com a letra M** ("atividades" ≠ the worksheet word "folha") | `atividades-com-a-letra` | educação infantil / 1º ano |
| fr | **La lettre M** ("fiche" is the fr worksheet word, banned); V4 = **Le son [ou]** | `la-lettre` | maternelle GS; V4 CP |
| it | **La lettera M** ("scheda" banned); V4 = suoni difficili CH GH GN GL SC | `la-lettera` | infanzia; panel likely classe prima |
| nl | **Letter van de week: de k** (hunt = beginklank) | `letter-van-de-week` | kleuters; V4 groep 3 |
| sv | **Veckans bokstav** | `veckans-bokstav` | förskoleklass |
| da | **Ugens bogstav** | `ugens-bogstav` | børnehaveklasse |
| no | **Ukens bokstav** | `ukens-bokstav` | 1. trinn |
| fi | **Viikon kirjain** (hunt face adds "kirjainjahti" to escape the "iso vai pieni alkukirjain" collision) | `viikon-kirjain` | esikoulu |

## B. The six faces

Base skeleton: zone 1 **Trace** = two `strokeLetterLane` side by side (`M` and `m`; laneW 320, laneH 96, glyphH 56, reps 3); zone 2 **Hunt** = `cardGrid` 2×4 cards 150×150, icon 96, stamped `[data-ws-content]`; zone 3 **Write** = two `rulingBlock` rows (glyphH 40) with one solid model glyph at the left. Stack ≈ 96+320+112+gaps ≈ 610 px < 760. K floors hold (icon 96 ≥ 56; boxes 40 ≥ 30). Cards carry no text, so the answer is never printed.

| # | id | EN title (≤70) | TEACHING MOVE (only this face) | child DOES at d2 | d1 / d3 | PARAM or CODE |
|---|---|---|---|---|---|---|
| base | K-317 | Letter of the Week: Mm | Bind both print forms of ONE letter to its sound: form → initial hunt → free writing | trace M and m ×3; circle the 4 of 8 pictures whose word BEGINS with the letter (4 foils whose initials are on the letter's `avoid` list); write one row of M, one of m | d1: 6 pictures (3 hits), glyphH 72 · d3: 8 pictures, foils = the pair letter + one foil CONTAINING the letter non-initially | base |
| V1 | K-3xx | Beginning, Middle or End: Where Is the M? | Locate the grapheme INSIDE a word (Anlaut/Inlaut/Auslaut), not only at the onset | 6 cards (2×3): picture + three 40 px boxes (●○○ ○●○ ○○●); colour the box where the letter sits; 2 start / 2 mid / 2 end, letter once per word. Letter-level locales (en fr da) PRINT the word (visual locate); sound-level do not (auditory) | d1: start vs end (2 boxes) · d3: 8 cards, letter may occur twice | CODE `positions:{boxes, showWord, mode:'letter'\|'syllable'}` |
| V2 | K-3xx | Circle the M in the Words | Recognise the letter in BOTH cases inside real printed words; count occurrences | 6 rows: picture 72 px + word in 34 px Baloo on school lines; circle every M/m (1–2 per word, ≥8 total); write how many in a dashed count box. 2 of 6 words in block capitals so the capital counts (de nouns already open capital) | d1: 1 occurrence each, no count box · d3: words to 9 letters, up to 3 occurrences | CODE `wordHunt:{countBox, capsRows:2}` |
| V3 | K-3xx | Write the Missing M | PRODUCE the letter in its position within a word and choose the case (de: capital when initial) | 6 rows (2×3): picture 80 px + word as solid teal glyphs on school lines with ONE dashed glyph-sized box where the letter is missing; positions 2/2/2, letter once | d1: always initial (a one-letter K-221; unpublished, say so) · d3: 2 blanks per word or 7–9 letters | CODE `fillLetter:{blanks:1}`; needs `strokeWordLane({blankIndex})` (engineer) |
| V4 | G1-3xx (K in en) | Sound of the Week: sh, ch, th (per-locale unit) | Two letters, ONE sound: hunt the UNIT anywhere in the word; trace it as a unit | zone 1 traces the unit as a word lane (`Sch`/`sch`, `IJ`/`ij`, `ou`); 8 pictures: 4 CONTAIN the unit (fr `ou` is initial in 1/45, measured, so position = any), 4 foils with the component letters separately; write row of the unit | d1: 6 pictures, unit initial where the locale allows (de sch 43/83 initial) · d3: foils carry the near-unit (ch vs sch, ou vs on) | CODE `unit:{text, huntPos:'any'}` |
| V5 | K-3xx | M or N? Hear the Difference | Discriminate the letter from its closest confusable SOUND by a forced two-way choice | 8 pictures (2×4), two 44 px letter chips under each (m \| n); circle the chip the word begins with; 4+4 shuffled | d1: 6 pictures, 3+3 · d3: three chips (m \| n \| w), 3/3/2 | CODE `pair:{a, b, chips:2}` |

**verify() (stamp → re-derive):** base: per card `data-lcs-word/target/hit/level/graphemes`; hit re-derived as `word[0]` (letter level) or `graphemes[0]` (sound level) === target; hits === `d.hits`, foils ≥4 and none begins with the target, no duplicate words, two `[data-lcs-prim="trace-letter"]` with `lcsText` = upper/lower target, ≥2 empty school-line trios; FAIL if any text node equals a card word. V1: `data-lcs-pos` re-derived from `graphemes.indexOf(target)` (or `data-lcs-split` in syllable mode); 2/2/2; `showWord` matches level. V2: `data-lcs-hits` re-counted case-insensitively in the rendered word; ≥6 rows, ≥8 total; `capsRows` rows all-capitals (the K-284 `casemode` branch). V3: `word[data-lcs-blank]` === target; lane has `letters-1` solid glyph paths and one dashed box at that slot. V4: unit ∈ `chunks` (de nl sv no) or ∈ panel `graphemes`; foils never contain the unit substring. V5: `data-lcs-answer` re-derived from the first grapheme; 4/4; chips differ.

**Refusal is data.** A letter drops out of a face when its pool misses the floor (D); a locale sets `refuse:{V1:'reason'}`. Fan capacity (letters passing base ≥4 initial + ≥4 foils / V1 2-2-2 once / V2 ≥6 / V3 ≥6 once): en 22/20/26/26 · de 20/17/25/25 · es 21/13/26/26 · pt 22/14/23/23 · fr 20/15/25/25 · it 19/11/21/21 · nl 21/14/24/24 · sv 18/17/26/26 · da 23/20/27/27 · no 20/16/25/25 · fi 21/8/24/24. fi V1 = 8 letters (Finnish words seldom end in a consonant) → fi re-targets V1 to SYLLABLE position (1st/2nd/3rd tavu from the approved `split`). de/nl/sv/no counts are grapheme-true: a letter hidden in a multigraph is not a hit (de `c` has 2 initial once `sch`/`ch` are removed; a letter-level count would ship "c" in "Eichel" as a sound hit).

**Query face:** base = bare head + letter ("letter m worksheets kindergarten", "Buchstabe M", "letter k werkblad") · V1 = position ("beginning middle end m", "Anlaut Inlaut Auslaut M") · V2 = "circle/find the m in words" · V3 = "missing letter m", "Buchstabe M einsetzen" · V4 = the unit string ("sh ch th", "sch", "son ou") · V5 = the pair ("m or n", "b oder p").

**Considered and REJECTED:** theme swap (not a face) · "Trace the M words" (K-284 re-skin, same motor act) · "which picture does not belong" rows (base re-roll) · "Draw four things with M" (open-ended, no verify, thin) · "Capital and small of the week" (K-222) · "Sort into M/N bins" (K-228) · base d3 relabelled "hard hunt" (foil policy only, no teaching move).

## C. Native rebuild plan ×11

| loc | teaching point that differs | V4 units (pool: grapheme-true / substring) | letter vs sound | panel authors | refusal | traps |
|---|---|---|---|---|---|---|
| en | letter names + primary sound; c/g hard only | sh 30 · ch 40 · th 20 (substring; grapheme-true subset UNKNOWN, panel marks) | letter; V1 prints word | items, `avoid`, pairs (m/n b/p d/t f/v g/k s/z), V4 readiness note | q x y z (initial 1/2/1/2) | V4 no CCSS code; y as vowel |
| de | Buchstabeneinführung; Nomen keep capital; Sch/St/Sp onsets | sch 83 (43 initial) · ch 66 · ei 34 · au 43 · eu 7 (refuse) | sound; chunks ARE graphemes (1026/1028) | items, pairs (b/p d/t g/k m/n f/w), units | ä ö ü y q x (0–2 initial); bare `c` | V3 initial blank must be CAPITAL; `s` foils must not start sch/sp/st |
| es | sonidos iniciales; h silent; c/g soft before e/i | ch 26 · ll 45 · rr 20 (never initial) | sound; chunks = syllables → panel `graphemes` | items with `graphemes`, units, pairs | h k w x y ñ; h refused at sound level | b/v homophones: NEVER a pair; no articles printed |
| pt | som das letras; dígrafos nh/lh/ch 1º ano; h silent | nh 25 · lh 20 · ch 20 (none initial) | sound; panel `graphemes` | items, pairs (p/b t/d f/v m/n), units | k w y (0–1), h, x (4 sounds) | ã/õ never a target |
| fr | GS = lettre, CP = son; letter hunt only | ou 45 · on 57 · oi 25 · an 53 · en 23 · ch 44 (substring) | letter (base); V4 = son | items, units with `graphemes`, pairs (b/p d/t f/v s/z m/n) | q w x y z u (≤2 initial) | "fiche" banned; silent finals make V1 `end` a letter position; V1 prints word |
| it | 21 letters; suoni difficili classe prima | ch 35 · gh 8 · gn 11 · gl 22 · sc 32 (substring) | sound; panel `graphemes` | items, units, pairs (p/b t/d f/v m/n c/g) | h 1, q 3, z 5 | "scheda" banned; c/g split by vowel; V1 end ≈ always a vowel (11 letters) |
| nl | letter van de week + beginklank; tweetekenklanken groep 3 | ij 28 · oe 53 · ui 28 · au 15 · ei 12 · eu 9 | sound; chunks are graphemes (1060/1062) | items, units, pairs (b/p d/t s/z m/n k/g), `IJ` as two capitals | q x y u (0–1 grapheme-true initial) | de/het never printed; `ij` is one chunk, so i/j hunts exclude it |
| sv | veckans bokstav; dubbelteckning åk 1 | sj 8 (too small) · ng 39 · ll 24 · tt 18 → units = double letters at åk 1 | sound; chunks are graphemes | items, units, pairs (b/p d/t g/k m/n f/v) | q w z (0–1), o 2, å 0 | definite forms never printed (bana→banan) |
| da | bogstavlyde 0. kl; dobbeltkonsonant 1. kl | ng 29 · ll 19 · kk 15 · mm 12 (substring) | letter; V1 prints word | items, pairs (b/p d/t g/k m/n f/v); units labelled 1. klasse or refused | q w x y å (≤1) | soft d/stød: end = letter level; use the K-1 strict pool (402, policy_managed:false) |
| no | bokstavinnlæring 1. trinn; kj/skj/sj 2.–3. trinn | kj 14 · skj 9 · sj 14 · ng 26 · ll 30 · kk 32 | sound; chunks are graphemes | items, units (band 2. trinn), pairs | æ 0, w x z q | bokmål only |
| fi | äänne = kirjain; pitkä/lyhyt (kk tt aa) is THE OPS point | kk 101 · tt 36 · ll 28 · pp 28 · aa 45 · ii 32 · uu 27 (substring) | sound; panel `graphemes` (double letter = one unit) | items, units, pairs (m/n k/t p/t l/r), syllable table for V1 | b c d f g q w x z å ä ö (≤1 native initial) → 21 letters | no articles/gender; V1 letter mode refused → syllable mode |

## D. Data + gates

`data/b3/letter-of-the-week.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; en block hand-authored):

```
LETTER_OF_THE_WEEK[loc] = {
  level:'letter'|'sound', positionMode:'letter'|'syllable', showWordInPositions:bool,
  chips:{start:'●○○',middle:'○●○',end:'○○●'} | {s1:'1',s2:'2',s3:'3'},
  letters:[{ L:'m', upper:'M', pair:'n', avoid:['n','w'],
     items:[{theme,noun,word,graphemes:['m','a','u','s'],pos:0}],  // ≥8 initial + ≥2 mid + ≥2 end
     foils:[{theme,noun,word}] }],                                  // ≥6, never contains L
  units:[{u:'sch',upper:'Sch',band:'G1',items:[…≥8],foils:[…≥6]}], // ≥3 or refuse V4
  refuse:{V1?,V4?}, strings:{'K-317':{title,instruction}, V1..V5}  // ≤70 / ≤150
}
```
Sizes: letters ≥12 per locale (capacity 18–24), items ≥12 per letter, foils ≥6, units ≥3.

**`validate-b3-draft.js` (all rules run; any error exits 1):** (1) every `word` maps by `vocabKey` into `approved-words-<loc>` (da: the strict pool); (2) `graphemes.join('') === word.toLocaleLowerCase(loc)`; (3) in de/nl/sv/no `graphemes === chunks.flat()` (grapheme-level there; elsewhere chunks == split, measured, so the panel's graphemes are the only source); (4) hit: `graphemes[0] === L` (sound) or `word[0] === L` (letter); `pos` = index of the first target grapheme; (5) foil: no `L` anywhere (base/V5), no unit substring (V4); (6) picture exists via `fileUri(theme, noun)`; theme has no localized BW marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); (7) no duplicate word across items+foils of a letter; de keeps the capital, others lowercase; (8) `pair` ∈ letters with ≥4 initial items each side; es rejects b/v; (9) per-face floors, else the letter is dropped from that face (reported, never filled); (10) titles: `WORKSHEET_WORD` guard, ≤70, unique in band; instruction ≤150; (11) unit ≥2 chars and one chunk in ≥8 items where chunks are graphemes.

**Data gate `qa/verify-b3-letter-of-the-week.js`:** renders face × letter/unit × 11 locales at d2 through the generator; asserts `verify()` empty, lints clean, hits === config, a 20-seed sweep puts target cards in ≥6 of 8 slots (not solvable by position), no text node equals a hidden answer word. Poison (each must FAIL; a correct draft is the control): P1 a foil replaced by an item starting with L; P2 de Schaf with `graphemes:['s','c','h',…]` (rule 3); P3 V3 blank index on a non-target glyph; P4 a `zoo animals bw` noun (rule 6); P5 `pos:1` for a word-initial letter (rule 4).

**Page reads:** `data/b3/letter-of-the-week.js[loc]` only (graphemes, pos, split copied in at apply time); `fileUri(theme, noun)`; `displayWord`; `traceable(word)` guards V2/V3 rows; `strokeLetterLane`/`strokeWordLane`/`rulingBlock`. Never `image-vocabulary.js` or `approved-words` at render.

## E. SEO

| face | title pattern (Germanic · Romance · Nordic/fi) | meta MIDDLE (120–170 total) | landing |
|---|---|---|---|
| base | "Letter of the Week: Mm" · "Buchstabeneinführung: M m" · "Letter van de week: k" / "La letra M" · "Atividades com a letra M" · "La lettre M" · "La lettera M" / "Veckans bokstav: M" · "Ugens bogstav: M" · "Ukens bokstav: M" · "Viikon kirjain M: kirjainjahti" | Trace M and m, circle the four pictures that begin with M and write the letter (kindergarten) | h1 = title; eyebrow = level; strand: en Foundational Skills · de Lesen und Schreiben: Buchstaben und Laute · es Lenguaje y comunicación · pt Língua Portuguesa: alfabetização · fr Découvrir le principe alphabétique · it Italiano: strumentalità di base · nl Beginnende geletterdheid · sv Läsa och skriva · da Afkodning · no Lese og skrive · fi Lukemaan ja kirjoittamaan oppiminen |
| V1 | head + "Beginning, Middle or End" · "Anlaut, Inlaut, Auslaut" · "begin, midden of eind" / "al principio, en medio o al final" | Colour the box that shows where the M is heard in each word | same strand |
| V2 | head + "Circle the M in the words" · "Buchstabe M in Wörtern finden" | Find and circle every M in six picture words, then count them | same |
| V3 | head + "Write the missing M" · "Buchstabe M einsetzen" · "escribe la M que falta" | Write the missing M into six picture words on school lines | same |
| V4 | unit head: "Sound of the Week: sh ch th" · "Sch und ch" · "ij en oe" / "Le son [ou]" · "ch, ll, rr" / "Dubbelteckning: ll tt" · "Kaksoiskirjaimet kk tt" | Trace sch and circle the four pictures that contain it (1. Klasse) | eyebrow = G1 label; en JSON-LD carries no code |
| V5 | pair head: "M or N?" · "M oder N?" / "¿M o N?" / "M eller N?" · "M vai N?" | Circle m or n under each picture to show its first sound | same |

Non-cannibalisation: base owns head + letter; V1 the position words; V2 "circle in words"; V3 "missing"; V4 the unit string (never one letter); V5 "X or Y". No two titles differ only by an adjective; every variation changes a knob, none re-points a base level (`gate-variation-distinct.js` on resolved d2).

## F. Open questions

1. Wave axis: wave files fan `themes` only (`waves/wave-b2-en.json` keys measured). A `letters` axis is needed; who adds it? Landing precedent: `letter-tracing` (theme OFF) has 6 landings per locale; `beginning-sounds` has 0 in all 11 (measured), the hub gap the panel named.
2. `scripts/verify-hub-type-rows.js` does not exist (measured); build before the wave.
3. `strokeWordLane({blankIndex})` (V3) and a chip primitive (V5) are new code in `trace-path.js`/`components-b3.js`; `components.js` stays untouched.
4. Meta lead: the brief writes "Free printable {TITLE}"; MEMORY records a "nothing is free" prose sweep. Confirm the live `bandedDescription` lead before panels write MIDDLEs.
5. V4 id band: G1 in de/nl/fr/it/es/pt/sv/no/da, K in en/fi. Per locale or per face? (Hub gate expects 6 rows per key per locale either way.)
6. en/es/pt/fr/it/da/fi have NO grapheme data (chunks == split, measured). Accept panel-authored `graphemes` with a second cold panel audit, or extend the phonics pipeline first?
7. The Romance "ma me mi mo mu" head is NOT a face here (G1-306 `syllable-reading` territory). Confirm, or es/it re-target V4.
8. Exemplar letter for `canonicalDeckSlug`: panel choice (*est.* en M, de M, es M, pt A, fr A, it A, nl k, sv S, da S, no S, fi A).

**Summary.** K-317 is a per-LETTER page (theme axis off; letter fan of 18–24 letters per locale, measured) with three zones: trace both forms, hunt initial pictures among foils, write the letter. Five variations each change the child's act: locate the letter's position (V1), circle it inside printed words and count (V2), write it into a gapped word (V3), hunt a two-letter unit (V4, G1 by content), choose between the letter and its confusable pair (V5). Sound-level locales (de es pt it nl sv no fi) author grapheme-true items; letter-level locales (en fr da) hunt letters and print the word on V1. Grapheme data exists only in de/nl/sv/no; elsewhere the panel authors `graphemes` and the validator binds them to the approved word. Refusals are data flags: fi V1 → syllable mode, sv/da V4 → double consonants, es b/v never a pair.
