# FINDINGS — Phase 1 research synthesis

Researched 2026-09-05 from live web sources by four research agents, synthesised by the designer. Every finding is numbered **F-nn**; every catalogue row and every spec cites the findings it rests on (the linter fails a spec that cites a non-existent ID). Full source tables with all URLs are in the four source files beside this one:

| File | Covers | Citations |
|---|---|---|
| `_src-demand.md` | §4.1 demand across 15 game sites, app charts, forums; §4.4 good-vs-bad dissection | ~75 |
| `_src-curricula-1.md` | §4.2 US, England, Germany, France, Netherlands, Finland | see file |
| `_src-curricula-2.md` | §4.2 Spain, Brazil, Italy, Sweden, Denmark, Norway | see file |
| `_src-learning-science.md` | §4.3 learning science (10 mechanisms) + the misconception catalogue | 161 |

Numbering: **F-1…F-19** demand · **F-20…F-39** curricula · **F-40…F-59** learning science · **F-60…F-79** good-vs-bad · **F-101…F-136** misconceptions (M/L/S concepts) · **F-200…** design implications. Confidence is stated per finding (H/M/L).

---

## 1 · What people actually search for (brief §4.1)

Sources fetched directly: SplashLearn, PBS Kids, Coolmath4kids, Toy Theater, Mathsframe, ICT Games, Starfall, Math Playground, Arcademics, Sheppard, Oxford Owl, Khan Kids, Teach Your Monster; via snippets: ABCya, Topmarks, Education.com; plus Apple/Google Education charts, three Mumsnet threads, WeAreTeachers, TES, Common Sense Media, Unstar review analyses. Google Trends and Reddit were not fetchable (gaps recorded in `_src-demand.md` footer).

**F-1 · Topic-frequency ranking across 15 sources (H).** Counting T/P presence: addition within 20 (14/15), counting to 10/20 incl. subitising (13), subtraction within 20 (12), number recognition/number words (11), 2D/3D shapes (11), place value (10), multiplication/times tables (10), compare/order numbers (9), money (9), letter recognition/formation (9), number bonds to 10 (8), telling time (8), fractions (8), division (8), letter sounds/phonics (8), CVC/blending (8). Mid-tier (5-7): patterns (7), sorting/classifying (7), sight words (7), logic puzzles (7), measurement (6), skip counting (5), data/graphs (5), spelling (5), reading comprehension (5). Niche (≤4): word problems (4), grammar (4), vocabulary (3), rhyming (3), odd/even (3), typing (2), punctuation (1), every science topic (0-1). Table: `_src-demand.md` §1.5.

**F-2 · Times tables are the strongest popularity signal wherever a ranking exists (H).** Mathsframe's published most-popular list is ~40% multiplication; Topmarks' flagship Hit the Button is number bonds + times tables; Mumsnet parents name TTRS and Hit the Button first; dedicated single-topic sites exist only for multiplication. `_src-demand.md` §1.1, §1.3, §1.4.

**F-3 · SplashLearn's content investment is a usable demand proxy (H).** Number Sense 381 games, Addition 369, Subtraction 240, Multiplication 196, Fractions 186, Geometry 129, Measurement 125, Division 119, Word problems 97, Money 60, Data 46, Time 35. Kindergarten-only: Number Sense 176, Addition 122, Subtraction 66, Geometry 43. ELA: Phonics 2,225 (Blending 432, Alphabet 262, Vowels 158), Sight Words 1,035, Handwriting 124, Comprehension 44. `_src-demand.md` §1.1.

**F-4 · The 5-7 core that UK reception/Y1 teachers actually assign (H).** From ICT Games' EYFS map and Topmarks 5-7 categories: dot-to-dot counting, ordering, subitising, more/less/fewer, 1 more/1 less, number words↔numerals, ten frame, part-part-whole, take-away, addition to 10, missing number, 2D/3D shape names, symmetry, sorting by attribute, repeating patterns (2- and 4-part), number bonds to 10/20, count on/back. `_src-demand.md` §1.1.

**F-5 · Science is near-absent as a game genre (H).** Life cycles, weather, habitats, senses, plants, materials appear in 0-1 of 15 sources (only PBS Kids via TV franchises; one ABCya astronomy game). Science demand lives in videos and storybooks, not games. `_src-demand.md` §1.6.

**F-6 · Word problems, grammar and punctuation are niche as games despite curriculum weight (M).** Word problems 4/15, grammar 4, punctuation 1. `_src-demand.md` §1.6.

**F-7 · Universal vs English-specific demand (H for the classification).** Universal (transfer to all 11 languages unchanged): counting, subitising, number bonds, add/sub within 20, place value, times tables, shapes, patterns, sorting, time, measurement, fractions, money-as-skill, letter recognition, rhyme-as-concept, comprehension-as-concept. English-specific: synthetic-phonics phases, silent e, bossy r, vowel teams, Dolch/Fry sight words (transparent orthographies es/it/fi/pt barely have the genre), English grammar (a/an, plural -s). Locale-bound surfaces: number words, currency, half-hour idioms. `_src-demand.md` §1.7.

**F-8 · Teacher/parent forum consensus (M; Mumsnet H, Reddit not fetched).** UK parents and teachers name number-fact drills (TTRS, Hit the Button, Numbots, 1-Minute Maths) and phonics (TYMTR, Phonics Play) far more than any science or comprehension product; US lists name platforms (PBS, Khan Kids, Starfall, ABCya). Complaints: Prodigy "spends more time exploring than doing the maths", Komodo "pressing all the buttons until they got the answer", ads. `_src-demand.md` §1.4.

**F-9 · App-store Education charts are not a K-3 signal (M).** Dominated by adult/admin apps; the kids' signal is editorial (Khan Kids, Lingokids) and reading libraries (Epic). Ad complaints are 35% of all 1-star reviews in the kids category. `_src-demand.md` §1.2.

**F-10 · Manipulatives are a demand category in their own right (H).** Toy Theater, Coolmath4kids and Math Playground all ship ten-frames, rekenreks, number lines, base-ten blocks, pattern blocks, clocks, play money in 14 currencies. Teachers project them. `_src-demand.md` §1.1.

**F-11 · Popular "answer-then-arcade" games sell in UK schools (H).** Mathsframe's top-20 is full of "answer questions then dodge obstacles" titles. Their appeal (motion, a goal, a character) must be matched by other means since the mechanic is banned (F-63). `_src-demand.md` §2.2.

