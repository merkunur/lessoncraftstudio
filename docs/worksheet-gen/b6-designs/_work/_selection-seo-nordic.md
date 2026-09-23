# nt5-F (b6) selection - NORDIC native-SEO panel (sv lågstadiet · da indskoling · no småskoletrinnet, bokmål · fi alkuopetus) - 2026-09-23

Panel: four native K-3 teacher-SEO experts, one per market. Inputs (facts, read 2026-09-23): `_records/candidate-seeds.json` (3 heads per type, fi/sv/da/no; sink-or-float 2 heads), `_records/harvest-candidates.{sv,da,no,fi}.json` (98 requests per locale, 0 errors, markets sv/se da/dk no/no fi/fi). Every count is `perCandidate.<key>.unique`; every quoted suggestion is verbatim (the harvester lower-cases). Collisions read from `frontend/config/topics-taxonomy.json`, the live corpus `frontend/content/seo-landing/{sv,da,no,fi}.json`, and `scripts/worksheet-gen/i18n/strings.<loc>.json` for the shipped science-sort decks. SERP owners are named only where a suggestion names them; otherwise "unknown".

**Market caveat (applies everywhere).** sv 10.5 M, da 5.9 M, no 5.5 M, fi 5.6 M vs de 84 M. This round is thin: ONE seed round, no re-probe, 14-51 uniques per cell, and in most cells half or more is noise. Tier letters are relative to the market. The Nordic four together cannot carry the 400/day target; see the close.

**Collision fact the whole batch must know.** No science-sort landings exist in any Nordic corpus, but the science-sort DECKS are live (5 variants per locale, self-canonical, in sitemap shards 0/1) with titles that are exactly two of our heads:

| id | sv | da | no | fi |
|---|---|---|---|---|
| G1-204 (sink-or-float) | "Sjunker eller flyter?" | "Synker eller flyder?" | "Synker eller flyter?" | "Uppoaa vai kelluu?" |
| G1-202 (where-animals-live) | "Var bor djuren?" | "Hvor bor dyrene?" | "Hvor bor dyrene?" | "Missä eläimet elävät?" |
| K-203 / G1-207 (food, out of scope) | "Nyttig och onyttig mat" / "De fyra matgrupperna" | "Sund og usund mad" / "De fire madgrupper" | "Sunn og usunn mat" / "De fire matvaregruppene" | "Terveelliset ja epäterveelliset ruoat" / "Neljä ruoka-aineryhmää" |

Recommendation (all four locales): the new `sink-or-float` and `habitats` landings become the canonical surface and the G1-204 / G1-202 decks are repointed to the matching face (the landing-program repoint mechanism, §22.1), or the base title differs from the deck title by the distinguishing element. Two self-canonical pages on "var bor djuren" split one small Nordic query.

Other live neighbours checked (titles, not guessed): `picture-writing` sv "Skriv till bilden", da "Skriv til billedet", no "Skriv til bildet", fi "Kuvasta kirjoittaminen" (owns the "write to the picture" intent); `science-sequence` exercise-type names sv "Ordningsföljd och livscykler", da "Rækkefølge og livscyklusser", no "Rekkefølge og livssykluser", fi "Järjestys ja elämänkierto"; `sentence-building` "Sätt/Sæt/Sett ordene i rækkefølge", `seasons` "Årstidshjulet … i rækkefølge", `earth-and-space` "Månens faser i rækkefølge"; `letter-tracing` sv "Spåra bokstäver", da "Bogstavtræning", no "Bokstavskriving", fi "Kirjainten kirjoittaminen"; `pre-writing` no live title "Løkker, åttetall og spiraler"; `human-body` sv "Kroppens delar"; theme `body_parts` sv "Kroppsdelar"; theme `forest_creatures` sv "Skogsdjur", da "Skovdyr", no "Skogsdyr", fi "Metsän eläimet"; theme `ocean_life` sv "Havsliv", da/no "Havliv", fi "Merielämä"; `animal-fact-file` sv "Faktablad om djur". None of the Nordic corpora has a title with flyta/flyde/flyte/kellua, hygien/hygiejne/hygiene/hygienia, bildserie/billedserie/bildeserie/kuvasarja, skrivstil/løkkeskrift/stavskrift/kaunokirjoitus.

Title mechanics: the engine appends the SEO tail seen in the live corpus (sv "| skriva ut PDF gratis", da "| til print PDF gratis", no "| til utskrift PDF gratis", fi "| tulostettava PDF ilmainen"). "gratis/ilmainen" is ruled SEO-metadata-only; no visible h1, eyebrow, body or sheet string may predicate it.

---

## 1 `cursive-writing` - joined handwriting in the locale's own school script

**Font fact (given, measured by the operator):** Google Fonts OFL Playwrite has NO, DK Loopet, DK Uloopet; no SE, no FI. This decides two of the four locales.

