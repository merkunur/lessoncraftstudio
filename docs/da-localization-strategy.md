# Danish Localization Strategy (Fælles Mål)

> Reference document for all DA locale content implementation (Parts 207+).
> Created in Part 206 of Landing Page SEO Perfection.

---

## 1. Danish Grade System Mapping

| LCS Grade | Danish Term | Age | Fælles Mål Level | Notes |
|-----------|------------|-----|-------------------|-------|
| preschool | Førskole / Dagtilbud | 3-4 år | Pædagogiske læreplaner | Pre-school, play-based (Dagtilbudsloven) |
| kindergarten | Børnehaveklasse | 5-6 år | Indskoling (0. klasse) | Compulsory since August 2009 |
| first-grade | 1. klasse | 6-7 år | Indskoling (1.-3.) | Part of indskoling unit |
| second-grade | 2. klasse | 7-8 år | Indskoling (1.-3.) | First national tests (dansk + matematik) |
| third-grade | 3. klasse | 8-9 år | Indskoling (1.-3.) | End of indskoling; dansk test in 3. klasse |

### Key Differences from US/FI Systems
- Børnehaveklasse (0. klasse) became compulsory August 1, 2009 (undervisningspligt extended to 10 years)
- Indskoling (0.-3. klasse) is treated as one pedagogical unit
- Børnehaveklasse has its own 6 competence areas (not subject-based like grades 1-9)
- Fælles Mål organizes by kompetenceområder and færdigheds- og vidensmål
- National tests (Nationale Overgangstest) start in 2. klasse (dansk + matematik, 30 min each)
- No formal grades until 8. klasse; løbende evaluering (continuous formative assessment) throughout
- Meddelelsesbog (student report book) used for school-home communication from 0.-9. klasse
- Fælles Mål will be replaced by new folkeskolens fagplaner from school year 2027/2028 (Fagfornyelsen)

### Børnehaveklasse Competence Areas (0. klasse only)
1. **Sprog** — Language
2. **Matematisk opmærksomhed** — Mathematical awareness
3. **Naturfaglige fænomener** — Natural science phenomena
4. **Kreative og musiske udtryksformer** — Creative and musical expression
5. **Krop og bevægelse** — Body and movement
6. **Engagement og fællesskab** — Engagement and community

---

## 2. Fælles Mål Standard Codes

### Code Format
`FM.[Subject].[CompetenceArea].[GradeRange]`

Example: `FM.MAT.TA.1-3` = Matematik, Tal og algebra, grades 1-3

### Subject Area Codes

| Code | Danish Name | English Name |
|------|-----------|---------|
| **MAT** | Matematik | Mathematics |
| **DAN** | Dansk | Danish (mother tongue) |
| **NT** | Natur/teknologi | Nature/technology |
| **BK** | Billedkunst | Visual arts |
| **MU** | Musik | Music |
| **IDR** | Idræt | Physical education |
| **HD** | Håndværk og design | Crafts and design |

### Key Mathematics Competence Areas (MAT)

**Grades 1-3 (Indskoling):**

**Tal og algebra (TA):**
- `FM.MAT.TA.1-3`: Udvikle forståelse for tal og mængder
- Tal — number sense, counting, place value
- Regnestrategier — addition, subtraction, early multiplication strategies

**Geometri og måling (GM):**
- `FM.MAT.GM.1-3`: Udforske geometriske begreber og måling
- Geometriske begreber — shapes, spatial sense
- Geometrisk tegning — drawing geometric figures
- Placeringer og flytninger — positions, movements
- Måling — measuring length, weight, time

**Statistik og sandsynlighed (SS):**
- `FM.MAT.SS.1-3`: Indsamle og organisere data
- Statistik — sorting, simple tables and graphs
- Sandsynlighed — early probability concepts

**Matematiske kompetencer (MK):**
- `FM.MAT.MK.1-3`: Udvikle matematisk tænkning og kommunikation
- Problembehandling — problem-solving
- Modellering — mathematical modeling
- Ræsonnement og tankegang — reasoning
- Repræsentation og symbolbehandling — representation and symbols
- Kommunikation — mathematical communication
- Hjælpemidler — tools and aids

### Key Dansk Competence Areas (DAN)

**Grades 1-2 (Trinforløb 1-2):**

**Læsning (LÆ):**
- `FM.DAN.LÆ.1-2`: Udvikle sikker afkodning og tekstforståelse
- Afkodning — decoding, letter-sound correspondence
- Ordforståelse — word comprehension
- Tekstforståelse — text comprehension

**Fremstilling (FR):**
- `FM.DAN.FR.1-2`: Udvikle skrivefærdigheder og tekstskabelse
- Håndskrift og layout — handwriting, letter formation
- Fremstilling — composing text

