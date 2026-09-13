# G2-315 `spelling-rules` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 unless marked *est.* Method: `lib/b2-common.js entriesFor(theme, loc)` over the 50 cached colour themes (`cache/manifest.json`, BW skipped by the `bw` flag), distinct by `vocabKey`, stored singular via `displayWord`, `/^\p{L}+$/u`; joined to `approved-words-<loc>.json` on `key === vocabKey` where a split or grapheme layer is needed. "usable" = rule hits minus FRAME COLLISIONS (another pool word equals `pre + candidate + post` for a candidate of the rule's set, fixed width). Pools per locale: en 876 · de 870 · es 825 · pt 803 · fr 790 · it 830 · nl 870 · sv 874 · da 876 · no 873 · fi 874.

## A. IDENTITY

| field | value |
|---|---|
| id / key / band | `G2-315` / `spelling-rules` / G2 (faces 2-6 also G2; F5 is G3 in fi/it where the panel bands it so). `default_subject: letters`, `default_age_range: 7-9`, `assetClass: icon-placement`. Key ABSENT from `topics-taxonomy.json` (grep = 0): register before the wave (registrar clone of `tools/register-b2-taxonomy.js NEW_FAMILIES`). |
| theme axis | **`{applicable:false}` + `ruleAxis`** (the K-317 `letterAxis` mechanism: exemplar per locale in the bank, `rulesPerType` + `ruleOverrides` in the plan, `deckIdFor` suffix `-r<ruleId>`). Measured: the base rule reaches >= 8 usable words in >= 8 themes only where the rule is dense (it doppie 21 themes · fi kaksoiskonsonantti 24 · no dobbel 15 · sv dubbel 11 · de Doppelkonsonant 11 · es b/v 12 · fr o/au/eau 15 · en c/k/ck 12) and in **0-1 themes** for de ie (1), nl open lettergreep (0), da dobbelt (1-2), pt s/ss (1), fr m devant (0), en magic e (1). A themed page would make the RULE a function of the theme in 6 locales. Pictures come from a cross-theme per-rule `items[]` pool, pre-resolved by the panel. |
| fan lever | the RULE. nt20-C ships ONE exemplar rule per face per locale; the per-rule fan is the additive knob. |
| CCSS (en; honest) | base L.2.2.d + RF.1.3.c (magic e) · F1 RF.2.3.a + L.2.2.d · F2 RF.2.3.b · F3 L.2.2.d · F4 L.2.2.d + RF.2.3.a · F5 L.2.2.d (y to ies, f to ves; NOT L.2.1.b, which is irregular plurals). Non-EN names the national framework only. |
| data | picture + word + plural from the vocab; `approved-words` for nl `split` (open syllable) and de `chunks` (`ie` as one grapheme); everything else is a regex over the stored word, confirmed word by word by the panel (the regex DRAFTS the bank, the literal ships). |

Per-locale identity (heads from `_PANEL-FINDINGS.md` section 5; slugs are proposals):

