# nt10-E (b5) selection: Germanic native-SEO panel (en US/international · de Grundschule · nl basisschool) - 2026-09-23

Sources read: `b4-designs/_work/_selection-seo-germanic.md` (format), `b4-designs/_STUDIO-BRIEF.md` (house rules), `b5-designs/_records/candidate-seeds.json`, `_records/harvest-candidates.{en,de,nl}.json` (Google autocomplete, 14 seed requests per candidate per locale; `unique` = distinct suggestions), `_records/harvest-candidates-summary.md`, `frontend/config/topics-taxonomy.json` (`axes.theme` slugs + `axes['exercise-type']` keys, slugs, names), `scripts/worksheet-gen/types/**` (anti-duplication), `scripts/worksheet-gen/i18n/strings.{en,de,nl}.json` (existing sheet titles). Every quoted string below is verbatim from the harvest; "net" is my hand count after dropping the strings listed as discarded (the drop lists were produced with a per-candidate noise filter and then read by hand).

Method notes the reader must know:
- **The harvest client sat behind a Swedish IP again.** Location noise in all three locales ("moon phases stockholm", "verkehrszeichen schweden wohnmobil", "verkeersborden zweden", "familie coppens zweden", "plantagen växjö"). Nets remove it.
- **Grade ceiling noise is removed from net** (en grade 4-8 / class 5-10 / KS3 / 11 plus; de Klasse 4-10; nl groep 6-8), because those strings are real school demand but above our K-3 band.
- `productiveSeeds` (of 14) is the second signal. A head whose seeds mostly return nothing is not a head teachers type (de `materials` 3/14, de `digraphs` 3/14).
- nl autocomplete is thin across the board (max 92 here); rank nl candidates against each other, never against en/de raw numbers.
- Tier: A = a genre a teacher searches by name every week · B = real, regular · C = fringe · dead = no native genre in that locale (as seeded). SERP owners from market knowledge; "unknown" where I would be guessing.
- Worksheet-word the engine appends (never in the title): en "worksheet(s)" · de "Arbeitsblatt" · nl "werkblad".
- Picture availability notes are a crude key grep of `REFERENCE TRANSLATIONS/image-vocabulary.js` (hit / no hit on the bare English key). **UNKNOWN - engineer must measure** the real pool per theme.

### Collision register (measured, applies to several candidates)

| head we might want | collides with | where | consequence |
|---|---|---|---|
| en colors / de Farben / nl kleuren | THEME slug `colors` = `colors / farben / kleuren` | `axes.theme.colors` | bare head forbidden in all three; compound head mandatory |
| en shapes / de Formen / nl vormen | THEME slug `shapes` = `shapes / formen / vormen` | `axes.theme.shapes` | bare head forbidden; use "2D Shapes" / "Geometrische Formen" / "Vlakke figuren" |
| en space / de Weltraum / nl ruimte | THEME slug `space` = `space / weltraum / ruimte` | `axes.theme.space` | bare head forbidden; use "Solar System" / "Planeten" / "Zonnestelsel" |
| parts of a flower / Blumen / bloemen | THEME slug `flowers` = `flowers / blumen / bloemen` | `axes.theme.flowers` | "Parts of a Flower" is a legal compound face; "Blumen"/"bloemen" alone is not |
| trees / Bäume / bomen | THEME slug `tree` = `trees / baume / bomen` | `axes.theme.tree` | "Family Tree" / "Stammbaum" / "stamboom" do not collide (different slug) |
| Life Cycles / Lebenszyklen / levenscyclus | EXERCISE-TYPE `science-sequence`, name en "Sequencing & Life Cycles", de slug `reihenfolge-und-lebenszyklen`, nl slug `volgorde-en-levenscyclus`; base G1-203 "The Life Cycle of a Chicken" / "Der Lebenszyklus des Huhns" / "De levenscyclus van een kip" | taxonomy + `types/g1/G1-203` | a new `life-cycles` family name would echo an existing family name in all three locales; heads must be species-compound ("Butterfly Life Cycle") |
| Geometry / Geometrie / Meetkunde | EXERCISE-TYPE `geometry` + K-070 "Shape Hunt"/"Formenjagd"/"Vormen zoeken", K-075, K-076, K-077, K-078 "Shape Twins", K-079, K-080, G2-234, G2-241 "Shape Sorter", G2-244 "Flat or Solid?", K-265 colour-by-shape-code | `types/k`, `types/g2` | SKILL overlap is heavy; but no existing landing TITLE uses the search head ("2d shapes", "geometrische Formen", "vlakke figuren"), so the query head is free. Faces must avoid find/sort/match/count-sides/flat-vs-solid |
| Antonyms / Gegenteile / tegenstellingen | EXERCISE-TYPE `opposites` (G1-307, G1-337 "Opposite or the Same?" already uses a near-synonym distractor) | taxonomy | a synonyms type must never carry "and antonyms"/"Gegenteile"/"tegenstellingen" in a title |
| en sh ch th / de sch ch ei au / nl ui ei ou | G1-311 "Sound of the Week: {L}" / "Laut der Woche" / "Klank van de week" fans over two-letter units | `types/g1/G1-311` | digraph faces must own the SORT / read / spell moves, not "the sound of the week" |
| nl ei/ij, au/ou | `spelling-rules` G2-315/G2-324 nl units ei/ij 44, au/ou 25 | `b3-designs/G2-315` table | nl homophone head "ei ij" is already owned |
| read the colour word, colour it | `read-and-color` G1-242 "Read and Color" / "Lesen und Malen" / "Lees en kleur" | `types/g1` | a colour-words face that says "read and colour" is a duplicate |
| kleuren op code / nummer | `color-by-number` nl name "Kleuren op code" | taxonomy | 27 nl `colors` strings are this family, not ours |
| my family (draw and count) | K-343 "All About My Family" / "Meine Familie: Zeichnen und zählen" / "Mijn gezin: teken en tel" | `types/k` | family faces must not be "draw your family" |
| compass / north | G2-279 `grid-coordinates` + faces (letter-number squares, no compass words) | `types/g2` | no head collision; a compass-grid face must not become a coordinates sheet |

---

## 1 `road-safety` - traffic safety and road signs

Heads: en **traffic signs** (US) / **road safety** (UK/AU/IN) (B+; Twinkl, Education.com, TPT, Indian CBSE sites; "traffic signs worksheets for kindergarten" WINNABLE) · de **Verkehrserziehung** / **Verkehrszeichen** (A; Frau Locke, Zaubereinmaleins, eduki, Grundschulkönig, ADAC/DVR; "Verkehrszeichen Grundschule Klasse 2 Arbeitsblatt" WINNABLE) · nl **Verkeer** / **Verkeersborden** (A; VVN Veilig Verkeer Nederland, Wijzer in verkeer, Schooltv, jufmilou; "werkblad verkeersborden groep 4" WINNABLE).

**en**
- Head: **traffic signs** (primary for a US printable; "traffic signs worksheets for kindergarten", "traffic signs printable for kids"); **road safety** (secondary; "road safety worksheets for grade 1", "road safety rules for kindergarten"). Face heads: **traffic lights** ("traffic lights worksheets", "traffic lights kindergarten"), **safety signs** ("safety signs worksheets for kids").
- Demand: unique 104, 12/14; net 92. Telling: "road safety worksheets for grade 1", "road safety worksheets for grade 2", "road safety worksheets for grade 3", "road safety worksheets for kindergarten", "road safety worksheets pdf free download", "traffic signs worksheets for kindergarten", "traffic signs printables for preschoolers", "road signs grade 1", "street signs worksheets", "traffic signal worksheets", "write three road safety rules". Discarded: "road safety recruitment portal 2026", "road safety portal", "traffic signs in pakistan", "traffic signs in the philippines", "traffic signs sweden", "traffic signs manual", "road safety week", "orange traffic signs mean", "traffic signs test". Tail reveals: K to grade 3 dense, "pdf free download", a poster/bingo/flashcard fringe; "road safety" skews India/Philippines/UK (the "class 3" phrasing), "traffic signs" is the US phrase.
- Tier B+ (US teachers use it as a K safety unit, not weekly; India/UK volume lifts it). SERP: WINNABLE-to-HARD (Twinkl, Education.com, TPT, Pinterest, Indian school portals); no K5-style incumbent. WINNABLE: "traffic signs worksheets for kindergarten", "road safety worksheets for grade 1 pdf", "traffic light worksheet kindergarten".
- Faces (query faces, the pedagogy panel builds them): (1) Traffic Signs: match the sign to its meaning (base) · (2) Traffic Lights: red, yellow, green, what do you do · (3) Safe or Unsafe? circle the safe picture · (4) Road Safety Rules: finish the rule (word bank) · (5) Sort the signs by shape and colour (stop, warning, information) · (6) Crossing the Road step order.
- Traps: **signs are national** (US MUTCD octagon STOP, yellow diamond warning; UK/IE triangle) - the en base must pick US signs and say so, an internationally ambiguous sign is a wrong answer for someone; "traffic lights" (US "traffic light", "traffic signal" both appear, title "Traffic Lights"); `vehicles` theme is a neighbour, not a collision; no sign pictures in the vocab (grep: no `traffic`/`stop`/`sign` key) = a new palette-only sign primitive, and sign colours (red, yellow, blue) fall outside the token palette - a ruling for the design phase, not me.

