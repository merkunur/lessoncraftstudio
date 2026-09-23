# nt10-E (b5) selection - NORDIC native-SEO panel (sv lågstadiet · da indskoling · no småskoletrinnet, bokmål · fi alkuopetus) - 2026-09-23

Panel: four native K-3 teacher-SEO experts, one per market. Inputs: `_records/candidate-seeds.json` (round 1, 2 heads per candidate, 168 requests per locale, 0 errors), the round-1 harvests `_records/harvest-candidates.{sv,da,no,fi}.json`, and our round-2 re-probe with corrected school-register seeds `_records/candidate-seeds-nordic-v2.json` → `_records/v2/harvest-candidates.{sv,da,no,fi}.json` (2-3 heads per candidate; sv 245, da/no/fi 231 requests; 0 errors; market hl/gl unchanged). Every number is a `perCandidate.<key>.unique` count from one of those files; every quoted suggestion is verbatim (the script lower-cases). Where we do not know a SERP owner we say unknown. Collision checks were read from `frontend/config/topics-taxonomy.json` (`axes.theme`, `axes['exercise-type']`) and `scripts/worksheet-gen/types/`.

**Market-size caveat, stated once and meant everywhere.** Sweden 10.5 M, Denmark 5.9 M, Norway 5.5 M, Finland 5.6 M people vs Germany 84 M. Autocomplete depth scales with the market (`2d-shapes` round 1: en 135, de 115, sv 44, da 32, no 26, fi 15). A Tier-A head in a Nordic market is roughly 1/8 (sv) to 1/15 (da/no/fi) of the German volume for the same genre. Tier letters below are RELATIVE to the market; clicks in the closing section are scaled down accordingly.

**Comparability caveat for round 2.** Round 2 used a third head on most candidates, so a round-2 cell is NOT directly comparable to its round-1 cell (more heads → more strings). We therefore judge round 2 by WHICH strings appeared (school tails: arbetsblad / opgaver / oppgaver / tehtäviä, åk / klasse / trinn / luokka, skriva ut / til print / utskrift / tulostettava), not by the raw delta.

---

## 0 Step 1 - which round-1 seeds were un-native

| candidate | sv | da | no | fi |
|---|---|---|---|---|
| plants | "växter" = garden/retail noise; "växtens delar" native | "planter" = retail + French "planter" noise | "planter" = garden noise | "kasvit" = botanic-garden noise; "kasvin osat" native |
| life-cycles | native | native but thin | native but thin | **"perhosen elämänkierto" un-native** (returned 0; teachers say "perhosen kehitys(vaiheet)") |
| materials | **"magnetiskt" = product noise** (knife blocks, shoehorns); "material och egenskaper" Google-corrected to "materials egenskaper" | **"magnetisk" = product noise**; "materialer" adult | same as da | **"materiaalit"/"magneetti" = industrial/MRI noise** |
| space | native | native | native | native |
| colors | "färger" = the THEME name + iPhone/paint noise | "farver" = printer ink noise | "farger" = the retail chain Fargerike | "värit" = colouring-book noise |
| 2d-shapes | "former" = English "former" + nails; "geometriska former" native | "former" = plant propagation ("formering") | same | native |
| digraphs | "sje-ljudet"/"tje-ljudet" semi-native (school writes "sj-ljudet"/"tj-ljudet") | **WRONG CONCEPT: "lydrette ord" is our shipped `syllable-reading` type's da slug; "vokaler" = vowels generally** | native ("kj-lyd", "skj-lyd") | native ("pitkät vokaalit", "diftongit") |
| synonyms | native | native | native | native |
| homophones | "homofoner" adult/linguistics | same | same | Finnish has no K-3 homophone point (phonemic orthography) |
| road-safety | "trafiksäkerhet" = agency/insurer noise (Trafiksäkerhetsverket); the school head is "trafik" | native ("færdselslære") | "trafikksikkerhet" = municipal plans/conferences; school head is "trafikk for barn"/"trafikkopplæring" | native |
| maps | native | native | native | native |
| family | "familjen" = TV/restaurants (Addams, Bridgerton) | "familien" = TV series | "familien" = TV series | "perhe" = family-bed/tent/day-care noise |

---

## 1 `plants` - parts of a plant / seed to plant

Heads: sv **växtens delar**, "blommans delar" (B; WINNABLE; owners lektion.se, skolmagi (paid), elevspel, UR film) · da **plantens dele**, "fra frø til plante" (C; WINNABLE but thin; owners unknown, likely Alinea/clioonline natur/teknologi) · no **plantens deler**, "fra frø til plante" (C; owners NRK Super, Salaby paid) · fi **kasvin osat**, "kukan osat" (B-; WINNABLE for "nimeä kasvin osat"; owners Otava/Sanoma (paid), papunet unknown).

