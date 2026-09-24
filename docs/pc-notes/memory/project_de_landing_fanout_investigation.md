---
name: project-de-landing-fanout-investigation
description: DE locale fan-out of the SEO/Landing-Page Program — COMPLETE end-to-end 2026-06-08 (STEPs 1–4; de.json 1779 landings; Math + readiness + literacy; all 3 German bands vorschule 1057/1-klasse 548/2-klasse 174). The FIRST full locale of the landing-program fan-out; CLAUDE.md §22.3 holds the durable locale-fan-out doctrine. NEXT = es.
metadata: 
  node_type: memory
  type: project
  originSessionId: 918017a6-7400-4e25-ad74-dc3f9d7843ed
---

# DE ARC COMPLETE 2026-06-08 — the first full locale (de.json 1779; all 3 bands)

**The de locale fan-out is DONE end-to-end.** STEPs 1–4 shipped + verified; de.json **1779** landings; Math + readiness + literacy; N-band **vorschule 1057 / 1-klasse 548 / 2-klasse 174**. **Durable per-locale doctrine now lives in CLAUDE.md §22.3** (this file is the detailed blow-by-blow). **NEXT = es** (2nd locale; operator pacing call — es brings Romance no-neuter gender, the Spanish onset inventory, es-native keyword research).

**Per-step summary + commits:**
- **STEP 1 — addition** (117, 1.Klasse, strand-only): `79e76623`.
- **STEP 2 — readiness** (978 Vorschule, 13 types): lead pattern-train `2bda39c2` → … → picture-sort de-orphan + 4 numeric DROPs `77741a96`. Engine `84c5dafc`; strand-labels `0b6c5fb6`.
- **STEP 3 — numeric Klasse** (419): code-addition `d7e88e65` (95, no-CCSS Rechenrätsel, 2.Klasse) + crossword `b46fbf71` (45, framework L.2.2.d, 2.Klasse — first framework-bearing render) + subtraction `d904c39d` (158, 1.OA.D.8, 1.Klasse, re-grade-up K coherence) + math-puzzle `992fde4b` (121, TWO-BAND 1.OA.C.6/2.NBT.B.5; §22 sharpening 0.773→0.642). Generator extended: per-coord `co.level` + level-aware cfg.standard/strand.
- **STEP 4 — literacy** (265; investigation-then-rule, all 6 rulings applied): find-and-count/letter-spotting `5cd9f200` (33, Vorschule readiness Anlaut; R5 phonetic re-author 40→33 de-specific) + matching `ddea9145` (44, 1.Klasse CARRIES RF.K.3.a — the sharp grapheme-domain case) + word-guess `122cb13d` (94, 1.Klasse CARRIES L.K.2.d) + prepositions split `64231d91` (fillin 48 1.Klasse L.K.1.e + mc 46 Vorschule readiness, one config) + find-and-count/hidden-object DROPPED `85b30431` (R4 count-bearing).

**Key doctrine (full version §22.3):** 3-band axis re-graded per coordinate by mechanic+quantity (never the EN band); **picture-domain→readiness / grapheme-text-domain→CARRIES** classifier; **R3** EN CCSS code = competency anchor regardless of band (no targetUrl); **R5** per-locale compat authority (phonetic re-author at the coords filter, NOT the shared EN compat); investigation-then-rule for held slices; the de-orphan `themeSubjectTagsWhere` is locale-agnostic; engine = `gen-de-readiness.js` (config-driven, +standard-guard) + `de-render.js` (datN) + per-type `de-readiness-<type>.js` + `de-<type>-coordinates.json`; gate `gate.js`; ledger `docs/seo-landing/mechanic-ledger-de.md`. 0 protected-core lines.

---

# STEP 2 — CLOSED 2026-06-08 (ALL 13 readiness types; de.json 1095 Vorschule)