**de**
- Head: **Verkehrserziehung** (primary; the Sachunterricht unit name, "verkehrserziehung klasse 1 arbeitsblätter kostenlos", "verkehrserziehung grundschule arbeitsblätter"); **Verkehrszeichen** (secondary and the best face head; "verkehrszeichen grundschule arbeitsblatt", "verkehrszeichen zum ausdrucken für kinder").
- Demand: unique 103, 13/14; net 90. Telling: "verkehrserziehung klasse 1 arbeitsblätter kostenlos", "verkehrserziehung klasse 2 arbeitsblätter kostenlos", "verkehrserziehung klasse 3 arbeitsblätter kostenlos", "verkehrserziehung kindergarten material kostenlos", "arbeitsblatt verkehrserziehung vorschule", "verkehrserziehung ampel arbeitsblatt", "verkehrszeichen grundschule klasse 1", "verkehrszeichen grundschule 2 klasse", "test verkehrszeichen klasse 2", "verkehrszeichen zum ausdrucken mit bedeutung", "symmetrie verkehrszeichen arbeitsblatt", "verkehrserziehung klasse 1 frau locke", "verkehrserziehung klasse 1 zaubereinmaleins", "verkehrserziehung klasse 2 eduki". Discarded: "verkehrszeichen schweden wohnmobil" (and 3 more schweden), "verkehrszeichen 365-62", "verkehrserziehungskurs", "verkehrszeichen deutschland", the Klasse 4 / Fahrradprüfung strings (5). Tail reveals: Vorschule to Klasse 3 all dense (every grade word productive), "kostenlos" on 6 strings, Ampel as a sub-genre, "mit Bedeutung" (sign = meaning, a one-answer task), owners typed by name.
- Tier A. SERP: HARD at "verkehrserziehung grundschule" (Frau Locke, Zaubereinmaleins, eduki, Grundschulkönig, ADAC/DVR/Verkehrswacht); WINNABLE at "verkehrszeichen grundschule klasse 2 arbeitsblatt", "verkehrserziehung ampel arbeitsblatt", "verkehrszeichen mit bedeutung zum ausdrucken".
- Faces: (1) Verkehrszeichen und ihre Bedeutung (base) · (2) Die Ampel: Was tust du bei Rot, Gelb, Grün? · (3) Sicher oder gefährlich? · (4) Verkehrsregeln für Fußgänger · (5) Verkehrszeichen nach Form sortieren (Gebot, Verbot, Gefahr) · (6) Sicher über die Straße: Reihenfolge.
- Traps: StVO signs (Zebrastreifen sign = blue square with a walker; "Achtung Kinder" triangle); "Fußgängerampel" vs "Ampel" (children learn the two-light pedestrian light first); nouns capital; never "Fahrradprüfung" (Klasse 4, above band); engine appends Arbeitsblatt.

**nl**
- Head: **Verkeer** as a school head only with a groep word ("verkeer groep 3 werkblad", "verkeer werkblad groep 4"); **Verkeersborden** (primary title; "verkeersborden werkblad", "werkblad verkeersborden groep 4", "verkeersborden kleuters").
- Demand: unique 92, 13/14; net 73. Telling: "werkblad verkeer kleuters", "werkblad verkeer groep 3", "verkeer groep 4 werkblad", "verkeer werkblad groep 5", "werkblad verkeersborden groep 3", "werkblad verkeersborden groep 4", "werkblad verkeersborden groep 5", "verkeersborden kleuters", "verkeersborden oefenen groep 4", "soorten verkeersborden werkblad", "veilig verkeer groep 4", "thema verkeer groep 3", "woordzoeker verkeer groep 3". Discarded: "verkeersboetes zweden", "verkeersbord eland zweden", "verkeersregels zweden", "verkeersborden belgie", "verkeersinformatie", "verkeerscentrum", "verkeersongeval", groep 6-8 lines (6). Tail reveals: kleuters to groep 5 on BOTH heads, "werkblad" typed on 20+ strings (the strongest nl werkblad signal in this batch), "soorten verkeersborden" (the sort face), "Veilig Verkeer" (VVN, the national method owner).
- Tier A (the best nl candidate of the twelve by a margin). SERP: VVN (vvn.nl lesmateriaal), Wijzer in verkeer, Schooltv, jufmilou, kleuteridee (thema verkeer), juf-maike; WINNABLE for "werkblad verkeersborden groep 4", "soorten verkeersborden werkblad".
- Faces: (1) Verkeersborden: wat betekent dit bord? (base) · (2) Het stoplicht: rood, oranje, groen · (3) Veilig of niet veilig? · (4) Verkeersregels: vul in · (5) Soorten verkeersborden sorteren (gebod, verbod, waarschuwing) · (6) Veilig oversteken: de goede volgorde.
- Traps: RVV signs (haaientanden, "oranje" not "geel" for the middle light - a real colour word difference from en/de); "het bord / de borden", "het stoplicht"; Belgian signs differ in details, the nl base is NL; engine appends "werkblad".

---

## 2 `family` - family members and the family tree

Heads: en **family members** / **family tree** (A; ESL-heavy; Education.com, Twinkl, iSLCollective, Liveworksheets, TPT; "family tree template for 1st grade" WINNABLE) · de **Familie** (Sachunterricht Klasse 1-2) / **Stammbaum** (A-; eduki, Grundschulkönig, Zaubereinmaleins, Wordwall; "Stammbaum Vorlage zum Ausdrucken Grundschule" WINNABLE) · nl **Familie** / **Stamboom** (+ the K word **gezin**) (B; kleuteridee, jufmilou, Schooltv; "stamboom werkblad groep 4" WINNABLE, thin).

**en**
- Head: **family members** (primary for a worksheet: "family members worksheet for kindergarten pdf", "family members worksheet grade 3"); **family tree** (secondary and a strong template face: "family tree template for 1st grade", "family tree printable template for kids").
- Demand: unique 126, 14/14; net 107. Telling: "family members worksheets for kindergarten", "family members worksheet 2nd grade", "family members grade 1 worksheet", "family members preschool worksheets", "family members printable flashcards", "family tree worksheets for grade 1", "family tree kindergarten worksheet", "family tree printable template for kids", "family tree printable 4 members", "family tree template 2nd grade", "types of family for grade 2", "what is a family for grade 3". Discarded: "family member printable rental agreement template", "family membership certificate", "family tree app/builder/creator/maker/dna", "family tree targaryen", "family tree house of the dragon", "family tree grade 3 makabansa" (PH DepEd), "family members in french/spanish/swedish", "family members worksheets esl" (4 ESL strings: real worksheet demand but adult/ESL register, kept out of net).
- Tier A (ESL doubles the head volume; the K-3 line alone is B+). SERP: HARD at "family members worksheets" (iSLCollective, Liveworksheets, ESL Printables, Twinkl, Education.com); WINNABLE at "family tree template for 1st grade", "family tree printable 4 members", "types of family worksheet grade 2".
- Faces: (1) Family Members: match the word to the picture (base) · (2) Family Tree template (open, grandparents / parents / me) · (3) Who is who? relationship riddles ("my mom's mom is my ...") · (4) Types of Families · (5) Family members word search-free spelling (write the word) · (6) How many in the family? (count and write).
- Traps: K-343 "All About My Family: Draw and Count" owns draw-and-count, so face 6 is only legal if it is not a drawing page; a family-tree template has no single answer (open-ended, no verify(), allowed by the brief); vocab: `mother`, `father`, `baby` hit, `grandma` no bare hit (may be `grandmother`, UNKNOWN - engineer must measure); inclusive framing (types of families) is a copy decision; US spelling "mom".

**de**
- Head: **Familie** (primary with a school word: "familie arbeitsblatt grundschule", "familie grundschule klasse 1", "thema familie klasse 1"); **Stammbaum** (secondary; "stammbaum grundschule arbeitsblatt", "stammbaum vorlage zum ausdrucken 3 generationen", "mein stammbaum grundschule").
- Demand: unique 106, 14/14; net 69. Telling: "familie arbeitsblatt 1 klasse", "familie arbeitsblatt kindergarten", "familie grundschule sachunterricht", "familie sachunterricht klasse 1", "meine familie klasse 1", "meine familie klasse 2", "unterrichtseinheit familie klasse 2", "familie ethik klasse 2", "eduki familie klasse 1", "stammbaum klasse 1", "stammbaum klasse 2", "stammbaum 3 klasse", "grundschule stammbaum vorlage für kinder", "stammbaum vorlage zum ausdrucken 3 generationen", "stammbaum zeichnen grundschule". Discarded: Familienkasse ×2, Familienversicherung, Familienfilme, Familienkost, family names (Bundschuh, Ritter, Wallenberg), Haushaltsplan/Essensplan/Wochenplan/Monatsplaner (6, household printables), "stammbaum targaryen/house of the dragon/donald duck/schwedische königsfamilie", Stammbaum der Wirbeltiere / Evolution / Stammbaumanalyse (biology), DaF/DaZ/A1/Englisch lines (8).
- Tier A- (a Sachunterricht Klasse 1-2 unit plus a Klasse 2-3 Stammbaum template; not weekly). SERP: eduki, Grundschulkönig, Zaubereinmaleins, Frau Locke, Wordwall; WINNABLE at "stammbaum vorlage grundschule zum ausdrucken", "familie sachunterricht klasse 1 arbeitsblatt".
- Faces: (1) Meine Familie: Wer gehört dazu? (base, word-to-picture) · (2) Stammbaum-Vorlage: 3 Generationen · (3) Verwandtschaft: Wer ist wer? (Oma, Onkel, Cousine) · (4) Familien sind verschieden · (5) Familienwörter richtig schreiben · (6) Wie viele sind in der Familie?
- Traps: "Meine Familie" is the K-343 de title prefix ("Meine Familie: Zeichnen und zählen") - the new base must not start with "Meine Familie"; use "Familie" / "Familienmitglieder"; "Verwandtschaft" is the Klasse 2-3 word (re-probe "verwandtschaft grundschule arbeitsblatt", "verwandtschaftsbeziehungen grundschule"); "Cousin/Cousine" gendered pair; engine appends Arbeitsblatt.

**nl**
- Head: **Stamboom** (primary for a printable: "stamboom werkblad", "stamboom invullen werkblad", "werkblad stamboom leeg", "stamboom groep 3/4/5"); **Familie** (secondary; "familie werkblad", "mijn familie werkblad", "thema familie groep 3"). ⚠ The K word for the nuclear family is **gezin** (K-343 nl is "Mijn gezin: teken en tel").
- Demand: unique 59, 13/14; net 34. Telling: "stamboom groep 3", "stamboom groep 4", "stamboom groep 5", "stamboom kleuters", "stamboom maken groep 4", "stamboom invullen werkblad", "werkblad stamboom maken", "werkblad familie kleuters", "mijn familie werkblad", "thema familie groep 3", "werkboekje familie groep 3", "woordkaarten familie kleuters". Discarded: Familie Flodder/Tokkie/Coppens/Over de kook, familiehypotheek, familienet, familieopstelling(en), Heilige Familie kleuterschool ×3 (school names), Aldfaer/MyHeritage, "stamboom zoeken" ×3, stamboomonderzoek, targaryen/house of the dragon, NT2.
- Tier B. SERP: kleuteridee, jufmilou, juf-maike, Schooltv, digibordonderbouw; WINNABLE for "stamboom werkblad groep 4", "werkblad familie kleuters", thin volume.
- Faces: (1) Mijn familie: wie hoort erbij? (base) · (2) Stamboom invullen (leeg, drie generaties) · (3) Wie is wie? (opa, tante, neef) · (4) Alle gezinnen zijn anders · (5) Familiewoorden schrijven · (6) Hoeveel zijn er in het gezin?
- Traps: **"neef"/"nicht" mean BOTH cousin and nephew/niece** - a one-answer relationship riddle is unbuildable with them unless the frame disambiguates (panel must rule); "familie" (extended) vs "gezin" (household); re-probe "gezinsleden werkblad", "mijn gezin kleuters werkblad"; engine appends "werkblad".