- **sv.** R1 15 (5 school: "växtens delar arbetsblad", "växtens delar och funktion", "växtens olika delar"; noise: "växter som trivs i skugga", "växter ikea"). R2 18, all on-topic: "blommans delar arbetsblad", "blommans delar åk 1", "blommans delar barn", "blommans delar elevspel", "blommans delar pistill", "blommans delar åk 4", "från frö till växt bok". Tier B. Faces: "växtens delar" (label), "blommans delar" (label the flower), "från frö till växt" (sequence; collides with `science-sequence` - see traps), "vad behöver växten" (needs), "rot stjälk blad blomma" (word bank). Traps: theme `flowers` = sv "Blommor" (slug blommor) → never title bare "Blommor"; "Växtens delar" is fine; sv definite "växten"/"blomman" is idiomatic in the title ("Blommans delar").
- **da.** R1 17, 1 school ("plantens dele"); rest retail/French. R2 11: "blomstens dele", "fra frø til plante undervisning", "fra frø til plante film", plus vegetable-gardening ("agurk/chili/squash fra frø til plante"). No klasse, no opgaver. Tier C. Faces: "plantens dele", "blomstens dele", "fra frø til plante". Traps: theme `flowers` da "Blomster"; "plantens dele" definite genitive is correct.
- **no.** R1 11, 1 school. R2 11: "blomstens deler", "fra frø til plante barnehage", "fra frø til plante undervisning". Tier C. Traps: theme `flowers` no "Blomster".
- **fi.** R1 20: "kasvin osat", "kasvin eri osat", "kasvin osat ja niiden tehtävät", "nimeä kasvin osat", "kasvin lehden/juuren/varren osat" (noise: "kasvitieteellinen puutarha …" ×7). R2 20: "kukan osat", "kukan eri osat", "kukan osat ja niiden tehtävät", "mitkä ovat kukan osat", "siemenestä kasviksi video". No "tehtäviä", no luokka. Tier B- (real ympäristöoppi term, instruction-shaped "nimeä kasvin osat" is exactly a worksheet). Traps: theme `flowers` fi "Kukat" → title **Kasvin osat**, never "Kukat"; instruction "Nimeä kasvin osat." (object plural, correct).

## 2 `life-cycles` - butterfly / frog stages

Heads: sv **fjärilens livscykel**, "grodans livscykel" (A-; WINNABLE for "grodans livscykel arbetsblad"; owners skolmagi (hits "… skolmagi" on both animals, paid), lektion.se, UR) · da **sommerfuglens livscyklus** (C; film-driven; owner unknown) · no **sommerfuglens livssyklus** (C; owner unknown) · fi **perhosen kehitysvaiheet**, "sammakon kehitysvaiheet" (C+; owner unknown).

- **sv.** R1 15, 12 school: "fjärilens livscykel arbetsblad", "fjärilens livscykel arbetsblad gratis", "fjärilens livscykel förskola", "fjärilens livscykel pyssel", "fjärilens livscykel skolmagi", "grodans utvecklingsstadier" (noise "… pasta"). R2 30: "grodans livscykel arbetsblad", "grodans livscykel åk 1", "grodans livscykel förskola", "grodans livscykel snurra", "livscykler åk 1", "livscykler åk 2", "livscykler åk 3", "livscykel åk 1", "trädets livscykel åk 1", "olika livscykler". Tier A- (both animals + the genre word carry every grade; "gratis" appears → the paid owner is beatable). Faces: "fjärilens livscykel", "grodans livscykel", "livscykel-snurra" (wheel; demanded verbatim "snurra"), "vad kommer sedan", "trädets livscykel".
- **da.** R1 5 ("sommerfuglens livscyklus", "frøens udviklingsfaser", "hvordan er sommerfuglens livscyklus"). R2 14 but the only new school string is "frøens livscyklus"; bare "livscyklus" = pests and LCA ("livscyklus flåt/møl", "livscyklusanalyse"). Tier C.
- **no.** R1 2; R2 12, only "froskens livssyklus" new; bare "livssyklus" = pests and salmon farming. Tier C.
- **fi.** R1 4 (all sammakko); R2 11: "perhosen kehitys", "perhosen kehitysvaiheet", "perhosen toukan kehitys", "perhosen kehityskaari", "elämänkierto kasvi". Tier C+.
- **Collision (all four):** exercise-type `science-sequence` is already named sv "Ordningsföljd och livscykler", da "Rækkefølge og livscyklusser", no "Rekkefølge og livssykluser", fi "Järjestys ja elämänkierto" (shipped: G1-203 chicken life cycle). A new type titled "Livscykler/Livscyklus/Elämänkierto" is a same-string cannibal. Lock animal-genitive titles: sv **Fjärilens livscykel**, da **Sommerfuglens livscyklus**, no **Sommerfuglens livssyklus**, fi **Perhosen kehitysvaiheet** - or, better, the build decides whether this is a FACE fan of `science-sequence` rather than a new family.

## 3 `materials` - properties, magnetic or not, float/sink

Heads: sv **magnetism**, "flyter eller sjunker" (B-; WINNABLE for "magnetism arbetsblad"; owners UR, NTA (Naturvetenskap och teknik för alla, paid kits)) · da **magnetisme** (C; "magnetisme opgaver" is Gyldendal fysik/kemi, above band) · no **magnetisme** (C/dead) · fi **kelluu vai uppoaa** (dead).

