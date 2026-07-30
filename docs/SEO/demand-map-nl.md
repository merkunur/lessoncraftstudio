# Dutch (nl) demand map — subject×grade hubs (Execution Unit 2)

Source: native Dutch expert ensemble (linguist + K-3 educator + SEO/demand, §A.13.48), 2026-07-05. Operator-signed-off. Companion to the shipped hub engine (Unit 1, `0389568e`).

## Core demand facts
- **Head noun = `werkbladen`** (plural) — dominates every Dutch result set; `oefenbladen` = parent-register synonym (seed in body), `werkblaadjes` = a BE/Flanders signal.
- **Modifiers, in priority:** `gratis` (near-universal, highest intent) · `om uit te printen` / `printen` · `PDF` · `downloaden`.
- **Grade demand (ranked):** `groep 3` (the anchor — leren-lezen + leren-rekenen + Cito year) >> **`kleuters`** (the dominant umbrella for groep 1+2 — parents search "werkbladen kleuters" far more than "groep 1/2") > groep 4/5 (type-driven) > peuters (niche).
- **Title pattern (locked):** `{Vak} werkbladen {grade} – gratis om uit te printen (PDF)` — e.g. **"Rekenen werkbladen groep 3 – gratis om uit te printen (PDF)"**. Kleuter level titled **"kleuters"** (not "groep 1/2").

## Competitor landscape / moat
- **printwerkblad.nl** = the exact subject×grade rival (`/groep-3-rekenen-werkbladen/`, `/werkbladen-kleuters/`) — validates our structure.
- **wijzeroverdebasisschool.nl** (highest authority, owns grade toolkits + "oefenbladen"), **minipret.nl** ("gratis te printen"), **juf-milou.nl** (deep catalog, weak query-param URLs), kleuter blogs (jufsanne/kleuteridee) own kleuter+theme.
- **Don't fight the bare head terms** (werkbladen/rekenen groep 3) — entrenched. **Win on:** (a) **free interactive + PDF together** (every NL competitor is PDF-only; Squla/Junior Einstein paywall interactive — unoccupied position); (b) clean SSR type×grade + kleuter-subject mid-tail.

## Subjects → authentic Dutch structure (educator)
Only 3 clean vakken (**Rekenen / Taal(+Lezen) / Wereldoriëntatie-natuur**); **logic + spatial are NOT standalone Dutch subjects** (rekenen strands at groep 3+, kleuter developmental domains below). Formal vak names are wrong for kleuters (voorbereidend framing); "lezen kleuterklas" is flatly wrong (reading starts groep 3 → use "letters"). Peuterklas ≠ basisschool (drop).

## Locked decisions (operator) → the ~11 authentic nl hubs
Subjects (slug): Rekenen (`rekenen`), Taal (`taal`), Natuur (`natuur`), **Puzzelen** (`puzzelen`, logic — kleuter-only), **Waarnemen** (`waarnemen`, spatial — kleuter-only). **Authentic-narrow:** drop the peuterklas tier; Puzzelen+Waarnemen kleuterklas-only.

| Subject | Hubs (grade × deck count) |
|---|---|
| Rekenen | kleuters 706 · groep 3 237 · groep 4 121 · groep 5 126 |
| Taal | kleuters 445 (titled "Letters") · groep 3 146 · groep 4 47 |
| Natuur | kleuters 70 · groep 3 31 |
| Puzzelen | kleuters 712 |
| Waarnemen | kleuters 470 |

Dropped (authentic-narrow): peuterklas ×all (240 rekenen / 83 taal / 92 logica), Puzzelen/Waarnemen × groep 3+ (incl. waarnemen×groep-3 151), Taal×groep-5 (0).

## Query → hub owner
`rekenen groep 3` → Rekenen×groep-3 · `werkbladen kleuters` / `rekenen kleuters` → Rekenen×kleuters · `letters oefenen kleuters` → Taal×kleuters (H1 "Letters") · `lezen/taal groep 3`, `spelling groep 3` → Taal×groep-3 · `werkbladen groep 4` → the groep-4 hubs.