---

## 3 `maps` - continents and oceans, compass directions, map skills

Heads: en **continents and oceans** / **map skills** (A; Education.com, K5, Super Teacher, TPT, National Geographic Kids; "continents and oceans worksheet for 2nd grade" WINNABLE) · de **Himmelsrichtungen** (A at Klasse 3) / **Kontinente** (A-; Grundschulkönig, Ideenreise, Zaubereinmaleins, grundschule-arbeitsblaetter; "Himmelsrichtungen Arbeitsblatt Klasse 3 PDF kostenlos" WINNABLE) · nl **Werelddelen** / **Windrichtingen** (C in K-3; the measured tail is groep 6+ geography).

**en**
- Head: **continents and oceans** (primary; 55 of 97 strings); **map skills** (secondary; grade 2-3 social studies: "map skills 2nd grade worksheets", "3rd grade map skills worksheets pdf").
- Demand: unique 97, 14/14; net 86. Telling: "continents and oceans worksheet for kindergarten", "continents and oceans worksheet 1st grade", "continents and oceans worksheet for grade 2", "continents and oceans worksheet for 3rd grade pdf", "continents and oceans map blank", "continents and oceans without names", "continents and oceans quiz printable free", "continents and oceans puzzle printable", "map skills kindergarten worksheets", "map skills 1st grade worksheets", "free printable map skills worksheets for 2nd grade", "map skills anchor chart 3rd grade". Discarded: "map skills class 6/7/9/10", "map skills worksheets ks3", "middle school", grade 4-7 lines (11). Tail reveals: K to grade 3 on both heads, "blank"/"without names" (label-the-map face), "quiz printable" (answer-key face), "worksheet answers".
- Tier A. SERP: HARD (Education.com, K5 Learning, Super Teacher Worksheets, Twinkl, TPT, Nat Geo Kids); WINNABLE: "continents and oceans map blank printable", "label the continents and oceans worksheet 2nd grade", "compass rose worksheet 1st grade" (unmeasured, re-probe "compass rose worksheet", "cardinal directions worksheet").
- Faces: (1) Continents and Oceans: label the map (base) · (2) Cardinal Directions: north, south, east, west on a compass rose · (3) Map Symbols and Keys (read a map key) · (4) Which continent? animal/landmark to continent · (5) Oceans only · (6) Directions on a simple town map (go 2 north).
- Traps: seed "compass directions" / "cardinal directions" / "compass rose" was NOT harvested - **re-probe en** ("cardinal directions worksheet", "compass rose worksheet kindergarten", "map key worksheet"); a world map is a new primitive (vocab has `globe`, `map`, `compass` keys only); continent count 7 is US convention; face 6 must not become a G2-279 grid-coordinates sheet (no letter-number squares).

**de**
- Head: **Himmelsrichtungen** (primary; Klasse 3 HSU/Sachunterricht, 40 of 84 strings); **Kontinente** (secondary; "kontinente arbeitsblatt grundschule", "7 kontinente zum ausdrucken").
- Demand: unique 84, 13/14; net 67. Telling: "arbeitsblatt himmelsrichtungen 3 klasse pdf kostenlos", "himmelsrichtungen klasse 3 arbeitsblätter", "himmelsrichtungen 2. klasse", "einführung himmelsrichtungen klasse 3", "klassenarbeit himmelsrichtungen klasse 3", "windrose himmelsrichtungen grundschule", "himmelsrichtungen grundschule ideenreise", "hsu himmelsrichtungen 3 klasse", "kontinente grundschule arbeitsblätter kostenlos", "kontinente klasse 1", "kontinente klasse 2", "kontinente und ozeane 3 klasse", "arbeitsblatt kontinente und ozeane beschriften kostenlos", "kontinente umrisse zum ausdrucken din a4", "weltkarte kontinente zum ausdrucken". Discarded: Himmelsrichtungen auf Russisch/Englisch/Französisch/Spanisch/Türkisch (5, language learning), "google maps", "anzeigen", "spruch", Klasse 4-5 lines (5), "kontinente nach größe", "kontinente wie viele", "kontinente länder".
- Tier A (Himmelsrichtungen at Klasse 3 is a weekly Sachunterricht genre). SERP: Grundschulkönig, Ideenreise (typed by name), Zaubereinmaleins, grundschule-arbeitsblaetter.de, Sachunterricht-Portal; WINNABLE at "himmelsrichtungen arbeitsblatt klasse 3 pdf kostenlos", "kontinente und ozeane beschriften arbeitsblatt".
- Faces: (1) Himmelsrichtungen: Norden, Osten, Süden, Westen (base, Windrose) · (2) Kontinente und Ozeane beschriften · (3) Kartenzeichen und Legende · (4) Welcher Kontinent? Tiere und Bauwerke zuordnen · (5) Merksatz "Nie Ohne Seife Waschen" (order the directions) · (6) Wege auf dem Plan beschreiben.
- Traps: de Klasse 3 is the band centre (Klasse 2 = 1 string), label the base "Klasse 2/3" honestly; "Windrose" is the apparatus word; 7 Kontinente (de convention, Antarktis included); nouns capital; engine appends Arbeitsblatt.

**nl**
- Head: **Werelddelen** (primary; "werelddelen werkblad", "werelddelen oefenen", "werelddelen kaart met namen"); **Windrichtingen** (secondary; "windrichtingen werkblad", "windrichtingen kaart").
- Demand: unique 25, 6/14; net 14. Telling: "werelddelen werkblad", "werelddelen oefenen", "werelddelen printen", "werelddelen kaart met namen", "werelddelen kleuters", "werelddelen en oceanen", "windrichtingen werkblad", "windrichtingen kaart". Discarded: windrichtingen België/Frankrijk/Nederland/Engels/Frans/vandaag/zeilen/met hoofdletter, "werkblad windrichtingen groep 6", "werelddelen hoeveel", "werelddelen en continenten verschil".
- Tier C in K-3 (topografie is groep 5-8; only "werelddelen kleuters" is below). SERP: Junior Einstein (topo), Squla, Topografie.nl; unknown at groep 4.
- Faces: (1) Werelddelen en oceanen benoemen (base) · (2) Windrichtingen: noord, oost, zuid, west · (3) Kaartsymbolen en legenda · (4) Welk werelddeel? · (5) De oceanen · (6) Route op een plattegrond.
- Traps: **the werelddelen count is contested in nl** ("werelddelen en continenten verschil" is literally in the tail): nl schools teach 6 werelddelen (Amerika as one, or Oceanië named Australië) while continents = 7 - a label-the-map answer key differs from en/de and the panel must rule; "noord/oost/zuid/west" lowercase; re-probe "windroos werkblad groep 4", "plattegrond lezen groep 4"; engine appends "werkblad".

---

## 4 `space` - the solar system, planets, moon phases

Heads: en **solar system** / **moon phases** (A; NASA Space Place, Education.com, Twinkl, TPT, Pinterest; "solar system worksheets for kindergarten pdf" WINNABLE) · de **Planeten** / **Mondphasen** (A- at Klasse 1-3; Ideenreise, Grundschulkönig, eduki, Zaubereinmaleins; "Planeten Arbeitsblatt Grundschule" WINNABLE) · nl **Zonnestelsel** (C; kleuteridee, Schooltv, Junior Einstein; thin).

**en**
- Head: **solar system** (primary; "solar system worksheets for kindergarten pdf", "solar system 1st grade worksheets", "solar system grade 3 worksheets with answers"); **moon phases** (secondary face head, grade 1-3: "moon phases 1st grade worksheet", "moon phases 2nd grade worksheet", "moon phases worksheet answer key").
- Demand: unique 126, 14/14; net 107. Telling: "solar system worksheets for kindergarten", "solar system worksheets for preschoolers", "solar system 2nd grade worksheets", "solar system 3rd grade worksheets", "solar system planets in order", "solar system printable planets", "moon phases kindergarten worksheet", "moon phases grade 3 science worksheet", "moon phases printable pdf free download", "phases of the moon first grade", "2nd grade solar system questions". Discarded: moon phases now/today/2026/June 2026/Stockholm/Sweden/blox fruits, calendar 2026, "solar system snap/snapchat/stockholm/sweden/3d/to scale/map", grade 4-6 lines (4).
- Tier A. SERP: HARD (NASA Space Place, Education.com, Twinkl, TPT, Super Teacher, Pinterest); WINNABLE: "planets in order worksheet kindergarten", "moon phases worksheet 1st grade with answer key", "solar system worksheet grade 3 with answers".
- Faces: (1) Solar System: name the planets (base, label) · (2) Planets in Order from the Sun · (3) Moon Phases: name the phase · (4) Moon Phases in order · (5) Day and Night / Sun, Earth, Moon (one-answer riddles) · (6) Planet facts: biggest, hottest, has rings.
- Traps: THEME slug `space` - never "Space" bare; K-208 `day-night` (science-sort) owns day/night sort, face 5 must be a different move; vocab `planet`, `moon`, `sun`, `earth`, `rocket` hit, individual planets UNKNOWN - a planet primitive is likely (8 labelled circles are palette-drawable); moon-phase names differ by locale (waxing crescent / zunehmende Sichel / wassende maan).