- **sv.** R1 16, 5 school: "magnetism arbetsblad", "magnetism åk 2", "magnetism åk 3", "magnet 3 klass", "materials egenskaper åk 1/åk 3" (Google corrected the seed); 11 product noise ("magnetiskt knivblock", "magnetiskt myggnät"). R2 25: "magnetism förskola", "magnetism för barn", "flyter eller sjunker experiment", "varför flyter eller sjunker saker", "material och deras egenskaper", "material och dess egenskaper"; noise "flyter eller sjunker ägg/bajs", "magnetism parfym". Tier B-.
- **da.** R1 24, 0 on-topic (magnetic products, "materialer til træterrasse"). R2 21: "magnetisme opgaver", "magnetisme gyldendal", "magnetisme forklaring"; "flyde eller synke" = egg-freshness and stool. Tier C.
- **no.** R1 20, 0 on-topic; R2 18, 0 school (French "magnetisme c'est quoi" leakage, eggs). Tier dead.
- **fi.** R1 24, 0 on-topic (MRI, engineering salaries); R2 3: "kelluu vai uppoaa", "muna kelluu vai uppoaa", "magneetin vetovoima". Tier dead.
- Overlap: shipped `recycling` face G2-348 "odd one out by material" already claims the material-classification query in every locale.

## 4 `space` - solar system, planets, moon phases

Heads: sv **solsystemet**, "planeterna" (A-; WINNABLE for "planeterna arbetsblad"; owners UR, lektion.se, Rymdstyrelsen, skolmagi) · da **solsystemet**, "planeterne" (A-; WINNABLE for "solsystemet opgaver indskoling"; owners clioonline, Alinea, DR Ultra) · no **solsystemet**, "planetene" (B; owners NRK Super, Salaby paid, Norsk Romsenter) · fi **aurinkokunta**, "planeetat" (B-; owners Yle, Ursa; "tulostettavat planeetat" unowned).

- **sv.** R1 25: "solsystemet arbetsblad", "solsystemet skriva ut", "solsystemet åk 2", "solsystemet för barn", "månens faser arbetsblad", "månens faser åk 2", "månens faser för barn" (noise: "solsystemet snapchat" ×3, "månens faser 2026/idag/kalender"). R2 39: "planeterna arbetsblad", "planeterna åk 2", "planeterna skriva ut", "planeter att skriva ut", "planeternas ordning ramsa", "planeterna i storleksordning". Tier A-.
- **da.** R1 27: "solsystemet 1 klasse", "solsystemet 2 klasse", "solsystemet 3 klasse", "solsystemet opgaver indskoling", "solsystemet for børn opgaver", "solsystemet print", "månens faser tegning". R2 37 adds "planeternes rækkefølge", "planeternes navne", "planeternes størrelse". Tier A- (the cleanest Danish tail in this batch).
- **no.** R1 21: "solsystemet oppgaver", "solsystemet for barn", "solsystemet tegning"; month-phase calendars dominate "månefaser". R2 31: "planetenes rekkefølge regle", "planetene i rekkefølge etter størrelse", "planetene våre". Tier B.
- **fi.** R1 20: "aurinkokunta pienoismalli", "aurinkokuntamme planeetat" (noise: "aurinkokunta snap/mobile", calendar phases). R2 31: "tulostettavat planeetat", "planeetat järjestyksessä auringosta", "planeetat koon mukaan". Tier B-.
- Faces (all): planets in order, planet sizes, moon phases (sv/da the demanded ones; NOT a dated calendar), "label the solar system", "sun, earth, moon". Traps: theme `space` = sv "Rymden", da "Rummet", no "Verdensrommet", fi "Avaruus" → type title **Solsystemet** (sv/da/no, identical spelling, definite singular) / **Aurinkokunta** (fi); never "Rymden"/"Rummet"; "månens faser"/"månefaser"/"kuun vaiheet" pull 2026-calendar traffic (no dates in any title). Planet names: sv/da/no "Jorden", fi "Maa" (capitalised as proper nouns).

## 5 `colors` - colour words / mixing

Heads: sv **grundfärger**, "blanda färger" (C; art-register; owners unknown) · da **primærfarver**, "blande farver" (C) · no **primærfarger**, "blande farger" (C) · fi **päävärit**, "värien sekoittaminen" (C).

- **sv.** R1 28, school-relevant only foreign-language: "engelska färger åk 1", "colours åk 1", "arbetsblad färger engelska", "färgerna på spanska/tyska"; plus iPhone/cable noise. R2 30: "grundfärger bilduppgift", "grundfärger förskola", "grundfärger och sekundärfärger", "blanda färger till lila/brunt"; "färgord" was Google-rewritten to "färgordning" (cable colour codes) - there is no Swedish head "färgord" at all. Tier C.
- **da.** R1 29: "farver opgaver", "farver print", "tysk farver opgaver", printer-ink noise. R2 23: "primærfarver billedkunst", "primærfarver og sekundærfarver", "blande farver skema". Tier C.
- **no.** R1 22: "farger oppgaver", "klær og farger oppgaver" (the rest Fargerike shops). R2 20: "primærfarger fargesirkel", "blande farger til …". Tier C.
- **fi.** R1 23: "värit tehtäviä", "värit englanti tehtäviä", "värit ruotsiksi tehtäviä" (colouring-book noise). R2 24: "päävärit ja välivärit", "värien sekoittaminen lasten kanssa", "väriympyrä värien nimet". Tier C.
- **Verdict:** colour NAMES in the mother tongue are pre-K (förskola/barnehage), not lågstadiet content; Nordic demand is either foreign-language (English colours) or art (bild/billedkunst colour mixing). Trap: theme `colors` = sv "Färger", da "Farver", no "Farger", fi "Värit" - a bare title collides with the theme slug; any title must be "Grundfärger/Primærfarver/Primærfarger/Päävärit".

## 6 `2d-shapes` - plane shapes

