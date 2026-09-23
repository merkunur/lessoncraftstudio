# Round 1 — lexical families: per-locale failures the new gates hold (2026-09-23)

Families: **synonyms** (G2-358 · G1-395 G2-373 G1-396 G2-374 G3-397), **word-parts** (G2-359 · G1-397 G2-375 G2-376 G3-398 G3-399), **digraphs** (G1-380 · K-378 G1-392 G1-393 G1-394 G2-372).
Source: the landing panels' raw findings `scripts/worksheet-gen/out/b5-findings-{en,de,es,pt,fr,it,nl}.txt`.
Every line below is produced by `validateBank(block, loc)` of `qa/verify-b5-synonyms.js` / `qa/verify-b5-word-parts.js` on the applied `data/b5/locales/<bank>.<loc>.json`. The gates FAIL on them now and are NOT to be weakened; the native fixers repair the data. **en passes every rule.** Line format: `locale · family face · entry · rule`.

Note: the synonyms 20-seed probes (rule 17 per card, rule 19 pairs overlap) run only once a block is otherwise clean — a locale may surface more after its first fixes.

## The rules (each poisoned both ways: fires on the defect, quiet on its correct twin)

| family | rule | what it holds |
|---|---|---|
| synonyms | 16 | no group word is INSIDE another word of its group (accent- and case-folded): the headword would spell its answer (nl kiezen / uitkiezen). Also measured on every probed base card and every G2-373 pair. |
| synonyms | 17 | a base card offers exactly ONE synonym of its headword (by groups), no option near it; plus a per-locale second-sense floor: pt bravo~corajoso, bravo~valente, de brüllen~heulen must be `near` pairs. |
| synonyms | 18 | every G2-374 frame carries `plainVerbOK: true` (the panel asserts the struck "said" can stand in the gap unchanged in meaning; the instruction says "instead of said"); en frames must be direct speech. |
| synonyms | 19 | G2-373 repeats at most 2 of the base page's concepts on the same instance (the seed with the base's type id). The COMPOSER now avoids them (`baseConceptsFor` in G2-358); no locale fails it. |
| word-parts | 16 | every member of families + rootFamilies CONTAINS the displayed root (root.word) verbatim, case-folded; `stemSigned` no longer exempts (fr terre / terrain, nl spel / speelster, tover / tovenaar). |
| word-parts | 17 | one stem convention per bank: all roots free words, or all bound stems in lower case (de "Spiel" beside "wohn"). |
| word-parts | 18 | G2-375: a family must offer three members whose ACCENT-FOLDED shared part is exactly the root; the composer now compares folded (es mar: marinero / marino / marítimo share "mari"). |
| word-parts | 19 | G2-376: no meaning line quotes a key meaning: any alternative phrase, any content word of >= 4 letters, or a >= 5-letter form of one (wrong / wrongly). Also re-derived in `verify()` on the rendered page. |
| word-parts | 20 | G3-398: the bank declares `agentSuffixes` and every answer (every gender form) ends in one; a work / profession word in the face strings while play portraits (athlete = runner, ballerina = dancer) are drawn is false. |
| word-parts | 21 | G1-397: the member may be the strictly longest brick on at most 60 % of a page's cards: bank capacity (>= 3 picture families must offer a look-alike at least as long as a member), the composer re-picks, a 20-seed probe, and `verify()` on the render. |

## de (16 findings)

- de · synonyms G2-358/G2-373 base+pairs · group g.happy: "froh" is inside "fröhlich" — a card or pair would print its answer inside its headword (rule 16)
- de · synonyms G2-358 base · "brüllen" also means "heulen" (a second everyday sense) — add near brüllen~heulen so one card never offers both as the same (rule 17)
- de · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "sagt" must be able to stand in the gap unchanged in meaning (rule 18)
- de · word-parts G2-359/G2-375/G3-399 families · family kauf member "Käufer": does not contain the displayed root "Kauf" (rule 16)
- de · word-parts G2-359/G2-375/G3-399 families · family kauf member "Verkäuferin": does not contain the displayed root "Kauf" (rule 16)
- de · word-parts G2-359/G2-375/G3-399 families · family koch member "Köchin": does not contain the displayed root "Koch" (rule 16)
- de · word-parts G2-359/G2-375 roots · families mix free-word roots (Spiel, Zauber, Freund…) with bound stems (fahr, schreib, wohn) — one page would print both conventions (rule 17)
- de · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- de · word-parts G3-398 who-does-it · strings.who-does-it says "bei der Arbeit" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)

