# English (en) demand map — topic pages + type×grade intersections

**Purpose:** map real US K-3 search demand → the single-axis topic pages (`/en/topic/<type|theme|level>`) and the new type×grade intersection surface, with locked title/meta patterns and per-key recommendations. Companion machine-readable file: **`docs/SEO/demand-terms-en.json`** (94 singleAxis keys + 38 intersections, every query verbatim-grounded, every title unique, all lengths validated).

**Method:** (1) `docs/SEO/harvests/en.json` — 3,653 unique real Google-autocomplete queries (US market, harvested 2026-07-06; 481 seeds across core/types/typeGrade/themes/subjects/online/alphabet classes) filtered per axis key with synonym sets; (2) live deck inventory (`deck-inventory-type-level.json`, `deck-inventory-themes.json`): en = 59 exercise-type keys / 4,568 decks (K 3,031 · preschool 671 · G1 566 · G2 166 · G3 134), 52 theme tags; (3) 18 live SERP samples via WebSearch (2026-07-06) across query classes. No invented volumes — demand is evidenced by autocomplete presence + formulation density; winnability by observed SERP composition. Date: 2026-07-06.

---

## 1. Core findings — how the US market formulates these queries

1. **The qualifier stack is `free` / `printable` / `pdf`, in that order of attachment.** Across every worksheet-class seed the autocomplete tail is `<term> worksheets` → `+ for <grade>` → `+ free` → `+ printable` → `+ pdf` (often stacked: "word search kindergarten free printable", "odd one out worksheet pdf free download"). All three are honest for LCS. This drives the locked title trailer "– Free Printable PDF".
2. **Grade attaches to the TYPE, not the reverse.** Dominant word orders: "`<type>` worksheets for kindergarten" and "`<type>` `1st grade` / `2nd grade`" (grade-trailing for word search, telling time, fractions, geometry: "word search 1st grade", "telling time worksheets grade 1"). "Kindergarten `<type>`" order exists but is secondary (exception: "kindergarten cryptogram", "kindergarten crossword puzzle"). Titles follow the dominant order per key.
3. **Grade-1 out-queries kindergarten.** Harvest grade mentions: grade-1 547 · kindergarten 522 · preschool 384 · grade-2 305 · grade-3 54. But the deck inventory is kindergarten-heavy (3,031 vs 566 G1). The G1 intersections (word search, math puzzle, telling time, patterns, word scramble, science) are therefore disproportionately valuable.
4. **Several internal axis names have ZERO demand; the demand lives under a different term.** Re-key list (§6): find-objects→"hidden objects", missing-pieces→"missing parts", code-addition→"secret code math", letter-knowledge→"letter recognition", forest_creatures→"forest animals", ocean_life→"ocean animals". Conversely grid-match, visual-matching, chart-count, picture-trail (~), pattern-train (~) have near-zero demand under ANY formulation — SKIP class.
5. **Demand/content mismatches both ways.** Demand-rich but deck-poor (deck-production candidates): tally marks (68 queries / 4 decks), number lines (67/9), comparing numbers (56/6), base ten (46/12), ten frames (49/9), beginning sounds (50/10), word building (45/10). Deck-rich but demand-poor: grid-match (152 decks/~0), pattern-train (257/1), picture-trail (98/1), find-and-count preschool (333 decks, no preschool-qualified query).
6. **"i spy" did NOT surface** despite being the natural synonym for find-and-count/find-objects — the harvest had no i-spy seed. Re-harvest with `i spy` + `syllable` + `count and graph` seeds before chasing those heads (flagged in JSON notes).
7. **ESL is a real secondary intent on theme pages.** Theme tails carry "esl" ("toys worksheets esl kids", "around the house esl worksheet", "zoo animals worksheet esl"). LCS theme decks fit this intent well (picture-vocabulary substance); body copy can serve it without title changes.
8. **"online/interactive" class is owned elsewhere.** "interactive worksheets", "online games for kindergarten" etc. are platform-head queries (SplashLearn/education.com/LiveWorksheets own them — SERP-sampled) and LCS's `/topic/<subject>/<grade>/online` hubs already target the online class. Topic pages keep "printable/PDF" in titles and mention play-online in metas only.