**sv.** Head **skrivstil** (A- for sv; the richest sv cell in this batch after noise). 17 uniques, ~12 on-topic: "skrivstil arbetsblad", "träna skrivstil arbetsblad", "skrivstil övningar", "skrivstil övningar gratis", "skrivstil övningar pdf", "skrivstil övningar pdf gratis", "skrivstil mall att skriva ut", "skrivstil alfabetet", "skrivstil bokstäver", single letters "skrivstil f", "skrivstil i", "skrivstil s". Noise: "skrivstil typsnitt", "skrivstil generator", "skrivstilar" (fonts), "skrivstil engelska" (English cursive or translation). "sammanbunden skrivstil" returned nothing. What sv teachers say: "skrivstil" is the everyday and search word; Lgr22 svenska åk 1-3 says only "att skriva för hand och med digitala verktyg", so skrivstil is a school choice (typically åk 2-3), not a named goal; "sammanbunden skrift" is the didactic-literature term with no search demand. HARD vs WINNABLE: WINNABLE on "skrivstil arbetsblad/övningar pdf" (owners unknown; the tail is PDF-shaped). **Honesty:** there is no single state model, but Swedish teachers recognise a Swedish looped skrivstil (capitals and r, s, z, f differ from Danish and Norwegian models). A page built in Playwrite DK Loopet or NO and titled "skrivstil" puts a foreign letter model in front of a child to copy. **Recommendation: REFUSE sv unless an OFL Swedish skrivstil font is sourced and a native teacher signs off its glyphs** `[NSR-FLAG][sv]`. Cost of refusing: the best sv cell of the batch (see close).
- Faces by demand: (1) skrivstil alfabetet, small letters a-ö [base]; (2) the tricky letters, from the single-letter tails f/s/i; (3) skrivstil bokstäver, capitals; (4) å, ä, ö in skrivstil (Nordic-specific, our tracing families already prove å/ä/ö demand); (5) skriv av ord i skrivstil; (6) mall att skriva ut, blank ruled practice page. Drop any "skrivstil engelska" face.
- Traps: `letter-tracing` "Spåra bokstäver" and `lowercase-letter-tracing` "Spåra små bokstäver" own spåra-intent: never title a face "spåra"; use "skrivstil" + "skriv av/träna".
- Rail (if shipped): **Skrivstil**. Base title: "Skrivstil - alfabetet a till ö".

**da.** Heads **sammenhængende skrift**, **håndskrift**, **skråskrift** (A for da; the best Danish cell in this batch). 37 uniques, ~27 on-topic: "håndskrift 1 klasse", "håndskrift 2. klasse", "håndskrift 3. klasse", "håndskrift opgaver", "håndskrift print", "håndskrift hæfte", "håndskrift øvelser børn", "øve håndskrift opgaver", "sammenhængende skrift opgaver", "sammenhængende skrift print", "sammenhængende skrift hæfte", "sammenhængende skrift alfabet", "sammenhængende skrift øvelser", "skråskrift øvelser pdf", "skråskrift alfabet", "skråskrift bogstaver", "skråskrift store bogstaver", "skråskrift opgaver", single letters "skråskrift i", "skråskrift s". Noise: "håndskrift font/til tekst (app)/typer", "håndskrift krydsord", "… generator", "… engelsk", "håndskrift øvelser voksne". The grade-qualified "håndskrift 1/2/3 klasse" is the strongest school signal anywhere in the Nordic harvest. HARD: bare "håndskrift" (fonts, handwriting-to-text apps). WINNABLE: "sammenhængende skrift opgaver/print", "håndskrift 2. klasse". Honest: Playwrite DK Loopet/Uloopet are Danish school models; Fælles Mål dansk treats håndskrift under fremstilling `[NSR-FLAG][da]` (exact wording to be confirmed by the build panel).
- Faces: (1) sammenhængende skrift alfabet, små bogstaver [base]; (2) store bogstaver ("skråskrift store bogstaver"); (3) æ, ø og å; (4) svære bogstaver (s, i tails); (5) skriv ord af; (6) skriv en sætning af (2.-3. klasse). Loopet vs Uloopet: ship ONE model per page family and name it; a looped/unlooped toggle is not a face anyone searches.
- Traps: `letter-tracing` da "Bogstavtræning", `word-tracing` da "Skriv ordene efter" (never title a face "skriv ordene efter"); "skråskrift" is the older slanted model, keep it in metas, not the rail.
- Rail: **Sammenhængende skrift**. Base title: "Sammenhængende skrift - alfabetet med små bogstaver".