---

## 2 · What curricula require (brief §4.2)

Twelve systems read from official texts (US CCSS/NGSS; England NC 2014 + EYFS; Germany KMK 2022 + Bavaria LehrplanPLUS; France programmes 2025 cycle 1-2; Netherlands SLO kerndoelen/tussendoelen + 2025 kerndoelen; Finland OPS 2014 + esiopetus; Spain LOMLOE RD 157/2022 + RD 95/2022; Brazil BNCC; Italy DM 254/2012 + 2025 Nuove Indicazioni; Sweden Lgr22; Denmark Fælles Mål; Norway LK20). Per-system detail, verbatim objectives and every URL: `_src-curricula-1.md` (US/EN/DE/FR/NL/FI) and `_src-curricula-2.md` (ES/BR/IT/SE/DK/NO). France 2025 and Denmark dansk are medium confidence (official hosts blocked fetch; ministry project text / reproductions used).

**F-20 · School start and reading onset span three years; "grade 1" is not one age (H).**

| Age | US | England | DE | FR | NL | FI | ES | BR | IT | SE | DK | NO |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 5 | K | Year 1 | Kita | GS | groep 2 | daycare | Infantil 5 | pré-escola | infanzia | förskola | børnehave | barnehage |
| 6 | G1 | Year 2 | Klasse 1 | CP | groep 3 | esiopetus | 1º | 1º ano | prima | **förskoleklass** | **0. klasse** | 1. trinn |
| 7 | G2 | Year 3 | Klasse 2 | CE1 | groep 4 | **1. luokka** | 2º | 2º | seconda | åk 1 | 1. klasse | 2. trinn |
| 8 | G3 | Year 4 | Klasse 3 | CE2 | groep 5 | 2. luokka | 3º | 3º | terza | åk 2 | 2. klasse | 3. trinn |
| 9 | G4 | Year 5 | Klasse 4 | CM1 | groep 6 | 3. luokka | 4º | 4º | quarta | åk 3 | 3. klasse | 4. trinn |

Formal reading instruction begins at 4 (England Reception), 5 (US), 6 (DE, FR, NL, ES, BR, IT, NO), 7 (FI; SE/DK "year 1" proper is at 7 after a play-based bridge year). Therefore: **content is keyed to AGE, never to a grade label; UI never shows "grade"** (A-18). The brief's bands map cleanly: 5-6 = pre-formal/first formal year everywhere; 6-8 = the two years in which every system establishes decoding and +/− to 20; 8-9 = tables/division/fractions territory.

**F-21 · Common core — mathematics (all 12 systems name it by age 8, H).** Counting and cardinality to 20 then 100; comparing/ordering quantities; number composition to 10 (bonds, part-whole); +/− facts to 20; place value tens/ones then hundreds; +/− within 100 by mental strategies; skip counting / number sequences; repeating (and growing) patterns; multiplication as equal groups/arrays and division as sharing/grouping AS CONCEPTS by 8-9; halves and quarters as equal parts (informal in DE/NL/FI/IT/NO); 2D shapes circle/square/rectangle/triangle and 3D cube/sphere (+ cylinder/cone/cuboid); position and direction words; length with non-standard then standard units (cm/m); mass/capacity introduced; calendar (days, months) and the analogue clock at least to whole/half hours; tables, pictograms and bar charts (11 of 12 — NO at 10).

**F-22 · Common core — literacy (all 12, H).** Letter names and letter-sound correspondence taught explicitly (ages 5-7); phonological awareness (rhyme, syllables, initial sounds) at 5-7; blending letter-sounds (or syllables) into words at 6-7; sentence conventions (capital to start, full stop/question mark to end, spaces) by 8; spelling by segmenting sounds then patterns (11 of 12 — NO has no spelling aim by year 2); reading short narrative/informational texts with comprehension, retell and sequence by 8; writing a short text by 8-9. NOT common: sight/irregular-word lists (EN/US/FR/DK only — transparent orthographies do not need them), explicit grammar terms before 8 (EN/FR/DE/ES/IT yes; NL 8; FI/SE/DK/NO/BR later), cursive (FR from 5, BR required by 7, IT practice, EN/DE joined at 6-7, NL school choice, FI dropped 2016, Nordics legibility only).

**F-23 · Common core — science/world knowledge (all 12, H).** Seasons and weather as observable patterns; living things — needs of plants and animals (water, food, light), growth, common local species; human body parts and the senses; everyday materials sorted by observable property (11 of 12 — FI at 9+). Life cycles: 10 of 12 (not DK/NO before 9-10). Physics before 9 exists only in EN, US, NL (light, sound, magnets) with DE/FR electricity at 7-8 and FI none; states of water in SE/DK/EN/US/DE.

**F-24 · Reading-method families (H).** Synthetic phonics (EN statutory + phonics check at 6; US); grapheme-phoneme + syllabic (FR with wpm targets); Silbenmethode/Fibel (DE); klankzuivere phonics + AVI levels (NL); KÄTS sound-letter-syllable (FI); phonic-SYLLABIC in the Romance systems (ES método silábico practice, BR BNCC codes segment by syllable, IT metodo fono-sillabico); letter-sound synthetic in SE/NO with DK adding explicit irregular-word reading (deep orthography). → Syllable-builder games are Romance-first; irregular-word games are EN/FR/DK; letter-sound games are universal.

**F-25 · Handwriting regimes differ and are never a gate (H).** FR cursive from 5 before print; BR print AND cursive required by 7; IT cursive practice (2025 text promotes); EN joined at 6, DE at 7; NL school choice; FI print + keyboard, no cursive; Nordics legibility only; US no national rule. → Letter/numeral tracing games use PRINT forms only; cursive is out of scope for v1.

**F-26 · Multiplication onset and table sets (H).** Concept (equal groups/arrays): EN 5-6, FR 6, NL 6-7, US/DE/IT/BR/SE 7-8, NO 8, DK 9, FI 7-8. Tables memorised: EN 2/5/10 at 6 then 3/4/8 at 7, all 12 by 8; FR all at 7; NL 1-5,10 at 7 then all at 8; DE core facts (1,2,5,10, squares) at 7, all at 8; US all "from memory" at 8; IT all to 10 by 8 (strictest); BR 2,3,4,5 at 7 + 10 at 8; ES builds 8-10; FI 1-5,10 by 8, 6-9 at 9+; SE/DK/NO list NO tables at 5-9 ("methods for multiplication"). → Tables retrieval is an 8-9 objective everywhere; "groups-of"/arrays is a 6-8 objective everywhere (A-20).