**STEP 2 IS CLOSED.** 13 readiness types shipped+verified on the proven engine. Final sub-slice (commit `77741a96`): **picture-sort de-orphan (39)** + the **4 numeric DROPs** logged as locale-validity exclusions.
- **picture-sort** (the distinct 2-theme build): de has 99 `-vs-` candidate pairs (5 left categories × many right). de-native demand-cap = left∈{bakery 29, farm_animals 10} = **39** (the 2 highest-recognition Vorschule sort categories; dropped accessories/flowers/tree=60; don't uncap). Own `enum-de-picturesort.js` + `de-picture-sort-coordinates.json` (canonical=deck slug) + `gen-de-picturesort.js` (4-slot gender-safe render {A_PL}/{B_PL}/{A_GEN}/{B_GEN}+datN; body references BOTH themes' concrete nouns; Sortieren und Klassifizieren; chart-count fence). Gate PASS 0 FAIL/WARN, 0 digits, 0 dative bugs, both-themes nouns. **De-orphan VERIFY (de) PASS on the rendered grid** (dual-membership: bakery-vs-animals on BOTH /de/topic/tiere + /de/topic/backerei; anchor-precision 0-FP — the farm_animals substring-trap guarded; type-hub /de/topic/addition unregressed). `lib/topic-decks.ts themeSubjectTagsWhere` rode UNCHANGED; `verify-deorphan.js` extended with `--locale=de` + de config.
- **4 numeric DROPs RULED (locale-validity exclusions; decks stay /decks/; each parent type has a clean readiness face from another mode → no coverage lost):** picture-path/classic-maze (counts collectibles), find-objects/i-spy (enters counts), more-less/image-number (numeral compare), more-less/check-cross (source-confirmed NUMERIC: counts groups + enters numerals + marks ✓/✗). Logged in `mechanic-ledger-de.md`.

**STEP 3 opens next — operator rules before STEP 3:** the numeric Klasse slices (subtraction etc.) + the held code-addition/crossword grade-and-framework rulings. (STEP 1 = addition 1.Klasse 117, commit `79e76623`.)

---

# STEP 2 (readiness label-lock, Vorschule) — history (CLOSED 2026-06-08)

**Sub-step A SHIPPED** (`0b6c5fb6`): the 2 held CCSS-strand de-label corrections in `strand-names.ts` — Counting & Cardinality → **Zählen und Mengen**, Reading: Foundational Skills → **Schriftspracherwerb: Grundlagen** (affects activity pages + /standards hub; landings render l.strand raw so no current de landing touched; forward-ready for STEP-4 literacy).

**Engine** (`84c5dafc`): shared `scripts/seo-landing/de-themes.js` (41 object themes + 8 readiness-only: colors→Rottöne/emotions→Lachgesichter/body_parts/weather/spring/summer/winter/activities, gender-safe noun-only plurals) + generic `enum-coords-de.js --type` (handles null exerciseMode).

**pattern-train LEAD SHIPPED + VERIFIED** (`2bda39c2`): **238 Vorschule landings** at /de/worksheets/muster-zug-…, 5 modes (ab[null]/aab/abb/aabb/abc). Readiness: no standard, no framework chip, raw l.strand "Muster erkennen und fortsetzen (Vorläuferfähigkeit)", level='vorschule', age 5-6. enum 245→238 (4th_of_july dropped; pure-readiness ungated, all 48 themes valid). **Hit + fixed the §22 multi-mode-of-one-mechanic wall:** first gate FAILed (aab↔abb same-theme 0.856 on shared boilerplate) → **boilerplate→mode-true sharpening** (mode-true P2 pedagogy per mode: AB=Wechsel/AAB=Auftakt-lang-kurz/ABB=Echo-Nachklang/AABB=Päckchen-Gleichschritt/ABC=Sequenz) dropped it to <0.61 → gate PASS 0 FAIL/WARN. Verified live: Vorschule chip + 5-6 + Vorläuferfähigkeit strand; **0 Common Core / 0 educationalAlignment**; hub-bind LEAK=0 on /de/topic/muster-zug; auto-bounding (muster-zug-4-juli dropped stays /decks/). `gen-de-patterntrain.js` (render handles capital "Mit"+datN; Ihr-Kind→dein-Kind du-conversion w/ sentence-start cap). Tech-debt: `verify-hub-autobind` type-prefix count shows 0 for native `muster-zug-` slugs (cosmetic; LEAK=0 is the real check).

**STEP-2 continuation RULED (operator): proceed through all 13 readiness types on the proven cadence autonomously; each STOPS for its own verification before the next; STOP for an operator ruling ONLY on an interrupt; report at STEP-2 close or wherever the session ends.** Two pre-rulings: picture-sort de-orphan rides `themeSubjectTagsWhere` UNCHANGED (only add verify-deorphan.js --locale + rendered-GRID dual-membership; apply de demand-cap, don't uncap); alphabet-train stays "Buchstaben kennenlernen" readiness (STOP if phonetic_variety can't separate from STEP-4 phonics).

**GENERIC ENGINE built** (`de-render.js` shared datN/render [dative +n after den/mit; Ihr→dein du-conversion] + `gen-de-readiness.js` config-driven + per-type `de-readiness-<type>.js` config). Scales to all readiness types.

