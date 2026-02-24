# Swedish Localization Strategy (Lgr22 Curriculum Alignment)

> Reference document for all SV locale content implementation (Parts 272+).
> Created in Part 271 of Landing Page SEO Perfection.

---

## 1. Swedish Grade System Mapping

| LCS Grade | Swedish Term | Age | Lgr22 Level | Notes |
|-----------|-------------|-----|-------------|-------|
| preschool | Förskola | 3–4 år | Lpfö 18 (Läroplan för förskolan) | Play-based, separate curriculum |
| kindergarten | Förskoleklass | 5–6 år | Lgr22 Förskoleklass | Compulsory since 2018, bridge year |
| first-grade | Årskurs 1 | 6–7 år | Lgr22 Lågstadiet (åk 1–3) | Start of compulsory grundskola |
| second-grade | Årskurs 2 | 7–8 år | Lgr22 Lågstadiet (åk 1–3) | National assessments from åk 3 |
| third-grade | Årskurs 3 | 8–9 år | Lgr22 Lågstadiet (åk 1–3) | Nationella prov in Swedish & Math |

### Key Differences from NO/DA/FI Systems
- Swedish children start compulsory school at age 6 with förskoleklass (mandatory since 2018)
- Förskola (preschool, ages 1–5) follows its own curriculum: Lpfö 18 (Läroplan för förskolan 2018)
- Lgr22 (Läroplan för grundskolan 2022) replaced Lgr11 from July 2022
- Lgr22 organizes by centralt innehåll (central content) and kunskapskrav (knowledge requirements)
- Grades are called "årskurs" (abbreviated åk) — årskurs 1, årskurs 2, etc.
- Lågstadiet covers åk 1–3; mellanstadiet covers åk 4–6; högstadiet covers åk 7–9
- Betyg (formal grades A–F) are not given until årskurs 6; formativ bedömning (formative assessment) is used throughout lågstadiet
- Nationella prov (national tests) in Swedish and Mathematics from årskurs 3
- Fritidshem (leisure-time centre) is integrated with the school, not a separate after-school care system
- Swedish has one written standard (unlike Norway's bokmål/nynorsk split)
- No Sámi curriculum integration mandate comparable to Norway's LK20 (though Sweden recognizes Sámi as a national minority)

### Förskola (Lpfö 18) — Målområden (Goal Areas)
1. **Normer och värden** — Norms and values
2. **Omsorg, utveckling och lärande** — Care, development, and learning
3. **Barns delaktighet och inflytande** — Children's participation and influence
4. **Förskola och hem** — Preschool and home
5. **Övergång och samverkan** — Transitions and cooperation

---

## 2. Lgr22 Curriculum Standard Codes

### Code Format
`Lgr22.[Subject].[Central Content Area].[Grade Range]`

Example: `Lgr22.MA.TA.1-3` = Matematik, Taluppfattning och tals användning, åk 1–3

### Subject Area Codes

| Code | Swedish Name | English Name |
|------|-------------|--------------|
| **MA** | Matematik | Mathematics |
| **SV** | Svenska | Swedish (mother tongue) |
| **NO** | Naturorienterande ämnen (Bi, Fy, Ke) | Natural sciences (Biology, Physics, Chemistry) |
| **TK** | Teknik | Technology |
| **BL** | Bild | Visual arts |
| **MU** | Musik | Music |
| **IDH** | Idrott och hälsa | Physical education and health |
| **SO** | Samhällsorienterande ämnen (Ge, Hi, Re, Sh) | Social studies (Geography, History, Religion, Civics) |

### Key Mathematics Central Content and Knowledge Requirements (MA)

**Åk 1–3:**

**Taluppfattning och tals användning (TA):**
- `Lgr22.MA.TA.1-3`: Naturliga tal och deras egenskaper, samt hur talen kan delas upp
- Taluppfattning — number sense, counting, place value up to 1000
- Räknestrategier — addition, subtraction strategies
- Tabellkunskap — multiplication tables (introduced åk 2–3)
- Huvudräkning — mental arithmetic

**Algebra (AL):**
- `Lgr22.MA.AL.1-3`: Matematiska likheter och mönster
- Likhetstecknets betydelse — understanding the equals sign
- Enkla mönster — recognizing and continuing patterns
- Obekanta tal — unknown numbers in simple equations

**Geometri (GE):**
- `Lgr22.MA.GE.1-3`: Grundläggande geometriska objekt och symmetri
- Geometriska former — 2D and 3D shapes, spatial sense
- Symmetri — symmetry and reflection
- Skala och mätning — basic measurement of length, mass, volume, time

**Statistik och sannolikhet (SS):**
- `Lgr22.MA.SS.1-3`: Enkla tabeller och diagram
- Datainsamling — collecting and sorting data
- Stapeldiagram — bar charts and simple tables
- Jämförelser — comparing quantities and frequencies

### Key Swedish (Svenska) Central Content and Knowledge Requirements (SV)

**Åk 1–3:**

**Läsa och skriva (LS):**
- `Lgr22.SV.LS.1-3`: Lässtrategier och skrivstrategier
- Avkodning — decoding, phonics, letter-sound correspondence
- Läsförståelse — reading comprehension strategies
- Handstil — handwriting, letter formation
- Stavning — spelling, basic orthography

**Tala, lyssna och samtala (TL):**
- `Lgr22.SV.TL.1-3`: Att lyssna och återberätta
- Muntlig framställning — oral presentation
- Samtal — conversation, turn-taking
- Berättande — storytelling

**Språkbruk (SB):**
- `Lgr22.SV.SB.1-3`: Språkets struktur
- Bokstavskunskap — letter knowledge, alphabet
- Ordförråd — vocabulary building
- Meningsbyggnad — sentence structure

### Key Natural Sciences Central Content (NO — Bi, Fy, Ke)

**Åk 1–3:**

**Biologi (Bi):**
- `Lgr22.NO.Bi.1-3`: Djur och växter i närmiljön
- Livscykler — life cycles of animals and plants
- Ekosystem — local ecosystems and habitats
- Kropp och hälsa — the human body and health

**Fysik (Fy):**
- `Lgr22.NO.Fy.1-3`: Krafter, rörelse och energi i vardagen
- Vardagsfysik — forces and movement in daily life
- Ljud och ljus — sound and light
- Väder — weather phenomena

**Kemi (Ke):**
- `Lgr22.NO.Ke.1-3`: Materians egenskaper och förändringar
- Material — properties of materials
- Blandningar — mixtures and solutions

### Key Technology Central Content (TK)
- `Lgr22.TK.1-3`: Teknik i vardagen och enkla konstruktioner
- Vardagsteknik — technology in everyday life
- Konstruktion — building and designing simple objects
- Digitala verktyg — basic digital tools

### Key Visual Arts Objectives (BL)
- `Lgr22.BL.1-3`: Bildframställning, redskap och tekniker
- Bildframställning — creating images with various techniques
- Visuell kommunikation — visual communication and expression
- Bildanalys — analyzing images and visual culture

### Key Music Objectives (MU)
- `Lgr22.MU.1-3`: Musicerande och musikskapande
- Musicerande — singing, playing instruments
- Musikskapande — creating musical expressions
- Musiklyssnande — active listening

### Key Physical Education Objectives (IDH)
- `Lgr22.IDH.1-3`: Rörelse, friluftsliv och hälsa
- Rörelseaktiviteter — movement activities, motor skills
- Friluftsliv — outdoor activities in nature
- Hälsa och livsstil — health awareness
- Lekar och spel — games and cooperative play

---

## 3. Educational Vocabulary Guidelines

### Core Worksheet Terms

| Swedish | English | Usage Context |
|---------|---------|---------------|
| övning | exercise | Generic term for any worksheet activity |
| arbetsblad | worksheet | Printable worksheet (SEO-important) |
| övningsblad | exercise sheet | Individual sheet of exercises |
| utskrivbar | printable | Key SEO term for downloadable worksheets |
| generator | generator | For our app tools |
| färgläggning | coloring | Coloring activities |
| pussel | puzzle | Puzzle activities |
| korsord | crossword | Crossword puzzles |
| ordletare | word search | Word search activities |
| labyrint | maze | Maze activities |
| arbetsuppgift | task/assignment | School-style assignment |

### Pedagogical Terms

| Swedish | English | Usage Context |
|---------|---------|---------------|
| centralt innehåll | central content | Lgr22 curriculum content areas |
| kunskapskrav | knowledge requirements | Lgr22 assessment criteria |
| förmågor | abilities/competencies | Lgr22 subject-specific abilities |
| formativ bedömning | formative assessment | Ongoing assessment without formal grades |
| differentiering | differentiation | Adapting tasks to different ability levels |
| inkludering | inclusion | Inclusive education practices |
| lekbaserat lärande | play-based learning | Core approach in förskola and förskoleklass |
| multimodalt lärande | multimodal learning | Learning through multiple modalities |
| undervisning | teaching/instruction | General teaching term |
| läroplan | curriculum | Refers to Lgr22 or Lpfö 18 |
| bedömningsstöd | assessment support | Tools for teacher assessment |
| digitala verktyg | digital tools | Technology in education |
| extra anpassningar | additional adaptations | First-level support for students needing help |
| särskilt stöd | special support | Formal support requiring decision from rektor |

### Grade-Level Vocabulary

| Swedish | Context |
|---------|---------|
| förskolebarn | preschool child (3–5 år) |
| förskoleklasselev | förskoleklass student (6 år) |
| lågstadieelev | lower primary student (åk 1–3) |
| grundskoleelev | primary school student (general) |
| elev | student/pupil (general, åk 1+) |
| barn | child (general, especially younger ages) |
| i förskolan | in preschool |
| i förskoleklassen | in förskoleklass |
| på lågstadiet | in lower primary |
| i grundskolan | in primary school |

---

## 4. Cultural Adaptation Notes

### Swedish Nature & Outdoor Culture
Swedish education values friluftsliv (outdoor life) and utomhuspedagogik (outdoor pedagogy). Content should reference:
- **Allemansrätten** (right of public access) — freedom to roam in nature; fundamental Swedish value
- **Friluftsliv** — outdoor recreation deeply embedded in Swedish identity and education
- **Utomhuspedagogik** — outdoor pedagogy; many schools use regular outdoor learning sessions
- **Skog** (forest) — Sweden is 70% forest; central to friluftsliv and nature education
- **Skärgård** (archipelago) — coastal culture unique to Sweden
- **Fjäll** (mountains) — northern Swedish mountain landscapes
- **Midnattssol** (midnight sun) and **mörker** (polar darkness) — shape life in northern Sweden
- **Stuga** (cabin) — cabin culture central to Swedish outdoor life and family traditions
- **Fika** — coffee/snack break culture; deeply social tradition in Swedish life and workplaces

### Swedish Holidays & Seasonal References
- **Midsommar** (Midsummer) — June, Sweden's most iconic celebration; midsommarstång (maypole), blomsterkransar (flower crowns), sill och potatis (herring and potatoes), dans och lekar (dancing and games)
- **Jul** (Christmas) — December, major celebration with julafton (Christmas Eve), julbord, Kalle Anka (Donald Duck at 3 PM), tomte, pepparkakor, lussekatter
- **Lucia** (Saint Lucy's Day) — December 13, luciatåg (Lucia processions) in schools and communities; lussekatter och pepparkakor
- **Påsk** (Easter) — Spring, påskkärring (Easter witches), ägg and kyckling decorations, påskris (birch twigs with feathers)
- **Nationaldagen** (National Day) — June 6, Swedish flag day; school celebrations
- **Kanelbullens dag** — October 4, celebrating Swedish cinnamon bun tradition
- **Första skoldagen** — mid-August, ceremonial first day of school
- **Valborgsmässoafton** (Walpurgis Night) — April 30, bonfires and spring songs welcoming spring
- **Alla helgons dag** — first Saturday in November, remembrance of the dead

### Swedish Educational Practices
- **Förskoleklass** — compulsory since 2018 for 6-year-olds; bridge between förskola and grundskola
- **Fritidshem** (leisure-time centre) — integrated with the school; provides before/after school activities for åk F–3
- **Extra anpassningar** — first-level support within regular teaching; no formal decision needed
- **Särskilt stöd** — formal special support requiring decision from rektor and an åtgärdsprogram (action plan)
- **Formativ bedömning** — no formal grades (betyg) until årskurs 6; ongoing formative assessment throughout lågstadiet
- **Nationella prov** — national tests in Swedish and Mathematics from årskurs 3
- **Skolverket** — Swedish National Agency for Education; publishes Lgr22 and assessment materials
- **Digitalisering** — digital competence is integrated across all subjects in Lgr22
- **Läroplanen Lgr22** — replaced Lgr11 from July 2022; clearer central content, strengthened knowledge requirements

### Tone and Style
- Professional but warm; use "du" (informal address, standard in Swedish)
- Reference Swedish nature, forests, archipelago, and seasons naturally
- Emphasize lekbaserat lärande (play-based learning), formativ bedömning (formative assessment), and differentiering (differentiation)
- Avoid direct translations of American educational jargon (no "Common Core", "standards-based grading")
- Use Swedish compound words naturally: djurövningar, matematikarbetsblad, bokstavsinlärning
- Reference Lgr22 (Läroplan för grundskolan 2022) as the curriculum framework
- Use standard Swedish consistently (rikssvenska)
- Avoid Norwegian/Danish cognates that differ in Swedish (e.g., NO "oppgave" → SV "övning/uppgift", NO "arbeidsark" → SV "arbetsblad")

---

## 5. Anti-Cannibalization Keyword Patterns

Reference: Part 270 keyword research validated all 464 SV pages with 333 unique primary keywords and zero cannibalization.

### Product Pages (33 pages)
**Pattern:** `{app} generator`
**Examples:**
- "additionsövning generator"
- "målarbilder generator"
- "ordletare generator"

**Title format:** `Gratis {App} Generator | LessonCraftStudio`

### Theme Hub Pages (50 pages)
**Pattern:** `{tema}övningar barn`
**Examples:**
- "djurövningar barn"
- "naturövningar barn"
- "transportövningar barn"

**Title format:** `Gratis {Tema}övningar för Barn | LessonCraftStudio`

### Theme+Grade Pages (250 pages)
**Pattern:** `{tema}övningar {årskurs}`
**Examples:**
- "djurövningar förskolebarn"
- "djurövningar förskoleklass"
- "djurövningar årskurs 1"
- "djurövningar årskurs 2"
- "djurövningar årskurs 3"

**Title format:** `{Tema}övningar {Grade} | LessonCraftStudio`

### Blog Posts (112 pages)
**Pattern:** `{ämne} guide/tips/hur`
**Examples:**
- "ADHD visuella arbetsblad"
- "montessori arbetsblad"

### Category Hubs (8 pages)
**Pattern:** `{kategori} arbetsblad lärare`
**Examples:**
- "matematik arbetsblad lärare"

### Grade Hubs (5 pages)
**Pattern:** `{årskurs} arbetsblad gratis`
**Examples:**
- "förskola arbetsblad gratis"

### Differentiation Rules
1. Product pages own the tool/generator keywords (`generator`)
2. Theme hubs own the broad theme + children keywords (`barn`)
3. Grade pages own the theme + specific grade keywords (`{årskurs}`)
4. Blog posts own informational/guide keywords (`guide`, `tips`, `hur`)
5. Category hubs own the teacher-oriented keywords (`lärare`)
6. Grade hubs own the grade-level broad keywords (`arbetsblad gratis`)
7. Never duplicate the same primary keyword across page types

---

## 6. Lgr22 Subject-to-Theme Mapping

### Matematik (MA) — Primary for:
numbers, shapes

Secondary for most themes (counting, sorting, measuring, patterns):
addition, subtraction, multiplication, time, money, fractions, patterns

### Svenska (SV) — Primary for:
alphabet, fairy-tales

Secondary for vocabulary-building themes:
animals, food, body, clothing, household, emotions, family, school, community

### Naturorienterande ämnen (NO — Bi, Fy, Ke) — Primary for:
animals, nature, forest, ocean, birds, insects, pets, zoo, farm, garden, flowers, fruits, vegetables, weather, seasons, spring, summer, autumn, winter, camping, body, food, cooking, space, dinosaurs

### Teknik (TK) — Primary for:
robots, construction

Secondary for:
transportation, space, cooking (kitchen tools)

### Bild (BL) — Primary for:
colors

Secondary for creative/visual themes:
art, crafts, patterns, holidays (visual projects)

### Musik (MU) — Primary for:
music

### Idrott och hälsa (IDH) — Secondary for:
sports, body, camping

### Samhällsorienterande ämnen (SO — Ge, Hi, Re, Sh) — Secondary for:
holidays, community, jobs, travel

### Cross-Curricular Integration
Many themes naturally span multiple subjects. Lgr22 encourages ämnesövergripande arbete (cross-curricular work) and identifies several övergripande perspektiv (overarching perspectives):

**Hälsa och livsstil:**
- body, food, cooking, emotions, sports — health and well-being
- camping, nature, garden — friluftsliv and outdoor health

**Hållbar utveckling (Sustainable development):**
- nature, ocean, forest, weather, seasons — environmental awareness
- animals, birds, insects, garden — biodiversity and ecosystems
- farm, food, fruits, vegetables — sustainable food production

**Digitalisering:**
- robots, construction — technology and digital creation
- patterns, numbers — computational thinking

**Normer och värden (Norms and values):**
- emotions, community, school — empathy and social skills
- jobs, family — understanding society and responsibility

### Cross-Curricular Theme Examples
- **animals**: NO/Bi (primary) + SV (vocabulary) + MA (counting) + BL (drawing)
- **seasons**: NO/Bi (primary) + SV (seasonal texts) + MU (seasonal songs) + BL (seasonal art)
- **food**: NO/Ke (primary) + MA (measuring, fractions) + SV (recipes, reading)
- **fairy-tales**: SV (primary) + BL (illustrations) + MU (songs) + NO (nature in stories)
- **camping**: NO + IDH (primary) + MA (measuring, maps) + SV (outdoor vocabulary)
- **robots**: TK (primary) + MA (programming patterns) + BL (design) + SV (instructions)
- **construction**: TK (primary) + MA (geometry, measuring) + BL (design) + NO/Fy (forces)

---

*This strategy document guides all SV content work in Parts 272+.*