**F-27 · Fractions range from 5 to 10 (H).** Halves/quarters of shapes: EN 5, US 6, SE 6 (fsk "del av helhet"), FR 7, BR 7-8, DE/NL/FI informal 6-8, ES 8-10 (denominator ≤ 12), DK 9, IT 10, NO 10. Formal notation: FR 7 (earliest, with same-denominator addition), EN 6-7, US 8 (number line), SE 9, ES/BR 8-10; DE/NL/FI/IT/NO not before 9-10. → Equal-parts/halves/quarters games band at 6-8 (as sharing, no notation); fraction notation and comparison at 8-9 only.

**F-28 · Clock granularity (H).** Whole/half hours: EN 5, US/DE/FR/NL/ES 6, NO/BR 7, SE/DK/FI 7-8, IT ≤ 8. Quarter/5-minute: EN 6, US/FR/NL/DE 7. To the minute: EN 7, US/DE/FR/NL/ES/BR 8; SE/DK/NO/IT/FI hour-level only or unspecified. → Two clock tiers: o'clock/half (6-8, everywhere) and quarter/5-min/minute (8-9). Locale idiom trap F-113 applies to any spoken form.

**F-29 · Money and units are market-conditional (H).** Currency taught 5-9 in EN (£/p from 5-6), US ($/¢ at 7), DE/FR/NL (€ 5-6), ES (€ 6-8), BR (R$ every year), IT (€ with decimals by 8); **absent before 10-12 in SE/DK/NO and not a national strand in FI 1-2.** Units: metric in all but the US (which adds inches/feet); FR adds dL/cL, DE mm. Decimals via money at 7 in FR, 8 in NL/IT. → Money games use real per-locale denominations in `LOCALE_DATA` (A-8, A-19); metric only; decimals not before 8-9 and only via money.

**F-30 · Science placement (H).** Every system integrates science into a world-knowledge subject at 5-8 (HSU, Questionner le monde → sciences 2026, ympäristöoppi, Conocimiento del Medio, natur/teknologi, naturfag, NO). Explicit named science with physics at 5-8 exists only in EN and US. → Science games cover F-23's observational core (needs, growth, seasons, body/senses, materials); no forces/electricity/astronomy causation before 8-9, and even then only as observable sequences (F-134, F-135).

**F-31 · Consolidated 12-system matrix — the MOST CONSERVATIVE age at which a concept is required (the levelling rule for a global game).** "Conservative" = the latest age among systems that teach it; the second number is the earliest. Derived from the two source matrices (45 + 49 rows).

| Concept | Conservative age | Earliest | Band | Note |
|---|---|---|---|---|
| Count to 10-20, one-to-one, subitise to 5 | 6 | 4 | 5-6 | universal pre-academic |
| Compare more/fewer/same | 6 | 4 | 5-6 | universal |
| Sort by attribute; repeating patterns | 6-7 | 4 | 5-6 | universal |
| 2D shapes named (4 basic) | 6-7 | 4 | 5-6 | universal |
| Position words (in/on/under/left/right) | 7 | 5 | 5-6 | 11 of 12 (NO —) |
| Numerals to 20, number words | 6-7 | 5 | 5-6 → 6-8 | universal |
| Count to 100; number line to 100 | 7-8 | 5 | 6-8 | universal |
| Number bonds to 10 / part-whole | 7 | 4 | 5-6 → 6-8 | universal |
| +/− facts to 20 | 7-8 | 6 | 6-8 | universal |
| Place value tens/ones (teens) | 7-8 | 5 | 6-8 | universal; de/nl/da inverted words F-108 |
| +/− within 100, mental | 7-9 | 6 | 6-8 → 8-9 | universal |
| Skip counting 2/5/10 | 7-8 | 6 | 6-8 | universal |
| Even/odd | 7 (NO only by text) | 5 (practice) | 6-8 | weak curriculum basis; keep 1-2 games |
| Equals sign as balance | 7-9 | 6 | 6-8 | ES/BR/SE/NO explicit; universal by practice |
| 3D shapes named | 7-9 | 5 | 6-8 | universal |
| Length with units (cm/m) | 7-8 | 6 | 6-8 | universal, metric |
| Mass / capacity | 7-8 | 6 | 6-8 → 8-9 | universal |
| Calendar days/months; clock to hour/half | 7-8 | 5 | 6-8 | universal |
| Pictogram / bar chart | 7-8 | 6 | 6-8 | 11 of 12 |
| Halves/quarters as equal parts (no notation) | 7-8 | 5 | 6-8 | informal in 5 systems |
| Multiplication as groups/arrays | 8 | 5-6 | 6-8 → 8-9 | universal concept |
| Symmetry | 8-9 | 6 | 8-9 | 9 of 12 |
| Numbers to 1000; +/− 3-digit | 8-9 | 6-7 | 8-9 | universal |
| Tables to 10 retrieval | 8-9+ | 6 | 8-9 | not Nordic; demand F-2 |
| Division as sharing/grouping; facts | 8-9 | 6 | 8-9 | universal concept |
| Clock quarter/5-min/minute | 8 (7 of 12) | 6 | 8-9 | 5 systems hour-only |
| Fraction notation, compare, number line | 8-9 (6 of 12) | 6-7 | 8-9 | market-conditional |
| Money | 6-8 (8 of 12) | 5 | 6-8 | Nordic absent; LOCALE_DATA |
| Letter names + sounds; initial sound | 6-7 | 4 | 5-6 | universal |
| Rhyme, syllable clapping | 6-7 | 5 | 5-6 | universal |
| Blending to words (CVC / syllables) | 7 | 4 | 6-8 (5-6 en/us/fr) | universal skill, per-locale words |
| Upper/lowercase link; letter formation (print) | 6-7 | 4 | 5-6 | universal |
| Capital + full stop; sentence order | 7-8 | 5 | 6-8 | universal |
| Spell regular words by sounds | 8 | 6 | 6-8 | 11 of 12 |
| Read short text; retell/sequence; simple inference | 8 | 6 | 6-8 → 8-9 | universal |
| Nouns/verbs/adjectives named | 8+ (7 of 12) | 5 | 8-9 | market-conditional |
| Living/non-living; plant & animal needs | 7-8 | 5 | 5-6 → 6-8 | universal |
| Seasons/weather; day-night sequence | 7 | 5 | 5-6 → 6-8 | universal; hemisphere trap F-135 |
| Body parts; senses | 7-8 | 4 | 5-6 → 6-8 | universal |
| Materials by property | 8 | 5 | 6-8 | 11 of 12 |
| Life cycles; classify animals by features | 8 | 5 | 6-8 → 8-9 | 10 of 12 |
| Magnets / light / sound / circuits | 8-9 (≤ 6 of 12) | 5 | 8-9 | market-conditional; low priority |

