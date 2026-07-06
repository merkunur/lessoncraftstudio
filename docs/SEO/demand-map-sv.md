# Swedish (sv) SEO demand map — single-axis topic pages + type×grade intersections

**Locale:** sv (google.se, hl=sv&gl=se) · **Generated:** 2026-07-06
**Author:** native Swedish SEO + lågstadielärare/förskollärare (NSR handled — this IS the native review)
**Companion data file:** `docs/SEO/demand-terms-sv.json`

**Inputs:** `docs/SEO/harvests/sv.json` (1 075 unique google.se autocomplete suggestions) · `deck-inventory-type-level.json` (sv) · `deck-inventory-themes.json` (sv) · `topics-taxonomy.json` (`.axes[*].<key>.name.sv`) · 16-query SERP sampling on google.se.

**Level map (sv):** 3-5 = **Förskola** (preschool) · 5-7 = **Förskoleklass** (kindergarten) · 6-8 = **Årskurs 1 / åk 1** (grade-1) · 7-9 = **Årskurs 2 / åk 2** (grade-2) · 8-10 = **Årskurs 3 / åk 3** (grade-3).
**⚠ Critical:** the platform's `kindergarten` tag = Swedish **förskoleklass** (age 6), NOT åk 1. Most decks (2 431) sit here.

---

## 0. Surface ownership (what THIS map targets)

| Surface | Owns | Status |
|---|---|---|
| Subject×grade hubs ("Arbetsblad i matematik åk 1 – gratis att skriva ut (PDF)") | subject + grade head demand | LIVE — **not this map** |
| Deck landings ("Arbetsblad [type] – [tema] \| skriva ut PDF gratis") | type+theme long-tail | LIVE — **not this map** |
| **Single-axis topic pages `/sv/topic/<slug>`** | **type-head** (ordsök, korsord, bildsudoku, skattjakt, labyrint, hitta föremålen, para ihop, första ljudet, hundraruta, tallinje…), **theme-head** (arbetsblad djur), **level-head** (arbetsblad förskoleklass) | **THIS MAP** |
| **type×grade intersections `/sv/topic/<type>/<level>`** | "addition förskoleklass", "klockan åk 2", "ordsök åk 1"… | **THIS MAP** |

Locked title convention (matches the sv-landning rekey pattern): the **format-trio `skriva ut` + `gratis` + `PDF`** is protected; on overflow, tighten OTHER qualifiers, never the trio. `online` is honest (worksheets play in the browser), `med facit` is honest (answer keys ship). Demand word FIRST. ≤51 char ideal / 65 hard max (root appends ` · LessonCraftStudio`).

---

## 1. Headline findings (Swedish-specific, decision-relevant)

1. **`ordsök`, not `ordleta`.** The taxonomy names wordsearch **"Ordleta"** (slug `ordleta`) but google.se autocomplete gives essentially nothing for "ordleta" (only "ordletare") while **"ordsök"** is the real demand word (SERP: skolbilder ordsök-generator, printables.se ordflätor, storyboardthat ordsök). **Recommendation: reconsider the taxonomy name / add an `ordsok` slug** — we are currently keyworded off the demand term. (Parallel to the German "Suchsel not Wortsuche" finding.)
2. **`vilken passar inte` (odd-one-out) is already WINNING.** LCS ranks **#1** for "vilken passar inte" at `/sv/topic/forskoleklass/vilken-passar-inte` (SERP 2026-07-06). The topic-page surface works — this is the proof-of-concept and the strongest moat page. Build out, don't rebuild.
3. **Three brutal intent traps** (never optimise the bare term):
   - **big-small → "stor eller liten"** is a **spelling** query ("stor/liten bokstav") — use `stor och liten` / `störst och minst` / storleksjämförelse.
   - **picture-sort → "sortera bilder"** is an **iPhone photo-management** query — use `sortera i kategorier` / `vad hör ihop`.
   - **measurement → "mätning"** is **opinion-poll / surveying** intent — use `mäta längd`.
   - Minor: picture-path → "bildväg" (wallpaper/crossword), missing-pieces → "saknade bitar" (lego), find-objects "objekt" (games). Always add a K-3 context qualifier.