**Fortolkning (FO):**
- `FM.DAN.FO.1-2`: Opleve og fortolke tekster
- Oplevelse og indlevelse — engaging with stories
- Undersøgelse — exploring texts

**Kommunikation (KO):**
- `FM.DAN.KO.1-2`: Udvikle mundtlige og skriftlige kommunikationsfærdigheder
- Dialog — oral communication
- Krop og drama — body language, dramatic expression
- Sproglig bevidsthed — linguistic awareness

### Key Natur/teknologi Competence Areas (NT)

**Grades 1-2 (Trinforløb 1-2):**

**Undersøgelse (UN):**
- `FM.NT.UN.1-2`: Undersøge naturfaglige fænomener
- Organismer — living things, habitats
- Mennesket — the human body
- Vand, luft og vejr — water, air, weather

**Modellering (MO):**
- `FM.NT.MO.1-2`: Forstå sammenhænge i naturen
- Stof og energi — matter and energy
- Naturen lokalt og globalt — local and global nature

**Perspektivering (PE):**
- `FM.NT.PE.1-2`: Relatere naturfag til hverdagen
- Teknologi og ressourcer — technology and resources
- Natur og miljø — nature and environment

**Kommunikation (KO):**
- `FM.NT.KO.1-2`: Formidle naturfaglig viden
- Formidling — presenting findings
- Ordkendskab — subject vocabulary
- Faglig læsning og skrivning — subject-specific literacy

### Key Visual Arts Objectives (BK)
- `FM.BK.1-2`: Udforske visuelle udtryksformer og materialer

### Key Music Objectives (MU)
- `FM.MU.1-2`: Deltage i musikalske aktiviteter og udtrykke sig musisk

### Key Physical Education Objectives (IDR)
- `FM.IDR.1-3`: Udvikle grundlæggende motoriske færdigheder

### Key Crafts and Design Objectives (HD)
- `FM.HD.3-6`: Udvikle færdigheder i design, håndværk og materialeforståelse

---

## 3. Educational Vocabulary Guidelines

### Core Worksheet Terms

| Danish | English | Usage Context |
|--------|---------|---------------|
| opgave | task/exercise | Generic term for any worksheet activity |
| arbejdsark | worksheet | Printable worksheet (SEO-important) |
| øvelse | exercise | Practice activity |
| printbar | printable | Key SEO term for downloadable worksheets |
| generator | generator | For our app tools |
| opgaveark | exercise sheet | Individual sheet of exercises |
| farvelægning | coloring | Coloring activities |
| puslespil | puzzle | Puzzle activities |
| krydsord | crossword | Crossword puzzles |
| ordsøgning | word search | Word search activities |

### Pedagogical Terms

| Danish | English | Usage Context |
|--------|---------|---------------|
| tværfaglig | cross-curricular | Fælles Mål emphasis on integration |
| differentiering | differentiation | Adapting to learner levels |
| legende læring | playful learning | Core Danish pedagogy, especially indskoling |
| undersøgende undervisning | inquiry-based teaching | Exploratory teaching method |
| formativ evaluering | formative assessment | Continuous evaluation (no grades until 8. kl.) |
| inklusion | inclusion | All children learn together |
| holddannelse | ability grouping | Flexible grouping within classes |
| løbende evaluering | continuous evaluation | Legally mandated assessment approach |
| elevplaner | student plans | Individual development tracking |
| skole-hjem-samarbejde | school-home cooperation | Parent partnership emphasis |
| trivsel | well-being | Measured nationally every year |
| fællesskab | community | Social belonging, core Danish value |
| udeskole | outdoor school | Regular curriculum-based outdoor learning |

### Grade-Level Vocabulary

| Danish | Context |
|--------|---------|
| førskolebarn | preschool child (3-4 år) |
| børnehaveklassebarn | kindergarten child (5-6 år) |
| indskolingselev | lower primary student (0.-3. klasse) |
| 1. klasses elev | first-grade student |
| folkeskoleelev | public school student |
| i dagtilbuddet | in daycare/preschool setting |
| i børnehaveklassen | in kindergarten class |
| i indskolingen | in lower primary |

---

## 4. Cultural Adaptation Notes

### Danish Nature & Outdoor Culture
Danish education values friluftsliv (outdoor life) and udeskole (outdoor school). Content should reference:
- **Udeskole** — regular curriculum-based outdoor learning days (weekly/biweekly)
- **Bøgeskov** (beech forest) — Denmark's characteristic forest type
- **Strand** (beach) — 7,314 km coastline; beaches are central to Danish life
- **Fjorde** — Limfjorden, Roskilde Fjord; coastal landscapes
- **Naturlegepladser** — nature playgrounds in forests and parks
- **Årstiderne** — seasonal rhythm shapes educational themes (long dark winters, light summers)

