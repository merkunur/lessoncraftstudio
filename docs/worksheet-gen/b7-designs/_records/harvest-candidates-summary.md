# Seeded autocomplete harvest — candidate genre heads × 11 locales (round 1, 2026-10-09)

Script: scripts/seo-research/harvest-candidates.js (Google suggest, client=firefox, per-market hl/gl: es=MX, pt=BR, no=bokmål). Seeds: _records/candidate-seeds.json (2 heads per candidate × {bare, +worksheet noun, +print word, +4 grade words} = 14 requests per candidate, 182 per locale, 0 errors in all 11). Cell = distinct suggestion strings returned for that candidate. A LOW cell means the SEED was un-native OR the genre is thin; the native panels decide which (the Nordic panel re-probes with corrected seeds → _records/v2/). Absolute numbers are not comparable across markets (autocomplete depth scales with market size); compare candidates WITHIN a column.

| candidate | en | de | es | pt | fr | it | nl | sv | da | no | fi | sum |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `find-the-differences` | 125 | 98 | 61 | 71 | 86 | 44 | 62 | 19 | 26 | 21 | 13 | 626 |
| `how-to-draw` | 215 | 55 | 159 | 87 | 120 | 73 | 91 | 42 | 53 | 50 | 33 | 978 |

Ranked by sum (round 1): how-to-draw 978 · find-the-differences 626

## Telling suggestions per candidate (first 6 per locale, verbatim, lower-cased)

### find-the-differences
- en (125): "1-5 grading system equivalent" · "estimate. then find the difference 3rd grade" · "find 3 differences" · "find a word for kindergarten" · "find the 7 differences" · "find the difference 1st grade"
- de (98): "10 unterschiede finden arbeitsblatt" · "bilder unterschiede finden zum ausdrucken" · "buchstaben suchbilder grundschule" · "fehler suchbilder zum ausdrucken" · "fehlersuchbild" · "fehlersuchbild erwachsene"
- es (61): "busca las 10 diferencias para imprimir" · "busca las 5 diferencias para imprimir" · "busca las 7 diferencias para imprimir" · "busca las diferencias" · "busca las diferencias dificiles para imprimir" · "busca las diferencias niños"
- pt (71): "7 erros jogo das diferenças para imprimir" · "ache as 15 diferenças" · "ache as 3 diferenças" · "ache as 7 diferenças" · "ache as diferenças" · "ache as diferenças fofuras"
- fr (86): "cherche et trouve les différences" · "cherche les différences" · "cherche les différences 7 lettres" · "cherche les différences mots croisés" · "chercher les différences entre 2 colonnes excel" · "chercher les différences entre deux images"
- it (44): "gioco delle differenze" · "gioco delle differenze da stampare" · "gioco delle differenze gratis" · "gioco delle differenze in due immagini" · "gioco delle differenze online" · "gioco delle differenze online gratis"
- nl (62): "verschillen zoeken" · "verschillen zoeken in 2 excel bestanden" · "verschillen zoeken in 2 kolommen excel" · "verschillen zoeken in excel" · "verschillen zoeken kinderen" · "verschillen zoeken kleuters"
- sv (19): "finn fem fel" · "finn fem fel barn" · "finn fem fel barn skriva ut" · "finn fem fel bilder" · "finn fem fel bilder att skriva ut" · "finn fem fel bok"
- da (26): "find 5 fejl" · "find 5 fejl bog" · "find 5 fejl børn" · "find 5 fejl børn bog" · "find 5 fejl børn print" · "find 5 fejl gratis"
- no (21): "finn 5 feil" · "finn 5 feil barn" · "finn 5 feil bilder" · "finn 5 feil bok" · "finn 5 feil jul" · "finn 5 feil latter"
- fi (13): "etsi erot iltasanomat" · "etsi erot kuvasta" · "etsi erot lapsille" · "etsi erot tulostettava" · "etsi kuvasta viisi virhettä" · "etsi viisi virhettä"

### how-to-draw
- en (215): "3rd grade drawing worksheets" · "art worksheets 1st grade" · "art worksheets 2nd grade" · "art worksheets 3rd grade" · "art worksheets grade 1" · "art worksheets kindergarten"
- de (55): "malen lernen" · "malen lernen 1 klasse" · "malen lernen app" · "malen lernen buch" · "malen lernen erwachsene" · "malen lernen für erwachsene kostenlos"
- es (159): "aprender a dibujar" · "aprender a dibujar anime" · "aprender a dibujar con el lado derecho del cerebro" · "aprender a dibujar con el lado derecho del cerebro de betty edwards" · "aprender a dibujar desde cero" · "aprender a dibujar desde cero pdf"
- pt (87): "aprender a desenhar" · "aprender a desenhar animais" · "aprender a desenhar do zero" · "aprender a desenhar facil" · "aprender a desenhar grátis" · "aprender a desenhar imprimir"
- fr (120): "apprendre a dessiner cp" · "apprendre a dessiner cpf" · "apprendre a dessiner maternelle pdf" · "apprendre à colorier cp" · "apprendre à colorier maternelle" · "apprendre à dessiner"
- it (73): "app disegno guidato" · "come disegnare" · "come disegnare 101 progetti passo dopo passo" · "come disegnare i solidi scuola primaria" · "come disegnare i triangoli scuola primaria" · "come disegnare minecraft passo dopo passo"
- nl (91): "boek leren tekenen kleuters" · "hoe teken je" · "hoe teken je een hond" · "hoe teken je een kat" · "hoe teken je een konijn" · "hoe teken je een neus"
- sv (42): "hur man ritar" · "hur man ritar djur" · "hur man ritar en enhörning" · "hur man ritar en hund" · "hur man ritar en häst" · "hur man ritar en kanin"
- da (53): "3d tegning for børn" · "hvordan tegner man en blomst" · "hvordan tegner man en enhjørning" · "hvordan tegner man en hest" · "hvordan tegner man en hund" · "hvordan tegner man en is"
- no (50): "bil tegning for barn" · "dinosaur tegning for barn" · "enhjørning tegning for barn" · "enkle tegninger" · "enkle tegninger av dyr" · "enkle tegninger av hunder"
- fi (33): "helppo piirustus" · "helppo piirustus hevonen" · "helppo piirustus idea" · "helppo piirustus ideoita" · "helppo piirustus kuva" · "helppo piirustus lapsille"
