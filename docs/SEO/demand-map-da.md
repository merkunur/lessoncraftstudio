# Danish (da) demand map — LessonCraftStudio topic pages

**Author:** native-DK SEO + indskolingslærer / børnehaveklasseleder persona
**Date:** 2026-07-06
**Inputs:** `docs/SEO/harvests/da.json` (google.dk autocomplete, hl=da&gl=dk, 655 requests, 698 unique) · `docs/SEO/deck-inventory-type-level.json` (da) · `docs/SEO/deck-inventory-themes.json` (da) · `frontend/config/topics-taxonomy.json` (`.name.da`) · 15-query SERP sample.
**Machine deliverable:** `docs/SEO/demand-terms-da.json` (87 single-axis + 40 intersections).

> **Target surface:** single-axis topic pages `/da/topic/<slug>` + type×grade intersections. **NOT** the subject×grade hubs ("Matematikopgaver til 1. klasse …") and **NOT** the per-deck landings ("[type] – [tema] | opgaver til print PDF gratis") — those are live and own their long-tail.

---

## 0. Danish market reading (methodology + traps)

**Level lexicon (locked).** DK maps the platform levels to school reality:

| platform / inventory ageRange | DK term | notes |
|---|---|---|
| 3-5 | **børnehave** | daycare/preschool (3-5 år) |
| 5-7 | **børnehaveklasse** = **0. klasse** | mandatory first school year, 5-6 år. In DK "kindergarten"≠daycare — always say *børnehaveklasse* / *0. klasse* |
| 6-8 | **1. klasse** | |
| 7-9 | **2. klasse** | |
| 8-10 | **3. klasse** | |

**"indskoling"** = the DK umbrella for 0.–3. klasse; use it in body copy (it appears verbatim: "måling opgaver indskoling", "musik opgaver indskoling"). Denominator for all deck counts below = **published da decks** (2026-07-06 inventory).

**Harvest reading traps (measured, not assumed):**
- **The `typeGrade` seed class is largely German-leaked.** google.dk autocompleted seeds like `addition 1. klasse` with *German* results ("addition 1 klasse arbeitsblätter", "einführung"). Those are **NOT Danish demand** — I discarded them. The genuine Danish type×grade suggestions that survived: `skattejagt 1 klasse`, `krydsord 2. klasse / 1 klasse / 0 klasse`, `børnehave krydsord`, `tallinje 1 klasse`, `måling 1. klasse / 0 klasse`, `mønstre 1 klasse / 0 klasse`, `forlyd 0 klasse`, `ordforråd 1 klasse`, `sproglig opmærksomhed 0 klasse`, `brøker 2 klasse`.
- **Type-head pollution is severe** for several mechanics — these have NO clean Danish demand word and must ride internal links / adjacent long-tail, never a head bet:
  - `addition` → "additional / additionsreaktion / addition af brøker"
  - `kryptogram` → song lyrics, DJ, Sagrada Familia
  - `billedvej` (picture-path) → a street address in Nordhavn (100% noise)
  - `matchning` (matching) → job-matching / region jobcentre
  - `sortér billeder` (picture-sort head) → iPhone photo app
  - `find par` (visual-matching head) → parkering / partner / parterapeut
  - `mønsterark` / `mønstre` head → broderi / strik / scrapbooking / tapet
  - `stor eller lille` → kålsommerfugl / salamander / musik-terts
  - `manglende brikker` → Lego
  - `bingo` → bingo loco / banko / casino
  - `tæl billeder` → "tæl kalorier med billeder"
  - `sammenlign tal` → Excel
- **Clean high-value teacher/parent terms (use verbatim as the demand word):** `find og tæl`, `hvilken passer ikke`, `flest og færrest`, `tiere og enere`, `tallinje`, `hundredfelt`/`taltavle`, `forlyd`, `bogstavkendskab`, `sproglig opmærksomhed`, `ordforråd`, `lær klokken`, `præpositioner`/`forholdsord`, `ordsøgning`/`find ord`, `kryds og tværs`/`krydsord`, `skovens dyr`, `bondegårdsdyr`, `dinosaurer opgaver`.

