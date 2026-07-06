# Finnish (fi) demand map — single-axis topic pages + type×grade intersections

**Author:** native Finnish SEO + alkuopetuksen/varhaiskasvatuksen opettaja (I am the native reviewer).
**Inputs:** `docs/SEO/harvests/fi.json` (google.fi autocomplete, hl=fi&gl=fi, 2026-07-06, 461 unique suggestions) · `deck-inventory-type-level.json` / `deck-inventory-themes.json` (fi) · `topics-taxonomy.json` (`.name.fi`) · 12-query google.fi SERP sample.
**Deliverable 2:** `docs/SEO/demand-terms-fi.json` (90 singleAxis + 44 intersections, all titles unique + ≤65c, all metaDescriptions 120–170c, deck counts reconciled to inventory).

**Surface owned here:** single-axis `/fi/topic/<slug>` (TYPE / THEME / LEVEL heads) **and** type×grade intersections. NOT the subject×grade hubs ("Matematiikan tehtävät 1. luokalle") and NOT the per-deck landings ("[type]tehtäviä … | ilmainen tulostettava PDF").

---

## 0. Headline findings

1. **The FI market is FRAGMENTED — no grundschulkoenig/K5-scale owner.** SERP for every sampled query returns small blog/material sites (haaraamo.fi *eskarimatikka*, puuhakerho.com, varinautit.fi *päättelytehtävät*, kielipolku.info, lukimat.fi, ilmaisristikot.fi, ryhmarenki.fi, papunet.net, summamutikka, matikkamatskut) + a large **ikäihmis-/aivojumppa** split (aivoliitto, vahvike, hoivakoti). No single domain owns a type head. **⇒ Many exact-format niches are genuinely WINNABLE**, unlike DE.

2. **The single strongest FI intent is the level qualifier `eskari` / `esiopetus` (5-7).** It appears across the harvest attached to nearly every type ("kellonajat esiopetus/eskari", "hahmottaminen esiopetus/eskari", "mittaaminen esiopetus/eskari/alkuopetus", "looginen päättely eskari", "kielellinen tietoisuus esiopetus", "geometria esiopetus", "enemmän vähemmän eskari"). **⇒ The kindergarten/esiopetus intersections are the money-pages**, more than the bare type heads.

3. **Several taxonomy `name.fi` values are NON-DEMAND / wrong-intent words** and must not lead a title:
   - `kuviojuna` (pattern-train) = wooden-toy intent → lead with "jatka kuviota" / the esiopetus intersection.
   - `yhdistäminen` (matching) = **knitting/crochet** ("yhdistäminen silmukoimalla/virkkaamalla") → lead "yhdistä kuvat/parit".
   - `iso vai pieni` (big-small) = **capitalization** ("iso vai pieni alkukirjain") → lead "koko / kokovertailu".
   - `lajittelu` (sorting/picture-sort) = **waste sorting** ("lajitteluastia/opas") → lead "lajittelutehtäviä lapsille".
   - `arvaa sana` (word-guess) = newspaper/app game (kaleva/iltalehti/lautapeli).
   - `aarteenetsintä` (treasure-hunt) = **birthday party** (synttärit/vihjeet/metallinpaljastin).
   - `ristikko` (crossword) = **adult newspaper crossword** (ratkojat/apteekki/kauppakeskus) → lead "kuvaristikko lapsille".
   - `puuttuvat palat` (missing-pieces) = **LEGO** ("lego puuttuvat palat") → lead a context qualifier.
   - `prepositiot` (prepositions) = **foreign-language study** (englanti/ruotsi/saksa) → lead the native FI term **"sijaintikäsitteet"** (confirmed by SERP: Etsy, kielipolku).