**F-32 · England (H).** Reception ELGs at 4 (bonds to 5, subitise, 2D shapes, phonics begins); Year 1-2: tables 2/5/10, halves/quarters at 5-6, phonics screening check at 6, money £/p from 5-6, clock to 5-min at 6; a named science subject with materials at 5-6 and magnets/light at 7. Curriculum and Assessment Review (Nov 2025) may change KS1 assessment.

**F-33 · United States (H).** K.CC counting to 100, K.OA bonds to 10, 1.OA facts to 20, 2.NBT to 1000, 3.OA all tables from memory, 3.NF number-line fractions; RF.K phonics + sight words; NGSS light/sound at 6, magnets at 8; imperial AND metric units (the only such system).

**F-34 · Germany (H, Bavaria read; Länder vary).** Klasse 1 at 6: numbers to 20, print then joined at 7; Silbenmethode; core multiplication facts at 7, all at 8, division with remainder at 7; € from 6; HSU has no physics before 8 (electricity); capitalised nouns and Fall in grammar at 6-7.

**F-35 · France (M — 2025 programmes via ministry project text).** Maternelle GS at 5 with cursive before print; CP at 6: column addition, all tables at 7, formal fractions with notation at 7, decimals via € at 7; national evaluations at start of CP and CE1; sciences programme replacing "Questionner le monde" from 2026-27.

**F-36 · Netherlands (H; advisory tussendoelen; new kerndoelen Aug 2026→2031).** groep 3 at 6 = formal start; klankzuiver phonics + AVI levels; tables 1-5,10 at 7 then all at 8; € from 5-6 with decimals at 8; analogue+digital clock paired from 6; magnets/shadows at 6-7; grammar terms at 8.

**F-37 · Finland (H).** School at 7 after compulsory esiopetus at 6; KÄTS decoding at 7; +/− to 20 consolidating at 7-8; tables 1-5,10 by 8, 6-9 at 9+; no cursive (2016), print + keyboard; no national money strand at 7-8; no parts of speech before 9; almost no physics before 9; grades 1-2 and 3-6 are single blocks (single-year claims are local practice).

**F-38 · Spain / Brazil / Italy (H — official texts read).** ES: infantil approximation to reading at 3-6, primer ciclo (6-8) numbers to 999, € coins/notes, formal decoding + ortografía natural, ciclo vital, no cursive rule; assessment none before 9-10. BR: alfabetização target by end of 2º ano (7), print AND cursive by 7, tables 2-5 at 7 + 10 at 8, R$ every year, probability words from 6, BNCC coded per year (the only fully per-year system besides NO maths); school year starts in February; seasons reversed in the south. IT: metodo fono-sillabico, INVALSI classe 2 (7) with reading speed, tabelline to 10 by 8 (strictest), decimals via € before fractions (fractions at 10), dictation as a named objective; mid-transition to the 2025 Indicazioni (phased 2026-2030).

**F-39 · Sweden / Denmark / Norway (H for maths; DK dansk M).** SE: förskoleklass at 6 (letters, numbers 0-10, "del av helhet"); åk 1-3 one block; enkla bråk by 9; no tables listed; åk-3 national tests replaced in 2028. DK: børnehaveklasse at 6; 3-digit numbers by 9; explicit irregular-word reading (deep orthography); færdighedstest 2. klasse from 2026-27; spejling (symmetry) at 8. NO: LK20 per-year maths aims; even/odd at 7 (the only system naming it); coordinates at 8; NO data aim, NO money, NO fractions before year 5; 3. trinn kartleggingsprøve; løkkeskrift removed 2020.

---

## 3 · What makes an educational game actually work (brief §4.3)

Evidence graded ★★★ (multiple meta-analyses/replicated child RCTs) to ★ (single or contested). Full tables with effect sizes and URLs: `_src-learning-science.md` Part 1.

**F-40 · Retrieval practice works for 5-9, but only cued + fed back (★★★).** Testing effect g≈0.50-0.61 overall (Adesope 2017); in preschoolers a testing effect appears only with cued recall AND immediate feedback (89.1% vs 41.8%, Fazio & Marsh 2019, PMC6110808); 5-6-year-olds benefit long-term only after reaching high retrieval success through several cycles (Káldi 2025, Child Dev). → Every item is a retrieval event with a cue (picture/number/choices), feedback within ~300 ms, and the first items of a session are easy so success starts high.

**F-41 · Spacing inside a session: expanding re-queue of misses (★★★ overall, ★★ within-session at 5-7).** Cepeda 2006/2008; expanding 1-2-3-7 lags doubled preschoolers' recall; Leonard 2024 caveat that early gains can converge; interleaving related problem types doubled elementary next-day test scores (Taylor & Rohrer 2010). → A missed item re-enters after 1 intervening item, then 2-3, then 5-7; a "last look" near the end; never the same item back-to-back; for 6-9 interleave after an introduction block; 5-6 keeps one type per session. Cross-session spacing cannot be stored (no account) → it is a catalogue property: several games per objective with different surfaces.

**F-42 · Cognitive load: decorative motion and text are extraneous load (★★★ direction, ★★ magnitude at 5-9).** Seductive details g = −0.33 (Sundararajan & Adesope 2020); split-attention g = 0.63 for integrated formats (Schroeder & Cenkci 2018); worked examples beat problem solving for novices and reverse with expertise. → No decorative animation while the child thinks; text budget 5-6 = zero on the play screen, 6-8 ≤ 8 English words, 8-9 ≤ 2 short sentences; labels sit ON the object; first item of a new mechanic can demonstrate itself once, then fade.