**de**
- Head: **Planeten** (primary; "planeten arbeitsblatt grundschule", "planeten grundschule klasse 2", "planeten sonnensystem 3 klasse"); **Mondphasen** (secondary; "mondphasen grundschule arbeitsblatt", "mondphasen 2 klasse", "mondphasen 3 klasse").
- Demand: unique 84, 13/14; net 57. Telling: "arbeitsblatt planeten 1 klasse", "arbeitsblatt planeten 3 klasse", "arbeitsblatt planeten vorschule", "planeten arbeitsblatt kindergarten", "planeten grundschule klasse 1", "thema planeten 2 klasse", "test planeten 3 klasse", "klassenarbeit planeten klasse 3", "planeten reihenfolge", "planeten merksatz", "planeten grundschule ideenreise", "mondphasen erklären grundschule", "mondphasen arbeitsblatt lösungen", "mondphasen grundschule arbeitsblatt". Discarded: Mondphasen-Kalender ×7 and dated lines 2025-2027 (the largest noise block), "heute", Klasse 4-7/Physik/Klett lines (7), Planetengetriebe, planeten snap/snapchat, planetenstände heute, planetenname.
- Tier A- (Planeten Klasse 1-3 real; Mondphasen is really Klasse 4-6 with a thin Klasse 2-3 line). SERP: Ideenreise, Grundschulkönig, eduki, Zaubereinmaleins, Planet Schule (SWR); WINNABLE at "planeten reihenfolge arbeitsblatt grundschule", "planeten merksatz arbeitsblatt".
- Faces: (1) Die Planeten unseres Sonnensystems (base) · (2) Planeten in der richtigen Reihenfolge (Merksatz "Mein Vater erklärt mir jeden Sonntag unseren Nachthimmel") · (3) Mondphasen benennen (Neumond, zunehmender Mond, Vollmond, abnehmender Mond) · (4) Mondphasen ordnen · (5) Sonne, Erde, Mond · (6) Planeten-Steckbrief (größter, heißester).
- Traps: "Sonnensystem" (not "Solarsystem"); nouns capital; the Mondphasen face should say Klasse 3 honestly; "Weltraum" = THEME slug, never in a title; engine appends Arbeitsblatt.

**nl**
- Head: **Zonnestelsel** (primary; "werkblad zonnestelsel", "zonnestelsel groep 3", "zonnestelsel kleuters"); **Maanfasen** (secondary; "maanfasen werkblad").
- Demand: unique 28, 8/14; net 12. Telling: "werkblad zonnestelsel", "zonnestelsel groep 3", "zonnestelsel kleuters", "zonnestelsel knutselen kleuters", "planeten zonnestelsel printen", "zonnestelsel printen", "spreekbeurt zonnestelsel groep 5", "maanfasen werkblad", "maanfasen uitleg". Discarded: maanfasen 2025-2027/juli 2026/spiritueel/tattoo ×2/nederlands, zonnestelsel snap/snapchat ×3/lego/model/op schaal/engels, zonnestelsels.
- Tier C (kleuters thema ruimte is real but it is a theme, not a werkblad genre). SERP: kleuteridee (thema ruimte), Schooltv, Junior Einstein; unknown.
- Faces: (1) De planeten van het zonnestelsel (base) · (2) Planeten op volgorde · (3) Maanfasen benoemen · (4) Maanfasen op volgorde · (5) Zon, aarde en maan · (6) Planeten-weetjes.
- Traps: "ruimte" = THEME slug; "het zonnestelsel"; re-probe "planeten werkblad groep 4", "thema ruimte kleuters werkblad"; engine appends "werkblad".

---

## 5 `synonyms` - words that mean the same (de: the Wortfeld)

Heads: en **synonyms** (A; K5, Education.com, Super Teacher, Twinkl, Liveworksheets; "synonyms worksheets for grade 1 with answers pdf" WINNABLE) · de **Wortfeld** (A at Klasse 2-3; grundschule-arbeitsblaetter, Grundschulkönig, eduki, Zaubereinmaleins; "Wortfeld sagen Klasse 2 Arbeitsblatt" WINNABLE) / **Synonyme** (secondary) · nl **Synoniemen** (B-; Junior Einstein, Squla, taal-oefenen; "werkblad synoniemen groep 4" WINNABLE, thin).

**en**
- Head: **synonyms** (primary; 60 strings); "synonyms and antonyms" (40 strings) is the bigger combined head but antonyms belong to `opposites`.
- Demand: unique 122, 14/14; net 102. Telling: "synonyms worksheets for grade 1", "synonyms 1st grade worksheets", "synonyms worksheets for grade 2", "synonyms worksheets for grade 3 with answers", "synonyms worksheet for kindergarten pdf", "synonyms grade 1 worksheet with answers pdf", "synonyms 2nd grade list", "synonyms for second graders", "printable synonyms flashcards with pictures", "synonyms bingo printable", "wordwall synonyms 1st grade". Discarded: "synonyms for good/great/happy/sad/beautiful/amazing/excited/gazebo" (thesaurus lookups, 9), "thesaurus.com", "dictionary", "of freedom", "11 plus", grade 4-7 lines (8).
- Tier A. SERP: HARD (K5 Learning, Education.com, Super Teacher, Twinkl, Liveworksheets, Quizizz); WINNABLE: "synonyms worksheet grade 1 with answers pdf", "synonyms with pictures kindergarten", "synonyms list 2nd grade printable".
- Faces: (1) Synonyms: match the words that mean the same (base) · (2) Choose the synonym in the sentence · (3) Synonym pairs with pictures (big/large) · (4) Replace the overused word ("said", "nice") · (5) Shades of meaning (warm, hot, boiling; L.K.5.d / L.1.5.d) · (6) Synonym word ladder.
- Traps: **"Synonyms and Antonyms" in any title collides with `opposites`** (and G1-337 already runs a near-synonym distractor), so the type owns synonyms alone; one correct answer needs a curated lexicon (the picture vocab stores nouns only, and noun synonyms are rare), UNKNOWN pool; "shades of meaning" is a real CCSS face head (re-probe "shades of meaning worksheet 1st grade").

**de**
- Head: **Wortfeld** (primary: the Grundschule genre name, 49 strings: "wortfeld sagen", "wortfeld gehen", "wortfelder klasse 2 einführung"); **Synonyme** (secondary; "synonyme grundschule übungen", "synonyme 2 klasse", "synonyme 3 klasse").
- Demand: unique 76, 10/14; net 68. Telling: "wortfeld sagen klasse 2", "wortfeld sagen klasse 3", "wortfeld sagen arbeitsblatt pdf", "wortfeld gehen klasse 2", "wortfeld gehen arbeitsblatt pdf", "arbeitsblatt wortfeld sehen", "arbeitsblatt wortfeld machen", "wortfeld essen", "wortfelder grundschule verben", "wortfelder 3 klasse übungen kostenlos", "arbeitsblatt wortfelder klasse 2", "synonyme finden grundschule", "synonyme 2 klasse", "synonyme gehen grundschule", "adjektive synonyme arbeitsblatt". Discarded: "synonyme für döner/geld/saufen/gut/schön" (lookups), "woxikon", "synonymer" (sv), "6 klasse".
- Tier A (the Wortfeld is taught every year Klasse 2-4; each verb is its own query: sagen, gehen, sehen, machen, essen). SERP: grundschule-arbeitsblaetter.de, Grundschulkönig, eduki, Zaubereinmaleins, Materialguru; HARD at "wortfeld", WINNABLE at "wortfeld sagen klasse 2 arbeitsblatt", "wortfeld gehen arbeitsblatt pdf", "wortfeld sehen arbeitsblatt".
- Faces: THE FACES ARE THE VERBS (a strong, real per-query fan): (1) Wortfeld "sagen" (base) · (2) Wortfeld "gehen" · (3) Wortfeld "sehen" · (4) Wortfeld "machen" / "essen" · (5) Synonyme finden (Adjektive: groß, riesig) · (6) Treffende Verben einsetzen (Lückentext).
- Traps: a Wortfeld is NOT strictly synonymy (flüstern/schreien are both "sagen" but not interchangeable) - the one-answer task must be "which word fits the sentence", authored per sentence; this suggests a `unitAxis` over the head verb (the b4 fan mechanism), which is a design call; "Wortfeld" noun capital, the verb in quotes lowercase; never "Gegenteile" (opposites family); engine appends Arbeitsblatt. en/nl have no Wortfeld equivalent head, so the de faces are a native re-target, not a translation.

**nl**
- Head: **Synoniemen** (primary; "synoniemen werkblad", "werkblad synoniemen groep 4", "synoniemen groep 3"); "woorden met dezelfde betekenis" is a definition query, not a werkblad head.
- Demand: unique 31, 7/14; net 18. Telling: "synoniemen groep 3", "synoniemen groep 4", "synoniemen groep 5", "synoniemen kleuters", "synoniemen voorbeelden groep 4", "werkblad synoniemen groep 4", "werkblad synoniemen groep 5", "synoniemen werkblad". Discarded: "synoniemen engels", "voor poepen/leuk", "mooi", "net", synoniemenwoordenboek, the 7 "woorden met dezelfde betekenis" definition lookups, "werkblad synoniemen en tegenstellingen" (kept as signal but it is the opposites collision).
- Tier B- (groep 4-5). SERP: Junior Einstein, Squla, taal-oefenen.nl, Muiswerk; WINNABLE for "werkblad synoniemen groep 4".
- Faces: (1) Synoniemen: welke woorden betekenen hetzelfde? (base) · (2) Kies het synoniem in de zin · (3) Synoniemen met plaatjes · (4) Vervang het woord "zeggen" · (5) Groot, groter, reusachtig (nuances) · (6) Synoniemenladder.
- Traps: "tegenstellingen" = the `opposites` nl name, never in a title; "het synoniem / de synoniemen"; engine appends "werkblad".

---

## 6 `plants` - parts of a plant, what a plant needs, growing

Heads: en **parts of a plant** (A; Education.com, K5, Twinkl, TPT, Super Teacher; "parts of a plant worksheet kindergarten pdf" WINNABLE) / **plant life cycle** · de **Teile der Pflanze** / **Pflanzen Sachunterricht** (B; Grundschulkönig, eduki, Ideenreise; re-probe needed) · nl **Delen van een plant** (C; thin).