| loc | genre head (base title) | ASCII slug | G2 label | rule ladder (usable pool; base = **bold**; fan order) |
|---|---|---|---|---|
| en | Spelling Rules | `spelling-rules` | grade 2 | **magic e 72** (31 one-syllable) · c/k/ck 188 · ai/ay 35 · floss 19 (F1/F3 refuse) · ee/ea 66 (pattern, not rule: no F1) |
| de | Rechtschreibregeln | `rechtschreibregeln` | 2. Klasse | **Doppelkonsonanten 190** (incl. ck/tz 45) · Auslaut b/p d/t g/k 44+50 (proof) · i/ie 37 (+109 short-i contrast) · Dehnungs-h 41 · ss/ß 36 · au/äu 8 REFUSED as a fill rule (F5 Ableiten 69) |
| es | Reglas de ortografía | `reglas-de-ortografia` | segundo grado (MX) | **b/v 164** · c/qu 193 · g/gu 75 · ll/y 61 · h muda 31 · g/j 30 · z to ces 8 (F5, marginal) |
| pt | Regras de ortografia | `regras-de-ortografia` | 2º ano | **s/ss 64** · m antes de p e b 25 (+85 n-contrast) · r/rr 166 · nh/lh/ch 84 · ç 22 · x/ch 44 |
| fr | Règles d'orthographe | `regles-d-orthographe` | CE1 | **m devant m, b, p 26** (+92 n-contrast) · o/au/eau 208 · lettre finale muette (panel bank, *est.* 40-60) · ch/gn/ph 81 · ou/on/an 169 = K-317 F5, NOT here |
| it | Regole di ortografia | `regole-di-ortografia` | classe seconda | **doppie 249** · c/ch 119 · g/gh 51 · gn/gli 34 · sc/sci 13 (F0/F4 only) · cu/qu/cqu 11 REFUSED (closed list) |
| nl | Spellingregels | `spellingregels` | groep 4 | **open en gesloten lettergreep 71+108** (via the plural) · eind-d/-t verlengen 100 · ei/ij 52 · au/ou 23 · verkleinwoorden REFUSED (no diminutive bank; a form, not a gap) |
| sv | Stavningsregler | `stavningsregler` | åk 2 | **dubbelteckning 183** (+290 single contrast) · ng-ljudet 56 · sj-ljudet <= 31 · tj-ljudet <= 64 (upper bounds: `kiwi`, `cykel`, `basket` are false regex hits; panel list) |
| da | Staveregler | `staveregler` | 2. klasse | **dobbeltkonsonant 119** (strict 50; plural proof 39) · stumt d 55 · ng 42 · stumt h 9 REFUSED |
| no | Rettskriving | `rettskriving` | 3. trinn | **dobbel konsonant 205** (+295 single contrast) · kj-lyden <= 45 · sj-lyden <= 35 (panel list) · ng 49 |
| fi | Oikeinkirjoitus | `oikeinkirjoitus` | 2. luokka | **kaksoiskonsonantti 276** · pitkä vokaali 167 · astevaihtelu kk/pp/tt 141 (F5; 3. luokka per OPS) · ng/nk 36 · diftongit UNKNOWN (panel) |

Gap derivation (first regex match over the stored lowercase word): de Doppelkonsonant `([bdfglmnprst])\1|ck|tz` · de Auslaut `[bdg]$`, proof = plural `(e|en|er)$` with the stem carried · de ie = the `chunks` element `ie` (never a regex: `Familie` is two syllables) · de Dehnungs-h `(?<=[aeiouäöü])h(?=[lmnr]|$)` · nl open/gesloten: gap in the PLURAL, vowel `[aeou](?=[bdgklmnprt]en$)` (boom-bomen) or double `([bdfgklmnprst])\1(?=en$)` (kat-katten), open syllable confirmed against `split` · nl d/t `[dt]$`, proof `(den|ten)$` · en magic e = TWO boxes (`c_k_`): `[aeiou](?=[bdfgklmnprstvz]e$)` + `e$` · en c/k/ck `ck|(?<!c)k|c(?=[aou])` · doubles `(\p{L})\1` over the locale consonant set (+ sv `ck`), fi vowels likewise · fi astevaihtelu: gap in the PLURAL `[kpt](?=[aeiouyäö]t$)` where `plural === weak grade + t` · fr `(?<=[aeiouy])m(?=[mbp])`; o/au/eau `eau|au|o(?![uin])`, `-saure` excluded · it c/ch `ch(?=[ei])|(?<!s)c(?=[ei])` · es `[bv]` · pt `ss|(?<=V)s(?=V)`, `m(?=[pb])`. Literal digraphs (ei/ij, au/ou, ai/ay, nh/lh/ch) match verbatim.

## B. THE SIX FACES