**no.** Heads **løkkeskrift**, **stavskrift**, **sammenhengende skrift** (A- for no). 28 uniques, ~25 on-topic: "løkkeskrift oppgaver", "løkkeskrift utskrift", "løkkeskrift alfabet", "løkkeskrift alfabetet", "løkkeskrift bokstaver", "løkkeskrift store bokstaver", "løkkeskrift norsk", "løkkeskrift s", "stavskrift 3 trinn", "stavskrift oppgaver", "stavskrift øving", "stavskrift alfabet", "stavskrift bokstaver", "stavskrift vs løkkeskrift", "stavskrift løkkeskrift", "sammenhengende skrift oppgaver", "lære sammenhengende skrift", "hva er sammenhengende skrift". Noise: "… font", "… engelsk", "… bok". LK20 norsk names "sammenhengende og funksjonell håndskrift" as a goal after 4. trinn, so the genre is honest and band-true at 3.-4. trinn (our +1 shift). **Model trap:** stavskrift and løkkeskrift are TWO models teachers search separately ("stavskrift vs løkkeskrift"). Playwrite NO follows one of them; the build must identify which from the glyphs and title accordingly `[NSR-FLAG][no]`. Titling a stavskrift page "løkkeskrift" is a wrong-model page.
- Faces: (1) alfabetet, små bokstaver [base]; (2) store bokstaver ("løkkeskrift store bokstaver"); (3) æ, ø og å; (4) vanskelige bokstaver (s tail); (5) skriv av ord; (6) skriv av setninger, 3.-4. trinn ("stavskrift 3 trinn").
- Traps: live `pre-writing` no "Løkker, åttetall og spiraler" shares the stem løkke; keep "løkkeskrift" whole. `letter-tracing` no "Bokstavskriving", `word-tracing` no "Spor ord".
- Rail: **Sammenhengende skrift** (covers both models; the model name goes in the base title). Base title: "Stavskrift - alfabetet med små bokstaver" (or "Løkkeskrift - …" per the font).

**fi.** Head **kaunokirjoitus** (C+; 14 uniques). On-topic: "kaunokirjoitus harjoituksia tulostettava", "kaunokirjoitus tehtäviä", "kaunokirjoitus harjoitus", letters "kaunokirjoitus b/f kirjain/g/k/m/t/pieni z". Noise: "… fontteja", "… onnea" (greeting cards), "… harjoitus aikuisille" (adults). "yhdyskirjaimet" returned nothing. **School fact:** the OPS 2014 core curriculum (in force 2016) ended the obligatory kaunokirjoitus model; schools teach "tekstaus" (print) and a personal fluent "käsiala"; joined writing is left to the school and has no national model and no Finnish Playwrite. The demand that exists is nostalgic, adult and parent (single-letter lookups, "aikuisille"). **Recommendation: REFUSE all 6 fi faces.** A kaunokirjoitus page would teach a model Finnish schools no longer teach, in a font that is not Finnish. Re-probe only to confirm: "käsialakirjoitus", "tekstaus harjoitus", "sidosteinen kirjoitus".

## 2 `story-sequencing` - order picture-story panels and retell

**sv.** Head **bildserie** (C+). 10 uniques, 3 on-topic: "bildserie att skriva till", "bildserier för barn", "bildserier"; the rest is photography ("bildserie iphone/samsung/självutlösare/instagram/åtelkamera", "… engelska"). "berätta i rätt ordning" and "ordningsföljd bilder" returned nothing (productiveSeeds 1). The teacher word exists ("bildserie" is the lågstadiet term for a comic-strip story to order and write to) but the harvest is thin. WINNABLE on "bildserie att skriva till" (owners unknown). Under-probed: "bildberättelse", "först sen sist", "sätt bilderna i rätt ordning", "bildserie förskoleklass", "bildserie åk 1".
- Faces: (1) lägg bildserien i rätt ordning, 3 bilder [base]; (2) 4 bilder, numrera; (3) först, sedan, sist (the word frame); (4) klipp och klistra; (5) berätta muntligt till bildserien (retell, oral); (6) skriv till bildserien. Face 6 collides with `picture-writing` "Skriv till bilden" (3 live sv landings): title it "bildserie att skriva till", never "skriv till bilden".
- Traps: definite "bildserien" (en-word), plural "bildserier"; avoid bare "i rätt ordning" (sentence-building, seasons, days, moon phases, life cycles all own "… i rätt ordning/rækkefølge" titles). Not science: no life-cycle or seed-to-plant panel (science-sequence "Ordningsföljd och livscykler" owns it).
- Rail: **Bildserier**. Base title: "Bildserie - lägg bilderna i rätt ordning och berätta".