**Honest qualifiers (always true on this platform):** `gratis`, `til print` / `til print (PDF)`, `online` (decks play in browser), `med facit` (answer keys ship). Danish closed compounds everywhere: **additionsopgaver, matematikopgaver, danskopgaver, bogstavkendskab, ordsøgning** — never split.

**Locked title patterns** (mirrors the live da landing pattern):
- single-axis type: `<Demand-ord> – opgaver til print (PDF)`
- single-axis theme: `Opgaver <Tema> – gratis til print`
- single-axis level: `Opgaver <niveau> – gratis til print (PDF)`
- intersection: `<Demand-ord> <niveau> – opgaver til print`

---

## 1. SERP landscape (15-query sample, .dk rivals)

The Danish free-print niche is **fragmented, not dominated** — a genuine opening. Recurring rivals:

| Rival | Strength | Weakness we exploit |
|---|---|---|
| **gratisskole.dk** | Biggest free-print library ("300 ark lær klokken", 8.000+ PDF, sudoku/krydsord). Owns `lær klokken`, `sudoku`, `taltavle` heads. | Dated pages, no interactive play, no theme×type long-tail, monolingual. |
| **legoglektie.dk** (Leg og Lektie) | Huge, tag-organized by trin/fag ("find ordene 1.-2. klasse", "tiere og enere", "forholdsord"). | Blog structure, weak per-coordinate SEO pages. |
| **farverigedage.dk** | "find ord", "sudoku for børn", "sudoku med dyr", "børnekrydsord". | Shop-first, mixes free/paid. |
| **printbar.alinea.dk** | Strong structured matematik ("tallinje", "enere og tiere", "find antal og marker på tallinje") — the real number-line owner. | Publisher-branded, no theme variety. |
| krydsord.dk / tankesport.dk / hyggeleg.dk / printland.dk / opgaverforborn.dk / skoleguf.com / skolemaelk.dk | Niche owners (krydsord, find ord online, 0.-klasse). | Narrow. |
| matematikfessor.dk / clio.me | Login platforms. | Rarely rank for **print** intent — not real competitors on our surface. |

**Per-query verdicts (evidence in JSON `winnability`):**