## es (18 findings)

- es · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- es · word-parts G2-376 prefix-key · prefixKey row "releer": the meaning line "leer otra vez un cuento" quotes the key ("otra vez", "otra") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "rellenar": the meaning line "llenar otra vez el vaso" quotes the key ("otra vez", "otra") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "rehacer": the meaning line "hacer otra vez la tarea" quotes the key ("otra vez", "otra") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "recontar": the meaning line "contar otra vez las canicas" quotes the key ("otra vez", "otra") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "precalentar": the meaning line "calentar el horno antes de hornear" quotes the key ("antes") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "prever": the meaning line "ver antes lo que va a pasar" quotes the key ("antes") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "predecir": the meaning line "decir antes qué tiempo va a hacer" quotes the key ("antes") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "sobrevolar": the meaning line "volar por encima de la ciudad" quotes the key ("por encima", "encima") (rule 19)
- es · word-parts G2-376 prefix-key · prefixKey row "sobrecargar": the meaning line "cargar de más la mochila" quotes the key ("de más") (rule 19)
- es · word-parts G1-397 picture-family · picture-family: only 1 picture families offer a look-alike at least as long as a member (need >= 3) — the answer is the longest brick on more than 60 % of a page's cards (rule 21)

## pt (45 findings)

- pt · synonyms G2-358 base · "bravo" also means "corajoso" (a second everyday sense) — add near bravo~corajoso so one card never offers both as the same (rule 17)
- pt · synonyms G2-358 base · "bravo" also means "valente" (a second everyday sense) — add near bravo~valente so one card never offers both as the same (rule 17)
- pt · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "disse" must be able to stand in the gap unchanged in meaning (rule 18)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "terreno": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "terreiro": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "terrestre": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "aterrissar": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "terráqueo": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family terra member "terremoto": does not contain the displayed root "terra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family pedra member "pedreiro": does not contain the displayed root "pedra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family pedra member "pedregulho": does not contain the displayed root "pedra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family pedra member "pedregoso": does not contain the displayed root "pedra" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentista": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentuço": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentada": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentadura": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentário": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dentição": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family dente member "dental": does not contain the displayed root "dente" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "ferreiro": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "ferradura": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "ferrugem": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "ferragem": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "enferrujar": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-359/G2-375/G3-399 families · family ferro member "enferrujado": does not contain the displayed root "ferro" (rule 16)
- pt · word-parts G2-376 prefix-key · prefixKey row "reler": the meaning line "ler uma história de novo" quotes the key ("de novo", "novo") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "refazer": the meaning line "fazer a lição de novo" quotes the key ("de novo", "novo") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "recontar": the meaning line "contar a história de novo" quotes the key ("de novo", "novo") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "reescrever": the meaning line "escrever o texto de novo" quotes the key ("de novo", "novo") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "prever": the meaning line "saber antes o que vai acontecer" quotes the key ("antes") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "predizer": the meaning line "dizer antes o que vai acontecer" quotes the key ("antes") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "preaquecer": the meaning line "aquecer o forno antes de assar o bolo" quotes the key ("antes") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "subsolo": the meaning line "o andar que fica embaixo do chão" quotes the key ("embaixo") (rule 19)
- pt · word-parts G2-376 prefix-key · prefixKey row "subtítulo": the meaning line "o título menor que vem embaixo do título" quotes the key ("embaixo") (rule 19)
- pt · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- pt · word-parts G3-398 who-does-it · strings.who-does-it says "profissões" (work / profession) but the face draws play portraits (ballerina) (rule 20)
- pt · word-parts G3-398 who-does-it · strings.who-does-it says "trabalhando" (work / profession) but the face draws play portraits (ballerina) (rule 20)
- pt · word-parts G1-397 picture-family · picture-family: only 1 picture families offer a look-alike at least as long as a member (need >= 3) — the answer is the longest brick on more than 60 % of a page's cards (rule 21)

