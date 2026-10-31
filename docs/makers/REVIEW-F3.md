# Review F3 — adversarial review of the worksheet-maker design (2026-10-31)

Reviewed: `ARCHITECTURE.md` (F1), `ENGINES.md` (F2a), `ENGINES-ART.md` (F2-art), `NEW-TEMPLATES.md` (F2b) against the code at `scripts/worksheet-gen/`, `REFERENCE APPS/`, `REFERENCE TRANSLATIONS/`, `mini tools/`, `frontend/`, and against `OLD-APP-LESSONS.md`, `FABLE-BRIEF.md` §2 and the CLAUDE.md standing rules. Every change was made **in place** in the four documents and is marked **F3**. No code, no CLAUDE.md, no memory was touched; nothing was committed or deployed. New files: this one and `OPEN-DECISIONS.md`.

**Counts.** Contradictions resolved: **14**. File:line claims checked: **≈ 105 claim groups**, of which **25 were wrong** (17 wrong or out-of-range line numbers / counts, 4 stale because the code was fixed the same day the document was written, 2 omissions, 2 design statements the code contradicts) — all corrected in place. Rule gaps fixed: **9** (one in the review method itself). Templates removed: **6** (303 → 297); templates changed: **17**. Effort reconciled to **one number: ≈ 450 sessions** (25 platform + 266 makers + ≈ 160 new templates); ship-first option ≈ 390.

---

## 1. What changed, by document

### 1.1 ARCHITECTURE.md (F1)
| where | change | why |
|---|---|---|
| §0 owner page, §11.2, §14.3 | effort: "≈ 230" struck; **≈ 450** written in (25 + 266 + ≈ 160); the per-maker rule now *excludes* the new templates | §14.3 said 2–4 sessions per maker *including* ≥ 5 new templates while §11.2 priced those at ≈ 3 sessions — arithmetically impossible |
| §14.3 batches | B1 + `fractions` (10), B3 + `sorting` (10), B7 "(7)" → "(8)"; batch sums replaced by ENGINES Part 2's | fractions and sorting were in no batch (ENGINES found); the lists did not match their headers |
| §14.1 | a **named fallback for every spike** (S2, S4, S5 had none) and the order dependencies (module split in P1; pins + trace store in the S6 slot; the per-key review flag before sorting tier 3) | buildability: a spike miss must never stall the order |
| §14.2, §18-G | pilot: spelling's two retirements are new engines; ENGINES' sight-words alternative cross-referenced → OPEN-DECISIONS #2 | F1's alternative (sentences) is superseded |
| §2.1 | `sharp` in **6** `lib/` files (grep), not 9; `distinct-pictures.js` md5 + `letter-strokes.js` `new Function` named as Node touch points | measured |
| §2.2 | three rows added: `platform.pictureHash` (md5 → per-theme signature slice), bundle `alphabet-trace-core.js` as a module, the ENGINES-ART §2.2 module split as a lint prerequisite | the §2.5 lint as written fails every picture maker |
| §2.5 | lint also bans `new Function(` / `eval(` and `Date.now`/`Math.random` on build paths; poison cases named | `letter-strokes.js:78` |
| §6.1 | "4 types" → **23 type files** (19 maze faces are `{...base}` spreads of K-405 and inherit its screenshot verify); only G2-377/K-252/K-253 stay build-time-only | `K-406…413`, `G1-420…428`, `G2-392/393` read |
| §8.2 | the hosted-worksheet precedent (`play/w/[linkId]/route.ts:13`) is `private, max-age=300` — **no CDN**; the maker's public edge cache is a deliberate departure, stated; `tools/[tool]/page.tsx:50` → `:48` | wrong citation |
| §11.1 | `params = Object.keys(difficulty[2])` holds layout internals → per-type `controls` allowlist | `extract-type-inventory.js:78` |
| §11.2 | `_shared` 31 → 32; the 12th screen kind `type-cross` | measured |
| §11.3, §18-E | thumbnails 8,300/100 MB → **≈ 11,600 / 140 MB** with 297 new templates | NEW-TEMPLATES C |
| §12, §15 gate 10 | native review = **ONE reviewer agent over the 11-locale dump**, never one per locale | CLAUDE.md #1 (no fan-outs) + #2 |
| §15.1 A17 | → ENGINES #23 (same-different-Q1 is the silhouette question) | wrong pointer |
| §17.1 | mazes: pinned seeds, not live generation; picture-tracing: the tracer runs live today and `data/pt` holds no traces → new trace store | ENGINES-ART measured |
| §17.2 | FD tail 1.68 MB raw / ≈ 450 KB gz; rounding + `cands` split | measured |
| §17.3 class A | CBN live check = the labeller (`labelArt`/`checkSolid`), not a fill test; fully-painted is enforced offline | ENGINES-ART §2.1 |
| §4.2 | "fading rows" = the Rows control, never a gallery card (`fadedStrokeLane` exists) | NEW-TEMPLATES removals |
| §18 | pointer to OPEN-DECISIONS.md | consolidation |

### 1.2 ENGINES.md (F2a)
| where | change | why |
|---|---|---|
| Part 1 header | two standing corrections: "native panel" = one reviewer over 11 locales; three defects fixed in code the same day (commits `e934eb54a`, `9f7ec9973`) | CLAUDE.md #1; `git log` |
| [multiplication-division-Q1] | G2-211 and G3-328 **FIXED** (`mulGlyph` at `G2-211:63`, `G3-328:12,46`); G3-358 `DOT_LOCALES` still open | code read after commit `e934eb54a` |
| [telling-time-Q1] | 8 rows → **16 rows** (8 hour/half + 8 five-minute) | `clock-core.js:61-82` counted |
| [logic-puzzles-Q1], operator 11 | G3-349 **FIXED** (`uniquelySolvable`, rank test, `:19`, `:81-82`); remaining: confirm the live-deck republish, make `verify` re-run the test | commit `9f7ec9973` |
| [sorting-Q1], #24 | `object-attributes.json` has **no per-key `reviewed` flag** (only `count: 933, reviewed: 456`) → tier 3 is a build prerequisite, not a toggle; `living`/`natural` excluded as science | file read |
| #5 | open number line → `type-number` (D6) | NEW-TEMPLATES 5-T1 |
| #25 #26 #28 #30 #31 | aligned with ENGINES-ART: d2d 4.3 MB gz / `tap-order`; cbn *Colours* is the Level, effort 6; mazes pinned seeds, effort 7; htd restricted layers, effort 6; pt live tracer + trace store, effort 6 | ENGINES-ART §3–§8 |
| #50, [word-problems-Q1] | `word-problems-levelset.js:226-241` → `:137` / `:165` / `:16-17` (the file is 203 lines) | out of range |
| Found-in-ARCHITECTURE table | marked resolved in place | — |
| Effort total, operator 15 | reconciled ≈ 450 | — |