**en**
- Head: **parts of a plant** (primary; 65 strings); **plant life cycle** (secondary; 55 strings); face head **parts of a flower** (13 strings).
- Demand: unique 133, 14/14; net 131 (only "plant cell" and "alternation of generation" dropped: the cleanest head in the batch). Telling: "parts of a plant worksheet kindergarten pdf", "parts of a plant worksheet 1st grade pdf", "parts of a plant worksheets for grade 2", "parts of a plant grade 3 science worksheet", "parts of a plant worksheet with answers", "parts of a plant and their functions", "parts of a flower worksheets for kindergarten", "parts of a tree worksheets for kindergarten", "plant life cycle worksheet grade 1 pdf", "plant life cycle worksheet with answers", "free printable plant life cycle worksheets for kindergarten". Tail reveals: every grade K-3 productive, "pdf" and "with answers", "diagram" (label face), "and their functions" (function face), "parts of a tree" (a second object).
- Tier A. SERP: HARD (Education.com, K5, Twinkl, TPT, Super Teacher, Pinterest); WINNABLE: "parts of a plant worksheet kindergarten pdf", "parts of a plant and their functions worksheet grade 2", "parts of a flower worksheet kindergarten".
- Faces: (1) Parts of a Plant: label the diagram (base) · (2) Parts of a Plant and Their Functions · (3) Parts of a Flower (label) · (4) What Plants Need to Grow (sun, water, soil, air) · (5) Plant Life Cycle in order (seed, sprout, plant, flower) · (6) Which part do we eat? (carrot = root).
- Traps: THEME slug `flowers` - "Parts of a Flower" is legal as a compound, "Flowers" bare is not; face 5 "Plant Life Cycle" overlaps candidate `life-cycles` and `science-sequence` - assign it to ONE type; vocab: `flower`, `leaf` hit, `root`, `seed`, `sprout` no bare hit = a plant diagram primitive (palette-drawable).

**de**
- Head: **Teile der Pflanze** / "Teile einer Pflanze" (primary for the label face: "teile der pflanze grundschule", "teile einer pflanze arbeitsblatt"); **Pflanzen** with a school word (secondary: "pflanzen grundschule arbeitsblätter", "pflanzen sachunterricht klasse 2").
- Demand: unique 61, 10/14; net 37. Telling: "teile der pflanze grundschule", "teile einer pflanze arbeitsblatt", "aufbau pflanzen arbeitsblatt", "pflanzen arbeitsblatt grundschule", "pflanzen grundschule klasse 2", "pflanzen sachunterricht klasse 2", "pflanzen sachunterricht klasse 3", "sachunterricht pflanzen 1 klasse", "pflanzen der wiese 1 klasse", "frühblüher pflanzen grundschule", "bohnen pflanzen klasse 1", "kresse pflanzen klasse 1", "welche teile der pflanze essen wir". Discarded: Klasse 5-6, Pflanzen- und Tierzelle, Pflanzenzelle, Pflanzenkohle, Kölle/online kaufen, "pflanzen schweden", Ashwagandha/Mariendistel, Pflanzenbestimmungs-App, "erkennen online kostenlos" ×2, C4, Stempel/Sticker/Deckblatt/Schablonen/Feedback/Bewertung.
- Tier B (the real de genres are narrower names). **Re-probe de** with native heads: "aufbau einer pflanze arbeitsblatt", "frühblüher arbeitsblatt grundschule", "bohne keimen arbeitsblatt", "was brauchen pflanzen zum wachsen grundschule", "blüte aufbau grundschule". SERP: Grundschulkönig, eduki, Ideenreise, Sachunterricht-Portal; WINNABLE at "teile der pflanze arbeitsblatt grundschule", "welche teile der pflanze essen wir arbeitsblatt".
- Faces: (1) Die Teile der Pflanze (Wurzel, Stängel, Blatt, Blüte) (base) · (2) Wozu braucht die Pflanze ihre Teile? · (3) Aufbau der Blüte · (4) Was Pflanzen zum Wachsen brauchen · (5) Von der Bohne zur Pflanze (Keimung, in order) · (6) Welche Pflanzenteile essen wir?
- Traps: "Stängel" (post-reform spelling, not "Stengel"); "Teile der Pflanze" vs "Pflanzenteile" (both typed, title "Pflanzenteile" risks a thin head, keep "Teile der Pflanze"); "Blumen" = THEME slug; engine appends Arbeitsblatt.

**nl**
- Head: **Delen van een plant** (primary; "delen van een plant werkblad", "delen van een plant benoemen").
- Demand: unique 22, 5/14; net 8. Telling: "delen van een plant werkblad", "delen van een plant benoemen", "eetbare delen van een plant", "levenscyclus plant kleuters", "welke delen van een plant gebruikt de mens als voedsel". Discarded: plantencel ×2, Plantagen ×3 (Swedish garden chain), plantain, plantar fasciitis, plantskola ×2, olijfboom, planteray rum, plantenwinkel, gaswisseling/voortplanting (groep 7-8 biology).
- Tier C. **Re-probe nl**: "onderdelen van een plant", "plant groeien kleuters", "van zaadje tot plant", "wat heeft een plant nodig werkblad". SERP: unknown (Schooltv, kleuteridee thema lente).
- Faces: (1) De delen van een plant benoemen (base) · (2) Waarvoor dient elk deel? · (3) De delen van een bloem · (4) Wat heeft een plant nodig? · (5) Van zaadje tot plant · (6) Welke delen eten we?
- Traps: "bloemen" = THEME slug; "de stengel / het blad / de wortel" (wortel = root AND carrot, a genuine face-6 ambiguity the panel must use or avoid); engine appends "werkblad".

---

## 7 `2d-shapes` - naming and describing flat shapes

Heads: en **2d shapes** (A; K5, Education.com, Math Salamanders, Twinkl, SplashLearn; "2d shapes worksheets for grade 1 pdf with answers" WINNABLE) · de **Geometrische Formen** (A; PIKAS, Frau Locke, Ideenreise, Grundschulkönig; "geometrische Formen Klasse 1 Arbeitsblatt kostenlos" WINNABLE) · nl **Vlakke figuren** / **Vormen** (B; kleuteridee, jufmilou, Sommenfabriek; "vormen werkblad kleuters" WINNABLE).

**en**
- Head: **2d shapes** (primary; 65 strings); "shapes" (secondary, broader, and the THEME slug).
- Demand: unique 135, 14/14; net 126. Telling: "2d shapes worksheets for grade 1 pdf with answers", "2d shapes kindergarten worksheets free", "2d shapes worksheets pdf grade 2", "2d shapes grade 3 worksheets with answers", "2d shapes names", "2d shapes with examples and names", "2d shapes found at home", "shapes kindergarten should know", "shapes 1st graders should know", "classifying shapes 1st grade", "partitioning shapes 2nd grade". Discarded: shapeshifter ×4, "shapes ai", "shapes inc", brewery, "shapes in swedish", grade 4.
- Tier A. SERP: HARD (K5, Education.com, Math Salamanders, Twinkl, SplashLearn, Math-Drills); WINNABLE: "2d shapes names worksheet kindergarten", "2d shapes found at home worksheet", "2d shapes worksheet grade 1 with answers".
- Faces: (1) 2D Shapes: name the shape (write the name) (base) · (2) 2D Shapes in Real Life (objects) · (3) Sides and Corners (vertices) · (4) Draw the shapes on dot paper · (5) Shape riddles ("I have 3 sides") · (6) Trace and name.
- Traps: **skill overlap with the `geometry` family (K-070 Shape Hunt, K-075 count the sides, K-076 sort by sides, K-078 Shape Twins, K-080 odd shape out, G2-241 Shape Sorter, G2-244 Flat or Solid?, G2-234 partition)** - the pedagogy panel must avoid find/sort/match/partition/flat-vs-solid; face 3 must differ from K-075 "count the sides" (so: corners + sides together, or name-from-count); the query head "2d shapes" itself is NOT used by any existing title, so the head is ours; "shapes" bare = THEME slug.

**de**
- Head: **Geometrische Formen** (primary; 60 strings); "Formen" only with Klasse (THEME slug `formen`).
- Demand: unique 115, 14/14; net 100. Telling: "geometrische formen 1 klasse arbeitsblätter kostenlos", "geometrische formen 2 klasse arbeitsblätter", "geometrische formen 3 klasse übungen", "geometrische formen grundschule arbeitsblatt kostenlos", "geometrische formen klasse 1 einführung", "geometrische formen klasse 1 pikas", "geometrische formen grundschule frau locke", "geometrische formen eigenschaften arbeitsblatt", "geometrische formen erkennen arbeitsblatt", "geometrische formen zeichnen 2. klasse", "geometrische formen rätsel", "formen legen klasse 1", "formen und körper klasse 2". Discarded: Formentera ×5, Formentor/Cupra ×4, "10. klasse", "englisch", Klasse 4 ×2, "rauten 5 buchstaben" (crossword).
- Tier A (the strongest de number in the batch). SERP: HARD at the head (PIKAS, Frau Locke, Ideenreise, Grundschulkönig, Mathe-im-Netz); WINNABLE at "geometrische formen eigenschaften arbeitsblatt", "geometrische formen zeichnen 2. klasse", "geometrische formen rätsel".
- Faces: (1) Geometrische Formen benennen (base) · (2) Formen in der Umwelt · (3) Ecken und Seiten (Eigenschaften) · (4) Formen zeichnen (Punktefeld) · (5) Formen-Rätsel · (6) Nachspuren und benennen.
- Traps: "Formen legen" is the tangram family (b4, K-353), never a face; "Körper" (3D) is G2-244's contrast, out; "Viereck/Rechteck/Quadrat/Raute" naming is Grundschule-exact (a Quadrat IS a Rechteck - a name-the-shape answer key must accept the most specific name only by design); "Formenjagd" (K-070 de) is a neighbour title; engine appends Arbeitsblatt.

**nl**
- Head: **Vlakke figuren** (primary for groep 3-5: "vlakke figuren werkblad", "vlakke figuren benoemen", "vlakke figuren herkennen"); **Vormen** with a groep/kleuters word (secondary; THEME slug `vormen`).
- Demand: unique 49, 10/14; net 32. Telling: "vlakke figuren werkblad", "vlakke figuren benoemen", "vlakke figuren namen", "vlakke figuren kleuters", "vlakke figuren oefeningen", "vormen werkblad kleuters", "vormen werkblad groep 1", "vormen werkblad groep 2", "werkblad vormen groep 3", "werkblad vormen groep 4", "werkblad vormen herkennen", "werkblad vormen sorteren", "kleuters vormen leren". Discarded: "dictee vormen groep 3/4/5" ×4 ("vormen" = forms of dictation), nagels, autisme/dementie/huidkanker, "vormend bestanddeel" ×3 (crossword), vormenstoof ×2, 3d printen, ruimtefiguren ×2 (3D).
- Tier B (kleuters + groep 3-4; "vlakke figuren" is the Flemish/NL maths term). SERP: kleuteridee, jufmilou, Sommenfabriek, Wiskanjer (BE); WINNABLE for "vlakke figuren werkblad", "vormen werkblad groep 3".
- Faces: (1) Vlakke figuren benoemen (base) · (2) Vormen om je heen · (3) Hoeken en zijden · (4) Figuren tekenen op stippen · (5) Vormenraadsels · (6) Overtrekken en benoemen.
- Traps: "vormen" bare = THEME slug and dictation noise; "vlakke figuren" leans Flemish (BE term), nl-NL groep 3 teachers also say "vormen" - panel picks; "werkblad vormen sorteren" is K-076 territory; engine appends "werkblad".

