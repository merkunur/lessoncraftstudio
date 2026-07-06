# Norwegian (bokmål) demand map — single-axis topic pages + type×grade intersections

**Locale:** `no` (google.no, `hl=no&gl=no`) · **Author:** native bokmål SEO + småtrinn/barnehage lærer
**Sources:** `docs/SEO/harvests/no.json` (743 unique autocomplete suggestions, 2026-07-06) + 15-query live SERP sample (2026-07-06)
**Deliverables:** this map + `docs/SEO/demand-terms-no.json` (82 single-axis + 40 intersections)
**Surface owned here:** single-axis topic pages `/no/topic/<slug>` (TYPE-head, THEME-head, LEVEL-head) **and** type×grade intersections. NOT the subject×grade hubs ("Matteoppgaver 1. trinn …", LIVE) and NOT the per-deck landings (`/no/worksheets/<slug>`, own the type+theme long-tail).

---

## 0. The one thing that shapes the whole map: the Norwegian level mismatch

Norwegian children **start school at age 6** (1. trinn). Our taxonomy tags the great majority of decks **5-7 = kindergarten** ("Barnehage (5-7 år)" / skolestartere), yet the **demand for every math type is written "1 trinn"** ("addisjon oppgaver 1 trinn", "subtraksjon 1 trinn", "matteoppgaver 1 trinn"). Age 6 sits *inside* the 5-7 band, so the shipped no landing scaffold (`frontend/content/seo-landing/no.json`) already maps a 5-7 grid-match deck to `level: "1-trinn"`.

**Ruling for this deliverable (task mapping is authoritative):**

| age_range | English key | Norwegian label used | note |
|---|---|---|---|
| 3-5 | `preschool` | **barnehage** | |
| 5-7 | `kindergarten` | **skolestartere** (or *barnehage* where harvest literally says so) | school-starter / 1.trinn-forberedende |
| 6-8 | `grade-1` | **1. trinn** | |
| 7-9 | `grade-2` | **2. trinn** | |
| 8-10 | `grade-3` | **3. trinn** | |

- Intersections are grounded in the **actual deck bucket** so the page renders decks; a 5-7 math intersection is framed **"for skolestartere"** (a real harvest term — `oppgaver for skolestartere`), NOT "1. trinn" (which would be dishonest to a kindergarten-tagged deck AND would render zero decks under a grade-1 filter).
- **THE re-tag / deck-production fork:** the biggest math demand ("addisjon/subtraksjon 1 trinn") is only reachable at grade-1 (6-8), where we have **zero** addition/subtraction decks. Either (a) re-tag a slice of the 5-7 math decks to 6-8, or (b) produce grade-1 math decks. Flagged on `addition`, `subtraction`, `code-addition`.

---

## 1. SERP sample (15 queries, google.no, 2026-07-06) — winnability verdicts

The named rivals (matematikk.org, skolekassa, gruble.net, lærerbloggen) are weaker than feared: **matematikk.org** and **skolekassa.no** surface only on the hardest math heads; **gruble.net** and **lærerbloggen** did NOT surface on any sampled query. The real gatekeepers are a handful of Norwegian print-worksheet sites plus a lot of Pinterest/generator noise.