## Deferred gaps (record; not this unit)
- **BE/Flanders register** (`eerste leerjaar`, `derde kleuterklas`, `werkblaadjes`) — no groep page ranks for these. Seed BE synonyms in body/FAQ now; consider BE-alias hubs later.
- **`kleuters` umbrella hub** spanning groep 1+2 (the kleuterklas level hub already serves this — titled "kleuters").
- **Fine-grained type×grade hubs** (klokkijken, tafels groep 4, splitsen tot 10) — the highest-conversion moat; a later unit (re-title exercise-type hubs).
- Theme/seasonal kleuter demand (herfst/winter werkbladen kleuters) — owned by teacher blogs; out of subject×grade scope.

---

## Topic-page + intersection demand (2026-07-06 harvest)

**Method:** google.nl autocomplete harvest (`docs/SEO/harvests/nl.json`, 254 seed families / 1,384 unique suggestions) crossed against the live `nl` deck inventory (`deck-inventory-type-level.json`, `deck-inventory-themes.json`) + a 12-query SERP sample (WebSearch, 2026-07-06). **Target surface = single-axis topic pages `/nl/topic/<slug>` + type×grade intersections** — NOT the subject×grade hubs above (they own "rekenen werkbladen groep 3") and NOT deck landings (own type+theme long-tail). Machine-readable output: **`docs/SEO/demand-terms-nl.json`** (87 singleAxis + 33 intersections; all titles unique, ≤65c; metas 120-170c; JSON keys = English axis-keys).

### Core findings

1. **The Dutch type-noun is the ranking decision — most taxonomy names are already the demand word, a few are not.** Autocomplete shows which synonym Dutch parents/teachers actually type:
   - wordsearch: demand = **woordzoeker** (taxonomy already correct); the money is `woordzoeker groep 3/4` (10 suggestions each). SERP owner = **minipret.nl** (dominant on themed grade-woordzoekers).
   - crossword: **kruiswoordraadsel** (correct); head is generator/adult-intent (schoolplaten generator, kids-n-fun, puzzelstad).
   - find-objects: taxonomy "Objecten zoeken" but the harvest head = `objecten zoeken iphone` / `verborgen objecten zoeken` (hidden-object game-app intent). The honest, cleaner term is **zoekplaat** — display "objecten zoeken / zoekplaten" and never chase the app head.
   - find-and-count: demand = **zoek en tel** (correct; `+ tot 10/20`, Educo-line adjacency).
   - odd-one-out: demand = **wat/welke hoort er niet bij** (correct; kleuters-oefenen/mamaliefde/aduis own the niche).
   - sudoku: **foto-sudoku** — but the bare `foto sudoku` harvest is a solver-app phrase (photo -> solve), mostly foreign-language noise. Winnable only as exact kid-content ("foto-sudoku voor kleuters, 4x4").
   - shadow-match: no seed, but SERP shows the exact Dutch phrasing **"welke schaduw hoort bij het plaatje"** (kleuters-oefenen, jufmarije) — use it verbatim.

2. **Excel/tech/app pollution is the biggest Dutch head-noise class.** Many bare mechanic words are dominated by non-education intent and must ALWAYS carry a kid/grade qualifier:
   - `optellen` -> *optellen in excel*; `sorteren` -> *sorteren in excel*; `meten` -> *meten in google maps / met iphone*; `turven` -> *turven in excel/word*; `koppelen` -> *koppelen met windows/airpods*; `rooster koppelen` -> *agenda koppelen (iphone/outlook)*; `groepen vergelijken` -> *statistiek/SPSS/fietsgroepen*; `getallen vergelijken` -> *getallen vergelijken in excel*; `objecten zoeken` -> *iphone*; `patronen` -> *naaipatronen/kleding*; `breuken` -> *breuken vermenigvuldigen (groep 5-8)*; `grafieken lezen` -> *crypto/aandelen*.
   - `groot of klein` is fully polluted (auto-onderhoud, muziek-cryptogram); only `groot of klein kleuters` is clean.
   - `meer of minder` -> *meer of minder teken/vakantiegeld/werken*.