**da.** Head **billedserie** (C). 14 uniques, on-topic: "billedserie der viser et forløb" (a Danish didactic phrase, promising), "fortælle historier for børn", "lær at fortælle historier". Noise: "billedserie instagram/iphone/til væg", "ikea billedserie", "damms billedserier" (collectible cards), "ændre rækkefølge billeder facebook", the "fortælle historier i juraen" book. "rækkefølge billeder" = social-media reordering only. Under-probed: "billedfortælling", "først, så, til sidst", "læg billederne i rækkefølge", "billedserie 1. klasse".
- Faces: as sv; da face 3 "først, så, til sidst". Trap: live da titles "Sæt ordene i rækkefølge", "Årstidshjulet - årstiderne i rækkefølge", "Fra frø til plante: læg billederne i rækkefølge" (plants face!) already use "læg billederne i rækkefølge"; a story face with that exact phrase is a same-string cannibal. Retell-writing face vs `picture-writing` da "Skriv til billedet".
- Rail: **Billedserier**. Base title: "Billedserie - fortæl historien i den rigtige rækkefølge".

**no.** Head **bildeserie** (C). 13 uniques, on-topic: "bildeserie 3 bilder" (the classic 3-panel format, a real face). Noise: "bildeserie iphone/mac/stue/vegg", "bildeserie kong harald", "ikea bildeserie", "endre rekkefølge bilder facebook/instagram/iphone". Under-probed: "bildefortelling", "sett bildene i riktig rekkefølge", "fortell til bildene", "bildeserie 1. trinn".
- Faces: (1) bildeserie med 3 bilder [base, matches the one school suggestion]; (2) 4 bilder, nummerer; (3) først, så, til slutt; (4) klipp og lim; (5) fortell muntlig; (6) skriv til bildeserien (vs `picture-writing` "Skriv til bildet").
- Traps: definite "bildeserien", plural "bildeserier"; live "Sett ordene i riktig rekkefølge", "Årstidshjulet - årstidene i rekkefølge", "Planetene i rekkefølge": keep "bildeserie" as the lead noun.
- Rail: **Bildeserier**. Base title: "Bildeserie med 3 bilder - sett i riktig rekkefølge og fortell".

**fi.** Heads **kuvasarja**, **kuvakertomus** (B- for fi; the only Nordic locale where the school intent is visible). 11 uniques, 5 on-topic: "kuvasarja kerronta", "kuvasarja tarinan kirjoittamiseen", "kuvasarjasta kirjoittaminen", "kuvasarjan tekeminen", "mikä on kuvakertomus". Noise: "kuvasarja android/iphone/samsung/valokuvaus/englanniksi". "tarina oikeaan järjestykseen" returned nothing. WINNABLE: "kuvasarja tarinan kirjoittamiseen" (owners unknown).
- Faces: (1) järjestä kuvasarja, 3 kuvaa [base]; (2) 4 kuvaa, numeroi; (3) ensin, sitten, lopuksi; (4) leikkaa ja liimaa (trap: `cutting-practice` fi "Leikkaa ja liimaa" is a live type NAME; say "leikkaa kuvat" instead); (5) kerro kuvasarjasta (kerronta, oral); (6) kirjoita tarina kuvasarjasta (vs `picture-writing` "Kuvasta kirjoittaminen": use elative "kuvasarjasta", distinct lemma).
- Case traps: nominative "kuvasarja", partitive "kuvasarjaa", elative "kuvasarjasta"; "järjestykseen" (illative) is the natural title form, "järjestyksessä" (inessive) is what the live moon/planet titles use.
- Rail: **Kuvasarjat**. Base title: "Kuvasarja - järjestä kuvat ja kerro tarina".

## 3 `healthy-habits` - hygiene, sleep, exercise, routines (NOT food)

**sv.** Heads **hygien**, **tvätta händerna** (C+/B-). 31 uniques, ~9 on-topic: "arbetsblad hygien", "tvätta händerna barn", "tvätta händerna bild", "tvätta händerna bildstöd", "tvätta händerna poster", "tvätta händerna skylt", "tvätta händerna sång". Noise: "hygienartiklar", "hygienkörkort", "hygiensats peltor …", "hygienshoppen", "hygienstol", "hygienunderlägg", all of "hälsa och livsstil" (university programmes, Halmstad, Falköping, a book), "tvätta händerna med salt/utan vatten/utedass". "hälsa och livsstil" is a dead seed for K-3. "bildstöd" is a telling suggestion: visual step-cards for förskoleklass and special needs, a real printable genre. Under-probed: "borsta tänderna barn", "sömn barn", "goda vanor", "nysa i armvecket", "dagsschema bildstöd", "rörelse för barn".
- Faces by demand: (1) tvätta händerna steg för steg (bildstöd) [strongest]; (2) hygien, arbetsblad: ringa in det som håller oss friska [base]; (3) borsta tänderna; (4) nysa och hosta i armvecket; (5) sömn och vila; (6) min dag, morgon- och kvällsrutin. Rörelse/exercise folds into 2 or 6; there is no sv exercise tail.
- Traps: theme `body_parts` "Kroppsdelar", `human-body` "Kroppens delar": no body-part labelling face; food is `K-203` "Nyttig och onyttig mat" (never a food face). Face 1 is a sequence: title it by the habit, not "i rätt ordning" (story-sequencing and science-sequence).
- Rail: **Hygien och goda vanor**. Base title: "Hygien - goda vanor som håller oss friska".