**F-43 · Feedback content: elaborated ≫ correct-answer ≫ right/wrong (★★★).** Van der Kleij 2015: EF 0.49, KCR 0.32, KR 0.05; 38% of feedback interventions in Kluger & DeNisi 1996 decreased performance — those that drew attention to the self; immediate verification hurts children who already have the strategy (Fyfe & Rittle-Johnson 2016). → Feedback is task-level, visual/enacted (re-count with highlighting, slide pieces to where they belong), one distinct response per anticipated error; no self-level verdicts; after a fast confident correct answer, confirm only.

**F-44 · Extrinsic rewards undermine intrinsic motivation, more so in children (★★★).** Deci, Koestner & Ryan 1999: d = −0.40/−0.36/−0.28 for engagement/completion/performance-contingent tangible rewards, worse for children; Lepper 1973 overjustification in preschoolers; Cameron & Pierce concede the expected-tangible-engagement case; gamification metas show badges shift focus to the reward; Mueller & Dweck 1998: intelligence praise → helplessness. → No points, stars, coins, badges or unlockables for engagement/completion; progress = the task completing (tower built, path filled); praise strings process-level and unannounced.

**F-45 · Timers and competition: no visible countdown, no opponent that can win (★★ anxiety link; ★ timed-tests-as-cause; ★★ supervised fluency drills work).** Maths anxiety exists at grades 1-2 and hits the higher-working-memory children who use good strategies (Ramirez 2013); Boaler's causal claim is under-referenced; short timed drills raise fluency but only as teacher-supervised drills measuring speed; competition lowered young children's intrinsic motivation, especially girls; 5-6-year-olds who lose choose to compete less. → Default off; any pacing is musical/steady, optional and never ends the game; a second character is a partner, never a rival that can finish first; fluency progression = fading supports, never a clock.

**F-46 · Target first-attempt success 80-90%; the support ladder makes success certain (★★).** The "85% rule" (Wilson 2019) is a machine-learning derivation, but child data agree the success band is high; productive failure is weak for elementary (Sinha & Kapur 2021 g = 0.36, weaker for younger); interleaving and cue-fading are the desirable difficulties that transfer. → Ladder: attempt 1 unaided → attempt 2 with the targeted hint from the misconception table → attempt 3 with a demonstration the child completes; no attempt 4; re-queue later. Adaptation: 3 consecutive first-attempt corrects → up one level; 2 errors in the last 3 items → down one; never below L1, never up more than one.

**F-47 · Error handling: an error changes the object, never the child's status (★★ wording; ★ mindset interventions).** Growth-mindset interventions ≈ d 0.08 (Sisk 2018) / n.s.; the replicated finding is praise wording (process not person) and task-level feedback. → The piece bounces back, the counter un-fills, the wrong card returns; no red cross, buzzer, life, score decrement; wrong-answer messages are pointers ("look — this row has one more"), never verdicts; the item never disappears unsolved.

**F-48 · What moved outcomes in digital game trials (★★).** Wouters 2013 serious games learning d = 0.29, retention 0.36, motivation n.s.; Tokac 2019 maths games d = 0.13; early-childhood GBL meta g = 0.46 with **puzzle games 0.63 vs other types 0.31**; digital interventions for maths difficulties ES 0.55; Bedtime Math contested; Khan Kids N = 49. → The core loop IS the target skill; puzzle/manipulative structures (arrange, complete, match, build) over recall-and-shoot; assume repeated sessions; mirror physical manipulatives exactly (ten-frame fills top row left→right; number line; base-ten blocks; arrays).

**F-49 · Touch interface for 5-7 (★★★).** Tap and drag accuracy improve 3→6 and are still below adult at 6 (Vatavu 2015); drag error roughly doubles with smaller targets (FittsFarm 2019); NN/g: 3-5-year-olds need ≥ 2 cm targets and can drag only coarsely, 6-8 still find precise/long drags frustrating; mouse is worse than touch for preschoolers (Hourcade); WCAG 44 px. → **Drag-and-drop is a 6-9 pattern**; 5-6 uses tap-source-then-tap-destination; if a 5-6 game drags at all the drop zone is ≥ 2× the object with a generous snap radius; every drag shows continuous feedback; touch first, no hover/double-click/long-press dependence; gap ≥ 12 px between targets.

**F-50 · Manipulatives with evidence (★★).** EEF early-maths guidance: manipulatives and representations work when the how-and-why is explicit; ten-frames, bead strings, number lines, base-ten blocks, arrays, balance scales (for the equals sign, McNeil) are the representations with support. `_src-learning-science.md` §9 + Part 2.

---

## 4 · What the good ones do that the bad ones don't (brief §4.4)

Dissected: Khan Academy Kids, Teach Your Monster to Read, DragonBox Numbers, Endless Alphabet, Todo Math, Moose Math, Duolingo ABC, Hit the Button, PBS Kids Games (well-regarded); Prodigy, Math Blaster, the answer-then-arcade archetype (Mathsframe/Arcademics), Shark Numbers, Coolmath Games, ad-funded Play apps, ABCmouse, Komodo (poor or typical-bad). Mechanics tables: `_src-demand.md` §2.1-2.2. The 15 distinguishing properties (§2.3) condense to:

**F-60 · Every instruction is deliverable without reading (H).** Khan Kids, Moose, Todo, TYMTR narrate; DragonBox and Endless Alphabet need no instruction at all; Prodigy's dialogue boxes are the bad case. Check: mute the sound, hide the text — can a 5-year-old find the first move by tapping?

**F-61 · Invalid moves are refused, not punished (H).** DragonBox blocks won't snap; Endless Alphabet's slot won't accept the wrong letter; Todo "shakes its head and waits". Math Blaster ends the game after multiple errors; Shark Numbers bites the boat. Check: the number of ways a session can end other than finishing must be zero.

**F-62 · The wrong-answer response contains information (H).** Todo shows the quantitative implication; Moose hints light up; Math Blaster shows the answer with no explanation; Prodigy "limited feedback". Check: each anticipated error gets a distinct response pointing at what to look at.

**F-63 · The learning object is the game object (H).** Nooms are numbers; Endless letters say their sound while dragged; Moose Juice needs N fruits. Answer-then-arcade fails the delete-the-question test: remove the question and a playable arcade game remains. Check: delete the question; nothing playable should survive.

**F-64 · No countdown by default (H).** Endless, Todo, Khan Kids, DragonBox are untimed; Hit the Button ships an untimed practice mode; its clone adds 6 s/question and 3 hearts — the brief's banned shape.