Common layout (design file owns px): rule box on top (chip in Baloo 2 teal + two MODEL words with the rule grapheme in coral; models are never items) + 8 full-width rows: picture 60 left, letter boxes 30 (wide 45 for a multigraph; dashed coral = to write, grid = printed). Words <= 10 letters (85-96 % of every pool). Every row stamps `[data-ws-content]`.

| # | id / slug | EN title (<= 70) | teaching move | what the child does (d2) |
|---|---|---|---|---|
| F0 | G2-315 `spelling-rules` | Spelling Rules: Magic e | Apply ONE named rule: the word is printed minus the rule grapheme; the child writes it. | 8 rows; writes 8 graphemes (1-3 letters) |
| F1 | G2-3xx `spelling-rules-which-one` | Which One? Choose the Right Spelling | Discriminate the two candidates the rule opposes (i/ie, b/p, s/ss, o/oo, single/double); half the rows are the CONTRAST side. | 8 rows; chips `a │ b` beside the gap; circles one, writes it; d3 adds the proof column |
| F2 | G2-3xx `spelling-rules-detective` | Rule Detective: Find the Rule Letters | Recognition before production: whole words PRINTED; the child marks the rule grapheme and copies it into a box. | 10 rows; d3 adds 2 foils (no rule letters: box stays empty) |
| F3 | G2-3xx `spelling-rules-sort` | Sort the Words by Spelling Rule | Classify by rule and write the WHOLE word into the right bin (bin heads = the two candidates). | 8 pictures in a bank (no words) + 2 bins of 5 lines (n + 1: the line count never leaks the split) |
| F4 | G2-3xx `spelling-rules-write-the-word` | Write the Word: Rule Letters Given | Whole-word production anchored on the rule: only the rule grapheme is printed in its box. | 8 rows; writes 8 whole words (<= 8 letters) |
| F5 | G2-3xx `spelling-rules-plural` (G3 in fi/it per panel) | The Plural Changes the Spelling | The related form is where the rule fires (de Ableiten ä/äu, nl boom-bomen, da kat-katte, fi kukka-kukat, it fico-fichi, en cherry-cherries, es pez-peces): singular printed with one picture, three clones show many, the child writes the plural with the gap at the changed grapheme. | 6 rows; writes 6 plural graphemes; d3 the whole plural |

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob (stamped only when declared) | type |
|---|---|---|---|---|---|
| F0 | 6 rows, words <= 6 letters, models 3 | 8 rows, <= 10 letters | 8 rows, `proof:true` column where `rule.proof` exists | none | base |
| F1 | 6 rows, 3+3 | 8 rows, 4 rule + 4 contrast, `choice:true` | 8 rows + `proof:true` | `choice` (chips from `rule.pair`) | CODE |
| F2 | 8 rows, one occurrence | 10 rows, `detective:true` | 12 rows incl. 2 `foil:true` | `detective`, `foils` | CODE |
| F3 | 6 pictures, 2 bins of 4 lines | 8 pictures, 2 bins of 5 lines, `bins:true` | 10 pictures, 3 bins (three-way rules only: fr o/au/eau, en c/k/ck, it gn/gli/ni) | `bins` | CODE |
| F4 | 6 rows, <= 6 letters, first letter also given | 8 rows, <= 8 letters, `anchor:'rule'` | 8 rows, <= 10 letters, no box count (ruling only) | `anchor` | CODE |
| F5 | 4 rows, gap only | 6 rows, gap only, `form:'plural'` | 6 rows, whole plural on a ruling | `form` | CODE |

No PARAM face: every move changes what is drawn. Guards key on `d.choice` / `d.detective` / `d.bins` / `d.anchor` / `d.form`, never the level index. `tools/gate-variation-distinct.js` (b2-bound today, K-318 critic OPEN 3) must see 5 distinct d2 configs.