**da.** Heads **hygiejne**, **vaske hænder** (C+). 31 uniques, ~10 on-topic: "hygiejne opgaver", "hygiejne krydsord", "hygiejneuge", "vaske hænder børn", "vaske hænder billeder", "vaske hænder plakat", "vaske hænder plakat børn", "vaske hænder tegning", "vaske hænder guide", "vaske hænder sang (tekst)". Noise: all of "sundhed" (sundhed.dk, Sundhedsstyrelsen, sundhedskort, sundhedsforsikring), "hygiejnebevis/-kursus/-bind/-forordningen/-vejledningen". "sundhed" is a dead head. "hygiejne krydsord" suggests a crossword face (we have a crossword app, not a printable family; a word-search style face is the printable equivalent).
- Faces: (1) vask hænder trin for trin, plakat [strongest]; (2) hygiejne opgaver: sæt ring om det sunde valg [base]; (3) børst tænder; (4) nys i ærmet; (5) søvn og hvile; (6) min dag, morgen og aften.
- Traps: food = K-203 "Sund og usund mad" ("sund" is the food word here: do not title a habits page "sunde vaner … mad"); `human-body` "Kroppens dele".
- Rail: **Hygiejne og gode vaner**. Base title: "Hygiejne for børn - gode vaner der holder os raske".

**no.** Heads **hygiene**, **vaske hender** (C+). 51 uniques, ~11 on-topic: "hygiene oppgaver", "hygiene kryssord", "vaske hender barn", "vaske hender bilde", "vaske hender illustrasjon", "vaske hender plakat", "vaske hender plakat barn", "vaske hender tegning", "vaske hender sang". Noise: "helse" (Helsenorge, Helsedirektoratet, helsestasjon), "hygienesett peltor …", "vaske hender med zalo". Two traps in the tail: 16 "mat og helse …trinn" strings (a school SUBJECT about food and cooking, out of scope and the food exclusion) and "psykisk helse 3.trinn/4.trinn" (mental health, not habits). Do not title with "helse".
- Faces: (1) vask hendene steg for steg, plakat; (2) hygiene oppgaver: gode og dårlige vaner [base]; (3) puss tennene; (4) nys i albuen; (5) søvn og hvile; (6) dagen min, morgen og kveld.
- Traps: "mat og helse" must not appear anywhere (food scope + subject collision); `human-body` "Kroppen vår".
- Rail: **Hygiene og gode vaner**. Base title: "Hygiene for barn - gode vaner som holder oss friske".

**fi.** Heads **hygienia**, **käsienpesu** (C). 38 uniques, 1 school: "hygienia tehtäviä lapsille". Noise: "hygieniapassi …" (food-handler licence ×4), "käsienpesuallas …" (sinks ×7), "käsienpesuneste/-öljy", and all of "terveystieto" (a yläkoulu/lukio subject: "terveystieto 7/8/9 lk tehtäviä", "terveystieto yo koe 2026"), above band. K-3 health content sits in ympäristöoppi. Under-probed: "hampaiden pesu lapset", "hyvät elintavat", "terveelliset elämäntavat alakoulu", "uni ja lepo", "käsienpesu kuvat".
- Faces: (1) käsienpesu vaihe vaiheelta; (2) hygienia: terveelliset tavat [base]; (3) hampaiden pesu; (4) yski hihaan; (5) uni ja lepo; (6) minun päiväni, aamu ja ilta.
- Traps: never "terveystieto" in a title (above band, exam intent); "tavat" alone reads as manners, say "elintavat"/"terveelliset tavat"; food = K-203.
- Rail: **Hygienia ja terveelliset elintavat**. Base title: "Hygienia lapsille - terveelliset elintavat".

## 4 `habitats` - where animals live / animal homes