| # | Query | Top rivals | Verdict | Note |
|---|---|---|---|---|
| 1 | addisjon oppgaver 1 trinn utskrift gratis | matteoppgaver.com (exact-domain), spireserien.no, salaby, minskole | **HARD** head / WINNABLE mid | bilde+online angle; the "1 trinn" gap (decks at 5-7) |
| 2 | ordleting oppgaver for barn til utskrift | infobilder (generator), lekogskole, websincloud, Pinterest | **WINNABLE** | *no* dominant owner; "ordleting" pur = word-finding *disorder* noise → use "finn ord" |
| 3 | kryssord for barn til utskrift gratis | kryssordet.no, dagenskryssord.net/barn, kittysoppgaver | **MID-HARD** | dedicated kids-crossword sites exist; "bildekryssord" + 2.trinn is the opening |
| 4 | bildesudoku for barn utskrift | **all Swedish** (skolbilder, klurigheterforbarn, sudokus.se) | **WINNABLE** | no Norwegian owner for picture-sudoku; exact 4x4 match |
| 5 | preposisjoner oppgaver barnehage utskrift | Pinterest, bnorsk, scribd, learnnorsk (adult A1/A2) | **WINNABLE** | no strong K-3 owner; norsk-som-andrespråk moat |
| 6 | klokka oppgaver 2 trinn til utskrift | spireserien.no, kittysoppgaver, salaby, matematikksenteret | **HARD** head / WINNABLE mid | rich family; 2./3.trinn intersections are money |
| 7 | tallinje oppgaver 1 trinn utskrift | mathanvil, salaby, netteleven, undervisningsmetoder | **DECK-GAP** | huge demand, only 9 no decks — produce decks |
| 8 | finn fem feil for barn til utskrift | Pinterest, læringsverkstedet PDF, lirumlarumleg, enjoy.ly | **WINNABLE** *but mechanic mismatch* | our visual-discrim = find-same/odd, NOT spot-5-differences → don't over-claim |
| 9 | hvilken passer ikke / hvem skal ut | NTNU "Hvem skal ut?", gåte-sider | **WINNABLE** | "hvem skal ut?" is THE Norwegian classroom term; thin SERP |
| 10 | matteoppgaver 1 trinn gratis utskrift | ukemal.no (#1 exact "Matteoppgaver 1. trinn"), matteoppgaver.com, planetpsyd, salaby, skolekassa | **VERY HARD** | subject-hub territory (not ours) — confirms type×grade slice is the winnable one |
| 11 | skattejakt oppgaver for barn utskrift | 100% birthday-party (bursdag, rebusløp, uteaktiviteter) | **LOW** | our decks = puzzle-worksheets, not party hunts |
| 12 | geometri oppgaver 2 trinn utskrift | kittysoppgaver, skolekassa, matematikk.org, salaby | **MID** | geometry skews higher grades; 2.trinn slice thin-owned |
| 13 | bokstavspill for barn gratis utskrift | apps (Poio, GraphoGame), TPT, undervisningsbyen, ark | **LOW-MID** | "bokstavspill" head = letter-learning apps, not scramble |
| 14 | mønster oppgaver barnehage utskrift | websincloud, bnorsk, Pinterest førskole, lekogskole, undervisningsbyen | **WINNABLE** | fragmented, no owner |
| 15 | oppgaver barnehage til utskrift gratis | lekogskole.no (barnehage section), websincloud, bnorsk, HP | **MID** | lekogskole is a real but fragmented owner; interactivity+breadth angle |

**Best single-page opportunities (WINNABLE, exact content match, thin SERP):** `bildesudoku` (no NO rival), `hvem skal ut?` (odd-one-out), `finn ord/ordleting`, `preposisjoner barnehage` (moat), `shadow-match`, `mønster barnehage`, `visuell oppmerksomhet`.

**Rivals to design against:** matteoppgaver.com, ukemal.no, spireserien.no, kittysoppgaver.com, salaby.no, skolekassa.no, matematikk.org, kryssordet.no, lekogskole.no, undervisningsbyen.no.

---

## 2. TYPE-head analysis (57 exercise-type keys, all in the JSON `singleAxis`)

Native bokmål synonym set (closed compounds where natural):

| type | Norwegian demand-word (used) | avoid / noise |
|---|---|---|
| wordsearch | **finn ord / ordgitter** (taxonomy "ordleting") | "ordleting" pur = *ordletingsvansker* (afasi/demens/ADHD) |
| odd-one-out | **hvem skal ut?** (NTNU classroom term) | taxonomy "hvilken passer ikke" is weaker |
| crossword | **kryssord for barn / bildekryssord** | kryssordhjelpen (adult) |
| sudoku | **bildesudoku** | number sudoku |
| matching | **koble sammen** | "matching" = fashion (matching set) |
| more-less | **flere eller færre** | "mer eller mindre" = idiom/uttrykk |
| big-small | **stor eller liten (størrelse)** | "stor/liten bokstav" (rettskriving!) |
| find-and-count | **søk og tell** | "finn og tell" = *Finn Tells* (TV) |
| missing-pieces | **hva mangler** | "manglende brikker" = Lego |
| picture-sort | **sorter bilder** | "sorter bilder" = plant/photo app |
| addition | **addisjon / pluss** | — |
| telling-time | **lære klokka / klokka** | — |
| number-lines | **tallinje** | "sammenligne tall i excel" |
| number-charts | **hundrerute** | — |

**Type notes carried in the JSON (headlines):**
- **SKIP-head (no native term, ride internal links):** `code-addition` (kodeaddisjon), `grid-match` (rutenettmatch), `picture-path` (bildevei), `chart-count`.
- **DEFER-TO-HUB:** `math-worksheet` (matteark — owned by ukemal.no/hubs), `science-sort` (naturfag — own fag×trinn hub).
- **Moat themes (11 languages + images, thin native competition):** `prepositions`, `picture-vocabulary`, `phonological-awareness`, `sudoku` (bildesudoku), `odd-one-out` (hvem skal ut).
- **finn-fem-feil trap:** demand for "finn fem feil" is large but our `visual-discrimination` mechanic is find-same/odd, NOT spot-5-differences-between-two-scenes — framed as "visuell oppmerksomhet / finn forskjeller", the finn-fem-feil claim withheld (honesty rule).

---

## 3. THEME-head (evergreen only — seasonal EXCLUDED)

Seasonal themes **excluded** per task (jul/christmas, påske/easter, vinter, vår, sommer, 4th_of_july, thanksgiving, valentine — these belong to the seasonal-hub program). ~30 evergreen theme-pages authored; the JSON carries the top ~22 by no deck count with real harvest evidence where it exists.

**Harvest-verbatim themes:** dyr (animals 127), frukt+grønnsaker (fruits 113 / vegetables 59, "frukt og grønnsaker oppgaver"), kroppsdeler (57), klær (56, "klær og farger oppgaver"), farger (48), dinosaurer (57), følelser (52), musikk (54), yrker (58), former (96, "geometriske former oppgaver"), verdensrommet (58). **Echo/inventory (no direct harvest, strong appeal):** kjøretøy (110), leker (107), bakeri (101), blomster (74), havliv (58), kjæledyr (58).

Theme title pattern: **"Oppgaver <tema> – gratis til utskrift (PDF)"**; H1 warm + kid-facing. Themes are low-priority own-pages (traffic mostly via deck-landings) — but cheap to ship and good internal-link hubs.

---

## 4. LEVEL-head (5 pages)

| level | slug | primary demand | verdict |
|---|---|---|---|
| barnehage (preschool 3-5) | barnehage-3-5-ar | "oppgaver barnehage / for barnehagebarn / førskole oppgaver" | MID — lekogskole fragmented; breadth+interactivity angle |
| skolestartere (kindergarten 5-7) | barnehage-5-7-ar | "oppgaver for skolestartere" | MID — verbatim, thin SERP; the biggest deck pool |
| 1. trinn (grade-1 6-8) | 1-trinn | "oppgaver for 1 trinn" | HARD — matteoppgaver/ukemal/salaby; strengthen + distribute to intersections |
| 2. trinn (grade-2 7-9) | 2-trinn | "oppgaver for 2 trinn" | HARD — distributor page |
| 3. trinn (grade-3 8-10) | 3-trinn | "matteark 3.trinn" | LOW — K-3 edge, thin 3.trinn harvest; base maintenance only |

Level-heads are **distributor hubs** that link down to the type×grade intersections (that is where the winnable long-tail lives).

---

## 5. Intersection candidates (top 40, type×level, ≥12 no decks)

Selected by deck count + harvest evidence + honest grade fit. `level` = actual deck bucket (per §0). No cannibalization with subject×grade hubs (those are subject×grade; these are **type**×grade) or with the type-head pages (those target the bare type).

**True-grade aligned (6-8 / 7-9 / 8-10) — cleanest, demand and decks agree:**
- `pattern-worksheet × 1. trinn` (52) — "mønster 1 trinn / former og mønster 1 trinn" ✓ verbatim
- `crossword × 2. trinn` (48) — "kryssord 2. trinn" ✓ verbatim
- `telling-time × 2. trinn` (20) — "oppgaver klokka 2 trinn" ✓ verbatim · `× 3. trinn` (40) · `× 1. trinn` (21)
- `geometry × 2. trinn` (17) — "oppgaver geometri 2. trinn" ✓ verbatim · `× 3. trinn` (14)
- `measurement × 1. trinn` (12) — "oppgaver måling 1 trinn" ✓ verbatim
- `number-charts × 1. trinn` (13), `graphing-data × 1. trinn` (12), `picture-arithmetic × 1. trinn` (14), `science-sort × 1. trinn` (30)
- `arrays-multiplication × 2. trinn` (14) / `× 3. trinn` (13)
- `fractions × 3. trinn` (34) / `× 2. trinn` (34) — **but** Norwegian brøk demand skews 4.-8. trinn; K-3 slice is small
- `math-puzzle × 1. trinn` (142), `treasure-hunt × 1. trinn` (98), `word-scramble × 1. trinn` (96), `wordsearch × 1. trinn` (48)

**Kindergarten (5-7) giants — framed "skolestartere"/"barnehage" (re-tag fork on math):**
- `addition × skolestartere` (195), `subtraction × skolestartere` (193), `code-addition × skolestartere` (147)
- `pattern-train × barnehage` (245, "mønster oppgaver barnehage" ✓), `picture-sort × barnehage` (181), `odd-one-out × barnehage` (137, "hvem skal ut")
- `prepositions × barnehage` (98, verbatim ✓ — strongest), `sudoku × barnehage` (98, bildesudoku), `matching × barnehage` (92, verbatim ✓), `bingo × barnehage` (78, verbatim ✓)
- `find-objects` (95), `shadow-match` (93), `missing-pieces` (93), `word-guess` (96), `picture-path` (91), `phonological-awareness` (25, verbatim ✓)

**Preschool (3-5):**
- `more-less × barnehage` (146), `big-small × barnehage` (92, "stor eller liten barnehage" ✓), `find-and-count × barnehage` (93), `alphabet-train × barnehage` (69)

---

## 6. DECK-GAPS (demand present, inventory too thin for an intersection <12 decks)

Ordered by demand strength — these are **deck-production recommendations**, not pages to ship now:

1. **tallinje / number-lines** (9 decks) — *the single biggest unmet math demand* ("tallinje 0-20/0-100/oppgaver 1/2 trinn" is one of the richest harvest families). Rivals beatable. **Top production priority.**
2. **tierramme / counting-frames** (9) — "tierramme oppgaver" clean teacher intent.
3. **tellestreker / tally-counting** (4) — "tellestreker oppgaver".
4. **sammenligne tall / comparing-numbers** (6) + **sammenligne mengder / comparing-groups** (8).
5. **førstelyd / beginning-sounds** (10) — big "språklig bevissthet / første lyd" family (barnehage curriculum). Would open a whole literacy family.
6. **plasseringsord / position-words** (8), **finn par / visual-matching** (5), **logiske gåter / visual-logic** (14).
7. **tracing / skriveøvelser** — demand exists ("arbeidsark bokstaver / bokstavinnlæring / løkkeskrift / skrive tall") but **no tracing decks at all** (writing/drawing-lines apps are PDF-only, outside the 29). Product decision, not a landing task.

---

## 7. Cannibalization guards (locked)

- **Subject×grade hubs (LIVE)** own "Matteoppgaver 1. trinn", "Norskoppgaver 2. trinn" (subject-level). Intersections here are **type**×grade ("Klokka 2. trinn", "Kryssord 2. trinn") — distinct query face.
- **Type-head pages** target the bare type ("Lære klokka", "Kryssord for barn"); intersections add the grade. Distinct.
- **more-less vs comparing-groups:** more-less = "flere eller færre" (tegn-fri mengder, 3-5); comparing-groups = "sammenligne mengder". Keep separate lexicons.
- **big-small vs comparing-sizes:** big-small = stor/liten (3-5); comparing-sizes = ordne etter størrelse. Distinct verb.
- **patterns vs pattern-train:** barnehage-qualifier goes to `pattern-train` (245 decks) only — `patterns` does NOT double the barnehage angle.
- **find-and-count vs find-objects:** telling ("søk og tell") vs searching ("letebilde/vrimmelbilde").
- **prepositions vs position-words:** norsk/andrespråk-ord vs matte-ord (lagebeziehung).

---

## 8. Files
- `docs/SEO/demand-terms-no.json` — 82 singleAxis + 40 intersections; 0 dup titles / 0 dup metas; all metaDescriptions 120-170 chars, unique, content-specific; native bokmål; JSON keys = English axis-keys.
- This map.