## 2. SERP winnability sampling (18 queries, 2026-07-06)

Verdicts: **WINNABLE** = top-5 is niche blogs/Pinterest/scribd-class, no dedicated authority hub. **HARD** = education.com / K5 Learning / Superstar / Twinkl / ABCmouse-class own the top-5. **SKIP** = intent mismatch.

| # | Query (class) | Top-5 observed | Verdict |
|---|---|---|---|
| 1 | picture sudoku for kids printable (type-head) | myhomeschoolmath, superstarworksheets, Pinterest, shutterstock, preschool-printable-activities | **WINNABLE** — no authority owner |
| 2 | cryptogram worksheets for kids (type-head) | TPT, easyteacherworksheets, superstarworksheets, allkidsnetwork, teach-nology | **WINNABLE** |
| 3 | odd one out worksheets for kindergarten (type+grade) | megaworkbook, wonjo.kids, wunderkiddy, rvappstudios, lessonplanet | **WINNABLE** — thinnest SERP sampled |
| 4 | addition worksheets for kindergarten (type+grade head) | K5 Learning, TPT, ABCmouse, Canva, Superstar | **HARD** — page still warranted (231 decks), expect long-tail entry only |
| 5 | word search 1st grade free printable (type+grade) | K5, cool2bkids, treevalleyacademy, education.com, 123homeschool4me, SplashLearn | **HARD** (mixed) — mid blogs interleave the authorities; winnable at the pdf/sight-word tails |
| 6 | shadow matching worksheets pdf (type-head) | eslvault, printxoxo, scribd, TPT, learngrowaspire, Etsy | **WINNABLE** |
| 7 | hidden objects worksheets pdf (type-head) | printablee, elcivics, TPT, 99worksheets, woojr | **WINNABLE** |
| 8 | missing parts worksheets for kindergarten (type+grade) | education.com (single worksheet), TPT, coloringonly, teachervision, practithink | **WINNABLE** — fragmented, no hub |
| 9 | position words worksheets for kindergarten (type+grade) | TPT, K5, mathworksheets4kids, myteachingstation, education.com | **HARD** (borderline — rich 108-query tail justifies the page) |
| 10 | animals worksheets for preschool (theme) | preschoolplayandlearn, TPT, Canva, K5, Twinkl, turtlediary | **HARD** (borderline) — sub-themes (farm/zoo/forest/ocean animals) are the winnable entries |
| 11 | 4th of july worksheets for kindergarten (seasonal theme) | superstarworksheets, superteacherworksheets, TPT, allkidsnetwork, mid blogs | mid-tier — **seasonal-hub-owned**, not a topic-page target |
| 12 | ten frame worksheets for kindergarten free (printable family) | TPT, Superstar, Superteacher, K5 ×2, 123homeschool4me | **HARD** |
| 13 | picture math worksheets for kindergarten (type-head) | mathworksheets4kids, matheasily, TPT, K5, Pinterest, dadsworksheets | **WINNABLE** (borderline) — "picture math" exact phrase is fringe-owned |
| 14 | big or small worksheets for kindergarten (type+grade) | K5 ×2, preschoolplayandlearn, mathworksheets4kids, megaworkbook | **HARD** — K5 owns; pdf-download tail is ESL-mid |
| 15 | interactive worksheets for kindergarten online free (online class) | SplashLearn, education.com ×2, LiveWorksheets, kidsacademy, workybooks | **HARD** — online-hub territory, not topic pages |
| 16 | letter recognition worksheets pdf free (type-head) | 123homeschool4me, preschoolplayandlearn, Superstar, thistinybluehouse, kidsacademy | **WINNABLE** — all mid-tier blogs |
| 17 | visual discrimination worksheets pdf (type-head) | otaconline (PDF), TPT, yourtherapysource, kidsacademy, wayground, literacylearn | **WINNABLE** — therapy/niche only |
| 18 | base ten blocks worksheets 2nd grade pdf (printable family+grade) | mathworksheets4kids, kidsacademy, TPT, dadsworksheets, cuemath | **HARD** |
| +a | treasure hunt printable free pdf (type-head) | everydaymandk, 123homeschool4me, kcedventures, treasure.run — ALL party scavenger-hunt content | **SKIP at this head** — intent mismatch; target only "treasure hunt worksheet pdf" |
| +b | telling time worksheets 1st grade free (type+grade) | K5, ABCmouse, homeschoolmath, TPT, math-salamanders | **HARD** |
| +c | word scramble worksheets for kids free printable (type-head) | funenglishgames, puzzles-to-print, kiddoworksheets, treevalleyacademy, justfamilyfun | **WINNABLE** |
| +d | counting pictures worksheets 1-10 pdf (type-head) | mathworksheets4kids, superteacher, brainor, preschoolplayandlearn, planesandballoons | **WINNABLE** (borderline) — exact "counting pictures" phrase fringe-owned |