## fr (21 findings)

- fr · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "dit" must be able to stand in the gap unchanged in meaning (rule 18)
- fr · word-parts G2-359/G2-375/G3-399 families · family terre member "terrain": does not contain the displayed root "terre" (rule 16)
- fr · word-parts G2-359/G2-375/G3-399 families · family terre member "atterrir": does not contain the displayed root "terre" (rule 16)
- fr · word-parts G2-359/G2-375/G3-399 families · family terre member "atterrissage": does not contain the displayed root "terre" (rule 16)
- fr · word-parts G2-359/G2-375/G3-399 families · family terre member "souterrain": does not contain the displayed root "terre" (rule 16)
- fr · word-parts G2-359/G2-375/G3-399 families · family chant member "chanson": does not contain the displayed root "chant" (rule 16)
- fr · word-parts G2-359/G2-375/G3-399 families · family chant member "chansonnette": does not contain the displayed root "chant" (rule 16)
- fr · word-parts G2-376 prefix-key · prefixKey row "relire": the meaning line "lire une histoire de nouveau" quotes the key ("de nouveau", "nouveau") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "recoller": the meaning line "coller de nouveau une image qui s’est décollée" quotes the key ("de nouveau", "nouveau") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "préchauffer": the meaning line "chauffer le four avant de faire cuire le gâteau" quotes the key ("avant") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "prédire": the meaning line "dire avant ce qui va arriver" quotes the key ("avant") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "prépayer": the meaning line "payer avant de recevoir la chose" quotes the key ("avant") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "survoler": the meaning line "voler au-dessus de la ville" quotes the key ("au-dessus") (rule 19)
- fr · word-parts G2-376 prefix-key · prefixKey row "surélever": the meaning line "monter une maison plus haut encore" quotes the key ("plus") (rule 19)

## it (82 findings)

- it · synonyms G2-358/G2-373 base+pairs · group g.sick: "malato" is inside "ammalato" — a card or pair would print its answer inside its headword (rule 16)
- it · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "dice" must be able to stand in the gap unchanged in meaning (rule 18)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "fioraio": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "fiorito": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "fiorire": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "fioritura": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "fioriera": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family fiore member "rifiorire": does not contain the displayed root "fiore" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family terra member "terreno": does not contain the displayed root "terra" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family terra member "terriccio": does not contain the displayed root "terra" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family terra member "terrestre": does not contain the displayed root "terra" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family terra member "terroso": does not contain the displayed root "terra" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family terra member "terremoto": does not contain the displayed root "terra" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family mare member "marino": does not contain the displayed root "mare" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family mare member "marinaio": does not contain the displayed root "mare" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family mare member "marittimo": does not contain the displayed root "mare" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family mare member "marina": does not contain the displayed root "mare" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gioco member "giocare": does not contain the displayed root "gioco" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gioco member "giocattolo": does not contain the displayed root "gioco" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gioco member "giocatore": does not contain the displayed root "gioco" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gioco member "giocattolaio": does not contain the displayed root "gioco" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentista": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentiera": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentatura": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentale": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentato": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "addentare": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dente member "dentifricio": does not contain the displayed root "dente" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family latte member "lattaio": does not contain the displayed root "latte" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family latte member "allattare": does not contain the displayed root "latte" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family latte member "lattiera": does not contain the displayed root "latte" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family latte member "lattante": does not contain the displayed root "latte" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family latte member "latticino": does not contain the displayed root "latte" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "pescare": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "pescatore": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "pescheria": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "peschereccio": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "pescoso": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "ripescare": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family pesce member "pescivendolo": does not contain the displayed root "pesce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "gelato": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "gelateria": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "gelataio": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "gelare": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "gelido": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "congelare": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family gelo member "congelatore": does not contain the displayed root "gelo" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "navigare": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "navigatore": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "navale": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "navigazione": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "naviglio": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family nave member "navigabile": does not contain the displayed root "nave" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dolce member "dolcificare": does not contain the displayed root "dolce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dolce member "addolcire": does not contain the displayed root "dolce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dolce member "dolciume": does not contain the displayed root "dolce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dolce member "dolciario": does not contain the displayed root "dolce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family dolce member "dolcificante": does not contain the displayed root "dolce" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family vento member "ventilatore": does not contain the displayed root "vento" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family vento member "ventaglio": does not contain the displayed root "vento" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family vento member "ventata": does not contain the displayed root "vento" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family vento member "ventilare": does not contain the displayed root "vento" (rule 16)
- it · word-parts G2-359/G2-375/G3-399 families · family vento member "ventilazione": does not contain the displayed root "vento" (rule 16)
- it · word-parts G2-376 prefix-key · prefixKey row "rileggere": the meaning line "leggere una storia di nuovo" quotes the key ("di nuovo", "nuovo") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "rifare": the meaning line "fare il letto di nuovo" quotes the key ("di nuovo", "nuovo") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "riscrivere": the meaning line "scrivere un testo di nuovo" quotes the key ("di nuovo", "nuovo") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "ricontare": the meaning line "contare le monete di nuovo" quotes the key ("di nuovo", "nuovo") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "prevedere": the meaning line "sapere prima che cosa succederà" quotes the key ("prima") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "predire": the meaning line "dire prima che cosa succederà" quotes the key ("prima") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "prevendita": the meaning line "la vendita dei biglietti prima dello spettacolo" quotes the key ("prima") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "sottosuolo": the meaning line "la terra che sta più in basso del suolo" quotes the key ("più in basso", "basso") (rule 19)
- it · word-parts G2-376 prefix-key · prefixKey row "sottotetto": the meaning line "la stanza che sta appena più in basso del tetto" quotes the key ("più in basso", "basso") (rule 19)
- it · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- it · word-parts G3-398 who-does-it · strings.who-does-it says "mestieri" (work / profession) but the face draws play portraits (ballerina) (rule 20)
- it · word-parts G3-398 who-does-it · strings.who-does-it says "lavoro" (work / profession) but the face draws play portraits (ballerina) (rule 20)