**sv.** Head **var bor djuren** (B- for sv, but it is a live deck title). 13 uniques, 3 on-topic: "var bor djuren", "var bor djuren på vintern", "var bor djuren bok". Noise: all 10 of "djur och natur" (the retail chain Djur&Natur: Falköping, Skara, Lidköping, kampanjblad). "djurens livsmiljöer" returned nothing (dead seed: correct term, no demand). **"var bor djuren på vintern" is the telling suggestion:** a genuinely Nordic face (ide, bo, gryt, under isen, flyttar söderut) that no other locale's batch will have. Collision: G1-202 decks "Var bor djuren?" ×5 live (see top). Under-probed: "djurens bon", "djurens hem", "djur på vintern åk 1", "djur i skogen åk 1".
- Faces: (1) var bor djuren: para ihop djuret med dess hem [base]; (2) var bor djuren på vintern; (3) djurens bon (bo, ide, lya, kupa, myrstack); (4) skog, hav eller sjö; (5) vem bor här? (home to animal, the reverse); (6) rita ett djurhem. Land/vatten/luft stays G1-202's face.
- Traps: theme `forest_creatures` "Skogsdjur", `ocean_life` "Havsliv": a face titled "Skogsdjur" or "Havsliv" is a theme-slug cannibal; say "djur i skogen". `animal-fact-file` "Faktablad om djur". Definite plural "djuren" (not *djurna). "Djur och natur" never in a title (a chain store).
- Rail: **Var bor djuren**. Base title: "Var bor djuren? Para ihop djuret med dess hem" (and repoint G1-202).

**da.** Head **hvor bor dyrene** (C+). 15 uniques, on-topic: "hvor bor dyrene", "hvor bor dyrene om vinteren", "børn dyr og natur", "bøger om dyr og natur"; "hvor bor dyrene spil/spill" is a board game. Noise: "dyr og natur" (Enghave park, jeopardy, uddannelser, vindmøller), "dyr naturgummi". "dyrs levesteder" returned only itself. Under-probed: "dyrenes boliger", "dyr om vinteren indskoling", "dyr i skoven 1. klasse".
- Faces: as sv; face 2 "hvor bor dyrene om vinteren"; face 3 "dyrenes boliger" (rede, hule, bo, bistade).
- Traps: G1-202 deck "Hvor bor dyrene?"; theme `forest_creatures` "Skovdyr", `ocean_life` "Havliv"; "dyrene" definite plural.
- Rail: **Hvor bor dyrene**. Base title: "Hvor bor dyrene? Sæt dyret sammen med dets hjem".

**no.** Head **hvor bor dyrene** (C+). 14 uniques, on-topic: "hvor bor dyrene", "hvor bor dyrene om vinteren", "fakta om dyr og natur", "spørsmål om dyr og natur", "dyr og natur quiz". Noise: "folkehøgskole dyr og natur", "dyrnaturligvis", "børn dyr og natur" (Danish leak), "hvor bor dyrene spil/spill" (game). "dyrs leveområder" returned only itself.
- Faces: as sv; face 2 "hvor bor dyrene om vinteren"; face 3 "dyrenes hjem" (reir, hi, maurtue, bikube).
- Traps: G1-202 deck "Hvor bor dyrene?" (no and da share the spelling: hreflang must be exact); themes "Skogsdyr", "Havliv"; `animal-fact-file` "Faktaark om dyr".
- Rail: **Hvor bor dyrene**. Base title: "Hvor bor dyrene? Finn dyrets hjem".

**fi.** Heads **missä eläimet asuvat**, **eläinten kodit** (C). 11 uniques, 2 on-topic: "missä eläimet asuvat", "eläinten kodit". Noise and a trap: 9 of 11 are "kodittomien eläinten …" (HOMELESS animals: SOS ry, turvakoti, päivä 2025/2026). "eläinten elinympäristöt" returned nothing. Under-probed and likely the real fi head: "eläinten talvehtiminen" (a fixed ympäristöoppi topic), "eläinten pesät", "missä eläimet asuvat talvella".
- Faces: (1) missä eläimet asuvat: yhdistä eläin ja koti [base]; (2) eläinten talvehtiminen (miten eläimet talvehtivat); (3) eläinten pesät; (4) metsässä, meressä vai järvessä; (5) kuka asuu täällä?; (6) piirrä eläimen koti.
- Traps: G1-202 fi is "Missä eläimet elävät?" (elävät, not asuvat): the new title with "asuvat" is distinct, keep it; never "eläinten kodit" alone in a title (homeless-animal SERP); theme `forest_creatures` "Metsän eläimet", `ocean_life` "Merielämä".
- Rail: **Missä eläimet asuvat**. Base title: "Missä eläimet asuvat? Yhdistä eläin ja sen koti".

## 5 `sink-or-float` - predict, test, record