3. **Qualifier stack (honest, in priority):** `gratis` (near-universal) - `printen` / `uitprinten` - `pdf` - the grade/age word (`kleuters` / `groep 3` / `peuters`). `online` is genuine (decks play in-browser) but reserved for meta/body — the `/online` hubs own the "online oefenen / educatieve spelletjes online" class. Title pattern (locked): type-head -> `<Demand> – gratis werkbladen printen (PDF)`; theme -> `Werkbladen <thema> – gratis printen (PDF)`; level -> `Werkbladen <niveau> – gratis printen (PDF)`; intersection -> grade-trailing `<Demand> groep 3/4 – werkbladen printen`.

### NL market rivals (SERP-sampled 2026-07-06)

- **minipret.nl** — the dominant free-printable rival; owns themed grade-woordzoekers ("Dieren/Pasen/Lente Woordzoeker Groep 3-4"), theme werkbladen ("Dieren Werkbladen"), and `/groep-3-werkbladen` (142+). The single biggest wall on themes + grade-woordzoekers.
- **printwerkblad.nl / mamaliefde.nl** — kleuter/peuter werkbladen aggregators (also the subject×grade rivals above).
- **kleuters-oefenen.nl** — the niche owner for kleuter perception/logic mechanics ("wat hoort er niet bij", "welke schaduw hoort bij het plaatje", "zoek de verschillen").
- **klokblaadjes.nl / klokrekenen.nl** — klok-worksheet **generators** (own klokkijken head); **sommenprinter.nl / sommenmaker.nl** — reken/getallenlijn/honderdveld generators.
- teacher blogs: **jufmaike, juf-milou, jufsanne, jufmarije, kleuteridee** (tracing) - **zwijsen.nl** (Maan roos vis rekenpuzzels) - **squla.nl / junioreinstein** (grade toolkits) - **taal-oefenen.nl / k2-publisher** (voorzetsels) - **kids-n-fun / schoolplaten / depuzzelmaker** (puzzle generators).
- **Unoccupied position (the moat):** *free interactive + printable PDF together, per-locale/NT2* — every Dutch rival is PDF-only; Squla/Junior Einstein paywall interactive.

### Winnability verdicts (representative)

| Type / surface | Primary query | SERP owner class | Verdict |
|---|---|---|---|
| wordsearch | woordzoeker groep 3 | minipret (dominant) | **hard** head, winnable via themed grade-intersection |
| crossword | kruiswoordraadsel | generators + adult puzzle | **hard** head, mid via beeldkruiswoord + groep 4 |
| sudoku | foto-sudoku voor kleuters | myhomeschool-class, no owner | **winnable** niche (exact 4x4 kid content) |
| shadow-match | welke schaduw hoort bij het plaatje | kleuters-oefenen, jufmarije | **winnable** (largest perception pool, 95) |
| odd-one-out | welke hoort er niet bij | kleuters-oefenen/mamaliefde | **winnable** (exact match, 122 decks) |
| prepositions | voorzetsels kleuters | juf-milou/taal-oefenen/k2 (mid) | **winnable** — NT2 moat |
| picture-sort | sorteren kleuters | (head=Excel) | **winnable** (140 decks absorb 'sorteren kleuters') |
| bingo | bingo kleuters | bingo-generators own head | **winnable** via kleuter-intersection |
| math-puzzle | rekenpuzzel groep 3 | zwijsen/nvorwo (no owner) | **winnable** (147 decks) |
| telling-time | klokkijken werkbladen | klokblaadjes/klokrekenen generators | **hard** head, groep 3/4 intersections are the money-pages |
| measurement | meten groep 3 | mid | **winnable** (rich `meten groep N` family) |
| arrays-multiplication | keersommen groep 4 | tafel-generators | **hard** head, winnable via groep-4 intersection |
| addition/subtraction | optellen/aftrekken | K5-class equivalents + Excel head | **hard** — kleuter-intersection carries it |
| beginning-sounds | beginklank kleuters | jufsanne/zwijsen/kleuters-oefenen | **hard** + biggest literacy DECK-GAP (10 decks) |
| number-lines | getallenlijn werkbladen | sommenprinter/sommenmaker | **hard** + biggest math DECK-GAP (9 decks) |
| themes (dieren/fruit/…) | dieren werkbladen | minipret (dominant) | **hard** head; sub-themes (boerderij/dierentuin/bos) winnable |