## nl (27 findings)

- nl · synonyms G2-358/G2-373 base+pairs · group g.tired: "moe" is inside "vermoeid" — a card or pair would print its answer inside its headword (rule 16)
- nl · synonyms G2-358/G2-373 base+pairs · group g.choose: "kiezen" is inside "uitkiezen" — a card or pair would print its answer inside its headword (rule 16)
- nl · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "zegt" must be able to stand in the gap unchanged in meaning (rule 18)
- nl · word-parts G2-359/G2-375/G3-399 families · family spel member "speelster": does not contain the displayed root "spel" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family spel member "speels": does not contain the displayed root "spel" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family tover member "tovenaar": does not contain the displayed root "tover" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family tover member "tovenares": does not contain the displayed root "tover" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family koop member "verkoper": does not contain the displayed root "koop" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family koop member "verkopen": does not contain the displayed root "koop" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family koop member "inkopen": does not contain the displayed root "koop" (rule 16)
- nl · word-parts G2-359/G2-375/G3-399 families · family reis member "reiziger": does not contain the displayed root "reis" (rule 16)
- nl · word-parts G2-359/G2-375 roots · families mix free-word roots (spel, vriend, werk…) with bound stems (tover) — one page would print both conventions (rule 17)
- nl · word-parts G2-376 prefix-key · prefixKey row "herbouwen": the meaning line "een kapot huis opnieuw neerzetten" quotes the key ("opnieuw") (rule 19)
- nl · word-parts G2-376 prefix-key · prefixKey row "meezingen": the meaning line "samen met de anderen een lied zingen" quotes the key ("samen met", "samen") (rule 19)
- nl · word-parts G2-376 prefix-key · prefixKey row "meehelpen": the meaning line "samen met anderen een klus doen" quotes the key ("samen met", "samen") (rule 19)
- nl · word-parts G2-376 prefix-key · prefixKey row "uitdrinken": the meaning line "je glas helemaal leeg drinken" quotes the key ("helemaal") (rule 19)
- nl · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- nl · word-parts G3-398 who-does-it · strings.who-does-it says "beroepen" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)
- nl · word-parts G3-398 who-does-it · strings.who-does-it says "aan het werk" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)
- nl · word-parts G1-397 picture-family · picture-family: only 1 picture families offer a look-alike at least as long as a member (need >= 3) — the answer is the longest brick on more than 60 % of a page's cards (rule 21)