Heads: sv **geometriska former**, "geometriska figurer" (A; owners skolplus, Nomp, lektion.se, UR) · da **geometriske figurer**, "former og figurer" (A-; owners matematikfessor (paid), Alinea) · no **geometriske figurer**, "former og mønster" (B+; owners NRK ("former – spill fra nrk"), Salaby paid) · fi **tasokuviot**, "geometriset muodot" (B; owners unknown; "tasokuviot alkuopetus" unowned).

- **sv.** R1 44, the richest sv tail in the batch: "geometriska former förskoleklass", "geometriska former åk 1", "åk 2", "åk 3", "geometriska former arbetsblad", "geometriska former att skriva ut", "geometriska figurer arbetsblad", "former skriva ut förskola", "geometriska former namn" (noise: "former på naglar", "formerly known as", "vattnets former åk 1/2" = states of water). R2 41: "geometriska objekt åk 1/2/3", "geometriska figurer och kroppar", "plana figurer" (crossword only). Tier A.
- **da.** R1 32: "former og figurer 1 klasse", "2 klasse", "former og figurer opgaver", "geometriske figurer til print", "geometriske figurer plakat" (noise: "formering af roser" ×7). R2 22: "former og figurer 0 klasse". Tier A-.
- **no.** R1 26: "geometriske figurer 1 trinn", "former og mønster 1 trinn", "geometriske figurer oppgaver", "geometriske figurer plakat", "geometriske figurer med navn". R2 14 (no new school string). Tier B+.
- **fi.** R1 15: "tasokuviot alkuopetus", "geometriset muodot lapsille", "geometriset muodot tehtävä", "geometriset muodot nimet suomeksi". R2 15 identical. Tier B.
- **Collision (serious, all four):** exercise-type `geometry` is already sv "Geometri", da "**Geometri og former**", no "Geometri", fi "Geometria", and ships K-070 find-the-shapes, K-075 count-the-sides, K-076 sort-by-sides, K-077 shape patterns, K-078 shape matching, K-079 big/small shapes, K-080 odd shape out (+ G2/G3 geometry faces). Theme `shapes` = sv/da/no "Former", fi "Muodot". So the Nordic "geometriska former arbetsblad" query ALREADY has a landing family on our site. A new `2d-shapes` type is only worth its 66 Nordic landings if its faces are NOT those seven (e.g. shape names written from the picture, shapes in the environment, compose-a-picture-from-shapes, circle/square/triangle/rectangle attribute cards) and its title is distinct: sv **Plana figurer** is taken only by crosswords → safe but thin; better sv **Geometriska former** (the query) with `geometry` kept as "Geometri". da: "Geometri og former" vs "Former og figurer" is a near-duplicate pair → the da panel must rename one.

## 7 `digraphs` - sv sj/tj/ng, no kj/skj/sj, da (see below), fi long vowels/diphthongs

Heads: sv **sj-ljudet**, "tj-ljudet", "ng-ljudet" (A-; owners elevspel, UR "Livet i bokstavslandet", Wordwall) · da **stumme bogstaver**, "lange og korte vokaler" (B; owner Alinea ("stumme bogstaver alinea", "… hæfte")) · no **kj-lyden**, "sj-lyden", "skj-lyden" (A-; owners Salaby, NRK, ordriket) · fi **lyhyt vai pitkä vokaali**, "diftongit" (B; owners Wordwall, papunet unknown).

- **sv.** R1 7 ("sj ljudet arbetsblad", "tj ljudet arbetsblad", "sje ljudet stavning"). R2 31, all on-topic: "sj-ljudet arbetsblad", "ng-ljudet arbetsblad", "ng ljudet åk 2", "ng ljudet övningar", "sj ljudet regler", "tj ljudet stavas oftast med före mjuk vokal", "tj ljudet bokstavslandet", "sj ljudet elevspel". The corrected hyphen spelling quadrupled the yield. Tier A-.
- **da.** R1 29 measured the WRONG concept ("lydrette ord 1 klasse" = our shipped `syllable-reading` da name "Lydrette ord"; "vokaler og konsonanter plakat"). R2 25: "stumme bogstaver opgaver", "stumme bogstaver hæfte", "stumme bogstaver regler", "stumme bogstaver alinea", "lange og korte vokaler", "korte og lange vokaler opgaver", "mit hæfte om lange og korte vokaler", "ikke lydrette ord opgaver". Danish has no "digraph" teaching unit; the nearest K-3 points are silent letters and vowel length. Tier B.
- **no.** R1 19: "kj lyd oppgaver", "kj-lyden oppgaver", "kj lyden oppgaver utskrift", "skj lyd oppgaver", "skj og kj lyden oppgaver", "kj lyd salaby". R2 24: "sj lyden arbeidsark", "sj lyden oppgaver utskrift", "kj og sj lyden oppgaver", "sj lyden ordriket". Tier A-.
- **fi.** R1 13: "diftongit harjoituksia", "diftongit s2", "pitkät ja lyhyet vokaalit", "wordwall pitkät vokaalit". R2 17: "lyhyt ja pitkä vokaali harjoituksia", "lyhyt vai pitkä vokaali", "wordwall lyhyt vai pitkä vokaali". Tier B.
- **Collision (serious):** the shipped `spelling-rules` type (G2-315, `b3-designs/G2-315-spelling-rules.md`) ALREADY covers sv "sj-ljudet · tj-ljudet · ng-ljudet", no "kj-lyden · sj-lyden · ng", fi "pitkä vokaali · diftongit" as its rules, with titles sv "Stavningsregler", no "Rettskriving", fi "Oikeinkirjoitus". Every strong Nordic query above is therefore one our own catalogue already targets. A `digraphs` type ships in sv/no/fi only if it is a DIFFERENT move at a DIFFERENT band (åk 1 sound-to-picture discrimination: "Hör du sj-ljudet?" circle the pictures, no spelling), titled by the sound ("Sj-ljudet", "Kj-lyden", "Lyhyt vai pitkä vokaali") so it does not collide with the rule-named spelling-rules landings; otherwise REFUSE in sv/no/fi. da: "stumme bogstaver" is not in spelling-rules (da ships dobbelt konsonant; stumt h was refused at 9 items) → da may ship "Stumme bogstaver" as its own face set.