### Intersection candidates (33 shipped; (type×level) with >=12 nl decks + harvest grade-evidence)

The money-pages, all with strong verbatim grade demand: **woordzoeker groep 3** (wordsearch×g1, 50) - **klokkijken groep 3 / groep 4 / groep 5** (telling-time, 21/20/40) - **keersommen groep 4** (arrays×g2, 14) - **meten groep 3** (measurement×g1, 12) - **rekenpuzzel groep 3** (math-puzzle×g1, 147) - **sorteren kleuters** (picture-sort, 140) - **bingo kleuters** (77) - **voorzetsels kleuters** (prepositions, 96) - **patronen groep 3** (pattern-worksheet, 50) & **patronen kleuters** (patterns, 15) - **meetkunde groep 4** (geometry×g2, 17) - **honderdveld groep 3** (number-charts×g1, 13). Plus solid-deck-backed pages at more modest grade-evidence (odd-one-out/shadow-match/find-objects/missing-pieces/sudoku/matching × kleuters; woordpuzzel groep 3; kruiswoordraadsel groep 4; zoek en tel/groot of klein/meer of minder × peuters; letterkennis/visuele waarneming × kleuters; keersommen/breuken groep 5).

### Level-tag mismatch (the recurring trap, same as `de`)

The biggest reken demand is `optellen/rekenwerkblad groep 3/4`, but **every nl addition/subtraction/math-worksheet deck is tagged 5-7 (kleuterklas)** — so the only available intersections are `optellen/aftrekken × kleuters` (weak query) while the groep-3 demand has no matching-level decks. Two options for the operator: (a) re-tag a slice of these decks to grade-1, or (b) defer to the subject×grade `rekenen groep 3` hub (which already owns that query). `rekenwerkblad` is fenced to the subject hub for this reason.

### Deck-production opportunities (demand present, content thin)

- **Tracing / voorbereidend schrijven** — HIGH demand (`schrijfoefeningen`, `voorbereidend schrijven`, `schrijfpatronen kleuters`; SERP kleuteridee/taal-oefenen/jufanke). **No landable page exists** — the writing/drawing-lines apps are PDF-only, outside the 29-app interactive catalog, so there is no tracing type-key. This is the single biggest un-served Dutch demand class; a deck-production decision, not a landing task.
- **beginklanken** (10 decks) — biggest literacy gap; rich demand across all levels.
- **getallenlijn** (9 decks) — biggest math gap; `getallenlijn tot 20/100 groep 3` is one of the strongest reken families.
- **tienraam** (9), **turven** (4), **getallen vergelijken** (6), **woorden bouwen** (10) — clean teacher-intent, thin content.

### Cannibalization fences (locked)

- **prepositions owns `voorzetsels`; position-words is CANNIBAL** (96 vs 8 decks) — position-words takes only the `positiewoorden` variant; no intersection.
- **picture-sort owns `sorteren kleuters`; sorting-categories** (4 decks) is absorbed — no separate push.
- **patterns (kleuters) / pattern-worksheet (groep 3) / pattern-train (trein)** split the patroon-demand by grade-word/format — never double.
- **big-small owns `groot of klein`; comparing-sizes owns `groottes vergelijken`.**
- **theme `vormen` owns "vormen werkbladen"; type `meetkunde` owns "meetkunde werkbladen".**
- **find-and-count owns the tel-vraag; find-objects owns the zoek-vraag (zoekplaat).**
- **The 5 seasonal themes (christmas/easter/winter/spring/summer) are owned by the seasonal hubs** — deliberately absent from singleAxis.