## sv (21 findings)

- sv · synonyms G2-358/G2-373 base+pairs · group g.small: "liten" is inside "pytteliten" — a card or pair would print its answer inside its headword (rule 16)
- sv · synonyms G2-358/G2-373 base+pairs · group g.end: "sluta" is inside "avsluta" — a card or pair would print its answer inside its headword (rule 16)
- sv · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- sv · word-parts G2-359/G2-375 roots · families mix free-word roots (hjälp, spel, bygg…) with bound stems (arbet) — one page would print both conventions (rule 17)
- sv · word-parts G2-376 prefix-key · prefixKey row "återanvända": the meaning line "använda en burk en gång till" quotes the key ("en gång till", "gång") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "återberätta": the meaning line "berätta en saga igen med egna ord" quotes the key ("igen") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "återbesöka": the meaning line "besöka samma plats en gång till" quotes the key ("en gång till", "gång") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "missförstå": the meaning line "förstå fel vad någon menar" quotes the key ("fel") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "misshöra": the meaning line "höra fel vad någon säger" quotes the key ("fel") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "misslyckas": the meaning line "när det går fel och man inte klarar det" quotes the key ("fel") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "överäta": the meaning line "äta alldeles för mycket" quotes the key ("för mycket", "mycket") (rule 19)
- sv · word-parts G2-376 prefix-key · prefixKey row "överfylla": the meaning line "fylla ett glas för mycket" quotes the key ("för mycket", "mycket") (rule 19)
- sv · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- sv · word-parts G3-398 who-does-it · strings.who-does-it says "arbetar" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)

## da (16 findings)

- da · synonyms G2-358/G2-373 base+pairs · group g.big: "stor" is inside "kæmpestor" — a card or pair would print its answer inside its headword (rule 16)
- da · synonyms G2-358/G2-373 base+pairs · group g.small: "lille" is inside "lillebitte" — a card or pair would print its answer inside its headword (rule 16)
- da · synonyms G2-358/G2-373 base+pairs · group g.collect: "samle" is inside "indsamle" — a card or pair would print its answer inside its headword (rule 16)
- da · synonyms G2-358/G2-373 base+pairs · group g.stay: "blive" is inside "forblive" — a card or pair would print its answer inside its headword (rule 16)
- da · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "siger" must be able to stand in the gap unchanged in meaning (rule 18)
- da · word-parts G2-376 prefix-key · prefixKey row "genfortælle": the meaning line "at fortælle historien igen med egne ord" quotes the key ("igen") (rule 19)
- da · word-parts G2-376 prefix-key · prefixKey row "genåbne": the meaning line "at åbne butikken igen efter ferien" quotes the key ("igen") (rule 19)
- da · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- da · word-parts G3-398 who-does-it · strings.who-does-it says "arbejde" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)

## no (18 findings)

- no · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "sa" must be able to stand in the gap unchanged in meaning (rule 18)
- no · word-parts G2-359/G2-375/G3-399 families · family bygg member "bygning": does not contain the displayed root "bygg" (rule 16)
- no · word-parts G2-376 prefix-key · prefixKey row "gjenbruke": the meaning line "bruke en ting en gang til" quotes the key ("en gang til", "gang") (rule 19)
- no · word-parts G2-376 prefix-key · prefixKey row "gjenfortelle": the meaning line "fortelle et eventyr en gang til med egne ord" quotes the key ("en gang til", "gang") (rule 19)
- no · word-parts G2-376 prefix-key · prefixKey row "gjenåpne": the meaning line "åpne butikken igjen etter en stund" quotes the key ("igjen") (rule 19)
- no · word-parts G2-376 prefix-key · prefixKey row "gjenfinne": the meaning line "finne noe igjen som var borte" quotes the key ("igjen") (rule 19)
- no · word-parts G2-376 prefix-key · prefixKey row "misforstå": the meaning line "forstå feil det noen mener" quotes the key ("feil") (rule 19)
- no · word-parts G2-376 prefix-key · prefixKey row "overfylle": the meaning line "fylle et glass for mye" quotes the key ("for mye") (rule 19)
- no · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- no · word-parts G3-398 who-does-it · strings.who-does-it says "jobber" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)
- no · word-parts G1-397 picture-family · picture-family: only 1 picture families offer a look-alike at least as long as a member (need >= 3) — the answer is the longest brick on more than 60 % of a page's cards (rule 21)