## 8 `synonyms`

Heads: sv **synonymer** (B; WINNABLE for "synonymer arbetsblad åk 2"; owners synonymer.se (dictionary, not a worksheet), lektion.se) · da **synonymer** (B; "synonymer 2 klasse", "synonymer dansk opgaver"; owner unknown) · no **synonymer** (A-; "synonymer oppgaver 2 trinn/3 trinn/utskrift"; owners norsksidene, Salaby) · fi **synonyymit** (C+; "synonyymit tehtäviä"; owner unknown).

- **sv.** R1 15: "synonymer arbetsblad", "synonymer arbetsblad åk 2", "synonymer åk 1", "synonymer åk 2", "synonymer och motsatsord" (noise: "synonymer till bra/hån", crosswords). R2 23 adds only question/dictionary strings ("vilket ord betyder samma sak som mamma"). Tier B.
- **da.** R1 24 = R2 24 (same heads): "synonymer 2 klasse", "synonymer dansk opgaver", "synonymer opgaver", "opgaver synonymer og antonymer" (noise "synonymer for smuk/god"). Tier B.
- **no.** R1 22 = R2 22: "synonymer oppgaver", "synonymer oppgaver 2 trinn", "synonymer oppgaver 3 trinn", "synonymer oppgaver utskrift", "synonymer 3 trinn", "synonymer antonymer oppgaver". Tier A-.
- **fi.** R1 14 = R2 14: "synonyymit tehtäviä", "synonyymit ja vastakohdat", "samaa tarkoittavat sanat" (noise: "synonyymit sanalle kaunis"). Tier C+.
- Traps: shipped `opposites` = sv "Motsatsord", da "Modsætninger", no "Motsetninger", fi "Vastakohdat" → "Synonymer och motsatsord" must stay the opposites landing's query; synonyms titles bare **Synonymer / Synonymer / Synonymer / Synonyymit**; sv/da/no share the spelling, so hreflang must be exact (Norwegian "synonymer oppgaver" pages will surface in da). Faces: "ord som betyder samma sak" (match pairs), "byt ut ordet" (replace in sentence), "hitta synonymen" (circle), synonym word ladder, "synonymer med bilder" (K).

## 9 `homophones`

Heads: sv **de och dem** (above band) / "ord som låter lika" (C+) · da **nutids-r** (B-; "nutids-r opgaver", "nutids r øvelser print"; owners grammatip (paid), Alinea) · no **og og å** (B-; "og og å oppgaver", "og og å regel"; owners norsksidene, Salaby) · fi REFUSE.

- **sv.** R1 16: "homofoner exempel/lista/svenska", "ljudlika ord", crossword "bildar ljudlika ord". R2 28: "de och dem regel", "de och dem test", "de och dem skillnad", "ord som låter lika men stavas olika", "ord som låter lika men betyder olika". "de/dem" is åk 4-6 grammar in Lgr22 practice; the K-3 point is "ord som låter lika men stavas olika" (e.g. "hjul/jul", "vart/var" are also above band). Tier C+.
- **da.** R1 15 (homofoner = linguistics lists). R2 25: "nutids-r opgaver", "nutids r øvelser", "nutids r øvelser print", "nutids r regel", "nutids r huskeregel", "ord der lyder ens men staves forskelligt". Nutids-r is 3.-4. klasse (top of band). Tier B-.
- **no.** R1 13; R2 18: "og og å oppgaver", "og og å regel", "og og å i samme setning", "ord som høres like ut". og/å is taught 2.-4. trinn. Tier B-.
- **fi.** R1 2 = R2 2 ("homofonit", "samalta kuulostavat sanat"). Finnish spelling is phonemic; there is no K-3 homophone teaching point. **REFUSE all fi faces.**
- Traps: the Nordic "homophone" type would be three different mini-rules (sv spelling pairs, da nutids-r, no og/å), not one shared genre; each would need its own bank.

## 10 `road-safety` - traffic, signs

Heads: sv **trafik**, "trafikmärken" (A; the largest Nordic cell in the batch; owners NTF (free), Trafikverket, lektion.se, skolmagi) · da **færdselslære**, "færdselstavler" (B; owners Rådet for Sikker Trafik (sikkertrafik.dk, free, the curriculum owner), emu.dk) · no **trafikk for barn**, "trafikkskilt" (B; owners Trygg Trafikk (free, the curriculum owner), NRK Super) · fi **liikenneturvallisuus**, "liikennemerkit" (B+; owners Liikenneturva (free), papunet).