**F-65 · Brute-force tapping cannot win (H).** Komodo let a child press every button until one worked (Mumsnet). Check: after a wrong tap the item re-presents with a hint and counts as retried; a brute-forced completion never counts as first-try correct, and the show-me step is explicit.

**F-66 · Rewards are cosmetic or ARE the content; never speed-scored (H).** TYMTR's "trickies" are the sight words; DragonBox coins are spent by counting back; Arcademics leaderboards for correct-in-a-row streaks and Prodigy's pay-for-higher-score are the bad cases.

**F-67 · Zero interruptions between items (H).** Prodigy 16 membership ads per 4 problems; Play apps "ad after each round"; Khan Kids none.

**F-68 · One reliable input primitive per game, tap-first (H).** TYMTR "requires good fine motor skills"; Todo's touch-and-hold drag "tricky at first"; Tommy's Trek needs a keyboard. Todo's drag-OR-handwrite is the model. Check: every game completes with tap alone.

**F-69 · Big targets, few of them (H).** Hit the Button's whole screen is 8-10 large buttons; Endless shows one word; Prodigy's shop UI is the bad case. Check: ≤ 10 interactive elements on screen.

**F-70 · Audible confirmation encodes the content, not just success (M).** Endless letters voice their phoneme; DragonBox narrates "two plus three, five" (inconsistently — a defect). Within this brief's Web-Audio-only constraint: pitch mapped to quantity or one tone per counted object.

**F-71 · Adaptive practice visible as "more of that" (H).** TYMTR increases practice where the child struggles; Khan Kids auto-adjusts; Duolingo ABC forces 127 sequential units ("slog through the early levels").

**F-72 · A natural end within minutes (H).** Todo daily bundle 10-15 min; Khan Kids RCT dose ≈ 13 min/day; "no natural stopping point" is a 1-star theme.

**F-73 · Culturally portable surfaces (H).** Toy Theater ships 14 currency sets; TYMTR/Duolingo ABC are English-orthography-locked; Prodigy questions are "American-structured" (Mumsnet). Check: no coin, unit, holiday or English-only word list in the base game; locale-varying assets in one table.

**F-74 · Loads and responds instantly (H).** Complaints cluster on lag, freezing, 4 GB installs, crashes. A single file with no network after load is the structural answer.

**F-75 · A punitive animation can sit inside an otherwise good design (H).** Shark Numbers (ICT Games) is loved and its wrong-answer shark bite is exactly the failure aversion the brief bans — the counter-example that "good site" ≠ "good feedback".

---

## 5 · Misconception catalogue (feeds every spec's "Common misconceptions")

Each ID covers one concept; the per-error tables with sources and the researched remediation → game response are in `_src-learning-science.md` Part 2 under the matching M/L/S heading. A spec cites the F-ID and names the specific errors it responds to.

### Mathematics
- **F-101 · Counting (M1, ★★★).** One-to-one failure (double-count/skip); stable-order violation; cardinality ("last number = how many" not grasped); count-all instead of count-on; length/spread bias (Piaget); order-irrelevance. Responses: objects in a row, each tap greys the object and shows the numeral, second tap does nothing; number strip with the gap highlighted; after the count the set gathers under one numeral and "how many?" is asked; first addend covered so counting-on is the only route; pairing lines between rows.
- **F-102 · Numeral recognition and writing (M2, ★★★).** Single-digit reversals (6↔9, 3, 5, 7 — normal to ~6); order reversal 12↔21 (19% of grade-1 transcoding errors); writing as heard "sixteen"→61, "one hundred and five"→1005. Responses: never mark a mirror image as a hard error — show the correct orientation beside the choice; 12 always paired with 1 rod + 2 ones; build numerals from place-value tiles rather than typing digits.
- **F-103 · Comparing quantities (M3, ★★★).** Length/area instead of number; bigger object = more; "fewer" acquired last. Responses: pairing lines; object size varied independently of count from level 2; icons for more/fewer paired with words.
- **F-104 · Number bonds / part-whole (M4, ★★).** Largest number put as a part; adds the two known numbers whatever the diagram; 3+7 not linked to 7+3 / 10−3; abstract circles too early. Responses: the whole drawn as the container holding the parts; counters move from whole into parts before numerals; each bond in all three forms on one ten-frame; concrete → pictorial → numeral in one session.
- **F-105 · Addition strategies (M5, ★★★).** Count-all persists; counting-on starts AT the first addend (4+3: "4,5,6"); irregular arrays worsen strategies; finger counting into grade 3. Responses: cover the first addend, start from the larger; highlight that "4" is already there, the first jump lands on 5; linear/ten-frame layouts; fade counters, introduce doubles/make-ten anchors.
- **F-106 · Subtraction (M6, ★★★).** Smaller-from-larger bug (42−17→35, Brown & Burton); counting-back off-by-one (8−3: "8,7,6"); take-away only, no difference/comparison model; buggy shortcuts believed valid; 3−8=5. Responses: base-ten blocks refuse the impossible take; number line where the start is not a jump; separate take-away and how-many-more games with matching lines; the manipulative refuses rather than a "wrong".
- **F-107 · The equals sign (M7, ★★★).** Operational view ("=" means the answer comes next): 3+4=_+5 → 7; add-all → 12; rejects 7=3+4; persists to grade 4 and predicts algebra difficulty (McNeil). Responses: balance-scale representation, both pans; reversed and both-sides forms from level 1.
- **F-108 · Place value (M8, ★★★).** Digits as independent numbers; teens ("eleventeen", 16 as 61); syntactic transcoding 105→1005; **language interference: de/nl/da invert tens and ones ("vierundsechzig")**; zero placeholder ignored. Responses: tens as bundled rods that cannot be split without an action; ten-frame + extra ones for every teen; place-value tile overlay; for de/nl/da pair spoken order with the visual tens-then-ones layout, never rely on word order; empty tens shown as an empty slot.
- **F-109 · Skip counting (M9, ★★).** Rote chant not tied to groups; loses place/mixes sequences; cannot start from a non-multiple; over-generalises "ends in 0 or 5". Responses: each chant word lights a group; hundred-square trail; level 3 starts off-multiple; include 2s/3s.
- **F-110 · Multiplication (M10, ★★).** Groups vs group-size confused; "always makes bigger"; commutativity not seen; repeated-addition-only model; "3 times as many" → +3. Responses: arrays with rows/columns labelled by icon; include ×1 and ×0; rotate the array 90° as feedback; groups-of pictures alongside repeated addition; a distinct "times as many" comparison bar.
- **F-111 · Division (M11, ★★).** Sharing easy, grouping later; divisor given as answer when pre-grouped; unequal sharing tolerated; remainders ignored. Responses: share-among-N (5-8) before how-many-groups (8-9); explicit "how many in each" vs "how many groups" icons; unequal group pulses; leftovers stay visible at level 3.
- **F-112 · Fractions (M12, ★★★).** "Half" = cut, not two EQUAL parts; bigger denominator = bigger; numerator-only comparison; thirds/fifths hard; the whole changes but parts compared. Responses: equal-parts check by overlay, unequal parts refuse to seal; compare bars of the same whole; level order halves → quarters → thirds; always show the whole, vary wholes only at 8-9.
- **F-113 · Telling time (M13, ★★).** Hour hand read as the nearest numeral (7:30 → 8:30); minute hand read as the numeral (big hand on 2 → "2 past"); hands swapped, counter-clockwise reading; o'clock/quarters easier than half past. Responses: hour hand's sector shaded ("still in 7's hour"); minute ring with 5-marks revealed on error; hands differ in length AND colour AND shape; level order o'clock → half → quarter → 5-minute. **Locale: "half seven" = 6:30 in de/nl/sv/da/no/fi and 7:30 in en — never render the spoken idiom in a shared string.**
- **F-114 · Measurement — length (M14, ★★★).** Starts at 1 / at the ruler's end; counts ticks not intervals; unit iteration with gaps/overlaps; bigger unit → bigger number. Responses: objects at non-zero offsets, intervals highlighted; unit chips laid under the object; units snap edge-to-edge and a gap shows as a hole; same object measured with two unit sizes. Metric only; non-standard units (cubes, clips) for 5-8, cm at 8-9.
- **F-115 · 2D / 3D shapes (M15, ★★★).** Prototype orientation (rotated square = "diamond", ~⅓ of 4-6-year-olds); ~half fail on flipped/skinny triangles; loses place counting sides/vertices; cube = cuboid, curved surfaces "have no faces"; 3D called by 2D names. Responses: rotate the shape live to its prototype pose; vary orientation/type from level 1 and count sides as feedback; sides light one by one; explode the net; show shadow vs object.
- **F-116 · Patterns (M16, ★★★).** Cannot identify the unit of repeat (hardest task); extends by copying the last element (ABB → ABBB); mid-unit endings harder; translating to new materials hard. Responses: bracket the unit visually and ask the child to tap the unit before extending; feedback re-brackets; level 1 ends on complete units, level 3 mid-unit; 8-9 "same pattern, different things".
- **F-117 · Money (M17, ★★).** Bigger coin = worth more; counts coins as items not values; cannot combine mixed coins. Responses: each coin's value shown as a stack of unit cubes; each coin unrolls into units; skip-count trail by coin value. Locale: real currencies per §BUILD-CONVENTIONS §14, only values that exist.
- **F-118 · Data (M18, ★★).** Graph-as-picture; ignores the key (counts symbols when 1 = 2); bar-tip misread without gridlines; reads one bar but cannot compare two. Responses: build the chart by moving objects into columns first; one-to-one pictographs for 5-8, scaled keys only at 8-9 with the key pulsing on error; gridlines and integer labels always on; level 1 read → level 2 compare → level 3 total.