**SHIPPED + VERIFIED (commit `b5afe271`): grid-match (47, gitter-zuordnung-*, Visuelle Wahrnehmung Teil-Ganzes) + bingo (38, bingo-*, Visuelle Differenzierung Zuordnen) + pattern-worksheet (45, muster-arbeitsblatt-*, Muster — the generic-printable face, gate cross-class 0.536 vs pattern-train, NO collision).** 130 Vorschule landings; gate PASS 0 FAIL/WARN; LEAK=0 each; DOM 0 Common Core / 0 educationalAlignment / Vorschule chip. de.json **485 total** (117 add + 238 pattern-train + 130 these). den-dative datN verified 0 bugs.

**ENUM SURPRISE (logged):** several EN single-mode types are MULTI-MODE in de — **missing-pieces** (one-missing 47 + two-missing 46 = 93), **shadow-match** (find-shadow 45 + make-whole 47 = 92), **picture-path** (choose-path 47 + classic-maze 38 = 85; de uses exerciseType `picture-path`, NOT `picture-trail` which enum'd 0). Each multi-mode type needs per-mode source-read + mode-true frames (§22 watch). Coords already pulled (de-{missing-pieces,shadow-match,picture-path}-coordinates.json).

**STEP-2 PROGRESS (this session) — 12 of 13 readiness types SHIPPED + verified; de.json 1056; only picture-sort remains.** All on the proven `gen-de-readiness.js` config engine (per-type `de-readiness-<type>.js`), gate 0 FAIL/0 WARN throughout, LEAK=0 each, repoint 0-missing. Commits: `b5afe271` (grid-match 47 + bingo 38 + pattern-worksheet 45 = 130) · `d7969779` (missing-pieces 93 + shadow-match 92 + picture-path 85 choose-path-only = 270; multi-mode discovery + `von`-dative render extension) · `1eff863c` (sudoku 94 easy/medium digit-free + find-objects 46 find-odd + odd-one-out 46 same-theme = 186) · `973fbe2b` (big-small 77 findBig/orderAsc per-mode-strand digit-free + more-less 40 image-image + alphabet-train 36 letter-recognition = 153). Lead `2bda39c2` (pattern-train 238). **Engine extensions:** `de-render.js` always-dative prepositions (von/aus/bei/nach/zu, not just mit/den); `gen-de-readiness.js` `cfg.strand` accepts per-mode function.

**DOCTRINE confirmed:** §22 multi-mode watch held on EVERY difficulty/param-twin (missing-pieces one↔two 0.642, sudoku easy↔medium, big-small findBig↔orderAsc 0.585) — mode-true frames pre-empted the wall, no sharpening needed. Vorschule no-digits-in-copy applied (sudoku + big-small orderAsc). Validity gate drops per mechanic (big-small `physical_size_orderable` −13; more-less `discrete_countable` −8).

**4 DEFERRED NUMERIC INTERRUPTS — awaiting operator ruling (decks stay /decks/, recommend DROP, mirror EN deferring counting mechanics):** (1) picture-path/classic-maze (38, counts collectibles "Bild=Anzahl") · (2) find-objects/i-spy (46, enters target counts) · (3) more-less/image-number (48, compares pile to numeral) · (4) more-less/check-cross (46, UNVERIFIED — needs a ledger-lock). All in `mechanic-ledger-de.md`.

**LAST type = picture-sort (de-orphan) — next session, self-contained:** (a) source-read sort/classify mechanic; (b) **its own `-vs-` enumerator** (NOT enum-coords-de.js — picture-sort decks carry a combined `X-vs-Y` subjectTag; mirror the EN Wave-5 picture-sort enumerator); (c) **de-native demand-cap** (EN W5 capped 244→40; use de demand evidence, DON'T uncap); (d) frames (Sortieren und Klassifizieren, single null mode); (e) config + gate + ship + repoint; (f) **de-orphan: `topic-decks.ts themeSubjectTagsWhere` rides UNCHANGED (locale-agnostic); extend `verify-deorphan.js` with `--locale=de`** (hardcodes /en/) + confirm dual-membership on the RENDERED GRID (headless, hydration-gated). Then STEP 2 closes → report → STEP 3 (numeric Klasse + code-addition/crossword grade+framework, operator rules first).

---

# STEP 1 (addition lead) — SHIPPED + VERIFIED 2026-06-08 (commit `79e76623`)

The de proof slice is LIVE + verified end-to-end. **117 German addition landings** at `/de/worksheets/<native-slug>` (image-image 38 + image-number 41 + mixed 38), all **1. Klasse** (Zahlenraum bis 20).

**Enum + ceiling (interrupt checkpoint):** 144 de addition decks → 140 valid after dropping 4th_of_july; **8 themes auto-dropped countability-invalid** (colors/emotions/body_parts/weather/spring/summer/winter/activities — EN body_parts-catch at the de boundary; their live `/de/decks/` stay /decks/ via conditional repoint, confirmed by auto-bounding) → 117. **Ceiling CLEAR:** extended `check-sum-ceiling.js` to parse addition `operandA/operandB` (it only had addends/a/b/sum → first run was a false-clean max=0); `maxCleanNumber=10`, 0 breaches @20 → all 1.Klasse.

**Cell-space lesson:** the 6×4=24 grandfather (held for EN image-number @24<50) **FAILED the de gate** (31 pairs ≥0.80) @24<38/41 → bumped image-image+image-number to **8×7=56** (10 extra T1 native frames) → gate PASS (worst 0.610, 0 FAIL). `datN()` dative-+n helper applies only after `mit` (+optional den/adj); gen always a PLURAL noun; linguist's markdown P3 adapted to plain prose (route renders `<p>{p3}</p>`).

**Verified on rendered DOM:** title `Addition mit Kühen, Schafen und Hühnern – Arbeitsblatt für die 1. Klasse` (datN correct); JSON-LD `educationalLevel:"1. Klasse"` + `typicalAgeRange:"6-7"` + `teaches:"Rechnen und algebraisches Denken"`; **0 "Common Core"** on de; de chrome; **first en↔de cross-locale hreflang** on rendered `<link>` tags of BOTH de page + EN sibling (reciprocal, x-default→en; EN re-rendered via full deploy.sh rebuild); **hub auto-bind LEAK=0**; public de landing 200; deck.html canonical repointed (118 decks/942 repl). 0 protected-core.

**Files (`79e76623`):** NEW de.json(117) + gen-de-addition.js + enum-addition-coords-de.js + de-addition-coordinates.json + mechanic-ledger-de.md; MOD landing-content.ts (FILES{en,de}+getSiblingLandingsByCoordinate) + worksheets/[slug]/page.tsx (de 3-band LEVELS + FRAMEWORK_BY_LOCALE + UI_STRINGS + cross-locale hreflang) + check-sum-ceiling.js(operandA/B) + repoint-deck-canonical.js(de.json) + verify-hub-autobind.js(--locale).

**NEXT = STEP 2 (readiness label-lock — de bulk, Vorschule + the 2 held CCSS-strand improvements). Awaiting operator ruling. Do NOT auto-start.**

---

# DE Landing Fan-Out — STEP-0 Ledger LOCKED 2026-06-08 (the spine, locked + approved)

EN landing arc COMPLETE (1812, 8 waves — [[project-seo-landing-page-program]] + CLAUDE.md §22). Locale fan-out opened; order en(done)→**de**→es→nl→fr→it→pt→sv→da→no/fi-last. Opening investigation (3 native-ensemble agents) + **Rulings A-E GRANTED** + **STEP-0 locale-ledger LOCKED**. **Full record = plan file `C:\Users\rkgen\.claude\plans\plan-mode-commission-de-enchanted-lagoon.md`.** de executes GATED, one scoped step at a time; operator rules before each slice opens.

**Rulings A-E (granted):** A grade=mechanic+quantity re-derived over full de corpus (ledger-level-OVERRIDE at locale boundary, never a translated EN band). B framework=**Lehrplan** human-facing / **Bildungsstandards der KMK** in JSON-LD for coded coords; readiness pages NO framework chip + OMIT educationalAlignment. C drop chart-count + 4th_of_july (locale-validity exclusions, not gaps). D native ensemble authors compat+P1+labels (no MT; T1 author/review + T2 stratified-8 + T3 lint). E single locale-scoped de arc hardest-first (NOT 8-wave re-run). Gender-lint RULED IN, proven on addition lead.

**THE SPINE (STEP-0 locked finding):** German axis collapses **4 bands → 3 = Vorschule / 1. Klasse / 2. Klasse.** No German Kindergarten grade, no K≤10 band. EN-Preschool readiness + EN-K readiness BOTH → **Vorschule** (5-6; EN-Preschool 3-4 bumps up, German 3-4 is Krippe); EN-K arithmetic → **1. Klasse** (bis 20, alongside EN-Gr1); EN-Gr2 → **2. Klasse** (bis 100). `coordinate.level` is RE-DERIVED per coord at authoring (two EN-`kindergarten` coords split to different de bands → no LEVELS[en-level] lookup possible); de LEVELS = clean 3-entry map.

**Slug level-token PINNED:** `vorschule` / `1-klasse` / `2-klasse` (the `1-klasse` form, matches de taxonomy; `kindergarten` slug NEVER a de level-token). Head noun `Arbeitsblätter` + kostenlos/PDF/zum-Ausdrucken.

**RE-GRADE TALLY (of 1,353 EN-K landings, EN-rider counts — actual de bounded by de-deck availability, confirmed per-slice via `language='de'` Prisma enum + check-sum-ceiling --locale=de):** **238 → 1. Klasse** (addition 144 + subtraction 94); **1,072 → Vorschule** (837 perceptual: grid-match/missing-pieces/bingo/sudoku/picture-sort/odd-one-out/find-objects/pattern-train/pattern-worksheet/picture-trail/shadow-match + 235 literacy-provisional: find-and-count/matching/word-guess/prepositions, STEP-4 flagged); **43 dropped** (chart-count). Non-K: EN-Preschool 190→Vorschule; EN-Gr1 98 clean→1.Klasse (code-addition 44 flagged); EN-Gr2 33 clean→2.Klasse (code-addition 50 + crossword 44 flagged).

**FLAGGED (STOP-and-rule at their slice):** (1) the 3-band collapse (operator ruling now). (2) code-addition Gr1+Gr2 — STEP-3 (quantity-true ≤20=Kl.1 vs Geheimschrift/Kodierrätsel Kl.2 demand + weak standard-fit → maybe readiness Rechenrätsel, no CCSS). (3) crossword — STEP-3 (Kl.2 Deutsch Wortschatz/Kreuzworträtsel). (4) literacy set find-and-count(Anlaut)/matching(Buchstabe-Laut)/word-guess/prepositions — STEP-4 (Schriftspracherwerb/phonologische Bewusstheit readiness; Vorschule-vs-Kl.1 straddle + framework). (5) matching carries a standard but is a phonics-readiness mechanic.

**Compat (de):** collective_risk → largely FALSE (plural-only frame can't emit partitives — true locale property); phonetic_variety → re-authored for German Anlaut at STEP-4; discrete_countable/physical_size_orderable carry from EN. **Labels:** CCSS strands de-final (Rechnen und algebraisches Denken, Zahlen und Rechnen im Zehnersystem, Geometrie; held improvements Zählen-und-Mengen + Schriftspracherwerb at label-lock); readiness = **Vorläuferfähigkeit** set (Visuelle Wahrnehmung/Differenzierung, Logisches Denken, Sortieren+Klassifizieren, Räumliches Denken, Muster erkennen und fortsetzen, Größenvergleich, Buchstaben kennenlernen).

**Gender-safe frame (load-bearing):** slot theme noun ONLY as nom/acc PLURAL after "die", or in a prepositional dative-plural (+n helper), or after a fixed-neuter anchor (das Arbeitsblatt/das Bild/das Größte/eines/welches); never singular/after-article; pull stored plural; keep umlauts/ß in prose, fold only in slugs. de gender-lint = pre-render gate (FAIL if slotted token singular or after der/die/das/ein), verified on rendered artifact, proven on addition lead.

**Code-wiring (EN-pinned → de):** landing-content.ts FILES `{en,de}`; route de 3-band LEVELS + per-locale framework map + de UI chrome (breadcrumb, `eyebrow+'s'` English-plural, CTA buttons, headings); repoint/verify-hub/verify-deorphan read en.json hardcoded → de; theme-mechanic-compat de-key; NEW de.json + de gender-lint + docs/seo-landing/mechanic-ledger-de.md. Cross-locale hreflang: EN sibling re-emits en↔de on rendered `<link>` tags (first cross-locale pairing). 0 protected-core throughout.

**STATUS: STEP-0 ledger LOCKED + operator-approved. NEXT = STEP 1 (addition lead) — gated, awaiting operator to OPEN it.** STEP 1 proves: addition.html source-read + de enum + check-sum-ceiling --locale=de (bis-20→1.Klasse), gender-safe addition frames (T1), ship, repoint --locale=de, rendered-DOM hub verify, gender-lint + 1.Klasse chip + first en↔de hreflang. Do NOT auto-start; await the open.