4. **`lägesord förskola`** is a strong, clean teacher search that our prepositions decks match perfectly — SERP rivals (skolmagi, teachacademy) are **paid**, the free printable angle is open. Moat theme (11 languages). Keep prepositions ↔ position-words split: **prepositions = language/lägesord**, **position-words = matte-lägeord (rumsuppfattning)**.
5. **`bildsudoku`** is a clean WINNABLE niche — exact content match (4×4 picture sudoku), rivals are all paid/niche (skolmagi, klurigheterforbarn, teachacademy). Harvest has the exact word.
6. **`första ljudet`** — big, clean förskoleklass demand (skolmagi/teachingfuntastic/wordwall), but we have **only 10 decks**: the **largest literacy deck-gap**. Deck production here unlocks a whole demand family.
7. **The biggest UNSERVED math demand families** are hard-owned by Swedish incumbents AND thin in our catalog — **`tallinje`** (9 decks; NCM/skolmagi/teachacademy) and **`hundraruta`** (13 grade-1 decks; Majema/NCM/lärarhjälpen). Both are deck-gaps worth producing (the exercise angle beats the incumbents' blank-poster angle).
8. **`skattjakt`** demand is massively **barnkalas** (party) intent (zenframe, venuu, goodies) — our decks are puzzle worksheets, not party clue sets. Position honestly toward **åk 1 / skola**, never kalas.
9. **`klockan`** is a rich money-family (könig, lektionsbanken, skolmagi own the head); the **åk 2 and åk 3 intersections** are the winnable money-pages (harvest verbatim "klockan åk 2/3").
10. **`matteblad` / `matematik åk X`** must **DEFER to the subject×grade hubs** — do not title math-worksheet / science-sort topic pages against our own hubs.

---

## 2. Per-axis demand analysis — TYPE head (my primary surface)

Format: **type** — demand term (evidence) → winnability. Full title/H1/meta in the JSON.

### WINNING / WINNABLE (build first)
- **odd-one-out** — `vilken passar inte` (SERP, verbatim) → **WINNING** (LCS #1 already). Exact match, moat page.
- **shadow-match** — `matcha skuggor` (SERP thin) → **WINNABLE**. No dominant owner in the perception cluster; largest perception stock (94). Build best-in-class.
- **sudoku** — `bildsudoku` (SERP) → **WINNABLE**. Exact 4×4 content match; rivals paid.
- **wordsearch** — `ordsök` (SERP) → **WINNABLE** (but re-key off "ordsök", see §1).
- **prepositions** — `lägesord förskola` (SERP) → **WINNABLE**. Free-printable gap; moat theme.
- **cryptogram** — `kryptogram barn` (harvest) → **WINNABLE niche**. Themeless → topic page carries the demand alone.
- **matching / visual-matching** — `para ihop bilder förskolan` (SERP verbatim) → **MID/WINNABLE**. Split matching (logic-pairing) vs visual-matching (perception).
- **patterns / pattern-train / pattern-worksheet** — `mönster (förskola/förskoleklass/åk 1)` (harvest rich) → **WINNABLE**. Split: pattern-train = förskoleklass tåg (245 decks), pattern-worksheet = åk 1, patterns = generic. Don't double the förskoleklass qualifier.
- **visual-discrimination** — `visuell perception` (harvest verbatim) → **WINNABLE**. Cluster head → links to shadow-match/missing-pieces/odd-one-out/grid-match. Dyslexi/ergo audience searches hard.
- **crossword** — `korsord för barn` (SERP) → **HARD head** (gratiskorsord/kryss.se) but **WINNABLE** via *bilderkorsord* / early-reader angle + åk 2 intersection.

### MID (contextual angle needed)
- **find-objects** — `hitta föremål / leta och hitta` (harvest, part game-intent) → MID.
- **find-and-count** — `hitta och räkna` (harvest) → LOW-MID. Split from find-objects (this one COUNTS).
- **picture-path** — `labyrint barn` (harvest; "bildväg" is a trap) → MID.
- **bingo** — `bingo förskola` (harvest; "bingo" pur = bingolotto/casino) → MID. Use *bildbingo*.
- **big-small** — `stor och liten förskola` (harvest; bare term = spelling trap) → MID.
- **more-less / comparing-groups** — `fler eller färre` (harvest; "mer eller mindre" mixed) → MID. Split from comparing-numbers (< > = signs).
- **comparing-sizes** — `jämföra storlek förskola` (harvest verbatim) → MID niche.
- **word-guess** — `gissa ordet` (harvest, app/game intent) → LOW-MID print.
- **word-scramble** — `bokstavspussel att skriva ut` (harvest verbatim) → WINNABLE via åk 1.

### DECK-GAP (demand proven, stock too thin — recommend production)
- **first-ljudet / beginning-sounds** — `första ljudet förskoleklass` (SERP) → HARD demand, **10 decks** = biggest literacy gap.
- **tallinje / number-lines** — `tallinje 0-20/0-100/åk 1` (SERP) → HARD, **9 decks** = biggest math gap.
- **hundraruta / number-charts** — `hundraruta att skriva ut gratis` (SERP) → HARD, 13 grade-1 decks.
- **counting-frames** — `tiokompisar / tioram` (harvest) → 9 decks. **tally-counting** — `räkna med streck` → 4 decks. **comparing-numbers** — `jämföra tal` → 6 decks. **position-words** — `lägesord` → 8 decks. **visual-logic** — `logiska pussel barn` → 14 decks. **word-building** — `bygga ord av bokstäver` → 10 decks. **picture-vocabulary** — `bygga ordförråd` (SVA moat) → 10 decks.

### SKIP head / DEFER (no native term or hub-owned)
- **code-addition** (no term; rides addition), **grid-match** (no term; internal links), **math-worksheet** + **science-sort** (DEFER to subject×grade hubs), **science-sequence** (1 deck), **science-match** (10 decks, support), **picture-arithmetic** (all åk 1, lives on type page).

---

## 3. LEVEL head

| Level | sv term (slug) | decks | primaryQuery | winnability |
|---|---|---|---|---|
| preschool | Förskola (`forskola`) | 423 | `arbetsblad förskola gratis` | HARD (brainytoon, klassklur, förskoleburken); strengthen + link to sub-types |
| kindergarten | Förskoleklass (`forskoleklass`) | 2 431 | `arbetsblad förskoleklass` | HARD head; the distributor hub to förskoleklass intersections |
| grade-1 | Årskurs 1 (`arskurs-1`) | 569 | `matteuppgifter åk 1 skriva ut` | HARD; distributor to åk 1 intersections |
| grade-2 | Årskurs 2 (`arskurs-2`) | 168 | `matteuppgifter åk 2 skriva ut` | HARD; **thinnest core level (deck bottleneck)** |
| grade-3 | Årskurs 3 (`arskurs-3`) | 134 | `arbetsblad åk 3 skriva ut` | LOW priority (K-3 edge) |

Harvest confirms the whole grade-qualified family (`matteuppgifter åk 1/2 skriva ut/gratis`, `matte åk 1/2`, `arbetsblad förskoleklass`). The level pages are **distributors** to the type×grade intersections.

---

## 4. THEME head (top 26, seasonal EXCLUDED)

Harvest-backed themes rank first. Deck counts are exact sv totals from `deck-inventory-themes.json`.

**Harvest-verbatim (strongest):** animals `arbetsblad djur` (159, SERP) · kroppsdelar `kroppsdelar arbetsblad` (57) · yrken `yrken arbetsblad [åk 1]` (58) · blommor (56) · rymden `rymden arbetsblad / arbetsblad rymden åk 2` (58) · bondgårdsdjur `bondgården arbetsblad` (57) · former/shapes `former arbetsblad` (97) · känslor (52) · fåglar (51) · dinosaurier (45) · träd `svenska träd arbetsblad` (55) · musik (56) · väder (58) · färger/kläder (48/58, mostly *engelska* = language intent → own the Swedish/SVA angle).

**Echo/high-stock (no clean head term, ride deck-landings):** fruits (114), vehicles (112), toys (108), bakery (64), space, vegetables, zoo_animals, ocean_life (havsdjur), forest_creatures (skogens djur), pets (husdjur), insects_and_bugs, things_that_fly.

Notes: **shapes theme ≠ geometry type** — shapes = everyday form-recognition (förskola), geometry = school geometry (åk). Many themes (animals/farm/forest/birds/insects/tree/weather/space/body) are **naturkunskap (NO/SO) neighbours** and SVA-friendly. **Seasonal themes (jul, påsk, vinter, vår, sommar, 4 juli, thanksgiving, valentine) are EXCLUDED** — they belong to the seasonal-hub program (already live).

---

## 5. Intersection candidates (type×level ≥12 sv decks + harvest evidence)

41 shipped in the JSON (schema `key` = the two English axis-keys sorted alphabetically, joined `__`). Ranked by demand-quality × deck count. Highlights:

**Förskoleklass (kindergarten) money-pages:** addition (197, `addition förskoleklass`) · subtraction (193) · pattern-train (245, `mönster förskoleklass`) · picture-sort (154) · code-addition (145) · cryptogram (101) · sudoku (99, `bildsudoku förskoleklass`) · find-objects/word-guess (97) · missing-pieces/matching/shadow-match/prepositions (94-96) · odd-one-out (90, `vilken passar inte förskoleklass`) · picture-path (85, `labyrint`) · bingo (79) · math-worksheet (98) · chart-count/grid-match (50).

**Förskola (preschool):** more-less (145, `fler eller färre förskola`) · big-small (110, `stor och liten förskola`) · find-and-count (91, `hitta och räkna förskola`) · alphabet-train (77, `alfabetet förskola`) · comparing-sizes→förskoleklass (15).

**Åk 1 (grade-1):** math-puzzle (146, `mattepussel åk 1`) · treasure-hunt (99, `skattjakt åk 1`) · word-scramble (96, `bokstavspussel åk 1`) · pattern-worksheet (50, `mönster åk 1`) · wordsearch (49, `ordsök åk 1`) · telling-time (21, `klockan åk 1`) · picture-arithmetic (14) · number-charts (13, `hundraruta åk 1`) · graphing-data (12, `tabeller och diagram åk 1`) · measurement (12, `mäta längd åk 1`).

**Åk 2 (grade-2):** crossword (47, `korsord åk 2`) · telling-time (20, `klockan åk 2`) · fractions (34, `bråk åk 2`) · geometry (17, `geometri åk 2`) · arrays-multiplication (14, `multiplikation åk 2`).

**Åk 3 (grade-3):** telling-time (40, `klockan åk 3`) · fractions (34, `bråk åk 3`).

**Level-mismatch caveat (honesty):** addition/subtraction demand skews `åk 1` in the harvest but all our addition/subtraction decks are förskoleklass-tagged — the "addition åk 1" intersection is a **deck-gap**, not a page to fabricate. Titled at the true deck level (förskoleklass).

---

## 6. Recommended build order (topic pages)

1. **Ship the proven winners now:** odd-one-out (extend the already-#1 page), shadow-match, bildsudoku, prepositioner/lägesord, visuell perception cluster head + its children.
2. **Re-key wordsearch off `ordsök`** (taxonomy fix) then ship ordsök + `ordsök åk 1`.
3. **Money-family intersections:** klockan åk 2 / åk 3, korsord åk 2, mönster förskoleklass/åk 1, addition/subtraktion förskoleklass, bråk åk 2/3, geometri åk 2.
4. **Theme heads:** arbetsblad djur first (159 decks, no owner for the övnings-intent), then kroppsdelar/yrken/rymden/former/dinosaurier.
5. **Level distributors:** förskoleklass + åk 1 hubs linking down to the intersections.
6. **Flag to operator — deck production unlocks demand:** första ljudet (largest literacy gap, 10 decks), tallinje (9), hundraruta åk 2, tiokompisar, and åk 2 stock generally (thinnest core level).

---

## 7. SERP evidence log (google.se, 2026-07-06)

| Query | Verdict | Key rivals / signal |
|---|---|---|
| ordsök barn skriva ut gratis | WINNABLE | skolbilder-generator, printables.se, storyboardthat — no dominant K-3 owner; demand word = ordsök |
| korsord för barn att skriva ut gratis | HARD/WINNABLE | gratiskorsord.se, kryss.se own it; *bilderkorsord för barn som inte kan läsa* is the gap (Sydsvenskan minibladet) |
| bildsudoku barn skriva ut | WINNABLE | skolmagi/klurigheterforbarn/teachacademy all paid; exact 4×4 match |
| prepositioner lägesord förskola arbetsblad | WINNABLE | skolmagi/teachacademy paid, elevspel online; free-printable gap |
| första ljudet arbetsblad förskoleklass gratis | HARD demand | skolmagi/teachingfuntastic/wordwall; deck-gap (10 decks) |
| hundraruta att skriva ut gratis | HARD | Majema, NCM, lärarhjälpen, elevspel — mostly blank posters (exercise angle open) |
| arbetsblad förskola gratis skriva ut matematik | HARD/MID | brainytoon, klassklur, förskoleburken, skolmagi — fragmented, generous free content |
| klockan arbetsblad åk 2 skriva ut | HARD | könig, lektionsbanken, skolmagi, lektion.se — åk-intersection is the winnable slice |
| skattjakt barn skriva ut gratis ledtrådar | LOW (wrong intent) | zenframe/venuu/goodies = barnkalas party sets, not worksheets |
| tallinje arbetsblad åk 1 skriva ut gratis | HARD | NCM, skolmagi, teachacademy; deck-gap (9 decks) |
| arbetsblad djur förskola räkna | MID | skolmagi/brainytoon/teachacademy paid; "räkna och färglägg djuren" pattern; övnings-intent open |
| vilken passar inte … barn arbetsblad | **WINNING** | **LCS #1** at /sv/topic/forskoleklass/vilken-passar-inte |

---

## 8. Deferred / flagged for operator

- **Taxonomy re-key:** wordsearch `Ordleta`/`ordleta` → surface `ordsök` (we are keyworded off the demand term).
- **Deck production priorities** (unlock proven demand): första ljudet, tallinje, hundraruta (åk 2), tiokompisar/tioram, comparing-numbers, åk 2 stock overall.
- **Level-mismatch:** "addition/subtraktion åk 1" demand is real but decks are förskoleklass-tagged — deck-gap, not a page to fabricate.
- **`no`/`da` reuse:** the sv trap taxonomy (spelling-vs-size, foto-vs-sortera, poll-vs-mät) and the ordsök/lägesord/första-ljudet findings will partly transfer to the Nordic siblings — but each needs its own harvest + native review (do NOT cross-apply).

*Sources (SERP):* [gratiskorsord.se](https://www.gratiskorsord.se/utskrivbara-korsord-for-barn/) · [skolbilder ordsök-generator](https://www.skolbilder.com/ordsok-generator) · [skolmagi bildsudoku](https://skolmagi.nu/produkt/bildsudoku-4x4-sommar/) · [skolmagi lägesord](https://skolmagi.nu/product-tag/lagesord/) · [Majema hundraruta](https://majema.se/hundraruta) · [NCM matematikpapper](https://ncm.gu.se/matematikpapper) · [LCS vilken passar inte (#1)](https://www.lessoncraftstudio.com/sv/topic/forskoleklass/vilken-passar-inte) · [zenframe skattjakt](https://www.zenframe.no/sv/skattjakt-for-barn) · [könig klockan](https://xn--knig-5qa.se/material/klockan/)