---

## 8 `digraphs` - two letters, one sound

Heads: en **digraphs** / **sh ch th** (A at K-1; Education.com, K5, This Reading Mama, TPT, Twinkl; "sh ch th wh worksheets pdf" WINNABLE) · de: the seeded heads are **dead as seeded** (C); the real genre is **Laute sch, ch, ei, au, eu** (re-probe) · nl **Tweetekenklanken** (A- at groep 3; Veilig leren lezen, jufmilou, jufjanneke; "werkblad tweetekenklanken groep 3" WINNABLE).

**en**
- Head: **digraphs** (primary; "digraphs worksheets for kindergarten pdf", "digraphs worksheets for grade 1 pdf"); **sh ch th** (secondary and the best face head; "sh ch th worksheets pdf free", "sh ch th wh worksheets with answers", "sh ch th words with pictures printable").
- Demand: unique 88, 11/14; net 85. Telling: "digraphs worksheets for kindergarten", "digraphs 1st grade worksheets", "digraphs worksheets for grade 2 pdf", "consonant digraphs kindergarten", "ch sh th worksheets kindergarten", "sh ch th words with pictures printable", "sh ch th wh word list printable", "free printable sh ch th wh worksheets", "blends and digraphs 1st grade", "vowel digraphs 3rd grade", "digraph kindergarten words". Discarded: "digraph and diagraph", "digraphs meaning", "digraphs pronunciation".
- Tier A. SERP: HARD at "digraphs worksheets" (Education.com, K5, This Reading Mama, Twinkl, TPT, Liveworksheets); WINNABLE: "sh ch th words with pictures worksheet", "digraphs worksheets for kindergarten pdf", "vowel digraphs worksheet 2nd grade".
- Faces: (1) Digraphs: circle the digraph you hear (sh, ch, th) (base) · (2) sh ch th wh: sort the pictures · (3) Beginning or ending digraph · (4) Write the missing digraph · (5) ck / ng / ph (the second set) · (6) Vowel digraphs (ee, ea, ai, oa; G2).
- Traps: **G1-311 "Sound of the Week: {L}" already fans sh/ch/th** (and `sound-boxes`, `phonological-awareness`, `spelling-rules` "which one" ee/ea refused) - the type must own the SORT / missing-digraph / beginning-vs-end moves; "blends and digraphs" (11 strings) is a combined head, blends belong to no family yet (a face candidate if the panel wants it); any page that shows a split reads `approved-words-en.json` (the brief).

**de**
- Head (as seeded): "sch ch" = unique 20, 3/14, net 12, of which the school strings are only "sch ch übungen" and the Buchstabenverbindungen lines - and **"Buchstabenverbindungen" means joined HANDWRITING strokes** ("buchstabenverbindungen schreibschrift üben", "grundschrift", "schulausgangsschrift"), a different skill. Discarded: French rapper SCH ×5 ("sch champs élysées lyrics", "sch cheveux"), "sch chur", "sch ch sprachfehler" (speech therapy).
- Tier C as seeded; the German genre exists under other names. **Re-probe de** (mandatory before scoring): "sch wörter arbeitsblatt", "wörter mit sch klasse 1", "ch laut arbeitsblatt", "ei au eu arbeitsblatt klasse 1", "zwielaute grundschule", "doppellaute arbeitsblatt", "lautgetreue wörter sch", "sp st arbeitsblatt klasse 1". My market knowledge: "Wörter mit sch" and "ei/au/eu Zwielaute" are A-tier Klasse 1 genres (Frau Locke, Grundschulkönig, Zaubereinmaleins "Lautbilder"), but I will not score them unmeasured.
- Faces (provisional): (1) Laute sch, ch: Wo hörst du es? (base) · (2) Zwielaute ei, au, eu sortieren · (3) sp und st am Wortanfang · (4) Fehlende Buchstaben einsetzen · (5) ch wie in "ich" oder "ach" (the Ich-/Ach-Laut contrast) · (6) Wörter mit ie.
- Traps: never "Buchstabenverbindungen" (handwriting); G1-311 de "Laut der Woche" owns the single-sound-of-the-week move; de has `chunks` layer (the brief) for grapheme display; nouns capital; engine appends Arbeitsblatt.

**nl**
- Head: **Tweetekenklanken** (primary; the named Veilig-leren-lezen genre); "ui ei ou" seed returned nothing school-relevant.
- Demand: unique 20, 5/14; net 19. Telling: "tweetekenklanken groep 3", "tweetekenklanken groep 4", "tweetekenklanken werkblad groep 3", "werkblad tweetekenklanken groep 3", "werkblad tweetekenklanken groep 4", "werkblad tweetekenklanken groep 5", "tweetekenklanken oefenen groep 3", "woorden met tweetekenklanken groep 3", "werkboekje tweetekenklanken groep 3", "tweetekenklanken flitsen groep 3", "tweetekenklanken kaartjes", "tweetekenklanken poster". Discarded: "oefenen nt2".
- Tier A- (every string is school, 19/20 net: the cleanest nl list in the batch). SERP: jufmilou, jufjanneke, juf-maike, Veilig leren lezen (Zwijsen); WINNABLE for "werkblad tweetekenklanken groep 3".
- Faces: (1) Tweetekenklanken: welke klank hoor je? (base) · (2) ui, ei, ou sorteren · (3) oe, eu, ie · (4) aa, ee, oo, uu (lange klanken) · (5) Vul de klank in · (6) Lees en kies: ei of ij (⚠ owned by `spelling-rules`, drop or re-target).
- Traps: "tweetekenklank" includes the long vowels aa/ee/oo/uu and oe/eu/ie/ui/ei/ij/ou/au (nl), which is wider than en "digraph"; ei/ij and au/ou as a SPELLING choice are `spelling-rules` units; the nl `chunks` layer exists (the brief); IJ is one grapheme; engine appends "werkblad".

---

## 9 `life-cycles` - butterfly and frog life cycles

Heads: en **butterfly life cycle** / **frog life cycle** (A; Twinkl, Education.com, TPT, Pinterest, Superstar Worksheets; "frog life cycle worksheet cut and paste" WINNABLE) · de **Entwicklung Schmetterling / Frosch** (B; eduki, Grundschulkönig, Sachunterricht-Portal) · nl **Van rups tot vlinder** / **Levenscyclus vlinder** (B-; kleuteridee, jufmilou).

**en**
- Head: **butterfly life cycle** (primary; 52 strings); **frog life cycle** (secondary; 50 strings).
- Demand: unique 102, 14/14; net 99. Telling: "butterfly life cycle worksheet kindergarten", "butterfly life cycle worksheet 2nd grade", "butterfly life cycle worksheet with answers", "butterfly life cycle printable pdf free download", "frog life cycle worksheet cut and paste", "frog life cycle worksheet kindergarten", "frog life cycle grade 3 science worksheet", "frog life cycle printable pdf free with answers", "life of a frog worksheet 1st grade", "plant and animal life cycles 3rd grade". Discarded: "in days", "days", "how long".
- Tier A. SERP: HARD (Twinkl, Education.com, TPT, Pinterest, Superstar Worksheets, Kids Academy); WINNABLE: "frog life cycle worksheet cut and paste", "butterfly life cycle worksheet with answers pdf", "frog life cycle worksheet 1st grade".
- Faces: (1) Butterfly Life Cycle: number the stages (base) · (2) Frog Life Cycle · (3) Label the stages (egg, larva/caterpillar, pupa/chrysalis, adult) · (4) Cut and paste the cycle · (5) Compare two life cycles · (6) Plant Life Cycle (if `plants` does not take it).
- Traps: **family-name collision with `science-sequence` ("Sequencing & Life Cycles" / "Reihenfolge & Lebenszyklen" / "Volgorde en levenscyclus") and its G1-203 chicken base** - a new `life-cycles` type makes two hub rows that read the same; the cleaner build is new FACES under `science-sequence` or a type whose title is always the species compound; vocab: `caterpillar`, `butterfly`, `frog` hit, `tadpole`, `chrysalis`, `cocoon` no hit = new stage art (a primitive) or a refused stage.

**de**
- Head: **Entwicklung Schmetterling** / **Entwicklung Frosch** (as seeded; every string is school or kids).
- Demand: unique 24, 7/14; net 24. Telling: "entwicklung schmetterling grundschule arbeitsblatt", "entwicklung schmetterling klasse 1", "entwicklung schmetterling arbeitsblatt", "entwicklung frosch arbeitsblatt", "entwicklung frosch grundschule", "entwicklung frosch stadien", "entwicklung froschlaich zum frosch", "entwicklung raupe schmetterling grundschule". No noise.
- Tier B. **Re-probe de**: "vom ei zum schmetterling arbeitsblatt", "metamorphose frosch grundschule", "lebenszyklus schmetterling", "vom laich zum frosch arbeitsblatt". SERP: eduki, Grundschulkönig, Zaubereinmaleins, Planet Schule; WINNABLE at "entwicklung schmetterling grundschule arbeitsblatt".
- Faces: (1) Vom Ei zum Schmetterling (base) · (2) Vom Laich zum Frosch · (3) Stadien beschriften (Ei, Raupe, Puppe, Schmetterling) · (4) Ausschneiden und in die richtige Reihenfolge kleben · (5) Schmetterling und Frosch vergleichen · (6) Die Entwicklung der Pflanze.
- Traps: "Lebenszyklus" in a title echoes the science-sequence de family name; "Kaulquappe" (tadpole), "Froschlaich"; nouns capital; engine appends Arbeitsblatt.