**Pattern:** the SERPs split cleanly on whether K5/education.com/Superstar happen to have a dedicated hub for the mechanic. Every LCS-distinctive mechanic (picture sudoku, cryptogram, odd one out, shadow matching, hidden objects, missing parts, word scramble, visual discrimination, picture math, letter recognition) sits on a **thin SERP** — these are the program's priority pages. Every curriculum-classic (addition, telling time, ten frames, base ten, patterns-head, fractions, measurement) is **authority-held** — those pages exist for aggregation/internal-linking and long-tail entry, with honest titles but no head-ranking expectation.

## 3. Locked patterns (titles get " · LessonCraftStudio" appended, ~19 chars → author ≤51, hard max 65)

- **Topic type page:** `<Dominant type query, keyword-led> – Free Printable PDF` (e.g. "Odd One Out Worksheets – Free Printable PDF"). Qualifiers are the harvest-dominant, honest trio. Variants "– Free Printable" / "– Free Printables" / "– Free PDF" used where the full trailer would exceed 51.
- **Topic theme page:** `<Theme demand-noun> Worksheets for Kids – Free Printables` — "for Kids" keeps the hub grade-free (theme+grade belongs to the theme-grade pages/deck landings).
- **Topic level page:** `<Grade> Worksheets – Free Printable PDF` ("Kindergarten Worksheets – Free Printable PDF"). Subject-free — subject×grade hubs own "`<subject>` worksheets for `<grade>`".
- **Intersection page:** `<Type> Worksheets for <Grade> – Free PDF`, or grade-trailing `<Type> Worksheets <1st|2nd> Grade – Free PDF` where the harvest shows that order (word search, telling time, fractions, geometry, measurement, arrays). No theme component.
- **Meta description:** 120-170 chars, unique per page, must say WHAT THE EXERCISE IS (mechanic verbs: circle the one that doesn't belong / match to its silhouette / decode the picture key), then the honest capability set: printable PDF, answer key, play online. All 132 metas in the JSON are hand-written to this rule.
- **h1:** shorter/warmer than title, keyword-bearing ("Odd One Out", "Kindergarten Shadow Matching").
- **Never in topic titles:** "online", "interactive" (online-hub territory), "games" (game intent ≠ worksheet intent), any grade on theme pages, any theme on intersection pages.

## 4. Per-key demand summary (dominant formulation → the JSON holds the full recommendation)

### Exercise types — winnable priority set (thin SERPs, real demand)
| Key | Dominant query (verbatim) | Notes |
|---|---|---|
| sudoku | picture sudoku for kids printable | +4x4/6x6/online tails |
| cryptogram | cryptogram worksheets for kids | +pdf/free/printable |
| odd-one-out | odd one out worksheets pdf | 46 queries; kindergarten+preschool tails |
| shadow-match | shadow matching worksheet pdf | kindergarten/preschool/cut-and-paste tails |
| find-objects | hidden objects worksheets pdf | **re-key** from "Find Objects" |
| missing-pieces | missing parts worksheets for kindergarten | **re-key** from "Missing Pieces" |
| word-scramble | word scramble worksheets for kids | +generator intent exists (tools own that) |
| letter-knowledge | letter recognition worksheets pdf | **re-key** from "Letter Knowledge" |
| visual-discrimination | visual discrimination worksheets pdf | teacher/OT term, no owner |
| code-addition | secret code math worksheets pdf | **re-key** from "Code Addition" |
| picture-arithmetic | picture math worksheets | +problems/for kindergarten |
| picture-sort | picture sort kindergarten | + "sorting and classifying" adjacency |
| matching | matching worksheets pdf | + kindergarten pdf |
| counting-pictures | counting pictures worksheets pdf | 1-10/1-20 tails |
| find-and-count | find and count worksheets | tiny but exact-ownable; i-spy re-harvest flagged |
| treasure-hunt | treasure hunt worksheet pdf | worksheet-qualified only (party-intent trap) |
| science-sort / science-match | science sorting activities for kindergarten / science matching worksheets | subject-hub fence on bare "science worksheets" |
| visual-logic | visual logic puzzles for kids | kids-qualified only (programming-tool noise) |
| word-building | word building worksheets | 45 queries / 10 decks — deck candidate |
| picture-vocabulary | picture vocabulary worksheets pdf | ESL-niche |
| phonological-awareness | sounds and syllables worksheets | syllable-seed re-harvest flagged |
| patterns | complete pattern worksheet kindergarten | fenced off pattern-worksheet's head |
| alphabet-train, pattern-train, picture-trail, word-guess | exact-name tiny demand | winnable but low volume — low priority |

### Exercise types — authority-held (pages exist for aggregation; expect long-tail only)
addition · subtraction · math-puzzle · math-worksheet (mixed add/sub formulation only) · more-less · big-small · pattern-worksheet · bingo · wordsearch · crossword · prepositions · counting-frames · tally-counting · number-charts · comparing-numbers · comparing-sizes · number-lines · base-ten · telling-time · fractions · graphing-data · arrays-multiplication · geometry · measurement · beginning-sounds · levels (all 5)

### Skip class (no aligned demand or cannibalizing — keep as substrate, invest nothing)
grid-match (152 decks, ~0 queries) · visual-matching (5 decks) · chart-count (mismatch; "count and graph" unverified) · comparing-groups (8 decks, absorbed by more-less/comparing-numbers) · position-words (8 decks — **cannibalizes prepositions**, consolidate) · sorting-categories (4 decks — picture-sort absorbs) · science-sequence (1 deck) · desserts_and_sweets theme (zero harvest demand; bakery absorbs)

### Themes (non-seasonal top ~31, all with verbatim demand — full recommendations in JSON)
animals (hard head; sub-themes winnable) · fruits · vehicles · toys · shapes (hard; owns "shapes worksheets", geometry owns "geometry worksheets") · around_the_house · at_the_supermarket · forest_creatures (→"forest animals") · kitchen_tools · clothing · camping · activities · beach · accessories ("clothes and accessories") · zoo_animals · music (theory-intent caveat) · classroom · body_parts · furniture · breakfast · farm_animals · hospital · bakery · insects_and_bugs · pets · ocean_life (→"ocean animals") · vegetables · weather · space · occupations ("jobs and occupations"; "community helpers" in body copy) · emotions. Birds/flowers/tools etc. below the top-30 cutoff also show verbatim demand — same pattern applies when reached.

### Seasonal themes — OWNED BY THE SEASONAL HUBS (shipped 2026-07-06), deliberately absent from the JSON
christmas · easter · winter · spring · summer · thanksgiving(nn tag) · 4th_of_july · halloween. All show strong verbatim demand ("christmas worksheets for kindergarten", "spring worksheets for preschool pdf", "4th of july worksheets for kindergarten") — the seasonal hubs already carry demand-keyed titles; re-keying here would collide. Word-search×seasonal tails ("christmas word search preschool", "word search 2nd grade halloween") are noted as future seasonal-hub children, not topic-page targets.

## 5. Intersection flip candidates (type × level, ≥12 en decks + verbatim harvest evidence)

38 candidates locked in `demand-terms-en.json .intersections` (exact evidencing query + deck count + full title/h1/meta each). Top of the list by decks×demand: addition__kindergarten (231), kindergarten__subtraction (212), kindergarten__missing-pieces (290), kindergarten__picture-sort (245), kindergarten__math-worksheet (207, mixed add/sub formulation), more-less__preschool (158), grade-1__math-puzzle (148), kindergarten__shadow-match (140), big-small__preschool (102), kindergarten__prepositions (102), kindergarten__odd-one-out (100), cryptogram__kindergarten (100), grade-1__treasure-hunt (99), find-objects__kindergarten (94), grade-1__wordsearch (93), kindergarten__matching (92) … down to grade-1__measurement (12).

**Tuples ≥12 decks EXCLUDED for lack of harvest evidence** (do not flip without new evidence): find-and-count__preschool (333 — largest tuple on the site, no preschool-qualified query; i-spy re-harvest may unlock), pattern-train__kindergarten (257), code-addition__kindergarten (154), grid-match__kindergarten (152), sudoku__kindergarten (101), picture-trail__kindergarten (98), word-guess__kindergarten (49), telling-time__grade-3 (40), fractions__grade-3 (34), chart-count__kindergarten (51), counting-frames/phonological-awareness/geometry-g3/graphing-data-g1 (<evidence).

## 6. Re-key list (internal name → demand term; display/title layer only, axis keys unchanged)

| Axis key | Internal display | Demand term (evidence) |
|---|---|---|
| find-objects | Find Objects | **Hidden Objects** ("hidden objects worksheets pdf" + 8 more) |
| missing-pieces | Missing Pieces | **Missing Parts** ("missing parts worksheets for kindergarten"; "missing pieces" queries are Lego/movie noise) |
| code-addition | Code Addition | **Secret Code Math** ("secret code math worksheets pdf", "color code addition worksheets") |
| letter-knowledge | Letter Knowledge | **Letter Recognition** ("letter recognition worksheets pdf" + 30 more) |
| forest_creatures | Forest Creatures | **Forest Animals** ("forest animals worksheets for kindergarten") |
| ocean_life | Ocean Life | **Ocean Animals** ("ocean animals worksheets for kindergarten") |
| occupations | Occupations | **Jobs and Occupations** ("jobs and occupations worksheets pdf") |
| accessories | Accessories | **Clothes and Accessories** ("clothes and accessories worksheets") |

## 7. Ownership fences confirmed in this pass (anti-cannibalization)

- **Subject×grade hubs** own "math/science/reading worksheets for `<grade>`" → math-worksheet topic page targets ONLY the mixed "addition and subtraction" formulation; science-sort targets "science sorting"; grade-1__science-sort intersection carries a pre-ship fence check against the science hub.
- **Online hubs** own the "online/interactive" class → topic titles never carry it.
- **Deck landings** own type+theme+grade → intersections are theme-free; theme hubs are grade-free.
- **Seasonal hubs** own the 8 seasonal themes (§4).
- **Within-catalog fences:** prepositions↔position-words ("position words" → prepositions; consolidate position-words) · big-small↔comparing-sizes ("big and small" vs "comparing sizes") · pattern-worksheet↔patterns↔pattern-train ("pattern worksheets" head / "complete the pattern" / "pattern train") · shapes-theme↔geometry-type ("shapes worksheets" / "geometry worksheets") · picture-sort↔sorting-categories↔science-sort ("picture sorting" / [skip] / "science sorting") · matching↔shadow-match↔science-match↔visual-matching (bare "matching" / "shadow matching" / "science matching" / [skip]) · more-less↔comparing-numbers ("more or less" / "comparing numbers").

## 8. Open items / follow-ups (not this commission)

1. **Re-harvest seeds:** `i spy`, `syllable worksheets`, `count and graph`, `number bonds` — each could unlock a currently-skipped or under-keyed surface (find-and-count preschool 333 decks rides on i-spy).
2. **Deck-production candidates** (demand-rich, deck-poor): tally marks, number lines, comparing numbers, base ten, ten frames, beginning sounds, word building. Same class as the de "Schwungübungen" finding.
3. **Consolidation review:** position-words + sorting-categories + comparing-groups + visual-matching + grid-match as thin/cannibalizing keys — operator call whether to fold or leave as substrate.
4. **Music theme intent split** (note-reading vs instrument vocabulary) — body copy handles it; watch GSC queries post-ship.
5. **Seasonal word-search children** ("christmas word search preschool", "word search 2nd grade halloween") — candidates for the seasonal-hub program's next wave.