**sv.** Heads **flyta eller sjunka**, **flyter eller sjunker** (B- for sv). 14 uniques, 5 on-topic: "flyta eller sjunka förskola", "flyter eller sjunker experiment", "varför flyter eller sjunker saker", "nta flyta eller sjunka" (NTA = the paid school science-kit programme, an owner), "flyta eller sjunka film". Noise: eggs ×6 ("flyter eller sjunker ägg/färska ägg/gamla ägg/dåliga ägg"), stool ×2 ("… bajs", "varför flyter eller sjunker bajs"). WINNABLE on "flyta eller sjunka experiment/förskoleklass"; the head SERP is mixed with egg-freshness and stool, so the title MUST carry a school word.
- Faces: (1) gissa först: flyter eller sjunker? (predict) [base]; (2) testa och pricka av (record chart: gissning / resultat); (3) sortera: flyter eller sjunker (drawn line to two tubs, overlaps G1-204: keep only if G1-204 repoints here); (4) varför flyter saker? (material, form: båt av lera); (5) mitt experiment, rita och skriv; (6) ägg i saltvatten (the only honest egg face, framed as an experiment, never freshness).
- Traps: G1-204 deck "Sjunker eller flyter?"; the infinitive "Flyta eller sjunka" is the search form, the deck uses present tense: distinct strings but one intent, repoint. Every claim which object floats comes from a hand-read claim table (nt10-E lesson), per material.
- Rail: **Flyta eller sjunka**. Base title: "Flyta eller sjunka - gissa, testa och rita".

**da.** Heads **flyde eller synke**, **flyder eller synker** (dead for school). 16 uniques, 0 on-topic: eggs ×9 ("skal æg flyde eller synke i vand", "friske/gode/dårlige æg"), stool ×3 ("afføring flyde eller synke"), "skal pølser/blåbær flyde eller synke" (cooking), "flyder eller synker en appelsin" (a classic experiment question, the one near-school string).
- The genre is honest (flyde og synke is a standard natur/teknologi experiment in indskoling); the search demand is not there. Ship with an experiment word in every title; expect near zero.
- Rail: **Flyde eller synke**. Base title: "Flyder eller synker? Gæt, afprøv og tegn - forsøg".
- Traps: G1-204 deck "Synker eller flyder?"; "afføring" SERP.

**no.** Heads **flyte eller synke**, **flyter eller synker** (dead for school). 14 uniques, 0 on-topic: eggs ×11, stool ×2. Genre honest (naturfag 1.-2. trinn, "forsøk"); demand none measured.
- Rail: **Flyte eller synke**. Base title: "Flyter eller synker? Gjett, test og tegn - forsøk".
- Traps: G1-204 deck "Synker eller flyter?" (no/da share "flyter/synker" forms partly: hreflang exact).

**fi.** Head **kelluuko vai uppoaako** (dead). 2 uniques: the head and "… kananmuna" (egg). "kellua ja upota" returned nothing. Genre honest (ympäristöoppi 1.-2. lk "kelluminen", "kokeile ja tutki"). Under-probed: "kelluminen tehtävä", "kelluu vai uppoaa koe", "kelluvat ja uppoavat esineet".
- Rail: **Kelluuko vai uppoaako**. Base title: "Kelluuko vai uppoaako? Arvaa, kokeile ja merkitse".
- Traps: G1-204 fi "Uppoaa vai kelluu?" (reversed order, statement form): the question-particle form is the search form and distinct; still one intent, repoint.

---

## Closing

### (a) Harvest summary (unique / on-topic after netting noise; one round, 98 requests per locale)

| type | sv | da | no | fi | Nordic tier (sv/da/no/fi) |
|---|---|---|---|---|---|
| cursive-writing | 17 / ~12 | 37 / ~27 | 28 / ~25 | 14 / ~9 (adult/parent) | A- (REFUSE) / A / A- / REFUSE |
| habitats | 13 / 3 | 15 / ~4 | 14 / ~5 | 11 / 2 | B- / C+ / C+ / C |
| healthy-habits | 31 / ~9 | 31 / ~10 | 51 / ~11 | 38 / 1 | C+ / C+ / C+ / C |
| story-sequencing | 10 / 3 | 14 / ~3 | 13 / 1 | 11 / 5 | C+ / C / C / B- |
| sink-or-float | 14 / 5 | 16 / ~1 | 14 / 0 | 2 / 0 | B- / dead / dead / dead |

Nordic demand ranking: **1 cursive-writing** (da/no strongest school tails of the batch, sv strong but no honest font) · **2 habitats** (sv/da/no "på vintern / om vinteren" face; cannibal with G1-202 unless repointed) · **3 healthy-habits** (handwashing poster/bildstöd carries it) · **4 story-sequencing** (fi only visible school intent) · **5 sink-or-float** (sv only; da/no/fi eggs and stool).

### (b) Click estimate at 9-15-month maturity (clicks per landing per day; 6 landings per type per locale)