### verify() (browser) + the single-solution guarantee
Stamps per row: `data-lcs-rule`, `data-lcs-word` (display case), `data-lcs-vocab`, `data-lcs-gap="<start>,<len>"`, `data-lcs-g`, `data-lcs-side="rule|contrast|foil"`, F5 `data-lcs-plural`. verify(): (1) printed box text + `g` at `gap` === `word` case-folded (F0/F1/F4); (2) `g` in `rule.cands` (F1: in `rule.pair`); (3) no visible text equals an item word, except F2 where every printed word carries `g` at `gap`, foils carry no candidate, boxes are empty; (4) `data-lcs-model` set disjoint from the item set; (5) distinct words + vocabKeys; (6) `img.naturalWidth > 0`; (7) F1 chips = `rule.pair`, sides 4/4; F3 bins = `rule.pair`, 5 lines each, no word printed, membership re-derived from `g`; F5 `plural` derives from `word` by `rule.proof`, singular printed once. The single-solution guarantee is NODE-side (section D): `pre + c + post` for every `c` in `rule.cands`, `c !== g`, is NOT another pool word. Measured exclusions at the widest sets: de Doppelkonsonant 11 (`Katze~Kanne`), nl dubbel 34 (`Bollen~bossen/bomen/boten`), sv 22 (`katt~kam`), no 29, it 19 (`gatto~gallo`), fi 17, en double 7 (`ball~bag`), en magic e 1 (`cape~cap`), others 0-8; all dropped from `items[]`.

### Refusals per locale (d2, 8 rule items + the face's contrast need)

| face | honest in | refused (reason, measured) |
|---|---|---|
| F0 | 11/11 | per RULE only: de au/äu (8), it cu/qu (11), es z (8, F5 only), fr ou/on/an (K-317 F5) |
| F1 | 11/11 | per rule: en ee/ea (no opposition), sv/no sj/tj until the panel list exists, da stumt h (9) |
| F2 | 11/11 | none |
| F3 | 11/11 | per rule: it sc/sci 13 (< 4 per bin); en floss 19 refuses the 3-bin d3 |
| F4 | 11/11 | words > 8 letters drop (fi keeps 65 %, still >= 8 per rule) |
| F5 | de 69 · nl 179 · da 39 (strict 18) · fi 141 · it 44 · en 29 · es 8 (marginal) | **fr** (needs a panel `finale muette` bank, *est.*), **sv / no / pt** (no plural-driven spelling rule) |

### Fan lever and query face per market
Every face fans by RULE; the title carries the rule chip. Query faces: F0 = head + rule (de "Doppelkonsonanten Arbeitsblatt Klasse 2", nl "open en gesloten lettergreep werkblad groep 4", it "parole con le doppie", fi "kaksoiskonsonantti tehtävä"); F1 = the opposition ("b oder p", "i oder ie", "s ou ss", "b o v", "enkel eller dobbel konsonant", "pitkä vai lyhyt vokaali"); F2 = "markieren / onderstrepen / cerchia / circle the"; F3 = "sortieren / ordenar / sortera"; F4 = "Wörter mit ie schreiben / dictée de mots / escribe la palabra"; F5 = "Mehrzahl ä äu Ableiten / meervoud / plurale -chi -ghi / astevaihtelu / y to ies".

### Rejected non-moves
1. Theme swap. 2. "Two rules on one page", "long words", d1/d3 relabelled (ranges). 3. **Minimal pairs with both pictures** (fi matto/mato 2, nl boos/bos 1, it palla/pala 1, sv/no/da/de/en 0: dead 11/11). 4. **Proof column as a face** (honest in de/nl/da/fi = 4; it is the d3 `proof` knob instead). 5. Error correction ("Hunt -> Hund"): misspellings shown to 7-year-olds; rejected on pedagogy. 6. Look-cover-write-check: rule-agnostic copying. 7. "Write three words of your own": open-ended, no verify. 8. Trace the rule word (K-284). 9. Sound-unit hunt (K-317 F5: a SOUND unit circled; here a RULE grapheme written). 10. fr homophones a/à, et/est: sentence grammar, no picture word carries them.

## C. NATIVE REBUILD x11