4. **Exact-match FI heads that ARE clean demand (author these best-in-class):** `kuvasudoku` (sudoku), `mikä ei kuulu joukkoon` (odd-one-out), `hahmottaminen` (visual-discrimination cluster head), `kellonajat` (telling-time), `lukusuora` (number-lines), `kymmenet ja ykköset` (base-ten), `alkuäänteet` (beginning-sounds), `kielellinen tietoisuus` (phonological-awareness), `etsi ja laske` (find-and-count), `labyrintti` (picture-path), `mittaaminen esiopetus/alkuopetus` (measurement).

5. **Finnish compounds run long.** Titles use CLOSED compounds ("yhteenlaskutehtäviä", "sanahakutehtäviä", "kellonaikatehtäviä", "hahmotustehtäviä") and prefer ≤51c; hard cap 65c (validated: max title = 65). Honest qualifiers only: **ilmainen / ilmaiseksi / tulostettava / PDF / verkossa**. Case agreement enforced: partitive-plural "ilmaisia tulostettavia tehtäviä", allative "1. luokalle", illative "esiopetukseen".

---

## 1. Per-axis demand analysis (types)

Deck totals are fi-only. "Head" = the bare taxonomy/demand word; "clean tail" = the query we can win.

| Type (en key) | fi decks | Demand head | Verdict | Note |
|---|---|---|---|---|
| addition | 199 | yhteenlasku **tehtäviä** ✓ (head has englanniksi/excel/allekkain noise) | HARD head / WINNABLE via esiopetus | picture-addition angle; money-page = addition__kindergarten |
| subtraction | 198 | vähennyslasku **tehtäviä** ✓ | HARD head / WINNABLE via esiopetus | avoid "allekkain lainaaminen" (2.-3. lk) |
| code-addition | 149 | — (koodattu yhteenlasku invented) | SKIP head | rides yhteenlasku long-tail + internal links |
| more-less | 146 | **enemmän vähemmän tehtäviä** ✓ + eskari ✓ | WINNABLE | strong varhaiskasvatus; separate from comparing-groups |
| math-puzzle | 145 | looginen päättely tehtäviä lapsille ✓ | MID via 1. luokka | "matematiikkapulma" is not a query |
| picture-sort | 127 | **lajittelutehtäviä lapsille** ✓ (bare lajittelu = waste) | MID | category angle via esiopetus |
| math-worksheet | 99 | matematiikan tehtävät | **DEFER-TO-HUB** | belongs to subject×grade hub |
| sudoku | 99 | **kuvasudoku** ✓ EXACT | **WINNABLE** | best niche: exact word + exact 4×4 format |
| prepositions | 98 | **sijaintikäsitteet** ✓ (prepositiot = lang-study) | WINNABLE | S2/kielen tuki moat |
| cryptogram | 97 | kryptogrammi (often definitional; head = crypto/card) | WINNABLE niche | themeless; topic page carries all demand |
| treasure-hunt | 97 | aarteenetsintä (party intent) | LOW head | longtail "aarteenetsintä 1 luokka" via intersection |
| odd-one-out | 96 | **mikä ei kuulu joukkoon** ✓ EXACT (+tehtävä/tulostettava/kortit) | **WINNABLE** | build best-in-class page |
| word-guess | 96 | arvaa sana (app/newspaper game) | LOW-MID | avoid "hirsipuu" wording |
| find-objects | 96 | etsi esineet (game-app: "piilotetut esineet pelit") | LOW-MID | separate from find-and-count |
| word-scramble | 95 | kirjainsekoitus (no head) | LOW-MID | picture-hint + 1. luokka intersection |
| find-and-count | 94 | **etsi ja laske** ✓ EXACT | WINNABLE niche | varhaiskasvatus |
| shadow-match | 94 | yhdistä kuvat niiden varjoihin ✓ (SERP) | **WINNABLE** | thin SERP; biggest perception-cluster stock |
| missing-pieces | 93 | puuttuvat palat = LEGO | LOW-MID | always rank with context qualifier |
| big-small | 93 | iso/pieni (bare = capitalization) | MID | lead "koko/kokovertailu" NEVER "alkukirjain" |
| science-sort | 90 | ympäristöoppi <luokka> tehtäviä | **DEFER-TO-HUB** | — |
| matching | 88 | yhdistä kuvat/parit ✓ (bare yhdistäminen = knitting) | MID | lead "yhdistä kuvat" |
| picture-path | 88 | **labyrintti tehtäviä lapsille** ✓ | MID | frame as maze/labyrintti |
| telling-time | 81 | **kellonajat tehtäviä** ✓ + esiopetus/eskari | HARD head / WINNABLE via intersections | richest FI family — 3 grade intersections |
| bingo | 79 | bingo tehtäviä (bare bingo = bingolotto) | MID | group-play printable-templates angle |
| fractions | 68 | murtoluvut (demand skews 3.-5. lk) | LOW-MID | "ensimmäiset murtoluvut"; no 1. lk intersection |
| alphabet-train | 64 | **aakkoset tehtäviä lapsille** ✓ (aakkosjuna = TV/toy) | LOW-MID | lead "aakkoset" |
| chart-count | 49 | — (no clean head) | LOW | describe honestly |
| pattern-worksheet | 49 | jatka kuviota 1 luokka | MID via 1. luokka | — |
| wordsearch | 49 | **sanahaku tehtäviä** ✓ (peli/lehti/netissä = app) | HARD head / WINNABLE via theme+grade | rivals ilmaisristikot/ryhmärenki + ikäihminen split |
| grid-match | 48 | — (ruudukkoyhdistys no head) | SKIP head | internal links + hahmottamis-cluster |
| crossword | 45 | **kuvaristikko lapsille** ✓ (ristikko = adult) | HARD head / WINNABLE niche | grade-2 intersection |
| geometry | 37 | **geometria 2 luokka / esiopetus** ✓ (head skews 3.-6.) | MID via grade-2 | — |
| measurement | 35 | **mittaaminen esiopetus/alkuopetus** ✓ EXACT | WINNABLE niche | very clean teacher intent |
| number-charts | 34 | lukutaulu / satataulu ✓ | MID niche | 1.-2. lk skew |
| arrays-multiplication | 31 | kertotaulu ✓ (head strong) | HARD head / MID via grade-2 | our decks = image arrays (alkeet), not drill |
| graphing-data | 28 | kaaviot ja tilastot | MID | free angle open |
| counting-pictures | 27 | lukumäärä tehtäviä lapsille ✓ | LOW-MID | small stock |
| phonological-awareness | 25 | **kielellinen tietoisuus** ✓ + esiopetus/varhaiskasvatus | MID / WINNABLE | strong varhaiskasvatus term |
| letter-knowledge | 20 | kirjaintuntemus ✓ | MID | not "kirjoita" (we have no writing sheets) |
| patterns | 17 | jatka kuviota / kuviojono ✓ | MID | esiopetus qualifier → pattern-train (don't double) |
| visual-discrimination | 15 | **hahmottaminen** ✓ (cluster head) + esiopetus/eskari/varhaiskasvatus | **WINNABLE** / DECK-GAP | 15 decks for a head query → produce more |
| comparing-sizes | 15 | kokojen vertailu ✓ (head = maiden kokojen…) | MID niche | separate from big-small |
| visual-logic | 14 | looginen päättely tehtäviä lapsille/eskari ✓ (head = adult/AMK) | MID | DECK-GAP candidate |
| picture-arithmetic | 14 | laske kuvilla | MID | all decks 1. lk → no separate intersection |
| base-ten | 12 | **kymmenet ja ykköset** ✓ EXACT | MID niche | — |
| science-match | 10 | — | LOW | support page |
| beginning-sounds | 10 | **alkuäänteet** ✓ | HARD demand / **DECK-GAP** | biggest literacy deck-gap |
| word-building | 10 | rakenna sana / sananrakennus | LOW-MID niche | alkuäänne-family neighbor |
| picture-vocabulary | 10 | **kuvasanasto** ✓ (varhaiskasvatuksen kuvasanasto) | WINNABLE niche | S2 moat; grow stock |
| number-lines | 9 | **lukusuora** ✓ (0-20/0-100/tehtäviä) | HARD demand / **DECK-GAP** | biggest UNSERVED math demand — produce decks |
| counting-frames | 9 | kymmenkehys | WINNABLE niche / DECK-GAP | — |
| comparing-groups | 8 | määrien vertailu | MID / DECK-GAP | merkitön muotoilu vs more-less |
| position-words | 8 | sijaintikäsitteet (overlaps prepositions) | LOW / internal only | frame math "sijainti- ja suuntakäsitteet" |
| comparing-numbers | 6 | lukujen vertailu ✓ (excel noise) | WINNABLE niche / DECK-GAP | classic 1. lk topic |
| visual-matching | 5 | kuvaparit | MID / DECK-GAP | — |
| sorting-categories | 4 | lajittelu (waste-sort head) | SKIP | fold into picture-sort |
| tally-counting | 4 | tukkimiehen kirjanpito ✓ (definitional) | WINNABLE niche / DECK-GAP | — |
| science-sequence | 1 | järjestys/elämänkierto | SKIP | placeholder |

---

## 2. SERP sampling (12 google.fi queries, 2026-07-06) — WINNABLE / HARD / SKIP

| Query | Verdict | Evidence |
|---|---|---|
| `kuvasudoku lapsille tulostettava` | **WINNABLE** | Fragmented: haaraamo (eskarimatikka pdf), supercoloring, livesudoku, websincloud, Pinterest, ilmaisristikot. No dominant owner; our exact 4×4 picture format matches. |
| `mikä ei kuulu joukkoon tehtävä tulostettava lapsille` | **WINNABLE** | varinautit (päättelytehtävät), papunet, taikanorppa, loruisa, etäpuheterapia — fragmented; no free-printable format owner in our shape. |
| `hahmottaminen tehtäviä lapsille tulostettava esiopetus` | **WINNABLE** | KUVILLA, lastenkeskus, kielipolku, puuhakerho, haaraamo — small blogs/material banks; cluster head open. |
| `kellonajat tehtäviä lapsille tulostettava` | HARD head / **WINNABLE tail** | lukimat (authoritative), freeed, wordwall, Pinterest — head contested, but grade-qualified tail open. |
| `lukusuora tehtäviä tulostettava 1 luokka` | HARD / **DECK-GAP** | lukimat, summamutikka (Helsinki), varganemenyi, freeed — established math owners; we have 9 decks. |
| `alkuäänteet tehtäviä tulostettava eskari` | HARD demand / **DECK-GAP** | kielipolku, lastenkeskus, puuhakerho, YLE Pikku Kakkonen, varinautit — demand large; we have 10 decks. |
| `yhteenlasku tehtäviä tulostettava esiopetus` | HARD head / **WINNABLE niche** | hoxapp, haaraamo, lukimat, KUVILLA — fragmented, no dominant SEO owner. |
| `eskari tehtäviä tulostettava matematiikka` | HARD head / **WINNABLE distributor** | haaraamo, puuhakerho, lukimat, Pinterest, openinno — fragmented; level hub as distributor. |
| `sijaintikäsitteet prepositiot tehtäviä lapsille tulostettava` | **WINNABLE** | "sijaintikäsitteet" is the native term (Etsy, kielipolku, arkenalapsuus, kaikkikuvaa); "prepositiot" pulls foreign-language grammar. |
| `yhdistä kuvat parit tehtävä lapsille tulostettava` | MID | neuvokasperhe (yhdistä pisteet), leikkipankki, websincloud (kuvat→varjot = shadow-match), wordwall. Confirms shadow-match + matching framing. |
| `lasten ristikko tulostettava kuvaristikko` | HARD / **WINNABLE niche** | ilmaisristikot (kuvaristikko for kids), ryhmärenki, tekstikuva, sanaristikot.net (lasten) + adult/elderly split. "kuvaristikko lapsille" niche open. |
| `sanahaku lapsille tulostettava` | HARD head / **WINNABLE tail** | ilmaisristikot dominant + ikäihmis-split (aivoliitto, vahvike); theme+grade tail open. |

**Rival domain map:** ilmaisristikot.fi (ristikko/sanahaku/sudoku), ryhmarenki.fi, varinautit.fi (päättelytehtävät/aakkoset), papunet.net, lukimat.fi (math/reading authority), summamutikka (Helsinki), haaraamo.fi (eskarimatikka), kielipolku.info, lastenkeskus.fi, puuhakerho.com, freeed.com, hoxapp.com. Elderly/aivojumppa split: aivoliitto.fi, vahvike.fi.

---

## 3. Intersections (44) — type×grade, ≥12 decks each, level matched to deck age

Age→level: 3-5 = varhaiskasvatus (preschool) · 5-7 = esiopetus/eskari (kindergarten) · 6-8 = 1. luokka (grade-1) · 7-9 = 2. luokka (grade-2) · 8-10 = 3. luokka (grade-3). **Every intersection's (type, level) reconciled to `deck-inventory-type-level.json` — 0 empty pages, deck counts exact.**

**esiopetus / eskari (kindergarten, 5-7) — 24 intersections, the money band:** addition (199), subtraction (198), pattern-train (246), picture-sort (127), sudoku (99), prepositions/sijaintikäsitteet (98), odd-one-out (96), find-objects (96), word-guess (96), shadow-match (94), missing-pieces (93), matching (88), picture-path (88), bingo (79), code-addition (149), chart-count (49), grid-match (48), counting-pictures (27), phonological-awareness (25), letter-knowledge (20), visual-discrimination (15), comparing-sizes (15), patterns (15).

**varhaiskasvatus (preschool, 3-5):** more-less (146), big-small (93), find-and-count (94), alphabet-train (64).

**1. luokka (grade-1, 6-8):** math-puzzle (145), treasure-hunt (97), word-scramble (95), pattern-worksheet (49), wordsearch (49), telling-time (21), picture-arithmetic (14), number-charts (13), graphing-data (12), measurement (12).

**2. luokka (grade-2, 7-9):** crossword (45), fractions (34), telling-time (20), geometry (17), arrays-multiplication (14).

**3. luokka (grade-3, 8-10):** telling-time (40), fractions (34).

**Highest-value intersections (verbatim harvest demand):** `kindergarten__phonological-awareness` ("kielellinen tietoisuus esiopetus" verbatim), `geometry__grade-2` ("geometria 2 luokka" verbatim), `grade-1__measurement` ("mittaaminen alkuopetus" verbatim), `kindergarten__visual-discrimination` ("hahmottaminen esiopetus" verbatim), `kindergarten__odd-one-out` ("mikä ei kuulu joukkoon" + eskari), the three `telling-time` grades ("kellonajat esiopetus/tehtäviä"), and the `addition`/`subtraction`/`more-less` esiopetus/eskari trio (largest stock).

---

## 4. DECK-GAPS — biggest unserved FI demand (recommend deck production, then flip the topic/intersection)

Ranked by (demand strength × current thinness):

1. **number-lines / lukusuora (9 decks)** — one of the strongest FI math families in the harvest ("lukusuora 0-20 / 0-100 / tehtäviä"), almost no stock. Biggest single opportunity.
2. **beginning-sounds / alkuäänteet (10)** — large literacy demand ("alkuäänteet", esiopetus family); producing decks would unlock the whole reading-readiness family.
3. **visual-discrimination / hahmottaminen (15)** — cluster HEAD query with rich harvest ("hahmottaminen tehtäviä lapsille / esiopetus / eskari / varhaiskasvatus"), only 15 decks.
4. **comparing-numbers / lukujen vertailu (6)**, **counting-frames / kymmenkehys (9)**, **tally-counting / tukkimiehen kirjanpito (4)** — clean 1.-2. lk teacher intents, near-empty.
5. **picture-vocabulary / kuvasanasto (10)** — S2 moat ("varhaiskasvatuksen kuvasanasto"), thin.

---

## 5. Cannibalization + boundary rules (do NOT self-collide)

- **prepositions vs position-words:** prepositions owns **"sijaintikäsitteet"** (kieli/S2, 98 decks); position-words = math "sijainti- ja suuntakäsitteet" (8 decks, internal-link only).
- **more-less vs comparing-groups:** more-less = "enemmän vai vähemmän" (with/relational); comparing-groups = **merkitön** "määrien vertailu".
- **big-small vs comparing-sizes:** big-small = iso/pieni (varhaiskasvatus); comparing-sizes = järjestä koon mukaan.
- **patterns vs pattern-train vs pattern-worksheet:** kuviojono head → patterns; esiopetus qualifier → pattern-train (246); 1. luokka → pattern-worksheet. Don't double the esiopetus qualifier.
- **find-and-count vs find-objects:** etsi + laske (count) vs etsi piilotetut esineet (no count).
- **shadow-match vs matching:** "yhdistä kuvat niiden varjoihin" (shadow) vs "yhdistä kuvat/parit" (general).
- **animals family:** animals (general) vs farm_animals / forest_creatures / zoo_animals / pets / birds — keep each on its own noun; consolidate birds + birds_2 into one lintu-hub.
- **Level pages stay subject-free** ("1. luokan tehtäviä") — the subject×grade hubs own "matematiikan tehtävät 1. luokalle". **DEFER-TO-HUB:** math-worksheet, science-sort.
- **Seasonal themes EXCLUDED** (joulu, pääsiäinen, talvi, kevät, kesä, kiitospäivä, heinäkuun 4.) — owned by the seasonal hubs (2026-07-06).

---

## 6. Themes authored (26, non-seasonal)

Attested formulation from harvest = **"<teema>aiheisia tehtäviä lapsille"** ("avaruusaiheisia tehtäviä lapsille", "jouluaiheisia…" verbatim). Strong harvest signals: animals (eläimet/maatilan eläimet), shapes (muodot), space (avaruus — very strong), music (musiikki), emotions (tunteet), colors (värit — note foreign-language slant), farm_animals (maatilan eläimet), weather (sää), dinosaurs (dinosaurus), vehicles (auto), birds (lintu), insects (ötökkä), tree (luonto). The rest (fruits, toys, vegetables, clothing, pets, zoo_animals, occupations, body_parts, tools, forest_creatures, ocean_life, flowers, things_that_fly) authored on echo/deck-count evidence with honest MID-niche verdicts. **S2/kielen tuki moat themes:** body_parts, clothing, occupations, picture-vocabulary, colors — surface the S2 angle. Theme long-tail (type+theme+grade) belongs to deck landings; these hubs stay broad ("lapsille", no grade).

---

## 7. Parse/validation summary

- `demand-terms-fi.json` parses; schema matches en/de exactly (`locale`, `titlePattern`, `singleAxis{<en key>}`, `intersections[]` with sorted `<a__b>` English keys).
- **90 singleAxis** (57 types + 5 levels + 26 themes + science-sort/match/sequence + comparing-* etc.) · **44 intersections**.
- **134/134 unique titles**, all ≤65c (max = 65). All 90+44 metaDescriptions within **120–170c**, each content-specific (no swapped-noun template).
- All intersection (type, level) pairs verified ≥12 decks and level=deck-age → **0 empty pages**; JSON deck counts equal inventory.
- Native Finnish: closed compounds, partitive-plural agreement ("ilmaisia tulostettavia tehtäviä"), allative "1. luokalle", illative "esiopetukseen". `[NSR-FLAG][fi]` not needed — I am the native reviewer.