## fi (41 findings)

- fi · synonyms G2-374 say · say sentence f1: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f2: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f3: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f4: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f5: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f6: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f7: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · synonyms G2-374 say · say sentence f8: no plainVerbOK:true — "sanoi" must be able to stand in the gap unchanged in meaning (rule 18)
- fi · word-parts G2-359/G2-375/G3-399 families · family ystävä member "ystävyys": does not contain the displayed root "ystävä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family ystävä member "ystävystyä": does not contain the displayed root "ystävä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelätä": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelokas": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelokkaasti": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelottava": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelottaa": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "peloton": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family pelko member "pelottomasti": does not contain the displayed root "pelko" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opettaja": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opetus": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opettavainen": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opettavaisesti": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opetella": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opettelu": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family opettaa member "opettajanhuone": does not contain the displayed root "opettaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakentaja": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakennus": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakenne": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakennella": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakentava": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakentavasti": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family rakentaa member "rakennelma": does not contain the displayed root "rakentaa" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikki": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikkisä": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikkisästi": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikillinen": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikitellä": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikittää": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G2-359/G2-375/G3-399 families · family leikki member "leikkikalu": does not contain the displayed root "leikkiä" (rule 16)
- fi · word-parts G3-398 who-does-it · agentSuffixes missing — the who-does-it face must declare the person-word suffixes it teaches (rule 20)
- fi · word-parts G3-398 who-does-it · strings.who-does-it says "työssä" (work / profession) but the face draws play portraits (athlete, ballerina) (rule 20)
- fi · word-parts G1-397 picture-family · picture-family: only 2 picture families offer a look-alike at least as long as a member (need >= 3) — the answer is the longest brick on more than 60 % of a page's cards (rule 21)

## Fix notes for the native fixers

- **synonyms rule 18 (every locale):** add `plainVerbOK: true` ONLY to frames where the locale's "said" (sagt / dice / disse / dit / zegt / sa / siger / sanoi) truly stands; rewrite the others as direct speech (the en rewrite is the model: `“…,” {name} {gap}.`). A frame whose verb takes an object ("___ the secret into Grandma's ear") cannot carry the flag.
- **synonyms rule 16:** split the pair into two groups or drop the longer word (nl moe / vermoeid, kiezen / uitkiezen; it malato / ammalato; sv liten / pytteliten, sluta / avsluta; da stor / kæmpestor, lille / lillebitte, samle / indsamle, blive / forblive; de froh / fröhlich). Several are SHADES (kæmpestor, pytteliten, lillebitte): rule 6 puts shades in `scales`, not groups.
- **synonyms rule 17:** pt: add `near` bravo~corajoso and bravo~valente (or replace the headword bravo); de: add `near` brüllen~heulen.
- **word-parts rule 16 (it / pt / fi / fr / nl / de / no):** where the derivation drops the root's final vowel (it fiore -> fior-, pt terra -> terr-, fi pelko -> pelo-), EITHER print the bound stem (rootIsFreeWord: false, root.word = the lower-case stem; then EVERY family in the bank must be bound, rule 17) OR keep only members that contain the whole root word. Umlaut / vowel-change members (de Käufer, Verkäuferin, Köchin; nl verkoper, verkopen, inkopen, speelster, speels, tovenaar, tovenares, reiziger; no bygning) leave the family.
- **word-parts rule 17 (de / nl / sv):** de mixes Spiel / Zauber … with fahr / schreib / wohn; nl mixes free roots with tover; sv mixes free roots with arbet. One convention per bank.
- **word-parts rule 19:** paraphrase each gloss without the key's words (en model: "to fill an empty cup back up", "to pay first and get the thing later", "to spell a word with a mistake in it").
- **word-parts rule 20:** declare `agentSuffixes` (e.g. de ['er', 'erin'], then Fotograf, Kassiererin (-ierer), Polizist fail and leave or the set grows honestly); rewrite "bei der Arbeit / aan het werk / al lavoro / trabalhando / som arbetar / på arbejde / som jobber / työssä" and "Berufe / beroepen / profissões / mestieri", or drop athlete + ballerina from agents.
- **word-parts rule 21 (es / pt / nl / no / fi):** add look-alikes at least as long as the member (es "estrellado" needs a 10-letter "es-" look-alike), or choose picture families whose derived word is short. The nl panel measured the member longest on 6 / 6 cards.