| loc | rule ladder (base first) | gap derivation | proof-form source | refusal rule | traps |
|---|---|---|---|---|---|
| de | Doppelkonsonanten · Auslaut · i/ie · Dehnungs-h · ss/ß | regex; ie via `chunks` | plural bank (Verlängern Hund-Hunde; Ableiten ä/äu 69) | Auslaut item needs a stem-carrying plural in `-e/-en/-er`; äu -> F5 only | capital kept in box 1; ck/tz "Sonderformen" (panel splits or merges; `Katze` gap = `tz`); the proof column never prints the plural |
| nl | open/gesloten (plural) · d/t verlengen · ei/ij · au/ou | plural derivation + `split` | vocab plural (boom-bomen, kat-katten, hond-honden) | plural must equal the derived form (71 + 108 pass) | IJ = one wide box; `de/het` never printed; 17 `-saurus` au-words: cap 1 per page |
| en | magic e · c/k/ck · ai/ay · floss · ee/ea | regex (two boxes for the split digraph) | y-ies 21 + f-ves 8 (F5) | F1 magic-e contrast = short-vowel CVC words (*est.* > 100) | `cape~cap` both pictured: keep one; ee/ea is memorised, no F1 |
| sv | dubbelteckning · ng · sj · tj | regex; sj/tj = PANEL LIST | none (F5 refused) | contrast rows need a long-vowel single-consonant word (290) | bare singular, never the definite (`banan`); `ck` one wide box or two (panel; K-318 stores two) |
| no | dobbel konsonant · kj · sj · ng | as sv | none (F5 refused) | as sv | bokmål; kj/sj lists drop `kiwi`, `kaki`, `ski` loanwords |
| da | dobbeltkonsonant · stumt d · ng | regex; plural for the proof (kat-katte 39) | vocab plural | full approved pool (119) unless the panel keeps K-1 strict (50; F5 then 18 = refuse) | the soft-d words ARE the `policy_managed` words; da doubles only between vowels, so the proof is the rule itself |
| fi | kaksoiskonsonantti · pitkä vokaali · astevaihtelu · ng/nk | regex | plural (kukka-kukat 141) | F5 banded 3. luokka by the panel | `[NSR-FLAG][fi]`; nominative only; double letter = one wide box or two (the K-318 ruling) |
| fr | m devant m,b,p · o/au/eau · finale muette · ch/gn/ph | regex; finale muette = PANEL BANK (chat-chatte) | panel bank (*est.*) | F5 refused until the bank exists | `-saure` excluded; au/eau F1 pairs only where the panel confirms; "fiche" banned |
| it | doppie · c/ch · g/gh · gn/gli · sc/sci | regex | plural -chi/-ghi 44 (F5) | cu/qu/cqu refused (11) | `agnello~anello` dropped; sce/sci before e/i only |
| es | b/v · c/qu · g/gu · ll/y · h muda · g/j | regex, first occurrence | z-ces 8 (F5 marginal) | h-muda bins need same-onset "sin h" words (*est.* > 40) | MX register (`carro`, `chabacano` are in the vocab); no articles |
| pt | s/ss · m antes de p e b · r/rr · nh/lh/ch · ç | regex (V s V vs ss) | none (F5 refused) | x/ch F1 only where the panel confirms | `ã/õ` never a gap; 16 of 28 ss-words are dinosaurs: cap 1 per page |

Panels author `exemplar`, per rule `head/chip/pair/models/items/foils`, six titles + instructions (<= 150, one imperative), the skill sentence, slug + name, topicMeta; the EN source is handed over as a SOURCE TO AUDIT.

## D. DATA + GATES