### Literacy (English-derived; each locale needs native re-derivation of the specific confusable sets — A-15)
- **F-121 · Letter recognition / reversals (L1, ★★★).** b/d/p/q mirror reversals are developmentally normal to ~7 (mirror invariance must be unlearned); upper/lowercase not linked. Responses: reversal choice gets a "which side is the belly" highlight, not a generic retry; matching both forms, feedback morphs one into the other.
- **F-122 · Letter names vs sounds (L2, ★★★).** Name used as sound (y → /w/, w → /d/, h → /ch/); sounds at the END of the name (f "eff", m "em") harder than at the start (b "bee"). Responses: name-initial letters first; y/w/h get a picture-cued round. Locale: letter-name/sound mismatches are language-specific — per-locale letter tables, never shared.
- **F-123 · Short vowels (L3, ★★).** /e/↔/i/ (pen/pin), /a/↔/o/; vowel omitted in early spelling ("bt"). Responses: minimal-pair picture choice with the vowel highlighted; sound boxes with a mandatory middle box.
- **F-124 · Blending and segmenting (L4, ★★★).** Says each sound but cannot synthesise; omits nasal/liquid in clusters ("sink" → "sik"); segments onset-rime not phonemes; splits digraphs. Responses: letters physically slide together as a tone glides (continuous blending); an extra sound box appears for the cluster; accept onset-rime at 5-6, phonemes at 6-8+; a digraph is one physical tile. Locale: digraph inventories differ (en sh/ch/th, de sch/ch, nl oe/ij, fi almost none).
- **F-125 · Sight words / decoding strategy (L5, ★★★).** Guesses from first letter + picture (three-cueing); reads words as pictures, fails on new font/case. Responses: never place a helpful picture beside a word to be decoded; distractors share the first letter (cat/can/cap); vary case and font across items.
- **F-126 · Rhyme and syllables (L6, ★★).** Detection before production (production only at 6-8); matches on first sound or meaning (cat–cow, cat–dog); syllable counting ~50% at 4, most by 5, fast-speech elision. Responses: 5-6 odd-one-out rhyme detection; distractors include a same-onset and a semantically related word, feedback highlights the rime; tap-a-drum per syllable with visible tokens. Locale: word lists must be native-authored.
- **F-127 · Spelling (L7, ★★).** Phonetic spelling is expected in the alphabetic phases; silent-e omitted/misplaced; doubling hard (8-9 only); vowel spelling depends on instruction. Responses: feedback shows the conventional pattern on the same sound boxes; a magic-e tile that visibly changes the vowel; doubling at 8-9 only.
- **F-128 · Sentences, capitals, punctuation (L8, ★).** Cannot find sentence boundaries; knows the rule but doesn't apply it; random capitals; exclamation marks used playfully (not an error to punish). Responses: reassemble cut-up sentences with the boundary as a gap closed by a stop; proofread OTHERS' sentences; a two-option toggle at sentence start. Locale: word order differs (V2 in de/nl/sv/da/no; verb-final subordinate in de; free order in fi) — per-locale sentence sets, never translated English.
- **F-129 · Comprehension (L9, ★★).** Literal recall fine, inference poor at 6; poor comprehenders don't integrate across sentences; sequencing by salience not story time. Responses: inference items carry ≥ 2-3 visible clues, picture-supported; feedback highlights the two sentences that together give the answer; picture-sequence with cause→effect arrows.