- **WINNABLE (SERP thin / no big owner / exact content-match):** `shadow-match` (find skyggen), `odd-one-out` (hvilken passer ikke), `prepositions` (forholdsord — K-3 image angle is a moat), `visual-discrimination` (find forskellen), `phonological-awareness` (sproglig opmærksomhed — clean 0.-klasse curriculum term), `beginning-sounds` (forlyd), `picture-vocabulary` (ordforråd, DSA audience), `graphing-data`, `shapes` (former).
- **HARD head, WINNABLE mid via intersections:** `telling-time` (lær klokken — gratisskole owns head), `crossword` (kryds og tværs), `wordsearch` (ordsøgning/find ord), `number-lines` (tallinje — printbar owns), `number-charts` (hundredfelt/taltavle), `arrays-multiplication` (gangetabel), `addition`/`subtraction` (head polluted + grundschool owners).
- **MID / niche:** `more-less`, `math-puzzle`, `picture-sort`, `pattern-train`, `pattern-worksheet`, `find-and-count`, `letter-knowledge`, `geometry`, `measurement`, most themes.
- **LOW / careful:** `treasure-hunt` (birthday-party intent dominates — be honest: our decks are route-puzzles, not party sets), `bingo` (billedbingo only), `word-guess` (game/app intent), `missing-pieces` (Lego), `alphabet-train` (toy intent).
- **SKIP head (no Danish search word → internal links only):** `code-addition`, `grid-match`, `picture-path` (billedvej = street), `cryptogram` (polluted + themeless), `matching` head.
- **DEFER-TO-HUB (belongs to subject×grade hubs, don't title against them):** `math-worksheet`, `science-sort`.

---

## 2. Deck-gaps (demand proven, inventory too thin for a strong page)

These have **clean verbatim Danish demand but < ~12 da decks** — flagged for deck-production, not a topic-page push yet. This is where the highest-ROI new-content lives:

| type | da decks | verbatim demand | note |
|---|---|---|---|
| **number-lines** (tallinje) | 9 | `tallinje til print`, `tallinje 1-20`, `tallinje 0-100` | **Largest unserved math family.** printbar owns; deck-production is the lever. |
| **beginning-sounds** (forlyd) | 10 | `forlyd opgaver`, `forlyd 0 klasse`, `forlydsopgaver` | **Largest literacy gap.** Would open the whole forlyd/indlyd/udlyd family. |
| **base-ten** (tiere og enere) | 12 | `tiere og enere opgaver`, `hvor mange tiere og enere` | Classic positionssystem topic; printbar/clio serve it. |
| **counting-frames** (tierramme) | 9 | `tierramme`, `tierrammer` | Clean lærer-intent. |
| **comparing-groups** (flest og færrest) | 8 | `flest og færrest opgaver` | Verbatim børnehaveklasse læreplansterm (emu.dk matematisk opmærksomhed). |
| **comparing-numbers** (sammenlign tal) | 6 | (head Excel-polluted) | Build with `<`,`>`,`=` framing. |
| **visual-matching** (find magen til) | 5 | (head "find par" polluted) | |
| **tally-counting** (tællestreger) | 4 | | |
| **picture-vocabulary** (ordforråd) | 10 | `ordforråd opgaver`, `ordforråd 1 klasse` | DSA moat (11 sprog); theme decks exist as raw material. |
| **letter-knowledge** (bogstavkendskab) | 20 | `bogstavkendskab opgaver` | Publishable now; grow. |

**Grade-coverage gaps surfaced by harvest:** `krydsord 1 klasse` demand but da crossword decks are all 2. klasse; `tallinje 2 klasse` demand but decks thin at that level.

---

## 3. Intersection candidates (top 40 — in JSON)

Criteria: (type × level) with **≥12 da decks** AND harvest/SERP evidence, honest qualifiers, no cannibalization, not defer-to-hub. Sorted-alphabetical English keys.

**Strongest (verbatim Danish type×grade demand + healthy inventory):**
1. `grade-1__treasure-hunt` — "skattejagt 1 klasse" (99 decks) ✅ verbatim
2. `crossword__grade-2` — "krydsord 2. klasse" (49) ✅ verbatim
3. `grade-1__pattern-worksheet` — "mønstre 1 klasse" (50) ✅ verbatim
4. `kindergarten__phonological-awareness` — "sproglig opmærksomhed 0 klasse" (25) ✅ verbatim, clean
5. `grade-1__telling-time` / `grade-2__telling-time` / `grade-3__telling-time` — "lær klokken indskoling" (21/20/40) ✅
6. `fractions__grade-2` — "brøker 2 klasse" (34) ✅ verbatim
7. `grade-1__measurement` — "måling 1. klasse" (12) ✅ verbatim
8. `grade-1__number-charts` — "hundredfelt/taltavle 1 klasse" (13) ✅

**Volume anchors (largest inventory, kindergarten=børnehaveklasse):** `kindergarten__pattern-train` (248), `kindergarten__picture-sort` (213), `addition__kindergarten` (196), `kindergarten__subtraction` (195), `kindergarten__odd-one-out` (103), `kindergarten__sudoku` (99), `kindergarten__prepositions` (99).

**Cannibalization guards applied:**
- **more-less vs comparing-groups vs comparing-sizes vs big-small** — split by framing: *more-less* = mængder uden tegn (børnehave); *comparing-groups* (flest og færrest) = flest/færrest no tegn (børnehaveklasse); *comparing-sizes* (størst og mindst) = ordn efter størrelse; *big-small* = stor/lille to-vejs.
- **patterns vs pattern-train** — the børnehaveklasse "mønstre 0 klasse" intersection is assigned to **pattern-train** (248 decks); the `patterns` key takes only the general mønster long-tail.
- **find-and-count vs find-objects** — *find og tæl* (with counting) vs *find tingene* (spot only).
- **prepositions vs position-words** — forholdsord = dansk/sprog; placering og retning = matematik.
- **wordsearch** carries BOTH demand words: *ordsøgning* + *find ord*.

---

## 4. Recommendations (ranked)

1. **Ship the WINNABLE clean-term single-axis pages first** — best-in-class pages where SERP is thin: `shadow-match` (find skyggen), `odd-one-out` (hvilken passer ikke), `prepositions` (forholdsord), `visual-discrimination` (find forskellen), `phonological-awareness` (sproglig opmærksomhed), `shapes` (former). These win now with existing inventory.
2. **Ship the 8 strongest intersections** (§3) — verbatim Danish grade demand + inventory ≥12.
3. **Commission deck-production for the §2 gaps** — `tallinje` (biggest math gap) and `forlyd` (biggest literacy gap) unlock whole demand families; then flip their intersections on.
4. **Never title against the subject×grade hubs** — `math-worksheet` and `science-sort` stay DEFER-TO-HUB.
5. **Rename consideration (taxonomy):** the type key `wordsearch` = **ordsøgning** and *also* **find ord** (both are the demand words); `matching` head "matchning" is unusable (job-matching) — the page must lead with *forbind billeder* / *find par*. Surfaced, not changed here.
6. **Seasonal themes excluded** from this map per brief (christmas/easter/winter/spring/summer/4th_of_july/thanksgiving) — they belong to the seasonal-hub programme. Non-seasonal theme pages (dyr, former, dinosaurer, følelser, rummet, fugle, bondegårdsdyr, skovdyr …) are authored in the JSON.

---

### Appendix — da deck inventory by type (2026-07-06)

Ordered by total da decks. Level keys: p=preschool/børnehave, k=kindergarten/børnehaveklasse, 1/2/3=klasse.

pattern-train 248 (k248) · picture-sort 213 (k213) · addition 196 (k196) · subtraction 195 (k195) · code-addition 150 (k150) · more-less 148 (p148) · math-puzzle 140 (1:140) · odd-one-out 103 (k103) · cryptogram 101 (k101) · sudoku 99 (k99) · treasure-hunt 99 (1:99) · prepositions 99 (k99) · math-worksheet 98 (k98) · word-scramble 97 (1:97) · word-guess 97 (k97) · find-objects 96 (k96) · shadow-match 95 (k95) · find-and-count 93 (p93) · missing-pieces 93 (k93) · big-small 93 (p93) · matching 93 (k93) · science-sort 90 (k60,1:30) · picture-path 88 (k88) · telling-time 81 (1:21,2:20,3:40) · bingo 77 (k77) · alphabet-train 74 (p74) · fractions 68 (2:34,3:34) · pattern-worksheet 50 (1:50) · chart-count 50 (k50) · wordsearch 49 (1:49) · crossword 49 (2:49) · grid-match 49 (k49) · geometry 37 (k6,2:17,3:14) · measurement 35 (k6,1:12,2:11,3:6) · number-charts 34 (k8,1:13,2:6,3:7) · arrays-multiplication 31 (k2,1:2,2:14,3:13) · graphing-data 28 (1:12,2:8,3:8) · counting-pictures 27 (k27) · phonological-awareness 25 (k25) · letter-knowledge 20 (k20) · patterns 17 (k15,1:2) · comparing-sizes 15 (k15) · visual-discrimination 15 (k15) · visual-logic 14 (k2,1:4,3:8) · picture-arithmetic 14 (1:14) · base-ten 12 (1:4,2:8) · word-building 10 (k10) · beginning-sounds 10 (k10) · science-match 10 (k10) · picture-vocabulary 10 (k10) · number-lines 9 (1:5,2:1,3:3) · counting-frames 9 (k7,1:2) · comparing-groups 8 (k6,1:2) · position-words 8 (k8) · comparing-numbers 6 (1:3,2:2,3:1) · visual-matching 5 (k5) · sorting-categories 4 (k2,1:2) · tally-counting 4 (k4) · science-sequence 1 (1:1).