`data/b3/spelling-rules.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the b2 pattern; `data/` gitignored, force-add):
```
SPELLING_RULES[loc] = { head, exemplar:'doppelkonsonant', strand:'Language',
  rules:[{ id:'doppelkonsonant', head:'Doppelkonsonanten', chip:'ll mm nn tt ss ff pp rr',
     band:'G2'|'G3', gap:{kind:'regex', re:'([bdfglmnprst])\\1|ck|tz', boxes:'wide'|'split'},
     cands:['ll','mm',...,'l','m',...],  pair:['tt','t'],         // F1 chips, F3 bin heads
     proof:null | {kind:'plural', re:'(e|en|er)$', gapIn:'plural'|'singular'},
     models:[{word:'Sonne', gap:[2,2]},{word:'Roller', gap:[2,2]}],
     items:[{theme, noun, vocabKey, word:'Bagger', gap:[2,2], g:'gg', plural:'Bagger', side:'rule'|'contrast'}],
     foils:[{theme, noun, vocabKey, word}],
     strings:{'G2-315':{title,instruction}, F1..F5:{...}} }] }
```
**Validator (`tools/validate-b3-draft.js`, spelling-rules part; exit 1 on any):** (1) `word` = the vocab display word of `vocabKey`; picture via `fileUri`; no localized BW marker; (2) `word.slice(gap[0], gap[0]+gap[1]) === g` case-folded, `g` in `cands`; (3) `g === first match of rule.gap.re` (de ie: the `chunks` element), so a hand-authored gap that disagrees with the derivation FAILS; (4) frame uniqueness against the WHOLE locale pool; (5) `side:'contrast'` items carry `pair[1]` at the gap; `foils` carry no candidate; (6) `plural` matches `proof.re` and the folded stem carries (K-287 `isRegular` shape); (7) models are not items; (8) >= 8 rule items, >= 4 contrast (F1/F3), >= 2 foils (F2 d3), else the face is REFUSED for that rule (reported, never filled); (9) de capital kept, others lowercase; (10) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150; `chip` graphemes in `cands`; (11) words <= 10 letters (F4 <= 8).

**`tools/gate-spelling-rules-data.js`** (node, every locale x rule x face before the wave): re-derives every stamped `data-lcs-gap`/`g` from the bank (diff, not trust); renders each face at d2 and asserts verify() empty + `qa/lints.js` clean; non-vacuity (0 items checked = FAIL). **Poison cases (each must FAIL; the correct draft is the control):** P1 sv `katt` shipped with `m` left in `cands` while `kam` is in the pool -> "frame not unique"; P2 de `Sonne` with `gap:[0,1], g:'S'` -> "gap not at the rule grapheme"; P3 nl `schaap` with `plural:'schepen'` -> "proof form does not derive"; P4 a model word `Roller` also listed in `items` -> "model is an item"; P5 F2 row printing `Bagger` as a foil -> "foil carries the rule grapheme"; P6 F3 bins with 4 lines for a 4/4 split -> "line count leaks the split"; P7 a `-saure` fr item under o/au/eau -> "excluded family".

## E. SEO

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (whole description 120-170) | h1 / eyebrow / strand |
|---|---|---|---|
| F0 | `{head}: {rule}`: `Spelling Rules: Magic e` · `Rechtschreibregeln: Doppelkonsonanten` · `Spellingregels: open en gesloten lettergreep` · `Reglas de ortografía: b y v` · `Stavningsregler: dubbelteckning` · `Oikeinkirjoitus: kaksoiskonsonantti` | "The rule box shows two model words; write the missing rule letters under eight pictures" | title / G2 label / `Language` row of `strand-names.ts` (de "Sprache untersuchen", fi "Kielen rakenteet ja oikeinkirjoitus"; **da and no rows MISSING, en fallback: the panel adds them**) |
| F1 | head + `Which One? tt or t` · `b oder p?` · `¿b o v?` · `enkel eller dubbel?` · `kk vai k?` | "Two spellings are printed for each picture; circle the right one and write it" | same |
| F2 | head + `Rule Detective` · `Doppelkonsonanten markieren` · `cerchia le doppie` | "The words are printed; circle the rule letters and copy them" | same |
| F3 | head + `Sort` · `sortieren` · `ordenar` · `lajittele` | "Write each picture's word into the bin of its spelling" | same |
| F4 | head + `Write the Word` · `Wörter schreiben` · `dictée de mots` | "Only the rule letters are given; write the whole word" | same |
| F5 | `Plural Spelling: y to ies` · `Ableiten: ä oder e, äu oder eu` · `Meervoud: open of gesloten` · `Plurale in -chi e -ghi` · `Astevaihtelu` | "Write the word for many; the plural changes the spelling" | G2 (G3 fi/it per panel) |

JSON-LD `LearningResource`, `educationalAlignment.targetName` = CCSS code (en) or framework NAME, no `targetUrl`. Hub coordinate `{type:'spelling-rules', mode:'base'|'choice'|'detective'|'sort'|'anchor'|'plural', theme:'', level:<band key>}`; 6 landings per locale, 5 where F5 is refused (fr/sv/no/pt; the hub gate must count refusals).

Non-cannibalisation (3-gram Jaccard *est.*; `scripts/seo-landing/gate.js` measures): F0 vs **K-224** (K, CVC, any letter; here G2, the RULE grapheme, a rule box) 0.15 · F4 vs **G1-244** d2 (empty letter boxes, no rule; here the rule grapheme is the anchor) 0.25 · F0/F2 vs **K-317 F5** (a sound unit traced + pictures circled; here a spelling RULE written into a gap) 0.15 · F5 vs **K-287** (K default plural, traced, count badges; here G2, the plural where the rule fires, no tracing) 0.25 · F2 vs **G2-274** (sentence marks; here word-level rule letters) 0.10 · F3 vs **K-228/K-230** (sound bins at K; here rule bins by WRITING) 0.15. F0 boundary sentence: "This page teaches ONE spelling rule: the rule letters are missing, everything else is printed".

## F. OPEN QUESTIONS

1. de base: Doppelkonsonanten (190, tier A) or i/ie (37, tier A HARD head)? Recommended Doppelkonsonanten; the exemplar is data.
2. de ck/tz inside "Doppelkonsonanten" (`Katze` gap = `tz`) or a separate fan rule? Panel ruling, data only.
3. da pool for a G2 SPELLING page: full approved (119) or K-1 strict (50)? The `policy_managed` words ARE the spelling-rule words; recommended full.
4. fi F5 astevaihtelu: 2. or 3. luokka (OPS lists it at 3-6)? The level key follows the panel.
5. fr `lettre finale muette` needs a panel derived-word bank; fr F5 stays refused until then.
6. sv/no sj/tj/kj regex upper bounds (31/64/45/35) include loanwords; the panel list decides whether they reach 8.
7. `strand-names.ts` `Language` row lacks da/no: this wave or the locale fan?
8. `gate-variation-distinct.js` is b2-bound and `verify-hub-type-rows.js` does not exist (K-318 critic); the hub gate must accept 5 rows + a recorded F5 refusal.
9. en magic e needs two non-adjacent gap boxes in one row (`gap` as an array): engineer confirms.
10. `ruleAxis` plumbing (enumerate, deckIdFor, `variant_id`, `{RULE}` title token) is K-317's `letterAxis`: build once.

**Summary.** `spelling-rules` is a G2, cross-theme, RULE-fanned type: 11 measured rule ladders, base = each locale's densest tier-A rule (64-276 usable words). Six faces: fill the rule grapheme (base), choose between the two candidates (d3 proof column in de/nl/da/fi/it/es), rule detective on printed words, sort into rule bins by writing, whole word with the rule letters given, and the plural that changes the spelling (7 locales + es marginal; fr/sv/no/pt refused). All five variations are CODE knobs stamped only when declared. The single-solution guarantee is a node-side frame-uniqueness gate over the whole locale pool (11-34 collisions per dense rule, all dropped), poison-tested both ways. Boundaries hold against K-224, G1-244, K-317 F5, K-287, G2-274.