| type | sv | da | no | fi |
|---|---|---|---|---|
| cursive-writing | 1-2.5 if shipped (refused: 0) | 0.8-2 | 0.5-1.5 | 0 (refused) |
| habitats | 0.4-1 | 0.2-0.5 | 0.2-0.5 | 0.1-0.3 |
| healthy-habits | 0.2-0.6 | 0.2-0.5 | 0.2-0.5 | 0.1-0.3 |
| story-sequencing | 0.1-0.3 | 0.1-0.3 | 0.1-0.4 | 0.2-0.5 |
| sink-or-float | 0.3-0.8 | <0.1 | <0.1 | <0.1 |

Per type, four locales, x6 landings (low / mid / high):
- cursive-writing, sv refused (recommended): da 4.8/8.4/12 + no 3/6/9 = **7.8 / 14.4 / 21**. If a Swedish font is found: +6/10.5/15 = 13.8 / 24.9 / 36.
- habitats: (0.4+0.2+0.2+0.1)x6 = **5.4 / 9.6 / 13.8** (sv share assumes G1-202 is repointed; unrepointed, halve sv).
- healthy-habits: **4.2 / 7.8 / 11.4**.
- story-sequencing: **3.0 / 6.0 / 9.0**.
- sink-or-float: sv 1.8/3.3/4.8 + da/no/fi ~0-0.6 each = **1.8 / 4.2 / 6.6**.

**Nordic total ≈ 42/day mid (range ~22-62), with sv cursive refused; ≈ 52/day mid if a Swedish skrivstil font is sourced.** That is ~10-13% of the 400/day target from 36% of the landings (120 of 330). Caveat: one thin seed round, no re-probe, no SERP-owner audit; a Nordic landing typically needs the full 9-15 months, and the first 2-3 months are near zero. The target has to be carried by en/de/es/fr/pt/it.

### (c) Refusals, drops, adds

- **REFUSE `cursive-writing` fi (6 faces):** no school model since OPS 2014 took effect in 2016, no Finnish font; demand is adult/nostalgic.
- **REFUSE `cursive-writing` sv (6 faces) unless** an OFL Swedish skrivstil font is sourced and a native teacher signs off its glyphs; never render Playwrite DK/NO under the word "skrivstil".
- **`cursive-writing` no:** ship only under the model name the font actually is (stavskrift or løkkeskrift); verify before titling.
- **`sink-or-float` da/no/fi:** NOT refused (the genre is honest school science) but expect ~0; titles must carry "forsøg / forsøk / kokeile" to leave the egg and stool SERP. Drop the sort face (3) everywhere unless G1-204 repoints.
- **Drop** any food face in healthy-habits (K-203/G1-207 own it; no "mat og helse", "sund … mad"); any land/water/air face in habitats (G1-202); any life-cycle or seed-to-plant panel in story-sequencing (science-sequence, plants).
- **Add** habitats "på vintern / om vinteren / talvehtiminen" as a Nordic face (sv/da/no measured, fi under-probed); healthy-habits "bildstöd / plakat" step-card face; story-sequencing "3 bilder" as the base panel count (no measured).
- **Repoint** G1-204 and G1-202 decks (5 variants x 4 Nordic locales each) to the new sink-or-float and habitats faces, or accept two self-canonical pages per query.

### (d) Re-probe list (do not fetch now; seeds for a round 2)

sv: "skrivstil åk 2", "skrivstil åk 3", "bildberättelse", "först sen sist", "bildserie åk 1", "borsta tänderna barn", "nysa i armvecket", "goda vanor barn", "djurens bon", "djur på vintern åk 1", "flyta eller sjunka åk 1". da: "formskrift", "løkkeskrift", "billedfortælling", "først så til sidst", "børste tænder børn", "gode vaner børn", "dyrenes boliger", "dyr om vinteren", "flyde synke forsøg". no: "håndskrift oppgaver", "skrivehefte", "bildefortelling", "sett bildene i riktig rekkefølge", "pusse tenner barn", "gode vaner barn", "dyr om vinteren", "flyte synke forsøk". fi: "tekstaus harjoitus", "käsialakirjoitus", "kuvakertomus tehtävä", "kuvat järjestykseen", "hampaiden pesu lapset", "terveelliset elintavat alakoulu", "eläinten talvehtiminen", "eläinten pesät", "kelluminen tehtävä".

### (e) `[NSR-FLAG]`

- `[NSR-FLAG][sv]` whether any OFL font renders an acceptable Swedish skrivstil; until then sv cursive is refused.
- `[NSR-FLAG][no]` which Norwegian model Playwrite NO is (stavskrift vs løkkeskrift); the title follows the glyphs.
- `[NSR-FLAG][da]` exact Fælles Mål wording for håndskrift, and whether DK Loopet or Uloopet is the default page model.
- `[NSR-FLAG][fi]` the refusal rests on OPS 2014 removing the joined-script model; the fi build panel confirms before anyone overrides it.
- `[NSR-FLAG][all]` sink-or-float claim table: which everyday objects float is a judgment per object (and per material), hand-read, never inferred.