- **sv.** R1 47: "trafik åk 1", "trafik åk 2", "trafik åk 3", "trafik förskoleklass", "tema trafik åk 1", "trafik lektion åk 1", "arbetsblad trafik åk 1", "trafik arbetsblad", "trafikmärken arbetsblad", "trafikmärken åk 1", "trafikmärken förskoleklass", "trafikmärken att skriva ut", "trafikmärken barn", "so trafik åk 1" (noise: Trafiksäkerhetsverket offices, "swish skylt skriva ut", "rallylydnad skyltar"). R2 57: "trafik häfte åk 1", "arbeta med trafik åk 1", "film om trafik åk 1", "enkla trafikregler för barn", "trafikregler för barn", "tema trafik förskoleklass". Tier A.
- **da.** R1 16: "færdselslære indskoling", "færdselslære folkeskolen", "færdselslære fælles mål", "færdselstavler til print", "færdselstavler oversigt pdf". R2 25: "trafik børnehaveklassen", "trafik for børn opgaver", "trafik quiz for børn", "sikker trafik for børn". Tier B (Færdselslære is a compulsory obligatory topic in Fælles Mål → steady demand; Sikker Trafik gives away free material, so "winnable" means long-tail faces, not the head).
- **no.** R1 22: "trafikkskilt oppgaver", "trafikkskilt utskrift", "trafikksikkerhet barnehage" (noise: conferences, plans). R2 30: "trafikk barneskole", "trafikk aktiviteter for barn", "trafikkopplæring trinn 3", "trafikkopplæring trinn 4", "trygg trafikk for barn", "trafikk quiz for barn" ("trafikkopplæring klasse b" = driving licence). Tier B.
- **fi.** R1 23: "liikenneturvallisuus tehtäviä", "liikenneturvallisuus lapsille", "liikennemerkit lapsille", "liikennemerkit tulostettavat", "tulostettavat liikennemerkit lapsille", "liikennemerkit värityskuva", "liikenneturvallisuusviikko materiaali", "liikenneturvallisuusviikko varhaiskasvatus". R2 24 adds "liikennesäännöt lapsille". Tier B+ (a national Liikenneturvallisuusviikko every September drives a seasonal spike).
- Faces: "trafikmärken" (sign → meaning, circle/match), "trafikregler för barn" (safe/unsafe tick), "över gatan" (crossing steps sequence), "reflex och hjälm" (what keeps you safe), "färga trafikljuset". Traps: **signs are NATIONAL** - Swedish yellow warning triangles, Finnish yellow, Danish/Norwegian white-with-red borders; pedestrian-crossing signs differ (sv blue square, no blue square with a triangle); the art must be per-locale or per-convention (Vienna convention shapes are shared, colours are not); theme `vehicles` = sv "Fordon", da "Køretøjer", no "Kjøretøy", fi "Ajoneuvot" → no collision with "Trafik". sv title **Trafik** is too bare (Trafikverket traffic info) → lock **Trafikmärken och trafikregler** or **Trafik i skolan**-style compound; da **Færdselslære**; no **Trafikk for barn** is childish for a title → **Trafikkopplæring**; fi **Liikenneturvallisuus**. fi "liikennemerkit" is plural nominative, correct in a title.

## 11 `maps` - continents, compass points, map symbols

Heads: sv **världsdelar**, "väderstreck", "kartkunskap" (A; owners SO-rummet, lektion.se, UR, Gleerups (paid)) · da **verdensdele**, "verdenshjørner" (C+; no school tail) · no **verdensdeler**, "himmelretninger", "kart og kompass" (B+; owners NRK Super, Salaby paid, DNT for kart og kompass) · fi **maanosat**, "ilmansuunnat", "karttamerkit" (A-; owners Otava/Sanoma (paid), unknown).

- **sv.** R1 31: "världsdelar åk 1", "världsdelar åk 2", "världsdelar åk 3", "världsdelar arbetsblad", "världsdelar skriva ut", "världsdelar och världshav arbetsblad", "världsdelar och världshav åk 2/åk 3", "väderstreck arbetsblad", "väderstreck åk 2", "väderstreck åk 3" (noise: "väderstreck korsord 2/3 bokstäver"). R2 41: "kartkunskap åk 2", "kartkunskap åk 3", "kartkunskap övningar". Tier A (every grade qualifier fires on both heads; Lgr22 SO åk 1-3 names "kartor", "väderstreck").
- **da.** R1 18 = R2 18 (same heads; "kortforståelse" returned nothing): "verdensdele kort", "verdensdele efter størrelse", "verdenshjørner sang", "verdenshjørner leg", "verdenshjørner kompas". No klasse, no opgaver. Tier C+.
- **no.** R1 21: "verdensdeler oppgaver", "verdensdeler navn", "verdensdeler kart", "himmelretninger kart", "himmelretninger kompass", "himmelretninger stor bokstav" (a real spelling question). R2 31: "kart og kompass oppgaver", "kart og kompass leksjon" (DNT courses dominate). Tier B+.
- **fi.** R1 22: "maanosat tehtäviä", "ilmansuunnat tehtäviä", "ilmansuunnat kartalla", "ilmansuunnat suomen kartalla", "maanosat ja valtameret", "maanosat kartta". R2 32: "karttamerkit", "karttamerkit selitykset", "karttamerkit järvi/suo/kivi" (orienteering). Tier A- (both heads carry "tehtäviä").
- Faces: "världsdelar" (label the map), "världsdelar och världshav", "väderstreck" (N/S/E/W on a compass rose), "kartsymboler" (map key), "rita en karta över klassrummet". Traps: sv "väderstreck" vs "vädersymboler" (our shipped weather-symbols sv title) share the stem "väder" - fine but keep them visibly different; the number of continents differs by tradition (sv/no/da school: 7 världsdelar incl. Antarktis; fi school "maanosat" commonly 6 or 7 - the fi panel confirms); compass letters: sv N/S/Ö/V, da/no N/S/Ø/V, fi P/E/I/L (NOT N/S/E/W - the single biggest localisation trap in this batch); no "himmelretninger" are lower-case (demanded question "stor bokstav").