### 1.3 ENGINES-ART.md (F2-art)
| where | change | why |
|---|---|---|
| §3.1 | `lib/fd-compose.js` citations `:128-236` etc. were past the file's end (146 lines) → `:11-12, :22, :37, :48-49, :57, :72, :80, :94, :130, :143` | measured |
| §4.1 | `primitives/scene-dot-figure.js` `:187-268` past the end (149 lines) → `:41-42, :101-102, :108, :113, :117, :122` | measured |
| §12 | marked resolved in place; the two self-corrections recorded; the +4 effort written into the programme figure | — |

### 1.4 NEW-TEMPLATES.md (F2b)
| template | change | why |
|---|---|---|
| **6-T2** Make-ten bridge (bond) | **REMOVED** → a `Model: line / bond` control on number-lines T3 + a cross-link card | the child fills the same three boxes as 5-T3; a second drawing is not a new task |
| **13-T6** Fact triangles ×/÷ | **REMOVED** → cross-link to number-bonds T6 | it is 6-T6's `Operation (+− / ×÷)` control value |
| **20-T4, 32-T4, 33-T3** Fading rows | **REMOVED** → the `Rows` control (ARCH §4.2) on the existing tracing templates | a control is not a template; `trace-path.js:336 fadedStrokeLane` already exists |
| **51-T4** Number-word search | **not counted** (cross-link to 57-T5) | counted twice (the doc's own "count once in the owner" rule) |
| 1-T6, 4-T3, 6-T1, 6-T5, 20-T1, 20-T2, 51-T5 | ranges start at 1; the Zahlenhaus 0 + N floor and the "0 with an empty frame" row removed; the rainbow runs 1–9 | CLAUDE.md "counting never includes 0" (A16) |
| 7-T6 Error finding; 28-T4 Write the directions | `type-number` added for every written box | D6: a written box gets a written screen |
| 18-T6 Quadrilateral sort | "rhombus (not a square)" label | a square had two right bins (A4) |
| 23-T4 Find the twin | sketch showed two unchanged fish → exactly one; "a small change" distractor dropped | two right answers (A4); FD's task |
| 13-T1 Multiplication square | 12 × 12 dropped | above the K-3 ceiling (3.OA.C.7 within 100; every national table runs 1–10) |
| 12-T2 Partition it yourself | triangle/hexagon are an additive `shape` on `fraction.js` (today circle/bar/square) | `fraction.js:3` |
| 24-T2 Venn sort | "3.MD" code removed (not a classification standard) | wrong teaching point |
| 60-T6 Shape and colour bingo | level 2 prints the colour word under each shape; "print in colour" | hue-only meaning dies on a copier (`coins.js:4-5` rule) |
| 50-T1 | `word-problems-levelset.js` line refs | out of range |
| Summary, headers, D, E, C, Total | counts 303 → 297; 21 makers below five; one reviewer over 11 locales; 1,052 templates / 140 MB; ≈ 160 sessions | — |

---

## 2. Contradictions between the documents — resolved

| # | documents | contradiction | resolution (by reading the code) |
|---|---|---|---|
| 1 | ARCH §14.3 vs ENGINES Part 2 | 58 makers in the batches; fractions and sorting missing; B7 "(7)" lists 8 | ARCH fixed: B1 10, B3 10, B7 8 → 60 |
| 2 | ARCH §0/§14.3 vs ENGINES total vs NEW-TEMPLATES | 230 vs 287 vs (templates uncounted) | **≈ 450**; ARCH's "templates inside the per-maker figure" was impossible |
| 3 | ARCH §14.2 vs ENGINES op. 2 | pilot bound maker spelling (two new engines) vs sight-words | kept as an operator decision (#2); ARCH annotated |
| 4 | ARCH §17.1 vs ENGINES-ART §8.2 | mazes "generated live" vs 0.4–30 s retry search → pins | ARCH fixed (ENGINES-ART is right: `K-405:46 mazeFor`, the measured table) |
| 5 | ARCH §17.1/§17.3 vs ENGINES-ART §7.2 | tracer "run offline" vs live at build | ENGINES-ART right: `pt-scene.js:24-28 traceOf`, `data/pt` has no traces → ARCH fixed |
| 6 | ARCH §17.3 vs ENGINES-ART §2.1 | live CBN "fully-painted" check vs the labeller | ENGINES-ART right (`cbn-render.js:75-137, 189-228`) → ARCH fixed |
| 7 | ARCH §6.1 vs ENGINES-ART §12 | 4 raster-verify types vs 23 | ENGINES-ART right (spread specs) → ARCH fixed |
| 8 | ARCH §2.5 vs ENGINES-ART §2.2 | lint vs pure code inside `sharp` files | split = P1 prerequisite → ARCH fixed |
| 9 | ENGINES #26/#28/#30/#31 vs ENGINES-ART cards | Colours knob / live mazes / free layers / offline tracer; efforts 5/6/5/5 vs 6/7/6/6 | ENGINES fixed to ENGINES-ART |
| 10 | ENGINES #5 vs NEW-TEMPLATES 5-T1 | open number line printable vs `type-number` | NEW-TEMPLATES right (D6) → ENGINES fixed |
| 11 | ARCH §11.3/§18-E vs NEW-TEMPLATES C | 8,300 / 100 MB vs 11,600 / 140 MB | ARCH fixed |
| 12 | ARCH §11.2 vs ENGINES Part 3 §B | 11 screen kinds vs the 12th `type-cross` | ARCH annotated |
| 13 | ARCH §2.2 vs ENGINES found-table | `distinct-pictures.js`, `letter-strokes.js` Node paths missing | ARCH rows added |
| 14 | ARCH §11.1 vs ENGINES found-table | controls from `params` vs layout internals | ARCH fixed (allowlist) |

---

## 3. Claim check (file:line against the code)

Legend: ✓ as cited · ✗ wrong (fixed in place) · ~ right in substance, line number or count off (fixed).

| # | claim (document) | file:line | verdict |
|---|---|---|---|
| 1 | type module shape (ARCH §2.1) | `types/k/K-002-count-and-circle.js:13-32` | ✓ |
| 2 | `verify(page)` uses `page.evaluate` (ARCH) | `K-002:77-78` | ✓ |
| 3 | `build({theme,difficulty,locale,unit},{rng…})` (ARCH) | `render/render-instance.js:27` | ✓ |
| 4 | Letter en / A4 others (ARCH) | `render-instance.js:20` | ✓ |
| 5 | `page.pdf preferCSSPageSize` + `el.screenshot` (ARCH §3) | `render-instance.js:60-62` | ✓ |
| 6 | screen/key rebuilt from the seed, `meta` asserted identical (ARCH) | `render-instance.js:68-73, 82-83, 357-359` | ✓ |
| 7 | geometry captured as % of `[data-lcs-page]` (ARCH) | `render-instance.js:289-342` | ✓ |
| 8 | unfilled instruction token refused (ARCH §15.1 A5) | `render-instance.js:31-32` | ✓ |
| 9 | `document.fonts.ready` before measuring (ARCH §16) | `render-instance.js:50` | ✓ |
| 10 | seed = sha1 → mulberry32; `instanceSeed` string (ARCH) | `lib/rng.js:11-21, 39-46` | ✓ |
| 11 | shell reads `page.css` + `fonts.css` with `file://` rewrite; content box 186×250 mm; `@page`; one `<h1>`; `CHROME[locale]` (ARCH) | `page/shell.js:11-22, 91, 97, 25-37` | ✓ |
| 12 | `.ws-page` 703 × 945 px (ARCH) | `page/page.css:16-18` | ✓ |
| 13 | lints in-page; `freeClaim.selfTest()`; broken-image lint; art-panel exclusion (ARCH §6) | `qa/lints.js:10, 20-22, 33, 92-94` | ✓ |
| 14 | runtime: `fs`/`vm` for translations-shared; 11 KINDS; `runtimeStrings` throws; % positioning; `data-lcs-alts`; `ctx.keys`; `__PDF_URL__`; trace-path path compare (ARCH) | `emit/interactive-runtime.js:53-71, 60, 74-85, 91, 178, 368-369, 530-536, 585, 318` | ✓ |
| 15 | `fileUri` prefers `themes-512`, returns `file://`; `labels()` from vocab (ARCH/ENGINES) | `image-cache/resolve.js:10-11, 33-47, 49-59` | ✓ |
| 16 | key text seated by measured x-height; `textLength` (ARCH §16) | `lib/key-on-row.js:13, 30-44` | ✓ |
| 17 | measured advances, throw on an unmeasured glyph (ARCH §2.1) | `primitives/bankword-width.js:12-24` | ✓ |
| 18 | `withLayoutFit` + `qaRetries` (ARCH §4.4/§6.2) | `lib/layout-fit.js:13-29` | ✓ |
| 19 | pageFill ≥ 55 %, band ≤ 20 % (ARCH §15.1 B2) | `lib/page-fill.js:28-29` | ✓ |
| 20 | key text measure = canvas `measureText` (ARCH §6) | `qa/key-text-measure.js:11-16` | ✓ |
| 21 | FD diff is already an in-page canvas diff (ARCH §17.1, ENGINES-ART) | `lib/fd-browser-diff.js:19-89` | ✓ |
| 22 | hm-verify: `sharp` only rasterises (`:27-34`) and decodes (`:74`); morph/clusters/flood pure (ARCH/ENGINES-ART) | `lib/hm-verify.js:23-74` | ~ pure part is `:35-70` (ARCH said 35-73) |
| 23 | `sharp` in 9 lib files (ARCH §2.1) | grep `lib/*.js` | ✗ 6 |
| 24 | `i18n/strings.js` loads per-locale JSON; resolve chain (ARCH §11.1) | `i18n/strings.js:16-17, 25-39` | ✓ (note: it DOES fall back to `en` at `:33` — the browser platform must stop that, as ARCH §4.1a F5 says) |
| 25 | b3 namespace merge via `readdirSync` + dynamic `require` (ARCH §2.2) | `templates/components-b3.js:17-18` | ✓ |
| 26 | K-405 dynamic `require` of locale text; `page.screenshot` in verify (ARCH) | `types/k/K-405-maze-puzzles.js:25, 85, 256` | ✓ |
| 27 | "4 types use screenshot/page.$" (ARCH §6.1) | grep + `K-406…` spreads | ✗ 23 types (4 files) |
| 28 | `interactiveInstruction` throws on a missing locale (ARCH §12) | `cli.js:30-37` | ✓ |
| 29 | cloze header: 3-line title + 3-line instruction leave 710 px (ARCH §4.4) | `types/g1/G1-350-cloze.js:46-49` | ✓ |
| 30 | `distinct-pictures.js` md5 of files via `fs`+`crypto` (ENGINES found) — missing from ARCH §2.2 | `lib/distinct-pictures.js:7, 21` | ✓ (ARCH omission fixed) |
| 31 | `letter-strokes.js` reads the core with `fs` + `new Function` (ENGINES found) — missing from ARCH | `data/tracing/letter-strokes.js:42-45, 75-83` | ✓ (ARCH omission fixed) |
| 32 | `params = Object.keys(difficulty[2])` (ENGINES found) | `scripts/makers/extract-type-inventory.js:78` | ✓ (ARCH §11.1 fixed) |
| 33 | 31 factories under `types/_shared/` (ARCH §11.2) | `ls` | ✗ 32 |
| 34 | `StudioStory` / `StudioShareLink` precedent (ARCH §8.1) | `frontend/prisma/schema.prisma:1455-1498` | ✓ |
| 35 | hosted store: 300 per teacher, 200 MB, 12-char link alphabet (ARCH) | `frontend/lib/hosted-worksheets/core.ts:27, 31, 62-68` | ✓ |
| 36 | quota: 3/month, 10/day; anon download → `signup_required`; subscriber/bot unlimited; upsert (ARCH §9) | `frontend/lib/quota.ts:27-28, 101-134, 169-172, 202-205, 225-229` | ✓ |
| 37 | `POST /api/quota/check-and-increment` 200/401/402 (ARCH §9) | `…/check-and-increment/route.ts:11-19` | ✓ |
| 38 | `makerGeneratorUrl`, `MakerLanding.tsx:75` launch, `deck-actions.js` slug → URL (ARCH §13) | `frontend/lib/seo/maker-content.ts:83-85`; `frontend/components/makers/MakerLanding.tsx:75`; `scripts/lib/deck-actions.js:146-158` | ✓ |
| 39 | landing ISR 3600 (ARCH §8.2) | `frontend/app/[locale]/tools/[tool]/page.tsx:50` | ~ it is `:48` |
| 40 | hosted-worksheet route as the precedent for `public … s-maxage=300` edge caching (ARCH §8.2) | `frontend/app/play/w/[linkId]/route.ts:13` | ✗ precedent is `private, max-age=300` (no CDN) — stated as a deliberate departure |
| 41 | `pdf-lib ^1.17.1` already a dependency (ARCH §3) | `package.json:17` | ✓ |
| 42 | fonts.css self-hosted; `maker-content/<locale>.json` exists (ARCH) | `assets/fonts/fonts.css`; `frontend/messages/maker-content/` | ✓ |
| 43 | 100 themes / 2,837 nouns; 50 BW themes / 1,325 nouns (ARCH, ENGINES Part 3 §E) | `cache/manifest.json` (node count) | ✓ |
| 44 | `data/art-extents.json` + `artExtentSync` (ENGINES measurement-Q1) | `image-cache/silhouette.js:117-122` | ✓ |
| 45 | mazes "generated live" (ARCH §17.1) | `K-405:46 mazeFor`, ENGINES-ART §1.1 table | ✗ a retry search (0.4–30 s) → pinned seeds |
| 46 | picture-tracing tracer "run offline" (ARCH §17.1) | `lib/pt-scene.js:24-28, 116`; `ls data/pt` (index + symmetry only) | ✗ live at build; no trace files |
| 47 | CBN fully-painted check live over `path[data-lcs-region]` (ARCH §17.3) | `lib/cbn-render.js:75-137, 147-178, 189-228` | ✗ the live checks are the labeller/solid tests |
| 48 | `scene-count.js` samples nouns, `mixedScatter` cell grid + jitter + ±8° (ENGINES counting-Q1) | `types/_shared/scene-count.js:31-37, 66-89`; `templates/components.js:68-92` | ✓ |
| 49 | `iconRows :10`, `iconScatter :43`, `chipRow :95`, `answerBox :105`, `distractorsFor :111` (NEW-TEMPLATES) | `templates/components.js` | ✓ |
| 50 | column arithmetic: carry mini-row above, 20 px headroom for subtraction, Level Set knobs, verify checks digits (ENGINES add-sub-Q1) | `types/_shared/column-arithmetic.js:8-11, 55-56, 79-87, 143-153, 165` | ✓ |
| 51 | notation table (`·` de/sv/da/no/fi; `/` sv; `:` de/it/nl/da/no/fi) (ENGINES mult-div-Q1) | `types/_shared/notation.js:4-7, 16-22` | ✓ |
| 52 | G2-211 literal `×` (ENGINES) | `types/g2/G2-211-array-multiplication.js:62-64` | ✗ stale — `:63` uses `mulGlyph` (commit `e934eb54a`) |
| 53 | G3-358 second `DOT_LOCALES` table (ENGINES) | `types/g3/G3-358-times-tables.js:25, 90` | ✓ still open |
| 54 | G3-328 prints `x` for × (ENGINES) | `types/g3/G3-328-input-output-table.js:12, 21, 46` | ✗ stale — `mulGlyph` at `:46` (same commit) |
| 55 | word-problem frames: slots, 8 names, de/fr/pt frames, fr `{il}`, fi partitives (ENGINES wp-Q1) | `data/word-problems/frames.js:3, 14-23, 53, 107-110, 140-142, 290-292` | ~ `:74` cited as a fi frame is the name "Hugo" |
| 56 | `{Q}` gender agreement, fr name gender throws (ENGINES) | `lib/word-problems-levelset.js:16-17, 102-106, 118, 197` | ✓ |
| 57 | `{name2}` rule and `compare` kind at `:226-230` / `:230,241` (ENGINES #50, NEW-TEMPLATES 50-T1) | file is 203 lines | ✗ → `:16-17`, `:137`, `:165` |
| 58 | `number-words.js` 0..100, guard throws; G1-210 `één`, Zahlendreher, ranges (ENGINES notd-Q1) | `lib/number-words.js:1-22`; `G1-210:35, 48, 59-61` | ✓ |
| 59 | three digit forms + `FORM_BY_LOCALE` (nl/sv/no/da/fi uncrossed 7; es/pt plain) (ENGINES) | `data/tracing/digit-strokes.js:37-77`; `K-237:23, 34` | ✓ |
| 60 | coins generic tokens; es MXN $1/2/5/10, pt BRL 5/10/25/50, en ¢ (ENGINES money-Q1) | `primitives/coins.js:2-5`; `data/money/currencies.js:9-16, 21-22, 32-44` | ✓ |
| 61 | clock-core holds "8 canonical times" (ENGINES time-Q1) | `mini tools/clock-core.js:61-82` | ✗ 16 rows (8 + 8 five-minute) |
| 62 | `wordFor` English-only in clock-read-core (ENGINES) | `mini tools/clock-read-core.js:35, 100` | ✓ |
| 63 | ruler cm, jug ml, balance g, thermometer no unit label; measurement levels (ENGINES measurement-Q1) | `primitives/ruler.js:3,18`; `jug.js:2,15`; `balance.js:2-7,46`; `thermometer.js:4-14`; `types/_shared/measurement-tasks.js:3-5, 73-76, 112, 237-250` | ✓ |
| 64 | silhouette from the alpha channel; IoU signature (ENGINES same-different-Q1) | `image-cache/silhouette.js:15-31, 41-84` | ✓ |
| 65 | K-396 `grid` mode on `htdGrid`, cells 3/5 (ENGINES symmetry-Q1) | `types/k/K-396-how-to-draw.js:60, 246-253`; `templates/components-b7/how-to-draw.js:112` | ✓ |
| 66 | sudoku `countSolutions`, clues 10/8/6 and 24/20/17, verify recounts (ENGINES logic-Q1) | `G1-158:4, 10-28, 44-46, 66-74, 131-150`; `G3-348:10-28, 71-73, 90, 163` | ✓ |
| 67 | G3-349 has no uniqueness proof (ENGINES) | `types/g3/G3-349-magic-square.js:19, 81-82` | ✗ stale — fixed by commit `9f7ec9973` |
| 68 | logic grids exhaustive + every clue necessary; number walls propagation solver (ENGINES) | `G2-319:40-53`; `G1-246:6-8` | ✓ |
| 69 | position types print no sentence; the old app calls `prepSentence`/`prepDistractorLabels` (ENGINES pos-Q1) | `types/_shared/position-words.js:9-10`; `REFERENCE APPS/prepositions.html:1181, 3242, 4311` | ✓ |
| 70 | lcs-grammar refuses (null), `PREP_FORMS`, `prepSentence`, de dative plurals, distractors, `fiGenitive`; 80 KB | `REFERENCE TRANSLATIONS/lcs-grammar.js:12-17, 374-377, 404-429, 447-452, 520, 1768`; `wc -c` | ✓ |
| 71 | `sort-to-bins` bins = nouns (ENGINES sorting-Q1) | `types/_shared/sort-to-bins.js:28-29` | ✓ |
| 72 | object-attributes 456 reviewed of 933 with a per-key `reviewed:true` filter (ENGINES) | `mini tools/object-attributes.json` | ✗ counts ✓ but NO per-key flag — a build prerequisite |
| 73 | letter sets ×11 (ENGINES letter-tracing-Q1) | `data/tracing/letter-sets.js:14-31` | ✓ |
| 74 | write-the-word pool from vocab, `traceable`, `displayWord`, `KEEP_CASE`; picture index excludes BW (ENGINES word-writing-Q1) | `G1-244:48-53`; `lib/b2-common.js:17, 44, 57, 73`; `lib/b3-picture-index.js:9-22` | ✓ |
| 75 | cursive one-text-node rule; raster half in verify; ruling from per-em metrics (ENGINES cursive-Q1) | `G2-377:18-21, 41-43`; `primitives/school-ruling.js:8-16` | ✓ |
| 76 | letter-of-the-week `level: letter|sound` rule (ENGINES alphabet-Q1) | `data/b3/letter-of-the-week.js:11` | ✓ |
| 77 | `approvedByKey` throws when missing; syllable splits never hand-copied (ENGINES phonics/syllables-Q1) | `lib/b3-common.js:9-11, 40-43`; `data/b3/syllable-split.js:4-8` | ✓ |
| 78 | unscramble "one natural order" is authored, shuffle rule; sentence-bank substitutes literals, `tokenize` (ENGINES sentences-Q1) | `G1-249:6-8, 130-133`; `lib/sentence-bank.js:4-9, 32-40` | ✓ |
| 79 | old apps: wordsearch alphabets + 200 attempts; crossword fixed 15×15; cryptogram alphabets + accent stripping; bingo silent reuse; math-puzzle `generateData` (ENGINES Part 3) | `wordsearch.html:1475-1489, 2739`; `crossword.html:3728-3730`; `cryptogram.html:1435-1449, 1454-1457`; `bingo.html:2380-2386`; `math-puzzle.html:3119-3147` | ✓ |
| 80 | calendar: en + pt-BR Sunday-first (ENGINES #53, NEW-TEMPLATES 53-T1) | `primitives/calendar.js:7-8` | ✓ |
| 81 | collation: strip vs alphabet, fold, never `localeCompare` (NEW-TEMPLATES) | `data/b2/collation.js:5-13` | ✓ |
| 82 | sight words 24 per locale; passages 8 per locale; pixel figures 4 per size; 16 dot figures (ENGINES #41/#48/#21) | `data/literacy/sight-words.js`, `reading-passages.js`, `data/b2/figures.js` (node) | ✓ |
| 83 | K-285 levels, labelPx 24/18, placeability scan `:81`, window config `:103`, verify spacing/labels (ENGINES-ART §4.1) | `types/k/K-285-dot-to-dot.js:25-26, 35-42, 81, 103, 183, 212-214, 251-253, 261-263` | ✓ |
| 84 | K-309 runs a–t (NEW-TEMPLATES 25-T1) | `K-309:7` spreads `base.difficulty[1]` = `count: 20` (`K-285:103`) | ✓ |
| 85 | `scene-dot-figure` throws on missing `fit[N]` / no free place; free-paper rules (ENGINES-ART §4.1) | cited `:187-268`; file is 149 lines | ✗ → `:41-42, :101-102, :108, :113, :117, :122` |
| 86 | `pickOps` rules and refusal (ENGINES-ART §3.1) | cited `:128-236`; file is 146 lines | ✗ → `:11-12, :22, :37, :48-49, :57, :72, :80, :94, :130, :143` |
| 87 | K-395 face configs, `fd-browser-diff` call with dilate 5, frame check (ENGINES-ART) | `types/k/K-395-find-the-differences.js:39-41, 450-453, 471-472` | ✓ |
| 88 | `paintSmallCells :58`, `buildLayers :263` sharp `:343-345`, `applyOps :376`, `renderPanel :407`; fd-build raster gate (ENGINES-ART) | `lib/fd-scene.js`; `tools/fd-build.js:3-12` | ✓ |
| 89 | d2d `greedy :125`, `heroBody :152`, loop `:168`, props `:183` (ENGINES-ART §4) | `tools/d2d-build.js` | ✓ |
| 90 | cbn `PALETTE`, `MIN_R 8.5 / 5.5`, `LEVEL_CAPS`, `labelArt`, `labelsAndGate`, `checkSolid`; `cbn-type` labels/level/colour-word throws; `segmentInk` pure, `compose` sharp (ENGINES-ART §5) | `lib/cbn-render.js:21-31, 75, 147-167, 189`; `lib/cbn-type.js:18-26, 42, 96`; `lib/cbn-lineart.js:188, 294-295` | ✓ |
| 91 | htd `buildSteps` via compose, owners, union gate, `KIND` ladder, `keep`, `stepSvg`/`fullSvg`; vector laws (ENGINES-ART §6) | `lib/htd-steps.js:89-94, 106-112, 306-316, 346, 364`; `lib/htd-vector.js:19-24` | ✓ |
| 92 | pt laws a/b, `raster` sharp; `traceDrawing` decode; `K-418.verify` metrics; `modelImage` base64 (ENGINES-ART §7) | `lib/pt-verify.js:16-22, 52-60`; `lib/pt-trace.js:270-277`; `types/k/K-418-picture-tracing.js:83-90`; `lib/pt-render.js:298-300` | ✓ |
| 93 | grid maze spanning tree + `expectedWallCount`; K-242 sizes/verify; hm generators; `hm-scene` ink boxes + hrefs; `mzl-pin` (ENGINES-ART §8) | `lib/maze.js:19-21, 63-66`; `K-242:20-22, 58-60`; `lib/hm-maze.js:18, 105, 247, 337, 487, 580`; `lib/hm-scene.js:9, 24, 37-40`; `tools/level-set/mzl-pin.js:3-8` | ✓ |
| 94 | 512 px derived set q 88 (ENGINES-ART §2.3) | `image-cache/derive.js:33-36` | ✓ |
| 95 | data counts: fd 667 files, htd 201, d2d ~200, cbn lineart 200, htdv 23, pt bands P1 517 / P2 589 / P3 196 / X 23 (ENGINES-ART) | `ls`, `data/pt/index.json` | ✓ |
| 96 | primitives cited by NEW-TEMPLATES: ten-frame, dice, domino, tally, number-bond, hundreds-chart, number-line, fraction, flat-shape, coord-grid, island-map, family-tree, story-panel, tangram, word-brick, team-bead, pictograph, bar-graph, trace-path, base-ten, grid-copy, sym-grid, compass-rose, letter-pad | the cited lines | ✓ (fraction.js has no triangle/hexagon — noted at 12-T2) |
| 97 | NEW primitives really new (rekenrek, bar-model, compare-mouth, net, letter-heights, room-plan, cut-line) | `ls primitives/` | ✓ |
| 98 | `G3-383`, `G3-353 venn-sort`, `K-240`, `G1-301`, `data/hmx/levels.js`, `tangram-figures.js`, `gate-tangram-figures.js`, `wp-muldiv-frames.js`, `interactive-mark-grid.js`, `qa/guessability.js`, `topic-map.js`, `COVERAGE.md` exist | `ls` | ✓ |
| 99 | `translations-shared.js` ≈ 36 KB (ARCH §2.2) | `wc -c` 35,551 | ✓ |
| 100 | `trace-path.js` already draws faded lanes (used for the fading-rows removals) | `primitives/trace-path.js:302, 336 fadedStrokeLane` | ✓ |
| 101 | ARCH §14.3 batch lists vs headers (58 makers; "(7)") | the lists | ✗ fixed |
| 102 | ARCH effort "templates inside 2/3/4 per maker" | §11.2 vs §14.3 | ✗ fixed |
| 103 | ENGINES #26 "Colours 2–8" control; #30 free step layers; #31 offline tracer | `cbn-render.js:31`, `cbn-type.js:96`; `htd-steps.js:315-327`; `pt-scene.js:24-28` | ✗ fixed (ENGINES-ART right) |
| 104 | ENGINES #5 open number line printable | D6 | ✗ fixed |
| 105 | "one reviewer per locale" (ARCH §12/§15 gate 10, NEW-TEMPLATES D) | CLAUDE.md #1 rule | ✗ fixed (one reviewer over 11) |

---

## 4. Rules — satisfied structurally? (OLD-APP-LESSONS A–F, the locked decisions, CLAUDE.md standing rules)

Legend: **C** by construction · **S** schema/contract · **G** gate (ARCH §15 numbering) · **F3** = a gap this review closed.

| rule | structural home in the combined design | verdict |
|---|---|---|
| A1 no repeated exercise; say so when short | G15 `no-repeat` over `meta.items` + `sameAs`; §6.2 step 2 sentence | ✓ |
| A2 no picture repeats across exercises | C `distinct-pictures` → `platform.pictureHash` (F3: the Node path is now in §2.2); G2 | ✓ |
| A3 unguessable answer positions | G8 `settings-space` runs `qa/guessability.js` over every control value | ✓ (every NEW-TEMPLATES spec names its position risk) |
| A4 one right answer or every right one accepted | S `data-lcs-alts`; G2 | ✓ after **F3** fixes: 18-T6 rhombus bin, 23-T4 twin sketch |
| A5 instruction matches the task per mode/level/locale | S per-template strings + tokens (`render-instance.js:31-32` refuses); G10 | ✓ |
| A6 sentences from a refusing grammar engine | C `lcs-grammar.js` unchanged; position-words templates print only `prepSentence` output; own nouns refused where agreement exists | ✓ |
| A7 word order per language from frames | S frames per locale; treasure-hunt move frames re-authored ×11 (54-T1) | ✓ |
| A8 `Intl.ListFormat` joins | C convention; G1 bans literal joins in type code | ✓ |
| A9 Unicode letters | G1 flags `\b` `\w` `[A-Za-z]`; Part 3 engines use `\p{L}` + collation | ✓ |
| A10 each language's alphabet/vowels | S `collation.js`, `letter-pad.js OWN`; the `vowels` field to author (3-T5) | ✓ |
| A11 multi-word names | C hyphenated vocab keys; `wordFilter` per template; G9 | ✓ |
| A12 bilingual mixes exact; K-3 language names | S `gridLang`/`clueLang` + `same`/`mixed` keys; G10 | ✓ |
| A13 a literacy task never shows the answer | S hints are a mode; G8; scaffold cells always empty (ENGINES add-sub-Q1) | ✓ |
| A14 named bins strictly scored | S `tap-select` exact; own-label sort scored on the teacher's assignment | ✓ |
| A15 the chosen theme is on the page | C picker bound to `settings.theme`; `{THEME}` from the manifest | ✓ |
| A16 counts never include 0 | G15 `min ≥ 1`; **F3**: seven NEW-TEMPLATES ranges corrected (1-T6, 4-T3, 6-T1, 6-T5, 20-T1, 20-T2, 51-T5); number lines may start at 0 (a reference line, not a count) | ✓ |
| A17 odd-one-out density | ENGINES #23 + G2 `cardFill` + G14 collision; **F3**: the 50 px floor / 15-pair cap as `templates.json` limits | ✓ |
| A18 names from the vocabulary, never a file name | C `labels()` from the vocab slice; `own[]` carries no name; label templates refuse own photos | ✓ |
| B1 text never overlaps a picture | G14 collision (new lint) | ✓ |
| B2 no wasted band | G2 `pageFill`; the b7 fill rule | ✓ |
| B3 constant picture clues | S clue band reserved first (Part 3 §A/§B) | ✓ |
| B4 answer boxes 2.5× | S `answerBox` from measured widths; G15 | ✓ |
| B5 worksheet ≡ key geometry | C same-seed rebuild + `sameAs(meta)`; G15 slot-rect parity | ✓ |
| B6 common baseline, badges never overlap | G14; `size-compare.js` baseline-aligned | ✓ |
| B7 key marks placed exactly | C `key-on-row` seating; G2 | ✓ |
| B8 crop in the drawn image's space | C one image space (`platform.imageUrl {url, px}`) | ✓ |
| B9 art with built-in slots → measured offsets | S `data/art-extents.json` precedent (exists) | ✓ |
| B10 landscape + portrait; paper follows the choice | §3 rule 6 (`PAGE_SIZES` gains landscape — planned, not in code yet); C one `compose-document` | ✓ (planned) |
| B11 theme heading above the instruction, never stacked | C one `<h1>` (`shell.js:97`); page = f(recipe) | ✓ |
| B12 name/date in the content language | C `shell.js:25-37 CHROME[locale]` | ✓ |
| C1 regeneration never leaks | C pure function; iframe replaced; edits keyed by stable slot ids | ✓ |
| C2 language change changes everything | C `lang` in the recipe; G2 English-on-non-English scan; **note**: `i18n/strings.js:33` falls back to `en` today — the browser platform must refuse instead (§4.1a F5) | ✓ (planned) |
| C3 one source of truth per setting | S `settings` + `controls`; G15 unique ids | ✓ |
| C4 mechanical change checked per app | C one engine; G2 builds every template × 11 × 3 × 3 per deploy | ✓ |
| C5 deterministic from the seed | §16; G3 html-parity; G4 round-trip; **F3**: lint bans `Date.now`/`Math.random` on build paths | ✓ |
| C6 failed image loads never shift data | C slots by id; G2 broken-image lint | ✓ |
| C7 uploads have no name and no variant | S `own[]` = `{slot, fp, w, h}` | ✓ |
| C8 white background in exports | §3 rule 4 | ✓ |
| C9 print-size budget | §3 rule 5; G6 records size | ✓ |
| D1 feedback deferred until Check | C runtime phases | ✓ |
| D2 tap targets in % of the page | C `interactive-runtime.js:91,178` | ✓ |
| D3 revisits legal where the clue allows | trace-path compares against the declared path; mazes/maps | ✓ |
| D4 every promised interaction exists | G10 + G15 `write-screen`; more-less ✓/✗ chips | ✓ |
| D5 screen respects every display filter | C screen = `build({interactive:true})` of the same type | ✓ |
| D6 a writing page gets a writing screen | G15 `write-screen`; **F3**: 7-T6, 28-T4, ENGINES #5 corrected | ✓ |
| E custom word lists · manual picture choice · language mix · modes · counts · bin labels · name/date · exercise numbers · decoration · grayscale | S `words[]`, `edits[op:'picture']`, `gridLang/clueLang`, gallery cards + ≤ 4 controls, `edits[op:'word']` on bin labels, chrome, `.ws-card-badge`, `decor`, export grayscale filter | ✓ |
| F1 no free canvas | C typed recipe operations only; `ink`/`decor` cannot touch content | ✓ |
| F2 one shell, one engine | C `/makers/app/<v>/` + `scripts/worksheet-gen/` + the platform layer | ✓ |
| F3 ≤ 7 controls | G15 `controls-budget`; five ENGINES cards sit exactly at 7 (addition, mult-div, picture-cards, word-search, word-problems) — at the cap, none over | ✓ |
| F4 strings bundled with the version | C sliced at build; no runtime string fetch | ✓ |
| F5 no silent fallbacks | §6.2 adjust-with-a-sentence or refuse; the `en` fallback of `i18n/strings.js` and `labels()` null become refusals in the browser platform | ✓ (planned) |
| **Locked:** recipe saved, never output | §5.1 | ✓ |
| browser generation; server only checks access | §1, §9, §10 | ✓ |
| downloads built in the browser | §3 (+ F3 spike fallbacks) | ✓ |
| every deck links to its maker, preset | §13 step 3 (`?preset=<deckId>` → recipe) | ✓ |
| hosted cap 200 MB | §13.5, `core.ts:31` | ✓ |
| no AI | nothing generated at run time; reading T1 "my passage, my questions" is layout only; crossword clues never generated | ✓ |
| access per `quota.ts`; making unmetered | §9 | ✓ (D-1 decided) |
| own photos never on the server | §7.2 IndexedDB; `own[]` carries a fingerprint only | ✓ |
| **CLAUDE.md:** counting never includes 0 | see A16 | ✓ after F3 |
| a write page gets a write screen | see D6 | ✓ after F3 |
| never mix BW and colour pictures | coloring composer BW-only (`bw(\s+\d+)?$`); `b3-picture-index` excludes BW; G9 feeds a mixed case | ✓ |
| a page fills its body | G2 `pageFill`; stack budgets in the picture makers | ✓ |
| native + pedagogy check before publish | G10 — **F3**: as ONE reviewer over the 11-locale dump (CLAUDE.md #1), never a fan-out | ✓ after F3 |
| answer position is content | G8 over every control value | ✓ |
| no science | 76 types excluded; `living`/`natural` attributes never offered; the seasons question dropped (53-T2) | ✓ |
| app decks regenerated by the operator only | §13.4 (old apps stay operator-only) | ✓ |
| real users never pay for scrapers | §9 (no watermarks/limits/challenges) | ✓ |
| en-US / es-MX / pt-BR everywhere | money (MXN/BRL), digits, calendar — **open**: the es-MX week start (OPEN-DECISIONS #19) | ✓ (one open fact) |
| text on writing lines is seated and measured | `key-on-row.js`; G2 | ✓ |
| pedagogical mistakes fixed at once | §5.3 content-fix re-route (decision #5); G3-349 fixed in code | ✓ |

---

## 5. Pedagogy and goal — the attack on the 297 templates and the editor flow

**Removed (6):** 6-T2, 13-T6, 20-T4, 32-T4, 33-T3, 51-T4 (reasons in §1.4). **Changed (17):** the A16 ranges (7), D6 screens (2), A4 fixes (2), grade fit (13-T1), primitive honesty (12-T2), teaching point (24-T2), copier-safety (60-T6), two line references, and the review method (D).

**Held after attack (reasoning recorded):**
- *"Memory cards" appear five times* (43-T1, 39-T1, 46-T4, 8-T5, 55-T5). Each pairs a different thing (words, rhymes, opposites, doubles, feelings), which is a different lesson; they should share ONE `memory-cards` component in the build, not five.
- *Fold booklets twice* (27-T6 colouring, 31-T4 tracing): different content, one layout component — same remark.
- *Desk number line 0–20* (5-T6): a number line legitimately starts at 0 (2.MD.B.6 "starting at 0"); A16 is about counted quantities.
- *Number formation poster 0–9* (20-T5): writing the digit 0 is K.CC.A.3; no quantity is attached.
- *Compare range to 10,000* (ENGINES #9): `G3-325-compare-four-digit` already exists in the catalogue, so the range is in band for the existing type.
- *Sentence strips from own text* (47-T1): the cut-out is a material, allowed under sentences-Q1; the on-screen rebuild is correctly refused (it would be an unscramble).
- *Hidden counters* (6-T4), *bar model* (7-T7), *make it true* (9-T3): genuinely new tasks with no catalogue equivalent; their tells (cup size, segment width, empty interval) are each named and gated.

**Editor flow (ARCH §4.5):** holds against a first-time teacher — the first screen already shows a correct sheet; nothing she can do produces a broken page; every refusal is one sentence. Two things the flow should make explicit in the build: the sign-in sheet at "Download" must keep the recipe (it does, via `sessionStorage`), and the "New version" button must be visibly distinct from "+ page" (a frequent confusion in the old apps).

---

## 6. Buildability

- **Order executable:** P0 spikes → P1 platform (now including the module split) → P2–P6 → pilot → B1, B2 → S6 (pins timer, trace store, art index) → B3 … B7. Every spike has a named fallback (ARCH §14.1 F3 paragraph). The only hard data prerequisite outside the sessions is the per-key review flag for `object-attributes.json` (sorting tier 3), which does not block any maker's first release.
- **One effort number:** **≈ 450 sessions** in ARCHITECTURE §0/§14.3, ENGINES Part 2 total / operator 15, NEW-TEMPLATES Total, and OPEN-DECISIONS #1 (ship-first ≈ 390).

---

## 7. Remaining risks (the top ones, in order)

1. **The effort is ≈ 2× the first estimate and front-loaded** (25 platform sessions before any teacher benefits; 40 in the pilot before a single maker retires an app). The ship-first option (#1a) is the mitigation; without a decision the programme has no end date.
2. **Three unmeasured things the whole design leans on** until S1–S5 run: iPad PDF saving, DOM→PNG fidelity, and cross-browser rect equality within 1 px. Each has a fallback now, but the fallbacks for S2 (a `pdf.js` runtime dependency) and S5 (worker-side gating) change the user experience, not just the engineering.
3. **The 11-locale native authoring is the long pole, not the code** — ≈ 1,400 new strings plus thin banks (sight words 24 → 60, passages 8, phrases 0, letter models for 8 locales, the 101–1000 number words). The "refuse per locale until signed" mechanism keeps quality but means several templates ship in 7–9 locales first; Nordic and fi quality needs the reviewer's full attention (CLAUDE.md §17.5.1).
4. **Four engines have no code yet and carry their own correctness proofs** (word search blocklist scan, crossword multi-start layout + `type-cross`, cryptogram, bingo) plus the picture-engine ports (`platform.rasterSvg`, the canvas maze oracle, the trace store). Each is specified with a gate, but none has been poisoned against a real implementation.
5. **Pinned mazes and precomputed art trade freedom for correctness.** A teacher who presses "New version" 20 times on one maze scene sees a repeat; the Nordic alphabet dot-to-dot has 5 pictures; code keys fit 20 of 200 colour designs. These are honest limits, but they are the places a competitor's "generate anything" will look better than ours, and the gallery copy must say so plainly.
6. Two unverified by F3 (documents only): whether the live G3-349 decks were republished after commit `9f7ec9973`, and the `i18n/strings.js` English fallback (`:33`) — both must become refusals/republishes before the first maker ships.