**nl**
- Head: **Van rups tot vlinder** (primary, the kleuter phrase); **Levenscyclus vlinder** (secondary).
- Demand: unique 16, 6/14; net 10. Telling: "van rups tot vlinder werkblad", "levenscyclus vlinder werkblad", "van rups tot vlinder kleuters", "levenscyclus vlinder kleuters", "levenscyclus rups vlinder", "filmpje van rups tot vlinder kleuters". Discarded: speelgoed, opvang, Sint Pauwels, koninginnepage, atalanta, "hoe lang duurt dat".
- Tier B- (a kleuters theme, spring). SERP: kleuteridee, jufmilou, Schooltv; unknown. **Re-probe nl**: "van kikkerdril tot kikker werkblad", "levenscyclus kikker".
- Faces: (1) Van rups tot vlinder (base) · (2) Van kikkerdril tot kikker · (3) De stadia benoemen (ei, rups, pop, vlinder) · (4) Knip en plak op volgorde · (5) Vlinder en kikker vergelijken · (6) Van zaadje tot plant.
- Traps: "levenscyclus" = the science-sequence nl slug `volgorde-en-levenscyclus`; "de pop" (pupa; also "doll", context-safe on a cycle page); engine appends "werkblad".

---

## 10 `colors` - colour words (reading and writing the names)

Heads: en **color words** (B+ K; This Reading Mama, Education.com, TPT, Twinkl; "color words worksheets for kindergarten pdf" WINNABLE) · de **Farben lernen** (C for school: Kita/DaZ/Kunst) · nl **Kleuren leren** / **werkblad kleuren kleuters** (B-; kleuteridee, jufmilou).

**en**
- Head: **color words** (primary; 30 strings, the K literacy genre); "colors" bare (THEME slug, toddler noise).
- Demand: unique 108, 14/14; net 91 (but the K-3 color-words line is ~40; the rest is "colors worksheets for preschool/toddlers", "color by sight words" and colour theory). Telling: "color words worksheets for kindergarten", "color words kindergarten worksheets", "color words worksheet grade 1", "color words worksheets pdf", "color words printable free", "color names worksheets", "teaching color words kindergarten", "color sight words kindergarten", "color by sight words 1st grade free printable", "color wheel 1st grade", "secondary colors examples". Discarded: colors of evil ×2/love/the wind ×2/tv, songs ×2, "in spanish/swedish/tagalog", "red words for 2nd grade", "3rd grade words to know", "what color is 1".
- Tier B+ (K only; above K it is art, "color wheel"). SERP: HARD (This Reading Mama, Education.com, Twinkl, TPT, Pinterest, 123homeschool4me); WINNABLE: "color words worksheets for kindergarten pdf", "trace color words worksheet".
- Faces: (1) Color Words: read the word, match the colour (base) · (2) Trace the color words · (3) Color words word search-free spelling (write it) · (4) Primary and Secondary Colors (mixing, G1-2 art) · (5) Color word cut and paste · (6) Color words in sentences.
- Traps: THEME slug `colors`; **`read-and-color` (G1-242 "Read and Color") owns "read the word, colour the picture"** and `color-by-number` owns the code sheets ("color by sight word" 13 strings belongs there) - so the base must be read-and-MATCH or trace, never read-and-colour; a colour answer key cannot be verified on a B&W print (the code checks stamps, the teacher checks crayons); US "color".

**de**
- Head: **Farben lernen** (as seeded; "farben lernen kindergarten arbeitsblatt", "farben lernen grundschule").
- Demand: unique 84, 13/14; net 47 (and the Grundschule-relevant subset ~15). Telling: "farben lernen kindergarten arbeitsblatt", "farben arbeitsblatt kindergarten", "farben arbeitsblatt grundschule", "thema farben 1 klasse", "farben klasse 1", "farben mischen klasse 1", "farben mischen klasse 2", "farben mischen grundschule klasse 1", "kalte und warme farben klasse 1", "warme und kalte farben klasse 2", "arbeitsblatt farben mischen kindergarten". Discarded: Mercedes C/G/V-Klasse Farben ×8, "farben des bösen" ×3, Farbenlöwe, Farbengeschäft, RAL, "auf schwedisch", Englisch/Französisch Farben ×7 (foreign-language lessons), DaZ/A1/"deutsch lernen" ×5, ab 2 Jahren/Kleinkind/3 Jahre/mit Eiern/Buch (toddler), Satzglieder/Wortarten "Farben" (colour-coding grammar), "artikel farben".
- Tier C for a K-3 literacy colour-words sheet (German children know colour names before school; "Farben lernen" is Kita/DaZ). The real school genre is **Farben mischen / warme und kalte Farben** (Kunst Klasse 1-2), a different skill. SERP: Kita portals, eduki, Zaubereinmaleins (DaZ); unknown for Farben mischen.
- Faces: (1) Farbwörter lesen und zuordnen (base, Vorschule/DaZ) · (2) Farbwörter nachspuren · (3) Grundfarben und Mischfarben · (4) Warme und kalte Farben · (5) Farbwörter schreiben · (6) Farben im Satz.
- Traps: "Farben" = THEME slug; Farbadjektive agree ("ein roter Ball") - frames must avoid adjective agreement with a picture noun (the brief); engine appends Arbeitsblatt.

**nl**
- Head: **Kleuren leren** (secondary); **werkblad kleuren kleuters** (the real phrase; "kleuren" bare = THEME slug and printing noise).
- Demand: unique 76, 10/14; net 32. Telling: "werkblad kleuren kleuters", "kleuren leren kleuters", "kleuters kleuren oefenen", "thema kleuren kleuters", "werkblad kleuren groep 3", "kleuren groep 3", "werkblad kleuren mengen kleuters", "kleuters kleuren mengen", "kleuren mengen groep 3", "kleuren van de regenboog", "werkblad kleuren en vormen", "werkblad kleuren nt2". Discarded: "kleuren op code/nummer/cijfer" ×15 and "sommen kleuren" ×4 (the `color-by-number` family), "kleuren printen" + 10 cities/shops (printing services), boekenlegger ×3, kleurenblind, waaier/wiel/cirkel/monster, peuters/2-3 jaar ×4.
- Tier B- (kleuters theme). SERP: kleuteridee, jufmilou, juf-maike; WINNABLE for "werkblad kleuren kleuters".
- Faces: (1) Kleurwoorden lezen en koppelen (base) · (2) Kleurwoorden overtrekken · (3) Kleuren mengen · (4) Kleuren van de regenboog op volgorde · (5) Kleurwoorden schrijven · (6) Kleuren en vormen.
- Traps: "kleuren" = THEME slug AND the verb "to colour" (every colouring sheet contains it) AND the `color-by-number` nl name "Kleuren op code" - the most collision-prone head in the batch; "oranje" (not "geel") on the traffic light (cross-type consistency with road-safety); engine appends "werkblad".

---

## Spares (not in my 10)

### 11 `homophones`

Heads: en **homophones** / **there their they're** (A-; K5, Education.com, Grammarly-type explainers; "homophones worksheets for grade 2" WINNABLE) · de **das / dass** (C in K-3: the tail is Klasse 4-10) · nl **ei / ij** (A at groep 3-5 but OWNED by `spelling-rules`), **homofonen** (dead in K-3).

- en: unique 91, 12/14; net 76. Telling: "homophones worksheets for grade 2", "homophones 2nd grade worksheets", "homophones grade 3 worksheet pdf", "homophones 1st grade worksheets", "homophones for 6 year olds", "list of homophones for grade 1", "there their they re worksheet 2nd grade", "there their they re worksheet grade 3". Discarded: definition/meaning/pronunciation/vs homonyms, "in spanish", meme, grade 4-8/high school lines (8). Tier A- (G2-3). Faces: pictures pairs (sea/see), choose the right word, there/their/they're (G3), write the sentence.
- de: unique 44, 7/14; net 34 but the K-3 subset is ~12 ("das dass grundschule arbeitsblatt", "das oder dass 3 klasse", "einführung das dass grundschule", "regel das dass grundschule"); das/dass is formally Klasse 4 in most Lehrpläne; "gleich klingende Wörter" is a definition query. Discarded: Klasse 6/7/10 lines (7), Englisch ×2, Stilmittel. Tier C in band. The de Grundschule sound-alike genre is "ähnlich klingende Laute" (d/t, b/p, g/k) = `spelling-rules` territory.
- nl: unique 45, 7/14; net 34, of which 30 are ei/ij (a SPELLING rule, owned by G2-315/G2-324 nl units ei/ij 44, au/ou 25) and "homofonen" 10 strings are all definition queries. Discarded: "ei iji/ijc aircraft", "ijzer" ×2, "ijs/ijx/ijz", groep 6/8.
- Verdict: an en-only type in Germanic markets (de C, nl owned). Keep out.

### 12 `materials`

Heads: en **magnetic or not** / **materials and their properties** (B-/C; UK KS1 "year 2" + Philippine DepEd + India) · de **dead as seeded** (unique 6, 3/14: "materialien und ihre eigenschaften grundschule" is the only school string) · nl **dead** (the 43 strings are "materialen kleuters" = classroom supplies, "magnetisch bord/speelgoed/wimpers").

- en: unique 44, 8/14; net 27. Telling: "magnetic or not worksheet", "magnetic or non magnetic worksheet", "materials and their properties worksheet grade 1", "materials and their properties worksheets pdf for grade 2 with answers", "materials and their properties kindergarten". Discarded: "aluminium/brass/copper/gold/nickel/silver/steel/titanium magnetic or not" ×9 (adult lookups), magnetic sheets ×3, grade 4-6/year 5/class 5-6 ×7.
- de: re-probe "magnete grundschule arbeitsblatt", "magnetisch oder nicht arbeitsblatt", "stoffe und ihre eigenschaften grundschule", "materialien sachunterricht klasse 1"; my market knowledge says "Magnetismus Grundschule" is a real Klasse 2-3 unit, unmeasured.
- nl: re-probe "magnetisch of niet werkblad", "materialen sorteren kleuters".
- Neighbours: G1-204 sink-float, K-214 natural-manmade (science-sort), G2-348 recycling odd-one-out-by-material (b4). Verdict: last on Germanic numbers; keep out.

---

## Re-probe list (seeds that were un-native; run before the design phase scores them)