### Science (light, ★★; ages in sources often 9-12)
- **F-131 · Living / non-living.** "If it moves it's alive" (wind, cars); plants/seeds not alive. Response: sort by NEEDS (food/water/growth) with icons; a moving non-living distractor and a plant from level 1.
- **F-132 · Plants.** Plants get food from soil; fruit/vegetables/trees not plants. Response: plant-needs game: sun + water + air; soil as support.
- **F-133 · Animal classification.** Only large land mammals are "animals"; anything in water is a fish; whales are fish. Response: sort by observable features (legs, feathers, fur, fins) at 5-8; whale/bat/penguin as deliberate level-3 items.
- **F-134 · Day / night.** Sun "goes away"; 40% of 6th graders still wrong. Response: 5-8 sequence day events only; rotation model only at 8-9.
- **F-135 · Seasons / weather.** Winter = Earth farther from sun; seasons same everywhere. Response: seasons as observable patterns (clothes, trees, temperature), no causal astronomy. **Locale: seasons reversed in southern Brazil, mild in the tropics — never snow as the only winter cue.**
- **F-136 · Materials.** Object confused with material ("spoon" as a material); all plastic one property; melting understood only for water. Response: sort the SAME object made of different materials; property tests (bends, floats, transparent).

---

## 6 · Design implications (the rules the catalogue and every spec cite)

**F-215 · Level every global game by the MOST CONSERVATIVE system's age for that concept** (F-31): usually Finland/Germany/Norway for maths, England/US for language-specific literacy. A 5-6 game may only assume the pre-academic core (count to 10, compare, sort, 4 shapes, patterns, position words, rhyme/syllables, letter recognition — F-20 age-5 digest). Operation symbols, decoding, numerals beyond 20 are 6-8 content everywhere.

**F-216 · Objectives that get the MOST games are the intersection of demand (F-1) and 12-system commonality (F-21/F-22):** counting/cardinality, number bonds, +/− to 20, place value, compare/order, shapes, patterns, letter-sound/rhyme/syllables, clock to the half hour, measurement with units — each gets 4-8 games across bands and patterns (the within-subject repetition the brief calls "a decision, not an accident", and the cross-session spacing mechanism of F-41). Tables/division/fractions get 8-9 games only (F-26, F-27). Market-conditional objectives (money, fraction notation, grammar terms, physics) get 1-3 games each with `LOCALE_DATA` or an explicit market note (F-29, F-30).

**F-217 · Literacy games are language-universal by mechanic and per-locale by content** (F-22, F-24): letter recognition, upper/lower matching, initial sound, rhyme odd-one-out, syllable counting, blending (syllable tiles for Romance, letter tiles for Germanic/Nordic), sentence boundaries, sequencing/retell. English-only genres (Dolch sight words, silent e, bossy r) are either dropped or built as "irregular-word" games whose word list is per-locale (EN/FR/DK) — never as the base of the catalogue (F-7).

**F-218 · Science games are the observational common core only** (F-23, F-30): needs of living things, life cycles, seasons/weather sequences, body/senses, materials by property, day/night sequence, animal features — ≈ 10-12% of the catalogue, each with a hemisphere/locale note where relevant (F-135).

**F-200 · Subject weighting follows demand × universality.** Mathematics carries the most games: it is the most-demanded topic set (F-1, F-3), the most popular (F-2), and it transfers to all 11 languages unchanged (F-7). Literacy is second, but its English-specific genres (synthetic phonics phases, sight words, English grammar) must be re-cast as language-universal skills (letter recognition, rhyme, syllables, sentence order with per-locale sets) or built with per-locale content tables (F-7, F-122–F-128). Science is the smallest share: near-zero game demand (F-5) and curriculum expectations that are observational at this age (F-131–F-136); science games exist to cover the curriculum common core, not demand.

**F-201 · Every game is a cued retrieval loop with immediate enacted feedback** (F-40, F-43). No open free-recall for 5-6; recognition and completion formats.

**F-202 · Missed items re-queue with expanding lags and a last look** (F-41). Item count 8-15 so the queue has room (F-72).

**F-203 · Puzzle/manipulative structures over quiz wrappers** (F-48, F-63): arrange, complete, match, build, sort, compose; mirror the evidence-backed manipulatives exactly (F-50).

**F-204 · No decorative motion during thinking; text budgets per band** (F-42): 5-6 zero instruction text; 6-8 ≤ 8 words; 8-9 ≤ 2 short sentences.

**F-205 · One distinct, task-level, visual response per anticipated error** (F-43, F-47, F-62), taken from the F-1xx catalogue.

**F-206 · No points/stars/badges/unlockables; progress is the completed task; praise is process-level and varied** (F-44, F-66).

**F-207 · No timers or opponents by default; fluency = fading supports** (F-45, F-64).

**F-208 · Success band 80-90%, three-step support ladder, 3-up/2-down adaptation** (F-46). "Success is certain" is the mechanism by which young children get any retrieval benefit at all (F-40).

**F-209 · Tap-first; drag-and-drop only for 6-9 with tap fallback; 5-6 targets ≥ 64 px real** (F-49, F-68, F-69).

**F-210 · Invalid moves are refused by the object; brute force cannot count as first-try** (F-61, F-65).

**F-211 · Content is culturally portable by construction; locale-bound surfaces live in one table** (F-7, F-73): currencies, units (metric), number words, half-hour idioms (F-113), digraphs/letter sets (F-122, F-124), sentence sets (F-128), season cues (F-135), inverted number words in de/nl/da (F-108).

**F-212 · Match the appeal of answer-then-arcade with a character and a goal that IS the task** (F-11, F-63): the character's need is satisfied by the mathematics itself (feed N fish, fill the ten-frame tank), never by a bolted-on chase.

**F-213 · Audible confirmation encodes content where the Web-Audio constraint allows** (F-70): one tone per counted object, pitch rising with quantity, the "correct" chime only after the content sound.

**F-214 · Single-file, no-network games answer the loudest complaint class** (F-74, F-67): nothing between Start and Finish that is not the game.