## Panel claims measured and NOT confirmed

- pt G2-375 escola: the panel said extraescolar / pré-escola / escolar share only "escol". Measured: all three contain "escola" whole; rules 16 and 18 pass. (pré-escola / extraescolar are still compound-class stretches.)
- es G2-375 mar: once the composer compares accent-folded shared parts (rule 18), marinero / marino / marítimo can no longer be drawn; the family stays (triples with marea / maremoto are honest). No data fix needed.

## Digraphs: picture swaps a native must choose (no gate can name the word a child says)

Each picture admits a common name WITHOUT the target letter team. The native panel must swap the picture, rely on a printed word (G1-392 prints the gapped word, G1-393 prints the word), or drop the item. Owned by `data/b5/digraphs.js` (en) and `data/b5/locales/digraphs.<loc>.json`; refusals already on record: es / it / sv / da / no (whole family), pt G1-394.

| locale | face(s) | picture (target) | name a child says instead | candidate swaps (native to choose) |
|---|---|---|---|---|
| en | G1-380 | bathtub (bath, th) | tub | thumb, teeth, moth, three |
| en | G1-392 vs G1-394 | shell (sh) | seashell (G1-392 prints "sea_ell", G1-394 scores "beginning") | one name on both faces, or accept both positions on G1-394 |
| en | G1-393 | toothpaste (th) | paint / glue (a generic tube) | a clearer toothpaste picture, or thumb / moth |
| en | G1-380 family (animals/sheep, 'sh|ee|p') | sheep (sh): the de panel reports the same library picture reads as a LAMB | lamb | open the picture; an adult sheep, or shoe / fish |
| de | G1-394 | Schaf (sch) | Lamm (drawn as a lamb) | an adult sheep, Schuh, Tasche |
| de | G1-394 | Teppich (ch) | Decke / Bild | Buch, Milch, Licht |
| de | G1-380 (+ G1-397 card 3) | Rutsche (sch) | Klettergerüst / Spielplatz (slide with a climbing tower) | a plain slide, Fisch, Tasche |
| nl | G1-380 (no printed word) | veulen (eu) | paard | neus, sleutel, reus (G1-392 "v_len" and G1-393 "veulen" are rescued by the print) |
| nl | G1-394 | lelie (ie) | bloem | fiets, brief, tien |
| nl | G1-394 | knie (ie) | been (a whole bent leg) | a close-up knee, fiets, zeef |
| nl | G1-394 | kanarie (ie) | vogel / vogeltje | fiets, brief |
| nl | K-378 | duif (ui) | vogel (a white dove) | huis, muis, fluit |
| nl | K-378 | want / glove | handschoen | swap |
| fr | G1-380 | moufle (ou) | gant | loup, poule, hibou |
| fr | G1-380 | tabouret (ou) | chaise | swap |
| fr | G1-380 | ballon (on) | balle | mouton, bonbon |
| fr | K-378 | pot de confiture (on) | pot / bocal | swap |
| fr | G1-394 | loutre (ou) | castor | swap |
| fr | G1-394 | voiture (oi) | auto | étoile, poisson |
| fr | G1-394 | balançoire (oi) scored "milieu" | the /wa/ is heard in the last syllable ("fin") | swap, or accept both answers |
| pt | G1-380 | ovelha (lh) | carneiro | abelha, olho, coelho |
| pt | G1-380 | cegonha (nh) | garça / pássaro | aranha, galinha |
| pt | G1-380 | gafanhoto (nh) | grilo | swap |
| pt | G1-380 | aquecedor (qu) | radiador | queijo, esquilo |
| pt | K-378 | milho (lh) | espiga | swap |