| locale | candidate | re-run these seeds |
|---|---|---|
| de | digraphs | "wörter mit sch arbeitsblatt", "sch wörter klasse 1", "ei au eu arbeitsblatt", "zwielaute grundschule", "doppellaute arbeitsblatt", "sp st arbeitsblatt klasse 1", "ch laut arbeitsblatt" |
| de | plants | "aufbau einer pflanze arbeitsblatt", "frühblüher arbeitsblatt grundschule", "bohne keimen arbeitsblatt", "was brauchen pflanzen zum wachsen" |
| de | life-cycles | "vom ei zum schmetterling arbeitsblatt", "metamorphose frosch grundschule", "vom laich zum frosch", "lebenszyklus schmetterling" |
| de | family | "verwandtschaft grundschule arbeitsblatt", "familienmitglieder arbeitsblatt" |
| de | materials | "magnete grundschule arbeitsblatt", "magnetisch oder nicht arbeitsblatt", "stoffe eigenschaften grundschule" |
| en | maps | "cardinal directions worksheet", "compass rose worksheet kindergarten", "map key worksheet 1st grade" |
| en | synonyms | "shades of meaning worksheet 1st grade" |
| nl | plants | "onderdelen van een plant", "van zaadje tot plant", "wat heeft een plant nodig werkblad" |
| nl | life-cycles | "van kikkerdril tot kikker werkblad", "levenscyclus kikker" |
| nl | family | "gezinsleden werkblad", "mijn gezin kleuters werkblad" |
| nl | maps | "windroos werkblad groep 4", "plattegrond lezen groep 4" |
| nl | space | "planeten werkblad groep 4", "thema ruimte kleuters werkblad" |
| nl | materials | "magnetisch of niet werkblad", "materialen sorteren kleuters" |

---

## Closing

### (a) Rank of the twelve for en + de + nl (measured net + tier + collision cost)

| rank | key | en unique (net) | de unique (net) | nl unique (net) | net sum | tiers en/de/nl | note |
|---|---|---|---|---|---|---|---|
| 1 | road-safety | 104 (92) | 103 (90) | 92 (73) | 255 | B+ / A / A | the only candidate Tier A in both de and nl; national sign sets per locale; new sign primitive |
| 2 | 2d-shapes | 135 (126) | 115 (100) | 49 (32) | 258 | A / A / B | highest demand; THEME slug collision (compound heads); heavy skill overlap with `geometry` K-070..K-080/G2-241/G2-244, but the search HEAD is unclaimed by any existing title |
| 3 | family | 126 (107) | 106 (69) | 59 (34) | 210 | A / A- / B | ESL inflates en; tree template = open face; nl neef/nicht ambiguity; K-343 neighbour |
| 4 | maps | 97 (86) | 84 (67) | 25 (14) | 167 | A / A / C | de Himmelsrichtungen Klasse 3 is the prize; nl werelddelen count contested; world map primitive |
| 5 | synonyms | 122 (102) | 76 (68) | 31 (18) | 188 | A / A / B- | de = Wortfeld (per-verb faces are real separate queries); must never say "antonyms" (opposites) |
| 6 | space | 126 (107) | 84 (57) | 28 (12) | 176 | A / A- / C | THEME slug `space`; moon phases skew G3+ in de |
| 7 | plants | 133 (131) | 61 (37) | 22 (8) | 176 | A / B / C | cleanest en list; de/nl need native re-probe; plant-life-cycle face must be assigned to one type |
| 8 | digraphs | 88 (85) | 20 (12) | 20 (19) | 116 | A / C* / A- | *de as seeded; re-probe likely lifts it to A; G1-311 overlap |
| 9 | life-cycles | 102 (99) | 24 (24) | 16 (10) | 133 | A / B / B- | family-name collision with `science-sequence` in all three locales |
| 10 | colors | 108 (91) | 84 (47) | 76 (32) | 170 | B+ / C / B- | net overstates: K-3 colour-words subset ~40/15/15; THEME slug + read-and-color + color-by-number collisions |
| 11 | homophones | 91 (76) | 44 (34) | 45 (34) | 144 | A- / C / owned | de das/dass is Klasse 4+; nl ei/ij is `spelling-rules` |
| 12 | materials | 44 (27) | 6 (6) | 43 (7) | 40 | C / dead / dead | re-probe de "Magnete" before a final no |

(Rank is not the net sum: tier, SERP and collision cost move 2d-shapes below road-safety, colors below life-cycles and homophones out.)

### (b) Recommended 10 (Germanic view)

**road-safety · 2d-shapes · family · maps · synonyms · space · plants · digraphs · life-cycles · colors.** Out: **homophones** (en-only here), **materials** (dead in de/nl as seeded).

Conditions the design phase must meet, or the ranking changes:
1. `life-cycles` enters only if its titles are always species compounds and the hub row is disambiguated from `science-sequence` (or the operator rules to put the faces under `science-sequence` and pick a different 10th type; the next spare by my numbers is homophones, en-only).
2. `2d-shapes` faces must avoid every move `geometry` already owns (find, sort-by-sides, match, odd-one-out, partition, flat-vs-solid); if the pedagogy panel cannot find five, it drops below `colors`.
3. `colors` is the weakest keep: it survives on en K and nl kleuters only, and its base must be read-and-MATCH or trace (never read-and-colour). If another locale panel reports it thin, **swap colors OUT for homophones** (en A-) - not for materials.
4. `digraphs` de must be re-probed with native heads before its de landing count is planned; nl "tweetekenklanken" is already a clean A-.
5. `plants` face "Plant Life Cycle" and `life-cycles` face 6 are the same query; assign it to `plants` (the stronger en head) and give life-cycles a comparison face instead.

### (c) Honest click estimate per landing per day at maturity (Tier-A winnable 3-8 · B 1-3 · C <1; a HARD head halves the base landing, faces carry it)

| key | en | de | nl |
|---|---|---|---|
| road-safety | 2-4 (head WINNABLE-to-HARD; "traffic signs worksheets for kindergarten" faces) | 4-7 (Verkehrszeichen / Ampel faces) | 3-6 (verkeersborden groep 3-5) |
| 2d-shapes | 2-4 (head HARD; "names" / "found at home" faces; internal cannibalisation) | 3-5 (Eigenschaften / zeichnen faces) | 1-2 |
| family | 3-5 (head HARD; family tree template face strongest) | 3-5 (Stammbaum-Vorlage) | 1-3 (stamboom werkblad) |
| maps | 3-5 (head HARD; blank map / directions faces) | 3-6 (Himmelsrichtungen Klasse 3) | <1-1 |
| synonyms | 2-4 (head HARD; "with answers" / pictures faces) | 3-6 (Wortfeld sagen / gehen / sehen: each a real query) | 1-2 |
| space | 3-5 (head HARD; planets in order / moon phases faces) | 2-4 | <1-1 |
| plants | 3-5 (head HARD; functions / flower faces) | 1-3 (re-probe may lift) | <1 |
| digraphs | 3-5 ("sh ch th" faces) | 1-2 as seeded (3-5 if the re-probe confirms "Wörter mit sch") | 2-4 (tweetekenklanken groep 3) |
| life-cycles | 3-5 (cut and paste / with answers faces) | 1-3 | 1-2 |
| colors | 1-3 | <1-1 | 1-2 |
| homophones (spare) | 2-4 | <1 | <1 (owned) |
| materials (spare) | 1-2 | <1 | <1 |

**Germanic share of the ≥1,000/day goal** (recommended 10 × 6 faces × 3 locales = 180 landings): low end of every band ≈ **340 clicks/day**, midpoint ≈ **500 clicks/day** (≈2.8 per landing). That leaves the other 8 locales (480 landings) needing ≈500-660/day, ≈1.0-1.4 per landing, which is plausible only if es/fr/it/pt carry the same heads (their raw numbers for family, 2d-shapes, colors, road-safety, synonyms, space are in the same range as en in the summary table). Read these as order-of-magnitude bands at catalogue maturity, not forecasts; the en column assumes the long-tail face titles, not the bare head.

### (d) en: HARD heads and the long-tail face that still wins

| candidate | head owners (market knowledge) | long-tail face that wins |
|---|---|---|
| road-safety | Twinkl, Education.com, TPT, Indian CBSE portals | "traffic signs worksheets for kindergarten" · "traffic lights worksheet kindergarten" · "road safety worksheets for grade 1 pdf" |
| 2d-shapes | K5, Education.com, Math Salamanders, SplashLearn, Twinkl | "2d shapes names worksheet kindergarten" · "2d shapes found at home worksheet" · "2d shapes worksheets for grade 1 pdf with answers" |
| family | iSLCollective, Liveworksheets, ESL Printables, Twinkl, Education.com | "family tree template for 1st grade" · "family tree printable 4 members" · "types of family worksheet grade 2" |
| maps | Education.com, K5, Super Teacher, Twinkl, Nat Geo Kids | "continents and oceans map blank printable" · "continents and oceans worksheet for grade 2" · "map skills 1st grade worksheets" |
| synonyms | K5, Education.com, Super Teacher, Twinkl, Liveworksheets | "synonyms worksheet grade 1 with answers pdf" · "synonyms with pictures kindergarten" · "shades of meaning worksheet 1st grade" (re-probe) |
| space | NASA Space Place, Education.com, Twinkl, TPT, Super Teacher | "planets in order worksheet kindergarten" · "moon phases worksheet 1st grade" · "solar system worksheet grade 3 with answers" |
| plants | Education.com, K5, Twinkl, TPT, Super Teacher | "parts of a plant worksheet kindergarten pdf" · "parts of a plant and their functions worksheet" · "parts of a flower worksheets for kindergarten" |
| digraphs | Education.com, K5, This Reading Mama, Twinkl, TPT | "sh ch th words with pictures worksheet" · "digraphs worksheets for kindergarten pdf" · "vowel digraphs worksheet 2nd grade" |
| life-cycles | Twinkl, Education.com, TPT, Superstar Worksheets, Pinterest | "frog life cycle worksheet cut and paste" · "butterfly life cycle worksheet with answers" · "frog life cycle worksheet 1st grade" |
| colors | This Reading Mama, Education.com, Twinkl, TPT | "color words worksheets for kindergarten pdf" · "trace color words worksheet" |

Standing rules from this harvest: "pdf" and "with answers" recur on every science and literacy head (printable decks ship NO answer key per the nt10-D ruling, so never promise one in a meta; the face must win on the query without it); "printable" beats "worksheet" on the template heads (family tree, solar system, continents map, traffic signs); de "kostenlos" and "zum Ausdrucken" ride on Verkehrserziehung, Himmelsrichtungen, Kontinente and Stammbaum (metadata only, never visible copy, per the 2026-09-14 "free" ruling); nl "werkblad + groep N" is the dominant pattern (verkeersborden, tweetekenklanken, stamboom, synoniemen) and every nl title face should carry the groep honestly in the landing, not the title.