## 12 `family` - family members, family tree

Heads: sv **släktträd**, "min familj" (B+; WINNABLE for "släktträd mall"/"min familj åk 1"; SERP = genealogy sites (Arkiv Digital, MyHeritage) + Pinterest) · da **stamtræ**, "min familie" (B; "stamtræ skabelon til print", "mig og min familie opgaver"; owners genealogy + unknown) · no **slektstre**, "familien min" (B; "slektstre mal", "familien min oppgaver", "familien min undervisningsopplegg"; owners NRK, unknown) · fi **sukupuu**, "minun perheeni" (B-; "sukupuu tulostettava pohja", "minun perheeni tehtävä"; owners Geni/sukututkimus + unknown).

- **sv.** R1 29: "släktträd mall", "släktträd mall gratis", "släktträd att skriva ut", "släktträd att fylla i själv", "min familj åk 1", "family arbetsblad" (noise: Addams, Bridgerton, "familjens jurist", Game of Thrones trees). R2 37: "min familj arbetsblad", "min familj åk 1", "min familj bok"; "släktord" was a bad seed (it means WORD FAMILIES - "släktord till bygga") → struck. Tier B+.
- **da.** R1 25: "stamtræ skabelon", "stamtræ skabelon til print", "stamtræ til print", "familien print", "familien ga 1 klasse" (noise: TV). R2 25: "min familie opgaver", "mig og min familie opgaver". Tier B.
- **no.** R1 22: "slektstre mal", "slektstre utskrift", "slektstre plakat", "familien min oppgaver". R2 21: "familien min barnehage", "familien min undervisningsopplegg". Tier B.
- **fi.** R1 22: "sukupuu pohja", "sukupuu tulostettava", "sukupuu tulostettava pohja", "sukupuun piirtäminen" (noise: "sukupuutto" = EXTINCTION ×6, the head's worst trap). R2 32: "minun perheeni tehtävä", "minun perheeni varhaiskasvatus", "perheenjäsenet suomeksi" (and ×6 foreign-language: "perheenjäsenet ruotsiksi/englanniksi"). Tier B-.
- **Collision:** shipped `all-about-me` face K-343 "All About My Family: Draw and Count" (sv "Det här är jag", da "Alt om mig", no "Alt om meg", fi "Minä itse") already owns "min familj"-intent at K. Faces must go elsewhere: family tree template (the dominant query), family words (mamma/pappa/syster/bror/mormor/farmor - **sv/no/da distinguish mormor vs farmor, morfar vs farfar**, a genuine Nordic teaching point English lacks), "who is older", "draw your family" (refused: K-343 owns it). Sensitivity: a fixed two-parent tree is a known classroom problem in Nordic schools; the template must allow any family shape (blank boxes, not labelled Mamma/Pappa). fi "sukupuu" titles must never be shortened in meta to a form that autocompletes to "sukupuutto".

---

## Closing

### (a) Ranking of the twelve for sv + da + no + fi (round-1 / round-2 unique; school-relevant weight applied, NOT the raw sum)

| rank | candidate | sv r1/r2 | da r1/r2 | no r1/r2 | fi r1/r2 | Nordic tier (sv/da/no/fi) | note |
|---|---|---|---|---|---|---|---|
| 1 | road-safety | 47/57 | 16/25 | 22/30 | 23/24 | A / B / B / B+ | national curricula topic in all four; signs must be per-locale art |
| 2 | maps | 31/41 | 18/18 | 21/31 | 22/32 | A / C+ / B+ / A- | compass letters differ (fi P/E/I/L) |
| 3 | space | 25/39 | 27/37 | 21/31 | 20/31 | A- / A- / B / B- | title "Solsystemet/Aurinkokunta" (theme slug) |
| 4 | 2d-shapes | 44/41 | 32/22 | 26/14 | 15/15 | A / A- / B+ / B | strongest raw demand BUT our `geometry` family already ranks for it |
| 5 | synonyms | 15/23 | 24/24 | 22/22 | 14/14 | B / B / A- / C+ | sv/da/no share the spelling → exact hreflang |
| 6 | family | 29/37 | 25/25 | 22/21 | 22/32 | B+ / B / B / B- | family-tree template intent; K-343 owns "my family"; fi "sukupuutto" trap |
| 7 | life-cycles | 15/30 | 5/14 | 2/12 | 4/11 | A- / C / C / C+ | sv only; collides with `science-sequence` name |
| 8 | digraphs | 7/31 | 29*/25 | 19/24 | 13/17 | A- / B / A- / B | *da r1 measured the wrong concept; sv/no/fi queries already owned by our `spelling-rules` |
| 9 | plants | 15/18 | 17/11 | 11/11 | 20/20 | B / C / C / B- | "blommans delar åk 1", "nimeä kasvin osat" |
| 10 | homophones | 16/28 | 15/25 | 13/18 | 2/2 | C+ / B- / B- / REFUSE | three unrelated Nordic mini-rules; fi has none |
| 11 | materials | 16/25 | 24/21 | 20/18 | 24/3 | B- / C / dead / dead | only sv "magnetism åk 2/3" |
| 12 | colors | 28/30 | 29/23 | 22/20 | 23/24 | C / C / C / C | mother-tongue colour words are pre-K; demand is foreign-language or art |

### (b) Recommended 10 (Nordic vote)

**In:** road-safety · maps · space · synonyms · family · life-cycles · plants · 2d-shapes (conditional) · digraphs (conditional) · homophones (3 locales; fi refused).
**Out:** `colors` (C in all four, theme-slug collision, pre-K content) and `materials` (dead in no/fi, only sv carries it, and G2-348 already claims material sorting).

Conditions we attach, with numbers:
1. **2d-shapes** ranks 4th on demand (sv 44, da 32) but every one of those queries is already the target of our shipped `geometry` family (K-070, K-075-K-080). Ship only with faces that are NOT those seven moves and a title distinct from sv/no "Geometri", da "Geometri og former", fi "Geometria"; otherwise it cannibalises our own ranking pages, and we would rather see `materials` in sv only than 66 cannibal landings.
2. **digraphs** in sv/no/fi collides with shipped `spelling-rules` (sv sj/tj/ng, no kj/sj/ng, fi pitkä vokaali/diftongit). Ship only as an åk-1 LISTENING move titled by the sound ("Sj-ljudet", "Kj-lyden", "Lyhyt vai pitkä vokaali"); da ships "Stumme bogstaver". If the build cannot make that distinction, REFUSE sv/no/fi and count them at zero.
3. **life-cycles** must not be titled "Livscykler/Livscyklus/Livssyklus/Elämänkierto" (our `science-sequence` name); if the build prefers, fold it into `science-sequence` as faces.
4. **homophones**: refuse fi (6 landings); sv at C+ only.

### (c) Honest click estimate per landing per day at maturity (Nordic-scaled: Tier-A winnable 1-3 in sv, 0.5-2 in da/no/fi; B 0.3-1; C <0.3)

| candidate | sv | da | no | fi |
|---|---|---|---|---|
| road-safety | 1.5-3 | 0.3-0.8 | 0.3-0.8 | 0.5-1 (Sept spike) |
| maps | 1.5-3 | 0.1-0.3 | 0.4-1 | 0.5-1.5 |
| space | 1-2.5 | 0.5-1.5 | 0.3-0.8 | 0.2-0.6 |
| 2d-shapes (if distinct) | 0.8-2 | 0.4-1 | 0.3-0.8 | 0.2-0.6 |
| synonyms | 0.5-1 | 0.3-0.8 | 0.5-1.5 | 0.1-0.3 |
| family | 0.5-1.5 | 0.3-0.8 | 0.3-0.8 | 0.2-0.5 |
| life-cycles | 1-2 | <0.2 | <0.2 | 0.1-0.3 |
| digraphs (if distinct) | 0.5-1.5 | 0.3-0.8 | 0.5-1.5 | 0.2-0.6 |
| plants | 0.4-1 | <0.2 | <0.2 | 0.2-0.6 |
| homophones | 0.1-0.3 | 0.3-0.8 | 0.3-0.8 | 0 (refused) |
| materials (out) | 0.3-0.8 | <0.1 | ~0 | ~0 |
| colors (out) | <0.2 | <0.2 | <0.2 | <0.2 |

Per landing, six faces per type per locale. Midpoint arithmetic for the recommended 10: sv ≈ 1.1/landing × 60 ≈ 65/day; da ≈ 0.45 × 60 ≈ 27; no ≈ 0.55 × 60 ≈ 33; fi ≈ 0.4 × 54 ≈ 22. **The four Nordic markets together ≈ 150/day at maturity (range ~90-230)**, i.e. roughly 15% of the 1,000/day batch target. The target must be carried by en/de/es/fr/pt/it; nothing a Nordic panel can do moves that.

### (d) `[NSR-FLAG]` heads we are not fully sure of

- `[NSR-FLAG][sv]` **road-safety title**: "Trafik" alone is the teacher's head ("trafik åk 1") but also Trafikverket/traffic-information intent; we recommend a compound ("Trafikmärken och trafikregler") and put "trafik åk 1" in the meta.
- `[NSR-FLAG][fi]` **how many maanosat**: Finnish school materials vary between 6 and 7 continents; the fi build panel confirms before a label-the-map face is authored.
- `[NSR-FLAG][da]` **2d-shapes vs `geometry` name "Geometri og former"**: a new "Former og figurer" title is a near-duplicate of our own da geometry landing; the da panel must rename one of the two.
- `[NSR-FLAG][da]` **"stumme bogstaver"** as the Danish digraphs substitute is an expert call backed by R2 ("stumme bogstaver opgaver", "… hæfte", "… alinea"); it is a different teaching point from the English digraph.
- `[NSR-FLAG][sv/no/da]` **family tree template**: whether the base prints "mormor/farmor" labels or blank boxes is a school-register/inclusion call for the operator, not an SEO one; the queries ("släktträd mall", "stamtræ skabelon", "slektstre mal") ask for the blank template.
- `[NSR-FLAG][no]` **og/å** as the Norwegian homophone point is measured ("og og å oppgaver", "og og å regel") but is taught 2.-4. trinn, the top of our band.