### Danish Holidays & Seasonal References
- **Jul** (Christmas) — December, major celebration with julefrokost, advent traditions
- **Fastelavn** (Shrovetide) — February, carnival with costumes, slå katten af tønden
- **Påske** (Easter) — Spring, påskefrokost, decorated eggs
- **Sankt Hans** (Midsummer) — June 23, bonfires, singing
- **Grundlovsdag** (Constitution Day) — June 5, national holiday
- **Mortensaften** (St. Martin's Eve) — November 10, roast duck tradition
- **Luciadag** — December 13, processions with candles in schools
- **Første skoledag** — mid-August, ceremonial first day of school

### Danish Educational Practices
- **Legende tilgang** (play-based approach) — especially in børnehaveklasse and indskoling
- **Udeskole** — outdoor classroom as regular part of teaching, not an exception
- **Meddelelsesbog** (student report book) — school-home dialogue tool from 0.-9. klasse
- **Trivselsmåling** — national well-being measurement annually (januar-marts)
- **Formativ evaluering** — no formal grades until 8. klasse; verbal/written feedback
- **Fællesskab** — strong emphasis on social belonging and community
- **Morgensang** — morning assembly with communal singing (Danish tradition)
- **SFO** (Skolefritidsordning) — after-school care integrated with school

### Tone and Style
- Professional but warm; use "du/dig" (informal address, standard in Danish)
- Reference Danish nature, seasons, and coastal landscapes naturally
- Emphasize fællesskab (community), trivsel (well-being), and legende læring (playful learning)
- Avoid direct translations of American educational jargon (no "Common Core", "standards-based grading")
- Use Danish compound words naturally: dyreopgaver, matematikøvelser, bogstavlæring
- Reference Fælles Mål as the curriculum framework (not Common Core or POPS)

---

## 5. Anti-Cannibalization Keyword Patterns

Reference: Parts 204-205 keyword research validated all 333 DA pages with zero cannibalization.

### Product Pages (33 pages)
**Pattern:** `{app} generator`
**Examples:**
- "addition opgave generator"
- "malebog generator"
- "ordsøgning generator"

**Title format:** `Gratis {App} Generator til Børn | LessonCraftStudio`

### Theme Hub Pages (50 pages)
**Pattern:** `{tema}opgaver til børn`
**Examples:**
- "dyreopgaver til børn"
- "naturopgaver til børn"
- "transportopgaver til børn"

**Title format:** `Gratis {Tema}-opgaver til Børn | LessonCraftStudio`

### Theme+Grade Pages (250 pages)
**Pattern:** `{tema}opgaver {klassetrin}`
**Examples:**
- "dyreopgaver førskolebørn"
- "dyreopgaver børnehaveklassen"
- "dyreopgaver 1. klasse"
- "dyreopgaver 2. klasse"
- "dyreopgaver 3. klasse"

**Title format:** `{Tema}-opgaver {Grade} | LessonCraftStudio`

### Differentiation Rules
1. Product pages own the tool/generator keywords (`generator`)
2. Theme hubs own the broad theme + children keywords (`til børn`)
3. Grade pages own the theme + specific grade keywords (`{klassetrin}`)
4. Never duplicate the same primary keyword across page types

---

## 6. Fælles Mål Subject-to-Theme Mapping

### Matematik (MAT) — Primary for:
numbers, shapes

Secondary for most themes (counting, sorting, measuring, patterns):
addition, subtraction, multiplication, time, money, fractions, patterns

### Dansk (DAN) — Primary for:
alphabet, fairy-tales

Secondary for vocabulary-building themes:
animals, food, body, clothing, household, emotions, family, school, community

### Natur/teknologi (NT) — Primary for:
animals, nature, forest, ocean, birds, insects, pets, zoo, farm, garden, flowers, fruits, vegetables, weather, seasons, spring, summer, autumn, winter, camping, body, food, cooking, space, dinosaurs

### Billedkunst (BK) — Primary for:
colors

Secondary for creative/visual themes:
art, crafts, patterns, holidays (visual projects)

### Musik (MU) — Primary for:
music

### Idræt (IDR) — Secondary for:
sports, body, camping

### Håndværk og design (HD) — Secondary for:
construction, robots, vehicles, pirates (building activities)

### Cross-Curricular Themes (Tværfaglige)
Many themes naturally span multiple subjects. The Fælles Mål framework encourages tværfaglig undervisning (cross-curricular teaching), particularly in indskolingen:
- **animals**: NT (primary) + DAN (vocabulary) + MAT (counting) + BK (drawing)
- **seasons**: NT (primary) + DAN (seasonal texts) + MU (seasonal songs) + BK (seasonal art)
- **food**: NT (primary) + MAT (measuring, fractions) + DAN (recipes, reading)
- **fairy-tales**: DAN (primary) + BK (illustrations) + MU (songs) + NT (nature in stories)

---

*This strategy document guides all DA content work in Parts 207+.*
